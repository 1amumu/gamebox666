(function() {
  var MERCHANT_COUNT = 10;
  var SITE_PER_MERCHANT = 5;
  var GAME_PER_SITE = 100;
  var STOCK_MIN = 10000;
  var STOCK_MAX = 1000001;
  var INIT_STOCK = 500000;

  var currentPage = "merchant";
  var currentMerchantId = null;
  var currentSiteId = null;
  var currentSearchKeyword = null;
  var fullData = [];

  function randomNumber(min, max, decimal) {
    var num = Math.random() * (max - min) + min;
    return decimal ? Number(num.toFixed(decimal)) : Math.floor(num);
  }

  function formatNumber(num) {
    return Number(num || 0).toLocaleString("en-US");
  }

  function totalInventory() {
    return fullData.reduce(function(sum, merchant) {
      return sum + merchant.totalStock;
    }, 0);
  }

  function gameTotalStock(game) {
    return Number(game.stock || 0) + Number(game.lowStock || 0);
  }

  function stockRatio(game) {
    if (!game.initStock) return "0.00";
    return (gameTotalStock(game) / game.initStock).toFixed(2);
  }

  function updateOverviewTotal() {
    var node = document.getElementById("overviewTotalStock");
    if (node) node.textContent = formatNumber(totalInventory());
  }

  function stockDisplayHtml(game) {
    return "<div class=\"stock-pair\">" +
      "<span><em>高</em>" + formatNumber(game.stock) + "</span>" +
      "<span><em>低</em>" + formatNumber(game.lowStock) + "</span>" +
    "</div>";
  }

  function debounce(fn, delay) {
    var timer = null;
    return function() {
      var args = arguments;
      var context = this;
      window.clearTimeout(timer);
      timer = window.setTimeout(function() {
        fn.apply(context, args);
      }, delay || 300);
    };
  }

  function highlightKeyword(text, keyword) {
    var value = String(text || "");
    if (!keyword) return value;
    var escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return value.replace(new RegExp("(" + escaped + ")", "gi"), "<span class=\"highlight\">$1</span>");
  }

  function fuzzyMatch(text, keyword) {
    if (!keyword) return { match: true, score: 100 };
    var value = String(text || "").toLowerCase().replace(/\s+/g, "");
    var query = String(keyword || "").toLowerCase().replace(/\s+/g, "");
    if (value === query) return { match: true, score: 100 };
    if (value.indexOf(query) === 0) return { match: true, score: 80 };
    if (value.indexOf(query) >= 0) return { match: true, score: 60 };
    return { match: false, score: 0 };
  }

  function initData() {
    var currencies = ["美元", "卢比"];
    var merchantNames = ["蓝海互娱", "星耀游戏", "金狮娱乐", "鸿运集团", "银河互动", "盛世互娱", "天启游戏", "万象娱乐", "鼎盛平台", "新航游戏"];
    var siteNames = ["印度", "菲律宾", "泰国", "越南", "尼日利亚", "加纳", "迪拜", "新加坡", "印尼", "巴西"];
    var gameNames = ["金虎纳福", "飞机冲刺", "黄金帝国", "龙珠秘宝", "超级王牌", "幸运骰子", "甜蜜派对", "火箭倍增", "赏金猎人", "拳王争霸", "财神到", "神灯宝藏", "深海捕鱼", "宙斯闪电", "宝石矿场", "极速爆点", "奥林匹斯之门", "王牌对决", "福兔迎春", "丛林探险"];
    fullData = [];
    for (var merchantId = 1; merchantId <= MERCHANT_COUNT; merchantId += 1) {
      var currency = currencies[Math.floor(Math.random() * currencies.length)];
      var merchant = {
        id: merchantId,
        name: merchantNames[merchantId - 1] || ("Partner Gaming " + merchantId),
        currency: currency,
        siteList: [],
        totalStock: 0,
        rtp: randomNumber(90, 97, 2)
      };
      for (var siteId = 1; siteId <= SITE_PER_MERCHANT; siteId += 1) {
        var site = {
          id: siteId,
          name: siteNames[(merchantId + siteId - 2) % siteNames.length] + "-" + String(siteId).padStart(2, "0") + "站点",
          currency: currency,
          gameList: [],
          totalStock: 0,
          rtp: randomNumber(90, 97, 2)
        };
        for (var gameId = 1; gameId <= GAME_PER_SITE; gameId += 1) {
          var stock = randomNumber(STOCK_MIN, STOCK_MAX);
          var lowStock = randomNumber(5000, 280000);
          var gameCode = String(100000 + (merchantId - 1) * SITE_PER_MERCHANT * GAME_PER_SITE + (siteId - 1) * GAME_PER_SITE + gameId);
          var game = {
            id: gameId,
            gameCode: gameCode,
            name: gameNames[(gameId - 1) % gameNames.length] + " " + gameCode,
            stock: stock,
            lowStock: lowStock,
            initStock: INIT_STOCK,
            rtp: randomNumber(90, 97, 2)
          };
          site.gameList.push(game);
          site.totalStock += stock + (lowStock || 0);
        }
        site.gameList.sort(function(a, b) { return gameTotalStock(b) - gameTotalStock(a); });
        merchant.siteList.push(site);
        merchant.totalStock += site.totalStock;
      }
      merchant.siteList.sort(function(a, b) { return b.totalStock - a.totalStock; });
      fullData.push(merchant);
    }
  }

  function pageTabs() {
    var files = ["游戏列表页.html", "飞机房间管理页.html", "库存管理.html"];
    return files.map(function(file) {
      var active = file === "库存管理.html" ? " is-active" : "";
      return "<button type=\"button\" class=\"codex-page-tab" + active + "\" data-tab-file=\"" + file + "\"><span class=\"codex-page-tab-dot\"></span><span class=\"codex-page-tab-title\">" + file.replace(".html", "") + "</span><span class=\"codex-page-tab-close\">×</span></button>";
    }).join("");
  }

  function currentFile() {
    var path = decodeURIComponent(window.location.pathname || "");
    return path.split("/").pop() || "库存管理.html";
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

  function shellHtml() {
    return "<div class=\"app-shell\">" +
      "<a class=\"app-brand\" href=\"首页仪表盘.html\">GB总后台</a>" +
      "<header class=\"app-topbar\">" +
        "<h1 class=\"topbar-page-title\">库存管理</h1>" +
        "<div class=\"topbar-actions\">" +
          "<a class=\"topbar-message\" href=\"消息页.html\" title=\"消息\"><span class=\"topbar-message-icon\"></span><span class=\"topbar-badge\">9</span></a>" +
          "<select class=\"topbar-language\" aria-label=\"语言\"><option>中文</option><option>English</option></select>" +
          "<div class=\"topbar-account-wrap\">" +
            "<div class=\"topbar-account\"><span class=\"topbar-account-label\">账号</span><span class=\"topbar-account-name\">admin</span></div>" +
            "<button type=\"button\" class=\"topbar-account-toggle\" aria-label=\"账号菜单\"></button>" +
            "<div class=\"topbar-account-menu\"><button type=\"button\">个人中心</button><button type=\"button\">退出登录</button></div>" +
          "</div>" +
        "</div>" +
      "</header>" +
      "<nav class=\"app-sidebar\">" + sidebarHtml() + "</nav>" +
      "<main class=\"app-main\"><div class=\"inventory-page\">" +
        "<div class=\"codex-page-tabs\">" + pageTabs() + "</div>" +
        "<div class=\"inventory-panel\">" +
          "<div class=\"inventory-overview\">" +
            "<div class=\"overview-card\"><div class=\"overview-label\">总商户数</div><div class=\"overview-value\">" + MERCHANT_COUNT + "</div></div>" +
            "<div class=\"overview-card\"><div class=\"overview-label\">总站点数</div><div class=\"overview-value\">" + (MERCHANT_COUNT * SITE_PER_MERCHANT) + "</div></div>" +
            "<div class=\"overview-card\"><div class=\"overview-label\">总库存数</div><div class=\"overview-value\" id=\"overviewTotalStock\">" + formatNumber(totalInventory()) + "</div></div>" +
          "</div>" +
          "<div class=\"breadcrumb\" id=\"breadcrumb\"></div>" +
          "<div class=\"filter-bar\">" +
            "<div class=\"filter-left\">" +
              "<input type=\"text\" class=\"global-search\" id=\"globalSearch\" placeholder=\"模糊搜索游戏/商户/站点，支持关键词片段\">" +
              "<input type=\"text\" class=\"filter-input\" id=\"filterName\" placeholder=\"搜索当前列表内容\">" +
              "<select class=\"filter-select\" id=\"filterSort\"><option value=\"stockDesc\">库存从高到低</option><option value=\"stockAsc\">库存从低到高</option></select>" +
            "</div>" +
          "</div>" +
          "<div class=\"content-container\" id=\"contentContainer\"></div>" +
        "</div>" +
      "</div></main>" +
    "</div>";
  }

  function updateBreadcrumb() {
    var breadcrumb = document.getElementById("breadcrumb");
    var html = "<span class=\"nav-home\">首页</span><span class=\"separator\">/</span>";
    if (currentPage === "merchant") {
      html += "<span class=\"current\">全部商户</span>";
    } else if (currentPage === "site") {
      var merchant = fullData.find(function(item) { return item.id === currentMerchantId; });
      html += "<span class=\"nav-merchant\" data-id=\"" + merchant.id + "\">" + merchant.name + "</span><span class=\"separator\">/</span><span class=\"current\">站点列表</span>";
    } else if (currentPage === "game") {
      var merchantForGame = fullData.find(function(item) { return item.id === currentMerchantId; });
      var site = merchantForGame.siteList.find(function(item) { return item.id === currentSiteId; });
      html += "<span class=\"nav-merchant\" data-id=\"" + merchantForGame.id + "\">" + merchantForGame.name + "</span><span class=\"separator\">/</span><span class=\"current\">" + site.name + " - 游戏列表</span>";
    } else {
      html += "<span class=\"current\">搜索结果：" + currentSearchKeyword + "</span>";
    }
    breadcrumb.innerHTML = html;
  }

  function renderMerchantList() {
    currentPage = "merchant";
    currentMerchantId = null;
    currentSiteId = null;
    currentSearchKeyword = null;
    updateBreadcrumb();
    var keyword = document.getElementById("filterName").value.trim();
    var sortType = document.getElementById("filterSort").value;
    var rows = fullData.slice();
    if (keyword) rows = rows.filter(function(item) { return fuzzyMatch(item.name, keyword).match; });
    rows.sort(function(a, b) { return sortType === "stockDesc" ? b.totalStock - a.totalStock : a.totalStock - b.totalStock; });
    if (!rows.length) {
      document.getElementById("contentContainer").innerHTML = "<div class=\"empty-state\"><h3>暂无匹配的商户</h3><p>请更换搜索关键词后重试</p></div>";
      return;
    }
    document.getElementById("contentContainer").innerHTML = topStockGamesHtml() + "<div class=\"merchant-section-title\">商户分类</div><div class=\"merchant-grid\">" + rows.map(function(merchant) {
      return "<div class=\"merchant-card\" data-merchant-id=\"" + merchant.id + "\">" +
        "<div class=\"merchant-header\"><span class=\"merchant-name\">" + highlightKeyword(merchant.name, keyword) + "</span><span class=\"tag tag-currency\">" + merchant.currency + "</span></div>" +
        "<div class=\"merchant-meta\"><span class=\"tag tag-rtp\">RTP " + merchant.rtp + "%</span><span class=\"tag tag-secondary\">5个站点</span><span class=\"tag tag-secondary\">500款游戏</span></div>" +
        "<div class=\"merchant-top-game\">高库存TOP游戏：" + merchant.siteList[0].gameList[0].name + "</div>" +
        "<button class=\"btn btn-primary merchant-btn\" type=\"button\" data-merchant-id=\"" + merchant.id + "\">查看站点</button>" +
      "</div>";
    }).join("") + "</div>";
  }

  function topStockGamesHtml() {
    var games = [];
    fullData.forEach(function(merchant) {
      merchant.siteList.forEach(function(site) {
        site.gameList.forEach(function(game) {
          games.push({
            merchantId: merchant.id,
            siteId: site.id,
            merchantName: merchant.name,
            siteName: site.name,
            gameName: game.name,
            currency: merchant.currency,
            stock: game.stock,
            lowStock: game.lowStock,
            rtp: game.rtp
          });
        });
      });
    });
    games.sort(function(a, b) { return gameTotalStock(b) - gameTotalStock(a); });
    return "<div class=\"top-stock-section\">" +
      "<div class=\"top-stock-head\"><div><strong>高库存游戏 TOP5</strong><span>按当前所有商户、站点、游戏库存量排序</span></div></div>" +
      "<div class=\"top-stock-grid\">" + games.slice(0, 5).map(function(item, index) {
        return "<div class=\"top-stock-card\" data-jump-merchant=\"" + item.merchantId + "\" data-jump-site=\"" + item.siteId + "\">" +
          "<div class=\"top-stock-rank\">TOP " + (index + 1) + "</div>" +
          "<div class=\"top-stock-name\">" + item.gameName + "</div>" +
          "<div class=\"top-stock-values\">" +
            "<span><em>高</em>" + formatNumber(item.stock) + "</span>" +
            "<span><em>低</em>" + formatNumber(item.lowStock) + "</span>" +
          "</div>" +
          "<div class=\"top-stock-meta\"><span>" + item.merchantName + "</span><span>" + item.siteName + "</span></div>" +
          "<div class=\"top-stock-tags\"><span class=\"tag tag-currency\">" + item.currency + "</span><span class=\"tag tag-rtp\">RTP " + item.rtp + "%</span></div>" +
        "</div>";
      }).join("") + "</div>" +
    "</div>";
  }

  function renderSiteList(merchantId) {
    currentPage = "site";
    currentMerchantId = merchantId;
    currentSiteId = null;
    currentSearchKeyword = null;
    updateBreadcrumb();
    var merchant = fullData.find(function(item) { return item.id === merchantId; });
    var keyword = document.getElementById("filterName").value.trim();
    var sortType = document.getElementById("filterSort").value;
    var rows = merchant.siteList.slice();
    if (keyword) rows = rows.filter(function(item) { return fuzzyMatch(item.name, keyword).match; });
    rows.sort(function(a, b) { return sortType === "stockDesc" ? b.totalStock - a.totalStock : a.totalStock - b.totalStock; });
    if (!rows.length) {
      document.getElementById("contentContainer").innerHTML = "<div class=\"empty-state\"><h3>暂无匹配的站点</h3><p>请更换搜索关键词后重试</p></div>";
      return;
    }
    document.getElementById("contentContainer").innerHTML = "<div class=\"site-grid\">" + rows.map(function(site, index) {
      return "<div class=\"site-card rank-" + (index + 1) + "\" data-site-id=\"" + site.id + "\">" +
        "<div class=\"site-header\"><span class=\"site-name\">" + highlightKeyword(site.name, keyword) + "</span><span class=\"tag tag-currency\">" + site.currency + "</span></div>" +
        "<div class=\"site-meta\"><span class=\"tag tag-rtp\">RTP " + site.rtp + "%</span><span class=\"tag tag-secondary\">100款游戏</span><span class=\"tag " + (index === 0 ? "tag-success" : "tag-secondary") + "\">第" + (index + 1) + "名</span></div>" +
        "<div class=\"site-top-game\">高库存TOP游戏：" + site.gameList[0].name + "</div>" +
        "<button class=\"btn btn-primary site-btn\" type=\"button\" data-site-id=\"" + site.id + "\">查看游戏</button>" +
      "</div>";
    }).join("") + "</div>";
  }

  function modifyStock(merchantId, siteId, gameId) {
    var merchant = fullData.find(function(item) { return item.id === merchantId; });
    var site = merchant.siteList.find(function(item) { return item.id === siteId; });
    var game = site.gameList.find(function(item) { return item.id === gameId; });
    openStockModal(merchant, site, game);
  }

  function stockModalHtml(merchant, site, game) {
    return "<div class=\"inventory-modal-mask\" data-stock-modal>" +
      "<div class=\"inventory-modal\">" +
        "<div class=\"inventory-modal-head\">" +
          "<div><strong>修改库存</strong><span>" + merchant.name + " / " + site.name + "</span></div>" +
          "<button type=\"button\" class=\"inventory-modal-close\" data-stock-cancel>×</button>" +
        "</div>" +
        "<div class=\"inventory-modal-game\">" + game.name + "</div>" +
        "<div class=\"stock-current\">" +
          "<div><span>当前高库存</span><strong>" + formatNumber(game.stock) + "</strong></div>" +
          "<div><span>当前低库存</span><strong>" + formatNumber(game.lowStock) + "</strong></div>" +
          "<div><span>当前初始库存</span><strong>" + formatNumber(game.initStock) + "</strong></div>" +
        "</div>" +
        "<div class=\"stock-form\">" +
          "<label><span>高库存调整</span><input type=\"number\" step=\"1\" id=\"stockHighInput\" value=\"0\" placeholder=\"输入正数增加，负数减少\"></label>" +
          "<label><span>低库存调整</span><input type=\"number\" step=\"1\" id=\"stockLowInput\" value=\"0\" placeholder=\"输入正数增加，负数减少\"></label>" +
          "<label><span>初始库存调整</span><input type=\"number\" step=\"1\" id=\"stockInitInput\" value=\"0\" placeholder=\"输入正数增加，负数减少\"></label>" +
        "</div>" +
        "<div class=\"stock-form-tip\" id=\"stockFormTip\">调整后库存不能小于 0，初始库存必须大于 0。当前 T：" + stockRatio(game) + "</div>" +
        "<div class=\"inventory-modal-actions\">" +
          "<button type=\"button\" class=\"btn btn-outline\" data-stock-cancel>取消</button>" +
          "<button type=\"button\" class=\"btn btn-primary\" data-stock-confirm>确定</button>" +
        "</div>" +
      "</div>" +
    "</div>";
  }

  function openStockModal(merchant, site, game) {
    var oldTotal = gameTotalStock(game);
    var modalWrap = document.createElement("div");
    modalWrap.innerHTML = stockModalHtml(merchant, site, game);
    var modal = modalWrap.firstChild;
    document.body.appendChild(modal);

    function close() {
      modal.remove();
    }

    modal.addEventListener("click", function(event) {
      if (event.target === modal || event.target.closest("[data-stock-cancel]")) {
        close();
        return;
      }
      if (!event.target.closest("[data-stock-confirm]")) return;
      var highInput = modal.querySelector("#stockHighInput");
      var lowInput = modal.querySelector("#stockLowInput");
      var initInput = modal.querySelector("#stockInitInput");
      var tip = modal.querySelector("#stockFormTip");
      var highAdjust = Number(highInput.value || 0);
      var lowAdjust = Number(lowInput.value || 0);
      var initAdjust = Number(initInput.value || 0);
      var nextHigh = Math.floor(game.stock + highAdjust);
      var nextLow = Math.floor(game.lowStock + lowAdjust);
      var nextInit = Math.floor(game.initStock + initAdjust);
      if (!Number.isFinite(highAdjust) || !Number.isFinite(lowAdjust) || !Number.isFinite(initAdjust) || nextHigh < 0 || nextLow < 0 || nextInit <= 0) {
        tip.textContent = "调整后的高低库存不能小于 0，初始库存必须大于 0。";
        tip.classList.add("is-error");
        return;
      }
      game.stock = nextHigh;
      game.lowStock = nextLow;
      game.initStock = nextInit;
      var nextTotal = gameTotalStock(game);
      site.totalStock = site.totalStock - oldTotal + nextTotal;
      merchant.totalStock = merchant.totalStock - oldTotal + nextTotal;
      site.gameList.sort(function(a, b) { return gameTotalStock(b) - gameTotalStock(a); });
      merchant.siteList.sort(function(a, b) { return b.totalStock - a.totalStock; });
      updateOverviewTotal();
      renderGameList(merchant.id, site.id);
      close();
    });
  }

  function renderGameList(merchantId, siteId) {
    currentPage = "game";
    currentMerchantId = merchantId;
    currentSiteId = siteId;
    currentSearchKeyword = null;
    updateBreadcrumb();
    var merchant = fullData.find(function(item) { return item.id === merchantId; });
    var site = merchant.siteList.find(function(item) { return item.id === siteId; });
    var keyword = document.getElementById("filterName").value.trim();
    var sortType = document.getElementById("filterSort").value;
    var rows = site.gameList.slice();
    if (keyword) rows = rows.filter(function(item) { return fuzzyMatch(item.name, keyword).match; });
    rows.sort(function(a, b) { return sortType === "stockDesc" ? gameTotalStock(b) - gameTotalStock(a) : gameTotalStock(a) - gameTotalStock(b); });
    if (!rows.length) {
      document.getElementById("contentContainer").innerHTML = "<div class=\"empty-state\"><h3>暂无匹配的游戏</h3><p>请更换搜索关键词后重试</p></div>";
      return;
    }
    var sortIcon = sortType === "stockDesc" ? "▼" : "▲";
    document.getElementById("contentContainer").innerHTML =
      "<table class=\"game-table\"><thead><tr><th width=\"60\">序号</th><th>游戏名称</th><th id=\"sortStock\">库存 " + sortIcon + "</th><th>初始库存</th><th>T</th><th>RTP</th><th width=\"100\">站内排名</th><th>操作</th></tr></thead><tbody>" +
      rows.map(function(game, index) {
        var high = gameTotalStock(game) > 700000;
        return "<tr class=\"" + (high ? "high-stock" : "") + "\">" +
          "<td>" + (index + 1) + "</td>" +
          "<td class=\"game-name\">" + highlightKeyword(game.name, keyword) + "</td>" +
          "<td class=\"game-stock\">" + stockDisplayHtml(game) + "</td>" +
          "<td>" + formatNumber(game.initStock) + "</td>" +
          "<td><span class=\"tag tag-t\">" + stockRatio(game) + "</span></td>" +
          "<td><span class=\"tag tag-rtp\">" + game.rtp + "%</span></td>" +
          "<td><span class=\"tag " + (index < 10 ? "tag-success" : "tag-secondary") + "\">第" + (index + 1) + "名</span></td>" +
          "<td><button class=\"btn btn-primary btn-sm\" type=\"button\" data-stock-game=\"" + game.id + "\">修改库存</button></td>" +
        "</tr>";
      }).join("") +
      "</tbody></table>";
  }

  function renderGameSearchResults(keyword) {
    currentPage = "search";
    currentSearchKeyword = keyword;
    currentMerchantId = null;
    currentSiteId = null;
    updateBreadcrumb();
    var results = [];
    fullData.forEach(function(merchant) {
      merchant.siteList.forEach(function(site) {
        site.gameList.forEach(function(game) {
          var match = fuzzyMatch(game.name, keyword);
          if (match.match) {
            results.push({
              merchantName: merchant.name,
              merchantId: merchant.id,
              siteName: site.name,
              siteId: site.id,
              gameName: game.name,
              currency: merchant.currency,
              stock: game.stock,
              lowStock: game.lowStock,
              initStock: game.initStock,
              rtp: game.rtp,
              score: match.score
            });
          }
        });
      });
    });
    results.sort(function(a, b) { return b.score - a.score || gameTotalStock(b) - gameTotalStock(a); });
    if (!results.length) {
      document.getElementById("contentContainer").innerHTML = "<div class=\"empty-state\"><h3>未找到匹配游戏</h3><p>支持片段搜索：001、游戏5等</p><button class=\"btn btn-primary\" type=\"button\" data-return-home>返回首页</button></div>";
      return;
    }
    document.getElementById("contentContainer").innerHTML =
      "<div class=\"search-result-header\"><div class=\"search-result-title\">游戏「" + keyword + "」全平台库存</div><div class=\"search-result-total\">共 " + results.length + " 条</div></div>" +
      "<table class=\"game-table\"><thead><tr><th>序号</th><th>商户</th><th>站点</th><th>游戏</th><th>货币</th><th>RTP</th><th>库存</th><th>T</th><th>操作</th></tr></thead><tbody>" +
      results.map(function(item, index) {
        return "<tr><td>" + (index + 1) + "</td><td>" + item.merchantName + "</td><td>" + item.siteName + "</td><td class=\"game-name\">" + highlightKeyword(item.gameName, keyword) + "</td><td><span class=\"tag tag-currency\">" + item.currency + "</span></td><td><span class=\"tag tag-rtp\">" + item.rtp + "%</span></td><td class=\"game-stock\">" + stockDisplayHtml(item) + "</td><td><span class=\"tag tag-t\">" + stockRatio(item) + "</span></td><td><button class=\"btn btn-outline btn-sm\" type=\"button\" data-jump-merchant=\"" + item.merchantId + "\" data-jump-site=\"" + item.siteId + "\">查看详情</button></td></tr>";
      }).join("") +
      "</tbody></table>";
  }

  function rerenderCurrent() {
    if (currentPage === "merchant") renderMerchantList();
    else if (currentPage === "site") renderSiteList(currentMerchantId);
    else if (currentPage === "game") renderGameList(currentMerchantId, currentSiteId);
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
      var merchantTarget = event.target.closest("[data-merchant-id]");
      if (merchantTarget) {
        document.getElementById("filterName").value = "";
        renderSiteList(Number(merchantTarget.getAttribute("data-merchant-id")));
        return;
      }
      var siteTarget = event.target.closest("[data-site-id]");
      if (siteTarget && currentPage === "site") {
        document.getElementById("filterName").value = "";
        renderGameList(currentMerchantId, Number(siteTarget.getAttribute("data-site-id")));
        return;
      }
      var stockTarget = event.target.closest("[data-stock-game]");
      if (stockTarget) {
        modifyStock(currentMerchantId, currentSiteId, Number(stockTarget.getAttribute("data-stock-game")));
        return;
      }
      var sortStock = event.target.closest("#sortStock");
      if (sortStock) {
        var sort = document.getElementById("filterSort");
        sort.value = sort.value === "stockDesc" ? "stockAsc" : "stockDesc";
        renderGameList(currentMerchantId, currentSiteId);
        return;
      }
      var home = event.target.closest(".nav-home, [data-return-home]");
      if (home) {
        document.getElementById("globalSearch").value = "";
        document.getElementById("filterName").value = "";
        renderMerchantList();
        return;
      }
      var merchantBreadcrumb = event.target.closest(".nav-merchant");
      if (merchantBreadcrumb) {
        document.getElementById("filterName").value = "";
        renderSiteList(Number(merchantBreadcrumb.getAttribute("data-id")));
        return;
      }
      var jump = event.target.closest("[data-jump-merchant]");
      if (jump) {
        document.getElementById("globalSearch").value = "";
        document.getElementById("filterName").value = "";
        renderGameList(Number(jump.getAttribute("data-jump-merchant")), Number(jump.getAttribute("data-jump-site")));
      }
    });

    document.getElementById("filterName").addEventListener("input", debounce(rerenderCurrent, 300));
    document.getElementById("filterSort").addEventListener("change", rerenderCurrent);
    document.getElementById("globalSearch").addEventListener("input", debounce(function(event) {
      var keyword = event.target.value.trim();
      if (keyword) renderGameSearchResults(keyword);
      else renderMerchantList();
    }, 300));
  }

  function buildPage() {
    var app = document.getElementById("app");
    if (!app) return;
    initData();
    app.innerHTML = shellHtml();
    renderMerchantList();
    bindEvents(app);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildPage);
  } else {
    buildPage();
  }
})();
