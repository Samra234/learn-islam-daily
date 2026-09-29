import React, { useState } from 'react';
import { Sparkles, Share2, Bookmark, Copy, Check, Calendar, Sun, Download, Heart, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ShareCardModal } from '../components/ShareCardModal';
import { getDailyItem, formatReminderDate, formatReminderDateUrdu, getDailyIndex } from '../utils/dailyReminder';

export const DailyReminderPage: React.FC = () => {
  const { ayahs, hadiths, duas, quotes, reminders, isBookmarked, toggleBookmark, language } = useApp();
  const [dayOffset, setDayOffset] = useState<number>(0);
  const [copiedAll, setCopiedAll] = useState(false);
  const [shareModal, setShareModal] = useState<{
    isOpen: boolean;
    arabic?: string;
    translation: string;
    reference: string;
    type: 'Qur\'an Ayah' | 'Hadith' | 'Dua' | 'Islamic Quote' | 'Daily Reminder';
  }>({
    isOpen: false,
    translation: '',
    reference: '',
    type: 'Daily Reminder'
  });

  const ayah = getDailyItem(ayahs, dayOffset);
  const hadith = getDailyItem(hadiths, dayOffset);
  const dua = getDailyItem(duas, dayOffset);
  const quote = getDailyItem(quotes, dayOffset);
  const reminder = reminders && reminders.length > 0 ? getDailyItem(reminders, dayOffset) : {
    id: 'default-rem',
    title: 'Keep Your Heart Attached to Allah',
    content: 'Every trial has an appointed end. Rely upon the Ever-Living Lord.',
    relatedAyah: 'And rely upon the Ever-Living who does not die.',
    reference: 'Surah Al-Furqan 25:58',
    topic: 'Tawakkul',
    published: true
  };

  const dayCycleNumber = getDailyIndex(30, dayOffset) + 1;
  const currentDateString = language === 'ur'
    ? formatReminderDateUrdu(new Date(), dayOffset)
    : formatReminderDate(new Date(), dayOffset);


  const copyFullDailyPack = async () => {
    const fullText = `🌟 LEARN ISLAM DAILY — ${currentDateString}
A Daily Reminder for the Heart

1. TODAY'S AYAH:
${ayah.arabic}
"${ayah.englishTranslation}"
— Surah ${ayah.surah} (${ayah.surahNumber}:${ayah.ayahNumber})

2. TODAY'S HADITH:
"${hadith.english}"
— ${hadith.source} (${hadith.grading})

3. TODAY'S DUA:
${dua.title}:
${dua.arabic}
"${dua.english}"
— ${dua.source}

4. TODAY'S ISLAMIC QUOTE:
"${quote.text}"
— ${quote.author} (${quote.source})

5. SPIRITUAL REMINDER:
${reminder.title}:
${reminder.content}
Related Ayah: "${reminder.relatedAyah}" (${reminder.reference})

Via Learn Islam Daily • https://learnislamdaily.org`;

    try {
      await navigator.clipboard.writeText(fullText);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2500);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 text-center space-y-4 shadow-xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-700 text-amber-300 text-xs font-semibold">
            <Calendar className="w-3.5 h-3.5" />
            <span>{currentDateString}</span>
          </div>

          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Day {dayCycleNumber} of 30 • Daily Rotation</span>
          </div>
        </div>

        <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-bold">
          {language === 'ur' ? 'آج کا مکمل اسلامی تحفہ' : "Today's Spiritual Reminder"}
        </h1>

        <p className="text-emerald-100 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
          {language === 'ur'
            ? 'ہر روز خودکار طور پر بدلنے والا قرآنی و نبوی پیغام: قرآنی آیت، مستند حدیث، نبوی دعا، سلف کا قول اور قلبی نصیحت۔'
            : 'Changes automatically every day at midnight with a verified Qur\'an ayah, authentic hadith, prophetic dua, scholarly quote, and heartfelt reminder.'}
        </p>

        {/* Day Navigator */}
        <div className="py-2 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setDayOffset(prev => prev - 1)}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 text-xs font-medium border border-emerald-600 transition"
            title="View previous day's reminder"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Day</span>
          </button>

          {dayOffset !== 0 && (
            <button
              onClick={() => setDayOffset(0)}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-semibold shadow-sm transition"
              title="Return to today"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Back to Today</span>
            </button>
          )}

          <button
            onClick={() => setDayOffset(prev => prev + 1)}
            className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-emerald-800/80 hover:bg-emerald-700 text-emerald-100 text-xs font-medium border border-emerald-600 transition"
            title="View next day's reminder"
          >
            <span>Next Day</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Action button: Copy All */}
        <div className="pt-1 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={copyFullDailyPack}
            className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs sm:text-sm shadow-md transition active:scale-95"
          >
            {copiedAll ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedAll ? 'Full Daily Pack Copied!' : 'Copy Entire Daily Reminder'}</span>
          </button>
        </div>
      </div>

      {/* 1. Today's Ayah */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            1. Today's Qur'an Ayah
          </span>
          <span className="text-xs font-semibold text-stone-700">
            Surah {ayah.surah} ({ayah.surahNumber}:{ayah.ayahNumber})
          </span>
        </div>

        <p className="font-arabic text-2xl text-emerald-950 leading-loose text-center py-2" dir="rtl">
          {ayah.arabic}
        </p>

        <p className="text-stone-800 text-sm sm:text-base leading-relaxed">
          "{ayah.englishTranslation}"
        </p>

        <p className="font-urdu text-stone-700 text-sm leading-loose text-right" dir="rtl">
          "{ayah.urduTranslation}"
        </p>

        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <span className="text-stone-500">Theme: {ayah.topic}</span>
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
            className="flex items-center space-x-1 text-emerald-800 hover:text-emerald-700 font-semibold"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Ayah Card</span>
          </button>
        </div>
      </div>

      {/* 2. Today's Hadith */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            2. Today's Authentic Hadith
          </span>
          <span className="text-xs font-semibold text-stone-700">
            {hadith.collection} #{hadith.hadithNumber} ({hadith.grading})
          </span>
        </div>

        <p className="font-arabic text-xl text-stone-900 leading-loose text-right" dir="rtl">
          {hadith.arabic}
        </p>

        <p className="text-stone-800 text-sm sm:text-base leading-relaxed italic">
          "{hadith.english}"
        </p>

        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <span className="text-stone-500">{hadith.source}</span>
          <button
            onClick={() =>
              setShareModal({
                isOpen: true,
                arabic: hadith.arabic,
                translation: hadith.english,
                reference: hadith.source,
                type: 'Hadith'
              })
            }
            className="flex items-center space-x-1 text-amber-800 hover:text-amber-700 font-semibold"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Hadith Card</span>
          </button>
        </div>
      </div>

      {/* 3. Today's Dua */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-900 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            3. Today's Dua & Dhikr
          </span>
          <span className="text-xs text-stone-500">{dua.occasion}</span>
        </div>

        <h3 className="font-bold text-stone-900 text-base">{dua.title}</h3>

        <p className="font-arabic text-xl text-emerald-950 leading-loose text-right" dir="rtl">
          {dua.arabic}
        </p>

        <p className="text-xs text-stone-500 italic">{dua.transliteration}</p>

        <p className="text-stone-800 text-sm">"{dua.english}"</p>

        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <span className="text-stone-500">Source: {dua.source}</span>
          <button
            onClick={() =>
              setShareModal({
                isOpen: true,
                arabic: dua.arabic,
                translation: dua.english,
                reference: dua.source,
                type: 'Dua'
              })
            }
            className="flex items-center space-x-1 text-teal-800 hover:text-teal-700 font-semibold"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Dua Card</span>
          </button>
        </div>
      </div>

      {/* 4. Today's Quote */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-900 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            4. Today's Islamic Quote
          </span>
          <span className="text-xs text-stone-500">{quote.topic}</span>
        </div>

        <blockquote className="text-stone-800 text-base italic font-serif leading-relaxed">
          "{quote.text}"
        </blockquote>

        <p className="text-xs font-bold text-stone-900">
          — {quote.author} ({quote.source})
        </p>

        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
          <span className="text-stone-400">Verified Citation</span>
          <button
            onClick={() =>
              setShareModal({
                isOpen: true,
                translation: quote.text,
                reference: `${quote.author} (${quote.source})`,
                type: 'Islamic Quote'
              })
            }
            className="flex items-center space-x-1 text-purple-800 hover:text-purple-700 font-semibold"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Quote Card</span>
          </button>
        </div>
      </div>

      {/* 5. Today's Motivational Reminder */}
      <div className="bg-gradient-to-br from-amber-50 to-emerald-50/50 rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-amber-100">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-100/70 px-3 py-1 rounded-full border border-amber-300">
            5. Today's Heart Reminder
          </span>
          <span className="text-xs text-stone-500 font-medium">Inspirational Reflection</span>
        </div>

        <h3 className="font-bold text-stone-900 text-lg">{reminder.title}</h3>
        <p className="text-stone-700 text-sm leading-relaxed">{reminder.content}</p>

        <div className="p-3 rounded-xl bg-white/80 border border-stone-200 text-xs">
          <span className="font-semibold text-emerald-900">Qur'anic Anchor: </span>
          <span className="text-stone-700 italic">"{reminder.relatedAyah}"</span>
          <span className="font-medium text-emerald-800 ml-1">({reminder.reference})</span>
        </div>

        <div className="pt-3 border-t border-amber-100 flex items-center justify-between text-xs">
          <span className="text-stone-500">Learn Islam Daily</span>
          <button
            onClick={() =>
              setShareModal({
                isOpen: true,
                translation: `${reminder.title}: ${reminder.content}`,
                reference: reminder.reference,
                type: 'Daily Reminder'
              })
            }
            className="flex items-center space-x-1 text-emerald-800 hover:text-emerald-700 font-semibold"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Reminder Card</span>
          </button>
        </div>
      </div>

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
