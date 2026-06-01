(function() {
  var currencies = ["INR", "GHS", "USD"];
  var activeCurrency = "INR";
  var draggingSite = null;
  var dragPreview = null;
  var editingRoomIndex = null;

  var currencyRegions = {
    INR: "印度卢比 - INR",
    GHS: "加纳塞地 - GHS",
    USD: "美元 - USD"
  };

  var currencyLabels = {
    INR: "印度-INR",
    GHS: "加纳-GHS",
    USD: "美国-USD"
  };

  var currencyOptions = [
    { code: "INR", area: "印度", timezone: "UTC+05:30" },
    { code: "GHS", area: "加纳", timezone: "UTC+00:00" },
    { code: "USD", area: "美国", timezone: "UTC-05:00" },
    { code: "PHP", area: "菲律宾", timezone: "UTC+08:00" },
    { code: "BRL", area: "巴西", timezone: "UTC-03:00" },
    { code: "VND", area: "越南", timezone: "UTC+07:00" },
    { code: "THB", area: "泰国", timezone: "UTC+07:00" }
  ];

  var roomDefaults = {
    region: "印度卢比 - INR",
    bigMultiplier: 500,
    bigAmount: 500000,
    comboMultiplier: 5000,
    botPrefix: "",
    botMaxCount: 500,
    botMinBet: 10,
    botMaxBet: 8000,
    botMaxPrize: 800000,
    botMaxShare: 10,
    maxOnline: 500,
    creatorId: "admin-1001",
    createdAt: "2026-05-27 10:00:00"
  };

  var rooms = [
    { name: "INR大厅", sites: 2, stock: 75444.21, rate: 0.00, tables: [
      { id: "21392-21392", flow: 0, online: 0, rtp: 0.00 },
      { id: "221394-8001", flow: 0, online: 0, rtp: 0.00 }
    ] },
    { name: "1号", sites: 2, stock: 50944.74, rate: 97.32, tables: [
      { id: "21377-1023", flow: 1663136.89, online: 36, rtp: 98.53 },
      { id: "21377-1031", flow: 698189.72, online: 7, rtp: 94.40 }
    ] },
    { name: "2号", sites: 3, stock: 83184.30, rate: 98.26, tables: [
      { id: "21377-1016", flow: 324276.60, online: 1, rtp: 98.22 },
      { id: "21383-1041", flow: 2388328.74, online: 31, rtp: 97.29 },
      { id: "21384-1037", flow: 769584.07, online: 15, rtp: 101.19 }
    ] },
    { name: "3号", sites: 1, stock: 2314775.02, rate: 98.90, tables: [
      { id: "21383-1055", flow: 25427643.28, online: 399, rtp: 98.92 }
    ] },
    { name: "4号", sites: 1, stock: 12668.96, rate: 93.08, tables: [
      { id: "21377-1062", flow: 560779.92, online: 11, rtp: 93.10 }
    ] },
    { name: "5号", sites: 2, stock: 6240.41, rate: 93.89, tables: [
      { id: "21377-1065", flow: 278018.58, online: 16, rtp: 93.30 },
      { id: "21377-1070", flow: 335772.78, online: 1, rtp: 94.37 }
    ] },
    { name: "6号", sites: 3, stock: 89270.90, rate: 94.89, tables: [
      { id: "21377-1064", flow: 966984.39, online: 13, rtp: 85.95 },
      { id: "21377-1079", flow: 525406.93, online: 11, rtp: 104.30 },
      { id: "21384-1093", flow: 822187.54, online: 31, rtp: 99.37 }
    ] },
    { name: "7号", sites: 1, stock: -2759.59, rate: 87.68, tables: [
      { id: "21377-1058", flow: 191651.96, online: 14, rtp: 87.67 }
    ] },
    { name: "测试站点专用(勿动)", sites: 4, stock: 0, rate: 0.00, tables: [
      { id: "21375-21375", flow: 0, online: 0, rtp: 0.00 },
      { id: "21377-9901", flow: 0, online: 0, rtp: 0.00 },
      { id: "21387-21387", flow: 0, online: 0, rtp: 0.00 },
      { id: "21393-1093", flow: 0, online: 0, rtp: 0.00 }
    ] },
    { name: "8号", sites: 2, stock: 27719.15, rate: 105.10, tables: [
      { id: "21377-1008", flow: 61380.16, online: 2, rtp: 104.70 },
      { id: "21377-1077", flow: 237819.71, online: 9, rtp: 105.20 }
    ] },
    { name: "9号", sites: 2, stock: 73118.10, rate: 95.90, tables: [
      { id: "21377-1021", flow: 862199.27, online: 18, rtp: 98.06 },
      { id: "21383-1048", flow: 1407901.73, online: 41, rtp: 94.58 }
    ] },
    { name: "10号", sites: 2, stock: 27955.39, rate: 94.77, tables: [
      { id: "21377-1012", flow: 118839.23, online: 4, rtp: 85.68 },
      { id: "21384-1001", flow: 1108964.97, online: 26, rtp: 95.75 }
    ] },
    { name: "11号", sites: 2, stock: 26124.94, rate: 93.24, tables: [
      { id: "21377-1013", flow: 440452.11, online: 5, rtp: 95.08 },
      { id: "21377-1014", flow: 276454.35, online: 17, rtp: 90.44 }
    ] },
    { name: "12", sites: 2, stock: 18057.21, rate: 97.92, tables: [
      { id: "21383-1047", flow: 1181779.39, online: 28, rtp: 92.00 },
      { id: "21383-1095", flow: 2786964.21, online: 77, rtp: 100.48 }
    ] },
    { name: "INR小黑屋", sites: 0, stock: 0, rate: 0.00, control: 56, tables: [] }
  ];

  function money(value) {
    return Number(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function normalizeRoom(room) {
    Object.keys(roomDefaults).forEach(function(key) {
      if (room[key] == null) room[key] = roomDefaults[key];
    });
    if (!room.region) room.region = currencyRegions[activeCurrency] || roomDefaults.region;
    if (!room.createdAt) room.createdAt = roomDefaults.createdAt;
    return room;
  }

  function roomStats(room) {
    var tables = room.tables || [];
    var totalBet = tables.reduce(function(sum, table) { return sum + Number(table.flow || 0); }, 0);
    var currentOnline = tables.reduce(function(sum, table) { return sum + Number(table.online || 0); }, 0);
    var weightedRtp = totalBet ? tables.reduce(function(sum, table) {
      return sum + Number(table.flow || 0) * Number(table.rtp || 0);
    }, 0) / totalBet : Number(room.rate || 0);
    var totalReturn = totalBet * weightedRtp / 100;
    return {
      stock: Number(room.stock || 0),
      siteCount: tables.length || Number(room.sites || 0),
      totalBet: totalBet,
      totalReturn: totalReturn,
      rtp: weightedRtp,
      currentOnline: currentOnline,
      maxOnline: Number(room.maxOnline || roomDefaults.maxOnline),
      creatorId: room.creatorId || roomDefaults.creatorId,
      createdAt: room.createdAt || roomDefaults.createdAt
    };
  }

  var fallbackSidebarConfig = [
    { title: "概括", icon: "⌂", items: [
      { title: "首页仪表盘", file: "首页仪表盘.html" }
    ] },
    { title: "数据管理", icon: "▦", items: [
      { title: "游戏记录", file: "游戏记录.html" },
      { title: "运营数据", file: "运营数据.html" },
      { title: "今日玩家盈亏", file: "今日玩家盈亏.html" },
      { title: "飞机爆点数据", file: "飞机爆点数据.html" },
      { title: "玩家在线数据", file: "玩家在线数据.html" },
      { title: "游戏留存", file: "游戏留存.html" },
      { title: "玩家留存", file: "玩家留存.html" }
    ] },
    { title: "商户管理", icon: "▤", items: [
      { title: "商户列表", file: "商户列表.html" },
      { title: "创建商户", file: "创建商户.html" },
      { title: "商户盈亏", file: "商户盈亏.html" }
    ] },
    { title: "游戏管理", icon: "◇", items: [
      { title: "游戏列表", file: "游戏列表页.html" },
      { title: "飞机房间管理", file: "飞机房间管理页.html" },
      { title: "库存管理", file: "库存管理.html" },
      { title: "游戏RTP配置", file: "游戏rtp配置.html" }
    ] },
    { title: "玩家管理", icon: "◎", items: [
      { title: "玩家总览", file: "玩家总览页.html" },
      { title: "智能点控推荐", file: "智能点控推荐.html" },
      { title: "点控玩家", file: "玩家点控.html" }
    ] },
    { title: "财务管理", icon: "￥", items: [
      { title: "财务总览", file: "财务总览.html" },
      { title: "汇率查询", file: "汇率查询.html" },
      { title: "结算信息", file: "结算信息页.html" },
      { title: "待结算信息", file: "待结算信息页.html" },
      { title: "充值订单", file: "充值订单页.html" },
      { title: "赠送余额", file: "赠送余额页.html" }
    ] },
    { title: "消息管理", icon: "✉", items: [
      { title: "发布消息", file: "发布消息页.html" },
      { title: "查看消息", file: "消息页.html" }
    ] },
    { title: "后台管理", icon: "⚙", items: [
      { title: "账号管理", file: "账号管理.html" },
      { title: "创建账号", file: "创建账号.html" },
      { title: "权限编辑", file: "权限编辑.html" },
      { title: "操作日志", file: "操作日志.html" }
    ] }
  ];

  function currentFile() {
    var path = decodeURIComponent(window.location.pathname || "");
    return path.split("/").pop() || "飞机房间管理页.html";
  }

  function readSidebarState() {
    try {
      var key = window.GB_NAVIGATION && window.GB_NAVIGATION.storageKey ? window.GB_NAVIGATION.storageKey : "gb-clean-sidebar-state";
      return JSON.parse(localStorage.getItem(key) || "{}");
    } catch (error) {
      return {};
    }
  }

  function writeSidebarState(state) {
    try {
      var key = window.GB_NAVIGATION && window.GB_NAVIGATION.storageKey ? window.GB_NAVIGATION.storageKey : "gb-clean-sidebar-state";
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {}
  }

  function sidebarHtml() {
    var activeFile = currentFile();
    var state = readSidebarState();
    var sidebarConfig = window.GB_NAVIGATION && window.GB_NAVIGATION.plainGroups ? window.GB_NAVIGATION.plainGroups() : fallbackSidebarConfig;
    return sidebarConfig.map(function(group, index) {
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

  function shellHtml() {
    return "<div class=\"app-shell\">" +
      "<a class=\"app-brand\" href=\"首页仪表盘.html\">GB总后台</a>" +
      "<header class=\"app-topbar\">" +
        "<h1 class=\"topbar-page-title\">飞机房间管理</h1>" +
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
      "<main class=\"app-main\"><div class=\"flight-room-page\">" +
        "<div class=\"codex-page-tabs\">" + pageTabs() + "</div>" +
        "<div class=\"flight-room-panel\">" +
          "<div class=\"flight-room-dashboard\"></div>" +
          "<div class=\"flight-room-tabbar\">" +
            "<div class=\"flight-room-tabs\"></div>" +
            "<div class=\"flight-room-toolbar\">" +
              "<button type=\"button\" class=\"flight-room-action\" data-add-currency=\"true\">添加货币</button>" +
              "<button type=\"button\" class=\"flight-room-action is-primary\" data-add-room=\"true\">添加房间</button>" +
            "</div>" +
          "</div>" +
          "<div class=\"flight-room-grid\"></div>" +
        "</div>" +
      "</div></main>" +
      "<div class=\"room-modal-mask\" hidden>" +
        "<div class=\"room-modal\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"roomModalTitle\">" +
          "<button type=\"button\" class=\"room-modal-close\" data-room-modal-close=\"true\" aria-label=\"关闭\">×</button>" +
          "<h2 id=\"roomModalTitle\">站点房间</h2>" +
          "<div class=\"room-modal-body\"></div>" +
          "<div class=\"room-modal-footer\">" +
            "<button type=\"button\" class=\"room-modal-delete\" data-room-modal-delete=\"true\" hidden>删除房间</button>" +
            "<span class=\"room-modal-footer-spacer\"></span>" +
            "<button type=\"button\" class=\"room-modal-cancel\" data-room-modal-close=\"true\">取消</button>" +
            "<button type=\"button\" class=\"room-modal-save\" data-room-modal-save=\"true\">保存</button>" +
          "</div>" +
        "</div>" +
      "</div>" +
      "<div class=\"currency-modal-mask\" hidden>" +
        "<div class=\"currency-modal\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"currencyModalTitle\">" +
          "<button type=\"button\" class=\"currency-modal-close\" data-currency-modal-close=\"true\" aria-label=\"关闭\">×</button>" +
          "<h2 id=\"currencyModalTitle\">新增货币</h2>" +
          "<div class=\"currency-modal-body\"></div>" +
          "<div class=\"currency-modal-footer\">" +
            "<button type=\"button\" class=\"currency-modal-cancel\" data-currency-modal-close=\"true\">取消</button>" +
            "<button type=\"button\" class=\"currency-modal-save\" data-currency-modal-save=\"true\">保存</button>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</div>";
  }

  function pageTabs() {
    var files = ["首页仪表盘.html", "飞机房间管理页.html"];
    return files.map(function(file) {
      var active = file === "飞机房间管理页.html" ? " is-active" : "";
      return "<button type=\"button\" class=\"codex-page-tab" + active + "\" data-tab-file=\"" + file + "\"><span class=\"codex-page-tab-dot\"></span><span class=\"codex-page-tab-title\">" + file.replace(".html", "") + "</span><span class=\"codex-page-tab-close\">×</span></button>";
    }).join("");
  }

  function roomHeader(room, index) {
    var stockClass = room.stock < 0 ? " is-negative" : "";
    var siteCount = room.tables.length || room.sites || 0;
    return "<div class=\"flight-room-card-header\">" +
      "<div class=\"flight-room-name\"><strong>" + escapeHtml(room.name) + "</strong>" +
        (room.control ? "" : "<button type=\"button\" class=\"flight-room-edit\" data-edit-room=\"" + index + "\">编辑</button>") +
      "</div>" +
      "<div class=\"flight-room-meta\">" +
        "<span class=\"flight-room-pill\">" + siteCount + "</span>" +
        "<span class=\"flight-room-stock" + stockClass + "\">" + money(room.stock) + "库存</span>" +
        "<span class=\"flight-room-rate\">" + room.rate.toFixed(2) + "%</span>" +
      "</div>" +
    "</div>";
  }

  function tableHtml(table, roomName) {
    return "<div class=\"flight-room-table\" draggable=\"true\" data-site-id=\"" + escapeHtml(table.id) + "\" data-room-name=\"" + escapeHtml(roomName) + "\" title=\"拖动站点到其他房间\">" +
      "<div class=\"flight-room-table-top\"><strong>" + escapeHtml(table.id) + "</strong><span>在线" + table.online + "</span></div>" +
      "<div class=\"flight-room-table-bottom\"><span>流水 <em>" + money(table.flow) + "</em></span><span>RTP <b>" + table.rtp.toFixed(2) + "%</b></span></div>" +
    "</div>";
  }

  function roomHtml(room, index) {
    normalizeRoom(room);
    var detail = room.control ? "<div class=\"flight-room-control\"><strong>点控" + room.control + "人</strong><button type=\"button\">详情</button></div>" : "";
    var tables = room.tables.map(function(table) { return tableHtml(table, room.name); }).join("");
    var locked = room.control ? " is-locked" : "";
    var empty = room.tables.length || locked ? "" : "<div class=\"flight-room-empty\">房间当前没有站点</div>";
    return "<section class=\"flight-room-card" + locked + "\" data-room-name=\"" + escapeHtml(room.name) + "\" data-drop-disabled=\"" + (room.control ? "true" : "false") + "\">" + roomHeader(room, index) + detail + "<div class=\"flight-room-list\">" + tables + empty + "</div></section>";
  }

  function render(page) {
    renderDashboard(page);
    page.querySelector(".flight-room-tabs").innerHTML = currencies.map(function(currency) {
      return "<button type=\"button\" class=\"" + (currency === activeCurrency ? "is-active" : "") + "\" data-currency=\"" + currency + "\">" + escapeHtml(currencyLabels[currency] || currency) + "</button>";
    }).join("");
    page.querySelector(".flight-room-grid").innerHTML = rooms.map(roomHtml).join("");
  }

  function dashboardStats() {
    var allTables = [];
    var merchantMap = {};
    var peakOnline = 0;
    rooms.forEach(function(room) {
      normalizeRoom(room);
      allTables = allTables.concat(room.tables || []);
      peakOnline += Number(room.maxOnline || 0);
    });
    allTables.forEach(function(table) {
      var merchantId = String(table.id || "").split("-")[0];
      if (merchantId) merchantMap[merchantId] = true;
    });
    var merchantCount = Object.keys(merchantMap).length;
    var siteCount = allTables.length;
    var totalBet = allTables.reduce(function(sum, table) { return sum + Number(table.flow || 0); }, 0);
    var online = allTables.reduce(function(sum, table) { return sum + Number(table.online || 0); }, 0);
    var rtp = totalBet ? allTables.reduce(function(sum, table) {
      return sum + Number(table.flow || 0) * Number(table.rtp || 0);
    }, 0) / totalBet : 0;
    return {
      merchantCount: merchantCount,
      siteCount: siteCount,
      totalBet: totalBet,
      rtp: rtp,
      online: online,
      peakOnline: peakOnline
    };
  }

  function renderDashboard(page) {
    var stats = dashboardStats();
    page.querySelector(".flight-room-dashboard").innerHTML =
      "<div class=\"dashboard-metrics\">" +
        "<div class=\"dashboard-metric\"><span>商户-站点数</span><strong>" + stats.merchantCount + "-" + stats.siteCount + "</strong></div>" +
        "<div class=\"dashboard-metric\"><span>今日总下注</span><strong>" + money(stats.totalBet) + "</strong></div>" +
        "<div class=\"dashboard-metric\"><span>RTP</span><strong>" + stats.rtp.toFixed(2) + "%</strong></div>" +
        "<div class=\"dashboard-metric\"><span>今日在线人数</span><strong>" + stats.online + "</strong></div>" +
        "<div class=\"dashboard-metric\"><span>今日在线峰值</span><strong>" + stats.peakOnline + "</strong></div>" +
      "</div>";
  }

  function findRoom(name) {
    return rooms.filter(function(room) { return room.name === name; })[0];
  }

  function moveSite(sourceName, targetName, siteId) {
    if (!sourceName || !targetName || sourceName === targetName || !siteId) return false;
    var sourceRoom = findRoom(sourceName);
    var targetRoom = findRoom(targetName);
    if (!sourceRoom || !targetRoom) return false;
    var siteIndex = sourceRoom.tables.findIndex(function(table) { return table.id === siteId; });
    if (siteIndex < 0) return false;
    var site = sourceRoom.tables.splice(siteIndex, 1)[0];
    targetRoom.tables.push(site);
    sourceRoom.sites = sourceRoom.tables.length;
    targetRoom.sites = targetRoom.tables.length;
    return true;
  }

  function addCurrency(page) {
    openCurrencyModal(page);
  }

  function currencySelectOptions() {
    return "<option value=\"\">请选择</option>" + currencyOptions.map(function(item) {
      return "<option value=\"" + item.code + "\">" + item.code + "</option>";
    }).join("");
  }

  function selectedCurrencyOption(code) {
    return currencyOptions.filter(function(item) {
      return item.code === code;
    })[0] || null;
  }

  function openCurrencyModal(page) {
    var modal = document.querySelector(".currency-modal-mask");
    if (!modal) return;
    modal.querySelector(".currency-modal-body").innerHTML =
      "<label class=\"currency-form-row is-required\"><span>币种</span><select name=\"code\">" + currencySelectOptions() + "</select></label>" +
      "<label class=\"currency-form-row is-required\"><span>地区</span><input name=\"area\" placeholder=\"请输入运营地区\"></label>" +
      "<label class=\"currency-form-row\"><span>时区</span><select name=\"timezone\"><option>UTC+00:00</option><option>UTC+05:30</option><option>UTC+07:00</option><option>UTC+08:00</option><option>UTC-03:00</option><option>UTC-05:00</option></select></label>" +
      "<label class=\"currency-form-row currency-order-row\"><span>序号</span><div class=\"currency-stepper\"><button type=\"button\" data-currency-step=\"-1\">−</button><input name=\"order\" type=\"number\" value=\"0\"><button type=\"button\" data-currency-step=\"1\">＋</button></div></label>" +
      "<div class=\"currency-modal-error\" hidden></div>";
    modal._page = page;
    modal.hidden = false;
    modal.querySelector("select[name='code']").focus();
  }

  function closeCurrencyModal() {
    var modal = document.querySelector(".currency-modal-mask");
    if (modal) modal.hidden = true;
  }

  function saveCurrencyModal() {
    var modal = document.querySelector(".currency-modal-mask");
    var codeInput = modal.querySelector("select[name='code']");
    var areaInput = modal.querySelector("input[name='area']");
    var orderInput = modal.querySelector("input[name='order']");
    var error = modal.querySelector(".currency-modal-error");
    var code = codeInput.value.trim().toUpperCase();
    var area = areaInput.value.trim();
    if (!code) {
      error.textContent = "请选择币种";
      error.hidden = false;
      return;
    }
    if (!area) {
      error.textContent = "请输入运营地区";
      error.hidden = false;
      return;
    }
    currencyLabels[code] = area + "-" + code;
    currencyRegions[code] = area + " - " + code;
    if (currencies.indexOf(code) === -1) {
      var order = Number(orderInput.value || currencies.length);
      var insertIndex = Math.max(0, Math.min(currencies.length, order));
      currencies.splice(insertIndex, 0, code);
    }
    activeCurrency = code;
    render(modal._page || document.querySelector(".flight-room-page"));
    closeCurrencyModal();
  }

  function addRoom(page) {
    openRoomModal(page, null);
  }

  function isProtectedRoom(room) {
    return !room || room.control || room.name.indexOf("大厅") !== -1;
  }

  function findLobbyRoom() {
    return rooms.filter(function(room) { return room.name.indexOf("大厅") !== -1; })[0] || rooms[0];
  }

  function nextRoomName() {
    return rooms.reduce(function(max, room) {
      var match = /^(\d+)号?$/.exec(room.name);
      return match ? Math.max(max, Number(match[1])) : max;
    }, 0) + 1 + "号";
  }

  function stepper(label, name, value, hint) {
    return "<label class=\"room-field room-field-stepper\">" +
      "<span>" + label + "</span>" +
      "<div class=\"room-stepper\" data-stepper=\"" + name + "\">" +
        "<button type=\"button\" data-step=\"-1\">−</button>" +
        "<input name=\"" + name + "\" type=\"number\" value=\"" + escapeHtml(value) + "\">" +
        "<button type=\"button\" data-step=\"1\">＋</button>" +
      "</div>" +
      (hint ? "<em>" + hint + "</em>" : "") +
    "</label>";
  }

  function roomModalForm(room) {
    var data = normalizeRoom(Object.assign({}, roomDefaults, room || {}));
    var isEdit = editingRoomIndex != null;
    var activeTab = isEdit ? "info" : "setting";
    var stats = roomStats(data);
    var regionOptions = Object.keys(currencyRegions).map(function(key) {
      var label = currencyRegions[key];
      return "<option value=\"" + escapeHtml(label) + "\"" + (label === data.region ? " selected" : "") + ">" + escapeHtml(label) + "</option>";
    }).join("");
    return "<div class=\"room-modal-tabs\">" +
        "<button type=\"button\" class=\"" + (activeTab === "info" ? "is-active" : "") + "\" data-room-tab=\"info\">信息</button>" +
        "<button type=\"button\" class=\"" + (activeTab === "setting" ? "is-active" : "") + "\" data-room-tab=\"setting\">设置</button>" +
        "<button type=\"button\"" + (isEdit ? "" : " disabled") + " data-room-tab=\"stock\">库存</button>" +
      "</div>" +
      "<div class=\"room-modal-error\" hidden></div>" +
      "<div class=\"room-modal-pane" + (activeTab === "info" ? " is-active" : "") + "\" data-room-pane=\"info\">" +
        "<div class=\"room-info-hero\">" +
          "<span>房间名称</span>" +
          "<strong>" + escapeHtml(data.name || nextRoomName()) + "</strong>" +
          "<em>" + escapeHtml(data.region || roomDefaults.region) + "</em>" +
        "</div>" +
        "<div class=\"room-info-list\">" +
          "<div class=\"room-info-row is-main\"><span>当前库存</span><strong>" + money(stats.stock) + "</strong></div>" +
          "<div class=\"room-info-row\"><span>站点数量</span><strong>" + stats.siteCount + "</strong></div>" +
          "<div class=\"room-info-row\"><span>总下注</span><strong>" + money(stats.totalBet) + "</strong></div>" +
          "<div class=\"room-info-row\"><span>总返奖</span><strong>" + money(stats.totalReturn) + "</strong></div>" +
          "<div class=\"room-info-row\"><span>RTP</span><strong>" + stats.rtp.toFixed(2) + "%</strong></div>" +
          "<div class=\"room-info-row\"><span>在线人数</span><strong>" + stats.currentOnline + "</strong></div>" +
          "<div class=\"room-info-row\"><span>峰值在线</span><strong>" + stats.maxOnline + "</strong></div>" +
          "<div class=\"room-info-row is-muted\"><span>创建信息</span><strong>" + escapeHtml(stats.creatorId) + "<em>" + escapeHtml(stats.createdAt) + "</em></strong></div>" +
        "</div>" +
      "</div>" +
      "<div class=\"room-modal-pane" + (activeTab === "setting" ? " is-active" : "") + "\" data-room-pane=\"setting\">" +
        "<label class=\"room-field is-required\"><span>房间名称</span><input name=\"name\" type=\"text\" value=\"" + escapeHtml(data.name || nextRoomName()) + "\" placeholder=\"请输入\"></label>" +
        "<label class=\"room-field is-required\"><span>货币地区</span><select name=\"region\">" + regionOptions + "</select></label>" +
        stepper("大额返奖倍数设定", "bigMultiplier", data.bigMultiplier, "玩家大额返奖倍数大于等于此值") +
        stepper("大额奖金设定(赢奖)", "bigAmount", data.bigAmount, "大额返奖金额排行大于等于此值") +
        stepper("大额同返奖倍数设定(回合)", "comboMultiplier", data.comboMultiplier, "大额同返奖倍数排行大于等于此值") +
        "<label class=\"room-field\"><span>机器人前缀</span><input name=\"botPrefix\" type=\"text\" value=\"" + escapeHtml(data.botPrefix) + "\" placeholder=\"请输入\"></label>" +
        stepper("机器人最大数量", "botMaxCount", data.botMaxCount, "") +
        stepper("机器人最小下注", "botMinBet", data.botMinBet, "") +
        stepper("机器人最大下注", "botMaxBet", data.botMaxBet, "") +
        stepper("机器人最大奖金", "botMaxPrize", data.botMaxPrize, "") +
        stepper("机器人最大分享数量", "botMaxShare", data.botMaxShare, "") +
      "</div>" +
      "<div class=\"room-modal-pane\" data-room-pane=\"stock\">" +
        "<div class=\"stock-panel\" data-stock-current=\"" + Number(data.stock || 0) + "\">" +
          "<div class=\"stock-summary-card\">" +
            "<span>当前库存</span>" +
            "<strong>" + money(data.stock || 0) + "</strong>" +
            "<small>当前房间可用库存余额</small>" +
          "</div>" +
          "<div class=\"stock-adjust-card\">" +
            "<div class=\"stock-adjust-head\"><strong>库存调整</strong><span>输入正数增加，输入负数减少</span></div>" +
            "<div class=\"stock-adjust-row\">" +
              "<input name=\"stockDelta\" type=\"number\" value=\"0\" placeholder=\"例如 50000 或 -50000\">" +
              "<button type=\"button\" data-stock-clear=\"true\">清空</button>" +
            "</div>" +
          "</div>" +
          "<div class=\"stock-result-card\">" +
            "<span>调整后库存</span>" +
            "<strong data-stock-after=\"true\">" + money(data.stock || 0) + "</strong>" +
          "</div>" +
        "</div>" +
      "</div>";
  }

  function openRoomModal(page, index) {
    editingRoomIndex = index;
    var modal = document.querySelector(".room-modal-mask");
    var body = modal.querySelector(".room-modal-body");
    var deleteButton = modal.querySelector("[data-room-modal-delete]");
    body.innerHTML = roomModalForm(index == null ? { region: currencyRegions[activeCurrency] || roomDefaults.region } : rooms[index]);
    deleteButton.hidden = index == null || isProtectedRoom(rooms[index]);
    modal.hidden = false;
    window.setTimeout(function() {
      var input = body.querySelector(".room-modal-pane.is-active input[name='name']");
      if (input) input.focus();
    }, 0);
  }

  function closeRoomModal() {
    editingRoomIndex = null;
    var modal = document.querySelector(".room-modal-mask");
    if (modal) modal.hidden = true;
  }

  function deleteCurrentRoom(page) {
    if (editingRoomIndex == null) return;
    var room = rooms[editingRoomIndex];
    if (isProtectedRoom(room)) {
      window.alert("大厅和小黑屋不可删除");
      return;
    }
    var lobby = findLobbyRoom();
    var siteCount = room.tables.length;
    var confirmed = window.confirm("确定删除房间“" + room.name + "”吗？删除后该房间内的 " + siteCount + " 个站点将进入大厅。");
    if (!confirmed) return;
    if (lobby && lobby !== room) {
      lobby.tables = lobby.tables.concat(room.tables);
      lobby.sites = lobby.tables.length;
    }
    rooms.splice(editingRoomIndex, 1);
    render(page);
    closeRoomModal();
  }

  function saveRoomModal(page) {
    var modal = document.querySelector(".room-modal-mask");
    var body = modal.querySelector(".room-modal-body");
    var error = body.querySelector(".room-modal-error");
    var formData = {};
    Array.prototype.forEach.call(body.querySelectorAll("input, select"), function(input) {
      formData[input.name] = input.type === "number" ? Number(input.value || 0) : input.value.trim();
    });
    if (!formData.name) {
      error.textContent = "请输入房间名称";
      error.hidden = false;
      return;
    }
    var duplicate = rooms.some(function(room, index) {
      return index !== editingRoomIndex && room.name === formData.name;
    });
    if (duplicate) {
      error.textContent = "房间名称已存在";
      error.hidden = false;
      return;
    }
    var target = editingRoomIndex == null ? {
      sites: 0,
      stock: 0,
      rate: 0,
      tables: []
    } : rooms[editingRoomIndex];
    var stockDelta = Number(formData.stockDelta || 0);
    delete formData.stockDelta;
    Object.assign(target, formData);
    if (editingRoomIndex != null && stockDelta) {
      target.stock = Number(target.stock || 0) + stockDelta;
    }
    if (editingRoomIndex == null) {
      target.name = formData.name;
      target.sites = 0;
      target.stock = 0;
      target.rate = 0;
      target.tables = [];
      normalizeRoom(target);
      var insertIndex = rooms.findIndex(function(room) { return room.control; });
      if (insertIndex < 0) insertIndex = rooms.length;
      rooms.splice(insertIndex, 0, target);
    }
    render(page);
    closeRoomModal();
  }

  function adjustStepper(stepperEl, direction) {
    var input = stepperEl.querySelector("input");
    var current = Number(input.value || 0);
    var step = Math.abs(current) >= 100000 ? 10000 : Math.abs(current) >= 1000 ? 100 : 1;
    input.value = Math.max(0, current + direction * step);
  }

  function updateStockPreview(modal) {
    var panel = modal.querySelector(".stock-panel");
    if (!panel) return;
    var current = Number(panel.getAttribute("data-stock-current") || 0);
    var input = panel.querySelector("input[name='stockDelta']");
    var after = panel.querySelector("[data-stock-after]");
    if (!input || !after) return;
    after.textContent = money(current + Number(input.value || 0));
  }

  function cleanupDragState(page) {
    page.classList.remove("is-drag-overview");
    Array.prototype.forEach.call(page.querySelectorAll(".flight-room-table.is-dragging"), function(site) {
      site.classList.remove("is-dragging");
    });
    Array.prototype.forEach.call(page.querySelectorAll(".flight-room-card.is-drop-target"), function(card) {
      card.classList.remove("is-drop-target");
    });
    if (dragPreview && dragPreview.parentNode) {
      dragPreview.parentNode.removeChild(dragPreview);
    }
    dragPreview = null;
    draggingSite = null;
  }

  function bindDrag(page) {
    page.addEventListener("dragstart", function(event) {
      var site = event.target.closest(".flight-room-table");
      if (!site) return;
      draggingSite = {
        siteId: site.getAttribute("data-site-id"),
        roomName: site.getAttribute("data-room-name")
      };
      site.classList.add("is-dragging");
      dragPreview = site.cloneNode(true);
      dragPreview.classList.add("flight-room-drag-preview");
      dragPreview.style.width = site.offsetWidth + "px";
      document.body.appendChild(dragPreview);
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", draggingSite.siteId);
      event.dataTransfer.setDragImage(dragPreview, Math.min(80, site.offsetWidth / 2), 26);
      window.setTimeout(function() {
        if (draggingSite) page.classList.add("is-drag-overview");
      }, 0);
    });

    page.addEventListener("dragend", function(event) {
      cleanupDragState(page);
    });

    page.addEventListener("dragover", function(event) {
      var card = event.target.closest(".flight-room-card");
      if (!card || !draggingSite) return;
      if (card.getAttribute("data-drop-disabled") === "true") return;
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      card.classList.add("is-drop-target");
    });

    page.addEventListener("dragleave", function(event) {
      var card = event.target.closest(".flight-room-card");
      if (!card) return;
      if (!card.contains(event.relatedTarget)) card.classList.remove("is-drop-target");
    });

    page.addEventListener("drop", function(event) {
      var card = event.target.closest(".flight-room-card");
      if (!card || !draggingSite) return;
      if (card.getAttribute("data-drop-disabled") === "true") return;
      event.preventDefault();
      var targetName = card.getAttribute("data-room-name");
      if (moveSite(draggingSite.roomName, targetName, draggingSite.siteId)) {
        render(page);
      }
      cleanupDragState(page);
    });
  }

  function buildPage() {
    var app = document.getElementById("app");
    if (!app || document.querySelector(".flight-room-page")) return;

    app.innerHTML = shellHtml();
    var page = app.querySelector(".flight-room-page");
    render(page);
    bindDrag(page);
    updateTopbarTime(app);
    window.setInterval(function() {
      updateTopbarTime(app);
    }, 30000);

    app.addEventListener("click", function(event) {
      var tab = event.target.closest("[data-currency]");
      if (tab) {
        activeCurrency = tab.getAttribute("data-currency");
        render(page);
        return;
      }
      if (event.target.closest("[data-add-currency]")) {
        addCurrency(page);
        return;
      }
      if (event.target.closest("[data-currency-modal-close]")) {
        closeCurrencyModal();
        return;
      }
      if (event.target.closest("[data-currency-modal-save]")) {
        saveCurrencyModal();
        return;
      }
      if (event.target.closest("[data-add-room]")) {
        addRoom(page);
        return;
      }
      var editButton = event.target.closest("[data-edit-room]");
      if (editButton) {
        openRoomModal(page, Number(editButton.getAttribute("data-edit-room")));
        return;
      }
      if (event.target.closest("[data-room-modal-close]")) {
        closeRoomModal();
        return;
      }
      if (event.target.closest("[data-room-modal-save]")) {
        saveRoomModal(page);
        return;
      }
      if (event.target.closest("[data-room-modal-delete]")) {
        deleteCurrentRoom(page);
        return;
      }
      if (event.target.closest("[data-stock-clear]")) {
        var stockPanel = event.target.closest(".stock-panel");
        stockPanel.querySelector("input[name='stockDelta']").value = 0;
        updateStockPreview(event.target.closest(".room-modal"));
        return;
      }
      var modalTab = event.target.closest("[data-room-tab]");
      if (modalTab && !modalTab.disabled) {
        var modal = modalTab.closest(".room-modal");
        var tabName = modalTab.getAttribute("data-room-tab");
        Array.prototype.forEach.call(modal.querySelectorAll("[data-room-tab]"), function(tabButton) {
          tabButton.classList.toggle("is-active", tabButton === modalTab);
        });
        Array.prototype.forEach.call(modal.querySelectorAll("[data-room-pane]"), function(pane) {
          pane.classList.toggle("is-active", pane.getAttribute("data-room-pane") === tabName);
        });
        return;
      }
      var stepButton = event.target.closest(".room-stepper button");
      if (stepButton) {
        adjustStepper(stepButton.closest(".room-stepper"), Number(stepButton.getAttribute("data-step")));
        return;
      }
      var currencyStepButton = event.target.closest("[data-currency-step]");
      if (currencyStepButton) {
        var stepInput = currencyStepButton.closest(".currency-stepper").querySelector("input");
        var nextValue = Number(stepInput.value || 0) + Number(currencyStepButton.getAttribute("data-currency-step"));
        stepInput.value = Math.max(0, nextValue);
        return;
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
      var accountToggle = event.target.closest(".topbar-account-toggle");
      if (accountToggle) {
        accountToggle.closest(".topbar-account-wrap").classList.toggle("is-open");
        return;
      }
      if (!event.target.closest(".topbar-account-wrap")) {
        var account = app.querySelector(".topbar-account-wrap.is-open");
        if (account) account.classList.remove("is-open");
      }
      var pageTab = event.target.closest("[data-tab-file]");
      if (pageTab && !event.target.classList.contains("codex-page-tab-close")) {
        window.location.href = pageTab.getAttribute("data-tab-file");
      }
    });

    app.addEventListener("input", function(event) {
      if (event.target.matches("input[name='stockDelta']")) {
        updateStockPreview(event.target.closest(".room-modal"));
      }
    });

    app.addEventListener("change", function(event) {
      if (event.target.matches(".currency-modal select[name='code']")) {
        var option = selectedCurrencyOption(event.target.value);
        var modal = event.target.closest(".currency-modal");
        if (option && modal) {
          modal.querySelector("input[name='area']").value = option.area;
          modal.querySelector("select[name='timezone']").value = option.timezone;
        }
      }
    });
  }

  function updateTopbarTime(app) {
    var node = app.querySelector("[data-topbar-time]");
    if (!node) return;
    var now = new Date();
    var hh = String(now.getHours()).padStart(2, "0");
    var mm = String(now.getMinutes()).padStart(2, "0");
    node.textContent = hh + ":" + mm + " 中国";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildPage);
  } else {
    buildPage();
  }
})();
