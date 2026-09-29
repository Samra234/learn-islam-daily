import React, { useState } from 'react';
import { BookOpen, Clock, ChevronRight, Search, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface ArticlesPageProps {
  onOpenArticle: (slug: string) => void;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({ onOpenArticle }) => {
  const { articles, language } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'all',
    'Faith & Tawakkul',
    'Salah & Worship',
    'Qur\'an Reflections',
    'Character',
    'Patience'
  ];

  const filtered = articles.filter(art => {
    const matchesCat = selectedCategory === 'all' || art.category === selectedCategory;
    const matchesQuery = !searchQuery ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Islamic Educational Blog
        </span>
        <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900">
          {language === 'ur' ? 'علمی و تربیتی مضامین' : 'Articles & Reflections'}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          In-depth educational writings connecting classical Islamic scholarship with modern spiritual living.
        </p>

        {/* Scholar Advisory Notice */}
        <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-950 flex items-center justify-center space-x-2 max-w-xl mx-auto">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            <strong>Educational Disclaimer:</strong> Articles provide educational perspectives and personal reflections. For specific legal rulings (fatawa) and complex personal circumstances, please consult qualified Islamic scholars.
          </span>
        </div>

        {/* Search */}
        <div className="pt-2 flex justify-center">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by topic or title..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-emerald-600 shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {cat === 'all' ? 'All Categories' : cat}
          </button>
        ))}
      </div>

      {/* Articles List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(art => (
          <div
            key={art.id}
            onClick={() => onOpenArticle(art.slug)}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 hover:border-emerald-600/50 hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center space-x-2 text-xs text-stone-500 mb-3">
                <span className="font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {art.category}
                </span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{art.readTime}</span>
                </div>
              </div>

              <h2 className="font-bold text-stone-900 text-xl group-hover:text-emerald-900 transition leading-snug">
                {art.title}
              </h2>

              <p className="text-stone-600 text-xs sm:text-sm mt-3 leading-relaxed line-clamp-3">
                {art.summary}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-800 group-hover:text-emerald-700">
              <span>Read Full Article</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
