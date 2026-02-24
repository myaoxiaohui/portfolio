// AI实验室功能模块
class AILab {
    constructor() {
        this.currentTab = 'websites';
        this.isAnimating = false;
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

        // 图片点击事件（委托）
        document.addEventListener('click', (e) => {
            if (e.target.closest('.image-card img')) {
                const card = e.target.closest('.image-card');
                this.openLightbox(card);
            }
        });

        // 视频播放事件（委托）
        document.addEventListener('click', (e) => {
            if (e.target.closest('.play-button')) {
                const card = e.target.closest('.video-card');
                this.openVideoModal(card);
            }
        });

        // Lightbox关闭事件
        document.getElementById('lightbox').addEventListener('click', (e) => {
            if (e.target.id === 'lightbox' || e.target.closest('.lightbox-close')) {
                this.closeLightbox();
            }
        });

        // 视频模态框关闭事件
        document.getElementById('video-modal').addEventListener('click', (e) => {
            if (e.target.id === 'video-modal' || e.target.closest('.video-modal-close')) {
                this.closeVideoModal();
            }
        });

        // ESC键关闭模态框
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeLightbox();
                this.closeVideoModal();
            }
        });

        // 提示词切换事件（委托）
        document.addEventListener('click', (e) => {
            if (e.target.closest('.prompt-toggle')) {
                const toggle = e.target.closest('.prompt-toggle');
                this.togglePrompt(toggle);
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
        currentPanel.style.transform = 'translateY(20px)';

        setTimeout(() => {
            // 隐藏当前面板
            currentPanel.classList.remove('active');
            currentPanel.style.opacity = '';
            currentPanel.style.transform = '';

            // 显示新面板
            newPanel.classList.add('active');
            newPanel.style.opacity = '0';
            newPanel.style.transform = 'translateY(20px)';

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
        }, 400);

        this.currentTab = tab;
    }

    // 渲染网站项目
    renderWebsites() {
        const container = document.getElementById('websites-grid');
        if (!container || !window.aiLabData) return;

        container.innerHTML = window.aiLabData.websites.map(website => `
            <div class="website-card">
                <img src="${website.banner}" alt="${website.title}" class="website-banner">
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
                </div>
                <div class="image-info">
                    <h3 class="image-title">${image.title}</h3>
                    <div class="image-tool">
                        <span class="tool-label">生成工具</span>
                        <span class="tool-tag">${image.tool}</span>
                    </div>
                    <div class="prompt-section">
                        <div class="prompt-toggle">
                            <i data-lucide="sparkles" class="prompt-icon"></i>
                            <span>查看提示词</span>
                            <i data-lucide="chevron-down" class="chevron-icon"></i>
                        </div>
                        <div class="prompt-text">${image.prompt}</div>
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
                <div class="video-thumbnail">
                    <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
                    <div class="play-button">
                        <i data-lucide="play"></i>
                    </div>
                </div>
                <div class="video-info">
                    <h3 class="video-title">${video.title}</h3>
                    <p class="video-description">${video.description}</p>
                </div>
            </div>
        `).join('');

        this.initLucideIcons();
    }

    // 打开Lightbox
    openLightbox(card) {
        const index = card.dataset.index;
        const image = window.aiLabData.images[index];
        
        if (!image) return;

        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxTitle = document.getElementById('lightbox-title');
        const lightboxTool = document.getElementById('lightbox-tool');
        const lightboxPrompt = document.getElementById('lightbox-prompt');

        lightboxImage.src = image.url;
        lightboxImage.alt = image.title;
        lightboxTitle.textContent = image.title;
        lightboxTool.textContent = `工具：${image.tool}`;
        lightboxPrompt.textContent = image.prompt;

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // 关闭Lightbox
    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // 打开视频模态框
    openVideoModal(card) {
        const index = card.dataset.videoIndex;
        const video = window.aiLabData.videos[index];
        
        if (!video) return;

        const modal = document.getElementById('video-modal');
        const player = document.getElementById('video-player');
        const source = player.querySelector('source');
        
        source.src = video.videoUrl;
        player.load();

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // 自动播放
        setTimeout(() => {
            player.play().catch(() => {
                // 自动播放可能被阻止，不处理错误
            });
        }, 300);
    }

    // 关闭视频模态框
    closeVideoModal() {
        const modal = document.getElementById('video-modal');
        const player = document.getElementById('video-player');
        
        player.pause();
        player.currentTime = 0;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // 切换提示词显示
    togglePrompt(toggle) {
        const promptSection = toggle.closest('.prompt-section');
        const promptText = promptSection.querySelector('.prompt-text');
        const chevron = toggle.querySelector('.chevron-icon');
        
        promptText.classList.toggle('show');
        
        // 旋转箭头图标
        if (promptText.classList.contains('show')) {
            chevron.style.transform = 'rotate(180deg)';
            toggle.querySelector('span').textContent = '收起提示词';
        } else {
            chevron.style.transform = 'rotate(0deg)';
            toggle.querySelector('span').textContent = '查看提示词';
        }
    }

    // 复制提示词
    copyPrompt() {
        const promptText = document.getElementById('lightbox-prompt').textContent;
        
        navigator.clipboard.writeText(promptText).then(() => {
            // 显示复制成功提示
            const btn = document.querySelector('.copy-prompt-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i data-lucide="check"></i> 已复制';
            
            lucide.createIcons();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                lucide.createIcons();
            }, 2000);
        }).catch(() => {
            // 降级方案
            const textArea = document.createElement('textarea');
            textArea.value = promptText;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            const btn = document.querySelector('.copy-prompt-btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i data-lucide="check"></i> 已复制';
            
            lucide.createIcons();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                lucide.createIcons();
            }, 2000);
        });
    }
}

// 全局函数供HTML调用
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

function closeLightbox() {
    if (aiLabInstance) aiLabInstance.closeLightbox();
}

function closeVideoModal() {
    if (aiLabInstance) aiLabInstance.closeVideoModal();
}

function copyPrompt() {
    if (aiLabInstance) aiLabInstance.copyPrompt();
}

// 导出模块供其他脚本使用
window.AILab = AILab;