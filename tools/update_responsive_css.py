#!/usr/bin/env python3
import os
import glob

# 추가할 반응형 CSS 코드
RESPONSIVE_CSS_UPDATE = """
    .theme-toggle, .lang-toggle, .tools-toggle {
        right: 10px;
    }

    .theme-toggle {
        top: 10px;
    }

    .lang-toggle {
        top: 70px;
    }

    .tools-toggle {
        top: 130px;
    }"""

# 원래 반응형 CSS
OLD_RESPONSIVE_CSS = """    .theme-toggle, .lang-toggle {
        right: 10px;
    }

    .theme-toggle {
        top: 10px;
    }

    .lang-toggle {
        top: 70px;
    }"""

# 제외할 서비스
EXCLUDE = []

# G:\hddcode\tools 디렉토리에서 모든 _common/common.css 파일 찾기
base_path = r"G:\hddcode\tools"
css_files = glob.glob(os.path.join(base_path, "*/_common/common.css"))

success_count = 0
skip_count = 0
error_count = 0

for css_file in css_files:
    # 서비스 이름 추출
    service_name = os.path.basename(os.path.dirname(os.path.dirname(css_file)))

    # 제외 목록에 있으면 건너뛰기
    if service_name in EXCLUDE:
        print(f"[SKIP] {service_name} (excluded)")
        skip_count += 1
        continue

    try:
        # 파일 읽기
        with open(css_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # 이미 반응형 도구 버튼이 있는지 확인
        if '.tools-toggle {\n        top: 130px;' in content:
            print(f"[SKIP] {service_name} (already has responsive tools button)")
            skip_count += 1
            continue

        # 반응형 섹션 업데이트
        if OLD_RESPONSIVE_CSS in content:
            new_content = content.replace(
                OLD_RESPONSIVE_CSS,
                RESPONSIVE_CSS_UPDATE
            )

            # 파일 쓰기
            with open(css_file, 'w', encoding='utf-8') as f:
                f.write(new_content)

            print(f"[OK] {service_name} updated successfully")
            success_count += 1
        else:
            print(f"[ERROR] {service_name} - Could not find responsive section")
            error_count += 1

    except Exception as e:
        print(f"[ERROR] {service_name} - {str(e)}")
        error_count += 1

print(f"\n=== Summary ===")
print(f"Success: {success_count}")
print(f"Skipped: {skip_count}")
print(f"Errors: {error_count}")
