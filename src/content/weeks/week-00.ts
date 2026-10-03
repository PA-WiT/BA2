// Migrated from ../../../../course/_shared/question-banks/week-00.questions.js and
// ../../../../course/ba2/study-guides/week-00/index.html (see the migrate-week-content skill).
// This page used the older `[data-lang]` sibling-div pattern (no separate i18n strings file) —
// content below is transcribed directly from those sibling divs.
// Note: the "worked" section's live drag-slider demo is represented as static explanatory text —
// rebuilding a bespoke interactive widget was out of scope for a content migration.
import type { Question, Week } from '../types'

const questions: Question[] = [
  {
    id: 'w00-q001',
    weekId: 'week-00',
    topic: 'welcome',
    answer: 0,
    prompt: {
      en: 'Why is AI drawn as an elevator in the diagram above, rather than as a new floor?',
      ar: 'لماذا رُسم الذكاء الاصطناعي في الرسم أعلاه كمصعد، لا كطابق جديد؟',
      fa: 'چرا هوش مصنوعی در نمودار بالا به‌صورت آسانسور رسم شده، نه به‌عنوان یک طبقه جدید؟',
    },
    options: [
      {
        en: 'Because AI runs through every existing skill rather than being a separate topic',
        ar: 'لأنه يمر عبر كل مهارة موجودة بدلاً من أن يكون موضوعًا مستقلاً',
        fa: 'چون هوش مصنوعی در تمام مهارت‌های موجود جریان دارد، نه اینکه موضوعی جداگانه باشد',
      },
      {
        en: 'Because AI is optional and can be skipped',
        ar: 'لأن الذكاء الاصطناعي اختياري ويمكن تجاوزه',
        fa: 'چون هوش مصنوعی اختیاری است و می‌توان از آن صرف‌نظر کرد',
      },
      {
        en: 'Because AI replaces the BA1 foundation entirely',
        ar: 'لأنه يستبدل أساس BA1 بالكامل',
        fa: 'چون هوش مصنوعی پایه BA1 را به‌طور کامل جایگزین می‌کند',
      },
    ],
  },
  {
    id: 'w00-q002',
    weekId: 'week-00',
    topic: 'questions',
    answer: 1,
    prompt: {
      en: '"We expect Q4 revenue to reach $2M based on current trends." Which type of analytics is this statement?',
      ar: '"نتوقع أن يصل إيراد الربع الرابع إلى مليوني دولار بناءً على الاتجاه الحالي." أي نوع من التحليل تمثّله هذه الجملة؟',
      fa: '«بر اساس روند فعلی، انتظار داریم درآمد سه‌ماهه چهارم به ۲ میلیون دلار برسد.» این جمله کدام نوع تحلیل است؟',
    },
    options: [
      { en: 'Descriptive', ar: 'وصفي', fa: 'توصیفی' },
      { en: 'Predictive', ar: 'تنبؤي', fa: 'پیش‌بینی‌کننده' },
      { en: 'Prescriptive', ar: 'توجيهي', fa: 'تجویزی' },
    ],
  },
  {
    id: 'w00-q003',
    weekId: 'week-00',
    topic: 'worked',
    answer: 2,
    prompt: {
      en: 'In the discount/revenue demo, why does estimated revenue fall again at very deep discounts?',
      ar: 'في عرض الخصم/الإيراد التوضيحي، لماذا ينخفض الإيراد التقديري مجددًا عند الخصومات العميقة جدًا؟',
      fa: 'در نمایش تعاملی تخفیف/درآمد، چرا درآمد تخمینی در تخفیف‌های بسیار عمیق دوباره کاهش می‌یابد؟',
    },
    options: [
      {
        en: 'Because the demo stops calculating past 40% off',
        ar: 'لأن العرض التوضيحي يتوقف عن الحساب بعد خصم ٤٠٪',
        fa: 'چون محاسبه نمایش پس از ۴۰٪ تخفیف متوقف می‌شود',
      },
      {
        en: 'Because deep discounts are against store policy',
        ar: 'لأن الخصومات العميقة مخالفة لسياسة المتجر',
        fa: 'چون تخفیف‌های عمیق خلاف سیاست فروشگاه است',
      },
      {
        en: 'Because each unit earns so little that total revenue drops even though more units sell',
        ar: 'لأن كل وحدة تُربح القليل جدًا فينخفض الإيراد الإجمالي رغم بيع كمية أكبر',
        fa: 'چون سود هر واحد آن‌قدر کم می‌شود که با وجود فروش بیشتر، درآمد کل کاهش می‌یابد',
      },
    ],
  },
  {
    id: 'w00-q004',
    weekId: 'week-00',
    topic: 'companies',
    answer: 0,
    prompt: {
      en: 'Uber analyses live location and traffic data to do what?',
      ar: 'أوبر تحلّل الموقع الحي وبيانات حركة المرور لتقوم بماذا؟',
      fa: 'اوبر داده‌های موقعیت زنده و ترافیک را برای انجام چه کاری تحلیل می‌کند؟',
    },
    options: [
      { en: 'Set real-time prices and routing', ar: 'تحديد الأسعار والمسارات فوريًا', fa: 'تعیین قیمت و مسیر در زمان واقعی' },
      { en: 'Recommend movies to watch', ar: 'اقتراح أفلام للمشاهدة', fa: 'پیشنهاد فیلم برای تماشا' },
      { en: 'Personalise search ads', ar: 'تخصيص إعلانات البحث', fa: 'شخصی‌سازی تبلیغات جستجو' },
    ],
  },
  {
    id: 'w00-q005',
    weekId: 'week-00',
    topic: 'checks',
    answer: 1,
    prompt: {
      en: "An AI gives you a specific, confident statistic, but you can't find it in any other source. What should you do?",
      ar: 'يعطيك الذكاء الاصطناعي إحصائية محددة وواثقة، لكنك لا تجدها في أي مصدر آخر. ماذا يجب أن تفعل؟',
      fa: 'هوش مصنوعی آماری دقیق و با اطمینان به تو می‌دهد، اما در هیچ منبع دیگری پیدایش نمی‌کنی. چه باید کرد؟',
    },
    options: [
      {
        en: 'Use it anyway — AI is usually accurate',
        ar: 'استخدمها على أي حال — الذكاء الاصطناعي دقيق عادةً',
        fa: 'به هر حال از آن استفاده کن — هوش مصنوعی معمولاً دقیق است',
      },
      {
        en: 'Send it back — it fails the "verify it" check',
        ar: 'أعدها للعمل — فهي تفشل في فحص "تحقق منه"',
        fa: 'آن را پس بفرست — در فحص «تحقق کن» رد می‌شود',
      },
      {
        en: 'Round the number down to be safe',
        ar: 'قرّب الرقم للأسفل احتياطًا',
        fa: 'عدد را برای احتیاط گرد به پایین کن',
      },
    ],
  },
  {
    id: 'w00-q006',
    weekId: 'week-00',
    topic: 'prompting',
    answer: 2,
    prompt: {
      en: 'Which of these three ingredients turns a weak prompt into a strong one?',
      ar: 'أي من هذه المكونات الثلاثة يحوّل أمرًا ضعيفًا إلى أمر جيد؟',
      fa: 'کدام یک از این سه عنصر یک دستور ضعیف را به دستور قوی تبدیل می‌کند؟',
    },
    options: [
      { en: 'Longer sentences', ar: 'جمل أطول', fa: 'جملات طولانی‌تر' },
      { en: 'Typing in all capital letters', ar: 'الكتابة بحروف كبيرة بالكامل', fa: 'نوشتن با حروف بزرگ' },
      {
        en: 'Context, a specific ask, and a request to show the work',
        ar: 'السياق، وطلب محدد، وطلب إظهار طريقة العمل',
        fa: 'زمینه، درخواست مشخص، و درخواست نمایش روند کار',
      },
    ],
  },
  {
    id: 'w00-q007',
    weekId: 'week-00',
    topic: 'copilots',
    answer: 0,
    prompt: {
      en: 'You need to build a dashboard that narrates a chart automatically. Which tool category fits best?',
      ar: 'تحتاج إلى بناء لوحة بيانات تشرح رسمًا بيانيًا تلقائيًا. أي فئة أدوات هي الأنسب؟',
      fa: 'باید داشبوردی بسازی که نموداری را به‌طور خودکار توضیح دهد. کدام دسته ابزار مناسب‌تر است؟',
    },
    options: [
      { en: 'BI co-pilot', ar: 'مساعد BI', fa: 'دستیار BI' },
      { en: 'Chat assistant', ar: 'مساعد محادثة', fa: 'دستیار گفتگو' },
      { en: 'No-code ML', ar: 'تعلم آلي بلا كود', fa: 'یادگیری ماشین بدون کد' },
    ],
  },
  {
    id: 'w00-q008',
    weekId: 'week-00',
    topic: 'structure',
    answer: 1,
    prompt: {
      en: 'Roughly what share of business data is unstructured?',
      ar: 'ما هي النسبة التقريبية لبيانات الأعمال غير المنظّمة؟',
      fa: 'تقریباً چه سهمی از داده‌های کسب‌وکار بدون ساختار است؟',
    },
    options: [
      { en: '10–20%', ar: '١٠–٢٠٪', fa: '۱۰ تا ۲۰٪' },
      { en: '80–90%', ar: '٨٠–٩٠٪', fa: '۸۰ تا ۹۰٪' },
      { en: 'Less than 5%', ar: 'أقل من ٥٪', fa: 'کمتر از ۵٪' },
    ],
  },
  {
    id: 'w00-q009',
    weekId: 'week-00',
    topic: 'shape',
    answer: 2,
    prompt: {
      en: 'Which of these is continuous data, not discrete?',
      ar: 'أي مما يلي بيانات متصلة، لا منفصلة؟',
      fa: 'کدام یک داده پیوسته است، نه منفصل؟',
    },
    options: [
      {
        en: 'Number of customers who walked in today',
        ar: 'عدد الزبائن الذين دخلوا المتجر اليوم',
        fa: 'تعداد مشتریانی که امروز وارد شدند',
      },
      { en: 'Number of items in a shopping cart', ar: 'عدد القطع في سلة التسوق', fa: 'تعداد اقلام داخل سبد خرید' },
      {
        en: 'Minutes a customer spent in the store',
        ar: 'عدد الدقائق التي قضاها زبون داخل المتجر',
        fa: 'دقایقی که مشتری در فروشگاه گذراند',
      },
    ],
  },
  {
    id: 'w00-q010',
    weekId: 'week-00',
    topic: 'roadmap',
    answer: 0,
    prompt: {
      en: 'Which phase of the 12-week map covers SQL?',
      ar: 'أي مرحلة من خريطة الأسابيع الاثني عشر تغطي SQL؟',
      fa: 'کدام مرحله از نقشه ۱۲ هفته‌ای SQL را پوشش می‌دهد؟',
    },
    options: [
      { en: 'Query (weeks 1–2)', ar: 'استعلام (الأسابيع ١–٢)', fa: 'استعلام (هفته‌های ۱ تا ۲)' },
      { en: 'Model & specialise (weeks 3–9)', ar: 'نمذجة وتخصص (الأسابيع ٣–٩)', fa: 'مدل‌سازی و تخصصی‌سازی (هفته‌های ۳ تا ۹)' },
      { en: 'Ship (weeks 10–12)', ar: 'إنجاز (الأسابيع ١٠–١٢)', fa: 'ارائه نهایی (هفته‌های ۱۰ تا ۱۲)' },
    ],
  },
  {
    id: 'w00-q011',
    weekId: 'week-00',
    topic: 'rules',
    answer: 1,
    prompt: {
      en: 'A student refuses to use AI at all this semester, "to play it safe." What does this section say about that choice?',
      ar: 'يرفض أحد الطلاب استخدام الذكاء الاصطناعي كليًا هذا الفصل "توخيًا للحذر". ماذا يقول هذا القسم عن هذا الخيار؟',
      fa: 'دانشجویی به‌خاطر «احتیاط» تصمیم می‌گیرد این ترم اصلاً از هوش مصنوعی استفاده نکند. این بخش درباره این انتخاب چه می‌گوید؟',
    },
    options: [
      { en: "It's the safest approach", ar: 'إنه النهج الأكثر أمانًا', fa: 'این ایمن‌ترین رویکرد است' },
      {
        en: "It's not safe, it's slow — disciplined use is the actual skill",
        ar: 'ليس أمانًا، بل بطء — الاستخدام المنضبط هو المهارة الحقيقية',
        fa: 'این ایمن نیست، بلکه کند است — مهارت واقعی استفاده منضبط است',
      },
      { en: "It's required by the ground rules", ar: 'إنه مطلوب بموجب القواعد الأساسية', fa: 'طبق قواعد اساسی الزامی است' },
    ],
  },
  {
    id: 'w00-q012',
    weekId: 'week-00',
    topic: 'before',
    answer: 2,
    prompt: {
      en: 'What should you bring to Week 1, per this section?',
      ar: 'ماذا يجب أن تُحضر للأسبوع 1، بحسب هذا القسم؟',
      fa: 'طبق این بخش، چه چیزی باید برای هفته ۱ همراه داشته باشی؟',
    },
    options: [
      { en: 'A finished dataset, already cleaned', ar: 'مجموعة بيانات جاهزة ومنظّفة بالكامل', fa: 'یک مجموعه داده تمام‌شده و از قبل پاک‌سازی‌شده' },
      { en: 'A completed SWOT analysis', ar: 'تحليل SWOT مكتمل', fa: 'یک تحلیل SWOT کامل‌شده' },
      {
        en: "One real business question you'd like to answer by Week 12",
        ar: 'سؤال عمل حقيقي واحد تودّ الإجابة عنه بحلول الأسبوع ١٢',
        fa: 'یک سؤال واقعی کسب‌وکار که می‌خواهی تا هفته ۱۲ به آن پاسخ دهی',
      },
    ],
  },
]

export const weekZero: Week = {
  id: 'week-00',
  originalPdf: '/originals/week-00.pdf',
  order: 0,
  cover: {
    kicker: { en: 'Business Analytics 2 · Week 0', ar: 'تحليلات الأعمال 2 · الأسبوع 0', fa: 'تحلیل کسب‌وکار ۲ · هفته صفر' },
    titleHtml: {
      en: '<h1>Introduction to<em>Business Analytics</em></h1><p class="lede">The questions every analysis is really trying to answer — and how an AI co-pilot changes how fast you can answer them, without changing whose judgement it is.</p>',
      ar: '<h1>مقدمة في<em>تحليلات الأعمال</em></h1><p class="lede">الأسئلة التي يحاول كل تحليل الإجابة عنها فعليًا — وكيف يغيّر مساعد الذكاء الاصطناعي سرعة إجابتك عليها، دون أن يغيّر صاحب القرار.</p>',
      fa: '<h1>مقدمه‌ای بر<em>تحلیل کسب‌وکار</em></h1><p class="lede">سؤالاتی که هر تحلیلی واقعاً تلاش می‌کند به آن‌ها پاسخ دهد — و اینکه چگونه یک دستیار هوش مصنوعی سرعت پاسخ‌گویی تو را تغییر می‌دهد، بدون آنکه تصمیم‌گیرنده را تغییر دهد.</p>',
    },
    timeEstimate: { en: '≈ 50 min · reading + quick checks', ar: '≈ ٥٠ دقيقة · قراءة وتحققات سريعة', fa: '≈ ۵۰ دقیقه · مطالعه و آزمون‌های کوتاه' },
  },
  questions,
  sections: [
    {
      id: 'welcome',
      navLabel: { en: 'Welcome', ar: 'ترحيب', fa: 'خوش‌آمدگویی' },
      sectionLabel: { en: 'Section 01', ar: 'القسم ٠١', fa: 'بخش ۰۱' },
      timeEst: { en: '3 min', ar: '٣ دقائق', fa: '۳ دقيقه' },
      headingHtml: {
        en: '<h2>Welcome</h2><p class="standfirst">Same fundamentals. A faster set of hands.</p>',
        ar: '<h2>ترحيب</h2><p class="standfirst">نفس الأساسيات. أيدٍ أسرع.</p>',
        fa: '<h2>خوش‌آمدگویی</h2><p class="standfirst">همان مبانی. دست‌هایی سریع‌تر.</p>',
      },
      blocks: [
        {
          type: 'objectives',
          label: { en: "By the end, you'll be able to", ar: 'بنهاية هذا القسم ستكون قادرًا على', fa: 'در پایان این بخش می‌توانی' },
          items: [
            {
              en: 'Explain how BA2 builds on BA1 rather than replacing it',
              ar: 'توضيح كيف يُبنى BA2 فوق BA1 لا كبديل له',
              fa: 'توضیح دهی BA2 چگونه بر پایه BA1 ساخته می‌شود، نه اینکه جایگزین آن باشد',
            },
            {
              en: 'Describe where AI fits into the course as a whole',
              ar: 'وصف موقع الذكاء الاصطناعي ضمن المقرر ككل',
              fa: 'جایگاه هوش مصنوعی را در کل این دوره توصیف کنی',
            },
          ],
        },
        {
          type: 'html',
          html: {
            en: "<p>If you've taken BA1, nothing you learned there stops mattering. Reading a distribution, cleaning a dataset, fitting a regression line — that's still exactly how this course works. What's new sits on top of it, not instead of it.</p>",
            ar: '<p>إن كنت قد أتممت BA1، فكل ما تعلمته هناك ما زال مهمًا. قراءة التوزيع، تنظيف البيانات، ملاءمة خط الانحدار — هذا بالضبط ما زال أساس هذا المقرر. الجديد يُبنى فوق ذلك، لا بدلاً منه.</p>',
            fa: '<p>اگر BA1 را گذرانده‌ای، هیچ‌چیز از آنچه یاد گرفته‌ای اهمیتش را از دست نمی‌دهد. خواندن یک توزیع، پاک‌سازی یک مجموعه داده، برازش یک خط رگرسیون — همچنان دقیقاً همان‌طوری است که این دوره کار می‌کند. آنچه جدید است روی همین پایه ساخته می‌شود، نه به‌جای آن.</p>',
          },
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 1', ar: 'الرسم ١', fa: 'نمودار ۱' },
          title: { en: 'BA1 is the ground floor', ar: 'BA1 هو الطابق الأرضي', fa: 'BA1 طبقه همکف است' },
          src: '/figures/week-00/diagram-01.svg',
          alt: 'BA1 is the foundation, BA2 adds four new floors, AI runs through all of them like an elevator',
          caption: {
            en: "Four new floors on top of what you already built. AI runs through all of them — it isn't a floor of its own.",
            ar: 'أربعة طوابق جديدة فوق ما بنيته بالفعل. الذكاء الاصطناعي يمر عبرها جميعًا — وليس طابقًا مستقلاً بذاته.',
            fa: 'چهار طبقه جدید روی چیزی که قبلاً ساخته‌ای. هوش مصنوعی از میان همه آن‌ها عبور می‌کند — طبقه‌ای جداگانه برای خودش نیست.',
          },
        },
        {
          type: 'box',
          variant: 'analogy',
          label: { en: 'Analogy', ar: 'تشبيه', fa: 'قیاس' },
          html: {
            en: "<p>Think of AI the way you'd think of a calculator. It multiplies two twelve-digit numbers instantly — but has no idea whether multiplying them was the right move for your problem. That decision was always yours.</p>",
            ar: '<p>فكّر في الذكاء الاصطناعي كما تفكر في الآلة الحاسبة. إنها تضرب رقمين من اثني عشر خانة فورًا — لكنها لا تعرف ما إذا كان ضربهما هو الخطوة الصحيحة لمشكلتك. ذلك القرار كان دائمًا قرارك أنت.</p>',
            fa: '<p>به هوش مصنوعی مثل یک ماشین‌حساب فکر کن. دو عدد دوازده‌رقمی را فوراً ضرب می‌کند — اما هیچ ایده‌ای ندارد که آیا ضرب‌کردن آن‌ها اصلاً حرکت درستی برای مسئله تو بوده یا نه. آن تصمیم همیشه با خودت بوده است.</p>',
          },
        },
        {
          type: 'takeaways',
          label: { en: 'Key takeaways', ar: 'أهم النقاط', fa: 'نکات کلیدی' },
          items: [
            {
              en: 'BA1 skills (PED, stats, Excel, regression) stay fully in use throughout BA2.',
              ar: 'مهارات BA1 (PED، الإحصاء، Excel، الانحدار) تبقى مستخدمة بالكامل طوال BA2.',
              fa: 'مهارت‌های BA1 (چرخه PED، آمار، اکسل، رگرسیون) در سراسر BA2 کاملاً مورد استفاده باقی می‌مانند.',
            },
            {
              en: 'BA2 adds four new floors: SQL, classification/ML, domain modules, and Forecasting 2.0, plus a capstone.',
              ar: 'يضيف BA2 أربعة طوابق جديدة: SQL، التصنيف والتعلم الآلي، وحدات تخصّصية، و"التنبؤ 2.0"، إضافة إلى مشروع ختامي.',
              fa: 'BA2 چهار طبقه جدید اضافه می‌کند: SQL، طبقه‌بندی/یادگیری ماشین، ماژول‌های تخصصی، و «پیش‌بینی ۲.۰»، به‌علاوه یک پروژه پایانی.',
            },
            {
              en: "AI runs through every floor as a co-pilot — it isn't a separate topic of its own.",
              ar: 'الذكاء الاصطناعي يمر عبر كل طابق كمساعد — وليس موضوعًا مستقلاً بذاته.',
              fa: 'هوش مصنوعی مانند یک دستیار از میان هر طبقه عبور می‌کند — موضوعی جداگانه برای خودش نیست.',
            },
          ],
        },
        { type: 'exercise', questionId: 'w00-q001' },
      ],
    },
    {
      id: 'what-is',
      navLabel: { en: 'What is business analytics?', ar: 'ما هي تحليلات الأعمال؟', fa: 'تحلیل کسب‌وکار چیست؟' },
      sectionLabel: { en: 'Section 02', ar: 'القسم ٠٢', fa: 'بخش ۰۲' },
      timeEst: { en: '2 min', ar: '٢ دقيقتان', fa: '۲ دقيقه' },
      headingHtml: {
        en: '<h2>What is business analytics?</h2><p class="standfirst">One definition, worth knowing properly.</p>',
        ar: '<h2>ما هي تحليلات الأعمال؟</h2><p class="standfirst">تعريف واحد يستحق أن تعرفه جيدًا.</p>',
        fa: '<h2>تحلیل کسب‌وکار چیست؟</h2><p class="standfirst">یک تعریف، که ارزش دارد آن را درست بدانی.</p>',
      },
      blocks: [
        {
          type: 'objectives',
          label: { en: "By the end, you'll be able to", ar: 'بنهاية هذا القسم ستكون قادرًا على', fa: 'در پایان این بخش می‌توانی' },
          items: [
            {
              en: 'State the working definition of business analytics from memory',
              ar: 'ذكر التعريف العملي لتحليلات الأعمال من الذاكرة',
              fa: 'تعریف عملیاتی تحلیل کسب‌وکار را از حفظ بیان کنی',
            },
            {
              en: 'Explain why the definition ends on "decisions," not "data"',
              ar: 'توضيح سبب انتهاء التعريف بكلمة "قرارات" لا "بيانات"',
              fa: 'توضیح دهی چرا این تعریف به «تصمیم‌ها» ختم می‌شود، نه «داده‌ها»',
            },
          ],
        },
        {
          type: 'html',
          html: {
            en: '<blockquote>The use of data, statistical analysis, and mathematical or computer-based models to help managers gain improved insight about their business operations and make better, fact-based decisions.<cite>Working definition</cite></blockquote><p>Notice the sentence ends on <em>decisions</em>, not on data. Everything in this course — AI-assisted or not — is in service of that last word.</p>',
            ar: '<blockquote>استخدام البيانات والتحليل الإحصائي والنماذج الرياضية أو الحاسوبية لمساعدة المديرين على فهم أعمق لعمليات أعمالهم واتخاذ قرارات أفضل مبنية على الحقائق.<cite>تعريف عملي</cite></blockquote><p>لاحظ أن الجملة تنتهي بكلمة <em>قرارات</em>، لا بكلمة بيانات. كل شيء في هذا المقرر — بمساعدة الذكاء الاصطناعي أو بدونها — يخدم هذه الكلمة الأخيرة.</p>',
            fa: '<blockquote>استفاده از داده، تحلیل آماری، و مدل‌های ریاضی یا رایانه‌ای برای کمک به مدیران در دستیابی به بینشی بهتر درباره عملیات کسب‌وکارشان و اتخاذ تصمیم‌هایی بهتر و مبتنی بر واقعیت.<cite>تعریف عملیاتی</cite></blockquote><p>توجه کن که این جمله به <em>تصمیم‌ها</em> ختم می‌شود، نه به داده. هر چیزی در این دوره — چه با کمک هوش مصنوعی و چه بدون آن — در خدمت همین کلمه آخر است.</p>',
          },
        },
        {
          type: 'takeaways',
          label: { en: 'Key takeaways', ar: 'أهم النقاط', fa: 'نکات کلیدی' },
          items: [
            {
              en: 'Business analytics = data + statistical/mathematical models + improved business decisions.',
              ar: 'تحليلات الأعمال = بيانات + نماذج إحصائية/رياضية + قرارات عمل أفضل.',
              fa: 'تحلیل کسب‌وکار = داده + مدل‌های آماری/ریاضی + تصمیم‌های کسب‌وکاری بهتر.',
            },
            {
              en: 'The point of any analysis is the decision it enables, not the analysis itself.',
              ar: 'الغاية من أي تحليل هي القرار الذي يُمكّنه، لا التحليل نفسه.',
              fa: 'هدف هر تحلیلی، تصمیمی است که ممکن می‌سازد، نه خود تحلیل.',
            },
          ],
        },
      ],
    },
    {
      id: 'questions',
      navLabel: { en: 'The three questions', ar: 'الأسئلة الثلاثة', fa: 'سه پرسش' },
      sectionLabel: { en: 'Section 03', ar: 'القسم ٠٣', fa: 'بخش ۰۳' },
      timeEst: { en: '4 min', ar: '٤ دقائق', fa: '۴ دقيقه' },
      headingHtml: {
        en: '<h2>The three business questions</h2><p class="standfirst">Every technique in this course answers one of three questions.</p>',
        ar: '<h2>الأسئلة الثلاثة للأعمال</h2><p class="standfirst">كل أسلوب في هذا المقرر يجيب عن أحد ثلاثة أسئلة.</p>',
        fa: '<h2>سه پرسش کسب‌وکار</h2><p class="standfirst">هر روشی در این دوره به یکی از سه پرسش پاسخ می‌دهد.</p>',
      },
      blocks: [
        {
          type: 'objectives',
          label: { en: "By the end, you'll be able to", ar: 'بنهاية هذا القسم ستكون قادرًا على', fa: 'در پایان این بخش می‌توانی' },
          items: [
            {
              en: 'Name the three question types: descriptive, predictive, prescriptive',
              ar: 'ذكر الأنواع الثلاثة: وصفي، تنبؤي، توجيهي',
              fa: 'سه نوع پرسش را نام ببری: توصیفی، پیش‌بینی‌کننده، تجویزی',
            },
            {
              en: 'Match a real statement to the right type',
              ar: 'مطابقة جملة واقعية مع النوع الصحيح',
              fa: 'یک جمله واقعی را با نوع درست آن تطبیق دهی',
            },
            {
              en: "Place BA1's \"diagnostic\" analytics within this framework",
              ar: 'تحديد موقع التحليل "التشخيصي" من BA1 ضمن هذا الإطار',
              fa: 'تحلیل «تشخیصی» BA1 را در این چارچوب جای دهی',
            },
          ],
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 2', ar: 'الرسم ٢', fa: 'نمودار ۲' },
          title: { en: 'Descriptive, predictive, prescriptive', ar: 'وصفي، تنبؤي، توجيهي', fa: 'توصیفی، پیش‌بینی‌کننده، تجویزی' },
          src: '/figures/week-00/diagram-02.svg',
          alt: 'Three questions: what happened, what will happen, what should we do',
          caption: {
            en: "The three questions, in the order you'd naturally ask them.",
            ar: 'الأسئلة الثلاثة، بالترتيب الذي تطرحها به بشكل طبيعي.',
            fa: 'سه پرسش، به ترتیبی که طبیعتاً آن‌ها را می‌پرسی.',
          },
        },
        {
          type: 'table',
          headers: [
            { en: 'Type', ar: 'النوع', fa: 'نوع' },
            { en: 'Asks', ar: 'يسأل', fa: 'می‌پرسد' },
          ],
          rows: [
            [
              { en: '<strong>Descriptive</strong>' },
              { en: 'Understand past & current performance', ar: 'فهم الأداء الماضي والحالي', fa: 'درک عملکرد گذشته و حال' },
            ],
            [
              { en: '<strong>Predictive</strong>' },
              { en: 'Detect patterns and extrapolate them forward', ar: 'اكتشاف الأنماط وامتدادها للمستقبل', fa: 'شناسایی الگوها و بسط آن‌ها به آینده' },
            ],
            [
              { en: '<strong>Prescriptive</strong>' },
              {
                en: 'Identify the best alternative to optimise an objective',
                ar: 'تحديد أفضل بديل لتحقيق هدف معيّن',
                fa: 'شناسایی بهترین گزینه برای بهینه‌سازی یک هدف',
              },
            ],
          ],
        },
        {
          type: 'box',
          variant: 'keypoint',
          label: { en: 'Bridge from BA1', ar: 'جسر من BA1', fa: 'پل از BA1' },
          html: {
            en: '<p>BA1 named a fourth type, <strong>diagnostic</strong> analytics — the "why," sitting between descriptive and predictive. It\'s still there; this framework just folds it into "understanding the business."</p>',
            ar: '<p>تناول BA1 نوعًا رابعًا هو التحليل <strong>التشخيصي</strong> — أي "لماذا"، ويقع بين الوصفي والتنبؤي. ما زال موجودًا؛ هذا الإطار فقط يدمجه ضمن "فهم العمل".</p>',
            fa: '<p>BA1 نوع چهارمی را نیز نام برد، تحلیل <strong>تشخیصی</strong> — یعنی «چرا»، که بین توصیفی و پیش‌بینی‌کننده قرار می‌گیرد. همچنان وجود دارد؛ این چارچوب فقط آن را در «درک کسب‌وکار» ادغام می‌کند.</p>',
          },
        },
        {
          type: 'takeaways',
          label: { en: 'Key takeaways', ar: 'أهم النقاط', fa: 'نکات کلیدی' },
          items: [
            {
              en: "Descriptive = what happened; Predictive = what's next; Prescriptive = what to do.",
              ar: 'وصفي = ماذا حدث؛ تنبؤي = ما التالي؛ توجيهي = ماذا نفعل.',
              fa: 'توصیفی = چه اتفاقی افتاد؛ پیش‌بینی‌کننده = بعد چه می‌شود؛ تجویزی = چه باید کرد.',
            },
            {
              en: 'BA1\'s diagnostic ("why") sits inside "understanding the business," between descriptive and predictive.',
              ar: 'التحليل التشخيصي ("لماذا") من BA1 يقع ضمن "فهم العمل"، بين الوصفي والتنبؤي.',
              fa: 'تحلیل تشخیصی («چرا») از BA1 در «درک کسب‌وکار» جای می‌گیرد، بین توصیفی و پیش‌بینی‌کننده.',
            },
            {
              en: 'Only prescriptive analytics directly recommends an action.',
              ar: 'التحليل التوجيهي وحده يوصي مباشرة بإجراء معيّن.',
              fa: 'فقط تحلیل تجویزی مستقیماً یک اقدام را پیشنهاد می‌دهد.',
            },
          ],
        },
        { type: 'exercise', questionId: 'w00-q002' },
      ],
    },
    {
      id: 'worked',
      navLabel: { en: 'Worked example', ar: 'مثال تطبيقي', fa: 'مثال حل‌شده' },
      sectionLabel: { en: 'Section 04', ar: 'القسم ٠٤', fa: 'بخش ۰۴' },
      timeEst: { en: '6 min', ar: '٦ دقائق', fa: '۶ دقيقه' },
      headingHtml: {
        en: '<h2>Worked example: the seasonal markdown</h2><p class="standfirst">Same question, two ways to work through it.</p>',
        ar: '<h2>مثال تطبيقي: تخفيض السعر الموسمي</h2><p class="standfirst">نفس السؤال، بطريقتين لحله.</p>',
        fa: '<h2>مثال حل‌شده: تخفیف فصلی</h2><p class="standfirst">همان پرسش، به دو روش برای حل آن.</p>',
      },
      blocks: [
        {
          type: 'objectives',
          label: { en: "By the end, you'll be able to", ar: 'بنهاية هذا القسم ستكون قادرًا على', fa: 'در پایان این بخش می‌توانی' },
          items: [
            {
              en: 'Walk one business question through all three analytics types',
              ar: 'تتبّع سؤال عمل واحد عبر الأنواع الثلاثة للتحليل',
              fa: 'یک سؤال کسب‌وکار را از میان هر سه نوع تحلیل عبور دهی',
            },
            {
              en: 'Explain what changes (and doesn\'t) when an AI co-pilot is added',
              ar: 'توضيح ما يتغيّر (وما لا يتغيّر) عند إضافة مساعد ذكاء اصطناعي',
              fa: 'توضیح دهی وقتی دستیار هوش مصنوعی اضافه می‌شود چه چیزی تغییر می‌کند (و چه چیزی نه)',
            },
            {
              en: 'Read the discount/revenue demo and explain why it peaks',
              ar: 'قراءة عرض الخصم/الإيراد التوضيحي وتفسير سبب بلوغه ذروة',
              fa: 'نمایش تعاملی تخفیف/درآمد را بخوانی و توضیح دهی چرا به اوج می‌رسد',
            },
          ],
        },
        {
          type: 'box',
          variant: 'example',
          label: { en: 'The scenario', ar: 'السيناريو', fa: 'سناریو' },
          html: {
            en: '<p>When should a department store mark down winter coats, and by how much, to maximise total revenue on the stock still on the shelf?</p>',
            ar: '<p>متى ينبغي لمتجر أن يخفّض سعر معاطف الشتاء، وبأي نسبة، لتحقيق أقصى إيراد من المخزون المتبقي؟</p>',
            fa: '<p>یک فروشگاه بزرگ چه زمانی و به چه میزان باید قیمت پالتوهای زمستانی را کاهش دهد تا درآمد کل از موجودی باقی‌مانده در قفسه را به حداکثر برساند؟</p>',
          },
        },
        {
          type: 'tabs',
          tabs: [
            {
              label: { en: 'Without AI', ar: 'بدون ذكاء اصطناعي', fa: 'بدون هوش مصنوعی' },
              blocks: [
                {
                  type: 'html',
                  html: {
                    en: '<img src="/figures/week-00/diagram-09.svg" alt="The seasonal markdown question worked through descriptive, predictive and prescriptive analytics" style="width:100%;height:auto" />',
                  },
                },
              ],
            },
            {
              label: { en: 'With AI co-pilot', ar: 'بمساعد ذكاء اصطناعي', fa: 'با دستیار هوش مصنوعی' },
              blocks: [
                {
                  type: 'html',
                  html: {
                    en: '<img src="/figures/week-00/diagram-10.svg" alt="The markdown question takes far less time with an AI co-pilot handling the mechanical steps" style="width:100%;height:auto" />',
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'html',
          html: {
            en: '<ul><li><strong>Pull the data</strong> — historical prices, units sold, advertising spend.</li><li><strong>Build the model</strong> — expected sales at each price point.</li><li><strong>Find the price</strong> — the combination that maximises revenue.</li></ul>',
            ar: '<ul><li><strong>سحب البيانات</strong> — الأسعار السابقة، الوحدات المباعة، الإنفاق الإعلاني.</li><li><strong>بناء النموذج</strong> — المبيعات المتوقعة عند كل سعر.</li><li><strong>إيجاد السعر</strong> — التركيبة التي تحقق أقصى إيراد.</li></ul>',
            fa: '<ul><li><strong>گردآوری داده</strong> — قیمت‌های گذشته، واحدهای فروخته‌شده، هزینه تبلیغات.</li><li><strong>ساخت مدل</strong> — فروش مورد انتظار در هر سطح قیمت.</li><li><strong>یافتن قیمت</strong> — ترکیبی که درآمد را به حداکثر می‌رساند.</li></ul>',
          },
        },
        {
          type: 'box',
          variant: 'example',
          label: { en: 'Reading this demo', ar: 'قراءة هذا العرض التوضيحي', fa: 'خواندن این نمایش تعاملی' },
          html: {
            en: '<p>Try it: dragging the discount from 0% to 60% traces a curve of estimated revenue captured (as a % of full-price potential) that rises, then falls, peaking around 20&#8211;25% off.</p><p>The curve rises, then falls, because two effects pull in opposite directions: too small a discount barely moves any extra volume, so you\'re leaving the ceiling almost untouched but you\'re not selling much more either; too deep a discount sells a lot more units, but each one earns so little that total revenue drops anyway.</p><p>This particular curve is a <strong>toy model</strong>: a shape picked to make the trade-off visible, not a real fitted result. In practice you\'d build this curve from actual historical price/volume data using regression — the exact tool BA1 already gave you.</p>',
            ar: '<p>جرّب: سحب الخصم من ٠٪ إلى ٦٠٪ يرسم منحنى للإيراد التقديري المحقق (كنسبة من الإمكانية بالسعر الكامل) يرتفع ثم ينخفض، ويبلغ ذروته عند خصم ٢٠–٢٥٪ تقريبًا.</p><p>يرتفع المنحنى ثم ينخفض لأن أثرين يتجاذبان في اتجاهين متعاكسين: خصم صغير جدًا لا يحرّك حجم مبيعات إضافي يُذكر؛ وخصم عميق جدًا يبيع كمية أكبر بكثير، لكن كل وحدة تُربح القليل جدًا فينخفض الإيراد الإجمالي رغم ذلك.</p><p>هذا المنحنى تحديدًا <strong>نموذج توضيحي</strong>: شكل اختير لإظهار المفاضلة، وليس نتيجة حقيقية مبنية على بيانات.</p>',
            fa: '<p>امتحان کن: کشیدن تخفیف از ۰٪ تا ۶۰٪ منحنی درآمد تخمینی محقق‌شده (به‌عنوان درصدی از ظرفیت قیمت کامل) را ترسیم می‌کند که ابتدا بالا می‌رود سپس پایین می‌آید، و حدود ۲۰ تا ۲۵٪ تخفیف به اوج می‌رسد.</p><p>این منحنی ابتدا بالا می‌رود سپس پایین می‌آید، چون دو اثر در جهت‌های مخالف عمل می‌کنند: تخفیف خیلی کم تقریباً هیچ حجم اضافه‌ای ایجاد نمی‌کند؛ تخفیف خیلی عمیق واحدهای بسیار بیشتری می‌فروشد، اما سود هر واحد آن‌قدر کم می‌شود که درآمد کل باز هم کاهش می‌یابد.</p><p>این منحنی خاص یک <strong>مدل ساده</strong> است: شکلی انتخاب‌شده تا این توازن دیده شود، نه یک نتیجه واقعی برازش‌شده.</p>',
          },
        },
        {
          type: 'box',
          variant: 'mistake',
          label: { en: 'Common mistake', ar: 'خطأ شائع', fa: 'اشتباه رایج' },
          html: {
            en: '<p>Picking "30% off in week one" as a guess dressed up as a strategy. The predictive step exists precisely to replace that guess.</p>',
            ar: '<p>اختيار "خصم ٣٠٪ في الأسبوع الأول" كتخمين متنكر في هيئة استراتيجية. الخطوة التنبؤية موجودة لتحل محل ذلك التخمين بالتحديد.</p>',
            fa: '<p>انتخاب «۳۰٪ تخفیف در هفته اول» به‌عنوان حدسی که لباس استراتژی پوشیده است. گام پیش‌بینی دقیقاً برای جایگزینی همان حدس وجود دارد.</p>',
          },
        },
        { type: 'exercise', questionId: 'w00-q003' },
      ],
    },
    {
      id: 'companies',
      navLabel: { en: "Who's doing this", ar: 'من يستخدمها بالفعل', fa: 'چه کسانی این کار را انجام می‌دهند' },
      sectionLabel: { en: 'Section 05', ar: 'القسم ٠٥', fa: 'بخش ۰۵' },
      timeEst: { en: '3 min', ar: '٣ دقائق', fa: '۳ دقيقه' },
      headingHtml: {
        en: "<h2>Who's already doing this</h2><p class=\"standfirst\">Four companies running the exact pipeline above, at enormous scale — AI-augmented analytics before the term existed.</p>",
        ar: '<h2>من يستخدمها بالفعل</h2><p class="standfirst">أربع شركات تُشغّل نفس المسار أعلاه، على نطاق هائل — تحليلات معزّزة بالذكاء الاصطناعي قبل أن يظهر المصطلح.</p>',
        fa: '<h2>چه کسانی این کار را از قبل انجام می‌دهند</h2><p class="standfirst">چهار شرکت که دقیقاً همین مسیر بالا را، در مقیاسی عظیم، اجرا می‌کنند — تحلیل تقویت‌شده با هوش مصنوعی، پیش از آنکه این اصطلاح وجود داشته باشد.</p>',
      },
      blocks: [
        {
          type: 'objectives',
          label: { en: "By the end, you'll be able to", ar: 'بنهاية هذا القسم ستكون قادرًا على', fa: 'در پایان این بخش می‌توانی' },
          items: [
            {
              en: 'Identify which step (descriptive/predictive/prescriptive) a real use case is',
              ar: 'تحديد أي خطوة (وصفي/تنبؤي/توجيهي) تمثّلها حالة استخدام واقعية',
              fa: 'تشخیص دهی یک مورد واقعی استفاده کدام گام (توصیفی/پیش‌بینی‌کننده/تجویزی) است',
            },
            {
              en: 'Recognize the same three-box pipeline across very different data types',
              ar: 'ملاحظة نفس البنية الثلاثية عبر أنواع بيانات مختلفة تمامًا',
              fa: 'همان مسیر سه‌مرحله‌ای را در انواع کاملاً متفاوت داده تشخیص دهی',
            },
          ],
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 3', ar: 'الرسم ٣', fa: 'نمودار ۳' },
          title: { en: 'Raw data → analysis → decision', ar: 'بيانات خام ← تحليل ← قرار', fa: 'داده خام ← تحلیل ← تصمیم' },
          src: '/figures/week-00/diagram-03.svg',
          alt: 'Four companies turning raw data into a business decision through the same pipeline',
          caption: {
            en: 'Different data, different companies, identical three-box structure.',
            ar: 'بيانات مختلفة، شركات مختلفة، نفس البنية الثلاثية.',
            fa: 'داده‌های متفاوت، شرکت‌های متفاوت، ساختار سه‌مرحله‌ای یکسان.',
          },
        },
        {
          type: 'html',
          html: {
            en: '<ul><li><strong>Amazon</strong> analyses purchase &amp; search history to recommend products.</li><li><strong>Netflix</strong> analyses viewing data to recommend titles and shape new content.</li><li><strong>Uber</strong> analyses location &amp; traffic to price and route in real time.</li><li><strong>Google</strong> analyses search data to personalise results and target ads.</li></ul>',
            ar: '<ul><li><strong>أمازون</strong> تحلّل سجل الشراء والبحث لاقتراح المنتجات.</li><li><strong>نتفليكس</strong> تحلّل بيانات المشاهدة لاقتراح المحتوى وصناعة أعمال جديدة.</li><li><strong>أوبر</strong> تحلّل الموقع وحركة المرور لتسعير الرحلات وتوجيهها فوريًا.</li><li><strong>جوجل</strong> تحلّل بيانات البحث لتخصيص النتائج واستهداف الإعلانات.</li></ul>',
            fa: '<ul><li><strong>آمازون</strong> سابقه خرید و جستجو را تحلیل می‌کند تا محصولات را پیشنهاد دهد.</li><li><strong>نتفلیکس</strong> داده‌های تماشا را تحلیل می‌کند تا عنوان‌ها را پیشنهاد دهد و محتوای جدید را شکل دهد.</li><li><strong>اوبر</strong> موقعیت و ترافیک را تحلیل می‌کند تا قیمت‌گذاری و مسیریابی را در زمان واقعی انجام دهد.</li><li><strong>گوگل</strong> داده‌های جستجو را تحلیل می‌کند تا نتایج را شخصی‌سازی کند و تبلیغات را هدف‌گذاری کند.</li></ul>',
          },
        },
        {
          type: 'takeaways',
          label: { en: 'Key takeaways', ar: 'أهم النقاط', fa: 'نکات کلیدی' },
          items: [
            {
              en: 'Amazon, Netflix, Uber, and Google all run the same raw-data → analysis → decision pipeline.',
              ar: 'أمازون ونتفليكس وأوبر وجوجل يُشغّلون جميعًا نفس المسار: بيانات خام ← تحليل ← قرار.',
              fa: 'آمازون، نتفلیکس، اوبر و گوگل همگی همان مسیر داده خام ← تحلیل ← تصمیم را اجرا می‌کنند.',
            },
            {
              en: 'Different data, same structure — this is the pattern the whole course teaches you to build.',
              ar: 'بيانات مختلفة، بنية واحدة — هذا هو النمط الذي يعلّمك المقرر كله بناءه.',
              fa: 'داده‌های متفاوت، ساختار یکسان — این همان الگویی است که کل این دوره یاد می‌دهد بسازی.',
            },
          ],
        },
        { type: 'exercise', questionId: 'w00-q004' },
      ],
    },
    {
      id: 'checks',
      navLabel: { en: 'The three checks', ar: 'الفحوصات الثلاثة', fa: 'سه بررسی' },
      sectionLabel: {
        en: 'Section 06 — AI layer',
        ar: 'القسم ٠٦ — طبقة الذكاء الاصطناعي',
        fa: 'بخش ۰۶ — لایه هوش مصنوعی',
      },
      timeEst: { en: '4 min', ar: '٤ دقائق', fa: '۴ دقيقه' },
      headingHtml: {
        en: '<h2>The three checks</h2><p class="standfirst">One habit that makes every AI-assisted week in this course safe to run.</p>',
        ar: '<h2>الفحوصات الثلاثة</h2><p class="standfirst">عادة واحدة تجعل كل أسبوع مدعوم بالذكاء الاصطناعي آمنًا للتطبيق.</p>',
        fa: '<h2>سه بررسی</h2><p class="standfirst">یک عادت که هر هفته مبتنی بر هوش مصنوعی در این دوره را ایمن می‌کند.</p>',
      },
      blocks: [
        {
          type: 'objectives',
          label: { en: "By the end, you'll be able to", ar: 'بنهاية هذا القسم ستكون قادرًا على', fa: 'در پایان این بخش می‌توانی' },
          items: [
            {
              en: 'Recall the three checks: Explain it, Verify it, Stand behind it',
              ar: 'استذكار الفحوصات الثلاثة: اشرحه، تحقق منه، اضمنه باسمك',
              fa: 'سه بررسی را به‌خاطر بیاوری: توضیحش بده، بررسی‌اش کن، پشتش بایست',
            },
            {
              en: "Apply the checks to a real AI output to decide if it's ready to use",
              ar: 'تطبيق الفحوصات على مخرج ذكاء اصطناعي حقيقي لتقرير جاهزيته',
              fa: 'این بررسی‌ها را روی یک خروجی واقعی هوش مصنوعی اعمال کنی تا تصمیم بگیری آماده استفاده است یا نه',
            },
          ],
        },
        {
          type: 'html',
          html: {
            en: '<p>Before any AI-generated number, chart, query, or recommendation becomes part of your work, it passes three checks. Any "no" sends it back.</p>',
            ar: '<p>قبل أن يصبح أي رقم أو رسم أو استعلام أو توصية من إنتاج الذكاء الاصطناعي جزءًا من عملك، يمر بثلاثة فحوصات. أي إجابة "لا" تُعيده للعمل.</p>',
            fa: '<p>پیش از آنکه هر عدد، نمودار، پرس‌وجو یا توصیه‌ای که هوش مصنوعی تولید کرده بخشی از کار تو شود، از سه بررسی عبور می‌کند. هر «نه» آن را برای اصلاح برمی‌گرداند.</p>',
          },
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 4', ar: 'الرسم ٤', fa: 'نمودار ۴' },
          title: { en: 'Explain it. Verify it. Stand behind it.', ar: 'اشرحه. تحقق منه. اضمنه باسمك.', fa: 'توضیحش بده. بررسی‌اش کن. پشتش بایست.' },
          src: '/figures/week-00/diagram-04.svg',
          alt: 'AI output passes through three checks before it becomes a decision, or loops back',
          caption: {
            en: 'Three honest yeses turn a draft into your decision.',
            ar: 'ثلاث إجابات صادقة بـ"نعم" تحوّل المسودة إلى قرارك.',
            fa: 'سه «بله» صادقانه یک پیش‌نویس را به تصمیم تو تبدیل می‌کند.',
          },
        },
        {
          type: 'box',
          variant: 'analogy',
          label: { en: 'Analogy', ar: 'تشبيه', fa: 'قیاس' },
          html: {
            en: '<p>The courtroom-witness test: not whether a statement <em>sounds</em> true, but whether you can explain how you know, whether it holds up under questioning, and whether you\'ll swear to it.</p>',
            ar: '<p>اختبار الشاهد في المحكمة: ليس ما إذا كانت العبارة تبدو صحيحة، بل هل يمكنك شرح كيف عرفتها، وهل تصمد أمام الاستجواب، وهل ستقسم عليها.</p>',
            fa: '<p>آزمون شاهد دادگاه: نه اینکه آیا جمله‌ای درست <em>به‌نظر</em> می‌رسد، بلکه اینکه آیا می‌توانی توضیح دهی از کجا می‌دانی، آیا زیر سؤال هم پابرجا می‌ماند، و آیا حاضری برایش سوگند بخوری.</p>',
          },
        },
        {
          type: 'box',
          variant: 'mistake',
          label: { en: 'Common mistake', ar: 'خطأ شائع', fa: 'اشتباه رایج' },
          html: {
            en: '<p>AI stating a confident, specific, entirely fabricated number. This is routine, not rare — exactly what "verify it" exists to catch.</p>',
            ar: '<p>أن يذكر الذكاء الاصطناعي رقمًا واثقًا ومحددًا وملفّقًا تمامًا. هذا أمر روتيني وليس نادرًا — وهو بالضبط ما يهدف فحص "تحقق منه" إلى رصده.</p>',
            fa: '<p>هوش مصنوعی عددی مشخص، با اطمینان و کاملاً ساختگی بیان می‌کند. این اتفاق روزمره است، نه نادر — و دقیقاً همان چیزی است که «بررسی‌اش کن» برای شکار آن وجود دارد.</p>',
          },
        },
        {
          type: 'takeaways',
          label: { en: 'Key takeaways', ar: 'أهم النقاط', fa: 'نکات کلیدی' },
          items: [
            {
              en: 'Any "no" on the three checks sends the output back to work, not into your report.',
              ar: 'أي إجابة "لا" في الفحوصات الثلاثة تُعيد المخرج للعمل، لا إلى تقريرك.',
              fa: 'هر «نه» در این سه بررسی، خروجی را برای اصلاح برمی‌گرداند، نه به گزارش تو.',
            },
            {
              en: 'Fabricated confident numbers from AI are routine, not rare — this is what "verify it" exists to catch.',
              ar: 'الأرقام الواثقة والملفّقة من الذكاء الاصطناعي أمر روتيني لا نادر — وهذا ما يرصده فحص "تحقق منه".',
              fa: 'اعداد ساختگی و با اطمینان از هوش مصنوعی روزمره‌اند، نه نادر — این همان چیزی است که «بررسی‌اش کن» برای شکار آن وجود دارد.',
            },
          ],
        },
        { type: 'exercise', questionId: 'w00-q005' },
      ],
    },
    {
      id: 'prompting',
      navLabel: { en: 'Prompting basics', ar: 'أساسيات كتابة الأوامر', fa: 'اصول نوشتن دستور' },
      sectionLabel: {
        en: 'Section 07 — AI layer',
        ar: 'القسم ٠٧ — طبقة الذكاء الاصطناعي',
        fa: 'بخش ۰۷ — لایه هوش مصنوعی',
      },
      timeEst: { en: '4 min', ar: '٤ دقائق', fa: '۴ دقيقه' },
      headingHtml: {
        en: '<h2>Prompting basics</h2><p class="standfirst">A better question gets a better answer — this is a skill, not luck.</p>',
        ar: '<h2>أساسيات كتابة الأوامر</h2><p class="standfirst">السؤال الأفضل يحصل على إجابة أفضل — هذه مهارة لا حظ.</p>',
        fa: '<h2>اصول نوشتن دستور</h2><p class="standfirst">سؤال بهتر، پاسخ بهتری می‌گیرد — این یک مهارت است، نه شانس.</p>',
      },
      blocks: [
        {
          type: 'objectives',
          label: { en: "By the end, you'll be able to", ar: 'بنهاية هذا القسم ستكون قادرًا على', fa: 'در پایان این بخش می‌توانی' },
          items: [
            { en: 'Name the three ingredients of a strong prompt', ar: 'ذكر المكونات الثلاثة لأمر جيد', fa: 'سه عنصر یک دستور قوی را نام ببری' },
            { en: 'Rewrite a weak prompt into a strong one', ar: 'إعادة صياغة أمر ضعيف ليصبح جيدًا', fa: 'یک دستور ضعیف را به دستوری قوی بازنویسی کنی' },
          ],
        },
        {
          type: 'html',
          html: {
            en: '<p>Three things turn a weak prompt into a useful one: <strong>context</strong> (what the data actually is), a <strong>specific ask</strong> (not "analyse this" but what decision it should support), and a <strong>request to show its work</strong> so you have something to verify.</p>',
            ar: '<p>ثلاثة أمور تحوّل الأمر الضعيف إلى أمر مفيد: <strong>السياق</strong> (ما هي البيانات فعليًا)، <strong>طلب محدد</strong> (ليس "حلّل هذا" بل ما القرار الذي يجب أن يخدمه)، و<strong>طلب إظهار طريقة العمل</strong> ليكون لديك ما تتحقق منه.</p>',
            fa: '<p>سه چیز یک دستور ضعیف را به دستوری مفید تبدیل می‌کند: <strong>زمینه</strong> (اینکه داده واقعاً چیست)، یک <strong>درخواست مشخص</strong> (نه «این را تحلیل کن» بلکه اینکه باید از چه تصمیمی پشتیبانی کند)، و <strong>درخواست نمایش روند کار</strong> تا چیزی برای بررسی داشته باشی.</p>',
          },
        },
        {
          type: 'tabs',
          tabs: [
            {
              label: { en: 'Weak prompt', ar: 'أمر ضعيف', fa: 'دستور ضعیف' },
              blocks: [
                {
                  type: 'html',
                  html: {
                    en: '<p style="font-style:italic"><em>"Analyse this sales data."</em></p><p>No context, no goal, no way to check the answer. The AI will guess what you want.</p>',
                    ar: '<p style="font-style:italic"><em>"حلّل بيانات المبيعات هذه."</em></p><p>لا سياق، ولا هدف، ولا طريقة للتحقق من الإجابة. سيخمّن الذكاء الاصطناعي ما تريده.</p>',
                    fa: '<p style="font-style:italic"><em>«این داده‌های فروش را تحلیل کن.»</em></p><p>بدون زمینه، بدون هدف، بدون راهی برای بررسی پاسخ. هوش مصنوعی حدس می‌زند چه می‌خواهی.</p>',
                  },
                },
              ],
            },
            {
              label: { en: 'Strong prompt', ar: 'أمر جيد', fa: 'دستور قوی' },
              blocks: [
                {
                  type: 'html',
                  html: {
                    en: '<p style="font-style:italic"><em>"This is weekly coat sales for 3 winters, columns are date/price/units. I need to decide the best markdown week. Show which weeks had the steepest price-to-units relationship, and the formula you used."</em></p><p>Context, a decision to support, and a request you can verify.</p>',
                    ar: '<p style="font-style:italic"><em>"هذه مبيعات أسبوعية للمعاطف لثلاثة فصول شتاء، الأعمدة هي التاريخ/السعر/الوحدات. أحتاج تحديد أفضل أسبوع للتخفيض."</em></p><p>سياق، وقرار يجب دعمه، وطلب يمكنك التحقق منه.</p>',
                    fa: '<p style="font-style:italic"><em>«این فروش هفتگی پالتو برای سه زمستان است، ستون‌ها تاریخ/قیمت/تعداد هستند. باید بهترین هفته برای تخفیف را تصمیم بگیرم.»</em></p><p>زمینه، تصمیمی برای پشتیبانی، و درخواستی که می‌توانی بررسی کنی.</p>',
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'takeaways',
          label: { en: 'Key takeaways', ar: 'أهم النقاط', fa: 'نکات کلیدی' },
          items: [
            {
              en: 'Context + a specific decision to support + a request to show work = a verifiable answer.',
              ar: 'السياق + قرار محدد يجب دعمه + طلب إظهار طريقة العمل = إجابة يمكن التحقق منها.',
              fa: 'زمینه + تصمیمی مشخص برای پشتیبانی + درخواست نمایش روند کار = پاسخی قابل بررسی.',
            },
            {
              en: '"Analyse this" is a weak prompt because there\'s nothing to check it against.',
              ar: '"حلّل هذا" أمر ضعيف لأنه لا يوجد ما تتحقق منه به.',
              fa: '«این را تحلیل کن» یک دستور ضعیف است چون چیزی برای مقایسه و بررسی آن وجود ندارد.',
            },
          ],
        },
        { type: 'exercise', questionId: 'w00-q006' },
      ],
    },
    {
      id: 'copilots',
      navLabel: { en: 'Meet your co-pilots', ar: 'تعرّف على مساعديك', fa: 'با دستیارانت آشنا شو' },
      sectionLabel: {
        en: 'Section 08 — AI layer',
        ar: 'القسم ٠٨ — طبقة الذكاء الاصطناعي',
        fa: 'بخش ۰۸ — لایه هوش مصنوعی',
      },
      timeEst: { en: '3 min', ar: '٣ دقائق', fa: '۳ دقيقه' },
      headingHtml: {
        en: '<h2>Meet your co-pilots</h2><p class="standfirst">Different tools for different jobs.</p>',
        ar: '<h2>تعرّف على مساعديك</h2><p class="standfirst">أدوات مختلفة لمهام مختلفة.</p>',
        fa: '<h2>با دستیارانت آشنا شو</h2><p class="standfirst">ابزارهای متفاوت برای کارهای متفاوت.</p>',
      },
      blocks: [
        {
          type: 'objectives',
          label: { en: "By the end, you'll be able to", ar: 'بنهاية هذا القسم ستكون قادرًا على', fa: 'در پایان این بخش می‌توانی' },
          items: [
            {
              en: "Match each of the four tool categories to the job it's best suited for",
              ar: 'مطابقة كل فئة من الفئات الأربع مع المهمة الأنسب لها',
              fa: 'هر یک از چهار دسته ابزار را با کاری که برایش مناسب‌تر است تطبیق دهی',
            },
            { en: 'Avoid the "one tool for everything" mistake', ar: 'تجنّب خطأ "أداة واحدة لكل شيء"', fa: 'از اشتباه «یک ابزار برای همه‌چیز» پرهیز کنی' },
          ],
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 5', ar: 'الرسم ٥', fa: 'نمودار ۵' },
          title: { en: 'Four categories, four kinds of task', ar: 'أربع فئات، أربعة أنواع من المهام', fa: 'چهار دسته، چهار نوع کار' },
          src: '/figures/week-00/diagram-05.svg',
          alt: 'Four categories of AI co-pilot tools, each suited to a different kind of task',
          caption: {
            en: "You'll use all four across this course, often in the same assignment.",
            ar: 'ستستخدم الأربعة جميعًا خلال هذا المقرر، وغالبًا في نفس الواجب.',
            fa: 'در طول این دوره از هر چهار دسته استفاده خواهی کرد، اغلب در یک تکلیف.',
          },
        },
        {
          type: 'box',
          variant: 'analogy',
          label: { en: 'Analogy', ar: 'تشبيه', fa: 'قیاس' },
          html: {
            en: "<p>A mechanic doesn't use one tool for the whole car. Reaching for a chat assistant to build a dashboard is the equivalent of using a hammer on a screw.</p>",
            ar: '<p>الميكانيكي لا يستخدم أداة واحدة للسيارة كلها. اللجوء إلى مساعد محادثة لبناء لوحة بيانات يشبه استخدام مطرقة على برغي.</p>',
            fa: '<p>یک مکانیک از یک ابزار برای کل خودرو استفاده نمی‌کند. استفاده از دستیار گفتگو برای ساخت داشبورد مانند استفاده از چکش برای پیچ است.</p>',
          },
        },
        {
          type: 'takeaways',
          label: { en: 'Key takeaways', ar: 'أهم النقاط', fa: 'نکات کلیدی' },
          items: [
            {
              en: 'Chat assistants, spreadsheet co-pilots, no-code ML, and BI co-pilots each fit a different kind of task.',
              ar: 'مساعدات المحادثة، ومساعدات الجداول، والتعلم الآلي بلا كود، ومساعدات BI — كل فئة تناسب نوعًا مختلفًا من المهام.',
              fa: 'دستیارهای گفتگو، دستیارهای صفحه‌گسترده، یادگیری ماشین بدون کد، و دستیارهای BI هرکدام برای نوع متفاوتی از کار مناسب‌اند.',
            },
            {
              en: "You'll likely use more than one tool category in the same assignment.",
              ar: 'غالبًا ستستخدم أكثر من فئة أداة واحدة في نفس الواجب.',
              fa: 'احتمالاً در یک تکلیف از بیش از یک دسته ابزار استفاده خواهی کرد.',
            },
          ],
        },
        { type: 'exercise', questionId: 'w00-q007' },
      ],
    },
    {
      id: 'structure',
      navLabel: { en: 'Structured data', ar: 'بنية البيانات', fa: 'داده ساختاریافته' },
      sectionLabel: { en: 'Section 09', ar: 'القسم ٠٩', fa: 'بخش ۰۹' },
      timeEst: { en: '3 min', ar: '٣ دقائق', fa: '۳ دقيقه' },
      headingHtml: {
        en: '<h2>Types of data: how structured is it?</h2><p class="standfirst">Before analysing data, know what shape it\'s in.</p>',
        ar: '<h2>أنواع البيانات: ما مدى بنيتها؟</h2><p class="standfirst">قبل تحليل البيانات، اعرف شكلها.</p>',
        fa: '<h2>انواع داده: چقدر ساختاریافته است؟</h2><p class="standfirst">پیش از تحلیل داده، بدان شکل آن چیست.</p>',
      },
      blocks: [
        {
          type: 'objectives',
          label: { en: "By the end, you'll be able to", ar: 'بنهاية هذا القسم ستكون قادرًا على', fa: 'در پایان این بخش می‌توانی' },
          items: [
            {
              en: 'Distinguish structured, semi-structured, and unstructured data, with an example of each',
              ar: 'التمييز بين البيانات المنظّمة وشبه المنظّمة وغير المنظّمة، بمثال لكل نوع',
              fa: 'داده ساختاریافته، نیمه‌ساختاریافته، و بدون ساختار را با یک مثال برای هرکدام تمییز دهی',
            },
            {
              en: 'Explain why unstructured data is where AI tools add the most value',
              ar: 'توضيح سبب كون البيانات غير المنظّمة هي حيث تضيف أدوات الذكاء الاصطناعي أكبر قيمة',
              fa: 'توضیح دهی چرا داده بدون ساختار جایی است که ابزارهای هوش مصنوعی بیشترین ارزش را اضافه می‌کنند',
            },
          ],
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 6', ar: 'الرسم ٦', fa: 'نمودار ۶' },
          title: { en: 'Structured, semi-structured, unstructured', ar: 'منظّمة، شبه منظّمة، غير منظّمة', fa: 'ساختاریافته، نیمه‌ساختاریافته، بدون ساختار' },
          src: '/figures/week-00/diagram-06.svg',
          alt: 'Data splits into structured, semi-structured and unstructured, each with examples',
          caption: {
            en: 'Structure is a spectrum: fixed rows and columns at one end, nothing predefined at the other.',
            ar: 'البنية طيف: صفوف وأعمدة ثابتة في طرف، ولا شيء محدد مسبقًا في الطرف الآخر.',
            fa: 'ساختار یک طیف است: ردیف‌ها و ستون‌های ثابت در یک سر، و هیچ‌چیز از پیش تعیین‌شده در سر دیگر.',
          },
        },
        {
          type: 'box',
          variant: 'keypoint',
          label: { en: 'Why this matters for AI', ar: 'لماذا يهم هذا في عصر الذكاء الاصطناعي', fa: 'چرا این برای هوش مصنوعی اهمیت دارد' },
          html: {
            en: '<p>Roughly 80&#8211;90% of business data is unstructured — emails, PDFs, calls, images. Excel and SQL are built for the structured minority. The unstructured majority is exactly where AI tools add the most value, because they can read what a spreadsheet never could.</p>',
            ar: '<p>نحو ٨٠–٩٠٪ من بيانات الأعمال غير منظّمة — رسائل، ملفات PDF، مكالمات، صور. برامج مثل Excel وSQL مصمّمة للأقلية المنظّمة.</p>',
            fa: '<p>تقریباً ۸۰ تا ۹۰٪ داده‌های کسب‌وکار بدون ساختارند — ایمیل‌ها، فایل‌های PDF، تماس‌ها، تصاویر. اکسل و SQL برای آن اقلیت ساختاریافته ساخته شده‌اند.</p>',
          },
        },
        {
          type: 'takeaways',
          label: { en: 'Key takeaways', ar: 'أهم النقاط', fa: 'نکات کلیدی' },
          items: [
            { en: 'Structure is a spectrum, not a binary switch.', ar: 'البنية طيف، لا مفتاح ثنائي.', fa: 'ساختار یک طیف است، نه یک کلید دوحالته.' },
            {
              en: '~80–90% of business data is unstructured — outside what Excel/SQL were built for.',
              ar: 'نحو ٨٠–٩٠٪ من بيانات الأعمال غير منظّمة — خارج ما صُمم له Excel وSQL.',
              fa: 'حدود ۸۰ تا ۹۰٪ داده‌های کسب‌وکار بدون ساختارند — خارج از چیزی که اکسل/SQL برایش ساخته شدند.',
            },
          ],
        },
        { type: 'exercise', questionId: 'w00-q008' },
      ],
    },
    {
      id: 'shape',
      navLabel: { en: 'Discrete vs continuous', ar: 'منفصلة أم متصلة', fa: 'منفصل یا پیوسته' },
      sectionLabel: { en: 'Section 10', ar: 'القسم ١٠', fa: 'بخش ۱۰' },
      timeEst: { en: '2 min', ar: '٢ دقيقتان', fa: '۲ دقيقه' },
      headingHtml: {
        en: '<h2>Types of data: discrete or continuous?</h2><p class="standfirst">A second, independent way to classify the same data.</p>',
        ar: '<h2>أنواع البيانات: منفصلة أم متصلة؟</h2><p class="standfirst">طريقة ثانية ومستقلة لتصنيف نفس البيانات.</p>',
        fa: '<h2>انواع داده: منفصل یا پیوسته؟</h2><p class="standfirst">یک روش دوم و مستقل برای طبقه‌بندی همان داده.</p>',
      },
      blocks: [
        {
          type: 'objectives',
          label: { en: "By the end, you'll be able to", ar: 'بنهاية هذا القسم ستكون قادرًا على', fa: 'در پایان این بخش می‌توانی' },
          items: [
            {
              en: 'Tell discrete data (counted) apart from continuous data (measured)',
              ar: 'التمييز بين البيانات المنفصلة (معدودة) والمتصلة (مقاسة)',
              fa: 'داده منفصل (شمارش‌شده) را از داده پیوسته (اندازه‌گیری‌شده) تمییز دهی',
            },
            { en: 'Give one business example of each', ar: 'ذكر مثال عملي واحد لكل نوع', fa: 'یک مثال کسب‌وکاری برای هرکدام بزنی' },
          ],
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 7', ar: 'الرسم ٧', fa: 'نمودار ۷' },
          title: { en: 'Counted vs. measured', ar: 'معدود مقابل مقاس', fa: 'شمارش‌شده در برابر اندازه‌گیری‌شده' },
          src: '/figures/week-00/diagram-07.svg',
          alt: 'Discrete data is counted in whole steps, continuous data can take any value',
          caption: {
            en: 'Discrete comes from counting. Continuous comes from measuring on a scale.',
            ar: 'المنفصل ينتج عن العدّ. المتصل ينتج عن القياس على مقياس.',
            fa: 'منفصل از شمارش به‌دست می‌آید. پیوسته از اندازه‌گیری روی یک مقیاس به‌دست می‌آید.',
          },
        },
        {
          type: 'takeaways',
          label: { en: 'Key takeaways', ar: 'أهم النقاط', fa: 'نکات کلیدی' },
          items: [
            {
              en: 'Discrete values come from counting — only whole numbers make sense.',
              ar: 'القيم المنفصلة تنتج عن العدّ — فقط الأعداد الصحيحة منطقية.',
              fa: 'مقادیر منفصل از شمارش می‌آیند — فقط اعداد صحیح معنا دارند.',
            },
            {
              en: 'Continuous values come from measuring — any value in between is possible.',
              ar: 'القيم المتصلة تنتج عن القياس — أي قيمة بينية ممكنة.',
              fa: 'مقادیر پیوسته از اندازه‌گیری می‌آیند — هر مقدار بینابینی ممکن است.',
            },
          ],
        },
        { type: 'exercise', questionId: 'w00-q009' },
      ],
    },
    {
      id: 'roadmap',
      navLabel: { en: '12-week map', ar: 'خريطة ١٢ أسبوعًا', fa: 'نقشه ۱۲ هفته‌ای' },
      sectionLabel: { en: 'Section 11', ar: 'القسم ١١', fa: 'بخش ۱۱' },
      timeEst: { en: '3 min', ar: '٣ دقائق', fa: '۳ دقيقه' },
      headingHtml: {
        en: '<h2>The 12-week map</h2><p class="standfirst">One continuous thread, in three phases.</p>',
        ar: '<h2>خريطة الأسابيع الاثني عشر</h2><p class="standfirst">خيط واحد متواصل، على ثلاث مراحل.</p>',
        fa: '<h2>نقشه ۱۲ هفته‌ای</h2><p class="standfirst">یک رشته پیوسته، در سه مرحله.</p>',
      },
      blocks: [
        {
          type: 'objectives',
          label: { en: "By the end, you'll be able to", ar: 'بنهاية هذا القسم ستكون قادرًا على', fa: 'در پایان این بخش می‌توانی' },
          items: [
            {
              en: 'Place any given week of BA2 into one of the three roadmap phases',
              ar: 'تحديد موقع أي أسبوع من BA2 ضمن إحدى المراحل الثلاث',
              fa: 'هر هفته از BA2 را در یکی از سه مرحله نقشه راه جای دهی',
            },
            { en: 'Recall roughly what each phase focuses on', ar: 'استذكار محور تركيز كل مرحلة تقريبًا', fa: 'تقریباً به‌خاطر بیاوری هر مرحله روی چه چیزی تمرکز دارد' },
          ],
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 8', ar: 'الرسم ٨', fa: 'نمودار ۸' },
          title: { en: 'Query → model & specialise → ship', ar: 'استعلام ← نمذجة وتخصص ← إنجاز', fa: 'استعلام ← مدل‌سازی و تخصصی‌سازی ← ارائه' },
          src: '/figures/week-00/diagram-08.svg',
          alt: 'The BA2 roadmap across four phases and twelve weeks',
          caption: {
            en: 'Each phase builds directly on the one before it.',
            ar: 'كل مرحلة تُبنى مباشرة على التي قبلها.',
            fa: 'هر مرحله مستقیماً روی مرحله قبل از خود ساخته می‌شود.',
          },
        },
        {
          type: 'box',
          variant: 'keypoint',
          label: { en: 'Where Python and Power BI fit', ar: 'أين يظهر Python وPower BI', fa: 'Python و Power BI کجا وارد می‌شوند' },
          html: {
            en: '<p><strong>Python</strong> shows up as the coding path through the "Model &amp; specialise" phase (weeks 3&#8211;9) — the classification/ML modules can be done there in Python if you want to code. Neither path is mandatory; both reach the same skill.</p><p><strong>Power BI</strong> is the specific BI co-pilot tool you\'ll use for the domain-module dashboards in that same weeks 3&#8211;9 stretch.</p>',
            ar: '<p>يظهر <strong>Python</strong> كمسار برمجي خلال مرحلة "نمذجة وتخصص" (الأسابيع ٣–٩). لا أحد المسارين إلزامي؛ كلاهما يصل إلى نفس المهارة.</p><p>و<strong>Power BI</strong> هو أداة مساعد BI تحديدًا التي ستستخدمها لبناء لوحات بيانات الوحدات التخصّصية.</p>',
            fa: '<p><strong>Python</strong> به‌عنوان مسیر کدنویسی در مرحله «مدل‌سازی و تخصصی‌سازی» (هفته‌های ۳ تا ۹) ظاهر می‌شود. هیچ‌کدام از این مسیرها الزامی نیست؛ هر دو به همان مهارت می‌رسند.</p><p><strong>Power BI</strong> همان ابزار دستیار BI مشخصی است که برای داشبوردهای ماژول‌های تخصصی استفاده خواهی کرد.</p>',
          },
        },
        {
          type: 'takeaways',
          label: { en: 'Key takeaways', ar: 'أهم النقاط', fa: 'نکات کلیدی' },
          items: [
            { en: 'Phase 1 (weeks 1–2): Query — SQL.', ar: 'المرحلة الأولى (الأسابيع ١–٢): استعلام — SQL.', fa: 'مرحله ۱ (هفته‌های ۱ تا ۲): استعلام — SQL.' },
            {
              en: 'Phase 2 (weeks 3–9): Model & specialise — ML, domain modules, forecasting, trust.',
              ar: 'المرحلة الثانية (الأسابيع ٣–٩): نمذجة وتخصص — تعلم آلي، وحدات تخصّصية، تنبؤ، ثقة.',
              fa: 'مرحله ۲ (هفته‌های ۳ تا ۹): مدل‌سازی و تخصصی‌سازی — یادگیری ماشین، ماژول‌های تخصصی، پیش‌بینی، اعتماد.',
            },
            {
              en: 'Phase 3 (weeks 10–12): Ship — communication, SWOT, capstone.',
              ar: 'المرحلة الثالثة (الأسابيع ١٠–١٢): إنجاز — تواصل، تحليل SWOT، مشروع ختامي.',
              fa: 'مرحله ۳ (هفته‌های ۱۰ تا ۱۲): ارائه — ارتباطات، تحلیل SWOT، پروژه پایانی.',
            },
          ],
        },
        { type: 'exercise', questionId: 'w00-q010' },
      ],
    },
    {
      id: 'rules',
      navLabel: { en: 'Ground rules', ar: 'القواعد الأساسية', fa: 'قواعد اساسی' },
      sectionLabel: { en: 'Section 12', ar: 'القسم ١٢', fa: 'بخش ۱۲' },
      timeEst: { en: '2 min', ar: '٢ دقيقتان', fa: '۲ دقيقه' },
      headingHtml: {
        en: '<h2>Ground rules</h2>',
        ar: '<h2>القواعد الأساسية</h2>',
        fa: '<h2>قواعد اساسی</h2>',
      },
      blocks: [
        {
          type: 'objectives',
          label: { en: "By the end, you'll be able to", ar: 'بنهاية هذا القسم ستكون قادرًا على', fa: 'در پایان این بخش می‌توانی' },
          items: [
            { en: 'State both ground rules in your own words', ar: 'صياغة القاعدتين الأساسيتين بأسلوبك الخاص', fa: 'هر دو قاعده اساسی را با کلمات خودت بیان کنی' },
            {
              en: 'Recognize both failure directions: unchecked AI use, and refusing to use it at all',
              ar: 'التعرّف على اتجاهي الخطأ: الاستخدام غير المدقَّق للذكاء الاصطناعي، ورفض استخدامه كليًا',
              fa: 'هر دو مسیر اشتباه را تشخیص دهی: استفاده بدون بررسی از هوش مصنوعی، و امتناع کامل از استفاده آن',
            },
          ],
        },
        {
          type: 'html',
          html: {
            en: '<ul><li><strong>AI is a co-pilot, not an autopilot.</strong> Use it for every assignment. Never submit its output unchecked.</li><li><strong>You still need to do it without AI.</strong> Every accelerated skill is one you must understand well enough to catch when it\'s wrong.</li></ul>',
            ar: '<ul><li><strong>الذكاء الاصطناعي مساعد، لا طيار آلي.</strong> استخدمه في كل واجب. لا تسلّم مخرجاته دون تحقق.</li><li><strong>ما زلت بحاجة لإتقانها دون ذكاء اصطناعي.</strong> كل مهارة مُسرَّعة يجب أن تفهمها جيدًا بما يكفي لتكتشف خطأها.</li></ul>',
            fa: '<ul><li><strong>هوش مصنوعی یک دستیار است، نه یک خلبان خودکار.</strong> در هر تکلیف از آن استفاده کن. هرگز خروجی‌اش را بدون بررسی تحویل نده.</li><li><strong>همچنان باید بتوانی بدون هوش مصنوعی هم آن را انجام دهی.</strong> هر مهارت تسریع‌شده باید آن‌قدر خوب برایت قابل‌فهم باشد که بتوانی اشتباهش را تشخیص دهی.</li></ul>',
          },
        },
        {
          type: 'box',
          variant: 'mistake',
          label: { en: 'Common mistake, the other direction', ar: 'خطأ شائع، بالاتجاه المعاكس', fa: 'اشتباه رایج، در جهت مخالف' },
          html: {
            en: "<p>Refusing to use AI at all, out of caution. That's not safe — it's slow. The skill is disciplined use, not avoidance.</p>",
            ar: '<p>رفض استخدام الذكاء الاصطناعي كليًا بدافع الحذر. هذا ليس أمانًا — بل بطء. المهارة هي الاستخدام المنضبط، لا التجنب.</p>',
            fa: '<p>امتناع کامل از استفاده هوش مصنوعی از سر احتیاط. این ایمن نیست — کند است. مهارت واقعی استفاده منضبط است، نه اجتناب.</p>',
          },
        },
        {
          type: 'takeaways',
          label: { en: 'Key takeaways', ar: 'أهم النقاط', fa: 'نکات کلیدی' },
          items: [
            {
              en: 'Rule 1: AI is a co-pilot — use it every assignment, never submit unchecked.',
              ar: 'القاعدة الأولى: الذكاء الاصطناعي مساعد — استخدمه في كل واجب، ولا تسلّمه دون تحقق.',
              fa: 'قاعده ۱: هوش مصنوعی یک دستیار است — در هر تکلیف از آن استفاده کن، هرگز بدون بررسی تحویل نده.',
            },
            {
              en: 'Rule 2: you must still be able to do the underlying skill without AI, to catch when it\'s wrong.',
              ar: 'القاعدة الثانية: يجب أن تظل قادرًا على أداء المهارة الأساسية دون ذكاء اصطناعي، لتكتشف خطأها.',
              fa: 'قاعده ۲: همچنان باید بتوانی مهارت زیربنایی را بدون هوش مصنوعی انجام دهی تا بتوانی اشتباهش را تشخیص دهی.',
            },
          ],
        },
        { type: 'exercise', questionId: 'w00-q011' },
      ],
    },
    {
      id: 'before',
      navLabel: { en: 'Before Week 1', ar: 'قبل الأسبوع 1', fa: 'پیش از هفته ۱' },
      sectionLabel: { en: 'Section 13', ar: 'القسم ١٣', fa: 'بخش ۱۳' },
      timeEst: { en: '2 min', ar: '٢ دقيقتان', fa: '۲ دقيقه' },
      headingHtml: {
        en: '<h2>Before Week 1</h2>',
        ar: '<h2>قبل الأسبوع 1</h2>',
        fa: '<h2>پیش از هفته ۱</h2>',
      },
      blocks: [
        {
          type: 'objectives',
          label: { en: "By the end, you'll be able to", ar: 'بنهاية هذا القسم ستكون قادرًا على', fa: 'در پایان این بخش می‌توانی' },
          items: [
            {
              en: 'List the three things to have ready before Week 1 starts',
              ar: 'ذكر الأمور الثلاثة التي يجب تجهيزها قبل بدء الأسبوع 1',
              fa: 'سه چیزی را که باید پیش از شروع هفته ۱ آماده باشند فهرست کنی',
            },
          ],
        },
        {
          type: 'html',
          html: {
            en: '<ul><li>Skim the <strong>BA1 Recap</strong> if any term here felt shaky.</li><li>Have a chat-based AI assistant ready to use.</li><li>Bring one real business question you\'d like to answer by Week 12.</li></ul>',
            ar: '<ul><li>راجع <strong>ملخّص BA1</strong> إن شعرت بعدم يقين تجاه أي مصطلح هنا.</li><li>جهّز مساعد ذكاء اصطناعي قائم على المحادثة جاهزًا للاستخدام.</li><li>أحضر سؤال عمل حقيقي واحد تودّ الإجابة عنه بحلول الأسبوع ١٢.</li></ul>',
            fa: '<ul><li>اگر هر اصطلاحی اینجا نامطمئن به‌نظر رسید، مرور <strong>BA1</strong> را نگاهی بینداز.</li><li>یک دستیار هوش مصنوعی مبتنی بر گفتگو را آماده استفاده داشته باش.</li><li>یک سؤال واقعی کسب‌وکار که می‌خواهی تا هفته ۱۲ به آن پاسخ دهی همراه بیاور.</li></ul>',
          },
        },
        {
          type: 'takeaways',
          label: { en: 'Key takeaways', ar: 'أهم النقاط', fa: 'نکات کلیدی' },
          items: [
            { en: 'Review the BA1 recap for any shaky terms.', ar: 'راجع ملخّص BA1 لأي مصطلح غير واضح.', fa: 'مرور BA1 را برای هر اصطلاح نامطمئن بازبینی کن.' },
            { en: 'Have a chat AI ready to use.', ar: 'جهّز مساعد ذكاء اصطناعي جاهزًا للاستخدام.', fa: 'یک دستیار گفتگوی هوش مصنوعی آماده استفاده داشته باش.' },
            {
              en: 'Bring one real business question for your capstone.',
              ar: 'أحضر سؤال عمل حقيقي واحد لمشروعك الختامي.',
              fa: 'یک سؤال واقعی کسب‌وکار برای پروژه پایانی‌ات همراه بیاور.',
            },
          ],
        },
        { type: 'exercise', questionId: 'w00-q012' },
        {
          type: 'box',
          variant: 'keypoint',
          label: { en: "What's next", ar: 'ما التالي؟', fa: 'بعد چه می‌شود؟' },
          html: {
            en: "<p>Week 1 opens the Query phase — you'll pull data with SQL for the first time. Bring a dataset you're curious about, and the ground rules you just read never go away: AI speeds up the typing, not the thinking.</p>",
            ar: '<p>الأسبوع 1 يفتح مرحلة الاستعلام — ستسحب البيانات لأول مرة باستخدام SQL. أحضر مجموعة بيانات تثير فضولك، والقواعد الأساسية التي قرأتها للتو تبقى سارية دائمًا: الذكاء الاصطناعي يسرّع الكتابة، لا التفكير.</p>',
            fa: '<p>هفته ۱ مرحله استعلام را آغاز می‌کند — برای اولین بار با SQL داده استخراج خواهی کرد. یک مجموعه داده که کنجکاوی‌ات را برانگیخته همراه بیاور، و قواعد اساسی که همین الان خواندی هرگز از بین نمی‌روند: هوش مصنوعی تایپ‌کردن را سریع‌تر می‌کند، نه فکرکردن را.</p>',
          },
        },
      ],
    },
  ],
}
