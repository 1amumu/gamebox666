(function() {
  var rates = [
    { code: "CNY", name: "人民币", symbol: "¥", rate: 7.12121, change: 7.12121, direction: "up" },
    { code: "EUR", name: "欧元", symbol: "€", rate: 0.82121, change: 0.12121, direction: "down" },
    { code: "INR", name: "印度卢比", symbol: "₹", rate: 83.42160, change: 0.16240, direction: "up" },
    { code: "GHS", name: "加纳塞地", symbol: "₵", rate: 14.82100, change: 0.08410, direction: "up" },
    { code: "BRL", name: "巴西雷亚尔", symbol: "R$", rate: 5.21480, change: 0.03210, direction: "down" },
    { code: "IDR", name: "印尼盾", symbol: "Rp", rate: 16240.50000, change: 12.42000, direction: "up" },
    { code: "VND", name: "越南盾", symbol: "₫", rate: 25418.00000, change: 22.00000, direction: "down" },
    { code: "THB", name: "泰铢", symbol: "฿", rate: 36.72050, change: 0.09100, direction: "up" },
    { code: "PHP", name: "菲律宾比索", symbol: "₱", rate: 58.14600, change: 0.12600, direction: "up" },
    { code: "JPY", name: "日元", symbol: "¥", rate: 156.84200, change: 0.28400, direction: "down" }
  ];
  var updateText = "2000/12/12  12:12:12";

  function currentFile() {
    var path = decodeURIComponent(window.location.pathname || "");
    return path.split("/").pop() || "汇率查询.html";
  }

  function readSidebarState() {
    try {
      var key = window.GB_NAVIGATION && window.GB_NAVIGATION.storageKey ? window.GB_NAVIGATION.storageKey : "gb-shared-sidebar-state";
      return JSON.parse(localStorage.getItem(key) || "{}");
    } catch (error) {
      return {};
    }
  }

  function writeSidebarState(state) {
    try {
      var key = window.GB_NAVIGATION && window.GB_NAVIGATION.storageKey ? window.GB_NAVIGATION.storageKey : "gb-shared-sidebar-state";
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {}
  }

  function sidebarHtml() {
    var groups = window.GB_NAVIGATION && window.GB_NAVIGATION.plainGroups ? window.GB_NAVIGATION.plainGroups() : [];
    var activeFile = currentFile();
    var state = readSidebarState();
    return groups.map(function(group) {
      var collapsed = state[group.title] === false ? " is-collapsed" : "";
      var items = group.items.map(function(item) {
        var active = item.file === activeFile ? " active" : "";
        return "<a class=\"sidebar-item" + active + "\" href=\"" + item.file + "\" title=\"" + item.title + "\"><span>" + item.title + "</span></a>";
      }).join("");
      return "<section class=\"sidebar-section" + collapsed + "\" data-sidebar-section=\"" + group.title + "\">" +
        "<button type=\"button\" class=\"sidebar-group\" data-sidebar-toggle=\"" + group.title + "\">" +
          "<span class=\"sidebar-icon\">" + group.icon + "</span>" +
          "<span class=\"sidebar-label\">" + group.title + "</span>" +
          "<span class=\"sidebar-toggle\">⌄</span>" +
        "</button>" +
        "<div class=\"sidebar-children\"" + (collapsed ? " hidden" : "") + ">" + items + "</div>" +
      "</section>";
    }).join("");
  }

  function pageTabs() {
    var files = ["财务总览.html", "汇率查询.html", "结算信息页.html", "待结算信息页.html"];
    return files.map(function(file) {
      var active = file === "汇率查询.html" ? " is-active" : "";
      return "<button type=\"button\" class=\"codex-page-tab" + active + "\" data-tab-file=\"" + file + "\"><span class=\"codex-page-tab-dot\"></span><span class=\"codex-page-tab-title\">" + file.replace(".html", "") + "</span><span class=\"codex-page-tab-close\">×</span></button>";
    }).join("");
  }

  function formatRate(value) {
    return Number(value).toLocaleString("en-US", { minimumFractionDigits: 5, maximumFractionDigits: 5 });
  }

  function rateCardHtml(item) {
    var directionClass = item.direction === "down" ? " is-down" : " is-up";
    var arrow = item.direction === "down" ? "↓" : "↑";
    return "<div class=\"exchange-rate-card\">" +
      "<div class=\"rate-card-head\"><div><strong>" + item.name + "</strong><small>" + item.code + "</small></div><span>" + item.symbol + "</span></div>" +
      "<div class=\"rate-card-value\">" + formatRate(item.rate) + "</div>" +
      "<div class=\"rate-card-foot\"><span>1 USD = " + formatRate(item.rate) + " " + item.code + "</span><em class=\"" + directionClass + "\">" + arrow + " " + formatRate(item.change) + "</em></div>" +
    "</div>";
  }

  function cardsHtml(list) {
    return list.map(rateCardHtml).join("");
  }

  function renderRows() {
    var keyword = document.getElementById("rateKeyword").value.trim().toLowerCase();
    var filtered = rates.filter(function(item) {
      return !keyword || item.code.toLowerCase().indexOf(keyword) !== -1 || item.name.toLowerCase().indexOf(keyword) !== -1;
    });
    document.querySelector(".exchange-rate-grid").innerHTML = cardsHtml(filtered);
  }

  function updateTopbarTime(app) {
    var node = app.querySelector("[data-topbar-time]");
    if (!node) return;
    var now = new Date();
    var hh = String(now.getHours()).padStart(2, "0");
    var mm = String(now.getMinutes()).padStart(2, "0");
    node.textContent = hh + ":" + mm + " 中国";
  }

  function shellHtml() {
    return "<div class=\"app-shell\">" +
      "<a class=\"app-brand\" href=\"首页仪表盘.html\">GB总后台</a>" +
      "<header class=\"app-topbar\">" +
        "<h1 class=\"topbar-page-title\">汇率查询</h1>" +
        "<div class=\"topbar-actions\">" +
          "<a class=\"topbar-message\" href=\"消息页.html\" title=\"消息\"><span class=\"topbar-message-icon\"></span><span class=\"topbar-badge\">9</span></a>" +
          "<div class=\"topbar-region-time\" data-topbar-time>--:-- 中国</div>" +
          "<div class=\"topbar-account-wrap\">" +
            "<div class=\"topbar-account\"><span class=\"topbar-account-label\">账号</span><span class=\"topbar-account-name\">admin</span></div>" +
            "<button type=\"button\" class=\"topbar-account-toggle\" aria-label=\"账号菜单\"></button>" +
            "<div class=\"topbar-account-menu\"><button type=\"button\">个人中心</button><button type=\"button\">退出登录</button></div>" +
          "</div>" +
        "</div>" +
      "</header>" +
      "<nav class=\"app-sidebar\">" + sidebarHtml() + "</nav>" +
      "<main class=\"app-main\">" +
        "<div class=\"exchange-page\">" +
          "<div class=\"codex-page-tabs\">" + pageTabs() + "</div>" +
          "<section class=\"exchange-panel\">" +
            "<div class=\"exchange-toolbar\">" +
              "<div class=\"exchange-filter\">" +
                "<label class=\"exchange-field\">币种查询<input id=\"rateKeyword\" class=\"exchange-input\" type=\"text\" placeholder=\"输入币种或名称\"></label>" +
                "<button class=\"btn btn-primary\" type=\"button\" data-query>查询</button>" +
                "<button class=\"btn btn-outline\" type=\"button\" data-reset>重置</button>" +
              "</div>" +
            "</div>" +
            "<div class=\"exchange-rate-stage\">" +
              "<div class=\"exchange-hero\">" +
                "<div class=\"exchange-hero-copy\"><strong>1美元(USD)可以兑换</strong><span>数据更新时间&nbsp;&nbsp;" + updateText + "</span></div>" +
                "<div class=\"exchange-base\"><span>基准币种</span><b>1 USD</b></div>" +
              "</div>" +
              "<div class=\"exchange-rate-grid\"></div>" +
            "</div>" +
          "</section>" +
        "</div>" +
      "</main>" +
    "</div>";
  }

  function bindEvents(app) {
    app.addEventListener("click", function(event) {
      var accountToggle = event.target.closest(".topbar-account-toggle");
      if (accountToggle) {
        accountToggle.closest(".topbar-account-wrap").classList.toggle("is-open");
        return;
      }
      if (!event.target.closest(".topbar-account-wrap")) {
        var account = app.querySelector(".topbar-account-wrap.is-open");
        if (account) account.classList.remove("is-open");
      }
      var groupToggle = event.target.closest("[data-sidebar-toggle]");
      if (groupToggle) {
        var section = groupToggle.closest(".sidebar-section");
        var children = section.querySelector(".sidebar-children");
        var state = readSidebarState();
        var title = groupToggle.getAttribute("data-sidebar-toggle");
        var willCollapse = !section.classList.contains("is-collapsed");
        section.classList.toggle("is-collapsed", willCollapse);
        children.hidden = willCollapse;
        state[title] = !willCollapse;
        writeSidebarState(state);
        return;
      }
      var pageTab = event.target.closest("[data-tab-file]");
      if (pageTab && !event.target.classList.contains("codex-page-tab-close")) {
        window.location.href = pageTab.getAttribute("data-tab-file");
        return;
      }
      if (event.target.closest("[data-query]")) {
        renderRows();
        return;
      }
      if (event.target.closest("[data-reset]")) {
        document.getElementById("rateKeyword").value = "";
        renderRows();
      }
    });
    app.addEventListener("input", function(event) {
      if (event.target.id === "rateKeyword") {
        renderRows();
      }
    });
  }

  function buildPage() {
    var app = document.getElementById("app");
    if (!app) return;
    app.innerHTML = shellHtml();
    renderRows();
    bindEvents(app);
    updateTopbarTime(app);
    window.setInterval(function() {
      updateTopbarTime(app);
    }, 30000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildPage);
  } else {
    buildPage();
  }
})();
