const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { URL } = require("node:url");

const root = path.resolve(process.cwd());
const port = Number(process.argv[2] || 8080);

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

http
  .createServer((req, res) => {
    const requestUrl = new URL(req.url, `http://127.0.0.1:${port}`);
    const relativePath = decodeURIComponent(
      requestUrl.pathname === "/" ? "/admin-new/index.html" : requestUrl.pathname
    );
    const fullPath = path.resolve(root, `.${relativePath}`);

    if (!fullPath.startsWith(root)) {
      send(res, 403, { "Content-Type": "text/plain; charset=utf-8" }, "Forbidden");
      return;
    }

    serveFile(res, fullPath);
  })
  .listen(port, "0.0.0.0", () => {
    console.log(`Static server running at http://127.0.0.1:${port}`);
  });
