# 🎨 코랄리에 미디어 다운로드 가이드

> **빠른 시작**: 5분 안에 로고 추가하기

---

## 🚀 빠른 시작 (로고만 먼저!)

### 1단계: 쿠팡 로고 다운로드

#### 방법 A: 브라우저에서 직접
1. 이 링크 열기: https://image11.coupangcdn.com/image/cmg/oms/banner/1433d540-8aaf-4ce8-9d6a-4c9b14acb5cd_270x270.png
2. 이미지 우클릭 → "다른 이름으로 이미지 저장"
3. 파일명: `coralier-logo-original.png`로 저장

#### 방법 B: 명령어로 다운로드 (Windows)
```powershell
# PowerShell 실행
cd /g/hddcode/liveq-test/public/images/

# 쿠팡 로고 다운로드
curl -o coralier-logo-original.png "https://image11.coupangcdn.com/image/cmg/oms/banner/1433d540-8aaf-4ce8-9d6a-4c9b14acb5cd_270x270.png"
```

---

### 2단계: 로고 파일 2개 만들기

다운로드한 이미지를 **2가지 용도로 복사**:

```bash
cd /g/hddcode/liveq-test/public/images/

# 1. 상단 배너용 (가로로 긴 버전)
cp coralier-logo-original.png logo-banner.png

# 2. 룰렛 중앙용 (정사각형 버전)
cp coralier-logo-original.png logo-symbol.png
```

**또는 Windows 탐색기에서:**
1. `/g/hddcode/liveq-test/public/images/` 폴더 열기
2. `coralier-logo-original.png` 파일 2번 복사
3. 파일명 변경:
   - `logo-banner.png`
   - `logo-symbol.png`

---

### 3단계: Git 푸시

```bash
cd /g/hddcode/liveq-test
git add public/images/
git commit -m "feat: 코랄리에 로고 추가"
git push origin master
```

**끝!** 1-2분 후 https://liveq.github.io/test/ 에서 로고 확인 가능!

---

## 🎵 음악 파일 빠른 추가

### 추천: 유튜브 오디오 라이브러리

1. **유튜브 스튜디오** 접속: https://studio.youtube.com
2. 왼쪽 메뉴 → **오디오 보관함** 클릭
3. 음악 검색 및 다운로드:

#### 대기 음악 (waiting.mp3)
- 검색: "happy upbeat"
- 추천: "Happy Alley" 또는 "Wallpaper"
- 다운로드 → 파일명 `waiting.mp3`로 변경

#### 회전 음악 (spinning.mp3)
- 검색: "suspense"
- 추천: "Monkeys Spinning Monkeys" (재미있음!)
- 다운로드 → 파일명 `spinning.mp3`로 변경

#### 1등 효과음 (prize1.mp3)
- 검색: "success"
- 추천: "Ta Da Fanfare" 또는 "Success Fanfare"
- 다운로드 → 파일명 `prize1.mp3`로 변경

#### 2등/3등 효과음
- 같은 방법으로 `prize2.mp3`, `prize3.mp3` 준비

### 파일 위치로 복사
```bash
# 다운로드 폴더에서 프로젝트로 복사
cp ~/Downloads/waiting.mp3 /g/hddcode/liveq-test/public/audio/
cp ~/Downloads/spinning.mp3 /g/hddcode/liveq-test/public/audio/
cp ~/Downloads/prize1.mp3 /g/hddcode/liveq-test/public/audio/
cp ~/Downloads/prize2.mp3 /g/hddcode/liveq-test/public/audio/
cp ~/Downloads/prize3.mp3 /g/hddcode/liveq-test/public/audio/
```

### Git 푸시
```bash
git add public/audio/
git commit -m "feat: 룰렛 게임 배경음악 및 효과음 추가"
git push origin master
```

---

## 🛍️ 제품 이미지 추가 (선택사항)

### 코랄리에 홈페이지에서 가져오기

1. **홈페이지 접속**: https://coralier.com
2. 제품 페이지 이동
3. 제품 이미지 우클릭 → "다른 이름으로 이미지 저장"
4. 파일명 변경:
   - `product-1.png` (치약 세트)
   - `product-2.png` (구강스프레이)
   - `product-3.png` (마우스워시)

### 폴더 만들고 복사
```bash
mkdir -p /g/hddcode/liveq-test/public/images/products
cp ~/Downloads/제품1.png /g/hddcode/liveq-test/public/images/products/product-1.png
cp ~/Downloads/제품2.png /g/hddcode/liveq-test/public/images/products/product-2.png
cp ~/Downloads/제품3.png /g/hddcode/liveq-test/public/images/products/product-3.png
```

---

## ✅ 완료 체크리스트

### 필수 (5분 완료)
- [ ] logo-banner.png 추가
- [ ] logo-symbol.png 추가
- [ ] Git 푸시

### 권장 (15분 추가)
- [ ] waiting.mp3 추가
- [ ] spinning.mp3 추가
- [ ] prize1.mp3 추가
- [ ] prize2.mp3 추가
- [ ] prize3.mp3 추가
- [ ] Git 푸시

### 선택 (시간 있을 때)
- [ ] product-1.png 추가
- [ ] product-2.png 추가
- [ ] product-3.png 추가
- [ ] Git 푸시

---

## 🆘 문제 해결

### Q: 쿠팡 이미지가 다운로드 안 돼요
**A**: 브라우저 보안 설정 때문일 수 있습니다.
- 해결: 링크를 새 탭으로 열고 우클릭 → 저장
- 또는: 스크린샷 찍어서 저장

### Q: 파일 경로를 모르겠어요
**A**: Windows 탐색기 사용:
1. 주소창에 `G:\hddcode\liveq-test\public\images` 입력
2. 파일을 드래그 앤 드롭

### Q: Git 명령어가 안 돼요
**A**: GitHub Desktop 사용:
1. GitHub Desktop 열기
2. 변경사항 확인
3. Commit & Push 버튼 클릭

---

**빠른 질문**: Claude Code에게 "로고 추가 도와줘" 라고 하면 됩니다!
