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

export type AboutIntroSegment = {
  text: string;
  highlight?: boolean;
};

export function aboutIntroPlainText(segments: readonly AboutIntroSegment[]) {
  return segments.map((segment) => segment.text).join("");
}

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
      "Building AI Desmos",
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
      "AI Desmos",
    ],
  },
  about: {
    title: "About Me",
    badge: "Get to Know Me",
    subtitle:
      "Developer by curiosity, musician by heart, host on stage.",
    pillars: ["Development", "Music", "Campus & Arts"],
    p1Segments: [
      {
        text: "I'm Junyu Ling, a 17-year-old high school student from Shanghai with a deep passion for ",
      },
      { text: "web development", highlight: true },
      { text: " and " },
      { text: "computer science", highlight: true },
      {
        text: ". I love exploring new technologies and turning creative ideas into functional projects.",
      },
    ] as AboutIntroSegment[],
    p2Segments: [
      {
        text: "Beyond coding, I'm passionate about music. I started learning piano at the age of 4.5 and have achieved ",
      },
      { text: "Grade 7 in ABRSM Piano", highlight: true },
      { text: ". Currently, I'm also learning the " },
      { text: "clarinet", highlight: true },
      {
        text: ". In my free time, I often serve as a piano accompanist for children, finding joy and creative inspiration in collaborative performance.",
      },
    ] as AboutIntroSegment[],
    p3Segments: [
      {
        text: "I'm also deeply involved in school activities, frequently serving as a ",
      },
      { text: "host for events", highlight: true },
      {
        text: " like the Flag-Raising Ceremony, Sports Meet, and the New Year's Song and Dance Party. I enjoy collaborating with co-hosts to draft and refine scripts. Additionally, I actively participate in talent showcases such as the ",
      },
      { text: "\"Sounds of Nature\"", highlight: true },
      {
        text: " competition and school galas to share my artistic passion.",
      },
    ] as AboutIntroSegment[],
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
    downloadCertificate: "Download certificate",
    schoolItems: [
      {
        title: "AP Calculus Star of the Subject",
        organization: "Shanghai Soong Ching Ling School",
        description:
          "Named AP Calculus Star of the Subject for the 2025–2026 academic year at Shanghai Soong Ching Ling School.",
        award: "AP Calculus Star — 2025–2026 Academic Year",
        certificateAlt:
          "Certificate of Honor — AP Calculus Star, Shanghai Soong Ching Ling School",
      },
      {
        title: "AI Camp × WeChat Mini Program Innovation Challenge",
        organization: "AI Camp × WeChat Mini Program",
        description:
          "On-campus competition hosted by AI Camp and the WeChat Mini Program team. Team WishRelay received Second Prize.",
        award: "Second Prize — Team WishRelay",
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
          "Received the National Honorable Award (Division 2) in the 2026 AAPT PhysicsBowl contest.",
        award: "National Honorable Award (Division 2)",
        certificateAlt: "PhysicsBowl 2026 National Honorable Award certificate",
      },
      {
        title: "WeChat Mini-Program Global Innovation Challenge",
        organization: "WeChat",
        description:
          "Served as team captain for a three-person team that developed a carbon-footprint calculator mini-program. Received Global Third Prize and a ¥500 cash award.",
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
          "Honor certificate — When AI Meets Intangible Cultural Heritage, Second Prize, The Chinese Soul in Sugar Silk",
      },
      {
        title:
          "8th China·Shanghai Youth AI Innovation Competition — AIGC Multimedia Design",
        organization: "Shanghai Youth AI Innovation Competition Committee",
        description:
          "Entered the AIGC Multimedia Works Design activity (individual, high school) with an independent short film on future cities, and received Third Prize.",
        award: "Individual Third Prize — High School",
        certificateAlt:
          "Certificate — 8th China·Shanghai Youth AI Innovation Competition, AIGC Multimedia Design, Individual High School Third Prize",
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
          "An intelligent graphing calculator powered by AI for advanced mathematical visualization.",
        tags: ["AI", "Mathematics", "Visualization"],
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
        title: "ByteGame",
        description:
          "A tabletop game arcade I built for STEAM Week and MATH Week — Da Vinci Code, UNO, Halli Galli, Gomoku, Werewolf, Blackjack, and more, with CPU practice and online play.",
        tags: ["Game Dev", "Multiplayer", "STEAM"],
        category: "games",
        featured: true,
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
    ] as ProjectItem[],
  },
  footer: {
    contact: "Contact with Me",
    emailAria: "Email",
    githubAria: "GitHub profile",
    rights: "All rights reserved.",
    copyrightName: "Junyu Ling",
    exportCv: "Export Portfolio (PDF)",
    exportingCv: "Preparing PDF…",
    exportCvAria: "Download portfolio as PDF",
  },
  cv: {
    skills: "Skills",
    live: "Live",
    contact: "Contact",
    generated: "Portfolio compiled from my personal website.",
    objectiveTitle: "Profile",
    educationTitle: "Education",
    projectsTitle: "Selected Work",
    skillsTitle: "Skills",
    honorsTitle: "Activities & Awards",
    appendixTitle: "Certificate Gallery",
    city: "Shanghai",
    github: "GitHub",
    portfolio: "Portfolio",
    objective:
      "High school student and self-taught developer. I build and ship web apps, AI-assisted tools, and competition-grade modeling work.",
    schoolName: "Shanghai Soong Ching Ling School",
    schoolDegree: "High School",
    schoolDates: "Expected graduation: 2027.06",
    schoolBullets: [
      "AP Calculus Star of the Subject, 2025–2026 academic year",
      "Core coursework: Java, computer science principles, calculus, mechanics and electricity & magnetism",
    ],
    apScoresTitle: "AP Scores",
    apScores: [
      { name: "Computer Science A", score: "5" },
      { name: "Computer Science Principles", score: "5" },
      { name: "Calculus BC", score: "5" },
      { name: "Calculus BC — AB Subscore", score: "5" },
      { name: "Physics 1", score: "5" },
      { name: "Physics 2", score: "5" },
    ],
    languagesLabel: "Languages",
    languages: "Mandarin (native); English (academic writing & speaking)",
    techLabel: "Technical",
    tech: "React, TypeScript, JavaScript, Java, Python, C++, HTML/CSS, WeChat Mini Programs, Figma, mathematical modeling",
    certsLabel: "Certificates",
    certsHighlight:
      "IMMC Outstanding Award (O Award); PhysicsBowl National Honorable Award (Division 2); WeChat Mini-Program Global Third Prize; AP Calculus Star; AMC 12 global top 25%; Duke Math Meet China (Top 40% and Best Visual Design for the Fourier: Math & Music poster). Certificate scans are in the gallery.",
    projectRoleSolo: "Independent Developer",
    projectRoleTeam: "Core Developer (Team)",
    projectBullets: [
      [
        "Designed and shipped an AI-assisted graphing calculator for advanced mathematical visualization.",
        "Turned natural-language and symbolic input into interactive Desmos-style plots for study and exploration.",
      ],
      [
        "Built a TOEFL vocabulary flashcard app with spaced review and an embedded AI practice loop.",
        "Designed card-based review to deepen retention of each term.",
      ],
      [
        "Shipped a lightweight GPA calculator that helps students track academic performance.",
      ],
      [
        "Rebuilt the classic 2048 puzzle with smoother animation, extra modes, and a cleaner interaction model.",
      ],
      [
        "Developed a dragon-themed match-3 game with original animation and canvas gameplay.",
      ],
      [
        "Implemented a Chrome-dino-style endless runner with power-ups and fast-paced controls.",
      ],
      [
        "Built a tabletop-game arcade for STEAM Week and MATH Week, covering Da Vinci Code, UNO, Gomoku, Werewolf, Blackjack, and more.",
        "Added CPU practice and online play so classmates can join a table or train solo.",
      ],
      [
        "Co-developed WishRelay, a WeChat mini-program for wish relay and fulfillment, later published as a web app.",
        "Team received Second Prize in the on-campus AI Camp × WeChat Mini Program Innovation Challenge.",
      ],
      [
        "Built a developer-facing API testing tool with live request results for endpoint checks.",
      ],
    ],
    activities: [
      {
        title: "School Event Host",
        org: "Shanghai Soong Ching Ling School",
        detail:
          "Regularly host flag-raising ceremonies, the sports meet, and the New Year song-and-dance party; draft and revise scripts with co-hosts.",
      },
      {
        title: "Music",
        org: "ABRSM Piano Grade 7",
        detail:
          "Piano since age 4.5; currently studying clarinet. Accompanies younger students and performs in school showcases including “Sounds of Nature.”",
      },
    ],
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
      "正在构建 AI Desmos",
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
      "AI Desmos",
    ],
  },
  about: {
    title: "关于我",
    badge: "认识我",
    subtitle: "因好奇而编程，因热爱而演奏，因舞台而发光。",
    pillars: ["开发", "音乐", "校园与艺术"],
    p1Segments: [
      { text: "我是灵俊宇，来自上海的 17 岁高中生，热爱 " },
      { text: "Web 开发", highlight: true },
      { text: "与" },
      { text: "计算机科学", highlight: true },
      { text: "，喜欢探索新技术，把创意变成可用的项目。" },
    ] as AboutIntroSegment[],
    p2Segments: [
      { text: "除编程外，我热爱音乐。4 岁半开始学习钢琴，已取得" },
      { text: "英皇钢琴七级", highlight: true },
      { text: "，目前也在学习" },
      { text: "单簧管", highlight: true },
      { text: "。课余时常为小朋友钢琴伴奏，在合作演奏中获得快乐与灵感。" },
    ] as AboutIntroSegment[],
    p3Segments: [
      { text: "我也积极参与校内活动，多次担任升旗仪式、运动会、元旦歌舞晚会等" },
      { text: "活动主持", highlight: true },
      { text: "，并与搭档一起撰写、打磨主持稿；还参加" },
      { text: "「天籁之音」", highlight: true },
      { text: "等才艺比赛与学校晚会，分享对艺术的热爱。" },
    ] as AboutIntroSegment[],
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
    downloadCertificate: "下载证书",
    schoolItems: [
      {
        title: "AP 微积分学科之星",
        organization: "上海宋庆龄学校",
        description:
          "2025–2026 学年获上海宋庆龄学校「AP 微积分」学科之星。",
        award: "AP 微积分学科之星 — 2025–2026 学年",
        certificateAlt: "荣誉证书 — AP 微积分学科之星，上海宋庆龄学校",
      },
      {
        title: "AI Camp × 微信小程序创新大赛",
        organization: "校内社团 AI Camp × 微信小程序",
        description:
          "校内社团 AI Camp 与微信小程序团队联合举办的校内比赛。心愿接力团队获二等奖。",
        award: "二等奖 — 心愿接力团队",
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
          "2026 年 AAPT PhysicsBowl 获 National Honorable Award（Division 2）。",
        award: "National Honorable Award（Division 2）",
        certificateAlt: "PhysicsBowl 2026 National Honorable Award 证书",
      },
      {
        title: "微信小程序全球创新挑战赛",
        organization: "微信",
        description:
          "担任三人团队队长，开发碳足迹计算器微信小程序，获全球三等奖及 500 元奖金。",
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
        certificateAlt: "荣誉证书 — 当 AI 遇见非遗「糖丝里的中国魂」二等奖",
      },
      {
        title: "中国·上海第八届青少年人工智能创新大赛 — AIGC 多媒体作品设计",
        organization: "上海市青少年人工智能创新大赛组委会",
        description:
          "参加全国邀请赛特别活动「AIGC 多媒体作品设计」（个人赛·高中组），提交独立制作的未来城市短片，获三等奖。",
        award: "个人赛（高中组）三等奖",
        certificateAlt:
          "证书 — 中国·上海第八届青少年人工智能创新大赛 AIGC 多媒体作品设计，个人赛高中组三等奖",
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
          "AI 驱动的智能绘图计算器，支持高阶数学可视化。",
        tags: ["AI", "数学", "可视化"],
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
        title: "ByteGame",
        description:
          "为 STEAM Week 与 MATH Week 制作的桌游合集站，包含达芬奇密码、UNO、Halli Galli、五子棋、狼人杀、二十一点等，支持人机练习与在线对战。",
        tags: ["游戏开发", "联机", "STEAM"],
        category: "games",
        featured: true,
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
    ],
  },
  footer: {
    contact: "联系我",
    emailAria: "发送邮件",
    githubAria: "GitHub 主页",
    rights: "版权所有。",
    copyrightName: "灵俊宇",
    exportCv: "导出作品集 PDF",
    exportingCv: "正在生成 PDF…",
    exportCvAria: "下载 PDF 格式作品集",
  },
  cv: {
    skills: "技能",
    live: "作品链接",
    contact: "联系方式",
    generated: "本作品集由个人网站内容整理。",
    objectiveTitle: "简介",
    educationTitle: "教育背景",
    projectsTitle: "精选作品",
    skillsTitle: "技能",
    honorsTitle: "活动与奖项",
    appendixTitle: "证书图集",
    city: "上海",
    github: "GitHub",
    portfolio: "作品集",
    objective:
      "高中在读，自学 Web 开发。独立上线 Web 应用与小程序，并持续做数学建模与竞赛相关作品。",
    schoolName: "上海宋庆龄学校",
    schoolDegree: "高中",
    schoolDates: "预计毕业：2027.06",
    schoolBullets: [
      "2025–2026 学年 AP 微积分学科之星",
      "核心课程：Java、计算机科学原理、微积分、力学与电磁学",
    ],
    apScoresTitle: "AP 成绩",
    apScores: [
      { name: "Computer Science A", score: "5" },
      { name: "Computer Science Principles", score: "5" },
      { name: "Calculus BC", score: "5" },
      { name: "Calculus BC — AB Subscore", score: "5" },
      { name: "Physics 1", score: "5" },
      { name: "Physics 2", score: "5" },
    ],
    languagesLabel: "语言",
    languages: "中文（母语）；英语（学术读写与口语）",
    techLabel: "专业技能",
    tech: "React、TypeScript、JavaScript、Java、Python、C++、HTML/CSS、微信小程序、Figma、数学建模",
    certsLabel: "资格与证书",
    certsHighlight:
      "IMMC 国际特等奖（O 奖）；PhysicsBowl National Honorable Award（Division 2）；微信小程序全球三等奖；AP 微积分学科之星；AMC 12 全球前 25%；Duke Math Meet China（前 40%，Fourier: Math & Music 海报最佳视觉设计）。证书扫描见文末图集。",
    projectRoleSolo: "独立开发",
    projectRoleTeam: "核心开发（团队）",
    projectBullets: [
      [
        "设计并上线 AI 辅助绘图计算器，用于高阶数学可视化。",
        "将自然语言与符号输入转为可交互的 Desmos 风格图像，服务学习与探究。",
      ],
      [
        "开发托福词汇卡片应用，支持间隔复习，并接入内置 AI 练习。",
        "通过单词卡片加深对每个词的记忆。",
      ],
      ["上线轻量 GPA 计算器，帮助学生跟踪学业表现。"],
      ["重做经典 2048，补充更流畅的动画、额外模式与更清晰的交互。"],
      ["开发龙主题三消游戏，含原创动画与 Canvas 玩法。"],
      ["实现 Chrome 小恐龙风格无尽跑酷，含道具与快节奏操作。"],
      [
        "为 STEAM Week 与 MATH Week 制作桌游合集站，覆盖达芬奇密码、UNO、五子棋、狼人杀、二十一点等。",
        "支持人机练习与在线开桌，方便同学组局或独自训练。",
      ],
      [
        "参与开发「心愿接力」微信小程序（许愿与接力），并发布 Web 版。",
        "团队获校内 AI Camp × 微信小程序创新大赛二等奖。",
      ],
      ["开发面向开发者的 API 测试工具，实时返回接口检测结果。"],
    ],
    activities: [
      {
        title: "校内活动主持",
        org: "上海宋庆龄学校",
        detail:
          "常年主持升旗仪式、运动会与元旦歌舞晚会，并与搭档共同起草、修改主持稿。",
      },
      {
        title: "音乐",
        org: "英皇钢琴七级",
        detail:
          "4.5 岁起学习钢琴，目前同时学习单簧管；为低年级同学钢琴伴奏，并参加「天籁之音」等校内展演。",
      },
    ],
  },
};

export const aboutIntroLayoutParagraphs = [
  aboutIntroPlainText(en.about.p1Segments),
  aboutIntroPlainText(en.about.p2Segments),
  aboutIntroPlainText(en.about.p3Segments),
] as const;

export const translations = { en, zh } as const;

export type Translation = (typeof translations)["en"];
