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
