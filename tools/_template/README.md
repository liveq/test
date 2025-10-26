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

### 🚨 Google AdSense 필수 요구사항 (2025-01-27)

Google AdSense 정책 준수를 위해 **모든 서비스 푸터에 반드시 포함**해야 하는 요소:

#### 1️⃣ 개인정보처리방침 (Privacy Policy)
#### 2️⃣ 이용약관 (Terms of Service)

**구현 방법**: 외부 페이지 링크 대신 **모달(팝업) 방식** 사용
- ✅ 404 에러 방지
- ✅ 페이지 이탈 방지
- ✅ 모든 서비스에서 동일한 내용 제공

---

### 푸터 표준 구조 (모든 서비스 필수)

```html
<footer>
    <div class="footer-content">
        <p class="footer-brand">
            Made by <a href="https://baal.co.kr" target="_blank">BAAL</a> |
            <a href="https://baal.co.kr" target="_blank" data-ko="더 많은 도구" data-en="More Tools">더 많은 도구</a>
        </p>
        <p class="footer-contact">
            <a href="mailto:baal.contract@gmail.com">baal.contract@gmail.com</a>
        </p>
        <p class="footer-links">
            <a href="#" onclick="openPrivacyModal(); return false;" data-ko="개인정보처리방침" data-en="Privacy Policy">개인정보처리방침</a>
            <span class="separator">|</span>
            <a href="#" onclick="openTermsModal(); return false;" data-ko="이용약관" data-en="Terms of Service">이용약관</a>
        </p>
        <p class="footer-copyright">&copy; 2025 BAAL. All rights reserved.</p>
    </div>
</footer>

<!-- 개인정보처리방침 모달 -->
<div id="privacyModal" class="modal">
    <div class="modal-content">
        <span class="modal-close" onclick="closePrivacyModal()">&times;</span>
        <h2 data-ko="개인정보처리방침" data-en="Privacy Policy">개인정보처리방침</h2>
        <div class="modal-body">
            <p data-ko="BAAL의 모든 도구는 개인정보를 수집하지 않습니다." data-en="BAAL tools do not collect any personal information.">
                BAAL의 모든 도구는 개인정보를 수집하지 않습니다.
            </p>
            <p data-ko="모든 파일 처리는 사용자의 브라우저에서 로컬로 수행되며, 서버로 전송되지 않습니다." data-en="All file processing is done locally in your browser and nothing is sent to our servers.">
                모든 파일 처리는 사용자의 브라우저에서 로컬로 수행되며, 서버로 전송되지 않습니다.
            </p>
            <h3 data-ko="개인정보 보호책임자" data-en="Privacy Officer">개인정보 보호책임자</h3>
            <p>
                <strong data-ko="이메일" data-en="Email">이메일</strong>: baal.contract@gmail.com
            </p>
        </div>
    </div>
</div>

<!-- 이용약관 모달 -->
<div id="termsModal" class="modal">
    <div class="modal-content">
        <span class="modal-close" onclick="closeTermsModal()">&times;</span>
        <h2 data-ko="이용약관" data-en="Terms of Service">이용약관</h2>
        <div class="modal-body">
            <h3 data-ko="1. 서비스 이용" data-en="1. Service Usage">1. 서비스 이용</h3>
            <p data-ko="BAAL의 도구는 무료로 제공되며, 모든 처리는 클라이언트 측에서 수행됩니다." data-en="BAAL tools are provided free of charge. All processing is done client-side.">
                BAAL의 도구는 무료로 제공되며, 모든 처리는 클라이언트 측에서 수행됩니다.
            </p>
            <h3 data-ko="2. 면책 조항" data-en="2. Disclaimer">2. 면책 조항</h3>
            <p data-ko="서비스는 '있는 그대로' 제공되며, 정확성이나 완전성을 보장하지 않습니다." data-en="The service is provided 'as is' without any warranties of accuracy or completeness.">
                서비스는 '있는 그대로' 제공되며, 정확성이나 완전성을 보장하지 않습니다.
            </p>
            <h3 data-ko="3. 광고" data-en="3. Advertising">3. 광고</h3>
            <p data-ko="본 서비스는 Google AdSense를 통한 광고를 포함할 수 있습니다." data-en="This service may include advertising via Google AdSense.">
                본 서비스는 Google AdSense를 통한 광고를 포함할 수 있습니다.
            </p>
        </div>
    </div>
</div>
</div>
```

---

### 모달 스타일 (common.css에 이미 포함)

```css
/* 모달 스타일 */
.modal {
    display: none;
    position: fixed;
    z-index: 10001;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: var(--bg-primary);
    padding: 30px;
    border-radius: var(--border-radius-lg);
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.modal-close {
    position: absolute;
    right: 20px;
    top: 20px;
    font-size: 28px;
    font-weight: bold;
    color: var(--text-secondary);
    cursor: pointer;
    transition: color 0.2s;
}

.modal-close:hover {
    color: var(--gold-primary);
}
```

---

### 모달 기능 (common.js에 이미 포함)

```javascript
// 개인정보처리방침 모달
const openPrivacyModal = () => {
    const modal = document.getElementById('privacyModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
};

const closePrivacyModal = () => {
    const modal = document.getElementById('privacyModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

// 이용약관 모달
const openTermsModal = () => {
    const modal = document.getElementById('termsModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
};

const closeTermsModal = () => {
    const modal = document.getElementById('termsModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

// 모달 외부 클릭 시 닫기
window.addEventListener('click', (e) => {
    const privacyModal = document.getElementById('privacyModal');
    const termsModal = document.getElementById('termsModal');

    if (e.target === privacyModal) {
        closePrivacyModal();
    }
    if (e.target === termsModal) {
        closeTermsModal();
    }
});

// 전역 함수로 노출
window.openPrivacyModal = openPrivacyModal;
window.closePrivacyModal = closePrivacyModal;
window.openTermsModal = openTermsModal;
window.closeTermsModal = closeTermsModal;
```

---

### ⚠️ 주의사항

1. **외부 링크 사용 금지**
   - ❌ `<a href="https://baal.co.kr/privacy">`
   - ✅ `<a href="#" onclick="openPrivacyModal(); return false;">`

2. **푸터 위치**
   - `</main>` 태그 다음, `</div>` (container 닫기) 전
   - 모달은 container div 닫기 전에 배치

3. **필수 요소**
   - ✅ "Made by BAAL | 더 많은 도구"
   - ✅ baal.contract@gmail.com
   - ✅ 개인정보처리방침 모달
   - ✅ 이용약관 모달
   - ✅ Copyright 표시

4. **자동 배포**
   - `_common/common.css` 업데이트 시 모든 서비스에 자동 반영
   - `_common/common.js` 업데이트 시 모든 서비스에 자동 반영

---

### 🎯 AdSense 승인 체크리스트

- [ ] 모든 서비스에 AdSense 코드 포함
- [ ] 모든 서비스에 표준 푸터 적용
- [ ] 개인정보처리방침 모달 작동 확인
- [ ] 이용약관 모달 작동 확인
- [ ] 404 에러 없음 확인
- [ ] 한/영 전환 시 모달 내용도 전환되는지 확인

---

## 🚨 Phase 4 치명적 실패 사례 (2025-01-27) - 필독!

### 사건 개요: 푸터 일괄 업데이트 실패

**목적**: Google AdSense 정책 준수를 위해 모든 도구(16개)에 개인정보처리방침/이용약관 모달 추가

**실패 원인**: Python 스크립트로 자동화했으나 **테스트 없이 16개 도구에 일괄 배포**

**결과**:
- ❌ 모달 내용이 페이지에 그대로 노출 (display:none 안됨)
- ❌ HTML 코드가 텍스트로 페이지에 렌더링됨
- ❌ "더 많은 도구" 텍스트가 푸터에 중복 표시
- ❌ 16개 도구 모두 페이지 레이아웃 완전히 파괴
- ❌ 사용자에게 즉시 노출되어 긴급 롤백 필요

---

### 💀 무엇이 잘못되었나

#### 1. HTML 구조 파괴
```html
<!-- ❌ Python 스크립트가 생성한 잘못된 HTML -->
</main>
</div>  <!-- container 닫기가 여기서 끝남 -->

<footer>
    <!-- 푸터 내용 -->
</footer>

<!-- 🔥 문제: 모달이 container 밖에 배치됨! -->
<div id="privacyModal" class="modal">
    <!-- 모달 내용이 페이지에 그대로 노출 -->
</div>
```

**원인**: Python regex가 `</footer>\s*</div>`를 찾아서 **푸터 + 모달을 container 밖**에 배치

**결과**:
- 모달이 container의 z-index, overflow 제어를 벗어남
- CSS `display: none`이 적용 안됨
- 모달 내용이 페이지 하단에 텍스트로 노출

---

#### 2. 테스트 부재

**실수한 프로세스**:
1. 19-ocr에서 템플릿 추출 ✅
2. Python 스크립트 작성 ✅
3. **단 1개 도구도 테스트 안 함** ❌❌❌
4. 16개 도구 일괄 실행 ❌
5. git commit & push (16개) ❌
6. 문제 발견 → 긴급 롤백

**치명적 실수**:
- 로컬에서 브라우저 확인 없이 바로 배포
- 첫 번째 도구(04-compress)만 테스트했어도 즉시 발견 가능
- Cloudflare Pages 자동 배포 → 5분 내 실 서비스 반영

---

#### 3. 잘못된 자동화 접근

**Python 스크립트의 한계**:
```python
# ❌ 너무 단순한 regex
pattern = r'<footer>.*?</footer>\s*</div>'

# 문제점:
# 1. HTML 구조를 파악 못함 (container div의 위치)
# 2. 기존 푸터 형식 다양성 고려 안 함
# 3. 모달 CSS가 제대로 작동하는지 검증 안 함
```

**시간 압박 + 과신**:
- "19-ocr에서 잘 됐으니 다른 것도 될 것" (틀림)
- "regex 한 번에 끝내자" → 수동 검증 생략
- "16개 한 번에 처리하면 빠르다" → 롤백도 16개

---

### ✅ 올바른 프로세스 (앞으로 반드시 따를 것)

#### 1단계: 템플릿 검증 (1개 도구)

```bash
# 1. 첫 번째 도구 선택 (예: 04-compress)
cd G:\hddcode\tools\04-compress

# 2. 수동으로 푸터 추가
# - index.html 직접 편집
# - 정확한 HTML 구조 확인
# - container div 내부에 배치

# 3. 로컬 테스트 (http-server)
PORT=4000 npx http-server -p 4000

# 4. 브라우저 확인
# - 푸터 렌더링 확인
# - 개인정보처리방침 모달 클릭 → 제대로 열리는가?
# - 이용약관 모달 클릭 → 제대로 열리는가?
# - 모달 외부 클릭 → 닫히는가?
# - 다크모드 전환 → 스타일 깨지지 않는가?
# - F12 콘솔 → JavaScript 에러 없는가?

# 5. 모든 테스트 통과 후 git commit
git add index.html
git commit -m "feat: 개인정보처리방침/이용약관 모달 추가"
git push

# 6. Cloudflare Pages 배포 대기 (5-10분)
# 7. 실제 도메인에서 재확인 (https://compress.baal.co.kr)
```

---

#### 2단계: 템플릿 추출 및 문서화

```bash
# 1. 검증된 푸터 HTML 추출
cd G:\hddcode\tools\04-compress
grep -A100 "<footer>" index.html > footer_template.html

# 2. _template/README.md에 추가
# - 정확한 HTML 구조
# - CSS 클래스명
# - JavaScript 함수명
# - 배치 위치 (container 내부!)
```

---

#### 3단계: 점진적 배포 (2-3개씩)

```bash
# ❌ 절대 금지: 16개 한 번에 배포
# ✅ 권장: 2-3개씩 그룹으로 나눠서 배포

# 그룹 1: 04-compress, 05-qr (테스트)
# - 수동 복사 후 로컬 테스트
# - git commit & push
# - Cloudflare 배포 확인
# - 문제 없으면 다음 그룹 진행

# 그룹 2: 06-resize, 07-json, 08-color
# 그룹 3: 09-base64, 10-regex, 11-hash
# 그룹 4: 12-csv, 13-md, 14-convert
# 그룹 5: 15-barcode, 16-watermark, 17-chart
# 그룹 6: 18-bg, 20-upscale
```

---

#### 4단계: 자동화는 검증 후

**Python 스크립트 사용 조건**:
1. ✅ 최소 3개 도구에서 수동 성공 확인
2. ✅ HTML 구조가 모든 도구에서 동일함을 확인
3. ✅ 스크립트 실행 전 dry-run (출력만 확인)
4. ✅ 1개 도구에만 적용 후 브라우저 테스트
5. ✅ 문제 없으면 나머지 진행

**절대 금지**:
- ❌ 테스트 없이 16개 일괄 실행
- ❌ 로컬 브라우저 확인 없이 git push
- ❌ regex만 믿고 HTML 구조 무시
- ❌ "급하니까 빨리" → 롤백이 더 오래 걸림

---

### 🔥 긴급 롤백 프로세스 (이번에 사용한 방법)

```bash
# 1. 각 도구의 푸터 추가 직전 커밋 확인
cd G:\hddcode\tools\04-compress
git log --oneline -5
# b566bcb feat: 푸터 통일 (← 이게 문제)
# a2f802c feat: 크로스 프로모션 (← 여기로 돌아가기)

# 2. 하나씩 롤백 (16개 반복)
git reset --hard a2f802c
git push --force

# 3. Cloudflare Pages 자동 재배포 대기 (5-10분)
# 4. 시크릿 모드에서 확인 (캐시 없음)
```

**소요 시간**: 약 30분 (롤백 자체는 5분, 배포 대기 25분)

---

### 📚 교훈 및 원칙

#### 1. 테스트는 선택이 아닌 필수
- **1개 도구 로컬 테스트 없이 배포 금지**
- 브라우저에서 눈으로 확인할 것
- F12 개발자 도구 콘솔 에러 체크

#### 2. 점진적 배포
- 작은 단위로 쪼개서 배포
- 문제 발생 시 영향 범위 최소화
- "빨리 끝내자" < "안전하게 끝내자"

#### 3. 자동화의 양날의 검
- 자동화는 **검증된 작업만**
- 새로운 작업은 수동으로 먼저
- 스크립트보다 사람의 눈이 더 정확

#### 4. HTML 구조 이해 필수
- Regex는 HTML 구조를 이해 못함
- container, z-index, overflow 등 CSS 계층 구조 중요
- 모달은 반드시 container 내부에

#### 5. Cloudflare Pages 캐시 고려
- 배포 후 5-10분 대기
- 시크릿 모드나 Ctrl+Shift+R로 확인
- 사용자 브라우저 캐시도 고려 (최대 15분)

#### 6. 롤백 계획 미리 세우기
- git push 전 커밋 해시 기록
- force push 권한 확인
- 최악의 경우 복구 시간 계산

---

### ⚠️ 다음 푸터 작업 시 체크리스트

**작업 전**:
- [ ] 19-ocr의 푸터가 **완벽하게 작동**하는가?
- [ ] HTML 구조를 **정확히 이해**했는가? (container 위치)
- [ ] CSS가 모든 브라우저에서 작동하는가?

**작업 중**:
- [ ] **1개 도구**에만 먼저 적용
- [ ] 로컬 http-server로 브라우저 테스트
- [ ] F12 콘솔 에러 없음
- [ ] 모달 열기/닫기 작동
- [ ] 다크모드 전환 문제없음
- [ ] 한/영 전환 문제없음

**배포 전**:
- [ ] git commit 메시지 명확히
- [ ] 현재 커밋 해시 기록 (롤백용)
- [ ] **1개만 push** → Cloudflare 배포 확인
- [ ] 실제 도메인에서 재확인

**배포 후**:
- [ ] 시크릿 모드로 확인
- [ ] 모바일에서도 확인
- [ ] 문제 없으면 다음 2-3개 진행
- [ ] **절대 16개 한 번에 배포 금지**

---

### 🎯 결론

**이번 실패의 핵심**:
> "빠른 자동화 > 안전한 검증" 이라는 착각

**앞으로의 원칙**:
> "느려도 확실하게, 작게 쪼개서, 반드시 테스트"

**기억할 것**:
> 16개 도구 롤백하는 시간 > 1개씩 천천히 배포하는 시간

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

## Phase 3 마무리 - 서비스 연동 (2025-01-26)

새 서비스 개발 완료 후 **필수 작업**: baal.co.kr과 diora.co.kr에 서비스 추가

### 🎯 작업 순서

1. **Phase 3 서비스 개발 완료**
2. **Phase 2 체크리스트 검증** (버튼 스타일, 다크모드 등)
3. **서비스 Git 커밋 & 푸시** (개별 서비스)
4. ✅ **baal.co.kr 추가** (사이드바 + 그리드 카드)
5. ✅ **diora.co.kr 추가** (RelatedServices.tsx + CSS 정렬)
6. **Git 커밋 & 푸시** (baal, diora)
7. **배포 확인** (Cloudflare Pages 자동 배포, 5-10분 소요)

---

### 1️⃣ baal.co.kr 서비스 추가

**파일**: `G:\hddcode\baal\index.html`

#### (1) 좌측 사이드바 추가

**위치**: `<nav class="sidebar-nav">` 내부, 기존 서비스 아래

```html
<div class="nav-item" onclick="window.open('https://서비스명.baal.co.kr', '_blank')">서비스 한글명</div>
```

**예시**:
```html
<div class="nav-item" onclick="window.open('https://barcode.baal.co.kr', '_blank')">바코드 생성기</div>
```

#### (2) 메인 그리드 카드 추가

**위치**: `<div class="services-grid">` 내부, 기존 카드 아래

```html
<div class="service-card" onclick="window.open('https://서비스명.baal.co.kr', '_blank')">
    <h3 class="service-title">🔢 서비스 제목</h3>
    <p class="service-subtitle">한 줄 설명</p>
    <p class="service-description">상세 설명 2-3문장. 기존 카드와 비슷한 길이로 작성.</p>
    <div class="service-features">
        <span class="feature-tag">🎨 기능1</span>
        <span class="feature-tag">📦 기능2</span>
        <span class="feature-tag">💾 다운로드</span>
        <span class="feature-tag">🌐 한/영 지원</span>
        <span class="feature-tag">💰 100% 무료</span>
    </div>
    <button class="service-button" onclick="event.stopPropagation(); window.open('https://서비스명.baal.co.kr', '_blank')">사용하기 →</button>
</div>
```

**주의사항**:
- ✅ 버튼 텍스트: **"사용하기 →"** (~~"무료로 사용하기"~~ 사용 금지)
- ✅ `event.stopPropagation()` 필수 (카드/버튼 클릭 충돌 방지)
- ✅ 설명 길이: 기존 카드와 비슷하게 (너무 길거나 짧으면 안됨)
- ✅ Feature 태그: 7-8개 권장 (마지막은 `💰 100% 무료`)
- ✅ 이모지: 서비스 컨셉에 맞게 선택

---

### 2️⃣ diora.co.kr 서비스 추가

**파일**: `G:\hddcode\diora\src\components\RelatedServices\RelatedServices.tsx`

#### (1) allServices 배열에 추가

**위치**: `allServices` 배열 내부, 기존 서비스 아래

```tsx
{
  id: 'service-id',  // 영문 소문자 (예: 'barcode')
  icon: '🔢',  // 서비스 컨셉 이모지
  title: '서비스 한글명',
  subtitle: '한 줄 설명',
  englishTitle: 'ENGLISH TITLE (대문자)',
  description: '상세 설명 2-3문장. 기존 서비스와 비슷한 길이로 작성. API 키 필요 여부, 주요 기능, 활용 방법 포함.',
  features: [
    '🔢 주요 기능1 (구체적으로)',
    '✅ 주요 기능2',
    '🎨 커스터마이징',
    '📏 크기/옵션 조절',
    '💾 다운로드 형식',
    '🌐 다국어 지원 (한/영)',
    '💰 100% 무료'
  ],
  useCases: '활용 분야 나열 (쉼표 구분, 6-8개)',
  url: 'https://서비스명.baal.co.kr'
}
```

**주의사항**:
- ✅ Description: 150-200자 내외 (기존 서비스 참고)
- ✅ Features: 7-8개 (마지막은 항상 `💰 100% 무료`)
- ✅ useCases: 구체적이고 다양하게 (최소 6개)
- ✅ 버튼 텍스트: TSX 파일에 하드코딩된 **"사용하기 →"**

#### (2) CSS 버튼 수평 정렬 확인 (필수!)

**파일**: `G:\hddcode\diora\src\components\RelatedServices\RelatedServices.css`

```css
/* 카드에 flexbox 적용 */
.service-card-related {
  display: flex;
  flex-direction: column;
  /* 기타 스타일... */
}

/* Features가 남은 공간 차지하여 버튼을 하단으로 밀어냄 */
.service-features {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xl);
  flex: 1;  /* ⚠️ 필수! */
  align-content: flex-start;  /* ⚠️ 필수! */
}
```

**효과**: 카드 높이가 달라도 "사용하기 →" 버튼이 항상 하단에 수평 정렬됨

---

### ⚠️ 자주 하는 실수

1. ❌ 버튼 텍스트 "무료로 사용하기 →" 사용
   - ✅ **"사용하기 →"** 사용 (feature-tag에 이미 "💰 100% 무료" 있음)

2. ❌ diora.co.kr CSS에 flex 스타일 누락
   - ✅ `.service-card-related`에 `display: flex; flex-direction: column;`
   - ✅ `.service-features`에 `flex: 1; align-content: flex-start;`

3. ❌ 설명 길이 불일치 (너무 길거나 짧음)
   - ✅ 기존 서비스와 비슷한 길이로 작성 (150-200자)

4. ❌ Feature 태그 개수 부족/과다
   - ✅ 7-8개 권장 (마지막은 항상 `💰 100% 무료`)

5. ❌ `event.stopPropagation()` 누락 (baal.co.kr 버튼)
   - ✅ 버튼 onclick에 반드시 추가하여 카드 클릭과 충돌 방지

6. ❌ 이모지 중복 또는 부적절
   - ✅ 기존 서비스와 중복 피하고 컨셉에 맞게 선택

---

### 🎯 배포 후 확인

1. **시크릿 모드**에서 먼저 확인 (캐시 없음)
2. 일반 브라우저에서 안 보이면 **하드 새로고침**:
   - Windows: `Ctrl + Shift + R` 또는 `Ctrl + F5`
   - Mac: `Cmd + Shift + R`
3. Cloudflare Pages 자동 배포: 보통 **5-10분** 내 반영
4. 브라우저 캐시 문제일 경우 최대 15분 대기

---

### 📋 최종 체크리스트

**baal.co.kr**:
- [ ] 좌측 사이드바에 서비스 추가
- [ ] 메인 그리드에 서비스 카드 추가
- [ ] 버튼 텍스트: "사용하기 →"
- [ ] `event.stopPropagation()` 포함
- [ ] Feature 태그 7-8개
- [ ] 설명 길이 기존 서비스와 유사

**diora.co.kr**:
- [ ] RelatedServices.tsx에 서비스 객체 추가
- [ ] 버튼 텍스트: "사용하기 →"
- [ ] Description 150-200자
- [ ] Features 7-8개 (마지막 `💰 100% 무료`)
- [ ] useCases 6-8개
- [ ] CSS에 flex 정렬 스타일 확인

**Git 커밋**:
- [ ] baal.co.kr 커밋 & 푸시
- [ ] diora.co.kr 커밋 & 푸시
- [ ] 배포 확인 (5-10분 대기)

---

**질문이나 문제가 있으면 tools-plan.html을 참고하거나 개발 로그에 기록하세요!**
