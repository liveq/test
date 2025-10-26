@echo off
chcp 65001 >nul
echo 17개 리포지토리에 푸시...
echo.

set GITHUB_USER=liveq

for %%d in (04-compress 05-qr 06-resize 07-json 08-color 09-base64 10-regex 11-hash 12-csv 13-md 14-convert 15-barcode 16-watermark 17-chart 18-bg 19-ocr 20-upscale) do (
    echo.
    echo 📦 %%d
    cd %%d

    :: Git 초기화
    if not exist .git git init

    :: .gitignore
    if not exist .gitignore copy /Y ..\.gitignore . >nul

    :: 공통 파일
    if not exist _common mkdir _common
    copy /Y ..\\_template\\common.css _common\\ >nul 2>&1
    copy /Y ..\\_template\\common.js _common\\ >nul 2>&1

    :: 추가 및 커밋
    git add .

    git rev-parse HEAD >nul 2>&1
    if errorlevel 1 (
        git commit -m "feat: initial commit"
    )

    :: 리포지토리 이름
    set repo=%%d
    set repo=!repo:~3!
    set repo_name=baal-!repo!

    :: 원격 추가
    git remote remove origin 2>nul
    git remote add origin https://github.com/%GITHUB_USER%/!repo_name!.git

    :: 푸시
    git branch -M main
    git push -u origin main

    cd ..
)

echo.
echo ✅ 완료!
pause
