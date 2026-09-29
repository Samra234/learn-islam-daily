import React, { useState } from 'react';
import { Sparkles, Share2, Bookmark, Copy, Check, Heart, ShieldAlert } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ReminderItem } from '../data/islamicData';
import { ShareCardModal } from '../components/ShareCardModal';

export const MotivationPage: React.FC = () => {
  const { reminders, isBookmarked, toggleBookmark, language } = useApp();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [shareModal, setShareModal] = useState<{
    isOpen: boolean;
    title: string;
    translation: string;
    reference: string;
  }>({
    isOpen: false,
    title: '',
    translation: '',
    reference: ''
  });

  const handleCopy = async (item: ReminderItem) => {
    const text = `${item.title}\n\n${item.content}\n\nRelated Qur'an Ayah: "${item.relatedAyah}" (${item.reference})\nVia Learn Islam Daily • A Daily Reminder for the Heart`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Uplifting Spiritual Counsel
        </span>
        <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold text-stone-900">
          {language === 'ur' ? 'قلبی و ایمانی تسلی' : 'Motivational Islamic Reminders'}
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Gentle words for exhausted souls facing trials, self-doubt, or delayed prayers. Grounded in Islamic principles and paired with comforting Qur'anic verses.
        </p>

        {/* Distinct Separation Notice */}
        <div className="p-3 bg-stone-100 rounded-xl text-xs text-stone-600 flex items-center justify-center space-x-2 max-w-xl mx-auto">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Content Classification:</strong> The text in this section represents original inspirational reflections, distinctly separated from the referenced Qur'an verses and Prophetic hadith.
          </span>
        </div>
      </div>

      {/* Reminders List */}
      <div className="space-y-6">
        {reminders.map(item => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-100">
              <span className="font-bold text-amber-900 bg-amber-50 px-3 py-1 rounded-full text-xs border border-amber-200">
                {item.topic}
              </span>
              <span className="text-xs text-stone-400">Moral Reflection</span>
            </div>

            {/* Title & Motivational Content */}
            <div className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-bold text-stone-900">
                {language === 'ur' && item.titleUrdu ? item.titleUrdu : item.title}
              </h2>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed font-light">
                {language === 'ur' && item.contentUrdu ? item.contentUrdu : item.content}
              </p>
            </div>

            {/* Explicit Qur'an Anchor */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs sm:text-sm text-emerald-950 space-y-1">
              <span className="font-bold uppercase tracking-wider text-[10px] text-emerald-800 block">
                Foundational Qur'anic Anchor
              </span>
              <p className="italic">
                "{item.relatedAyah}"
              </p>
              <p className="font-semibold text-emerald-800 text-[11px] pt-1">
                — {item.reference}
              </p>
            </div>

            {/* Footer controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-100 text-xs">
              <span className="text-stone-400 font-medium">Learn Islam Daily</span>

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
                      contentType: 'reminder',
                      title: item.title,
                      reference: item.reference
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
                      title: item.title,
                      translation: `${item.title}: ${item.content}`,
                      reference: item.reference
                    })
                  }
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-medium transition"
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
        title={shareModal.title}
        translation={shareModal.translation}
        reference={shareModal.reference}
        type="Daily Reminder"
      />
    </div>
  );
};
