import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, auth, signInWithPopup, googleProvider, signOut, onAuthStateChanged, isUserAdmin, db, handleFirestoreError, OperationType, testConnection } from '../lib/firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  setDoc,
  deleteDoc,
  doc,
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
  userId: string;
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
  user: User | null;
  isAdmin: boolean;
  authLoading: boolean;
  language: 'en' | 'ur';
  setLanguage: (lang: 'en' | 'ur') => void;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  
  // Data
  ayahs: AyahItem[];
  hadiths: HadithItem[];
  duas: DuaItem[];
  quotes: QuoteItem[];
  reminders: ReminderItem[];
  articles: ArticleItem[];
  
  // Bookmarks
  bookmarks: BookmarkRecord[];
  isBookmarked: (contentId: string) => boolean;
  toggleBookmark: (item: {
    contentId: string;
    contentType: 'ayah' | 'hadith' | 'dua' | 'quote' | 'reminder' | 'article';
    title: string;
    reference: string;
  }) => Promise<void>;
  
  // Reading History
  readingHistory: HistoryRecord[];
  addToHistory: (contentId: string, contentType: string, title: string) => void;

  // Admin Actions
  addAyah: (ayah: Omit<AyahItem, 'id'>) => Promise<void>;
  addHadith: (hadith: Omit<HadithItem, 'id'>) => Promise<void>;
  addDua: (dua: Omit<DuaItem, 'id'>) => Promise<void>;
  addQuote: (quote: Omit<QuoteItem, 'id'>) => Promise<void>;
  addReminder: (reminder: Omit<ReminderItem, 'id'>) => Promise<void>;
  addArticle: (article: Omit<ArticleItem, 'id'>) => Promise<void>;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
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

  // Listen to Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);

      if (currentUser) {
        // Sync or update user document in Firestore
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          await setDoc(userDocRef, {
            userId: currentUser.uid,
            email: currentUser.email || '',
            displayName: currentUser.displayName || 'Muslim Servant',
            createdAt: new Date().toISOString()
          }, { merge: true });
        } catch (error) {
          console.warn('Could not record user doc:', error);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Sync Bookmarks with Firestore when logged in
  useEffect(() => {
    if (!user) {
      return;
    }

    const bookmarksQuery = query(collection(db, 'bookmarks'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(bookmarksQuery, (snapshot) => {
      const fetched: BookmarkRecord[] = [];
      snapshot.forEach((doc) => {
        fetched.push({ id: doc.id, ...(doc.data() as Omit<BookmarkRecord, 'id'>) });
      });
      setBookmarks(fetched);
      try {
        localStorage.setItem('lid_local_bookmarks', JSON.stringify(fetched));
      } catch (e) {
        console.warn(e);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'bookmarks');
    });

    return () => unsubscribe();
  }, [user]);

  // Sync Ayahs from Firestore
  useEffect(() => {
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
  }, []);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const isBookmarked = (contentId: string) => {
    return bookmarks.some(b => b.contentId === contentId);
  };

  const toggleBookmark = async (item: {
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

      if (user) {
        try {
          await deleteDoc(doc(db, 'bookmarks', existing.id));
        } catch (error) {
          handleFirestoreError(error, OperationType.DELETE, `bookmarks/${existing.id}`);
        }
      }
    } else {
      // Add
      const newRecord: BookmarkRecord = {
        id: `bm-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        userId: user ? user.uid : 'guest-user',
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

      if (user) {
        try {
          await setDoc(doc(db, 'bookmarks', newRecord.id), {
            userId: user.uid,
            contentId: newRecord.contentId,
            contentType: newRecord.contentType,
            title: newRecord.title,
            reference: newRecord.reference,
            savedAt: newRecord.savedAt
          });
        } catch (error) {
          handleFirestoreError(error, OperationType.CREATE, `bookmarks/${newRecord.id}`);
        }
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

  // Admin creation functions
  const addAyah = async (item: Omit<AyahItem, 'id'>) => {
    const docRef = await addDoc(collection(db, 'ayahs'), {
      ...item,
      published: true,
      createdAt: new Date().toISOString()
    });
    setAyahs(prev => [{ id: docRef.id, ...item }, ...prev]);
  };

  const addHadith = async (item: Omit<HadithItem, 'id'>) => {
    const docRef = await addDoc(collection(db, 'hadith'), {
      ...item,
      published: true,
      createdAt: new Date().toISOString()
    });
    setHadiths(prev => [{ id: docRef.id, ...item }, ...prev]);
  };

  const addDua = async (item: Omit<DuaItem, 'id'>) => {
    const docRef = await addDoc(collection(db, 'duas'), {
      ...item,
      published: true,
      createdAt: new Date().toISOString()
    });
    setDuas(prev => [{ id: docRef.id, ...item }, ...prev]);
  };

  const addQuote = async (item: Omit<QuoteItem, 'id'>) => {
    const docRef = await addDoc(collection(db, 'quotes'), {
      ...item,
      published: true,
      createdAt: new Date().toISOString()
    });
    setQuotes(prev => [{ id: docRef.id, ...item }, ...prev]);
  };

  const addReminder = async (item: Omit<ReminderItem, 'id'>) => {
    const docRef = await addDoc(collection(db, 'reminders'), {
      ...item,
      published: true,
      createdAt: new Date().toISOString()
    });
    setReminders(prev => [{ id: docRef.id, ...item }, ...prev]);
  };

  const addArticle = async (item: Omit<ArticleItem, 'id'>) => {
    const docRef = await addDoc(collection(db, 'articles'), {
      ...item,
      published: true,
      createdAt: new Date().toISOString()
    });
    setArticles(prev => [{ id: docRef.id, ...item }, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAdmin: isUserAdmin(user),
        authLoading,
        language,
        setLanguage,
        loginWithGoogle,
        logout,
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
