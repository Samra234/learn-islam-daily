import React, { useState } from 'react';
import {
  BookOpen,
  Menu,
  X,
  Bookmark,
  Search,
  Sparkles,
  User as UserIcon,
  LogOut,
  Shield,
  Moon,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute, onNavigate, onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, isAdmin, loginWithGoogle, logout, bookmarks, language, setLanguage } = useApp();

  const navLinks = [
    { label: language === 'ur' ? 'صفحۂ اول' : 'Home', route: 'home' },
    { label: language === 'ur' ? 'قرآنی آیات' : "Qur'an Ayahs", route: 'quran' },
    { label: language === 'ur' ? 'موضوعات' : 'Topics', route: 'topics' },
    { label: language === 'ur' ? 'احادیث' : 'Hadith', route: 'hadith' },
    { label: language === 'ur' ? 'دعائیں' : 'Duas', route: 'duas' },
    { label: language === 'ur' ? 'اقوالِ حکمت' : 'Islamic Quotes', route: 'quotes' },
    { label: language === 'ur' ? 'حوصلہ افزائی' : 'Motivation', route: 'motivation' },
    { label: language === 'ur' ? 'مضامین' : 'Articles', route: 'articles' },
    { label: language === 'ur' ? 'ہمارے بارے میں' : 'About', route: 'about' },
    { label: language === 'ur' ? 'رابطہ' : 'Contact', route: 'contact' },
  ];

  const handleNav = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-emerald-900 text-emerald-100 text-xs py-1.5 px-4 text-center flex items-center justify-between border-b border-emerald-800">
        <div className="flex items-center space-x-2 text-stone-200 text-[11px] md:text-xs mx-auto">
          <Moon className="w-3.5 h-3.5 text-amber-300" />
          <span>
            {language === 'ur'
              ? 'بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ • دلوں کے سکون کے لیے روزانہ اسلامی رہنمائی'
              : 'In the Name of Allah, the Most Gracious, the Most Merciful • A Daily Reminder for the Heart'}
          </span>
        </div>

        {/* Language Switcher */}
        <div className="flex items-center space-x-1.5 font-medium text-xs">
          <button
            onClick={() => setLanguage('en')}
            className={`px-2 py-0.5 rounded transition ${
              language === 'en' ? 'bg-emerald-700 text-white font-bold' : 'text-emerald-300 hover:text-white'
            }`}
          >
            EN
          </button>
          <span className="text-emerald-500">|</span>
          <button
            onClick={() => setLanguage('ur')}
            className={`px-2 py-0.5 rounded transition font-urdu ${
              language === 'ur' ? 'bg-emerald-700 text-white font-bold' : 'text-emerald-300 hover:text-white'
            }`}
          >
            اردو
          </button>
        </div>
      </div>

      {/* Main Nav Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Brand */}
          <div
            onClick={() => handleNav('home')}
            className="flex items-center space-x-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-800 via-emerald-700 to-teal-600 flex items-center justify-center text-amber-300 shadow-md group-hover:scale-105 transition-transform duration-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-cinzel text-lg md:text-xl font-bold tracking-tight text-emerald-950">
                  Learn Islam Daily
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-medium tracking-wide">
                {language === 'ur' ? 'دلوں کی بیداری کے لیے روزانہ کا پیغام' : 'A Daily Reminder for the Heart'}
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center space-x-1 text-sm font-medium text-stone-700">
            {navLinks.slice(0, 8).map((link) => (
              <button
                key={link.route}
                onClick={() => handleNav(link.route)}
                className={`px-3 py-2 rounded-lg transition-colors ${
                  currentRoute === link.route
                    ? 'text-emerald-800 bg-emerald-50/90 font-semibold'
                    : 'hover:text-emerald-700 hover:bg-stone-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-stone-600 hover:text-emerald-800 hover:bg-stone-100 rounded-lg transition"
              title="Search Qur'an, Hadith, Duas"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Saved Bookmarks */}
            <button
              onClick={() => handleNav('saved')}
              className="relative p-2 text-stone-600 hover:text-emerald-800 hover:bg-stone-100 rounded-lg transition"
              title="My Saved Reminders"
              aria-label="Saved Bookmarks"
            >
              <Bookmark className="w-5 h-5" />
              {bookmarks.length > 0 && (
                <span className="absolute top-1 right-1 bg-amber-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {bookmarks.length}
                </span>
              )}
            </button>

            {/* Prominent "Today's Reminder" button */}
            <button
              onClick={() => handleNav('daily-reminder')}
              className="hidden md:flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-amber-200 text-xs font-semibold shadow-xs transition transform active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'ur' ? 'آج کی نصیحت' : "Today's Reminder"}</span>
            </button>

            {/* User Account / Admin Menu */}
            <div className="relative">
              {user ? (
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-1.5 p-1.5 rounded-lg hover:bg-stone-100 transition border border-stone-200"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="" className="w-7 h-7 rounded-full object-cover" />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold">
                      {user.displayName?.charAt(0) || 'U'}
                    </div>
                  )}
                  <ChevronDown className="w-3.5 h-3.5 text-stone-500" />
                </button>
              ) : (
                <button
                  onClick={() => loginWithGoogle()}
                  className="text-xs font-semibold text-stone-700 hover:text-emerald-800 px-3 py-1.5 rounded-lg border border-stone-300 hover:border-emerald-600 transition"
                >
                  {language === 'ur' ? 'لاگ ان' : 'Sign In'}
                </button>
              )}

              {/* User Dropdown */}
              {userDropdownOpen && user && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in">
                  <div className="px-4 py-2 border-b border-stone-100">
                    <p className="text-xs font-semibold text-stone-800 truncate">{user.displayName || 'Learner'}</p>
                    <p className="text-[11px] text-stone-500 truncate">{user.email}</p>
                  </div>

                  <button
                    onClick={() => handleNav('saved')}
                    className="w-full text-left px-4 py-2 text-xs text-stone-700 hover:bg-emerald-50 hover:text-emerald-800 flex items-center space-x-2"
                  >
                    <Bookmark className="w-4 h-4 text-emerald-600" />
                    <span>My Islamic Learning ({bookmarks.length})</span>
                  </button>

                  {isAdmin && (
                    <button
                      onClick={() => handleNav('admin')}
                      className="w-full text-left px-4 py-2 text-xs text-amber-700 bg-amber-50/50 hover:bg-amber-100 font-semibold flex items-center space-x-2"
                    >
                      <Shield className="w-4 h-4 text-amber-600" />
                      <span>Admin Dashboard</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center space-x-2 border-t border-stone-100 mt-1"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-stone-700 hover:text-emerald-800 rounded-lg hover:bg-stone-100 transition"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-stone-50 border-b border-stone-200 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2">
          {/* Prominent Mobile Today Reminder */}
          <button
            onClick={() => handleNav('daily-reminder')}
            className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl bg-emerald-800 text-amber-200 font-semibold text-sm mb-3 shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>{language === 'ur' ? 'آج کی نصیحت پڑھیں' : "Today's Reminder"}</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.route}
                onClick={() => handleNav(link.route)}
                className={`text-left px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                  currentRoute === link.route
                    ? 'bg-emerald-100 text-emerald-900 font-semibold'
                    : 'bg-white text-stone-700 hover:bg-stone-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500 px-1">
            <button onClick={() => handleNav('saved')} className="flex items-center space-x-1 text-emerald-800 font-medium">
              <Bookmark className="w-4 h-4" />
              <span>Saved Items ({bookmarks.length})</span>
            </button>
            {isAdmin && (
              <button onClick={() => handleNav('admin')} className="text-amber-700 font-medium">
                Admin Panel
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
