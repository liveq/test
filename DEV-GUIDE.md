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

### 4.9 PDF 페이지 네비게이션 (OCR #19)

**기능:** PDF 업로드 시 전체 페이지를 썸네일로 표시하고, 이전/다음 페이지 네비게이션, 개별/전체 다운로드 지원

```javascript
// PDF 전체 페이지를 JPEG로 변환하여 저장
let pdfPages = [];  // { pageNum, dataUrl, canvas, blob }
let currentPageIndex = 0;

async function loadAllPDFPages(file) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const totalPages = pdf.numPages;

    pdfPages = [];

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 2 }); // 고해상도

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d', { willReadFrequently: true });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport: viewport }).promise;

        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.95));
        const dataUrl = canvas.toDataURL('image/jpeg', 0.95);

        pdfPages.push({ pageNum, dataUrl, canvas, blob });
    }

    // 네비게이션 표시
    showPDFNavigation();
    showPDFPage(0);
}

// 특정 페이지 표시
function showPDFPage(pageIndex) {
    if (pageIndex < 0 || pageIndex >= pdfPages.length) return;

    currentPageIndex = pageIndex;
    const page = pdfPages[pageIndex];

    // 미리보기 이미지 교체
    document.getElementById('previewContainer').innerHTML =
        `<img src="${page.dataUrl}" alt="Page ${page.pageNum}">`;

    // 네비게이션 업데이트
    updatePDFNavigation();
}
```

### 4.10 조건부 레이아웃 정렬 (OCR #19)

**기능:** 아이템 개수에 따라 자동으로 중앙 정렬 / 왼쪽 정렬 전환

```javascript
// 썸네일이 적으면 중앙 정렬, 많으면 스크롤
function updateThumbnails() {
    const thumbnailList = document.getElementById('thumbnailList');
    const shouldCenterAlign = pdfPages.length <= 5;

    // 조건부 정렬
    if (shouldCenterAlign) {
        thumbnailList.style.justifyContent = 'center';
    } else {
        thumbnailList.style.justifyContent = 'flex-start';
    }

    // 썸네일 생성
    pdfPages.forEach((page, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.setAttribute('data-page-index', index);
        thumbnail.innerHTML = `<img src="${page.dataUrl}">`;
        thumbnailList.appendChild(thumbnail);
    });

    // 많을 때만 선택된 항목 자동 스크롤
    if (!shouldCenterAlign) {
        scrollThumbnailToCenter(currentPageIndex);
    }
}
```

### 4.11 선택된 항목 자동 중앙 스크롤 (OCR #19)

**기능:** 사용자가 썸네일 클릭 시 해당 항목이 화면 중앙에 오도록 스크롤

```javascript
function scrollThumbnailToCenter(pageIndex) {
    const thumbnailList = document.getElementById('thumbnailList');
    const thumbnail = thumbnailList.querySelector(`[data-page-index="${pageIndex}"]`);

    if (thumbnail && thumbnailList) {
        // 썸네일의 위치 계산
        const thumbnailLeft = thumbnail.offsetLeft;
        const thumbnailWidth = thumbnail.offsetWidth;
        const listWidth = thumbnailList.offsetWidth;

        // 중앙으로 스크롤할 위치 계산
        const scrollPosition = thumbnailLeft - (listWidth / 2) + (thumbnailWidth / 2);

        thumbnailList.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
}
```

**CSS:**
```css
#thumbnailList {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    scroll-behavior: smooth;  /* ⭐ 부드러운 스크롤 */
}
```

### 4.12 관련 콘텐츠 자동 스크롤 (OCR #19)

**기능:** 썸네일 클릭 시 해당 페이지의 추출된 텍스트로 자동 스크롤 + 하이라이트

```javascript
function scrollToPageText(pageIndex) {
    const resultText = document.getElementById('resultText');
    if (!resultText || !resultText.value) return;

    const pageNum = pageIndex + 1;
    const pageMarker = `=== 페이지 ${pageNum} ===`;
    const textValue = resultText.value;
    const markerIndex = textValue.indexOf(pageMarker);

    if (markerIndex !== -1) {
        // textarea에서 해당 위치로 스크롤
        const beforeText = textValue.substring(0, markerIndex);
        const lineNumber = beforeText.split('\n').length;
        const lineHeight = 20;
        const scrollPosition = (lineNumber - 1) * lineHeight;

        resultText.scrollTop = scrollPosition;

        // 1초간 하이라이트 효과
        const endIndex = textValue.indexOf('\n\n', markerIndex);
        if (endIndex !== -1) {
            resultText.setSelectionRange(markerIndex, endIndex);
            setTimeout(() => {
                resultText.setSelectionRange(markerIndex, markerIndex);
            }, 1000);
        }
    }
}

// 페이지 변경 시 호출
function showPDFPage(pageIndex) {
    // ... 페이지 표시 로직 ...

    // 추출된 텍스트로 스크롤
    scrollToPageText(pageIndex);
}
```

### 4.13 개인정보처리방침 모달 (Footer) ⚠️

**기능:** 푸터의 "개인정보처리방침" 링크 클릭 시 baal.co.kr 스타일 모달 표시

**⚠️ 중요: ES6 Module Script 스코프 문제**

**문제:** 푸터의 "개인정보처리방침" 링크 클릭 시 모달이 열리지 않음

**콘솔 에러:**
```
Uncaught ReferenceError: openPrivacyModal is not defined
    at HTMLAnchorElement.onclick ((index):603:155)
```

**원인:**
1. ES6 module은 **독립적인 스코프**를 가짐
2. module 내부의 함수/변수는 **전역 스코프에 노출되지 않음**
3. inline onclick 핸들러는 **전역 스코프**에서 함수를 찾음
4. 결과: `ReferenceError: openPrivacyModal is not defined`

#### 해결책 1: ES6 Module 환경 (18-bg, 17-chart 등)

**✅ 올바른 방법:**
```javascript
// <script type="module"> 내부
// window 객체에 명시적으로 할당
window.openPrivacyModal = function() {
    document.getElementById('privacyModal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

window.closePrivacyModal = function() {
    document.getElementById('privacyModal').classList.remove('show');
    document.body.style.overflow = '';
}

// ESC 키로 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        window.closePrivacyModal();
    }
});
```

#### 해결책 2: 일반 Script 환경 (19-ocr, 20-upscale, common.js 사용)

**✅ 일반 함수 선언:**
```javascript
// 일반 <script> 태그 또는 외부 JS 파일
function openPrivacyModal() {
    document.getElementById('privacyModal').classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closePrivacyModal() {
    document.getElementById('privacyModal').classList.remove('show');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closePrivacyModal();
    }
});
```

#### HTML 구조

```html
<!-- Footer -->
<footer>
    <div class="footer-content">
        <p class="footer-brand">
            Made by <a href="https://baal.co.kr" target="_blank">BAAL</a>
        </p>
        <p class="footer-contact">
            <a href="mailto:summon@baal.co.kr">summon@baal.co.kr</a>
        </p>
        <p class="footer-links">
            <a href="#" onclick="event.preventDefault(); openPrivacyModal();" data-ko="개인정보처리방침" data-en="Privacy Policy">개인정보처리방침</a>
        </p>
        <p class="footer-copyright">&copy; 2025 BAAL. All rights reserved.</p>
    </div>
</footer>

<!-- Privacy Modal -->
<div id="privacyModal" class="modal" onclick="if(event.target.id==='privacyModal') closePrivacyModal()">
    <div class="modal-content">
        <button class="modal-close" onclick="closePrivacyModal()">&times;</button>
        <h1 class="modal-title">개인정보처리방침</h1>

        <div class="privacy-content">
            <h3>1. 개인정보의 처리 목적</h3>
            <p>BAAL(이하 "회사")은 사용자가 브라우저에서 직접 파일을 처리하는 무료 온라인 도구를 제공합니다. 회사는 <strong>어떠한 개인정보도 수집하지 않습니다.</strong></p>

            <h3>2. 처리하는 개인정보 항목</h3>
            <p><strong>없음</strong> - 모든 파일 처리는 사용자의 브라우저 내에서만 이루어지며, 서버로 전송되지 않습니다.</p>

            <h3>3. 개인정보의 처리 및 보유기간</h3>
            <p>회사는 개인정보를 수집하지 않으므로 보유하지 않습니다.</p>

            <h3>4. 쿠키(Cookie) 사용</h3>
            <p>본 웹사이트는 Google AdSense 광고 서비스를 사용합니다. Google은 사용자의 관심사에 맞는 광고를 제공하기 위해 쿠키를 사용할 수 있습니다.</p>
            <ul>
                <li>Google의 광고 쿠키 정책: <a href="https://policies.google.com/technologies/ads" target="_blank">링크</a></li>
                <li>쿠키 설정은 브라우저에서 관리하실 수 있습니다.</li>
            </ul>

            <h3>5. 개인정보 보호책임자</h3>
            <p>
                이메일: <a href="mailto:summon@baal.co.kr">summon@baal.co.kr</a><br>
                사용자는 회사의 서비스를 이용하며 발생한 모든 개인정보 보호 관련 문의를 위 연락처로 하실 수 있습니다.
            </p>

            <h3>6. 개인정보처리방침 변경</h3>
            <p>본 개인정보처리방침은 법령, 정책 또는 보안기술의 변경에 따라 내용이 추가, 삭제 및 수정될 수 있으며, 변경 시 웹사이트를 통해 공지합니다.</p>

            <p style="margin-top: 30px; text-align: center; color: #7f8c8d; font-size: 0.9em;">
                시행일자: 2025년 1월 24일
            </p>
        </div>
    </div>
</div>
```

#### CSS (baal.co.kr 스타일)

**필수 폰트:**
```html
<!-- Playfair Display 폰트 (필수) -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
```

**Modal CSS:**
```css
/* Privacy Modal Styles (from baal.co.kr) */
.modal {
    display: none;
    position: fixed;
    z-index: 2000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(10px);
}

.modal.show {
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: rgba(255,255,255,0.95);
    padding: 50px 40px;
    border-radius: 20px;
    max-width: 700px;
    width: 90%;
    position: relative;
    text-align: center;
    word-break: keep-all;
}

.modal-close {
    position: absolute;
    top: 20px;
    right: 25px;
    font-size: 32px;
    color: #9ca3af;
    background: none;
    border: none;
    cursor: pointer;
    transition: color 0.2s;
}

.modal-close:hover {
    color: var(--gold-primary);
}

.modal-title {
    font-family: 'Playfair Display', serif;
    font-size: 2em;
    margin-bottom: 25px;
    background: linear-gradient(-45deg, #d4af37, #ffd700, #b8860b);
    background-size: 300% 300%;
    animation: modalGradientFlow 4s ease-in-out infinite;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    word-break: keep-all;
}

@keyframes modalGradientFlow {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
}

.privacy-content {
    text-align: left;
    color: #4a4a4a;
    line-height: 1.8;
    max-height: 60vh;
    overflow-y: auto;
    padding: 20px;
}

.privacy-content h3 {
    color: #2c3e50;
    margin-top: 20px;
    font-size: 1.1em;
}

.privacy-content h3:first-of-type {
    margin-top: 0;
}

.privacy-content p {
    margin-bottom: 15px;
}

.privacy-content ul {
    margin-left: 20px;
    margin-bottom: 15px;
}

.privacy-content a {
    color: var(--gold-primary);
    text-decoration: none;
    font-weight: 600;
}

.privacy-content a:hover {
    text-decoration: underline;
}

.privacy-content strong {
    color: #2c3e50;
    font-weight: 700;
}
```

#### 디버깅 방법

**콘솔에서 확인:**
```javascript
// 브라우저 콘솔에서 테스트
window.openPrivacyModal  // undefined면 스코프 문제
```

**환경별 확인:**
| 환경 | 확인 방법 | 올바른 결과 |
|------|---------|-----------|
| ES6 module | `window.openPrivacyModal` | `function` |
| 일반 script | `openPrivacyModal` | `function` |
| 일반 script | `window.openPrivacyModal` | `function` |

#### 체크리스트

새 서비스에 Privacy Modal 추가 시:

- [ ] Playfair Display 폰트 링크 추가 (`<head>`에 삽입)
- [ ] Modal CSS 추가 (`.modal`, `.modal-title` 등)
- [ ] Modal HTML 추가 (Footer 다음에 삽입)
- [ ] JavaScript 함수 추가:
  - ES6 module: `window.openPrivacyModal = function() { ... }`
  - 일반 script: `function openPrivacyModal() { ... }`
- [ ] Footer 링크 수정:
  - 이메일: `baal.contract@gmail.com` → `summon@baal.co.kr`
  - "이용약관" 링크 제거
  - "개인정보처리방침" → 모달로 변경
- [ ] 테스트:
  - [ ] 모달 열기 (클릭)
  - [ ] ESC 키로 닫기
  - [ ] 외부 클릭으로 닫기
  - [ ] X 버튼으로 닫기

**적용 서비스:**
- ✅ #17 차트 (17-chart) - commit 9a608ce
- ✅ #18 배경 제거 (18-bg) - commit 471307c
- ✅ #19 OCR (19-ocr) - commit aecb66c
- ✅ #20 업스케일 (20-upscale) - commit 4c2601e
- 🔄 #04~#16 (13개 서비스) - 예정

---

### 4.14 Service Worker vs Web Worker (OCR #19)

**문제:** Tesseract.js 같은 라이브러리는 Service Worker 환경에서 "Worker is not defined" 에러 발생

**이유:** Service Worker 컨텍스트에서는 Web Worker를 생성할 수 없음

**해결책: Web Worker 사용**
```javascript
// Web Worker 초기화
let ocrWorker = new Worker('ocr-worker.js');

ocrWorker.addEventListener('message', (event) => {
    const { type, data } = event.data;

    switch (type) {
        case 'OCR_PROGRESS':
            updateProgress(data);
            break;
        case 'COMPLETE':
            handleComplete(data);
            break;
        case 'ERROR':
            handleError(data.error);
            break;
    }
});

// Worker에 작업 전송
function processImage(file) {
    return new Promise((resolve, reject) => {
        const handleMessage = (event) => {
            if (event.data.type === 'COMPLETE') {
                ocrWorker.removeEventListener('message', handleMessage);
                resolve(event.data.text);
            }
        };

        ocrWorker.addEventListener('message', handleMessage);
        ocrWorker.postMessage({
            type: 'PROCESS_IMAGE',
            data: { imageData: file.arrayBuffer, language: 'kor+eng' }
        });
    });
}
```

**ocr-worker.js:**
```javascript
importScripts('https://cdn.jsdelivr.net/npm/tesseract.js@5');

self.addEventListener('message', async (event) => {
    const { type, data } = event.data;

    if (type === 'PROCESS_IMAGE') {
        const blob = new Blob([data.imageData], { type: 'image/jpeg' });

        const { data: result } = await Tesseract.recognize(
            blob,
            data.language,
            {
                logger: (m) => {
                    if (m.status === 'recognizing text') {
                        self.postMessage({
                            type: 'OCR_PROGRESS',
                            data: { progress: Math.round(m.progress * 100) }
                        });
                    }
                }
            }
        );

        self.postMessage({
            type: 'COMPLETE',
            data: { text: result.text }
        });
    }
});
```

**Service Worker 정리:**
```javascript
// 기존 Service Worker 언레지스터 (Web Worker 전환 시)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => {
            registration.unregister();
            console.log('[Cleanup] Service Worker unregistered');
        });
    });
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

## 11. 모듈 Import 문제 해결 (배경 제거 #18)

### 11.1 CDN별 특성과 해결책

**문제 상황:**
```javascript
import { removeBackground } from 'https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.4.5/dist/index.mjs';
// ❌ Uncaught TypeError: Failed to resolve module specifier "ndarray"
```

**원인:**
- 라이브러리 내부에서 `import ndarray from 'ndarray'` 같은 bare module specifier 사용
- jsdelivr는 의존성을 번들링하지 않고 원본 그대로 제공
- 브라우저는 bare module specifier를 해석할 수 없음

### 11.2 해결책 1: esm.sh 사용 (권장 ⭐)

**가장 간단하고 효과적인 방법:**

```javascript
// ✅ esm.sh가 자동으로 의존성 해결
import { removeBackground } from 'https://esm.sh/@imgly/background-removal@1.4.5';
```

**esm.sh의 장점:**
- 모든 의존성을 자동으로 번들링
- bare module specifier → 실제 URL로 변환
- TypeScript 지원
- import map 불필요

**적용 예시 (배경 제거 #18):**
```html
<script type="module">
    // jsdelivr 대신 esm.sh 사용
    import { removeBackground } from 'https://esm.sh/@imgly/background-removal@1.4.5';

    // 바로 사용 가능
    const blob = await removeBackground(imageFile);
</script>
```

### 11.3 해결책 2: Import Map 사용 (복잡함 ⚠️)

**모든 의존성을 수동으로 매핑:**

```html
<script type="importmap">
{
    "imports": {
        "@imgly/background-removal": "https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.4.5/dist/index.mjs",
        "ndarray": "https://esm.sh/ndarray@1.0.19",
        "ndarray-ops": "https://esm.sh/ndarray-ops@1.2.2",
        "ndarray-pack": "https://esm.sh/ndarray-pack@1.2.1",
        "jpeg-js": "https://esm.sh/jpeg-js@0.4.4",
        "pngjs": "https://esm.sh/pngjs@7.0.0"
        // ... 수십 개의 의존성 계속
    }
}
</script>
```

**단점:**
- 의존성을 직접 찾아야 함 (시간 낭비)
- 버전 관리 어려움
- 의존성의 의존성도 추가해야 함 (재귀적)

### 11.4 CDN 비교표

| CDN | 의존성 자동 해결 | 속도 | TypeScript | 추천 |
|-----|---------------|------|-----------|------|
| **esm.sh** | ✅ 자동 | 빠름 | ✅ | ⭐⭐⭐⭐⭐ |
| **unpkg** | ⚠️ 부분 | 빠름 | ❌ | ⭐⭐⭐ |
| **skypack** | ✅ 자동 | 보통 | ✅ | ⭐⭐⭐⭐ |
| **jsdelivr** | ❌ 수동 | 매우 빠름 | ❌ | ⭐⭐ |
| **cdnjs** | ❌ 수동 | 빠름 | ❌ | ⭐ |

### 11.5 CDN 선택 기준

#### 1순위: esm.sh
```javascript
// 복잡한 의존성이 있는 NPM 패키지
import { removeBackground } from 'https://esm.sh/@imgly/background-removal@1.4.5';
import { Document } from 'https://esm.sh/docx@8.5.0';
```

**사용 시기:**
- NPM 패키지를 브라우저에서 사용할 때
- 의존성이 많은 라이브러리
- TypeScript 라이브러리

#### 2순위: jsdelivr
```html
<!-- 단순한 UMD/IIFE 라이브러리 -->
<script src="https://cdn.jsdelivr.net/npm/tesseract.js@5"></script>
<script src="https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.min.js"></script>
```

**사용 시기:**
- 전역 변수로 제공되는 라이브러리
- 의존성이 없는 단순 라이브러리
- CDN 속도가 중요할 때

### 11.6 실전 예제: 배경 제거 기능

**Before (작동 안 함):**
```javascript
import { removeBackground } from 'https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.4.5/dist/index.mjs';
// ❌ ndarray 모듈을 찾을 수 없음
```

**After (작동함):**
```javascript
import { removeBackground } from 'https://esm.sh/@imgly/background-removal@1.4.5';
// ✅ 모든 의존성 자동 해결

const blob = await removeBackground(imageFile, {
    progress: (key, current, total) => {
        console.log(`${key}: ${Math.round((current/total)*100)}%`);
    }
});
```

### 11.7 트러블슈팅 체크리스트

Import 에러가 발생하면 다음 순서로 시도:

1. **esm.sh로 변경** (90% 해결)
   ```javascript
   // jsdelivr → esm.sh
   import { pkg } from 'https://esm.sh/package-name@version';
   ```

2. **unpkg로 시도**
   ```javascript
   import { pkg } from 'https://unpkg.com/package-name@version?module';
   ```

3. **skypack으로 시도**
   ```javascript
   import { pkg } from 'https://cdn.skypack.dev/package-name@version';
   ```

4. **번들러 사용** (Vite, esbuild)
   ```bash
   npm install package-name
   npx vite build
   ```

### 11.8 교훈

> **"공식 문서대로"보다 "작동하는 게 먼저"**

- CDN URL 한 줄 바꾸는 게 import map 수십 줄보다 빠름
- 의존성 문제는 esm.sh가 90% 해결
- jsdelivr는 속도는 빠르지만 모듈 시스템엔 부적합

**시간 절약:**
- Import map 수정: 몇 시간 소요
- esm.sh 변경: 1분 소요

---

## 12. 실시간 미리보기 패턴 (배경 제거 #18)

### 12.1 Canvas를 이용한 배경색 실시간 적용

**문제:**
- 사용자가 배경색을 선택할 때마다 다운로드해서 확인하는 건 불편함
- 배경색을 바꿀 때마다 즉시 미리보기에 반영되어야 함

**해결책:**

```javascript
// 배경색 버튼 클릭 시 실시간 미리보기 업데이트
document.querySelectorAll('.bg-color-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        const selectedColor = btn.dataset.color;

        // 활성화 상태 변경
        document.querySelectorAll('.bg-color-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // 처리 완료된 이미지가 있으면 미리보기 업데이트
        if (currentImage && currentImage.resultBlob) {
            await updatePreviewWithBackground(currentImage.resultBlob, selectedColor);
        }
    });
});

// 배경색이 적용된 미리보기 업데이트
async function updatePreviewWithBackground(resultBlob, bgColor) {
    const resultOverlay = document.getElementById('resultOverlay');
    if (!resultOverlay) return;

    let previewUrl;

    if (bgColor === 'transparent') {
        // 투명 배경: 원본 결과 이미지 사용
        previewUrl = URL.createObjectURL(resultBlob);
    } else {
        // 배경색 적용: Canvas로 합성
        const img = new Image();
        img.src = URL.createObjectURL(resultBlob);
        await img.decode();

        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');

        // 배경색 채우기
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 투명 이미지 위에 그리기
        ctx.drawImage(img, 0, 0);

        // Blob으로 변환
        const blob = await new Promise((resolve) => {
            canvas.toBlob(resolve, 'image/png');
        });

        previewUrl = URL.createObjectURL(blob);
        URL.revokeObjectURL(img.src);
    }

    // 미리보기 이미지 업데이트
    const resultImg = resultOverlay.querySelector('img');
    if (resultImg) {
        const oldSrc = resultImg.src;
        resultImg.src = previewUrl;

        // 이전 URL 정리 (메모리 누수 방지)
        if (oldSrc && oldSrc.startsWith('blob:')) {
            setTimeout(() => URL.revokeObjectURL(oldSrc), 100);
        }
    }
}
```

**핵심 포인트:**
1. **Canvas 사용**: 배경색과 투명 이미지 합성
2. **Blob URL 관리**: 이전 URL은 revokeObjectURL로 정리
3. **비동기 처리**: img.decode()로 이미지 로드 완료 대기
4. **조건부 처리**: 투명 배경은 원본 사용, 색상 배경은 합성

### 12.2 커스텀 색상 팔레트 버튼

**HTML:**
```html
<div class="bg-color-options">
    <button class="bg-color-btn transparent active" data-color="transparent" title="투명"></button>
    <button class="bg-color-btn" data-color="#ffffff" style="background: #ffffff;" title="흰색"></button>
    <button class="bg-color-btn" data-color="#000000" style="background: #000000;" title="검정"></button>
    <button class="bg-color-btn" data-color="#d4af37" style="background: #d4af37;" title="골드"></button>

    <!-- 커스텀 색상 선택 버튼 -->
    <button class="bg-color-btn custom-color-btn" id="customColorBtn" title="색상 선택">
        <span style="font-size: 24px; font-weight: bold;">+</span>
        <input type="color" id="customColorPicker" style="position: absolute; opacity: 0; pointer-events: none;">
    </button>
</div>
```

**CSS:**
```css
/* 커스텀 색상 버튼 - 무지개 그라디언트 */
.bg-color-btn.custom-color-btn {
    background: linear-gradient(135deg,
        #ff0000 0%, #ff7f00 16.66%, #ffff00 33.33%,
        #00ff00 50%, #0000ff 66.66%, #8b00ff 83.33%, #ff0000 100%);
    display: flex;
    align-items: center;
    justify-content: center;
}

/* + 기호 스타일 (흰색 + 검정 테두리) */
.bg-color-btn.custom-color-btn span {
    color: white;
    text-shadow:
        -1px -1px 0 #000,
        1px -1px 0 #000,
        -1px 1px 0 #000,
        1px 1px 0 #000,
        0 0 5px rgba(0, 0, 0, 0.5);
}
```

**JavaScript:**
```javascript
// 커스텀 색상 선택
const customColorBtn = document.getElementById('customColorBtn');
const customColorPicker = document.getElementById('customColorPicker');

// + 버튼 클릭 시 색상 팔레트 열기
customColorBtn.addEventListener('click', () => {
    customColorPicker.click();
});

// 색상 선택 시
customColorPicker.addEventListener('change', async (e) => {
    const customColor = e.target.value;

    // 선택한 색상을 버튼에 적용
    customColorBtn.style.background = customColor;

    // 활성화 상태로 변경
    selectedBgColor = customColor;
    document.querySelectorAll('.bg-color-btn').forEach(b => b.classList.remove('active'));
    customColorBtn.classList.add('active');

    // 실시간 미리보기 업데이트
    const currentImg = uploadedImages[currentImageIndex];
    if (currentImg && currentImg.resultBlob) {
        await updatePreviewWithBackground(currentImg.resultBlob, customColor);
    }
});
```

**동작 방식:**
1. `+` 버튼 클릭 → 숨겨진 `<input type="color">` 클릭
2. 브라우저 색상 팔레트 열림
3. 색상 선택 → `+` 버튼 배경이 선택한 색으로 변경
4. 미리보기에 즉시 반영

**장점:**
- 사용자가 원하는 임의의 색상 선택 가능
- 브라우저 기본 색상 팔레트 활용 (크로스 브라우저 지원)
- 선택한 색상을 버튼에 표시해서 직관적

### 12.3 메모리 관리 패턴

**Blob URL 누수 방지:**

```javascript
// ❌ 나쁜 예: Blob URL이 계속 쌓임
resultImg.src = URL.createObjectURL(blob);

// ✅ 좋은 예: 이전 URL 정리
const oldSrc = resultImg.src;
resultImg.src = URL.createObjectURL(blob);

if (oldSrc && oldSrc.startsWith('blob:')) {
    setTimeout(() => URL.revokeObjectURL(oldSrc), 100);
}
```

**사용 후 즉시 정리:**

```javascript
// 임시 이미지 로드
const img = new Image();
img.src = URL.createObjectURL(blob);
await img.decode();

// Canvas 작업
const canvas = document.createElement('canvas');
// ... 작업 ...

// 사용 완료 후 정리
URL.revokeObjectURL(img.src);
```

---

**이 가이드를 따르면 버그 없이 일관된 품질의 서비스를 빠르게 개발할 수 있습니다.**

**최종 업데이트:** 2025-10-27
**작성자:** BAAL Team
**기여:** Claude Code
