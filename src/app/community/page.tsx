export default function CommunityPage() {
  const dummyPosts = [
    {
      id: 1,
      author: "희망맘",
      title: "오늘 성공한 계란찜 레시피 공유해요~",
      date: "2026. 04. 24",
      likes: 12,
    },
    {
      id: 2,
      author: "이겨내자",
      title: "연하장애가 왔는데 물 마시기 팁 있을까요?",
      date: "2026. 04. 23",
      likes: 8,
    },
    {
      id: 3,
      author: "건강우선",
      title: "단백질 보충용으로 좋은 간식 추천합니다.",
      date: "2026. 04. 22",
      likes: 25,
    }
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--spacing-6)" }}>
        <div>
          <h1 style={{ margin: 0 }}>환우 커뮤니티</h1>
          <p style={{ color: "var(--color-text-muted)", margin: "var(--spacing-2) 0 0 0" }}>
            서로의 경험과 레시피를 나누는 따뜻한 공간입니다.
          </p>
        </div>
        <button style={{
          backgroundColor: "var(--color-primary)",
          color: "white",
          padding: "var(--spacing-2) var(--spacing-4)",
          border: "none",
          borderRadius: "var(--radius-md)",
          fontWeight: "bold",
          cursor: "pointer"
        }}>
          글쓰기
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)" }}>
        {dummyPosts.map(post => (
          <div key={post.id} style={{ 
            padding: "var(--spacing-4)", 
            backgroundColor: "var(--color-surface)", 
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--color-border)"
          }}>
            <h3 style={{ margin: "0 0 var(--spacing-2) 0" }}>{post.title}</h3>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)" }}>
              <span>작성자: {post.author}</span>
              <div style={{ display: "flex", gap: "var(--spacing-4)" }}>
                <span>{post.date}</span>
                <span>❤️ {post.likes}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
