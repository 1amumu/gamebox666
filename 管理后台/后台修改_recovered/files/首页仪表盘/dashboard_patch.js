(function() {
  var metrics = [
    { valueId: "u471_text", value: "18,642", deltaId: "u472_text", delta: "+8.6%", positive: true },
    { valueId: "u477_text", value: "96,318", deltaId: "u478_text", delta: "-3.2%", positive: false },
    { valueId: "u483_text", value: "12.48M", deltaId: "u484_text", delta: "-1.8%", positive: false },
    { valueId: "u489_text", value: "126", deltaId: "u490_text", delta: "-0.8%", positive: false },
    { valueId: "u495_text", value: "842,360", deltaId: "u496_text", delta: "+12.4%", positive: true },
    { valueId: "u501_text", value: "RTP 96.8%", deltaId: "u502_text", delta: "+0.6%", positive: true },
    { valueId: "u507_text", value: "星海娱乐", deltaId: "u508_text", delta: "+186,420", positive: true },
    { valueId: "u513_text", value: "蓝鲸游戏", deltaId: "u514_text", delta: "-72,580", positive: true }
  ];

  function setHtml(id, html) {
    var element = document.getElementById(id);
    if (element) {
      element.innerHTML = html;
    }
  }

  function updateMetrics() {
    metrics.forEach(function(metric) {
      setHtml(metric.valueId, "<p><span>" + metric.value + "</span></p>");
      setHtml(
        metric.deltaId,
        '<p><span>较昨天&nbsp; &nbsp;&nbsp; </span><span style="color:' +
          (metric.positive ? "#16A34A" : "#D9001B") +
          ';">' + metric.delta + "</span></p>"
      );
    });
  }

  var trendSeries = [
    { key: "betAmount", label: "投注金额", color: "#2563EB", values: [32, 30, 34, 39, 45, 52, 58, 61, 66, 70, 74, 78, 84, 88, 81, 86, 90, 94, 97, 91, 96, 100, 93, 98] },
    { key: "platformProfit", label: "平台盈亏", color: "#16A34A", values: [46, 43, 45, 48, 52, 50, 56, 61, 64, 59, 67, 70, 74, 71, 76, 79, 83, 78, 86, 82, 88, 91, 87, 93] },
    { key: "onlineUsers", label: "在线人数", color: "#F59E0B", values: [28, 31, 36, 40, 44, 55, 63, 70, 76, 80, 82, 84, 87, 90, 86, 89, 92, 95, 97, 93, 88, 82, 74, 68] },
    { key: "todayProfit", label: "今日盈利", color: "#7C3AED", values: [22, 24, 21, 28, 33, 37, 35, 42, 48, 53, 57, 55, 61, 64, 68, 72, 70, 76, 79, 83, 86, 84, 89, 92] },
    { key: "betOrders", label: "投注单数", color: "#06B6D4", values: [40, 38, 42, 47, 51, 57, 62, 65, 61, 68, 72, 75, 79, 83, 80, 84, 87, 90, 94, 89, 92, 96, 91, 95] }
  ];

  function drawTrendChart(card) {
    var svg = card.querySelector(".dashboard-trend-chart__svg");
    if (!svg) return;

    var selected = Array.prototype.map.call(
      card.querySelectorAll(".dashboard-trend-option input:checked"),
      function(input) { return input.value; }
    );
    var visibleSeries = trendSeries.filter(function(series) {
      return selected.indexOf(series.key) !== -1;
    });

    var plot = { left: 44, top: 16, right: 1018, bottom: 158 };
    var width = plot.right - plot.left;
    var height = plot.bottom - plot.top;
    var grid = [
      '<rect x="0" y="0" width="1040" height="190" fill="#FFFFFF"/>',
      '<g stroke="#E5E7EB" stroke-width="1">',
      '<line x1="' + plot.left + '" y1="22" x2="' + plot.right + '" y2="22"/>',
      '<line x1="' + plot.left + '" y1="56" x2="' + plot.right + '" y2="56"/>',
      '<line x1="' + plot.left + '" y1="90" x2="' + plot.right + '" y2="90"/>',
      '<line x1="' + plot.left + '" y1="124" x2="' + plot.right + '" y2="124"/>',
      '<line x1="' + plot.left + '" y1="' + plot.bottom + '" x2="' + plot.right + '" y2="' + plot.bottom + '"/>',
      '</g>',
      '<g fill="#667085" font-family="Arial, Microsoft YaHei, sans-serif" font-size="11">',
      '<text x="4" y="24">100</text>',
      '<text x="10" y="58">75</text>',
      '<text x="10" y="92">50</text>',
      '<text x="10" y="126">25</text>',
      '<text x="' + plot.left + '" y="181">00:00</text>',
      '<text x="' + (plot.left + width * 6 / 23 - 16) + '" y="181">06:00</text>',
      '<text x="' + (plot.left + width * 12 / 23 - 16) + '" y="181">12:00</text>',
      '<text x="' + (plot.left + width * 18 / 23 - 16) + '" y="181">18:00</text>',
      '<text x="' + (plot.right - 28) + '" y="181">23:00</text>',
      '</g>'
    ];

    var paths = visibleSeries.map(function(series) {
      var min = Math.min.apply(Math, series.values);
      var max = Math.max.apply(Math, series.values);
      var range = max - min || 1;
      var points = series.values.map(function(value, index) {
        var x = plot.left + width * index / (series.values.length - 1);
        var y = plot.bottom - ((value - min) / range) * height;
        return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
      });
      var d = points.map(function(point, index) {
        return (index === 0 ? "M" : "L") + point[0] + " " + point[1];
      }).join(" ");
      var last = points[points.length - 1];
      return '<path d="' + d + '" fill="none" stroke="' + series.color + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<circle cx="' + last[0] + '" cy="' + last[1] + '" r="4" fill="' + series.color + '"/>';
    });

    if (!visibleSeries.length) {
      paths.push('<text x="485" y="92" fill="#98A2B3" font-family="Arial, Microsoft YaHei, sans-serif" font-size="13">请选择右侧数据项</text>');
    }

    svg.innerHTML = grid.join("") + '<g>' + paths.join("") + '</g>';
  }

  function addTrendCard() {
    var base = document.getElementById("base");
    if (!base || document.querySelector(".dashboard-trend-card")) return;

    var card = document.createElement("div");
    card.className = "dashboard-trend-card";
    card.innerHTML =
      '<div class="dashboard-trend-card__header">' +
        '<div class="dashboard-trend-card__title">最近24小时运营趋势</div>' +
        '<div class="dashboard-trend-card__meta">测试数据，每小时更新</div>' +
      '</div>' +
      '<div class="dashboard-trend-card__body">' +
        '<div class="dashboard-trend-chart">' +
          '<svg class="dashboard-trend-chart__svg" viewBox="0 0 1040 190" role="img" aria-label="最近24小时运营趋势"></svg>' +
        '</div>' +
        '<div class="dashboard-trend-options" aria-label="趋势图显示数据">' +
          trendSeries.map(function(series) {
            return '<label class="dashboard-trend-option">' +
              '<input type="checkbox" value="' + series.key + '" checked>' +
              '<span class="dashboard-trend-option__swatch" style="background:' + series.color + '"></span>' +
              '<span>' + series.label + '</span>' +
            '</label>';
          }).join("") +
        '</div>' +
      '</div>';

    base.appendChild(card);
    card.addEventListener("change", function(event) {
      if (event.target.matches(".dashboard-trend-option input")) {
        drawTrendChart(card);
      }
    });
    drawTrendChart(card);
  }

  function addRankCard() {
    var base = document.getElementById("base");
    if (!base || document.querySelector(".dashboard-rank-card")) return;

    var rows = [
      ["1", "M10086", "星海娱乐", "2,486,920", "3,842", "18,560", "860,420", "186,420", "74.9%"],
      ["2", "M10021", "蓝鲸游戏", "2,108,340", "3,196", "15,842", "742,180", "142,680", "72.6%"],
      ["3", "M10057", "银河互动", "1,936,500", "2,984", "14,226", "690,310", "128,940", "70.4%"],
      ["4", "M10012", "赤焰互娱", "1,762,880", "2,641", "12,906", "624,900", "105,760", "68.1%"],
      ["5", "M10073", "风暴游戏", "1,584,260", "2,318", "11,784", "588,640", "94,280", "66.7%"],
      ["6", "M10039", "晨星娱乐", "1,392,740", "2,052", "10,336", "503,200", "82,610", "64.9%"],
      ["7", "M10068", "火山竞技", "1,248,960", "1,886", "9,875", "476,500", "71,360", "63.4%"],
      ["8", "M10044", "海豚游戏", "1,036,520", "1,624", "8,516", "421,800", "63,920", "61.8%"],
      ["9", "M10031", "云顶互娱", "925,730", "1,438", "7,904", "398,660", "52,140", "60.5%"],
      ["10", "M10018", "绿洲娱乐", "816,280", "1,216", "6,742", "350,120", "43,870", "58.9%"]
    ];

    var body = rows.map(function(row) {
      return "<tr>" + row.map(function(cell) {
        return "<td>" + cell + "</td>";
      }).join("") + "</tr>";
    }).join("");

    var card = document.createElement("div");
    card.className = "dashboard-rank-card";
    card.innerHTML =
      '<div class="dashboard-rank-card__header">' +
        '<div class="dashboard-rank-card__title">前10商户排行</div>' +
        '<div class="dashboard-rank-card__meta">按下注金额排序，测试数据</div>' +
      '</div>' +
      '<div class="dashboard-rank-card__body">' +
        '<table class="dashboard-rank-table">' +
          '<thead><tr>' +
            '<th style="width:42px">排名</th>' +
            '<th style="width:72px">商户ID</th>' +
            '<th style="width:92px">商户名称</th>' +
            '<th>下注金额</th>' +
            '<th style="width:74px">下注人数</th>' +
            '<th style="width:74px">下注单数</th>' +
            '<th>商户充值余额</th>' +
            '<th>盈利金额</th>' +
            '<th style="width:78px">有效投注比</th>' +
          '</tr></thead>' +
          '<tbody>' + body + '</tbody>' +
        '</table>' +
      '</div>';

    base.appendChild(card);
  }

  function addSidebarStyleSwitcher() {
    var base = document.getElementById("base");
    if (!base || document.querySelector(".sidebar-style-switcher")) return;

    var switcher = document.createElement("div");
    switcher.className = "sidebar-style-switcher";
    switcher.innerHTML =
      '<button type="button" data-sidebar-theme="a">A 极简</button>' +
      '<button type="button" data-sidebar-theme="b">B 蓝色</button>' +
      '<button type="button" data-sidebar-theme="c">C 分组</button>';

    switcher.addEventListener("click", function(event) {
      var button = event.target.closest("button");
      if (!button) return;

      var theme = button.getAttribute("data-sidebar-theme");
      document.body.setAttribute("data-sidebar-theme", theme);
      Array.prototype.forEach.call(switcher.querySelectorAll("button"), function(item) {
        item.classList.toggle("active", item === button);
      });
    });

    base.appendChild(switcher);
    switcher.querySelector('[data-sidebar-theme="a"]').click();
  }

  function applyPatch() {
    document.body.setAttribute("data-sidebar-theme", "a");

    for (var index = 517; index <= 668; index += 1) {
      var merchantElement = document.getElementById("u" + index);
      if (merchantElement) {
        merchantElement.style.display = "none";
      }
    }

    updateMetrics();
    addTrendCard();
    addRankCard();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyPatch);
  } else {
    applyPatch();
  }
})();
