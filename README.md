# Valentine's Day Website - Setup & Running Guide

## 🚀 Quick Start

### Option 1: Using Python (Recommended for simplicity)

1. Open Terminal and navigate to your project folder:
   ```bash
   cd /Users/danielgarcia-barnett/Desktop/Coding/alison_valentines
   ```

2. Start a Python HTTP server:
   ```bash
   python3 -m http.server 8000
   ```

3. Open your browser and go to:
   ```
   http://localhost:8000
   ```

4. To stop the server, press `Ctrl+C` in the terminal

---

### Option 2: Using Node.js (if you have it installed)

1. Navigate to your project:
   ```bash
   cd /Users/danielgarcia-barnett/Desktop/Coding/alison_valentines
   ```

2. Install a simple server (if not already installed):
   ```bash
   npm install -g http-server
   ```

3. Start the server:
   ```bash
   http-server
   ```

4. Open your browser to the URL shown (usually `http://localhost:8000` or `http://localhost:8080`)

---

### Option 3: Using PHP (if you have it installed)

1. Navigate to your project:
   ```bash
   cd /Users/danielgarcia-barnett/Desktop/Coding/alison_valentines
   ```

2. Start the PHP server:
   ```bash
   php -S localhost:8000
   ```

3. Open your browser and go to:
   ```
   http://localhost:8000
   ```

---

## 📁 Project Structure

```
alison_valentines/
├── index.html           # Main HTML file
├── styles.css          # All styling (pastel Valentine's theme)
├── script.js           # All JavaScript logic
├── ASSETS_REQUIRED.md  # List of assets needed
├── README.md           # This file
└── assets/
    ├── images/         # Place PNG/JPG images here
    ├── videos/         # Place MP4 videos here
    └── audio/          # Place MP3 audio files here
```

---

## ✨ Features Implemented

### Part 1: Valentine's Question
- ✅ Initial "Will you be my Valentine?" prompt
- ✅ "Yes" button proceeds to quiz
- ✅ "No" button evades the mouse cursor
- ✅ Tracking of attempts (shows attempt count)
- ✅ Images appear every 5 attempts
- ✅ Audio plays with each image
- ✅ After 20 attempts, escalates to next question

### Part 2: "So you hate me?" Question
- ✅ Same evasive "No" button mechanics
- ✅ Escalating images every 5 attempts
- ✅ After 20 attempts, escalates to final question

### Part 3: "Does your mom know you're gay?" Question
- ✅ Either answer shows cat laughing image
- ✅ Proceeds to quiz after 2-second delay

### Quiz Section (9 Questions)
- ✅ **Question 1**: Cat's name
  - Don't answer correctly at first
  - Hover over bottom-right corner for hint
  - Correct answer: "Feline General Meowkora"
  - After 5 seconds, shows "Try hovering over here" text

- ✅ **Question 2**: Favorite beverage
  - Multiple correct answers with different responses
  - A (Diet Coke): "Wow, the boringly correct answer smh 🤓"
  - B (Milk): "Only if it's Alison's Milk 😌"
  - D (Alison's Milk): "Mmm mommy's milk 🥛🤤"

- ✅ **Question 3**: Best video game
  - Different responses for each answer

- ✅ **Questions 4-5**: Greatest rival
  - Evasive logic: only correct answer (D. Thea) proceeds
  - Others show "Try Again"

- ✅ **Questions 6-7**: Watch meme edit
  - Displays MP4 video

- ✅ **Question 8**: Nationality
  - A (Costa Rican): "The bare minimum 🥰"
  - Others: IRS tax evasion joke

- ✅ **Question 9**: Who are you?
  - All answers are correct
  - Easter egg: hover over bottom-right for "Erwin Smith" option
  - Selecting Erwin plays special video edit

### Final Section
- ✅ Congratulations message
- ✅ "I guess I'll be your Valentine" message

---

## 🎨 Design Features

- **Pastel Valentine's Color Palette**:
  - Primary Pink (#FFB6D9)
  - Soft Purple (#E0BBE4)
  - Pale Blue (#D5F4E6)
  - And more!

- **Smooth Animations**:
  - Fade-in effects for text
  - Slide-up animations for images
  - Smooth button transitions
  - Evasive button physics

- **Responsive Design**:
  - Works on desktop and mobile
  - Touch-friendly buttons
  - Adapts to different screen sizes

- **Modern UI**:
  - Gradient backgrounds
  - Glassmorphism effect on containers
  - Soft shadows
  - Clean typography

---

## 🔧 Troubleshooting

### Assets Not Loading?
- Make sure file names match EXACTLY (case-sensitive)
- Verify files are in the correct folders:
  - Images: `assets/images/`
  - Videos: `assets/videos/`
  - Audio: `assets/audio/`
- Check browser console (F12) for error messages

### "Port already in use" error?
- Try a different port: `python3 -m http.server 9000`
- Then visit `http://localhost:9000`

### Page not loading?
- Make sure you're using a modern browser (Chrome, Firefox, Safari, Edge)
- Clear browser cache (Cmd+Shift+Delete on Mac)
- Try in incognito mode

### Button not evading?
- The evasion logic requires JavaScript to be enabled
- Try refreshing the page

---

## 📝 Notes

- The website works entirely locally - no server-side processing needed
- All logic is in `script.js` - you can modify responses, questions, or behavior there
- Colors/styling can be customized in `styles.css`
- The layout will automatically scale to fit the browser window

---

## 🎁 What You Need to Add

See `ASSETS_REQUIRED.md` for the complete list of:
- 8 escalation images
- 1 cat laughing image
- 2 mp4 videos
- 4 audio files

---

## 📞 Tips for Testing

1. **Test on actual device**: Open on Alison's laptop/phone to test mouse/touch interactions
2. **Test without assets**: The site works fine without all assets (for flow testing)
3. **Modify responses**: Edit `quizData` array in `script.js` to customize questions/answers
4. **Test evasive button**: Hover over the "No" button - it should jump away!
5. **Test easter eggs**: Hover over the bottom-right corner on questions 1 and 9

---

## 💝 Have Fun!

This should make for an adorable, interactive Valentine's Day gift. Good luck! 💕
