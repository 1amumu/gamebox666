(function() {
  var rows = [
    { id: 1, account: "admin", group: "总管理员", createdAt: "2001/11/11 12:12:12", lastLoginAt: "2001/11/11 12:12:12", lastIp: "255:255:255:255", loginCount: 4324, status: "激活" },
    { id: 2, account: "finance01", group: "财务组", createdAt: "2026/03/01 09:30:20", lastLoginAt: "2026/06/02 10:18:43", lastIp: "10.16.8.24", loginCount: 318, status: "停用" },
    { id: 3, account: "ops_jili", group: "运营组", createdAt: "2026/02/18 11:05:46", lastLoginAt: "2026/06/01 18:22:10", lastIp: "10.16.9.72", loginCount: 965, status: "激活" },
    { id: 4, account: "risk_admin", group: "风控组", createdAt: "2026/01/12 14:18:06", lastLoginAt: "2026/06/02 08:48:29", lastIp: "10.16.7.18", loginCount: 1206, status: "激活" }
  ];

  function currentFile() {
    var hash = decodeURIComponent(window.location.hash || "");
    if (hash.indexOf(".html") !== -1) return hash.replace(/^#/, "").split("/").pop();
    var path = decodeURIComponent(window.location.pathname || "");
    return path.split("/").pop() || "账号管理.html";
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
      { file: "账号管理.html", title: "账号管理" },
      { file: "创建账号.html", title: "创建账号" },
      { file: "权限编辑.html", title: "权限编辑" },
      { file: "操作日志.html", title: "操作日志" }
    ];
    return tabs.map(function(tab) {
      var active = tab.file === "账号管理.html" ? " is-active" : "";
      return "<button type=\"button\" class=\"codex-page-tab" + active + "\" data-tab-file=\"" + tab.file + "\"><span class=\"codex-page-tab-dot\"></span><span class=\"codex-page-tab-title\">" + tab.title + "</span><span class=\"codex-page-tab-close\">×</span></button>";
    }).join("");
  }

  function rowHtml(row, index) {
    var disabled = row.status === "停用";
    return "<tr>" +
      "<td>" + row.id + "</td>" +
      "<td>" + row.account + "</td>" +
      "<td>" + row.group + "</td>" +
      "<td>" + row.createdAt + "</td>" +
      "<td>" + row.lastLoginAt + "</td>" +
      "<td>" + row.lastIp + "</td>" +
      "<td>" + row.loginCount + "</td>" +
      "<td><button type=\"button\" class=\"account-status-switch" + (disabled ? " is-disabled" : "") + "\" data-status=\"" + index + "\">" + row.status + "</button></td>" +
      "<td><span class=\"account-op\"><button type=\"button\" class=\"account-link\" data-op=\"修改\">修改</button><button type=\"button\" class=\"account-link\" data-op=\"删除\">删除</button><button type=\"button\" class=\"account-link\" data-op=\"日志\">日志</button><button type=\"button\" class=\"account-link\" data-op=\"修改密码\">修改密码</button></span></td>" +
    "</tr>";
  }

  function filteredRows() {
    var status = document.getElementById("accountStatus").value;
    return rows.filter(function(row) {
      return !status || row.status === status;
    });
  }

  function renderRows() {
    var list = filteredRows();
    document.querySelector(".account-table tbody").innerHTML = list.length
      ? list.map(function(row) { return rowHtml(row, rows.indexOf(row)); }).join("")
      : "<tr><td class=\"account-empty\" colspan=\"9\">暂无匹配账号</td></tr>";
  }

  function openModal(title, text, onConfirm) {
    var host = document.createElement("div");
    host.className = "account-modal-mask";
    host.innerHTML = "<div class=\"account-modal\"><strong>" + title + "</strong><p>" + text + "</p><div class=\"account-modal-actions\"><button type=\"button\" class=\"btn btn-outline\" data-modal-close>取消</button><button type=\"button\" class=\"btn btn-primary\" data-modal-confirm>确定</button></div></div>";
    document.body.appendChild(host);
    host.addEventListener("click", function(event) {
      if (event.target.closest("[data-modal-close]") || event.target === host) host.remove();
      if (event.target.closest("[data-modal-confirm]")) {
        if (onConfirm) onConfirm();
        host.remove();
      }
    });
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
        "<h1 class=\"topbar-page-title\">账号管理</h1>" +
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
        "<div class=\"account-page\">" +
          "<div class=\"codex-page-tabs\">" + pageTabs() + "</div>" +
          "<section class=\"account-panel\">" +
            "<div class=\"account-filter\">" +
              "<label class=\"account-field\"><span>用户状态</span><select id=\"accountStatus\" class=\"account-select\"><option value=\"激活\">激活</option><option value=\"停用\">停用</option><option value=\"\">全部</option></select></label>" +
              "<div class=\"account-actions\"><button type=\"button\" class=\"btn btn-primary\" id=\"queryBtn\">查询</button><button type=\"button\" class=\"btn btn-outline\" id=\"resetBtn\">重置</button></div>" +
              "<button type=\"button\" class=\"account-create\" id=\"createAccount\">创建账号</button>" +
            "</div>" +
            "<table class=\"account-table\"><colgroup><col style=\"width:80px\"><col style=\"width:120px\"><col style=\"width:130px\"><col style=\"width:160px\"><col style=\"width:160px\"><col style=\"width:150px\"><col style=\"width:100px\"><col style=\"width:110px\"><col style=\"width:230px\"></colgroup>" +
              "<thead><tr><th>用户ID</th><th>用户账号</th><th>权限组</th><th>注册时间</th><th>最后登录时间</th><th>最后登录IP</th><th>登录次数</th><th>状态</th><th>操作</th></tr></thead><tbody></tbody></table>" +
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

      var tab = event.target.closest("[data-tab-file]");
      if (tab && !event.target.classList.contains("codex-page-tab-close")) {
        window.location.href = tab.getAttribute("data-tab-file");
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

      var statusButton = event.target.closest("[data-status]");
      if (statusButton) {
        var index = Number(statusButton.getAttribute("data-status"));
        var row = rows[index];
        var next = row.status === "激活" ? "停用" : "激活";
        openModal("确认修改状态", "是否将账号 " + row.account + " 修改为" + next + "？", function() {
          row.status = next;
          renderRows();
        });
        return;
      }

      var op = event.target.closest("[data-op]");
      if (op) {
        openModal(op.getAttribute("data-op"), "这里展示“" + op.getAttribute("data-op") + "”对应的操作页面。");
      }
    });

    document.getElementById("queryBtn").addEventListener("click", renderRows);
    document.getElementById("resetBtn").addEventListener("click", function() {
      document.getElementById("accountStatus").value = "激活";
      renderRows();
    });
    document.getElementById("createAccount").addEventListener("click", function() {
      window.location.href = "创建账号.html";
    });
  }

  document.addEventListener("DOMContentLoaded", function() {
    var app = document.getElementById("app");
    app.innerHTML = shellHtml();
    bindEvents(app);
    renderRows();
    updateTopbarTime(app);
    setInterval(function() { updateTopbarTime(app); }, 60000);
  });
})();
