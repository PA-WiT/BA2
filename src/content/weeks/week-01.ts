// Migrated from ../../../../course/_shared/question-banks/week-01.questions.js and
// ../../../../course/_shared/i18n/week-01.strings.js (see the migrate-week-content skill).
// Fully migrated: all 12 sections, en/ar/fa.
import type { Question, Week } from '../types'

const questions: Question[] = [
  {
    id: 'w01-q001',
    weekId: 'week-01',
    topic: 'welcome',
    answer: 1,
    prompt: {
      en: "Why can't Excel take over once a company's sales data lives in a live database with millions of rows?",
      ar: 'لماذا لا يستطيع Excel التعامل مع بيانات المبيعات بمجرد أن تعيش في قاعدة بيانات حية بملايين الصفوف؟',
      fa: 'چرا Excel نمی‌تواند وقتی داده‌های فروش یک شرکت در پایگاه داده‌ای زنده با میلیون‌ها ردیف زندگی می‌کند، کار را ادامه دهد؟',
    },
    options: [
      {
        en: "Excel can't display negative numbers",
        ar: 'لا يستطيع Excel عرض الأرقام السالبة',
        fa: 'Excel نمی‌تواند اعداد منفی را نمایش دهد',
      },
      {
        en: "Excel loads the whole dataset into memory and isn't built to query a live, constantly-changing database",
        ar: 'يحمّل Excel كامل البيانات في الذاكرة وليس مصمماً للاستعلام عن قاعدة بيانات حية ومتغيرة باستمرار',
        fa: 'Excel کل داده را در حافظه بارگذاری می‌کند و برای پرس‌وجو از پایگاه داده‌ای زنده و همواره در حال تغییر ساخته نشده',
      },
      {
        en: "Excel doesn't support the AVERAGE function on large datasets",
        ar: 'لا يدعم Excel دالة AVERAGE على البيانات الكبيرة',
        fa: 'Excel از تابع AVERAGE روی داده‌های بزرگ پشتیبانی نمی‌کند',
      },
    ],
  },
  {
    id: 'w01-q002',
    weekId: 'week-01',
    topic: 'sampling',
    answer: 2,
    prompt: {
      en: 'In SQL, which clause plays the same role as BA1\'s idea of "choosing your sample"?',
      ar: 'في SQL، أي عبارة تلعب نفس دور فكرة BA1 عن "اختيار عيّنتك"؟',
      fa: 'در SQL، کدام عبارت همان نقش ایدهٔ BA1 دربارهٔ «انتخاب نمونه‌ات» را بازی می‌کند؟',
    },
    options: [
      { en: 'SELECT', ar: 'SELECT', fa: 'SELECT' },
      { en: 'FROM', ar: 'FROM', fa: 'FROM' },
      { en: 'WHERE', ar: 'WHERE', fa: 'WHERE' },
    ],
  },
  {
    id: 'w01-q003',
    weekId: 'week-01',
    topic: 'avg-count-sum',
    answer: 0,
    prompt: {
      en: 'What is AVG(revenue) actually computing under the hood?',
      ar: 'ما الذي تحسبه AVG(revenue) فعليًا تحت الغطاء؟',
      fa: 'AVG(revenue) در پشت صحنه واقعاً چه چیزی را محاسبه می‌کند؟',
    },
    options: [
      { en: 'SUM(revenue) / COUNT(revenue)', ar: 'SUM(revenue) / COUNT(revenue)', fa: 'SUM(revenue) / COUNT(revenue)' },
      { en: 'COUNT(revenue) / SUM(revenue)', ar: 'COUNT(revenue) / SUM(revenue)', fa: 'COUNT(revenue) / SUM(revenue)' },
      {
        en: 'SUM(revenue) / COUNT(*) always, even with NULLs',
        ar: 'SUM(revenue) / COUNT(*) دائمًا، حتى مع القيم NULL',
        fa: 'SUM(revenue) / COUNT(*) همیشه، حتی با مقادیر NULL',
      },
    ],
  },
  {
    id: 'w01-q004',
    weekId: 'week-01',
    topic: 'stddev',
    answer: 1,
    prompt: {
      en: "You're computing a standard deviation from a sample of past sales (not the entire population of all sales ever). Which function should you use?",
      ar: 'تحسب انحرافًا معياريًا من عيّنة من المبيعات السابقة (وليس كامل مجتمع كل المبيعات على الإطلاق). أي دالة يجب أن تستخدم؟',
      fa: 'می‌خواهی انحراف معیار را از یک نمونهٔ فروش‌های گذشته محاسبه کنی (نه کل جامعهٔ همهٔ فروش‌ها). از کدام تابع باید استفاده کنی؟',
    },
    options: [
      { en: 'STDDEV_POP()', ar: 'STDDEV_POP()', fa: 'STDDEV_POP()' },
      { en: 'STDDEV_SAMP()', ar: 'STDDEV_SAMP()', fa: 'STDDEV_SAMP()' },
      {
        en: 'They always return the same number',
        ar: 'تُعيدان دائمًا نفس الرقم',
        fa: 'هر دو همیشه همان عدد را برمی‌گردانند',
      },
    ],
  },
  {
    id: 'w01-q005',
    weekId: 'week-01',
    topic: 'groupby-freq',
    answer: 0,
    prompt: {
      en: 'GROUP BY revenue_bucket, COUNT(*) produces a table of buckets and counts. What is this the SQL equivalent of?',
      ar: 'تنتج GROUP BY revenue_bucket, COUNT(*) جدولاً من الفئات وأعدادها. ما الذي يعادله هذا في SQL؟',
      fa: 'GROUP BY revenue_bucket, COUNT(*) جدولی از بازه‌ها و شمارش‌ها تولید می‌کند. این معادل SQLایِ چه چیزی است؟',
    },
    options: [
      {
        en: 'A frequency distribution / histogram',
        ar: 'توزيع تكراري / رسم بياني (هيستوغرام)',
        fa: 'توزیع فراوانی / هیستوگرام',
      },
      { en: 'A standard deviation', ar: 'انحراف معياري', fa: 'انحراف معیار' },
      { en: 'A JOIN', ar: 'عملية JOIN', fa: 'یک عملیات JOIN' },
    ],
  },
  {
    id: 'w01-q006',
    weekId: 'week-01',
    topic: 'median',
    answer: 2,
    prompt: {
      en: "Why doesn't PostgreSQL ship a simple MEDIAN() function the way it ships AVG()?",
      ar: 'لماذا لا يوفر PostgreSQL دالة MEDIAN() بسيطة كما يوفر AVG()؟',
      fa: 'چرا PostgreSQL تابع سادهٔ MEDIAN() را همان‌طور که AVG() را دارد، ارائه نمی‌دهد؟',
    },
    options: [
      {
        en: 'PostgreSQL considers the median a meaningless statistic',
        ar: 'يعتبر PostgreSQL أن الوسيط إحصاء بلا معنى',
        fa: 'PostgreSQL میانه را آماری بی‌معنا می‌داند',
      },
      {
        en: 'The median can only be computed on integers',
        ar: 'لا يمكن حساب الوسيط إلا على الأعداد الصحيحة',
        fa: 'میانه فقط روی اعداد صحیح قابل محاسبه است',
      },
      {
        en: 'The median requires the data to be fully sorted first, unlike single-pass aggregates like SUM/AVG',
        ar: 'يتطلب الوسيط ترتيب البيانات بالكامل أولاً، بخلاف الدوال التجميعية أحادية المرور مثل SUM/AVG',
        fa: 'میانه ابتدا نیاز دارد داده کاملاً مرتب شود، برخلاف توابع تجمیعی تک‌گذر مثل SUM/AVG',
      },
    ],
  },
  {
    id: 'w01-q007',
    weekId: 'week-01',
    topic: 'groupby-segment',
    answer: 1,
    prompt: {
      en: "Grouping the clearance data by region and comparing each region's average revenue is closest to which BA1 analytics level?",
      ar: 'تجميع بيانات التخفيضات حسب المنطقة ومقارنة متوسط إيراد كل منطقة أقرب إلى أي مستوى من مستويات BA1 التحليلية؟',
      fa: 'گروه‌بندی داده‌های تسویه بر اساس منطقه و مقایسهٔ میانگین درآمد هر منطقه، به کدام سطح تحلیلی BA1 نزدیک‌تر است؟',
    },
    options: [
      { en: 'Descriptive — what happened', ar: 'وصفي — ماذا حدث', fa: 'توصیفی — چه اتفاقی افتاد' },
      {
        en: 'Diagnostic — why it happened, by comparing segments',
        ar: 'تشخيصي — لماذا حدث، عبر مقارنة الفئات',
        fa: 'تشخیصی — چرا اتفاق افتاد، با مقایسهٔ بخش‌ها',
      },
      { en: 'Prescriptive — what to do next', ar: 'توجيهي — ماذا نفعل تاليًا', fa: 'تجویزی — بعد چه باید کرد' },
    ],
  },
  {
    id: 'w01-q008',
    weekId: 'week-01',
    topic: 'ai-corner',
    answer: 0,
    prompt: {
      en: 'An AI assistant writes a STDDEV query that divides the sum of squared deviations by n instead of n-1. Which of the three checks catches this?',
      ar: 'يكتب مساعد ذكاء اصطناعي استعلام STDDEV يقسم مجموع مربعات الانحرافات على n بدلاً من n-1. أي من الفحوصات الثلاثة يرصد هذا؟',
      fa: 'یک دستیار هوش مصنوعی پرس‌وجوی STDDEV ای می‌نویسد که مجموع انحراف‌های به‌توان‌رسیده را بر n به‌جای n-1 تقسیم می‌کند. کدام یک از سه فحص این را می‌گیرد؟',
    },
    options: [
      { en: 'Verify it', ar: 'تحقق منه', fa: 'تأییدش کن' },
      { en: 'Explain it', ar: 'اشرحه', fa: 'توضیحش بده' },
      { en: 'Stand behind it', ar: 'اضمنه باسمك', fa: 'پشتش بایست' },
    ],
  },
  {
    id: 'w01-q009',
    weekId: 'week-01',
    topic: 'worked-example',
    answer: 2,
    prompt: {
      en: 'Across the four store regions, which had both the highest average revenue per sale AND the highest spread?',
      ar: 'عبر المناطق الأربع للمتجر، أي منها كان لديها أعلى متوسط إيراد للبيع الواحد وأعلى تشتت في آن؟',
      fa: 'در میان چهار منطقهٔ فروشگاه، کدام‌یک هم بالاترین میانگین درآمد به‌ازای هر فروش و هم بیشترین پراکندگی را داشت؟',
    },
    options: [
      { en: 'North', ar: 'الشمال', fa: 'شمال' },
      { en: 'South', ar: 'الجنوب', fa: 'جنوب' },
      { en: 'East', ar: 'الشرق', fa: 'شرق' },
    ],
  },
]

export const weekOne: Week = {
  id: 'week-01',
  originalPdf: '/originals/week-01.pdf',
  order: 1,
  preview: true,
  cover: {
    kicker: {
      en: 'Business Analytics 2 · Week 1',
      ar: 'تحليلات الأعمال 2 · الأسبوع 1',
      fa: 'تحلیل کسب‌وکار ۲ · هفته ۱',
    },
    titleHtml: {
      en: '<h1>Statistics at Scale:<em>Computing What You Already Understand</em></h1><p class="lede">You already know what a mean, a median, and a standard deviation are — BA1 covered that. This week is about a different problem entirely: computing them when your data lives in a database with millions of rows, not a spreadsheet you can see all of at once.</p>',
      ar: '<h1>الإحصاء على نطاق واسع:<em>حساب ما تعرفه بالفعل</em></h1><p class="lede">أنت تعرف بالفعل ما هو المتوسط والوسيط والانحراف المعياري — BA1 غطّى ذلك. هذا الأسبوع يتناول مشكلة مختلفة تمامًا: حساب هذه القيم عندما تعيش بياناتك في قاعدة بيانات بملايين الصفوف، لا في جدول بيانات يمكنك رؤيته كاملاً دفعة واحدة.</p>',
      fa: '<h1>آمار در مقیاس بزرگ:<em>محاسبهٔ چیزی که از قبل می‌دانی</em></h1><p class="lede">تو از قبل می‌دانی میانگین، میانه و انحراف معیار چه هستند — BA1 آن را پوشش داد. این هفته دربارهٔ مسئله‌ای کاملاً متفاوت است: محاسبهٔ همین مقادیر وقتی داده‌هایت در پایگاه داده‌ای با میلیون‌ها ردیف زندگی می‌کند، نه در صفحه‌گسترده‌ای که بتوانی یکجا و کامل ببینی.</p>',
    },
    timeEstimate: {
      en: '≈ 55 min · reading + SQL practice',
      ar: '≈ ٥٥ دقيقة · قراءة وتدريب SQL',
      fa: '≈ ۵۵ دقیقه · مطالعه و تمرین SQL',
    },
  },
  questions,
  sections: [
    {
      id: 'welcome',
      navLabel: { en: 'Welcome', ar: 'ترحيب', fa: 'خوش‌آمدید' },
      sectionLabel: { en: 'Section 01', ar: 'القسم ٠١', fa: 'بخش ۰۱' },
      timeEst: { en: '8 min', ar: '٨ دقائق', fa: '۸ دقیقه' },
      headingHtml: {
        en: '<h2>Welcome: same numbers, new instrument</h2><p class="standfirst">Nothing about what a mean or a standard deviation <em>means</em> has changed. What\'s changed is the tool you reach for.</p>',
        ar: '<h2>ترحيب: نفس الأرقام، أداة جديدة</h2><p class="standfirst">لا شيء تغيّر في معنى المتوسط أو الانحراف المعياري. ما تغيّر هو الأداة التي تلجأ إليها.</p>',
        fa: '<h2>خوش‌آمدید: همان اعداد، ابزاری تازه</h2><p class="standfirst">هیچ‌چیز دربارهٔ اینکه میانگین یا انحراف معیار <em>چه معنایی</em> دارند تغییر نکرده است. آنچه تغییر کرده، ابزاری است که به سراغش می‌روی.</p>',
      },
      blocks: [
        {
          type: 'objectives',
          label: {
            en: "By the end, you'll be able to",
            ar: 'بنهاية هذا القسم ستكون قادرًا على',
            fa: 'در پایان این بخش می‌توانی',
          },
          items: [
            {
              en: 'Explain why a live company database calls for SQL instead of Excel',
              ar: 'توضيح سبب حاجة قاعدة بيانات الشركة الحية إلى SQL بدلاً من Excel',
              fa: 'توضیح دهی چرا پایگاه داده زندهٔ یک شرکت به SQL نیاز دارد، نه Excel',
            },
            {
              en: 'Set up a free, no-signup PostgreSQL sandbox and load a real dataset into it',
              ar: 'إعداد بيئة PostgreSQL تجريبية مجانية دون تسجيل، وتحميل بيانات حقيقية إليها',
              fa: 'یک محیط آزمایشی رایگان PostgreSQL بدون نیاز به ثبت‌نام راه‌اندازی کنی و داده‌ای واقعی در آن بارگذاری کنی',
            },
            {
              en: 'Recognize that every statistic BA1 taught you still applies — only the computation method changes',
              ar: 'إدراك أن كل إحصاء علّمك إياه BA1 ما زال ساريًا — فقط طريقة الحساب هي التي تتغيّر',
              fa: 'دریابی که هر آماری که BA1 به تو آموخت هنوز معتبر است — فقط روش محاسبه تغییر می‌کند',
            },
          ],
        },
        {
          type: 'html',
          html: {
            en: '<p>In BA1, "the data" meant a table you could open in Excel, scroll through, and see in its entirety. Real company data doesn\'t work that way. A retail chain\'s sales history lives in a database with millions of rows, updated every minute, shared by dozens of systems at once. You can\'t email someone a spreadsheet of it. You can\'t even open all of it in Excel — most spreadsheet software caps out around a million rows, and even under that cap, formulas that scan every row get painfully slow.</p><p>SQL (Structured Query Language) is how you talk to a database instead. This week doesn\'t teach you new statistics — it teaches you to ask a database for the same mean, median, and standard deviation you already know how to interpret, using a different set of hands.</p>',
            ar: '<p>في BA1، كانت "البيانات" تعني جدولاً يمكنك فتحه في Excel، والتمرير خلاله، ورؤيته كاملاً. بيانات الشركات الحقيقية لا تعمل هكذا. سجل مبيعات سلسلة متاجر تجزئة يعيش في قاعدة بيانات بملايين الصفوف، تُحدَّث كل دقيقة، وتشاركها عشرات الأنظمة في آن واحد. لا يمكنك إرسال جدول بيانات لها بالبريد الإلكتروني. لا يمكنك حتى فتحها كاملة في Excel — معظم برامج جداول البيانات تتوقف عند حوالي مليون صف، وحتى دون هذا الحد، تصبح الصيغ التي تفحص كل صف بطيئة بشكل مؤلم.</p><p>SQL (لغة الاستعلام البنيوية) هي طريقتك للتحدث مع قاعدة البيانات بدلاً من ذلك. هذا الأسبوع لا يعلّمك إحصاءً جديدًا — بل يعلّمك أن تطلب من قاعدة البيانات نفس المتوسط والوسيط والانحراف المعياري الذي تعرف بالفعل كيف تفسره، لكن بأدوات مختلفة.</p>',
            fa: '<p>در BA1، «داده» یعنی جدولی که می‌توانستی در Excel باز کنی، در آن پیمایش کنی و کاملش را ببینی. داده‌های واقعی شرکت این‌گونه کار نمی‌کنند. تاریخچهٔ فروش یک زنجیرهٔ خرده‌فروشی در پایگاه داده‌ای با میلیون‌ها ردیف زندگی می‌کند، هر دقیقه به‌روزرسانی می‌شود و همزمان بین ده‌ها سامانه به اشتراک گذاشته می‌شود. نمی‌توانی آن را به‌صورت یک صفحه‌گسترده برای کسی ایمیل کنی. حتی نمی‌توانی همهٔ آن را در Excel باز کنی — بیشتر نرم‌افزارهای صفحه‌گسترده حدود یک میلیون ردیف سقف دارند، و حتی زیر همین سقف، فرمول‌هایی که هر ردیف را پویش می‌کنند به‌شدت کند می‌شوند.</p><p>SQL (زبان پرس‌وجوی ساخت‌یافته) روشی است که به‌جای آن با پایگاه داده گفت‌وگو می‌کنی. این هفته آمار تازه‌ای به تو نمی‌آموزد — بلکه به تو می‌آموزد که همان میانگین، میانه و انحراف معیاری را که از قبل می‌دانی چگونه تفسیر کنی، از پایگاه داده بخواهی، با ابزاری متفاوت.</p>',
          },
        },
        {
          type: 'html',
          html: {
            en: '<p>Here\'s the situation you\'re stepping into: a winter-coat retail chain ran the same clearance sale across four regions — North, South, East, and West — each store manager choosing their own discount depth. The data from all 28 sales now sits in one live table, and the regional director wants an answer to one concrete question: <strong>did any region\'s discount strategy clearly outperform the others, and if so, should the whole chain copy it next season?</strong> Answering that honestly means computing an average, a spread, and a median for each region and comparing them — not eyeballing a printout. That\'s what Sections 2 through 9 build toward, and Section 9 comes back to this exact question with the real numbers.</p>',
            ar: '<p>إليك الموقف الذي تدخل إليه: أدارت سلسلة متاجر معاطف شتوية نفس تخفيضات التصفية عبر أربع مناطق — الشمال والجنوب والشرق والغرب — واختار كل مدير متجر عمق الخصم بنفسه. تجلس بيانات المبيعات الـ٢٨ جميعها الآن في جدول حي واحد، ويريد المدير الإقليمي إجابة عن سؤال محدد واحد: <strong>هل تفوقت استراتيجية خصم أي منطقة بوضوح على البقية، وإن كان الأمر كذلك، هل ينبغي أن تنسخها السلسلة بأكملها الموسم القادم؟</strong> الإجابة الصادقة عن هذا تعني حساب متوسط وتشتت ووسيط لكل منطقة ومقارنتها — لا تخمين ذلك من نظرة سريعة على البيانات المطبوعة. هذا ما تبنيه الأقسام من ٢ إلى ٩، ويعود القسم ٩ إلى هذا السؤال بالذات مع الأرقام الحقيقية.</p>',
            fa: '<p>این وضعیتی است که وارد آن می‌شوی: یک زنجیرهٔ خرده‌فروشی معطف زمستانی همان حراج تسویه را در چهار منطقه اجرا کرد — شمال، جنوب، شرق و غرب — و هر مدیر فروشگاه عمق تخفیف خودش را انتخاب کرد. داده‌های هر ۲۸ فروش اکنون در یک جدول زنده نشسته‌اند، و مدیر منطقه‌ای پاسخ یک سؤال مشخص را می‌خواهد: <strong>آیا استراتژی تخفیف هیچ منطقه‌ای به‌روشنی از بقیه بهتر بود، و اگر بله، آیا کل زنجیره باید آن را فصل بعد کپی کند؟</strong> پاسخ صادقانه به این سؤال یعنی محاسبهٔ میانگین، پراکندگی و میانه برای هر منطقه و مقایسهٔ آن‌ها — نه نگاه سرسری به یک چاپ روی کاغذ. این همان چیزی است که بخش‌های ۲ تا ۹ به سمتش می‌سازند، و بخش ۹ با اعداد واقعی به همین سؤال بازمی‌گردد.</p>',
          },
        },
        {
          type: 'box',
          variant: 'analogy',
          label: { en: 'Analogy', ar: 'تشبيه', fa: 'قیاس' },
          html: {
            en: "<p>Excel is a kitchen counter — everything you're working with is laid out in front of you, and you can reach any of it directly. A database is a warehouse the size of a city, with millions of items, other people constantly moving things in and out of it while you work. You don't walk the whole warehouse to find what you need — you send a precise request to the person running it, and SQL is how you phrase that request.</p>",
            ar: '<p>Excel هو منضدة مطبخ — كل ما تعمل عليه موضوع أمامك، ويمكنك الوصول إلى أي جزء منه مباشرة. قاعدة البيانات هي مستودع بحجم مدينة، فيه ملايين العناصر، وأشخاص آخرون ينقلون أشياء داخله وخارجه باستمرار أثناء عملك. أنت لا تمشي عبر المستودع بأكمله لتجد ما تحتاجه — بل ترسل طلبًا دقيقًا للشخص الذي يديره، وSQL هي طريقتك لصياغة ذلك الطلب.</p>',
            fa: 'Excel مثل پیشخوان آشپزخانه است — هر چیزی که با آن کار می‌کنی جلوی چشمت چیده شده و می‌توانی مستقیم به هر بخشش دست بزنی. پایگاه داده انباری به‌اندازهٔ یک شهر است، با میلیون‌ها قلم کالا، جایی که افراد دیگر همزمان با کار تو، چیزهایی را داخل و خارج می‌کنند. تو کل انبار را برای یافتن چیزی که نیاز داری نمی‌گردی — درخواستی دقیق برای کسی که آن را اداره می‌کند می‌فرستی، و SQL روش بیان همان درخواست است.',
          },
        },
        {
          type: 'html',
          html: {
            en: '<h3>Setting up your sandbox</h3><p>You don\'t need to install anything. The <strong>Aiven PostgreSQL Playground</strong> runs a real Postgres database directly in your browser — no signup, nothing to install. It resets when you close the tab, which is fine: you\'ll re-run the setup script below at the start of each exercise.</p><ol><li><strong>Open the playground</strong> — Go to <code>aiven.io/tools/pg-playground</code> in a new tab.</li><li><strong>Paste the setup script</strong> — Copy the code block below and run it. It creates one table, <code>clearance_sales</code>, and fills it with 28 rows of real-looking winter-coat clearance data — the same seasonal-markdown story from Week 0, now with a full table to compute real statistics on.</li><li><strong>Keep the tab open</strong> — Every exercise this week queries this same table. If you accidentally close the tab, just re-paste the script.</li></ol>',
            ar: '<h3>إعداد بيئتك التجريبية</h3><p>لست بحاجة لتثبيت أي شيء. تُشغّل <strong>Aiven PostgreSQL Playground</strong> قاعدة بيانات Postgres حقيقية مباشرة في متصفحك — دون تسجيل، ودون أي تثبيت. تُعاد تهيئتها عند إغلاق التبويب، وهذا لا بأس به: ستُعيد تشغيل نص الإعداد أدناه في بداية كل تمرين.</p><ol><li><strong>افتح البيئة التجريبية</strong> — اذهب إلى <code>aiven.io/tools/pg-playground</code> في تبويب جديد.</li><li><strong>الصق نص الإعداد</strong> — انسخ كتلة الشيفرة أدناه وشغّلها. تنشئ جدولاً واحدًا، <code>clearance_sales</code>، وتملؤه بـ٢٨ صفًا من بيانات تخفيضات معاطف شتوية واقعية.</li><li><strong>أبقِ التبويب مفتوحًا</strong> — كل تمرين هذا الأسبوع يستعلم عن نفس هذا الجدول. إن أغلقت التبويب عن طريق الخطأ، أعد لصق النص فحسب.</li></ol>',
            fa: '<h3>راه‌اندازی محیط آزمایشی‌ات</h3><p>نیازی به نصب چیزی نیست. <strong>Aiven PostgreSQL Playground</strong> یک پایگاه داده واقعی Postgres را مستقیماً در مرورگرت اجرا می‌کند — بدون ثبت‌نام، بدون نصب. با بستن تب بازنشانی می‌شود که مشکلی نیست: در ابتدای هر تمرین دوباره اسکریپت راه‌اندازی زیر را اجرا می‌کنی.</p><ol><li><strong>محیط آزمایشی را باز کن</strong> — به آدرس <code>aiven.io/tools/pg-playground</code> در یک تب جدید برو.</li><li><strong>اسکریپت راه‌اندازی را جای‌گذاری کن</strong> — بلوک کد زیر را کپی و اجرا کن. این اسکریپت یک جدول به نام <code>clearance_sales</code> می‌سازد و آن را با ۲۸ ردیف داده واقع‌نمای تسویهٔ معطف زمستانی پر می‌کند.</li><li><strong>تب را باز نگه دار</strong> — هر تمرین این هفته از همین جدول پرس‌وجو می‌گیرد. اگر به‌اشتباه تب را بستی، فقط اسکریپت را دوباره جای‌گذاری کن.</li></ol>',
          },
        },
        {
          type: 'code',
          code: `CREATE TABLE clearance_sales (
  id            INT PRIMARY KEY,
  region        TEXT NOT NULL,
  discount_pct  INT NOT NULL,
  units_sold    INT NOT NULL,
  revenue       NUMERIC(10,2) NOT NULL
);

INSERT INTO clearance_sales (id, region, discount_pct, units_sold, revenue) VALUES
(1, 'North', 10, 40, 2880.00),
(2, 'North', 15, 55, 3740.00),
(3, 'North', 20, 68, 4352.00),
(4, 'North', 25, 70, 4200.00),
(5, 'North', 30, 60, 3360.00),
(6, 'North', 35, 42, 2184.00),
(7, 'North', 40, 25, 1200.00),
(8, 'South', 10, 30, 2160.00),
(9, 'South', 15, 42, 2856.00),
(10, 'South', 20, 54, 3456.00),
(11, 'South', 25, 58, 3480.00),
(12, 'South', 30, 50, 2800.00),
(13, 'South', 35, 34, 1768.00),
(14, 'South', 40, 20, 960.00),
(15, 'East', 10, 46, 3312.00),
(16, 'East', 15, 63, 4284.00),
(17, 'East', 20, 79, 5056.00),
(18, 'East', 25, 84, 5040.00),
(19, 'East', 30, 71, 3976.00),
(20, 'East', 35, 49, 2548.00),
(21, 'East', 40, 29, 1392.00),
(22, 'West', 10, 22, 1584.00),
(23, 'West', 15, 38, 2584.00),
(24, 'West', 20, 60, 3840.00),
(25, 'West', 25, 52, 3120.00),
(26, 'West', 30, 63, 3528.00),
(27, 'West', 35, 30, 1560.00),
(28, 'West', 40, 18, 864.00);`,
        },
        {
          type: 'box',
          variant: 'keypoint',
          label: { en: 'Alternative: Supabase', ar: 'بديل: Supabase', fa: 'گزینهٔ جایگزین: Supabase' },
          html: {
            en: '<p>The Aiven Playground resets on tab close — fine for this week\'s exercises, but if you want a database that persists across all 12 weeks of this course, <a href="https://supabase.com" target="_blank" rel="noopener">Supabase\'s free tier</a> gives you a real, permanent PostgreSQL database with a similar in-browser SQL editor. Either is a correct choice; this page assumes the Aiven Playground for simplicity.</p>',
            ar: '<p>تُعاد تهيئة بيئة Aiven التجريبية عند إغلاق التبويب — وهذا مناسب لتمارين هذا الأسبوع، لكن إن أردت قاعدة بيانات تستمر طوال الأسابيع الاثني عشر لهذا المقرر، توفر <a href="https://supabase.com" target="_blank" rel="noopener">النسخة المجانية من Supabase</a> قاعدة بيانات PostgreSQL حقيقية ودائمة مع محرر SQL مشابه داخل المتصفح.</p>',
            fa: '<p>محیط Aiven با بستن تب بازنشانی می‌شود — برای تمرین‌های این هفته مشکلی نیست، اما اگر پایگاه داده‌ای می‌خواهی که در هر ۱۲ هفتهٔ این دوره پابرجا بماند، <a href="https://supabase.com" target="_blank" rel="noopener">نسخهٔ رایگان Supabase</a> یک پایگاه داده واقعی و دائمی PostgreSQL با ویرایشگر SQL مشابه درون مرورگر در اختیارت می‌گذارد.</p>',
          },
        },
        { type: 'exercise', questionId: 'w01-q001' },
      ],
    },
    {
      id: 'sampling',
      navLabel: { en: 'Choosing your sample', ar: 'اختيار عيّنتك', fa: 'انتخاب نمونه‌ات' },
      sectionLabel: { en: 'Section 02', ar: 'القسم ٠٢', fa: 'بخش ۰۲' },
      timeEst: { en: '5 min', ar: '٥ دقائق', fa: '۵ دقیقه' },
      headingHtml: {
        en: '<h2>SELECT / FROM / WHERE: choosing your sample</h2><p class="standfirst">BA1 taught you that a sample is a deliberate choice, not an accident. In SQL, that choice has a name: <code>WHERE</code>.</p>',
        ar: '<h2>SELECT / FROM / WHERE: اختيار عيّنتك</h2><p class="standfirst">علّمك BA1 أن العيّنة اختيار متعمّد، لا مصادفة. في SQL، لهذا الاختيار اسم: <code>WHERE</code>.</p>',
        fa: '<h2>SELECT / FROM / WHERE: انتخاب نمونه‌ات</h2><p class="standfirst">BA1 به تو آموخت که نمونه انتخابی آگاهانه است، نه اتفاقی. در SQL، این انتخاب نامی دارد: <code>WHERE</code>.</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: '<p>Every SQL query that reads data follows the same skeleton: <code>SELECT</code> which columns you want, <code>FROM</code> which table, and optionally <code>WHERE</code> to narrow the rows down. That last clause is doing exactly what BA1 called sampling — deliberately choosing a subset of the whole population to work with, instead of assuming "all of it" is the right answer by default.</p>',
            ar: '<p>كل استعلام SQL يقرأ بيانات يتبع نفس الهيكل: <code>SELECT</code> لتحديد الأعمدة التي تريدها، <code>FROM</code> لتحديد الجدول، و<code>WHERE</code> اختياريًا لتضييق الصفوف. هذه العبارة الأخيرة تفعل بالضبط ما أسماه BA1 أخذ العيّنات — اختيار جزء من المجتمع الكامل بشكل متعمّد للعمل عليه، بدلاً من افتراض أن "كل شيء" هو الإجابة الصحيحة افتراضيًا.</p>',
            fa: '<p>هر پرس‌وجوی SQL که داده می‌خواند از یک اسکلت یکسان پیروی می‌کند: <code>SELECT</code> برای اینکه کدام ستون‌ها را می‌خواهی، <code>FROM</code> برای اینکه از کدام جدول، و به‌صورت اختیاری <code>WHERE</code> برای محدود کردن ردیف‌ها. همین عبارت آخر دقیقاً همان کاری را می‌کند که BA1 نمونه‌گیری نامید — انتخاب آگاهانهٔ زیرمجموعه‌ای از کل جامعه برای کار روی آن، به‌جای فرض کردن اینکه «همهٔ آن» به‌طور پیش‌فرض پاسخ درستی است.</p>',
          },
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 1', ar: 'الرسم ١', fa: 'نمودار ۱' },
          title: {
            en: 'WHERE narrows the population to your sample',
            ar: 'WHERE يضيّق المجتمع إلى عيّنتك',
            fa: 'WHERE جامعه را به نمونه‌ات محدود می‌کند',
          },
          src: '/figures/week-01/diagram-01.svg',
          alt: 'A full table of rows, with WHERE narrowing it down to a highlighted subset',
          caption: {
            en: "Exactly the same idea as BA1's sampling frame — just written as a clause instead of a decision on paper.",
            ar: 'نفس فكرة إطار العيّنة في BA1 تمامًا — لكنها مكتوبة كعبارة برمجية بدلاً من قرار على الورق.',
            fa: 'دقیقاً همان ایدهٔ چارچوب نمونه‌گیری BA1 — فقط این‌بار به‌صورت یک عبارت برنامه‌ای نوشته شده، نه تصمیمی روی کاغذ.',
          },
        },
        {
          type: 'code',
          code: `SELECT region, discount_pct, revenue
FROM clearance_sales
WHERE region = 'North';`,
        },
        {
          type: 'box',
          variant: 'mistake',
          label: { en: 'Common mistake', ar: 'خطأ شائع', fa: 'اشتباه رایج' },
          html: {
            en: '<p>Forgetting <code>WHERE</code> entirely and assuming a query without it is somehow "neutral." A query with no <code>WHERE</code> clause samples <em>everything</em> — which is itself a sampling choice, and not always the right one. "All the data" is a decision, not a default that avoids one.</p>',
            ar: '<p>نسيان <code>WHERE</code> تمامًا وافتراض أن الاستعلام بدونها "محايد" بطريقة ما. الاستعلام بلا عبارة <code>WHERE</code> يأخذ عيّنة من <em>كل شيء</em> — وهذا بحد ذاته اختيار لعيّنة، وليس دائمًا الاختيار الصحيح. "كل البيانات" قرار، لا افتراض يتجنب اتخاذ قرار.</p>',
            fa: '<p>فراموش کردن کامل <code>WHERE</code> و این فرض که پرس‌وجویی بدون آن به‌نوعی «بی‌طرف» است. پرس‌وجویی بدون عبارت <code>WHERE</code> از <em>همه‌چیز</em> نمونه می‌گیرد — که خودش یک انتخاب نمونه‌گیری است، نه همیشه انتخاب درست. «همهٔ داده‌ها» یک تصمیم است، نه پیش‌فرضی که از گرفتن تصمیم فرار می‌کند.</p>',
          },
        },
        { type: 'exercise', questionId: 'w01-q002' },
      ],
    },
    {
      id: 'avg-count-sum',
      navLabel: { en: 'AVG, COUNT, SUM', ar: 'AVG, COUNT, SUM', fa: 'AVG, COUNT, SUM' },
      sectionLabel: { en: 'Section 03', ar: 'القسم ٠٣', fa: 'بخش ۰۳' },
      timeEst: { en: '5 min', ar: '٥ دقائق', fa: '۵ دقیقه' },
      headingHtml: {
        en: '<h2>AVG(), COUNT(), SUM()</h2><p class="standfirst">Three functions. One of them is secretly just the other two.</p>',
        ar: '<h2><span dir="ltr">AVG(), COUNT(), SUM()</span></h2><p class="standfirst">ثلاث دوال. إحداها في الحقيقة ليست سوى الأخريين مجتمعتين.</p>',
        fa: '<h2><span dir="ltr">AVG(), COUNT(), SUM()</span></h2><p class="standfirst">سه تابع. یکی از آن‌ها در واقع چیزی نیست جز دو تای دیگر.</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: '<p><code>SUM()</code> adds up a column. <code>COUNT()</code> counts rows. And <code>AVG()</code> — the function that computes BA1\'s mean — isn\'t doing anything new at all.</p>',
            ar: '<p><code>SUM()</code> تجمع قيم عمود. <code>COUNT()</code> تعدّ الصفوف. أما <code>AVG()</code> — الدالة التي تحسب متوسط BA1 — فهي لا تفعل شيئًا جديدًا على الإطلاق.</p>',
            fa: '<p><code>SUM()</code> مقادیر یک ستون را جمع می‌زند. <code>COUNT()</code> ردیف‌ها را می‌شمارد. و <code>AVG()</code> — تابعی که میانگین BA1 را محاسبه می‌کند — اصلاً کار تازه‌ای انجام نمی‌دهد.</p>',
          },
        },
        {
          type: 'formula',
          eq: 'AVG(x) = SUM(x) / COUNT(x)',
          note: {
            en: 'Literally. There is no separate "averaging" logic — it\'s a sum divided by a count, exactly like BA1 taught you.',
            ar: 'حرفيًا. لا يوجد منطق منفصل لـ"حساب المتوسط" — إنه مجموع مقسوم على عدد، تمامًا كما علّمك BA1.',
            fa: 'حرفاً همین‌طور است. هیچ منطق جداگانه‌ای برای «میانگین‌گیری» وجود ندارد — این فقط یک مجموع تقسیم بر یک شمارش است، دقیقاً همان‌طور که BA1 به تو آموخت.',
          },
        },
        {
          type: 'code',
          code: `SELECT
  SUM(revenue)                    AS total_revenue,
  COUNT(revenue)                  AS num_sales,
  SUM(revenue) / COUNT(revenue)   AS avg_by_hand,
  AVG(revenue)                    AS avg_builtin
FROM clearance_sales;

-- total_revenue = 82084.00
-- num_sales     = 28
-- avg_by_hand   = 2931.57
-- avg_builtin   = 2931.57`,
        },
        {
          type: 'box',
          variant: 'mistake',
          label: { en: 'Common mistake', ar: 'خطأ شائع', fa: 'اشتباه رایج' },
          html: {
            en: '<p><code>COUNT(column)</code> and <code>COUNT(*)</code> are not always the same. <code>COUNT(*)</code> counts every row. <code>COUNT(column)</code> only counts rows where that column isn\'t <code>NULL</code>. If <code>revenue</code> had missing values, <code>AVG(revenue)</code> would quietly divide by a smaller count than the row total — correct behaviour, but only if you know it\'s happening.</p>',
            ar: '<p><code>COUNT(column)</code> و<code>COUNT(*)</code> ليستا متطابقتين دائمًا. تعدّ <code>COUNT(*)</code> كل صف. أما <code>COUNT(column)</code> فتعدّ فقط الصفوف التي لا تكون فيها قيمة ذلك العمود <code>NULL</code>. لو كان لعمود <code>revenue</code> قيم مفقودة، فستقسم <code>AVG(revenue)</code> بصمت على عدد أصغر من إجمالي الصفوف — وهذا سلوك صحيح، لكن فقط إن كنت تعرف أنه يحدث.</p>',
            fa: '<p><code>COUNT(column)</code> و <code>COUNT(*)</code> همیشه یکسان نیستند. <code>COUNT(*)</code> هر ردیف را می‌شمارد. <code>COUNT(column)</code> فقط ردیف‌هایی را می‌شمارد که مقدار آن ستون <code>NULL</code> نباشد. اگر ستون <code>revenue</code> مقادیر گم‌شده داشت، <code>AVG(revenue)</code> بی‌سروصدا بر شمارشی کوچک‌تر از کل ردیف‌ها تقسیم می‌کرد — رفتاری درست، اما فقط اگر بدانی دارد رخ می‌دهد.</p>',
          },
        },
        { type: 'exercise', questionId: 'w01-q003' },
      ],
    },
    {
      id: 'stddev',
      navLabel: { en: 'Standard deviation', ar: 'الانحراف المعياري', fa: 'انحراف معیار' },
      sectionLabel: { en: 'Section 04', ar: 'القسم ٠٤', fa: 'بخش ۰۴' },
      timeEst: { en: '10 min', ar: '١٠ دقائق', fa: '۱۰ دقیقه' },
      headingHtml: {
        en: '<h2>Standard deviation: build it, then trust the function</h2><p class="standfirst">BA1\'s four-step recipe — deviate, square, average, root — translates into SQL almost line for line.</p>',
        ar: '<h2>الانحراف المعياري: ابنِه أولاً، ثم ثق بالدالة</h2><p class="standfirst">وصفة BA1 المكوّنة من أربع خطوات — انحرف، ربّع، توسّط، جذّر — تُترجم إلى SQL شبه سطرًا بسطر.</p>',
        fa: '<h2>انحراف معیار: اول بسازش، بعد به تابع اعتماد کن</h2><p class="standfirst">دستور چهارمرحله‌ای BA1 — انحراف بگیر، به توان دو برسان، میانگین بگیر، جذر بگیر — تقریباً خط‌به‌خط به SQL ترجمه می‌شود.</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: "<p>Before reaching for the built-in function, build it by hand once in SQL — so when you use the shortcut later, you know exactly what it's doing.</p>",
            ar: '<p>قبل اللجوء إلى الدالة الجاهزة، ابنِها يدويًا مرة واحدة في SQL — حتى تعرف بالضبط ماذا تفعل عندما تستخدم الاختصار لاحقًا.</p>',
            fa: '<p>پیش از استفاده از تابع آماده، یک‌بار آن را دستی در SQL بساز — تا وقتی بعداً از میان‌بر استفاده می‌کنی، دقیقاً بدانی چه کاری انجام می‌دهد.</p>',
          },
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 2', ar: 'الرسم ٢', fa: 'نمودار ۲' },
          title: {
            en: 'Standard deviation, one step at a time',
            ar: 'الانحراف المعياري، خطوة بخطوة',
            fa: 'انحراف معیار، گام‌به‌گام',
          },
          src: '/figures/week-01/diagram-02.svg',
          alt: 'Standard deviation by hand: deviations, squared, averaged, then square-rooted',
          caption: {
            en: "Worked using the North region's 7 sales — the same four steps BA1 described, now in SQL.",
            ar: 'مُحسوبة باستخدام مبيعات منطقة الشمال السبعة — نفس الخطوات الأربع التي وصفها BA1، والآن بلغة SQL.',
            fa: 'حل‌شده با ۷ فروش منطقهٔ شمال — همان چهار گامی که BA1 توضیح داد، این‌بار به زبان SQL.',
          },
        },
        {
          type: 'html',
          html: {
            en: '<h3>What each of the four steps is actually doing</h3><ol><li><strong>Deviate</strong> — subtract the mean from each sale\'s revenue. This just asks "how far off from typical was this one?" for every row. A sale right at the mean deviates by 0; a sale far above or below it gets a large positive or negative number.</li><li><strong>Square</strong> — multiply each deviation by itself. Two things happen at once: negative deviations turn positive, so they stop cancelling out the positive ones when you add everything up; and bigger misses get punished disproportionately — a deviation of $500 becomes 250,000, four times the 62,500 you get from a $250 deviation, not just double.</li><li><strong>Average</strong> — sum the squared deviations and divide by the count (n−1 for a sample). This collapses 7 individual squared-deviation numbers into one number representing typical squared spread — on its own it\'s called the <em>variance</em>, but it\'s in dollars-squared, which isn\'t a unit anyone can picture.</li><li><strong>Root</strong> — take the square root to undo the squaring from step 2 and bring the units back to plain dollars. That final number is the standard deviation.</li></ol>',
            ar: '<h3>ما الذي تفعله كل خطوة من الخطوات الأربع فعليًا</h3><ol><li><strong>انحرف</strong> — اطرح المتوسط من إيراد كل عملية بيع. البيع المطابق للمتوسط تمامًا ينحرف بمقدار صفر؛ والبيع البعيد عنه صعودًا أو هبوطًا يحصل على رقم كبير موجب أو سالب.</li><li><strong>ربّع</strong> — اضرب كل انحراف في نفسه. الانحرافات السالبة تصبح موجبة، والانحرافات الكبيرة تُعاقَب بشكل غير متناسب.</li><li><strong>توسّط</strong> — اجمع الانحرافات المربّعة واقسمها على العدد (n−1 للعيّنة). يُسمى هذا الرقم وحده <em>التباين</em>، لكنه بوحدة "دولار تربيع".</li><li><strong>جذّر</strong> — خذ الجذر التربيعي لإعادة الوحدات إلى دولارات عادية. هذا الرقم النهائي هو الانحراف المعياري.</li></ol>',
            fa: '<h3>هرکدام از چهار گام واقعاً چه‌کاری انجام می‌دهد</h3><ol><li><strong>انحراف بگیر</strong> — میانگین را از درآمد هر فروش کم کن. فروشی که دقیقاً روی میانگین است انحراف صفر دارد؛ فروشی که خیلی بالاتر یا پایین‌تر است عددی مثبت یا منفی بزرگ می‌گیرد.</li><li><strong>به توان دو برسان</strong> — هر انحراف را در خودش ضرب کن. انحراف‌های منفی مثبت می‌شوند و خطاهای بزرگ‌تر نامتناسب تنبیه می‌شوند.</li><li><strong>میانگین بگیر</strong> — انحراف‌های به‌توان‌رسیده را جمع بزن و بر شمارش تقسیم کن (n−1 برای نمونه). به‌تنهایی به این عدد <em>واریانس</em> گفته می‌شود، اما واحدش دلار به‌توان دو است.</li><li><strong>جذر بگیر</strong> — جذر بگیر تا واحدها به دلار ساده برگردند. این عدد نهایی همان انحراف معیار است.</li></ol>',
          },
        },
        {
          type: 'html',
          html: {
            en: '<h3>Step 1–3: the mean, the squared deviations, the average</h3>',
            ar: '<h3>الخطوات ١–٣: المتوسط، الانحرافات المربّعة، متوسطها</h3>',
            fa: '<h3>گام‌های ۱ تا ۳: میانگین، انحراف‌های به‌توان‌رسیده، میانگینشان</h3>',
          },
        },
        {
          type: 'code',
          code: `-- Step 1: get the mean first (as a subquery, since SQL needs it before it can deviate anything from it)
SELECT ROUND(
  SQRT(
    SUM(
      POWER(revenue - (SELECT AVG(revenue) FROM clearance_sales WHERE region = 'North'), 2)
    ) / (COUNT(*) - 1)             -- Steps 2-3: square each deviation, then average by n-1
  ), 2                             -- round to 2 decimal places, or Postgres hands back the full float
) AS stddev_by_hand                -- Step 4: square root
FROM clearance_sales
WHERE region = 'North';

-- stddev_by_hand = 1136.18`,
        },
        {
          type: 'html',
          html: {
            en: '<h3>Now the built-in functions</h3><p>PostgreSQL ships both versions of the formula — because BA1 also taught you there are two: sample and population.</p>',
            ar: '<h3>والآن الدوال الجاهزة</h3><p>يوفر PostgreSQL نسختي الصيغة كلتيهما — لأن BA1 علّمك أيضًا أن هناك نسختين: عيّنة ومجتمع.</p>',
            fa: '<h3>و اکنون توابع آماده</h3><p>PostgreSQL هر دو نسخهٔ فرمول را ارائه می‌دهد — چون BA1 هم به تو آموخت که دو نسخه وجود دارد: نمونه و جامعه.</p>',
          },
        },
        {
          type: 'code',
          code: `SELECT
  ROUND(STDDEV_SAMP(revenue), 2) AS stddev_samp,   -- divides by n-1: use when your rows are a SAMPLE
  ROUND(STDDEV_POP(revenue), 2)  AS stddev_pop     -- divides by n:   use only if these rows are the ENTIRE population
FROM clearance_sales
WHERE region = 'North';

-- stddev_samp = 1136.18   (matches stddev_by_hand above)
-- stddev_pop  = 1051.90`,
        },
        {
          type: 'box',
          variant: 'keypoint',
          label: {
            en: 'Sample vs. population, in this dataset',
            ar: 'العيّنة مقابل المجتمع، في هذه البيانات',
            fa: 'نمونه در برابر جامعه، در همین داده',
          },
          html: {
            en: '<p>These 7 North-region sales are a sample of North\'s clearance history, not literally every winter-coat sale the region has ever run — so <code>STDDEV_SAMP()</code> (dividing by n−1) is the right choice here, and almost always the right choice in business analytics. You\'d only reach for <code>STDDEV_POP()</code> if your rows genuinely were the entire population with nothing left out.</p>',
            ar: '<p>هذه المبيعات السبع لمنطقة الشمال هي عيّنة من تاريخ تخفيضات الشمال، وليست حرفيًا كل عملية بيع معطف شتوي جرت في المنطقة على الإطلاق — لذا فإن <code>STDDEV_SAMP()</code> (القسمة على n−1) هي الخيار الصحيح هنا.</p>',
            fa: '<p>این ۷ فروش منطقهٔ شمال نمونه‌ای از تاریخچهٔ تسویهٔ شمال هستند، نه حرفاً هر فروش معطف زمستانی‌ای که آن منطقه تابه‌حال داشته — پس <code>STDDEV_SAMP()</code> (تقسیم بر n−1) انتخاب درست اینجاست.</p>',
          },
        },
        { type: 'exercise', questionId: 'w01-q004' },
      ],
    },
    {
      id: 'groupby-freq',
      navLabel: { en: 'Frequency distribution', ar: 'التوزيع التكراري', fa: 'توزیع فراوانی' },
      sectionLabel: { en: 'Section 05', ar: 'القسم ٠٥', fa: 'بخش ۰۵' },
      timeEst: { en: '6 min', ar: '٦ دقائق', fa: '۶ دقیقه' },
      headingHtml: {
        en: '<h2>GROUP BY + COUNT as a frequency distribution</h2><p class="standfirst">BA1\'s frequency table, in one query.</p>',
        ar: '<h2><span dir="ltr">GROUP BY + COUNT</span> كتوزيع تكراري</h2><p class="standfirst">جدول التكرار من BA1، في استعلام واحد.</p>',
        fa: '<h2><span dir="ltr">GROUP BY + COUNT</span> به‌عنوان توزیع فراوانی</h2><p class="standfirst">جدول فراوانی BA1، در یک پرس‌وجو.</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: '<p><code>GROUP BY</code> collapses rows sharing a value into one row per group, and any aggregate function in the <code>SELECT</code> list (like <code>COUNT(*)</code>) then runs per group instead of over the whole table. Bucket a numeric column into ranges first, and this becomes exactly BA1\'s frequency distribution — a histogram, expressed as a table.</p>',
            ar: '<p>تدمج <code>GROUP BY</code> الصفوف التي تشترك في قيمة معيّنة إلى صف واحد لكل مجموعة، وأي دالة تجميعية في قائمة <code>SELECT</code> (مثل <code>COUNT(*)</code>) تعمل حينها لكل مجموعة بدلاً من الجدول بأكمله. قسّم عمودًا رقميًا إلى نطاقات أولاً، وهذا يصبح بالضبط التوزيع التكراري من BA1 — رسم بياني مُعبَّر عنه كجدول.</p>',
            fa: '<p><code>GROUP BY</code> ردیف‌هایی را که در یک مقدار مشترک هستند در یک ردیف به‌ازای هر گروه فشرده می‌کند، و هر تابع تجمیعی در فهرست <code>SELECT</code> (مثل <code>COUNT(*)</code>) آنگاه به‌جای کل جدول، برای هر گروه اجرا می‌شود. یک ستون عددی را اول به بازه‌ها تقسیم کن، و این دقیقاً همان توزیع فراوانی BA1 می‌شود.</p>',
          },
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 3', ar: 'الرسم ٣', fa: 'نمودار ۳' },
          title: {
            en: 'GROUP BY, drawn as a histogram',
            ar: 'GROUP BY، مرسومة كرسم بياني',
            fa: 'GROUP BY، رسم‌شده به‌شکل هیستوگرام',
          },
          src: '/figures/week-01/diagram-03.svg',
          alt: 'GROUP BY revenue bucket, COUNT star, drawn as a histogram: 2, 5, 7, 9, 3, 2',
          caption: {
            en: "Every clearance sale, bucketed by revenue. Same shape you'd get pivoting this in Excel — just computed inside the database.",
            ar: 'كل عملية تخفيض، مقسّمة حسب الإيراد. نفس الشكل الذي كنت لتحصل عليه بجدول محوري في Excel.',
            fa: 'هر فروش تسویه، بر اساس درآمد در بازه‌ها. همان شکلی که با یک جدول محوری در Excel به‌دست می‌آمد.',
          },
        },
        {
          type: 'code',
          code: `SELECT
  CASE
    WHEN revenue < 1000 THEN '0-999'
    WHEN revenue < 2000 THEN '1000-1999'
    WHEN revenue < 3000 THEN '2000-2999'
    WHEN revenue < 4000 THEN '3000-3999'
    WHEN revenue < 5000 THEN '4000-4999'
    ELSE '5000+'
  END AS revenue_bucket,
  COUNT(*) AS num_sales
FROM clearance_sales
GROUP BY revenue_bucket
ORDER BY revenue_bucket;

-- 0-999      | 2
-- 1000-1999  | 5
-- 2000-2999  | 7
-- 3000-3999  | 9
-- 4000-4999  | 3
-- 5000+      | 2`,
        },
        {
          type: 'box',
          variant: 'mistake',
          label: { en: 'Common mistake', ar: 'خطأ شائع', fa: 'اشتباه رایج' },
          html: {
            en: '<p>Adding a column to <code>SELECT</code> without adding it to <code>GROUP BY</code> (or wrapping it in an aggregate). PostgreSQL refuses to run a query like that — it raises an error rather than guessing which row\'s value you meant, which is safer than databases that silently pick one at random.</p>',
            ar: '<p>إضافة عمود إلى <code>SELECT</code> دون إضافته إلى <code>GROUP BY</code> (أو تضمينه داخل دالة تجميعية). يرفض PostgreSQL تشغيل استعلام كهذا — فيُصدر خطأً بدلاً من تخمين قيمة أي صف تقصد.</p>',
            fa: '<p>اضافه کردن یک ستون به <code>SELECT</code> بدون اضافه کردنش به <code>GROUP BY</code> (یا قرار دادنش درون یک تابع تجمیعی). PostgreSQL از اجرای چنین پرس‌وجویی سر باز می‌زند — خطا می‌دهد به‌جای اینکه حدس بزند.</p>',
          },
        },
        { type: 'exercise', questionId: 'w01-q005' },
      ],
    },
    {
      id: 'median',
      navLabel: { en: 'Median', ar: 'الوسيط', fa: 'میانه' },
      sectionLabel: { en: 'Section 06', ar: 'القسم ٠٦', fa: 'بخش ۰۶' },
      timeEst: { en: '6 min', ar: '٦ دقائق', fa: '۶ دقیقه' },
      headingHtml: {
        en: '<h2>Median: the one that needs everything sorted first</h2><p class="standfirst">Why doesn\'t Postgres just have <code>MEDIAN()</code> the way it has <code>AVG()</code>?</p>',
        ar: '<h2>الوسيط: الإحصاء الذي يحتاج ترتيب كل شيء أولاً</h2><p class="standfirst">لماذا لا يمتلك Postgres دالة <code>MEDIAN()</code> ببساطة كما يمتلك <code>AVG()</code>؟</p>',
        fa: '<h2>میانه: عددی که اول باید همه‌چیز مرتب شود</h2><p class="standfirst">چرا Postgres همان‌طور که <code>AVG()</code> دارد، به‌سادگی <code>MEDIAN()</code> ندارد؟</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: '<p><code>SUM</code>, <code>COUNT</code>, and <code>AVG</code> are all <strong>single-pass</strong>: the database can read the rows once, keeping a running total, and never look at a row twice. The median can\'t work that way — finding "the middle value" requires every value to be sorted first. That\'s a fundamentally more expensive operation, which is exactly why BA1 called the median more robust to outliers but more work to compute by hand.</p>',
            ar: '<p>تعتبر <code>SUM</code> و<code>COUNT</code> و<code>AVG</code> جميعها <strong>أحادية المرور</strong>. لا يمكن للوسيط أن يعمل هكذا — لإيجاد "القيمة الوسطى"، تحتاج أولاً لترتيب كل القيم. هذه عملية أكثر كلفة، وهذا سبب وصف BA1 للوسيط بأنه أكثر مقاومة للقيم المتطرفة لكنه أصعب في الحساب اليدوي.</p>',
            fa: '<p><code>SUM</code>، <code>COUNT</code> و <code>AVG</code> همگی <strong>تک‌گذر</strong> هستند. میانه نمی‌تواند این‌طور کار کند — برای یافتن «مقدار میانی»، ابتدا باید همهٔ مقادیر مرتب شوند. این عملیاتی اساساً پرهزینه‌تر است، که همان دلیلی است که BA1 میانه را در برابر داده‌های پرت مقاوم‌تر اما دستی محاسبه‌کردنش دشوارتر توصیف کرد.</p>',
          },
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 4', ar: 'الرسم ٤', fa: 'نمودار ۴' },
          title: {
            en: 'Single-pass vs. sort-required',
            ar: 'أحادي المرور مقابل ما يتطلب ترتيبًا',
            fa: 'تک‌گذر در برابر نیازمند مرتب‌سازی',
          },
          src: '/figures/week-01/diagram-04.svg',
          alt: 'SUM, AVG and STDDEV read the table once in a single pass; MEDIAN needs every row sorted first',
          caption: {
            en: 'This is the exact reason Postgres has no plain MEDIAN() function — it isn\'t an oversight.',
            ar: 'هذا هو السبب الدقيق وراء عدم امتلاك Postgres دالة MEDIAN() بسيطة — وليس إغفالاً.',
            fa: 'این دقیقاً همان دلیلی است که Postgres تابع سادهٔ MEDIAN() ندارد — این یک سهو نیست.',
          },
        },
        {
          type: 'code',
          code: `SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY revenue) AS median_revenue
FROM clearance_sales;

-- median_revenue = 3000.00`,
        },
        {
          type: 'box',
          variant: 'analogy',
          label: { en: 'Analogy', ar: 'تشبيه', fa: 'قیاس' },
          html: {
            en: '<p><code>PERCENTILE_CONT(0.5)</code> literally means "the value at the 50th percentile" — the median is just one specific percentile. Swap <code>0.5</code> for <code>0.25</code> or <code>0.75</code> and you\'ve computed BA1\'s quartiles with the exact same function.</p>',
            ar: '<p><code>PERCENTILE_CONT(0.5)</code> تعني حرفيًا "القيمة عند المئين الخمسين" — الوسيط ما هو إلا مئين محدد واحد. استبدل <code>0.5</code> بـ<code>0.25</code> أو <code>0.75</code> وتكون قد حسبت أرباعيات BA1 بنفس الدالة تمامًا.</p>',
            fa: '<p><code>PERCENTILE_CONT(0.5)</code> حرفاً به معنای «مقدار در صدکِ پنجاهم» است — میانه فقط یک صدکِ خاص است. <code>0.5</code> را با <code>0.25</code> یا <code>0.75</code> جایگزین کن و چارک‌های BA1 را با همین تابع، عیناً محاسبه کرده‌ای.</p>',
          },
        },
        { type: 'exercise', questionId: 'w01-q006' },
      ],
    },
    {
      id: 'groupby-segment',
      navLabel: { en: 'Comparing segments', ar: 'مقارنة الفئات', fa: 'مقایسه بخش‌ها' },
      sectionLabel: { en: 'Section 07', ar: 'القسم ٠٧', fa: 'بخش ۰۷' },
      timeEst: { en: '6 min', ar: '٦ دقائق', fa: '۶ دقیقه' },
      headingHtml: {
        en: '<h2>GROUP BY for per-segment stats</h2><p class="standfirst">One query, one stat per region — this is where descriptive statistics starts turning diagnostic.</p>',
        ar: '<h2>GROUP BY لإحصاءات كل فئة</h2><p class="standfirst">استعلام واحد، إحصاء واحد لكل منطقة — هنا يبدأ الإحصاء الوصفي بالتحوّل إلى تشخيصي.</p>',
        fa: '<h2>GROUP BY برای آمار هر بخش</h2><p class="standfirst">یک پرس‌وجو، یک آمار برای هر منطقه — اینجاست که آمار توصیفی شروع به تشخیصی‌شدن می‌کند.</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: '<p><code>GROUP BY</code> isn\'t limited to counting. Any aggregate — <code>AVG</code>, <code>STDDEV_SAMP</code>, <code>PERCENTILE_CONT</code> — can run per group. That turns "what\'s the average revenue?" (descriptive) into "which region\'s average is different, and by how much?" (diagnostic) — exactly the shift BA1 described between the two levels.</p>',
            ar: '<p>لا تقتصر <code>GROUP BY</code> على العدّ. يمكن لأي دالة تجميعية أن تعمل لكل مجموعة. هذا يحوّل "ما متوسط الإيراد؟" (وصفي) إلى "أي منطقة يختلف متوسطها، وبكم؟" (تشخيصي).</p>',
            fa: '<p><code>GROUP BY</code> فقط به شمارش محدود نیست. هر تابع تجمیعی می‌تواند برای هر گروه اجرا شود. این کار «میانگین درآمد چقدر است؟» (توصیفی) را به «میانگین کدام منطقه متفاوت است، و چقدر؟» (تشخیصی) تبدیل می‌کند.</p>',
          },
        },
        {
          type: 'code',
          code: `SELECT
  region,
  COUNT(*)                                                  AS num_sales,
  ROUND(AVG(revenue), 2)                                    AS avg_revenue,
  ROUND(STDDEV_SAMP(revenue), 2)                            AS stddev_revenue,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY revenue) AS median_revenue
FROM clearance_sales
GROUP BY region
ORDER BY avg_revenue DESC;`,
        },
        {
          type: 'table',
          headers: [
            { en: 'region', ar: 'المنطقة', fa: 'منطقه' },
            { en: 'num_sales', ar: 'عدد المبيعات', fa: 'تعداد فروش' },
            { en: 'avg_revenue', ar: 'متوسط الإيراد', fa: 'میانگین درآمد' },
            { en: 'stddev_revenue', ar: 'الانحراف المعياري', fa: 'انحراف معیار' },
            { en: 'median_revenue', ar: 'الوسيط', fa: 'میانه' },
          ],
          rows: [
            [
              { en: '<strong>East</strong>' },
              { en: '7' },
              { en: '3658.29' },
              { en: '1344.36' },
              { en: '3976.00' },
            ],
            [
              { en: '<strong>North</strong>' },
              { en: '7' },
              { en: '3130.86' },
              { en: '1136.18' },
              { en: '3360.00' },
            ],
            [
              { en: '<strong>South</strong>' },
              { en: '7' },
              { en: '2497.14' },
              { en: '923.22' },
              { en: '2800.00' },
            ],
            [
              { en: '<strong>West</strong>' },
              { en: '7' },
              { en: '2440.00' },
              { en: '1126.78' },
              { en: '2584.00' },
            ],
          ],
        },
        {
          type: 'box',
          variant: 'keypoint',
          label: {
            en: 'Reading this like BA1 taught you',
            ar: 'قراءة هذا كما علّمك BA1',
            fa: 'خواندن این جدول همان‌طور که BA1 آموخت',
          },
          html: {
            en: '<p>East isn\'t just highest on average — it also has the highest spread (stddev 1344.36, well above South\'s 923.22). Two regions can have different means for entirely different reasons: East might just run bigger sales days, or it might be one enormous outlier sale dragging its own average up. The mean alone can\'t tell you which — you\'d need to look at the underlying rows, exactly as BA1\'s "the mean describes nobody in the room" warning taught you.</p>',
            ar: '<p>الشرق ليس فقط الأعلى في المتوسط — بل لديه أيضًا أعلى تشتت (انحراف معياري 1344.36، أعلى بكثير من 923.22 في الجنوب). يمكن لمنطقتين أن يكون لديهما متوسطان مختلفان لأسباب مختلفة تمامًا. المتوسط وحده لا يستطيع إخبارك أيهما — ستحتاج للنظر في الصفوف الأساسية.</p>',
            fa: '<p>شرق فقط بالاترین میانگین را ندارد — بیشترین پراکندگی را هم دارد (انحراف معیار ۱۳۴۴.۳۶، بسیار بالاتر از ۹۲۳.۲۲ در جنوب). دو منطقه می‌توانند به دلایل کاملاً متفاوتی میانگین‌های متفاوت داشته باشند. میانگین به‌تنهایی نمی‌تواند بگوید کدام است — باید به ردیف‌های زیرین نگاه کنی.</p>',
          },
        },
        { type: 'exercise', questionId: 'w01-q007' },
      ],
    },
    {
      id: 'ai-corner',
      navLabel: { en: 'AI co-pilot corner', ar: 'ركن مساعد الذكاء الاصطناعي', fa: 'گوشه همیار هوش مصنوعی' },
      sectionLabel: {
        en: 'Section 08 — AI layer',
        ar: 'القسم ٠٨ — طبقة الذكاء الاصطناعي',
        fa: 'بخش ۰۸ — لایه هوش مصنوعی',
      },
      timeEst: { en: '7 min', ar: '٧ دقائق', fa: '۷ دقیقه' },
      headingHtml: {
        en: '<h2>AI co-pilot corner: SQL written by AI still needs Week 0\'s three checks</h2><p class="standfirst">An AI assistant will happily write you a syntactically perfect query that\'s statistically wrong.</p>',
        ar: '<h2>ركن مساعد الذكاء الاصطناعي: SQL المكتوب بالذكاء الاصطناعي ما زال يحتاج فحوصات الأسبوع صفر الثلاثة</h2><p class="standfirst">سيكتب لك مساعد الذكاء الاصطناعي بكل سرور استعلامًا سليمًا نحويًا لكنه خاطئ إحصائيًا.</p>',
        fa: '<h2>گوشه همیار هوش مصنوعی: SQL نوشتهٔ هوش مصنوعی هم به سه فحص هفته صفر نیاز دارد</h2><p class="standfirst">دستیار هوش مصنوعی با کمال میل پرس‌وجویی از نظر نحوی بی‌نقص اما از نظر آماری غلط برایت می‌نویسد.</p>',
      },
      blocks: [
        {
          type: 'tabs',
          tabs: [
            {
              label: { en: 'Weak prompt', ar: 'طلب ضعيف', fa: 'درخواست ضعیف' },
              blocks: [
                {
                  type: 'html',
                  html: {
                    en: '<p><strong>Prompt:</strong> "Write a SQL query to get the standard deviation of revenue."</p>',
                    ar: '<p><strong>الطلب:</strong> "اكتب استعلام SQL لحساب الانحراف المعياري للإيراد."</p>',
                    fa: '<p><strong>درخواست:</strong> «یک پرس‌وجوی SQL برای گرفتن انحراف معیار درآمد بنویس.»</p>',
                  },
                },
                {
                  type: 'code',
                  code: `-- What the assistant hands back:
SELECT SQRT(
  SUM(POWER(revenue - avg_rev, 2)) / COUNT(*)     -- divides by n
) AS stddev
FROM clearance_sales,
     (SELECT AVG(revenue) AS avg_rev FROM clearance_sales) t;`,
                },
                {
                  type: 'html',
                  html: {
                    en: '<p>It runs. It returns a number. The number is <strong>wrong for this use case</strong> — it silently divides by <code>n</code> (population formula) when these rows are a sample, because the prompt never said which one mattered, and the assistant guessed.</p>',
                    ar: '<p>يعمل. يُعيد رقمًا. الرقم <strong>خاطئ لهذا الاستخدام</strong> — فهو يقسم بصمت على <code>n</code> (صيغة المجتمع) بينما هذه الصفوف عيّنة.</p>',
                    fa: '<p>اجرا می‌شود. عددی برمی‌گرداند. آن عدد <strong>برای این کاربرد غلط است</strong> — بی‌سروصدا بر <code>n</code> (فرمول جامعه) تقسیم می‌کند درحالی‌که این ردیف‌ها یک نمونه‌اند.</p>',
                  },
                },
              ],
            },
            {
              label: { en: 'Strong prompt', ar: 'طلب قوي', fa: 'درخواست قوی' },
              blocks: [
                {
                  type: 'html',
                  html: {
                    en: '<p><strong>Prompt:</strong> "Write a PostgreSQL query that computes the <em>sample</em> standard deviation (n−1 denominator) of the revenue column in clearance_sales, using STDDEV_SAMP, and explain in a comment why sample vs. population matters here."</p>',
                    ar: '<p><strong>الطلب:</strong> "اكتب استعلام PostgreSQL يحسب الانحراف المعياري <em>للعيّنة</em> (بمقام n−1) لعمود الإيراد في clearance_sales، باستخدام STDDEV_SAMP، واشرح في تعليق سبب أهمية التفريق بين العيّنة والمجتمع هنا."</p>',
                    fa: '<p><strong>درخواست:</strong> «یک پرس‌وجوی PostgreSQL بنویس که انحراف معیار <em>نمونه</em> (با مخرج n−1) ستون revenue را در clearance_sales با استفاده از STDDEV_SAMP محاسبه کند، و در یک توضیح بگو چرا تفاوت نمونه و جامعه اینجا اهمیت دارد.»</p>',
                  },
                },
                {
                  type: 'code',
                  code: `-- These 28 rows are a sample of the store's clearance history,
-- not the entire population of every sale ever made, so we divide by n-1.
SELECT ROUND(STDDEV_SAMP(revenue), 2) AS stddev_sample
FROM clearance_sales;

-- stddev_sample = 1191.15`,
                },
              ],
            },
          ],
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 5', ar: 'الرسم ٥', fa: 'نمودار ۵' },
          title: {
            en: 'The three checks, for SQL this time',
            ar: 'الفحوصات الثلاثة، لـSQL هذه المرة',
            fa: 'سه فحص، این‌بار برای SQL',
          },
          src: '/figures/week-01/diagram-05.svg',
          alt: 'AI-generated SQL passes through three checks before it becomes a decision, or loops back',
          caption: {
            en: 'Verify it" is exactly the check that catches the n-vs-n−1 mistake — a syntactically valid query is not the same as a correct one.',
            ar: '"تحقق منه" هو بالضبط الفحص الذي يرصد خطأ n مقابل n−1 — الاستعلام السليم نحويًا ليس بالضرورة صحيحًا.',
            fa: '«تأییدش کن» دقیقاً همان فحصی است که اشتباه n در برابر n−1 را می‌گیرد — پرس‌وجویی که از نظر نحوی معتبر است، لزوماً درست هم نیست.',
          },
        },
        {
          type: 'box',
          variant: 'mistake',
          label: { en: 'Common mistake', ar: 'خطأ شائع', fa: 'اشتباه رایج' },
          html: {
            en: '<p>Accepting an AI-generated statistic because the query ran without an error. A query with zero syntax errors and one wrong assumption produces a confident, clean-looking, wrong number — which is far more dangerous than a query that fails to run at all.</p>',
            ar: '<p>قبول إحصاء أنتجه الذكاء الاصطناعي لمجرد أن الاستعلام عمل دون خطأ. استعلام بلا أخطاء نحوية وبافتراض واحد خاطئ ينتج رقمًا واثقًا وأنيق المظهر لكنه خاطئ.</p>',
            fa: '<p>پذیرفتن آماری تولیدشده توسط هوش مصنوعی فقط به این دلیل که پرس‌وجو بدون خطا اجرا شد. پرس‌وجویی بدون هیچ خطای نحوی و با یک فرض غلط، عددی مطمئن، شیک و غلط تولید می‌کند.</p>',
          },
        },
        { type: 'exercise', questionId: 'w01-q008' },
      ],
    },
    {
      id: 'worked-example',
      navLabel: { en: 'Worked example', ar: 'مثال تطبيقي', fa: 'مثال حل‌شده' },
      sectionLabel: { en: 'Section 09', ar: 'القسم ٠٩', fa: 'بخش ۰۹' },
      timeEst: { en: '8 min', ar: '٨ دقائق', fa: '۸ دقیقه' },
      headingHtml: {
        en: '<h2>Worked example: the winter-coat clearance, in full</h2><p class="standfirst">Week 0 introduced this decision conceptually. Now you have the real table and the real numbers behind it.</p>',
        ar: '<h2>مثال تطبيقي: تخفيض المعاطف الشتوية، كاملاً</h2><p class="standfirst">قدّم الأسبوع صفر هذا القرار من الناحية المفاهيمية. الآن لديك الجدول الحقيقي والأرقام الحقيقية خلفه.</p>',
        fa: '<h2>مثال حل‌شده: تسویهٔ معطف زمستانی، به‌طور کامل</h2><p class="standfirst">هفته صفر این تصمیم را از نظر مفهومی معرفی کرد. حالا جدول واقعی و اعداد واقعی پشت آن را داری.</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: "<p>A department store ran winter-coat clearance sales across four regions, at discounts from 10% to 40%. The store's leadership wants one question answered: <strong>which region's approach should the others copy?</strong></p><p>Four queries answer it — the same four ideas this whole page has covered, run in sequence:</p>",
            ar: '<p>أجرى متجر كبير تخفيضات على معاطف شتوية عبر أربع مناطق، بخصومات من ١٠٪ إلى ٤٠٪. تريد إدارة المتجر إجابة سؤال واحد: <strong>أي نهج من مناطق يجب أن تنسخه البقية؟</strong></p><p>أربعة استعلامات تجيب عن هذا:</p>',
            fa: '<p>یک فروشگاه زنجیره‌ای حراج تسویهٔ معطف زمستانی را در چهار منطقه، با تخفیف‌هایی از ۱۰٪ تا ۴۰٪ اجرا کرد. مدیریت فروشگاه پاسخ یک سؤال را می‌خواهد: <strong>رویکرد کدام منطقه باید الگوی بقیه باشد؟</strong></p><p>چهار پرس‌وجو به آن پاسخ می‌دهند:</p>',
          },
        },
        {
          type: 'box',
          variant: 'example',
          label: {
            en: '1. The overall picture (mean & spread)',
            ar: '١. الصورة الإجمالية (المتوسط والتشتت)',
            fa: '۱. تصویر کلی (میانگین و پراکندگی)',
          },
          html: {
            en: '<p>Across all 28 sales: mean revenue <strong>$2,931.57</strong>, sample standard deviation <strong>$1,191.15</strong>. That spread is large relative to the mean — a single region-level number would hide a lot.</p>',
            ar: '<p>عبر جميع المبيعات الـ٢٨: متوسط الإيراد <strong>٢٬٩٣١.٥٧ دولار</strong>، والانحراف المعياري للعيّنة <strong>١٬١٩١.١٥ دولار</strong>.</p>',
            fa: '<p>در میان همهٔ ۲۸ فروش: میانگین درآمد <strong>۲٬۹۳۱.۵۷ دلار</strong>، انحراف معیار نمونه <strong>۱٬۱۹۱.۱۵ دلار</strong>.</p>',
          },
        },
        {
          type: 'box',
          variant: 'example',
          label: {
            en: '2. The frequency distribution',
            ar: '٢. التوزيع التكراري',
            fa: '۲. توزیع فراوانی',
          },
          html: {
            en: "<p>Section 5's histogram already showed most sales cluster in the $2,000–$3,999 range (7 + 9 = 16 of 28 sales), with only 4 sales making it past $4,000.</p>",
            ar: '<p>أظهر الرسم البياني في القسم ٥ أن معظم المبيعات تتجمع في نطاق ٢٬٠٠٠–٣٬٩٩٩ دولار (٧ + ٩ = ١٦ من أصل ٢٨).</p>',
            fa: '<p>هیستوگرام بخش ۵ نشان داد که بیشتر فروش‌ها در بازهٔ ۲٬۰۰۰ تا ۳٬۹۹۹ دلار متمرکزند (۷ + ۹ = ۱۶ از ۲۸ فروش).</p>',
          },
        },
        {
          type: 'box',
          variant: 'example',
          label: { en: '3. The regional comparison', ar: '٣. المقارنة الإقليمية', fa: '۳. مقایسهٔ منطقه‌ای' },
          html: {
            en: "<p>Section 7's <code>GROUP BY region</code> table, visualized:</p>",
            ar: '<p>جدول <code>GROUP BY region</code> من القسم ٧، مرئيًا:</p>',
            fa: '<p>جدول <code>GROUP BY region</code> بخش ۷، به‌صورت تصویری:</p>',
          },
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 6', ar: 'الرسم ٦', fa: 'نمودار ۶' },
          title: {
            en: 'Average revenue and spread, by region',
            ar: 'متوسط الإيراد والتشتت، حسب المنطقة',
            fa: 'میانگین درآمد و پراکندگی، به تفکیک منطقه',
          },
          src: '/figures/week-01/diagram-06.svg',
          alt: 'Average clearance revenue by region: North 3130.86, South 2497.14, East 3658.29, West 2440.00, with spread shown as an error bar',
          caption: {
            en: 'East leads on average — but also has the widest whiskers, meaning the least consistent results.',
            ar: 'يتصدّر الشرق في المتوسط — لكن لديه أيضًا أوسع الشرائط، أي أقل النتائج اتساقًا.',
            fa: 'شرق در میانگین پیشتاز است — اما پهن‌ترین سبیل‌ها را هم دارد، یعنی کم‌ثبات‌ترین نتایج.',
          },
        },
        {
          type: 'box',
          variant: 'keypoint',
          label: { en: '4. The decision', ar: '٤. القرار', fa: '۴. تصمیم' },
          html: {
            en: '<p>East\'s approach earns the most on average — but the same data shows East is also the least predictable region, with a standard deviation nearly 46% higher than South\'s. Copying East\'s discount strategy chain-wide is a bet on volatility, not just revenue. The recommendation: pilot East\'s approach in one more region first, and specifically check whether East\'s high average is broad-based or driven by one or two outlier sale days, before rolling it out everywhere.</p>',
            ar: '<p>يحقق نهج الشرق الأعلى في المتوسط — لكن نفس البيانات تُظهر أن الشرق أيضًا أقل المناطق قابلية للتنبؤ، بانحراف معياري أعلى بنسبة ٤٦٪ تقريبًا من الجنوب. التوصية: جرّب نهج الشرق في منطقة إضافية واحدة أولاً.</p>',
            fa: '<p>رویکرد شرق در میانگین بیشترین درآمد را کسب می‌کند — اما همان داده نشان می‌دهد شرق کم‌قابل‌پیش‌بینی‌ترین منطقه هم هست، با انحراف معیاری نزدیک به ۴۶٪ بالاتر از جنوب. توصیه: ابتدا رویکرد شرق را در یک منطقهٔ دیگر آزمایش کن.</p>',
          },
        },
        { type: 'exercise', questionId: 'w01-q009' },
      ],
    },
    {
      id: 'common-mistakes',
      navLabel: { en: 'Common mistakes', ar: 'أخطاء شائعة', fa: 'اشتباهات رایج' },
      sectionLabel: { en: 'Section 10', ar: 'القسم ١٠', fa: 'بخش ۱۰' },
      headingHtml: {
        en: '<h2>Common mistakes, gathered in one place</h2><p class="standfirst">Everything this page warned about, as a single reference.</p>',
        ar: '<h2>الأخطاء الشائعة، مجمّعة في مكان واحد</h2><p class="standfirst">كل ما حذّرت منه هذه الصفحة، كمرجع واحد.</p>',
        fa: '<h2>اشتباهات رایج، در یک‌جا گردآوری شده</h2><p class="standfirst">هر چیزی که این صفحه دربارهٔ آن هشدار داد، به‌عنوان یک مرجع واحد.</p>',
      },
      blocks: [
        {
          type: 'table',
          headers: [
            { en: 'Mistake', ar: 'الخطأ', fa: 'اشتباه' },
            { en: 'Why it matters', ar: 'لماذا يهم', fa: 'چرا اهمیت دارد' },
          ],
          rows: [
            [
              { en: '<strong>STDDEV_POP instead of STDDEV_SAMP</strong>' },
              {
                en: 'Dividing by n instead of n−1 understates the true spread whenever your rows are a sample, not the full population — which is almost always.',
                ar: 'القسمة على n بدلاً من n−1 تقلل من التشتت الحقيقي كلما كانت صفوفك عيّنة لا المجتمع الكامل.',
                fa: 'تقسیم بر n به‌جای n−1 هرگاه ردیف‌هایت نمونه باشند نه کل جامعه، پراکندگی واقعی را کمتر از حد نشان می‌دهد.',
              },
            ],
            [
              { en: '<strong>Assuming COUNT(*) = COUNT(column)</strong>' },
              {
                en: '<code>COUNT(column)</code> silently skips NULLs. If you want the row count regardless of missing values, use <code>COUNT(*)</code>.',
                ar: 'تتجاهل <code>COUNT(column)</code> قيم NULL بصمت. إن أردت عدد الصفوف، استخدم <code>COUNT(*)</code>.',
                fa: '<code>COUNT(column)</code> بی‌سروصدا مقادیر NULL را نادیده می‌گیرد. برای شمارش همهٔ ردیف‌ها از <code>COUNT(*)</code> استفاده کن.',
              },
            ],
            [
              { en: '<strong>A SELECT column missing from GROUP BY</strong>' },
              {
                en: 'Postgres errors instead of guessing — every non-aggregated column in SELECT must appear in GROUP BY too.',
                ar: 'يُصدر Postgres خطأ بدلاً من التخمين — كل عمود غير مجمّع في SELECT يجب أن يظهر أيضًا في GROUP BY.',
                fa: 'Postgres به‌جای حدس‌زدن خطا می‌دهد — هر ستون تجمیع‌نشده در SELECT باید در GROUP BY هم ظاهر شود.',
              },
            ],
          ],
        },
      ],
    },
    {
      id: 'homework',
      navLabel: { en: 'Homework', ar: 'الواجب', fa: 'تکلیف' },
      sectionLabel: { en: 'Section 11', ar: 'القسم ١١', fa: 'بخش ۱۱' },
      headingHtml: {
        en: "<h2>Homework: write your report to the regional director</h2><p class=\"standfirst\">You're the analyst. The regional director from Section 1 is waiting on your answer. Write it up as a short report, in your own words — each section below is small on its own; answer them in order.</p>",
        ar: '<h2>الواجب: اكتب تقريرك للمدير الإقليمي</h2><p class="standfirst">أنت المحلّل. المدير الإقليمي من القسم ١ ينتظر إجابتك. اكتبها كتقرير قصير، بكلماتك الخاصة.</p>',
        fa: '<h2>تکلیف: گزارشت را برای مدیر منطقه‌ای بنویس</h2><p class="standfirst">تو تحلیل‌گر هستی. مدیر منطقه‌ای بخش ۱ منتظر پاسخ توست. آن را به‌صورت گزارشی کوتاه، با کلمات خودت بنویس.</p>',
      },
      blocks: [
        {
          type: 'box',
          variant: 'keypoint',
          label: {
            en: 'Write your report, section by section, in order',
            ar: 'اكتب تقريرك، قسمًا تلو الآخر، بالترتيب',
            fa: 'گزارشت را بخش‌به‌بخش، به ترتیب بنویس',
          },
          html: {
            en: '<ol><li><strong>Set the scene</strong> — In 2–3 sentences, describe the dataset and the business question the regional director actually wants answered.</li><li><strong>Why SQL, not Excel</strong> — Explain why this couldn\'t just be done by opening a spreadsheet.</li><li><strong>The center and the spread</strong> — What did AVG, COUNT, and SUM tell you? Then explain the standard deviation.</li><li><strong>The shape of the data</strong> — What did grouping the sales into buckets show you? What did the median add?</li><li><strong>Comparing regions</strong> — Which region had the highest average revenue per sale? Which was the most volatile? Paste the actual SQL query you ran and its result.</li><li><strong>Working with AI</strong> — Describe a moment where you\'d need to explain, verify, or stand behind a SQL query an AI wrote for you.</li><li><strong>The decision</strong> — Should the chain roll out the best-performing region\'s discount strategy everywhere next season? Justify it with the actual numbers.</li></ol>',
            ar: '<ol><li><strong>حدّد المشهد</strong> — في ٢-٣ جمل، صف البيانات والسؤال التجاري الذي يريد المدير الإقليمي إجابة عنه.</li><li><strong>لماذا SQL لا Excel</strong> — اشرح سبب استحالة إنجاز هذا بمجرد فتح جدول بيانات.</li><li><strong>المركز والتشتت</strong> — ماذا أخبرتك AVG وCOUNT وSUM؟ ثم اشرح الانحراف المعياري.</li><li><strong>شكل البيانات</strong> — ماذا أظهر لك تجميع المبيعات في فئات؟ ماذا أضاف الوسيط؟</li><li><strong>مقارنة المناطق</strong> — أي منطقة كان لديها أعلى متوسط إيراد؟ أيها كانت الأكثر تقلبًا؟ الصق استعلام SQL الفعلي ونتيجته.</li><li><strong>العمل مع الذكاء الاصطناعي</strong> — صف لحظة تحتاج فيها لشرح أو التحقق من استعلام SQL كتبه ذكاء اصطناعي.</li><li><strong>القرار</strong> — هل ينبغي أن تعمم السلسلة استراتيجية أفضل منطقة الموسم القادم؟ برّر بالأرقام الفعلية.</li></ol>',
            fa: '<ol><li><strong>صحنه را بچین</strong> — در ۲ تا ۳ جمله، دادگان و سؤال کسب‌وکاری مدیر منطقه‌ای را توصیف کن.</li><li><strong>چرا SQL، نه Excel</strong> — توضیح بده چرا این کار با یک صفحه‌گسترده انجام نمی‌شد.</li><li><strong>مرکز و پراکندگی</strong> — AVG، COUNT و SUM چه چیزی به تو گفتند؟ سپس انحراف معیار را توضیح بده.</li><li><strong>شکل داده</strong> — گروه‌بندی فروش‌ها چه چیزی نشان داد؟ میانه چه چیزی افزود؟</li><li><strong>مقایسهٔ مناطق</strong> — کدام منطقه بالاترین میانگین را داشت؟ کدام‌یک بی‌ثبات‌ترین بود؟ پرس‌وجوی SQL واقعی و نتیجه‌اش را جای‌گذاری کن.</li><li><strong>کار با هوش مصنوعی</strong> — لحظه‌ای را توصیف کن که لازم بود پرس‌وجوی نوشتهٔ هوش مصنوعی را تأیید کنی.</li><li><strong>تصمیم</strong> — آیا زنجیره باید استراتژی بهترین منطقه را فصل بعد اجرا کند؟ با اعداد واقعی توجیه کن.</li></ol>',
          },
        },
      ],
    },
    {
      id: 'before-week-2',
      navLabel: { en: 'Before Week 2', ar: 'قبل الأسبوع 2', fa: 'پیش از هفته ۲' },
      sectionLabel: { en: 'Section 12', ar: 'القسم ١٢', fa: 'بخش ۱۲' },
      headingHtml: {
        en: '<h2>Before Week 2</h2><p>Every query this week read from one table. Week 2 introduces <code>JOIN</code> — combining rows from two tables at once — but that\'s next week\'s problem, not this one\'s.</p>',
        ar: '<h2>قبل الأسبوع ٢</h2><p>كل استعلام هذا الأسبوع قرأ من جدول واحد. يقدّم الأسبوع ٢ عبارة <code>JOIN</code> — دمج صفوف من جدولين في آن واحد.</p>',
        fa: '<h2>پیش از هفته ۲</h2><p>هر پرس‌وجوی این هفته از یک جدول می‌خواند. هفته ۲ عبارت <code>JOIN</code> را معرفی می‌کند — ترکیب ردیف‌ها از دو جدول همزمان.</p>',
      },
      blocks: [],
    },
  ],
}
