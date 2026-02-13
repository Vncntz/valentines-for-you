let noClicks = 0;
let lastNoClick = 0;
let backgroundHeartCount = 0;
const MAX_BACKGROUND_HEARTS = 8;

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const question = document.getElementById("question");

const noMessages = [
    "AWW WHY?",
    "PLEASE SAY YES! 🥺",
    "System error: 'No' not recognized. 🤔",
    "Are you sure? (Hint: it's YES) ",
    ":(",
    "Final answer? (Hint: it's YES) 😊"
];

const sadMessages = [
    "Di mo na ba ko love",
    "I hete you",
    "My Heart is breaking into pieces ",
    "🥺",
    "No love at all",
    "Awtss",
    "Siguro di mo na talaga ako mahal",
    "Aray Ko",
    "Tatalon na lang ako sa building",
    "Yung heart ko na shattered"
];

function createSadMessage(message) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("sad-message");
    messageDiv.textContent = message;
    messageDiv.style.left = Math.random() * 60 + 20 + "vw";
    messageDiv.style.animationDuration = (4 + Math.random() * 2) + "s";
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => messageDiv.remove(), 6000);
}

function createSadGif() {
    const sadGif = document.createElement("img");
    const randomGifNumber = Math.floor(Math.random() * 10) + 1;
    sadGif.src = `gif/${randomGifNumber}.gif`;
    
    sadGif.onerror = function() {
        const fallback = document.createElement("div");
        fallback.textContent = "💔";
        fallback.style.fontSize = "150px";
        fallback.classList.add("sad-gif");
        fallback.style.left = sadGif.style.left;
        fallback.style.animationDuration = sadGif.style.animationDuration;
        sadGif.replaceWith(fallback);
    };
    
    sadGif.classList.add("sad-gif");
    sadGif.style.left = Math.random() * 80 + 10 + "vw";
    sadGif.style.animationDuration = (6 + Math.random() * 2) + "s";
    
    document.body.appendChild(sadGif);
    
    setTimeout(() => sadGif.remove(), 8500);
}

function createCryingEmoji() {
    const emoji = document.createElement("div");
    emoji.classList.add("crying-emoji");
    emoji.textContent = "😢";
    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.animationDuration = (2 + Math.random() * 1) + "s";
    emoji.style.fontSize = (20 + Math.random() * 20) + "px";
    
    document.body.appendChild(emoji);
    
    setTimeout(() => emoji.remove(), 3500);
}

function createBrokenHeart() {
    const heart = document.createElement("div");
    heart.classList.add("broken-heart");
    heart.textContent = "💔";
    heart.style.left = "50%";
    heart.style.top = "50%";
    
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 2000);
}

function createButtonTrail(x, y) {
    const trail = document.createElement("div");
    trail.classList.add("button-trail");
    trail.textContent = "💨";
    trail.style.left = x + "px";
    trail.style.top = y + "px";
    
    document.body.appendChild(trail);
    
    setTimeout(() => trail.remove(), 1000);
}

function shakeScreen() {
    document.body.style.animation = "shake 0.5s";
    setTimeout(() => {
        document.body.style.animation = "";
    }, 500);
}

function darkenBackground() {
    const overlay = document.createElement("div");
    overlay.classList.add("dark-overlay");
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.style.opacity = "0";
        setTimeout(() => overlay.remove(), 500);
    }, 800);
}

noBtn.addEventListener("click", () => {
    const now = Date.now();
    if (now - lastNoClick < 300) return;
    lastNoClick = now;
    
    noClicks++;
    
    if (noClicks <= sadMessages.length) {
        createSadMessage(sadMessages[noClicks - 1]);
    }
    
    createSadGif();
    createBrokenHeart();
    shakeScreen();
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => createCryingEmoji(), i * 100);
    }
    
    if (noClicks >= 2) {
        darkenBackground();
    }
    
    if (noClicks >= 3) {
        setTimeout(() => createSadGif(), 500);
    }
    
    if (noClicks >= 5) {
        setTimeout(() => createSadGif(), 1000);
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createCryingEmoji(), i * 150);
        }
    }

    if (noClicks <= noMessages.length) {
        question.textContent = noMessages[noClicks - 1];
    }

    const yesScale = 1 + (noClicks * 0.2);
    yesBtn.style.transform = `scale(${Math.min(yesScale, 2.5)})`;

    if (noClicks >= 2) {
        const noScale = 1 - (noClicks * 0.1);
        noBtn.style.transform = `scale(${Math.max(noScale, 0.5)})`;
    }

    if (noClicks >= 3) {
        noBtn.style.position = "absolute";
        noBtn.style.transition = "all 0.3s ease";
        
        const currentX = noBtn.offsetLeft + noBtn.offsetWidth / 2;
        const currentY = noBtn.offsetTop + noBtn.offsetHeight / 2;
        
        const btnWidth = noBtn.offsetWidth || 80;
        const btnHeight = noBtn.offsetHeight || 40;
        
        const padding = 50;
        const maxX = Math.max(padding, window.innerWidth - btnWidth - padding);
        const maxY = Math.max(padding, window.innerHeight - btnHeight - padding);
        
        const minX = padding;
        const minY = padding;
        
        const randomX = minX + Math.random() * (maxX - minX);
        const randomY = minY + Math.random() * (maxY - minY);
        
        createButtonTrail(currentX, currentY);
        
        noBtn.style.left = randomX + "px";
        noBtn.style.top = randomY + "px";
    }

    if (noClicks >= 6) {
        noBtn.style.opacity = "0";
        noBtn.style.pointerEvents = "none";
        question.textContent = "There's only one choice now... ❤️";
    }
});

noBtn.addEventListener("mouseenter", () => {
    if (noClicks >= 3) {
        const hoverMessages = [
            "Why are you running from love? 😭",
            "You can't escape destiny! 💫",
            "This is just making it worse... 😢",
            "Stop running from your feelings! 💔",
            "The more you run, the sadder I get... 🥺"
        ];
        const randomMessage = hoverMessages[Math.floor(Math.random() * hoverMessages.length)];
        createSadMessage(randomMessage);
        
        createSadGif();
        createCryingEmoji();
        
        const currentX = noBtn.offsetLeft + noBtn.offsetWidth / 2;
        const currentY = noBtn.offsetTop + noBtn.offsetHeight / 2;
        
        const btnWidth = noBtn.offsetWidth || 80;
        const btnHeight = noBtn.offsetHeight || 40;
        
        const padding = 50;
        const maxX = Math.max(padding, window.innerWidth - btnWidth - padding);
        const maxY = Math.max(padding, window.innerHeight - btnHeight - padding);
        
        const minX = padding;
        const minY = padding;
        
        const randomX = minX + Math.random() * (maxX - minX);
        const randomY = minY + Math.random() * (maxY - minY);
        
        createButtonTrail(currentX, currentY);
        
        noBtn.style.left = randomX + "px";
        noBtn.style.top = randomY + "px";
    }
});

yesBtn.addEventListener("click", () => {
    localStorage.setItem('valentineAnswer', 'yes');
    localStorage.setItem('valentineDate', new Date().toISOString());
    
    // Redirect to gift countdown page instead of letter countdown
    setTimeout(() => {
        window.location.href = 'gift-countdown.html';
    }, 7000);
    
    document.body.innerHTML = `
        <div class='success-message'>
            <h1>You just made my 2026 perfect! ❤️</h1>
            <p style="font-size: 1.2rem; margin: 20px 0; font-style: italic; opacity: 0.9;">
                "You are the best thing that's ever been mine.<br>
                <span style="font-size: 0.9rem;">- Taylor Swift</span>
            </p>
            <p>I knew you'd say yes! 💕</p>
            <p style="font-size: 1rem; margin-top: 20px; opacity: 0.8;">Preparing your surprise...</p>
        </div>
    `;
    
    document.body.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)";
    document.body.style.backgroundSize = "400% 400%";
    document.body.style.animation = "gradientShift 15s ease infinite";
    
    const heartInterval = setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("celebration");
        
        const heartColors = ["❤️", "💕", "💖", "💗", "💓", "💝"];
        heart.textContent = heartColors[Math.floor(Math.random() * heartColors.length)];
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = (2 + Math.random() * 2) + "s";
        
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 4000);
    }, 150);
    
    setTimeout(() => clearInterval(heartInterval), 2000);
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement("div");
            confetti.classList.add("confetti");
            
            const colors = ["#ff4d6d", "#ffd700", "#ff69b4", "#87ceeb", "#98fb98", "#dda0dd"];
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = (20 + Math.random() * 60) + "vw";
            confetti.style.animationDuration = (2 + Math.random() * 2) + "s";
            confetti.style.animationDelay = (Math.random() * 0.5) + "s";
            
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }
});

function createBackgroundHeart() {
    if (backgroundHeartCount >= MAX_BACKGROUND_HEARTS) return;
    
    backgroundHeartCount++;
    
    const heart = document.createElement("div");
    heart.classList.add("bg-heart");
    const hearts = ["❤️", "💕", "💖", "💗", "💝"];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (15 + Math.random() * 10) + "s";
    heart.style.fontSize = (15 + Math.random() * 15) + "px";
    heart.style.opacity = 0.3 + Math.random() * 0.3;
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
        backgroundHeartCount--;
    }, 30000);
}

setInterval(createBackgroundHeart, 5000);

for (let i = 0; i < 5; i++) {
    setTimeout(createBackgroundHeart, i * 1000);
}

window.addEventListener('load', () => {
    const previousAnswer = localStorage.getItem('valentineAnswer');
    const answerDate = localStorage.getItem('valentineDate');
    
    if (previousAnswer === 'yes' && answerDate) {
        const date = new Date(answerDate);
        const daysSince = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));
        
        if (daysSince < 30) {
            const reminder = document.createElement('div');
            reminder.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(255, 77, 109, 0.9);
                color: white;
                padding: 15px 20px;
                border-radius: 15px;
                font-size: 14px;
                z-index: 1000;
                backdrop-filter: blur(10px);
                animation: slideIn 0.5s ease-out;
            `;
            reminder.textContent = `💕 You said YES ${daysSince} day${daysSince !== 1 ? 's' : ''} ago!`;
            document.body.appendChild(reminder);
            
            setTimeout(() => {
                reminder.style.opacity = '0';
                reminder.style.transition = 'opacity 1s';
                setTimeout(() => reminder.remove(), 1000);
            }, 5000);
        }
    }
});
