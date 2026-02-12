// State variables
let attemptCount = 0;
let photoIndex = 0;
let lyricIndex = 0;

// Create floating hearts background
function createFloatingHearts() {
    const heartBg = document.getElementById('heartBg');
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
        heartBg.appendChild(heart);
        
        setTimeout(() => heart.remove(), 8000);
    }, 800);
}

// Move the "No" button to a random position
function moveButton() {
    const noBtn = document.getElementById('noBtn');     
    const gifElement = document.getElementById('statusGif');
    const counter = document.getElementById('attemptCounter');
    
    attemptCount++;
    counter.style.display = 'flex';
    counter.innerText = attemptCount;
    counter.style.animation = 'bounce 0.5s ease-in-out';
    
    noBtn.style.position = 'fixed'; 
    
    const padding = 50;
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - padding * 2) + padding;
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - padding * 2) + padding;
    
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
    noBtn.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';

    const randomIndex = Math.floor(Math.random() * gifs.length);
    gifElement.src = gifPath + gifs[randomIndex];

    showNotification();
    
    const yesBtn = document.getElementById('yesBtn');
    const currentScale = 1 + (attemptCount * 0.05);
    yesBtn.style.transform = `scale(${Math.min(currentScale, 1.5)})`;
}

// Show notification message
function showNotification() {
    const container = document.getElementById('notifContainer');
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.innerText = messages[Math.floor(Math.random() * messages.length)];
    container.appendChild(notif);

    setTimeout(() => {
        notif.style.animation = "fadeOut 0.6s forwards";
        setTimeout(() => notif.remove(), 600);
    }, 2500);
}

// Create confetti effect
function createConfetti() {
    const colors = ['#ff4d6d', '#ff6b9d', '#ffa4c0', '#ffccd5', '#fff0f5'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }, i * 20);
    }
}

// Create a floating photo in the gallery
function createFloatingPhoto() {
    const gallery = document.getElementById('photoGallery');
    const photo = document.createElement('img');
    photo.className = 'floating-photo';
    photo.src = photos[photoIndex % photos.length];
    
    // Random position
    const x = 20 + Math.random() * 60; // 20-80% of screen width
    const y = 20 + Math.random() * 60; // 20-80% of screen height
    photo.style.left = x + '%';
    photo.style.top = y + '%';
    
    // Random size
    const size = 250 + Math.random() * 200; // 250-450px
    photo.style.maxWidth = size + 'px';
    photo.style.maxHeight = size + 'px';
    
    // Random animation duration
    const duration = 12 + Math.random() * 6; // 12-18 seconds
    photo.style.animationDuration = duration + 's';
    
    // Random delay
    const delay = Math.random() * 2;
    photo.style.animationDelay = delay + 's';
    
    gallery.appendChild(photo);
    
    // Remove after animation completes
    setTimeout(() => {
        photo.remove();
    }, (duration + delay) * 1000);
    
    photoIndex++;
}

// Update the lyrics display
function updateLyrics() {
    const lyricsDisplay = document.getElementById('lyricsDisplay');
    
    // If we've reached the last message, keep it visible
    if (lyricIndex >= lyrics.length - 1) {
        lyricsDisplay.innerText = lyrics[lyrics.length - 1];
        lyricsDisplay.style.animation = 'none';
        lyricsDisplay.style.opacity = '1';
        lyricsDisplay.style.transform = 'translateX(-50%) translateY(0)';
        return;
    }
    
    lyricsDisplay.innerText = lyrics[lyricIndex];
    lyricIndex++;
}

// Main celebration function when "Yes" is clicked
function celebrate() {
    createConfetti();
    
    const questionContainer = document.getElementById('questionContainer');
    questionContainer.style.transition = 'opacity 1.5s ease-out';
    questionContainer.style.opacity = '0';
    
    setTimeout(() => {
        questionContainer.style.display = 'none';
        const photoGallery = document.getElementById('photoGallery');
        const musicControls = document.getElementById('musicControls');
        
        photoGallery.classList.add('active');
        musicControls.classList.add('active');
        
        // Auto-play music
        const audio = document.getElementById('backgroundMusic');
        audio.play().catch(e => {
            console.log('Auto-play prevented. User needs to click play button.');
        });
        
        // Start creating floating photos
        // Create first photo immediately
        createFloatingPhoto();
        
        // Create new photo every 5 seconds
        setInterval(createFloatingPhoto, 5000);
        
        // Update lyrics every 6 seconds
        updateLyrics();
        const lyricsInterval = setInterval(() => {
            updateLyrics();
            // Stop the interval when we reach the last message
            if (lyricIndex >= lyrics.length - 1) {
                clearInterval(lyricsInterval);
            }
        }, 6000);
        
    }, 1500);
}

// Music controls - toggle play/pause
function toggleMusic() {
    const audio = document.getElementById('backgroundMusic');
    const btn = document.getElementById('playPauseBtn');
    
    if (audio.paused) {
        audio.play();
        btn.innerText = '⏸';
    } else {
        audio.pause();
        btn.innerText = '▶';
    }
}

// Restart music from beginning
function restartMusic() {
    const audio = document.getElementById('backgroundMusic');
    audio.currentTime = 0;
    audio.play();
    document.getElementById('playPauseBtn').innerText = '⏸';
}

// Initialize floating hearts when page loads
window.addEventListener('load', () => {
    createFloatingHearts();
});
