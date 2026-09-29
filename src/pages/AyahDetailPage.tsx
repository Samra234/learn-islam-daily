import React, { useState, useEffect } from 'react';
import { ChevronLeft, Share2, Bookmark, Copy, Check, BookOpen, Sparkles, Compass } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ShareCardModal } from '../components/ShareCardModal';

interface AyahDetailPageProps {
  surahNumber: number;
  ayahNumber: number;
  onBack: () => void;
  onOpenAyah: (sNum: number, aNum: number) => void;
}

export const AyahDetailPage: React.FC<AyahDetailPageProps> = ({
  surahNumber,
  ayahNumber,
  onBack,
  onOpenAyah
}) => {
  const { ayahs, reminders, isBookmarked, toggleBookmark, addToHistory } = useApp();
  const [copied, setCopied] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  const ayah = ayahs.find(
    a => Number(a.surahNumber) === Number(surahNumber) && Number(a.ayahNumber) === Number(ayahNumber)
  ) || ayahs[0];

  useEffect(() => {
    if (ayah) {
      addToHistory(ayah.id, 'ayah', `Surah ${ayah.surah} (${ayah.surahNumber}:${ayah.ayahNumber})`);
    }
  }, [ayah]);

  const relatedAyahs = ayahs.filter(
    a => a.id !== ayah.id && (a.topic === ayah.topic || a.surahNumber === ayah.surahNumber)
  ).slice(0, 3);

  const relatedReminders = reminders.filter(
    r => r.topic.toLowerCase().includes(ayah.topic.toLowerCase().split(' ')[0])
  ).slice(0, 2);

  const handleCopy = async () => {
    const text = `${ayah.arabic}\n\nEnglish Translation: "${ayah.englishTranslation}"\n\nUrdu Translation: "${ayah.urduTranslation}"\n\nReference: Surah ${ayah.surah} (${ayah.surahNumber}:${ayah.ayahNumber}) • Learn Islam Daily`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Back button */}
      <button
        onClick={onBack}
        className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-emerald-800 hover:text-emerald-700 transition"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Ayahs</span>
      </button>

      {/* Main Ayah Presentation Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-md space-y-8">
        {/* Header Metadata */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Surah {ayah.surah} • Chapter {ayah.surahNumber}
            </span>
            <h1 className="text-xl sm:text-2xl font-cinzel font-bold text-stone-900 mt-2">
              Ayah {ayah.surahNumber}:{ayah.ayahNumber}
            </h1>
          </div>

          <div className="text-right">
            <span className="text-xs text-stone-500 block">Topic / Theme</span>
            <span className="text-xs font-semibold text-stone-800">{ayah.topic}</span>
          </div>
        </div>

        {/* 1. Verified Qur'an Arabic Text */}
        <div className="bg-stone-50/80 rounded-2xl p-8 border border-stone-200 text-center relative overflow-hidden">
          <div className="text-[10px] uppercase font-bold tracking-widest text-emerald-800 bg-white px-3 py-1 rounded-full border border-emerald-100 inline-block mb-6 shadow-2xs">
            Qur'anic Arabic Text (Al-Qur'an al-Kareem)
          </div>

          <p className="font-arabic text-2xl sm:text-4xl text-emerald-950 leading-loose sm:leading-relaxed selection:bg-amber-100" dir="rtl">
            {ayah.arabic}
          </p>

          {ayah.transliteration && (
            <p className="text-xs sm:text-sm text-stone-500 italic mt-6 max-w-xl mx-auto border-t border-stone-200/60 pt-4">
              {ayah.transliteration}
            </p>
          )}
        </div>

        {/* 2. Distinct Translations Container */}
        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-2">
              English Translation — Sahih International
            </span>
            <p className="text-stone-800 text-sm sm:text-base leading-relaxed">
              "{ayah.englishTranslation}"
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200" dir="rtl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-2 font-urdu">
              اردو ترجمہ — مولانا فتح محمد جالندھری
            </span>
            <p className="font-urdu text-stone-800 text-base sm:text-lg leading-loose">
              "{ayah.urduTranslation}"
            </p>
          </div>
        </div>

        {/* 3. Tafsir & Scholarly Explanation (Separated from personal reflection) */}
        {ayah.tafsirSummary && (
          <div className="p-5 rounded-2xl bg-teal-50/60 border border-teal-200/80 text-xs sm:text-sm text-stone-800 space-y-1">
            <span className="font-bold uppercase tracking-wider text-[11px] text-teal-900 block">
              Classical Tafsir Commentary
            </span>
            <p className="leading-relaxed text-stone-700">
              {ayah.tafsirSummary}
            </p>
          </div>
        )}

        {/* 4. Personal Reflection & Tadabbur */}
        <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-xs sm:text-sm text-stone-800 space-y-1">
          <span className="font-bold uppercase tracking-wider text-[11px] text-amber-900 block">
            Spiritual Tadabbur (Heart Reflection)
          </span>
          <p className="leading-relaxed text-stone-700">
            {ayah.reflection}
          </p>
          <p className="text-[10px] text-stone-400 italic pt-1">
            Note: Tadabbur reflections are intended to draw personal moral lessons and should not be construed as independent theological rulings.
          </p>
        </div>

        {/* Controls: Copy, Save, Share */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-stone-100 text-xs">
          <span className="text-stone-500">
            Source: {ayah.source}
          </span>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
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
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-lg border transition ${
                isBookmarked(ayah.id)
                  ? 'bg-amber-100 text-amber-800 border-amber-300 font-semibold'
                  : 'border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>{isBookmarked(ayah.id) ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={() => setShareModalOpen(true)}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-medium transition"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Card</span>
            </button>
          </div>
        </div>
      </div>

      {/* Related Ayahs */}
      {relatedAyahs.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-cinzel text-xl font-bold text-stone-900">
            Related Ayahs on {ayah.topic}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedAyahs.map(rel => (
              <div
                key={rel.id}
                onClick={() => onOpenAyah(rel.surahNumber, rel.ayahNumber)}
                className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-600/50 hover:shadow-xs transition cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded">
                    Surah {rel.surah} ({rel.surahNumber}:{rel.ayahNumber})
                  </span>
                  <p className="font-arabic text-base text-stone-800 text-right leading-loose my-2" dir="rtl">
                    {rel.arabic}
                  </p>
                  <p className="text-xs text-stone-600 line-clamp-2">
                    "{rel.englishTranslation}"
                  </p>
                </div>
                <span className="text-xs font-semibold text-emerald-800 mt-3 block">
                  Read Ayah →
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Reminders */}
      {relatedReminders.length > 0 && (
        <div className="p-6 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
          <h3 className="font-cinzel text-lg font-bold text-stone-900 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Spiritual Reminders for Reflection</span>
          </h3>

          <div className="space-y-3">
            {relatedReminders.map(rem => (
              <div key={rem.id} className="p-4 rounded-xl bg-white border border-stone-200 text-xs text-stone-700 space-y-1">
                <h4 className="font-bold text-stone-900">{rem.title}</h4>
                <p className="leading-relaxed">{rem.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <ShareCardModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        arabic={ayah.arabic}
        translation={ayah.englishTranslation}
        reference={`Surah ${ayah.surah} (${ayah.surahNumber}:${ayah.ayahNumber})`}
        type="Qur'an Ayah"
      />
    </div>
  );
};
