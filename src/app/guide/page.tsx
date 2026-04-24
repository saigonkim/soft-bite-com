export default function GuidePage() {
  const guideContent = [
    {
      id: 1,
      title: "단백질 공급원 (회복 필수 영양소)",
      description: "질긴 고기 대신 입에서 쉽게 으깨지는 재료를 추천합니다. 연두부, 순두부, 우유를 섞어 아주 부드럽게 만든 스크램블 에그나 계란찜, 으깨기 쉬운 흰살생선(대구, 가자미 등), 미세하게 다진 고기 등이 좋습니다.",
      image: "https://images.unsplash.com/photo-1548943487-a2e4e43b4859?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      title: "채소 및 과일 (비타민/식이섬유)",
      description: "조리 시 조직이 흐물흐물해지는 호박, 무, 감자, 고구마를 푹 익혀 으깬 형태가 좋습니다. 과일은 강판에 간 사과나 배, 으깬 바나나, 망고, 그리고 자체로 부드러운 아보카도를 추천합니다.",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "탄수화물 (주식)",
      description: "일반 밥보다는 수분 함량이 높은 진밥, 푹 끓인 죽, 푹 익힌 오트밀, 혹은 작고 부드럽게 푹 삶은 파스타(푸실리, 마카로니)가 적합합니다.",
      image: "https://images.unsplash.com/photo-1582281223945-8178f244439c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      title: "미각 회복 및 식욕 촉진 식재료",
      description: "항암 치료로 입맛이 쓴 환자를 위해 자연스러운 단맛을 내는 바나나, 고구마, 꿀, 올리고당을 활용하거나, 미각 세포를 자극할 수 있는 레몬, 식초(신맛) 및 감칠맛을 내는 토마토, 다시마, 표고버섯 등을 소개합니다.",
      image: "https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=800&q=80",
    }
  ];

  return (
    <div>
      <h1 style={{ marginBottom: "var(--spacing-2)" }}>추천 식재료 가이드</h1>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--spacing-8)", fontSize: "var(--font-size-lg)" }}>
        씹고 삼키는 것이 불편하신 분들도 안전하게 영양을 섭취할 수 있는, 부드럽고 든든한 추천 식재료들을 소개합니다.
      </p>

      <div className="grid-3-col">
        {guideContent.map(guide => (
          <div key={guide.id} style={{ 
            display: "flex", 
            flexDirection: "column",
            border: "1px solid var(--color-border)", 
            borderRadius: "var(--radius-lg)", 
            overflow: "hidden",
            boxShadow: "var(--shadow-sm)",
            backgroundColor: "var(--color-surface)"
          }}>
            <img src={guide.image} alt={guide.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
            <div style={{ padding: "var(--spacing-4)" }}>
              <h2 style={{ margin: "0 0 var(--spacing-3) 0", fontSize: "var(--font-size-lg)", color: "var(--color-primary)" }}>{guide.title}</h2>
              <p style={{ margin: 0, fontSize: "var(--font-size-base)", lineHeight: 1.6, color: "var(--color-text-primary)" }}>{guide.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
