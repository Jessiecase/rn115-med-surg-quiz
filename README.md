# RN 115 內外科護理學測驗

115 年第一次護理師國考內外科護理學，每次 10 題、12 分鐘、即時評分及錯題回顧。

## GitHub Pages

靜態網站已建置於 `docs/`。到 Settings → Pages，Source 選 Deploy from a branch，Branch 選 main，資料夾選 /docs，再按 Save。

預期網址：https://Jessiecase.github.io/rn115-med-surg-quiz/

私人儲存庫需支援私人儲存庫 Pages 的 GitHub 方案。若使用 GitHub Free，需由擁有者決定是否將儲存庫改為 Public。

## 重建靜態網站

Node.js >= 22.13.0。

```bash
npm install
npx vite build --config pages/vite.config.ts
```

將重建後的 docs 一併提交即可更新網站。
