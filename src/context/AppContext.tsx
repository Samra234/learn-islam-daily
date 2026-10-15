import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, testConnection } from '../lib/firebase';
import {
  collection,
  onSnapshot,
  addDoc
} from 'firebase/firestore';
import {
  AyahItem,
  HadithItem,
  DuaItem,
  QuoteItem,
  ReminderItem,
  ArticleItem,
  INITIAL_AYAHS,
  INITIAL_HADITHS,
  INITIAL_DUAS,
  INITIAL_QUOTES,
  INITIAL_REMINDERS,
  INITIAL_ARTICLES
} from '../data/islamicData';

export interface BookmarkRecord {
  id: string;
  userId?: string;
  contentId: string;
  contentType: 'ayah' | 'hadith' | 'dua' | 'quote' | 'reminder' | 'article';
  title: string;
  reference: string;
  savedAt: string;
}

export interface HistoryRecord {
  id: string;
  contentId: string;
  contentType: string;
  title: string;
  viewedAt: string;
}

interface AppContextType {
  // Backward compatibility stubs
  user?: null;
  isAdmin?: boolean;
  authLoading?: boolean;
  loginWithGoogle?: () => Promise<void>;
  logout?: () => Promise<void>;

  language: 'en' | 'ur';
  setLanguage: (lang: 'en' | 'ur') => void;
  
  // Data
  ayahs: AyahItem[];
  hadiths: HadithItem[];
  duas: DuaItem[];
  quotes: QuoteItem[];
  reminders: ReminderItem[];
  articles: ArticleItem[];
  
  // Bookmarks (saved locally on device)
  bookmarks: BookmarkRecord[];
  isBookmarked: (contentId: string) => boolean;
  toggleBookmark: (item: {
    contentId: string;
    contentType: 'ayah' | 'hadith' | 'dua' | 'quote' | 'reminder' | 'article';
    title: string;
    reference: string;
  }) => void;
  
  // Reading History
  readingHistory: HistoryRecord[];
  addToHistory: (contentId: string, contentType: string, title: string) => void;

  // Publishing Actions
  addAyah: (ayah: Omit<AyahItem, 'id'>) => Promise<void>;
  addHadith: (hadith: Omit<HadithItem, 'id'>) => Promise<void>;
  addDua: (dua: Omit<DuaItem, 'id'>) => Promise<void>;
  addQuote: (quote: Omit<QuoteItem, 'id'>) => Promise<void>;
  addReminder: (reminder: Omit<ReminderItem, 'id'>) => Promise<void>;
  addArticle: (article: Omit<ArticleItem, 'id'>) => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<'en' | 'ur'>('en');

  const [ayahs, setAyahs] = useState<AyahItem[]>(INITIAL_AYAHS);
  const [hadiths, setHadiths] = useState<HadithItem[]>(INITIAL_HADITHS);
  const [duas, setDuas] = useState<DuaItem[]>(INITIAL_DUAS);
  const [quotes, setQuotes] = useState<QuoteItem[]>(INITIAL_QUOTES);
  const [reminders, setReminders] = useState<ReminderItem[]>(INITIAL_REMINDERS);
  const [articles, setArticles] = useState<ArticleItem[]>(INITIAL_ARTICLES);

  const [bookmarks, setBookmarks] = useState<BookmarkRecord[]>(() => {
    try {
      const cached = localStorage.getItem('lid_local_bookmarks');
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });

  const [readingHistory, setReadingHistory] = useState<HistoryRecord[]>(() => {
    try {
      const cached = localStorage.getItem('lid_reading_history');
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });

  // Verify connection once on mount
  useEffect(() => {
    testConnection();
  }, []);

  // Update HTML direction and language
  const setLanguage = (lang: 'en' | 'ur') => {
    setLanguageState(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem('lid_language', lang);
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('lid_language') as 'en' | 'ur' | null;
      if (savedLang === 'ur' || savedLang === 'en') {
        setLanguage(savedLang);
      }
    } catch (e) {
      console.warn(e);
    }
  }, []);

  // Sync Ayahs from Firestore if available
  useEffect(() => {
    try {
      const ayahsCol = collection(db, 'ayahs');
      const unsubscribe = onSnapshot(ayahsCol, (snapshot) => {
        if (!snapshot.empty) {
          const fetched: AyahItem[] = [];
          snapshot.forEach((doc) => {
            fetched.push({ id: doc.id, ...(doc.data() as Omit<AyahItem, 'id'>) });
          });
          // Merge with initial data
          setAyahs(prev => {
            const map = new Map<string, AyahItem>();
            INITIAL_AYAHS.forEach(item => map.set(item.id, item));
            fetched.forEach(item => map.set(item.id, item));
            return Array.from(map.values());
          });
        }
      }, (err) => {
        console.warn('Ayahs fetch notice:', err.message);
      });

      return () => unsubscribe();
    } catch (e) {
      console.warn('Firestore sync optional:', e);
    }
  }, []);

  const isBookmarked = (contentId: string) => {
    return bookmarks.some(b => b.contentId === contentId);
  };

  const toggleBookmark = (item: {
    contentId: string;
    contentType: 'ayah' | 'hadith' | 'dua' | 'quote' | 'reminder' | 'article';
    title: string;
    reference: string;
  }) => {
    const existing = bookmarks.find(b => b.contentId === item.contentId);
    
    if (existing) {
      // Remove
      const updated = bookmarks.filter(b => b.contentId !== item.contentId);
      setBookmarks(updated);
      try {
        localStorage.setItem('lid_local_bookmarks', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
    } else {
      // Add
      const newRecord: BookmarkRecord = {
        id: `bm-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        contentId: item.contentId,
        contentType: item.contentType,
        title: item.title,
        reference: item.reference,
        savedAt: new Date().toISOString()
      };

      const updated = [newRecord, ...bookmarks];
      setBookmarks(updated);
      try {
        localStorage.setItem('lid_local_bookmarks', JSON.stringify(updated));
      } catch (e) {
        console.warn(e);
      }
    }
  };

  const addToHistory = (contentId: string, contentType: string, title: string) => {
    const record: HistoryRecord = {
      id: `hist-${Date.now()}`,
      contentId,
      contentType,
      title,
      viewedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setReadingHistory(prev => {
      const filtered = prev.filter(p => p.contentId !== contentId);
      const next = [record, ...filtered].slice(0, 20);
      try {
        localStorage.setItem('lid_reading_history', JSON.stringify(next));
      } catch (e) {
        console.warn(e);
      }
      return next;
    });
  };

  // Creation functions with offline fallback
  const addAyah = async (item: Omit<AyahItem, 'id'>) => {
    const localId = `ayah-${Date.now()}`;
    try {
      const docRef = await addDoc(collection(db, 'ayahs'), {
        ...item,
        published: true,
        createdAt: new Date().toISOString()
      });
      setAyahs(prev => [{ id: docRef.id, ...item }, ...prev]);
    } catch {
      setAyahs(prev => [{ id: localId, ...item }, ...prev]);
    }
  };

  const addHadith = async (item: Omit<HadithItem, 'id'>) => {
    const localId = `hadith-${Date.now()}`;
    try {
      const docRef = await addDoc(collection(db, 'hadith'), {
        ...item,
        published: true,
        createdAt: new Date().toISOString()
      });
      setHadiths(prev => [{ id: docRef.id, ...item }, ...prev]);
    } catch {
      setHadiths(prev => [{ id: localId, ...item }, ...prev]);
    }
  };

  const addDua = async (item: Omit<DuaItem, 'id'>) => {
    const localId = `dua-${Date.now()}`;
    try {
      const docRef = await addDoc(collection(db, 'duas'), {
        ...item,
        published: true,
        createdAt: new Date().toISOString()
      });
      setDuas(prev => [{ id: docRef.id, ...item }, ...prev]);
    } catch {
      setDuas(prev => [{ id: localId, ...item }, ...prev]);
    }
  };

  const addQuote = async (item: Omit<QuoteItem, 'id'>) => {
    const localId = `quote-${Date.now()}`;
    try {
      const docRef = await addDoc(collection(db, 'quotes'), {
        ...item,
        published: true,
        createdAt: new Date().toISOString()
      });
      setQuotes(prev => [{ id: docRef.id, ...item }, ...prev]);
    } catch {
      setQuotes(prev => [{ id: localId, ...item }, ...prev]);
    }
  };

  const addReminder = async (item: Omit<ReminderItem, 'id'>) => {
    const localId = `rem-${Date.now()}`;
    try {
      const docRef = await addDoc(collection(db, 'reminders'), {
        ...item,
        published: true,
        createdAt: new Date().toISOString()
      });
      setReminders(prev => [{ id: docRef.id, ...item }, ...prev]);
    } catch {
      setReminders(prev => [{ id: localId, ...item }, ...prev]);
    }
  };

  const addArticle = async (item: Omit<ArticleItem, 'id'>) => {
    const localId = `art-${Date.now()}`;
    try {
      const docRef = await addDoc(collection(db, 'articles'), {
        ...item,
        published: true,
        createdAt: new Date().toISOString()
      });
      setArticles(prev => [{ id: docRef.id, ...item }, ...prev]);
    } catch {
      setArticles(prev => [{ id: localId, ...item }, ...prev]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user: null,
        isAdmin: true,
        authLoading: false,
        loginWithGoogle: async () => {},
        logout: async () => {},
        language,
        setLanguage,
        ayahs,
        hadiths,
        duas,
        quotes,
        reminders,
        articles,
        bookmarks,
        isBookmarked,
        toggleBookmark,
        readingHistory,
        addToHistory,
        addAyah,
        addHadith,
        addDua,
        addQuote,
        addReminder,
        addArticle
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
