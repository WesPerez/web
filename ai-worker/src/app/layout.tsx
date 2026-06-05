import type { Metadata } from "next";
import { Noto_Sans_SC, ZCOOL_XiaoWei, Noto_Sans_Mono } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_SC({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const zcool = ZCOOL_XiaoWei({
  variable: "--font-zcool",
  subsets: ["latin"],
  weight: "400",
});

const notoMono = Noto_Sans_Mono({
  variable: "--font-noto-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "AIWorker - 让 AI 替你打工",
  description: "AI 智能办公助手，报告生成、邮件代写、会议摘要，把重复劳动交给 AI，把时间还给自己。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${notoSans.variable} ${zcool.variable} ${notoMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
