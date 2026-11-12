// Sections 9-13 of Week 8 (week-08.ts places them): communicating findings, from the original "Week 10" deck
// (pages 25-36 of public/originals/week-08.pdf), with the jam stand as the running example. Outside sources used:
// Minto's pyramid principle ("answer first"), Tufte's data-ink ratio, Knaflic's Storytelling with Data (declutter
// and focus), and Correll, Bertini and Franconeri, "Truncating the Y-Axis: Threat or Menace?" (CHI 2020).
// ar/fa are draft translations awaiting native review. Code and formulas stay English.
import type { Block, Localized, Question, Week } from '../types'
import { py } from './week08Code'

const t = (en: string, ar: string, fa: string): Localized => ({ en, ar, fa })
const W = t
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
const notebookUrl =
  'https://colab.research.google.com/github/PA-WiT/BA2/blob/main/public/notebooks/week-08-errors-and-reporting.ipynb'

export const questions: Question[] = [
  {
    id: 'w08-q011',
    weekId: 'week-08',
    topic: 'report-or-presentation',
    answer: 1,
    prompt: t(
      'Where does the main finding go in a business report?',
      'أين توضع النتيجة الرئيسية في تقرير العمل؟',
      'یافتهٔ اصلی در گزارش کسب‌وکار کجا می‌آید؟',
    ),
    options: [
      t('At the end, after all the methods', 'في النهاية، بعد كل الطرق', 'در آخر، بعد از همهٔ روش‌ها'),
      t('First, in the executive summary', 'أولًا، في الملخص التنفيذي', 'اول، در خلاصهٔ مدیریتی'),
      t('Only in the appendix', 'في الملحق فقط', 'فقط در پیوست'),
    ],
  },
  {
    id: 'w08-q012',
    weekId: 'week-08',
    topic: 'charts',
    answer: 0,
    prompt: t(
      'A bar chart of jars per Saturday starts its axis at 50 instead of 0. What happens?',
      'مخطط أعمدة للبرطمانات كل سبت يبدأ محوره عند 50 بدل 0. ماذا يحدث؟',
      'یک نمودار میله‌ای شیشه در هر شنبه محورش را از ۵۰ به‌جای ۰ شروع می‌کند. چه می‌شود؟',
    ),
    options: [
      t('The difference between the bars looks bigger than it really is', 'يبدو الفرق بين الأعمدة أكبر مما هو فعلًا', 'فاصلهٔ میله‌ها بزرگ‌تر از واقعیت به نظر می‌رسد'),
      t('The difference looks smaller than it really is', 'يبدو الفرق أصغر مما هو فعلًا', 'فاصله کوچک‌تر از واقعیت به نظر می‌رسد'),
      t('Nothing, as long as the axis has numbers on it', 'لا شيء، ما دام المحور يحمل أرقامًا', 'هیچ، تا وقتی محور عدد دارد'),
    ],
  },
  {
    id: 'w08-q013',
    weekId: 'week-08',
    topic: 'charts',
    answer: 1,
    prompt: t('Which chart title communicates best?', 'أي عنوان مخطط يوصل الفكرة أفضل؟', 'کدام عنوان نمودار بهتر منتقل می‌کند؟'),
    options: [
      t('Jars by tasting', 'البرطمانات حسب التذوق', 'شیشه‌ها بر اساس مزه‌کردن'),
      t('Tasting Saturdays sell about 9.5 more jars', 'أيام السبت بالتذوق تبيع نحو 9.5 برطمانات أكثر', 'شنبه‌های مزه‌کردن حدود ۹٫۵ شیشه بیشتر می‌فروشند'),
      t('Chart 1', 'المخطط 1', 'نمودار ۱'),
    ],
  },
  {
    id: 'w08-q014',
    weekId: 'week-08',
    topic: 'common-mistakes',
    answer: 1,
    prompt: t(
      'The tasting test gave p = 0.010 on 20 summer Saturdays at one market. Which sentence is honest?',
      'أعطى اختبار التذوق p = 0.010 على 20 سبتًا صيفيًا في سوق واحد. أي جملة صادقة؟',
      'آزمون مزه‌کردن روی ۲۰ شنبهٔ تابستانی در یک بازار p = ۰٫۰۱۰ داد. کدام جمله صادقانه است؟',
    ),
    options: [
      t('Tasting works at every market, all year round', 'التذوق ينجح في كل سوق طوال العام', 'مزه‌کردن در هر بازاری و تمام سال جواب می‌دهد'),
      t('At this market, in summer, tasting Saturdays sold more; we should check other seasons', 'في هذا السوق، صيفًا، باعت أيام التذوق أكثر؛ ويجب أن نتحقق في مواسم أخرى', 'در این بازار، در تابستان، شنبه‌های مزه‌کردن بیشتر فروختند؛ باید فصل‌های دیگر را هم بررسی کنیم'),
      t('The test proves tasting adds exactly 9.5 jars', 'يثبت الاختبار أن التذوق يضيف 9.5 برطمانات بالضبط', 'آزمون ثابت می‌کند مزه‌کردن دقیقاً ۹٫۵ شیشه اضافه می‌کند'),
    ],
  },
]

export const sections: Week['sections'] = [
  // ---------- 9. Presentation or report? ----------
  {
    id: 'report-or-presentation',
    navLabel: W('Presentation or report?', 'عرض أم تقرير؟', 'ارائه یا گزارش؟'),
    sectionLabel: W('Section 09', 'القسم ٠٩', 'بخش ۰۹'),
    timeEst: W('10 min', '١٠ دقائق', '۱۰ دقیقه'),
    headingHtml: t(
      '<h2>Presentation or report? Put the answer first</h2><p class="standfirst">You will usually share an analysis in one of two ways: a presentation (you talk, slides help) or a report (a document people read on their own). Both work best when they start with the answer.</p>',
      '<h2>عرض أم تقرير؟ ضع الإجابة أولًا</h2><p class="standfirst">ستشارك التحليل عادةً بإحدى طريقتين: عرض (تتحدث وتساعدك الشرائح) أو تقرير (وثيقة يقرأها الناس وحدهم). كلاهما يعمل أفضل حين يبدأ بالإجابة.</p>',
      '<h2>ارائه یا گزارش؟ جواب را اول بگذار</h2><p class="standfirst">معمولاً تحلیل را به یکی از دو شکل به اشتراک می‌گذاری: ارائه (تو حرف می‌زنی و اسلایدها کمک می‌کنند) یا گزارش (سندی که مردم خودشان می‌خوانند). هر دو وقتی بهتر کار می‌کنند که با جواب شروع شوند.</p>',
    ),
    blocks: [
      {
        type: 'table',
        headers: [W('', '', ''), W('Presentation', 'العرض', 'ارائه'), W('Report', 'التقرير', 'گزارش')],
        rows: [
          [W('<strong>Purpose</strong>', '<strong>الغرض</strong>', '<strong>هدف</strong>'), W('Engage the audience and get one message across', 'إشراك الجمهور وإيصال رسالة واحدة', 'درگیر کردن مخاطب و رساندن یک پیام'), W('Give a full account of the information and findings', 'تقديم حساب كامل للمعلومات والنتائج', 'ارائهٔ شرح کامل اطلاعات و یافته‌ها')],
          [W('<strong>Format</strong>', '<strong>الشكل</strong>', '<strong>قالب</strong>'), W('Spoken, with visual aids', 'شفهي، مع وسائل بصرية', 'گفتاری، با کمک تصویری'), W('A document (text and visuals)', 'وثيقة (نص وصور)', 'یک سند (متن و تصویر)')],
          [W('<strong>Structure</strong>', '<strong>البنية</strong>', '<strong>ساختار</strong>'), W('Flexible; uses storytelling', 'مرنة؛ تستخدم السرد القصصي', 'انعطاف‌پذیر؛ از قصه‌گویی استفاده می‌کند'), W('Usually a standard structure', 'عادةً بنية معيارية', 'معمولاً یک ساختار استاندارد')],
          [W('<strong>Detail</strong>', '<strong>التفاصيل</strong>', '<strong>جزئیات</strong>'), W('Little text, only the data that makes the point', 'نص قليل، والبيانات التي توضح الفكرة فقط', 'متن کم، فقط داده‌ای که نکته را می‌رساند'), W('All the data, methods and conclusions', 'كل البيانات والطرق والاستنتاجات', 'همهٔ داده‌ها، روش‌ها و نتیجه‌ها')],
        ],
      },
      analogy(
        '<p>A newspaper puts the <strong>headline</strong> first, then the most important facts, then the details. Most readers stop after the first paragraph and still know the news. A business report works the same way: a busy owner may read only the executive summary, so it must contain the answer.</p>',
        '<p>تضع الصحيفة <strong>العنوان</strong> أولًا، ثم أهم الحقائق، ثم التفاصيل. يتوقف معظم القراء بعد الفقرة الأولى ويعرفون الخبر مع ذلك. وتقرير العمل يعمل بالطريقة نفسها: قد يقرأ المالك المشغول الملخص التنفيذي فقط، لذا يجب أن يحتوي الإجابة.</p>',
        '<p>روزنامه اول <strong>تیتر</strong> را می‌گذارد، بعد مهم‌ترین واقعیت‌ها، بعد جزئیات. بیشتر خواننده‌ها بعد از پاراگراف اول دست می‌کشند و باز هم خبر را می‌دانند. گزارش کسب‌وکار هم همین‌طور است: صاحب‌کار پرمشغله شاید فقط خلاصهٔ مدیریتی را بخواند، پس جواب باید در آن باشد.</p>',
      ),
      figure(
        7,
        W('The parts of a business report', 'أجزاء تقرير العمل', 'بخش‌های گزارش کسب‌وکار'),
        '/figures/week-08/deck-06-report.jpg',
        'Slide from the original lesson: a sample project status report next to the five parts of a business report: 1 executive summary, 2 introduction, 3 main body with results and supporting evidence, 4 conclusion with recommendations and next steps, 5 appendices.',
        fromDeck(
          '1. Executive summary: the take-home message. 2. Introduction: context and motivation. 3. Main body: results with evidence and charts. 4. Conclusion: recommendations and next steps. 5. Appendices: extra data and detailed methods.',
          '1. الملخص التنفيذي: الرسالة الأساسية. 2. المقدمة: السياق والدافع. 3. المتن: النتائج مع الأدلة والرسوم. 4. الخاتمة: التوصيات والخطوات التالية. 5. الملاحق: بيانات إضافية وطرق مفصّلة.',
          '۱. خلاصهٔ مدیریتی: پیام اصلی. ۲. مقدمه: زمینه و انگیزه. ۳. بدنه: نتایج با شواهد و نمودار. ۴. نتیجه‌گیری: توصیه‌ها و گام‌های بعدی. ۵. پیوست‌ها: دادهٔ اضافه و روش‌های مفصل.',
        ),
      ),
      figure(
        8,
        W('The parts of a business presentation', 'أجزاء عرض العمل', 'بخش‌های ارائهٔ کسب‌وکار'),
        '/figures/week-08/deck-07-presentation.jpg',
        'Slide from the original lesson: six sample slides next to the parts of a business presentation: 1 engage the audience with the challenge or an interesting finding, 2 agenda, 3 main content slides with minimal text and strong visuals, 4 key takeaways or recommendations, 5 conclusion referring back to the introduction, 6 appendix slides for questions.',
        fromDeck(
          'Open with the challenge or the most interesting finding, keep the content slides visual, end with the takeaways, and keep appendix slides ready for questions.',
          'ابدأ بالتحدي أو بأكثر النتائج إثارة، واجعل شرائح المحتوى مرئية، واختم بالخلاصات، واحتفظ بشرائح ملحقة جاهزة للأسئلة.',
          'با چالش یا جالب‌ترین یافته شروع کن، اسلایدهای محتوا را تصویری نگه دار، با نکته‌های اصلی تمام کن، و اسلایدهای پیوست را برای پرسش‌ها آماده داشته باش.',
        ),
      ),
      box(
        'keypoint',
        W('Answer first (the pyramid principle)', 'الإجابة أولًا (مبدأ الهرم)', 'اول جواب (اصل هرم)'),
        '<p>Barbara Minto, a former McKinsey consultant, taught business writers to build a <strong>pyramid</strong>: the main answer at the top, then the two or three reasons that support it, then the evidence for each reason. Readers get the point in the first sentence and can stop or dig deeper.</p><p><strong>Jam stand, answer first:</strong> "Put the tasting table out every Saturday. (Why?) Tasting Saturdays sold about 9.5 more jars; more visitors became buyers; and the gap is very unlikely to be luck."</p>',
        '<p>علّمت باربرا مينتو، المستشارة السابقة في McKinsey، كتّاب الأعمال بناء <strong>هرم</strong>: الإجابة الرئيسية في القمة، ثم سببان أو ثلاثة يدعمانها، ثم الدليل على كل سبب. يحصل القراء على الفكرة من الجملة الأولى ويستطيعون التوقف أو التعمق.</p><p><strong>كشك المربى، الإجابة أولًا:</strong> "ضعوا طاولة التذوق كل سبت. (لماذا؟) باعت أيام التذوق نحو 9.5 برطمانات أكثر؛ وصار زوار أكثر مشترين؛ والفرق بعيد جدًا عن أن يكون حظًا."</p>',
        '<p>باربارا مینتو، مشاور پیشین McKinsey، به نویسنده‌های کسب‌وکار یاد داد یک <strong>هرم</strong> بسازند: جواب اصلی در رأس، بعد دو یا سه دلیلی که از آن پشتیبانی می‌کنند، بعد شواهد هر دلیل. خواننده‌ها نکته را در جملهٔ اول می‌گیرند و می‌توانند همان‌جا بایستند یا عمیق‌تر شوند.</p><p><strong>غرفهٔ مربا، اول جواب:</strong> «میز مزه‌کردن را هر شنبه بگذارید. (چرا؟) شنبه‌های مزه‌کردن حدود ۹٫۵ شیشه بیشتر فروختند؛ بازدیدکنندهٔ بیشتری خریدار شد؛ و این فاصله به احتمال بسیار زیاد شانس نیست.»</p>',
      ),
      recap(
        W('Presentation: one message, little text, strong visuals. Report: the full account, in a standard order.', 'العرض: رسالة واحدة، نص قليل، صور قوية. التقرير: الحساب الكامل بترتيب معياري.', 'ارائه: یک پیام، متن کم، تصویر قوی. گزارش: شرح کامل، با ترتیب استاندارد.'),
        W('Both start with the answer: the executive summary or the opening slide.', 'كلاهما يبدأ بالإجابة: الملخص التنفيذي أو الشريحة الافتتاحية.', 'هر دو با جواب شروع می‌شوند: خلاصهٔ مدیریتی یا اسلاید اول.'),
      ),
      exercise('w08-q011'),
    ],
  },
  // ---------- 10. Charts that communicate ----------
  {
    id: 'charts',
    navLabel: W('Charts that communicate', 'رسوم توصل الفكرة', 'نمودارهایی که منتقل می‌کنند'),
    sectionLabel: W('Section 10', 'القسم ١٠', 'بخش ۱۰'),
    timeEst: W('15 min', '١٥ دقيقة', '۱۵ دقیقه'),
    headingHtml: t(
      '<h2>Charts that communicate: one chart, one message</h2><p class="standfirst">The charts you used to <em>explore</em> your data are not always the best ones to <em>tell</em> your result. A chart in a report or a talk should directly support one claim, and be clear, readable and honest.</p>',
      '<h2>رسوم توصل الفكرة: مخطط واحد، رسالة واحدة</h2><p class="standfirst">الرسوم التي استخدمتها <em>لاستكشاف</em> بياناتك ليست دائمًا الأفضل <em>لرواية</em> نتيجتك. يجب أن يدعم المخطط في التقرير أو العرض ادعاءً واحدًا مباشرة، وأن يكون واضحًا ومقروءًا وصادقًا.</p>',
      '<h2>نمودارهایی که منتقل می‌کنند: یک نمودار، یک پیام</h2><p class="standfirst">نمودارهایی که برای <em>کاوش</em> داده‌ات کشیدی همیشه بهترین‌ها برای <em>تعریف</em> نتیجه‌ات نیستند. نمودار در گزارش یا ارائه باید مستقیم از یک ادعا پشتیبانی کند و روشن، خوانا و صادق باشد.</p>',
    ),
    blocks: [
      figure(
        9,
        W('A title that says the takeaway', 'عنوان يقول الخلاصة', 'عنوانی که نتیجه را می‌گوید'),
        '/figures/week-08/deck-08-action-title.jpg',
        'Line chart from the original lesson titled "Novo Nordisk remains global diabetes value market leader", showing market shares of nine drug companies from May 2009 to May 2019, with Novo Nordisk on top ending at 28 percent.',
        fromDeck(
          'The title is not "Market share 2009–2019"; it is the claim: "Novo Nordisk remains global diabetes value market leader". The line on top and the 28% label prove it at a glance.',
          'العنوان ليس "الحصة السوقية 2009–2019"؛ بل هو الادعاء: "Novo Nordisk تبقى رائدة سوق السكري العالمي من حيث القيمة". والخط في الأعلى وتسمية 28% يثبتانه بنظرة.',
          'عنوان «سهم بازار ۲۰۰۹–۲۰۱۹» نیست؛ خودِ ادعاست: «Novo Nordisk همچنان پیشتاز ارزشی بازار جهانی دیابت است». خط بالایی و برچسب ۲۸٪ با یک نگاه ثابتش می‌کنند.',
        ),
      ),
      analogy(
        '<p>A road sign says "Exit 12: Airport", not "Information about roads". A chart title should be a sign too: it tells the reader where to look and what to conclude. Write it as a short sentence with a verb: <em>"Tasting Saturdays sell about 9.5 more jars."</em></p>',
        '<p>تقول لافتة الطريق "المخرج 12: المطار"، لا "معلومات عن الطرق". ويجب أن يكون عنوان المخطط لافتة أيضًا: يخبر القارئ أين ينظر وماذا يستنتج. اكتبه جملة قصيرة بفعل: <em>"أيام السبت بالتذوق تبيع نحو 9.5 برطمانات أكثر."</em></p>',
        '<p>تابلوی جاده می‌گوید «خروجی ۱۲: فرودگاه»، نه «اطلاعاتی دربارهٔ جاده‌ها». عنوان نمودار هم باید یک تابلو باشد: به خواننده می‌گوید کجا را ببیند و چه نتیجه بگیرد. آن را یک جملهٔ کوتاه با فعل بنویس: <em>«شنبه‌های مزه‌کردن حدود ۹٫۵ شیشه بیشتر می‌فروشند.»</em></p>',
      ),
      figure(
        10,
        W('Clear, readable and not misleading', 'واضح ومقروء وغير مضلل', 'روشن، خوانا و بدون گمراه‌کنندگی'),
        '/figures/week-08/deck-09-clear-charts.jpg',
        'Slide from the original lesson with four pairs of charts: data-to-ink ratio (a line chart with heavy gridlines next to a clean one), data density (a bar chart of three numbers next to a small table), avoid optical illusions (a 3D bar chart next to a flat one), and annotate and emphasize (a plain bar chart of GDP next to a sorted one with a world-average line).',
        fromDeck(
          'Four habits: remove ink that carries no data; use a small table when there are only a few numbers; avoid 3D, which distorts sizes; sort and annotate so the takeaway stands out.',
          'أربع عادات: احذف الحبر الذي لا يحمل بيانات؛ استخدم جدولًا صغيرًا حين تكون الأرقام قليلة؛ تجنب الأبعاد الثلاثية التي تشوّه الأحجام؛ رتّب وعلّق كي تبرز الخلاصة.',
          'چهار عادت: جوهری را که داده‌ای حمل نمی‌کند حذف کن؛ وقتی فقط چند عدد داری از یک جدول کوچک استفاده کن؛ از سه‌بعدی که اندازه‌ها را کج نشان می‌دهد پرهیز کن؛ مرتب کن و توضیح بنویس تا نتیجه برجسته شود.',
        ),
      ),
      box(
        'keypoint',
        W('Five rules, with where they come from', 'خمس قواعد ومن أين جاءت', 'پنج قاعده و اینکه از کجا آمده‌اند'),
        '<ol><li><strong>Title = takeaway.</strong> One chart, one message (the lesson; the "action title" habit of consultants).</li><li><strong>Remove ink that carries no data:</strong> heavy gridlines, borders, shadows, 3D. Edward Tufte called the share of ink that shows data the <em>data-ink ratio</em>; keep it high.</li><li><strong>Declutter, then focus:</strong> grey for the context, one strong colour for the thing you want people to see (Cole Nussbaumer Knaflic, <em>Storytelling with Data</em>).</li><li><strong>Bars start at zero.</strong> A bar\'s length is its value. In a 2020 study (Correll, Bertini and Franconeri), people judged differences as bigger on bar charts whose axis did not start at zero, even when the axis was clearly labelled.</li><li><strong>Tell the audience</strong> what each axis shows, what each colour or line means, and what the takeaway is.</li></ol>',
        '<ol><li><strong>العنوان = الخلاصة.</strong> مخطط واحد، رسالة واحدة (الدرس؛ وعادة "عنوان الفعل" لدى المستشارين).</li><li><strong>احذف الحبر الذي لا يحمل بيانات:</strong> خطوط الشبكة الثقيلة، والإطارات، والظلال، والأبعاد الثلاثية. سمّى إدوارد تافتي نسبة الحبر الذي يعرض البيانات <em>نسبة حبر البيانات</em>؛ أبقها عالية.</li><li><strong>أزل الفوضى ثم ركّز:</strong> الرمادي للسياق، ولون واحد قوي لما تريد أن يراه الناس (كول نوسباومر نافليك، <em>Storytelling with Data</em>).</li><li><strong>تبدأ الأعمدة من الصفر.</strong> طول العمود هو قيمته. في دراسة عام 2020 (Correll وBertini وFranconeri) حكم الناس بأن الفروق أكبر في مخططات الأعمدة التي لا يبدأ محورها من الصفر، حتى حين كان المحور معنونًا بوضوح.</li><li><strong>أخبر الجمهور</strong> ماذا يعرض كل محور، وماذا يعني كل لون أو خط، وما الخلاصة.</li></ol>',
        '<ol><li><strong>عنوان = نتیجه.</strong> یک نمودار، یک پیام (درس؛ و عادت «عنوان اقدام» مشاوران).</li><li><strong>جوهری را که داده حمل نمی‌کند حذف کن:</strong> خطوط شبکهٔ پررنگ، کادرها، سایه‌ها، سه‌بعدی. ادوارد تافتی سهم جوهری را که داده نشان می‌دهد <em>نسبت جوهر-داده</em> نامید؛ بالا نگهش دار.</li><li><strong>اول شلوغی را کم کن، بعد تمرکز بده:</strong> خاکستری برای زمینه، یک رنگ قوی برای چیزی که می‌خواهی دیده شود (کول نوسباومر نافلیک، <em>Storytelling with Data</em>).</li><li><strong>میله‌ها از صفر شروع می‌شوند.</strong> طول میله همان مقدارش است. در پژوهشی در ۲۰۲۰ (Correll، Bertini و Franconeri) مردم فاصله‌ها را در نمودارهای میله‌ای که محورشان از صفر شروع نمی‌شد بزرگ‌تر قضاوت کردند، حتی وقتی محور به‌روشنی برچسب داشت.</li><li><strong>به مخاطب بگو</strong> هر محور چه نشان می‌دهد، هر رنگ یا خط چه معنایی دارد و نتیجه چیست.</li></ol>',
      ),
      figure(
        11,
        W('Same numbers, two stories', 'الأرقام نفسها، قصتان', 'همان عددها، دو داستان'),
        '/figures/week-08/diagram-02-axis.svg',
        'The same two averages drawn twice: 55.4 jars without tasting and 64.9 with tasting. On the left the axis starts at 50 and the tasting bar looks almost three times as tall. On the right the axis starts at zero and the tasting bar is honestly about 17 percent taller.',
        W(
          'Left: starting at 50 makes 9.5 more jars look like almost three times as many. Right: from zero, tasting is about 17% more, which is the honest picture.',
          'يسارًا: البدء من 50 يجعل 9.5 برطمانات إضافية تبدو كأنها نحو ثلاثة أضعاف. يمينًا: من الصفر، التذوق أكثر بنحو 17%، وهذه هي الصورة الصادقة.',
          'چپ: شروع از ۵۰ باعث می‌شود ۹٫۵ شیشهٔ بیشتر تقریباً سه برابر به نظر برسد. راست: از صفر، مزه‌کردن حدود ۱۷٪ بیشتر است که تصویر صادقانه است.',
        ),
      ),
      {
        type: 'tabs',
        tabs: [
          {
            label: W('Excel', 'Excel', 'Excel'),
            blocks: [
              html(
                '<ol><li>Put the two averages in two cells (55.4 and 64.9) with labels "No tasting" and "Tasting".</li><li><strong>Insert ▸ Column chart</strong> (2-D, never 3-D).</li><li>Right-click the vertical axis ▸ <strong>Format Axis</strong> ▸ Minimum = <strong>0</strong>.</li><li>Click the chart title and type the takeaway: <em>Tasting Saturdays sell about 9.5 more jars</em>.</li><li>Add data labels (Chart Elements ▸ Data Labels); delete the gridlines and the legend.</li><li>Colour the "Tasting" bar strongly and the other grey.</li></ol>',
                '<ol><li>ضع المتوسطين في خليتين (55.4 و64.9) مع التسميتين "No tasting" و"Tasting".</li><li><strong>Insert ▸ Column chart</strong> (ثنائي الأبعاد، لا ثلاثي أبدًا).</li><li>انقر بالزر الأيمن على المحور العمودي ▸ <strong>Format Axis</strong> ▸ Minimum = <strong>0</strong>.</li><li>انقر عنوان المخطط واكتب الخلاصة: <em>Tasting Saturdays sell about 9.5 more jars</em>.</li><li>أضف تسميات البيانات (Chart Elements ▸ Data Labels)؛ واحذف خطوط الشبكة والمفتاح.</li><li>لوّن عمود "Tasting" بلون قوي والآخر بالرمادي.</li></ol>',
                '<ol><li>دو میانگین را در دو خانه بگذار (۵۵٫۴ و ۶۴٫۹) با برچسب‌های «No tasting» و «Tasting».</li><li><strong>Insert ▸ Column chart</strong> (دوبعدی، هرگز سه‌بعدی).</li><li>روی محور عمودی راست‌کلیک ▸ <strong>Format Axis</strong> ▸ Minimum = <strong>0</strong>.</li><li>روی عنوان نمودار کلیک کن و نتیجه را بنویس: <em>Tasting Saturdays sell about 9.5 more jars</em>.</li><li>برچسب داده اضافه کن (Chart Elements ▸ Data Labels)؛ خطوط شبکه و راهنما را پاک کن.</li><li>میلهٔ «Tasting» را پررنگ و دیگری را خاکستری کن.</li></ol>',
              ),
            ],
          },
          { label: W('Python (Colab)', 'Python ‏(Colab)', 'Python ‏(Colab)'), blocks: [code(py.chart)] },
        ],
      },
      figure(
        12,
        W('Charts that show more than numbers', 'رسوم تعرض أكثر من الأرقام', 'نمودارهایی که بیش از عدد نشان می‌دهند'),
        '/figures/week-08/deck-10-chart-types.jpg',
        'Slide from the original lesson with examples of an organization structure chart, a process or workflow diagram, a Venn diagram, a Gantt chart timeline and a supply chain diagram.',
        fromDeck(
          'Not every chart needs numbers. An org chart shows who reports to whom, a process diagram shows the steps, a Gantt chart shows a timeline, a Venn diagram shows overlap. For the jam stand: a Gantt chart of next season\'s plan, or a process diagram from fruit to jar.',
          'ليست كل الرسوم بحاجة إلى أرقام. المخطط التنظيمي يُظهر من يتبع من، ومخطط العملية يُظهر الخطوات، ومخطط Gantt يُظهر جدولًا زمنيًا، ومخطط Venn يُظهر التداخل. لكشك المربى: مخطط Gantt لخطة الموسم القادم، أو مخطط عملية من الفاكهة إلى البرطمان.',
          'هر نموداری عدد لازم ندارد. نمودار سازمانی نشان می‌دهد چه کسی به چه کسی گزارش می‌دهد، نمودار فرایند گام‌ها را، نمودار گانت یک جدول زمانی را، و نمودار ون هم‌پوشانی را. برای غرفهٔ مربا: نمودار گانت برنامهٔ فصل بعد، یا نمودار فرایند از میوه تا شیشه.',
        ),
      ),
      recap(
        W('Title = the takeaway, as a sentence.', 'العنوان = الخلاصة، في جملة.', 'عنوان = نتیجه، به‌صورت یک جمله.'),
        W('Remove clutter, highlight one thing, never 3D.', 'أزل الفوضى، أبرز شيئًا واحدًا، ولا أبعاد ثلاثية أبدًا.', 'شلوغی را حذف کن، یک چیز را برجسته کن، هرگز سه‌بعدی.'),
        W('Bar charts start at zero.', 'مخططات الأعمدة تبدأ من الصفر.', 'نمودارهای میله‌ای از صفر شروع می‌شوند.'),
      ),
      exercise('w08-q012'),
      exercise('w08-q013'),
    ],
  },
  // ---------- 11. Tips and the AI corner ----------
  {
    id: 'tips-ai',
    navLabel: W('Tips and AI corner', 'نصائح وركن الذكاء الاصطناعي', 'نکته‌ها و گوشهٔ هوش مصنوعی'),
    sectionLabel: W('Section 11', 'القسم ١١', 'بخش ۱۱'),
    timeEst: W('6 min', '٦ دقائق', '۶ دقیقه'),
    headingHtml: t(
      '<h2>Tips for telling it, and an AI co-pilot</h2><p class="standfirst">Six habits from the lesson make any report or talk clearer. An AI assistant can draft the words, but you check the numbers.</p>',
      '<h2>نصائح لرواية النتيجة، ومساعد ذكاء اصطناعي</h2><p class="standfirst">ست عادات من الدرس تجعل أي تقرير أو عرض أوضح. يستطيع مساعد الذكاء الاصطناعي صياغة الكلمات، لكنك أنت من يفحص الأرقام.</p>',
      '<h2>نکته‌هایی برای تعریف کردن، و یک کمک‌خلبان هوش مصنوعی</h2><p class="standfirst">شش عادت از درس هر گزارش یا ارائه‌ای را روشن‌تر می‌کند. دستیار هوش مصنوعی می‌تواند واژه‌ها را پیش‌نویس کند، اما عددها را تو بررسی می‌کنی.</p>',
    ),
    blocks: [
      {
        type: 'table',
        headers: [W('Tip (from the lesson)', 'النصيحة (من الدرس)', 'نکته (از درس)'), W('Jam stand example', 'مثال من كشك المربى', 'مثال غرفهٔ مربا')],
        rows: [
          [W('The order you did things is rarely the best order to tell them', 'الترتيب الذي عملت به نادرًا ما يكون أفضل ترتيب للرواية', 'ترتیبی که کار کردی به‌ندرت بهترین ترتیب برای تعریف کردن است'), W('Start with "tasting sells more", not with "first we cleaned the CSV"', 'ابدأ بـ "التذوق يبيع أكثر"، لا بـ "أولًا نظفنا ملف CSV"', 'با «مزه‌کردن بیشتر می‌فروشد» شروع کن، نه با «اول CSV را تمیز کردیم»')],
          [W('Tailor it to your audience', 'كيّفها مع جمهورك', 'آن را با مخاطبت تنظیم کن'), W('The owner wants the decision and the cost; a classmate may want the method', 'يريد المالك القرار والتكلفة؛ وقد يريد زميل الطريقة', 'صاحب غرفه تصمیم و هزینه را می‌خواهد؛ هم‌کلاسی شاید روش را بخواهد')],
          [W('Give numbers context', 'أعطِ الأرقام سياقًا', 'به عددها زمینه بده'), W('"64.9 jars" means little; "64.9 vs 55.4, about 17% more" means a lot', '"64.9 برطمانًا" لا تعني الكثير؛ و"64.9 مقابل 55.4، أكثر بنحو 17%" تعني الكثير', '«۶۴٫۹ شیشه» معنای زیادی ندارد؛ «۶۴٫۹ در برابر ۵۵٫۴، حدود ۱۷٪ بیشتر» خیلی معنا دارد')],
          [W('Avoid acronyms and jargon', 'تجنب الاختصارات والمصطلحات', 'از سرواژه و اصطلاح تخصصی پرهیز کن'), W('Say "luck alone would do this about 1 time in 100", not just "p = 0.010"', 'قل "الحظ وحده يفعل هذا نحو مرة من كل 100"، لا "p = 0.010" فقط', 'بگو «شانس تنها حدود ۱ بار در ۱۰۰ این را می‌دهد»، نه فقط «p = ۰٫۰۱۰»')],
          [W('Expect questions at any point', 'توقع الأسئلة في أي لحظة', 'هر لحظه منتظر سؤال باش'), W('Keep an appendix slide with the regression table and the test', 'احتفظ بشريحة ملحقة فيها جدول الانحدار والاختبار', 'یک اسلاید پیوست با جدول رگرسیون و آزمون آماده داشته باش')],
          [W('Pick the tool for the format', 'اختر الأداة حسب الشكل', 'ابزار را بر اساس قالب انتخاب کن'), W('Slides: PowerPoint, Keynote, Google Slides. Documents: Word, Google Docs, InDesign, Canva', 'الشرائح: PowerPoint وKeynote وGoogle Slides. الوثائق: Word وGoogle Docs وInDesign وCanva', 'اسلاید: PowerPoint، Keynote، Google Slides. سند: Word، Google Docs، InDesign، Canva')],
        ],
      },
      {
        type: 'tabs',
        tabs: [
          {
            label: W('What can go wrong', 'ما الذي قد يسوء', 'چه چیزی ممکن است خراب شود'),
            blocks: [
              html(
                '<p>Ask an AI assistant "write a summary of my jam stand results" and you may get: "Tasting <em>proves</em> a <em>25%</em> increase in sales and should be rolled out to <em>all markets</em>." Three problems: "proves" is too strong, the 25% is not in your data (it is about 17%), and you only studied one market.</p>',
                '<p>اطلب من مساعد ذكاء اصطناعي "اكتب ملخصًا لنتائج كشك المربى" فقد تحصل على: "التذوق <em>يثبت</em> زيادة في المبيعات بنسبة <em>25%</em> ويجب تعميمه على <em>كل الأسواق</em>." ثلاث مشكلات: "يثبت" قوية جدًا، و25% ليست في بياناتك (إنها نحو 17%)، وأنت درست سوقًا واحدًا فقط.</p>',
                '<p>از یک دستیار هوش مصنوعی بخواه «خلاصه‌ای از نتایج غرفهٔ مربا بنویس» و شاید این را بگیری: «مزه‌کردن افزایش <em>۲۵٪</em> فروش را <em>ثابت می‌کند</em> و باید در <em>همهٔ بازارها</em> اجرا شود.» سه مشکل: «ثابت می‌کند» خیلی قوی است، ۲۵٪ در دادهٔ تو نیست (حدود ۱۷٪ است) و تو فقط یک بازار را بررسی کردی.</p>',
              ),
            ],
          },
          {
            label: W('A better prompt', 'طلب أفضل', 'یک درخواست بهتر'),
            blocks: [
              code(`Here are my results (do not add any numbers I have not given you):
- 20 Saturdays at one market, April-August 2024; tasting on every other Saturday
- Tasting Saturdays: 64.9 jars on average; other Saturdays: 55.4 (one-tailed t-test p = 0.010)
- Buyers per visitor: 30.8% with tasting, 27.1% without (p = 0.013)
- Regression: jars = -26.26 + 0.58 x visitors + 6.24 x tasting, R-squared 0.71
Write a 4-sentence executive summary for the stand owner, answer first.
Use plain words, say how big the effect is, do not say "proves", and add one sentence on the limits.`),
            ],
          },
        ],
      },
      box(
        'keypoint',
        W('Your job, not the AI\'s', 'مهمتك أنت، لا مهمة الذكاء الاصطناعي', 'کار تو، نه کار هوش مصنوعی'),
        '<p>Check every number in the draft against your own file, delete any claim the data does not cover, and keep the limits sentence. If a number appears that you did not give it, treat it as wrong until you find it yourself.</p>',
        '<p>طابق كل رقم في المسودة مع ملفك، واحذف أي ادعاء لا تغطيه البيانات، واحتفظ بجملة الحدود. وإن ظهر رقم لم تعطه إياه، فاعتبره خاطئًا حتى تجده بنفسك.</p>',
        '<p>هر عدد پیش‌نویس را با فایل خودت مقایسه کن، هر ادعایی را که داده پوشش نمی‌دهد پاک کن و جملهٔ محدودیت‌ها را نگه دار. اگر عددی آمد که تو نداده بودی، تا خودت پیدایش نکرده‌ای آن را اشتباه بدان.</p>',
      ),
    ],
  },
  // ---------- 12. Worked example ----------
  {
    id: 'worked-example',
    navLabel: W('Worked example: one-page report', 'مثال محلول: تقرير من صفحة', 'مثال حل‌شده: گزارش یک‌صفحه‌ای'),
    sectionLabel: W('Section 12', 'القسم ١٢', 'بخش ۱۲'),
    timeEst: W('10 min', '١٠ دقائق', '۱۰ دقیقه'),
    headingHtml: t(
      '<h2>Worked example: the jam stand\'s one-page report and five slides</h2><p class="standfirst">Everything from Weeks 4–8 on one page: answer first, then the evidence, the limits and the next step. This is the format your project report can follow.</p>',
      '<h2>مثال محلول: تقرير كشك المربى من صفحة واحدة وخمس شرائح</h2><p class="standfirst">كل شيء من الأسابيع 4–8 في صفحة واحدة: الإجابة أولًا، ثم الدليل، ثم الحدود والخطوة التالية. هذا هو الشكل الذي يمكن أن يتبعه تقرير مشروعك.</p>',
      '<h2>مثال حل‌شده: گزارش یک‌صفحه‌ای غرفهٔ مربا و پنج اسلاید</h2><p class="standfirst">همه‌چیز از هفته‌های ۴ تا ۸ در یک صفحه: اول جواب، بعد شواهد، محدودیت‌ها و گام بعدی. گزارش پروژه‌ات می‌تواند همین قالب را دنبال کند.</p>',
    ),
    blocks: [
      box(
        'example',
        W('Report: should the tasting table stay?', 'التقرير: هل تبقى طاولة التذوق؟', 'گزارش: آیا میز مزه‌کردن بماند؟'),
        '<p><strong>Executive summary.</strong> Put the tasting table out every Saturday. On the 20 Saturdays we tracked, tasting Saturdays sold about <strong>9.5 more jars</strong> (64.9 vs 55.4, about 17% more), and luck alone would give a gap this big only about 1 time in 100.</p><p><strong>Introduction.</strong> The owner tried a free tasting table on every other Saturday from April to August 2024 and asked whether it is worth the effort.</p><p><strong>Findings.</strong> (1) More jars: 64.9 vs 55.4 a Saturday (one-tailed t-test, p = 0.010). (2) More visitors became buyers: 30.8% vs 27.1% (p = 0.013). (3) Even comparing Saturdays with the same number of visitors, tasting adds about 6 jars (regression: +6.24 jars; visitors and tasting together explain 71% of the ups and downs).</p><p><strong>Limits.</strong> One market, 20 summer Saturdays; the average could be about 2 jars off (standard error 2.12); visitors were counted by hand.</p><p><strong>Recommendation and next steps.</strong> Keep tasting every Saturday this summer; from September, alternate again for 10 Saturdays to check it also works in autumn.</p><p><strong>Appendix.</strong> The data file, the regression table, the test output, and the cleaning log from Week 5.</p>',
        '<p><strong>الملخص التنفيذي.</strong> ضعوا طاولة التذوق كل سبت. في أيام السبت العشرين التي تابعناها، باعت أيام التذوق نحو <strong>9.5 برطمانات أكثر</strong> (64.9 مقابل 55.4، أكثر بنحو 17%)، ولا يعطي الحظ وحده فرقًا بهذا الحجم إلا نحو مرة من كل 100.</p><p><strong>المقدمة.</strong> جرّب المالك طاولة تذوق مجانية كل سبتين من أبريل إلى أغسطس 2024 وسأل إن كانت تستحق الجهد.</p><p><strong>النتائج.</strong> (1) برطمانات أكثر: 64.9 مقابل 55.4 كل سبت (اختبار t بذيل واحد، p = 0.010). (2) صار زوار أكثر مشترين: 30.8% مقابل 27.1% (p = 0.013). (3) حتى عند مقارنة أيام سبت بعدد الزوار نفسه، يضيف التذوق نحو 6 برطمانات (الانحدار: +6.24 برطمان؛ الزوار والتذوق معًا يفسّران 71% من الصعود والهبوط).</p><p><strong>الحدود.</strong> سوق واحد، 20 سبتًا صيفيًا؛ قد يبتعد المتوسط بنحو برطمانين (الخطأ المعياري 2.12)؛ وعُدّ الزوار يدويًا.</p><p><strong>التوصية والخطوات التالية.</strong> استمروا في التذوق كل سبت هذا الصيف؛ ومن سبتمبر بدّلوا مجددًا لعشرة أيام سبت للتحقق من أنه ينجح في الخريف أيضًا.</p><p><strong>الملحق.</strong> ملف البيانات، وجدول الانحدار، ونتيجة الاختبار، وسجل التنظيف من الأسبوع 5.</p>',
        '<p><strong>خلاصهٔ مدیریتی.</strong> میز مزه‌کردن را هر شنبه بگذارید. در ۲۰ شنبه‌ای که دنبال کردیم، شنبه‌های مزه‌کردن حدود <strong>۹٫۵ شیشه بیشتر</strong> فروختند (۶۴٫۹ در برابر ۵۵٫۴، حدود ۱۷٪ بیشتر)، و شانس تنها فقط حدود ۱ بار در ۱۰۰ چنین فاصله‌ای می‌دهد.</p><p><strong>مقدمه.</strong> صاحب غرفه از آوریل تا اوت ۲۰۲۴ یک شنبه در میان میز مزه‌کردن رایگان گذاشت و پرسید آیا ارزش زحمتش را دارد.</p><p><strong>یافته‌ها.</strong> (۱) شیشهٔ بیشتر: ۶۴٫۹ در برابر ۵۵٫۴ در هر شنبه (آزمون t یک‌دنباله، p = ۰٫۰۱۰). (۲) بازدیدکنندهٔ بیشتری خریدار شد: ۳۰٫۸٪ در برابر ۲۷٫۱٪ (p = ۰٫۰۱۳). (۳) حتی با مقایسهٔ شنبه‌هایی با تعداد بازدیدکنندهٔ یکسان، مزه‌کردن حدود ۶ شیشه اضافه می‌کند (رگرسیون: ‎+۶٫۲۴ شیشه؛ بازدیدکننده و مزه‌کردن با هم ۷۱٪ بالا و پایین‌ها را توضیح می‌دهند).</p><p><strong>محدودیت‌ها.</strong> یک بازار، ۲۰ شنبهٔ تابستانی؛ میانگین ممکن است حدود ۲ شیشه خطا داشته باشد (خطای معیار ۲٫۱۲)؛ بازدیدکننده‌ها با دست شمرده شدند.</p><p><strong>توصیه و گام‌های بعدی.</strong> این تابستان هر شنبه مزه‌کردن را ادامه دهید؛ از سپتامبر دوباره ۱۰ شنبه یکی‌درمیان کنید تا ببینید در پاییز هم جواب می‌دهد.</p><p><strong>پیوست.</strong> فایل داده، جدول رگرسیون، خروجی آزمون، و گزارش پاک‌سازی هفتهٔ ۵.</p>',
      ),
      {
        type: 'table',
        headers: [W('Slide', 'الشريحة', 'اسلاید'), W('Title (the takeaway)', 'العنوان (الخلاصة)', 'عنوان (نتیجه)'), W('On the slide', 'على الشريحة', 'روی اسلاید')],
        rows: [
          [W('1', '1', '۱'), W('A tasting table sells about 10 more jars a Saturday', 'طاولة التذوق تبيع نحو 10 برطمانات أكثر كل سبت', 'میز مزه‌کردن هر شنبه حدود ۱۰ شیشه بیشتر می‌فروشد'), W('A photo of the stand; the question in one line', 'صورة للكشك؛ والسؤال في سطر واحد', 'عکس غرفه؛ پرسش در یک خط')],
          [W('2', '2', '۲'), W('We compared 10 tasting and 10 normal Saturdays', 'قارنّا 10 أيام سبت بالتذوق و10 عادية', '۱۰ شنبهٔ مزه‌کردن و ۱۰ شنبهٔ عادی را مقایسه کردیم'), W('How the data was collected; every other Saturday, April–August', 'كيف جُمعت البيانات؛ كل سبتين، أبريل–أغسطس', 'داده چطور جمع شد؛ یک شنبه در میان، آوریل تا اوت')],
          [W('3', '3', '۳'), W('Tasting Saturdays sell about 9.5 more jars', 'أيام السبت بالتذوق تبيع نحو 9.5 برطمانات أكثر', 'شنبه‌های مزه‌کردن حدود ۹٫۵ شیشه بیشتر می‌فروشند'), W('The bar chart from zero (Section 10)', 'مخطط الأعمدة من الصفر (القسم 10)', 'نمودار میله‌ای از صفر (بخش ۱۰)')],
          [W('4', '4', '۴'), W('The gap is very unlikely to be luck', 'الفرق بعيد جدًا عن أن يكون حظًا', 'این فاصله به احتمال بسیار زیاد شانس نیست'), W('"Luck alone: about 1 time in 100"; more visitors became buyers', '"الحظ وحده: نحو مرة من كل 100"؛ وصار زوار أكثر مشترين', '«شانس تنها: حدود ۱ بار در ۱۰۰»؛ بازدیدکنندهٔ بیشتری خریدار شد')],
          [W('5', '5', '۵'), W('Keep tasting, and check again in autumn', 'استمروا في التذوق، وتحققوا مجددًا في الخريف', 'مزه‌کردن را ادامه دهید و در پاییز دوباره بررسی کنید'), W('The recommendation, the limits, the next step', 'التوصية، والحدود، والخطوة التالية', 'توصیه، محدودیت‌ها، گام بعدی')],
        ],
      },
      html(
        `<p><strong>Prefer a ready-made file?</strong> All of this week's Python is also a notebook: <a href="${notebookUrl}" target="_blank" rel="noopener">open it in Colab</a>, then <em>Runtime ▸ Run all</em>.</p>`,
        `<p><strong>تفضّل ملفًا جاهزًا؟</strong> كل كود Python لهذا الأسبوع موجود أيضًا في دفتر: <a href="${notebookUrl}" target="_blank" rel="noopener">افتحه في Colab</a>، ثم <em>Runtime ▸ Run all</em>.</p>`,
        `<p><strong>فایل آماده می‌خواهی؟</strong> همهٔ Python این هفته در یک نوت‌بوک هم هست: <a href="${notebookUrl}" target="_blank" rel="noopener">آن را در Colab باز کن</a>، بعد <em>Runtime ▸ Run all</em>.</p>`,
      ),
    ],
  },
  // ---------- 13. Common mistakes ----------
  {
    id: 'common-mistakes',
    navLabel: W('Common mistakes', 'أخطاء شائعة', 'اشتباه‌های رایج'),
    sectionLabel: W('Section 13', 'القسم ١٣', 'بخش ۱۳'),
    timeEst: W('4 min', '٤ دقائق', '۴ دقیقه'),
    headingHtml: t(
      '<h2>Common mistakes</h2><p class="standfirst">Each one makes a good analysis less useful or less honest.</p>',
      '<h2>أخطاء شائعة</h2><p class="standfirst">كل واحد منها يجعل التحليل الجيد أقل فائدة أو أقل صدقًا.</p>',
      '<h2>اشتباه‌های رایج</h2><p class="standfirst">هر کدام یک تحلیل خوب را کم‌فایده‌تر یا کم‌صداقت‌تر می‌کند.</p>',
    ),
    blocks: [
      {
        type: 'table',
        headers: [W('Mistake', 'الخطأ', 'اشتباه'), W('Why it hurts', 'لماذا يضر', 'چرا آسیب می‌زند'), W('Instead', 'بدلًا من ذلك', 'به‌جایش')],
        rows: [
          [W('Telling the story in the order you did the work', 'رواية القصة بترتيب العمل', 'تعریف داستان به ترتیبی که کار کردی'), W('The answer is hidden on page 5', 'الإجابة مخبأة في الصفحة 5', 'جواب در صفحهٔ ۵ پنهان می‌ماند'), W('Answer first, then the evidence', 'الإجابة أولًا، ثم الدليل', 'اول جواب، بعد شواهد')],
          [W('A chart title like "Jars by tasting"', 'عنوان مخطط مثل "البرطمانات حسب التذوق"', 'عنوان نموداری مثل «شیشه‌ها بر اساس مزه‌کردن»'), W('The reader has to guess the point', 'على القارئ أن يخمّن الفكرة', 'خواننده باید نکته را حدس بزند'), W('Write the takeaway as the title', 'اكتب الخلاصة عنوانًا', 'نتیجه را عنوان کن')],
          [W('Bar axis not starting at zero; 3D charts', 'محور أعمدة لا يبدأ من الصفر؛ رسوم ثلاثية الأبعاد', 'محور میله‌ای که از صفر شروع نمی‌شود؛ نمودار سه‌بعدی'), W('Differences look bigger or smaller than they are', 'تبدو الفروق أكبر أو أصغر مما هي', 'فاصله‌ها بزرگ‌تر یا کوچک‌تر از واقعیت دیده می‌شوند'), W('Flat 2-D bars from zero', 'أعمدة مسطحة ثنائية الأبعاد من الصفر', 'میله‌های تخت دوبعدی از صفر')],
          [W('Hiding the limits, or saying "proves"', 'إخفاء الحدود، أو قول "يثبت"', 'پنهان کردن محدودیت‌ها، یا گفتن «ثابت می‌کند»'), W('Readers trust it more than they should, and stop trusting you later', 'يثق القراء به أكثر مما ينبغي، ثم يتوقفون عن الوثوق بك لاحقًا', 'خواننده‌ها بیش از اندازه اعتماد می‌کنند و بعداً دیگر به تو اعتماد نمی‌کنند'), W('Scope, a number for how sure, and "enough evidence that…"', 'النطاق، ورقم لدرجة اليقين، و"أدلة كافية على أن…"', 'دامنه، یک عدد برای میزان اطمینان، و «شواهد کافی هست که…»')],
          [W('Reporting only accuracy', 'ذكر الدقة الكلية فقط', 'گزارش فقط صحت کلی'), W('With rare cases, "always no" looks 99% accurate', 'مع الحالات النادرة، "لا دائمًا" تبدو دقيقة بنسبة 99%', 'با حالت‌های نادر، «همیشه نه» ۹۹٪ صحیح به نظر می‌رسد'), W('Also give precision and recall', 'اذكر الدقة والاستدعاء أيضًا', 'دقت و بازیابی را هم بگو')],
          [W('Fixing bias with more of the same data', 'إصلاح التحيز بالمزيد من البيانات نفسها', 'درست کردن سوگیری با بیشترِ همان داده'), W('The lean stays: 2.4 million biased replies were still wrong', 'يبقى الميل: 2.4 مليون رد متحيز ظلت خاطئة', 'تمایل می‌ماند: ۲٫۴ میلیون پاسخ سوگیرانه باز هم اشتباه بود'), W('Reach the groups you missed', 'صِل إلى المجموعات التي فاتتك', 'به گروه‌هایی که جا ماندند برس')],
        ],
      },
      recap(
        W('Answer first, a takeaway title, honest axes.', 'الإجابة أولًا، وعنوان بالخلاصة، ومحاور صادقة.', 'اول جواب، عنوانی با نتیجه، محورهای صادق.'),
        W('Say the limits and how sure you are, with a number.', 'قل الحدود وكم أنت متأكد، برقم.', 'محدودیت‌ها و میزان اطمینانت را با یک عدد بگو.'),
      ),
      exercise('w08-q014'),
    ],
  },
]
