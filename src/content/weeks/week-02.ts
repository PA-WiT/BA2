// Migrated from ../../../../course/_shared/question-banks/week-02.questions.js and
// ../../../../course/_shared/i18n/week-02.strings.js (see the migrate-week-content skill).
// Note: several boxes/the objectives block are missing their outer `.box <variant>`/`.objectives`
// wrapper in the source HTML (an authoring gap on that page, inconsistent with week-01) — rendered
// here with the variant that best matches each label's meaning instead of reproducing the gap.
import type { Question, Week } from '../types'
import { week02Homework } from './homework/week-02'

const questions: Question[] = [
  {
    id: 'w02-q001',
    weekId: 'week-02',
    topic: 'welcome',
    answer: 0,
    prompt: {
      en: 'You need to know how many Peach jars were sold on 2024-05-18. Which table alone answers this?',
      ar: 'تحتاج معرفة كم برطمان خوخ بيع في 2024-05-18. أي جدول وحده يجيب عن هذا؟',
      fa: 'می‌خواهی بدانی چند شیشه هلو در تاریخ ۲۰۲۴-۰۵-۱۸ فروخته شد. کدام جدول به‌تنهایی پاسخ می‌دهد؟',
    },
    options: [
      { en: 'jam_sales', ar: 'jam_sales', fa: 'jam_sales' },
      { en: 'jam_products', ar: 'jam_products', fa: 'jam_products' },
      { en: 'Neither table alone', ar: 'لا جدول وحده', fa: 'هیچ‌کدام به‌تنهایی' },
    ],
  },
  {
    id: 'w02-q002',
    weekId: 'week-02',
    topic: 'metrics-overview',
    answer: 1,
    prompt: {
      en: 'Which of these is a genuine business metric, not just a feeling?',
      ar: 'أي مما يلي مقياس أعمال حقيقي، لا مجرد شعور؟',
      fa: 'کدام‌یک از این‌ها یک معیار کسب‌وکار واقعی است، نه فقط یک حس؟',
    },
    options: [
      { en: 'Sales felt good this week', ar: 'شعرت المبيعات بأنها جيدة هذا الأسبوع', fa: 'این هفته فروش حس خوبی داشت' },
      { en: 'Monthly revenue = $12,400', ar: 'الإيراد الشهري = 12,400 دولار', fa: 'درآمد ماهانه = ۱۲٬۴۰۰ دلار' },
      { en: 'The stand seemed busy on Saturday', ar: 'بدا الكشك مزدحمًا يوم السبت', fa: 'غرفه شنبه شلوغ به‌نظر می‌رسید' },
    ],
  },
  {
    id: 'w02-q003',
    weekId: 'week-02',
    topic: 'metrics-by-industry',
    answer: 2,
    prompt: {
      en: "A hotel's Average Daily Rate is room revenue divided by rooms rented. Which industry uses Table Turnover Rate instead?",
      ar: 'متوسط السعر اليومي للفندق هو إيراد الغرف مقسومًا على الغرف المؤجَّرة. أي قطاع يستخدم معدل دوران الطاولات بدلاً من ذلك؟',
      fa: 'نرخ متوسط روزانهٔ هتل، درآمد اتاق تقسیم بر اتاق‌های اجاره‌شده است. کدام صنعت به‌جای آن از نرخ گردش میز استفاده می‌کند؟',
    },
    options: [
      { en: 'Retail', ar: 'تجزئة', fa: 'خرده‌فروشی' },
      { en: 'Hospitality', ar: 'ضيافة', fa: 'مهمان‌نوازی' },
      { en: 'Restaurant', ar: 'مطعم', fa: 'رستوران' },
    ],
  },
  {
    id: 'w02-q004',
    weekId: 'week-02',
    topic: 'excel-functions',
    answer: 0,
    prompt: {
      en: "Which Excel function is closest to SQL's GROUP BY + AVG() combined into one condition?",
      ar: 'أي دالة Excel هي الأقرب إلى GROUP BY + AVG() في SQL مدمجتين في شرط واحد؟',
      fa: 'کدام تابع Excel به GROUP BY + AVG() در SQL که در یک شرط ترکیب شده‌اند، نزدیک‌تر است؟',
    },
    options: [
      { en: 'AVERAGEIF()', ar: 'AVERAGEIF()', fa: 'AVERAGEIF()' },
      { en: 'AVERAGE()', ar: 'AVERAGE()', fa: 'AVERAGE()' },
      { en: 'MEDIAN()', ar: 'MEDIAN()', fa: 'MEDIAN()' },
    ],
  },
  {
    id: 'w02-q005',
    weekId: 'week-02',
    topic: 'two-tables',
    answer: 2,
    prompt: {
      en: 'Why does price live in jam_products instead of being copied into every jam_sales row?',
      ar: 'لماذا يعيش السعر في jam_products بدلاً من نسخه إلى كل صف في jam_sales؟',
      fa: 'چرا قیمت در jam_products زندگی می‌کند به‌جای کپی‌شدن در هر ردیف jam_sales؟',
    },
    options: [
      {
        en: "Because SQL doesn't allow numbers in a sales table",
        ar: 'لأن SQL لا يسمح بالأرقام في جدول مبيعات',
        fa: 'چون SQL اجازهٔ اعداد در جدول فروش را نمی‌دهد',
      },
      {
        en: 'Because jam_sales already has too many columns',
        ar: 'لأن jam_sales لديه أعمدة كثيرة جدًا بالفعل',
        fa: 'چون jam_sales از قبل ستون‌های زیادی دارد',
      },
      {
        en: 'So it can be updated once instead of everywhere it was copied',
        ar: 'حتى يمكن تحديثه مرة واحدة بدلاً من كل مكان نُسخ إليه',
        fa: 'تا بتوان آن را یک‌بار به‌روزرسانی کرد به‌جای هر جایی که کپی شده',
      },
    ],
  },
  {
    id: 'w02-q006',
    weekId: 'week-02',
    topic: 'inner-join',
    answer: 1,
    prompt: {
      en: 'Using INNER JOIN, how many of the 13 jam_sales rows come back when joined to jam_products?',
      ar: 'باستخدام INNER JOIN، كم صفًا من الـ13 صفًا في jam_sales يعود عند الدمج مع jam_products؟',
      fa: 'با استفاده از INNER JOIN، چند ردیف از ۱۳ ردیف jam_sales هنگام پیوستن به jam_products برمی‌گردد؟',
    },
    options: [
      { en: '13', ar: '13', fa: '۱۳' },
      { en: '12', ar: '12', fa: '۱۲' },
      { en: '9', ar: '9', fa: '۹' },
    ],
  },
  {
    id: 'w02-q007',
    weekId: 'week-02',
    topic: 'left-join',
    answer: 0,
    prompt: {
      en: "Using LEFT JOIN instead, what happens to the Lemon row's selling_price and cost_price?",
      ar: 'باستخدام LEFT JOIN بدلاً من ذلك، ماذا يحدث لـselling_price وcost_price لصف الليمون؟',
      fa: 'با استفاده از LEFT JOIN به‌جای آن، بر سر selling_price و cost_price ردیف لیمون چه می‌آید؟',
    },
    options: [
      {
        en: 'They come back as NULL, and the row stays',
        ar: 'تعودان كـNULL، ويبقى الصف',
        fa: 'به‌صورت NULL برمی‌گردند، و ردیف باقی می‌ماند',
      },
      { en: 'The row is dropped, same as INNER JOIN', ar: 'يُحذف الصف، كما في INNER JOIN', fa: 'ردیف حذف می‌شود، مثل INNER JOIN' },
      { en: 'SQL raises an error', ar: 'يُصدر SQL خطأ', fa: 'SQL خطا می‌دهد' },
    ],
  },
  {
    id: 'w02-q008',
    weekId: 'week-02',
    topic: 'calculating-metrics-sql',
    answer: 1,
    prompt: {
      en: 'Which flavor has the best profit margin, even though it sells the fewest units?',
      ar: 'أي نكهة لديها أفضل هامش ربح، رغم أنها تبيع أقل كمية؟',
      fa: 'کدام طعم بهترین حاشیهٔ سود را دارد، با وجود اینکه کمترین تعداد را می‌فروشد؟',
    },
    options: [
      { en: 'Strawberry', ar: 'فراولة', fa: 'توت‌فرنگی' },
      { en: 'Peach', ar: 'خوخ', fa: 'هلو' },
      { en: 'Blueberry', ar: 'توت أزرق', fa: 'بلوبری' },
    ],
  },
  {
    id: 'w02-q009',
    weekId: 'week-02',
    topic: 'ai-corner',
    answer: 2,
    prompt: {
      en: "An AI assistant writes a plain JOIN (no INNER/LEFT specified) for a report that needs to show unpriced sales too. What's the bug?",
      ar: 'يكتب مساعد ذكاء اصطناعي JOIN مجردة (بلا تحديد INNER أو LEFT) لتقرير يحتاج إظهار المبيعات غير المسعَّرة أيضًا. ما الخطأ؟',
      fa: 'یک دستیار هوش مصنوعی برای گزارشی که باید فروش‌های بی‌قیمت را هم نشان دهد، یک JOIN ساده (بدون تعیین INNER یا LEFT) می‌نویسد. باگ کجاست؟',
    },
    options: [
      {
        en: 'Plain JOIN defaults to LEFT JOIN, which is correct here',
        ar: 'JOIN المجردة تُهمَل إلى LEFT JOIN، وهذا صحيح هنا',
        fa: 'JOIN ساده به‌طور پیش‌فرض LEFT JOIN است، که اینجا درست است',
      },
      {
        en: 'There is no bug — the query is fine either way',
        ar: 'لا يوجد خطأ — الاستعلام سليم في كلتا الحالتين',
        fa: 'هیچ باگی نیست — پرس‌وجو در هر دو حالت درست است',
      },
      {
        en: 'Plain JOIN defaults to INNER JOIN, which silently hides the unpriced sale',
        ar: 'JOIN المجردة تُهمَل إلى INNER JOIN، التي تخفي بصمت عملية البيع غير المسعَّرة',
        fa: 'JOIN ساده به‌طور پیش‌فرض INNER JOIN است، که بی‌سروصدا فروش بی‌قیمت را پنهان می‌کند',
      },
    ],
  },
  {
    id: 'w02-q010',
    weekId: 'week-02',
    topic: 'worked-example',
    answer: 1,
    prompt: {
      en: 'Strawberry earns the most total profit. Why doesn\'t the recommendation say "sell only Strawberry"?',
      ar: 'يحقق الفراولة أكبر ربح إجمالي. لماذا لا تقول التوصية "بِع الفراولة فقط"؟',
      fa: 'توت‌فرنگی بیشترین سود کل را کسب می‌کند. چرا توصیه نمی‌گوید «فقط توت‌فرنگی بفروش»؟',
    },
    options: [
      {
        en: 'Strawberry is actually losing money',
        ar: 'الفراولة يخسر المال فعليًا',
        fa: 'توت‌فرنگی در واقع ضرر می‌دهد',
      },
      {
        en: "Peach's much higher margin means it's worth featuring more, not just chasing today's top seller",
        ar: 'هامش الخوخ الأعلى بكثير يعني أنه يستحق الإبراز أكثر، لا فقط ملاحقة الأكثر مبيعًا اليوم',
        fa: 'حاشیهٔ بسیار بالاتر هلو یعنی ارزش برجسته‌کردن بیشتر دارد، نه فقط دنبال‌کردن پرفروش‌ترین امروز',
      },
      {
        en: 'The stand has run out of Strawberry jars',
        ar: 'نفد الكشك من برطمانات الفراولة',
        fa: 'شیشه‌های توت‌فرنگی غرفه تمام شده',
      },
    ],
  },
]

export const weekTwo: Week = {
  id: 'week-02',
  originalPdf: '/originals/week-02.pdf',
  order: 2,
  preview: true,
  cover: {
    kicker: { en: 'Business Analytics 2 · Week 2', ar: 'تحليلات الأعمال 2 · الأسبوع 2', fa: 'تحلیل کسب‌وکار ۲ · هفته ۲' },
    titleHtml: {
      en: '<h1>Calculating Metrics:<em>From One Table to Two</em></h1><p class="lede">Last week every answer came from a single table. This week the business questions get harder on purpose: you can\'t compute profit from a sales table alone — you need a second table with prices and costs, and a way to combine them.</p>',
      ar: '<h1>حساب المقاييس:<em>من جدول واحد إلى جدولين</em></h1><p class="lede">في الأسبوع الماضي، جاءت كل إجابة من جدول واحد. هذا الأسبوع تصعب الأسئلة التجارية عمدًا: لا يمكنك حساب الربح من جدول المبيعات وحده — تحتاج جدولاً ثانيًا فيه الأسعار والتكاليف، وطريقة لدمجهما.</p>',
      fa: '<h1>محاسبهٔ معیارها:<em>از یک جدول به دو جدول</em></h1><p class="lede">هفتهٔ گذشته هر پاسخی از یک جدول می‌آمد. این هفته سؤال‌های کسب‌وکاری عمداً سخت‌تر می‌شوند: نمی‌توانی سود را فقط از جدول فروش محاسبه کنی — به جدولی دوم با قیمت‌ها و هزینه‌ها نیاز داری، و راهی برای ترکیب آن‌ها.</p>',
    },
    timeEstimate: { en: '≈ 60 min · reading + SQL practice', ar: '≈ ٦٠ دقيقة · قراءة وتدريب SQL', fa: '≈ ۶۰ دقیقه · مطالعه و تمرین SQL' },
  },
  questions,
  sections: [
    {
      id: 'welcome',
      navLabel: { en: 'Welcome', ar: 'ترحيب', fa: 'خوش‌آمدید' },
      sectionLabel: { en: 'Section 01', ar: 'القسم ٠١', fa: 'بخش ۰۱' },
      timeEst: { en: '6 min', ar: '٦ دقائق', fa: '۶ دقیقه' },
      headingHtml: {
        en: '<h2>Welcome: the same table trick, twice</h2><p class="standfirst">Week 1 answered "what\'s typical, and how spread out." This week asks a harder question: "are we actually making money" — and that question needs two tables, not one.</p>',
        ar: '<h2>ترحيب: نفس حيلة الجدول، مرتين</h2><p class="standfirst">أجاب الأسبوع 1 عن "ما المعتاد، وكم التشتت". هذا الأسبوع يطرح سؤالاً أصعب: "هل نربح فعلاً" — وهذا السؤال يحتاج جدولين، لا جدولاً واحدًا.</p>',
        fa: '<h2>خوش‌آمدید: همان ترفند جدول، دوبار</h2><p class="standfirst">هفتهٔ ۱ به «چه چیزی معمول است، و چقدر پراکنده» پاسخ داد. این هفته سؤالی سخت‌تر می‌پرسد: «آیا واقعاً سود می‌کنیم» — و این سؤال به دو جدول نیاز دارد، نه یکی.</p>',
      },
      blocks: [
        {
          type: 'objectives',
          label: { en: "By the end, you'll be able to", ar: 'بنهاية هذا القسم ستكون قادرًا على', fa: 'در پایان این بخش می‌توانی' },
          items: [
            {
              en: 'Calculate revenue, cost, profit, and profit margin from real sales data',
              ar: 'حساب الإيراد والتكلفة والربح وهامش الربح من بيانات مبيعات حقيقية',
              fa: 'درآمد، هزینه، سود و حاشیهٔ سود را از داده‌های فروش واقعی محاسبه کنی',
            },
            {
              en: 'Explain why prices and costs usually live in a separate table from sales, and combine them with <code>JOIN</code>',
              ar: 'توضيح سبب عيش الأسعار والتكاليف عادةً في جدول منفصل عن المبيعات، ودمجهما باستخدام <code>JOIN</code>',
              fa: 'توضیح دهی چرا قیمت‌ها و هزینه‌ها معمولاً در جدولی جدا از فروش زندگی می‌کنند، و آن‌ها را با <code>JOIN</code> ترکیب کنی',
            },
            {
              en: 'Choose between <code>INNER JOIN</code> and <code>LEFT JOIN</code> depending on whether missing matches should be hidden or surfaced',
              ar: 'الاختيار بين <code>INNER JOIN</code> و<code>LEFT JOIN</code> حسب ما إذا كان ينبغي إخفاء التطابقات المفقودة أو إظهارها',
              fa: 'بین <code>INNER JOIN</code> و <code>LEFT JOIN</code> بر اساس اینکه تطابق‌های گم‌شده باید پنهان یا آشکار شوند، انتخاب کنی',
            },
          ],
        },
        {
          type: 'html',
          html: {
            en: '<p>Quick recap of Week 1\'s toolkit, since today builds on it directly: <code>SELECT / FROM / WHERE</code> to choose your sample, <code>AVG / COUNT / SUM</code> for the center, <code>STDDEV_SAMP</code> for the spread, and <code>GROUP BY</code> to get one stat per category instead of one for the whole table. Everything this week adds sits on top of that — nothing from Week 1 gets replaced.</p>',
            ar: '<p>مراجعة سريعة لأدوات الأسبوع 1، لأن اليوم يُبنى عليها مباشرة: <code>SELECT / FROM / WHERE</code> لاختيار عيّنتك، <code>AVG / COUNT / SUM</code> للمركز، <code>STDDEV_SAMP</code> للتشتت، و<code>GROUP BY</code> للحصول على إحصاء واحد لكل فئة بدلاً من واحد للجدول كله.</p>',
            fa: '<p>مروری سریع بر ابزارهای هفتهٔ ۱، چون امروز مستقیماً روی آن ساخته می‌شود: <code>SELECT / FROM / WHERE</code> برای انتخاب نمونه‌ات، <code>AVG / COUNT / SUM</code> برای مرکز، <code>STDDEV_SAMP</code> برای پراکندگی، و <code>GROUP BY</code> برای گرفتن یک آمار به‌ازای هر دسته به‌جای یکی برای کل جدول.</p>',
          },
        },
        {
          type: 'html',
          html: {
            en: '<p>Here\'s this week\'s running scenario: you help run a jam stand at a Saturday farmers\' market, selling three flavors — Strawberry, Blueberry, and Peach. Every sale gets logged in a <code>jam_sales</code> table: flavor, date, units sold. Prices and costs live somewhere else entirely, in a <code>jam_products</code> table, because they change rarely and apply to every sale of that flavor. The stand owner wants a straight answer: <strong>which flavor should we make more of next month?</strong> Sections 6 through 8 build toward that answer, and Section 10 delivers it with real numbers.</p>',
            ar: '<p>إليك سيناريو هذا الأسبوع: تساعد في إدارة كشك مربى في سوق مزارعين يوم سبت، تبيع ثلاث نكهات — فراولة وتوت أزرق وخوخ. كل عملية بيع تُسجَّل في جدول <code>jam_sales</code>: النكهة والتاريخ والكمية المباعة. صاحب الكشك يريد إجابة مباشرة: <strong>أي نكهة يجب أن نصنع المزيد منها الشهر القادم؟</strong></p>',
            fa: '<p>سناریوی این هفته این است: به ادارهٔ یک غرفهٔ مربا در بازار کشاورزان روز شنبه کمک می‌کنی، سه طعم می‌فروشی — توت‌فرنگی، بلوبری و هلو. هر فروش در جدول <code>jam_sales</code> ثبت می‌شود. صاحب غرفه پاسخی مستقیم می‌خواهد: <strong>ماه بعد باید از کدام طعم بیشتر بسازیم؟</strong></p>',
          },
        },
        {
          type: 'table',
          headers: [
            { en: 'flavor', ar: 'النكهة', fa: 'طعم' },
            { en: 'selling price', ar: 'سعر البيع', fa: 'قیمت فروش' },
            { en: 'cost price', ar: 'سعر التكلفة', fa: 'قیمت تمام‌شده' },
          ],
          rows: [
            [{ en: '<strong>Strawberry</strong>' }, { en: '$5.00' }, { en: '$2.00' }],
            [{ en: '<strong>Blueberry</strong>' }, { en: '$6.00' }, { en: '$3.00' }],
            [{ en: '<strong>Peach</strong>' }, { en: '$4.00' }, { en: '$1.00' }],
          ],
        },
        { type: 'exercise', questionId: 'w02-q001' },
      ],
    },
    {
      id: 'metrics-overview',
      navLabel: { en: 'What are business metrics?', ar: 'ما هي مقاييس الأعمال؟', fa: 'معیارهای کسب‌وکار چیستند؟' },
      sectionLabel: { en: 'Section 02', ar: 'القسم ٠٢', fa: 'بخش ۰۲' },
      timeEst: { en: '5 min', ar: '٥ دقائق', fa: '۵ دقیقه' },
      headingHtml: {
        en: '<h2>What is a business metric?</h2><p class="standfirst">A standardized, quantitative measurement used to track and assess performance — the difference between "sales felt good this week" and a number you can compare, alert on, and defend.</p>',
        ar: '<h2>ما هو مقياس الأعمال؟</h2><p class="standfirst">قياس كمي موحّد يُستخدم لتتبع الأداء وتقييمه — الفرق بين "شعرت المبيعات بأنها جيدة هذا الأسبوع" ورقم يمكنك مقارنته والتنبيه عليه والدفاع عنه.</p>',
        fa: '<h2>معیار کسب‌وکار چیست؟</h2><p class="standfirst">سنجشی کمّی و استانداردشده برای پیگیری و ارزیابی عملکرد — تفاوت بین «این هفته فروش حس خوبی داشت» و عددی که می‌توانی مقایسه‌اش کنی، برایش هشدار بگذاری و از آن دفاع کنی.</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: '<p><code>jam_sales</code> already gave you the raw ingredient — who sold how much, when. A metric turns that into something you can act on: revenue, cost, profit, or a per-category comparison. The four reasons this matters, straight from the business world:</p><ol><li><strong>Performance improvement</strong> — tracking the right metric tells you how the business is doing and where to focus.</li><li><strong>Identifying problems early</strong> — a metric that\'s drifting the wrong way flags a problem before it becomes a crisis.</li><li><strong>Comparative analysis</strong> — metrics let you check performance against a benchmark, a competitor, or last month.</li><li><strong>Communication</strong> — a shared metric is how you report to customers, investors, or a stand owner without an argument about what "good" means.</li></ol>',
            ar: '<p><code>jam_sales</code> أعطاك المكوّن الخام بالفعل. المقياس يحوّل هذا إلى شيء يمكنك التصرف بناءً عليه.</p><ol><li><strong>تحسين الأداء</strong> — تتبع المقياس الصحيح يخبرك كيف يسير العمل.</li><li><strong>اكتشاف المشكلات مبكرًا</strong> — مقياس ينحرف في الاتجاه الخاطئ يُنبّه إلى مشكلة قبل أن تصبح أزمة.</li><li><strong>التحليل المقارن</strong> — تتيح لك المقاييس مقارنة الأداء بمعيار مرجعي.</li><li><strong>التواصل</strong> — المقياس المشترك هو طريقتك لإبلاغ العملاء دون جدال حول معنى "جيد".</li></ol>',
            fa: '<p><code>jam_sales</code> از قبل مادهٔ خام را به تو داد. یک معیار این را به چیزی قابل‌اقدام تبدیل می‌کند.</p><ol><li><strong>بهبود عملکرد</strong> — پیگیری معیار درست به تو می‌گوید کسب‌وکار چطور پیش می‌رود.</li><li><strong>شناسایی زودهنگام مشکلات</strong> — معیاری که در جهت اشتباه حرکت می‌کند، پیش از تبدیل‌شدن به بحران هشدار می‌دهد.</li><li><strong>تحلیل مقایسه‌ای</strong> — معیارها به تو اجازه می‌دهند عملکرد را با یک معیار مرجع مقایسه کنی.</li><li><strong>ارتباط</strong> — معیار مشترک روشی است که بدون بحث بر سر معنای «خوب»، گزارش می‌دهی.</li></ol>',
          },
        },
        {
          type: 'box',
          variant: 'keypoint',
          label: { en: 'Bridge from BA1', ar: 'جسر من BA1', fa: 'پل از BA1' },
          html: {
            en: '<p>This is BA1\'s "descriptive analytics" from a new angle: revenue and profit are the KPIs, and everything you\'re about to do — JOIN, GROUP BY — is just the plumbing that gets you from raw rows to a KPI you can report.</p>',
            ar: '<p>هذا هو "التحليل الوصفي" من BA1 من زاوية جديدة: الإيراد والربح هما مؤشرا الأداء الرئيسيان، وكل ما أنت على وشك فعله هو فقط السباكة التي تنقلك من صفوف خام إلى مؤشر أداء يمكنك الإبلاغ عنه.</p>',
            fa: '<p>این همان «تحلیل توصیفی» BA1 از زاویه‌ای تازه است: درآمد و سود همان KPIها هستند، و هر کاری که در شرف انجامش هستی فقط لوله‌کشی‌ای است که تو را از ردیف‌های خام به KPIای می‌رساند که می‌توانی گزارش دهی.</p>',
          },
        },
        { type: 'exercise', questionId: 'w02-q002' },
      ],
    },
    {
      id: 'metrics-by-industry',
      navLabel: { en: 'Metrics by industry', ar: 'المقاييس حسب القطاع', fa: 'معیارها بر اساس صنعت' },
      sectionLabel: { en: 'Section 03', ar: 'القسم ٠٣', fa: 'بخش ۰۳' },
      timeEst: { en: '6 min', ar: '٦ دقائق', fa: '۶ دقیقه' },
      headingHtml: {
        en: '<h2>The same shape of metric, a different formula per industry</h2><p class="standfirst">"Revenue" and "traffic" mean something slightly different in a shop, a restaurant, and a hotel — but the underlying shape (a rate, a total, a ratio) repeats everywhere.</p>',
        ar: '<h2>نفس شكل المقياس، صيغة مختلفة لكل قطاع</h2><p class="standfirst">"الإيراد" و"الحركة" يعنيان شيئًا مختلفًا قليلاً في متجر ومطعم وفندق — لكن الشكل الأساسي يتكرر في كل مكان.</p>',
        fa: '<h2>همان شکل معیار، فرمولی متفاوت برای هر صنعت</h2><p class="standfirst">«درآمد» و «ترافیک» در یک فروشگاه، یک رستوران و یک هتل کمی معنای متفاوتی دارند — اما شکل زیرین همه‌جا تکرار می‌شود.</p>',
      },
      blocks: [
        {
          type: 'table',
          headers: [
            { en: 'Industry', ar: 'القطاع', fa: 'صنعت' },
            { en: 'Metric', ar: 'المقياس', fa: 'معیار' },
            { en: 'Formula', ar: 'الصيغة', fa: 'فرمول' },
          ],
          rows: [
            [{ en: '<strong>Retail</strong>' }, { en: 'Sales revenue', ar: 'إيراد المبيعات', fa: 'درآمد فروش' }, { en: 'SUM(quantity sold × price)' }],
            [{ en: '' }, { en: 'Foot traffic', ar: 'حركة الزوار', fa: 'ترافیک پیاده' }, { en: 'COUNT(visitors)' }],
            [{ en: '<strong>Restaurant</strong>' }, { en: 'Average customer bill', ar: 'متوسط فاتورة العميل', fa: 'میانگین صورت‌حساب مشتری' }, { en: 'SUM(revenue per day) / COUNT(customers)' }],
            [{ en: '' }, { en: 'Table turnover rate', ar: 'معدل دوران الطاولات', fa: 'نرخ گردش میز' }, { en: 'meals served / seating capacity' }],
            [{ en: '<strong>Hospitality</strong>' }, { en: 'Occupancy rate', ar: 'معدل الإشغال', fa: 'نرخ اشغال' }, { en: 'rooms sold / total rooms available' }],
            [{ en: '' }, { en: 'Average daily rate', ar: 'متوسط السعر اليومي', fa: 'نرخ متوسط روزانه' }, { en: 'room revenue / rooms rented' }],
          ],
        },
        {
          type: 'box',
          variant: 'example',
          label: { en: "Example: the jam stand's own numbers", ar: 'مثال: أرقام كشك المربى نفسه', fa: 'مثال: اعداد خود غرفهٔ مربا' },
          html: {
            en: '<p>In May, the stand sold 100 Strawberry jars at $5, 60 Blueberry jars at $6, and 40 Peach jars at $4. Revenue = SUM(units × price) = (100×5) + (60×6) + (40×4) = $500 + $360 + $160 = <strong>$1,020</strong>.</p>',
            ar: '<p>في مايو، باع الكشك 100 برطمان فراولة بـ5 دولارات، و60 برطمان توت أزرق بـ6 دولارات، و40 برطمان خوخ بـ4 دولارات. الإيراد = <strong>1,020 دولار</strong>.</p>',
            fa: '<p>در ماه مه، غرفه ۱۰۰ شیشه توت‌فرنگی به قیمت ۵ دلار، ۶۰ شیشه بلوبری به قیمت ۶ دلار و ۴۰ شیشه هلو به قیمت ۴ دلار فروخت. درآمد = <strong>۱٬۰۲۰ دلار</strong>.</p>',
          },
        },
        { type: 'exercise', questionId: 'w02-q003' },
      ],
    },
    {
      id: 'excel-functions',
      navLabel: { en: 'Excel functions recap', ar: 'مراجعة دوال Excel', fa: 'مرور توابع Excel' },
      sectionLabel: { en: 'Section 04', ar: 'القسم ٠٤', fa: 'بخش ۰۴' },
      timeEst: { en: '5 min', ar: '٥ دقائق', fa: '۵ دقیقه' },
      headingHtml: {
        en: '<h2>Excel functions recap: the same stats, a different set of hands</h2><p class="standfirst">The original deck for this week is Excel-only. You already know these ideas from Week 1\'s SQL — here\'s the Excel side, for whenever your data arrives as a spreadsheet instead of a live database.</p>',
        ar: '<h2>مراجعة دوال Excel: نفس الإحصاء، أدوات مختلفة</h2><p class="standfirst">الشرائح الأصلية لهذا الأسبوع مبنية على Excel فقط.</p>',
        fa: '<h2>مرور توابع Excel: همان آمار، ابزاری متفاوت</h2><p class="standfirst">اسلایدهای اصلی این هفته فقط بر پایهٔ Excel هستند.</p>',
      },
      blocks: [
        {
          type: 'table',
          headers: [
            { en: 'Excel function', ar: 'دالة Excel', fa: 'تابع Excel' },
            { en: 'Does', ar: 'تفعل', fa: 'انجام می‌دهد' },
            { en: "Week 1's SQL equivalent", ar: 'مكافئها في SQL من الأسبوع 1', fa: 'معادل SQLای هفتهٔ ۱' },
          ],
          rows: [
            [{ en: 'AVERAGE()' }, { en: 'Mean of the selected range', ar: 'متوسط النطاق المحدد', fa: 'میانگین بازهٔ انتخاب‌شده' }, { en: 'AVG()' }],
            [{ en: 'MEDIAN()' }, { en: 'Middle value of the selected range', ar: 'القيمة الوسطى للنطاق المحدد', fa: 'مقدار میانی بازهٔ انتخاب‌شده' }, { en: 'PERCENTILE_CONT(0.5)' }],
            [{ en: 'MODE()' }, { en: 'Most frequent value in the range', ar: 'القيمة الأكثر تكرارًا في النطاق', fa: 'پرتکرارترین مقدار در بازه' }, { en: 'GROUP BY + ORDER BY COUNT(*) DESC' }],
            [{ en: 'AVERAGEIF()' }, { en: 'Mean of a range, only where a condition holds', ar: 'متوسط نطاق، فقط حيث يتحقق شرط', fa: 'میانگین یک بازه، فقط جایی که شرطی برقرار است' }, { en: 'AVG() with WHERE, or GROUP BY' }],
            [{ en: 'STDEV()' }, { en: 'Sample standard deviation', ar: 'الانحراف المعياري للعيّنة', fa: 'انحراف معیار نمونه' }, { en: 'STDDEV_SAMP()' }],
            [{ en: 'VAR()' }, { en: 'Sample variance', ar: 'تباين العيّنة', fa: 'واریانس نمونه' }, { en: 'STDDEV_SAMP()²' }],
          ],
        },
        {
          type: 'box',
          variant: 'mistake',
          label: { en: 'Common mistake', ar: 'خطأ شائع', fa: 'اشتباه رایج' },
          html: {
            en: '<p><code>AVERAGEIF()</code> and <code>GROUP BY</code> aren\'t quite the same shape: <code>AVERAGEIF()</code> gives you one number for one condition you typed out by hand, while <code>GROUP BY</code> gives you one row per category automatically.</p>',
            ar: '<p><code>AVERAGEIF()</code> و<code>GROUP BY</code> ليستا بنفس الشكل تمامًا: تعطيك <code>AVERAGEIF()</code> رقمًا واحدًا لشرط واحد كتبته يدويًا، بينما تعطيك <code>GROUP BY</code> صفًا واحدًا لكل فئة تلقائيًا.</p>',
            fa: '<p><code>AVERAGEIF()</code> و <code>GROUP BY</code> دقیقاً یک شکل نیستند: <code>AVERAGEIF()</code> یک عدد برای یک شرط دستی می‌دهد، درحالی‌که <code>GROUP BY</code> به‌طور خودکار یک ردیف برای هر دسته می‌دهد.</p>',
          },
        },
        { type: 'exercise', questionId: 'w02-q004' },
      ],
    },
    {
      id: 'two-tables',
      navLabel: { en: 'Why data lives in two tables', ar: 'لماذا تعيش البيانات في جدولين', fa: 'چرا داده در دو جدول زندگی می‌کند' },
      sectionLabel: { en: 'Section 05', ar: 'القسم ٠٥', fa: 'بخش ۰۵' },
      timeEst: { en: '5 min', ar: '٥ دقائق', fa: '۵ دقیقه' },
      headingHtml: {
        en: '<h2>Why prices don\'t live inside the sales table</h2><p class="standfirst">You could add a price column to every row of <code>jam_sales</code>. Real databases almost never do that — and the reason is worth understanding before you write a single <code>JOIN</code>.</p>',
        ar: '<h2>لماذا لا تعيش الأسعار داخل جدول المبيعات</h2><p class="standfirst">يمكنك إضافة عمود سعر لكل صف في <code>jam_sales</code>. قواعد البيانات الحقيقية لا تفعل ذلك تقريبًا أبدًا.</p>',
        fa: '<h2>چرا قیمت‌ها داخل جدول فروش زندگی نمی‌کنند</h2><p class="standfirst">می‌توانستی یک ستون قیمت به هر ردیف <code>jam_sales</code> اضافه کنی. پایگاه‌های داده واقعی تقریباً هرگز این کار را نمی‌کنند.</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: '<p>Say you did add a <code>selling_price</code> column to every row of <code>jam_sales</code>. Strawberry sells at $5 across 4 different market days — so the price $5 would be copied into 4 separate rows. The day the stand raises Strawberry to $5.50, you\'d have to find and update every single row that ever sold Strawberry, and if you missed even one, your data would quietly disagree with itself about what Strawberry costs. Keeping price in its own <code>jam_products</code> table means it\'s stored exactly once per flavor — update it there, and every future <code>JOIN</code> picks up the new price automatically.</p>',
            ar: '<p>لنفترض أنك أضفت عمود <code>selling_price</code> إلى كل صف في <code>jam_sales</code>. يُباع الفراولة بـ5 دولارات عبر 4 أيام سوق مختلفة. الاحتفاظ بالسعر في جدول <code>jam_products</code> الخاص به يعني تخزينه مرة واحدة بالضبط لكل نكهة.</p>',
            fa: '<p>فرض کن ستون <code>selling_price</code> را به هر ردیف <code>jam_sales</code> اضافه کرده بودی. توت‌فرنگی در ۴ روز بازار مختلف با قیمت ۵ دلار فروخته می‌شود. نگه‌داشتن قیمت در جدول اختصاصی خودش، <code>jam_products</code>، یعنی دقیقاً یک‌بار به‌ازای هر طعم ذخیره می‌شود.</p>',
          },
        },
        {
          type: 'box',
          variant: 'analogy',
          label: { en: 'Analogy', ar: 'تشبيه', fa: 'قیاس' },
          html: {
            en: '<p>This is Week 1\'s warehouse, with a second room. <code>jam_sales</code> is the loading dock — a fast, constantly-growing log of what left the building. <code>jam_products</code> is the price list pinned to the office wall — small, slow-changing, and looked up whenever the loading dock needs a number. <code>JOIN</code> is the trip between the two rooms, done automatically instead of by hand.</p>',
            ar: '<p>هذا مستودع الأسبوع 1، بغرفة ثانية. <code>jam_sales</code> هو رصيف التحميل. <code>jam_products</code> هو قائمة الأسعار المثبتة على جدار المكتب. <code>JOIN</code> هي الرحلة بين الغرفتين، تتم تلقائيًا بدلاً من يدويًا.</p>',
            fa: '<p>این همان انبار هفتهٔ ۱ است، با یک اتاق دوم. <code>jam_sales</code> اسکلهٔ بارگیری است. <code>jam_products</code> فهرست قیمتی است که به دیوار دفتر سنجاق شده. <code>JOIN</code> سفر بین آن دو اتاق است، خودکار انجام‌شده به‌جای دستی.</p>',
          },
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 1', ar: 'الرسم ١', fa: 'نمودار ۱' },
          title: { en: 'Two tables, one shared column', ar: 'جدولان، عمود مشترك واحد', fa: 'دو جدول، یک ستون مشترک' },
          src: '/figures/week-02/diagram-01.svg',
          alt: 'jam_sales table and jam_products table, connected by the shared flavor column',
          caption: {
            en: 'flavor appears in both tables — that shared column is what a JOIN matches rows on.',
            ar: 'تظهر النكهة في كلا الجدولين — هذا العمود المشترك هو ما تطابق عليه JOIN الصفوف.',
            fa: 'طعم در هر دو جدول ظاهر می‌شود — همان ستون مشترکی است که JOIN بر اساس آن ردیف‌ها را تطبیق می‌دهد.',
          },
        },
        { type: 'exercise', questionId: 'w02-q005' },
      ],
    },
    {
      id: 'inner-join',
      navLabel: { en: 'INNER JOIN', ar: 'INNER JOIN', fa: 'INNER JOIN' },
      sectionLabel: { en: 'Section 06', ar: 'القسم ٠٦', fa: 'بخش ۰۶' },
      timeEst: { en: '8 min', ar: '٨ دقائق', fa: '۸ دقیقه' },
      headingHtml: {
        en: '<h2>INNER JOIN: rows that match on both sides</h2><p class="standfirst">The Week 1 promise, delivered: <code>JOIN</code> is how you combine columns from two tables into one result, matched on a shared column.</p>',
        ar: '<h2>INNER JOIN: الصفوف التي تتطابق في كلا الجانبين</h2><p class="standfirst">وعد الأسبوع 1، مُنجَز.</p>',
        fa: '<h2>INNER JOIN: ردیف‌هایی که در هر دو سمت تطبیق دارند</h2><p class="standfirst">وعدهٔ هفتهٔ ۱، تحقق‌یافته.</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: '<p><code>INNER JOIN</code> is the strictest version: it keeps a row only if the join column has a match in <em>both</em> tables. Row up every <code>jam_sales</code> row against <code>jam_products</code> on <code>flavor</code>, and you get one combined row per sale, now carrying its price and cost alongside it.</p>',
            ar: '<p><code>INNER JOIN</code> هي النسخة الأكثر صرامة: تُبقي صفًا فقط إذا كان لعمود الربط تطابق في <em>كلا</em> الجدولين.</p>',
            fa: '<p><code>INNER JOIN</code> سخت‌گیرانه‌ترین نسخه است: ردیفی را فقط زمانی نگه می‌دارد که ستون پیوند در <em>هر دو</em> جدول تطابق داشته باشد.</p>',
          },
        },
        {
          type: 'code',
          code: `CREATE TABLE jam_products (
  flavor        TEXT PRIMARY KEY,
  selling_price NUMERIC(10,2) NOT NULL,
  cost_price    NUMERIC(10,2) NOT NULL
);

INSERT INTO jam_products (flavor, selling_price, cost_price) VALUES
('Strawberry', 5.00, 2.00),
('Blueberry',  6.00, 3.00),
('Peach',      4.00, 1.00);
-- Note: no row for 'Lemon' yet — Section 7 comes back to why that matters.

CREATE TABLE jam_sales (
  id          INT PRIMARY KEY,
  flavor      TEXT NOT NULL,
  market_date DATE NOT NULL,
  units_sold  INT NOT NULL
);

INSERT INTO jam_sales (id, flavor, market_date, units_sold) VALUES
(1, 'Strawberry', '2024-05-04', 22),
(2, 'Blueberry',  '2024-05-04', 15),
(3, 'Peach',      '2024-05-04', 10),
(4, 'Strawberry', '2024-05-11', 25),
(5, 'Blueberry',  '2024-05-11', 12),
(6, 'Peach',      '2024-05-11', 8),
(7, 'Strawberry', '2024-05-18', 18),
(8, 'Blueberry',  '2024-05-18', 17),
(9, 'Peach',      '2024-05-18', 12),
(10, 'Strawberry', '2024-05-25', 35),
(11, 'Blueberry',  '2024-05-25', 16),
(12, 'Peach',      '2024-05-25', 10),
(13, 'Lemon',       '2024-05-25', 9);`,
        },
        {
          type: 'code',
          code: `SELECT s.flavor, s.market_date, s.units_sold, p.selling_price, p.cost_price
FROM jam_sales s
INNER JOIN jam_products p ON s.flavor = p.flavor
ORDER BY s.market_date;

-- 12 rows come back — every jam_sales row EXCEPT the Lemon sale on 2024-05-25,
-- because 'Lemon' has no matching row in jam_products.`,
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 2', ar: 'الرسم ٢', fa: 'نمودار ۲' },
          title: {
            en: 'INNER JOIN keeps only what matches on both sides',
            ar: 'INNER JOIN تُبقي فقط ما يتطابق في كلا الجانبين',
            fa: 'INNER JOIN فقط چیزی را نگه می‌دارد که در هر دو سمت تطابق دارد',
          },
          src: '/figures/week-02/diagram-02.svg',
          alt: "jam_sales rows matched against jam_products on flavor; the Lemon row has no match and is dropped",
          caption: {
            en: "Lemon's sale disappears from the result entirely — not flagged, not zeroed, just gone.",
            ar: 'تختفي عملية بيع الليمون من النتيجة تمامًا — لا تُعلَّم، ولا تُصفَّر، بل تختفي فحسب.',
            fa: 'فروش لیمو کاملاً از نتیجه ناپدید می‌شود — نه علامت‌گذاری، نه صفر، فقط ناپدید.',
          },
        },
        {
          type: 'box',
          variant: 'mistake',
          label: { en: 'Common mistake', ar: 'خطأ شائع', fa: 'اشتباه رایج' },
          html: {
            en: "<p>Treating <code>INNER JOIN</code> as the safe default. It's the right choice when an unmatched row genuinely shouldn't count — but it silently deletes rows from your result with no warning, which is exactly the wrong behavior when an unmatched row is a data problem you need to see. Section 7 shows the fix.</p>",
            ar: '<p>معاملة <code>INNER JOIN</code> كخيار افتراضي آمن. إنه الخيار الصحيح عندما لا ينبغي حقًا احتساب صف غير مطابق — لكنه يحذف الصفوف من نتيجتك بصمت دون أي تحذير.</p>',
            fa: '<p>رفتار با <code>INNER JOIN</code> به‌عنوان انتخاب پیش‌فرض ایمن. زمانی انتخاب درست است که ردیف بی‌تطبیق واقعاً نباید شمرده شود — اما بی‌سروصدا و بدون هیچ هشداری ردیف‌ها را از نتیجه‌ات حذف می‌کند.</p>',
          },
        },
        { type: 'exercise', questionId: 'w02-q006' },
      ],
    },
    {
      id: 'left-join',
      navLabel: { en: 'LEFT JOIN', ar: 'LEFT JOIN', fa: 'LEFT JOIN' },
      sectionLabel: { en: 'Section 07', ar: 'القسم ٠٧', fa: 'بخش ۰۷' },
      timeEst: { en: '7 min', ar: '٧ دقائق', fa: '۷ دقیقه' },
      headingHtml: {
        en: '<h2>LEFT JOIN: keep every row from the table that matters most</h2><p class="standfirst">Row 13 was a real sale — 9 jars of a new Lemon flavor, sold before anyone added it to the price list. Losing it from a report isn\'t safe, it\'s a bug.</p>',
        ar: '<h2>LEFT JOIN: احتفظ بكل صف من الجدول الأكثر أهمية</h2><p class="standfirst">كان الصف 13 عملية بيع حقيقية — 9 برطمانات من نكهة ليمون جديدة.</p>',
        fa: '<h2>LEFT JOIN: هر ردیف را از جدولی که بیشترین اهمیت را دارد نگه دار</h2><p class="standfirst">ردیف ۱۳ فروشی واقعی بود — ۹ شیشه از طعم لیمون تازه.</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: '<p><code>LEFT JOIN</code> keeps every row from the table you list first (the "left" table — <code>jam_sales</code> here), whether or not it finds a match on the right. Where there\'s no match, the right-hand columns come back as <code>NULL</code> instead of the row disappearing.</p>',
            ar: '<p><code>LEFT JOIN</code> تُبقي كل صف من الجدول الذي تذكره أولاً، سواء وجدت تطابقًا في الجانب الأيمن أم لا. حيث لا يوجد تطابق، تعود أعمدة الجانب الأيمن كـ<code>NULL</code>.</p>',
            fa: '<p><code>LEFT JOIN</code> هر ردیف را از جدولی که اول ذکر می‌کنی نگه می‌دارد، چه در سمت راست تطابقی پیدا کند چه نکند. جایی که تطابقی نیست، ستون‌های سمت راست به‌جای ناپدیدشدن ردیف، به‌صورت <code>NULL</code> برمی‌گردند.</p>',
          },
        },
        {
          type: 'code',
          code: `SELECT s.flavor, s.market_date, s.units_sold, p.selling_price, p.cost_price
FROM jam_sales s
LEFT JOIN jam_products p ON s.flavor = p.flavor
ORDER BY s.market_date;

-- All 13 rows come back. The Lemon row still shows units_sold = 9,
-- but selling_price and cost_price are both NULL — a visible flag,
-- not a silent deletion.`,
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 3', ar: 'الرسم ٣', fa: 'نمودار ۳' },
          title: {
            en: 'LEFT JOIN keeps the unmatched row, flagged with NULL',
            ar: 'LEFT JOIN تُبقي الصف غير المتطابق، معلَّمًا بـNULL',
            fa: 'LEFT JOIN ردیف بی‌تطبیق را نگه می‌دارد، با NULL علامت‌گذاری‌شده',
          },
          src: '/figures/week-02/diagram-03.svg',
          alt: 'LEFT JOIN result: the Lemon row is kept with NULL price and cost instead of being dropped',
          caption: {
            en: 'Same 13 sales, same JOIN condition — only the join type changed, and a real data gap became visible instead of invisible.',
            ar: 'نفس الـ13 عملية بيع، نفس شرط JOIN — تغيّر فقط نوع JOIN.',
            fa: 'همان ۱۳ فروش، همان شرط JOIN — فقط نوع JOIN تغییر کرد.',
          },
        },
        {
          type: 'box',
          variant: 'keypoint',
          label: { en: 'Key point', ar: 'نقطة أساسية', fa: 'نکتهٔ کلیدی' },
          html: {
            en: '<p>A <code>NULL</code> from a <code>LEFT JOIN</code> is a finding, not an error to hide from. Here it means: "9 jars of Lemon were sold, and nobody has told the database what Lemon costs yet." That\'s worth a message to whoever\'s pricing the new flavor — not a silently shrunk report.</p>',
            ar: '<p><code>NULL</code> من <code>LEFT JOIN</code> اكتشاف، لا خطأ يُخفى. هنا يعني: "بيعت 9 برطمانات من الليمون، ولم يخبر أحد قاعدة البيانات بعد بتكلفة الليمون."</p>',
            fa: '<p><code>NULL</code> از <code>LEFT JOIN</code> یک یافته است، نه خطایی که باید پنهانش کرد. اینجا یعنی: «۹ شیشه لیمون فروخته شد، و هنوز کسی به پایگاه داده نگفته لیمون چقدر قیمت دارد.»</p>',
          },
        },
        { type: 'exercise', questionId: 'w02-q007' },
      ],
    },
    {
      id: 'calculating-metrics-sql',
      navLabel: { en: 'Metrics via JOIN + GROUP BY', ar: 'المقاييس عبر JOIN و GROUP BY', fa: 'معیارها با JOIN و GROUP BY' },
      sectionLabel: { en: 'Section 08', ar: 'القسم ٠٨', fa: 'بخش ۰۸' },
      timeEst: { en: '8 min', ar: '٨ دقائق', fa: '۸ دقیقه' },
      headingHtml: {
        en: '<h2>Revenue, cost, profit and margin — one query, all three flavors</h2><p class="standfirst">Everything from today lands here: <code>JOIN</code> to bring price and cost alongside each sale, <code>GROUP BY</code> to collapse it to one row per flavor.</p>',
        ar: '<h2>الإيراد والتكلفة والربح والهامش — استعلام واحد، النكهات الثلاث كلها</h2><p class="standfirst">كل شيء من اليوم يصل إلى هنا.</p>',
        fa: '<h2>درآمد، هزینه، سود و حاشیه — یک پرس‌وجو، هر سه طعم</h2><p class="standfirst">همه‌چیز از امروز اینجا فرود می‌آید.</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: '<p>Revenue is units sold × selling price, summed. Cost is units sold × cost price, summed. Profit is revenue minus cost. Profit margin is profit as a percentage of revenue — the number that tells you which flavor is actually worth making more of, not just which one sells the most.</p>',
            ar: '<p>الإيراد هو الكمية المباعة × سعر البيع، مجموعًا. التكلفة هي الكمية المباعة × سعر التكلفة، مجموعًا. الربح هو الإيراد ناقص التكلفة. هامش الربح هو الربح كنسبة مئوية من الإيراد.</p>',
            fa: '<p>درآمد یعنی تعداد فروخته‌شده × قیمت فروش، جمع‌زده‌شده. هزینه یعنی تعداد فروخته‌شده × قیمت تمام‌شده، جمع‌زده‌شده. سود یعنی درآمد منهای هزینه. حاشیهٔ سود یعنی سود به‌صورت درصدی از درآمد.</p>',
          },
        },
        {
          type: 'code',
          code: `SELECT
  p.flavor,
  SUM(s.units_sold)                                            AS total_units,
  ROUND(SUM(s.units_sold * p.selling_price), 2)                AS revenue,
  ROUND(SUM(s.units_sold * p.cost_price), 2)                   AS cost,
  ROUND(SUM(s.units_sold * (p.selling_price - p.cost_price)), 2) AS profit,
  ROUND(100.0 * SUM(s.units_sold * (p.selling_price - p.cost_price))
        / SUM(s.units_sold * p.selling_price), 2)               AS margin_pct
FROM jam_sales s
INNER JOIN jam_products p ON s.flavor = p.flavor
GROUP BY p.flavor
ORDER BY margin_pct DESC;

-- flavor      | total_units | revenue | cost   | profit | margin_pct
-- Peach       | 40          | 160.00  | 40.00  | 120.00 | 75.00
-- Strawberry  | 100         | 500.00  | 200.00 | 300.00 | 60.00
-- Blueberry   | 60          | 360.00  | 180.00 | 180.00 | 50.00
-- (Lemon's 9 units are excluded here — INNER JOIN drops what LEFT JOIN would flag)`,
        },
        {
          type: 'box',
          variant: 'keypoint',
          label: { en: 'Key point', ar: 'نقطة أساسية', fa: 'نکتهٔ کلیدی' },
          html: {
            en: '<p>Strawberry sells the most units and earns the most total profit — but Peach has by far the best margin: 75% of every Peach dollar is profit, against 50% for Blueberry. Volume and margin answer different questions, and Section 10 needs both to make a real recommendation.</p>',
            ar: '<p>يبيع الفراولة أكثر الكميات ويحقق أكبر ربح إجمالي — لكن الخوخ لديه أفضل هامش بفارق كبير: 75% من كل دولار خوخ هو ربح، مقابل 50% للتوت الأزرق.</p>',
            fa: '<p>توت‌فرنگی بیشترین تعداد را می‌فروشد و بیشترین سود کل را کسب می‌کند — اما هلو به‌مراتب بهترین حاشیه را دارد: ۷۵٪ از هر دلار هلو سود است، در برابر ۵۰٪ برای بلوبری.</p>',
          },
        },
        { type: 'exercise', questionId: 'w02-q008' },
      ],
    },
    {
      id: 'ai-corner',
      navLabel: { en: 'AI co-pilot corner', ar: 'ركن مساعد الذكاء الاصطناعي', fa: 'گوشه همیار هوش مصنوعی' },
      sectionLabel: { en: 'Section 09 — AI layer', ar: 'القسم ٠٩ — طبقة الذكاء الاصطناعي', fa: 'بخش ۰۹ — لایه هوش مصنوعی' },
      timeEst: { en: '6 min', ar: '٦ دقائق', fa: '۶ دقیقه' },
      headingHtml: {
        en: "<h2>AI co-pilot corner: the wrong JOIN doesn't throw an error</h2><p class=\"standfirst\">Picking <code>INNER JOIN</code> instead of <code>LEFT JOIN</code> isn't a syntax mistake — the query runs perfectly. That's exactly what makes it dangerous when an AI assistant picks it for you.</p>",
        ar: '<h2>ركن مساعد الذكاء الاصطناعي: JOIN الخاطئة لا تُصدر خطأ</h2><p class="standfirst">اختيار <code>INNER JOIN</code> بدلاً من <code>LEFT JOIN</code> ليس خطأ نحويًا.</p>',
        fa: '<h2>گوشه همیار هوش مصنوعی: JOINِ غلط خطا نمی‌دهد</h2><p class="standfirst">انتخاب <code>INNER JOIN</code> به‌جای <code>LEFT JOIN</code> اشتباه نحوی نیست.</p>',
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
                    en: '<p><strong>Prompt:</strong> "Write a SQL query joining jam_sales and jam_products to get total revenue per flavor."</p>',
                    ar: '<p><strong>الطلب:</strong> "اكتب استعلام SQL يدمج jam_sales وjam_products للحصول على إجمالي الإيراد لكل نكهة."</p>',
                    fa: '<p><strong>درخواست:</strong> «یک پرس‌وجوی SQL بنویس که jam_sales و jam_products را برای گرفتن کل درآمد هر طعم به هم بپیوندد.»</p>',
                  },
                },
                {
                  type: 'code',
                  code: `-- What the assistant hands back:
SELECT p.flavor, SUM(s.units_sold * p.selling_price) AS revenue
FROM jam_sales s
JOIN jam_products p ON s.flavor = p.flavor   -- plain JOIN defaults to INNER JOIN
GROUP BY p.flavor;`,
                },
                {
                  type: 'html',
                  html: {
                    en: "<p>It runs. It returns three tidy rows. What it doesn't show you: 9 jars of Lemon were sold and are <strong>missing from this total</strong>, because the prompt never said what to do about a flavor with no price yet, and the assistant defaulted to the join type that hides the gap instead of the one that reveals it.</p>",
                    ar: '<p>يعمل. يُعيد ثلاثة صفوف أنيقة. ما لا يريك إياه: بيعت 9 برطمانات من الليمون و<strong>مفقودة من هذا الإجمالي</strong>.</p>',
                    fa: '<p>اجرا می‌شود. سه ردیف مرتب برمی‌گرداند. چیزی که نشانت نمی‌دهد: ۹ شیشه لیمون فروخته شده و <strong>از این مجموع غایب است</strong>.</p>',
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
                    en: '<p><strong>Prompt:</strong> "Write a PostgreSQL query joining jam_sales and jam_products to get total revenue per flavor. Use a LEFT JOIN so any sale with no matching product row still appears, with NULL revenue, instead of being silently excluded."</p>',
                    ar: '<p><strong>الطلب:</strong> "اكتب استعلام PostgreSQL يدمج jam_sales وjam_products للحصول على إجمالي الإيراد لكل نكهة. استخدم LEFT JOIN..."</p>',
                    fa: '<p><strong>درخواست:</strong> «یک پرس‌وجوی PostgreSQL بنویس... از LEFT JOIN استفاده کن تا هر فروشی که ردیف محصول متناظر ندارد همچنان ظاهر شود.»</p>',
                  },
                },
                {
                  type: 'code',
                  code: `SELECT p.flavor, SUM(s.units_sold * p.selling_price) AS revenue,
       COUNT(*) FILTER (WHERE p.flavor IS NULL) AS unpriced_sales
FROM jam_sales s
LEFT JOIN jam_products p ON s.flavor = p.flavor
GROUP BY p.flavor;

-- Lemon now appears with revenue = NULL, and a flag showing 1 unpriced sale
-- exists for it — the gap is visible instead of silently missing.`,
                },
              ],
            },
          ],
        },
        {
          type: 'box',
          variant: 'mistake',
          label: { en: 'Common mistake', ar: 'خطأ شائع', fa: 'اشتباه رایج' },
          html: {
            en: '<p>Trusting a JOIN because the row count "looks about right." 12 rows out of 13 sales looks like a small, reasonable trim — not obviously a bug. <strong>Verify it</strong> means checking that row count against what you expect, not just that the query ran.</p>',
            ar: '<p>الثقة بـJOIN لأن عدد الصفوف "يبدو صحيحًا تقريبًا." <strong>تحقق منه</strong> يعني التحقق من عدد الصفوف مقابل ما تتوقعه.</p>',
            fa: '<p>اعتماد به یک JOIN چون تعداد ردیف‌ها «تقریباً درست به‌نظر می‌رسد». <strong>تأییدش کن</strong> یعنی چک‌کردن تعداد ردیف‌ها در برابر آنچه انتظار داری.</p>',
          },
        },
        { type: 'exercise', questionId: 'w02-q009' },
      ],
    },
    {
      id: 'worked-example',
      navLabel: { en: 'Worked example', ar: 'مثال تطبيقي', fa: 'مثال حل‌شده' },
      sectionLabel: { en: 'Section 10', ar: 'القسم ١٠', fa: 'بخش ۱۰' },
      timeEst: { en: '7 min', ar: '٧ دقائق', fa: '۷ دقیقه' },
      headingHtml: {
        en: '<h2>Worked example: which flavor should the stand feature next month?</h2><p class="standfirst">Section 1 opened with the question. Here\'s the full answer, built from every piece this page covered.</p>',
        ar: '<h2>مثال تطبيقي: أي نكهة يجب أن يبرزها الكشك الشهر القادم؟</h2><p class="standfirst">فتح القسم 1 بالسؤال.</p>',
        fa: '<h2>مثال حل‌شده: غرفه ماه بعد باید کدام طعم را برجسته کند؟</h2><p class="standfirst">بخش ۱ با این سؤال باز شد.</p>',
      },
      blocks: [
        {
          type: 'box',
          variant: 'example',
          label: {
            en: '1. Revenue and profit, joined and grouped',
            ar: '1. الإيراد والربح، مدمَجان ومجمَّعان',
            fa: '۱. درآمد و سود، پیوسته و گروه‌بندی‌شده',
          },
          html: {
            en: "<p>From Section 8's query: Strawberry earns the most total profit ($300), Blueberry the least ($180), Peach in between ($120) — but on far fewer units.</p>",
            ar: '<p>من استعلام القسم 8: يحقق الفراولة أكبر ربح إجمالي (300 دولار)، والتوت الأزرق الأقل (180 دولارًا)، والخوخ بينهما (120 دولارًا).</p>',
            fa: '<p>از پرس‌وجوی بخش ۸: توت‌فرنگی بیشترین سود کل را کسب می‌کند (۳۰۰ دلار)، بلوبری کمترین را (۱۸۰ دلار)، هلو بین این دو (۱۲۰ دلار).</p>',
          },
        },
        {
          type: 'box',
          variant: 'example',
          label: { en: '2. Margin tells a different story', ar: '2. الهامش يروي قصة مختلفة', fa: '۲. حاشیه داستانی متفاوت روایت می‌کند' },
          html: {
            en: "<p>Peach converts 75% of every dollar into profit — the best of the three, by a wide margin over Blueberry's 50%.</p>",
            ar: '<p>يحوّل الخوخ 75% من كل دولار إلى ربح — الأفضل بين الثلاثة، بفارق كبير عن 50% للتوت الأزرق.</p>',
            fa: '<p>هلو ۷۵٪ از هر دلار را به سود تبدیل می‌کند — بهترین در میان سه‌تا، با فاصلهٔ زیاد از ۵۰٪ بلوبری.</p>',
          },
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 4', ar: 'الرسم ٤', fa: 'نمودار ۴' },
          title: { en: 'Profit vs. margin, by flavor', ar: 'الربح مقابل الهامش، حسب النكهة', fa: 'سود در برابر حاشیه، بر اساس طعم' },
          src: '/figures/week-02/diagram-04.svg',
          alt: 'Bar chart of profit by flavor next to a line of margin percent by flavor, showing Strawberry highest profit but Peach highest margin',
          caption: {
            en: "Highest bar and highest line point at two different flavors — that's the whole reason this section needed both numbers.",
            ar: 'أعلى عمود وأعلى خط يشيران إلى نكهتين مختلفتين.',
            fa: 'بلندترین میله و بالاترین خط به دو طعم متفاوت اشاره می‌کنند.',
          },
        },
        {
          type: 'box',
          variant: 'keypoint',
          label: { en: '3. The decision', ar: '3. القرار', fa: '۳. تصمیم' },
          html: {
            en: "<p>Strawberry stays the anchor — it earns the most money today and shouldn't be cut back. But Peach's 75% margin is too good to ignore: the recommendation is to feature Peach more prominently next month, and watch whether units sold rise without the margin dropping. And separately — someone needs to price Lemon before the next market day.</p>",
            ar: '<p>يبقى الفراولة الركيزة. لكن هامش الخوخ 75% جيد جدًا لتجاهله: التوصية هي إبراز الخوخ بشكل أكثر بروزًا الشهر القادم.</p>',
            fa: '<p>توت‌فرنگی لنگر باقی می‌ماند. اما حاشیهٔ ۷۵٪ هلو خیلی خوب است که نادیده گرفته شود: توصیه این است که هلو ماه بعد برجسته‌تر معرفی شود.</p>',
          },
        },
        { type: 'exercise', questionId: 'w02-q010' },
      ],
    },
    {
      id: 'common-mistakes',
      navLabel: { en: 'Common mistakes', ar: 'أخطاء شائعة', fa: 'اشتباهات رایج' },
      sectionLabel: { en: 'Section 11', ar: 'القسم ١١', fa: 'بخش ۱۱' },
      headingHtml: {
        en: '<h2>Common mistakes, gathered in one place</h2><p class="standfirst">Everything this page warned about, as a single reference.</p>',
        ar: '<h2>الأخطاء الشائعة، مجمّعة في مكان واحد</h2><p class="standfirst">كل ما حذّرت منه هذه الصفحة، كمرجع واحد.</p>',
        fa: '<h2>اشتباهات رایج، در یک‌جا گردآوری شده</h2><p class="standfirst">هر چیزی که این صفحه دربارهٔ آن هشدار داد.</p>',
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
              { en: '<strong>Bare JOIN defaulting to INNER JOIN</strong>' },
              {
                en: 'An unqualified <code>JOIN</code> means <code>INNER JOIN</code> — it silently drops unmatched rows unless you meant that.',
                ar: '<code>JOIN</code> غير المحدَّدة تعني <code>INNER JOIN</code> — تحذف الصفوف غير المتطابقة بصمت.',
                fa: '<code>JOIN</code> بدون قید یعنی <code>INNER JOIN</code> — بی‌سروصدا ردیف‌های بی‌تطبیق را حذف می‌کند.',
              },
            ],
            [
              { en: '<strong>Confusing AVERAGEIF() with GROUP BY</strong>' },
              {
                en: '<code>AVERAGEIF()</code> is one condition typed by hand; <code>GROUP BY</code> produces one row per category automatically.',
                ar: '<code>AVERAGEIF()</code> شرط واحد مكتوب يدويًا؛ <code>GROUP BY</code> تنتج صفًا واحدًا لكل فئة تلقائيًا.',
                fa: '<code>AVERAGEIF()</code> یک شرط دستی‌تایپ‌شده است؛ <code>GROUP BY</code> به‌طور خودکار یک ردیف برای هر دسته تولید می‌کند.',
              },
            ],
            [
              { en: '<strong>Trusting a row count because it "looks right"</strong>' },
              {
                en: '12 of 13 rows looks like a reasonable trim, not a bug — verify the count against what you expect, every time.',
                ar: '12 من 13 صفًا يبدو كتقليم معقول، لا خطأ — تحقق من العدد مقابل ما تتوقعه، في كل مرة.',
                fa: '۱۲ از ۱۳ ردیف مثل یک کوتاه‌شدن منطقی به‌نظر می‌رسد، نه یک باگ — هر بار تعداد را تأیید کن.',
              },
            ],
          ],
        },
      ],
    },
    {
      id: 'homework',
      navLabel: { en: 'Homework', ar: 'الواجب', fa: 'تکلیف' },
      sectionLabel: { en: 'Section 12', ar: 'القسم ١٢', fa: 'بخش ۱۲' },
      headingHtml: {
        en: "<h2>Homework: write your report to the stand owner</h2><p class=\"standfirst\">You're the analyst. The stand owner from Section 1 is waiting on your recommendation. Write it up as a short report, in your own words — each section below is small on its own; answer them in order. Each question comes with an analogy, a checklist and an example answer worked on a smaller slice of the same data; redo the work on the full data. A short feedback question comes last.</p>",
        ar: '<h2>الواجب: اكتب تقريرك لصاحب الكشك</h2><p class="standfirst">أنت المحلّل. صاحب الكشك من القسم 1 ينتظر توصيتك. يأتي كل سؤال مع تشبيه وقائمة تحقق ومثال على إجابة محسوب على جزء أصغر من البيانات نفسها؛ أعد العمل على البيانات كاملة. وفي النهاية سؤال قصير عن رأيك.</p>',
        fa: '<h2>تکلیف: گزارشت را برای صاحب غرفه بنویس</h2><p class="standfirst">تو تحلیل‌گر هستی. صاحب غرفهٔ بخش ۱ منتظر توصیهٔ توست. هر سؤال یک تشبیه، یک فهرست بررسی و یک نمونه‌پاسخ دارد که روی بخش کوچک‌تری از همان داده حل شده؛ کار را روی کل داده انجام بده. در پایان یک سؤال کوتاه دربارهٔ نظر تو هست.</p>',
      },
      blocks: [
        week02Homework,
      ],
    },
    {
      id: 'before-week-3',
      navLabel: { en: 'Before Week 3', ar: 'قبل الأسبوع 3', fa: 'پیش از هفته ۳' },
      sectionLabel: { en: 'Section 13', ar: 'القسم ١٣', fa: 'بخش ۱۳' },
      headingHtml: {
        en: "<h2>Before Week 3</h2><p>You can now compute the right numbers. Week 3 asks a different question: how do you show them to someone who doesn't want to read a table — choosing the right chart, and knowing when a chart is quietly misleading.</p>",
        ar: '<h2>قبل الأسبوع 3</h2><p>أصبحت الآن قادرًا على حساب الأرقام الصحيحة. يطرح الأسبوع 3 سؤالاً مختلفًا.</p>',
        fa: '<h2>پیش از هفته ۳</h2><p>حالا می‌توانی اعداد درست را محاسبه کنی. هفته ۳ سؤالی متفاوت می‌پرسد.</p>',
      },
      blocks: [],
    },
  ],
}
