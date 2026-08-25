export interface BlogPost {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: 'Branding & Identity' | 'VTuber & 3D' | 'YouTube Packaging' | 'Design Insights';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  featured?: boolean;
}

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'the-art-of-dark-mode-branding',
    title: 'The Art of Dark Mode Branding: Why High-Contrast Visuals Command 3x More Attention',
    excerpt: 'Explore how deep obsidian palettes and metallic accents evoke luxury, mystery, and unmatched digital authority for modern creators and forward-thinking brands.',
    coverImage: 'https://cdn.enter.pro/resources/uid_100168087/76c9b5ba-328b-46.jpg',
    category: 'Branding & Identity',
    author: {
      name: 'Nytrox Studio Editorial',
      role: 'Brand Identity Specialists',
      avatar: 'NS'
    },
    publishedAt: 'Aug 24, 2026',
    readTime: '4 min read',
    featured: true,
    content: "## The Art of Dark Mode Branding\n\nIn a digital landscape crowded with generic neon gradients and cookie-cutter white templates, dark mode branding has emerged as the definitive signature of authority, prestige, and cinematic sophistication.\n\n## Why High Contrast Works\n\nWhen content is displayed on an ultra-dark canvas, every highlight, accent stroke, and typography choice gains dramatic visual priority. Human perception naturally gravitates toward points of illumination against shadow.\n\n### 3 Key Principles We Follow at Nytrox Studio:\n1. Never Pure Black: Pure absolute black creates harsh eye strain. Using nuanced obsidian tones like deep charcoal maintains depth and warmth.\n2. Hairline Border Luminance: Sub-pixel borders with 8-15% white opacity establish clear structural boundaries without cluttering the screen.\n3. Selective Spotlight Accents: Restricting bright colors to focal interactions creates an instinctual visual hierarchy.\n\n## Building for the Modern Creator\n\nWhether you are a gaming streamer, a VTuber launching a new model, or an agency redesigning its core visual mark, dark aesthetic identity immediately communicates high production value."
  },
  {
    id: 'post-2',
    slug: 'vtuber-model-design-live2d-guide',
    title: 'From Concept to Rigging: The Ultimate Blueprint for Live2D VTuber Character Design',
    excerpt: 'A comprehensive deep dive into layer separation, expression physics, and aesthetic lore conceptualization for high-tier Live2D debuts.',
    coverImage: 'https://cdn.enter.pro/resources/uid_100168087/ecb6b7d7-10e6-4e.jpg',
    category: 'VTuber & 3D',
    author: {
      name: 'Nytrox Character Lab',
      role: 'Lead Concept Artist',
      avatar: 'NC'
    },
    publishedAt: 'Aug 18, 2026',
    readTime: '6 min read',
    featured: false,
    content: "## From Concept to Rigging: VTuber Design Blueprint\n\nCreating a successful VTuber model requires more than good illustration skills — it requires an engineering mindset for layer physics, mesh deforming, and stream presence.\n\n## Layer Separation Standards\n\nFor a model to feel alive, every element must be partitioned into dedicated, clean layers with generous bleed margins:\n- Head & Facial Mesh: Sclera, pupils, highlights, eyelids (upper & lower), eyelashes, blush layers, mouth interior, and teeth.\n- Hair Physics: Front bangs, side locks, back hair layers, and individual dynamic strands.\n- Clothing & Accessories: Katanas, jewelry, capes, and jacket overlays with independent physics pendulums.\n\n## Consistency in Lore & Silhouette\n\nThe silhouette is what your audience recognizes first in a crowded sidebar or Twitch directory. Sharp angular accents, distinct color accents, and asymmetrical accessories make your character instantly memorable."
  },
  {
    id: 'post-3',
    slug: 'youtube-thumbnail-ctr-secrets',
    title: 'The Psychology Behind High-CTR YouTube Thumbnails: Engineering the 3-Second Click',
    excerpt: 'How leading creators leverage directional focal lines, micro-expressions, and typographic contrast to turn impressions into guaranteed views.',
    coverImage: 'https://cdn.enter.pro/resources/uid_100168087/4c12360f-7af9-48.jpg',
    category: 'YouTube Packaging',
    author: {
      name: 'Nytrox Growth Team',
      role: 'Packaging Strategist',
      avatar: 'NG'
    },
    publishedAt: 'Aug 12, 2026',
    readTime: '5 min read',
    featured: false,
    content: "## The Psychology of High-CTR Thumbnails\n\nYou only have 1.2 to 2.8 seconds to convince a viewer scrolling on mobile to stop and tap your video. The thumbnail is your billboard.\n\n## The 3-Element Rule\n\nEvery world-class thumbnail should communicate exactly three things:\n1. The Catalyst (Subject): An expressive, high-contrast face or focal object positioned on the rule of thirds.\n2. The Tension (Context): The visual paradox or curiosity element that creates an unresolved question.\n3. The Proof (Graphic Accent): Maximum 3-4 words of punchy, bold custom lettering with crisp drop shadows.\n\n## Color Grading for Algorithmic Punch\n\nViewers often browse in dark mode. Warm highlights, rim lighting, and strategic background desaturation ensure your subject separates cleanly from the interface."
  },
  {
    id: 'post-4',
    slug: 'why-custom-identity-beats-ai-templates',
    title: 'Why Bespoke Identity Always Wins: The Long-Term Value of Hand-Crafted Visual Craftsmanship',
    excerpt: 'In an era of automated generative art, authentic custom-tailored identity is the ultimate moat for high-tier creators and digital businesses.',
    coverImage: 'https://cdn.enter.pro/resources/uid_100168087/b2d6d419-2114-4b.jpg',
    category: 'Design Insights',
    author: {
      name: 'Nytrox Creative Direction',
      role: 'Founder & Lead Designer',
      avatar: 'NX'
    },
    publishedAt: 'Aug 04, 2026',
    readTime: '4 min read',
    featured: false,
    content: "## Why Bespoke Identity Always Wins\n\nAutomation can generate generic logos in seconds, but it cannot understand cultural nuance, personal branding lore, or emotional resonance.\n\n## The Problem with Generic Templates\n\nWhen five hundred creators use similar stock shapes, audience trust is eroded before a single video or stream even plays. Audiences inherently recognize custom craftsmanship.\n\n## Tailored Visual Craftsmanship\n\nA custom brand mark is built around your specific audience demographic, streaming tone, and long-term merchandise aspirations. It is an asset engineered to scale for years."
  }
];

export async function fetchWordPressPosts(wpBaseUrl?: string): Promise<BlogPost[]> {
  const endpoint = wpBaseUrl || (import.meta as any).env?.VITE_WP_API_URL;
  if (!endpoint) {
    return INITIAL_BLOG_POSTS;
  }

  try {
    const url = `${endpoint.replace(/\/$/, '')}/wp-json/wp/v2/posts?_embed&per_page=12`;
    const response = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error(`WordPress API returned ${response.status}`);

    const data = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      return INITIAL_BLOG_POSTS;
    }

    return data.map((item: any) => {
      const media = item._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
        'https://cdn.enter.pro/resources/uid_100168087/76c9b5ba-328b-46.jpg';
      const author = item._embedded?.author?.[0]?.name || 'Nytrox Studio Editorial';
      const categories = item._embedded?.['wp:term']?.[0]?.map((t: any) => t.name) || ['Design Insights'];

      return {
        id: item.id,
        slug: item.slug,
        title: item.title?.rendered || 'Untitled Post',
        excerpt: item.excerpt?.rendered?.replace(/<[^>]*>?/gm, '').trim() || '',
        content: item.content?.rendered || '',
        coverImage: media,
        category: (categories[0] as any) || 'Design Insights',
        author: {
          name: author,
          role: 'Studio Contributor',
          avatar: author.substring(0, 2).toUpperCase()
        },
        publishedAt: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: `${Math.max(3, Math.ceil((item.content?.rendered?.length || 1000) / 1000))} min read`,
        featured: false
      };
    });
  } catch (err) {
    console.warn('WordPress fetch failed, using built-in studio articles:', err);
    return INITIAL_BLOG_POSTS;
  }
}