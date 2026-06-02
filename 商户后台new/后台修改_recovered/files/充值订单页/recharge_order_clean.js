(function() {
  var rows = [
    { orderNo: "RO2606020001", merchantName: "星海娱乐", merchantId: "M10086", merchantType: "预充值商户", remain: 18200, recharge: 5000, gift: 50, after: 23250, status: "充值成功", time: "2026/06/02 09:18:32" },
    { orderNo: "RO2606020002", merchantName: "银河互动", merchantId: "M10057", merchantType: "月付商户", remain: 0, recharge: 3000, gift: 0, after: 0, status: "充值超时", time: "2026/06/02 09:26:14" },
    { orderNo: "RO2606020003", merchantName: "南亚娱乐城", merchantId: "M20001", merchantType: "预充值商户", remain: 7360, recharge: 8000, gift: 80, after: 15440, status: "支付中......", time: "2026/06/02 09:43:08" },
    { orderNo: "RO2606020004", merchantName: "海湾娱乐", merchantId: "M30018", merchantType: "预充值商户", remain: 42110, recharge: 12000, gift: 180, after: 54290, status: "充值成功", time: "2026/06/02 10:05:46" },
    { orderNo: "RO2606020005", merchantName: "金冠游戏", merchantId: "M40009", merchantType: "月付商户", remain: 0, recharge: 6000, gift: 0, after: 0, status: "支付中......", time: "2026/06/02 10:21:37" },
    { orderNo: "RO2606020006", merchantName: "银月互动", merchantId: "M50003", merchantType: "预充值商户", remain: 12890, recharge: 4000, gift: 40, after: 16930, status: "充值超时", time: "2026/06/02 10:36:52" },
    { orderNo: "RO2606020007", merchantName: "恒星科技", merchantId: "M60012", merchantType: "预充值商户", remain: 9560, recharge: 15000, gift: 225, after: 24785, status: "充值成功", time: "2026/06/02 11:08:25" },
    { orderNo: "RO2606020008", merchantName: "极光娱乐", merchantId: "M70021", merchantType: "月付商户", remain: 0, recharge: 2500, gift: 0, after: 0, status: "充值超时", time: "2026/06/02 11:40:11" },
    { orderNo: "RO2606020009", merchantName: "蓝港互娱", merchantId: "M80015", merchantType: "预充值商户", remain: 33120, recharge: 10000, gift: 120, after: 43240, status: "支付中......", time: "2026/06/02 12:02:56" },
    { orderNo: "RO2606020010", merchantName: "红杉游戏", merchantId: "M90006", merchantType: "预充值商户", remain: 64800, recharge: 20000, gift: 300, after: 85100, status: "充值成功", time: "2026/06/02 12:24:19" }
  ];
  var selectedMerchants = [];

  function currentFile() {
    var hash = decodeURIComponent(window.location.hash || "");
    if (hash.indexOf(".html") !== -1) return hash.replace(/^#/, "").split("/").pop();
    var path = decodeURIComponent(window.location.pathname || "");
    return path.split("/").pop() || "充值订单页.html";
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
      var active = tab.file === "充值订单页.html" ? " is-active" : "";
      return "<button type=\"button\" class=\"codex-page-tab" + active + "\" data-tab-file=\"" + tab.file + "\"><span class=\"codex-page-tab-dot\"></span><span class=\"codex-page-tab-title\">" + tab.title + "</span><span class=\"codex-page-tab-close\">×</span></button>";
    }).join("");
  }

  function money(value) {
    return Number(value || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function statusClass(status) {
    if (status === "充值成功") return "success";
    if (status === "充值超时") return "timeout";
    return "pending";
  }

  function merchantPickerHtml() {
    var names = rows.reduce(function(list, row) {
      if (list.indexOf(row.merchantName) === -1) list.push(row.merchantName);
      return list;
    }, []);
    return names.map(function(name) {
      return "<label class=\"merchant-picker-option\" data-merchant-option=\"" + name + "\"><input type=\"checkbox\" value=\"" + name + "\"><span>" + name + "</span></label>";
    }).join("");
  }

  function updateMerchantPicker() {
    var picker = document.getElementById("merchantPicker");
    if (!picker) return;
    var text = picker.querySelector(".merchant-picker-text");
    text.textContent = selectedMerchants.length ? selectedMerchants.join("、") : "全部";
    picker.querySelectorAll("input[type='checkbox']").forEach(function(input) {
      input.checked = selectedMerchants.indexOf(input.value) !== -1;
    });
  }

  function rowHtml(row, index) {
    var canDelete = row.status !== "充值成功";
    return "<tr>" +
      "<td>" + row.orderNo + "</td>" +
      "<td>" + row.merchantName + "</td>" +
      "<td>" + row.merchantId + "</td>" +
      "<td>" + row.merchantType + "</td>" +
      "<td class=\"recharge-money\">" + money(row.remain) + "</td>" +
      "<td class=\"recharge-money\">" + money(row.recharge) + "</td>" +
      "<td class=\"recharge-money\">" + money(row.gift) + "</td>" +
      "<td class=\"recharge-money\">" + money(row.after) + "</td>" +
      "<td><span class=\"recharge-status " + statusClass(row.status) + "\">" + row.status + "</span></td>" +
      "<td>" + row.time + "</td>" +
      "<td>" + (canDelete ? "<button type=\"button\" class=\"recharge-delete\" data-delete=\"" + index + "\">删除</button>" : "") + "</td>" +
    "</tr>";
  }

  function filteredRows() {
    var id = document.getElementById("merchantId").value.trim().toLowerCase();
    var status = document.getElementById("rechargeStatus").value;
    return rows.filter(function(row) {
      return (!selectedMerchants.length || selectedMerchants.indexOf(row.merchantName) !== -1) &&
        (!id || row.merchantId.toLowerCase().indexOf(id) !== -1) &&
        (!status || row.status === status);
    });
  }

  function renderRows() {
    var list = filteredRows();
    var body = document.querySelector(".recharge-table tbody");
    body.innerHTML = list.length ? list.map(function(row) {
      return rowHtml(row, rows.indexOf(row));
    }).join("") : "<tr><td class=\"recharge-empty\" colspan=\"11\">暂无匹配数据</td></tr>";
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
        "<h1 class=\"topbar-page-title\">充值订单</h1>" +
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
        "<div class=\"recharge-page\">" +
          "<div class=\"codex-page-tabs\">" + pageTabs() + "</div>" +
          "<section class=\"recharge-panel\">" +
            "<div class=\"recharge-filter\">" +
              "<label class=\"recharge-field\"><span>选择商户</span><span class=\"merchant-picker\" id=\"merchantPicker\"><button type=\"button\" class=\"merchant-picker-button\" data-merchant-toggle><span class=\"merchant-picker-text\">全部</span></button><span class=\"merchant-picker-menu\" hidden><input class=\"merchant-picker-search\" type=\"text\" placeholder=\"搜索商户\"><span class=\"merchant-picker-list\">" + merchantPickerHtml() + "</span></span></span></label>" +
              "<label class=\"recharge-field\"><span>商户id</span><input id=\"merchantId\" class=\"recharge-input\" type=\"text\" placeholder=\"请输入\"></label>" +
              "<label class=\"recharge-field\"><span>充值状态</span><select id=\"rechargeStatus\" class=\"recharge-select\"><option value=\"\">全部</option><option>充值成功</option><option>充值超时</option><option>支付中......</option></select></label>" +
              "<div class=\"recharge-actions\"><button type=\"button\" class=\"btn btn-primary\" id=\"queryBtn\">查询</button><button type=\"button\" class=\"btn btn-outline\" id=\"resetBtn\">重置</button></div>" +
            "</div>" +
            "<div class=\"recharge-table-wrap\">" +
              "<table class=\"recharge-table\">" +
                "<colgroup>" +
                  "<col class=\"recharge-col-order\"><col class=\"recharge-col-name\"><col class=\"recharge-col-id\"><col class=\"recharge-col-type\">" +
                  "<col class=\"recharge-col-money\"><col class=\"recharge-col-money\"><col class=\"recharge-col-money\"><col class=\"recharge-col-money\">" +
                  "<col class=\"recharge-col-status\"><col class=\"recharge-col-time\"><col class=\"recharge-col-action\">" +
                "</colgroup>" +
                "<thead><tr><th>订单号</th><th>商户名称</th><th>商户id</th><th>商户类型</th><th>剩余额度</th><th>充值额度</th><th>赠送额度</th><th>充值后额度</th><th>订单状态</th><th>下单时间</th><th>操作</th></tr></thead>" +
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

      var deleteButton = event.target.closest("[data-delete]");
      if (deleteButton) {
        var index = Number(deleteButton.getAttribute("data-delete"));
        var row = rows[index];
        if (row && window.confirm("确认删除订单 " + row.orderNo + "？")) {
          rows.splice(index, 1);
          renderRows();
        }
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
      document.getElementById("merchantId").value = "";
      document.getElementById("rechargeStatus").value = "";
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
