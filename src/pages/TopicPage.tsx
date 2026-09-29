import React, { useState } from 'react';
import { ChevronLeft, Share2, Bookmark, Copy, Check, BookOpen, Compass, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TOPIC_CATEGORIES } from '../data/islamicData';
import { ShareCardModal } from '../components/ShareCardModal';

interface TopicPageProps {
  slug: string;
  onBack: () => void;
  onOpenAyah: (surahNumber: number, ayahNumber: number) => void;
}

export const TopicPage: React.FC<TopicPageProps> = ({ slug, onBack, onOpenAyah }) => {
  const { ayahs, hadiths, duas, isBookmarked, toggleBookmark, language } = useApp();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [shareModal, setShareModal] = useState<{
    isOpen: boolean;
    arabic?: string;
    translation: string;
    reference: string;
    type: 'Qur\'an Ayah' | 'Hadith' | 'Dua';
  }>({
    isOpen: false,
    translation: '',
    reference: '',
    type: 'Qur\'an Ayah'
  });

  const topicInfo = TOPIC_CATEGORIES.find(t => t.slug === slug) || TOPIC_CATEGORIES[0];

  // Match ayahs for this topic
  const relevantAyahs = ayahs.filter(a =>
    a.topic.toLowerCase().includes(topicInfo.name.toLowerCase().split(' ')[0]) ||
    topicInfo.name.toLowerCase().includes(a.topic.toLowerCase().split(' ')[0])
  );

  // Match hadiths for this topic
  const relevantHadith = hadiths.filter(h =>
    h.topic.toLowerCase().includes(topicInfo.name.toLowerCase().split(' ')[0])
  );

  // Match duas for this topic
  const relevantDuas = duas.filter(d =>
    d.topic.toLowerCase().includes(topicInfo.name.toLowerCase().split(' ')[0])
  );

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-emerald-800 hover:text-emerald-700 transition"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Back to Topics</span>
      </button>

      {/* Topic Hero & Introduction */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm relative overflow-hidden">
        <div className="flex items-center space-x-2 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
          <Compass className="w-4 h-4" />
          <span>{topicInfo.group}</span>
        </div>

        <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-stone-900 mb-3">
          {language === 'ur' ? topicInfo.nameUrdu : topicInfo.name}
        </h1>

        <div className="space-y-4 pt-2 border-t border-stone-100 text-stone-700 text-sm sm:text-base leading-relaxed">
          <p>
            {language === 'ur' ? topicInfo.descriptionUrdu : topicInfo.description}
          </p>
          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs sm:text-sm text-emerald-950">
            <strong>Islamic Teaching:</strong> In the Qur'an and Sunnah, spiritual principles are deeply anchored in human reality. Whether confronting difficulty, seeking sustenance, or longing for forgiveness, the believer combines conscious effort with deep inner surrender to Allah's decree.
          </div>
        </div>
      </div>

      {/* Relevant Qur'an Ayahs */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900 flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-emerald-800" />
            <span>Qur'an Ayahs on {topicInfo.name}</span>
          </h2>
          <span className="text-xs text-stone-500 font-medium">
            {relevantAyahs.length} Verses Available
          </span>
        </div>

        {relevantAyahs.length === 0 ? (
          <div className="p-8 text-center text-stone-500 bg-white rounded-2xl border border-stone-200">
            Ayahs for this specific topic are being cataloged with verified translations. Browse the general library.
          </div>
        ) : (
          <div className="space-y-6">
            {relevantAyahs.map((ayah) => (
              <div
                key={ayah.id}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6"
              >
                {/* Header Reference */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-stone-100">
                  <span className="font-bold text-emerald-900 bg-emerald-50 px-3 py-1 rounded-full text-xs border border-emerald-200">
                    Surah {ayah.surah} • Ayah {ayah.surahNumber}:{ayah.ayahNumber}
                  </span>
                  <span className="text-xs text-stone-400">
                    Topic: {ayah.topic}
                  </span>
                </div>

                {/* Section 1: Pure Qur'an Arabic Text */}
                <div className="bg-stone-50/80 rounded-2xl p-6 border border-stone-100 text-center">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block mb-3">
                    Qur'anic Arabic Text
                  </span>
                  <p className="font-arabic text-2xl sm:text-3xl text-emerald-950 leading-loose" dir="rtl">
                    {ayah.arabic}
                  </p>
                  {ayah.transliteration && (
                    <p className="text-xs text-stone-500 italic mt-3 max-w-2xl mx-auto">
                      {ayah.transliteration}
                    </p>
                  )}
                </div>

                {/* Section 2: Verified Translations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
                    <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                      English Translation (Sahih International)
                    </span>
                    <p className="text-stone-800 text-sm leading-relaxed">
                      "{ayah.englishTranslation}"
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-100" dir="rtl">
                    <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1 font-urdu">
                      اردو ترجمہ (مولانا فتح محمد جالندھری)
                    </span>
                    <p className="font-urdu text-stone-800 text-base leading-loose">
                      "{ayah.urduTranslation}"
                    </p>
                  </div>
                </div>

                {/* Section 3: Distinct Reflection */}
                <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 text-xs text-stone-700">
                  <span className="font-bold text-amber-900 block mb-1 uppercase tracking-wider text-[10px]">
                    Spiritual Reflection & Tadabbur
                  </span>
                  <p className="leading-relaxed">
                    {ayah.reflection}
                  </p>
                </div>

                {/* Footer Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-stone-100 text-xs">
                  <button
                    onClick={() => onOpenAyah(ayah.surahNumber, ayah.ayahNumber)}
                    className="font-semibold text-emerald-800 hover:text-emerald-700 transition"
                  >
                    View In-Depth Ayah Page →
                  </button>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() =>
                        handleCopy(
                          ayah.id,
                          `${ayah.arabic}\n\n"${ayah.englishTranslation}"\n\n— Surah ${ayah.surah} (${ayah.surahNumber}:${ayah.ayahNumber})`
                        )
                      }
                      className="flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-600 transition"
                    >
                      {copiedId === ayah.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === ayah.id ? 'Copied' : 'Copy'}</span>
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
                      className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg border transition ${
                        isBookmarked(ayah.id)
                          ? 'bg-amber-100 text-amber-800 border-amber-300 font-semibold'
                          : 'border-stone-200 text-stone-600 hover:bg-stone-50'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>{isBookmarked(ayah.id) ? 'Saved' : 'Save'}</span>
                    </button>

                    <button
                      onClick={() =>
                        setShareModal({
                          isOpen: true,
                          arabic: ayah.arabic,
                          translation: ayah.englishTranslation,
                          reference: `Surah ${ayah.surah} (${ayah.surahNumber}:${ayah.ayahNumber})`,
                          type: 'Qur\'an Ayah'
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
        )}
      </div>

      {/* Relevant Hadith on Topic */}
      {relevantHadith.length > 0 && (
        <div className="space-y-4 pt-6">
          <h3 className="font-cinzel text-lg sm:text-xl font-bold text-stone-900">
            Authentic Hadith on {topicInfo.name}
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {relevantHadith.map(h => (
              <div key={h.id} className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded">
                    {h.collection} #{h.hadithNumber}
                  </span>
                  <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                    {h.grading}
                  </span>
                </div>
                <p className="font-arabic text-lg text-stone-900 text-right leading-loose" dir="rtl">
                  {h.arabic}
                </p>
                <p className="text-stone-700 text-sm italic">
                  "{h.english}"
                </p>
                <p className="text-xs text-stone-500 font-medium">
                  Source: {h.source}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Relevant Duas on Topic */}
      {relevantDuas.length > 0 && (
        <div className="space-y-4 pt-4">
          <h3 className="font-cinzel text-lg sm:text-xl font-bold text-stone-900">
            Supplications (Duas) for {topicInfo.name}
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {relevantDuas.map(d => (
              <div key={d.id} className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-800">{d.title}</span>
                  <span className="text-stone-500">{d.source}</span>
                </div>
                <p className="font-arabic text-xl text-emerald-950 text-right leading-loose" dir="rtl">
                  {d.arabic}
                </p>
                <p className="text-xs text-stone-500 italic">{d.transliteration}</p>
                <p className="text-stone-700 text-sm">"{d.english}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <ShareCardModal
        isOpen={shareModal.isOpen}
        onClose={() => setShareModal(prev => ({ ...prev, isOpen: false }))}
        arabic={shareModal.arabic}
        translation={shareModal.translation}
        reference={shareModal.reference}
        type={shareModal.type}
      />
    </div>
  );
};
