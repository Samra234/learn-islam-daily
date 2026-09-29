import React, { useState } from 'react';
import { BookOpen, Search, Filter, ChevronRight, Bookmark, Share2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TOPIC_CATEGORIES, TopicCategory } from '../data/islamicData';
import { ShareCardModal } from '../components/ShareCardModal';

interface QuranPageProps {
  onOpenTopic: (slug: string) => void;
  onOpenAyah: (surahNumber: number, ayahNumber: number) => void;
}

export const QuranPage: React.FC<QuranPageProps> = ({ onOpenTopic, onOpenAyah }) => {
  const { ayahs, isBookmarked, toggleBookmark, language } = useApp();
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

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

  const groups = [
    'all',
    'Faith & Tawakkul',
    'Hope & Mercy',
    'Difficult Times',
    'Rizq & Provision',
    'Salah & Worship',
    'Character',
    'Hereafter',
    'Family & Relationships',
    'Guidance'
  ];

  const filteredTopics = TOPIC_CATEGORIES.filter(topic => {
    const matchesGroup = selectedGroup === 'all' || topic.group === selectedGroup;
    const matchesQuery = !searchQuery ||
      topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.nameUrdu.includes(searchQuery);
    return matchesGroup && matchesQuery;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          The Noble Qur'an
        </span>
        <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900">
          {language === 'ur' ? 'موضوعات کے اعتبار سے قرآنی آیات' : "Qur'an Ayahs by Topic"}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          The Qur'an was revealed as a healing and a light. Explore verified verses indexed by emotional state, spiritual questions, and practical life themes.
        </p>

        {/* Search & Category Filter */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics (e.g. Trust, Patience, Rizq)..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-emerald-600 shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
        {groups.map((grp) => (
          <button
            key={grp}
            onClick={() => setSelectedGroup(grp)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
              selectedGroup === grp
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {grp === 'all' ? 'All Categories' : grp}
          </button>
        ))}
      </div>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTopics.map((topic) => {
          const topicAyahs = ayahs.filter(a => a.topic.toLowerCase().includes(topic.name.toLowerCase().split(' ')[0]));

          return (
            <div
              key={topic.id}
              className="bg-white rounded-2xl p-6 border border-stone-200 hover:border-emerald-600/50 hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded">
                    {topic.group}
                  </span>
                  <span className="text-xs text-stone-400 font-semibold">
                    {topic.ayahCount} Ayahs
                  </span>
                </div>

                <h3
                  onClick={() => onOpenTopic(topic.slug)}
                  className="font-bold text-lg text-stone-900 hover:text-emerald-800 cursor-pointer transition"
                >
                  {language === 'ur' ? topic.nameUrdu : topic.name}
                </h3>

                <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed">
                  {language === 'ur' ? topic.descriptionUrdu : topic.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between">
                <button
                  onClick={() => onOpenTopic(topic.slug)}
                  className="text-xs font-semibold text-emerald-800 hover:text-emerald-700 flex items-center space-x-1"
                >
                  <span>Explore Topic</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] text-stone-400 font-urdu">{topic.nameUrdu}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Featured Ayahs List */}
      <div className="bg-stone-50/80 rounded-3xl p-6 sm:p-10 border border-stone-200 space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-4">
          <div>
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900">
              Verified Qur'anic Ayahs
            </h2>
            <p className="text-xs text-stone-500 mt-1">
              Every ayah is cited with authentic Surah and Ayah numbers, verified Sahih International translation, and Urdu translations.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {ayahs.map((ayah) => (
            <div
              key={ayah.id}
              className="bg-white rounded-xl p-5 border border-stone-200 hover:border-emerald-600/40 transition shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center space-x-2 text-xs">
                  <span className="font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded">
                    Surah {ayah.surah} ({ayah.surahNumber}:{ayah.ayahNumber})
                  </span>
                  <span className="text-stone-400">•</span>
                  <span className="text-stone-600 font-medium">{ayah.topic}</span>
                </div>

                <p className="font-arabic text-xl text-stone-900 text-right leading-loose" dir="rtl">
                  {ayah.arabic}
                </p>

                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                  "{ayah.englishTranslation}"
                </p>
              </div>

              <div className="flex items-center space-x-2 md:self-center border-t md:border-t-0 pt-3 md:pt-0 border-stone-100 shrink-0">
                <button
                  onClick={() => onOpenAyah(ayah.surahNumber, ayah.ayahNumber)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold transition"
                >
                  View Ayah & Tafsir
                </button>

                <button
                  onClick={() =>
                    toggleBookmark({
                      contentId: ayah.id,
                      contentType: 'ayah',
                      title: `Surah ${ayah.surah} (${ayah.surahNumber}:${ayah.ayahNumber})`,
                      reference: ayah.source
                    })
                  }
                  className={`p-2 rounded-lg border transition ${
                    isBookmarked(ayah.id)
                      ? 'bg-amber-50 text-amber-700 border-amber-300'
                      : 'border-stone-200 text-stone-400 hover:text-stone-700'
                  }`}
                  title="Bookmark"
                >
                  <Bookmark className="w-4 h-4" />
                </button>

                <button
                  onClick={() =>
                    setShareModal({
                      isOpen: true,
                      arabic: ayah.arabic,
                      translation: ayah.englishTranslation,
                      reference: `Surah ${ayah.surah} (${ayah.surahNumber}:${ayah.ayahNumber})`
                    })
                  }
                  className="p-2 rounded-lg border border-stone-200 text-stone-400 hover:text-emerald-800 transition"
                  title="Share Card"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ShareCardModal
        isOpen={shareModal.isOpen}
        onClose={() => setShareModal(prev => ({ ...prev, isOpen: false }))}
        arabic={shareModal.arabic}
        translation={shareModal.translation}
        reference={shareModal.reference}
        type="Qur'an Ayah"
      />
    </div>
  );
};
