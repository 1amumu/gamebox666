(function() {
  var merchants = [
    { country: "印度", ids: [
      { id: "1041", name: "星海娱乐" },
      { id: "1042", name: "银河互动" },
      { id: "1043", name: "南亚娱乐城" },
      { id: "1044", name: "海湾娱乐" },
      { id: "1045", name: "金冠游戏" },
      { id: "1046", name: "银月互动" }
    ] },
    { country: "加纳", ids: [
      { id: "2041", name: "恒星科技" },
      { id: "2042", name: "极光娱乐" },
      { id: "2043", name: "蓝港互娱" },
      { id: "2044", name: "红杉游戏" }
    ] }
  ];
  var selectedObjects = [];

  function currentFile() {
    var hash = decodeURIComponent(window.location.hash || "");
    if (hash.indexOf(".html") !== -1) return hash.replace(/^#/, "").split("/").pop();
    var path = decodeURIComponent(window.location.pathname || "");
    return path.split("/").pop() || "发布消息页.html";
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
      var active = tab.file === "发布消息页.html" ? " is-active" : "";
      return "<button type=\"button\" class=\"codex-page-tab" + active + "\" data-tab-file=\"" + tab.file + "\"><span class=\"codex-page-tab-dot\"></span><span class=\"codex-page-tab-title\">" + tab.title + "</span><span class=\"codex-page-tab-close\">×</span></button>";
    }).join("");
  }

  function treeHtml() {
    return "<div class=\"publish-object-menu\" hidden>" +
      "<label class=\"publish-tree-head\"><input type=\"checkbox\" data-all checked><span>全部</span></label>" +
      "<div class=\"publish-tree-list\">" + merchants.map(function(group) {
        return "<div class=\"publish-tree-group\">" +
          "<label class=\"publish-tree-country\"><button type=\"button\" class=\"publish-tree-arrow\" data-tree-collapse>⌄</button><input type=\"checkbox\" data-country=\"" + group.country + "\"><span>" + group.country + "</span></label>" +
          group.ids.map(function(item) {
            return "<label class=\"publish-tree-item\"><input type=\"checkbox\" data-merchant-id=\"" + item.id + "\" data-merchant-name=\"" + item.name + "\"><span>" + item.id + " " + item.name + "</span></label>";
          }).join("") +
        "</div>";
      }).join("") + "</div>" +
    "</div>";
  }

  function selectedText() {
    if (!selectedObjects.length) return "全部";
    if (selectedObjects.length <= 2) return selectedObjects.join("、");
    return selectedObjects.slice(0, 2).join("、") + "等" + selectedObjects.length + "项";
  }

  function updateObjectText(root) {
    var all = root.querySelector("[data-all]");
    if (all.checked) {
      selectedObjects = [];
    } else {
      selectedObjects = Array.from(root.querySelectorAll("[data-merchant-id]:checked")).map(function(input) {
        return input.getAttribute("data-merchant-id") + " " + input.getAttribute("data-merchant-name");
      });
      Array.from(root.querySelectorAll("[data-country]:checked")).forEach(function(input) {
        var country = input.getAttribute("data-country");
        if (selectedObjects.indexOf(country) === -1) selectedObjects.unshift(country);
      });
    }
    var text = document.querySelector(".publish-object-text");
    if (text) text.textContent = selectedText();
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
        "<h1 class=\"topbar-page-title\">发布消息</h1>" +
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
        "<div class=\"publish-page\">" +
          "<div class=\"codex-page-tabs\">" + pageTabs() + "</div>" +
          "<section class=\"publish-panel\">" +
            "<div class=\"publish-body\">" +
              "<div class=\"publish-form\">" +
                "<div class=\"publish-row\"><label>公告标题<span class=\"publish-required\">*</span></label><input class=\"publish-input\" type=\"text\" maxlength=\"80\" placeholder=\"请输入公告标题，不超过xx个汉字\"></div>" +
                "<div class=\"publish-row\"><label>公告对象<span class=\"publish-required\">*</span></label><div class=\"publish-object-wrap\"><button type=\"button\" class=\"publish-select-like\" data-object-toggle><span class=\"publish-object-text\">全部</span></button>" + treeHtml() + "</div></div>" +
                "<div class=\"publish-row\"><label>公告类型</label><span><span class=\"publish-type-pill\">平台公告</span></span></div>" +
                "<div class=\"publish-row\"><label>发布者</label><span class=\"publish-author\">xxxx管理员</span></div>" +
                "<div class=\"publish-row\"><label>公告摘要<span class=\"publish-required\">*</span></label><input class=\"publish-summary\" type=\"text\" maxlength=\"120\" placeholder=\"请输入公告摘要，不超过xx个汉字\"></div>" +
                "<div class=\"publish-row publish-text-row\"><label>公告正文<span class=\"publish-required\">*</span></label><textarea class=\"publish-textarea\" placeholder=\"请输入完整的消息\"></textarea></div>" +
                "<div class=\"publish-actions\"><button type=\"button\" class=\"publish-submit\">发布公告</button></div>" +
              "</div>" +
            "</div>" +
          "</section>" +
        "</div>" +
      "</main>" +
    "</div>";
  }

  function showToast(text) {
    var old = document.querySelector(".publish-toast");
    if (old) old.remove();
    var toast = document.createElement("div");
    toast.className = "publish-toast";
    toast.textContent = text;
    document.body.appendChild(toast);
    setTimeout(function() { toast.remove(); }, 1600);
  }

  function syncTree(root, source) {
    if (source.matches("[data-all]")) {
      root.querySelectorAll("input").forEach(function(input) { input.checked = source.checked; });
      updateObjectText(root);
      return;
    }
    if (source.matches("[data-country]")) {
      source.closest(".publish-tree-group").querySelectorAll("[data-merchant-id]").forEach(function(input) {
        input.checked = source.checked;
      });
    }
    var allChildren = Array.from(root.querySelectorAll("[data-merchant-id]"));
    root.querySelector("[data-all]").checked = allChildren.every(function(input) { return input.checked; });
    root.querySelectorAll("[data-country]").forEach(function(countryInput) {
      var groupChildren = Array.from(countryInput.closest(".publish-tree-group").querySelectorAll("[data-merchant-id]"));
      countryInput.checked = groupChildren.every(function(input) { return input.checked; });
    });
    updateObjectText(root);
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

      var objectToggle = event.target.closest("[data-object-toggle]");
      if (objectToggle) {
        var menu = objectToggle.closest(".publish-object-wrap").querySelector(".publish-object-menu");
        menu.hidden = !menu.hidden;
        return;
      }

      var collapse = event.target.closest("[data-tree-collapse]");
      if (collapse) {
        var group = collapse.closest(".publish-tree-group");
        var collapsed = !group.classList.contains("is-collapsed");
        group.classList.toggle("is-collapsed", collapsed);
        group.querySelectorAll(".publish-tree-item").forEach(function(item) {
          item.hidden = collapsed;
        });
        return;
      }

      if (!event.target.closest(".publish-object-wrap")) {
        app.querySelectorAll(".publish-object-menu").forEach(function(menu) { menu.hidden = true; });
      }

      if (event.target.closest(".publish-submit")) {
        showToast("公告已发布");
      }
    });

    app.addEventListener("change", function(event) {
      if (event.target.closest(".publish-object-menu")) {
        syncTree(event.target.closest(".publish-object-menu"), event.target);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function() {
    var app = document.getElementById("app");
    app.innerHTML = shellHtml();
    bindEvents(app);
    updateTopbarTime(app);
    setInterval(function() { updateTopbarTime(app); }, 60000);
  });
})();
