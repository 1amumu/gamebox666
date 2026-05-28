(function() {
  var trendSeries = [
    { key: "betAmount", label: "投注金额", color: "#2563EB", values: [32, 30, 34, 39, 45, 52, 58, 61, 66, 70, 74, 78, 84, 88, 81, 86, 90, 94, 97, 91, 96, 100, 93, 98] },
    { key: "platformProfit", label: "平台盈亏", color: "#16A34A", values: [46, 43, 45, 48, 52, 50, 56, 61, 64, 59, 67, 70, 74, 71, 76, 79, 83, 78, 86, 82, 88, 91, 87, 93] },
    { key: "onlineUsers", label: "在线人数", color: "#F59E0B", values: [28, 31, 36, 40, 44, 55, 63, 70, 76, 80, 82, 84, 87, 90, 86, 89, 92, 95, 97, 93, 88, 82, 74, 68] },
    { key: "todayProfit", label: "今日盈利", color: "#7C3AED", values: [22, 24, 21, 28, 33, 37, 35, 42, 48, 53, 57, 55, 61, 64, 68, 72, 70, 76, 79, 83, 86, 84, 89, 92] },
    { key: "betOrders", label: "投注单数", color: "#06B6D4", values: [40, 38, 42, 47, 51, 57, 62, 65, 61, 68, 72, 75, 79, 83, 80, 84, 87, 90, 94, 89, 92, 96, 91, 95] }
  ];

  var metricDefs = [
    { title: "投注人数", key: "betUsers", base: 18642, unit: "int", compare: "percent" },
    { title: "投注单数", key: "betOrders", base: 96318, unit: "int", compare: "percent" },
    { title: "投注金额", key: "betAmount", base: 12480000, unit: "money", compare: "percent" },
    { title: "平台盈亏", key: "platformProfit", base: 126840, unit: "int", compare: "percent" },
    { title: "今日盈利", key: "todayProfit", base: 842360, unit: "int", compare: "percent" },
    { title: "综合 RTP", key: "rtp", base: 96.8, unit: "percent", compare: "point" },
    { title: "盈利最高商户", key: "topWin", base: 186420, unit: "merchantUp", compare: "amount" },
    { title: "亏损最高商户", key: "topLoss", base: -72580, unit: "merchantDown", compare: "amount" }
  ];
  var merchantNames = ["星海娱乐", "蓝鲸游戏", "银河互动", "赤焰互娱", "风暴游戏", "晨星娱乐", "火山竞技", "海豚游戏"];

  var rankRows = [
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

  function currentFile() {
    var path = decodeURIComponent(window.location.pathname || "");
    return path.split("/").pop() || "首页仪表盘.html";
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
    var files = ["首页仪表盘.html", "游戏记录.html", "运营数据.html", "库存管理.html"];
    return files.map(function(file) {
      var active = file === "首页仪表盘.html" ? " is-active" : "";
      return "<button type=\"button\" class=\"codex-page-tab" + active + "\" data-tab-file=\"" + file + "\"><span class=\"codex-page-tab-dot\"></span><span class=\"codex-page-tab-title\">" + file.replace(".html", "") + "</span><span class=\"codex-page-tab-close\">×</span></button>";
    }).join("");
  }

  function pad2(num) {
    return String(num).padStart(2, "0");
  }

  function toDateValue(date) {
    return date.getFullYear() + "-" + pad2(date.getMonth() + 1) + "-" + pad2(date.getDate());
  }

  function parseDate(value) {
    var parts = String(value || "").split("-");
    if (parts.length !== 3) return null;
    var date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    return isNaN(date.getTime()) ? null : date;
  }

  function addDays(date, days) {
    var next = new Date(date.getTime());
    next.setDate(next.getDate() + days);
    return next;
  }

  function rangeDays(start, end) {
    return Math.max(1, Math.round((end.getTime() - start.getTime()) / 86400000) + 1);
  }

  function hashDate(date) {
    return date.getFullYear() * 372 + (date.getMonth() + 1) * 31 + date.getDate();
  }

  function formatValue(value, unit) {
    if (unit === "money") {
      if (Math.abs(value) >= 1000000) return (value / 1000000).toFixed(2) + "M";
      return Math.round(value).toLocaleString("en-US");
    }
    if (unit === "percent") return value.toFixed(1) + "%";
    if (unit === "merchantUp" || unit === "merchantDown") return merchantNames[Math.abs(Math.round(value)) % merchantNames.length];
    return Math.round(value).toLocaleString("en-US");
  }

  function calcMetric(def, start, end) {
    var days = rangeDays(start, end);
    var seed = hashDate(start) + hashDate(end) + def.key.length * 17;
    var volume = Math.max(0.72, Math.min(2.4, days / 1.6));
    var currentWave = 0.9 + ((seed % 23) / 100);
    var previousWave = 0.9 + (((seed + days * 11) % 23) / 100);
    var current = def.base * volume * currentWave;
    var previous = def.base * volume * previousWave;
    if (def.unit === "percent") {
      current = Math.max(88, Math.min(99.8, def.base + ((seed % 9) - 3) * 0.28));
      previous = Math.max(88, Math.min(99.8, def.base + (((seed + 7) % 9) - 3) * 0.28));
    }
    if (def.unit === "merchantUp") {
      current = seed;
      previous = seed + 3;
    }
    if (def.unit === "merchantDown") {
      current = seed + 1;
      previous = seed + 5;
    }
    var diff = current - previous;
    var deltaText;
    if (def.compare === "point") {
      deltaText = (diff >= 0 ? "+" : "") + diff.toFixed(1) + "pt";
    } else if (def.compare === "amount") {
      var amount = Math.abs(def.base * volume * (currentWave - previousWave));
      deltaText = (currentWave >= previousWave ? "+" : "-") + Math.round(amount).toLocaleString("en-US");
      diff = currentWave - previousWave;
    } else {
      var rate = previous ? (diff / previous) * 100 : 0;
      deltaText = (rate >= 0 ? "+" : "") + rate.toFixed(1) + "%";
    }
    return {
      title: def.title,
      value: formatValue(current, def.unit),
      delta: deltaText,
      up: diff >= 0
    };
  }

  function selectedRange() {
    var startInput = document.getElementById("dashboardStartDate");
    var endInput = document.getElementById("dashboardEndDate");
    var today = new Date();
    var end = parseDate(endInput && endInput.value) || today;
    var start = parseDate(startInput && startInput.value) || addDays(end, -1);
    if (start.getTime() > end.getTime()) {
      var temp = start;
      start = end;
      end = temp;
    }
    return { start: start, end: end };
  }

  function defaultDateRangeHtml() {
    var today = new Date();
    var start = today;
    return "<input type=\"date\" id=\"dashboardStartDate\" value=\"" + toDateValue(start) + "\">" +
      "<span>至</span>" +
      "<input type=\"date\" id=\"dashboardEndDate\" value=\"" + toDateValue(today) + "\">" +
      "<button type=\"button\" class=\"btn btn-primary\" data-dashboard-query>查询</button>" +
      "<button type=\"button\" class=\"btn btn-outline\" data-dashboard-reset>重置</button>";
  }

  function metricHtml(metrics) {
    return metrics.map(function(item) {
      return "<div class=\"metric-card\">" +
        "<div class=\"metric-title\">" + item.title + "</div>" +
        "<div class=\"metric-row\">" +
          "<div class=\"metric-value\">" + item.value + "</div>" +
          "<div class=\"metric-delta " + (item.up ? "up" : "down") + "\">" + item.delta + "</div>" +
        "</div>" +
      "</div>";
    }).join("");
  }

  function renderMetrics() {
    var grid = document.getElementById("metricGrid");
    var note = document.getElementById("metricCompareNote");
    if (!grid) return;
    var range = selectedRange();
    var days = rangeDays(range.start, range.end);
    var previousStart = addDays(range.start, -days);
    var previousEnd = addDays(range.start, -1);
    grid.innerHTML = metricHtml(metricDefs.map(function(def) {
      return calcMetric(def, range.start, range.end);
    }));
    if (note) {
      note.textContent = "对比区间：" + toDateValue(previousStart) + " 至 " + toDateValue(previousEnd);
    }
  }

  function trendOptionsHtml() {
    return trendSeries.map(function(series) {
      return "<label class=\"trend-option\">" +
        "<input type=\"checkbox\" value=\"" + series.key + "\" checked>" +
        "<span class=\"trend-swatch\" style=\"background:" + series.color + "\"></span>" +
        "<span>" + series.label + "</span>" +
      "</label>";
    }).join("");
  }

  function rankTableHtml() {
    var rows = rankRows.map(function(row) {
      return "<tr>" +
        "<td><span class=\"rank-number\">" + row[0] + "</span></td>" +
        "<td>" + row[1] + "</td>" +
        "<td>" + row[2] + "</td>" +
        "<td>" + row[3] + "</td>" +
        "<td>" + row[4] + "</td>" +
        "<td>" + row[5] + "</td>" +
        "<td>" + row[6] + "</td>" +
        "<td>" + row[7] + "</td>" +
        "<td>" + row[8] + "</td>" +
      "</tr>";
    }).join("");
    return "<table class=\"rank-table\">" +
      "<thead><tr><th>排名</th><th>商户ID</th><th>商户名称</th><th>下注金额</th><th>下注人数</th><th>下注单数</th><th>充值余额</th><th>盈利金额</th><th>有效投注比</th></tr></thead>" +
      "<tbody>" + rows + "</tbody>" +
    "</table>";
  }

  function shellHtml() {
    return "<div class=\"app-shell\">" +
      "<a class=\"app-brand\" href=\"首页仪表盘.html\">GB总后台</a>" +
      "<header class=\"app-topbar\">" +
        "<h1 class=\"topbar-page-title\">总后台-首页</h1>" +
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
      "<main class=\"app-main\"><div class=\"dashboard-page\">" +
        "<div class=\"codex-page-tabs\">" + pageTabs() + "</div>" +
        "<div class=\"dashboard-panel\">" +
          "<section class=\"summary-section\">" +
            "<div class=\"summary-head\">" +
              "<div><div class=\"summary-title\">运营仪表盘</div><div class=\"summary-note\" id=\"metricCompareNote\"></div></div>" +
              "<div class=\"time-filter\">" + defaultDateRangeHtml() + "</div>" +
            "</div>" +
            "<div class=\"metric-grid\" id=\"metricGrid\"></div>" +
          "</section>" +
          "<section class=\"dashboard-grid\">" +
            "<div class=\"chart-card\">" +
              "<div class=\"card-head\"><div><div class=\"card-title\">最近24小时运营趋势</div><div class=\"card-meta\">测试数据，每小时更新</div></div></div>" +
              "<div class=\"chart-body\">" +
                "<div class=\"trend-chart\"><svg id=\"trendSvg\" viewBox=\"0 0 1040 258\" role=\"img\" aria-label=\"最近24小时运营趋势\"></svg></div>" +
                "<div class=\"trend-options\" aria-label=\"趋势图显示数据\">" + trendOptionsHtml() + "</div>" +
              "</div>" +
            "</div>" +
            "<div class=\"rank-card\">" +
              "<div class=\"card-head\"><div><div class=\"card-title\">前10商户排行</div><div class=\"card-meta\">按下注金额排序，测试数据</div></div></div>" +
              "<div class=\"rank-table-wrap\">" + rankTableHtml() + "</div>" +
            "</div>" +
          "</section>" +
        "</div>" +
      "</div></main>" +
    "</div>";
  }

  function drawTrendChart() {
    var svg = document.getElementById("trendSvg");
    if (!svg) return;
    var selected = Array.prototype.map.call(document.querySelectorAll(".trend-option input:checked"), function(input) {
      return input.value;
    });
    var visibleSeries = trendSeries.filter(function(series) {
      return selected.indexOf(series.key) !== -1;
    });
    var plot = { left: 48, top: 22, right: 1006, bottom: 214 };
    var width = plot.right - plot.left;
    var height = plot.bottom - plot.top;
    var grid = [
      '<rect x="0" y="0" width="1040" height="258" fill="#FFFFFF"/>',
      '<g stroke="#E5E7EB" stroke-width="1">',
      '<line x1="' + plot.left + '" y1="40" x2="' + plot.right + '" y2="40"/>',
      '<line x1="' + plot.left + '" y1="84" x2="' + plot.right + '" y2="84"/>',
      '<line x1="' + plot.left + '" y1="128" x2="' + plot.right + '" y2="128"/>',
      '<line x1="' + plot.left + '" y1="172" x2="' + plot.right + '" y2="172"/>',
      '<line x1="' + plot.left + '" y1="' + plot.bottom + '" x2="' + plot.right + '" y2="' + plot.bottom + '"/>',
      '</g>',
      '<g fill="#667085" font-family="Arial, Microsoft YaHei, sans-serif" font-size="11">',
      '<text x="8" y="43">100</text>',
      '<text x="15" y="87">75</text>',
      '<text x="15" y="131">50</text>',
      '<text x="15" y="175">25</text>',
      '<text x="' + plot.left + '" y="240">00:00</text>',
      '<text x="' + (plot.left + width * 6 / 23 - 16) + '" y="240">06:00</text>',
      '<text x="' + (plot.left + width * 12 / 23 - 16) + '" y="240">12:00</text>',
      '<text x="' + (plot.left + width * 18 / 23 - 16) + '" y="240">18:00</text>',
      '<text x="' + (plot.right - 28) + '" y="240">23:00</text>',
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
      paths.push('<text x="478" y="130" fill="#98A2B3" font-family="Arial, Microsoft YaHei, sans-serif" font-size="13">请选择右侧数据项</text>');
    }
    svg.innerHTML = grid.join("") + "<g>" + paths.join("") + "</g>";
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
      if (event.target.closest("[data-dashboard-query]")) {
        renderMetrics();
        return;
      }
      if (event.target.closest("[data-dashboard-reset]")) {
        var today = new Date();
        var start = today;
        document.getElementById("dashboardStartDate").value = toDateValue(start);
        document.getElementById("dashboardEndDate").value = toDateValue(today);
        renderMetrics();
      }
    });
    app.addEventListener("change", function(event) {
      if (event.target.matches(".trend-option input")) {
        drawTrendChart();
        return;
      }
      if (event.target.matches("#dashboardStartDate, #dashboardEndDate")) {
        renderMetrics();
      }
    });
  }

  function buildPage() {
    var app = document.getElementById("app");
    if (!app) return;
    app.innerHTML = shellHtml();
    renderMetrics();
    drawTrendChart();
    bindEvents(app);
    updateTopbarTime(app);
    window.setInterval(function() {
      updateTopbarTime(app);
    }, 30000);
  }

  function updateTopbarTime(app) {
    var node = app.querySelector("[data-topbar-time]");
    if (!node) return;
    var now = new Date();
    var hh = String(now.getHours()).padStart(2, "0");
    var mm = String(now.getMinutes()).padStart(2, "0");
    node.textContent = hh + ":" + mm + " 中国";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildPage);
  } else {
    buildPage();
  }
})();
