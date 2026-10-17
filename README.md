# RN 115 內外科護理學測驗

115 年第一次護理師國考內外科護理學測驗，每次 10 題，限時 12 分鐘，交卷後顯示成績與錯題回顧。

## 本機執行

需要 Node.js >= 22.13.0。

```bash
npm install
npm run dev
npm run build
```

## 程式內容

- `app/page.tsx`：測驗及成績畫面。
- `app/questions.ts`：題庫與答案。
- `app/globals.css`：樣式。

使用 React、Vinext 與 Cloudflare Workers。目前為 GitHub 原始碼版本，尚未部署成 GitHub Pages；GitHub Pages 僅支援靜態內容，需要先調整建置方式。
