(() => {
  const merchants = ["星河互娱", "海岸娱乐", "云顶商盟", "北辰渠道", "晨曦代理", "火山商务", "启航互联", "海蓝平台"];
  const brands = ["PG", "PP", "JILI", "SPRLBE"];
  const games = [
    "Fortune Gems",
    "Dragon Treasure",
    "Lucky Candy",
    "Ocean Pearl",
    "Bowling King",
    "Maya Gold",
    "Power Of Kraken",
    "Golden Train",
  ];
  const playerLevels = ["低端玩家", "中端玩家", "优质玩家", "疑似刷分"];
  const siteCodes = ["SG-01", "MY-02", "TH-03", "PH-04", "VN-05", "ID-06"];
  const riskLevels = ["低", "中", "高"];
  const settlementStatus = ["待审核", "待出款", "已完成", "异常"];

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatNumber(value, digits = 0) {
    return Number(value).toLocaleString("en-US", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    });
  }

  function formatMoney(value) {
    return formatNumber(value, 2);
  }

  function formatSignedMoney(value) {
    const numeric = Number(value);
    return `${numeric >= 0 ? "" : "-"}${formatMoney(Math.abs(numeric))}`;
  }

  function formatPercent(value, digits = 2) {
    return `${formatNumber(value, digits)}%`;
  }

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function dateShift(days) {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

  function datetimeShift(hours) {
    const d = new Date();
    d.setHours(d.getHours() - hours);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(
      d.getMinutes(),
    )}`;
  }

  function monthShift(months) {
    const d = new Date();
    d.setMonth(d.getMonth() - months);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
  }

  function range(count, mapper) {
    return Array.from({ length: count }, (_, index) => mapper(index));
  }

  function toneClass(value) {
    if (value > 0) return "positive";
    if (value < 0) return "negative";
    return "neutral";
  }

  function badge(text, tone = "neutral") {
    return `<span class="status-chip ${tone}">${escapeHtml(text)}</span>`;
  }

  function metric(label, value, meta, tone = "neutral") {
    return { label, value, meta, tone };
  }

  function tablePage(config) {
    return {
      type: "table",
      defaultPageSize: 20,
      pageSizeOptions: [10, 20, 50, 100],
      filters: [],
      summary: [],
      tableTitle: config.title,
      tableDescription: config.description,
      ...config,
    };
  }

  function formPage(config) {
    return {
      type: "form",
      actions: [
        { label: "重置", action: "form-reset", tone: "secondary" },
        { label: "保存", action: "form-save", tone: "primary" },
      ],
      sections: [],
      formDefaults: {},
      ...config,
    };
  }

  function buildGameRecordRows(count) {
    return range(count, (index) => {
      const bet = 1200 + index * 183;
      const payout = bet * (0.62 + (index % 5) * 0.18);
      return {
        merchant: merchants[index % merchants.length],
        brand: brands[index % brands.length],
        game: games[index % games.length],
        orderId: `GR${202605090001 + index}`,
        platformId: `1047${String(11100000 + index * 137).padStart(8, "0")}`,
        roundId: `R-${900100 + index}`,
        betAmount: bet,
        payoutAmount: payout,
        profitAmount: bet - payout,
        status: ["已结算", "异常补单", "待结算"][index % 3],
        statusTone: ["success", "warning", "neutral"][index % 3],
        createdAt: datetimeShift(index + 1),
      };
    });
  }

  function buildOperationsRows(count) {
    return range(count, (index) => {
      const turnover = 24000 + index * 1880;
      const payout = turnover * (0.81 + (index % 4) * 0.03);
      const activeUsers = 380 + index * 11;
      return {
        date: dateShift(index),
        merchant: merchants[index % merchants.length],
        brand: brands[index % brands.length],
        game: games[index % games.length],
        activeUsers,
        newUsers: 36 + (index % 8) * 4,
        turnover,
        payout,
        profit: turnover - payout,
        arpu: turnover / activeUsers,
      };
    });
  }

  function buildTodayProfitRows(count) {
    return range(count, (index) => {
      const bet = 3600 + index * 233;
      const winLoss = (index % 2 === 0 ? -1 : 1) * (220 + index * 31);
      return {
        platformId: `1047${String(30000000 + index * 93).padStart(8, "0")}`,
        merchant: merchants[index % merchants.length],
        site: siteCodes[index % siteCodes.length],
        level: playerLevels[index % playerLevels.length],
        game: games[index % games.length],
        todayBet: bet,
        todayWinLoss: winLoss,
        todayRtp: 78.3 + (index % 5) * 3.1,
        controlStatus: ["正常", "监控中", "已点控"][index % 3],
        updatedAt: datetimeShift(index * 2 + 2),
      };
    });
  }

  function buildFlightBurstRows(count) {
    return range(count, (index) => {
      const burst = 1.2 + (index % 9) * 0.45;
      const activeRooms = 18 + (index % 6);
      return {
        date: datetimeShift(index),
        roomCode: `FL-${1001 + index}`,
        merchant: merchants[index % merchants.length],
        site: siteCodes[index % siteCodes.length],
        roundCount: 560 + index * 18,
        averageBurst: burst,
        highestBurst: burst + 8.4 + (index % 3) * 1.2,
        activeRooms,
        riskLevel: riskLevels[index % riskLevels.length],
      };
    });
  }

  function buildOnlineRows(count) {
    return range(count, (index) => ({
      snapshotAt: datetimeShift(index),
      merchant: merchants[index % merchants.length],
      site: siteCodes[index % siteCodes.length],
      currentOnline: 120 + index * 7,
      peakOnline: 200 + index * 9,
      avgStay: `${10 + (index % 7)} 分钟`,
      activeGames: 16 + (index % 5),
      newLogin: 20 + (index % 8) * 3,
    }));
  }

  function buildRetentionRows(count, mode) {
    return range(count, (index) => ({
      date: dateShift(index),
      merchant: merchants[index % merchants.length],
      dimension: mode === "game" ? games[index % games.length] : playerLevels[index % playerLevels.length],
      day1: 62 - (index % 4) * 2.4,
      day3: 48 - (index % 5) * 1.8,
      day7: 36 - (index % 6) * 1.4,
      day15: 24 - (index % 6) * 1.1,
      day30: 12 - (index % 5) * 0.8,
    }));
  }

  function buildMerchantRows(count) {
    return range(count, (index) => ({
      merchantName: merchants[index % merchants.length],
      merchantCode: `M${String(8001 + index).padStart(4, "0")}`,
      walletMode: index % 2 === 0 ? "单一钱包" : "转账钱包",
      rate: `${1.2 + (index % 4) * 0.15}%`,
      status: ["启用", "审核中", "停用"][index % 3],
      statusTone: ["success", "warning", "danger"][index % 3],
      balance: 220000 + index * 16000,
      todayTurnover: 128000 + index * 9800,
      createdAt: dateShift(index + 5),
    }));
  }

  function buildMerchantProfitRows(count) {
    return range(count, (index) => {
      const turnover = 160000 + index * 12600;
      const payout = turnover * (0.84 + (index % 4) * 0.025);
      const fee = turnover * (0.008 + (index % 3) * 0.0015);
      return {
        month: monthShift(index % 6),
        merchant: merchants[index % merchants.length],
        turnover,
        payout,
        grossProfit: turnover - payout,
        fee,
        netProfit: turnover - payout - fee,
      };
    });
  }

  function buildGameListRows(count) {
    return range(count, (index) => ({
      gameName: games[index % games.length],
      gameId: `G-${10001 + index}`,
      brand: brands[index % brands.length],
      category: ["热门", "视讯", "棋牌", "飞机"][index % 4],
      rtp: 94.2 + (index % 5) * 0.6,
      roomCount: 12 + (index % 6) * 2,
      status: ["上架中", "维护中", "下架"][index % 3],
      statusTone: ["success", "warning", "danger"][index % 3],
      updatedAt: datetimeShift(index + 3),
    }));
  }

  function buildGameConfigRows(count) {
    return range(count, (index) => ({
      merchant: merchants[index % merchants.length],
      game: games[index % games.length],
      brand: brands[index % brands.length],
      lineLimit: 20000 + index * 500,
      betLimit: 500 + (index % 6) * 100,
      jackpotSwitch: index % 2 === 0 ? "开启" : "关闭",
      riskTemplate: ["基础模板", "高波动模板", "活动模板"][index % 3],
      updatedBy: ["admin", "finance", "risk"][index % 3],
      updatedAt: datetimeShift(index + 4),
    }));
  }

  function buildFlightRoomRows(count) {
    return range(count, (index) => ({
      roomName: `飞机房间 ${index + 1}`,
      roomCode: `FR-${1201 + index}`,
      merchant: merchants[index % merchants.length],
      baseBet: 10 + (index % 5) * 5,
      taxRate: `${3 + (index % 4)}%`,
      activeUsers: 20 + (index % 8) * 5,
      burstCap: `${6 + (index % 5)}x`,
      status: ["运行中", "维护中"][index % 2],
      statusTone: ["success", "warning"][index % 2],
    }));
  }

  function buildFlightRoomOpsData() {
    const rooms = [
      {
        id: "all",
        name: "全部房间",
        count: 34,
        tag: "GLOBAL",
        status: "stable",
        favorite: true,
        children: [
          {
            id: "inr",
            name: "INR大厅",
            count: 34,
            tag: "INR",
            status: "stable",
            favorite: true,
            children: [
              { id: "inr-1", name: "1号房", count: 10, tag: "低波", status: "stable", favorite: true },
              { id: "inr-2", name: "2号房", count: 8, tag: "中波", status: "warning", favorite: false },
              { id: "inr-3", name: "3号房", count: 6, tag: "高波", status: "danger", favorite: false },
              { id: "inr-4", name: "4号房", count: 10, tag: "扩容", status: "stable", favorite: false },
            ],
          },
        ],
      },
    ];

    const currencies = [
      { country: "印度", code: "INR", name: "Indian Rupee" },
      { country: "美国", code: "USD", name: "US Dollar" },
      { country: "巴西", code: "BRL", name: "Brazilian Real" },
      { country: "菲律宾", code: "PHP", name: "Philippine Peso" },
      { country: "越南", code: "VND", name: "Vietnamese Dong" },
      { country: "泰国", code: "THB", name: "Thai Baht" },
    ];

    return { rooms, currencies, defaultRoomId: "inr-1" };
  }

  function buildFlightRoomOpsData() {
    const siteGroups = [
      {
        id: "country-inr",
        name: "印度 INR",
        count: 100,
        traffic: 100,
        status: "stable",
        tag: "COUNTRY",
        children: [
          { id: "sites-all", name: "全部站点", count: 100, traffic: 100, status: "stable", tag: "ALL" },
          { id: "sites-vip", name: "VIP站点", count: 12, traffic: 24, status: "vip", tag: "VIP" },
          { id: "sites-high-rtp", name: "高RTP站点", count: 20, traffic: 26, status: "warning", tag: "HIGH RTP" },
          { id: "sites-campaign", name: "活动站点", count: 10, traffic: 14, status: "active", tag: "CAMPAIGN" },
          { id: "sites-normal", name: "普通站点", count: 58, traffic: 36, status: "stable", tag: "NORMAL" },
        ],
      },
    ];

    const rooms = [
      {
        id: "inr-1",
        name: "1号房",
        alias: "新手房",
        tag: "新手房",
        tone: "stable",
        online: 12840,
        inventory: 2860000,
        rtp: 96.4,
        volatility: "低波动",
        statusText: "运行中",
        sites: 42,
        winLoss: 184200,
        maxCrash: "128.6x",
        risk: 22,
        traffic: 70,
        heat: 84,
        autoRisk: "自动放水保护",
        source: "普通站点 58% / 活动站点 24%",
      },
      {
        id: "inr-2",
        name: "2号房",
        alias: "VIP房",
        tag: "VIP房",
        tone: "vip",
        online: 4210,
        inventory: 1240000,
        rtp: 97.8,
        volatility: "中高波动",
        statusText: "VIP流量",
        sites: 12,
        winLoss: -68200,
        maxCrash: "342.8x",
        risk: 48,
        traffic: 20,
        heat: 61,
        autoRisk: "大额下注追踪",
        source: "VIP站点 82% / 高RTP站点 18%",
      },
      {
        id: "inr-3",
        name: "3号房",
        alias: "高爆房",
        tag: "高爆房",
        tone: "danger",
        online: 1960,
        inventory: 420000,
        rtp: 101.9,
        volatility: "极高波动",
        statusText: "危险库存",
        sites: 8,
        winLoss: -156900,
        maxCrash: "998.4x",
        risk: 86,
        traffic: 10,
        heat: 43,
        autoRisk: "强制风控保护",
        source: "高RTP站点 60% / 活动站点 40%",
      },
      {
        id: "inr-4",
        name: "4号房",
        alias: "活动房",
        tag: "活动房",
        tone: "active",
        online: 6380,
        inventory: 1710000,
        rtp: 95.7,
        volatility: "中波动",
        statusText: "活动加权",
        sites: 18,
        winLoss: 92800,
        maxCrash: "76.3x",
        risk: 35,
        traffic: 34,
        heat: 73,
        autoRisk: "活动预算守卫",
        source: "活动站点 54% / 普通站点 46%",
      },
      {
        id: "inr-5",
        name: "5号房",
        alias: "风控房",
        tag: "风控房",
        tone: "risk",
        online: 880,
        inventory: 910000,
        rtp: 92.6,
        volatility: "受控波动",
        statusText: "风控保护",
        sites: 6,
        winLoss: 248600,
        maxCrash: "24.9x",
        risk: 58,
        traffic: 6,
        heat: 28,
        autoRisk: "黑名单隔离",
        source: "风控玩家池 100%",
      },
      {
        id: "inr-6",
        name: "6号房",
        alias: "放水房",
        tag: "放水房",
        tone: "warning",
        online: 3020,
        inventory: 760000,
        rtp: 99.2,
        volatility: "轻微放水",
        statusText: "轻微放水",
        sites: 14,
        winLoss: -35400,
        maxCrash: "188.2x",
        risk: 52,
        traffic: 16,
        heat: 55,
        autoRisk: "库存回撤阈值",
        source: "高RTP站点 70% / 活动站点 30%",
      },
    ];

    const currencies = [
      { country: "印度", code: "INR", name: "Indian Rupee" },
      { country: "美国", code: "USD", name: "US Dollar" },
      { country: "巴西", code: "BRL", name: "Brazilian Real" },
      { country: "菲律宾", code: "PHP", name: "Philippine Peso" },
      { country: "越南", code: "VND", name: "Vietnamese Dong" },
      { country: "泰国", code: "THB", name: "Thai Baht" },
    ];

    return {
      rooms,
      siteGroups,
      currencies,
      defaultRoomId: "inr-1",
      countryStats: {
        country: "印度",
        currency: "INR",
        online: 29310,
        rtp: 96.8,
        inventory: 7900000,
        dangerRooms: 1,
        openRooms: 10,
        totalSites: 100,
      },
    };
  }

  function buildInventoryRows(count) {
    return range(count, (index) => ({
      warehouse: `库存池 ${1 + (index % 4)}`,
      game: games[index % games.length],
      brand: brands[index % brands.length],
      totalChip: 320000 + index * 28000,
      warningLine: 180000 + index * 12000,
      availableChip: 200000 + index * 16000,
      occupancy: `${58 + (index % 7) * 4}%`,
      status: ["正常", "预警", "紧张"][index % 3],
      statusTone: ["success", "warning", "danger"][index % 3],
    }));
  }

  function buildPlayerOverviewRows(count) {
    return range(count, (index) => {
      const turnover = 6000 + index * 320;
      return {
        platformId: `1047${String(77000000 + index * 51).padStart(8, "0")}`,
        merchant: merchants[index % merchants.length],
        level: playerLevels[index % playerLevels.length],
        totalRecharge: 8000 + index * 420,
        totalWithdraw: 4200 + index * 210,
        todayTurnover: turnover,
        todayWinLoss: (index % 2 === 0 ? -1 : 1) * (100 + index * 22),
        loginAt: datetimeShift(index + 1),
      };
    });
  }

  function buildSmartControlRows(count) {
    return range(count, (index) => ({
      platformId: `1047${String(88000000 + index * 67).padStart(8, "0")}`,
      merchant: merchants[index % merchants.length],
      label: playerLevels[index % playerLevels.length],
      recentRtp: 72 + (index % 5) * 4.2,
      abnormalIndex: `${68 + (index % 6) * 5} 分`,
      suggestion: ["建议控输", "建议观察", "建议解除"][index % 3],
      suggestionTone: ["danger", "warning", "success"][index % 3],
      updatedAt: datetimeShift(index + 2),
    }));
  }

  function buildPlayerControlPreview(count) {
    return range(count, (index) => ({
      platformId: `1047${String(66000000 + index * 89).padStart(8, "0")}`,
      merchant: merchants[index % merchants.length],
      target: index % 2 === 0 ? `品牌 ${brands[index % brands.length]}` : games[index % games.length],
      currentRtp: `${78 + (index % 4) * 5}%`,
      todayBet: 2000 + index * 360,
      winLoss: (index % 2 === 0 ? -1 : 1) * (160 + index * 18),
      releaseRule: ["金额解除", "RTP解除", "时间解除"][index % 3],
      status: ["控输中", "控赢中", "待解除"][index % 3],
      statusTone: ["warning", "success", "neutral"][index % 3],
    }));
  }

  function buildFinanceOverviewRows(count) {
    return range(count, (index) => ({
      date: dateShift(index),
      merchant: merchants[index % merchants.length],
      recharge: 240000 + index * 15000,
      withdraw: 180000 + index * 12000,
      platformProfit: 42000 + index * 3300,
      pendingSettlement: 26000 + index * 1600,
      feeIncome: 5200 + index * 320,
    }));
  }

  function buildExchangeRateRows(count) {
    const currencies = ["USD/CNY", "USDT/CNY", "MYR/CNY", "THB/CNY", "PHP/CNY", "VND/CNY"];
    return range(count, (index) => ({
      pair: currencies[index % currencies.length],
      source: ["Binance", "OTC", "Bank", "Manual"][index % 4],
      latestRate: 6.82 + index * 0.037,
      fluctuation: (index % 2 === 0 ? 1 : -1) * (0.12 + (index % 4) * 0.03),
      updatedAt: datetimeShift(index + 1),
      updatedBy: ["finance", "admin", "system"][index % 3],
    }));
  }

  function buildSettlementRows(count, pendingOnly) {
    return range(count, (index) => {
      const turnover = 120000 + index * 9800;
      const fee = turnover * (0.009 + (index % 3) * 0.001);
      return {
        billNo: `JS${202605090001 + index}`,
        merchant: merchants[index % merchants.length],
        month: monthShift(index % 4),
        turnover,
        fee,
        amount: turnover - fee,
        status: pendingOnly ? settlementStatus[index % 2] : settlementStatus[index % settlementStatus.length],
        statusTone: pendingOnly
          ? ["warning", "neutral"][index % 2]
          : ["warning", "neutral", "success", "danger"][index % 4],
        updatedAt: datetimeShift(index + 6),
      };
    });
  }

  function buildRechargeRows(count) {
    return range(count, (index) => ({
      orderId: `CZ${202605090001 + index}`,
      merchant: merchants[index % merchants.length],
      channel: ["USDT-TRC20", "银行卡", "代理转账"][index % 3],
      amount: 16000 + index * 2400,
      fee: 120 + (index % 6) * 20,
      status: ["已到账", "待确认", "驳回"][index % 3],
      statusTone: ["success", "warning", "danger"][index % 3],
      createdAt: datetimeShift(index + 3),
    }));
  }

  function buildGiftBalanceRows(count) {
    return range(count, (index) => ({
      merchant: merchants[index % merchants.length],
      platformId: `1047${String(93000000 + index * 73).padStart(8, "0")}`,
      operator: ["admin", "risk", "finance"][index % 3],
      amount: 100 + (index % 9) * 50,
      reason: ["活动赠送", "补单修正", "人工补贴"][index % 3],
      status: ["已发放", "待复核"][index % 2],
      statusTone: ["success", "warning"][index % 2],
      createdAt: datetimeShift(index + 1),
    }));
  }

  function buildMessageRows(count) {
    return range(count, (index) => ({
      title: ["例行维护通知", "支付通道调整", "活动公告", "风控提醒"][index % 4],
      level: ["普通", "重要", "紧急"][index % 3],
      target: ["全部商户", "全部玩家", merchants[index % merchants.length]][index % 3],
      channel: ["站内信", "弹窗", "站内信 + 弹窗"][index % 3],
      status: ["已发布", "草稿", "已下线"][index % 3],
      statusTone: ["success", "warning", "neutral"][index % 3],
      updatedAt: datetimeShift(index + 1),
      operator: ["admin", "ops", "notice"][index % 3],
    }));
  }

  function buildAccountRows(count) {
    return range(count, (index) => ({
      account: ["admin", "risk", "finance", "merchant", "ops"][index % 5] + pad(index + 1),
      role: ["超级管理员", "风控专员", "财务专员", "运营专员"][index % 4],
      scope: [merchants[index % merchants.length], "全部商户", "总后台"][index % 3],
      loginIp: `10.23.${20 + (index % 18)}.${80 + index}`,
      status: ["启用", "冻结"][index % 2],
      statusTone: ["success", "danger"][index % 2],
      updatedAt: datetimeShift(index + 2),
    }));
  }

  function buildOperationLogRows(count) {
    return range(count, (index) => ({
      operator: ["admin", "risk", "finance", "ops"][index % 4],
      module: ["商户管理", "玩家点控", "财务结算", "消息发布"][index % 4],
      action: ["新增", "修改", "删除", "审核"][index % 4],
      target: ["商户资料", "RTP配置", "结算单", "系统消息"][index % 4],
      result: ["成功", "成功", "成功", "失败"][index % 4],
      resultTone: ["success", "success", "success", "danger"][index % 4],
      ip: `10.8.${30 + (index % 9)}.${120 + index}`,
      createdAt: datetimeShift(index + 1),
    }));
  }

  const pageConfigs = {
    dashboard: {
      type: "dashboard",
      title: "首页仪表盘",
      section: "概括",
      description: "总览当前商户、玩家、财务和风控核心状态。",
      summary: [
        metric("活跃商户", "128", "较昨日 +6", "positive"),
        metric("今日流水", formatMoney(3286600), "总后台实时汇总", "neutral"),
        metric("待处理风控", "14", "高优先级 3 项", "warning"),
        metric("待结算账单", "23", "本周预计出款 8 笔", "danger"),
      ],
      modules: [
        { title: "数据管理", text: "注单、运营、留存、在线与爆点数据已统一到后台数据界面。", key: "operations-data" },
        { title: "商户管理", text: "商户列表、创建商户、商户盈亏已迁入统一壳层。", key: "merchant-list" },
        { title: "游戏管理", text: "游戏列表、配置、飞机房间和 RTP 配置均可继续扩展。", key: "game-list" },
        { title: "玩家管理", text: "玩家总览、智能点控推荐、玩家点控同一视觉体系。", key: "player-overview" },
        { title: "财务管理", text: "财务总览、汇率、结算、充值和赠送余额集中展示。", key: "finance-overview" },
        { title: "后台管理", text: "账号、权限和操作日志页面已经整理为可维护结构。", key: "account-manage" },
      ],
      riskRows: buildSmartControlRows(6),
      settlementRows: buildSettlementRows(6, true),
      messageRows: buildMessageRows(5),
    },
    "game-records": tablePage({
      title: "游戏记录",
      section: "数据管理",
      description: "按商户、游戏、平台和时间检索注单明细。",
      tableTitle: "游戏记录明细",
      tableDescription: "支持平台 ID、品牌、游戏和日期组合筛选。",
      summary: [
        metric("今日注单量", formatNumber(68422), "异常补单 16 条", "neutral"),
        metric("结算金额", formatMoney(829560), "已结算占比 92.4%", "positive"),
        metric("待结算笔数", formatNumber(514), "跨日注单 83 笔", "warning"),
      ],
      filters: [
        {
          key: "keyword",
          label: "平台ID / 订单号",
          type: "search",
          placeholder: "搜索平台ID、订单号、局号",
          apply: (row, value) =>
            [row.orderId, row.platformId, row.roundId].some((item) =>
              String(item).toLowerCase().includes(String(value).toLowerCase()),
            ),
        },
        {
          key: "brand",
          label: "游戏品牌",
          type: "select",
          options: ["全部", ...brands],
          apply: (row, value) => !value || value === "全部" || row.brand === value,
        },
        {
          key: "dateRange",
          label: "日期选择",
          type: "date-range",
          apply: (row, value) => {
            if (!value.start && !value.end) return true;
            const date = row.createdAt.slice(0, 10);
            if (value.start && date < value.start) return false;
            if (value.end && date > value.end) return false;
            return true;
          },
        },
      ],
      columns: [
        { label: "订单号", key: "orderId" },
        { label: "平台ID", key: "platformId", className: "mono" },
        { label: "商户", key: "merchant" },
        { label: "品牌", key: "brand" },
        { label: "游戏", key: "game" },
        { label: "局号", key: "roundId", className: "mono" },
        { label: "投注金额", render: (row) => renderMoneyCell(row.betAmount) },
        { label: "派彩金额", render: (row) => renderMoneyCell(row.payoutAmount) },
        { label: "盈亏", render: (row) => renderProfitCell(row.profitAmount) },
        { label: "状态", render: (row) => badge(row.status, row.statusTone) },
        { label: "创建时间", key: "createdAt" },
      ],
      rows: buildGameRecordRows(40),
    }),
    "operations-data": tablePage({
      title: "运营数据",
      section: "数据管理",
      description: "查看商户、品牌和游戏的核心经营数据。",
      summary: [
        metric("活跃用户", formatNumber(5680), "新用户 248", "positive"),
        metric("投注流水", formatMoney(2688200), "较昨日 +8.6%", "neutral"),
        metric("平台盈亏", formatSignedMoney(466820), "毛利率 17.3%", "positive"),
      ],
      filters: [
        {
          key: "merchant",
          label: "商户",
          type: "select",
          options: ["全部", ...merchants],
          apply: (row, value) => !value || value === "全部" || row.merchant === value,
        },
        {
          key: "brand",
          label: "品牌",
          type: "select",
          options: ["全部", ...brands],
          apply: (row, value) => !value || value === "全部" || row.brand === value,
        },
        {
          key: "dateRange",
          label: "日期选择",
          type: "date-range",
          apply: (row, value) => {
            if (!value.start && !value.end) return true;
            if (value.start && row.date < value.start) return false;
            if (value.end && row.date > value.end) return false;
            return true;
          },
        },
      ],
      columns: [
        { label: "日期", key: "date" },
        { label: "商户", key: "merchant" },
        { label: "品牌", key: "brand" },
        { label: "游戏", key: "game" },
        { label: "活跃用户", render: (row) => renderNumberCell(row.activeUsers) },
        { label: "新增用户", render: (row) => renderNumberCell(row.newUsers) },
        { label: "投注流水", render: (row) => renderMoneyCell(row.turnover) },
        { label: "派彩金额", render: (row) => renderMoneyCell(row.payout) },
        { label: "平台盈亏", render: (row) => renderProfitCell(row.profit) },
        { label: "ARPU", render: (row) => renderMoneyCell(row.arpu) },
      ],
      rows: buildOperationsRows(28),
    }),
    "today-player-profit": tablePage({
      title: "今日玩家盈亏",
      section: "数据管理",
      description: "围绕玩家维度查看今天的投注、盈亏与控制状态。",
      summary: [
        metric("今日点控玩家", "38", "解除 6 人", "warning"),
        metric("玩家总投注", formatMoney(962800), "高净值玩家占比 24%", "neutral"),
        metric("玩家总盈亏", formatSignedMoney(-188620), "控输有效率 81.4%", "danger"),
      ],
      filters: [
        {
          key: "keyword",
          label: "平台ID",
          type: "search",
          placeholder: "搜索平台ID",
          apply: (row, value) => row.platformId.includes(String(value).trim()),
        },
        {
          key: "level",
          label: "玩家标签",
          type: "select",
          options: ["全部", ...playerLevels],
          apply: (row, value) => !value || value === "全部" || row.level === value,
        },
        {
          key: "dateRange",
          label: "日期选择",
          type: "date-range",
          apply: () => true,
        },
      ],
      columns: [
        { label: "平台ID", key: "platformId", className: "mono" },
        { label: "商户", key: "merchant" },
        { label: "站点", key: "site" },
        { label: "玩家标签", render: (row) => badge(row.level, "neutral") },
        { label: "游戏", key: "game" },
        { label: "今日投注", render: (row) => renderMoneyCell(row.todayBet) },
        { label: "今日盈亏", render: (row) => renderProfitCell(row.todayWinLoss) },
        { label: "今日RTP", render: (row) => renderPercentCell(row.todayRtp) },
        { label: "控制状态", render: (row) => badge(row.controlStatus, row.controlStatus === "已点控" ? "warning" : "success") },
        { label: "更新时间", key: "updatedAt" },
      ],
      rows: buildTodayProfitRows(36),
    }),
    "flight-burst-data": tablePage({
      title: "飞机爆点数据",
      section: "数据管理",
      description: "跟踪飞机类房间的爆点区间、活跃度和异常风险。",
      filters: [
        {
          key: "merchant",
          label: "商户",
          type: "select",
          options: ["全部", ...merchants],
          apply: (row, value) => !value || value === "全部" || row.merchant === value,
        },
        {
          key: "risk",
          label: "风险等级",
          type: "select",
          options: ["全部", ...riskLevels],
          apply: (row, value) => !value || value === "全部" || row.riskLevel === value,
        },
        {
          key: "dateRange",
          label: "日期选择",
          type: "date-range",
          apply: () => true,
        },
      ],
      columns: [
        { label: "抓取时间", key: "date" },
        { label: "房间编号", key: "roomCode", className: "mono" },
        { label: "商户", key: "merchant" },
        { label: "站点", key: "site" },
        { label: "局数", render: (row) => renderNumberCell(row.roundCount) },
        { label: "平均爆点", render: (row) => renderTextCell(`${row.averageBurst.toFixed(2)}x`) },
        { label: "最高爆点", render: (row) => renderTextCell(`${row.highestBurst.toFixed(2)}x`) },
        { label: "活跃房间", render: (row) => renderNumberCell(row.activeRooms) },
        { label: "风险等级", render: (row) => badge(row.riskLevel, row.riskLevel === "高" ? "danger" : row.riskLevel === "中" ? "warning" : "success") },
      ],
      rows: buildFlightBurstRows(24),
    }),
    "player-online-data": tablePage({
      title: "玩家在线数据",
      section: "数据管理",
      description: "查看玩家在线人数、峰值和登录分布。",
      filters: [
        {
          key: "merchant",
          label: "商户",
          type: "select",
          options: ["全部", ...merchants],
          apply: (row, value) => !value || value === "全部" || row.merchant === value,
        },
        {
          key: "site",
          label: "站点",
          type: "select",
          options: ["全部", ...siteCodes],
          apply: (row, value) => !value || value === "全部" || row.site === value,
        },
      ],
      columns: [
        { label: "快照时间", key: "snapshotAt" },
        { label: "商户", key: "merchant" },
        { label: "站点", key: "site" },
        { label: "当前在线", render: (row) => renderNumberCell(row.currentOnline) },
        { label: "峰值在线", render: (row) => renderNumberCell(row.peakOnline) },
        { label: "平均停留", key: "avgStay" },
        { label: "活跃游戏", render: (row) => renderNumberCell(row.activeGames) },
        { label: "新登录", render: (row) => renderNumberCell(row.newLogin) },
      ],
      rows: buildOnlineRows(24),
    }),
    "game-retention": tablePage({
      title: "游戏留存",
      section: "数据管理",
      description: "从游戏维度查看次留、7留、30留等关键指标。",
      filters: [
        {
          key: "merchant",
          label: "商户",
          type: "select",
          options: ["全部", ...merchants],
          apply: (row, value) => !value || value === "全部" || row.merchant === value,
        },
      ],
      columns: retentionColumns("游戏"),
      rows: buildRetentionRows(20, "game"),
    }),
    "player-retention": tablePage({
      title: "玩家留存",
      section: "数据管理",
      description: "从玩家分层维度查看留存表现。",
      filters: [
        {
          key: "merchant",
          label: "商户",
          type: "select",
          options: ["全部", ...merchants],
          apply: (row, value) => !value || value === "全部" || row.merchant === value,
        },
      ],
      columns: retentionColumns("玩家分层"),
      rows: buildRetentionRows(20, "player"),
    }),
    "merchant-list": tablePage({
      title: "商户列表",
      section: "商户管理",
      description: "统一管理商户钱包模式、费率与当前余额状态。",
      summary: [
        metric("总商户数", "128", "启用 106", "neutral"),
        metric("审核中", "11", "待补资料 4", "warning"),
        metric("总余额", formatMoney(12680600), "含冻结金额", "positive"),
      ],
      filters: [
        {
          key: "keyword",
          label: "商户名称 / 编号",
          type: "search",
          placeholder: "搜索商户名称、商户编号",
          apply: (row, value) =>
            [row.merchantName, row.merchantCode].some((item) =>
              String(item).toLowerCase().includes(String(value).toLowerCase()),
            ),
        },
        {
          key: "status",
          label: "商户状态",
          type: "select",
          options: ["全部", "启用", "审核中", "停用"],
          apply: (row, value) => !value || value === "全部" || row.status === value,
        },
      ],
      columns: [
        { label: "商户名称", key: "merchantName" },
        { label: "商户编号", key: "merchantCode", className: "mono" },
        { label: "钱包模式", key: "walletMode" },
        { label: "费率", key: "rate" },
        { label: "账户余额", render: (row) => renderMoneyCell(row.balance) },
        { label: "今日流水", render: (row) => renderMoneyCell(row.todayTurnover) },
        { label: "状态", render: (row) => badge(row.status, row.statusTone) },
        { label: "创建日期", key: "createdAt" },
      ],
      rows: buildMerchantRows(30),
    }),
    "merchant-create": formPage({
      title: "创建商户",
      section: "商户管理",
      description: "配置商户基础信息、结算方式和接口访问约束。",
      formDefaults: {
        merchantName: "",
        merchantCode: "M-NEW-0001",
        owner: "",
        walletMode: "单一钱包",
        rate: "1.20%",
        settlePeriod: "T+1",
        callbackDomain: "",
        whiteIp: "XX.XX.XX.XX",
        lobbyUrl: "",
        note: "",
      },
      sections: [
        {
          title: "基础信息",
          description: "商户主资料、联系人与身份标识。",
          fields: [
            field("merchantName", "商户名称", "text", "请输入商户名称"),
            field("merchantCode", "商户编号", "text", "自动生成或手动输入"),
            field("owner", "负责人", "text", "请输入联系人"),
            selectField("walletMode", "钱包模式", ["单一钱包", "转账钱包"]),
            selectField("rate", "费率模板", ["1.20%", "1.35%", "1.50%"]),
            selectField("settlePeriod", "结算周期", ["T+1", "T+3", "按周"]),
          ],
        },
        {
          title: "接入配置",
          description: "回调域名、白名单 IP 与大厅跳转地址。",
          fields: [
            field("callbackDomain", "回调域名", "url", "请输入商户回调域名"),
            field("whiteIp", "白名单IP", "text", "推荐脱敏展示"),
            field("lobbyUrl", "大厅地址", "url", "请输入返回大厅地址"),
            areaField("note", "备注信息", "可填写结算说明、合同编号、负责人备注"),
          ],
        },
      ],
    }),
    "merchant-profit": tablePage({
      title: "商户盈亏",
      section: "商户管理",
      description: "查看月度商户流水、费率和净利润贡献。",
      filters: [
        {
          key: "month",
          label: "月份筛选",
          type: "month",
          apply: (row, value) => !value || row.month === value,
        },
        {
          key: "merchant",
          label: "商户",
          type: "select",
          options: ["全部", ...merchants],
          apply: (row, value) => !value || value === "全部" || row.merchant === value,
        },
      ],
      columns: [
        { label: "月份", key: "month" },
        { label: "商户", key: "merchant" },
        { label: "流水", render: (row) => renderMoneyCell(row.turnover) },
        { label: "派彩", render: (row) => renderMoneyCell(row.payout) },
        { label: "毛利润", render: (row) => renderProfitCell(row.grossProfit) },
        { label: "手续费", render: (row) => renderMoneyCell(row.fee) },
        { label: "净利润", render: (row) => renderProfitCell(row.netProfit) },
      ],
      rows: buildMerchantProfitRows(24),
    }),
    "game-list": tablePage({
      title: "游戏列表",
      section: "游戏管理",
      description: "管理游戏品牌、分类、RTP 和房间数量。",
      filters: [
        {
          key: "brand",
          label: "品牌",
          type: "select",
          options: ["全部", ...brands],
          apply: (row, value) => !value || value === "全部" || row.brand === value,
        },
        {
          key: "status",
          label: "状态",
          type: "select",
          options: ["全部", "上架中", "维护中", "下架"],
          apply: (row, value) => !value || value === "全部" || row.status === value,
        },
      ],
      columns: [
        { label: "游戏名称", key: "gameName" },
        { label: "游戏ID", key: "gameId", className: "mono" },
        { label: "品牌", key: "brand" },
        { label: "分类", key: "category" },
        { label: "RTP", render: (row) => renderPercentCell(row.rtp) },
        { label: "房间数", render: (row) => renderNumberCell(row.roomCount) },
        { label: "状态", render: (row) => badge(row.status, row.statusTone) },
        { label: "更新时间", key: "updatedAt" },
      ],
      rows: buildGameListRows(32),
    }),
    "game-config": tablePage({
      title: "游戏配置",
      section: "游戏管理",
      description: "按商户与游戏维度管理投注限制和风险模板。",
      filters: [
        {
          key: "merchant",
          label: "商户",
          type: "select",
          options: ["全部", ...merchants],
          apply: (row, value) => !value || value === "全部" || row.merchant === value,
        },
        {
          key: "brand",
          label: "品牌",
          type: "select",
          options: ["全部", ...brands],
          apply: (row, value) => !value || value === "全部" || row.brand === value,
        },
      ],
      columns: [
        { label: "商户", key: "merchant" },
        { label: "游戏", key: "game" },
        { label: "品牌", key: "brand" },
        { label: "线控上限", render: (row) => renderMoneyCell(row.lineLimit) },
        { label: "单注上限", render: (row) => renderMoneyCell(row.betLimit) },
        { label: "奖池开关", key: "jackpotSwitch" },
        { label: "风险模板", key: "riskTemplate" },
        { label: "更新人", key: "updatedBy" },
        { label: "更新时间", key: "updatedAt" },
      ],
      rows: buildGameConfigRows(28),
    }),
    "game-create": formPage({
      title: "新增游戏",
      section: "游戏管理",
      description: "录入新游戏基础信息和默认风控参数。",
      formDefaults: {
        gameName: "",
        gameId: "",
        brand: "PG",
        category: "热门",
        rtp: "96.20",
        roomCount: "12",
        status: "上架中",
        coverUrl: "",
        description: "",
      },
      sections: [
        {
          title: "游戏资料",
          description: "名称、品牌、分类和资源地址。",
          fields: [
            field("gameName", "游戏名称", "text", "请输入游戏名称"),
            field("gameId", "游戏ID", "text", "请输入唯一游戏ID"),
            selectField("brand", "品牌", brands),
            selectField("category", "分类", ["热门", "视讯", "棋牌", "飞机"]),
            field("coverUrl", "封面地址", "url", "请输入封面图 URL"),
            areaField("description", "描述", "填写推荐语、兼容信息和活动说明"),
          ],
        },
        {
          title: "默认参数",
          description: "初始化 RTP、房间数和上下架状态。",
          fields: [
            field("rtp", "默认RTP", "number", "请输入 RTP"),
            field("roomCount", "默认房间数", "number", "请输入房间数"),
            selectField("status", "上架状态", ["上架中", "维护中", "下架"]),
          ],
        },
      ],
    }),
    "flight-room-manage": {
      type: "planeRoomManagement",
      title: "飞机房间管理",
      section: "游戏管理",
      description: "恢复为飞机房间管理页原型样式。",
    },
    "inventory-manage": tablePage({
      title: "库存管理",
      section: "游戏管理",
      description: "跟踪库存池可用筹码、预警线和占用率。",
      columns: [
        { label: "库存池", key: "warehouse" },
        { label: "游戏", key: "game" },
        { label: "品牌", key: "brand" },
        { label: "总库存", render: (row) => renderMoneyCell(row.totalChip) },
        { label: "预警线", render: (row) => renderMoneyCell(row.warningLine) },
        { label: "可用库存", render: (row) => renderMoneyCell(row.availableChip) },
        { label: "占用率", key: "occupancy" },
        { label: "状态", render: (row) => badge(row.status, row.statusTone) },
      ],
      rows: buildInventoryRows(24),
    }),
    "game-rtp-config": formPage({
      title: "游戏RTP配置",
      section: "游戏管理",
      description: "维护品牌和游戏的 RTP 档位、控输控赢范围和生效时间。",
      formDefaults: {
        brand: "PG",
        game: "Fortune Gems",
        lowRtp: "88",
        midRtp: "96",
        highRtp: "108",
        applyMode: "按品牌",
        effectiveFrom: dateShift(0),
        note: "",
      },
      sections: [
        {
          title: "基础配置",
          description: "选择品牌、游戏和生效模式。",
          fields: [
            selectField("brand", "品牌", brands),
            selectField("game", "游戏", games),
            selectField("applyMode", "生效模式", ["按品牌", "按游戏", "按商户"]),
            field("effectiveFrom", "生效日期", "date", ""),
          ],
        },
        {
          title: "RTP档位",
          description: "为低、中、高三档配置目标 RTP。",
          fields: [
            field("lowRtp", "低档RTP", "number", "请输入低档 RTP"),
            field("midRtp", "中档RTP", "number", "请输入中档 RTP"),
            field("highRtp", "高档RTP", "number", "请输入高档 RTP"),
            areaField("note", "备注", "填写切换原因、活动说明或生效范围"),
          ],
        },
      ],
      preview: {
        title: "当前 RTP 生效列表",
        description: "核对配置后再进行保存发布。",
        columns: [
          { label: "品牌", key: "brand" },
          { label: "游戏", key: "gameName" },
          { label: "分类", key: "category" },
          { label: "RTP", render: (row) => renderPercentCell(row.rtp) },
          { label: "状态", render: (row) => badge(row.status, row.statusTone) },
          { label: "更新时间", key: "updatedAt" },
        ],
        rows: buildGameListRows(8),
      },
    }),
    "player-overview": tablePage({
      title: "玩家总览",
      section: "玩家管理",
      description: "聚合玩家充值、提现、投注与最近登录信息。",
      columns: [
        { label: "平台ID", key: "platformId", className: "mono" },
        { label: "商户", key: "merchant" },
        { label: "玩家层级", render: (row) => badge(row.level, "neutral") },
        { label: "累计充值", render: (row) => renderMoneyCell(row.totalRecharge) },
        { label: "累计提现", render: (row) => renderMoneyCell(row.totalWithdraw) },
        { label: "今日投注", render: (row) => renderMoneyCell(row.todayTurnover) },
        { label: "今日盈亏", render: (row) => renderProfitCell(row.todayWinLoss) },
        { label: "最近登录", key: "loginAt" },
      ],
      rows: buildPlayerOverviewRows(32),
    }),
    "smart-control": tablePage({
      title: "智能点控推荐",
      section: "玩家管理",
      description: "根据玩家 RTP、异常指数和近期行为给出点控建议。",
      columns: [
        { label: "平台ID", key: "platformId", className: "mono" },
        { label: "商户", key: "merchant" },
        { label: "玩家标签", render: (row) => badge(row.label, "neutral") },
        { label: "近期RTP", render: (row) => renderPercentCell(row.recentRtp) },
        { label: "异常指数", key: "abnormalIndex" },
        { label: "系统建议", render: (row) => badge(row.suggestion, row.suggestionTone) },
        { label: "更新时间", key: "updatedAt" },
      ],
      rows: buildSmartControlRows(26),
    }),
    "player-control": formPage({
      title: "玩家点控",
      section: "玩家管理",
      description: "按品牌或按游戏配置玩家点控策略，并联动点控预览报表。",
      formDefaults: {
        platformIds: "",
        controlMode: "按品牌",
        brands: "PG, PP",
        gameName: "",
        winLoss: "控输",
        rtpLevel: "中档",
        releaseType: "金额",
        releaseValue: "-24046.16",
        releaseTime: "7天",
      },
      sections: [
        {
          title: "控制对象",
          description: "指定平台 ID 以及控制维度。",
          fields: [
            areaField("platformIds", "平台ID", "多个平台ID使用英文逗号分隔"),
            selectField("controlMode", "调控功能", ["按品牌", "按游戏"]),
            field("brands", "游戏品牌", "text", "如 PG, PP, JILI"),
            field("gameName", "指定游戏", "text", "按游戏调控时填写"),
          ],
        },
        {
          title: "控制策略",
          description: "配置控输控赢、RTP 档位和解除规则。",
          fields: [
            selectField("winLoss", "控制方向", ["控输", "控赢"]),
            selectField("rtpLevel", "RTP档位", ["低档", "中档", "高档"]),
            selectField("releaseType", "解除类型", ["金额", "RTP", "时间"]),
            field("releaseValue", "解除阈值", "text", "如 -24046.16"),
            selectField("releaseTime", "解除时间", ["1天", "7天", "30天", "永久"]),
          ],
        },
      ],
      preview: {
        title: "当前点控玩家预览",
        description: "用于保存前快速核对点控对象、RTP 和解除规则。",
        columns: [
          { label: "平台ID", key: "platformId", className: "mono" },
          { label: "商户", key: "merchant" },
          { label: "控制对象", key: "target" },
          { label: "当前RTP", key: "currentRtp" },
          { label: "今日投注", render: (row) => renderMoneyCell(row.todayBet) },
          { label: "当前盈亏", render: (row) => renderProfitCell(row.winLoss) },
          { label: "解除规则", key: "releaseRule" },
          { label: "状态", render: (row) => badge(row.status, row.statusTone) },
        ],
        rows: buildPlayerControlPreview(12),
      },
    }),
    "finance-overview": tablePage({
      title: "财务总览",
      section: "财务管理",
      description: "从商户维度汇总充值、提现、平台利润和结算待办。",
      summary: [
        metric("今日充值", formatMoney(2686000), "成功率 97.6%", "positive"),
        metric("今日提现", formatMoney(1983200), "待处理 42 笔", "warning"),
        metric("平台利润", formatSignedMoney(586320), "手续费收入 6.8 万", "neutral"),
      ],
      columns: [
        { label: "日期", key: "date" },
        { label: "商户", key: "merchant" },
        { label: "充值", render: (row) => renderMoneyCell(row.recharge) },
        { label: "提现", render: (row) => renderMoneyCell(row.withdraw) },
        { label: "平台利润", render: (row) => renderProfitCell(row.platformProfit) },
        { label: "待结算", render: (row) => renderMoneyCell(row.pendingSettlement) },
        { label: "手续费收入", render: (row) => renderMoneyCell(row.feeIncome) },
      ],
      rows: buildFinanceOverviewRows(18),
    }),
    "exchange-rates": tablePage({
      title: "汇率查询",
      section: "财务管理",
      description: "统一维护跨币种汇率源、波动和更新时间。",
      columns: [
        { label: "币种对", key: "pair" },
        { label: "来源", key: "source" },
        { label: "最新汇率", render: (row) => renderTextCell(formatNumber(row.latestRate, 4)) },
        { label: "波动", render: (row) => renderProfitCell(row.fluctuation, "", 4) },
        { label: "更新时间", key: "updatedAt" },
        { label: "更新人", key: "updatedBy" },
      ],
      rows: buildExchangeRateRows(18),
    }),
    "settlement-info": tablePage({
      title: "结算信息",
      section: "财务管理",
      description: "查看账单周期、应结金额和当前状态。",
      columns: settlementColumns(),
      rows: buildSettlementRows(24, false),
    }),
    "pending-settlement": tablePage({
      title: "待结算信息",
      section: "财务管理",
      description: "筛出待审核和待出款的账单，方便财务集中处理。",
      columns: settlementColumns(),
      rows: buildSettlementRows(20, true),
    }),
    "recharge-orders": tablePage({
      title: "充值订单",
      section: "财务管理",
      description: "追踪充值订单状态、渠道和到账情况。",
      columns: [
        { label: "订单号", key: "orderId" },
        { label: "商户", key: "merchant" },
        { label: "渠道", key: "channel" },
        { label: "金额", render: (row) => renderMoneyCell(row.amount) },
        { label: "手续费", render: (row) => renderMoneyCell(row.fee) },
        { label: "状态", render: (row) => badge(row.status, row.statusTone) },
        { label: "创建时间", key: "createdAt" },
      ],
      rows: buildRechargeRows(26),
    }),
    "gift-balance": tablePage({
      title: "赠送余额",
      section: "财务管理",
      description: "管理人工赠送余额的对象、原因和审核状态。",
      columns: [
        { label: "商户", key: "merchant" },
        { label: "平台ID", key: "platformId", className: "mono" },
        { label: "操作人", key: "operator" },
        { label: "赠送金额", render: (row) => renderMoneyCell(row.amount) },
        { label: "原因", key: "reason" },
        { label: "状态", render: (row) => badge(row.status, row.statusTone) },
        { label: "创建时间", key: "createdAt" },
      ],
      rows: buildGiftBalanceRows(22),
    }),
    "publish-message": formPage({
      title: "发布消息",
      section: "消息管理",
      description: "配置消息等级、目标范围、投放渠道和生效时间。",
      formDefaults: {
        title: "",
        level: "重要",
        target: "全部商户",
        channel: "站内信 + 弹窗",
        startAt: `${dateShift(0)}T09:00`,
        endAt: `${dateShift(-7)}T23:00`,
        content: "",
      },
      sections: [
        {
          title: "消息配置",
          description: "设置标题、等级和投放对象。",
          fields: [
            field("title", "消息标题", "text", "请输入消息标题"),
            selectField("level", "消息等级", ["普通", "重要", "紧急"]),
            selectField("target", "目标范围", ["全部商户", "全部玩家", "指定商户"]),
            selectField("channel", "投放渠道", ["站内信", "弹窗", "站内信 + 弹窗"]),
            field("startAt", "开始时间", "datetime-local", ""),
            field("endAt", "结束时间", "datetime-local", ""),
          ],
        },
        {
          title: "消息内容",
          description: "填写需要展示给商户或玩家的完整内容。",
          fields: [areaField("content", "消息正文", "请输入消息内容")],
        },
      ],
    }),
    "message-list": tablePage({
      title: "消息列表",
      section: "消息管理",
      description: "查看消息投放状态、目标范围和最后更新时间。",
      columns: [
        { label: "标题", key: "title" },
        { label: "等级", key: "level" },
        { label: "目标范围", key: "target" },
        { label: "渠道", key: "channel" },
        { label: "状态", render: (row) => badge(row.status, row.statusTone) },
        { label: "更新时间", key: "updatedAt" },
        { label: "操作人", key: "operator" },
      ],
      rows: buildMessageRows(22),
    }),
    "account-manage": tablePage({
      title: "账号管理",
      section: "后台管理",
      description: "统一管理后台账号、角色权限和最近登录环境。",
      columns: [
        { label: "账号", key: "account" },
        { label: "角色", key: "role" },
        { label: "可见范围", key: "scope" },
        { label: "最近IP", key: "loginIp", className: "mono" },
        { label: "状态", render: (row) => badge(row.status, row.statusTone) },
        { label: "更新时间", key: "updatedAt" },
      ],
      rows: buildAccountRows(24),
    }),
    "account-create": formPage({
      title: "创建账号",
      section: "后台管理",
      description: "配置后台账号角色、可见范围与初始状态。",
      formDefaults: {
        account: "",
        nickname: "",
        role: "运营专员",
        scope: "全部商户",
        phone: "",
        email: "",
        status: "启用",
        remark: "",
      },
      sections: [
        {
          title: "账号信息",
          description: "基础身份、角色与联系资料。",
          fields: [
            field("account", "登录账号", "text", "请输入登录账号"),
            field("nickname", "账号昵称", "text", "请输入账号昵称"),
            selectField("role", "角色", ["超级管理员", "风控专员", "财务专员", "运营专员"]),
            selectField("scope", "可见范围", ["总后台", "全部商户", "指定商户"]),
            field("phone", "联系电话", "text", "请输入手机号"),
            field("email", "联系邮箱", "email", "请输入邮箱"),
            selectField("status", "状态", ["启用", "冻结"]),
            areaField("remark", "备注", "可填写账号职责、交接说明"),
          ],
        },
      ],
    }),
    "permission-edit": formPage({
      title: "权限编辑",
      section: "后台管理",
      description: "按模块分配菜单权限、操作权限和数据范围。",
      formDefaults: {
        roleName: "风控专员",
        dataScope: "全部商户",
      },
      sections: [
        {
          title: "角色基础配置",
          description: "配置角色名称和数据可见范围。",
          fields: [
            field("roleName", "角色名称", "text", "请输入角色名称"),
            selectField("dataScope", "数据范围", ["总后台", "全部商户", "指定商户"]),
          ],
        },
      ],
      matrix: [
        { module: "数据管理", view: true, edit: false, approve: false },
        { module: "商户管理", view: true, edit: true, approve: true },
        { module: "游戏管理", view: true, edit: true, approve: false },
        { module: "玩家管理", view: true, edit: true, approve: false },
        { module: "财务管理", view: true, edit: false, approve: true },
        { module: "消息管理", view: true, edit: true, approve: false },
        { module: "后台管理", view: false, edit: false, approve: false },
      ],
    }),
    "operation-log": tablePage({
      title: "操作日志",
      section: "后台管理",
      description: "记录后台关键操作的模块、目标对象和结果。",
      columns: [
        { label: "操作人", key: "operator" },
        { label: "模块", key: "module" },
        { label: "动作", key: "action" },
        { label: "目标对象", key: "target" },
        { label: "结果", render: (row) => badge(row.result, row.resultTone) },
        { label: "IP", key: "ip", className: "mono" },
        { label: "时间", key: "createdAt" },
      ],
      rows: buildOperationLogRows(28),
    }),
  };

  const pageStates = {};

  function field(name, label, type, placeholder) {
    return { name, label, type, placeholder };
  }

  function areaField(name, label, placeholder) {
    return { name, label, type: "textarea", placeholder };
  }

  function selectField(name, label, options) {
    return { name, label, type: "select", options };
  }

  function retentionColumns(label) {
    return [
      { label: "日期", key: "date" },
      { label: "商户", key: "merchant" },
      { label, key: "dimension" },
      { label: "1日留存", render: (row) => renderPercentCell(row.day1) },
      { label: "3日留存", render: (row) => renderPercentCell(row.day3) },
      { label: "7日留存", render: (row) => renderPercentCell(row.day7) },
      { label: "15日留存", render: (row) => renderPercentCell(row.day15) },
      { label: "30日留存", render: (row) => renderPercentCell(row.day30) },
    ];
  }

  function settlementColumns() {
    return [
      { label: "账单号", key: "billNo" },
      { label: "商户", key: "merchant" },
      { label: "账期", key: "month" },
      { label: "流水", render: (row) => renderMoneyCell(row.turnover) },
      { label: "手续费", render: (row) => renderMoneyCell(row.fee) },
      { label: "应结金额", render: (row) => renderMoneyCell(row.amount) },
      { label: "状态", render: (row) => badge(row.status, row.statusTone) },
      { label: "更新时间", key: "updatedAt" },
    ];
  }

  function renderTextCell(value, className = "") {
    return `<span class="${className}">${escapeHtml(value)}</span>`;
  }

  function renderNumberCell(value) {
    return `<span class="cell-number">${formatNumber(value)}</span>`;
  }

  function renderMoneyCell(value) {
    return `<span class="cell-number cell-money">${formatMoney(value)}</span>`;
  }

  function renderProfitCell(value, suffix = "", digits = 2) {
    const numeric = Number(value);
    const sign = numeric < 0 ? "-" : "";
    return `<span class="cell-number cell-profit ${toneClass(numeric)}">${sign}${formatNumber(
      Math.abs(numeric),
      digits,
    )}${suffix}</span>`;
  }

  function renderPercentCell(value) {
    return `<span class="cell-number">${formatPercent(value)}</span>`;
  }

  function getCurrentPageKey() {
    const params = new URLSearchParams(window.location.search);
    const path = (window.location.pathname || "").toLowerCase();
    const key =
      params.get("page") ||
      (path.endsWith("/plane-room-management.html") || path.endsWith("\\plane-room-management.html")
        ? "flight-room-manage"
        : "dashboard");
    return pageConfigs[key] ? key : "dashboard";
  }

  function cloneValue(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function getRoomOpsOrderStorageKey() {
    return "management-room-ops-country-order";
  }

  function loadRoomOpsCountryOrder(countries) {
    try {
      const raw = localStorage.getItem(getRoomOpsOrderStorageKey());
      const parsed = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(parsed) || !parsed.length) return countries.map((country) => country.code);
      const known = new Set(countries.map((country) => country.code));
      const ordered = parsed.filter((code) => known.has(code));
      countries.forEach((country) => {
        if (!ordered.includes(country.code)) ordered.push(country.code);
      });
      return ordered;
    } catch (_) {
      return countries.map((country) => country.code);
    }
  }

  function persistRoomOpsCountryOrder(order) {
    try {
      localStorage.setItem(getRoomOpsOrderStorageKey(), JSON.stringify(order));
    } catch (_) {}
  }

  function getPageState(pageKey, page) {
    if (!pageStates[pageKey]) {
      const filters = {};
      (page.filters || []).forEach((filter) => {
        filters[filter.key] = filter.type === "date-range" ? { start: "", end: "" } : "";
      });
      pageStates[pageKey] = {
        filters,
        page: 1,
        pageSize: page.defaultPageSize || 20,
        form: cloneValue(page.formDefaults || {}),
      };
      if (page.type === "roomOps") {
        pageStates[pageKey].activeCountryCode = "";
        pageStates[pageKey].pendingCountryCode = "";
        pageStates[pageKey].roomFilters = {
          countryKeyword: "",
          countrySearch: "",
          siteSearch: "",
        };
        pageStates[pageKey].expandedRooms = {};
        pageStates[pageKey].roomPages = {};
        pageStates[pageKey].selectedRoomIds = {};
        pageStates[pageKey].modal = null;
        pageStates[pageKey].bulkAction = "";
        pageStates[pageKey].countryPickerOpen = false;
        pageStates[pageKey].selectedRoomId = "";
        pageStates[pageKey].currencyOrder = loadRoomOpsCountryOrder(page.opsData.countries);
      }
      if (page.type === "merchantCreate") {
        pageStates[pageKey].modal = null;
      }
      if (page.type === "playerTodayProfit") {
        pageStates[pageKey].filters = {
          platform: "",
          merchant: "",
          merchants: [],
          merchantSearch: "",
          game: "",
          gameLabel: "全部游戏",
          gameBrand: "",
          gameSearch: "",
          dateFrom: "2026-05-06",
          dateTo: "2026-05-07",
        };
        pageStates[pageKey].merchantPickerOpen = false;
        pageStates[pageKey].gamePickerOpen = false;
        pageStates[pageKey].controlModal = null;
        pageStates[pageKey].page = 1;
        pageStates[pageKey].pageSize = page.defaultPageSize || 100;
      }
    }
    return pageStates[pageKey];
  }

  function updateBreadcrumb(page) {
    // Topbar breadcrumb stays hidden by product request; menu pages should not repeat the current menu title here.
    const breadcrumb = document.querySelector("[data-breadcrumb]");
    if (breadcrumb) breadcrumb.textContent = "";
    document.title = `${page.title} - 管理后台`;
  }

  function renderCurrentPage() {
    const pageKey = getCurrentPageKey();
    const page = pageConfigs[pageKey];
    const state = getPageState(pageKey, page);
    updateBreadcrumb(page);

    const root = document.getElementById("pageRoot");
    if (!root) return;

    if (page.type === "dashboard") {
      root.innerHTML = renderDashboardPage(page);
      return;
    }

    if (page.type === "form") {
      root.innerHTML = renderFormPage(pageKey, page, state);
      return;
    }

    if (page.type === "merchantCreate") {
      root.innerHTML = renderMerchantCreatePage(pageKey, page, state);
      return;
    }

    if (page.type === "roomOps") {
      root.innerHTML = renderFlightRoomOpsPage(page, state);
      return;
    }

    if (page.type === "planeRoomManagement") {
      root.innerHTML = "";
      if (typeof window.renderPlaneRoomManagementPage === "function") {
        window.renderPlaneRoomManagementPage();
      }
      return;
    }

    if (page.type === "playerTodayProfit") {
      root.innerHTML = renderPlayerTodayProfitPage(pageKey, page, state);
      return;
    }

    root.innerHTML = renderTablePage(pageKey, page, state);
  }

  function renderPageHeader(page) {
    return `
      <div class="page-heading">
        <h1 class="page-title">${escapeHtml(page.title)}</h1>
        <div class="page-subtitle">${escapeHtml(page.section)} / ${escapeHtml(page.title)}</div>
        <p class="page-description">${escapeHtml(page.description || "")}</p>
      </div>
    `;
  }

  function renderSummaryGrid(cards) {
    if (!cards || !cards.length) return "";
    return `
      <div class="summary-grid management-summary-grid">
        ${cards
          .map(
            (item) => `
              <article class="summary-card ${item.tone}">
                <span class="summary-label">${escapeHtml(item.label)}</span>
                <strong class="summary-value">${escapeHtml(item.value)}</strong>
                <span class="summary-meta">${escapeHtml(item.meta)}</span>
              </article>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderDashboardPage(page) {
    return `
      <section class="page-frame dashboard-page">
        ${renderPageHeader(page)}
        ${renderSummaryGrid(page.summary)}
        <div class="dashboard-module-grid">
          ${page.modules
            .map(
              (module) => `
                <a class="dashboard-module-card" href="index.html?page=${module.key}">
                  <strong>${escapeHtml(module.title)}</strong>
                  <span>${escapeHtml(module.text)}</span>
                </a>
              `,
            )
            .join("")}
        </div>
        <div class="dashboard-panel-grid">
          <section class="card dashboard-panel">
            <div class="dashboard-panel-head">
              <div>
                <h2>智能点控推荐</h2>
                <p>把旧总后台的风控重点先收拢到统一列表里。</p>
              </div>
            </div>
            ${renderMiniTable(
              [
                { label: "平台ID", key: "platformId" },
                { label: "玩家标签", key: "label" },
                { label: "近期RTP", render: (row) => renderPercentCell(row.recentRtp) },
                { label: "系统建议", render: (row) => badge(row.suggestion, row.suggestionTone) },
              ],
              page.riskRows,
            )}
          </section>
          <section class="card dashboard-panel">
            <div class="dashboard-panel-head">
              <div>
                <h2>待结算账单</h2>
                <p>财务待办和异常账单集中查看。</p>
              </div>
            </div>
            ${renderMiniTable(
              [
                { label: "账单号", key: "billNo" },
                { label: "商户", key: "merchant" },
                { label: "应结金额", render: (row) => renderMoneyCell(row.amount) },
                { label: "状态", render: (row) => badge(row.status, row.statusTone) },
              ],
              page.settlementRows,
            )}
          </section>
        </div>
        <section class="card dashboard-panel dashboard-panel-full">
          <div class="dashboard-panel-head">
            <div>
              <h2>最近消息动态</h2>
              <p>消息管理模块的投放状态和最新更新时间。</p>
            </div>
          </div>
          ${renderMiniTable(
            [
              { label: "标题", key: "title" },
              { label: "等级", key: "level" },
              { label: "目标范围", key: "target" },
              { label: "状态", render: (row) => badge(row.status, row.statusTone) },
              { label: "更新时间", key: "updatedAt" },
            ],
            page.messageRows,
          )}
        </section>
      </section>
    `;
  }

  function renderMiniTable(columns, rows) {
    return `
      <div class="page-table-wrap compact">
        <table class="data-table compact">
          <thead>
            <tr>${columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${rows
              .map(
                (row) => `
                  <tr>
                    ${columns.map((column) => `<td>${renderTableCell(row, column)}</td>`).join("")}
                  </tr>
                `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  }

  function getRoomStatusTone(status) {
    return { stable: "success", warning: "warning", danger: "danger", muted: "neutral" }[status] || "neutral";
  }

  function findRoomById(rooms, roomId) {
    for (const room of rooms) {
      if (room.id === roomId) return room;
      if (room.children) {
        const child = findRoomById(room.children, roomId);
        if (child) return child;
      }
    }
    return rooms[0];
  }

  function flattenRooms(rooms) {
    return rooms.flatMap((room) => [room, ...(room.children ? flattenRooms(room.children) : [])]);
  }

  function renderRoomTree(nodes, state, depth = 0) {
    const query = ((state.roomFilters && state.roomFilters.roomSearch) || "").trim().toLowerCase();
    return nodes
      .map((room) => {
        const childHtml = room.children ? renderRoomTree(room.children, state, depth + 1) : "";
        const matchSelf = !query || room.name.toLowerCase().includes(query) || (room.tag || "").toLowerCase().includes(query);
        const matchChild = childHtml.trim().length > 0;
        if (!matchSelf && !matchChild) return "";
        const active = state.selectedRoomId === room.id ? " active" : "";
        const collapsed = state.collapsedRooms?.[room.id] ? " collapsed" : "";
        return `
          <div class="room-tree-node depth-${depth}${active}${collapsed}">
            <div class="room-tree-item" style="--tree-depth:${depth}">
              ${
                room.children
                  ? `<button class="room-tree-toggle" type="button" data-action="room-toggle" data-room-id="${room.id}" title="折叠/展开">${collapsed ? "+" : "-"}</button>`
                  : `<span class="room-tree-toggle placeholder"></span>`
              }
              <button class="room-tree-main" type="button" data-action="room-select" data-room-id="${room.id}">
                <span class="room-status-dot ${room.status}"></span>
                <span class="room-name">${escapeHtml(room.name)}</span>
                <span class="room-count">${formatNumber(room.count)}</span>
              </button>
            </div>
            ${room.children ? `<div class="room-tree-children">${childHtml}</div>` : ""}
          </div>
        `;
      })
      .join("");
  }

  function getOrderedCurrencies(page, state) {
    const byCode = new Map(page.opsData.currencies.map((currency) => [currency.code, currency]));
    const ordered = (state.currencyOrder || [])
      .map((code) => byCode.get(code))
      .filter(Boolean);
    page.opsData.currencies.forEach((currency) => {
      if (!ordered.some((item) => item.code === currency.code)) {
        ordered.push(currency);
      }
    });
    return ordered;
  }

  function renderCurrencySelector(page, state) {
    const currencies = getOrderedCurrencies(page, state);
    const current = currencies[0];
    return `
      <section class="ops-currency-bar" aria-label="国家货币选择">
        <div class="ops-currency-title">
          <span>国家货币</span>
          <strong>${escapeHtml(current.country)}-${escapeHtml(current.code)}</strong>
        </div>
        <div class="ops-currency-list">
          ${currencies
            .map(
              (currency, index) => `
                <button
                  class="ops-currency-chip${index === 0 ? " active" : ""}"
                  type="button"
                  draggable="true"
                  data-currency-code="${escapeHtml(currency.code)}"
                  title="${escapeHtml(currency.name)}"
                >
                  <span>${escapeHtml(currency.country)}-${escapeHtml(currency.code)}</span>
                  ${index === 0 ? "<em>当前</em>" : ""}
                </button>
              `,
            )
            .join("")}
        </div>
        <span class="ops-currency-hint">拖拽国家可调整展示顺序</span>
      </section>
    `;
  }

  function renderFlightRoomOpsPage(page, state) {
    const filters = state.roomFilters || {};
    const roomTotal = flattenRooms(page.opsData.rooms).filter((room) => !room.children || !room.children.length).length;

    return `
      <section class="room-ops-page">
        <div class="ops-hero page-heading room-ops-heading">
          <div>
            <span class="ops-eyebrow">ROOM ALLOCATION & OPERATIONS</span>
            <h1 class="page-title">${escapeHtml(page.title)}</h1>
            <div class="page-subtitle">${escapeHtml(page.section)} / ${escapeHtml(page.title)}</div>
            <p class="page-description">${escapeHtml(page.description)}</p>
          </div>
          <div class="ops-live-tools">
            <span class="ops-live-dot"></span>
            <span>实时刷新 5s</span>
            <button type="button" data-action="room-refresh">刷新数据</button>
          </div>
        </div>
        ${renderCurrencySelector(page, state)}
        <div class="room-ops-layout">
          <aside class="ops-room-tree-panel">
            <div class="ops-panel-head compact">
              <div>
                <span class="ops-eyebrow">ROOM TREE</span>
                <h2>房间树</h2>
              </div>
              <span class="ops-count-pill">${formatNumber(roomTotal)}</span>
            </div>
            <label class="ops-search-field">
              <span>搜索房间</span>
              <input type="text" value="${escapeHtml(filters.roomSearch || "")}" placeholder="房间 / 标签 / 状态" data-room-filter="roomSearch" />
            </label>
            <div class="ops-room-tree">${renderRoomTree(page.opsData.rooms, state)}</div>
          </aside>
          <main class="ops-table-panel room-ops-void-main">
            <div class="ops-empty">站点数据表已下线（设计作废）。</div>
          </main>
        </div>
      </section>
    `;
  }

  function getToneLabel(tone) {
    return {
      stable: "正常",
      warning: "轻微放水",
      danger: "危险库存",
      vip: "VIP流量",
      active: "活动房",
      risk: "风控保护",
    }[tone] || "运行中";
  }

  function renderMiniBars(values, className = "") {
    return values
      .map((value, index) => `<i style="height:${value}%" class="${index > values.length - 4 ? "hot" : ""}"></i>`)
      .join("");
  }

  function renderOpsMetric(label, value, hint, tone = "") {
    return `
      <div class="ops-country-metric ${tone}">
        <span>${escapeHtml(label)}</span>
        <strong>${value}</strong>
        <em>${escapeHtml(hint)}</em>
      </div>
    `;
  }

  function renderSiteOpsTree(nodes, state, depth = 0) {
    const query = ((state.roomFilters && state.roomFilters.roomSearch) || "").trim().toLowerCase();
    return nodes
      .map((site) => {
        const childHtml = site.children ? renderSiteOpsTree(site.children, state, depth + 1) : "";
        const matchSelf = !query || site.name.toLowerCase().includes(query) || (site.tag || "").toLowerCase().includes(query);
        if (!matchSelf && !childHtml.trim()) return "";
        const collapsed = state.collapsedRooms?.[site.id] ? " collapsed" : "";
        return `
          <div class="room-tree-node depth-${depth}${collapsed}">
            <div class="site-tree-item" style="--tree-depth:${depth}">
              ${
                site.children
                  ? `<button class="room-tree-toggle" type="button" data-action="room-toggle" data-room-id="${site.id}" title="折叠/展开">${collapsed ? "+" : "-"}</button>`
                  : `<span class="room-tree-toggle placeholder"></span>`
              }
              <button class="site-tree-main" type="button">
                <span class="room-status-dot ${site.status}"></span>
                <span class="site-tree-copy">
                  <strong>${escapeHtml(site.name)}</strong>
                  <em>${escapeHtml(site.tag)} · ${formatNumber(site.traffic)}%流量</em>
                </span>
                <span class="room-count">${formatNumber(site.count)}</span>
              </button>
            </div>
            ${site.children ? `<div class="room-tree-children">${childHtml}</div>` : ""}
          </div>
        `;
      })
      .join("");
  }

  function renderRoomOpsCards(rooms, state) {
    return rooms
      .map((room) => {
        const active = state.selectedRoomId === room.id ? " active" : "";
        const winTone = room.winLoss >= 0 ? "positive" : "negative";
        return `
          <article class="ops-room-card ${room.tone}${active}" data-action="room-select" data-room-id="${room.id}">
            <div class="ops-room-card-head">
              <div>
                <span class="ops-room-tag">${escapeHtml(room.tag)}</span>
                <h3>${escapeHtml(room.name)} <em>${escapeHtml(room.alias)}</em></h3>
              </div>
              <span class="ops-room-state">${getToneLabel(room.tone)}</span>
            </div>
            <div class="ops-room-card-grid">
              <div><span>当前在线</span><strong>${formatNumber(room.online)}</strong></div>
              <div><span>当前库存</span><strong>${formatMoney(room.inventory)}</strong></div>
              <div><span>RTP</span><strong>${room.rtp.toFixed(1)}%</strong></div>
              <div><span>倍率波动</span><strong>${escapeHtml(room.volatility)}</strong></div>
              <div><span>绑定站点</span><strong>${formatNumber(room.sites)}</strong></div>
              <div><span>今日输赢</span><strong class="${winTone}">${formatSignedMoney(room.winLoss)}</strong></div>
            </div>
            <div class="ops-room-card-foot">
              <span>最大爆点 <b>${escapeHtml(room.maxCrash)}</b></span>
              <span>危险指数 <b>${room.risk}</b></span>
            </div>
            <div class="ops-risk-meter"><i style="width:${room.risk}%"></i></div>
            <div class="ops-room-actions">
              <button type="button">查看详情</button>
              <button type="button">编辑策略</button>
              <button type="button">分配站点</button>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function renderTrafficAllocator(rooms) {
    const topRooms = rooms.slice(0, 3);
    return `
      <section class="ops-traffic-card">
        <div class="ops-section-head">
          <div>
            <span class="ops-eyebrow">TRAFFIC WEIGHT</span>
            <h2>流量权重分房</h2>
          </div>
          <button type="button">批量应用</button>
        </div>
        <div class="ops-traffic-stack">
          ${topRooms
            .map(
              (room) => `
                <div class="ops-traffic-row">
                  <span>${escapeHtml(room.name)}</span>
                  <div class="ops-traffic-track"><i class="${room.tone}" style="width:${room.traffic}%"></i></div>
                  <strong>${room.traffic}%</strong>
                </div>
              `,
            )
            .join("")}
        </div>
      </section>
    `;
  }

  function renderRoomDrawer(room) {
    const trend = [38, 62, 45, 73, 54, 82, 66, 91, 48, 76, 58, 88, 69, 95, 72, 64];
    const heat = [42, 66, 81, 58, 74, 92, 63, 49, 88, 71, 53, 97];
    return `
      <aside class="ops-room-drawer">
        <div class="ops-drawer-head">
          <span class="ops-eyebrow">ROOM DETAIL</span>
          <h2>${escapeHtml(room.name)} · ${escapeHtml(room.alias)}</h2>
          <p>${escapeHtml(room.source)}</p>
        </div>
        <div class="ops-drawer-controls">
          <label><span>RTP设置</span><input type="text" value="${room.rtp.toFixed(1)}%" /></label>
          <label><span>库存阈值</span><input type="text" value="${formatMoney(room.inventory)}" /></label>
        </div>
        <div class="ops-drawer-kpis">
          <div><span>玩家人数</span><strong>${formatNumber(room.online)}</strong></div>
          <div><span>实时输赢</span><strong>${formatSignedMoney(room.winLoss)}</strong></div>
          <div><span>自动风控</span><strong>${escapeHtml(room.autoRisk)}</strong></div>
        </div>
        <div class="ops-drawer-chart">
          <span>最近100局倍率走势</span>
          <div class="ops-sparkline-bars">${renderMiniBars(trend)}</div>
        </div>
        <div class="ops-heat-grid">
          <span>当前下注热力图</span>
          <div>${heat.map((value) => `<i style="opacity:${Math.max(value / 100, 0.35)}"></i>`).join("")}</div>
        </div>
        <div class="ops-danger-list">
          <span>危险玩家监控</span>
          <strong>3个大额追投玩家</strong>
          <em>建议降低该房流量权重或开启爆点保护。</em>
        </div>
        <div class="ops-drawer-actions">
          <button type="button">修改RTP</button>
          <button type="button">调整库存</button>
          <button type="button" class="danger">停用房间</button>
        </div>
      </aside>
    `;
  }

  function renderBottomOpsCharts(rooms) {
    const rtp = [48, 52, 57, 54, 61, 68, 65, 72, 78, 74, 83, 79, 86, 82, 90, 88];
    const inventory = [70, 66, 73, 62, 58, 64, 55, 49, 53, 46, 42, 48, 39, 44, 36, 41];
    return `
      <section class="ops-bottom-grid">
        <div class="ops-chart-card wide">
          <div class="ops-chart-head"><span>REALTIME CRASH</span><strong>实时倍率走势图 / RTP曲线</strong></div>
          <div class="ops-line-chart">
            <div class="ops-sparkline-bars">${renderMiniBars(rtp)}</div>
            <div class="ops-chart-gridline"></div>
          </div>
        </div>
        <div class="ops-chart-card">
          <div class="ops-chart-head"><span>INVENTORY</span><strong>库存变化曲线</strong></div>
          <div class="ops-sparkline-bars green">${renderMiniBars(inventory)}</div>
        </div>
        <div class="ops-chart-card">
          <div class="ops-chart-head"><span>ROOM HEAT</span><strong>房间热度排行</strong></div>
          ${rooms
            .slice(0, 4)
            .map(
              (room) => `
                <div class="ops-rank-row">
                  <span>${escapeHtml(room.name)}</span>
                  <div class="ops-traffic-track"><i class="${room.tone}" style="width:${room.heat}%"></i></div>
                  <b>${room.heat}</b>
                </div>
              `,
            )
            .join("")}
        </div>
      </section>
    `;
  }

  function renderFlightRoomOpsPage(page, state) {
    const filters = state.roomFilters || {};
    const stats = page.opsData.countryStats;
    const selectedRoom = findRoomById(page.opsData.rooms, state.selectedRoomId) || page.opsData.rooms[0];

    return `
      <section class="room-ops-page">
        <div class="ops-country-bar">
          <div class="ops-country-title">
            <span class="ops-eyebrow">COUNTRY ROOM COMMAND</span>
            <h1>飞机游戏国家分房运营台</h1>
            <p>${escapeHtml(page.section)} / ${escapeHtml(page.title)} · Crash/Aviator Traffic Allocation</p>
          </div>
          <div class="ops-country-actions">
            <select aria-label="国家切换"><option>${escapeHtml(stats.country)}-${escapeHtml(stats.currency)}</option><option>巴西-BRL</option><option>越南-VND</option></select>
            <button type="button">创建国家</button>
            <button type="button">创建房间</button>
            <button type="button">批量分配</button>
            <button type="button" data-action="room-refresh"><span class="ops-live-dot"></span>实时刷新</button>
          </div>
        </div>
        <div class="ops-country-metrics">
          ${renderOpsMetric("当前国家", `${stats.country}-${stats.currency}`, "国家房间池")}
          ${renderOpsMetric("今日在线人数", formatNumber(stats.online), "较昨日 +12.4%", "good")}
          ${renderOpsMetric("今日RTP", `${stats.rtp.toFixed(1)}%`, "目标 96.5%", "blue")}
          ${renderOpsMetric("当前库存", formatMoney(stats.inventory), "安全水位 72%", "good")}
          ${renderOpsMetric("危险房间", formatNumber(stats.dangerRooms), "需处理", "danger")}
          ${renderOpsMetric("开启房间", formatNumber(stats.openRooms), `${stats.totalSites} 个站点`, "blue")}
        </div>
        ${renderCurrencySelector(page, state)}
        <div class="room-ops-layout">
          <aside class="ops-room-tree-panel">
            <div class="ops-panel-head compact">
              <div>
                <span class="ops-eyebrow">SITE OPS TREE</span>
                <h2>站点运营树</h2>
              </div>
              <span class="ops-count-pill">${formatNumber(stats.totalSites)}</span>
            </div>
            <label class="ops-search-field">
              <span>搜索站点</span>
              <input type="text" value="${escapeHtml(filters.roomSearch || "")}" placeholder="站点 / 标签 / 状态" data-room-filter="roomSearch" />
            </label>
            <div class="ops-filter-pills">
              <button type="button">多选</button>
              <button type="button">标签筛选</button>
              <button type="button">批量移动</button>
            </div>
            <div class="ops-room-tree">${renderSiteOpsTree(page.opsData.siteGroups, state)}</div>
          </aside>
          <main class="ops-room-command">
            <div class="ops-section-head">
              <div>
                <span class="ops-eyebrow">ROOM OPERATIONS</span>
                <h2>房间运营卡片</h2>
              </div>
              <div class="ops-room-tabs"><span>新手房</span><span>VIP房</span><span>高爆房</span><span>风控房</span></div>
            </div>
            <div class="ops-room-card-grid-wrap">${renderRoomOpsCards(page.opsData.rooms, state)}</div>
            ${renderTrafficAllocator(page.opsData.rooms)}
          </main>
          ${renderRoomDrawer(selectedRoom)}
        </div>
        ${renderBottomOpsCharts(page.opsData.rooms)}
      </section>
    `;
  }

  function renderTablePage(pageKey, page, state) {
    const rows = applyFilters(page.rows, page.filters, state.filters);
    const total = rows.length;
    const totalPages = Math.max(1, Math.ceil(total / state.pageSize));
    if (state.page > totalPages) state.page = totalPages;
    const start = (state.page - 1) * state.pageSize;
    const visibleRows = rows.slice(start, start + state.pageSize);

    return `
      <section class="page-frame table-page">
        ${renderPageHeader(page)}
        ${renderSummaryGrid(page.summary)}
        <div class="card page-table-card">
          ${renderToolbar(page, state)}
          <div class="page-table-section">
            <div class="page-table-head">
              <div>
                <h2>${escapeHtml(page.tableTitle || page.title)}</h2>
                <p>${escapeHtml(page.tableDescription || page.description || "")}</p>
              </div>
              <button class="toolbar-btn icon" type="button" data-action="export" title="导出当前表格">
                导出
              </button>
            </div>
            <div class="page-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>${page.columns.map((column) => `<th>${escapeHtml(column.label)}</th>`).join("")}</tr>
                </thead>
                <tbody>
                  ${
                    visibleRows.length
                      ? visibleRows
                          .map(
                            (row) => `
                              <tr>${page.columns.map((column) => `<td>${renderTableCell(row, column)}</td>`).join("")}</tr>
                            `,
                          )
                          .join("")
                      : `<tr><td colspan="${page.columns.length}" class="table-empty">暂无匹配数据</td></tr>`
                  }
                </tbody>
              </table>
            </div>
            ${renderPagination(pageKey, state, total, totalPages)}
          </div>
        </div>
      </section>
    `;
  }

  function renderTableCell(row, column) {
    if (typeof column.render === "function") {
      return column.render(row);
    }
    const text = row[column.key];
    return `<span class="${column.className || ""}">${escapeHtml(text)}</span>`;
  }

  function renderToolbar(page, state) {
    if (!page.filters.length) {
      return "";
    }
    return `
      <div class="page-toolbar">
        <div class="filter-grid">
          ${page.filters.map((filter) => renderFilter(filter, state.filters[filter.key])).join("")}
        </div>
        <div class="toolbar-actions">
          <button class="toolbar-btn primary" type="button" data-action="query">查询</button>
          <button class="toolbar-btn secondary" type="button" data-action="reset">重置</button>
        </div>
      </div>
    `;
  }

  function renderFilter(filter, value) {
    if (filter.type === "search") {
      return `
        <label class="filter-field">
          <span>${escapeHtml(filter.label)}</span>
          <input type="text" value="${escapeHtml(value || "")}" placeholder="${escapeHtml(
        filter.placeholder || "",
      )}" data-filter-key="${filter.key}" />
        </label>
      `;
    }

    if (filter.type === "select") {
      return `
        <label class="filter-field">
          <span>${escapeHtml(filter.label)}</span>
          <select data-filter-key="${filter.key}">
            ${filter.options
              .map(
                (option) =>
                  `<option value="${escapeHtml(option)}" ${option === value ? "selected" : ""}>${escapeHtml(
                    option,
                  )}</option>`,
              )
              .join("")}
          </select>
        </label>
      `;
    }

    if (filter.type === "month") {
      return `
        <label class="filter-field">
          <span>${escapeHtml(filter.label)}</span>
          <input type="month" value="${escapeHtml(value || "")}" data-filter-key="${filter.key}" />
        </label>
      `;
    }

    if (filter.type === "date-range") {
      return `
        <label class="filter-field filter-field-range">
          <span>${escapeHtml(filter.label)}</span>
          <div class="range-controls">
            <input type="date" value="${escapeHtml((value && value.start) || "")}" data-filter-key="${filter.key}" data-range-role="start" />
            <span>至</span>
            <input type="date" value="${escapeHtml((value && value.end) || "")}" data-filter-key="${filter.key}" data-range-role="end" />
          </div>
        </label>
      `;
    }

    return "";
  }

  function renderPagination(pageKey, state, total, totalPages) {
    const page = pageConfigs[pageKey];
    const pages = buildPageNumbers(state.page, totalPages);
    return `
      <div class="pagination-bar">
        <div class="pagination-total">共 ${formatNumber(total)} 条</div>
        <label class="page-size-select">
          <span>每页</span>
          <select data-action="page-size">
            ${page.pageSizeOptions
              .map((size) => `<option value="${size}" ${size === state.pageSize ? "selected" : ""}>${size}</option>`)
              .join("")}
          </select>
          <span>条</span>
        </label>
        <button type="button" class="pager-btn" data-action="page-prev" ${state.page <= 1 ? "disabled" : ""}>‹</button>
        ${pages
          .map((pageNumber) =>
            pageNumber === "..."
              ? `<span class="pager-ellipsis">...</span>`
              : `<button type="button" class="pager-btn ${pageNumber === state.page ? "active" : ""}" data-action="page-number" data-page="${pageNumber}">${pageNumber}</button>`,
          )
          .join("")}
        <button type="button" class="pager-btn" data-action="page-next" ${state.page >= totalPages ? "disabled" : ""}>›</button>
      </div>
    `;
  }

  function buildPageNumbers(current, total) {
    if (total <= 7) {
      return range(total, (index) => index + 1);
    }
    const pages = [1];
    if (current > 3) pages.push("...");
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let index = start; index <= end; index += 1) {
      pages.push(index);
    }
    if (current < total - 2) pages.push("...");
    pages.push(total);
    return pages;
  }

  function renderFormPage(pageKey, page, state) {
    const preview = page.preview ? renderPreviewBlock(page.preview) : "";
    const matrix = page.matrix ? renderPermissionMatrix(page.matrix) : "";
    return `
      <section class="page-frame form-page">
        ${renderPageHeader(page)}
        <div class="card form-shell-card">
          <div class="form-section-grid">
            ${page.sections.map((section) => renderFormSection(section, state.form)).join("")}
          </div>
          ${matrix}
          ${preview}
          <div class="page-action-row">
            ${page.actions
              .map(
                (action) => `
                  <button class="toolbar-btn ${action.tone}" type="button" data-action="${action.action}" data-page-key="${pageKey}">
                    ${escapeHtml(action.label)}
                  </button>
                `,
              )
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  function renderFormSection(section, formState) {
    return `
      <section class="form-section-card">
        <div class="form-section-card-head">
          <h2>${escapeHtml(section.title)}</h2>
          <p>${escapeHtml(section.description || "")}</p>
        </div>
        <div class="form-fields-grid">
          ${section.fields.map((item) => renderFormField(item, formState[item.name] || "")).join("")}
        </div>
      </section>
    `;
  }

  function renderFormField(fieldConfig, value) {
    if (fieldConfig.type === "textarea") {
      return `
        <label class="form-field form-field-wide">
          <span>${escapeHtml(fieldConfig.label)}</span>
          <textarea rows="4" data-form-key="${fieldConfig.name}" placeholder="${escapeHtml(
        fieldConfig.placeholder || "",
      )}">${escapeHtml(value)}</textarea>
        </label>
      `;
    }

    if (fieldConfig.type === "select") {
      return `
        <label class="form-field">
          <span>${escapeHtml(fieldConfig.label)}</span>
          <select data-form-key="${fieldConfig.name}">
            ${fieldConfig.options
              .map(
                (option) =>
                  `<option value="${escapeHtml(option)}" ${option === value ? "selected" : ""}>${escapeHtml(
                    option,
                  )}</option>`,
              )
              .join("")}
          </select>
        </label>
      `;
    }

    return `
      <label class="form-field">
        <span>${escapeHtml(fieldConfig.label)}</span>
        <input type="${fieldConfig.type}" value="${escapeHtml(value)}" data-form-key="${fieldConfig.name}" placeholder="${escapeHtml(
      fieldConfig.placeholder || "",
    )}" />
      </label>
    `;
  }

  function renderPreviewBlock(preview) {
    return `
      <section class="preview-section">
        <div class="preview-section-head">
          <h2>${escapeHtml(preview.title)}</h2>
          <p>${escapeHtml(preview.description || "")}</p>
        </div>
        ${renderMiniTable(preview.columns, preview.rows)}
      </section>
    `;
  }

  function renderPermissionMatrix(matrix) {
    return `
      <section class="preview-section">
        <div class="preview-section-head">
          <h2>权限矩阵</h2>
          <p>按模块控制查看、编辑和审核能力。</p>
        </div>
        <div class="page-table-wrap compact">
          <table class="data-table compact">
            <thead>
              <tr>
                <th>模块</th>
                <th>查看</th>
                <th>编辑</th>
                <th>审核</th>
              </tr>
            </thead>
            <tbody>
              ${matrix
                .map(
                  (row) => `
                    <tr>
                      <td>${escapeHtml(row.module)}</td>
                      <td>${badge(row.view ? "允许" : "关闭", row.view ? "success" : "neutral")}</td>
                      <td>${badge(row.edit ? "允许" : "关闭", row.edit ? "warning" : "neutral")}</td>
                      <td>${badge(row.approve ? "允许" : "关闭", row.approve ? "danger" : "neutral")}</td>
                    </tr>
                  `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      </section>
    `;
  }

  function applyFilters(rows, filterDefs, filters) {
    return rows.filter((row) =>
      filterDefs.every((filter) => {
        const value = filters[filter.key];
        if (filter.type === "date-range") {
          if (!value || (!value.start && !value.end)) return true;
          return filter.apply ? filter.apply(row, value, filters) : true;
        }
        if (value === "" || value == null) return true;
        return filter.apply ? filter.apply(row, value, filters) : true;
      }),
    );
  }

  function syncTableFiltersFromDom(page, state) {
    const nextFilters = cloneValue(state.filters);
    (page.filters || []).forEach((filter) => {
      if (filter.type === "date-range") {
        const startInput = document.querySelector(`[data-filter-key="${filter.key}"][data-range-role="start"]`);
        const endInput = document.querySelector(`[data-filter-key="${filter.key}"][data-range-role="end"]`);
        nextFilters[filter.key] = {
          start: startInput ? startInput.value : "",
          end: endInput ? endInput.value : "",
        };
        return;
      }
      const input = document.querySelector(`[data-filter-key="${filter.key}"]`);
      nextFilters[filter.key] = input ? input.value : "";
    });
    state.filters = nextFilters;
  }

  function syncRoomOpsFiltersFromDom(state) {
    const nextFilters = cloneValue(state.roomFilters || {});
    document.querySelectorAll("[data-room-filter]").forEach((input) => {
      const key = input.dataset.roomFilter;
      if (!key) return;
      nextFilters[key] = input.value;
    });
    state.roomFilters = nextFilters;
  }

  function syncFormFromDom(page, state) {
    const nextForm = cloneValue(state.form);
    (page.sections || []).forEach((section) => {
      section.fields.forEach((item) => {
        const input = document.querySelector(`[data-form-key="${item.name}"]`);
        if (input) {
          nextForm[item.name] = input.value;
        }
      });
    });
    state.form = nextForm;
  }

  function resetTableState(page, state) {
    const nextFilters = {};
    (page.filters || []).forEach((filter) => {
      nextFilters[filter.key] = filter.type === "date-range" ? { start: "", end: "" } : "";
    });
    state.filters = nextFilters;
    state.page = 1;
    state.pageSize = page.defaultPageSize || 20;
  }

  function resetFormState(page, state) {
    state.form = cloneValue(page.formDefaults || {});
  }

  function showToast(message) {
    let host = document.querySelector(".toast-host");
    if (!host) {
      host = document.createElement("div");
      host.className = "toast-host";
      document.body.appendChild(host);
    }
    const toast = document.createElement("div");
    toast.className = "toast-item";
    toast.textContent = message;
    host.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("visible");
      setTimeout(() => {
        toast.classList.remove("visible");
        setTimeout(() => toast.remove(), 180);
      }, 1800);
    }, 16);
  }

  function buildFlightRoomOpsData() {
    function createSite(id, name, todayBet, todayProfit, online, overrideRtp = "") {
      return { id, name, todayBet, todayProfit, online, overrideRtp, maskedIp: "103.2.*.*" };
    }

    function createRoom(id, code, name, rtp, inventory, note, sites) {
      return { id, code, name, rtp, inventory, note, enabled: true, sites };
    }

    function createCountry(country, code, currencyName, symbol, rooms, unassignedSites) {
      return { country, code, currencyName, symbol, rooms, unassignedSites };
    }

    return {
      defaultRoomId: "inr-room-001",
      countries: [
        createCountry(
          "印度",
          "INR",
          "Indian Rupee",
          "₹",
          [
            createRoom("inr-room-001", "INR-房间001", "新手厅", 95.2, 2860000, "默认兜底房间", [
              createSite("IN-10**", "印度站点A", 1250000, 120000, 320),
              createSite("IN-12**", "印度站点B", 860000, 92000, 248),
              createSite("IN-18**", "印度站点C", 620000, -38000, 172, "95.80"),
            ]),
            createRoom("inr-room-002", "INR-房间002", "高RTP厅", 96.8, 1920000, "活动拉新房间", [
              createSite("IN-21**", "印度站点D", 980000, 86000, 204),
              createSite("IN-25**", "印度站点E", 760000, 54000, 196),
            ]),
            createRoom("inr-room-003", "INR-房间003", "VIP厅", 94.5, 3180000, "高价值玩家池", [
              createSite("IN-30**", "印度站点F", 1680000, 164000, 428, "94.10"),
              createSite("IN-33**", "印度站点G", 1140000, 112000, 286),
            ]),
          ],
          [
            createSite("IN-40**", "印度站点H", 420000, 26000, 108),
            createSite("IN-48**", "印度站点I", 510000, -18000, 132),
            createSite("IN-56**", "印度站点J", 370000, 21000, 94),
          ],
        ),
        createCountry(
          "印尼",
          "IDR",
          "Indonesian Rupiah",
          "Rp",
          [
            createRoom("idr-room-001", "IDR-房间001", "标准厅", 95.0, 860000000, "印尼默认房", [
              createSite("ID-11**", "印尼站点A", 268000000, 22400000, 412),
              createSite("ID-16**", "印尼站点B", 184000000, 9800000, 238),
            ]),
            createRoom("idr-room-002", "IDR-房间002", "高波动厅", 96.4, 530000000, "高活跃房间", [
              createSite("ID-24**", "印尼站点C", 224000000, -16200000, 276),
            ]),
          ],
          [
            createSite("ID-31**", "印尼站点D", 108000000, 7200000, 144),
            createSite("ID-39**", "印尼站点E", 126000000, -5600000, 126),
          ],
        ),
        createCountry(
          "巴西",
          "BRL",
          "Brazilian Real",
          "R$",
          [
            createRoom("brl-room-001", "BRL-房间001", "促活厅", 95.6, 1420000, "巴西活动房", [
              createSite("BR-10**", "巴西站点A", 348000, 42000, 162),
              createSite("BR-18**", "巴西站点B", 286000, 18000, 118),
            ]),
            createRoom("brl-room-002", "BRL-房间002", "常规厅", 94.9, 1980000, "巴西常规房", [
              createSite("BR-27**", "巴西站点C", 524000, 36000, 214),
              createSite("BR-35**", "巴西站点D", 466000, -28000, 186, "95.30"),
            ]),
          ],
          [createSite("BR-44**", "巴西站点E", 192000, 12000, 88)],
        ),
        createCountry(
          "泰国",
          "THB",
          "Thai Baht",
          "฿",
          [
            createRoom("thb-room-001", "THB-房间001", "标准厅", 95.1, 3220000, "泰国默认房", [
              createSite("TH-10**", "泰国站点A", 880000, 64000, 202),
              createSite("TH-19**", "泰国站点B", 760000, 52000, 176),
            ]),
            createRoom("thb-room-002", "THB-房间002", "活动厅", 96.2, 2140000, "泰国活动房", [
              createSite("TH-28**", "泰国站点C", 690000, -22000, 148),
            ]),
          ],
          [
            createSite("TH-39**", "泰国站点D", 320000, 14000, 102),
            createSite("TH-45**", "泰国站点E", 280000, 6000, 86),
          ],
        ),
      ],
    };
  }

  function getRoomOpsCountry(page, state) {
    return page.opsData.countries.find((item) => item.code === state.activeCountryCode) || page.opsData.countries[0];
  }

  function getRoomOpsRoom(country, roomId) {
    return country.rooms.find((room) => room.id === roomId) || country.rooms[0] || null;
  }

  function getRoomOpsMetrics(room) {
    return {
      online: room.sites.reduce((sum, site) => sum + Number(site.online || 0), 0),
      todayBet: room.sites.reduce((sum, site) => sum + Number(site.todayBet || 0), 0),
      todayProfit: room.sites.reduce((sum, site) => sum + Number(site.todayProfit || 0), 0),
      siteCount: room.sites.length,
    };
  }

  function getRoomOpsSummary(country) {
    const totalOnline = country.rooms.reduce((sum, room) => sum + getRoomOpsMetrics(room).online, 0);
    const totalInventory = country.rooms.reduce((sum, room) => sum + Number(room.inventory || 0), 0);
    const weightedBase = country.rooms.reduce((sum, room) => sum + getRoomOpsMetrics(room).todayBet, 0) || 1;
    const weightedRtp =
      country.rooms.reduce((sum, room) => sum + Number(room.rtp || 0) * getRoomOpsMetrics(room).todayBet, 0) / weightedBase;
    return { totalOnline, totalInventory, weightedRtp, roomCount: country.rooms.length };
  }

  function formatRoomOpsMoney(value, country) {
    const numeric = Number(value || 0);
    return `${numeric < 0 ? "-" : ""}${country.symbol}${formatNumber(Math.abs(numeric))}`;
  }

  function findRoomById(rooms, roomId) {
    return (rooms || []).find((room) => room.id === roomId) || rooms[0] || null;
  }

  function getRoomOpsSiteRtp(site, room) {
    return Number(site.overrideRtp || room.rtp).toFixed(2);
  }

  function getOrderedCurrencies(page, state) {
    const byCode = new Map(page.opsData.countries.map((country) => [country.code, country]));
    const ordered = (state.currencyOrder || []).map((code) => byCode.get(code)).filter(Boolean);
    page.opsData.countries.forEach((country) => {
      if (!ordered.some((item) => item.code === country.code)) {
        ordered.push(country);
      }
    });
    return ordered;
  }

  function renderCurrencySelector(page, state) {
    const countries = getOrderedCurrencies(page, state);
    return `
      <section class="ops-filter-bar">
        <div class="ops-filter-field ops-filter-country">
          <label>国家/货币选择器</label>
          <input
            type="text"
            list="room-country-options"
            value="${escapeHtml(state.roomFilters.countryKeyword || "")}"
            placeholder="支持搜索国家名称 / 货币代码"
            data-room-filter="countryKeyword"
            data-room-country
          />
          <datalist id="room-country-options">
            ${countries
              .map((country) => `<option value="${escapeHtml(country.country)}/${escapeHtml(country.code)}">${escapeHtml(country.currencyName)}</option>`)
              .join("")}
          </datalist>
        </div>
        <div class="ops-filter-field">
          <label>游戏选择器</label>
          <select data-room-filter="gameKey" disabled>
            <option value="crash" selected>飞机游戏 / Crash</option>
          </select>
        </div>
        <div class="ops-filter-field ops-filter-search">
          <label>房间/站点检索</label>
          <input
            type="text"
            value="${escapeHtml(state.roomFilters.roomSearch || "")}"
            placeholder="支持房间名称、站点名称、站点ID"
            data-room-filter="roomSearch"
          />
        </div>
        <div class="ops-filter-actions">
          <button type="button" class="primary" data-action="query">查询</button>
          <button type="button" data-action="room-reset">重置</button>
        </div>
      </section>
    `;
  }

  function renderRoomOpsSummary(country) {
    const summary = getRoomOpsSummary(country);
    return `
      <section class="ops-summary-grid">
        <article class="ops-summary-card">
          <span>当前国家</span>
          <strong>${escapeHtml(country.country)} / ${escapeHtml(country.code)}</strong>
          <em>${escapeHtml(country.currencyName)}</em>
        </article>
        <article class="ops-summary-card">
          <span>总在线人数</span>
          <strong>${formatNumber(summary.totalOnline)}</strong>
          <em>${formatNumber(country.rooms.length)} 个房间</em>
        </article>
        <article class="ops-summary-card">
          <span>今日综合RTP</span>
          <strong>${summary.weightedRtp.toFixed(2)}%</strong>
          <em>按今日投注额加权</em>
        </article>
        <article class="ops-summary-card">
          <span>总库存</span>
          <strong>${formatRoomOpsMoney(summary.totalInventory, country)}</strong>
          <em>${formatNumber(country.unassignedSites.length)} 个待分配站点</em>
        </article>
      </section>
    `;
  }

  function renderRoomOpsToolbar(state) {
    const selectedCount = Object.values(state.selectedRoomIds || {}).filter(Boolean).length;
    return `
      <section class="ops-toolbar ops-room-toolbar">
        <div class="ops-toolbar-actions">
          <button type="button" class="primary" data-action="room-create-open">创建房间</button>
          <select data-room-bulk-select>
            <option value="">房间批量操作</option>
            <option value="bulk-rtp">批量调整RTP</option>
            <option value="bulk-assign">批量分配站点</option>
            <option value="bulk-delete">批量删除</option>
          </select>
          <button type="button" data-action="room-bulk-apply">执行</button>
          <button type="button" data-action="room-export">导出Excel</button>
        </div>
        <span class="ops-toolbar-hint">已选择 ${formatNumber(selectedCount)} 个房间</span>
      </section>
    `;
  }

  function renderRoomOpsSiteTable(room, country, state) {
    const pageSize = Number(state.pageSize || 100);
    const currentPage = Math.max(1, state.roomPages?.[room.id] || 1);
    const totalPages = Math.max(1, Math.ceil(room.sites.length / pageSize));
    const page = Math.min(currentPage, totalPages);
    const sites = room.sites.slice((page - 1) * pageSize, page * pageSize);

    return `
      <div class="ops-room-site-panel">
        <div class="ops-room-site-header">
          <strong>已绑定站点</strong>
          <span>${formatNumber(room.sites.length)} 条记录</span>
        </div>
        <div class="ops-room-site-table-wrap">
          <table class="ops-room-site-table">
            <thead>
              <tr>
                <th>站点ID</th>
                <th>站点名称</th>
                <th>所属房间</th>
                <th>当前RTP</th>
                <th>今日投注额</th>
                <th>今日盈利</th>
                <th>在线人数</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              ${
                sites.length
                  ? sites
                      .map(
                        (site) => `
                          <tr>
                            <td class="mono">${escapeHtml(site.id)}</td>
                            <td>${escapeHtml(site.name)}</td>
                            <td>${escapeHtml(room.code)}</td>
                            <td>${getRoomOpsSiteRtp(site, room)}%</td>
                            <td>${formatRoomOpsMoney(site.todayBet, country)}</td>
                            <td class="${site.todayProfit >= 0 ? "profit-up" : "profit-down"}">${formatRoomOpsMoney(
                              site.todayProfit,
                              country,
                            )}</td>
                            <td>${formatNumber(site.online)}</td>
                            <td><button type="button" data-action="site-rtp-open" data-room-id="${room.id}" data-site-id="${site.id}">调整RTP</button></td>
                          </tr>
                        `,
                      )
                      .join("")
                  : `<tr><td colspan="8" class="ops-room-empty">当前房间暂无绑定站点</td></tr>`
              }
            </tbody>
          </table>
        </div>
        <div class="pagination-bar room-ops-pagination">
          <div class="page-size-select">
            <span>每页</span>
            <select data-action="page-size">
              ${(pageConfigs["flight-room-manage"].pageSizeOptions || [])
                .map((option) => `<option value="${option}"${pageSize === option ? " selected" : ""}>${option}</option>`)
                .join("")}
            </select>
          </div>
          <div class="pager">
            <button class="pager-btn" type="button" data-action="room-page" data-room-id="${room.id}" data-page="${Math.max(page - 1, 1)}"${
              page <= 1 ? " disabled" : ""
            }>上一页</button>
            <span class="pager-summary">${page} / ${totalPages}</span>
            <button class="pager-btn" type="button" data-action="room-page" data-room-id="${room.id}" data-page="${Math.min(
              page + 1,
              totalPages,
            )}"${page >= totalPages ? " disabled" : ""}>下一页</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderRoomOpsCards(country, state) {
    const query = (state.roomFilters.roomSearch || "").trim().toLowerCase();
    const rooms = country.rooms.filter((room) => {
      if (!query) return true;
      if (room.code.toLowerCase().includes(query) || room.name.toLowerCase().includes(query)) return true;
      return room.sites.some((site) => site.name.toLowerCase().includes(query) || site.id.toLowerCase().includes(query));
    });

    return rooms
      .map((room) => {
        const metrics = getRoomOpsMetrics(room);
        const expanded = state.expandedRooms?.[room.id];
        return `
          <article class="ops-room-card light${state.selectedRoomId === room.id ? " active" : ""}">
            <div class="ops-room-card-top">
              <label class="ops-room-check">
                <input type="checkbox" ${state.selectedRoomIds?.[room.id] ? "checked" : ""} data-room-select-id="${room.id}" />
                <span></span>
              </label>
              <div class="ops-room-heading" data-action="room-select" data-room-id="${room.id}">
                <strong>${escapeHtml(room.code)}</strong>
                <span>${escapeHtml(room.name)}</span>
              </div>
              <button type="button" class="ops-expand-btn" data-action="room-expand" data-room-id="${room.id}">${expanded ? "收起站点" : "展开站点"}</button>
            </div>
            <div class="ops-room-metrics-grid">
              <div><span>房间RTP</span><strong>${Number(room.rtp).toFixed(2)}%</strong></div>
              <div><span>房间在线人数</span><strong>${formatNumber(metrics.online)}</strong></div>
              <div><span>房间库存</span><strong>${formatRoomOpsMoney(room.inventory, country)}</strong></div>
              <div><span>累计投注量</span><strong>${formatRoomOpsMoney(metrics.todayBet, country)}</strong></div>
            </div>
            <div class="ops-room-card-note">${escapeHtml(room.note || "未设置备注")}</div>
            <div class="ops-room-card-actions">
              <button type="button" data-action="room-rtp-open" data-room-id="${room.id}">编辑RTP</button>
              <button type="button" data-action="room-assign-open" data-room-id="${room.id}">分配站点</button>
              <button type="button" class="danger" data-action="room-delete" data-room-id="${room.id}">删除</button>
            </div>
            ${expanded ? renderRoomOpsSiteTable(room, country, state) : ""}
          </article>
        `;
      })
      .join("");
  }

  function renderRoomOpsAssignModal(state, country, room) {
    const modal = state.modal || {};
    const query = (modal.search || "").trim().toLowerCase();
    const sourcePool = country.rooms
      .filter((item) => item.id !== room.id)
      .flatMap((item) => item.sites.map((site) => ({ ...site, sourceRoomCode: item.code })))
      .concat(country.unassignedSites.map((site) => ({ ...site, sourceRoomCode: "未分配" })));
    const sourceSites = sourcePool.filter((site) => !query || site.id.toLowerCase().includes(query) || site.name.toLowerCase().includes(query));
    const targetSites = room.sites.filter((site) => !query || site.id.toLowerCase().includes(query) || site.name.toLowerCase().includes(query));

    return `
      <div class="ops-modal-backdrop">
        <div class="ops-modal ops-modal-wide">
          <div class="ops-modal-head">
            <div>
              <h2>分配站点</h2>
              <p>${escapeHtml(room.code)} / ${escapeHtml(room.name)}</p>
            </div>
            <button type="button" data-action="room-modal-close">关闭</button>
          </div>
          <div class="ops-modal-note">左侧为未分配站点与其他房间站点；移入后自动归属当前房间，并默认同步房间 RTP。</div>
          <div class="ops-transfer-search">
            <input type="text" value="${escapeHtml(modal.search || "")}" placeholder="按站点ID / 名称搜索" data-room-modal-search />
          </div>
          <div class="ops-transfer-layout">
            <section class="ops-transfer-panel">
              <header>待分配/其他房间站点</header>
              <div class="ops-transfer-list">
                ${
                  sourceSites.length
                    ? sourceSites
                        .map(
                          (site) => `
                            <label class="ops-transfer-item">
                              <input type="checkbox" data-assign-side="source" data-site-id="${site.id}" ${
                                state.modal?.selectedSourceSiteIds?.[site.id] ? "checked" : ""
                              } />
                              <span>
                                <strong>${escapeHtml(site.id)} / ${escapeHtml(site.name)}</strong>
                                <em>${escapeHtml(site.sourceRoomCode)} · ${formatRoomOpsMoney(site.todayBet, country)} · ${formatNumber(site.online)} 在线</em>
                              </span>
                            </label>
                          `,
                        )
                        .join("")
                    : `<div class="ops-room-empty">没有可分配站点</div>`
                }
              </div>
            </section>
            <div class="ops-transfer-actions">
              <button type="button" data-action="assign-move-in" data-room-id="${room.id}">移入 &gt;&gt;</button>
              <button type="button" data-action="assign-move-out" data-room-id="${room.id}">&lt;&lt; 移出</button>
            </div>
            <section class="ops-transfer-panel">
              <header>当前房间站点</header>
              <div class="ops-transfer-list">
                ${
                  targetSites.length
                    ? targetSites
                        .map(
                          (site) => `
                            <label class="ops-transfer-item">
                              <input type="checkbox" data-assign-side="target" data-site-id="${site.id}" ${
                                state.modal?.selectedTargetSiteIds?.[site.id] ? "checked" : ""
                              } />
                              <span>
                                <strong>${escapeHtml(site.id)} / ${escapeHtml(site.name)}</strong>
                                <em>${getRoomOpsSiteRtp(site, room)}% · ${formatRoomOpsMoney(site.todayBet, country)} · ${formatNumber(site.online)} 在线</em>
                              </span>
                            </label>
                          `,
                        )
                        .join("")
                    : `<div class="ops-room-empty">当前房间暂无站点</div>`
                }
              </div>
            </section>
          </div>
        </div>
      </div>
    `;
  }

  function renderRoomOpsModal(page, state, country) {
    const modal = state.modal || null;
    if (!modal) return "";

    if (modal.type === "create-room") {
      const nextIndex = String(country.rooms.length + 1).padStart(3, "0");
      return `
        <div class="ops-modal-backdrop">
          <div class="ops-modal">
            <div class="ops-modal-head">
              <h2>创建房间</h2>
              <button type="button" data-action="room-modal-close">关闭</button>
            </div>
            <div class="ops-modal-field">
              <span>房间名称</span>
              <input type="text" value="${escapeHtml(modal.roomName || `${country.code}-房间${nextIndex}`)}" data-room-form="roomName" />
            </div>
            <div class="ops-modal-grid">
              <label class="ops-modal-field">
                <span>房间RTP</span>
                <input type="number" min="90" max="99" step="0.01" value="${escapeHtml(modal.roomRtp || "95.00")}" data-room-form="roomRtp" />
              </label>
              <label class="ops-modal-field">
                <span>初始库存</span>
                <input type="number" min="0" step="1" value="${escapeHtml(modal.roomInventory || "1000000")}" data-room-form="roomInventory" />
              </label>
            </div>
            <div class="ops-modal-field">
              <span>备注</span>
              <input type="text" value="${escapeHtml(modal.roomNote || "")}" data-room-form="roomNote" />
            </div>
            <div class="ops-modal-actions">
              <button type="button" data-action="room-modal-close">取消</button>
              <button type="button" class="primary" data-action="room-create-submit">确认创建</button>
            </div>
          </div>
        </div>
      `;
    }

    if (modal.type === "edit-room-rtp") {
      return `
        <div class="ops-modal-backdrop">
          <div class="ops-modal">
            <div class="ops-modal-head">
              <h2>${modal.roomIds?.length > 1 ? "批量调整RTP" : "编辑房间RTP"}</h2>
              <button type="button" data-action="room-modal-close">关闭</button>
            </div>
            <div class="ops-modal-field">
              <span>RTP 范围 90%-99%</span>
              <input type="number" min="90" max="99" step="0.01" value="${escapeHtml(modal.value || "95.00")}" data-room-form="roomRtpValue" />
            </div>
            <div class="ops-modal-actions">
              <button type="button" data-action="room-modal-close">取消</button>
              <button type="button" class="primary" data-action="room-rtp-save">保存</button>
            </div>
          </div>
        </div>
      `;
    }

    if (modal.type === "edit-site-rtp") {
      const room = getRoomOpsRoom(country, modal.roomId);
      const site = room?.sites.find((item) => item.id === modal.siteId);
      return `
        <div class="ops-modal-backdrop">
          <div class="ops-modal">
            <div class="ops-modal-head">
              <h2>调整站点RTP</h2>
              <button type="button" data-action="room-modal-close">关闭</button>
            </div>
            <div class="ops-modal-note">留空表示恢复继承房间 RTP，站点单独 RTP 优先级高于房间设置。</div>
            <div class="ops-modal-field">
              <span>${escapeHtml(site?.id || "")} / ${escapeHtml(site?.name || "")}</span>
              <input type="number" min="90" max="99" step="0.01" value="${escapeHtml(modal.value || site?.overrideRtp || "")}" data-room-form="siteRtpValue" placeholder="留空=继承房间RTP" />
            </div>
            <div class="ops-modal-actions">
              <button type="button" data-action="room-modal-close">取消</button>
              <button type="button" class="primary" data-action="site-rtp-save">保存</button>
            </div>
          </div>
        </div>
      `;
    }

    if (modal.type === "assign-sites") {
      const room = getRoomOpsRoom(country, modal.roomId);
      return room ? renderRoomOpsAssignModal(state, country, room) : "";
    }

    return "";
  }

  function renderFlightRoomOpsPage(page, state) {
    const country = getRoomOpsCountry(page, state);
    if (!getRoomOpsRoom(country, state.selectedRoomId) && country.rooms[0]) {
      state.selectedRoomId = country.rooms[0].id;
    }

    return `
      <section class="room-ops-page room-ops-page-light">
        <div class="page-heading room-ops-heading">
          <h1 class="page-title">${escapeHtml(page.title)}</h1>
          <div class="page-subtitle">${escapeHtml(page.section)} / ${escapeHtml(page.title)}</div>
          <p class="page-description">基于国家和货币维度统一管理飞机房间、站点归属与 RTP 配置，示例金额已按国家货币符号脱敏展示。</p>
        </div>
        ${renderCurrencySelector(page, state)}
        ${renderRoomOpsSummary(country)}
        ${renderRoomOpsToolbar(state)}
        <section class="ops-room-list-grid">${renderRoomOpsCards(country, state)}</section>
        ${renderRoomOpsModal(page, state, country)}
      </section>
    `;
  }

  function downloadRoomOpsExport(country) {
    const rows = [["国家", "货币", "房间编码", "房间名称", "房间RTP", "站点ID", "站点名称", "当前RTP", "今日投注额", "今日盈利", "在线人数"]];
    country.rooms.forEach((room) => {
      room.sites.forEach((site) => {
        rows.push([
          country.country,
          country.code,
          room.code,
          room.name,
          `${Number(room.rtp).toFixed(2)}%`,
          site.id,
          site.name,
          `${getRoomOpsSiteRtp(site, room)}%`,
          `${country.symbol}${formatNumber(site.todayBet)}`,
          `${country.symbol}${formatNumber(site.todayProfit)}`,
          formatNumber(site.online),
        ]);
      });
    });
    const csv = `\uFEFF${rows.map((row) => row.join(",")).join("\n")}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `plane-room-management-${country.code}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 300);
  }

  function takeRoomOpsSite(country, siteId) {
    const unassignedIndex = country.unassignedSites.findIndex((site) => site.id === siteId);
    if (unassignedIndex >= 0) {
      return country.unassignedSites.splice(unassignedIndex, 1)[0];
    }
    for (const room of country.rooms) {
      const index = room.sites.findIndex((site) => site.id === siteId);
      if (index >= 0) {
        return room.sites.splice(index, 1)[0];
      }
    }
    return null;
  }

  function moveSitesIntoRoom(country, roomId, siteIds) {
    const room = getRoomOpsRoom(country, roomId);
    if (!room) return 0;
    let moved = 0;
    siteIds.forEach((siteId) => {
      const site = takeRoomOpsSite(country, siteId);
      if (site) {
        room.sites.push(site);
        moved += 1;
      }
    });
    room.sites.sort((a, b) => a.id.localeCompare(b.id));
    return moved;
  }

  function moveSitesOutOfRoom(country, roomId, siteIds) {
    const room = getRoomOpsRoom(country, roomId);
    if (!room) return 0;
    let moved = 0;
    siteIds.forEach((siteId) => {
      const index = room.sites.findIndex((site) => site.id === siteId);
      if (index >= 0) {
        country.unassignedSites.push(room.sites.splice(index, 1)[0]);
        moved += 1;
      }
    });
    country.unassignedSites.sort((a, b) => a.id.localeCompare(b.id));
    return moved;
  }

  function refreshRoomOpsCountry(country) {
    country.rooms.forEach((room) => {
      room.sites.forEach((site) => {
        site.online = Math.max(0, Number(site.online) + Math.round((Math.random() - 0.35) * 18));
        site.todayBet = Math.max(0, Number(site.todayBet) + Math.round(Math.random() * 12000));
        site.todayProfit = Number(site.todayProfit) + Math.round((Math.random() - 0.45) * 8000);
      });
      room.inventory = Math.max(0, Number(room.inventory) + Math.round((Math.random() - 0.5) * 12000));
    });
  }

  function handleRootClick(event) {
    const actionTarget = event.target.closest("[data-action]");
    if (!actionTarget) return;

    const pageKey = getCurrentPageKey();
    const page = pageConfigs[pageKey];
    const state = getPageState(pageKey, page);
    const action = actionTarget.dataset.action;

    if (page.type === "roomOps") {
      if (action === "room-select") {
        state.selectedRoomId = actionTarget.dataset.roomId;
        renderCurrentPage();
        return;
      }

      if (action === "room-toggle") {
        const roomId = actionTarget.dataset.roomId;
        state.collapsedRooms[roomId] = !state.collapsedRooms[roomId];
        renderCurrentPage();
        return;
      }

      if (action === "room-favorite") {
        const roomId = actionTarget.dataset.roomId;
        const room = findRoomById(page.opsData.rooms, roomId);
        state.favoriteRooms[roomId] = !(state.favoriteRooms[roomId] ?? room?.favorite);
        renderCurrentPage();
        return;
      }

      if (action === "room-refresh") {
        showToast("房间实时数据已刷新");
        return;
      }
    }

    if (action === "query") {
      syncTableFiltersFromDom(page, state);
      state.page = 1;
      renderCurrentPage();
      return;
    }

    if (action === "reset") {
      resetTableState(page, state);
      renderCurrentPage();
      return;
    }

    if (action === "page-prev") {
      if (state.page > 1) {
        state.page -= 1;
        renderCurrentPage();
      }
      return;
    }

    if (action === "page-next") {
      state.page += 1;
      renderCurrentPage();
      return;
    }

    if (action === "page-number") {
      state.page = Number(actionTarget.dataset.page);
      renderCurrentPage();
      return;
    }

    if (action === "export") {
      showToast("已准备导出当前页面数据");
      return;
    }

    if (action === "form-save") {
      syncFormFromDom(page, state);
      showToast(`${page.title} 已保存`);
      return;
    }

    if (action === "form-reset") {
      resetFormState(page, state);
      renderCurrentPage();
    }
  }

  function handleRootChange(event) {
    const actionTarget = event.target;
    if (actionTarget.matches("[data-room-filter]")) {
      const pageKey = getCurrentPageKey();
      const page = pageConfigs[pageKey];
      if (page.type === "roomOps") {
        const state = getPageState(pageKey, page);
        syncRoomOpsFiltersFromDom(state);
        renderCurrentPage();
      }
    }

    if (actionTarget.matches('[data-action="page-size"]')) {
      const pageKey = getCurrentPageKey();
      const page = pageConfigs[pageKey];
      const state = getPageState(pageKey, page);
      state.pageSize = Number(actionTarget.value);
      state.page = 1;
      renderCurrentPage();
    }
  }

  function handleRootDragStart(event) {
    const chip = event.target.closest("[data-currency-code]");
    if (!chip) return;
    const code = chip.dataset.currencyCode;
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", code);
    chip.classList.add("is-dragging");
  }

  function handleRootDragOver(event) {
    const chip = event.target.closest("[data-currency-code]");
    if (!chip) return;
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }

  function handleRootDrop(event) {
    const targetChip = event.target.closest("[data-currency-code]");
    if (!targetChip) return;
    event.preventDefault();

    const pageKey = getCurrentPageKey();
    const page = pageConfigs[pageKey];
    if (page.type !== "roomOps") return;

    const state = getPageState(pageKey, page);
    const sourceCode = event.dataTransfer.getData("text/plain");
    const targetCode = targetChip.dataset.currencyCode;
    if (!sourceCode || !targetCode || sourceCode === targetCode) return;

    const orderedCodes = getOrderedCurrencies(page, state).map((currency) => currency.code);
    const nextOrder = orderedCodes.filter((code) => code !== sourceCode);
    const targetIndex = nextOrder.indexOf(targetCode);
    nextOrder.splice(Math.max(targetIndex, 0), 0, sourceCode);
    state.currencyOrder = nextOrder;
    renderCurrentPage();
  }

  function handleRootDragEnd(event) {
    const chip = event.target.closest("[data-currency-code]");
    if (chip) chip.classList.remove("is-dragging");
  }

  function handleRootClick(event) {
    const actionTarget = event.target.closest("[data-action]");
    if (!actionTarget) return;

    const pageKey = getCurrentPageKey();
    const page = pageConfigs[pageKey];
    const state = getPageState(pageKey, page);
    const action = actionTarget.dataset.action;

    if (page.type === "roomOps") {
      const country = getRoomOpsCountry(page, state);

      if (action === "room-select") {
        state.selectedRoomId = actionTarget.dataset.roomId;
        renderCurrentPage();
        return;
      }

      if (action === "room-expand") {
        const roomId = actionTarget.dataset.roomId;
        state.expandedRooms[roomId] = !state.expandedRooms[roomId];
        renderCurrentPage();
        return;
      }

      if (action === "room-page") {
        state.roomPages[actionTarget.dataset.roomId] = Number(actionTarget.dataset.page || 1);
        renderCurrentPage();
        return;
      }

      if (action === "room-refresh") {
        refreshRoomOpsCountry(country);
        showToast("已刷新当前国家房间与站点演示数据");
        renderCurrentPage();
        return;
      }

      if (action === "room-reset") {
        const defaultCountry = page.opsData.countries[0];
        state.activeCountryCode = defaultCountry.code;
        state.selectedRoomId = defaultCountry.rooms[0]?.id || page.opsData.defaultRoomId;
        state.roomFilters = {
          roomSearch: "",
          siteSearch: "",
          countryKeyword: `${defaultCountry.country}/${defaultCountry.code}`,
          gameKey: "crash",
        };
        state.expandedRooms = {};
        state.selectedRoomIds = {};
        state.modal = null;
        state.pageSize = page.defaultPageSize || 100;
        renderCurrentPage();
        return;
      }

      if (action === "query") {
        const keyword = (state.roomFilters.countryKeyword || "").toLowerCase();
        const matched = page.opsData.countries.find(
          (item) =>
            `${item.country}/${item.code}`.toLowerCase() === keyword ||
            item.country.toLowerCase() === keyword ||
            item.code.toLowerCase() === keyword,
        );
        if (matched) {
          state.activeCountryCode = matched.code;
          state.selectedRoomId = matched.rooms[0]?.id || "";
        }
        renderCurrentPage();
        return;
      }

      if (action === "room-create-open") {
        state.modal = { type: "create-room" };
        renderCurrentPage();
        return;
      }

      if (action === "room-modal-close") {
        state.modal = null;
        renderCurrentPage();
        return;
      }

      if (action === "room-create-submit") {
        const roomName = document.querySelector('[data-room-form="roomName"]')?.value?.trim() || `${country.code}-房间001`;
        const roomRtp = Number(document.querySelector('[data-room-form="roomRtp"]')?.value || 95);
        const roomInventory = Number(document.querySelector('[data-room-form="roomInventory"]')?.value || 1000000);
        const roomNote = document.querySelector('[data-room-form="roomNote"]')?.value?.trim() || "";
        const nextIndex = String(country.rooms.length + 1).padStart(3, "0");
        const roomId = `${country.code.toLowerCase()}-room-${nextIndex}`;
        country.rooms.push({
          id: roomId,
          code: `${country.code}-房间${nextIndex}`,
          name: roomName,
          rtp: Number(Math.min(99, Math.max(90, roomRtp)).toFixed(2)),
          inventory: Math.max(0, roomInventory),
          note: roomNote,
          enabled: true,
          sites: [],
        });
        state.modal = null;
        state.selectedRoomId = roomId;
        showToast("房间已创建");
        renderCurrentPage();
        return;
      }

      if (action === "room-rtp-open") {
        const room = getRoomOpsRoom(country, actionTarget.dataset.roomId);
        state.modal = {
          type: "edit-room-rtp",
          roomIds: room ? [room.id] : [],
          value: room ? Number(room.rtp).toFixed(2) : "95.00",
        };
        renderCurrentPage();
        return;
      }

      if (action === "room-rtp-save") {
        const nextValue = Number(
          Math.min(99, Math.max(90, Number(document.querySelector('[data-room-form="roomRtpValue"]')?.value || 95))).toFixed(2),
        );
        (state.modal?.roomIds || []).forEach((roomId) => {
          const room = getRoomOpsRoom(country, roomId);
          if (room) room.rtp = nextValue;
        });
        state.modal = null;
        showToast("房间 RTP 已更新");
        renderCurrentPage();
        return;
      }

      if (action === "site-rtp-open") {
        state.modal = {
          type: "edit-site-rtp",
          roomId: actionTarget.dataset.roomId,
          siteId: actionTarget.dataset.siteId,
        };
        renderCurrentPage();
        return;
      }

      if (action === "site-rtp-save") {
        const modal = state.modal || {};
        const room = getRoomOpsRoom(country, modal.roomId);
        const site = room?.sites.find((item) => item.id === modal.siteId);
        if (site) {
          const raw = document.querySelector('[data-room-form="siteRtpValue"]')?.value?.trim() || "";
          site.overrideRtp = raw ? Number(Math.min(99, Math.max(90, Number(raw)))).toFixed(2) : "";
        }
        state.modal = null;
        showToast("站点 RTP 已更新");
        renderCurrentPage();
        return;
      }

      if (action === "room-assign-open") {
        state.modal = {
          type: "assign-sites",
          roomId: actionTarget.dataset.roomId,
          search: "",
          selectedSourceSiteIds: {},
          selectedTargetSiteIds: {},
        };
        renderCurrentPage();
        return;
      }

      if (action === "assign-move-in") {
        const selectedIds = Object.keys(state.modal?.selectedSourceSiteIds || {}).filter(
          (key) => state.modal.selectedSourceSiteIds[key],
        );
        const moved = moveSitesIntoRoom(country, actionTarget.dataset.roomId, selectedIds);
        state.modal = { ...state.modal, selectedSourceSiteIds: {}, selectedTargetSiteIds: {} };
        showToast(`已移入 ${moved} 个站点`);
        renderCurrentPage();
        return;
      }

      if (action === "assign-move-out") {
        const selectedIds = Object.keys(state.modal?.selectedTargetSiteIds || {}).filter(
          (key) => state.modal.selectedTargetSiteIds[key],
        );
        const moved = moveSitesOutOfRoom(country, actionTarget.dataset.roomId, selectedIds);
        state.modal = { ...state.modal, selectedSourceSiteIds: {}, selectedTargetSiteIds: {} };
        showToast(`已移出 ${moved} 个站点`);
        renderCurrentPage();
        return;
      }

      if (action === "room-delete") {
        const roomId = actionTarget.dataset.roomId;
        const roomIndex = country.rooms.findIndex((room) => room.id === roomId);
        if (roomIndex >= 0) {
          const [room] = country.rooms.splice(roomIndex, 1);
          country.unassignedSites.push(...room.sites);
          delete state.selectedRoomIds[roomId];
          delete state.expandedRooms[roomId];
          state.selectedRoomId = country.rooms[0]?.id || "";
          showToast("房间已删除，站点已回收至未分配池");
          renderCurrentPage();
        }
        return;
      }

      if (action === "room-bulk-apply") {
        const selectedRoomIds = Object.keys(state.selectedRoomIds || {}).filter((key) => state.selectedRoomIds[key]);
        if (!state.bulkAction) {
          showToast("请先选择批量操作");
          return;
        }
        if (!selectedRoomIds.length) {
          showToast("请先勾选房间");
          return;
        }
        if (state.bulkAction === "bulk-rtp") {
          state.modal = { type: "edit-room-rtp", roomIds: selectedRoomIds, value: "95.00" };
          renderCurrentPage();
          return;
        }
        if (state.bulkAction === "bulk-assign") {
          if (selectedRoomIds.length !== 1) {
            showToast("批量分配站点时请选择一个目标房间");
            return;
          }
          state.modal = {
            type: "assign-sites",
            roomId: selectedRoomIds[0],
            search: "",
            selectedSourceSiteIds: {},
            selectedTargetSiteIds: {},
          };
          renderCurrentPage();
          return;
        }
        if (state.bulkAction === "bulk-delete") {
          selectedRoomIds.forEach((roomId) => {
            const roomIndex = country.rooms.findIndex((room) => room.id === roomId);
            if (roomIndex >= 0) {
              const [room] = country.rooms.splice(roomIndex, 1);
              country.unassignedSites.push(...room.sites);
            }
          });
          state.selectedRoomIds = {};
          state.selectedRoomId = country.rooms[0]?.id || "";
          showToast("已批量删除选中房间");
          renderCurrentPage();
          return;
        }
      }

      if (action === "room-export") {
        downloadRoomOpsExport(country);
        showToast("当前国家房间与站点数据已导出");
        return;
      }
    }

    if (action === "query") {
      syncTableFiltersFromDom(page, state);
      state.page = 1;
      renderCurrentPage();
      return;
    }

    if (action === "reset") {
      resetTableState(page, state);
      renderCurrentPage();
      return;
    }

    if (action === "page-prev") {
      if (state.page > 1) {
        state.page -= 1;
        renderCurrentPage();
      }
      return;
    }

    if (action === "page-next") {
      state.page += 1;
      renderCurrentPage();
      return;
    }

    if (action === "page-number") {
      state.page = Number(actionTarget.dataset.page);
      renderCurrentPage();
      return;
    }

    if (action === "export") {
      showToast("已准备导出当前页面数据");
      return;
    }

    if (action === "form-save") {
      syncFormFromDom(page, state);
      showToast(`${page.title} 已保存`);
      return;
    }

    if (action === "form-reset") {
      resetFormState(page, state);
      renderCurrentPage();
    }
  }

  function handleRootChange(event) {
    const actionTarget = event.target;
    const pageKey = getCurrentPageKey();
    const page = pageConfigs[pageKey];

    if (page.type === "roomOps") {
      const state = getPageState(pageKey, page);

      if (actionTarget.matches("[data-room-filter]")) {
        syncRoomOpsFiltersFromDom(state);
        if (actionTarget.matches("[data-room-country]")) {
          const keyword = (state.roomFilters.countryKeyword || "").toLowerCase();
          const matched = page.opsData.countries.find(
            (item) =>
              `${item.country}/${item.code}`.toLowerCase() === keyword ||
              item.country.toLowerCase() === keyword ||
              item.code.toLowerCase() === keyword,
          );
          if (matched) {
            state.activeCountryCode = matched.code;
            state.selectedRoomId = matched.rooms[0]?.id || "";
          }
        }
        renderCurrentPage();
        return;
      }

      if (actionTarget.matches("[data-room-bulk-select]")) {
        state.bulkAction = actionTarget.value;
        return;
      }

      if (actionTarget.matches("[data-room-select-id]")) {
        state.selectedRoomIds[actionTarget.dataset.roomSelectId] = actionTarget.checked;
        return;
      }

      if (actionTarget.matches('[data-action="page-size"]')) {
        state.pageSize = Number(actionTarget.value);
        renderCurrentPage();
        return;
      }

      if (actionTarget.matches("[data-assign-side]")) {
        const side = actionTarget.dataset.assignSide;
        if (!state.modal) return;
        if (side === "source") {
          state.modal.selectedSourceSiteIds = state.modal.selectedSourceSiteIds || {};
          state.modal.selectedSourceSiteIds[actionTarget.dataset.siteId] = actionTarget.checked;
        } else {
          state.modal.selectedTargetSiteIds = state.modal.selectedTargetSiteIds || {};
          state.modal.selectedTargetSiteIds[actionTarget.dataset.siteId] = actionTarget.checked;
        }
        return;
      }

      if (actionTarget.matches("[data-room-modal-search]")) {
        state.modal = { ...(state.modal || {}), search: actionTarget.value };
        renderCurrentPage();
        return;
      }
    }

    if (actionTarget.matches("[data-room-filter]")) {
      const state = getPageState(pageKey, page);
      syncRoomOpsFiltersFromDom(state);
      renderCurrentPage();
      return;
    }

    if (actionTarget.matches('[data-action="page-size"]')) {
      const state = getPageState(pageKey, page);
      state.pageSize = Number(actionTarget.value);
      state.page = 1;
      renderCurrentPage();
    }
  }

  function buildFlightRoomOpsData() {
    function createSite(id, name, todayBet, todayProfit, online, overrideRtp = "") {
      return { id, name, todayBet, todayProfit, online, overrideRtp };
    }

    function createRoom(id, code, name, rtp, inventory, sites) {
      return { id, code, name, rtp, inventory, sites };
    }

    function createCountry(country, code, symbol, rooms, unassignedSites) {
      return { country, code, symbol, rooms, unassignedSites };
    }

    return {
      countries: [
        createCountry("印度", "INR", "₹", [
          createRoom("inr-room-001", "INR-房间001", "新手房", 95, 1000000, [
            createSite("1001", "印度站点A", 1250000, 120000, 320, "95.20"),
            createSite("1002", "印度站点B", 860000, 92000, 248),
          ]),
          createRoom("inr-room-002", "INR-房间002", "高RTP房", 96.4, 1000000, [
            createSite("1003", "印度站点C", 980000, -36000, 204, "96.90"),
            createSite("1004", "印度站点D", 760000, 54000, 196),
          ]),
        ], [createSite("1005", "印度站点E", 420000, 26000, 108)]),
        createCountry("美国", "USD", "$", [
          createRoom("usd-room-001", "USD-房间001", "标准房", 95, 1000000, [
            createSite("2001", "美国站点A", 860000, 84000, 188),
            createSite("2002", "美国站点B", 640000, -26000, 136, "94.60"),
          ]),
        ], [createSite("2003", "美国站点C", 380000, 12000, 92)]),
        createCountry("印尼", "IDR", "Rp", [
          createRoom("idr-room-001", "IDR-房间001", "标准房", 95, 1000000, [
            createSite("3001", "印尼站点A", 268000000, 22400000, 412),
          ]),
        ], [createSite("3002", "印尼站点B", 108000000, 7200000, 144)]),
        createCountry("巴西", "BRL", "R$", [
          createRoom("brl-room-001", "BRL-房间001", "促活房", 95.6, 1000000, [
            createSite("4001", "巴西站点A", 348000, 42000, 162),
          ]),
        ], [createSite("4002", "巴西站点B", 192000, 12000, 88)]),
        createCountry("泰国", "THB", "฿", [], []),
      ],
    };
  }

  if (pageConfigs["flight-room-manage"].type === "roomOps") {
    pageConfigs["flight-room-manage"].opsData = buildFlightRoomOpsData();
    pageConfigs["flight-room-manage"].defaultPageSize = 100;
    pageConfigs["flight-room-manage"].pageSizeOptions = [50, 100, 500, 1000];
  }

  function getRoomOpsCountryOptionLabel(country) {
    return `${country.country}-${country.code}`;
  }

  function getRoomOpsCountry(page, state) {
    return page.opsData.countries.find((item) => item.code === state.activeCountryCode) || null;
  }

  function getRoomOpsRoom(country, roomId) {
    return country?.rooms.find((room) => room.id === roomId) || null;
  }

  function getNextRoomSequence(country) {
    const maxIndex = (country?.rooms || []).reduce((max, room) => {
      const matched = String(room.code || room.id || "").match(/(\d{3,})$/);
      const value = matched ? Number(matched[1]) : 0;
      return Math.max(max, Number.isFinite(value) ? value : 0);
    }, 0);
    return String(maxIndex + 1).padStart(3, "0");
  }

  function getRoomOpsMetrics(room) {
    return {
      online: room.sites.reduce((sum, site) => sum + Number(site.online || 0), 0),
      todayBet: room.sites.reduce((sum, site) => sum + Number(site.todayBet || 0), 0),
      todayProfit: room.sites.reduce((sum, site) => sum + Number(site.todayProfit || 0), 0),
      siteCount: room.sites.length,
    };
  }

  function getRoomOpsSummary(country) {
    const totals = (country?.rooms || []).reduce(
      (acc, room) => {
        const metrics = getRoomOpsMetrics(room);
        acc.online += metrics.online;
        acc.inventory += Number(room.inventory || 0);
        acc.weightBase += metrics.todayBet;
        acc.weightedRtp += Number(room.rtp || 0) * metrics.todayBet;
        return acc;
      },
      { online: 0, inventory: 0, weightBase: 0, weightedRtp: 0 },
    );
    return {
      totalOnline: totals.online,
      totalInventory: totals.inventory,
      weightedRtp: totals.weightBase ? totals.weightedRtp / totals.weightBase : 0,
    };
  }

  function formatRoomOpsMoney(value, country) {
    const numeric = Number(value || 0);
    return `${numeric < 0 ? "-" : ""}${country?.symbol || ""}${formatNumber(Math.abs(numeric), 2)}`;
  }

  function formatRoomOpsPlainMoney(value) {
    const numeric = Number(value || 0);
    return `${numeric < 0 ? "-" : ""}${formatNumber(Math.abs(numeric), 2)}`;
  }

  function getRoomOpsSiteRtp(site, room) {
    return Number(site.overrideRtp || room.rtp).toFixed(2);
  }

  function getOrderedCurrencies(page, state) {
    const byCode = new Map(page.opsData.countries.map((country) => [country.code, country]));
    const ordered = (state.currencyOrder || []).map((code) => byCode.get(code)).filter(Boolean);
    page.opsData.countries.forEach((country) => {
      if (!ordered.some((item) => item.code === country.code)) ordered.push(country);
    });
    return ordered;
  }

  function renderCurrencySelector(page, state) {
    const countries = getOrderedCurrencies(page, state);
    const pendingCountry = countries.find((item) => item.code === state.pendingCountryCode) || null;
    const keyword = (state.roomFilters.countrySearch || "").trim().toLowerCase();
    const visibleCountries = countries.filter((country) => {
      if (!keyword) return true;
      return country.country.toLowerCase().includes(keyword) || country.code.toLowerCase().includes(keyword);
    });
    return `
      <section class="ops-filter-bar ops-filter-bar-compact">
        <div class="ops-country-picker">
          <label>国家/币种选择器</label>
          <button type="button" class="ops-country-trigger" data-action="country-picker-toggle">
            <span>${pendingCountry ? escapeHtml(getRoomOpsCountryOptionLabel(pendingCountry)) : "请选择国家/币种"}</span>
          </button>
          ${
            state.countryPickerOpen
              ? `
                <div class="ops-country-panel">
                  <div class="ops-country-panel-search">
                    <input
                      type="text"
                      value="${escapeHtml(state.roomFilters.countrySearch || "")}"
                      placeholder="搜索国家名 / 币种代码"
                      data-room-filter="countrySearch"
                    />
                  </div>
                  <div class="ops-country-panel-list">
                    ${
                      visibleCountries.length
                        ? visibleCountries
                            .map(
                              (country) => `
                                <button
                                  type="button"
                                  class="ops-country-option${state.pendingCountryCode === country.code ? " active" : ""}"
                                  draggable="true"
                                  data-currency-code="${escapeHtml(country.code)}"
                                  data-action="country-select"
                                  data-country-code="${escapeHtml(country.code)}"
                                >
                                  <span>${escapeHtml(getRoomOpsCountryOptionLabel(country))}</span>
                                  <em>${escapeHtml(country.symbol || "")}</em>
                                </button>
                              `,
                            )
                            .join("")
                        : `<div class="ops-room-empty">没有匹配的国家/币种</div>`
                    }
                  </div>
                  <button type="button" class="ops-country-add" data-action="country-add-open">+ 添加国家币种</button>
                </div>
              `
              : ""
          }
        </div>
        <div class="ops-filter-actions">
          <button type="button" class="primary" data-action="query">查询</button>
          <button type="button" data-action="room-reset">重置</button>
        </div>
      </section>
    `;
  }

  function renderRoomOpsSummary(country) {
    const summary = getRoomOpsSummary(country);
    return `
      <section class="ops-summary-grid">
        <article class="ops-summary-card">
          <span>当前国家</span>
          <strong>${escapeHtml(getRoomOpsCountryOptionLabel(country))}</strong>
        </article>
        <article class="ops-summary-card">
          <span>总在线人数</span>
          <strong>${formatNumber(summary.totalOnline, 2)}</strong>
        </article>
        <article class="ops-summary-card">
          <span>今日综合RTP</span>
          <strong>${summary.weightedRtp.toFixed(2)}%</strong>
        </article>
        <article class="ops-summary-card">
          <span>总库存</span>
          <strong>${formatRoomOpsMoney(summary.totalInventory, country)}</strong>
        </article>
      </section>
    `;
  }

  function renderRoomOpsToolbar(state) {
    const selectedCount = Object.keys(state.selectedRoomIds || {}).filter((key) => state.selectedRoomIds[key]).length;
    return `
      <section class="ops-toolbar ops-room-toolbar">
        <button type="button" class="primary" data-action="room-create-open">创建房间</button>
        <div class="ops-toolbar-actions">
          <button type="button" data-action="room-bulk-rtp-open">批量调整RTP</button>
          <button type="button" data-action="room-export">导出数据</button>
        </div>
        <span class="ops-toolbar-hint">已选择 ${formatNumber(selectedCount)} 个房间</span>
      </section>
    `;
  }

  function renderRoomOpsSiteTable(room, country, state) {
    const pageSize = Number(state.pageSize || 100);
    const currentPage = Math.max(1, state.roomPages?.[room.id] || 1);
    const totalPages = Math.max(1, Math.ceil(room.sites.length / pageSize));
    const page = Math.min(currentPage, totalPages);
    const sites = room.sites.slice((page - 1) * pageSize, page * pageSize);
    return `
      <div class="ops-room-site-panel">
        <div class="ops-room-site-header">
          <strong>房间绑定站点明细</strong>
          <span>${formatNumber(room.sites.length)} 条</span>
        </div>
        <div class="ops-room-site-table-wrap">
          <table class="ops-room-site-table">
            <thead>
              <tr>
                <th>站点ID</th>
                <th>站点名称</th>
                <th>当前RTP</th>
                <th>今日投注额</th>
                <th>今日盈利</th>
                <th>在线人数</th>
                <th>调整RTP</th>
              </tr>
            </thead>
            <tbody>
              ${
                sites.length
                  ? sites
                      .map((site) => {
                        const mismatch = Number(getRoomOpsSiteRtp(site, room)) !== Number(room.rtp).toFixed(2) * 1;
                        return `
                          <tr>
                            <td class="mono">${escapeHtml(site.id)}</td>
                            <td>${escapeHtml(site.name)}</td>
                            <td><span class="${mismatch ? "rtp-warning" : ""}">${getRoomOpsSiteRtp(site, room)}%</span></td>
                            <td>${formatRoomOpsMoney(site.todayBet, country)}</td>
                            <td class="${site.todayProfit >= 0 ? "profit-up" : "profit-down"}">${formatRoomOpsMoney(site.todayProfit, country)}</td>
                            <td>${formatNumber(site.online, 2)}</td>
                            <td><button type="button" data-action="site-rtp-open" data-room-id="${room.id}" data-site-id="${site.id}">调整RTP</button></td>
                          </tr>
                        `;
                      })
                      .join("")
                  : `<tr><td colspan="7" class="ops-room-empty">当前房间暂无绑定站点</td></tr>`
              }
            </tbody>
          </table>
        </div>
        <div class="pagination-bar room-ops-pagination">
          <div class="page-size-select">
            <span>每页</span>
            <select data-action="page-size">
              ${(pageConfigs["flight-room-manage"].pageSizeOptions || [])
                .map((option) => `<option value="${option}"${pageSize === option ? " selected" : ""}>${option}</option>`)
                .join("")}
            </select>
          </div>
          <div class="pager">
            <button class="pager-btn" type="button" data-action="room-page" data-room-id="${room.id}" data-page="${Math.max(page - 1, 1)}"${
              page <= 1 ? " disabled" : ""
            }>上一页</button>
            <span class="pager-summary">${page} / ${totalPages}</span>
            <button class="pager-btn" type="button" data-action="room-page" data-room-id="${room.id}" data-page="${Math.min(page + 1, totalPages)}"${
              page >= totalPages ? " disabled" : ""
            }>下一页</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderRoomOpsCards(country, state) {
    return country.rooms
      .map((room) => {
        const metrics = getRoomOpsMetrics(room);
        const expanded = state.expandedRooms?.[room.id];
        return `
          <article class="ops-room-card light${state.selectedRoomId === room.id ? " active" : ""}">
            <div class="ops-room-card-top">
              <label class="ops-room-check">
                <input type="checkbox" ${state.selectedRoomIds?.[room.id] ? "checked" : ""} data-room-select-id="${room.id}" />
                <span></span>
              </label>
              <div class="ops-room-heading" data-action="room-expand" data-room-id="${room.id}">
                <strong>${escapeHtml(room.name)}</strong>
                <span>${escapeHtml(room.code)}</span>
              </div>
              <div class="ops-room-card-actions inline">
                <button type="button" data-action="room-rtp-open" data-room-id="${room.id}">调整RTP</button>
                <button type="button" data-action="room-assign-open" data-room-id="${room.id}">分配站点</button>
                <button type="button" class="danger" data-action="room-delete" data-room-id="${room.id}">删除</button>
              </div>
            </div>
            <div class="ops-room-metrics-grid room-card-metrics-5">
              <div><span>房间RTP</span><strong>${Number(room.rtp).toFixed(2)}%</strong></div>
              <div><span>在线人数</span><strong>${formatNumber(metrics.online, 2)}</strong></div>
              <div><span>房间库存</span><strong>${formatRoomOpsMoney(room.inventory, country)}</strong></div>
              <div><span>绑定站点数</span><strong>${formatNumber(metrics.siteCount, 2)}</strong></div>
              <div><span>累计投注额</span><strong>${formatRoomOpsMoney(metrics.todayBet, country)}</strong></div>
            </div>
            ${expanded ? renderRoomOpsSiteTable(room, country, state) : ""}
          </article>
        `;
      })
      .join("");
  }

  function renderRoomOpsAssignModal(state, country, room) {
    const modal = state.modal || {};
    const query = (modal.search || "").trim().toLowerCase();
    const sourcePool = country.rooms
      .filter((item) => item.id !== room.id)
      .flatMap((item) => item.sites.map((site) => ({ ...site, sourceRoomCode: item.code })))
      .concat(country.unassignedSites.map((site) => ({ ...site, sourceRoomCode: "未分配" })));
    const sourceSites = sourcePool.filter((site) => !query || site.id.toLowerCase().includes(query) || site.name.toLowerCase().includes(query));
    const targetSites = room.sites.filter((site) => !query || site.id.toLowerCase().includes(query) || site.name.toLowerCase().includes(query));
    return `
      <div class="ops-modal-backdrop">
        <div class="ops-modal ops-modal-wide">
          <div class="ops-modal-head">
            <div>
              <h2>分配站点</h2>
              <p>${escapeHtml(room.name)} / ${escapeHtml(room.code)}</p>
            </div>
            <button type="button" data-action="room-modal-close">关闭</button>
          </div>
          <div class="ops-modal-note">同一站点仅能归属一个房间；移入后默认继承所属房间 RTP。</div>
          <div class="ops-transfer-search">
            <input type="text" value="${escapeHtml(modal.search || "")}" placeholder="按站点ID / 名称搜索" data-room-modal-search />
          </div>
          <div class="ops-transfer-layout">
            <section class="ops-transfer-panel">
              <header>可分配站点</header>
              <div class="ops-transfer-list">
                ${
                  sourceSites.length
                    ? sourceSites
                        .map(
                          (site) => `
                            <label class="ops-transfer-item">
                              <input type="checkbox" data-assign-side="source" data-site-id="${site.id}" ${
                                state.modal?.selectedSourceSiteIds?.[site.id] ? "checked" : ""
                              } />
                              <span>
                                <strong>${escapeHtml(site.id)} / ${escapeHtml(site.name)}</strong>
                                <em>${escapeHtml(site.sourceRoomCode)} · ${formatRoomOpsMoney(site.todayBet, country)}</em>
                              </span>
                            </label>
                          `,
                        )
                        .join("")
                    : `<div class="ops-room-empty">没有可分配站点</div>`
                }
              </div>
            </section>
            <div class="ops-transfer-actions">
              <button type="button" data-action="assign-move-in" data-room-id="${room.id}">移入</button>
              <button type="button" data-action="assign-move-out" data-room-id="${room.id}">移出</button>
            </div>
            <section class="ops-transfer-panel">
              <header>当前房间站点</header>
              <div class="ops-transfer-list">
                ${
                  targetSites.length
                    ? targetSites
                        .map(
                          (site) => `
                            <label class="ops-transfer-item">
                              <input type="checkbox" data-assign-side="target" data-site-id="${site.id}" ${
                                state.modal?.selectedTargetSiteIds?.[site.id] ? "checked" : ""
                              } />
                              <span>
                                <strong>${escapeHtml(site.id)} / ${escapeHtml(site.name)}</strong>
                                <em>${getRoomOpsSiteRtp(site, room)}% · ${formatRoomOpsMoney(site.todayBet, country)}</em>
                              </span>
                            </label>
                          `,
                        )
                        .join("")
                    : `<div class="ops-room-empty">当前房间暂无站点</div>`
                }
              </div>
            </section>
          </div>
        </div>
      </div>
    `;
  }

  function renderRoomOpsModal(page, state, country) {
    const modal = state.modal || null;
    if (!modal) return "";
    if (modal.type === "create-room") {
      const nextIndex = String((country?.rooms.length || 0) + 1).padStart(3, "0");
      return `
        <div class="ops-modal-backdrop">
          <div class="ops-modal">
            <div class="ops-modal-head">
              <h2>创建房间</h2>
              <button type="button" data-action="room-modal-close">关闭</button>
            </div>
            <div class="ops-modal-field">
              <span>房间名称</span>
              <input type="text" value="${escapeHtml(modal.roomName || `${country.code}-房间${nextIndex}`)}" data-room-form="roomName" />
            </div>
            <div class="ops-modal-grid">
              <label class="ops-modal-field">
                <span>房间RTP</span>
                <input type="number" min="90" max="99" step="0.01" value="${escapeHtml(modal.roomRtp || "95.00")}" data-room-form="roomRtp" />
              </label>
              <label class="ops-modal-field">
                <span>初始库存</span>
                <input type="number" min="0" step="0.01" value="${escapeHtml(modal.roomInventory || "1000000.00")}" data-room-form="roomInventory" />
              </label>
            </div>
            <div class="ops-modal-actions">
              <button type="button" data-action="room-modal-close">取消</button>
              <button type="button" class="primary" data-action="room-create-submit">确认创建</button>
            </div>
          </div>
        </div>
      `;
    }
    if (modal.type === "edit-room-rtp") {
      return `
        <div class="ops-modal-backdrop">
          <div class="ops-modal">
            <div class="ops-modal-head">
              <h2>${modal.roomIds?.length > 1 ? "批量调整RTP" : "调整房间RTP"}</h2>
              <button type="button" data-action="room-modal-close">关闭</button>
            </div>
            <div class="ops-modal-field">
              <span>RTP 范围 90%-99%</span>
              <input type="number" min="90" max="99" step="0.01" value="${escapeHtml(modal.value || "95.00")}" data-room-form="roomRtpValue" />
            </div>
            <div class="ops-modal-actions">
              <button type="button" data-action="room-modal-close">取消</button>
              <button type="button" class="primary" data-action="room-rtp-save">确认调整</button>
            </div>
          </div>
        </div>
      `;
    }
    if (modal.type === "edit-site-rtp") {
      const room = getRoomOpsRoom(country, modal.roomId);
      const site = room?.sites.find((item) => item.id === modal.siteId);
      return `
        <div class="ops-modal-backdrop">
          <div class="ops-modal">
            <div class="ops-modal-head">
              <h2>调整站点RTP</h2>
              <button type="button" data-action="room-modal-close">关闭</button>
            </div>
            <div class="ops-modal-note">站点单独 RTP 优先级高于房间 RTP；留空则恢复继承房间 RTP。</div>
            <div class="ops-modal-field">
              <span>${escapeHtml(site?.id || "")} / ${escapeHtml(site?.name || "")}</span>
              <input type="number" min="90" max="99" step="0.01" value="${escapeHtml(modal.value || site?.overrideRtp || "")}" data-room-form="siteRtpValue" />
            </div>
            <div class="ops-modal-actions">
              <button type="button" data-action="room-modal-close">取消</button>
              <button type="button" class="primary" data-action="site-rtp-save">确认调整</button>
            </div>
          </div>
        </div>
      `;
    }
    if (modal.type === "move-site") {
      const fromRoom = getRoomOpsRoom(country, modal.roomId);
      const site = fromRoom?.sites.find((item) => item.id === modal.siteId);
      const targetRooms = (country?.rooms || []).filter((room) => room.id !== modal.roomId);
      return `
        <div class="ops-modal-backdrop">
          <div class="ops-modal">
            <div class="ops-modal-head">
              <h2>${roomOpsText.moveSiteTitle}</h2>
              <button type="button" data-action="room-modal-close">${roomOpsText.close}</button>
            </div>
            <div class="ops-modal-note">${escapeHtml(site?.merchantId || "")} / ${escapeHtml(site?.id || "")} / ${escapeHtml(site?.name || "")}</div>
            <div class="ops-modal-field">
              <span>${roomOpsText.targetRoom}</span>
              <select data-room-form="targetRoomId">
                <option value="">${roomOpsText.targetRoom}</option>
                ${targetRooms
                  .map(
                    (room) =>
                      `<option value="${room.id}"${modal.targetRoomId === room.id ? " selected" : ""}>${escapeHtml(room.name)} / ${escapeHtml(room.code)}</option>`,
                  )
                  .join("")}
              </select>
            </div>
            ${
              targetRooms.length
                ? ""
                : `<div class="ops-modal-note">${roomOpsText.noTargetRooms}</div>`
            }
            <div class="ops-modal-actions">
              <button type="button" data-action="room-modal-close">${roomOpsText.cancel}</button>
              <button type="button" class="primary" data-action="site-move-save"${targetRooms.length ? "" : " disabled"}>${roomOpsText.confirmAdjust}</button>
            </div>
          </div>
        </div>
      `;
    }
    if (modal.type === "move-site") {
      const sourceRoom = getRoomOpsRoom(country, modal.roomId);
      const site = sourceRoom?.sites.find((item) => item.id === modal.siteId);
      const targetRooms = (country?.rooms || []).filter((room) => room.id !== modal.roomId);
      return `
        <div class="ops-modal-backdrop">
          <div class="ops-modal">
            <div class="ops-modal-head">
              <h2>${roomOpsText.moveSiteTitle}</h2>
              <button type="button" data-action="room-modal-close">${roomOpsText.close}</button>
            </div>
            <div class="ops-modal-note">
              ${escapeHtml(site?.merchantId || "")} / ${escapeHtml(site?.id || "")} / ${escapeHtml(site?.name || "")}
            </div>
            <label class="ops-modal-field">
              <span>${roomOpsText.targetRoom}</span>
              <select data-room-form="targetRoomId">
                <option value="">${roomOpsText.targetRoom}</option>
                ${targetRooms
                  .map(
                    (room) => `
                      <option value="${room.id}"${modal.targetRoomId === room.id ? " selected" : ""}>
                        ${escapeHtml(room.name)} / ${escapeHtml(room.code)}
                      </option>
                    `,
                  )
                  .join("")}
              </select>
            </label>
            ${
              targetRooms.length
                ? ""
                : `<div class="ops-modal-note">${roomOpsText.noTargetRooms}</div>`
            }
            <div class="ops-modal-actions">
              <button type="button" data-action="room-modal-close">${roomOpsText.cancel}</button>
              <button type="button" class="primary" data-action="site-move-save"${targetRooms.length ? "" : " disabled"}>${roomOpsText.moveSite}</button>
            </div>
          </div>
        </div>
      `;
    }
    if (modal.type === "assign-sites") {
      const room = getRoomOpsRoom(country, modal.roomId);
      return room ? renderRoomOpsAssignModal(state, country, room) : "";
    }
    if (modal.type === "add-country") {
      return `
        <div class="ops-modal-backdrop">
          <div class="ops-modal">
            <div class="ops-modal-head">
              <h2>添加国家币种</h2>
              <button type="button" data-action="room-modal-close">关闭</button>
            </div>
            <div class="ops-modal-field">
              <span>国家名称</span>
              <input type="text" value="${escapeHtml(modal.countryName || "")}" data-room-form="countryName" />
            </div>
            <div class="ops-modal-grid">
              <label class="ops-modal-field">
                <span>3位大写币种代码</span>
                <input type="text" value="${escapeHtml(modal.countryCode || "")}" maxlength="3" data-room-form="countryCode" />
              </label>
              <label class="ops-modal-field">
                <span>币种符号</span>
                <input type="text" value="${escapeHtml(modal.countrySymbol || "")}" data-room-form="countrySymbol" />
              </label>
            </div>
            <div class="ops-modal-actions">
              <button type="button" data-action="room-modal-close">取消</button>
              <button type="button" class="primary" data-action="country-add-submit">确认添加</button>
            </div>
          </div>
        </div>
      `;
    }
    return "";
  }

  function renderFlightRoomOpsPage(page, state) {
    const country = getRoomOpsCountry(page, state);
    if (country && !state.selectedRoomId && country.rooms[0]) state.selectedRoomId = country.rooms[0].id;
    return `
      <section class="room-ops-page room-ops-page-light">
        <div class="page-heading room-ops-heading">
          <h1 class="page-title">${escapeHtml(page.title)}</h1>
          <div class="page-subtitle">${escapeHtml(page.section)} / ${escapeHtml(page.title)}</div>
        </div>
        ${renderCurrencySelector(page, state)}
        ${
          !country
            ? `<div class="ops-empty-state">请先选择国家/币种查看对应房间数据</div>`
            : `
              ${renderRoomOpsSummary(country)}
              ${renderRoomOpsToolbar(state)}
              ${
                country.rooms.length
                  ? `<section class="ops-room-list-grid">${renderRoomOpsCards(country, state)}</section>`
                  : `<div class="ops-empty-state">当前国家暂无房间，请点击上方「创建房间」按钮添加</div>`
              }
              ${renderRoomOpsModal(page, state, country)}
            `
        }
      </section>
    `;
  }

  function downloadRoomOpsExport(country) {
    const rows = [["国家", "币种", "房间名称", "房间RTP", "站点ID", "站点名称", "当前RTP", "今日投注额", "今日盈利", "在线人数"]];
    country.rooms.forEach((room) => {
      room.sites.forEach((site) => {
        rows.push([
          country.country,
          country.code,
          room.name,
          `${Number(room.rtp).toFixed(2)}%`,
          site.id,
          site.name,
          `${getRoomOpsSiteRtp(site, room)}%`,
          formatRoomOpsMoney(site.todayBet, country),
          formatRoomOpsMoney(site.todayProfit, country),
          formatNumber(site.online, 2),
        ]);
      });
    });
    const csv = `\uFEFF${rows.map((row) => row.join(",")).join("\n")}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `plane-room-management-${country.code}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 300);
  }

  function takeRoomOpsSite(country, siteId) {
    const unassignedIndex = country.unassignedSites.findIndex((site) => site.id === siteId);
    if (unassignedIndex >= 0) return country.unassignedSites.splice(unassignedIndex, 1)[0];
    for (const room of country.rooms) {
      const index = room.sites.findIndex((site) => site.id === siteId);
      if (index >= 0) return room.sites.splice(index, 1)[0];
    }
    return null;
  }

  function moveSitesIntoRoom(country, roomId, siteIds) {
    const room = getRoomOpsRoom(country, roomId);
    if (!room) return 0;
    let moved = 0;
    siteIds.forEach((siteId) => {
      const site = takeRoomOpsSite(country, siteId);
      if (site) {
        room.sites.push(site);
        moved += 1;
      }
    });
    room.sites.sort((a, b) => a.id.localeCompare(b.id));
    return moved;
  }

  function moveSitesOutOfRoom(country, roomId, siteIds) {
    const room = getRoomOpsRoom(country, roomId);
    if (!room) return 0;
    let moved = 0;
    siteIds.forEach((siteId) => {
      const index = room.sites.findIndex((site) => site.id === siteId);
      if (index >= 0) {
        country.unassignedSites.push(room.sites.splice(index, 1)[0]);
        moved += 1;
      }
    });
    country.unassignedSites.sort((a, b) => a.id.localeCompare(b.id));
    return moved;
  }

  function handleRootDrop(event) {
    const targetChip = event.target.closest("[data-currency-code]");
    if (!targetChip) return;
    event.preventDefault();
    const pageKey = getCurrentPageKey();
    const page = pageConfigs[pageKey];
    if (page.type !== "roomOps") return;
    const state = getPageState(pageKey, page);
    const sourceCode = event.dataTransfer.getData("text/plain");
    const targetCode = targetChip.dataset.currencyCode;
    if (!sourceCode || !targetCode || sourceCode === targetCode) return;
    const orderedCodes = getOrderedCurrencies(page, state).map((country) => country.code);
    const nextOrder = orderedCodes.filter((code) => code !== sourceCode);
    const targetIndex = nextOrder.indexOf(targetCode);
    nextOrder.splice(Math.max(targetIndex, 0), 0, sourceCode);
    state.currencyOrder = nextOrder;
    persistRoomOpsCountryOrder(nextOrder);
    renderCurrentPage();
  }

  function handleRootClick(event) {
    const actionTarget = event.target.closest("[data-action]");
    if (!actionTarget) return;
    const pageKey = getCurrentPageKey();
    const page = pageConfigs[pageKey];
    const state = getPageState(pageKey, page);
    const action = actionTarget.dataset.action;

    if (page.type === "roomOps") {
      const country = getRoomOpsCountry(page, state);

      if (action === "country-picker-toggle") {
        state.countryPickerOpen = !state.countryPickerOpen;
        renderCurrentPage();
        return;
      }

      if (action === "country-select") {
        state.pendingCountryCode = actionTarget.dataset.countryCode;
        const selected = page.opsData.countries.find((item) => item.code === state.pendingCountryCode);
        state.roomFilters.countryKeyword = selected ? getRoomOpsCountryOptionLabel(selected) : "";
        renderCurrentPage();
        return;
      }

      if (action === "country-add-open") {
        state.modal = { type: "add-country" };
        renderCurrentPage();
        return;
      }

      if (action === "query") {
        state.activeCountryCode = state.pendingCountryCode;
        state.selectedRoomId = getRoomOpsCountry(page, state)?.rooms[0]?.id || "";
        state.countryPickerOpen = false;
        renderCurrentPage();
        return;
      }

      if (action === "room-reset") {
        state.activeCountryCode = "";
        state.pendingCountryCode = "";
        state.selectedRoomId = "";
        state.roomFilters.countryKeyword = "";
        state.roomFilters.countrySearch = "";
        state.expandedRooms = {};
        state.selectedRoomIds = {};
        state.countryPickerOpen = false;
        renderCurrentPage();
        return;
      }

      if (action === "room-expand") {
        const roomId = actionTarget.dataset.roomId;
        state.selectedRoomId = roomId;
        state.expandedRooms[roomId] = !state.expandedRooms[roomId];
        renderCurrentPage();
        return;
      }

      if (action === "room-page") {
        state.roomPages[actionTarget.dataset.roomId] = Number(actionTarget.dataset.page || 1);
        renderCurrentPage();
        return;
      }

      if (action === "room-create-open" && country) {
        state.modal = { type: "create-room" };
        renderCurrentPage();
        return;
      }

      if (action === "room-modal-close") {
        state.modal = null;
        renderCurrentPage();
        return;
      }

      if (action === "country-add-submit") {
        const countryName = (document.querySelector('[data-room-form="countryName"]')?.value || "").trim();
        const countryCode = ((document.querySelector('[data-room-form="countryCode"]')?.value || "").trim()).toUpperCase();
        const countrySymbol = (document.querySelector('[data-room-form="countrySymbol"]')?.value || "").trim();
        if (!countryName || !/^[A-Z]{3}$/.test(countryCode)) {
          showToast("请填写国家名称和3位大写币种代码");
          return;
        }
        if (!window.confirm(`确认添加国家币种 ${countryName}-${countryCode} 吗？`)) return;
        page.opsData.countries.push({ country: countryName, code: countryCode, symbol: countrySymbol, rooms: [], unassignedSites: [] });
        state.currencyOrder = [...state.currencyOrder, countryCode];
        persistRoomOpsCountryOrder(state.currencyOrder);
        state.pendingCountryCode = countryCode;
        state.roomFilters.countryKeyword = `${countryName}-${countryCode}`;
        state.modal = null;
        state.countryPickerOpen = true;
        showToast("国家币种已添加");
        renderCurrentPage();
        return;
      }

      if (action === "room-create-submit" && country) {
        if (!window.confirm("确认创建该房间吗？")) return;
        const roomName = (document.querySelector('[data-room-form="roomName"]')?.value || "").trim() || `${country.code}-房间001`;
        const roomRtp = Number(document.querySelector('[data-room-form="roomRtp"]')?.value || 95);
        const roomInventory = Number(document.querySelector('[data-room-form="roomInventory"]')?.value || 1000000);
        const nextIndex = String(country.rooms.length + 1).padStart(3, "0");
        const roomId = `${country.code.toLowerCase()}-room-${nextIndex}`;
        country.rooms.push({
          id: roomId,
          code: `${country.code}-房间${nextIndex}`,
          name: roomName,
          rtp: Number(Math.min(99, Math.max(90, roomRtp)).toFixed(2)),
          inventory: Number(Math.max(0, roomInventory).toFixed(2)),
          sites: [],
        });
        state.modal = null;
        state.selectedRoomId = roomId;
        showToast("房间已创建");
        renderCurrentPage();
        return;
      }

      if (action === "room-rtp-open" && country) {
        const room = getRoomOpsRoom(country, actionTarget.dataset.roomId);
        state.modal = { type: "edit-room-rtp", roomIds: room ? [room.id] : [], value: room ? Number(room.rtp).toFixed(2) : "95.00" };
        renderCurrentPage();
        return;
      }

      if (action === "room-bulk-rtp-open" && country) {
        const selectedRoomIds = Object.keys(state.selectedRoomIds || {}).filter((key) => state.selectedRoomIds[key]);
        if (!selectedRoomIds.length) {
          showToast("请先勾选房间");
          return;
        }
        state.modal = { type: "edit-room-rtp", roomIds: selectedRoomIds, value: "95.00" };
        renderCurrentPage();
        return;
      }

      if (action === "room-rtp-save" && country) {
        if (!window.confirm("确认调整选中房间RTP吗？")) return;
        const nextValue = Number(Math.min(99, Math.max(90, Number(document.querySelector('[data-room-form="roomRtpValue"]')?.value || 95))).toFixed(2));
        (state.modal?.roomIds || []).forEach((roomId) => {
          const room = getRoomOpsRoom(country, roomId);
          if (room) room.rtp = nextValue;
        });
        state.modal = null;
        showToast("房间RTP已更新");
        renderCurrentPage();
        return;
      }

      if (action === "site-rtp-open") {
        state.modal = { type: "edit-site-rtp", roomId: actionTarget.dataset.roomId, siteId: actionTarget.dataset.siteId };
        renderCurrentPage();
        return;
      }

      if (action === "site-move-open" && country) {
        state.modal = { type: "move-site", roomId: actionTarget.dataset.roomId, siteId: actionTarget.dataset.siteId, targetRoomId: "" };
        renderCurrentPage();
        return;
      }

      if (action === "site-rtp-save" && country) {
        if (!window.confirm("确认调整该站点RTP吗？")) return;
        const modal = state.modal || {};
        const room = getRoomOpsRoom(country, modal.roomId);
        const site = room?.sites.find((item) => item.id === modal.siteId);
        if (site) {
          const raw = (document.querySelector('[data-room-form="siteRtpValue"]')?.value || "").trim();
          site.overrideRtp = raw ? Number(Math.min(99, Math.max(90, Number(raw)))).toFixed(2) : "";
        }
        state.modal = null;
        showToast("站点RTP已更新");
        renderCurrentPage();
        return;
      }

      if (action === "room-assign-open" && country) {
        state.modal = { type: "assign-sites", roomId: actionTarget.dataset.roomId, search: "", selectedSourceSiteIds: {}, selectedTargetSiteIds: {} };
        renderCurrentPage();
        return;
      }

      if (action === "assign-move-in" && country) {
        const selectedIds = Object.keys(state.modal?.selectedSourceSiteIds || {}).filter((key) => state.modal.selectedSourceSiteIds[key]);
        if (!selectedIds.length) {
          showToast("请先选择站点");
          return;
        }
        if (!window.confirm(`确认移入 ${selectedIds.length} 个站点吗？`)) return;
        const moved = moveSitesIntoRoom(country, actionTarget.dataset.roomId, selectedIds);
        state.modal = { ...state.modal, selectedSourceSiteIds: {}, selectedTargetSiteIds: {} };
        showToast(`已移入 ${moved} 个站点`);
        renderCurrentPage();
        return;
      }

      if (action === "assign-move-out" && country) {
        const selectedIds = Object.keys(state.modal?.selectedTargetSiteIds || {}).filter((key) => state.modal.selectedTargetSiteIds[key]);
        if (!selectedIds.length) {
          showToast("请先选择站点");
          return;
        }
        if (!window.confirm(`确认移出 ${selectedIds.length} 个站点吗？`)) return;
        const moved = moveSitesOutOfRoom(country, actionTarget.dataset.roomId, selectedIds);
        state.modal = { ...state.modal, selectedSourceSiteIds: {}, selectedTargetSiteIds: {} };
        showToast(`已移出 ${moved} 个站点`);
        renderCurrentPage();
        return;
      }

      if (action === "room-delete" && country) {
        if (!window.confirm("确认删除该房间并解绑其下所有站点吗？")) return;
        const roomId = actionTarget.dataset.roomId;
        const roomIndex = country.rooms.findIndex((room) => room.id === roomId);
        if (roomIndex >= 0) {
          const [room] = country.rooms.splice(roomIndex, 1);
          country.unassignedSites.push(...room.sites);
          delete state.selectedRoomIds[roomId];
          delete state.expandedRooms[roomId];
          if (state.selectedRoomId === roomId) state.selectedRoomId = country.rooms[0]?.id || "";
          showToast("房间已删除，站点已解绑");
          renderCurrentPage();
        }
        return;
      }

      if (action === "room-export" && country) {
        if (!window.confirm(`确认导出 ${getRoomOpsCountryOptionLabel(country)} 的房间数据吗？`)) return;
        downloadRoomOpsExport(country);
        showToast("导出完成");
        return;
      }
    }
  }

  function handleRootChange(event) {
    const actionTarget = event.target;
    const pageKey = getCurrentPageKey();
    const page = pageConfigs[pageKey];
    if (page.type === "merchantCreate") {
      const state = getPageState(pageKey, page);
      if (actionTarget.matches('[data-action="page-size"]')) {
        state.pageSize = Number(actionTarget.value);
        state.page = 1;
        renderCurrentPage();
      }
      return;
    }
    if (page.type !== "roomOps") return;
    const state = getPageState(pageKey, page);

    if (actionTarget.matches("[data-room-filter]")) {
      syncRoomOpsFiltersFromDom(state);
      renderCurrentPage();
      return;
    }

    if (actionTarget.matches("[data-room-select-id]")) {
      state.selectedRoomIds[actionTarget.dataset.roomSelectId] = actionTarget.checked;
      return;
    }

    if (actionTarget.matches('[data-action="page-size"]')) {
      state.pageSize = Number(actionTarget.value);
      renderCurrentPage();
      return;
    }

    if (actionTarget.matches("[data-assign-side]")) {
      if (!state.modal) return;
      if (actionTarget.dataset.assignSide === "source") {
        state.modal.selectedSourceSiteIds = state.modal.selectedSourceSiteIds || {};
        state.modal.selectedSourceSiteIds[actionTarget.dataset.siteId] = actionTarget.checked;
      } else {
        state.modal.selectedTargetSiteIds = state.modal.selectedTargetSiteIds || {};
        state.modal.selectedTargetSiteIds[actionTarget.dataset.siteId] = actionTarget.checked;
      }
      return;
    }

    if (actionTarget.matches("[data-room-modal-search]")) {
      state.modal = { ...(state.modal || {}), search: actionTarget.value };
      renderCurrentPage();
    }
  }

  function renderCurrencySelector(page, state) {
    const countries = getOrderedCurrencies(page, state);
    const pendingCountry = countries.find((item) => item.code === state.pendingCountryCode) || null;
    const keyword = (state.roomFilters.countrySearch || "").trim().toLowerCase();
    const visibleCountries = countries.filter((country) => {
      if (!keyword) return true;
      return country.country.toLowerCase().includes(keyword) || country.code.toLowerCase().includes(keyword);
    });
    return `
      <section class="ops-filter-bar ops-filter-bar-compact">
        <div class="ops-country-picker">
          <label>国家/币种</label>
          <button type="button" class="ops-country-trigger" data-action="country-picker-toggle">
            <span>${pendingCountry ? escapeHtml(getRoomOpsCountryOptionLabel(pendingCountry)) : "请选择国家/币种"}</span>
            <em>${pendingCountry ? escapeHtml(pendingCountry.symbol || "") : ""}</em>
          </button>
          ${
            state.countryPickerOpen
              ? `
                <div class="ops-country-panel">
                  <div class="ops-country-panel-search">
                    <input
                      type="text"
                      value="${escapeHtml(state.roomFilters.countrySearch || "")}"
                      placeholder="搜索国家名称 / 币种代码"
                      data-room-filter="countrySearch"
                    />
                  </div>
                  <div class="ops-country-panel-list">
                    ${
                      visibleCountries.length
                        ? visibleCountries
                            .map(
                              (country) => `
                                <button
                                  type="button"
                                  class="ops-country-option${state.pendingCountryCode === country.code ? " active" : ""}"
                                  draggable="true"
                                  data-currency-code="${escapeHtml(country.code)}"
                                  data-action="country-select"
                                  data-country-code="${escapeHtml(country.code)}"
                                >
                                  <span>${escapeHtml(getRoomOpsCountryOptionLabel(country))}</span>
                                  <em>${escapeHtml(country.symbol || "")}</em>
                                </button>
                              `,
                            )
                            .join("")
                        : `<div class="ops-room-empty">没有匹配的国家/币种</div>`
                    }
                  </div>
                  <button type="button" class="ops-country-add" data-action="country-add-open">+ 添加国家币种</button>
                </div>
              `
              : ""
          }
        </div>
        <div class="ops-filter-actions">
          <button type="button" class="primary" data-action="query">查询</button>
          <button type="button" data-action="room-reset">重置</button>
        </div>
      </section>
    `;
  }

  function renderRoomOpsSummary(country) {
    const summary = getRoomOpsSummary(country);
    return `
      <section class="ops-summary-grid">
        <article class="ops-summary-card">
          <span>当前国家</span>
          <strong>${escapeHtml(getRoomOpsCountryOptionLabel(country))}</strong>
        </article>
        <article class="ops-summary-card">
          <span>总在线人数</span>
          <strong>${formatNumber(summary.totalOnline, 2)}</strong>
        </article>
        <article class="ops-summary-card">
          <span>今日综合RTP</span>
          <strong>${summary.weightedRtp.toFixed(2)}%</strong>
        </article>
        <article class="ops-summary-card">
          <span>总库存</span>
          <strong>${formatRoomOpsMoney(summary.totalInventory, country)}</strong>
        </article>
      </section>
    `;
  }

  function renderRoomOpsToolbar(state) {
    const selectedCount = Object.keys(state.selectedRoomIds || {}).filter((key) => state.selectedRoomIds[key]).length;
    return `
      <section class="ops-toolbar ops-room-toolbar">
        <button type="button" class="primary" data-action="room-create-open">创建房间</button>
        <div class="ops-toolbar-actions">
          <button type="button" data-action="room-bulk-rtp-open">批量调整RTP</button>
          <button type="button" data-action="room-export">导出数据</button>
        </div>
        <span class="ops-toolbar-hint">已选择 ${formatNumber(selectedCount)} 个房间</span>
      </section>
    `;
  }

  function renderRoomOpsSiteTable(room, country, state) {
    const pageSize = Number(state.pageSize || 100);
    const currentPage = Math.max(1, state.roomPages?.[room.id] || 1);
    const totalPages = Math.max(1, Math.ceil(room.sites.length / pageSize));
    const page = Math.min(currentPage, totalPages);
    const sites = room.sites.slice((page - 1) * pageSize, page * pageSize);
    return `
      <div class="ops-room-site-panel">
        <div class="ops-room-site-header">
          <strong>房间绑定站点明细</strong>
          <span>${formatNumber(room.sites.length)} 条</span>
        </div>
        <div class="ops-room-site-table-wrap">
          <table class="ops-room-site-table">
            <thead>
              <tr>
                <th>站点ID</th>
                <th>站点名称</th>
                <th>当前RTP</th>
                <th>今日投注额</th>
                <th>今日盈利</th>
                <th>在线人数</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              ${
                sites.length
                  ? sites
                      .map((site) => {
                        const mismatch = Number(getRoomOpsSiteRtp(site, room)) !== Number(Number(room.rtp).toFixed(2));
                        return `
                          <tr>
                            <td class="mono">${escapeHtml(site.id)}</td>
                            <td>${escapeHtml(site.name)}</td>
                            <td><span class="${mismatch ? "rtp-warning" : ""}">${getRoomOpsSiteRtp(site, room)}%</span></td>
                            <td>${formatRoomOpsMoney(site.todayBet, country)}</td>
                            <td class="${site.todayProfit >= 0 ? "profit-up" : "profit-down"}">${formatRoomOpsMoney(site.todayProfit, country)}</td>
                            <td>${formatNumber(site.online, 2)}</td>
                            <td><button type="button" data-action="site-rtp-open" data-room-id="${room.id}" data-site-id="${site.id}">调整RTP</button></td>
                          </tr>
                        `;
                      })
                      .join("")
                  : `<tr><td colspan="7" class="ops-room-empty">当前房间暂无绑定站点</td></tr>`
              }
            </tbody>
          </table>
        </div>
        <div class="pagination-bar room-ops-pagination">
          <div class="page-size-select">
            <span>每页</span>
            <select data-action="page-size">
              ${(pageConfigs["flight-room-manage"].pageSizeOptions || [])
                .map((option) => `<option value="${option}"${pageSize === option ? " selected" : ""}>${option}</option>`)
                .join("")}
            </select>
          </div>
          <div class="pager">
            <button class="pager-btn" type="button" data-action="room-page" data-room-id="${room.id}" data-page="${Math.max(page - 1, 1)}"${
              page <= 1 ? " disabled" : ""
            }>上一页</button>
            <span class="pager-summary">${page} / ${totalPages}</span>
            <button class="pager-btn" type="button" data-action="room-page" data-room-id="${room.id}" data-page="${Math.min(page + 1, totalPages)}"${
              page >= totalPages ? " disabled" : ""
            }>下一页</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderRoomOpsCards(country, state) {
    return country.rooms
      .map((room) => {
        const metrics = getRoomOpsMetrics(room);
        const expanded = state.expandedRooms?.[room.id];
        return `
          <article class="ops-room-card light${state.selectedRoomId === room.id ? " active" : ""}">
            <div class="ops-room-card-top">
              <label class="ops-room-check">
                <input type="checkbox" ${state.selectedRoomIds?.[room.id] ? "checked" : ""} data-room-select-id="${room.id}" />
                <span></span>
              </label>
              <div class="ops-room-heading" data-action="room-expand" data-room-id="${room.id}">
                <strong>${escapeHtml(room.name)}</strong>
                <span>${escapeHtml(room.code)}</span>
              </div>
              <div class="ops-room-card-actions inline">
                <button type="button" data-action="room-rtp-open" data-room-id="${room.id}">调整RTP</button>
                <button type="button" data-action="room-assign-open" data-room-id="${room.id}">分配站点</button>
                <button type="button" class="danger" data-action="room-delete" data-room-id="${room.id}">删除</button>
              </div>
            </div>
            <div class="ops-room-metrics-grid room-card-metrics-5" data-action="room-expand" data-room-id="${room.id}">
              <div><span>房间RTP</span><strong>${Number(room.rtp).toFixed(2)}%</strong></div>
              <div><span>在线人数</span><strong>${formatNumber(metrics.online, 2)}</strong></div>
              <div><span>房间库存</span><strong>${formatRoomOpsMoney(room.inventory, country)}</strong></div>
              <div><span>绑定站点数</span><strong>${formatNumber(metrics.siteCount, 2)}</strong></div>
              <div><span>累计投注额</span><strong>${formatRoomOpsMoney(metrics.todayBet, country)}</strong></div>
            </div>
            ${expanded ? renderRoomOpsSiteTable(room, country, state) : ""}
          </article>
        `;
      })
      .join("");
  }

  function renderRoomOpsAssignModal(state, country, room) {
    const modal = state.modal || {};
    const query = (modal.search || "").trim().toLowerCase();
    const sourcePool = country.rooms
      .filter((item) => item.id !== room.id)
      .flatMap((item) => item.sites.map((site) => ({ ...site, sourceRoomCode: item.code })))
      .concat(country.unassignedSites.map((site) => ({ ...site, sourceRoomCode: "未分配" })));
    const sourceSites = sourcePool.filter((site) => !query || site.id.toLowerCase().includes(query) || site.name.toLowerCase().includes(query));
    const targetSites = room.sites.filter((site) => !query || site.id.toLowerCase().includes(query) || site.name.toLowerCase().includes(query));
    return `
      <div class="ops-modal-backdrop">
        <div class="ops-modal ops-modal-wide">
          <div class="ops-modal-head">
            <div>
              <h2>分配站点</h2>
              <p>${escapeHtml(room.name)} / ${escapeHtml(room.code)}</p>
            </div>
            <button type="button" data-action="room-modal-close">关闭</button>
          </div>
          <div class="ops-modal-note">同一站点仅能归属一个房间；站点移入后默认同步当前房间 RTP。</div>
          <div class="ops-transfer-search">
            <input type="text" value="${escapeHtml(modal.search || "")}" placeholder="按站点 ID / 名称搜索" data-room-modal-search />
          </div>
          <div class="ops-transfer-layout">
            <section class="ops-transfer-panel">
              <header>可分配站点</header>
              <div class="ops-transfer-list">
                ${
                  sourceSites.length
                    ? sourceSites
                        .map(
                          (site) => `
                            <label class="ops-transfer-item">
                              <input type="checkbox" data-assign-side="source" data-site-id="${site.id}" ${
                                state.modal?.selectedSourceSiteIds?.[site.id] ? "checked" : ""
                              } />
                              <span>
                                <strong>${escapeHtml(site.id)} / ${escapeHtml(site.name)}</strong>
                                <em>${escapeHtml(site.sourceRoomCode)} | ${formatRoomOpsMoney(site.todayBet, country)}</em>
                              </span>
                            </label>
                          `,
                        )
                        .join("")
                    : `<div class="ops-room-empty">没有可分配站点</div>`
                }
              </div>
            </section>
            <div class="ops-transfer-actions">
              <button type="button" data-action="assign-move-in" data-room-id="${room.id}">移入</button>
              <button type="button" data-action="assign-move-out" data-room-id="${room.id}">移出</button>
            </div>
            <section class="ops-transfer-panel">
              <header>当前房间站点</header>
              <div class="ops-transfer-list">
                ${
                  targetSites.length
                    ? targetSites
                        .map(
                          (site) => `
                            <label class="ops-transfer-item">
                              <input type="checkbox" data-assign-side="target" data-site-id="${site.id}" ${
                                state.modal?.selectedTargetSiteIds?.[site.id] ? "checked" : ""
                              } />
                              <span>
                                <strong>${escapeHtml(site.id)} / ${escapeHtml(site.name)}</strong>
                                <em>${getRoomOpsSiteRtp(site, room)}% | ${formatRoomOpsMoney(site.todayBet, country)}</em>
                              </span>
                            </label>
                          `,
                        )
                        .join("")
                    : `<div class="ops-room-empty">当前房间暂无站点</div>`
                }
              </div>
            </section>
          </div>
        </div>
      </div>
    `;
  }

  function renderRoomOpsModal(page, state, country) {
    const modal = state.modal || null;
    if (!modal) return "";
    if (modal.type === "create-room") {
      const nextIndex = getNextRoomSequence(country);
      return `
        <div class="ops-modal-backdrop">
          <div class="ops-modal">
            <div class="ops-modal-head">
              <h2>创建房间</h2>
              <button type="button" data-action="room-modal-close">关闭</button>
            </div>
            <div class="ops-modal-field">
              <span>房间名称</span>
              <input type="text" value="${escapeHtml(modal.roomName || `${country.code}-房间${nextIndex}`)}" data-room-form="roomName" />
            </div>
            <div class="ops-modal-grid">
              <label class="ops-modal-field">
                <span>房间RTP</span>
                <input type="number" min="90" max="99" step="0.01" value="${escapeHtml(modal.roomRtp || "95.00")}" data-room-form="roomRtp" />
              </label>
              <label class="ops-modal-field">
                <span>初始库存</span>
                <input type="number" min="0" step="0.01" value="${escapeHtml(modal.roomInventory || "1000000.00")}" data-room-form="roomInventory" />
              </label>
            </div>
            <div class="ops-modal-note">默认继承当前国家币种：${escapeHtml(country?.symbol || "")} ${escapeHtml(country?.code || "")}</div>
            <div class="ops-modal-actions">
              <button type="button" data-action="room-modal-close">取消</button>
              <button type="button" class="primary" data-action="room-create-submit">确认创建</button>
            </div>
          </div>
        </div>
      `;
    }
    if (modal.type === "edit-room-rtp") {
      return `
        <div class="ops-modal-backdrop">
          <div class="ops-modal">
            <div class="ops-modal-head">
              <h2>${modal.roomIds?.length > 1 ? "批量调整RTP" : "调整房间RTP"}</h2>
              <button type="button" data-action="room-modal-close">关闭</button>
            </div>
            <div class="ops-modal-field">
              <span>RTP 范围 90% - 99%</span>
              <input type="number" min="90" max="99" step="0.01" value="${escapeHtml(modal.value || "95.00")}" data-room-form="roomRtpValue" />
            </div>
            <div class="ops-modal-actions">
              <button type="button" data-action="room-modal-close">取消</button>
              <button type="button" class="primary" data-action="room-rtp-save">确认调整</button>
            </div>
          </div>
        </div>
      `;
    }
    if (modal.type === "edit-site-rtp") {
      const room = getRoomOpsRoom(country, modal.roomId);
      const site = room?.sites.find((item) => item.id === modal.siteId);
      return `
        <div class="ops-modal-backdrop">
          <div class="ops-modal">
            <div class="ops-modal-head">
              <h2>调整站点RTP</h2>
              <button type="button" data-action="room-modal-close">关闭</button>
            </div>
            <div class="ops-modal-note">站点单独 RTP 的优先级高于所属房间 RTP；留空则恢复继承房间 RTP。</div>
            <div class="ops-modal-field">
              <span>${escapeHtml(site?.id || "")} / ${escapeHtml(site?.name || "")}</span>
              <input type="number" min="90" max="99" step="0.01" value="${escapeHtml(modal.value || site?.overrideRtp || "")}" data-room-form="siteRtpValue" />
            </div>
            <div class="ops-modal-actions">
              <button type="button" data-action="room-modal-close">取消</button>
              <button type="button" class="primary" data-action="site-rtp-save">确认调整</button>
            </div>
          </div>
        </div>
      `;
    }
    if (modal.type === "assign-sites") {
      const room = getRoomOpsRoom(country, modal.roomId);
      return room ? renderRoomOpsAssignModal(state, country, room) : "";
    }
    if (modal.type === "add-country") {
      return `
        <div class="ops-modal-backdrop">
          <div class="ops-modal">
            <div class="ops-modal-head">
              <h2>添加国家币种</h2>
              <button type="button" data-action="room-modal-close">关闭</button>
            </div>
            <div class="ops-modal-field">
              <span>国家名称</span>
              <input type="text" value="${escapeHtml(modal.countryName || "")}" data-room-form="countryName" />
            </div>
            <div class="ops-modal-grid">
              <label class="ops-modal-field">
                <span>3位大写币种代码</span>
                <input type="text" value="${escapeHtml(modal.countryCode || "")}" maxlength="3" data-room-form="countryCode" />
              </label>
              <label class="ops-modal-field">
                <span>币种符号</span>
                <input type="text" value="${escapeHtml(modal.countrySymbol || "")}" data-room-form="countrySymbol" />
              </label>
            </div>
            <div class="ops-modal-actions">
              <button type="button" data-action="room-modal-close">取消</button>
              <button type="button" class="primary" data-action="country-add-submit">确认添加</button>
            </div>
          </div>
        </div>
      `;
    }
    return "";
  }

  function renderFlightRoomOpsPage(page, state) {
    const country = getRoomOpsCountry(page, state);
    if (country && !state.selectedRoomId && country.rooms[0]) state.selectedRoomId = country.rooms[0].id;
    return `
      <section class="room-ops-page room-ops-page-light">
        <div class="page-heading room-ops-heading">
          <h1 class="page-title">${escapeHtml(page.title)}</h1>
          <div class="page-subtitle">${escapeHtml(page.section)} / ${escapeHtml(page.title)}</div>
        </div>
        ${renderCurrencySelector(page, state)}
        ${
          !country
            ? `<div class="ops-empty-state">请先选择国家/币种查看对应房间数据</div>`
            : `
              ${renderRoomOpsSummary(country)}
              ${renderRoomOpsToolbar(state)}
              ${
                country.rooms.length
                  ? `<section class="ops-room-list-grid">${renderRoomOpsCards(country, state)}</section>`
                  : `<div class="ops-empty-state">当前国家暂无房间，请点击上方「创建房间」按钮添加</div>`
              }
              ${renderRoomOpsModal(page, state, country)}
            `
        }
      </section>
    `;
  }

  function downloadRoomOpsExport(country) {
    const rows = [["国家", "币种", "房间名称", "房间RTP", "房间库存", "站点ID", "站点名称", "当前RTP", "今日投注额", "今日盈利", "在线人数"]];
    country.rooms.forEach((room) => {
      const sites = room.sites.length ? room.sites : [null];
      sites.forEach((site) => {
        rows.push([
          country.country,
          country.code,
          room.name,
          `${Number(room.rtp).toFixed(2)}%`,
          formatRoomOpsMoney(room.inventory, country),
          site?.id || "",
          site?.name || "",
          site ? `${getRoomOpsSiteRtp(site, room)}%` : "",
          site ? formatRoomOpsMoney(site.todayBet, country) : "",
          site ? formatRoomOpsMoney(site.todayProfit, country) : "",
          site ? formatNumber(site.online, 2) : "",
        ]);
      });
    });
    const csv = `\uFEFF${rows
      .map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n")}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `plane-room-management-${country.code}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 300);
  }

  function moveSitesIntoRoom(country, roomId, siteIds) {
    const room = getRoomOpsRoom(country, roomId);
    if (!room) return 0;
    let moved = 0;
    siteIds.forEach((siteId) => {
      const site = takeRoomOpsSite(country, siteId);
      if (site) {
        site.overrideRtp = "";
        room.sites.push(site);
        moved += 1;
      }
    });
    room.sites.sort((a, b) => a.id.localeCompare(b.id));
    return moved;
  }

  function queueRoomOpsInputFocus(selector) {
    requestAnimationFrame(() => {
      const input = document.querySelector(selector);
      if (input) {
        input.focus();
        if (typeof input.setSelectionRange === "function") {
          const length = String(input.value || "").length;
          input.setSelectionRange(length, length);
        }
      }
    });
  }

  function handleRootClick(event) {
    const actionTarget = event.target.closest("[data-action]");
    if (!actionTarget) return;
    const pageKey = getCurrentPageKey();
    const page = pageConfigs[pageKey];
    const state = getPageState(pageKey, page);
    const action = actionTarget.dataset.action;

    if (page.type === "merchantCreate") {
      if (action === "merchant-open-create") {
        state.modal = { ...cloneValue(page.formDefaults || {}), merchantCode: getMerchantCreateNextCode(page.merchantRows || []) };
        renderCurrentPage();
        return;
      }

      if (action === "merchant-modal-close") {
        state.modal = null;
        renderCurrentPage();
        return;
      }

      if (action === "merchant-modal-save") {
        const readValue = (key) => (document.querySelector(`[data-merchant-form="${key}"]`)?.value || "").trim();
        const merchantName = readValue("merchantName");
        const merchantCode = (readValue("merchantCode") || getMerchantCreateNextCode(page.merchantRows || [])).toUpperCase();
        const owner = readValue("owner");
        const walletMode = readValue("walletMode") || "单一钱包";
        const rate = readValue("rate") || "1.20%";
        const settlePeriod = readValue("settlePeriod") || "T+1";
        const callbackDomain = readValue("callbackDomain");
        const whiteIp = readValue("whiteIp");
        const lobbyUrl = readValue("lobbyUrl");
        const note = readValue("note");

        if (!merchantName || !merchantCode || !owner) {
          showToast("请填写商户名称、商户编号和负责人");
          return;
        }

        if ((page.merchantRows || []).some((row) => String(row.merchantCode || "").toUpperCase() === merchantCode)) {
          showToast("商户编号已存在，请更换后重试");
          return;
        }

        if (!window.confirm("确认创建该商户吗？")) return;

        page.merchantRows = page.merchantRows || [];
        page.merchantRows.unshift({
          merchantName,
          merchantCode,
          owner,
          walletMode,
          rate,
          settlePeriod,
          callbackDomain,
          whiteIp,
          lobbyUrl,
          note,
          status: "启用",
          statusTone: "success",
          createdAt: dateShift(0),
        });
        state.modal = null;
        state.page = 1;
        showToast("商户已创建");
        renderCurrentPage();
        return;
      }

      if (action === "page-prev") {
        state.page = Math.max(1, state.page - 1);
        renderCurrentPage();
        return;
      }

      if (action === "page-next") {
        const totalPages = Math.max(1, Math.ceil((page.merchantRows || []).length / state.pageSize));
        state.page = Math.min(totalPages, state.page + 1);
        renderCurrentPage();
        return;
      }

      if (action === "page-number") {
        state.page = Number(actionTarget.dataset.page || 1);
        renderCurrentPage();
        return;
      }
    }

    if (page.type === "roomOps") {
      const country = getRoomOpsCountry(page, state);

      if (action === "country-picker-toggle") {
        state.countryPickerOpen = !state.countryPickerOpen;
        renderCurrentPage();
        return;
      }

      if (action === "country-select") {
        state.pendingCountryCode = actionTarget.dataset.countryCode;
        const selected = page.opsData.countries.find((item) => item.code === state.pendingCountryCode);
        state.roomFilters.countryKeyword = selected ? getRoomOpsCountryOptionLabel(selected) : "";
        renderCurrentPage();
        return;
      }

      if (action === "country-add-open") {
        state.modal = { type: "add-country" };
        renderCurrentPage();
        return;
      }

      if (action === "query") {
        state.activeCountryCode = state.pendingCountryCode;
        state.selectedRoomIds = {};
        state.expandedRooms = {};
        state.roomPages = {};
        state.selectedRoomId = getRoomOpsCountry(page, state)?.rooms[0]?.id || "";
        state.countryPickerOpen = false;
        renderCurrentPage();
        return;
      }

      if (action === "room-reset") {
        state.activeCountryCode = "";
        state.pendingCountryCode = "";
        state.selectedRoomId = "";
        state.roomFilters.countryKeyword = "";
        state.roomFilters.countrySearch = "";
        state.expandedRooms = {};
        state.selectedRoomIds = {};
        state.roomPages = {};
        state.countryPickerOpen = false;
        state.modal = null;
        renderCurrentPage();
        return;
      }

      if (action === "room-expand") {
        const roomId = actionTarget.dataset.roomId;
        state.selectedRoomId = roomId;
        state.expandedRooms[roomId] = !state.expandedRooms[roomId];
        renderCurrentPage();
        return;
      }

      if (action === "room-page") {
        state.roomPages[actionTarget.dataset.roomId] = Number(actionTarget.dataset.page || 1);
        renderCurrentPage();
        return;
      }

      if (action === "room-create-open" && country) {
        state.modal = { type: "create-room" };
        renderCurrentPage();
        return;
      }

      if (action === "room-modal-close") {
        state.modal = null;
        renderCurrentPage();
        return;
      }

      if (action === "country-add-submit") {
        const countryName = (document.querySelector('[data-room-form="countryName"]')?.value || "").trim();
        const countryCode = ((document.querySelector('[data-room-form="countryCode"]')?.value || "").trim()).toUpperCase();
        const countrySymbol = (document.querySelector('[data-room-form="countrySymbol"]')?.value || "").trim();
        if (!countryName || !/^[A-Z]{3}$/.test(countryCode)) {
          showToast("请填写国家名称和 3 位大写币种代码");
          return;
        }
        if (page.opsData.countries.some((item) => item.code === countryCode)) {
          showToast("该币种代码已存在，请更换后重试");
          return;
        }
        if (!window.confirm(`确认添加国家币种 ${countryName}-${countryCode} 吗？`)) return;
        page.opsData.countries.push({ country: countryName, code: countryCode, symbol: countrySymbol, rooms: [], unassignedSites: [] });
        state.currencyOrder = [...new Set([...(state.currencyOrder || []), countryCode])];
        persistRoomOpsCountryOrder(state.currencyOrder);
        state.pendingCountryCode = countryCode;
        state.roomFilters.countryKeyword = `${countryName}-${countryCode}`;
        state.roomFilters.countrySearch = "";
        state.modal = null;
        state.countryPickerOpen = true;
        showToast("国家币种已添加");
        renderCurrentPage();
        return;
      }

      if (action === "room-create-submit" && country) {
        if (!window.confirm("确认创建该房间吗？")) return;
        const nextIndex = getNextRoomSequence(country);
        const roomName = (document.querySelector('[data-room-form="roomName"]')?.value || "").trim() || `${country.code}-房间${nextIndex}`;
        const roomRtp = Number(document.querySelector('[data-room-form="roomRtp"]')?.value || 95);
        const roomInventory = Number(document.querySelector('[data-room-form="roomInventory"]')?.value || 1000000);
        const roomId = `${country.code.toLowerCase()}-room-${nextIndex}`;
        country.rooms.push({
          id: roomId,
          code: `${country.code}-房间${nextIndex}`,
          name: roomName,
          rtp: Number(Math.min(99, Math.max(90, roomRtp)).toFixed(2)),
          inventory: Number(Math.max(0, roomInventory).toFixed(2)),
          sites: [],
        });
        state.modal = null;
        state.selectedRoomId = roomId;
        showToast("房间已创建");
        renderCurrentPage();
        return;
      }

      if (action === "room-rtp-open" && country) {
        const room = getRoomOpsRoom(country, actionTarget.dataset.roomId);
        state.modal = { type: "edit-room-rtp", roomIds: room ? [room.id] : [], value: room ? Number(room.rtp).toFixed(2) : "95.00" };
        renderCurrentPage();
        return;
      }

      if (action === "room-bulk-rtp-open" && country) {
        const selectedRoomIds = Object.keys(state.selectedRoomIds || {}).filter((key) => state.selectedRoomIds[key]);
        if (!selectedRoomIds.length) {
          showToast("请先勾选房间");
          return;
        }
        state.modal = { type: "edit-room-rtp", roomIds: selectedRoomIds, value: "95.00" };
        renderCurrentPage();
        return;
      }

      if (action === "room-rtp-save" && country) {
        if (!window.confirm("确认调整选中房间 RTP 吗？")) return;
        const nextValue = Number(Math.min(99, Math.max(90, Number(document.querySelector('[data-room-form="roomRtpValue"]')?.value || 95))).toFixed(2));
        (state.modal?.roomIds || []).forEach((roomId) => {
          const room = getRoomOpsRoom(country, roomId);
          if (room) room.rtp = nextValue;
        });
        state.modal = null;
        showToast("房间 RTP 已更新");
        renderCurrentPage();
        return;
      }

      if (action === "site-rtp-open") {
        state.modal = { type: "edit-site-rtp", roomId: actionTarget.dataset.roomId, siteId: actionTarget.dataset.siteId };
        renderCurrentPage();
        return;
      }

      if (action === "site-rtp-save" && country) {
        if (!window.confirm("确认调整该站点 RTP 吗？")) return;
        const modal = state.modal || {};
        const room = getRoomOpsRoom(country, modal.roomId);
        const site = room?.sites.find((item) => item.id === modal.siteId);
        if (site) {
          const raw = (document.querySelector('[data-room-form="siteRtpValue"]')?.value || "").trim();
          site.overrideRtp = raw ? Number(Math.min(99, Math.max(90, Number(raw)))).toFixed(2) : "";
        }
        state.modal = null;
        showToast("站点 RTP 已更新");
        renderCurrentPage();
        return;
      }

      if (action === "room-assign-open" && country) {
        state.modal = { type: "assign-sites", roomId: actionTarget.dataset.roomId, search: "", selectedSourceSiteIds: {}, selectedTargetSiteIds: {} };
        renderCurrentPage();
        return;
      }

      if (action === "assign-move-in" && country) {
        const selectedIds = Object.keys(state.modal?.selectedSourceSiteIds || {}).filter((key) => state.modal.selectedSourceSiteIds[key]);
        if (!selectedIds.length) {
          showToast("请先选择站点");
          return;
        }
        if (!window.confirm(`确认移入 ${selectedIds.length} 个站点吗？`)) return;
        const moved = moveSitesIntoRoom(country, actionTarget.dataset.roomId, selectedIds);
        state.modal = { ...state.modal, selectedSourceSiteIds: {}, selectedTargetSiteIds: {} };
        showToast(`已移入 ${moved} 个站点`);
        renderCurrentPage();
        return;
      }

      if (action === "assign-move-out" && country) {
        const selectedIds = Object.keys(state.modal?.selectedTargetSiteIds || {}).filter((key) => state.modal.selectedTargetSiteIds[key]);
        if (!selectedIds.length) {
          showToast("请先选择站点");
          return;
        }
        if (!window.confirm(`确认移出 ${selectedIds.length} 个站点吗？`)) return;
        const moved = moveSitesOutOfRoom(country, actionTarget.dataset.roomId, selectedIds);
        state.modal = { ...state.modal, selectedSourceSiteIds: {}, selectedTargetSiteIds: {} };
        showToast(`已移出 ${moved} 个站点`);
        renderCurrentPage();
        return;
      }

      if (action === "room-delete" && country) {
        if (!window.confirm("确认删除该房间并解绑其下所有站点吗？")) return;
        const roomId = actionTarget.dataset.roomId;
        const roomIndex = country.rooms.findIndex((room) => room.id === roomId);
        if (roomIndex >= 0) {
          const [room] = country.rooms.splice(roomIndex, 1);
          country.unassignedSites.push(...room.sites);
          delete state.selectedRoomIds[roomId];
          delete state.expandedRooms[roomId];
          delete state.roomPages[roomId];
          if (state.selectedRoomId === roomId) state.selectedRoomId = country.rooms[0]?.id || "";
          showToast("房间已删除，站点已解绑");
          renderCurrentPage();
        }
        return;
      }

      if (action === "room-export" && country) {
        if (!window.confirm(`确认导出 ${getRoomOpsCountryOptionLabel(country)} 的房间数据吗？`)) return;
        downloadRoomOpsExport(country);
        showToast("导出完成");
        return;
      }
    }
  }

  function handleRootChange(event) {
    const actionTarget = event.target;
    const pageKey = getCurrentPageKey();
    const page = pageConfigs[pageKey];
    if (page.type === "merchantCreate") {
      const state = getPageState(pageKey, page);
      if (actionTarget.matches('[data-action="page-size"]')) {
        state.pageSize = Number(actionTarget.value);
        state.page = 1;
        renderCurrentPage();
      }
      return;
    }
    if (page.type !== "roomOps") return;
    const state = getPageState(pageKey, page);

    if (actionTarget.matches("[data-room-country-select]")) {
      state.pendingCountryCode = actionTarget.value;
      const selected = page.opsData.countries.find((item) => item.code === state.pendingCountryCode);
      state.roomFilters.countryKeyword = selected ? getRoomOpsCountryOptionLabel(selected) : "";
      return;
    }

    if (actionTarget.matches("[data-room-select-id]")) {
      state.selectedRoomIds[actionTarget.dataset.roomSelectId] = actionTarget.checked;
      renderCurrentPage();
      return;
    }

    if (actionTarget.matches('[data-action="page-size"]')) {
      state.pageSize = Number(actionTarget.value);
      renderCurrentPage();
      return;
    }

    if (actionTarget.matches("[data-assign-side]")) {
      if (!state.modal) return;
      if (actionTarget.dataset.assignSide === "source") {
        state.modal.selectedSourceSiteIds = state.modal.selectedSourceSiteIds || {};
        state.modal.selectedSourceSiteIds[actionTarget.dataset.siteId] = actionTarget.checked;
      } else {
        state.modal.selectedTargetSiteIds = state.modal.selectedTargetSiteIds || {};
        state.modal.selectedTargetSiteIds[actionTarget.dataset.siteId] = actionTarget.checked;
      }
      return;
    }
  }

  function handleRootInput(event) {
    const actionTarget = event.target;
    const pageKey = getCurrentPageKey();
    const page = pageConfigs[pageKey];
    if (page.type !== "roomOps") return;
    const state = getPageState(pageKey, page);

    if (actionTarget.matches("[data-room-filter]")) {
      syncRoomOpsFiltersFromDom(state);
      renderCurrentPage();
      queueRoomOpsInputFocus(`[data-room-filter="${actionTarget.dataset.roomFilter}"]`);
      return;
    }

    if (actionTarget.matches("[data-room-modal-search]")) {
      state.modal = { ...(state.modal || {}), search: actionTarget.value };
      renderCurrentPage();
      queueRoomOpsInputFocus("[data-room-modal-search]");
    }
  }

  function buildMerchantCreateRows(count) {
    const owners = ["陈峰", "李娜", "王越", "周岚", "赵川", "吴婷", "许航", "林珂"];
    const callbackHosts = ["api", "wallet", "gateway", "merchant"];
    return range(count, (index) => ({
      merchantName: merchants[index % merchants.length],
      merchantCode: `M${String(8001 + index).padStart(4, "0")}`,
      owner: owners[index % owners.length],
      walletMode: index % 2 === 0 ? "单一钱包" : "转账钱包",
      rate: `${(1.2 + (index % 4) * 0.15).toFixed(2)}%`,
      settlePeriod: ["T+1", "T+3", "按周"][index % 3],
      callbackDomain: `https://${callbackHosts[index % callbackHosts.length]}-${index + 1}.merchant.example.com`,
      whiteIp: `10.2${index % 7}.${20 + (index % 12)}.***`,
      lobbyUrl: `https://lobby-${index + 1}.merchant.example.com`,
      note: `合同编号 CT-${2026051301 + index}`,
      status: ["启用", "审核中", "停用"][index % 3],
      statusTone: ["success", "warning", "danger"][index % 3],
      createdAt: dateShift(index + 2),
    }));
  }

  function buildMerchantCreatePageConfig() {
    return {
      type: "merchantCreate",
      title: "创建商户",
      section: "商户管理",
      description: "点击右上角创建商户，通过弹窗录入信息；页面主体展示全部商户基础信息。",
      defaultPageSize: 20,
      pageSizeOptions: [10, 20, 50, 100],
      formDefaults: {
        merchantName: "",
        merchantCode: "",
        owner: "",
        walletMode: "单一钱包",
        rate: "1.20%",
        settlePeriod: "T+1",
        callbackDomain: "",
        whiteIp: "XX.XX.XX.XX",
        lobbyUrl: "",
        note: "",
      },
      sections: [
        {
          title: "基础信息",
          description: "商户主资料、联系人与身份标识。",
          fields: [
            field("merchantName", "商户名称", "text", "请输入商户名称"),
            field("merchantCode", "商户编号", "text", "自动生成或手动输入"),
            field("owner", "负责人", "text", "请输入联系人"),
            selectField("walletMode", "钱包模式", ["单一钱包", "转账钱包"]),
            selectField("rate", "费率模板", ["1.20%", "1.35%", "1.50%"]),
            selectField("settlePeriod", "结算周期", ["T+1", "T+3", "按周"]),
          ],
        },
        {
          title: "接入配置",
          description: "回调域名、白名单 IP 与大厅跳转地址。",
          fields: [
            field("callbackDomain", "回调域名", "url", "请输入商户回调域名"),
            field("whiteIp", "白名单IP", "text", "推荐脱敏展示"),
            field("lobbyUrl", "大厅地址", "url", "请输入返回大厅地址"),
            areaField("note", "备注信息", "可填写结算说明、合同编号、负责人备注"),
          ],
        },
      ],
      merchantRows: buildMerchantCreateRows(24),
    };
  }

  pageConfigs["merchant-create"] = buildMerchantCreatePageConfig();

  function getMerchantCreateNextCode(rows) {
    const usedCodes = new Set((rows || []).map((row) => String(row.merchantCode || "").toUpperCase()));
    let nextIndex = (rows || []).length + 1;
    let nextCode = `M-NEW-${String(nextIndex).padStart(4, "0")}`;
    while (usedCodes.has(nextCode.toUpperCase())) {
      nextIndex += 1;
      nextCode = `M-NEW-${String(nextIndex).padStart(4, "0")}`;
    }
    return nextCode;
  }

  function getMerchantCreateSummary(rows) {
    const total = rows.length;
    const active = rows.filter((row) => row.status === "启用").length;
    const singleWallet = rows.filter((row) => row.walletMode === "单一钱包").length;
    const transferWallet = rows.filter((row) => row.walletMode === "转账钱包").length;
    return [
      metric("商户总数", formatNumber(total), `启用 ${formatNumber(active)}`, "neutral"),
      metric("启用商户", formatNumber(active), `占比 ${total ? formatPercent((active / total) * 100, 2) : "0.00%"}`, "positive"),
      metric("单一钱包", formatNumber(singleWallet), `占比 ${total ? formatPercent((singleWallet / total) * 100, 2) : "0.00%"}`, "warning"),
      metric("转账钱包", formatNumber(transferWallet), `占比 ${total ? formatPercent((transferWallet / total) * 100, 2) : "0.00%"}`, "neutral"),
    ];
  }

  function renderMerchantCreateField(fieldConfig, value) {
    if (fieldConfig.name === "merchantAccount") {
      return `
        <label class="form-field form-field-wide">
          <span>${escapeHtml(fieldConfig.label)}</span>
          <div class="form-field-input-shell">
            <input
              type="${fieldConfig.type}"
              value="${escapeHtml(value)}"
              data-merchant-form="${fieldConfig.name}"
              placeholder="${escapeHtml(fieldConfig.placeholder || "")}"
            />
            <div class="form-field-actions">
              <button type="button" class="field-action-btn" data-action="merchant-account-generate">生成</button>
              <button type="button" class="field-action-btn" data-action="merchant-account-copy">复制</button>
            </div>
          </div>
        </label>
      `;
    }

    if (fieldConfig.type === "textarea") {
      return `
        <label class="form-field form-field-wide">
          <span>${escapeHtml(fieldConfig.label)}</span>
          <textarea rows="4" data-merchant-form="${fieldConfig.name}" placeholder="${escapeHtml(
        fieldConfig.placeholder || "",
      )}">${escapeHtml(value)}</textarea>
        </label>
      `;
    }

    if (fieldConfig.type === "select") {
      return `
        <label class="form-field">
          <span>${escapeHtml(fieldConfig.label)}</span>
          <select data-merchant-form="${fieldConfig.name}">
            ${fieldConfig.options
              .map(
                (option) =>
                  `<option value="${escapeHtml(option)}" ${option === value ? "selected" : ""}>${escapeHtml(
                    option,
                  )}</option>`,
              )
              .join("")}
          </select>
        </label>
      `;
    }

    if (fieldConfig.name === "merchantPassword") {
      return `
        <label class="form-field form-field-wide">
          <span>${escapeHtml(fieldConfig.label)}</span>
          <div class="form-field-input-shell">
            <input
              type="${fieldConfig.type}"
              value="${escapeHtml(value)}"
              data-merchant-form="${fieldConfig.name}"
              placeholder="${escapeHtml(fieldConfig.placeholder || "")}"
            />
            <div class="form-field-actions">
              <button type="button" class="field-action-btn" data-action="merchant-password-generate">生成</button>
              <button type="button" class="field-action-btn" data-action="merchant-password-copy">复制</button>
            </div>
          </div>
        </label>
      `;
    }

    return `
      <label class="form-field">
        <span>${escapeHtml(fieldConfig.label)}</span>
        <input type="${fieldConfig.type}" value="${escapeHtml(value)}" data-merchant-form="${fieldConfig.name}" placeholder="${escapeHtml(
      fieldConfig.placeholder || "",
    )}" />
      </label>
    `;
  }

  function generateMerchantPassword(length = 16) {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const digits = "0123456789";
    const alphabet = upper + lower + digits;
    const pick = (source) => source[randomInt(source.length)];
    const chars = [pick(upper), pick(lower), pick(digits)];
    while (chars.length < length) chars.push(pick(alphabet));
    for (let index = chars.length - 1; index > 0; index -= 1) {
      const swapIndex = randomInt(index + 1);
      [chars[index], chars[swapIndex]] = [chars[swapIndex], chars[index]];
    }
    return chars.join("");
  }

  function randomInt(max) {
    if (window.crypto?.getRandomValues) {
      const bucket = new Uint32Array(1);
      window.crypto.getRandomValues(bucket);
      return bucket[0] % max;
    }
    return Math.floor(Math.random() * max);
  }

  function generateMerchantAccount(rows = []) {
    const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
    const usedAccounts = new Set((rows || []).map((row) => String(row.merchantAccount || "").toLowerCase()));
    let account = "";
    do {
      let suffix = "";
      for (let index = 0; index < 8; index += 1) suffix += alphabet[randomInt(alphabet.length)];
      account = `merchant_${suffix}`;
    } while (usedAccounts.has(account.toLowerCase()));
    return account;
  }

  function renderMerchantCreateSection(section, formState) {
    return `
      <section class="form-section-card">
        <div class="form-section-card-head">
          <h2>${escapeHtml(section.title)}</h2>
          <p>${escapeHtml(section.description || "")}</p>
        </div>
        <div class="form-fields-grid">
          ${section.fields
            .map((fieldConfig) => renderMerchantCreateField(fieldConfig, formState[fieldConfig.name] || ""))
            .join("")}
        </div>
      </section>
    `;
  }

  function renderMerchantCreateModal(page, state) {
    if (!state.modal) return "";
    const formState = { ...cloneValue(page.formDefaults || {}), ...state.modal };
    if (!formState.merchantCode) {
      formState.merchantCode = getMerchantCreateNextCode(page.merchantRows || []);
    }
    return `
      <div class="ops-modal-backdrop merchant-create-backdrop">
        <div class="ops-modal ops-modal-wide merchant-create-modal">
          <div class="ops-modal-head">
            <div>
              <h2>创建商户</h2>
              <p>通过弹窗补充商户基础信息与接入配置，保存后同步进入商户列表。</p>
            </div>
            <button type="button" data-action="merchant-modal-close">关闭</button>
          </div>
          <div class="merchant-create-modal-body">
            <div class="form-section-grid merchant-create-form-grid">
              ${page.sections.map((section) => renderMerchantCreateSection(section, formState)).join("")}
            </div>
          </div>
          <div class="ops-modal-actions">
            <button type="button" data-action="merchant-modal-close">取消</button>
            <button type="button" class="primary" data-action="merchant-modal-save">确认创建</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderMerchantCreatePage(pageKey, page, state) {
    const rows = page.merchantRows || [];
    const total = rows.length;
    const totalPages = Math.max(1, Math.ceil(total / state.pageSize));
    if (state.page > totalPages) state.page = totalPages;
    const start = (state.page - 1) * state.pageSize;
    const visibleRows = rows.slice(start, start + state.pageSize);
    return `
      <section class="page-frame merchant-create-page">
        ${renderPageHeader(page)}
        ${renderSummaryGrid(getMerchantCreateSummary(rows))}
        <div class="card page-table-card">
          <div class="page-table-section">
            <div class="page-table-head">
              <div>
                <h2>全部商户基础信息</h2>
                <p>当前页面展示现有商户的基础资料与接入配置摘要，点击右侧按钮可快速新增商户。</p>
              </div>
              <div class="toolbar-actions">
                <button class="toolbar-btn primary" type="button" data-action="merchant-open-create">创建商户</button>
              </div>
            </div>
            <div class="page-table-wrap">
              <table class="data-table merchant-create-table">
                <thead>
                  <tr>
                    <th>商户名称</th>
                    <th>商户编号</th>
                    <th>负责人</th>
                    <th>钱包模式</th>
                    <th>费率模板</th>
                    <th>结算周期</th>
                    <th>回调域名</th>
                    <th>白名单IP</th>
                    <th>状态</th>
                    <th>创建日期</th>
                  </tr>
                </thead>
                <tbody>
                  ${
                    visibleRows.length
                      ? visibleRows
                          .map(
                            (row) => `
                              <tr>
                                <td>${escapeHtml(row.merchantName)}</td>
                                <td class="mono merchant-create-code">${escapeHtml(row.merchantCode)}</td>
                                <td>${escapeHtml(row.owner)}</td>
                                <td>${escapeHtml(row.walletMode)}</td>
                                <td>${escapeHtml(row.rate)}</td>
                                <td>${escapeHtml(row.settlePeriod)}</td>
                                <td class="merchant-create-domain">${escapeHtml(row.callbackDomain)}</td>
                                <td class="mono">${escapeHtml(row.whiteIp)}</td>
                                <td>${badge(row.status, row.statusTone)}</td>
                                <td>${escapeHtml(row.createdAt)}</td>
                              </tr>
                            `,
                          )
                          .join("")
                      : `<tr><td colspan="10" class="table-empty">暂无商户数据</td></tr>`
                  }
                </tbody>
              </table>
            </div>
            ${renderPagination(pageKey, state, total, totalPages)}
          </div>
        </div>
        ${renderMerchantCreateModal(page, state)}
      </section>
    `;
  }

  function buildMerchantCreateRows(count) {
    const merchantTypes = ["直营商户", "代理商户", "渠道商户"];
    const timezones = ["UTC+08:00", "UTC+07:00", "UTC+05:30", "UTC+00:00"];
    const currencies = ["印度/INR", "美国/USD", "印尼/IDR", "巴西/BRL", "泰国/THB"];
    const cooperationModes = ["预充模式", "授信模式"];
    const vendorRateSets = [
      { PG: "1.10", PP: "1.18", JILI: "1.12", TADA: "1.08", Spribe: "1.25" },
      { PG: "1.05", PP: "1.20", JILI: "1.15", TADA: "1.10", Spribe: "1.28" },
      { PG: "1.16", PP: "1.22", JILI: "1.09", TADA: "1.06", Spribe: "1.20" },
    ];
    return range(count, (index) => ({
      merchantName: merchants[index % merchants.length],
      merchantCode: `M${String(8001 + index).padStart(4, "0")}`,
      merchantAccount: `merchant_${String(2001 + index).padStart(4, "0")}`,
      merchantPassword: `Pwd@${String(8100 + index)}`,
      merchantType: merchantTypes[index % merchantTypes.length],
      merchantTimezone: timezones[index % timezones.length],
      merchantCurrency: currencies[index % currencies.length],
      cooperationMode: cooperationModes[index % cooperationModes.length],
      vendorRates: vendorRateSets[index % vendorRateSets.length],
      apiConfig: {
        playerInfoUrl: `https://api-${index + 1}.merchant.example.com/player/info`,
        playerBalanceUrl: `https://api-${index + 1}.merchant.example.com/player/balance`,
        changeBalanceUrl: `https://api-${index + 1}.merchant.example.com/player/balance/change`,
        locked: true,
      },
      note: `合同编号 CT-${2026051301 + index}`,
      status: "启用",
      statusTone: "success",
      createdAt: dateShift(index + 2),
    }));
  }

  function buildMerchantCreatePageConfig() {
    return {
      type: "merchantCreate",
      title: "创建商户",
      section: "商户管理",
      description: "点击右上角创建商户，通过弹窗录入账号信息、合作模式与厂商费率；页面主体展示全部商户基础信息。",
      defaultPageSize: 20,
      pageSizeOptions: [10, 20, 50, 100],
      formDefaults: {
        merchantName: "",
        merchantCode: "",
        merchantAccount: "",
        merchantPassword: "",
        merchantType: "直营商户",
        merchantTimezone: "UTC+08:00",
        merchantCurrency: "印度/INR",
        cooperationMode: "预充模式",
        vendorRates: {
          PG: "1.10",
          PP: "1.10",
          JILI: "1.10",
          TADA: "1.10",
          Spribe: "1.10",
        },
        apiConfig: {
          playerInfoUrl: "",
          playerBalanceUrl: "",
          changeBalanceUrl: "",
          locked: false,
        },
        note: "",
      },
      sections: [
        {
          title: "商户基础",
          description: "开户身份、登录凭证与归属配置。",
          fields: [
            field("merchantName", "商户名称", "text", "请输入商户名称"),
            field("merchantCode", "商户编号", "text", "自动生成或手动输入"),
            field("merchantAccount", "商户账号", "text", "请输入登录账号"),
            field("merchantPassword", "商户密码", "password", "请输入初始密码"),
            selectField("merchantType", "商户类型", ["直营商户", "代理商户", "渠道商户"]),
            selectField("merchantTimezone", "商户时区", ["UTC+08:00", "UTC+07:00", "UTC+05:30", "UTC+00:00"]),
            selectField("merchantCurrency", "商户币种", ["INR", "USD", "IDR", "BRL", "THB"]),
            selectField("cooperationMode", "合作模式", ["预充模式", "授信模式"]),
          ],
        },
        {
          title: "厂商费率",
          description: "分别录入 PG、PP、JILI、TADA、Spribe 的独立费率。",
          fields: [{ name: "vendorRates", label: "厂商费率", type: "vendor-rates" }],
        },
        {
          title: "补充说明",
          description: "可记录商务条款、授信补充或风控备注。",
          wide: true,
          fields: [areaField("note", "备注信息", "填写合作说明、授信备注或结算补充")],
        },
      ],
      merchantRows: buildMerchantCreateRows(24),
    };
  }

  pageConfigs["merchant-create"] = buildMerchantCreatePageConfig();
  if (pageConfigs["merchant-create"]?.type === "merchantCreate") {
    pageConfigs["merchant-create"].formDefaults.apiConfig = pageConfigs["merchant-create"].formDefaults.apiConfig || {
      playerInfoUrl: "",
      playerBalanceUrl: "",
      changeBalanceUrl: "",
      locked: false,
    };
    if (!(pageConfigs["merchant-create"].sections || []).some((section) => section.fields?.some((fieldItem) => fieldItem.type === "api-config"))) {
      pageConfigs["merchant-create"].sections.push({
        title: "API配置",
        description: "配置玩家信息与余额接口地址，支持编辑和保存当前接口设置。",
        fields: [{ name: "apiConfig", label: "API配置", type: "api-config" }],
      });
    }
    pageConfigs["merchant-create"].merchantRows = (pageConfigs["merchant-create"].merchantRows || []).map((row, index) => ({
      ...row,
      apiConfig: row.apiConfig || {
        playerInfoUrl: `https://api-${index + 1}.merchant.example.com/player/info`,
        playerBalanceUrl: `https://api-${index + 1}.merchant.example.com/player/balance`,
        changeBalanceUrl: `https://api-${index + 1}.merchant.example.com/player/balance/change`,
        locked: true,
      },
    }));
  }

  function getMerchantCreateSummary(rows) {
    const total = rows.length;
    const active = rows.filter((row) => row.status === "启用").length;
    const prepaid = rows.filter((row) => row.cooperationMode === "预充模式").length;
    const credit = rows.filter((row) => row.cooperationMode === "授信模式").length;
    return [
      metric("商户总数", formatNumber(total), `启用 ${formatNumber(active)}`, "neutral"),
      metric("启用商户", formatNumber(active), `占比 ${total ? formatPercent((active / total) * 100, 2) : "0.00%"}`, "positive"),
      metric("预充模式", formatNumber(prepaid), `占比 ${total ? formatPercent((prepaid / total) * 100, 2) : "0.00%"}`, "warning"),
      metric("授信模式", formatNumber(credit), `占比 ${total ? formatPercent((credit / total) * 100, 2) : "0.00%"}`, "neutral"),
    ];
  }

  function formatMerchantVendorRates(vendorRates = {}) {
    return ["PG", "PP", "JILI", "TADA", "Spribe"]
      .map((vendor) => `${vendor} ${vendorRates[vendor] || "0.00"}%`)
      .join(" / ");
  }

  function formatMerchantCurrencyLabel(currency) {
    const currencyMap = {
      INR: "印度/INR",
      USD: "美国/USD",
      IDR: "印尼/IDR",
      BRL: "巴西/BRL",
      THB: "泰国/THB",
    };
    return currencyMap[currency] || currency || "";
  }

  function renderMerchantCreateField(fieldConfig, value) {
    if (fieldConfig.type === "vendor-rates") {
      const vendorRates = value && typeof value === "object" ? value : {};
      const vendors = ["PG", "PP", "JILI", "TADA", "Spribe"];
      return `
        <div class="merchant-rate-field form-field-wide">
          <div class="merchant-rate-head">
            <span>${escapeHtml(fieldConfig.label)}</span>
            <em>按厂商独立配置，保存后作为该商户的费率基线。</em>
          </div>
          <div class="merchant-rate-grid">
            ${vendors
              .map(
                (vendor) => `
                  <label class="merchant-rate-card">
                    <strong>${vendor}</strong>
                    <div class="merchant-rate-input">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value="${escapeHtml(vendorRates[vendor] || "")}"
                        data-merchant-rate="${vendor}"
                        placeholder="0.00"
                      />
                      <span>%</span>
                    </div>
                  </label>
                `,
              )
              .join("")}
          </div>
        </div>
      `;
    }

    if (fieldConfig.type === "api-config") {
      const apiConfig = value && typeof value === "object" ? value : {};
      const isLocked = !!apiConfig.locked;
      return `
        <div class="merchant-api-config form-field-wide">
          <div class="merchant-api-toolbar">
            <span>${escapeHtml(fieldConfig.label)}</span>
            <div class="merchant-api-actions">
              <button type="button" class="field-action-btn" data-action="merchant-api-edit">编辑</button>
              <button type="button" class="field-action-btn primary" data-action="merchant-api-save">保存</button>
            </div>
          </div>
          <div class="merchant-api-grid">
            <label class="form-field form-field-wide">
              <span>获取玩家信息接口地址</span>
              <input type="url" data-merchant-form="apiPlayerInfoUrl" value="${escapeHtml(apiConfig.playerInfoUrl || "")}" placeholder="https://api.merchant.com/player/info" ${isLocked ? "disabled" : ""} />
            </label>
            <label class="form-field form-field-wide">
              <span>获取玩家余额接口地址</span>
              <input type="url" data-merchant-form="apiPlayerBalanceUrl" value="${escapeHtml(apiConfig.playerBalanceUrl || "")}" placeholder="https://api.merchant.com/player/balance" ${isLocked ? "disabled" : ""} />
            </label>
            <label class="form-field form-field-wide">
              <span>改变玩家余额接口地址</span>
              <input type="url" data-merchant-form="apiChangeBalanceUrl" value="${escapeHtml(apiConfig.changeBalanceUrl || "")}" placeholder="https://api.merchant.com/player/balance/change" ${isLocked ? "disabled" : ""} />
            </label>
          </div>
        </div>
      `;
    }

    if (fieldConfig.name === "merchantAccount") {
      return `
        <label class="form-field form-field-wide">
          <span>${escapeHtml(fieldConfig.label)}</span>
          <div class="form-field-input-shell">
            <input
              type="${fieldConfig.type}"
              value="${escapeHtml(value)}"
              data-merchant-form="${fieldConfig.name}"
              placeholder="${escapeHtml(fieldConfig.placeholder || "")}"
            />
            <div class="form-field-actions">
              <button type="button" class="field-action-btn" data-action="merchant-account-generate">生成</button>
              <button type="button" class="field-action-btn" data-action="merchant-account-copy">复制</button>
            </div>
          </div>
        </label>
      `;
    }

    if (fieldConfig.name === "merchantPassword") {
      return `
        <label class="form-field form-field-wide">
          <span>${escapeHtml(fieldConfig.label)}</span>
          <div class="form-field-input-shell">
            <input
              type="${fieldConfig.type}"
              value="${escapeHtml(value)}"
              data-merchant-form="${fieldConfig.name}"
              placeholder="${escapeHtml(fieldConfig.placeholder || "")}"
            />
            <div class="form-field-actions">
              <button type="button" class="field-action-btn" data-action="merchant-password-generate">生成</button>
              <button type="button" class="field-action-btn" data-action="merchant-password-copy">复制</button>
            </div>
          </div>
        </label>
      `;
    }

    if (fieldConfig.type === "textarea") {
      return `
        <label class="form-field form-field-wide">
          <span>${escapeHtml(fieldConfig.label)}</span>
          <textarea rows="4" data-merchant-form="${fieldConfig.name}" placeholder="${escapeHtml(
        fieldConfig.placeholder || "",
      )}">${escapeHtml(value)}</textarea>
        </label>
      `;
    }

    if (fieldConfig.type === "select") {
      return `
        <label class="form-field">
          <span>${escapeHtml(fieldConfig.label)}</span>
          <select data-merchant-form="${fieldConfig.name}">
            ${fieldConfig.options
              .map(
                (option) => {
                  const optionValue = fieldConfig.name === "merchantCurrency" ? formatMerchantCurrencyLabel(option) : option;
                  return `<option value="${escapeHtml(optionValue)}" ${optionValue === value ? "selected" : ""}>${escapeHtml(
                    optionValue,
                  )}</option>`;
                },
              )
              .join("")}
          </select>
        </label>
      `;
    }

    return `
      <label class="form-field">
        <span>${escapeHtml(fieldConfig.label)}</span>
        <input type="${fieldConfig.type}" value="${escapeHtml(value)}" data-merchant-form="${fieldConfig.name}" placeholder="${escapeHtml(
      fieldConfig.placeholder || "",
    )}" />
      </label>
    `;
  }

  function renderMerchantCreateSection(section, formState) {
    return `
      <section class="form-section-card merchant-create-section${section.wide ? " merchant-create-section-wide" : ""}">
        <div class="form-section-card-head">
          <h2>${escapeHtml(section.title)}</h2>
          <p>${escapeHtml(section.description || "")}</p>
        </div>
        <div class="form-fields-grid">
          ${section.fields
            .map((fieldConfig) => renderMerchantCreateField(fieldConfig, formState[fieldConfig.name] || ""))
            .join("")}
        </div>
      </section>
    `;
  }

  function renderMerchantCreateModal(page, state) {
    if (!state.modal) return "";
    const formState = { ...cloneValue(page.formDefaults || {}), ...state.modal };
    if (!formState.merchantCode) {
      formState.merchantCode = getMerchantCreateNextCode(page.merchantRows || []);
    }
    return `
      <div class="ops-modal-backdrop">
        <div class="ops-modal ops-modal-wide merchant-create-modal">
          <div class="ops-modal-head merchant-create-modal-head">
            <div>
              <h2>创建商户</h2>
              <p>在一个弹窗里完成账号、币种、合作模式和五个厂商费率配置，适合运营和商务快速录入。</p>
            </div>
            <button type="button" data-action="merchant-modal-close">关闭</button>
          </div>
          <div class="merchant-create-modal-banner">
            <span>开户信息</span>
            <strong>账号、币种、合作模式与厂商费率在同一视图完成配置</strong>
          </div>
          <div class="merchant-create-modal-body">
            <div class="form-section-grid merchant-create-form-grid">
              ${page.sections.map((section) => renderMerchantCreateSection(section, formState)).join("")}
            </div>
          </div>
          <div class="ops-modal-actions">
            <button type="button" data-action="merchant-modal-close">取消</button>
            <button type="button" class="primary" data-action="merchant-modal-save">确认创建</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderMerchantCreatePage(pageKey, page, state) {
    const rows = page.merchantRows || [];
    const total = rows.length;
    const totalPages = Math.max(1, Math.ceil(total / state.pageSize));
    if (state.page > totalPages) state.page = totalPages;
    const start = (state.page - 1) * state.pageSize;
    const visibleRows = rows.slice(start, start + state.pageSize);
    return `
      <section class="page-frame merchant-create-page">
        ${renderPageHeader(page)}
        ${renderSummaryGrid(getMerchantCreateSummary(rows))}
        <div class="card page-table-card">
          <div class="page-table-section">
            <div class="page-table-head">
              <div>
                <h2>全部商户基础信息</h2>
                <p>以商户开户信息为主，集中展示账号、类型、币种、合作模式和厂商费率摘要。</p>
              </div>
              <div class="toolbar-actions">
                <button class="toolbar-btn primary" type="button" data-action="merchant-open-create">创建商户</button>
              </div>
            </div>
            <div class="page-table-wrap">
              <table class="data-table merchant-create-table">
                <thead>
                  <tr>
                    <th>商户名称</th>
                    <th>商户编号</th>
                    <th>商户账号</th>
                    <th>商户类型</th>
                    <th>商户时区</th>
                    <th>商户币种</th>
                    <th>合作模式</th>
                    <th>厂商费率</th>
                    <th>状态</th>
                    <th>创建日期</th>
                  </tr>
                </thead>
                <tbody>
                  ${
                    visibleRows.length
                      ? visibleRows
                          .map(
                            (row) => `
                              <tr>
                                <td>${escapeHtml(row.merchantName)}</td>
                                <td class="mono merchant-create-code">${escapeHtml(row.merchantCode)}</td>
                                <td class="mono">${escapeHtml(row.merchantAccount)}</td>
                                <td>${escapeHtml(row.merchantType)}</td>
                                <td>${escapeHtml(row.merchantTimezone)}</td>
                                <td>${escapeHtml(formatMerchantCurrencyLabel(row.merchantCurrency))}</td>
                                <td>${escapeHtml(row.cooperationMode)}</td>
                                <td class="merchant-create-domain">${escapeHtml(formatMerchantVendorRates(row.vendorRates))}</td>
                                <td>${badge(row.status, row.statusTone)}</td>
                                <td>${escapeHtml(row.createdAt)}</td>
                              </tr>
                            `,
                          )
                          .join("")
                      : `<tr><td colspan="10" class="table-empty">暂无商户数据</td></tr>`
                  }
                </tbody>
              </table>
            </div>
            ${renderPagination(pageKey, state, total, totalPages)}
          </div>
        </div>
        ${renderMerchantCreateModal(page, state)}
      </section>
    `;
  }

  const playerTodayProfitGames = [
    { brand: "PG", id: "1001", value: "PowerOfTheKraken", name: "PowerOfTheKraken 法老牌", icon: "K", tone: "kraken" },
    { brand: "PG", id: "1002", value: "eKraken", name: "eKraken 海怪传说", icon: "eK", tone: "ek" },
    { brand: "PG", id: "1003", value: "Fortune Gems", name: "Fortune Gems 宝石热气球", icon: "FG", tone: "gems" },
    { brand: "PG", id: "1004", value: "Heaven Dynasty", name: "Heaven Dynasty 天竺王朝", icon: "天", tone: "palace" },
    { brand: "PP", id: "1005", value: "Pharaoh Cards", name: "Pharaoh Cards 法老牌", icon: "法", tone: "pharaoh" },
    { brand: "PP", id: "1006", value: "Bowling King", name: "Bowling King 保龄球之王", icon: "保", tone: "bowling" },
    { brand: "PP", id: "1007", value: "Gem Balloon", name: "Gem Balloon 宝石热气球", icon: "宝", tone: "balloon" },
    { brand: "PP", id: "1008", value: "Sesame Gate", name: "Sesame Gate 芝麻开门", icon: "芝", tone: "sesame" },
    { brand: "JILI", id: "1009", value: "Sea Monster", name: "Sea Monster 海怪传说", icon: "海", tone: "monster" },
    { brand: "JILI", id: "1010", value: "Maya Gold", name: "Maya Gold 玛雅黄金", icon: "玛", tone: "maya" },
    { brand: "JILI", id: "1011", value: "Poker Kingdom", name: "Poker Kingdom 扑克王国", icon: "扑", tone: "crown" },
    { brand: "JILI", id: "1012", value: "Dragon Treasure", name: "Dragon Treasure 龙之宝藏", icon: "龙", tone: "dragon" },
    { brand: "SPRLBE", id: "1013", value: "Lucky Candy", name: "Lucky Candy 幸运糖果", icon: "糖", tone: "candy" },
    { brand: "SPRLBE", id: "1014", value: "Star Gems", name: "Star Gems 星辉宝石", icon: "星", tone: "star" },
    { brand: "SPRLBE", id: "1015", value: "Golden Train", name: "Golden Train 黄金列车", icon: "金", tone: "train" },
  ];

  function buildPlayerTodayProfitRows() {
    const seeds = [
      ["低端玩家", "10470001344450", "2026-05-06", 73, 327270, 422942.1, -95672.1, -113623.4, 54880, "PowerOfTheKraken"],
      ["优质玩家", "10470007305040", "2026-05-07", 417, 428720, 468875.5, -40155.5, -124850.93, 132640, "eKraken"],
      ["中端玩家", "10470004414669", "2026-05-06", 82, 161024, 190408.9, -29384.9, -24220.9, 26300, "Fortune Gems"],
      ["疑似刷分", "10470004889926", "2026-05-06", 279, 202265.06, 228909.96, -26644.9, -30650.13, 18960, "PowerOfTheKraken"],
      ["优质玩家", "10410001538841", "2026-05-06", 284, 161662.16, 188175.48, -26513.32, -24922, 146520, "eKraken"],
      ["中端玩家", "10470000804108", "2026-05-07", 199, 210356, 232396.48, -22040.48, -14458.92, 33680, "Fortune Gems"],
      ["疑似刷分", "10470001601623", "2026-05-06", 486, 268073, 287859.7, -19786.7, -16803.67, 22540, "PowerOfTheKraken"],
      ["低端玩家", "10470001978708", "2026-05-07", 130, 64750, 81623.2, -16873.2, -21312.7, 12860, "eKraken"],
      ["优质玩家", "10470002284615", "2026-05-07", 352, 386112, 352908.6, 33203.4, -41880.3, 188230, "Pharaoh Cards"],
      ["中端玩家", "10470002675531", "2026-05-06", 118, 124680, 100446.4, 24233.6, 9180.22, 60420, "Bowling King"],
      ["低端玩家", "10470003048762", "2026-05-07", 64, 56620, 51892.8, 4727.2, -6290.5, 15430, "Gem Balloon"],
      ["疑似刷分", "10470003390677", "2026-05-06", 501, 311760, 356880.2, -45120.2, -66834.7, 21410, "Sea Monster"],
    ];
    return seeds.map((item, index) => {
      const game = playerTodayProfitGames.find((gameItem) => gameItem.value === item[9]) || playerTodayProfitGames[0];
      return {
        level: item[0],
        platformId: item[1],
        merchant: merchants[index % merchants.length],
        date: item[2],
        betCount: item[3],
        todayBet: item[4],
        todayPayout: item[5],
        todayWinLoss: item[6],
        historyWinLoss: item[7],
        balance: item[8],
        status: ["正常", "控输中", "控赢中", "正常"][index % 4],
        game: item[9],
        brand: game.brand,
      };
    });
  }

  pageConfigs["today-player-profit"] = {
    type: "playerTodayProfit",
    title: "今日玩家盈亏",
    section: "数据管理",
    description: "从商户后台迁移的玩家维度今日投注、返奖、输赢与余额明细。",
    defaultPageSize: 100,
    pageSizeOptions: [50, 100, 500, 1000],
    rows: buildPlayerTodayProfitRows(),
  };

  function formatProfitPlainMoney(value) {
    return Number(value || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function getProfitTagClass(level) {
    return {
      "低端玩家": "tag-low",
      "中端玩家": "tag-mid",
      "优质玩家": "tag-premium",
      "疑似刷分": "tag-risk",
    }[level] || "tag-mid";
  }

  function getPlayerTodayProfitRows(page, state) {
    const filters = state.filters || {};
    const platform = String(filters.platform || "").trim();
    const selectedMerchants = Array.isArray(filters.merchants)
      ? filters.merchants
      : (filters.merchant ? [filters.merchant] : []);
    const game = String(filters.game || "").trim();
    const dateFrom = filters.dateFrom || "";
    const dateTo = filters.dateTo || "";
    return (page.rows || []).filter((row) => {
      if (platform && !row.platformId.includes(platform)) return false;
      if (selectedMerchants.length && !selectedMerchants.includes(row.merchant)) return false;
      if (game && row.game !== game) return false;
      if (dateFrom && row.date < dateFrom) return false;
      if (dateTo && row.date > dateTo) return false;
      return true;
    });
  }

  function renderPlayerProfitMerchantPicker(state) {
    const filters = state.filters || {};
    const selectedMerchants = Array.isArray(filters.merchants) ? filters.merchants : [];
    const merchantSearch = String(filters.merchantSearch || "").trim().toLowerCase();
    const visibleMerchants = merchants.filter((merchant) => {
      if (!merchantSearch) return true;
      return merchant.toLowerCase().includes(merchantSearch);
    });
    const selectedText = selectedMerchants.length ? selectedMerchants.join("、") : "全部商户";
    return `
      <div class="admin-profit-merchant-picker">
        <button class="admin-profit-merchant-trigger${selectedMerchants.length ? " has-value" : ""}" type="button" data-action="profit-merchant-toggle" title="${escapeHtml(selectedText)}">
          <span class="admin-profit-merchant-value">${escapeHtml(selectedText)}</span>
          <span class="admin-profit-game-arrow">⌄</span>
        </button>
        ${state.merchantPickerOpen ? `
          <div class="admin-profit-merchant-panel">
            <input class="admin-profit-merchant-search" type="text" value="${escapeHtml(filters.merchantSearch || "")}" placeholder="搜索商户" data-profit-merchant-search />
            <div class="admin-profit-merchant-options">
              <button class="admin-profit-merchant-option${selectedMerchants.length ? "" : " active"}" type="button" data-action="profit-merchant-clear">
                <span class="admin-profit-merchant-check"></span>
                <span>全部商户</span>
              </button>
              ${visibleMerchants.map((merchant) => {
                const checked = selectedMerchants.includes(merchant);
                return `
                  <button class="admin-profit-merchant-option${checked ? " active" : ""}" type="button" data-action="profit-merchant-option" data-merchant="${escapeHtml(merchant)}">
                    <span class="admin-profit-merchant-check"></span>
                    <span>${escapeHtml(merchant)}</span>
                  </button>
                `;
              }).join("")}
              ${visibleMerchants.length ? "" : `<div class="admin-profit-merchant-empty">暂无匹配商户</div>`}
            </div>
          </div>
        ` : ""}
      </div>
    `;
  }

  function renderPlayerProfitGamePicker(state) {
    const filters = state.filters || {};
    const brand = filters.gameBrand || "";
    const search = String(filters.gameSearch || "").trim().toLowerCase();
    const visibleGames = playerTodayProfitGames.filter((game) => {
      if (brand && game.brand !== brand) return false;
      if (search && !`${game.name} ${game.value} ${game.id}`.toLowerCase().includes(search)) return false;
      return true;
    });
    const brands = ["", "PG", "PP", "JILI", "SPRLBE"];
    return `
      <div class="admin-profit-game-picker">
        <button class="admin-profit-game-trigger" type="button" data-action="profit-game-toggle">
          <span class="admin-profit-game-choice">${filters.game ? (playerTodayProfitGames.find((item) => item.value === filters.game)?.icon || "G") : "ALL"}</span>
          <span>${escapeHtml(filters.gameLabel || "全部游戏")}</span>
          <span class="admin-profit-game-arrow">⌄</span>
        </button>
        ${state.gamePickerOpen ? `
          <div class="admin-profit-game-panel">
            <div class="admin-profit-brand-tabs">
              ${brands.map((item) => `
                <button class="admin-profit-brand-tab${brand === item ? " active" : ""}" type="button" data-action="profit-game-brand" data-brand="${escapeHtml(item)}">
                  ${item || "全部品牌"}
                </button>
              `).join("")}
            </div>
            <input class="admin-profit-game-search" type="text" value="${escapeHtml(filters.gameSearch || "")}" placeholder="搜索游戏名称 / 英文名 / 游戏ID" data-profit-filter="gameSearch" />
            <div class="admin-profit-game-options">
              <button class="admin-profit-game-option${!filters.game ? " active" : ""}" type="button" data-action="profit-game-option" data-game="" data-label="全部游戏">
                <span class="admin-profit-game-thumb all"><span>ALL</span></span>
              </button>
              ${visibleGames.map((game) => `
                <button class="admin-profit-game-option${filters.game === game.value ? " active" : ""}" type="button" data-action="profit-game-option" data-game="${escapeHtml(game.value)}" data-label="${escapeHtml(game.name)}" title="${escapeHtml(game.name)}">
                  <span class="admin-profit-game-thumb ${escapeHtml(game.tone)}"><span>${escapeHtml(game.icon)}</span></span>
                </button>
              `).join("")}
            </div>
            <div class="admin-profit-game-pager">
              <button class="admin-profit-game-page" type="button" disabled>‹</button>
              <span>1 / 1</span>
              <button class="admin-profit-game-page" type="button" disabled>›</button>
            </div>
          </div>
        ` : ""}
      </div>
    `;
  }

  function renderPlayerProfitControlGamePicker(state) {
    const modal = state.controlModal || {};
    const selectedBrands = Array.isArray(modal.controlGameBrands)
      ? modal.controlGameBrands
      : (modal.controlGameBrand ? [modal.controlGameBrand] : []);
    const search = String(modal.controlGameSearch || "").trim().toLowerCase();
    const selectedGame = modal.controlGame || "";
    const selectedGameMeta = playerTodayProfitGames.find((item) => item.value === selectedGame);
    const visibleGames = playerTodayProfitGames.filter((game) => {
      if (selectedBrands.length && !selectedBrands.includes(game.brand)) return false;
      if (search && !`${game.name} ${game.value} ${game.id}`.toLowerCase().includes(search)) return false;
      return true;
    });
    const gamePickerPageSize = 18;
    const gamePickerItems = [
      { type: "all", value: "", label: "全部游戏", icon: "ALL", tone: "all" },
      ...visibleGames.map((game) => ({ type: "game", ...game })),
    ];
    const totalGamePages = Math.max(1, Math.ceil(gamePickerItems.length / gamePickerPageSize));
    const currentGamePage = Math.min(Math.max(1, Number(modal.controlGamePage || 1)), totalGamePages);
    const pagedGameItems = gamePickerItems.slice((currentGamePage - 1) * gamePickerPageSize, currentGamePage * gamePickerPageSize);
    const brands = ["", "PG", "PP", "JILI", "SPRLBE"];
    const brandLabel = selectedBrands.length ? selectedBrands.join("/") : "全部品牌";
    const triggerLabel = selectedGameMeta ? selectedGameMeta.name : (modal.controlGameLabel || brandLabel);
    const triggerIcon = selectedGameMeta ? selectedGameMeta.icon : (selectedBrands.length === 1 ? selectedBrands[0].slice(0, 2) : (selectedBrands.length ? String(selectedBrands.length) : "ALL"));
    return `
      <div class="admin-profit-game-picker admin-control-profit-game-picker">
        <button class="admin-profit-game-trigger" type="button" data-action="profit-control-game-toggle">
          <span class="admin-profit-game-choice">${escapeHtml(triggerIcon)}</span>
          <span>${escapeHtml(triggerLabel)}</span>
          <span class="admin-profit-game-arrow">⌄</span>
        </button>
        ${modal.controlGamePickerOpen ? `
          <div class="admin-profit-game-panel admin-control-profit-game-panel">
            <div class="admin-profit-brand-tabs">
              ${brands.map((item) => `
                <button class="admin-profit-brand-tab${(!item && !selectedBrands.length) || selectedBrands.includes(item) ? " active" : ""}" type="button" data-action="profit-control-game-brand" data-brand="${escapeHtml(item)}">
                  ${item || "全部品牌"}
                </button>
              `).join("")}
            </div>
            <input class="admin-profit-game-search" type="text" value="${escapeHtml(modal.controlGameSearch || "")}" placeholder="搜索游戏名称 / 英文名 / 游戏ID" data-profit-control-game-search />
            <div class="admin-profit-game-options">
              ${pagedGameItems.map((game) => {
                const checked = selectedGame === game.value;
                return `
                <button class="admin-profit-game-option${checked ? " active checked" : ""}" type="button" data-action="profit-control-game-option" data-game="${escapeHtml(game.value)}" data-label="${escapeHtml(game.name || game.label)}" title="${escapeHtml(game.name || game.label)}">
                  <span class="admin-profit-game-checkmark"></span>
                  <span class="admin-profit-game-thumb ${escapeHtml(game.tone)}"><span>${escapeHtml(game.icon)}</span></span>
                </button>
              `;
              }).join("")}
            </div>
            <div class="admin-profit-game-pager">
              <button class="admin-profit-game-page" type="button" data-action="profit-control-game-page" data-page="${currentGamePage - 1}"${currentGamePage <= 1 ? " disabled" : ""}>‹</button>
              <span>${currentGamePage} / ${totalGamePages}</span>
              <button class="admin-profit-game-page" type="button" data-action="profit-control-game-page" data-page="${currentGamePage + 1}"${currentGamePage >= totalGamePages ? " disabled" : ""}>›</button>
            </div>
          </div>
        ` : ""}
      </div>
    `;
  }

  function renderPlayerProfitControlModal(state) {
    const modal = state.controlModal;
    if (!modal) return "";
    const row = modal.row || {};
    const targetLabel = row.game ? `按游戏 ${row.game}` : "按游戏品牌 PG / PP / JILI";
    const controlDirection = modal.controlDirection || "loss";
    const controlRtp = Number(modal.controlRtp ?? 90);
    const controlLevel = modal.controlLevel || "low";
    const releaseAmount = Math.abs(Number(modal.releaseAmount ?? 50000));
    const displayReleaseAmount = controlDirection === "loss" ? -releaseAmount : releaseAmount;
    const releaseType = modal.releaseType === "time" ? "time" : "amount";
    const quickAmounts = Array.isArray(modal.releaseQuickAmounts) && modal.releaseQuickAmounts.length
      ? modal.releaseQuickAmounts
      : [10000, 50000, 100000];
    const rtpLevelValues = controlDirection === "win"
      ? { low: 120, mid: 180, high: 300 }
      : { low: 90, mid: 85, high: 50 };
    const rtpLimitText = controlDirection === "win"
      ? "控赢状态下，禁止 RTP 低于 100"
      : "控输状态下，禁止 RTP 高于 90";
    const reportRows = [
      {
        platformId: row.platformId || "",
        target: targetLabel,
        currentRtp: "88.6%",
        todayBet: row.todayBet || 0,
        result: row.todayWinLoss || 0,
        totalResult: row.historyWinLoss || 0,
        carryAmount: row.balance || 0,
        releaseType: "金额",
        releaseThreshold: "50,000.00",
        progress: "36%",
        status: "点控中",
      },
      {
        platformId: "10470001978708",
        target: "品牌 PG / 中控",
        currentRtp: "91.2%",
        todayBet: 64750,
        result: -16873.2,
        totalResult: -21312.7,
        carryAmount: 12860,
        releaseType: "时间",
        releaseThreshold: "7天后解除",
        progress: "2 / 7 天",
        status: "点控中",
      },
    ];
    return `
      <div class="admin-control-backdrop">
        <section class="admin-control-modal">
          <div class="admin-control-head">
            <div>
              <h2>游戏控制</h2>
              <p>按平台、游戏品牌和控制规则配置玩家游戏控制策略。</p>
            </div>
            <button type="button" data-action="profit-control-close">关闭</button>
          </div>
          <div class="admin-control-body">
            <div class="admin-control-card admin-control-basic-card">
              <div class="admin-control-card-head">
                <h3>基础信息</h3>
                <p>配置控制对象和调控维度。</p>
              </div>
              <div class="admin-control-form-row admin-control-select-row">
                <span class="admin-control-label required">游戏选择</span>
                <div class="admin-control-game-picker-field">
                  ${renderPlayerProfitControlGamePicker(state)}
                </div>
              </div>
            </div>
            <div class="admin-control-card">
              <div class="admin-control-card-head">
                <h3>控制策略</h3>
                <p>设置控输/控赢方向、RTP 档位和快捷值。</p>
              </div>
              <div class="admin-control-form-row">
                <span class="admin-control-label">控制输赢</span>
                <div class="admin-control-segment">
                  <button class="${controlDirection === "loss" ? "active" : ""}" type="button" data-action="profit-control-direction" data-direction="loss">控输</button>
                  <button class="${controlDirection === "win" ? "active" : ""}" type="button" data-action="profit-control-direction" data-direction="win">控赢</button>
                </div>
              </div>
              <div class="admin-control-form-row">
                <span class="admin-control-label">控制RTP</span>
                <div class="admin-control-inline">
                  <input type="number" value="${controlRtp}" min="${controlDirection === "win" ? "100" : "0"}" ${controlDirection === "loss" ? "max=\"90\"" : ""} data-profit-control-rtp />
                  <span class="admin-control-hint warning">${rtpLimitText}</span>
                </div>
              </div>
              <div class="admin-control-form-row">
                <span class="admin-control-label">RTP档位</span>
                <div class="admin-control-segment">
                  <button class="${controlLevel === "low" ? "active" : ""}" type="button" data-action="profit-control-level" data-level="low" data-rtp="${rtpLevelValues.low}">低速 ${rtpLevelValues.low}</button>
                  <button class="${controlLevel === "mid" ? "active" : ""}" type="button" data-action="profit-control-level" data-level="mid" data-rtp="${rtpLevelValues.mid}">中速 ${rtpLevelValues.mid}</button>
                  <button class="${controlLevel === "high" ? "active" : ""}" type="button" data-action="profit-control-level" data-level="high" data-rtp="${rtpLevelValues.high}">高速 ${rtpLevelValues.high}</button>
                </div>
              </div>
            </div>
            <div class="admin-control-card">
              <div class="admin-control-card-head">
                <h3>解除规则</h3>
                <p>设置控制结束条件，可按金额、RTP 或时间解除。</p>
              </div>
              <div class="admin-control-form-row">
                <span class="admin-control-label">解除类型</span>
                <div class="admin-control-segment">
                  <button class="${releaseType === "amount" ? "active" : ""}" type="button" data-action="profit-control-release-type" data-release-type="amount">金额</button>
                  <button class="${releaseType === "time" ? "active" : ""}" type="button" data-action="profit-control-release-type" data-release-type="time">时间</button>
                </div>
              </div>
              ${releaseType === "time" ? `
                <div class="admin-control-form-row">
                  <span class="admin-control-label">解除时间</span>
                  <div class="admin-control-inline">
                    <div class="admin-control-time-options">
                      ${[
                        { label: "1天", value: "1" },
                        { label: "7天", value: "7" },
                        { label: "30天", value: "30" },
                        { label: "365天", value: "365" },
                        { label: "永久", value: "forever" },
                      ].map((item) => `
                        <button class="${String(modal.releaseDays ?? "7") === item.value ? "active" : ""}" type="button" data-action="profit-control-release-days" data-days="${item.value}">${item.label}</button>
                      `).join("")}
                    </div>
                    <span class="admin-control-hint">到达所选时间后，控制结束（永久无截止时间）</span>
                  </div>
                </div>
              ` : `
                <div class="admin-control-form-row">
                  <span class="admin-control-label">解除金额</span>
                  <div class="admin-control-inline">
                    <input type="number" value="${displayReleaseAmount.toFixed(2)}" data-profit-control-release-amount />
                    ${quickAmounts.map((amount, index) => `
                      <span class="admin-control-amount-chip-wrap">
                        <button type="button" class="admin-control-amount-remove" data-action="profit-control-release-amount-delete" data-index="${index}">×</button>
                        <button type="button" class="admin-control-amount-chip" data-action="profit-control-release-amount-add" data-index="${index}">${formatNumber(Number(amount || 0))}</button>
                      </span>
                    `).join("")}
                    ${modal.releaseQuickEditing ? `
                      <span class="admin-control-amount-editor">
                        <input type="number" value="${Number(modal.releaseQuickDraft || 0) || ""}" placeholder="输入金额" data-profit-control-custom-amount />
                        <button type="button" class="admin-control-amount-save" data-action="profit-control-release-amount-save">保存</button>
                      </span>
                    ` : `<button type="button" class="admin-control-amount-create" data-action="profit-control-release-amount-create">+ 自定义金额</button>`}
                    <span class="admin-control-hint">累计达到该金额后，控制结束</span>
                  </div>
                </div>
              `}
            </div>
          </div>
          <div class="admin-control-footer">
            <button type="button" data-action="profit-control-close">取消</button>
            <button class="primary" type="button" data-action="profit-control-save">保存</button>
          </div>
        </section>
      </div>
    `;
  }

  function renderPlayerTodayProfitPage(pageKey, page, state) {
    const filters = state.filters || {};
    const rows = getPlayerTodayProfitRows(page, state);
    const total = rows.length;
    const totalPages = Math.max(1, Math.ceil(total / state.pageSize));
    if (state.page > totalPages) state.page = totalPages;
    const start = (state.page - 1) * state.pageSize;
    const visibleRows = rows.slice(start, start + state.pageSize);
    return `
      <section class="page-frame admin-player-profit-page">
        ${renderPageHeader(page)}
        <div class="admin-profit-tabs">
          <span class="admin-profit-tab">用户账号</span>
          <span class="admin-profit-tab">游戏数据</span>
          <span class="admin-profit-tab active"><span class="dot">●</span>今日玩家盈亏</span>
        </div>
        <div class="card admin-profit-card">
          <div class="admin-profit-toolbar">
            <div class="admin-profit-filters">
              <label class="admin-profit-filter">
                <span>平台ID</span>
                <input class="admin-profit-input" type="text" value="${escapeHtml(filters.platform || "")}" placeholder="请输入" data-profit-filter="platform" />
              </label>
              <label class="admin-profit-filter admin-profit-merchant-filter">
                <span>商户选择</span>
                ${renderPlayerProfitMerchantPicker(state)}
              </label>
              <label class="admin-profit-filter">
                <span>游戏选择</span>
                ${renderPlayerProfitGamePicker(state)}
              </label>
              <label class="admin-profit-filter admin-profit-date-filter">
                <span>日期选择</span>
                <div class="admin-profit-date-control">
                  <input class="admin-profit-input date" type="date" value="${escapeHtml(filters.dateFrom || "")}" data-profit-filter="dateFrom" />
                  <em>至</em>
                  <input class="admin-profit-input date" type="date" value="${escapeHtml(filters.dateTo || "")}" data-profit-filter="dateTo" />
                </div>
              </label>
            </div>
            <div class="admin-profit-actions">
              <button class="admin-profit-btn primary" type="button" data-action="profit-search">查询</button>
              <button class="admin-profit-btn" type="button" data-action="profit-reset">重置</button>
            </div>
          </div>
          <div class="admin-profit-table-wrap">
            <div class="admin-profit-table">
              <div class="admin-profit-row header">
                <div>玩家标签</div>
                <div>平台ID</div>
                <div>商户</div>
                <div>下注次数</div>
                <div>今日下注</div>
                <div>今日返奖</div>
                <div>今日输赢</div>
                <div>历史输赢</div>
                <div>余额</div>
                <div>状态</div>
                <div>日期</div>
                <div>操作</div>
              </div>
              ${visibleRows.length ? visibleRows.map((row) => `
                <div class="admin-profit-row">
                  <div><span class="admin-player-tag ${getProfitTagClass(row.level)}">${escapeHtml(row.level)}</span></div>
                  <div><span class="admin-profit-player">${escapeHtml(row.platformId)} <button class="admin-profit-copy" type="button" data-action="profit-copy" data-copy="${escapeHtml(row.platformId)}" title="复制平台ID"></button></span></div>
                  <div>${escapeHtml(row.merchant || "")}</div>
                  <div>${formatNumber(row.betCount)}</div>
                  <div><span class="admin-profit-num">${formatProfitPlainMoney(row.todayBet)}</span></div>
                  <div><span class="admin-profit-num">${formatProfitPlainMoney(row.todayPayout)}</span></div>
                  <div><span class="admin-profit-num ${row.todayWinLoss < 0 ? "neg" : "pos"}">${formatProfitPlainMoney(Math.abs(row.todayWinLoss))}</span></div>
                  <div><span class="admin-profit-num ${row.historyWinLoss < 0 ? "neg" : "pos"}">${formatProfitPlainMoney(Math.abs(row.historyWinLoss))}</span></div>
                  <div><span class="admin-profit-num">${formatProfitPlainMoney(row.balance)}</span></div>
                  <div><span class="admin-profit-status ${row.status === "控输中" ? "loss" : row.status === "控赢中" ? "win" : "normal"}">${escapeHtml(row.status || "正常")}</span></div>
                  <div>${escapeHtml(row.date)}</div>
                  <div><button class="admin-profit-op-btn" type="button" data-action="profit-control-open" data-platform="${escapeHtml(row.platformId)}">操作</button></div>
                </div>
              `).join("") : `<div class="admin-profit-empty">暂无匹配数据</div>`}
            </div>
          </div>
          <div class="admin-profit-pagination">
            <div>共 ${formatNumber(total || 8175)} 条</div>
            <div class="admin-profit-page-size">
              <span>每页</span>
              <select class="admin-profit-size-select" data-action="profit-page-size">
                ${page.pageSizeOptions.map((size) => `<option value="${size}" ${state.pageSize === size ? "selected" : ""}>${size}</option>`).join("")}
              </select>
              <span>条</span>
            </div>
            <div class="admin-profit-pages">
              <button class="admin-profit-page-btn" type="button" data-action="profit-page-prev">‹</button>
              ${range(Math.min(totalPages, 6), (index) => {
                const pageNumber = index + 1;
                return `<button class="admin-profit-page-btn ${state.page === pageNumber ? "active" : ""}" type="button" data-action="profit-page-number" data-page="${pageNumber}">${pageNumber}</button>`;
              }).join("")}
              ${totalPages > 6 ? `<span class="admin-profit-page-btn ellipsis">…</span><button class="admin-profit-page-btn" type="button" data-action="profit-page-number" data-page="${totalPages}">${totalPages}</button>` : ""}
              <button class="admin-profit-page-btn" type="button" data-action="profit-page-next">›</button>
            </div>
            <div class="admin-profit-page-jump">
              <span>前往</span>
              <input class="admin-profit-page-input" type="text" value="${state.page}" readonly />
              <span>页</span>
            </div>
          </div>
        </div>
        ${renderPlayerProfitControlModal(state)}
      </section>
    `;
  }

  const roomOpsText = {
    section: "\u6e38\u620f\u7ba1\u7406",
    title: "\u98de\u673a\u623f\u95f4\u7ba1\u7406",
    countryCurrency: "\u56fd\u5bb6/\u5e01\u79cd",
    selectCountryCurrency: "\u8bf7\u9009\u62e9\u56fd\u5bb6/\u5e01\u79cd",
    searchCountryCurrency: "\u641c\u7d22\u56fd\u5bb6\u540d\u79f0 / \u5e01\u79cd\u4ee3\u7801",
    noMatchedCountryCurrency: "\u6ca1\u6709\u5339\u914d\u7684\u56fd\u5bb6/\u5e01\u79cd",
    addCountryCurrency: "+ \u6dfb\u52a0\u56fd\u5bb6\u5e01\u79cd",
    query: "\u67e5\u8be2",
    reset: "\u91cd\u7f6e",
    currentCountry: "\u5f53\u524d\u56fd\u5bb6",
    totalOnline: "\u603b\u5728\u7ebf\u4eba\u6570",
    todayWeightedRtp: "\u4eca\u65e5\u7efc\u5408RTP",
    totalInventory: "\u603b\u5e93\u5b58",
    createRoom: "\u521b\u5efa\u623f\u95f4",
    batchAdjustRtp: "\u6279\u91cf\u8c03\u6574RTP",
    exportData: "\u5bfc\u51fa\u6570\u636e",
    roomSelectedPrefix: "\u5df2\u9009\u62e9 ",
    roomSelectedSuffix: " \u4e2a\u623f\u95f4",
    roomSiteDetail: "\u623f\u95f4\u7ed1\u5b9a\u7ad9\u70b9\u660e\u7ec6",
    countrySiteDetail: "\u5168\u90e8\u623f\u95f4\u7ad9\u70b9\u660e\u7ec6",
    rowUnit: " \u6761",
    merchantId: "\u5546\u6237ID",
    siteId: "\u7ad9\u70b9ID",
    siteName: "\u5546\u6237\u540d\u79f0",
    roomNameColumn: "\u6240\u5c5e\u623f\u95f4",
    siteSearchPlaceholder: "\u641c\u7d22\u623f\u95f4 / \u7ad9\u70b9ID / \u5546\u6237ID",
    currentRtp: "\u5f53\u524dRTP",
    todayBet: "\u4eca\u65e5\u6295\u6ce8\u989d",
    todayProfit: "\u4eca\u65e5\u76c8\u5229",
    onlineUsers: "\u5728\u7ebf\u4eba\u6570",
    action: "\u64cd\u4f5c",
    adjustRtp: "\u8c03\u6574RTP",
    moveSite: "\u79fb\u52a8\u7ad9\u70b9",
    moveSiteTitle: "\u79fb\u52a8\u7ad9\u70b9",
    targetRoom: "\u76ee\u6807\u623f\u95f4",
    noTargetRooms: "\u6682\u65e0\u53ef\u79fb\u52a8\u7684\u5176\u4ed6\u623f\u95f4",
    noBoundSites: "\u5f53\u524d\u623f\u95f4\u6682\u65e0\u7ed1\u5b9a\u7ad9\u70b9",
    pageSize: "\u6bcf\u9875",
    prevPage: "\u4e0a\u4e00\u9875",
    nextPage: "\u4e0b\u4e00\u9875",
    assignSites: "\u5206\u914d\u7ad9\u70b9",
    delete: "\u5220\u9664",
    roomRtp: "\u623f\u95f4RTP",
    roomInventory: "\u623f\u95f4\u5e93\u5b58",
    boundSiteCount: "\u7ed1\u5b9a\u7ad9\u70b9\u6570",
    totalBet: "\u7d2f\u8ba1\u6295\u6ce8\u989d",
    unassigned: "\u672a\u5206\u914d",
    close: "\u5173\u95ed",
    assignNote: "\u540c\u4e00\u7ad9\u70b9\u4ec5\u80fd\u5f52\u5c5e\u4e00\u4e2a\u623f\u95f4\uff1b\u7ad9\u70b9\u79fb\u5165\u540e\u9ed8\u8ba4\u540c\u6b65\u5f53\u524d\u623f\u95f4 RTP\u3002",
    searchSite: "\u6309\u7ad9\u70b9 ID / \u540d\u79f0\u641c\u7d22",
    availableSites: "\u53ef\u5206\u914d\u7ad9\u70b9",
    noAvailableSites: "\u6ca1\u6709\u53ef\u5206\u914d\u7ad9\u70b9",
    moveIn: "\u79fb\u5165",
    moveOut: "\u79fb\u51fa",
    currentRoomSites: "\u5f53\u524d\u623f\u95f4\u7ad9\u70b9",
    noCurrentRoomSites: "\u5f53\u524d\u623f\u95f4\u6682\u65e0\u7ad9\u70b9",
    createRoomTitle: "\u521b\u5efa\u623f\u95f4",
    roomName: "\u623f\u95f4\u540d\u79f0",
    initialInventory: "\u521d\u59cb\u5e93\u5b58",
    inheritCurrency: "\u9ed8\u8ba4\u7ee7\u627f\u5f53\u524d\u56fd\u5bb6\u5e01\u79cd\uff1a",
    cancel: "\u53d6\u6d88",
    confirmCreate: "\u786e\u8ba4\u521b\u5efa",
    editRoomRtp: "\u8c03\u6574\u623f\u95f4RTP",
    editRoomRtpBatch: "\u6279\u91cf\u8c03\u6574RTP",
    rtpRange: "RTP \u8303\u56f4 90% - 99%",
    confirmAdjust: "\u786e\u8ba4\u8c03\u6574",
    editSiteRtp: "\u8c03\u6574\u7ad9\u70b9RTP",
    siteRtpNote:
      "\u7ad9\u70b9\u5355\u72ec RTP \u7684\u4f18\u5148\u7ea7\u9ad8\u4e8e\u6240\u5c5e\u623f\u95f4 RTP\uff1b\u7559\u7a7a\u5219\u6062\u590d\u7ee7\u627f\u623f\u95f4 RTP\u3002",
    addCountryTitle: "\u6dfb\u52a0\u56fd\u5bb6\u5e01\u79cd",
    createCountry: "\u521b\u5efa\u56fd\u5bb6",
    countryName: "\u56fd\u5bb6\u540d\u79f0",
    currencyCode: "3\u4f4d\u5927\u5199\u5e01\u79cd\u4ee3\u7801",
    currencySymbol: "\u5e01\u79cd\u7b26\u53f7",
    confirmAdd: "\u786e\u8ba4\u6dfb\u52a0",
    emptyNeedCountry: "\u8bf7\u5148\u9009\u62e9\u56fd\u5bb6/\u5e01\u79cd\u67e5\u770b\u5bf9\u5e94\u623f\u95f4\u6570\u636e",
    emptyNoRooms: "\u5f53\u524d\u56fd\u5bb6\u6682\u65e0\u623f\u95f4\uff0c\u8bf7\u70b9\u51fb\u4e0a\u65b9\u300c\u521b\u5efa\u623f\u95f4\u300d\u6309\u94ae\u6dfb\u52a0",
    toastFillCountry: "\u8bf7\u586b\u5199\u56fd\u5bb6\u540d\u79f0\u548c 3 \u4f4d\u5927\u5199\u5e01\u79cd\u4ee3\u7801",
    toastDuplicateCode: "\u8be5\u5e01\u79cd\u4ee3\u7801\u5df2\u5b58\u5728\uff0c\u8bf7\u66f4\u6362\u540e\u91cd\u8bd5",
    toastCountryAdded: "\u56fd\u5bb6\u5e01\u79cd\u5df2\u6dfb\u52a0",
    toastRoomCreated: "\u623f\u95f4\u5df2\u521b\u5efa",
    toastNeedRoom: "\u8bf7\u5148\u52fe\u9009\u623f\u95f4",
    toastRoomRtpUpdated: "\u623f\u95f4 RTP \u5df2\u66f4\u65b0",
    toastSiteRtpUpdated: "\u7ad9\u70b9 RTP \u5df2\u66f4\u65b0",
    toastSiteMoved: "\u7ad9\u70b9\u5df2\u79fb\u52a8",
    toastNeedSite: "\u8bf7\u5148\u9009\u62e9\u7ad9\u70b9",
    toastNeedTargetRoom: "\u8bf7\u5148\u9009\u62e9\u76ee\u6807\u623f\u95f4",
    toastMoveInPrefix: "\u5df2\u79fb\u5165 ",
    toastMoveOutPrefix: "\u5df2\u79fb\u51fa ",
    toastSiteCountSuffix: " \u4e2a\u7ad9\u70b9",
    toastRoomDeleted: "\u623f\u95f4\u5df2\u5220\u9664\uff0c\u7ad9\u70b9\u5df2\u89e3\u7ed1",
    toastExportDone: "\u5bfc\u51fa\u5b8c\u6210",
    confirmAddCountryPrefix: "\u786e\u8ba4\u6dfb\u52a0\u56fd\u5bb6\u5e01\u79cd ",
    confirmSuffix: " \u5417\uff1f",
    confirmCreateRoom: "\u786e\u8ba4\u521b\u5efa\u8be5\u623f\u95f4\u5417\uff1f",
    confirmAdjustRooms: "\u786e\u8ba4\u8c03\u6574\u9009\u4e2d\u623f\u95f4 RTP \u5417\uff1f",
    confirmAdjustSite: "\u786e\u8ba4\u8c03\u6574\u8be5\u7ad9\u70b9 RTP \u5417\uff1f",
    confirmMoveSite: "\u786e\u8ba4\u79fb\u52a8\u8be5\u7ad9\u70b9\u5417\uff1f",
    confirmMoveInPrefix: "\u786e\u8ba4\u79fb\u5165 ",
    confirmMoveOutPrefix: "\u786e\u8ba4\u79fb\u51fa ",
    confirmDeleteRoom: "\u786e\u8ba4\u5220\u9664\u8be5\u623f\u95f4\u5e76\u89e3\u7ed1\u5176\u4e0b\u6240\u6709\u7ad9\u70b9\u5417\uff1f",
    confirmExportPrefix: "\u786e\u8ba4\u5bfc\u51fa ",
    confirmExportSuffix: " \u7684\u623f\u95f4\u6570\u636e\u5417\uff1f",
  };

  function buildFlightRoomOpsData() {
    const createSite = (id, name, todayBet, todayProfit, online, overrideRtp = "", merchantId = "") => ({
      merchantId: merchantId || `M${id}`,
      id,
      name,
      todayBet,
      todayProfit,
      online,
      overrideRtp,
    });
    const createRoom = (id, code, name, rtp, inventory, sites = []) => ({ id, code, name, rtp, inventory, sites });
    const createCountry = (country, code, symbol, rooms = [], unassignedSites = []) => ({ country, code, symbol, rooms, unassignedSites });
    const indiaRooms = [
      createRoom("inr-room-001", "INR-\u623f\u95f4001", "\u65b0\u624b\u623f", 95, 1000000, [
        createSite("1001", "\u5370\u5ea6\u7ad9\u70b9A", 1250000, 120000, 320),
        createSite("1002", "\u5370\u5ea6\u7ad9\u70b9B", 860000, -64000, 188, "94.80"),
      ]),
      createRoom("inr-room-002", "INR-\u623f\u95f4002", "\u6807\u51c6\u623f", 95.2, 1000000, [
        createSite("1003", "\u5370\u5ea6\u7ad9\u70b9C", 910000, 86000, 256),
        createSite("1004", "\u5370\u5ea6\u7ad9\u70b9D", 760000, 54000, 196),
      ]),
      ...range(18, (index) => {
        const roomIndex = index + 3;
        const roomNo = String(roomIndex).padStart(3, "0");
        const baseBet = 540000 + index * 62000;
        const roomRtp = Number((94.9 + (index % 6) * 0.07).toFixed(2));
        return createRoom(`inr-room-${roomNo}`, `INR-\u623f\u95f4${roomNo}`, `\u623f\u95f4${roomNo}`, roomRtp, 1000000 + index * 222222, [
          createSite(
            `1${roomNo}1`,
            `\u5370\u5ea6\u7ad9\u70b9${String.fromCharCode(69 + index * 2)}`,
            baseBet,
            index % 3 === 0 ? 42000 + index * 2200 : -18000 + index * 1600,
            110 + (index % 7) * 23,
            index % 4 === 0 ? Number((roomRtp - 0.18).toFixed(2)).toFixed(2) : "",
          ),
          createSite(
            `1${roomNo}2`,
            `\u5370\u5ea6\u7ad9\u70b9${String.fromCharCode(70 + index * 2)}`,
            baseBet + 185000,
            index % 2 === 0 ? 26000 + index * 1700 : -9000 + index * 1400,
            90 + (index % 5) * 19,
          ),
        ]);
      }),
    ];
    return {
      countries: [
        createCountry("\u5370\u5ea6", "INR", "\u20b9", indiaRooms, [createSite("1005", "\u5370\u5ea6\u7ad9\u70b9E", 420000, 26000, 108)]),
        createCountry("\u5370\u5c3c", "IDR", "Rp", [
          createRoom("idr-room-001", "IDR-\u623f\u95f4001", "\u6807\u51c6\u623f", 95, 1000000, [
            createSite("3001", "\u5370\u5c3c\u7ad9\u70b9A", 268000000, 22400000, 412),
          ]),
        ], [createSite("3002", "\u5370\u5c3c\u7ad9\u70b9B", 108000000, 7200000, 144)]),
        createCountry("\u5df4\u897f", "BRL", "R$", [
          createRoom("brl-room-001", "BRL-\u623f\u95f4001", "\u6d3b\u52a8\u623f", 95.6, 1000000, [
            createSite("4001", "\u5df4\u897f\u7ad9\u70b9A", 348000, 42000, 162),
          ]),
        ], [createSite("4002", "\u5df4\u897f\u7ad9\u70b9B", 192000, 12000, 88)]),
        createCountry("\u6cf0\u56fd", "THB", "\u0e3f", [], []),
        createCountry("\u7f8e\u56fd", "USD", "$", [
          createRoom("usd-room-001", "USD-\u623f\u95f4001", "VIP \u623f", 95.4, 1000000, [
            createSite("2001", "\u7f8e\u56fd\u7ad9\u70b9A", 860000, 84000, 188),
            createSite("2002", "\u7f8e\u56fd\u7ad9\u70b9B", 640000, -26000, 136, "94.60"),
          ]),
        ], [createSite("2003", "\u7f8e\u56fd\u7ad9\u70b9C", 380000, 12000, 92)]),
      ],
    };
  }

  if (pageConfigs["flight-room-manage"].type === "roomOps") {
    pageConfigs["flight-room-manage"].opsData = buildFlightRoomOpsData();
    pageConfigs["flight-room-manage"].defaultPageSize = 100;
    pageConfigs["flight-room-manage"].pageSizeOptions = [50, 100, 500, 1000];
    pageConfigs["flight-room-manage"].section = roomOpsText.section;
    pageConfigs["flight-room-manage"].title = roomOpsText.title;
  }

  function renderCurrencySelector(page, state) {
    const countries = getOrderedCurrencies(page, state);
    const hasCountry = countries.length > 0;
    return `
      <section class="ops-filter-bar ops-filter-bar-compact">
        <div class="ops-country-picker">
          <label>${roomOpsText.countryCurrency}</label>
          <div class="ops-country-chip-row">
            ${
              countries.length
                ? countries
                    .map(
                      (country) => `
                        <button
                          type="button"
                          class="ops-country-chip${state.pendingCountryCode === country.code ? " active" : ""}"
                          draggable="true"
                          data-currency-code="${escapeHtml(country.code)}"
                          data-action="country-select"
                          data-country-code="${escapeHtml(country.code)}"
                        >
                          <span>${escapeHtml(getRoomOpsCountryOptionLabel(country))}</span>
                          <em>${escapeHtml(country.symbol || "")}</em>
                        </button>
                      `,
                    )
                    .join("")
                : `<div class="ops-room-empty">${roomOpsText.noMatchedCountryCurrency}</div>`
            }
            <button type="button" class="ops-country-action ops-country-create" data-action="country-add-open">${roomOpsText.createCountry}</button>
            <button type="button" class="ops-country-action ops-room-create-top" data-action="room-create-open"${hasCountry ? "" : " disabled"}>${roomOpsText.createRoom}</button>
          </div>
        </div>
      </section>
    `;
  }

  function renderRoomOpsSummary(country) {
    const summary = getRoomOpsSummary(country);
    return `
      <section class="ops-summary-grid">
        <article class="ops-summary-card">
          <span>${roomOpsText.currentCountry}</span>
          <strong>${escapeHtml(getRoomOpsCountryOptionLabel(country))}</strong>
        </article>
        <article class="ops-summary-card">
          <span>${roomOpsText.totalOnline}</span>
          <strong>${formatNumber(summary.totalOnline)}</strong>
        </article>
        <article class="ops-summary-card">
          <span>${roomOpsText.todayWeightedRtp}</span>
          <strong>${summary.weightedRtp.toFixed(2)}%</strong>
        </article>
        <article class="ops-summary-card">
          <span>${roomOpsText.totalInventory}</span>
          <strong>${formatRoomOpsMoney(summary.totalInventory, country)}</strong>
        </article>
      </section>
    `;
  }

  function renderRoomOpsToolbar(state) {
    const selectedCount = Object.keys(state.selectedRoomIds || {}).filter((key) => state.selectedRoomIds[key]).length;
    return `
      <section class="ops-toolbar ops-room-toolbar">
        <button type="button" class="primary" data-action="room-create-open">${roomOpsText.createRoom}</button>
        <div class="ops-toolbar-actions">
          <button type="button" data-action="room-bulk-rtp-open">${roomOpsText.batchAdjustRtp}</button>
          <button type="button" data-action="room-export">${roomOpsText.exportData}</button>
        </div>
        <span class="ops-toolbar-hint">${roomOpsText.roomSelectedPrefix}${formatNumber(selectedCount)}${roomOpsText.roomSelectedSuffix}</span>
      </section>
    `;
  }

  function renderRoomOpsSiteTable(room, country, state) {
    const pageSize = Number(state.pageSize || 100);
    const currentPage = Math.max(1, state.roomPages?.[room.id] || 1);
    const totalPages = Math.max(1, Math.ceil(room.sites.length / pageSize));
    const page = Math.min(currentPage, totalPages);
    const sites = room.sites.slice((page - 1) * pageSize, page * pageSize);
    return `
      <div class="ops-room-site-panel">
        <div class="ops-room-site-header">
          <strong>${roomOpsText.roomSiteDetail}</strong>
          <span>${formatNumber(room.sites.length)}${roomOpsText.rowUnit}</span>
        </div>
        <div class="ops-room-site-table-wrap">
          <table class="ops-room-site-table">
            <thead>
              <tr>
                <th>${roomOpsText.merchantId}</th>
                <th>${roomOpsText.siteId}</th>
                <th>${roomOpsText.siteName}</th>
                <th>${roomOpsText.currentRtp}</th>
                <th>${roomOpsText.todayBet}</th>
                <th>${roomOpsText.todayProfit}</th>
                <th>${roomOpsText.onlineUsers}</th>
              </tr>
            </thead>
            <tbody>
              ${
                sites.length
                  ? sites
                      .map((site) => {
                        const mismatch = Number(getRoomOpsSiteRtp(site, room)) !== Number(Number(room.rtp).toFixed(2));
                        return `
                          <tr>
                            <td class="mono">${escapeHtml(site.merchantId || "")}</td>
                            <td class="mono">${escapeHtml(site.id)}</td>
                            <td>${escapeHtml(site.name)}</td>
                            <td><span class="${mismatch ? "rtp-warning" : ""}">${getRoomOpsSiteRtp(site, room)}%</span></td>
                            <td>${formatRoomOpsMoney(site.todayBet, country)}</td>
                            <td class="${site.todayProfit >= 0 ? "profit-up" : "profit-down"}">${formatRoomOpsMoney(site.todayProfit, country)}</td>
                            <td>${formatNumber(site.online)}</td>
                          </tr>
                        `;
                      })
                      .join("")
                  : `<tr><td colspan="7" class="ops-room-empty">${roomOpsText.noBoundSites}</td></tr>`
              }
            </tbody>
          </table>
        </div>
        <div class="pagination-bar room-ops-pagination">
          <div class="page-size-select">
            <span>${roomOpsText.pageSize}</span>
            <select data-action="page-size">
              ${(pageConfigs["flight-room-manage"].pageSizeOptions || [])
                .map((option) => `<option value="${option}"${pageSize === option ? " selected" : ""}>${option}</option>`)
                .join("")}
            </select>
          </div>
          <div class="pager">
            <button class="pager-btn" type="button" data-action="room-page" data-room-id="${room.id}" data-page="${Math.max(page - 1, 1)}"${
              page <= 1 ? " disabled" : ""
            }>${roomOpsText.prevPage}</button>
            <span class="pager-summary">${page} / ${totalPages}</span>
            <button class="pager-btn" type="button" data-action="room-page" data-room-id="${room.id}" data-page="${Math.min(page + 1, totalPages)}"${
              page >= totalPages ? " disabled" : ""
            }>${roomOpsText.nextPage}</button>
          </div>
        </div>
      </div>
    `;
  }

  function renderRoomOpsCountrySiteTable(country, state) {
    const pageSize = Number(state.pageSize || 100);
    const pageKey = "__all-room-sites__";
    const keyword = (state.roomFilters?.siteSearch || "").trim().toLowerCase();
    const allSites = (country.rooms || []).flatMap((room) =>
      room.sites.map((site) => ({
        ...site,
        roomId: room.id,
        roomName: room.name,
        roomCode: room.code,
        roomRtp: room.rtp,
      })),
    );
    const filteredSites = allSites.filter((site) => {
      if (!keyword) return true;
      return [
        site.merchantId,
        site.id,
        site.roomName,
        site.roomCode,
      ].some((value) => String(value || "").toLowerCase().includes(keyword));
    });
    const currentPage = Math.max(1, state.roomPages?.[pageKey] || 1);
    const totalPages = Math.max(1, Math.ceil(filteredSites.length / pageSize));
    const page = Math.min(currentPage, totalPages);
    const sites = filteredSites.slice((page - 1) * pageSize, page * pageSize);
    return `
      <section class="ops-room-site-panel ops-room-site-panel-global">
        <div class="ops-room-site-header">
          <strong>${roomOpsText.countrySiteDetail}</strong>
          <span>${formatNumber(filteredSites.length)}${roomOpsText.rowUnit}</span>
        </div>
        <div class="ops-room-site-toolbar">
          <input
            type="text"
            value="${escapeHtml(state.roomFilters?.siteSearch || "")}"
            placeholder="${roomOpsText.siteSearchPlaceholder}"
            data-room-filter="siteSearch"
          />
        </div>
        <div class="ops-room-site-table-wrap">
          <table class="ops-room-site-table">
            <thead>
              <tr>
                <th>${roomOpsText.merchantId}</th>
                <th>${roomOpsText.siteId}</th>
                <th>${roomOpsText.siteName}</th>
                <th>${roomOpsText.roomNameColumn}</th>
                <th>${roomOpsText.currentRtp}</th>
                <th>${roomOpsText.todayBet}</th>
                <th>${roomOpsText.todayProfit}</th>
                <th>${roomOpsText.onlineUsers}</th>
                <th>${roomOpsText.action}</th>
              </tr>
            </thead>
            <tbody>
              ${
                sites.length
                  ? sites
                      .map((site) => {
                        const mismatch = Number(site.overrideRtp || site.roomRtp).toFixed(2) !== Number(site.roomRtp).toFixed(2);
                        return `
                          <tr>
                            <td class="mono">${escapeHtml(site.merchantId || "")}</td>
                            <td class="mono">${escapeHtml(site.id)}</td>
                            <td>${escapeHtml(site.name)}</td>
                            <td>${escapeHtml(site.roomName)} <span class="ops-room-site-roomcode">${escapeHtml(site.roomCode)}</span></td>
                            <td><span class="${mismatch ? "rtp-warning" : ""}">${Number(site.overrideRtp || site.roomRtp).toFixed(2)}%</span></td>
                            <td>${formatRoomOpsMoney(site.todayBet, country)}</td>
                            <td class="${site.todayProfit >= 0 ? "profit-up" : "profit-down"}">${formatRoomOpsMoney(site.todayProfit, country)}</td>
                            <td>${formatNumber(site.online)}</td>
                            <td>
                              <button
                                type="button"
                                data-action="site-move-open"
                                data-room-id="${site.roomId}"
                                data-site-id="${site.id}"
                                ${country.rooms.length > 1 ? "" : "disabled"}
                              >${roomOpsText.moveSite}</button>
                            </td>
                          </tr>
                        `;
                      })
                      .join("")
                  : `<tr><td colspan="9" class="ops-room-empty">${roomOpsText.noBoundSites}</td></tr>`
              }
            </tbody>
          </table>
        </div>
        <div class="pagination-bar room-ops-pagination">
          <div class="page-size-select">
            <span>${roomOpsText.pageSize}</span>
            <select data-action="page-size">
              ${(pageConfigs["flight-room-manage"].pageSizeOptions || [])
                .map((option) => `<option value="${option}"${pageSize === option ? " selected" : ""}>${option}</option>`)
                .join("")}
            </select>
          </div>
          <div class="pager">
            <button class="pager-btn" type="button" data-action="room-page" data-room-id="${pageKey}" data-page="${Math.max(page - 1, 1)}"${
              page <= 1 ? " disabled" : ""
            }>${roomOpsText.prevPage}</button>
            <span class="pager-summary">${page} / ${totalPages}</span>
            <button class="pager-btn" type="button" data-action="room-page" data-room-id="${pageKey}" data-page="${Math.min(page + 1, totalPages)}"${
              page >= totalPages ? " disabled" : ""
            }>${roomOpsText.nextPage}</button>
          </div>
        </div>
      </section>
    `;
  }

  function renderRoomOpsCards(country, state) {
    return country.rooms
      .map((room) => {
        const metrics = getRoomOpsMetrics(room);
        return `
          <article class="ops-room-card light${state.selectedRoomId === room.id ? " active" : ""}">
            <div class="ops-room-card-top">
              <div class="ops-room-heading" data-action="room-expand" data-room-id="${room.id}">
                <strong>${escapeHtml(room.name)}</strong>
                <span>${escapeHtml(room.code)}</span>
              </div>
              <span class="ops-room-site-badge">${formatNumber(metrics.siteCount)}${roomOpsText.rowUnit}</span>
            </div>
            <div class="ops-room-kpi-list" data-action="room-expand" data-room-id="${room.id}">
              <div class="ops-room-kpi-row">
                <span>${roomOpsText.roomRtp}：</span>
                <strong>${Number(room.rtp).toFixed(2)}%</strong>
              </div>
              <div class="ops-room-kpi-row">
                <span>${roomOpsText.onlineUsers}：</span>
                <strong>${formatNumber(metrics.online)}</strong>
              </div>
              <div class="ops-room-kpi-row">
                <span>${roomOpsText.roomInventory}：</span>
                <strong>${formatRoomOpsPlainMoney(room.inventory)}</strong>
              </div>
              <div class="ops-room-kpi-row">
                <span>${roomOpsText.totalBet}：</span>
                <strong>${formatRoomOpsPlainMoney(metrics.todayBet)}</strong>
              </div>
            </div>
            <div class="ops-room-card-actions inline">
              <button type="button" data-action="room-rtp-open" data-room-id="${room.id}">${roomOpsText.adjustRtp}</button>
              <button type="button" data-action="room-assign-open" data-room-id="${room.id}">${roomOpsText.assignSites}</button>
              <button type="button" class="danger" data-action="room-delete" data-room-id="${room.id}">${roomOpsText.delete}</button>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function renderRoomOpsAssignModal(state, country, room) {
    const modal = state.modal || {};
    const query = (modal.search || "").trim().toLowerCase();
    const sourcePool = country.rooms
      .filter((item) => item.id !== room.id)
      .flatMap((item) => item.sites.map((site) => ({ ...site, sourceRoomCode: item.code })))
      .concat(country.unassignedSites.map((site) => ({ ...site, sourceRoomCode: roomOpsText.unassigned })));
    const sourceSites = sourcePool.filter((site) => !query || site.id.toLowerCase().includes(query) || site.name.toLowerCase().includes(query));
    const targetSites = room.sites.filter((site) => !query || site.id.toLowerCase().includes(query) || site.name.toLowerCase().includes(query));
    return `
      <div class="ops-modal-backdrop">
        <div class="ops-modal ops-modal-wide">
          <div class="ops-modal-head">
            <div>
              <h2>${roomOpsText.assignSites}</h2>
              <p>${escapeHtml(room.name)} / ${escapeHtml(room.code)}</p>
            </div>
            <button type="button" data-action="room-modal-close">${roomOpsText.close}</button>
          </div>
          <div class="ops-modal-note">${roomOpsText.assignNote}</div>
          <div class="ops-transfer-search">
            <input type="text" value="${escapeHtml(modal.search || "")}" placeholder="${roomOpsText.searchSite}" data-room-modal-search />
          </div>
          <div class="ops-transfer-layout">
            <section class="ops-transfer-panel">
              <header>${roomOpsText.availableSites}</header>
              <div class="ops-transfer-list">
                ${
                  sourceSites.length
                    ? sourceSites
                        .map(
                          (site) => `
                            <label class="ops-transfer-item">
                              <input type="checkbox" data-assign-side="source" data-site-id="${site.id}" ${
                                state.modal?.selectedSourceSiteIds?.[site.id] ? "checked" : ""
                              } />
                              <span>
                                <strong>${escapeHtml(site.id)} / ${escapeHtml(site.name)}</strong>
                                <em>${escapeHtml(site.sourceRoomCode)} | ${formatRoomOpsMoney(site.todayBet, country)}</em>
                              </span>
                            </label>
                          `,
                        )
                        .join("")
                    : `<div class="ops-room-empty">${roomOpsText.noAvailableSites}</div>`
                }
              </div>
            </section>
            <div class="ops-transfer-actions">
              <button type="button" data-action="assign-move-in" data-room-id="${room.id}">${roomOpsText.moveIn}</button>
              <button type="button" data-action="assign-move-out" data-room-id="${room.id}">${roomOpsText.moveOut}</button>
            </div>
            <section class="ops-transfer-panel">
              <header>${roomOpsText.currentRoomSites}</header>
              <div class="ops-transfer-list">
                ${
                  targetSites.length
                    ? targetSites
                        .map(
                          (site) => `
                            <label class="ops-transfer-item">
                              <input type="checkbox" data-assign-side="target" data-site-id="${site.id}" ${
                                state.modal?.selectedTargetSiteIds?.[site.id] ? "checked" : ""
                              } />
                              <span>
                                <strong>${escapeHtml(site.id)} / ${escapeHtml(site.name)}</strong>
                                <em>${getRoomOpsSiteRtp(site, room)}% | ${formatRoomOpsMoney(site.todayBet, country)}</em>
                              </span>
                            </label>
                          `,
                        )
                        .join("")
                    : `<div class="ops-room-empty">${roomOpsText.noCurrentRoomSites}</div>`
                }
              </div>
            </section>
          </div>
        </div>
      </div>
    `;
  }

  function renderRoomOpsModal(page, state, country) {
    const modal = state.modal || null;
    if (!modal) return "";
    if (modal.type === "create-room") {
      const nextIndex = getNextRoomSequence(country);
      return `
        <div class="ops-modal-backdrop">
          <div class="ops-modal">
            <div class="ops-modal-head">
              <h2>${roomOpsText.createRoomTitle}</h2>
              <button type="button" data-action="room-modal-close">${roomOpsText.close}</button>
            </div>
            <div class="ops-modal-field">
              <span>${roomOpsText.roomName}</span>
              <input type="text" value="${escapeHtml(modal.roomName || `${country.code}-\u623f\u95f4${nextIndex}`)}" data-room-form="roomName" />
            </div>
            <div class="ops-modal-grid">
              <label class="ops-modal-field">
                <span>${roomOpsText.roomRtp}</span>
                <input type="number" min="90" max="99" step="0.01" value="${escapeHtml(modal.roomRtp || "95.00")}" data-room-form="roomRtp" />
              </label>
              <label class="ops-modal-field">
                <span>${roomOpsText.initialInventory}</span>
                <input type="number" min="0" step="0.01" value="${escapeHtml(modal.roomInventory || "1000000.00")}" data-room-form="roomInventory" />
              </label>
            </div>
            <div class="ops-modal-note">${roomOpsText.inheritCurrency} ${escapeHtml(country?.symbol || "")} ${escapeHtml(country?.code || "")}</div>
            <div class="ops-modal-actions">
              <button type="button" data-action="room-modal-close">${roomOpsText.cancel}</button>
              <button type="button" class="primary" data-action="room-create-submit">${roomOpsText.confirmCreate}</button>
            </div>
          </div>
        </div>
      `;
    }
    if (modal.type === "edit-room-rtp") {
      return `
        <div class="ops-modal-backdrop">
          <div class="ops-modal">
            <div class="ops-modal-head">
              <h2>${modal.roomIds?.length > 1 ? roomOpsText.editRoomRtpBatch : roomOpsText.editRoomRtp}</h2>
              <button type="button" data-action="room-modal-close">${roomOpsText.close}</button>
            </div>
            <div class="ops-modal-field">
              <span>${roomOpsText.rtpRange}</span>
              <input type="number" min="90" max="99" step="0.01" value="${escapeHtml(modal.value || "95.00")}" data-room-form="roomRtpValue" />
            </div>
            <div class="ops-modal-actions">
              <button type="button" data-action="room-modal-close">${roomOpsText.cancel}</button>
              <button type="button" class="primary" data-action="room-rtp-save">${roomOpsText.confirmAdjust}</button>
            </div>
          </div>
        </div>
      `;
    }
    if (modal.type === "edit-site-rtp") {
      const room = getRoomOpsRoom(country, modal.roomId);
      const site = room?.sites.find((item) => item.id === modal.siteId);
      return `
        <div class="ops-modal-backdrop">
          <div class="ops-modal">
            <div class="ops-modal-head">
              <h2>${roomOpsText.editSiteRtp}</h2>
              <button type="button" data-action="room-modal-close">${roomOpsText.close}</button>
            </div>
            <div class="ops-modal-note">${roomOpsText.siteRtpNote}</div>
            <div class="ops-modal-field">
              <span>${escapeHtml(site?.id || "")} / ${escapeHtml(site?.name || "")}</span>
              <input type="number" min="90" max="99" step="0.01" value="${escapeHtml(modal.value || site?.overrideRtp || "")}" data-room-form="siteRtpValue" />
            </div>
            <div class="ops-modal-actions">
              <button type="button" data-action="room-modal-close">${roomOpsText.cancel}</button>
              <button type="button" class="primary" data-action="site-rtp-save">${roomOpsText.confirmAdjust}</button>
            </div>
          </div>
        </div>
      `;
    }
    if (modal.type === "assign-sites") {
      const room = getRoomOpsRoom(country, modal.roomId);
      return room ? renderRoomOpsAssignModal(state, country, room) : "";
    }
    if (modal.type === "add-country") {
      return `
        <div class="ops-modal-backdrop">
          <div class="ops-modal">
            <div class="ops-modal-head">
              <h2>${roomOpsText.addCountryTitle}</h2>
              <button type="button" data-action="room-modal-close">${roomOpsText.close}</button>
            </div>
            <div class="ops-modal-field">
              <span>${roomOpsText.countryName}</span>
              <input type="text" value="${escapeHtml(modal.countryName || "")}" data-room-form="countryName" />
            </div>
            <div class="ops-modal-grid">
              <label class="ops-modal-field">
                <span>${roomOpsText.currencyCode}</span>
                <input type="text" value="${escapeHtml(modal.countryCode || "")}" maxlength="3" data-room-form="countryCode" />
              </label>
              <label class="ops-modal-field">
                <span>${roomOpsText.currencySymbol}</span>
                <input type="text" value="${escapeHtml(modal.countrySymbol || "")}" data-room-form="countrySymbol" />
              </label>
            </div>
            <div class="ops-modal-actions">
              <button type="button" data-action="room-modal-close">${roomOpsText.cancel}</button>
              <button type="button" class="primary" data-action="country-add-submit">${roomOpsText.confirmAdd}</button>
            </div>
          </div>
        </div>
      `;
    }
    return "";
  }

  function renderFlightRoomOpsPage(page, state) {
    const countries = getOrderedCurrencies(page, state);
    if (!state.activeCountryCode && countries[0]) {
      state.activeCountryCode = countries[0].code;
      state.pendingCountryCode = countries[0].code;
    } else if (!state.pendingCountryCode && state.activeCountryCode) {
      state.pendingCountryCode = state.activeCountryCode;
    }
    const country = getRoomOpsCountry(page, state);
    if (country && !state.selectedRoomId && country.rooms[0]) state.selectedRoomId = country.rooms[0].id;
    return `
      <section class="room-ops-page room-ops-page-light">
        <div class="page-heading room-ops-heading">
          <h1 class="page-title">${escapeHtml(page.title)}</h1>
          <div class="page-subtitle">${escapeHtml(page.section)} / ${escapeHtml(page.title)}</div>
        </div>
        ${
          !country
            ? `
              ${renderCurrencySelector(page, state)}
              <div class="ops-empty-state">${roomOpsText.emptyNeedCountry}</div>
            `
            : `
              ${renderRoomOpsSummary(country)}
              ${renderCurrencySelector(page, state)}
              ${
                country.rooms.length
                  ? `
                    <section class="ops-room-list-grid">${renderRoomOpsCards(country, state)}</section>
                    ${renderRoomOpsCountrySiteTable(country, state)}
                  `
                  : `<div class="ops-empty-state">${roomOpsText.emptyNoRooms}</div>`
              }
              ${renderRoomOpsModal(page, state, country)}
            `
        }
      </section>
    `;
  }

  function downloadRoomOpsExport(country) {
    const rows = [[
      roomOpsText.currentCountry,
      roomOpsText.countryCurrency,
      roomOpsText.roomName,
      roomOpsText.roomRtp,
      roomOpsText.roomInventory,
      roomOpsText.merchantId,
      roomOpsText.siteId,
      roomOpsText.siteName,
      roomOpsText.currentRtp,
      roomOpsText.todayBet,
      roomOpsText.todayProfit,
      roomOpsText.onlineUsers,
    ]];
    country.rooms.forEach((room) => {
      const sites = room.sites.length ? room.sites : [null];
      sites.forEach((site) => {
        rows.push([
          country.country,
          country.code,
          room.name,
          `${Number(room.rtp).toFixed(2)}%`,
          formatRoomOpsMoney(room.inventory, country),
          site?.merchantId || "",
          site?.id || "",
          site?.name || "",
          site ? `${getRoomOpsSiteRtp(site, room)}%` : "",
          site ? formatRoomOpsMoney(site.todayBet, country) : "",
          site ? formatRoomOpsMoney(site.todayProfit, country) : "",
          site ? formatNumber(site.online) : "",
        ]);
      });
    });
    const csv = `\uFEFF${rows
      .map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n")}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `plane-room-management-${country.code}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(link.href), 300);
  }

  function handleRootClick(event) {
    const actionTarget = event.target.closest("[data-action]");
    if (!actionTarget) return;
    const pageKey = getCurrentPageKey();
    const page = pageConfigs[pageKey];
    const state = getPageState(pageKey, page);
    const action = actionTarget.dataset.action;

    if (page.type === "merchantCreate") {
      if (action === "merchant-open-create") {
        state.modal = { ...cloneValue(page.formDefaults || {}), merchantCode: getMerchantCreateNextCode(page.merchantRows || []) };
        renderCurrentPage();
        return;
      }

      if (action === "merchant-modal-close") {
        state.modal = null;
        renderCurrentPage();
        return;
      }

      if (action === "merchant-modal-save") {
        const readValue = (key) => (document.querySelector(`[data-merchant-form="${key}"]`)?.value || "").trim();
        const merchantName = readValue("merchantName");
        const merchantCode = (readValue("merchantCode") || getMerchantCreateNextCode(page.merchantRows || [])).toUpperCase();
        const owner = readValue("owner");
        const walletMode = readValue("walletMode") || "单一钱包";
        const rate = readValue("rate") || "1.20%";
        const settlePeriod = readValue("settlePeriod") || "T+1";
        const callbackDomain = readValue("callbackDomain");
        const whiteIp = readValue("whiteIp");
        const lobbyUrl = readValue("lobbyUrl");
        const note = readValue("note");

        if (!merchantName || !merchantCode || !owner) {
          showToast("请填写商户名称、商户编号和负责人");
          return;
        }

        if ((page.merchantRows || []).some((row) => String(row.merchantCode || "").toUpperCase() === merchantCode)) {
          showToast("商户编号已存在，请更换后重试");
          return;
        }

        if (!window.confirm("确认创建该商户吗？")) return;

        page.merchantRows = page.merchantRows || [];
        page.merchantRows.unshift({
          merchantName,
          merchantCode,
          owner,
          walletMode,
          rate,
          settlePeriod,
          callbackDomain,
          whiteIp,
          lobbyUrl,
          note,
          status: "启用",
          statusTone: "success",
          createdAt: dateShift(0),
        });
        state.modal = null;
        state.page = 1;
        showToast("商户已创建");
        renderCurrentPage();
        return;
      }

      if (action === "page-prev") {
        state.page = Math.max(1, state.page - 1);
        renderCurrentPage();
        return;
      }

      if (action === "page-next") {
        const totalPages = Math.max(1, Math.ceil((page.merchantRows || []).length / state.pageSize));
        state.page = Math.min(totalPages, state.page + 1);
        renderCurrentPage();
        return;
      }

      if (action === "page-number") {
        state.page = Number(actionTarget.dataset.page || 1);
        renderCurrentPage();
        return;
      }
    }

    if (page.type === "roomOps") {
      const country = getRoomOpsCountry(page, state);

      if (action === "country-picker-toggle") {
        state.countryPickerOpen = !state.countryPickerOpen;
        renderCurrentPage();
        return;
      }

      if (action === "country-select") {
        state.pendingCountryCode = actionTarget.dataset.countryCode;
        state.activeCountryCode = state.pendingCountryCode;
        state.selectedRoomIds = {};
        state.expandedRooms = {};
        state.roomPages = {};
        const selected = page.opsData.countries.find((item) => item.code === state.pendingCountryCode);
        state.roomFilters.countryKeyword = selected ? getRoomOpsCountryOptionLabel(selected) : "";
        state.selectedRoomId = selected?.rooms?.[0]?.id || "";
        renderCurrentPage();
        return;
      }

      if (action === "country-add-open") {
        state.modal = { type: "add-country" };
        renderCurrentPage();
        return;
      }

      if (action === "site-move-open" && country) {
        state.modal = {
          type: "move-site",
          roomId: actionTarget.dataset.roomId,
          siteId: actionTarget.dataset.siteId,
          targetRoomId: "",
        };
        renderCurrentPage();
        return;
      }

      if (action === "room-expand") {
        const roomId = actionTarget.dataset.roomId;
        state.selectedRoomId = roomId;
        state.expandedRooms[roomId] = !state.expandedRooms[roomId];
        renderCurrentPage();
        return;
      }

      if (action === "room-page") {
        state.roomPages[actionTarget.dataset.roomId] = Number(actionTarget.dataset.page || 1);
        renderCurrentPage();
        return;
      }

      if (action === "room-create-open" && country) {
        state.modal = { type: "create-room" };
        renderCurrentPage();
        return;
      }

      if (action === "room-modal-close") {
        state.modal = null;
        renderCurrentPage();
        return;
      }

      if (action === "country-add-submit") {
        const countryName = (document.querySelector('[data-room-form="countryName"]')?.value || "").trim();
        const countryCode = ((document.querySelector('[data-room-form="countryCode"]')?.value || "").trim()).toUpperCase();
        const countrySymbol = (document.querySelector('[data-room-form="countrySymbol"]')?.value || "").trim();
        if (!countryName || !/^[A-Z]{3}$/.test(countryCode)) {
          showToast(roomOpsText.toastFillCountry);
          return;
        }
        if (page.opsData.countries.some((item) => item.code === countryCode)) {
          showToast(roomOpsText.toastDuplicateCode);
          return;
        }
        if (!window.confirm(`${roomOpsText.confirmAddCountryPrefix}${countryName}-${countryCode}${roomOpsText.confirmSuffix}`)) return;
        page.opsData.countries.push({ country: countryName, code: countryCode, symbol: countrySymbol, rooms: [], unassignedSites: [] });
        state.currencyOrder = [...new Set([...(state.currencyOrder || []), countryCode])];
        persistRoomOpsCountryOrder(state.currencyOrder);
        state.pendingCountryCode = countryCode;
        state.roomFilters.countryKeyword = `${countryName}-${countryCode}`;
        state.roomFilters.countrySearch = "";
        state.modal = null;
        state.countryPickerOpen = true;
        showToast(roomOpsText.toastCountryAdded);
        renderCurrentPage();
        return;
      }

      if (action === "room-create-submit" && country) {
        if (!window.confirm(roomOpsText.confirmCreateRoom)) return;
        const nextIndex = getNextRoomSequence(country);
        const roomName = (document.querySelector('[data-room-form="roomName"]')?.value || "").trim() || `${country.code}-\u623f\u95f4${nextIndex}`;
        const roomRtp = Number(document.querySelector('[data-room-form="roomRtp"]')?.value || 95);
        const roomInventory = Number(document.querySelector('[data-room-form="roomInventory"]')?.value || 1000000);
        const roomId = `${country.code.toLowerCase()}-room-${nextIndex}`;
        country.rooms.push({
          id: roomId,
          code: `${country.code}-\u623f\u95f4${nextIndex}`,
          name: roomName,
          rtp: Number(Math.min(99, Math.max(90, roomRtp)).toFixed(2)),
          inventory: Number(Math.max(0, roomInventory).toFixed(2)),
          sites: [],
        });
        state.modal = null;
        state.selectedRoomId = roomId;
        showToast(roomOpsText.toastRoomCreated);
        renderCurrentPage();
        return;
      }

      if (action === "room-rtp-open" && country) {
        const room = getRoomOpsRoom(country, actionTarget.dataset.roomId);
        state.modal = { type: "edit-room-rtp", roomIds: room ? [room.id] : [], value: room ? Number(room.rtp).toFixed(2) : "95.00" };
        renderCurrentPage();
        return;
      }

      if (action === "room-bulk-rtp-open" && country) {
        const selectedRoomIds = Object.keys(state.selectedRoomIds || {}).filter((key) => state.selectedRoomIds[key]);
        if (!selectedRoomIds.length) {
          showToast(roomOpsText.toastNeedRoom);
          return;
        }
        state.modal = { type: "edit-room-rtp", roomIds: selectedRoomIds, value: "95.00" };
        renderCurrentPage();
        return;
      }

      if (action === "room-rtp-save" && country) {
        if (!window.confirm(roomOpsText.confirmAdjustRooms)) return;
        const nextValue = Number(Math.min(99, Math.max(90, Number(document.querySelector('[data-room-form="roomRtpValue"]')?.value || 95))).toFixed(2));
        (state.modal?.roomIds || []).forEach((roomId) => {
          const room = getRoomOpsRoom(country, roomId);
          if (room) room.rtp = nextValue;
        });
        state.modal = null;
        showToast(roomOpsText.toastRoomRtpUpdated);
        renderCurrentPage();
        return;
      }

      if (action === "site-rtp-open") {
        state.modal = { type: "edit-site-rtp", roomId: actionTarget.dataset.roomId, siteId: actionTarget.dataset.siteId };
        renderCurrentPage();
        return;
      }

      if (action === "site-rtp-save" && country) {
        if (!window.confirm(roomOpsText.confirmAdjustSite)) return;
        const modal = state.modal || {};
        const room = getRoomOpsRoom(country, modal.roomId);
        const site = room?.sites.find((item) => item.id === modal.siteId);
        if (site) {
          const raw = (document.querySelector('[data-room-form="siteRtpValue"]')?.value || "").trim();
          site.overrideRtp = raw ? Number(Math.min(99, Math.max(90, Number(raw)))).toFixed(2) : "";
        }
        state.modal = null;
        showToast(roomOpsText.toastSiteRtpUpdated);
        renderCurrentPage();
        return;
      }

      if (action === "site-move-save" && country) {
        const modal = state.modal || {};
        const targetRoomId = (document.querySelector('[data-room-form="targetRoomId"]')?.value || "").trim();
        if (!targetRoomId) {
          showToast(roomOpsText.toastNeedTargetRoom);
          return;
        }
        if (!window.confirm(roomOpsText.confirmMoveSite)) return;
        const moved = moveSitesIntoRoom(country, targetRoomId, [modal.siteId]);
        state.modal = null;
        showToast(moved ? roomOpsText.toastSiteMoved : roomOpsText.toastNeedSite);
        renderCurrentPage();
        return;
      }

      if (action === "room-assign-open" && country) {
        state.modal = { type: "assign-sites", roomId: actionTarget.dataset.roomId, search: "", selectedSourceSiteIds: {}, selectedTargetSiteIds: {} };
        renderCurrentPage();
        return;
      }

      if (action === "assign-move-in" && country) {
        const selectedIds = Object.keys(state.modal?.selectedSourceSiteIds || {}).filter((key) => state.modal.selectedSourceSiteIds[key]);
        if (!selectedIds.length) {
          showToast(roomOpsText.toastNeedSite);
          return;
        }
        if (!window.confirm(`${roomOpsText.confirmMoveInPrefix}${selectedIds.length}${roomOpsText.toastSiteCountSuffix}${roomOpsText.confirmSuffix}`)) return;
        const moved = moveSitesIntoRoom(country, actionTarget.dataset.roomId, selectedIds);
        state.modal = { ...state.modal, selectedSourceSiteIds: {}, selectedTargetSiteIds: {} };
        showToast(`${roomOpsText.toastMoveInPrefix}${moved}${roomOpsText.toastSiteCountSuffix}`);
        renderCurrentPage();
        return;
      }

      if (action === "assign-move-out" && country) {
        const selectedIds = Object.keys(state.modal?.selectedTargetSiteIds || {}).filter((key) => state.modal.selectedTargetSiteIds[key]);
        if (!selectedIds.length) {
          showToast(roomOpsText.toastNeedSite);
          return;
        }
        if (!window.confirm(`${roomOpsText.confirmMoveOutPrefix}${selectedIds.length}${roomOpsText.toastSiteCountSuffix}${roomOpsText.confirmSuffix}`)) return;
        const moved = moveSitesOutOfRoom(country, actionTarget.dataset.roomId, selectedIds);
        state.modal = { ...state.modal, selectedSourceSiteIds: {}, selectedTargetSiteIds: {} };
        showToast(`${roomOpsText.toastMoveOutPrefix}${moved}${roomOpsText.toastSiteCountSuffix}`);
        renderCurrentPage();
        return;
      }

      if (action === "room-delete" && country) {
        if (!window.confirm(roomOpsText.confirmDeleteRoom)) return;
        const roomId = actionTarget.dataset.roomId;
        const roomIndex = country.rooms.findIndex((room) => room.id === roomId);
        if (roomIndex >= 0) {
          const [room] = country.rooms.splice(roomIndex, 1);
          country.unassignedSites.push(...room.sites);
          delete state.selectedRoomIds[roomId];
          delete state.expandedRooms[roomId];
          delete state.roomPages[roomId];
          if (state.selectedRoomId === roomId) state.selectedRoomId = country.rooms[0]?.id || "";
          showToast(roomOpsText.toastRoomDeleted);
          renderCurrentPage();
        }
        return;
      }

      if (action === "room-export" && country) {
        if (!window.confirm(`${roomOpsText.confirmExportPrefix}${getRoomOpsCountryOptionLabel(country)}${roomOpsText.confirmExportSuffix}`)) return;
        downloadRoomOpsExport(country);
        showToast(roomOpsText.toastExportDone);
        return;
      }
    }
  }

  const merchantCreateHandleRootClickBase = handleRootClick;
  handleRootClick = function handleRootClickPatched(event) {
    const actionTarget = event.target.closest("[data-action]");
    if (!actionTarget) return;
    const pageKey = getCurrentPageKey();
    const page = pageConfigs[pageKey];
    if (page?.type === "merchantCreate" && actionTarget.dataset.action === "merchant-account-generate") {
      const accountInput = document.querySelector('[data-merchant-form="merchantAccount"]');
      if (!accountInput) return;
      accountInput.value = generateMerchantAccount(page.merchantRows || []);
      accountInput.dispatchEvent(new Event("input", { bubbles: true }));
      showToast("已生成商户账号");
      return;
    }
    if (page?.type === "merchantCreate" && actionTarget.dataset.action === "merchant-account-copy") {
      const accountInput = document.querySelector('[data-merchant-form="merchantAccount"]');
      const accountValue = (accountInput?.value || "").trim();
      if (!accountValue) {
        showToast("请先生成或输入商户账号");
        return;
      }
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(accountValue)
          .then(() => showToast("商户账号已复制"))
          .catch(() => showToast("复制失败，请手动复制"));
      } else {
        showToast("当前环境不支持自动复制，请手动复制");
      }
      return;
    }
    if (page?.type === "merchantCreate" && actionTarget.dataset.action === "merchant-password-generate") {
      const passwordInput = document.querySelector('[data-merchant-form="merchantPassword"]');
      if (!passwordInput) return;
      passwordInput.value = generateMerchantPassword(16);
      passwordInput.dispatchEvent(new Event("input", { bubbles: true }));
      showToast("已生成16位随机密码");
      return;
    }
    if (page?.type === "merchantCreate" && actionTarget.dataset.action === "merchant-password-copy") {
      const passwordInput = document.querySelector('[data-merchant-form="merchantPassword"]');
      const passwordValue = (passwordInput?.value || "").trim();
      if (!passwordValue) {
        showToast("请先生成或输入商户密码");
        return;
      }
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(passwordValue)
          .then(() => showToast("商户密码已复制"))
          .catch(() => showToast("复制失败，请手动复制"));
      } else {
        showToast("当前环境不支持自动复制，请手动复制");
      }
      return;
    }
    if (page?.type === "merchantCreate" && actionTarget.dataset.action === "merchant-api-edit") {
      const state = getPageState(pageKey, page);
      state.modal = {
        ...cloneValue(page.formDefaults || {}),
        ...(state.modal || {}),
        apiConfig: {
          playerInfoUrl: (document.querySelector('[data-merchant-form="apiPlayerInfoUrl"]')?.value || state.modal?.apiConfig?.playerInfoUrl || "").trim(),
          playerBalanceUrl: (document.querySelector('[data-merchant-form="apiPlayerBalanceUrl"]')?.value || state.modal?.apiConfig?.playerBalanceUrl || "").trim(),
          changeBalanceUrl: (document.querySelector('[data-merchant-form="apiChangeBalanceUrl"]')?.value || state.modal?.apiConfig?.changeBalanceUrl || "").trim(),
          locked: false,
        },
      };
      renderCurrentPage();
      return;
    }
    if (page?.type === "merchantCreate" && actionTarget.dataset.action === "merchant-api-save") {
      const state = getPageState(pageKey, page);
      state.modal = {
        ...cloneValue(page.formDefaults || {}),
        ...(state.modal || {}),
        apiConfig: {
          playerInfoUrl: (document.querySelector('[data-merchant-form="apiPlayerInfoUrl"]')?.value || "").trim(),
          playerBalanceUrl: (document.querySelector('[data-merchant-form="apiPlayerBalanceUrl"]')?.value || "").trim(),
          changeBalanceUrl: (document.querySelector('[data-merchant-form="apiChangeBalanceUrl"]')?.value || "").trim(),
          locked: true,
        },
      };
      showToast("API配置已保存");
      renderCurrentPage();
      return;
    }
    if (page?.type === "merchantCreate" && actionTarget.dataset.action === "merchant-modal-save") {
      const state = getPageState(pageKey, page);
      const readValue = (key) => (document.querySelector(`[data-merchant-form="${key}"]`)?.value || "").trim();
      const merchantName = readValue("merchantName");
      const merchantCode = (readValue("merchantCode") || getMerchantCreateNextCode(page.merchantRows || [])).toUpperCase();
      const merchantAccount = readValue("merchantAccount");
      const merchantPassword = readValue("merchantPassword");
      const merchantType = readValue("merchantType") || "直营商户";
      const merchantTimezone = readValue("merchantTimezone") || "UTC+08:00";
      const merchantCurrency = readValue("merchantCurrency") || "印度/INR";
      const cooperationMode = readValue("cooperationMode") || "预充模式";
      const note = readValue("note");
      const apiConfig = {
        playerInfoUrl: readValue("apiPlayerInfoUrl"),
        playerBalanceUrl: readValue("apiPlayerBalanceUrl"),
        changeBalanceUrl: readValue("apiChangeBalanceUrl"),
        locked: true,
      };
      const vendorRates = {};
      document.querySelectorAll("[data-merchant-rate]").forEach((input) => {
        vendorRates[input.dataset.merchantRate] = ((input.value || "").trim() || "0.00");
      });

      if (!merchantName || !merchantCode || !merchantAccount || !merchantPassword) {
        showToast("请填写商户名称、商户编号、商户账号和商户密码");
        return;
      }

      if ((page.merchantRows || []).some((row) => String(row.merchantCode || "").toUpperCase() === merchantCode)) {
        showToast("商户编号已存在，请更换后重试");
        return;
      }

      if ((page.merchantRows || []).some((row) => String(row.merchantAccount || "").toLowerCase() === merchantAccount.toLowerCase())) {
        showToast("商户账号已存在，请更换后重试");
        return;
      }

      if (!window.confirm("确认创建该商户吗？")) return;

      page.merchantRows = page.merchantRows || [];
      page.merchantRows.unshift({
        merchantName,
        merchantCode,
        merchantAccount,
        merchantPassword,
        merchantType,
        merchantTimezone,
        merchantCurrency,
        cooperationMode,
        vendorRates,
        apiConfig,
        note,
        status: "启用",
        statusTone: "success",
        createdAt: dateShift(0),
      });
      state.modal = null;
      state.page = 1;
      showToast("商户已创建");
      renderCurrentPage();
      return;
    }
    return merchantCreateHandleRootClickBase(event);
  };

  const playerProfitHandleRootClickBase = handleRootClick;
  handleRootClick = function handleRootClickPlayerProfitPatched(event) {
    const pageKey = getCurrentPageKey();
    const page = pageConfigs[pageKey];
    if (page?.type === "playerTodayProfit") {
      const state = getPageState(pageKey, page);
      const actionTarget = event.target.closest("[data-action]");
      if (
        state.controlModal?.controlGamePickerOpen &&
        !event.target.closest(".admin-control-profit-game-picker")
      ) {
        state.controlModal.controlGamePickerOpen = false;
        if (!actionTarget) {
          renderCurrentPage();
          return;
        }
      }
      if (
        state.merchantPickerOpen &&
        !event.target.closest(".admin-profit-merchant-picker")
      ) {
        state.merchantPickerOpen = false;
        if (!actionTarget) {
          renderCurrentPage();
          return;
        }
      }
      if (!actionTarget) return;
      const action = actionTarget.dataset.action;
      if (action === "profit-merchant-toggle") {
        state.merchantPickerOpen = !state.merchantPickerOpen;
        state.gamePickerOpen = false;
        renderCurrentPage();
        return;
      }
      if (action === "profit-merchant-option") {
        const merchant = actionTarget.dataset.merchant || "";
        const selectedMerchants = Array.isArray(state.filters.merchants)
          ? [...state.filters.merchants]
          : [];
        const index = selectedMerchants.indexOf(merchant);
        if (index >= 0) {
          selectedMerchants.splice(index, 1);
        } else if (merchant) {
          selectedMerchants.push(merchant);
        }
        state.filters.merchants = selectedMerchants;
        state.filters.merchant = "";
        state.page = 1;
        state.merchantPickerOpen = true;
        renderCurrentPage();
        return;
      }
      if (action === "profit-merchant-clear") {
        state.filters.merchants = [];
        state.filters.merchant = "";
        state.filters.merchantSearch = "";
        state.page = 1;
        state.merchantPickerOpen = true;
        renderCurrentPage();
        return;
      }
      if (action === "profit-game-toggle") {
        state.gamePickerOpen = !state.gamePickerOpen;
        state.merchantPickerOpen = false;
        renderCurrentPage();
        return;
      }
      if (action === "profit-game-brand") {
        state.filters.gameBrand = actionTarget.dataset.brand || "";
        state.gamePickerOpen = true;
        renderCurrentPage();
        return;
      }
      if (action === "profit-game-option") {
        state.filters.game = actionTarget.dataset.game || "";
        state.filters.gameLabel = actionTarget.dataset.label || "全部游戏";
        state.gamePickerOpen = false;
        state.page = 1;
        renderCurrentPage();
        return;
      }
      if (action === "profit-search") {
        state.page = 1;
        state.gamePickerOpen = false;
        state.merchantPickerOpen = false;
        renderCurrentPage();
        return;
      }
      if (action === "profit-reset") {
        state.filters = {
          platform: "",
          merchant: "",
          merchants: [],
          merchantSearch: "",
          game: "",
          gameLabel: "全部游戏",
          gameBrand: "",
          gameSearch: "",
          dateFrom: "2026-05-06",
          dateTo: "2026-05-07",
        };
        state.page = 1;
        state.gamePickerOpen = false;
        state.merchantPickerOpen = false;
        renderCurrentPage();
        return;
      }
      if (action === "profit-copy") {
        const value = actionTarget.dataset.copy || "";
        if (navigator.clipboard?.writeText) {
          navigator.clipboard.writeText(value)
            .then(() => showToast("平台ID已复制"))
            .catch(() => showToast("复制失败，请手动复制"));
        } else {
          showToast("当前环境不支持自动复制，请手动复制");
        }
        return;
      }
      if (action === "profit-control-open") {
        const platformId = actionTarget.dataset.platform || "";
        const row = (page.rows || []).find((item) => item.platformId === platformId);
        const defaultBrand = (row && row.brand) || "PG";
        const gameMeta = playerTodayProfitGames.find((item) => item.value === row?.game);
        state.controlModal = {
          row: row || { platformId },
          selectedBrands: [defaultBrand],
          controlGame: row?.game || "",
          controlGameLabel: gameMeta?.name || row?.brand || "全部品牌",
          controlGameBrand: row?.brand || "",
          controlGameBrands: row?.brand ? [row.brand] : [],
          controlGameSearch: "",
          controlGamePage: 1,
          controlGamePickerOpen: false,
          controlDirection: "loss",
          controlRtp: 90,
          controlLevel: "low",
          releaseType: "amount",
          releaseDays: 7,
          releaseAmount: 50000,
          releaseQuickAmounts: [10000, 50000, 100000],
        };
        renderCurrentPage();
        return;
      }
      if (action === "profit-control-game-toggle") {
        if (!state.controlModal) return;
        state.controlModal.controlGamePickerOpen = !state.controlModal.controlGamePickerOpen;
        renderCurrentPage();
        return;
      }
      if (action === "profit-control-game-brand") {
        if (!state.controlModal) return;
        const selectedBrand = actionTarget.dataset.brand || "";
        let nextBrands = Array.isArray(state.controlModal.controlGameBrands)
          ? [...state.controlModal.controlGameBrands]
          : (state.controlModal.controlGameBrand ? [state.controlModal.controlGameBrand] : []);
        if (!selectedBrand) {
          nextBrands = [];
        } else if (nextBrands.includes(selectedBrand)) {
          nextBrands = nextBrands.filter((item) => item !== selectedBrand);
        } else if (nextBrands.length >= 2) {
          showToast("最多同时选择2个厂商");
        } else {
          nextBrands.push(selectedBrand);
        }
        const brandLabel = nextBrands.length ? nextBrands.join("/") : "全部品牌";
        state.controlModal.controlGameBrands = nextBrands;
        state.controlModal.controlGameBrand = nextBrands[0] || "";
        state.controlModal.controlGame = "";
        state.controlModal.controlGameLabel = brandLabel;
        state.controlModal.controlGamePage = 1;
        state.controlModal.controlGamePickerOpen = true;
        renderCurrentPage();
        return;
      }
      if (action === "profit-control-game-page") {
        if (!state.controlModal) return;
        state.controlModal.controlGamePage = Math.max(1, Number(actionTarget.dataset.page || 1));
        state.controlModal.controlGamePickerOpen = true;
        renderCurrentPage();
        return;
      }
      if (action === "profit-control-game-option") {
        if (!state.controlModal) return;
        const selectedGame = actionTarget.dataset.game || "";
        state.controlModal.controlGame = selectedGame;
        state.controlModal.controlGameLabel = selectedGame
          ? (actionTarget.dataset.label || "请选择游戏")
          : ((state.controlModal.controlGameBrands || []).length ? state.controlModal.controlGameBrands.join("/") : "全部品牌");
        state.controlModal.controlGamePickerOpen = true;
        renderCurrentPage();
        return;
      }
      if (action === "profit-control-direction") {
        if (!state.controlModal) return;
        const direction = actionTarget.dataset.direction || "loss";
        state.controlModal.controlDirection = direction;
        state.controlModal.controlLevel = "low";
        if (direction === "loss") {
          state.controlModal.controlRtp = 90;
        } else {
          state.controlModal.controlRtp = 120;
        }
        renderCurrentPage();
        return;
      }
      if (action === "profit-control-rtp-set") {
        if (!state.controlModal) return;
        let rtp = Number(actionTarget.dataset.rtp || 0);
        if ((state.controlModal.controlDirection || "loss") === "loss" && rtp > 90) {
          rtp = 90;
          showToast("控输状态下 RTP 不能超过 90");
        }
        if ((state.controlModal.controlDirection || "loss") === "win" && rtp < 100) {
          rtp = 100;
          showToast("控赢状态下 RTP 不能低于 100");
        }
        state.controlModal.controlRtp = rtp;
        renderCurrentPage();
        return;
      }
      if (action === "profit-control-level") {
        if (!state.controlModal) return;
        state.controlModal.controlLevel = actionTarget.dataset.level || "low";
        state.controlModal.controlRtp = Number(actionTarget.dataset.rtp || 90);
        renderCurrentPage();
        return;
      }
      if (action === "profit-control-release-type") {
        if (!state.controlModal) return;
        state.controlModal.releaseType = actionTarget.dataset.releaseType || "amount";
        renderCurrentPage();
        return;
      }
      if (action === "profit-control-release-days") {
        if (!state.controlModal) return;
        state.controlModal.releaseDays = actionTarget.dataset.days || "7";
        renderCurrentPage();
        return;
      }
      if (action === "profit-control-release-amount-add") {
        if (!state.controlModal) return;
        const index = Number(actionTarget.dataset.index || 0);
        const quickAmounts = Array.isArray(state.controlModal.releaseQuickAmounts)
          ? state.controlModal.releaseQuickAmounts
          : [10000, 50000, 100000];
        const amount = Math.abs(Number(quickAmounts[index] || 0));
        const current = Math.abs(Number(state.controlModal.releaseAmount || 0));
        state.controlModal.releaseAmount = current + amount;
        renderCurrentPage();
        return;
      }
      if (action === "profit-control-release-amount-create") {
        if (!state.controlModal) return;
        state.controlModal.releaseQuickEditing = true;
        state.controlModal.releaseQuickDraft = "";
        renderCurrentPage();
        return;
      }
      if (action === "profit-control-release-amount-save") {
        if (!state.controlModal) return;
        const amount = Math.abs(Number(state.controlModal.releaseQuickDraft || 0));
        if (!amount) {
          showToast("请输入自定义金额");
          renderCurrentPage();
          return;
        }
        const quickAmounts = Array.isArray(state.controlModal.releaseQuickAmounts)
          ? [...state.controlModal.releaseQuickAmounts]
          : [10000, 50000, 100000];
        quickAmounts.push(amount);
        state.controlModal.releaseQuickAmounts = quickAmounts;
        state.controlModal.releaseQuickEditing = false;
        state.controlModal.releaseQuickDraft = "";
        renderCurrentPage();
        return;
      }
      if (action === "profit-control-release-amount-delete") {
        if (!state.controlModal) return;
        const index = Number(actionTarget.dataset.index || 0);
        const quickAmounts = Array.isArray(state.controlModal.releaseQuickAmounts)
          ? [...state.controlModal.releaseQuickAmounts]
          : [10000, 50000, 100000];
        quickAmounts.splice(index, 1);
        state.controlModal.releaseQuickAmounts = quickAmounts;
        renderCurrentPage();
        return;
      }
      if (action === "profit-control-brand-toggle") {
        if (!state.controlModal) return;
        const brand = actionTarget.dataset.brand || "";
        const selectedBrands = Array.isArray(state.controlModal.selectedBrands)
          ? [...state.controlModal.selectedBrands]
          : [];
        const index = selectedBrands.indexOf(brand);
        if (index >= 0) {
          selectedBrands.splice(index, 1);
        } else if (brand) {
          selectedBrands.push(brand);
        }
        state.controlModal.selectedBrands = selectedBrands;
        renderCurrentPage();
        return;
      }
      if (action === "profit-control-brand-all") {
        if (!state.controlModal) return;
        state.controlModal.selectedBrands = ["PG", "PP", "JILI", "TADA", "SPRIBE", "EVO"];
        renderCurrentPage();
        return;
      }
      if (action === "profit-control-brand-clear") {
        if (!state.controlModal) return;
        state.controlModal.selectedBrands = [];
        renderCurrentPage();
        return;
      }
      if (action === "profit-control-close") {
        state.controlModal = null;
        renderCurrentPage();
        return;
      }
      if (action === "profit-control-save") {
        state.controlModal = null;
        showToast("游戏控制策略已保存");
        renderCurrentPage();
        return;
      }
      if (action === "profit-page-prev") {
        state.page = Math.max(1, state.page - 1);
        renderCurrentPage();
        return;
      }
      if (action === "profit-page-next") {
        const totalPages = Math.max(1, Math.ceil(getPlayerTodayProfitRows(page, state).length / state.pageSize));
        state.page = Math.min(totalPages, state.page + 1);
        renderCurrentPage();
        return;
      }
      if (action === "profit-page-number") {
        state.page = Number(actionTarget.dataset.page || 1);
        renderCurrentPage();
        return;
      }
    }
    return playerProfitHandleRootClickBase(event);
  };

  const playerProfitHandleRootInputBase = handleRootInput;
  handleRootInput = function handleRootInputPlayerProfitPatched(event) {
    const input = event.target.closest("[data-profit-filter]");
    const pageKey = getCurrentPageKey();
    const page = pageConfigs[pageKey];
    const merchantSearch = event.target.closest("[data-profit-merchant-search]");
    if (page?.type === "playerTodayProfit" && merchantSearch) {
      const state = getPageState(pageKey, page);
      state.filters.merchantSearch = merchantSearch.value;
      state.merchantPickerOpen = true;
      state.page = 1;
      renderCurrentPage();
      const nextSearch = document.querySelector("[data-profit-merchant-search]");
      if (nextSearch) {
        nextSearch.focus();
        const cursor = nextSearch.value.length;
        nextSearch.setSelectionRange(cursor, cursor);
      }
      return;
    }
    if (page?.type === "playerTodayProfit" && input) {
      const state = getPageState(pageKey, page);
      state.filters[input.dataset.profitFilter] = input.value;
      state.page = 1;
      if (input.dataset.profitFilter === "gameSearch") {
        state.gamePickerOpen = true;
      }
      renderCurrentPage();
      return;
    }
    const controlGameSearch = event.target.closest("[data-profit-control-game-search]");
    if (page?.type === "playerTodayProfit" && controlGameSearch) {
      const state = getPageState(pageKey, page);
      if (!state.controlModal) return;
      state.controlModal.controlGameSearch = controlGameSearch.value;
      state.controlModal.controlGamePage = 1;
      state.controlModal.controlGamePickerOpen = true;
      renderCurrentPage();
      return;
    }
    const controlRtpInput = event.target.closest("[data-profit-control-rtp]");
    if (page?.type === "playerTodayProfit" && controlRtpInput) {
      const state = getPageState(pageKey, page);
      if (!state.controlModal) return;
      let value = Number(controlRtpInput.value || 0);
      if ((state.controlModal.controlDirection || "loss") === "loss" && value > 90) {
        value = 90;
        showToast("控输状态下 RTP 不能超过 90");
      }
      if ((state.controlModal.controlDirection || "loss") === "win" && value < 100) {
        value = 100;
        showToast("控赢状态下 RTP 不能低于 100");
      }
      state.controlModal.controlRtp = value;
      state.controlModal.controlLevel = "";
      renderCurrentPage();
      return;
    }
    const releaseAmountInput = event.target.closest("[data-profit-control-release-amount]");
    if (page?.type === "playerTodayProfit" && releaseAmountInput) {
      const state = getPageState(pageKey, page);
      if (!state.controlModal) return;
      state.controlModal.releaseAmount = Math.abs(Number(releaseAmountInput.value || 0));
      renderCurrentPage();
      return;
    }
    const releaseDaysInput = event.target.closest("[data-profit-control-release-days]");
    if (page?.type === "playerTodayProfit" && releaseDaysInput) {
      const state = getPageState(pageKey, page);
      if (!state.controlModal) return;
      state.controlModal.releaseDays = Number(releaseDaysInput.value || 0);
      renderCurrentPage();
      return;
    }
    const customAmountInput = event.target.closest("[data-profit-control-custom-amount]");
    if (page?.type === "playerTodayProfit" && customAmountInput) {
      const state = getPageState(pageKey, page);
      if (!state.controlModal) return;
      state.controlModal.releaseQuickDraft = customAmountInput.value;
      renderCurrentPage();
      return;
    }
    return playerProfitHandleRootInputBase(event);
  };

  const playerProfitHandleRootChangeBase = handleRootChange;
  handleRootChange = function handleRootChangePlayerProfitPatched(event) {
    const pageKey = getCurrentPageKey();
    const page = pageConfigs[pageKey];
    if (page?.type === "playerTodayProfit") {
      const state = getPageState(pageKey, page);
      const brandSelect = event.target.closest("[data-profit-control-brand-select]");
      if (brandSelect) {
        if (!state.controlModal) return;
        state.controlModal.selectedBrands = brandSelect.value ? [brandSelect.value] : [];
        renderCurrentPage();
        return;
      }
      const filter = event.target.closest("[data-profit-filter]");
      if (filter) {
        state.filters[filter.dataset.profitFilter] = filter.value;
        state.page = 1;
        renderCurrentPage();
        return;
      }
      const pageSize = event.target.closest('[data-action="profit-page-size"]');
      if (pageSize) {
        state.pageSize = Number(pageSize.value || page.defaultPageSize || 100);
        state.page = 1;
        renderCurrentPage();
        return;
      }
    }
    return playerProfitHandleRootChangeBase(event);
  };

  document.addEventListener("DOMContentLoaded", () => {
    window.renderManagementPage = renderCurrentPage;
    renderCurrentPage();
    const root = document.getElementById("pageRoot");
    if (root) {
      root.addEventListener("click", handleRootClick);
      root.addEventListener("change", handleRootChange);
      root.addEventListener("input", handleRootInput);
      root.addEventListener("dragstart", handleRootDragStart);
      root.addEventListener("dragover", handleRootDragOver);
      root.addEventListener("drop", handleRootDrop);
      root.addEventListener("dragend", handleRootDragEnd);
    }
  });

  window.addEventListener("popstate", () => {
    if (typeof window.renderManagementPage === "function") {
      window.renderManagementPage();
    }
  });
})();
