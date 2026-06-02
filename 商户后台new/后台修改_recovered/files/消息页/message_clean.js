(function() {
  var activeType = "全部";
  var messages = [
    { type: "玩家警报", badge: "player", title: "玩家10370000844097单次盈利超大额阈值", content: "这里输出[玩家警报]的简短信息", time: "10 分钟前", sender: "自动报警", sendTime: "2026-03-09 10:00:00", detail: "环境：正式\n游戏ID:6\n商户ID:21384\n用户ID：10370000844097\n告警指标:big_profit\n告警内容：玩家10370000844097单次盈利超大额阈值\n严重等级：1\n详细数据：阈值=7341.44，记录ID=69b383ecba624c0001edea6a，24小时盈利=65247.0，下注意金额=8000.0，提现倍数=3.34，本次盈利=18720.0\n历史总盈利:108791.91\n玩家注册至今天数：2.0\n告警次数：24小时告警记录数：14.0，24小时发送告警数：14\n触发次数：1", unread: true },
    { type: "商户结算", badge: "settle", title: "您的x月x日结算信息", content: "", meta: ["总流水：xxxxxxx", "总下注人数：xxxxxxxx", "总下注数：xxxxxxxxxxx"], time: "今天 01:30", sender: "财务系统", sendTime: "2026-03-09 01:30:00", detail: "结算周期：2026-03-08\n总流水：xxxxxxx\n总下注人数：xxxxxxxx\n总下注数：xxxxxxxxxxx\n请前往结算商户页面查看完整结算简报。", unread: true },
    { type: "额度提醒", badge: "quota", title: "您的额度已经不足xxxx美元，请即时充值", content: "截至x月x日 xx:xx，您的剩余额度为xxxx美元，为了避免游戏停机，请您即时充值", time: "4天前", sender: "额度监控", sendTime: "2026-03-05 12:20:00", detail: "截至x月x日 xx:xx，您的剩余额度为xxxx美元。\n为了避免游戏停机，请您即时充值。\n建议充值金额：5000 USD。", unread: true },
    { type: "平台公告", badge: "notice", title: "平台JILI系列游戏 国际时间 1月2日 8:00不停机更新", content: "JILI系列游戏修复已知BUG，调整数值平衡等等。", time: "23天前", sender: "平台管理员", sendTime: "2026-02-14 08:00:00", detail: "平台JILI系列游戏将在国际时间1月2日 8:00不停机更新。\n更新内容：修复已知BUG，调整数值平衡等等。", unread: true },
    { type: "玩家警报", badge: "player", title: "玩家10370000844218连续下注异常", content: "玩家短时间内多次触发高风险下注，请及时查看。", time: "35 分钟前", sender: "自动报警", sendTime: "2026-03-09 09:35:00", detail: "玩家短时间内多次触发高风险下注，请及时查看。\n风险等级：2\n触发次数：8", unread: false },
    { type: "其他", badge: "other", title: "系统维护提醒", content: "部分统计任务将在凌晨低峰时段自动校验。", time: "昨天 22:10", sender: "系统", sendTime: "2026-03-08 22:10:00", detail: "部分统计任务将在凌晨低峰时段自动校验。\n校验期间不影响玩家正常游戏。", unread: true }
  ];

  var tabMeta = [
    { name: "全部", total: 7890, unread: 99 },
    { name: "玩家警报", total: 964, unread: 99 },
    { name: "商户结算", total: 964, unread: 64 },
    { name: "额度提醒", total: 964, unread: 4 },
    { name: "其他", total: 964, unread: 1 }
  ];

  function currentFile() {
    var hash = decodeURIComponent(window.location.hash || "");
    if (hash.indexOf(".html") !== -1) return hash.replace(/^#/, "").split("/").pop();
    var path = decodeURIComponent(window.location.pathname || "");
    return path.split("/").pop() || "消息页.html";
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
    var tabs = [
      { file: "发布消息页.html", title: "发布消息" },
      { file: "消息页.html", title: "查看消息" }
    ];
    return tabs.map(function(tab) {
      var active = tab.file === "消息页.html" ? " is-active" : "";
      return "<button type=\"button\" class=\"codex-page-tab" + active + "\" data-tab-file=\"" + tab.file + "\"><span class=\"codex-page-tab-dot\"></span><span class=\"codex-page-tab-title\">" + tab.title + "</span><span class=\"codex-page-tab-close\">×</span></button>";
    }).join("");
  }

  function tabHtml() {
    return tabMeta.map(function(tab) {
      var active = tab.name === activeType ? " is-active" : "";
      return "<button type=\"button\" class=\"message-tab" + active + "\" data-message-tab=\"" + tab.name + "\">" +
        tab.name + "(" + tab.total + ")" +
        (tab.unread ? "<span class=\"message-tab-badge\">" + tab.unread + "</span>" : "") +
      "</button>";
    }).join("");
  }

  function messageHtml(item, index) {
    return "<article class=\"message-item\" data-message-index=\"" + index + "\">" +
      (item.unread ? "<span class=\"message-unread-dot\"></span>" : "") +
      "<div class=\"message-head\">" +
        "<span class=\"message-type " + item.badge + "\">" + item.type + "</span>" +
        "<span class=\"message-title\">" + item.title + "</span>" +
      "</div>" +
      (item.content ? "<div class=\"message-content\">" + item.content + "</div>" : "") +
      (item.meta ? "<div class=\"message-meta-line\">" + item.meta.map(function(text) { return "<span>" + text + "</span>"; }).join("") + "</div>" : "") +
      "<span class=\"message-time\">" + item.time + "</span>" +
    "</article>";
  }

  function filteredMessages() {
    var keyword = document.getElementById("messageKeyword").value.trim().toLowerCase();
    return messages.filter(function(item) {
      var typeMatched = activeType === "全部" || item.type === activeType || (activeType === "其他" && item.type === "其他");
      var text = (item.title + " " + item.content + " " + (item.meta || []).join(" ")).toLowerCase();
      return typeMatched && (!keyword || text.indexOf(keyword) !== -1);
    });
  }

  function renderTabs() {
    document.querySelector(".message-tabs").innerHTML = tabHtml();
  }

  function renderMessages() {
    var list = filteredMessages();
    document.querySelector(".message-list").innerHTML = list.length
      ? list.map(function(item) { return messageHtml(item, messages.indexOf(item)); }).join("")
      : "<div class=\"message-empty\">暂无匹配消息</div>";
  }

  function closeDrawer() {
    var drawer = document.querySelector(".message-drawer-mask");
    if (drawer) drawer.remove();
  }

  function openDrawer(index) {
    var item = messages[index];
    if (!item) return;
    item.unread = false;
    renderMessages();
    closeDrawer();
    var host = document.createElement("div");
    host.className = "message-drawer-mask";
    host.innerHTML = "<aside class=\"message-drawer\">" +
      "<button type=\"button\" class=\"message-drawer-close\" data-drawer-close>×</button>" +
      "<div class=\"message-drawer-body\">" +
        "<span class=\"message-drawer-type message-type " + item.badge + "\">" + item.type + "</span>" +
        "<h2 class=\"message-drawer-title\">" + item.title + "</h2>" +
        "<div class=\"message-drawer-divider\"></div>" +
        "<div class=\"message-drawer-meta\"><span>发送方：" + (item.sender || "-") + "</span><span>" + (item.sendTime || item.time) + "</span></div>" +
        "<div class=\"message-drawer-detail\">" + (item.detail || item.content || "") + "</div>" +
      "</div>" +
      "<div class=\"message-drawer-actions\"><button type=\"button\" class=\"message-delete\" data-message-delete=\"" + index + "\">删除</button></div>" +
    "</aside>";
    document.body.appendChild(host);
  }

  function updateTopbarTime(app) {
    var node = app.querySelector("[data-topbar-time]");
    if (!node) return;
    var now = new Date();
    node.textContent = String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0") + " 中国";
  }

  function shellHtml() {
    return "<div class=\"app-shell\">" +
      "<a class=\"app-brand\" href=\"首页仪表盘.html\">GB总后台</a>" +
      "<header class=\"app-topbar\">" +
        "<h1 class=\"topbar-page-title\">消息页</h1>" +
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
      "<main class=\"app-main\">" +
        "<div class=\"message-page\">" +
          "<div class=\"codex-page-tabs\">" + pageTabs() + "</div>" +
          "<section class=\"message-panel\">" +
            "<div class=\"message-toolbar\">" +
              "<div class=\"message-search\"><label>搜索</label><input id=\"messageKeyword\" class=\"message-input\" type=\"text\" placeholder=\"消息标题/内容\"><button type=\"button\" class=\"message-btn primary\" id=\"messageQuery\">查询</button><button type=\"button\" class=\"message-btn\" id=\"messageReset\">重置</button><button type=\"button\" class=\"message-btn\" id=\"messageReadAll\">全部已读</button></div>" +
              "<button type=\"button\" class=\"message-publish\" id=\"messagePublish\">发布公告</button>" +
            "</div>" +
            "<div class=\"message-tabs\"></div>" +
            "<div class=\"message-list\"></div>" +
          "</section>" +
        "</div>" +
      "</main>" +
    "</div>";
  }

  function bindEvents(app) {
    app.addEventListener("click", function(event) {
      var toggle = event.target.closest("[data-sidebar-toggle]");
      if (toggle) {
        var title = toggle.getAttribute("data-sidebar-toggle");
        var section = toggle.closest(".sidebar-section");
        var children = section.querySelector(".sidebar-children");
        var state = readSidebarState();
        var collapsed = !section.classList.contains("is-collapsed");
        section.classList.toggle("is-collapsed", collapsed);
        children.hidden = collapsed;
        state[title] = !collapsed;
        writeSidebarState(state);
        return;
      }

      var pageTab = event.target.closest("[data-tab-file]");
      if (pageTab && !event.target.classList.contains("codex-page-tab-close")) {
        window.location.href = pageTab.getAttribute("data-tab-file");
        return;
      }

      if (event.target.classList.contains("codex-page-tab-close")) {
        var tabButton = event.target.closest("[data-tab-file]");
        if (tabButton && !tabButton.classList.contains("is-active")) tabButton.remove();
        return;
      }

      if (event.target.closest(".topbar-account-toggle")) {
        event.target.closest(".topbar-account-wrap").classList.toggle("is-open");
        return;
      }

      var messageTab = event.target.closest("[data-message-tab]");
      if (messageTab) {
        activeType = messageTab.getAttribute("data-message-tab");
        renderTabs();
        renderMessages();
        return;
      }

      var messageItem = event.target.closest("[data-message-index]");
      if (messageItem) {
        var index = Number(messageItem.getAttribute("data-message-index"));
        openDrawer(index);
        return;
      }

      if (event.target.closest("#messagePublish")) {
        window.location.href = "发布消息页.html";
      }
    });

    document.addEventListener("click", function(event) {
      if (event.target.classList && event.target.classList.contains("message-drawer-mask")) {
        closeDrawer();
        return;
      }
      if (event.target.closest("[data-drawer-close]")) {
        closeDrawer();
        return;
      }
      var deleteButton = event.target.closest("[data-message-delete]");
      if (deleteButton) {
        var index = Number(deleteButton.getAttribute("data-message-delete"));
        messages.splice(index, 1);
        closeDrawer();
        renderMessages();
      }
    });

    document.getElementById("messageQuery").addEventListener("click", renderMessages);
    document.getElementById("messageReset").addEventListener("click", function() {
      document.getElementById("messageKeyword").value = "";
      activeType = "全部";
      renderTabs();
      renderMessages();
    });
    document.getElementById("messageReadAll").addEventListener("click", function() {
      messages.forEach(function(item) { item.unread = false; });
      tabMeta.forEach(function(item) { item.unread = 0; });
      renderTabs();
      renderMessages();
    });
  }

  document.addEventListener("DOMContentLoaded", function() {
    var app = document.getElementById("app");
    app.innerHTML = shellHtml();
    bindEvents(app);
    renderTabs();
    renderMessages();
    updateTopbarTime(app);
    setInterval(function() { updateTopbarTime(app); }, 60000);
  });
})();
