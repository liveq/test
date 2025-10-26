#!/usr/bin/env python3
import os
import glob

# 추가할 JS 코드
TOOLS_BUTTON_JS = """
// 도구 버튼 초기화
const initToolsToggle = () => {
    const toolsToggle = document.getElementById('toolsToggle');

    if (toolsToggle) {
        // 툴팁 생성
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';

        // 현재 언어에 따라 툴팁 텍스트 설정
        const updateTooltipText = () => {
            const currentLang = document.body.getAttribute('data-lang') || 'ko';
            tooltip.textContent = currentLang === 'ko' ? '더 많은 도구' : 'More Tools';
        };

        updateTooltipText();
        toolsToggle.appendChild(tooltip);

        // 클릭 이벤트
        toolsToggle.addEventListener('click', () => {
            window.open('https://baal.co.kr', '_blank');
        });

        // 언어 변경 시 툴팁 업데이트
        const langToggle = document.getElementById('langToggle');
        if (langToggle) {
            langToggle.addEventListener('click', () => {
                setTimeout(updateTooltipText, 0);
            });
        }
    }
};

// 푸터 BAAL 링크 툴팁 초기화
const initFooterTooltip = () => {
    const footerLink = document.querySelector('.footer-brand a');

    if (footerLink) {
        // 툴팁 생성
        const tooltip = document.createElement('span');
        tooltip.className = 'tooltip';

        // 현재 언어에 따라 툴팁 텍스트 설정
        const updateTooltipText = () => {
            const currentLang = document.body.getAttribute('data-lang') || 'ko';
            tooltip.textContent = currentLang === 'ko' ? '더 많은 도구' : 'More Tools';
        };

        updateTooltipText();
        footerLink.appendChild(tooltip);

        // 마우스 호버 이벤트
        footerLink.addEventListener('mouseenter', () => {
            tooltip.classList.add('show');
        });

        footerLink.addEventListener('mouseleave', () => {
            tooltip.classList.remove('show');
        });

        // 언어 변경 시 툴팁 업데이트
        const langToggle = document.getElementById('langToggle');
        if (langToggle) {
            langToggle.addEventListener('click', () => {
                setTimeout(updateTooltipText, 0);
            });
        }
    }
};
"""

# 제외할 서비스
EXCLUDE = []

# G:\hddcode\tools 디렉토리에서 모든 _common/common.js 파일 찾기
base_path = r"G:\hddcode\tools"
js_files = glob.glob(os.path.join(base_path, "*/_common/common.js"))

success_count = 0
skip_count = 0
error_count = 0

for js_file in js_files:
    # 서비스 이름 추출
    service_name = os.path.basename(os.path.dirname(os.path.dirname(js_file)))

    # 제외 목록에 있으면 건너뛰기
    if service_name in EXCLUDE:
        print(f"[SKIP] {service_name} (excluded)")
        skip_count += 1
        continue

    try:
        # 파일 읽기
        with open(js_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # 이미 도구 버튼이 있는지 확인
        if 'initToolsToggle' in content:
            print(f"[SKIP] {service_name} (already has tools button)")
            skip_count += 1
            continue

        # "// DOM이 로드되면 초기화" 바로 앞에 함수 추가
        search_text = "// DOM이 로드되면 초기화"

        if search_text in content:
            new_content = content.replace(
                search_text,
                TOOLS_BUTTON_JS + "\n" + search_text
            )

            # DOMContentLoaded 이벤트 핸들러에 함수 호출 추가
            # "initLangToggle();" 다음에 추가
            search_text2 = "    initLangToggle();\n});"

            if search_text2 in new_content:
                new_content = new_content.replace(
                    search_text2,
                    "    initLangToggle();\n    initToolsToggle();\n    initFooterTooltip();\n});"
                )

                # 파일 쓰기
                with open(js_file, 'w', encoding='utf-8') as f:
                    f.write(new_content)

                print(f"[OK] {service_name} updated successfully")
                success_count += 1
            else:
                print(f"[ERROR] {service_name} - Could not find DOMContentLoaded insertion point")
                error_count += 1
        else:
            print(f"[ERROR] {service_name} - Could not find function insertion point")
            error_count += 1

    except Exception as e:
        print(f"[ERROR] {service_name} - {str(e)}")
        error_count += 1

print(f"\n=== Summary ===")
print(f"Success: {success_count}")
print(f"Skipped: {skip_count}")
print(f"Errors: {error_count}")
