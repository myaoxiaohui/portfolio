// 页面交互功能

// 平滑滚动到指定区域
document.addEventListener('DOMContentLoaded', function() {
    // 初始化 Lucide 图标
    lucide.createIcons();
    
    // 导航链接平滑滚动
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 滚动时添加导航栏阴影效果
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
    
    // 数字动画效果
    const animateNumbers = () => {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(element => {
            const finalText = element.textContent;
            const hasPlus = finalText.includes('+');
            const hasPercent = finalText.includes('%');
            const hasTimes = finalText.includes('倍');
            
            let finalNumber = parseFloat(finalText.replace(/[^\d.]/g, ''));
            let currentNumber = 0;
            const increment = finalNumber / 50;
            
            const timer = setInterval(() => {
                currentNumber += increment;
                if (currentNumber >= finalNumber) {
                    currentNumber = finalNumber;
                    clearInterval(timer);
                    
                    let displayText = currentNumber.toString();
                    if (hasPlus) displayText += '+';
                    if (hasPercent) displayText += '%';
                    if (hasTimes) displayText += '倍';
                    if (finalText.includes('万')) displayText += '万';
                    
                    element.textContent = displayText;
                } else {
                    element.textContent = Math.floor(currentNumber) + (hasPlus ? '+' : '') + (hasPercent ? '%' : '') + (hasTimes ? '倍' : '') + (finalText.includes('万') ? '万' : '');
                }
            }, 50);
        });
    };
    
    // 当首屏进入视口时触发动画
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.unobserve(entry.target);
            }
        });
    });
    
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        observer.observe(heroSection);
    }
    
    // 时间轴动画
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        timelineObserver.observe(item);
    });
    

});

// PDF 下载功能
function downloadPDF() {
    // 创建PDF内容
    const pdfContent = `
姚小慧 - 资深AI产品经理
联系方式：155-4905-1706 | mia_xiaohui@163.com
教育背景：211计算机硕士

核心战绩：
• 5000万+ AI调用量
• 3000万+ GMV增量  
• 2.6倍人效提升

工作经历：

高途教育 (2021.05 - 至今) - 高级AI产品经理
• 主导企业级AI低代码PaaS基座，支撑几百个智能体运行
• 通过AI+SOP重构流程，人效提升2.6倍，GMV增量3000万+
• 连续两年绩效3.75，获公司级项目奖

金山办公 (2018.05 - 2020.04) - 产品经理  
• 负责WPS精品课全链路产品，驱动公众号粉丝从50万增长至150万
• 主导独立APP从0到1规划上线，ROI高达1:5

AI实验室成果：

AI基座平台 (PaaS)
• 将LLM、Agent等复杂技术封装为可视化组件
• 平均响应周期从2周缩短至2-3天
• 技术栈：Dify、Teable、RAG

增长型Agent矩阵
• 设计引导型与分层型Agent，实现精细化私域运营
• 消息回复率从65%提升至99%
• 技术栈：Agent、SOP、智能化

专业技能：
• AI产品管理 • 低代码平台 • 智能体设计
• SOP流程优化 • 数据驱动增长 • PaaS架构

奖项荣誉：
• 连续两年绩效3.75
• 2024/2025公司级项目奖
    `;
    
    // 创建Blob对象
    const blob = new Blob([pdfContent], { type: 'text/plain;charset=utf-8' });
    
    // 创建下载链接
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '姚小慧-资深AI产品经理-简历.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // 显示下载提示
    showNotification('PDF简历下载已开始！');
}

// 显示通知
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // 动画显示
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 3秒后自动隐藏
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 平滑滚动到顶部
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K 下载简历
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        downloadPDF();
    }
    
    // Ctrl/Cmd + ↑ 返回顶部
    if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowUp') {
        e.preventDefault();
        scrollToTop();
    }
});

// 添加返回顶部按钮
window.addEventListener('scroll', function() {
    let backToTop = document.querySelector('.back-to-top');
    
    if (!backToTop) {
        backToTop = document.createElement('button');
        backToTop.className = 'back-to-top';
        backToTop.innerHTML = '<i data-lucide="arrow-up"></i>';
        backToTop.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            background: var(--primary-color);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: var(--shadow-lg);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999;
        `;
        backToTop.onclick = scrollToTop;
        document.body.appendChild(backToTop);
        lucide.createIcons();
    }
    
    if (window.scrollY > 300) {
        backToTop.style.opacity = '1';
        backToTop.style.visibility = 'visible';
    } else {
        backToTop.style.opacity = '0';
        backToTop.style.visibility = 'hidden';
    }
});