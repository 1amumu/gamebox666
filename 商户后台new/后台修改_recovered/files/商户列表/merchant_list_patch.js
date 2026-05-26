(function() {
  var merchants = [
    { id: "M10001", name: "印度运营商", type: "预充值商户", wallet: "TZ3AM4JjEDEnaGa8tHTG5Y9Gf5PhbYMn1Q", authAmount: 300000, balance: 286420.5, settled: 124880.34, pending: 0, month: 48290.8, gameStatus: "启用", disabled: "否", rate: { base: 3.0, pg: 3.0, jili: 3.0, spribe: 3.0, evo: 3.0, aviator: 2.8, chilli: 3.2, mahjong: 3.1, roulette: 3.5 }, brands: ["JILI", "PG", "SPRIBE"], games: ["Aviator", "火热辣椒", "麻将胡了"] },
    { id: "M10002", name: "孟买主站", type: "月结商户", wallet: "TY8Wk2LLC9QzMzTjZ3gQZ3NMPvWbLKz9Rc", authAmount: 0, balance: 0, settled: 96840.72, pending: 12660.5, month: 36180.0, gameStatus: "启用", disabled: "否", rate: { base: 3.0, pg: 3.0, jili: 3.0, spribe: 2.6, evo: 3.4, aviator: 2.6, chilli: 3.0, mahjong: 3.0, roulette: 3.4 }, brands: ["JILI", "PG"], games: ["火热辣椒", "发财树"] },
    { id: "M10003", name: "班加罗尔站", type: "预充值商户", wallet: "TR4Pg5FxHh6kYdC9XbeM76oVgXwXmXy7S8", authAmount: 120000, balance: 92360.8, settled: 58320.16, pending: 0, month: 18920.2, gameStatus: "停用", disabled: "否", rate: { base: 3.5, pg: 3.6, jili: 3.5, spribe: 3.0, evo: 3.8, aviator: 3.0, chilli: 3.6, mahjong: 3.6, roulette: 3.8 }, brands: ["PG", "EVOLUTION"], games: ["麻将胡了", "Mini Roulette"] },
    { id: "M20001", name: "圣保罗主站", type: "月结商户", wallet: "TC8CyW2nL6urVfow3EFST3HV9Te12hxqA5", authAmount: 0, balance: 0, settled: 108620.45, pending: 15180.4, month: 40260.5, gameStatus: "启用", disabled: "否", rate: { base: 2.8, pg: 3.1, jili: 3.1, spribe: 2.5, evo: 3.0, aviator: 2.5, chilli: 3.1, mahjong: 3.1, roulette: 3.0 }, brands: ["JILI", "SPRIBE", "EVOLUTION"], games: ["Aviator", "丛林之王", "Mini Roulette"] },
    { id: "M20002", name: "里约站", type: "预充值商户", wallet: "TK8ys1NkbW3GePGVBiRoHNtNWuPjw3JmJn", authAmount: 90000, balance: 76420.2, settled: 42680.9, pending: 0, month: 14680.6, gameStatus: "启用", disabled: "是", rate: { base: 3.2, pg: 3.3, jili: 3.3, spribe: 2.9, evo: 3.6, aviator: 2.9, chilli: 3.3, mahjong: 3.3, roulette: 3.6 }, brands: ["JILI"], games: ["火热辣椒"] },
    { id: "M30001", name: "马尼拉站", type: "预充值商户", wallet: "TP52oSgLZ1Kc5R4E4MFFxYoD31MoK77Fwb", authAmount: 150000, balance: 128600.4, settled: 69820.2, pending: 0, month: 22640.3, gameStatus: "启用", disabled: "否", rate: { base: 3.0, pg: 3.2, jili: 3.2, spribe: 2.8, evo: 3.5, aviator: 2.8, chilli: 3.2, mahjong: 3.2, roulette: 3.5 }, brands: ["JILI", "PG", "EVOLUTION"], games: ["发财树", "赏金女王", "Lightning Dice"] },
    { id: "M30002", name: "雅加达站", type: "月结商户", wallet: "TU7PcNoerYtT3fqGAcEHrhskTt1d5iZp2r", authAmount: 0, balance: 0, settled: 73550.8, pending: 10340.5, month: 28570.0, gameStatus: "停用", disabled: "否", rate: { base: 3.4, pg: 3.5, jili: 3.5, spribe: 3.1, evo: 3.8, aviator: 3.1, chilli: 3.5, mahjong: 3.5, roulette: 3.8 }, brands: ["PG", "SPRIBE"], games: ["Aviator", "麻将胡了"] }
  ];

  var brandOptions = ["GameBox", "SPRIBE", "PG", "PP", "JILI", "TADA", "InOut"];
  var gameOptions = ["Aviator", "火热辣椒", "发财树", "麻将胡了", "赏金女王", "Mini Roulette", "Lightning Dice", "丛林之王"];
  var rateGameOptions = [
    { id: "1001", name: "飞机", key: "aviator" },
    { id: "1002", name: "绿魔", key: "roulette" },
    { id: "1003", name: "火热辣椒", key: "chilli" },
    { id: "1004", name: "麻将胡了", key: "mahjong" },
    { id: "1005", name: "发财树", key: "fortune-tree" },
    { id: "1006", name: "赏金女王", key: "bounty-queen" },
    { id: "1007", name: "Aviator", key: "spribe-aviator" },
    { id: "1008", name: "Mini Roulette", key: "mini-roulette" },
    { id: "1009", name: "Lightning Dice", key: "lightning-dice" },
    { id: "1010", name: "丛林之王", key: "jungle-king" }
  ];

  function money(value) {
    return Number(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function statusClass(value) {
    if (value === "启用" || value === "否") return "is-on";
    return "is-off";
  }

  function findMerchant(id) {
    return merchants.filter(function(row) { return row.id === id; })[0];
  }

  function normalizeMerchant(row) {
    if (row.type === "月结商户") row.balance = 0;
    if (row.type === "预充值商户") row.pending = 0;
  }

  function hydrateMerchant(row) {
    row.account = row.account || row.id.toLowerCase();
    row.apiKey = row.apiKey || "6btokgt11ujnnv7yrma806vvou0l7r83";
    row.country = row.country || "印度";
    row.timezone = row.timezone || "+05:30";
    row.walletType = row.walletType || "单一钱包";
    row.currency = row.currency || "USD";
    row.contactName = row.contactName || "";
    row.contactValue = row.contactValue || "";
    row.chatId = row.chatId || "";
    row.playerApi = row.playerApi || "http://42.51.44.28:8017/api/NewClient/GetPlayer";
    row.balanceApi = row.balanceApi || "http://42.51.44.28:8017/api/NewClient/GetBalance";
    row.changeApi = row.changeApi || "http://42.51.44.28:8017/api/NewClient/ChangeBalance";
    row.brandConfig = row.brandConfig || {};
    return row;
  }

  function switchHtml(row, field) {
    var active = field === "gameStatus" ? row.gameStatus === "启用" : row.disabled === "是";
    var text = field === "gameStatus" ? row.gameStatus : (row.disabled === "是" ? "禁用" : "启用");
    var danger = field === "disabled" && row.disabled === "是" ? " is-danger" : "";
    return "<button type=\"button\" class=\"merchant-switch " + (active ? "is-active" : "") + danger + "\" data-switch=\"" + field + "\" data-id=\"" + row.id + "\"><span></span><em>" + text + "</em></button>";
  }

  function rowHtml(row) {
    normalizeMerchant(row);
    return "<tr>" +
      "<td>" + row.id + "</td>" +
      "<td>" + row.name + "</td>" +
      "<td><span class=\"merchant-type\">" + row.type + "</span></td>" +
      "<td>" + money(row.balance) + "</td>" +
      "<td>" + money(row.settled) + "</td>" +
      "<td>" + money(row.pending) + "</td>" +
      "<td>" + money(row.month) + "</td>" +
      "<td>" + switchHtml(row, "gameStatus") + "</td>" +
      "<td>" + switchHtml(row, "disabled") + "</td>" +
      "<td><div class=\"merchant-row-actions\"><button type=\"button\" data-row-action=\"edit\" data-id=\"" + row.id + "\">编辑</button><button type=\"button\" data-row-action=\"rate\" data-id=\"" + row.id + "\">费率</button><button type=\"button\" data-row-action=\"brand\" data-id=\"" + row.id + "\">品牌</button></div></td>" +
    "</tr>";
  }

  function ensureModal(page) {
    var modal = document.querySelector(".merchant-modal");
    if (modal) return modal;

    modal = document.createElement("div");
    modal.className = "merchant-modal";
    modal.hidden = true;
    modal.innerHTML = "<div class=\"merchant-modal-panel\"><div class=\"merchant-modal-head\"><h2></h2><button type=\"button\" data-modal-close>×</button></div><div class=\"merchant-modal-body\"></div><div class=\"merchant-modal-foot\"></div></div>";
    document.body.appendChild(modal);

    modal.addEventListener("click", function(event) {
      if (event.target === modal || event.target.closest("[data-modal-close]")) {
        modal.hidden = true;
      }
      if (event.target.closest("[data-modal-cancel]")) {
        modal.hidden = true;
      }
      if (event.target.closest("[data-confirm-switch]")) {
        var row = findMerchant(modal.getAttribute("data-id"));
        var field = modal.getAttribute("data-field");
        if (row && field === "gameStatus") row.gameStatus = row.gameStatus === "启用" ? "停用" : "启用";
        if (row && field === "disabled") row.disabled = row.disabled === "是" ? "否" : "是";
        modal.hidden = true;
        renderRows(page);
      }
      if (event.target.closest("[data-save-edit]")) {
        saveEditModal(page, modal);
      }
      if (event.target.closest("[data-save-rate]")) {
        saveRateModal(page, modal);
      }
      var removeRateGame = event.target.closest("[data-rate-remove-game]");
      if (removeRateGame) {
        var item = removeRateGame.closest("[data-rate-game]");
        if (item) item.remove();
      }
      if (event.target.closest("[data-rate-add-game]")) {
        addRateGame(modal);
      }
      var rateOption = event.target.closest("[data-rate-game-option]");
      if (rateOption) {
        selectRateGame(modal, rateOption.getAttribute("data-rate-game-option"));
      }
      if (event.target.closest("[data-save-brand]")) {
        saveBrandModal(page, modal);
      }
      var brandTab = event.target.closest("[data-brand-tab]");
      if (brandTab) {
        saveCurrentBrandDraft(modal);
        modal.setAttribute("data-brand-current", brandTab.getAttribute("data-brand-tab"));
        syncBrandModal(modal);
      }
      var removeGame = event.target.closest("[data-remove-game]");
      if (removeGame) {
        var chip = removeGame.closest("[data-game-chip]");
        if (chip) chip.remove();
      }
      if (event.target.closest("[data-add-game]")) {
        addGameToModal(modal);
      }
    });
    modal.addEventListener("change", function(event) {
      if (event.target.matches("[data-edit='enabled']")) {
        event.target.parentElement.querySelector("em").textContent = event.target.checked ? "启用" : "停用";
      }
    });
    modal.addEventListener("input", function(event) {
      if (event.target.matches("[data-rate]")) {
        clearRateError(event.target);
      }
      if (event.target.matches("[data-rate-game-search]")) {
        renderRateGameDropdown(modal);
      }
    });
    modal.addEventListener("focusin", function(event) {
      if (event.target.matches("[data-rate-game-search]")) {
        renderRateGameDropdown(modal);
      }
    });

    return modal;
  }

  function addGameToModal(modal) {
    var input = modal.querySelector("[data-game-search]");
    var result = modal.querySelector(".merchant-add-result");
    if (!input) return;
    var keyword = input.value.trim().toLowerCase();
    var game = gameOptions.filter(function(item) {
      return item.toLowerCase().indexOf(keyword) !== -1;
    })[0];
    if (!game) {
      result.textContent = "未找到对应游戏";
      result.className = "merchant-add-result is-error";
      return;
    }
    if (modal.querySelector("[data-game-chip='" + game + "']")) {
      result.textContent = game + "已添加";
      result.className = "merchant-add-result";
      return;
    }
    var list = modal.querySelector(".merchant-game-list");
    var item = document.createElement("div");
    item.className = "merchant-game-chip";
    item.setAttribute("data-game-chip", game);
    item.innerHTML = "<span>" + game + "</span><button type=\"button\" data-remove-game=\"" + game + "\">删除</button>";
    list.appendChild(item);
    input.value = "";
    result.textContent = game + "已添加";
    result.className = "merchant-add-result";
  }

  function addRateGame(modal) {
    var input = modal.querySelector("[data-rate-game-search]");
    if (!input) return;
    var key = input.getAttribute("data-selected-rate-game");
    var game = findRateGame(key);
    if (!game) {
      renderRateAddMessage(modal, "请先在下拉列表中选择游戏", true);
      renderRateGameDropdown(modal);
      return;
    }
    if (modal.querySelector("[data-rate-game='" + game.key + "']")) {
      renderRateAddMessage(modal, game.name + "已添加", true);
      return;
    }
    var grid = modal.querySelector(".merchant-rate-grid-games");
    var item = document.createElement("div");
    item.className = "merchant-rate-game-item";
    item.setAttribute("data-rate-game", game.key);
    item.innerHTML = "<span>" + game.name + "<small>ID:" + game.id + "</small></span><input data-rate=\"" + game.key + "\" value=\"3.0\"><em>%</em><button type=\"button\" data-rate-remove-game=\"" + game.key + "\">删除</button>";
    grid.appendChild(item);
    input.value = "";
    input.removeAttribute("data-selected-rate-game");
    renderRateGameDropdown(modal, []);
    renderRateAddMessage(modal, "", false);
  }

  function findRateGame(key) {
    return rateGameOptions.filter(function(item) { return item.key === key; })[0];
  }

  function selectRateGame(modal, key) {
    var game = findRateGame(key);
    var input = modal.querySelector("[data-rate-game-search]");
    if (!game || !input) return;
    input.value = game.name + "  ID:" + game.id;
    input.setAttribute("data-selected-rate-game", game.key);
    renderRateGameDropdown(modal, []);
    renderRateAddMessage(modal, "", false);
  }

  function renderRateGameDropdown(modal, list) {
    var input = modal.querySelector("[data-rate-game-search]");
    var panel = modal.querySelector("[data-rate-game-dropdown]");
    if (!input || !panel) return;
    if (!Array.isArray(list)) input.removeAttribute("data-selected-rate-game");
    var keyword = input.value.trim().toLowerCase();
    var options = Array.isArray(list) ? list : rateGameOptions.filter(function(item) {
      return !modal.querySelector("[data-rate-game='" + item.key + "']") &&
        (keyword === "" || item.name.toLowerCase().indexOf(keyword) !== -1 || item.id.indexOf(keyword) !== -1);
    }).slice(0, 8);
    if (!options.length) {
      panel.hidden = true;
      panel.innerHTML = "";
      return;
    }
    panel.hidden = false;
    panel.innerHTML = options.map(function(item) {
      return "<button type=\"button\" data-rate-game-option=\"" + item.key + "\"><span>" + item.name + "</span><em>ID:" + item.id + "</em></button>";
    }).join("");
  }

  function renderRateAddMessage(modal, text, isError) {
    var message = modal.querySelector("[data-rate-add-message]");
    if (!message) return;
    message.textContent = text || "";
    message.className = "merchant-rate-add-message" + (isError ? " is-error" : "");
  }

  function openModal(page, title, body, footer) {
    var modal = ensureModal(page);
    modal.removeAttribute("data-kind");
    modal.querySelector("h2").textContent = title;
    modal.querySelector(".merchant-modal-body").innerHTML = body;
    modal.querySelector(".merchant-modal-foot").innerHTML = footer;
    modal.hidden = false;
    return modal;
  }

  function openSwitchConfirm(page, id, field) {
    var row = findMerchant(id);
    if (!row) return;
    var next = field === "gameStatus" ? (row.gameStatus === "启用" ? "停用" : "启用") : (row.disabled === "是" ? "启用" : "禁用");
    var title = field === "gameStatus" ? "修改游戏状态" : "修改商户状态";
    var desc = "";
    if (field === "gameStatus") {
      desc = next === "停用" ? "游戏状态关闭后，商户的游戏无法登录。" : "游戏状态启用后，商户的游戏可以正常登录。";
    } else {
      desc = next === "禁用" ? "商户禁用以后，该商户就无法登录后台了。" : "商户启用以后，该商户可以正常登录后台。";
    }
    var body = "<p class=\"merchant-confirm-text\">确定将 <strong>" + row.name + " " + row.id + "</strong> 修改为 <strong>" + next + "</strong> 吗？</p><p class=\"merchant-confirm-desc\">" + desc + "</p>";
    var modal = openModal(page, title, body, "<button type=\"button\" data-modal-cancel>取消</button><button type=\"button\" class=\"is-primary\" data-confirm-switch>确定</button>");
    modal.setAttribute("data-id", id);
    modal.setAttribute("data-field", field);
  }

  function openEditModal(page, id) {
    var row = hydrateMerchant(findMerchant(id));
    if (!row) return;
    var enabled = row.disabled !== "是";
    var gameEnabled = row.gameStatus === "启用";
    var body =
      "<div class=\"merchant-edit-table\">" +
        editRow("状态", "<div class=\"merchant-edit-status-group\"><div class=\"merchant-edit-status-item\"><b>商户状态</b><label class=\"merchant-edit-switch\"><input type=\"checkbox\" data-edit=\"enabled\"" + (enabled ? " checked" : "") + "><span></span><em>" + (enabled ? "启用" : "停用") + "</em></label></div><div class=\"merchant-edit-status-item\"><b>游戏状态</b><label class=\"merchant-edit-switch\"><input type=\"checkbox\" data-edit=\"gameEnabled\"" + (gameEnabled ? " checked" : "") + "><span></span><em>" + (gameEnabled ? "启用" : "停用") + "</em></label></div></div>") +
        editRow("商户名称", "<input data-edit=\"name\" value=\"" + row.name + "\">") +
        editRow("商户账号", "<input data-edit=\"account\" value=\"" + row.account + "\" disabled>") +
        editRow("商户密码", "<button type=\"button\" class=\"merchant-reset-password\">重置</button>") +
        editRow("商户API密匙", "<span class=\"merchant-readonly-text\">" + row.apiKey + "</span>") +
        editRow("国家名称", "<input data-edit=\"country\" value=\"" + row.country + "\" disabled>") +
        editRow("时区", "<select data-edit=\"timezone\" disabled><option>" + row.timezone + "</option></select>") +
        editRow("钱包类型", "<select data-edit=\"walletType\" disabled><option>" + row.walletType + "</option></select>") +
        editRow("商户币种", "<select data-edit=\"currency\" disabled><option>" + row.currency + "</option></select>") +
        editRow("联系方式", "<div class=\"merchant-contact-fields\"><input data-edit=\"contactName\" placeholder=\"请输入联系人姓名\" value=\"" + row.contactName + "\"><input data-edit=\"contactValue\" placeholder=\"请输入联系方式\" value=\"" + row.contactValue + "\"></div>") +
        editRow("告警ChatId", "<input data-edit=\"chatId\" placeholder=\"请输入\" value=\"" + row.chatId + "\">") +
        editRow("获取玩家信息接口地址", "<input data-edit=\"playerApi\" value=\"" + row.playerApi + "\">") +
        editRow("获取玩家余额接口地址", "<input data-edit=\"balanceApi\" value=\"" + row.balanceApi + "\">") +
        editRow("获取变更余额接口地址", "<input data-edit=\"changeApi\" value=\"" + row.changeApi + "\">") +
        editRow("钱包地址", "<span class=\"merchant-readonly-text\">" + row.wallet + "</span>") +
        editRow("商户类型", "<div class=\"merchant-type-choice is-inline\"><label><input type=\"radio\" name=\"merchantType\" value=\"预充值商户\"" + (row.type === "预充值商户" ? " checked" : "") + "><span>预充值商户</span></label><label><input type=\"radio\" name=\"merchantType\" value=\"月结商户\"" + (row.type === "月结商户" ? " checked" : "") + "><span>月结商户</span></label></div>") +
      "</div>";
    var modal = openModal(page, "编辑", body, "<button type=\"button\" data-modal-cancel>取消</button><button type=\"button\" class=\"is-primary\" data-save-edit>确定</button>");
    modal.setAttribute("data-kind", "edit");
    modal.setAttribute("data-id", id);
  }

  function editRow(label, content) {
    return "<div class=\"merchant-edit-row\"><div class=\"merchant-edit-label\">" + label + "</div><div class=\"merchant-edit-control\">" + content + "</div></div>";
  }

  function openRateModal(page, id) {
    var row = findMerchant(id);
    if (!row) return;
    var rate = row.rate;
    var gameItems = [
      { label: "飞机", key: "aviator", id: "1001" },
      { label: "绿魔", key: "roulette", id: "1002" },
      { label: "游戏1", key: "chilli", id: "1003" },
      { label: "游戏2", key: "mahjong", id: "1004" }
    ];
    var body =
      "<div class=\"merchant-rate-shell\">" +
        "<div class=\"merchant-rate-heading\">商户费率</div>" +
        "<div class=\"merchant-rate-layout\">" +
          "<div class=\"merchant-rate-section\"><div class=\"merchant-rate-title\"><h3>品牌</h3></div><div class=\"merchant-rate-grid\">" +
            rateItem("SPRIBE", "spribe", rate.spribe) + rateItem("PP", "evo", rate.evo) + rateItem("PG", "pg", rate.pg) + rateItem("JILI", "jili", rate.jili) + rateItem("品牌1", "base", rate.base) + rateItem("品牌2", "base2", rate.base2 || 3.0) +
          "</div></div>" +
          "<div class=\"merchant-rate-section\"><div class=\"merchant-rate-title\"><h3>游戏</h3></div><div class=\"merchant-rate-grid merchant-rate-grid-games\">" +
            gameItems.map(function(item) { return rateGameItem(item.label, item.key, rate[item.key], item.id); }).join("") +
          "</div><div class=\"merchant-rate-warning\">费率配置范围为1.0-10.0,超出范围请联系管理员</div></div>" +
        "</div>" +
        "<div class=\"merchant-rate-add\"><span>添加游戏</span><div class=\"merchant-rate-search\"><input data-rate-game-search placeholder=\"输入游戏名称或ID\"><div class=\"merchant-rate-dropdown\" data-rate-game-dropdown hidden></div></div><button type=\"button\" data-rate-add-game>添加</button><div class=\"merchant-rate-add-message\" data-rate-add-message></div></div>" +
      "</div>";
    var modal = openModal(page, "商户费率", body, "<button type=\"button\" data-modal-cancel>取消</button><button type=\"button\" class=\"is-primary\" data-save-rate>确定</button>");
    modal._rateGames = gameItems.slice();
    modal.setAttribute("data-kind", "rate");
    modal.setAttribute("data-id", id);
  }

  function rateItem(label, key, value) {
    return "<label class=\"merchant-rate-item\"><span>" + label + "</span><input data-rate=\"" + key + "\" value=\"" + Number(value).toFixed(1) + "\"><em>%</em><strong data-rate-error></strong></label>";
  }

  function rateGameItem(label, key, value, id) {
    return "<div class=\"merchant-rate-game-item\" data-rate-game=\"" + key + "\"><span>" + label + "<small>ID:" + id + "</small></span><input data-rate=\"" + key + "\" value=\"" + Number(value).toFixed(1) + "\"><em>%</em><button type=\"button\" data-rate-remove-game=\"" + key + "\">删除</button><strong data-rate-error></strong></div>";
  }

  function openBrandModal(page, id) {
    var row = hydrateMerchant(findMerchant(id));
    if (!row) return;
    var tabs = brandOptions.map(function(brand, index) {
      return "<button type=\"button\" class=\"merchant-brand-tab" + (index === 0 ? " is-active" : "") + "\" data-brand-tab=\"" + brand + "\">" + brand + "</button>";
    }).join("");
    var modal = openModal(page, "维护品牌配置", "<div class=\"merchant-brand-editor\"><div class=\"merchant-brand-tabs\">" + tabs + "</div><div class=\"merchant-brand-form\"><div class=\"merchant-brand-form-label\">配置</div><div class=\"merchant-brand-form-body\"><textarea data-brand-config placeholder=\"请输入描述\"></textarea></div></div></div>", "<button type=\"button\" data-modal-cancel>取消</button><button type=\"button\" class=\"is-primary\" data-save-brand>保存</button>");
    modal._brandDraft = Object.assign({}, row.brandConfig);
    modal.setAttribute("data-brand-current", brandOptions[0]);
    modal.setAttribute("data-kind", "brand");
    modal.setAttribute("data-id", id);
    syncBrandModal(modal);
  }

  function saveEditModal(page, modal) {
    var row = findMerchant(modal.getAttribute("data-id"));
    if (!row) return;
    row.name = modal.querySelector("[data-edit='name']").value.trim() || row.name;
    row.disabled = modal.querySelector("[data-edit='enabled']").checked ? "否" : "是";
    row.gameStatus = modal.querySelector("[data-edit='gameEnabled']").checked ? "启用" : "停用";
    row.contactName = modal.querySelector("[data-edit='contactName']").value.trim();
    row.contactValue = modal.querySelector("[data-edit='contactValue']").value.trim();
    row.chatId = modal.querySelector("[data-edit='chatId']").value.trim();
    row.playerApi = modal.querySelector("[data-edit='playerApi']").value.trim();
    row.balanceApi = modal.querySelector("[data-edit='balanceApi']").value.trim();
    row.changeApi = modal.querySelector("[data-edit='changeApi']").value.trim();
    row.type = modal.querySelector("[name='merchantType']:checked").value;
    normalizeMerchant(row);
    modal.hidden = true;
    renderRows(page);
  }

  function saveRateModal(page, modal) {
    var row = findMerchant(modal.getAttribute("data-id"));
    if (!row) return;
    var hasError = false;
    Array.prototype.forEach.call(modal.querySelectorAll("[data-rate]"), function(input) {
      clearRateError(input);
      var value = Number(input.value);
      if (input.value.trim() === "" || Number.isNaN(value) || value < 1 || value > 10) {
        showRateError(input, "请输入1.0-10.0");
        hasError = true;
      }
    });
    if (hasError) return;
    row.rate = row.rate || {};
    Array.prototype.forEach.call(modal.querySelectorAll("[data-rate]"), function(input) {
      var key = input.getAttribute("data-rate");
      var value = Math.round(Number(input.value) * 10) / 10;
      row.rate[key] = value;
      input.value = value.toFixed(1);
    });
    modal.hidden = true;
  }

  function showRateError(input, text) {
    var wrap = input.closest(".merchant-rate-item, .merchant-rate-game-item");
    if (!wrap) return;
    wrap.classList.add("has-error");
    var error = wrap.querySelector("[data-rate-error]");
    if (error) error.textContent = text;
  }

  function clearRateError(input) {
    var wrap = input.closest(".merchant-rate-item, .merchant-rate-game-item");
    if (!wrap) return;
    wrap.classList.remove("has-error");
    var error = wrap.querySelector("[data-rate-error]");
    if (error) error.textContent = "";
  }

  function syncBrandModal(modal) {
    var current = modal.getAttribute("data-brand-current");
    Array.prototype.forEach.call(modal.querySelectorAll("[data-brand-tab]"), function(tab) {
      tab.classList.toggle("is-active", tab.getAttribute("data-brand-tab") === current);
    });
    modal.querySelector("[data-brand-config]").value = (modal._brandDraft && modal._brandDraft[current]) || "";
  }

  function saveCurrentBrandDraft(modal) {
    var current = modal.getAttribute("data-brand-current");
    if (!current) return;
    modal._brandDraft = modal._brandDraft || {};
    modal._brandDraft[current] = modal.querySelector("[data-brand-config]").value.trim();
  }

  function saveBrandModal(page, modal) {
    var row = findMerchant(modal.getAttribute("data-id"));
    if (!row) return;
    saveCurrentBrandDraft(modal);
    row.brandConfig = Object.assign({}, modal._brandDraft);
    modal.hidden = true;
  }

  function renderRows(page) {
    var name = page.querySelector("[data-filter='name']").value.trim();
    var id = page.querySelector("[data-filter='merchantId']").value.trim();
    var status = page.querySelector("[data-filter='status']").value;
    var merchantType = page.querySelector("[data-filter='merchantType']").value;
    var filtered = merchants.filter(function(row) {
      return (!name || row.name.indexOf(name) !== -1) &&
        (!id || row.id.indexOf(id) !== -1) &&
        (!merchantType || row.type === merchantType) &&
        (!status || row.disabled === status || row.gameStatus === status);
    });
    page.querySelector(".merchant-list-table tbody").innerHTML = filtered.map(rowHtml).join("");
  }

  function resetPage(page) {
    Array.prototype.forEach.call(page.querySelectorAll("[data-filter]"), function(field) {
      field.value = "";
    });
    renderRows(page);
  }

  function hideLegacyPanels() {
    for (var id = 1750; id <= 1879; id += 1) {
      var element = document.getElementById("u" + id);
      if (element) element.style.display = "none";
    }
  }

  function buildPage() {
    var base = document.getElementById("base");
    if (!base || document.querySelector(".merchant-list-page")) return;

    hideLegacyPanels();

    var page = document.createElement("div");
    page.className = "merchant-list-page";
    page.innerHTML =
      "<div class=\"game-records-titlebar merchant-list-titlebar\"><h1>商户列表</h1><button type=\"button\" class=\"merchant-create-btn\" data-action=\"create\">创建商户</button></div>" +
      "<div class=\"merchant-list-filters\">" +
        "<label class=\"merchant-filter-field\"><span>商户名称</span><input data-filter=\"name\" placeholder=\"请输入商户名称\"></label>" +
        "<label class=\"merchant-filter-field\"><span>商户ID</span><input data-filter=\"merchantId\" placeholder=\"请输入商户ID\"></label>" +
        "<label class=\"merchant-filter-field\"><span>商户类型</span><select data-filter=\"merchantType\"><option value=\"\">全部</option><option value=\"预充值商户\">预充值商户</option><option value=\"月结商户\">月结商户</option></select></label>" +
        "<label class=\"merchant-filter-field\"><span>商户状态</span><select data-filter=\"status\"><option value=\"\">全部</option><option value=\"启用\">游戏启用</option><option value=\"停用\">游戏停用</option><option value=\"否\">商户启用</option><option value=\"是\">商户禁用</option></select></label>" +
        "<div class=\"merchant-list-actions\"><button type=\"button\" data-action=\"reset\">重置</button><button type=\"button\" class=\"is-primary\" data-action=\"query\">查询</button></div>" +
      "</div>" +
      "<div class=\"merchant-list-table-card\"><div class=\"merchant-list-table-wrap\"><table class=\"merchant-list-table\"><thead><tr><th>商户ID</th><th>商户名称</th><th>商户类型</th><th>剩余额度</th><th>已结算金额(美元)</th><th>待结算金额</th><th>本月结算金额</th><th>游戏状态</th><th>商户禁用</th><th>操作</th></tr></thead><tbody></tbody></table></div></div>";

    base.appendChild(page);
    renderRows(page);

    page.addEventListener("click", function(event) {
      var actionButton = event.target.closest("[data-action]");
      if (actionButton && actionButton.getAttribute("data-action") === "reset") resetPage(page);
      if (actionButton && actionButton.getAttribute("data-action") === "query") renderRows(page);
      if (actionButton && actionButton.getAttribute("data-action") === "create") {
        window.location.href = "创建商户.html";
      }
      var switchButton = event.target.closest("[data-switch]");
      if (switchButton) {
        openSwitchConfirm(page, switchButton.getAttribute("data-id"), switchButton.getAttribute("data-switch"));
      }
      var rowButton = event.target.closest("[data-row-action]");
      if (rowButton) {
        var id = rowButton.getAttribute("data-id");
        var action = rowButton.getAttribute("data-row-action");
        if (action === "edit") openEditModal(page, id);
        if (action === "rate") openRateModal(page, id);
        if (action === "brand") openBrandModal(page, id);
      }
    });

    page.addEventListener("change", function(event) {
      if (event.target.matches("[data-filter]")) renderRows(page);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildPage);
  } else {
    buildPage();
  }
})();
