import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Lock,
  Unlock,
  Shield,
  Activity,
  Users,
  Eye,
  TrendingUp,
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
  Radio,
  FileText,
  Briefcase,
  Layers,
  Image as ImageIcon,
  Tag,
  Star,
  Settings,
  Plus,
  Edit3,
  Search,
  ExternalLink,
  Upload,
  AlertTriangle,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  EyeOff,
  Video,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { analytics, AnalyticsData } from '../services/analytics';
import { useContentStore, MediaItem } from '../services/contentStore';
import { BlogPost } from '../data/blogData';
import { PortfolioItem, PortfolioCategory, ReviewItem, ServiceItem, StatItem } from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

type AdminTab = 'telemetry' | 'posts' | 'portfolio' | 'pages' | 'media' | 'taxonomy' | 'reviews' | 'system';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const store = useContentStore();

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<boolean>(false);

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('telemetry');

  // Telemetry state
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>(analytics.getData());
  const [liveViewers, setLiveViewers] = useState<number>(1);

  // Toast Feedback State
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ----------------------------------------------------
  // SUB-MODAL & FORM STATES
  // ----------------------------------------------------
  // 1. Post Form State
  const [postModalOpen, setPostModalOpen] = useState<boolean>(false);
  const [editingPostId, setEditingPostId] = useState<string | number | null>(null);
  const [postForm, setPostForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    category: 'Branding & Identity',
    tags: 'Branding, Identity',
    authorName: 'Nytrox Studio Editorial',
    authorRole: 'Brand Specialist',
    readTime: '4 min read',
    featured: false,
    status: 'published' as 'published' | 'draft'
  });

  // 2. Portfolio Project Form State
  const [projectModalOpen, setProjectModalOpen] = useState<boolean>(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'VTuber & Live2D' as PortfolioCategory,
    tag: 'Live2D Character',
    description: '',
    image: '',
    videoSrc: '',
    mediaType: 'image' as 'image' | 'video',
    alt: '',
    deliverables: 'Character Concept, Layer Separation, Rigging Mesh',
    featured: false
  });

  // 3. Review Form State
  const [reviewModalOpen, setReviewModalOpen] = useState<boolean>(false);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    role: 'Verified Creator',
    quote: '',
    rating: 5,
    verified: true
  });

  // 4. Media Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // 5. Delete Confirmation Modal
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    title: string;
    onConfirm: () => void;
  }>({ isOpen: false, title: '', onConfirm: () => {} });

  // 6. Master PIN change
  const [newPin, setNewPin] = useState('');

  // 7. Search and Filter
  const [postSearch, setPostSearch] = useState('');
  const [portfolioSearch, setPortfolioSearch] = useState('');
  const [mediaSearch, setMediaSearch] = useState('');

  // Initialize Auth & Presence on Open
  useEffect(() => {
    if (isOpen) {
      setIsAuthenticated(analytics.isAdminAuthenticated());
      setAnalyticsData(analytics.getData());
      setLiveViewers(analytics.getLiveViewerCount());

      analytics.initPresence((count) => {
        setLiveViewers(count);
      });
    }
  }, [isOpen]);

  // Live heart-beat ticker for real analytics
  useEffect(() => {
    if (!isOpen || !isAuthenticated) return;
    const interval = setInterval(() => {
      setAnalyticsData(analytics.getData());
      setLiveViewers(analytics.getLiveViewerCount());
    }, 3000);
    return () => clearInterval(interval);
  }, [isOpen, isAuthenticated]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        if (postModalOpen) setPostModalOpen(false);
        else if (projectModalOpen) setProjectModalOpen(false);
        else if (reviewModalOpen) setReviewModalOpen(false);
        else if (deleteConfirm.isOpen) setDeleteConfirm({ isOpen: false, title: '', onConfirm: () => {} });
        else onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, postModalOpen, projectModalOpen, reviewModalOpen, deleteConfirm.isOpen, onClose]);

  if (!isOpen) return null;

  // ----------------------------------------------------
  // AUTH HANDLERS
  // ----------------------------------------------------
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (analytics.authenticateAdmin(pinInput)) {
      setIsAuthenticated(true);
      setPinError(false);
      setPinInput('');
      setAnalyticsData(analytics.getData());
      showToast('Authenticated as Super Admin');
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
      setNewPin('');
      showToast('Master passcode updated successfully!');
    } else {
      showToast('Passcode must be at least 4 characters', 'error');
    }
  };

  // ----------------------------------------------------
  // POSTS CRUD HANDLERS
  // ----------------------------------------------------
  const openNewPostModal = () => {
    setEditingPostId(null);
    setPostForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      coverImage: store.mediaLibrary[0]?.url || '/portfolio-assets/IMG_7467.JPG',
      category: store.blogCategories[0] || 'Branding & Identity',
      tags: 'Design, Brand, Studio',
      authorName: 'Nytrox Studio Editorial',
      authorRole: 'Brand Identity Specialist',
      readTime: '4 min read',
      featured: false,
      status: 'published'
    });
    setPostModalOpen(true);
  };

  const openEditPostModal = (post: BlogPost) => {
    setEditingPostId(post.id);
    setPostForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      category: post.category,
      tags: (post as any).tags?.join(', ') || 'Design, Studio',
      authorName: post.author.name,
      authorRole: post.author.role,
      readTime: post.readTime,
      featured: !!post.featured,
      status: ((post as any).status || 'published') as 'published' | 'draft'
    });
    setPostModalOpen(true);
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postForm.title.trim()) {
      showToast('Please enter a post title', 'error');
      return;
    }

    const payload = {
      title: postForm.title.trim(),
      customSlug: postForm.slug.trim() || undefined,
      excerpt: postForm.excerpt.trim(),
      content: postForm.content.trim(),
      coverImage: postForm.coverImage.trim() || '/portfolio-assets/IMG_7467.JPG',
      category: postForm.category as any,
      author: {
        name: postForm.authorName.trim() || 'Nytrox Studio',
        role: postForm.authorRole.trim() || 'Contributor',
        avatar: postForm.authorName.slice(0, 2).toUpperCase()
      },
      readTime: postForm.readTime.trim() || '4 min read',
      featured: postForm.featured,
      status: postForm.status,
      tags: postForm.tags.split(',').map((t) => t.trim()).filter(Boolean)
    };

    if (editingPostId !== null) {
      store.updatePost(editingPostId, payload);
      showToast(`Post "${payload.title}" updated successfully!`);
    } else {
      store.createPost(payload as any);
      showToast(`New post "${payload.title}" published!`);
    }

    setPostModalOpen(false);
  };

  const confirmDeletePost = (post: BlogPost) => {
    const ok = window.confirm(`Are you sure you want to permanently delete post "${post.title}"?`);
    if (!ok) return;

    store.deletePost(post.id);
    showToast(`Post "${post.title}" deleted!`);
  };

  // ----------------------------------------------------
  // PORTFOLIO CRUD HANDLERS
  // ----------------------------------------------------
  const openNewProjectModal = () => {
    setEditingProjectId(null);
    setProjectForm({
      title: '',
      category: store.portfolioCategories[0] || 'VTuber & Live2D',
      tag: 'Featured Work',
      description: '',
      image: store.mediaLibrary[0]?.url || '/portfolio-assets/IMG_7470.JPG',
      videoSrc: '',
      mediaType: 'image',
      alt: 'Nytrox Studio Portfolio Showcase',
      deliverables: 'Visual Identity, 3D Typography, Production Assets',
      featured: false
    });
    setProjectModalOpen(true);
  };

  const openEditProjectModal = (proj: PortfolioItem) => {
    setEditingProjectId(proj.id);
    setProjectForm({
      title: proj.title,
      category: proj.category,
      tag: proj.tag || 'Featured Work',
      description: proj.description,
      image: proj.image,
      videoSrc: proj.videoSrc || '',
      mediaType: proj.mediaType || (proj.videoSrc ? 'video' : 'image'),
      alt: proj.alt || proj.title,
      deliverables: proj.deliverables ? proj.deliverables.join(', ') : '',
      featured: !!proj.featured
    });
    setProjectModalOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectForm.title.trim()) {
      showToast('Please enter a project title', 'error');
      return;
    }

    const payload: Omit<PortfolioItem, 'id'> = {
      title: projectForm.title.trim(),
      category: projectForm.category,
      tag: projectForm.tag.trim() || 'Featured',
      description: projectForm.description.trim() || 'Bespoke creative design produced for creators.',
      image: projectForm.image.trim() || '/portfolio-assets/IMG_7470.JPG',
      videoSrc: projectForm.videoSrc.trim() || undefined,
      mediaType: projectForm.mediaType,
      alt: projectForm.alt.trim() || projectForm.title.trim(),
      deliverables: projectForm.deliverables
        ? projectForm.deliverables.split(',').map((d) => d.trim()).filter(Boolean)
        : ['Production Deliverables'],
      featured: projectForm.featured
    };

    if (editingProjectId) {
      store.updateProject(editingProjectId, payload);
      showToast(`Project "${payload.title}" updated!`);
    } else {
      store.createProject(payload);
      showToast(`Project "${payload.title}" added to portfolio!`);
    }

    setProjectModalOpen(false);
  };

  const confirmDeleteProject = (proj: PortfolioItem) => {
    const ok = window.confirm(`Delete "${proj.title}" from your public portfolio?`);
    if (!ok) return;

    store.deleteProject(proj.id);
    showToast(`Project "${proj.title}" removed!`);
  };

  // ----------------------------------------------------
  // REVIEWS CRUD HANDLERS
  // ----------------------------------------------------
  const openNewReviewModal = () => {
    setEditingReviewId(null);
    setReviewForm({
      name: '',
      role: 'Verified Creator',
      quote: '',
      rating: 5,
      verified: true
    });
    setReviewModalOpen(true);
  };

  const openEditReviewModal = (rev: ReviewItem) => {
    setEditingReviewId(rev.id);
    setReviewForm({
      name: rev.name,
      role: rev.role,
      quote: rev.quote,
      rating: rev.rating || 5,
      verified: true
    });
    setReviewModalOpen(true);
  };

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.quote.trim()) {
      showToast('Name and testimonial quote are required', 'error');
      return;
    }

    const payload = {
      name: reviewForm.name.trim(),
      role: reviewForm.role.trim() || 'Verified Creator',
      quote: reviewForm.quote.trim(),
      rating: reviewForm.rating,
      avatarText: reviewForm.name.trim().slice(0, 2).toUpperCase()
    };

    if (editingReviewId) {
      store.updateReview(editingReviewId, payload);
      showToast('Review updated!');
    } else {
      store.createReview(payload);
      showToast('Review added to website!');
    }

    setReviewModalOpen(false);
  };

  const confirmDeleteReview = (rev: ReviewItem) => {
    const ok = window.confirm(`Remove review by "${rev.name}"?`);
    if (!ok) return;

    store.deleteReview(rev.id);
    showToast('Review removed!');
  };

  // ----------------------------------------------------
  // MEDIA UPLOAD HANDLERS
  // ----------------------------------------------------
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      const sizeKB = Math.round(file.size / 1024);
      const sizeFormatted = sizeKB > 1024 ? `${(sizeKB / 1024).toFixed(1)} MB` : `${sizeKB} KB`;

      const isVideo = file.type.startsWith('video');

      store.addMedia({
        name: file.name,
        url: dataUrl,
        type: isVideo ? 'video' : 'image',
        sizeFormatted
      });

      setIsUploading(false);
      showToast(`Uploaded "${file.name}" to Media Library!`);
      if (fileInputRef.current) fileInputRef.current.value = '';
    };

    reader.onerror = () => {
      setIsUploading(false);
      showToast('Failed to read file', 'error');
    };

    reader.readAsDataURL(file);
  };

  const confirmDeleteMedia = (item: MediaItem) => {
    const ok = window.confirm(`Delete "${item.name}" from your media library?`);
    if (!ok) return;

    store.deleteMedia(item.id);
    showToast('Media file deleted!');
  };

  // ----------------------------------------------------
  // DATABASE BACKUP & RESTORE
  // ----------------------------------------------------
  const handleExportDB = () => {
    const jsonStr = store.exportJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nytrox-database-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Database exported to JSON file');
  };

  const handleImportDB = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const str = evt.target?.result as string;
      if (store.importJSON(str)) {
        showToast('Database restored successfully from backup!');
      } else {
        showToast('Invalid backup JSON file', 'error');
      }
    };
    reader.readAsText(file);
  };

  const handleResetDefaults = () => {
    setDeleteConfirm({
      isOpen: true,
      title: 'Reset entire website content and database to factory defaults? All manual edits will be reverted.',
      onConfirm: () => {
        store.resetToDefaults();
        setDeleteConfirm({ isOpen: false, title: '', onConfirm: () => {} });
        showToast('Reset to factory defaults completed');
      }
    });
  };

  // ----------------------------------------------------
  // FILTERED DATA
  // ----------------------------------------------------
  const filteredPosts = store.posts.filter((p) =>
    p.title.toLowerCase().includes(postSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(postSearch.toLowerCase())
  );

  const filteredPortfolio = store.portfolio.filter((p) =>
    p.title.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(portfolioSearch.toLowerCase())
  );

  const filteredMedia = store.mediaLibrary.filter((m) =>
    m.name.toLowerCase().includes(mediaSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-2xl animate-fade-in overflow-hidden">
      
      {/* Toast Notification Popup */}
      {toastMessage && (
        <div
          className={`fixed top-5 right-5 z-[200] px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold animate-fade-in backdrop-blur-xl border ${
            toastMessage.type === 'success'
              ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-300'
              : 'bg-red-950/90 border-red-500/40 text-red-300'
          }`}
        >
          {toastMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <AlertTriangle className="w-4 h-4 text-red-400" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Main Container */}
      <div
        className="relative max-w-7xl w-full h-[95vh] glass-card rounded-3xl border border-white/20 shadow-2xl overflow-hidden flex flex-col bg-zinc-950/95 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* ========================================================================= */}
        {/* STATE 1: MASTER PASSCODE LOGIN SCREEN                                     */}
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
                Enter your master passcode to access full administrative control and live visitors telemetry.
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
                className="w-full py-3.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-glow-sm cursor-pointer"
              >
                <Unlock className="w-4 h-4" />
                <span>Authenticate & Open Dashboard</span>
              </button>
            </form>

            <div className="pt-2 border-t border-white/10 w-full flex items-center justify-between text-[11px] text-zinc-500">
              <span>Shortcut: <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-zinc-300">Alt + A</kbd></span>
              <button onClick={onClose} className="hover:text-white transition-colors cursor-pointer">
                Cancel
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* STATE 2: FULL ADMINISTRATIVE CONTROL CENTER (CMS + TELEMETRY)             */
          /* ========================================================================= */
          <>
            {/* Top Navigation Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-surface-100/70 backdrop-blur-md shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full overflow-hidden border border-white/20 p-0.5 bg-zinc-900">
                  <img src="/nytrox-logo.jpg" alt="Logo" className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <h2 className="text-sm sm:text-base font-bold font-display text-white flex items-center gap-2">
                    <span>Nytrox Studio Control Center</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      Super Admin
                    </span>
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 text-xs font-medium transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Lock className="w-3 h-3" />
                  <span>Lock Panel</span>
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full border border-white/20 text-zinc-400 hover:text-white hover:bg-white/20 transition-all cursor-pointer"
                  aria-label="Close admin dashboard"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Split Layout: Sidebar Tabs + Content Area */}
            <div className="flex-1 flex overflow-hidden">
              
              {/* Left Navigation Sidebar */}
              <aside className="w-48 sm:w-56 border-r border-white/10 bg-surface-100/40 p-3 flex flex-col justify-between shrink-0 overflow-y-auto">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 px-3 py-1 block">
                    Management
                  </span>

                  <button
                    onClick={() => setActiveTab('telemetry')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === 'telemetry' ? 'bg-white text-black shadow-glow-sm' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Activity className="w-4 h-4" />
                    <span>Live Telemetry</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('posts')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === 'posts' ? 'bg-white text-black shadow-glow-sm' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FileText className="w-4 h-4" />
                      <span>Posts & Blog</span>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded ${activeTab === 'posts' ? 'bg-black/15 text-black' : 'bg-white/10 text-zinc-300'}`}>
                      {store.posts.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('portfolio')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === 'portfolio' ? 'bg-white text-black shadow-glow-sm' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Briefcase className="w-4 h-4" />
                      <span>Portfolio Works</span>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded ${activeTab === 'portfolio' ? 'bg-black/15 text-black' : 'bg-white/10 text-zinc-300'}`}>
                      {store.portfolio.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('pages')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === 'pages' ? 'bg-white text-black shadow-glow-sm' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Layers className="w-4 h-4" />
                    <span>Pages & Content</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('media')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === 'media' ? 'bg-white text-black shadow-glow-sm' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <ImageIcon className="w-4 h-4" />
                      <span>Media Library</span>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded ${activeTab === 'media' ? 'bg-black/15 text-black' : 'bg-white/10 text-zinc-300'}`}>
                      {store.mediaLibrary.length}
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('taxonomy')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === 'taxonomy' ? 'bg-white text-black shadow-glow-sm' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Tag className="w-4 h-4" />
                    <span>Categories & Tags</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      activeTab === 'reviews' ? 'bg-white text-black shadow-glow-sm' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Star className="w-4 h-4" />
                      <span>Client Reviews</span>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded ${activeTab === 'reviews' ? 'bg-black/15 text-black' : 'bg-white/10 text-zinc-300'}`}>
                      {store.reviews.length}
                    </span>
                  </button>

                  <div className="pt-2 border-t border-white/5">
                    <button
                      onClick={() => setActiveTab('system')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        activeTab === 'system' ? 'bg-white text-black shadow-glow-sm' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Settings className="w-4 h-4" />
                      <span>Admin & Settings</span>
                    </button>
                  </div>
                </div>

                {/* Bottom Status Box */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-[11px] space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>Live Sync Active</span>
                  </div>
                  <span className="text-zinc-500 block">Changes persist immediately across the public site.</span>
                </div>
              </aside>

              {/* Center Scrollable Work Area */}
              <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-zinc-950/60">
                
                {/* ----------------------------------------------------------------- */}
                {/* TAB 1: TELEMETRY & LIVE PULSE                                    */}
                {/* ----------------------------------------------------------------- */}
                {activeTab === 'telemetry' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold font-display text-white">Live Visitor & Interaction Telemetry</h3>
                      <p className="text-xs text-zinc-400">Real active presence sockets and genuine traffic metrics.</p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="glass-card p-5 rounded-2xl border border-emerald-500/40 bg-emerald-950/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 flex items-center gap-1.5">
                            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
                            <span>Live Viewers Now</span>
                          </span>
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        </div>
                        <div className="mt-2 flex items-baseline gap-2">
                          <span className="text-3xl sm:text-4xl font-black font-display text-white">{liveViewers}</span>
                          <span className="text-xs text-emerald-400 font-semibold">active</span>
                        </div>
                        <p className="text-[10px] text-zinc-400 mt-1">Real connected user sessions right now.</p>
                      </div>

                      <div className="glass-card p-5 rounded-2xl border border-white/10 bg-surface-200/40">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Total Pageviews</span>
                        <div className="mt-2 text-3xl sm:text-4xl font-bold font-display text-white">{analyticsData.totalPageViews}</div>
                        <p className="text-[10px] text-zinc-400 mt-1">Actual page visits recorded.</p>
                      </div>

                      <div className="glass-card p-5 rounded-2xl border border-white/10 bg-surface-200/40">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Unique Visitors</span>
                        <div className="mt-2 text-3xl sm:text-4xl font-bold font-display text-white">{analyticsData.uniqueVisitors}</div>
                        <p className="text-[10px] text-zinc-400 mt-1">Distinct client devices logged.</p>
                      </div>

                      <div className="glass-card p-5 rounded-2xl border border-white/10 bg-surface-200/40">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Browsing Sessions</span>
                        <div className="mt-2 text-3xl sm:text-4xl font-bold font-display text-white">{analyticsData.totalVisits}</div>
                        <p className="text-[10px] text-zinc-400 mt-1">Sessions across all devices.</p>
                      </div>
                    </div>

                    {/* Heatmap & Event Log */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                          <Flame className="w-3.5 h-3.5 text-amber-400" />
                          <span>Real Project Click Heatmap</span>
                        </h4>
                        {Object.keys(analyticsData.projectClicks || {}).length === 0 ? (
                          <p className="text-xs text-zinc-500 py-4 text-center">No projects clicked yet in this session.</p>
                        ) : (
                          <div className="space-y-2">
                            {Object.entries(analyticsData.projectClicks).map(([id, item]) => (
                              <div key={id} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                                <div>
                                  <span className="font-bold text-white block">{item.title}</span>
                                  <span className="text-[10px] text-zinc-400">{item.category}</span>
                                </div>
                                <span className="px-2.5 py-1 rounded-full bg-white/10 text-white font-bold text-xs">{item.clicks} clicks</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                          <Activity className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Real-Time Activity Stream</span>
                        </h4>
                        {(analyticsData.recentEvents || []).length === 0 ? (
                          <p className="text-xs text-zinc-500 py-4 text-center">No recent events logged yet.</p>
                        ) : (
                          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                            {analyticsData.recentEvents.slice(0, 10).map((evt) => (
                              <div key={evt.id} className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                                <div>
                                  <span className="font-bold text-white">{evt.title}</span>
                                  <span className="text-zinc-400 block text-[10px]">{evt.details}</span>
                                </div>
                                <span className="text-[10px] text-zinc-500">{evt.device}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* ----------------------------------------------------------------- */}
                {/* TAB 2: POSTS & BLOG CRUD                                         */}
                {/* ----------------------------------------------------------------- */}
                {activeTab === 'posts' && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold font-display text-white">Articles & Blog Management</h3>
                        <p className="text-xs text-zinc-400">Full CRUD control: Create, edit, draft, publish, and delete posts.</p>
                      </div>
                      <button
                        onClick={openNewPostModal}
                        className="px-4 py-2 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center gap-1.5 shadow-glow-sm cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Create New Post</span>
                      </button>
                    </div>

                    {/* Search & Stats Bar */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="relative max-w-sm w-full">
                        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                        <input
                          type="text"
                          value={postSearch}
                          onChange={(e) => setPostSearch(e.target.value)}
                          placeholder="Search articles by title or category..."
                          className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30"
                        />
                      </div>
                      <span className="text-xs text-zinc-400 hidden sm:inline">
                        Showing {filteredPosts.length} of {store.posts.length} articles
                      </span>
                    </div>

                    {/* Posts Table / Card Grid */}
                    <div className="space-y-3">
                      {filteredPosts.map((post) => (
                        <div
                          key={post.id}
                          className="glass-card p-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3.5">
                            <img
                              src={post.coverImage}
                              alt={post.title}
                              className="w-16 h-12 rounded-xl object-cover border border-white/10 shrink-0"
                            />
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="px-2 py-0.5 rounded-full bg-white/10 text-[9px] uppercase font-bold text-zinc-300">
                                  {post.category}
                                </span>
                                <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold ${
                                  (post as any).status === 'draft' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                }`}>
                                  {(post as any).status || 'Published'}
                                </span>
                                {post.featured && (
                                  <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[9px] font-bold">
                                    ★ Featured
                                  </span>
                                )}
                              </div>
                              <h4 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-1">{post.title}</h4>
                              <span className="text-[10px] text-zinc-500">{post.publishedAt} • {post.readTime}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                            <button
                              onClick={() => openEditPostModal(post)}
                              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer"
                              title="Edit post"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => confirmDeletePost(post)}
                              className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 hover:text-red-300 transition-all cursor-pointer"
                              title="Delete post"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ----------------------------------------------------------------- */}
                {/* TAB 3: PORTFOLIO SHOWCASE CRUD                                   */}
                {/* ----------------------------------------------------------------- */}
                {activeTab === 'portfolio' && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold font-display text-white">Portfolio Works Management</h3>
                        <p className="text-xs text-zinc-400">Add, edit, rearrange, or remove projects across your 7 collections.</p>
                      </div>
                      <button
                        onClick={openNewProjectModal}
                        className="px-4 py-2 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center gap-1.5 shadow-glow-sm cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add New Project</span>
                      </button>
                    </div>

                    {/* Search Bar */}
                    <div className="relative max-w-sm w-full">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <input
                        type="text"
                        value={portfolioSearch}
                        onChange={(e) => setPortfolioSearch(e.target.value)}
                        placeholder="Search portfolio items..."
                        className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30"
                      />
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredPortfolio.map((proj) => (
                        <div
                          key={proj.id}
                          className="glass-card rounded-2xl border border-white/10 overflow-hidden hover:border-white/25 transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="aspect-video w-full bg-zinc-950 relative overflow-hidden">
                              <img
                                src={proj.image}
                                alt={proj.title}
                                className="w-full h-full object-cover"
                              />
                              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[9px] font-bold uppercase tracking-wider text-zinc-300 border border-white/10">
                                {proj.category}
                              </span>
                              {proj.mediaType === 'video' && (
                                <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[9px] text-white flex items-center gap-1">
                                  <Video className="w-3 h-3" />
                                  <span>Video</span>
                                </span>
                              )}
                            </div>

                            <div className="p-4 space-y-1.5">
                              <span className="text-[10px] font-bold text-zinc-400 block">{proj.tag}</span>
                              <h4 className="text-xs font-bold text-white line-clamp-1">{proj.title}</h4>
                              <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed">{proj.description}</p>
                            </div>
                          </div>

                          <div className="p-3 border-t border-white/5 flex items-center justify-between bg-white/[0.02]">
                            <span className="text-[10px] text-zinc-500">ID: {proj.id}</span>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => openEditProjectModal(proj)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-300 hover:text-white transition-all cursor-pointer"
                                title="Edit project"
                              >
                                <Edit3 className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => confirmDeleteProject(proj)}
                                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 hover:text-red-300 transition-all cursor-pointer"
                                title="Delete project"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ----------------------------------------------------------------- */}
                {/* TAB 4: PAGES & WEBSITE CONTENT                                   */}
                {/* ----------------------------------------------------------------- */}
                {activeTab === 'pages' && (
                  <div className="space-y-6 max-w-3xl">
                    <div>
                      <h3 className="text-lg font-bold font-display text-white">Pages & Website Content</h3>
                      <p className="text-xs text-zinc-400">Edit hero text, studio ethos story, contact details, and stats.</p>
                    </div>

                    {/* Section 1: Hero Settings */}
                    <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Hero Section Content</span>
                      </h4>

                      <div>
                        <label className="text-[11px] font-semibold text-zinc-400 block mb-1.5">Hero Punchy Subtitle</label>
                        <input
                          type="text"
                          value={store.studioInfo.tagline}
                          onChange={(e) => store.updateStudioInfo({ tagline: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-white/30"
                        />
                        <span className="text-[10px] text-zinc-500 mt-1 block">Displays right beneath the Nytrox Studio hero logo.</span>
                      </div>
                    </div>

                    {/* Section 2: Studio Ethos & Story */}
                    <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-zinc-400" />
                        <span>About Studio & Ethos</span>
                      </h4>

                      <div>
                        <label className="text-[11px] font-semibold text-zinc-400 block mb-1.5">About Section Story</label>
                        <textarea
                          rows={3}
                          value={store.studioInfo.aboutStory}
                          onChange={(e) => store.updateStudioInfo({ aboutStory: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-white/30 leading-relaxed"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-zinc-400 block mb-1.5">Footer Brand Summary</label>
                        <textarea
                          rows={2}
                          value={store.studioInfo.description}
                          onChange={(e) => store.updateStudioInfo({ description: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-white/30 leading-relaxed"
                        />
                      </div>
                    </div>

                    {/* Section 3: Contact & Socials */}
                    <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                        <Globe className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Contact & Social Links</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Official Email</label>
                          <input
                            type="text"
                            value={store.studioInfo.email}
                            onChange={(e) => store.updateStudioInfo({ email: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Instagram URL</label>
                          <input
                            type="text"
                            value={store.studioInfo.socials.instagram}
                            onChange={(e) =>
                              store.updateStudioInfo({
                                socials: { ...store.studioInfo.socials, instagram: e.target.value }
                              })
                            }
                            className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Twitter / X URL</label>
                          <input
                            type="text"
                            value={store.studioInfo.socials.twitter}
                            onChange={(e) =>
                              store.updateStudioInfo({
                                socials: { ...store.studioInfo.socials, twitter: e.target.value }
                              })
                            }
                            className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-semibold text-zinc-400 block mb-1">LinkedIn URL</label>
                          <input
                            type="text"
                            value={store.studioInfo.socials.linkedin}
                            onChange={(e) =>
                              store.updateStudioInfo({
                                socials: { ...store.studioInfo.socials, linkedin: e.target.value }
                              })
                            }
                            className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 4: Studio Key Stats */}
                    <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">Live Stats Bar (4 Metric Cards)</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {store.stats.map((st, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                            <input
                              type="text"
                              value={st.value}
                              onChange={(e) => {
                                const newStats = [...store.stats];
                                newStats[idx].value = e.target.value;
                                store.updateStats(newStats);
                              }}
                              className="w-full px-2 py-1 rounded bg-white/5 border border-white/10 text-sm font-bold text-white text-center"
                            />
                            <input
                              type="text"
                              value={st.label}
                              onChange={(e) => {
                                const newStats = [...store.stats];
                                newStats[idx].label = e.target.value;
                                store.updateStats(newStats);
                              }}
                              className="w-full px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-zinc-300 text-center"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ----------------------------------------------------------------- */}
                {/* TAB 5: MEDIA LIBRARY & UPLOADER                                   */}
                {/* ----------------------------------------------------------------- */}
                {activeTab === 'media' && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold font-display text-white">Media Library & File Uploader</h3>
                        <p className="text-xs text-zinc-400">Directly upload images/videos, copy URLs, and assign to portfolio or posts.</p>
                      </div>

                      {/* Real File Input Trigger */}
                      <div>
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          accept="image/*,video/*"
                          className="hidden"
                        />
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploading}
                          className="px-4 py-2 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center gap-1.5 shadow-glow-sm cursor-pointer disabled:opacity-50"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>{isUploading ? 'Uploading...' : 'Upload Media File'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Search */}
                    <div className="relative max-w-sm w-full">
                      <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <input
                        type="text"
                        value={mediaSearch}
                        onChange={(e) => setMediaSearch(e.target.value)}
                        placeholder="Search media files..."
                        className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30"
                      />
                    </div>

                    {/* Media Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {filteredMedia.map((m) => (
                        <div
                          key={m.id}
                          className="glass-card rounded-2xl border border-white/10 overflow-hidden hover:border-white/30 transition-all group flex flex-col justify-between"
                        >
                          <div className="aspect-square w-full bg-zinc-950 relative overflow-hidden flex items-center justify-center">
                            {m.type === 'video' ? (
                              <div className="flex flex-col items-center justify-center text-zinc-400 p-4 text-center">
                                <Video className="w-8 h-8 mb-1 text-zinc-300" />
                                <span className="text-[9px] uppercase font-bold text-zinc-500">Video Asset</span>
                              </div>
                            ) : (
                              <img src={m.url} alt={m.name} className="w-full h-full object-cover" />
                            )}
                            <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 text-[8px] uppercase font-bold text-zinc-300">
                              {m.sizeFormatted}
                            </span>
                          </div>

                          <div className="p-2.5 space-y-1.5">
                            <span className="text-[11px] font-bold text-white line-clamp-1 block" title={m.name}>
                              {m.name}
                            </span>
                            <div className="flex items-center justify-between pt-1 border-t border-white/5">
                              <button
                                onClick={() => {
                                  navigator.clipboard.writeText(m.url);
                                  showToast('Asset URL copied to clipboard!');
                                }}
                                className="p-1 rounded bg-white/5 hover:bg-white/15 text-zinc-300 text-[10px] flex items-center gap-1 cursor-pointer"
                                title="Copy asset URL"
                              >
                                <Copy className="w-3 h-3" />
                                <span>Copy URL</span>
                              </button>
                              <button
                                onClick={() => confirmDeleteMedia(m)}
                                className="p-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 cursor-pointer"
                                title="Delete media file"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ----------------------------------------------------------------- */}
                {/* TAB 6: CATEGORIES & TAGS                                         */}
                {/* ----------------------------------------------------------------- */}
                {activeTab === 'taxonomy' && (
                  <div className="space-y-6 max-w-3xl">
                    <div>
                      <h3 className="text-lg font-bold font-display text-white">Categories & Tags Taxonomy</h3>
                      <p className="text-xs text-zinc-400">Organize and structure collections and blog classifications.</p>
                    </div>

                    {/* Blog Categories */}
                    <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">Blog & Insights Categories</h4>
                      <div className="flex flex-wrap gap-2">
                        {store.blogCategories.map((cat) => (
                          <div
                            key={cat}
                            className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white flex items-center gap-2"
                          >
                            <span>{cat}</span>
                            <button
                              onClick={() => store.deleteBlogCategory(cat)}
                              className="text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                              title="Delete category"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Add Category */}
                      <div className="pt-2">
                        <form
                          onSubmit={(e: any) => {
                            e.preventDefault();
                            const val = e.target.elements.newCat.value.trim();
                            if (val) {
                              store.addBlogCategory(val);
                              e.target.elements.newCat.value = '';
                              showToast(`Added category "${val}"`);
                            }
                          }}
                          className="flex gap-2 max-w-md"
                        >
                          <input
                            name="newCat"
                            placeholder="Add new blog category..."
                            className="flex-1 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-white/30"
                          />
                          <button
                            type="submit"
                            className="px-3 py-1.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-zinc-200 cursor-pointer"
                          >
                            Add
                          </button>
                        </form>
                      </div>
                    </div>

                    {/* Global Tags */}
                    <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">Global Creative Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {store.tags.map((tg) => (
                          <div
                            key={tg}
                            className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-zinc-300 flex items-center gap-1.5"
                          >
                            <span>#{tg}</span>
                            <button
                              onClick={() => store.deleteTag(tg)}
                              className="text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                            >
                              <X className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Add Tag */}
                      <div className="pt-2">
                        <form
                          onSubmit={(e: any) => {
                            e.preventDefault();
                            const val = e.target.elements.newTag.value.trim();
                            if (val) {
                              store.addTag(val);
                              e.target.elements.newTag.value = '';
                              showToast(`Added tag "#${val}"`);
                            }
                          }}
                          className="flex gap-2 max-w-md"
                        >
                          <input
                            name="newTag"
                            placeholder="Add new tag (e.g. 3D, Anime)..."
                            className="flex-1 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-white/30"
                          />
                          <button
                            type="submit"
                            className="px-3 py-1.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-zinc-200 cursor-pointer"
                          >
                            Add
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                )}

                {/* ----------------------------------------------------------------- */}
                {/* TAB 7: CLIENT REVIEWS CRUD                                       */}
                {/* ----------------------------------------------------------------- */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-bold font-display text-white">Client Reviews & Testimonials</h3>
                        <p className="text-xs text-zinc-400">Moderate existing client feedback or add new verified creator reviews.</p>
                      </div>
                      <button
                        onClick={openNewReviewModal}
                        className="px-4 py-2 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center gap-1.5 shadow-glow-sm cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add New Review</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {store.reviews.map((rev) => (
                        <div
                          key={rev.id}
                          className="glass-card p-4 rounded-2xl border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center font-bold text-[10px] text-white">
                                  {rev.avatarText || rev.name.slice(0, 2).toUpperCase()}
                                </div>
                                <div>
                                  <h4 className="text-xs font-bold text-white">{rev.name}</h4>
                                  <span className="text-[10px] text-zinc-400 block">{rev.role}</span>
                                </div>
                              </div>
                              <div className="flex items-center text-amber-400 text-xs">
                                {'★'.repeat(rev.rating || 5)}
                              </div>
                            </div>
                            <p className="text-xs text-zinc-300 leading-relaxed italic">"{rev.quote}"</p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[10px] text-zinc-500">{rev.date}</span>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => openEditReviewModal(rev)}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-zinc-300 transition-colors cursor-pointer"
                              >
                                <Edit3 className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => confirmDeleteReview(rev)}
                                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ----------------------------------------------------------------- */}
                {/* TAB 8: ADMIN, SETTINGS & BACKUP                                  */}
                {/* ----------------------------------------------------------------- */}
                {activeTab === 'system' && (
                  <div className="space-y-6 max-w-3xl">
                    <div>
                      <h3 className="text-lg font-bold font-display text-white">Admin Management & Site Settings</h3>
                      <p className="text-xs text-zinc-400">Security passcodes, public section switches, and complete database backup.</p>
                    </div>

                    {/* Section Visibility Switches (Show/Hide Blog Section!) */}
                    <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">Public Section Toggles</h4>
                      
                      <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                        <div>
                          <span className="font-bold text-xs text-white block">Blog & Studio Journal Section</span>
                          <span className="text-[11px] text-zinc-400">
                            Toggle visibility of the Blog on the public landing page and top navigation bar.
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            const updated = !store.siteSettings.showBlogSection;
                            store.updateSettings({ showBlogSection: updated });
                            showToast(updated ? 'Blog section is now VISIBLE on public website' : 'Blog section is now HIDDEN from public website');
                          }}
                          className={`p-1.5 rounded-full transition-all cursor-pointer ${
                            store.siteSettings.showBlogSection ? 'text-emerald-400' : 'text-zinc-600'
                          }`}
                        >
                          {store.siteSettings.showBlogSection ? (
                            <ToggleRight className="w-8 h-8" />
                          ) : (
                            <ToggleLeft className="w-8 h-8" />
                          )}
                        </button>
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                        <div>
                          <span className="font-bold text-xs text-white block">Client Testimonials Section</span>
                          <span className="text-[11px] text-zinc-400">Display creator reviews on the homepage.</span>
                        </div>
                        <button
                          onClick={() => {
                            const updated = !store.siteSettings.showReviewsSection;
                            store.updateSettings({ showReviewsSection: updated });
                            showToast(updated ? 'Reviews section enabled' : 'Reviews section disabled');
                          }}
                          className={`p-1.5 rounded-full transition-all cursor-pointer ${
                            store.siteSettings.showReviewsSection ? 'text-emerald-400' : 'text-zinc-600'
                          }`}
                        >
                          {store.siteSettings.showReviewsSection ? (
                            <ToggleRight className="w-8 h-8" />
                          ) : (
                            <ToggleLeft className="w-8 h-8" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Master Passcode Change */}
                    <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                        <KeyRound className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Change Master PIN / Passcode</span>
                      </h4>
                      <form onSubmit={handleUpdatePin} className="flex gap-2 max-w-sm">
                        <input
                          type="password"
                          value={newPin}
                          onChange={(e) => setNewPin(e.target.value)}
                          placeholder="New Passcode (min 4 chars)"
                          className="flex-1 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-white/30"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-white text-black font-bold text-xs hover:bg-zinc-200 transition-all cursor-pointer"
                        >
                          Update
                        </button>
                      </form>
                    </div>

                    {/* Database Backup & Restore */}
                    <div className="glass-card p-5 rounded-2xl border border-white/10 space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">Database Backup & Recovery</h4>
                      <div className="flex flex-wrap gap-3">
                        <button
                          onClick={handleExportDB}
                          className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-white flex items-center gap-2 transition-all cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Export Database JSON</span>
                        </button>

                        <label className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-white flex items-center gap-2 transition-all cursor-pointer">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Import Backup JSON</span>
                          <input type="file" accept=".json" onChange={handleImportDB} className="hidden" />
                        </label>

                        <button
                          onClick={handleResetDefaults}
                          className="px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-xs font-bold text-red-400 flex items-center gap-2 transition-all cursor-pointer"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          <span>Reset to Factory Defaults</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </main>
            </div>

            {/* =================================================================== */}
            {/* SUB-MODAL 1: POST CREATE / EDIT DIALOG                              */}
            {/* =================================================================== */}
            {postModalOpen && (
              <div className="fixed inset-0 z-[180] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
                <div
                  className="glass-card rounded-3xl border border-white/20 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-zinc-950 text-white space-y-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h3 className="text-base font-bold text-white">
                      {editingPostId ? 'Edit Article Post' : 'Create New Article Post'}
                    </h3>
                    <button
                      onClick={() => setPostModalOpen(false)}
                      className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleSavePost} className="space-y-4">
                    <div>
                      <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Post Title *</label>
                      <input
                        type="text"
                        required
                        value={postForm.title}
                        onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                        placeholder="e.g. The Psychology of High-CTR YouTube Thumbnails"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-white/30"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Category</label>
                        <select
                          value={postForm.category}
                          onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none"
                        >
                          {store.blogCategories.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Status</label>
                        <select
                          value={postForm.status}
                          onChange={(e) => setPostForm({ ...postForm, status: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none"
                        >
                          <option value="published">Published</option>
                          <option value="draft">Save as Draft</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Cover Image URL or Media</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={postForm.coverImage}
                          onChange={(e) => setPostForm({ ...postForm, coverImage: e.target.value })}
                          placeholder="https://... or select from media"
                          className="flex-1 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none"
                        />
                      </div>
                      {postForm.coverImage && (
                        <div className="mt-2 w-24 h-16 rounded-lg overflow-hidden border border-white/10">
                          <img src={postForm.coverImage} alt="Cover preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Summary / Excerpt</label>
                      <textarea
                        rows={2}
                        value={postForm.excerpt}
                        onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                        placeholder="Brief teaser displayed in cards..."
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Article Content (Markdown Supported)</label>
                      <textarea
                        rows={6}
                        value={postForm.content}
                        onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                        placeholder="## Heading

Write your complete article content here..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none leading-relaxed font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Author Name</label>
                        <input
                          type="text"
                          value={postForm.authorName}
                          onChange={(e) => setPostForm({ ...postForm, authorName: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Read Time</label>
                        <input
                          type="text"
                          value={postForm.readTime}
                          onChange={(e) => setPostForm({ ...postForm, readTime: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="featCheck"
                        checked={postForm.featured}
                        onChange={(e) => setPostForm({ ...postForm, featured: e.target.checked })}
                        className="rounded"
                      />
                      <label htmlFor="featCheck" className="text-xs text-zinc-300 cursor-pointer">
                        Mark as Featured Post
                      </label>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setPostModalOpen(false)}
                        className="px-4 py-2 rounded-xl border border-white/10 text-xs text-zinc-400 hover:text-white cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 cursor-pointer"
                      >
                        {editingPostId ? 'Save Changes' : 'Publish Article'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* SUB-MODAL 2: PORTFOLIO PROJECT CREATE / EDIT DIALOG                 */}
            {/* =================================================================== */}
            {projectModalOpen && (
              <div className="fixed inset-0 z-[180] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
                <div
                  className="glass-card rounded-3xl border border-white/20 p-6 max-w-xl w-full max-h-[90vh] overflow-y-auto bg-zinc-950 text-white space-y-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h3 className="text-base font-bold text-white">
                      {editingProjectId ? 'Edit Portfolio Project' : 'Add New Portfolio Project'}
                    </h3>
                    <button
                      onClick={() => setProjectModalOpen(false)}
                      className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveProject} className="space-y-4">
                    <div>
                      <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Project Title *</label>
                      <input
                        type="text"
                        required
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        placeholder="e.g. Cybernetic Live2D Rigging"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Category Shelf</label>
                        <select
                          value={projectForm.category}
                          onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white focus:outline-none"
                        >
                          {store.portfolioCategories.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Tag Badge</label>
                        <input
                          type="text"
                          value={projectForm.tag}
                          onChange={(e) => setProjectForm({ ...projectForm, tag: e.target.value })}
                          placeholder="e.g. Live2D Character"
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Primary Image URL / Thumbnail</label>
                      <input
                        type="text"
                        required
                        value={projectForm.image}
                        onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                        placeholder="URL or select from Media library"
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Video Preview URL (Optional)</label>
                      <input
                        type="text"
                        value={projectForm.videoSrc}
                        onChange={(e) => setProjectForm({
                          ...projectForm,
                          videoSrc: e.target.value,
                          mediaType: e.target.value ? 'video' : 'image'
                        })}
                        placeholder="/portfolio-assets/video.mp4"
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Deliverables (comma-separated)</label>
                      <input
                        type="text"
                        value={projectForm.deliverables}
                        onChange={(e) => setProjectForm({ ...projectForm, deliverables: e.target.value })}
                        placeholder="e.g. Character Art, Layer Separation, 4K Exports"
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                      />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setProjectModalOpen(false)}
                        className="px-4 py-2 rounded-xl border border-white/10 text-xs text-zinc-400 hover:text-white cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 cursor-pointer"
                      >
                        {editingProjectId ? 'Save Project' : 'Add to Portfolio'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* SUB-MODAL 3: REVIEW CREATE / EDIT DIALOG                            */}
            {/* =================================================================== */}
            {reviewModalOpen && (
              <div className="fixed inset-0 z-[180] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
                <div
                  className="glass-card rounded-3xl border border-white/20 p-6 max-w-md w-full bg-zinc-950 text-white space-y-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h3 className="text-base font-bold text-white">
                      {editingReviewId ? 'Edit Review' : 'Add Client Review'}
                    </h3>
                    <button
                      onClick={() => setReviewModalOpen(false)}
                      className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveReview} className="space-y-4">
                    <div>
                      <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Creator / Client Name *</label>
                      <input
                        type="text"
                        required
                        value={reviewForm.name}
                        onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Platform / Role</label>
                      <input
                        type="text"
                        value={reviewForm.role}
                        onChange={(e) => setReviewForm({ ...reviewForm, role: e.target.value })}
                        placeholder="e.g. Partnered Twitch Streamer"
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Testimonial Quote *</label>
                      <textarea
                        rows={3}
                        required
                        value={reviewForm.quote}
                        onChange={(e) => setReviewForm({ ...reviewForm, quote: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-zinc-400 block mb-1">Star Rating (1-5)</label>
                      <select
                        value={reviewForm.rating}
                        onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}
                        className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white"
                      >
                        <option value={5}>★★★★★ (5 Stars)</option>
                        <option value={4}>★★★★☆ (4 Stars)</option>
                        <option value={3}>★★★☆☆ (3 Stars)</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setReviewModalOpen(false)}
                        className="px-4 py-2 rounded-xl border border-white/10 text-xs text-zinc-400 hover:text-white cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-zinc-200 cursor-pointer"
                      >
                        {editingReviewId ? 'Save Review' : 'Add Review'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* SUB-MODAL 4: DESTRUCTION CONFIRMATION DIALOG                        */}
            {/* =================================================================== */}
            {deleteConfirm.isOpen && (
              <div className="fixed inset-0 z-[210] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
                <div
                  className="glass-card rounded-2xl border border-red-500/30 p-6 max-w-md w-full bg-zinc-950 text-white space-y-4 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-3 text-red-400">
                    <AlertTriangle className="w-6 h-6 shrink-0" />
                    <h3 className="text-sm font-bold text-white">Confirm Permanent Action</h3>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {deleteConfirm.title}
                  </p>

                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                    <button
                      onClick={() => setDeleteConfirm({ isOpen: false, title: '', onConfirm: () => {} })}
                      className="px-4 py-2 rounded-xl border border-white/10 text-xs text-zinc-400 hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={deleteConfirm.onConfirm}
                      className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Confirm Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};