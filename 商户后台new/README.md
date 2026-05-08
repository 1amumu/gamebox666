# 后台静态展示工程

这是一个基于 Axure 导出文件整理出来的静态后台展示工程，不连接真实后端，主要用于页面展示和前端交互演示。

## 入口

打开根目录的 `index.html` 会自动跳转到 Axure 工程入口：

```text
后台修改_recovered/index.html
```

## 主要目录

```text
new-chat-2/
├─ index.html                  # 根入口，跳转到 Axure 工程
├─ README.md                   # 当前工程说明
├─ 后台修改_recovered/          # Axure 静态页面工程
│  ├─ index.html               # Axure 首页入口
│  ├─ 首页仪表盘.html
│  ├─ 运营数据.html
│  ├─ 商户列表.html
│  ├─ 充值订单页.html
│  ├─ ...
│  ├─ data/                    # Axure 全局数据和样式
│  ├─ files/                   # 每个页面对应的样式和数据
│  ├─ images/                  # 图片资源
│  ├─ resources/               # Axure 运行资源
│  └─ plugins/                 # Axure 插件资源
```

## 修改方式

页面修改时，优先改对应的 `.html` 页面文件，例如：

- 首页仪表盘：`后台修改_recovered/首页仪表盘.html`
- 运营数据：`后台修改_recovered/运营数据.html`
- 商户列表：`后台修改_recovered/商户列表.html`
- 充值订单页：`后台修改_recovered/充值订单页.html`

页面的局部样式通常在：

```text
后台修改_recovered/files/页面名/styles.css
```

页面的 Axure 交互数据通常在：

```text
后台修改_recovered/files/页面名/data.js
```

## 注意

不要随意移动或重命名 `data`、`files`、`images`、`resources`、`plugins` 这些目录，Axure 页面依赖它们的相对路径。

后续如果要修改页面，直接说明页面名和修改目标即可，例如：

```text
把 首页仪表盘 的左侧菜单改成深色，并把顶部标题改成“运营总览”
```

或：

```text
在 商户列表 页面增加一个“状态”筛选下拉框，只做静态交互展示
```
