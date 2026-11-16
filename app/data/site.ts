/* ===========================================================================
   ✏️  EDIT ME FIRST

   This is the only file you need to touch to make the site yours.
   Every headline, project, job and social link on the whole website is read
   from here — no text is hard-coded inside components.
   =========================================================================== */

import type {
  Experience,
  Project,
  SkillGroup,
  SocialLink,
} from '~/types/portfolio'

/* ---------------------------------------------------------------- identity */

export const profile = {
  name: 'Sros Songha',
  /** Shown in the hero as two stacked lines. */
  firstName: 'Sros',
  lastName: 'Songha',
  role: 'Software Engineer',
  /** Current active internship status */
  currentRole: 'Front-end Developer Intern',
  /** The one-liner under the big name. */
  tagline: 'Engineering resilient software systems and high-performance interfaces.',
  /** Two or three sentences for the About section. */
  bio: [
    'I am a Computer Science student at the Institute of Technology of Cambodia (ITC) and a software engineer based in Phnom Penh, currently interning as a front-end developer. I specialize in building fast, accessible web applications and reliable systems with Vue, Nuxt, React, and TypeScript — bridging clean code with refined user experience.',
    'With hands-on experience at T.O Group and EKYC Solution Co., Ltd., I build production interfaces that handle real-world complexity: edge-rendered marketing platforms, dynamic headless CMS integrations, and real-time document capture pipelines. As co-creator of Roomie (ស្រុកខ្ញុំ), I engineered a nationwide rental marketplace deployed live to production at sroknh.com.',
    'I judge software by how it holds up in hands, not just in mockups: layouts that remain rock-solid on a 320px screen, responsive state machines that never leave the user guessing, and fluid interactions that make complex tasks feel natural.',
  ],
  location: 'Phnom Penh · UTC+7',
  availability: 'Available for projects',
  email: 'sanghakh122333@gmail.com',
  cvUrl: '/cv.pdf',
  /** Numbers in the hero strip. `suffix` is appended after the counter. */
  stats: [
    { value: 19, suffix: '+', label: 'Public repos' },
    { value: 2, suffix: '', label: 'Tech internships' },
    { value: 25, suffix: '', label: 'Provinces mapped' },
    { value: 100, suffix: '%', label: 'Type safety' },
  ],
}

export const socials: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/srossongha', handle: '@srossongha' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/sros-songha-164656419', handle: 'sros-songha' },
  { label: 'Facebook', href: 'https://web.facebook.com/sros.sangha.boy.loy', handle: 'sros.sangha.boy.loy' },
  { label: 'Instagram', href: 'https://www.instagram.com/moononlyyou/', handle: '@moononlyyou' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@sros.sangha', handle: '@sros.sangha' },
  { label: 'Telegram', href: 'https://t.me/srossangha', handle: '@srossangha' },
  { label: 'Email', href: `mailto:${profile.email}`, handle: profile.email },
]

/* ---------------------------------------------------------------- projects */

export const projects: Project[] = [
  {
    slug: 'roomie',
    title: 'Roomie (ស្រុកខ្ញុំ - SrokNh)',
    tagline: 'Full-stack rental marketplace connecting tenants and landlords across Cambodia.',
    description:
      'A production rental housing platform engineered for Cambodia: interactive map exploration across all 25 provinces using Leaflet & CARTO, real-time listing filters, seamless host onboarding, a dedicated utility calculator, and bilingual Khmer/English localization. Built with Nuxt 4, Vue 3, Supabase (PostgreSQL with RLS), and Clerk authentication, deployed live at sroknh.com.',
    year: '2026',
    role: 'Co-Creator & Front-end Lead',
    stack: ['Nuxt 4', 'Vue 3', 'TypeScript', 'shadcn-vue', 'Pinia', 'Supabase', 'Clerk', 'Leaflet', 'Cloudflare Pages'],
    tags: ['Product', 'Full-stack', 'Vue/Nuxt'],
    links: [
      { label: 'Live site', href: 'https://sroknh.com', icon: 'external' },
      { label: 'Case study', href: '/work/roomie', icon: 'docs' },
    ],
    highlights: [
      'Engineered mobile-first discovery flows with seamless English and Khmer (ភាសាខ្មែរ) bilingual switching.',
      'Integrated Leaflet and CARTO interactive mapping to geo-locate rental properties across 25 provinces.',
      'Secured user authentication via Clerk and architected database interactions on Supabase with PostgreSQL Row-Level Security.',
      'Built a custom scientific utility calculator into listing pages for accurate monthly expense forecasting.',
      'Achieved fluid user interactions and reactive state management utilizing shadcn-vue and Pinia.',
    ],
    metrics: [
      { value: '25', label: 'Provinces mapped' },
      { value: '2', label: 'Languages (KH/EN)' },
      { value: 'Live', label: 'In production' },
    ],
    accent: ['oklch(0.75 0.16 220)', 'oklch(0.58 0.18 240)'],
    featured: true,
    status: 'shipped',
  },
  {
    slug: 'rewardos',
    title: 'RewardOS Platform',
    tagline: 'Modern customer loyalty platform marketing page deployed to Cloudflare Workers.',
    description:
      'High-performance production product landing platform engineered during internship at EKYC Solution Co., Ltd. for RewardOS, an enterprise customer loyalty and retention platform. Built with Next.js, TypeScript, and Tailwind CSS via OpenNext, deployed on Cloudflare Workers for instantaneous edge delivery.',
    year: '2026',
    role: 'Front-end Intern — Next.js & Edge Serverless',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'OpenNext', 'Cloudflare Workers'],
    tags: ['Product', 'React/Next.js', 'Full-stack'],
    links: [
      { label: 'Live site', href: 'https://rewardos-landing-page.lywoo-sroeng.workers.dev/', icon: 'external' },
      { label: 'Case study', href: '/work/rewardos', icon: 'docs' },
    ],
    highlights: [
      'Engineered responsive enterprise marketing sections, CMS-driven FAQ modules, and interactive business value metrics.',
      'Configured high-performance edge deployment to Cloudflare Workers using OpenNext for ultra-low latency worldwide.',
      'Enforced strict TypeScript interfaces and mobile-first layout stability across all viewports.',
    ],
    metrics: [
      { value: '<1s', label: 'Edge TTFB' },
      { value: '100%', label: 'Mobile responsive' },
      { value: 'OpenNext', label: 'Edge runtime' },
    ],
    accent: ['oklch(0.72 0.15 210)', 'oklch(0.55 0.17 235)'],
    featured: true,
    status: 'shipped',
  },
  {
    slug: 'personal-finance-tracker',
    title: 'Personal Finance Tracker',
    tagline: 'Full-stack dashboard for cash flow, monthly budgets, and spending trends.',
    description:
      'A high-performance personal finance platform built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4. Backed by Prisma 7 and Neon Postgres with Better Auth session security. Delivers real-time expense categorization, interactive SVG balance and donut charts, budget caps with threshold alerts, and CSV exports.',
    year: '2026',
    role: 'Solo Full-Stack Build',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Prisma 7', 'Neon Postgres', 'Better Auth'],
    tags: ['Product', 'React/Next.js', 'Full-stack'],
    links: [
      { label: 'Source', href: 'https://github.com/srossongha/personal-finance-tracker', icon: 'github' },
      { label: 'Live demo', href: 'https://personal-finance-tracker-asuna-6fb8.vercel.app', icon: 'external' },
      { label: 'Case study', href: '/work/personal-finance-tracker', icon: 'docs' },
    ],
    highlights: [
      'Constructed custom SVG charts for real-time visualization of monthly balances, category breakdowns, and spending trends.',
      'Integrated active budget monitoring with 80% and 100% threshold alerts to curb overspending.',
      'Implemented optimistic UI mutations for instant transaction logging paired with robust server-side validation.',
      'Secured user authentication with Better Auth and serverless database persistence on Neon Postgres via Prisma 7.',
    ],
    metrics: [
      { value: '100%', label: 'Type safety' },
      { value: '<50ms', label: 'DB query latency' },
      { value: 'Next.js 16', label: 'App router' },
    ],
    accent: ['oklch(0.70 0.16 200)', 'oklch(0.52 0.18 220)'],
    featured: true,
    status: 'shipped',
  },
  {
    slug: 'identity-flow',
    title: 'Identity Flow & Liveness Verification',
    tagline: 'Real-time camera verification pipeline with in-browser frame quality analysis.',
    description:
      'An electronic Know Your Customer (eKYC) verification workflow developed at EKYC Solution Co., Ltd. Guides users through automated document capture, liveness detection, and instant client-side frame quality assessment (detecting glare, blur, and boundary framing) before uploading to backend verification services.',
    year: '2026',
    role: 'Front-end Intern — Camera UX & Frame Pipeline',
    stack: ['Vue 3', 'TypeScript', 'WebRTC', 'HTML5 Canvas', 'REST API'],
    tags: ['Product', 'Computer Vision', 'Vue/Nuxt'],
    links: [
      { label: 'Company Project (EKYC Solution)', icon: 'docs' },
      { label: 'Case study', href: '/work/identity-flow', icon: 'docs' },
    ],
    highlights: [
      'Engineered an in-browser canvas analysis pipeline that detects glare, blur, and lighting conditions before transmission.',
      'Architected a deterministic state machine to manage multi-step capture, error recovery, and camera hardware fallbacks.',
      'Treated hardware permissions and device constraints as first-class UI states to eliminate user confusion.',
      'Drastically reduced verification abandonment, achieving a median document capture time under 3 seconds.',
    ],
    metrics: [
      { value: '<3s', label: 'Median capture' },
      { value: '0', label: 'Failed uploads' },
      { value: '6', label: 'Guided states' },
    ],
    accent: ['oklch(0.74 0.14 215)', 'oklch(0.56 0.16 250)'],
    featured: true,
    status: 'shipped',
  },
  {
    slug: 'to-group-landing',
    title: 'T.O Group Corporate Platform',
    tagline: 'Responsive corporate landing platform powered by Directus headless CMS.',
    description:
      'A modern corporate platform engineered during internship at T.O Group. Couples a Nuxt and Tailwind CSS front-end with Directus Headless CMS REST APIs, allowing non-technical teams to manage content dynamically while maintaining sub-second edge performance.',
    year: '2026',
    role: 'Front-end Intern — Nuxt & CMS Integration',
    stack: ['Vue 3', 'Nuxt', 'Tailwind CSS', 'Directus CMS', 'REST API'],
    tags: ['Product', 'Vue/Nuxt', 'CMS'],
    links: [
      { label: 'Source', href: 'https://github.com/srossongha/T.O-Group-landing-page', icon: 'github' },
      { label: 'Case study', href: '/work/to-group-landing', icon: 'docs' },
    ],
    highlights: [
      'Designed a modular section architecture for services showcases, agency highlights, and team spotlights.',
      'Connected decoupled views to Directus headless CMS with type-safe response parsing.',
      'Optimized asset delivery and typography for mobile smoothness and sub-second first contentful paint.',
    ],
    metrics: [
      { value: '<1s', label: 'First paint' },
      { value: '100%', label: 'Mobile responsive' },
      { value: 'Directus', label: 'Headless CMS' },
    ],
    accent: ['oklch(0.68 0.15 225)', 'oklch(0.50 0.17 260)'],
    featured: true,
    status: 'shipped',
  },
  {
    slug: 'hand-filter-cam',
    title: 'Hand Tracking Vision Cam',
    tagline: 'Real-time gesture-driven visual computing with MediaPipe and OpenCV.',
    description:
      'A computer vision system that tracks 21 3D hand landmarks in real time with MediaPipe and OpenCV. Uses geometric convex hull algorithms to dynamically map filter masks between hands and translates finger counting gestures into live graphic filters at 30 FPS.',
    year: '2026',
    role: 'Solo Developer — Computer Vision & Real-time Graphics',
    stack: ['Python', 'MediaPipe', 'OpenCV', 'NumPy'],
    tags: ['Computer Vision', 'Python', 'Experiment'],
    links: [
      { label: 'Source', href: 'https://github.com/srossongha/hand-tracking', icon: 'github' },
      { label: 'Case study', href: '/work/hand-filter-cam', icon: 'docs' },
    ],
    highlights: [
      'Convex-hull masking over all 21 landmarks per hand, unioned across both hands into one continuous filtered region.',
      'Finger counting gesture recognition cycles through custom graphic filters in real time.',
      'Designed keyboard and fallback heuristics ensuring uninterrupted demos regardless of ambient lighting.',
      'Live HUD reporting active filter states, gesture confidence, detected hands, and real-time FPS.',
    ],
    metrics: [
      { value: '42', label: 'Landmarks tracked' },
      { value: '30 FPS', label: 'Processing speed' },
      { value: '8', label: 'Dynamic filters' },
    ],
    accent: ['oklch(0.72 0.12 210)', 'oklch(0.54 0.14 245)'],
    featured: false,
    status: 'shipped',
  },
  {
    slug: 'cpp-syntax-examples',
    title: 'C++ Systems & Algorithms',
    tagline: 'Algorithmic problem-solving, memory models, and data structures in C++.',
    description:
      'A structured repository of C++ implementations exploring low-level memory architecture, pointer arithmetic, object-oriented principles, and algorithmic problem-solving developed during Computer Science coursework at the Institute of Technology of Cambodia (ITC).',
    year: '2026',
    role: 'Computer Science Coursework',
    stack: ['C++', 'Algorithms', 'Data Structures', 'Memory Management', 'GCC'],
    tags: ['Tool', 'Experiment'],
    links: [
      { label: 'Source', href: 'https://github.com/srossongha/cpp-syntax-examples', icon: 'github' },
      { label: 'Case study', href: '/work/cpp-syntax-examples', icon: 'docs' },
    ],
    highlights: [
      'In-depth exploration of manual memory allocation, pointer mechanics, and reference semantics in C++.',
      'Algorithmic data structure implementations focused on clean complexity guarantees.',
      'Bridge between low-level computer science foundations and high-level web architecture.',
    ],
    metrics: [
      { value: 'ITC', label: 'Coursework' },
      { value: 'C++17', label: 'Standard' },
    ],
    accent: ['oklch(0.70 0.10 230)', 'oklch(0.52 0.12 255)'],
    featured: false,
    status: 'shipped',
  },
  {
    slug: 'sakura',
    title: 'Sakura Interactive Petals',
    tagline: 'Hardware-accelerated CSS petal bloom and kinetic physics.',
    description:
      'A creative coding study in browser performance: layered radial gradients form individual petals, keyframed transforms orchestrate gentle drift, and pointer interaction pauses the fall to bloom. Zero external canvas libraries — running entirely on the GPU compositor.',
    year: '2025',
    role: 'Creative Coding & CSS Architecture',
    stack: ['CSS', 'Keyframes', 'HTML5', 'GPU Compositor'],
    tags: ['Creative', 'Experiment'],
    links: [
      { label: 'Source', href: 'https://github.com/srossongha/sakura', icon: 'github' },
      { label: 'Case study', href: '/work/sakura', icon: 'docs' },
    ],
    highlights: [
      'Petals drawn with single radial gradients and asymmetric border geometry, eliminating image assets.',
      'Compositor-only animations utilizing transform and opacity for guaranteed 60fps mobile execution.',
      'Interactive bloom transitions driven by animation-play-state manipulation.',
    ],
    metrics: [
      { value: '0 KB', label: 'External images' },
      { value: '60 FPS', label: 'GPU compositor' },
    ],
    accent: ['oklch(0.74 0.12 220)', 'oklch(0.55 0.14 240)'],
    featured: false,
    status: 'shipped',
  },
  {
    slug: 'this-site',
    title: 'This Portfolio',
    tagline: 'Smooth scroll choreography, responsive typography, and clean design.',
    description:
      'The site you are reading. Crafted with Nuxt 4, Vue 3, GSAP ScrollTrigger, Lenis smooth scrolling, Tailwind CSS, and shadcn-vue. Designed to demonstrate front-end engineering discipline: clean typography, zero layout shift, Schema.org knowledge graph integration, and accessible 60fps animations.',
    year: '2026',
    role: 'Architecture, Design & Engineering',
    stack: ['Nuxt 4', 'Vue 3', 'TypeScript', 'GSAP', 'Lenis', 'Tailwind v4', 'shadcn-vue', 'Cloudflare Workers'],
    tags: ['Product', 'Full-stack', 'Vue/Nuxt'],
    links: [
      { label: 'Source', href: 'https://github.com/srossongha/portfolio-website', icon: 'github' },
      { label: 'Live site', href: 'https://portfolio.sanghakh122333.workers.dev/', icon: 'external' },
      { label: 'Case study', href: '/work/this-site', icon: 'docs' },
    ],
    highlights: [
      'Single synchronized Lenis instance driving butter-smooth scrolling coupled with GSAP ScrollTrigger.',
      'Multi-axis layout choreography: horizontal card showcases, pinned depth reveals, and interactive cursor physics.',
      'Structured Schema.org Person and WebSite JSON-LD graph disambiguating online search entity verification.',
      'Strict accessibility compliance with full prefers-reduced-motion support and keyboard-navigable command palette.',
    ],
    metrics: [
      { value: '60 FPS', label: 'Choreography' },
      { value: '100%', label: 'Type safety' },
      { value: 'A11y', label: 'Reduced motion' },
    ],
    accent: ['oklch(0.76 0.16 220)', 'oklch(0.55 0.18 250)'],
    featured: false,
    status: 'shipped',
  },
]

/* ------------------------------------------------------------------ skills */

export const skillGroups: SkillGroup[] = [
  {
    title: 'Front-end Engineering',
    summary: 'Building fast, accessible, and reactive user interfaces.',
    items: [
      { name: 'Vue 3 / Nuxt 4', level: 90 },
      { name: 'TypeScript & JavaScript', level: 85 },
      { name: 'Tailwind CSS & shadcn-vue', level: 90 },
      { name: 'React & Next.js', level: 80 },
      { name: 'Pinia & State Machines', level: 85 },
      { name: 'GSAP & Smooth Scrolling', level: 75 },
    ],
  },
  {
    title: 'Backend, Database & Cloud',
    summary: 'Edge serverless, relational databases, and decoupled APIs.',
    items: [
      { name: 'Supabase & PostgreSQL (RLS)', level: 80 },
      { name: 'Directus (Headless CMS)', level: 80 },
      { name: 'Prisma ORM & Neon Postgres', level: 75 },
      { name: 'Cloudflare Workers & Pages', level: 80 },
      { name: 'Clerk & Better Auth', level: 80 },
      { name: 'REST APIs & Integrations', level: 85 },
    ],
  },
  {
    title: 'Tooling & Production Delivery',
    summary: 'Reliable tooling to ship from prototype to production.',
    items: [
      { name: 'Git & GitHub Collaboration', level: 85 },
      { name: 'Figma to Code Precision', level: 85 },
      { name: 'Vite & Build Tooling', level: 80 },
      { name: 'Mobile-First Responsive UX', level: 95 },
      { name: 'macOS & Linux Terminal', level: 80 },
    ],
  },
  {
    title: 'Computer Science & Exploration',
    summary: 'Core algorithmic fundamentals and emerging technologies.',
    items: [
      { name: 'C++ (Data Structures & Memory)', level: 75 },
      { name: 'Python (OpenCV & MediaPipe)', level: 70 },
      { name: 'Browser Extensions (Manifest V3)', level: 75 },
      { name: 'Web Performance & Core Vitals', level: 80 },
    ],
  },
]

/** The endless ticker rows in the skills section. */
export const marqueeRows = [
  ['Nuxt 4', 'Vue 3', 'React 19', 'Next.js 16', 'TypeScript', 'Tailwind CSS', 'Pinia', 'shadcn-vue'],
  ['PostgreSQL', 'MySQL', 'Directus CMS', 'Prisma', 'Supabase', 'Neon', 'Clerk Auth', 'Cloudflare Workers'],
  ['Python', 'MediaPipe', 'OpenCV', 'C++', 'Vite', 'Git', 'GSAP', 'Lenis', 'Figma'],
]

/* -------------------------------------------------------------- experience */

export const experiences: Experience[] = [
  {
    period: 'Aug 2026 — Present',
    role: 'Front-end Developer Intern',
    organisation: 'T.O Group',
    description:
      'Developing responsive web applications and corporate landing platforms with Vue 3, Nuxt, and Tailwind CSS. Architecting modular components, managing application state, and integrating decoupled front-end views with Directus headless CMS and backend REST endpoints.',
    tags: ['Vue 3', 'Nuxt', 'Tailwind CSS', 'Directus CMS', 'REST APIs', 'TypeScript'],
  },
  {
    period: 'May 2026 — Aug 2026',
    role: 'Front-end Developer Intern',
    organisation: 'EKYC Solution Co., Ltd.',
    description:
      'Engineered user-facing electronic identity verification (eKYC) workflows, browser camera capture UX, and real-time canvas frame inspection (analyzing blur, glare, and document boundaries) with Vue 3 and TypeScript. Built the RewardOS production product landing page deployed to Cloudflare Workers with Next.js.',
    tags: ['Vue 3', 'TypeScript', 'WebRTC', 'HTML5 Canvas', 'Next.js', 'Cloudflare Workers'],
  },
  {
    period: '2025 — Present',
    role: 'Computer Science Undergraduate',
    organisation: 'Institute of Technology of Cambodia (ITC)',
    description:
      'Pursuing foundational computer science coursework with rigorous focus on algorithms, data structures, memory architecture, and object-oriented systems in C++. Applying systems-level programming principles to scalable web architecture.',
    tags: ['Computer Science', 'Algorithms', 'Data Structures', 'C++', 'Software Engineering'],
  },
  {
    period: '2025 — Present',
    role: 'Product Builder & Open Source Developer',
    organisation: 'Independent Projects',
    description:
      'Co-creator of Roomie (ស្រុកខ្ញុំ), an active room-rental marketplace in production across Cambodia. Developing full-stack web applications, browser extensions, and real-time computer vision prototypes exploring the intersection of responsive UI and edge technology.',
    tags: ['Nuxt 4', 'Next.js', 'Supabase', 'PostgreSQL', 'Computer Vision', 'Open Source'],
  },
]

/* ------------------------------------------------------------- navigation */

export const navLinks = [
  { label: 'About', to: '/#about', section: 'about' },
  { label: 'Work', to: '/#work', section: 'work' },
  { label: 'Skills', to: '/#skills', section: 'skills' },
  { label: 'Contact', to: '/#contact', section: 'contact' },
]

/** Used for <title>, meta description and the OG card. */
export const seo = {
  title: `${profile.name} — ${profile.role}`,
  description:
    'Software Engineer & Computer Science student at ITC Cambodia, currently interning as a Front-end Developer. Building high-performance web systems and responsive interfaces with Vue, Nuxt, React, and TypeScript.',
  url: 'https://portfolio.sanghakh122333.workers.dev/',
}
