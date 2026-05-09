(() => {
  const iconAttrs =
    'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"';

  const icons = {
    dashboard: `<svg ${iconAttrs}><path d="M3 13h8V3H3z"/><path d="M13 21h8V11h-8z"/><path d="M13 3h8v6h-8z"/><path d="M3 21h8v-6H3z"/></svg>`,
    data: `<svg ${iconAttrs}><path d="M4 19V5"/><path d="M10 19V9"/><path d="M16 19V13"/><path d="M22 19V7"/></svg>`,
    merchant: `<svg ${iconAttrs}><path d="M4 9h16"/><path d="M6 21V9"/><path d="M18 21V9"/><path d="M8 9V5h8v4"/><path d="M4 21h16"/></svg>`,
    game: `<svg ${iconAttrs}><path d="M6 12h12"/><path d="M8 8h8v8H8z"/><path d="M4 10v4"/><path d="M20 10v4"/></svg>`,
    player: `<svg ${iconAttrs}><circle cx="12" cy="7.5" r="3.5"/><path d="M5 20c.8-3.8 3.2-6 7-6s6.2 2.2 7 6"/></svg>`,
    finance: `<svg ${iconAttrs}><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14.5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    message: `<svg ${iconAttrs}><path d="M4 6h16v10H8l-4 4z"/></svg>`,
    admin: `<svg ${iconAttrs}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 0 1-4 0v-.2a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1A2 2 0 1 1 4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H2.7a2 2 0 0 1 0-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7A2 2 0 1 1 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.6V2.7a2 2 0 0 1 4 0V3a1.7 1.7 0 0 0 1 1.6h.1a1.7 1.7 0 0 0 1.9-.3l.1-.1A2 2 0 1 1 19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.6 1h.3a2 2 0 0 1 0 4H21a1.7 1.7 0 0 0-1.6 1Z"/></svg>`,
  };

  const menuItems = [
    {
      label: "概括",
      icon: "dashboard",
      storageKey: "menu-dashboard",
      children: [{ label: "首页仪表盘", key: "dashboard" }],
    },
    {
      label: "数据管理",
      icon: "data",
      storageKey: "menu-data",
      children: [
        { label: "游戏记录", key: "game-records" },
        { label: "运营数据", key: "operations-data" },
        { label: "今日玩家盈亏", key: "today-player-profit" },
        { label: "飞机爆点数据", key: "flight-burst-data" },
        { label: "玩家在线数据", key: "player-online-data" },
        { label: "游戏留存", key: "game-retention" },
        { label: "玩家留存", key: "player-retention" },
      ],
    },
    {
      label: "商户管理",
      icon: "merchant",
      storageKey: "menu-merchant",
      children: [
        { label: "商户列表", key: "merchant-list" },
        { label: "创建商户", key: "merchant-create" },
        { label: "商户盈亏", key: "merchant-profit" },
      ],
    },
    {
      label: "游戏管理",
      icon: "game",
      storageKey: "menu-game",
      children: [
        { label: "游戏列表", key: "game-list" },
        { label: "游戏配置", key: "game-config" },
        { label: "新增游戏", key: "game-create" },
        { label: "飞机房间配置", key: "flight-room-config" },
        { label: "飞机房间管理", key: "flight-room-manage" },
        { label: "库存管理", key: "inventory-manage" },
        { label: "游戏RTP配置", key: "game-rtp-config" },
      ],
    },
    {
      label: "玩家管理",
      icon: "player",
      storageKey: "menu-player",
      children: [
        { label: "玩家总览", key: "player-overview" },
        { label: "智能点控推荐", key: "smart-control" },
        { label: "玩家点控", key: "player-control" },
      ],
    },
    {
      label: "财务管理",
      icon: "finance",
      storageKey: "menu-finance",
      children: [
        { label: "财务总览", key: "finance-overview" },
        { label: "汇率查询", key: "exchange-rates" },
        { label: "结算信息", key: "settlement-info" },
        { label: "待结算信息", key: "pending-settlement" },
        { label: "充值订单", key: "recharge-orders" },
        { label: "赠送余额", key: "gift-balance" },
      ],
    },
    {
      label: "消息管理",
      icon: "message",
      storageKey: "menu-message",
      children: [
        { label: "发布消息", key: "publish-message" },
        { label: "消息列表", key: "message-list" },
      ],
    },
    {
      label: "后台管理",
      icon: "admin",
      storageKey: "menu-admin",
      children: [
        { label: "账号管理", key: "account-manage" },
        { label: "创建账号", key: "account-create" },
        { label: "权限编辑", key: "permission-edit" },
        { label: "操作日志", key: "operation-log" },
      ],
    },
  ];

  window.MANAGEMENT_MENU_ITEMS = menuItems;

  function getCurrentPageKey() {
    const params = new URLSearchParams(window.location.search);
    return params.get("page") || "dashboard";
  }

  function pageHref(pageKey) {
    return `index.html?page=${pageKey}`;
  }

  function isGroupActive(group, pageKey) {
    return group.children.some((child) => child.key === pageKey);
  }

  function isGroupCollapsed(group, pageKey) {
    const active = isGroupActive(group, pageKey);
    if (active) {
      return false;
    }
    try {
      return localStorage.getItem(group.storageKey) === "collapsed";
    } catch (_) {
      return false;
    }
  }

  function renderMenuItem(child, currentPageKey) {
    const active = child.key === currentPageKey ? " active" : "";
    return `<a class="submenu-item${active}" href="${pageHref(child.key)}" data-page-link="true" data-page-key="${child.key}">${child.label}</a>`;
  }

  function renderGroup(group, currentPageKey) {
    const active = isGroupActive(group, currentPageKey);
    const collapsed = isGroupCollapsed(group, currentPageKey);
    const activeClass = active ? " active has-active-child" : "";
    const collapsedClass = collapsed ? " is-collapsed" : "";
    return `
      <div class="submenu${activeClass}${collapsedClass}" data-storage-key="${group.storageKey}">
        <button class="submenu-title${active ? " active" : ""}" type="button" title="${group.label}" aria-expanded="${collapsed ? "false" : "true"}">
          <span class="menu-left">
            <span class="menu-icon">${icons[group.icon] || ""}</span>
            ${group.label}
          </span>
          <span class="chevron">⌃</span>
        </button>
        <div class="submenu-list">
          ${group.children.map((child) => renderMenuItem(child, currentPageKey)).join("")}
        </div>
      </div>
    `;
  }

  function renderSidebar() {
    const currentPageKey = getCurrentPageKey();
    return `
      <aside class="sidebar">
        <div class="logo">
          <span class="logo-mark">BOX</span>
          <span class="logo-text">MANAGEMENT ADMIN</span>
        </div>
        <nav class="menu">
          ${menuItems.map((group) => renderGroup(group, currentPageKey)).join("")}
        </nav>
      </aside>
    `;
  }

  function syncSidebarActive(pageKey) {
    document.querySelectorAll("[data-page-link]").forEach((link) => {
      const active = link.dataset.pageKey === pageKey;
      link.classList.toggle("active", active);
    });

    menuItems.forEach((group) => {
      const submenu = document.querySelector(`[data-storage-key="${group.storageKey}"]`);
      const title = submenu?.querySelector(".submenu-title");
      if (!submenu || !title) return;

      const active = group.children.some((child) => child.key === pageKey);
      submenu.classList.toggle("has-active-child", active);
      title.classList.toggle("active", active);

      if (active) {
        submenu.classList.remove("is-collapsed");
        title.setAttribute("aria-expanded", "true");
        const chevron = title.querySelector(".chevron");
        if (chevron) {
          chevron.textContent = "⌃";
        }
      }
    });
  }

  function setupPageNavigation() {
    document.querySelectorAll("[data-page-link]").forEach((link) => {
      link.addEventListener("click", (event) => {
        const pageKey = link.dataset.pageKey;
        if (!pageKey) return;
        event.preventDefault();

        const targetUrl = pageHref(pageKey);
        if (getCurrentPageKey() !== pageKey) {
          window.history.pushState({}, "", targetUrl);
        }

        syncSidebarActive(pageKey);
        if (typeof window.renderManagementPage === "function") {
          window.renderManagementPage();
        }
      });
    });
  }

  function setupSidebarCollapse() {
    const layout = document.querySelector(".admin-layout");
    const button = document.querySelector(".collapse-btn");
    if (!layout || !button) {
      return;
    }

    const storageKey = "management-sidebar-collapsed";
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
      if (!title) {
        return;
      }

      function sync(storageValue) {
        submenu.classList.toggle("is-collapsed", storageValue === "collapsed");
        title.setAttribute("aria-expanded", storageValue === "collapsed" ? "false" : "true");
        const chevron = title.querySelector(".chevron");
        if (chevron) {
          chevron.textContent = storageValue === "collapsed" ? "⌄" : "⌃";
        }
      }

      title.addEventListener("click", (event) => {
        event.preventDefault();
        const storageKey = submenu.dataset.storageKey;
        const nextValue = submenu.classList.contains("is-collapsed") ? "expanded" : "collapsed";
        try {
          localStorage.setItem(storageKey, nextValue);
        } catch (_) {}
        sync(nextValue);
      });

      sync(submenu.classList.contains("is-collapsed") ? "collapsed" : "expanded");
    });
  }

  document.write(renderSidebar());
  document.addEventListener("DOMContentLoaded", () => {
    setupSidebarCollapse();
    setupSubmenuToggles();
    setupPageNavigation();
    syncSidebarActive(getCurrentPageKey());
  });

  window.addEventListener("popstate", () => {
    syncSidebarActive(getCurrentPageKey());
  });
})();
