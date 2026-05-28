(function() {
  var dataset = {
    yesterday: [
      ["1", "M30001", "马尼拉站", "USD", 48632.05, 39182.03, 9450.02, 19.43, 1284, 246, 197.69],
      ["2", "M10001", "印度运营商", "INR", 42380.00, 34921.07, 7458.93, 17.60, 1162, 219, 193.52],
      ["3", "M20001", "圣保罗主站", "BRL", 38642.08, 32688.02, 5954.06, 15.41, 1026, 186, 207.75],
      ["4", "M10002", "孟买主站", "INR", 30269.04, 25433.01, 4836.03, 15.98, 821, 154, 196.55],
      ["5", "M30002", "雅加达站", "IDR", 26842.03, 22998.09, 3843.94, 14.32, 759, 131, 204.90],
      ["6", "M40001", "河内主站", "VND", 21980.60, 19620.10, 2360.50, 10.74, 642, 118, 186.28],
      ["7", "M50001", "曼谷站", "THB", 18620.45, 16940.30, 1680.15, 9.02, 510, 96, 193.96],
      ["8", "M60001", "东京测试站", "JPY", 14330.20, 13240.80, 1089.40, 7.60, 388, 72, 199.03],
      ["9", "M70001", "迪拜站", "AED", 12180.00, 11390.50, 789.50, 6.48, 312, 58, 210.00],
      ["10", "M80001", "新加坡站", "SGD", 10420.90, 9860.40, 560.50, 5.38, 276, 51, 204.33]
    ],
    week: [
      ["1", "M30001", "马尼拉站", "USD", 286320.50, 231820.30, 54500.20, 19.03, 8284, 1460, 196.11],
      ["2", "M10001", "印度运营商", "INR", 243800.00, 199210.70, 44589.30, 18.29, 7628, 1298, 187.83],
      ["3", "M20001", "圣保罗主站", "BRL", 216420.80, 184880.20, 31540.60, 14.57, 6264, 965, 224.27],
      ["4", "M10002", "孟买主站", "INR", 182690.40, 154330.10, 28360.30, 15.52, 5210, 848, 215.44],
      ["5", "M30002", "雅加达站", "IDR", 148420.30, 129980.90, 18439.40, 12.42, 4596, 710, 209.04],
      ["6", "M40001", "河内主站", "VND", 122380.60, 109920.10, 12460.50, 10.18, 3860, 631, 193.95],
      ["7", "M50001", "曼谷站", "THB", 98610.50, 87880.40, 10730.10, 10.88, 3088, 518, 190.37],
      ["8", "M60001", "东京测试站", "JPY", 74620.20, 69580.80, 5039.40, 6.75, 2140, 326, 228.90],
      ["9", "M70001", "迪拜站", "AED", 61820.00, 57290.30, 4529.70, 7.33, 1832, 286, 216.15],
      ["10", "M80001", "新加坡站", "SGD", 54320.90, 51180.40, 3140.50, 5.78, 1620, 244, 222.63]
    ],
    month: [
      ["1", "M30001", "马尼拉站", "USD", 486320.50, 391820.30, 94500.20, 19.43, 12840, 2460, 197.69],
      ["2", "M10001", "印度运营商", "INR", 423800.00, 349210.70, 74589.30, 17.60, 11628, 2198, 192.81],
      ["3", "M20001", "圣保罗主站", "BRL", 386420.80, 326880.20, 59540.60, 15.41, 10264, 1865, 207.20],
      ["4", "M10002", "孟买主站", "INR", 302690.40, 254330.10, 48360.30, 15.98, 8210, 1548, 195.54],
      ["5", "M30002", "雅加达站", "IDR", 268420.30, 229980.90, 38439.40, 14.32, 7596, 1310, 204.90],
      ["6", "M40001", "河内主站", "VND", 154380.60, 139920.10, 14460.50, 9.37, 4260, 731, 211.19],
      ["7", "M50001", "曼谷站", "THB", 132610.50, 124880.40, 7730.10, 5.83, 3688, 618, 214.58],
      ["8", "M60001", "东京测试站", "JPY", 98620.20, 94580.80, 4039.40, 4.10, 2640, 426, 231.50],
      ["9", "M70001", "迪拜站", "AED", 84210.00, 79860.30, 4349.70, 5.16, 2188, 384, 219.30],
      ["10", "M80001", "新加坡站", "SGD", 78620.90, 74240.40, 4380.50, 5.57, 2060, 350, 224.63],
      ["11", "M90001", "首尔站", "KRW", 66840.40, 63650.00, 3190.40, 4.77, 1744, 306, 218.43],
      ["12", "M91001", "伦敦站", "GBP", 58220.80, 56140.20, 2080.60, 3.57, 1520, 271, 214.84]
    ],
    all: [
      ["1", "M30001", "马尼拉站", "USD", 1486320.50, 1191820.30, 294500.20, 19.81, 42840, 8460, 175.69],
      ["2", "M10001", "印度运营商", "INR", 1323800.00, 1099210.70, 224589.30, 16.97, 39628, 7198, 183.91],
      ["3", "M20001", "圣保罗主站", "BRL", 1186420.80, 986880.20, 199540.60, 16.82, 34264, 5865, 202.29],
      ["4", "M10002", "孟买主站", "INR", 902690.40, 754330.10, 148360.30, 16.44, 28210, 4548, 198.48],
      ["5", "M30002", "雅加达站", "IDR", 768420.30, 659980.90, 108439.40, 14.11, 23596, 3310, 232.15],
      ["6", "M40001", "河内主站", "VND", 554380.60, 489920.10, 64460.50, 11.63, 17260, 2731, 202.99],
      ["7", "M50001", "曼谷站", "THB", 432610.50, 394880.40, 37730.10, 8.72, 13688, 2118, 204.25],
      ["8", "M60001", "东京测试站", "JPY", 398620.20, 364580.80, 34039.40, 8.54, 12640, 1926, 206.97],
      ["9", "M70001", "迪拜站", "AED", 342210.00, 319860.30, 22349.70, 6.53, 10188, 1584, 216.04],
      ["10", "M80001", "新加坡站", "SGD", 286620.90, 264240.40, 22380.50, 7.81, 9060, 1350, 212.31],
      ["11", "M90001", "首尔站", "KRW", 236840.40, 220650.00, 16190.40, 6.84, 7744, 1106, 214.14],
      ["12", "M91001", "伦敦站", "GBP", 198220.80, 186140.20, 12080.60, 6.09, 6520, 971, 204.14]
    ]
  };

  var activeRange = "yesterday";

  function money(value) {
    return Number(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function renderTabs() {
    var files = ["游戏记录.html", "运营数据.html", "商户盈亏.html"];
    return files.map(function(file) {
      var active = file === "商户盈亏.html" ? " is-active" : "";
      return "<button type=\"button\" class=\"codex-page-tab" + active + "\" data-tab-file=\"" + file + "\"><span class=\"codex-page-tab-dot\"></span><span class=\"codex-page-tab-title\">" + file.replace(".html", "") + "</span><span class=\"codex-page-tab-close\">×</span></button>";
    }).join("");
  }

  function rowHtml(row) {
    return "<tr><td>" + row[0] + "</td><td>" + row[1] + "</td><td class=\"is-left\">" + row[2] + "</td><td>" + row[3] + "</td><td>" + money(row[4]) + "</td><td>" + money(row[5]) + "</td><td class=\"is-positive\">" + money(row[6]) + "</td><td>" + Number(row[7]).toFixed(2) + "%</td><td>" + Number(row[8]).toLocaleString("en-US") + "</td><td>" + Number(row[9]).toLocaleString("en-US") + "</td><td>" + money(row[10]) + "</td></tr>";
  }

  function render(page) {
    var name = page.querySelector("[data-filter='name']").value.trim().toLowerCase();
    var id = page.querySelector("[data-filter='id']").value.trim().toLowerCase();
    var currency = page.querySelector("[data-filter='currency']").value;
    var rows = dataset[activeRange].filter(function(row) {
      return (!name || row[2].toLowerCase().indexOf(name) !== -1) &&
        (!id || row[1].toLowerCase().indexOf(id) !== -1) &&
        (!currency || row[3] === currency);
    });
    page.querySelector("tbody").innerHTML = rows.map(rowHtml).join("");
    Array.prototype.forEach.call(page.querySelectorAll("[data-range]"), function(button) {
      button.classList.toggle("is-active", button.getAttribute("data-range") === activeRange);
    });
  }

  function hideLegacy() {
    Array.prototype.forEach.call(document.querySelectorAll(".merchant-profit-axure-table-card, .merchant-profit-tabs, .merchant-profit-page"), function(node) {
      node.remove();
    });
    for (var id = 2068; id <= 2120; id += 1) {
      var node = document.getElementById("u" + id);
      if (node) node.style.display = "none";
    }
  }

  function ensureTopbar() {
    var topbar = document.querySelector(".unified-topbar");
    if (!topbar) return;
    topbar.classList.add("merchant-profit-topbar");
  }

  function buildPage() {
    var base = document.getElementById("base");
    if (!base) return;
    hideLegacy();
    ensureTopbar();
    var page = document.createElement("div");
    page.className = "merchant-profit-page";
    page.innerHTML =
      "<div class=\"game-records-titlebar merchant-profit-titlebar\"><h1>商户盈亏</h1></div>" +
      "<div class=\"codex-page-tabs merchant-profit-tabs\">" + renderTabs() + "</div>" +
      "<div class=\"merchant-profit-filters\">" +
        "<label><span>商户名称</span><input data-filter=\"name\" placeholder=\"请输入商户名称\"></label>" +
        "<label><span>商户ID</span><input data-filter=\"id\" placeholder=\"请输入商户ID\"></label>" +
        "<label><span>商户货币</span><select data-filter=\"currency\"><option value=\"\">全部</option><option>INR</option><option>USD</option><option>BRL</option><option>IDR</option><option>VND</option><option>THB</option><option>JPY</option></select></label>" +
        "<div class=\"merchant-profit-actions\"><button type=\"button\" data-action=\"reset\">重置</button><button type=\"button\" class=\"is-primary\" data-action=\"query\">查询</button></div>" +
        "<div class=\"merchant-profit-ranges\"><button type=\"button\" data-range=\"yesterday\">昨天</button><button type=\"button\" data-range=\"week\">7天</button><button type=\"button\" data-range=\"month\">30天</button><button type=\"button\" data-range=\"all\">全部</button></div>" +
      "</div>" +
      "<div class=\"merchant-profit-table-card\"><table class=\"merchant-profit-table\"><thead><tr><th>排名</th><th>商户ID</th><th>商户名称</th><th>货币</th><th>总流水(美元)</th><th>总返奖(美元)</th><th>总盈利(美元)</th><th>盈利率</th><th>下注单数</th><th>下注人数</th><th>人均下注额</th></tr></thead><tbody></tbody></table></div>";
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
        if (file !== "商户盈亏.html") window.top.location.hash = encodeURIComponent(file);
        return;
      }
      var range = event.target.closest("[data-range]");
      if (range) {
        activeRange = range.getAttribute("data-range");
        render(page);
        return;
      }
      var action = event.target.closest("[data-action]");
      if (!action) return;
      if (action.getAttribute("data-action") === "reset") {
        page.querySelector("[data-filter='name']").value = "";
        page.querySelector("[data-filter='id']").value = "";
        page.querySelector("[data-filter='currency']").value = "";
      }
      render(page);
    });
    page.addEventListener("change", function(event) {
      if (event.target.matches("[data-filter]")) render(page);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", buildPage);
  else buildPage();
})();
