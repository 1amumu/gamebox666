(function() {
  var records = [
    { roundId: "1776344903", time: "2026-05-09 10:46:22", currency: "INR", room: "大厅(1001)", betUsers: 68, betCount: 133, ejectBet: 23.00, totalBet: 130070.00, totalReward: 118420.00, crash: 9.34, hasBet: true },
    { roundId: "1776344898", time: "2026-05-09 10:45:11", currency: "INR", room: "新手房(9527)", betUsers: 92, betCount: 176, ejectBet: 15.00, totalBet: 168240.00, totalReward: 149900.00, crash: 3.72, hasBet: true },
    { roundId: "1776344885", time: "2026-05-09 10:43:49", currency: "USDT", room: "小黑屋(7777)", betUsers: 16, betCount: 38, ejectBet: 80.00, totalBet: 24800.00, totalReward: 19840.00, crash: 18.62, hasBet: true },
    { roundId: "1776344877", time: "2026-05-09 10:42:14", currency: "BRL", room: "大厅(1001)", betUsers: 51, betCount: 108, ejectBet: 18.00, totalBet: 88210.00, totalReward: 73680.00, crash: 4.18, hasBet: true },
    { roundId: "1776344862", time: "2026-05-09 10:40:33", currency: "INR", room: "高倍房(6601)", betUsers: 29, betCount: 63, ejectBet: 42.00, totalBet: 116900.00, totalReward: 128450.00, crash: 27.15, hasBet: true },
    { roundId: "1776344848", time: "2026-05-09 10:38:40", currency: "USDT", room: "新手房(9527)", betUsers: 44, betCount: 81, ejectBet: 10.00, totalBet: 31860.00, totalReward: 25270.00, crash: 2.86, hasBet: true },
    { roundId: "1776344833", time: "2026-05-09 10:37:05", currency: "BRL", room: "大厅(1001)", betUsers: 0, betCount: 0, ejectBet: 0.00, totalBet: 0.00, totalReward: 0.00, crash: 1.12, hasBet: false },
    { roundId: "1776344821", time: "2026-05-09 10:35:31", currency: "INR", room: "小黑屋(7777)", betUsers: 12, betCount: 22, ejectBet: 120.00, totalBet: 58240.00, totalReward: 0.00, crash: 1.01, hasBet: true },
    { roundId: "1776344809", time: "2026-05-09 10:33:48", currency: "USDT", room: "高倍房(6601)", betUsers: 24, betCount: 49, ejectBet: 65.00, totalBet: 44280.00, totalReward: 62310.00, crash: 12.44, hasBet: true },
    { roundId: "1776344796", time: "2026-05-09 10:32:17", currency: "INR", room: "大厅(1001)", betUsers: 77, betCount: 154, ejectBet: 12.00, totalBet: 142600.00, totalReward: 101230.00, crash: 1.84, hasBet: true },
    { roundId: "1776344788", time: "2026-05-09 10:30:46", currency: "BRL", room: "新手房(9527)", betUsers: 37, betCount: 74, ejectBet: 9.00, totalBet: 50670.00, totalReward: 44850.00, crash: 5.73, hasBet: true },
    { roundId: "1776344774", time: "2026-05-09 10:28:55", currency: "INR", room: "高倍房(6601)", betUsers: 18, betCount: 35, ejectBet: 95.00, totalBet: 98540.00, totalReward: 136420.00, crash: 33.08, hasBet: true },
    { roundId: "1776344761", time: "2026-05-09 10:26:29", currency: "USDT", room: "大厅(1001)", betUsers: 0, betCount: 0, ejectBet: 0.00, totalBet: 0.00, totalReward: 0.00, crash: 1.07, hasBet: false },
    { roundId: "1776344749", time: "2026-05-09 10:24:03", currency: "INR", room: "小黑屋(7777)", betUsers: 9, betCount: 16, ejectBet: 180.00, totalBet: 72100.00, totalReward: 88440.00, crash: 19.26, hasBet: true }
  ];

  function money(value) {
    return Number(value).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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

  function defaultRange() {
    var today = new Date(2026, 4, 9);
    var start = new Date(today.getTime());
    start.setDate(today.getDate() - 6);
    return {
      start: formatDateInput(start),
      end: formatDateInput(today)
    };
  }

  function rowHtml(row) {
    return "<tr>" +
      "<td><button type=\"button\" class=\"crash-point-link\" data-round-id=\"" + row.roundId + "\">" + row.roundId + "</button></td>" +
      "<td>" + row.time + "</td>" +
      "<td>" + row.currency + "</td>" +
      "<td>" + row.room + "</td>" +
      "<td>" + row.betUsers.toLocaleString("en-US") + "</td>" +
      "<td>" + row.betCount.toLocaleString("en-US") + "</td>" +
      "<td>" + money(row.ejectBet) + "</td>" +
      "<td>" + money(row.totalBet) + "</td>" +
      "<td>" + money(row.totalReward) + "</td>" +
      "<td><span class=\"crash-point-multiple\">" + row.crash.toFixed(2) + "x</span></td>" +
    "</tr>";
  }

  function getState(page) {
    return {
      roundId: page.querySelector("[data-filter='round']").value.trim(),
      currency: page.querySelector("[data-filter='currency']").value,
      type: page.querySelector("[data-filter='type']").value,
      start: parseDate(page.querySelector("[data-filter='start']").value),
      end: parseDate(page.querySelector("[data-filter='end']").value)
    };
  }

  function renderTable(page) {
    var state = getState(page);
    var tbody = page.querySelector(".crash-point-table tbody");
    var filtered = records.filter(function(row) {
      var rowDate = parseDate(row.time.slice(0, 10));
      var matchesRound = !state.roundId || row.roundId.indexOf(state.roundId) !== -1;
      var matchesCurrency = !state.currency || row.currency === state.currency;
      var matchesType = state.type !== "有下注" || row.hasBet;
      var matchesStart = !state.start || (rowDate && rowDate.getTime() >= state.start.getTime());
      var matchesEnd = !state.end || (rowDate && rowDate.getTime() <= state.end.getTime());
      return matchesRound && matchesCurrency && matchesType && matchesStart && matchesEnd;
    }).sort(function(a, b) {
      return new Date(b.time).getTime() - new Date(a.time).getTime();
    });

    tbody.innerHTML = filtered.length ? filtered.map(rowHtml).join("") : "<tr><td class=\"crash-point-empty\" colspan=\"10\">当前筛选条件下暂无数据</td></tr>";
  }

  function resetPage(page) {
    var range = defaultRange();
    page.querySelector("[data-filter='round']").value = "";
    page.querySelector("[data-filter='currency']").value = "";
    page.querySelector("[data-filter='type']").value = "全部";
    page.querySelector("[data-filter='start']").value = range.start;
    page.querySelector("[data-filter='end']").value = range.end;
    renderTable(page);
  }

  function buildModal() {
    return "<div class=\"crash-point-modal\" hidden>" +
      "<div class=\"crash-point-modal-panel\">" +
        "<div class=\"crash-point-modal-header\"><div><h2>牌局详情</h2><p data-modal-subtitle></p></div><button type=\"button\" class=\"crash-point-modal-close\" aria-label=\"关闭\">×</button></div>" +
        "<div class=\"crash-point-modal-body\">" +
          "<div class=\"crash-point-detail-grid\">" +
            "<div class=\"crash-point-detail-item\"><span>牌局ID</span><strong data-detail=\"roundId\"></strong></div>" +
            "<div class=\"crash-point-detail-item\"><span>房间</span><strong data-detail=\"room\"></strong></div>" +
            "<div class=\"crash-point-detail-item\"><span>货币</span><strong data-detail=\"currency\"></strong></div>" +
            "<div class=\"crash-point-detail-item\"><span>爆炸倍数</span><strong data-detail=\"crash\"></strong></div>" +
            "<div class=\"crash-point-detail-item\"><span>下注人数</span><strong data-detail=\"betUsers\"></strong></div>" +
            "<div class=\"crash-point-detail-item\"><span>下注单数</span><strong data-detail=\"betCount\"></strong></div>" +
            "<div class=\"crash-point-detail-item\"><span>跳伞单注</span><strong data-detail=\"ejectBet\"></strong></div>" +
            "<div class=\"crash-point-detail-item\"><span>下注金额</span><strong data-detail=\"totalBet\"></strong></div>" +
            "<div class=\"crash-point-detail-item\"><span>返奖金额</span><strong data-detail=\"totalReward\"></strong></div>" +
            "<div class=\"crash-point-detail-item\"><span>时间</span><strong data-detail=\"time\"></strong></div>" +
          "</div>" +
        "</div>" +
      "</div>" +
    "</div>";
  }

  function openModal(page, roundId) {
    var record = records.find(function(item) { return item.roundId === roundId; });
    var modal = page.querySelector(".crash-point-modal");
    if (!record || !modal) return;
    modal.querySelector("[data-modal-subtitle]").textContent = record.room + " / " + record.time;
    modal.querySelector("[data-detail='roundId']").textContent = record.roundId;
    modal.querySelector("[data-detail='room']").textContent = record.room;
    modal.querySelector("[data-detail='currency']").textContent = record.currency;
    modal.querySelector("[data-detail='crash']").textContent = record.crash.toFixed(2) + "x";
    modal.querySelector("[data-detail='betUsers']").textContent = record.betUsers.toLocaleString("en-US");
    modal.querySelector("[data-detail='betCount']").textContent = record.betCount.toLocaleString("en-US");
    modal.querySelector("[data-detail='ejectBet']").textContent = money(record.ejectBet);
    modal.querySelector("[data-detail='totalBet']").textContent = money(record.totalBet);
    modal.querySelector("[data-detail='totalReward']").textContent = money(record.totalReward);
    modal.querySelector("[data-detail='time']").textContent = record.time;
    modal.hidden = false;
  }

  function hideLegacyPanels() {
    for (var id = 1262; id <= 1298; id += 1) {
      var element = document.getElementById("u" + id);
      if (element) element.style.display = "none";
    }
  }

  function buildPage() {
    var base = document.getElementById("base");
    if (!base || document.querySelector(".crash-point-page")) return;

    hideLegacyPanels();

    var range = defaultRange();
    var page = document.createElement("div");
    page.className = "crash-point-page";
    page.innerHTML =
      "<div class=\"game-records-titlebar crash-point-titlebar\"><h1>飞机爆点数据</h1></div>" +
      "<div class=\"crash-point-filters\">" +
        "<label class=\"crash-point-filter-field\"><span>输入局ID</span><input type=\"text\" data-filter=\"round\" placeholder=\"请输入牌局ID\"></label>" +
        "<label class=\"crash-point-filter-field\"><span>选择货币</span><select data-filter=\"currency\"><option value=\"\">全部货币</option><option value=\"INR\">INR</option><option value=\"USDT\">USDT</option><option value=\"BRL\">BRL</option></select></label>" +
        "<label class=\"crash-point-filter-field\"><span>选择类型</span><select data-filter=\"type\"><option value=\"全部\">全部</option><option value=\"有下注\">有下注</option></select></label>" +
        "<label class=\"crash-point-filter-field crash-point-filter-field--dates\"><span>时间范围</span><div class=\"crash-point-date-fields\"><input type=\"date\" data-filter=\"start\" value=\"" + range.start + "\"><em>至</em><input type=\"date\" data-filter=\"end\" value=\"" + range.end + "\"></div></label>" +
        "<div class=\"crash-point-filter-actions\"><button type=\"button\" data-action=\"reset\">重置</button><button type=\"button\" class=\"is-primary\" data-action=\"query\">查询</button></div>" +
      "</div>" +
      "<div class=\"crash-point-table-card\"><div class=\"crash-point-table-wrap\"><table class=\"crash-point-table\"><thead><tr>" +
        "<th>牌局ID</th><th>时间</th><th>货币</th><th>房间(id)</th><th>下注人数</th><th>下注单数</th><th>跳伞单注</th><th>下注金额</th><th>返奖金额</th><th>爆炸倍数</th>" +
      "</tr></thead><tbody></tbody></table></div></div>" +
      buildModal();

    base.appendChild(page);
    renderTable(page);

    page.addEventListener("click", function(event) {
      if (event.target.closest("[data-action='reset']")) {
        resetPage(page);
        return;
      }
      if (event.target.closest("[data-action='query']")) {
        renderTable(page);
        return;
      }
      if (event.target.closest("[data-round-id]")) {
        openModal(page, event.target.closest("[data-round-id]").getAttribute("data-round-id"));
        return;
      }
      if (event.target.closest(".crash-point-modal-close") || (event.target.classList && event.target.classList.contains("crash-point-modal"))) {
        page.querySelector(".crash-point-modal").hidden = true;
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildPage);
  } else {
    buildPage();
  }
})();
