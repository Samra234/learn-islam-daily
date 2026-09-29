import React, { useState } from 'react';
import { BookOpen, ShieldCheck, Mail, Heart, CheckCircle2 } from 'lucide-react';

interface StaticPageProps {
  page: 'about' | 'contact' | 'privacy' | 'terms' | 'disclaimer';
}

export const StaticPages: React.FC<StaticPageProps> = ({ page }) => {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  if (page === 'about') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            About Our Mission
          </span>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-stone-900">
            Learn Islam Daily
          </h1>
          <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto">
            "A Daily Reminder for the Heart" — An authentic, peaceful educational sanctuary for Muslims worldwide.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-6 text-stone-700 text-sm sm:text-base leading-relaxed">
          <h2 className="font-cinzel text-xl font-bold text-stone-900">Our Sacred Purpose</h2>
          <p>
            In an era of relentless algorithmic distraction, information overload, and social-media noise, Muslims often yearn for a simple, tranquil sanctuary to reflect upon the Words of Allah and the noble Sunnah of the Prophet Muhammad ﷺ.
          </p>
          <p>
            <strong>Learn Islam Daily</strong> was established to provide a reliable, clean, and mobile-friendly resource where readers can find Qur'an ayahs organized by emotional and practical life topics — such as Trust in Allah (Tawakkul), Patience (Sabr), Anxiety, Gratitude, and Divine Mercy.
          </p>

          <h3 className="font-cinzel text-lg font-bold text-stone-900 pt-4 border-t border-stone-100">
            Our Strict Content Verification Standards
          </h3>
          <ul className="list-disc list-inside space-y-2 text-stone-600 text-xs sm:text-sm pl-2">
            <li>
              <strong>Verified Qur'anic Ayahs:</strong> Never translated or altered arbitrarily. Every verse references its exact Surah name, Surah number, and Ayah number with Sahih International and classic Urdu translations.
            </li>
            <li>
              <strong>Authentic Hadiths:</strong> Clearly cited from canonical compilations (Sahih al-Bukhari, Sahih Muslim, Jami' at-Tirmidhi, etc.) with recorded hadith numbers and authentic scholar gradings.
            </li>
            <li>
              <strong>Distinct Classification:</strong> We maintain uncompromising boundaries between pure scripture (Qur'an), Prophetic narrations (Hadith), classical tafsir, and original inspirational reflections.
            </li>
          </ul>
        </div>
      </div>
    );
  }

  if (page === 'contact') {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Get in Touch
          </span>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-stone-900">
            Contact & Editorial Feedback
          </h1>
          <p className="text-stone-600 text-sm max-w-md mx-auto">
            Have a question, suggestion, or noticed a typographical correction? We welcome your heartfelt correspondence.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm">
          {contactSubmitted ? (
            <div className="text-center py-10 space-y-3 animate-in fade-in">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h2 className="font-cinzel text-xl font-bold text-stone-900">Message Received</h2>
              <p className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto">
                JazakAllahu Khayran for contacting Learn Islam Daily. Our editorial team will review your note shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-hidden focus:border-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-hidden focus:border-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Subject *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Typo correction in Surah Ash-Sharh"
                  value={contactForm.subject}
                  onChange={e => setContactForm({ ...contactForm, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-hidden focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={contactForm.message}
                  onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                  placeholder="Write your message here..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs sm:text-sm focus:outline-hidden focus:border-emerald-700"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition active:scale-95"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  if (page === 'privacy') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <h1 className="font-cinzel text-3xl font-bold text-stone-900">Privacy Policy</h1>
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-4 text-stone-700 text-xs sm:text-sm leading-relaxed">
          <p><strong>Last Updated: September 2026</strong></p>
          <p>
            At Learn Islam Daily, we consider the privacy of our visitors of paramount importance. This Privacy Policy document outlines the types of personal information that is received and collected by Learn Islam Daily and how it is used.
          </p>
          <h2 className="font-bold text-stone-900 text-base pt-2">Personal Data & Authentication</h2>
          <p>
            If you create an optional account to synchronize your bookmarked ayahs and duas across devices, authentication is handled securely through Firebase Authentication. We collect only your email address and display name. We never sell, rent, or trade your personal information.
          </p>
          <h2 className="font-bold text-stone-900 text-base pt-2">Local Storage</h2>
          <p>
            If you browse without signing in, your bookmarked reminders and reading history are saved locally within your browser's private localStorage.
          </p>
        </div>
      </div>
    );
  }

  if (page === 'terms') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <h1 className="font-cinzel text-3xl font-bold text-stone-900">Terms and Conditions</h1>
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-4 text-stone-700 text-xs sm:text-sm leading-relaxed">
          <p><strong>Last Updated: September 2026</strong></p>
          <p>
            By accessing and reading content on Learn Islam Daily, you agree to abide by these terms of use.
          </p>
          <h2 className="font-bold text-stone-900 text-base pt-2">Educational Purpose</h2>
          <p>
            All content on Learn Islam Daily is offered strictly for personal, non-commercial spiritual enrichment and Islamic education. You are welcome and encouraged to share our social cards and verses for beneficial da'wah and non-commercial educational purposes with proper attribution.
          </p>
        </div>
      </div>
    );
  }

  // Disclaimer
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
      <h1 className="font-cinzel text-3xl font-bold text-stone-900">Religious & Editorial Disclaimer</h1>
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-4 text-stone-700 text-xs sm:text-sm leading-relaxed">
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 font-medium">
          Important: Learn Islam Daily is an educational reflection platform, not a council of Islamic jurisprudence or a source of legal fatwa.
        </div>
        <h2 className="font-bold text-stone-900 text-base pt-2">Scholarly Consultation</h2>
        <p>
          While every care is taken to verify Qur'anic Arabic script, verified translations, and authenticated hadiths against primary sources, the articles, summaries, and motivational thoughts published on this site do not constitute binding theological or legal rulings.
        </p>
        <p>
          For complicated personal marital disputes, inheritance calculations, legal quandaries, or complex jurisprudential rulings, users are urged to consult reliable, qualified scholars and Islamic institutions in their local communities.
        </p>
      </div>
    </div>
  );
};
