export type Locale = "en" | "zh";

export type AwardTranslation = {
  title: string;
  organization: string;
  description: string;
  award: string;
  certificateAlt?: string;
};

export type JourneyItem = {
  year: string;
  title: string;
  description: string;
};

export type ApItem = {
  subject: string;
  description: string;
  grade: string;
  scoreProofAlt: string;
};

export type ProjectItem = {
  title: string;
  description: string;
  tags: string[];
  category: "aiLearning" | "games" | "webApps";
  featured?: boolean;
};

const en = {
  lang: { en: "EN", zh: "中文", switchTo: "Switch to Chinese" },
  nav: {
    brand: "Junyu Ling",
    home: "Home",
    about: "About",
    journey: "Journey",
    achievements: "Academics",
    studyMaterials: "Materials",
    awards: "Awards",
    projects: "Projects",
    sections: "Site navigation",
    scrollAbout: "Scroll to about section",
  },
  theme: {
    light: "Switch to light mode",
    dark: "Switch to dark mode",
  },
  hero: {
    name: "Junyu Ling",
    collaborate: "Open to collaborate",
    location: "Shanghai · Age 17",
    role: "Student · Developer · Musician",
    highlights: [
      "AI-Native Builder",
      "Full-Stack & Mini Programs",
      "ABRSM Piano Grade 7",
    ],
    stats: {
      awards: "Awards",
      projects: "Projects",
      age: "Years Old",
    },
    viewProjects: "View Projects",
    awardsHonors: "Awards & Honors",
    taglines: [
      "IMMC International Outstanding Award (O Award)",
      "Building AI Desmos — applying to ZhenFund",
      "WeChat Global Innovation Challenge — Third Prize",
      "ABRSM Piano Grade 7 · Collaborative accompanist",
    ],
    skills: [
      "React",
      "TypeScript",
      "AI / AIGC",
      "Mathematical Modeling",
      "WeChat Mini Programs",
      "Product Design",
      "Desmos",
      "Physics",
      "Music",
      "ZhenFund — AI Desmos",
    ],
  },
  about: {
    title: "About Me",
    badge: "Get to Know Me",
    subtitle:
      "Developer by curiosity, musician by heart, host on stage.",
    pillars: ["Development", "Music", "Campus & Arts"],
    p1: "I'm Junyu Ling, a 17-year-old high school student from Shanghai with a deep passion for web development and computer science. I love exploring new technologies and turning creative ideas into functional projects.",
    p2: "Beyond coding, I'm passionate about music. I started learning piano at the age of 4.5 and have achieved Grade 7 in ABRSM Piano. Currently, I'm also learning the clarinet. In my free time, I often serve as a piano accompanist for children, finding joy and creative inspiration in collaborative performance.",
    p3: "I'm also deeply involved in school activities, frequently serving as a host for events like the Flag-Raising Ceremony, Sports Meet, and the New Year's Song and Dance Party. I enjoy collaborating with co-hosts to draft and refine scripts. Additionally, I actively participate in talent showcases such as the \"Sounds of Nature\" competition and school galas to share my artistic passion.",
    email: "Email",
    age: "Age",
    ageValue: "17 Years Old",
    status: "Status",
    statusValue: "Student & Self-taught Developer",
    music: "Music",
    musicValue: "ABRSM Piano Grade 7 | Learning Clarinet",
    profileAlt: "Junyu Ling",
  },
  journey: {
    badge: "Evolution of Skills",
    title: "My Coding Journey",
    subtitle:
      'From writing the first "Hello World" in C to building modern web applications.',
    items: [
      {
        year: "Childhood",
        title: "The Spark",
        description:
          "Fascinated by video games, I dreamed of creating my own interactive worlds.",
      },
      {
        year: "Grade 3",
        title: "First Steps in C",
        description:
          "Accidentally joined the school coding team and wrote my first lines of code in C.",
      },
      {
        year: "Competitions",
        title: "Python & C++",
        description:
          "Explored Python for competitions and later advanced to C++ for algorithm challenges.",
      },
      {
        year: "High School",
        title: "HTML & Java",
        description:
          "Learned HTML in IT classes and mastered Java during my AP Computer Science A course.",
      },
      {
        year: "Grade 11",
        title: "Discovering Figma Make",
        description:
          "Started self-learning web development and discovered Figma Make, an AI-powered tool that instantly converts Figma designs into production-ready React code.",
      },
      {
        year: "Present",
        title: "Building Projects",
        description:
          "Fell in love with the efficiency of Figma Make and have since developed numerous web applications.",
      },
    ] as JourneyItem[],
  },
  academics: {
    title: "Academic Achievements",
    subtitle: "Building a strong foundation in STEM disciplines.",
    score: "Score",
    grade: "Grade 10 (G10)",
    items: [
      {
        subject: "AP Computer Science A",
        description:
          "Demonstrated strong understanding of Java programming and algorithm design.",
        grade: "Grade 10 (G10)",
        scoreProofAlt: "College Board AP Computer Science A score report — 5",
      },
      {
        subject: "AP Physics 1",
        description:
          "Mastered fundamental principles of mechanics, energy, and momentum.",
        grade: "Grade 10 (G10)",
        scoreProofAlt: "College Board AP Physics 1 score report — 5",
      },
      {
        subject: "AP Pre-Calculus",
        description: "Excelled in mathematical modeling and functions analysis.",
        grade: "Grade 10 (G10)",
        scoreProofAlt: "College Board AP Precalculus score report — 5",
      },
    ] as ApItem[],
  },
  studyMaterials: {
    badge: "Learning Materials Sharing",
    title: "AP Study Materials",
    subtitle:
      "Browse and download AP review handbooks, equation sheets, and notes organized by subject.",
    windowTitle: "AP Study Materials — File Explorer",
    treeTitle: "Folders",
    apRoot: "AP Study Materials",
    rootLabel: "Root",
    searchTree: "Search in tree",
    searchFiles: "Search",
    back: "Back",
    forward: "Forward",
    up: "Up",
    open: "Open",
    preview: "Preview",
    download: "Download",
    closePreview: "Close preview",
    name: "Name",
    type: "Type",
    size: "Size",
    actions: "Actions",
    fileFolder: "File folder",
    files: "items",
    items: "items",
    noResults: "This folder is empty.",
    hint: "Double-click a folder to open · Double-click a file to preview",
    openDriveHint: "Double-click to open",
    previewLoading: "Loading preview…",
    previewError: "Preview failed. Please download the file instead.",
  },
  awards: {
    badge: "Recognition",
    title: "Awards & Honors",
    subtitle: "Competition results, certificates, and milestones across campus and beyond.",
    schoolSection: "On Campus",
    offCampusSection: "Off Campus",
    viewImages: "View photos & certificates",
    hideImages: "Hide photos & certificates",
    zhenfundTitle: "ZhenFund — AI Desmos",
    zhenfundBody:
      "is currently under application to ZhenFund. The project extends my AI-native build velocity—pairing intelligent graphing with the same product instincts recognized in my WeChat Global Innovation award and AIGC competition work.",
    zhenfundStatus: "Application in progress",
    schoolItems: [
      {
        title: "AI Camp × WeChat Mini Program Innovation Challenge",
        organization: "AI Camp × WeChat Mini Program",
        description:
          "On-campus competition hosted by AI Camp and the WeChat Mini Program team. Team WishRelay (Ling Junyu, Zuo Yingxin, Hu Kexin) received Second Prize.",
        award: "Second Prize — Team WishRelay",
        certificateAlt:
          "AI Camp × WeChat Mini Program Innovation Challenge — Second Prize team photo",
      },
      {
        title: "AP Calculus Star of the Subject",
        organization: "Shanghai Soong Ching Ling School",
        description:
          "Named AP Calculus Star of the Subject for the 2025–2026 academic year at Shanghai Soong Ching Ling School.",
        award: "AP Calculus Star — 2025–2026 Academic Year",
        certificateAlt:
          "Certificate of Honor — AP Calculus Star, Shanghai Soong Ching Ling School",
      },
    ] as AwardTranslation[],
    offCampusItems: [
      {
        title: "IMMC — International Mathematical Modeling Challenge",
        organization: "IMMC International",
        description:
          "Received the Outstanding Award (O Award) in the 2026 IMMC International Greater China contest.",
        award: "Outstanding Award (O Award) — International Greater China",
        certificateAlt:
          "IMMC 2026 International Greater China Outstanding (O Award) certificate",
      },
      {
        title: "Physics Bowl — Asian Camp Qualification",
        organization: "American Association of Physics Teachers",
        description:
          "Scored ≥ 25 in the 2026 Physics Bowl, qualifying for the Asian training camp.",
        award: "Asian Training Camp Qualification (Score ≥ 25)",
      },
      {
        title: "WeChat Mini-Program Global Innovation Challenge",
        organization: "WeChat",
        description:
          "Three-person team developed a carbon-footprint calculator mini-program and received Global Third Prize.",
        award: "Global Third Prize",
        certificateAlt:
          "WeChat Mini-Program Global Innovation Challenge — Carbon Footprint Tracker award list",
      },
      {
        title: "IMMC — Greater China Regional Contest",
        organization: "IMMC Greater China",
        description:
          "Received the Meritorious Award (M Award) in the 2026 IMMC Greater China regional contest.",
        award: "Meritorious Award (M Award) — Greater China Regional",
        certificateAlt:
          "IMMC 2026 Greater China Regional Meritorious (M Award) certificate",
      },
      {
        title: "AMC 12 — American Mathematics Competition",
        organization: "Mathematical Association of America",
        description:
          "Placed in the global top 25% on the 2025 AMC 12.",
        award: "Global Top 25%",
        certificateAlt: "AMC 12 2025 Top 25% certificate",
      },
      {
        title: "When AI Meets Intangible Cultural Heritage",
        organization: "Shanghai Municipal Student Program",
        description:
          "Team project on AI and sugar-painting narrative; received Second Prize in Shanghai.",
        award: "Team Second Prize — Shanghai",
        certificateAlt:
          "When AI Meets Intangible Cultural Heritage — The Chinese Soul in Sugar Silk award list",
      },
      {
        title: "Youth AI Innovation Competition (AIGC)",
        organization: "China–Shanghai AIGC Program",
        description:
          "Submitted an independent AIGC short film on future cities and received Third Prize.",
        award: "Individual Third Prize",
        certificateAlt:
          "Youth AI Innovation Competition (AIGC) — High School Third Prize award list",
      },
      {
        title: "HiMCM — High School Mathematical Contest in Modeling",
        organization: "COMAP",
        description:
          "Received Honorable Mention (H Award) in the 2025 HiMCM contest.",
        award: "Honorable Mention (H Award)",
        certificateAlt: "HiMCM 2025 Honorable Mention certificate",
      },
      {
        title: "Duke Math Meet China",
        organization: "Duke University",
        description:
          "Placed in the top 40% of the local selection. Presented the team poster \"Fourier: Math & Music\"; the school received Best Visual Design for the poster design.",
        award: "Certificate of Participation (Top 40%) & Team Presentation",
        certificateAlt: "Duke Math Meet China 2025 Certificate of Participation",
      },
    ] as AwardTranslation[],
    dukeCerts: [
      "Duke Math Meet China 2025 Certificate of Participation",
      "Duke Math Meet China — Best Visual Design (Poster Design Award)",
      "Duke Math Meet China — Best Visual Design awarded schools announcement",
      "Fourier: Math & Music — presentation poster at Duke Math Meet China",
    ],
  },
  projects: {
    badge: "Portfolio",
    title: "Featured Work",
    subtitle:
      "A collection of projects showcasing my journey in web development and design.",
    viewProject: "View Project",
    categories: {
      all: "All",
      aiLearning: "AI & Learning",
      games: "Games",
      webApps: "Web Apps",
    },
    items: [
      {
        title: "AI-Powered Desmos",
        description:
          "An intelligent graphing calculator powered by AI for advanced mathematical visualization. Currently applying to ZhenFund.",
        tags: ["AI", "Mathematics", "ZhenFund"],
        category: "aiLearning",
        featured: true,
      },
      {
        title: "TOEFL Vocabulary Cards",
        description:
          "A flashcard app I built while preparing for the TOEFL. Word cards help deepen my memory of each term, with built-in AI for smarter review and practice.",
        tags: ["TOEFL", "AI", "Flashcards", "Education"],
        category: "aiLearning",
        featured: true,
      },
      {
        title: "GPA Calculator",
        description:
          "A clean GPA calculator designed to help students track academic performance",
        tags: ["Utility", "Education", "Calculator"],
        category: "aiLearning",
      },
      {
        title: "2048 Pro",
        description:
          "An enhanced version of the classic 2048 puzzle game with smooth animations and advanced features",
        tags: ["JavaScript", "Game Dev", "UI/UX"],
        category: "games",
        featured: true,
      },
      {
        title: "Dragon Match-3 Game",
        description:
          "A fun match-3 puzzle game featuring dragons with engaging gameplay mechanics",
        tags: ["Game Dev", "Animation", "Canvas"],
        category: "games",
      },
      {
        title: "Pony Run",
        description:
          "A fast-paced endless runner inspired by the Chrome dinosaur game with fun power-ups",
        tags: ["Game Dev", "JavaScript", "Canvas"],
        category: "games",
      },
      {
        title: "Store Management System",
        description:
          "A comprehensive website maintenance and management system for small businesses",
        tags: ["React", "Admin Panel", "CMS"],
        category: "webApps",
      },
      {
        title: "WishRelay",
        description:
          "A WeChat mini-program for wish relay and fulfillment, now available in web format",
        tags: ["Mini Program", "Social", "Web App"],
        category: "webApps",
      },
      {
        title: "API Testing Tool",
        description:
          "A developer-friendly tool for testing and monitoring API endpoints with real-time results",
        tags: ["Developer Tools", "API", "Testing"],
        category: "webApps",
      },
      {
        title: "Echo Chamber",
        description:
          "A showcase website for our school band with member profiles and an interactive song request system",
        tags: ["React", "Web App", "Music"],
        category: "webApps",
      },
    ] as ProjectItem[],
  },
  footer: {
    contact: "Contact with Me",
    emailAria: "Email",
    githubAria: "GitHub profile",
    rights: "All rights reserved.",
    copyrightName: "Junyu Ling",
  },
};

const zh: typeof en = {
  lang: { en: "EN", zh: "中文", switchTo: "切换到英文" },
  nav: {
    brand: "灵俊宇",
    home: "首页",
    about: "关于",
    journey: "编程历程",
    achievements: "学术成绩",
    studyMaterials: "学习资料",
    awards: "奖项荣誉",
    projects: "项目作品",
    sections: "站点导航",
    scrollAbout: "滚动到关于部分",
  },
  theme: {
    light: "切换到浅色模式",
    dark: "切换到深色模式",
  },
  hero: {
    name: "灵俊宇",
    collaborate: "欢迎合作",
    location: "上海 · 17 岁",
    role: "学生 · 开发者 · 音乐人",
    highlights: [
      "AI 原生开发者",
      "全栈与小程序",
      "英皇钢琴七级",
    ],
    stats: {
      awards: "奖项",
      projects: "项目",
      age: "岁",
    },
    viewProjects: "查看项目",
    awardsHonors: "奖项与荣誉",
    taglines: [
      "IMMC 国际特等奖 (O 奖)",
      "正在构建 AI Desmos — 申请真格基金",
      "微信小程序全球创新挑战赛 — 全球三等奖",
      "英皇钢琴七级 · 常担任钢琴伴奏",
    ],
    skills: [
      "React",
      "TypeScript",
      "AI / AIGC",
      "数学建模",
      "微信小程序",
      "产品设计",
      "Desmos",
      "物理",
      "音乐",
      "真格基金 — AI Desmos",
    ],
  },
  about: {
    title: "关于我",
    badge: "认识我",
    subtitle: "因好奇而编程，因热爱而演奏，因舞台而发光。",
    pillars: ["开发", "音乐", "校园与艺术"],
    p1: "我是灵俊宇，来自上海的 17 岁高中生，热爱 Web 开发与计算机科学，喜欢探索新技术，把创意变成可用的项目。",
    p2: "除编程外，我热爱音乐。4 岁半开始学习钢琴，已取得英皇钢琴七级，目前也在学习单簧管。课余时常为小朋友钢琴伴奏，在合作演奏中获得快乐与灵感。",
    p3: "我也积极参与校内活动，多次担任升旗仪式、运动会、元旦歌舞晚会等活动主持，并与搭档一起撰写、打磨主持稿；还参加「天籁之音」等才艺比赛与学校晚会，分享对艺术的热爱。",
    email: "邮箱",
    age: "年龄",
    ageValue: "17 岁",
    status: "身份",
    statusValue: "学生 · 自学开发者",
    music: "音乐",
    musicValue: "英皇钢琴七级 · 学习中：单簧管",
    profileAlt: "灵俊宇",
  },
  journey: {
    badge: "技能演进",
    title: "我的编程历程",
    subtitle: "从写下第一个 C 语言 Hello World，到构建现代 Web 应用。",
    items: [
      {
        year: "童年",
        title: "最初的火花",
        description: "痴迷电子游戏，梦想创造属于自己的互动世界。",
      },
      {
        year: "三年级",
        title: "C 语言启蒙",
        description: "误打误撞加入校编程队，写下人生第一批 C 代码。",
      },
      {
        year: "竞赛阶段",
        title: "Python 与 C++",
        description: "用 Python 参加竞赛，随后进阶 C++ 挑战算法题。",
      },
      {
        year: "高中",
        title: "HTML 与 Java",
        description: "在信息技术课学习 HTML，并在 AP 计算机科学 A 中系统掌握 Java。",
      },
      {
        year: "十一年级",
        title: "接触 Figma Make",
        description:
          "开始自学 Web 开发，接触 Figma Make——可将 Figma 设计快速转为可上线的 React 代码的 AI 工具。",
      },
      {
        year: "至今",
        title: "持续做项目",
        description: "爱上高效构建的方式，此后开发了众多 Web 应用。",
      },
    ],
  },
  academics: {
    title: "学术成绩",
    subtitle: "在 STEM 领域打下扎实基础。",
    score: "分数",
    grade: "十年级 (G10)",
    items: [
      {
        subject: "AP 计算机科学 A",
        description: "扎实掌握 Java 编程与算法设计。",
        grade: "十年级 (G10)",
        scoreProofAlt: "College Board AP 计算机科学 A 成绩 — 5 分",
      },
      {
        subject: "AP 物理 1",
        description: "掌握力学、能量与动量等基础物理原理。",
        grade: "十年级 (G10)",
        scoreProofAlt: "College Board AP 物理 1 成绩 — 5 分",
      },
      {
        subject: "AP 预备微积分",
        description: "在数学建模与函数分析方面表现优异。",
        grade: "十年级 (G10)",
        scoreProofAlt: "College Board AP 预备微积分 成绩 — 5 分",
      },
    ],
  },
  studyMaterials: {
    badge: "学习资料分享",
    title: "AP 学习资料",
    subtitle:
      "按科目整理的 AP 复习手册、公式表与讲义，访客可直接浏览并下载所需文件。",
    windowTitle: "AP 学习资料 — 文件资源管理器",
    treeTitle: "文件夹",
    apRoot: "AP 学习资料",
    rootLabel: "根目录",
    searchTree: "在目录中搜索",
    searchFiles: "搜索",
    back: "后退",
    forward: "前进",
    up: "向上",
    open: "打开",
    preview: "预览",
    download: "下载",
    closePreview: "关闭预览",
    name: "名称",
    type: "类型",
    size: "大小",
    actions: "操作",
    fileFolder: "文件夹",
    files: "项",
    items: "项",
    noResults: "此文件夹为空。",
    hint: "双击文件夹打开 · 双击文件预览",
    openDriveHint: "双击打开",
    previewLoading: "正在加载预览…",
    previewError: "预览失败，请直接下载文件。",
  },
  awards: {
    badge: "荣誉认可",
    title: "奖项与荣誉",
    subtitle: "涵盖校内与校外的竞赛成绩、证书与重要里程碑。",
    schoolSection: "校内",
    offCampusSection: "校外",
    viewImages: "查看照片与证书",
    hideImages: "收起照片与证书",
    zhenfundTitle: "真格基金 — AI Desmos",
    zhenfundBody:
      "正在申请真格基金。该项目延续了我的 AI 原生开发节奏——智能绘图能力与微信全球创新挑战赛、AIGC 竞赛中展现的产品思维一脉相承。",
    zhenfundStatus: "申请进行中",
    schoolItems: [
      {
        title: "AI Camp × 微信小程序创新大赛",
        organization: "校内社团 AI Camp × 微信小程序",
        description:
          "校内社团 AI Camp 与微信小程序团队联合举办的校内比赛。心愿接力团队（灵俊宇、左盈欣、胡可昕）获二等奖。",
        award: "二等奖 — 心愿接力团队",
        certificateAlt: "AI Camp × 微信小程序创新大赛二等奖团队合影",
      },
      {
        title: "AP 微积分学科之星",
        organization: "上海宋庆龄学校",
        description:
          "2025–2026 学年获上海宋庆龄学校「AP 微积分」学科之星。",
        award: "AP 微积分学科之星 — 2025–2026 学年",
        certificateAlt: "荣誉证书 — AP 微积分学科之星，上海宋庆龄学校",
      },
    ],
    offCampusItems: [
      {
        title: "IMMC 国际数学建模挑战赛",
        organization: "IMMC 国际赛",
        description:
          "2026 年 IMMC 国际赛（中华区）获国际特等奖（O 奖）。",
        award: "国际特等奖 (O 奖) — 国际赛（中华区）",
        certificateAlt: "IMMC 2026 国际赛（中华区）特等奖证书",
      },
      {
        title: "Physics Bowl 物理碗",
        organization: "美国物理教师协会",
        description:
          "2026 年 Physics Bowl 得分 ≥ 25，获亚洲训练营晋级资格。",
        award: "亚洲训练营晋级资格（得分 ≥ 25）",
      },
      {
        title: "微信小程序全球创新挑战赛",
        organization: "微信",
        description:
          "三人团队开发碳足迹计算器微信小程序，获全球三等奖。",
        award: "全球三等奖",
        certificateAlt: "微信小程序全球创新挑战赛 — 碳足迹追踪器获奖公示",
      },
      {
        title: "IMMC 中华区区域赛",
        organization: "IMMC 大中华赛区",
        description:
          "2026 年 IMMC 中华区区域赛获一等奖（Meritorious / M 奖）。",
        award: "一等奖 (M 奖) — 大中华赛区",
        certificateAlt: "IMMC 2026 中华区一等奖证书",
      },
      {
        title: "AMC 12 美国数学竞赛",
        organization: "美国数学协会",
        description: "2025 年 AMC 12 成绩位列全球前 25%。",
        award: "全球前 25%",
        certificateAlt: "AMC 12 2025 全球前 25% 证书",
      },
      {
        title: "当 AI 遇见非遗",
        organization: "上海市学生活动",
        description: "团队以 AI 糖画为主题参赛，获上海市二等奖。",
        award: "团队二等奖 — 上海",
        certificateAlt: "当 AI 遇见非遗 —「糖丝里的中国魂」获奖公示",
      },
      {
        title: "青年 AI 创新大赛 (AIGC)",
        organization: "中国—上海 AIGC 项目",
        description: "提交独立制作的未来城市 AIGC 短片，获个人三等奖。",
        award: "个人三等奖",
        certificateAlt: "青年 AI 创新大赛 (AIGC) — 高中组三等奖获奖公示",
      },
      {
        title: "HiMCM 高中数学建模竞赛",
        organization: "COMAP",
        description: "2025 年 HiMCM 获荣誉奖（H 奖）。",
        award: "荣誉奖 (H 奖)",
        certificateAlt: "HiMCM 2025 荣誉奖证书",
      },
      {
        title: "Duke Math Meet 杜克数学大会",
        organization: "杜克大学",
        description:
          "本地区选拔前 40%；担任团队「Fourier: Math & Music」答辩人。学校获海报最佳视觉设计。",
        award: "参与证书（前 40%）与团队答辩",
        certificateAlt: "Duke Math Meet China 2025 参与证书",
      },
    ],
    dukeCerts: [
      "Duke Math Meet China 2025 参与证书",
      "Duke Math Meet China — 海报设计最佳奖 (Best Visual Design)",
      "Duke Math Meet China — 最佳视觉设计获奖学校公示",
      "Fourier: Math & Music — 答辩海报现场",
    ],
  },
  projects: {
    badge: "作品集",
    title: "精选项目",
    subtitle: "记录我在 Web 开发与产品设计上的探索与实践。",
    viewProject: "查看项目",
    categories: {
      all: "全部",
      aiLearning: "AI 与学习",
      games: "游戏",
      webApps: "Web 应用",
    },
    items: [
      {
        title: "AI-Powered Desmos",
        description:
          "AI 驱动的智能绘图计算器，支持高阶数学可视化。正在申请真格基金。",
        tags: ["AI", "数学", "真格基金"],
        category: "aiLearning",
        featured: true,
      },
      {
        title: "TOEFL 背单词",
        description:
          "备考托福时做的单词软件。通过单词卡片加深对每个词的印象，并接入内置 AI，让复习与练习更智能。",
        tags: ["托福", "AI", "单词卡片", "教育"],
        category: "aiLearning",
        featured: true,
      },
      {
        title: "GPA 计算器",
        description: "简洁高效的 GPA 计算工具，帮助学生管理学业成绩。",
        tags: ["工具", "教育", "计算器"],
        category: "aiLearning",
      },
      {
        title: "2048 Pro",
        description: "经典 2048 的增强版，流畅动画与更多玩法。",
        tags: ["JavaScript", "游戏开发", "UI/UX"],
        category: "games",
        featured: true,
      },
      {
        title: "龙之消除",
        description: "以龙为主题的三消益智游戏，玩法轻松上瘾。",
        tags: ["游戏开发", "动画", "Canvas"],
        category: "games",
      },
      {
        title: "Pony Run",
        description:
          "快节奏无尽跑酷，灵感来自 Chrome 小恐龙，含加速、护盾等道具。",
        tags: ["游戏开发", "JavaScript", "Canvas"],
        category: "games",
      },
      {
        title: "店铺管理系统",
        description: "面向小商家的网站维护与管理系统。",
        tags: ["React", "管理后台", "CMS"],
        category: "webApps",
      },
      {
        title: "心愿接力",
        description: "微信心愿接力小程序，现已提供 Web 版本。",
        tags: ["小程序", "社交", "Web"],
        category: "webApps",
      },
      {
        title: "API 测试工具",
        description: "面向开发者的 API 测试与监控工具，实时返回结果。",
        tags: ["开发工具", "API", "测试"],
        category: "webApps",
      },
      {
        title: "Echo Chamber",
        description:
          "为学校乐队打造的展示网站，包含成员介绍与点歌系统。",
        tags: ["React", "Web 应用", "音乐"],
        category: "webApps",
      },
    ],
  },
  footer: {
    contact: "联系我",
    emailAria: "发送邮件",
    githubAria: "GitHub 主页",
    rights: "版权所有。",
    copyrightName: "灵俊宇",
  },
};

export const translations = { en, zh } as const;

export type Translation = (typeof translations)["en"];
