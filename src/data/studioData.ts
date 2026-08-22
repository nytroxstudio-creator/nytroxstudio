import { PortfolioItem, ServiceItem, ReviewItem, StatItem } from '../types';

export const STUDIO_INFO = {
  name: 'Nytrox',
  suffix: 'Studio',
  tagline: 'Bold branding and design for creators who refuse to blend in.',
  description: 'We craft striking logos, VTuber characters, banners, and digital experiences that give brands and creators an unmistakable identity. From concept to pixel-perfect execution, Nytrox Studio turns bold ideas into visuals that command attention.',
  aboutStory: 'Nytrox Studio is a creative agency built for brands, streamers, and creators who want more than average design. We blend dark, atmospheric aesthetics with sharp, modern craftsmanship to deliver logos, characters, and digital experiences that leave a lasting impression. Every project is treated as a signature piece — no templates, no shortcuts.',
  established: '2024',
  availability: 'Available for Select Q3/Q4 Projects',
  socials: [
    { label: 'Instagram', href: 'https://www.instagram.com/nytroxstudio/', username: '@nytroxstudio' },
    { label: 'X (Twitter)', href: 'https://x.com/nytroxstudio1', username: '@nytroxstudio1' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nytrox-studio-b6a2a337a/', username: 'LinkedIn Profile' }
  ]
};

export const STUDIO_STATS: StatItem[] = [
  { value: '150+', label: 'Projects Delivered', sublabel: 'Across 14+ countries' },
  { value: '99.4%', label: 'Client Satisfaction', sublabel: '5-star creator reviews' },
  { value: '50M+', label: 'Creator Impressions', sublabel: 'Thumbnails & branding reach' },
  { value: '48h', label: 'Fast Turnaround', sublabel: 'Initial conceptual drafts' }
];

export const PORTFOLIO_DATA: PortfolioItem[] = [
  // Logo Design
  {
    id: 'logo-spicy',
    category: 'Logo Design',
    title: 'Spicy',
    description: 'Playful negative-space wordmark blending modern typography and pepper iconography for a bold snack brand.',
    image: 'https://cdn.enter.pro/resources/uid_100168087/76c9b5ba-328b-46.jpg',
    alt: 'Spicy wordmark logo design',
    deliverables: ['Vector Wordmark', 'Negative Space Mark', 'Brand Color Kit'],
    tag: 'Wordmark'
  },
  {
    id: 'logo-underdog',
    category: 'Logo Design',
    title: 'Underdog Studio',
    description: 'Hand-drawn distressed brush lettering paired with a fierce skull mark for an underground creator collective.',
    image: 'https://cdn.enter.pro/resources/uid_100168087/b2d6d419-2114-4b.jpg',
    alt: 'Underdog Studio logo design',
    deliverables: ['Custom Lettering', 'Mascot Skull Mark', 'Monochrome Kit'],
    tag: 'Hand-Lettered'
  },
  {
    id: 'logo-keigo',
    category: 'Logo Design',
    title: 'Keigo',
    description: 'Sharp geometric type with a demon-mask accent engineered for a high-energy gaming & esports identity.',
    image: 'https://cdn.enter.pro/resources/uid_100168087/6cc7fca6-0fe9-46.jpg',
    alt: 'Keigo logo design',
    deliverables: ['Geometric Typeface', 'Oni Mask Emblem', 'Stream Overlay Kit'],
    tag: 'Esports'
  },
  {
    id: 'logo-kozo',
    category: 'Logo Design',
    title: 'Kozo',
    description: 'Ornate calligraphic monogram framed in a striking symmetry pattern for a luxury streetwear label.',
    image: 'https://cdn.enter.pro/resources/uid_100168087/06f7621b-33e8-40.jpg',
    alt: 'Kozo monogram logo design',
    deliverables: ['Calligraphic Monogram', 'Embossing Vector', 'Luxury Guidelines'],
    tag: 'Monogram'
  },

  // Banner Design
  {
    id: 'banner-spider',
    category: 'Banner Design',
    title: 'Web-Slinger Banner',
    description: 'High-energy comic banner with dynamic speech bubbles, halftones, and cinematic action depth.',
    image: 'https://cdn.enter.pro/resources/uid_100168087/aca0165b-4842-4f.jpg',
    alt: 'Comic-style Spider-Man themed banner design',
    deliverables: ['YouTube Channel Art', 'Twitter/X Header', 'Twitch Offline Screen'],
    tag: 'Comic Style'
  },
  {
    id: 'banner-vip',
    category: 'Banner Design',
    title: 'Info VIP Banner',
    description: 'Fiery anime-inspired promotional banner built to highlight VIP membership perks and exclusive community drops.',
    image: 'https://cdn.enter.pro/resources/uid_100168087/83d42970-490c-42.jpg',
    alt: 'Anime VIP info banner design',
    deliverables: ['Discord Banner', 'Event Promo Graphics', 'Membership Badges'],
    tag: 'Anime Promo'
  },

  // VTuber Design
  {
    id: 'vtuber-ronin',
    category: 'VTuber Design',
    title: 'Ronin VTuber',
    description: 'Custom male VTuber model with a moody monochrome & dark wardrobe, katana details, and fluid layer cutouts.',
    image: 'https://cdn.enter.pro/resources/uid_100168087/ecb6b7d7-10e6-4e.jpg',
    alt: 'Male anime VTuber character design in ronin outfit',
    deliverables: ['Full-Body Character Concept', 'Rigging-Ready Layers', 'Emote Sheet'],
    tag: 'Live2D Ready'
  },
  {
    id: 'vtuber-vampire',
    category: 'VTuber Design',
    title: 'Vampire VTuber',
    description: 'Gothic demon-vampire VTuber design with sculpted horns, dark velvet textures, and intricate lace detailing.',
    image: 'https://cdn.enter.pro/resources/uid_100168087/d9635aa8-e049-4e.jpg',
    alt: 'Female demon vampire VTuber character design',
    deliverables: ['Character Sheet (3 Angles)', 'Expression Pack', 'Debut Visuals'],
    tag: 'Gothic Model'
  },

  // YouTube Banner & Thumbnails
  {
    id: 'yt-copy-me',
    category: 'YouTube Banner',
    title: 'Copy Me Thumbnail',
    description: 'High-contrast reaction thumbnail engineered with strategic eye focal points for maximum CTR.',
    image: 'https://cdn.enter.pro/resources/uid_100168087/4c12360f-7af9-48.jpg',
    alt: 'Pinterest earnings YouTube thumbnail design',
    deliverables: ['High-CTR Thumbnail', 'A/B Test Variant', 'Color Grading LUT'],
    tag: 'High CTR'
  },
  {
    id: 'yt-linkedin',
    category: 'YouTube Banner',
    title: 'LinkedIn Growth Thumbnail',
    description: 'Bold typography and clean editorial styling thumbnail built for educational and growth-focused content.',
    image: 'https://cdn.enter.pro/resources/uid_100168087/4ad9bd60-6f20-44.jpg',
    alt: 'LinkedIn growth tips YouTube thumbnail design',
    deliverables: ['Tutorial Thumbnail', 'Typography Master Asset', 'Mobile Optimized'],
    tag: 'Growth'
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'logo-design',
    label: 'Logo Design',
    iconName: 'PenTool',
    shortDesc: "Iconic, negative-space, and hand-drawn marks that stick in your audience's memory.",
    features: ['Custom Typography', 'Vector Source Files', 'Color & Monochrome Kits', 'Full Commercial License']
  },
  {
    id: 'branding',
    label: 'Branding & Identity',
    iconName: 'Sparkles',
    shortDesc: 'Comprehensive visual systems that unite your content, social handles, and merch.',
    features: ['Brand Guidelines PDF', 'Typography Hierarchy', 'Color Palette Systems', 'Social Media Templates']
  },
  {
    id: 'vtuber-design',
    label: 'VTuber Character Design',
    iconName: 'UserCheck',
    shortDesc: 'Complete character conceptualization ready for Live2D rigging with deep lore aesthetics.',
    features: ['Full-Body Turnarounds', 'Layer Separation PSD', 'Expression Pack (x6)', 'Streaming Emotes']
  },
  {
    id: 'banner-design',
    label: 'Banner & Header Design',
    iconName: 'LayoutTemplate',
    shortDesc: 'Cinematic channel art and social headers tailored for high-resolution displays.',
    features: ['Multi-Platform Sizing', 'Custom Illustrative Backgrounds', 'Call-to-Action Elements', 'Schedule Layouts']
  },
  {
    id: 'youtube-branding',
    label: 'YouTube Packaging',
    iconName: 'Youtube',
    shortDesc: 'High-CTR thumbnail strategies and complete channel packaging built for creator growth.',
    features: ['High-CTR Thumbnails', 'End Screen Graphics', 'Stream Overlays', 'A/B Testing Strategies']
  },
  {
    id: 'graphic-design',
    label: 'Graphic Design & Merch',
    iconName: 'Palette',
    shortDesc: 'Posters, album art, merchandise graphics, and bespoke digital illustrations.',
    features: ['Merch-Ready Vector Assets', 'High-Res Print Files (300 DPI)', 'Apparel Mockups', 'Custom Vector Art']
  },
  {
    id: 'web-design',
    label: 'Web UI/UX Design',
    iconName: 'Monitor',
    shortDesc: 'Dark-mode luxury website layouts and creator portfolio experiences.',
    features: ['Figma Design Files', 'Mobile Responsive Layouts', 'Interactive Micro-states', 'Design System Library']
  },
  {
    id: 'web-dev',
    label: 'Web Development',
    iconName: 'Code',
    shortDesc: 'Lightning-fast React & Next.js digital hubs crafted with fluid 60fps animations.',
    features: ['React / Tailwind Architecture', 'Fluid Canvas Animations', 'SEO & Performance Optimized', 'Domain & Cloud Deploy']
  }
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Marcus Reyes',
    role: 'Gaming Creator & Streamer',
    quote: 'Nytrox Studio nailed my brand identity in one shot. The logo perfectly captures the energy I wanted. Absolutely unmatched aesthetic.',
    rating: 5,
    date: '2 weeks ago',
    avatarText: 'MR'
  },
  {
    id: 'rev-2',
    name: 'Aiko Tanaka',
    role: 'VTuber & Content Creator',
    quote: 'My VTuber design exceeded every expectation. The attention to detail on the character and layer separation was incredible. 10/10.',
    rating: 5,
    date: '1 month ago',
    avatarText: 'AT'
  },
  {
    id: 'rev-3',
    name: 'Diego Fernandez',
    role: 'YouTube Creator (450K Subs)',
    quote: 'Fast turnaround and premium quality. My YouTube thumbnails have never gotten this much engagement. CTR jumped by 4.2%.',
    rating: 5,
    date: '1 month ago',
    avatarText: 'DF'
  },
  {
    id: 'rev-4',
    name: 'Priya Sharma',
    role: 'Tech & Lifestyle Producer',
    quote: 'The banner design they made for my channel is stunning. Professional, creative, and on-brand. They delivered ahead of schedule.',
    rating: 5,
    date: '2 months ago',
    avatarText: 'PS'
  },
  {
    id: 'rev-5',
    name: 'Lucas Bennett',
    role: 'Founder, Apex Digital',
    quote: 'Working with Nytrox Studio felt effortless. They understood my vision and delivered beyond it. Truly a top-tier studio.',
    rating: 5,
    date: '3 months ago',
    avatarText: 'LB'
  },
  {
    id: 'rev-6',
    name: 'Sofia Moreau',
    role: 'Brand Director',
    quote: 'Incredible design team. My rebrand completely transformed how my audience perceives my content. Premium dark aesthetic done right.',
    rating: 5,
    date: '3 months ago',
    avatarText: 'SM'
  }
];