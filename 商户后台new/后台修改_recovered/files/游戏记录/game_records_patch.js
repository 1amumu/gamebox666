(function() {
  var records = [
    ["GR202605080001", "2026-05-08 10:42:18", "R1776073077", "P930184", "火热辣椒", "INR", 884.50, 300.00, "2.95", "点控", "8,981,288.88", "8,982,173.38"],
    ["GR202605080002", "2026-05-08 10:39:06", "R1776073012", "P730029", "发财树", "INR", -240.00, 240.00, "0.00", "普通", "2,451,600.20", "2,451,360.20"],
    ["GR202605080003", "2026-05-08 10:33:41", "R1776072980", "P881206", "关云长", "USDT", 126.40, 80.00, "2.58", "放水", "19,836.72", "19,963.12"],
    ["GR202605080004", "2026-05-08 10:28:11", "R1776072877", "P190773", "秦皇传说", "INR", -500.00, 500.00, "0.00", "点杀", "601,200.00", "600,700.00"],
    ["GR202605080005", "2026-05-08 10:21:34", "R1776072809", "P665021", "丛林之王", "BRL", 342.10, 200.00, "2.71", "普通", "72,441.31", "72,783.41"],
    ["GR202605080006", "2026-05-08 10:17:52", "R1776072770", "P408812", "罗马X", "INR", -120.00, 120.00, "0.00", "普通", "148,902.55", "148,782.55"],
    ["GR202605080007", "2026-05-08 10:12:25", "R1776072704", "P177607", "火热辣椒", "INR", 1860.00, 800.00, "3.33", "放水", "989,218.88", "991,078.88"],
    ["GR202605080008", "2026-05-08 10:08:10", "R1776072682", "P205901", "发财树", "USDT", -36.00, 36.00, "0.00", "普通", "8,451.00", "8,415.00"],
    ["GR202605080009", "2026-05-08 10:04:49", "R1776072601", "P719334", "关云长", "INR", 75.50, 50.00, "2.51", "普通", "36,780.25", "36,855.75"],
    ["GR202605080010", "2026-05-08 09:58:27", "R1776072555", "P882011", "丛林之王", "BRL", -260.00, 260.00, "0.00", "点杀", "12,900.00", "12,640.00"],
    ["GR202605080011", "2026-05-08 09:51:04", "R1776072490", "P337126", "麻将胡了", "INR", 420.00, 180.00, "3.33", "普通", "78,340.00", "78,760.00"],
    ["GR202605080012", "2026-05-08 09:44:19", "R1776072431", "P998103", "糖果派对", "USDT", -92.00, 92.00, "0.00", "点杀", "6,214.30", "6,122.30"],
    ["GR202605080013", "2026-05-08 09:38:52", "R1776072388", "P721004", "赏金女王", "BRL", 650.00, 250.00, "3.60", "放水", "44,280.10", "44,930.10"],
    ["GR202605080014", "2026-05-08 09:31:37", "R1776072301", "P802771", "宝石矿工", "INR", -150.00, 150.00, "0.00", "普通", "18,920.00", "18,770.00"]
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

  function randomT() {
    return (Math.random() * 4.99 + 0.01).toFixed(2);
  }

  function freeSpinHtml(row) {
    var seed = Number(String(row[0] || "").slice(-2)) || 0;
    return "<span class=\"game-record-free-spin\">" + (seed % 3 === 0 ? "免费旋转" : "正常触发") + "</span>";
  }

  var slotSymbolAssets = {
    "金币": "files/游戏记录/symbols/coin.svg",
    "宝箱": "files/游戏记录/symbols/chest.svg",
    "财神": "files/游戏记录/symbols/bonus.svg",
    "玉石": "files/游戏记录/symbols/gem.svg",
    "铃铛": "files/游戏记录/symbols/bell.svg",
    "WILD": "files/游戏记录/symbols/wild.svg",
    "A": "files/游戏记录/symbols/card-a.svg",
    "K": "files/游戏记录/symbols/card-k.svg",
    "Q": "files/游戏记录/symbols/card-q.svg"
  };

  function slotSymbolHtml(symbol, active) {
    var src = slotSymbolAssets[symbol] || slotSymbolAssets["WILD"];
    return "<span class=\"win-symbol" + active + "\" title=\"" + escapeHtml(symbol) + "\"><img src=\"" + src + "\" alt=\"" + escapeHtml(symbol) + "\"></span>";
  }

  function rowHtml(row) {
    var winClass = row[6] >= 0 ? "is-positive" : "is-negative";
    return "<tr>" +
      "<td><button class=\"game-record-link\" data-record=\"" + row[0] + "\">" + row[0] + "</button></td>" +
      "<td>" + row[1] + "</td><td>" + row[2] + "</td>" +
      "<td><button class=\"game-record-link\" data-player=\"" + row[3] + "\">" + row[3] + "</button></td>" +
      "<td>" + row[4] + "</td><td>" + row[5] + "</td>" +
      "<td class=\"" + winClass + "\">" + money(row[6]) + "</td>" +
      "<td>" + money(row[7]).replace("+", "") + "</td><td>" + row[8] + "</td><td>" + freeSpinHtml(row) + "</td><td>" + randomT() + "</td>" +
      "<td><span class=\"game-record-strategy\">" + row[9] + "</span></td>" +
      "<td>" + row[10] + "</td><td>" + row[11] + "</td>" +
    "</tr>";
  }

  function renderRows(root, rows) {
    root.querySelector(".game-records-table tbody").innerHTML = rows.map(rowHtml).join("");
  }

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

  function findRecord(recordId) {
    for (var i = 0; i < records.length; i += 1) {
      if (records[i][0] === recordId) return records[i];
    }
    return null;
  }

  function recordDetailRows(row) {
    var response = "{\"isSuccess\":true,\"code\":0,\"message\":\"执行成功\",\"data\":{\"tenantId\":21377,\"userId\":\"" + row[3] + "\",\"balance\":" + row[11].replace(/,/g, "") + ",\"currency\":\"" + row[5] + "\"}}";
    var crash = Math.max(parseFloat(row[8]) + 0.18, 1.01).toFixed(2);
    return [
      ["游戏名称", "<span class=\"record-detail-game\"><span class=\"record-detail-game-icon\">" + escapeHtml(row[4].slice(0, 1)) + "</span>" + escapeHtml(row[4]) + "</span>"],
      ["记录ID", escapeHtml(row[0])],
      ["时间", escapeHtml(row[1])],
      ["下注金额", escapeHtml(money(row[7]).replace("+", ""))],
      ["玩家输赢", escapeHtml(money(row[6]).replace("+", ""))],
      ["商户响应", "<span class=\"record-detail-response\">" + escapeHtml(response) + "</span>"],
      ["控制规则", escapeHtml(row[9] === "普通" ? "默认RTP" : row[9])],
      ["跳伞倍数", escapeHtml(row[8])],
      ["爆炸倍数", escapeHtml(crash)]
    ];
  }

  function winDetailHtml(row) {
    var totalWin = Math.max(Math.abs(row[6]), row[7] * Math.max(parseFloat(row[8]), 1.2));
    var rounds = [
      {
        title: "第1次消除",
        line: "连线 03",
        symbol: "金币",
        count: 5,
        multiple: "0.72",
        prize: totalWin * 0.34,
        positions: [0, 1, 2, 3, 4],
        reels: ["金币", "金币", "金币", "金币", "金币", "宝箱", "A", "K", "WILD", "Q", "玉石", "A", "宝箱", "K", "铃铛"]
      },
      {
        title: "第2次消除",
        line: "连线 08",
        symbol: "宝箱",
        count: 4,
        multiple: "0.58",
        prize: totalWin * 0.28,
        positions: [5, 6, 7, 8],
        reels: ["财神", "玉石", "A", "K", "铃铛", "宝箱", "宝箱", "宝箱", "宝箱", "Q", "金币", "WILD", "K", "玉石", "A"]
      },
      {
        title: "第3次消除",
        line: "连线 12",
        symbol: "WILD",
        count: 3,
        multiple: "0.46",
        prize: totalWin * 0.22,
        positions: [2, 7, 12],
        reels: ["A", "金币", "WILD", "宝箱", "K", "玉石", "Q", "WILD", "铃铛", "A", "财神", "宝箱", "WILD", "K", "金币"]
      },
      {
        title: "免费旋转加奖",
        line: "散布奖励",
        symbol: "财神",
        count: 3,
        multiple: "0.33",
        prize: totalWin * 0.16,
        positions: [1, 7, 13],
        reels: ["金币", "财神", "A", "宝箱", "玉石", "K", "铃铛", "财神", "Q", "WILD", "A", "金币", "宝箱", "财神", "K"]
      }
    ];
    var cumulative = 0;
    var rows = rounds.map(function(round) {
      cumulative += round.prize;
      var cells = round.reels.map(function(symbol, index) {
        var active = round.positions.indexOf(index) !== -1 ? " is-win" : "";
        return slotSymbolHtml(symbol, active);
      }).join("");
      return "<div class=\"win-round\">" +
        "<div class=\"win-round-head\"><strong>" + round.title + "</strong><span>" + round.line + " / " + round.symbol + " x" + round.count + "</span></div>" +
        "<div class=\"win-layout\">" + cells + "</div>" +
        "<div class=\"win-round-metrics\"><span>倍数 <b>" + round.multiple + "</b></span><span>本次奖金 <b>" + money(round.prize).replace("+", "") + "</b></span><span>累计奖金 <b>" + money(cumulative).replace("+", "") + "</b></span></div>" +
      "</div>";
    }).join("");

    return "<div class=\"win-detail-summary\">" +
      "<span>游戏：" + escapeHtml(row[4]) + "</span>" +
      "<span>记录ID：" + escapeHtml(row[0]) + "</span>" +
      "<span>总奖金：" + money(totalWin).replace("+", "") + " " + escapeHtml(row[5]) + "</span>" +
    "</div>" + rows;
  }

  function activateRecordDetailTab(modal, tabName) {
    Array.prototype.forEach.call(modal.querySelectorAll("[data-detail-tab]"), function(tab) {
      tab.classList.toggle("is-active", tab.getAttribute("data-detail-tab") === tabName);
    });
    Array.prototype.forEach.call(modal.querySelectorAll("[data-detail-section]"), function(section) {
      section.hidden = section.getAttribute("data-detail-section") !== tabName;
    });
  }

  function ensureRecordModal() {
    var modal = document.querySelector(".codex-detail-modal");
    if (modal) return modal;

    modal = document.createElement("div");
    modal.className = "game-record-modal codex-detail-modal";
    modal.hidden = true;
    modal.innerHTML =
      "<div class=\"record-detail-panel\" role=\"dialog\" aria-modal=\"true\" aria-label=\"详情\">" +
        "<div class=\"record-detail-header\"><div class=\"record-detail-tabs\"><button type=\"button\" class=\"is-active\" data-detail-tab=\"base\">详情</button><button type=\"button\" data-detail-tab=\"win\">中奖详情</button></div><button type=\"button\" class=\"record-detail-close\" aria-label=\"关闭\">×</button></div>" +
        "<div class=\"record-detail-body\" data-detail-section=\"base\"><table><tbody></tbody></table></div>" +
        "<div class=\"record-detail-win\" data-detail-section=\"win\" hidden></div>" +
        "<div class=\"record-detail-footer\"><button type=\"button\" class=\"record-detail-ok\">确定</button></div>" +
      "</div>";

    modal.addEventListener("click", function(event) {
      var tab = event.target.closest("[data-detail-tab]");
      if (tab) {
        activateRecordDetailTab(modal, tab.getAttribute("data-detail-tab"));
        return;
      }
      if (event.target === modal || event.target.classList.contains("record-detail-close") || event.target.classList.contains("record-detail-ok")) {
        modal.hidden = true;
      }
    });

    document.body.appendChild(modal);
    return modal;
  }

  function openRecordDetail(recordId) {
    var row = findRecord(recordId);
    if (!row) return;

    var modal = ensureRecordModal();
    var tbody = modal.querySelector("[data-detail-section='base'] tbody");
    tbody.innerHTML = recordDetailRows(row).map(function(item) {
      var empty = item[0] ? "" : " class=\"record-detail-empty\"";
      return "<tr" + empty + "><th>" + escapeHtml(item[0]) + "</th><td>" + item[1] + "</td></tr>";
    }).join("");
    modal.querySelector("[data-detail-section='win']").innerHTML = winDetailHtml(row);
    activateRecordDetailTab(modal, "base");
    modal.hidden = false;
  }

  function plainMoney(value) {
    return Number(value || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function playerRecords(playerId) {
    return records.filter(function(row) {
      return row[3] === playerId;
    });
  }

  function playerSnapshot(playerId) {
    var list = playerRecords(playerId);
    var source = list[0] || records[0];
    var totalBet = list.reduce(function(sum, row) { return sum + Number(row[7] || 0); }, 0);
    var totalProfit = list.reduce(function(sum, row) { return sum + Number(row[6] || 0); }, 0);
    var balance = Number(String(source[11] || "0").replace(/,/g, ""));
    var seed = Number(String(playerId).replace(/\D/g, "").slice(-4)) || 1000;
    return {
      playerId: playerId,
      merchant: "星海娱乐 M10086",
      loginIp: "103.44." + (seed % 90 + 10) + "." + (seed % 180 + 30),
      createdAt: "2026-05-" + String(seed % 18 + 1).padStart(2, "0") + " 10:21:44",
      lastLogin: source[1],
      status: seed % 2 ? "在线" : "离线",
      currency: source[5],
      todayBet: totalBet || Number(source[7] || 0),
      todayProfit: totalProfit || Number(source[6] || 0),
      historyBet: (totalBet || Number(source[7] || 0)) * (seed % 26 + 18),
      historyProfit: (totalProfit || Number(source[6] || 0)) * (seed % 12 + 6),
      balance: balance,
      loginCount: (seed % 9 + 1) + " / " + (seed % 220 + 80),
      records: list.length ? list : [source]
    };
  }

  function playerModalTabsHtml() {
    return ["基础信息", "下注信息", "登录日志", "用户标签", "关联账号"].map(function(tab, index) {
      return "<button type=\"button\" class=\"player-modal-tab" + (index === 0 ? " is-active" : "") + "\" data-player-tab=\"" + tab + "\">" + tab + "</button>";
    }).join("");
  }

  function playerBaseInfoHtml(row) {
    var rtp = row.historyBet ? ((row.historyBet + row.historyProfit) / row.historyBet * 100).toFixed(2) : "0.00";
    return "<div class=\"player-base-layout\">" +
      "<div class=\"modal-section-head\"><span>基础资料</span><button type=\"button\" class=\"control-btn\">点控</button></div>" +
      "<table class=\"info-table\"><tbody>" +
        "<tr><th>账号ID</th><td>" + escapeHtml(row.playerId) + "</td><th>商户站点</th><td>" + escapeHtml(row.merchant) + "</td></tr>" +
        "<tr><th>余额</th><td>" + plainMoney(row.balance) + "</td><th>游戏局数</th><td>" + Math.max(1, row.records.length).toLocaleString("en-US") + "</td></tr>" +
        "<tr><th>总返奖</th><td>" + plainMoney(row.historyBet + row.historyProfit) + "</td><th>总派奖</th><td>" + plainMoney(row.historyBet * 0.18) + "</td></tr>" +
        "<tr><th>累计输赢</th><td class=\"" + (row.historyProfit >= 0 ? "money-positive" : "money-negative") + "\">" + plainMoney(row.historyProfit) + "</td><th>RTP</th><td>" + rtp + "%</td></tr>" +
        "<tr><th>创建时间</th><td>" + row.createdAt + "</td><th>登录次数</th><td>" + row.loginCount.split("/").pop().trim() + "</td></tr>" +
        "<tr><th>最后登录时间</th><td>" + row.lastLogin + "</td><th>最后登录IP</th><td><span>" + row.loginIp + "</span><button type=\"button\" class=\"ip-history-toggle\" data-ip-history>展开</button></td></tr>" +
        "<tr><th>控制</th><td colspan=\"3\">RTP 70%　目标 " + plainMoney(row.historyBet * 0.12) + "　目前 " + plainMoney(row.historyProfit) + "</td></tr>" +
      "</tbody></table>" +
      "<div class=\"ip-history-panel\" hidden>" +
        "<div class=\"ip-history-title\">历史登录IP <span>共 4 个</span></div>" +
        "<div class=\"ip-history-list\"><span>" + row.loginIp + "</span><span>103.44.18.92</span><span>45.118.22.16</span><span>182.74.21.109</span></div>" +
      "</div>" +
    "</div>";
  }

  function playerTableHtml(headers, data, extraClass) {
    return "<div class=\"modal-table-card\"><table class=\"modal-table " + (extraClass || "") + "\"><thead><tr>" +
      headers.map(function(header) { return "<th>" + header + "</th>"; }).join("") +
      "</tr></thead><tbody>" +
      data.map(function(row) {
        return "<tr>" + row.map(function(cell) {
          return "<td>" + String(cell).replace(/\n/g, "<br>") + "</td>";
        }).join("") + "</tr>";
      }).join("") +
      "</tbody></table></div>";
  }

  function playerBetInfoHtml(row) {
    var data = row.records.slice(0, 8).map(function(record) {
      return [record[0], record[1], record[2], record[4], plainMoney(record[7]), plainMoney(Number(record[7]) + Number(record[6])), record[8], randomT(), (Number(record[6]) >= 0 ? "高" : "低") + plainMoney(Math.abs(record[6]) * 12), record[9], record[11]];
    });
    return playerTableHtml(["记录ID", "时间", "牌局编号", "游戏名称", "下注金额", "游戏返奖", "返奖倍数", "T", "高/低库存", "控制策略", "账户余额"], data, "bet-info-table");
  }

  function playerLoginLogHtml(row) {
    return playerTableHtml(["时间", "登录ip", "登录设备", "操作", "登录余额"], [
      [row.lastLogin, row.loginIp, "Chrome 125 / Windows 11", "登录", plainMoney(row.balance)],
      ["2026-05-27 21:08:31", "103.44.18.92", "Safari 17 / iOS 17", "登录", plainMoney(row.balance - 320)],
      ["2026-05-26 18:42:17", "45.118.22.16", "Edge 124 / Windows 10", "退出", plainMoney(row.balance - 560)]
    ]);
  }

  function playerTagsHtml() {
    return playerTableHtml(["标签", "说明"], [
      ["【新】高频活跃户", "获利即走，RTP异常，自杀式倍投，机械下注"],
      ["【白名单潜力】\n【新】优质贡献户", "自杀式倍投，机械下注"],
      ["重点风控核心风险户", "快速大额盈利，机械下注"]
    ], "tag-table");
  }

  function playerLinkedAccountsHtml(row) {
    var base = Number(String(row.playerId).replace(/\D/g, "").slice(-8)) || 10000000;
    return "<div class=\"linked-title\">同IP账号</div>" +
      playerTableHtml(["用户id", "注册时长(天)", "游戏局数", "累计输赢(RTP)", "余额"], [
        [row.playerId, "29", Math.max(1, row.records.length), plainMoney(row.historyProfit) + " (" + ((row.historyBet + row.historyProfit) / row.historyBet * 100).toFixed(2) + "%)", plainMoney(row.balance)],
        ["P" + (base + 246), "18", "72", "106,500.37 (112.54%)", "905,255.00"]
      ]) +
      "<div class=\"linked-title linked-title-secondary\">行为相似账号</div>" +
      playerTableHtml(["用户id", "注册时长(天)", "游戏局数", "累计输赢(RTP)", "余额"], [
        ["P" + (base + 531), "26", "118", plainMoney(row.historyProfit * 0.82) + " (108.31%)", plainMoney(row.balance * 0.76)],
        ["P" + (base + 918), "31", "96", plainMoney(row.historyProfit * 0.64) + " (104.92%)", plainMoney(row.balance * 0.58)]
      ]);
  }

  function playerModalContent(tab, row) {
    if (tab === "下注信息") return playerBetInfoHtml(row);
    if (tab === "登录日志") return playerLoginLogHtml(row);
    if (tab === "用户标签") return playerTagsHtml(row);
    if (tab === "关联账号") return playerLinkedAccountsHtml(row);
    return playerBaseInfoHtml(row);
  }

  function ensurePlayerModal() {
    var modal = document.querySelector(".game-player-modal");
    if (modal) return modal;
    modal = document.createElement("div");
    modal.className = "player-modal-mask game-player-modal";
    modal.hidden = true;
    document.body.appendChild(modal);
    modal.addEventListener("click", function(event) {
      if (event.target.closest("[data-modal-close]") || event.target === modal) {
        modal.hidden = true;
        return;
      }
      var tab = event.target.closest("[data-player-tab]");
      if (tab) {
        var panel = tab.closest(".player-modal-panel");
        var row = playerSnapshot(panel.getAttribute("data-active-player"));
        Array.prototype.forEach.call(panel.querySelectorAll("[data-player-tab]"), function(item) {
          item.classList.toggle("is-active", item === tab);
        });
        panel.querySelector(".player-modal-body").innerHTML = playerModalContent(tab.getAttribute("data-player-tab"), row);
        return;
      }
      var ipHistory = event.target.closest("[data-ip-history]");
      if (ipHistory) {
        var historyPanel = ipHistory.closest(".player-base-layout").querySelector(".ip-history-panel");
        var willShow = historyPanel.hidden;
        historyPanel.hidden = !willShow;
        ipHistory.textContent = willShow ? "收起" : "展开";
      }
    });
    return modal;
  }

  function openPlayerOverviewModal(playerId) {
    var row = playerSnapshot(playerId);
    var modal = ensurePlayerModal();
    modal.innerHTML =
      "<div class=\"player-modal-panel\" data-active-player=\"" + escapeHtml(row.playerId) + "\">" +
        "<div class=\"player-modal-head\"><div class=\"player-modal-title\">玩家详情</div><button type=\"button\" class=\"player-modal-close\" data-modal-close>×</button></div>" +
        "<div class=\"player-modal-tabs\">" + playerModalTabsHtml() + "</div>" +
        "<div class=\"player-modal-body\">" + playerBaseInfoHtml(row) + "</div>" +
        "<div class=\"player-modal-actions\"><button type=\"button\" class=\"modal-primary\" data-modal-close>确定</button></div>" +
      "</div>";
    modal.hidden = false;
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
      "<div class=\"game-records-table-card\"><div class=\"game-records-table-wrap\"><table class=\"game-records-table\"><thead><tr><th>记录ID</th><th>时间</th><th>牌局编号</th><th>玩家id</th><th>游戏名称</th><th>货币</th><th>玩家输赢</th><th>下注金额</th><th>返奖倍数</th><th>免费旋转</th><th>T</th><th>控制策略</th><th>下注前</th><th>结算后</th></tr></thead><tbody></tbody></table></div></div>";

    base.appendChild(page);
    renderRows(page, records);
    syncGameFilter(page);

    page.addEventListener("click", function(event) {
      var action = event.target.getAttribute("data-action");
      var recordButton = event.target.closest("[data-record]");
      if (recordButton) {
        openRecordDetail(recordButton.getAttribute("data-record"));
        return;
      }
      var playerButton = event.target.closest("[data-player]");
      if (playerButton) {
        openPlayerOverviewModal(playerButton.getAttribute("data-player"));
        return;
      }
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
          return (!player || row[3].indexOf(player) !== -1) && (!record || row[0].indexOf(record) !== -1) && (!games.length || games.indexOf(row[4]) !== -1) && (!currency || row[5] === currency) && (!strategy || row[9] === strategy);
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
