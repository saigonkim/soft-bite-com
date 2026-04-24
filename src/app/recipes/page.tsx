import Link from 'next/link';

import { recipes as dummyRecipes } from '@/data/recipes';

export default function RecipesPage() {
  return (
    <div>
      <h1 style={{ marginBottom: "var(--spacing-2)" }}>메뉴 및 레시피 분류 체계</h1>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--spacing-6)", fontSize: "var(--font-size-lg)" }}>
        안전하고 편안한 식사를 위해, 음식의 점도와 질감에 따라 나누어진 국제 표준(IDDSI) 단계를 확인해 보세요.
      </p>

      <div className="grid-4-col" style={{ marginBottom: "var(--spacing-10)" }}>
        <div style={{ backgroundColor: "var(--color-surface)", padding: "var(--spacing-6)", borderRadius: "var(--radius-lg)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <img src="/images/badge_level1.png" alt="Level 1" style={{ width: "80px", height: "80px", marginBottom: "var(--spacing-3)", borderRadius: "50%", objectFit: "cover" }} />
          <h3 style={{ color: "var(--color-primary)", marginTop: 0 }}>레벨 1 (맑은 액상)</h3>
          <p style={{ color: "var(--color-text-primary)", flex: 1, fontSize: "var(--font-size-sm)" }}>물보다 천천히 떨어지는 극도로 부드러운 유동식.</p>
          <span style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)", marginTop: "var(--spacing-4)" }}>예: 아보카도 우유, 미음</span>
        </div>
        
        <div style={{ backgroundColor: "var(--color-surface)", padding: "var(--spacing-6)", borderRadius: "var(--radius-lg)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <img src="/images/badge_level2.png" alt="Level 2" style={{ width: "80px", height: "80px", marginBottom: "var(--spacing-3)", borderRadius: "50%", objectFit: "cover" }} />
          <h3 style={{ color: "var(--color-primary)", marginTop: 0 }}>레벨 2 (퓨레/크림)</h3>
          <p style={{ color: "var(--color-text-primary)", flex: 1, fontSize: "var(--font-size-sm)" }}>씹지 않아도 되는 부드러운 질감.</p>
          <span style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)", marginTop: "var(--spacing-4)" }}>예: 바나나 크림스프, 망고라시</span>
        </div>

        <div style={{ backgroundColor: "var(--color-surface)", padding: "var(--spacing-6)", borderRadius: "var(--radius-lg)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <img src="/images/badge_level3.png" alt="Level 3" style={{ width: "80px", height: "80px", marginBottom: "var(--spacing-3)", borderRadius: "50%", objectFit: "cover" }} />
          <h3 style={{ color: "var(--color-primary)", marginTop: 0 }}>레벨 3 (다진 음식)</h3>
          <p style={{ color: "var(--color-text-primary)", flex: 1, fontSize: "var(--font-size-sm)" }}>컵으로 마실 수 있고 혀로 으깰 수 있는 정도.</p>
          <span style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)", marginTop: "var(--spacing-4)" }}>예: 토마토 가지찜, 단호박수프</span>
        </div>
        
        <div style={{ backgroundColor: "var(--color-surface)", padding: "var(--spacing-6)", borderRadius: "var(--radius-lg)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <img src="/images/badge_level4.png" alt="Level 4" style={{ width: "80px", height: "80px", marginBottom: "var(--spacing-3)", borderRadius: "50%", objectFit: "cover" }} />
          <h3 style={{ color: "var(--color-primary)", marginTop: 0 }}>레벨 4 이상 (덩어리)</h3>
          <p style={{ color: "var(--color-text-primary)", flex: 1, fontSize: "var(--font-size-sm)" }}>숟가락으로 뜰 수 있고 잇몸으로 으깨어 먹을 수 있는 정도.</p>
          <span style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)", marginTop: "var(--spacing-4)" }}>예: 닭고기 감자전, 푹 익힌 생선찜</span>
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
              <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-2)", marginBottom: "var(--spacing-3)" }}>
                {recipe.levelBadge && <img src={recipe.levelBadge} alt={recipe.level} style={{ width: "30px", height: "30px", borderRadius: "50%", objectFit: "cover", border: "1px solid var(--color-border)" }} />}
                <span style={{ 
                  display: "inline-block", 
                  backgroundColor: "var(--color-primary)", 
                  color: "white", 
                  padding: "4px 10px", 
                  borderRadius: "var(--radius-full)", 
                  fontSize: "var(--font-size-sm)",
                  fontWeight: "bold"
                }}>
                  {recipe.level}
                </span>
              </div>
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
