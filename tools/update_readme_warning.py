#!/usr/bin/env python3
import os
import glob

# Phase 2 서비스 목록
PHASE2_SERVICES = ['09-base64', '10-regex', '11-hash', '12-csv', '13-md']

base_path = r"G:\hddcode\tools"

OLD_TEXT = """> ⚠️ **개발 시작 전 필독!**
> 전역 개발 가이드: [`../_template/README.md`](../_template/README.md)
> Phase 1 버그 및 체크리스트 확인 필수!"""

NEW_TEXT = """> ⚠️ **개발 시작 전 필독!**
> 전역 개발 가이드: [`../_template/README.md`](../_template/README.md)
> Phase 1 버그, 체크리스트, 크로스 프로모션 도구 버튼 구현 확인 필수!"""

success_count = 0
skip_count = 0
error_count = 0

for service in PHASE2_SERVICES:
    readme_path = os.path.join(base_path, service, "README.md")

    if not os.path.exists(readme_path):
        print(f"[SKIP] {service} - README.md not found")
        skip_count += 1
        continue

    try:
        with open(readme_path, 'r', encoding='utf-8') as f:
            content = f.read()

        if OLD_TEXT in content:
            new_content = content.replace(OLD_TEXT, NEW_TEXT)

            with open(readme_path, 'w', encoding='utf-8') as f:
                f.write(new_content)

            print(f"[OK] {service} updated successfully")
            success_count += 1
        else:
            print(f"[SKIP] {service} - old text not found")
            skip_count += 1

    except Exception as e:
        print(f"[ERROR] {service} - {str(e)}")
        error_count += 1

print(f"\n=== Summary ===")
print(f"Success: {success_count}")
print(f"Skipped: {skip_count}")
print(f"Errors: {error_count}")
