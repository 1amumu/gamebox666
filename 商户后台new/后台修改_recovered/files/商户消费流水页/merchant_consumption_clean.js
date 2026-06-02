(function() {
  var rows = [
    { hour: "2026/06/02 00:00", name: "星海娱乐", id: "M10086", type: "预充值商户", orders: 1284, players: 416, bet: 286420, payout: 251360, profit: 35060, usdProfit: 420.28, rate: 3.5, consume: 1227.10, balance: 23842.90 },
    { hour: "2026/06/02 01:00", name: "星海娱乐", id: "M10086", type: "预充值商户", orders: 1126, players: 388, bet: 241880, payout: 219640, profit: 22240, usdProfit: 266.61, rate: 3.5, consume: 778.40, balance: 23064.50 },
    { hour: "2026/06/02 02:00", name: "银河互动", id: "M10057", type: "月结商户", orders: 942, players: 305, bet: 186300, payout: 163820, profit: 22480, usdProfit: 269.49, rate: 4.0, consume: 899.20, balance: 42100.80 },
    { hour: "2026/06/02 03:00", name: "南亚娱乐城", id: "M20001", type: "预充值商户", orders: 1538, players: 522, bet: 392760, payout: 344590, profit: 48170, usdProfit: 577.37, rate: 3.2, rateDetail: [{ name: "小飞机", rate: 2.8 }, { name: "水果嘉年华", rate: 3.6 }], consume: 1541.44, balance: 67858.56 },
    { hour: "2026/06/02 04:00", name: "海湾娱乐", id: "M30018", type: "月结商户", orders: 806, players: 274, bet: 142900, payout: 132180, profit: 10720, usdProfit: 128.52, rate: 3.0, consume: 321.60, balance: 32678.40 },
    { hour: "2026/06/02 05:00", name: "金冠游戏", id: "M40009", type: "月结商户", orders: 1190, players: 352, bet: 263480, payout: 231070, profit: 32410, usdProfit: 388.55, rate: 3.8, consume: 1231.58, balance: 51768.42 },
    { hour: "2026/06/02 06:00", name: "银月互动", id: "M50003", type: "预充值商户", orders: 1572, players: 481, bet: 338900, payout: 296240, profit: 42660, usdProfit: 511.42, rate: 3.6, consume: 1535.76, balance: 29464.24 },
    { hour: "2026/06/02 07:00", name: "恒星科技", id: "M60012", type: "预充值商户", orders: 1864, players: 618, bet: 492700, payout: 438360, profit: 54340, usdProfit: 651.43, rate: 3.4, consume: 1847.56, balance: 75652.44 },
    { hour: "2026/06/02 08:00", name: "极光娱乐", id: "M70021", type: "月结商户", orders: 2198, players: 701, bet: 608340, payout: 551860, profit: 56480, usdProfit: 677.08, rate: 4.2, rateDetail: [{ name: "雷霆转盘", rate: 5.0 }, { name: "黄金矿工", rate: 3.5 }, { name: "小飞机高倍房", rate: 4.8 }], consume: 2372.16, balance: 38927.84 },
    { hour: "2026/06/02 09:00", name: "蓝港互娱", id: "M80015", type: "预充值商户", orders: 2466, players: 816, bet: 720580, payout: 642430, profit: 78150, usdProfit: 936.96, rate: 3.5, consume: 2735.25, balance: 60264.75 },
    { hour: "2026/06/02 10:00", name: "红杉游戏", id: "M90006", type: "预充值商户", orders: 2752, players: 942, bet: 806240, payout: 714600, profit: 91640, usdProfit: 1098.62, rate: 3.0, consume: 2749.20, balance: 82350.80 },
    { hour: "2026/06/02 11:00", name: "星海娱乐", id: "M10086", type: "预充值商户", orders: 2518, players: 864, bet: 748120, payout: 665200, profit: 82920, usdProfit: 994.25, rate: 3.5, rateDetail: [{ name: "糖果派对", rate: 4.0 }, { name: "飞龙夺宝", rate: 2.9 }], consume: 2902.20, balance: 20162.30 },
    { hour: "2026/06/01 09:00", name: "南亚娱乐城", id: "M20001", type: "预充值商户", orders: 2108, players: 682, bet: 593280, payout: 531460, profit: 61820, usdProfit: 741.30, rate: 3.2, consume: 2372.16, balance: 64120.60 },
    { hour: "2026/06/01 10:00", name: "海湾娱乐", id: "M30018", type: "月结商户", orders: 1746, players: 538, bet: 438920, payout: 397650, profit: 41270, usdProfit: 494.84, rate: 3.0, consume: 1484.52, balance: 33980.20 },
    { hour: "2026/06/01 11:00", name: "金冠游戏", id: "M40009", type: "月结商户", orders: 1962, players: 624, bet: 512360, payout: 458720, profit: 53640, usdProfit: 643.17, rate: 3.8, consume: 2444.05, balance: 50426.70 }
  ];
  var selectedMerchants = [];

  function currentFile() {
    var hash = decodeURIComponent(window.location.hash || "");
    if (hash.indexOf(".html") !== -1) return hash.replace(/^#/, "").split("/").pop();
    var path = decodeURIComponent(window.location.pathname || "");
    return path.split("/").pop() || "商户消费流水页.html";
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
      { file: "充值订单页.html", title: "充值订单" },
      { file: "商户消费流水页.html", title: "商户消费流水" }
    ];
    return tabs.map(function(tab) {
      var active = tab.file === "商户消费流水页.html" ? " is-active" : "";
      return "<button type=\"button\" class=\"codex-page-tab" + active + "\" data-tab-file=\"" + tab.file + "\"><span class=\"codex-page-tab-dot\"></span><span class=\"codex-page-tab-title\">" + tab.title + "</span><span class=\"codex-page-tab-close\">×</span></button>";
    }).join("");
  }

  function money(value) {
    return Number(value || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function integer(value) {
    return Number(value || 0).toLocaleString("en-US");
  }

  function merchantPickerHtml() {
    var names = rows.reduce(function(list, row) {
      if (list.indexOf(row.name) === -1) list.push(row.name);
      return list;
    }, []);
    return names.map(function(name) {
      return "<label class=\"merchant-picker-option\" data-merchant-option=\"" + name + "\"><input type=\"checkbox\" value=\"" + name + "\"><span>" + name + "</span></label>";
    }).join("");
  }

  function updateMerchantPicker() {
    var picker = document.getElementById("consumeMerchantPicker");
    if (!picker) return;
    picker.querySelector(".merchant-picker-text").textContent = selectedMerchants.length ? selectedMerchants.join("、") : "全部";
    picker.querySelectorAll("input[type='checkbox']").forEach(function(input) {
      input.checked = selectedMerchants.indexOf(input.value) !== -1;
    });
  }

  function hourDate(hour) {
    return String(hour || "").slice(0, 10).replace(/\//g, "-");
  }

  function rowBalance(row) {
    return row.type === "月结商户" ? 0 : Number(row.balance || 0);
  }

  function consumeAmount(row) {
    return Number(row.usdProfit || 0) * Number(row.rate || 0) / 100;
  }

  function rateTip(row) {
    var detail = row.rateDetail || [];
    var lines = ["<strong>本次结算费率</strong>", "<div><span>大多数游戏统一费率</span><span>" + row.rate.toFixed(1) + "%</span></div>"];
    if (detail.length) {
      detail.forEach(function(item) {
        lines.push("<div><span>" + item.name + "</span><span>" + item.rate.toFixed(1) + "%</span></div>");
      });
    }
    return lines.join("");
  }

  function dateLabel() {
    var start = document.getElementById("consumeStart").value;
    var end = document.getElementById("consumeEnd").value;
    if (start === "2026-06-02" && end === "2026-06-02") return "今日";
    if (start && end && start === end) return start;
    if (start && end) return start + " 至 " + end;
    if (start) return start + " 之后";
    if (end) return end + " 之前";
    return "全部";
  }

  function updateSummaryLabels() {
    var prefix = dateLabel();
    var labels = [
      ["summaryOrdersLabel", "下注单数"],
      ["summaryPlayersLabel", "下注人数"],
      ["summaryBetLabel", "下注金额"],
      ["summaryConsumeLabel", "消费金额(USD)"],
      ["summaryBalanceLabel", "余额(USD)"]
    ];
    labels.forEach(function(item) {
      var node = document.getElementById(item[0]);
      if (node) node.textContent = prefix + item[1];
    });
  }

  function filteredRows() {
    var start = document.getElementById("consumeStart").value;
    var end = document.getElementById("consumeEnd").value;
    return rows.filter(function(row) {
      var date = hourDate(row.hour);
      return (!selectedMerchants.length || selectedMerchants.indexOf(row.name) !== -1) &&
        (!start || date >= start) &&
        (!end || date <= end);
    });
  }

  function summaryRowsByTime() {
    var start = document.getElementById("consumeStart").value;
    var end = document.getElementById("consumeEnd").value;
    return rows.filter(function(row) {
      var date = hourDate(row.hour);
      return (!start || date >= start) && (!end || date <= end);
    });
  }

  function rowHtml(row) {
    return "<tr>" +
      "<td>" + row.hour + "</td>" +
      "<td>" + row.name + "</td>" +
      "<td class=\"consume-number\">" + integer(row.orders) + "</td>" +
      "<td class=\"consume-number\">" + integer(row.players) + "</td>" +
      "<td class=\"consume-number\">" + money(row.bet) + "</td>" +
      "<td class=\"consume-number\">" + money(row.payout) + "</td>" +
      "<td class=\"consume-number consume-profit\">" + money(row.profit) + "</td>" +
      "<td class=\"consume-number consume-profit\">" + money(row.usdProfit) + "</td>" +
      "<td class=\"consume-number\"><span class=\"consume-rate" + (row.rateDetail ? " has-detail" : "") + "\" data-rate-tip=\"" + encodeURIComponent(rateTip(row)) + "\">" + row.rate.toFixed(1) + "%</span></td>" +
      "<td class=\"consume-number\">" + money(consumeAmount(row)) + "</td>" +
      "<td class=\"consume-number\">" + money(rowBalance(row)) + "</td>" +
    "</tr>";
  }

  function renderSummary(list) {
    function sum(key) {
      return list.reduce(function(total, row) { return total + Number(row[key] || 0); }, 0);
    }
    var consumeTotal = list.reduce(function(total, row) { return total + consumeAmount(row); }, 0);
    var balanceTotal = list.reduce(function(total, row) { return total + rowBalance(row); }, 0);
    updateSummaryLabels();
    document.getElementById("summaryOrders").textContent = integer(sum("orders"));
    document.getElementById("summaryPlayers").textContent = integer(sum("players"));
    document.getElementById("summaryBet").textContent = money(sum("bet"));
    document.getElementById("summaryConsume").textContent = money(consumeTotal);
    document.getElementById("summaryBalance").textContent = money(balanceTotal);
  }

  function renderRows() {
    var list = filteredRows();
    var body = document.querySelector(".consume-table tbody");
    body.innerHTML = list.length ? list.map(rowHtml).join("") : "<tr><td class=\"consume-empty\" colspan=\"11\">暂无匹配数据</td></tr>";
    renderSummary(summaryRowsByTime());
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
        "<h1 class=\"topbar-page-title\">商户消费流水</h1>" +
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
        "<div class=\"consume-page\">" +
          "<div class=\"codex-page-tabs\">" + pageTabs() + "</div>" +
          "<section class=\"consume-panel\">" +
            "<div class=\"consume-filter\">" +
              "<label class=\"consume-field\"><span>选择商户</span><span class=\"merchant-picker\" id=\"consumeMerchantPicker\"><button type=\"button\" class=\"merchant-picker-button\" data-merchant-toggle><span class=\"merchant-picker-text\">全部</span></button><span class=\"merchant-picker-menu\" hidden><input class=\"merchant-picker-search\" type=\"text\" placeholder=\"搜索商户\"><span class=\"merchant-picker-list\">" + merchantPickerHtml() + "</span></span></span></label>" +
              "<label class=\"consume-field\"><span>统计日期</span><span class=\"consume-date-range\"><input id=\"consumeStart\" type=\"date\" value=\"2026-06-02\"><span>至</span><input id=\"consumeEnd\" type=\"date\" value=\"2026-06-02\"></span></label>" +
              "<div class=\"consume-actions\"><button type=\"button\" class=\"btn btn-primary\" id=\"queryBtn\">查询</button><button type=\"button\" class=\"btn btn-outline\" id=\"resetBtn\">重置</button></div>" +
            "</div>" +
            "<div class=\"consume-summary\">" +
              "<div class=\"consume-summary-card\"><span id=\"summaryOrdersLabel\">今日下注单数</span><strong id=\"summaryOrders\">0</strong></div>" +
              "<div class=\"consume-summary-card\"><span id=\"summaryPlayersLabel\">今日下注人数</span><strong id=\"summaryPlayers\">0</strong></div>" +
              "<div class=\"consume-summary-card\"><span id=\"summaryBetLabel\">今日下注金额</span><strong id=\"summaryBet\">0.00</strong></div>" +
              "<div class=\"consume-summary-card\"><span id=\"summaryConsumeLabel\">今日消费金额(USD)</span><strong id=\"summaryConsume\">0.00</strong></div>" +
              "<div class=\"consume-summary-card\"><span id=\"summaryBalanceLabel\">今日余额(USD)</span><strong id=\"summaryBalance\">0.00</strong></div>" +
            "</div>" +
            "<div class=\"consume-table-wrap\">" +
              "<table class=\"consume-table\">" +
                "<colgroup>" +
                  "<col class=\"consume-col-time\"><col class=\"consume-col-name\"><col class=\"consume-col-count\"><col class=\"consume-col-count\">" +
                  "<col class=\"consume-col-money\"><col class=\"consume-col-money\"><col class=\"consume-col-money\"><col class=\"consume-col-money\"><col class=\"consume-col-rate\"><col class=\"consume-col-money\"><col class=\"consume-col-money\">" +
                "</colgroup>" +
                "<thead><tr><th>统计时间</th><th>商户名称</th><th>下注单数</th><th>下注人数</th><th>下注金额</th><th>返奖金额</th><th>盈利金额(INR)</th><th>盈利金额(USD)</th><th>费率</th><th>消费金额(USD)</th><th>余额(USD)</th></tr></thead>" +
                "<tbody></tbody>" +
              "</table>" +
            "</div>" +
          "</section>" +
        "</div>" +
      "</main>" +
    "</div>";
  }

  function bindEvents(app) {
    app.addEventListener("click", function(event) {
      var toggle = event.target.closest("[data-sidebar-toggle]");
      if (toggle) {
        var title = toggle.getAttribute("data-sidebar-toggle");
        var section = toggle.closest(".sidebar-section");
        var children = section.querySelector(".sidebar-children");
        var state = readSidebarState();
        var collapsed = !section.classList.contains("is-collapsed");
        section.classList.toggle("is-collapsed", collapsed);
        children.hidden = collapsed;
        state[title] = !collapsed;
        writeSidebarState(state);
        return;
      }

      var tab = event.target.closest("[data-tab-file]");
      if (tab && !event.target.classList.contains("codex-page-tab-close")) {
        window.location.href = tab.getAttribute("data-tab-file");
        return;
      }

      if (event.target.classList.contains("codex-page-tab-close")) {
        var tabButton = event.target.closest("[data-tab-file]");
        if (tabButton && !tabButton.classList.contains("is-active")) tabButton.remove();
        return;
      }

      if (event.target.closest(".topbar-account-toggle")) {
        event.target.closest(".topbar-account-wrap").classList.toggle("is-open");
        return;
      }

      var merchantToggle = event.target.closest("[data-merchant-toggle]");
      if (merchantToggle) {
        var menu = merchantToggle.closest(".merchant-picker").querySelector(".merchant-picker-menu");
        menu.hidden = !menu.hidden;
        return;
      }

      if (!event.target.closest(".merchant-picker")) {
        document.querySelectorAll(".merchant-picker-menu").forEach(function(menu) { menu.hidden = true; });
      }
    });

    app.addEventListener("mouseover", function(event) {
      var rate = event.target.closest("[data-rate-tip]");
      if (!rate) return;
      var tip = document.createElement("div");
      tip.className = "consume-rate-tip";
      tip.innerHTML = decodeURIComponent(rate.getAttribute("data-rate-tip"));
      document.body.appendChild(tip);
      var rect = rate.getBoundingClientRect();
      var left = Math.min(rect.left, window.innerWidth - 276);
      tip.style.left = Math.max(12, left) + "px";
      tip.style.top = Math.max(12, rect.bottom + 8) + "px";
      rate._consumeRateTip = tip;
    });

    app.addEventListener("mouseout", function(event) {
      var rate = event.target.closest("[data-rate-tip]");
      if (rate && rate._consumeRateTip) {
        rate._consumeRateTip.remove();
        rate._consumeRateTip = null;
      }
    });

    app.addEventListener("input", function(event) {
      if (event.target.classList.contains("merchant-picker-search")) {
        var keyword = event.target.value.trim().toLowerCase();
        event.target.closest(".merchant-picker-menu").querySelectorAll("[data-merchant-option]").forEach(function(option) {
          option.hidden = keyword && option.getAttribute("data-merchant-option").toLowerCase().indexOf(keyword) === -1;
        });
      }
    });

    app.addEventListener("change", function(event) {
      if (event.target.closest("[data-merchant-option]")) {
        selectedMerchants = Array.from(document.querySelectorAll(".merchant-picker-option input:checked")).map(function(input) {
          return input.value;
        });
        updateMerchantPicker();
      }
    });

    document.getElementById("queryBtn").addEventListener("click", renderRows);
    document.getElementById("resetBtn").addEventListener("click", function() {
      selectedMerchants = [];
      document.getElementById("consumeStart").value = "2026-06-02";
      document.getElementById("consumeEnd").value = "2026-06-02";
      document.querySelectorAll(".merchant-picker-search").forEach(function(input) { input.value = ""; });
      document.querySelectorAll("[data-merchant-option]").forEach(function(option) { option.hidden = false; });
      updateMerchantPicker();
      renderRows();
    });
  }

  document.addEventListener("DOMContentLoaded", function() {
    var app = document.getElementById("app");
    app.innerHTML = shellHtml();
    bindEvents(app);
    updateTopbarTime(app);
    setInterval(function() { updateTopbarTime(app); }, 60000);
    renderRows();
  });
})();
