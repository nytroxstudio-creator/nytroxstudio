import { useState, useEffect } from 'react';
import { PortfolioItem, ServiceItem, ReviewItem, StatItem, PortfolioCategory } from '../types';
import { PORTFOLIO_DATA, STUDIO_INFO, STUDIO_STATS, SERVICES_DATA, REVIEWS_DATA } from '../data/studioData';
import { BlogPost, INITIAL_BLOG_POSTS } from '../data/blogData';

export interface SiteSettings {
  showBlogSection: boolean;
  showReviewsSection: boolean;
  enableStarfield: boolean;
}

export interface MediaItem {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
  sizeFormatted: string;
  uploadedAt: string;
}

export interface AdminAccount {
  id: string;
  username: string;
  role: 'Super Admin' | 'Editor';
  lastActive: string;
}

export interface ContentState {
  posts: BlogPost[];
  portfolio: PortfolioItem[];
  portfolioCategories: PortfolioCategory[];
  blogCategories: string[];
  tags: string[];
  studioInfo: typeof STUDIO_INFO;
  stats: StatItem[];
  services: ServiceItem[];
  reviews: ReviewItem[];
  mediaLibrary: MediaItem[];
  siteSettings: SiteSettings;
  adminAccounts: AdminAccount[];
  version: number;
}

const STORAGE_KEY = 'nytrox_content_store_v2';
const SYNC_CHANNEL = 'nytrox_content_sync_channel';

// Default initial media seed from current assets
const INITIAL_MEDIA: MediaItem[] = [
  {
    id: 'med-1',
    name: 'Nytrox Studio Official Logo',
    url: '/nytrox-logo.jpg',
    type: 'image',
    sizeFormatted: '185 KB',
    uploadedAt: '2026-08-28'
  },
  {
    id: 'med-2',
    name: 'Gothic Demon VTuber Rigging Reel',
    url: '/portfolio-assets/quality_restoration_20260826055256784.mp4',
    type: 'video',
    sizeFormatted: '9.2 MB',
    uploadedAt: '2026-08-26'
  },
  {
    id: 'med-3',
    name: 'Cyber Ronin Character Debut Showcase',
    url: '/portfolio-assets/quality_restoration_20260826055412441.mp4',
    type: 'video',
    sizeFormatted: '7.5 MB',
    uploadedAt: '2026-08-26'
  },
  {
    id: 'med-4',
    name: 'Makima 8-Piece Anime Emote Pack',
    url: '/portfolio-assets/IMG_7456.JPG',
    type: 'image',
    sizeFormatted: '1.4 MB',
    uploadedAt: '2026-08-26'
  },
  {
    id: 'med-5',
    name: 'Raven Chibi Stream Emotes',
    url: '/portfolio-assets/IMG_7457.JPG',
    type: 'image',
    sizeFormatted: '1.2 MB',
    uploadedAt: '2026-08-26'
  },
  {
    id: 'med-6',
    name: 'Yumeko Jabami Expression Suite',
    url: '/portfolio-assets/IMG_7458.JPG',
    type: 'image',
    sizeFormatted: '1.3 MB',
    uploadedAt: '2026-08-26'
  },
  {
    id: 'med-7',
    name: 'Loxter 3D Chrome Identity',
    url: '/portfolio-assets/IMG_7470.JPG',
    type: 'image',
    sizeFormatted: '1.6 MB',
    uploadedAt: '2026-08-26'
  },
  {
    id: 'med-8',
    name: 'Cybernetic Headshot Transformation',
    url: '/portfolio-assets/IMG_7464.JPG',
    type: 'image',
    sizeFormatted: '2.1 MB',
    uploadedAt: '2026-08-26'
  },
  {
    id: 'med-9',
    name: 'Esta Noche — Anime Typography Poster',
    url: '/portfolio-assets/IMG_7467.JPG',
    type: 'image',
    sizeFormatted: '1.8 MB',
    uploadedAt: '2026-08-26'
  }
];

const DEFAULT_STATE: ContentState = {
  posts: INITIAL_BLOG_POSTS,
  portfolio: PORTFOLIO_DATA,
  portfolioCategories: [
    'VTuber & Live2D',
    'YouTube Thumbnails',
    'Emotes',
    'Posters & Art',
    '3D Logos & Marks',
    'Mascots & Avatars',
    'Social Banners'
  ],
  blogCategories: [
    'Branding & Identity',
    'VTuber & 3D',
    'YouTube Packaging',
    'Design Insights'
  ],
  tags: [
    'Live2D',
    '3D Chrome',
    'High CTR',
    'Acid Graphics',
    'Emotes',
    'Cyberpunk',
    'Y2K',
    'Esports',
    'Twitch',
    'Stream Pack'
  ],
  studioInfo: STUDIO_INFO,
  stats: STUDIO_STATS,
  services: SERVICES_DATA,
  reviews: REVIEWS_DATA,
  mediaLibrary: INITIAL_MEDIA,
  siteSettings: {
    showBlogSection: false, // Default false per prior user request, toggleable in admin
    showReviewsSection: true,
    enableStarfield: true
  },
  adminAccounts: [
    {
      id: 'adm-1',
      username: 'nytrox_master',
      role: 'Super Admin',
      lastActive: 'Just now'
    }
  ],
  version: 1
};

// Listeners registry for zero-latency reactive UI updates
const listeners = new Set<(state: ContentState) => void>();

let currentState: ContentState = loadState();

function loadState(): ContentState {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Ensure merged with defaults for any newly added structure
      return {
        ...DEFAULT_STATE,
        ...parsed,
        siteSettings: { ...DEFAULT_STATE.siteSettings, ...(parsed.siteSettings || {}) },
        studioInfo: { ...DEFAULT_STATE.studioInfo, ...(parsed.studioInfo || {}) }
      };
    }
  } catch (err) {
    console.warn('Failed to parse content store from localStorage:', err);
  }
  return DEFAULT_STATE;
}

function persistAndBroadcast(newState: ContentState) {
  currentState = newState;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
      if ('BroadcastChannel' in window) {
        const channel = new BroadcastChannel(SYNC_CHANNEL);
        channel.postMessage({ type: 'SYNC_CONTENT', version: newState.version });
      }
    } catch (e) {
      console.error('Storage error:', e);
    }
  }
  // Notify all subscribing React components immediately
  listeners.forEach((listener) => listener(currentState));
}

// Attach cross-tab synchronization listener
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  const channel = new BroadcastChannel(SYNC_CHANNEL);
  channel.onmessage = (evt) => {
    if (evt.data?.type === 'SYNC_CONTENT') {
      currentState = loadState();
      listeners.forEach((listener) => listener(currentState));
    }
  };
}

export const contentStore = {
  getState(): ContentState {
    return currentState;
  },

  subscribe(listener: (state: ContentState) => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  // ----------------------------------------------------
  // 1. POSTS / BLOG CRUD
  // ----------------------------------------------------
  createPost(post: Omit<BlogPost, 'id' | 'slug' | 'publishedAt'> & { customSlug?: string }): BlogPost {
    const id = `post-${Date.now()}`;
    const slug = post.customSlug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const publishedAt = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const newPost: BlogPost = {
      ...post,
      id,
      slug,
      publishedAt
    };

    persistAndBroadcast({
      ...currentState,
      posts: [newPost, ...currentState.posts],
      version: currentState.version + 1
    });

    return newPost;
  },

  updatePost(id: string | number, updates: Partial<BlogPost>): boolean {
    const idx = currentState.posts.findIndex((p) => String(p.id) === String(id));
    if (idx === -1) return false;

    const updated = [...currentState.posts];
    updated[idx] = { ...updated[idx], ...updates };

    persistAndBroadcast({
      ...currentState,
      posts: updated,
      version: currentState.version + 1
    });

    return true;
  },

  setPosts(newPosts: BlogPost[]) {
    persistAndBroadcast({
      ...currentState,
      posts: newPosts,
      version: currentState.version + 1
    });
  },
  deletePost(idOrSlug: string | number): boolean {
    const target = String(idOrSlug).trim();
    const updated = currentState.posts.filter((p) => {
      const matchId = String(p.id).trim() === target;
      const matchSlug = p.slug && p.slug.trim() === target;
      return !matchId && !matchSlug;
    });

    persistAndBroadcast({
      ...currentState,
      posts: updated,
      version: currentState.version + 1
    });

    return true;
  },

  // ----------------------------------------------------
  // 2. PORTFOLIO SHOWCASE CRUD
  // ----------------------------------------------------
  createProject(project: Omit<PortfolioItem, 'id'>): PortfolioItem {
    const id = `proj-${Date.now()}`;
    const newProject: PortfolioItem = { ...project, id };

    persistAndBroadcast({
      ...currentState,
      portfolio: [newProject, ...currentState.portfolio],
      version: currentState.version + 1
    });

    return newProject;
  },

  updateProject(id: string, updates: Partial<PortfolioItem>): boolean {
    const idx = currentState.portfolio.findIndex((p) => p.id === id);
    if (idx === -1) return false;

    const updated = [...currentState.portfolio];
    updated[idx] = { ...updated[idx], ...updates };

    persistAndBroadcast({
      ...currentState,
      portfolio: updated,
      version: currentState.version + 1
    });

    return true;
  },

  deleteProject(id: string): boolean {
    const updated = currentState.portfolio.filter((p) => p.id !== id);
    if (updated.length === currentState.portfolio.length) return false;

    persistAndBroadcast({
      ...currentState,
      portfolio: updated,
      version: currentState.version + 1
    });

    return true;
  },

  // ----------------------------------------------------
  // 3. MEDIA LIBRARY CRUD & UPLOADER
  // ----------------------------------------------------
  addMedia(item: Omit<MediaItem, 'id' | 'uploadedAt'>): MediaItem {
    const newMedia: MediaItem = {
      ...item,
      id: `med-${Date.now()}`,
      uploadedAt: new Date().toISOString().slice(0, 10)
    };

    persistAndBroadcast({
      ...currentState,
      mediaLibrary: [newMedia, ...currentState.mediaLibrary],
      version: currentState.version + 1
    });

    return newMedia;
  },

  deleteMedia(id: string): boolean {
    const updated = currentState.mediaLibrary.filter((m) => m.id !== id);
    if (updated.length === currentState.mediaLibrary.length) return false;

    persistAndBroadcast({
      ...currentState,
      mediaLibrary: updated,
      version: currentState.version + 1
    });

    return true;
  },

  // ----------------------------------------------------
  // 4. PAGES & WEBSITE CONTENT
  // ----------------------------------------------------
  updateStudioInfo(updates: Partial<typeof STUDIO_INFO>) {
    persistAndBroadcast({
      ...currentState,
      studioInfo: { ...currentState.studioInfo, ...updates },
      version: currentState.version + 1
    });
  },

  updateStats(newStats: StatItem[]) {
    persistAndBroadcast({
      ...currentState,
      stats: newStats,
      version: currentState.version + 1
    });
  },

  updateServices(newServices: ServiceItem[]) {
    persistAndBroadcast({
      ...currentState,
      services: newServices,
      version: currentState.version + 1
    });
  },

  // ----------------------------------------------------
  // 5. REVIEWS & TESTIMONIALS CRUD
  // ----------------------------------------------------
  createReview(review: Omit<ReviewItem, 'id' | 'date'>): ReviewItem {
    const newRev: ReviewItem = {
      ...review,
      id: `rev-${Date.now()}`,
      date: 'Just now'
    };

    persistAndBroadcast({
      ...currentState,
      reviews: [newRev, ...currentState.reviews],
      version: currentState.version + 1
    });

    return newRev;
  },

  updateReview(id: string, updates: Partial<ReviewItem>): boolean {
    const idx = currentState.reviews.findIndex((r) => r.id === id);
    if (idx === -1) return false;

    const updated = [...currentState.reviews];
    updated[idx] = { ...updated[idx], ...updates };

    persistAndBroadcast({
      ...currentState,
      reviews: updated,
      version: currentState.version + 1
    });

    return true;
  },

  deleteReview(id: string): boolean {
    const updated = currentState.reviews.filter((r) => r.id !== id);
    if (updated.length === currentState.reviews.length) return false;

    persistAndBroadcast({
      ...currentState,
      reviews: updated,
      version: currentState.version + 1
    });

    return true;
  },

  // ----------------------------------------------------
  // 6. CATEGORIES & TAGS
  // ----------------------------------------------------
  addPortfolioCategory(category: PortfolioCategory) {
    if (currentState.portfolioCategories.includes(category)) return;
    persistAndBroadcast({
      ...currentState,
      portfolioCategories: [...currentState.portfolioCategories, category],
      version: currentState.version + 1
    });
  },

  addBlogCategory(category: string) {
    if (currentState.blogCategories.includes(category)) return;
    persistAndBroadcast({
      ...currentState,
      blogCategories: [...currentState.blogCategories, category],
      version: currentState.version + 1
    });
  },

  deleteBlogCategory(category: string) {
    persistAndBroadcast({
      ...currentState,
      blogCategories: currentState.blogCategories.filter((c) => c !== category),
      version: currentState.version + 1
    });
  },

  addTag(tag: string) {
    if (currentState.tags.includes(tag)) return;
    persistAndBroadcast({
      ...currentState,
      tags: [...currentState.tags, tag],
      version: currentState.version + 1
    });
  },

  deleteTag(tag: string) {
    persistAndBroadcast({
      ...currentState,
      tags: currentState.tags.filter((t) => t !== tag),
      version: currentState.version + 1
    });
  },

  // ----------------------------------------------------
  // 7. SITE SETTINGS & SECTION TOGGLES
  // ----------------------------------------------------
  updateSettings(updates: Partial<SiteSettings>) {
    persistAndBroadcast({
      ...currentState,
      siteSettings: { ...currentState.siteSettings, ...updates },
      version: currentState.version + 1
    });
  },

  // ----------------------------------------------------
  // 8. BACKUP, RESTORE & RESET
  // ----------------------------------------------------
  exportJSON(): string {
    return JSON.stringify(currentState, null, 2);
  },

  importJSON(jsonString: string): boolean {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed.portfolio || !parsed.studioInfo) {
        throw new Error('Invalid backup schema');
      }
      persistAndBroadcast({
        ...DEFAULT_STATE,
        ...parsed,
        version: currentState.version + 1
      });
      return true;
    } catch (err) {
      console.error('Failed to import database JSON:', err);
      return false;
    }
  },

  resetToDefaults() {
    persistAndBroadcast({
      ...DEFAULT_STATE,
      version: currentState.version + 1
    });
  }
};

// React Hook for immediate reactive updates in any component
export function useContentStore(): ContentState & typeof contentStore {
  const [state, setState] = useState<ContentState>(contentStore.getState());

  useEffect(() => {
    return contentStore.subscribe((newState) => {
      setState(newState);
    });
  }, []);

  return {
    ...state,
    ...contentStore
  };
}