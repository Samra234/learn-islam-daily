import React, { useState } from 'react';
import { Quote, Share2, Bookmark, Copy, Check, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { QuoteItem } from '../data/islamicData';
import { ShareCardModal } from '../components/ShareCardModal';

export const IslamicQuotesPage: React.FC = () => {
  const { quotes, isBookmarked, toggleBookmark, language } = useApp();
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [shareModal, setShareModal] = useState<{
    isOpen: boolean;
    translation: string;
    reference: string;
    author: string;
  }>({
    isOpen: false,
    translation: '',
    reference: '',
    author: ''
  });

  const categories = [
    'all',
    'Faith & Tawakkul',
    'Patience (Sabr)',
    'Salah & Dhikr',
    'The Hereafter & Jannah',
    'Forgiveness & Repentance (Tawbah)'
  ];

  const filtered = quotes.filter(q => {
    const matchesCat = selectedTopic === 'all' || q.topic === selectedTopic;
    const matchesQuery = !searchQuery ||
      q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleCopy = async (item: QuoteItem) => {
    const text = `"${item.text}"\n\n— ${item.author}\nSource: ${item.source}\nVia Learn Islam Daily`;
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
        <span className="text-xs uppercase font-bold tracking-widest text-purple-900 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
          Wisdom of the Righteous Predecessors
        </span>
        <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900">
          {language === 'ur' ? 'اقوالِ صحابہ و اسلاف' : 'Authentic Islamic Quotes'}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Profound spiritual pearls from the Companions (Sahabah) and classical righteous scholars. Every quotation is strictly attributed to verified biographical references.
        </p>

        {/* Search */}
        <div className="pt-2 flex justify-center">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by quote, scholar, or book..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-300 rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-purple-600 shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedTopic(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
              selectedTopic === cat
                ? 'bg-purple-800 text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {cat === 'all' ? 'All Quotes' : cat}
          </button>
        ))}
      </div>

      {/* Quotes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-xs flex flex-col justify-between space-y-6 hover:border-purple-300 transition"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
                <Quote className="w-6 h-6 text-purple-400" />
                <span className="text-[11px] font-bold text-purple-900 bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
                  {item.topic}
                </span>
              </div>

              <blockquote className="text-stone-800 text-sm sm:text-base leading-relaxed italic mb-4 font-serif">
                "{item.text}"
              </blockquote>

              <p className="text-sm font-bold text-stone-900">
                — {item.author}
              </p>
              <p className="text-xs text-stone-500 mt-0.5">
                Verified Attribution: <span className="font-medium text-stone-600">{item.source}</span>
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-400 font-medium">Scholarly Wisdom</span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleCopy(item)}
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded transition"
                  title="Copy quote"
                >
                  {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>

                <button
                  onClick={() =>
                    toggleBookmark({
                      contentId: item.id,
                      contentType: 'quote',
                      title: `Quote by ${item.author}`,
                      reference: item.source
                    })
                  }
                  className={`p-1.5 rounded transition ${
                    isBookmarked(item.id) ? 'text-amber-600' : 'text-stone-400 hover:text-stone-700'
                  }`}
                  title="Bookmark"
                >
                  <Bookmark className="w-4 h-4" />
                </button>

                <button
                  onClick={() =>
                    setShareModal({
                      isOpen: true,
                      translation: item.text,
                      reference: `${item.author} (${item.source})`,
                      author: item.author
                    })
                  }
                  className="p-1.5 text-stone-400 hover:text-purple-800 rounded transition"
                  title="Share card"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ShareCardModal
        isOpen={shareModal.isOpen}
        onClose={() => setShareModal(prev => ({ ...prev, isOpen: false }))}
        translation={shareModal.translation}
        reference={shareModal.reference}
        type="Islamic Quote"
        author={shareModal.author}
      />
    </div>
  );
};
