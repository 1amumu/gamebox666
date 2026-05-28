(function() {
  var groups = [
    {
      label: "概括",
      icon: "home",
      iconText: "⌂",
      children: [
        { label: "首页", title: "首页仪表盘", href: "首页仪表盘.html", icon: "home" }
      ]
    },
    {
      label: "数据管理",
      icon: "report",
      iconText: "▦",
      children: [
        { label: "游戏记录", title: "游戏记录", href: "游戏记录.html", icon: "record" },
        { label: "运营数据", title: "运营数据", href: "运营数据.html", icon: "daily" },
        { label: "今日玩家盈亏", title: "今日玩家盈亏", href: "今日玩家盈亏.html", icon: "history" },
        { label: "飞机爆点数据", title: "飞机爆点数据", href: "飞机爆点数据.html", icon: "report" },
        { label: "玩家在线数据", title: "玩家在线数据", href: "玩家在线数据.html", icon: "online" },
        { label: "游戏留存", title: "游戏留存", href: "游戏留存.html", icon: "history" },
        { label: "玩家留存", title: "玩家留存", href: "玩家留存.html", icon: "history" }
      ]
    },
    {
      label: "商户管理",
      icon: "user",
      iconText: "▤",
      children: [
        { label: "商户列表", title: "商户列表", href: "商户列表.html", icon: "user" },
        { label: "创建商户", title: "创建商户", href: "创建商户.html", icon: "user" },
        { label: "商户盈亏", title: "商户盈亏", href: "商户盈亏.html", icon: "history" }
      ]
    },
    {
      label: "游戏管理",
      icon: "setting",
      iconText: "◇",
      children: [
        { label: "游戏列表", title: "游戏列表页", href: "游戏列表页.html", icon: "setting" },
        { label: "飞机房间管理", title: "飞机房间管理页", href: "飞机房间管理页.html", icon: "setting" },
        { label: "库存管理", title: "库存管理", href: "库存管理.html", icon: "report" },
        { label: "游戏RTP配置", title: "游戏rtp配置", href: "游戏rtp配置.html", icon: "setting" }
      ]
    },
    {
      label: "玩家管理",
      icon: "user",
      iconText: "◎",
      children: [
        { label: "玩家总览", title: "玩家总览页", href: "玩家总览页.html", icon: "user" },
        { label: "智能点控推荐", title: "智能点控推荐", href: "智能点控推荐.html", icon: "report" },
        { label: "点控玩家", title: "玩家点控", href: "玩家点控.html", icon: "user" }
      ]
    },
    {
      label: "财务管理",
      icon: "order",
      iconText: "￥",
      children: [
        { label: "财务总览", title: "财务总览", href: "财务总览.html", icon: "report" },
        { label: "汇率查询", title: "汇率查询", href: "汇率查询.html", icon: "report" },
        { label: "结算信息", title: "结算信息页", href: "结算信息页.html", icon: "order" },
        { label: "待结算信息", title: "待结算信息页", href: "待结算信息页.html", icon: "order" },
        { label: "充值订单", title: "充值订单页", href: "充值订单页.html", icon: "order" },
        { label: "赠送余额", title: "赠送余额页", href: "赠送余额页.html", icon: "order" }
      ]
    },
    {
      label: "消息管理",
      icon: "report",
      iconText: "✉",
      children: [
        { label: "发布消息", title: "发布消息页", href: "发布消息页.html", icon: "report" },
        { label: "查看消息", title: "消息页", href: "消息页.html", icon: "report" }
      ]
    },
    {
      label: "后台管理",
      icon: "system",
      iconText: "⚙",
      children: [
        { label: "账号管理", title: "账号管理", href: "账号管理.html", icon: "user" },
        { label: "创建账号", title: "创建账号", href: "创建账号.html", icon: "user" },
        { label: "权限编辑", title: "权限编辑", href: "权限编辑.html", icon: "setting" },
        { label: "操作日志", title: "操作日志", href: "操作日志.html", icon: "record" }
      ]
    }
  ];

  function plainGroups() {
    return groups.map(function(group) {
      return {
        title: group.label,
        icon: group.iconText,
        items: group.children.map(function(item) {
          return { title: item.label, file: item.href };
        })
      };
    });
  }

  window.GB_NAVIGATION = {
    storageKey: "gb-shared-sidebar-state",
    groups: groups,
    plainGroups: plainGroups
  };
})();
