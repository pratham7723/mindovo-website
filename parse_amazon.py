from bs4 import BeautifulSoup
import sys

file_path = "mindovo Bollywood Trivia Card Game for Parties | Fast-Paced Guessing Game for Parties, Game Nights &.html"
with open(file_path, 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f, 'html.parser')

print("--- Product Details ---")
# Title
title = soup.find('span', id='productTitle')
if title:
    print(f"Title: {title.text.strip()}")

# Bullet points
print("\n--- Bullet Points ---")
feature_bullets = soup.find('div', id='feature-bullets')
if feature_bullets:
    bullets = feature_bullets.find_all('li')
    for b in bullets:
        text = b.text.strip()
        if text:
            print(f"- {text}")

# Description
print("\n--- Description ---")
desc = soup.find('div', id='productDescription')
if desc:
    print(desc.text.strip())

# Images
print("\n--- Images ---")
img_div = soup.find('div', id='imgTagWrapperId')
if img_div:
    img = img_div.find('img')
    if img:
        print(f"Main Image: {img.get('src')}")
        
# A+ content text and images (if any)
print("\n--- A+ Content ---")
aplus = soup.find('div', id='aplus')
if aplus:
    for img in aplus.find_all('img'):
        print(f"A+ Image: {img.get('src')} - Alt: {img.get('alt')}")
    for text in aplus.find_all(['h3', 'h4', 'p']):
        t = text.text.strip()
        if t:
            print(f"A+ Text: {t}")
            
# Main image gallery
print("\n--- Alt Images ---")
gallery = soup.find('div', id='altImages')
if gallery:
    for img in gallery.find_all('img'):
        src = img.get('src')
        if src and not src.endswith('.gif'):
            print(f"Alt Image: {src}")

