# DEV-GUIDE.md

> **BAAL Services 공용 개발 매뉴얼** | Common Development Guide

**별칭:** 공용메뉴얼, 개발가이드, 코딩규칙서
**기준:** 20개 완료 서비스 분석
**최종 업데이트:** 2025-10-26

모든 서비스 개발 시 참조하는 필수 문서입니다.

---

## 📑 목차

1. [빠른 시작](#1-빠른-시작)
2. [프로젝트 구조](#2-프로젝트-구조)
3. [디자인 시스템](#3-디자인-시스템)
4. [필수 코드 패턴](#4-필수-코드-패턴)
5. [자주 발생하는 버그와 해결책](#5-자주-발생하는-버그와-해결책)
6. [CDN 라이브러리 목록](#6-cdn-라이브러리-목록)
7. [SEO 템플릿](#7-seo-템플릿)
8. [배포 가이드](#8-배포-가이드)
9. [개발 체크리스트](#9-개발-체크리스트)
10. [Phase별 교훈](#10-phase별-교훈)

---

## 1. 빠른 시작

### 새 서비스 만들기

```bash
# 1. GitHub 저장소 생성
gh repo create liveq/baal-newservice --public

# 2. 로컬 폴더 생성
mkdir /g/hddcode/tools/XX-newservice
cd /g/hddcode/tools/XX-newservice

# 3. 템플릿 복사
cp ../template/index.html .
cp -r ../template/_common .

# 4. Git 초기화
git init
git remote add origin https://github.com/liveq/baal-newservice.git
```

### 개발 순서

1. **README.md** 작성 (서비스 설명, 기능, 라이선스)
2. **index.html** SEO 메타 태그 수정
3. **기능 개발** (HTML + CSS + JS)
4. **테스트** (다크모드, 언어 전환, 모바일)
5. **커밋 & 푸시**
6. **Cloudflare Pages 배포**
7. **통합** (baal.co.kr, diora.co.kr에 링크 추가)

---

## 2. 프로젝트 구조

### 폴더 구조

```
G:\hddcode\tools\XX-servicename\
├── index.html              # 메인 HTML 파일
├── _common/
│   ├── common.css         # 공통 CSS (골드 그라디언트 디자인 시스템)
│   └── common.js          # 공통 JS (BaalUtils)
├── README.md              # 서비스 설명, 라이선스
└── .gitignore
```

### 배포 구조

- **호스팅:** Cloudflare Pages (무료)
- **저장소:** GitHub (liveq/baal-XX-servicename)
- **도메인:** https://servicename.baal.co.kr
- **배포 방식:** git push → 자동 배포

---

## 3. 디자인 시스템

### 3.1 컬러 시스템

#### 라이트 모드
```css
:root {
    /* 배경 */
    --bg-primary: linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f1f3f4 100%);
    --bg-secondary: rgba(255, 255, 255, 0.95);
    --bg-accent: linear-gradient(135deg, #fff9e6 0%, #ffffff 100%);

    /* 텍스트 */
    --text-primary: #1a1a1a;      /* 제목, 본문 */
    --text-secondary: #666;       /* 부제목, 설명 */
    --text-muted: #999;           /* 비활성, 힌트 */

    /* 골드 (BAAL 시그니처) */
    --gold-primary: #d4af37;      /* Gold */
    --gold-secondary: #DAA520;    /* Goldenrod */
    --gold-tertiary: #B8860B;     /* Dark Goldenrod */
    --gold-gradient: linear-gradient(135deg, #d4af37 0%, #DAA520 50%, #B8860B 100%);

    /* 테두리 & 그림자 */
    --border-color: #f0e6d2;      /* 연한 골드 톤 */
    --shadow-sm: 0 4px 20px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 10px 40px rgba(0, 0, 0, 0.08);
    --shadow-lg: 0 20px 60px rgba(0, 0, 0, 0.12);

    /* 보더 반경 */
    --border-radius-sm: 8px;
    --border-radius-md: 12px;
    --border-radius-lg: 16px;
    --border-radius-xl: 24px;
}
```

#### 다크 모드
```css
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

### 3.2 타이포그래피

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 1em;         /* 16px */
    font-weight: 400;
    line-height: 1.6;
}

h1 {
    font-size: 2.5em;       /* 40px */
    font-weight: 700;
    letter-spacing: -0.5px;
    line-height: 1.2;
}

h2 {
    font-size: 1.8em;       /* 28.8px */
    font-weight: 700;
    letter-spacing: -0.3px;
    line-height: 1.3;
}

h3 {
    font-size: 1.4em;       /* 22.4px */
    font-weight: 700;
    line-height: 1.4;
}

.subtitle {
    font-size: 1.1em;       /* 17.6px */
    font-weight: 500;
    color: var(--text-secondary);
}

small, .small {
    font-size: 0.9em;       /* 14.4px */
    color: var(--text-secondary);
}
```

### 3.3 버튼 스타일

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

button:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

button:active {
    transform: translateY(0);
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
}
```

**⚠️ 중요: 버튼 정렬 이슈 해결**

Phase 3에서 다크모드/언어/도구 버튼이 가로 2줄로 표시되는 버그 발생.

**해결책:**
```css
/* common.css에서 lang-toggle 버튼을 다른 버튼과 동일하게 원형으로 */
.lang-toggle button {
    width: 50px;
    height: 50px;
    padding: 0;
    border-radius: 50%;  /* ⭐ 중요: border-radius-md 사용하면 넓어져서 줄바꿈 발생 */
    display: flex;
    align-items: center;
    justify-content: center;
}
```

### 3.4 반응형 브레이크포인트

```css
/* 대형 데스크톱 (1440px+) */
@media (min-width: 1440px) {
    .container { max-width: 1400px; }
}

/* 태블릿 (1024px 이하) */
@media (max-width: 1024px) {
    h1 { font-size: 2.2em; }
    .container { padding: 40px 30px; }
}

/* 모바일 (768px 이하) */
@media (max-width: 768px) {
    h1 { font-size: 2em; }
    .container { padding: 30px 20px; }
    button { width: 100%; }
}

/* 소형 모바일 (413px 이하) */
@media (max-width: 413px) {
    h1 { font-size: 1.8em; }
    body { font-size: 0.9em; }
}
```

---

## 4. 필수 코드 패턴

### 4.1 페이지 로드 시 스크롤 초기화 ⭐

**문제:** 사용자가 페이지 하단까지 스크롤 후 새로고침하면 브라우저가 이전 스크롤 위치를 기억함.

**해결책:**
```javascript
// ⭐ 중요: <script> 태그 최상단에 배치 (DOMContentLoaded 전에 실행되어야 함)
window.scrollTo(0, 0);

// 나머지 초기화 코드...
```

**적용 위치:**
- 모든 서비스의 `<script>` 블록 **최상단**
- 다른 초기화 코드보다 **먼저 실행**

**사용 사례:**
- 긴 페이지에서 사용자가 하단까지 스크롤 후 새로고침 시
- 브라우저가 이전 스크롤 위치를 기억하는 것을 방지
- 일관된 사용자 경험 제공 (항상 맨 위에서 시작)

**적용 서비스:** #15 바코드, #16 워터마크, #17 차트, #18 배경 제거, #19 OCR

---

### 4.2 파일 업로드 (드래그 앤 드롭)

```html
<div class="dropzone" id="dropzone">
    <p class="lang-ko">이미지를 드래그하거나 클릭하세요</p>
    <p class="lang-en">Drag & drop or click to upload</p>
    <input type="file" id="fileInput" accept="image/*" multiple hidden>
</div>
```

```javascript
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
```

### 4.3 다크모드 토글

```javascript
// 초기 로드
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

// 토글 함수
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}
```

### 4.4 언어 전환

```javascript
// 초기 로드
const savedLang = localStorage.getItem('language') || 'ko';
setLanguage(savedLang);

// 언어 설정 함수
function setLanguage(lang) {
    document.querySelectorAll('.lang-ko').forEach(el => {
        el.style.display = lang === 'ko' ? 'block' : 'none';
    });
    document.querySelectorAll('.lang-en').forEach(el => {
        el.style.display = lang === 'en' ? 'block' : 'none';
    });
    localStorage.setItem('language', lang);
}
```

### 4.5 에러 처리

```javascript
try {
    // 비동기 작업
    const result = await processFile(file);
} catch (error) {
    console.error('Error:', error);
    window.BaalUtils.showToast('처리 실패: ' + error.message, 'error', 5000);
}
```

### 4.6 로딩 인디케이터

```javascript
function showLoading() {
    document.getElementById('loading').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// 사용
showLoading();
try {
    await longRunningTask();
} finally {
    hideLoading();
}
```

### 4.7 파일 다운로드

```javascript
function download(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
```

### 4.8 ZIP 다운로드 (여러 파일)

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

## 5. 자주 발생하는 버그와 해결책

### 5.1 이미지 재업로드 시 null 에러 (OCR #19)

**문제:**
```javascript
// 첫 업로드 시 placeholder를 container로 교체
container.innerHTML = `<img src="...">`;

// 두 번째 업로드 시
placeholder.style.display = 'none';  // ❌ placeholder가 이미 제거되어 null
```

**에러 메시지:**
```
Cannot read properties of null (reading 'style')
```

**해결책:**
```javascript
reader.onload = (e) => {
    const container = document.getElementById('previewContainer');
    const placeholder = document.getElementById('placeholder');

    // ⭐ null 체크 추가
    if (placeholder) {
        placeholder.style.display = 'none';
    }

    container.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
};
```

**교훈:** DOM 요소 접근 전 항상 null 체크!

---

### 5.2 업로드 버튼 작동 안 함 (배경 제거 #18)

**문제:**
```javascript
// ES module은 defer되므로 common.js 로드 전에 실행될 수 있음
window.BaalUtils.initDropzone(...);  // ❌ BaalUtils가 아직 undefined
```

**에러 메시지:**
```
Cannot read properties of undefined (reading 'initDropzone')
```

**해결책:**
```javascript
// ⭐ DOMContentLoaded로 감싸고 존재 여부 확인
document.addEventListener('DOMContentLoaded', () => {
    if (window.BaalUtils && window.BaalUtils.initDropzone) {
        window.BaalUtils.initDropzone('dropzone', 'fileInput', handleFile, {
            accept: 'image/*',
            maxFiles: 1,
            maxSize: 10 * 1024 * 1024
        });
    }
});
```

**교훈:** ES module 사용 시 외부 라이브러리는 DOMContentLoaded 후 접근!

---

### 5.3 차트 새로고침 시 입력값 유지 (차트 #17)

**문제:**
```javascript
// 페이지 로드 시 자동으로 차트 생성
window.addEventListener('load', () => {
    generateChart();  // ❌ 브라우저가 input value를 복원한 후 빈 차트 덮어씀
});
```

**현상:** 사용자가 데이터 입력 → 차트 생성 → 새로고침 → input은 유지되는데 차트는 비어있음

**해결책:**
```javascript
// ⭐ 초기 차트 생성 제거, 사용자가 "차트 생성" 버튼 눌렀을 때만 생성
// window.addEventListener('load', generateChart); // 삭제!

document.getElementById('generateBtn').addEventListener('click', () => {
    generateChart();
});
```

**교훈:** 자동 생성 기능은 브라우저 상태 복원과 충돌 가능. 사용자 액션 트리거 방식 권장!

---

### 5.4 바코드 생성 실패 시 모호한 에러 (바코드 #15)

**문제:**
```javascript
try {
    JsBarcode("#barcode", input);
} catch (error) {
    showToast('바코드 생성 실패', 'error');  // ❌ 무엇이 잘못되었는지 모름
}
```

**사용자 불만:** "왜 안 되는지 모르겠어요"

**해결책:**
```javascript
// ⭐ 입력 검증 단계에서 상세한 메시지 제공
function validateInput(format, input) {
    if (!input || input.trim() === '') {
        return { valid: false, message: '❌ 데이터를 입력하세요.' };
    }

    if (format === 'EAN13') {
        const hasNonDigit = /[^\d]/.test(input);
        const currentLength = input.length;

        if (hasNonDigit) {
            return {
                valid: false,
                message: '❌ EAN-13 형식 오류: 숫자만 입력 가능합니다 (현재: 문자 포함)'
            };
        }

        if (currentLength < 12) {
            return {
                valid: false,
                message: `❌ EAN-13 형식 오류: 12~13자리 필요 (현재: ${currentLength}자리, ${12 - currentLength}자리 부족)`
            };
        }

        if (currentLength > 13) {
            return {
                valid: false,
                message: `❌ EAN-13 형식 오류: 최대 13자리 (현재: ${currentLength}자리, ${currentLength - 13}자리 초과)`
            };
        }
    }

    // 다른 포맷도 유사하게...

    return { valid: true };
}

// 생성 시도 전 검증
const validation = validateInput(format, input);
if (!validation.valid) {
    showToast(validation.message, 'error', 5000);
    return;
}

// try-catch에서도 상세 에러
try {
    JsBarcode("#barcode", input, { format });
} catch (error) {
    let errorMsg = '❌ 생성 실패';
    const errorText = error.message.toLowerCase();

    if (errorText.includes('invalid') || errorText.includes('not valid')) {
        errorMsg = `❌ 생성 실패: 입력값이 ${format} 형식에 맞지 않습니다`;
    } else if (errorText.includes('length')) {
        errorMsg = '❌ 생성 실패: 데이터 길이가 올바르지 않습니다';
    } else if (errorText.includes('checksum')) {
        errorMsg = '❌ 생성 실패: 체크섬 오류 (마지막 자리 검증 실패)';
    } else {
        errorMsg = `❌ 생성 실패: ${error.message}`;
    }

    showToast(errorMsg, 'error', 5000);
}
```

**교훈:** 사용자 입력 검증은 명확하고 구체적으로! "왜 안 되는지" 알려줘야 함.

---

### 5.5 워터마크 처리 후 이미지 미리보기 불편 (워터마크 #16)

**문제:** 여러 이미지 처리 후 하나씩 보려면 다운로드해야 함

**해결책:** 썸네일 팔레트 추가
```javascript
// 처리된 이미지 저장
const processedFiles = [];

function renderThumbnails() {
    if (processedFiles.length === 0) return;

    const palette = document.getElementById('thumbnailPalette');
    const grid = document.getElementById('thumbnailGrid');

    grid.innerHTML = processedFiles.map((result, index) => {
        const dataUrl = result.canvas.toDataURL('image/jpeg', 0.7);
        return `
            <div style="cursor: pointer; border: 2px solid var(--border-color); border-radius: var(--border-radius-sm); overflow: hidden;"
                 onclick="showPreview(processedFiles[${index}])"
                 onmouseover="this.style.transform='scale(1.05)'; this.style.borderColor='var(--gold-primary)'"
                 onmouseout="this.style.transform='scale(1)'; this.style.borderColor='var(--border-color)'">
                <img src="${dataUrl}" style="width: 100%; height: 120px; object-fit: cover;" alt="Thumbnail ${index + 1}">
                <div style="padding: 6px; background: var(--bg-secondary); font-size: 0.75em; text-align: center;">
                    ${result.name}
                </div>
            </div>
        `;
    }).join('');

    palette.style.display = 'block';
}

function showPreview(file) {
    // 큰 미리보기 표시
    document.getElementById('preview').src = file.canvas.toDataURL();
}
```

**교훈:** 일괄 처리 기능에는 미리보기 팔레트 필수!

---

### 5.6 아이콘 이모지 가독성 (여러 서비스)

**문제:** 숫자 이모지 `1️⃣ 2️⃣ 3️⃣`가 일부 폰트에서 깨짐

**해결책:** 의미 있는 아이콘 이모지로 교체
```
OCR:        1️⃣2️⃣3️⃣ → 🌐📤📝 (언어/업로드/텍스트)
배경 제거:   1️⃣2️⃣3️⃣ → 🖼️📤🎨 (이미지/업로드/처리)
차트:       1️⃣2️⃣3️⃣ → 📊📝🎨 (차트/데이터/스타일)
워터마크:    1️⃣2️⃣3️⃣ → 🏷️📤🖼️ (워터마크/업로드/이미지)
바코드:     1️⃣2️⃣ → 🔢📊 (입력/바코드)
```

**교훈:** 숫자 이모지 대신 기능을 나타내는 아이콘 이모지 사용!

---

### 5.7 입력 필드 placeholder vs value (차트 #17)

**문제:**
```html
<!-- value 사용 시 -->
<input type="text" value="항목 1">
```
→ 사용자가 지워야 함, 새로고침 시 복원되어 혼란

**해결책:**
```html
<!-- ⭐ placeholder 사용 -->
<input type="text" placeholder="항목명 입력" data-row="0" data-col="label">
<input type="number" placeholder="0" data-row="0" data-col="value">
```

**교훈:** 예시 데이터는 `value` 말고 `placeholder`로!

---

## 6. CDN 라이브러리 목록

### 6.1 필수

**JSZip** (일괄 다운로드)
```html
<script src="https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js"></script>
```

### 6.2 이미지 처리

**pica** (고품질 리사이즈)
```html
<script src="https://cdn.jsdelivr.net/npm/pica@9.0.1/dist/pica.min.js"></script>
```

**browser-image-compression** (이미지 압축)
```html
<script src="https://cdn.jsdelivr.net/npm/browser-image-compression@2.0.2/dist/browser-image-compression.js"></script>
```

### 6.3 PDF

**PDF.js** (PDF 뷰어/렌더링)
```html
<script src="https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js"></script>
<script>
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
</script>
```

**PDF-lib** (PDF 생성/편집)
```html
<script src="https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>
```

### 6.4 데이터 처리

**PapaParse** (CSV 파싱)
```html
<script src="https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js"></script>
```

**marked** (Markdown 렌더링)
```html
<script src="https://cdn.jsdelivr.net/npm/marked@9.1.2/marked.min.js"></script>
```

### 6.5 코드 생성

**qrcode.js** (QR 코드)
```html
<script src="https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js"></script>
```

**JsBarcode** (바코드)
```html
<script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.6/dist/JsBarcode.all.min.js"></script>
```

### 6.6 차트

**Chart.js** (차트 생성)
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
```

### 6.7 AI/ML

**TensorFlow.js** (배경 제거)
```html
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.11.0/dist/tf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/body-segmentation@1.0.2/dist/body-segmentation.min.js"></script>
```

**Tesseract.js** (OCR)
```html
<script src="https://cdn.jsdelivr.net/npm/tesseract.js@4.1.1/dist/tesseract.min.js"></script>
```

**UpscalerJS** (이미지 업스케일)
```html
<script src="https://cdn.jsdelivr.net/npm/upscaler@1.0.0-beta.19/dist/upscaler.min.js"></script>
```

---

## 7. SEO 템플릿

```html
<!-- 필수 메타 태그 -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>서비스명 - 무료 온라인 도구 | BAAL</title>
<meta name="description" content="무료 온라인 서비스명 도구. 회원가입 없이 브라우저에서 바로 사용. 빠르고 안전한 로컬 처리.">
<meta name="keywords" content="서비스명, 온라인 도구, 무료, 브라우저, 로컬 처리">

<!-- Open Graph (Facebook, KakaoTalk) -->
<meta property="og:type" content="website">
<meta property="og:title" content="서비스명 - 무료 온라인 도구 | BAAL">
<meta property="og:description" content="무료 온라인 서비스명 도구. 회원가입 없이 브라우저에서 바로 사용.">
<meta property="og:url" content="https://servicename.baal.co.kr">
<meta property="og:image" content="https://servicename.baal.co.kr/og-image.jpg">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="서비스명 - 무료 온라인 도구 | BAAL">
<meta name="twitter:description" content="무료 온라인 서비스명 도구. 회원가입 없이 브라우저에서 바로 사용.">
<meta name="twitter:image" content="https://servicename.baal.co.kr/og-image.jpg">

<!-- Favicon -->
<link rel="icon" type="image/png" href="https://baal.co.kr/favicon.png">

<!-- Canonical URL -->
<link rel="canonical" href="https://servicename.baal.co.kr">

<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 8. 배포 가이드

### 8.1 GitHub에 푸시

```bash
git add .
git commit -m "feat: initial service implementation

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
git push origin master
```

### 8.2 Cloudflare Pages 설정

1. **Cloudflare 대시보드** 접속
2. **Pages** → **Create a project**
3. **Connect to Git** → GitHub 저장소 선택
4. **Build settings:**
   - Framework preset: `None`
   - Build command: (비워둠)
   - Build output directory: `/`
5. **Environment variables:** (필요 시)
6. **Save and Deploy**

### 8.3 DNS 설정

```
Type   Name          Target
CNAME  servicename   baal-servicename.pages.dev
```

**확인:**
- https://servicename.baal.co.kr 접속
- HTTPS 자동 적용 확인 (Cloudflare SSL)

### 8.4 통합 작업

1. **baal.co.kr 그리드에 카드 추가**
```html
<a href="https://servicename.baal.co.kr" class="tool-card">
    <div class="tool-icon">🎨</div>
    <h3>서비스명</h3>
    <p>설명</p>
</a>
```

2. **diora.co.kr 관련 서비스에 링크 추가**

3. **README.md 업데이트** (완료 개수 증가)

---

## 9. 개발 체크리스트

### 프로젝트 시작
- [ ] GitHub 저장소 생성 (liveq/baal-XX-servicename)
- [ ] 로컬 폴더 생성 (`G:\hddcode\tools\XX-servicename\`)
- [ ] README.md 작성 (서비스 설명, 기능)
- [ ] .gitignore 생성

### HTML 개발
- [ ] `_common/common.css` 링크
- [ ] SEO 메타 태그 작성 (title, description, OG, Twitter)
- [ ] Google Analytics 코드 삽입
- [ ] 다크모드 토글 추가
- [ ] 언어 전환 추가 (한/영)
- [ ] Footer 추가 (저작권, 링크, 이메일)
- [ ] **페이지 로드 시 스크롤 초기화** (`window.scrollTo(0, 0)`)

### 기능 개발
- [ ] 파일 업로드 (드래그 앤 드롭)
- [ ] 파일 타입/크기 검증
- [ ] 에러 처리 (try-catch)
- [ ] 로딩 인디케이터 (3초 이상 작업)
- [ ] 다운로드 기능
- [ ] 일괄 처리 (여러 파일)
- [ ] **입력값 null 체크** (DOM 요소 접근 전)
- [ ] **상세한 에러 메시지** (사용자에게 원인 알림)

### 디자인
- [ ] 골드 그라디언트 버튼
- [ ] 카드 스타일 (--shadow-md)
- [ ] 입력 필드 스타일 (--border-color)
- [ ] 다크모드 CSS 변수 활용
- [ ] **버튼 정렬 확인** (lang-toggle 50px 원형)
- [ ] **아이콘 이모지** (숫자 이모지 대신 의미 있는 이모지)
- [ ] **placeholder 사용** (예시 데이터는 value 말고)

### 테스트
- [ ] 크롬 데스크톱 테스트
- [ ] 다크모드 전환 테스트
- [ ] 언어 전환 테스트
- [ ] 모바일 반응형 테스트 (개발자도구)
- [ ] 에러 케이스 테스트 (잘못된 파일, 큰 파일)
- [ ] 여러 파일 업로드 테스트
- [ ] **재업로드 테스트** (null 에러 체크)
- [ ] **새로고침 테스트** (스크롤 위치, 입력값 확인)

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
- [ ] 모든 기능 재확인

### 통합 작업
- [ ] baal.co.kr 그리드에 카드 추가
- [ ] baal.co.kr 사이드바에 링크 추가
- [ ] diora.co.kr 관련서비스에 추가
- [ ] README.md 업데이트 (완료 개수)

---

## 10. Phase별 교훈

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
- **스크롤 초기화 패턴 확립**
- **상세한 에러 메시지 도입**
- **썸네일 팔레트 패턴 도입**

❌ **개선 필요:**
- AI 모델 로딩 시간 긴 문제 (해결: 스피드 모드)
- 모바일에서 메모리 부족 이슈
- **버튼 정렬 문제** (해결: flexbox + 50px 원형)
- **null 참조 에러** (해결: null 체크 필수화)
- **DOMContentLoaded 타이밍 이슈** (해결: 이벤트 리스너 추가)

### Phase 3 마무리 작업

✅ **개선 사항:**
- baal.co.kr 버튼 텍스트 통일: "사용하기 →"
- diora.co.kr 버튼 수평 정렬: flexbox 적용
- README.md 통합 개발 가이드 추가
- **공용 메뉴얼 (DEV-GUIDE.md) 작성**
- **버그 재발 방지 프롬프트 정리**

---

## 개발 팁

1. **공통 CSS 100% 활용** - 중복 제거
2. **CDN 사용** - 로딩 속도 빠르고 캐싱 효과
3. **CSS 변수** - 다크모드 구현 쉬움
4. **로컬 스토리지** - 사용자 설정 저장 (테마, 언어)
5. **try-catch 필수** - 모든 비동기 작업에
6. **로딩 인디케이터 필수** - 3초 이상 작업
7. **모바일 우선** - 모바일 사용자 50% 이상
8. **SEO 필수** - 트래픽의 70%가 검색 유입
9. **null 체크 습관화** - DOM 요소 접근 전 항상
10. **에러 메시지 구체화** - "왜 안 되는지" 알려주기

---

**이 가이드를 따르면 버그 없이 일관된 품질의 서비스를 빠르게 개발할 수 있습니다.**

**최종 업데이트:** 2025-10-26
**작성자:** BAAL Team
**기여:** Claude Code
