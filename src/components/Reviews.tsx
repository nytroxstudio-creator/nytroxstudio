import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useContentStore } from '../services/contentStore';

export const Reviews: React.FC = () => {
  const store = useContentStore();
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !quote.trim()) return;

    store.createReview({
      name: name.trim(),
      role: role.trim() || 'Verified Creator',
      quote: quote.trim(),
      rating: rating || 5,
      avatarText: name.trim().slice(0, 2).toUpperCase()
    });

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
            Trusted by creators who <span className="text-gradient-silver">demand results</span>.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-zinc-400 leading-relaxed">
            Unfiltered feedback from esports captains, VTuber agencies, and YouTube creators who transformed their presence with Nytrox Studio.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {store.reviews.map((rev) => (
            <div
              key={rev.id}
              className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center gap-1 text-white mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-white text-white" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-zinc-300 leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center font-bold text-sm text-white font-display">
                  {rev.avatarText || rev.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-zinc-200 transition-colors">
                    {rev.name}
                  </h4>
                  <p className="text-xs text-zinc-400">
                    {rev.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Client Review Submission Box */}
        <div className="max-w-2xl mx-auto glass-card p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              Worked with Nytrox Studio?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Leave verified feedback regarding your commission experience.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-white/5 border border-white/15 text-center space-y-3 animate-fade-in">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-bold text-white">Thank You for Your Feedback!</h4>
              <p className="text-xs text-zinc-400">Your review has been verified and added to our showcase.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Your Name / Handle *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex V."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Role / Channel Link</label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. VTuber / 120k YouTube"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Star Rating</label>
                <div className="flex items-center gap-1.5 py-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 focus:outline-none cursor-pointer"
                    >
                      <Star
                        className={`w-5 h-5 transition-colors ${
                          (hoverRating || rating) >= star
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-zinc-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Your Experience / Testimonial *</label>
                <textarea
                  required
                  rows={3}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="How did Nytrox Studio impact your brand?"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-glow-sm cursor-pointer"
              >
                <span>Submit Verified Feedback</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};