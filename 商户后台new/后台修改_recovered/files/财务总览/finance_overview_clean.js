(function() {
  var rows = [
    {
      date: "2026.1",
      totalBet: "18652340.20",
      totalPayout: "17389450.66",
      totalProfit: "12445212.31",
      totalSettle: "12445212.31",
      settled: "12445212.31",
      unsettled: "157766.22",
      totalPlayers: "4324",
      avgBet: "4324",
      avgOrders: "4324"
    },
    {
      date: "2026.2",
      totalBet: "21890432.80",
      totalPayout: "20368120.35",
      totalProfit: "1522312.45",
      totalSettle: "1519800.00",
      settled: "1467300.00",
      unsettled: "52500.00",
      totalPlayers: "4868",
      avgBet: "4496.80",
      avgOrders: "18.6"
    },
    {
      date: "2026.3",
      totalBet: "24680310.50",
      totalPayout: "22940275.12",
      totalProfit: "1740035.38",
      totalSettle: "1736400.20",
      settled: "1683920.20",
      unsettled: "52480.00",
      totalPlayers: "5126",
      avgBet: "4814.73",
      avgOrders: "19.4"
    },
    {
      date: "2026.4",
      totalBet: "19576840.00",
      totalPayout: "18120360.75",
      totalProfit: "1456479.25",
      totalSettle: "1452100.00",
      settled: "1397600.00",
      unsettled: "54500.00",
      totalPlayers: "4392",
      avgBet: "4456.47",
      avgOrders: "17.9"
    },
    {
      date: "2026.5",
      totalBet: "26342188.90",
      totalPayout: "24486320.18",
      totalProfit: "1855868.72",
      totalSettle: "1852400.00",
      settled: "1779840.00",
      unsettled: "72560.00",
      totalPlayers: "5480",
      avgBet: "4806.97",
      avgOrders: "20.1"
    },
    {
      date: "2026.6",
      totalBet: "23108650.35",
      totalPayout: "21620842.10",
      totalProfit: "1487808.25",
      totalSettle: "1481200.00",
      settled: "1419560.00",
      unsettled: "61640.00",
      totalPlayers: "5012",
      avgBet: "4610.66",
      avgOrders: "18.8"
    },
    {
      date: "2026.7",
      totalBet: "28760520.62",
      totalPayout: "26683190.40",
      totalProfit: "2077330.22",
      totalSettle: "2071900.00",
      settled: "1978320.00",
      unsettled: "93580.00",
      totalPlayers: "5934",
      avgBet: "4846.06",
      avgOrders: "21.3"
    },
    {
      date: "2026.8",
      totalBet: "25170940.18",
      totalPayout: "23620818.92",
      totalProfit: "1550121.26",
      totalSettle: "1546000.00",
      settled: "1500300.00",
      unsettled: "45700.00",
      totalPlayers: "5286",
      avgBet: "4761.06",
      avgOrders: "19.7"
    }
  ];
  var expandedMonths = {};
  var merchants = [
    { name: "星海娱乐", ratio: 0.32, users: 0.30 },
    { name: "蓝鲸游戏", ratio: 0.27, users: 0.26 },
    { name: "银河互动", ratio: 0.23, users: 0.24 },
    { name: "赤焰互娱", ratio: 0.18, users: 0.20 }
  ];

  function currentFile() {
    var path = decodeURIComponent(window.location.pathname || "");
    return path.split("/").pop() || "财务总览.html";
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
    var files = ["首页仪表盘.html", "游戏记录.html", "商户列表.html", "财务总览.html"];
    return files.map(function(file) {
      var active = file === "财务总览.html" ? " is-active" : "";
      return "<button type=\"button\" class=\"codex-page-tab" + active + "\" data-tab-file=\"" + file + "\"><span class=\"codex-page-tab-dot\"></span><span class=\"codex-page-tab-title\">" + file.replace(".html", "") + "</span><span class=\"codex-page-tab-close\">×</span></button>";
    }).join("");
  }

  function cell(value) {
    return value === "" || value == null ? "" : String(value);
  }

  function numberValue(value) {
    return Number(String(value || "0").replace(/,/g, "")) || 0;
  }

  function moneyText(value) {
    return Number(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function countText(value) {
    return Number(value).toLocaleString("en-US", { maximumFractionDigits: 0 });
  }

  function merchantRows(row) {
    var totalPlayers = numberValue(row.totalPlayers);
    return merchants.map(function(merchant, index) {
      var totalBet = numberValue(row.totalBet) * merchant.ratio;
      var totalPayout = numberValue(row.totalPayout) * (merchant.ratio + (index - 1.5) * 0.006);
      var totalProfit = totalBet - totalPayout;
      var totalSettle = totalProfit * 0.985;
      var settled = totalSettle * 0.94;
      var unsettled = totalSettle - settled;
      var players = Math.max(1, Math.round(totalPlayers * merchant.users));
      return {
        date: merchant.name,
        totalBet: moneyText(totalBet),
        totalPayout: moneyText(totalPayout),
        totalProfit: moneyText(totalProfit),
        totalSettle: moneyText(totalSettle),
        settled: moneyText(settled),
        unsettled: moneyText(unsettled),
        totalPlayers: countText(players),
        avgBet: moneyText(totalBet / players),
        avgOrders: (14 + index * 1.8 + Number(row.date.split(".")[1]) * 0.1).toFixed(1)
      };
    });
  }

  function rowHtml(row) {
    var expanded = !!expandedMonths[row.date];
    var html = "<tr class=\"finance-summary-row" + (expanded ? " is-expanded" : "") + "\" data-month=\"" + row.date + "\">" +
      "<td><span class=\"finance-expand-icon\"></span>" + cell(row.date) + "</td>" +
      "<td>" + cell(row.totalBet) + "</td>" +
      "<td>" + cell(row.totalPayout) + "</td>" +
      "<td>" + cell(row.totalProfit) + "</td>" +
      "<td>" + cell(row.totalSettle) + "</td>" +
      "<td>" + cell(row.settled) + "</td>" +
      "<td>" + cell(row.unsettled) + "</td>" +
      "<td>" + cell(row.totalPlayers) + "</td>" +
      "<td>" + cell(row.avgBet) + "</td>" +
      "<td>" + cell(row.avgOrders) + "</td>" +
    "</tr>";
    if (expanded) {
      html += merchantRows(row).map(function(item) {
        return "<tr class=\"finance-detail-row\" data-parent-month=\"" + row.date + "\">" +
          "<td><span class=\"finance-merchant-name\">" + item.date + "</span></td>" +
          "<td>" + item.totalBet + "</td>" +
          "<td>" + item.totalPayout + "</td>" +
          "<td>" + item.totalProfit + "</td>" +
          "<td>" + item.totalSettle + "</td>" +
          "<td>" + item.settled + "</td>" +
          "<td>" + item.unsettled + "</td>" +
          "<td>" + item.totalPlayers + "</td>" +
          "<td>" + item.avgBet + "</td>" +
          "<td>" + item.avgOrders + "</td>" +
        "</tr>";
      }).join("");
    }
    return html;
  }

  function renderRows() {
    var tbody = document.querySelector(".finance-table tbody");
    tbody.innerHTML = rows.map(rowHtml).join("");
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
        "<h1 class=\"topbar-page-title\">财务总览</h1>" +
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
        "<div class=\"finance-page\">" +
          "<div class=\"codex-page-tabs\">" + pageTabs() + "</div>" +
          "<section class=\"finance-panel\">" +
            "<div class=\"finance-filter\">" +
              "<span class=\"finance-filter-label\">时间</span>" +
              "<div class=\"finance-date-range\">" +
                "<span class=\"finance-date-icon\">▣</span>" +
                "<input type=\"text\" value=\"2026-04-16\" aria-label=\"开始日期\">" +
                "<span>-</span>" +
                "<input type=\"text\" value=\"2026-04-16\" aria-label=\"结束日期\">" +
              "</div>" +
            "</div>" +
            "<table class=\"finance-table\">" +
              "<thead><tr>" +
                "<th class=\"finance-col-date\">日期</th>" +
                "<th class=\"finance-col-money\">总下注(美元)</th>" +
                "<th class=\"finance-col-money\">总返奖(美元)</th>" +
                "<th class=\"finance-col-money\">总盈利(美元)</th>" +
                "<th class=\"finance-col-money\">总结算(美元)</th>" +
                "<th class=\"finance-col-money\">已结算营收(美元)</th>" +
                "<th class=\"finance-col-money\">未结算营收(美元)</th>" +
                "<th class=\"finance-col-count\">总下注人</th>" +
                "<th class=\"finance-col-count\">人均下注额</th>" +
                "<th class=\"finance-col-count\">人均注单数</th>" +
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
      var summaryRow = event.target.closest(".finance-summary-row");
      if (summaryRow) {
        var month = summaryRow.getAttribute("data-month");
        expandedMonths[month] = !expandedMonths[month];
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
