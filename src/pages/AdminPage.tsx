import React, { useState } from 'react';
import { Shield, PlusCircle, CheckCircle2, AlertCircle, BookOpen, Layers } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminPage: React.FC = () => {
  const { user, isAdmin, addAyah, addHadith, addDua, addQuote, addReminder, addArticle, ayahs, hadiths, duas, quotes, reminders, articles } = useApp();
  const [activeTab, setActiveTab] = useState<'ayah' | 'hadith' | 'dua' | 'quote' | 'reminder' | 'article'>('ayah');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form States
  const [ayahForm, setAyahForm] = useState({
    surah: '',
    surahNumber: 1,
    ayahNumber: 1,
    arabic: '',
    transliteration: '',
    englishTranslation: '',
    urduTranslation: '',
    topic: 'Trust in Allah (Tawakkul)',
    reflection: '',
    source: ''
  });

  const [hadithForm, setHadithForm] = useState({
    arabic: '',
    english: '',
    urdu: '',
    collection: 'Sahih Bukhari',
    hadithNumber: '',
    grading: 'Sahih' as 'Sahih' | 'Hasan' | 'Hasan Sahih',
    narrator: '',
    topic: 'Good Character (Husn al-Khuluq)',
    source: ''
  });

  const [duaForm, setDuaForm] = useState({
    title: '',
    titleUrdu: '',
    arabic: '',
    transliteration: '',
    english: '',
    urdu: '',
    source: '',
    topic: 'Anxiety & Relief in Hardship',
    occasion: ''
  });

  const [quoteForm, setQuoteForm] = useState({
    text: '',
    author: '',
    source: '',
    topic: 'Faith & Tawakkul'
  });

  const [reminderForm, setReminderForm] = useState({
    title: '',
    titleUrdu: '',
    content: '',
    contentUrdu: '',
    relatedAyah: '',
    reference: '',
    topic: 'Anxiety & Relief in Hardship'
  });

  const [articleForm, setArticleForm] = useState({
    title: '',
    slug: '',
    summary: '',
    category: 'Faith & Tawakkul',
    readTime: '5 min read',
    content: '',
    references: ''
  });

  if (!user || !isAdmin) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <Shield className="w-12 h-12 text-stone-400 mx-auto" />
        <h1 className="font-cinzel text-2xl font-bold text-stone-900">Administrator Access Required</h1>
        <p className="text-stone-600 text-sm">
          You must be logged in as the designated administrator (samramuhammadsiddique831@gmail.com) to access the educational content management portal.
        </p>
      </div>
    );
  }

  const handleAyahSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addAyah({
        surah: ayahForm.surah,
        surahNumber: Number(ayahForm.surahNumber),
        ayahNumber: Number(ayahForm.ayahNumber),
        arabic: ayahForm.arabic,
        transliteration: ayahForm.transliteration,
        englishTranslation: ayahForm.englishTranslation,
        urduTranslation: ayahForm.urduTranslation,
        topic: ayahForm.topic,
        reflection: ayahForm.reflection,
        source: ayahForm.source || `Surah ${ayahForm.surah} (${ayahForm.surahNumber}:${ayahForm.ayahNumber})`,
        published: true
      });
      setStatusMessage({ type: 'success', text: 'Ayah published successfully to Firestore!' });
      setAyahForm({
        surah: '',
        surahNumber: 1,
        ayahNumber: 1,
        arabic: '',
        transliteration: '',
        englishTranslation: '',
        urduTranslation: '',
        topic: 'Trust in Allah (Tawakkul)',
        reflection: '',
        source: ''
      });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to save ayah' });
    }
  };

  const handleHadithSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addHadith({
        arabic: hadithForm.arabic,
        english: hadithForm.english,
        urdu: hadithForm.urdu,
        collection: hadithForm.collection,
        hadithNumber: hadithForm.hadithNumber,
        grading: hadithForm.grading,
        narrator: hadithForm.narrator,
        topic: hadithForm.topic,
        source: hadithForm.source || `${hadithForm.collection} #${hadithForm.hadithNumber}`,
        published: true
      });
      setStatusMessage({ type: 'success', text: 'Hadith published successfully to Firestore!' });
      setHadithForm({
        arabic: '',
        english: '',
        urdu: '',
        collection: 'Sahih Bukhari',
        hadithNumber: '',
        grading: 'Sahih',
        narrator: '',
        topic: 'Good Character (Husn al-Khuluq)',
        source: ''
      });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to save hadith' });
    }
  };

  const handleDuaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDua({
        title: duaForm.title,
        titleUrdu: duaForm.titleUrdu,
        arabic: duaForm.arabic,
        transliteration: duaForm.transliteration,
        english: duaForm.english,
        urdu: duaForm.urdu,
        source: duaForm.source,
        topic: duaForm.topic,
        occasion: duaForm.occasion,
        published: true
      });
      setStatusMessage({ type: 'success', text: 'Dua published successfully to Firestore!' });
      setDuaForm({
        title: '',
        titleUrdu: '',
        arabic: '',
        transliteration: '',
        english: '',
        urdu: '',
        source: '',
        topic: 'Anxiety & Relief in Hardship',
        occasion: ''
      });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to save dua' });
    }
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addQuote({
        text: quoteForm.text,
        author: quoteForm.author,
        source: quoteForm.source,
        topic: quoteForm.topic,
        published: true
      });
      setStatusMessage({ type: 'success', text: 'Quote published successfully to Firestore!' });
      setQuoteForm({ text: '', author: '', source: '', topic: 'Faith & Tawakkul' });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to save quote' });
    }
  };

  const handleReminderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addReminder({
        title: reminderForm.title,
        titleUrdu: reminderForm.titleUrdu,
        content: reminderForm.content,
        contentUrdu: reminderForm.contentUrdu,
        relatedAyah: reminderForm.relatedAyah,
        reference: reminderForm.reference,
        topic: reminderForm.topic,
        published: true
      });
      setStatusMessage({ type: 'success', text: 'Reminder published successfully to Firestore!' });
      setReminderForm({
        title: '',
        titleUrdu: '',
        content: '',
        contentUrdu: '',
        relatedAyah: '',
        reference: '',
        topic: 'Anxiety & Relief in Hardship'
      });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to save reminder' });
    }
  };

  const handleArticleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addArticle({
        title: articleForm.title,
        slug: articleForm.slug || articleForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        summary: articleForm.summary,
        category: articleForm.category,
        readTime: articleForm.readTime,
        content: articleForm.content,
        references: articleForm.references.split('\n').filter(r => r.trim().length > 0),
        published: true,
        createdAt: new Date().toISOString().split('T')[0]
      });
      setStatusMessage({ type: 'success', text: 'Article published successfully to Firestore!' });
      setArticleForm({
        title: '',
        slug: '',
        summary: '',
        category: 'Faith & Tawakkul',
        readTime: '5 min read',
        content: '',
        references: ''
      });
    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to save article' });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="bg-amber-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-amber-900 shadow-md">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4" />
            <span>Authenticated Administrator Console</span>
          </div>
          <h1 className="font-cinzel text-2xl font-bold">Content Publishing & Verification</h1>
          <p className="text-amber-200/80 text-xs mt-1">
            Logged in as: <span className="font-medium text-white">{user.email}</span>
          </p>
        </div>

        {/* Content Counts */}
        <div className="flex items-center space-x-4 text-xs text-amber-200/70 border-t sm:border-t-0 sm:border-l border-amber-800/80 pt-3 sm:pt-0 sm:pl-6">
          <div>
            <span className="block font-bold text-white text-base">{ayahs.length}</span>
            <span>Ayahs</span>
          </div>
          <div>
            <span className="block font-bold text-white text-base">{hadiths.length}</span>
            <span>Hadith</span>
          </div>
          <div>
            <span className="block font-bold text-white text-base">{duas.length}</span>
            <span>Duas</span>
          </div>
          <div>
            <span className="block font-bold text-white text-base">{articles.length}</span>
            <span>Articles</span>
          </div>
        </div>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-xl flex items-center space-x-2 text-xs font-semibold ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
              : 'bg-red-50 text-red-900 border border-red-200'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-stone-200">
        {[
          { id: 'ayah', label: "Add Qur'an Ayah" },
          { id: 'hadith', label: 'Add Hadith' },
          { id: 'dua', label: 'Add Dua' },
          { id: 'quote', label: 'Add Islamic Quote' },
          { id: 'reminder', label: 'Add Reminder' },
          { id: 'article', label: 'Add Article' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as any);
              setStatusMessage(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              activeTab === tab.id
                ? 'bg-emerald-800 text-white shadow-xs'
                : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Form Area */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm">
        {/* Ayah Form */}
        {activeTab === 'ayah' && (
          <form onSubmit={handleAyahSubmit} className="space-y-4">
            <h2 className="font-cinzel text-xl font-bold text-stone-900 border-b border-stone-100 pb-3">
              Add Verified Qur'an Ayah
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Surah Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Al-Baqarah"
                  value={ayahForm.surah}
                  onChange={e => setAyahForm({ ...ayahForm, surah: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Surah Number *</label>
                <input
                  type="number"
                  required
                  min={1}
                  max={114}
                  value={ayahForm.surahNumber}
                  onChange={e => setAyahForm({ ...ayahForm, surahNumber: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Ayah Number *</label>
                <input
                  type="number"
                  required
                  min={1}
                  value={ayahForm.ayahNumber}
                  onChange={e => setAyahForm({ ...ayahForm, ayahNumber: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Arabic Text (Exact Quranic Text) *</label>
              <textarea
                required
                rows={3}
                dir="rtl"
                placeholder="أدخل النص القرآني الشريف..."
                value={ayahForm.arabic}
                onChange={e => setAyahForm({ ...ayahForm, arabic: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm font-arabic"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Transliteration (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Inna ma'al-'usri yusra..."
                value={ayahForm.transliteration}
                onChange={e => setAyahForm({ ...ayahForm, transliteration: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">English Translation (Sahih Int.) *</label>
                <textarea
                  required
                  rows={3}
                  value={ayahForm.englishTranslation}
                  onChange={e => setAyahForm({ ...ayahForm, englishTranslation: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Urdu Translation *</label>
                <textarea
                  required
                  rows={3}
                  dir="rtl"
                  value={ayahForm.urduTranslation}
                  onChange={e => setAyahForm({ ...ayahForm, urduTranslation: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm font-urdu"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Topic *</label>
                <input
                  type="text"
                  required
                  value={ayahForm.topic}
                  onChange={e => setAyahForm({ ...ayahForm, topic: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Source / Citation</label>
                <input
                  type="text"
                  placeholder="e.g. Sahih International / Jalandhri"
                  value={ayahForm.source}
                  onChange={e => setAyahForm({ ...ayahForm, source: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Spiritual Reflection (Tadabbur)</label>
              <textarea
                rows={2}
                placeholder="Personal or moral reflection to encourage reader..."
                value={ayahForm.reflection}
                onChange={e => setAyahForm({ ...ayahForm, reflection: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-800 text-white font-semibold text-xs sm:text-sm hover:bg-emerald-700 transition"
            >
              Publish Ayah
            </button>
          </form>
        )}

        {/* Hadith Form */}
        {activeTab === 'hadith' && (
          <form onSubmit={handleHadithSubmit} className="space-y-4">
            <h2 className="font-cinzel text-xl font-bold text-stone-900 border-b border-stone-100 pb-3">
              Add Authentic Hadith
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Collection *</label>
                <input
                  type="text"
                  required
                  value={hadithForm.collection}
                  onChange={e => setHadithForm({ ...hadithForm, collection: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Hadith Number *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2699"
                  value={hadithForm.hadithNumber}
                  onChange={e => setHadithForm({ ...hadithForm, hadithNumber: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Authenticity Grade *</label>
                <select
                  value={hadithForm.grading}
                  onChange={e => setHadithForm({ ...hadithForm, grading: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm bg-white"
                >
                  <option value="Sahih">Sahih</option>
                  <option value="Hasan">Hasan</option>
                  <option value="Hasan Sahih">Hasan Sahih</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Arabic Text</label>
              <textarea
                rows={3}
                dir="rtl"
                value={hadithForm.arabic}
                onChange={e => setHadithForm({ ...hadithForm, arabic: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm font-arabic"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">English Translation *</label>
                <textarea
                  required
                  rows={3}
                  value={hadithForm.english}
                  onChange={e => setHadithForm({ ...hadithForm, english: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Urdu Translation</label>
                <textarea
                  rows={3}
                  dir="rtl"
                  value={hadithForm.urdu}
                  onChange={e => setHadithForm({ ...hadithForm, urdu: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm font-urdu"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-amber-800 text-white font-semibold text-xs sm:text-sm hover:bg-amber-700 transition"
            >
              Publish Hadith
            </button>
          </form>
        )}

        {/* Dua Form */}
        {activeTab === 'dua' && (
          <form onSubmit={handleDuaSubmit} className="space-y-4">
            <h2 className="font-cinzel text-xl font-bold text-stone-900 border-b border-stone-100 pb-3">
              Add Supplication (Dua)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Dua Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dua for Protection"
                  value={duaForm.title}
                  onChange={e => setDuaForm({ ...duaForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Source / Reference *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sahih Bukhari 2893 / Hisnul Muslim"
                  value={duaForm.source}
                  onChange={e => setDuaForm({ ...duaForm, source: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Arabic Text *</label>
              <textarea
                required
                rows={3}
                dir="rtl"
                value={duaForm.arabic}
                onChange={e => setDuaForm({ ...duaForm, arabic: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-sm font-arabic"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Transliteration *</label>
              <input
                type="text"
                required
                value={duaForm.transliteration}
                onChange={e => setDuaForm({ ...duaForm, transliteration: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">English Translation *</label>
                <textarea
                  required
                  rows={2}
                  value={duaForm.english}
                  onChange={e => setDuaForm({ ...duaForm, english: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Urdu Translation</label>
                <textarea
                  rows={2}
                  dir="rtl"
                  value={duaForm.urdu}
                  onChange={e => setDuaForm({ ...duaForm, urdu: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm font-urdu"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-teal-800 text-white font-semibold text-xs sm:text-sm hover:bg-teal-700 transition"
            >
              Publish Dua
            </button>
          </form>
        )}

        {/* Quote Form */}
        {activeTab === 'quote' && (
          <form onSubmit={handleQuoteSubmit} className="space-y-4">
            <h2 className="font-cinzel text-xl font-bold text-stone-900 border-b border-stone-100 pb-3">
              Add Verified Islamic Quote
            </h2>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Quote Text *</label>
              <textarea
                required
                rows={3}
                value={quoteForm.text}
                onChange={e => setQuoteForm({ ...quoteForm, text: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm font-serif italic"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Author (Sahabi or Scholar) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Umar ibn al-Khattab (RA)"
                  value={quoteForm.author}
                  onChange={e => setQuoteForm({ ...quoteForm, author: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Verified Source / Book *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Al-Mustadrak by Al-Hakim (or 'Source: Unknown')"
                  value={quoteForm.source}
                  onChange={e => setQuoteForm({ ...quoteForm, source: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-purple-800 text-white font-semibold text-xs sm:text-sm hover:bg-purple-700 transition"
            >
              Publish Quote
            </button>
          </form>
        )}

        {/* Reminder Form */}
        {activeTab === 'reminder' && (
          <form onSubmit={handleReminderSubmit} className="space-y-4">
            <h2 className="font-cinzel text-xl font-bold text-stone-900 border-b border-stone-100 pb-3">
              Add Motivational Islamic Reminder
            </h2>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Title *</label>
              <input
                type="text"
                required
                value={reminderForm.title}
                onChange={e => setReminderForm({ ...reminderForm, title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Original Motivational Text *</label>
              <textarea
                required
                rows={3}
                value={reminderForm.content}
                onChange={e => setReminderForm({ ...reminderForm, content: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Related Qur'an Ayah *</label>
                <input
                  type="text"
                  required
                  placeholder="Translation of related ayah..."
                  value={reminderForm.relatedAyah}
                  onChange={e => setReminderForm({ ...reminderForm, relatedAyah: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Ayah Reference *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Surah Al-Baqarah (2:222)"
                  value={reminderForm.reference}
                  onChange={e => setReminderForm({ ...reminderForm, reference: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-800 text-white font-semibold text-xs sm:text-sm hover:bg-emerald-700 transition"
            >
              Publish Reminder
            </button>
          </form>
        )}

        {/* Article Form */}
        {activeTab === 'article' && (
          <form onSubmit={handleArticleSubmit} className="space-y-4">
            <h2 className="font-cinzel text-xl font-bold text-stone-900 border-b border-stone-100 pb-3">
              Add Educational Article
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  value={articleForm.title}
                  onChange={e => setArticleForm({ ...articleForm, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Category *</label>
                <input
                  type="text"
                  required
                  value={articleForm.category}
                  onChange={e => setArticleForm({ ...articleForm, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Summary / Lead *</label>
              <textarea
                required
                rows={2}
                value={articleForm.summary}
                onChange={e => setArticleForm({ ...articleForm, summary: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Article Content (Markdown supported) *</label>
              <textarea
                required
                rows={8}
                placeholder="Use ### for subheadings, > for quotes..."
                value={articleForm.content}
                onChange={e => setArticleForm({ ...articleForm, content: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">References (One per line)</label>
              <textarea
                rows={2}
                placeholder="Sahih Bukhari 2517&#10;Surah At-Talaq (65:2-3)"
                value={articleForm.references}
                onChange={e => setArticleForm({ ...articleForm, references: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-800 text-white font-semibold text-xs sm:text-sm hover:bg-blue-700 transition"
            >
              Publish Article
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
