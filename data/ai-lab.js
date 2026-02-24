/**
 * AI 实验室数据配置文件
 * 
 * 使用说明：
 * 1. 直接修改下方的数据对象即可更新展示内容
 * 2. 图片/视频可以使用网络URL或本地路径（如 "./images/xxx.jpg"）
 * 3. 添加新内容：在对应数组中复制一个对象并修改即可
 */

const aiLabData = {
  // ==================== AI 网站项目 ====================
  websites: [
    {
      title: "AI 智能课件生成助手",
      description: "基于 Dify 搭建的自动化课件生成工具，支持智能内容编排与多媒体插入，帮助教研团队将课件制作效率提升近90%。",
      banner: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=400&fit=crop",
      link: "https://example.com/demo1",
      tags: ["Dify", "LLM", "教育"]
    },
    {
      title: "AI 运营助手平台", 
      description: "基于 RAG 技术的智能问答系统，支持条件判断、变量引用的动态知识库，实现AI+客服+顾问协同服务模式。",
      banner: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      link: "https://example.com/demo2",
      tags: ["RAG", "GPT/Qwen", "智能客服"]
    },
    {
      title: "裂变海报智能生成器",
      description: "基于 AI 的自动化海报设计工具，运营人员输入文案即可生成精美海报，设计效率提升超50%。",
      banner: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop",
      link: "https://example.com/demo3",
      tags: ["AI 绘图", "自动化", "设计"]
    },
    {
      title: "智能作业批改系统",
      description: "AI自动批改+外包协作模式，实现私域场景作业自动收集与批改，覆盖率达93%，单题成本控制在5分钱以内。",
      banner: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
      link: "https://example.com/demo4",
      tags: ["AI+外包", "OCR", "教育"]
    }
  ],

  // ==================== AI 生成图片 ====================
  images: [
    {
      title: "未来 AI 教育场景",
      tool: "Midjourney v6",
      prompt: "A futuristic AI-powered classroom with holographic teachers, students wearing AR glasses, interactive 3D learning materials floating in air, warm lighting, modern minimalist architecture, 8k resolution, cinematic composition",
      url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&h=600&fit=crop"
    },
    {
      title: "AI 产品经理工作空间",
      tool: "Midjourney v6", 
      prompt: "Modern AI product manager workspace with multiple curved monitors showing data dashboards and AI interfaces, holographic wireframes, clean desk setup, soft ambient lighting, professional atmosphere, photorealistic",
      url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=800&fit=crop"
    },
    {
      title: "智能体网络架构",
      tool: "Midjourney v6",
      prompt: "Abstract visualization of AI agents network, multiple glowing nodes connected by flowing data streams, blue and purple gradient, futuristic tech aesthetic, dark background, 3D render",
      url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=600&fit=crop"
    },
    {
      title: "AI 低代码平台界面",
      tool: "DALL-E 3",
      prompt: "Clean and modern low-code AI platform interface design, drag-and-drop workflow builder, component library sidebar, visual node connections, professional SaaS UI, light theme, high fidelity mockup",
      url: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=450&fit=crop"
    },
    {
      title: "教育数据可视化",
      tool: "Midjourney v6",
      prompt: "Beautiful education analytics dashboard with floating charts and graphs, student performance metrics visualization, gradient colors blue and teal, modern glassmorphism design, dark mode interface",
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=750&fit=crop"
    },
    {
      title: "AI 客服交互场景",
      tool: "Midjourney v6",
      prompt: "Friendly AI chatbot interface with speech bubbles, customer service scene, warm orange and blue color palette, modern flat design, human-AI collaboration concept art, clean background",
      url: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=500&fit=crop"
    }
  ],

  // ==================== AI 生成视频 ====================
  videos: [
    {
      title: "AI 产品宣传短片",
      description: "使用 Runway Gen-2 生成，展示 AI 教育产品的核心功能与使用场景，视觉风格现代简约。",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=340&fit=crop"
    },
    {
      title: "智能体工作流演示",
      description: "展示 AI Agent 矩阵协同工作流程的动画演示，使用 After Effects + AI 工具制作。",
      videoUrl: "https://www.w3schools.com/html/movie.mp4", 
      thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=340&fit=crop"
    },
    {
      title: "AI 运营场景模拟",
      description: "模拟 AI + 人工协同服务的真实工作场景，展示智能问答与人工介入的无缝衔接。",
      videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumbnail: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=340&fit=crop"
    }
  ]
};

// 导出为全局变量供HTML使用
window.aiLabData = aiLabData;
