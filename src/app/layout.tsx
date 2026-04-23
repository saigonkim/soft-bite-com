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
    <html lang="ko">
      <body>
        <header style={headerStyle}>
          <div className="container" style={headerContainerStyle}>
            <Link href="/" style={logoStyle}>
              든든한 한입
            </Link>
            <nav style={navStyle}>
              <Link href="/recipes" style={navLinkStyle}>단계별 레시피</Link>
              <Link href="/guide" style={navLinkStyle}>식재료 가이드</Link>
              <Link href="/community" style={navLinkStyle}>환우 커뮤니티</Link>
              <Link href="/mykitchen" style={navLinkStyle}>마이 키친</Link>
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

const headerStyle = {
  backgroundColor: "var(--color-surface)",
  borderBottom: "1px solid var(--color-border)",
  padding: "var(--spacing-4) 0",
};

const headerContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap" as const,
  gap: "var(--spacing-4)",
};

const logoStyle = {
  fontSize: "var(--font-size-2xl)",
  fontWeight: "bold",
  color: "var(--color-primary)",
};

const navStyle = {
  display: "flex",
  gap: "var(--spacing-6)",
  flexWrap: "wrap" as const,
};

const navLinkStyle = {
  fontSize: "var(--font-size-lg)",
  fontWeight: "bold",
  color: "var(--color-text-primary)",
};

const footerStyle = {
  backgroundColor: "var(--color-surface)",
  padding: "var(--spacing-8) 0",
  textAlign: "center" as const,
  borderTop: "1px solid var(--color-border)",
  color: "var(--color-text-muted)",
};
