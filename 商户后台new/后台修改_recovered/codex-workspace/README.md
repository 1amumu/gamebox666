# Codex 工作台

这个目录是从 Axure 导出的静态页面旁边新增的维护工作层。原始 HTML、`files`、`images`、`resources` 等目录不移动、不删除，保证现有页面还能直接打开。

## 入口

- `index.html`：统一页面导航和预览入口。
- `data/pages.json`：由 `tools/build-codex-workspace.ps1` 扫描根目录 HTML 生成的页面清单。
- `assets/workbench.css`、`assets/workbench.js`：工作台自身样式和交互。

## 后续修改方式

1. 公共样式或公共行为优先放在根目录的 `data/styles.css`、`data/document.js`，这样所有 Axure 页面都会加载。
2. 具体页面的大改动逐步迁移到更清晰的源码文件，不再直接维护 Axure 的 `u1234` 自动 ID。
3. 每次新增、删除或重命名根目录 HTML 后，运行：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File tools/build-codex-workspace.ps1
```

然后刷新 `http://localhost:8000/codex-workspace/index.html`。
