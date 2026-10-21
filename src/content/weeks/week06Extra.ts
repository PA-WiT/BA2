// Extra material for Week 6 (week-06.ts): the original lesson's figures, plain-words explanations, analogies,
// small worked examples, recaps, extra questions and the diamond practice section. Kept in its own file so
// week-06.ts stays readable; week-06.ts places these blocks.
//
// Figures cropped from the original deck (public/originals/week-06.pdf, rendered at 220 dpi) are the files named
// deck-NN-*.png in public/figures/week-06/. The deck's Direct Marketing and diamond data only exist as links, so
// everything quoted about them comes from the deck's own printed output. Deck mistakes corrected here, on purpose:
//  - Slide 6 says "use regression techniques when Y is categorical": that is classification. Its text is not copied
//    (only the icons are), and the page says classification.
//  - Slide 21's callout says the carat slope is $4,329.86, but the output table printed beside it says 4329.88535,
//    which is $4,329.89. The table is used.
//  - Slide 16's callout says the intercept is -15.31; its table says -15.317825, which rounds to -15.32.
// The toy least-squares example, both stair/flashcard diagrams and every prediction below were computed by script.
// ar/fa are draft translations awaiting native review. Code and formulas stay English.
import type { Block, Localized, Question, Week } from '../types'

const t = (en: string, ar: string, fa: string): Localized => ({ en, ar, fa })
const faDigits = (n: number) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])
const html = (en: string, ar: string, fa: string): Block => ({ type: 'html', html: t(en, ar, fa) })
const box = (variant: 'analogy' | 'mistake' | 'keypoint' | 'example', label: Localized, en: string, ar: string, fa: string): Block => ({
  type: 'box',
  variant,
  label,
  html: t(en, ar, fa),
})
const analogy = (en: string, ar: string, fa: string): Block => box('analogy', t('Analogy', 'تشبيه', 'تشبیه'), en, ar, fa)
const figure = (n: number, title: Localized, src: string, alt: string, caption: Localized): Block => ({
  type: 'diagram',
  fig: t(`Figure ${n}`, `الشكل ${n}`, `شکل ${faDigits(n)}`),
  title,
  src,
  alt,
  caption,
})
const recap = (...items: Localized[]): Block => ({ type: 'takeaways', label: t('In one minute', 'في دقيقة واحدة', 'در یک دقیقه'), items })
const cell = (en: string, ar: string = en, fa: string = en) => t(en, ar, fa)

const fromDeck = (en: string, ar: string, fa: string) => t(`From the original lesson. ${en}`, `من الدرس الأصلي. ${ar}`, `از درس اصلی. ${fa}`)

// ---------- Extra questions (ids continue the sequence; never renumber) ----------
const q = t
export const extraQuestions: Question[] = [
  {
    id: 'w06-q011',
    weekId: 'week-06',
    topic: 'supervised-learning',
    answer: 1,
    prompt: q(
      'Which of these is unsupervised learning?',
      'أي من هذه تعلّم غير موجَّه؟',
      'کدام یک از این‌ها یادگیری بدون نظارت است؟',
    ),
    options: [
      q(
        'Predicting jars from temperature, using past months that include their sales',
        'التنبؤ بالبرطمانات من الحرارة باستخدام أشهر ماضية تتضمن مبيعاتها',
        'پیش‌بینی شیشه‌ها از دما، با استفاده از ماه‌های گذشته که فروششان را دارند',
      ),
      q(
        'Sorting 500 unlabeled customer receipts into groups of similar baskets',
        'فرز 500 إيصال عميل بلا تسميات في مجموعات من السلال المتشابهة',
        'دسته‌بندی ۵۰۰ رسید بدون برچسب مشتری در گروه‌هایی از سبدهای مشابه',
      ),
      q(
        'Predicting whether an email is spam from emails already marked spam or not',
        'التنبؤ بكون الرسالة بريدًا مزعجًا من رسائل عُلّمت مسبقًا كمزعجة أو لا',
        'پیش‌بینی اسپم بودن یک ایمیل از روی ایمیل‌هایی که از قبل اسپم یا غیراسپم علامت خورده‌اند',
      ),
    ],
  },
  {
    id: 'w06-q012',
    weekId: 'week-06',
    topic: 'simple-regression',
    answer: 1,
    prompt: q(
      'On a regression plot, what is the error (ε, or residual) of one month?',
      'في مخطط الانحدار، ما خطأ شهر واحد (ε أو الباقي)؟',
      'در نمودار رگرسیون، خطا (ε یا باقی‌مانده) برای یک ماه چیست؟',
    ),
    options: [
      q('The distance from the dot to the horizontal axis', 'المسافة من النقطة إلى المحور الأفقي', 'فاصلهٔ نقطه تا محور افقی'),
      q('The vertical gap between the dot and the line', 'الفجوة الرأسية بين النقطة والخط', 'فاصلهٔ عمودی میان نقطه و خط'),
      q('The distance between two neighbouring dots', 'المسافة بين نقطتين متجاورتين', 'فاصلهٔ دو نقطهٔ مجاور'),
    ],
  },
  {
    id: 'w06-q013',
    weekId: 'week-06',
    topic: 'reading-output',
    answer: 0,
    prompt: q(
      'In the lesson\'s Direct Marketing model the Salary slope is 0.02196. What does it say about a customer who earns $1,000 more?',
      'في نموذج التسويق المباشر في الدرس يبلغ ميل Salary ‏0.02196. ماذا يقول عن عميل يكسب 1,000 دولار أكثر؟',
      'در مدل بازاریابی مستقیم درس، شیب Salary برابر ۰٫۰۲۱۹۶ است. دربارهٔ مشتری‌ای که ۱٬۰۰۰ دلار بیشتر درآمد دارد چه می‌گوید؟',
    ),
    options: [
      q('He is predicted to spend about $22 more', 'يُتنبأ بأنه سينفق نحو 22 دولارًا أكثر', 'پیش‌بینی می‌شود حدود ۲۲ دلار بیشتر خرج کند'),
      q('He is predicted to spend about 2 cents more', 'يُتنبأ بأنه سينفق نحو سنتين أكثر', 'پیش‌بینی می‌شود حدود ۲ سنت بیشتر خرج کند'),
      q('He will spend 2.2% more', 'سينفق 2.2% أكثر', '۲٫۲٪ بیشتر خرج خواهد کرد'),
    ],
  },
  {
    id: 'w06-q014',
    weekId: 'week-06',
    topic: 'multiple-regression',
    answer: 0,
    prompt: q(
      'Using AmountSpent = −442.76 + 47.7 × Catalogs + 0.0204 × Salary − 198.69 × Children, what is the predicted spending for a customer with a $60,000 salary, 12 catalogs and 2 children?',
      'باستخدام AmountSpent = −442.76 + 47.7 × Catalogs + 0.0204 × Salary − 198.69 × Children، ما الإنفاق المتوقع لعميل راتبه 60,000 دولار و12 كتالوجًا وطفلان؟',
      'با AmountSpent = −442.76 + 47.7 × Catalogs + 0.0204 × Salary − 198.69 × Children، خرج پیش‌بینی‌شده برای مشتری‌ای با حقوق ۶۰٬۰۰۰ دلار، ۱۲ کاتالوگ و ۲ فرزند چقدر است؟',
    ),
    options: [
      q('About $956', 'نحو 956 دولارًا', 'حدود ۹۵۶ دلار'),
      q('About $1,354 (the answer with no children)', 'نحو 1,354 دولارًا (الجواب بلا أطفال)', 'حدود ۱٬۳۵۴ دلار (جواب بدون فرزند)'),
      q('About −$442 (the intercept)', 'نحو ‎−442 دولارًا (المقطع)', 'حدود ‎−۴۴۲ دلار (عرض از مبدأ)'),
    ],
  },
  {
    id: 'w06-q015',
    weekId: 'week-06',
    topic: 'multiple-regression',
    answer: 0,
    prompt: q(
      '"Controlling for salary and children, one more catalog goes with $47.70 more spending." What does "controlling for" mean?',
      '"مع التحكم في الراتب وعدد الأطفال، يقابل كتالوج إضافي 47.70 دولارًا إنفاقًا أكثر." ماذا يعني "مع التحكم في"؟',
      '«با کنترل حقوق و تعداد فرزند، یک کاتالوگ بیشتر با ۴۷٫۷۰ دلار خرج بیشتر همراه است.» «کنترل» یعنی چه؟',
    ),
    options: [
      q(
        'Comparing customers who are the same on salary and children, and differ only in catalogs',
        'مقارنة عملاء متماثلين في الراتب وعدد الأطفال ويختلفون في الكتالوجات فقط',
        'مقایسهٔ مشتری‌هایی که در حقوق و فرزند یکسان‌اند و فقط در کاتالوگ فرق دارند',
      ),
      q('Removing salary and children from the data', 'حذف الراتب وعدد الأطفال من البيانات', 'حذف حقوق و فرزند از داده'),
      q('Making catalogs the only variable in the model', 'جعل الكتالوجات المتغير الوحيد في النموذج', 'کاتالوگ را تنها متغیر مدل کردن'),
    ],
  },
  {
    id: 'w06-q016',
    weekId: 'week-06',
    topic: 'practice-diamonds',
    answer: 1,
    prompt: q(
      'In the lesson\'s diamond model the carat slope is about 4,329.89. What does that mean?',
      'في نموذج الألماس في الدرس يبلغ ميل carat نحو 4,329.89. ماذا يعني ذلك؟',
      'در مدل الماس درس، شیب carat حدود ۴٬۳۲۹٫۸۹ است. این یعنی چه؟',
    ),
    options: [
      q('A diamond costs exactly $4,329.89 per carat', 'يكلّف الألماس 4,329.89 دولارًا للقيراط بالضبط', 'الماس دقیقاً قیراطی ۴٬۳۲۹٫۸۹ دلار قیمت دارد'),
      q(
        'Each extra carat goes with about $4,330 more in price, on average',
        'كل قيراط إضافي يقابله نحو 4,330 دولارًا زيادة في السعر، في المتوسط',
        'هر قیراط بیشتر به‌طور میانگین با حدود ۴٬۳۳۰ دلار قیمت بیشتر همراه است',
      ),
      q('Carat explains 4,329.89% of the price', 'يفسّر carat نسبة 4,329.89% من السعر', 'carat ‏۴٬۳۲۹٫۸۹٪ از قیمت را توضیح می‌دهد'),
    ],
  },
]

// ---------- Section 1: welcome ----------
export const welcomeIntro: Block[] = [
  html(
    '<h3>The whole week in three sentences</h3><ol><li>You have a pile of past months, each with a <strong>temperature</strong> and a number of <strong>jars sold</strong>.</li><li>Regression draws the one straight line that fits that pile best, so you can read it as a rule: "each extra degree goes with about 4 more jars".</li><li>You then use the line to <strong>predict</strong> a month you have not seen yet, and you check how far to trust it.</li></ol>',
    '<h3>الأسبوع كله في ثلاث جمل</h3><ol><li>لديك كومة من الأشهر الماضية، لكل منها <strong>درجة حرارة</strong> وعدد من <strong>البرطمانات المباعة</strong>.</li><li>يرسم الانحدار الخط المستقيم الأنسب لهذه الكومة، فتقرؤه كقاعدة: "كل درجة إضافية تقابلها نحو 4 برطمانات أكثر".</li><li>ثم تستخدم الخط <strong>للتنبؤ</strong> بشهر لم تره بعد، وتتحقق من مدى الوثوق به.</li></ol>',
    '<h3>کل هفته در سه جمله</h3><ol><li>یک دسته ماه گذشته داری که هر کدام یک <strong>دما</strong> و تعدادی <strong>شیشهٔ فروخته‌شده</strong> دارند.</li><li>رگرسیون تنها خط راستی را می‌کشد که از همه بهتر به این دسته می‌خورد، تا بتوانی آن را مثل یک قاعده بخوانی: «هر درجهٔ بیشتر با حدود ۴ شیشهٔ بیشتر همراه است».</li><li>بعد از خط برای <strong>پیش‌بینی</strong> ماهی که هنوز ندیده‌ای استفاده می‌کنی و می‌سنجی تا چه اندازه می‌شود به آن اعتماد کرد.</li></ol>',
  ),
  analogy(
    '<p>Think of an exchange rate at a currency desk. The line says "1 °C buys about 4 jars", plus a small fixed amount at the start. Once you know the rate you can turn any temperature into a number of jars, and the only question left is how reliable the rate is.</p>',
    '<p>فكّر في سعر الصرف عند مكتب الصرافة. يقول الخط "درجة مئوية واحدة تشتري نحو 4 برطمانات"، مع مبلغ ثابت صغير في البداية. وما إن تعرف السعر تستطيع تحويل أي درجة حرارة إلى عدد من البرطمانات، ويبقى السؤال الوحيد: ما مدى الاعتماد على هذا السعر؟</p>',
    '<p>به نرخ تبدیل ارز در یک صرافی فکر کن. خط می‌گوید «۱ درجهٔ سانتی‌گراد حدود ۴ شیشه می‌خرد»، به‌اضافهٔ مقدار ثابت کوچکی در شروع. وقتی نرخ را بدانی می‌توانی هر دما را به تعداد شیشه تبدیل کنی و تنها سؤال باقی‌مانده این است که این نرخ چقدر قابل اتکاست.</p>',
  ),
]

export const welcomeCheat: Block[] = [
  html(
    '<h3>Plain-words cheat sheet</h3><p>These seven words come back all week. Keep this table open; each one is explained again, with a picture, where it first matters.</p>',
    '<h3>جدول مرجعي بكلمات بسيطة</h3><p>تعود هذه الكلمات السبع طوال الأسبوع. أبقِ هذا الجدول مفتوحًا؛ وكل واحدة منها تُشرح مجددًا، بصورة، حيث تهمّ أول مرة.</p>',
    '<h3>جدول مرجع به زبان ساده</h3><p>این هفت واژه در سراسر هفته برمی‌گردند. این جدول را باز نگه دار؛ هر کدام جایی که برای اولین بار مهم می‌شود دوباره با تصویر توضیح داده می‌شود.</p>',
  ),
  {
    type: 'table',
    headers: [t('Word', 'الكلمة', 'واژه'), t('In plain words', 'بكلمات بسيطة', 'به زبان ساده'), t('On the jam stand', 'في كشك المربى', 'در غرفهٔ مربا')],
    rows: [
      [
        t('<strong>Y</strong> (dependent variable)', '<strong>Y</strong> (المتغير التابع)', '<strong>Y</strong> (متغیر وابسته)'),
        t('The thing you want to predict', 'الشيء الذي تريد التنبؤ به', 'چیزی که می‌خواهی پیش‌بینی کنی'),
        t('Jars sold in a month', 'البرطمانات المباعة في الشهر', 'شیشه‌های فروخته‌شده در یک ماه'),
      ],
      [
        t('<strong>X</strong> (independent variable)', '<strong>X</strong> (المتغير المستقل)', '<strong>X</strong> (متغیر مستقل)'),
        t('The thing you predict it from', 'الشيء الذي تتنبأ منه', 'چیزی که از روی آن پیش‌بینی می‌کنی'),
        t('Average temperature of the month', 'متوسط حرارة الشهر', 'میانگین دمای ماه'),
      ],
      [
        t('<strong>Slope</strong> (β₁)', '<strong>الميل</strong> (β₁)', '<strong>شیب</strong> (β₁)'),
        t('How much Y changes when X goes up by 1', 'مقدار تغير Y حين يزيد X بمقدار 1', 'مقدار تغییر Y وقتی X یکی بالا می‌رود'),
        t('+4.09 jars for each extra °C', '‎+4.09 برطمان لكل درجة إضافية', '‎+۴٫۰۹ شیشه برای هر درجهٔ بیشتر'),
      ],
      [
        t('<strong>Intercept</strong> (β₀)', '<strong>المقطع</strong> (β₀)', '<strong>عرض از مبدأ</strong> (β₀)'),
        t('Where the line starts, at X = 0', 'نقطة بداية الخط عند X = 0', 'جایی که خط شروع می‌شود، در X = 0'),
        t('−6.57 jars: just a starting point', '‎−6.57 برطمان: مجرد نقطة بداية', '‎−۶٫۵۷ شیشه: فقط یک نقطهٔ شروع'),
      ],
      [
        t('<strong>Error</strong> (ε, or residual)', '<strong>الخطأ</strong> (ε أو الباقي)', '<strong>خطا</strong> (ε یا باقی‌مانده)'),
        t('Actual minus predicted, one per month', 'الفعلي ناقص المتنبأ به، واحد لكل شهر', 'واقعی منهای پیش‌بینی‌شده، یکی برای هر ماه'),
        t('December: 28 sold, 13.9 predicted, so +14.1', 'ديسمبر: بيع 28، والمتنبأ 13.9، أي ‎+14.1', 'دسامبر: ۲۸ فروش، ۱۳٫۹ پیش‌بینی، یعنی ‎+۱۴٫۱'),
      ],
      [
        t('<strong>R²</strong>', '<strong>R²</strong>', '<strong>R²</strong>'),
        t('How much of the ups and downs of Y the line explains (0 to 1)', 'مقدار تقلبات Y التي يفسّرها الخط (من 0 إلى 1)', 'چقدر از بالا و پایین شدن Y را خط توضیح می‌دهد (از ۰ تا ۱)'),
        t('0.95: about 95%', '0.95: نحو 95%', '۰٫۹۵: حدود ۹۵٪'),
      ],
      [
        t('<strong>Prediction</strong>', '<strong>التنبؤ</strong>', '<strong>پیش‌بینی</strong>'),
        t('Putting a new X into the line', 'وضع X جديد في الخط', 'گذاشتن یک X تازه در خط'),
        t('20 °C gives about 75 jars', '20 درجة تعطي نحو 75 برطمانًا', '۲۰ درجه حدود ۷۵ شیشه می‌دهد'),
      ],
    ],
  },
  recap(
    t('Regression turns a pile of past data into a rule you can use for predictions.', 'يحوّل الانحدار كومة من البيانات الماضية إلى قاعدة تستخدمها في التنبؤ.', 'رگرسیون یک دسته دادهٔ گذشته را به قاعده‌ای برای پیش‌بینی تبدیل می‌کند.'),
    t('Y is what you predict; X is what you predict it from.', 'Y هو ما تتنبأ به؛ وX هو ما تتنبأ منه.', 'Y چیزی است که پیش‌بینی می‌کنی؛ X چیزی است که از روی آن پیش‌بینی می‌کنی.'),
    t('A good line is still only a guide: you always check how far to trust it.', 'الخط الجيد يبقى مجرد دليل: وعليك دائمًا أن تتحقق من مدى الوثوق به.', 'خط خوب هم فقط یک راهنماست: همیشه باید بسنجی تا چه اندازه می‌شود به آن اعتماد کرد.'),
  ),
]

// ---------- Section 2: supervised learning ----------
export const supervisedStart: Block[] = [
  analogy(
    '<p>Two trainees join the stand. <strong>Trainee A</strong> gets last year\'s order sheets with the result written next to every order ("hot week: 108 jars sold") and learns the pattern "warm weeks sell more". That is <strong>supervised</strong> learning: the examples come with the answers. <strong>Trainee B</strong> gets a box of receipts with nothing written on them and is asked to sort them into piles that look alike. That is <strong>unsupervised</strong> learning: no answers, only patterns to find.</p>',
    '<p>ينضم متدرّبان إلى الكشك. <strong>المتدرب A</strong> يتسلّم أوراق طلبات العام الماضي وقد كُتبت النتيجة بجانب كل طلب ("أسبوع حار: بيع 108 برطمانات") ويتعلّم النمط "الأسابيع الدافئة تبيع أكثر". هذا تعلّم <strong>موجَّه</strong>: الأمثلة تأتي مع إجاباتها. أما <strong>المتدرب B</strong> فيتسلّم صندوق إيصالات لا شيء مكتوب عليها ويُطلب منه فرزها في أكوام متشابهة. هذا تعلّم <strong>غير موجَّه</strong>: لا إجابات، بل أنماط عليه أن يكتشفها.</p>',
    '<p>دو کارآموز به غرفه می‌پیوندند. <strong>کارآموز A</strong> برگه‌های سفارش پارسال را می‌گیرد که کنار هر سفارش نتیجه نوشته شده («هفتهٔ گرم: ۱۰۸ شیشه فروش») و الگوی «هفته‌های گرم بیشتر می‌فروشند» را یاد می‌گیرد. این یادگیری <strong>با نظارت</strong> است: نمونه‌ها با جواب می‌آیند. <strong>کارآموز B</strong> جعبه‌ای رسید می‌گیرد که رویش چیزی ننوشته‌اند و از او می‌خواهند آن‌ها را در دسته‌های شبیه هم بچیند. این یادگیری <strong>بدون نظارت</strong> است: جواب نیست، فقط الگو هست که باید پیدا کند.</p>',
  ),
  figure(
    1,
    t('Supervised learning has answers to learn from; unsupervised learning does not', 'التعلّم الموجّه له إجابات يتعلّم منها؛ وغير الموجّه بلا إجابات', 'یادگیری با نظارت جواب دارد که از آن یاد بگیرد؛ یادگیری بدون نظارت ندارد'),
    '/figures/week-06/diagram-03.svg',
    'Two panels. Supervised: three examples with answers (4 degrees gives 16 jars, 14 degrees gives 42, 27 degrees gives 108) feed a learned rule, which predicts about 75 jars for a new month at 20 degrees. Unsupervised: a pile of unlabeled points is sorted by the algorithm into two groups it finds itself.',
    t(
      'The same stand, two ways of learning. Regression is the left-hand kind: past months with the answer (jars) written next to them.',
      'الكشك نفسه، وطريقتان للتعلّم. الانحدار من النوع الأيسر: أشهر ماضية كُتبت الإجابة (البرطمانات) بجانبها.',
      'همان غرفه، دو شیوهٔ یادگیری. رگرسیون از نوع سمت چپ است: ماه‌های گذشته که جواب (شیشه‌ها) کنارشان نوشته شده.',
    ),
  ),
]

export const supervisedEnd: Block[] = [
  figure(
    2,
    t('How supervised learning works, step by step', 'كيف يعمل التعلّم الموجّه، خطوة بخطوة', 'یادگیری با نظارت گام‌به‌گام چطور کار می‌کند'),
    '/figures/week-06/deck-01-paradigm.png',
    'Diagram from the original lesson: a database of paired inputs and outputs feeds a green circle labelled learning algorithm, which produces a purple box labelled model. A new input enters the model from above and an output comes out below.',
    fromDeck(
      'Read it left to right: examples with answers go into the learning algorithm, which builds a model; then you give the model a new input and it returns an output.',
      'اقرأه من اليسار إلى اليمين: تدخل الأمثلة مع إجاباتها في خوارزمية التعلّم التي تبني نموذجًا؛ ثم تعطي النموذج مدخلًا جديدًا فيعيد مخرجًا.',
      'از چپ به راست بخوان: نمونه‌ها با جواب وارد الگوریتم یادگیری می‌شوند که یک مدل می‌سازد؛ بعد به مدل ورودی تازه می‌دهی و خروجی می‌گیرد.',
    ),
  ),
  html(
    '<h3>The five boxes on the jam stand</h3><ol><li><strong>Examples with answers:</strong> 12 months of temperature and jars sold.</li><li><strong>Learning algorithm:</strong> least squares, which finds the best straight line (Section 3).</li><li><strong>Model:</strong> the line itself, <code>jars = −6.57 + 4.09 × temperature</code>.</li><li><strong>New input:</strong> next month\'s forecast, 20 °C.</li><li><strong>Output:</strong> about 75 jars.</li></ol>',
    '<h3>الصناديق الخمسة في كشك المربى</h3><ol><li><strong>أمثلة مع إجاباتها:</strong> 12 شهرًا من الحرارة والبرطمانات المباعة.</li><li><strong>خوارزمية التعلّم:</strong> المربعات الصغرى، التي تجد أفضل خط مستقيم (القسم 3).</li><li><strong>النموذج:</strong> الخط نفسه، <code>jars = −6.57 + 4.09 × temperature</code>.</li><li><strong>مدخل جديد:</strong> توقع الشهر القادم، 20 °م.</li><li><strong>المخرج:</strong> نحو 75 برطمانًا.</li></ol>',
    '<h3>پنج جعبه در غرفهٔ مربا</h3><ol><li><strong>نمونه‌ها با جواب:</strong> ۱۲ ماه دما و شیشهٔ فروخته‌شده.</li><li><strong>الگوریتم یادگیری:</strong> کمترین مربعات که بهترین خط راست را پیدا می‌کند (بخش ۳).</li><li><strong>مدل:</strong> خود خط، <code>jars = −6.57 + 4.09 × temperature</code>.</li><li><strong>ورودی تازه:</strong> پیش‌بینی ماه بعد، ۲۰ درجه.</li><li><strong>خروجی:</strong> حدود ۷۵ شیشه.</li></ol>',
  ),
  figure(
    3,
    t('Regression and classification: the two kinds of supervised learning', 'الانحدار والتصنيف: نوعا التعلّم الموجّه', 'رگرسیون و دسته‌بندی: دو نوع یادگیری با نظارت'),
    '/figures/week-06/deck-02-icons.png',
    'Two icons from the original lesson. Left: dots scattered along an upward red arrow between two axes, the regression icon. Right: yellow circles and red squares separated by a diagonal grey line, the classification icon.',
    fromDeck(
      'Left: regression draws a line through numbers. Right: classification draws a boundary between categories.',
      'يسارًا: الانحدار يرسم خطًا عبر أرقام. يمينًا: التصنيف يرسم حدًا بين فئات.',
      'چپ: رگرسیون از میان عددها خط می‌کشد. راست: دسته‌بندی میان دسته‌ها مرز می‌کشد.',
    ),
  ),
  html(
    '<p><strong>A quick rule:</strong> look at the answer you want. If it is a <em>number</em> you can do arithmetic with (jars, dollars, days), you need <strong>regression</strong>. If it is a <em>label</em> you can only name (yes or no, spam or not spam), you need <strong>classification</strong>. This week is about regression.</p>',
    '<p><strong>قاعدة سريعة:</strong> انظر إلى الإجابة التي تريدها. إن كانت <em>رقمًا</em> تُجري به حسابًا (برطمانات، دولارات، أيام) فأنت تحتاج <strong>انحدارًا</strong>. وإن كانت <em>تسمية</em> لا تستطيع سوى ذكرها (نعم أو لا، بريد مزعج أو لا) فأنت تحتاج <strong>تصنيفًا</strong>. هذا الأسبوع عن الانحدار.</p>',
    '<p><strong>یک قاعدهٔ سریع:</strong> به جوابی که می‌خواهی نگاه کن. اگر یک <em>عدد</em> است که می‌شود با آن حساب کرد (شیشه، دلار، روز) به <strong>رگرسیون</strong> نیاز داری. اگر یک <em>برچسب</em> است که فقط می‌شود اسمش را برد (بله یا نه، اسپم یا نه) به <strong>دسته‌بندی</strong> نیاز داری. این هفته دربارهٔ رگرسیون است.</p>',
  ),
  {
    type: 'table',
    headers: [t('Question', 'السؤال', 'سؤال'), t('The answer is…', 'الإجابة هي…', 'جواب…'), t('Technique', 'الأسلوب', 'روش')],
    rows: [
      [t('How many jars will we sell next month?', 'كم برطمانًا سنبيع الشهر القادم؟', 'ماه بعد چند شیشه می‌فروشیم؟'), t('a number', 'رقم', 'یک عدد'), t('Regression', 'انحدار', 'رگرسیون')],
      [t('What will a house sell for, given its features?', 'بكم سيُباع المنزل بحسب مواصفاته؟', 'یک خانه با این ویژگی‌ها به چه قیمتی فروش می‌رود؟'), t('a number', 'رقم', 'یک عدد'), t('Regression', 'انحدار', 'رگرسیون')],
      [t('Will this customer buy: yes or no?', 'هل سيشتري هذا العميل: نعم أم لا؟', 'آیا این مشتری می‌خرد: بله یا نه؟'), t('a label', 'تسمية', 'یک برچسب'), t('Classification', 'تصنيف', 'دسته‌بندی')],
      [t('Is this transaction fraudulent?', 'هل هذه المعاملة احتيالية؟', 'آیا این تراکنش تقلبی است؟'), t('a label', 'تسمية', 'یک برچسب'), t('Classification', 'تصنيف', 'دسته‌بندی')],
      [t('Is this cell benign or malignant?', 'هل هذه الخلية حميدة أم خبيثة؟', 'آیا این سلول خوش‌خیم است یا بدخیم؟'), t('a label', 'تسمية', 'یک برچسب'), t('Classification', 'تصنيف', 'دسته‌بندی')],
    ],
  },
  recap(
    t('Supervised: the examples come with answers. Unsupervised: no answers, only patterns.', 'موجَّه: الأمثلة تأتي مع إجاباتها. غير موجَّه: لا إجابات، بل أنماط فقط.', 'با نظارت: نمونه‌ها با جواب می‌آیند. بدون نظارت: جواب نیست، فقط الگو.'),
    t('Examples with answers go in, a model comes out, and the model answers new questions.', 'تدخل الأمثلة مع إجاباتها، ويخرج نموذج، ويجيب النموذج عن أسئلة جديدة.', 'نمونه‌ها با جواب وارد می‌شوند، یک مدل بیرون می‌آید و مدل به پرسش‌های تازه پاسخ می‌دهد.'),
    t('Number answer: regression. Label answer: classification.', 'إجابة رقمية: انحدار. إجابة تسمية: تصنيف.', 'جواب عددی: رگرسیون. جواب برچسبی: دسته‌بندی.'),
  ),
  { type: 'exercise', questionId: 'w06-q011' },
]

// ---------- Section 3: simple regression ----------
export const simpleIntro: Block[] = [
  html(
    '<p>Before any symbol, here is the idea. You want a rule that turns a temperature into a number of jars. Regression finds the best rule of the form <strong>"start at some number, then add the same amount for every degree"</strong>. The symbols below only give the parts of that sentence short names.</p>',
    '<p>قبل أي رمز، إليك الفكرة. تريد قاعدة تحوّل درجة الحرارة إلى عدد من البرطمانات. يجد الانحدار أفضل قاعدة من الشكل <strong>"ابدأ من رقم ما، ثم أضف المقدار نفسه لكل درجة"</strong>. والرموز أدناه تعطي أجزاء هذه الجملة أسماء قصيرة فقط.</p>',
    '<p>پیش از هر نماد، خود ایده این است. قاعده‌ای می‌خواهی که دما را به تعداد شیشه تبدیل کند. رگرسیون بهترین قاعده‌ای از این شکل را پیدا می‌کند: <strong>«از یک عدد شروع کن، بعد برای هر درجه همان مقدار را اضافه کن»</strong>. نمادهای زیر فقط به بخش‌های همین جمله نام کوتاه می‌دهند.</p>',
  ),
]

const dot = (color: string) => `<span style="color:${color}">●</span>`
export const simpleFormula: Block[] = [
  figure(
    4,
    t('The regression equation, colour-coded', 'معادلة الانحدار مرمّزة بالألوان', 'معادلهٔ رگرسیون با رنگ‌های جدا'),
    '/figures/week-06/deck-03-formula.png',
    'The equation y = β0 + β1 X + ε from the original lesson, with each part circled in its own colour (y red, β0 green, β1 blue, X orange, ε magenta), and a legend explaining y, the intercept, the regression coefficient, the independent variable and the error.',
    fromDeck(
      'Each colour is one part of the sentence "start + steps × temperature + miss". The table below uses the same colours.',
      'كل لون هو جزء من الجملة "البداية + الخطوات × الحرارة + الفرق". ويستخدم الجدول أدناه الألوان نفسها.',
      'هر رنگ یک بخش از جملهٔ «شروع + گام‌ها × دما + اختلاف» است. جدول زیر همین رنگ‌ها را به کار می‌برد.',
    ),
  ),
  {
    type: 'table',
    headers: [t('Part', 'الجزء', 'بخش'), t('Name', 'الاسم', 'نام'), t('In plain words', 'بكلمات بسيطة', 'به زبان ساده'), t('On the jam stand', 'في كشك المربى', 'در غرفهٔ مربا')],
    rows: [
      [
        t(`${dot('#C0392B')} <strong>y</strong>`, `${dot('#C0392B')} <strong>y</strong>`, `${dot('#C0392B')} <strong>y</strong>`),
        t('predicted value', 'القيمة المتنبأ بها', 'مقدار پیش‌بینی‌شده'),
        t('The number the line predicts', 'الرقم الذي يتنبأ به الخط', 'عددی که خط پیش‌بینی می‌کند'),
        t('Jars in a month', 'برطمانات الشهر', 'شیشه‌های یک ماه'),
      ],
      [
        t(`${dot('#2E8B57')} <strong>β₀</strong>`, `${dot('#2E8B57')} <strong>β₀</strong>`, `${dot('#2E8B57')} <strong>β₀</strong>`),
        t('intercept', 'المقطع', 'عرض از مبدأ'),
        t('Where the line starts, when x is 0', 'نقطة بداية الخط حين يكون x صفرًا', 'جایی که خط شروع می‌شود، وقتی x صفر است'),
        t('−6.57 jars (a starting point only)', '‎−6.57 برطمان (نقطة بداية فقط)', '‎−۶٫۵۷ شیشه (فقط نقطهٔ شروع)'),
      ],
      [
        t(`${dot('#2F6FDE')} <strong>β₁</strong>`, `${dot('#2F6FDE')} <strong>β₁</strong>`, `${dot('#2F6FDE')} <strong>β₁</strong>`),
        t('slope (regression coefficient)', 'الميل (معامل الانحدار)', 'شیب (ضریب رگرسیون)'),
        t('How much y changes for each extra 1 of x', 'مقدار تغير y لكل زيادة قدرها 1 في x', 'تغییر y به ازای هر ۱ واحد افزایش x'),
        t('+4.09 jars per °C', '‎+4.09 برطمان لكل درجة', '‎+۴٫۰۹ شیشه به ازای هر درجه'),
      ],
      [
        t(`${dot('#E08E0B')} <strong>x</strong>`, `${dot('#E08E0B')} <strong>x</strong>`, `${dot('#E08E0B')} <strong>x</strong>`),
        t('independent variable', 'المتغير المستقل', 'متغیر مستقل'),
        t('What you predict from', 'ما تتنبأ منه', 'چیزی که از روی آن پیش‌بینی می‌کنی'),
        t('Average temperature (°C)', 'متوسط الحرارة (°م)', 'میانگین دما (°C)'),
      ],
      [
        t(`${dot('#C2185B')} <strong>ε</strong>`, `${dot('#C2185B')} <strong>ε</strong>`, `${dot('#C2185B')} <strong>ε</strong>`),
        t('error', 'الخطأ', 'خطا'),
        t('What the line cannot explain: the miss for one month', 'ما لا يستطيع الخط تفسيره: فرق شهر واحد', 'آنچه خط نمی‌تواند توضیح دهد: اختلاف یک ماه'),
        t('December: +14.1 jars', 'ديسمبر: ‎+14.1 برطمان', 'دسامبر: ‎+۱۴٫۱ شیشه'),
      ],
    ],
  },
]

export const simpleEnd: Block[] = [
  figure(
    6,
    t('The error ε is the vertical gap between a dot and the line', 'الخطأ ε هو الفجوة الرأسية بين النقطة والخط', 'خطای ε فاصلهٔ عمودی میان نقطه و خط است'),
    '/figures/week-06/deck-04-error.png',
    'Blue dots scattered around a straight blue line labelled true regression line, y = β0 + β1x. Two dots are marked (x1, y1) and (x2, y2); brackets labelled ε1 and ε2 show the vertical gap from each of those dots to the line.',
    fromDeck(
      'ε₁ belongs to a dot above the line, ε₂ to a dot below it. Regression places the line so that these gaps, squared and added up, are as small as possible.',
      'تخصّ ε₁ نقطة فوق الخط وε₂ نقطة تحته. يضع الانحدار الخط بحيث تكون هذه الفجوات، مربّعة ومجموعة، أصغر ما يمكن.',
      'ε₁ مال نقطه‌ای بالای خط است و ε₂ مال نقطه‌ای زیر آن. رگرسیون خط را طوری می‌گذارد که این فاصله‌ها، به توان دو و جمع‌شده، تا حد ممکن کوچک باشند.',
    ),
  ),
  html(
    '<p>Look at the dot marked (x₁, y₁). It sits above the line, so the line <em>under</em>-predicted it, and its gap ε₁ is positive. The dot (x₂, y₂) sits below the line, so its gap ε₂ is negative. <strong>Every dot has its own gap.</strong> The best line is the one that keeps all the gaps small together.</p>',
    '<p>انظر إلى النقطة المعلَّمة (x₁, y₁). تقع فوق الخط، فقد <em>قلّل</em> الخط من التنبؤ بها، وفجوتها ε₁ موجبة. أما النقطة (x₂, y₂) فتقع تحت الخط، ففجوتها ε₂ سالبة. <strong>لكل نقطة فجوتها.</strong> وأفضل خط هو الذي يُبقي كل الفجوات صغيرة معًا.</p>',
    '<p>به نقطهٔ نشان‌شده (x₁, y₁) نگاه کن. بالای خط است، پس خط آن را <em>کمتر</em> پیش‌بینی کرده و فاصله‌اش ε₁ مثبت است. نقطهٔ (x₂, y₂) زیر خط است، پس فاصله‌اش ε₂ منفی است. <strong>هر نقطه فاصلهٔ خودش را دارد.</strong> بهترین خط آن است که همهٔ فاصله‌ها را با هم کوچک نگه دارد.</p>',
  ),
  html(
    '<h3>Try it by hand: three months, three lines</h3><p>Toy numbers, not the stand\'s: 10 °C sold 30 jars, 20 °C sold 60, 30 °C sold 75. The averages are 20 °C and 55 jars. The slope is the sum of (x − 20) × (y − 55) divided by the sum of (x − 20)², which is (−10 × −25 + 0 × 5 + 10 × 20) / (100 + 0 + 100) = 450 / 200 = <strong>2.25</strong>. The best line passes through the point of averages, so the intercept is 55 − 2.25 × 20 = <strong>10</strong>. The line is <code>jars = 10 + 2.25 × temperature</code>. Now compare it with two rivals by adding up the squared gaps:</p>',
    '<h3>جرّبه بيدك: ثلاثة أشهر وثلاثة خطوط</h3><p>أرقام تجريبية وليست أرقام الكشك: عند 10 °م بيع 30 برطمانًا، وعند 20 °م بيع 60، وعند 30 °م بيع 75. المتوسطان هما 20 °م و55 برطمانًا. الميل هو مجموع (x − 20) × (y − 55) مقسومًا على مجموع (x − 20)²، أي (‎−10 × ‎−25 + 0 × 5 + 10 × 20) / (100 + 0 + 100) = 450 / 200 = <strong>2.25</strong>. ويمرّ أفضل خط بنقطة المتوسطين، فالمقطع هو 55 − 2.25 × 20 = <strong>10</strong>. والخط هو <code>jars = 10 + 2.25 × temperature</code>. قارنه الآن بمنافسين بجمع الفجوات المربّعة:</p>',
    '<h3>دستی امتحانش کن: سه ماه، سه خط</h3><p>عددهای آزمایشی، نه عددهای غرفه: در ۱۰ درجه ۳۰ شیشه فروش رفت، در ۲۰ درجه ۶۰ و در ۳۰ درجه ۷۵. میانگین‌ها ۲۰ درجه و ۵۵ شیشه‌اند. شیب برابر است با جمع (x − 20) × (y − 55) تقسیم بر جمع (x − 20)²، یعنی (‎−10 × ‎−25 + 0 × 5 + 10 × 20) / (100 + 0 + 100) = 450 / 200 = <strong>۲٫۲۵</strong>. بهترین خط از نقطهٔ میانگین‌ها می‌گذرد، پس عرض از مبدأ ۵۵ − ۲٫۲۵ × ۲۰ = <strong>۱۰</strong> است. خط می‌شود <code>jars = 10 + 2.25 × temperature</code>. حالا آن را با دو رقیب مقایسه کن، با جمع فاصله‌های به توان دو:</p>',
  ),
  {
    type: 'table',
    headers: [t('Line', 'الخط', 'خط'), t('Predicts at 10, 20, 30 °C', 'يتنبأ عند 10 و20 و30 °م', 'در ۱۰، ۲۰، ۳۰ درجه پیش‌بینی می‌کند'), t('Gaps (actual − predicted)', 'الفجوات (الفعلي − المتنبأ)', 'فاصله‌ها (واقعی − پیش‌بینی)'), t('Sum of squared gaps', 'مجموع مربعات الفجوات', 'جمع مربع فاصله‌ها')],
    rows: [
      [t('<strong>Best:</strong> 10 + 2.25x', '<strong>الأفضل:</strong> 10 + 2.25x', '<strong>بهترین:</strong> 10 + 2.25x'), cell('32.5, 55, 77.5', '32.5, 55, 77.5', '۳۲٫۵، ۵۵، ۷۷٫۵'), cell('−2.5, +5, −2.5', '‎−2.5, ‎+5, ‎−2.5', '‎−۲٫۵، ‎+۵، ‎−۲٫۵'), cell('<strong>37.5</strong>', '<strong>37.5</strong>', '<strong>۳۷٫۵</strong>')],
      [t('Rival: 5 + 2.5x', 'منافس: 5 + 2.5x', 'رقیب: 5 + 2.5x'), cell('30, 55, 80', '30, 55, 80', '۳۰، ۵۵، ۸۰'), cell('0, +5, −5', '0, ‎+5, ‎−5', '۰، ‎+۵، ‎−۵'), cell('50', '50', '۵۰')],
      [t('Flat at the average: 55', 'مسطّح عند المتوسط: 55', 'صاف روی میانگین: ۵۵'), cell('55, 55, 55', '55, 55, 55', '۵۵، ۵۵، ۵۵'), cell('−25, +5, +20', '‎−25, ‎+5, ‎+20', '‎−۲۵، ‎+۵، ‎+۲۰'), cell('1,050', '1,050', '۱٬۰۵۰')],
    ],
  },
  html(
    '<p>The best line has the smallest total. <strong>Why square the gaps?</strong> Squaring stops misses above and below the line from cancelling each other out, and it makes one big miss count more than several small ones. The flat line at the average (55 jars every month) ignores temperature entirely and misses by 1,050 in total. <strong>R² compares the two:</strong> 1 − 37.5 / 1,050 = 0.964. Your line removes 96% of the mess that the flat average leaves behind.</p>',
    '<p>أفضل خط له أصغر مجموع. <strong>لماذا نربّع الفجوات؟</strong> التربيع يمنع الأخطاء فوق الخط وتحته من أن يلغي بعضها بعضًا، ويجعل خطأ كبيرًا واحدًا يزن أكثر من عدة أخطاء صغيرة. أما الخط المسطّح عند المتوسط (55 برطمانًا كل شهر) فيتجاهل الحرارة تمامًا ويخطئ بمجموع 1,050. <strong>ويقارن R² بين الاثنين:</strong> 1 − 37.5 / 1,050 = 0.964. خطك يزيل 96% من الفوضى التي يتركها المتوسط المسطّح.</p>',
    '<p>بهترین خط کمترین جمع را دارد. <strong>چرا فاصله‌ها را به توان دو می‌رسانیم؟</strong> توان دو جلوی این را می‌گیرد که خطاهای بالا و پایین خط همدیگر را خنثی کنند و باعث می‌شود یک اشتباه بزرگ بیشتر از چند اشتباه کوچک حساب شود. خط صاف روی میانگین (هر ماه ۵۵ شیشه) دما را کاملاً نادیده می‌گیرد و در مجموع ۱٬۰۵۰ اشتباه می‌کند. <strong>R² این دو را مقایسه می‌کند:</strong> 1 − 37.5 / 1,050 = ۰٫۹۶۴. خط تو ۹۶٪ از آشفتگی‌ای را که میانگین صاف باقی می‌گذارد از بین می‌برد.</p>',
  ),
  figure(
    7,
    t('Reading the line like stairs', 'قراءة الخط كدرج', 'خواندن خط مثل پله‌ها'),
    '/figures/week-06/diagram-04.svg',
    'The regression line for the jam stand drawn as a rising line with a purple staircase beside it. The line starts at minus 6.57 jars at 0 degrees and gains 4.09 jars for every degree: 34 jars at 10 degrees, 75 at 20 degrees and 116 at 30 degrees.',
    t(
      'Start at −6.57 and climb 4.09 jars for every degree. At 20 °C you have climbed 20 steps: −6.57 + 20 × 4.09 = 75.2 jars. That is what "predicting" means: plug in the temperature and read off the jars.',
      'ابدأ من ‎−6.57 واصعد 4.09 برطمان لكل درجة. عند 20 °م تكون قد صعدت 20 درجة: ‎−6.57 + 20 × 4.09 = 75.2 برطمانًا. هذا هو معنى "التنبؤ": ضع الحرارة واقرأ البرطمانات.',
      'از ‎−۶٫۵۷ شروع کن و برای هر درجه ۴٫۰۹ شیشه بالا برو. در ۲۰ درجه ۲۰ پله بالا رفته‌ای: ‎−6.57 + 20 × 4.09 = ۷۵٫۲ شیشه. «پیش‌بینی» یعنی همین: دما را بگذار و شیشه‌ها را بخوان.',
    ),
  ),
  recap(
    t('The line is "start + steps × x". The symbols just name the parts.', 'الخط هو "البداية + الخطوات × x". والرموز تسمّي الأجزاء فقط.', 'خط یعنی «شروع + گام‌ها × x». نمادها فقط بخش‌ها را نام می‌برند.'),
    t('Error is the vertical gap between a dot and the line; the best line makes the squared gaps add up smallest.', 'الخطأ هو الفجوة الرأسية بين النقطة والخط؛ وأفضل خط يجعل مجموع الفجوات المربّعة أصغر ما يمكن.', 'خطا فاصلهٔ عمودی نقطه تا خط است؛ بهترین خط جمع فاصله‌های به توان دو را کمینه می‌کند.'),
    t('R² compares your line with the flat "always the average" line.', 'يقارن R² خطك بالخط المسطّح "المتوسط دائمًا".', 'R² خط تو را با خط صافِ «همیشه میانگین» مقایسه می‌کند.'),
  ),
  { type: 'exercise', questionId: 'w06-q012' },
]

// ---------- Section 4: follow-along ----------
export const followStart: Block[] = [
  html(
    '<h3>A bigger case from the lesson: a direct-marketing firm</h3><p>The lesson\'s example is a firm with records of 1,000 past customers: age, salary, children, catalogs sent, and how much each customer spent. It wants to know which customers to target. The question: <em>"Which customer characteristics relate to AmountSpent, and how?"</em> We use the lesson\'s own screenshots to learn the Excel steps, then repeat them on the jam stand\'s 12 months.</p>',
    '<h3>حالة أكبر من الدرس: شركة تسويق مباشر</h3><p>مثال الدرس شركة لديها سجلات 1,000 عميل سابق: العمر والراتب والأطفال والكتالوجات المرسلة ومقدار ما أنفقه كل عميل. تريد أن تعرف أي العملاء تستهدف. السؤال: <em>"أي خصائص العملاء ترتبط بـ AmountSpent، وكيف؟"</em> نستخدم لقطات الشاشة من الدرس نفسه لنتعلم خطوات Excel، ثم نكررها على أشهر كشك المربى الاثني عشر.</p>',
    '<h3>یک نمونهٔ بزرگ‌تر از درس: یک شرکت بازاریابی مستقیم</h3><p>مثال درس شرکتی است که سابقهٔ ۱٬۰۰۰ مشتری قبلی را دارد: سن، حقوق، فرزندان، کاتالوگ‌های ارسالی و مقداری که هر مشتری خرج کرده. می‌خواهد بداند کدام مشتری‌ها را هدف بگیرد. پرسش: <em>«کدام ویژگی‌های مشتری با AmountSpent مرتبط است و چگونه؟»</em> از تصویرهای خود درس برای یادگرفتن گام‌های Excel استفاده می‌کنیم، بعد آن‌ها را روی ۱۲ ماه غرفهٔ مربا تکرار می‌کنیم.</p>',
  ),
  figure(
    8,
    t('The Direct Marketing data (first rows)', 'بيانات التسويق المباشر (الصفوف الأولى)', 'دادهٔ بازاریابی مستقیم (سطرهای اول)'),
    '/figures/week-06/deck-05-data-table.png',
    'Spreadsheet screenshot with columns Age, Gender, OwnHome, Married, Location, Salary, Children, History, Catalogs and AmountSpent, showing 11 customer rows.',
    fromDeck(
      'One row per customer. AmountSpent is the number we want to explain (Y); Salary, Children and Catalogs are candidates for X.',
      'صف لكل عميل. AmountSpent هو الرقم الذي نريد تفسيره (Y)؛ وSalary وChildren وCatalogs مرشحة لتكون X.',
      'یک سطر برای هر مشتری. AmountSpent عددی است که می‌خواهیم توضیحش دهیم (Y)؛ Salary، Children و Catalogs نامزد X هستند.',
    ),
  ),
  html(
    '<h3>Step 1: open Data Analysis</h3><p>Click the <strong>Data</strong> tab. At the far right of the ribbon you will find <strong>Data Analysis</strong>. If it is missing, switch the add-in on once (<em>File → Options → Add-ins → Analysis ToolPak</em>; the steps are under "Now the jam stand" below).</p>',
    '<h3>الخطوة 1: افتح Data Analysis</h3><p>انقر تبويب <strong>Data</strong>. في أقصى يمين الشريط ستجد <strong>Data Analysis</strong>. إن لم تجده فعّل الإضافة مرة واحدة (<em>File → Options → Add-ins → Analysis ToolPak</em>؛ الخطوات تحت "الآن كشك المربى" أدناه).</p>',
    '<h3>گام ۱: Data Analysis را باز کن</h3><p>روی زبانهٔ <strong>Data</strong> کلیک کن. در انتهای سمت راست نوار <strong>Data Analysis</strong> را می‌بینی. اگر نبود، افزونه را یک بار روشن کن (<em>File → Options → Add-ins → Analysis ToolPak</em>؛ مراحل زیر «حالا غرفهٔ مربا» آمده).</p>',
  ),
  figure(
    9,
    t('Step 1: the Data tab, then Data Analysis', 'الخطوة 1: تبويب Data ثم Data Analysis', 'گام ۱: زبانهٔ Data و بعد Data Analysis'),
    '/figures/week-06/deck-06-excel-ribbon.png',
    'The Excel ribbon with the Data tab outlined in red and, at the far right, the Data Analysis button outlined in red.',
    fromDeck(
      'The red boxes mark the Data tab and the Data Analysis button. The screenshots are from Excel for Mac; Windows looks almost the same. Click the figure to open it full size.',
      'تحدد المربعات الحمراء تبويب Data وزر Data Analysis. لقطات الشاشة من Excel لنظام Mac؛ ويبدو ويندوز مشابهًا تقريبًا. انقر الشكل لفتحه بالحجم الكامل.',
      'کادرهای قرمز زبانهٔ Data و دکمهٔ Data Analysis را نشان می‌دهند. تصویرها از Excel مک‌اند؛ ویندوز تقریباً همین شکل است. روی شکل کلیک کن تا اندازهٔ کامل باز شود.',
    ),
  ),
  html(
    '<h3>Step 2: choose Regression</h3><p>In the list of analysis tools, scroll down and pick <strong>Regression</strong>, then click OK.</p>',
    '<h3>الخطوة 2: اختر Regression</h3><p>في قائمة أدوات التحليل، انزل واختر <strong>Regression</strong> ثم انقر OK.</p>',
    '<h3>گام ۲: Regression را انتخاب کن</h3><p>در فهرست ابزارهای تحلیل پایین برو، <strong>Regression</strong> را انتخاب کن و OK بزن.</p>',
  ),
  figure(
    10,
    t('Step 2: pick Regression', 'الخطوة 2: اختر Regression', 'گام ۲: Regression را بردار'),
    '/figures/week-06/deck-07-tool-list.png',
    'The Data Analysis dialog listing Moving Average, Random Number Generation, Rank and Percentile, Regression, Sampling and t-Test; the Regression row is highlighted and outlined in red.',
    fromDeck(
      'Excel offers many tools here; Regression is the one that fits the line.',
      'يعرض Excel أدوات كثيرة هنا؛ والانحدار هو الذي يلائم الخط.',
      'Excel اینجا ابزارهای زیادی دارد؛ Regression همان است که خط را برازش می‌کند.',
    ),
  ),
  html(
    '<h3>Step 3: tell Excel what is Y and what is X</h3><ul><li><strong>Input Y Range:</strong> the column you want to predict (AmountSpent here; jars for the stand).</li><li><strong>Input X Range:</strong> the column you predict from (Salary here; temperature for the stand).</li><li>Tick <strong>Labels</strong> when your ranges include the header row.</li><li><strong>Output Range:</strong> the cell where Excel starts writing the results.</li><li>Tick <strong>Residual Plots</strong> and <strong>Line Fit Plots</strong> if you also want the charts.</li></ul>',
    '<h3>الخطوة 3: أخبر Excel ما هو Y وما هو X</h3><ul><li><strong>Input Y Range:</strong> العمود الذي تريد التنبؤ به (AmountSpent هنا؛ والبرطمانات للكشك).</li><li><strong>Input X Range:</strong> العمود الذي تتنبأ منه (Salary هنا؛ والحرارة للكشك).</li><li>فعّل <strong>Labels</strong> حين يتضمن مداك صف العناوين.</li><li><strong>Output Range:</strong> الخلية التي يبدأ Excel الكتابة فيها.</li><li>فعّل <strong>Residual Plots</strong> و<strong>Line Fit Plots</strong> إن أردت الرسوم أيضًا.</li></ul>',
    '<h3>گام ۳: به Excel بگو Y چیست و X چیست</h3><ul><li><strong>Input Y Range:</strong> ستونی که می‌خواهی پیش‌بینی کنی (اینجا AmountSpent؛ برای غرفه شیشه‌ها).</li><li><strong>Input X Range:</strong> ستونی که از روی آن پیش‌بینی می‌کنی (اینجا Salary؛ برای غرفه دما).</li><li>اگر بازه‌هایت سطر سرستون را دارند <strong>Labels</strong> را تیک بزن.</li><li><strong>Output Range:</strong> خانه‌ای که Excel نوشتن نتیجه را از آن شروع می‌کند.</li><li>اگر نمودارها را هم می‌خواهی <strong>Residual Plots</strong> و <strong>Line Fit Plots</strong> را تیک بزن.</li></ul>',
  ),
  figure(
    11,
    t('Step 3: the Regression dialog, explained', 'الخطوة 3: نافذة Regression مع الشرح', 'گام ۳: پنجرهٔ Regression با توضیح'),
    '/figures/week-06/deck-08-dialog.png',
    'The Excel Regression dialog with red boxes around Input Y Range, Input X Range, the Labels checkbox, Output Range and the residual and line fit plot checkboxes. Grey callouts explain each: X and Y range, check Labels if the header is in the range, which cell the model goes to, and check the plots if you want them.',
    fromDeck(
      'The most common slip is swapping the two ranges: Y is what you predict, X is what you predict it from.',
      'أشيع زلّة هي تبديل المدَيين: Y هو ما تتنبأ به، وX هو ما تتنبأ منه.',
      'رایج‌ترین اشتباه جابه‌جا کردن دو بازه است: Y چیزی است که پیش‌بینی می‌کنی، X چیزی است که از روی آن پیش‌بینی می‌کنی.',
    ),
  ),
  html(
    '<h3>Now the jam stand</h3><p>The same three steps, on the stand\'s 12 months (<code>A1:D13</code>), in each tool:</p>',
    '<h3>الآن كشك المربى</h3><p>الخطوات الثلاث نفسها، على أشهر الكشك الاثني عشر (<code>A1:D13</code>)، في كل أداة:</p>',
    '<h3>حالا غرفهٔ مربا</h3><p>همان سه گام، روی ۱۲ ماه غرفه (<code>A1:D13</code>)، در هر ابزار:</p>',
  ),
]

export const followEnd: Block[] = [
  html(
    '<h3>A quick check without the dialog</h3><p>Four one-cell formulas give the same numbers as the whole output table. Use them to double-check any tool\'s result:</p>',
    '<h3>تحقق سريع دون النافذة</h3><p>أربع معادلات من خلية واحدة تعطي الأرقام نفسها التي يعطيها جدول المخرجات كله. استخدمها للتحقق من نتيجة أي أداة:</p>',
    '<h3>بررسی سریع بدون پنجره</h3><p>چهار فرمول تک‌خانه‌ای همان عددهای کل جدول خروجی را می‌دهند. از آن‌ها برای دوباره‌بررسی نتیجهٔ هر ابزار استفاده کن:</p>',
  ),
  {
    type: 'code',
    code: `=SLOPE(D2:D13, B2:B13)                 → 4.09   (jars per extra °C)
=INTERCEPT(D2:D13, B2:B13)             → -6.57  (the starting point)
=RSQ(D2:D13, B2:B13)                   → 0.95   (R squared)
=FORECAST.LINEAR(20, D2:D13, B2:B13)   → 75.2   (jars at 20 °C)`,
  },
  recap(
    t('Y range is what you predict; X range is what you predict it from.', 'مدى Y هو ما تتنبأ به؛ ومدى X هو ما تتنبأ منه.', 'بازهٔ Y چیزی است که پیش‌بینی می‌کنی؛ بازهٔ X چیزی است که از روی آن پیش‌بینی می‌کنی.'),
    t('Tick Labels when the header row is inside the range.', 'فعّل Labels حين يقع صف العناوين داخل المدى.', 'وقتی سطر سرستون داخل بازه است Labels را تیک بزن.'),
    t('SLOPE, INTERCEPT, RSQ and FORECAST.LINEAR double-check any result in seconds.', 'تتيح SLOPE وINTERCEPT وRSQ وFORECAST.LINEAR التحقق من أي نتيجة في ثوانٍ.', 'SLOPE، INTERCEPT، RSQ و FORECAST.LINEAR هر نتیجه‌ای را در چند ثانیه دوباره بررسی می‌کنند.'),
  ),
]

// ---------- Section 5: reading the output ----------
export const readingStart: Block[] = [
  html(
    '<h3>Read any regression in three sentences</h3><ul><li><strong>R²:</strong> "About ___% of the ups and downs in Y can be explained by X."</li><li><strong>Slope:</strong> "If X goes up by 1, Y is predicted to go up (or down) by ___."</li><li><strong>Intercept:</strong> "When X is 0, Y is predicted to be ___" (often only a starting point).</li></ul><p>Excel prints three tables, but these three numbers, plus whether the slope\'s p-value is below 0.05, are all you need to start. We read the lesson\'s Direct Marketing output first, then the jam stand\'s.</p>',
    '<h3>اقرأ أي انحدار في ثلاث جمل</h3><ul><li><strong>R²:</strong> "نحو ___% من صعود Y وهبوطه يمكن تفسيره بـ X."</li><li><strong>الميل:</strong> "إذا زاد X بمقدار 1 فيُتنبأ بأن يزيد Y (أو ينقص) بمقدار ___."</li><li><strong>المقطع:</strong> "حين يكون X صفرًا يُتنبأ بأن يكون Y ___" (غالبًا نقطة بداية فقط).</li></ul><p>يطبع Excel ثلاثة جداول، لكن هذه الأرقام الثلاثة، مع معرفة هل قيمة p للميل أقل من 0.05، هي كل ما تحتاجه للبدء. نقرأ أولًا مخرجات التسويق المباشر من الدرس، ثم مخرجات كشك المربى.</p>',
    '<h3>هر رگرسیونی را در سه جمله بخوان</h3><ul><li><strong>R²:</strong> «حدود ___٪ از بالا و پایین شدن Y را می‌شود با X توضیح داد.»</li><li><strong>شیب:</strong> «اگر X یکی بالا برود، Y پیش‌بینی می‌شود ___ بالا (یا پایین) برود.»</li><li><strong>عرض از مبدأ:</strong> «وقتی X صفر است، Y پیش‌بینی می‌شود ___ باشد» (اغلب فقط یک نقطهٔ شروع).</li></ul><p>Excel سه جدول چاپ می‌کند، اما این سه عدد، به‌اضافهٔ اینکه مقدار p شیب زیر ۰٫۰۵ هست یا نه، همهٔ آن چیزی است که برای شروع لازم داری. اول خروجی بازاریابی مستقیم درس را می‌خوانیم، بعد خروجی غرفهٔ مربا را.</p>',
  ),
  analogy(
    '<p>Think of a taxi meter. The <strong>intercept</strong> is the starting fee when you sit down, and the <strong>slope</strong> is the price for each extra kilometre. A regression line is the same kind of rule: "start here, then add this much for every step of X". The starting fee is not always meaningful: for the jam stand it comes out slightly below zero, so we treat it only as the place where the line starts.</p>',
    '<p>فكّر في عدّاد التاكسي. <strong>المقطع</strong> هو رسم البدء حين تجلس، و<strong>الميل</strong> هو سعر كل كيلومتر إضافي. خط الانحدار قاعدة من النوع نفسه: "ابدأ من هنا، ثم أضف هذا المقدار لكل خطوة في X". ورسم البدء لا يكون ذا معنى دائمًا: في كشك المربى يخرج أقل من الصفر قليلًا، فنعدّه مجرد المكان الذي يبدأ منه الخط.</p>',
    '<p>به کرایه‌سنج تاکسی فکر کن. <strong>عرض از مبدأ</strong> هزینهٔ شروع است وقتی سوار می‌شوی و <strong>شیب</strong> بهای هر کیلومتر بیشتر است. خط رگرسیون هم همین نوع قاعده است: «از اینجا شروع کن، بعد برای هر گام X این‌قدر اضافه کن». هزینهٔ شروع همیشه معنا ندارد: برای غرفهٔ مربا کمی زیر صفر درمی‌آید، پس فقط آن را جایی می‌دانیم که خط از آنجا شروع می‌شود.</p>',
  ),
  figure(
    12,
    t('Amount spent against salary, with the fitted line (1,000 customers)', 'المبلغ المنفق مقابل الراتب، مع الخط الملائم (1,000 عميل)', 'مبلغ خرج‌شده در برابر حقوق، با خط برازش‌شده (۱٬۰۰۰ مشتری)'),
    '/figures/week-06/deck-09-scatter.png',
    'Scatter plot of AmountSpent (vertical, up to 7,000) against Salary (horizontal, up to 180,000) for 1,000 customers, with a red trend line rising from about 200 to about 3,700. Spending rises with salary but the dots are widely scattered around the line.',
    fromDeck(
      'Each dot is a customer. Spending rises with salary, but with a lot of scatter around the line, which is why R² is only about a half.',
      'كل نقطة عميل. يرتفع الإنفاق مع الراتب، لكن مع تشتّت كبير حول الخط، ولهذا لا يزيد R² عن نحو النصف.',
      'هر نقطه یک مشتری است. خرج با حقوق بالا می‌رود، اما با پراکندگی زیادی دور خط، و برای همین R² فقط حدود نصف است.',
    ),
  ),
  figure(
    13,
    t('The summary output, with the lesson\'s callouts', 'جدول المخرجات مع شروح الدرس', 'خروجی خلاصه، با توضیح‌های درس'),
    '/figures/week-06/deck-10-output-simple.png',
    'Excel Summary Output for AmountSpent against Salary with 1,000 observations. Red boxes mark R Square 0.48943415, the intercept coefficient -15.317825 and the Salary coefficient 0.02196082. Grey callouts explain each, and the equation AmountSpent = -15.31 + 0.021 × Salary + ε is shown below.',
    fromDeck(
      'The red boxes mark the three numbers to read. (The lesson\'s callout writes the intercept as −15.31; the table prints −15.317825, which rounds to −15.32.)',
      'تحدد المربعات الحمراء الأرقام الثلاثة التي تُقرأ. (يكتب شرح الدرس المقطع ‎−15.31؛ أما الجدول فيطبع ‎−15.317825 الذي يُقرَّب إلى ‎−15.32.)',
      'کادرهای قرمز سه عددی را که باید خواند نشان می‌دهند. (توضیح درس عرض از مبدأ را ‎−۱۵٫۳۱ نوشته؛ جدول ‎−۱۵٫۳۱۷۸۲۵ چاپ می‌کند که گرد می‌شود ‎−۱۵٫۳۲.)',
    ),
  ),
  html(
    '<h3>Reading it, sentence by sentence</h3><ul><li><strong>R² = 0.4894.</strong> About 48.9% of the variation in AmountSpent can be explained by Salary: roughly half. The rest comes from things salary does not capture.</li><li><strong>Slope = 0.02196.</strong> Each extra $1 of salary goes with about 2 cents more spending, which is easier to feel as <strong>about $22 more for every extra $1,000 of salary</strong>.</li><li><strong>Intercept = −15.32.</strong> A customer earning $0 would be predicted to spend −$15: nonsense, because nobody in the data earns anywhere near $0. It only positions the line.</li></ul><p>Written out: <strong>AmountSpent = −15.32 + 0.0220 × Salary + ε</strong>. <strong>A prediction:</strong> a customer earning $40,000 is predicted to spend −15.32 + 0.02196 × 40,000 = about <strong>$863</strong>; one earning $80,000, about <strong>$1,742</strong>. That is $878 more for $40,000 more salary.</p>',
    '<h3>قراءتها جملة جملة</h3><ul><li><strong>R² = 0.4894.</strong> يمكن تفسير نحو 48.9% من تغيّر AmountSpent بـ Salary: أي النصف تقريبًا. والباقي يأتي من أشياء لا يلتقطها الراتب.</li><li><strong>الميل = 0.02196.</strong> كل دولار إضافي من الراتب يقابله نحو سنتين إنفاقًا أكثر، وهذا أسهل إحساسًا حين نقوله هكذا: <strong>نحو 22 دولارًا أكثر لكل 1,000 دولار إضافية من الراتب</strong>.</li><li><strong>المقطع = ‎−15.32.</strong> عميل راتبه 0 دولار يُتنبأ بأنه سينفق ‎−15 دولارًا: كلام بلا معنى، لأن لا أحد في البيانات يقترب راتبه من 0. إنه يحدد موضع الخط فقط.</li></ul><p>مكتوبة: <strong>AmountSpent = −15.32 + 0.0220 × Salary + ε</strong>. <strong>تنبؤ:</strong> عميل راتبه 40,000 دولار يُتنبأ بأنه سينفق ‎−15.32 + 0.02196 × 40,000 = نحو <strong>863 دولارًا</strong>؛ وعميل راتبه 80,000 دولار نحو <strong>1,742 دولارًا</strong>. أي 878 دولارًا أكثر مقابل 40,000 دولار زيادة في الراتب.</p>',
    '<h3>خواندن جمله‌به‌جمله</h3><ul><li><strong>R² = ۰٫۴۸۹۴.</strong> حدود ۴۸٫۹٪ از تغییرات AmountSpent را می‌شود با Salary توضیح داد: تقریباً نصف. بقیه از چیزهایی می‌آید که حقوق نمی‌گیرد.</li><li><strong>شیب = ۰٫۰۲۱۹۶.</strong> هر ۱ دلار حقوق بیشتر با حدود ۲ سنت خرج بیشتر همراه است که وقتی این‌طور بگوییم ملموس‌تر است: <strong>حدود ۲۲ دلار بیشتر به ازای هر ۱٬۰۰۰ دلار حقوق بیشتر</strong>.</li><li><strong>عرض از مبدأ = ‎−۱۵٫۳۲.</strong> مشتری‌ای با حقوق ۰ دلار پیش‌بینی می‌شود ‎−۱۵ دلار خرج کند: بی‌معنی، چون هیچ‌کس در داده حقوقی نزدیک ۰ ندارد. فقط جای خط را مشخص می‌کند.</li></ul><p>به‌صورت نوشته: <strong>AmountSpent = −15.32 + 0.0220 × Salary + ε</strong>. <strong>یک پیش‌بینی:</strong> مشتری‌ای با حقوق ۴۰٬۰۰۰ دلار پیش‌بینی می‌شود ‎−15.32 + 0.02196 × 40,000 = حدود <strong>۸۶۳ دلار</strong> خرج کند؛ با حقوق ۸۰٬۰۰۰ دلار حدود <strong>۱٬۷۴۲ دلار</strong>. یعنی ۸۷۸ دلار بیشتر برای ۴۰٬۰۰۰ دلار حقوق بیشتر.</p>',
  ),
  html(
    '<h3>Now the jam stand</h3><p>Same three sentences, on the stand\'s 12 months:</p>',
    '<h3>الآن كشك المربى</h3><p>الجمل الثلاث نفسها، على أشهر الكشك الاثني عشر:</p>',
    '<h3>حالا غرفهٔ مربا</h3><p>همان سه جمله، روی ۱۲ ماه غرفه:</p>',
  ),
]

export const readingEnd: Block[] = [
  analogy(
    '<p>Imagine predicting exam grades from hours studied. If R² is 0.95, study time explains almost every grade. If it is 0.49, study time explains about half of them, and the other half is sleep, talent and luck. R² says <em>how much</em> of the ups and downs the line explains, not <em>why</em>.</p>',
    '<p>تخيّل التنبؤ بدرجات الامتحان من ساعات الدراسة. إذا كان R² يساوي 0.95 فوقت الدراسة يفسّر تقريبًا كل درجة. وإذا كان 0.49 فهو يفسّر نحو نصفها، والنصف الآخر هو النوم والموهبة والحظ. يقول R² <em>كم</em> من الصعود والهبوط يفسّره الخط، لا <em>لماذا</em>.</p>',
    '<p>پیش‌بینی نمرهٔ امتحان از ساعت مطالعه را تصور کن. اگر R² برابر ۰٫۹۵ باشد، زمان مطالعه تقریباً همهٔ نمره‌ها را توضیح می‌دهد. اگر ۰٫۴۹ باشد، حدود نصف را توضیح می‌دهد و نصف دیگر خواب، استعداد و شانس است. R² می‌گوید <em>چقدر</em> از بالا و پایین شدن را خط توضیح می‌دهد، نه <em>چرا</em>.</p>',
  ),
  recap(
    t('R²: the share of the ups and downs the line explains.', 'R²: حصة الصعود والهبوط التي يفسّرها الخط.', 'R²: سهمی از بالا و پایین شدن که خط توضیح می‌دهد.'),
    t('Slope: the change in Y for one more X. Say it in a size you can feel ($22 per $1,000).', 'الميل: تغير Y لكل وحدة إضافية من X. قله بحجم تحسّه (22 دولارًا لكل 1,000).', 'شیب: تغییر Y به ازای یک X بیشتر. آن را در اندازه‌ای بگو که حس کنی (۲۲ دلار برای هر ۱٬۰۰۰).'),
    t('Intercept: usually just where the line starts; do not read it literally.', 'المقطع: غالبًا مجرد بداية الخط؛ لا تقرأه حرفيًا.', 'عرض از مبدأ: معمولاً فقط جای شروع خط است؛ تحت‌اللفظی نخوانش.'),
  ),
  { type: 'exercise', questionId: 'w06-q013' },
]

// ---------- Section 6: assumptions ----------
export const assumptionsStart: Block[] = [
  analogy(
    '<p>A car\'s top speed is only true on a good road. The assumptions are the description of the road: if the road is a straight, even track, the regression\'s numbers can be trusted; if it is full of bends and potholes, the same numbers can mislead you without any warning.</p>',
    '<p>السرعة القصوى للسيارة لا تصحّ إلا على طريق جيد. والافتراضات هي وصف الطريق: إن كان الطريق مستقيمًا ومستويًا فيمكن الوثوق بأرقام الانحدار؛ وإن امتلأ بالمنعطفات والحفر فقد تضللك الأرقام نفسها دون أي تحذير.</p>',
    '<p>سرعت نهایی یک ماشین فقط روی جادهٔ خوب درست است. فرض‌ها توصیف جاده‌اند: اگر جاده راست و هموار باشد می‌شود به عددهای رگرسیون اعتماد کرد؛ اگر پر از پیچ و چاله باشد همان عددها می‌توانند بدون هیچ هشداری گمراهت کنند.</p>',
  ),
  html(
    '<h3>The four checks, as plain questions</h3><ol><li><strong>Linearity:</strong> do the dots follow a <em>straight</em> line rather than a curve?</li><li><strong>Equal variance:</strong> are the misses about the same size for small and large X, or do they fan out?</li><li><strong>Independence:</strong> is every row its own event (no copies, and no month that leaks into the next)?</li><li><strong>Normality:</strong> are the errors mostly small, with a few bigger ones on both sides, like a bell?</li></ol>',
    '<h3>الفحوص الأربعة كأسئلة بسيطة</h3><ol><li><strong>الخطية:</strong> هل تتبع النقاط خطًا <em>مستقيمًا</em> لا منحنى؟</li><li><strong>تساوي التباين:</strong> هل الأخطاء بالحجم نفسه تقريبًا عند X الصغير والكبير، أم تتسع كالمروحة؟</li><li><strong>الاستقلال:</strong> هل كل صف حدث قائم بذاته (بلا نسخ، وبلا شهر يتسرب إلى الذي يليه)؟</li><li><strong>الطبيعية:</strong> هل الأخطاء صغيرة في الغالب، مع بعض الأكبر على الجانبين، كالجرس؟</li></ol>',
    '<h3>چهار بررسی، به شکل پرسش ساده</h3><ol><li><strong>خطی بودن:</strong> آیا نقطه‌ها از یک خط <em>راست</em> پیروی می‌کنند و نه یک منحنی؟</li><li><strong>برابری واریانس:</strong> آیا اشتباه‌ها برای X کوچک و بزرگ تقریباً هم‌اندازه‌اند یا بادبزنی باز می‌شوند؟</li><li><strong>استقلال:</strong> آیا هر سطر رویداد خودش است (بدون کپی، و بدون ماهی که به ماه بعد نشت کند)؟</li><li><strong>نرمال بودن:</strong> آیا خطاها بیشتر کوچک‌اند، با چند خطای بزرگ‌تر در دو طرف، شبیه زنگوله؟</li></ol>',
  ),
]

export const assumptionsEnd: Block[] = [
  html(
    '<h3>What a residual plot looks like, good and bad</h3><ul><li><strong>Good:</strong> dots scattered randomly above and below zero, with no pattern and no fan. The line is doing its job.</li><li><strong>A curve (a smile or a frown):</strong> the relationship is not straight. A straight line will be wrong at the ends.</li><li><strong>A fan (wider to the right):</strong> the misses grow with X, so predictions for large X are less reliable than for small X.</li><li><strong>One dot far from the rest:</strong> check that row first. It may be a data error (Week 5) or a genuinely unusual month.</li></ul>',
    '<h3>كيف يبدو مخطط البواقي، جيدًا وسيئًا</h3><ul><li><strong>جيد:</strong> نقاط متناثرة عشوائيًا فوق الصفر وتحته، بلا نمط وبلا مروحة. الخط يؤدي عمله.</li><li><strong>منحنى (ابتسامة أو عبوس):</strong> العلاقة ليست مستقيمة. سيخطئ الخط المستقيم عند الطرفين.</li><li><strong>مروحة (أعرض نحو اليمين):</strong> تكبر الأخطاء مع X، فالتنبؤات لقيم X الكبيرة أقل موثوقية منها للصغيرة.</li><li><strong>نقطة بعيدة عن البقية:</strong> افحص ذلك الصف أولًا. قد يكون خطأ في البيانات (الأسبوع 5) أو شهرًا غير عادي فعلًا.</li></ul>',
    '<h3>نمودار باقی‌مانده چه شکلی دارد، خوب و بد</h3><ul><li><strong>خوب:</strong> نقطه‌های پراکنده تصادفی بالا و پایین صفر، بدون الگو و بدون بادبزن. خط کارش را درست انجام می‌دهد.</li><li><strong>یک منحنی (لبخند یا اخم):</strong> رابطه راست نیست. خط راست در دو انتها غلط خواهد بود.</li><li><strong>یک بادبزن (به راست پهن‌تر):</strong> اشتباه‌ها با X بزرگ می‌شوند، پس پیش‌بینی برای X بزرگ کمتر از X کوچک قابل اتکاست.</li><li><strong>یک نقطهٔ دور از بقیه:</strong> اول آن سطر را بررسی کن. ممکن است خطای داده باشد (هفتهٔ ۵) یا ماهی واقعاً غیرمعمول.</li></ul>',
  ),
  recap(
    t('The assumptions describe the road the numbers drive on.', 'الافتراضات تصف الطريق الذي تسير عليه الأرقام.', 'فرض‌ها جاده‌ای را توصیف می‌کنند که عددها روی آن حرکت می‌کنند.'),
    t('A residual plot is the quickest check: random scatter around zero is good news.', 'مخطط البواقي أسرع فحص: التناثر العشوائي حول الصفر خبر جيد.', 'نمودار باقی‌مانده سریع‌ترین بررسی است: پراکندگی تصادفی دور صفر خبر خوبی است.'),
    t('A curve, a fan or a far-away dot means: look closer before you trust the line.', 'المنحنى أو المروحة أو النقطة البعيدة تعني: دقّق قبل أن تثق بالخط.', 'منحنی، بادبزن یا نقطهٔ دور یعنی: پیش از اعتماد به خط دقیق‌تر نگاه کن.'),
  ),
]

// ---------- Section 7: multiple regression ----------
export const multipleStart: Block[] = [
  analogy(
    '<p>Imagine two customers who are twins in everything except one thing: the same salary and the same number of children, but one received 12 catalogs and the other 6. The difference in what they spend is the catalogs\' own effect, <em>"controlling for"</em> salary and children. That is the question every coefficient in a multiple regression answers: one more of this X, with the others held the same.</p>',
    '<p>تخيّل عميلين توأمين في كل شيء إلا شيئًا واحدًا: الراتب نفسه وعدد الأطفال نفسه، لكن أحدهما تلقّى 12 كتالوجًا والآخر 6. الفرق في ما ينفقانه هو أثر الكتالوجات نفسها، <em>"مع التحكم في"</em> الراتب وعدد الأطفال. وهذا هو السؤال الذي يجيب عنه كل معامل في الانحدار المتعدد: وحدة أكثر من هذا X، مع بقاء الباقي كما هو.</p>',
    '<p>دو مشتری را تصور کن که در همه‌چیز جز یک چیز دوقلوی هم‌اند: حقوق یکسان و تعداد فرزند یکسان، اما یکی ۱۲ کاتالوگ گرفته و دیگری ۶. تفاوت خرجشان اثر خود کاتالوگ‌هاست، <em>«با کنترل»</em> حقوق و فرزند. هر ضریب در رگرسیون چندگانه به همین پرسش پاسخ می‌دهد: یک واحد بیشتر از این X، در حالی که بقیه یکسان می‌مانند.</p>',
  ),
]

export const multipleDeck: Block[] = [
  html(
    '<h3>A bigger case: more columns for the direct-marketing firm</h3><p>Salary alone explained about half of the spending. What happens when we also use how many catalogs were sent and how many children the customer has?</p>',
    '<h3>حالة أكبر: أعمدة أكثر لشركة التسويق المباشر</h3><p>فسّر الراتب وحده نحو نصف الإنفاق. ماذا يحدث حين نستخدم أيضًا عدد الكتالوجات المرسلة وعدد أطفال العميل؟</p>',
    '<h3>یک نمونهٔ بزرگ‌تر: ستون‌های بیشتر برای شرکت بازاریابی مستقیم</h3><p>حقوق به‌تنهایی حدود نصف خرج را توضیح می‌داد. وقتی تعداد کاتالوگ‌های ارسالی و تعداد فرزندان مشتری را هم به کار ببریم چه می‌شود؟</p>',
  ),
  figure(
    15,
    t('The multiple regression equation: one coefficient for each X', 'معادلة الانحدار المتعدد: معامل لكل X', 'معادلهٔ رگرسیون چندگانه: یک ضریب برای هر X'),
    '/figures/week-06/deck-11-formula-multiple.png',
    'The equation y = β0 + β1X1 + … + βnXn + ε from the original lesson, each part circled in its own colour, with a legend explaining y, the intercept, the coefficient of the first variable, the dots meaning "the same for every other variable", the last coefficient and the model error.',
    fromDeck(
      'The same sentence as before, with one more "β × x" part for every extra X.',
      'الجملة نفسها كما قبل، مع جزء "β × x" إضافي لكل X إضافي.',
      'همان جملهٔ قبل، با یک بخش «β × x» بیشتر برای هر X اضافه.',
    ),
  ),
  figure(
    16,
    t('Direct Marketing with Salary, Catalogs and Children together', 'التسويق المباشر بالراتب والكتالوجات والأطفال معًا', 'بازاریابی مستقیم با حقوق، کاتالوگ و فرزند با هم'),
    '/figures/week-06/deck-12-output-multiple.png',
    'Excel Summary Output with R Square 0.658435 and 1,000 observations. The coefficient table shows Intercept -442.7579, Catalogs 47.69532, Salary 0.020406 and Children -198.6947. Grey callouts read each coefficient using the words controlling for the others, and the equation AmountSpent = -442.76 + 47.7 × Catalog + 0.02 × Salary - 198.69 × Children + ε is shown.',
    fromDeck(
      'R Square rises from 0.4894 (Salary alone) to 0.6584. Each callout reads one coefficient "controlling for" the others.',
      'يرتفع R Square من 0.4894 (الراتب وحده) إلى 0.6584. وكل شرح يقرأ معاملًا واحدًا "مع التحكم في" الباقي.',
      'R Square از ۰٫۴۸۹۴ (فقط حقوق) به ۰٫۶۵۸۴ می‌رسد. هر توضیح یک ضریب را «با کنترل» بقیه می‌خواند.',
    ),
  ),
  {
    type: 'table',
    headers: [t('Variable', 'المتغير', 'متغیر'), t('Coefficient', 'المعامل', 'ضریب'), t('Read it as…', 'اقرأه هكذا…', 'این‌طور بخوانش…')],
    rows: [
      [t('Intercept', 'المقطع', 'عرض از مبدأ'), cell('−442.76', '‎−442.76', '‎−۴۴۲٫۷۶'), t('A customer with $0 salary, 0 catalogs and 0 children: not a real customer, so just the starting point', 'عميل براتب 0 دولار و0 كتالوج و0 طفل: ليس عميلًا حقيقيًا، فهو مجرد نقطة البداية', 'مشتری‌ای با حقوق ۰ دلار، ۰ کاتالوگ و ۰ فرزند: مشتری واقعی نیست، پس فقط نقطهٔ شروع است')],
      [t('Catalogs', 'الكتالوجات', 'کاتالوگ‌ها'), cell('+47.70', '‎+47.70', '‎+۴۷٫۷۰'), t('Controlling for salary and children, one more catalog goes with $47.70 more spending', 'مع التحكم في الراتب والأطفال، كتالوج إضافي يقابله 47.70 دولارًا إنفاقًا أكثر', 'با کنترل حقوق و فرزند، یک کاتالوگ بیشتر با ۴۷٫۷۰ دلار خرج بیشتر همراه است')],
      [t('Salary', 'الراتب', 'حقوق'), cell('+0.0204', '‎+0.0204', '‎+۰٫۰۲۰۴'), t('Controlling for catalogs and children, each extra $1 of salary goes with about 2 cents more (about $20 per $1,000)', 'مع التحكم في الكتالوجات والأطفال، كل دولار إضافي من الراتب يقابله نحو سنتين أكثر (نحو 20 دولارًا لكل 1,000)', 'با کنترل کاتالوگ و فرزند، هر ۱ دلار حقوق بیشتر با حدود ۲ سنت بیشتر همراه است (حدود ۲۰ دلار برای هر ۱٬۰۰۰)')],
      [t('Children', 'الأطفال', 'فرزندان'), cell('−198.69', '‎−198.69', '‎−۱۹۸٫۶۹'), t('Controlling for catalogs and salary, each extra child goes with $198.69 less spending', 'مع التحكم في الكتالوجات والراتب، كل طفل إضافي يقابله 198.69 دولارًا إنفاقًا أقل', 'با کنترل کاتالوگ و حقوق، هر فرزند بیشتر با ۱۹۸٫۶۹ دلار خرج کمتر همراه است')],
    ],
  },
  html(
    '<h3>Predict by hand</h3><p>A customer with a <strong>$60,000 salary, 12 catalogs and 2 children</strong>: −442.76 + 47.70 × 12 + 0.0204 × 60,000 − 198.69 × 2 = −442.76 + 572.4 + 1,224 − 397.38 = about <strong>$956</strong>. With no children the same customer is predicted at about <strong>$1,354</strong>: the two children account for roughly $397 less. The model gives a number you can act on, and each part of it has a plain meaning.</p>',
    '<h3>تنبأ بيدك</h3><p>عميل <strong>براتب 60,000 دولار و12 كتالوجًا وطفلين</strong>: ‎−442.76 + 47.70 × 12 + 0.0204 × 60,000 − 198.69 × 2 = ‎−442.76 + 572.4 + 1,224 − 397.38 = نحو <strong>956 دولارًا</strong>. وبلا أطفال يُتنبأ للعميل نفسه بنحو <strong>1,354 دولارًا</strong>: أي إن الطفلين يفسّران نحو 397 دولارًا أقل. يعطيك النموذج رقمًا تتصرف على أساسه، ولكل جزء منه معنى بسيط.</p>',
    '<h3>دستی پیش‌بینی کن</h3><p>مشتری‌ای با <strong>حقوق ۶۰٬۰۰۰ دلار، ۱۲ کاتالوگ و ۲ فرزند</strong>: ‎−442.76 + 47.70 × 12 + 0.0204 × 60,000 − 198.69 × 2 = ‎−442.76 + 572.4 + 1,224 − 397.38 = حدود <strong>۹۵۶ دلار</strong>. بدون فرزند همین مشتری حدود <strong>۱٬۳۵۴ دلار</strong> پیش‌بینی می‌شود: دو فرزند حدود ۳۹۷ دلار کمتر را توضیح می‌دهند. مدل عددی می‌دهد که می‌شود بر پایهٔ آن تصمیم گرفت و هر بخشش معنای ساده‌ای دارد.</p>',
  ),
  html(
    '<h3>Why did R² go up, and when should you trust that?</h3><p>Adding a column can only help the line fit the rows you already have, so R² never goes down. Here the rise from 0.4894 to 0.6584 is real, because catalogs and children carry real information (their coefficients are far from zero). The jam stand\'s market_days column shows the opposite: R² stayed at 0.950 and <strong>adjusted R²</strong>, which charges a small penalty for every added X, fell. A new column has earned its place only when adjusted R² rises: in the lesson\'s table it goes from 0.4889 to 0.6574.</p>',
    '<h3>لماذا ارتفع R²، ومتى تثق بذلك؟</h3><p>إضافة عمود لا يمكن إلا أن تساعد الخط على ملاءمة الصفوف التي لديك، فلا ينخفض R² أبدًا. هنا الارتفاع من 0.4894 إلى 0.6584 حقيقي، لأن الكتالوجات والأطفال يحملان معلومات حقيقية (معاملاهما بعيدان عن الصفر). أما عمود market_days في كشك المربى فيُظهر العكس: بقي R² عند 0.950 و<strong>انخفض R² المعدّل</strong> الذي يفرض عقوبة صغيرة على كل X مضاف. لا يكسب العمود الجديد مكانه إلا حين يرتفع R² المعدّل: وفي جدول الدرس ينتقل من 0.4889 إلى 0.6574.</p>',
    '<h3>چرا R² بالا رفت و کی باید به آن اعتماد کرد؟</h3><p>افزودن یک ستون فقط می‌تواند به برازش خط روی سطرهایی که داری کمک کند، پس R² هرگز پایین نمی‌آید. اینجا افزایش از ۰٫۴۸۹۴ به ۰٫۶۵۸۴ واقعی است، چون کاتالوگ و فرزند اطلاعات واقعی دارند (ضریبشان از صفر دور است). ستون market_days غرفهٔ مربا عکس را نشان می‌دهد: R² روی ۰٫۹۵۰ ماند و <strong>R² تعدیل‌شده</strong> که برای هر X اضافه جریمهٔ کوچکی می‌گیرد پایین آمد. ستون تازه فقط وقتی جایش را کسب کرده که R² تعدیل‌شده بالا برود: در جدول درس از ۰٫۴۸۸۹ به ۰٫۶۵۷۴ می‌رسد.</p>',
  ),
  recap(
    t('Each coefficient answers: one more of this X, with the other Xs held the same.', 'كل معامل يجيب: وحدة أكثر من هذا X، مع بقاء المتغيرات الأخرى كما هي.', 'هر ضریب پاسخ می‌دهد: یک واحد بیشتر از این X، با ثابت ماندن Xهای دیگر.'),
    t('To predict, plug every X into the equation and add up the parts.', 'للتنبؤ، ضع كل X في المعادلة واجمع الأجزاء.', 'برای پیش‌بینی هر X را در معادله بگذار و بخش‌ها را جمع بزن.'),
    t('Keep a new column only if adjusted R² rises.', 'أبقِ العمود الجديد فقط إن ارتفع R² المعدّل.', 'ستون تازه را فقط اگر R² تعدیل‌شده بالا رفت نگه دار.'),
  ),
  { type: 'exercise', questionId: 'w06-q014' },
  { type: 'exercise', questionId: 'w06-q015' },
]

// ---------- New section: practice with the lesson's diamond data ----------
export const practiceDiamonds: Week['sections'][number] = {
  id: 'practice-diamonds',
  navLabel: t('Practice: diamonds', 'تدريب: الألماس', 'تمرین: الماس'),
  sectionLabel: t('Section 08', 'القسم ٠٨', 'بخش ۰۸'),
  timeEst: t('8 min', '٨ دقائق', '۸ دقیقه'),
  headingHtml: t(
    '<h2>Practice: price a diamond from its weight</h2><p class="standfirst">A last case from the lesson, to run the whole routine on data you have not seen: fit the line, read it in three sentences, and make a prediction.</p>',
    '<h2>تدريب: قدّر سعر ألماسة من وزنها</h2><p class="standfirst">حالة أخيرة من الدرس، لتشغّل الروتين كله على بيانات لم ترها: لائم الخط، واقرأه في ثلاث جمل، وأجرِ تنبؤًا.</p>',
    '<h2>تمرین: قیمت یک الماس را از وزنش حدس بزن</h2><p class="standfirst">آخرین نمونه از درس، تا کل روال را روی داده‌ای که ندیده‌ای اجرا کنی: خط را برازش کن، در سه جمله بخوانش و یک پیش‌بینی بکن.</p>',
  ),
  blocks: [
    html(
      '<p>The lesson\'s assignment gives a dataset of diamonds (carat, cut, color, clarity, depth, table, price and size). The task has three parts: <strong>1.</strong> fit a simple regression with <em>Price</em> as Y and <em>Carat</em> as X; <strong>2.</strong> find R² and interpret it; <strong>3.</strong> interpret the slope. Try it on paper first: what would you expect the slope to look like, large or small?</p>',
      '<p>يعطي واجب الدرس مجموعة بيانات ألماس (carat وcut وcolor وclarity وdepth وtable وprice والأبعاد). للمهمة ثلاثة أجزاء: <strong>1.</strong> لائم انحدارًا بسيطًا بـ <em>Price</em> كـ Y و<em>Carat</em> كـ X؛ <strong>2.</strong> أوجد R² وفسّره؛ <strong>3.</strong> فسّر الميل. جرّبه على الورق أولًا: كيف تتوقع أن يبدو الميل، كبيرًا أم صغيرًا؟</p>',
      '<p>تکلیف درس یک مجموعه‌داده از الماس‌ها می‌دهد (carat، cut، color، clarity، depth، table، price و اندازه). کار سه بخش دارد: <strong>۱.</strong> یک رگرسیون ساده با <em>Price</em> به‌عنوان Y و <em>Carat</em> به‌عنوان X برازش کن؛ <strong>۲.</strong> R² را پیدا کن و تفسیرش کن؛ <strong>۳.</strong> شیب را تفسیر کن. اول روی کاغذ امتحان کن: انتظار داری شیب بزرگ باشد یا کوچک؟</p>',
    ),
    figure(
      17,
      t('The diamond data (first rows)', 'بيانات الألماس (الصفوف الأولى)', 'دادهٔ الماس (سطرهای اول)'),
      '/figures/week-06/deck-13-diamond-table.png',
      'Table of diamond data with columns carat, cut, color, clarity, depth, table, price, x, y and z, showing five rows such as carat 0.23, cut Ideal, color E, clarity SI2, price 326.',
      fromDeck(
        'Price (Y) is the number to predict; carat (X) is the weight. Same steps as Section 4: Data Analysis, Regression, Input Y Range = price, Input X Range = carat, tick Labels.',
        'Price (Y) هو الرقم المراد التنبؤ به؛ وcarat (X) هو الوزن. الخطوات نفسها في القسم 4: Data Analysis ثم Regression، وInput Y Range = price، وInput X Range = carat، وفعّل Labels.',
        'Price (Y) عددی است که باید پیش‌بینی شود؛ carat (X) وزن است. همان گام‌های بخش ۴: Data Analysis، Regression، Input Y Range = price، Input X Range = carat و Labels را تیک بزن.',
      ),
    ),
    analogy(
      '<p>Fruit is sold by the kilo. The slope is the price per kilo: every extra kilo on the scale adds that much to the bill. For diamonds the "kilo" is the carat, and the regression tells you how much one more carat adds to the price, on average.</p>',
      '<p>تُباع الفاكهة بالكيلو. والميل هو سعر الكيلو: كل كيلو إضافي على الميزان يضيف هذا المقدار إلى الفاتورة. وفي الألماس "الكيلو" هو القيراط، ويخبرك الانحدار كم يضيف قيراط إضافي إلى السعر في المتوسط.</p>',
      '<p>میوه را کیلویی می‌فروشند. شیب قیمت هر کیلو است: هر کیلو اضافه روی ترازو همین‌قدر به صورت‌حساب اضافه می‌کند. در الماس «کیلو» قیراط است و رگرسیون می‌گوید یک قیراط بیشتر به‌طور میانگین چقدر به قیمت اضافه می‌کند.</p>',
    ),
    figure(
      18,
      t('The lesson\'s answer: R² and the carat slope', 'إجابة الدرس: R² وميل carat', 'پاسخ درس: R² و شیب carat'),
      '/figures/week-06/deck-14-diamond-answer.png',
      'Excel Summary Output for Price against carat with 100 observations. A red box marks R Square 0.9070892 and another marks the carat coefficient 4329.88535 (intercept -731.064). Grey callouts say about 90.71% of the variability in Price is explained by Carat, and that one more carat is predicted to increase the price.',
      fromDeck(
        '100 diamonds. Carat explains about 90.7% of the variation in price, and the carat coefficient is 4329.89. (The lesson\'s callout writes $4329.86; the table beside it prints 4329.88535, which is $4,329.89.)',
        '100 ألماسة. يفسّر carat نحو 90.7% من تغيّر السعر، ومعامل carat هو 4329.89. (يكتب شرح الدرس 4329.86 دولارًا؛ أما الجدول بجانبه فيطبع 4329.88535، أي 4,329.89 دولارًا.)',
        '۱۰۰ الماس. carat حدود ۹۰٫۷٪ از تغییرات قیمت را توضیح می‌دهد و ضریب carat برابر ۴۳۲۹٫۸۹ است. (توضیح درس ۴۳۲۹٫۸۶ دلار نوشته؛ جدول کنارش ۴۳۲۹٫۸۸۵۳۵ چاپ می‌کند که ۴٬۳۲۹٫۸۹ دلار است.)',
      ),
    ),
    html(
      '<h3>Reading it in three sentences</h3><ul><li><strong>R² = 0.9071.</strong> About 90.7% of the variation in price is explained by carat: a very strong line.</li><li><strong>Slope = 4,329.89.</strong> Each extra carat goes with about <strong>$4,330 more</strong> in price, on average (so an extra tenth of a carat is about $433).</li><li><strong>Intercept = −731.06.</strong> A diamond of 0 carats would cost −$731, which is nonsense: no diamond weighs 0 carats, so the intercept only positions the line.</li></ul><p><strong>A prediction:</strong> a 1-carat diamond is predicted at −731.06 + 4,329.89 = <strong>$3,598.82</strong>. <strong>A check against the first row:</strong> a 0.23-carat diamond that really cost $326 is predicted at −731.06 + 4,329.89 × 0.23 = $264.81, so its error is +$61.19. The line under-predicts the small diamonds, a hint worth a look at the residual plot (Section 6).</p>',
      '<h3>قراءتها في ثلاث جمل</h3><ul><li><strong>R² = 0.9071.</strong> يُفسَّر نحو 90.7% من تغيّر السعر بالقيراط: خط قوي جدًا.</li><li><strong>الميل = 4,329.89.</strong> كل قيراط إضافي يقابله نحو <strong>4,330 دولارًا زيادة</strong> في السعر، في المتوسط (أي إن عُشر قيراط إضافي نحو 433 دولارًا).</li><li><strong>المقطع = ‎−731.06.</strong> ألماسة وزنها 0 قيراط سيكون سعرها ‎−731 دولارًا، وهذا كلام بلا معنى: لا توجد ألماسة وزنها 0 قيراط، فالمقطع يحدد موضع الخط فقط.</li></ul><p><strong>تنبؤ:</strong> يُتنبأ لألماسة وزنها قيراط واحد بـ ‎−731.06 + 4,329.89 = <strong>3,598.82 دولارًا</strong>. <strong>مقارنة مع الصف الأول:</strong> ألماسة وزنها 0.23 قيراط كلّفت فعلًا 326 دولارًا يُتنبأ لها بـ ‎−731.06 + 4,329.89 × 0.23 = 264.81 دولارًا، فخطؤها ‎+61.19 دولارًا. يقلّل الخط من تقدير الألماسات الصغيرة، وهي إشارة تستحق نظرة على مخطط البواقي (القسم 6).</p>',
      '<h3>خواندن در سه جمله</h3><ul><li><strong>R² = ۰٫۹۰۷۱.</strong> حدود ۹۰٫۷٪ از تغییرات قیمت را carat توضیح می‌دهد: خطی بسیار قوی.</li><li><strong>شیب = ۴٬۳۲۹٫۸۹.</strong> هر قیراط بیشتر به‌طور میانگین با حدود <strong>۴٬۳۳۰ دلار قیمت بیشتر</strong> همراه است (یعنی یک‌دهم قیراط بیشتر حدود ۴۳۳ دلار).</li><li><strong>عرض از مبدأ = ‎−۷۳۱٫۰۶.</strong> الماسی با وزن ۰ قیراط ‎−۷۳۱ دلار قیمت می‌داشت که بی‌معناست: هیچ الماسی وزن ۰ قیراط ندارد، پس عرض از مبدأ فقط جای خط را مشخص می‌کند.</li></ul><p><strong>یک پیش‌بینی:</strong> الماس ۱ قیراطی ‎−731.06 + 4,329.89 = <strong>۳٬۵۹۸٫۸۲ دلار</strong> پیش‌بینی می‌شود. <strong>سنجش با سطر اول:</strong> الماس ۰٫۲۳ قیراطی که واقعاً ۳۲۶ دلار بود ‎−731.06 + 4,329.89 × 0.23 = ۲۶۴٫۸۱ دلار پیش‌بینی می‌شود، پس خطایش ‎+۶۱٫۱۹ دلار است. خط الماس‌های کوچک را کمتر پیش‌بینی می‌کند که نشانه‌ای است که ارزش یک نگاه به نمودار باقی‌مانده را دارد (بخش ۶).</p>',
    ),
    box(
      'keypoint',
      t('A strong line is still not the whole story', 'الخط القوي ليس القصة كلها', 'خط قوی هم کل ماجرا نیست'),
      '<p>R² = 0.91 says carat is the main thing moving price, not that it is the only one. Cut, colour and clarity matter too; adding them is a job for multiple regression (Section 7), and "goes with" is still safer wording than "causes".</p>',
      '<p>يقول R² = 0.91 إن القيراط هو الشيء الرئيسي الذي يحرّك السعر، لا إنه الوحيد. فالقطع واللون والنقاء مهمة أيضًا؛ وإضافتها مهمة للانحدار المتعدد (القسم 7)، وتبقى عبارة "يقابله" أسلم من "يسبّب".</p>',
      '<p>R² = ۰٫۹۱ می‌گوید carat چیز اصلی است که قیمت را جابه‌جا می‌کند، نه اینکه تنها چیز است. برش، رنگ و شفافیت هم مهم‌اند؛ افزودن‌شان کار رگرسیون چندگانه است (بخش ۷) و «همراه است» هنوز امن‌تر از «باعث می‌شود» است.</p>',
    ),
    recap(
      t('Same routine every time: fit, read three sentences, predict.', 'الروتين نفسه كل مرة: لائم، واقرأ ثلاث جمل، وتنبأ.', 'هر بار همان روال: برازش، سه جمله خواندن، پیش‌بینی.'),
      t('Slope in plain words: each extra carat goes with about $4,330 more.', 'الميل بكلمات بسيطة: كل قيراط إضافي يقابله نحو 4,330 دولارًا أكثر.', 'شیب به زبان ساده: هر قیراط بیشتر با حدود ۴٬۳۳۰ دلار بیشتر همراه است.'),
      t('Check a prediction against a real row to see where the line is off.', 'قارن تنبؤًا بصف حقيقي لترى أين يخطئ الخط.', 'یک پیش‌بینی را با یک سطر واقعی بسنج تا ببینی خط کجا اشتباه می‌کند.'),
    ),
    { type: 'exercise', questionId: 'w06-q016' },
  ],
}

// ---------- Sections 8-10: cautions, AI corner, worked example ----------
export const cautionsStart: Block[] = [
  analogy(
    '<p>Ice-cream sales and sunburns both rise in summer, so a regression would happily link them. Ice cream does not cause sunburn: the sun causes both. That is why "goes with" is the honest wording. And a child\'s height chart can predict next year\'s height, but extending the line to age 40 would give a giant: a line is only safe inside the range of the data it was built from.</p>',
    '<p>ترتفع مبيعات الآيس كريم وحروق الشمس كلاهما في الصيف، فسيربط بينهما الانحدار بكل سرور. لا يسبّب الآيس كريم حروق الشمس: الشمس تسبّب الاثنين. ولهذا تبقى عبارة "يقابله" هي الصادقة. ويستطيع مخطط طول الطفل التنبؤ بطوله العام القادم، لكن مدّ الخط إلى سن الأربعين سيعطي عملاقًا: الخط آمن فقط ضمن مدى البيانات التي بُني منها.</p>',
    '<p>فروش بستنی و آفتاب‌سوختگی هر دو در تابستان بالا می‌روند و رگرسیون با کمال میل آن‌ها را به هم وصل می‌کند. بستنی باعث آفتاب‌سوختگی نمی‌شود: آفتاب باعث هر دو می‌شود. برای همین «همراه است» تعبیر صادقانه است. نمودار قد کودک می‌تواند قد سال بعد را پیش‌بینی کند، اما کشیدن خط تا ۴۰ سالگی یک غول می‌دهد: خط فقط داخل بازهٔ دادهٔ ساخته‌شدنش امن است.</p>',
  ),
]

export const cautionsEnd: Block[] = [
  recap(
    t('"Goes with", not "causes".', '"يقابله"، لا "يسبّب".', '«همراه است»، نه «باعث می‌شود».'),
    t('Stay inside the range of the data you fitted.', 'ابقَ ضمن مدى البيانات التي لائمتها.', 'داخل بازهٔ دادهٔ برازش‌شده بمان.'),
    t('A high R² is a reason to look closer, not a reason to stop checking.', 'R² المرتفع سبب للتدقيق أكثر لا سبب للتوقف عن التحقق.', 'R² بالا دلیلی است که دقیق‌تر نگاه کنی، نه دلیلی که بررسی را متوقف کنی.'),
  ),
]

export const aiRecap: Block[] = [
  recap(
    t('Let the AI run the numbers, but verify one with =SLOPE or =RSQ yourself.', 'دع الذكاء الاصطناعي يحسب، لكن تحقق من رقم واحد بنفسك بـ =SLOPE أو =RSQ.', 'بگذار هوش مصنوعی حساب کند، اما یک عدد را خودت با =SLOPE یا =RSQ بسنج.'),
    t('Rewrite its conclusions in your own safe words.', 'أعد كتابة استنتاجاته بكلماتك الآمنة.', 'نتیجه‌گیری‌هایش را با واژه‌های امن خودت دوباره بنویس.'),
  ),
]

export const workedRecap: Block[] = [
  html(
    '<h3>How the note is built</h3><p>Three moves, in this order: <strong>1. the decision</strong> (plan production from the forecast), <strong>2. the number with its margin</strong> (about 75 jars at 20 °C, give or take about 8), <strong>3. what you cannot conclude</strong> (no proof that heat causes sales, nothing beyond 4–27 °C). A manager can act on the first, trust the second and will not be misled by the third.</p>',
    '<h3>كيف تُبنى الملاحظة</h3><p>ثلاث حركات بهذا الترتيب: <strong>1. القرار</strong> (خطّط للإنتاج من التوقعات)، <strong>2. الرقم مع هامشه</strong> (نحو 75 برطمانًا عند 20 °م، زيادة أو نقصانًا بنحو 8)، <strong>3. ما لا يمكنك استنتاجه</strong> (لا دليل على أن الحرارة تسبّب المبيعات، ولا شيء خارج 4–27 °م). يستطيع المدير أن يتصرف على الأول، ويثق بالثاني، ولن يضلله الثالث.</p>',
    '<h3>یادداشت چطور ساخته می‌شود</h3><p>سه حرکت، به این ترتیب: <strong>۱. تصمیم</strong> (تولید را از روی پیش‌بینی برنامه‌ریزی کن)، <strong>۲. عدد با حاشیه‌اش</strong> (حدود ۷۵ شیشه در ۲۰ درجه، با حدود ۸ بالا و پایین)، <strong>۳. آنچه نمی‌توانی نتیجه بگیری</strong> (دلیلی نیست که گرما باعث فروش می‌شود، و چیزی بیرون از ۴ تا ۲۷ درجه). مدیر می‌تواند بر اساس اولی عمل کند، به دومی اعتماد کند و سومی گمراهش نمی‌کند.</p>',
  ),
]
