import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Unlock,
  Shield,
  Activity,
  Users,
  Eye,
  TrendingUp,
  Clock,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  Flame,
  KeyRound,
  Trash2,
  Download,
  Copy,
  Check,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { analytics, AnalyticsData } from '../services/analytics';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);
  const [data, setData] = useState<AnalyticsData>(analytics.getData());
  const [liveViewers, setLiveViewers] = useState<number>(analytics.getLiveViewerCount());
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [newPin, setNewPin] = useState<string>('');
  const [pinSuccessMsg, setPinSuccessMsg] = useState<string>('');

  // Check auth state on open
  useEffect(() => {
    if (isOpen) {
      setIsAuthenticated(analytics.isAdminAuthenticated());
      setData(analytics.getData());
      setLiveViewers(analytics.getLiveViewerCount());
    }
  }, [isOpen]);

  // Live heart-beat ticker for active viewers
  useEffect(() => {
    if (!isOpen || !isAuthenticated) return;

    const interval = setInterval(() => {
      setLiveViewers(analytics.getLiveViewerCount());
      setData(analytics.getData());
    }, 4000);

    return () => clearInterval(interval);
  }, [isOpen, isAuthenticated]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (analytics.authenticateAdmin(pinInput)) {
      setIsAuthenticated(true);
      setPinError(false);
      setPinInput('');
      setData(analytics.getData());
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    analytics.logoutAdmin();
    setIsAuthenticated(false);
    setPinInput('');
  };

  const handleUpdatePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.trim().length >= 4) {
      analytics.setAdminPin(newPin.trim());
      setPinSuccessMsg('Passcode updated successfully!');
      setNewPin('');
      setTimeout(() => setPinSuccessMsg(''), 3000);
    }
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset analytics data?')) {
      const fresh = analytics.resetAllData();
      setData(fresh);
    }
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nytrox-analytics-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyAdminLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/#admin`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Rank project clicks
  const sortedProjects = Object.entries(data.projectClicks || {})
    .map(([id, item]) => ({ id, ...item }))
    .sort((a, b) => b.clicks - a.clicks);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl animate-fade-in overflow-y-auto">
      <div
        className="relative max-w-6xl w-full glass-card rounded-3xl border border-white/20 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col bg-zinc-950/90 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* ========================================================================= */}
        {/* STATE 1: SECURE PIN / PASSWORD LOGIN SCREEN                               */}
        {/* ========================================================================= */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto space-y-6">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/15 relative">
              <Shield className="w-10 h-10 text-white animate-pulse" />
              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
            </div>

            <div>
              <span className="text-[11px] uppercase font-bold tracking-widest text-zinc-400 block mb-1">
                Nytrox Studio Portal
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-display text-white tracking-tight">
                Private Admin Access
              </h2>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Enter your master passcode to view live active viewers, telemetry, and visitor interactions.
              </p>
            </div>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <div className="relative">
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="Enter Master PIN (Default: nytrox2026)"
                  autoFocus
                  className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border text-sm text-white placeholder-zinc-500 focus:outline-none transition-all text-center tracking-widest ${
                    pinError ? 'border-red-500 bg-red-500/10' : 'border-white/15 focus:border-white/40 focus:bg-white/10'
                  }`}
                />
              </div>

              {pinError && (
                <p className="text-xs text-red-400 font-medium">
                  Invalid Passcode. Please try again.
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-glow-sm"
              >
                <Unlock className="w-4 h-4" />
                <span>Authenticate & Open Dashboard</span>
              </button>
            </form>

            <div className="pt-2 border-t border-white/10 w-full flex items-center justify-between text-[11px] text-zinc-500">
              <span>Shortcut: <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-zinc-300">Ctrl + Shift + A</kbd></span>
              <button onClick={onClose} className="hover:text-white transition-colors">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* STATE 2: AUTHENTICATED LIVE ADMIN HUD DASHBOARD                          */
          /* ========================================================================= */
          <>
            {/* Top Command Bar */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-surface-100/60 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span>Telemetry Live</span>
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold font-display text-white">
                    Nytrox Studio Admin Command Center
                  </h2>
                  <span className="text-[11px] text-zinc-400 hidden sm:inline">
                    Private Owner Access • Real-time visitor session monitoring
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-full border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 text-xs font-medium transition-colors inline-flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Lock Panel</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full border border-white/20 text-zinc-300 hover:text-white hover:bg-white/20 transition-all ml-1"
                  aria-label="Close admin dashboard"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Dashboard Scrollable Body */}
            <div className="overflow-y-auto p-4 sm:p-8 space-y-8">
              
              {/* Top Highlights Grid (Live Viewers pulse + Totals) */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                
                {/* CARD 1: LIVE ACTIVE VIEWERS (Highlighted Pulse) */}
                <div className="glass-card p-5 sm:p-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 relative overflow-hidden group">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase font-bold tracking-widest text-emerald-400 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 animate-pulse" />
                      <span>Live Viewers</span>
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981] animate-ping" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
                      {liveViewers}
                    </span>
                    <span className="text-xs text-emerald-400 font-semibold">
                      active right now
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-2">
                    Real-time users currently browsing your portfolio pages.
                  </p>
                </div>

                {/* CARD 2: TOTAL PAGE VIEWS */}
                <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/10 bg-surface-200/40">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span className="text-[11px] uppercase font-bold tracking-widest">Total Impressions</span>
                    <Eye className="w-4 h-4" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-bold font-display text-white">
                      {data.totalPageViews.toLocaleString()}
                    </span>
                    <span className="text-xs text-emerald-400 font-medium">+18.4%</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-2">
                    Cumulative portfolio & artwork views recorded.
                  </p>
                </div>

                {/* CARD 3: UNIQUE CREATOR SESSIONS */}
                <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/10 bg-surface-200/40">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span className="text-[11px] uppercase font-bold tracking-widest">Unique Creators</span>
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-bold font-display text-white">
                      {data.uniqueVisitors.toLocaleString()}
                    </span>
                    <span className="text-xs text-zinc-400">creators</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-2">
                    Distinct visitors from social & direct links.
                  </p>
                </div>

                {/* CARD 4: AVG ENGAGEMENT DURATION */}
                <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/10 bg-surface-200/40">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span className="text-[11px] uppercase font-bold tracking-widest">Avg. Session</span>
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-bold font-display text-white">
                      2m 25s
                    </span>
                    <span className="text-xs text-emerald-400 font-medium">High</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-2">
                    High engagement across VTuber video previews & posters.
                  </p>
                </div>

              </div>

              {/* Middle Section: Top Projects Ranking + Traffic Sources */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                
                {/* Left (2 cols): Most Clicked Portfolio Works */}
                <div className="lg:col-span-2 glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/5 text-[10px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                        <Flame className="w-3 h-3 text-amber-400" />
                        <span>Engagement Heatmap</span>
                      </div>
                      <h3 className="text-lg font-bold font-display text-white">
                        Most Clicked Showcase Projects
                      </h3>
                    </div>
                    <span className="text-xs text-zinc-400">Ranked by Lightbox Opens</span>
                  </div>

                  <div className="space-y-3.5">
                    {sortedProjects.slice(0, 6).map((proj, idx) => {
                      const maxClicks = sortedProjects[0]?.clicks || 1;
                      const percentage = Math.round((proj.clicks / maxClicks) * 100);

                      return (
                        <div key={proj.id} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center font-bold text-[10px] text-zinc-300">
                                #{idx + 1}
                              </span>
                              <span className="font-bold text-white">{proj.title}</span>
                              <span className="px-2 py-0.2 rounded-full bg-white/10 text-[9px] uppercase font-semibold text-zinc-400">
                                {proj.category}
                              </span>
                            </div>
                            <span className="font-bold text-white">{proj.clicks} clicks</span>
                          </div>

                          {/* Progress Bar */}
                          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-zinc-300 to-white transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Right (1 col): Traffic Origins & Device Breakdown */}
                <div className="space-y-6">
                  
                  {/* Traffic Sources */}
                  <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Globe className="w-4 h-4 text-zinc-400" />
                        <span>Traffic Channels</span>
                      </h4>
                      <span className="text-[10px] uppercase font-bold text-zinc-400">Referrals</span>
                    </div>

                    <div className="space-y-2.5">
                      {Object.entries(data.referrers || {}).map(([source, count]) => (
                        <div key={source} className="flex items-center justify-between text-xs py-1 border-b border-white/5">
                          <span className="text-zinc-300">{source}</span>
                          <span className="font-bold text-white">{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Device Distribution */}
                  <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-zinc-400" />
                      <span>Device Breakdown</span>
                    </h4>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                        <Monitor className="w-4 h-4 text-zinc-300 mx-auto mb-1" />
                        <span className="text-xs font-bold text-white">{data.devices.desktop}%</span>
                        <span className="text-[9px] uppercase block text-zinc-400">Desktop</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                        <Smartphone className="w-4 h-4 text-zinc-300 mx-auto mb-1" />
                        <span className="text-xs font-bold text-white">{data.devices.mobile}%</span>
                        <span className="text-[9px] uppercase block text-zinc-400">Mobile</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                        <Tablet className="w-4 h-4 text-zinc-300 mx-auto mb-1" />
                        <span className="text-xs font-bold text-white">{data.devices.tablet}%</span>
                        <span className="text-[9px] uppercase block text-zinc-400">Tablet</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* Bottom Row: Live Real-Time Activity Log + Quick Settings */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                
                {/* Live Activity Log */}
                <div className="lg:col-span-2 glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-400" />
                      <span>Live Real-Time Activity Feed</span>
                    </h3>
                    <span className="text-[10px] text-zinc-400">Auto-updating</span>
                  </div>

                  <div className="space-y-2.5 max-h-60 overflow-y-auto pr-2 scrollbar-thin">
                    {(data.recentEvents || []).map((evt) => {
                      const timeStr = new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

                      return (
                        <div key={evt.id} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                            <div>
                              <span className="font-bold text-white">{evt.title}</span>
                              <span className="text-zinc-400 block text-[11px]">{evt.details}</span>
                            </div>
                          </div>
                          <div className="text-right text-[10px] text-zinc-400 shrink-0">
                            <span>{timeStr}</span>
                            <span className="block text-zinc-500">{evt.device} • {evt.referrer}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Owner Tools & Passcode Settings */}
                <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-5">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-zinc-300" />
                    <span>Owner Portal Settings</span>
                  </h4>

                  {/* Change PIN Form */}
                  <form onSubmit={handleUpdatePin} className="space-y-2">
                    <label className="text-[11px] text-zinc-400 block">Change Master Passcode</label>
                    <div className="flex gap-2">
                      <input
                        type="password"
                        value={newPin}
                        onChange={(e) => setNewPin(e.target.value)}
                        placeholder="New PIN (min 4 chars)"
                        className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30"
                      />
                      <button
                        type="submit"
                        className="px-3 py-2 rounded-xl bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-all shrink-0"
                      >
                        Save
                      </button>
                    </div>
                    {pinSuccessMsg && (
                      <p className="text-[11px] text-emerald-400 font-medium mt-1">{pinSuccessMsg}</p>
                    )}
                  </form>

                  {/* Action Buttons */}
                  <div className="space-y-2 pt-2 border-t border-white/10">
                    <button
                      onClick={handleCopyAdminLink}
                      className="w-full py-2 px-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs text-zinc-300 hover:text-white transition-all flex items-center justify-between"
                    >
                      <span>Direct URL: <code className="text-zinc-400">/#admin</code></span>
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={handleExportJSON}
                      className="w-full py-2 px-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs text-zinc-300 hover:text-white transition-all flex items-center justify-between"
                    >
                      <span>Export Analytics JSON</span>
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={handleResetData}
                      className="w-full py-2 px-3 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-xs text-red-400 transition-all flex items-center justify-between"
                    >
                      <span>Reset Analytics Data</span>
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </>
        )}

      </div>
    </div>
  );
};