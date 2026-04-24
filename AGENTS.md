<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:softbite-security-agent-rules -->
# Agent Persona: Deployment & Data Security Checker

모든 AI 에이전트는 '든든한 한입(Soft-Bite)' 프로젝트를 GitHub에 푸시(Push)하거나 배포(Deploy)하는 작업을 수행하기 전, 반드시 아래의 **보안 점검(Security Checklist)**을 수행해야 합니다.

## 1. 목적 (Objective)
* 민감한 환경 변수(API Keys, DB Credentials) 하드코딩 및 GitHub 노출 방지
* Supabase RLS (Row Level Security) 권한 검증
* 환우 데이터(의료/개인정보) 프라이버시 보호

## 2. 보안 점검 체크리스트 (Security Checklist)
1. **환경 변수 노출 점검:**
   - `.env`, `.env.local` 파일이 `.gitignore`에 확실히 포함되어 있는지 검증하라.
   - 소스 코드 내부에 `SUPABASE_KEY` 등 비밀번호나 키가 평문(Hardcoded)으로 삽입되지 않았는지 스캔하라.
   - 클라이언트용 변수는 `NEXT_PUBLIC_` 접두사를 사용하는지 확인하되, `SUPABASE_SERVICE_ROLE_KEY`는 절대 노출되지 않도록 하라.

2. **Supabase RLS 검증:**
   - `supabase/migrations/` 내의 파일들을 검사하여, **모든 테이블에 RLS가 활성화(`ENABLE ROW LEVEL SECURITY`)**되어 있는지 확인하라.
   - Insert/Update/Delete 권한이 `public`에게 열려 있지 않고 `authenticated` 유저에게만 제한되어 있는지 분석하라.

3. **프라이버시 및 로깅 점검:**
   - 배포 전, `console.log` 등에서 민감한 사용자 데이터(IDDSI 단계 등)가 출력되거나 외부로 트래킹되지 않도록 정리하라.

## 3. 에이전트 실행 지침 (Execution Protocol)
* 배포/커밋을 지시받은 에이전트는 본 체크리스트를 자동 실행하고, 모든 검증을 통과했을 때에만 작업을 진행하십시오. 문제가 발견되면 사용자에게 즉시 보고(Artifact 형태 권장)하고 수정을 요청하십시오.
<!-- END:softbite-security-agent-rules -->

<!-- BEGIN:softbite-ui-design-rules -->
# Agent Persona: UI/UX & Contrast Enforcer

모든 AI 에이전트는 UI 컴포넌트를 작성하거나 수정할 때 다음의 **디자인 대비(Contrast) 원칙**을 엄격하게 준수해야 합니다.

## 1. 하드코딩된 색상과 테마 변수의 혼용 금지
- 다크 모드와 라이트 모드를 모두 지원하는 웹 애플리케이션에서는 `white`, `black`, `#FFFFFF`와 같은 절대 색상을 사용할 때 특히 주의해야 합니다.
- **금지 패턴**: 배경색은 하드코딩(`white`)하고, 텍스트 색상은 테마 변수(`var(--color-text-primary)`)를 사용하는 행위. 이 경우 다크 모드에서 텍스트가 흰색으로 변환되어 흰색 배경 위에서 보이지 않게 됩니다.
- **권장 패턴**: 배경과 텍스트를 항상 짝지어 사용하십시오.
  - 배경을 테마 변수(`var(--color-surface)`)로 썼다면, 텍스트도 테마 변수(`var(--color-text-primary)`) 사용.
  - 배경을 강제 색상(`white`)으로 썼다면, 텍스트도 강제 색상(`#111827` 등) 사용.

## 2. 버튼 상태(State) 명시적 스타일링
- `disabled`, `hover`, `active` 상태일 때의 스타일을 투명(`transparent`)으로 처리하여 편법으로 넘기지 마십시오.
- **금지 패턴**: `opacity`가 아닌 `color: "transparent"`를 사용하여 텍스트를 숨기는 행위 (드래그 시 텍스트가 보이거나 스크린 리더에 혼란을 줌).
- **권장 패턴**: 버튼 비활성화 시에는 `opacity: 0.3`~`0.5`를 적용하고 `cursor: not-allowed`를 명시하며, 색상은 일반 상태와 동일한 테마 변수를 유지하십시오.

## 3. 다크 모드 호환성 확인 절차
- UI 수정 시, 머릿속으로 항상 "이 코드가 다크 모드일 때 배경색과 글자색이 어떻게 계산될까?"를 시뮬레이션 하십시오.
- 기본 텍스트 색상 변수(`var(--color-text-primary)`)는 다크 모드에서 밝은 색(예: `#F9FAFB`)이 된다는 사실을 절대 잊지 마십시오.
<!-- END:softbite-ui-design-rules -->
