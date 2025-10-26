#!/bin/bash
# 17개 리포지토리 자동 생성 스크립트

# GitHub 사용자명
GITHUB_USER="liveq"

# 색상 정의
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 BAAL 서비스 리포지토리 생성 시작...${NC}\n"

# 서비스 목록
services=(
  "04-compress:이미지 압축"
  "05-qr:QR 코드 생성기"
  "06-resize:이미지 리사이즈"
  "07-json:JSON 포맷터"
  "08-color:색상 변환기"
  "09-base64:Base64 인코더"
  "10-regex:정규식 테스터"
  "11-hash:해시 생성기"
  "12-csv:CSV 변환기"
  "13-md:마크다운 에디터"
  "14-convert:이미지 변환기"
  "15-barcode:바코드 생성기"
  "16-watermark:워터마크"
  "17-chart:차트 생성기"
  "18-bg:배경 제거"
  "19-ocr:OCR 텍스트 추출"
  "20-upscale:AI 이미지 업스케일러"
)

# 각 서비스 처리
for service in "${services[@]}"; do
  # 폴더명과 서비스명 분리
  folder="${service%%:*}"
  name="${service##*:}"

  # 리포지토리 이름 생성 (04-compress → baal-compress)
  repo_name="baal-${folder#??-}"

  echo -e "\n${BLUE}📦 Processing: $folder ($name)${NC}"

  # 폴더 존재 확인
  if [ ! -d "$folder" ]; then
    echo "❌ 폴더가 없습니다: $folder"
    continue
  fi

  cd "$folder"

  # Git 초기화 (이미 있으면 스킵)
  if [ ! -d ".git" ]; then
    echo "  🔧 Git 초기화..."
    git init
  fi

  # .gitignore 복사
  if [ ! -f ".gitignore" ]; then
    echo "  📄 .gitignore 복사..."
    cp ../.gitignore .
  fi

  # 공통 파일 복사
  if [ ! -d "_common" ]; then
    echo "  📁 공통 파일 복사..."
    mkdir -p _common
    cp ../_template/common.css _common/ 2>/dev/null
    cp ../_template/common.js _common/ 2>/dev/null
  fi

  # 파일 추가
  git add .

  # 커밋 (이미 커밋이 있으면 스킵)
  if ! git rev-parse HEAD >/dev/null 2>&1; then
    echo "  💾 첫 커밋 생성..."
    git commit -m "feat: initial commit - $name

- 시장조사 완료
- README.md 작성 (상세 구현 가이드)
- 경쟁사 분석, 기술 스택, 이슈 해결방안 포함

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
  fi

  # GitHub 리포지토리 생성 및 푸시
  echo "  🌐 GitHub 리포지토리 생성: $GITHUB_USER/$repo_name"

  # gh CLI 사용 (있는 경우)
  if command -v gh &> /dev/null; then
    gh repo create "$GITHUB_USER/$repo_name" --public --source=. --remote=origin --push 2>/dev/null

    if [ $? -eq 0 ]; then
      echo -e "  ${GREEN}✅ $repo_name 생성 완료!${NC}"
    else
      echo "  ⚠️  이미 존재하거나 생성 실패. 수동으로 연결합니다..."

      # 원격 저장소가 없으면 추가
      if ! git remote | grep -q origin; then
        git remote add origin "https://github.com/$GITHUB_USER/$repo_name.git"
      fi

      # 푸시 시도
      git push -u origin master 2>/dev/null || git push -u origin main 2>/dev/null
    fi
  else
    echo "  ℹ️  GitHub CLI (gh)가 없습니다. 수동 생성 필요:"
    echo "     https://github.com/new"
    echo "     Repository name: $repo_name"
    echo ""
    echo "  생성 후 실행:"
    echo "     git remote add origin https://github.com/$GITHUB_USER/$repo_name.git"
    echo "     git push -u origin master"
  fi

  cd ..
done

echo -e "\n${GREEN}🎉 완료!${NC}\n"
echo "각 리포지토리가 생성되었습니다:"
echo "https://github.com/$GITHUB_USER?tab=repositories"
