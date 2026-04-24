import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "든든한 한입 (Soft-Bite)",
  description: "구강암 환우를 위한 맞춤형 식사 솔루션",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <header className="header">
          <div className="container headerContainer">
            <Link href="/" className="logo">
              든든한 한입
            </Link>
            <nav className="nav">
              <Link href="/recipes" className="navLink">단계별 레시피</Link>
              <Link href="/guide" className="navLink">식재료 가이드</Link>
              <Link href="/community" className="navLink">환우 커뮤니티</Link>
              <Link href="/mykitchen" className="navLink">마이 키친</Link>
            </nav>
          </div>
        </header>
        <main className="container" style={{ padding: "var(--spacing-8) var(--spacing-4)", minHeight: "80vh" }}>
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
  padding: "var(--spacing-8) 0",
  textAlign: "center" as const,
  borderTop: "1px solid var(--color-border)",
  color: "var(--color-text-muted)",
};
