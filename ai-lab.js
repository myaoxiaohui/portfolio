// AI实验室功能模块
class AILab {
    constructor() {
        this.currentTab = 'images';
        this.isAnimating = false;
        this.expandedCards = new Set(); // 跟踪已展开的卡片
        this.init();
    }

    init() {
        this.bindEvents();
        this.renderWebsites();
        this.renderImages();
        this.renderVideos();
        this.initLucideIcons();
    }

    // 初始化Lucide图标
    initLucideIcons() {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // 绑定事件
    bindEvents() {
        // Tab切换事件
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                this.switchTab(tab);
            });
        });

        // Prompt切换事件（委托）
        document.addEventListener('click', (e) => {
            if (e.target.closest('.prompt-toggle')) {
                const toggle = e.target.closest('.prompt-toggle');
                this.togglePrompt(toggle);
            }
        });

        // 复制提示词事件（委托）
        document.addEventListener('click', (e) => {
            if (e.target.closest('.copy-prompt-btn')) {
                const btn = e.target.closest('.copy-prompt-btn');
                this.copyPrompt(btn);
            }
        });
    }

    // Tab切换
    switchTab(tab) {
        if (this.isAnimating || tab === this.currentTab) return;

        this.isAnimating = true;

        // 更新Tab按钮状态
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });

        // 获取当前和新的面板
        const currentPanel = document.querySelector('.tab-panel.active');
        const newPanel = document.getElementById(`${tab}-panel`);

        // 淡出动画
        currentPanel.style.opacity = '0';
        currentPanel.style.transform = 'translateY(15px)';

        setTimeout(() => {
            // 隐藏当前面板
            currentPanel.classList.remove('active');
            currentPanel.style.opacity = '';
            currentPanel.style.transform = '';

            // 显示新面板
            newPanel.classList.add('active');
            newPanel.style.opacity = '0';
            newPanel.style.transform = 'translateY(15px)';

            // 淡入动画
            requestAnimationFrame(() => {
                newPanel.style.opacity = '1';
                newPanel.style.transform = 'translateY(0)';
                
                setTimeout(() => {
                    newPanel.style.opacity = '';
                    newPanel.style.transform = '';
                    this.isAnimating = false;
                }, 400);
            });
        }, 300);

        this.currentTab = tab;
    }

    // 渲染网站项目
    renderWebsites() {
        const container = document.getElementById('websites-grid');
        if (!container || !window.aiLabData) return;

        container.innerHTML = window.aiLabData.websites.map(website => `
            <div class="website-card">
                <img src="${website.banner}" alt="${website.title}" class="website-banner" loading="lazy">
                <div class="website-content">
                    <h3 class="website-title">${website.title}</h3>
                    <p class="website-description">${website.description}</p>
                    <div class="website-tags">
                        ${website.tags.map(tag => `<span class="website-tag">${tag}</span>`).join('')}
                    </div>
                    <a href="${website.link}" target="_blank" class="website-link">
                        <i data-lucide="external-link"></i>
                        查看项目
                    </a>
                </div>
            </div>
        `).join('');

        this.initLucideIcons();
    }

    // 渲染图片画廊
    renderImages() {
        const container = document.getElementById('images-masonry');
        if (!container || !window.aiLabData) return;

        container.innerHTML = window.aiLabData.images.map((image, index) => `
            <div class="image-card" data-index="${index}">
                <div class="image-wrapper">
                    <img src="${image.url}" alt="${image.title}" loading="lazy">
                    <div class="image-overlay">
                        <span class="image-category">${image.category}</span>
                    </div>
                </div>
                <div class="image-info">
                    <h3 class="image-title">${image.title}</h3>
                    <div class="image-meta">
                        <span class="meta-tag meta-style">${image.style}</span>
                        <span class="meta-tag meta-tool">${image.tool}</span>
                    </div>
                    <div class="prompt-section">
                        <div class="prompt-toggle" data-index="${index}">
                            <i data-lucide="sparkles" class="prompt-icon"></i>
                            <span>查看提示词</span>
                            <i data-lucide="chevron-down" class="chevron-icon"></i>
                        </div>
                        <div class="prompt-text" id="prompt-${index}">
                            ${image.prompt}
                            <button class="copy-prompt-btn" data-prompt="${this.escapeHtml(image.prompt)}">
                                <i data-lucide="copy"></i>
                                复制提示词
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        this.initLucideIcons();
    }

    // 渲染视频展示
    renderVideos() {
        const container = document.getElementById('videos-grid');
        if (!container || !window.aiLabData) return;

        container.innerHTML = window.aiLabData.videos.map((video, index) => `
            <div class="video-card" data-video-index="${index}">
                <div class="video-wrapper">
                    <video 
                        id="video-${index}"
                        poster="${video.thumbnail}"
                        preload="metadata"
                        controls
                    >
                        <source src="${video.videoUrl}" type="video/mp4">
                        您的浏览器不支持视频播放。
                    </video>
                </div>
                <div class="video-info">
                    <h3 class="video-title">${video.title}</h3>
                    <p class="video-description">${video.description}</p>
                </div>
            </div>
        `).join('');

        this.initLucideIcons();
    }

    // 转义HTML特殊字符
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // 切换提示词显示
    togglePrompt(toggle) {
        const index = toggle.dataset.index;
        const promptText = document.getElementById(`prompt-${index}`);
        const chevron = toggle.querySelector('.chevron-icon');
        const label = toggle.querySelector('span');
        
        const isExpanded = promptText.classList.contains('show');
        
        if (isExpanded) {
            promptText.classList.remove('show');
            chevron.style.transform = 'rotate(0deg)';
            label.textContent = '查看提示词';
            this.expandedCards.delete(index);
        } else {
            promptText.classList.add('show');
            chevron.style.transform = 'rotate(180deg)';
            label.textContent = '收起提示词';
            this.expandedCards.add(index);
        }
    }

    // 复制提示词
    copyPrompt(btn) {
        const promptText = btn.dataset.prompt;
        
        navigator.clipboard.writeText(promptText).then(() => {
            // 显示复制成功提示
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i data-lucide="check"></i> 已复制';
            btn.classList.add('copied');
            
            this.initLucideIcons();
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.classList.remove('copied');
                this.initLucideIcons();
            }, 2000);
        }).catch(() => {
            // 降级方案
            const textArea = document.createElement('textarea');
            textArea.value = promptText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i data-lucide="check"></i> 已复制';
            btn.classList.add('copied');
            
            this.initLucideIcons();
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.classList.remove('copied');
                this.initLucideIcons();
            }, 2000);
        });
    }
}

// 全局实例
let aiLabInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    const checkData = () => {
        if (window.aiLabData) {
            aiLabInstance = new AILab();
        } else {
            setTimeout(checkData, 100);
        }
    };
    checkData();
});

// 导出模块供其他脚本使用
window.AILab = AILab;
