(function() {
  var games = [
    { id: "PG01", type: "SLOT", brand: "PG", name: "麻将胡了" },
    { id: "PG02", type: "SLOT", brand: "PG", name: "糖果派对" },
    { id: "PG03", type: "SLOT", brand: "PG", name: "赏金女王" },
    { id: "PG04", type: "SLOT", brand: "PG", name: "宝石矿工" },
    { id: "JL05", type: "SLOT", brand: "JILI", name: "火热辣椒" },
    { id: "JL12", type: "SLOT", brand: "JILI", name: "罗马X" },
    { id: "JL16", type: "SLOT", brand: "JILI", name: "丛林之王" },
    { id: "EV01", type: "TABLE", brand: "EVOLUTION", name: "Mini Roulette" }
  ];

  var merchants = [
    { id: "M10086", name: "星海娱乐" },
    { id: "M10021", name: "蓝鲸游戏" },
    { id: "M10057", name: "银河互动" },
    { id: "M10012", name: "赤焰互娱" },
    { id: "M10073", name: "风暴游戏" },
    { id: "M10039", name: "晨星娱乐" },
    { id: "M10068", name: "火山竞技" },
    { id: "M10044", name: "海豚游戏" }
  ];

  var rows = [
    { tag: "高频玩家", platformId: "PLT-220391", time: "2026-05-09 00:18:42", betCount: 42, todayBet: 12680.00, todayReward: 11844.00, todayProfit: -836.00, historyBet: 662300.00, historyReward: 634912.00, historyProfit: -27388.00, rtp: 0.9586, gameId: "PG02" },
    { tag: "VIP金牌", platformId: "PLT-220478", time: "2026-05-09 00:26:11", betCount: 19, todayBet: 8800.00, todayReward: 10860.00, todayProfit: 2060.00, historyBet: 401620.00, historyReward: 389722.00, historyProfit: -11898.00, rtp: 0.9704, gameId: "PG01" },
    { tag: "观察玩家", platformId: "PLT-220523", time: "2026-05-09 01:04:56", betCount: 12, todayBet: 3660.00, todayReward: 3210.00, todayProfit: -450.00, historyBet: 135420.00, historyReward: 129520.00, historyProfit: -5900.00, rtp: 0.9564, gameId: "JL05" },
    { tag: "新进玩家", platformId: "PLT-220611", time: "2026-05-09 01:26:09", betCount: 7, todayBet: 980.00, todayReward: 1220.00, todayProfit: 240.00, historyBet: 980.00, historyReward: 1220.00, historyProfit: 240.00, rtp: 1.2449, gameId: "JL12" },
    { tag: "常规玩家", platformId: "PLT-220734", time: "2026-05-09 02:12:37", betCount: 28, todayBet: 7420.00, todayReward: 6880.00, todayProfit: -540.00, historyBet: 286720.00, historyReward: 279180.00, historyProfit: -7540.00, rtp: 0.9737, gameId: "PG03" },
    { tag: "高活跃", platformId: "PLT-220818", time: "2026-05-09 03:47:20", betCount: 55, todayBet: 18840.00, todayReward: 18025.00, todayProfit: -815.00, historyBet: 884520.00, historyReward: 850170.00, historyProfit: -34350.00, rtp: 0.9612, gameId: "PG04" },
    { tag: "策略观察", platformId: "PLT-220904", time: "2026-05-09 06:05:48", betCount: 16, todayBet: 5240.00, todayReward: 6110.00, todayProfit: 870.00, historyBet: 248500.00, historyReward: 239330.00, historyProfit: -9170.00, rtp: 0.9631, gameId: "EV01" },
    { tag: "回流玩家", platformId: "PLT-220955", time: "2026-05-09 07:18:16", betCount: 24, todayBet: 6580.00, todayReward: 6028.00, todayProfit: -552.00, historyBet: 190640.00, historyReward: 184220.00, historyProfit: -6420.00, rtp: 0.9663, gameId: "JL16" },
    { tag: "VIP银牌", platformId: "PLT-221032", time: "2026-05-09 08:44:51", betCount: 31, todayBet: 9480.00, todayReward: 11032.00, todayProfit: 1552.00, historyBet: 522340.00, historyReward: 496880.00, historyProfit: -25460.00, rtp: 0.9513, gameId: "PG02" },
    { tag: "高净值", platformId: "PLT-221146", time: "2026-05-09 09:22:34", betCount: 14, todayBet: 12600.00, todayReward: 14960.00, todayProfit: 2360.00, historyBet: 990800.00, historyReward: 945200.00, historyProfit: -45600.00, rtp: 0.9539, gameId: "JL05" },
    { tag: "常规玩家", platformId: "PLT-221208", time: "2026-05-09 10:08:03", betCount: 9, todayBet: 2130.00, todayReward: 1744.00, todayProfit: -386.00, historyBet: 92640.00, historyReward: 88420.00, historyProfit: -4220.00, rtp: 0.9544, gameId: "JL12" },
    { tag: "高频玩家", platformId: "PLT-221352", time: "2026-05-09 10:46:15", betCount: 36, todayBet: 11720.00, todayReward: 10995.00, todayProfit: -725.00, historyBet: 572160.00, historyReward: 551814.00, historyProfit: -20346.00, rtp: 0.9644, gameId: "PG01" },
    { tag: "老玩家", platformId: "PLT-221470", time: "2026-05-08 22:11:09", betCount: 17, todayBet: 0.00, todayReward: 0.00, todayProfit: 0.00, historyBet: 315420.00, historyReward: 304110.00, historyProfit: -11310.00, rtp: 0.9641, gameId: "PG03" },
    { tag: "沉默玩家", platformId: "PLT-221588", time: "2026-05-08 19:35:42", betCount: 5, todayBet: 0.00, todayReward: 0.00, todayProfit: 0.00, historyBet: 62200.00, historyReward: 59184.00, historyProfit: -3016.00, rtp: 0.9515, gameId: "EV01" }
  ];

  var gameMap = {};
  var treeSequence = 0;

  games.forEach(function(game) {
    gameMap[game.id] = game;
  });

  rows.forEach(function(row, index) {
    var merchant = merchants[index % merchants.length];
    row.platformId = String(20260509000001 + index);
    row.merchantId = merchant.id;
    row.merchantName = merchant.name;
  });

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function(match) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
      }[match];
    });
  }

  function money(value, keepSign) {
    var amount = Math.abs(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (value < 0) return "-" + amount;
    return keepSign ? "+" + amount : amount;
  }

  function integer(value) {
    return Number(value).toLocaleString("en-US");
  }

  function historyProfitText(row) {
    return money(row.historyProfit, true) + " (" + (row.rtp * 100).toFixed(2) + "%)";
  }

  function dateValue(text) {
    return text ? text.slice(0, 10) : "";
  }

  function parseDate(value) {
    if (!value) return null;
    var parts = value.split("-");
    if (parts.length !== 3) return null;
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  }

  function formatDateInput(date) {
    return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
  }

  function todayRange() {
    var today = new Date(2026, 4, 9);
    return {
      start: formatDateInput(today),
      end: formatDateInput(today)
    };
  }

  function buildGameTree() {
    var grouped = {};
    games.forEach(function(game) {
      if (!grouped[game.type]) grouped[game.type] = {};
      if (!grouped[game.type][game.brand]) grouped[game.type][game.brand] = [];
      grouped[game.type][game.brand].push(game);
    });
    return Object.keys(grouped).map(function(type) {
      return {
        label: type,
        children: Object.keys(grouped[type]).map(function(brand) {
          return {
            label: brand,
            children: grouped[type][brand].map(function(game) {
              return {
                value: game.id,
                label: "【" + game.id + "】" + game.name,
                name: game.name
              };
            })
          };
        })
      };
    });
  }

  function buildMerchantTree() {
    return merchants.map(function(merchant) {
      return {
        value: merchant.id,
        label: merchant.name + "（" + merchant.id + "）",
        name: merchant.name
      };
    });
  }

  function getTreeLeaves(nodes, list) {
    nodes.forEach(function(node) {
      if (node.children) {
        getTreeLeaves(node.children, list);
      } else {
        list.push(node);
      }
    });
    return list;
  }

  function renderTreeNodes(nodes, selectorName, level, ancestors) {
    return nodes.map(function(node) {
      if (node.children) {
        var groupKey = selectorName + "-group-" + (treeSequence++);
        return "<div class=\"today-profit-tree-row today-profit-tree-group level-" + level + "\" data-selector-row=\"" + selectorName + "\" data-row-text=\"" + escapeHtml(node.label) + "\" data-group-key=\"" + groupKey + "\">" +
          "<button type=\"button\" class=\"today-profit-tree-caret is-open\" data-caret-key=\"" + groupKey + "\" aria-label=\"展开\"></button>" +
          "<label><input type=\"checkbox\" data-selector-group=\"" + selectorName + "\" data-group-key=\"" + groupKey + "\"><span>" + escapeHtml(node.label) + "</span></label>" +
        "</div>" +
        "<div class=\"today-profit-tree-children\" data-children-key=\"" + groupKey + "\">" + renderTreeNodes(node.children, selectorName, level + 1, ancestors.concat(groupKey)) + "</div>";
      }
      return "<label class=\"today-profit-tree-row today-profit-tree-item level-" + level + "\" data-selector-row=\"" + selectorName + "\" data-row-text=\"" + escapeHtml((node.name || "") + " " + (node.value || "") + " " + node.label) + "\" data-ancestor-keys=\"" + escapeHtml(ancestors.join(" ")) + "\" data-item-label=\"" + escapeHtml(node.name || node.label) + "\">" +
        "<input type=\"checkbox\" data-selector-item=\"" + selectorName + "\" data-value=\"" + escapeHtml(node.value) + "\"><span>" + escapeHtml(node.label) + "</span>" +
      "</label>";
    }).join("");
  }

  function buildSelectorField(label, selectorName, placeholder, nodes) {
    treeSequence = 0;
    return "<label class=\"today-profit-filter-field today-profit-filter-field--selector\"><span>" + label + "</span><div class=\"today-profit-selector\" data-selector=\"" + selectorName + "\">" +
      "<div class=\"today-profit-selector-trigger\"><input class=\"today-profit-selector-input\" placeholder=\"" + placeholder + "\" autocomplete=\"off\"><button type=\"button\" class=\"today-profit-selector-arrow\" aria-label=\"展开\"></button></div>" +
      "<div class=\"today-profit-selector-menu\"><label class=\"today-profit-tree-row today-profit-tree-item today-profit-tree-item--all\" data-item-label=\"全部\"><input type=\"checkbox\" data-selector-all=\"" + selectorName + "\"><span>全部</span></label>" + renderTreeNodes(nodes, selectorName, 0, []) + "</div>" +
    "</div></label>";
  }

  function selectorValues(selector) {
    return Array.prototype.map.call(selector.querySelectorAll("[data-selector-item]:checked"), function(input) {
      return input.getAttribute("data-value");
    });
  }

  function syncSelector(selector) {
    var selectorName = selector.getAttribute("data-selector");
    var items = selector.querySelectorAll("[data-selector-item='" + selectorName + "']");
    var checkedItems = selector.querySelectorAll("[data-selector-item='" + selectorName + "']:checked");
    var allInput = selector.querySelector("[data-selector-all='" + selectorName + "']");
    var input = selector.querySelector(".today-profit-selector-input");
    Array.prototype.forEach.call(selector.querySelectorAll("[data-selector-group='" + selectorName + "']"), function(groupInput) {
      var groupKey = groupInput.getAttribute("data-group-key");
      var groupItems = selector.querySelectorAll(".today-profit-tree-item[data-ancestor-keys~='" + groupKey + "'] [data-selector-item='" + selectorName + "']");
      var groupChecked = selector.querySelectorAll(".today-profit-tree-item[data-ancestor-keys~='" + groupKey + "'] [data-selector-item='" + selectorName + "']:checked");
      groupInput.checked = groupItems.length > 0 && groupChecked.length === groupItems.length;
      groupInput.indeterminate = groupChecked.length > 0 && groupChecked.length < groupItems.length;
    });
    if (allInput) {
      allInput.checked = items.length > 0 && checkedItems.length === items.length;
      allInput.indeterminate = checkedItems.length > 0 && checkedItems.length < items.length;
    }
    if (document.activeElement !== input || !input.value || input.value.indexOf("已选") === 0) {
      if (checkedItems.length === 1) {
        input.value = checkedItems[0].parentNode.getAttribute("data-item-label");
      } else {
        input.value = checkedItems.length ? "已选 " + checkedItems.length + " 个" : "";
      }
    }
  }

  function filterSelectorRows(selector, keyword) {
    var lowered = keyword.trim().toLowerCase();
    Array.prototype.forEach.call(selector.querySelectorAll(".today-profit-tree-item"), function(row) {
      if (!lowered) {
        row.hidden = false;
        return;
      }
      row.hidden = row.getAttribute("data-row-text").toLowerCase().indexOf(lowered) === -1 && !row.classList.contains("today-profit-tree-item--all");
    });
  }

  function closeSelectors(root, keep) {
    Array.prototype.forEach.call(root.querySelectorAll(".today-profit-selector"), function(selector) {
      if (selector !== keep) {
        selector.classList.remove("is-open");
        syncSelector(selector);
      }
    });
  }

  function rowHtml(row) {
    var profitClass = row.todayProfit >= 0 ? "is-positive" : "is-negative";
    return "<tr>" +
      "<td>" + escapeHtml(row.tag) + "</td>" +
      "<td><button type=\"button\" class=\"today-profit-link\" data-player-id=\"" + escapeHtml(row.platformId) + "\">" + escapeHtml(row.platformId) + "</button></td>" +
      "<td>" + escapeHtml(row.merchantName) + "</td>" +
      "<td>" + escapeHtml(row.time) + "</td>" +
      "<td>" + integer(row.betCount) + "</td>" +
      "<td>" + money(row.todayBet) + "</td>" +
      "<td>" + money(row.todayReward) + "</td>" +
      "<td class=\"" + profitClass + "\">" + money(row.todayProfit, true) + "</td>" +
      "<td>" + money(row.historyBet) + "</td>" +
      "<td>" + money(row.historyReward) + "</td>" +
      "<td class=\"" + (row.historyProfit >= 0 ? "is-positive" : "is-negative") + "\">" + historyProfitText(row) + "</td>" +
    "</tr>";
  }

  function renderTable(page) {
    var tableBody = page.querySelector(".today-profit-table tbody");
    var state = getFilterState(page);
    var filtered = rows.filter(function(row) {
      var matchesMerchant = !state.merchantIds.length || state.merchantIds.indexOf(row.merchantId) !== -1;
      var matchesGame = !state.gameIds.length || state.gameIds.indexOf(row.gameId) !== -1;
      var rowDate = parseDate(dateValue(row.time));
      var matchesStart = !state.start || (rowDate && rowDate.getTime() >= state.start.getTime());
      var matchesEnd = !state.end || (rowDate && rowDate.getTime() <= state.end.getTime());
      return matchesMerchant && matchesGame && matchesStart && matchesEnd;
    }).sort(function(a, b) {
      return b.todayProfit - a.todayProfit;
    });
    tableBody.innerHTML = filtered.length ? filtered.map(rowHtml).join("") : "<tr><td class=\"today-profit-empty\" colspan=\"11\">当前筛选条件下暂无数据</td></tr>";
  }

  function getFilterState(page) {
    var gameSelector = page.querySelector("[data-selector='game']");
    var merchantSelector = page.querySelector("[data-selector='merchant']");
    return {
      merchantIds: merchantSelector ? selectorValues(merchantSelector) : [],
      gameIds: gameSelector ? selectorValues(gameSelector) : [],
      start: parseDate(page.querySelector("[data-filter='start']").value),
      end: parseDate(page.querySelector("[data-filter='end']").value)
    };
  }

  function resetPage(page) {
    var range = todayRange();
    page.querySelector("[data-filter='start']").value = range.start;
    page.querySelector("[data-filter='end']").value = range.end;
    Array.prototype.forEach.call(page.querySelectorAll("[data-selector-item], [data-selector-group], [data-selector-all]"), function(input) {
      input.checked = false;
      input.indeterminate = false;
    });
    Array.prototype.forEach.call(page.querySelectorAll(".today-profit-tree-item"), function(row) {
      row.hidden = false;
    });
    Array.prototype.forEach.call(page.querySelectorAll(".today-profit-selector-input"), function(input) {
      input.value = "";
    });
    Array.prototype.forEach.call(page.querySelectorAll(".today-profit-selector"), function(selector) {
      selector.classList.remove("is-open");
      syncSelector(selector);
    });
    renderTable(page);
  }

  function playerRowById(id) {
    return rows.find(function(row) {
      return row.platformId === id;
    });
  }

  function buildModal() {
    return "<div class=\"today-profit-modal\" hidden>" +
      "<div class=\"today-profit-modal-panel\">" +
        "<div class=\"today-profit-modal-header\"><div><h2>玩家详情</h2><p data-modal-subtitle></p></div><button type=\"button\" class=\"today-profit-modal-close\" aria-label=\"关闭\">×</button></div>" +
        "<div class=\"today-profit-modal-body\">" +
          "<div class=\"today-profit-detail-grid\">" +
            "<div class=\"today-profit-detail-item\"><span>玩家ID</span><strong data-detail=\"platformId\"></strong></div>" +
            "<div class=\"today-profit-detail-item\"><span>商户</span><strong data-detail=\"merchant\"></strong></div>" +
            "<div class=\"today-profit-detail-item\"><span>玩家标签</span><strong data-detail=\"tag\"></strong></div>" +
            "<div class=\"today-profit-detail-item\"><span>游戏名称</span><strong data-detail=\"game\"></strong></div>" +
            "<div class=\"today-profit-detail-item\"><span>最近时间</span><strong data-detail=\"time\"></strong></div>" +
            "<div class=\"today-profit-detail-item\"><span>下注次数</span><strong data-detail=\"betCount\"></strong></div>" +
            "<div class=\"today-profit-detail-item\"><span>今日下注</span><strong data-detail=\"todayBet\"></strong></div>" +
            "<div class=\"today-profit-detail-item\"><span>今日返奖</span><strong data-detail=\"todayReward\"></strong></div>" +
            "<div class=\"today-profit-detail-item\"><span>今日输赢</span><strong data-detail=\"todayProfit\"></strong></div>" +
            "<div class=\"today-profit-detail-item\"><span>历史下注</span><strong data-detail=\"historyBet\"></strong></div>" +
            "<div class=\"today-profit-detail-item\"><span>历史返奖</span><strong data-detail=\"historyReward\"></strong></div>" +
            "<div class=\"today-profit-detail-item today-profit-detail-item--wide\"><span>历史输赢(RTP)</span><strong data-detail=\"historyProfit\"></strong></div>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</div>";
  }

  function openModal(page, platformId) {
    var modal = page.querySelector(".today-profit-modal");
    var row = playerRowById(platformId);
    var game = row ? gameMap[row.gameId] : null;
    if (!modal || !row) return;
    modal.querySelector("[data-modal-subtitle]").textContent = (game ? game.name : "") + " / " + dateValue(row.time);
    modal.querySelector("[data-detail='platformId']").textContent = row.platformId;
    modal.querySelector("[data-detail='merchant']").textContent = row.merchantName + "（" + row.merchantId + "）";
    modal.querySelector("[data-detail='tag']").textContent = row.tag;
    modal.querySelector("[data-detail='game']").textContent = game ? game.name : "--";
    modal.querySelector("[data-detail='time']").textContent = row.time;
    modal.querySelector("[data-detail='betCount']").textContent = integer(row.betCount);
    modal.querySelector("[data-detail='todayBet']").textContent = money(row.todayBet);
    modal.querySelector("[data-detail='todayReward']").textContent = money(row.todayReward);
    modal.querySelector("[data-detail='todayProfit']").textContent = money(row.todayProfit, true);
    modal.querySelector("[data-detail='historyBet']").textContent = money(row.historyBet);
    modal.querySelector("[data-detail='historyReward']").textContent = money(row.historyReward);
    modal.querySelector("[data-detail='historyProfit']").textContent = historyProfitText(row);
    modal.hidden = false;
  }

  function hideLegacyPanels() {
    for (var id = 1140; id <= 1169; id += 1) {
      var element = document.getElementById("u" + id);
      if (element) element.style.display = "none";
    }
  }

  function buildPage() {
    var base = document.getElementById("base");
    if (!base || document.querySelector(".today-profit-page")) return;

    hideLegacyPanels();

    var range = todayRange();
    var gameTree = buildGameTree();
    var merchantTree = buildMerchantTree();
    var page = document.createElement("div");
    page.className = "today-profit-page";
    page.innerHTML =
      "<div class=\"game-records-titlebar today-profit-titlebar\"><h1>今日玩家盈亏</h1></div>" +
      "<div class=\"today-profit-filters\">" +
        buildSelectorField("选择商户", "merchant", "请选择 / 输入商户名或ID", merchantTree) +
        buildSelectorField("选择游戏", "game", "请选择 / 输入游戏名", gameTree) +
        "<label class=\"today-profit-filter-field today-profit-filter-field--dates\"><span>时间范围</span><div class=\"today-profit-date-fields\"><input type=\"date\" data-filter=\"start\" value=\"" + range.start + "\"><em>至</em><input type=\"date\" data-filter=\"end\" value=\"" + range.end + "\"></div></label>" +
        "<div class=\"today-profit-filter-actions\"><button type=\"button\" data-action=\"reset\">重置</button><button type=\"button\" class=\"is-primary\" data-action=\"query\">查询</button></div>" +
      "</div>" +
      "<div class=\"today-profit-table-card\"><div class=\"today-profit-table-wrap\"><table class=\"today-profit-table\"><thead><tr>" +
        "<th>玩家标签</th><th>玩家ID</th><th>商户</th><th>时间</th><th>下注次数</th><th>今日下注</th><th>今日返奖</th><th>今日输赢</th><th>历史下注</th><th>历史返奖</th><th>历史输赢(RTP)</th>" +
      "</tr></thead><tbody></tbody></table></div></div>" +
      buildModal();

    base.appendChild(page);
    Array.prototype.forEach.call(page.querySelectorAll(".today-profit-selector"), function(selector) {
      syncSelector(selector);
    });
    renderTable(page);

    page.addEventListener("click", function(event) {
      var selectorRoot = event.target.closest(".today-profit-selector");
      if (!selectorRoot) closeSelectors(page);

      if (event.target.closest(".today-profit-selector-arrow")) {
        var selector = event.target.closest(".today-profit-selector");
        closeSelectors(page, selector);
        selector.classList.toggle("is-open");
        if (selector.classList.contains("is-open")) {
          selector.querySelector(".today-profit-selector-input").focus();
        } else {
          syncSelector(selector);
        }
        return;
      }

      if (event.target.closest(".today-profit-tree-caret")) {
        var caret = event.target.closest(".today-profit-tree-caret");
        caret.classList.toggle("is-open");
        var children = page.querySelector("[data-children-key='" + caret.getAttribute("data-caret-key") + "']");
        if (children) children.classList.toggle("is-collapsed");
        return;
      }

      if (event.target.closest("[data-action='reset']")) {
        resetPage(page);
        return;
      }

      if (event.target.closest("[data-action='query']")) {
        renderTable(page);
        return;
      }

      if (event.target.closest("[data-player-id]")) {
        openModal(page, event.target.closest("[data-player-id]").getAttribute("data-player-id"));
        return;
      }

      if (event.target.closest(".today-profit-modal-close") || (event.target.classList && event.target.classList.contains("today-profit-modal"))) {
        page.querySelector(".today-profit-modal").hidden = true;
      }
    });

    page.addEventListener("change", function(event) {
      var input = event.target;
      if (input.matches("[data-selector-all]")) {
        var selectorName = input.getAttribute("data-selector-all");
        Array.prototype.forEach.call(page.querySelectorAll("[data-selector-item='" + selectorName + "'], [data-selector-group='" + selectorName + "']"), function(checkbox) {
          checkbox.checked = input.checked;
          checkbox.indeterminate = false;
        });
        syncSelector(input.closest(".today-profit-selector"));
        return;
      }

      if (input.matches("[data-selector-group]")) {
        var groupSelectorName = input.getAttribute("data-selector-group");
        var groupKey = input.getAttribute("data-group-key");
        Array.prototype.forEach.call(page.querySelectorAll(".today-profit-tree-item[data-ancestor-keys~='" + groupKey + "'] [data-selector-item='" + groupSelectorName + "']"), function(checkbox) {
          checkbox.checked = input.checked;
        });
        syncSelector(input.closest(".today-profit-selector"));
        return;
      }

      if (input.matches("[data-selector-item]")) {
        syncSelector(input.closest(".today-profit-selector"));
      }
    });

    Array.prototype.forEach.call(page.querySelectorAll(".today-profit-selector-input"), function(input) {
      input.addEventListener("focus", function() {
        var selector = input.closest(".today-profit-selector");
        closeSelectors(page, selector);
        selector.classList.add("is-open");
      });
      input.addEventListener("input", function() {
        var selector = input.closest(".today-profit-selector");
        filterSelectorRows(selector, input.value);
        selector.classList.add("is-open");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildPage);
  } else {
    buildPage();
  }
})();
