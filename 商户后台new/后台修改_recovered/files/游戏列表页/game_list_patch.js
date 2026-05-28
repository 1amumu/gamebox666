(function() {
  var games = [
    { id: "10001", originId: "PG-001", name: "Fortune Tiger", brand: "PG", type: "Slot", rounds: 284920, rtp: 96.42, bet: 842360.50, created: "2026-04-01 10:20", updated: "2026-05-26 09:18", language: "中文/English", status: "启用", icon: "images/游戏列表页/game_icon.svg" },
    { id: "10002", originId: "PG-002", name: "Mahjong Ways", brand: "PG", type: "Slot", rounds: 221840, rtp: 95.86, bet: 691280.00, created: "2026-04-02 11:10", updated: "2026-05-25 18:32", language: "中文/English", status: "启用", icon: "images/游戏列表页/game_icon.svg" },
    { id: "20001", originId: "JL-101", name: "Mega Ace", brand: "JILI", type: "Slot", rounds: 198420, rtp: 96.12, bet: 592640.25, created: "2026-04-05 14:35", updated: "2026-05-24 16:42", language: "中文/English", status: "启用", icon: "images/游戏列表页/game_icon.svg" },
    { id: "20002", originId: "JL-102", name: "Boxing King", brand: "JILI", type: "Fishing", rounds: 96320, rtp: 94.78, bet: 318600.70, created: "2026-04-08 09:22", updated: "2026-05-23 12:16", language: "中文/English", status: "停用", icon: "images/游戏列表页/game_icon.svg" },
    { id: "30001", originId: "SP-201", name: "Aviator", brand: "SPRIBE", type: "Crash", rounds: 402860, rtp: 97.08, bet: 1286420.90, created: "2026-03-28 08:30", updated: "2026-05-26 10:02", language: "中文/English", status: "启用", icon: "images/游戏列表页/game_icon.svg" },
    { id: "40001", originId: "PP-301", name: "Sweet Bonanza", brand: "PP", type: "Slot", rounds: 174260, rtp: 96.51, bet: 496820.15, created: "2026-04-11 15:48", updated: "2026-05-22 19:26", language: "中文/English", status: "启用", icon: "images/游戏列表页/game_icon.svg" },
    { id: "40002", originId: "PP-302", name: "Gates of Olympus", brand: "PP", type: "Slot", rounds: 154900, rtp: 95.33, bet: 438120.30, created: "2026-04-13 16:25", updated: "2026-05-21 11:09", language: "中文/English", status: "启用", icon: "images/游戏列表页/game_icon.svg" },
    { id: "50001", originId: "GB-501", name: "Crash Rocket", brand: "GB", type: "Crash", rounds: 132780, rtp: 96.04, bet: 365900.00, created: "2026-04-16 13:40", updated: "2026-05-20 15:34", language: "中文/English", status: "启用", icon: "images/游戏列表页/game_icon.svg" },
    { id: "50002", originId: "GB-502", name: "Lucky Dice", brand: "GB", type: "Table", rounds: 74230, rtp: 94.95, bet: 198260.40, created: "2026-04-18 10:12", updated: "2026-05-19 14:06", language: "中文/English", status: "停用", icon: "images/游戏列表页/game_icon.svg" }
  ];

  var brandTabs = ["全部", "SPRIBE", "JILI", "PG", "PP"];
  var activeBrand = "全部";

  function money(value) {
    return Number(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function pageTabs() {
    var files = ["商户列表.html", "创建商户.html", "游戏列表页.html"];
    return files.map(function(file) {
      var active = file === "游戏列表页.html" ? " is-active" : "";
      return "<button type=\"button\" class=\"codex-page-tab" + active + "\" data-tab-file=\"" + file + "\"><span class=\"codex-page-tab-dot\"></span><span class=\"codex-page-tab-title\">" + file.replace(".html", "") + "</span><span class=\"codex-page-tab-close\">×</span></button>";
    }).join("");
  }

  function statsHtml() {
    return brandTabs.map(function(brand) {
      var rows = brand === "全部" ? games : games.filter(function(row) { return row.brand === brand; });
      var active = brand === activeBrand ? " is-active" : "";
      return "<button type=\"button\" class=\"game-list-stat" + active + "\" data-brand=\"" + brand + "\"><strong>" + brand + "</strong><span>" + rows.length + "款游戏</span></button>";
    }).join("");
  }

  function rowHtml(row) {
    return "<tr data-id=\"" + row.id + "\">" +
      "<td>" + row.id + "</td>" +
      "<td>" + row.originId + "</td>" +
      "<td class=\"is-left\"><div class=\"game-name-cell\"><img src=\"" + row.icon + "\" alt=\"\"><strong>" + row.name + "</strong></div></td>" +
      "<td>" + row.brand + "</td>" +
      "<td>" + row.type + "</td>" +
      "<td>" + row.rounds.toLocaleString("en-US") + "</td>" +
      "<td>" + row.rtp.toFixed(2) + "%</td>" +
      "<td>" + money(row.bet) + "</td>" +
      "<td>" + row.created + "</td>" +
      "<td>" + row.updated + "</td>" +
      "<td><div class=\"game-list-actions\"><button type=\"button\" data-action=\"edit\">编辑</button><button type=\"button\" data-action=\"language\">语言</button></div></td>" +
    "</tr>";
  }

  function filteredRows(page) {
    var keyword = page.querySelector("[data-filter='keyword']").value.trim().toLowerCase();
    var origin = page.querySelector("[data-filter='origin']").value.trim().toLowerCase();
    var type = page.querySelector("[data-filter='type']").value;
    return games.filter(function(row) {
      return (activeBrand === "全部" || row.brand === activeBrand) &&
        (!keyword || row.name.toLowerCase().indexOf(keyword) !== -1 || row.id.indexOf(keyword) !== -1) &&
        (!origin || row.originId.toLowerCase().indexOf(origin) !== -1) &&
        (!type || row.type === type);
    });
  }

  function render(page) {
    page.querySelector(".game-list-stats").innerHTML = statsHtml();
    page.querySelector("tbody").innerHTML = filteredRows(page).map(rowHtml).join("");
  }

  function languageRows(row) {
    var values = [
      ["en-英语", "Aviator飞机"],
      ["zh-简体中文", row && row.name ? row.name : "飞行员"],
      ["zt-繁体中文", ""],
      ["es-西班牙语", ""],
      ["vi-越南语", ""],
      ["it-意大利语", ""],
      ["da-丹麦语", ""],
      ["fi-芬兰语", ""],
      ["fr-法语", ""],
      ["ms-马来语", ""],
      ["nl-荷兰语", ""],
      ["nb-挪威语", ""],
      ["pl-波兰语", ""],
      ["pt-葡萄牙语", ""],
      ["th-泰语", ""],
      ["tr-土耳其语", ""]
    ];
    return values.map(function(item, index) {
      var checked = index === 1 ? " checked" : "";
      var placeholder = item[1] ? "" : " placeholder=\"请输入游戏名称\"";
      return "<div class=\"game-language-row\">" +
        "<div class=\"game-language-code\">" + item[0] + "</div>" +
        "<div class=\"game-language-input\"><input value=\"" + item[1] + "\"" + placeholder + "></div>" +
        "<label class=\"game-language-default\"><input type=\"radio\" name=\"gameLanguageDefault\"" + checked + "><span>设为默认</span></label>" +
      "</div>";
    }).join("");
  }

  function option(value, current) {
    return "<option" + (value === current ? " selected" : "") + ">" + value + "</option>";
  }

  function gameInfoModal(row, isEdit) {
    var data = row || {};
    var idValue = isEdit ? data.id : "";
    var nameValue = isEdit ? data.name : "";
    var brandValue = isEdit ? data.brand : "";
    var typeValue = isEdit ? data.type : "Slots";
    var originValue = isEdit ? data.originId : "";
    var rtpValue = isEdit ? Number(data.rtp || 97).toFixed(0) : "97";
    var homeUrl = isEdit ? "https://games.example.com/" + data.id : "";
    var configValue = isEdit ? "{\"rtp\":" + Number(data.rtp || 97).toFixed(2) + ",\"brand\":\"" + data.brand + "\"}" : "";
    var saveAttr = isEdit ? " data-save-edit=\"" + data.id + "\"" : " data-save-add";
    return "<div class=\"game-list-modal-panel game-info-modal\"><div class=\"game-info-tabs\"><button type=\"button\" class=\"is-active\" data-info-tab=\"base\">游戏信息</button><button type=\"button\" data-info-tab=\"config\">下注配置</button><button class=\"game-info-close\" type=\"button\" data-close>×</button></div>" +
      "<div class=\"game-list-modal-body game-info-body\"><div class=\"game-info-pane is-active\" data-info-pane=\"base\">" +
        "<div class=\"game-info-row\"><div class=\"game-info-label\">启用状态</div><div class=\"game-info-control\"><label class=\"game-info-switch\"><input type=\"checkbox\" data-info=\"status\"" + (data.status === "停用" ? "" : " checked") + "><span></span><em>启用</em></label></div></div>" +
        "<div class=\"game-info-row\"><div class=\"game-info-label is-required\">游戏ID</div><div class=\"game-info-control\"><input data-info=\"id\" value=\"" + idValue + "\" placeholder=\"请输入游戏ID\"></div></div>" +
        "<div class=\"game-info-row\"><div class=\"game-info-label is-required\">游戏名称</div><div class=\"game-info-control\"><input data-info=\"name\" value=\"" + nameValue + "\" placeholder=\"请输入游戏名称\"></div></div>" +
        "<div class=\"game-info-row\"><div class=\"game-info-label is-required\">游戏厂商</div><div class=\"game-info-control\"><select data-info=\"brand\"><option value=\"\">请选择</option>" + option("PG", brandValue) + option("JILI", brandValue) + option("SPRIBE", brandValue) + option("PP", brandValue) + option("GB", brandValue) + "</select></div></div>" +
        "<div class=\"game-info-row\"><div class=\"game-info-label is-required\">游戏类型</div><div class=\"game-info-control\"><select data-info=\"type\">" + option("Slots", typeValue) + option("Crash", typeValue) + option("Fishing", typeValue) + option("Table", typeValue) + "</select></div></div>" +
        "<div class=\"game-info-row\"><div class=\"game-info-label is-required\">局号类型</div><div class=\"game-info-control\"><select data-info=\"roundType\"><option>无局号</option><option>平台局号</option><option>厂商局号</option></select></div></div>" +
        "<div class=\"game-info-row\"><div class=\"game-info-label is-required\">RTP</div><div class=\"game-info-control\"><div class=\"game-rtp-stepper\"><button type=\"button\" data-rtp-minus>-</button><input data-info=\"rtp\" value=\"" + rtpValue + "\"><span>%</span><button type=\"button\" data-rtp-plus>+</button></div></div></div>" +
        "<div class=\"game-info-row game-info-icon-row\"><div class=\"game-info-label is-required\">游戏图标</div><div class=\"game-info-control\"><label class=\"game-icon-upload\"><img src=\"" + (data.icon || "images/游戏列表页/game_icon.svg") + "\" alt=\"\"><span>+</span><input type=\"file\" accept=\"image/*\"></label></div></div>" +
        "<div class=\"game-info-row\"><div class=\"game-info-label\">原始id</div><div class=\"game-info-control is-wide\"><input data-info=\"originId\" value=\"" + originValue + "\" placeholder=\"请输入\"></div></div>" +
        "<div class=\"game-info-row\"><div class=\"game-info-label\">模板url</div><div class=\"game-info-control\"><label class=\"game-info-switch is-red\"><input type=\"checkbox\" data-info=\"templateUrl\"><span></span><em>否</em></label></div></div>" +
        "<div class=\"game-info-row\"><div class=\"game-info-label\">排名统计</div><div class=\"game-info-control\"><label class=\"game-info-switch is-red\"><input type=\"checkbox\" data-info=\"ranking\"><span></span><em>否</em></label></div></div>" +
        "<div class=\"game-info-row\"><div class=\"game-info-label is-required\">游戏主页url</div><div class=\"game-info-control is-wide\"><input data-info=\"homeUrl\" value=\"" + homeUrl + "\" placeholder=\"请输入\"></div></div>" +
      "</div><div class=\"game-info-pane game-info-config-pane\" data-info-pane=\"config\"><textarea data-info=\"config\" placeholder=\"请输入下注配置\">" + configValue + "</textarea></div>" +
      "</div><div class=\"game-list-modal-foot\"><button type=\"button\" data-close>取消</button><button type=\"button\" class=\"is-primary\"" + saveAttr + ">确定</button></div></div>";
  }

  function modalHtml(kind, row) {
    if (kind === "add") {
      return gameInfoModal(null, false);
    }
    if (kind === "language") {
      return "<div class=\"game-list-modal-panel game-language-modal\"><div class=\"game-list-modal-head\"><h2>维护语言</h2><button type=\"button\" data-close>×</button></div><div class=\"game-list-modal-body game-language-body\"><div class=\"game-language-table\">" +
        languageRows(row) +
      "</div></div><div class=\"game-list-modal-foot\"><button type=\"button\" data-close>取消</button><button type=\"button\" class=\"is-primary\" data-close>确定</button></div></div>";
    }
    return gameInfoModal(row, true);
  }

  function showModal(kind, row) {
    var modal = document.querySelector(".game-list-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.className = "game-list-modal";
      document.body.appendChild(modal);
    }
    modal.innerHTML = modalHtml(kind, row || {});
    modal.hidden = false;
  }

  function hideLegacy() {
    Array.prototype.forEach.call(document.querySelectorAll(".game-list-page, .game-list-modal"), function(node) {
      node.remove();
    });
    for (var id = 2210; id <= 2263; id += 1) {
      var node = document.getElementById("u" + id);
      if (node) node.style.display = "none";
    }
  }

  function buildPage() {
    if (!document.getElementById("base")) return;
    hideLegacy();
    var page = document.createElement("div");
    page.className = "game-list-page";
    page.innerHTML =
      "<div class=\"game-list-titlebar\"><h1>游戏列表</h1></div>" +
      "<div class=\"codex-page-tabs game-list-tabs\">" + pageTabs() + "</div>" +
      "<div class=\"game-list-stats\"></div>" +
      "<div class=\"game-list-filters\">" +
        "<label><span>游戏名称ID</span><input data-filter=\"keyword\" placeholder=\"请输入游戏名称或ID\"></label>" +
        "<label><span>游戏原始ID</span><input data-filter=\"origin\" placeholder=\"请输入原始ID\"></label>" +
        "<label><span>游戏类型</span><select data-filter=\"type\"><option value=\"\">全部</option><option>Slot</option><option>Crash</option><option>Fishing</option><option>Table</option></select></label>" +
        "<div class=\"game-list-filter-actions\"><button type=\"button\" data-action=\"reset\">重置</button><button type=\"button\" class=\"is-primary\" data-action=\"query\">查询</button></div>" +
        "<div class=\"game-list-create-action\"><button type=\"button\" data-action=\"add\">新增游戏</button></div>" +
      "</div>" +
      "<div class=\"game-list-note\">默认显示所有商户所有游戏的数据之和。游戏局数为游戏运行局数，下注金额按当地货币换算为美元，RTP = 中奖金额 / 下注金额 * 100%。</div>" +
      "<div class=\"game-list-table-card\"><table class=\"game-list-table\"><thead><tr><th>ID</th><th>原始ID</th><th>游戏名称</th><th>游戏厂商</th><th>游戏类型</th><th>游戏局数</th><th>RTP</th><th>下注金额(美元)</th><th>创建时间</th><th>更新时间</th><th>操作</th></tr></thead><tbody></tbody></table></div>";
    document.body.appendChild(page);
    render(page);

    page.addEventListener("click", function(event) {
      var close = event.target.closest(".codex-page-tab-close");
      if (close) {
        event.stopPropagation();
        close.closest(".codex-page-tab").remove();
        return;
      }
      var tab = event.target.closest("[data-tab-file]");
      if (tab) {
        var file = tab.getAttribute("data-tab-file");
        if (file !== "游戏列表页.html") window.top.location.hash = encodeURIComponent(file);
        return;
      }
      var brand = event.target.closest("[data-brand]");
      if (brand) {
        activeBrand = brand.getAttribute("data-brand");
        render(page);
        return;
      }
      var action = event.target.closest("[data-action]");
      if (!action) return;
      var type = action.getAttribute("data-action");
      if (type === "reset") {
        page.querySelector("[data-filter='keyword']").value = "";
        page.querySelector("[data-filter='origin']").value = "";
        page.querySelector("[data-filter='type']").value = "";
        activeBrand = "全部";
        render(page);
      }
      if (type === "query") render(page);
      if (type === "add") showModal("add");
      if (type === "edit" || type === "language") {
        var id = action.closest("tr").getAttribute("data-id");
        var row = games.filter(function(item) { return item.id === id; })[0];
        showModal(type, row);
      }
    });

    page.addEventListener("input", function(event) {
      if (event.target.matches("[data-filter]")) render(page);
    });
    page.addEventListener("change", function(event) {
      if (event.target.matches("[data-filter]")) render(page);
    });
  }

  document.addEventListener("click", function(event) {
    var modal = document.querySelector(".game-list-modal");
    if (!modal || modal.hidden) return;
    if (event.target === modal || event.target.closest("[data-close]")) {
      modal.hidden = true;
      return;
    }
    var infoTab = event.target.closest("[data-info-tab]");
    if (infoTab) {
      var tabName = infoTab.getAttribute("data-info-tab");
      Array.prototype.forEach.call(modal.querySelectorAll("[data-info-tab]"), function(tab) {
        tab.classList.toggle("is-active", tab === infoTab);
      });
      Array.prototype.forEach.call(modal.querySelectorAll("[data-info-pane]"), function(pane) {
        pane.classList.toggle("is-active", pane.getAttribute("data-info-pane") === tabName);
      });
      return;
    }
    var rtpInput = modal.querySelector("[data-info='rtp']");
    if (event.target.closest("[data-rtp-minus]") && rtpInput) {
      rtpInput.value = String(Math.max(0, Number(rtpInput.value || 0) - 1));
      return;
    }
    if (event.target.closest("[data-rtp-plus]") && rtpInput) {
      rtpInput.value = String(Math.min(100, Number(rtpInput.value || 0) + 1));
      return;
    }
    var saveEdit = event.target.closest("[data-save-edit]");
    if (saveEdit) {
      var id = saveEdit.getAttribute("data-save-edit");
      var row = games.filter(function(item) { return item.id === id; })[0];
      if (row) {
        row.id = modal.querySelector("[data-info='id']").value || row.id;
        row.name = modal.querySelector("[data-info='name']").value || row.name;
        row.brand = modal.querySelector("[data-info='brand']").value || row.brand;
        row.type = modal.querySelector("[data-info='type']").value || row.type;
        row.originId = modal.querySelector("[data-info='originId']").value || row.originId;
        row.rtp = Number(modal.querySelector("[data-info='rtp']").value) || row.rtp;
        row.status = modal.querySelector("[data-info='status']").checked ? "启用" : "停用";
        row.updated = "2026-05-26 15:20";
      }
      modal.hidden = true;
      var page = document.querySelector(".game-list-page");
      if (page) render(page);
    }
    if (event.target.closest("[data-save-add]")) {
      var nextId = modal.querySelector("[data-info='id']").value || String(60000 + games.length + 1);
      games.unshift({
        id: nextId,
        originId: modal.querySelector("[data-info='originId']").value || "NEW-" + nextId,
        name: modal.querySelector("[data-info='name']").value || "New Game",
        brand: modal.querySelector("[data-info='brand']").value || "PG",
        type: modal.querySelector("[data-info='type']").value || "Slots",
        rounds: 0,
        rtp: Number(modal.querySelector("[data-info='rtp']").value) || 97,
        icon: "images/游戏列表页/game_icon.svg",
        bet: 0,
        created: "2026-05-26 15:20",
        updated: "2026-05-26 15:20",
        language: "中文/English",
        status: modal.querySelector("[data-info='status']").checked ? "启用" : "停用"
      });
      modal.hidden = true;
      var pageAdd = document.querySelector(".game-list-page");
      if (pageAdd) render(pageAdd);
    }
  });

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", buildPage);
  else buildPage();
})();
