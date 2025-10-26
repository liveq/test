@echo off
chcp 65001 >nul
echo.
echo 🚀 BAAL 서비스 리포지토리 생성 시작...
echo.

set GITHUB_USER=liveq

:: 서비스 목록
set services=04-compress:이미지압축 05-qr:QR코드생성기 06-resize:이미지리사이즈 07-json:JSON포맷터 08-color:색상변환기 09-base64:Base64인코더 10-regex:정규식테스터 11-hash:해시생성기 12-csv:CSV변환기 13-md:마크다운에디터 14-convert:이미지변환기 15-barcode:바코드생성기 16-watermark:워터마크 17-chart:차트생성기 18-bg:배경제거 19-ocr:OCR 20-upscale:AI업스케일러

for %%s in (%services%) do (
    for /f "tokens=1,2 delims=:" %%a in ("%%s") do (
        set folder=%%a
        set name=%%b

        :: 리포지토리 이름 (04-compress → baal-compress)
        set repo=baal-%%a
        set repo=!repo:~5!

        echo.
        echo 📦 Processing: %%a (!name!)

        if exist %%a (
            cd %%a

            :: Git 초기화
            if not exist .git (
                echo   🔧 Git 초기화...
                git init
            )

            :: .gitignore 복사
            if not exist .gitignore (
                echo   📄 .gitignore 복사...
                copy /Y ..\.gitignore . >nul
            )

            :: 공통 파일 복사
            if not exist _common (
                echo   📁 공통 파일 복사...
                mkdir _common
                copy /Y ..\\_template\\common.css _common\\ >nul 2>&1
                copy /Y ..\\_template\\common.js _common\\ >nul 2>&1
            )

            :: 파일 추가
            git add .

            :: 첫 커밋 확인
            git rev-parse HEAD >nul 2>&1
            if errorlevel 1 (
                echo   💾 첫 커밋 생성...
                git commit -m "feat: initial commit - !name!

- 시장조사 완료
- README.md 작성
- 경쟁사 분석, 기술 스택 포함

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
            )

            :: GitHub 리포지토리 생성
            set repo_name=baal-%%a
            set repo_name=!repo_name:~5!

            echo   🌐 GitHub 리포지토리: %GITHUB_USER%/!repo_name!

            :: gh CLI 사용
            where gh >nul 2>&1
            if %errorlevel% equ 0 (
                gh repo create "%GITHUB_USER%/!repo_name!" --public --source=. --remote=origin --push 2>nul

                if %errorlevel% equ 0 (
                    echo   ✅ !repo_name! 생성 완료!
                ) else (
                    echo   ⚠️  이미 존재하거나 생성 실패
                    git remote add origin https://github.com/%GITHUB_USER%/!repo_name!.git 2>nul
                    git push -u origin master 2>nul
                    if errorlevel 1 git push -u origin main 2>nul
                )
            ) else (
                echo   ℹ️  GitHub CLI가 없습니다. 수동 생성 필요:
                echo      https://github.com/new
                echo      Repository name: !repo_name!
                echo.
                echo   생성 후 실행:
                echo      git remote add origin https://github.com/%GITHUB_USER%/!repo_name!.git
                echo      git push -u origin master
            )

            cd ..
        ) else (
            echo   ❌ 폴더가 없습니다: %%a
        )
    )
)

echo.
echo 🎉 완료!
echo.
echo 각 리포지토리가 생성되었습니다:
echo https://github.com/%GITHUB_USER%?tab=repositories
echo.
pause
