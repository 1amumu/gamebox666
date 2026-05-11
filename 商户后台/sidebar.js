(() => {
  const iconAttrs = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"';
  const icons = {
    player: `<svg ${iconAttrs}><path d="M16 21v-2a4 4 0 0 0-8 0v2"/><circle cx="12" cy="7" r="4"/><path d="M4 21h16"/></svg>`,
    report: `<svg ${iconAttrs}><path d="M4 19V5"/><path d="M8 17V9"/><path d="M12 17v-5"/><path d="M16 17V7"/><path d="M20 19H4"/></svg>`,
    stats: `<svg ${iconAttrs}><rect x="4" y="10" width="4" height="8" rx="1"/><rect x="10" y="6" width="4" height="12" rx="1"/><rect x="16" y="3" width="4" height="15" rx="1"/><path d="M3 21h18"/></svg>`,
    config: `<svg ${iconAttrs}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.3a2 2 0 0 1-4 0V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1A2 2 0 1 1 4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H2.7a2 2 0 0 1 0-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7A2 2 0 1 1 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.6V2.7a2 2 0 0 1 4 0V3a1.7 1.7 0 0 0 1 1.6h.1a1.7 1.7 0 0 0 1.9-.3l.1-.1A2 2 0 1 1 19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.6 1h.3a2 2 0 0 1 0 4H21a1.7 1.7 0 0 0-1.6 1Z"/></svg>`,
    api: `<svg ${iconAttrs}><path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.1 0l-2 2A5 5 0 0 0 12 20.1l1.1-1.1"/></svg>`,
    merchant: `<svg ${iconAttrs}><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h6"/></svg>`,
    system: `<svg ${iconAttrs}><path d="M12 3l8 4-8 4-8-4 8-4Z"/><path d="M4 11l8 4 8-4"/><path d="M4 15l8 4 8-4"/></svg>`,
  };

  const menuItems = [
    {
      label: "玩家账号",
      icon: "player",
      children: [
        { label: "用户账号", href: "player-account.html" },
        { label: "今日玩家盈亏", href: "player-today-profit-loss.html" },
      ],
    },
    {
      label: "游戏数据",
      icon: "report",
      children: [
        { label: "游戏数据", href: "game-report.html" },
        { label: "平台盈亏", href: "platform-profit.html" },
        { label: "每日报告", href: "daily-report.html" },
      ],
    },
    {
      label: "数据统计",
      icon: "stats",
      children: [
        { label: "游戏留存", href: "game-retention.html" },
        { label: "玩家留存", href: "player-retention.html" },
        { label: "站点统计", href: "data-statistics.html" },
      ],
    },
    {
      label: "游戏配置",
      icon: "config",
      children: [
        { label: "游戏控制", href: "game-control.html" },
      ],
    },
    { label: "API配置", href: "api-access.html", icon: "api" },
    { label: "商户报表", href: "merchant-report.html", icon: "merchant" },
    {
      label: "系统管理",
      icon: "system",
      children: [
        { label: "账户管理", href: "system-account.html" },
        { label: "角色管理", href: "system-role.html" },
      ],
    },
  ];

  const routeAliases = {
    "": "game-control.html",
    "index.html": "game-control.html",
  };
  const routePage = window.location.pathname.split("/").pop() || "";
  const currentPage = routeAliases[routePage] || routePage;

  function isActive(item) {
    return item.children
      ? item.children.some((child) => child.href === currentPage)
      : item.href === currentPage;
  }

  function renderMenuLeft(item) {
    return `<span class="menu-left"><span class="menu-icon">${icons[item.icon] || ""}</span>${item.label}</span>`;
  }

  function renderItem(item) {
    if (!item.children) {
      return `<a class="menu-item${isActive(item) ? " active" : ""}" href="${item.href}" title="${item.label}">${renderMenuLeft(item)}</a>`;
    }

    const active = isActive(item);
    return `
      <div class="submenu${active ? " has-active-child" : ""}">
        <button class="submenu-title${active ? " active" : ""}" type="button" title="${item.label}" aria-expanded="true">
          ${renderMenuLeft(item)}<span class="chevron">⌄</span>
        </button>
        <div class="submenu-list">
          ${item.children.map((child) => `<a class="submenu-item${child.href === currentPage ? " active" : ""}" href="${child.href}">${child.label}</a>`).join("")}
        </div>
      </div>
    `;
  }

  function renderSidebar() {
    return `
      <aside class="sidebar">
        <div class="logo"><span class="logo-mark">BOX</span><span class="logo-text">API ADMIN</span></div>
        <nav class="menu">${menuItems.map(renderItem).join("")}</nav>
      </aside>
    `;
  }

  function setupSidebarCollapse() {
    const layout = document.querySelector(".admin-layout");
    const button = document.querySelector(".collapse-btn");
    if (!layout || !button) return;

    const storageKey = "box-api-admin-sidebar-collapsed";
    let collapsed = false;
    try {
      collapsed = localStorage.getItem(storageKey) === "true";
    } catch (_) {}

    function sync() {
      layout.classList.toggle("sidebar-collapsed", collapsed);
      button.classList.toggle("is-collapsed", collapsed);
      button.setAttribute("role", "button");
      button.setAttribute("tabindex", "0");
      button.setAttribute("aria-label", collapsed ? "展开菜单栏" : "收起菜单栏");
      button.setAttribute("aria-pressed", String(collapsed));
      button.setAttribute("title", collapsed ? "展开菜单栏" : "收起菜单栏");
    }

    function toggle() {
      collapsed = !collapsed;
      try {
        localStorage.setItem(storageKey, String(collapsed));
      } catch (_) {}
      sync();
    }

    button.addEventListener("click", toggle);
    button.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggle();
      }
    });
    sync();
  }

  function setupSubmenuToggles() {
    document.querySelectorAll(".submenu").forEach((submenu) => {
      const title = submenu.querySelector(".submenu-title");
      const chevron = submenu.querySelector(".chevron");
      if (!title || !chevron) return;

      function sync() {
        const expanded = !submenu.classList.contains("is-collapsed");
        title.setAttribute("aria-expanded", String(expanded));
        chevron.textContent = expanded ? "⌄" : "›";
      }

      title.addEventListener("click", (event) => {
        event.preventDefault();
        submenu.classList.toggle("is-collapsed");
        sync();
      });
      sync();
    });
  }

  document.write(renderSidebar());
  document.addEventListener("DOMContentLoaded", () => {
    setupSidebarCollapse();
    setupSubmenuToggles();
  });
})();
