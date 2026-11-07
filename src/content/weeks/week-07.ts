// Authored for the React app from the original Week 7 deck ("Week 7 HypothesisTesting", 21 slides), saved as
// public/originals/week-07.pdf. Kept simple on purpose, in the same shape as the other weeks: one idea per section,
// one everyday analogy, one tiny example with real numbers, an "In one minute" recap and a quick check.
// The deck's own images were extracted from the PDF (public/figures/week-07/deck-NN-*.jpg). Not reused on purpose:
// slide 9's significance-level curve (294 px wide, too blurry; redrawn as diagram-01.svg), slide 13 (a frame of a
// YouTube video with a subscribe badge; its numbers are rebuilt and the video is linked) and slides 14/21 (pictures
// of text, written out as text).
// Added beyond the deck: the jam stand examples, the coin example, the courtroom table of mistakes, and the short
// "Two groups" section, because every final-project case card compares two groups (two averages or two rates).
// Deck slips corrected quietly, not copied:
//  - Slide 18 calls 1 - α = 0.95 a "p_value"; it is the area to the left of z-critical.
//  - Slide 20 writes 20/√81 = 2.2; it is 2.22, and 8 / 2.22 = 3.6 (8 / 2.2 would be 3.64).
//  - Slide 7 writes p for the left-handed proportion, which clashes with the p-value; the page says "proportion".
//  - Slide 12 says the population "mean and variance are known"; what the z-test needs is the population σ.
// Every number was computed by script (scipy, statsmodels) and the Excel formulas were recalculated in LibreOffice.
// Python cells live in week07Code.ts and public/notebooks/week-07-hypothesis-testing.ipynb.
// ar/fa are draft translations awaiting native review, like the earlier weeks. Code and formulas stay English.
import type { Block, Localized, Question, Week } from '../types'
import { week07Homework } from './homework/week-07'
import { py, xl } from './week07Code'

const notebookUrl =
  'https://colab.research.google.com/github/PA-WiT/BA2/blob/main/public/notebooks/week-07-hypothesis-testing.ipynb'
const videoUrl = 'https://www.youtube.com/watch?v=QfiJ3kQxx2o'

const t = (en: string, ar: string, fa: string): Localized => ({ en, ar, fa })
const q = t
const faDigits = (n: number) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])
const html = (en: string, ar: string, fa: string): Block => ({ type: 'html', html: t(en, ar, fa) })
const code = (c: string): Block => ({ type: 'code', code: c })
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
const exercise = (id: string): Block => ({ type: 'exercise', questionId: id })
const fromDeck = (en: string, ar: string, fa: string) => t(`From the original lesson. ${en}`, `من الدرس الأصلي. ${ar}`, `از درس اصلی. ${fa}`)

/** The same step in two tools (the other weeks' stacked tabs). */
const tools = (excel: Block[], python: Block[]): Block => ({
  type: 'tabs',
  tabs: [
    { label: t('Excel', 'Excel', 'Excel'), blocks: excel },
    { label: t('Python (Colab)', 'Python ‏(Colab)', 'Python ‏(Colab)'), blocks: python },
  ],
})

const questions: Question[] = [
  {
    id: 'w07-q001',
    weekId: 'week-07',
    topic: 'welcome',
    answer: 1,
    prompt: q(
      'In the courtroom analogy, what plays the role of "innocent until proven guilty"?',
      'في تشبيه المحكمة، ما الذي يؤدي دور "بريء حتى تثبت إدانته"؟',
      'در تشبیه دادگاه، چه چیزی نقش «بی‌گناه تا وقتی گناهش ثابت شود» را دارد؟',
    ),
    options: [
      q('The alternative hypothesis', 'الفرضية البديلة', 'فرض مقابل'),
      q('The null hypothesis: nothing special is going on', 'الفرضية الصفرية: لا شيء مميز يحدث', 'فرض صفر: هیچ اتفاق خاصی نمی‌افتد'),
      q('The p-value', 'قيمة p', 'مقدار p'),
    ],
  },
  {
    id: 'w07-q002',
    weekId: 'week-07',
    topic: 'null-alternative',
    answer: 0,
    prompt: q(
      'The owner asks: "Do tasting days sell more jars?" Which sentence is the null hypothesis?',
      'يسأل المالك: "هل تبيع أيام التذوق برطمانات أكثر؟" أي جملة هي الفرضية الصفرية؟',
      'صاحب غرفه می‌پرسد: «آیا روزهای مزه‌کردن شیشهٔ بیشتری می‌فروشند؟» کدام جمله فرض صفر است؟',
    ),
    options: [
      q('Tasting days sell no more jars than other days', 'أيام التذوق لا تبيع برطمانات أكثر من الأيام الأخرى', 'روزهای مزه‌کردن بیشتر از روزهای دیگر نمی‌فروشند'),
      q('Tasting days sell more jars than other days', 'أيام التذوق تبيع برطمانات أكثر من الأيام الأخرى', 'روزهای مزه‌کردن بیشتر از روزهای دیگر می‌فروشند'),
      q('Tasting days sell exactly 10 more jars', 'أيام التذوق تبيع 10 برطمانات أكثر بالضبط', 'روزهای مزه‌کردن دقیقاً ۱۰ شیشه بیشتر می‌فروشند'),
    ],
  },
  {
    id: 'w07-q003',
    weekId: 'week-07',
    topic: 'tails',
    answer: 1,
    prompt: q('Which question needs a left-tailed test?', 'أي سؤال يحتاج إلى اختبار بذيل أيسر؟', 'کدام پرسش آزمون دنبالهٔ چپ لازم دارد؟'),
    options: [
      q('Are the jars heavier than 340 g?', 'هل البرطمانات أثقل من 340 غرامًا؟', 'آیا شیشه‌ها از ۳۴۰ گرم سنگین‌ترند؟'),
      q('Are the jars lighter than 340 g?', 'هل البرطمانات أخف من 340 غرامًا؟', 'آیا شیشه‌ها از ۳۴۰ گرم سبک‌ترند؟'),
      q('Do the jars weigh something different from 340 g?', 'هل يختلف وزن البرطمانات عن 340 غرامًا؟', 'آیا وزن شیشه‌ها با ۳۴۰ گرم فرق دارد؟'),
    ],
  },
  {
    id: 'w07-q004',
    weekId: 'week-07',
    topic: 'tails',
    answer: 2,
    prompt: q(
      '"Is the average order different from €20?" Which test fits?',
      '"هل يختلف متوسط الطلب عن 20 يورو؟" أي اختبار يناسب؟',
      '«آیا میانگین سفارش با ۲۰ یورو فرق دارد؟» کدام آزمون مناسب است؟',
    ),
    options: [
      q('Right-tailed', 'بذيل أيمن', 'دنبالهٔ راست'),
      q('Left-tailed', 'بذيل أيسر', 'دنبالهٔ چپ'),
      q('Two-tailed: "different" can mean higher or lower', 'بذيلين: "يختلف" قد تعني أعلى أو أقل', 'دو دنباله: «فرق دارد» یعنی بیشتر یا کمتر'),
    ],
  },
  {
    id: 'w07-q005',
    weekId: 'week-07',
    topic: 'significance',
    answer: 0,
    prompt: q(
      'A smoke alarm goes off because of burnt toast, not a fire. In test words, this is…',
      'ينطلق إنذار الدخان بسبب خبز محمّص محترق لا بسبب حريق. بلغة الاختبار، هذا…',
      'آژیر دود به‌خاطر نان سوخته به صدا درمی‌آید، نه آتش. به زبان آزمون، این…',
    ),
    options: [
      q('A Type I error: a false alarm, rejecting H₀ when it was true', 'خطأ من النوع الأول: إنذار كاذب، رفض H₀ وهي صحيحة', 'خطای نوع اول: هشدار اشتباه، رد H₀ وقتی درست بود'),
      q('A Type II error: a missed fire', 'خطأ من النوع الثاني: حريق فائت', 'خطای نوع دوم: آتشی که دیده نشد'),
      q('A correct decision', 'قرار صحيح', 'تصمیم درست'),
    ],
  },
  {
    id: 'w07-q006',
    weekId: 'week-07',
    topic: 'significance',
    answer: 1,
    prompt: q('When should you choose the significance level α?', 'متى يجب أن تختار مستوى الدلالة α؟', 'سطح معناداری α را کی باید انتخاب کرد؟'),
    options: [
      q('After seeing the p-value, so the result comes out significant', 'بعد رؤية قيمة p حتى تخرج النتيجة دالة', 'پس از دیدن مقدار p، تا نتیجه معنادار شود'),
      q('Before looking at the data', 'قبل النظر إلى البيانات', 'پیش از نگاه کردن به داده'),
      q('It does not matter when', 'لا يهم متى', 'فرقی نمی‌کند کی'),
    ],
  },
  {
    id: 'w07-q007',
    weekId: 'week-07',
    topic: 'p-value',
    answer: 0,
    prompt: q(
      'A test gives p = 0.03 and you chose α = 0.05. What do you decide?',
      'يعطي اختبار p = 0.03 وقد اخترت α = 0.05. ماذا تقرر؟',
      'یک آزمون p = ۰٫۰۳ می‌دهد و α = ۰٫۰۵ را انتخاب کرده‌ای. چه تصمیمی می‌گیری؟',
    ),
    options: [
      q('Reject H₀: the result would be surprising if nothing were going on', 'ارفض H₀: النتيجة ستكون مفاجئة لو لم يكن هناك شيء', 'H₀ را رد کن: اگر هیچ اتفاقی نمی‌افتاد، این نتیجه غافلگیرکننده بود'),
      q('Accept H₀ as proven', 'اقبل H₀ كأمر مثبت', 'H₀ را ثابت‌شده بپذیر'),
      q('Nothing: 0.03 is almost zero, so the test failed', 'لا شيء: 0.03 تقريبًا صفر، فالاختبار فشل', 'هیچ: ۰٫۰۳ تقریباً صفر است، پس آزمون شکست خورد'),
    ],
  },
  {
    id: 'w07-q008',
    weekId: 'week-07',
    topic: 'p-value',
    answer: 1,
    prompt: q(
      'A coin shows 9 heads in 10 flips, and p = 0.0107. What does that p-value say?',
      'تُظهر عملة 9 صور في 10 رميات، وقيمة p = 0.0107. ماذا تقول قيمة p هذه؟',
      'یک سکه در ۱۰ پرتاب ۹ بار شیر می‌آید و p = ۰٫۰۱۰۷. این مقدار p چه می‌گوید؟',
    ),
    options: [
      q('The coin is fair with a probability of 1.07%', 'العملة عادلة باحتمال 1.07%', 'سکه با احتمال ۱٫۰۷٪ سالم است'),
      q('If the coin were fair, 9 or more heads would happen only about 1 time in 100', 'لو كانت العملة عادلة لظهرت 9 صور أو أكثر نحو مرة واحدة من كل 100 فقط', 'اگر سکه سالم بود، ۹ شیر یا بیشتر فقط حدود ۱ بار در ۱۰۰ بار رخ می‌داد'),
      q('The coin lands heads 1.07% of the time', 'تسقط العملة على الصورة 1.07% من المرات', 'سکه ۱٫۰۷٪ مواقع شیر می‌آید'),
    ],
  },
  {
    id: 'w07-q009',
    weekId: 'week-07',
    topic: 'z-test',
    answer: 0,
    prompt: q(
      'In z = (x̄ − μ) / (σ / √n), what does the bottom part (σ / √n) measure?',
      'في z = (x̄ − μ) / (σ / √n)، ماذا يقيس الجزء السفلي (σ / √n)؟',
      'در z = (x̄ − μ) / (σ / √n)، بخش پایین (σ / √n) چه چیزی را اندازه می‌گیرد؟',
    ),
    options: [
      q('How much a sample average usually wobbles: the noise', 'مقدار تذبذب متوسط العيّنة عادةً: الضجيج', 'اینکه میانگین نمونه معمولاً چقدر نوسان دارد: نویز'),
      q('The difference we found: the signal', 'الفرق الذي وجدناه: الإشارة', 'تفاوتی که پیدا کردیم: سیگنال'),
      q('The p-value', 'قيمة p', 'مقدار p'),
    ],
  },
  {
    id: 'w07-q010',
    weekId: 'week-07',
    topic: 'your-turn',
    answer: 1,
    prompt: q(
      'In the coaching institute exercise, z = 3.6 and z-critical = 1.645. What is the decision?',
      'في تمرين المعهد التعليمي، z = 3.6 وz الحرجة = 1.645. ما القرار؟',
      'در تمرین آموزشگاه، z = ۳٫۶ و z بحرانی = ۱٫۶۴۵. تصمیم چیست؟',
    ),
    options: [
      q('Fail to reject H₀', 'عدم رفض H₀', 'H₀ رد نمی‌شود'),
      q('Reject H₀: there is enough evidence that the mean score is above 82', 'ارفض H₀: توجد أدلة كافية على أن متوسط الدرجات أعلى من 82', 'H₀ رد می‌شود: شواهد کافی هست که میانگین نمره بالای ۸۲ است'),
      q('Switch to a two-tailed test', 'انتقل إلى اختبار بذيلين', 'به آزمون دو دنباله برو'),
    ],
  },
  {
    id: 'w07-q011',
    weekId: 'week-07',
    topic: 'two-groups',
    answer: 1,
    prompt: q(
      'A case card asks: "Is churn higher on month-to-month contracts than on two-year contracts?" Which test fits?',
      'تسأل بطاقة حالة: "هل التسرّب أعلى في العقود الشهرية منه في عقود السنتين؟" أي اختبار يناسب؟',
      'یک کارت مورد می‌پرسد: «آیا ریزش در قراردادهای ماه‌به‌ماه بیشتر از قراردادهای دوساله است؟» کدام آزمون مناسب است؟',
    ),
    options: [
      q('Two averages (T.TEST)', 'متوسطان (T.TEST)', 'دو میانگین (T.TEST)'),
      q('Two rates: churn is a yes/no, so we compare two percentages', 'معدّلان: التسرّب نعم/لا، فنقارن نسبتين مئويتين', 'دو نرخ: ریزش بله/نه است، پس دو درصد را مقایسه می‌کنیم'),
      q('A one-sample z-test', 'اختبار z لعيّنة واحدة', 'آزمون z تک‌نمونه‌ای'),
    ],
  },
  {
    id: 'w07-q012',
    weekId: 'week-07',
    topic: 'common-mistakes',
    answer: 1,
    prompt: q(
      'With only the 8 Saturdays of April and May, the tasting test gives p = 0.23. What is the honest conclusion?',
      'مع أيام السبت الثمانية في أبريل ومايو فقط، يعطي اختبار التذوق p = 0.23. ما الاستنتاج الصادق؟',
      'فقط با ۸ شنبهٔ آوریل و مه، آزمون مزه‌کردن p = ۰٫۲۳ می‌دهد. نتیجه‌گیری صادقانه چیست؟',
    ),
    options: [
      q('Tasting does not work', 'التذوق لا يجدي', 'مزه‌کردن جواب نمی‌دهد'),
      q('There is not enough evidence yet; collect more Saturdays', 'لا توجد أدلة كافية بعد؛ اجمع أيام سبت أكثر', 'هنوز شواهد کافی نیست؛ شنبه‌های بیشتری جمع کن'),
      q('Tasting works; the p-value is just unlucky', 'التذوق يجدي؛ وقيمة p سيئة الحظ فقط', 'مزه‌کردن جواب می‌دهد؛ مقدار p فقط بدشانس است'),
    ],
  },
]

type Sections = Week['sections']

// ---------- Sections 1-4 ----------
const basics: Sections = [
  {
    id: 'welcome',
    navLabel: t('Welcome', 'ترحيب', 'خوش‌آمدید'),
    sectionLabel: t('Section 01', 'القسم ٠١', 'بخش ۰۱'),
    timeEst: t('6 min', '٦ دقائق', '۶ دقیقه'),
    headingHtml: t(
      '<h2>Welcome: is it real, or just luck?</h2><p class="standfirst">The owner put a free tasting table out on some Saturdays, and those Saturdays sold more jars. Is that a real effect, or would a few lucky Saturdays look the same? This week you learn the standard way to answer: a hypothesis test.</p>',
      '<h2>ترحيب: هل هو حقيقي أم مجرد حظ؟</h2><p class="standfirst">وضع المالك طاولة تذوق مجانية في بعض أيام السبت، وباعت تلك الأيام برطمانات أكثر. هل هذا أثر حقيقي، أم أن بضعة أيام سبت محظوظة ستبدو بالشكل نفسه؟ هذا الأسبوع تتعلم الطريقة المعتادة للإجابة: اختبار الفرضيات.</p>',
      '<h2>خوش‌آمدید: واقعی است یا فقط شانس؟</h2><p class="standfirst">صاحب غرفه بعضی شنبه‌ها یک میز مزه‌کردن رایگان گذاشت و آن شنبه‌ها شیشهٔ بیشتری فروختند. آیا این اثری واقعی است، یا چند شنبهٔ خوش‌شانس هم همین شکل را داشتند؟ این هفته راه استاندارد جواب دادن را یاد می‌گیری: آزمون فرض.</p>',
    ),
    blocks: [
      {
        type: 'objectives',
        label: t("By the end, you'll be able to", 'بنهاية هذا القسم ستكون قادرًا على', 'در پایان این بخش می‌توانی'),
        items: [
          t('Write a null and an alternative hypothesis for a business question', 'كتابة فرضية صفرية وفرضية بديلة لسؤال عمل', 'برای یک پرسش کسب‌وکار فرض صفر و فرض مقابل بنویسی'),
          t('Pick a left, right or two-tailed test from the words of the question', 'اختيار اختبار بذيل أيسر أو أيمن أو بذيلين من كلمات السؤال', 'از واژه‌های پرسش آزمون دنبالهٔ چپ، راست یا دو دنباله را انتخاب کنی'),
          t('Explain α and the two kinds of mistakes in plain words', 'شرح α ونوعي الخطأ بكلمات بسيطة', 'α و دو نوع اشتباه را به زبان ساده توضیح دهی'),
          t('Read a p-value and decide: reject H₀ or not', 'قراءة قيمة p والتقرير: رفض H₀ أم لا', 'مقدار p را بخوانی و تصمیم بگیری: رد H₀ یا نه'),
          t('Run a one-sample z-test, and compare two groups in Excel for your project', 'إجراء اختبار z لعيّنة واحدة، ومقارنة مجموعتين في Excel لمشروعك', 'آزمون z تک‌نمونه‌ای اجرا کنی و برای پروژه‌ات دو گروه را در Excel مقایسه کنی'),
        ],
      },
      html(
        '<h3>The whole week in three sentences</h3><ol><li>Start by assuming <strong>nothing special is going on</strong> (the null hypothesis, H₀).</li><li>Measure how <strong>surprising</strong> your data would be if that were true (the p-value).</li><li>If it would be very surprising (p is below the line you set in advance, α), <strong>reject</strong> the "nothing is going on" story.</li></ol>',
        '<h3>الأسبوع كله في ثلاث جمل</h3><ol><li>ابدأ بافتراض أن <strong>لا شيء مميز يحدث</strong> (الفرضية الصفرية، H₀).</li><li>قِس مدى <strong>غرابة</strong> بياناتك لو كان ذلك صحيحًا (قيمة p).</li><li>إن كانت غريبة جدًا (p أقل من الحد الذي حددته مسبقًا، α) <strong>فارفض</strong> قصة "لا شيء يحدث".</li></ol>',
        '<h3>کل هفته در سه جمله</h3><ol><li>با این فرض شروع کن که <strong>هیچ اتفاق خاصی نمی‌افتد</strong> (فرض صفر، H₀).</li><li>بسنج اگر این درست بود داده‌ات چقدر <strong>غافلگیرکننده</strong> می‌بود (مقدار p).</li><li>اگر خیلی غافلگیرکننده بود (p زیر خطی که از قبل تعیین کرده‌ای، α)، داستان «هیچ اتفاقی نمی‌افتد» را <strong>رد کن</strong>.</li></ol>',
      ),
      analogy(
        '<p>A hypothesis test works like a <strong>courtroom</strong>. The defendant is <em>innocent until proven guilty</em>: that is H₀. The data is the evidence. The judge convicts (rejects H₀) only when the evidence would be very hard to explain if the defendant were innocent. And "not guilty" does not mean "proven innocent": it only means the evidence was not strong enough.</p>',
        '<p>يعمل اختبار الفرضيات مثل <strong>المحكمة</strong>. المتهم <em>بريء حتى تثبت إدانته</em>: هذه هي H₀. والبيانات هي الأدلة. ولا يدين القاضي (يرفض H₀) إلا حين يصعب جدًا تفسير الأدلة لو كان المتهم بريئًا. و"غير مذنب" لا تعني "بريء مثبت": بل تعني فقط أن الأدلة لم تكن قوية بما يكفي.</p>',
        '<p>آزمون فرض مثل یک <strong>دادگاه</strong> کار می‌کند. متهم <em>بی‌گناه است تا وقتی گناهش ثابت شود</em>: این H₀ است. داده همان شواهد است. قاضی فقط وقتی محکوم می‌کند (H₀ را رد می‌کند) که توضیح شواهد، اگر متهم بی‌گناه بود، خیلی سخت باشد. و «بی‌گناه شناخته شد» یعنی «بی‌گناهی ثابت شد» نیست: فقط یعنی شواهد به اندازهٔ کافی قوی نبود.</p>',
      ),
      box(
        'keypoint',
        t("The lesson's definition", 'تعريف الدرس', 'تعریف درس'),
        '<p>A <strong>hypothesis test</strong> (or test of significance) is a standard procedure for testing a claim or statement about a property of a population.</p>',
        '<p><strong>اختبار الفرضيات</strong> (أو اختبار الدلالة) إجراء معياري لاختبار ادعاء أو عبارة حول خاصية من خصائص المجتمع الإحصائي.</p>',
        '<p><strong>آزمون فرض</strong> (یا آزمون معناداری) روشی استاندارد برای آزمودن یک ادعا یا گزاره دربارهٔ یکی از ویژگی‌های جامعه است.</p>',
      ),
      html(
        '<h3>Plain-words cheat sheet</h3>',
        '<h3>جدول مرجعي بكلمات بسيطة</h3>',
        '<h3>جدول مرجع به زبان ساده</h3>',
      ),
      {
        type: 'table',
        headers: [t('Word', 'الكلمة', 'واژه'), t('In plain words', 'بكلمات بسيطة', 'به زبان ساده'), t('In the courtroom', 'في المحكمة', 'در دادگاه')],
        rows: [
          [t('<strong>H₀</strong> (null hypothesis)', '<strong>H₀</strong> (الفرضية الصفرية)', '<strong>H₀</strong> (فرض صفر)'), t('Nothing special: no effect, no difference', 'لا شيء مميز: لا أثر ولا فرق', 'هیچ چیز خاصی نیست: نه اثری، نه تفاوتی'), t('The defendant is innocent', 'المتهم بريء', 'متهم بی‌گناه است')],
          [t('<strong>Hₐ</strong> (alternative)', '<strong>Hₐ</strong> (البديلة)', '<strong>Hₐ</strong> (فرض مقابل)'), t('What you suspect: there is an effect', 'ما تشك فيه: يوجد أثر', 'آنچه گمان می‌کنی: اثری هست'), t('The defendant is guilty', 'المتهم مذنب', 'متهم گناهکار است')],
          [t('<strong>α</strong> (significance level)', '<strong>α</strong> (مستوى الدلالة)', '<strong>α</strong> (سطح معناداری)'), t('The false-alarm risk you accept, set in advance (often 5%)', 'خطر الإنذار الكاذب الذي تقبله، يُحدَّد مسبقًا (غالبًا 5%)', 'ریسک هشدار اشتباهی که می‌پذیری، از قبل تعیین شده (اغلب ۵٪)'), t('How sure the judge must be', 'مدى اليقين المطلوب من القاضي', 'اینکه قاضی چقدر باید مطمئن باشد')],
          [t('<strong>p-value</strong>', '<strong>قيمة p</strong>', '<strong>مقدار p</strong>'), t('How surprising the data would be if H₀ were true', 'مدى غرابة البيانات لو كانت H₀ صحيحة', 'اینکه داده، اگر H₀ درست بود، چقدر غافلگیرکننده می‌بود'), t('How hard the evidence is to explain if innocent', 'مدى صعوبة تفسير الأدلة لو كان بريئًا', 'اینکه توضیح شواهد، اگر بی‌گناه بود، چقدر سخت است')],
          [t('<strong>Reject H₀</strong>', '<strong>رفض H₀</strong>', '<strong>رد H₀</strong>'), t('p is below α: the effect looks real', 'p أقل من α: يبدو الأثر حقيقيًا', 'p کمتر از α است: اثر واقعی به نظر می‌رسد'), t('Guilty verdict', 'حكم بالإدانة', 'رأی محکومیت')],
          [t('<strong>Fail to reject H₀</strong>', '<strong>عدم رفض H₀</strong>', '<strong>رد نکردن H₀</strong>'), t('Not enough evidence (which is not proof of "no effect")', 'لا أدلة كافية (وهذا ليس إثباتًا لـ"لا أثر")', 'شواهد کافی نیست (که اثبات «اثری نیست» هم نیست)'), t('"Not guilty"', '"غير مذنب"', '«بی‌گناه شناخته شد»')],
        ],
      },
      recap(
        t('Assume "nothing is going on", then ask how surprising the data is.', 'افترض أن "لا شيء يحدث"، ثم اسأل كم هي البيانات غريبة.', 'فرض کن «هیچ اتفاقی نمی‌افتد»، بعد بپرس داده چقدر غافلگیرکننده است.'),
        t('Very surprising (p below α): reject H₀.', 'غريبة جدًا (p أقل من α): ارفض H₀.', 'خیلی غافلگیرکننده (p کمتر از α): H₀ را رد کن.'),
        t('"Not guilty" is not "proven innocent".', '"غير مذنب" ليست "بريئًا مثبتًا".', '«بی‌گناه شناخته شد» یعنی «بی‌گناهی ثابت شد» نیست.'),
      ),
      exercise('w07-q001'),
    ],
  },
  {
    id: 'null-alternative',
    navLabel: t('Null and alternative', 'الصفرية والبديلة', 'صفر و مقابل'),
    sectionLabel: t('Section 02', 'القسم ٠٢', 'بخش ۰۲'),
    timeEst: t('8 min', '٨ دقائق', '۸ دقیقه'),
    headingHtml: t(
      '<h2>Null and alternative: the two stories</h2><p class="standfirst">Every test starts with two opposite stories about the population. The null hypothesis (H₀) is the boring one: no effect, no difference. The alternative (Hₐ) is what you suspect is really happening.</p>',
      '<h2>الصفرية والبديلة: القصتان</h2><p class="standfirst">يبدأ كل اختبار بقصتين متعاكستين عن المجتمع. الفرضية الصفرية (H₀) هي القصة المملّة: لا أثر ولا فرق. والبديلة (Hₐ) هي ما تشك أنه يحدث فعلًا.</p>',
      '<h2>صفر و مقابل: دو داستان</h2><p class="standfirst">هر آزمون با دو داستان مخالف دربارهٔ جامعه شروع می‌شود. فرض صفر (H₀) داستان کسل‌کننده است: اثری نیست، تفاوتی نیست. فرض مقابل (Hₐ) چیزی است که گمان می‌کنی واقعاً رخ می‌دهد.</p>',
    ),
    blocks: [
      html(
        '<ul><li><strong>Null hypothesis (H₀):</strong> the claim we try to <em>disprove</em>, the "no effect" story.</li><li><strong>Alternative hypothesis (Hₐ):</strong> the claim we try to <em>prove</em>, the "effect is present" story. We accept it only if the evidence is strong enough to reject H₀. It is the answer to your research question.</li></ul>',
        '<ul><li><strong>الفرضية الصفرية (H₀):</strong> الادعاء الذي نحاول <em>نفيه</em>، قصة "لا أثر".</li><li><strong>الفرضية البديلة (Hₐ):</strong> الادعاء الذي نحاول <em>إثباته</em>، قصة "الأثر موجود". لا نقبلها إلا إذا كانت الأدلة قوية بما يكفي لرفض H₀. وهي الإجابة عن سؤال بحثك.</li></ul>',
        '<ul><li><strong>فرض صفر (H₀):</strong> ادعایی که می‌کوشیم <em>رد</em> کنیم، داستان «اثری نیست».</li><li><strong>فرض مقابل (Hₐ):</strong> ادعایی که می‌کوشیم <em>ثابت</em> کنیم، داستان «اثر هست». فقط وقتی پذیرفته می‌شود که شواهد برای رد H₀ کافی باشد. پاسخ پرسش پژوهشی توست.</li></ul>',
      ),
      analogy(
        '<p>Think of two newspaper headlines. H₀ is <em>"Nothing new today"</em>. Hₐ is <em>"Breaking news!"</em>. A careful newspaper prints breaking news only when the evidence is strong. Until then, the default headline stays.</p>',
        '<p>فكّر في عنوانين لصحيفة. H₀ هو <em>"لا جديد اليوم"</em>. وHₐ هو <em>"خبر عاجل!"</em>. والصحيفة الحريصة لا تنشر خبرًا عاجلًا إلا حين تكون الأدلة قوية. وحتى ذلك الحين يبقى العنوان الافتراضي.</p>',
        '<p>به دو تیتر روزنامه فکر کن. H₀ یعنی <em>«امروز خبر تازه‌ای نیست»</em>. Hₐ یعنی <em>«خبر فوری!»</em>. روزنامهٔ دقیق خبر فوری را فقط وقتی چاپ می‌کند که شواهد قوی باشد. تا آن موقع، تیتر پیش‌فرض می‌ماند.</p>',
      ),
      html(
        '<h3>The lesson\'s example: are artists more often left-handed?</h3><p>About 10% of people are left-handed. A researcher suspects that students in a college of Arts and Architecture are <em>more</em> likely to be left-handed. We have one sample (art students) and compare its proportion with a known population value (10%). <strong>Before you scroll:</strong> what are H₀ and Hₐ here?</p>',
        '<h3>مثال الدرس: هل الفنانون أكثر عسرًا؟</h3><p>نحو 10% من الناس عُسر. يشك باحث في أن طلاب كلية الفنون والعمارة <em>أكثر</em> ميلًا لأن يكونوا عُسرًا. لدينا عيّنة واحدة (طلاب الفنون) ونقارن نسبتها بقيمة معروفة للمجتمع (10%). <strong>قبل أن تنزل:</strong> ما H₀ وHₐ هنا؟</p>',
        '<h3>مثال درس: آیا هنرمندان بیشتر چپ‌دست‌اند؟</h3><p>حدود ۱۰٪ مردم چپ‌دست‌اند. پژوهشگری گمان می‌کند دانشجویان دانشکدهٔ هنر و معماری <em>بیشتر</em> چپ‌دست‌اند. یک نمونه داریم (دانشجویان هنر) و نسبت آن را با مقدار شناخته‌شدهٔ جامعه (۱۰٪) مقایسه می‌کنیم. <strong>پیش از پایین رفتن:</strong> H₀ و Hₐ اینجا چیست؟</p>',
      ),
      figure(
        1,
        t('Your turn to think', 'دورك لتفكّر', 'نوبت تو برای فکر کردن'),
        '/figures/week-07/deck-07-think.jpg',
        'Four cartoon figures from the original lesson: one holding its head under a question mark, one thinking with gears, one with a light bulb, and one giving a thumbs up under an exclamation mark.',
        fromDeck('Question → thinking → idea → answer. Write your H₀ and Hₐ, then compare with the box below.', 'سؤال ← تفكير ← فكرة ← إجابة. اكتب H₀ وHₐ ثم قارن بالمربع أدناه.', 'پرسش ← فکر ← ایده ← پاسخ. H₀ و Hₐ خودت را بنویس، بعد با کادر زیر مقایسه کن.'),
      ),
      box(
        'example',
        t("The lesson's answer", 'إجابة الدرس', 'پاسخ درس'),
        '<p><strong>H₀:</strong> art students are no more likely to be left-handed than everyone else: their proportion is 10%.<br/><strong>Hₐ:</strong> art students are more likely to be left-handed: their proportion is above 10%. This is a one-sided ("greater than") alternative.</p><p><em>If we had data:</em> say 15 of 100 art students are left-handed. The test (Section 6 shows the formula) gives z = 1.67 and p = 0.048, just under 0.05, so we would reject H₀, but only just.</p>',
        '<p><strong>H₀:</strong> طلاب الفنون ليسوا أكثر عسرًا من غيرهم: نسبتهم 10%.<br/><strong>Hₐ:</strong> طلاب الفنون أكثر عسرًا: نسبتهم أعلى من 10%. هذه بديلة أحادية الجانب ("أكبر من").</p><p><em>لو كانت لدينا بيانات:</em> لنفترض أن 15 من 100 طالب فنون عُسر. يعطي الاختبار (يعرض القسم 6 المعادلة) z = 1.67 وp = 0.048، أقل بقليل من 0.05، فنرفض H₀، لكن بالكاد.</p>',
        '<p><strong>H₀:</strong> دانشجویان هنر بیشتر از بقیه چپ‌دست نیستند: نسبتشان ۱۰٪ است.<br/><strong>Hₐ:</strong> دانشجویان هنر بیشتر چپ‌دست‌اند: نسبتشان بالای ۱۰٪ است. این فرض مقابل یک‌طرفه («بیشتر از») است.</p><p><em>اگر داده داشتیم:</em> فرض کن ۱۵ نفر از ۱۰۰ دانشجوی هنر چپ‌دست باشند. آزمون (فرمولش در بخش ۶) z = ۱٫۶۷ و p = ۰٫۰۴۸ می‌دهد، کمی زیر ۰٫۰۵، پس H₀ را رد می‌کنیم، اما به‌زحمت.</p>',
      ),
      {
        type: 'table',
        headers: [t('Question', 'السؤال', 'پرسش'), t('H₀ (nothing special)', 'H₀ (لا شيء مميز)', 'H₀ (چیز خاصی نیست)'), t('Hₐ (what you suspect)', 'Hₐ (ما تشك فيه)', 'Hₐ (آنچه گمان می‌کنی)')],
        rows: [
          [t('Do tasting days sell more jars?', 'هل تبيع أيام التذوق برطمانات أكثر؟', 'آیا روزهای مزه‌کردن بیشتر می‌فروشند؟'), t('Tasting days sell no more', 'أيام التذوق لا تبيع أكثر', 'روزهای مزه‌کردن بیشتر نمی‌فروشند'), t('Tasting days sell more', 'أيام التذوق تبيع أكثر', 'روزهای مزه‌کردن بیشتر می‌فروشند')],
          [t('Are the jars under-filled?', 'هل البرطمانات ناقصة التعبئة؟', 'آیا شیشه‌ها کم‌پرند؟'), t('Average weight is 340 g or more', 'متوسط الوزن 340 غرامًا أو أكثر', 'میانگین وزن ۳۴۰ گرم یا بیشتر است'), t('Average weight is below 340 g', 'متوسط الوزن أقل من 340 غرامًا', 'میانگین وزن کمتر از ۳۴۰ گرم است')],
          [t('Has the average order changed from €20?', 'هل تغيّر متوسط الطلب عن 20 يورو؟', 'آیا میانگین سفارش از ۲۰ یورو تغییر کرده؟'), t('Average order is €20', 'متوسط الطلب 20 يورو', 'میانگین سفارش ۲۰ یورو است'), t('Average order is not €20', 'متوسط الطلب ليس 20 يورو', 'میانگین سفارش ۲۰ یورو نیست')],
        ],
      },
      recap(
        t('H₀ is the "nothing special" story; Hₐ is what you suspect.', 'H₀ هي قصة "لا شيء مميز"؛ وHₐ هي ما تشك فيه.', 'H₀ داستان «چیز خاصی نیست» است؛ Hₐ آن چیزی است که گمان می‌کنی.'),
        t('You never prove H₀; you either reject it or you do not.', 'لا تثبت H₀ أبدًا؛ إما أن ترفضها أو لا.', 'هرگز H₀ را ثابت نمی‌کنی؛ یا ردش می‌کنی یا نه.'),
        t('Write both before you look at any result.', 'اكتب الاثنتين قبل أن تنظر إلى أي نتيجة.', 'هر دو را پیش از دیدن هر نتیجه‌ای بنویس.'),
      ),
      exercise('w07-q002'),
    ],
  },
  {
    id: 'tails',
    navLabel: t('One tail or two', 'ذيل أم ذيلان', 'یک دنباله یا دو'),
    sectionLabel: t('Section 03', 'القسم ٠٣', 'بخش ۰۳'),
    timeEst: t('6 min', '٦ دقائق', '۶ دقیقه'),
    headingHtml: t(
      '<h2>One tail or two: which way are you looking?</h2><p class="standfirst">The words of your question decide where the "surprising" results are: only on the high side, only on the low side, or on both sides.</p>',
      '<h2>ذيل أم ذيلان: في أي اتجاه تنظر؟</h2><p class="standfirst">كلمات سؤالك هي التي تحدد أين تقع النتائج "الغريبة": في الجهة العالية فقط، أو المنخفضة فقط، أو في الجهتين.</p>',
      '<h2>یک دنباله یا دو: به کدام طرف نگاه می‌کنی؟</h2><p class="standfirst">واژه‌های پرسش تو تعیین می‌کنند نتیجه‌های «غافلگیرکننده» کجا هستند: فقط سمت بالا، فقط سمت پایین، یا هر دو سمت.</p>',
    ),
    blocks: [
      figure(
        2,
        t('Right-tailed, left-tailed and two-tailed tests', 'اختبارات بذيل أيمن وأيسر وبذيلين', 'آزمون‌های دنبالهٔ راست، چپ و دو دنباله'),
        '/figures/week-07/deck-01-tails.jpg',
        'Three bell curves from the original lesson. Top: the right tail is shaded, for Ha: mean greater than a value. Middle: the left tail is shaded, for Ha: mean less than a value. Bottom: both tails are shaded, for Ha: mean not equal to a value. Each shaded area is labelled Ha is more probable.',
        fromDeck(
          'The red area is where results would point to Hₐ. Its place comes from the question: above (>), below (<), or both sides (≠).',
          'المنطقة الحمراء هي حيث تشير النتائج إلى Hₐ. ويأتي موضعها من السؤال: فوق (>)، أو تحت (<)، أو الجهتين (≠).',
          'ناحیهٔ قرمز جایی است که نتیجه‌ها به Hₐ اشاره می‌کنند. جایش از پرسش می‌آید: بالا (>)، پایین (<)، یا دو طرف (≠).',
        ),
      ),
      html(
        '<p><strong>The words pick the tail:</strong> <em>more, greater, higher, increased</em> → right-tailed. <em>Less, fewer, lower, under</em> → left-tailed. <em>Different, changed, not equal</em> → two-tailed. The three possible pairs from the lesson:</p>',
        '<p><strong>الكلمات تختار الذيل:</strong> <em>أكثر، أكبر، أعلى، ازداد</em> ← ذيل أيمن. <em>أقل، أدنى، دون</em> ← ذيل أيسر. <em>مختلف، تغيّر، لا يساوي</em> ← ذيلان. الأزواج الثلاثة الممكنة من الدرس:</p>',
        '<p><strong>واژه‌ها دنباله را انتخاب می‌کنند:</strong> <em>بیشتر، بزرگ‌تر، بالاتر، افزایش</em> ← دنبالهٔ راست. <em>کمتر، پایین‌تر، زیر</em> ← دنبالهٔ چپ. <em>متفاوت، تغییر کرده، نابرابر</em> ← دو دنباله. سه جفت ممکن از درس:</p>',
      ),
      {
        type: 'table',
        headers: [t('H₀', 'H₀', 'H₀'), t('Hₐ', 'Hₐ', 'Hₐ'), t('Test', 'الاختبار', 'آزمون'), t('Jam stand example', 'مثال كشك المربى', 'مثال غرفهٔ مربا')],
        rows: [
          [t('μ = value', 'μ = قيمة', 'μ = مقدار'), t('μ ≠ value', 'μ ≠ قيمة', 'μ ≠ مقدار'), t('Two-tailed', 'بذيلين', 'دو دنباله'), t('Has the average order changed from €20?', 'هل تغيّر متوسط الطلب عن 20 يورو؟', 'آیا میانگین سفارش از ۲۰ یورو تغییر کرده؟')],
          [t('μ ≤ value', 'μ ≤ قيمة', 'μ ≤ مقدار'), t('μ > value', 'μ > قيمة', 'μ > مقدار'), t('Right-tailed', 'بذيل أيمن', 'دنبالهٔ راست'), t('Do tasting days sell more than 55 jars?', 'هل تبيع أيام التذوق أكثر من 55 برطمانًا؟', 'آیا روزهای مزه‌کردن بیشتر از ۵۵ شیشه می‌فروشند؟')],
          [t('μ ≥ value', 'μ ≥ قيمة', 'μ ≥ مقدار'), t('μ < value', 'μ < قيمة', 'μ < مقدار'), t('Left-tailed', 'بذيل أيسر', 'دنبالهٔ چپ'), t('Are the jars lighter than 340 g?', 'هل البرطمانات أخف من 340 غرامًا؟', 'آیا شیشه‌ها از ۳۴۰ گرم سبک‌ترند؟')],
        ],
      },
      analogy(
        '<p>Crossing a one-way street, you only look in the one direction the cars come from. On a two-way street you look both ways, and your attention is split in two. A two-tailed test does the same: it splits α between the two sides (2.5% on each side when α = 5%), so each side needs a slightly stronger result.</p>',
        '<p>حين تعبر شارعًا باتجاه واحد تنظر فقط إلى الجهة التي تأتي منها السيارات. وفي شارع باتجاهين تنظر إلى الجهتين، فينقسم انتباهك إلى قسمين. يفعل اختبار الذيلين الشيء نفسه: يقسم α بين الجهتين (2.5% لكل جهة حين α = 5%)، فتحتاج كل جهة نتيجة أقوى قليلًا.</p>',
        '<p>وقتی از یک خیابان یک‌طرفه رد می‌شوی، فقط به سمتی نگاه می‌کنی که ماشین‌ها از آن می‌آیند. در خیابان دوطرفه به هر دو طرف نگاه می‌کنی و حواست دو قسمت می‌شود. آزمون دو دنباله هم همین کار را می‌کند: α را بین دو طرف تقسیم می‌کند (وقتی α = ۵٪، هر طرف ۲٫۵٪)، پس هر طرف به نتیجه‌ای کمی قوی‌تر نیاز دارد.</p>',
      ),
      recap(
        t('The question\'s words pick the tail: more → right, less → left, different → both.', 'كلمات السؤال تختار الذيل: أكثر ← أيمن، أقل ← أيسر، مختلف ← الاثنان.', 'واژه‌های پرسش دنباله را انتخاب می‌کنند: بیشتر ← راست، کمتر ← چپ، متفاوت ← هر دو.'),
        t('Choose the tail before you look at the data.', 'اختر الذيل قبل النظر إلى البيانات.', 'دنباله را پیش از نگاه به داده انتخاب کن.'),
      ),
      exercise('w07-q003'),
      exercise('w07-q004'),
    ],
  },
  {
    id: 'significance',
    navLabel: t('Significance and mistakes', 'الدلالة والأخطاء', 'معناداری و اشتباه‌ها'),
    sectionLabel: t('Section 04', 'القسم ٠٤', 'بخش ۰۴'),
    timeEst: t('8 min', '٨ دقائق', '۸ دقیقه'),
    headingHtml: t(
      '<h2>Significance level α: how much false-alarm risk you accept</h2><p class="standfirst">The significance level is the chance of rejecting H₀ when H₀ is actually true. You choose it before the test; 5% is the usual choice.</p>',
      '<h2>مستوى الدلالة α: كم تقبل من خطر الإنذار الكاذب</h2><p class="standfirst">مستوى الدلالة هو احتمال رفض H₀ وهي صحيحة فعلًا. تختاره قبل الاختبار؛ و5% هو الاختيار المعتاد.</p>',
      '<h2>سطح معناداری α: چقدر ریسک هشدار اشتباه می‌پذیری</h2><p class="standfirst">سطح معناداری احتمال رد H₀ است وقتی H₀ در واقع درست است. آن را پیش از آزمون انتخاب می‌کنی؛ ۵٪ انتخاب معمول است.</p>',
    ),
    blocks: [
      analogy(
        '<p>A <strong>smoke alarm</strong> has a sensitivity setting. Too sensitive, and it goes off for burnt toast: a <strong>false alarm</strong> (Type I error). Too deaf, and it stays quiet during a real fire: a <strong>miss</strong> (Type II error). α is that sensitivity setting, and you set it <em>before</em> you start cooking, not after the alarm rings.</p>',
        '<p>لـ<strong>إنذار الدخان</strong> إعداد للحساسية. إن كان حساسًا جدًا انطلق بسبب خبز محترق: <strong>إنذار كاذب</strong> (خطأ من النوع الأول). وإن كان أصمّ جدًا بقي صامتًا أثناء حريق حقيقي: <strong>إخفاق</strong> (خطأ من النوع الثاني). وα هو إعداد الحساسية هذا، وتضبطه <em>قبل</em> أن تبدأ الطهي، لا بعد أن يرنّ الإنذار.</p>',
        '<p><strong>آژیر دود</strong> یک تنظیم حساسیت دارد. اگر خیلی حساس باشد برای نان سوخته به صدا درمی‌آید: <strong>هشدار اشتباه</strong> (خطای نوع اول). اگر خیلی کر باشد در آتش واقعی ساکت می‌ماند: <strong>از دست دادن</strong> (خطای نوع دوم). α همان تنظیم حساسیت است و آن را <em>پیش از</em> شروع آشپزی تنظیم می‌کنی، نه بعد از به صدا درآمدن آژیر.</p>',
      ),
      figure(
        3,
        t('The significance level on the curve (right-tailed, α = 0.05)', 'مستوى الدلالة على المنحنى (ذيل أيمن، α = 0.05)', 'سطح معناداری روی منحنی (دنبالهٔ راست، α = ۰٫۰۵)'),
        '/figures/week-07/diagram-01.svg',
        'A bell curve of the results we expect if H0 is true. A vertical red line at z = 1.645 splits it: to the left is fail to reject, not significant; to the right, the shaded red tail of area 0.05 is reject, significant.',
        t(
          'Redrawn from the lesson\'s slide. The curve shows the results we would expect if H₀ were true. The red tail is 5% of them: a result out there is rare enough that we reject H₀.',
          'أُعيد رسمه من شريحة الدرس. يُظهر المنحنى النتائج المتوقعة لو كانت H₀ صحيحة. والذيل الأحمر 5% منها: النتيجة هناك نادرة بما يكفي لنرفض H₀.',
          'از اسلاید درس دوباره کشیده شده. منحنی نتیجه‌هایی را نشان می‌دهد که اگر H₀ درست بود انتظار داشتیم. دنبالهٔ قرمز ۵٪ آن‌هاست: نتیجه‌ای که آنجا بیفتد آن‌قدر نادر است که H₀ را رد می‌کنیم.',
        ),
      ),
      html(
        '<p><strong>Which α?</strong> 5% (0.05) is the usual choice. Use 1% (0.01) when a false alarm is costly (for example, recalling a whole batch of jars). Use 10% (0.10) for a first, exploratory look; the lesson\'s p-value example in Section 5 uses 0.10.</p>',
        '<p><strong>أي α؟</strong> 5% (0.05) هو الاختيار المعتاد. استخدم 1% (0.01) حين يكون الإنذار الكاذب مكلفًا (مثلًا سحب دفعة كاملة من البرطمانات). واستخدم 10% (0.10) لنظرة أولى استكشافية؛ ومثال قيمة p في الدرس (القسم 5) يستخدم 0.10.</p>',
        '<p><strong>کدام α؟</strong> ۵٪ (۰٫۰۵) انتخاب معمول است. وقتی هشدار اشتباه پرهزینه است (مثلاً جمع کردن یک بچ کامل شیشه) ۱٪ (۰٫۰۱) را به کار ببر. برای نگاه اول و اکتشافی ۱۰٪ (۰٫۱۰)؛ مثال مقدار p درس در بخش ۵ از ۰٫۱۰ استفاده می‌کند.</p>',
      ),
      figure(
        4,
        t('The two kinds of mistakes, in courtroom words', 'نوعا الخطأ بلغة المحكمة', 'دو نوع اشتباه، به زبان دادگاه'),
        '/figures/week-07/diagram-02.svg',
        'A two by two table. Columns: the truth, H0 true (innocent) or H0 false (guilty). Rows: our decision, reject H0 (convict) or fail to reject (acquit). Convicting an innocent person is a Type I error with chance alpha; letting a guilty person go is a Type II error, more likely with small samples; the other two cells are correct.',
        t(
          'α is the chance of the top-left mistake. Making α smaller makes false alarms rarer, but misses (bottom right) become more likely.',
          'α هو احتمال الخطأ في الخانة العلوية اليسرى. تصغير α يجعل الإنذارات الكاذبة أندر، لكن الإخفاقات (أسفل اليمين) تصبح أرجح.',
          'α احتمال اشتباه خانهٔ بالا-چپ است. کوچک‌تر کردن α هشدارهای اشتباه را نادرتر می‌کند، اما از دست دادن‌ها (پایین-راست) محتمل‌تر می‌شوند.',
        ),
      ),
      recap(
        t('α is the false-alarm risk you accept, chosen before the test (usually 5%).', 'α هو خطر الإنذار الكاذب الذي تقبله، ويُختار قبل الاختبار (عادةً 5%).', 'α ریسک هشدار اشتباهی است که می‌پذیری و پیش از آزمون انتخاب می‌شود (معمولاً ۵٪).'),
        t('Type I = false alarm (convict the innocent). Type II = miss (free the guilty).', 'النوع الأول = إنذار كاذب (إدانة البريء). النوع الثاني = إخفاق (تبرئة المذنب).', 'نوع اول = هشدار اشتباه (محکوم کردن بی‌گناه). نوع دوم = از دست دادن (آزادی گناهکار).'),
        t('Lowering one risk raises the other.', 'خفض أحد الخطرين يرفع الآخر.', 'کم کردن یک ریسک دیگری را بالا می‌برد.'),
      ),
      exercise('w07-q005'),
      exercise('w07-q006'),
    ],
  },
]

// ---------- Sections 5-8 ----------
const testing: Sections = [
  {
    id: 'p-value',
    navLabel: t('The p-value', 'قيمة p', 'مقدار p'),
    sectionLabel: t('Section 05', 'القسم ٠٥', 'بخش ۰۵'),
    timeEst: t('8 min', '٨ دقائق', '۸ دقیقه'),
    headingHtml: t(
      '<h2>The p-value: how surprised should I be?</h2><p class="standfirst">The p-value is the probability, <em>if H₀ were true</em>, of getting a result as extreme as yours or more extreme. Small p means "this would be very surprising if nothing were going on".</p>',
      '<h2>قيمة p: كم يجب أن أتفاجأ؟</h2><p class="standfirst">قيمة p هي احتمال الحصول، <em>لو كانت H₀ صحيحة</em>، على نتيجة متطرفة مثل نتيجتك أو أكثر. وp الصغيرة تعني "هذا سيكون مفاجئًا جدًا لو لم يكن هناك شيء".</p>',
      '<h2>مقدار p: چقدر باید غافلگیر شوم؟</h2><p class="standfirst">مقدار p احتمال گرفتن نتیجه‌ای به همان اندازهٔ نتیجهٔ تو یا شدیدتر است، <em>اگر H₀ درست بود</em>. p کوچک یعنی «اگر هیچ اتفاقی نمی‌افتاد، این خیلی غافلگیرکننده بود».</p>',
    ),
    blocks: [
      box(
        'example',
        t('A simple example: a coin', 'مثال بسيط: عملة', 'یک مثال ساده: سکه'),
        '<p>A friend says their coin is fair (H₀). You flip it 10 times and get <strong>9 heads</strong>. If the coin really were fair, 9 or 10 heads would happen in 11 of the 1,024 possible outcomes: <strong>p = 0.0107</strong>, about 1 time in 100. That is surprising enough to doubt the coin (it is below 5%). With 6 heads you would not blink: that happens all the time with a fair coin.</p>',
        '<p>يقول صديق إن عملته عادلة (H₀). ترميها 10 مرات فتحصل على <strong>9 صور</strong>. لو كانت العملة عادلة فعلًا لحدثت 9 أو 10 صور في 11 من النتائج الممكنة البالغة 1,024: <strong>p = 0.0107</strong>، أي نحو مرة واحدة من كل 100. هذا مفاجئ بما يكفي للشك في العملة (أقل من 5%). ومع 6 صور لن تلتفت: هذا يحدث دائمًا مع عملة عادلة.</p>',
        '<p>دوستی می‌گوید سکه‌اش سالم است (H₀). آن را ۱۰ بار پرتاب می‌کنی و <strong>۹ شیر</strong> می‌آید. اگر سکه واقعاً سالم بود، ۹ یا ۱۰ شیر در ۱۱ حالت از ۱٬۰۲۴ حالت ممکن رخ می‌داد: <strong>p = ۰٫۰۱۰۷</strong>، حدود ۱ بار در ۱۰۰. این آن‌قدر غافلگیرکننده است که به سکه شک کنی (زیر ۵٪ است). با ۶ شیر اصلاً تعجب نمی‌کردی: با سکهٔ سالم همیشه پیش می‌آید.</p>',
      ),
      tools([code('=1 - BINOM.DIST(8, 10, 0.5, TRUE)    → 0.0107  (chance of 9 or more heads in 10 fair flips)')], [code(py.coin)]),
      figure(
        5,
        t('The p-value as an area under the curve (left-tailed, α = 0.10)', 'قيمة p كمساحة تحت المنحنى (ذيل أيسر، α = 0.10)', 'مقدار p به‌شکل مساحت زیر منحنی (دنبالهٔ چپ، α = ۰٫۱۰)'),
        '/figures/week-07/deck-02-pvalue.jpg',
        'Bell curve from the original lesson for a left-tailed test. The critical line is at z = -1.28 for alpha = 0.10. The observed z = -1.46 is further left, and the orange tail beyond it is labelled p-value = .072. A callout says p-value < alpha, so reject H0.',
        fromDeck(
          'The result was z = −1.46, further out than the line at −1.28. The orange area beyond it is the p-value, 0.072. It is smaller than α = 0.10, so H₀ is rejected.',
          'كانت النتيجة z = ‎−1.46، أبعد من الخط عند ‎−1.28. والمساحة البرتقالية بعدها هي قيمة p، أي 0.072. وهي أصغر من α = 0.10، فتُرفض H₀.',
          'نتیجه z = ‎−۱٫۴۶ بود، دورتر از خط ‎−۱٫۲۸. ناحیهٔ نارنجی پس از آن مقدار p است، ۰٫۰۷۲. این از α = ۰٫۱۰ کوچک‌تر است، پس H₀ رد می‌شود.',
        ),
      ),
      box(
        'keypoint',
        t('The rule', 'القاعدة', 'قاعده'),
        '<p><strong>p &lt; α → reject H₀</strong> (the result is significant).<br/><strong>p ≥ α → fail to reject H₀</strong> (not enough evidence).</p><p>What p is <em>not</em>: it is not the chance that H₀ is true, and it does not tell you how big or important the effect is. A tiny effect can have a tiny p if the sample is huge.</p>',
        '<p><strong>p &lt; α ← ارفض H₀</strong> (النتيجة دالة).<br/><strong>p ≥ α ← لا ترفض H₀</strong> (لا أدلة كافية).</p><p>ما <em>ليست</em> عليه p: ليست احتمال أن تكون H₀ صحيحة، ولا تخبرك بحجم الأثر أو أهميته. فقد يكون لأثر ضئيل قيمة p ضئيلة إذا كانت العيّنة ضخمة.</p>',
        '<p><strong>p &lt; α ← H₀ را رد کن</strong> (نتیجه معنادار است).<br/><strong>p ≥ α ← H₀ رد نمی‌شود</strong> (شواهد کافی نیست).</p><p>آنچه p <em>نیست</em>: احتمال درستی H₀ نیست و نمی‌گوید اثر چقدر بزرگ یا مهم است. اثری کوچک اگر نمونه بسیار بزرگ باشد می‌تواند p بسیار کوچکی داشته باشد.</p>',
      ),
      recap(
        t('p-value = how surprising your result would be if H₀ were true.', 'قيمة p = مدى غرابة نتيجتك لو كانت H₀ صحيحة.', 'مقدار p = اینکه نتیجه‌ات، اگر H₀ درست بود، چقدر غافلگیرکننده می‌بود.'),
        t('p below α: reject H₀. Otherwise: not enough evidence.', 'p أقل من α: ارفض H₀. وإلا: لا أدلة كافية.', 'p کمتر از α: H₀ را رد کن. وگرنه: شواهد کافی نیست.'),
        t('A small p says "rare", not "big" or "important".', 'p الصغيرة تقول "نادر"، لا "كبير" أو "مهم".', 'p کوچک می‌گوید «نادر»، نه «بزرگ» یا «مهم».'),
      ),
      exercise('w07-q007'),
      exercise('w07-q008'),
    ],
  },
  {
    id: 'z-test',
    navLabel: t('The one-sample z-test', 'اختبار z لعيّنة واحدة', 'آزمون z تک‌نمونه‌ای'),
    sectionLabel: t('Section 06', 'القسم ٠٦', 'بخش ۰۶'),
    timeEst: t('10 min', '١٠ دقائق', '۱۰ دقیقه'),
    headingHtml: t(
      '<h2>The one-sample z-test: signal divided by noise</h2><p class="standfirst">The lesson\'s test compares the average of one sample with a claimed value. It turns "how far off is my sample?" into one number, z, and then into a p-value.</p>',
      '<h2>اختبار z لعيّنة واحدة: الإشارة مقسومة على الضجيج</h2><p class="standfirst">يقارن اختبار الدرس متوسط عيّنة واحدة بقيمة مُدّعاة. ويحوّل سؤال "كم تبتعد عيّنتي؟" إلى رقم واحد، z، ثم إلى قيمة p.</p>',
      '<h2>آزمون z تک‌نمونه‌ای: سیگنال تقسیم بر نویز</h2><p class="standfirst">آزمون درس میانگین یک نمونه را با یک مقدار ادعاشده مقایسه می‌کند. پرسش «نمونه‌ام چقدر دور است؟» را به یک عدد، z، و بعد به مقدار p تبدیل می‌کند.</p>',
    ),
    blocks: [
      html(
        '<p><strong>When to use it:</strong> one population and one sample from it; you know the population\'s standard deviation σ (for example from a machine\'s specification); and the sample is large enough (about 30 or more) or the data is roughly bell-shaped.</p>',
        '<p><strong>متى تستخدمه:</strong> مجتمع واحد وعيّنة واحدة منه؛ وتعرف الانحراف المعياري للمجتمع σ (مثلًا من مواصفات آلة)؛ والعيّنة كبيرة بما يكفي (نحو 30 أو أكثر) أو البيانات على شكل جرس تقريبًا.</p>',
        '<p><strong>کی به کار می‌رود:</strong> یک جامعه و یک نمونه از آن؛ انحراف معیار جامعه σ را می‌دانی (مثلاً از مشخصات یک دستگاه)؛ و نمونه به اندازهٔ کافی بزرگ است (حدود ۳۰ یا بیشتر) یا داده تقریباً زنگوله‌ای است.</p>',
      ),
      figure(
        6,
        t('The z-test formula', 'معادلة اختبار z', 'فرمول آزمون z'),
        '/figures/week-07/deck-04-z-formula.jpg',
        'Graphic from the original lesson: Z Test equals x-bar minus mu, divided by sigma over the square root of n, with a calculator icon and a small rising bar chart.',
        fromDeck(
          'Top: x̄ − μ, how far the sample average is from the claim (the signal). Bottom: σ / √n, how much a sample average usually wobbles (the noise).',
          'في الأعلى: x̄ − μ، أي بُعد متوسط العيّنة عن الادعاء (الإشارة). وفي الأسفل: σ / √n، أي مقدار تذبذب متوسط العيّنة عادةً (الضجيج).',
          'بالا: x̄ − μ، اینکه میانگین نمونه چقدر از ادعا دور است (سیگنال). پایین: σ / √n، اینکه میانگین نمونه معمولاً چقدر نوسان دارد (نویز).',
        ),
      ),
      analogy(
        '<p>Trying to hear a friend in a busy café: what matters is how loud they speak <em>compared with</em> the noise of the room. z is exactly that ratio. A bigger sample (larger n) is like a quieter room: the same small difference becomes easier to hear.</p>',
        '<p>تحاول سماع صديق في مقهى مزدحم: المهم هو ارتفاع صوته <em>مقارنةً</em> بضجيج المكان. وz هو هذه النسبة تمامًا. والعيّنة الأكبر (n أكبر) مثل مكان أهدأ: يصبح الفرق الصغير نفسه أسهل سماعًا.</p>',
        '<p>در یک کافهٔ شلوغ می‌خواهی صدای دوستت را بشنوی: مهم این است که بلندی صدایش <em>در مقایسه با</em> سروصدای سالن چقدر است. z دقیقاً همین نسبت است. نمونهٔ بزرگ‌تر (n بزرگ‌تر) مثل سالنی ساکت‌تر است: همان تفاوت کوچک راحت‌تر شنیده می‌شود.</p>',
      ),
      html(
        `<h3>The lesson's example, step by step</h3><p>A claim says the average weight is at most 7.5 lb; we suspect it is more. We know σ = 2.1 lb, and a sample of 35 has an average of 8.2 lb. α = 0.05. (The lesson's <a href="${videoUrl}" target="_blank" rel="noopener">video</a> walks through it.)</p><ol><li><strong>Hypotheses:</strong> H₀: μ ≤ 7.5, Hₐ: μ &gt; 7.5 (right-tailed).</li><li><strong>z:</strong> (8.2 − 7.5) / (2.1 / √35) = 0.7 / 0.355 = <strong>1.97</strong>.</li><li><strong>p-value:</strong> the z table gives 0.9756 to the left of 1.97, so p = 1 − 0.9756 = <strong>0.0244</strong>.</li><li><strong>Decision:</strong> 0.0244 &lt; 0.05, so reject H₀: there is enough evidence that the average is above 7.5 lb.</li></ol>`,
        `<h3>مثال الدرس خطوة بخطوة</h3><p>يقول ادعاء إن متوسط الوزن 7.5 رطل على الأكثر؛ ونشك أنه أكثر. نعرف σ = 2.1 رطل، ومتوسط عيّنة من 35 هو 8.2 رطل. α = 0.05. (<a href="${videoUrl}" target="_blank" rel="noopener">فيديو</a> الدرس يشرحه.)</p><ol><li><strong>الفرضيتان:</strong> H₀: μ ≤ 7.5، وHₐ: μ &gt; 7.5 (ذيل أيمن).</li><li><strong>z:</strong> (8.2 − 7.5) / (2.1 / √35) = 0.7 / 0.355 = <strong>1.97</strong>.</li><li><strong>قيمة p:</strong> يعطي جدول z القيمة 0.9756 يسار 1.97، فـ p = 1 − 0.9756 = <strong>0.0244</strong>.</li><li><strong>القرار:</strong> 0.0244 &lt; 0.05، فارفض H₀: توجد أدلة كافية على أن المتوسط أعلى من 7.5 رطل.</li></ol>`,
        `<h3>مثال درس، گام‌به‌گام</h3><p>ادعایی می‌گوید میانگین وزن حداکثر ۷٫۵ پوند است؛ ما گمان می‌کنیم بیشتر است. σ = ۲٫۱ پوند را می‌دانیم و میانگین یک نمونهٔ ۳۵تایی ۸٫۲ پوند است. α = ۰٫۰۵. (<a href="${videoUrl}" target="_blank" rel="noopener">ویدیوی</a> درس آن را توضیح می‌دهد.)</p><ol><li><strong>فرض‌ها:</strong> H₀: μ ≤ 7.5، Hₐ: μ &gt; 7.5 (دنبالهٔ راست).</li><li><strong>z:</strong> (8.2 − 7.5) / (2.1 / √35) = 0.7 / 0.355 = <strong>۱٫۹۷</strong>.</li><li><strong>مقدار p:</strong> جدول z سمت چپ ۱٫۹۷ را ۰٫۹۷۵۶ می‌دهد، پس p = 1 − 0.9756 = <strong>۰٫۰۲۴۴</strong>.</li><li><strong>تصمیم:</strong> ۰٫۰۲۴۴ &lt; ۰٫۰۵، پس H₀ را رد کن: شواهد کافی هست که میانگین بالای ۷٫۵ پوند است.</li></ol>`,
      ),
      figure(
        7,
        t('Reading the z table', 'قراءة جدول z', 'خواندن جدول z'),
        '/figures/week-07/deck-03-ztable.jpg',
        'A portion of the standard normal z table from the original lesson. The row 1.9 and the column 0.07 are circled, and so is the value where they meet, 0.9756.',
        fromDeck(
          'Go down to 1.9 and across to 0.07: 0.9756 is the area to the left of z = 1.97. For a right-tailed test the p-value is the rest, 1 − 0.9756. (For a two-tailed test you would double it.)',
          'انزل إلى 1.9 واتجه إلى 0.07: القيمة 0.9756 هي المساحة يسار z = 1.97. وفي اختبار الذيل الأيمن تكون قيمة p هي الباقي، 1 − 0.9756. (وفي اختبار الذيلين تضاعفها.)',
          'تا ۱٫۹ پایین برو و تا ۰٫۰۷ جلو برو: ۰٫۹۷۵۶ مساحت سمت چپ z = ۱٫۹۷ است. در آزمون دنبالهٔ راست مقدار p باقی‌مانده است، 1 − 0.9756. (در آزمون دو دنباله دوبرابرش می‌کنی.)',
        ),
      ),
      tools(
        [
          code(xl.tables),
          html(
            '<p>Excel replaces the paper table. <code>NORM.S.DIST(z, TRUE)</code> gives the area to the left of z; <code>NORM.S.INV(area)</code> goes the other way and gives the critical z.</p>',
            '<p>يحل Excel محل الجدول الورقي. تعطي <code>NORM.S.DIST(z, TRUE)</code> المساحة يسار z؛ وتعمل <code>NORM.S.INV(area)</code> في الاتجاه المعاكس فتعطي قيمة z الحرجة.</p>',
            '<p>Excel جای جدول کاغذی را می‌گیرد. <code>NORM.S.DIST(z, TRUE)</code> مساحت سمت چپ z را می‌دهد؛ <code>NORM.S.INV(area)</code> برعکس کار می‌کند و z بحرانی را می‌دهد.</p>',
          ),
        ],
        [code(py.videoZ)],
      ),
      recap(
        t('z = how far the sample is from the claim ÷ the usual wobble.', 'z = بُعد العيّنة عن الادعاء ÷ التذبذب المعتاد.', 'z = فاصلهٔ نمونه از ادعا ÷ نوسان معمول.'),
        t('Turn z into a p-value with the table or with NORM.S.DIST.', 'حوّل z إلى قيمة p بالجدول أو بـ NORM.S.DIST.', 'z را با جدول یا NORM.S.DIST به مقدار p تبدیل کن.'),
        t('Use it when σ is known and the sample is large or bell-shaped.', 'استخدمه حين تكون σ معروفة والعيّنة كبيرة أو على شكل جرس.', 'وقتی σ معلوم است و نمونه بزرگ یا زنگوله‌ای است به کارش ببر.'),
      ),
      exercise('w07-q009'),
    ],
  },
  {
    id: 'your-turn',
    navLabel: t('Your turn', 'دورك', 'نوبت تو'),
    sectionLabel: t('Section 07', 'القسم ٠٧', 'بخش ۰۷'),
    timeEst: t('8 min', '٨ دقائق', '۸ دقیقه'),
    headingHtml: t(
      '<h2>Your turn: the coaching institute\'s claim</h2><p class="standfirst">The lesson\'s exercise. Try it on paper first, then compare with the steps below.</p>',
      '<h2>دورك: ادعاء المعهد التعليمي</h2><p class="standfirst">تمرين الدرس. جرّبه على الورق أولًا، ثم قارن بالخطوات أدناه.</p>',
      '<h2>نوبت تو: ادعای آموزشگاه</h2><p class="standfirst">تمرین درس. اول روی کاغذ امتحانش کن، بعد با گام‌های زیر مقایسه کن.</p>',
    ),
    blocks: [
      html(
        '<p><strong>The problem:</strong> a coaching institute claims that its students\' mean score is <em>greater than</em> 82 marks, with a standard deviation of 20. A sample of 81 students has a mean score of 90. At the 95% confidence level (α = 0.05), is there enough evidence to support the claim?</p>',
        '<p><strong>المسألة:</strong> يدّعي معهد تعليمي أن متوسط درجات طلابه <em>أكبر من</em> 82 درجة، بانحراف معياري 20. متوسط درجات عيّنة من 81 طالبًا هو 90. عند مستوى ثقة 95% (α = 0.05)، هل توجد أدلة كافية لدعم الادعاء؟</p>',
        '<p><strong>مسئله:</strong> آموزشگاهی ادعا می‌کند میانگین نمرهٔ شاگردانش <em>بیشتر از</em> ۸۲ است، با انحراف معیار ۲۰. میانگین نمرهٔ نمونه‌ای از ۸۱ شاگرد ۹۰ است. در سطح اطمینان ۹۵٪ (α = ۰٫۰۵)، آیا شواهد کافی برای پشتیبانی از ادعا هست؟</p>',
      ),
      box(
        'example',
        t('The steps', 'الخطوات', 'گام‌ها'),
        '<ol><li><strong>Hypotheses:</strong> H₀: μ ≤ 82, Hₐ: μ &gt; 82. The claim says "greater than", so the test is right-tailed.</li><li><strong>Significance level:</strong> α = 0.05.</li><li><strong>Critical value:</strong> we need the z that leaves 0.95 of the area to its left (1 − α). In the z table 0.95 sits between 0.9495 (1.64) and 0.9505 (1.65), so <strong>z-critical = 1.645</strong>.</li><li><strong>Test statistic:</strong> z = (90 − 82) / (20 / √81) = 8 / 2.22 = <strong>3.6</strong>.</li><li><strong>Decision:</strong> 3.6 &gt; 1.645, so z is in the rejection region: reject H₀. The p-value tells the same story: 1 − 0.99984 ≈ <strong>0.0002</strong>, far below 0.05.</li></ol><p><strong>In plain words:</strong> there is enough evidence that the institute\'s students score above 82 on average.</p>',
        '<ol><li><strong>الفرضيتان:</strong> H₀: μ ≤ 82، وHₐ: μ &gt; 82. يقول الادعاء "أكبر من"، فالاختبار بذيل أيمن.</li><li><strong>مستوى الدلالة:</strong> α = 0.05.</li><li><strong>القيمة الحرجة:</strong> نحتاج z التي تترك 0.95 من المساحة يسارها (1 − α). في جدول z تقع 0.95 بين 0.9495 (1.64) و0.9505 (1.65)، فـ <strong>z الحرجة = 1.645</strong>.</li><li><strong>إحصاءة الاختبار:</strong> z = (90 − 82) / (20 / √81) = 8 / 2.22 = <strong>3.6</strong>.</li><li><strong>القرار:</strong> 3.6 &gt; 1.645، فـ z في منطقة الرفض: ارفض H₀. وقيمة p تحكي القصة نفسها: 1 − 0.99984 ≈ <strong>0.0002</strong>، أقل بكثير من 0.05.</li></ol><p><strong>بكلمات بسيطة:</strong> توجد أدلة كافية على أن متوسط درجات طلاب المعهد أعلى من 82.</p>',
        '<ol><li><strong>فرض‌ها:</strong> H₀: μ ≤ 82، Hₐ: μ &gt; 82. ادعا می‌گوید «بیشتر از»، پس آزمون دنبالهٔ راست است.</li><li><strong>سطح معناداری:</strong> α = ۰٫۰۵.</li><li><strong>مقدار بحرانی:</strong> zای لازم داریم که ۰٫۹۵ مساحت را سمت چپش بگذارد (1 − α). در جدول z، ۰٫۹۵ بین ۰٫۹۴۹۵ (۱٫۶۴) و ۰٫۹۵۰۵ (۱٫۶۵) است، پس <strong>z بحرانی = ۱٫۶۴۵</strong>.</li><li><strong>آمارهٔ آزمون:</strong> z = (90 − 82) / (20 / √81) = 8 / 2.22 = <strong>۳٫۶</strong>.</li><li><strong>تصمیم:</strong> ۳٫۶ &gt; ۱٫۶۴۵، پس z در ناحیهٔ رد است: H₀ را رد کن. مقدار p هم همین را می‌گوید: 1 − 0.99984 ≈ <strong>۰٫۰۰۰۲</strong>، خیلی کمتر از ۰٫۰۵.</li></ol><p><strong>به زبان ساده:</strong> شواهد کافی هست که میانگین نمرهٔ شاگردان آموزشگاه بالای ۸۲ است.</p>',
      ),
      figure(
        8,
        t('Finding z-critical = 1.645 in the table', 'إيجاد z الحرجة = 1.645 في الجدول', 'پیدا کردن z بحرانی = ۱٫۶۴۵ در جدول'),
        '/figures/week-07/deck-05-ztable-1645.jpg',
        'The z table from the original lesson with row 1.6 and column 0.04 outlined in red, meeting at 0.9495, next to 0.9505 in the 0.05 column.',
        fromDeck(
          '0.9495 (z = 1.64) and 0.9505 (z = 1.65) sit either side of 0.95, so z-critical is halfway: 1.645. In Excel: =NORM.S.INV(0.95).',
          'تقع 0.9495 (z = 1.64) و0.9505 (z = 1.65) على جانبي 0.95، فتكون z الحرجة في المنتصف: 1.645. وفي Excel: ‏=NORM.S.INV(0.95).',
          '۰٫۹۴۹۵ (z = ۱٫۶۴) و ۰٫۹۵۰۵ (z = ۱٫۶۵) دو طرف ۰٫۹۵ هستند، پس z بحرانی وسط است: ۱٫۶۴۵. در Excel: ‏=NORM.S.INV(0.95).',
        ),
      ),
      figure(
        9,
        t('The test statistic lands in the rejection region', 'إحصاءة الاختبار تقع في منطقة الرفض', 'آمارهٔ آزمون در ناحیهٔ رد می‌افتد'),
        '/figures/week-07/deck-06-z-calc.jpg',
        'From the original lesson: z = (x-bar minus mu) over (sigma over root n) = (90 - 82) / (20 / root 81) = 8 / 2.2 = 3.6, above a green bell curve whose small red right tail starts at 1.645, with an arrow pointing to 3.6 inside the red tail.',
        fromDeck(
          'The red tail starts at 1.645; our z = 3.6 is far inside it. (The slide rounds 20 / √81 to 2.2; it is 2.22, and 8 / 2.22 = 3.6.)',
          'يبدأ الذيل الأحمر عند 1.645؛ وz = 3.6 تقع في عمقه. (تقرّب الشريحة 20 / √81 إلى 2.2؛ وهي 2.22، و8 / 2.22 = 3.6.)',
          'دنبالهٔ قرمز از ۱٫۶۴۵ شروع می‌شود؛ z = ۳٫۶ ما خیلی داخل آن است. (اسلاید 20 / √81 را ۲٫۲ گرد کرده؛ ۲٫۲۲ است و 8 / 2.22 = 3.6.)',
        ),
      ),
      tools(
        [
          code(`=NORM.S.INV(0.95)                 → 1.645  (z-critical, right-tailed, alpha = 0.05)
=(90 - 82) / (20 / SQRT(81))       → 3.6    (z)
=1 - NORM.S.DIST(3.6, TRUE)        → 0.00016 (p-value)`),
        ],
        [code(py.yourTurn)],
      ),
      box(
        'keypoint',
        t('Two ways to decide, one answer', 'طريقتان للقرار وإجابة واحدة', 'دو راه تصمیم، یک جواب'),
        '<p>Compare <strong>z with z-critical</strong> (3.6 &gt; 1.645), or compare <strong>p with α</strong> (0.0002 &lt; 0.05). Both always agree. Note that 0.95 here is an <em>area</em>, the part of the curve to the left of z-critical. The slide calls it "p_value", but it is not a p-value.</p>',
        '<p>قارن <strong>z بـ z الحرجة</strong> (3.6 &gt; 1.645)، أو قارن <strong>p بـ α</strong> (0.0002 &lt; 0.05). الطريقتان تتفقان دائمًا. ولاحظ أن 0.95 هنا <em>مساحة</em>، أي جزء المنحنى يسار z الحرجة. تسمّيها الشريحة "p_value"، لكنها ليست قيمة p.</p>',
        '<p><strong>z را با z بحرانی</strong> مقایسه کن (۳٫۶ &gt; ۱٫۶۴۵)، یا <strong>p را با α</strong> (۰٫۰۰۰۲ &lt; ۰٫۰۵). هر دو همیشه یک جواب می‌دهند. توجه کن که ۰٫۹۵ اینجا یک <em>مساحت</em> است، بخشی از منحنی که سمت چپ z بحرانی است. اسلاید آن را «p_value» می‌نامد، اما مقدار p نیست.</p>',
      ),
      recap(
        t('Five steps: hypotheses, α, critical value, z, decision.', 'خمس خطوات: الفرضيتان، α، القيمة الحرجة، z، القرار.', 'پنج گام: فرض‌ها، α، مقدار بحرانی، z، تصمیم.'),
        t('Finish with one plain sentence a manager can read.', 'اختم بجملة بسيطة يستطيع المدير قراءتها.', 'با یک جملهٔ ساده که مدیر بتواند بخواند تمام کن.'),
      ),
      exercise('w07-q010'),
    ],
  },
  {
    id: 'two-groups',
    navLabel: t('Two groups', 'مجموعتان', 'دو گروه'),
    sectionLabel: t('Section 08', 'القسم ٠٨', 'بخش ۰۸'),
    timeEst: t('10 min', '١٠ دقائق', '۱۰ دقیقه'),
    headingHtml: t(
      '<h2>Two groups: the test you will use in your project</h2><p class="standfirst">The lesson\'s z-test compares one sample with a known value. Most business questions compare two groups: tasting days against normal days, smokers against non-smokers. It is the same five steps, and Excel does the maths.</p>',
      '<h2>مجموعتان: الاختبار الذي ستستخدمه في مشروعك</h2><p class="standfirst">يقارن اختبار z في الدرس عيّنة واحدة بقيمة معروفة. ومعظم أسئلة العمل تقارن مجموعتين: أيام التذوق مقابل الأيام العادية، والمدخنون مقابل غير المدخنين. إنها الخطوات الخمس نفسها، وExcel يتولى الحساب.</p>',
      '<h2>دو گروه: آزمونی که در پروژه‌ات به کار می‌بری</h2><p class="standfirst">آزمون z درس یک نمونه را با یک مقدار معلوم مقایسه می‌کند. بیشتر پرسش‌های کسب‌وکار دو گروه را مقایسه می‌کنند: روزهای مزه‌کردن در برابر روزهای عادی، سیگاری‌ها در برابر غیرسیگاری‌ها. همان پنج گام است و Excel حساب را انجام می‌دهد.</p>',
    ),
    blocks: [
      analogy(
        '<p>Two checkout queues: today the left one seemed faster. Was it really faster, or did you just watch it for two lucky minutes? Comparing two groups asks one question: <em>is the gap between them bigger than the normal day-to-day wobble?</em></p>',
        '<p>طابوران عند الصندوق: بدا اليوم أن الأيسر أسرع. هل كان أسرع فعلًا، أم أنك راقبته فقط دقيقتين محظوظتين؟ مقارنة مجموعتين تسأل سؤالًا واحدًا: <em>هل الفجوة بينهما أكبر من التذبذب اليومي المعتاد؟</em></p>',
        '<p>دو صف صندوق: امروز صف چپ سریع‌تر به نظر می‌رسید. واقعاً سریع‌تر بود، یا فقط دو دقیقهٔ خوش‌شانس تماشایش کردی؟ مقایسهٔ دو گروه یک پرسش می‌پرسد: <em>آیا فاصلهٔ آن‌ها از نوسان معمول روزبه‌روز بزرگ‌تر است؟</em></p>',
      ),
      html(
        '<p><strong>The data:</strong> <a href="/data/jam-tasting.csv" download>jam-tasting.csv</a>, 20 Saturdays from April to August 2024. The owner put the tasting table out <em>every other</em> Saturday, so both groups had the same mix of weather and seasons. Columns: <code>date</code>, <code>tasting</code> (yes/no), <code>visitors</code>, <code>buyers</code>, <code>jars</code>.</p><h3>1. Two averages: do tasting days sell more jars?</h3><p>H₀: tasting Saturdays sell no more jars on average than normal Saturdays. Hₐ: they sell more ("more", so right-tailed; α = 0.05). Tasting Saturdays sold <strong>64.9</strong> jars on average, the others <strong>55.4</strong>: about 9.5 jars more. The test gives <strong>p = 0.0103</strong>, below 0.05, so reject H₀: the gap is bigger than normal wobble.</p>',
        '<p><strong>البيانات:</strong> <a href="/data/jam-tasting.csv" download>jam-tasting.csv</a>، أي 20 يوم سبت من أبريل إلى أغسطس 2024. وضع المالك طاولة التذوق في سبت <em>ويوم لا</em>، فكان للمجموعتين المزيج نفسه من الطقس والمواسم. الأعمدة: <code>date</code> و<code>tasting</code> (yes/no) و<code>visitors</code> و<code>buyers</code> و<code>jars</code>.</p><h3>1. متوسطان: هل تبيع أيام التذوق برطمانات أكثر؟</h3><p>H₀: أيام السبت بالتذوق لا تبيع في المتوسط برطمانات أكثر من العادية. Hₐ: تبيع أكثر («أكثر»، فهو بذيل أيمن؛ α = 0.05). باعت أيام التذوق <strong>64.9</strong> برطمانًا في المتوسط، والأخرى <strong>55.4</strong>: أي نحو 9.5 برطمانات أكثر. يعطي الاختبار <strong>p = 0.0103</strong>، أقل من 0.05، فارفض H₀: الفجوة أكبر من التذبذب المعتاد.</p>',
        '<p><strong>داده:</strong> <a href="/data/jam-tasting.csv" download>jam-tasting.csv</a>، ۲۰ شنبه از آوریل تا اوت ۲۰۲۴. صاحب غرفه میز مزه‌کردن را <em>یک شنبه در میان</em> گذاشت، پس هر دو گروه ترکیب یکسانی از هوا و فصل داشتند. ستون‌ها: <code>date</code>، <code>tasting</code> (yes/no)، <code>visitors</code>، <code>buyers</code>، <code>jars</code>.</p><h3>۱. دو میانگین: آیا روزهای مزه‌کردن شیشهٔ بیشتری می‌فروشند؟</h3><p>H₀: شنبه‌های با مزه‌کردن به‌طور میانگین بیشتر از شنبه‌های عادی نمی‌فروشند. Hₐ: بیشتر می‌فروشند («بیشتر»، پس دنبالهٔ راست؛ α = ۰٫۰۵). شنبه‌های مزه‌کردن به‌طور میانگین <strong>۶۴٫۹</strong> شیشه فروختند و بقیه <strong>۵۵٫۴</strong>: حدود ۹٫۵ شیشه بیشتر. آزمون <strong>p = ۰٫۰۱۰۳</strong> می‌دهد، کمتر از ۰٫۰۵، پس H₀ را رد کن: فاصله از نوسان معمول بزرگ‌تر است.</p>',
      ),
      tools([code(xl.twoMeans)], [code(py.twoMeans)]),
      html(
        '<h3>2. Two rates: does tasting turn more visitors into buyers?</h3><p>When the answer is yes/no (bought or not, left or stayed), compare two <em>percentages</em>. With tasting, 450 of 1,459 visitors bought (<strong>30.8%</strong>); without, 380 of 1,403 (<strong>27.1%</strong>). Hₐ says "more", so the test is right-tailed again: <strong>p = 0.013</strong>, below 0.05, so this gap is also real.</p>',
        '<h3>2. معدّلان: هل يحوّل التذوق زوارًا أكثر إلى مشترين؟</h3><p>حين تكون الإجابة نعم/لا (اشترى أم لا، غادر أم بقي) قارن <em>نسبتين مئويتين</em>. مع التذوق اشترى 450 من 1,459 زائرًا (<strong>30.8%</strong>)؛ وبدونه 380 من 1,403 (<strong>27.1%</strong>). تقول Hₐ «أكثر»، فالاختبار بذيل أيمن مجددًا: <strong>p = 0.013</strong>، أقل من 0.05، فهذه الفجوة حقيقية أيضًا.</p>',
        '<h3>۲. دو نرخ: آیا مزه‌کردن بازدیدکنندهٔ بیشتری را به خریدار تبدیل می‌کند؟</h3><p>وقتی جواب بله/نه است (خرید یا نه، رفت یا ماند)، دو <em>درصد</em> را مقایسه کن. با مزه‌کردن ۴۵۰ نفر از ۱٬۴۵۹ بازدیدکننده خریدند (<strong>۳۰٫۸٪</strong>)؛ بدون آن ۳۸۰ نفر از ۱٬۴۰۳ (<strong>۲۷٫۱٪</strong>). Hₐ می‌گوید «بیشتر»، پس آزمون باز دنبالهٔ راست است: <strong>p = ۰٫۰۱۳</strong>، کمتر از ۰٫۰۵، پس این فاصله هم واقعی است.</p>',
      ),
      tools([code(xl.twoRates)], [code(py.twoRates)]),
      html(
        '<h3>Which test does your case card need?</h3><p>Look at the answer in your case card\'s test question: a <strong>number</strong> per row (money, charges) means two averages; a <strong>yes/no</strong> per row (churned, left, cancelled, subscribed) means two rates.</p>',
        '<h3>أي اختبار تحتاجه بطاقة حالتك؟</h3><p>انظر إلى الإجابة في سؤال الاختبار في بطاقة حالتك: <strong>رقم</strong> لكل صف (مال، رسوم) يعني متوسطين؛ و<strong>نعم/لا</strong> لكل صف (تسرّب، غادر، ألغى، اشترك) يعني معدّلين.</p>',
        '<h3>کارت مورد تو کدام آزمون را لازم دارد؟</h3><p>به جواب پرسش آزمون کارت مورد خودت نگاه کن: یک <strong>عدد</strong> در هر سطر (پول، هزینه) یعنی دو میانگین؛ یک <strong>بله/نه</strong> در هر سطر (ریزش، ترک کار، لغو، اشتراک) یعنی دو نرخ.</p>',
      ),
      {
        type: 'table',
        headers: [t('Case', 'الحالة', 'مورد'), t('Compares', 'يقارن', 'مقایسه می‌کند'), t('Test', 'الاختبار', 'آزمون')],
        rows: [
          [t('C1 churn, C4 attrition, C6 cancellations, C7 bank deposits', 'C1 التسرّب، C4 تسرّب الموظفين، C6 الإلغاءات، C7 الودائع', 'C1 ریزش، C4 ترک کار، C6 لغوها، C7 سپرده‌ها'), t('Two percentages (yes/no per row)', 'نسبتان مئويتان (نعم/لا لكل صف)', 'دو درصد (بله/نه در هر سطر)'), t('Two rates (the formula block above)', 'معدّلان (كتلة المعادلات أعلاه)', 'دو نرخ (بلوک فرمول بالا)')],
          [t('C2 profit, C3 spending, C5 charges, C8 order value', 'C2 الربح، C3 الإنفاق، C5 الرسوم، C8 قيمة الطلب', 'C2 سود، C3 هزینه، C5 هزینهٔ بیمه، C8 ارزش سفارش'), t('Two averages (a number per row)', 'متوسطان (رقم لكل صف)', 'دو میانگین (یک عدد در هر سطر)'), t('T.TEST', 'T.TEST', 'T.TEST')],
        ],
      },
      recap(
        t('Two groups, same five steps: hypotheses, α, test, p-value, decision.', 'مجموعتان، والخطوات الخمس نفسها: الفرضيتان، α، الاختبار، قيمة p، القرار.', 'دو گروه، همان پنج گام: فرض‌ها، α، آزمون، مقدار p، تصمیم.'),
        t('A number per row → two averages (T.TEST). Yes/no per row → two rates.', 'رقم لكل صف ← متوسطان (T.TEST). نعم/لا لكل صف ← معدّلان.', 'یک عدد در هر سطر ← دو میانگین (T.TEST). بله/نه در هر سطر ← دو نرخ.'),
        t('Compare like with like: alternate the groups so weather and season are shared.', 'قارن المتشابه بالمتشابه: بدّل بين المجموعتين ليتقاسما الطقس والموسم.', 'هم‌جنس را با هم‌جنس مقایسه کن: گروه‌ها را یکی در میان کن تا هوا و فصل مشترک باشد.'),
      ),
      exercise('w07-q011'),
    ],
  },
]

// ---------- Sections 9-13 ----------
const closing: Sections = [
  {
    id: 'ai-corner',
    navLabel: t('AI co-pilot corner', 'ركن مساعد الذكاء الاصطناعي', 'گوشهٔ همیار هوش مصنوعی'),
    sectionLabel: t('Section 09', 'القسم ٠٩', 'بخش ۰۹'),
    timeEst: t('5 min', '٥ دقائق', '۵ دقیقه'),
    headingHtml: t(
      '<h2>AI co-pilot corner: it runs the test, you write the conclusion</h2><p class="standfirst">An AI assistant picks and runs a test in seconds. It is much less careful about which tail it used and about the word "proves".</p>',
      '<h2>ركن مساعد الذكاء الاصطناعي: هو يجري الاختبار، وأنت تكتب الاستنتاج</h2><p class="standfirst">يختار مساعد الذكاء الاصطناعي اختبارًا ويجريه في ثوانٍ. لكنه أقل حرصًا بكثير بشأن الذيل الذي استخدمه وبشأن كلمة "يثبت".</p>',
      '<h2>گوشهٔ همیار هوش مصنوعی: او آزمون را اجرا می‌کند، تو نتیجه را می‌نویسی</h2><p class="standfirst">دستیار هوش مصنوعی در چند ثانیه آزمونی را انتخاب و اجرا می‌کند. اما دربارهٔ اینکه کدام دنباله را به کار برده و دربارهٔ واژهٔ «ثابت می‌کند» خیلی کمتر دقیق است.</p>',
    ),
    blocks: [
      {
        type: 'tabs',
        tabs: [
          {
            label: t('Weak prompt', 'طلب ضعيف', 'درخواست ضعیف'),
            blocks: [
              html(
                '<p>"Does the tasting table work? Here is my data." A typical answer: "Yes! Tasting increases sales by 17% (p &lt; 0.05), which proves it works." Three problems: you do not know which test or tail it used, "p &lt; 0.05" hides the actual number, and a test never <em>proves</em> anything.</p>',
                '<p>"هل تنجح طاولة التذوق؟ هذه بياناتي." إجابة نموذجية: "نعم! التذوق يزيد المبيعات 17% (p &lt; 0.05)، وهذا يثبت أنه ينجح." ثلاث مشكلات: لا تعرف أي اختبار أو ذيل استخدم، و"p &lt; 0.05" تخفي الرقم الفعلي، والاختبار لا <em>يثبت</em> شيئًا أبدًا.</p>',
                '<p>«آیا میز مزه‌کردن جواب می‌دهد؟ این دادهٔ من است.» یک پاسخ معمولی: «بله! مزه‌کردن فروش را ۱۷٪ بالا می‌برد (p &lt; 0.05) که ثابت می‌کند جواب می‌دهد.» سه مشکل: نمی‌دانی کدام آزمون یا دنباله را به کار برده، «p &lt; 0.05» عدد واقعی را پنهان می‌کند، و آزمون هرگز چیزی را <em>ثابت</em> نمی‌کند.</p>',
              ),
            ],
          },
          {
            label: t('Strong prompt', 'طلب قوي', 'درخواست قوی'),
            blocks: [
              code(`Here are 20 Saturdays of jam stand data (CSV pasted below): date, tasting (yes/no), visitors, buyers, jars.
My question: do tasting Saturdays sell MORE jars than normal Saturdays?
1. Write H0 and Ha in words and symbols, and say which tail and why.
2. Use alpha = 0.05, chosen before looking at the result.
3. Run Welch's t-test on jars (one-tailed), and give the exact p-value and both averages.
4. Give me the Excel formula I can use to check your p-value myself.
5. Write the conclusion in one plain sentence. Do not say "proves"; say how big the difference is.`),
            ],
          },
        ],
      },
      box(
        'keypoint',
        t('Key point', 'نقطة أساسية', 'نکتهٔ کلیدی'),
        '<p>Check one number yourself (<code>=T.TEST(E12:E21, E2:E11, 1, 3)</code> takes seconds) and rewrite the conclusion in your own words: "enough evidence that…", with the size of the effect, never "proves".</p>',
        '<p>تحقق من رقم واحد بنفسك (<code>=T.TEST(E12:E21, E2:E11, 1, 3)</code> يستغرق ثوانٍ) وأعد كتابة الاستنتاج بكلماتك: "توجد أدلة كافية على أن…"، مع حجم الأثر، ولا تقل أبدًا "يثبت".</p>',
        '<p>یک عدد را خودت بررسی کن (<code>=T.TEST(E12:E21, E2:E11, 1, 3)</code> چند ثانیه طول می‌کشد) و نتیجه را با واژه‌های خودت بازنویسی کن: «شواهد کافی هست که…»، همراه با اندازهٔ اثر، هرگز «ثابت می‌کند».</p>',
      ),
    ],
  },
  {
    id: 'worked-example',
    navLabel: t('Worked example', 'مثال تطبيقي', 'مثال حل‌شده'),
    sectionLabel: t('Section 10', 'القسم ١٠', 'بخش ۱۰'),
    timeEst: t('8 min', '٨ دقائق', '۸ دقیقه'),
    headingHtml: t(
      '<h2>Worked example: are the jars under-filled?</h2><p class="standfirst">One complete test on the jam stand, all five steps, ending with the note the owner actually reads.</p>',
      '<h2>مثال تطبيقي: هل البرطمانات ناقصة التعبئة؟</h2><p class="standfirst">اختبار كامل واحد على كشك المربى، بخطواته الخمس، ينتهي بالملاحظة التي يقرؤها المالك فعلًا.</p>',
      '<h2>مثال حل‌شده: آیا شیشه‌ها کم‌پرند؟</h2><p class="standfirst">یک آزمون کامل روی غرفهٔ مربا، با هر پنج گام، که به یادداشتی می‌رسد که صاحب غرفه واقعاً می‌خواند.</p>',
    ),
    blocks: [
      html(
        '<p>The supplier promises jars of <strong>340 g</strong>, and its filling machine has a known spread of <strong>σ = 6 g</strong>. The owner weighs <strong>36 jars</strong> and gets an average of <strong>338 g</strong>. Is that just normal variation, or is the supplier filling short?</p><ol><li><strong>Hypotheses:</strong> H₀: μ ≥ 340 g (the promise holds). Hₐ: μ &lt; 340 g (under-filled). The question says "under", so the test is left-tailed.</li><li><strong>α = 0.05</strong>, chosen before weighing.</li><li><strong>z</strong> = (338 − 340) / (6 / √36) = −2 / 1 = <strong>−2.00</strong>.</li><li><strong>p-value</strong> = area to the left of −2.00 = <strong>0.023</strong>.</li><li><strong>Decision:</strong> 0.023 &lt; 0.05, so reject H₀.</li></ol>',
        '<p>يَعِد المورّد ببرطمانات من <strong>340 غرامًا</strong>، ولآلة التعبئة لديه تشتّت معروف <strong>σ = 6 غرامات</strong>. يزن المالك <strong>36 برطمانًا</strong> فيحصل على متوسط <strong>338 غرامًا</strong>. هل هذا مجرد تفاوت طبيعي، أم أن المورّد يعبّئ ناقصًا؟</p><ol><li><strong>الفرضيتان:</strong> H₀: μ ≥ 340 غرامًا (الوعد قائم). Hₐ: μ &lt; 340 غرامًا (تعبئة ناقصة). يقول السؤال "ناقصة"، فالاختبار بذيل أيسر.</li><li><strong>α = 0.05</strong>، اختيرت قبل الوزن.</li><li><strong>z</strong> = (338 − 340) / (6 / √36) = ‎−2 / 1 = <strong>‎−2.00</strong>.</li><li><strong>قيمة p</strong> = المساحة يسار ‎−2.00 = <strong>0.023</strong>.</li><li><strong>القرار:</strong> 0.023 &lt; 0.05، فارفض H₀.</li></ol>',
        '<p>تأمین‌کننده شیشه‌های <strong>۳۴۰ گرمی</strong> قول می‌دهد و دستگاه پرکنش پراکندگی معلوم <strong>σ = ۶ گرم</strong> دارد. صاحب غرفه <strong>۳۶ شیشه</strong> را وزن می‌کند و میانگین <strong>۳۳۸ گرم</strong> می‌گیرد. این فقط نوسان عادی است یا تأمین‌کننده کم پر می‌کند؟</p><ol><li><strong>فرض‌ها:</strong> H₀: μ ≥ 340 گرم (قول درست است). Hₐ: μ &lt; 340 گرم (کم‌پر). پرسش می‌گوید «کم»، پس آزمون دنبالهٔ چپ است.</li><li><strong>α = ۰٫۰۵</strong>، پیش از وزن کردن انتخاب شده.</li><li><strong>z</strong> = (338 − 340) / (6 / √36) = ‎−2 / 1 = <strong>‎−۲٫۰۰</strong>.</li><li><strong>مقدار p</strong> = مساحت سمت چپ ‎−۲٫۰۰ = <strong>۰٫۰۲۳</strong>.</li><li><strong>تصمیم:</strong> ۰٫۰۲۳ &lt; ۰٫۰۵، پس H₀ را رد کن.</li></ol>',
      ),
      tools([code(xl.jam)], [code(py.jam)]),
      box(
        'example',
        t('Note to the owner', 'ملاحظة إلى المالك', 'یادداشت برای صاحب غرفه'),
        '<p><strong>The jars look under-filled.</strong> The 36 jars we weighed averaged 338 g against the promised 340 g. If the machine were filling correctly, an average this low would turn up only about 2 times in 100, so it is unlikely to be bad luck. The gap is small (2 g, about 0.6%), but it is real: ask the supplier to check the machine and weigh another batch next month.</p>',
        '<p><strong>تبدو البرطمانات ناقصة التعبئة.</strong> بلغ متوسط البرطمانات الـ36 التي وزنّاها 338 غرامًا مقابل 340 غرامًا موعودة. لو كانت الآلة تعبّئ بشكل صحيح لظهر متوسط منخفض كهذا نحو مرتين فقط من كل 100، فالأرجح أنه ليس سوء حظ. الفرق صغير (2 غرام، نحو 0.6%)، لكنه حقيقي: اطلب من المورّد فحص الآلة وزِن دفعة أخرى الشهر القادم.</p>',
        '<p><strong>شیشه‌ها کم‌پر به نظر می‌رسند.</strong> میانگین ۳۶ شیشه‌ای که وزن کردیم ۳۳۸ گرم بود در برابر ۳۴۰ گرم قول‌داده‌شده. اگر دستگاه درست پر می‌کرد، چنین میانگین پایینی فقط حدود ۲ بار در ۱۰۰ بار پیش می‌آمد، پس بعید است بدشانسی باشد. فاصله کوچک است (۲ گرم، حدود ۰٫۶٪)، اما واقعی است: از تأمین‌کننده بخواه دستگاه را بررسی کند و ماه بعد یک بچ دیگر را وزن کن.</p>',
      ),
      html(
        `<p><strong>Prefer a ready-made file?</strong> All of this week's Python is also a notebook: <a href="${notebookUrl}" target="_blank" rel="noopener">open it in Colab</a>, then <em>Runtime ▸ Run all</em>.</p>`,
        `<p><strong>تفضّل ملفًا جاهزًا؟</strong> كل كود Python لهذا الأسبوع متاح أيضًا كدفتر: <a href="${notebookUrl}" target="_blank" rel="noopener">افتحه في Colab</a> ثم <em>Runtime ▸ Run all</em>.</p>`,
        `<p><strong>فایل آماده می‌خواهی؟</strong> همهٔ کد Python این هفته به‌صورت یک دفترچه هم هست: <a href="${notebookUrl}" target="_blank" rel="noopener">در Colab بازش کن</a> و بعد <em>Runtime ▸ Run all</em>.</p>`,
      ),
    ],
  },
  {
    id: 'common-mistakes',
    navLabel: t('Common mistakes', 'أخطاء شائعة', 'اشتباهات رایج'),
    sectionLabel: t('Section 11', 'القسم ١١', 'بخش ۱۱'),
    headingHtml: t(
      '<h2>Common mistakes</h2><p class="standfirst">Each one gives a confident sentence that the test does not support.</p>',
      '<h2>أخطاء شائعة</h2><p class="standfirst">كل واحد منها يعطي جملة واثقة لا يدعمها الاختبار.</p>',
      '<h2>اشتباهات رایج</h2><p class="standfirst">هر کدام جمله‌ای مطمئن می‌سازد که آزمون پشتیبانش نیست.</p>',
    ),
    blocks: [
      {
        type: 'table',
        headers: [t('Mistake', 'الخطأ', 'اشتباه'), t('Why it is wrong', 'لماذا هو خطأ', 'چرا اشتباه است'), t('Instead', 'بدلًا من ذلك', 'به‌جایش')],
        rows: [
          [t('"p is above 0.05, so there is no effect"', '"p أكبر من 0.05، إذن لا يوجد أثر"', '«p بالای ۰٫۰۵ است، پس اثری نیست»'), t('Not enough evidence is not proof of nothing; small samples often miss real effects', 'غياب الأدلة الكافية ليس دليلًا على العدم؛ والعيّنات الصغيرة كثيرًا ما تفوّت آثارًا حقيقية', 'نبودِ شواهد کافی اثبات نبودن نیست؛ نمونه‌های کوچک اغلب اثرهای واقعی را از دست می‌دهند'), t('Say "not enough evidence yet", and collect more data', 'قل "لا أدلة كافية بعد" واجمع بيانات أكثر', 'بگو «هنوز شواهد کافی نیست» و دادهٔ بیشتری جمع کن')],
          [t('Choosing α or the tail after seeing the result', 'اختيار α أو الذيل بعد رؤية النتيجة', 'انتخاب α یا دنباله پس از دیدن نتیجه'), t('You can make almost anything look significant', 'تستطيع أن تجعل أي شيء تقريبًا يبدو دالًا', 'تقریباً هر چیزی را می‌توانی معنادار نشان دهی'), t('Write H₀, Hₐ, the tail and α first', 'اكتب H₀ وHₐ والذيل وα أولًا', 'اول H₀، Hₐ، دنباله و α را بنویس')],
          [t('"Significant" means "important"', '"دال" تعني "مهم"', '«معنادار» یعنی «مهم»'), t('p says the gap is real, not that it is big enough to matter', 'تقول p إن الفجوة حقيقية، لا إنها كبيرة بما يكفي لتهم', 'p می‌گوید فاصله واقعی است، نه اینکه آن‌قدر بزرگ است که مهم باشد'), t('Always report the size: 9.5 more jars, 2 g lighter', 'اذكر الحجم دائمًا: 9.5 برطمانات أكثر، وأخف بغرامين', 'همیشه اندازه را بگو: ۹٫۵ شیشه بیشتر، ۲ گرم سبک‌تر')],
          [t('Testing again and again until p drops below 0.05', 'الاختبار مرة بعد مرة حتى تنخفض p تحت 0.05', 'آزمودن بارها و بارها تا p زیر ۰٫۰۵ برود'), t('With α = 0.05, about 1 test in 20 is a false alarm by luck alone', 'مع α = 0.05 يكون نحو اختبار من كل 20 إنذارًا كاذبًا بالحظ وحده', 'با α = ۰٫۰۵ حدود ۱ آزمون از ۲۰ فقط از روی شانس هشدار اشتباه است'), t('Decide the one test you will run before you look', 'قرّر الاختبار الواحد الذي ستجريه قبل أن تنظر', 'پیش از نگاه کردن آزمونی را که اجرا می‌کنی تعیین کن')],
          [t('Reading p as "the chance H₀ is true"', 'قراءة p على أنها "احتمال صحة H₀"', 'خواندن p به‌شکل «احتمال درستی H₀»'), t('p is calculated assuming H₀ is true', 'تُحسب p على افتراض أن H₀ صحيحة', 'p با فرض درستی H₀ حساب می‌شود'), t('"If nothing were going on, a result like this would be rare"', '"لو لم يكن هناك شيء لكانت نتيجة كهذه نادرة"', '«اگر هیچ اتفاقی نمی‌افتاد، چنین نتیجه‌ای نادر بود»')],
          [t('Comparing groups that differ in other ways', 'مقارنة مجموعات تختلف في أشياء أخرى', 'مقایسهٔ گروه‌هایی که در چیزهای دیگری هم فرق دارند'), t('Tasting only in summer would mix the tasting effect with the season', 'التذوق في الصيف فقط سيخلط أثر التذوق بأثر الموسم', 'مزه‌کردن فقط در تابستان اثر مزه‌کردن را با فصل قاطی می‌کند'), t('Alternate the groups, as the stand did', 'بدّل بين المجموعتين كما فعل الكشك', 'گروه‌ها را یکی در میان کن، همان‌طور که غرفه کرد')],
        ],
      },
      exercise('w07-q012'),
    ],
  },
  {
    id: 'homework',
    navLabel: t('Homework', 'الواجب', 'تکلیف'),
    sectionLabel: t('Section 12', 'القسم ١٢', 'بخش ۱۲'),
    headingHtml: t(
      '<h2>Homework: step 4 of your final project, the hypothesis test</h2><p class="standfirst">Run the test on your pair\'s case card. Three short questions, each with an analogy, a checklist and an example answer on the jam stand; a feedback question comes last.</p>',
      '<h2>الواجب: الخطوة 4 من مشروعك النهائي، اختبار الفرضية</h2><p class="standfirst">أجريا الاختبار المذكور في بطاقة حالتكما. ثلاثة أسئلة قصيرة، لكل منها تشبيه وقائمة تحقق ومثال إجابة على كشك المربى؛ ثم سؤال للتقييم في النهاية.</p>',
      '<h2>تکلیف: گام ۴ پروژهٔ نهایی، آزمون فرض</h2><p class="standfirst">آزمون کارت مورد گروهتان را اجرا کنید. سه پرسش کوتاه، هر کدام با تشبیه، فهرست کنترل و نمونه‌پاسخ روی غرفهٔ مربا؛ یک پرسش بازخورد هم در آخر.</p>',
    ),
    blocks: [week07Homework],
  },
  {
    id: 'before-week-8',
    navLabel: t('Before Week 8', 'قبل الأسبوع 8', 'پیش از هفته ۸'),
    sectionLabel: t('Section 13', 'القسم ١٣', 'بخش ۱۳'),
    headingHtml: t(
      '<h2>Before Week 8</h2><p>You can now say whether a difference in your data is real or just luck. Week 8 puts all the pieces together into one story: the question, the clean data, the charts, the regression and the test. Bring your project document with Weeks 4–7 in it.</p>',
      '<h2>قبل الأسبوع 8</h2><p>تستطيع الآن أن تقول هل الفرق في بياناتك حقيقي أم مجرد حظ. يجمع الأسبوع 8 القطع كلها في قصة واحدة: السؤال والبيانات النظيفة والرسوم والانحدار والاختبار. أحضر مستند مشروعك وفيه الأسابيع 4–7.</p>',
      '<h2>پیش از هفته ۸</h2><p>حالا می‌توانی بگویی تفاوتی در داده‌ات واقعی است یا فقط شانس. هفتهٔ ۸ همهٔ تکه‌ها را در یک داستان کنار هم می‌گذارد: پرسش، دادهٔ تمیز، نمودارها، رگرسیون و آزمون. سند پروژه‌ات را با هفته‌های ۴ تا ۷ بیاور.</p>',
    ),
    blocks: [],
  },
]

export const weekSeven: Week = {
  id: 'week-07',
  originalPdf: '/originals/week-07.pdf',
  order: 7,
  cover: {
    kicker: t('Business Analytics 2 · Week 7', 'تحليلات الأعمال 2 · الأسبوع 7', 'تحلیل کسب‌وکار ۲ · هفته ۷'),
    titleHtml: t(
      '<h1>Hypothesis Testing:<em>Is It Real, or Just Luck?</em></h1><p class="lede">A difference in your data can be a real effect or a few lucky days. This week you learn the standard way to tell them apart: two opposite stories, a risk you accept in advance, a p-value, and one plain sentence for the decision.</p>',
      '<h1>اختبار الفرضيات:<em>هل هو حقيقي أم مجرد حظ؟</em></h1><p class="lede">قد يكون الفرق في بياناتك أثرًا حقيقيًا أو بضعة أيام محظوظة. هذا الأسبوع تتعلم الطريقة المعتادة للتمييز بينهما: قصتان متعاكستان، وخطر تقبله مسبقًا، وقيمة p، وجملة بسيطة واحدة للقرار.</p>',
      '<h1>آزمون فرض:<em>واقعی است یا فقط شانس؟</em></h1><p class="lede">تفاوتی در داده‌ات می‌تواند اثری واقعی باشد یا چند روز خوش‌شانس. این هفته راه استاندارد تشخیص این دو را یاد می‌گیری: دو داستان مخالف، ریسکی که از قبل می‌پذیری، یک مقدار p و یک جملهٔ ساده برای تصمیم.</p>',
    ),
    timeEstimate: t('≈ 90 min · reading + Excel and Python practice', '≈ ٩٠ دقيقة · قراءة وتدريب Excel وPython', '≈ ۹۰ دقیقه · مطالعه و تمرین Excel و Python'),
  },
  questions,
  sections: [...basics, ...testing, ...closing],
}
