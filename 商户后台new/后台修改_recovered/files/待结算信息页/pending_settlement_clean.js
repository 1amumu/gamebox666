(function() {
  var rows = [
    { period: "2001-01-01 ~ 2001-01-31", id: "M10086", name: "星海娱乐", type: "月结商户", flow: 20000, profit: 20000, amount: 322243.4342 },
    { period: "2001-02-01 ~ 2001-02-28", id: "M10086", name: "星海娱乐", type: "月结商户", flow: 286500, profit: 42880, amount: 42880 },
    { period: "2001-03-01 ~ 2001-03-31", id: "M10086", name: "星海娱乐", type: "月结商户", flow: 318420, profit: 53640, amount: 53640 },
    { period: "2001-01-01 ~ 2001-01-31", id: "M10057", name: "银河互动", type: "月结商户", flow: 326420, profit: 48210, amount: 48210 },
    { period: "2001-02-01 ~ 2001-02-28", id: "M10057", name: "银河互动", type: "月结商户", flow: 352900, profit: 50180, amount: 50180 },
    { period: "2001-03-01 ~ 2001-03-31", id: "M20001", name: "南亚娱乐城", type: "月结商户", flow: 418900, profit: 62340, amount: 62340 },
    { period: "2001-04-01 ~ 2001-04-30", id: "M20001", name: "南亚娱乐城", type: "月结商户", flow: 446720, profit: 70150, amount: 70150 },
    { period: "2001-04-01 ~ 2001-04-30", id: "M30018", name: "海湾娱乐", type: "月结商户", flow: 512680, profit: 74620, amount: 74620 },
    { period: "2001-05-01 ~ 2001-05-31", id: "M30018", name: "海湾娱乐", type: "月结商户", flow: 538210, profit: 81290, amount: 81290 },
    { period: "2001-05-01 ~ 2001-05-31", id: "M40009", name: "金冠游戏", type: "月结商户", flow: 468300, profit: 58190, amount: 58190 },
    { period: "2001-06-01 ~ 2001-06-30", id: "M50003", name: "银月互动", type: "月结商户", flow: 389120, profit: 50380, amount: 50380 },
    { period: "2001-07-01 ~ 2001-07-31", id: "M50003", name: "银月互动", type: "月结商户", flow: 421760, profit: 53690, amount: 53690 }
  ];

  function currentFile() {
    var path = decodeURIComponent(window.location.pathname || "");
    return path.split("/").pop() || "待结算信息页.html";
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
    var tabs = [
      { file: "财务总览.html", title: "财务总览" },
      { file: "汇率查询.html", title: "汇率查询" },
      { file: "结算信息页.html", title: "结算商户" },
      { file: "待结算信息页.html", title: "待结算信息" },
      { file: "充值订单页.html", title: "充值订单" }
    ];
    return tabs.map(function(tab) {
      var active = tab.file === "待结算信息页.html" ? " is-active" : "";
      return "<button type=\"button\" class=\"codex-page-tab" + active + "\" data-tab-file=\"" + tab.file + "\"><span class=\"codex-page-tab-dot\"></span><span class=\"codex-page-tab-title\">" + tab.title + "</span><span class=\"codex-page-tab-close\">×</span></button>";
    }).join("");
  }

  function money(value) {
    return Number(value || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  }

  function dateText(period) {
    return String(period || "").replace(/-/g, ".").replace(" ~ ", " ~ ");
  }

  function rowHtml(row, index) {
    return "<tr>" +
      "<td>" + row.id + "</td>" +
      "<td>" + row.name + "</td>" +
      "<td><span class=\"pending-type\">" + row.type + "</span></td>" +
      "<td class=\"pending-money\">" + money(row.flow) + "</td>" +
      "<td class=\"pending-money\">" + money(row.profit) + "</td>" +
      "<td>" + dateText(row.period) + "</td>" +
      "<td class=\"pending-money\">" + money(row.amount) + "</td>" +
      "<td><div class=\"pending-detail\"><button type=\"button\" class=\"pending-mini-btn\" data-brief=\"" + index + "\">简报</button><button type=\"button\" class=\"pending-mini-btn\" data-manual=\"" + index + "\">手动结算</button></div></td>" +
    "</tr>";
  }

  function renderRows() {
    var name = document.getElementById("pendingMerchantName").value.trim().toLowerCase();
    var id = document.getElementById("pendingMerchantId").value.trim().toLowerCase();
    var start = document.getElementById("pendingStart").value.trim();
    var end = document.getElementById("pendingEnd").value.trim();
    var filtered = rows.filter(function(row) {
      var periodStart = row.period.split(" ~ ")[0];
      return (!name || row.name.toLowerCase().indexOf(name) !== -1) &&
        (!id || row.id.toLowerCase().indexOf(id) !== -1) &&
        (!start || periodStart >= start) &&
        (!end || periodStart <= end);
    });
    document.querySelector(".pending-table tbody").innerHTML = filtered.length ? filtered.map(function(row) {
      return rowHtml(row, rows.indexOf(row));
    }).join("") : "<tr><td colspan=\"8\">暂无匹配数据</td></tr>";
  }

  function openBrief(row) {
    var slotBet = row.flow * 0.52;
    var flightBet = row.flow * 0.31;
    var fishBet = row.flow * 0.17;
    document.getElementById("pendingModalHost").innerHTML = "<div class=\"pending-modal-mask\">" +
      "<div class=\"pending-modal\">" +
        "<button type=\"button\" class=\"pending-modal-close\" data-modal-close>×</button>" +
        "<div class=\"pending-modal-head\"><strong>待结算简报</strong><span>" + row.name + "（" + row.id + "） / " + dateText(row.period) + "</span></div>" +
        "<div class=\"pending-modal-body\">" +
          "<div class=\"pending-summary\">" +
            "<div><span>商户类型</span><strong>" + row.type + "</strong></div>" +
            "<div><span>应结算金额</span><strong>" + money(row.amount) + "</strong></div>" +
            "<div><span>总盈利</span><strong>" + money(row.profit) + "</strong></div>" +
          "</div>" +
          "<table class=\"pending-brief-table\"><thead><tr><th>游戏分类</th><th>总流水(美元)</th><th>总盈利(美元)</th><th>结算金额</th></tr></thead><tbody>" +
            "<tr><td>小飞机</td><td>" + money(flightBet) + "</td><td>" + money(row.profit * 0.36) + "</td><td>" + money(row.amount * 0.36) + "</td></tr>" +
            "<tr><td>slot游戏</td><td>" + money(slotBet) + "</td><td>" + money(row.profit * 0.47) + "</td><td>" + money(row.amount * 0.47) + "</td></tr>" +
            "<tr><td>fish游戏</td><td>" + money(fishBet) + "</td><td>" + money(row.profit * 0.17) + "</td><td>" + money(row.amount * 0.17) + "</td></tr>" +
          "</tbody></table>" +
        "</div>" +
        "<div class=\"pending-modal-actions\"><button type=\"button\" class=\"btn btn-outline\" data-modal-close>确定</button></div>" +
      "</div>" +
    "</div>";
  }

  function openManual(row) {
    document.getElementById("pendingModalHost").innerHTML = "<div class=\"pending-modal-mask\">" +
      "<div class=\"pending-modal\">" +
        "<button type=\"button\" class=\"pending-modal-close\" data-modal-close>×</button>" +
        "<div class=\"pending-modal-head\"><strong>手动结算确认</strong><span>" + row.name + "（" + row.id + "）</span></div>" +
        "<div class=\"pending-modal-body\">" +
          "<p class=\"pending-manual-note\">确认后将以当前待结算金额生成结算记录，并从待结算列表中移出。</p>" +
          "<div class=\"pending-manual-grid\">" +
            "<span>结算周期</span><strong>" + dateText(row.period) + "</strong>" +
            "<span>商户类型</span><strong>" + row.type + "</strong>" +
            "<span>总流水</span><strong>" + money(row.flow) + " 美元</strong>" +
            "<span>总盈利</span><strong>" + money(row.profit) + " 美元</strong>" +
            "<span>应结算金额</span><strong>" + money(row.amount) + "</strong>" +
          "</div>" +
        "</div>" +
        "<div class=\"pending-modal-actions\"><button type=\"button\" class=\"btn btn-outline\" data-modal-close>取消</button><button type=\"button\" class=\"btn btn-primary\" data-modal-close>确定</button></div>" +
      "</div>" +
    "</div>";
  }

  function updateTopbarTime(app) {
    var node = app.querySelector("[data-topbar-time]");
    if (!node) return;
    var now = new Date();
    node.textContent = String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0") + " 中国";
  }

  function shellHtml() {
    return "<div class=\"app-shell\">" +
      "<a class=\"app-brand\" href=\"首页仪表盘.html\">GB总后台</a>" +
      "<header class=\"app-topbar\">" +
        "<h1 class=\"topbar-page-title\">待结算信息</h1>" +
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
        "<div class=\"pending-page\">" +
          "<div class=\"codex-page-tabs\">" + pageTabs() + "</div>" +
          "<section class=\"pending-panel\">" +
            "<div class=\"pending-filter\">" +
              "<label class=\"pending-field\">商户名称<input id=\"pendingMerchantName\" class=\"pending-input\" type=\"text\" placeholder=\"请输入\"></label>" +
              "<label class=\"pending-field\">商户ID<input id=\"pendingMerchantId\" class=\"pending-input\" type=\"text\" placeholder=\"请输入\"></label>" +
              "<label class=\"pending-field\">商户类型<select id=\"pendingMerchantType\" class=\"pending-select\" disabled><option value=\"月结商户\">月结商户</option></select></label>" +
              "<label class=\"pending-field\">时间范围<div class=\"pending-date-range\"><input id=\"pendingStart\" type=\"date\"><span>-</span><input id=\"pendingEnd\" type=\"date\"></div></label>" +
              "<div class=\"pending-actions\"><button class=\"btn btn-primary\" type=\"button\" data-query>查询</button><button class=\"btn btn-outline\" type=\"button\" data-reset>重置</button></div>" +
            "</div>" +
            "<table class=\"pending-table\">" +
              "<thead><tr>" +
                "<th class=\"pending-col-id\">商户ID</th>" +
                "<th class=\"pending-col-name\">商户名称</th>" +
                "<th class=\"pending-col-type\">商户类型</th>" +
                "<th class=\"pending-col-money\">总流水(美元)</th>" +
                "<th class=\"pending-col-money\">总盈利(美元)<span class=\"pending-sort\"></span></th>" +
                "<th class=\"pending-col-period\">开始-结束日期</th>" +
                "<th class=\"pending-col-money\">应结算金额</th>" +
                "<th class=\"pending-col-action\">查看详细</th>" +
              "</tr></thead><tbody></tbody>" +
            "</table>" +
            "<div id=\"pendingModalHost\"></div>" +
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
        document.getElementById("pendingMerchantName").value = "";
        document.getElementById("pendingMerchantId").value = "";
        document.getElementById("pendingMerchantType").value = "月结商户";
        document.getElementById("pendingStart").value = "";
        document.getElementById("pendingEnd").value = "";
        renderRows();
        return;
      }
      var brief = event.target.closest("[data-brief]");
      if (brief) {
        openBrief(rows[Number(brief.getAttribute("data-brief"))]);
        return;
      }
      var manual = event.target.closest("[data-manual]");
      if (manual) {
        openManual(rows[Number(manual.getAttribute("data-manual"))]);
        return;
      }
      if (event.target.closest("[data-modal-close]") || event.target.classList.contains("pending-modal-mask")) {
        document.getElementById("pendingModalHost").innerHTML = "";
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
