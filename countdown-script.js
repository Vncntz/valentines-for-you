// Target date: February 14, 2026 at 8:00 PM
const targetDate = new Date('2026-02-14T08:00:00').getTime();

// Get elements
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const letterWrapper = document.getElementById('letterWrapper');
const lockIcon = document.getElementById('lockIcon');
const lockMessage = document.getElementById('lockMessage');

let isUnlocked = false;

// Create floating background hearts
function createBackgroundHeart() {
    const heart = document.createElement('div');
    heart.textContent = ['❤️', '💖', '💗', '💘', '💝'][Math.floor(Math.random() * 5)];
    heart.style.cssText = `
        position: fixed;
        font-size: ${15 + Math.random() * 15}px;
        left: ${Math.random() * 100}vw;
        pointer-events: none;
        z-index: 1;
        opacity: ${0.3 + Math.random() * 0.3};
        animation: floatUpSlow ${15 + Math.random() * 10}s linear forwards;
    `;
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 30000);
}

// Generate background hearts
setInterval(createBackgroundHeart, 5000);
for (let i = 0; i < 5; i++) {
    setTimeout(createBackgroundHeart, i * 1000);
}

// Create sparkles around letter when unlocked
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.textContent = '✨';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 2000);
}

// Create celebration burst
function createCelebrationBurst() {
    const emojis = ['🎉', '🎊', '✨', '💕', '💖', '💝', '🌟'];
    const rect = letterWrapper.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const burst = document.createElement('div');
            burst.classList.add('celebration-burst');
            burst.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            burst.style.left = centerX + 'px';
            burst.style.top = centerY + 'px';
            
            // Random direction
            const angle = (Math.PI * 2 * i) / 12;
            const distance = 100 + Math.random() * 100;
            const finalX = centerX + Math.cos(angle) * distance;
            const finalY = centerY + Math.sin(angle) * distance;
            
            burst.style.setProperty('--final-x', finalX + 'px');
            burst.style.setProperty('--final-y', finalY + 'px');
            
            document.body.appendChild(burst);
            
            setTimeout(() => burst.remove(), 1000);
        }, i * 50);
    }
}

// Update countdown
function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Display with leading zeros
    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
    
    // Check if countdown is over
    if (distance < 0 && !isUnlocked) {
        unlockLetter();
    }
}

// Unlock the letter
function unlockLetter() {
    isUnlocked = true;
    
    // Update display
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    
    // Unlock the letter
    letterWrapper.classList.add('unlocked');
    lockMessage.textContent = 'The letter is unlocked! Click to open.';
    
    // Create celebration effect
    createCelebrationBurst();
    
    // Create sparkles
    const rect = letterWrapper.getBoundingClientRect();
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const x = rect.left + Math.random() * rect.width;
            const y = rect.top + Math.random() * rect.height;
            createSparkle(x, y);
        }, i * 100);
    }
    
    // Save unlock state
    localStorage.setItem('letterUnlocked', 'true');
    localStorage.setItem('unlockDate', new Date().toISOString());
    
    // Make letter clickable
    letterWrapper.style.cursor = 'pointer';
    letterWrapper.addEventListener('click', openLetter);
}

// Open letter (redirect to letter page)
function openLetter() {
    if (!isUnlocked) {
        // Shake animation if trying to open locked letter
        letterWrapper.style.animation = 'shake 0.5s';
        setTimeout(() => {
            letterWrapper.style.animation = '';
        }, 500);
        return;
    }
    
    // Redirect to letter page
    window.location.href = 'letter.html';
}

// Add click listener for locked letter too (for shake effect)
letterWrapper.addEventListener('click', () => {
    if (!isUnlocked) {
        letterWrapper.style.animation = 'shake 0.5s';
        setTimeout(() => {
            letterWrapper.style.animation = '';
        }, 500);
    }
});

// Check if letter was already unlocked
window.addEventListener('load', () => {
    const wasUnlocked = localStorage.getItem('letterUnlocked');
    const unlockDate = localStorage.getItem('unlockDate');
    const now = new Date().getTime();
    
    // For testing: uncomment the line below to force unlock
    // unlockLetter();
    
    // Only unlock if the target date has actually been reached
    if (now >= targetDate) {
        if (wasUnlocked === 'true' && unlockDate) {
            unlockLetter();
        }
    }
});

// Update countdown every second
setInterval(updateCountdown, 1000);

// Initial call
updateCountdown();

// Easter egg: Type "unlock" to manually unlock (for testing)
let typedKeys = '';
document.addEventListener('keypress', (e) => {
    typedKeys += e.key;
    if (typedKeys.includes('unlock')) {
        unlockLetter();
        typedKeys = '';
    }
    // Clear after 2 seconds
    setTimeout(() => {
        typedKeys = '';
    }, 2000);
});
