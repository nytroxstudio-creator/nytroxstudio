export interface PortfolioItem {
  id: string;
  category: 'Logo Design' | 'Banner Design' | 'VTuber Design' | 'YouTube Banner';
  title: string;
  description: string;
  image: string;
  alt: string;
  deliverables?: string[];
  tag?: string;
}

export interface ServiceItem {
  id: string;
  label: string;
  iconName: string;
  shortDesc: string;
  features: string[];
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