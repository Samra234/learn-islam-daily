import React, { useState } from 'react';
import { BookOpen, Share2, Bookmark, Copy, Check, Filter, Search, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HadithItem } from '../data/islamicData';
import { ShareCardModal } from '../components/ShareCardModal';

export const HadithPage: React.FC = () => {
  const { hadiths, isBookmarked, toggleBookmark, language } = useApp();
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
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

  const collections = ['all', 'Sahih Bukhari', 'Sahih Muslim', "Jami' at-Tirmidhi"];
  const topics = ['all', 'Good Character', 'Trust in Allah', 'Patience', 'Salah & Dhikr'];

  const filtered = hadiths.filter(h => {
    const matchesCol = selectedCollection === 'all' || h.collection.toLowerCase().includes(selectedCollection.toLowerCase());
    const matchesTop = selectedTopic === 'all' || h.topic.toLowerCase().includes(selectedTopic.toLowerCase());
    const matchesQuery = !searchQuery ||
      h.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.urdu.includes(searchQuery) ||
      h.arabic.includes(searchQuery) ||
      h.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCol && matchesTop && matchesQuery;
  });

  const handleCopy = async (item: HadithItem) => {
    const text = `${item.arabic}\n\n"${item.english}"\n\n— ${item.source} (${item.grading})\nLearn Islam Daily`;
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
        <span className="text-xs uppercase font-bold tracking-widest text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          The Prophetic Sunnah
        </span>
        <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900">
          {language === 'ur' ? 'مستند احادیثِ نبویہ' : 'Authentic Hadith Collection'}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          The words and teachings of Prophet Muhammad ﷺ provide practical light for character, worship, patience, and kindness. Every narration includes verified collections and authentic gradings.
        </p>

        {/* Search */}
        <div className="pt-2 flex justify-center">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hadith text or narrations..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-amber-600 shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
        <span className="text-stone-400 font-medium">Collection:</span>
        {collections.map(col => (
          <button
            key={col}
            onClick={() => setSelectedCollection(col)}
            className={`px-3 py-1.5 rounded-full transition ${
              selectedCollection === col
                ? 'bg-amber-800 text-white font-medium'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {col === 'all' ? 'All Collections' : col}
          </button>
        ))}
      </div>

      {/* Hadith List */}
      <div className="space-y-6">
        {filtered.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6"
          >
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-stone-100">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-amber-900 bg-amber-50 px-3 py-1 rounded-full text-xs border border-amber-200">
                  {item.collection} #{item.hadithNumber}
                </span>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Grade: {item.grading}
                </span>
              </div>
              {item.narrator && (
                <span className="text-xs text-stone-500 font-medium">
                  Narrated by: {item.narrator}
                </span>
              )}
            </div>

            {/* Arabic Hadith Text */}
            <div className="bg-stone-50/80 rounded-2xl p-6 border border-stone-100 text-center">
              <p className="font-arabic text-xl sm:text-2xl text-stone-900 leading-loose" dir="rtl">
                {item.arabic}
              </p>
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
                Reference: {item.source}
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
                      contentType: 'hadith',
                      title: `${item.collection} #${item.hadithNumber}`,
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
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-amber-800 hover:bg-amber-700 text-white font-medium transition"
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
        type="Hadith"
      />
    </div>
  );
};
