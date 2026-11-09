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
  featured?: boolean;
}

export const VERIFIED_25_REMINDERS: ReminderItem[] = [
  {
    id: 'rem-struggle-unseen',
    title: 'Allah Knows the Quiet Tears You Hold Back',
    titleUrdu: 'اللہ آپ کے پوشیدہ آنسوؤں سے بھی باخبر ہے',
    content: 'When you are trying your hardest in silence and no one around you sees the weight you carry, remember that Al-Basir (The All-Seeing) and As-Sami (The All-Hearing) knows every heartbeat. You never have to explain your exhaustion to Allah — He already knows, and His recompense for silent patience will exceed your imagination.',
    contentUrdu: 'جب آپ خاموشی سے اپنی پوری کوشش کر رہے ہوں اور کوئی آپ کا بوجھ نہ دیکھ رہا ہو، تو یاد رکھیں کہ البصیر اور السمیع آپ کی ہر کیفیت سے واقف ہے۔ اللہ کے ہاں صبر کا اجر بے شمار ہے۔',
    relatedAyah: 'And rely upon the Ever-Living who does not die, and exalt [Allah] with His praise.',
    reference: 'Surah Al-Furqan (25:58)',
    topic: 'Anxiety & Relief in Hardship',
    published: true,
    featured: true
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
    published: true,
    featured: true
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
    published: true,
    featured: true
  },
  {
    id: 'rem-delay-wisdom',
    title: 'When Allah Delays What You Ask, He is Preparing What You Need',
    titleUrdu: 'دعا کی قبولیت میں تاخیر الٰہی حکمت کا حصہ ہے',
    content: 'Sometimes we beg for a drop, but Allah delays because He intends to pour forth an ocean when the timing is right. Other times, He withholds because the thing we desire carries hidden destruction for our faith or peace. Trust the Architect of the heavens more than your own limited blueprint.',
    contentUrdu: 'بعض اوقات ہم کسی چھوٹی چیز کے لیے بے چین ہوتے ہیں، مگر اللہ کی حکمت ہمیں اس سے کہیں بہتر نعمت کے لیے تیار کر رہی ہوتی ہے۔ اپنے رب کے فیصلوں پر مکمل بھروسہ رکھیے۔',
    relatedAyah: 'Perhaps you hate a thing and it is good for you; and perhaps you love a thing and it is bad for you. And Allah knows, while you know not.',
    reference: 'Surah Al-Baqarah (2:216)',
    topic: 'Trust in Allah (Tawakkul)',
    published: true,
    featured: true
  },
  {
    id: 'rem-fajr-light',
    title: 'The Silent Quiet of Fajr: Where True Strength is Born',
    titleUrdu: 'فجر کی خاموشی: جہاں روح کو نئی زندگی ملتی ہے',
    content: 'While the rest of the creation sleeps in heedlessness, the believer rises into the cool dawn, washes their limbs, and whispers to the Sovereign of the universe. In that quiet hour, anxiety is dismantled, the day is surrounded by angels, and your heart is anchored before the chaos of the world begins.',
    contentUrdu: 'جب دنیا گہری نیند میں غافل ہوتی ہے، اس وقت فجر کے لیے بیدار ہونا دل کو دنیا کے تمام غموں اور وسوسوں سے آزاد کر دیتا ہے۔',
    relatedAyah: 'Establish prayer at the decline of the sun until the darkness of the night and [also] the Qur\'an of dawn. Indeed, the recitation of dawn is ever witnessed.',
    reference: 'Surah Al-Isra (17:78)',
    topic: 'Salah & Dhikr',
    published: true
  },
  {
    id: 'rem-broken-plans',
    title: 'When Your Plan Shatters, Allah\'s Protection Begins',
    titleUrdu: 'جب آپ کے منصوبے ٹوٹیں تو اللہ کی حکمت کو یاد کیجیے',
    content: 'A missed flight, a rejected proposal, a closed door, an unexpected detour — we call it heartbreak, but in the unseen realm, it may have been Allah shielding you from a tragedy you could not bear. Rest your heart in the knowledge that what was meant for you will never miss you.',
    contentUrdu: 'کسی دروازے کا بند ہونا بظاہر تکلیف دہ لگتا ہے مگر درحقیقت وہ اللہ کی طرف سے کسی بڑے نقصان سے حفاظت بھی ہو سکتا ہے۔',
    relatedAyah: 'And they planned, and Allah planned. And Allah is the best of planners.',
    reference: 'Surah Ali \'Imran (3:54)',
    topic: 'Trust in Allah (Tawakkul)',
    published: true
  },
  {
    id: 'rem-forgiving-others',
    title: 'Forgive Others to Taste the Freedom of Allah\'s Pardon',
    titleUrdu: 'دوسروں کو معاف کیجیے تاکہ اللہ آپ کو معاف فرمائے',
    content: 'Holding onto resentment is drinking poison and expecting the other person to suffer. Let go of grudges not because people necessarily deserve it, but because your soul craves Allah’s pardon. The greatest victory over an injustice is to rise above it and entrust the reckoning to the Just (Al-\'Adl).',
    contentUrdu: 'دل میں نفرت اور غصہ پالنا روح کو بیمار کر دیتا ہے۔ اللہ کے لیے معاف کر دیجیے تاکہ روز قیامت اللہ تعالیٰ آپ کے گناہوں کو معاف فرما دے۔',
    relatedAyah: 'And let them pardon and overlook. Would you not like that Allah should forgive you? And Allah is Forgiving and Merciful.',
    reference: 'Surah An-Nur (24:22)',
    topic: 'Good Character (Husn al-Khuluq)',
    published: true
  },
  {
    id: 'rem-loneliness-companion',
    title: 'When the World Leaves You Lonely, Allah Invites You Closer',
    titleUrdu: 'تنہائی اللہ سے قربت کا بہترین موقع ہے',
    content: 'Loneliness is often misunderstood as isolation, but for the believer, it is a Divine invitation to intimacy with your Creator. People will inevitably misunderstand you, tire of your problems, or move on with their lives. Only Allah listens without boredom, loves without conditions, and heals without leaving scars.',
    contentUrdu: 'جب انسانوں سے دل بھر جائے اور تنہائی کا احساس ہو تو جان لیجیے کہ یہ اللہ کے سامنے سر بسجود ہونے اور اس سے سرگوشی کرنے کا خاص بلاوا ہے۔',
    relatedAyah: 'And He is with you wherever you are. And Allah, of what you do, is Seeing.',
    reference: 'Surah Al-Hadid (57:4)',
    topic: 'Anxiety & Relief in Hardship',
    published: true
  },
  {
    id: 'rem-barakah-not-more',
    title: 'Seek Barakah in Your Hours, Not Just More Hours',
    titleUrdu: 'وقت اور رزق میں برکت کی طلب',
    content: 'Barakah is the divine multiplier. With barakah, a humble salary satisfies a large family, an hour produces a week’s worth of benefit, and a few sincere words touch generations. Barakah arrives through morning prayers, lawful earning, honesty, and family ties.',
    contentUrdu: 'برکت اللہ تعالیٰ کی وہ پوشیدہ عنایت ہے جو تھوڑے مال اور وقت میں بے پناہ وسعت پیدا کر دیتی ہے۔',
    relatedAyah: 'And if only the people of the cities had believed and feared Allah, We would have opened upon them blessings from the heaven and the earth.',
    reference: 'Surah Al-A\'raf (7:96)',
    topic: 'Rizq & Contentment',
    published: true
  },
  {
    id: 'rem-hidden-good-deeds',
    title: 'Cultivate a Secret Good Deed Known Only to the Creator',
    titleUrdu: 'ایک ایسا نیک عمل جو صرف اللہ اور آپ کے درمیان ہو',
    content: 'In an era where every moment is photographed and broadcast, guard the sanctuary of your soul by establishing private worship. A secret charity into an anonymous hand, a quiet rak\'ah in the dead of night, a tear shed behind closed doors — these are the deeds that will illuminate your grave.',
    contentUrdu: 'ہر چیز کی نمائش کے دور میں اپنے لیے کچھ ایسے نیک اعمال چھپا کر رکھیے جن کی خبر اللہ کے سوا کسی انسان کو نہ ہو۔ یہی اعمال دل میں اخلاص پیدا کرتے ہیں۔',
    relatedAyah: 'If you disclose your charitable expenditures, they are good; but if you conceal them and give them to the poor, it is better for you.',
    reference: 'Surah Al-Baqarah (2:271)',
    topic: 'Faith & Tawakkul',
    published: true
  },
  {
    id: 'rem-patience-first-shock',
    title: 'True Patience is at the Very First Shock of Grief',
    titleUrdu: 'صبر کا اصل امتحان صدمے کے پہلے لمحے میں ہے',
    content: 'Anyone can accept a loss after months have passed and time has dulled the pain. The noble character praised by the Prophet ﷺ is the soul that swallows the scream, lowers the head in submission, and murmurs "Inna lillahi wa inna ilayhi raji\'un" the very second tragedy strikes.',
    contentUrdu: 'حقیقی صبر وہ ہے جو کسی ناگوار خبر یا اچانک صدمے کے فوراً بعد نفس پر قابو پا کر زبان سے کلمۂ استرجاع ادا کرنے کی صورت میں ظاہر ہو۔',
    relatedAyah: 'Who, when disaster strikes them, say, "Indeed we belong to Allah, and indeed to Him we will return."',
    reference: 'Surah Al-Baqarah (2:156)',
    topic: 'Patience (Sabr)',
    published: true
  },
  {
    id: 'rem-tahajjud-whisper',
    title: 'The Arrow of Tahajjud Never Misses Its Mark',
    titleUrdu: 'تہجد کی دعا نشانے پر لگنے والا تیر ہے',
    content: 'Imam ash-Shafi\'i said: "The du\'a made at Tahajjud is like an arrow which does not miss its target, but rather strikes with accuracy, although it has an appointed time to arrive." When you place your forehead on the earth while the world sleeps, you are speaking directly with the Sovereign of every throne.',
    contentUrdu: 'امام شافعی نے فرمایا: تہجد کی دعا ایسے تیر کی مانند ہے جو کبھی خطا نہیں جاتا۔ رات کی تنہائی میں مانگی گئی دعا دیر یا سویر ضرور قبول ہوتی ہے۔',
    relatedAyah: 'And from [part of] the night, pray with it as additional [worship] for you; it is expected that your Lord will resurrect you to a praised station.',
    reference: 'Surah Al-Isra (17:79)',
    topic: 'Salah & Dhikr',
    published: true
  },
  {
    id: 'rem-good-opinion-allah',
    title: 'Never Lose Your Good Opinion (Husn al-Dhann) of Allah',
    titleUrdu: 'اللہ تعالیٰ کے ساتھ ہمیشہ نیک گمان رکھیے',
    content: 'Allah says in a Hadith Qudsi: "I am as My servant expects Me to be." If you expect mercy, you will discover oceans of it. If you expect forgiveness, He is waiting to pardon you. Even in your darkest moments, maintain high thoughts of Allah’s gentleness and wisdom.',
    contentUrdu: 'اللہ تعالیٰ اپنے بندے کے گمان کے مطابق معاملہ فرماتا ہے۔ اگر آپ اللہ سے خیر اور رحمت کی امید رکھیں گے تو وہ آپ کو کبھی مایوس نہیں کرے گا۔',
    relatedAyah: 'And He is the Forgiving, the Affectionate, Honorable Owner of the Throne.',
    reference: 'Surah Al-Buruj (85:14–15)',
    topic: 'Hope & Mercy',
    published: true
  },
  {
    id: 'rem-tongue-silence',
    title: 'Silence in Moments of Provocation is a Crown of Wisdom',
    titleUrdu: 'اشتعال کے وقت خاموشی دانائی کا تاج ہے',
    content: 'It takes seconds to utter words that shatter a heart, destroy a marriage, or sever family ties that took decades to build. When provoked, swallow your pride. The Prophet ﷺ guaranteed a palace in the outskirts of Paradise for whoever leaves an argument even when they are right.',
    contentUrdu: 'غصے اور بحث کے وقت خاموش رہنا نفس کی سب سے بڑی فتح ہے۔ چند لمحوں کی خاموشی سالوں کے رشتوں کو ٹوٹنے سے بچا لیتی ہے۔',
    relatedAyah: 'And tell My servants to say that which is best. Indeed, Satan induces [dissension] among them.',
    reference: 'Surah Al-Isra (17:53)',
    topic: 'Good Character (Husn al-Khuluq)',
    published: true
  },
  {
    id: 'rem-charity-pure-wealth',
    title: 'Charity Never Diminishes Wealth; It Purifies and Expands It',
    titleUrdu: 'صدقہ مال کو کم نہیں کرتا بلکہ پاک اور وسیع کرتا ہے',
    content: 'The mathematics of the Dunya say giving away $50 leaves you with less. The mathematics of the Akhirah say that the only wealth you truly preserve forever is the wealth you sent ahead to the needy. Charity cools the wrath of the Lord, removes calamities, and brings physical and spiritual healing.',
    contentUrdu: 'دنیاوی حساب سے صدقہ دینے سے مال کم ہوتا ہے مگر آخرت کے حساب سے وہی مال بچتا ہے جو اللہ کے راستے میں خرچ کیا جائے۔ صدقہ بلائیں ٹالتا ہے۔',
    relatedAyah: 'Whatever you spend of anything [in His cause] - He will compensate it; and He is the best of providers.',
    reference: 'Surah Saba (34:39)',
    topic: 'Rizq & Contentment',
    published: true
  },
  {
    id: 'rem-gentleness-family',
    title: 'True Piety Shines Brightest Behind Your Own Front Door',
    titleUrdu: 'اصل حسن اخلاق اپنے گھر والوں کے ساتھ ہے',
    content: 'It is easy to smile at colleagues, speak politely to strangers, and display an angelic persona in public. But true prophetic character is tested when you walk inside your home after an exhausting day. How do you treat your parents, your spouse, and your children? The best among you are those best to their families.',
    contentUrdu: 'باہر کے لوگوں کے ساتھ خوش اخلاقی آسان ہے مگر اصل امتحان گھر کے اندر والدین، شریک حیات اور بچوں کے ساتھ نرمی اور محبت سے پیش آنا ہے۔',
    relatedAyah: 'And live with them in kindness. For if you dislike them - perhaps you dislike a thing and Allah makes therein much good.',
    reference: 'Surah An-Nisa (4:19)',
    topic: 'Parents & Family',
    published: true
  },
  {
    id: 'rem-tested-because-loved',
    title: 'Gold is Purified in the Furnace: Trials Prove Divine Love',
    titleUrdu: 'آزمائشیں عذاب نہیں بلکہ گناہوں کی صفائی اور درجات کی بلندی ہیں',
    content: 'Do not interpret every difficulty in your life as a sign of divine anger. The most beloved human beings to Allah — the Prophets — endured the heaviest tribulations. Hardships peel away worldly illusions, awaken sleeping hearts, and elevate your rank to stations your deeds alone could never achieve.',
    contentUrdu: 'تکلیف کو ہمیشہ عذاب نہ سمجھیے۔ انبیاء علیہم السلام نے سب سے زیادہ آزمائشیں جھیلیں۔ آزمائش مومن کے گناہ جھاڑ دیتی ہے جیسے درخت سے سوکھے پتے گرتے ہیں۔',
    relatedAyah: 'Do the people think that they will be left to say, "We believe" and they will not be tried?',
    reference: 'Surah Al-\'Ankabut (29:2)',
    topic: 'Difficult Times',
    published: true
  },
  {
    id: 'rem-small-deeds-count',
    title: 'Never Underestimate the Weight of a "Small" Good Deed',
    titleUrdu: 'کسی چھوٹی نیکی کو بھی حقیر مت جانیے',
    content: 'A kind word that restored hope to someone feeling down, removing a sharp stone from a pathway, feeding a stray animal, or sharing a warm smile — on the Day when scales are weighed to the atom’s weight, that one seemingly trivial deed may be the very thing that tips the scale toward Paradise.',
    contentUrdu: 'ایک مسکراہٹ، راستے سے تکلیف دہ چیز ہٹانا یا کسی کا دکھ سن لینا، قیامت کے دن ترازو میں پہاڑ جتنا وزنی ثابت ہو سکتا ہے۔',
    relatedAyah: 'So whoever does an atom\'s weight of good will see it.',
    reference: 'Surah Az-Zalzalah (99:7)',
    topic: 'Good Character (Husn al-Khuluq)',
    published: true
  },
  {
    id: 'rem-world-is-temporary',
    title: 'Live in This World Like a Traveler Resting Under Shade',
    titleUrdu: 'دنیا ایک عارضی مسافر خانے کی طرح ہے',
    content: 'The Prophet ﷺ compared our stay in this world to a rider who rests beneath the shade of a tree on a scorching day, then gets up and departs. Do not build permanent castles of attachment in a transient world. Pack your luggage with faith, sincerity, and good deeds for your eternal home in Jannah.',
    contentUrdu: 'ہم اس دنیا میں ایک مسافر کی طرح ہیں جو کسی درخت کے سائے تلے تھوڑی دیر سستا کر آگے نکل جاتا ہے۔ اصل مستقل گھر آخرت کا ہے۔',
    relatedAyah: 'And the worldly life is not but amusement and diversion; but the home of the Hereafter is best for those who fear Allah.',
    reference: 'Surah Al-An\'am (6:32)',
    topic: 'The Hereafter & Jannah',
    published: true
  },
  {
    id: 'rem-allah-nearer-vein',
    title: 'You Are Never As Alone As Your Overthinking Claims',
    titleUrdu: 'اللہ آپ کی شہ رگ سے بھی زیادہ قریب ہے',
    content: 'When the late hours of the night fill your mind with what-ifs and silent dread, remind yourself: Allah did not bring you this far to abandon you. He sustained you when you were an embryo in the darkness of the womb; He will not forsake you now when you are calling upon Him in faith.',
    contentUrdu: 'جب رات کے اندھیرے میں مستقبل کا خوف اور مایوسی دل کو گھیر لے، تو یاد کیجیے کہ جس رب نے آپ کو ماں کے پیٹ میں رزق دیا، وہ اب آپ کو تنہا نہیں چھوڑے گا۔',
    relatedAyah: 'And We are closer to him than [his] jugular vein.',
    reference: 'Surah Qaf (50:16)',
    topic: 'Anxiety & Relief in Hardship',
    published: true
  },
  {
    id: 'rem-dua-never-wasted',
    title: 'Three Divine Guarantees for Every Sincere Du\'a You Make',
    titleUrdu: 'کوئی بھی مخلصانہ دعا کبھی رائیگاں نہیں جاتی',
    content: 'The Prophet ﷺ taught that whenever a believer supplicates without asking for sin or cutting family ties, Allah grants one of three things: either He gives what was asked in this world, or He averts an equivalent disaster from their life, or He stores it as radiant treasure for the Day of Judgment.',
    contentUrdu: 'ہر دعا یا تو دنیا میں پوری ہوتی ہے، یا اس کے بدلے کوئی بڑی مصیبت ٹال دی جاتی ہے، یا پھر آخرت کے لیے اجر کی صورت میں محفوظ کر لی جاتی ہے۔',
    relatedAyah: 'And your Lord says, "Call upon Me; I will respond to you."',
    reference: 'Surah Ghafir (40:60)',
    topic: 'Salah & Dhikr',
    published: true
  },
  {
    id: 'rem-gratitude-ordinary',
    title: 'Appreciate the Ordinary Blessings Before You Long for Them',
    titleUrdu: 'معمولی سمجھی جانے والی نعمتوں کی قدر کیجیے',
    content: 'The ability to breathe without a machine, the blessing of restful sleep, clean drinking water, eyesight to read these words, a mind that functions — we search endlessly for massive miracles while standing submerged in an ocean of daily Divine mercy. Say Alhamdulillah with a conscious, humbled heart.',
    contentUrdu: 'صاف پانی، بلا تکلیف سانس لینا اور آنکھوں کی بینائی وہ انمول نعمتیں ہیں جن کا شکر ہم اکثر بھول جاتے ہیں۔ دل کی گہرائی سے الحمد للہ کہیے۔',
    relatedAyah: 'And if you should count the favors of Allah, you could not enumerate them. Indeed, Allah is Forgiving and Merciful.',
    reference: 'Surah An-Nahl (16:18)',
    topic: 'Gratitude (Shukr)',
    published: true
  },
  {
    id: 'rem-sincere-heart',
    title: 'Allah Looks Directly at the Condition of Your Heart',
    titleUrdu: 'اللہ تعالیٰ صورتوں کو نہیں بلکہ دلوں اور نیتوں کو دیکھتا ہے',
    content: 'Men admire wealth, flawless skin, expensive garments, and prestigious titles. But the King of kings looks past all external garments, directly into the intentions, humility, and sincerity residing within your chest. An unseen, broken heart crying out in repentance is worth more than mountains of ostentatious deeds.',
    contentUrdu: 'لوگ ظاہری چمک دمک اور مال و دولت کو دیکھتے ہیں، مگر اللہ تعالیٰ انسان کے دل کی پاکیزگی اور خلوص نیت کا فیصلہ فرماتا ہے۔',
    relatedAyah: 'The Day when there will not benefit [anyone] wealth or children, but only one who comes to Allah with a sound heart.',
    reference: 'Surah Ash-Shu\'ara (26:88–89)',
    topic: 'Faith & Tawakkul',
    published: true
  },
  {
    id: 'rem-peace-in-dhikr',
    title: 'The Divine Remedy for an Anxious and Restless Mind',
    titleUrdu: 'بے چین دلوں کے لیے اللہ کے ذکر سے بڑھ کر کوئی سکون نہیں',
    content: 'When social media, work pressures, and worldly noise leave your spirit feeling completely drained and fragmented, disconnect from the creation and connect with the Creator. Repeating "Subhan Allah", "Alhamdulillah", and "La ilaha illa Allah" realigns the soul with its original purpose.',
    contentUrdu: 'دنیا کی مصروفیات اور پریشانیاں جب دل کو بوجھل کر دیں تو ذکر الٰہی میں پناہ لیجیے۔ دلوں کو سچا اور پائیدار سکون صرف یادِ الٰہی سے ملتا ہے۔',
    relatedAyah: 'Unquestionably, by the remembrance of Allah hearts are assured.',
    reference: 'Surah Ar-Ra\'d (13:28)',
    topic: 'Salah & Dhikr',
    published: true
  },
  {
    id: 'rem-the-final-meeting',
    title: 'Live Today as if It Might Be Your Final Chapter',
    titleUrdu: 'آج کے دن کو اپنی زندگی کا آخری دن سمجھ کر گزاریے',
    content: 'Graveyards are full of souls who intended to repent tomorrow, pray Tahajjud next month, or seek forgiveness from their parents once they had more free time. Tomorrow is promised to no one. Pray your next prayer as a farewell prayer, speak words of peace, and sleep with a heart washed clean of malice.',
    contentUrdu: 'قبرستان ایسے لوگوں سے بھرے ہیں جو کل توبہ کرنے کا ارادہ رکھتے تھے۔ کل کسی نے نہیں دیکھا۔ اپنی ہر نماز کو اپنی آخری نماز سمجھ کر ادا کیجیے۔',
    relatedAyah: 'And spend [in the way of Allah] from what We have provided you before death approaches one of you...',
    reference: 'Surah Al-Munafiqun (63:10)',
    topic: 'The Hereafter & Jannah',
    published: true
  }
];
