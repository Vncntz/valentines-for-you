# Love Question Interactive Page ❤️

A romantic interactive webpage that asks "LOVE MO BA AKO?" (Do you love me?) with playful animations and a special celebration sequence.

## Files Structure

```
project/
│
├── index.html          # Main HTML file
├── styles.css          # All CSS styles and animations
├── config.js           # Configuration (messages, photos, lyrics)
├── script.js           # JavaScript functionality
├── README.md           # This file
│
├── images/
│   └── gif/
│       ├── 1.gif
│       ├── 2.gif
│       ├── ...
│       └── 11.gif     # Default GIF
│
├── photos/
│   ├── photo1.jpg
│   ├── photo2.jpg
│   ├── ...
│   └── photo26.jpg
│
└── music/
    └── this-i-promise-you.mp3
```

## Features

1. **Interactive Question Screen**
   - Animated "Yes" and "No" buttons
   - Floating hearts background
   - Corner heart decorations
   - Pulsing container effect

2. **Playful "No" Button**
   - Moves to random positions when clicked
   - Shows random GIFs from the images/gif folder
   - Displays funny notification messages
   - Keeps count of rejection attempts
   - "Yes" button grows larger with each rejection

3. **Celebration Sequence** (when "Yes" is clicked)
   - Confetti animation
   - Smooth transition to photo gallery
   - Floating photos with random positions and sizes
   - Rotating romantic lyrics/messages
   - Background music with controls
   - Music player with play/pause and restart

## Setup Instructions

1. **Required Folders:**
   - Create `images/gif/` folder and add GIF files (1.gif through 11.gif)
   - Create `photos/` folder and add photos (photo1.jpg through photo26.jpg)
   - Create `music/` folder and add the song file: `this-i-promise-you.mp3`

2. **Customization:**
   - Edit `config.js` to change:
     - Notification messages
     - GIF filenames
     - Photo paths
     - Lyrics/romantic messages
   
3. **Run:**
   - Simply open `index.html` in a web browser
   - No server required!

## Customization Guide

### Change Messages
Edit the `messages` array in `config.js`:
```javascript
const messages = [
    "Your custom message 1",
    "Your custom message 2",
    // Add more...
];
```

### Change Photos
Update the `photos` array in `config.js` with your photo paths:
```javascript
const photos = [
    'photos/your-photo1.jpg',
    'photos/your-photo2.jpg',
    // Add more...
];
```

### Change Lyrics
Edit the `lyrics` array in `config.js`:
```javascript
const lyrics = [
    "Your custom lyric 1",
    "Your custom lyric 2",
    // Add more...
];
```

### Change Colors
Edit `styles.css` and search for color values like:
- `#ff4d6d` (main pink)
- `#ff6b9d` (lighter pink)
- `#ffeef8` (background)

### Change Music
Replace `music/this-i-promise-you.mp3` with your own song and update the HTML:
```html
<audio id="backgroundMusic" loop>
    <source src="music/your-song.mp3" type="audio/mpeg">
</audio>
```

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

Works on desktop and mobile devices!

## Notes

- The page is fully responsive
- Auto-play music may be blocked by browsers (user can click play button)
- All animations are CSS-based for smooth performance
- No external dependencies required

Enjoy! ❤️
