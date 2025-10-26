# BAAL 디자인 시스템

> 골드 그라디언트 기반 통합 디자인 가이드

**업데이트:** 2025-10-26 19:00 KST

---

## 디자인 철학

1. **골드 그라디언트:** BAAL의 시그니처 컬러
2. **최소주의:** 불필요한 요소 제거
3. **일관성:** 모든 서비스 동일한 느낌
4. **접근성:** 다크모드, 색맹 고려
5. **성능:** 빠른 로딩, 부드러운 애니메이션

---

## 컬러 시스템

### 라이트 모드
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

### 다크 모드
```css
body.dark-mode {
    /* 배경 */
    --bg-primary: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1f1f1f 100%);
    --bg-secondary: rgba(40, 40, 40, 0.95);
    --bg-accent: linear-gradient(135deg, #2a2416 0%, #2d2d2d 100%);

    /* 텍스트 */
    --text-primary: #f0f0f0;
    --text-secondary: #b0b0b0;
    --text-muted: #808080;

    /* 골드는 동일 (가독성 좋음) */

    /* 테두리 & 그림자 */
    --border-color: #3a3a3a;
    --shadow-sm: 0 4px 20px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 10px 40px rgba(0, 0, 0, 0.4);
    --shadow-lg: 0 20px 60px rgba(0, 0, 0, 0.5);
}
```

---

## 타이포그래피

### 폰트 패밀리
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

/* 코드, URL 등 */
.monospace {
    font-family: 'Courier New', monospace;
}
```

### 폰트 크기
```css
/* 제목 */
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

/* 본문 */
.subtitle {
    font-size: 1.1em;       /* 17.6px */
    font-weight: 500;
    color: var(--text-secondary);
}

body {
    font-size: 1em;         /* 16px */
    font-weight: 400;
    line-height: 1.6;
}

small, .small {
    font-size: 0.9em;       /* 14.4px */
    color: var(--text-secondary);
}
```

### 폰트 무게
- **400:** 일반 텍스트
- **500:** 중요한 텍스트
- **600:** 버튼, 라벨
- **700:** 제목

---

## 레이아웃

### 컨테이너
```css
.container {
    max-width: 1200px;
    margin: 0 auto;
    background: var(--bg-secondary);
    backdrop-filter: blur(20px);
    border-radius: var(--border-radius-xl);
    padding: 50px 40px;
    box-shadow: var(--shadow-md);
}

/* 모바일 */
@media (max-width: 768px) {
    .container {
        padding: 30px 20px;
        border-radius: var(--border-radius-lg);
    }
}
```

### 간격 (Spacing)
```css
/* Padding/Margin 단위: 8px */
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;
--spacing-3xl: 64px;
```

---

## 컴포넌트

### 버튼
```css
button, .btn {
    /* 기본 스타일 */
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

/* 보조 버튼 (아웃라인) */
.btn-secondary {
    background: transparent;
    color: var(--gold-primary);
    border: 2px solid var(--gold-primary);
}

.btn-secondary:hover {
    background: var(--gold-gradient);
    color: white;
}

/* 작은 버튼 */
.btn-sm {
    padding: 8px 16px;
    font-size: 0.9em;
}

/* 큰 버튼 */
.btn-lg {
    padding: 16px 32px;
    font-size: 1.1em;
}

/* 전체 너비 */
.btn-block {
    width: 100%;
}
```

### 카드
```css
.card {
    background: var(--bg-secondary);
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius-lg);
    padding: 24px;
    box-shadow: var(--shadow-sm);
    transition: box-shadow 0.2s, transform 0.2s;
}

.card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-2px);
}
```

### 입력 필드
```css
input, textarea, select {
    width: 100%;
    padding: 12px 16px;
    border: 2px solid var(--border-color);
    border-radius: var(--border-radius-md);
    background: var(--bg-secondary);
    color: var(--text-primary);
    font-size: 1em;
    font-family: inherit;
    transition: border-color 0.2s;
}

input:focus, textarea:focus, select:focus {
    outline: none;
    border-color: var(--gold-primary);
}

/* 에러 상태 */
input.error {
    border-color: #ff4444;
}

/* 성공 상태 */
input.success {
    border-color: #00cc66;
}
```

### 드래그 앤 드롭 영역
```css
.dropzone {
    border: 3px dashed var(--border-color);
    border-radius: var(--border-radius-lg);
    padding: 40px;
    text-align: center;
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s;
}

.dropzone:hover, .dropzone.active {
    border-color: var(--gold-primary);
    background: var(--bg-accent);
}
```

---

## 애니메이션

### 기본 전환
```css
/* 모든 컴포넌트 기본 transition */
* {
    transition-timing-function: ease-in-out;
}

/* 짧은 전환 (0.2s) */
.transition-fast {
    transition: all 0.2s ease-in-out;
}

/* 보통 전환 (0.3s) */
.transition-base {
    transition: all 0.3s ease-in-out;
}

/* 긴 전환 (0.5s) */
.transition-slow {
    transition: all 0.5s ease-in-out;
}
```

### 페이드인 애니메이션
```css
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.fade-in {
    animation: fadeIn 0.6s ease;
}
```

### 로딩 스피너
```css
@keyframes spin {
    to { transform: rotate(360deg); }
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid var(--border-color);
    border-top-color: var(--gold-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}
```

---

## 반응형 디자인

### 브레이크포인트
```css
/* 데스크톱 우선 (Desktop First) */

/* 대형 데스크톱 (1440px+) */
@media (min-width: 1440px) {
    .container {
        max-width: 1400px;
    }
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

## 유틸리티 클래스

### 텍스트 정렬
```css
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }
```

### 간격
```css
.mt-1 { margin-top: 8px; }
.mt-2 { margin-top: 16px; }
.mt-3 { margin-top: 24px; }
.mt-4 { margin-top: 32px; }

.mb-1 { margin-bottom: 8px; }
.mb-2 { margin-bottom: 16px; }
.mb-3 { margin-bottom: 24px; }
.mb-4 { margin-bottom: 32px; }

.pt-1 { padding-top: 8px; }
.pt-2 { padding-top: 16px; }
.pt-3 { padding-top: 24px; }
.pt-4 { padding-top: 32px; }

.pb-1 { padding-bottom: 8px; }
.pb-2 { padding-bottom: 16px; }
.pb-3 { padding-bottom: 24px; }
.pb-4 { padding-bottom: 32px; }
```

### 디스플레이
```css
.d-none { display: none; }
.d-block { display: block; }
.d-flex { display: flex; }
.d-grid { display: grid; }

.flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.flex-between {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

---

## 접근성

### 색맹 고려
- 골드 + 화이트/블랙: 대비 비율 WCAG AA 통과
- 에러/성공 상태에 아이콘 추가 (색상만으로 구분 X)

### 키보드 접근성
```css
/* 포커스 표시 */
:focus {
    outline: 2px solid var(--gold-primary);
    outline-offset: 2px;
}

/* 건너뛰기 링크 */
.skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--gold-gradient);
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    z-index: 100;
}

.skip-link:focus {
    top: 0;
}
```

---

## 다크모드 전환

### 스무스한 전환
```css
body {
    transition: background 0.3s, color 0.3s;
}

* {
    transition: background-color 0.3s, border-color 0.3s, color 0.3s;
}
```

### 이미지 처리
```css
/* 다크모드에서 이미지 밝기 조절 */
body.dark-mode img:not(.no-filter) {
    filter: brightness(0.8) contrast(1.2);
}
```

---

## 디자인 체크리스트

### 컬러
- [ ] 골드 그라디언트 버튼 사용
- [ ] 다크모드 CSS 변수 활용
- [ ] 테두리 색상 `--border-color` 사용
- [ ] 그림자 `--shadow-sm/md/lg` 사용

### 타이포그래피
- [ ] Inter 폰트 사용
- [ ] 제목 font-weight 700
- [ ] 본문 line-height 1.6

### 레이아웃
- [ ] .container 사용
- [ ] 모바일 브레이크포인트 적용
- [ ] 터치 타겟 44px 이상

### 애니메이션
- [ ] 버튼 hover 애니메이션
- [ ] 페이드인 애니메이션 적용
- [ ] 로딩 인디케이터 추가

### 접근성
- [ ] :focus 스타일 정의
- [ ] alt 텍스트 추가
- [ ] aria-label 추가

---

**이 디자인 시스템은 모든 BAAL 서비스에 적용됩니다.**
