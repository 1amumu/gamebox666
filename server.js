const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { URL } = require("node:url");

const root = path.resolve(process.cwd());
const port = Number(process.argv[2] || 8080);
const password = "BOX";
const sessionCookieName = "box_access";
const sessionMaxAgeSeconds = 8 * 60 * 60;
const sessionTtlMs = sessionMaxAgeSeconds * 1000;
const sessions = new Map();

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".cur": "application/octet-stream",
};

function send(res, status, headers, body) {
  res.writeHead(status, headers);
  res.end(body);
}

function sendJson(res, status, payload, extraHeaders = {}) {
  send(
    res,
    status,
    {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
    JSON.stringify(payload)
  );
}

function getCookies(req) {
  const cookieHeader = req.headers.cookie || "";
  const cookies = {};
  for (const pair of cookieHeader.split(";")) {
    const index = pair.indexOf("=");
    if (index === -1) {
      continue;
    }
    const key = pair.slice(0, index).trim();
    const value = pair.slice(index + 1).trim();
    cookies[key] = value;
  }
  return cookies;
}

function pruneSessions() {
  const now = Date.now();
  for (const [token, expiresAt] of sessions.entries()) {
    if (expiresAt <= now) {
      sessions.delete(token);
    }
  }
}

function createSession() {
  const token = crypto.randomBytes(32).toString("hex");
  sessions.set(token, Date.now() + sessionTtlMs);
  return token;
}

function clearSession(req) {
  const cookies = getCookies(req);
  const token = cookies[sessionCookieName];
  if (token) {
    sessions.delete(token);
  }
}

function isAuthenticated(req) {
  pruneSessions();
  const cookies = getCookies(req);
  const token = cookies[sessionCookieName];
  if (!token) {
    return false;
  }
  const expiresAt = sessions.get(token);
  if (!expiresAt || expiresAt <= Date.now()) {
    sessions.delete(token);
    return false;
  }
  sessions.set(token, Date.now() + sessionTtlMs);
  return true;
}

function secureEquals(input, target) {
  const inputBuffer = Buffer.from(input);
  const targetBuffer = Buffer.from(target);
  if (inputBuffer.length !== targetBuffer.length) {
    return false;
  }
  return crypto.timingSafeEqual(inputBuffer, targetBuffer);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;

    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > 1024 * 16) {
        reject(new Error("Body too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });

    req.on("end", () => {
      resolve(Buffer.concat(chunks).toString("utf8"));
    });

    req.on("error", reject);
  });
}

function serveFile(res, fullPath) {
  fs.readFile(fullPath, (error, buffer) => {
    if (error) {
      send(res, 404, { "Content-Type": "text/plain; charset=utf-8" }, "Not found");
      return;
    }

    const ext = path.extname(fullPath).toLowerCase();
    send(
      res,
      200,
      {
        "Content-Type": types[ext] || "application/octet-stream",
        "Cache-Control": "no-store",
      },
      buffer
    );
  });
}

function resolvePath(urlPath) {
  const relativePath = decodeURIComponent(urlPath === "/" ? "/index.html" : urlPath);
  const fullPath = path.resolve(root, `.${relativePath}`);
  if (!fullPath.startsWith(root)) {
    return null;
  }
  return fullPath;
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://127.0.0.1:${port}`);
  const pathname = requestUrl.pathname;

  if (req.method === "GET" && pathname === "/__session") {
    sendJson(res, 200, { authenticated: isAuthenticated(req) });
    return;
  }

  if (req.method === "POST" && pathname === "/__auth") {
    try {
      const rawBody = await readBody(req);
      const body = rawBody ? JSON.parse(rawBody) : {};
      const submittedPassword = typeof body.password === "string" ? body.password.trim() : "";

      if (!secureEquals(submittedPassword, password)) {
        sendJson(res, 401, { ok: false, message: "密码错误。" });
        return;
      }

      const token = createSession();
      sendJson(
        res,
        200,
        { ok: true },
        {
          "Set-Cookie": `${sessionCookieName}=${token}; HttpOnly; Path=/; Max-Age=${sessionMaxAgeSeconds}; SameSite=Strict`,
        }
      );
    } catch (error) {
      sendJson(res, 400, { ok: false, message: "请求无效。" });
    }
    return;
  }

  if (req.method === "POST" && pathname === "/__logout") {
    clearSession(req);
    sendJson(
      res,
      200,
      { ok: true },
      {
        "Set-Cookie": `${sessionCookieName}=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict`,
      }
    );
    return;
  }

  const isPublicEntry = pathname === "/" || pathname === "/index.html";
  if (!isPublicEntry && !isAuthenticated(req)) {
    if ((req.headers.accept || "").includes("text/html")) {
      send(res, 302, { Location: "/" }, "");
      return;
    }
    send(res, 401, { "Content-Type": "text/plain; charset=utf-8" }, "Unauthorized");
    return;
  }

  const fullPath = resolvePath(pathname);
  if (!fullPath) {
    send(res, 403, { "Content-Type": "text/plain; charset=utf-8" }, "Forbidden");
    return;
  }

  serveFile(res, fullPath);
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Protected server running at http://127.0.0.1:${port}`);
});
