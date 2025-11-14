# 🌐 웹 애플리케이션 (Web Application)

KREAM ERP 정산 시스템의 프론트엔드 웹 애플리케이션입니다.

---

## 📋 개요

React + Vite 기반의 모던 웹 애플리케이션으로, 정산 운영팀이 사용하는 ERP 시스템의 사용자 인터페이스를 제공합니다.

---

## 🛠️ 기술 스택

### Core
- **React 18** - UI 라이브러리
- **Vite 5** - 빌드 도구 (빠른 개발 서버, HMR)
- **React Router v6** - 라우팅

### State Management
- **Zustand** - 경량 상태 관리
- **TanStack Query (React Query)** - 서버 상태 관리

### Styling
- **Tailwind CSS 3** - 유틸리티 우선 CSS 프레임워크
- **PostCSS** - CSS 후처리

### Data Visualization
- **Recharts** - 차트 라이브러리

### Form Handling
- **React Hook Form** - 폼 관리
- **Zod** - 스키마 검증

### HTTP Client
- **Axios** - HTTP 클라이언트

### Utilities
- **date-fns** - 날짜 처리

---

## 📁 프로젝트 구조

```
04_Web/
├── public/                          # 정적 파일
│   └── 정산대시보드_프로토타입.html    # HTML 프로토타입 (참고용)
├── src/
│   ├── components/                  # 공통 컴포넌트
│   │   ├── Layout.jsx              # 레이아웃 (헤더 + 사이드바 + 메인)
│   │   ├── Header.jsx              # 상단 헤더
│   │   └── Sidebar.jsx             # 사이드바 네비게이션
│   ├── pages/                       # 페이지 컴포넌트
│   │   ├── Dashboard.jsx           # 대시보드 (홈)
│   │   ├── SettlementList.jsx      # 정산 목록
│   │   ├── SettlementDetail.jsx    # 정산 상세
│   │   ├── TransactionList.jsx     # 거래 내역
│   │   ├── HoldManagement.jsx      # 보류 관리
│   │   └── Statistics.jsx          # 통계
│   ├── services/                    # API 서비스
│   │   ├── api.js                  # Axios 인스턴스 (인터셉터 포함)
│   │   └── settlementService.js    # 정산 API 호출 함수
│   ├── utils/                       # 유틸리티 함수
│   │   └── helpers.js              # 포맷팅, 날짜 처리 등
│   ├── styles/                      # 글로벌 스타일
│   │   └── index.css               # Tailwind + 커스텀 스타일
│   ├── App.jsx                      # 루트 컴포넌트 (라우팅)
│   └── main.jsx                     # 앱 진입점
├── assets/                          # 이미지, 폰트 등
├── index.html                       # HTML 템플릿
├── vite.config.js                   # Vite 설정
├── tailwind.config.js               # Tailwind 설정
└── package.json                     # 의존성 관리
```

---

## 🚀 시작하기

### 1. 의존성 설치

```bash
cd 04_Web
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

개발 서버가 `http://localhost:3000`에서 실행됩니다.

### 3. 빌드

```bash
npm run build
```

프로덕션 빌드가 `dist/` 폴더에 생성됩니다.

### 4. 프리뷰 (빌드 확인)

```bash
npm run preview
```

---

## 📱 주요 화면

### 1. 대시보드 (`/`)
- 일일 정산 요약 (카드 형태)
- 빠른 작업 버튼
- 최근 알림

### 2. 정산 관리 (`/settlements`)
- 정산 대상 목록 (판매자별 집계)
- 정산서 생성 (개별/일괄)
- 검색 및 필터링
- 거래 상세 드릴다운

### 3. 거래 내역 (`/transactions`)
- 전체 거래 내역 조회
- 상품별, 판매자별 필터링
- 엑셀 다운로드

### 4. 보류 관리 (`/holds`)
- 정산 보류 건 목록
- 보류 사유 확인
- 보류 해제 처리

### 5. 통계 (`/statistics`)
- 판매자별 정산 통계
- 기간별 정산 현황
- 차트 및 그래프

---

## 🎨 디자인 시스템

### 색상 팔레트
```js
// KREAM 브랜드 컬러
kream-black: #222222
kream-white: #ffffff
kream-gray: #fafafa, #f4f4f4, #ebebeb, #666666

// 상태 컬러
success: #00c73c   (완료, 승인)
warning: #ffa500   (대기, 진행중)
danger: #f15746    (보류, 실패)
```

### 타이포그래피
```js
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto'
```

### 컴포넌트
- **버튼**: `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-success`
- **카드**: `.card`, `.card-hover`
- **뱃지**: `.badge`, `.badge-pending`, `.badge-completed`, `.badge-hold`
- **입력**: `.input`

---

## 🔌 API 연동

### 기본 설정
API 베이스 URL은 Vite 설정의 프록시를 통해 연결됩니다:
```js
// vite.config.js
proxy: {
  '/api': {
    target: 'http://localhost:8080',  // 백엔드 서버
    changeOrigin: true,
  },
}
```

### API 호출 예시
```js
import { getSettlementTargets } from '@services/settlementService'

const { data } = await getSettlementTargets({
  date: '2025-01-15',
  sellerType: 'INDIVIDUAL',
})
```

### 인증
JWT 토큰을 `localStorage`에 저장하고, Axios 인터셉터에서 자동으로 `Authorization` 헤더에 추가합니다.

---

## 📦 빌드 최적화

### 코드 스플리팅
```js
// vite.config.js
manualChunks: {
  vendor: ['react', 'react-dom', 'react-router-dom'],
  charts: ['recharts'],
}
```

### 번들 크기 분석
```bash
npm run build -- --analyze
```

---

## 🧪 개발 가이드

### 컴포넌트 작성 규칙
1. **함수형 컴포넌트** 사용
2. **PropTypes** 또는 **TypeScript** 타입 정의
3. **커스텀 훅** 활용
4. **컴포넌트 분리** (단일 책임 원칙)

### 파일 네이밍
- 컴포넌트: PascalCase (예: `Dashboard.jsx`)
- 유틸리티: camelCase (예: `helpers.js`)
- 서비스: camelCase + Service (예: `settlementService.js`)

### Import 순서
```js
// 1. 외부 라이브러리
import React from 'react'
import { useQuery } from '@tanstack/react-query'

// 2. 내부 컴포넌트
import Header from '@components/Header'

// 3. 서비스 및 유틸리티
import { getSettlements } from '@services/settlementService'
import { formatCurrency } from '@utils/helpers'

// 4. 스타일
import './styles.css'
```

---

## 🔧 환경 변수

`.env` 파일을 생성하여 환경 변수를 설정합니다:

```env
VITE_API_BASE_URL=http://localhost:8080
VITE_APP_TITLE=KREAM ERP
```

사용 예시:
```js
const apiUrl = import.meta.env.VITE_API_BASE_URL
```

---

## 📝 개발 로드맵

### Phase 1: 기본 구조 ✅
- [x] 프로젝트 셋업
- [x] 라우팅 구조
- [x] 레이아웃 컴포넌트
- [x] API 서비스 레이어

### Phase 2: 핵심 기능 (진행 예정)
- [ ] 정산 대시보드 완성
- [ ] 정산 대상 목록 (판매자별 집계)
- [ ] 정산서 생성 (개별/일괄)
- [ ] 정산서 상세 및 승인

### Phase 3: 추가 기능
- [ ] 거래 내역 상세
- [ ] 보류 관리
- [ ] 대사 실행
- [ ] 통계 및 차트

### Phase 4: 최적화 & 배포
- [ ] 성능 최적화
- [ ] 테스트 작성
- [ ] CI/CD 파이프라인
- [ ] 프로덕션 배포

---

## 🐛 문제 해결

### 포트 충돌 시
```bash
# vite.config.js에서 포트 변경
server: {
  port: 3001
}
```

### CORS 에러 시
백엔드 서버에서 CORS 설정이 필요합니다:
```js
// Express 예시
app.use(cors({
  origin: 'http://localhost:3000'
}))
```

---

## 📌 참고 자료

### 공식 문서
- [React 공식 문서](https://react.dev)
- [Vite 공식 문서](https://vitejs.dev)
- [Tailwind CSS 공식 문서](https://tailwindcss.com)
- [TanStack Query 공식 문서](https://tanstack.com/query)

### 내부 문서
- `public/정산대시보드_프로토타입.html` - HTML 프로토타입 (참고용)
- `../01_Planning/` - 기획서
- `../02_Database/` - DB 설계서

---

## 📞 문의

개발 관련 문의: IT기획팀
운영 관련 문의: 정산운영팀

---

## 📌 버전 정보
- **최종 수정일**: 2025-11-12
- **프로젝트 버전**: v1.0.0
- **작성자**: IT기획팀 / 프론트엔드팀

