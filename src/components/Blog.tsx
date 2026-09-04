import React, { useState } from 'react';
import { BookOpen, Sparkles, Clock, Calendar, ArrowRight, X, Search, Share2, Check } from 'lucide-react';
import { useContentStore } from '../services/contentStore';
import { BlogPost } from '../data/blogData';

interface BlogProps {
  onOpenContact: () => void;
}

export const Blog: React.FC<BlogProps> = ({ onOpenContact }) => {
  const store = useContentStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const categories = ['All', ...store.blogCategories];

  // Only display published posts on public view
  const publishedPosts = store.posts.filter((p) => (p as any).status !== 'draft');

  const filteredPosts = publishedPosts.filter((p) => {
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-card border border-white/15 text-[11px] font-semibold tracking-widest uppercase text-zinc-300 mb-4">
            <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
            <span>Studio Journal & Insights</span>
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
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
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

          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-surface-100/80 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 backdrop-blur-md transition-all"
            />
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setActivePost(post)}
              className="group glass-card rounded-2xl border border-white/10 overflow-hidden cursor-pointer transition-all duration-300 hover:border-white/30 hover:scale-[1.02] flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] w-full overflow-hidden bg-zinc-950">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400">
                    <span className="font-bold uppercase tracking-wider text-zinc-300">{post.category}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold font-display text-white group-hover:text-zinc-200 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex items-center justify-between text-xs text-zinc-400 border-t border-white/5 mt-4 pt-3">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[9px] font-bold text-white">
                    {post.author.avatar}
                  </div>
                  <span className="text-[11px] font-medium text-zinc-300">{post.author.name}</span>
                </div>
                <span className="text-xs font-semibold text-white group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Read →
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Post Reading Modal */}
      {activePost && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/95 backdrop-blur-2xl animate-fade-in"
          onClick={() => setActivePost(null)}
        >
          <div
            className="relative max-w-3xl w-full max-h-[85vh] overflow-y-auto glass-card rounded-3xl border border-white/20 p-6 sm:p-10 bg-zinc-950 text-white space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePost(null)}
              className="absolute top-5 right-5 p-2 rounded-full glass-card border border-white/20 text-zinc-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="px-3 py-1 rounded-full bg-white/10 text-[10px] font-bold uppercase tracking-wider text-zinc-300 inline-block mb-3">
                {activePost.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black font-display text-white leading-tight">
                {activePost.title}
              </h1>
              <div className="flex items-center gap-3 text-xs text-zinc-400 mt-3 pt-3 border-t border-white/10">
                <span>By {activePost.author.name}</span>
                <span>•</span>
                <span>{activePost.publishedAt}</span>
                <span>•</span>
                <span>{activePost.readTime}</span>
              </div>
            </div>

            <div className="w-full aspect-video rounded-2xl overflow-hidden border border-white/10">
              <img src={activePost.coverImage} alt={activePost.title} className="w-full h-full object-cover" />
            </div>

            <div className="prose prose-invert max-w-none text-zinc-300 text-sm leading-relaxed space-y-4 whitespace-pre-line">
              {activePost.content}
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={handleShare}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs text-white flex items-center gap-2 cursor-pointer"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Link Copied!' : 'Share Article'}</span>
              </button>

              <button
                onClick={() => {
                  setActivePost(null);
                  onOpenContact();
                }}
                className="px-5 py-2 rounded-xl bg-white text-black font-bold text-xs uppercase hover:bg-zinc-200 cursor-pointer"
              >
                Commission Studio
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};