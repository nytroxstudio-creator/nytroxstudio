import { PortfolioItem, ServiceItem, ReviewItem, StatItem, PortfolioCategory } from '../types';

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
  // ==========================================
  // 1. VTUBER & LIVE2D (Strictly Models & Previews)
  // ==========================================
  {
    id: 'vtuber-gothic-demon-video',
    category: 'VTuber & Live2D',
    title: 'Gothic Demon VTuber Model',
    description: 'Full-body Live2D character model preview featuring fluid head physics, multi-layered eye blinking, dynamic breathing, and physics pendulums.',
    image: '/portfolio-assets/IMG_7456.JPG',
    videoSrc: '/portfolio-assets/quality_restoration_20260826055256784.mp4',
    mediaType: 'video',
    alt: 'Gothic Demon VTuber Live2D Rigging Motion Preview',
    deliverables: ['Live2D Model Rig', 'VTubeStudio Setup', 'Physics Calibration', 'Full Motion Preview'],
    tag: 'Live2D Preview',
    featured: true
  },
  {
    id: 'vtuber-cyber-ronin-video',
    category: 'VTuber & Live2D',
    title: 'Cyber Ronin VTuber Model',
    description: 'High-tier VTuber character animation preview with katana physics, particle aura fx, expression hotkeys, and stream-ready tracking.',
    image: '/portfolio-assets/IMG_7471.JPG',
    videoSrc: '/portfolio-assets/quality_restoration_20260826055412441.mp4',
    mediaType: 'video',
    alt: 'Cyber Ronin VTuber Character Animation Debut Preview',
    deliverables: ['Full Character Model', 'VTubeStudio Tracking', 'Custom Idle Cycles', 'Expression Hotkeys'],
    tag: 'Model Preview'
  },
  {
    id: 'vtuber-ronin',
    category: 'VTuber & Live2D',
    title: 'Ronin VTuber Character Concept',
    description: 'Custom male VTuber model with a moody monochrome & dark wardrobe, katana details, and fluid layer cutouts.',
    image: 'https://cdn.enter.pro/resources/uid_100168087/ecb6b7d7-10e6-4e.jpg',
    alt: 'Male anime VTuber character design in ronin outfit',
    deliverables: ['Full-Body Character Concept', 'Rigging-Ready Layers', 'Emote Sheet'],
    tag: 'Character Model'
  },
  {
    id: 'vtuber-vampire',
    category: 'VTuber & Live2D',
    title: 'Vampire Demoness VTuber Model',
    description: 'Gothic demon-vampire VTuber design with sculpted horns, dark velvet textures, and intricate lace detailing.',
    image: 'https://cdn.enter.pro/resources/uid_100168087/d9635aa8-e049-4e.jpg',
    alt: 'Female demon vampire VTuber character design',
    deliverables: ['Character Sheet (3 Angles)', 'Expression Pack', 'Debut Visuals'],
    tag: 'Character Model'
  },

  // ==========================================
  // 2. EMOTES (Dedicated Emotes & Stream Badges)
  // ==========================================
  {
    id: 'emote-makima',
    category: 'Emotes',
    title: 'Makima 8-Piece Anime Emote Pack',
    description: 'Custom high-detail anime expression and stream emote pack featuring wave, angry, crying, sleeping, and glowing blushing states.',
    image: '/portfolio-assets/IMG_7456.JPG',
    alt: 'Makima Anime 8-Piece Stream Emote Pack',
    deliverables: ['8 Custom Emotes', 'Twitch / Discord Sizes', 'Badge PNGs (28px to 512px)'],
    tag: 'Emote Suite',
    featured: true
  },
  {
    id: 'emote-raven-chibi',
    category: 'Emotes',
    title: 'Raven Chibi Stream Emotes',
    description: 'Expressive chibi stream emote suite crafted with distinctive line-art and vibrant color grading for community engagement.',
    image: '/portfolio-assets/IMG_7457.JPG',
    alt: 'Raven Chibi Twitch and Discord Emotes',
    deliverables: ['5 Chibi Expressions', 'Twitch Tier Badges', 'Discord Emote Kit'],
    tag: 'Chibi Badges'
  },
  {
    id: 'emote-yumeko',
    category: 'Emotes',
    title: 'Yumeko Jabami Expression Suite',
    description: 'Custom anime stream reaction emotes with typography labels (Hi, Haha, Angry, LOL, Cry) for high-energy streaming.',
    image: '/portfolio-assets/IMG_7458.JPG',
    alt: 'Yumeko Jabami Stream Emotes Sheet',
    deliverables: ['6 Anime Stream Badges', 'Emote Master Sheet', 'Community Badges'],
    tag: 'Reaction Emotes'
  },

  // ==========================================
  // 3. YOUTUBE THUMBNAILS (High-CTR Packaging)
  // ==========================================
  {
    id: 'yt-cybernetic-hands',
    category: 'YouTube Thumbnails',
    title: 'Cybernetic Headshot Transformation',
    description: 'Official Nytrox Studio visual breakdown: Raw photo cutout transformed into a high-production cybernetic masterpiece with robotic hands and dark velvet grading.',
    image: '/portfolio-assets/IMG_7464.JPG',
    alt: 'Nytrox Studio Cybernetic Hands Packaging Transformation',
    deliverables: ['Key Visual Packaging', 'High-CTR Master File', 'Lighting & Color Grading'],
    tag: 'Creative Packaging',
    featured: true
  },
  {
    id: 'yt-431k-etsy',
    category: 'YouTube Thumbnails',
    title: '$431K eCommerce Breakdown Thumbnail',
    description: 'Engineered e-commerce YouTube thumbnail with floating UI sales notifications, directional arrows, and punchy contrast.',
    image: '/portfolio-assets/IMG_7462.JPG',
    alt: '$431K eCommerce YouTube Thumbnail Design',
    deliverables: ['High-CTR Thumbnail', 'A/B Test Variant', '1080p PSD File'],
    tag: 'E-Commerce CTR'
  },
  {
    id: 'yt-deserted-review',
    category: 'YouTube Thumbnails',
    title: 'Deserted Location Review Thumbnail',
    description: 'Story-driven real-estate review thumbnail with 1-star graphic card, saturated sky backdrop, and dramatic facial expression.',
    image: '/portfolio-assets/IMG_7463.JPG',
    alt: 'Deserted Review YouTube Thumbnail Design',
    deliverables: ['Click-Optimized Thumbnail', 'Focal Contrast Master', 'High-Res Asset'],
    tag: 'Reaction Thumbnail'
  },
  {
    id: 'yt-saas-balance',
    category: 'YouTube Thumbnails',
    title: '$18K SaaS Revenue Dashboard Thumbnail',
    description: 'Clean finance creator thumbnail with a floating glass dashboard overlay, red trending curve, and calculated eye-tracking lines.',
    image: '/portfolio-assets/IMG_7465.JPG',
    alt: '$18K SaaS Revenue YouTube Thumbnail Design',
    deliverables: ['Fintech YouTube Asset', 'Glass UI Element', '1080p Master Export'],
    tag: 'Fintech Dashboard'
  },
  {
    id: 'yt-copy-me',
    category: 'YouTube Thumbnails',
    title: 'Pinterest Strategy Thumbnail',
    description: 'High-contrast reaction thumbnail engineered with strategic eye focal points for maximum CTR.',
    image: 'https://cdn.enter.pro/resources/uid_100168087/4c12360f-7af9-48.jpg',
    alt: 'Pinterest earnings YouTube thumbnail design',
    deliverables: ['High-CTR Thumbnail', 'A/B Test Variant', 'Color Grading LUT'],
    tag: 'High CTR'
  },
  {
    id: 'yt-linkedin',
    category: 'YouTube Thumbnails',
    title: 'Creator Growth Mastery Thumbnail',
    description: 'Bold typography and clean editorial styling thumbnail built for educational and growth-focused content.',
    image: 'https://cdn.enter.pro/resources/uid_100168087/4ad9bd60-6f20-44.jpg',
    alt: 'LinkedIn growth tips YouTube thumbnail design',
    deliverables: ['Tutorial Thumbnail', 'Typography Master Asset', 'Mobile Optimized'],
    tag: 'Editorial CTR'
  },

  // ==========================================
  // 4. POSTERS & EDITORIAL ART
  // ==========================================
  {
    id: 'poster-esta-noche',
    category: 'Posters & Art',
    title: 'Esta Noche — Anime Typography Poster',
    description: 'Cinematic glowing typography poster combining streetwear anime portraiture with dynamic red ambient lighting.',
    image: '/portfolio-assets/IMG_7467.JPG',
    alt: 'Esta Noche Anime Typography Poster',
    deliverables: ['Print-Ready Poster (300 DPI)', 'Social Media Cover', 'Album Artwork Asset'],
    tag: 'Album Artwork',
    featured: true
  },
  {
    id: 'poster-noir-city',
    category: 'Posters & Art',
    title: 'Noir City Cyberpunk Poster',
    description: 'High-contrast black-and-crimson noir poster featuring a halftone portrait, geometric wireframe eye motif, and muscle car silhouette.',
    image: '/portfolio-assets/IMG_7473.JPG',
    alt: 'Noir City Cyberpunk Editorial Poster',
    deliverables: ['Editorial Poster Design', 'High-Res Wall Art', 'Vector Brand Badges'],
    tag: 'Cyberpunk Noir'
  },
  {
    id: 'poster-internal-riot',
    category: 'Posters & Art',
    title: 'Internal Riot Failure Poster',
    description: 'Acid cyberpunk editorial poster with halftone photographic portrait clipped through heavy condensed typography on hot magenta.',
    image: '/portfolio-assets/IMG_7474.JPG',
    alt: 'Internal Riot Failure Acid Typography Poster',
    deliverables: ['Acid Graphics Poster', 'Streetwear Apparel Print', 'Digital Cover Asset'],
    tag: 'Acid Graphics'
  },
  {
    id: 'poster-y2k-closer',
    category: 'Posters & Art',
    title: "It's Closer Than You Think Poster",
    description: 'Y2K retro-futuristic halftone poster featuring chrome sports sunglasses with blimp reflection and bold red typography.',
    image: '/portfolio-assets/IMG_7475.JPG',
    alt: "It's Closer Than You Think Y2K Poster",
    deliverables: ['Y2K Poster Print', 'Vintage Halftone Grading', 'Digital Promo Graphic'],
    tag: 'Y2K Halftone'
  },
  {
    id: 'poster-kevin-langue',
    category: 'Posters & Art',
    title: 'The Kevin Langue Show Poster',
    description: 'Raw editorial cutout poster with hand-drawn crayon star and crown doodle aesthetics crafted for podcast and show branding.',
    image: '/portfolio-assets/IMG_7469.JPG',
    alt: 'The Kevin Langue Show Editorial Poster',
    deliverables: ['Show Promo Art', 'Podcast Cover Asset', 'Merchandise Print File'],
    tag: 'Editorial Print'
  },
  {
    id: 'vtuber-manga-art',
    category: 'Posters & Art',
    title: 'Indie Manga Character Illustration',
    description: 'Hand-inked indie pop manga character illustration with expressive floral eyes and vintage comic book aesthetic.',
    image: '/portfolio-assets/IMG_7472.JPG',
    alt: 'Indie Manga Character Concept Illustration',
    deliverables: ['Character Concept Art', 'Color Palette Sheet', 'Sticker & Merch Illustration'],
    tag: 'Manga Illustration'
  },

  // ==========================================
  // 5. 3D LOGOS & BRAND MARKS
  // ==========================================
  {
    id: 'logo-loxter-3d',
    category: '3D Logos & Marks',
    title: 'Loxter 3D Chrome Identity',
    description: 'Futuristic 3D liquid chrome wordmark logo combined with stylized cyberpunk female character visuals.',
    image: '/portfolio-assets/IMG_7470.JPG',
    alt: 'Loxter 3D Chrome Wordmark Logo',
    deliverables: ['3D Chrome Vector Master', 'Liquid Chrome Typography', 'Avatar & Banner Kit'],
    tag: 'Liquid Chrome',
    featured: true
  },
  {
    id: 'logo-wavez-neon',
    category: '3D Logos & Marks',
    title: 'Wavez Neon Liquid Wordmark',
    description: 'Vibrant cyan neon 3D bubble typography logo with fluid refractive highlights and deep ambient glow.',
    image: '/portfolio-assets/IMG_7468.JPG',
    alt: 'Wavez Neon 3D Liquid Bubble Logo',
    deliverables: ['3D Wordmark Asset', 'Transparent PNG Masters', 'Apparel & Sticker Print'],
    tag: '3D Bubble Type'
  },
  {
    id: 'logo-bn-streetwear',
    category: '3D Logos & Marks',
    title: 'BN Streetwear Melting Logo',
    description: 'Bold melting silhouette emblem with Swiss cheese cutout accents on vibrant orange for an urban apparel brand.',
    image: '/portfolio-assets/IMG_7460.JPG',
    alt: 'BN Streetwear Melting Typography Logo',
    deliverables: ['Vector Monogram Mark', 'Embroidery Vector File', 'Brand Guidelines Sheet'],
    tag: 'Streetwear Mark'
  },
  {
    id: 'logo-starhead-minimal',
    category: '3D Logos & Marks',
    title: 'Inverted Starhead Silhouette Mark',
    description: 'High-contrast minimal silhouette logo with a spiky starhead accent for an underground music & apparel identity.',
    image: '/portfolio-assets/IMG_7459.JPG',
    alt: 'Inverted Starhead Minimal Silhouette Logo',
    deliverables: ['Vector Silhouette Master', 'Screenprint Asset', 'Merch Vector Kit'],
    tag: 'Minimal Silhouette'
  },
  {
    id: 'logo-keigo',
    category: '3D Logos & Marks',
    title: 'Keigo Esports Emblem',
    description: 'Sharp geometric type with a demon-mask accent engineered for a high-energy gaming & esports identity.',
    image: 'https://cdn.enter.pro/resources/uid_100168087/6cc7fca6-0fe9-46.jpg',
    alt: 'Keigo logo design',
    deliverables: ['Geometric Typeface', 'Oni Mask Emblem', 'Stream Overlay Kit'],
    tag: 'Esports Emblem'
  },
  {
    id: 'logo-kozo',
    category: '3D Logos & Marks',
    title: 'Kozo Luxury Monogram',
    description: 'Ornate calligraphic monogram framed in a striking symmetry pattern for a luxury streetwear label.',
    image: 'https://cdn.enter.pro/resources/uid_100168087/06f7621b-33e8-40.jpg',
    alt: 'Kozo monogram logo design',
    deliverables: ['Calligraphic Monogram', 'Embossing Vector', 'Luxury Guidelines'],
    tag: 'Luxury Monogram'
  },

  // ==========================================
  // 6. MASCOTS & AVATARS
  // ==========================================
  {
    id: 'logo-anime-creator',
    category: 'Mascots & Avatars',
    title: 'Anime Creator Mascot Avatar',
    description: 'Custom stylized anime portrait mascot logo with comic halftone backdrop and sticker outline for creator branding.',
    image: '/portfolio-assets/IMG_7461.JPG',
    alt: 'Anime Creator Mascot Profile Logo',
    deliverables: ['Vector Mascot Avatar', 'Social PFP Formats', 'Sticker Die-Cut File'],
    tag: 'Mascot Avatar',
    featured: true
  },
  {
    id: 'logo-cartoon-transformation',
    category: 'Mascots & Avatars',
    title: 'Creator-to-Cartoon Mascot',
    description: 'Direct photo-to-cartoon character mascot transformation with vibrant vector line-art and YouTube gaming aesthetic.',
    image: '/portfolio-assets/IMG_7476.JPG',
    alt: 'Creator Photo to Cartoon Mascot Transformation',
    deliverables: ['Custom Cartoon Character', 'Vector Mascot Asset', 'Channel Branding PFP'],
    tag: 'Photo Transformation'
  },
  {
    id: 'logo-ff-gamer',
    category: 'Mascots & Avatars',
    title: 'FF Anime Gamer Mascot',
    description: 'Clean anime hoodie creator avatar with radial comic rays engineered for YouTube and Twitch profile identities.',
    image: '/portfolio-assets/IMG_7477.JPG',
    alt: 'FF Anime Gamer Mascot Profile Logo',
    deliverables: ['Anime Gamer PFP', 'Discord Icon Pack', 'Full Vector Master'],
    tag: 'Gamer Avatar'
  },

  // ==========================================
  // 7. SOCIAL BANNERS
  // ==========================================
  {
    id: 'banner-spider',
    category: 'Social Banners',
    title: 'Web-Slinger Comic Banner',
    description: 'High-energy comic banner with dynamic speech bubbles, halftones, and cinematic action depth.',
    image: 'https://cdn.enter.pro/resources/uid_100168087/aca0165b-4842-4f.jpg',
    alt: 'Comic-style Spider-Man themed banner design',
    deliverables: ['YouTube Channel Art', 'Twitter/X Header', 'Twitch Offline Screen'],
    tag: 'Comic Banner'
  },
  {
    id: 'banner-vip',
    category: 'Social Banners',
    title: 'Info VIP Anime Banner',
    description: 'Fiery anime-inspired promotional banner built to highlight VIP membership perks and exclusive community drops.',
    image: 'https://cdn.enter.pro/resources/uid_100168087/83d42970-490c-42.jpg',
    alt: 'Anime VIP info banner design',
    deliverables: ['Discord Banner', 'Event Promo Graphics', 'Membership Badges'],
    tag: 'Discord Promo'
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
    label: 'YouTube Thumbnails & Packaging',
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