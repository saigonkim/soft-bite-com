import CommentsSection from '@/components/CommentsSection';

// This is a placeholder for the actual recipe data fetching.
// In a real scenario, we'd fetch the recipe by ID from Supabase.
export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  // Hardcoded ID from our seed data for demonstration
  const recipeId = params.id === 'demo' ? '4c7e6c40-3b48-4228-b072-a0eb8a379a01' : params.id;

  return (
    <div>
      <div style={{ marginBottom: 'var(--spacing-8)' }}>
        <h1 style={{ fontSize: 'var(--font-size-3xl)', color: 'var(--color-primary)' }}>부드러운 연두부찜</h1>
        <div style={{ display: 'flex', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-4)' }}>
          <span style={{ backgroundColor: 'var(--color-primary)', color: 'white', padding: 'var(--spacing-1) var(--spacing-3)', borderRadius: 'var(--radius-full)', fontWeight: 'bold' }}>
            IDDSI 4단계
          </span>
          <span style={{ backgroundColor: 'var(--color-surface-hover)', padding: 'var(--spacing-1) var(--spacing-3)', borderRadius: 'var(--radius-full)' }}>
            #감칠맛
          </span>
          <span style={{ backgroundColor: 'var(--color-surface-hover)', padding: 'var(--spacing-1) var(--spacing-3)', borderRadius: 'var(--radius-full)' }}>
            #따뜻하게
          </span>
        </div>
        
        <div style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-6)', borderRadius: 'var(--radius-lg)' }}>
          <h2 style={{ fontSize: 'var(--font-size-xl)' }}>조리 방법</h2>
          <ol style={{ fontSize: 'var(--font-size-lg)', lineHeight: '2' }}>
            <li>연두부를 그릇에 조심스럽게 담습니다.</li>
            <li>가쓰오부시 육수를 2큰술 뿌려줍니다.</li>
            <li>전자레인지에 1분간 따뜻하게 데웁니다.</li>
            <li>참기름을 1방울 떨어뜨려 향을 냅니다.</li>
          </ol>
          <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', padding: 'var(--spacing-4)', borderRadius: 'var(--radius-md)', marginTop: 'var(--spacing-4)' }}>
            <strong style={{ color: 'var(--color-accent)' }}>숟가락 팁:</strong> 숟가락 뒷면으로 눌렀을 때 쉽게 으깨지는 정도인지 확인하세요.
          </div>
        </div>
      </div>

      <CommentsSection recipeId={recipeId} />
    </div>
  );
}
