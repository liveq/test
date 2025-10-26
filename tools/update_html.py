#!/usr/bin/env python3
import os
import glob
import re

# 추가할 HTML 코드
TOOLS_BUTTON_HTML = """            <button id="toolsToggle" title="더 많은 도구">
                🧰
            </button>"""

# 제외할 서비스
EXCLUDE = []

# G:\hddcode\tools 디렉토리에서 모든 index.html 파일 찾기
base_path = r"G:\hddcode\tools"
html_files = glob.glob(os.path.join(base_path, "*/index.html"))

success_count = 0
skip_count = 0
error_count = 0

for html_file in html_files:
    # 서비스 이름 추출
    service_name = os.path.basename(os.path.dirname(html_file))

    # 제외 목록에 있으면 건너뛰기
    if service_name in EXCLUDE or service_name == '_template':
        print(f"[SKIP] {service_name} (excluded)")
        skip_count += 1
        continue

    try:
        # 파일 읽기
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # 이미 도구 버튼이 있는지 확인
        if 'toolsToggle' in content:
            print(f"[SKIP] {service_name} (already has tools button)")
            skip_count += 1
            continue

        # langToggle 버튼 다음에 도구 버튼 추가
        # 패턴 1: inline 버튼 스타일
        pattern1 = r'(<button id="langToggle"[^>]*>[\s\S]*?</button>)'
        if re.search(pattern1, content):
            new_content = re.sub(
                pattern1,
                r'\1\n' + TOOLS_BUTTON_HTML,
                content
            )

            # 파일 쓰기
            with open(html_file, 'w', encoding='utf-8') as f:
                f.write(new_content)

            print(f"[OK] {service_name} updated successfully")
            success_count += 1
        else:
            print(f"[ERROR] {service_name} - Could not find langToggle button")
            error_count += 1

    except Exception as e:
        print(f"[ERROR] {service_name} - {str(e)}")
        error_count += 1

print(f"\n=== Summary ===")
print(f"Success: {success_count}")
print(f"Skipped: {skip_count}")
print(f"Errors: {error_count}")
