import React, { useState } from 'react';
import { Bookmark, Trash2, Clock, BookOpen, Sparkles, User as UserIcon, LogIn, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SavedPageProps {
  onNavigate: (route: string) => void;
  onOpenAyah: (surahNumber: number, ayahNumber: number) => void;
  onOpenArticle: (slug: string) => void;
}

export const SavedPage: React.FC<SavedPageProps> = ({ onNavigate, onOpenAyah, onOpenArticle }) => {
  const { user, loginWithGoogle, bookmarks, toggleBookmark, readingHistory, ayahs, articles } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredBookmarks = bookmarks.filter(b => {
    if (selectedFilter === 'all') return true;
    return b.contentType === selectedFilter;
  });

  const handleOpenItem = (contentId: string, contentType: string) => {
    if (contentType === 'ayah') {
      const ayah = ayahs.find(a => a.id === contentId);
      if (ayah) {
        onOpenAyah(ayah.surahNumber, ayah.ayahNumber);
        return;
      }
    } else if (contentType === 'article') {
      const art = articles.find(a => a.id === contentId);
      if (art) {
        onOpenArticle(art.slug);
        return;
      }
    } else if (contentType === 'hadith') {
      onNavigate('hadith');
    } else if (contentType === 'dua') {
      onNavigate('duas');
    } else if (contentType === 'quote') {
      onNavigate('quotes');
    } else if (contentType === 'reminder') {
      onNavigate('motivation');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Personal Dashboard
          </span>
          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-900 mt-2">
            My Islamic Learning
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm mt-1">
            Revisit your saved Qur'an ayahs, authentic hadiths, daily supplications, and reading path.
          </p>
        </div>

        {/* User Account Status */}
        <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 w-full sm:w-auto text-center sm:text-right shrink-0">
          {user ? (
            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-end space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-stone-800">{user.displayName || 'Muslim Servant'}</span>
              </div>
              <p className="text-[11px] text-stone-500">{user.email}</p>
              <span className="text-[10px] text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded font-semibold inline-block">
                Cloud Sync Active
              </span>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-xs text-stone-600">Sync across all your devices:</p>
              <button
                onClick={() => loginWithGoogle()}
                className="px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs transition active:scale-95 flex items-center justify-center space-x-1.5 mx-auto sm:ml-auto"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In with Google</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bookmarks Section */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-3">
          <div className="flex items-center space-x-2">
            <Bookmark className="w-5 h-5 text-emerald-800" />
            <h2 className="font-cinzel text-xl font-bold text-stone-900">
              My Saved Reminders ({bookmarks.length})
            </h2>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center space-x-1 text-xs">
            {['all', 'ayah', 'hadith', 'dua', 'quote', 'reminder'].map(f => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                className={`px-3 py-1 rounded-full capitalize transition ${
                  selectedFilter === f
                    ? 'bg-emerald-800 text-white font-medium'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {filteredBookmarks.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-3">
            <Bookmark className="w-10 h-10 text-stone-300 mx-auto" />
            <h3 className="font-bold text-stone-700 text-base">No Saved Items Yet</h3>
            <p className="text-stone-500 text-xs sm:text-sm max-w-sm mx-auto">
              Click the bookmark icon on any Qur'an ayah, authentic hadith, or dua to preserve it here for daily contemplation.
            </p>
            <button
              onClick={() => onNavigate('quran')}
              className="mt-2 px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-semibold hover:bg-emerald-700 transition"
            >
              Browse Qur'an Ayahs
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredBookmarks.map(b => (
              <div
                key={b.id}
                className="bg-white rounded-2xl p-5 border border-stone-200 hover:border-emerald-600/40 transition shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold uppercase tracking-wider text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {b.contentType}
                    </span>
                    <button
                      onClick={() =>
                        toggleBookmark({
                          contentId: b.contentId,
                          contentType: b.contentType,
                          title: b.title,
                          reference: b.reference
                        })
                      }
                      className="p-1 text-stone-400 hover:text-red-500 transition"
                      title="Remove bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3
                    onClick={() => handleOpenItem(b.contentId, b.contentType)}
                    className="font-bold text-stone-900 text-base hover:text-emerald-800 cursor-pointer transition"
                  >
                    {b.title}
                  </h3>

                  <p className="text-stone-500 text-xs mt-1">
                    {b.reference}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-800">
                  <button
                    onClick={() => handleOpenItem(b.contentId, b.contentType)}
                    className="hover:underline flex items-center space-x-1"
                  >
                    <span>Open Content</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reading History */}
      {readingHistory.length > 0 && (
        <div className="bg-stone-50 rounded-3xl p-6 sm:p-8 border border-stone-200 space-y-4">
          <div className="flex items-center space-x-2 text-stone-800 font-cinzel text-lg font-bold">
            <Clock className="w-5 h-5 text-emerald-800" />
            <span>Recent Reading History</span>
          </div>

          <div className="divide-y divide-stone-200/60">
            {readingHistory.slice(0, 6).map(h => (
              <div
                key={h.id}
                onClick={() => handleOpenItem(h.contentId, h.contentType)}
                className="py-2.5 flex items-center justify-between text-xs cursor-pointer hover:text-emerald-800 transition group"
              >
                <div className="flex items-center space-x-2">
                  <span className="font-bold uppercase tracking-wider text-[9px] text-stone-500 bg-stone-200 px-1.5 py-0.5 rounded">
                    {h.contentType}
                  </span>
                  <span className="font-medium text-stone-800 group-hover:text-emerald-900 truncate max-w-xs sm:max-w-md">
                    {h.title}
                  </span>
                </div>
                <span className="text-stone-400 text-[11px] shrink-0">{h.viewedAt}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
