import json, os, re
from time import sleep
from urllib.request import urlopen
from urllib.error import HTTPError

NPM_PKGS = [
    '@adamlui/geolocate',
    '@adamlui/minify.js',
    '@adamlui/programming-languages',
    '@adamlui/scss-to-css',
    '@kudoai/ai-personas',
    'computer-languages',
    'data-languages',
    'generate-ip',
    'generate-pw',
    'gulp-minify.js',
    'latin-locales',
    'markup-languages',
    'non-latin-locales',
    'project-markers',
    'prose-languages'
]
NPM_STATS_API_URL = 'https://api.npmjs.org/downloads/point/0000-01-01:9999-12-31/{pkg}'

def get_pkg_downloads(pkg: str, max_retries: int = 5, get_delay: int = 1) -> int:
    url = NPM_STATS_API_URL.format(pkg=pkg)
    for idx in range(max_retries):
        try:
            with urlopen(url) as resp : return int(json.load(resp).get('downloads', 0))
        except (HTTPError, ValueError) as err:
            retry_delay = (idx +1) * get_delay
            print(f'NPM [{pkg}] error: {err}. Retrying in {retry_delay}s...')
            sleep(retry_delay)
    print(f'NPM [{pkg}] failed after {max_retries} retries')
    return 0

def format_total(num: int) -> str:
    first_digit = str(num)[0] if num else '0'
    second_digit = str(num)[1] if num > 9 else '0'
    second_digit_rounded = '0' if int(second_digit) < 5 else '5'
    if num >= 1_000_000_000:
        formatted = f'{num // 1_000_000_000}'
        remainder = (num % 1_000_000_000) // 100_000_000
        if remainder: formatted += f'.{remainder}'
        return formatted + 'B+'
    elif num >= 10_000_000:
        return f'{(num // 1_000_000) * 1_000_000:,}+'
    elif num >= 1_000_000:
        return f'{first_digit},{second_digit}00,000+'
    elif num >= 100_000:
        return f'{first_digit}{second_digit_rounded}0,000+'
    elif num >= 10_000:
        return f'{first_digit}0,000+'
    elif num >= 1_000:
        formatted = f'{num // 1000}'
        remainder = (num % 1000) // 100
        if remainder: formatted += f'.{remainder}'
        return formatted + 'K'
    else:
        return str(num)

def read_file(file_path: str) -> list[str]:
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.readlines()

def write_file(file_path: str, lines: list[str]) -> None:
    with open(file_path, 'w', encoding='utf-8') as file:
        file.writelines(lines)

def update_downloads_shield(readme_path: str, downloads: int) -> bool:
    shield_re = r'(<img[^>]+src="https://img\.shields\.io/badge/[^-]+-)([\d,\.km\+]+)(-[a-f0-9]{6}\.svg(?:\?[^"]*)?)'
    lines = read_file(readme_path)
    downloads_str = format_total(downloads).lower()
    shield_updated = False
    for idx, line in enumerate(lines):
        match = re.search(shield_re, line)
        if match:
            start, end = match.start(2), match.end(2)
            new_line = line[:start] + downloads_str + line[end:]
            if new_line != line:
                lines[idx] = new_line
                shield_updated = True
                print(f'Updated → {new_line.strip()}')
    if shield_updated:
        write_file(readme_path, lines)
    return shield_updated

def find_readmes(root_dir: str) -> list[str]:
    readme_paths = []
    for dirpath, _, filenames in os.walk(root_dir):
        for filename in filenames:
            if filename.lower() == 'readme.md':
                readme_paths.append(os.path.join(dirpath, filename))
    return readme_paths

def main() -> None:
    total_downloads = 0
    for pkg in NPM_PKGS:
        npm_downloads = get_pkg_downloads(pkg)
        print(f'{pkg:30} {npm_downloads:,}')
        total_downloads += npm_downloads
    print('-' * 45)
    print(f'{"TOTAL DOWNLOADS":30} {total_downloads:,}\n')
    for readme_path in find_readmes('docs'):
        print(f'Updating {readme_path}...\n')
        shield_updated = update_downloads_shield(readme_path, total_downloads)
        print('Shield updated!' if shield_updated else 'No update needed.')
        print()

if __name__ == '__main__' : main()
