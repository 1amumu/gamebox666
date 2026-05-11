(function() {
  var rows = [
    { date: "全部", newUsers: 24860, betUsers: 15482, loginUsers: 42680, d1: "42.6%", d3: "27.8%", d7: "17.9%", d14: "10.8%", d30: "6.2%", total: true },
    { date: "2026-05-10", newUsers: 6842, betUsers: 3916, loginUsers: 11028, d1: "43.8%", d3: "28.6%", d7: "18.4%", d14: "11.2%", d30: "6.5%" },
    { date: "2026-05-09", newUsers: 6385, betUsers: 3728, loginUsers: 10642, d1: "42.9%", d3: "27.4%", d7: "17.8%", d14: "10.7%", d30: "6.1%" },
    { date: "2026-05-08", newUsers: 6016, betUsers: 3564, loginUsers: 10218, d1: "41.7%", d3: "26.9%", d7: "17.2%", d14: "10.1%", d30: "5.8%" },
    { date: "2026-05-07", newUsers: 5617, betUsers: 3274, loginUsers: 9792, d1: "40.8%", d3: "25.7%", d7: "16.4%", d14: "9.6%", d30: "5.4%" },
    { date: "2026-05-06", newUsers: 5240, betUsers: 3096, loginUsers: 9226, d1: "39.6%", d3: "24.9%", d7: "15.8%", d14: "9.1%", d30: "5.0%" },
    { date: "2026-05-05", newUsers: 4988, betUsers: 2864, loginUsers: 8810, d1: "38.9%", d3: "24.1%", d7: "15.1%", d14: "8.7%", d30: "4.8%" }
  ];

  function integer(value) {
    return Number(value).toLocaleString("en-US");
  }

  function rowHtml(row) {
    return "<tr class=\"" + (row.total ? "is-total" : "") + "\">" +
      "<td>" + row.date + "</td>" +
      "<td>" + integer(row.newUsers) + "</td>" +
      "<td>" + integer(row.betUsers) + "</td>" +
      "<td>" + integer(row.loginUsers) + "</td>" +
      "<td><span class=\"player-retention-rate\">" + row.d1 + "</span></td>" +
      "<td><span class=\"player-retention-rate\">" + row.d3 + "</span></td>" +
      "<td><span class=\"player-retention-rate\">" + row.d7 + "</span></td>" +
      "<td><span class=\"player-retention-rate is-low\">" + row.d14 + "</span></td>" +
      "<td><span class=\"player-retention-rate is-low\">" + row.d30 + "</span></td>" +
    "</tr>";
  }

  function parseTimeRange(value) {
    var parts = value.split(/\s+-\s+/);
    return {
      start: parts[0] ? parts[0].slice(0, 10) : "",
      end: parts[1] ? parts[1].slice(0, 10) : ""
    };
  }

  function renderRows(page) {
    var range = parseTimeRange(page.querySelector("[data-filter='time']").value.trim());
    var filtered = rows.filter(function(row) {
      if (row.total) return true;
      return (!range.start || row.date >= range.start) && (!range.end || row.date <= range.end);
    });
    var total = filtered.filter(function(row) { return row.total; });
    var normal = filtered.filter(function(row) { return !row.total; }).sort(function(a, b) { return b.betUsers - a.betUsers; });
    page.querySelector(".player-retention-table tbody").innerHTML = total.concat(normal).map(rowHtml).join("");
  }

  function resetPage(page) {
    page.querySelector("[data-filter='time']").value = "2026-05-05 00:00 - 2026-05-10 23:59";
    renderRows(page);
  }

  function hideLegacyPanels() {
    for (var id = 1633; id <= 1657; id += 1) {
      var element = document.getElementById("u" + id);
      if (element) element.style.display = "none";
    }
  }

  function buildPage() {
    var base = document.getElementById("base");
    if (!base || document.querySelector(".player-retention-page")) return;

    hideLegacyPanels();

    var page = document.createElement("div");
    page.className = "player-retention-page";
    page.innerHTML =
      "<div class=\"game-records-titlebar player-retention-titlebar\"><h1>玩家留存</h1></div>" +
      "<div class=\"player-retention-filters\">" +
        "<label class=\"player-retention-filter-field is-time-range\"><span>时间范围</span><input data-filter=\"time\" value=\"2026-05-05 00:00 - 2026-05-10 23:59\"></label>" +
        "<div class=\"player-retention-actions\"><button type=\"button\" data-action=\"reset\">重置</button><button type=\"button\" class=\"is-primary\" data-action=\"query\">查询</button></div>" +
      "</div>" +
      "<div class=\"player-retention-table-card\"><div class=\"player-retention-table-wrap\"><table class=\"player-retention-table\"><thead><tr><th>日期</th><th>新用户数</th><th>下注用户数</th><th>登录用户数</th><th>次日留存</th><th>3日留存</th><th>7日留存</th><th>14日留存</th><th>30日留存</th></tr></thead><tbody></tbody></table></div></div>";

    base.appendChild(page);
    renderRows(page);

    page.addEventListener("click", function(event) {
      var actionButton = event.target.closest("[data-action]");
      if (!actionButton) return;
      if (actionButton.getAttribute("data-action") === "reset") resetPage(page);
      if (actionButton.getAttribute("data-action") === "query") renderRows(page);
    });

    page.addEventListener("change", function(event) {
      if (event.target.matches("[data-filter='time']")) renderRows(page);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildPage);
  } else {
    buildPage();
  }
})();
