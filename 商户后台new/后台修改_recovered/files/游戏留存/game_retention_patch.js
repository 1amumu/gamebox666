(function() {
  var rows = [
    { date: "2026-05-10", name: "全部", gameId: "-", newUsers: 6842, betUsers: 3916, loginUsers: 11028, d1: "43.8%", d3: "28.6%", d7: "18.4%", d14: "11.2%", d30: "6.5%", total: true },
    { date: "2026-05-10", name: "Aviator", gameId: "SPR-1001", newUsers: 1260, betUsers: 884, loginUsers: 2380, d1: "48.6%", d3: "32.4%", d7: "21.8%", d14: "13.7%", d30: "8.2%" },
    { date: "2026-05-10", name: "火热辣椒", gameId: "JILI-109", newUsers: 936, betUsers: 612, loginUsers: 1688, d1: "45.2%", d3: "29.7%", d7: "19.5%", d14: "11.9%", d30: "6.8%" },
    { date: "2026-05-10", name: "麻将胡了", gameId: "PG-74", newUsers: 882, betUsers: 596, loginUsers: 1546, d1: "44.1%", d3: "27.9%", d7: "17.8%", d14: "10.6%", d30: "6.1%" },
    { date: "2026-05-10", name: "发财树", gameId: "JILI-115", newUsers: 746, betUsers: 488, loginUsers: 1304, d1: "42.7%", d3: "26.8%", d7: "16.9%", d14: "10.1%", d30: "5.8%" },
    { date: "2026-05-10", name: "赏金女王", gameId: "PG-84", newUsers: 620, betUsers: 406, loginUsers: 1092, d1: "41.8%", d3: "25.4%", d7: "15.8%", d14: "9.4%", d30: "5.2%" },
    { date: "2026-05-10", name: "丛林之王", gameId: "JILI-212", newUsers: 586, betUsers: 352, loginUsers: 952, d1: "39.6%", d3: "24.8%", d7: "15.1%", d14: "8.9%", d30: "4.9%" },
    { date: "2026-05-10", name: "Mini Roulette", gameId: "EVO-201", newUsers: 438, betUsers: 302, loginUsers: 782, d1: "40.9%", d3: "25.1%", d7: "15.5%", d14: "9.1%", d30: "5.0%" },
    { date: "2026-05-10", name: "Lightning Dice", gameId: "EVO-228", newUsers: 374, betUsers: 276, loginUsers: 704, d1: "38.2%", d3: "23.7%", d7: "14.6%", d14: "8.3%", d30: "4.6%" }
  ];

  var gameTree = [
    { type: "CRASH", brands: [{ name: "SPRIBE", games: [{ id: "SPR-1001", name: "Aviator" }] }] },
    {
      type: "SLOT",
      brands: [
        { name: "JILI", games: [{ id: "JILI-109", name: "火热辣椒" }, { id: "JILI-115", name: "发财树" }, { id: "JILI-212", name: "丛林之王" }] },
        { name: "PG", games: [{ id: "PG-74", name: "麻将胡了" }, { id: "PG-84", name: "赏金女王" }] }
      ]
    },
    { type: "TABLE", brands: [{ name: "EVOLUTION", games: [{ id: "EVO-201", name: "Mini Roulette" }, { id: "EVO-228", name: "Lightning Dice" }] }] }
  ];

  function integer(value) {
    return Number(value).toLocaleString("en-US");
  }

  function rowHtml(row) {
    return "<tr class=\"" + (row.total ? "is-total" : "") + "\">" +
      "<td>" + row.date + "</td>" +
      "<td>" + row.name + "</td>" +
      "<td>" + row.gameId + "</td>" +
      "<td>" + integer(row.newUsers) + "</td>" +
      "<td>" + integer(row.betUsers) + "</td>" +
      "<td>" + integer(row.loginUsers) + "</td>" +
      "<td><span class=\"retention-rate\">" + row.d1 + "</span></td>" +
      "<td><span class=\"retention-rate\">" + row.d3 + "</span></td>" +
      "<td><span class=\"retention-rate\">" + row.d7 + "</span></td>" +
      "<td><span class=\"retention-rate is-low\">" + row.d14 + "</span></td>" +
      "<td><span class=\"retention-rate is-low\">" + row.d30 + "</span></td>" +
    "</tr>";
  }

  function selectedGames(root) {
    return Array.prototype.map.call(root.querySelectorAll("[data-game-value]:checked"), function(input) {
      return input.getAttribute("data-game-value");
    });
  }

  function renderRows(page) {
    var selected = selectedGames(page);
    var date = page.querySelector("[data-filter='date']").value.trim();
    var filtered = rows.filter(function(row) {
      var matchesDate = !date || row.date.indexOf(date) !== -1;
      var matchesGame = !selected.length || selected.indexOf(row.name) !== -1;
      return row.total || (matchesDate && matchesGame);
    });
    var total = filtered.filter(function(row) { return row.total; });
    var normal = filtered.filter(function(row) { return !row.total; }).sort(function(a, b) { return b.betUsers - a.betUsers; });
    page.querySelector(".retention-table tbody").innerHTML = total.concat(normal).map(rowHtml).join("");
  }

  function gameFilterHtml() {
    var tree = gameTree.map(function(typeNode) {
      var brands = typeNode.brands.map(function(brand) {
        var brandKey = brand.name.toLowerCase();
        var games = brand.games.map(function(game) {
          return "<label class=\"game-filter-game\" data-game-row=\"" + game.id + " " + game.name + "\" data-game-brand=\"" + brandKey + "\"><input type=\"checkbox\" data-game-value=\"" + game.name + "\"><span>【" + game.id + "】" + game.name + "</span></label>";
        }).join("");
        return "<div class=\"game-filter-tree-row game-filter-provider\" data-game-row=\"" + brand.name + "\" data-brand-row=\"" + brandKey + "\"><button class=\"game-filter-caret is-open\" type=\"button\" data-brand-toggle=\"" + brandKey + "\"></button><label><input type=\"checkbox\" data-game-group=\"" + brandKey + "\"><span>" + brand.name + "</span></label></div>" +
          "<div class=\"game-filter-games\" data-brand-games=\"" + brandKey + "\">" + games + "</div>";
      }).join("");
      return "<div class=\"game-filter-tree-row game-filter-root\" data-game-row=\"" + typeNode.type + "\"><button class=\"game-filter-caret is-open\" type=\"button\" data-type-toggle=\"" + typeNode.type + "\"></button><label><input type=\"checkbox\" data-game-group=\"" + typeNode.type.toLowerCase() + "\"><span>" + typeNode.type + "</span></label></div>" + brands;
    }).join("");

    return "<div class=\"game-filter-field\"><span>选择游戏</span><div class=\"game-filter\">" +
      "<div class=\"game-filter-trigger\"><input class=\"game-filter-input\" placeholder=\"请选择 / 输入游戏名\"><button class=\"game-filter-arrow\" type=\"button\" aria-label=\"展开游戏筛选\"></button></div>" +
      "<div class=\"game-filter-menu\"><div class=\"game-filter-tree-row game-filter-all\" data-game-row=\"全部\"><label><input type=\"checkbox\" data-game-all><span>全部</span></label></div>" + tree + "</div>" +
    "</div></div>";
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
      var items = [];
      var cursor = typeRow.nextElementSibling;
      while (cursor && !cursor.classList.contains("game-filter-root")) {
        items = items.concat(Array.prototype.slice.call(cursor.querySelectorAll("[data-game-value]")));
        cursor = cursor.nextElementSibling;
      }
      var checked = items.filter(function(item) { return item.checked; });
      group.checked = items.length > 0 && checked.length === items.length;
      group.indeterminate = checked.length > 0 && checked.length < items.length;
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

  function resetPage(page) {
    page.querySelector("[data-filter='date']").value = "2026-05-10";
    page.querySelector(".game-filter-input").value = "";
    Array.prototype.forEach.call(page.querySelectorAll("[data-game-value], [data-game-group], [data-game-all]"), function(input) {
      input.checked = false;
      input.indeterminate = false;
    });
    Array.prototype.forEach.call(page.querySelectorAll(".game-filter-game, .game-filter-tree-row"), function(row) {
      row.hidden = false;
    });
    syncGameFilter(page);
    renderRows(page);
  }

  function hideLegacyPanels() {
    for (var id = 1509; id <= 1540; id += 1) {
      var element = document.getElementById("u" + id);
      if (element) element.style.display = "none";
    }
  }

  function buildPage() {
    var base = document.getElementById("base");
    if (!base || document.querySelector(".retention-page")) return;

    hideLegacyPanels();

    var page = document.createElement("div");
    page.className = "retention-page";
    page.innerHTML =
      "<div class=\"game-records-titlebar retention-titlebar\"><h1>游戏留存</h1></div>" +
      "<div class=\"retention-filters\">" +
        gameFilterHtml() +
        "<label class=\"retention-filter-field\"><span>日期</span><input data-filter=\"date\" value=\"2026-05-10\"></label>" +
        "<div class=\"retention-actions\"><button type=\"button\" data-action=\"reset\">重置</button><button type=\"button\" class=\"is-primary\" data-action=\"query\">查询</button></div>" +
      "</div>" +
      "<div class=\"retention-table-card\"><div class=\"retention-table-wrap\"><table class=\"retention-table\"><thead><tr><th>日期</th><th>游戏名称</th><th>游戏ID</th><th>新用户数</th><th>下注用户数</th><th>登录用户数</th><th>次日留存</th><th>3日留存</th><th>7日留存</th><th>14日留存</th><th>30日留存</th></tr></thead><tbody></tbody></table></div></div>";

    base.appendChild(page);
    renderRows(page);
    syncGameFilter(page);

    page.addEventListener("click", function(event) {
      var actionButton = event.target.closest("[data-action]");
      if (event.target.classList.contains("game-filter-arrow")) {
        page.querySelector(".game-filter").classList.toggle("is-open");
        return;
      }
      if (event.target.classList.contains("game-filter-caret")) {
        event.target.classList.toggle("is-open");
        var brand = event.target.getAttribute("data-brand-toggle");
        if (brand) page.querySelector("[data-brand-games='" + brand + "']").classList.toggle("is-collapsed");
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
      if (actionButton && actionButton.getAttribute("data-action") === "reset") resetPage(page);
      if (actionButton && actionButton.getAttribute("data-action") === "query") renderRows(page);
    });

    page.addEventListener("change", function(event) {
      if (event.target.matches("[data-filter='date']")) renderRows(page);
      if (event.target.matches("[data-game-all]")) {
        Array.prototype.forEach.call(page.querySelectorAll("[data-game-value], [data-game-group]"), function(input) {
          input.checked = event.target.checked;
          input.indeterminate = false;
        });
        syncGameFilter(page);
        renderRows(page);
      }
      if (event.target.matches("[data-game-group]")) {
        var group = event.target.getAttribute("data-game-group");
        var brandGames = page.querySelectorAll("[data-brand-games='" + group + "'] [data-game-value]");
        if (brandGames.length) {
          Array.prototype.forEach.call(brandGames, function(input) { input.checked = event.target.checked; });
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
        renderRows(page);
      }
      if (event.target.matches("[data-game-value]")) {
        syncGameFilter(page);
        renderRows(page);
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
