export interface AyahItem {
  id: string;
  surah: string;
  surahNumber: number;
  ayahNumber: number;
  arabic: string;
  transliteration?: string;
  englishTranslation: string;
  urduTranslation: string;
  topic: string;
  reflection: string;
  tafsirSummary?: string;
  source: string;
  published: boolean;
  featured?: boolean;
}

export interface HadithItem {
  id: string;
  arabic: string;
  english: string;
  urdu: string;
  collection: string;
  hadithNumber: string;
  grading: 'Sahih' | 'Hasan' | 'Hasan Sahih' | 'Verified';
  narrator?: string;
  topic: string;
  source: string;
  published: boolean;
  featured?: boolean;
}

export interface DuaItem {
  id: string;
  title: string;
  titleUrdu?: string;
  arabic: string;
  transliteration: string;
  english: string;
  urdu: string;
  source: string;
  topic: string;
  occasion?: string;
  published: boolean;
  featured?: boolean;
}

export interface QuoteItem {
  id: string;
  text: string;
  author: string;
  source: string;
  topic: string;
  published: boolean;
  featured?: boolean;
}

export interface ReminderItem {
  id: string;
  title: string;
  titleUrdu?: string;
  content: string;
  contentUrdu?: string;
  relatedAyah: string;
  reference: string;
  topic: string;
  published: boolean;
}

export interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  readTime: string;
  content: string;
  references: string[];
  published: boolean;
  createdAt: string;
}

export interface TopicCategory {
  id: string;
  name: string;
  nameUrdu: string;
  slug: string;
  description: string;
  descriptionUrdu: string;
  iconName: string;
  ayahCount: number;
  group: 'Faith & Tawakkul' | 'Hope & Mercy' | 'Difficult Times' | 'Rizq & Provision' | 'Salah & Worship' | 'Character' | 'Hereafter' | 'Family & Relationships' | 'Guidance';
}

export const TOPIC_CATEGORIES: TopicCategory[] = [
  {
    id: 'trust-in-allah',
    name: 'Trust in Allah (Tawakkul)',
    nameUrdu: 'توکل علی اللہ',
    slug: 'trust-in-allah',
    description: 'Relying upon Allah with complete heart certainty while actively taking permissible means.',
    descriptionUrdu: 'اسباب اختیار کرتے ہوئے اپنے دل کو مکمل طور پر اللہ کے سپرد کرنا اور اس کی تدبیر پر راضی رہنا۔',
    iconName: 'ShieldCheck',
    ayahCount: 8,
    group: 'Faith & Tawakkul'
  },
  {
    id: 'patience',
    name: 'Patience (Sabr)',
    nameUrdu: 'صبر و استقامت',
    slug: 'patience',
    description: 'Restraining the self through hardship, steadfastness in obedience, and keeping quiet contentment with Allah\'s decree.',
    descriptionUrdu: 'تکالیف میں نفس کو بے قابو ہونے سے بچانا اور اللہ کے فیصلوں پر راضی رہنا۔',
    iconName: 'Anchor',
    ayahCount: 12,
    group: 'Difficult Times'
  },
  {
    id: 'allahs-mercy',
    name: "Allah's Infinite Mercy",
    nameUrdu: 'رحمتِ الٰہی',
    slug: 'allahs-mercy',
    description: 'The all-encompassing compass of Divine compassion that precedes Allah\'s anger and welcomes every repentant servant.',
    descriptionUrdu: 'اللہ تعالیٰ کی وسیع رحمت جو ہر توبہ کرنے والے کے لیے کھلی ہے اور مایوسی کو دور کرتی ہے۔',
    iconName: 'HeartHandshake',
    ayahCount: 10,
    group: 'Hope & Mercy'
  },
  {
    id: 'anxiety-hardship',
    name: 'Anxiety & Relief in Hardship',
    nameUrdu: 'پریشانی اور کشادگی',
    slug: 'anxiety-hardship',
    description: 'Divine reassurances that trials are accompanied by ease, and that no soul is burdened beyond its capacity.',
    descriptionUrdu: 'تنگی کے ساتھ آسانی کی الٰہی بشارت اور بے چینی کا قلبی علاج۔',
    iconName: 'Sunrise',
    ayahCount: 9,
    group: 'Difficult Times'
  },
  {
    id: 'rizq-provision',
    name: 'Rizq & Contentment',
    nameUrdu: 'رزق اور قناعت',
    slug: 'rizq-provision',
    description: 'Understanding that provision is guaranteed by the Provider (Ar-Razzaq) through piety and gratitude.',
    descriptionUrdu: 'رزق کا راز تقویٰ اور شکر گزاری میں پنہاں ہے، اور ہر جاندار کی روزی اللہ کے ذمہ ہے۔',
    iconName: 'Coins',
    ayahCount: 7,
    group: 'Rizq & Provision'
  },
  {
    id: 'salah-dhikr',
    name: 'Salah & Dhikr',
    nameUrdu: 'نماز اور ذکرِ الٰہی',
    slug: 'salah-dhikr',
    description: 'Finding inner tranquility and continuous connection with the Creator through the daily prayer and remembrance.',
    descriptionUrdu: 'نماز اور اللہ کے ذکر کے ذریعے قلبی سکون اور روحانی مضبوطی کا حصول۔',
    iconName: 'Compass',
    ayahCount: 11,
    group: 'Salah & Worship'
  },
  {
    id: 'forgiveness-repentance',
    name: 'Forgiveness & Repentance (Tawbah)',
    nameUrdu: 'توبہ اور مغفرت',
    slug: 'forgiveness-repentance',
    description: 'Returning to Allah with sincere regret, abandoning sin, and finding the sweetness of purification.',
    descriptionUrdu: 'سچے دل سے ندامت کے ساتھ گناہوں کی معافی طلب کرنا اور پاکیزہ زندگی کا آغاز۔',
    iconName: 'Sparkles',
    ayahCount: 9,
    group: 'Hope & Mercy'
  },
  {
    id: 'good-character',
    name: 'Good Character (Husn al-Khuluq)',
    nameUrdu: 'حسن اخلاق',
    slug: 'good-character',
    description: 'Refining speech, kindness to neighbors, humility, and treating people with gentle integrity.',
    descriptionUrdu: 'لوگوں کے ساتھ حسن سلوک، عاجزی اور سچائی کو اپنی ذات کا حصہ بنانا۔',
    iconName: 'Smile',
    ayahCount: 6,
    group: 'Character'
  },
  {
    id: 'family-parents',
    name: 'Parents & Family',
    nameUrdu: 'والدین اور حسنِ سلوک',
    slug: 'family-parents',
    description: 'Honoring mothers and fathers with tender humility, upholding kinship, and cultivating righteous homes.',
    descriptionUrdu: 'والدین کی خدمت و اطاعت اور رشتے داروں کے حقوق کی ادائیگی۔',
    iconName: 'Users',
    ayahCount: 6,
    group: 'Family & Relationships'
  },
  {
    id: 'hereafter-jannah',
    name: 'The Hereafter & Jannah',
    nameUrdu: 'آخرت اور جنت',
    slug: 'hereafter-jannah',
    description: 'Remembering eternal accountability, the fleeting nature of this world, and the joy prepared for believers.',
    descriptionUrdu: 'دنیا کی بے ثباتی کا احساس اور آخرت کی دائمی کامیابی کی تیاری۔',
    iconName: 'Sun',
    ayahCount: 8,
    group: 'Hereafter'
  },
  {
    id: 'seeking-guidance',
    name: 'Seeking Guidance & Knowledge',
    nameUrdu: 'طلبِ علم و ہدایت',
    slug: 'seeking-guidance',
    description: 'Asking Allah for upright direction on the Straight Path (Sirat al-Mustaqim) and beneficial knowledge.',
    descriptionUrdu: 'صراطِ مستقیم پر استقامت اور نفع بخش علم کے لیے بارگاہِ الٰہی میں التجا۔',
    iconName: 'BookOpen',
    ayahCount: 7,
    group: 'Guidance'
  },
  {
    id: 'gratitude',
    name: 'Gratitude (Shukr)',
    nameUrdu: 'شکر گزاری',
    slug: 'gratitude',
    description: 'Recognizing Allah\'s countless blessings in both joy and trials, which yields divine increase in blessings.',
    descriptionUrdu: 'نعمتوں کا دل، زبان اور عمل سے اعتراف جس سے مزید برکتیں حاصل ہوتی ہیں۔',
    iconName: 'Award',
    ayahCount: 8,
    group: 'Rizq & Provision'
  }
];

import { VERIFIED_30_AYAHS } from './ayahsData';
import { VERIFIED_30_HADITHS } from './hadithsData';
import { VERIFIED_30_QUOTES } from './quotesData';
import { VERIFIED_15_ARTICLES } from './articlesData';

export { VERIFIED_30_AYAHS } from './ayahsData';
export { VERIFIED_30_HADITHS } from './hadithsData';
export { VERIFIED_30_QUOTES } from './quotesData';
export { VERIFIED_15_ARTICLES } from './articlesData';

export const INITIAL_AYAHS: AyahItem[] = VERIFIED_30_AYAHS;
export const INITIAL_HADITHS: HadithItem[] = VERIFIED_30_HADITHS as unknown as HadithItem[];

const OLD_UNUSED_ITEMS: any[] = [
  {
    arabic: 'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا ۝ وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ ۚ وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ',
    transliteration: 'Wa man yattaqillaha yaj\'al lahu makhraja. Wa yarzuqhu min haythu la yahtasib. Wa man yatawakkal \'alallahi fahuwa hasbuh.',
    englishTranslation: 'And whoever fears Allah - He will make for him a way out, and will provide for him from where he does not expect. And whoever relies upon Allah - then He is sufficient for him.',
    urduTranslation: 'اور جو شخص اللہ سے ڈرے گا وہ اس کے لئے چھٹکارے کی راہ پیدا کر دے گا، اور اس کو ایسی جگہ سے رزق دے گا جہاں سے اس کو گمان بھی نہ ہو، اور جو اللہ پر بھروسہ کرے گا وہ اس کے لئے کافی ہے۔',
    topic: 'Trust in Allah (Tawakkul)',
    reflection: 'When human avenues seem entirely closed, divine doors open from dimensions we could never anticipate. Relying upon Allah means carrying peace in the heart while honoring our responsibilities.',
    tafsirSummary: 'Tafsir Ibn Kathir explains that Taqwa brings relief from every worldly bottleneck and opens sustained spiritual and physical sustenance.',
    source: 'Surah At-Talaq (65:2–3) - Sahih International / Jalandhri',
    published: true,
    featured: true
  },
  {
    id: 'al-baqarah-2-186',
    surah: 'Al-Baqarah',
    surahNumber: 2,
    ayahNumber: 186,
    arabic: 'وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ ۖ فَلْيَسْتَجِيبُوا لِي وَلْيُؤْمِنُوا بِي لَعَلَّهُمْ يَرْشُدُونَ',
    transliteration: 'Wa idha sa\'alaka \'ibadi \'anni fa inni qarib; ujibu da\'watad-da\'i idha da\'ani falyastajibu li wal-yu\'minu bi la\'allahum yarshudoon.',
    englishTranslation: 'And when My servants ask you concerning Me - indeed I am near. I respond to the invocation of the supplicant when he calls upon Me. So let them respond to Me and believe in Me that they may be [rightly] guided.',
    urduTranslation: 'اور جب میرے بندے آپ سے میرے متعلق پوچھیں تو (کہہ دیجیے کہ) میں تو قریب ہوں۔ پکارنے والے کی پکار کا جواب دیتا ہوں جب بھی وہ مجھے پکارے، پس چاہیے کہ وہ بھی میرا حکم مانیں اور مجھ پر ایمان لائیں تاکہ وہ ہدایت پائیں۔',
    topic: 'Salah & Dhikr',
    reflection: 'Notice how Allah speaks directly without any intermediary: He does not say "tell them I am near", but immediately affirms "Indeed I am near." Your whispered dua is heard instantly by the Creator of the heavens.',
    tafsirSummary: 'This verse is placed right amidst the verses of Ramadan and fasting, teaching that the fasting servant\'s supplication holds supreme proximity to Allah.',
    source: 'Surah Al-Baqarah (2:186) - Sahih International / Jalandhri',
    published: true,
    featured: true
  },
  {
    id: 'az-zumar-39-53',
    surah: 'Az-Zumar',
    surahNumber: 39,
    ayahNumber: 53,
    arabic: 'قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا ۚ إِنَّهُ هُوَ الْغَفُورُ الرَّحِيمُ',
    transliteration: 'Qul ya \'ibadiyal-ladhina asrafu \'ala anfusihim la taqnatu mir-rahmatillah; innallaha yaghfirudh-dhunuba jami\'a; innahu huwal-Ghafoorur-Rahim.',
    englishTranslation: 'Say, "O My servants who have transgressed against themselves [by sinning], do not despair of the mercy of Allah. Indeed, Allah forgives all sins. Indeed, it is He who is the Forgiving, the Merciful."',
    urduTranslation: 'کہہ دیجیے کہ اے میرے بندو جنہوں نے اپنی جانوں پر زیادتی کی ہے! اللہ کی رحمت سے ہرگز ناامید نہ ہونا، بیشک اللہ سب گناہوں کو معاف فرما دیتا ہے، یقیناً وہ بڑا بخشنے والا نہایت رحم فرمانے والا ہے۔',
    topic: "Allah's Infinite Mercy",
    reflection: 'Even after a person has transgressed against themselves, Allah still honors them with the affectionate call: "O My servants." No matter how heavy your past is, the door of repentance is wider than the sky.',
    tafsirSummary: 'Scholars consider this the most hopeful verse in the entire Qur\'an for the repentant believer who turns back sincerely.',
    source: 'Surah Az-Zumar (39:53) - Sahih International / Jalandhri',
    published: true,
    featured: true
  },
  {
    id: 'ar-rad-13-28',
    surah: 'Ar-Ra\'d',
    surahNumber: 13,
    ayahNumber: 28,
    arabic: 'الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
    transliteration: 'Alladhina amanu wa tatma\'innu qulubuhum bidhikrillah; ala bidhikrillahi tatma\'innul-quloob.',
    englishTranslation: 'Those who have believed and whose hearts are assured by the remembrance of Allah. Unquestionably, by the remembrance of Allah hearts are assured.',
    urduTranslation: 'وہ لوگ جو ایمان لائے اور ان کے دل اللہ کے ذکر سے چین پاتے ہیں۔ خوب سن لو کہ اللہ کے ذکر ہی سے دلوں کو اطمینان و سکون ملتا ہے۔',
    topic: 'Salah & Dhikr',
    reflection: 'The human heart was created with an innate void that no worldly entertainment, wealth, or status can ever satisfy. True peaceful stillness settles only when the heart reconnects with its Maker.',
    source: 'Surah Ar-Ra\'d (13:28) - Sahih International / Jalandhri',
    published: true
  },
  {
    id: 'al-baqarah-2-153',
    surah: 'Al-Baqarah',
    surahNumber: 2,
    ayahNumber: 153,
    arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
    transliteration: 'Ya ayyuhal-ladhina amanus-ta\'inu bis-sabri was-salah; innallaha ma\'as-sabirin.',
    englishTranslation: 'O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.',
    urduTranslation: 'اے ایمان والو! صبر اور نماز کے ذریعے مدد چاہو، بیشک اللہ صبر کرنے والوں کے ساتھ ہے۔',
    topic: 'Patience (Sabr)',
    reflection: 'When life weighs down upon you, anchor yourself with two divine ropes: patience (holding firm internally) and prayer (elevating your soul toward the heavens).',
    source: 'Surah Al-Baqarah (2:153) - Sahih International / Jalandhri',
    published: true
  },
  {
    id: 'al-imran-3-139',
    surah: 'Ali \'Imran',
    surahNumber: 3,
    ayahNumber: 139,
    arabic: 'وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ',
    transliteration: 'Wa la tahinu wa la tahzanu wa antumul-a\'lawna in kuntum mu\'minin.',
    englishTranslation: 'So do not weaken and do not grieve, and you will be superior if you are [true] believers.',
    urduTranslation: 'اور نہ ہمت ہارو اور نہ غمگین ہو، تم ہی غالب رہو گے اگر تم سچے مومن ہو۔',
    topic: 'Anxiety & Relief in Hardship',
    reflection: 'A direct command against despair. Temporary setbacks in worldly circumstances do not define your worth or your final victory when your connection with Allah remains intact.',
    source: 'Surah Ali \'Imran (3:139) - Sahih International / Jalandhri',
    published: true
  },
  {
    id: 'al-isra-17-23-24',
    surah: 'Al-Isra',
    surahNumber: 17,
    ayahNumber: 23,
    arabic: 'وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا ۚ إِمَّا يَبْلُغَنَّ عِندَكَ الْكِبَرَ أَحَدُهُمَا أَوْ كِلَاهُمَا فَلَا تَقُل لَّهُمَا أُفٍّ وَلَا تَنْهَرْهُمَا وَقُل لَّهُمَا قَوْلًا كَرِيمًا',
    transliteration: 'Wa qada rabbuka alla ta\'budu illa iyyahu wa bil-walidayni ihsana. Imma yablughanna \'indakal-kibara ahaduhuma aw kilahuma fala taqul lahuma uffiw-wa la tanharhuma wa qul lahuma qawlan karima.',
    englishTranslation: 'And your Lord has decreed that you not worship except Him, and to parents, good treatment. Whether one or both of them reach old age with you, say not to them [so much as], "uff," and do not repel them but speak to them a noble word.',
    urduTranslation: 'اور تیرے رب نے یہ حکم صادر فرمایا کہ تم اس کے سوا کسی کی بندگی نہ کرو اور والدین کے ساتھ حسن سلوک کرو، اگر تیرے پاس ان میں سے کوئی ایک یا دونوں بڑھاپے کو پہنچ جائیں تو انہیں اف تک نہ کہو اور نہ انہیں جھڑکو بلکہ ان سے ادب سے بات کرو۔',
    topic: 'Parents & Family',
    reflection: 'Notice how Allah couples His own worship directly with kindness toward parents. In their frail years, they require not merely duty, but immense tenderness, sweet words, and patience.',
    source: 'Surah Al-Isra (17:23) - Sahih International / Jalandhri',
    published: true
  },
  {
    id: 'ibrahim-14-7',
    surah: 'Ibrahim',
    surahNumber: 14,
    ayahNumber: 7,
    arabic: 'وَإِذْ تَأَذَّنَ رَبُّكُمْ لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ ۖ وَلَئِن كَفَرْتُمْ إِنَّ عَذَابِي لَشَدِيدٌ',
    transliteration: 'Wa idh ta\'adh-dhana rabbukum la\'in shakartum la\'azidannakum; wa la\'in kafartum inna \'adhabi lashadid.',
    englishTranslation: 'And [remember] when your Lord proclaimed, "If you are grateful, I will surely increase you [in favor]; but if you deny, indeed, My punishment is severe."',
    urduTranslation: 'اور جب تمہارے رب نے آگاہ کر دیا کہ اگر تم شکر گزاری کرو گے تو میں تمہیں ضرور زیادہ دوں گا اور اگر تم نے ناشکری کی تو یقیناً میرا عذاب بہت سخت ہے۔',
    topic: 'Gratitude (Shukr)',
    reflection: 'Gratitude is the divine multiplier of peace, health, and provision. The more you acknowledge and cherish the smallest favors of Allah, the more goodness flows into your days.',
    source: 'Surah Ibrahim (14:7) - Sahih International / Jalandhri',
    published: true
  }
];

const OLD_HADITHS: any[] = [
  {
    id: 'hadith-distress-muslim-2699',
    arabic: 'مَنْ نَفَّسَ عَنْ مُؤْمِنٍ كُرْبَةً مِنْ كُرَبِ الدُّنْيَا، نَفَّسَ اللَّهُ عَنْهُ كُرْبَةً مِنْ كُرَبِ يَوْمِ الْقِيَامَةِ، وَمَنْ يَسَّرَ عَلَى مُعْسِرٍ، يَسَّرَ اللَّهُ عَلَيْهِ فِي الدُّنْيَا وَالْآخِرَةِ',
    english: 'Whoever relieves a believer\'s distress of the distressful aspects of this world, Allah will rescue him from a distress of the Day of Resurrection; and whoever makes things easy for those who are in hardship, Allah will make things easy for him in this world and the Hereafter.',
    urdu: 'جس نے کسی مومن کی دنیا کی پریشانیوں میں سے کوئی پریشانی دور کی، اللہ تعالیٰ قیامت کے دن کی پریشانیوں میں سے اس کی پریشانی دور فرمائے گا؛ اور جس نے کسی تنگ دست پر آسانی کی، اللہ تعالیٰ دنیا اور آخرت میں اس پر آسانی فرمائے گا۔',
    collection: 'Sahih Muslim',
    hadithNumber: '2699',
    grading: 'Sahih',
    narrator: 'Abu Hurairah (RA)',
    topic: 'Good Character (Husn al-Khuluq)',
    source: 'Sahih Muslim 2699, Book of Remembrance and Supplication',
    published: true,
    featured: true
  },
  {
    id: 'hadith-bird-tirmidhi-2344',
    arabic: 'لَوْ أَنَّكُمْ تَوَكَّلْتُمْ عَلَى اللَّهِ حَقَّ تَوَكُّلِهِ لَرَزَقَكُمْ كَمَا يَرْزُقُ الطَّيْرَ، تَغْدُو خِمَاصًا وَتَرُوحُ بِطَانًا',
    english: 'If you were to rely upon Allah with the reliance due to Him, He would provide for you just as He provides for the birds: they depart in the morning with empty stomachs and return in the evening with full bellies.',
    urdu: 'اگر تم اللہ پر ویسا توکل کرو جیسا کہ توکل کرنے کا حق ہے، تو وہ تمہیں ایسے رزق عطا فرمائے گا جیسے پرندوں کو رزق دیتا ہے: وہ صبح کے وقت بھوکے پیٹ نکلتے ہیں اور شام کو پیٹ بھر کر واپس لوٹتے ہیں۔',
    collection: 'Jami\' at-Tirmidhi',
    hadithNumber: '2344',
    grading: 'Hasan Sahih',
    narrator: 'Umar ibn al-Khattab (RA)',
    topic: 'Trust in Allah (Tawakkul)',
    source: 'Jami\' at-Tirmidhi 2344, Sunan Ibn Majah 4164 (Graded Sahih by Al-Albani)',
    published: true,
    featured: true
  },
  {
    id: 'hadith-believer-affair-muslim-2999',
    arabic: 'عَجَبًا لِأَمْرِ الْمُؤْمِنِ، إِنَّ أَمْرَهُ كُلَّهُ خَيْرٌ، وَلَيْسَ ذَاكَ لِأَحَدٍ إِلَّا لِلْمُؤْمِنِ، إِنْ أَصَابَتْهُ سَرَّاءُ شَكَرَ فَكَانَ خَيْرًا لَهُ، وَإِنْ أَصَابَتْهُ ضَرَّاءُ صَبَرَ فَكَانَ خَيْرًا لَهُ',
    english: 'Wondrous is the affair of the believer, for there is good for him in every matter; and this is for no one except the believer. If something pleasant happens to him, he is grateful and that is good for him; and if adversity befalls him, he is patient and that is good for him.',
    urdu: 'مومن کا معاملہ بھی خوب ہے، اس کے ہر کام میں اس کے لئے بھلائی ہے اور یہ خصوصیت سوائے مومن کے کسی کے لئے نہیں ہے۔ اگر اسے کوئی خوشی پہنچتی ہے تو وہ شکر کرتا ہے تو یہ اس کے حق میں بہتر ہوتا ہے، اور اگر اسے کوئی تکلیف پہنچتی ہے تو وہ صبر کرتا ہے تو یہ بھی اس کے حق میں بہتر ہوتا ہے۔',
    collection: 'Sahih Muslim',
    hadithNumber: '2999',
    grading: 'Sahih',
    narrator: 'Suhaib ibn Sinan (RA)',
    topic: 'Patience (Sabr)',
    source: 'Sahih Muslim 2999, Book of Asceticism and Heart-Softening Traditions',
    published: true,
    featured: true
  },
  {
    id: 'hadith-brotherhood-bukhari-13',
    arabic: 'لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
    english: 'None of you truly believes until he loves for his brother what he loves for himself.',
    urdu: 'تم میں سے کوئی شخص اس وقت تک کامل مومن نہیں ہو سکتا جب تک وہ اپنے بھائی کے لیے وہی چیز پسند نہ کرے جو اپنے لیے پسند کرتا ہے۔',
    collection: 'Sahih Bukhari',
    hadithNumber: '13',
    grading: 'Sahih',
    narrator: 'Anas ibn Malik (RA)',
    topic: 'Good Character (Husn al-Khuluq)',
    source: 'Sahih Bukhari 13, Sahih Muslim 45',
    published: true
  },
  {
    id: 'hadith-kindness-muslim-2594',
    arabic: 'إِنَّ الرِّفْقَ لَا يَكُونُ فِي شَيْءٍ إِلَّا زَانَهُ، وَلَا يُنْزَعُ مِنْ شَيْءٍ إِلَّا شَانَهُ',
    english: 'Indeed, gentleness is not present in anything except that it beautifies it, and it is not removed from anything except that it makes it defective.',
    urdu: 'بیشک نرمی جس چیز میں بھی ہو اسے خوبصورت بنا دیتی ہے، اور جس چیز سے بھی چھین لی جائے اسے عیب دار کر دیتی ہے۔',
    collection: 'Sahih Muslim',
    hadithNumber: '2594',
    grading: 'Sahih',
    narrator: 'Aisha (RA)',
    topic: 'Good Character (Husn al-Khuluq)',
    source: 'Sahih Muslim 2594, Book of Virtue, Enjoining Good Manners',
    published: true
  }
];

export const INITIAL_DUAS: DuaItem[] = [
  {
    id: 'dua-sayyid-al-istighfar',
    title: 'Sayyid al-Istighfar (Chief of Forgiveness)',
    titleUrdu: 'سید الاستغفار',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    transliteration: 'Allahumma Anta Rabbi la ilaha illa Anta, khalaqtani wa ana \'abduka, wa ana \'ala \'ahdika wa wa\'dika mastata\'tu, a\'udhu bika min sharri ma sana\'tu, abu\'u laka bini\'matika \'alayya, wa abu\'u laka bidhanbi faghfir li, fa-innahu la yaghfirudh-dhunuba illa Ant.',
    english: 'O Allah, You are my Lord, there is no deity worthy of worship except You. You created me and I am Your servant, and I uphold Your covenant and promise as much as I am able. I seek refuge in You from the evil of what I have done. I acknowledge before You Your favors upon me, and I acknowledge my sin, so forgive me, for none forgives sins except You.',
    urdu: 'اے اللہ! تو ہی میرا رب ہے، تیرے سوا کوئی معبود نہیں، تو نے ہی مجھے پیدا کیا اور میں تیرا بندہ ہوں اور میں اپنی طاقت کے مطابق تیرے عہد اور وعدے پر قائم ہوں۔ میں اپنے کیے کے شر سے تیری پناہ مانگتا ہوں، اپنے اوپر تیری نعمتوں کا اعتراف کرتا ہوں اور اپنے گناہوں کا اعتراف کرتا ہوں، پس مجھے بخش دے کیونکہ تیرے سوا کوئی گناہوں کو بخشنے والا نہیں۔',
    source: 'Sahih Bukhari 6306',
    topic: 'Forgiveness & Repentance (Tawbah)',
    occasion: 'Morning and Evening',
    published: true,
    featured: true
  },
  {
    id: 'dua-anxiety-worry',
    title: 'Dua for Anxiety and Sorrow',
    titleUrdu: 'فکر و پریشانی دور کرنے کی دعا',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ، وَغَلَبَةِ الرِّجَالِ',
    transliteration: 'Allahumma inni a\'udhu bika minal-hammi wal-hazan, wal-\'ajzi wal-kasal, wal-bukhli wal-jubn, wa dala\'id-dayni wa ghalabatir-rijal.',
    english: 'O Allah, I seek refuge in You from anxiety and grief, from incapacity and laziness, from stinginess and cowardice, and from the burden of debt and being overpowered by men.',
    urdu: 'اے اللہ! میں غم اور پریشانی سے، عاجزی اور سستی سے، بخل اور بزدلی سے، قرض کے بوجھ اور لوگوں کے دباؤ سے تیری پناہ مانگتا ہوں۔',
    source: 'Sahih Bukhari 2893',
    topic: 'Anxiety & Relief in Hardship',
    occasion: 'Times of grief, debt, or overwhelming pressure',
    published: true,
    featured: true
  },
  {
    id: 'dua-younus-relief',
    title: 'Supplication of Prophet Yunus (Dua al-Karbi)',
    titleUrdu: 'دعائے یونس علیہ السلام (مشکل کشائی)',
    arabic: 'لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
    transliteration: 'La ilaha illa Anta subhanaka inni kuntu minaz-zalimin.',
    english: 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.',
    urdu: 'تیرے سوا کوئی معبود نہیں، تو پاک ہے، بیشک میں ہی قصورواروں میں سے تھا۔',
    source: 'Surah Al-Anbiya (21:87) & Jami\' at-Tirmidhi 3505 (Sahih)',
    topic: 'Anxiety & Relief in Hardship',
    occasion: 'Whenever distressed or facing seemingly impossible odds',
    published: true
  },
  {
    id: 'dua-parents-quran',
    title: 'Quranic Supplication for Parents',
    titleUrdu: 'والدین کے لیے قرآنی دعا',
    arabic: 'رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    transliteration: 'Rabbir-hamhuma kama rabbayani saghira.',
    english: 'My Lord, have mercy upon them as they brought me up [when I was] small.',
    urdu: 'اے میرے پروردگار! تو ان دونوں پر رحم فرما جیسا کہ انہوں نے بچپن میں مجھے پالا اور پرورش کی۔',
    source: 'Surah Al-Isra (17:24)',
    topic: 'Parents & Family',
    occasion: 'After every prayer for living and deceased parents',
    published: true
  },
  {
    id: 'dua-beneficial-knowledge',
    title: 'Dua for Beneficial Knowledge and Rizq',
    titleUrdu: 'نفع بخش علم اور پاکیزہ رزق کی دعا',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا',
    transliteration: 'Allahumma inni as\'aluka \'ilman nafi\'a, wa rizqan tayyiba, wa \'amalan mutaqabbala.',
    english: 'O Allah, I ask You for beneficial knowledge, wholesome provision, and accepted deeds.',
    urdu: 'اے اللہ! میں تجھ سے نفع بخش علم، پاکیزہ روزی، اور قبول ہونے والے عمل کا سوال کرتا ہوں۔',
    source: 'Sunan Ibn Majah 925 (Graded Sahih)',
    topic: 'Rizq & Provision',
    occasion: 'After Fajr prayer',
    published: true
  }
];

export const INITIAL_QUOTES: QuoteItem[] = VERIFIED_30_QUOTES as unknown as QuoteItem[];
const OLD_QUOTES: any[] = [
  {
    id: 'quote-umar-islam-honor',
    text: 'We were the most humiliated people on earth, and Allah gave us honor through Islam. If we ever seek honor through anything else, Allah will humiliate us again.',
    author: 'Umar ibn al-Khattab (RA)',
    source: 'Al-Mustadrak \'ala al-Sahihayn by Al-Hakim (Authentic)',
    topic: 'Faith & Tawakkul',
    published: true,
    featured: true
  },
  {
    id: 'quote-ali-patience',
    text: 'Patience is to faith what the head is to the body. When patience is lost, faith is lost; and when the head is severed, the body perishes.',
    author: 'Ali ibn Abi Talib (RA)',
    source: 'Hilyat al-Awliya by Abu Nu\'aym',
    topic: 'Patience (Sabr)',
    published: true,
    featured: true
  },
  {
    id: 'quote-hasan-three-days',
    text: 'The worldly life consists of three days: yesterday has departed along with all that was in it; tomorrow you may never reach; today is yours, so make righteous use of it.',
    author: 'Al-Hasan al-Basri (Rahimahullah)',
    source: 'Al-Zuhd by Imam Ahmad ibn Hanbal',
    topic: 'The Hereafter & Jannah',
    published: true
  },
  {
    id: 'quote-ibn-qayyim-heart',
    text: 'If the heart tastes the sweetness of worshipping Allah and the sincerity of turning to Him, nothing else in existence remains more beloved to it or sweeter.',
    author: 'Ibn al-Qayyim al-Jawziyyah (Rahimahullah)',
    source: 'Madarij al-Salikin',
    topic: 'Salah & Dhikr',
    published: true
  },
  {
    id: 'quote-fudayl-tears',
    text: 'If you are unable to stand in night prayer and fast during the day, know that you are held back by the chains of your sins.',
    author: 'Al-Fudayl ibn \'Iyad (Rahimahullah)',
    source: 'Siyar A\'lam al-Nubala by Al-Dhahabi',
    topic: 'Forgiveness & Repentance (Tawbah)',
    published: true
  }
];

export const INITIAL_REMINDERS: ReminderItem[] = [
  {
    id: 'rem-struggle-unseen',
    title: 'Allah Knows the Quiet Tears You Hold Back',
    titleUrdu: 'اللہ آپ کے پوشیدہ آنسوؤں سے بھی باخبر ہے',
    content: 'When you are trying your hardest in silence and no one around you sees the weight you carry, remember that Al-Basir (The All-Seeing) and As-Sami (The All-Hearing) knows every heartbeat. You never have to explain your exhaustion to Allah — He already knows, and His recompense for silent patience will exceed your imagination.',
    contentUrdu: 'جب آپ خاموشی سے اپنی پوری کوشش کر رہے ہوں اور کوئی آپ کا بوجھ نہ دیکھ رہا ہو، تو یاد رکھیں کہ البصیر اور السمیع آپ کی ہر کیفیت سے واقف ہے۔ اللہ کے ہاں صبر کا اجر بے شمار ہے۔',
    relatedAyah: 'And rely upon the Ever-Living who does not die, and exalt [Allah] with His praise.',
    reference: 'Surah Al-Furqan (25:58)',
    topic: 'Anxiety & Relief in Hardship',
    published: true
  },
  {
    id: 'rem-comparison-thief',
    title: 'Do Not Measure Your Chapters Against Another\'s Highlights',
    titleUrdu: 'اپنی زندگی کا موازنہ دوسروں سے مت کیجیے',
    content: 'Allah distributes worldly gifts with infinite wisdom. What was withheld from you was withheld for your protection, and what was delayed was scheduled for the exact moment your soul is ready. Protect your contentment: envy burns good deeds like fire consumes wood.',
    contentUrdu: 'اللہ تعالیٰ نے ہر ایک کا رزق اور امتحان مختلف بنایا ہے۔ جو چیز آپ سے روکی گئی ہے وہ بھی حکمت کے تحت ہے، لہٰذا دوسروں کے حالات دیکھ کر ناشکری نہ کیجیے۔',
    relatedAyah: 'And do not extend your eyes toward that by which We have given enjoyment to [some] categories of them...',
    reference: 'Surah Ta-Ha (20:131)',
    topic: 'Rizq & Contentment',
    published: true
  },
  {
    id: 'rem-start-again-tawbah',
    title: 'Fall Down Seven Times, Return to Allah Eight',
    titleUrdu: 'ہر بار گرنے کے بعد اللہ کی طرف پلٹ آئیے',
    content: 'Shaytan whispers that your repentance is hypocritical because you stumbled again. That whisper is the true deception. The real tragedy is not that you slipped, but that you gave up coming back to the Most Merciful. Every sincere tear resets your record.',
    contentUrdu: 'شیطان آپ کے دل میں وسوسہ ڈالتا ہے کہ بار بار گناہ کے بعد توبہ قبول نہیں ہوگی۔ یاد رکھیے کہ توبہ کا دروازہ آخری سانس تک کھلا ہے۔',
    relatedAyah: 'Indeed, Allah loves those who are constantly repentant and loves those who purify themselves.',
    reference: 'Surah Al-Baqarah (2:222)',
    topic: 'Forgiveness & Repentance (Tawbah)',
    published: true
  }
];

export const INITIAL_ARTICLES: ArticleItem[] = VERIFIED_15_ARTICLES as unknown as ArticleItem[];
const OLD_ARTICLES: any[] = [
  {
    id: 'art-tawakkul-practical',
    title: 'The Art of Tawakkul: How to Tie Your Camel and Rely Upon Allah',
    slug: 'the-art-of-tawakkul-tying-your-camel',
    summary: 'A deep spiritual exploration of the golden balance between active striving and internal surrender to the decree of Allah.',
    category: 'Faith & Tawakkul',
    readTime: '6 min read',
    content: `### Understanding Tawakkul
In popular conversation, reliance upon Allah (Tawakkul) is sometimes mistaken for passive resignation. People occasionally say, "I will not seek medication; I leave it to Allah," or "I will not study; Allah will grant success if He wills."

In orthodox Islamic theology, this misunderstanding was decisively corrected by the Messenger of Allah ﷺ. When a Bedouin came to the Prophet ﷺ and asked whether he should let his camel roam free and rely on Allah, the Prophet ﷺ replied:

> **"Tie her and rely upon Allah."**
> *(Narrated in Jami' at-Tirmidhi 2517 - Graded Hasan)*

### The Two Pillars of Authentic Reliance
1. **The External Pillar (Taking the Means):** The limbs must exert full effort, utilize medicine, seek lawful livelihood, and plan meticulously according to the universal laws Allah placed in the creation.
2. **The Internal Pillar (Detaching from the Means):** The heart must remain firmly anchored to the Causer of the causes (Musabbib al-Asbab), realizing that the means themselves possess no independent power to harm or benefit except by Allah's permission.

### Freedom From Crippling Anxiety
When a believer embraces authentic Tawakkul, paralyzing dread disappears. You do your utmost with honesty, and whatever outcome follows — whether victory or delay — is accepted with dignified peace, knowing that Allah's choice for His servant is always superior to what the servant would choose for himself.

*Note: For sensitive personal legal or theological matters, readers are encouraged to consult qualified local Islamic scholars.*`,
    references: [
      'Jami\' at-Tirmidhi 2517',
      'Surah At-Talaq (65:2-3)',
      'Madarij al-Salikin by Ibn al-Qayyim'
    ],
    published: true,
    createdAt: '2026-09-20'
  },
  {
    id: 'art-finding-peace-in-salah',
    title: 'Khushu in Salah: How to Protect Your Mind From Wandering',
    slug: 'khushu-in-salah-calming-wandering-mind',
    summary: 'Practical and spiritual steps to transform your daily five prayers from a rushed mechanical ritual into a refreshing sanctuary of peace.',
    category: 'Salah & Worship',
    readTime: '8 min read',
    content: `### The Sanctuary of Prayer
The Messenger of Allah ﷺ would say to Bilal (RA): **"Stand, O Bilal, and comfort us with the prayer!"** (Sunan Abi Dawud 4985).

For the Companions, prayer was not an onerous chore to check off an endless to-do list; it was the refuge where worldly fatigue was gently washed away in the presence of the King of Kings.

### Root Causes of Wandering Thoughts
Most distraction in Salah begins long before the opening *Allahu Akbar*:
- Scrolling through fast-paced social feeds right until the moment of prayer.
- Entering the prayer while rushing against tight worldly appointments.
- Repeating verses by heart without meditating on the meaning of what is recited.

### 4 Practical Keys to Revive Khushu
1. **The Intentional Wudu:** Perform ablution mindfully, imagining sins dripping away with each drop of water.
2. **Pause Before the Takbir:** Stand in silence for 5 seconds before raising your hands. Remind yourself: *Whom am I about to address?*
3. **Pace Your Recitation:** Recite Surah Al-Fatihah verse by verse, pausing after each ayah to let the heart register the divine dialogue.
4. **Vary Your Sujood Supplications:** Bring your genuine, vulnerable requests into your prostration, for that is where the servant is closest to their Lord.`,
    references: [
      'Sunan Abi Dawud 4985',
      'Surah Al-Mu\'minoon (23:1-2)',
      'Tafsir Ibn Kathir'
    ],
    published: true,
    createdAt: '2026-09-22'
  }
];
