import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Share2,
  Bookmark,
  ChevronRight,
  Compass,
  Heart,
  ShieldCheck,
  Sunrise,
  Anchor,
  HeartHandshake,
  Award,
  Users,
  Copy,
  Check,
  ArrowRight,
  Clock,
  ExternalLink,
  Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TOPIC_CATEGORIES, AyahItem, HadithItem, DuaItem, QuoteItem } from '../data/islamicData';
import { ShareCardModal } from '../components/ShareCardModal';
import { getDailyItem, getDailyIndex, formatReminderDate } from '../utils/dailyReminder';

interface HomePageProps {
  onNavigate: (route: string) => void;
  onOpenAyah: (surahNumber: number, ayahNumber: number) => void;
  onOpenTopic: (slug: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenAyah, onOpenTopic }) => {
  const { ayahs, hadiths, duas, quotes, reminders, articles, isBookmarked, toggleBookmark, language } = useApp();

  const [shareModalState, setShareModalState] = useState<{
    isOpen: boolean;
    title?: string;
    arabic?: string;
    translation: string;
    reference: string;
    type: 'Qur\'an Ayah' | 'Hadith' | 'Dua' | 'Islamic Quote' | 'Daily Reminder';
    author?: string;
  }>({
    isOpen: false,
    translation: '',
    reference: '',
    type: 'Qur\'an Ayah'
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Daily selections rotating automatically every day at midnight
  const ayahOfDay = getDailyItem(ayahs);
  const hadithOfDay = getDailyItem(hadiths);
  const duaOfDay = getDailyItem(duas);
  const quoteOfDay = getDailyItem(quotes);
  const reminderOfDay = reminders && reminders.length > 0 ? getDailyItem(reminders) : reminders[0];
  const dayCycleNumber = getDailyIndex(30) + 1;


  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (e) {
      console.warn(e);
    }
  };

  const getTopicIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-700" />;
      case 'Anchor': return <Anchor className="w-5 h-5 text-teal-700" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-rose-700" />;
      case 'Sunrise': return <Sunrise className="w-5 h-5 text-amber-700" />;
      case 'Award': return <Award className="w-5 h-5 text-amber-600" />;
      case 'Users': return <Users className="w-5 h-5 text-blue-700" />;
      default: return <Compass className="w-5 h-5 text-emerald-700" />;
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-950 via-emerald-900 to-teal-950 text-white pt-14 pb-20 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-emerald-800/60 shadow-inner">
        {/* Subtle geometric background overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-amber-300 text-xs font-medium tracking-wide shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'روزانہ کا اسلامی سفر' : 'Learn Islam Daily • A Sanctuary for the Soul'}</span>
          </div>

          <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            {language === 'ur'
              ? 'اسلام سیکھیں، اللہ کو یاد رکھیں، اپنے دل کو مضبوط بنائیں۔'
              : 'Learn Islam. Remember Allah. Strengthen Your Heart.'}
          </h1>

          <p className="text-stone-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            {language === 'ur'
              ? 'موضوعاتی قرآنی آیات، مستند تراجم، احادیثِ نبویہ، دعائیں اور اقوالِ حکمت کے ذریعے روزانہ اپنے ایمان کو تازہ کیجیے۔'
              : 'Explore Qur\'an ayahs, verified translations, authentic Islamic reminders, duas, hadith, and meaningful quotes for daily reflection.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => onNavigate('quran')}
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-sm shadow-lg hover:shadow-amber-500/20 transition transform active:scale-95 flex items-center space-x-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>{language === 'ur' ? 'آیاتِ قرآنی دیکھیں' : 'Explore Ayahs'}</span>
            </button>

            <button
              onClick={() => onNavigate('daily-reminder')}
              className="px-6 py-3.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-700/90 text-emerald-100 font-semibold text-sm border border-emerald-600/60 shadow-md transition transform active:scale-95 flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{language === 'ur' ? 'آج کی نصیحت' : "Today's Reminder"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Large "Ayah of the Day" Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-600 via-amber-500 to-teal-600" />

          {/* Section Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-stone-100">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  {language === 'ur' ? 'آج کی آیتِ مبارکہ' : 'Ayah of the Day'}
                </span>
                <span className="text-[11px] font-medium text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Day {dayCycleNumber} of 30 • Refreshed Daily
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1.5">
                {language === 'ur' ? 'موضوع:' : 'Topic:'}{' '}
                <span className="font-semibold text-stone-700">{ayahOfDay.topic}</span>
              </p>
            </div>

            <div className="text-right">
              <span className="text-sm font-bold text-stone-800">
                Surah {ayahOfDay.surah}
              </span>
              <span className="text-xs text-stone-500 block">
                Ayah {ayahOfDay.surahNumber}:{ayahOfDay.ayahNumber}
              </span>
            </div>
          </div>

          {/* Arabic Ayah */}
          <div className="py-8 my-2 text-center bg-stone-50/70 rounded-2xl p-6 border border-stone-100">
            <p className="font-arabic text-2xl sm:text-3xl md:text-4xl text-emerald-950 leading-loose sm:leading-relaxed" dir="rtl">
              {ayahOfDay.arabic}
            </p>
            {ayahOfDay.transliteration && (
              <p className="text-xs sm:text-sm text-stone-500 italic mt-4 max-w-2xl mx-auto">
                {ayahOfDay.transliteration}
              </p>
            )}
          </div>

          {/* English & Urdu Translations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">
                English Translation (Sahih International)
              </p>
              <p className="text-stone-800 text-sm sm:text-base leading-relaxed">
                "{ayahOfDay.englishTranslation}"
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-100" dir="rtl">
              <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1 font-urdu">
                اردو ترجمہ (مولانا فتح محمد جالندھری)
              </p>
              <p className="font-urdu text-stone-800 text-base sm:text-lg leading-loose">
                "{ayahOfDay.urduTranslation}"
              </p>
            </div>
          </div>

          {/* Separation: Reflection Notice */}
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-950 space-y-1">
            <span className="font-bold uppercase tracking-wider text-[10px] text-amber-800 block">
              Spiritual Reflection (Tadabbur)
            </span>
            <p className="leading-relaxed text-stone-700">
              {ayahOfDay.reflection}
            </p>
          </div>

          {/* Actions: Read More, Share, Save */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-6 mt-6 border-t border-stone-100 text-xs">
            <button
              onClick={() => onOpenAyah(ayahOfDay.surahNumber, ayahOfDay.ayahNumber)}
              className="inline-flex items-center space-x-1.5 font-semibold text-emerald-800 hover:text-emerald-700 transition"
            >
              <span>{language === 'ur' ? 'مکمل آیت اور تفسیر دیکھیں' : 'Read Full Ayah & Reflection'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2">
              <button
                onClick={() =>
                  toggleBookmark({
                    contentId: ayahOfDay.id,
                    contentType: 'ayah',
                    title: `Surah ${ayahOfDay.surah} (${ayahOfDay.surahNumber}:${ayahOfDay.ayahNumber})`,
                    reference: ayahOfDay.source
                  })
                }
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg border transition ${
                  isBookmarked(ayahOfDay.id)
                    ? 'bg-amber-100 text-amber-800 border-amber-300 font-semibold'
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{isBookmarked(ayahOfDay.id) ? 'Saved' : 'Save'}</span>
              </button>

              <button
                onClick={() =>
                  setShareModalState({
                    isOpen: true,
                    arabic: ayahOfDay.arabic,
                    translation: ayahOfDay.englishTranslation,
                    reference: `Surah ${ayahOfDay.surah} (${ayahOfDay.surahNumber}:${ayahOfDay.ayahNumber})`,
                    type: 'Qur\'an Ayah'
                  })
                }
                className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white font-medium transition"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Card</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Explore Topics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            {language === 'ur' ? 'قرآنی موضوعات' : 'Curated Library'}
          </span>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-900">
            {language === 'ur' ? 'موضوع کے لحاظ سے قرآنی آیات' : "Explore Qur'an Ayahs by Topic"}
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm max-w-xl mx-auto">
            {language === 'ur'
              ? 'اپنی زندگی کے مختلف حالات کے لیے قرآنی رہنمائی تلاش کریں۔'
              : 'Timeless guidance organized for the circumstances and questions of modern life.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {TOPIC_CATEGORIES.map((topic) => (
            <div
              key={topic.id}
              onClick={() => onOpenTopic(topic.slug)}
              className="p-5 rounded-2xl bg-white border border-stone-200 hover:border-emerald-600/60 hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-stone-100 group-hover:bg-emerald-50 transition">
                    {getTopicIcon(topic.iconName)}
                  </div>
                  <span className="text-[11px] font-semibold text-stone-400 bg-stone-50 px-2 py-0.5 rounded-full">
                    {topic.ayahCount} Ayahs
                  </span>
                </div>

                <h3 className="font-bold text-stone-800 text-base group-hover:text-emerald-900 transition">
                  {language === 'ur' ? topic.nameUrdu : topic.name}
                </h3>
                <p className="text-stone-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                  {language === 'ur' ? topic.descriptionUrdu : topic.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-800 group-hover:text-emerald-700">
                <span>{language === 'ur' ? 'آیات پڑھیں' : 'Browse Ayahs'}</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Triad of Daily Spiritual Treasures (Hadith, Dua, Quote) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Hadith of the Day */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
                <span className="text-[11px] font-bold tracking-wider uppercase text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  {language === 'ur' ? 'حدیثِ مبارکہ' : 'Hadith of the Day'}
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {hadithOfDay.grading}
                </span>
              </div>

              <p className="font-arabic text-base sm:text-lg text-stone-800 leading-loose mb-3 text-right" dir="rtl">
                {hadithOfDay.arabic}
              </p>

              <p className="text-stone-700 text-xs sm:text-sm leading-relaxed italic mb-3">
                "{hadithOfDay.english}"
              </p>

              <p className="text-[11px] font-semibold text-stone-500">
                Reference: {hadithOfDay.source}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-stone-100">
              <button
                onClick={() => onNavigate('hadith')}
                className="text-xs font-semibold text-emerald-800 hover:text-emerald-700 flex items-center space-x-1"
              >
                <span>More Hadith</span>
                <ChevronRight className="w-3 h-3" />
              </button>

              <div className="flex items-center space-x-1">
                <button
                  onClick={() =>
                    handleCopy(
                      hadithOfDay.id,
                      `"${hadithOfDay.english}" — ${hadithOfDay.source}`
                    )
                  }
                  className="p-1.5 text-stone-400 hover:text-stone-700 rounded transition"
                  title="Copy text"
                >
                  {copiedId === hadithOfDay.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
                <button
                  onClick={() =>
                    setShareModalState({
                      isOpen: true,
                      arabic: hadithOfDay.arabic,
                      translation: hadithOfDay.english,
                      reference: hadithOfDay.source,
                      type: 'Hadith'
                    })
                  }
                  className="p-1.5 text-stone-400 hover:text-emerald-800 rounded transition"
                  title="Share card"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Dua of the Day */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
                <span className="text-[11px] font-bold tracking-wider uppercase text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                  {language === 'ur' ? 'مسنون دعا' : 'Dua of the Day'}
                </span>
                <span className="text-[10px] text-stone-500">{duaOfDay.occasion}</span>
              </div>

              <h4 className="text-sm font-bold text-stone-800 mb-2">
                {language === 'ur' && duaOfDay.titleUrdu ? duaOfDay.titleUrdu : duaOfDay.title}
              </h4>

              <p className="font-arabic text-base sm:text-lg text-emerald-950 leading-loose mb-2 text-right" dir="rtl">
                {duaOfDay.arabic}
              </p>

              <p className="text-[11px] text-stone-500 italic mb-2">
                {duaOfDay.transliteration}
              </p>

              <p className="text-stone-700 text-xs leading-relaxed mb-3">
                "{duaOfDay.english}"
              </p>

              <p className="text-[11px] font-semibold text-stone-500">
                Source: {duaOfDay.source}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-stone-100">
              <button
                onClick={() => onNavigate('duas')}
                className="text-xs font-semibold text-teal-800 hover:text-teal-700 flex items-center space-x-1"
              >
                <span>Explore Duas</span>
                <ChevronRight className="w-3 h-3" />
              </button>

              <div className="flex items-center space-x-1">
                <button
                  onClick={() =>
                    setShareModalState({
                      isOpen: true,
                      arabic: duaOfDay.arabic,
                      translation: duaOfDay.english,
                      reference: duaOfDay.source,
                      type: 'Dua'
                    })
                  }
                  className="p-1.5 text-stone-400 hover:text-teal-800 rounded transition"
                  title="Share card"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Islamic Quote of the Day */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
                <span className="text-[11px] font-bold tracking-wider uppercase text-purple-800 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200">
                  {language === 'ur' ? 'قولِ حکمت' : 'Islamic Quote'}
                </span>
                <span className="text-[10px] text-stone-500">{quoteOfDay.topic}</span>
              </div>

              <blockquote className="text-stone-800 text-sm sm:text-base leading-relaxed italic mb-4 font-serif">
                "{quoteOfDay.text}"
              </blockquote>

              <p className="text-xs font-bold text-stone-900">
                — {quoteOfDay.author}
              </p>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Verified Source: {quoteOfDay.source}
              </p>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-stone-100">
              <button
                onClick={() => onNavigate('quotes')}
                className="text-xs font-semibold text-purple-800 hover:text-purple-700 flex items-center space-x-1"
              >
                <span>More Quotes</span>
                <ChevronRight className="w-3 h-3" />
              </button>

              <div className="flex items-center space-x-1">
                <button
                  onClick={() =>
                    setShareModalState({
                      isOpen: true,
                      translation: quoteOfDay.text,
                      reference: `${quoteOfDay.author} (${quoteOfDay.source})`,
                      type: 'Islamic Quote',
                      author: quoteOfDay.author
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
        </div>
      </section>

      {/* 5. Motivational Reminder Spotlight */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-br from-amber-50 via-stone-50 to-emerald-50/40 rounded-3xl p-6 sm:p-10 border border-amber-200 shadow-sm relative">
          <div className="flex items-center space-x-2 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>{language === 'ur' ? 'قلبی تسلی و حوصلہ افزائی' : 'Motivational Reminder for the Heart'}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-stone-900 mb-3">
            {language === 'ur' && reminderOfDay.titleUrdu ? reminderOfDay.titleUrdu : reminderOfDay.title}
          </h3>

          <p className="text-stone-700 text-sm sm:text-base leading-relaxed mb-6 font-light">
            {language === 'ur' && reminderOfDay.contentUrdu ? reminderOfDay.contentUrdu : reminderOfDay.content}
          </p>

          <div className="p-4 rounded-xl bg-white border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-semibold text-stone-800 block">Related Qur'an Ayah:</span>
              <span className="text-stone-600 italic">"{reminderOfDay.relatedAyah}"</span>
              <span className="text-amber-800 font-medium block mt-0.5">— {reminderOfDay.reference}</span>
            </div>

            <button
              onClick={() => onNavigate('motivation')}
              className="px-4 py-2 rounded-lg bg-emerald-800 text-white font-medium hover:bg-emerald-700 transition shrink-0"
            >
              Read More Reminders
            </button>
          </div>
        </div>
      </section>

      {/* 6. Popular Ayahs Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-900">
              {language === 'ur' ? 'منتخب قرآنی آیات' : 'Popular Reflections from the Qur\'an'}
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm mt-1">
              Verses that bring immediate tranquility to anxiety, grief, and fatigue.
            </p>
          </div>

          <button
            onClick={() => onNavigate('quran')}
            className="text-xs sm:text-sm font-semibold text-emerald-800 hover:text-emerald-700 flex items-center space-x-1"
          >
            <span>View All Ayahs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ayahs.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 border border-stone-200 hover:border-emerald-600/40 transition shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-bold text-emerald-900 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Surah {item.surah} ({item.surahNumber}:{item.ayahNumber})
                  </span>
                  <span className="text-stone-500">{item.topic}</span>
                </div>

                <p className="font-arabic text-xl sm:text-2xl text-emerald-950 text-right leading-loose mb-3" dir="rtl">
                  {item.arabic}
                </p>

                <p className="text-stone-800 text-xs sm:text-sm leading-relaxed mb-3">
                  "{item.englishTranslation}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => onOpenAyah(item.surahNumber, item.ayahNumber)}
                  className="font-semibold text-emerald-800 hover:text-emerald-700 flex items-center space-x-1"
                >
                  <span>Explore Verse</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() =>
                      toggleBookmark({
                        contentId: item.id,
                        contentType: 'ayah',
                        title: `Surah ${item.surah} (${item.surahNumber}:${item.ayahNumber})`,
                        reference: item.source
                      })
                    }
                    className={`p-1.5 rounded transition ${
                      isBookmarked(item.id) ? 'text-amber-600' : 'text-stone-400 hover:text-stone-700'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() =>
                      setShareModalState({
                        isOpen: true,
                        arabic: item.arabic,
                        translation: item.englishTranslation,
                        reference: `Surah ${item.surah} (${item.surahNumber}:${item.ayahNumber})`,
                        type: 'Qur\'an Ayah'
                      })
                    }
                    className="p-1.5 text-stone-400 hover:text-emerald-800 rounded transition"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Latest Articles Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Educational Articles
            </span>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-900 mt-2">
              Deepen Your Islamic Understanding
            </h2>
          </div>

          <button
            onClick={() => onNavigate('articles')}
            className="text-xs sm:text-sm font-semibold text-emerald-800 hover:text-emerald-700 flex items-center space-x-1"
          >
            <span>All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.slice(0, 2).map((art) => (
            <div
              key={art.id}
              onClick={() => onNavigate(`article-${art.slug}`)}
              className="bg-white rounded-2xl p-6 border border-stone-200 hover:border-emerald-600/50 hover:shadow-md transition cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-2 text-xs text-stone-500 mb-2">
                  <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    {art.category}
                  </span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{art.readTime}</span>
                  </div>
                </div>

                <h3 className="font-bold text-stone-900 text-lg group-hover:text-emerald-900 transition leading-snug">
                  {art.title}
                </h3>

                <p className="text-stone-600 text-xs sm:text-sm mt-2 line-clamp-3 leading-relaxed">
                  {art.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-800">
                <span>Read Full Article</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Daily Reminder Newsletter / Quiet Sign-up Box */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-xl relative overflow-hidden">
          <div className="w-12 h-12 rounded-full bg-emerald-800 text-amber-300 flex items-center justify-center mx-auto mb-2">
            <Sparkles className="w-6 h-6" />
          </div>

          <h3 className="font-cinzel text-2xl sm:text-3xl font-bold">
            Receive One Heartfelt Reminder Each Morning
          </h3>

          <p className="text-emerald-100 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            No spam, no promotional clutter. Only one verified Qur'an ayah, authentic hadith, or dua delivered to bring peace to your day.
          </p>

          {newsletterSubscribed ? (
            <div className="p-4 rounded-xl bg-emerald-800/90 border border-emerald-700 text-emerald-100 text-sm max-w-md mx-auto animate-in fade-in">
              <Check className="w-5 h-5 text-amber-300 mx-auto mb-1" />
              <span>JazakAllahu Khayran! You are subscribed to daily morning spiritual reminders.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 px-4 py-3 rounded-xl bg-emerald-950/80 border border-emerald-700 text-white placeholder-emerald-400 text-xs sm:text-sm focus:outline-hidden focus:border-amber-400"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs sm:text-sm transition active:scale-95"
              >
                Subscribe
              </button>
            </form>
          )}

          <p className="text-[11px] text-emerald-300/80 pt-2">
            Free forever. We respect your privacy and never sell or share contact details.
          </p>
        </div>
      </section>

      {/* Share Modal */}
      <ShareCardModal
        isOpen={shareModalState.isOpen}
        onClose={() => setShareModalState(prev => ({ ...prev, isOpen: false }))}
        title={shareModalState.title}
        arabic={shareModalState.arabic}
        translation={shareModalState.translation}
        reference={shareModalState.reference}
        type={shareModalState.type}
        author={shareModalState.author}
      />
    </div>
  );
};
