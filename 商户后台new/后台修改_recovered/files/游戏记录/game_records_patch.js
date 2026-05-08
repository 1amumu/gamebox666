(function() {
  var records = [
    ["GR202605080001", "2026-05-08 10:42:18", "R1776073077", "P930184", "火热辣椒", "INR", 884.50, 300.00, "2.95", "T2", "高倍池", "点控", "8,981,288.88", "8,982,173.38"],
    ["GR202605080002", "2026-05-08 10:39:06", "R1776073012", "P730029", "发财树", "INR", -240.00, 240.00, "0.00", "T1", "普通池", "普通", "2,451,600.20", "2,451,360.20"],
    ["GR202605080003", "2026-05-08 10:33:41", "R1776072980", "P881206", "关云长", "USDT", 126.40, 80.00, "2.58", "T3", "普通池", "放水", "19,836.72", "19,963.12"],
    ["GR202605080004", "2026-05-08 10:28:11", "R1776072877", "P190773", "秦皇传说", "INR", -500.00, 500.00, "0.00", "T1", "普通池", "点杀", "601,200.00", "600,700.00"],
    ["GR202605080005", "2026-05-08 10:21:34", "R1776072809", "P665021", "丛林之王", "BRL", 342.10, 200.00, "2.71", "T2", "高倍池", "普通", "72,441.31", "72,783.41"],
    ["GR202605080006", "2026-05-08 10:17:52", "R1776072770", "P408812", "罗马X", "INR", -120.00, 120.00, "0.00", "T1", "普通池", "普通", "148,902.55", "148,782.55"],
    ["GR202605080007", "2026-05-08 10:12:25", "R1776072704", "P177607", "火热辣椒", "INR", 1860.00, 800.00, "3.33", "T4", "高倍池", "放水", "989,218.88", "991,078.88"],
    ["GR202605080008", "2026-05-08 10:08:10", "R1776072682", "P205901", "发财树", "USDT", -36.00, 36.00, "0.00", "T1", "普通池", "普通", "8,451.00", "8,415.00"],
    ["GR202605080009", "2026-05-08 10:04:49", "R1776072601", "P719334", "关云长", "INR", 75.50, 50.00, "2.51", "T2", "普通池", "普通", "36,780.25", "36,855.75"],
    ["GR202605080010", "2026-05-08 09:58:27", "R1776072555", "P882011", "丛林之王", "BRL", -260.00, 260.00, "0.00", "T1", "普通池", "点杀", "12,900.00", "12,640.00"],
    ["GR202605080011", "2026-05-08 09:51:04", "R1776072490", "P337126", "麻将胡了", "INR", 420.00, 180.00, "3.33", "T3", "高倍池", "普通", "78,340.00", "78,760.00"],
    ["GR202605080012", "2026-05-08 09:44:19", "R1776072431", "P998103", "糖果派对", "USDT", -92.00, 92.00, "0.00", "T1", "普通池", "点杀", "6,214.30", "6,122.30"],
    ["GR202605080013", "2026-05-08 09:38:52", "R1776072388", "P721004", "赏金女王", "BRL", 650.00, 250.00, "3.60", "T2", "高倍池", "放水", "44,280.10", "44,930.10"],
    ["GR202605080014", "2026-05-08 09:31:37", "R1776072301", "P802771", "宝石矿工", "INR", -150.00, 150.00, "0.00", "T1", "普通池", "普通", "18,920.00", "18,770.00"]
  ];

  var gameTree = [
    {
      type: "SLOT",
      brands: [
        {
          name: "PG",
          games: [
            { id: "PG01", name: "麻将胡了" },
            { id: "PG02", name: "糖果派对" },
            { id: "PG03", name: "赏金女王" },
            { id: "PG04", name: "宝石矿工" },
            { id: "PG05", name: "寻宝黄金城" }
          ]
        },
        {
          name: "JILI",
          games: [
            { id: "2", name: "秦皇传说" },
            { id: "102", name: "罗马X" },
            { id: "5", name: "火热辣椒" },
            { id: "6", name: "发财树" },
            { id: "4", name: "关云长" },
            { id: "16", name: "丛林之王" }
          ]
        }
      ]
    }
  ];

  function money(value) {
    var sign = value > 0 ? "+" : "";
    return sign + value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function rowHtml(row) {
    var winClass = row[6] >= 0 ? "is-positive" : "is-negative";
    return "<tr>" +
      "<td><button class=\"game-record-link\" data-record=\"" + row[0] + "\">" + row[0] + "</button></td>" +
      "<td>" + row[1] + "</td><td>" + row[2] + "</td>" +
      "<td><button class=\"game-record-link\" data-player=\"" + row[3] + "\">" + row[3] + "</button></td>" +
      "<td>" + row[4] + "</td><td>" + row[5] + "</td>" +
      "<td class=\"" + winClass + "\">" + money(row[6]) + "</td>" +
      "<td>" + money(row[7]).replace("+", "") + "</td><td>" + row[8] + "</td><td>" + row[9] + "</td>" +
      "<td><span class=\"game-record-pill\">" + row[10] + "</span></td>" +
      "<td><span class=\"game-record-strategy\">" + row[11] + "</span></td>" +
      "<td>" + row[12] + "</td><td>" + row[13] + "</td>" +
    "</tr>";
  }

  function renderRows(root, rows) {
    root.querySelector(".game-records-table tbody").innerHTML = rows.map(rowHtml).join("");
  }

  function gameFilterHtml() {
    var tree = gameTree.map(function(typeNode) {
      var brands = typeNode.brands.map(function(brand) {
        var brandKey = brand.name.toLowerCase();
        var games = brand.games.map(function(game, index) {
          var checked = brand.name === "JILI" && index >= 2 ? " checked" : "";
          return "<label class=\"game-filter-game\" data-game-row=\"" + game.id + " " + game.name + "\" data-game-brand=\"" + brandKey + "\"><input type=\"checkbox\" data-game-value=\"" + game.name + "\"" + checked + "><span>【" + game.id + "】" + game.name + "</span></label>";
        }).join("");
        return "<div class=\"game-filter-tree-row game-filter-provider\" data-game-row=\"" + brand.name + "\" data-brand-row=\"" + brandKey + "\"><button class=\"game-filter-caret is-open\" type=\"button\" data-brand-toggle=\"" + brandKey + "\"></button><label><input type=\"checkbox\" data-game-group=\"" + brandKey + "\"><span>" + brand.name + "</span></label></div>" +
          "<div class=\"game-filter-games\" data-brand-games=\"" + brandKey + "\">" + games + "</div>";
      }).join("");
      return "<div class=\"game-filter-tree-row game-filter-root\" data-game-row=\"" + typeNode.type + "\"><button class=\"game-filter-caret is-open\" type=\"button\" data-type-toggle=\"" + typeNode.type + "\"></button><label><input type=\"checkbox\" data-game-group=\"slot\"><span>" + typeNode.type + "</span></label></div>" + brands;
    }).join("");

    return "<div class=\"game-filter-field\"><span>选择游戏</span><div class=\"game-filter\">" +
      "<div class=\"game-filter-trigger\"><input class=\"game-filter-input\" placeholder=\"请选择 / 输入游戏名\"><button class=\"game-filter-arrow\" type=\"button\" aria-label=\"展开游戏筛选\"></button></div>" +
      "<div class=\"game-filter-menu\">" + tree + "</div>" +
    "</div></div>";
  }

  function buildPage() {
    var base = document.getElementById("base");
    if (!base || document.querySelector(".game-records-page")) return;

    var page = document.createElement("div");
    page.className = "game-records-page";
    page.innerHTML =
      "<div class=\"game-records-titlebar\"><h1>游戏记录</h1></div>" +
      "<div class=\"game-records-filters\">" +
        "<label><span>玩家ID</span><input data-filter=\"player\" placeholder=\"请输入玩家ID\"></label>" +
        "<label><span>记录ID</span><input data-filter=\"record\" placeholder=\"请输入记录ID\"></label>" +
        gameFilterHtml() +
        "<label><span>选择货币</span><select data-filter=\"currency\"><option value=\"\">全部货币</option><option>INR</option><option>USDT</option><option>BRL</option></select></label>" +
        "<label><span>控制策略</span><select data-filter=\"strategy\"><option value=\"\">全部策略</option><option>普通</option><option>点控</option><option>点杀</option><option>放水</option></select></label>" +
        "<label><span>时间范围</span><input data-filter=\"time\" value=\"2026-05-08 00:00 - 2026-05-08 23:59\"></label>" +
        "<div class=\"game-records-actions\"><button type=\"button\" data-action=\"reset\">重置</button><button type=\"button\" data-action=\"query\">查询</button></div>" +
      "</div>" +
      "<div class=\"game-records-table-card\"><div class=\"game-records-table-wrap\"><table class=\"game-records-table\"><thead><tr><th>记录ID</th><th>时间</th><th>牌局编号</th><th>玩家id</th><th>游戏名称</th><th>货币</th><th>玩家输赢</th><th>下注金额</th><th>返奖倍数</th><th>T</th><th>普通池/高倍池</th><th>控制策略</th><th>下注前</th><th>结算后</th></tr></thead><tbody></tbody></table></div></div>";

    base.appendChild(page);
    renderRows(page, records);
    syncGameFilter(page);

    page.addEventListener("click", function(event) {
      var action = event.target.getAttribute("data-action");
      if (event.target.classList.contains("game-filter-arrow")) {
        page.querySelector(".game-filter").classList.toggle("is-open");
      }
      if (!event.target.closest(".game-filter")) {
        page.querySelector(".game-filter").classList.remove("is-open");
      }
      if (event.target.classList.contains("game-filter-caret")) {
        event.target.classList.toggle("is-open");
        var brand = event.target.getAttribute("data-brand-toggle");
        if (brand) {
          page.querySelector("[data-brand-games='" + brand + "']").classList.toggle("is-collapsed");
        }
        if (event.target.getAttribute("data-type-toggle")) {
          Array.prototype.forEach.call(page.querySelectorAll("[data-brand-row], [data-brand-games]"), function(item) {
            item.classList.toggle("is-collapsed");
          });
        }
      }
      if (action === "reset") {
        Array.prototype.forEach.call(page.querySelectorAll("[data-filter]"), function(field) {
          field.value = field.getAttribute("data-filter") === "time" ? "2026-05-08 00:00 - 2026-05-08 23:59" : "";
        });
        page.querySelector(".game-filter-input").value = "";
        Array.prototype.forEach.call(page.querySelectorAll("[data-game-value]"), function(input) {
          input.checked = false;
        });
        Array.prototype.forEach.call(page.querySelectorAll("[data-game-group]"), function(input) {
          input.checked = false;
          input.indeterminate = false;
        });
        Array.prototype.forEach.call(page.querySelectorAll(".game-filter-game, .game-filter-tree-row"), function(row) {
          row.hidden = false;
        });
        syncGameFilter(page);
        renderRows(page, records);
      }
      if (action === "query") {
        var player = page.querySelector("[data-filter='player']").value.trim();
        var record = page.querySelector("[data-filter='record']").value.trim();
        var games = selectedGames(page);
        var currency = page.querySelector("[data-filter='currency']").value;
        var strategy = page.querySelector("[data-filter='strategy']").value;
        renderRows(page, records.filter(function(row) {
          return (!player || row[3].indexOf(player) !== -1) && (!record || row[0].indexOf(record) !== -1) && (!games.length || games.indexOf(row[4]) !== -1) && (!currency || row[5] === currency) && (!strategy || row[11] === strategy);
        }));
      }
    });

    page.addEventListener("change", function(event) {
      if (event.target.matches("[data-game-group='slot']")) {
        Array.prototype.forEach.call(page.querySelectorAll("[data-game-value], [data-game-group]:not([data-game-group='slot'])"), function(input) {
          input.checked = event.target.checked;
        });
        syncGameFilter(page);
      }
      if (event.target.matches("[data-game-group]:not([data-game-group='slot'])")) {
        var brand = event.target.getAttribute("data-game-group");
        Array.prototype.forEach.call(page.querySelectorAll("[data-brand-games='" + brand + "'] [data-game-value]"), function(input) {
          input.checked = event.target.checked;
        });
        syncGameFilter(page);
      }
      if (event.target.matches("[data-game-value]")) {
        syncGameFilter(page);
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

  function selectedGames(root) {
    return Array.prototype.map.call(root.querySelectorAll("[data-game-value]:checked"), function(input) {
      return input.getAttribute("data-game-value");
    });
  }

  function syncGameFilter(root) {
    var selected = selectedGames(root);
    var input = root.querySelector(".game-filter-input");
    var slot = root.querySelector("[data-game-group='slot']");
    Array.prototype.forEach.call(root.querySelectorAll("[data-game-group]:not([data-game-group='slot'])"), function(group) {
      var brand = group.getAttribute("data-game-group");
      var items = root.querySelectorAll("[data-brand-games='" + brand + "'] [data-game-value]");
      var checked = root.querySelectorAll("[data-brand-games='" + brand + "'] [data-game-value]:checked");
      group.checked = items.length > 0 && checked.length === items.length;
      group.indeterminate = checked.length > 0 && checked.length < items.length;
    });
    if (slot) {
      var all = root.querySelectorAll("[data-game-value]");
      slot.checked = selected.length === all.length;
      slot.indeterminate = selected.length > 0 && selected.length < all.length;
    }
    if (!input.value || input.value.indexOf("已选") === 0) {
      input.value = selected.length ? "已选 " + selected.length + " 个游戏" : "";
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildPage);
  } else {
    buildPage();
  }
})();
