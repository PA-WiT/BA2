// Authored for the React app from the original Week 7 deck ("Week 7 HypothesisTesting", 21 slides), saved as
// public/originals/week-07.pdf. Kept simple on purpose, in the same shape as the other weeks: one idea per section,
// one everyday analogy, one tiny example with real numbers, an "In one minute" recap and a quick check.
// The deck's own images were extracted from the PDF (public/figures/week-07/deck-NN-*.jpg). Not reused on purpose:
// slide 9's significance-level curve (294 px wide, too blurry; redrawn as diagram-01.svg), slide 13 (a frame of a
// YouTube video with a subscribe badge; its example was later replaced by a jam one, see below) and slides 14/21 (pictures
// of text, written out as text).
// Added beyond the deck: the jam stand examples, the courtroom table of mistakes, and the short
// "Two groups" section, because every final-project case card compares two groups (two averages or two rates).
// Deck slips corrected quietly, not copied:
//  - Slide 18 calls 1 - α = 0.95 a "p_value"; it is the area to the left of z-critical.
//  - Slide 20 writes 20/√81 = 2.2; it is 2.22, and 8 / 2.22 = 3.6 (8 / 2.2 would be 3.64).
//  - Slide 7 writes p for the left-handed proportion, which clashes with the p-value; the page says "proportion".
//  - Slide 12 says the population "mean and variance are known"; what the z-test needs is the population σ.
// Every number was computed by script (scipy, statsmodels) and the Excel formulas were recalculated in LibreOffice.
// Python cells live in week07Code.ts and public/notebooks/week-07-hypothesis-testing.ipynb.
// Later revision (simpler): sections 5-7 live in week07Simple.ts and use only the jam stand (the jam taster, "56 jars a
// Saturday" on jam-tasting.csv, the new recipe's spending) with plain-language boxes for the symbols. The deck's video
// example (7.5 lb), the coin and the coaching institute exercise were dropped, with their figures (deck-02, deck-03,
// deck-06); q008, q010 and q011 were retired and q013-q016 added.
// ar/fa are draft translations awaiting native review, like the earlier weeks. Code and formulas stay English.
import type { Block, Localized, Question, Week } from '../types'
import { week07Homework } from './homework/week-07'
import { py, xl } from './week07Code'
import * as simple from './week07Simple'

const notebookUrl =
  'https://colab.research.google.com/github/PA-WiT/BA2/blob/main/public/notebooks/week-07-hypothesis-testing.ipynb'

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
      'A jam test gives p = 0.03, and your line is α = 0.05. What do you decide?',
      'يعطي اختبار للمربى p = 0.03، وخطك هو α = 0.05. ماذا تقرر؟',
      'یک آزمون مربا p = ۰٫۰۳ می‌دهد و خط تو α = ۰٫۰۵ است. چه تصمیمی می‌گیری؟',
    ),
    options: [
      q('Reject H₀: 0.03 is below 0.05, too rare to be just luck', 'ارفض H₀: ‏0.03 أقل من 0.05، أندر من أن يكون مجرد حظ', 'H₀ را رد کن: ۰٫۰۳ کمتر از ۰٫۰۵ است، نادرتر از آنکه فقط شانس باشد'),
      q('H₀ is now proven true', 'أصبحت H₀ مثبتة', 'حالا H₀ ثابت شده است'),
      q('Nothing: 0.03 is almost zero, so the test failed', 'لا شيء: 0.03 تقريبًا صفر، فالاختبار فشل', 'هیچ: ۰٫۰۳ تقریباً صفر است، پس آزمون شکست خورد'),
    ],
  },
  {
    id: 'w07-q009',
    weekId: 'week-07',
    topic: 'z-test',
    answer: 0,
    prompt: q(
      'In the jars example, the bottom of the z formula is σ / √n = 10 / √20 = 2.24 jars. What is it?',
      'في مثال البرطمانات، أسفل معادلة z هو σ / √n = 10 / √20 = 2.24 برطمان. ما هو؟',
      'در مثال شیشه‌ها، پایین فرمول z برابر σ / √n = 10 / √20 = ۲٫۲۴ شیشه است. این چیست؟',
    ),
    options: [
      q('How much an average of 20 Saturdays usually wobbles by luck (the noise)', 'كم يتذبذب متوسط 20 سبتًا عادةً بفعل الحظ (الضجيج)', 'اینکه میانگین ۲۰ شنبه معمولاً چقدر از روی شانس نوسان دارد (نویز)'),
      q('The gap we found, 60.15 − 56 (the signal)', 'الفرق الذي وجدناه، 60.15 − 56 (الإشارة)', 'فاصله‌ای که پیدا کردیم، 60.15 − 56 (سیگنال)'),
      q('The p-value', 'قيمة p', 'مقدار p'),
    ],
  },
  {
    id: 'w07-q012',
    weekId: 'week-07',
    topic: 'common-mistakes',
    answer: 1,
    prompt: q(
      'With only 8 Saturdays (April and May), the tasting test gives p = 0.23. What should the owner say?',
      'مع 8 أيام سبت فقط (أبريل ومايو)، يعطي اختبار التذوق p = 0.23. ماذا يجب أن يقول المالك؟',
      'فقط با ۸ شنبه (آوریل و مه)، آزمون مزه‌کردن p = ۰٫۲۳ می‌دهد. صاحب غرفه چه باید بگوید؟',
    ),
    options: [
      q('Tasting does not work', 'التذوق لا يجدي', 'مزه‌کردن جواب نمی‌دهد'),
      q('Not enough evidence yet: 0.23 is above 0.05, so collect more Saturdays', 'لا أدلة كافية بعد: ‏0.23 أعلى من 0.05، فاجمع أيام سبت أكثر', 'هنوز شواهد کافی نیست: ۰٫۲۳ بالای ۰٫۰۵ است، پس شنبه‌های بیشتری جمع کن'),
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
        '<p><strong>Which α?</strong> 5% (0.05) is the usual choice. Use 1% (0.01) when a false alarm is costly (for example, recalling a whole batch of jars). Use 10% (0.10) for a first, exploratory look.</p>',
        '<p><strong>أي α؟</strong> 5% (0.05) هو الاختيار المعتاد. استخدم 1% (0.01) حين يكون الإنذار الكاذب مكلفًا (مثلًا سحب دفعة كاملة من البرطمانات). واستخدم 10% (0.10) لنظرة أولى استكشافية.</p>',
        '<p><strong>کدام α؟</strong> ۵٪ (۰٫۰۵) انتخاب معمول است. وقتی هشدار اشتباه پرهزینه است (مثلاً جمع کردن یک بچ کامل شیشه) ۱٪ (۰٫۰۱) را به کار ببر. برای نگاه اول و اکتشافی ۱۰٪ (۰٫۱۰) را به کار ببر.</p>',
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
  ...simple.sections,
  {
    id: 'two-groups',
    navLabel: t('Two groups', 'مجموعتان', 'دو گروه'),
    sectionLabel: t('Section 08', 'القسم ٠٨', 'بخش ۰۸'),
    timeEst: t('10 min', '١٠ دقائق', '۱۰ دقیقه'),
    headingHtml: t(
      '<h2>Two groups: the test you will use in your project</h2><p class="standfirst">The z-test compared one average with a claimed number (56 jars). Your project compares two groups instead, like tasting Saturdays against normal Saturdays. Same steps, and Excel does the maths.</p>',
      '<h2>مجموعتان: الاختبار الذي ستستخدمه في مشروعك</h2><p class="standfirst">قارن اختبار z متوسطًا واحدًا برقم مُدّعى (56 برطمانًا). أما مشروعك فيقارن مجموعتين، مثل أيام السبت مع التذوق مقابل أيام السبت العادية. الخطوات نفسها، وExcel يتولى الحساب.</p>',
      '<h2>دو گروه: آزمونی که در پروژه‌ات به کار می‌بری</h2><p class="standfirst">آزمون z یک میانگین را با یک عدد ادعاشده (۵۶ شیشه) مقایسه کرد. پروژهٔ تو به‌جایش دو گروه را مقایسه می‌کند، مثل شنبه‌های با مزه‌کردن در برابر شنبه‌های عادی. همان گام‌ها، و Excel حساب را انجام می‌دهد.</p>',
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
      exercise('w07-q016'),
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
      analogy(
        '<p>One light jar is just luck: the machine wobbles a little. But when 36 jars are light <em>on average</em>, the wobbles should have cancelled out. A low average of many jars is a pattern, not luck. That is why the wobble of an average, σ / √n = 6 / √36 = 1 g, is much smaller than the wobble of one jar (6 g).</p>',
        '<p>برطمان واحد خفيف مجرد حظ: الآلة تتذبذب قليلًا. لكن حين تكون 36 برطمانًا خفيفة <em>في المتوسط</em>، كان يجب أن تلغي التذبذبات بعضها. فمتوسط منخفض لبرطمانات كثيرة نمط وليس حظًا. لهذا يكون تذبذب المتوسط، σ / √n = 6 / √36 = 1 غرام، أصغر بكثير من تذبذب برطمان واحد (6 غرامات).</p>',
        '<p>یک شیشهٔ سبک فقط شانس است: دستگاه کمی نوسان دارد. اما وقتی ۳۶ شیشه <em>به‌طور میانگین</em> سبک‌اند، نوسان‌ها باید همدیگر را خنثی می‌کردند. میانگین پایینِ شیشه‌های زیاد یک الگوست، نه شانس. برای همین نوسان میانگین، σ / √n = 6 / √36 = ۱ گرم، خیلی کوچک‌تر از نوسان یک شیشه (۶ گرم) است.</p>',
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
      recap(
        t('p above 0.05 means "not enough evidence yet", never "no effect".', 'p أعلى من 0.05 تعني "لا أدلة كافية بعد"، وليس "لا أثر" أبدًا.', 'p بالای ۰٫۰۵ یعنی «هنوز شواهد کافی نیست»، هرگز «اثری نیست».'),
        t('Write H₀, Hₐ, the tail and α before you look at the data.', 'اكتب H₀ وHₐ والذيل وα قبل أن تنظر إلى البيانات.', 'پیش از نگاه به داده H₀، Hₐ، دنباله و α را بنویس.'),
        t('Always say the size too: 9.5 more jars, 2 g lighter.', 'قل الحجم أيضًا دائمًا: 9.5 برطمانات أكثر، وأخف بغرامين.', 'همیشه اندازه را هم بگو: ۹٫۵ شیشه بیشتر، ۲ گرم سبک‌تر.'),
      ),
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
      '<h2>Before Week 8</h2><p>You can now say whether a difference in your data is real or just luck. Week 8 puts all the pieces together into one story (the question, the clean data, the charts, the regression and the test), checks how wrong it could be, and turns it into a short report and slides. Bring your project document with Weeks 4–7 in it.</p>',
      '<h2>قبل الأسبوع 8</h2><p>تستطيع الآن أن تقول هل الفرق في بياناتك حقيقي أم مجرد حظ. يجمع الأسبوع 8 القطع كلها في قصة واحدة (السؤال والبيانات النظيفة والرسوم والانحدار والاختبار)، ويفحص كم قد تكون خاطئة، ويحوّلها إلى تقرير قصير وشرائح. أحضر مستند مشروعك وفيه الأسابيع 4–7.</p>',
      '<h2>پیش از هفته ۸</h2><p>حالا می‌توانی بگویی تفاوتی در داده‌ات واقعی است یا فقط شانس. هفتهٔ ۸ همهٔ تکه‌ها را در یک داستان کنار هم می‌گذارد (پرسش، دادهٔ تمیز، نمودارها، رگرسیون و آزمون)، بررسی می‌کند چقدر ممکن است اشتباه باشد و آن را به یک گزارش کوتاه و چند اسلاید تبدیل می‌کند. سند پروژه‌ات را با هفته‌های ۴ تا ۷ بیاور.</p>',
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
  questions: [...questions, ...simple.questions],
  sections: [...basics, ...testing, ...closing],
}
