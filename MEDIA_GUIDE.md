# 🎨 코랄리에 룰렛 게임 미디어 파일 가이드

> **홍보 담당자용** - 이벤트에 필요한 모든 파일 준비 가이드

---

## 📸 필요한 이미지 파일

### 1. 로고 이미지 (필수)

#### 📍 위치: `public/images/`

**1-1. logo-banner.png** (상단 배너용)
- **용도**: 상단 헤더에 표시되는 코랄리에 로고
- **형태**: 가로로 긴 알파벳 로고 (CORALIER)
- **권장 크기**: 가로 400-600px, 높이 60-80px
- **배경**: 투명 PNG 권장
- **구하는 방법**:
  - 회사 마케팅팀에 "가로형 로고 PNG" 요청
  - 쿠팡 이미지: https://image11.coupangcdn.com/image/cmg/oms/banner/1433d540-8aaf-4ce8-9d6a-4c9b14acb5cd_270x270.png
  - 웹사이트에서 로고 추출: https://coralier.com

**1-2. logo-symbol.png** (룰렛 중앙용)
- **용도**: 룰렛 휠 중앙에 표시되는 심볼 마크
- **형태**: 정사각형 심볼/엠블럼
- **권장 크기**: 200x200px
- **배경**: 투명 PNG 권장
- **구하는 방법**:
  - 회사 마케팅팀에 "심볼 마크 PNG" 요청
  - 로고에서 심볼 부분만 크롭

---

### 2. 제품 이미지 (선택 - 룰렛 시각화용)

#### 📍 위치: `public/images/products/`

**추천 제품 이미지:**
1. **product-1.png** - 치약,칫솔,구강스프레이(2+1)세트 이미지
2. **product-2.png** - 구강스프레이 단품 이미지
3. **product-3.png** - 마우스워시 단품 이미지

- **크기**: 300x300px 또는 500x500px
- **배경**: 투명 또는 흰색
- **형식**: PNG 또는 JPG
- **구하는 방법**:
  - 쿠팡 상품 페이지에서 다운로드
  - 회사 제품 카탈로그
  - https://coralier.com/?page_id=39 (제품 페이지)

---

## 🎵 필요한 음악/효과음 파일

#### 📍 위치: `public/audio/`

### 음악 파일 5개

| 파일명 | 용도 | 길이 | 분위기 |
|--------|------|------|--------|
| **waiting.mp3** | 대기 배경음악 (루프) | 30초-1분 | 경쾌하고 밝은 분위기 |
| **spinning.mp3** | 룰렛 회전 음악 | 5-10초 | 긴장감 있는 드럼롤 |
| **prize1.mp3** | 1등 당첨 효과음 | 2-5초 | 축하, 팡파르 |
| **prize2.mp3** | 2등 당첨 효과음 | 2-5초 | 박수, 환호 |
| **prize3.mp3** | 3등 당첨 효과음 | 2-5초 | 가벼운 축하음 |

---

### 🎼 무료 음악 소스 (저작권 걱정 없음)

#### 1. 유튜브 오디오 라이브러리 (무료, 상업 이용 가능)
- **URL**: https://studio.youtube.com/channel/UC.../music
- **장점**: 구글 계정만 있으면 무료 다운로드
- **추천 검색어**:
  - waiting: "upbeat", "happy", "cheerful"
  - spinning: "suspense", "drum roll"
  - prize: "celebration", "fanfare", "success"

#### 2. Pixabay (무료, 저작권 걱정 없음)
- **URL**: https://pixabay.com/music/
- **장점**: 회원가입 없이 바로 다운로드
- **추천**:
  - 대기음: "Happy Background Music"
  - 회전음: "Drum Roll"
  - 당첨: "Winning Sound Effect"

#### 3. Freesound (무료, CC 라이선스)
- **URL**: https://freesound.org/
- **추천 검색어**:
  - "game show drumroll"
  - "victory fanfare"
  - "celebration sound"

#### 4. 효과음 전문 사이트
- **Zapsplat**: https://www.zapsplat.com/ (무료)
- **Mixkit**: https://mixkit.co/free-sound-effects/ (무료)

---

## 📁 파일 업로드 방법

### 방법 1: Git으로 직접 추가 (추천)

```bash
# 1. 파일 복사
# 로고 이미지
cp [다운로드한 로고] /g/hddcode/liveq-test/public/images/logo-banner.png
cp [다운로드한 심볼] /g/hddcode/liveq-test/public/images/logo-symbol.png

# 제품 이미지 (선택)
mkdir -p /g/hddcode/liveq-test/public/images/products
cp [제품1 이미지] /g/hddcode/liveq-test/public/images/products/product-1.png
cp [제품2 이미지] /g/hddcode/liveq-test/public/images/products/product-2.png
cp [제품3 이미지] /g/hddcode/liveq-test/public/images/products/product-3.png

# 음악 파일
cp [대기음악] /g/hddcode/liveq-test/public/audio/waiting.mp3
cp [회전음악] /g/hddcode/liveq-test/public/audio/spinning.mp3
cp [1등효과음] /g/hddcode/liveq-test/public/audio/prize1.mp3
cp [2등효과음] /g/hddcode/liveq-test/public/audio/prize2.mp3
cp [3등효과음] /g/hddcode/liveq-test/public/audio/prize3.mp3

# 2. Git 커밋 & 푸시
cd /g/hddcode/liveq-test
git add public/images/ public/audio/
git commit -m "feat: 코랄리에 로고 및 음악 파일 추가"
git push origin master

# 3. 자동 배포 완료!
# 1-2분 후 https://liveq.github.io/test/ 에서 확인
```

### 방법 2: GitHub 웹에서 업로드

1. https://github.com/liveq/test 접속
2. `public/images/` 폴더 클릭
3. "Add file" → "Upload files" 클릭
4. 파일 드래그 앤 드롭
5. "Commit changes" 클릭

---

## 🎯 우선순위

### 필수 (이거만 있어도 OK)
- ✅ logo-banner.png (상단 로고)
- ✅ logo-symbol.png (룰렛 중앙)

### 권장 (훨씬 좋음)
- ⭐ waiting.mp3 (대기음)
- ⭐ spinning.mp3 (회전음)
- ⭐ prize1/2/3.mp3 (당첨 효과음)

### 선택 (있으면 더 좋음)
- 💡 제품 이미지 3개

---

## 🚨 주의사항

### 이미지 파일
- ✅ 파일명은 정확히 일치해야 함 (대소문자 구분)
- ✅ PNG 형식 권장 (투명 배경)
- ✅ 파일 크기: 각 1MB 이하 권장
- ❌ 한글 파일명 사용 금지

### 음악 파일
- ✅ MP3 형식만 지원
- ✅ 파일 크기: 각 5MB 이하 권장
- ✅ 저작권: 무료/상업 이용 가능한 것만
- ❌ 너무 긴 음악은 용량 낭비

---

## 💬 도움이 필요하면

1. **파일 찾기 어려우면**: 마케팅팀에 요청
2. **업로드 방법 모르면**: IT팀 또는 개발자에게 요청
3. **급하면**: 로고만 먼저 추가하고 나중에 음악 추가 가능

---

**작성일**: 2025-11-16
**담당**: 코랄리에 홍보팀
**이벤트**: 미니언즈런 룰렛 게임
