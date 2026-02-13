// Target date: February 13, 2026 at 8:00 PM
const targetDate = new Date('2026-02-13T22:00:00').getTime();

const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const countdownSection = document.getElementById('countdownSection');
const giftSection = document.getElementById('giftSection');
const voucherSection = document.getElementById('voucherSection');
const container = document.querySelector('.container');
const continueBtn = document.getElementById('continueBtn');

let isUnlocked = false;

// Update countdown
function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
    
    if (distance < 0 && !isUnlocked) {
        unlockGifts();
    }
}

// Unlock the gifts
function unlockGifts() {
    isUnlocked = true;
    
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    
    // Hide countdown, show gift selection
    countdownSection.style.display = 'none';
    giftSection.style.display = 'block';
    
    // Add click listeners to gift boxes
    const giftBoxes = document.querySelectorAll('.gift-box');
    giftBoxes.forEach(box => {
        box.addEventListener('click', () => openGift(box));
    });
    
    localStorage.setItem('giftsUnlocked', 'true');
}

// Open gift and show voucher (all gifts have the same voucher!)
function openGift(box) {
    // Prevent multiple clicks
    const allBoxes = document.querySelectorAll('.gift-box');
    allBoxes.forEach(b => b.style.pointerEvents = 'none');
    
    // Animate the selected box
    box.style.animation = 'giftOpen 0.5s ease-out forwards';
    
    // Create confetti
    createConfetti();
    
    // Show voucher after animation
    setTimeout(() => {
        // Hide the container completely
        container.style.display = 'none';
        
        // Show voucher section
        voucherSection.style.display = 'flex';
        voucherSection.style.justifyContent = 'center';
        voucherSection.style.alignItems = 'center';
        voucherSection.classList.add('show');
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Create confetti after voucher appears
        setTimeout(() => {
            createVoucherConfetti();
        }, 100);
    }, 500);
}

// Create confetti effect
function createConfetti() {
    const colors = ['#ff4d6d', '#ffd700', '#ff69b4', '#87ceeb', '#98fb98', '#dda0dd'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}vw;
                top: -10px;
                z-index: 999;
                animation: confettiFall ${2 + Math.random() * 2}s linear forwards;
            `;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }
}

// Create voucher confetti
function createVoucherConfetti() {
    const container = document.querySelector('.confetti-container');
    const emojis = ['🎉', '🎊', '✨', '💕', '💖', '💝', '🌟'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.cssText = `
                position: absolute;
                font-size: ${20 + Math.random() * 20}px;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: voucherConfetti ${2 + Math.random()}s ease-out forwards;
            `;
            container.appendChild(emoji);
            
            setTimeout(() => emoji.remove(), 3000);
        }, i * 100);
    }
}

// Continue button - redirects to letter countdown
continueBtn.addEventListener('click', () => {
    // Add fade out animation
    voucherSection.style.transition = 'opacity 0.5s ease-out';
    voucherSection.style.opacity = '0';
    
    setTimeout(() => {
        // Redirect to the letter countdown page
        window.location.href = 'countdown.html';
    }, 500);
});

// Check if gifts were already unlocked
window.addEventListener('load', () => {
    const wasUnlocked = localStorage.getItem('giftsUnlocked');
    
    // For testing: uncomment the line below to force unlock immediately
    // unlockGifts();
    
    if (wasUnlocked === 'true') {
        const now = new Date().getTime();
        if (now >= targetDate) {
            unlockGifts();
        }
    }
});

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Easter egg: Type "gift" to manually unlock
let typedKeys = '';
document.addEventListener('keypress', (e) => {
    typedKeys += e.key;
    if (typedKeys.includes('gift')) {
        unlockGifts();
        typedKeys = '';
    }
    // Test voucher display directly
    if (typedKeys.includes('test')) {
        console.log('Testing voucher display...');
        container.style.display = 'none';
        voucherSection.style.display = 'flex';
        voucherSection.style.justifyContent = 'center';
        voucherSection.style.alignItems = 'center';
        window.scrollTo(0, 0);
        typedKeys = '';
    }
    setTimeout(() => {
        typedKeys = '';
    }, 2000);
});

// Add fade out animation style
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Debug: Log when page loads
console.log('Gift countdown script loaded');
console.log('Voucher section element:', voucherSection);
console.log('Container element:', container);
