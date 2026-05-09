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
    "flight-room-config": formPage({
      title: "飞机房间配置",
      section: "游戏管理",
      description: "集中维护飞机房间的底注、税率和爆点区间。",
      formDefaults: {
        roomName: "飞机高频房",
        roomCode: "FR-2001",
        baseBet: "20",
        taxRate: "4",
        enterLimit: "500",
        burstFloor: "1.20",
        burstCap: "8.60",
        robotSwitch: "开启",
      },
      sections: [
        {
          title: "房间参数",
          description: "基础押注、税率和进入门槛。",
          fields: [
            field("roomName", "房间名称", "text", "请输入房间名称"),
            field("roomCode", "房间编号", "text", "请输入房间编号"),
            field("baseBet", "基础底注", "number", "请输入基础底注"),
            field("taxRate", "税率(%)", "number", "请输入税率"),
            field("enterLimit", "进入门槛", "number", "请输入门槛"),
            selectField("robotSwitch", "机器人开关", ["开启", "关闭"]),
          ],
        },
        {
          title: "爆点区间",
          description: "配置风控区间和演示范围。",
          fields: [
            field("burstFloor", "最小爆点", "number", "请输入最小爆点"),
            field("burstCap", "最大爆点", "number", "请输入最大爆点"),
          ],
        },
      ],
      preview: {
        title: "当前房间列表预览",
        description: "保存前先核对房间配置、在线人数和税率。",
        columns: [
          { label: "房间名称", key: "roomName" },
          { label: "房间编号", key: "roomCode", className: "mono" },
          { label: "商户", key: "merchant" },
          { label: "基础底注", render: (row) => renderMoneyCell(row.baseBet) },
          { label: "税率", key: "taxRate" },
          { label: "活跃人数", render: (row) => renderNumberCell(row.activeUsers) },
          { label: "爆点上限", key: "burstCap" },
          { label: "状态", render: (row) => badge(row.status, row.statusTone) },
        ],
        rows: buildFlightRoomRows(8),
      },
    }),
    "flight-room-manage": tablePage({
      title: "飞机房间管理",
      section: "游戏管理",
      description: "查看房间实时状态、基础底注和税率。",
      columns: [
        { label: "房间名称", key: "roomName" },
        { label: "房间编号", key: "roomCode", className: "mono" },
        { label: "商户", key: "merchant" },
        { label: "基础底注", render: (row) => renderMoneyCell(row.baseBet) },
        { label: "税率", key: "taxRate" },
        { label: "活跃人数", render: (row) => renderNumberCell(row.activeUsers) },
        { label: "爆点上限", key: "burstCap" },
        { label: "状态", render: (row) => badge(row.status, row.statusTone) },
      ],
      rows: buildFlightRoomRows(20),
    }),
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
    const key = params.get("page") || "dashboard";
    return pageConfigs[key] ? key : "dashboard";
  }

  function cloneValue(value) {
    return JSON.parse(JSON.stringify(value));
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
    }
    return pageStates[pageKey];
  }

  function updateBreadcrumb(page) {
    const breadcrumb = document.querySelector("[data-breadcrumb]");
    if (!breadcrumb) return;
    breadcrumb.innerHTML = `<span>${escapeHtml(page.section)}</span><span>/</span><strong>${escapeHtml(
      page.title,
    )}</strong>`;
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

  function handleRootClick(event) {
    const actionTarget = event.target.closest("[data-action]");
    if (!actionTarget) return;

    const pageKey = getCurrentPageKey();
    const page = pageConfigs[pageKey];
    const state = getPageState(pageKey, page);
    const action = actionTarget.dataset.action;

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
    if (actionTarget.matches('[data-action="page-size"]')) {
      const pageKey = getCurrentPageKey();
      const page = pageConfigs[pageKey];
      const state = getPageState(pageKey, page);
      state.pageSize = Number(actionTarget.value);
      state.page = 1;
      renderCurrentPage();
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    window.renderManagementPage = renderCurrentPage;
    renderCurrentPage();
    const root = document.getElementById("pageRoot");
    if (root) {
      root.addEventListener("click", handleRootClick);
      root.addEventListener("change", handleRootChange);
    }
  });

  window.addEventListener("popstate", () => {
    if (typeof window.renderManagementPage === "function") {
      window.renderManagementPage();
    }
  });
})();
