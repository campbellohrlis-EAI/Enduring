"""Compare a revised DOCX text extraction with the prior editable Markdown export."""

from pathlib import Path
import difflib
import re

BASE = Path('/home/ubuntu/enduring-advantage/editable-site-content.md')
REVISED = Path('/home/ubuntu/enduring-advantage/revised-site-content.txt')
OUTPUT = Path('/home/ubuntu/enduring-advantage/revised-content-diff.txt')


def clean_markdown(line: str) -> str:
    line = line.strip()
    line = re.sub(r'^#{1,6}\s+', '', line)
    line = re.sub(r'^>\s?', '', line)
    line = re.sub(r'^[-*+]\s+', '', line)
    line = re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', line)
    line = line.replace('**', '').replace('`', '')
    return line.strip()


base_lines = [clean_markdown(line) for line in BASE.read_text(encoding='utf-8').splitlines()]
base_lines = [line for line in base_lines if line and line not in {'---', '***'}]
revised_lines = [line.strip() for line in REVISED.read_text(encoding='utf-8').splitlines() if line.strip()]

diff = difflib.unified_diff(
    base_lines,
    revised_lines,
    fromfile='editable-site-content.md (2026-08-14)',
    tofile='revised editable-site-content.docx',
    lineterm='',
    n=2,
)
OUTPUT.write_text('\n'.join(diff) + '\n', encoding='utf-8')
print(f'Wrote comparison to {OUTPUT}')
