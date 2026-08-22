import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_REVIEWS } from '../data/studioData';
import { ReviewItem } from '../types';

export const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !quote.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      name: name.trim(),
      role: role.trim() || 'Verified Creator',
      quote: quote.trim(),
      rating: rating || 5,
      date: 'Just now',
      avatarText: name.trim().slice(0, 2).toUpperCase()
    };

    setReviews([newRev, ...reviews]);
    setSubmitted(true);

    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#ffffff', '#d4d4d8', '#71717a']
    });

    setName('');
    setRole('');
    setQuote('');
    setRating(5);

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="reviews" className="relative py-24 md:py-32 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold tracking-widest uppercase text-zinc-300 mb-4">
            <MessageSquare className="w-3.5 h-3.5 text-zinc-400" />
            <span>Creator Testimonials</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-white tracking-tight leading-tight">
            Client <span className="text-gradient-silver">Reviews</span>
          </h2>

          <p className="mt-4 text-base text-zinc-400 max-w-xl mx-auto">
            What creators, streamers, and forward-thinking brands say about working with Nytrox Studio.
          </p>

          {/* Social Proof Badge */}
          <div className="flex items-center justify-center gap-1.5 mt-6">
            <div className="flex text-white">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-white text-white" />
              ))}
            </div>
            <span className="text-sm font-semibold text-zinc-200 ml-2">4.98 / 5.0 Rating</span>
            <span className="text-xs text-zinc-400">• 100+ Verified Projects</span>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-card p-6 sm:p-7 rounded-2xl border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < rev.rating ? 'fill-white text-white' : 'text-zinc-600'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-sm text-zinc-300 leading-relaxed italic mb-6">
                  "{rev.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-surface-50 border border-white/15 flex items-center justify-center text-xs font-bold text-white tracking-wider">
                  {rev.avatarText}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    {rev.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400" />
                  </h4>
                  <p className="text-[11px] text-zinc-400">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Share Your Review Form Card */}
        <div className="max-w-xl mx-auto glass-card p-8 sm:p-10 rounded-3xl border border-white/15 relative overflow-hidden">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold font-display text-white">Share Your Review</h3>
            <p className="text-xs text-zinc-400 mt-1">
              Have you worked with Nytrox Studio? We would love to hear your feedback.
            </p>
          </div>

          {submitted && (
            <div className="mb-6 p-4 rounded-xl bg-white/10 border border-white/20 text-center animate-fade-in">
              <span className="text-xs font-semibold text-white">
                ✓ Thanks for your review! Your feedback has been published.
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Marcus Reyes"
                required
                className="w-full px-4 py-3 rounded-xl bg-surface-100 border border-white/10 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
                Role / Channel (Optional)
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. VTuber & Creator (100K)"
                className="w-full px-4 py-3 rounded-xl bg-surface-100 border border-white/10 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
                Rating
              </label>
              <div className="flex items-center gap-2 py-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-zinc-400 hover:text-white transition-colors"
                    aria-label={`Rate ${star} star`}
                  >
                    <Star
                      className={`w-6 h-6 ${
                        (hoverRating || rating) >= star
                          ? 'fill-white text-white'
                          : 'text-zinc-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wider">
                Your Review
              </label>
              <textarea
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                rows={4}
                placeholder="Write your experience working with Nytrox Studio..."
                required
                className="w-full px-4 py-3 rounded-xl bg-surface-100 border border-white/10 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-white text-black font-semibold text-xs tracking-wider uppercase rounded-xl hover:bg-zinc-200 transition-all hover:shadow-glow-md"
            >
              Submit Review
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};