import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, Bookmark, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (route: string, itemId?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectResult }) => {
  const { ayahs, hadiths, duas, quotes, reminders, articles } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');

  const contentTypes = [
    { id: 'all', label: 'All Content' },
    { id: 'quran', label: "Qur'an Ayahs" },
    { id: 'hadith', label: 'Hadith' },
    { id: 'dua', label: 'Duas' },
    { id: 'quote', label: 'Quotes' },
    { id: 'reminder', label: 'Reminders' },
    { id: 'article', label: 'Articles' },
  ];

  const topicsList = [
    'all',
    'Trust in Allah',
    'Patience',
    "Allah's Infinite Mercy",
    'Anxiety & Relief',
    'Rizq',
    'Salah',
    'Forgiveness',
    'Character',
    'Parents & Family',
    'Hereafter'
  ];

  const searchResults = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    if (!q && selectedType === 'all' && selectedTopic === 'all') return [];

    const results: Array<{
      id: string;
      title: string;
      subtitle: string;
      arabic?: string;
      type: 'quran' | 'hadith' | 'dua' | 'quote' | 'reminder' | 'article';
      route: string;
      topic: string;
    }> = [];

    // Ayahs
    if (selectedType === 'all' || selectedType === 'quran') {
      ayahs.forEach((a) => {
        const matchesQuery =
          !q ||
          a.surah.toLowerCase().includes(q) ||
          a.englishTranslation.toLowerCase().includes(q) ||
          a.urduTranslation.includes(q) ||
          a.arabic.includes(q) ||
          a.topic.toLowerCase().includes(q) ||
          a.reflection.toLowerCase().includes(q);

        const matchesTopic =
          selectedTopic === 'all' || a.topic.toLowerCase().includes(selectedTopic.toLowerCase());

        if (matchesQuery && matchesTopic) {
          results.push({
            id: a.id,
            title: `Surah ${a.surah} (${a.surahNumber}:${a.ayahNumber})`,
            subtitle: a.englishTranslation,
            arabic: a.arabic,
            type: 'quran',
            route: `ayah-${a.surahNumber}-${a.ayahNumber}`,
            topic: a.topic
          });
        }
      });
    }

    // Hadith
    if (selectedType === 'all' || selectedType === 'hadith') {
      hadiths.forEach((h) => {
        const matchesQuery =
          !q ||
          h.collection.toLowerCase().includes(q) ||
          h.english.toLowerCase().includes(q) ||
          h.urdu.includes(q) ||
          h.arabic.includes(q) ||
          h.topic.toLowerCase().includes(q);

        const matchesTopic =
          selectedTopic === 'all' || h.topic.toLowerCase().includes(selectedTopic.toLowerCase());

        if (matchesQuery && matchesTopic) {
          results.push({
            id: h.id,
            title: `${h.collection} #${h.hadithNumber} (${h.grading})`,
            subtitle: h.english,
            arabic: h.arabic,
            type: 'hadith',
            route: 'hadith',
            topic: h.topic
          });
        }
      });
    }

    // Duas
    if (selectedType === 'all' || selectedType === 'dua') {
      duas.forEach((d) => {
        const matchesQuery =
          !q ||
          d.title.toLowerCase().includes(q) ||
          d.english.toLowerCase().includes(q) ||
          d.transliteration.toLowerCase().includes(q) ||
          d.arabic.includes(q) ||
          d.urdu.includes(q) ||
          d.topic.toLowerCase().includes(q);

        const matchesTopic =
          selectedTopic === 'all' || d.topic.toLowerCase().includes(selectedTopic.toLowerCase());

        if (matchesQuery && matchesTopic) {
          results.push({
            id: d.id,
            title: d.title,
            subtitle: d.english,
            arabic: d.arabic,
            type: 'dua',
            route: 'duas',
            topic: d.topic
          });
        }
      });
    }

    // Quotes
    if (selectedType === 'all' || selectedType === 'quote') {
      quotes.forEach((item) => {
        const matchesQuery =
          !q ||
          item.text.toLowerCase().includes(q) ||
          item.author.toLowerCase().includes(q) ||
          item.topic.toLowerCase().includes(q);

        const matchesTopic =
          selectedTopic === 'all' || item.topic.toLowerCase().includes(selectedTopic.toLowerCase());

        if (matchesQuery && matchesTopic) {
          results.push({
            id: item.id,
            title: `Quote by ${item.author}`,
            subtitle: item.text,
            type: 'quote',
            route: 'quotes',
            topic: item.topic
          });
        }
      });
    }

    // Reminders
    if (selectedType === 'all' || selectedType === 'reminder') {
      reminders.forEach((r) => {
        const matchesQuery =
          !q ||
          r.title.toLowerCase().includes(q) ||
          r.content.toLowerCase().includes(q) ||
          r.topic.toLowerCase().includes(q);

        const matchesTopic =
          selectedTopic === 'all' || r.topic.toLowerCase().includes(selectedTopic.toLowerCase());

        if (matchesQuery && matchesTopic) {
          results.push({
            id: r.id,
            title: r.title,
            subtitle: r.content,
            type: 'reminder',
            route: 'motivation',
            topic: r.topic
          });
        }
      });
    }

    // Articles
    if (selectedType === 'all' || selectedType === 'article') {
      articles.forEach((art) => {
        const matchesQuery =
          !q ||
          art.title.toLowerCase().includes(q) ||
          art.summary.toLowerCase().includes(q) ||
          art.category.toLowerCase().includes(q);

        const matchesTopic =
          selectedTopic === 'all' || art.category.toLowerCase().includes(selectedTopic.toLowerCase());

        if (matchesQuery && matchesTopic) {
          results.push({
            id: art.id,
            title: art.title,
            subtitle: art.summary,
            type: 'article',
            route: `article-${art.slug}`,
            topic: art.category
          });
        }
      });
    }

    return results;
  }, [searchTerm, selectedType, selectedTopic, ayahs, hadiths, duas, quotes, reminders, articles]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 pb-6 bg-stone-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-200 flex items-center space-x-3 bg-stone-50">
          <Search className="w-5 h-5 text-emerald-700" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Qur'an, Hadith, Duas, topics (e.g. 'patience', 'rizq', 'mercy')..."
            className="flex-1 bg-transparent border-none outline-hidden text-stone-800 placeholder-stone-400 text-sm md:text-base font-medium"
            autoFocus
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-stone-400 hover:text-stone-600 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs text-stone-500 hover:text-stone-800 rounded bg-stone-200/80 transition"
          >
            ESC
          </button>
        </div>

        {/* Content Type Tabs */}
        <div className="px-4 py-2 bg-white border-b border-stone-100 flex items-center space-x-1.5 overflow-x-auto text-xs">
          <Filter className="w-3.5 h-3.5 text-stone-400 shrink-0" />
          {contentTypes.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedType(t.id)}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap transition ${
                selectedType === t.id
                  ? 'bg-emerald-800 text-white font-medium'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Topic filter quick pills */}
        <div className="px-4 py-1.5 bg-stone-50/70 border-b border-stone-100 flex items-center space-x-1 overflow-x-auto text-[11px] text-stone-500">
          <span className="shrink-0 font-medium">Topic:</span>
          {topicsList.map((top) => (
            <button
              key={top}
              onClick={() => setSelectedTopic(top)}
              className={`px-2 py-0.5 rounded transition whitespace-nowrap ${
                selectedTopic === top
                  ? 'bg-amber-200 text-amber-900 font-semibold'
                  : 'hover:text-stone-800'
              }`}
            >
              {top === 'all' ? 'All Topics' : top}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 divide-y divide-stone-100">
          {searchResults.length === 0 ? (
            <div className="py-12 text-center text-stone-500 space-y-2">
              <BookOpen className="w-8 h-8 text-stone-300 mx-auto" />
              <p className="text-sm font-medium">
                {searchTerm
                  ? 'No verified references found matching your search.'
                  : 'Start typing to explore Qur\'an verses, Hadith, Duas, and reflections.'}
              </p>
              <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                {['Tawakkul', 'Patience', 'Allah\'s Mercy', 'Rizq', 'Salah', 'Anxiety'].map((hint) => (
                  <button
                    key={hint}
                    onClick={() => setSearchTerm(hint)}
                    className="text-xs bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-600 px-2.5 py-1 rounded-full transition"
                  >
                    "{hint}"
                  </button>
                ))}
              </div>
            </div>
          ) : (
            searchResults.map((res) => (
              <div
                key={res.id + res.type}
                onClick={() => {
                  onSelectResult(res.route, res.id);
                  onClose();
                }}
                className="py-3 px-2 hover:bg-emerald-50/50 rounded-xl cursor-pointer transition group flex items-start justify-between space-x-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        res.type === 'quran'
                          ? 'bg-emerald-100 text-emerald-800'
                          : res.type === 'hadith'
                          ? 'bg-amber-100 text-amber-900'
                          : res.type === 'dua'
                          ? 'bg-teal-100 text-teal-900'
                          : res.type === 'article'
                          ? 'bg-blue-100 text-blue-900'
                          : 'bg-purple-100 text-purple-900'
                      }`}
                    >
                      {res.type}
                    </span>
                    <span className="text-xs text-stone-500">• {res.topic}</span>
                  </div>

                  <h4 className="text-sm font-semibold text-stone-800 group-hover:text-emerald-900 transition">
                    {res.title}
                  </h4>

                  {res.arabic && (
                    <p className="text-xs font-arabic text-stone-600 mt-1 line-clamp-1" dir="rtl">
                      {res.arabic}
                    </p>
                  )}

                  <p className="text-xs text-stone-600 mt-0.5 line-clamp-2 leading-relaxed">
                    {res.subtitle}
                  </p>
                </div>

                <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-700 shrink-0 self-center" />
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-50 border-t border-stone-200 text-center text-xs text-stone-500">
          Showing verified Qur'anic ayahs, authentic Hadith, and scholarly reflections.
        </div>
      </div>
    </div>
  );
};
