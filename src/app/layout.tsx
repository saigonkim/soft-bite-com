import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "든든한 한입 (Soft-Bite) | 구강암 환우를 위한 맞춤형 식사 솔루션",
  description: "구강암 환우를 위한 IDDSI 단계별 맞춤 레시피와 식재료 가이드를 제공합니다. 삼키기 편한 건강한 한 끼, 든든한 한입이 함께합니다.",
  keywords: ["구강암 식단", "IDDSI", "환자식", "부드러운 음식", "삼킴 장애", "연하 곤란", "건강 식단", "든든한 한입", "Soft-Bite"],
  authors: [{ name: "Soft-Bite Team" }],
  openGraph: {
    title: "든든한 한입 (Soft-Bite) | 구강암 환우를 위한 맞춤형 식사 솔루션",
    description: "삼키기 편한 건강한 한 끼를 위한 맞춤형 식단 가이드. 구강암 환우분들의 든든한 일상을 응원합니다.",
    url: "https://soft-bite-com.vercel.app",
    siteName: "든든한 한입 (Soft-Bite)",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "든든한 한입 서비스 대표 이미지",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "든든한 한입 (Soft-Bite)",
    description: "구강암 환우를 위한 맞춤형 식사 솔루션",
    images: ["/og-image.png"],
  },
};

import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <Header />
        <main className="container mainContent">
          {children}
        </main>
        <footer style={footerStyle}>
          <div className="container">
            <p>© 2026 든든한 한입 (Soft-Bite). 구강암 환우를 위한 맞춤형 식사 솔루션.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}

const footerStyle = {
  backgroundColor: "var(--color-surface)",
  padding: "var(--spacing-2) 0",
  textAlign: "center" as const,
  borderTop: "1px solid var(--color-border)",
  color: "var(--color-text-muted)",
};
