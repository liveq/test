# Privacy Modal 개발 가이드

## 문제 분석

**증상:** 푸터의 "개인정보처리방침" 링크 클릭 시 모달이 열리지 않음

**콘솔 에러:**
```
Uncaught ReferenceError: openPrivacyModal is not defined
    at HTMLAnchorElement.onclick ((index):603:155)
```

## 원인

### ES6 Module Script 스코프 문제

**문제가 되는 코드:**
```javascript
// <script type="module"> 내부
function openPrivacyModal() {
    document.getElementById('privacyModal').classList.add('show');
}
```

**HTML:**
```html
<!-- inline onclick 핸들러 -->
<a onclick="openPrivacyModal()">개인정보처리방침</a>
```

**왜 안 되는가?**
1. ES6 module은 **독립적인 스코프**를 가짐
2. module 내부의 함수/변수는 **전역 스코프에 노출되지 않음**
3. inline onclick 핸들러는 **전역 스코프**에서 함수를 찾음
4. 결과: `ReferenceError: openPrivacyModal is not defined`

## 해결책

### 1. ES6 Module 환경 (18-bg, 17-chart)

**✅ 올바른 방법:**
```javascript
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

### 2. 일반 Script 환경 (19-ocr, 20-upscale, common.js 사용)

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

## HTML 구조

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

## CSS (baal.co.kr 스타일)

```html
<!-- Playfair Display 폰트 (필수) -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap" rel="stylesheet">

<style>
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
</style>
```

## 디버깅 방법

### 콘솔에서 확인

```javascript
// 브라우저 콘솔에서 테스트
window.openPrivacyModal  // undefined면 스코프 문제
```

### 환경별 확인 방법

| 환경 | 확인 방법 | 올바른 결과 |
|------|---------|-----------|
| ES6 module | `window.openPrivacyModal` | `function` |
| 일반 script | `openPrivacyModal` | `function` |
| 일반 script | `window.openPrivacyModal` | `function` |

## 체크리스트

### 새 서비스에 Privacy Modal 추가 시

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

## 적용 서비스

- ✅ #17 차트 (17-chart) - commit 9a608ce
- ✅ #18 배경 제거 (18-bg) - commit 471307c
- ✅ #19 OCR (19-ocr) - commit aecb66c
- ✅ #20 업스케일 (20-upscale) - commit 4c2601e
- 🔄 #04~#16 (13개 서비스) - 예정

## 참고

- 원본 디자인 출처: https://baal.co.kr (baal/index.html)
- 템플릿: G:/hddcode/liveq-test/templates/base-template.html
- 개발 가이드: G:/hddcode/liveq-test/DEV-GUIDE.md
