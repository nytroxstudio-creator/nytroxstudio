export type PortfolioCategory =
  | 'VTuber & Live2D'
  | 'Emotes'
  | 'Posters & Art'
  | '3D Logos & Marks'
  | 'Mascots & Avatars'
  | 'YouTube Thumbnails'
  | 'Social Banners';

export interface PortfolioItem {
  id: string;
  category: PortfolioCategory;
  title: string;
  description: string;
  image: string;
  videoSrc?: string;
  mediaType?: 'image' | 'video';
  alt: string;
  deliverables: string[];
  tag: string;
  featured?: boolean;
}

export interface ServiceItem {
  id: string;
  label: string;
  iconName: string;
  shortDesc: string;
  features: string[];
  deliverables: string[];
}

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  date: string;
  avatarText: string;
}

export interface StatItem {
  value: string;
  label: string;
  sublabel: string;
}