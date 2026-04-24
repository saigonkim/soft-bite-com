import CommentsSection from '@/components/CommentsSection';
import ScrapButton from '@/components/ScrapButton';
import { recipes } from '@/data/recipes';
import { notFound } from 'next/navigation';

export default async function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const recipeId = resolvedParams.id === 'demo' ? '4c7e6c40-3b48-4228-b072-a0eb8a379a01' : resolvedParams.id;
  const recipe = recipes.find(r => r.id === resolvedParams.id) || recipes[0]; // fallback for demo

  if (!recipe && resolvedParams.id !== 'demo') {
    notFound();
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", paddingBottom: "var(--spacing-10)" }}>
      {/* 1. 히어로 섹션 */}
      <div style={{ position: "relative", marginBottom: "var(--spacing-8)", borderRadius: "var(--radius-xl)", overflow: "hidden", boxShadow: "var(--shadow-md)" }}>
        <img src={recipe.image} alt={recipe.title} style={{ width: "100%", height: "400px", objectFit: "cover", display: "block" }} />
        <div style={{ 
          position: "absolute", 
          bottom: 0, 
          left: 0, 
          right: 0, 
          background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)", 
          padding: "var(--spacing-8)",
          color: "white"
        }}>
          <span style={{ display: "inline-block", backgroundColor: "var(--color-primary)", color: "white", padding: "4px 12px", borderRadius: "var(--radius-full)", fontSize: "var(--font-size-sm)", fontWeight: "bold", marginBottom: "var(--spacing-3)" }}>
            {recipe.level}
          </span>
          <h1 style={{ margin: "0 0 var(--spacing-2) 0", fontSize: "var(--font-size-3xl)", color: "white" }}>
            {recipe.title}
          </h1>
          <div style={{ display: "flex", gap: "var(--spacing-4)", fontSize: "var(--font-size-sm)", opacity: 0.9 }}>
            <span>{recipe.author}</span>
            <span>|</span>
            <span>{recipe.date}</span>
          </div>
        </div>
      </div>

      {/* 프롤로그 */}
      <div style={{ padding: "0 var(--spacing-4)", marginBottom: "var(--spacing-10)" }}>
        <p style={{ fontSize: "var(--font-size-lg)", lineHeight: "1.8", color: "var(--color-text-primary)", fontStyle: "italic", borderLeft: "4px solid var(--color-primary)", paddingLeft: "var(--spacing-4)" }}>
          "{recipe.prologue}"
        </p>
      </div>

      {/* 2. 요약 및 요리 정보 */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-around", 
        backgroundColor: "var(--color-surface)", 
        padding: "var(--spacing-6)", 
        borderRadius: "var(--radius-lg)", 
        marginBottom: "var(--spacing-10)",
        border: "1px solid var(--color-border)"
      }}>
        <div style={{ textAlign: "center" as const }}>
          <div style={{ fontSize: "var(--font-size-2xl)", marginBottom: "var(--spacing-1)" }}>⏱️</div>
          <div style={{ fontWeight: "bold", color: "var(--color-text-primary)" }}>{recipe.time}</div>
          <div style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)" }}>소요 시간</div>
        </div>
        <div style={{ textAlign: "center" as const }}>
          <div style={{ fontSize: "var(--font-size-2xl)", marginBottom: "var(--spacing-1)" }}>🔥</div>
          <div style={{ fontWeight: "bold", color: "var(--color-text-primary)" }}>{recipe.difficulty}</div>
          <div style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)" }}>난이도</div>
        </div>
        <div style={{ textAlign: "center" as const }}>
          <div style={{ fontSize: "var(--font-size-2xl)", marginBottom: "var(--spacing-1)" }}>🍽️</div>
          <div style={{ fontWeight: "bold", color: "var(--color-text-primary)" }}>{recipe.servings}</div>
          <div style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)" }}>분량</div>
        </div>
      </div>

      {/* 3. 재료 준비 */}
      <div style={{ marginBottom: "var(--spacing-10)" }}>
        <h2 style={{ fontSize: "var(--font-size-2xl)", color: "var(--color-primary)", marginBottom: "var(--spacing-4)" }}>재료 준비</h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "var(--spacing-6)", marginBottom: "var(--spacing-6)" }}>
          <div style={{ backgroundColor: "var(--color-surface)", padding: "var(--spacing-6)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)" }}>
            <h3 style={{ marginTop: 0, marginBottom: "var(--spacing-4)", color: "var(--color-text-primary)", borderBottom: "1px solid var(--color-border)", paddingBottom: "var(--spacing-2)" }}>주재료</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--color-text-primary)" }}>
              {recipe.mainIngredients.map((ing, idx) => (
                <li key={idx} style={{ marginBottom: "var(--spacing-2)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "var(--color-primary)" }}>☑</span> {ing}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ backgroundColor: "var(--color-surface)", padding: "var(--spacing-6)", borderRadius: "var(--radius-lg)", border: "1px solid var(--color-border)" }}>
            <h3 style={{ marginTop: 0, marginBottom: "var(--spacing-4)", color: "var(--color-text-primary)", borderBottom: "1px solid var(--color-border)", paddingBottom: "var(--spacing-2)" }}>부재료 / 양념</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, color: "var(--color-text-primary)" }}>
              {recipe.subIngredients.map((ing, idx) => (
                <li key={idx} style={{ marginBottom: "var(--spacing-2)", display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "var(--color-primary)" }}>☑</span> {ing}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ backgroundColor: "var(--color-primary-light)", padding: "var(--spacing-4)", borderRadius: "var(--radius-md)", color: "var(--color-text-primary)" }}>
          💡 <strong>대체 식재료 팁:</strong> {recipe.substituteTip}
        </div>
      </div>

      {/* 4. 단계별 조리 과정 */}
      <div style={{ marginBottom: "var(--spacing-10)" }}>
        <h2 style={{ fontSize: "var(--font-size-2xl)", color: "var(--color-primary)", marginBottom: "var(--spacing-6)" }}>만드는 법</h2>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-8)" }}>
          {recipe.steps.map((step, idx) => (
            <div key={idx} style={{ display: "flex", gap: "var(--spacing-4)" }}>
              <div style={{ flexShrink: 0 }}>
                <span style={{ 
                  display: "flex", 
                  justifyContent: "center", 
                  alignItems: "center", 
                  width: "36px", 
                  height: "36px", 
                  backgroundColor: "var(--color-primary)", 
                  color: "white", 
                  borderRadius: "50%", 
                  fontWeight: "bold",
                  fontSize: "var(--font-size-lg)"
                }}>
                  {idx + 1}
                </span>
              </div>
              <div style={{ flex: 1, paddingTop: "4px" }}>
                <p style={{ fontSize: "var(--font-size-lg)", lineHeight: "1.6", margin: "0 0 var(--spacing-3) 0", color: "var(--color-text-primary)" }}>
                  {step.text}
                </p>
                {step.tip && (
                  <div style={{ backgroundColor: "var(--color-surface-hover)", padding: "var(--spacing-3)", borderRadius: "var(--radius-md)", fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)", borderLeft: "3px solid var(--color-primary)" }}>
                    <strong>Tip!</strong> {step.tip}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. 영양 정보 및 마무리 */}
      <div style={{ marginBottom: "var(--spacing-10)" }}>
        <h2 style={{ fontSize: "var(--font-size-xl)", color: "var(--color-primary)", marginBottom: "var(--spacing-4)" }}>영양 정보 (1인분 기준)</h2>
        <div style={{ display: "flex", gap: "var(--spacing-4)", marginBottom: "var(--spacing-8)" }}>
          <div style={{ flex: 1, backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "var(--spacing-4)", borderRadius: "var(--radius-lg)", textAlign: "center" as const }}>
            <div style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)", marginBottom: "var(--spacing-1)" }}>열량</div>
            <div style={{ fontSize: "var(--font-size-xl)", fontWeight: "bold", color: "var(--color-text-primary)" }}>{recipe.nutrition.calories}</div>
          </div>
          <div style={{ flex: 1, backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "var(--spacing-4)", borderRadius: "var(--radius-lg)", textAlign: "center" as const }}>
            <div style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)", marginBottom: "var(--spacing-1)" }}>단백질</div>
            <div style={{ fontSize: "var(--font-size-xl)", fontWeight: "bold", color: "var(--color-text-primary)" }}>{recipe.nutrition.protein}</div>
          </div>
          <div style={{ flex: 1, backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", padding: "var(--spacing-4)", borderRadius: "var(--radius-lg)", textAlign: "center" as const }}>
            <div style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)", marginBottom: "var(--spacing-1)" }}>탄수화물</div>
            <div style={{ fontSize: "var(--font-size-xl)", fontWeight: "bold", color: "var(--color-text-primary)" }}>{recipe.nutrition.carbs}</div>
          </div>
        </div>

        <div style={{ textAlign: "center" as const, padding: "var(--spacing-8)", backgroundColor: "var(--color-surface)", borderRadius: "var(--radius-lg)" }}>
          <p style={{ fontSize: "var(--font-size-lg)", color: "var(--color-text-primary)", marginBottom: "var(--spacing-6)" }}>
            {recipe.epilogue}
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "var(--spacing-4)", flexWrap: "wrap" }}>
            <ScrapButton recipe={recipe} />
            <button style={{ padding: "10px 20px", backgroundColor: "#FEE500", color: "#371D1E", border: "none", borderRadius: "var(--radius-full)", cursor: "pointer", fontWeight: "bold" }}>
              💬 카카오톡 공유
            </button>
            <button style={{ padding: "10px 20px", backgroundColor: "var(--color-surface-hover)", color: "var(--color-text-primary)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-full)", cursor: "pointer", fontWeight: "bold" }}>
              🖨️ 인쇄하기
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "var(--spacing-10)", paddingTop: "var(--spacing-8)", borderTop: "1px solid var(--color-border)" }}>
        <h2 style={{ fontSize: "var(--font-size-xl)", color: "var(--color-primary)", marginBottom: "var(--spacing-6)" }}>응원의 한마디 남기기</h2>
        <CommentsSection recipeId={recipeId} />
      </div>
    </div>
  );
}
