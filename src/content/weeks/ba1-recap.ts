// Migrated from ../../../../course/_shared/question-banks/ba1-recap.questions.js and
// ../../../../course/BA1-Recap-Study-Guide.html (see the migrate-week-content skill).
// This page used the older `[data-lang]` sibling-div pattern (no separate i18n strings file).
import type { Question, Week } from '../types'

const questions: Question[] = [
  {
    id: 'w-recap-q001',
    weekId: 'ba1-recap',
    topic: 'how-to-use',
    answer: 1,
    prompt: {
      en: "According to this guide, what's the most valuable part of each section?",
      ar: 'بحسب هذا الدليل، ما أقيم جزء في كل قسم؟',
      fa: 'طبق این راهنما، ارزشمندترین بخش هر قسمت چیست؟',
    },
    options: [
      { en: 'The analogy', ar: 'التشبيه', fa: 'قیاس' },
      { en: 'The self-check questions', ar: 'أسئلة المراجعة الذاتية', fa: 'پرسش‌های مراجعه شخصی' },
      { en: 'The worked example', ar: 'المثال التطبيقي', fa: 'مثال حل‌شده' },
    ],
  },
  {
    id: 'w-recap-q002',
    weekId: 'ba1-recap',
    topic: 'ped',
    answer: 0,
    prompt: {
      en: "Which stage of the PED loop typically eats about 80% of an analyst's time?",
      ar: 'أي مرحلة من حلقة PED تستهلك عادة نحو ٨٠٪ من وقت المحلل؟',
      fa: 'کدام مرحله از حلقه PED معمولاً حدود ۸۰٪ از زمان یک تحلیل‌گر را می‌گیرد؟',
    },
    options: [
      { en: 'Process', ar: 'المعالجة (Process)', fa: 'پردازش (Process)' },
      { en: 'Explain', ar: 'الشرح (Explain)', fa: 'تبیین (Explain)' },
      { en: 'Decide', ar: 'القرار (Decide)', fa: 'تصمیم (Decide)' },
    ],
  },
  {
    id: 'w-recap-q003',
    weekId: 'ba1-recap',
    topic: 'levels',
    answer: 1,
    prompt: {
      en: '"Sales fell because our main competitor opened two branches nearby." Which level of analytics is this?',
      ar: '"انخفضت المبيعات لأن منافسنا الرئيسي افتتح فرعين قريبين." أي مستوى من التحليلات يمثّل هذا؟',
      fa: '«فروش کاهش یافت چون رقیب اصلی ما دو شعبه در نزدیکی باز کرد.» این کدام سطح از تحلیل است؟',
    },
    options: [
      { en: 'Descriptive', ar: 'وصفي', fa: 'توصیفی' },
      { en: 'Diagnostic', ar: 'تشخيصي', fa: 'تشخیصی' },
      { en: 'Predictive', ar: 'تنبؤي', fa: 'پیش‌بینی‌کننده' },
    ],
  },
  {
    id: 'w-recap-q004',
    weekId: 'ba1-recap',
    topic: 'kpi',
    answer: 1,
    prompt: {
      en: 'Which of these is a genuine KPI, not a vanity metric?',
      ar: 'أي من هذه مؤشر أداء رئيسي حقيقي، لا مقياس غرور؟',
      fa: 'کدام‌یک از این‌ها یک شاخص کلیدی عملکرد واقعی است، نه یک معیار خودنمایی؟',
    },
    options: [
      { en: 'Total registered users since launch', ar: 'إجمالي المستخدمين المسجّلين منذ الإطلاق', fa: 'مجموع کاربران ثبت‌نام‌شده از زمان راه‌اندازی' },
      { en: 'Monthly active users', ar: 'المستخدمون النشطون شهريًا', fa: 'کاربران فعال ماهانه' },
      { en: 'Total page views ever', ar: 'إجمالي مشاهدات الصفحة على الإطلاق', fa: 'مجموع بازدید صفحه از ابتدا تا کنون' },
    ],
  },
  {
    id: 'w-recap-q005',
    weekId: 'ba1-recap',
    topic: 'centre',
    answer: 1,
    prompt: {
      en: 'Six graduates report salaries of 32k, 34k, 35k, 36k, 38k, and 480k. Which measure best describes "typical"?',
      ar: 'أبلغ ستة خريجين عن رواتب ٣٢ و٣٤ و٣٥ و٣٦ و٣٨ و٤٨٠ ألفًا. أي مقياس يصف "النموذجي" بأفضل شكل؟',
      fa: 'شش فارغ‌التحصیل حقوق ۳۲، ۳۴، ۳۵، ۳۶، ۳۸ و ۴۸۰ هزار را گزارش می‌دهند. کدام معیار «معمول» را بهتر توصیف می‌کند؟',
    },
    options: [
      { en: 'Mean', ar: 'المتوسط', fa: 'میانگین' },
      { en: 'Median', ar: 'الوسيط', fa: 'میانه' },
      { en: 'Mode', ar: 'المنوال', fa: 'نما' },
    ],
  },
  {
    id: 'w-recap-q006',
    weekId: 'ba1-recap',
    topic: 'spread',
    answer: 1,
    prompt: {
      en: "Two cafés both average 100 customers/day. Café A ranges 95–105, Café B ranges 20–300. Which has the higher standard deviation?",
      ar: 'مقهيان يبلغ متوسط زبائنهما ١٠٠ يوميًا. المقهى أ يتراوح بين ٩٥–١٠٥، والمقهى ب يتراوح بين ٢٠–٣٠٠. أيهما له انحراف معياري أعلى؟',
      fa: 'دو کافه هر دو به‌طور میانگین ۱۰۰ مشتری در روز دارند. کافه A بین ۹۵ تا ۱۰۵ نوسان دارد، کافه B بین ۲۰ تا ۳۰۰. کدام‌یک انحراف معیار بالاتری دارد؟',
    },
    options: [
      { en: 'Café A', ar: 'المقهى أ', fa: 'کافه A' },
      { en: 'Café B', ar: 'المقهى ب', fa: 'کافه B' },
      { en: "They're equal", ar: 'متساويان', fa: 'با هم برابرند' },
    ],
  },
  {
    id: 'w-recap-q007',
    weekId: 'ba1-recap',
    topic: 'charts',
    answer: 1,
    prompt: {
      en: "You're charting five categories' share of a whole. Which chart type fits best?",
      ar: 'تريد رسم نصيب خمس فئات من كل واحد. أي نوع رسم بياني هو الأنسب؟',
      fa: 'می‌خواهی سهم پنج دسته از یک کل را نمودار کنی. کدام نوع نمودار مناسب‌تر است؟',
    },
    options: [
      { en: 'Line chart', ar: 'رسم خطي', fa: 'نمودار خطی' },
      { en: 'Pie chart', ar: 'رسم دائري', fa: 'نمودار دایره‌ای' },
      { en: 'Scatter plot', ar: 'رسم مبعثر', fa: 'نمودار پراکنشی' },
    ],
  },
  {
    id: 'w-recap-q008',
    weekId: 'ba1-recap',
    topic: 'story',
    answer: 1,
    prompt: {
      en: 'Which structure does the guide recommend for telling a data story?',
      ar: 'أي بنية يوصي بها الدليل لسرد قصة البيانات؟',
      fa: 'این راهنما کدام ساختار را برای روایت یک داستان داده‌محور توصیه می‌کند؟',
    },
    options: [
      { en: 'Data-Methods-Results', ar: 'بيانات-منهجية-نتائج', fa: 'داده-روش‌ها-نتایج' },
      { en: 'Context-Evidence-Conclusion', ar: 'سياق-دليل-استنتاج', fa: 'زمینه-شواهد-نتیجه‌گیری' },
      { en: 'Introduction-Body-Conclusion', ar: 'مقدمة-متن-خاتمة', fa: 'مقدمه-متن-نتیجه‌گیری' },
    ],
  },
  {
    id: 'w-recap-q009',
    weekId: 'ba1-recap',
    topic: 'systems',
    answer: 0,
    prompt: {
      en: 'The guide\'s "don\'t cool the thermometer" metaphor warns against what?',
      ar: 'من ماذا يحذّر تشبيه "لا تبرّد الترمومتر" في الدليل؟',
      fa: 'قیاس «دماسنج را خنک نکن» در این راهنما نسبت به چه چیزی هشدار می‌دهد؟',
    },
    options: [
      { en: 'Treating symptoms instead of causes', ar: 'معالجة الأعراض بدل الأسباب', fa: 'درمان علائم به‌جای علت‌ها' },
      { en: 'Ignoring data quality', ar: 'تجاهل جودة البيانات', fa: 'نادیده‌گرفتن کیفیت داده' },
      { en: 'Skipping the diagnostic stage', ar: 'تخطي المرحلة التشخيصية', fa: 'حذف مرحله تشخیصی' },
    ],
  },
  {
    id: 'w-recap-q010',
    weekId: 'ba1-recap',
    topic: 'governance',
    answer: 1,
    prompt: {
      en: 'Under GDPR, what\'s the right to be forgotten?',
      ar: 'بموجب اللائحة العامة لحماية البيانات (GDPR)، ما هو الحق في النسيان؟',
      fa: 'طبق GDPR، حق فراموش‌شدن چیست؟',
    },
    options: [
      { en: 'The right to a free copy of your data', ar: 'الحق في نسخة مجانية من بياناتك', fa: 'حق دریافت رایگان یک نسخه از داده‌ات' },
      { en: 'The right to have your data deleted', ar: 'الحق في حذف بياناتك', fa: 'حق حذف‌شدن داده‌ات' },
      { en: 'The right to know who accessed your data', ar: 'الحق في معرفة من اطّلع على بياناتك', fa: 'حق دانستن اینکه چه کسی به داده‌ات دسترسی داشته' },
    ],
  },
  {
    id: 'w-recap-q011',
    weekId: 'ba1-recap',
    topic: 'cleaning',
    answer: 2,
    prompt: {
      en: 'Which of these is NOT one of the "four faces of dirty data" in the guide?',
      ar: 'أي مما يلي ليس أحد "الأوجه الأربعة للبيانات غير النظيفة" في الدليل؟',
      fa: 'کدام‌یک از موارد زیر جزو «چهار چهره داده ناتمیز» در این راهنما نیست؟',
    },
    options: [
      { en: 'Duplicates', ar: 'التكرارات', fa: 'تکراری‌ها' },
      { en: 'Missing values', ar: 'القيم المفقودة', fa: 'مقادیر گمشده' },
      { en: 'Slow load times', ar: 'بطء أوقات التحميل', fa: 'زمان بارگذاری کند' },
    ],
  },
  {
    id: 'w-recap-q012',
    weekId: 'ba1-recap',
    topic: 'normal',
    answer: 1,
    prompt: {
      en: 'Under the empirical rule, roughly what % of values fall within 2 standard deviations of the mean?',
      ar: 'بحسب القاعدة التجريبية، ما هي نسبة القيم الواقعة تقريبًا ضمن انحرافين معياريين عن المتوسط؟',
      fa: 'طبق قاعده تجربی، تقریباً چند درصد از مقادیر در فاصله ۲ انحراف معیار از میانگین قرار دارند؟',
    },
    options: [
      { en: '68%', ar: '٦٨٪', fa: '۶۸٪' },
      { en: '95%', ar: '٩٥٪', fa: '۹۵٪' },
      { en: '99.7%', ar: '٩٩٫٧٪', fa: '۹۹٫۷٪' },
    ],
  },
  {
    id: 'w-recap-q013',
    weekId: 'ba1-recap',
    topic: 'sampling',
    answer: 1,
    prompt: {
      en: 'What does the Central Limit Theorem let you do?',
      ar: 'ما الذي تتيحه لك نظرية النهاية المركزية؟',
      fa: 'قضیه حد مرکزی چه کاری را برای تو ممکن می‌کند؟',
    },
    options: [
      { en: 'Eliminate all bias from a sample', ar: 'إزالة كل تحيز من العينة', fa: 'حذف کامل تعصب از یک نمونه' },
      {
        en: "Build confidence intervals even without knowing the population's true distribution",
        ar: 'بناء فترات ثقة حتى دون معرفة التوزيع الحقيقي للمجتمع',
        fa: 'ساختن بازه‌های اطمینان حتی بدون دانستن توزیع واقعی جامعه',
      },
      { en: 'Guarantee a sample is representative', ar: 'ضمان أن العينة ممثّلة', fa: 'تضمین اینکه یک نمونه معرف است' },
    ],
  },
  {
    id: 'w-recap-q014',
    weekId: 'ba1-recap',
    topic: 'regression',
    answer: 1,
    prompt: {
      en: 'In Y = a + bX, what does "b" represent?',
      ar: 'في المعادلة Y = a + bX، ماذا يمثّل "b"؟',
      fa: 'در Y = a + bX، «b» نشان‌دهنده چیست؟',
    },
    options: [
      { en: 'The intercept', ar: 'نقطة التقاطع', fa: 'عرض از مبدأ' },
      { en: 'The slope', ar: 'الميل', fa: 'شیب' },
      { en: 'The R-squared value', ar: 'قيمة R-squared', fa: 'مقدار R-squared' },
    ],
  },
  {
    id: 'w-recap-q015',
    weekId: 'ba1-recap',
    topic: 'multiple',
    answer: 1,
    prompt: {
      en: 'What does "ceteris paribus" mean in multiple regression?',
      ar: 'ماذا تعني عبارة "ceteris paribus" في الانحدار المتعدد؟',
      fa: '«ceteris paribus» در رگرسیون چندگانه به چه معناست؟',
    },
    options: [
      { en: 'All variables are equally important', ar: 'كل المتغيرات لها نفس الأهمية', fa: 'همه متغیرها به یک اندازه مهم‌اند' },
      { en: 'Holding other variables constant', ar: 'إبقاء بقية المتغيرات ثابتة', fa: 'ثابت‌نگه‌داشتن سایر متغیرها' },
      { en: 'The model is statistically significant', ar: 'النموذج معنوي إحصائيًا', fa: 'مدل از نظر آماری معنادار است' },
    ],
  },
  {
    id: 'w-recap-q016',
    weekId: 'ba1-recap',
    topic: 'timeseries',
    answer: 1,
    prompt: {
      en: 'Rule of 72 helps you estimate what?',
      ar: 'بماذا تساعدك قاعدة الـ٧٢ على تقديره؟',
      fa: 'قاعده ۷۲ به تو کمک می‌کند چه چیزی را تخمین بزنی؟',
    },
    options: [
      { en: 'The number of outliers in a dataset', ar: 'عدد القيم المتطرفة في مجموعة بيانات', fa: 'تعداد مقادیر پرت در یک مجموعه داده' },
      {
        en: 'How many years it takes a value to double at a given growth rate',
        ar: 'عدد السنوات اللازمة لتضاعف قيمة عند معدل نمو معيّن',
        fa: 'چند سال طول می‌کشد یک مقدار با نرخ رشد معین دو برابر شود',
      },
      { en: 'The ideal sample size', ar: 'حجم العينة المثالي', fa: 'اندازه نمونه ایده‌آل' },
    ],
  },
  {
    id: 'w-recap-q017',
    weekId: 'ba1-recap',
    topic: 'optimisation',
    answer: 1,
    prompt: {
      en: 'In Solver terminology, what is a "binding" constraint?',
      ar: 'في مصطلحات Solver، ما هو القيد "الملزم" (binding)؟',
      fa: 'در اصطلاح Solver، محدودیت «مقیّد» (binding) چیست؟',
    },
    options: [
      { en: "A constraint that's not affecting the current solution", ar: 'قيد لا يؤثر على الحل الحالي', fa: 'محدودیتی که روی راه‌حل فعلی تأثیری ندارد' },
      {
        en: "A constraint that's exactly met at the optimal solution, limiting it further",
        ar: 'قيد يتحقق تمامًا عند الحل الأمثل، ويحدّه بشكل إضافي',
        fa: 'محدودیتی که دقیقاً در راه‌حل بهینه برآورده می‌شود و آن را بیشتر محدود می‌کند',
      },
      { en: 'An error in the model', ar: 'خطأ في النموذج', fa: 'خطایی در مدل' },
    ],
  },
]

export const ba1Recap: Week = {
  id: 'ba1-recap',
  order: -1,
  cover: {
    kicker: {
      en: 'Business Analytics · Bridge Document',
      ar: 'تحليلات الأعمال · وثيقة الجسر',
      fa: 'تحلیل کسب‌وکار · سند پل',
    },
    titleHtml: {
      en: '<h1>BA1 Recap<em>Your Analytics Field Guide</em></h1><p class="lede">Everything you built in Business Analytics 1 — the mindset, the maths, the toolkit — rewritten to be read on your phone. Skim it before BA2 starts, or keep it open beside you while you work.</p>',
      ar: '<h1>مراجعة BA1<em>دليلك الميداني في التحليلات</em></h1><p class="lede">كل ما بنيته في تحليلات الأعمال 1 — العقلية والرياضيات والأدوات — أُعيدت كتابته ليُقرأ على هاتفك. تصفّحه سريعًا قبل بدء BA2، أو أبقه مفتوحًا بجانبك أثناء العمل.</p>',
      fa: '<h1>مرور BA1<em>راهنمای میدانی تحلیل تو</em></h1><p class="lede">هر آنچه در تحلیل کسب‌وکار ۱ ساختی — طرز فکر، ریاضیات، ابزارها — طوری بازنویسی شده که روی گوشی‌ات خوانده شود. پیش از شروع BA2 آن را مرور کن، یا هنگام کار کنارت باز نگه‌دار.</p>',
    },
    timeEstimate: { en: 'Reference — read at your own pace', ar: 'مرجع — اقرأه بالسرعة التي تناسبك', fa: 'مرجع — با سرعت خودت بخوان' },
  },
  questions,
  sections: [
    {
      id: 'how-to-use',
      navLabel: { en: 'How to use this guide', ar: 'كيفية استخدام هذا الدليل', fa: 'چگونه از این راهنما استفاده کنیم' },
      sectionLabel: { en: 'Section 01', ar: 'القسم ٠١', fa: 'بخش ۰۱' },
      headingHtml: {
        en: '<h2>How to use this guide</h2><p class="standfirst">This is a recap, not a textbook. It assumes you sat through BA1 — it\'s here to bring it back, fast.</p>',
        ar: '<h2>كيفية استخدام هذا الدليل</h2><p class="standfirst">هذا مراجعة، لا كتابًا دراسيًا. يفترض أنك درست BA1 بالفعل — وظيفته أن يعيده إلى ذاكرتك بسرعة.</p>',
        fa: '<h2>چگونه از این راهنما استفاده کنیم</h2><p class="standfirst">این یک مرور است، نه یک کتاب درسی. فرض می‌کند BA1 را گذرانده‌ای — اینجاست تا آن را سریع به یادت بیاورد.</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: "<p>Each section follows the same shape, so you can navigate it without thinking:</p><ul><li><strong>The idea</strong> — what the concept actually is, in plain language.</li><li><strong>An analogy</strong> — something from ordinary life that has the same shape as the maths.</li><li><strong>A worked example</strong> — real numbers, so it stops being abstract.</li><li><strong>Common mistakes</strong> — the errors people genuinely make, so you can spot them in your own work.</li><li><strong>Self-check</strong> — questions to answer out loud. If you can't, reread the section.</li></ul>",
            ar: '<p>يتبع كل قسم البنية نفسها، حتى تتنقل بينها دون تفكير:</p><ul><li><strong>الفكرة</strong> — ما هو المفهوم فعليًا، بلغة بسيطة.</li><li><strong>تشبيه</strong> — شيء من الحياة اليومية له نفس بنية الرياضيات.</li><li><strong>مثال تطبيقي</strong> — أرقام حقيقية، حتى يتوقف عن كونه مجردًا.</li><li><strong>أخطاء شائعة</strong> — الأخطاء التي يقع فيها الناس فعليًا، حتى تلاحظها في عملك أنت.</li><li><strong>مراجعة ذاتية</strong> — أسئلة تجيب عنها بصوت عالٍ. إن لم تستطع، أعد قراءة القسم.</li></ul>',
            fa: '<p>هر بخش همان ساختار را دنبال می‌کند، تا بتوانی بدون فکر کردن در آن حرکت کنی:</p><ul><li><strong>ایده</strong> — این مفهوم واقعاً چیست، به زبان ساده.</li><li><strong>یک قیاس</strong> — چیزی از زندگی روزمره که همان ساختار ریاضی را دارد.</li><li><strong>یک مثال حل‌شده</strong> — اعداد واقعی، تا دیگر انتزاعی نباشد.</li><li><strong>اشتباهات رایج</strong> — خطاهایی که مردم واقعاً مرتکب می‌شوند، تا آن‌ها را در کار خودت تشخیص دهی.</li><li><strong>مراجعه شخصی</strong> — پرسش‌هایی که باید با صدای بلند پاسخ دهی. اگر نتوانستی، بخش را دوباره بخوان.</li></ul>',
          },
        },
        {
          type: 'box',
          variant: 'keypoint',
          label: { en: 'Read this bit properly', ar: 'اقرأ هذا الجزء جيدًا', fa: 'این بخش را جدی بخوان' },
          html: {
            en: "<p>The self-check questions are the most valuable part of this document. Trying to retrieve an answer from memory — even when you fail — builds far stronger recall than rereading the section a third time. Don't skip them because they feel uncomfortable. The discomfort <em>is</em> the learning.</p>",
            ar: '<p>أسئلة المراجعة الذاتية هي أقيم جزء في هذه الوثيقة. محاولة استرجاع إجابة من الذاكرة — حتى عند الفشل — تبني تذكرًا أقوى بكثير من إعادة قراءة القسم للمرة الثالثة. لا تتجاوزها لأنها تشعرك بعدم الارتياح. عدم الارتياح <em>هو</em> التعلّم نفسه.</p>',
            fa: '<p>پرسش‌های مراجعه شخصی ارزشمندترین بخش این سند هستند. تلاش برای بازیابی یک پاسخ از حافظه — حتی وقتی موفق نشوی — تثبیت به‌مراتب قوی‌تری نسبت به خواندن دوباره بخش برای سومین‌بار ایجاد می‌کند. آن‌ها را به‌خاطر ناراحت‌کننده‌بودن رد نکن. آن ناراحتی <em>خودِ</em> یادگیری است.</p>',
          },
        },
        {
          type: 'html',
          html: {
            en: '<p>If you have five minutes rather than an hour, jump straight to <a href="#panic">the panic sheet</a> at the end. It\'s one screen of formulas and functions, designed to be screenshotted.</p>',
            ar: '<p>إن كان لديك خمس دقائق بدلاً من ساعة، انتقل مباشرة إلى <a href="#panic">ورقة الطوارئ</a> في النهاية. إنها شاشة واحدة من الصيغ والدوال، صُممت لتُلتقط لها صورة شاشة.</p>',
            fa: '<p>اگر پنج دقیقه داری نه یک ساعت، مستقیم به <a href="#panic">برگه اضطراری</a> در انتها برو. یک صفحه از فرمول‌ها و توابع است، طوری طراحی شده که بتوان از آن اسکرین‌شات گرفت.</p>',
          },
        },
        { type: 'exercise', questionId: 'w-recap-q001' },
      ],
    },
    {
      id: 'ped',
      navLabel: { en: 'The PED framework', ar: 'إطار PED', fa: 'چارچوب PED' },
      sectionLabel: { en: 'Section 02', ar: 'القسم ٠٢', fa: 'بخش ۰۲' },
      headingHtml: {
        en: '<h2>The PED framework</h2><p class="standfirst">The loop behind every week of BA1 — and still the backbone of BA2.</p>',
        ar: '<h2>إطار PED</h2><p class="standfirst">الحلقة الكامنة خلف كل أسبوع من BA1 — وما زالت العمود الفقري لـ BA2.</p>',
        fa: '<h2>چارچوب PED</h2><p class="standfirst">حلقه‌ای که پشت هر هفته از BA1 قرار دارد — و همچنان ستون فقرات BA2 است.</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: '<p>Analytics isn\'t a pile of techniques. It\'s a repeating three-step loop, and almost every mistake in the field comes from skipping a step.</p><ol><li><strong>P — Process</strong> — Collect the data and clean it. This is roughly 80% of the actual work, and nobody warns you about that in advance.</li><li><strong>E — Explain</strong> — Visualise it and communicate what it means. Not "here is a chart" — here is <em>why</em> the chart looks like that.</li><li><strong>D — Decide</strong> — Turn the insight into an action. If nothing changes as a result, the analysis didn\'t happen.</li></ol><blockquote>An analysis that doesn\'t lead to a decision is just a fun fact — interesting, but nothing changes.<cite>BA1, Week 0</cite></blockquote>',
            ar: '<p>التحليلات ليست كومة من التقنيات. إنها حلقة متكررة من ثلاث خطوات، وتقريبًا كل خطأ في هذا المجال ينتج عن تخطي إحدى هذه الخطوات.</p><ol><li><strong>P — المعالجة (Process)</strong> — جمع البيانات وتنظيفها. هذا يمثّل نحو ٨٠٪ من العمل الفعلي.</li><li><strong>E — الشرح (Explain)</strong> — تصويرها بيانيًا وتوضيح ما تعنيه.</li><li><strong>D — القرار (Decide)</strong> — تحويل الاستنتاج إلى إجراء. إن لم يتغير شيء نتيجة لذلك، فالتحليل لم يحدث فعليًا.</li></ol><blockquote>التحليل الذي لا يؤدي إلى قرار مجرد معلومة طريفة — مثيرة للاهتمام، لكن لا شيء يتغير.<cite>BA1، الأسبوع 0</cite></blockquote>',
            fa: '<p>تحلیل کسب‌وکار انبوهی از تکنیک‌ها نیست. یک حلقه سه‌مرحله‌ای تکرارشونده است.</p><ol><li><strong>P — پردازش (Process)</strong> — گردآوری داده و پاک‌سازی آن. این تقریباً ۸۰٪ از کار واقعی است.</li><li><strong>E — تبیین (Explain)</strong> — مصورسازی آن و بیان معنایش.</li><li><strong>D — تصمیم (Decide)</strong> — تبدیل بینش به یک اقدام. اگر در نتیجه آن چیزی تغییر نکند، تحلیلی رخ نداده است.</li></ol><blockquote>تحلیلی که به تصمیمی نینجامد فقط یک واقعیت جالب است — جالب، اما چیزی تغییر نمی‌کند.<cite>BA1، هفته ۰</cite></blockquote>',
          },
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 1', ar: 'الرسم ١', fa: 'نمودار ۱' },
          title: { en: 'The PED loop', ar: 'حلقة PED', fa: 'حلقه PED' },
          src: '/figures/ba1-recap/diagram-01.svg',
          alt: 'The PED loop: Process, Explain, Decide, repeating',
          caption: {
            en: 'Each decision produces the next question — which is why PED is a loop, not a line.',
            ar: 'كل قرار يُنتج السؤال التالي — لهذا فإن PED حلقة، لا خط مستقيم.',
            fa: 'هر تصمیم پرسش بعدی را تولید می‌کند — به همین دلیل PED یک حلقه است، نه یک خط.',
          },
        },
        {
          type: 'box',
          variant: 'analogy',
          label: { en: 'Analogy', ar: 'تشبيه', fa: 'قیاس' },
          html: {
            en: '<p>Think of a doctor. <strong>Process</strong> is running the blood tests and checking they weren\'t contaminated. <strong>Explain</strong> is reading the results and working out what\'s causing the symptoms. <strong>Decide</strong> is writing the prescription. A doctor who runs perfect tests and then sends you home with nothing hasn\'t treated you.</p>',
            ar: '<p>تخيّل طبيبًا. <strong>المعالجة</strong> هي إجراء فحوصات الدم والتأكد من عدم تلوثها. <strong>الشرح</strong> هو قراءة النتائج ومعرفة سبب الأعراض. <strong>القرار</strong> هو كتابة الوصفة الطبية.</p>',
            fa: '<p>پزشکی را در نظر بگیر. <strong>پردازش</strong> یعنی انجام آزمایش‌های خون. <strong>تبیین</strong> یعنی خواندن نتایج و فهمیدن علت علائم. <strong>تصمیم</strong> یعنی نوشتن نسخه.</p>',
          },
        },
        {
          type: 'html',
          html: {
            en: '<h3>The values that carry forward</h3><ul><li><strong>Human-in-the-loop.</strong> The algorithm is the engine. Your judgement is the steering wheel.</li><li><strong>Correlation isn\'t causation.</strong> Statistics find the link; humans find the logic.</li><li><strong>AI is a co-pilot, not an autopilot.</strong> It speeds up Process. It doesn\'t replace you on Explain and Decide.</li></ul>',
            ar: '<h3>القيم التي تستمر معك</h3><ul><li><strong>الإنسان في قلب الحلقة.</strong> الخوارزمية هي المحرك. حُكمك أنت هو عجلة القيادة.</li><li><strong>الارتباط ليس سببية.</strong> الإحصاء يجد الرابط؛ البشر يجدون المنطق.</li><li><strong>الذكاء الاصطناعي مساعد طيار، لا طيارًا آليًا.</strong> إنه يسرّع المعالجة.</li></ul>',
            fa: '<h3>ارزش‌هایی که همچنان معتبرند</h3><ul><li><strong>انسان در قلب حلقه.</strong> الگوریتم موتور است. قضاوت تو فرمان است.</li><li><strong>همبستگی، علیت نیست.</strong> آمار پیوند را می‌یابد؛ انسان‌ها منطق را می‌یابند.</li><li><strong>هوش مصنوعی کمک‌خلبان است، نه خلبان خودکار.</strong> پردازش را سریع‌تر می‌کند.</li></ul>',
          },
        },
        { type: 'exercise', questionId: 'w-recap-q002' },
      ],
    },
    {
      id: 'levels',
      navLabel: { en: 'The four levels of analytics', ar: 'المستويات الأربعة للتحليلات', fa: 'چهار سطح تحلیل' },
      sectionLabel: { en: 'Section 03', ar: 'القسم ٠٣', fa: 'بخش ۰۳' },
      headingHtml: {
        en: '<h2>The four levels of analytics</h2><p class="standfirst">Four questions, increasing in difficulty and in value.</p>',
        ar: '<h2>المستويات الأربعة للتحليلات</h2><p class="standfirst">أربعة أسئلة، تزداد صعوبة وقيمة كلما تقدمت.</p>',
        fa: '<h2>چهار سطح تحلیل</h2><p class="standfirst">چهار پرسش، که هرچه پیش می‌روند سخت‌تر و ارزشمندتر می‌شوند.</p>',
      },
      blocks: [
        {
          type: 'table',
          headers: [
            { en: 'Level', ar: 'المستوى', fa: 'سطح' },
            { en: 'Asks', ar: 'يسأل', fa: 'می‌پرسد' },
            { en: 'Tool', ar: 'الأداة', fa: 'ابزار' },
          ],
          rows: [
            [{ en: '<strong>Descriptive</strong>' }, { en: 'What happened?', ar: 'ماذا حدث؟', fa: 'چه اتفاقی افتاد؟' }, { en: 'Reports, dashboards', ar: 'تقارير، لوحات معلومات', fa: 'گزارش‌ها، داشبوردها' }],
            [{ en: '<strong>Diagnostic</strong>' }, { en: 'Why did it happen?', ar: 'لماذا حدث؟', fa: 'چرا اتفاق افتاد؟' }, { en: 'Drill-down, correlation', ar: 'التنقيب التفصيلي، الارتباط', fa: 'بررسی جزئیات، همبستگی' }],
            [{ en: '<strong>Predictive</strong>' }, { en: 'What will happen?', ar: 'ماذا سيحدث؟', fa: 'چه اتفاقی خواهد افتاد؟' }, { en: 'Regression, forecasting', ar: 'الانحدار، التنبؤ', fa: 'رگرسیون، پیش‌بینی' }],
            [{ en: '<strong>Prescriptive</strong>' }, { en: 'What should we do?', ar: 'ماذا ينبغي أن نفعل؟', fa: 'چه باید بکنیم؟' }, { en: 'Optimisation, Solver', ar: 'التحسين، Solver', fa: 'بهینه‌سازی، Solver' }],
          ],
        },
        {
          type: 'box',
          variant: 'analogy',
          label: { en: 'Analogy', ar: 'تشبيه', fa: 'قیاس' },
          html: {
            en: '<p>You\'re driving. <strong>Descriptive</strong> is the rear-view mirror — where you\'ve been. <strong>Diagnostic</strong> is looking under the bonnet when something rattles. <strong>Predictive</strong> is the sat-nav estimating your arrival time. <strong>Prescriptive</strong> is the sat-nav saying "turn left now to avoid the jam." Notice the value rises as you move down, and so does the difficulty.</p>',
            ar: '<p>أنت تقود سيارة. <strong>الوصفي</strong> هو المرآة الخلفية. <strong>التشخيصي</strong> هو النظر تحت غطاء المحرك. <strong>التنبؤي</strong> هو نظام الملاحة يقدّر وقت وصولك. <strong>التوجيهي</strong> هو نظام الملاحة يقول "انعطف يسارًا الآن".</p>',
            fa: '<p>در حال رانندگی هستی. <strong>توصیفی</strong> آینه عقب است. <strong>تشخیصی</strong> نگاه‌کردن زیر کاپوت است. <strong>پیش‌بینی‌کننده</strong> سیستم ناوبری است که زمان رسیدنت را تخمین می‌زند. <strong>تجویزی</strong> سیستم ناوبری است که می‌گوید «همین حالا به چپ بپیچ».</p>',
          },
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 2', ar: 'الرسم ٢', fa: 'نمودار ۲' },
          title: { en: 'The analytics value ladder', ar: 'سلم قيمة التحليلات', fa: 'نردبان ارزش تحلیل' },
          src: '/figures/ba1-recap/diagram-02.svg',
          alt: 'The analytics value ladder, four ascending steps',
          caption: {
            en: 'Value and difficulty both rise as you climb. Every rung depends on the one below it.',
            ar: 'القيمة والصعوبة ترتفعان معًا كلما صعدت.',
            fa: 'ارزش و دشواری هر دو با بالارفتن افزایش می‌یابند.',
          },
        },
        {
          type: 'box',
          variant: 'mistake',
          label: { en: 'Common mistake', ar: 'خطأ شائع', fa: 'اشتباه رایج' },
          html: {
            en: '<p>Jumping straight to predictive because it sounds impressive. If your descriptive layer is wrong — bad definitions, dirty data, disputed numbers — your forecast is confidently wrong, which is worse than no forecast at all. Earn the higher rungs.</p>',
            ar: '<p>القفز مباشرة إلى التنبؤي لأنه يبدو مبهرًا. إذا كانت طبقتك الوصفية خاطئة، فإن تنبؤك سيكون خاطئًا بثقة.</p>',
            fa: '<p>پریدن مستقیم به سراغ پیش‌بینی چون چشمگیر به‌نظر می‌رسد. اگر لایه توصیفی‌ات اشتباه باشد، پیش‌بینی‌ات با اطمینان اشتباه خواهد بود.</p>',
          },
        },
        { type: 'exercise', questionId: 'w-recap-q003' },
      ],
    },
    {
      id: 'kpi',
      navLabel: { en: 'KPIs vs. metrics', ar: 'مؤشرات الأداء مقابل المقاييس', fa: 'شاخص‌های کلیدی عملکرد در برابر معیارها' },
      sectionLabel: { en: 'Section 04', ar: 'القسم ٠٤', fa: 'بخش ۰۴' },
      headingHtml: {
        en: '<h2>KPIs vs. metrics</h2><p class="standfirst">Every KPI is a metric. Almost no metric is a KPI.</p>',
        ar: '<h2>مؤشرات الأداء مقابل المقاييس</h2><p class="standfirst">كل مؤشر أداء رئيسي هو مقياس. أما معظم المقاييس فليست مؤشرات أداء رئيسية.</p>',
        fa: '<h2>شاخص‌های کلیدی عملکرد در برابر معیارها</h2><p class="standfirst">هر شاخص کلیدی عملکرد یک معیار است. اما تقریباً هیچ معیاری شاخص کلیدی عملکرد نیست.</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: '<p>A <strong>metric</strong> is anything you can measure. A <strong>KPI</strong> is a metric tied directly to a goal you\'re actually trying to move — which means someone should change their behaviour when it moves.</p>',
            ar: '<p><strong>المقياس</strong> هو أي شيء يمكنك قياسه. أما <strong>مؤشر الأداء الرئيسي (KPI)</strong> فهو مقياس مرتبط مباشرة بهدف تحاول فعليًا تحريكه.</p>',
            fa: '<p><strong>معیار</strong> هر چیزی است که بتوانی اندازه بگیری. <strong>شاخص کلیدی عملکرد (KPI)</strong> معیاری است که مستقیماً به هدفی که واقعاً می‌خواهی جابه‌جایش کنی گره خورده.</p>',
          },
        },
        {
          type: 'box',
          variant: 'example',
          label: { en: 'Worked example', ar: 'مثال تطبيقي', fa: 'مثال حل‌شده' },
          html: {
            en: '<p>An online shop tracks <em>page views</em> (a metric — nice to know) and <em>cart abandonment rate</em> (a KPI — if it climbs, the checkout team has work to do this week). Page views can double while revenue stays flat. Abandonment rate can\'t move without someone caring.</p>',
            ar: '<p>متجر إلكتروني يتابع <em>مشاهدات الصفحة</em> (مقياس) و<em>معدل التخلي عن سلة الشراء</em> (مؤشر أداء رئيسي). يمكن لمشاهدات الصفحة أن تتضاعف بينما تبقى الإيرادات ثابتة.</p>',
            fa: '<p>یک فروشگاه اینترنتی <em>بازدید صفحه</em> (یک معیار) و <em>نرخ رهاسازی سبد خرید</em> (یک شاخص کلیدی عملکرد) را دنبال می‌کند. بازدید صفحه می‌تواند دو برابر شود درحالی‌که درآمد ثابت بماند.</p>',
          },
        },
        {
          type: 'html',
          html: {
            en: '<p>A usable KPI is <strong>simple</strong> (one sentence to explain), <strong>relevant</strong> (tied to a real goal), and <strong>timely</strong> (measured often enough to act on).</p>',
            ar: '<p>مؤشر الأداء القابل للاستخدام <strong>بسيط</strong>، و<strong>ذو صلة</strong>، و<strong>مناسب التوقيت</strong>.</p>',
            fa: '<p>یک شاخص کلیدی عملکرد قابل استفاده <strong>ساده</strong>، <strong>مرتبط</strong>، و <strong>به‌موقع</strong> است.</p>',
          },
        },
        {
          type: 'box',
          variant: 'mistake',
          label: { en: 'Common mistake', ar: 'خطأ شائع', fa: 'اشتباه رایج' },
          html: {
            en: '<p>The vanity metric — a number that only ever goes up and therefore tells you nothing. Total registered users since launch will rise forever, even as your product dies. Monthly <em>active</em> users won\'t. If a metric can\'t deliver bad news, it isn\'t a KPI.</p>',
            ar: '<p>مقياس الغرور — رقم لا يفعل شيئًا سوى الارتفاع. إجمالي المستخدمين المسجّلين منذ الإطلاق سيرتفع إلى الأبد، حتى وإن كان منتجك يحتضر.</p>',
            fa: '<p>معیار خودنمایی — عددی که فقط بالا می‌رود. مجموع کاربران ثبت‌نام‌شده از زمان راه‌اندازی برای همیشه بالا می‌رود، حتی وقتی محصولت در حال مرگ باشد.</p>',
          },
        },
        { type: 'exercise', questionId: 'w-recap-q004' },
      ],
    },
    {
      id: 'centre',
      navLabel: { en: 'Finding the centre', ar: 'إيجاد المركز', fa: 'یافتن مرکز' },
      sectionLabel: { en: 'Section 05', ar: 'القسم ٠٥', fa: 'بخش ۰۵' },
      headingHtml: {
        en: '<h2>Finding the centre</h2><p class="standfirst">Mean, median, mode — and knowing which one is lying to you.</p>',
        ar: '<h2>إيجاد المركز</h2><p class="standfirst">المتوسط، الوسيط، المنوال — ومعرفة أيها يكذب عليك.</p>',
        fa: '<h2>یافتن مرکز</h2><p class="standfirst">میانگین، میانه، نما — و دانستن اینکه کدام‌یک به تو دروغ می‌گوید.</p>',
      },
      blocks: [
        {
          type: 'box',
          variant: 'analogy',
          label: { en: 'Analogy', ar: 'تشبيه', fa: 'قیاس' },
          html: {
            en: '<p>Picture a birthday cake cut into uneven slices, one per person. The <strong>mean</strong> is what you\'d get if you mashed every slice together and redistributed it so everyone held an identical piece. The <strong>median</strong> is simply the person standing in the middle when everyone lines up by slice size. The <strong>mode</strong> is the slice size you see most often on the table.</p>',
            ar: '<p>تخيّل كعكة عيد ميلاد قُطّعت شرائح متفاوتة الحجم. <strong>المتوسط</strong> هو ما تحصل عليه لو هرست كل الشرائح معًا. <strong>الوسيط</strong> هو الشخص الواقف في المنتصف. <strong>المنوال</strong> هو حجم الشريحة الذي تراه أكثر من غيره.</p>',
            fa: '<p>یک کیک تولد را تصور کن که به برش‌های نامساوی بریده شده. <strong>میانگین</strong> چیزی است که اگر همه برش‌ها را له می‌کردی به دست می‌آمد. <strong>میانه</strong> شخصی است که وسط ایستاده. <strong>نما</strong> اندازه برشی است که بیشتر می‌بینی.</p>',
          },
        },
        {
          type: 'table',
          headers: [
            { en: 'Measure', ar: 'المقياس', fa: 'معیار' },
            { en: 'Use when', ar: 'استخدمه عندما', fa: 'زمان استفاده' },
          ],
          rows: [
            [{ en: '<strong>Mean</strong>' }, { en: 'Data is fairly even, no extreme values', ar: 'البيانات متجانسة نسبيًا، دون قيم متطرفة', fa: 'داده نسبتاً یکنواخت است، بدون مقادیر افراطی' }],
            [{ en: '<strong>Median</strong>' }, { en: 'Outliers exist — salaries, house prices, rent', ar: 'توجد قيم متطرفة — الرواتب، أسعار المنازل، الإيجار', fa: 'مقادیر پرت وجود دارند — حقوق، قیمت مسکن، اجاره' }],
            [{ en: '<strong>Mode</strong>' }, { en: 'Categories, or "most common" questions', ar: 'الفئات، أو أسئلة "الأكثر شيوعًا"', fa: 'دسته‌بندی‌ها، یا پرسش‌های «رایج‌ترین»' }],
          ],
        },
        {
          type: 'box',
          variant: 'example',
          label: { en: 'Worked example', ar: 'مثال تطبيقي', fa: 'مثال حل‌شده' },
          html: {
            en: '<p>Six graduates report their starting salaries, in thousands: 32, 34, 35, 36, 38, and 480 (one founded a startup that sold).</p><p><strong>Mean</strong> = 109k. <strong>Median</strong> = 35.5k.</p><p>The mean is technically correct and completely useless — it describes nobody in the room. Any recruiter quoting "average graduate salary: 109k" is misleading you with true numbers.</p>',
            ar: '<p>ستة خريجين أبلغوا عن رواتبهم الأولى، بالآلاف: ٣٢، ٣٤، ٣٥، ٣٦، ٣٨، و٤٨٠.</p><p><strong>المتوسط</strong> = ١٠٩ آلاف. <strong>الوسيط</strong> = ٣٥٫٥ ألفًا.</p><p>المتوسط صحيح تقنيًا وعديم الفائدة تمامًا — فهو لا يصف أحدًا في الغرفة.</p>',
            fa: '<p>شش فارغ‌التحصیل حقوق شروع خود را گزارش می‌دهند، به هزار: ۳۲، ۳۴، ۳۵، ۳۶، ۳۸ و ۴۸۰.</p><p><strong>میانگین</strong> = ۱۰۹ هزار. <strong>میانه</strong> = ۳۵٫۵ هزار.</p><p>میانگین از نظر فنی درست است اما کاملاً بی‌فایده — هیچ‌کس در آن اتاق را توصیف نمی‌کند.</p>',
          },
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 3', ar: 'الرسم ٣', fa: 'نمودار ۳' },
          title: { en: 'How one outlier drags the mean', ar: 'كيف تسحب قيمة متطرفة واحدة المتوسط', fa: 'چگونه یک مقدار پرت میانگین را می‌کشد' },
          src: '/figures/ba1-recap/diagram-03.svg',
          alt: 'One outlier drags the mean away from the data',
          caption: {
            en: 'Five graduates earn 32–38k. One sold a startup. Only one of these measures is useful.',
            ar: 'خمسة خريجين يكسبون ٣٢–٣٨ ألفًا. أحدهم باع شركة ناشئة.',
            fa: 'پنج فارغ‌التحصیل بین ۳۲ تا ۳۸ هزار درآمد دارند. یکی استارتاپش را فروخته.',
          },
        },
        {
          type: 'box',
          variant: 'mistake',
          label: { en: 'Common mistake', ar: 'خطأ شائع', fa: 'اشتباه رایج' },
          html: {
            en: '<p>Reading "average" in a headline and assuming it means "typical". It usually means the mean, and the mean is the measure most easily distorted. When you see an average, always ask what the median was — and if the writer didn\'t say, ask why not.</p>',
            ar: '<p>قراءة كلمة "متوسط" في عنوان رئيسي وافتراض أنها تعني "نموذجي". حين ترى متوسطًا، اسأل دائمًا عن قيمة الوسيط.</p>',
            fa: '<p>خواندن کلمه «میانگین» در یک تیتر و فرض‌کردن اینکه یعنی «معمول». هر وقت میانگینی دیدی، همیشه بپرس میانه چقدر بوده.</p>',
          },
        },
        { type: 'exercise', questionId: 'w-recap-q005' },
      ],
    },
    {
      id: 'spread',
      navLabel: { en: 'Measuring the spread', ar: 'قياس التشتت', fa: 'اندازه‌گیری پراکندگی' },
      sectionLabel: { en: 'Section 06', ar: 'القسم ٠٦', fa: 'بخش ۰۶' },
      headingHtml: {
        en: '<h2>Measuring the spread</h2><p class="standfirst">The centre tells you where. The spread tells you how much to trust it.</p>',
        ar: '<h2>قياس التشتت</h2><p class="standfirst">المركز يخبرك أين. أما التشتت فيخبرك بمقدار ثقتك بذلك.</p>',
        fa: '<h2>اندازه‌گیری پراکندگی</h2><p class="standfirst">مرکز به تو می‌گوید کجا. پراکندگی به تو می‌گوید چقدر می‌توانی به آن اعتماد کنی.</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: '<p>Two datasets can share an identical mean and describe completely different worlds. Spread is what separates them.</p>',
            ar: '<p>يمكن لمجموعتي بيانات أن تتشاركا المتوسط نفسه تمامًا وتصفا عالمين مختلفين تمامًا. التشتت هو ما يفرّق بينهما.</p>',
            fa: '<p>دو مجموعه داده می‌توانند میانگینی کاملاً یکسان داشته باشند اما دو دنیای کاملاً متفاوت را توصیف کنند.</p>',
          },
        },
        {
          type: 'box',
          variant: 'analogy',
          label: { en: 'Analogy', ar: 'تشبيه', fa: 'قیاس' },
          html: {
            en: '<p><strong>Range</strong> is a race: the gap between the fastest and the slowest runner. It\'s easy to grasp but fragile — one exhausted straggler changes it entirely. <strong>Standard deviation</strong> is better: it asks how far the <em>typical</em> runner finishes from the average finishing time.</p>',
            ar: '<p><strong>المدى</strong> هو سباق: الفجوة بين أسرع عدّاء وأبطأه. <strong>الانحراف المعياري</strong> أفضل: يسأل كم يبعد العدّاء <em>النموذجي</em> عن متوسط وقت الإنهاء.</p>',
            fa: '<p><strong>دامنه</strong> یک مسابقه است: فاصله بین سریع‌ترین و کندترین دونده. <strong>انحراف معیار</strong> بهتر است: می‌پرسد دونده <em>معمولی</em> چقدر از میانگین زمان پایان فاصله دارد.</p>',
          },
        },
        {
          type: 'formula',
          eq: 'low SD = clustered · high SD = scattered',
          note: {
            en: 'Standard deviation is the average distance from the mean.',
            ar: 'الانحراف المعياري هو متوسط المسافة عن المتوسط الحسابي.',
            fa: 'انحراف معیار میانگین فاصله از میانگین حسابی است.',
          },
        },
        {
          type: 'box',
          variant: 'example',
          label: { en: 'Worked example', ar: 'مثال تطبيقي', fa: 'مثال حل‌شده' },
          html: {
            en: '<p>Two cafés both average 100 customers a day. Café A ranges 95–105 (low SD). Café B ranges 20–300 (high SD).</p><p>Same mean, totally different businesses. Café A can staff confidently and order stock to a schedule. Café B will be overstaffed on dead days and turning people away on busy ones. If you only had the mean, you\'d advise them identically — and ruin one of them.</p>',
            ar: '<p>مقهيان يبلغ متوسط عدد زبائنهما ١٠٠ يوميًا. المقهى أ يتراوح بين ٩٥–١٠٥. المقهى ب يتراوح بين ٢٠–٣٠٠.</p><p>نفس المتوسط، لكنهما تجارتان مختلفتان تمامًا.</p>',
            fa: '<p>دو کافه هر دو به‌طور میانگین ۱۰۰ مشتری روزانه دارند. کافه A بین ۹۵ تا ۱۰۵ نوسان دارد. کافه B بین ۲۰ تا ۳۰۰ نوسان دارد.</p><p>میانگین یکسان، اما دو کسب‌وکار کاملاً متفاوت.</p>',
          },
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 4', ar: 'الرسم ٤', fa: 'نمودار ۴' },
          title: { en: 'Same mean, different spread', ar: 'نفس المتوسط، تشتت مختلف', fa: 'میانگین یکسان، پراکندگی متفاوت' },
          src: '/figures/ba1-recap/diagram-04.svg',
          alt: 'Two distributions with the same mean but different spread',
          caption: {
            en: 'Two cafés, the same daily average, completely different businesses to run.',
            ar: 'مقهيان، بنفس المتوسط اليومي، وتجارتان مختلفتان تمامًا في الإدارة.',
            fa: 'دو کافه، با میانگین روزانه یکسان، اما دو کسب‌وکار کاملاً متفاوت برای اداره‌کردن.',
          },
        },
        {
          type: 'box',
          variant: 'mistake',
          label: { en: 'Common mistake', ar: 'خطأ شائع', fa: 'اشتباه رایج' },
          html: {
            en: '<p>Reporting an average with no measure of spread beside it. It\'s half a finding. Any average presented alone should make you suspicious — of other people\'s work, and of your own.</p>',
            ar: '<p>عرض متوسط دون أي مقياس للتشتت بجانبه. إنها نصف نتيجة فقط.</p>',
            fa: '<p>گزارش‌کردن یک میانگین بدون هیچ معیار پراکندگی کنارش. این فقط نیمی از یک یافته است.</p>',
          },
        },
        { type: 'exercise', questionId: 'w-recap-q006' },
      ],
    },
    {
      id: 'charts',
      navLabel: { en: 'Choosing the right chart', ar: 'اختيار الرسم البياني المناسب', fa: 'انتخاب نمودار مناسب' },
      sectionLabel: { en: 'Section 07', ar: 'القسم ٠٧', fa: 'بخش ۰۷' },
      headingHtml: {
        en: '<h2>Choosing the right chart</h2><p class="standfirst">Pick the chart from the question you\'re answering, never from what looks nice.</p>',
        ar: '<h2>اختيار الرسم البياني المناسب</h2><p class="standfirst">اختر الرسم البياني بناءً على السؤال الذي تجيب عنه، لا بناءً على شكله الجميل.</p>',
        fa: '<h2>انتخاب نمودار مناسب</h2><p class="standfirst">نمودار را بر اساس پرسشی که به آن پاسخ می‌دهی انتخاب کن، نه بر اساس زیبایی ظاهری‌اش.</p>',
      },
      blocks: [
        {
          type: 'table',
          headers: [
            { en: 'Your question', ar: 'سؤالك', fa: 'پرسش تو' },
            { en: 'Chart', ar: 'الرسم البياني', fa: 'نمودار' },
            { en: 'Rule', ar: 'القاعدة', fa: 'قاعده' },
          ],
          rows: [
            [{ en: 'Which is bigger?', ar: 'أيهما أكبر؟', fa: 'کدام بزرگ‌تر است؟' }, { en: 'Bar / column', ar: 'أعمدة / أعمدة رأسية', fa: 'میله‌ای / ستونی' }, { en: 'Sort largest to smallest', ar: 'رتّب من الأكبر إلى الأصغر', fa: 'از بزرگ به کوچک مرتب کن' }],
            [{ en: 'How is it distributed?', ar: 'كيف يتوزع؟', fa: 'چگونه توزیع شده؟' }, { en: 'Histogram / box plot', ar: 'مدرج تكراري / صندوقي', fa: 'هیستوگرام / جعبه‌ای' }, { en: 'Check for skew', ar: 'تحقق من الالتواء', fa: 'چولگی را بررسی کن' }],
            [{ en: 'What are the parts?', ar: 'ما هي الأجزاء؟', fa: 'اجزا چه هستند؟' }, { en: 'Pie / treemap', ar: 'دائري / خريطة شجرية', fa: 'دایره‌ای / نقشه درختی' }, { en: 'Never more than 5 slices', ar: 'لا تتجاوز ٥ شرائح أبدًا', fa: 'هرگز بیش از ۵ بخش نباشد' }],
            [{ en: 'How has it changed?', ar: 'كيف تغيّر؟', fa: 'چگونه تغییر کرده؟' }, { en: 'Line / area', ar: 'خطي / مساحي', fa: 'خطی / سطحی' }, { en: 'Time goes on the x-axis', ar: 'الزمن على المحور الأفقي', fa: 'زمان روی محور افقی قرار می‌گیرد' }],
            [{ en: 'Are these related?', ar: 'هل هذه مرتبطة؟', fa: 'آیا این‌ها به هم مرتبط‌اند؟' }, { en: 'Scatter', ar: 'مبعثر', fa: 'پراکنشی' }, { en: 'Tight diagonal = strong link', ar: 'قطر متماسك = رابط قوي', fa: 'قطر فشرده = پیوند قوی' }],
          ],
        },
        {
          type: 'box',
          variant: 'keypoint',
          label: { en: 'The golden rule', ar: 'القاعدة الذهبية', fa: 'قاعده طلایی' },
          html: {
            en: '<p>Start the y-axis at zero on bar charts. A truncated axis doesn\'t visualise the data — it manufactures a story. A 2% difference can be made to look like a landslide, and this is the single most common way charts lie to people who are paying attention.</p>',
            ar: '<p>ابدأ المحور الرأسي من الصفر في الرسوم العمودية. المحور المبتور لا يصوّر البيانات — بل يصنع قصة.</p>',
            fa: '<p>محور عمودی نمودارهای میله‌ای را از صفر شروع کن. محور بریده‌شده داده را به تصویر نمی‌کشد — یک داستان می‌سازد.</p>',
          },
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 5', ar: 'الرسم ٥', fa: 'نمودار ۵' },
          title: { en: 'The same data, honest and dishonest', ar: 'نفس البيانات، بصدق وبتضليل', fa: 'همان داده، صادقانه و ناصادقانه' },
          src: '/figures/ba1-recap/diagram-05.svg',
          alt: 'The same three numbers shown honestly and misleadingly',
          caption: {
            en: '98, 99 and 100 — drawn honestly, then drawn to mislead.',
            ar: '٩٨ و٩٩ و١٠٠ — رُسمت بصدق، ثم رُسمت للتضليل.',
            fa: '۹۸، ۹۹ و ۱۰۰ — یک‌بار صادقانه رسم شده، یک‌بار برای گمراه‌کردن.',
          },
        },
        {
          type: 'box',
          variant: 'mistake',
          label: { en: 'Common mistake', ar: 'خطأ شائع', fa: 'اشتباه رایج' },
          html: {
            en: '<p>The overloaded pie chart. Nine slices in near-identical shades, a legend off to the side, and the reader doing a matching puzzle instead of understanding anything. If you have more than five categories, use a sorted bar chart.</p>',
            ar: '<p>الرسم الدائري المُثقل. تسع شرائح بدرجات لون شبه متطابقة. إن كان لديك أكثر من خمس فئات، استخدم رسمًا عموديًا مرتبًا.</p>',
            fa: '<p>نمودار دایره‌ای شلوغ. نه بخش با رنگ‌هایی تقریباً یکسان. اگر بیش از پنج دسته داری، از یک نمودار میله‌ای مرتب‌شده استفاده کن.</p>',
          },
        },
        { type: 'exercise', questionId: 'w-recap-q007' },
      ],
    },
    {
      id: 'story',
      navLabel: { en: 'Telling the story', ar: 'سرد القصة', fa: 'روایت داستان' },
      sectionLabel: { en: 'Section 08', ar: 'القسم ٠٨', fa: 'بخش ۰۸' },
      headingHtml: {
        en: '<h2>Telling the story</h2><p class="standfirst">The analysis isn\'t finished until somebody understands it.</p>',
        ar: '<h2>سرد القصة</h2><p class="standfirst">التحليل لا يكتمل حتى يفهمه أحدهم.</p>',
        fa: '<h2>روایت داستان</h2><p class="standfirst">تحلیل تا وقتی کسی آن را نفهمد، تمام نشده است.</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: '<ol><li><strong>Context</strong> — What situation are we in? Why are we looking at this at all?</li><li><strong>Evidence</strong> — What does the data show? One chart, one message.</li><li><strong>Conclusion</strong> — What should we do now? Be specific enough to argue with.</li></ol>',
            ar: '<ol><li><strong>السياق</strong> — في أي موقف نحن؟ ولماذا ننظر إلى هذا أصلاً؟</li><li><strong>الدليل</strong> — ماذا تُظهر البيانات؟ رسم بياني واحد، رسالة واحدة.</li><li><strong>الاستنتاج</strong> — ماذا ينبغي أن نفعل الآن؟</li></ol>',
            fa: '<ol><li><strong>زمینه</strong> — در چه موقعیتی هستیم؟ اصلاً چرا داریم به این نگاه می‌کنیم؟</li><li><strong>شواهد</strong> — داده چه چیزی نشان می‌دهد؟ یک نمودار، یک پیام.</li><li><strong>نتیجه‌گیری</strong> — الان باید چه کار کنیم؟</li></ol>',
          },
        },
        {
          type: 'box',
          variant: 'example',
          label: { en: 'Worked example', ar: 'مثال تطبيقي', fa: 'مثال حل‌شده' },
          html: {
            en: '<p><strong>Weak:</strong> "Here\'s a dashboard of Q3 churn by segment."</p><p><strong>Strong:</strong> "We\'re losing customers faster than we\'re winning them <em>(context)</em>. Almost all of it is first-month users on the basic plan <em>(evidence)</em>. I\'d move onboarding support to week one and re-measure in six weeks <em>(conclusion)</em>."</p><p>Same data. Only the second one can be acted on — or challenged, which is just as valuable.</p>',
            ar: '<p><strong>ضعيف:</strong> "إليك لوحة معلومات عن معدل تسرب العملاء في الربع الثالث."</p><p><strong>قوي:</strong> "نخسر عملاء أسرع مما نكسب <em>(السياق)</em>. معظم ذلك من مستخدمي الشهر الأول على الباقة الأساسية <em>(الدليل)</em>. أقترح نقل دعم التأهيل إلى الأسبوع الأول <em>(الاستنتاج)</em>."</p>',
            fa: '<p><strong>ضعیف:</strong> «این یک داشبورد از نرخ ریزش سه‌ماهه سوم است.»</p><p><strong>قوی:</strong> «داریم مشتریان را سریع‌تر از آنکه جذب کنیم از دست می‌دهیم <em>(زمینه)</em>. تقریباً همه آن مربوط به کاربران ماه اول در طرح پایه است <em>(شواهد)</em>. پیشنهاد می‌کنم پشتیبانی آشناسازی را به هفته اول منتقل کنیم <em>(نتیجه‌گیری)</em>.»</p>',
          },
        },
        {
          type: 'box',
          variant: 'mistake',
          label: { en: 'Common mistake', ar: 'خطأ شائع', fa: 'اشتباه رایج' },
          html: {
            en: "<p>Presenting everything you found because it took effort to find. Your audience doesn't need to see the work — they need the decision. Keep the rest for the appendix and for the questions.</p>",
            ar: '<p>عرض كل ما وجدته لأنه كلّفك جهدًا. جمهورك لا يحتاج لرؤية العمل — بل يحتاج القرار.</p>',
            fa: '<p>ارائه هر چیزی که پیدا کرده‌ای چون برایش زحمت کشیده‌ای. مخاطب تو نیازی به دیدن روند کار ندارد — او به تصمیم نیاز دارد.</p>',
          },
        },
        { type: 'exercise', questionId: 'w-recap-q008' },
      ],
    },
    {
      id: 'systems',
      navLabel: { en: 'Systems thinking', ar: 'التفكير المنظومي', fa: 'تفکر سیستمی' },
      sectionLabel: { en: 'Section 09', ar: 'القسم ٠٩', fa: 'بخش ۰۹' },
      headingHtml: {
        en: '<h2>Systems thinking</h2><p class="standfirst">Before you measure a process, you have to see it.</p>',
        ar: '<h2>التفكير المنظومي</h2><p class="standfirst">قبل أن تقيس عملية، عليك أن تراها أولاً.</p>',
        fa: '<h2>تفکر سیستمی</h2><p class="standfirst">پیش از آنکه یک فرایند را اندازه بگیری، باید آن را ببینی.</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: '<p>A number never explains itself. "Orders take nine days" only becomes useful once you can see the eleven steps an order passes through and spot which one is sitting idle.</p><p><strong>Process mapping</strong> draws those steps in order. A <strong>swimlane diagram</strong> adds who is responsible for each one — which is usually where the delay is hiding, in the handover between two teams who each think the other has it.</p>',
            ar: '<p>الرقم لا يفسّر نفسه أبدًا. "الطلبات تستغرق تسعة أيام" لا تصبح مفيدة إلا حين ترى الخطوات الإحدى عشرة التي يمر بها الطلب.</p><p><strong>رسم خرائط العمليات</strong> يرسم تلك الخطوات بترتيبها. أما <strong>مخطط المسارات المتوازية</strong> فيضيف من المسؤول عن كل خطوة.</p>',
            fa: '<p>یک عدد هرگز خودش را توضیح نمی‌دهد. «سفارش‌ها نه روز طول می‌کشد» فقط زمانی مفید می‌شود که بتوانی یازده مرحله‌ای را که یک سفارش طی می‌کند ببینی.</p><p><strong>نقشه‌برداری فرایند</strong> آن مراحل را به ترتیب رسم می‌کند. یک <strong>نمودار سویم‌لین</strong> این را هم اضافه می‌کند که هر مرحله مسئولیت چه کسی است.</p>',
          },
        },
        {
          type: 'box',
          variant: 'analogy',
          label: { en: 'Analogy', ar: 'تشبيه', fa: 'قیاس' },
          html: {
            en: "<p>A doctor doesn't treat a fever by cooling the thermometer. The fever is a symptom of a system. Business metrics work the same way: the late delivery number is the thermometer, and the broken handover between warehouse and courier is the infection.</p>",
            ar: '<p>الطبيب لا يعالج الحمى بتبريد الترمومتر. الحمى عرض لمنظومة أكبر. رقم التأخير في التسليم هو الترمومتر، والتسليم المعطل بين المستودع وشركة التوصيل هو العدوى الفعلية.</p>',
            fa: '<p>پزشک تب را با سردکردن دماسنج درمان نمی‌کند. تب علامتی از یک سیستم است. عدد تأخیر در تحویل، دماسنج است، و تحویل خراب بین انبار و پیک، همان عفونت است.</p>',
          },
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 6', ar: 'الرسم ٦', fa: 'نمودار ۶' },
          title: { en: 'A swimlane map with a bottleneck', ar: 'مخطط مسارات متوازية يحتوي عنق زجاجة', fa: 'یک نمودار سویم‌لین با یک گلوگاه' },
          src: '/figures/ba1-recap/diagram-06.svg',
          alt: 'Swimlane map showing a bottleneck at a handover',
          caption: {
            en: "The four-day delay isn't inside any box. It's in the handover between two teams.",
            ar: 'تأخير الأيام الأربعة ليس داخل أي مربع. إنه في التسليم بين فريقين.',
            fa: 'تأخیر چهار روزه داخل هیچ جعبه‌ای نیست. در تحویل بین دو تیم است.',
          },
        },
        { type: 'exercise', questionId: 'w-recap-q009' },
      ],
    },
    {
      id: 'governance',
      navLabel: { en: 'Data governance & ethics', ar: 'حوكمة البيانات والأخلاقيات', fa: 'حاکمیت داده و اخلاق' },
      sectionLabel: { en: 'Section 10', ar: 'القسم ١٠', fa: 'بخش ۱۰' },
      headingHtml: {
        en: '<h2>Data governance &amp; ethics</h2><p class="standfirst">Where the data came from, who\'s allowed to see it, and what you owe the people inside it.</p>',
        ar: '<h2>حوكمة البيانات والأخلاقيات</h2><p class="standfirst">من أين أتت البيانات، ومن يُسمح له برؤيتها، وما تدين به للأشخاص الموجودين داخلها.</p>',
        fa: '<h2>حاکمیت داده و اخلاق</h2><p class="standfirst">داده از کجا آمده، چه کسی اجازه دیدن آن را دارد، و چه چیزی به افرادی که داخل آن هستند مدیونی.</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: '<h3>Single source of truth</h3><p>One agreed number, in one agreed place. Without it, two people bring two different revenue figures to the same meeting and the meeting becomes about the spreadsheets instead of the decision.</p><h3>Internal vs. external data</h3><ul><li><strong>Internal</strong> — your CRM, payroll, sales records. High trust, you control it.</li><li><strong>External</strong> — APIs, public datasets, scraped web data. Adds context, but verify before you lean on it.</li></ul><h3>Protecting people</h3><ul><li><strong>Anonymisation</strong> — identifying details permanently destroyed. Irreversible.</li><li><strong>Pseudonymisation</strong> — identifiers swapped for codes, with a key held separately. Reversible, and therefore still personal data.</li></ul><p>Under GDPR and similar laws, people have the <strong>right to be forgotten</strong> and the <strong>right to portability</strong>. Practically, this means you need to know where every copy of a file lives — including the one you emailed yourself.</p>',
            ar: '<h3>المصدر الوحيد للحقيقة</h3><p>رقم واحد متفق عليه، في مكان واحد متفق عليه.</p><h3>البيانات الداخلية مقابل الخارجية</h3><ul><li><strong>الداخلية</strong> — نظام إدارة علاقات العملاء، الرواتب، سجلات المبيعات.</li><li><strong>الخارجية</strong> — واجهات برمجية، مجموعات بيانات عامة، بيانات مستخرجة من الويب.</li></ul><h3>حماية الأشخاص</h3><ul><li><strong>إخفاء الهوية</strong> — التفاصيل التعريفية تُدمَّر نهائيًا. غير قابل للعكس.</li><li><strong>الاسم المستعار</strong> — تُستبدل المعرّفات برموز. قابل للعكس، وبالتالي يبقى بيانات شخصية.</li></ul><p>بموجب GDPR وقوانين مماثلة، يملك الأشخاص <strong>الحق في النسيان</strong> و<strong>الحق في نقل بياناتهم</strong>.</p>',
            fa: '<h3>منبع واحد حقیقت</h3><p>یک عدد مورد توافق، در یک مکان مورد توافق.</p><h3>داده داخلی در برابر خارجی</h3><ul><li><strong>داخلی</strong> — سیستم مدیریت ارتباط با مشتری، حقوق و دستمزد، سوابق فروش.</li><li><strong>خارجی</strong> — رابط‌های برنامه‌نویسی، مجموعه داده‌های عمومی، داده استخراج‌شده از وب.</li></ul><h3>محافظت از افراد</h3><ul><li><strong>ناشناس‌سازی</strong> — جزئیات شناسایی برای همیشه حذف می‌شود. برگشت‌ناپذیر.</li><li><strong>مستعارسازی</strong> — شناسه‌ها با کدهایی جایگزین می‌شوند. برگشت‌پذیر، و بنابراین همچنان داده شخصی محسوب می‌شود.</li></ul><p>طبق GDPR و قوانین مشابه، افراد <strong>حق فراموش‌شدن</strong> و <strong>حق قابلیت انتقال</strong> دارند.</p>',
          },
        },
        {
          type: 'box',
          variant: 'keypoint',
          label: { en: 'The ethical floor', ar: 'الحد الأخلاقي الأدنى', fa: 'حداقل اخلاقی' },
          html: {
            en: "<p>Being legally permitted to use data isn't the same as it being right to. Ask whether the person whose data it is would be comfortable seeing what you're doing with it. If the honest answer is no, you have a problem no compliance checklist will catch.</p>",
            ar: '<p>أن يكون استخدام البيانات مسموحًا قانونيًا لا يعني أنه صائب. اسأل نفسك: هل سيرتاح الشخص صاحب البيانات لو رأى ما تفعله بها؟</p>',
            fa: '<p>مجاز بودن قانونی استفاده از داده به معنای درست بودن آن نیست. بپرس آیا فردی که داده متعلق به اوست، از دیدن آنچه با داده‌اش انجام می‌دهی راحت خواهد بود.</p>',
          },
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 7', ar: 'الرسم ٧', fa: 'نمودار ۷' },
          title: { en: 'Anonymisation vs. pseudonymisation', ar: 'إخفاء الهوية مقابل الاسم المستعار', fa: 'ناشناس‌سازی در برابر مستعارسازی' },
          src: '/figures/ba1-recap/diagram-07.svg',
          alt: 'Anonymisation removes identity permanently, pseudonymisation is reversible with a key',
          caption: {
            en: 'Anonymised data is out of scope. Pseudonymised data still has a key — so the law still applies.',
            ar: 'البيانات المخفية الهوية خارج نطاق القانون. أما البيانات ذات الاسم المستعار فلا تزال لها مفتاح.',
            fa: 'داده ناشناس‌سازی‌شده خارج از دامنه قانون است. اما داده مستعارسازی‌شده هنوز کلید دارد.',
          },
        },
        { type: 'exercise', questionId: 'w-recap-q010' },
      ],
    },
    {
      id: 'cleaning',
      navLabel: { en: 'Cleaning dirty data', ar: 'تنظيف البيانات غير النظيفة', fa: 'پاک‌سازی داده‌های ناتمیز' },
      sectionLabel: { en: 'Section 11', ar: 'القسم ١١', fa: 'بخش ۱۱' },
      headingHtml: {
        en: '<h2>Cleaning dirty data</h2><p class="standfirst">The unglamorous 80%. Get it wrong and everything downstream is fiction.</p>',
        ar: '<h2>تنظيف البيانات غير النظيفة</h2><p class="standfirst">الـ٨٠٪ غير البرّاقة. أخطئ فيها وكل ما يليها يصبح خيالاً.</p>',
        fa: '<h2>پاک‌سازی داده‌های ناتمیز</h2><p class="standfirst">همان ۸۰٪ بی‌جلوه. اگر آن را اشتباه انجام دهی، هر چیزی که بعدش می‌آید ساختگی است.</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: '<h3>The four faces of dirty data</h3><ul><li><strong>Duplicates</strong> — the same record counted twice, inflating everything.</li><li><strong>Inconsistencies</strong> — "UAE", "U.A.E.", "United Arab Emirates" and "Dubai" splitting one country into four.</li><li><strong>Missing values</strong> — delete the row or estimate the value, but document which you chose.</li><li><strong>Outliers</strong> — investigate before deleting. Some are typos; some are your most important customer.</li></ul>',
            ar: '<h3>الأوجه الأربعة للبيانات غير النظيفة</h3><ul><li><strong>التكرارات</strong> — نفس السجل مُحتسب مرتين.</li><li><strong>التناقضات</strong> — "الإمارات"، "دولة الإمارات" و"دبي" تقسّم دولة واحدة إلى أربع.</li><li><strong>القيم المفقودة</strong> — احذف الصف أو قدّر القيمة، لكن وثّق أيهما اخترت.</li><li><strong>القيم المتطرفة</strong> — تحقق منها قبل حذفها.</li></ul>',
            fa: '<h3>چهار چهره داده ناتمیز</h3><ul><li><strong>تکراری‌ها</strong> — یک رکورد که دو بار شمرده شده.</li><li><strong>ناسازگاری‌ها</strong> — «امارات»، «امارات متحده عربی» و «دبی» یک کشور را به چهار قسمت تقسیم می‌کنند.</li><li><strong>مقادیر گمشده</strong> — سطر را حذف کن یا مقدار را تخمین بزن، اما مستند کن.</li><li><strong>مقادیر پرت</strong> — پیش از حذف، بررسی‌شان کن.</li></ul>',
          },
        },
        {
          type: 'box',
          variant: 'analogy',
          label: { en: 'Analogy', ar: 'تشبيه', fa: 'قیاس' },
          html: {
            en: "<p>Cleaning data is preparing ingredients, not cooking. Nobody praises you for washing the vegetables — but serve a salad with grit in it and that's the only thing anyone remembers about the meal.</p>",
            ar: '<p>تنظيف البيانات هو تحضير المكونات، لا الطهي. لا أحد يمدحك على غسل الخضار — لكن قدّم سلطة فيها حصى وسيكون ذلك الشيء الوحيد الذي سيتذكره الجميع.</p>',
            fa: '<p>پاک‌سازی داده مثل آماده‌کردن مواد اولیه است، نه پختن. هیچ‌کس بابت شستن سبزیجات از تو تعریف نمی‌کند — اما سالادی با شن سرو کن، و همان تنها چیزی خواهد بود که همه به یاد می‌آورند.</p>',
          },
        },
        {
          type: 'html',
          html: {
            en: '<h3>The ETL loop</h3><ol><li><strong>Extract</strong> — Pull from the source — never edit the original file.</li><li><strong>Transform</strong> — Clean, filter and reshape it.</li><li><strong>Load</strong> — Deliver it ready to analyse. Next month, hit refresh.</li></ol><p>The reason to build this as steps in Power Query rather than editing cells by hand: it\'s <strong>repeatable</strong>. Hand-cleaning is work you do again every single month, and slightly differently each time.</p>',
            ar: '<h3>حلقة ETL</h3><ol><li><strong>الاستخراج</strong> — اسحب من المصدر — ولا تعدّل الملف الأصلي أبدًا.</li><li><strong>التحويل</strong> — نظّفها وصفّها وأعد تشكيلها.</li><li><strong>التحميل</strong> — سلّمها جاهزة للتحليل.</li></ol><p>سبب بناء هذا كخطوات في Power Query: أنه <strong>قابل للتكرار</strong>.</p>',
            fa: '<h3>حلقه ETL</h3><ol><li><strong>استخراج</strong> — از منبع بکش — و هرگز فایل اصلی را ویرایش نکن.</li><li><strong>تبدیل</strong> — پاک‌سازی، فیلتر و تغییر شکل آن.</li><li><strong>بارگذاری</strong> — آماده برای تحلیل تحویلش بده.</li></ol><p>دلیل ساختن این کار به‌صورت مراحلی در Power Query: <strong>تکرارپذیر</strong> است.</p>',
          },
        },
        {
          type: 'table',
          headers: [
            { en: 'Tool', ar: 'الأداة', fa: 'ابزار' },
            { en: 'What it does', ar: 'ماذا تفعل', fa: 'چه می‌کند' },
          ],
          rows: [
            [{ en: '<code>TRIM()</code>' }, { en: 'Strips invisible extra spaces', ar: 'تزيل المسافات الزائدة غير المرئية', fa: 'فاصله‌های اضافه نامرئی را حذف می‌کند' }],
            [{ en: '<code>CLEAN()</code>' }, { en: 'Removes non-printable characters', ar: 'تزيل الأحرف غير القابلة للطباعة', fa: 'کاراکترهای غیرقابل‌چاپ را حذف می‌کند' }],
            [{ en: '<code>Ctrl+E</code>' }, { en: 'Flash Fill — learns your pattern', ar: 'التعبئة السريعة — تتعلم نمطك', fa: 'پرکردن سریع — الگوی تو را یاد می‌گیرد' }],
            [{ en: '<code>Ctrl+H</code>' }, { en: 'Find and replace across thousands of rows', ar: 'البحث والاستبدال عبر آلاف الصفوف', fa: 'یافتن و جایگزینی در هزاران سطر' }],
            [{ en: 'Text to Columns', ar: 'تحويل النص إلى أعمدة', fa: 'تبدیل متن به ستون' }, { en: 'Splits one cell into several', ar: 'يقسّم خلية واحدة إلى عدة خلايا', fa: 'یک سلول را به چند سلول تقسیم می‌کند' }],
            [{ en: 'Unpivot', ar: 'إلغاء المحورية', fa: 'واچرخاندن' }, { en: 'Wide table into tall — makes pivot tables work', ar: 'يحوّل جدولاً عريضًا إلى طويل', fa: 'جدول پهن را به بلند تبدیل می‌کند' }],
          ],
        },
        {
          type: 'box',
          variant: 'keypoint',
          label: { en: 'The sum test', ar: 'اختبار المجموع', fa: 'آزمون مجموع' },
          html: {
            en: "<p>Total your key column before cleaning and after. If the number changed in a way you can't explain in one sentence, you didn't clean the data — you broke it. Do this every time.</p>",
            ar: '<p>اجمع عمودك الرئيسي قبل التنظيف وبعده. إن تغيّر الرقم بطريقة لا يمكنك تفسيرها، فأنت لم تنظّف البيانات — بل أفسدتها.</p>',
            fa: '<p>ستون کلیدی‌ات را پیش و پس از پاک‌سازی جمع بزن. اگر عدد به شکلی تغییر کرد که نتوانی توضیحش دهی، داده را پاک‌سازی نکرده‌ای — خرابش کرده‌ای.</p>',
          },
        },
        {
          type: 'box',
          variant: 'mistake',
          label: { en: 'Common mistake', ar: 'خطأ شائع', fa: 'اشتباه رایج' },
          html: {
            en: "<p>Deleting outliers because they're inconvenient. That 480k salary, that one enormous order — they're often the most informative rows in the file. Investigate first. Delete only if you can say why it isn't real.</p>",
            ar: '<p>حذف القيم المتطرفة لأنها مزعجة. تحقق منها أولاً. لا تحذفها إلا إن استطعت أن تشرح لماذا ليست حقيقية.</p>',
            fa: '<p>حذف مقادیر پرت فقط چون مزاحم‌اند. اول بررسی کن. فقط وقتی حذفشان کن که بتوانی بگویی چرا واقعی نیستند.</p>',
          },
        },
        { type: 'exercise', questionId: 'w-recap-q011' },
      ],
    },
    {
      id: 'normal',
      navLabel: { en: 'Probability & the normal curve', ar: 'الاحتمالات والمنحنى الطبيعي', fa: 'احتمال و منحنی نرمال' },
      sectionLabel: { en: 'Section 12', ar: 'القسم ١٢', fa: 'بخش ۱۲' },
      headingHtml: {
        en: '<h2>Probability &amp; the normal curve</h2><p class="standfirst">Why so many things in nature and business pile up in the middle.</p>',
        ar: '<h2>الاحتمالات والمنحنى الطبيعي</h2><p class="standfirst">لماذا يتكدس الكثير من ظواهر الطبيعة والأعمال في المنتصف.</p>',
        fa: '<h2>احتمال و منحنی نرمال</h2><p class="standfirst">چرا بسیاری از پدیده‌های طبیعت و کسب‌وکار در وسط انباشته می‌شوند.</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: '<p>Measure enough of almost anything — heights, delivery times, exam marks — and you get the same shape: a symmetrical hump, most values near the middle, rarer ones trailing off each side.</p>',
            ar: '<p>قِس أي شيء تقريبًا بعدد كافٍ من المرات — الأطوال، أوقات التسليم، درجات الامتحانات — وستحصل على الشكل نفسه: تلة متماثلة.</p>',
            fa: '<p>تقریباً هر چیزی را به‌اندازه کافی اندازه بگیر — قد، زمان تحویل، نمرات امتحان — و همان شکل را می‌بینی: یک برجستگی متقارن.</p>',
          },
        },
        {
          type: 'formula',
          eq: '68 — 95 — 99.7',
          note: {
            en: 'The percentage of data falling within 1, 2 and 3 standard deviations of the mean.',
            ar: 'النسبة المئوية للبيانات الواقعة ضمن ١، ٢ و٣ انحرافات معيارية عن المتوسط.',
            fa: 'درصد داده‌هایی که در فاصله ۱، ۲ و ۳ انحراف معیار از میانگین قرار می‌گیرند.',
          },
        },
        {
          type: 'html',
          html: {
            en: '<p>This is the empirical rule, and it\'s what makes standard deviation genuinely useful rather than just another number. One SD from the mean in either direction covers roughly 68% of everything; two SDs covers about 95%; three covers about 99.7%. Anything beyond three is properly rare.</p>',
            ar: '<p>هذه هي القاعدة التجريبية. انحراف معياري واحد عن المتوسط يغطي نحو ٦٨٪؛ انحرافان يغطيان نحو ٩٥٪؛ وثلاثة تغطي نحو ٩٩٫٧٪.</p>',
            fa: '<p>این همان قاعده تجربی است. یک انحراف معیار از میانگین تقریباً ۶۸٪ همه‌چیز را می‌پوشاند؛ دو انحراف معیار حدود ۹۵٪؛ و سه انحراف معیار حدود ۹۹٫۷٪.</p>',
          },
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 8', ar: 'الرسم ٨', fa: 'نمودار ۸' },
          title: { en: 'The empirical rule', ar: 'القاعدة التجريبية', fa: 'قاعده تجربی' },
          src: '/figures/ba1-recap/diagram-08.svg',
          alt: 'The empirical rule: 68, 95 and 99.7 percent of data within one, two and three standard deviations',
          caption: {
            en: 'Why standard deviation is useful: it converts into a share of the data.',
            ar: 'لماذا الانحراف المعياري مفيد: لأنه يتحول إلى نسبة من البيانات.',
            fa: 'چرا انحراف معیار مفید است: چون به سهمی از داده تبدیل می‌شود.',
          },
        },
        {
          type: 'html',
          html: { en: '<h3>Z-scores</h3>', ar: '<h3>درجات Z</h3>', fa: '<h3>نمرات Z</h3>' },
        },
        {
          type: 'formula',
          eq: 'Z = (x − μ) / σ',
          note: {
            en: 'How many standard deviations a value sits from the mean.',
            ar: 'عدد الانحرافات المعيارية التي تبعدها قيمة ما عن المتوسط.',
            fa: 'اینکه یک مقدار چند انحراف معیار از میانگین فاصله دارد.',
          },
        },
        {
          type: 'box',
          variant: 'analogy',
          label: { en: 'Analogy', ar: 'تشبيه', fa: 'قیاس' },
          html: {
            en: '<p>You already calculate Z-scores instinctively. A shopper sees the price of her usual coffee jump and thinks "that\'s unusually steep" — she\'s comparing the rise both to the normal price <em>and</em> to how much prices usually wobble. That instinct — distance from typical, measured in units of normal variation — is exactly a Z-score.</p>',
            ar: '<p>أنت تحسب درجات Z غريزيًا بالفعل. متسوقة ترى سعر قهوتها المعتادة يرتفع وتفكر "هذا ارتفاع غير معتاد" — تلك الغريزة هي بالضبط درجة Z.</p>',
            fa: '<p>تو از قبل به‌طور غریزی نمرات Z را محاسبه می‌کنی. خریداری قیمت قهوه همیشگی‌اش را می‌بیند که پریده و فکر می‌کند «این افزایش غیرعادی است» — آن غریزه دقیقاً همان نمره Z است.</p>',
          },
        },
        {
          type: 'box',
          variant: 'example',
          label: { en: 'Worked example', ar: 'مثال تطبيقي', fa: 'مثال حل‌شده' },
          html: {
            en: '<p>A test has mean 70, SD 8. You scored 86.</p><p>Z = (86 − 70) / 8 = <strong>2.0</strong></p><p>You\'re two standard deviations above the mean — the empirical rule tells you roughly 95% of people fall within that band, so you\'re in the top ~2.5%. Z-scores let you compare across completely different tests.</p>',
            ar: '<p>اختبار متوسطه ٧٠، وانحرافه المعياري ٨. حصلت على ٨٦.</p><p>Z = (٨٦ − ٧٠) / ٨ = <strong>٢٫٠</strong></p><p>أنت تبعد انحرافين معياريين فوق المتوسط.</p>',
            fa: '<p>یک آزمون میانگین ۷۰ و انحراف معیار ۸ دارد. تو ۸۶ گرفته‌ای.</p><p>Z = (۸۶ − ۷۰) / ۸ = <strong>۲٫۰</strong></p><p>تو دو انحراف معیار بالاتر از میانگین هستی.</p>',
          },
        },
        { type: 'exercise', questionId: 'w-recap-q012' },
      ],
    },
    {
      id: 'sampling',
      navLabel: { en: 'Samples, CLT & confidence', ar: 'العينات ونظرية النهاية المركزية والثقة', fa: 'نمونه‌ها، قضیه حد مرکزی و اطمینان' },
      sectionLabel: { en: 'Section 13', ar: 'القسم ١٣', fa: 'بخش ۱۳' },
      headingHtml: {
        en: "<h2>Samples, CLT &amp; confidence</h2><p class=\"standfirst\">You'll almost never have all the data. Here's why that's survivable.</p>",
        ar: '<h2>العينات ونظرية النهاية المركزية والثقة</h2><p class="standfirst">لن تملك كل البيانات تقريبًا أبدًا. إليك لماذا هذا لا يشكّل عائقًا.</p>',
        fa: '<h2>نمونه‌ها، قضیه حد مرکزی و اطمینان</h2><p class="standfirst">تقریباً هرگز همه داده را نخواهی داشت. اینجا دلیل اینکه چرا این قابل تحمل است آمده.</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: "<p>You can't survey every customer in the country. You survey some, and reason about the rest. The <strong>Central Limit Theorem</strong> is what makes that legitimate: take repeated samples and their averages form a normal distribution around the true value — even when the underlying data is a mess.</p>",
            ar: '<p>لا يمكنك استطلاع رأي كل عميل في البلاد. <strong>نظرية النهاية المركزية</strong> هي ما يجعل ذلك مشروعًا.</p>',
            fa: '<p>نمی‌توانی از هر مشتری در کشور نظرسنجی کنی. <strong>قضیه حد مرکزی</strong> است که این کار را مشروع می‌کند.</p>',
          },
        },
        {
          type: 'box',
          variant: 'analogy',
          label: { en: 'Analogy', ar: 'تشبيه', fa: 'قیاس' },
          html: {
            en: "<p>You don't drink the whole pot of soup to check the seasoning. One spoonful will do — as long as you stirred first. Stirring is random sampling. A spoonful from an unstirred pot tells you about that corner of the pot and nothing else, which is exactly what biased sampling does to your conclusions.</p>",
            ar: '<p>أنت لا تشرب قدر الحساء كاملاً للتحقق من نكهته. ملعقة واحدة كافية — طالما قلّبته أولاً.</p>',
            fa: '<p>برای بررسی چاشنی، کل دیگ سوپ را نمی‌نوشی. یک قاشق کافی است — به شرطی که اول هم زده باشی.</p>',
          },
        },
        {
          type: 'html',
          html: { en: '<h3>Standard deviation vs. standard error</h3>', ar: '<h3>الانحراف المعياري مقابل الخطأ المعياري</h3>', fa: '<h3>انحراف معیار در برابر خطای معیار</h3>' },
        },
        {
          type: 'table',
          headers: [{ en: '' }, { en: 'Measures', ar: 'يقيس', fa: 'می‌سنجد' }, { en: 'With more data', ar: 'مع مزيد من البيانات', fa: 'با داده بیشتر' }],
          rows: [
            [{ en: '<strong>SD</strong>' }, { en: 'Spread of individual values', ar: 'تشتت القيم الفردية', fa: 'پراکندگی مقادیر تکی' }, { en: 'Stays roughly the same', ar: 'يبقى ثابتًا تقريبًا', fa: 'تقریباً ثابت می‌ماند' }],
            [{ en: '<strong>SE</strong>' }, { en: 'Spread of sample means', ar: 'تشتت متوسطات العينات', fa: 'پراکندگی میانگین‌های نمونه' }, { en: 'Shrinks', ar: 'يتقلص', fa: 'کوچک می‌شود' }],
          ],
        },
        {
          type: 'html',
          html: {
            en: '<p>That difference is the whole argument for collecting more data. The world doesn\'t get less variable — your estimate of it gets more precise.</p><h3>Confidence intervals</h3><p>A confidence interval is a range, not a point. "We\'re 95% confident the true average sits between 42 and 48" is an honest finding. "The average is 45" quietly hides how much you don\'t know.</p>',
            ar: '<p>هذا الفرق هو الحجة الكاملة لجمع مزيد من البيانات.</p><h3>فترات الثقة</h3><p>فترة الثقة نطاق، لا نقطة واحدة. "نحن واثقون بنسبة ٩٥٪ من أن المتوسط الحقيقي يقع بين ٤٢ و٤٨" استنتاج صادق.</p>',
            fa: '<p>این تفاوت کل استدلال برای جمع‌آوری داده بیشتر است.</p><h3>بازه‌های اطمینان</h3><p>یک بازه اطمینان یک محدوده است، نه یک نقطه. «ما با ۹۵٪ اطمینان معتقدیم میانگین واقعی بین ۴۲ و ۴۸ قرار دارد» یک یافته صادقانه است.</p>',
          },
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 9', ar: 'الرسم ٩', fa: 'نمودار ۹' },
          title: { en: 'Why sample size narrows the interval', ar: 'لماذا يضيّق حجم العينة الفترة', fa: 'چرا اندازه نمونه بازه را باریک می‌کند' },
          src: '/figures/ba1-recap/diagram-09.svg',
          alt: 'Larger samples narrow the confidence interval around the same true value',
          caption: {
            en: "More data doesn't move your answer. It sharpens how confident you can be in it.",
            ar: 'مزيد من البيانات لا يغيّر إجابتك. بل يزيد دقة ثقتك بها.',
            fa: 'داده بیشتر پاسخ تو را جابه‌جا نمی‌کند. بلکه اطمینان تو نسبت به آن را دقیق‌تر می‌کند.',
          },
        },
        {
          type: 'box',
          variant: 'mistake',
          label: { en: 'Common mistake', ar: 'خطأ شائع', fa: 'اشتباه رایج' },
          html: {
            en: '<p>Assuming a big sample fixes a biased one. If you only survey people who answer the phone at 2pm on a Tuesday, surveying 50,000 of them makes you precisely wrong instead of vaguely wrong. Size never repairs bias — only better sampling does.</p>',
            ar: '<p>افتراض أن العينة الكبيرة تصلح عينة متحيزة. الحجم لا يصلح التحيز أبدًا — فقط أخذ عينة أفضل يفعل ذلك.</p>',
            fa: '<p>فرض‌کردن اینکه نمونه بزرگ، تعصب یک نمونه را برطرف می‌کند. اندازه هرگز تعصب را جبران نمی‌کند — فقط نمونه‌گیری بهتر این کار را می‌کند.</p>',
          },
        },
        { type: 'exercise', questionId: 'w-recap-q013' },
      ],
    },
    {
      id: 'regression',
      navLabel: { en: 'Simple linear regression', ar: 'الانحدار الخطي البسيط', fa: 'رگرسیون خطی ساده' },
      sectionLabel: { en: 'Section 14', ar: 'القسم ١٤', fa: 'بخش ۱۴' },
      headingHtml: {
        en: '<h2>Simple linear regression</h2><p class="standfirst">Drawing the line that best explains the dots.</p>',
        ar: '<h2>الانحدار الخطي البسيط</h2><p class="standfirst">رسم الخط الذي يفسّر النقاط بأفضل شكل ممكن.</p>',
        fa: '<h2>رگرسیون خطی ساده</h2><p class="standfirst">رسم خطی که بهترین توضیح را برای نقاط ارائه می‌دهد.</p>',
      },
      blocks: [
        {
          type: 'formula',
          eq: 'Y = a + bX',
          note: {
            en: 'a = where the line starts. b = how much Y moves per 1 unit of X.',
            ar: 'a = نقطة بداية الخط. b = مقدار تحرك Y مقابل كل وحدة واحدة من X.',
            fa: 'a = نقطه شروع خط. b = مقدار تغییر Y به ازای هر یک واحد از X.',
          },
        },
        {
          type: 'box',
          variant: 'analogy',
          label: { en: 'Analogy', ar: 'تشبيه', fa: 'قیاس' },
          html: {
            en: '<p>Imagine pinning a piece of string across a scatter of dots and sliding it until it sits as close to all of them as possible. Regression does that arithmetically — it finds the one line where the total distance from the dots is as small as it can be. The dots are reality; the line is the pattern underneath.</p>',
            ar: '<p>تخيّل أنك تثبّت خيطًا عبر مجموعة متناثرة من النقاط وتحرّكه حتى يقترب من جميعها قدر الإمكان. الانحدار يفعل ذلك حسابيًا.</p>',
            fa: '<p>تصور کن نخی را روی مجموعه‌ای پراکنده از نقطه‌ها می‌کشی و آن‌قدر جابه‌جایش می‌کنی تا به همه آن‌ها نزدیک شود. رگرسیون این کار را به‌صورت حسابی انجام می‌دهد.</p>',
          },
        },
        {
          type: 'box',
          variant: 'example',
          label: { en: 'Worked example', ar: 'مثال تطبيقي', fa: 'مثال حل‌شده' },
          html: {
            en: '<p>A café models daily revenue against advertising spend and gets:</p><p><code>Revenue = 400 + 3.2 × (ad spend)</code></p><p>Read it as: with zero advertising the café still takes about 400 a day (<strong>a</strong>), and every extra 1 spent on ads is associated with about 3.20 more revenue (<strong>b</strong>). That\'s a claim the owner can test — and argue with.</p>',
            ar: '<p>مقهى يبني نموذجًا للإيراد اليومي مقابل الإنفاق الإعلاني:</p><p><code>الإيراد = 400 + 3.2 × (الإنفاق الإعلاني)</code></p><p>بدون أي إعلان، يحقق المقهى نحو ٤٠٠ يوميًا (<strong>a</strong>)، وكل وحدة إضافية تُنفق على الإعلان ترتبط بنحو ٣٫٢٠ إيراد إضافي (<strong>b</strong>).</p>',
            fa: '<p>یک کافه درآمد روزانه را در برابر هزینه تبلیغات مدل می‌کند:</p><p><code>درآمد = ۴۰۰ + ۳٫۲ × (هزینه تبلیغات)</code></p><p>بدون هیچ تبلیغی، کافه همچنان حدود ۴۰۰ در روز به دست می‌آورد (<strong>a</strong>)، و هر واحد اضافه هزینه تبلیغات با حدود ۳٫۲۰ درآمد بیشتر همراه است (<strong>b</strong>).</p>',
          },
        },
        {
          type: 'html',
          html: { en: '<h3>Judging the model</h3>', ar: '<h3>الحكم على النموذج</h3>', fa: '<h3>قضاوت درباره مدل</h3>' },
        },
        {
          type: 'table',
          headers: [
            { en: 'Metric', ar: 'المقياس', fa: 'معیار' },
            { en: 'Means', ar: 'يعني', fa: 'یعنی' },
            { en: 'Rule of thumb', ar: 'قاعدة عملية', fa: 'قاعده سرانگشتی' },
          ],
          rows: [
            [{ en: '<strong>R²</strong>' }, { en: 'Share of variation in Y explained by X', ar: 'حصة التباين في Y الذي يفسّره X', fa: 'سهمی از تغییرات Y که توسط X توضیح داده می‌شود' }, { en: 'Closer to 1 is a tighter fit', ar: 'الأقرب إلى ١ يعني ملاءمة أدق', fa: 'نزدیک‌تر به ۱ یعنی برازش دقیق‌تر' }],
            [{ en: '<strong>p-value</strong>' }, { en: 'Could this be coincidence?', ar: 'هل يمكن أن تكون هذه صدفة؟', fa: 'آیا این می‌تواند تصادفی باشد؟' }, { en: 'Below 0.05 = significant', ar: 'أقل من ٠٫٠٥ = معنوي', fa: 'زیر ۰٫۰۵ = معنادار' }],
            [{ en: '<strong>Residual</strong>' }, { en: 'Actual minus predicted', ar: 'القيمة الفعلية ناقص المتوقعة', fa: 'مقدار واقعی منهای پیش‌بینی‌شده' }, { en: 'Should look like random scatter', ar: 'ينبغي أن يبدو تشتتًا عشوائيًا', fa: 'باید شبیه پراکندگی تصادفی باشد' }],
          ],
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 10', ar: 'الرسم ١٠', fa: 'نمودار ۱۰' },
          title: { en: 'The line of best fit and its residuals', ar: 'خط الملاءمة الأفضل وبواقيه', fa: 'خط بهترین برازش و باقیمانده‌های آن' },
          src: '/figures/ba1-recap/diagram-10.svg',
          alt: 'Line of best fit with residual distances marked',
          caption: {
            en: 'Regression finds the line where the total residual distance is as small as possible.',
            ar: 'الانحدار يجد الخط الذي يكون فيه إجمالي مسافة البواقي أصغر ما يمكن.',
            fa: 'رگرسیون خطی را می‌یابد که مجموع فاصله باقیمانده‌ها در آن تا حد ممکن کوچک باشد.',
          },
        },
        {
          type: 'box',
          variant: 'mistake',
          label: { en: 'Common mistake', ar: 'خطأ شائع', fa: 'اشتباه رایج' },
          html: {
            en: '<p>Treating the slope as proof of cause. Ice cream sales predict drowning deaths beautifully, and neither causes the other — summer causes both. Regression finds the relationship. Only you can argue for the mechanism.</p>',
            ar: '<p>معاملة الميل كإثبات للسببية. مبيعات الآيس كريم تتنبأ بحالات الغرق، ولا شيء منهما يسبب الآخر — بل الصيف يسبب كليهما.</p>',
            fa: '<p>برخورد با شیب به‌عنوان اثبات علیت. فروش بستنی غرق‌شدگی را پیش‌بینی می‌کند، و هیچ‌کدام باعث دیگری نیست — تابستان باعث هر دو است.</p>',
          },
        },
        {
          type: 'box',
          variant: 'mistake',
          label: { en: 'Common mistake', ar: 'خطأ شائع', fa: 'اشتباه رایج' },
          html: {
            en: "<p><strong>Extrapolation.</strong> Your model was built on ad spends of 50–500. It says nothing trustworthy about spending 50,000. The line keeps going on the chart; reality doesn't have to follow it.</p>",
            ar: '<p><strong>الاستقراء خارج النطاق.</strong> نموذجك بُني على إنفاق إعلاني بين ٥٠ و٥٠٠. لا يخبرك بشيء موثوق عن إنفاق ٥٠٬٠٠٠.</p>',
            fa: '<p><strong>برون‌یابی.</strong> مدل تو بر اساس هزینه‌های تبلیغاتی ۵۰ تا ۵۰۰ ساخته شده. درباره خرج‌کردن ۵۰٬۰۰۰ هیچ چیز قابل‌اعتمادی نمی‌گوید.</p>',
          },
        },
        { type: 'exercise', questionId: 'w-recap-q014' },
      ],
    },
    {
      id: 'multiple',
      navLabel: { en: 'Multiple regression', ar: 'الانحدار المتعدد', fa: 'رگرسیون چندگانه' },
      sectionLabel: { en: 'Section 15', ar: 'القسم ١٥', fa: 'بخش ۱۵' },
      headingHtml: {
        en: '<h2>Multiple regression</h2><p class="standfirst">Reality has more than one cause. So should your model.</p>',
        ar: '<h2>الانحدار المتعدد</h2><p class="standfirst">للواقع أكثر من سبب واحد. ينبغي أن يكون الأمر كذلك في نموذجك أيضًا.</p>',
        fa: '<h2>رگرسیون چندگانه</h2><p class="standfirst">واقعیت بیش از یک علت دارد. مدل تو هم باید همین‌طور باشد.</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: '<p>Revenue isn\'t driven by advertising alone — there\'s season, pricing, weather, competitors. Multiple regression takes several inputs at once and isolates each one\'s contribution <strong>holding the others constant</strong>.</p><p>That phrase — <em>ceteris paribus</em> — is how you read every coefficient. "Each extra 1 of ad spend adds 3.20, <em>assuming price and season don\'t change</em>."</p>',
            ar: '<p>الإيراد لا يتحرك بفعل الإعلان وحده — هناك الموسم والتسعير والطقس والمنافسون.</p><p>تلك العبارة — <em>ceteris paribus</em> — هي طريقة قراءة كل معامل.</p>',
            fa: '<p>درآمد فقط با تبلیغات حرکت نمی‌کند — فصل، قیمت‌گذاری، آب‌وهوا و رقبا هم هستند.</p><p>آن عبارت — <em>ceteris paribus</em> — راه خواندن هر ضریب است.</p>',
          },
        },
        {
          type: 'html',
          html: {
            en: '<h3>What\'s new at this level</h3><ul><li><strong>Adjusted R²</strong> — the honest version. Plain R² always rises when you add a variable, even a useless one. Adjusted R² only rises if the variable actually earned its place.</li><li><strong>Multicollinearity</strong> — two inputs so correlated with each other that the model can\'t tell them apart. Drop one.</li><li><strong>Dummy variables</strong> — turning categories into 0/1 columns so regression can use them.</li><li><strong>F-test</strong> — asks whether the model as a whole beats simply guessing the average.</li></ul>',
            ar: '<h3>الجديد في هذا المستوى</h3><ul><li><strong>R² المعدّل</strong> — النسخة الصادقة.</li><li><strong>التعدد الخطي</strong> — مدخلان مرتبطان لدرجة أن النموذج لا يستطيع التمييز بينهما.</li><li><strong>المتغيرات الوهمية</strong> — تحويل الفئات إلى أعمدة ٠/١.</li><li><strong>اختبار F</strong> — يسأل ما إذا كان النموذج ككل يتفوق على تخمين المتوسط.</li></ul>',
            fa: '<h3>چه چیزی در این سطح تازه است</h3><ul><li><strong>R² تعدیل‌شده</strong> — نسخه صادقانه.</li><li><strong>هم‌خطی چندگانه</strong> — دو ورودی آن‌قدر با هم همبسته‌اند که مدل نمی‌تواند آن‌ها را تشخیص دهد.</li><li><strong>متغیرهای مجازی</strong> — تبدیل دسته‌بندی‌ها به ستون‌های ۰/۱.</li><li><strong>آزمون F</strong> — می‌پرسد آیا کل مدل بهتر از حدس‌زدن میانگین عمل می‌کند.</li></ul>',
          },
        },
        {
          type: 'box',
          variant: 'analogy',
          label: { en: 'Analogy', ar: 'تشبيه', fa: 'قیاس' },
          html: {
            en: "<p>Multicollinearity is two people carrying one sofa through a door. Something's clearly doing the lifting, but you can't credit either one individually. Height and weight in the same model behave like that — keep both and the model gets confused about which deserves the credit.</p>",
            ar: '<p>التعدد الخطي هو شخصان يحملان أريكة واحدة عبر باب. من الواضح أن هناك من يرفع، لكنك لا تستطيع نسب الفضل لأحدهما بمفرده.</p>',
            fa: '<p>هم‌خطی چندگانه مثل دو نفری است که یک مبل را از دری عبور می‌دهند. مشخص است چیزی دارد بلند می‌شود، اما نمی‌توانی این را به‌طور مجزا به یکی از آن‌ها نسبت دهی.</p>',
          },
        },
        {
          type: 'box',
          variant: 'mistake',
          label: { en: 'Common mistake', ar: 'خطأ شائع', fa: 'اشتباه رایج' },
          html: {
            en: '<p><strong>Overfitting.</strong> Add enough variables and your model will explain your historical data almost perfectly — because it has memorised the noise, not learnt the pattern. It will then fail on next month\'s data. A simpler model that performs slightly worse on old data and much better on new data is the better model.</p>',
            ar: '<p><strong>الإفراط في الملاءمة.</strong> أضف متغيرات كافية وسيفسّر نموذجك بياناتك التاريخية بشكل شبه مثالي — لأنه حفظ الضجيج، لا لأنه تعلّم النمط.</p>',
            fa: '<p><strong>بیش‌برازش.</strong> به‌اندازه کافی متغیر اضافه کن و مدل تو داده‌های تاریخی‌ات را تقریباً کامل توضیح می‌دهد — چون نویز را حفظ کرده، نه اینکه الگو را یاد گرفته باشد.</p>',
          },
        },
        { type: 'exercise', questionId: 'w-recap-q015' },
      ],
    },
    {
      id: 'timeseries',
      navLabel: { en: 'Time series & growth', ar: 'السلاسل الزمنية والنمو', fa: 'سری‌های زمانی و رشد' },
      sectionLabel: { en: 'Section 16', ar: 'القسم ١٦', fa: 'بخش ۱۶' },
      headingHtml: {
        en: '<h2>Time series &amp; growth</h2><p class="standfirst">When the order of your data matters, everything changes.</p>',
        ar: '<h2>السلاسل الزمنية والنمو</h2><p class="standfirst">حين يهم ترتيب بياناتك، يتغير كل شيء.</p>',
        fa: '<h2>سری‌های زمانی و رشد</h2><p class="standfirst">وقتی ترتیب داده‌ات اهمیت دارد، همه چیز تغییر می‌کند.</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: "<p>Time series data can't be shuffled — March comes after February, and that sequence carries information. Every series breaks into four components:</p><ul><li><strong>Trend</strong> — the long-term direction, ignoring the wobbles.</li><li><strong>Seasonality</strong> — repeating, calendar-linked patterns. Retail spikes every December.</li><li><strong>Cyclical</strong> — longer economic waves, not tied to the calendar.</li><li><strong>Noise</strong> — the leftover randomness nothing explains.</li></ul>",
            ar: '<p>لا يمكن خلط بيانات السلاسل الزمنية. تنقسم كل سلسلة إلى أربعة مكونات:</p><ul><li><strong>الاتجاه</strong> — الاتجاه طويل المدى.</li><li><strong>الموسمية</strong> — أنماط متكررة مرتبطة بالتقويم.</li><li><strong>الدوري</strong> — موجات اقتصادية أطول.</li><li><strong>الضجيج</strong> — العشوائية المتبقية.</li></ul>',
            fa: '<p>داده‌های سری زمانی را نمی‌توان به هم ریخت. هر سری به چهار مؤلفه تقسیم می‌شود:</p><ul><li><strong>روند</strong> — جهت بلندمدت.</li><li><strong>فصلی‌بودن</strong> — الگوهای تکرارشونده و مرتبط با تقویم.</li><li><strong>دوره‌ای</strong> — موج‌های اقتصادی طولانی‌تر.</li><li><strong>نویز</strong> — تصادفی‌بودنِ باقی‌مانده.</li></ul>',
          },
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 11', ar: 'الرسم ١١', fa: 'نمودار ۱۱' },
          title: { en: 'Decomposing a time series', ar: 'تفكيك سلسلة زمنية', fa: 'تجزیه یک سری زمانی' },
          src: '/figures/ba1-recap/diagram-11.svg',
          alt: 'A time series decomposed into trend, seasonality and noise',
          caption: {
            en: "Any series splits into a direction, a repeating pattern, and what's left over.",
            ar: 'أي سلسلة تنقسم إلى اتجاه، ونمط متكرر، وما يتبقى.',
            fa: 'هر سری به یک جهت، یک الگوی تکرارشونده، و باقی‌مانده تقسیم می‌شود.',
          },
        },
        {
          type: 'box',
          variant: 'mistake',
          label: { en: 'Common mistake', ar: 'خطأ شائع', fa: 'اشتباه رایج' },
          html: {
            en: '<p>Comparing December to November and declaring a collapse. Against seasonal data, always compare like with like — this December against last December. Month-on-month comparisons on seasonal businesses generate panic on a schedule.</p>',
            ar: '<p>مقارنة ديسمبر بنوفمبر وإعلان انهيار. مع البيانات الموسمية، قارن دائمًا المثل بالمثل.</p>',
            fa: '<p>مقایسه دسامبر با نوامبر و اعلام سقوط. در برابر داده فصلی، همیشه مشابه را با مشابه مقایسه کن.</p>',
          },
        },
        {
          type: 'html',
          html: { en: '<h3>Exponential growth</h3>', ar: '<h3>النمو الأسي</h3>', fa: '<h3>رشد نمایی</h3>' },
        },
        {
          type: 'formula',
          eq: '72 ÷ growth rate = years to double',
          note: {
            en: 'The Rule of 72. At 10% a year, something doubles in about 7.2 years.',
            ar: 'قاعدة الـ٧٢. عند نمو ١٠٪ سنويًا، يتضاعف الشيء خلال نحو ٧٫٢ سنوات.',
            fa: 'قاعده ۷۲. با نرخ رشد ۱۰٪ در سال، چیزی طی حدود ۷٫۲ سال دو برابر می‌شود.',
          },
        },
        {
          type: 'box',
          variant: 'analogy',
          label: { en: 'Analogy', ar: 'تشبيه', fa: 'قیاس' },
          html: {
            en: '<p>Fold a piece of paper in half 42 times and it would reach the moon. Nobody\'s intuition accepts that, and that\'s the point: humans reason in straight lines and growth often isn\'t one. This is why a "small" 8% monthly growth rate is enormous, and why compound interest feels like magic.</p>',
            ar: '<p>اطوِ ورقة إلى نصفين ٤٢ مرة وستصل إلى القمر. البشر يفكرون بخطوط مستقيمة، والنمو غالبًا ليس كذلك.</p>',
            fa: '<p>یک برگه کاغذ را ۴۲ بار نصف کن و به کره ماه می‌رسد. انسان‌ها به‌صورت خطی استدلال می‌کنند، و رشد اغلب این‌طور نیست.</p>',
          },
        },
        {
          type: 'html',
          html: {
            en: '<p>A <strong>log transformation</strong> turns an exponential curve into a straight line — which means all your regression tools work on it again. It\'s a change of lens, not of data.</p>',
            ar: '<p><strong>التحويل اللوغاريتمي</strong> يحوّل منحنى أسيًا إلى خط مستقيم.</p>',
            fa: '<p><strong>تبدیل لگاریتمی</strong> یک منحنی نمایی را به یک خط مستقیم تبدیل می‌کند.</p>',
          },
        },
        { type: 'exercise', questionId: 'w-recap-q016' },
      ],
    },
    {
      id: 'optimisation',
      navLabel: { en: 'Optimisation & Solver', ar: 'التحسين وأداة Solver', fa: 'بهینه‌سازی و Solver' },
      sectionLabel: { en: 'Section 17', ar: 'القسم ١٧', fa: 'بخش ۱۷' },
      headingHtml: {
        en: '<h2>Optimisation &amp; Solver</h2><p class="standfirst">The prescriptive level: not what will happen, but what you should do.</p>',
        ar: '<h2>التحسين وأداة Solver</h2><p class="standfirst">المستوى التوجيهي: ليس ما سيحدث، بل ما ينبغي أن تفعله.</p>',
        fa: '<h2>بهینه‌سازی و Solver</h2><p class="standfirst">سطح تجویزی: نه اینکه چه اتفاقی می‌افتد، بلکه اینکه چه باید بکنی.</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: '<p>Linear programming answers "what\'s the best possible choice, given everything that limits me?" Every problem has three parts:</p><ul><li><strong>Objective function</strong> — the single thing you\'re maximising or minimising.</li><li><strong>Decision variables</strong> — the levers you can actually pull.</li><li><strong>Constraints</strong> — the walls: hours, budget, materials, staff.</li></ul>',
            ar: '<p>البرمجة الخطية تجيب عن "ما هو أفضل خيار ممكن، بالنظر إلى كل ما يقيّدني؟" لكل مسألة ثلاثة أجزاء:</p><ul><li><strong>دالة الهدف</strong> — الشيء الوحيد الذي تُعظّمه أو تُقلّله.</li><li><strong>متغيرات القرار</strong> — الروافع التي يمكنك تحريكها فعليًا.</li><li><strong>القيود</strong> — الجدران: الساعات، الميزانية، المواد، الطاقم.</li></ul>',
            fa: '<p>برنامه‌ریزی خطی به این پاسخ می‌دهد: «بهترین انتخاب ممکن چیست؟» هر مسئله سه بخش دارد:</p><ul><li><strong>تابع هدف</strong> — تنها چیزی که بیشینه یا کمینه می‌کنی.</li><li><strong>متغیرهای تصمیم</strong> — اهرم‌هایی که واقعاً می‌توانی بکشی.</li><li><strong>محدودیت‌ها</strong> — دیوارها: ساعات، بودجه، مواد، نیروی انسانی.</li></ul>',
          },
        },
        {
          type: 'box',
          variant: 'analogy',
          label: { en: 'Analogy', ar: 'تشبيه', fa: 'قیاس' },
          html: {
            en: "<p>It's packing a suitcase for a weight limit. The objective is to bring the most useful set of things. The decision variables are what you put in. The constraint is the airline's 23kg. Optimisation is what you're doing when you stand over an open case deciding what earns its place — you're just doing it by feel.</p>",
            ar: '<p>إنه تحضير حقيبة سفر بحدود وزن معينة. الهدف هو إحضار أكثر مجموعة أشياء فائدة. القيد هو حد شركة الطيران البالغ ٢٣ كيلوغرامًا.</p>',
            fa: '<p>این مثل بستن چمدان با محدودیت وزن است. هدف، آوردن مفیدترین مجموعه وسایل است. محدودیت، همان ۲۳ کیلوگرم شرکت هواپیمایی است.</p>',
          },
        },
        {
          type: 'table',
          headers: [
            { en: 'Term', ar: 'المصطلح', fa: 'اصطلاح' },
            { en: 'Meaning', ar: 'المعنى', fa: 'معنی' },
          ],
          rows: [
            [{ en: '<strong>Feasible region</strong>' }, { en: 'Every combination that satisfies all constraints', ar: 'كل تركيبة تحقق جميع القيود', fa: 'هر ترکیبی که همه محدودیت‌ها را برآورده کند' }],
            [{ en: '<strong>Corner point theorem</strong>' }, { en: 'The best answer always sits at a corner of that region', ar: 'الإجابة الأفضل تقع دائمًا عند زاوية تلك المنطقة', fa: 'بهترین پاسخ همیشه روی یکی از گوشه‌های آن منطقه قرار دارد' }],
            [{ en: '<strong>Binding constraint</strong>' }, { en: "The one you've hit — your real bottleneck", ar: 'القيد الذي بلغته — عنقك الزجاجي الحقيقي', fa: 'همان محدودیتی که به آن رسیده‌ای — گلوگاه واقعی تو' }],
            [{ en: '<strong>Shadow price</strong>' }, { en: 'Extra profit from one more unit of a scarce resource', ar: 'الربح الإضافي من وحدة إضافية من مورد نادر', fa: 'سود اضافی حاصل از یک واحد بیشتر از منبعی کمیاب' }],
          ],
        },
        {
          type: 'box',
          variant: 'keypoint',
          label: { en: 'Why shadow price matters', ar: 'لماذا يهم السعر الظلي', fa: 'چرا قیمت سایه اهمیت دارد' },
          html: {
            en: "<p>It tells you where to spend money. If one more hour of machine time is worth 40 and one more hour of staff time is worth 4, you know exactly which to invest in — and you know that buying more of a non-binding resource is money set on fire.</p>",
            ar: '<p>إنه يخبرك أين تنفق المال. إن كانت ساعة إضافية من وقت الآلة تساوي ٤٠ وساعة إضافية من وقت الموظف تساوي ٤، فأنت تعرف بالضبط أين تستثمر.</p>',
            fa: '<p>به تو می‌گوید پول را کجا خرج کنی. اگر یک ساعت اضافه زمان دستگاه ۴۰ ارزش داشته باشد و یک ساعت اضافه زمان نیروی انسانی ۴، دقیقاً می‌دانی کجا سرمایه‌گذاری کنی.</p>',
          },
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 12', ar: 'الرسم ١٢', fa: 'نمودار ۱۲' },
          title: { en: 'The feasible region', ar: 'المنطقة الممكنة', fa: 'منطقه شدنی' },
          src: '/figures/ba1-recap/diagram-12.svg',
          alt: 'The feasible region, with the optimal solution at a corner',
          caption: {
            en: 'Three constraints enclose the feasible region. The optimum sits on a corner of it.',
            ar: 'ثلاثة قيود تحيط بالمنطقة الممكنة. القيمة المثلى تقع عند إحدى زواياها.',
            fa: 'سه محدودیت منطقه شدنی را احاطه می‌کنند. نقطه بهینه روی یکی از گوشه‌های آن قرار دارد.',
          },
        },
        { type: 'exercise', questionId: 'w-recap-q017' },
      ],
    },
    {
      id: 'excel',
      navLabel: { en: 'Excel reference', ar: 'مرجع Excel', fa: 'مرجع اکسل' },
      sectionLabel: { en: 'Section 18', ar: 'القسم ١٨', fa: 'بخش ۱۸' },
      headingHtml: {
        en: '<h2>Excel reference</h2><p class="standfirst">Everything BA1 used, in one place.</p>',
        ar: '<h2>مرجع Excel</h2><p class="standfirst">كل ما استخدمه BA1، في مكان واحد.</p>',
        fa: '<h2>مرجع اکسل</h2><p class="standfirst">هر آنچه BA1 استفاده کرد، در یک مکان.</p>',
      },
      blocks: [
        { type: 'html', html: { en: '<h3>Core functions</h3>', ar: '<h3>الدوال الأساسية</h3>', fa: '<h3>توابع اصلی</h3>' } },
        {
          type: 'table',
          headers: [{ en: '' }, { en: '' }],
          rows: [
            [{ en: '<code>=SUM()</code>' }, { en: 'Totals', ar: 'المجاميع', fa: 'مجموع‌ها' }],
            [{ en: '<code>=AVERAGE()</code>' }, { en: 'Mean — watch for outliers', ar: 'المتوسط — احذر القيم المتطرفة', fa: 'میانگین — مراقب مقادیر پرت باش' }],
            [{ en: '<code>=MEDIAN()</code>' }, { en: 'Middle value, outlier-proof', ar: 'القيمة الوسطى، محصّنة ضد القيم المتطرفة', fa: 'مقدار میانی، مقاوم در برابر مقادیر پرت' }],
            [{ en: '<code>=MODE()</code>' }, { en: 'Most frequent value', ar: 'القيمة الأكثر تكرارًا', fa: 'پرتکرارترین مقدار' }],
            [{ en: '<code>=STDEV()</code>' }, { en: 'Spread of a sample', ar: 'تشتت عينة', fa: 'پراکندگی یک نمونه' }],
            [{ en: '<code>=AVERAGEIF()</code>' }, { en: 'Mean, but only for matching rows', ar: 'المتوسط، لكن فقط للصفوف المطابقة', fa: 'میانگین، اما فقط برای سطرهای مطابق' }],
            [{ en: '<code>=IF()</code>' }, { en: 'Your first decision rule', ar: 'أول قاعدة قرار لديك', fa: 'اولین قاعده تصمیم تو' }],
            [{ en: '<code>=NORM.DIST()</code>' }, { en: 'Value into probability', ar: 'قيمة إلى احتمال', fa: 'تبدیل مقدار به احتمال' }],
            [{ en: '<code>=NORM.INV()</code>' }, { en: 'Probability back into value', ar: 'احتمال إلى قيمة', fa: 'تبدیل احتمال به مقدار' }],
            [{ en: '<code>=FORECAST.LINEAR()</code>' }, { en: 'Predict Y for a new X', ar: 'توقع Y لقيمة X جديدة', fa: 'پیش‌بینی Y برای یک X جدید' }],
          ],
        },
        { type: 'html', html: { en: '<h3>Shortcuts &amp; tools</h3>', ar: '<h3>الاختصارات والأدوات</h3>', fa: '<h3>میان‌برها و ابزارها</h3>' } },
        {
          type: 'table',
          headers: [{ en: '' }, { en: '' }],
          rows: [
            [{ en: '<code>Ctrl + arrows</code>' }, { en: 'Jump to the edge of a data block', ar: 'القفز إلى حافة كتلة البيانات', fa: 'پرش به لبه یک بلوک داده' }],
            [{ en: '<code>Ctrl + Shift + L</code>' }, { en: 'Toggle filters', ar: 'تبديل عوامل التصفية', fa: 'روشن/خاموش‌کردن فیلترها' }],
            [{ en: '<code>Ctrl + E</code>' }, { en: 'Flash Fill', ar: 'التعبئة السريعة', fa: 'پرکردن سریع' }],
            [{ en: '<code>Ctrl + H</code>' }, { en: 'Find and replace', ar: 'البحث والاستبدال', fa: 'یافتن و جایگزینی' }],
            [{ en: 'Analysis ToolPak', ar: 'حزمة أدوات التحليل' }, { en: 'Regression, histograms, descriptive stats', ar: 'الانحدار، المدرجات التكرارية، الإحصاء الوصفي', fa: 'رگرسیون، هیستوگرام، آمار توصیفی' }],
            [{ en: 'Solver' }, { en: 'Linear programming', ar: 'البرمجة الخطية', fa: 'برنامه‌ریزی خطی' }],
            [{ en: 'Slicers', ar: 'أدوات التقطيع' }, { en: 'One-click pivot table filtering', ar: 'تصفية الجداول المحورية بنقرة واحدة', fa: 'فیلترکردن جدول محوری با یک کلیک' }],
            [{ en: 'Sparklines', ar: 'الخطوط الصغيرة' }, { en: 'Tiny in-cell trend charts', ar: 'رسوم اتجاه صغيرة داخل الخلية', fa: 'نمودارهای روند کوچک درون‌سلولی' }],
          ],
        },
        {
          type: 'box',
          variant: 'keypoint',
          label: { en: 'The dollar sign', ar: 'علامة الدولار', fa: 'علامت دلار' },
          html: {
            en: '<p><code>A1</code> shifts when you drag a formula. <code>$A$1</code> stays locked. Half of all broken spreadsheets are a missing dollar sign — when your formula works in the first row and produces nonsense by row 200, this is almost always why.</p>',
            ar: '<p><code>A1</code> تتحرك عند سحب الصيغة. <code>$A$1</code> تبقى ثابتة. نصف كل جداول البيانات المعطلة سببها علامة دولار مفقودة.</p>',
            fa: '<p><code>A1</code> هنگام کشیدن یک فرمول جابه‌جا می‌شود. <code>$A$1</code> ثابت می‌ماند. نیمی از تمام صفحه‌گسترده‌های خراب به‌خاطر یک علامت دلار جاافتاده است.</p>',
          },
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 13', ar: 'الرسم ١٣', fa: 'نمودار ۱۳' },
          title: { en: 'Relative vs. absolute references', ar: 'المراجع النسبية مقابل المطلقة', fa: 'ارجاع نسبی در برابر مطلق' },
          src: '/figures/ba1-recap/diagram-13.svg',
          alt: 'Relative references slide when dragged, absolute references stay locked',
          caption: {
            en: 'The same formula dragged down three rows, with and without the dollar signs.',
            ar: 'نفس الصيغة تُسحب عبر ثلاثة صفوف، مع علامات الدولار وبدونها.',
            fa: 'همان فرمول در سه سطر پایین‌تر کشیده شده، با و بدون علامت‌های دلار.',
          },
        },
      ],
    },
    {
      id: 'glossary',
      navLabel: { en: 'Glossary', ar: 'قائمة المصطلحات', fa: 'واژه‌نامه' },
      sectionLabel: { en: 'Section 19', ar: 'القسم ١٩', fa: 'بخش ۱۹' },
      headingHtml: {
        en: "<h2>Glossary</h2><p class=\"standfirst\">If you can define every term here without looking, you're ready for BA2.</p>",
        ar: '<h2>قائمة المصطلحات</h2><p class="standfirst">إن استطعت تعريف كل مصطلح هنا دون النظر، فأنت جاهز لـ BA2.</p>',
        fa: '<h2>واژه‌نامه</h2><p class="standfirst">اگر بتوانی همه اصطلاحات اینجا را بدون نگاه‌کردن تعریف کنی، برای BA2 آماده‌ای.</p>',
      },
      blocks: [
        {
          type: 'table',
          headers: [{ en: '' }, { en: '' }],
          rows: [
            [{ en: '<strong>KPI</strong>' }, { en: 'A metric tied to a goal, that someone acts on', ar: 'مقياس مرتبط بهدف، يتصرف شخص ما بناءً عليه', fa: 'معیاری گره‌خورده به یک هدف، که کسی بر اساس آن اقدام می‌کند' }],
            [{ en: '<strong>SSOT</strong>' }, { en: 'Single source of truth — one agreed number', ar: 'المصدر الوحيد للحقيقة — رقم واحد متفق عليه', fa: 'منبع واحد حقیقت — یک عدد مورد توافق' }],
            [{ en: '<strong>ETL</strong>' }, { en: 'Extract, transform, load — the prep pipeline', ar: 'استخراج، تحويل، تحميل — مسار التحضير', fa: 'استخراج، تبدیل، بارگذاری — مسیر آماده‌سازی' }],
            [{ en: '<strong>Outlier</strong>' }, { en: "A value far from the rest — investigate, don't assume", ar: 'قيمة بعيدة عن الباقي — تحقق منها، لا تفترض', fa: 'مقداری دور از بقیه — بررسی کن، فرض نکن' }],
            [{ en: '<strong>SD</strong>' }, { en: 'Typical distance of a value from the mean', ar: 'المسافة النموذجية لقيمة ما عن المتوسط', fa: 'فاصله معمول یک مقدار از میانگین' }],
            [{ en: '<strong>SE</strong>' }, { en: 'Spread of sample means; shrinks with more data', ar: 'تشتت متوسطات العينات؛ يتقلص مع مزيد من البيانات', fa: 'پراکندگی میانگین‌های نمونه؛ با داده بیشتر کوچک می‌شود' }],
            [{ en: '<strong>Z-score</strong>' }, { en: 'Distance from the mean, in standard deviations', ar: 'المسافة عن المتوسط، بوحدات الانحراف المعياري', fa: 'فاصله از میانگین، به واحد انحراف معیار' }],
            [{ en: '<strong>CLT</strong>' }, { en: 'Sample means trend normal, whatever the source data', ar: 'متوسطات العينات تميل للتوزيع الطبيعي، أيًا كانت بيانات المصدر', fa: 'میانگین‌های نمونه به سمت نرمال میل می‌کنند، صرف‌نظر از داده منبع' }],
            [{ en: '<strong>Confidence interval</strong>' }, { en: 'An honest range rather than a false point', ar: 'نطاق صادق بدلاً من نقطة زائفة', fa: 'محدوده‌ای صادقانه به‌جای یک نقطه نادرست' }],
            [{ en: '<strong>R²</strong>' }, { en: 'Share of variation your model explains (0–1)', ar: 'حصة التباين التي يفسّرها نموذجك (٠–١)', fa: 'سهمی از تغییرات که مدل تو توضیح می‌دهد (۰ تا ۱)' }],
            [{ en: '<strong>p-value</strong>' }, { en: 'Probability the result is chance; under 0.05 = significant', ar: 'احتمال أن تكون النتيجة صدفة؛ أقل من ٠٫٠٥ = معنوي', fa: 'احتمال تصادفی‌بودن نتیجه؛ زیر ۰٫۰۵ = معنادار' }],
            [{ en: '<strong>Residual</strong>' }, { en: 'Actual minus predicted', ar: 'القيمة الفعلية ناقص المتوقعة', fa: 'مقدار واقعی منهای پیش‌بینی‌شده' }],
            [{ en: '<strong>Multicollinearity</strong>' }, { en: 'Two predictors too alike to separate', ar: 'متنبئان متشابهان جدًا يتعذر الفصل بينهما', fa: 'دو پیش‌بین آن‌قدر شبیه که جداکردنشان ممکن نیست' }],
            [{ en: '<strong>Overfitting</strong>' }, { en: 'Memorising noise; fails on new data', ar: 'حفظ الضجيج؛ يفشل مع بيانات جديدة', fa: 'حفظ‌کردن نویز؛ روی داده جدید شکست می‌خورد' }],
            [{ en: '<strong>Extrapolation</strong>' }, { en: 'Predicting beyond the range you have data for', ar: 'التنبؤ خارج نطاق البيانات المتوفرة', fa: 'پیش‌بینی فراتر از بازه‌ای که داده داری' }],
            [{ en: '<strong>Ceteris paribus</strong>' }, { en: 'All else held constant', ar: 'مع بقاء كل شيء آخر ثابتًا', fa: 'با ثابت‌ماندن همه چیز دیگر' }],
            [{ en: '<strong>Seasonality</strong>' }, { en: 'Repeating, calendar-linked pattern', ar: 'نمط متكرر مرتبط بالتقويم', fa: 'الگوی تکرارشونده و مرتبط با تقویم' }],
            [{ en: '<strong>Feasible region</strong>' }, { en: 'All solutions satisfying every constraint', ar: 'جميع الحلول التي تحقق كل قيد', fa: 'همه راه‌حل‌هایی که هر محدودیت را برآورده می‌کنند' }],
            [{ en: '<strong>Shadow price</strong>' }, { en: 'Value of one more unit of a scarce resource', ar: 'قيمة وحدة إضافية من مورد نادر', fa: 'ارزش یک واحد بیشتر از یک منبع کمیاب' }],
            [{ en: '<strong>Anonymisation</strong>' }, { en: 'Irreversible removal of identifying data', ar: 'إزالة نهائية للبيانات التعريفية', fa: 'حذف برگشت‌ناپذیر داده شناسایی‌کننده' }],
            [{ en: '<strong>Pseudonymisation</strong>' }, { en: 'Reversible with a key — still personal data', ar: 'قابل للعكس بمفتاح — يبقى بيانات شخصية', fa: 'برگشت‌پذیر با یک کلید — همچنان داده شخصی است' }],
          ],
        },
      ],
    },
    {
      id: 'bridge',
      navLabel: { en: 'Where BA2 picks up', ar: 'من أين يبدأ BA2', fa: 'از کجا BA2 ادامه می‌دهد' },
      sectionLabel: { en: 'Section 20', ar: 'القسم ٢٠', fa: 'بخش ۲۰' },
      headingHtml: {
        en: "<h2>Where BA2 picks up</h2><p class=\"standfirst\">You've learnt the rear-view mirror, the microscope and the crystal ball. Here's what's genuinely new.</p>",
        ar: '<h2>من أين يبدأ BA2</h2><p class="standfirst">تعلمت المرآة الخلفية، والمجهر، والكرة البلورية. إليك ما هو جديد فعلاً.</p>',
        fa: '<h2>از کجا BA2 ادامه می‌دهد</h2><p class="standfirst">آینه عقب، میکروسکوپ و گوی بلورین را یاد گرفته‌ای. اینجا آنچه واقعاً تازه است آمده.</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: '<ul><li><strong>SQL</strong> — querying data at the source, beyond what a spreadsheet can hold.</li><li><strong>Classification &amp; machine learning</strong> — predicting categories, not just numbers, and judging whether a model deserves trust.</li><li><strong>Domain analytics</strong> — marketing, people, operations and finance, each with its own questions.</li><li><strong>Forecasting 2.0</strong> — past Excel\'s forecast sheet, into AI-assisted methods.</li></ul><blockquote>You\'re not starting over. You\'re adding a second engine to a car you already know how to drive.<cite>Welcome to BA2</cite></blockquote>',
            ar: '<ul><li><strong>SQL</strong> — استعلام البيانات من المصدر، بما يتجاوز ما يستطيع جدول بيانات احتواءه.</li><li><strong>التصنيف والتعلم الآلي</strong> — التنبؤ بفئات، لا أرقامًا فقط.</li><li><strong>تحليلات المجالات</strong> — التسويق، الموارد البشرية، العمليات والمالية.</li><li><strong>التنبؤ 2.0</strong> — تجاوز ورقة التنبؤ في Excel.</li></ul><blockquote>أنت لا تبدأ من الصفر. أنت تضيف محركًا ثانيًا لسيارة تعرف بالفعل كيف تقودها.<cite>مرحبًا بك في BA2</cite></blockquote>',
            fa: '<ul><li><strong>SQL</strong> — پرس‌وجوی داده در منبع، فراتر از آنچه یک صفحه‌گسترده می‌تواند نگه دارد.</li><li><strong>طبقه‌بندی و یادگیری ماشین</strong> — پیش‌بینی دسته‌ها، نه فقط اعداد.</li><li><strong>تحلیل حوزه‌ای</strong> — بازاریابی، منابع انسانی، عملیات و مالی.</li><li><strong>پیش‌بینی ۲.۰</strong> — فراتر از برگه پیش‌بینی اکسل.</li></ul><blockquote>تو از صفر شروع نمی‌کنی. داری یک موتور دوم به ماشینی اضافه می‌کنی که از قبل بلد بودی برانی.<cite>به BA2 خوش آمدی</cite></blockquote>',
          },
        },
        {
          type: 'box',
          variant: 'keypoint',
          label: { en: "One rule doesn't change", ar: 'قاعدة واحدة لا تتغير', fa: 'یک قاعده تغییر نمی‌کند' },
          html: {
            en: "<p>Every AI tool in BA2 speeds up <strong>Process</strong>. None of them replaces your judgement on <strong>Explain</strong> and <strong>Decide</strong>. If you can't explain why the AI's answer is right, you haven't finished — you've just got an answer you can't defend in a meeting.</p>",
            ar: '<p>كل أداة ذكاء اصطناعي في BA2 تسرّع <strong>المعالجة</strong>. ولا واحدة منها تحل محل حُكمك في <strong>الشرح</strong> و<strong>القرار</strong>.</p>',
            fa: '<p>هر ابزار هوش مصنوعی در BA2، <strong>پردازش</strong> را سریع‌تر می‌کند. هیچ‌کدام جای قضاوت تو در <strong>تبیین</strong> و <strong>تصمیم</strong> را نمی‌گیرد.</p>',
          },
        },
      ],
    },
    {
      id: 'panic',
      navLabel: { en: 'The panic sheet', ar: 'ورقة الطوارئ', fa: 'برگه اضطراری' },
      sectionLabel: { en: 'Section 21', ar: 'القسم ٢١', fa: 'بخش ۲۱' },
      headingHtml: {
        en: '<h2>The panic sheet</h2><p class="standfirst">One screen. Screenshot it.</p>',
        ar: '<h2>ورقة الطوارئ</h2><p class="standfirst">شاشة واحدة. التقط لها صورة.</p>',
        fa: '<h2>برگه اضطراری</h2><p class="standfirst">یک صفحه. از آن اسکرین‌شات بگیر.</p>',
      },
      blocks: [
        { type: 'html', html: { en: '<h3>Formulas</h3>', ar: '<h3>الصيغ</h3>', fa: '<h3>فرمول‌ها</h3>' } },
        {
          type: 'table',
          headers: [{ en: '' }, { en: '' }],
          rows: [
            [{ en: '<strong>Z-score</strong>' }, { en: '(x − μ) ÷ σ' }],
            [{ en: '<strong>Empirical rule</strong>' }, { en: '68 / 95 / 99.7 at 1 / 2 / 3 SD', ar: '٦٨ / ٩٥ / ٩٩٫٧ عند ١ / ٢ / ٣ انحراف معياري', fa: '۶۸ / ۹۵ / ۹۹٫۷ در ۱ / ۲ / ۳ انحراف معیار' }],
            [{ en: '<strong>Regression</strong>' }, { en: 'Y = a + bX' }],
            [{ en: '<strong>Residual</strong>' }, { en: 'actual − predicted', ar: 'الفعلي − المتوقع', fa: 'واقعی − پیش‌بینی‌شده' }],
            [{ en: '<strong>Rule of 72</strong>' }, { en: '72 ÷ growth% = years to double', ar: '٧٢ ÷ نسبة النمو% = سنوات التضاعف', fa: '۷۲ ÷ درصد رشد = سال‌های دوبرابرشدن' }],
            [{ en: '<strong>Significant</strong>' }, { en: 'p < 0.05' }],
          ],
        },
        { type: 'html', html: { en: '<h3>Excel</h3>', ar: '<h3>Excel</h3>', fa: '<h3>اکسل</h3>' } },
        {
          type: 'table',
          headers: [{ en: '' }, { en: '' }],
          rows: [
            [{ en: '<code>=AVERAGE</code> <code>=MEDIAN</code>' }, { en: 'centre', ar: 'المركز', fa: 'مرکز' }],
            [{ en: '<code>=STDEV</code>' }, { en: 'spread', ar: 'التشتت', fa: 'پراکندگی' }],
            [{ en: '<code>=FORECAST.LINEAR</code>' }, { en: 'predict', ar: 'التنبؤ', fa: 'پیش‌بینی' }],
            [{ en: '<code>$A$1</code>' }, { en: 'lock a reference', ar: 'تثبيت مرجع', fa: 'قفل‌کردن یک ارجاع' }],
            [{ en: '<code>Ctrl+E</code> / <code>Ctrl+H</code>' }, { en: 'flash fill / replace', ar: 'تعبئة سريعة / استبدال', fa: 'پرکردن سریع / جایگزینی' }],
          ],
        },
        {
          type: 'html',
          html: {
            en: '<h3>Before you present</h3><ul><li>Does the y-axis start at zero?</li><li>Did I quote a median alongside the mean?</li><li>Did I give a range, not just a point?</li><li>Am I claiming cause from a correlation?</li><li>Does this end in a decision?</li></ul>',
            ar: '<h3>قبل أن تقدّم عرضك</h3><ul><li>هل يبدأ المحور الرأسي من الصفر؟</li><li>هل ذكرت الوسيط إلى جانب المتوسط؟</li><li>هل قدمت نطاقًا، لا نقطة فقط؟</li><li>هل أدّعي سببية من مجرد ارتباط؟</li><li>هل ينتهي هذا بقرار؟</li></ul>',
            fa: '<h3>پیش از ارائه</h3><ul><li>آیا محور عمودی از صفر شروع می‌شود؟</li><li>آیا میانه را در کنار میانگین ذکر کرده‌ام؟</li><li>آیا یک بازه ارائه دادم، نه فقط یک نقطه؟</li><li>آیا دارم از یک همبستگی، علیت ادعا می‌کنم؟</li><li>آیا این به یک تصمیم ختم می‌شود؟</li></ul>',
          },
        },
      ],
    },
  ],
}
