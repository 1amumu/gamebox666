const state = {
  pages: [],
  selected: null,
  query: "",
  tabs: []
};

const nav = document.getElementById("pageNav");
const count = document.getElementById("pageCount");
const search = document.getElementById("searchInput");
const title = document.getElementById("previewTitle");
const meta = document.getElementById("previewMeta");
const frame = document.getElementById("previewFrame");
const openRaw = document.getElementById("openRaw");
const sidebar = document.querySelector(".sidebar");
const tabStorageKey = "codex-workbench-open-tabs";

const groupLabels = {
  "main-entry": "入口",
  "entry": "原型入口",
  "overview": "概括",
  "data-management": "数据管理",
  "merchant-management": "商户管理",
  "game-management": "游戏管理",
  "player-management": "玩家管理",
  "finance-management": "财务管理",
  "message-management": "消息管理",
  "admin-management": "后台管理",
  "merchant-backend": "商户后台",
  "other-pages": "其他页面"
};

const sitemapGroups = [
  {
    group: "main-entry",
    files: ["index.html"]
  },
  {
    group: "overview",
    files: ["首页仪表盘.html"]
  },
  {
    group: "data-management",
    files: [
      "游戏记录.html",
      "运营数据.html",
      "今日玩家盈亏.html",
      "玩家在线数据.html",
      "游戏留存.html",
      "玩家留存.html"
    ]
  },
  {
    group: "merchant-management",
    files: ["商户列表.html", "创建商户.html", "商户盈亏.html"]
  },
  {
    group: "game-management",
    files: [
      "游戏列表页.html",
      "游戏配置页.html",
      "新增游戏页.html",
      "飞机房间配置页.html",
      "飞机房间管理页.html",
      "库存管理.html",
      "游戏rtp配置.html"
    ]
  },
  {
    group: "player-management",
    files: ["玩家总览页.html", "智能点控推荐.html", "玩家点控.html"]
  },
  {
    group: "finance-management",
    files: [
      "财务总览.html",
      "汇率查询.html",
      "结算信息页.html",
      "待结算信息页.html",
      "充值订单页.html",
      "赠送余额页.html"
    ]
  },
  {
    group: "message-management",
    files: ["发布消息页.html", "消息页.html"]
  },
  {
    group: "admin-management",
    files: ["账号管理.html", "创建账号.html", "权限编辑.html", "操作日志.html"]
  },
  {
    group: "merchant-backend",
    files: [
      "商户-首页.html",
      "游戏记录_1.html",
      "运营数据_1.html",
      "今日玩家盈亏_1.html",
      "玩家在线数据_1.html",
      "玩家留存_1.html",
      "游戏留存_1.html",
      "商户充值页.html",
      "商户费率页.html",
      "游戏rtp配置_1.html"
    ]
  },
  {
    group: "entry",
    files: ["page_1.html", "index111.html", "start.html", "start_c_1.html", "start_with_pages.html"]
  }
];

const sitemapOrder = new Map();
sitemapGroups.forEach((group, groupIndex) => {
  group.files.forEach((file, pageIndex) => {
    sitemapOrder.set(file, {
      group: group.group,
      groupIndex,
      pageIndex
    });
  });
});

function normalizePages(pages) {
  return pages
    .map((page) => {
      const sitemap = sitemapOrder.get(page.file);
      return {
        ...page,
        group: sitemap ? sitemap.group : "other-pages",
        groupIndex: sitemap ? sitemap.groupIndex : sitemapGroups.length,
        pageIndex: sitemap ? sitemap.pageIndex : Number.MAX_SAFE_INTEGER
      };
    })
    .sort((a, b) => {
      if (a.groupIndex !== b.groupIndex) return a.groupIndex - b.groupIndex;
      if (a.pageIndex !== b.pageIndex) return a.pageIndex - b.pageIndex;
      return a.file.localeCompare(b.file, "zh-Hans-CN");
    });
}

function groupPages(pages) {
  return pages.reduce((groups, page) => {
    if (!groups.has(page.group)) {
      groups.set(page.group, []);
    }
    groups.get(page.group).push(page);
    return groups;
  }, new Map());
}

function matchesQuery(page) {
  const query = state.query.trim().toLowerCase();
  if (!query) return true;

  return `${page.title} ${page.file} ${page.group}`.toLowerCase().includes(query);
}

function persistTabs() {
  localStorage.setItem(tabStorageKey, JSON.stringify(state.tabs.map((page) => page.file)));
}

function restoreTabs() {
  let files = [];
  try {
    files = JSON.parse(localStorage.getItem(tabStorageKey) || "[]");
  } catch (error) {
    files = [];
  }

  state.tabs = files
    .map((file) => state.pages.find((page) => page.file === file))
    .filter(Boolean);
}

function ensureTab(page) {
  if (!state.tabs.some((item) => item.file === page.file)) {
    state.tabs.push(page);
    persistTabs();
  }
}

function closeTab(page) {
  const index = state.tabs.findIndex((item) => item.file === page.file);
  if (index === -1) return;

  state.tabs.splice(index, 1);
  persistTabs();

  if (state.selected && state.selected.file === page.file) {
    const next = state.tabs[index] || state.tabs[index - 1] || state.pages[0];
    if (next) {
      selectPage(next);
      return;
    }
  }

  renderPreviewTabs();
}

function injectTabStyles(doc) {
  if (doc.getElementById("codex-page-tabs-style")) return;

  const style = doc.createElement("style");
  style.id = "codex-page-tabs-style";
  style.textContent = `
    .codex-page-tabs {
      display:flex;
      align-items:flex-end;
      gap:4px;
      height:34px;
      margin:0 0 12px 0;
      border-bottom:1px solid #D0D5DD;
      overflow:hidden;
    }
    .codex-page-tab {
      display:inline-flex;
      align-items:center;
      justify-content:center;
      gap:7px;
      height:30px;
      min-width:96px;
      max-width:150px;
      padding:0 9px;
      border:1px solid #D0D5DD;
      border-bottom:0;
      border-radius:0;
      background:#FFFFFF;
      color:#344054;
      font:13px/30px Arial, "Microsoft YaHei", sans-serif;
      cursor:pointer;
      box-sizing:border-box;
      white-space:nowrap;
    }
    .codex-page-tab.is-active {
      border-color:#3B8BFF;
      background:#3B8BFF;
      color:#FFFFFF;
    }
    .codex-page-tab-dot {
      display:none;
      width:7px;
      height:7px;
      border-radius:50%;
      background:currentColor;
      flex:0 0 auto;
    }
    .codex-page-tab.is-active .codex-page-tab-dot {
      display:block;
    }
    .codex-page-tab-title {
      min-width:0;
      overflow:hidden;
      text-overflow:ellipsis;
    }
    .codex-page-tab-close {
      width:14px;
      height:14px;
      border:0;
      padding:0;
      background:transparent;
      color:inherit;
      font:16px/14px Arial, sans-serif;
      cursor:pointer;
      opacity:.72;
    }
    .codex-page-tab-close:hover {
      opacity:1;
    }
  `;
  doc.head.appendChild(style);
}

function renderPreviewTabs() {
  if (!frame.contentDocument || !state.selected) return;

  const doc = frame.contentDocument;
  const titlebar = doc.querySelector(".game-records-titlebar");
  if (!titlebar) {
    window.setTimeout(renderPreviewTabs, 120);
    return;
  }

  injectTabStyles(doc);

  let tabs = doc.querySelector(".codex-page-tabs");
  if (!tabs) {
    tabs = doc.createElement("div");
    tabs.className = "codex-page-tabs";
    titlebar.insertAdjacentElement("afterend", tabs);
  }

  tabs.innerHTML = "";
  state.tabs.forEach((page) => {
    const tab = doc.createElement("button");
    tab.type = "button";
    tab.className = `codex-page-tab${page.file === state.selected.file ? " is-active" : ""}`;

    const dot = doc.createElement("span");
    dot.className = "codex-page-tab-dot";
    tab.appendChild(dot);

    const label = doc.createElement("span");
    label.className = "codex-page-tab-title";
    label.textContent = page.title || page.file.replace(/\.html$/i, "");
    tab.appendChild(label);

    const close = doc.createElement("button");
    close.type = "button";
    close.className = "codex-page-tab-close";
    close.textContent = "×";
    close.addEventListener("click", (event) => {
      event.stopPropagation();
      closeTab(page);
    });
    tab.appendChild(close);

    tab.addEventListener("click", () => selectPage(page));
    tabs.appendChild(tab);
  });
}

function renderNav() {
  nav.innerHTML = "";
  const filtered = state.pages.filter(matchesQuery);
  const groups = groupPages(filtered);

  groups.forEach((pages, group) => {
    const section = document.createElement("section");
    section.className = "page-group";

    const heading = document.createElement("div");
    heading.className = "page-group-title";
    heading.textContent = `${groupLabels[group] || group} (${pages.length})`;
    section.appendChild(heading);

    pages.forEach((page) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `page-link${state.selected && state.selected.file === page.file ? " active" : ""}`;
      button.innerHTML = `<span class="page-title">${page.title}</span><span class="page-file">${page.file}</span>`;
      button.addEventListener("click", () => selectPage(page));
      section.appendChild(button);
    });

    nav.appendChild(section);
  });
}

function selectPage(page) {
  state.selected = page;
  ensureTab(page);
  title.textContent = page.title;
  meta.textContent = `${groupLabels[page.group] || page.group} / ${page.file} / ${page.status}`;
  frame.src = page.source;
  openRaw.href = new URL(page.source, window.location.href).href;
  window.location.hash = encodeURIComponent(page.file);
  renderNav();
  renderPreviewTabs();
}

function selectInitialPage() {
  const fromHash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
  const target = state.pages.find((page) => page.file === fromHash) ||
    state.pages.find((page) => page.file === "首页仪表盘.html") ||
    state.pages[0];

  if (target) {
    selectPage(target);
  }
}

fetch("data/pages.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  })
  .then((manifest) => {
    state.pages = normalizePages(manifest.pages);
    restoreTabs();
    count.textContent = `${manifest.pageCount} 个页面`;
    renderNav();
    selectInitialPage();
  })
  .catch((error) => {
    count.textContent = "加载失败";
    nav.innerHTML = `<p class="page-group-title">无法加载页面清单：${error.message}</p>`;
  });

search.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderNav();
});

frame.addEventListener("load", () => {
  renderPreviewTabs();
  window.setTimeout(renderPreviewTabs, 120);
});

sidebar.addEventListener("wheel", (event) => {
  if (event.target === search || search.contains(event.target)) return;

  nav.scrollTop += event.deltaY;
  event.preventDefault();
}, { passive: false });

openRaw.addEventListener("click", (event) => {
  event.preventDefault();

  const targetUrl = openRaw.href;
  const popup = window.open(targetUrl, "_blank", "noopener,noreferrer");
  if (!popup) {
    window.location.href = targetUrl;
  }
});
