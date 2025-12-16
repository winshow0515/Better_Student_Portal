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
                <li><strong>課業壓力：</strong>高中課業比想像中重很多，尤其是數理科目，如果基礎不好會很辛苦。</li>
                <li><strong>時間管理：</strong>社團、課業、興趣要平衡真的不容易，常常睡眠不足。</li>
                <li><strong>通勤問題：</strong>如果住得遠，每天通勤會消耗很多體力和時間。</li>
                <li><strong>人際關係：</strong>適應新環境、認識新朋友需要時間，一開始會有點孤單。</li>
            </ul>
            
            <h3>但也有好的地方</h3>
            <ul>
                <li>學校設備其實不錯，圖書館、實驗室都滿完善的</li>
                <li>老師大部分都很認真負責，願意幫助學生</li>
                <li>社團活動豐富，可以認識很多朋友</li>
                <li>校園環境還算舒適，綠化做得不錯</li>
            </ul>
            
            <h3>給學弟妹的建議</h3>
            <p><strong>1. 做好心理準備：</strong>高中跟國中真的差很多，要有吃苦的心理準備。</p>
            <p><strong>2. 提早規劃：</strong>想清楚自己的目標，是要考大學還是技職體系，早點規劃比較不會慌。</p>
            <p><strong>3. 保持運動習慣：</strong>身體健康很重要，不要只顧讀書忘了運動。</p>
            <p><strong>4. 尋求幫助：</strong>遇到困難不要硬撐，找老師、同學或家人討論。</p>
            
            <h3>結語</h3>
            <p>雖然標題是勸退指南，但其實每個學校都有優缺點，重要的是找到適合自己的節奏。加油！</p>
        `
    },
    article2: {
        title: "校園生活小撇步",
        content: `
            <h2>校園生活小撇步</h2>
            <p><em>作者：熱心學姐</em></p>
            
            <h3>讓校園生活過得舒服一點的小技巧</h3>
            
            <h3>📚 學習篇</h3>
            <ul>
                <li><strong>找到好位置：</strong>圖書館三樓靠窗的位置採光好又安靜，適合讀書。</li>
                <li><strong>善用零碎時間：</strong>等公車、午休前10分鐘都可以拿來背單字或複習。</li>
                <li><strong>組讀書會：</strong>找幾個認真的同學一起讀，互相督促效果更好。</li>
                <li><strong>筆記整理：</strong>用不同顏色的筆做筆記，複習時更容易抓重點。</li>
            </ul>
            
            <h3>🍱 飲食篇</h3>
            <ul>
                <li><strong>避開人潮：</strong>午餐提早5分鐘或晚5分鐘去買，可以省很多排隊時間。</li>
                <li><strong>帶水壺：</strong>學校飲水機的水質不錯，帶水壺可以省錢又環保。</li>
                <li><strong>健康飲食：</strong>福利社的炸物雖然好吃，但不要天天吃，對身體不好。</li>
                <li><strong>校外美食：</strong>學校後門的小吃店CP值很高，偶爾可以去換換口味。</li>
            </ul>
            
            <h3>🚌 交通篇</h3>
            <ul>
                <li><strong>校車路線：</strong>記得下載校車時刻表，遲到可以少很多次。</li>
                <li><strong>腳踏車停車：</strong>早上7:20前到，停車場還有位置，太晚就要停很遠。</li>
                <li><strong>雨天準備：</strong>在置物櫃多放一把傘和一件外套，以備不時之需。</li>
            </ul>
            
            <h3>😴 生活篇</h3>
            <ul>
                <li><strong>午休時間：</strong>中午一定要睡一下，下午才有精神上課。</li>
                <li><strong>社團選擇：</strong>高一可以多嘗試，高二再確定要專注的社團。</li>
                <li><strong>建立人脈：</strong>多認識學長姐，他們的經驗分享很寶貴。</li>
                <li><strong>保持整潔：</strong>置物櫃定期整理，東西比較好找也不會遺失。</li>
            </ul>
            
            <h3>💡 特別提醒</h3>
            <p><strong>1. 校規要熟：</strong>知道哪些事情可以做、哪些不行，可以避免很多麻煩。</p>
            <p><strong>2. 善用資源：</strong>學校有很多資源（圖書館、諮商室、電腦教室），要多加利用。</p>
            <p><strong>3. 時間規劃：</strong>用手機行事曆記錄作業、考試，不會忘記也比較不會累積壓力。</p>
            
            <h3>結語</h3>
            <p>高中三年說長不長、說短不短，找到適合自己的節奏，日子會過得比較順利。希望這些小撇步能幫到大家！</p>
        `
    },
    article3: {
        title: "職科證照攻略",
        content: `
            <h2>職科證照攻略</h2>
            <p><em>作者：資訊科學長</em></p>
            
            <h3>證照到底有什麼用？</h3>
            <p>很多人問「考證照有用嗎？」，答案是：<strong>看你怎麼用</strong>。</p>
            
            <h3>證照的實際用途</h3>
            <ul>
                <li><strong>升學加分：</strong>技優甄審、甄選入學可以加分，某些證照甚至可以直接保送。</li>
                <li><strong>就業優勢：</strong>畢業後找工作，證照是證明能力的最直接方式。</li>
                <li><strong>自我提升：</strong>準備證照的過程中，會學到很多實用技能。</li>
                <li><strong>學習歷程：</strong>可以放進學習歷程檔案，證明你的專業能力。</li>
            </ul>
            
            <h3>值得考的證照（資訊科為例）</h3>
            
            <h3>1️⃣ 必考證照</h3>
            <ul>
                <li><strong>丙級技術士：</strong>電腦軟體應用、網頁設計等，這是基本中的基本。</li>
                <li><strong>TQC：</strong>文書處理、簡報製作等，實用性很高。</li>
            </ul>
            
            <h3>2️⃣ 推薦證照</h3>
            <ul>
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