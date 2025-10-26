# 배포 가이드

BAAL 서비스를 Cloudflare Pages에 배포하는 방법입니다.

---

## Cloudflare Pages 배포

### 1. GitHub에 푸시

```bash
git add .
git commit -m "feat: add [서비스명]"
git push
```

### 2. Cloudflare Pages 설정

#### 첫 배포 (저장소 연결)

1. [Cloudflare 대시보드](https://dash.cloudflare.com/) 로그인
2. **Workers & Pages** 선택
3. **Create application** → **Pages** → **Connect to Git**
4. GitHub 저장소 선택 (baal)
5. 빌드 설정:
   - **Build command**: (비어있음 - 정적 사이트)
   - **Build output directory**: `/` 또는 빌드된 폴더
   - **Root directory**: `tools/04-compress` (서비스별)

#### 서브도메인 설정

각 서비스마다 별도의 Cloudflare Pages 프로젝트를 만듭니다:

- `compress-baal` → compress.baal.co.kr
- `qr-baal` → qr.baal.co.kr
- `resize-baal` → resize.baal.co.kr

**Custom domain 추가:**

1. Cloudflare Pages 프로젝트 → **Custom domains**
2. **Set up a custom domain**
3. `compress.baal.co.kr` 입력
4. DNS 자동 설정됨 (Cloudflare DNS 사용 시)

---

## 환경변수 설정 (Cloudflare Pages)

민감한 정보는 Cloudflare Pages의 환경변수로 관리합니다.

### 1. Cloudflare 대시보드에서 설정

1. 프로젝트 → **Settings** → **Environment variables**
2. **Add variable** 클릭
3. 변수 추가:
   ```
   GOOGLE_ANALYTICS_ID = G-XXXXXXXXXX
   ADSENSE_CLIENT_ID = ca-pub-2886185075996969
   API_KEY = your-secret-key
   ```

### 2. 빌드 시점에 환경변수 주입

Cloudflare Pages는 빌드 시 환경변수를 사용할 수 있습니다.

**예시: HTML에 환경변수 주입 (빌드 스크립트 사용 시)**

```javascript
// build.js
const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf-8');

const result = html.replace(
    'G-XXXXXXXXXX',
    process.env.GOOGLE_ANALYTICS_ID
);

fs.writeFileSync('dist/index.html', result);
```

**package.json:**

```json
{
  "scripts": {
    "build": "node build.js"
  }
}
```

---

## DNS 설정

### baal.co.kr 도메인 설정

Cloudflare DNS에 다음 레코드 추가:

```
Type    Name        Content                         Proxy
CNAME   compress    compress-baal.pages.dev         Proxied (주황색)
CNAME   qr          qr-baal.pages.dev               Proxied
CNAME   resize      resize-baal.pages.dev           Proxied
CNAME   json        json-baal.pages.dev             Proxied
...
```

**주의:** DNS 변경은 최대 24시간 소요될 수 있습니다 (보통 10분 이내).

---

## SSL/TLS 설정

Cloudflare Pages는 자동으로 SSL 인증서를 발급합니다.

1. Cloudflare 대시보드 → **SSL/TLS**
2. 암호화 모드: **Full (strict)** 선택
3. 서브도메인 인증서 자동 생성됨

---

## 자동 배포 (CI/CD)

Cloudflare Pages는 Git push 시 자동으로 배포됩니다.

### 배포 워크플로우

```
Git push → GitHub → Cloudflare Pages (자동 빌드) → 배포 완료
```

### 브랜치 전략

- `main` 브랜치: 프로덕션 배포
- `dev` 브랜치: 개발/테스트 배포 (선택사항)

**브랜치별 배포 설정:**

1. Cloudflare Pages → **Settings** → **Builds & deployments**
2. **Production branch**: `main`
3. **Preview deployments**: `All branches` (모든 브랜치에서 미리보기 생성)

---

## 성능 최적화

### 1. 이미지 최적화

- WebP 포맷 사용
- 적절한 크기로 리사이징
- Lazy loading 적용

```html
<img src="image.webp" loading="lazy" alt="설명">
```

### 2. 파일 압축

Cloudflare는 자동으로 Gzip/Brotli 압축을 적용합니다.

### 3. 캐싱

```html
<!-- Cache-Control 헤더 설정 (_headers 파일) -->
/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=0, must-revalidate
```

### 4. CDN 활용

이미 Cloudflare CDN을 사용 중입니다. 추가 설정 불필요.

---

## 모니터링

### 1. Cloudflare Analytics

Cloudflare 대시보드 → **Analytics**에서 확인:

- 트래픽
- 대역폭
- 요청 수
- 응답 시간

### 2. Google Analytics

각 서비스의 트래픽을 GA에서 모니터링:

```javascript
gtag('event', 'file_upload', {
  'event_category': 'image_compress',
  'event_label': 'user_action'
});
```

### 3. 에러 추적

브라우저 콘솔 에러를 추적하려면 Sentry 등 사용 권장:

```html
<script src="https://browser.sentry-cdn.com/..."></script>
```

---

## 롤백 (배포 되돌리기)

### 1. Cloudflare Pages에서 이전 배포로 롤백

1. Cloudflare Pages → **Deployments**
2. 이전 배포 선택 → **Rollback to this deployment**

### 2. Git에서 되돌리기

```bash
# 마지막 커밋 취소
git revert HEAD
git push

# 특정 커밋으로 되돌리기
git revert <commit-hash>
git push
```

---

## 도메인 이전 (선택사항)

다른 도메인으로 서비스를 이전하려면:

1. Cloudflare Pages → **Custom domains** → **Add domain**
2. 새 도메인 입력
3. DNS 레코드 추가
4. 이전 도메인에서 301 리다이렉트 설정

---

## 문제 해결

### 배포 실패

1. Cloudflare Pages → **Deployments** → 실패한 배포 클릭
2. 빌드 로그 확인
3. 에러 메시지 해결 후 재배포

### DNS가 연결 안 됨

1. DNS 전파 확인: https://dnschecker.org/
2. Cloudflare DNS 레코드 확인
3. Proxy 상태 확인 (주황색 구름)

### SSL 인증서 오류

1. SSL/TLS 모드: **Full (strict)** 확인
2. 인증서 자동 발급까지 10분 대기
3. 브라우저 캐시 삭제

---

## 배포 체크리스트

배포 전 반드시 확인:

- [ ] 로컬에서 테스트 완료
- [ ] 콘솔 에러 없음
- [ ] 모바일 반응형 확인
- [ ] 다크모드 작동 확인
- [ ] 메타 태그 설정 완료
- [ ] .env 파일 Git에 포함 안 됨 (.gitignore 확인)
- [ ] 환경변수 Cloudflare에 등록 완료
- [ ] README.md 작성 완료
- [ ] Git commit & push
- [ ] Cloudflare Pages 배포 성공 확인
- [ ] 커스텀 도메인 연결 확인
- [ ] 실제 URL에서 테스트 (https://compress.baal.co.kr)

---

## 참고 링크

- [Cloudflare Pages 문서](https://developers.cloudflare.com/pages/)
- [Cloudflare DNS 문서](https://developers.cloudflare.com/dns/)
- [Cloudflare Analytics](https://developers.cloudflare.com/analytics/)

---

**배포 완료 후 tools-plan.html을 업데이트하여 진행 상황을 기록하세요!**
