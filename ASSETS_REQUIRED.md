# Valentine's Day Website - Required Assets

## Overview
This document lists all the media files you need to add to make the website fully functional. Simply add the files with the exact names specified to their corresponding folders.

---

## 📁 Image Assets
**Location:** `assets/images/`

### Escalation Images (Part 1 - "Will you be my Valentine?")
- `escalation_1.png` - Image shown after 5 failed "No" attempts
- `escalation_2.png` - Image shown after 10 failed attempts
- `escalation_3.png` - Image shown after 15 failed attempts
- `escalation_4.png` - Image shown after 20 failed attempts (highly recommend: cat with gun meme)

### Escalation Images (Part 2 - "So you hate me?")
- `escalation_5.png` - Image shown after 5 failed attempts on question 2
- `escalation_6.png` - Image shown after 10 failed attempts on question 2
- `escalation_7.png` - Image shown after 15 failed attempts on question 2
- `escalation_8.png` - Image shown after 20 failed attempts on question 2

### Special Images
- `cat_laughing.png` - Image shown after answering the "Does your mom know you're gay?" question

---

## 🎥 Video Assets
**Location:** `assets/videos/`

### Quiz Videos
- `6-7_meme_edit.mp4` - Video for questions 6-7 (the "6-7" meme edit you mentioned)
- `erwin_smith_edit.mp4` - Easter egg video for question 9 (plays when "B. Erwin Smith" is selected via hover)

---

## 🔊 Audio Assets
**Location:** `assets/audio/`

### Escalation Sounds
- `escalation_1.mp3` - Sound played after 5 failed attempts (e.g., vine boom, shotclock buzzer)
- `escalation_2.mp3` - Sound played after 10 failed attempts
- `escalation_3.mp3` - Sound played after 15 failed attempts
- `escalation_4.mp3` - Sound played after 20 failed attempts

---

## 📋 Summary Table

| Type | File | Purpose |
|------|------|---------|
| Image | escalation_1.png | Part 1: 5 attempts meme |
| Image | escalation_2.png | Part 1: 10 attempts meme |
| Image | escalation_3.png | Part 1: 15 attempts meme |
| Image | escalation_4.png | Part 1: 20 attempts meme (cat with gun) |
| Image | escalation_5.png | Part 2: 5 attempts meme |
| Image | escalation_6.png | Part 2: 10 attempts meme |
| Image | escalation_7.png | Part 2: 15 attempts meme |
| Image | escalation_8.png | Part 2: 20 attempts meme |
| Image | cat_laughing.png | Gay question result |
| Video | 6-7_meme_edit.mp4 | Questions 6-7 |
| Video | erwin_smith_edit.mp4 | Question 9 easter egg |
| Audio | escalation_1.mp3 | Sound after 5 attempts |
| Audio | escalation_2.mp3 | Sound after 10 attempts |
| Audio | escalation_3.mp3 | Sound after 15 attempts |
| Audio | escalation_4.mp3 | Sound after 20 attempts |

---

## 🎨 Image Recommendations
- **escalation_1-4**: Funny memes for each escalation. The 4th one should be the cat with gun meme you mentioned
- **escalation_5-8**: Continue the escalation pattern (funny reaction images)
- **cat_laughing.png**: A funny cat laughing image (like a cat laughing at something funny)

## 🔊 Audio Recommendations
- **escalation_1**: Vine boom or funny fail sound
- **escalation_2**: Another funny effect (shotclock buzzer, etc.)
- **escalation_3**: Different funny sound effect
- **escalation_4**: Ultimate funny sound (maybe gunshot or dramatic sound)

---

## 🚀 How to Use
1. Create the folder structure:
   ```
   assets/
   ├── images/
   ├── videos/
   └── audio/
   ```
   ✅ (Already created!)

2. Download/create your media files and name them EXACTLY as specified above

3. Place them in their corresponding folders

4. Open `index.html` in your browser (or run locally with Python/Node server)

5. The website will automatically reference these assets!

---

## 💡 Tips
- **Image Format**: PNG, JPG, or GIF all work fine
- **Video Format**: MP4 is recommended (most compatible)
- **Audio Format**: MP3 is recommended
- **File Sizes**: Keep images under 5MB and videos under 50MB for smooth loading
- **Dimensions**: Images should ideally be at least 600px wide for best display

---

## 🔧 Testing Without Assets
The website will still load and work even if assets are missing. Missing images will show as broken image icons, and missing videos/audio will be silently skipped. This is great for testing the flow before you have all assets!
