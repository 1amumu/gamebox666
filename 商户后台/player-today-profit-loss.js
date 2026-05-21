(() => {
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

  const page = {
    type: "playerTodayProfit",
    title: "今日玩家盈亏",
    section: "数据管理",
    description: "从商户后台迁移的玩家维度今日投注、返奖、输赢与余额明细。",
    defaultPageSize: 100,
    pageSizeOptions: [50, 100, 500, 1000],
    rows: buildPlayerTodayProfitRows(),
  };

  const state = {
    filters: {
      platform: "",
      game: "",
      gameLabel: "全部游戏",
      gameBrand: "",
      gameSearch: "",
      dateFrom: "2026-05-06",
      dateTo: "2026-05-07",
    },
    gamePickerOpen: false,
    controlModal: null,
    page: 1,
    pageSize: page.defaultPageSize,
  };

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

  function escapeHtml(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatNumber(value) {
    return Number(value || 0).toLocaleString("en-US");
  }

  function formatProfitPlainMoney(value) {
    return Number(value || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function range(count, mapper) {
    return Array.from({ length: count }, (_, index) => mapper(index));
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
    requestAnimationFrame(() => toast.classList.add("visible"));
    setTimeout(() => {
      toast.classList.remove("visible");
      setTimeout(() => toast.remove(), 180);
    }, 1600);
  }

  function renderPageHeader(pageConfig) {
    return `
      <div class="page-heading">
        <h1 class="page-title">${escapeHtml(pageConfig.title)}</h1>
        <div class="page-subtitle">${escapeHtml(pageConfig.section)} / ${escapeHtml(pageConfig.title)}</div>
        <p class="page-description">${escapeHtml(pageConfig.description || "")}</p>
      </div>
    `;
  }

  function getProfitTagClass(level) {
    return {
      "低端玩家": "tag-low",
      "中端玩家": "tag-mid",
      "优质玩家": "tag-premium",
      "疑似刷分": "tag-risk",
    }[level] || "tag-mid";
  }

  function getPlayerTodayProfitRows() {
    const filters = state.filters || {};
    const platform = String(filters.platform || "").trim();
    const game = String(filters.game || "").trim();
    const dateFrom = filters.dateFrom || "";
    const dateTo = filters.dateTo || "";
    return (page.rows || []).filter((row) => {
      if (platform && !row.platformId.includes(platform)) return false;
      if (game && row.game !== game) return false;
      if (dateFrom && row.date < dateFrom) return false;
      if (dateTo && row.date > dateTo) return false;
      return true;
    });
  }

  function renderPlayerProfitGamePicker() {
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

  function renderPlayerProfitControlGamePicker() {
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

  function renderPlayerProfitControlModal() {
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
                  ${renderPlayerProfitControlGamePicker()}
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

  function renderPlayerTodayProfitPage() {
    const filters = state.filters || {};
    const rows = getPlayerTodayProfitRows();
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
              <label class="admin-profit-filter">
                <span>游戏选择</span>
                ${renderPlayerProfitGamePicker()}
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
                <div class="admin-profit-row profit-row" data-platform="${escapeHtml(row.platformId)}" data-game="${escapeHtml(row.game)}" data-brand="${escapeHtml(row.brand)}" data-date="${escapeHtml(row.date)}" data-count="${escapeHtml(row.betCount)}" data-bet="${escapeHtml(formatProfitPlainMoney(row.todayBet))}" data-payout="${escapeHtml(formatProfitPlainMoney(row.todayPayout))}" data-win="${escapeHtml(formatProfitPlainMoney(row.todayWinLoss))}">
                  <div><span class="admin-player-tag ${getProfitTagClass(row.level)}">${escapeHtml(row.level)}</span></div>
                  <div><span class="admin-profit-player profit-player">${escapeHtml(row.platformId)} <button class="admin-profit-copy" type="button" data-action="profit-copy" data-copy="${escapeHtml(row.platformId)}" title="复制平台ID"></button></span></div>
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
        ${renderPlayerProfitControlModal()}
      </section>
    `;
  }

  function renderCurrentPage() {
    const root = document.getElementById("merchantTodayProfitRoot");
    if (!root) return;
    root.innerHTML = renderPlayerTodayProfitPage();
  }

  function handleRootClick(event) {
    const actionTarget = event.target.closest("[data-action]");
    if (state.controlModal?.controlGamePickerOpen && !event.target.closest(".admin-control-profit-game-picker")) {
      state.controlModal.controlGamePickerOpen = false;
      if (!actionTarget) {
        renderCurrentPage();
        return;
      }
    }
    if (state.gamePickerOpen && !event.target.closest(".admin-profit-game-picker")) {
      state.gamePickerOpen = false;
      if (!actionTarget) {
        renderCurrentPage();
        return;
      }
    }
    if (!actionTarget) return;
    const action = actionTarget.dataset.action;
    if (action === "profit-game-toggle") {
      state.gamePickerOpen = !state.gamePickerOpen;
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
      renderCurrentPage();
      return;
    }
    if (action === "profit-reset") {
      state.filters = {
        platform: "",
        game: "",
        gameLabel: "全部游戏",
        gameBrand: "",
        gameSearch: "",
        dateFrom: "2026-05-06",
        dateTo: "2026-05-07",
      };
      state.page = 1;
      state.gamePickerOpen = false;
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
      state.controlModal.controlRtp = direction === "loss" ? 90 : 120;
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
      const totalPages = Math.max(1, Math.ceil(getPlayerTodayProfitRows().length / state.pageSize));
      state.page = Math.min(totalPages, state.page + 1);
      renderCurrentPage();
      return;
    }
    if (action === "profit-page-number") {
      state.page = Number(actionTarget.dataset.page || 1);
      renderCurrentPage();
    }
  }

  function handleRootInput(event) {
    const input = event.target.closest("[data-profit-filter]");
    if (input) {
      state.filters[input.dataset.profitFilter] = input.value;
      state.page = 1;
      if (input.dataset.profitFilter === "gameSearch") {
        state.gamePickerOpen = true;
      }
      renderCurrentPage();
      return;
    }
    const controlGameSearch = event.target.closest("[data-profit-control-game-search]");
    if (controlGameSearch) {
      if (!state.controlModal) return;
      state.controlModal.controlGameSearch = controlGameSearch.value;
      state.controlModal.controlGamePage = 1;
      state.controlModal.controlGamePickerOpen = true;
      renderCurrentPage();
      return;
    }
    const controlRtpInput = event.target.closest("[data-profit-control-rtp]");
    if (controlRtpInput) {
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
    if (releaseAmountInput) {
      if (!state.controlModal) return;
      state.controlModal.releaseAmount = Math.abs(Number(releaseAmountInput.value || 0));
      renderCurrentPage();
      return;
    }
    const customAmountInput = event.target.closest("[data-profit-control-custom-amount]");
    if (customAmountInput) {
      if (!state.controlModal) return;
      state.controlModal.releaseQuickDraft = customAmountInput.value;
      renderCurrentPage();
    }
  }

  function handleRootChange(event) {
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
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("merchantTodayProfitRoot");
    if (!root) return;
    renderCurrentPage();
    root.addEventListener("click", handleRootClick);
    root.addEventListener("change", handleRootChange);
    root.addEventListener("input", handleRootInput);
  });
})();
