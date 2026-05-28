(function() {
  var merchants = [
    { id: "all", name: "全部" },
    { id: "M10086", name: "星海娱乐" },
    { id: "M10021", name: "蓝鲸游戏" },
    { id: "M10057", name: "银河互动" },
    { id: "M10012", name: "赤焰互娱" }
  ];

  var rows = [
    { tag: "高频玩家", playerId: "10310000289609", loginIp: "103.44.18.92", createdAt: "2026-05-01 10:21:44", lastLogin: "2026-05-28 13:12:09", status: "在线", currency: "INR", todayBet: 12860, historyBet: 662300, todayProfit: -836, historyProfit: -27388, balance: 2840, loginCount: "12 / 312", merchant: "M10086" },
    { tag: "VIP金牌", playerId: "10310000289610", loginIp: "45.118.22.16", createdAt: "2026-05-03 09:18:31", lastLogin: "2026-05-28 12:44:51", status: "离线", currency: "INR", todayBet: 8800, historyBet: 401620, todayProfit: 2060, historyProfit: -11898, balance: 12420, loginCount: "7 / 189", merchant: "M10021" },
    { tag: "观察玩家", playerId: "10310000289611", loginIp: "119.92.63.41", createdAt: "2026-05-06 16:04:22", lastLogin: "2026-05-28 11:02:15", status: "在线", currency: "GHS", todayBet: 3660, historyBet: 135420, todayProfit: -450, historyProfit: -5900, balance: 890, loginCount: "5 / 76", merchant: "M10057" },
    { tag: "新进玩家", playerId: "10310000289612", loginIp: "182.71.44.88", createdAt: "2026-05-28 08:12:09", lastLogin: "2026-05-28 08:16:30", status: "在线", currency: "INR", todayBet: 980, historyBet: 980, todayProfit: 240, historyProfit: 240, balance: 320, loginCount: "2 / 2", merchant: "M10012" },
    { tag: "常规玩家", playerId: "10310000289613", loginIp: "103.91.12.74", createdAt: "2026-04-18 22:42:10", lastLogin: "2026-05-27 23:28:11", status: "离线", currency: "INR", todayBet: 7420, historyBet: 286720, todayProfit: -540, historyProfit: -7540, balance: 4560, loginCount: "0 / 124", merchant: "M10086" },
    { tag: "高活跃", playerId: "10310000289614", loginIp: "154.160.18.33", createdAt: "2026-04-11 07:24:56", lastLogin: "2026-05-28 10:47:20", status: "在线", currency: "GHS", todayBet: 18840, historyBet: 884520, todayProfit: -815, historyProfit: -34350, balance: 6880, loginCount: "18 / 428", merchant: "M10021" },
    { tag: "策略观察", playerId: "10310000289615", loginIp: "94.200.15.36", createdAt: "2026-03-29 12:01:48", lastLogin: "2026-05-28 09:05:48", status: "离线", currency: "USD", todayBet: 5240, historyBet: 248500, todayProfit: 870, historyProfit: -9170, balance: 9810, loginCount: "4 / 91", merchant: "M10057" }
  ];

  function currentFile() {
    var path = decodeURIComponent(window.location.pathname || "");
    return path.split("/").pop() || "玩家总览页.html";
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
    var files = ["玩家总览页.html", "玩家在线数据.html", "玩家留存.html", "玩家点控.html"];
    return files.map(function(file) {
      var active = file === "玩家总览页.html" ? " is-active" : "";
      return "<button type=\"button\" class=\"codex-page-tab" + active + "\" data-tab-file=\"" + file + "\"><span class=\"codex-page-tab-dot\"></span><span class=\"codex-page-tab-title\">" + file.replace(".html", "") + "</span><span class=\"codex-page-tab-close\">×</span></button>";
    }).join("");
  }

  function money(value) {
    var text = Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return value < 0 ? "-" + text : text;
  }

  function merchantOptions() {
    return merchants.map(function(item) {
      return "<option value=\"" + item.id + "\">" + item.name + "</option>";
    }).join("");
  }

  function rowHtml(row) {
    return "<tr>" +
      "<td>" + row.tag + "</td>" +
      "<td><button type=\"button\" class=\"player-link\" data-player-id=\"" + row.playerId + "\">" + row.playerId + "</button></td>" +
      "<td>" + row.loginIp + "</td>" +
      "<td>" + row.createdAt + "</td>" +
      "<td>" + row.lastLogin + "</td>" +
      "<td>" + (row.status === "在线" ? "<span class=\"status-online\">在线</span>" : "<span class=\"status-offline\">离线</span>") + "</td>" +
      "<td>" + row.currency + "</td>" +
      "<td>" + money(row.todayBet) + "</td>" +
      "<td class=\"" + (row.todayProfit >= 0 ? "money-positive" : "money-negative") + "\">" + money(row.todayProfit) + "</td>" +
      "<td>" + money(row.historyBet) + "</td>" +
      "<td class=\"" + (row.historyProfit >= 0 ? "money-positive" : "money-negative") + "\">" + money(row.historyProfit) + "</td>" +
      "<td>" + money(row.balance) + "</td>" +
      "<td>" + row.loginCount + "</td>" +
    "</tr>";
  }

  function playerById(playerId) {
    return rows.find(function(row) {
      return row.playerId === playerId;
    });
  }

  function modalTabsHtml() {
    var tabs = ["基础信息", "下注信息", "登录日志", "用户标签", "关联账号"];
    return tabs.map(function(tab, index) {
      return "<button type=\"button\" class=\"player-modal-tab" + (index === 0 ? " is-active" : "") + "\" data-player-tab=\"" + tab + "\">" + tab + "</button>";
    }).join("");
  }

  function baseInfoHtml(row) {
    return "<div class=\"player-base-layout\">" +
      "<div class=\"modal-section-head\"><span>基础资料</span><button type=\"button\" class=\"control-btn\">点控</button></div>" +
      "<table class=\"info-table\"><tbody>" +
        "<tr><th>账号ID</th><td>" + row.playerId + "</td><th>商户站点</th><td>" + merchantName(row.merchant) + " " + row.merchant + "</td></tr>" +
        "<tr><th>余额</th><td>" + money(row.balance) + "</td><th>游戏局数</th><td>" + Math.max(38, Math.round(row.historyBet / 1800)).toLocaleString("en-US") + "</td></tr>" +
        "<tr><th>总返奖</th><td>" + money(row.historyBet + row.historyProfit) + "</td><th>总派奖</th><td>" + money(row.historyBet * 0.18) + "</td></tr>" +
        "<tr><th>累计输赢</th><td class=\"" + (row.historyProfit >= 0 ? "money-positive" : "money-negative") + "\">" + money(row.historyProfit) + "</td><th>RTP</th><td>" + ((row.historyBet + row.historyProfit) / row.historyBet * 100).toFixed(2) + "%</td></tr>" +
        "<tr><th>创建时间</th><td>" + row.createdAt + "</td><th>登录次数</th><td>" + row.loginCount.split("/").pop().trim() + "</td></tr>" +
        "<tr><th>最后登录时间</th><td>" + row.lastLogin + "</td><th>最后登录IP</th><td><span>" + row.loginIp + "</span><button type=\"button\" class=\"ip-history-toggle\" data-ip-history>展开</button></td></tr>" +
        "<tr><th>控制</th><td colspan=\"3\">RTP 70%　目标 " + money(row.historyBet * 0.12) + "　目前 " + money(row.historyProfit) + "</td></tr>" +
      "</tbody></table>" +
      "<div class=\"ip-history-panel\" hidden>" +
        "<div class=\"ip-history-title\">历史登录IP <span>共 4 个</span></div>" +
        "<div class=\"ip-history-list\">" +
          "<span>" + row.loginIp + "</span>" +
          "<span>103.44.18.92</span>" +
          "<span>45.118.22.16</span>" +
          "<span>182.74.21.109</span>" +
        "</div>" +
      "</div>" +
    "</div>";
  }

  function betInfoHtml(row) {
    var data = [
      ["R" + row.playerId.slice(-6) + "01", "2026-05-28 09:21:16", "B-" + row.playerId.slice(-5), "金虎纳福", money(row.todayBet * 0.12), money(row.todayBet * 0.28), "1.36", "0.72", "低" + money(row.todayBet * 0.08), "观察", money(row.balance - row.todayBet * 0.12 + row.todayBet * 0.28)],
      ["R" + row.playerId.slice(-6) + "02", "2026-05-28 10:44:03", "B-" + row.playerId.slice(-4), "火热辣椒", money(row.todayBet * 0.18), money(row.todayBet * 0.42), "1.08", "0.91", "高" + money(row.todayBet * 0.11), "正常", money(row.balance)]
    ];
    return tableHtml(["记录ID", "时间", "牌局编号", "游戏名称", "下注金额", "游戏返奖", "返奖倍数", "T", "高/低库存", "控制策略", "账户余额"], data, "bet-info-table");
  }

  function loginLogHtml(row) {
    var data = [
      [row.lastLogin, row.loginIp, "Chrome 125 / Windows 11", "登录", money(row.balance)],
      ["2026-05-27 21:08:31", "103.44.18.92", "Safari 17 / iOS 17", "登录", money(row.balance - 320)],
      ["2026-05-26 18:42:17", "45.118.22.16", "Edge 124 / Windows 10", "退出", money(row.balance - 560)]
    ];
    return tableHtml(["时间", "登录ip", "登录设备", "操作", "登录余额"], data);
  }

  function tagsHtml(row) {
    var data = [
      ["【新】高频活跃户", "获利即走，RTP异常，自杀式倍投，机械下注"],
      ["【白名单潜力】\n【新】优质贡献户", "自杀式倍投，机械下注"],
      ["重点风控核心风险户", "快速大额盈利，机械下注"]
    ];
    return tableHtml(["标签", "说明"], data, "tag-table");
  }

  function linkedAccountsHtml(row) {
    var linkedId = String(Number(row.playerId) + 246);
    var similarId = String(Number(row.playerId) + 531);
    var similarId2 = String(Number(row.playerId) + 918);
    var data = [
      [row.playerId, "29", Math.max(38, Math.round(row.historyBet / 1800)), money(row.historyProfit) + " (" + ((row.historyBet + row.historyProfit) / row.historyBet * 100).toFixed(2) + "%)", money(row.balance)],
      [linkedId, "18", "72", money(106500.37) + " (112.54%)", "905255"]
    ];
    var similarData = [
      [similarId, "26", "118", money(row.historyProfit * 0.82) + " (108.31%)", money(row.balance * 0.76)],
      [similarId2, "31", "96", money(row.historyProfit * 0.64) + " (104.92%)", money(row.balance * 0.58)]
    ];
    return "<div class=\"linked-title\">同IP账号</div>" +
      tableHtml(["用户id", "注册时长(天)", "游戏局数", "累计输赢(RTP)", "余额"], data) +
      "<div class=\"linked-title linked-title-secondary\">行为相似账号</div>" +
      tableHtml(["用户id", "注册时长(天)", "游戏局数", "累计输赢(RTP)", "余额"], similarData);
  }

  function tableHtml(headers, data, extraClass) {
    return "<div class=\"modal-table-card\"><table class=\"modal-table " + (extraClass || "") + "\"><thead><tr>" +
      headers.map(function(header) { return "<th>" + header + "</th>"; }).join("") +
      "</tr></thead><tbody>" +
      data.map(function(row) {
        return "<tr>" + row.map(function(cell) {
          return "<td>" + String(cell).replace(/\n/g, "<br>") + "</td>";
        }).join("") + "</tr>";
      }).join("") +
      "</tbody></table></div>";
  }

  function merchantName(id) {
    var item = merchants.find(function(merchant) {
      return merchant.id === id;
    });
    return item ? item.name : id;
  }

  function updateTopbarTime(app) {
    var node = app.querySelector("[data-topbar-time]");
    if (!node) return;
    var now = new Date();
    var hh = String(now.getHours()).padStart(2, "0");
    var mm = String(now.getMinutes()).padStart(2, "0");
    node.textContent = hh + ":" + mm + " 中国";
  }

  function modalContent(tab, row) {
    if (tab === "下注信息") return betInfoHtml(row);
    if (tab === "登录日志") return loginLogHtml(row);
    if (tab === "用户标签") return tagsHtml(row);
    if (tab === "关联账号") return linkedAccountsHtml(row);
    return baseInfoHtml(row);
  }

  function openPlayerModal(playerId) {
    var row = playerById(playerId);
    if (!row) return;
    var host = document.getElementById("playerModalHost");
    host.innerHTML = "<div class=\"player-modal-mask\">" +
      "<div class=\"player-modal-panel\" data-active-player=\"" + row.playerId + "\">" +
        "<div class=\"player-modal-head\"><div class=\"player-modal-title\">玩家详情</div><button type=\"button\" class=\"player-modal-close\" data-modal-close>×</button></div>" +
        "<div class=\"player-modal-tabs\">" + modalTabsHtml() + "</div>" +
        "<div class=\"player-modal-body\">" + baseInfoHtml(row) + "</div>" +
        "<div class=\"player-modal-actions\"><button type=\"button\" class=\"modal-primary\" data-modal-close>确定</button></div>" +
      "</div>" +
    "</div>";
  }

  function renderRows() {
    var playerId = document.getElementById("filterPlayerId").value.trim();
    var merchant = document.getElementById("filterMerchant").value;
    var loginIp = document.getElementById("filterLoginIp").value.trim();
    var tbody = document.querySelector(".player-table tbody");
    var filtered = rows.filter(function(row) {
      var okPlayer = !playerId || row.playerId.indexOf(playerId) !== -1;
      var okMerchant = merchant === "all" || row.merchant === merchant;
      var okIp = !loginIp || row.loginIp.indexOf(loginIp) !== -1;
      return okPlayer && okMerchant && okIp;
    });
    tbody.innerHTML = filtered.length ? filtered.map(rowHtml).join("") : "<tr><td colspan=\"13\">暂无匹配数据</td></tr>";
  }

  function shellHtml() {
    return "<div class=\"app-shell\">" +
      "<a class=\"app-brand\" href=\"首页仪表盘.html\">GB总后台</a>" +
      "<header class=\"app-topbar\">" +
        "<h1 class=\"topbar-page-title\">玩家总览页</h1>" +
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
      "<main class=\"app-main\"><div class=\"player-page\">" +
        "<div class=\"codex-page-tabs\">" + pageTabs() + "</div>" +
        "<div class=\"player-panel\">" +
          "<div class=\"filter-bar\">" +
            "<label class=\"filter-item\">玩家ID<input class=\"filter-input\" id=\"filterPlayerId\" placeholder=\"请输入\"></label>" +
            "<label class=\"filter-item\">商户站点<select class=\"filter-select\" id=\"filterMerchant\">" + merchantOptions() + "</select></label>" +
            "<label class=\"filter-item\">登录IP<input class=\"filter-input\" id=\"filterLoginIp\" placeholder=\"请输入\"></label>" +
            "<label class=\"filter-item\">创建时间<div class=\"date-range\"><input class=\"date-input\" type=\"text\" placeholder=\"开始时间\"><span class=\"date-sep\">-</span><input class=\"date-input\" type=\"text\" placeholder=\"结束时间\"></div></label>" +
            "<label class=\"filter-item\">最后登录<div class=\"date-range\"><input class=\"date-input\" type=\"text\" placeholder=\"开始时间\"><span class=\"date-sep\">-</span><input class=\"date-input\" type=\"text\" placeholder=\"结束时间\"></div></label>" +
            "<div class=\"filter-actions\"><button class=\"btn btn-primary\" type=\"button\" data-query>查询</button><button class=\"btn btn-outline\" type=\"button\" data-reset>重置</button></div>" +
          "</div>" +
          "<div class=\"table-wrap\"><table class=\"player-table\"><thead><tr>" +
            "<th>玩家标签</th><th>玩家ID</th><th>登录IP</th><th>创建时间</th><th>最后登录时间</th><th>状态</th><th>币种</th><th>今日下注</th><th>今日输赢</th><th>历史下注</th><th>历史输赢</th><th>余额</th><th>今日/总登录次数</th>" +
          "</tr></thead><tbody></tbody></table></div><div id=\"playerModalHost\"></div>" +
        "</div>" +
      "</div></main>" +
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
        document.getElementById("filterLoginIp").value = "";
        renderRows();
        return;
      }
      var playerLink = event.target.closest("[data-player-id]");
      if (playerLink) {
        openPlayerModal(playerLink.getAttribute("data-player-id"));
        return;
      }
      if (event.target.closest("[data-modal-close]") || event.target.classList.contains("player-modal-mask")) {
        document.getElementById("playerModalHost").innerHTML = "";
        return;
      }
      var tab = event.target.closest("[data-player-tab]");
      if (tab) {
        var panel = tab.closest(".player-modal-panel");
        var row = playerById(panel.getAttribute("data-active-player"));
        Array.prototype.forEach.call(panel.querySelectorAll("[data-player-tab]"), function(item) {
          item.classList.toggle("is-active", item === tab);
        });
        panel.querySelector(".player-modal-body").innerHTML = modalContent(tab.getAttribute("data-player-tab"), row);
        return;
      }
      var ipHistory = event.target.closest("[data-ip-history]");
      if (ipHistory) {
        var historyPanel = ipHistory.closest(".player-base-layout").querySelector(".ip-history-panel");
        var willShow = historyPanel.hidden;
        historyPanel.hidden = !willShow;
        ipHistory.textContent = willShow ? "收起" : "展开";
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
