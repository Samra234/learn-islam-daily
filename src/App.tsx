import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './pages/HomePage';
import { QuranPage } from './pages/QuranPage';
import { TopicPage } from './pages/TopicPage';
import { AyahDetailPage } from './pages/AyahDetailPage';
import { HadithPage } from './pages/HadithPage';
import { DuasPage } from './pages/DuasPage';
import { IslamicQuotesPage } from './pages/IslamicQuotesPage';
import { MotivationPage } from './pages/MotivationPage';
import { DailyReminderPage } from './pages/DailyReminderPage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { SavedPage } from './pages/SavedPage';
import { AdminPage } from './pages/AdminPage';
import { StaticPages } from './pages/StaticPages';

function MainApp() {
  const [currentRoute, setCurrentRoute] = useState<string>('home');
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      if (hash) {
        setCurrentRoute(hash);
      } else {
        setCurrentRoute('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (route: string) => {
    window.location.hash = `#/${route}`;
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAyah = (surahNumber: number, ayahNumber: number) => {
    navigate(`ayah-${surahNumber}-${ayahNumber}`);
  };

  const handleOpenTopic = (slug: string) => {
    navigate(`topic-${slug}`);
  };

  const handleOpenArticle = (slug: string) => {
    navigate(`article-${slug}`);
  };

  // Route parser
  let content = null;

  if (currentRoute === 'home' || currentRoute === '') {
    content = (
      <HomePage
        onNavigate={navigate}
        onOpenAyah={handleOpenAyah}
        onOpenTopic={handleOpenTopic}
      />
    );
  } else if (currentRoute === 'quran' || currentRoute === 'topics') {
    content = (
      <QuranPage
        onOpenTopic={handleOpenTopic}
        onOpenAyah={handleOpenAyah}
      />
    );
  } else if (currentRoute.startsWith('topic-')) {
    const slug = currentRoute.replace('topic-', '');
    content = (
      <TopicPage
        slug={slug}
        onBack={() => navigate('quran')}
        onOpenAyah={handleOpenAyah}
      />
    );
  } else if (currentRoute.startsWith('ayah-')) {
    const parts = currentRoute.split('-');
    const surahNum = parseInt(parts[1] || '94', 10);
    const ayahNum = parseInt(parts[2] || '5', 10);
    content = (
      <AyahDetailPage
        surahNumber={surahNum}
        ayahNumber={ayahNum}
        onBack={() => navigate('quran')}
        onOpenAyah={handleOpenAyah}
      />
    );
  } else if (currentRoute === 'hadith') {
    content = <HadithPage />;
  } else if (currentRoute === 'duas') {
    content = <DuasPage />;
  } else if (currentRoute === 'quotes' || currentRoute === 'islamic-quotes') {
    content = <IslamicQuotesPage />;
  } else if (currentRoute === 'motivation') {
    content = <MotivationPage />;
  } else if (currentRoute === 'daily-reminder') {
    content = <DailyReminderPage />;
  } else if (currentRoute === 'articles') {
    content = <ArticlesPage onOpenArticle={handleOpenArticle} />;
  } else if (currentRoute.startsWith('article-')) {
    const slug = currentRoute.replace('article-', '');
    content = (
      <ArticleDetailPage
        slug={slug}
        onBack={() => navigate('articles')}
        onOpenArticle={handleOpenArticle}
      />
    );
  } else if (currentRoute === 'saved') {
    content = (
      <SavedPage
        onNavigate={navigate}
        onOpenAyah={handleOpenAyah}
        onOpenArticle={handleOpenArticle}
      />
    );
  } else if (currentRoute === 'admin') {
    content = <AdminPage />;
  } else if (
    currentRoute === 'about' ||
    currentRoute === 'contact' ||
    currentRoute === 'privacy' ||
    currentRoute === 'terms' ||
    currentRoute === 'disclaimer'
  ) {
    content = <StaticPages page={currentRoute as any} />;
  } else {
    // Fallback to Home
    content = (
      <HomePage
        onNavigate={navigate}
        onOpenAyah={handleOpenAyah}
        onOpenTopic={handleOpenTopic}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-islamic-pattern text-stone-800">
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigate}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      <main className="flex-1">
        {content}
      </main>

      <Footer onNavigate={navigate} />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectResult={(route) => navigate(route)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
