# BAAL 서비스 개발 가이드

## 전역 템플릿 사용법

이 폴더(`_template/`)에는 모든 BAAL 서비스에 공통으로 적용되는 파일들이 들어있습니다.

### 파일 구조

```
_template/
├── template.html      # HTML 기본 템플릿
├── common.css         # 공통 스타일 (골드 테마, 다크모드)
├── common.js          # 공통 기능 (다크모드, 언어전환, 유틸리티)
├── README.md          # 이 파일
└── deploy.md          # 배포 가이드
```

---

## 새 서비스 만들기

### 1. 폴더 생성

```bash
cd tools/
mkdir 04-compress  # 서비스 번호-이름
cd 04-compress
```

### 2. 템플릿 복사

```bash
cp ../_template/template.html index.html
```

### 3. index.html 수정

다음 항목들을 수정하세요:

- `<title>` 태그
- 메타 태그 (description, keywords)
- Open Graph 태그 (og:title, og:description, og:url, og:image)
- `<h1>` 제목 (한/영 data 속성)
- 서비스 기능 추가 (`<main>` 섹션)

### 4. app.js 작성

서비스별 기능을 `app.js`에 작성하세요.

```html
<!-- index.html 하단에 추가 -->
<script src="app.js"></script>
```

### 5. README.md 작성

각 서비스 폴더에 README.md를 작성하여 개발 내용을 기록하세요.

---

## 공통 기능 사용법

### 다크모드

자동으로 작동합니다. 사용자 설정은 localStorage에 저장됩니다.

### 언어 전환

HTML 요소에 `data-ko`, `data-en` 속성을 추가하면 자동으로 전환됩니다:

```html
<h1 data-ko="이미지 압축기" data-en="Image Compressor">이미지 압축기</h1>
```

### 유틸리티 함수

`common.js`에서 제공하는 함수들:

```javascript
// 파일 크기 포맷팅
BaalUtils.formatFileSize(1024); // "1 KB"

// 토스트 메시지
BaalUtils.showToast('업로드 완료!', 'success', 3000);
BaalUtils.showToast('오류 발생', 'error', 3000);
BaalUtils.showToast('처리 중...', 'info', 3000);

// 로딩 스피너
BaalUtils.showLoading();
BaalUtils.hideLoading();

// 파일 다운로드
BaalUtils.downloadFile(blob, 'filename.jpg');
```

---

## 스타일 가이드

### CSS 변수

`common.css`에 정의된 변수를 사용하세요:

```css
.my-element {
    background: var(--gold-gradient);
    color: var(--text-primary);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-sm);
}
```

### 주요 CSS 변수

- `--gold-gradient` - 골드 그라디언트 (버튼 등)
- `--text-primary` - 메인 텍스트 색상
- `--text-secondary` - 부가 텍스트 색상
- `--bg-primary` - 배경 그라디언트
- `--bg-secondary` - 카드 배경
- `--border-color` - 테두리 색상
- `--border-radius-sm/md/lg/xl` - 둥근 모서리
- `--shadow-sm/md/lg` - 그림자

---

## 보안 가이드 ⚠️

### 환경변수 관리

API 키, 비밀 토큰 등 **민감한 정보는 절대 코드에 직접 넣지 마세요!**

#### ❌ 잘못된 예시

```javascript
const API_KEY = 'sk_live_51H...';  // 절대 안 됨!
const SECRET = 'my-secret-key';    // Git에 노출됨!
```

#### ✅ 올바른 예시

**1. .env 파일 생성**

```bash
# .env 파일 (루트 또는 서비스 폴더에 생성)
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
ADSENSE_CLIENT_ID=ca-pub-2886185075996969
API_KEY=your-secret-key-here
```

**2. .env 파일을 .gitignore에 추가**

```
.env
.env.local
.env.production
*.key
*.pem
```

**3. .env.example 파일 생성 (템플릿용)**

```bash
# .env.example
GOOGLE_ANALYTICS_ID=
ADSENSE_CLIENT_ID=
API_KEY=
```

**4. 환경변수 사용 방법**

브라우저에서는 빌드 시점에 주입하거나, 서버리스 함수 사용:

```javascript
// Cloudflare Pages 환경변수 사용
const API_KEY = process.env.API_KEY;

// 또는 런타임에 서버리스 함수로 요청
fetch('/api/get-config').then(res => res.json());
```

### .gitignore 필수 항목

```
# 환경변수
.env
.env.local
.env.*.local

# API 키
*.key
*.pem
credentials.json
config.secret.json

# 의존성
node_modules/
.pnpm-store/

# 빌드 결과물
dist/
build/
.next/
.cache/

# 로그
*.log
npm-debug.log*
```

---

## SEO 체크리스트

새 서비스를 만들 때 반드시 확인하세요:

- [ ] `<title>` 태그 - 명확하고 키워드 포함
- [ ] `<meta name="description">` - 150자 이내, 핵심 기능 설명
- [ ] `<meta name="keywords">` - 관련 키워드 5~10개
- [ ] Open Graph 태그 - 소셜 공유 시 표시
- [ ] favicon.ico 추가
- [ ] og-image.png 추가 (1200x630px 권장)
- [ ] robots.txt 확인
- [ ] sitemap.xml 업데이트

---

## Google Analytics 설정

`template.html`의 GA 코드에서 `G-XXXXXXXXXX`를 실제 ID로 변경:

```html
<!-- ⚠️ 환경변수로 관리 권장 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-실제ID"></script>
```

---

## AdSense 설정

이미 `template.html`에 포함되어 있습니다:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2886185075996969"
     crossorigin="anonymous"></script>
```

**baal.co.kr (루트 도메인)이 승인되면 모든 서브도메인에서 자동으로 광고가 게재됩니다.**

---

## 라이브러리 추가

CDN을 통해 라이브러리를 추가하세요:

```html
<!-- 예: browser-image-compression -->
<script src="https://cdn.jsdelivr.net/npm/browser-image-compression@2.0.2/dist/browser-image-compression.js"></script>

<!-- 예: JSZip -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
```

npm 사용 시:

```bash
npm init -y
npm install browser-image-compression
```

---

## 디버깅 팁

### 1. 콘솔 로그

```javascript
console.log('파일 업로드:', file);
console.error('오류 발생:', error);
console.table(data);  // 데이터 테이블 형태로 출력
```

### 2. 브라우저 개발자 도구

- `F12` - 개발자 도구 열기
- `Ctrl+Shift+C` - 요소 선택
- `Ctrl+Shift+M` - 모바일 뷰

### 3. 성능 측정

```javascript
console.time('이미지 압축');
// ... 작업 ...
console.timeEnd('이미지 압축');  // "이미지 압축: 152ms"
```

---

## ⚠️ Phase 1에서 배운 교훈 (필독!)

Phase 1 개발 중 발생했던 버그들을 정리했습니다. **반드시 확인하고 개발하세요!**

### 1. 다크모드/라이트모드 색상 충돌

**문제:** 배경색과 폰트색이 같아져서 텍스트가 안 보임

**원인:**
- CSS 변수 대신 하드코딩된 색상 사용
- 다크모드 전환 시 색상 업데이트 안 됨

**해결:**
```css
/* ❌ 잘못된 예시 */
.my-element {
    background: #ffffff;
    color: #000000;
}

/* ✅ 올바른 예시 */
.my-element {
    background: var(--bg-secondary);
    color: var(--text-primary);
}
```

**테스트 방법:**
1. 라이트 모드에서 모든 텍스트 확인
2. 다크 모드로 전환
3. 모든 텍스트가 읽히는지 확인

---

### 2. 라이브러리 로드 실패

**문제:** CDN 라이브러리가 로드되지 않아 기능이 작동하지 않음

**원인:**
- CDN URL 오타
- 네트워크 문제
- 버전 변경으로 URL 무효화

**해결:**
```html
<!-- ✅ 버전 고정 & fallback 처리 -->
<script src="https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js"></script>
<script>
if (typeof JSZip === 'undefined') {
    console.error('JSZip 로드 실패!');
    alert('필요한 라이브러리를 불러올 수 없습니다.');
}
</script>
```

**체크리스트:**
- [ ] CDN URL 정확성 확인
- [ ] 라이브러리 버전 고정 (예: `@3.10.1`)
- [ ] 브라우저 콘솔에서 로드 에러 확인
- [ ] 네트워크 탭에서 HTTP 상태 확인

---

### 3. 필수 UI 컨트롤 누락

**문제:** 우측 상단에 한/영 전환, 다크/라이트 모드 버튼이 없음

**원인:**
- 템플릿 복사 후 삭제
- HTML 구조 수정 시 실수로 제거

**해결:**
```html
<!-- ✅ 필수 UI 컨트롤 (절대 삭제 금지) -->
<div class="controls">
    <button id="langToggle" class="control-btn">EN</button>
    <button id="themeToggle" class="control-btn">🌙</button>
</div>
```

**위치 일관성:**
- 모든 서비스에서 **우측 상단** 동일한 위치
- 순서: 한/영 버튼 → 테마 버튼

---

### 4. 언어 자동 전환 버그

**문제:** 기능 사용 중 갑자기 영어로 바뀌는 현상

**원인:**
- 이벤트 핸들러에서 언어 변경 함수 호출
- DOM 업데이트 시 언어 설정 초기화

**해결:**
```javascript
// ❌ 잘못된 예시
button.onclick = () => {
    processFile();
    updateLanguage();  // 불필요한 언어 변경!
};

// ✅ 올바른 예시
button.onclick = () => {
    processFile();
    // 언어는 사용자가 명시적으로 변경할 때만
};

// localStorage에서 언어 상태 유지
const currentLang = localStorage.getItem('language') || 'ko';
```

**주의사항:**
- 언어 변경은 **오직 언어 버튼 클릭 시에만**
- 파일 처리, DOM 업데이트 시 언어 변경 금지
- localStorage에 언어 상태 저장/복원

---

### 5. Google AdSense 코드 누락

**문제:** AdSense 코드가 빠진 서비스

**해결:**
```html
<!-- ✅ 모든 서비스 <head>에 필수 -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2886185075996969"
     crossorigin="anonymous"></script>
```

---

### 6. 크로스 프로모션 도구 버튼 누락 ⚠️ 필수!

**문제:** 사용자가 다른 BAAL 서비스를 발견하지 못함

**해결:** 모든 서비스에 "더 많은 도구" 버튼 추가 (필수!)

#### HTML 추가 위치
우측 상단 버튼 영역 (언어/다크모드 버튼 옆):

```html
<!-- 가로 배열 예시 -->
<div class="utility-buttons">
    <button id="langToggle">🌐</button>
    <button id="themeToggle">🌙</button>
    <button id="toolsToggle" title="더 많은 도구 / More Tools">🧰</button>
</div>
```

#### CSS 추가 (툴팁 스타일)

```css
/* 버튼 상대 위치 지정 */
.icon-btn {
    position: relative;
}

/* 툴팁 스타일 */
.tooltip {
    position: absolute;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.85);
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s;
    z-index: 1000;
}

.icon-btn:hover .tooltip {
    opacity: 1;
}
```

#### JavaScript 추가 (버튼 기능)

```javascript
// 도구 버튼 초기화
function initToolsButton() {
    const toolsBtn = document.getElementById('toolsToggle');
    if (toolsBtn) {
        // 툴팁 생성
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';
        tooltip.textContent = currentLang === 'ko' ? '더 많은 도구' : 'More Tools';
        toolsBtn.appendChild(tooltip);

        // 클릭 이벤트 - baal.co.kr로 이동
        toolsBtn.addEventListener('click', () => {
            window.open('https://baal.co.kr', '_blank');
        });
    }
}

// 초기화 함수에서 호출
initToolsButton();
```

**중요:**
- 도구 버튼은 **모든 서비스에 필수**
- 숫자(예: "10개 도구") 표시 금지 (서비스 개수가 계속 변경됨)
- 클릭 시 새 탭(`_blank`)으로 열기
- 호버 시 "더 많은 도구" 툴팁 표시

---

## 배포 전 체크리스트

### 기본 기능
- [ ] 다크모드 테스트 (색상 충돌 없음)
- [ ] 라이트모드 테스트 (색상 충돌 없음)
- [ ] 한/영 전환 테스트 (모든 텍스트 변환)
- [ ] 언어 상태 유지 (새로고침 후에도 유지)

### UI 컨트롤
- [ ] 우측 상단 한/영 버튼 존재
- [ ] 우측 상단 테마 버튼 존재
- [ ] 우측 상단 도구 버튼 존재 (🧰) **필수!**
- [ ] 도구 버튼 클릭 시 baal.co.kr 이동
- [ ] 도구 버튼 호버 시 "더 많은 도구" 툴팁 표시
- [ ] 버튼 위치 일관성 (다른 서비스와 동일)

### 라이브러리
- [ ] 필요한 라이브러리 모두 로드됨
- [ ] CDN URL 정확성 확인
- [ ] 버전 고정
- [ ] 콘솔에 로드 에러 없음

### 기타
- [ ] 모바일 반응형 테스트
- [ ] 대용량 파일 테스트
- [ ] 브라우저 호환성 테스트 (Chrome, Firefox, Safari, Edge)
- [ ] 메타 태그 확인
- [ ] Google AdSense 코드 포함
- [ ] .env 파일이 .gitignore에 있는지 확인
- [ ] README.md 작성 완료

---

## 문제 해결

### common.css가 로드 안 됨

상대 경로 확인:

```html
<!-- 서비스 폴더가 tools/04-compress/ 라면 -->
<link rel="stylesheet" href="../_template/common.css">
```

### 다크모드가 작동 안 함

1. `common.js`가 로드되었는지 확인
2. 브라우저 콘솔에서 에러 확인
3. localStorage 확인: `localStorage.getItem('theme')`

### 언어 전환 안 됨

HTML 요소에 `data-ko`, `data-en` 속성 확인:

```html
<h1 data-ko="제목" data-en="Title">제목</h1>
```

---

## 참고 자료

- [MDN Web Docs](https://developer.mozilla.org/)
- [Can I Use](https://caniuse.com/) - 브라우저 호환성 확인
- [Google Analytics 문서](https://developers.google.com/analytics)
- [AdSense 정책](https://support.google.com/adsense/answer/48182)

---

## Phase 2 개발 교훈 (2025-01-26)

Phase 2 개발 중 발생했던 **치명적인 버그들**을 정리했습니다. **Phase 3 개발 시 반드시 확인하세요!**

### ⚠️ 버튼 스타일 오류 (치명적!)

**문제**: 버튼이 완전히 보이지 않음

**원인**:
```css
/* ❌ 잘못된 예 - 흰 배경에 흰 글씨 */
.custom-btn {
    background: var(--bg-secondary);  /* 흰색 배경 */
    color: white;  /* 흰색 글씨 = 안 보임! */
}

.custom-btn.active {
    background: var(--primary-color);  /* 존재하지 않는 변수! */
}
```

**해결**:
```css
/* ✅ 올바른 예 - 골드 테마 사용 */
.custom-btn {
    background: var(--gold-gradient);  /* 골드 그라디언트 */
    color: white;  /* 명확하게 보임 */
    border: 2px solid var(--gold-primary);
}

.custom-btn:hover,
.custom-btn.active {
    background: var(--gold-secondary);
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}
```

**규칙**:
- ✅ 모든 버튼은 `var(--gold-gradient)` 또는 `var(--gold-primary)` 사용
- ✅ `var(--primary-color)` 같은 정의되지 않은 변수 절대 사용 금지
- ✅ 탭/토글 버튼 기본 상태는 `color: var(--text-primary)` 사용 (배경색 대비)
- ✅ active 상태는 명확하게 골드 테마로 강조

---

### ⚠️ 툴팁 오버플로우

**문제**: "더 많은 도구" 툴팁이 화면 밖으로 넘어감

**해결**: 툴팁을 버튼 왼쪽에 배치
```css
/* ✅ _common/common.css에 이미 추가됨 */
.tools-toggle .tooltip {
    right: 100%;              /* 왼쪽에 배치 */
    top: 50%;
    transform: translateY(-50%);
    margin-right: 10px;
}
```

**주의**: 새 서비스는 `_common/common.css`를 복사하면 자동으로 적용됨

---

### ⚠️ 기본 색상 선택

**규칙**: 모든 서비스의 기본 색상은 **디오라 골드 (#d4af37)** 사용

**예시**:
```javascript
// ❌ 빨간색 사용 금지
const defaultColor = '#FF5733';

// ✅ 디오라 골드 사용
const defaultColor = '#d4af37';  // 또는 var(--gold-primary)
```

---

### ⚠️ 접근성 설명 필수

색상 대비, 등급 등 **전문 용어**를 사용하는 경우 **반드시 설명 추가**:

```html
<!-- ✅ WCAG 등급 설명 예시 -->
<p style="font-size: 0.9em; color: var(--text-secondary); margin-top: 15px;"
   data-ko="※ AAA: 최고 수준(7:1 이상), AA: 표준 수준(4.5:1 이상), Fail: 기준 미달(3:1 미만)"
   data-en="※ AAA: Highest level (7:1+), AA: Standard level (4.5:1+), Fail: Below standard (<3:1)">
    ※ AAA: 최고 수준(7:1 이상), AA: 표준 수준(4.5:1 이상), Fail: 기준 미달(3:1 미만)
</p>
```

---

### ⚠️ 다크모드 필수 테스트

**체크리스트**:
- [ ] 모든 버튼이 라이트/다크 모드에서 명확히 보임
- [ ] 텍스트 색상이 배경과 대비됨 (`var(--text-primary)` 사용)
- [ ] 입력창 배경/글자 색상이 구분됨
- [ ] 선택된 요소가 양쪽 모드에서 강조됨

**테스트 방법**:
1. 🌙 버튼 클릭하여 다크모드 전환
2. 모든 버튼, 입력창, 텍스트 가독성 확인
3. 탭 전환 시 active 상태 확인

---

### ⚠️ CSS 변수 사용 규칙

**사용 가능한 변수** (`_common/common.css` 참고):

**색상**:
- `var(--gold-primary)` - #d4af37 (기본 골드)
- `var(--gold-secondary)` - #DAA520 (진한 골드)
- `var(--gold-gradient)` - 골드 그라디언트
- `var(--text-primary)` - 주 텍스트 색상
- `var(--text-secondary)` - 보조 텍스트 색상
- `var(--bg-primary)` - 주 배경색
- `var(--bg-secondary)` - 보조 배경색
- `var(--border-color)` - 테두리 색상

**그림자**:
- `var(--shadow-sm)` - 작은 그림자
- `var(--shadow-md)` - 중간 그림자
- `var(--shadow-lg)` - 큰 그림자

**❌ 절대 사용 금지**:
- `var(--primary-color)` - 정의되지 않음!
- 하드코딩된 색상 값 (가급적 변수 사용)

---

### ⚠️ Phase 2 주요 수정 이력

1. **도구 버튼 아이콘**: 텍스트+이모지 → 이모지만 표시
2. **버튼 가시성**: 흰 배경+흰 글씨 → 골드 그라디언트
3. **활성 버튼**: 정의되지 않은 변수 → `var(--gold-gradient)`
4. **툴팁 위치**: 오른쪽 오버플로우 → 왼쪽 배치
5. **기본 색상**: 빨간색 → 디오라 골드
6. **접근성 설명**: 없음 → 등급 설명 추가

---

## Phase 3 개발 시 체크리스트 (필수!)

새 서비스 개발 전 **반드시 확인**:

### HTML 구조
- [ ] `_common/common.css` 링크 (NOT `../_template/`)
- [ ] `_common/common.js` 링크 (NOT `../_template/`)
- [ ] 도구 버튼에 `<span class="tooltip">` 포함
- [ ] 모든 텍스트에 `data-ko`, `data-en` 속성

### CSS 스타일
- [ ] 버튼: `background: var(--gold-gradient)` 사용
- [ ] 버튼 글자: `color: white` 사용
- [ ] 탭/토글 기본: `color: var(--text-primary)` 사용
- [ ] 활성 상태: `var(--gold-gradient)` + `transform: translateY(-2px)`
- [ ] `var(--primary-color)` 같은 미정의 변수 없음

### 기능
- [ ] 기본 색상: #d4af37 (디오라 골드)
- [ ] 전문 용어에 설명 추가
- [ ] 다크모드 테스트 완료
- [ ] 버튼 hover/active 상태 명확

### 배포 전
- [ ] 라이트 모드에서 모든 요소 확인
- [ ] 다크 모드에서 모든 요소 확인
- [ ] 툴팁이 화면 안에 표시되는지 확인
- [ ] 모든 버튼이 클릭/호버 시 시각적 피드백 있음

---

**질문이나 문제가 있으면 tools-plan.html을 참고하거나 개발 로그에 기록하세요!**
