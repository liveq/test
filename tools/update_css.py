#!/usr/bin/env python3
import os
import glob

# 추가할 CSS 코드
TOOLS_BUTTON_CSS = """
/* 도구 버튼 */
.tools-toggle {
    position: fixed;
    top: 140px;
    right: 20px;
    z-index: 1000;
}

.tools-toggle button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--bg-secondary);
    border: 2px solid var(--border-color);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
    box-shadow: var(--shadow-sm);
    transition: transform 0.2s;
    position: relative;
}

.tools-toggle button:hover {
    transform: scale(1.1);
}

/* 툴팁 스타일 */
.tooltip {
    position: absolute;
    background: rgba(0, 0, 0, 0.85);
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 0.85em;
    font-weight: 500;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.2s;
    z-index: 10001;
}

.tooltip.show {
    opacity: 1;
}

.tools-toggle button:hover .tooltip {
    opacity: 1;
}

/* 푸터 링크 툴팁 */
.footer-brand a {
    position: relative;
}

.footer-brand a .tooltip {
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 8px;
}
"""

# 제외할 서비스 (apart는 제외, 이미 수정한 05-qr, 07-json도 제외)
EXCLUDE = ['05-qr', '07-json']

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
        print(f"[SKIP] {service_name} (already updated)")
        skip_count += 1
        continue

    try:
        # 파일 읽기
        with open(css_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # 이미 도구 버튼이 있는지 확인
        if '/* 도구 버튼 */' in content:
            print(f"[SKIP] {service_name} (already has tools button)")
            skip_count += 1
            continue

        # 언어 전환 섹션 다음에 도구 버튼 섹션 삽입
        # "body[data-lang="ko"] .lang-en," 다음 줄 이후에 삽입
        search_text = "body[data-lang=\"ko\"] .lang-en,\nbody[data-lang=\"en\"] .lang-ko {\n    display: none;\n}"

        if search_text in content:
            new_content = content.replace(
                search_text,
                search_text + "\n" + TOOLS_BUTTON_CSS
            )

            # 파일 쓰기
            with open(css_file, 'w', encoding='utf-8') as f:
                f.write(new_content)

            print(f"[OK] {service_name} updated successfully")
            success_count += 1
        else:
            print(f"[ERROR] {service_name} - Could not find insertion point")
            error_count += 1

    except Exception as e:
        print(f"[ERROR] {service_name} - {str(e)}")
        error_count += 1

print(f"\n=== Summary ===")
print(f"Success: {success_count}")
print(f"Skipped: {skip_count}")
print(f"Errors: {error_count}")
