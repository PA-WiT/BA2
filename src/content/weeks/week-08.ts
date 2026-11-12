// Week 8 merges three original decks into one week, saved together as public/originals/week-08.pdf:
//  - "Application: Statistics in the Real World" (pages 1-11): review of the toolbox, statistics in daily life,
//    the "Mayor of a new town" exercise;
//  - "Week 9: Error analysis" (pages 12-24): where error comes from, bias, false positives vs false negatives,
//    standard deviation vs standard error, R² and the confusion matrix, what to do with error analysis;
//  - "Week 10: Communicating your findings" (pages 25-36): presentation vs report, their structures, charts that
//    support a claim, clear and honest charts, non-number charts, tips.
// Kept simple, like Weeks 6-7: one idea per section, an everyday analogy, a small jam stand example, a recap and
// a quick check. The deck's images are cropped at 220 dpi (public/figures/week-08/deck-NN-*.jpg); diagram-01
// (confusion matrix in plain words) and diagram-02 (truncated vs zero axis) are new.
// Added from outside sources, checked against them: the UK advertising watchdog's ruling on "80% of dentists"
// (Osborne Clarke / Cosmetics Business), the Literary Digest poll of 1936 (Wikipedia and survey-method notes),
// Reuters' 2018 report on Amazon's recruiting tool, Google's Machine Learning Crash Course (accuracy, precision,
// recall), Correll, Bertini and Franconeri (CHI 2020) on truncated axes, Tufte's data-ink ratio, Knaflic's
// Storytelling with Data, and Minto's pyramid principle ("answer first").
// Every number was computed by script on public/data/jam-tasting.csv (pandas) and the Excel formulas were
// recalculated in LibreOffice. Python cells live in week08Code.ts and public/notebooks/week-08-errors-and-reporting.ipynb.
// ar/fa are draft translations awaiting native review, like the earlier weeks. Code and formulas stay English.
import type { Block, Localized, Question, Week } from '../types'
import { week08Homework } from './homework/week-08'
import { py, xl } from './week08Code'
import * as comm from './week08Comm'

const t = (en: string, ar: string, fa: string): Localized => ({ en, ar, fa })
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
const tools = (excel: Block[], python: Block[]): Block => ({
  type: 'tabs',
  tabs: [
    { label: t('Excel', 'Excel', 'Excel'), blocks: excel },
    { label: t('Python (Colab)', 'Python ‏(Colab)', 'Python ‏(Colab)'), blocks: python },
  ],
})
const plainWords = t('Words in this section, in plain language', 'كلمات هذا القسم بلغة بسيطة', 'واژه‌های این بخش، به زبان ساده')
const opt = t

const questions: Question[] = [
  {
    id: 'w08-q001',
    weekId: 'week-08',
    topic: 'toolbox',
    answer: 1,
    prompt: t(
      'Five Saturdays sold 50, 55, 58, 58 and 80 jars. What is the median?',
      'باعت خمسة أيام سبت 50 و55 و58 و58 و80 برطمانًا. ما الوسيط؟',
      'پنج شنبه ۵۰، ۵۵، ۵۸، ۵۸ و ۸۰ شیشه فروختند. میانه چیست؟',
    ),
    options: [
      opt('60.2: add them up and divide by 5', '60.2: اجمعها واقسم على 5', '۶۰٫۲: جمعشان کن و بر ۵ تقسیم کن'),
      opt('58: the middle value once they are sorted', '58: القيمة الوسطى بعد ترتيبها', '۵۸: مقدار وسط پس از مرتب کردن'),
      opt('30: the biggest minus the smallest', '30: الأكبر ناقص الأصغر', '۳۰: بزرگ‌ترین منهای کوچک‌ترین'),
    ],
  },
  {
    id: 'w08-q002',
    weekId: 'week-08',
    topic: 'toolbox',
    answer: 0,
    prompt: t(
      'In the 20 Saturdays, 58 jars and 59 jars each appear 3 times, more than any other value. What is the mode?',
      'في أيام السبت العشرين يظهر 58 برطمانًا و59 برطمانًا 3 مرات لكل منهما، أكثر من أي قيمة أخرى. ما المنوال؟',
      'در ۲۰ شنبه، ۵۸ شیشه و ۵۹ شیشه هر کدام ۳ بار آمده‌اند، بیشتر از هر مقدار دیگر. نما چیست؟',
    ),
    options: [
      opt('Both 58 and 59: the data has two modes', 'كلاهما 58 و59: للبيانات منوالان', 'هر دو، ۵۸ و ۵۹: داده دو نما دارد'),
      opt('58.5, halfway between them', '58.5، في المنتصف بينهما', '۵۸٫۵، وسط آن دو'),
      opt('There is no mode', 'لا يوجد منوال', 'نما ندارد'),
    ],
  },
  {
    id: 'w08-q003',
    weekId: 'week-08',
    topic: 'daily-life',
    answer: 0,
    prompt: t(
      'An advert says "4 out of 5 dentists recommend Brand X." What is the best first question to ask?',
      'يقول إعلان: "4 من كل 5 أطباء أسنان يوصون بالعلامة X." ما أفضل سؤال تبدأ به؟',
      'تبلیغی می‌گوید: «از هر ۵ دندان‌پزشک، ۴ نفر برند X را توصیه می‌کنند.» بهترین سؤال اول چیست؟',
    ),
    options: [
      opt('How were the dentists asked: could they name more than one brand?', 'كيف سُئل الأطباء: هل كان بإمكانهم ذكر أكثر من علامة؟', 'از دندان‌پزشک‌ها چطور پرسیده شد: می‌توانستند بیش از یک برند نام ببرند؟'),
      opt('What colour is the toothpaste?', 'ما لون معجون الأسنان؟', 'خمیردندان چه رنگی است؟'),
      opt('None: 80% is a big number, so it must be true', 'لا شيء: 80% رقم كبير فلا بد أنه صحيح', 'هیچ: ۸۰٪ عدد بزرگی است، پس حتماً درست است'),
    ],
  },
  {
    id: 'w08-q004',
    weekId: 'week-08',
    topic: 'error-sources',
    answer: 1,
    prompt: t(
      'The stand\'s kitchen scale rounds every jar to the nearest 10 g. Which kind of error is that?',
      'ميزان المطبخ في الكشك يقرّب كل برطمان إلى أقرب 10 غرامات. أي نوع من الخطأ هذا؟',
      'ترازوی آشپزخانهٔ غرفه هر شیشه را به نزدیک‌ترین ۱۰ گرم گرد می‌کند. این چه نوع خطایی است؟',
    ),
    options: [
      opt('A reasoning error', 'خطأ في الاستنتاج', 'خطای استدلال'),
      opt('A measurement error: the tool is not precise enough', 'خطأ في القياس: الأداة ليست دقيقة بما يكفي', 'خطای اندازه‌گیری: ابزار به اندازهٔ کافی دقیق نیست'),
      opt('A false positive', 'إيجابي كاذب', 'مثبت کاذب'),
    ],
  },
  {
    id: 'w08-q005',
    weekId: 'week-08',
    topic: 'bias',
    answer: 0,
    prompt: t(
      'The owner hands a "How do you like us?" card only to people who buy. What is the problem?',
      'يعطي المالك بطاقة "ما رأيك فينا؟" فقط لمن يشتري. ما المشكلة؟',
      'صاحب غرفه کارت «از ما راضی هستید؟» را فقط به کسانی می‌دهد که خرید می‌کنند. مشکل چیست؟',
    ),
    options: [
      opt('Sampling bias: people who walked past without buying are left out', 'تحيز في العيّنة: يُستبعد من مرّوا دون أن يشتروا', 'سوگیری نمونه: کسانی که بدون خرید رد شدند کنار گذاشته می‌شوند'),
      opt('None: printing more cards will fix it', 'لا شيء: طباعة بطاقات أكثر ستحل الأمر', 'هیچ: چاپ کارت بیشتر درستش می‌کند'),
      opt('It is a measurement error of the scale', 'إنه خطأ قياس في الميزان', 'خطای اندازه‌گیری ترازو است'),
    ],
  },
  {
    id: 'w08-q006',
    weekId: 'week-08',
    topic: 'bias',
    answer: 0,
    prompt: t(
      'In 1936 the Literary Digest got about 2.4 million replies and still predicted the wrong winner. What is the lesson?',
      'في 1936 حصلت مجلة Literary Digest على نحو 2.4 مليون رد ومع ذلك توقعت الفائز الخطأ. ما الدرس؟',
      'در ۱۹۳۶ مجلهٔ Literary Digest حدود ۲٫۴ میلیون پاسخ گرفت و باز هم برندهٔ اشتباه را پیش‌بینی کرد. درس چیست؟',
    ),
    options: [
      opt('A huge sample cannot fix a sample that leans one way', 'العيّنة الضخمة لا تصلح عيّنة مائلة إلى جهة واحدة', 'نمونهٔ خیلی بزرگ، نمونه‌ای را که به یک سمت متمایل است درست نمی‌کند'),
      opt('2.4 million replies is too few', '2.4 مليون رد عدد قليل جدًا', '۲٫۴ میلیون پاسخ خیلی کم است'),
      opt('Polls are always wrong', 'استطلاعات الرأي خاطئة دائمًا', 'نظرسنجی‌ها همیشه اشتباه‌اند'),
    ],
  },
  {
    id: 'w08-q007',
    weekId: 'week-08',
    topic: 'which-error',
    answer: 1,
    prompt: t(
      'The stand checks every jar for mould. Which mistake is worse?',
      'يفحص الكشك كل برطمان بحثًا عن العفن. أي خطأ أسوأ؟',
      'غرفه هر شیشه را از نظر کپک بررسی می‌کند. کدام اشتباه بدتر است؟',
    ),
    options: [
      opt('Throwing away a good jar (a false positive)', 'رمي برطمان سليم (إيجابي كاذب)', 'دور انداختن یک شیشهٔ سالم (مثبت کاذب)'),
      opt('Selling a mouldy jar (a false negative): a sick customer and a lost reputation', 'بيع برطمان متعفّن (سلبي كاذب): زبون مريض وسمعة ضائعة', 'فروختن یک شیشهٔ کپک‌زده (منفی کاذب): مشتری بیمار و آبروی ازدست‌رفته'),
      opt('They are always equally bad', 'هما سيئان بالقدر نفسه دائمًا', 'همیشه به یک اندازه بدند'),
    ],
  },
  {
    id: 'w08-q008',
    weekId: 'week-08',
    topic: 'measuring-error',
    answer: 1,
    prompt: t(
      'Single Saturdays vary by about 9.46 jars (SD). The standard error of the average is 2.12 jars. What does 2.12 tell you?',
      'يتفاوت السبت الواحد بنحو 9.46 برطمان (الانحراف المعياري). والخطأ المعياري للمتوسط 2.12 برطمان. ماذا يخبرك 2.12؟',
      'هر شنبه حدود ۹٫۴۶ شیشه تغییر می‌کند (انحراف معیار). خطای معیار میانگین ۲٫۱۲ شیشه است. ۲٫۱۲ چه می‌گوید؟',
    ),
    options: [
      opt('How much one Saturday usually differs from another', 'كم يختلف سبت عن آخر عادةً', 'اینکه یک شنبه معمولاً چقدر با شنبهٔ دیگر فرق دارد'),
      opt('How much the average of 20 Saturdays would wobble if we did it all again', 'كم سيتذبذب متوسط 20 سبتًا لو أعدنا كل شيء', 'اینکه اگر همه‌چیز را دوباره انجام دهیم، میانگین ۲۰ شنبه چقدر نوسان می‌کند'),
      opt('How many jars were broken', 'كم برطمانًا انكسر', 'چند شیشه شکست'),
    ],
  },
  {
    id: 'w08-q009',
    weekId: 'week-08',
    topic: 'measuring-error',
    answer: 1,
    prompt: t(
      'A spam filter marks 50 emails as spam, and 45 of them really are spam. What is its precision?',
      'يصنّف مرشّح 50 رسالة على أنها مزعجة، و45 منها مزعجة فعلًا. ما دقته (precision)؟',
      'یک فیلتر ۵۰ ایمیل را اسپم علامت می‌زند و ۴۵ تای آن‌ها واقعاً اسپم‌اند. دقت (precision) آن چقدر است؟',
    ),
    options: [
      opt('45%', '45%', '۴۵٪'),
      opt('90%: when it says "spam", it is right 9 times in 10', '90%: حين يقول "مزعج" يصيب 9 مرات من 10', '۹۰٪: وقتی می‌گوید «اسپم»، ۹ بار از ۱۰ درست می‌گوید'),
      opt('50%', '50%', '۵۰٪'),
    ],
  },
  {
    id: 'w08-q010',
    weekId: 'week-08',
    topic: 'using-errors',
    answer: 1,
    prompt: t(
      'Your survey only reached your regular customers. What fixes that kind of error?',
      'وصل استبيانك إلى زبائنك الدائمين فقط. ما الذي يصلح هذا النوع من الخطأ؟',
      'نظرسنجی تو فقط به مشتری‌های همیشگی‌ات رسید. چه چیزی این نوع خطا را درست می‌کند؟',
    ),
    options: [
      opt('More replies from the same regulars', 'ردود أكثر من الزبائن الدائمين أنفسهم', 'پاسخ‌های بیشتر از همان مشتری‌های همیشگی'),
      opt('Better data: also ask the groups you missed, like passers-by', 'بيانات أفضل: اسأل أيضًا المجموعات التي فاتتك، مثل المارّة', 'دادهٔ بهتر: از گروه‌هایی که جا ماندند، مثل رهگذرها، هم بپرس'),
      opt('Rounding the answers', 'تقريب الإجابات', 'گرد کردن پاسخ‌ها'),
    ],
  },
  ...comm.questions,
]

const W = t

export const weekEight: Week = {
  id: 'week-08',
  originalPdf: '/originals/week-08.pdf',
  order: 8,
  cover: {
    kicker: t('Business Analytics 2 · Week 8', 'تحليلات الأعمال 2 · الأسبوع 8', 'تحلیل کسب‌وکار ۲ · هفته ۸'),
    titleHtml: t(
      '<h1>From Analysis to Action:<em>Use It, Check It, Tell It</em></h1><p class="lede">This week joins everything together. You use the whole toolbox on one real question, you check how wrong the answer could be, and you turn it into a short report and a few slides that a busy owner can act on.</p>',
      '<h1>من التحليل إلى الفعل:<em>استخدمه، افحصه، احكه</em></h1><p class="lede">هذا الأسبوع يجمع كل شيء. تستخدم صندوق الأدوات كله على سؤال حقيقي واحد، وتفحص كم قد تكون الإجابة خاطئة، ثم تحوّلها إلى تقرير قصير وبضع شرائح يستطيع مالك مشغول أن يعمل بها.</p>',
      '<h1>از تحلیل تا اقدام:<em>به کار ببر، بررسی کن، تعریف کن</em></h1><p class="lede">این هفته همه‌چیز را کنار هم می‌گذارد. کل جعبه‌ابزار را روی یک پرسش واقعی به کار می‌بری، بررسی می‌کنی جواب چقدر ممکن است اشتباه باشد، و آن را به یک گزارش کوتاه و چند اسلاید تبدیل می‌کنی که یک صاحب‌کار پرمشغله بتواند بر اساسش عمل کند.</p>',
    ),
    timeEstimate: t('≈ 120 min · reading + Excel and Python practice', '≈ ١٢٠ دقيقة · قراءة وتدريب Excel وPython', '≈ ۱۲۰ دقیقه · مطالعه و تمرین Excel و Python'),
  },
  questions,
  sections: [
    // ---------- 1. Welcome ----------
    {
      id: 'welcome',
      navLabel: W('Welcome', 'ترحيب', 'خوش‌آمدید'),
      sectionLabel: W('Section 01', 'القسم ٠١', 'بخش ۰۱'),
      timeEst: W('5 min', '٥ دقائق', '۵ دقیقه'),
      headingHtml: t(
        '<h2>Welcome: from numbers to a decision</h2><p class="standfirst">Weeks 1–7 gave you the tools one at a time. This week you use them together, the way a business does: a question goes in, a decision comes out, and you can say how sure you are.</p>',
        '<h2>ترحيب: من الأرقام إلى القرار</h2><p class="standfirst">أعطتك الأسابيع 1–7 الأدوات واحدة تلو الأخرى. هذا الأسبوع تستخدمها معًا، كما تفعل الشركات: يدخل سؤال ويخرج قرار، وتستطيع أن تقول كم أنت متأكد.</p>',
        '<h2>خوش‌آمدید: از عدد تا تصمیم</h2><p class="standfirst">هفته‌های ۱ تا ۷ ابزارها را یکی‌یکی به تو دادند. این هفته آن‌ها را با هم به کار می‌بری، همان‌طور که یک کسب‌وکار می‌کند: یک پرسش وارد می‌شود، یک تصمیم بیرون می‌آید، و می‌توانی بگویی چقدر مطمئنی.</p>',
      ),
      blocks: [
        {
          type: 'objectives',
          label: t("By the end, you'll be able to", 'بنهاية هذا الأسبوع ستكون قادرًا على', 'در پایان این هفته می‌توانی'),
          items: [
            t('Use the whole toolbox (describe, chart, regression, test) on one question', 'استخدام صندوق الأدوات كله (الوصف، الرسم، الانحدار، الاختبار) على سؤال واحد', 'کل جعبه‌ابزار (توصیف، نمودار، رگرسیون، آزمون) را روی یک پرسش به کار ببری'),
            t('Ask three simple questions of any statistic you see in adverts or the news', 'طرح ثلاثة أسئلة بسيطة على أي إحصاء تراه في الإعلانات أو الأخبار', 'از هر آماری که در تبلیغ یا خبر می‌بینی سه سؤال ساده بپرسی'),
            t('Name where an error came from, spot bias, and say which mistake is worse', 'تحديد مصدر الخطأ، واكتشاف التحيز، وقول أي خطأ أسوأ', 'بگویی خطا از کجا آمده، سوگیری را پیدا کنی و بگویی کدام اشتباه بدتر است'),
            t('Measure error with the standard error, R² and a confusion matrix', 'قياس الخطأ بالخطأ المعياري وR² ومصفوفة الالتباس', 'خطا را با خطای معیار، R² و ماتریس درهم‌ریختگی اندازه بگیری'),
            t('Write an answer-first summary and draw a chart whose title says the takeaway', 'كتابة ملخص يبدأ بالإجابة ورسم مخطط يقول عنوانه الخلاصة', 'خلاصه‌ای بنویسی که با جواب شروع شود و نموداری بکشی که عنوانش نتیجه را بگوید'),
          ],
        },
        html(
          '<h3>The whole course in one line</h3><p><strong>Question</strong> → <strong>clean data</strong> (Weeks 4–5) → <strong>describe and chart</strong> (Weeks 2–3) → <strong>model</strong> (Week 6) → <strong>test</strong> (Week 7) → <strong>check the errors</strong> → <strong>tell it</strong>. The last two steps are new this week.</p>',
          '<h3>المقرر كله في سطر واحد</h3><p><strong>سؤال</strong> ← <strong>بيانات نظيفة</strong> (الأسبوعان 4–5) ← <strong>وصف ورسم</strong> (الأسبوعان 2–3) ← <strong>نموذج</strong> (الأسبوع 6) ← <strong>اختبار</strong> (الأسبوع 7) ← <strong>فحص الأخطاء</strong> ← <strong>رواية النتيجة</strong>. الخطوتان الأخيرتان جديدتان هذا الأسبوع.</p>',
          '<h3>کل درس در یک خط</h3><p><strong>پرسش</strong> ← <strong>دادهٔ تمیز</strong> (هفته‌های ۴–۵) ← <strong>توصیف و نمودار</strong> (هفته‌های ۲–۳) ← <strong>مدل</strong> (هفتهٔ ۶) ← <strong>آزمون</strong> (هفتهٔ ۷) ← <strong>بررسی خطاها</strong> ← <strong>تعریف کردن</strong>. دو گام آخر این هفته تازه‌اند.</p>',
        ),
        analogy(
          '<p>A recipe card in a drawer helps nobody. A recipe becomes useful when you <strong>cook</strong> it (use the tools on a real question), <strong>taste</strong> it before serving (check the errors), and <strong>tell your guests what is in it</strong> (communicate). This week is the cooking, the tasting and the serving.</p>',
          '<p>بطاقة وصفة في الدرج لا تفيد أحدًا. تصبح الوصفة مفيدة حين <strong>تطبخها</strong> (تستخدم الأدوات على سؤال حقيقي)، و<strong>تتذوقها</strong> قبل التقديم (تفحص الأخطاء)، و<strong>تخبر ضيوفك بما فيها</strong> (توصل النتيجة). هذا الأسبوع هو الطبخ والتذوق والتقديم.</p>',
          '<p>کارت دستور پختی که در کشو مانده به درد کسی نمی‌خورد. دستور پخت وقتی مفید می‌شود که آن را <strong>بپزی</strong> (ابزارها را روی یک پرسش واقعی به کار ببری)، پیش از سرو <strong>بچشی</strong> (خطاها را بررسی کنی)، و <strong>به مهمان‌ها بگویی در آن چیست</strong> (نتیجه را منتقل کنی). این هفته همان پختن، چشیدن و سرو کردن است.</p>',
        ),
        html(
          '<p><strong>The running example:</strong> the jam stand\'s 20 Saturdays in <a href="/data/jam-tasting.csv" download>jam-tasting.csv</a> (tasting yes/no, visitors, buyers, jars), the same file as Weeks 6 and 7. By the end of the week it becomes a one-page report and five slides (Section 12).</p>',
          '<p><strong>المثال المستمر:</strong> أيام السبت العشرون لكشك المربى في <a href="/data/jam-tasting.csv" download>jam-tasting.csv</a> (التذوق نعم/لا، الزوار، المشترون، البرطمانات)، الملف نفسه في الأسبوعين 6 و7. في نهاية الأسبوع يصبح تقريرًا من صفحة واحدة وخمس شرائح (القسم 12).</p>',
          '<p><strong>مثال همیشگی:</strong> ۲۰ شنبهٔ غرفهٔ مربا در <a href="/data/jam-tasting.csv" download>jam-tasting.csv</a> (مزه‌کردن بله/نه، بازدیدکننده، خریدار، شیشه)، همان فایل هفته‌های ۶ و ۷. در پایان هفته به یک گزارش یک‌صفحه‌ای و پنج اسلاید تبدیل می‌شود (بخش ۱۲).</p>',
        ),
        recap(
          W('Use the tools together: question → data → chart → model → test.', 'استخدم الأدوات معًا: سؤال ← بيانات ← رسم ← نموذج ← اختبار.', 'ابزارها را با هم به کار ببر: پرسش ← داده ← نمودار ← مدل ← آزمون.'),
          W('Then check how wrong you could be, and tell it simply.', 'ثم افحص كم قد تكون مخطئًا، واحكِ النتيجة ببساطة.', 'بعد بررسی کن چقدر ممکن است اشتباه کنی، و ساده تعریفش کن.'),
        ),
      ],
    },
    // ---------- 2. Toolbox ----------
    {
      id: 'toolbox',
      navLabel: W('The toolbox in one page', 'صندوق الأدوات في صفحة', 'جعبه‌ابزار در یک صفحه'),
      sectionLabel: W('Section 02', 'القسم ٠٢', 'بخش ۰۲'),
      timeEst: W('12 min', '١٢ دقيقة', '۱۲ دقیقه'),
      headingHtml: t(
        '<h2>The toolbox in one page</h2><p class="standfirst">A quick review of everything so far, on the jam stand: the words that describe data, how we cleaned and charted it, what the regression and the test said.</p>',
        '<h2>صندوق الأدوات في صفحة واحدة</h2><p class="standfirst">مراجعة سريعة لكل ما سبق على كشك المربى: الكلمات التي تصف البيانات، وكيف نظّفناها ورسمناها، وماذا قال الانحدار والاختبار.</p>',
        '<h2>جعبه‌ابزار در یک صفحه</h2><p class="standfirst">مرور سریع همهٔ آنچه تا حالا دیدیم، روی غرفهٔ مربا: واژه‌هایی که داده را توصیف می‌کنند، اینکه چطور تمیز و رسمش کردیم، و رگرسیون و آزمون چه گفتند.</p>',
      ),
      blocks: [
        figure(
          1,
          W('The words that describe data', 'الكلمات التي تصف البيانات', 'واژه‌هایی که داده را توصیف می‌کنند'),
          '/figures/week-08/deck-01-terms.jpg',
          'A whiteboard from the original lesson defining mode (the value that appears most often), range (the difference between the lowest and highest value), median (the middle number in a list ordered from lowest to highest) and mean (the total of all values divided by the number of values).',
          fromDeck(
            'Four of the six words. The other two: quantiles (cut points that split sorted data into equal parts) and frequency (how often each value or band appears).',
            'أربع من الكلمات الست. والاثنتان الأخريان: المئينات أو الكمّيات (نقاط قطع تقسم البيانات المرتبة إلى أجزاء متساوية) والتكرار (كم مرة تظهر كل قيمة أو فئة).',
            'چهار واژه از شش واژه. دو تای دیگر: چندک‌ها (نقطه‌هایی که دادهٔ مرتب‌شده را به بخش‌های برابر تقسیم می‌کنند) و فراوانی (اینکه هر مقدار یا بازه چند بار آمده).',
          ),
        ),
        box(
          'example',
          W('The 20 Saturdays in six words', 'أيام السبت العشرون في ست كلمات', '۲۰ شنبه در شش واژه'),
          '<p>Sorted, the jars sold were: 44, 45, 48, 50, 55, 58, 58, 58, 59, 59, 59, 60, 60, 63, 64, 66, 69, 73, 75, 80.</p><ul><li><strong>Mean</strong> (the fair share): 1,203 ÷ 20 = <strong>60.15</strong> jars.</li><li><strong>Median</strong> (the middle Saturday): <strong>59</strong>. A little below the mean, because a few very good Saturdays (73, 75, 80) pull the mean up.</li><li><strong>Mode</strong> (the most common): <strong>58 and 59</strong>, three times each. Data can have two modes.</li><li><strong>Range</strong> (worst to best): 80 − 44 = <strong>36</strong> jars.</li><li><strong>Quartiles</strong>: <strong>57.25</strong>, 59 and <strong>64.5</strong>. The middle half of Saturdays sold between about 57 and 65 jars.</li><li><strong>Frequency</strong> (how many in each band): 40s: 3, 50s: 8, 60s: 6, 70s: 2, 80s: 1.</li></ul>',
          '<p>بعد الترتيب، كانت البرطمانات المبيعة: 44، 45، 48، 50، 55، 58، 58، 58، 59، 59، 59، 60، 60، 63، 64، 66، 69، 73، 75، 80.</p><ul><li><strong>المتوسط</strong> (الحصة العادلة): 1,203 ÷ 20 = <strong>60.15</strong> برطمانًا.</li><li><strong>الوسيط</strong> (السبت الأوسط): <strong>59</strong>. أقل قليلًا من المتوسط، لأن بضعة أيام سبت جيدة جدًا (73، 75، 80) ترفع المتوسط.</li><li><strong>المنوال</strong> (الأكثر تكرارًا): <strong>58 و59</strong>، ثلاث مرات لكل منهما. قد يكون للبيانات منوالان.</li><li><strong>المدى</strong> (من الأسوأ إلى الأفضل): 80 − 44 = <strong>36</strong> برطمانًا.</li><li><strong>الربيعيات</strong>: <strong>57.25</strong> و59 و<strong>64.5</strong>. باع النصف الأوسط من أيام السبت بين نحو 57 و65 برطمانًا.</li><li><strong>التكرار</strong> (كم في كل فئة): الأربعينات: 3، الخمسينات: 8، الستينات: 6، السبعينات: 2، الثمانينات: 1.</li></ul>',
          '<p>به ترتیب، شیشه‌های فروخته‌شده این‌ها بودند: ۴۴، ۴۵، ۴۸، ۵۰، ۵۵، ۵۸، ۵۸، ۵۸، ۵۹، ۵۹، ۵۹، ۶۰، ۶۰، ۶۳، ۶۴، ۶۶، ۶۹، ۷۳، ۷۵، ۸۰.</p><ul><li><strong>میانگین</strong> (سهم برابر): ۱٬۲۰۳ ÷ ۲۰ = <strong>۶۰٫۱۵</strong> شیشه.</li><li><strong>میانه</strong> (شنبهٔ وسط): <strong>۵۹</strong>. کمی کمتر از میانگین، چون چند شنبهٔ خیلی خوب (۷۳، ۷۵، ۸۰) میانگین را بالا می‌کشند.</li><li><strong>نما</strong> (پرتکرارترین): <strong>۵۸ و ۵۹</strong>، هر کدام سه بار. داده می‌تواند دو نما داشته باشد.</li><li><strong>دامنه</strong> (بدترین تا بهترین): ۸۰ − ۴۴ = <strong>۳۶</strong> شیشه.</li><li><strong>چارک‌ها</strong>: <strong>۵۷٫۲۵</strong>، ۵۹ و <strong>۶۴٫۵</strong>. نیمهٔ وسطی شنبه‌ها بین حدود ۵۷ و ۶۵ شیشه فروختند.</li><li><strong>فراوانی</strong> (چند تا در هر بازه): دههٔ ۴۰: ۳، دههٔ ۵۰: ۸، دههٔ ۶۰: ۶، دههٔ ۷۰: ۲، دههٔ ۸۰: ۱.</li></ul>',
        ),
        tools([code(xl.describe)], [code(py.describe)]),
        analogy(
          '<p>Mean and median are two ways to describe a "normal" Saturday. The mean shares all the jars out equally; the median lines the Saturdays up and picks the one in the middle. When one Saturday is amazing (a festival day with 80 jars), the mean moves and the median hardly does. That is why house prices and salaries are usually reported as medians.</p>',
          '<p>المتوسط والوسيط طريقتان لوصف سبت "عادي". المتوسط يوزّع كل البرطمانات بالتساوي؛ والوسيط يصفّ أيام السبت ويختار الذي في الوسط. حين يكون سبت واحد مدهشًا (يوم مهرجان بـ 80 برطمانًا)، يتحرك المتوسط ولا يكاد الوسيط يتحرك. لهذا تُذكر أسعار المنازل والرواتب عادةً بالوسيط.</p>',
          '<p>میانگین و میانه دو راه برای توصیف یک شنبهٔ «معمولی» هستند. میانگین همهٔ شیشه‌ها را برابر تقسیم می‌کند؛ میانه شنبه‌ها را به صف می‌کند و وسطی را برمی‌دارد. وقتی یک شنبه فوق‌العاده است (روز جشنواره با ۸۰ شیشه)، میانگین تکان می‌خورد و میانه تقریباً نه. برای همین قیمت خانه و حقوق معمولاً با میانه گزارش می‌شود.</p>',
        ),
        {
          type: 'table',
          headers: [W('Step', 'الخطوة', 'گام'), W('Week', 'الأسبوع', 'هفته'), W('What it gave the jam stand', 'ماذا أعطت كشك المربى', 'برای غرفهٔ مربا چه داد')],
          rows: [
            [W('Clean the data', 'تنظيف البيانات', 'تمیز کردن داده'), W('4–5', '4–5', '۴–۵'), W('Fixed spellings, blanks and impossible values; used yes/no (binary) columns like <code>tasting</code>', 'تصحيح الإملاء والفراغات والقيم المستحيلة؛ واستخدام أعمدة نعم/لا (ثنائية) مثل <code>tasting</code>', 'املا، خانه‌های خالی و مقدارهای ناممکن را درست کردیم؛ ستون‌های بله/نه (دودویی) مثل <code>tasting</code> را به کار بردیم')],
            [W('Describe and chart', 'الوصف والرسم', 'توصیف و نمودار'), W('2–3', '2–3', '۲–۳'), W('Bars to compare groups, lines for time, labelled axes, a title and a legend', 'أعمدة لمقارنة المجموعات، وخطوط للزمن، ومحاور معنونة، وعنوان، ومفتاح', 'میله برای مقایسهٔ گروه‌ها، خط برای زمان، محورهای برچسب‌دار، عنوان و راهنما')],
            [W('Regression', 'الانحدار', 'رگرسیون'), W('6', '6', '۶'), W('jars ≈ −26.26 + 0.58 × visitors + 6.24 × tasting; R² = 0.71', 'jars ≈ −26.26 + 0.58 × visitors + 6.24 × tasting؛ R² = 0.71', 'jars ≈ −26.26 + 0.58 × visitors + 6.24 × tasting؛ R² = ۰٫۷۱')],
            [W('Hypothesis test', 'اختبار الفرضيات', 'آزمون فرض'), W('7', '7', '۷'), W('Tasting Saturdays sold 64.9 vs 55.4 jars; p = 0.010, so the gap is unlikely to be luck', 'باعت أيام التذوق 64.9 مقابل 55.4 برطمانًا؛ p = 0.010، فالفرق على الأرجح ليس حظًا', 'شنبه‌های مزه‌کردن ۶۴٫۹ در برابر ۵۵٫۴ شیشه فروختند؛ p = ۰٫۰۱۰، پس فاصله به احتمال زیاد شانس نیست')],
          ],
        },
        figure(
          2,
          W('Where data preparation sits', 'أين يقع تحضير البيانات', 'آماده‌سازی داده کجا قرار دارد'),
          '/figures/week-08/deck-02-data-prep.jpg',
          'Diagram from the original lesson: raw data goes through cleaning and integration to cleaned data, then selection and transformation to prepared data, all inside a circle labelled data preparation; then data mining gives patterns and evaluation gives knowledge.',
          fromDeck(
            'Cleaning and selecting happen before any pattern is found. The lesson\'s example: one virus written as "SARS-CoV-2", "Corona", "Covid" and "Covid-19" must become one spelling, just like "Strawbery" and "strawberry" did in Week 5.',
            'التنظيف والاختيار يحدثان قبل العثور على أي نمط. مثال الدرس: فيروس واحد مكتوب بصيغ "SARS-CoV-2" و"Corona" و"Covid" و"Covid-19" يجب أن يصبح بإملاء واحد، كما حدث مع "Strawbery" و"strawberry" في الأسبوع 5.',
            'تمیز کردن و انتخاب پیش از پیدا کردن هر الگویی انجام می‌شود. مثال درس: یک ویروس که به شکل «SARS-CoV-2»، «Corona»، «Covid» و «Covid-19» نوشته شده باید یک املای واحد پیدا کند، همان‌طور که «Strawbery» و «strawberry» در هفتهٔ ۵ یکی شدند.',
          ),
        ),
        recap(
          W('Mean = fair share; median = the middle one; mode = the most common; range = best minus worst.', 'المتوسط = الحصة العادلة؛ الوسيط = الأوسط؛ المنوال = الأكثر تكرارًا؛ المدى = الأفضل ناقص الأسوأ.', 'میانگین = سهم برابر؛ میانه = وسطی؛ نما = پرتکرارترین؛ دامنه = بهترین منهای بدترین.'),
          W('Quartiles split the sorted data into four equal parts; frequency counts how many fall in each band.', 'الربيعيات تقسم البيانات المرتبة إلى أربعة أجزاء متساوية؛ والتكرار يعدّ كم يقع في كل فئة.', 'چارک‌ها دادهٔ مرتب را به چهار بخش برابر تقسیم می‌کنند؛ فراوانی می‌شمارد چند تا در هر بازه است.'),
          W('Clean → chart → regression → test: each step feeds the next.', 'تنظيف ← رسم ← انحدار ← اختبار: كل خطوة تغذّي التالية.', 'تمیز کردن ← نمودار ← رگرسیون ← آزمون: هر گام به گام بعدی خوراک می‌دهد.'),
        ),
        exercise('w08-q001'),
        exercise('w08-q002'),
      ],
    },
    // ---------- 3. Statistics in daily life ----------
    {
      id: 'daily-life',
      navLabel: W('Statistics in daily life', 'الإحصاء في الحياة اليومية', 'آمار در زندگی روزمره'),
      sectionLabel: W('Section 03', 'القسم ٠٣', 'بخش ۰۳'),
      timeEst: W('10 min', '١٠ دقائق', '۱۰ دقیقه'),
      headingHtml: t(
        '<h2>Statistics in daily life: three questions to ask</h2><p class="standfirst">Adverts, news and social media use numbers to persuade you. Many fields use statistics to keep us safe, improve our health and advance knowledge. Either way, three simple questions show whether a number deserves your trust.</p>',
        '<h2>الإحصاء في الحياة اليومية: ثلاثة أسئلة لتطرحها</h2><p class="standfirst">تستخدم الإعلانات والأخبار ووسائل التواصل الأرقام لإقناعك. وتستخدم مجالات كثيرة الإحصاء لحمايتنا وتحسين صحتنا وزيادة معرفتنا. في الحالتين، تكشف ثلاثة أسئلة بسيطة إن كان الرقم يستحق ثقتك.</p>',
        '<h2>آمار در زندگی روزمره: سه سؤال برای پرسیدن</h2><p class="standfirst">تبلیغ‌ها، خبرها و شبکه‌های اجتماعی با عدد تو را قانع می‌کنند. حوزه‌های زیادی هم از آمار برای امن نگه داشتن ما، بهتر کردن سلامتمان و افزودن به دانشمان استفاده می‌کنند. در هر دو حالت، سه سؤال ساده نشان می‌دهد عددی ارزش اعتماد دارد یا نه.</p>',
      ),
      blocks: [
        {
          type: 'table',
          headers: [W('Where', 'أين', 'کجا'), W('The number (from the lesson)', 'الرقم (من الدرس)', 'عدد (از درس)'), W('The question to ask', 'السؤال الذي تطرحه', 'سؤالی که باید پرسید')],
          rows: [
            [W('Advert', 'إعلان', 'تبلیغ'), W('"4 out of 5 dentists recommend this toothpaste"', '"4 من كل 5 أطباء أسنان يوصون بهذا المعجون"', '«از هر ۵ دندان‌پزشک ۴ نفر این خمیردندان را توصیه می‌کنند»'), W('<strong>Who was asked, and how?</strong> When the UK advertising watchdog (the ASA) looked at Colgate\'s "80% of dentists" claim, it found that the dentists could recommend <em>several</em> brands, so the claim wrongly suggested they preferred Colgate over all others. It was ruled misleading.', '<strong>من سُئل، وكيف؟</strong> حين فحصت هيئة الإعلانات البريطانية (ASA) ادعاء Colgate بأن "80% من أطباء الأسنان" يوصون به، وجدت أن الأطباء كان بإمكانهم التوصية <em>بعدة</em> علامات، فأوحى الادعاء خطأً بأنهم يفضّلون Colgate على غيرها. واعتُبر مضللًا.', '<strong>از چه کسی و چطور پرسیده شد؟</strong> وقتی نهاد ناظر تبلیغات بریتانیا (ASA) ادعای «۸۰٪ دندان‌پزشکان» Colgate را بررسی کرد، دید دندان‌پزشک‌ها می‌توانستند <em>چند</em> برند را توصیه کنند، پس ادعا به‌اشتباه القا می‌کرد که آن‌ها Colgate را به همه ترجیح می‌دهند. گمراه‌کننده شناخته شد.')],
            [W('News', 'أخبار', 'خبر'), W('"Unemployment has dropped by 2% over the last six months"', '"انخفضت البطالة بنسبة 2% خلال الأشهر الستة الماضية"', '«بیکاری در شش ماه گذشته ۲٪ کم شده است»'), W('<strong>Compared with what?</strong> From 10% to 8% is a drop of 2 <em>percentage points</em> (a fifth fewer unemployed). A 2% drop <em>of</em> 10% is only 10% → 9.8%. Same words, very different news.', '<strong>مقارنةً بماذا؟</strong> من 10% إلى 8% انخفاض بمقدار نقطتين <em>مئويتين</em> (خُمس عدد العاطلين أقل). أما انخفاض 2% <em>من</em> 10% فهو فقط من 10% إلى 9.8%. الكلمات نفسها، والخبر مختلف جدًا.', '<strong>در مقایسه با چه؟</strong> از ۱۰٪ به ۸٪ یعنی ۲ <em>واحد درصد</em> کاهش (یک‌پنجم بیکار کمتر). اما کاهش ۲٪ <em>از</em> ۱۰٪ فقط از ۱۰٪ به ۹٫۸٪ است. همان واژه‌ها، خبر بسیار متفاوت.')],
            [W('Social media', 'وسائل التواصل', 'شبکه‌های اجتماعی'), W('"On average, people spend 2 hours 22 minutes a day on social media"', '"في المتوسط يقضي الناس ساعتين و22 دقيقة يوميًا على وسائل التواصل"', '«مردم به‌طور میانگین روزی ۲ ساعت و ۲۲ دقیقه در شبکه‌های اجتماعی‌اند»'), W('<strong>What does the average hide?</strong> A few people online all day pull the mean up; the typical (median) person may spend much less. Ask for the median and the spread.', '<strong>ماذا يخفي المتوسط؟</strong> قلة من الناس متصلون طوال اليوم يرفعون المتوسط؛ وقد يقضي الشخص النموذجي (الوسيط) وقتًا أقل بكثير. اسأل عن الوسيط والتشتت.', '<strong>میانگین چه چیزی را پنهان می‌کند؟</strong> چند نفر که تمام روز آنلاین‌اند میانگین را بالا می‌برند؛ آدم معمولی (میانه) شاید خیلی کمتر وقت بگذارد. میانه و پراکندگی را بپرس.')],
          ],
        },
        box(
          'keypoint',
          W('Three questions for any number', 'ثلاثة أسئلة لأي رقم', 'سه سؤال برای هر عدد'),
          '<ol><li><strong>Who was asked, and how?</strong> (the sample, and the exact question)</li><li><strong>Compared with what?</strong> (last year, the average, percentage points or percent)</li><li><strong>What is hidden?</strong> (the spread, the median, the people who did not answer)</li></ol>',
          '<ol><li><strong>من سُئل، وكيف؟</strong> (العيّنة، والسؤال بالضبط)</li><li><strong>مقارنةً بماذا؟</strong> (العام الماضي، المتوسط، نقاط مئوية أم نسبة مئوية)</li><li><strong>ما المخفي؟</strong> (التشتت، الوسيط، الذين لم يجيبوا)</li></ol>',
          '<ol><li><strong>از چه کسی و چطور پرسیده شد؟</strong> (نمونه، و پرسش دقیق)</li><li><strong>در مقایسه با چه؟</strong> (سال گذشته، میانگین، واحد درصد یا درصد)</li><li><strong>چه چیزی پنهان است؟</strong> (پراکندگی، میانه، کسانی که جواب ندادند)</li></ol>',
        ),
        analogy(
          '<p>A shop window shows its best cake at the front. Adverts and headlines do the same with numbers: they show the most flattering one. The three questions are you walking into the shop and looking at the whole counter.</p>',
          '<p>تعرض واجهة المحل أفضل كعكة في المقدمة. والإعلانات والعناوين تفعل الشيء نفسه بالأرقام: تعرض الرقم الأكثر إطراءً. والأسئلة الثلاثة هي أن تدخل المحل وتنظر إلى المنضدة كلها.</p>',
          '<p>ویترین مغازه بهترین کیکش را جلو می‌گذارد. تبلیغ‌ها و تیترها با عدد همین کار را می‌کنند: خوش‌آب‌ورنگ‌ترین عدد را نشان می‌دهند. سه سؤال یعنی وارد مغازه شوی و کل پیشخوان را ببینی.</p>',
        ),
        box(
          'example',
          W('Think: you are the new mayor', 'فكّر: أنت رئيس البلدية الجديد', 'فکر کن: تو شهردار تازه‌ای'),
          '<p><strong>The lesson\'s challenge:</strong> you were just chosen as mayor of a new town of <strong>10,000 people</strong>. How can data make sure the schools are big enough, and the town runs well? Try it before reading on.</p><p><strong>One possible answer for the schools:</strong> count children by age from birth records or a short census. <em>Suppose</em> 1,100 children are aged 5–11. At 25 pupils per class that is 44 classes, so 44 classrooms and teachers. Then look at the trend: if births rose 5% a year for three years, plan for more first-year classes soon. The same habit (count, compare, look at the trend) works for buses, clinics and bins.</p>',
          '<p><strong>تحدي الدرس:</strong> اختِرت للتو رئيسًا لبلدية مدينة جديدة فيها <strong>10,000 نسمة</strong>. كيف تضمن البيانات أن تكون المدارس كبيرة بما يكفي وأن تسير المدينة جيدًا؟ جرّب قبل أن تتابع القراءة.</p><p><strong>إجابة ممكنة للمدارس:</strong> عُدّ الأطفال حسب العمر من سجلات المواليد أو تعداد قصير. <em>لنفترض</em> أن 1,100 طفل أعمارهم 5–11. بمعدل 25 تلميذًا في الصف يكون ذلك 44 صفًا، أي 44 غرفة صف و44 معلمًا. ثم انظر إلى الاتجاه: إن ارتفعت المواليد 5% سنويًا لثلاث سنوات، فخطّط لصفوف أولى أكثر قريبًا. والعادة نفسها (عُدّ، قارن، انظر إلى الاتجاه) تصلح للحافلات والعيادات والحاويات.</p>',
          '<p><strong>چالش درس:</strong> تازه شهردار یک شهر نوساز با <strong>۱۰٬۰۰۰ نفر</strong> جمعیت شده‌ای. داده چطور مطمئن می‌کند مدرسه‌ها به اندازهٔ کافی بزرگ‌اند و شهر خوب اداره می‌شود؟ پیش از ادامه امتحان کن.</p><p><strong>یک جواب ممکن برای مدرسه‌ها:</strong> بچه‌ها را بر اساس سن از ثبت تولدها یا یک سرشماری کوتاه بشمار. <em>فرض کن</em> ۱٬۱۰۰ کودک ۵ تا ۱۱ ساله‌اند. با ۲۵ دانش‌آموز در هر کلاس، یعنی ۴۴ کلاس، پس ۴۴ اتاق و ۴۴ معلم. بعد روند را ببین: اگر تولدها سه سال پشت‌سرهم سالی ۵٪ بالا رفته، به‌زودی برای کلاس اول بیشتر برنامه بریز. همین عادت (بشمار، مقایسه کن، روند را ببین) برای اتوبوس، درمانگاه و سطل زباله هم جواب می‌دهد.</p>',
        ),
        recap(
          W('Numbers in adverts and news are chosen to persuade you.', 'تُختار الأرقام في الإعلانات والأخبار لإقناعك.', 'عددهای تبلیغ و خبر برای قانع کردن تو انتخاب شده‌اند.'),
          W('Ask: who was asked and how, compared with what, and what is hidden.', 'اسأل: من سُئل وكيف، مقارنةً بماذا، وما المخفي.', 'بپرس: از چه کسی و چطور، در مقایسه با چه، و چه چیزی پنهان است.'),
          W('Percentage points are not percent.', 'النقاط المئوية ليست نسبة مئوية.', 'واحد درصد با درصد یکی نیست.'),
        ),
        exercise('w08-q003'),
      ],
    },
    // ---------- 4. Where error comes from ----------
    {
      id: 'error-sources',
      navLabel: W('Where error comes from', 'من أين يأتي الخطأ', 'خطا از کجا می‌آید'),
      sectionLabel: W('Section 04', 'القسم ٠٤', 'بخش ۰۴'),
      timeEst: W('8 min', '٨ دقائق', '۸ دقیقه'),
      headingHtml: t(
        '<h2>Where error comes from: four places it sneaks in</h2><p class="standfirst">An error is any gap between what your analysis says and the truth. It can sneak in at four moments: when you ask the question, when you collect the data, when you analyse it, and when you draw a conclusion.</p>',
        '<h2>من أين يأتي الخطأ: أربعة أماكن يتسلل منها</h2><p class="standfirst">الخطأ هو أي فجوة بين ما يقوله تحليلك والحقيقة. وقد يتسلل في أربع لحظات: حين تطرح السؤال، وحين تجمع البيانات، وحين تحللها، وحين تستخلص النتيجة.</p>',
        '<h2>خطا از کجا می‌آید: چهار جایی که یواشکی وارد می‌شود</h2><p class="standfirst">خطا هر فاصله‌ای است بین آنچه تحلیلت می‌گوید و حقیقت. در چهار لحظه ممکن است وارد شود: وقتی پرسش را می‌پرسی، وقتی داده جمع می‌کنی، وقتی تحلیلش می‌کنی و وقتی نتیجه می‌گیری.</p>',
      ),
      blocks: [
        analogy(
          '<p>A cake can go wrong at four moments: you picked the <strong>wrong recipe</strong> (the question), the <strong>scale was off</strong> (measuring), the <strong>oven was uneven</strong> (the analysis), or you tasted one slice and declared <strong>the whole bakery</strong> perfect (the conclusion). Checking only the oven will not catch the other three.</p>',
          '<p>قد تفسد الكعكة في أربع لحظات: اخترت <strong>الوصفة الخطأ</strong> (السؤال)، أو كان <strong>الميزان غير دقيق</strong> (القياس)، أو كان <strong>الفرن غير متساوٍ</strong> (التحليل)، أو تذوقت شريحة واحدة وأعلنت أن <strong>المخبز كله</strong> ممتاز (الاستنتاج). فحص الفرن وحده لن يكشف الثلاثة الأخرى.</p>',
          '<p>یک کیک در چهار لحظه ممکن است خراب شود: <strong>دستور پخت اشتباه</strong> را انتخاب کردی (پرسش)، <strong>ترازو دقیق نبود</strong> (اندازه‌گیری)، <strong>فر یکنواخت نبود</strong> (تحلیل)، یا یک برش را چشیدی و اعلام کردی <strong>کل نانوایی</strong> عالی است (نتیجه‌گیری). فقط بررسی فر سه تای دیگر را پیدا نمی‌کند.</p>',
        ),
        figure(
          3,
          W('Four places error can come from', 'أربعة أماكن قد يأتي منها الخطأ', 'چهار جایی که خطا ممکن است از آن بیاید'),
          '/figures/week-08/deck-03-error-sources.jpg',
          'Slide from the original lesson listing four sources of error with icons: 1 asking the question, 2 collecting data (measurement error), 3 analysing and modelling data (statistical error), 4 drawing conclusions (logical or reasoning error), each with a plant-shop example.',
          fromDeck(
            'The lesson uses a plant shop; the table below gives a jam stand example for each.',
            'يستخدم الدرس متجر نباتات؛ ويعطي الجدول أدناه مثالًا من كشك المربى لكل منها.',
            'درس از یک گل‌فروشی مثال می‌زند؛ جدول پایین برای هر کدام یک مثال از غرفهٔ مربا می‌دهد.',
          ),
        ),
        {
          type: 'table',
          headers: [W('Where', 'أين', 'کجا'), W('What goes wrong', 'ما الذي يفسد', 'چه چیزی خراب می‌شود'), W('Jam stand example', 'مثال من كشك المربى', 'مثال غرفهٔ مربا')],
          rows: [
            [W('1. Asking the question', '1. طرح السؤال', '۱. پرسیدن پرسش'), W('The data cannot answer it, or nothing links X and Y', 'لا تستطيع البيانات الإجابة عنه، أو لا رابط بين X وY', 'داده نمی‌تواند جوابش را بدهد، یا هیچ ربطی بین X و Y نیست'), W('"Does the colour of the jar lid change sales?" when the file has no lid colour at all', '"هل يغيّر لون غطاء البرطمان المبيعات؟" والملف لا يحتوي لون الغطاء أصلًا', '«آیا رنگ درِ شیشه فروش را عوض می‌کند؟» در حالی که فایل اصلاً رنگ در ندارد')],
            [W('2. Collecting data (measurement)', '2. جمع البيانات (القياس)', '۲. جمع‌آوری داده (اندازه‌گیری)'), W('Imprecise tools, random noise, values recorded in ranges', 'أدوات غير دقيقة، ضجيج عشوائي، قيم مسجلة في فئات', 'ابزار نادقیق، نویز تصادفی، مقدارهای ثبت‌شده در بازه'), W('A scale that rounds to 10 g; visitors counted by eye and some missed', 'ميزان يقرّب إلى 10 غرامات؛ زوار معدودون بالعين وبعضهم فات', 'ترازویی که تا ۱۰ گرم گرد می‌کند؛ بازدیدکننده‌هایی که با چشم شمرده شدند و بعضی جا ماندند')],
            [W('3. Analysing (statistical)', '3. التحليل (إحصائي)', '۳. تحلیل (آماری)'), W('False alarms and misses (Type I and II), randomness, too few data', 'إنذارات كاذبة وإخفاقات (النوع الأول والثاني)، العشوائية، بيانات قليلة جدًا', 'هشدار اشتباه و جاافتادن (نوع اول و دوم)، تصادف، دادهٔ خیلی کم'), W('With only 8 Saturdays the tasting test gave p = 0.23: a real effect can be missed', 'مع 8 أيام سبت فقط أعطى اختبار التذوق p = 0.23: قد يفوتنا أثر حقيقي', 'با فقط ۸ شنبه آزمون مزه‌کردن p = ۰٫۲۳ داد: ممکن است یک اثر واقعی دیده نشود')],
            [W('4. Drawing conclusions (reasoning)', '4. الاستنتاج (المنطق)', '۴. نتیجه‌گیری (استدلال)'), W('Reading cause into correlation; claiming more than the data covers', 'قراءة السببية في الارتباط؛ ادعاء أكثر مما تغطيه البيانات', 'علت دیدن در همبستگی؛ ادعای بیشتر از آنچه داده پوشش می‌دهد'), W('"Tasting works at every market, all year" from 20 summer Saturdays at one market', '"التذوق ينجح في كل سوق طوال العام" استنادًا إلى 20 سبتًا صيفيًا في سوق واحد', '«مزه‌کردن در هر بازاری و تمام سال جواب می‌دهد» از روی ۲۰ شنبهٔ تابستانی در یک بازار')],
          ],
        },
        recap(
          W('Error can enter at the question, the data, the analysis or the conclusion.', 'قد يدخل الخطأ عند السؤال أو البيانات أو التحليل أو الاستنتاج.', 'خطا می‌تواند در پرسش، داده، تحلیل یا نتیجه‌گیری وارد شود.'),
          W('Name the stage, and you know where to look for a fix.', 'سمِّ المرحلة، فتعرف أين تبحث عن الإصلاح.', 'مرحله را نام ببر، تا بدانی کجا دنبال راه‌حل بگردی.'),
        ),
        exercise('w08-q004'),
      ],
    },
    // ---------- 5. Bias ----------
    {
      id: 'bias',
      navLabel: W('Bias', 'التحيز', 'سوگیری'),
      sectionLabel: W('Section 05', 'القسم ٠٥', 'بخش ۰۵'),
      timeEst: W('10 min', '١٠ دقائق', '۱۰ دقیقه'),
      headingHtml: t(
        '<h2>Bias: when the error always leans the same way</h2><p class="standfirst">Some errors are random: sometimes too high, sometimes too low, and they cancel out. Bias is different: it is a <em>systematic</em> lean, always in the same direction. Collecting more of the same data does not fix it, and it can treat groups of people unfairly.</p>',
        '<h2>التحيز: حين يميل الخطأ دائمًا في الاتجاه نفسه</h2><p class="standfirst">بعض الأخطاء عشوائية: أحيانًا أعلى وأحيانًا أقل، فيلغي بعضها بعضًا. أما التحيز فمختلف: إنه ميل <em>منهجي</em> دائمًا في الاتجاه نفسه. جمع المزيد من البيانات نفسها لا يصلحه، وقد يعامل مجموعات من الناس بظلم.</p>',
        '<h2>سوگیری: وقتی خطا همیشه به یک سمت متمایل است</h2><p class="standfirst">بعضی خطاها تصادفی‌اند: گاهی زیاد، گاهی کم، و همدیگر را خنثی می‌کنند. سوگیری فرق دارد: یک تمایل <em>نظام‌مند</em> است، همیشه به یک سمت. جمع کردن بیشترِ همان داده درستش نمی‌کند و ممکن است با گروه‌هایی از مردم ناعادلانه رفتار کند.</p>',
      ),
      blocks: [
        analogy(
          '<p>A bathroom scale that always reads <strong>2 kg light</strong>. Weighing yourself ten times a day does not help: the average of ten wrong readings is still 2 kg light. Only a different, better scale fixes it. Random error is a scale that wobbles; bias is a scale that is set wrong.</p>',
          '<p>ميزان حمّام يقرأ دائمًا <strong>أقل بكيلوغرامين</strong>. أن تزن نفسك عشر مرات يوميًا لا يفيد: متوسط عشر قراءات خاطئة يبقى أقل بكيلوغرامين. وحده ميزان آخر أفضل يصلحه. الخطأ العشوائي ميزان يهتز؛ والتحيز ميزان مضبوط خطأً.</p>',
          '<p>ترازوی حمامی که همیشه <strong>۲ کیلو کمتر</strong> نشان می‌دهد. روزی ده بار وزن کردن کمکی نمی‌کند: میانگین ده عدد اشتباه هنوز ۲ کیلو کمتر است. فقط یک ترازوی دیگر و بهتر درستش می‌کند. خطای تصادفی ترازویی است که می‌لرزد؛ سوگیری ترازویی است که اشتباه تنظیم شده.</p>',
        ),
        box(
          'keypoint',
          plainWords,
          '<ul><li><strong>Sampling (or response) bias:</strong> the people in your data are not like the people you want to describe. <em>Jam stand:</em> feedback cards given only to buyers miss everyone who walked past, so the stand looks more popular than it is.</li><li><strong>Social-desirability bias:</strong> people answer the way that sounds good. <em>Example:</em> people say they are younger than they are, or that they eat more fruit than they do.</li></ul>',
          '<ul><li><strong>تحيز العيّنة (أو الاستجابة):</strong> الناس في بياناتك ليسوا مثل الناس الذين تريد وصفهم. <em>كشك المربى:</em> بطاقات الرأي المعطاة للمشترين فقط تفوّت كل من مرّ دون أن يشتري، فيبدو الكشك أكثر شعبية مما هو.</li><li><strong>تحيز الرغبة الاجتماعية:</strong> يجيب الناس بما يبدو جيدًا. <em>مثال:</em> يقول الناس إنهم أصغر سنًا مما هم، أو إنهم يأكلون فاكهة أكثر مما يأكلون.</li></ul>',
          '<ul><li><strong>سوگیری نمونه (یا پاسخ):</strong> آدم‌های دادهٔ تو شبیه کسانی نیستند که می‌خواهی توصیفشان کنی. <em>غرفهٔ مربا:</em> کارت‌های نظرسنجی که فقط به خریداران داده می‌شود همهٔ کسانی را که رد شدند جا می‌اندازد، پس غرفه محبوب‌تر از واقعیت به نظر می‌رسد.</li><li><strong>سوگیری مطلوبیت اجتماعی:</strong> مردم طوری جواب می‌دهند که خوب به نظر برسد. <em>مثال:</em> می‌گویند جوان‌ترند، یا بیشتر از واقعیت میوه می‌خورند.</li></ul>',
        ),
        box(
          'example',
          W('Two famous cases', 'حالتان شهيرتان', 'دو نمونهٔ معروف'),
          '<p><strong>The 1936 poll with 2.4 million answers.</strong> The magazine <em>Literary Digest</em> mailed about 10 million ballots, using lists such as phone books and car registrations, which in 1936 leaned towards wealthier people. About 2.4 million came back, and the poll predicted that Alf Landon would beat Franklin Roosevelt. Roosevelt won in a landslide, with about 61% of the vote. George Gallup, with a far smaller but better-chosen sample, called it right. <strong>Lesson: a huge sample that leans one way is still wrong.</strong></p><p><strong>A hiring tool that learned the past.</strong> From 2014 Amazon built a program to score job applicants, trained on about ten years of CVs, mostly from men. Reuters reported in 2018 that it learned to mark down CVs containing the word "women\'s" (as in "women\'s chess club") and Amazon dropped the project; Amazon said recruiters never used it alone to judge candidates. <strong>Lesson: a model copies the bias in its data, and that can be unfair to whole groups.</strong></p>',
          '<p><strong>استطلاع 1936 بـ 2.4 مليون إجابة.</strong> أرسلت مجلة <em>Literary Digest</em> نحو 10 ملايين ورقة اقتراع، مستخدمة قوائم مثل أدلة الهاتف وتسجيلات السيارات، التي كانت في 1936 تميل إلى الأثرياء. عاد نحو 2.4 مليون، وتوقع الاستطلاع أن يهزم ألف لاندون فرانكلين روزفلت. ففاز روزفلت فوزًا ساحقًا بنحو 61% من الأصوات. وتوقع جورج غالوب النتيجة الصحيحة بعيّنة أصغر بكثير لكنها أحسن اختيارًا. <strong>الدرس: العيّنة الضخمة المائلة إلى جهة واحدة تبقى خاطئة.</strong></p><p><strong>أداة توظيف تعلّمت الماضي.</strong> منذ 2014 بنت أمازون برنامجًا لتقييم المتقدمين للوظائف، دُرّب على نحو عشر سنوات من السير الذاتية، معظمها لرجال. وذكرت رويترز في 2018 أنه تعلّم خفض تقييم السير التي تحتوي كلمة "women\'s" (كما في "نادي الشطرنج للنساء") فتخلّت أمازون عن المشروع؛ وقالت أمازون إن المجنِّدين لم يستخدموه وحده للحكم على المرشحين. <strong>الدرس: النموذج ينسخ تحيز بياناته، وقد يظلم ذلك مجموعات كاملة.</strong></p>',
          '<p><strong>نظرسنجی ۱۹۳۶ با ۲٫۴ میلیون جواب.</strong> مجلهٔ <em>Literary Digest</em> حدود ۱۰ میلیون برگهٔ رأی فرستاد، با فهرست‌هایی مثل دفترچهٔ تلفن و ثبت خودرو که در ۱۹۳۶ بیشتر به ثروتمندان تعلق داشت. حدود ۲٫۴ میلیون برگشت و نظرسنجی پیش‌بینی کرد آلف لندن فرانکلین روزولت را شکست می‌دهد. روزولت با حدود ۶۱٪ آرا قاطعانه برد. جورج گالاپ با نمونه‌ای بسیار کوچک‌تر اما بهتر انتخاب‌شده درست پیش‌بینی کرد. <strong>درس: نمونهٔ خیلی بزرگی که به یک سمت متمایل است باز هم اشتباه است.</strong></p><p><strong>ابزار استخدامی که گذشته را یاد گرفت.</strong> آمازون از ۲۰۱۴ برنامه‌ای برای امتیاز دادن به متقاضیان کار ساخت که با حدود ده سال رزومه، بیشترشان از مردان، آموزش دیده بود. رویترز در ۲۰۱۸ گزارش داد که یاد گرفته بود به رزومه‌هایی که واژهٔ «women\'s» (مثل «باشگاه شطرنج زنان») داشتند امتیاز کمتر بدهد و آمازون پروژه را کنار گذاشت؛ آمازون گفت استخدام‌کننده‌ها هیچ‌وقت فقط با آن دربارهٔ نامزدها قضاوت نکردند. <strong>درس: مدل سوگیری داده‌اش را کپی می‌کند و این می‌تواند با گروه‌های کامل ناعادلانه باشد.</strong></p>',
        ),
        recap(
          W('Bias is a lean in one direction; random error wobbles both ways.', 'التحيز ميل في اتجاه واحد؛ والخطأ العشوائي يتذبذب في الاتجاهين.', 'سوگیری تمایل به یک سمت است؛ خطای تصادفی به هر دو سمت نوسان می‌کند.'),
          W('More of the same data does not remove bias; better data does.', 'المزيد من البيانات نفسها لا يزيل التحيز؛ بل البيانات الأفضل.', 'بیشترِ همان داده سوگیری را از بین نمی‌برد؛ دادهٔ بهتر می‌برد.'),
          W('A model trained on biased data repeats the bias, sometimes unfairly.', 'النموذج المدرَّب على بيانات متحيزة يكرر التحيز، وأحيانًا بظلم.', 'مدلی که با دادهٔ سوگیرانه آموزش دیده سوگیری را تکرار می‌کند، گاهی ناعادلانه.'),
        ),
        exercise('w08-q005'),
        exercise('w08-q006'),
      ],
    },
    // ---------- 6. Which mistake is worse? ----------
    {
      id: 'which-error',
      navLabel: W('Which mistake is worse?', 'أي خطأ أسوأ؟', 'کدام اشتباه بدتر است؟'),
      sectionLabel: W('Section 06', 'القسم ٠٦', 'بخش ۰۶'),
      timeEst: W('6 min', '٦ دقائق', '۶ دقیقه'),
      headingHtml: t(
        '<h2>Which mistake is worse? False alarms and misses</h2><p class="standfirst">Every yes/no decision can go wrong in two ways: a <strong>false positive</strong> (saying yes when the truth is no, a false alarm) or a <strong>false negative</strong> (saying no when the truth is yes, a miss). Which one hurts more depends on the situation.</p>',
        '<h2>أي خطأ أسوأ؟ الإنذارات الكاذبة والإخفاقات</h2><p class="standfirst">كل قرار نعم/لا قد يخطئ بطريقتين: <strong>إيجابي كاذب</strong> (قول نعم والحقيقة لا، إنذار كاذب) أو <strong>سلبي كاذب</strong> (قول لا والحقيقة نعم، إخفاق). أيهما يؤلم أكثر يعتمد على الموقف.</p>',
        '<h2>کدام اشتباه بدتر است؟ هشدار اشتباه و جاافتادن</h2><p class="standfirst">هر تصمیم بله/نه به دو شکل ممکن است اشتباه شود: <strong>مثبت کاذب</strong> (گفتن بله وقتی حقیقت نه است، هشدار اشتباه) یا <strong>منفی کاذب</strong> (گفتن نه وقتی حقیقت بله است، جاافتادن). اینکه کدام بیشتر آسیب می‌زند به موقعیت بستگی دارد.</p>',
      ),
      blocks: [
        analogy(
          '<p>Week 7\'s smoke alarm again. A false alarm from burnt toast is annoying. A missed fire is a disaster. So we accept some false alarms to almost never miss a fire. A court does the opposite: convicting an innocent person is judged worse than letting a guilty one go, so it demands strong evidence.</p>',
          '<p>إنذار الدخان من الأسبوع 7 مرة أخرى. الإنذار الكاذب بسبب خبز محمّص مزعج. والحريق الفائت كارثة. لذا نقبل بعض الإنذارات الكاذبة كي لا يفوتنا حريق تقريبًا أبدًا. والمحكمة تفعل العكس: إدانة بريء تُعدّ أسوأ من إفلات مذنب، فتطلب أدلة قوية.</p>',
          '<p>دوباره آژیر دود هفتهٔ ۷. هشدار اشتباه به‌خاطر نان سوخته آزاردهنده است. آتشی که دیده نشود فاجعه است. پس چند هشدار اشتباه را می‌پذیریم تا تقریباً هیچ آتشی جا نیفتد. دادگاه برعکس عمل می‌کند: محکوم کردن بی‌گناه بدتر از آزاد شدن گناهکار شمرده می‌شود، پس شواهد قوی می‌خواهد.</p>',
        ),
        {
          type: 'table',
          headers: [W('Situation (from the lesson)', 'الموقف (من الدرس)', 'موقعیت (از درس)'), W('The worse mistake', 'الخطأ الأسوأ', 'اشتباه بدتر'), W('Why', 'لماذا', 'چرا')],
          rows: [
            [W('Choosing which customers to invest in', 'اختيار الزبائن الذين تستثمر فيهم', 'انتخاب مشتری‌هایی که روی آن‌ها سرمایه‌گذاری کنی'), W('False positive: investing in a customer who will not pay off', 'إيجابي كاذب: الاستثمار في زبون لن يُربح', 'مثبت کاذب: سرمایه‌گذاری روی مشتری‌ای که سودی نمی‌دهد'), W('Money is spent and lost; a missed good customer costs less', 'يُنفق المال ويضيع؛ وفوات زبون جيد يكلّف أقل', 'پول خرج می‌شود و از دست می‌رود؛ از دست دادن یک مشتری خوب هزینهٔ کمتری دارد')],
            [W('A court', 'المحكمة', 'دادگاه'), W('False positive: convicting an innocent person', 'إيجابي كاذب: إدانة شخص بريء', 'مثبت کاذب: محکوم کردن یک بی‌گناه'), W('Punishing the innocent is judged worse than missing a guilty person', 'معاقبة البريء تُعدّ أسوأ من إفلات مذنب', 'مجازات بی‌گناه بدتر از جاافتادن یک گناهکار شمرده می‌شود')],
            [W('An HIV test', 'اختبار فيروس نقص المناعة', 'آزمایش HIV'), W('False negative: sending home an infected patient untreated', 'سلبي كاذب: إرسال مريض مصاب إلى بيته دون علاج', 'منفی کاذب: فرستادن بیمار مبتلا به خانه بدون درمان'), W('A false positive only means a second, more careful test', 'الإيجابي الكاذب يعني فقط اختبارًا ثانيًا أدق', 'مثبت کاذب فقط یعنی یک آزمایش دوم و دقیق‌تر')],
            [W('Airport security', 'أمن المطار', 'امنیت فرودگاه'), W('False negative: letting a real threat through', 'سلبي كاذب: السماح بمرور تهديد حقيقي', 'منفی کاذب: رد شدن یک تهدید واقعی'), W('Delaying a harmless traveller is only an inconvenience', 'تأخير مسافر غير مؤذٍ مجرد إزعاج', 'معطل کردن یک مسافر بی‌خطر فقط یک دردسر است')],
            [W('<strong>Jam stand: the mould check</strong>', '<strong>كشك المربى: فحص العفن</strong>', '<strong>غرفهٔ مربا: بررسی کپک</strong>'), W('<strong>False negative: selling a mouldy jar</strong>', '<strong>سلبي كاذب: بيع برطمان متعفّن</strong>', '<strong>منفی کاذب: فروختن یک شیشهٔ کپک‌زده</strong>'), W('A sick customer and a lost reputation cost far more than one €4 jar thrown away by mistake, so the check should be strict', 'زبون مريض وسمعة ضائعة يكلّفان أكثر بكثير من برطمان بـ 4 يورو يُرمى خطأً، لذا يجب أن يكون الفحص صارمًا', 'مشتری بیمار و آبروی ازدست‌رفته خیلی گران‌تر از یک شیشهٔ ۴ یورویی است که اشتباهی دور ریخته شود، پس بررسی باید سخت‌گیرانه باشد')],
          ],
        },
        box(
          'keypoint',
          W('Before you choose α or a cut-off', 'قبل أن تختار α أو حدًا فاصلًا', 'پیش از انتخاب α یا آستانه'),
          '<p>Ask: <em>which mistake costs more here?</em> If false alarms are costly, demand stronger evidence (a smaller α, like 0.01). If misses are costly, accept more false alarms. Write the choice and the reason down before you look at the results.</p>',
          '<p>اسأل: <em>أي خطأ يكلّف أكثر هنا؟</em> إن كانت الإنذارات الكاذبة مكلفة، فاطلب أدلة أقوى (α أصغر، مثل 0.01). وإن كانت الإخفاقات مكلفة، فاقبل إنذارات كاذبة أكثر. اكتب الاختيار والسبب قبل أن تنظر إلى النتائج.</p>',
          '<p>بپرس: <em>اینجا کدام اشتباه گران‌تر است؟</em> اگر هشدار اشتباه پرهزینه است، شواهد قوی‌تری بخواه (α کوچک‌تر، مثل ۰٫۰۱). اگر جاافتادن پرهزینه است، هشدار اشتباه بیشتری را بپذیر. انتخاب و دلیلش را پیش از دیدن نتیجه بنویس.</p>',
        ),
        recap(
          W('False positive = false alarm; false negative = a miss.', 'إيجابي كاذب = إنذار كاذب؛ سلبي كاذب = إخفاق.', 'مثبت کاذب = هشدار اشتباه؛ منفی کاذب = جاافتادن.'),
          W('Which one is worse depends on the cost of each.', 'أيهما أسوأ يعتمد على تكلفة كل منهما.', 'اینکه کدام بدتر است به هزینهٔ هر کدام بستگی دارد.'),
        ),
        exercise('w08-q007'),
      ],
    },
    // ---------- 7. Measuring error ----------
    {
      id: 'measuring-error',
      navLabel: W('Measuring error', 'قياس الخطأ', 'اندازه گرفتن خطا'),
      sectionLabel: W('Section 07', 'القسم ٠٧', 'بخش ۰۷'),
      timeEst: W('15 min', '١٥ دقيقة', '۱۵ دقیقه'),
      headingHtml: t(
        '<h2>Measuring error: how sure can you be?</h2><p class="standfirst">Saying "there may be errors" is not enough; a number is better. Three numbers cover most cases: the <strong>standard error</strong> for an average, <strong>R²</strong> for a regression, and a <strong>confusion matrix</strong> for a yes/no prediction.</p>',
        '<h2>قياس الخطأ: كم يمكنك أن تكون متأكدًا؟</h2><p class="standfirst">قول "قد توجد أخطاء" لا يكفي؛ الرقم أفضل. ثلاثة أرقام تغطي معظم الحالات: <strong>الخطأ المعياري</strong> للمتوسط، و<strong>R²</strong> للانحدار، و<strong>مصفوفة الالتباس</strong> لتنبؤ نعم/لا.</p>',
        '<h2>اندازه گرفتن خطا: چقدر می‌توانی مطمئن باشی؟</h2><p class="standfirst">گفتن «ممکن است خطا باشد» کافی نیست؛ یک عدد بهتر است. سه عدد بیشتر حالت‌ها را پوشش می‌دهند: <strong>خطای معیار</strong> برای میانگین، <strong>R²</strong> برای رگرسیون، و <strong>ماتریس درهم‌ریختگی</strong> برای پیش‌بینی بله/نه.</p>',
      ),
      blocks: [
        html(
          '<h3>1. An average: standard deviation vs standard error</h3>',
          '<h3>1. المتوسط: الانحراف المعياري مقابل الخطأ المعياري</h3>',
          '<h3>۱. میانگین: انحراف معیار در برابر خطای معیار</h3>',
        ),
        box(
          'keypoint',
          plainWords,
          '<ul><li><strong>Standard deviation (SD):</strong> how spread out the single values are. "How different is one Saturday from another?" Jam stand: <strong>9.46 jars</strong>. It describes the data; it is not an error.</li><li><strong>Standard error (SE):</strong> how much the <em>average</em> would wobble if you collected a new set of Saturdays. SE = SD ÷ √n = 9.46 ÷ √20 = <strong>2.12 jars</strong>. It tells you how close 60.15 is likely to be to the true average.</li><li>This is the σ / √n "wobble" from Week 7. More data → smaller SE: with 80 Saturdays it would be about half.</li></ul>',
          '<ul><li><strong>الانحراف المعياري (SD):</strong> مدى تشتت القيم المفردة. "كم يختلف سبت عن آخر؟" كشك المربى: <strong>9.46 برطمان</strong>. إنه يصف البيانات؛ وليس خطأً.</li><li><strong>الخطأ المعياري (SE):</strong> كم سيتذبذب <em>المتوسط</em> لو جمعت مجموعة جديدة من أيام السبت. SE = SD ÷ √n = 9.46 ÷ √20 = <strong>2.12 برطمان</strong>. يخبرك كم يُرجّح أن يكون 60.15 قريبًا من المتوسط الحقيقي.</li><li>هذا هو "تذبذب" σ / √n من الأسبوع 7. بيانات أكثر ← SE أصغر: مع 80 سبتًا يصير نحو النصف.</li></ul>',
          '<ul><li><strong>انحراف معیار (SD):</strong> اینکه مقدارهای تکی چقدر پراکنده‌اند. «یک شنبه چقدر با شنبهٔ دیگر فرق دارد؟» غرفهٔ مربا: <strong>۹٫۴۶ شیشه</strong>. داده را توصیف می‌کند؛ خطا نیست.</li><li><strong>خطای معیار (SE):</strong> اینکه اگر یک دستهٔ تازه از شنبه‌ها جمع کنی، <em>میانگین</em> چقدر نوسان می‌کند. SE = SD ÷ √n = 9.46 ÷ √20 = <strong>۲٫۱۲ شیشه</strong>. می‌گوید ۶۰٫۱۵ احتمالاً چقدر به میانگین واقعی نزدیک است.</li><li>این همان «نوسان» σ / √n هفتهٔ ۷ است. دادهٔ بیشتر ← SE کوچک‌تر: با ۸۰ شنبه تقریباً نصف می‌شود.</li></ul>',
        ),
        analogy(
          '<p>Throw darts at a board. The SD is how scattered <em>single darts</em> are. Now throw 20 darts and mark their average spot; do it again and again. Those average spots land much closer together than single darts: that tighter spread is the SE. Single Saturdays jump around; the average of 20 Saturdays stays fairly still.</p>',
          '<p>ارمِ سهامًا على لوحة. الانحراف المعياري هو مدى تبعثر <em>السهام المفردة</em>. الآن ارمِ 20 سهمًا وعلّم موضع متوسطها؛ وكرر ذلك مرارًا. تقع مواضع المتوسطات أقرب بكثير بعضها إلى بعض من السهام المفردة: هذا التشتت الأضيق هو الخطأ المعياري. أيام السبت المفردة تقفز؛ ومتوسط 20 سبتًا يبقى ثابتًا نسبيًا.</p>',
          '<p>به یک صفحهٔ دارت پرتاب کن. SD یعنی <em>تک‌دارت‌ها</em> چقدر پخش‌اند. حالا ۲۰ دارت بینداز و جای میانگینشان را علامت بزن؛ بارها تکرار کن. جای میانگین‌ها خیلی نزدیک‌تر از تک‌دارت‌ها به هم می‌افتند: همین پراکندگی تنگ‌تر SE است. شنبه‌های تکی بالا و پایین می‌پرند؛ میانگین ۲۰ شنبه نسبتاً ثابت می‌ماند.</p>',
        ),
        figure(
          4,
          W('Standard deviation vs standard error', 'الانحراف المعياري مقابل الخطأ المعياري', 'انحراف معیار در برابر خطای معیار'),
          '/figures/week-08/deck-04-sd-vs-se.jpg',
          'Slide from the original lesson. Left: one bell curve, standard deviation as the spread of a sample around its mean, with the formula square root of the sum of squared differences over n minus 1. Right: several overlapping curves for different sample means, standard error as sigma over root n, with the Excel formula STDEV(A1:A10)/SQRT(COUNT(A1:A10)).',
          fromDeck(
            'Left: the spread of single values (SD). Right: the spread of sample averages (SE = σ / √n). In current Excel, STDEV.S does the same as the slide\'s STDEV.',
            'يسارًا: تشتت القيم المفردة (SD). يمينًا: تشتت متوسطات العيّنات (SE = σ / √n). في Excel الحالي تؤدي STDEV.S ما تؤديه STDEV في الشريحة.',
            'چپ: پراکندگی مقدارهای تکی (SD). راست: پراکندگی میانگین نمونه‌ها (SE = σ / √n). در Excel امروزی STDEV.S همان کار STDEV اسلاید را می‌کند.',
          ),
        ),
        tools([code(xl.sdSe)], [code(py.sdSe)]),
        html(
          '<h3>2. A regression: R²</h3><p>R² answers "how much of the ups and downs does the model explain?" (Week 6). Visitors alone explained <strong>60%</strong> of the ups and downs in jars; visitors and tasting together, <strong>71%</strong>. The other 29% is weather, luck and things not in the file: that is the model\'s error.</p><h3>3. A yes/no prediction: the confusion matrix</h3><p>When a model predicts yes or no (spam or not, will buy or not), count its four possible outcomes in a 2 × 2 table. The lesson\'s spam filter was tested on 100 emails:</p>',
          '<h3>2. الانحدار: R²</h3><p>يجيب R² عن "كم من الصعود والهبوط يفسّره النموذج؟" (الأسبوع 6). فسّر الزوار وحدهم <strong>60%</strong> من صعود وهبوط البرطمانات؛ والزوار والتذوق معًا <strong>71%</strong>. والـ 29% الباقية هي الطقس والحظ وأشياء ليست في الملف: هذا هو خطأ النموذج.</p><h3>3. تنبؤ نعم/لا: مصفوفة الالتباس</h3><p>حين يتنبأ نموذج بنعم أو لا (مزعج أم لا، سيشتري أم لا)، عُدّ نتائجه الأربع الممكنة في جدول 2 × 2. اختُبر مرشّح الرسائل المزعجة في الدرس على 100 رسالة:</p>',
          '<h3>۲. رگرسیون: R²</h3><p>R² جواب می‌دهد «مدل چقدر از بالا و پایین‌ها را توضیح می‌دهد؟» (هفتهٔ ۶). بازدیدکننده به‌تنهایی <strong>۶۰٪</strong> بالا و پایین شیشه‌ها را توضیح داد؛ بازدیدکننده و مزه‌کردن با هم <strong>۷۱٪</strong>. ۲۹٪ باقی هوا، شانس و چیزهایی است که در فایل نیست: این خطای مدل است.</p><h3>۳. پیش‌بینی بله/نه: ماتریس درهم‌ریختگی</h3><p>وقتی مدلی بله یا نه پیش‌بینی می‌کند (اسپم یا نه، می‌خرد یا نه)، چهار نتیجهٔ ممکنش را در یک جدول ۲ × ۲ بشمار. فیلتر اسپم درس روی ۱۰۰ ایمیل آزمایش شد:</p>',
        ),
        figure(
          5,
          W('The confusion matrix in plain words', 'مصفوفة الالتباس بكلمات بسيطة', 'ماتریس درهم‌ریختگی به زبان ساده'),
          '/figures/week-08/diagram-01-confusion.svg',
          'A confusion matrix for a spam filter tested on 100 emails: 45 spam caught, 20 spam missed, 5 good emails wrongly flagged, 30 good emails let through. Accuracy 75 percent, precision 90 percent, recall 69 percent.',
          W(
            'Green cells are right, red cells are mistakes. A false positive is a Type I error, a false negative a Type II error, as in Week 7.',
            'الخلايا الخضراء صحيحة، والحمراء أخطاء. الإيجابي الكاذب خطأ من النوع الأول، والسلبي الكاذب من النوع الثاني، كما في الأسبوع 7.',
            'خانه‌های سبز درست‌اند و قرمزها اشتباه. مثبت کاذب خطای نوع اول و منفی کاذب خطای نوع دوم است، مثل هفتهٔ ۷.',
          ),
        ),
        box(
          'keypoint',
          plainWords,
          '<ul><li><strong>Accuracy</strong> = right answers ÷ all answers = 75 ÷ 100 = <strong>75%</strong>. Simple, but it can fool you: if only 1 email in 100 were spam, a filter that never says "spam" would still be 99% accurate.</li><li><strong>Precision</strong> = TP ÷ (TP + FP) = 45 ÷ 50 = <strong>90%</strong>. "When it says spam, can I trust it?"</li><li><strong>Recall</strong> (also called sensitivity) = TP ÷ (TP + FN) = 45 ÷ 65 = <strong>69%</strong>. "Of all the spam, how much did it catch?"</li><li><strong>Specificity</strong> = TN ÷ (TN + FP) = 30 ÷ 35 = <strong>86%</strong>. "Of all the good mail, how much got through?"</li></ul><p>Which one matters most goes back to Section 6: if missing spam is the worse mistake, watch recall; if losing a real email is worse, watch precision. Definitions as in Google\'s Machine Learning Crash Course.</p>',
          '<ul><li><strong>الدقة الكلية (Accuracy)</strong> = الإجابات الصحيحة ÷ كل الإجابات = 75 ÷ 100 = <strong>75%</strong>. بسيطة، لكنها قد تخدعك: لو كانت رسالة واحدة من 100 مزعجة، فإن مرشّحًا لا يقول "مزعج" أبدًا سيكون دقيقًا بنسبة 99%.</li><li><strong>الدقة (Precision)</strong> = TP ÷ (TP + FP) = 45 ÷ 50 = <strong>90%</strong>. "حين يقول مزعج، هل أثق به؟"</li><li><strong>الاستدعاء (Recall)</strong> (ويسمى الحساسية) = TP ÷ (TP + FN) = 45 ÷ 65 = <strong>69%</strong>. "من كل الرسائل المزعجة، كم التقط؟"</li><li><strong>النوعية (Specificity)</strong> = TN ÷ (TN + FP) = 30 ÷ 35 = <strong>86%</strong>. "من كل البريد السليم، كم مرّ؟"</li></ul><p>أيها الأهم يعود إلى القسم 6: إن كان فوات الرسائل المزعجة هو الخطأ الأسوأ فراقب الاستدعاء؛ وإن كان ضياع رسالة حقيقية أسوأ فراقب الدقة. التعريفات كما في دورة Google المكثفة لتعلم الآلة.</p>',
          '<ul><li><strong>صحت کلی (Accuracy)</strong> = جواب‌های درست ÷ همهٔ جواب‌ها = ۷۵ ÷ ۱۰۰ = <strong>۷۵٪</strong>. ساده است اما می‌تواند گولت بزند: اگر فقط ۱ ایمیل از ۱۰۰ اسپم بود، فیلتری که هرگز نمی‌گوید «اسپم» باز هم ۹۹٪ صحت داشت.</li><li><strong>دقت (Precision)</strong> = TP ÷ (TP + FP) = ۴۵ ÷ ۵۰ = <strong>۹۰٪</strong>. «وقتی می‌گوید اسپم، می‌توانم اعتماد کنم؟»</li><li><strong>بازیابی (Recall)</strong> (یا حساسیت) = TP ÷ (TP + FN) = ۴۵ ÷ ۶۵ = <strong>۶۹٪</strong>. «از همهٔ اسپم‌ها چقدر را گرفت؟»</li><li><strong>ویژگی (Specificity)</strong> = TN ÷ (TN + FP) = ۳۰ ÷ ۳۵ = <strong>۸۶٪</strong>. «از همهٔ ایمیل‌های سالم چقدر رد شد؟»</li></ul><p>اینکه کدام مهم‌تر است برمی‌گردد به بخش ۶: اگر جا انداختن اسپم اشتباه بدتر است، بازیابی را ببین؛ اگر از دست دادن یک ایمیل واقعی بدتر است، دقت را. تعریف‌ها مطابق دورهٔ فشردهٔ یادگیری ماشین Google است.</p>',
        ),
        figure(
          6,
          W('Error for a regression and for a classifier', 'الخطأ للانحدار وللمصنِّف', 'خطا برای رگرسیون و برای طبقه‌بند'),
          '/figures/week-08/deck-05-confusion-matrix.jpg',
          'Slide from the original lesson. Left: R squared as one minus the residual sum of squares over the total sum of squares, and a spam confusion matrix with TP 45, FN 20, FP 5, TN 30. Right: a general confusion matrix with sensitivity, specificity, precision, negative predictive value and accuracy formulas.',
          fromDeck(
            'The full table of formulas. You only need four of them: accuracy, precision, recall (sensitivity) and specificity.',
            'جدول المعادلات الكامل. تحتاج أربعًا منها فقط: الدقة الكلية، والدقة، والاستدعاء (الحساسية)، والنوعية.',
            'جدول کامل فرمول‌ها. فقط چهار تای آن را لازم داری: صحت کلی، دقت، بازیابی (حساسیت) و ویژگی.',
          ),
        ),
        tools([code(xl.confusion)], [code(py.confusion)]),
        recap(
          W('SD = spread of single values; SE = SD ÷ √n = wobble of the average.', 'SD = تشتت القيم المفردة؛ SE = SD ÷ √n = تذبذب المتوسط.', 'SD = پراکندگی مقدارهای تکی؛ SE = SD ÷ √n = نوسان میانگین.'),
          W('R² = the share of the ups and downs the model explains.', 'R² = نسبة الصعود والهبوط التي يفسّرها النموذج.', 'R² = سهم بالا و پایین‌هایی که مدل توضیح می‌دهد.'),
          W('Confusion matrix: accuracy, precision ("can I trust a yes?") and recall ("did I catch them all?").', 'مصفوفة الالتباس: الدقة الكلية، والدقة ("هل أثق بنعم؟")، والاستدعاء ("هل التقطتها كلها؟").', 'ماتریس درهم‌ریختگی: صحت کلی، دقت («به بله اعتماد کنم؟») و بازیابی («همه را گرفتم؟»).'),
        ),
        exercise('w08-q008'),
        exercise('w08-q009'),
      ],
    },
    // ---------- 8. Using error analysis ----------
    {
      id: 'using-errors',
      navLabel: W('What to do with errors', 'ماذا نفعل بالأخطاء', 'با خطاها چه کنیم'),
      sectionLabel: W('Section 08', 'القسم ٠٨', 'بخش ۰۸'),
      timeEst: W('6 min', '٦ دقائق', '۶ دقیقه'),
      headingHtml: t(
        '<h2>What to do with error analysis: scope, then improve</h2><p class="standfirst">Error analysis is not about feeling bad. It does two useful jobs: it tells you <strong>who your result applies to and how sure you are</strong>, and it shows you <strong>how to make the next analysis better</strong>.</p>',
        '<h2>ماذا نفعل بتحليل الأخطاء: النطاق، ثم التحسين</h2><p class="standfirst">تحليل الأخطاء ليس للشعور بالسوء. إنه يؤدي مهمتين مفيدتين: يخبرك <strong>على من تنطبق نتيجتك وكم أنت متأكد</strong>، ويريك <strong>كيف تجعل التحليل التالي أفضل</strong>.</p>',
        '<h2>با تحلیل خطا چه کنیم: دامنه، بعد بهبود</h2><p class="standfirst">تحلیل خطا برای احساس بد کردن نیست. دو کار مفید می‌کند: می‌گوید <strong>نتیجه‌ات برای چه کسانی است و چقدر مطمئنی</strong>، و نشان می‌دهد <strong>تحلیل بعدی را چطور بهتر کنی</strong>.</p>',
      ),
      blocks: [
        {
          type: 'table',
          headers: [W('Job', 'المهمة', 'کار'), W('Question to answer', 'السؤال الذي تجيب عنه', 'سؤالی که جواب می‌دهی'), W('Jam stand', 'كشك المربى', 'غرفهٔ مربا')],
          rows: [
            [W('State the scope', 'حدّد النطاق', 'دامنه را بگو'), W('Which people, places and times does this apply to?', 'على أي ناس وأماكن وأوقات ينطبق هذا؟', 'برای کدام آدم‌ها، جاها و زمان‌ها صدق می‌کند؟'), W('One market, 20 summer Saturdays in 2024', 'سوق واحد، 20 سبتًا صيفيًا في 2024', 'یک بازار، ۲۰ شنبهٔ تابستانی در ۲۰۲۴')],
            [W('Say how sure you are', 'قل كم أنت متأكد', 'بگو چقدر مطمئنی'), W('What are the SE, R², p or precision?', 'ما قيم SE وR² وp أو الدقة؟', 'SE، R²، p یا دقت چقدر است؟'), W('Average 60.15 ± about 2 jars (SE 2.12); R² 0.71; tasting test p = 0.010', 'المتوسط 60.15 ± نحو برطمانين (SE 2.12)؛ R² 0.71؛ اختبار التذوق p = 0.010', 'میانگین ۶۰٫۱۵ ± حدود ۲ شیشه (SE ۲٫۱۲)؛ R² ۰٫۷۱؛ آزمون مزه‌کردن p = ۰٫۰۱۰')],
            [W('Reduce random error', 'قلّل الخطأ العشوائي', 'خطای تصادفی را کم کن'), W('Collect more of the same kind of data', 'اجمع المزيد من البيانات من النوع نفسه', 'بیشتر از همان نوع داده جمع کن'), W('Keep alternating tasting into the autumn: more Saturdays, smaller SE', 'استمر في تبديل التذوق حتى الخريف: أيام سبت أكثر، SE أصغر', 'مزه‌کردن یکی‌درمیان را تا پاییز ادامه بده: شنبهٔ بیشتر، SE کوچک‌تر')],
            [W('Reduce bias', 'قلّل التحيز', 'سوگیری را کم کن'), W('Collect better data from the groups you missed', 'اجمع بيانات أفضل من المجموعات التي فاتتك', 'از گروه‌هایی که جا ماندند دادهٔ بهتر جمع کن'), W('Ask passers-by too, not only buyers; try a second market', 'اسأل المارّة أيضًا، لا المشترين فقط؛ وجرّب سوقًا ثانيًا', 'از رهگذرها هم بپرس، نه فقط خریداران؛ یک بازار دوم را امتحان کن')],
          ],
        },
        analogy(
          '<p>A weather forecast says "70% chance of rain in Amsterdam tomorrow". It gives the <strong>scope</strong> (Amsterdam, tomorrow) and <strong>how sure</strong> (70%). Nobody calls that forecast a failure for being honest about doubt; they bring an umbrella. Your report should do the same.</p>',
          '<p>تقول نشرة الطقس "احتمال المطر غدًا في أمستردام 70%". إنها تعطي <strong>النطاق</strong> (أمستردام، غدًا) و<strong>درجة اليقين</strong> (70%). لا أحد يعدّ تلك النشرة فاشلة لأنها صريحة بشأن الشك؛ بل يأخذون مظلة. وينبغي أن يفعل تقريرك الشيء نفسه.</p>',
          '<p>پیش‌بینی هوا می‌گوید «فردا در آمستردام ۷۰٪ احتمال باران». <strong>دامنه</strong> (آمستردام، فردا) و <strong>میزان اطمینان</strong> (۷۰٪) را می‌دهد. هیچ‌کس آن پیش‌بینی را به‌خاطر صداقت دربارهٔ تردید شکست‌خورده نمی‌داند؛ چتر برمی‌دارند. گزارش تو هم باید همین کار را بکند.</p>',
        ),
        box(
          'example',
          W('A "limits" paragraph for the jam stand', 'فقرة "حدود" لكشك المربى', 'یک بند «محدودیت‌ها» برای غرفهٔ مربا'),
          '<p><em>"These results come from 20 summer Saturdays (April to August 2024) at one market. Tasting was put out every other Saturday, so both groups had similar weather. The average of 60.15 jars could be about 2 jars off (standard error 2.12). Visitors were counted by hand, so some may be missing. We do not know yet whether tasting works in winter or at other markets; we will keep alternating until December to check."</em></p>',
          '<p><em>"تأتي هذه النتائج من 20 سبتًا صيفيًا (أبريل إلى أغسطس 2024) في سوق واحد. وُضع التذوق كل سبتين، فكان الطقس متشابهًا في المجموعتين. قد يبتعد المتوسط 60.15 برطمانًا بنحو برطمانين (الخطأ المعياري 2.12). عُدّ الزوار يدويًا، فقد يكون بعضهم مفقودًا. لا نعرف بعد إن كان التذوق ينجح في الشتاء أو في أسواق أخرى؛ وسنستمر في التبديل حتى ديسمبر للتحقق."</em></p>',
          '<p><em>«این نتایج از ۲۰ شنبهٔ تابستانی (آوریل تا اوت ۲۰۲۴) در یک بازار است. مزه‌کردن یک شنبه در میان گذاشته شد، پس هر دو گروه هوای مشابهی داشتند. میانگین ۶۰٫۱۵ شیشه ممکن است حدود ۲ شیشه خطا داشته باشد (خطای معیار ۲٫۱۲). بازدیدکننده‌ها با دست شمرده شدند، پس شاید بعضی جا مانده باشند. هنوز نمی‌دانیم مزه‌کردن در زمستان یا بازارهای دیگر جواب می‌دهد؛ تا دسامبر یکی‌درمیان ادامه می‌دهیم تا بررسی کنیم.»</em></p>',
        ),
        recap(
          W('Scope: who and when the result applies to; how sure you are, with a number.', 'النطاق: على من ومتى تنطبق النتيجة؛ وكم أنت متأكد، برقم.', 'دامنه: نتیجه برای چه کسی و چه زمانی است؛ چقدر مطمئنی، با یک عدد.'),
          W('More data shrinks random error; better data shrinks bias.', 'البيانات الأكثر تقلّص الخطأ العشوائي؛ والبيانات الأفضل تقلّص التحيز.', 'دادهٔ بیشتر خطای تصادفی را کم می‌کند؛ دادهٔ بهتر سوگیری را.'),
        ),
        exercise('w08-q010'),
      ],
    },
    ...comm.sections,
    // ---------- 14. Homework ----------
    {
      id: 'homework',
      navLabel: W('Homework', 'الواجب', 'تکلیف'),
      sectionLabel: W('Section 14', 'القسم ١٤', 'بخش ۱۴'),
      headingHtml: t(
        '<h2>Homework: finish your final project\'s story</h2><p class="standfirst">Three short tasks join your Weeks 4–7 work into one story, add its limits, and turn it into an executive summary and a slide outline. Each task has an analogy, a checklist and an example answer on the jam stand; a feedback question comes last.</p>',
        '<h2>الواجب: أكمل قصة مشروعك النهائي</h2><p class="standfirst">ثلاث مهام قصيرة تجمع عملك في الأسابيع 4–7 في قصة واحدة، وتضيف حدودها، وتحوّلها إلى ملخص تنفيذي ومخطط شرائح. لكل مهمة تشبيه وقائمة تحقق ومثال إجابة على كشك المربى؛ ويأتي سؤال الرأي في الأخير.</p>',
        '<h2>تکلیف: داستان پروژهٔ نهایی‌ات را کامل کن</h2><p class="standfirst">سه کار کوتاه کار هفته‌های ۴ تا ۷ تو را در یک داستان کنار هم می‌گذارد، محدودیت‌هایش را اضافه می‌کند و آن را به یک خلاصهٔ مدیریتی و طرح اسلایدها تبدیل می‌کند. هر کار یک تشبیه، یک فهرست و یک جواب نمونه روی غرفهٔ مربا دارد؛ سؤال نظرخواهی آخر می‌آید.</p>',
      ),
      blocks: [week08Homework],
    },
    // ---------- 15. What's next ----------
    {
      id: 'whats-next',
      navLabel: W("What's next", 'ما التالي', 'بعدش چه'),
      sectionLabel: W('Section 15', 'القسم ١٥', 'بخش ۱۵'),
      headingHtml: t(
        '<h2>What\'s next: present your project</h2><p>You now have every piece: a clean dataset, charts, a regression, a test, honest limits, a report and slides. The last step is on the <a href="/week/final-project">Final Project page</a>: add the SWOT and tools sections, finish the README, check your folder against the hand-in checklist, and present.</p>',
        '<h2>ما التالي: اعرض مشروعك</h2><p>لديك الآن كل القطع: بيانات نظيفة، ورسوم، وانحدار، واختبار، وحدود صادقة، وتقرير، وشرائح. الخطوة الأخيرة في <a href="/week/final-project">صفحة المشروع النهائي</a>: أضف قسمي SWOT والأدوات، وأكمل README، وطابق مجلدك مع قائمة التسليم، واعرض.</p>',
        '<h2>بعدش چه: پروژه‌ات را ارائه کن</h2><p>حالا همهٔ قطعه‌ها را داری: دادهٔ تمیز، نمودار، رگرسیون، آزمون، محدودیت‌های صادقانه، گزارش و اسلاید. گام آخر در <a href="/week/final-project">صفحهٔ پروژهٔ نهایی</a> است: بخش‌های SWOT و ابزارها را اضافه کن، README را کامل کن، پوشه‌ات را با فهرست تحویل مقایسه کن، و ارائه بده.</p>',
      ),
      blocks: [],
    },
  ],
}
