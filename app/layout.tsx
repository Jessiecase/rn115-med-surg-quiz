import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";
export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") ?? incoming.get("host") ?? "localhost:3000";
  const protocol = incoming.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const image = `${protocol}://${host}/og.png`;
  return {
    title: "RN 115｜內外科護理學測驗",
    description: "115 年第一次護理師國考內外科護理學線上模擬測驗，每次隨機抽選 10 題。",
    openGraph: { title: "RN 115｜內外科護理學測驗", description: "每次從 50 題官方題庫隨機抽選 10 題，即時判分與錯題回顧。", images: [image] },
    twitter: { card: "summary_large_image", title: "RN 115｜內外科護理學測驗", description: "每次隨機 10 題，附更正後答案與錯題回顧。", images: [image] },
  };
}
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="zh-Hant"><body>{children}</body></html>; }
