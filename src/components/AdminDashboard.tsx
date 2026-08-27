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
  Sparkles,
  Radio,
  Server
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
  const [liveViewers, setLiveViewers] = useState<number>(1);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [newPin, setNewPin] = useState<string>('');
  const [pinSuccessMsg, setPinSuccessMsg] = useState<string>('');

  // Check auth state on open & attach presence listener
  useEffect(() => {
    if (isOpen) {
      setIsAuthenticated(analytics.isAdminAuthenticated());
      setData(analytics.getData());
      setLiveViewers(analytics.getLiveViewerCount());

      analytics.initPresence((count) => {
        setLiveViewers(count);
      });
    }
  }, [isOpen]);

  // Live heart-beat ticker to pull real changes
  useEffect(() => {
    if (!isOpen || !isAuthenticated) return;

    const interval = setInterval(() => {
      setData(analytics.getData());
      setLiveViewers(analytics.getLiveViewerCount());
    }, 2500);

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
    if (window.confirm('Reset all real analytics metrics to zero?')) {
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
    a.download = `nytrox-real-telemetry-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyAdminLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/#admin`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // Sorted Real Project Clicks
  const sortedProjects = Object.entries(data.projectClicks || {})
    .map(([id, item]) => ({ id, ...item }))
    .sort((a, b) => b.clicks - a.clicks);

  const totalDeviceCount = (data.devices.desktop + data.devices.mobile + data.devices.tablet) || 1;
  const desktopPct = Math.round((data.devices.desktop / totalDeviceCount) * 100);
  const mobilePct = Math.round((data.devices.mobile / totalDeviceCount) * 100);
  const tabletPct = Math.round((data.devices.tablet / totalDeviceCount) * 100);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl animate-fade-in overflow-y-auto">
      <div
        className="relative max-w-6xl w-full glass-card rounded-3xl border border-white/20 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col bg-zinc-950/95 text-white"
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
                Owner Real-Time Portal
              </h2>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Enter your master passcode to access 100% live authentic visitors and interaction telemetry.
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
                  placeholder="Type here"
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
              <span>Shortcut: <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-zinc-300">Alt + A</kbd></span>
              <button onClick={onClose} className="hover:text-white transition-colors">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* STATE 2: 100% REAL AUTHENTIC TELEMETRY HUD                               */
          /* ========================================================================= */
          <>
            {/* Top Command Bar */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10 bg-surface-100/60 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  <span>Real-Time Active</span>
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold font-display text-white">
                    Nytrox Studio Telemetry Command Center
                  </h2>
                  <span className="text-[11px] text-zinc-400 hidden sm:inline">
                    100% Real Live Visitor Tracking • Zero Simulated Data
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
              
              {/* Real-time Top Highlights Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                
                {/* CARD 1: EXACT REAL LIVE ACTIVE VIEWERS */}
                <div className="glass-card p-5 sm:p-6 rounded-2xl border border-emerald-500/40 bg-emerald-950/20 relative overflow-hidden group shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase font-bold tracking-widest text-emerald-400 flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                      <span>Live Viewers Now</span>
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#10b981] animate-ping" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
                      {liveViewers}
                    </span>
                    <span className="text-xs text-emerald-400 font-semibold">
                      active user{liveViewers > 1 ? 's' : ''}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-2">
                    Real connected user sessions active on site right now.
                  </p>
                </div>

                {/* CARD 2: REAL TOTAL PAGE VIEWS */}
                <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/10 bg-surface-200/40">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span className="text-[11px] uppercase font-bold tracking-widest">Real Page Views</span>
                    <Eye className="w-4 h-4" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-bold font-display text-white">
                      {data.totalPageViews}
                    </span>
                    <span className="text-xs text-zinc-400">views</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-2">
                    Actual loads recorded since deployment.
                  </p>
                </div>

                {/* CARD 3: REAL UNIQUE VISITORS */}
                <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/10 bg-surface-200/40">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span className="text-[11px] uppercase font-bold tracking-widest">Unique Creators</span>
                    <Users className="w-4 h-4" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-bold font-display text-white">
                      {data.uniqueVisitors}
                    </span>
                    <span className="text-xs text-zinc-400">devices</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-2">
                    Distinct visitors logged by fingerprinting.
                  </p>
                </div>

                {/* CARD 4: REAL TOTAL SESSIONS */}
                <div className="glass-card p-5 sm:p-6 rounded-2xl border border-white/10 bg-surface-200/40">
                  <div className="flex items-center justify-between text-zinc-400">
                    <span className="text-[11px] uppercase font-bold tracking-widest">Total Sessions</span>
                    <Activity className="w-4 h-4" />
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-bold font-display text-white">
                      {data.totalVisits}
                    </span>
                    <span className="text-xs text-zinc-400">visits</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-2">
                    Total browsing sessions initiated by users.
                  </p>
                </div>

              </div>

              {/* Middle Section: Real Project Clicks + Real Referrers */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                
                {/* Left (2 cols): Real Project Clicks */}
                <div className="lg:col-span-2 glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/5 text-[10px] font-bold uppercase tracking-wider text-zinc-300 mb-1">
                        <Flame className="w-3 h-3 text-amber-400" />
                        <span>Real Click Heatmap</span>
                      </div>
                      <h3 className="text-lg font-bold font-display text-white">
                        Real Project Engagement & Lightbox Opens
                      </h3>
                    </div>
                    <span className="text-xs text-zinc-400">Live Click Counters</span>
                  </div>

                  {sortedProjects.length === 0 ? (
                    <div className="p-8 text-center rounded-2xl bg-white/5 border border-white/5 space-y-2">
                      <Eye className="w-6 h-6 text-zinc-500 mx-auto" />
                      <p className="text-xs text-zinc-400">No projects clicked yet in this session.</p>
                      <p className="text-[11px] text-zinc-500">When visitors open VTuber videos, 3D logos, or posters in the Lightbox, their actual clicks will rank here in real-time!</p>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {sortedProjects.map((proj, idx) => {
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
                              <span className="font-bold text-white">{proj.clicks} real click{proj.clicks > 1 ? 's' : ''}</span>
                            </div>

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
                  )}
                </div>

                {/* Right (1 col): Real Traffic Channels & Device Ratio */}
                <div className="space-y-6">
                  
                  {/* Traffic Sources */}
                  <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <Globe className="w-4 h-4 text-zinc-400" />
                        <span>Real Traffic Referrers</span>
                      </h4>
                    </div>

                    {Object.keys(data.referrers || {}).length === 0 ? (
                      <p className="text-xs text-zinc-500 py-2">No external referrers logged yet.</p>
                    ) : (
                      <div className="space-y-2.5">
                        {Object.entries(data.referrers || {}).map(([source, count]) => (
                          <div key={source} className="flex items-center justify-between text-xs py-1 border-b border-white/5">
                            <span className="text-zinc-300">{source}</span>
                            <span className="font-bold text-white">{count} visit{count > 1 ? 's' : ''}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Real Device Breakdown */}
                  <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-zinc-400" />
                      <span>Device Distribution</span>
                    </h4>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                        <Monitor className="w-4 h-4 text-zinc-300 mx-auto mb-1" />
                        <span className="text-xs font-bold text-white">{data.devices.desktop}</span>
                        <span className="text-[9px] uppercase block text-zinc-400">Desktop</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                        <Smartphone className="w-4 h-4 text-zinc-300 mx-auto mb-1" />
                        <span className="text-xs font-bold text-white">{data.devices.mobile}</span>
                        <span className="text-[9px] uppercase block text-zinc-400">Mobile</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                        <Tablet className="w-4 h-4 text-zinc-300 mx-auto mb-1" />
                        <span className="text-xs font-bold text-white">{data.devices.tablet}</span>
                        <span className="text-[9px] uppercase block text-zinc-400">Tablet</span>
                      </div>
                    </div>
                  </div>

                </div>

              </div>

              {/* Bottom Row: 100% Real Live Event Log & Settings */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                
                {/* Real Live Activity Stream */}
                <div className="lg:col-span-2 glass-card p-6 sm:p-8 rounded-3xl border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Activity className="w-4 h-4 text-emerald-400" />
                      <span>Real Live Activity Log</span>
                    </h3>
                    <span className="text-[10px] text-zinc-400">Updated in real-time</span>
                  </div>

                  {(data.recentEvents || []).length === 0 ? (
                    <div className="p-8 text-center rounded-2xl bg-white/5 border border-white/5">
                      <p className="text-xs text-zinc-400">No events logged yet.</p>
                      <p className="text-[11px] text-zinc-500 mt-1">Actions taken by you and your visitors will show up here live with exact timestamps.</p>
                    </div>
                  ) : (
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
                  )}
                </div>

                {/* Owner Tools & Passcode Settings */}
                <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-5">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <KeyRound className="w-4 h-4 text-zinc-300" />
                    <span>Portal Settings</span>
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
                      <span>Export Real Telemetry JSON</span>
                      <Download className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={handleResetData}
                      className="w-full py-2 px-3 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-xs text-red-400 transition-all flex items-center justify-between"
                    >
                      <span>Reset Real Metrics</span>
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