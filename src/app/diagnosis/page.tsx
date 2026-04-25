"use client";

import { useState } from "react";
import Link from "next/link";

const questions = [
  {
    id: 1,
    title: "Q1. 평소에 물이나 국물을 마실 때 사레가 자주 들리시나요?",
    description: "가장 묽은 형태의 액체를 삼키는 능력을 확인합니다.",
    options: [
      { label: "거의 없다", score: 3 },
      { label: "가끔 있다 (주 1~2회)", score: 2 },
      { label: "자주 있다 (매일)", score: 1 },
    ]
  },
  {
    id: 2,
    title: "Q2. 밥이나 고기를 씹을 때 턱이나 혀에 힘이 많이 드나요?",
    description: "음식을 으깨고 씹는 저작 능력을 확인합니다.",
    options: [
      { label: "거의 없다", score: 3 },
      { label: "가끔 그렇다", score: 2 },
      { label: "항상 힘들다", score: 1 },
    ]
  },
  {
    id: 3,
    title: "Q3. 식사 후 입안이나 목구멍에 음식물이 남아있는 느낌이 드나요?",
    description: "음식물을 온전히 식도로 넘기는 삼킴 능력을 확인합니다.",
    options: [
      { label: "거의 없다", score: 3 },
      { label: "가끔 그렇다", score: 2 },
      { label: "항상 그렇다", score: 1 },
    ]
  },
  {
    id: 4,
    title: "Q4. 알약이나 약간 단단한 채소(깍두기 등)를 삼키기 어려우신가요?",
    description: "단단한 고형물을 삼키는 능력을 확인합니다.",
    options: [
      { label: "어렵지 않다", score: 3 },
      { label: "약간 어렵다", score: 2 },
      { label: "매우 어렵다", score: 1 },
    ]
  }
];

export default function DiagnosisPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<number[]>(Array(questions.length).fill(0));
  const [isFinished, setIsFinished] = useState(false);

  const handleOptionSelect = (score: number) => {
    const newScores = [...scores];
    newScores[currentStep] = score;
    setScores(newScores);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsFinished(true);
      // Immediately calculate and save to localStorage
      const newScores = [...scores];
      newScores[currentStep] = score; // Ensure the last score is included
      const totalScore = newScores.reduce((a, b) => a + b, 0);
      let level = "레벨 4 이상";
      if (totalScore < 6) level = "레벨 1~2";
      else if (totalScore < 10) level = "레벨 3";
      localStorage.setItem('iddsi_level', level);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateResult = () => {
    const totalScore = scores.reduce((a, b) => a + b, 0);
    if (totalScore < 6) return { level: "레벨 1~2", description: "물보다 천천히 떨어지거나 숟가락에서 흘러내리는 액상/퓨레 형태의 식사가 적합합니다.", detail: "사레들림 위험이 높으므로 모든 음식은 믹서에 곱게 갈고, 물을 마실 때에도 점도증진제를 사용하여 걸쭉하게 만드는 것이 좋습니다." };
    if (totalScore < 10) return { level: "레벨 3", description: "컵으로 마실 수 있고 혀로 큰 노력 없이 삼킬 수 있는 중간 걸쭉한 형태가 적합합니다.", detail: "건조한 음식은 삼키기 힘드므로 진한 소스를 곁들인 으깬 음식이나 된미음 형태를 추천합니다." };
    return { level: "레벨 4 이상", description: "숟가락으로 뜰 수 있고 혀나 잇몸으로 으깨어 먹을 수 있는 부드러운 고형식이 적합합니다.", detail: "푹 익힌 생선찜이나 두부, 다진 고기 미트볼 등 씹기 편안한 식재료를 중심으로 식사하세요." };
  };

  if (isFinished) {
    const result = calculateResult();
    return (
      <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" as const }}>
        <h1 style={{ marginBottom: "var(--spacing-4)" }}>진단 결과</h1>
        <div style={{ 
          backgroundColor: "var(--color-surface)", 
          padding: "var(--spacing-8)", 
          borderRadius: "var(--radius-lg)",
          border: "2px solid var(--color-primary)",
          marginBottom: "var(--spacing-8)"
        }}>
          <h2 style={{ fontSize: "var(--font-size-2xl)", color: "var(--color-primary)", marginBottom: "var(--spacing-2)" }}>추천 단계: {result.level}</h2>
          <p style={{ fontSize: "var(--font-size-lg)", color: "var(--color-text-primary)", fontWeight: "bold", marginBottom: "var(--spacing-4)" }}>
            {result.description}
          </p>
          <div style={{ backgroundColor: "var(--color-surface-hover)", color: "var(--color-text-primary)", padding: "var(--spacing-4)", borderRadius: "var(--radius-md)", textAlign: "left" as const, border: "1px solid var(--color-border)" }}>
            💡 <strong>관리 팁:</strong> {result.detail}
          </div>
        </div>
        
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-4)", justifyContent: "center" }}>
          <button 
            onClick={() => { setCurrentStep(0); setScores(Array(questions.length).fill(0)); setIsFinished(false); }}
            style={{ 
              padding: "var(--spacing-3) var(--spacing-6)", 
              backgroundColor: "transparent", 
              color: "var(--color-text-primary)", 
              border: "1px solid var(--color-border)", 
              borderRadius: "var(--radius-md)",
              cursor: "pointer",
              fontWeight: "bold",
              flex: "1 1 140px",
              width: "100%"
            }}
          >
            다시 하기
          </button>
          <Link href="/recipes" style={{ 
            padding: "var(--spacing-3) var(--spacing-6)", 
            backgroundColor: "var(--color-primary)", 
            color: "white", 
            border: "none", 
            borderRadius: "var(--radius-md)",
            textDecoration: "none",
            fontWeight: "bold",
            display: "inline-block",
            flex: "1 1 140px",
            width: "100%",
            textAlign: "center"
          }}>
            추천 레시피 보기
          </Link>
        </div>
      </div>
    );
  }

  const question = questions[currentStep];

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" as const }}>
      <h1 style={{ marginBottom: "var(--spacing-4)" }}>IDDSI 자가 진단</h1>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "var(--spacing-8)" }}>
        간단한 설문을 통해 현재 삼킴 상태에 맞는 적절한 식사 단계를 확인해보세요.
      </p>

      <div style={{ 
        backgroundColor: "var(--color-surface)", 
        padding: "var(--spacing-8)", 
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--color-border)"
      }}>
        <div style={{ marginBottom: "var(--spacing-6)" }}>
          <span style={{ display: "inline-block", backgroundColor: "var(--color-primary)", color: "white", padding: "4px 12px", borderRadius: "var(--radius-full)", fontWeight: "bold", marginBottom: "var(--spacing-4)", fontSize: "var(--font-size-sm)" }}>
            질문 {currentStep + 1} / {questions.length}
          </span>
          <h2 style={{ fontSize: "var(--font-size-xl)", marginBottom: "var(--spacing-2)", color: "var(--color-text-primary)" }}>{question.title}</h2>
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-sm)", margin: 0 }}>{question.description}</p>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)" }}>
          {question.options.map((option, idx) => (
            <button 
              key={idx}
              className="diagnosis-option"
              onClick={() => handleOptionSelect(option.score)}
            >
              {option.label}
            </button>
          ))}
        </div>
        
        <div style={{ marginTop: "var(--spacing-8)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button 
            onClick={handlePrevious}
            disabled={currentStep === 0}
            style={{ 
              padding: "var(--spacing-2) var(--spacing-4)", 
              backgroundColor: "var(--color-surface-hover)",
              color: "var(--color-text-primary)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              cursor: currentStep === 0 ? "not-allowed" : "pointer",
              fontWeight: "bold",
              opacity: currentStep === 0 ? 0.3 : 1,
              width: "auto",
              flexShrink: 0
            }}
          >
            이전
          </button>
          
          <div style={{ display: "flex", gap: "8px" }}>
            {questions.map((_, idx) => (
              <div key={idx} style={{ 
                width: "8px", 
                height: "8px", 
                borderRadius: "50%", 
                backgroundColor: idx === currentStep ? "var(--color-primary)" : "var(--color-border)" 
              }} />
            ))}
          </div>
          
          <div style={{ width: "60px" }}>{/* 여백용 */}</div>
        </div>
      </div>
    </div>
  );
}
