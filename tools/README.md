# BAAL 도구 모음

브라우저 기반 무료 온라인 도구 모음

## 프로젝트 구조

```
tools/
├── _template/              # 전역 템플릿 및 가이드
│   ├── template.html       # HTML 기본 템플릿
│   ├── common.css          # 공통 스타일
│   ├── common.js           # 공통 기능
│   ├── README.md           # 개발 가이드
│   └── deploy.md           # 배포 가이드
│
├── 04-compress/            # 이미지 압축기
├── 05-qr/                  # QR 코드 생성기
├── 06-resize/              # 이미지 리사이즈
├── 07-json/                # JSON 포맷터
├── 08-color/               # 색상 변환기
├── 09-base64/              # Base64 인코더
├── 10-regex/               # 정규식 테스터
├── 11-hash/                # 해시 생성기
├── 12-csv/                 # CSV 변환기
├── 13-md/                  # 마크다운 에디터
├── 14-convert/             # 이미지 변환기
├── 15-barcode/             # 바코드 생성기
├── 16-watermark/           # 워터마크 추가
├── 17-chart/               # 차트 생성기
├── 18-bg/                  # 배경 제거
├── 19-ocr/                 # OCR (텍스트 추출)
│
├── .gitignore              # Git 제외 파일
├── .env.example            # 환경변수 템플릿
└── README.md               # 이 파일
```

## 시작하기

### 1. 환경변수 설정

```bash
# .env.example을 복사해서 .env 파일 생성
cp .env.example .env

# .env 파일 편집하여 실제 값 입력
# ⚠️ .env 파일은 Git에 커밋하지 마세요!
```

### 2. 새 서비스 개발

```bash
# 서비스 폴더로 이동
cd 04-compress

# template.html 복사
cp ../_template/template.html index.html

# index.html 수정 (제목, 메타태그, 기능 추가)

# app.js 작성 (서비스 로직)

# 로컬에서 테스트
# 브라우저에서 index.html 열기
```

### 3. 개발 가이드 참고

- **전역 가이드:** `_template/README.md`
- **배포 가이드:** `_template/deploy.md`
- **서비스별 가이드:** 각 폴더의 `README.md`

## 공통 기능

모든 서비스는 다음 기능을 기본 탑재:

- ✅ **다크모드** - 자동 저장
- ✅ **한/영 전환** - 다국어 지원
- ✅ **골드 테마** - BAAL 아이덴티티
- ✅ **Google AdSense** - 광고 수익
- ✅ **Google Analytics** - 트래픽 분석
- ✅ **반응형 디자인** - 모바일 최적화

## 개발 전략

### Phase 1: 빠른 트래픽 확보
- #4 이미지 압축기 ⭐⭐⭐
- #5 QR 코드 생성기 ⭐⭐⭐
- #6 이미지 리사이즈 ⭐⭐⭐
- #7 JSON 포맷터 ⭐⭐

### Phase 2: 틈새 도구
- #8 색상 변환기
- #9 Base64 인코더
- #10 정규식 테스터
- #11 해시 생성기
- #12 CSV 변환기
- #13 마크다운 에디터

### Phase 3: 고급 기능
- #14 이미지 변환기 ⭐⭐⭐
- #15 바코드 생성기
- #16 워터마크 추가
- #17 차트 생성기
- #18 배경 제거 ⭐⭐⭐ (AI)
- #19 OCR (텍스트 추출)

## 보안 주의사항 ⚠️

### 절대 Git에 커밋하지 말 것:

- `.env` 파일
- API 키, 비밀 토큰
- `*.key`, `*.pem` 파일
- `credentials.json`

### .gitignore 확인:

```bash
# .gitignore에 다음이 포함되어 있는지 확인
.env
*.key
*.pem
credentials.json
```

## 배포

각 서비스는 Cloudflare Pages에 배포:

- compress.baal.co.kr
- qr.baal.co.kr
- resize.baal.co.kr
- ... (계속)

**배포 방법:** `_template/deploy.md` 참고

## 트래픽 모니터링

- **Cloudflare Analytics:** 트래픽, 대역폭
- **Google Analytics:** 사용자 행동 분석
- **목표:** Phase 1 완료 후 트래픽 분석 → 우선순위 조정

## 기여 가이드

새 기능 추가 시:

1. 해당 서비스 폴더의 `README.md` 업데이트
2. 개발 로그 기록
3. 이슈 및 해결방안 문서화
4. `tools-plan.html` 업데이트 (완료 표시)

## 라이선스

© 2025 BAAL. All rights reserved.

---

**더 자세한 내용은 `_template/README.md`를 참고하세요!**
