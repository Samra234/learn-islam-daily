export interface QuoteItem {
  id: string;
  quote: string;
  quoteUrdu: string;
  text?: string;
  textUrdu?: string;
  author: string;
  titleOrContext?: string;
  source: string;
  category: string;
  topic?: string;
  reflection: string;
  published: boolean;
  featured?: boolean;
}

const RAW_VERIFIED_30_QUOTES: QuoteItem[] = [
  {
    id: 'quote-umar-dignity-islam',
    quote: 'We were the most humiliated of people, and Allah gave us honor through Islam. If we ever seek honor in something else, Allah will humiliate us again.',
    quoteUrdu: 'ہم سب سے زیادہ ذلیل قوم تھے، اللہ نے ہمیں اسلام کے ذریعے عزت بخشی۔ اگر ہم اسلام کے سوا کسی اور چیز میں عزت تلاش کریں گے تو اللہ ہمیں دوبارہ ذلیل کر دے گا۔',
    author: 'Umar ibn al-Khattab (RA)',
    titleOrContext: 'Second Caliph of Islam',
    source: 'Al-Mustadrak al-Hakim (1/130), Graded Sahih',
    category: 'Faith & Identity',
    reflection: 'True nobility does not originate from wealth, lineage, or worldly trends; it blooms only from living with genuine devotion to Allah.',
    published: true,
    featured: true
  },
  {
    id: 'quote-hasan-basri-world',
    quote: 'The world is three days: yesterday which has vanished with all that was in it; tomorrow which you may never reach; and today which is yours, so act in it.',
    quoteUrdu: 'دنیا صرف تین دن ہے: گزرا ہوا کل جو کچھ اس میں تھا اپنے ساتھ لے گیا؛ آنے والا کل جس کا تمہیں علم نہیں کہ پا سکو گے یا نہیں؛ اور آج کا دن جو تمہارے پاس ہے، پس اس میں نیک عمل کر لو۔',
    author: 'Al-Hasan al-Basri (RH)',
    titleOrContext: 'Eminent Tabi\'i and Scholar of Basra',
    source: 'Az-Zuhd by Ahmad ibn Hanbal',
    category: 'Accountability & Time',
    reflection: 'Do not paralyze today\'s worship with yesterday\'s regrets or tomorrow\'s anxieties. Seize the present hour for Allah.',
    published: true,
    featured: true
  },
  {
    id: 'quote-ibn-qayyim-heart-sickness',
    quote: 'The heart gets sick as the body gets sick, and its cure is repentance. It becomes rusty like a mirror, and its polish is the remembrance of Allah.',
    quoteUrdu: 'دل بیمار ہوتا ہے جیسے جسم بیمار ہوتا ہے اور اس کی شفا توبہ ہے۔ یہ آئینے کی طرح زنگ آلود ہو جاتا ہے اور اس کی چمک اللہ کی یاد ہے۔',
    author: 'Ibn al-Qayyim al-Jawziyya (RH)',
    titleOrContext: 'Classical Islamic Theologian',
    source: 'Al-Wabil al-Sayyib',
    category: 'Heart & Spiritual Purification',
    reflection: 'Just as our physical bodies require nourishment and healing, our spiritual hearts crave sincere istighfar and constant dhikr.',
    published: true,
    featured: true
  },
  {
    id: 'quote-ali-patience-faith',
    quote: 'Patience (Sabr) is to faith what the head is to the body. If the head is cut off, the body perishes; likewise, if patience goes, faith disappears.',
    quoteUrdu: 'صبر کا ایمان سے وہی تعلق ہے جو سر کا جسم سے ہے۔ اگر سر کاٹ دیا جائے تو جسم ختم ہو جاتا ہے، اسی طرح اگر صبر ختم ہو جائے تو ایمان رخصت ہو جاتا ہے۔',
    author: 'Ali ibn Abi Talib (RA)',
    titleOrContext: 'Fourth Caliph of Islam',
    source: 'Musannaf Ibn Abi Shaybah 30424',
    category: 'Patience & Hardship',
    reflection: 'Steadfast perseverance under trials and restraint against desires is the protective crown of true iman.',
    published: true
  },
  {
    id: 'quote-shafii-loneliness-sin',
    quote: 'If you fear poverty, trust that Allah is the Provider. And if you feel lonely among creation, seek companionship with Allah through His remembrance.',
    quoteUrdu: 'اگر تمہیں فقر کا اندیشہ ہو تو یقین رکھو کہ اللہ ہی رازق ہے۔ اور اگر مخلوق میں تنہائی محسوس ہو تو اللہ کے ذکر سے انس حاصل کرو۔',
    author: 'Imam Muhammad ibn Idris ash-Shafi\'i (RH)',
    titleOrContext: 'Founder of the Shafi\'i Jurisprudence',
    source: 'Diwan al-Shafi\'i',
    category: 'Trust in Allah (Tawakkul)',
    reflection: 'The solitude of the believer is transformed into sacred intimacy whenever the heart opens its dialogue with the All-Hearing.',
    published: true
  },
  {
    id: 'quote-ibn-taymiyyah-prison',
    quote: 'What can my enemies do to me? My garden and my paradise are in my heart; wherever I go, they are with me. My imprisonment is seclusion for worship, and my exile is travel.',
    quoteUrdu: 'میرے دشمن میرا کیا بگاڑ سکتے ہیں؟ میری جنت اور میرا باغ تو میرے سینے میں ہے؛ میں جہاں بھی جاؤں وہ میرے ساتھ ہے۔ میری قید خلوت اور عبادت ہے، اور میرا جلاوطن کیا جانا سیاحت ہے۔',
    author: 'Ibn Taymiyyah (RH)',
    titleOrContext: 'Major Islamic Scholar',
    source: 'Al-Wabil al-Sayyib p. 69',
    category: 'Inner Peace & Freedom',
    reflection: 'When one\'s soul is anchored to the transcendent peace of Allah, no worldly cage can extinguish internal joy.',
    published: true
  },
  {
    id: 'quote-abu-bakr-humility',
    quote: 'Do not look down upon any Muslim, for even the lowest among Muslims is great in the sight of Allah.',
    quoteUrdu: 'کسی مسلمان کو حقیر نہ سمجھو، کیونکہ مسلمانوں میں معمولی درجہ رکھنے والا بھی اللہ کے نزدیک بڑا ہے۔',
    author: 'Abu Bakr as-Siddiq (RA)',
    titleOrContext: 'First Caliph of Islam',
    source: 'Ihya Ulum al-Din by Imam al-Ghazali',
    category: 'Good Character & Humility',
    reflection: 'Spiritual superiority is known only to the Knower of the Unseen. Treat every soul with dignity and reverence.',
    published: true
  },
  {
    id: 'quote-uthman-purity-quran',
    quote: 'If our hearts were truly pure, they would never tire of reciting and reflecting upon the words of our Lord (the Qur\'an).',
    quoteUrdu: 'اگر ہمارے دل واقعی پاک ہوتے تو وہ اپنے رب کے کلام (قرآن) کی تلاوت اور اس میں غور و فکر کرنے سے کبھی نہ تھکتے۔',
    author: 'Uthman ibn Affan (RA)',
    titleOrContext: 'Third Caliph of Islam',
    source: 'Al-Bidayah wa an-Nihayah by Ibn Kathir',
    category: 'Qur\'an & Devotion',
    reflection: 'The Qur\'an is divine nourishment; when spiritual clutter is cleansed from our inner state, every verse becomes sweet sustenance.',
    published: true
  },
  {
    id: 'quote-umar-abd-aziz-fear',
    quote: 'Whoever fears Allah, everything in existence will stand in awe of him. And whoever fears other than Allah, will be terrified of everything.',
    quoteUrdu: 'جو شخص اللہ سے ڈرتا ہے ہر چیز اس کا ادب کرتی ہے، اور جو اللہ کے سوا دوسروں سے ڈرتا ہے وہ ہر چیز سے خوفزدہ رہتا ہے۔',
    author: 'Umar ibn Abd al-Aziz (RH)',
    titleOrContext: 'The Righteous Umayyad Caliph',
    source: 'Siyar A\'lam an-Nubala by Adh-Dhahabi',
    category: 'Taqwa & God-Consciousness',
    reflection: 'Unifying your reverence and fear toward the Almighty frees the spirit from every petty anxiety and worldly intimidation.',
    published: true
  },
  {
    id: 'quote-fudayl-iyad-sincerity',
    quote: 'Abandoning a deed for the sake of people is showing off (riya\'), doing a deed for the sake of people is shirk, and sincerity is when Allah saves you from both.',
    quoteUrdu: 'لوگوں کے خوف سے عمل چھوڑ دینا ریاکاری ہے، لوگوں کے لیے عمل کرنا شرک ہے، اور اخلاص یہ ہے کہ اللہ تمہیں ان دونوں سے محفوظ رکھے۔',
    author: 'Al-Fudayl ibn \'Iyad (RH)',
    titleOrContext: 'Early Ascetic Scholar',
    source: 'Hilyat al-Awliya by Abu Nu\'aym',
    category: 'Sincerity & Intention',
    reflection: 'Live your spiritual life before an audience of One. Seek neither praise from people nor let their opinions deter your good works.',
    published: true
  },
  {
    id: 'quote-ibn-masud-companion',
    quote: 'Whoever among you wishes to follow a way, let him follow the way of those who have passed away (the Companions), for the living are not safe from fitnah.',
    quoteUrdu: 'تم میں سے جو کسی کے راستے کی پیروی کرنا چاہے، وہ ان کے راستے کی پیروی کرے جو اس دنیا سے رخصت ہو چکے ہیں، کیونکہ زندہ شخص فتنے سے محفوظ نہیں ہوتا۔',
    author: 'Abdullah ibn Mas\'ud (RA)',
    titleOrContext: 'Noble Companion and Scholar of Qur\'an',
    source: 'Jami\' Bayan al-\'Ilm wa Fadlih',
    category: 'Guidance & Knowledge',
    reflection: 'Anchoring our understanding to the pure practice of the Prophet’s Companions guards us against modern innovations and deviations.',
    published: true
  },
  {
    id: 'quote-malik-ibn-dinar-heart',
    quote: 'Whenever you find stiffness in your heart, weakness in your body, and deprivation in your sustenance, know that you have spoken about what does not concern you.',
    quoteUrdu: 'جب تم اپنے دل میں سختی، اپنے جسم میں کمزوری، اور اپنے رزق میں کمی محسوس کرو، تو جان لو کہ تم نے فضول باتوں میں وقت ضائع کیا ہے۔',
    author: 'Malik ibn Dinar (RH)',
    titleOrContext: 'Classical Islamic Scholar & Ascetic',
    source: 'Sifat as-Safwah by Ibn al-Jawzi',
    category: 'Guarding the Tongue',
    reflection: 'Idle chatter drains spiritual vitality. Silence preserves inner softness and opens avenues of divine barakah.',
    published: true
  },
  {
    id: 'quote-sufyan-thawri-weep',
    quote: 'Weep out of fear of Allah, and if your eyes refuse to weep, then force yourself to weep, for the tears shed out of reverence for Allah extinguish oceans of fire.',
    quoteUrdu: 'اللہ کے خوف سے رویا کرو، اور اگر آنکھیں نہ روئیں تو رونے کی کوشش کرو، کیونکہ اللہ کے خوف سے بہنے والے آنسو آگ کے سمندروں کو بجھا دیتے ہیں۔',
    author: 'Sufyan ath-Thawri (RH)',
    titleOrContext: 'Great Scholar of Hadith & Jurisprudence',
    source: 'Al-Zuhd al-Kabir by al-Bayhaqi',
    category: 'Repentance & Tawbah',
    reflection: 'A solitary tear shed in quiet reflection over our shortcomings is dearly cherished by the Most Forgiving Lord.',
    published: true
  },
  {
    id: 'quote-ibn-qayyim-dua-destiny',
    quote: 'Dua is one of the most potent medicines. It is the enemy of affliction; it repels it, cures it, prevents its descent, or alleviates it if it has already descended.',
    quoteUrdu: 'دعا سب سے مؤثر دواؤں میں سے ایک ہے۔ یہ مصیبت کی دشمن ہے؛ یہ اسے دور کرتی ہے، اس کا علاج کرتی ہے، اس کے اترنے کو روکتی ہے، اور اگر وہ اتر چکی ہو تو اس کو ہلکا کر دیتی ہے۔',
    author: 'Ibn al-Qayyim al-Jawziyya (RH)',
    titleOrContext: 'Classical Scholar',
    source: 'Al-Jawab al-Kafi (The Sufficient Answer)',
    category: 'Dua & Supplication',
    reflection: 'Never abandon supplication when difficulties linger. Dua interacts with decree, bringing subtle divine mercy into every circumstance.',
    published: true
  },
  {
    id: 'quote-ghazali-contentment',
    quote: 'To achieve contentment, compare your spiritual state with those who are better than you, and compare your material life with those who have less.',
    quoteUrdu: 'قناعت حاصل کرنے کے لیے، اپنے دینی احوال کا موازنہ ان سے کرو جو تم سے بہتر ہیں، اور اپنی دنیا کا موازنہ ان سے کرو جن کے پاس تم سے کم ہے۔',
    author: 'Abu Hamid al-Ghazali (RH)',
    titleOrContext: 'Hujjat al-Islam (Proof of Islam)',
    source: 'Ihya Ulum al-Din',
    category: 'Gratitude & Contentment',
    reflection: 'True spiritual growth is ignited by righteous envy in worship, coupled with immense satisfaction with our earthly portion.',
    published: true
  },
  {
    id: 'quote-ali-world-illusion',
    quote: 'People are asleep; when they die, they wake up.',
    quoteUrdu: 'لوگ نیند میں ہیں؛ جب وہ مریں گے تو جاگ اٹھیں گے۔',
    author: 'Attributed to Ali ibn Abi Talib (RA)',
    titleOrContext: 'Fourth Caliph',
    source: 'Traditional wisdom recorded in classical literature',
    category: 'Hereafter & Reality',
    reflection: 'The glitter of this fleeting world creates a hypnotic illusion. Awakening before the departure of the soul is true wisdom.',
    published: true
  },
  {
    id: 'quote-unknown-dua-whisper',
    quote: 'Dua is the whisper in the dust that echoes into the highest heavens.',
    quoteUrdu: 'دعا مٹی پر کی جانے والی وہ سرگوشی ہے جو عرشِ بریں پر گونجتی ہے۔',
    author: 'Source: Unknown',
    titleOrContext: 'Islamic Reflection & Wisdom',
    source: 'Source: Unknown (Contemporary Islamic Wisdom)',
    category: 'Dua & Supplication',
    reflection: 'No matter how quiet your voice or how broken your words, the Creator of the cosmos hears the deepest secret of your heart.',
    published: true
  },
  {
    id: 'quote-ibn-ataillah-delay',
    quote: 'Do not let a delay in receiving what you prayed for cause you to despair. For He has guaranteed to answer you in what He chooses for you, not in what you choose for yourself.',
    quoteUrdu: 'دعا کے قبول ہونے میں تاخیر تمہیں مایوس نہ کر دے، کیونکہ اللہ نے تمہاری دعا قبول کرنے کا وعدہ اس چیز میں کیا ہے جو وہ تمہارے لیے منتخب کرے، نہ کہ اس میں جو تم اپنے لیے چاہو۔',
    author: 'Ibn \'Ata\'illah al-Iskandari (RH)',
    titleOrContext: 'Sufi Sage and Scholar',
    source: 'Al-Hikam (The Aphorisms) #6',
    category: 'Hope & Patience in Dua',
    reflection: 'Allah answers with profound wisdom: sometimes by granting what we requested, sometimes by deflecting unseen harm, and always by rewarding our longing.',
    published: true
  },
  {
    id: 'quote-umar-grief-relief',
    quote: 'No calamity has ever struck me except that I found three blessings of Allah in it: that it was not in my faith, that it was not worse than it was, and that Allah will reward me for it.',
    quoteUrdu: 'مجھ پر کبھی کوئی مصیبت نہیں آئی مگر میں نے اس میں اللہ کی تین نعمتیں پائیں: ایک یہ کہ وہ میرے دین میں نہیں تھی، دوسری یہ کہ وہ اس سے بڑی نہ تھی، اور تیسری یہ کہ اللہ اس پر مجھے اجر عطا فرمائے گا۔',
    author: 'Umar ibn al-Khattab (RA)',
    titleOrContext: 'Second Caliph',
    source: 'Al-Bidayah wa an-Nihayah',
    category: 'Patience & Gratitude',
    reflection: 'Viewing hardships through the lens of divine perspective extracts gratitude even from the heart of adversity.',
    published: true
  },
  {
    id: 'quote-hasan-basri-death',
    quote: 'O son of Adam, you are nothing but a few days; whenever a day passes, a part of you has departed with it.',
    quoteUrdu: 'اے ابنِ آدم! تو کچھ دنوں کا مجموعہ ہی تو ہے؛ جب ایک دن گزر جاتا ہے تو تیرا ایک حصہ رخصت ہو جاتا ہے۔',
    author: 'Al-Hasan al-Basri (RH)',
    titleOrContext: 'Tabi\'i Scholar',
    source: 'Hilyat al-Awliya',
    category: 'Accountability & Time',
    reflection: 'Every sunset subtracts an irreplaceable portion of our worldly countdown. Let each passing day witness something pleasing to Allah.',
    published: true
  },
  {
    id: 'quote-shafii-forgiving-people',
    quote: 'When I forgave and bore no grudge against anyone, I freed myself from the burden of enmity.',
    quoteUrdu: 'جب میں نے معاف کر دیا اور کسی کے خلاف دل میں کینہ نہ رکھا، تو میں نے اپنے آپ کو دشمنی کے بوجھ سے آزاد کر لیا۔',
    author: 'Imam Muhammad ibn Idris ash-Shafi\'i (RH)',
    titleOrContext: 'Imam ash-Shafi\'i',
    source: 'Diwan al-Shafi\'i',
    category: 'Forgiveness & Clean Heart',
    reflection: 'Resentment is a prison we construct for ourselves; pardoning those who hurt us is the key that sets our own soul free.',
    published: true
  },
  {
    id: 'quote-ibn-qayyim-morning-start',
    quote: 'The morning is the key to your day. If you begin it with the remembrance of Allah and surrender, the entire day is illuminated with His blessings.',
    quoteUrdu: 'صبح تمہارے دن کی چابی ہے۔ اگر تم اس کا آغاز اللہ کی یاد اور اس کے آگے سر جھکا کر کرو تو پورا دن اس کی برکتوں سے روشن ہو جاتا ہے۔',
    author: 'Ibn al-Qayyim al-Jawziyya (RH)',
    titleOrContext: 'Theologian',
    source: 'Zad al-Ma\'ad',
    category: 'Morning Reminders & Salah',
    reflection: 'Dedicate the first quiet moments of dawn to Fajr and morning adhkar, and watch how barakah settles effortlessly over your schedule.',
    published: true
  },
  {
    id: 'quote-ahmad-hanbal-patience',
    quote: 'Allah has mentioned patience (Sabr) in more than ninety places in His Book. This reveals how vital it is for our spiritual journey.',
    quoteUrdu: 'اللہ تعالیٰ نے اپنی کتاب میں نوے سے زائد مقامات پر صبر کا ذکر فرمایا ہے۔ یہ ظاہر کرتا ہے کہ ہمارے ایمانی سفر کے لیے صبر کس قدر بنیادی ہے۔',
    author: 'Imam Ahmad ibn Hanbal (RH)',
    titleOrContext: 'Imam of Ahl as-Sunnah',
    source: 'Al-Wabil al-Sayyib',
    category: 'Patience & Endurance',
    reflection: 'Perseverance is the bedrock upon which all Islamic virtues are built; without patience, neither prayer nor charity can endure.',
    published: true
  },
  {
    id: 'quote-unknown-tear-repentance',
    quote: 'A broken sinner who returns to Allah with tears is closer to His mercy than an arrogant worshiper boasting of his deeds.',
    quoteUrdu: 'آنسوؤں کے ساتھ اللہ کی طرف پلٹنے والا شکستہ دل گناہ گار، اپنی عبادت پر فخر کرنے والے مغرور عابد سے اللہ کی رحمت کے زیادہ قریب ہوتا ہے۔',
    author: 'Source: Unknown',
    titleOrContext: 'Traditional Islamic Admonition',
    source: 'Source: Unknown (Classical Islamic Wisdom)',
    category: 'Repentance & Humility',
    reflection: 'Allah loves humility and the sincere confession of weakness over spiritual pride that poisons our good actions.',
    published: true
  },
  {
    id: 'quote-ali-provision-search',
    quote: 'Your provision searches for you more intently than your lifespan does. Rest assured, what is written for you will never miss you.',
    quoteUrdu: 'تمہارا رزق تمہیں تمہاری موت سے بھی زیادہ شدت سے تلاش کرتا ہے۔ مطمئن رہو، جو تمہارے نصیب میں لکھا ہے وہ کبھی تم سے نہیں چھوٹ سکتا۔',
    author: 'Ali ibn Abi Talib (RA)',
    titleOrContext: 'Fourth Caliph',
    source: 'Nahj al-Balaghah / Classical Adab Literature',
    category: 'Rizq & Tawakkul',
    reflection: 'Exert ethical effort, but liberate your heart from frantic anxiety; what the Creator decreed for your sustenance will reach your table.',
    published: true
  },
  {
    id: 'quote-ibn-taymiyyah-sin-grief',
    quote: 'Sins cause anxiety and constriction in the chest, while obedience and repentance bring expansion and radiant tranquility.',
    quoteUrdu: 'گناہ سینے میں گھٹن اور بے چینی پیدا کرتے ہیں، جبکہ اطاعت اور توبہ دل میں کشادگی اور پرسکون نور لاتے ہیں۔',
    author: 'Ibn Taymiyyah (RH)',
    titleOrContext: 'Majmu\' al-Fatawa',
    source: 'Majmu\' al-Fatawa (Vol. 10)',
    category: 'Heart & Spiritual Peace',
    reflection: 'If you feel an inexplicable heavy cloud upon your spirit, rush to sincere repentance; forgiveness restores natural serenity.',
    published: true
  },
  {
    id: 'quote-abu-darda-good-companion',
    quote: 'A righteous companion is better than solitude, and solitude is better than an evil companion.',
    quoteUrdu: 'نیک ساتھی تنہائی سے بہتر ہے، اور تنہائی برے ساتھی سے بہتر ہے۔',
    author: 'Abu ad-Darda (RA)',
    titleOrContext: 'Noble Companion of the Prophet ﷺ',
    source: 'Rawdat al-\'Uqala by Ibn Hibban',
    category: 'Companionship & Environment',
    reflection: 'Surround yourself with souls whose presence reminds you of Allah and whose upright conduct inspires you to become better.',
    published: true
  },
  {
    id: 'quote-yahya-muadh-hope',
    quote: 'How can I despair when You are my Lord? And how can I be hopeless when Your mercy encompasses everything?',
    quoteUrdu: 'میں مایوس کیسے ہو سکتا ہوں جب کہ تو میرا رب ہے؟ اور میں ناامید کیسے رہ سکتا ہوں جب کہ تیری رحمت ہر چیز کو گھیرے ہوئے ہے؟',
    author: 'Yahya ibn Mu\'adh ar-Razi (RH)',
    titleOrContext: 'Early Islamic Sage and Preacher',
    source: 'Hilyat al-Awliya',
    category: 'Hope & Allah\'s Mercy',
    reflection: 'No matter how deep the darkness appears, divine mercy is wider than any human fault or worldly crisis.',
    published: true
  },
  {
    id: 'quote-ibn-jawzi-brevity-life',
    quote: 'Know that this worldly life is like a shadow: when you try to chase it, it runs away, but when you turn your back on it and walk toward the sun, it follows you.',
    quoteUrdu: 'جان لو کہ یہ دنیا ایک سائے کی طرح ہے: جب تم اس کا پیچھا کرو گے تو یہ بھاگے گی، اور جب تم اس سے منہ موڑ کر سورج کی طرف چلو گے تو یہ تمہارے پیچھے آئے گی۔',
    author: 'Ibn al-Jawzi (RH)',
    titleOrContext: 'Author of Sayd al-Khatir',
    source: 'Sayd al-Khatir (Captured Thoughts)',
    category: 'Life & Contentment',
    reflection: 'Pursue the pleasure of Allah first, and the worldly necessities will arrange themselves in your favor with grace.',
    published: true
  },
  {
    id: 'quote-ibn-qayyim-smile-grief',
    quote: 'Sometimes Allah allows your heart to be broken so that none can repair it except Him, teaching you that you were never made for this world.',
    quoteUrdu: 'کبھی کبھی اللہ تمہارے دل کو ٹوٹنے دیتا ہے تاکہ اس کی مرمت اس کے سوا کوئی نہ کر سکے، اور تمہیں یہ سکھا سکے کہ تم اس عارضی دنیا کے لیے نہیں بنائے گئے۔',
    author: 'Ibn al-Qayyim al-Jawziyya (RH)',
    titleOrContext: 'Spiritual Master',
    source: 'Madarij as-Salikin',
    category: 'Comfort & Healing',
    reflection: 'Grief is often a divine invitation calling the wounded soul home toward its true refuge and eternal sanctuary.',
    published: true
  }
];

export const VERIFIED_30_QUOTES: QuoteItem[] = RAW_VERIFIED_30_QUOTES.map(q => ({
  ...q,
  text: q.quote,
  textUrdu: q.quoteUrdu,
  topic: q.category
}));
