// ======== 倒數計時功能 ========
const countdowns = [
    {
        id: "countdown-end",
        targetDate: new Date("2025-12-20T00:00:00"),
        endMessage: "時間到！一帶米扛幾樓 🎉"
    },
    {
        id: "countdown-mock",
        targetDate: new Date("2025-12-23T00:00:00"),
        endMessage: "模擬考開始！全力以赴！💪"
    },
    {
        id: "countdown-xuece",
        targetDate: new Date("2026-01-17T00:00:00"),
        endMessage: "學測開始！相信自己！🌟"
    },
    {
        id: "countdown-tongshe",
        targetDate: new Date("2026-04-25T00:00:00"),
        endMessage: "統測開始！加油！💪"
    },
    {
        id: "countdown-huike",
        targetDate: new Date("2026-05-16T00:00:00"),
        endMessage: "會考開始！努力！📚"
    }
];

function updateCountdown(countdown) {
    const countdownEl = document.getElementById(countdown.id);
    if (!countdownEl) return;
    
    const now = new Date();
    const diff = countdown.targetDate - now;
    
    if (diff <= 0) {
        countdownEl.textContent = countdown.endMessage;
        countdownEl.style.fontSize = "1.5rem";
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    
    countdownEl.textContent = `${days} 天 ${hours} 小時 ${minutes} 分 ${seconds} 秒`;
}

function updateAllCountdowns() {
    countdowns.forEach(countdown => updateCountdown(countdown));
}

// 初始化所有倒數計時
updateAllCountdowns();
setInterval(updateAllCountdowns, 1000);

// ======== 倒數計時輪播功能 ========
let currentSlide = 0;
const track = document.querySelector('.countdown-track');
const slides = document.querySelectorAll('.countdown-card');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;
let autoSlideInterval;

function updateTrackPosition() {
    // 計算軌道應該移動的距離
    const offset = -currentSlide * 100; // 每張卡片佔 100% 寬度
    track.style.transform = `translateX(${offset}%)`;
    
    // 更新指示器
    indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function showSlide(index) {
    // 處理索引邊界
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }
    
    updateTrackPosition();
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function prevSlide() {
    showSlide(currentSlide - 1);
}

// 自動輪播
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000); // 每 5 秒切換
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// 初始化輪播
updateTrackPosition();
startAutoSlide();

// 按鈕控制
document.getElementById('nextBtn').addEventListener('click', () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide(); // 重新開始自動輪播
});

document.getElementById('prevBtn').addEventListener('click', () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
});

// 指示器點擊
indicators.forEach(indicator => {
    indicator.addEventListener('click', () => {
        const index = parseInt(indicator.getAttribute('data-index'));
        showSlide(index);
        stopAutoSlide();
        startAutoSlide();
    });
});

// 滑鼠懸停時暫停自動輪播
const countdownWrapper = document.querySelector('.countdown-wrapper');
countdownWrapper.addEventListener('mouseenter', stopAutoSlide);
countdownWrapper.addEventListener('mouseleave', startAutoSlide);

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
});

// ======== 學長姐文章功能 ========
const articles = {
    article1: {
        title: "勸退指南",
        content: `
            <h2>勸退指南</h2>
            <p><em>作者：某位學長</em></p>
            
            <h3>前言</h3>
            <p>入學第一週我就後悔了，但既然都來了，就分享一些經驗給學弟妹參考。</p>
            
            <h3>為什麼會後悔？</h3>
            <ul>
                <li><strong>老舊的電腦教室設備：</strong>我讀的明明是最需要電腦的資訊科，用的電腦居然還在 Win7 ！年紀都快比我大了</li>
                剩下交給馬同學來寫
            </ul>
            
        `
    },
    article2: {
        title: "毛毛的葉子",
        content: `
            <h2>毛毛的葉子</h2>
            <p><em>作者：某位不願透露姓名的學姐</em></p>
            
            <h3>不要亂拔學校的植被</h3>
            
            <ul>
                學校星光大道旁的停車場靠近車道的那一排植物，有毛毛的葉子耶！好好摸o((>ω< ))o<br>
                尤其是剛長出來的嫩葉會更軟一點<br><br>

                蛤？你問我為什麼會知道，嗯~我才不是那種會亂拔學校植物的人呢
            </ul>
        `
    },
    article3: {
        title: "職科證照攻略",
        content: `
            <h2>職科證照攻略</h2>
            <h3>證照到底有什麼用？</h3>
            <p>很多人問「考證照有用嗎？」，答案是：<strong>看你怎麼用</strong>。</p>

            <h3>證照的實際用途</h3>
            <ul>
                <li><strong>升學加分：</strong>技優甄審、甄選入學可以加分，某些證照甚至可以直接保送。</li>
                <li><strong>就業優勢：</strong>畢業後找工作，證照是證明能力的最直接方式。</li>
                <li><strong>自我提升：</strong>準備證照的過程中，會學到很多實用技能。</li>
                <li><strong>學習歷程：</strong>可以放進學習歷程檔案，證明你的專業能力。</li>
            </ul>

            <h3>資訊科</h3>
            <p><em>作者：資訊科學姐(雖然她只剩最後一屆學妹了)</em></p>
            
            <h3>值資訊科得考的證照</h3>
            
            <h3>1️⃣ 必考證照</h3>
            <ul>
                <li><strong>工業電子丙級技術士：</strong></br>這證照是資訊科學生的第一張丙級證照，也是你未來考乙級證照的敲門磚。</br>
                乍看之下牠涵蓋了基本的電路知識好像很困難，但是拿到它你只需要會：焊接、基本的串並聯計算、基本的示波器操作就夠了</li>
            </ul>
            
            <h3>2️⃣ 推薦證照</h3>
            <ul>
                <li><strong>電腦硬體裝修丙級技術士：</strong></br>
                把電腦拆開再組回去，然後灌Windows10，調整一些一般使用者不會去管的東西，VirtualBox 裡裝 Ubuntu 20 再調一些奇怪的設定就好了</br>
                每個步驟單獨來看都不難，困難的點就是步驟真得又多又繁雜，只要熟能生巧應該就可以考到，尤其慈幼考場不會在最麻煩的 Ubuntu 那裡指定其他要求</li>

                <li><strong>網路架設丙級技術士：</strong></br>台南沒有考場，不建議考</li>
                <li><strong>乙級技術士：</strong>難度高但含金量也高，升學很加分。</li>
                <li><strong>APCS：</strong>程式檢定，對資訊科系升學很有幫助。</li>
                <li><strong>英文證照：</strong>多益、全民英檢等，不只職科生，普通科也很需要。</li>
            </ul>
            
            <h3>3️⃣ 進階證照</h3>
            <ul>
                <li><strong>專業證照：</strong>如 Adobe、Microsoft 等國際認證。</li>
                <li><strong>語言證照：</strong>日檢、韓檢等，看個人興趣和需求。</li>
            </ul>
            
            <h3>怎麼準備證照考試？</h3>
            
            <h3>📖 準備策略</h3>
            <ol>
                <li><strong>了解考試範圍：</strong>先看考古題，知道會考什麼。</li>
                <li><strong>分配時間：</strong>不要臨時抱佛腳，提早2-3個月開始準備。</li>
                <li><strong>實作練習：</strong>光看書沒用，一定要實際操作。</li>
                <li><strong>組讀書會：</strong>找同學一起準備，互相討論問題。</li>
                <li><strong>善用資源：</strong>學校通常會開輔導課，一定要去上。</li>
            </ol>
            
            <h3>💰 考證照的成本</h3>
            <p>大部分丙級證照報名費約1000-2000元，乙級會更貴一些。但學校通常會補助，記得問一下教務處或實習處。</p>
            
            <h3>⏰ 什麼時候考比較好？</h3>
            <ul>
                <li><strong>高一下：</strong>可以考一些簡單的丙級證照，建立信心。</li>
                <li><strong>高二：</strong>挑戰乙級或比較難的證照。</li>
                <li><strong>高三上：</strong>最後衝刺，補足還缺的證照。</li>
                <li><strong>高三下：</strong>專心準備升學，不建議再考新的證照。</li>
            </ul>
            
            <h3>❌ 常見錯誤</h3>
            <ul>
                <li>只顧考證照，忽略學校課業（成績還是很重要）</li>
                <li>考太多用不到的證照（要有策略地選擇）</li>
                <li>沒有實際應用證照學到的技能（考完就忘了）</li>
            </ul>
            
            <h3>結語</h3>
            <p>證照不是萬能，但沒有證照會少很多機會。重點是要<strong>選對證照、認真準備、實際應用</strong>。加油，祝大家都能考到理想的證照！</p>
        `
    }
};

// 開啟文章視窗
function openArticle(articleId) {
    const modal = document.getElementById('articleModal');
    const content = document.getElementById('articleContent');
    const article = articles[articleId];
    
    if (article) {
        content.innerHTML = article.content;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // 防止背景滾動
    }
}

// 關閉文章視窗
function closeArticle() {
    const modal = document.getElementById('articleModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto'; // 恢復滾動
}

// 點擊視窗外部關閉
document.addEventListener('click', (e) => {
    const modal = document.getElementById('articleModal');
    if (e.target === modal) {
        closeArticle();
    }
});

// ESC 鍵關閉視窗
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeArticle();
    }
});