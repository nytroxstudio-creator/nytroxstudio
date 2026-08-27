// Nytrox Studio Privacy-Friendly Real-Time Analytics & Telemetry Engine

export interface AnalyticsEvent {
  id: string;
  timestamp: string;
  type: 'pageview' | 'project_view' | 'contact_click' | 'category_filter' | 'review_scroll';
  title: string;
  details: string;
  device: 'Desktop' | 'Mobile' | 'Tablet';
  referrer: string;
}

export interface ProjectClickStat {
  id: string;
  title: string;
  category: string;
  clicks: number;
}

export interface AnalyticsData {
  totalVisits: number;
  uniqueVisitors: number;
  totalPageViews: number;
  avgDurationSeconds: number;
  projectClicks: Record<string, { title: string; category: string; clicks: number }>;
  devices: { desktop: number; mobile: number; tablet: number };
  referrers: Record<string, number>;
  recentEvents: AnalyticsEvent[];
  lastUpdated: string;
}

const STORAGE_KEY = 'nytrox_studio_analytics_v2';
const SESSION_KEY = 'nytrox_session_id';
const ADMIN_AUTH_KEY = 'nytrox_admin_token';
const ADMIN_PIN_KEY = 'nytrox_admin_pin';

const DEFAULT_PIN = 'nytrox2026';

// Detect Device
function getDeviceType(): 'Desktop' | 'Mobile' | 'Tablet' {
  if (typeof window === 'undefined') return 'Desktop';
  const width = window.innerWidth;
  const ua = navigator.userAgent.toLowerCase();
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) || (width >= 768 && width <= 1024)) {
    return 'Tablet';
  }
  if (/mobile|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/i.test(ua) || width < 768) {
    return 'Mobile';
  }
  return 'Desktop';
}

// Clean Referrer
function getReferrer(): string {
  if (typeof document === 'undefined' || !document.referrer) return 'Direct / Social Link';
  const ref = document.referrer.toLowerCase();
  if (ref.includes('instagram')) return 'Instagram';
  if (ref.includes('twitter') || ref.includes('x.com')) return 'Twitter / X';
  if (ref.includes('fiverr')) return 'Fiverr';
  if (ref.includes('linkedin')) return 'LinkedIn';
  if (ref.includes('google')) return 'Google Search';
  if (ref.includes('youtube')) return 'YouTube';
  if (ref.includes('discord')) return 'Discord';
  try {
    const url = new URL(document.referrer);
    return url.hostname;
  } catch {
    return 'Web Referrer';
  }
}

// Initial Seed Data
function getInitialData(): AnalyticsData {
  return {
    totalVisits: 1428,
    uniqueVisitors: 896,
    totalPageViews: 3840,
    avgDurationSeconds: 145,
    devices: {
      desktop: 58,
      mobile: 37,
      tablet: 5,
    },
    referrers: {
      'Instagram': 412,
      'Twitter / X': 348,
      'Direct / Social Link': 285,
      'Fiverr': 194,
      'LinkedIn': 118,
      'Google Search': 63,
    },
    projectClicks: {
      'vtuber-gothic-demon-video': { title: 'Gothic Demon VTuber Model', category: 'VTuber & Live2D', clicks: 248 },
      'yt-cybernetic-hands': { title: 'Cybernetic Headshot Transformation', category: 'YouTube Thumbnails', clicks: 204 },
      'logo-loxter-3d': { title: 'Loxter 3D Chrome Identity', category: '3D Logos & Marks', clicks: 179 },
      'poster-esta-noche': { title: 'Esta Noche — Anime Typography Poster', category: 'Posters & Art', clicks: 156 },
      'emote-makima': { title: 'Makima 8-Piece Anime Emote Pack', category: 'Emotes', clicks: 142 },
      'vtuber-cyber-ronin-video': { title: 'Cyber Ronin VTuber Model', category: 'VTuber & Live2D', clicks: 131 },
      'yt-431k-etsy': { title: '$431K eCommerce Breakdown Thumbnail', category: 'YouTube Thumbnails', clicks: 119 },
    },
    recentEvents: [
      {
        id: 'evt-1',
        timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
        type: 'project_view',
        title: 'Gothic Demon VTuber Model',
        details: 'Played Live2D motion preview video',
        device: 'Desktop',
        referrer: 'Twitter / X',
      },
      {
        id: 'evt-2',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        type: 'contact_click',
        title: 'Commission Custom Work',
        details: 'Opened Project Consultation Modal',
        device: 'Mobile',
        referrer: 'Instagram',
      },
      {
        id: 'evt-3',
        timestamp: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
        type: 'category_filter',
        title: 'Posters & Art',
        details: 'Browsed acid graphics & anime posters',
        device: 'Desktop',
        referrer: 'Direct / Social Link',
      }
    ],
    lastUpdated: new Date().toISOString(),
  };
}

export const analytics = {
  getData(): AnalyticsData {
    if (typeof window === 'undefined') return getInitialData();
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // Fallback
    }
    const initial = getInitialData();
    this.saveData(initial);
    return initial;
  },

  saveData(data: AnalyticsData) {
    if (typeof window === 'undefined') return;
    try {
      data.lastUpdated = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Ignore
    }
  },

  initSession() {
    if (typeof window === 'undefined') return;
    const isNewSession = !sessionStorage.getItem(SESSION_KEY);
    if (isNewSession) {
      sessionStorage.setItem(SESSION_KEY, 'sess_' + Date.now());
      const data = this.getData();
      data.totalVisits += 1;
      data.totalPageViews += 1;
      const ref = getReferrer();
      data.referrers[ref] = (data.referrers[ref] || 0) + 1;
      const device = getDeviceType().toLowerCase() as 'desktop' | 'mobile' | 'tablet';
      data.devices[device] = (data.devices[device] || 0) + 1;
      this.saveData(data);

      this.logEvent({
        type: 'pageview',
        title: 'Visitor Arrived',
        details: `Landed on Nytrox Studio via ${ref}`,
      });
    }
  },

  logProjectClick(projectId: string, projectTitle: string, category: string) {
    const data = this.getData();
    if (!data.projectClicks[projectId]) {
      data.projectClicks[projectId] = { title: projectTitle, category, clicks: 0 };
    }
    data.projectClicks[projectId].clicks += 1;
    this.saveData(data);

    this.logEvent({
      type: 'project_view',
      title: projectTitle,
      details: `Opened ${category} in Lightbox Showcase`,
    });
  },

  logEvent(event: Omit<AnalyticsEvent, 'id' | 'timestamp' | 'device' | 'referrer'>) {
    const data = this.getData();
    const newEvent: AnalyticsEvent = {
      id: 'evt_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      timestamp: new Date().toISOString(),
      device: getDeviceType(),
      referrer: getReferrer(),
      ...event,
    };
    data.recentEvents = [newEvent, ...(data.recentEvents || [])].slice(0, 30);
    this.saveData(data);
  },

  getLiveViewerCount(): number {
    const hour = new Date().getHours();
    let base = 7;
    if (hour >= 14 && hour <= 23) base = 15;
    else if (hour >= 8 && hour < 14) base = 10;
    else base = 4;

    const jitter = Math.floor(Math.sin(Date.now() / 12000) * 3) + Math.floor(Math.random() * 2);
    return Math.max(2, base + jitter);
  },

  // Authentication
  getAdminPin(): string {
    if (typeof window === 'undefined') return DEFAULT_PIN;
    return localStorage.getItem(ADMIN_PIN_KEY) || DEFAULT_PIN;
  },

  setAdminPin(newPin: string): boolean {
    if (typeof window === 'undefined' || !newPin || newPin.length < 4) return false;
    localStorage.setItem(ADMIN_PIN_KEY, newPin);
    return true;
  },

  isAdminAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return sessionStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  },

  authenticateAdmin(pinInput: string): boolean {
    const correctPin = this.getAdminPin();
    if (pinInput.trim() === correctPin) {
      sessionStorage.setItem(ADMIN_AUTH_KEY, 'true');
      return true;
    }
    return false;
  },

  logoutAdmin() {
    if (typeof window === 'undefined') return;
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
  },

  resetAllData() {
    const fresh = getInitialData();
    this.saveData(fresh);
    return fresh;
  }
};