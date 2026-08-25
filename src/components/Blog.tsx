import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, Clock, Calendar, ArrowRight, X, Search, Share2, Check } from 'lucide-react';
import { BlogPost, INITIAL_BLOG_POSTS, fetchWordPressPosts } from '../data/blogData';

interface BlogProps {
  onOpenContact: () => void;
}

const CATEGORIES = ['All', 'Branding & Identity', 'VTuber & 3D', 'YouTube Packaging', 'Design Insights'];

export const Blog: React.FC<BlogProps> = ({ onOpenContact }) => {
  const [posts, setPosts] = useState<BlogPost[]>(INITIAL_BLOG_POSTS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadPosts() {
      setIsLoading(true);
      const data = await fetchWordPressPosts();
      setPosts(data);
      setIsLoading(false);
    }
    loadPosts();
  }, []);

  const filteredPosts = posts.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <section id="blog" className="relative py-24 sm:py-32 border-t border-white/10 overflow-hidden">
      {/* Subtle Ambient Section Lighting */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-white/[0.02] blur-[140px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card border border-white/15 text-[11px] font-semibold tracking-widest uppercase text-zinc-300 mb-4 shimmer-badge">
            <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
            <span>Studio Journal & SEO Insights</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white leading-tight mb-4">
            Design Insights & <span className="text-gradient-silver">Creator Strategies</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            In-depth guides, branding breakdowns, Live2D blueprints, and thumbnail psychology crafted to elevate your creative impact.
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-12">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all duration-300 ${
                    isSelected
                      ? 'bg-white text-black shadow-glow-sm scale-105'
                      : 'glass-card border border-white/10 text-zinc-400 hover:text-white hover:border-white/25 hover:bg-white/5'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-surface-100/80 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 backdrop-blur-md transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setActivePost(post)}
              className="group cursor-pointer rounded-3xl overflow-hidden glass-card border border-white/10 hover:border-white/25 transition-all duration-500 hover:-translate-y-1.5 flex flex-col hover:shadow-glow-sm"
            >
              {/* Cover Image Container */}
              <div className="aspect-[16/10] w-full overflow-hidden bg-zinc-950 relative">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] uppercase font-bold tracking-widest text-zinc-200">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-3 text-[11px] text-zinc-400 mb-2.5">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-zinc-500" />
                      {post.publishedAt}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-500" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold font-display text-white group-hover:text-gradient-silver transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed mt-2.5">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-[10px] font-bold text-zinc-300">
                      {post.author.avatar}
                    </div>
                    <span className="text-[11px] font-medium text-zinc-300 truncate max-w-[120px]">
                      {post.author.name}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="py-20 text-center glass-card rounded-3xl border border-white/10 p-8 max-w-md mx-auto">
            <BookOpen className="w-8 h-8 text-zinc-500 mx-auto mb-3" />
            <h4 className="text-base font-bold text-white mb-1">No articles found</h4>
            <p className="text-xs text-zinc-400">Try adjusting your search query or selecting a different category.</p>
          </div>
        )}

      </div>

      {/* --- Fullscreen Reading Modal --- */}
      {activePost && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-fade-in"
          onClick={() => setActivePost(null)}
        >
          <div
            className="relative max-w-3xl w-full glass-card rounded-3xl border border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setActivePost(null)}
              className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-zinc-300 hover:text-white hover:bg-white/20 transition-all"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header Hero Image */}
            <div className="relative aspect-[21/9] w-full overflow-hidden bg-zinc-950">
              <img
                src={activePost.coverImage}
                alt={activePost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-300 via-surface-300/40 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="p-6 sm:p-10 space-y-6">
              
              {/* Meta Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold uppercase tracking-wider text-white">
                    {activePost.category}
                  </span>
                  <span className="text-xs text-zinc-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {activePost.publishedAt}
                  </span>
                  <span className="text-xs text-zinc-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {activePost.readTime}
                  </span>
                </div>

                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card border border-white/10 text-xs font-medium text-zinc-300 hover:text-white transition-all"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
                </button>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white leading-tight">
                {activePost.title}
              </h1>

              {/* Author Row */}
              <div className="flex items-center gap-3 py-3 border-y border-white/10">
                <div className="w-10 h-10 rounded-full bg-white text-black font-bold flex items-center justify-center text-sm shadow-glow-sm">
                  {activePost.author.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">{activePost.author.name}</h4>
                  <p className="text-xs text-zinc-400">{activePost.author.role}</p>
                </div>
              </div>

              {/* Body Text */}
              <div className="prose prose-invert max-w-none text-zinc-300 text-sm sm:text-base leading-relaxed space-y-4 pt-2">
                <p className="text-base sm:text-lg font-medium text-zinc-200 leading-relaxed">
                  {activePost.excerpt}
                </p>

                {activePost.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('# ')) {
                    return null;
                  }
                  if (paragraph.startsWith('## ')) {
                    return (
                      <h2 key={index} className="text-xl sm:text-2xl font-bold font-display text-white pt-4 pb-1">
                        {paragraph.replace('## ', '')}
                      </h2>
                    );
                  }
                  if (paragraph.startsWith('### ')) {
                    return (
                      <h3 key={index} className="text-base sm:text-lg font-semibold text-zinc-200 pt-3">
                        {paragraph.replace('### ', '')}
                      </h3>
                    );
                  }
                  return (
                    <p key={index} className="text-zinc-300 leading-relaxed">
                      {paragraph}
                    </p>
                  );
                })}
              </div>

              {/* Bottom Consultation Callout */}
              <div className="mt-10 p-6 rounded-2xl bg-surface-100 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white">Ready to elevate your visual identity?</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Let’s discuss your next logo, VTuber model, or branding project.</p>
                </div>
                <button
                  onClick={() => {
                    setActivePost(null);
                    onOpenContact();
                  }}
                  className="px-5 py-2.5 bg-white text-black font-semibold text-xs uppercase tracking-wider rounded-full hover:bg-zinc-200 transition-all flex items-center gap-1.5 whitespace-nowrap shadow-glow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Start Project</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
};