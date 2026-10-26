from pathlib import Path

from PIL import Image


SOURCE = Path('/home/ubuntu/webdev-static-assets/ea-logo-v5.webp')
OUTPUT = Path('/home/ubuntu/webdev-static-assets/ea-logo-v5-pdf.png')


def main():
    image = Image.open(SOURCE).convert('RGBA')
    alpha = image.getchannel('A')
    bounds = alpha.getbbox()
    if bounds:
        image = image.crop(bounds)
    image.thumbnail((1200, 430), Image.Resampling.LANCZOS)
    image.save(OUTPUT, 'PNG', optimize=True)
    print(OUTPUT)


if __name__ == '__main__':
    main()
