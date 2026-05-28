(function() {
  var rows = [
    { id: "1", merchantId: "M10086", playerId: "10310000289609", status: "在线", candidateRound: "第 4 轮", riskStartTime: "2026-05-28 09:12", lastLoginTime: "2026-05-28 13:36", rule: "短时高盈利", profit24h: "18,420.00", historyProfit: "126,880.50", siteProfit: "42,360.00", siteRtp: "118.24%", registerDays: 3 },
    { id: "2", merchantId: "M10021", playerId: "10310000289610", status: "在线", candidateRound: "第 2 轮", riskStartTime: "2026-05-28 10:05", lastLoginTime: "2026-05-28 13:22", rule: "连续大额返奖", profit24h: "12,360.80", historyProfit: "84,510.20", siteProfit: "31,205.40", siteRtp: "114.62%", registerDays: 18 },
    { id: "3", merchantId: "M10057", playerId: "10310000289611", status: "离线", candidateRound: "第 5 轮", riskStartTime: "2026-05-28 08:47", lastLoginTime: "2026-05-28 12:44", rule: "RTP异常", profit24h: "9,820.00", historyProfit: "58,730.00", siteProfit: "22,190.00", siteRtp: "121.08%", registerDays: 29 },
    { id: "4", merchantId: "M10012", playerId: "10310000289612", status: "在线", candidateRound: "第 1 轮", riskStartTime: "2026-05-28 11:30", lastLoginTime: "2026-05-28 13:41", rule: "新号快速盈利", profit24h: "7,650.20", historyProfit: "7,650.20", siteProfit: "18,406.00", siteRtp: "116.75%", registerDays: 1 },
    { id: "5", merchantId: "M10086", playerId: "10310000289613", status: "在线", candidateRound: "第 3 轮", riskStartTime: "2026-05-28 07:58", lastLoginTime: "2026-05-28 13:18", rule: "倍投行为", profit24h: "6,412.50", historyProfit: "39,880.60", siteProfit: "15,944.00", siteRtp: "109.33%", registerDays: 42 },
    { id: "6", merchantId: "M10021", playerId: "10310000289614", status: "离线", candidateRound: "第 6 轮", riskStartTime: "2026-05-27 22:16", lastLoginTime: "2026-05-28 10:47", rule: "高频下注", profit24h: "5,906.00", historyProfit: "91,230.00", siteProfit: "28,671.00", siteRtp: "112.91%", registerDays: 64 },
    { id: "7", merchantId: "M10057", playerId: "10310000289615", status: "在线", candidateRound: "第 2 轮", riskStartTime: "2026-05-28 12:02", lastLoginTime: "2026-05-28 13:39", rule: "命中高倍池", profit24h: "4,830.75", historyProfit: "23,114.20", siteProfit: "9,820.50", siteRtp: "110.45%", registerDays: 8 },
    { id: "8", merchantId: "M10012", playerId: "10310000289616", status: "在线", candidateRound: "第 4 轮", riskStartTime: "2026-05-28 06:40", lastLoginTime: "2026-05-28 13:02", rule: "异常退出后回归", profit24h: "4,105.00", historyProfit: "66,302.90", siteProfit: "20,540.30", siteRtp: "108.77%", registerDays: 75 },
    { id: "9", merchantId: "M10086", playerId: "10310000289617", status: "离线", candidateRound: "第 1 轮", riskStartTime: "2026-05-28 09:55", lastLoginTime: "2026-05-28 11:26", rule: "低库存盈利", profit24h: "3,920.30", historyProfit: "19,500.00", siteProfit: "8,460.10", siteRtp: "107.86%", registerDays: 12 },
    { id: "10", merchantId: "M10021", playerId: "10310000289618", status: "在线", candidateRound: "第 3 轮", riskStartTime: "2026-05-28 10:48", lastLoginTime: "2026-05-28 13:28", rule: "相似账号关联", profit24h: "3,665.40", historyProfit: "44,216.00", siteProfit: "17,950.70", siteRtp: "111.36%", registerDays: 37 },
    { id: "11", merchantId: "M10057", playerId: "10310000289619", status: "在线", candidateRound: "第 2 轮", riskStartTime: "2026-05-28 12:24", lastLoginTime: "2026-05-28 13:45", rule: "短时连赢", profit24h: "2,980.00", historyProfit: "12,840.20", siteProfit: "6,702.00", siteRtp: "106.52%", registerDays: 5 },
    { id: "12", merchantId: "M10012", playerId: "10310000289620", status: "离线", candidateRound: "第 5 轮", riskStartTime: "2026-05-27 20:33", lastLoginTime: "2026-05-28 09:18", rule: "历史盈利偏高", profit24h: "2,460.60", historyProfit: "103,780.00", siteProfit: "35,420.00", siteRtp: "115.18%", registerDays: 96 }
  ];

  function currentFile() {
    var path = decodeURIComponent(window.location.pathname || "");
    return path.split("/").pop() || "智能点控推荐.html";
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
    var files = ["玩家总览页.html", "智能点控推荐.html", "玩家点控.html"];
    return files.map(function(file) {
      var active = file === "智能点控推荐.html" ? " is-active" : "";
      return "<button type=\"button\" class=\"codex-page-tab" + active + "\" data-tab-file=\"" + file + "\"><span class=\"codex-page-tab-dot\"></span><span class=\"codex-page-tab-title\">" + file.replace(".html", "") + "</span><span class=\"codex-page-tab-close\">×</span></button>";
    }).join("");
  }

  function cell(value) {
    return value === "" || value == null ? "<span class=\"empty-muted\"></span>" : String(value);
  }

  function rowHtml(row) {
    return "<tr>" +
      "<td>" + cell(row.id) + "</td>" +
      "<td>" + cell(row.merchantId) + "</td>" +
      "<td><button type=\"button\" class=\"smart-link\" data-player-id=\"" + row.playerId + "\">" + row.playerId + "</button></td>" +
      "<td><span class=\"" + (row.status === "在线" ? "status-online" : "status-offline") + "\">" + row.status + "</span></td>" +
      "<td>" + cell(row.candidateRound) + "</td>" +
      "<td>" + cell(row.riskStartTime) + "</td>" +
      "<td>" + cell(row.lastLoginTime) + "</td>" +
      "<td>" + cell(row.rule) + "</td>" +
      "<td>" + cell(row.profit24h) + "</td>" +
      "<td>" + cell(row.historyProfit) + "</td>" +
      "<td>" + cell(row.siteProfit) + "</td>" +
      "<td>" + cell(row.siteRtp) + "</td>" +
      "<td>" + cell(row.registerDays) + "</td>" +
    "</tr>";
  }

  function renderRows() {
    var playerId = document.getElementById("filterPlayerId").value.trim();
    var merchant = document.getElementById("filterMerchant").value;
    var filtered = rows.filter(function(row) {
      var okPlayer = !playerId || row.playerId.indexOf(playerId) !== -1;
      var okMerchant = merchant === "all" || row.merchantId === merchant;
      return okPlayer && okMerchant;
    });
    var tbody = document.querySelector(".smart-table tbody");
    tbody.innerHTML = filtered.length ? filtered.map(rowHtml).join("") : "<tr><td colspan=\"13\">暂无匹配数据</td></tr>";
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
        "<h1 class=\"topbar-page-title\">智能点控推荐</h1>" +
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
        "<div class=\"smart-page\">" +
          "<div class=\"codex-page-tabs\">" + pageTabs() + "</div>" +
          "<section class=\"smart-panel\">" +
            "<div class=\"smart-filter\">" +
              "<label class=\"filter-field\">玩家ID<input id=\"filterPlayerId\" class=\"filter-input\" type=\"text\" placeholder=\"请输入\"></label>" +
              "<label class=\"filter-field\">商户站点<select id=\"filterMerchant\" class=\"filter-select\"><option value=\"all\">全部</option><option value=\"M10086\">星海娱乐</option><option value=\"M10021\">蓝鲸游戏</option></select></label>" +
              "<div class=\"smart-filter-actions\"><button class=\"btn btn-primary\" type=\"button\" data-query>查询</button><button class=\"btn btn-outline\" type=\"button\" data-reset>重置</button></div>" +
            "</div>" +
            "<table class=\"smart-table\">" +
              "<thead><tr>" +
                "<th class=\"col-id\">ID</th><th class=\"col-merchant\">商户ID</th><th class=\"col-player\">玩家ID</th><th class=\"col-status\">状态</th><th class=\"col-round\">候选轮次</th><th class=\"col-time\">风险开始时间</th><th class=\"col-time\">最后登录时间</th><th class=\"col-rule\">命中规则</th><th class=\"col-money\">24小时内盈利</th><th class=\"col-money\">历史盈利</th><th class=\"col-money\">站点盈利</th><th class=\"col-rtp\">站点RTP</th><th class=\"col-register\">注册天数</th>" +
              "</tr></thead><tbody></tbody>" +
            "</table>" +
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
        document.getElementById("filterPlayerId").value = "";
        document.getElementById("filterMerchant").value = "all";
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
