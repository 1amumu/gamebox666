(function() {
  var merchants = [
    { id: "M10086", name: "星海娱乐" },
    { id: "M10021", name: "蓝鲸游戏" },
    { id: "M10057", name: "银河互动" },
    { id: "M10012", name: "赤焰互娱" },
    { id: "M10073", name: "风暴游戏" }
  ];

  var gameTree = [
    {
      label: "SLOT",
      children: [
        {
          label: "PG",
          children: [
            { id: "2", name: "泰皇传说", checked: false },
            { id: "102", name: "罗马X", checked: false }
          ]
        },
        {
          label: "JILI",
          children: [
            { id: "5", name: "火热辣椒", checked: true },
            { id: "6", name: "发财树", checked: true },
            { id: "4", name: "关云长", checked: true },
            { id: "16", name: "丛林之王", checked: true }
          ]
        }
      ]
    }
  ];

  var treeSequence = 0;

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

  function currentFile() {
    var path = decodeURIComponent(window.location.pathname || "");
    return path.split("/").pop() || "游戏rtp配置.html";
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
    var files = ["游戏列表页.html", "飞机房间管理页.html", "库存管理.html", "游戏rtp配置.html"];
    return files.map(function(file) {
      var active = file === "游戏rtp配置.html" ? " is-active" : "";
      var title = file === "游戏rtp配置.html" ? "批量RTP配置" : file.replace(".html", "");
      return "<button type=\"button\" class=\"codex-page-tab" + active + "\" data-tab-file=\"" + file + "\"><span class=\"codex-page-tab-dot\"></span><span class=\"codex-page-tab-title\">" + title + "</span><span class=\"codex-page-tab-close\">×</span></button>";
    }).join("");
  }

  function merchantOptions() {
    return merchants.map(function(item) {
      return '<label class="merchant-option" data-merchant-row data-row-text="' + escapeHtml(item.name + " " + item.id) + '">' +
        '<input type="checkbox" data-merchant-item value="' + escapeHtml(item.id) + '">' +
        '<span>' + escapeHtml(item.name + "（" + item.id + "）") + '</span>' +
      '</label>';
    }).join("");
  }

  function selectedMerchants() {
    return Array.prototype.map.call(document.querySelectorAll("[data-merchant-item]:checked"), function(input) {
      var merchant = merchants.find(function(item) { return item.id === input.value; });
      return merchant || { id: input.value, name: input.value };
    });
  }

  function syncMerchantSelector() {
    var input = document.querySelector(".merchant-trigger-input");
    if (!input || document.activeElement === input) return;
    var selected = selectedMerchants();
    if (!selected.length) input.value = "";
    else if (selected.length === 1) input.value = selected[0].name;
    else input.value = "已选 " + selected.length + " 个商户";
  }

  function filterMerchants(keyword) {
    var value = keyword.trim().toLowerCase();
    Array.prototype.forEach.call(document.querySelectorAll("[data-merchant-row]"), function(row) {
      row.hidden = value && row.getAttribute("data-row-text").toLowerCase().indexOf(value) === -1;
    });
  }

  function renderTree(nodes, level, ancestors) {
    return nodes.map(function(node) {
      if (node.children) {
        var key = "rtp-tree-" + (treeSequence++);
        var checked = level === 0 || node.label === "PG" || node.label === "JILI";
        return '<div class="tree-row level-' + level + '" data-group-key="' + key + '">' +
          '<button type="button" class="tree-caret is-open" data-caret-key="' + key + '" aria-label="展开"></button>' +
          '<label><input type="checkbox" data-tree-group="' + key + '"' + (checked ? " checked" : "") + '><span class="tree-group-name">' + escapeHtml(node.label) + '</span></label>' +
        '</div>' +
        '<div class="tree-children" data-children-key="' + key + '">' + renderTree(node.children, level + 1, ancestors.concat(key)) + '</div>';
      }
      return '<label class="tree-row level-' + level + '" data-tree-item-row data-row-text="' + escapeHtml(node.id + " " + node.name) + '" data-ancestor-keys="' + escapeHtml(ancestors.join(" ")) + '">' +
        '<span style="width:18px"></span><input type="checkbox" data-tree-item value="' + escapeHtml(node.id) + '"' + (node.checked ? " checked" : "") + '>' +
        '<span class="tree-game-name">【' + escapeHtml(node.id) + '】 ' + escapeHtml(node.name) + '</span>' +
      '</label>';
    }).join("");
  }

  function selectedGamesText() {
    var checked = document.querySelectorAll("[data-tree-item]:checked");
    if (!checked.length) return "全部";
    if (checked.length === 1) {
      var row = checked[0].closest("[data-tree-item-row]");
      return row ? row.textContent.trim() : "已选 1 个游戏";
    }
    return "已选 " + checked.length + " 个游戏";
  }

  function syncTreeGroups() {
    Array.prototype.forEach.call(document.querySelectorAll("[data-tree-group]"), function(groupInput) {
      var key = groupInput.getAttribute("data-tree-group");
      var items = document.querySelectorAll("[data-tree-item-row][data-ancestor-keys~='" + key + "'] [data-tree-item]");
      var checked = document.querySelectorAll("[data-tree-item-row][data-ancestor-keys~='" + key + "'] [data-tree-item]:checked");
      groupInput.checked = items.length > 0 && checked.length === items.length;
      groupInput.indeterminate = checked.length > 0 && checked.length < items.length;
    });
    var input = document.querySelector(".game-trigger-input");
    if (input && document.activeElement !== input) input.value = selectedGamesText();
  }

  function filterTree(keyword) {
    var value = keyword.trim().toLowerCase();
    Array.prototype.forEach.call(document.querySelectorAll("[data-tree-item-row]"), function(row) {
      row.hidden = value && row.getAttribute("data-row-text").toLowerCase().indexOf(value) === -1;
    });
  }

  function shellHtml() {
    treeSequence = 0;
    return "<div class=\"app-shell\">" +
      "<a class=\"app-brand\" href=\"首页仪表盘.html\">GB总后台</a>" +
      "<header class=\"app-topbar\">" +
        "<h1 class=\"topbar-page-title\">批量RTP配置</h1>" +
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
      "<main class=\"app-main\"><div class=\"rtp-page\">" +
        "<div class=\"codex-page-tabs\">" + pageTabs() + "</div>" +
        "<div class=\"rtp-panel\">" +
          "<div class=\"rtp-form\">" +
            "<div class=\"rtp-row\"><div class=\"rtp-label\">选择商户</div><div class=\"rtp-multi-selector\">" +
              "<div class=\"merchant-trigger\"><input class=\"merchant-trigger-input\" placeholder=\"请选择\" autocomplete=\"off\"><button type=\"button\" class=\"merchant-arrow\" aria-label=\"展开\"></button></div>" +
              "<div class=\"merchant-menu\">" + merchantOptions() + "</div>" +
            "</div></div>" +
            "<div class=\"rtp-row\"><div class=\"rtp-label\">选择游戏</div><div class=\"rtp-game-selector\">" +
              "<div class=\"game-trigger\"><input class=\"game-trigger-input\" value=\"全部\" placeholder=\"全部\"><button type=\"button\" class=\"game-arrow\" aria-label=\"展开\"></button></div>" +
              "<div class=\"game-menu\">" + renderTree(gameTree, 0, []) + "</div>" +
            "</div></div>" +
            "<div class=\"rtp-row\"><div class=\"rtp-label\">游戏RTP</div><input class=\"rtp-input\" id=\"rtpInput\" type=\"number\" min=\"0\" max=\"100\" step=\"0.01\" placeholder=\"请输入 RTP\"></div>" +
            "<div class=\"rtp-actions\"><button type=\"button\" class=\"rtp-confirm\" data-confirm>确定</button></div>" +
            "<div class=\"rtp-tip\" id=\"rtpTip\" hidden></div>" +
            "<div id=\"confirmHost\"></div>" +
          "</div>" +
        "</div>" +
      "</div></main>" +
    "</div>";
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

      var selector = event.target.closest(".rtp-game-selector, .rtp-multi-selector");
      if (!selector) {
        var open = app.querySelector(".rtp-game-selector.is-open");
        if (open) {
          open.classList.remove("is-open");
          syncTreeGroups();
        }
        var openMerchant = app.querySelector(".rtp-multi-selector.is-open");
        if (openMerchant) {
          openMerchant.classList.remove("is-open");
          syncMerchantSelector();
        }
      }
      if (event.target.closest(".merchant-arrow") || event.target.closest(".merchant-trigger-input")) {
        var merchantSelector = event.target.closest(".rtp-multi-selector");
        var openGameSelector = app.querySelector(".rtp-game-selector.is-open");
        if (openGameSelector) {
          openGameSelector.classList.remove("is-open");
          syncTreeGroups();
        }
        merchantSelector.classList.add("is-open");
        merchantSelector.querySelector(".merchant-trigger-input").focus();
        return;
      }
      if (event.target.closest(".game-arrow") || event.target.closest(".game-trigger-input")) {
        var gameSelector = event.target.closest(".rtp-game-selector");
        var openMerchantSelector = app.querySelector(".rtp-multi-selector.is-open");
        if (openMerchantSelector) {
          openMerchantSelector.classList.remove("is-open");
          syncMerchantSelector();
        }
        gameSelector.classList.add("is-open");
        gameSelector.querySelector(".game-trigger-input").focus();
        return;
      }
      var caret = event.target.closest("[data-caret-key]");
      if (caret) {
        caret.classList.toggle("is-open");
        var children = app.querySelector("[data-children-key='" + caret.getAttribute("data-caret-key") + "']");
        if (children) children.classList.toggle("is-collapsed");
        return;
      }
      if (event.target.closest("[data-confirm]")) {
        var rtp = document.getElementById("rtpInput");
        var tip = document.getElementById("rtpTip");
        var selected = selectedMerchants();
        var gameCount = document.querySelectorAll("[data-tree-item]:checked").length;
        if (!selected.length) {
          tip.hidden = false;
          tip.style.color = "#D92D20";
          tip.textContent = "请至少选择一个商户。";
          return;
        }
        if (!rtp.value || Number(rtp.value) < 0 || Number(rtp.value) > 100) {
          tip.hidden = false;
          tip.style.color = "#D92D20";
          tip.textContent = "请输入 0-100 之间的游戏 RTP。";
          return;
        }
        openConfirm(selected, gameCount, Number(rtp.value));
        return;
      }
      if (event.target.closest("[data-confirm-cancel]")) {
        closeConfirm();
        return;
      }
      if (event.target.closest("[data-confirm-ok]")) {
        var confirm = document.querySelector(".confirm-mask");
        var tipNode = document.getElementById("rtpTip");
        if (confirm && tipNode) {
          tipNode.hidden = false;
          tipNode.style.color = "#16A34A";
          tipNode.textContent = confirm.getAttribute("data-success-text");
        }
        closeConfirm();
      }
    });

    app.addEventListener("change", function(event) {
      if (event.target.closest("[data-merchant-item]")) {
        syncMerchantSelector();
        return;
      }
      var groupInput = event.target.closest("[data-tree-group]");
      if (groupInput) {
        var key = groupInput.getAttribute("data-tree-group");
        Array.prototype.forEach.call(app.querySelectorAll("[data-tree-item-row][data-ancestor-keys~='" + key + "'] [data-tree-item]"), function(input) {
          input.checked = groupInput.checked;
        });
        syncTreeGroups();
        return;
      }
      if (event.target.closest("[data-tree-item]")) {
        syncTreeGroups();
      }
    });

    var gameInput = app.querySelector(".game-trigger-input");
    if (gameInput) {
      gameInput.addEventListener("focus", function() {
        gameInput.closest(".rtp-game-selector").classList.add("is-open");
      });
      gameInput.addEventListener("input", function() {
        filterTree(gameInput.value);
        gameInput.closest(".rtp-game-selector").classList.add("is-open");
      });
    }
    var merchantInput = app.querySelector(".merchant-trigger-input");
    if (merchantInput) {
      merchantInput.addEventListener("focus", function() {
        merchantInput.closest(".rtp-multi-selector").classList.add("is-open");
      });
      merchantInput.addEventListener("input", function() {
        filterMerchants(merchantInput.value);
        merchantInput.closest(".rtp-multi-selector").classList.add("is-open");
      });
    }
  }

  function closeConfirm() {
    var node = document.querySelector(".confirm-mask");
    if (node) node.remove();
  }

  function openConfirm(selected, gameCount, rtp) {
    var host = document.getElementById("confirmHost");
    var names = selected.map(function(item) { return item.name; }).join("、");
    var successText = "已保存：" + selected.length + " 个商户，" + (gameCount || "全部") + " 个游戏，RTP " + rtp.toFixed(2) + "%。";
    host.innerHTML = '<div class="confirm-mask" data-success-text="' + escapeHtml(successText) + '">' +
      '<div class="confirm-dialog">' +
        '<div class="confirm-head">确认修改游戏 RTP</div>' +
        '<div class="confirm-body">' +
          '<div>商户：<strong>' + escapeHtml(names) + '</strong></div>' +
          '<div>游戏：<strong>' + (gameCount || "全部") + ' 个</strong></div>' +
          '<div>RTP：<strong>' + rtp.toFixed(2) + '%</strong></div>' +
        '</div>' +
        '<div class="confirm-actions">' +
          '<button type="button" class="confirm-cancel" data-confirm-cancel>取消</button>' +
          '<button type="button" class="confirm-ok" data-confirm-ok>确定</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  function buildPage() {
    var app = document.getElementById("app");
    if (!app) return;
    app.innerHTML = shellHtml();
    syncMerchantSelector();
    syncTreeGroups();
    bindEvents(app);
    updateTopbarTime(app);
    window.setInterval(function() {
      updateTopbarTime(app);
    }, 30000);
  }

  function updateTopbarTime(app) {
    var node = app.querySelector("[data-topbar-time]");
    if (!node) return;
    var now = new Date();
    var hh = String(now.getHours()).padStart(2, "0");
    var mm = String(now.getMinutes()).padStart(2, "0");
    node.textContent = hh + ":" + mm + " 中国";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildPage);
  } else {
    buildPage();
  }
})();
