(function() {
  var merchants = [
    { name: "全部", siteId: "-", region: "全部", online: 1458, peak: 2186, logins: 9820, bettors: 4361, betAmount: 986240, betOrders: 18746, total: true },
    { name: "印度运营商", siteId: "1042", region: "印度", online: 326, peak: 512, logins: 1886, bettors: 820, betAmount: 216580, betOrders: 4288 },
    { name: "孟买主站", siteId: "1035", region: "印度", online: 284, peak: 446, logins: 1620, bettors: 741, betAmount: 183760, betOrders: 3562 },
    { name: "班加罗尔站", siteId: "1036", region: "印度", online: 198, peak: 338, logins: 1284, bettors: 590, betAmount: 139420, betOrders: 2714 },
    { name: "圣保罗主站", siteId: "2001", region: "巴西", online: 226, peak: 391, logins: 1498, bettors: 688, betAmount: 168350, betOrders: 3128 },
    { name: "里约站", siteId: "2002", region: "巴西", online: 164, peak: 263, logins: 1040, bettors: 482, betAmount: 104980, betOrders: 2096 },
    { name: "雅加达站", siteId: "3002", region: "东南亚", online: 148, peak: 224, logins: 996, bettors: 430, betAmount: 93640, betOrders: 1834 },
    { name: "马尼拉站", siteId: "3001", region: "东南亚", online: 112, peak: 170, logins: 738, bettors: 328, betAmount: 79470, betOrders: 1124 }
  ];

  var games = [
    { name: "全部", vendor: "全部", type: "全部", online: 1458, peak: 2186, logins: 9820, bettors: 4361, betAmount: 986240, betOrders: 18746, total: true },
    { id: "SPR-1001", name: "Aviator", vendor: "SPRIBE", type: "CRASH", online: 382, peak: 602, logins: 2440, bettors: 1326, betAmount: 284960, betOrders: 5318 },
    { id: "JILI-109", name: "火热辣椒", vendor: "JILI", type: "SLOT", online: 218, peak: 346, logins: 1330, bettors: 581, betAmount: 137420, betOrders: 2668 },
    { id: "JILI-115", name: "发财树", vendor: "JILI", type: "SLOT", online: 176, peak: 288, logins: 1188, bettors: 534, betAmount: 116850, betOrders: 2184 },
    { id: "PG-74", name: "麻将胡了", vendor: "PG", type: "SLOT", online: 205, peak: 312, logins: 1422, bettors: 619, betAmount: 149730, betOrders: 2816 },
    { id: "PG-84", name: "赏金女王", vendor: "PG", type: "SLOT", online: 154, peak: 226, logins: 934, bettors: 402, betAmount: 92840, betOrders: 1715 },
    { id: "EVO-201", name: "Mini Roulette", vendor: "EVOLUTION", type: "TABLE", online: 96, peak: 152, logins: 681, bettors: 260, betAmount: 64880, betOrders: 1006 },
    { id: "EVO-228", name: "Lightning Dice", vendor: "EVOLUTION", type: "TABLE", online: 78, peak: 129, logins: 506, bettors: 216, betAmount: 50270, betOrders: 864 },
    { id: "JILI-212", name: "丛林之王", vendor: "JILI", type: "SLOT", online: 149, peak: 237, logins: 910, bettors: 423, betAmount: 89190, betOrders: 2175 }
  ];

  var gameTree = [
    {
      type: "CRASH",
      brands: [
        { name: "SPRIBE", games: [{ id: "SPR-1001", name: "Aviator" }] }
      ]
    },
    {
      type: "SLOT",
      brands: [
        { name: "JILI", games: [{ id: "JILI-109", name: "火热辣椒" }, { id: "JILI-115", name: "发财树" }, { id: "JILI-212", name: "丛林之王" }] },
        { name: "PG", games: [{ id: "PG-74", name: "麻将胡了" }, { id: "PG-84", name: "赏金女王" }] }
      ]
    },
    {
      type: "TABLE",
      brands: [
        { name: "EVOLUTION", games: [{ id: "EVO-201", name: "Mini Roulette" }, { id: "EVO-228", name: "Lightning Dice" }] }
      ]
    }
  ];

  function integer(value) {
    return Number(value).toLocaleString("en-US");
  }

  function money(value) {
    return Number(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function merchantRowHtml(row) {
    return "<tr class=\"" + (row.total ? "is-total" : "") + "\">" +
      "<td>" + (row.total ? "全部" : row.name + "-" + row.siteId) + "</td>" +
      "<td>" + row.region + "</td>" +
      "<td>" + integer(row.online) + "</td>" +
      "<td>" + integer(row.peak) + "</td>" +
      "<td>" + integer(row.logins) + "</td>" +
      "<td>" + integer(row.bettors) + "</td>" +
      "<td>" + money(row.betAmount) + "</td>" +
      "<td>" + integer(row.betOrders) + "</td>" +
    "</tr>";
  }

  function gameRowHtml(row) {
    return "<tr class=\"" + (row.total ? "is-total" : "") + "\">" +
      "<td>" + row.name + "</td>" +
      "<td>" + row.vendor + "</td>" +
      "<td><span class=\"online-data-tag\">" + row.type + "</span></td>" +
      "<td>" + integer(row.online) + "</td>" +
      "<td>" + integer(row.peak) + "</td>" +
      "<td>" + integer(row.logins) + "</td>" +
      "<td>" + integer(row.bettors) + "</td>" +
      "<td>" + money(row.betAmount) + "</td>" +
      "<td>" + integer(row.betOrders) + "</td>" +
    "</tr>";
  }

  function setMode(page, mode) {
    page.setAttribute("data-mode", mode);
    Array.prototype.forEach.call(page.querySelectorAll("[data-view-mode]"), function(button) {
      button.classList.toggle("is-active", button.getAttribute("data-view-mode") === mode);
    });
    page.querySelector("[data-filter-group='merchant']").hidden = mode !== "merchant";
    page.querySelector("[data-filter-group='game']").hidden = mode !== "game";
    renderTable(page);
  }

  function getState(page) {
    return {
      mode: page.getAttribute("data-mode") || "merchant",
      region: page.querySelector("[data-filter='region']").value,
      games: selectedGames(page)
    };
  }

  function renderTable(page) {
    var state = getState(page);
    var table = page.querySelector(".online-data-table");
    var thead = table.querySelector("thead");
    var tbody = table.querySelector("tbody");

    if (state.mode === "merchant") {
      var merchantRows = merchants.filter(function(row) {
        return row.total || !state.region || row.region === state.region;
      });
      thead.innerHTML = "<tr><th>商户名称-站点ID</th><th>地区</th><th>在线人数</th><th>今日峰值在线</th><th>今日登录人数</th><th>今日下注人数</th><th>今日下注金额</th><th>今日下注单数</th></tr>";
      tbody.innerHTML = merchantRows.map(merchantRowHtml).join("");
      table.classList.remove("is-game-mode");
      return;
    }

    var gameRows = games.filter(function(row) {
      var matchesGame = !state.games.length || state.games.indexOf(row.name) !== -1;
      return row.total || matchesGame;
    });
    thead.innerHTML = "<tr><th>游戏名称</th><th>游戏厂商</th><th>游戏类型</th><th>在线人数</th><th>今日峰值在线</th><th>今日登录人数</th><th>今日下注人数</th><th>今日下注金额</th><th>今日下注单数</th></tr>";
    tbody.innerHTML = gameRows.map(gameRowHtml).join("");
    table.classList.add("is-game-mode");
  }

  function resetPage(page) {
    page.querySelector("[data-filter='region']").value = "";
    page.querySelector(".game-filter-input").value = "";
    Array.prototype.forEach.call(page.querySelectorAll("[data-game-value], [data-game-group]"), function(input) {
      input.checked = false;
      input.indeterminate = false;
    });
    Array.prototype.forEach.call(page.querySelectorAll(".game-filter-game, .game-filter-tree-row"), function(row) {
      row.hidden = false;
    });
    syncGameFilter(page);
    setMode(page, "merchant");
  }

  function gameFilterHtml() {
    var tree = gameTree.map(function(typeNode) {
      var brands = typeNode.brands.map(function(brand) {
        var brandKey = brand.name.toLowerCase();
        var gameItems = brand.games.map(function(game) {
          return "<label class=\"game-filter-game\" data-game-row=\"" + game.id + " " + game.name + "\" data-game-brand=\"" + brandKey + "\"><input type=\"checkbox\" data-game-value=\"" + game.name + "\"><span>【" + game.id + "】" + game.name + "</span></label>";
        }).join("");
        return "<div class=\"game-filter-tree-row game-filter-provider\" data-game-row=\"" + brand.name + "\" data-brand-row=\"" + brandKey + "\"><button class=\"game-filter-caret is-open\" type=\"button\" data-brand-toggle=\"" + brandKey + "\"></button><label><input type=\"checkbox\" data-game-group=\"" + brandKey + "\"><span>" + brand.name + "</span></label></div>" +
          "<div class=\"game-filter-games\" data-brand-games=\"" + brandKey + "\">" + gameItems + "</div>";
      }).join("");
      return "<div class=\"game-filter-tree-row game-filter-root\" data-game-row=\"" + typeNode.type + "\"><button class=\"game-filter-caret is-open\" type=\"button\" data-type-toggle=\"" + typeNode.type + "\"></button><label><input type=\"checkbox\" data-game-group=\"" + typeNode.type.toLowerCase() + "\"><span>" + typeNode.type + "</span></label></div>" + brands;
    }).join("");

    return "<div class=\"game-filter-field\"><span>选择游戏</span><div class=\"game-filter\">" +
      "<div class=\"game-filter-trigger\"><input class=\"game-filter-input\" placeholder=\"请选择 / 输入游戏名\"><button class=\"game-filter-arrow\" type=\"button\" aria-label=\"展开游戏筛选\"></button></div>" +
      "<div class=\"game-filter-menu\"><div class=\"game-filter-tree-row game-filter-all\" data-game-row=\"全部\"><label><input type=\"checkbox\" data-game-all><span>全部</span></label></div>" + tree + "</div>" +
    "</div></div>";
  }

  function selectedGames(root) {
    return Array.prototype.map.call(root.querySelectorAll("[data-game-value]:checked"), function(input) {
      return input.getAttribute("data-game-value");
    });
  }

  function syncGameFilter(root) {
    var selected = selectedGames(root);
    var input = root.querySelector(".game-filter-input");
    var allToggle = root.querySelector("[data-game-all]");

    Array.prototype.forEach.call(root.querySelectorAll("[data-game-group]"), function(group) {
      var groupName = group.getAttribute("data-game-group");
      var brandItems = root.querySelectorAll("[data-brand-games='" + groupName + "'] [data-game-value]");
      if (brandItems.length) {
        var brandChecked = root.querySelectorAll("[data-brand-games='" + groupName + "'] [data-game-value]:checked");
        group.checked = brandChecked.length === brandItems.length;
        group.indeterminate = brandChecked.length > 0 && brandChecked.length < brandItems.length;
        return;
      }

      var typeRow = group.closest(".game-filter-root");
      if (!typeRow) return;
      var rows = [];
      var cursor = typeRow.nextElementSibling;
      while (cursor && !cursor.classList.contains("game-filter-root")) {
        if (cursor.matches("[data-brand-games]")) rows.push(cursor);
        cursor = cursor.nextElementSibling;
      }
      var typeItems = rows.reduce(function(items, row) {
        return items.concat(Array.prototype.slice.call(row.querySelectorAll("[data-game-value]")));
      }, []);
      var typeChecked = typeItems.filter(function(item) { return item.checked; });
      group.checked = typeItems.length > 0 && typeChecked.length === typeItems.length;
      group.indeterminate = typeChecked.length > 0 && typeChecked.length < typeItems.length;
    });

    if (allToggle) {
      var allGames = root.querySelectorAll("[data-game-value]");
      allToggle.checked = allGames.length > 0 && selected.length === allGames.length;
      allToggle.indeterminate = selected.length > 0 && selected.length < allGames.length;
    }

    if (input && (!input.value || input.value.indexOf("已选") === 0)) {
      input.value = selected.length ? "已选 " + selected.length + " 个游戏" : "";
    }
  }

  function hideLegacyPanels() {
    for (var id = 1391; id <= 1416; id += 1) {
      var element = document.getElementById("u" + id);
      if (element) element.style.display = "none";
    }
  }

  function buildPage() {
    var base = document.getElementById("base");
    if (!base || document.querySelector(".online-data-page")) return;

    hideLegacyPanels();

    var page = document.createElement("div");
    page.className = "online-data-page";
    page.setAttribute("data-mode", "merchant");
    page.innerHTML =
      "<div class=\"game-records-titlebar online-data-titlebar\"><h1>玩家在线数据</h1></div>" +
      "<div class=\"online-data-filters\">" +
        "<div class=\"online-data-mode\"><button type=\"button\" class=\"is-active\" data-view-mode=\"merchant\">商户在线</button><button type=\"button\" data-view-mode=\"game\">游戏在线</button></div>" +
        "<label class=\"online-data-filter-field\" data-filter-group=\"merchant\"><span>选择地区</span><select data-filter=\"region\"><option value=\"\">全部地区</option><option value=\"印度\">印度</option><option value=\"巴西\">巴西</option><option value=\"东南亚\">东南亚</option></select></label>" +
        "<div class=\"online-data-filter-set\" data-filter-group=\"game\" hidden>" +
          gameFilterHtml() +
        "</div>" +
        "<div class=\"online-data-actions\"><button type=\"button\" data-action=\"reset\">重置</button><button type=\"button\" class=\"is-primary\" data-action=\"query\">查询</button></div>" +
      "</div>" +
      "<div class=\"online-data-table-card\"><div class=\"online-data-table-wrap\"><table class=\"online-data-table\"><thead></thead><tbody></tbody></table></div></div>";

    base.appendChild(page);
    renderTable(page);
    syncGameFilter(page);

    page.addEventListener("click", function(event) {
      var modeButton = event.target.closest("[data-view-mode]");
      var actionButton = event.target.closest("[data-action]");
      if (modeButton) {
        setMode(page, modeButton.getAttribute("data-view-mode"));
        return;
      }
      if (event.target.classList.contains("game-filter-arrow")) {
        page.querySelector(".game-filter").classList.toggle("is-open");
        return;
      }
      if (event.target.classList.contains("game-filter-caret")) {
        event.target.classList.toggle("is-open");
        var brand = event.target.getAttribute("data-brand-toggle");
        if (brand) {
          page.querySelector("[data-brand-games='" + brand + "']").classList.toggle("is-collapsed");
        }
        if (event.target.getAttribute("data-type-toggle")) {
          var typeRow = event.target.closest(".game-filter-root");
          var cursor = typeRow ? typeRow.nextElementSibling : null;
          while (cursor && !cursor.classList.contains("game-filter-root")) {
            cursor.classList.toggle("is-collapsed");
            cursor = cursor.nextElementSibling;
          }
        }
        return;
      }
      if (!event.target.closest(".game-filter")) {
        page.querySelector(".game-filter").classList.remove("is-open");
      }
      if (actionButton) {
        if (actionButton.getAttribute("data-action") === "reset") {
          resetPage(page);
        } else {
          renderTable(page);
        }
      }
    });

    page.addEventListener("change", function(event) {
      if (event.target.matches("[data-filter='region']")) {
        renderTable(page);
      }
      if (event.target.matches("[data-game-all]")) {
        Array.prototype.forEach.call(page.querySelectorAll("[data-game-value], [data-game-group]"), function(input) {
          input.checked = event.target.checked;
          input.indeterminate = false;
        });
        syncGameFilter(page);
        renderTable(page);
      }
      if (event.target.matches("[data-game-group]")) {
        var group = event.target.getAttribute("data-game-group");
        var brandGames = page.querySelectorAll("[data-brand-games='" + group + "'] [data-game-value]");
        if (brandGames.length) {
          Array.prototype.forEach.call(brandGames, function(input) {
            input.checked = event.target.checked;
          });
        } else {
          var typeRow = event.target.closest(".game-filter-root");
          var cursor = typeRow ? typeRow.nextElementSibling : null;
          while (cursor && !cursor.classList.contains("game-filter-root")) {
            Array.prototype.forEach.call(cursor.querySelectorAll("[data-game-value], [data-game-group]"), function(input) {
              input.checked = event.target.checked;
              input.indeterminate = false;
            });
            cursor = cursor.nextElementSibling;
          }
        }
        syncGameFilter(page);
        renderTable(page);
      }
      if (event.target.matches("[data-game-value]")) {
        syncGameFilter(page);
        renderTable(page);
      }
    });

    page.querySelector(".game-filter-input").addEventListener("focus", function() {
      page.querySelector(".game-filter").classList.add("is-open");
    });
    page.querySelector(".game-filter-input").addEventListener("input", function(event) {
      var keyword = event.target.value.trim().toLowerCase();
      Array.prototype.forEach.call(page.querySelectorAll(".game-filter-game"), function(row) {
        row.hidden = keyword && row.getAttribute("data-game-row").toLowerCase().indexOf(keyword) === -1;
      });
      page.querySelector(".game-filter").classList.add("is-open");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildPage);
  } else {
    buildPage();
  }
})();
