import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>오늘의 부드러운 추천식</h1>
      <p style={{ fontSize: "var(--font-size-xl)", marginBottom: "var(--spacing-6)" }}>
        씹고 삼키기 편안한 맞춤형 식사를 제안합니다.
      </p>
      
      <div style={{
        backgroundColor: "var(--color-primary-light)",
        color: "#111827", /* 강제로 어두운 색상 지정 */
        padding: "var(--spacing-6)",
        borderRadius: "var(--radius-lg)",
        marginBottom: "var(--spacing-8)",
        border: "2px solid var(--color-primary)"
      }}>
        <h2 style={{ color: "#111827" }}>내게 맞는 식사 단계 찾기</h2>
        <p style={{ color: "#374151" }}>현재 삼킴 상태에 맞는 IDDSI 단계를 확인해보세요.</p>
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
