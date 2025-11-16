# 🎨 코랄리에 브랜드 이미지 목록

> **룰렛 게임 활용 가이드** - 제공받은 이미지 정리 및 사용법

---

## 📸 제공받은 이미지 목록

### 1. 제품 컨셉 이미지
**Image #1 - 브랜드 컨셉 사진**
- 민트/핑크 배경 구성
- 제품: 핑크 튜브, 민트 튜브
- 소품: 산호, 불가사리, 조개껍질
- **용도**: 배경 이미지, 홍보 이미지
- **추천**: 대기 화면 배경으로 사용

---

### 2. 제품 상세 이미지

**Image #2 - 치약 2종 (민트/핑크)**
- 민트색 튜브 + 핑크색 튜브
- **용도**: 2등 당첨 상품 이미지
- **파일명 추천**: `product-toothpaste-duo.png`

**Image #3 - 치약 2종 (빨강/초록)**
- 빨강색 튜브 + 초록색 튜브
- **용도**: 제품 배리에이션 표시
- **파일명 추천**: `product-toothpaste-variant.png`

**Image #4 - 치약 전체 라인업**
- 민트, 핑크, 빨강, 초록 (4가지 색상)
- **용도**: 1등 당첨 상품 이미지 (세트 구성)
- **파일명 추천**: `product-toothpaste-set.png`

**Image #5 - 구강스프레이**
- 스프레이 타입 제품
- **용도**: 2등 단품 상품 이미지
- **파일명 추천**: `product-spray.png`

---

### 3. 로고 이미지

**Image #6 - CORALIER 영문 로고 (보라색)**
- 텍스트만 있는 로고
- 색상: 보라색 (#3B1E54 또는 비슷한 색)
- **용도**: 상단 배너 로고
- **파일명 추천**: `logo-banner-purple.png`
- **우선순위**: ⭐⭐⭐ 높음

**Image #7 - 코랄리에 한글 로고 (보라색)**
- 한글 텍스트 로고
- **용도**: 한국 행사용 배너
- **파일명 추천**: `logo-banner-korean.png`

**Image #8 - 심볼 + 영문 로고 (세트)**
- 팔각형 산호 심볼 + CORALIER 텍스트
- **용도**: 룰렛 중앙, 메인 브랜딩
- **파일명 추천**: `logo-symbol-with-text.png`
- **우선순위**: ⭐⭐⭐ 최우선

**Image #9 - 심볼만 (산호 아이콘)**
- 팔각형 안의 산호 모양만
- **용도**: 룰렛 중앙 심볼
- **파일명 추천**: `logo-symbol-only.png`
- **우선순위**: ⭐⭐⭐ 최우선

---

## 🎯 룰렛 게임 활용 방안

### 필수 교체 (지금 바로!)

#### 1. 상단 배너 로고
**현재**: 쿠팡 이미지 (임시)
**교체**: Image #8 또는 Image #6
```bash
# 다운로드 후
cp [다운로드한 Image #8] /g/hddcode/liveq-test/public/images/logo-banner.png
```

#### 2. 룰렛 중앙 심볼
**현재**: 쿠팡 이미지 (임시)
**교체**: Image #9 (심볼만)
```bash
cp [다운로드한 Image #9] /g/hddcode/liveq-test/public/images/logo-symbol.png
```

---

### 추가 개선 (더 멋지게!)

#### 3. 당첨 상품 이미지 표시
현재 룰렛에 텍스트만 표시되는데, **제품 이미지를 추가**하면 훨씬 좋습니다!

**1등 - 치약,칫솔,구강스프레이(2+1)세트**
```bash
mkdir -p /g/hddcode/liveq-test/public/images/prizes
cp [Image #4 - 4가지 색상 세트] /g/hddcode/liveq-test/public/images/prizes/prize-1.png
```

**2등 - 구강스프레이 단품**
```bash
cp [Image #5 - 스프레이] /g/hddcode/liveq-test/public/images/prizes/prize-2.png
```

**3등 - 마우스워시 단품**
```bash
# 마우스워시 이미지가 없으면 치약으로 대체 또는 추가 요청
cp [치약 이미지] /g/hddcode/liveq-test/public/images/prizes/prize-3.png
```

#### 4. 배경 이미지 추가
**Image #1**을 대기 화면 또는 배경으로 사용:
```bash
cp [Image #1] /g/hddcode/liveq-test/public/images/background.png
```

---

## 🎨 브랜드 컬러 분석

이미지에서 확인한 코랄리에 브랜드 색상:

### 메인 컬러
- **보라색**: `#3B1E54` (로고 색상)
- **민트**: `#7FFFD4` (이미 적용됨!)
- **핑크**: `#FFB6C1` (이미 적용됨!)

### 제품 컬러
- **민트 블루**: 치약 튜브
- **로즈 핑크**: 치약 튜브
- **코랄 레드**: 치약 튜브
- **라임 그린**: 치약 튜브

---

## 📋 우선순위별 작업 목록

### 🔥 긴급 (행사 전 필수)
1. [ ] **Image #8 또는 #6** → `logo-banner.png` 교체
2. [ ] **Image #9** → `logo-symbol.png` 교체

### ⭐ 중요 (시간 있으면)
3. [ ] **Image #4** → `prizes/prize-1.png` 추가
4. [ ] **Image #5** → `prizes/prize-2.png` 추가
5. [ ] 마우스워시 이미지 → `prizes/prize-3.png` 추가

### 💡 선택 (더 멋지게)
6. [ ] **Image #1** → `background.png` 추가
7. [ ] 로고 색상을 보라색으로 변경 (현재 핑크)
8. [ ] 룰렛 색상을 제품 컬러로 변경

---

## 🚀 빠른 교체 가이드

### Step 1: 이미지 다운로드
1. 채팅에서 이미지 우클릭 → "다른 이름으로 이미지 저장"
2. 파일명:
   - Image #8 → `logo-banner-new.png`
   - Image #9 → `logo-symbol-new.png`

### Step 2: 파일 교체
```bash
# Windows 탐색기에서
# G:\hddcode\liveq-test\public\images\ 폴더 열기

# 기존 파일 백업 (선택사항)
rename logo-banner.png logo-banner-old.png
rename logo-symbol.png logo-symbol-old.png

# 새 파일 복사 및 이름 변경
copy [다운로드 폴더]\logo-banner-new.png logo-banner.png
copy [다운로드 폴더]\logo-symbol-new.png logo-symbol.png
```

### Step 3: Git 푸시
```bash
cd /g/hddcode/liveq-test
git add public/images/
git commit -m "feat: 코랄리에 공식 로고 이미지로 교체"
git push origin master
```

**1-2분 후**: https://liveq.github.io/test/ 에서 새 로고 확인!

---

## 🎨 더 나은 디자인을 위한 제안

### 제안 1: 보라색 테마로 변경
현재 핑크/민트인데, 로고가 보라색이니 **보라색 강조** 추가:
- 햄버거 메뉴: 핑크 → 보라색
- 룰렛 돌리기 버튼: 핑크 → 보라색

### 제안 2: 제품 이미지가 있는 룰렛
룰렛 각 섹션에 **제품 이미지 표시**:
- 1등 섹션: 세트 이미지
- 2등 섹션: 스프레이 이미지
- 3등 섹션: 마우스워시 이미지

### 제안 3: 당첨 모달에 제품 이미지
당첨 알림에 **실제 제품 사진** 표시

---

## 📞 다음 단계

1. **지금**: Image #8, #9를 다운로드해서 로고 교체
2. **시간 있으면**: 제품 이미지도 추가
3. **원하시면**: 디자인 개선 (보라색 테마, 제품 이미지 룰렛)

---

**질문 있으면**: "로고 교체 도와줘" 또는 "제품 이미지 추가해줘" 라고 말씀해주세요!

**작성일**: 2025-11-16
**이미지 출처**: 코랄리에 홍보팀 제공
