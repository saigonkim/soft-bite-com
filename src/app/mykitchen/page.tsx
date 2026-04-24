export default function MyKitchenPage() {
  const savedRecipes = [
    {
      id: 1,
      title: "부드러운 단호박 수프",
      level: "IDDSI 3단계 (액상화)",
      image: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "입에서 녹는 두부 계란찜",
      level: "IDDSI 4단계 (퓨레)",
      image: "https://images.unsplash.com/photo-1588165171080-c89acfa5ee83?auto=format&fit=crop&w=800&q=80",
    }
  ];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-4)", marginBottom: "var(--spacing-8)" }}>
        <div style={{ 
          width: "80px", 
          height: "80px", 
          borderRadius: "50%", 
          backgroundColor: "var(--color-primary-light)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "var(--font-size-2xl)"
        }}>
          👨‍🍳
        </div>
        <div>
          <h1 style={{ margin: 0 }}>김환우 님의 키친</h1>
          <p style={{ color: "var(--color-text-muted)", margin: "var(--spacing-1) 0 0 0" }}>현재 설정 단계: <strong>IDDSI 4단계 (퓨레)</strong></p>
        </div>
      </div>

      <h2 style={{ fontSize: "var(--font-size-xl)", marginBottom: "var(--spacing-4)" }}>스크랩한 레시피</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "var(--spacing-6)" }}>
        {savedRecipes.map(recipe => (
          <div key={recipe.id} style={{ 
            border: "1px solid var(--color-border)", 
            borderRadius: "var(--radius-lg)", 
            overflow: "hidden",
            boxShadow: "var(--shadow-sm)",
            position: "relative"
          }}>
            <button style={{
              position: "absolute",
              top: "var(--spacing-2)",
              right: "var(--spacing-2)",
              backgroundColor: "white",
              border: "none",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              boxShadow: "var(--shadow-md)"
            }}>
              ❤️
            </button>
            <img src={recipe.image} alt={recipe.title} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
            <div style={{ padding: "var(--spacing-3)" }}>
              <h3 style={{ margin: "0 0 var(--spacing-1) 0", fontSize: "var(--font-size-lg)" }}>{recipe.title}</h3>
              <p style={{ color: "var(--color-text-muted)", margin: 0, fontSize: "var(--font-size-sm)" }}>{recipe.level}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
