# BAAL 서비스 개발 매뉴얼

> 실제 코드 분석 기반 개발 가이드

**기준:** 18개 서비스 분석
**업데이트:** 2025-10-26 19:00 KST

---

## 목차

1. [프로젝트 구조](#1-프로젝트-구조)
2. [디자인 시스템](#2-디자인-시스템)
3. [공통 컴포넌트](#3-공통-컴포넌트)
4. [CDN 라이브러리 목록](#4-cdn-라이브러리-목록)
5. [SEO 템플릿](#5-seo-템플릿)
6. [다크모드 구현](#6-다크모드-구현)
7. [모바일 반응형](#7-모바일-반응형)
8. [에러 처리](#8-에러-처리)
9. [Phase별 교훈](#9-phase별-교훈)
10. [개발 체크리스트](#10-개발-체크리스트)

---

## 1. 프로젝트 구조

### 폴더 구조
```
G:\hddcode\tools\XX-servicename\
├── index.html              # 메인 HTML 파일
├── _common/
│   ├── common.css         # 공통 CSS (골드 그라디언트 디자인 시스템)
│   └── common.js          # 공통 JS (선택사항)
├── README.md              # 서비스 설명, 라이선스
└── .gitignore
```

### 배포 구조
- **호스팅:** Cloudflare Pages (무료)
- **저장소:** GitHub (liveq/XX-servicename)
- **도메인:** https://servicename.baal.co.kr
- **배포 방식:** git push → 자동 배포

### 파일 작성 순서
1. **README.md** 작성 (서비스 설명, 기능, 라이선스)
2. **index.html** 복사 (템플릿에서)
3. **SEO 메타 태그** 수정 (title, description, OG)
4. **기능 개발** (HTML + CSS + JS)
5. **다크모드 테스트**
6. **모바일 반응형 테스트**
7. **배포 & 등록** (baal.co.kr, diora.co.kr)

---

## 2. 디자인 시스템

### CSS 변수 (공통)
```css
/* _common/common.css에서 관리 */
:root {
    /* 배경 */
    --bg-primary: linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f1f3f4 100%);
    --bg-secondary: rgba(255, 255, 255, 0.95);
    --bg-accent: linear-gradient(135deg, #fff9e6 0%, #ffffff 100%);

    /* 텍스트 */
    --text-primary: #1a1a1a;
    --text-secondary: #666;
    --text-muted: #999;

    /* 골드 그라디언트 (BAAL 시그니처) */
    --gold-primary: #d4af37;
    --gold-secondary: #DAA520;
    --gold-tertiary: #B8860B;
    --gold-gradient: linear-gradient(135deg, #d4af37 0%, #DAA520 50%, #B8860B 100%);

    /* 테두리 & 그림자 */
    --border-color: #f0e6d2;
    --shadow-sm: 0 4px 20px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 10px 40px rgba(0, 0, 0, 0.08);
    --shadow-lg: 0 20px 60px rgba(0, 0, 0, 0.12);

    /* 보더 반경 */
    --border-radius-sm: 8px;
    --border-radius-md: 12px;
    --border-radius-lg: 16px;
    --border-radius-xl: 24px;
}

/* 다크모드 */
body.dark-mode {
    --bg-primary: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1f1f1f 100%);
    --bg-secondary: rgba(40, 40, 40, 0.95);
    --bg-accent: linear-gradient(135deg, #2a2416 0%, #2d2d2d 100%);

    --text-primary: #f0f0f0;
    --text-secondary: #b0b0b0;
    --text-muted: #808080;

    --border-color: #3a3a3a;
    --shadow-sm: 0 4px 20px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 10px 40px rgba(0, 0, 0, 0.4);
    --shadow-lg: 0 20px 60px rgba(0, 0, 0, 0.5);
}
```

### 컬러 팔레트
- **골드 그라디언트:** BAAL의 시그니처 컬러. 모든 버튼, 강조 요소에 사용
- **화이트/블랙:** 배경 및 텍스트
- **그레이:** 보조 텍스트, 테두리

### 타이포그래피
```css
/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* 폰트 크기 */
h1 { font-size: 2.5em; font-weight: 700; }
h2 { font-size: 1.8em; font-weight: 700; }
h3 { font-size: 1.4em; font-weight: 700; }
.subtitle { font-size: 1.1em; font-weight: 500; }
body { font-size: 1em; font-weight: 400; }
```

---

## 3. 공통 컴포넌트

### 다크모드 토글
```html
<div class="theme-toggle">
    <button onclick="toggleTheme()" aria-label="다크모드 전환">
        <span class="icon-light">🌙</span>
        <span class="icon-dark">☀️</span>
    </button>
</div>

<script>
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
}

// 초기 로드
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}
</script>
```

### 언어 전환
```html
<div class="lang-toggle">
    <button onclick="toggleLang()">
        <span class="lang-ko">EN</span>
        <span class="lang-en">한국어</span>
    </button>
</div>

<script>
function toggleLang() {
    const currentLang = document.body.getAttribute('data-lang') || 'ko';
    const newLang = currentLang === 'ko' ? 'en' : 'ko';
    document.body.setAttribute('data-lang', newLang);
    localStorage.setItem('lang', newLang);
}

// 초기 로드
document.body.setAttribute('data-lang', localStorage.getItem('lang') || 'ko');
</script>

<style>
body[data-lang="ko"] .lang-en,
body[data-lang="en"] .lang-ko {
    display: none;
}
</style>
```

### 버튼 스타일
```css
button, .btn {
    background: var(--gold-gradient);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: var(--border-radius-md);
    font-size: 1em;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: var(--shadow-sm);
}

button:hover, .btn:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

button:active, .btn:active {
    transform: translateY(0);
}

button:disabled, .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}
```

### 파일 업로드 (드래그 앤 드롭)
```html
<div class="dropzone" id="dropzone">
    <p class="lang-ko">이미지를 드래그하거나 클릭하세요</p>
    <p class="lang-en">Drag & drop or click to upload</p>
    <input type="file" id="fileInput" accept="image/*" multiple hidden>
</div>

<script>
const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');

dropzone.onclick = () => fileInput.click();

dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('active');
});

dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('active');
});

dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('active');
    const files = e.dataTransfer.files;
    handleFiles(files);
});

fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
});

function handleFiles(files) {
    // 파일 처리 로직
}
</script>
```

---

## 4. CDN 라이브러리 목록

### 이미지 처리
```html
<!-- 이미지 압축 -->
<script src="https://cdn.jsdelivr.net/npm/browser-image-compression@2.0.2/dist/browser-image-compression.js"></script>

<!-- 고품질 리사이즈 -->
<script src="https://cdn.jsdelivr.net/npm/pica@9.0.1/dist/pica.min.js"></script>

<!-- ZIP 압축 -->
<script src="https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js"></script>

<!-- 파일 저장 -->
<script src="https://cdn.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js"></script>
```

### PDF 처리
```html
<!-- PDF 렌더링 -->
<script src="https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js"></script>
<script>
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
</script>

<!-- PDF 조작 -->
<script src="https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>
```

### QR & 바코드
```html
<!-- QR 코드 생성 -->
<script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js"></script>

<!-- 바코드 생성 -->
<script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js"></script>
```

### 차트 & 시각화
```html
<!-- Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
```

### 데이터 처리
```html
<!-- CSV 파싱 -->
<script src="https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js"></script>

<!-- 마크다운 파싱 -->
<script src="https://cdn.jsdelivr.net/npm/marked@11.1.1/marked.min.js"></script>

<!-- Excel -->
<script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>
```

### AI & ML
```html
<!-- TensorFlow.js -->
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.14.0/dist/tf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/body-pix@2.2.0/dist/body-pix.min.js"></script>

<!-- Tesseract.js (OCR) -->
<script src="https://cdn.jsdelivr.net/npm/tesseract.js@5.0.3/dist/tesseract.min.js"></script>

<!-- UpscalerJS -->
<script src="https://cdn.jsdelivr.net/npm/upscaler@1.0.0-beta.15/dist/upscaler.min.js"></script>
```

---

## 5. SEO 템플릿

### 메타 태그 (복사 후 수정)
```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="[서비스 설명 - 50-160자]">
    <meta name="keywords" content="[키워드1], [키워드2], [키워드3]">
    <meta name="author" content="BAAL">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://[servicename].baal.co.kr/">
    <meta property="og:title" content="[서비스명] - BAAL">
    <meta property="og:description" content="[서비스 설명]">
    <meta property="og:image" content="https://[servicename].baal.co.kr/og-image.png">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://[servicename].baal.co.kr/">
    <meta property="twitter:title" content="[서비스명] - BAAL">
    <meta property="twitter:description" content="[서비스 설명]">
    <meta property="twitter:image" content="https://[servicename].baal.co.kr/og-image.png">

    <title>[서비스명] - BAAL</title>

    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2886185075996969"
     crossorigin="anonymous"></script>

    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-XXXXXXXXXX');
    </script>

    <!-- 공통 스타일 -->
    <link rel="stylesheet" href="_common/common.css">
</head>
```

### SEO 최적화 팁
1. **Title:** 50자 이내, 키워드 포함
2. **Description:** 120-160자, 행동 유도 포함
3. **Keywords:** 5-10개, 한글/영문 혼합
4. **OG Image:** 1200x630px PNG
5. **URL:** 짧고 명확하게 (servicename.baal.co.kr)

---

## 6. 다크모드 구현

### CSS 변수 방식 (권장)
```css
/* 라이트 모드 기본값 */
:root {
    --bg-primary: #ffffff;
    --text-primary: #1a1a1a;
}

/* 다크모드 오버라이드 */
body.dark-mode {
    --bg-primary: #1a1a1a;
    --text-primary: #f0f0f0;
}

/* 컴포넌트에서 변수 사용 */
body {
    background: var(--bg-primary);
    color: var(--text-primary);
}
```

### 이미지 필터
```css
/* 다크모드에서 이미지 밝기 조절 */
body.dark-mode img:not(.no-filter) {
    filter: brightness(0.8) contrast(1.2);
}
```

### 로컬 스토리지 저장
```javascript
// 저장
localStorage.setItem('theme', 'dark');

// 불러오기
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}
```

---

## 7. 모바일 반응형

### 브레이크포인트
```css
/* 태블릿 (1024px 이하) */
@media (max-width: 1024px) {
    .container {
        padding: 40px 30px;
    }
}

/* 모바일 (768px 이하) */
@media (max-width: 768px) {
    body {
        padding: 30px 15px;
    }

    h1 {
        font-size: 2em;
    }

    /* 버튼 전체 너비 */
    button {
        width: 100%;
    }
}

/* 소형 모바일 (413px 이하) */
@media (max-width: 413px) {
    body {
        padding: 20px 10px;
    }

    h1 {
        font-size: 1.5em;
    }
}
```

### 터치 최적화
```css
/* 터치 타겟 최소 크기 */
button, a, input[type="file"] {
    min-height: 44px;
    min-width: 44px;
}

/* 터치 피드백 */
button:active {
    transform: scale(0.95);
}
```

---

## 8. 에러 처리

### 파일 업로드 에러
```javascript
function handleFiles(files) {
    if (!files || files.length === 0) {
        alert('파일을 선택하세요.');
        return;
    }

    for (const file of files) {
        // 파일 타입 체크
        if (!file.type.startsWith('image/')) {
            alert(`${file.name}은(는) 이미지 파일이 아닙니다.`);
            continue;
        }

        // 파일 크기 체크 (10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert(`${file.name}은(는) 10MB를 초과합니다.`);
            continue;
        }

        // 처리...
    }
}
```

### Try-Catch 패턴
```javascript
async function processImage(file) {
    try {
        const result = await doSomething(file);
        return result;
    } catch (error) {
        console.error('이미지 처리 실패:', error);
        alert(`처리 실패: ${error.message}`);
        return null;
    }
}
```

### 로딩 인디케이터
```html
<div id="loading" style="display: none;">
    <div class="spinner"></div>
    <p>처리 중...</p>
</div>

<script>
function showLoading() {
    document.getElementById('loading').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

async function process() {
    showLoading();
    try {
        await doWork();
    } finally {
        hideLoading();
    }
}
</script>
```

---

## 9. Phase별 교훈

### Phase 1 교훈 (도면, 텍스트, PDF)
✅ **잘한 것:**
- 로컬 처리로 개인정보 보호
- Cloudflare Pages 무료 호스팅
- 서브도메인 활용 (*.baal.co.kr)

❌ **개선 필요:**
- 초기에 공통 CSS 없이 중복 코드 발생
- SEO 메타 태그 누락
- 모바일 반응형 미흡

### Phase 2 교훈 (이미지, 개발자 도구)
✅ **잘한 것:**
- `_common/common.css` 도입으로 일관성 확보
- 탭 UI로 여러 기능 통합 (압축/변환)
- 다크모드 기본 탑재

❌ **개선 필요:**
- 언어 전환 구현 불일치
- Google Analytics ID 하드코딩

### Phase 3 교훈 (AI, 고급 기능)
✅ **잘한 것:**
- TensorFlow.js, Tesseract.js 성공적 적용
- 로딩 인디케이터로 UX 개선
- baal.co.kr, diora.co.kr 동시 등록

❌ **개선 필요:**
- AI 모델 로딩 시간 긴 문제 (해결: 스피드 모드)
- 모바일에서 메모리 부족 이슈
- 버튼 정렬 문제 (해결: flexbox)

### Phase 3 마무리 작업
✅ **개선 사항:**
- baal.co.kr 버튼 텍스트 통일: "사용하기 →"
- diora.co.kr 버튼 수평 정렬: flexbox 적용
- README.md 통합 개발 가이드 추가

---

## 10. 개발 체크리스트

### 프로젝트 시작
- [ ] GitHub 저장소 생성 (liveq/XX-servicename)
- [ ] 로컬 폴더 생성 (`G:\hddcode\tools\XX-servicename\`)
- [ ] README.md 작성 (서비스 설명, 기능)
- [ ] .gitignore 생성

### HTML 개발
- [ ] `_common/common.css` 링크
- [ ] SEO 메타 태그 작성 (title, description, OG, Twitter)
- [ ] Google Analytics 코드 삽입
- [ ] Google AdSense 코드 삽입 (선택)
- [ ] 다크모드 토글 추가
- [ ] 언어 전환 추가 (한/영)
- [ ] Footer 추가 (저작권, 링크, 이메일)

### 기능 개발
- [ ] 파일 업로드 (드래그 앤 드롭)
- [ ] 파일 타입/크기 검증
- [ ] 에러 처리 (try-catch)
- [ ] 로딩 인디케이터
- [ ] 다운로드 기능 (FileSaver.js)
- [ ] 일괄 처리 (여러 파일)

### 디자인
- [ ] 골드 그라디언트 버튼
- [ ] 카드 스타일 (--shadow-md)
- [ ] 인풋 필드 스타일 (--border-color)
- [ ] 다크모드 CSS 변수 활용

### 테스트
- [ ] 크롬 데스크톱 테스트
- [ ] 다크모드 전환 테스트
- [ ] 언어 전환 테스트
- [ ] 모바일 반응형 테스트 (개발자도구)
- [ ] 에러 케이스 테스트 (잘못된 파일, 큰 파일)
- [ ] 여러 파일 업로드 테스트

### 배포 전
- [ ] Google Analytics ID 교체 (G-XXXXXXXXXX)
- [ ] OG Image 생성 (1200x630px)
- [ ] 로컬 테스트 완료
- [ ] git commit & push

### 배포 후
- [ ] Cloudflare Pages 배포 확인
- [ ] DNS 설정 (servicename.baal.co.kr)
- [ ] HTTPS 확인
- [ ] 실제 URL 테스트

### 통합 작업
- [ ] baal.co.kr 그리드에 카드 추가
- [ ] baal.co.kr 사이드바에 링크 추가
- [ ] diora.co.kr 관련서비스에 추가
- [ ] README.md 업데이트 (완료 개수)
- [ ] PLAN.md 체크 표시

### 마케팅
- [ ] Google Search Console 등록
- [ ] Naver 웹마스터 도구 등록
- [ ] 커뮤니티 홍보 (Reddit, Facebook)
- [ ] Diora 거래처 홍보 (해당 시)

---

## 자주 쓰는 코드 스니펫

### 이미지 Canvas 변환
```javascript
function imageToCanvas(file) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                resolve(canvas);
            };
            img.onerror = reject;
            img.src = e.target.result;
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
```

### Canvas를 Blob으로 변환
```javascript
function canvasToBlob(canvas, type = 'image/png', quality = 0.95) {
    return new Promise((resolve) => {
        canvas.toBlob(resolve, type, quality);
    });
}
```

### 파일 다운로드
```javascript
function download(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}
```

### ZIP 다운로드
```javascript
async function downloadAsZip(files, zipName = 'files.zip') {
    const zip = new JSZip();

    for (const file of files) {
        zip.file(file.name, file.blob);
    }

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    download(zipBlob, zipName);
}
```

---

## 개발 팁

1. **공통 CSS 활용:** `_common/common.css`를 최대한 재사용
2. **CDN 사용:** 로딩 속도 빠르고 캐싱 효과
3. **CSS 변수:** 다크모드 구현 쉬움
4. **로컬 스토리지:** 사용자 설정 저장 (테마, 언어)
5. **try-catch:** 모든 비동기 작업에 필수
6. **로딩 인디케이터:** 3초 이상 걸리는 작업은 필수
7. **모바일 우선:** 모바일 사용자가 50% 이상
8. **SEO 필수:** 트래픽의 70%가 검색 유입

---

**이 매뉴얼은 18개 서비스 개발 경험을 바탕으로 작성되었습니다.**
**복사-붙여넣기해서 바로 사용 가능합니다.**
