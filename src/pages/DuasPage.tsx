import React, { useState } from 'react';
import { BookOpen, Share2, Bookmark, Copy, Check, Search, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DuaItem } from '../data/islamicData';
import { ShareCardModal } from '../components/ShareCardModal';

export const DuasPage: React.FC = () => {
  const { duas, isBookmarked, toggleBookmark, language } = useApp();
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [shareModal, setShareModal] = useState<{
    isOpen: boolean;
    arabic?: string;
    translation: string;
    reference: string;
  }>({
    isOpen: false,
    translation: '',
    reference: ''
  });

  const categories = [
    'all',
    'Anxiety & Relief in Hardship',
    'Forgiveness & Repentance (Tawbah)',
    'Parents & Family',
    'Rizq & Provision',
    'Morning and Evening',
    'Protection'
  ];

  const filtered = duas.filter(d => {
    const matchesCat = selectedTopic === 'all' || d.topic === selectedTopic || d.occasion?.includes(selectedTopic);
    const matchesQuery = !searchQuery ||
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.arabic.includes(searchQuery) ||
      d.urdu.includes(searchQuery);
    return matchesCat && matchesQuery;
  });

  const handleCopy = async (item: DuaItem) => {
    const text = `${item.title}\n\n${item.arabic}\n\nTransliteration: ${item.transliteration}\n\nEnglish: "${item.english}"\n\nUrdu: "${item.urdu}"\n\nReference: ${item.source}\nVia Learn Islam Daily`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-teal-900 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
          Hisnul Muslim & The Noble Qur'an
        </span>
        <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900">
          {language === 'ur' ? 'مسنون دعائیں اور اذکار' : 'Islamic Duas & Supplications'}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Dua is the essence of worship. Seek closeness, protection, and relief through authentic supplications taught in the Holy Qur'an and the authentic Sunnah of the Prophet ﷺ.
        </p>

        {/* Search */}
        <div className="pt-2 flex justify-center">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, situation, or meaning..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-teal-600 shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedTopic(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
              selectedTopic === cat
                ? 'bg-teal-800 text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {cat === 'all' ? 'All Duas' : cat}
          </button>
        ))}
      </div>

      {/* Duas List */}
      <div className="space-y-6">
        {filtered.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6"
          >
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-stone-100">
              <div>
                <h3 className="font-bold text-lg text-stone-900">
                  {language === 'ur' && item.titleUrdu ? item.titleUrdu : item.title}
                </h3>
                {item.occasion && (
                  <span className="text-xs text-stone-500 font-medium">
                    When to recite: {item.occasion}
                  </span>
                )}
              </div>
              <span className="font-bold text-teal-900 bg-teal-50 px-2.5 py-0.5 rounded-full text-xs border border-teal-200">
                {item.topic}
              </span>
            </div>

            {/* Arabic Dua */}
            <div className="bg-stone-50/80 rounded-2xl p-6 border border-stone-100 text-center">
              <p className="font-arabic text-xl sm:text-3xl text-emerald-950 leading-loose" dir="rtl">
                {item.arabic}
              </p>
              {item.transliteration && (
                <p className="text-xs sm:text-sm text-stone-500 italic mt-4 max-w-2xl mx-auto">
                  {item.transliteration}
                </p>
              )}
            </div>

            {/* Translations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                  English Translation
                </span>
                <p className="text-stone-800 text-sm leading-relaxed">
                  "{item.english}"
                </p>
              </div>

              <div className="p-4 rounded-xl bg-stone-50 border border-stone-100" dir="rtl">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block mb-1 font-urdu">
                  اردو ترجمہ
                </span>
                <p className="font-urdu text-stone-800 text-base leading-loose">
                  "{item.urdu}"
                </p>
              </div>
            </div>

            {/* Footer controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-100 text-xs">
              <span className="text-stone-500 font-medium">
                Verified Source: {item.source}
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopy(item)}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 transition"
                >
                  {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                </button>

                <button
                  onClick={() =>
                    toggleBookmark({
                      contentId: item.id,
                      contentType: 'dua',
                      title: item.title,
                      reference: item.source
                    })
                  }
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg border transition ${
                    isBookmarked(item.id)
                      ? 'bg-amber-100 text-amber-800 border-amber-300 font-semibold'
                      : 'border-stone-200 text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{isBookmarked(item.id) ? 'Saved' : 'Save'}</span>
                </button>

                <button
                  onClick={() =>
                    setShareModal({
                      isOpen: true,
                      arabic: item.arabic,
                      translation: item.english,
                      reference: item.source
                    })
                  }
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-teal-800 hover:bg-teal-700 text-white font-medium transition"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Card</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ShareCardModal
        isOpen={shareModal.isOpen}
        onClose={() => setShareModal(prev => ({ ...prev, isOpen: false }))}
        arabic={shareModal.arabic}
        translation={shareModal.translation}
        reference={shareModal.reference}
        type="Dua"
      />
    </div>
  );
};
