(function() {
  var rows = [
    { period: "2001-01-01 ~ 2001-01-31", id: "M10086", name: "星海娱乐", type: "月付商户", flow: "428860.00", profit: "88888.00", amount: "88888.00" },
    { period: "2001-01-01 ~ 2001-01-31", id: "M10021", name: "蓝鲸游戏", type: "预充值商户", flow: "352400.00", profit: "88888.00", amount: "88888.00" },
    { period: "2001-02-01 ~ 2001-02-28", id: "M10057", name: "银河互动", type: "月付商户", flow: "326420.00", profit: "48210.00", amount: "48210.00" },
    { period: "2001-02-01 ~ 2001-02-28", id: "M10012", name: "赤焰互娱", type: "预充值商户", flow: "285730.00", profit: "36980.00", amount: "36980.00" },
    { period: "2001-03-01 ~ 2001-03-31", id: "M20001", name: "南亚娱乐城", type: "月付商户", flow: "418900.00", profit: "62340.00", amount: "62340.00" },
    { period: "2001-03-01 ~ 2001-03-31", id: "M30001", name: "极光游戏", type: "预充值商户", flow: "236500.00", profit: "28760.00", amount: "28760.00" },
    { period: "2001-04-01 ~ 2001-04-30", id: "M30018", name: "海湾娱乐", type: "月付商户", flow: "512680.00", profit: "74620.00", amount: "74620.00" },
    { period: "2001-04-01 ~ 2001-04-30", id: "M30026", name: "风暴互娱", type: "预充值商户", flow: "198420.00", profit: "22680.00", amount: "22680.00" },
    { period: "2001-05-01 ~ 2001-05-31", id: "M40009", name: "金冠游戏", type: "月付商户", flow: "468300.00", profit: "58190.00", amount: "58190.00" },
    { period: "2001-05-01 ~ 2001-05-31", id: "M40016", name: "辉耀娱乐", type: "预充值商户", flow: "304760.00", profit: "41250.00", amount: "41250.00" },
    { period: "2001-06-01 ~ 2001-06-30", id: "M50003", name: "银月互动", type: "月付商户", flow: "389120.00", profit: "50380.00", amount: "50380.00" },
    { period: "2001-06-01 ~ 2001-06-30", id: "M50027", name: "万象游戏", type: "预充值商户", flow: "276940.00", profit: "31970.00", amount: "31970.00" },
    { period: "2001-07-01 ~ 2001-07-31", id: "M60011", name: "星河娱乐城", type: "月付商户", flow: "602500.00", profit: "96540.00", amount: "96540.00" },
    { period: "2001-07-01 ~ 2001-07-31", id: "M60022", name: "蓝海互娱", type: "预充值商户", flow: "335880.00", profit: "44820.00", amount: "44820.00" },
    { period: "2001-08-01 ~ 2001-08-31", id: "M70008", name: "晨曦游戏", type: "月付商户", flow: "421760.00", profit: "53690.00", amount: "53690.00" },
    { period: "2001-08-01 ~ 2001-08-31", id: "M70019", name: "云顶娱乐", type: "预充值商户", flow: "249600.00", profit: "29840.00", amount: "29840.00" }
  ];
  function currentFile() {
    var path = decodeURIComponent(window.location.pathname || "");
    return path.split("/").pop() || "结算信息页.html";
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
      var active = file === "结算信息页.html" ? " is-active" : "";
      var title = file === "结算信息页.html" ? "结算商户" : file.replace(".html", "");
      return "<button type=\"button\" class=\"codex-page-tab" + active + "\" data-tab-file=\"" + file + "\"><span class=\"codex-page-tab-dot\"></span><span class=\"codex-page-tab-title\">" + title + "</span><span class=\"codex-page-tab-close\">×</span></button>";
    }).join("");
  }

  function cell(value) {
    return value === "" || value == null ? "" : String(value);
  }

  function rowHtml(row, index) {
    var detailLinks = row.type === "预充值商户"
      ? "<button type=\"button\" class=\"settlement-link-btn\" data-settlement-brief=\"" + index + "\">简报</button>"
      : "<button type=\"button\" class=\"settlement-link-btn\" data-settlement-brief=\"" + index + "\">简报</button><button type=\"button\" class=\"settlement-link-btn\" data-settlement-info=\"" + index + "\">信息</button>";
    return "<tr>" +
      "<td>" + cell(row.period) + "</td>" +
      "<td>" + cell(row.id) + "</td>" +
      "<td>" + cell(row.name) + "</td>" +
      "<td><span class=\"settlement-type\">" + cell(row.type) + "</span></td>" +
      "<td class=\"settlement-money\">" + cell(row.flow) + "</td>" +
      "<td class=\"settlement-money\">" + cell(row.profit) + "</td>" +
      "<td class=\"settlement-money\">" + cell(row.amount) + "</td>" +
      "<td><div class=\"settlement-detail\">" + detailLinks + "</div></td>" +
    "</tr>";
  }

  function renderRows() {
    var name = document.getElementById("merchantName").value.trim().toLowerCase();
    var id = document.getElementById("merchantId").value.trim().toLowerCase();
    var status = document.getElementById("merchantStatus").value;
    var start = document.getElementById("settlementStart").value.trim();
    var end = document.getElementById("settlementEnd").value.trim();
    var filtered = rows.filter(function(row) {
      var periodStart = row.period.split(" ~ ")[0];
      return (!name || row.name.toLowerCase().indexOf(name) !== -1) &&
        (!id || row.id.toLowerCase().indexOf(id) !== -1) &&
        (status === "all" || row.type === status) &&
        (!start || periodStart >= start) &&
        (!end || periodStart <= end);
    });
    document.querySelector(".settlement-table tbody").innerHTML = filtered.length ? filtered.map(function(row) {
      return rowHtml(row, rows.indexOf(row));
    }).join("") : "<tr><td colspan=\"8\">暂无匹配数据</td></tr>";
  }

  function openSettlementInfo(row) {
    var orderId = "123412542315423dsfsf43trf42ewrqfwerdfweqrd";
    document.getElementById("settlementModalHost").innerHTML = "<div class=\"settlement-modal-mask\">" +
      "<div class=\"settlement-info-modal\">" +
        "<button type=\"button\" class=\"settlement-modal-close\" data-modal-close>×</button>" +
        "<div class=\"settlement-info-body\">" +
          "<div class=\"settlement-info-title\"><strong>" + row.name + "（" + row.id + "）结算信息</strong><span>操作者：admin</span></div>" +
          "<div class=\"settlement-info-row\"><span>结算金额:</span><strong>" + row.amount + "</strong></div>" +
          "<div class=\"settlement-info-row\"><span>结算日期:</span><strong>" + row.period + "</strong></div>" +
          "<div class=\"settlement-info-row\"><span>订单id</span><strong>" + orderId + "</strong></div>" +
          "<div class=\"settlement-info-row settlement-upload-row\"><span>上传图片</span><div class=\"settlement-upload-card\"><div class=\"settlement-upload-preview\">" +
            "<div class=\"mock-phone-head\">订单信息</div>" +
            "<div class=\"mock-phone-body\">" +
              "<p>支付金额：<em>2,000.00</em>元</p>" +
              "<p>项目名称：QT8651458849-2</p>" +
              "<p>订单编号：T2636654663373740</p>" +
              "<p>预计收益：12.00%</p>" +
              "<p>封闭期限：3个月</p>" +
              "<p>预计收益：<em>88.00</em>元</p>" +
            "</div>" +
          "</div></div></div>" +
        "</div>" +
        "<div class=\"settlement-modal-actions\"><button type=\"button\" class=\"btn btn-outline\" data-modal-close>确定</button></div>" +
      "</div>" +
    "</div>";
  }

  function money(value) {
    return Number(value || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function briefMockData(row) {
    var flow = Number(row.flow || 0);
    var profit = Number(row.profit || 0);
    var usd = Number(row.amount || 0);
    var inrRate = 83.42;
    var parts = [
      { title: "小飞机", unit: "局数", count: 3180, users: 96, flowRate: .09, profitRate: .12 },
      { title: "slot游戏", unit: "局数", count: 12840, users: 426, flowRate: .46, profitRate: .38 },
      { title: "fish游戏", unit: "子弹数", count: 96800, users: 182, flowRate: .28, profitRate: .31 },
      { title: "mini游戏", unit: "局数", count: 6240, users: 214, flowRate: .17, profitRate: .19 }
    ];
    return parts.map(function(part, index) {
      var bet = flow * part.flowRate;
      var win = Math.max(0, bet - profit * part.profitRate);
      var itemProfit = bet - win;
      var itemUsd = index === parts.length - 1
        ? usd - parts.slice(0, index).reduce(function(sum, prev) { return sum + (profit * prev.profitRate); }, 0)
        : profit * part.profitRate;
      return {
        title: part.title,
        unit: part.unit,
        count: Math.round(part.count + flow / 12000 + index * 37),
        users: Math.round(part.users + flow / 28000 + index * 11),
        bet: bet,
        win: win,
        profit: itemProfit,
        inr: itemUsd * inrRate,
        usd: itemUsd
      };
    });
  }

  function briefSection(item) {
    return "<div class=\"brief-section\">" +
      "<div class=\"brief-game-title\"><span>" + item.title + "</span></div>" +
      "<table class=\"brief-table\"><thead><tr><th>" + item.unit + "</th><th>人数</th><th>下注金额</th><th>返奖金额</th><th>盈利金额</th><th>结算(inr)</th><th>结算(usd)</th></tr></thead><tbody>" +
        "<tr><td>" + item.count.toLocaleString("en-US") + "</td><td>" + item.users.toLocaleString("en-US") + "</td><td>" + money(item.bet) + "</td><td>" + money(item.win) + "</td><td>" + money(item.profit) + "</td><td>" + money(item.inr) + "</td><td>" + money(item.usd) + "</td></tr>" +
      "</tbody></table>" +
    "</div>";
  }

  function openSettlementBrief(row) {
    var details = briefMockData(row);
    var totalUsers = details.reduce(function(sum, item) { return sum + item.users; }, 0);
    var totalRounds = details.reduce(function(sum, item) { return sum + item.count; }, 0);
    document.getElementById("settlementModalHost").innerHTML = "<div class=\"settlement-modal-mask\">" +
      "<div class=\"settlement-brief-modal\">" +
        "<button type=\"button\" class=\"settlement-modal-close\" data-modal-close>×</button>" +
        "<div class=\"brief-head\">" +
          "<div><strong>结算简报</strong><span>" + row.name + "（" + row.id + "）</span></div>" +
          "<div><label>结算周期</label><span>" + row.period + "</span></div>" +
        "</div>" +
        "<div class=\"brief-summary\">" +
          "<div><span>总结算金额</span><strong>" + money(row.amount) + " USDT</strong></div>" +
          "<div><span>总流水</span><strong>" + money(row.flow) + "</strong></div>" +
          "<div><span>总盈利</span><strong>" + money(row.profit) + "</strong></div>" +
          "<div><span>参与人数</span><strong>" + totalUsers.toLocaleString("en-US") + "</strong></div>" +
          "<div><span>游戏量</span><strong>" + totalRounds.toLocaleString("en-US") + "</strong></div>" +
        "</div>" +
        "<div class=\"brief-section-list\">" + details.map(briefSection).join("") + "</div>" +
        "<div class=\"settlement-modal-actions\"><button type=\"button\" class=\"btn btn-outline\" data-modal-close>确定</button></div>" +
      "</div>" +
    "</div>";
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
        "<h1 class=\"topbar-page-title\">结算商户</h1>" +
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
        "<div class=\"settlement-page\">" +
          "<div class=\"codex-page-tabs\">" + pageTabs() + "</div>" +
          "<section class=\"settlement-panel\">" +
            "<div class=\"settlement-filter\">" +
              "<label class=\"settlement-field\">商户名称<input id=\"merchantName\" class=\"settlement-input\" type=\"text\" placeholder=\"请输入\"></label>" +
              "<label class=\"settlement-field\">商户id<input id=\"merchantId\" class=\"settlement-input\" type=\"text\" placeholder=\"请输入\"></label>" +
              "<label class=\"settlement-field\">商户状态<select id=\"merchantStatus\" class=\"settlement-select\"><option value=\"all\">全部</option><option value=\"预充值商户\">预充值商户</option><option value=\"月付商户\">月付商户</option></select></label>" +
              "<label class=\"settlement-field\">时间范围<div class=\"settlement-date-range\"><input id=\"settlementStart\" type=\"date\"><span>-</span><input id=\"settlementEnd\" type=\"date\"></div></label>" +
              "<div class=\"settlement-actions\"><button class=\"btn btn-primary\" type=\"button\" data-query>查询</button><button class=\"btn btn-outline\" type=\"button\" data-reset>重置</button></div>" +
            "</div>" +
            "<table class=\"settlement-table\">" +
              "<thead><tr>" +
                "<th class=\"settlement-col-period\">结算周期</th>" +
                "<th class=\"settlement-col-id\">商户ID</th>" +
                "<th class=\"settlement-col-name\">商户名称</th>" +
                "<th class=\"settlement-col-type\">商户类型</th>" +
                "<th class=\"settlement-col-money\">月流水(美元)<span class=\"settlement-sort\"></span></th>" +
                "<th class=\"settlement-col-money\">月盈利(美元)</th>" +
                "<th class=\"settlement-col-money\">结算金额(美元)</th>" +
                "<th class=\"settlement-col-action\">查看详细</th>" +
              "</tr></thead><tbody></tbody>" +
            "</table>" +
            "<div id=\"settlementModalHost\"></div>" +
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
        document.getElementById("merchantName").value = "";
        document.getElementById("merchantId").value = "";
        document.getElementById("merchantStatus").value = "all";
        document.getElementById("settlementStart").value = "";
        document.getElementById("settlementEnd").value = "";
        renderRows();
        return;
      }
      var info = event.target.closest("[data-settlement-info]");
      if (info) {
        openSettlementInfo(rows[Number(info.getAttribute("data-settlement-info"))]);
        return;
      }
      var brief = event.target.closest("[data-settlement-brief]");
      if (brief) {
        openSettlementBrief(rows[Number(brief.getAttribute("data-settlement-brief"))]);
        return;
      }
      if (event.target.closest("[data-modal-close]") || event.target.classList.contains("settlement-modal-mask")) {
        document.getElementById("settlementModalHost").innerHTML = "";
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
