import Link from 'next/link';

import { recipes as dummyRecipes } from '@/data/recipes';

export default function RecipesPage() {
  return (
    <div>
      <h1 style={{ marginBottom: "var(--spacing-2)" }}>메뉴 및 레시피 분류 체계</h1>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--spacing-6)", fontSize: "var(--font-size-lg)" }}>
        안전하고 편안한 식사를 위해, 음식의 점도와 질감에 따라 나누어진 국제 표준(IDDSI) 단계를 확인해 보세요.
      </p>

      <div className="grid-3-col" style={{ marginBottom: "var(--spacing-10)" }}>
        <div style={{ backgroundColor: "var(--color-surface)", padding: "var(--spacing-6)", borderRadius: "var(--radius-lg)", display: "flex", flexDirection: "column" }}>
          <h3 style={{ color: "var(--color-primary)", marginTop: 0 }}>레벨 1~2 (액상/퓨레 상태)</h3>
          <p style={{ color: "var(--color-text-primary)", flex: 1 }}>물보다 천천히 떨어지거나 숟가락에서 흘러내리는 정도.</p>
          <span style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)", marginTop: "var(--spacing-4)" }}>예: 맑은 미음, 망고라시, 아보카도 우유, 스무디</span>
        </div>
        
        <div style={{ backgroundColor: "var(--color-surface)", padding: "var(--spacing-6)", borderRadius: "var(--radius-lg)", display: "flex", flexDirection: "column" }}>
          <h3 style={{ color: "var(--color-primary)", marginTop: 0 }}>레벨 3 (중간 걸쭉한 상태)</h3>
          <p style={{ color: "var(--color-text-primary)", flex: 1 }}>컵으로 마실 수 있고 혀로 큰 노력 없이 삼킬 수 있는 정도.</p>
          <span style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)", marginTop: "var(--spacing-4)" }}>예: 진한 소스를 곁들인 으깬 음식, 된미음, 연어청경채죽, 단호박수프</span>
        </div>
        
        <div style={{ backgroundColor: "var(--color-surface)", padding: "var(--spacing-6)", borderRadius: "var(--radius-lg)", display: "flex", flexDirection: "column" }}>
          <h3 style={{ color: "var(--color-primary)", marginTop: 0 }}>레벨 4 이상 (다지거나 부드러운 고형식)</h3>
          <p style={{ color: "var(--color-text-primary)", flex: 1 }}>숟가락으로 뜰 수 있고 혀나 잇몸으로 으깨어 먹을 수 있는 정도.</p>
          <span style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)", marginTop: "var(--spacing-4)" }}>예: 푹 익힌 생선찜, 두부, 다진 고기 미트볼</span>
        </div>
      </div>

      <h2 style={{ marginBottom: "var(--spacing-4)", fontSize: "var(--font-size-2xl)" }}>간단 레시피 소개</h2>

      <div className="grid-3-col">
        {dummyRecipes.map(recipe => (
          <Link href={`/recipes/${recipe.id}`} key={recipe.id} style={{ 
            border: "1px solid var(--color-border)", 
            borderRadius: "var(--radius-lg)", 
            overflow: "hidden",
            backgroundColor: "var(--color-surface)",
            boxShadow: "var(--shadow-sm)",
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            flexDirection: "column"
          }}>
            <img src={recipe.image} alt={recipe.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
            <div style={{ padding: "var(--spacing-4)", flex: 1, display: "flex", flexDirection: "column" }}>
              <span style={{ 
                display: "inline-block", 
                backgroundColor: "var(--color-primary)", 
                color: "var(--color-surface)", 
                padding: "4px 10px", 
                borderRadius: "var(--radius-full)", 
                fontSize: "var(--font-size-sm)",
                marginBottom: "var(--spacing-3)",
                alignSelf: "flex-start",
                fontWeight: "bold"
              }}>
                {recipe.level}
              </span>
              <h3 style={{ margin: "0 0 var(--spacing-2) 0", fontSize: "var(--font-size-lg)", color: "var(--color-text-primary)" }}>{recipe.title}</h3>
              <p style={{ color: "var(--color-text-secondary)", margin: 0, fontSize: "var(--font-size-base)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {recipe.instruction}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
