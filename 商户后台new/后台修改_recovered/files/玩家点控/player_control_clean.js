(function() {
  var rows = [
    { playerId: "10310000289609", merchantId: "M10086", startTime: "2026-02-04 13:54:06", range: "全部", games: [], releaseType: "指定金额", current: "12345", rtp: "80.32%", threshold: "50,000", history: "126,880.50", controlType: "自动点控", status: "已结束" },
    { playerId: "10310000289610", merchantId: "M10021", startTime: "2026-05-28 09:12:18", range: "全部", games: [], releaseType: "指定RTP", current: "8,420", rtp: "76.50%", threshold: "82.00%", history: "84,510.20", controlType: "自动点控", status: "进行中" },
    { playerId: "10310000289611", merchantId: "M10057", startTime: "2026-05-28 10:20:44", range: "详细", games: ["金虎纳福 100126", "赏金船长 100248", "麻将胡了 100387"], releaseType: "指定金额", current: "5,810", rtp: "78.12%", threshold: "30,000", history: "58,730.00", controlType: "人工点控", status: "进行中" },
    { playerId: "10310000289612", merchantId: "M10012", startTime: "2026-05-28 11:05:31", range: "全部", games: [], releaseType: "指定金额", current: "2,640", rtp: "81.90%", threshold: "12,000", history: "7,650.20", controlType: "自动点控", status: "进行中" },
    { playerId: "10310000289613", merchantId: "M10086", startTime: "2026-05-27 22:44:09", range: "详细", games: ["火热辣椒 100452", "财神到 100516"], releaseType: "指定RTP", current: "9,360", rtp: "83.42%", threshold: "85.00%", history: "39,880.60", controlType: "人工点控", status: "已结束" },
    { playerId: "10310000289614", merchantId: "M10021", startTime: "2026-05-28 08:18:22", range: "全部", games: [], releaseType: "指定金额", current: "15,200", rtp: "79.24%", threshold: "60,000", history: "91,230.00", controlType: "自动点控", status: "进行中" },
    { playerId: "10310000289615", merchantId: "M10057", startTime: "2026-05-28 12:36:40", range: "详细", games: ["糖果派对 100673", "埃及宝藏 100781", "龙珠探险 100894"], releaseType: "指定金额", current: "3,180", rtp: "77.65%", threshold: "15,000", history: "23,114.20", controlType: "人工点控", status: "进行中" },
    { playerId: "10310000289616", merchantId: "M10012", startTime: "2026-05-26 19:12:58", range: "全部", games: [], releaseType: "指定RTP", current: "18,904", rtp: "84.10%", threshold: "86.00%", history: "66,302.90", controlType: "自动点控", status: "已结束" }
  ];

  var gamePool = [
    "金虎纳福 100126", "赏金船长 100248", "麻将胡了 100387", "火热辣椒 100452", "财神到 100516", "糖果派对 100673",
    "埃及宝藏 100781", "龙珠探险 100894", "黄金矿工 101026", "幸运水果 101135", "狂野牛仔 101246", "冰雪女王 101357",
    "海盗宝藏 101468", "极速赛车 101579", "森林舞会 101680", "宝石迷阵 101791", "阿兹特克 101802", "魔法转轮 101913",
    "发财狮子 102024", "龙凤呈祥 102135", "极速糖果 102246", "星际宝藏 102357", "熊猫福星 102468", "黄金之路 102579",
    "疯狂金币 102680", "古墓奇兵 102791", "雷神之锤 102802", "招财猫 102913", "火山宝石 103024", "银河旋转 103135",
    "钻石之夜 103246", "幸运兔子 103357", "富贵金龙 103468", "水果嘉年华 103579", "神秘海域 103680", "巨龙宝库 103791",
    "霓虹派对 103802", "王者皇冠 103913", "极地企鹅 104024", "沙漠绿洲 104135", "忍者宝藏 104246", "女巫魔法 104357",
    "摇钱树 104468", "锦鲤赐福 104579", "王牌特工 104680", "深海珍珠 104791", "糖果炸弹 104802", "赏金猎人 104913",
    "丛林冒险 105024", "黄金神庙 105135", "幸运七 105246", "电音之夜 105357", "月光宝盒 105468", "狂欢马戏 105579",
    "英雄传说 105680", "百变财神 105791", "水晶洞穴 105802", "飞龙在天 105913", "烈焰钻石 106024", "海洋之星 106135"
  ];

  var gameBrands = [
    { name: "PG", games: [{ id: "PG01", name: "麻将胡了" }, { id: "PG02", name: "糖果派对" }, { id: "PG03", name: "赏金女王" }, { id: "PG04", name: "宝石矿工" }, { id: "PG05", name: "寻宝黄金城" }] },
    { name: "JILI", games: [{ id: "2", name: "秦皇传说" }, { id: "102", name: "罗马X" }, { id: "5", name: "火热辣椒" }, { id: "6", name: "发财树" }, { id: "12", name: "疯狂777" }, { id: "27", name: "金钱兔" }] }
  ];

  var pendingConfirmAction = null;

  function currentFile() {
    var path = decodeURIComponent(window.location.pathname || "");
    return path.split("/").pop() || "玩家点控.html";
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
      var active = file === "玩家点控.html" ? " is-active" : "";
      return "<button type=\"button\" class=\"codex-page-tab" + active + "\" data-tab-file=\"" + file + "\"><span class=\"codex-page-tab-dot\"></span><span class=\"codex-page-tab-title\">" + file.replace(".html", "") + "</span><span class=\"codex-page-tab-close\">×</span></button>";
    }).join("");
  }

  function rowHtml(row, index) {
    var statusClass = row.status === "进行中" ? "status-active" : "status-ended";
    return "<tr>" +
      "<td><button type=\"button\" class=\"smart-link\" data-player-id=\"" + row.playerId + "\">" + row.playerId + "</button></td>" +
      "<td>" + row.startTime.replace(" ", "<br>") + "</td>" +
      "<td>" + (row.range === "全部" ? "全部" : "<button type=\"button\" class=\"range-detail\" data-range-detail=\"" + index + "\">详细</button>") + "</td>" +
      "<td>" + row.releaseType + "</td>" +
      "<td>" + row.current + "</td>" +
      "<td>" + row.rtp + "</td>" +
      "<td>" + row.threshold + "</td>" +
      "<td>" + row.history + "</td>" +
      "<td>" + row.controlType + "</td>" +
      "<td><span class=\"" + statusClass + "\">" + row.status + "</span></td>" +
      "<td><button type=\"button\" class=\"table-action\" data-delete=\"" + index + "\">删除</button></td>" +
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
    var tbody = document.querySelector(".control-table tbody");
    tbody.innerHTML = filtered.length ? filtered.map(function(row) {
      return rowHtml(row, rows.indexOf(row));
    }).join("") : "<tr><td colspan=\"11\">暂无匹配数据</td></tr>";
  }

  function updateTopbarTime(app) {
    var node = app.querySelector("[data-topbar-time]");
    if (!node) return;
    var now = new Date();
    var hh = String(now.getHours()).padStart(2, "0");
    var mm = String(now.getMinutes()).padStart(2, "0");
    node.textContent = hh + ":" + mm + " 中国";
  }

  function openAddModal() {
    var host = document.getElementById("controlModalHost");
    host.innerHTML = "<div class=\"control-modal-mask\">" +
      "<div class=\"new-control-modal\">" +
        "<button type=\"button\" class=\"new-control-close\" data-modal-close>×</button>" +
        "<div class=\"new-control-title\">新建点控</div>" +
        "<div class=\"new-control-form\">" +
          "<label class=\"new-label is-active\">玩家ID</label>" +
          "<textarea id=\"modalPlayerId\" class=\"new-player-input\" placeholder=\"请输入平台ID；多个玩家ID用英文的,间隔\">10310000289621</textarea>" +
          "<label class=\"new-label\">选择游戏</label>" +
          gameFilterHtml() +
          "<label class=\"new-label\">选择输赢</label>" +
          "<button type=\"button\" class=\"win-switch is-win\" data-win-switch><span></span><em>输</em></button>" +
          "<label class=\"new-label\">控制RTP</label>" +
          "<div class=\"stepper\"><button type=\"button\" data-step=\"modalRtp\" data-delta=\"-1\">−</button><input id=\"modalRtp\" value=\"97\"><span>%</span><button type=\"button\" data-step=\"modalRtp\" data-delta=\"1\">＋</button></div>" +
          "<label class=\"new-label\">解除类型</label>" +
          "<div class=\"release-radios\">" +
            "<label><input type=\"radio\" name=\"modalRelease\" value=\"金额\" checked>金额</label>" +
            "<label><input type=\"radio\" name=\"modalRelease\" value=\"局数\">局数</label>" +
            "<label><input type=\"radio\" name=\"modalRelease\" value=\"RTP\">RTP</label>" +
            "<label><input type=\"radio\" name=\"modalRelease\" value=\"时间\">时间</label>" +
          "</div>" +
          "<label class=\"new-label\" id=\"releaseValueLabel\">解除金额</label>" +
          "<div id=\"releaseParamHost\" class=\"release-param-host\"></div>" +
          "<div></div><div class=\"release-desc\" id=\"releaseDesc\">当玩家累计达到指定解除金额后，自动解除本次点控。</div>" +
        "</div>" +
        "<div class=\"new-control-actions\"><button type=\"button\" class=\"btn btn-outline\" data-modal-close>取消</button><button type=\"button\" class=\"btn btn-primary\" data-modal-save>确定</button></div>" +
      "</div>" +
    "</div>";
  }

  function saveModal() {
    var now = new Date();
    var dateText = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0") + "-" + String(now.getDate()).padStart(2, "0") + " " + String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0") + ":" + String(now.getSeconds()).padStart(2, "0");
    rows.unshift({
      playerId: document.getElementById("modalPlayerId").value.trim() || "10310000289621",
      merchantId: "M10086",
      startTime: dateText,
      range: selectedModalGames().all ? "全部" : "详细",
      games: selectedModalGames().games,
      releaseType: document.querySelector("input[name='modalRelease']:checked").value,
      current: "0",
      rtp: document.getElementById("modalRtp").value + ".00%",
      threshold: document.getElementById("modalThreshold").value || "97",
      history: "0.00",
      controlType: document.getElementById("modalControlType").value,
      status: "进行中"
    });
    closeModal();
    renderRows();
  }

  function closeModal() {
    document.getElementById("controlModalHost").innerHTML = "";
    pendingConfirmAction = null;
  }

  function openConfirmModal(action, index) {
    pendingConfirmAction = {
      action: action,
      index: typeof index === "undefined" ? -1 : Number(index)
    };
    renderConfirmStep(1);
  }

  function renderConfirmStep(step) {
    var isDelete = pendingConfirmAction && pendingConfirmAction.action === "delete";
    var targetRow = isDelete ? rows[pendingConfirmAction.index] : null;
    var detail = targetRow ? "<div class=\"confirm-player-card\">" +
      "<div><span>玩家ID</span><strong>" + targetRow.playerId + "</strong></div>" +
      "<div><span>解除类型</span><strong>" + targetRow.releaseType + "</strong></div>" +
      "<div><span>当前值</span><strong>" + targetRow.current + "</strong></div>" +
      "<div><span>解除阈值</span><strong>" + targetRow.threshold + "</strong></div>" +
      "<div><span>历史输赢</span><strong>" + targetRow.history + "</strong></div>" +
      "</div>" : "";
    var title = step === 1 ? "确认操作" : "再次确认";
    var message = step === 1
      ? (isDelete ? "删除后该玩家点控记录将从列表移除。" : "一键取消会结束当前列表中的全部点控记录。")
      : (isDelete ? "请再次确认是否删除这条记录。" : "请再次确认是否取消全部点控。");
    var primary = step === 1
      ? "<button type=\"button\" class=\"btn btn-primary\" data-confirm-next>继续</button>"
      : "<button type=\"button\" class=\"btn btn-danger\" data-confirm-execute>确认执行</button>";
    var secondary = step === 1
      ? "<button type=\"button\" class=\"btn btn-outline\" data-modal-close>取消</button>"
      : "<button type=\"button\" class=\"btn btn-outline\" data-confirm-back>返回</button>";
    document.getElementById("controlModalHost").innerHTML = "<div class=\"control-modal-mask\">" +
      "<div class=\"confirm-modal\">" +
        "<div class=\"control-modal-head\"><span>" + title + "</span><button type=\"button\" class=\"control-modal-close\" data-modal-close>×</button></div>" +
        "<div class=\"confirm-modal-body\">" +
          "<div class=\"confirm-icon\">!</div>" +
          "<div><strong>" + (isDelete ? "删除点控记录" : "一键取消点控") + "</strong><p>" + message + "</p></div>" +
        detail +
        "</div>" +
        "<div class=\"control-modal-actions\">" + secondary + primary + "</div>" +
      "</div>" +
    "</div>";
  }

  function executeConfirmAction() {
    if (!pendingConfirmAction) return;
    if (pendingConfirmAction.action === "cancelAll") {
      rows.forEach(function(row) { row.status = "已结束"; });
    }
    if (pendingConfirmAction.action === "delete" && pendingConfirmAction.index >= 0) {
      rows.splice(pendingConfirmAction.index, 1);
    }
    closeModal();
    renderRows();
  }

  function gameFilterHtml() {
    var brands = gameBrands.map(function(brand) {
      var brandKey = brand.name.toLowerCase();
      var games = brand.games.map(function(game) {
        var value = "【" + game.id + "】" + game.name;
        return "<label class=\"game-filter-game\" data-game-row=\"" + game.id + " " + game.name + "\" data-game-brand=\"" + brandKey + "\"><input type=\"checkbox\" data-game-value=\"" + value + "\"><span>" + value + "</span></label>";
      }).join("");
      return "<div class=\"game-filter-tree-row game-filter-provider\" data-game-row=\"" + brand.name + "\" data-brand-row=\"" + brandKey + "\"><button class=\"game-filter-caret is-open\" type=\"button\" data-brand-toggle=\"" + brandKey + "\"></button><label><input type=\"checkbox\" data-game-group=\"" + brandKey + "\"><span>" + brand.name + "</span></label></div>" +
        "<div class=\"game-filter-games\" data-brand-games=\"" + brandKey + "\">" + games + "</div>";
    }).join("");
    return "<div class=\"game-filter\">" +
      "<div class=\"game-filter-trigger\"><input class=\"game-filter-input\" id=\"modalGameText\" placeholder=\"请选择 / 输入游戏名\" value=\"全部\"><button class=\"game-filter-arrow\" type=\"button\" aria-label=\"展开游戏筛选\"></button></div>" +
      "<div class=\"game-filter-menu\">" +
        "<div class=\"game-filter-tree-row game-filter-all\"><label><input type=\"checkbox\" data-game-all checked><span>全部</span></label></div>" +
        "<div class=\"game-filter-tree-row game-filter-root\" data-game-row=\"SLOT\"><button class=\"game-filter-caret is-open\" type=\"button\" data-type-toggle=\"SLOT\"></button><label><input type=\"checkbox\" data-game-group=\"slot\"><span>SLOT</span></label></div>" +
        brands +
      "</div>" +
    "</div>";
  }

  function selectedModalGames() {
    var all = document.querySelector("[data-game-all]");
    if (!all || all.checked) return { all: true, games: [] };
    return {
      all: false,
      games: Array.prototype.map.call(document.querySelectorAll("[data-game-value]:checked"), function(input) {
        return input.getAttribute("data-game-value");
      })
    };
  }

  function syncGamePickerText() {
    var selected = selectedModalGames();
    var input = document.getElementById("modalGameText");
    var slot = document.querySelector("[data-game-group='slot']");
    Array.prototype.forEach.call(document.querySelectorAll("[data-game-group]:not([data-game-group='slot'])"), function(group) {
      var brand = group.getAttribute("data-game-group");
      var items = document.querySelectorAll("[data-brand-games='" + brand + "'] [data-game-value]");
      var checked = document.querySelectorAll("[data-brand-games='" + brand + "'] [data-game-value]:checked");
      group.checked = items.length > 0 && checked.length === items.length;
      group.indeterminate = checked.length > 0 && checked.length < items.length;
    });
    if (slot) {
      var allGames = document.querySelectorAll("[data-game-value]");
      slot.checked = !selected.all && selected.games.length === allGames.length;
      slot.indeterminate = !selected.all && selected.games.length > 0 && selected.games.length < allGames.length;
    }
    if (!input) return;
    input.value = selected.all ? "全部" : (selected.games.length ? "已选 " + selected.games.length + " 个游戏" : "");
  }

  function updateReleaseDescription() {
    var checked = document.querySelector("input[name='modalRelease']:checked");
    var desc = document.getElementById("releaseDesc");
    var label = document.getElementById("releaseValueLabel");
    var host = document.getElementById("releaseParamHost");
    if (!checked || !desc || !label || !host) return;
    var map = {
      "金额": ["解除金额", "当玩家累计达到指定解除金额后，自动解除本次点控。"],
      "局数": ["解除局数", "当玩家完成指定游戏局数后，自动解除本次点控。"],
      "RTP": ["解除RTP", "当玩家当前RTP达到设置阈值后，自动解除本次点控。"],
      "时间": ["解除时间", "当点控持续达到设置时间后，自动解除本次点控。"]
    };
    var inputMap = {
      "金额": "<div class=\"param-input-wrap\"><input id=\"modalThreshold\" class=\"param-input\" type=\"text\" value=\"20000\"><span>金额</span></div>",
      "局数": "<div class=\"stepper\"><button type=\"button\" data-step=\"modalThreshold\" data-delta=\"-1\">−</button><input id=\"modalThreshold\" value=\"100\"><span>局</span><button type=\"button\" data-step=\"modalThreshold\" data-delta=\"1\">＋</button></div>",
      "RTP": "<div class=\"stepper\"><button type=\"button\" data-step=\"modalThreshold\" data-delta=\"-1\">−</button><input id=\"modalThreshold\" value=\"97\"><span>%</span><button type=\"button\" data-step=\"modalThreshold\" data-delta=\"1\">＋</button></div>",
      "时间": "<div class=\"param-time-wrap\"><input id=\"modalThreshold\" class=\"param-input\" type=\"number\" value=\"24\" min=\"1\"><select id=\"modalThresholdUnit\"><option value=\"小时\">小时</option><option value=\"分钟\">分钟</option><option value=\"天\">天</option></select></div>"
    };
    label.textContent = map[checked.value][0];
    desc.textContent = map[checked.value][1];
    host.innerHTML = inputMap[checked.value];
  }

  function openRangeModal(row) {
    var games = row.games && row.games.length ? row.games : gamePool;
    if (games.length < 80) {
      games = games.concat(gamePool).concat(gamePool.slice(0, 28));
    }
    var host = document.getElementById("controlModalHost");
    host.innerHTML = "<div class=\"control-modal-mask\">" +
      "<div class=\"range-modal\">" +
        "<div class=\"control-modal-head\"><span>点控游戏明细</span><button type=\"button\" class=\"control-modal-close\" data-modal-close>×</button></div>" +
        "<div class=\"range-modal-toolbar\">" +
          "<div><strong>玩家ID：" + row.playerId + "</strong><span>共 " + games.length + " 个游戏</span></div>" +
          "<input class=\"range-search\" type=\"text\" placeholder=\"搜索游戏名称或ID\" data-game-search>" +
        "</div>" +
        "<div class=\"range-game-list\" data-game-list>" + games.map(function(game) {
          return "<div class=\"range-game-item\" data-game-name=\"" + game + "\">" + game + "</div>";
        }).join("") + "</div>" +
        "<div class=\"control-modal-actions\"><button type=\"button\" class=\"btn btn-primary\" data-modal-close>确定</button></div>" +
      "</div>" +
    "</div>";
  }

  function shellHtml() {
    return "<div class=\"app-shell\">" +
      "<a class=\"app-brand\" href=\"首页仪表盘.html\">GB总后台</a>" +
      "<header class=\"app-topbar\">" +
        "<h1 class=\"topbar-page-title\">玩家点控</h1>" +
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
        "<div class=\"control-page\">" +
          "<div class=\"codex-page-tabs\">" + pageTabs() + "</div>" +
          "<section class=\"control-panel\">" +
            "<div class=\"control-filter\">" +
              "<label class=\"filter-field\">玩家ID<input id=\"filterPlayerId\" class=\"filter-input\" type=\"text\" placeholder=\"请输入\"></label>" +
              "<label class=\"filter-field\">商户站点<select id=\"filterMerchant\" class=\"filter-select\"><option value=\"all\">全部</option><option value=\"M10086\">星海娱乐</option><option value=\"M10021\">蓝鲸游戏</option><option value=\"M10057\">银河互动</option><option value=\"M10012\">赤焰互娱</option></select></label>" +
              "<div class=\"control-filter-actions\"><button class=\"btn btn-primary\" type=\"button\" data-query>查询</button><button class=\"btn btn-outline\" type=\"button\" data-reset>重置</button></div>" +
              "<div class=\"control-page-actions\"><button class=\"btn btn-primary\" type=\"button\" data-add-control>新增点控</button><button class=\"btn btn-outline\" type=\"button\" data-cancel-all>一键取消</button></div>" +
            "</div>" +
            "<table class=\"control-table\">" +
              "<thead><tr>" +
                "<th class=\"col-player\">玩家ID</th><th class=\"col-start\">点控开始时间</th><th class=\"col-range\">点控范围</th><th class=\"col-type\">解除类型</th><th class=\"col-current\">当前</th><th class=\"col-rtp\">点控RTP</th><th class=\"col-threshold\">解除阈值</th><th class=\"col-history\">历史输赢</th><th class=\"col-control-type\">控制类型</th><th class=\"col-status\">状态</th><th class=\"col-operation\">操作</th>" +
              "</tr></thead><tbody></tbody>" +
            "</table>" +
            "<div id=\"controlModalHost\"></div>" +
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
        return;
      }
      if (event.target.closest("[data-add-control]")) {
        openAddModal();
        updateReleaseDescription();
        return;
      }
      var stepButton = event.target.closest("[data-step]");
      if (stepButton) {
        var input = document.getElementById(stepButton.getAttribute("data-step"));
        var next = Number(input.value || 0) + Number(stepButton.getAttribute("data-delta"));
        input.value = Math.max(0, next);
        return;
      }
      var winSwitch = event.target.closest("[data-win-switch]");
      if (winSwitch) {
        winSwitch.classList.toggle("is-win");
        winSwitch.querySelector("em").textContent = winSwitch.classList.contains("is-win") ? "输" : "赢";
        return;
      }
      if (event.target.classList.contains("game-filter-arrow")) {
        event.target.closest(".game-filter").classList.toggle("is-open");
        return;
      }
      if (!event.target.closest(".game-filter")) {
        var openFilter = app.querySelector(".game-filter.is-open");
        if (openFilter) openFilter.classList.remove("is-open");
      }
      if (event.target.classList.contains("game-filter-caret")) {
        event.target.classList.toggle("is-open");
        var brand = event.target.getAttribute("data-brand-toggle");
        if (brand) {
          app.querySelector("[data-brand-games='" + brand + "']").classList.toggle("is-collapsed");
        }
        if (event.target.getAttribute("data-type-toggle")) {
          Array.prototype.forEach.call(app.querySelectorAll("[data-brand-row], [data-brand-games]"), function(item) {
            item.classList.toggle("is-collapsed");
          });
        }
        return;
      }
      if (event.target.closest("[data-cancel-all]")) {
        openConfirmModal("cancelAll");
        return;
      }
      var del = event.target.closest("[data-delete]");
      if (del) {
        openConfirmModal("delete", del.getAttribute("data-delete"));
        return;
      }
      if (event.target.closest("[data-confirm-next]")) {
        renderConfirmStep(2);
        return;
      }
      if (event.target.closest("[data-confirm-back]")) {
        renderConfirmStep(1);
        return;
      }
      if (event.target.closest("[data-confirm-execute]")) {
        executeConfirmAction();
        return;
      }
      var rangeDetail = event.target.closest("[data-range-detail]");
      if (rangeDetail) {
        var row = rows[Number(rangeDetail.getAttribute("data-range-detail"))];
        openRangeModal(row);
        return;
      }
      var gameSearch = event.target.closest("[data-game-search]");
      if (gameSearch) {
        return;
      }
      if (event.target.closest("[data-modal-close]") || event.target.classList.contains("control-modal-mask")) {
        closeModal();
        return;
      }
      if (event.target.closest("[data-modal-save]")) {
        saveModal();
      }
    });
    app.addEventListener("change", function(event) {
      if (event.target.matches("input[name='modalRelease']")) {
        updateReleaseDescription();
        return;
      }
      if (event.target.matches("[data-game-all]")) {
        var checked = event.target.checked;
        if (checked) {
          Array.prototype.forEach.call(app.querySelectorAll("[data-game-value], [data-game-group]"), function(input) {
            input.checked = false;
            input.indeterminate = false;
          });
        }
        syncGamePickerText();
        return;
      }
      if (event.target.matches("[data-game-group='slot']")) {
        var slotChecked = event.target.checked;
        var all = app.querySelector("[data-game-all]");
        if (all) all.checked = false;
        Array.prototype.forEach.call(app.querySelectorAll("[data-game-value], [data-game-group]:not([data-game-group='slot'])"), function(input) {
          input.checked = slotChecked;
          input.indeterminate = false;
        });
        syncGamePickerText();
        return;
      }
      if (event.target.matches("[data-game-group]:not([data-game-group='slot'])")) {
        var brandKey = event.target.getAttribute("data-game-group");
        var allBox = app.querySelector("[data-game-all]");
        if (allBox) allBox.checked = false;
        Array.prototype.forEach.call(app.querySelectorAll("[data-brand-games='" + brandKey + "'] [data-game-value]"), function(input) {
          input.checked = event.target.checked;
        });
        syncGamePickerText();
        return;
      }
      if (event.target.matches("[data-game-value]")) {
        var allGame = app.querySelector("[data-game-all]");
        if (allGame) allGame.checked = false;
        syncGamePickerText();
      }
    });
    app.addEventListener("input", function(event) {
      if (event.target.matches(".game-filter-input")) {
        var keyword = event.target.value.trim().toLowerCase();
        Array.prototype.forEach.call(app.querySelectorAll(".game-filter-game"), function(row) {
          row.hidden = keyword && row.getAttribute("data-game-row").toLowerCase().indexOf(keyword) === -1;
        });
        event.target.closest(".game-filter").classList.add("is-open");
        return;
      }
      if (!event.target.matches("[data-game-search]")) return;
      var keyword = event.target.value.trim().toLowerCase();
      Array.prototype.forEach.call(app.querySelectorAll("[data-game-name]"), function(item) {
        item.hidden = keyword && item.getAttribute("data-game-name").toLowerCase().indexOf(keyword) === -1;
      });
    });
    app.addEventListener("focusin", function(event) {
      if (event.target.matches(".game-filter-input")) {
        event.target.closest(".game-filter").classList.add("is-open");
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
