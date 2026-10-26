"""Extract visible paragraph text from a DOCX file for content-review purposes."""

from pathlib import Path
from zipfile import ZipFile
from xml.etree import ElementTree as ET

SOURCE = Path('/home/ubuntu/upload/editable-site-content.docx')
OUTPUT = Path('/home/ubuntu/enduring-advantage/revised-site-content.txt')
NS = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}

with ZipFile(SOURCE) as archive:
    document = ET.fromstring(archive.read('word/document.xml'))

lines: list[str] = []
for paragraph in document.findall('.//w:body//w:p', NS):
    text = ''.join(node.text or '' for node in paragraph.findall('.//w:t', NS)).strip()
    if text:
        lines.append(text)

OUTPUT.write_text('\n'.join(lines) + '\n', encoding='utf-8')
print(f'Extracted {len(lines)} paragraphs to {OUTPUT}')
