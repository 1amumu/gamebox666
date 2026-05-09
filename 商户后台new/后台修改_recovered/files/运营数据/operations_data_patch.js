(function() {
  var games = [
    { id: "aviator", name: "Aviator", type: "CRASH", brand: "SPRIBE", weight: 5 },
    { id: "mini-roulette", name: "Mini Roulette", type: "TABLE", brand: "EVOLUTION", weight: 3 },
    { id: "mahjong", name: "麻将胡了", type: "SLOT", brand: "PG", weight: 4 },
    { id: "candy", name: "糖果派对", type: "SLOT", brand: "PG", weight: 6 },
    { id: "queen", name: "赏金女王", type: "SLOT", brand: "PG", weight: 5 },
    { id: "hot-chilli", name: "火热辣椒", type: "SLOT", brand: "JILI", weight: 4 },
    { id: "roman", name: "罗马X", type: "SLOT", brand: "JILI", weight: 3 },
    { id: "jungle", name: "丛林之王", type: "SLOT", brand: "JILI", weight: 5 }
  ];

  var siteTree = [
    {
      label: "印度",
      children: [
        { value: "29243-1034", label: "【29243-1034】新德里主站", name: "新德里主站", region: "印度", weight: 4 },
        { value: "29243-1035", label: "【29243-1035】孟买主站", name: "孟买主站", region: "印度", weight: 5 },
        { value: "29243-1036", label: "【29243-1036】班加罗尔站", name: "班加罗尔站", region: "印度", weight: 3 },
        { value: "29243-1037", label: "【29243-1037】金奈站", name: "金奈站", region: "印度", weight: 2 }
      ]
    },
    {
      label: "巴西",
      children: [
        { value: "45110-2001", label: "【45110-2001】圣保罗主站", name: "圣保罗主站", region: "巴西", weight: 4 },
        { value: "45110-2002", label: "【45110-2002】里约站", name: "里约站", region: "巴西", weight: 3 },
        { value: "45110-2003", label: "【45110-2003】库里蒂巴站", name: "库里蒂巴站", region: "巴西", weight: 2 }
      ]
    },
    {
      label: "东南亚",
      children: [
        { value: "66120-3001", label: "【66120-3001】马尼拉站", name: "马尼拉站", region: "东南亚", weight: 3 },
        { value: "66120-3002", label: "【66120-3002】雅加达站", name: "雅加达站", region: "东南亚", weight: 4 },
        { value: "66120-3003", label: "【66120-3003】胡志明站", name: "胡志明站", region: "东南亚", weight: 2 }
      ]
    }
  ];

  var gameTree = [
    {
      label: "CRASH",
      children: [
        {
          label: "SPRIBE",
          children: [
            { value: "aviator", label: "【AV01】Aviator", name: "Aviator" }
          ]
        }
      ]
    },
    {
      label: "TABLE",
      children: [
        {
          label: "EVOLUTION",
          children: [
            { value: "mini-roulette", label: "【TB11】Mini Roulette", name: "Mini Roulette" }
          ]
        }
      ]
    },
    {
      label: "SLOT",
      children: [
        {
          label: "PG",
          children: [
            { value: "mahjong", label: "【PG01】麻将胡了", name: "麻将胡了" },
            { value: "candy", label: "【PG02】糖果派对", name: "糖果派对" },
            { value: "queen", label: "【PG03】赏金女王", name: "赏金女王" }
          ]
        },
        {
          label: "JILI",
          children: [
            { value: "hot-chilli", label: "【JL05】火热辣椒", name: "火热辣椒" },
            { value: "roman", label: "【JL12】罗马X", name: "罗马X" },
            { value: "jungle", label: "【JL16】丛林之王", name: "丛林之王" }
          ]
        }
      ]
    }
  ];

  var siteMap = {};
  var expandedRows = {};
  var treeSequence = 0;

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

  function flattenSites(nodes) {
    nodes.forEach(function(node) {
      if (node.children) {
        flattenSites(node.children);
      } else {
        siteMap[node.value] = node;
      }
    });
  }

  function hashString(value) {
    var hash = 0;
    for (var index = 0; index < value.length; index += 1) {
      hash = (hash * 131 + value.charCodeAt(index)) % 2147483647;
    }
    return hash;
  }

  function toDateValue(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  function formatDateInput(date) {
    return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
  }

  function formatDateLabel(date) {
    return formatDateInput(date);
  }

  function formatRangeLabel(start, end) {
    return formatDateInput(start) + " ~ " + formatDateInput(end);
  }

  function parseDateValue(value) {
    if (!value) return null;
    var parts = value.split("-");
    if (parts.length !== 3) return null;
    return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
  }

  function createDateList(start, end) {
    var cursor = toDateValue(start);
    var limit = toDateValue(end);
    var dates = [];
    while (cursor.getTime() <= limit.getTime()) {
      dates.push(new Date(cursor.getTime()));
      cursor.setDate(cursor.getDate() + 1);
    }
    return dates;
  }

  function sum(list, getter) {
    return list.reduce(function(total, item) {
      return total + getter(item);
    }, 0);
  }

  function money(value) {
    return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function integer(value) {
    return Math.round(value).toLocaleString("en-US");
  }

  function percent(value) {
    return (value * 100).toFixed(2) + "%";
  }

  function getQuickRange(days) {
    var today = toDateValue(new Date());
    var start = new Date(today.getTime());
    start.setDate(today.getDate() - (days - 1));
    return { start: start, end: today };
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
        return "<div class=\"ops-tree-row ops-tree-group level-" + level + "\" data-selector-row=\"" + selectorName + "\" data-row-text=\"" + escapeHtml(node.label) + "\" data-group-key=\"" + groupKey + "\">" +
          "<button type=\"button\" class=\"ops-tree-caret is-open\" data-caret-key=\"" + groupKey + "\" aria-label=\"展开\"></button>" +
          "<label><input type=\"checkbox\" data-selector-group=\"" + selectorName + "\" data-group-key=\"" + groupKey + "\"><span>" + escapeHtml(node.label) + "</span></label>" +
        "</div>" +
        "<div class=\"ops-tree-children\" data-children-key=\"" + groupKey + "\">" + renderTreeNodes(node.children, selectorName, level + 1, ancestors.concat(groupKey)) + "</div>";
      }
      var searchText = (node.name || "") + " " + (node.value || "") + " " + (node.region || "");
      return "<label class=\"ops-tree-row ops-tree-item level-" + level + "\" data-selector-row=\"" + selectorName + "\" data-row-text=\"" + escapeHtml(searchText) + "\" data-ancestor-keys=\"" + escapeHtml(ancestors.join(" ")) + "\" data-item-label=\"" + escapeHtml(node.name || node.label) + "\">" +
        "<input type=\"checkbox\" data-selector-item=\"" + selectorName + "\" data-value=\"" + escapeHtml(node.value) + "\"><span>" + escapeHtml(node.label) + "</span>" +
      "</label>";
    }).join("");
  }

  function buildSelectorField(label, selectorName, placeholder, nodes) {
    return "<label class=\"operations-filter-field operations-filter-field--selector\"><span>" + label + "</span><div class=\"operations-selector\" data-selector=\"" + selectorName + "\">" +
      "<div class=\"operations-selector-trigger\"><input class=\"operations-selector-input\" placeholder=\"" + placeholder + "\" autocomplete=\"off\"><button type=\"button\" class=\"operations-selector-arrow\" aria-label=\"展开\"></button></div>" +
      "<div class=\"operations-selector-menu\"><label class=\"ops-tree-row ops-tree-item ops-tree-item--all\" data-item-label=\"全部\"><input type=\"checkbox\" data-selector-all=\"" + selectorName + "\"><span>全部</span></label>" + renderTreeNodes(nodes, selectorName, 0, []) + "</div>" +
    "</div></label>";
  }

  function metricFor(game, site, date) {
    var dateKey = formatDateInput(date);
    var seed = hashString(game.id + "|" + site.value + "|" + dateKey);
    var base = 90000 + (seed % 180000);
    var siteFactor = 1 + site.weight * 0.08;
    var gameFactor = 1 + game.weight * 0.11;
    var weekendBoost = (date.getDay() === 0 || date.getDay() === 6) ? 1.14 : 1;
    var bet = Math.round(base * siteFactor * gameFactor * weekendBoost);
    var validRate = 0.79 + ((seed % 15) / 100);
    var payoutRate = 0.884 + (((seed >> 3) % 58) / 1000);
    var payout = Math.round(bet * payoutRate);
    var players = Math.round(90 + (seed % 220) + game.weight * 12 + site.weight * 9);
    var newUsers = Math.max(4, Math.round(players * (0.05 + ((seed % 9) / 200))));
    var orderFactor = 2.4 + (((seed >> 4) % 140) / 100);
    var orders = Math.round(players * orderFactor);
    return {
      bet: bet,
      payout: payout,
      profit: bet - payout,
      validBet: bet * validRate,
      players: players,
      newUsers: newUsers,
      orders: orders
    };
  }

  function aggregateMetrics(metrics) {
    var totalBet = sum(metrics, function(item) { return item.bet; });
    var totalPayout = sum(metrics, function(item) { return item.payout; });
    var totalProfit = sum(metrics, function(item) { return item.profit; });
    var totalValidBet = sum(metrics, function(item) { return item.validBet; });
    var totalPlayers = sum(metrics, function(item) { return item.players; });
    var totalNewUsers = sum(metrics, function(item) { return item.newUsers; });
    var totalOrders = sum(metrics, function(item) { return item.orders; });
    return {
      bet: totalBet,
      payout: totalPayout,
      profit: totalProfit,
      validBet: totalValidBet,
      profitRate: totalBet ? totalProfit / totalBet : 0,
      validRate: totalBet ? totalValidBet / totalBet : 0,
      players: totalPlayers,
      newUsers: totalNewUsers,
      orders: totalOrders,
      avgBet: totalPlayers ? totalBet / totalPlayers : 0,
      avgOrders: totalPlayers ? totalOrders / totalPlayers : 0
    };
  }

  function getSelectedValues(page, selectorName) {
    return Array.prototype.map.call(page.querySelectorAll("[data-selector-item='" + selectorName + "']:checked"), function(input) {
      return input.getAttribute("data-value");
    });
  }

  function matchQuickRange(start, end) {
    var quick7 = getQuickRange(7);
    var quick30 = getQuickRange(30);
    var startKey = formatDateInput(start);
    var endKey = formatDateInput(end);
    if (startKey === formatDateInput(quick7.start) && endKey === formatDateInput(quick7.end)) return 7;
    if (startKey === formatDateInput(quick30.start) && endKey === formatDateInput(quick30.end)) return 30;
    return 0;
  }

  function getRangeFromPage(page) {
    var start = parseDateValue(page.querySelector("[data-filter='start']").value);
    var end = parseDateValue(page.querySelector("[data-filter='end']").value);
    if (!start || !end || end.getTime() < start.getTime()) {
      var fallback = getQuickRange(7);
      return { start: fallback.start, end: fallback.end, quick: 7 };
    }
    return { start: start, end: end, quick: matchQuickRange(start, end) };
  }

  function buildOperationsRows(page) {
    var range = getRangeFromPage(page);
    var dates = createDateList(range.start, range.end);
    var selectedSites = getSelectedValues(page, "site");
    var selectedGames = getSelectedValues(page, "game");
    var siteIds = selectedSites.length ? selectedSites : getTreeLeaves(siteTree, []).map(function(site) { return site.value; });
    var siteList = siteIds.map(function(siteId) { return siteMap[siteId]; }).filter(Boolean);
    var gameList = games.filter(function(game) {
      return !selectedGames.length || selectedGames.indexOf(game.id) !== -1;
    });

    return gameList.map(function(game) {
      var daily = dates.map(function(date) {
        return {
          date: date,
          metrics: aggregateMetrics(siteList.map(function(site) {
            return metricFor(game, site, date);
          }))
        };
      });
      var summary = aggregateMetrics(daily.map(function(item) { return item.metrics; }));
      var sites = siteList.map(function(site) {
        return {
          id: site.value,
          name: site.name,
          region: site.region,
          metrics: aggregateMetrics(dates.map(function(date) {
            return metricFor(game, site, date);
          }))
        };
      }).sort(function(left, right) {
        return right.metrics.bet - left.metrics.bet;
      });
      return {
        game: game,
        summary: summary,
        daily: daily,
        sites: sites,
        rangeLabel: formatRangeLabel(range.start, range.end)
      };
    }).sort(function(left, right) {
      return right.summary.bet - left.summary.bet;
    });
  }

  function summaryCells(metrics) {
    var profitClass = metrics.profit >= 0 ? "is-positive" : "is-negative";
    return "<td>" + money(metrics.bet) + "</td>" +
      "<td>" + money(metrics.payout) + "</td>" +
      "<td class=\"" + profitClass + "\">" + money(metrics.profit) + "</td>" +
      "<td>" + percent(metrics.profitRate) + "</td>" +
      "<td>" + percent(metrics.validRate) + "</td>" +
      "<td>" + integer(metrics.players) + "</td>" +
      "<td>" + integer(metrics.newUsers) + "</td>" +
      "<td>" + integer(metrics.orders) + "</td>" +
      "<td>" + money(metrics.avgBet) + "</td>" +
      "<td>" + metrics.avgOrders.toFixed(2) + "</td>";
  }

  function dailyTableHtml(row) {
    return "<div class=\"operations-subtable-wrap\"><table class=\"operations-subtable\"><tbody>" +
      row.daily.map(function(item) {
        return "<tr>" +
          "<td></td>" +
          "<td class=\"operations-subtable-game\">" + escapeHtml(row.game.name) + "</td>" +
          "<td>" + escapeHtml(row.game.type) + "</td>" +
          "<td>" + formatDateLabel(item.date) + "</td>" +
          summaryCells(item.metrics) +
        "</tr>";
      }).join("") +
    "</tbody></table></div>";
  }

  function renderTable(page) {
    var rows = buildOperationsRows(page);
    var tbody = page.querySelector(".operations-table tbody");
    if (!rows.length) {
      page.__operationsRows = [];
      tbody.innerHTML = "<tr><td colspan=\"14\" class=\"operations-empty\">暂无符合条件的数据</td></tr>";
      return;
    }
    tbody.innerHTML = rows.map(function(row) {
      var expanded = !!expandedRows[row.game.id];
      return "<tr class=\"operations-main-row\">" +
        "<td><button type=\"button\" class=\"operations-expand" + (expanded ? " is-open" : "") + "\" data-expand=\"" + row.game.id + "\" aria-label=\"展开按天数据\"></button></td>" +
        "<td><button type=\"button\" class=\"operations-game-link\" data-detail=\"" + row.game.id + "\">" + escapeHtml(row.game.name) + "</button></td>" +
        "<td>" + escapeHtml(row.game.type) + "</td>" +
        "<td>" + escapeHtml(row.rangeLabel) + "</td>" +
        summaryCells(row.summary) +
      "</tr>" +
      (expanded ? "<tr class=\"operations-subrow\"><td colspan=\"14\">" + dailyTableHtml(row) + "</td></tr>" : "");
    }).join("");
    page.__operationsRows = rows;
  }

  function getRowByGameId(page, gameId) {
    var rows = page.__operationsRows || [];
    for (var index = 0; index < rows.length; index += 1) {
      if (rows[index].game.id === gameId) return rows[index];
    }
    return null;
  }

  function ensureDetailModal() {
    var modal = document.querySelector(".operations-detail-modal");
    if (modal) return modal;
    modal = document.createElement("div");
    modal.className = "operations-detail-modal";
    modal.hidden = true;
    modal.innerHTML =
      "<div class=\"operations-detail-panel\" role=\"dialog\" aria-modal=\"true\" aria-label=\"站点明细\">" +
        "<div class=\"operations-detail-header\"><div><h2></h2><p></p></div><button type=\"button\" class=\"operations-detail-close\" aria-label=\"关闭\">×</button></div>" +
        "<div class=\"operations-detail-table-wrap\"><table class=\"operations-detail-table\"><thead><tr>" +
          "<th>商户站点</th><th>总投注</th><th>总返奖</th><th>总输赢</th><th>盈利率</th><th>有效投注比</th><th>玩家总人数</th><th>新用户数</th><th>总下注单数</th><th>人均下注金额</th><th>人均单数</th>" +
        "</tr></thead><tbody></tbody></table></div>" +
      "</div>";
    modal.addEventListener("click", function(event) {
      if (event.target === modal || event.target.classList.contains("operations-detail-close")) {
        modal.hidden = true;
      }
    });
    document.body.appendChild(modal);
    return modal;
  }

  function openDetailModal(page, gameId) {
    var row = getRowByGameId(page, gameId);
    if (!row) return;
    var modal = ensureDetailModal();
    modal.querySelector("h2").textContent = row.game.name + " 站点明细";
    modal.querySelector("p").textContent = row.rangeLabel + " / 共 " + row.sites.length + " 个站点";
    modal.querySelector("tbody").innerHTML = row.sites.map(function(site) {
      return "<tr><td><div class=\"operations-site-cell\"><strong>" + escapeHtml(site.id) + "</strong><span>" + escapeHtml(site.region + " / " + site.name) + "</span></div></td>" + summaryCells(site.metrics) + "</tr>";
    }).join("");
    modal.hidden = false;
  }

  function syncSelector(selector) {
    var selectorName = selector.getAttribute("data-selector");
    Array.prototype.forEach.call(selector.querySelectorAll("[data-selector-group='" + selectorName + "']"), function(groupInput) {
      var groupKey = groupInput.getAttribute("data-group-key");
      var items = selector.querySelectorAll(".ops-tree-item[data-ancestor-keys~='" + groupKey + "'] [data-selector-item='" + selectorName + "']");
      var checkedItems = selector.querySelectorAll(".ops-tree-item[data-ancestor-keys~='" + groupKey + "'] [data-selector-item='" + selectorName + "']:checked");
      groupInput.checked = items.length > 0 && items.length === checkedItems.length;
      groupInput.indeterminate = checkedItems.length > 0 && checkedItems.length < items.length;
    });
    var checked = selector.querySelectorAll("[data-selector-item='" + selectorName + "']:checked");
    var labels = Array.prototype.map.call(checked, function(input) {
      return input.closest(".ops-tree-item").getAttribute("data-item-label");
    });
    var summary = "";
    if (labels.length === 1) summary = labels[0];
    if (labels.length > 1) summary = "已选 " + labels.length + " 项";
    var allInput = selector.querySelector("[data-selector-all='" + selectorName + "']");
    if (allInput) {
      var totalItems = selector.querySelectorAll("[data-selector-item='" + selectorName + "']");
      allInput.checked = totalItems.length > 0 && checked.length === totalItems.length;
      allInput.indeterminate = checked.length > 0 && checked.length < totalItems.length;
      if (allInput.checked) summary = "全部";
    }
    var input = selector.querySelector(".operations-selector-input");
    input.dataset.summary = summary;
    if (!(document.activeElement === input && selector.classList.contains("is-open"))) {
      input.value = summary;
    }
  }

  function closeSelectors(page, except) {
    Array.prototype.forEach.call(page.querySelectorAll(".operations-selector.is-open"), function(selector) {
      if (selector !== except) {
        selector.classList.remove("is-open");
        var input = selector.querySelector(".operations-selector-input");
        if (input.dataset.summary !== undefined) input.value = input.dataset.summary || "";
      }
    });
  }

  function filterSelector(selector) {
    var keyword = selector.querySelector(".operations-selector-input").value.trim().toLowerCase();
    var groups = Array.prototype.slice.call(selector.querySelectorAll(".ops-tree-group")).reverse();
    Array.prototype.forEach.call(selector.querySelectorAll(".ops-tree-item"), function(item) {
      item.hidden = !!keyword && item.getAttribute("data-row-text").toLowerCase().indexOf(keyword) === -1;
    });
    groups.forEach(function(group) {
      var groupKey = group.getAttribute("data-group-key");
      var children = selector.querySelector("[data-children-key='" + groupKey + "']");
      var selfMatch = group.getAttribute("data-row-text").toLowerCase().indexOf(keyword) !== -1;
      var hasVisibleChildren = !!selector.querySelector(".ops-tree-item[data-ancestor-keys~='" + groupKey + "']:not([hidden])");
      group.hidden = !!keyword && !selfMatch && !hasVisibleChildren;
      if (children) children.hidden = group.hidden;
    });
  }

  function applyQuickRange(page, days) {
    var range = getQuickRange(days);
    page.querySelector("[data-filter='start']").value = formatDateInput(range.start);
    page.querySelector("[data-filter='end']").value = formatDateInput(range.end);
    Array.prototype.forEach.call(page.querySelectorAll("[data-quick-range]"), function(button) {
      button.classList.toggle("is-active", Number(button.getAttribute("data-quick-range")) === days);
    });
  }

  function resetPage(page) {
    applyQuickRange(page, 7);
    Array.prototype.forEach.call(page.querySelectorAll("[data-selector-item], [data-selector-group]"), function(input) {
      input.checked = false;
      input.indeterminate = false;
    });
    Array.prototype.forEach.call(page.querySelectorAll(".ops-tree-row, .ops-tree-children"), function(row) {
      row.hidden = false;
    });
    Array.prototype.forEach.call(page.querySelectorAll(".ops-tree-caret"), function(caret) {
      caret.classList.add("is-open");
    });
    Array.prototype.forEach.call(page.querySelectorAll(".ops-tree-children"), function(children) {
      children.classList.remove("is-collapsed");
    });
    Array.prototype.forEach.call(page.querySelectorAll(".operations-selector"), function(selector) {
      selector.classList.remove("is-open");
      var input = selector.querySelector(".operations-selector-input");
      input.value = "";
      input.dataset.summary = "";
      var allInput = selector.querySelector("[data-selector-all]");
      if (allInput) {
        allInput.checked = false;
        allInput.indeterminate = false;
      }
      syncSelector(selector);
    });
    expandedRows = {};
    renderTable(page);
  }

  function hideLegacyPanels() {
    for (var id = 905; id <= 1047; id += 1) {
      var element = document.getElementById("u" + id);
      if (element) element.style.display = "none";
    }
  }

  function buildPage() {
    flattenSites(siteTree);
    var base = document.getElementById("base");
    if (!base || document.querySelector(".operations-data-page")) return;

    hideLegacyPanels();

    var page = document.createElement("div");
    page.className = "operations-data-page";
    page.innerHTML =
      "<div class=\"operations-data-titlebar\"><h1>运营数据</h1></div>" +
      "<div class=\"operations-data-filters\">" +
        buildSelectorField("选择站点", "site", "请选择站点 / 输入关键词", siteTree) +
        buildSelectorField("选择游戏", "game", "请选择游戏 / 输入关键词", gameTree) +
        "<div class=\"operations-filter-right\"><label class=\"operations-filter-field operations-filter-field--dates\"><span>时间范围</span><div class=\"operations-date-fields\"><input type=\"date\" data-filter=\"start\"><em>至</em><input type=\"date\" data-filter=\"end\"></div></label><div class=\"operations-filter-toolbar\"><div class=\"operations-quick-range\"><button type=\"button\" data-quick-range=\"7\">近7日</button><button type=\"button\" data-quick-range=\"30\">近30日</button></div><div class=\"operations-filter-actions\"><button type=\"button\" data-action=\"reset\">重置</button><button type=\"button\" class=\"is-primary\" data-action=\"query\">查询</button></div></div></div>" +
      "</div>" +
      "<div class=\"operations-table-card\"><div class=\"operations-table-wrap\"><table class=\"operations-table\"><thead><tr>" +
        "<th></th><th>游戏名称</th><th>游戏类型</th><th>日期</th><th>总投注</th><th>总返奖</th><th>总输赢</th><th>盈利率</th><th>有效投注比</th><th>玩家总人数</th><th>新用户数</th><th>总下注单数</th><th>人均下注金额</th><th>人均单数</th>" +
      "</tr></thead><tbody></tbody></table></div></div>";

    base.appendChild(page);
    applyQuickRange(page, 7);
    Array.prototype.forEach.call(page.querySelectorAll(".operations-selector"), function(selector) {
      syncSelector(selector);
    });
    renderTable(page);

    page.addEventListener("click", function(event) {
      var expandButton = event.target.closest("[data-expand]");
      var detailButton = event.target.closest("[data-detail]");
      var quickButton = event.target.closest("[data-quick-range]");
      var actionButton = event.target.closest("[data-action]");
      var selectorArrow = event.target.closest(".operations-selector-arrow");
      var caretButton = event.target.closest("[data-caret-key]");
      var selectorRoot = event.target.closest(".operations-selector");

      if (!selectorRoot) closeSelectors(page);

      if (selectorArrow) {
        var selector = selectorArrow.closest(".operations-selector");
        closeSelectors(page, selector);
        selector.classList.toggle("is-open");
        if (selector.classList.contains("is-open")) {
          selector.querySelector(".operations-selector-input").focus();
        } else {
          syncSelector(selector);
        }
        return;
      }

      if (caretButton) {
        caretButton.classList.toggle("is-open");
        var children = page.querySelector("[data-children-key='" + caretButton.getAttribute("data-caret-key") + "']");
        if (children) children.classList.toggle("is-collapsed");
        return;
      }

      if (quickButton) {
        applyQuickRange(page, Number(quickButton.getAttribute("data-quick-range")));
        renderTable(page);
        return;
      }

      if (actionButton) {
        if (actionButton.getAttribute("data-action") === "reset") {
          resetPage(page);
        } else {
          expandedRows = {};
          renderTable(page);
        }
        return;
      }

      if (expandButton) {
        var gameId = expandButton.getAttribute("data-expand");
        expandedRows[gameId] = !expandedRows[gameId];
        renderTable(page);
        return;
      }

      if (detailButton) {
        openDetailModal(page, detailButton.getAttribute("data-detail"));
      }
    });

    page.addEventListener("change", function(event) {
      if (event.target.matches("[data-selector-group]")) {
        var selectorName = event.target.getAttribute("data-selector-group");
        var groupKey = event.target.getAttribute("data-group-key");
        Array.prototype.forEach.call(page.querySelectorAll(".ops-tree-item[data-ancestor-keys~='" + groupKey + "'] [data-selector-item='" + selectorName + "']"), function(input) {
          input.checked = event.target.checked;
        });
        syncSelector(event.target.closest(".operations-selector"));
        return;
      }
      if (event.target.matches("[data-selector-all]")) {
        var allSelectorName = event.target.getAttribute("data-selector-all");
        Array.prototype.forEach.call(page.querySelectorAll("[data-selector-item='" + allSelectorName + "']"), function(input) {
          input.checked = event.target.checked;
        });
        syncSelector(event.target.closest(".operations-selector"));
        return;
      }
      if (event.target.matches("[data-selector-item]")) {
        syncSelector(event.target.closest(".operations-selector"));
        return;
      }
      if (event.target.matches("[data-filter='start'], [data-filter='end']")) {
        Array.prototype.forEach.call(page.querySelectorAll("[data-quick-range]"), function(button) {
          button.classList.remove("is-active");
        });
        renderTable(page);
      }
    });

    Array.prototype.forEach.call(page.querySelectorAll(".operations-selector-input"), function(input) {
      input.addEventListener("focus", function() {
        var selector = input.closest(".operations-selector");
        closeSelectors(page, selector);
        selector.classList.add("is-open");
        if (input.dataset.summary && input.value === input.dataset.summary) {
          input.value = "";
        }
        filterSelector(selector);
      });
      input.addEventListener("input", function() {
        var selector = input.closest(".operations-selector");
        selector.classList.add("is-open");
        filterSelector(selector);
      });
      input.addEventListener("blur", function() {
        window.setTimeout(function() {
          if (!input.closest(".operations-selector").contains(document.activeElement)) {
            syncSelector(input.closest(".operations-selector"));
          }
        }, 120);
      });
    });

    document.addEventListener("click", function(event) {
      if (!page.contains(event.target) || !event.target.closest(".operations-selector")) {
        closeSelectors(page);
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildPage);
  } else {
    buildPage();
  }
})();
