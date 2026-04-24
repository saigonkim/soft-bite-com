export interface RecipeStep {
  text: string;
  tip?: string;
}

export interface RecipeData {
  id: string;
  title: string;
  level: string;
  levelBadge?: string;
  image: string;
  author: string;
  date: string;
  time: string;
  difficulty: string;
  servings: string;
  tags: string[];
  prologue: string;
  mainIngredients: string[];
  subIngredients: string[];
  substituteTip: string;
  steps: RecipeStep[];
  nutrition: {
    calories: string;
    protein: string;
    carbs: string;
  };
  epilogue: string;
  instruction: string; // for list preview
}

export const recipes: RecipeData[] = [
  {
    id: "avocado-milk",
    title: "[초기/레벨1] 아보카도 우유",
    level: "레벨 1",
    levelBadge: "/images/badge_level1.png",
    image: "/images/avocado_milk.png",
    author: "👨‍🍳 영양사 김환우",
    date: "2026-04-24",
    time: "5분",
    difficulty: "매우 쉬움",
    servings: "1인분",
    tags: ["#부드러운목넘김", "#영양만점", "#에너지충전"],
    prologue: "항암 치료 직후, 입안이 헐거나 삼키는 것이 두려울 때 가장 먼저 추천해 드리는 액상 식사입니다. 아보카도의 풍부한 불포화지방산과 우유의 단백질이 만나 한 컵만으로도 든든한 포만감을 줍니다.",
    mainIngredients: ["냉동 아보카도 60g", "우유 130cc"],
    subIngredients: ["연유 50cc (또는 꿀)"],
    substituteTip: "유당불내증이 있거나 우유가 소화하기 힘들다면, 아몬드 브리즈나 무가당 두유로 대체하셔도 좋습니다.",
    instruction: "블렌더로 곱게 갈아줍니다. 물보다 천천히 떨어지는 농도를 확인하며 우유로 점도를 조절합니다.",
    steps: [
      { text: "아보카도는 씨를 제거하고 부드러운 과육만 준비합니다. (냉동 아보카도를 사용하면 더 편리합니다.)" },
      { text: "블렌더에 아보카도, 우유, 연유를 모두 넣습니다." },
      { text: "덩어리가 전혀 남지 않도록 아주 곱게 갈아줍니다.", tip: "물보다 천천히 떨어지는 '레벨 1' 농도를 확인하세요. 너무 되직하면 우유를 살짝 추가합니다." },
      { text: "컵에 담아 천천히 조금씩 마십니다." }
    ],
    nutrition: {
      calories: "280 kcal",
      protein: "8g",
      carbs: "25g"
    },
    epilogue: "부드럽고 달콤한 아보카도 우유로 오늘 하루도 편안하고 든든하게 시작하시길 바랍니다."
  },
  {
    id: "banana-soup",
    title: "[레벨 2] 바나나 크림스프",
    level: "레벨 2",
    levelBadge: "/images/badge_level2.png",
    image: "/images/banana_cream_soup.png",
    author: "👨‍🍳 영양사 김환우",
    date: "2026-04-24",
    time: "10분",
    difficulty: "쉬움",
    servings: "1~2인분",
    tags: ["#열량보충", "#퓨레식", "#달콤한위로"],
    prologue: "치료 중 체중 감소가 걱정되실 때, 고열량 영양식을 맛있게 드실 수 있는 바나나 크림스프입니다. 숟가락에서 천천히 뚝 떨어지는 퓨레 농도로, 사레들림 위험이 적습니다.",
    mainIngredients: ["바나나 100g", "생크림 50cc"],
    subIngredients: ["크림치즈 20g", "설탕 10g", "레몬즙 약간"],
    substituteTip: "생크림의 지방이 부담스러우시다면 고구마와 우유를 베이스로 변경하여 담백하게 끓여 드셔도 아주 좋습니다.",
    instruction: "모든 재료를 블렌더에 갈아 부드러운 스프로 만듭니다. 열량 보충에 아주 좋습니다.",
    steps: [
      { text: "잘 익은 바나나를 껍질을 벗겨 적당한 크기로 자릅니다.", tip: "껍질에 검은 반점(슈가스팟)이 있는 바나나를 사용하면 자연스러운 단맛이 훨씬 깊어집니다." },
      { text: "블렌더에 바나나, 생크림, 크림치즈, 설탕을 넣고 곱게 갑니다." },
      { text: "갈아낸 혼합물을 냄비에 붓고 약불에서 따뜻해질 정도로만 데워줍니다." },
      { text: "마지막에 레몬즙을 한 방울 섞어 상큼함을 더하고 불을 끕니다." }
    ],
    nutrition: {
      calories: "340 kcal",
      protein: "4g",
      carbs: "35g"
    },
    epilogue: "한 숟가락의 따뜻하고 달콤한 스프가 환우분의 몸과 마음에 작은 위로가 되길 바랍니다."
  },
  {
    id: "tomato-eggplant",
    title: "[레벨 3] 토마토 가지찜",
    level: "레벨 3",
    levelBadge: "/images/badge_level3.png",
    image: "/images/tomato_eggplant.png",
    author: "👨‍🍳 영양사 김환우",
    date: "2026-04-24",
    time: "20분",
    difficulty: "보통",
    servings: "2인분",
    tags: ["#항산화", "#입맛돋움", "#무스식"],
    prologue: "입맛이 쓴 날, 토마토의 상큼함과 가지의 부드러움이 조화를 이루는 요리입니다. 혀로 가볍게 으깨어 삼킬 수 있는 '중간 걸쭉한 형태'로 씹는 힘이 부족해도 편안히 즐기실 수 있습니다.",
    mainIngredients: ["가지 1개", "토마토 1개", "토마토소스 1/2컵"],
    subIngredients: ["다진 양파 1큰술", "다진 마늘 약간", "올리브유"],
    substituteTip: "가지의 식감에 민감하시다면 껍질을 완전히 벗기고 애호박이나 부드러운 감자로 대체하셔도 훌륭합니다.",
    instruction: "데친 가지, 토마토, 볶은 채소를 소스와 함께 곱게 갈아 완성합니다.",
    steps: [
      { text: "가지와 토마토는 껍질을 벗긴 뒤, 부드러워질 때까지 푹 데치거나 찝니다." },
      { text: "팬에 올리브유를 두르고 다진 양파와 마늘을 약불에서 타지 않게 볶습니다." },
      { text: "볶은 채소에 토마토소스를 넣고 데친 토마토를 으깨며 함께 끓여 소스를 만듭니다.", tip: "산미가 강하게 느껴진다면 설탕을 반 스푼 정도 추가해 산미를 중화시켜 주세요." },
      { text: "소스와 데친 가지를 믹서에 넣고 혀로 쉽게 넘길 수 있을 정도로 아주 곱게 갑니다." }
    ],
    nutrition: {
      calories: "150 kcal",
      protein: "3g",
      carbs: "20g"
    },
    epilogue: "지친 미각을 부드럽게 깨워줄 토마토 가지찜으로 식사 시간에 소소한 즐거움을 찾아보세요."
  },
  {
    id: "chicken-potato",
    title: "[레벨 4] 닭고기 감자전",
    level: "레벨 4",
    levelBadge: "/images/badge_level4.png",
    image: "/images/chicken_potato_pancake.png",
    author: "👨‍🍳 영양사 김환우",
    date: "2026-04-24",
    time: "25분",
    difficulty: "보통",
    servings: "2인분",
    tags: ["#고단백", "#부드러운식감", "#아이도좋아해"],
    prologue: "어느 정도 잇몸이나 혀로 으깨어 삼키는 데 익숙해진 단계에 추천하는 메뉴입니다. 뻑뻑할 수 있는 닭가슴살을 감자와 함께 으깨 부드럽게 구워내어 고단백을 편안하게 섭취할 수 있습니다.",
    mainIngredients: ["닭가슴살 100g", "감자 1개"],
    subIngredients: ["다진 양파 1큰술", "다진 당근 1큰술", "소금 약간"],
    substituteTip: "닭고기 특유의 향이 싫으시다면 부드러운 대구살이나 동태살 같은 흰살 생선으로 대체하면 훨씬 더 잘 넘어갑니다.",
    instruction: "삶아 곱게 간 닭가슴살과 으깬 감자를 섞어 동그랗게 빚은 뒤 부드럽게 지져냅니다.",
    steps: [
      { text: "닭가슴살은 완전히 익도록 푹 삶은 뒤, 믹서기나 칼로 아주 곱게 다집니다." },
      { text: "감자는 껍질을 벗겨 푹 삶은 다음 뜨거울 때 포크로 완전히 으깹니다." },
      { text: "다진 닭고기, 으깬 감자, 그리고 매우 잘게 다진 채소들을 소금과 함께 고루 섞어줍니다." },
      { text: "반죽을 한입 크기로 동그랗게 빚은 후, 기름을 살짝 두른 팬에 아주 부드럽게 지져냅니다.", tip: "바삭하게 구우면 씹기 힘들어질 수 있으니, 색만 살짝 나고 속은 촉촉한 상태를 유지해 주세요." }
    ],
    nutrition: {
      calories: "210 kcal",
      protein: "15g",
      carbs: "28g"
    },
    epilogue: "부담스럽지 않은 질감과 담백한 맛의 닭고기 감자전으로 맛과 영양 두 마리 토끼를 잡으세요."
  }
];
