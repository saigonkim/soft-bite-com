import Link from "next/link";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-10)" }}>
      {/* Hero Section */}
      <section style={{
        padding: "var(--spacing-4) var(--spacing-6) var(--spacing-8)", /* Reduced top padding from spacing-8 to spacing-4 */
        background: "linear-gradient(135deg, var(--color-surface) 0%, var(--color-background) 100%)",
        borderRadius: "var(--radius-lg)",
        textAlign: "center" as const,
        border: "1px solid var(--color-border)",
        boxShadow: "var(--shadow-lg)"
      }}>
        <h1 className="keep-all" style={{ 
          fontSize: "var(--font-size-3xl)", 
          marginBottom: "var(--spacing-4)",
          background: "linear-gradient(90deg, var(--color-primary) 0%, #60A5FA 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontWeight: "800",
          lineHeight: "1.3"
        }}>
          다시 찾는 식사의 즐거움,<br />든든한 한입
        </h1>
        <p className="keep-all" style={{ 
          fontSize: "var(--font-size-xl)", 
          color: "var(--color-text-secondary)", 
          maxWidth: "600px", 
          margin: "0 auto",
          lineHeight: "1.6"
        }}>
          구강암 환우분들이 씹고 삼키는 걱정 없이,<br /> 
          영양 가득한 식사를 맛있게 즐기실 수 있도록<br />
          <strong>IDDSI 단계별 맞춤 솔루션</strong>을 제공합니다.
        </p>
      </section>

      <div>
        <h2 style={{ fontSize: "var(--font-size-2xl)", marginBottom: "var(--spacing-4)" }}>오늘의 부드러운 추천식</h2>
        <p style={{ fontSize: "var(--font-size-lg)", color: "var(--color-text-secondary)", marginBottom: "var(--spacing-6)" }}>
          씹고 삼키기 편안한 맞춤형 식사를 제안합니다.
        </p>
      </div>
      
      <div style={{
        backgroundColor: "var(--color-surface)",
        color: "var(--color-text-primary)",
        padding: "var(--spacing-6)",
        borderRadius: "var(--radius-lg)",
        marginBottom: "var(--spacing-8)",
        border: "1px solid var(--color-border)"
      }}>
        <h2 style={{ color: "var(--color-primary)" }}>내게 맞는 식사 단계 찾기</h2>
        <p style={{ color: "var(--color-text-secondary)" }}>현재 삼킴 상태에 맞는 IDDSI 단계를 확인해보세요.</p>
        <Link href="/diagnosis" style={{
          display: "inline-block",
          backgroundColor: "var(--color-primary)",
          color: "white",
          padding: "var(--spacing-3) var(--spacing-6)",
          fontSize: "var(--font-size-lg)",
          fontWeight: "bold",
          border: "none",
          borderRadius: "var(--radius-md)",
          cursor: "pointer",
          marginTop: "var(--spacing-2)",
          textDecoration: "none"
        }}>
          자가 진단 시작하기
        </Link>
      </div>
    </div>
  );
}
