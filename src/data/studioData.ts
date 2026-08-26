import { PortfolioItem, ServiceItem, ReviewItem, StatItem } from '../types';

export type ProjectItem = PortfolioItem;

export const STUDIO_INFO = {
  name: 'Nytrox Studio',
  tagline: 'Bold branding, VTuber characters, posters, and digital experiences for creators who refuse to blend in.',
  description: 'We build unmistakable visual identities for esports orgs, VTubers, streamers, and forward-thinking digital brands. From high-detail Live2D models and 3D chrome logos to high-CTR YouTube packaging and cinematic posters — every pixel is crafted with perfection.',
  aboutStory: 'Nytrox Studio was founded on a simple premise: in a creator economy overflowing with generic templates and AI cut-outs, authentic bespoke visual craftsmanship is what builds permanent digital empires. We operate at the intersection of high-fashion minimalism, dark luxury aesthetics, and mathematical conversion hierarchy.',
  availability: 'Taking bookings for Q3/Q4',
  email: 'nytroxstudio@gmail.com',
  socials: {
    instagram: 'https://www.instagram.com/nytroxstudio/',
    twitter: 'https://x.com/nytroxstudio1',
    linkedin: 'https://www.linkedin.com/in/nytrox-studio-b6a2a337a/',
  },
  stats: [
    { value: '250+', label: 'Projects Completed', sublabel: 'Global creator roster' },
    { value: '99.4%', label: 'Satisfaction Rate', sublabel: 'Over 140+ reviews' },
    { value: '4.9★', label: 'Average Rating', sublabel: 'Fiverr & Direct clients' },
    { value: '48h', label: 'Average Turnaround', sublabel: 'For core deliverables' }
  ]
};

export const STUDIO_STATS = STUDIO_INFO.stats;

export const PORTFOLIO_DATA: PortfolioItem[] = [
  // --- VTUBER DESIGN & LIVE2D RIGGING SHOWCASES (Videos & Emotes) ---
  {
    id: 'vtuber-gothic-demon-video',
    category: 'VTuber Design',
    title: 'Gothic Demon VTuber Rigging Reel',
    description: 'Full-body Live2D character rigging showcase featuring fluid head physics, multi-layered eye blinking, dynamic breathing, and physics pendulums.',
    image: '/portfolio-assets/IMG_7456.JPG',
    videoSrc: '/portfolio-assets/quality_restoration_20260826055256784.mp4',
    mediaType: 'video',
    alt: 'Gothic Demon VTuber Live2D Rigging Motion Reel',
    deliverables: ['Live2D Model Rig', 'VTubeStudio Profile', 'Physics Calibration', 'Stream Motion Reel'],
    tag: 'Live2D Motion'
  },
  {
    id: 'vtuber-cyber-ronin-video',
    category: 'VTuber Design',
    title: 'Cyber Ronin Character Debut Showcase',
    description: 'High-tier VTuber character animation showcase with katana motion, particle aura fx, expression hotkeys, and stream-ready tracking.',
    image: '/portfolio-assets/IMG_7471.JPG',
    videoSrc: '/portfolio-assets/quality_restoration_20260826055412441.mp4',
    mediaType: 'video',
    alt: 'Cyber Ronin VTuber Character Animation Debut Video',
    deliverables: ['Character Animation Reel', 'Full-Body Tracking', 'Custom Idle Cycles', 'Debut Video Asset'],
    tag: 'Debut Reel'
  },
  {
    id: 'vtuber-makima-emotes',
    category: 'VTuber Design',
    title: 'Makima 8-Piece Anime Emote Pack',
    description: 'Custom high-detail anime expression and stream emote pack featuring wave, angry, crying, sleeping, and glowing blushing states.',
    image: '/portfolio-assets/IMG_7456.JPG',
    alt: 'Makima Anime 8-Piece Stream Emote Pack',
    deliverables: ['8 Custom Emotes', 'Twitch / Discord Sizes', 'Badge PNGs (28px to 512px)'],
    tag: 'Emote Pack'
  },
  {
    id: 'vtuber-raven-chibi',
    category: 'VTuber Design',
    title: 'Raven Chibi Stream Emotes',
    description: 'Expressive chibi stream emote suite crafted with distinctive line-art and vibrant color grading for community engagement.',
    image: '/portfolio-assets/IMG_7457.JPG',
    alt: 'Raven Chibi Twitch and Discord Emotes',
    deliverables: ['5 Chibi Expressions', 'Twitch Tier Badges', 'Discord Emote Kit'],
    tag: 'Chibi Emotes'
  },
  {
    id: 'vtuber-yumeko-emotes',
    category: 'VTuber Design',
    title: 'Yumeko Jabami Expression Suite',
    description: 'Custom anime stream reaction emotes with typography labels (Hi, Haha, Angry, LOL, Cry) for high-energy streaming.',
    image: '/portfolio-assets/IMG_7458.JPG',
    alt: 'Yumeko Jabami Stream Emotes Sheet',
    deliverables: ['6 Anime Stream Badges', 'Emote Master Sheet', 'Community Badges'],
    tag: 'Stream Badges'
  },
  {
    id: 'vtuber-manga-art',
    category: 'VTuber Design',
    title: 'Indie Manga Character Concept',
    description: 'Hand-inked indie pop manga character illustration with expressive floral eyes and vintage comic book aesthetic.',
    image: '/portfolio-assets/IMG_7472.JPG',
    alt: 'Indie Manga Character Concept Illustration',
    deliverables: ['Character Concept Art', 'Color Palette Sheet', 'Sticker & Merch Illustration'],
    tag: 'Manga Concept'
  },

  // --- POSTER DESIGN & EDITORIAL ARTWORK ---
  {
    id: 'poster-esta-noche',
    category: 'Poster Design',
    title: 'Esta Noche — Anime Typography Poster',
    description: 'Cinematic glowing typography poster combining streetwear anime portraiture with dynamic red ambient lighting.',
    image: '/portfolio-assets/IMG_7467.JPG',
    alt: 'Esta Noche Anime Typography Poster',
    deliverables: ['Print-Ready Poster (300 DPI)', 'Social Media Cover', 'Album Artwork Asset'],
    tag: 'Album Cover'
  },
  {
    id: 'poster-noir-city',
    category: 'Poster Design',
    title: 'Noir City Cyberpunk Poster',
    description: 'High-contrast black-and-crimson noir poster featuring a halftone portrait, geometric wireframe eye motif, and muscle car silhouette.',
    image: '/portfolio-assets/IMG_7473.JPG',
    alt: 'Noir City Cyberpunk Editorial Poster',
    deliverables: ['Editorial Poster Design', 'High-Res Wall Art', 'Vector Brand Badges'],
    tag: 'Cyberpunk Noir'
  },
  {
    id: 'poster-internal-riot',
    category: 'Poster Design',
    title: 'Internal Riot Failure Poster',
    description: 'Acid cyberpunk editorial poster with halftone photographic portrait clipped through heavy condensed typography on hot magenta.',
    image: '/portfolio-assets/IMG_7474.JPG',
    alt: 'Internal Riot Failure Acid Typography Poster',
    deliverables: ['Acid Graphics Poster', 'Streetwear Apparel Print', 'Digital Cover Asset'],
    tag: 'Acid Graphics'
  },
  {
    id: 'poster-y2k-closer',
    category: 'Poster Design',
    title: "It's Closer Than You Think Poster",
    description: 'Y2K retro-futuristic halftone poster featuring chrome sports sunglasses with blimp reflection and bold red typography.',
    image: '/portfolio-assets/IMG_7475.JPG',
    alt: "It's Closer Than You Think Y2K Poster",
    deliverables: ['Y2K Poster Print', 'Vintage Halftone Grading', 'Digital Promo Graphic'],
    tag: 'Y2K Halftone'
  },
  {
    id: 'poster-kevin-langue',
    category: 'Poster Design',
    title: 'The Kevin Langue Show Poster',
    description: 'Raw editorial cutout poster with hand-drawn crayon star and crown doodle aesthetics crafted for podcast and show branding.',
    image: '/portfolio-assets/IMG_7469.JPG',
    alt: 'The Kevin Langue Show Editorial Poster',
    deliverables: ['Show Promo Art', 'Podcast Cover Asset', 'Merchandise Print File'],
    tag: 'Editorial Art'
  },

  // --- LOGO DESIGN, MASCOTS & 3D TYPOGRAPHY ---
  {
    id: 'logo-loxter-3d',
    category: 'Logo Design',
    title: 'Loxter 3D Chrome Identity',
    description: 'Futuristic 3D liquid chrome wordmark logo combined with stylized cyberpunk female character visuals.',
    image: '/portfolio-assets/IMG_7470.JPG',
    alt: 'Loxter 3D Chrome Wordmark Logo',
    deliverables: ['3D Chrome Vector Master', 'Liquid Chrome Typography', 'Avatar & Banner Kit'],
    tag: '3D Chrome'
  },
  {
    id: 'logo-wavez-neon',
    category: 'Logo Design',
    title: 'Wavez Neon Liquid Wordmark',
    description: 'Vibrant cyan neon 3D bubble typography logo with fluid refractive highlights and deep ambient glow.',
    image: '/portfolio-assets/IMG_7468.JPG',
    alt: 'Wavez Neon 3D Liquid Bubble Logo',
    deliverables: ['3D Wordmark Asset', 'Transparent PNG Masters', 'Apparel & Sticker Print'],
    tag: '3D Liquid'
  },
  {
    id: 'logo-bn-streetwear',
    category: 'Logo Design',
    title: 'BN Streetwear Melting Logo',
    description: 'Bold melting silhouette emblem with Swiss cheese cutout accents on vibrant orange for an urban apparel brand.',
    image: '/portfolio-assets/IMG_7460.JPG',
    alt: 'BN Streetwear Melting Typography Logo',
    deliverables: ['Vector Monogram Mark', 'Embroidery Vector File', 'Brand Guidelines Sheet'],
    tag: 'Streetwear'
  },
  {
    id: 'logo-starhead-minimal',
    category: 'Logo Design',
    title: 'Inverted Starhead Silhouette Mark',
    description: 'High-contrast minimal silhouette logo with a spiky starhead accent for an underground music & apparel identity.',
    image: '/portfolio-assets/IMG_7459.JPG',
    alt: 'Inverted Starhead Minimal Silhouette Logo',
    deliverables: ['Vector Silhouette Master', 'Screenprint Asset', 'Merch Vector Kit'],
    tag: 'Minimal Icon'
  },
  {
    id: 'logo-anime-creator',
    category: 'Logo Design',
    title: 'Anime Creator Mascot Avatar',
    description: 'Custom stylized anime portrait mascot logo with comic halftone backdrop and sticker outline for creator branding.',
    image: '/portfolio-assets/IMG_7461.JPG',
    alt: 'Anime Creator Mascot Profile Logo',
    deliverables: ['Vector Mascot Avatar', 'Social PFP Formats', 'Sticker Die-Cut File'],
    tag: 'Mascot Avatar'
  },
  {
    id: 'logo-cartoon-transformation',
    category: 'Logo Design',
    title: 'Creator Cartoon Transformation',
    description: 'Direct photo-to-cartoon character mascot transformation with vibrant vector line-art and YouTube gaming aesthetic.',
    image: '/portfolio-assets/IMG_7476.JPG',
    alt: 'Creator Photo to Cartoon Mascot Transformation',
    deliverables: ['Custom Cartoon Character', 'Vector Mascot Asset', 'Channel Branding PFP'],
    tag: 'Cartoon Mascot'
  },
  {
    id: 'logo-ff-gamer',
    category: 'Logo Design',
    title: 'FF Anime Gamer Mascot',
    description: 'Clean anime hoodie creator avatar with radial comic rays engineered for YouTube and Twitch profile identities.',
    image: '/portfolio-assets/IMG_7477.JPG',
    alt: 'FF Anime Gamer Mascot Profile Logo',
    deliverables: ['Anime Gamer PFP', 'Discord Icon Pack', 'Full Vector Master'],
    tag: 'Gamer Mascot'
  },

  // --- YOUTUBE PACKAGING & HIGH-CTR THUMBNAILS ---
  {
    id: 'yt-cybernetic-hands',
    category: 'YouTube Banner',
    title: 'Cybernetic Headshot Transformation',
    description: 'Official Nytrox Studio visual breakdown: Raw photo cutout transformed into a high-production cybernetic masterpiece with robotic hands and dark velvet grading.',
    image: '/portfolio-assets/IMG_7464.JPG',
    alt: 'Nytrox Studio Cybernetic Hands Packaging Transformation',
    deliverables: ['Key Visual Packaging', 'High-CTR Master File', 'Lighting & Color Grading'],
    tag: 'Creative Direction'
  },
  {
    id: 'yt-431k-etsy',
    category: 'YouTube Banner',
    title: '$431K eCommerce Breakdown Thumbnail',
    description: 'Engineered e-commerce YouTube thumbnail with floating UI sales notifications, directional arrows, and punchy contrast.',
    image: '/portfolio-assets/IMG_7462.JPG',
    alt: '$431K eCommerce YouTube Thumbnail Design',
    deliverables: ['High-CTR Thumbnail', 'A/B Test Variant', '1080p PSD File'],
    tag: 'High CTR'
  },
  {
    id: 'yt-deserted-review',
    category: 'YouTube Banner',
    title: 'Deserted Location Review Thumbnail',
    description: 'Story-driven real-estate review thumbnail with 1-star graphic card, saturated sky backdrop, and dramatic facial expression.',
    image: '/portfolio-assets/IMG_7463.JPG',
    alt: 'Deserted Review YouTube Thumbnail Design',
    deliverables: ['Click-Optimized Thumbnail', 'Focal Contrast Master', 'High-Res Asset'],
    tag: 'Reaction Thumbnail'
  },
  {
    id: 'yt-saas-balance',
    category: 'YouTube Banner',
    title: '$18K SaaS Revenue Dashboard Thumbnail',
    description: 'Clean finance creator thumbnail with a floating glass dashboard overlay, red trending curve, and calculated eye-tracking lines.',
    image: '/portfolio-assets/IMG_7465.JPG',
    alt: '$18K SaaS Revenue YouTube Thumbnail Design',
    deliverables: ['Fintech YouTube Asset', 'Glass UI Element', '1080p Master Export'],
    tag: 'Finance Growth'
  },

  // --- BANNER DESIGN ---
  {
    id: 'banner-spider',
    category: 'Banner Design',
    title: 'Web-Slinger Comic Banner',
    description: 'High-energy comic banner with dynamic speech bubbles, halftones, and cinematic action depth.',
    image: 'https://cdn.enter.pro/resources/uid_100168087/aca0165b-4842-4f.jpg',
    alt: 'Comic-style Spider-Man themed banner design',
    deliverables: ['YouTube Channel Art', 'Twitter/X Header', 'Twitch Offline Screen'],
    tag: 'Comic Style'
  },
  {
    id: 'banner-vip',
    category: 'Banner Design',
    title: 'Info VIP Anime Banner',
    description: 'Fiery anime-inspired promotional banner built to highlight VIP membership perks and exclusive community drops.',
    image: 'https://cdn.enter.pro/resources/uid_100168087/83d42970-490c-42.jpg',
    alt: 'Anime VIP info banner design',
    deliverables: ['Discord Banner', 'Event Promo Graphics', 'Membership Badges'],
    tag: 'Anime Promo'
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'logo-design',
    label: 'Logo Design',
    iconName: 'PenTool',
    shortDesc: "Iconic 3D chrome, minimal monograms, and hand-drawn marks that stick in your audience's memory.",
    deliverables: ['Vector & 3D Source Files', 'Transparent PNG/SVG Masters', 'Full Brand Guidelines', 'Color Palette & Typography'],
    features: ['Vector & 3D Source Files', 'Transparent PNG/SVG Masters', 'Full Brand Guidelines', 'Color Palette & Typography']
  },
  {
    id: 'vtuber-design',
    label: 'VTuber Design & Live2D',
    iconName: 'Sparkles',
    shortDesc: 'Layered character models, emotes, and expression sheets ready for Live2D rigging & VTubeStudio debuts.',
    deliverables: ['High-Res PSD with Cutout Layers', '3-View Reference Sheet', 'Custom Emote & Badge Pack', 'Expression Hotkeys Guide'],
    features: ['High-Res PSD with Cutout Layers', '3-View Reference Sheet', 'Custom Emote & Badge Pack', 'Expression Hotkeys Guide']
  },
  {
    id: 'poster-design',
    label: 'Poster & Cover Design',
    iconName: 'Layers',
    shortDesc: 'Cinematic acid graphics, cyberpunk editorial posters, and music album artwork engineered for print & digital.',
    deliverables: ['300 DPI Print Masters', 'Social Media Formats', 'Album Artwork Assets', 'Vector Typography Accents'],
    features: ['300 DPI Print Masters', 'Social Media Formats', 'Album Artwork Assets', 'Vector Typography Accents']
  },
  {
    id: 'youtube-packaging',
    label: 'YouTube Packaging & CTR',
    iconName: 'Tv',
    shortDesc: 'Click-generating thumbnails and channel header art that capture attention within 2.8 seconds.',
    deliverables: ['High-CTR Thumbnail Masters', 'A/B Test Variants', 'Channel Banner & Offline Screens', 'Color Grading LUTs'],
    features: ['High-CTR Thumbnail Masters', 'A/B Test Variants', 'Channel Banner & Offline Screens', 'Color Grading LUTs']
  },
  {
    id: 'banner-design',
    label: 'Social & Stream Banners',
    iconName: 'Compass',
    shortDesc: 'Cohesive banner designs across YouTube, Twitter/X, Discord, and Twitch that solidify your digital presence.',
    deliverables: ['Multi-Platform Headers', 'Custom Discord Banners', 'Offline & Intermission Screens', 'Schedule Graphics'],
    features: ['Multi-Platform Headers', 'Custom Discord Banners', 'Offline & Intermission Screens', 'Schedule Graphics']
  },
  {
    id: 'branding-identity',
    label: 'Full Identity Systems',
    iconName: 'Shield',
    shortDesc: 'End-to-end creative direction, overlay systems, and asset toolkits built for scalable growth.',
    deliverables: ['Complete Visual Identity Book', 'Social Media Asset Suite', 'Merchandise Vectors', 'Motion Graphics Package'],
    features: ['Complete Visual Identity Book', 'Social Media Asset Suite', 'Merchandise Vectors', 'Motion Graphics Package']
  }
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Katsuya_VT',
    role: 'Twitch Partner & Live2D Creator',
    rating: 5,
    date: 'August 2026',
    quote: 'Nytrox Studio delivered a Live2D model concept and full emote pack that completely exceeded my debut expectations. The layer cuts and attention to detail on the expressions are flawless.',
    avatarText: 'KV'
  },
  {
    id: 'rev-2',
    name: 'ApexVortex Gaming',
    role: 'Esports Team Captain',
    rating: 5,
    date: 'July 2026',
    quote: 'The 3D chrome logo and social banners elevated our esports team from looking like amateurs to a tier-one organization overnight. Lightning fast turnaround and great communication.',
    avatarText: 'AV'
  },
  {
    id: 'rev-3',
    name: 'CreatorBlueprint',
    role: 'YouTube Channel (420k Subs)',
    rating: 5,
    date: 'July 2026',
    quote: 'Our YouTube click-through rate jumped from 4.2% to 11.8% after switching to Nytrox Studio thumbnails. The visual contrast and typography hierarchy are pure genius.',
    avatarText: 'CB'
  },
  {
    id: 'rev-4',
    name: 'Solaria_Lore',
    role: 'Dark Fantasy Author & Streamer',
    rating: 5,
    date: 'June 2026',
    quote: 'Incredible work on the posters and album cover. Deep dark gothic aesthetic that matched my lore 100%. Will definitely be ordering the full brand expansion pack next!',
    avatarText: 'SL'
  }
];

export const INITIAL_REVIEWS = REVIEWS_DATA;