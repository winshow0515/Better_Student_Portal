// ======== 倒數計時功能 ========
const targetDate = new Date("2025-12-20T00:00:00");
const countdownEl = document.getElementById("countdown-display");

function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;
    
    if (diff <= 0) {
        countdownEl.textContent = "時間到！一帶米扛幾樓 🎉";
        countdownEl.style.fontSize = "2rem";
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    
    countdownEl.textContent = `${days} 天 ${hours} 小時 ${minutes} 分 ${seconds} 秒`;
}

// 初始化倒數計時
updateCountdown();
setInterval(updateCountdown, 1000);

// ======== 深色模式切換 ========
const toggleBtn = document.getElementById('toggleTheme');
const themeIcon = document.getElementById('theme-icon');

// 檢查本地儲存的主題設定
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themeIcon.textContent = '☀️';
}

// 主題切換事件
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    
    // 更新圖示
    themeIcon.textContent = isDark ? '☀️' : '🌙';
    
    // 儲存主題設定到本地
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// ======== 平滑滾動效果 ========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ======== 卡片進入視窗動畫 ========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 觀察所有卡片
document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});

// ======== 導覽列滾動效果 ========
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // 增加陰影效果
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
    }
    
    lastScroll = currentScroll;
});

// ======== 控制台訊息 ========
console.log('%c長榮高級中學學生專區', 'color: #3366cc; font-size: 20px; font-weight: bold;');
console.log('%c製作：終焉曲折波動體 🚀', 'color: #66a3ff; font-size: 14px;');
console.log('%c如果你看到這裡，歡迎一起改進這個網站！', 'color: #999; font-size: 12px;');

// ======== 頁面載入完成 ========
window.addEventListener('load', () => {
    console.log('✅ 網頁載入完成');
    
    // 可以在這裡加入其他初始化功能
});