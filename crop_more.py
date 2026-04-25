import os
from PIL import Image

# Images to crop
images = [
    "images/cyber_hero.png",
    "images/cyber_what.png",
    "cyberbullying_trapped_screen_1777040393793.png",
    "cyberbullying_hope_support_1777040441639.png"
]

# We will crop an additional 35 pixels from the bottom
CROP_PIXELS = 35

for img_path in images:
    if os.path.exists(img_path):
        try:
            with Image.open(img_path) as img:
                width, height = img.size
                cropped_img = img.crop((0, 0, width, height - CROP_PIXELS))
                cropped_img.save(img_path)
                print(f"Successfully cropped further: {img_path}")
        except Exception as e:
            print(f"Error cropping {img_path}: {e}")
