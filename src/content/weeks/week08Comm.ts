// Sections 9-13 of Week 8 (week-08.ts places them): communicating findings, from the original "Week 10" deck
// (pages 25-36 of public/originals/week-08.pdf). Simpler revision: jam stand examples only, short text, one analogy
// per section. The deck's Novo Nordisk chart, clear-charts slide, chart-types slide and presentation slide were
// dropped; the report-structure slide is kept. Outside sources behind the rules: Minto's pyramid principle
// ("answer first"), Tufte's data-ink ratio, Knaflic's Storytelling with Data, and Correll, Bertini and Franconeri,
// "Truncating the Y-Axis: Threat or Menace?" (CHI 2020).
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
      'We tested tasting on 20 summer Saturdays at one market. Which sentence is honest?',
      'اختبرنا التذوق على 20 سبتًا صيفيًا في سوق واحد. أي جملة صادقة؟',
      'مزه‌کردن را روی ۲۰ شنبهٔ تابستانی در یک بازار آزمودیم. کدام جمله صادقانه است؟',
    ),
    options: [
      t('Tasting works at every market, all year round', 'التذوق ينجح في كل سوق طوال العام', 'مزه‌کردن در هر بازاری و تمام سال جواب می‌دهد'),
      t('At this market, in summer, tasting sold more; we will check other seasons', 'في هذا السوق، صيفًا، باع التذوق أكثر؛ وسنتحقق في مواسم أخرى', 'در این بازار، در تابستان، مزه‌کردن بیشتر فروخت؛ فصل‌های دیگر را هم بررسی می‌کنیم'),
      t('The test proves tasting adds exactly 9.5 jars', 'يثبت الاختبار أن التذوق يضيف 9.5 برطمانات بالضبط', 'آزمون ثابت می‌کند مزه‌کردن دقیقاً ۹٫۵ شیشه اضافه می‌کند'),
    ],
  },
]

export const sections: Week['sections'] = [
  // ---------- 9. Report or presentation? ----------
  {
    id: 'report-or-presentation',
    navLabel: W('Report or presentation?', 'تقرير أم عرض؟', 'گزارش یا ارائه؟'),
    sectionLabel: W('Section 09', 'القسم ٠٩', 'بخش ۰۹'),
    timeEst: W('6 min', '٦ دقائق', '۶ دقیقه'),
    headingHtml: t(
      '<h2>Report or presentation? Either way, answer first</h2><p class="standfirst">A <strong>presentation</strong> is you talking, with slides to help. A <strong>report</strong> is a document people read on their own. Both should start with the answer.</p>',
      '<h2>تقرير أم عرض؟ في الحالتين، الإجابة أولًا</h2><p class="standfirst"><strong>العرض</strong> هو أن تتحدث وتساعدك الشرائح. و<strong>التقرير</strong> وثيقة يقرأها الناس وحدهم. كلاهما يجب أن يبدأ بالإجابة.</p>',
      '<h2>گزارش یا ارائه؟ در هر حال، اول جواب</h2><p class="standfirst"><strong>ارائه</strong> یعنی تو حرف می‌زنی و اسلایدها کمک می‌کنند. <strong>گزارش</strong> سندی است که مردم خودشان می‌خوانند. هر دو باید با جواب شروع شوند.</p>',
    ),
    blocks: [
      {
        type: 'table',
        headers: [W('', '', ''), W('Presentation', 'العرض', 'ارائه'), W('Report', 'التقرير', 'گزارش')],
        rows: [
          [W('<strong>Goal</strong>', '<strong>الهدف</strong>', '<strong>هدف</strong>'), W('Get one message across', 'إيصال رسالة واحدة', 'رساندن یک پیام'), W('Give the full story', 'تقديم القصة كاملة', 'دادن کل داستان')],
          [W('<strong>Text</strong>', '<strong>النص</strong>', '<strong>متن</strong>'), W('Very little; big pictures', 'قليل جدًا؛ صور كبيرة', 'خیلی کم؛ تصویرهای بزرگ'), W('Full sentences, all the numbers', 'جمل كاملة، وكل الأرقام', 'جمله‌های کامل، همهٔ عددها')],
          [W('<strong>Order</strong>', '<strong>الترتيب</strong>', '<strong>ترتیب</strong>'), W('Answer → why → what to do', 'الإجابة ← لماذا ← ماذا نفعل', 'جواب ← چرا ← چه کنیم'), W('Summary → intro → findings → recommendation → appendix', 'ملخص ← مقدمة ← نتائج ← توصية ← ملحق', 'خلاصه ← مقدمه ← یافته‌ها ← توصیه ← پیوست')],
        ],
      },
      analogy(
        '<p>A newspaper puts the <strong>headline</strong> first. Most people read only that and the first lines, and still know the news. The owner of the jam stand is the same: busy, so the answer must come first.</p>',
        '<p>تضع الصحيفة <strong>العنوان</strong> أولًا. يقرأ معظم الناس العنوان والسطور الأولى فقط، ويعرفون الخبر مع ذلك. ومالك كشك المربى مثلهم: مشغول، لذا يجب أن تأتي الإجابة أولًا.</p>',
        '<p>روزنامه <strong>تیتر</strong> را اول می‌گذارد. بیشتر مردم فقط تیتر و چند خط اول را می‌خوانند و باز هم خبر را می‌دانند. صاحب غرفهٔ مربا هم همین‌طور است: پرمشغله، پس جواب باید اول بیاید.</p>',
      ),
      box(
        'example',
        W('Answer first, for the jam stand', 'الإجابة أولًا، لكشك المربى', 'اول جواب، برای غرفهٔ مربا'),
        '<p><strong>The answer:</strong> put the tasting table out every Saturday.<br/><strong>Why:</strong> tasting Saturdays sold about 9.5 more jars.<br/><strong>The proof:</strong> luck alone would do that only about 1 time in 100.</p>',
        '<p><strong>الإجابة:</strong> ضعوا طاولة التذوق كل سبت.<br/><strong>لماذا:</strong> باعت أيام التذوق نحو 9.5 برطمانات أكثر.<br/><strong>الدليل:</strong> لا يفعل الحظ وحده ذلك إلا نحو مرة من كل 100.</p>',
        '<p><strong>جواب:</strong> میز مزه‌کردن را هر شنبه بگذارید.<br/><strong>چرا:</strong> شنبه‌های مزه‌کردن حدود ۹٫۵ شیشه بیشتر فروختند.<br/><strong>دلیل:</strong> شانس تنها فقط حدود ۱ بار در ۱۰۰ چنین کاری می‌کند.</p>',
      ),
      figure(
        6,
        W('The parts of a business report', 'أجزاء تقرير العمل', 'بخش‌های گزارش کسب‌وکار'),
        '/figures/week-08/deck-06-report.jpg',
        'Slide from the original lesson: a sample project status report next to the five parts of a business report: 1 executive summary, 2 introduction, 3 main body with results and supporting evidence, 4 conclusion with recommendations and next steps, 5 appendices.',
        fromDeck(
          'Five parts: the summary (the answer), the introduction (why we looked), the findings (with charts), the recommendation (what to do), the appendix (extra details).',
          'خمسة أجزاء: الملخص (الإجابة)، والمقدمة (لماذا بحثنا)، والنتائج (مع الرسوم)، والتوصية (ماذا نفعل)، والملحق (تفاصيل إضافية).',
          'پنج بخش: خلاصه (جواب)، مقدمه (چرا بررسی کردیم)، یافته‌ها (با نمودار)، توصیه (چه کنیم)، پیوست (جزئیات بیشتر).',
        ),
      ),
      recap(
        W('Presentation: one message, little text. Report: the full story.', 'العرض: رسالة واحدة، نص قليل. التقرير: القصة كاملة.', 'ارائه: یک پیام، متن کم. گزارش: کل داستان.'),
        W('Both: the answer, then why, then the proof.', 'كلاهما: الإجابة، ثم لماذا، ثم الدليل.', 'هر دو: جواب، بعد چرا، بعد دلیل.'),
      ),
      exercise('w08-q011'),
    ],
  },
  // ---------- 10. Charts that tell ----------
  {
    id: 'charts',
    navLabel: W('Charts that tell', 'رسوم تحكي', 'نمودارهایی که می‌گویند'),
    sectionLabel: W('Section 10', 'القسم ١٠', 'بخش ۱۰'),
    timeEst: W('10 min', '١٠ دقائق', '۱۰ دقیقه'),
    headingHtml: t(
      '<h2>Charts that tell: one chart, one message</h2><p class="standfirst">A chart in a report or a talk should say one thing, clearly and honestly. Four rules get you there.</p>',
      '<h2>رسوم تحكي: مخطط واحد، رسالة واحدة</h2><p class="standfirst">المخطط في التقرير أو العرض يجب أن يقول شيئًا واحدًا، بوضوح وصدق. أربع قواعد توصلك إلى ذلك.</p>',
      '<h2>نمودارهایی که می‌گویند: یک نمودار، یک پیام</h2><p class="standfirst">نمودار در گزارش یا ارائه باید یک چیز را روشن و صادقانه بگوید. چهار قاعده تو را به آنجا می‌رساند.</p>',
    ),
    blocks: [
      analogy(
        '<p>A road sign says "Exit 12: Airport", not "Information about roads". A chart title should work like a sign: it tells people what to see. Write it as a short sentence: <em>"Tasting Saturdays sell about 9.5 more jars."</em></p>',
        '<p>تقول لافتة الطريق "المخرج 12: المطار"، لا "معلومات عن الطرق". يجب أن يعمل عنوان المخطط مثل اللافتة: يخبر الناس ماذا يرون. اكتبه جملة قصيرة: <em>"أيام السبت بالتذوق تبيع نحو 9.5 برطمانات أكثر."</em></p>',
        '<p>تابلوی جاده می‌گوید «خروجی ۱۲: فرودگاه»، نه «اطلاعاتی دربارهٔ جاده‌ها». عنوان نمودار باید مثل تابلو کار کند: به مردم می‌گوید چه ببینند. آن را یک جملهٔ کوتاه بنویس: <em>«شنبه‌های مزه‌کردن حدود ۹٫۵ شیشه بیشتر می‌فروشند.»</em></p>',
      ),
      box(
        'keypoint',
        W('Four rules', 'أربع قواعد', 'چهار قاعده'),
        '<ol><li><strong>The title says the takeaway</strong>, as a sentence, not a topic.</li><li><strong>Remove clutter:</strong> no 3D, no heavy gridlines; grey for the rest and one strong colour for what matters.</li><li><strong>Bars start at zero.</strong> Otherwise small gaps look huge (a 2020 study found people are fooled even when the axis is labelled).</li><li><strong>Say what it shows:</strong> what each axis and each colour means.</li></ol>',
        '<ol><li><strong>العنوان يقول الخلاصة</strong>، جملةً لا موضوعًا.</li><li><strong>أزل الفوضى:</strong> لا أبعاد ثلاثية، ولا خطوط شبكة ثقيلة؛ رمادي للباقي ولون واحد قوي لما يهم.</li><li><strong>تبدأ الأعمدة من الصفر.</strong> وإلا تبدو الفروق الصغيرة ضخمة (وجدت دراسة في 2020 أن الناس ينخدعون حتى حين يكون المحور معنونًا).</li><li><strong>قل ماذا يُظهر:</strong> ماذا يعني كل محور وكل لون.</li></ol>',
        '<ol><li><strong>عنوان نتیجه را می‌گوید</strong>، به‌صورت جمله، نه موضوع.</li><li><strong>شلوغی را حذف کن:</strong> نه سه‌بعدی، نه خطوط شبکهٔ پررنگ؛ خاکستری برای بقیه و یک رنگ قوی برای چیزی که مهم است.</li><li><strong>میله‌ها از صفر شروع می‌شوند.</strong> وگرنه فاصله‌های کوچک بزرگ دیده می‌شوند (پژوهشی در ۲۰۲۰ نشان داد مردم حتی وقتی محور برچسب دارد فریب می‌خورند).</li><li><strong>بگو چه نشان می‌دهد:</strong> هر محور و هر رنگ چه معنایی دارد.</li></ol>',
      ),
      figure(
        7,
        W('Same numbers, two stories', 'الأرقام نفسها، قصتان', 'همان عددها، دو داستان'),
        '/figures/week-08/diagram-02-axis.svg',
        'The same two averages drawn twice: 55.4 jars without tasting and 64.9 with tasting. On the left the axis starts at 50 and the tasting bar looks almost three times as tall. On the right the axis starts at zero and the tasting bar is honestly about 17 percent taller.',
        W(
          'Left: starting at 50 makes 9.5 more jars look like almost three times as many. Right: from zero, tasting is about 17% more. That is the honest picture.',
          'يسارًا: البدء من 50 يجعل 9.5 برطمانات إضافية تبدو كأنها نحو ثلاثة أضعاف. يمينًا: من الصفر، التذوق أكثر بنحو 17%. هذه هي الصورة الصادقة.',
          'چپ: شروع از ۵۰ باعث می‌شود ۹٫۵ شیشهٔ بیشتر تقریباً سه برابر به نظر برسد. راست: از صفر، مزه‌کردن حدود ۱۷٪ بیشتر است. این تصویر صادقانه است.',
        ),
      ),
      {
        type: 'tabs',
        tabs: [
          {
            label: W('Excel', 'Excel', 'Excel'),
            blocks: [
              html(
                '<ol><li>Type the two averages (55.4 and 64.9) with labels "No tasting" and "Tasting".</li><li><strong>Insert ▸ Column chart</strong> (flat, not 3-D).</li><li>Right-click the vertical axis ▸ <strong>Format Axis</strong> ▸ Minimum = <strong>0</strong>.</li><li>Click the title and type: <em>Tasting Saturdays sell about 9.5 more jars</em>.</li><li>Add data labels; delete the gridlines; make the "Tasting" bar a strong colour and the other grey.</li></ol>',
                '<ol><li>اكتب المتوسطين (55.4 و64.9) مع التسميتين "No tasting" و"Tasting".</li><li><strong>Insert ▸ Column chart</strong> (مسطح، لا ثلاثي الأبعاد).</li><li>انقر بالزر الأيمن على المحور العمودي ▸ <strong>Format Axis</strong> ▸ Minimum = <strong>0</strong>.</li><li>انقر العنوان واكتب: <em>Tasting Saturdays sell about 9.5 more jars</em>.</li><li>أضف تسميات البيانات؛ واحذف خطوط الشبكة؛ واجعل عمود "Tasting" بلون قوي والآخر رماديًا.</li></ol>',
                '<ol><li>دو میانگین (۵۵٫۴ و ۶۴٫۹) را با برچسب‌های «No tasting» و «Tasting» بنویس.</li><li><strong>Insert ▸ Column chart</strong> (تخت، نه سه‌بعدی).</li><li>روی محور عمودی راست‌کلیک ▸ <strong>Format Axis</strong> ▸ Minimum = <strong>0</strong>.</li><li>روی عنوان کلیک کن و بنویس: <em>Tasting Saturdays sell about 9.5 more jars</em>.</li><li>برچسب داده اضافه کن؛ خطوط شبکه را پاک کن؛ میلهٔ «Tasting» را پررنگ و دیگری را خاکستری کن.</li></ol>',
              ),
            ],
          },
          { label: W('Python (Colab)', 'Python ‏(Colab)', 'Python ‏(Colab)'), blocks: [code(py.chart)] },
        ],
      },
      html(
        '<p><strong>Not every chart needs numbers.</strong> A simple timeline of next season (when to buy fruit, cook, sell) or a box-and-arrow drawing of the steps from fruit to jar can explain a plan better than a table.</p>',
        '<p><strong>ليست كل الرسوم بحاجة إلى أرقام.</strong> جدول زمني بسيط للموسم القادم (متى نشتري الفاكهة، ونطبخ، ونبيع) أو رسم بمربعات وأسهم لخطوات الطريق من الفاكهة إلى البرطمان قد يشرح الخطة أفضل من جدول.</p>',
        '<p><strong>هر نموداری عدد لازم ندارد.</strong> یک خط زمانی ساده برای فصل بعد (کی میوه بخریم، بپزیم، بفروشیم) یا یک طرح جعبه و فلش از گام‌های میوه تا شیشه می‌تواند یک برنامه را بهتر از جدول توضیح دهد.</p>',
      ),
      recap(
        W('Title = the takeaway, as a sentence.', 'العنوان = الخلاصة، في جملة.', 'عنوان = نتیجه، به‌صورت یک جمله.'),
        W('No clutter, one strong colour, bars from zero.', 'بلا فوضى، لون واحد قوي، أعمدة من الصفر.', 'بدون شلوغی، یک رنگ قوی، میله‌ها از صفر.'),
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
    timeEst: W('5 min', '٥ دقائق', '۵ دقیقه'),
    headingHtml: t(
      '<h2>Four tips, and an AI helper</h2><p class="standfirst">Four habits make any report or talk clearer. An AI assistant can write a first draft; you check the numbers.</p>',
      '<h2>أربع نصائح، ومساعد ذكاء اصطناعي</h2><p class="standfirst">أربع عادات تجعل أي تقرير أو عرض أوضح. يستطيع مساعد الذكاء الاصطناعي كتابة مسودة أولى؛ وأنت تفحص الأرقام.</p>',
      '<h2>چهار نکته، و یک کمک‌کار هوش مصنوعی</h2><p class="standfirst">چهار عادت هر گزارش یا ارائه‌ای را روشن‌تر می‌کند. دستیار هوش مصنوعی می‌تواند پیش‌نویس اول را بنویسد؛ تو عددها را بررسی می‌کنی.</p>',
    ),
    blocks: [
      {
        type: 'table',
        headers: [W('Tip', 'النصيحة', 'نکته'), W('Jam stand example', 'مثال من كشك المربى', 'مثال غرفهٔ مربا')],
        rows: [
          [W('Tell the answer first, not the order you worked in', 'قل الإجابة أولًا، لا ترتيب عملك', 'اول جواب را بگو، نه ترتیب کارت را'), W('Start with "tasting sells more", not "first we cleaned the file"', 'ابدأ بـ "التذوق يبيع أكثر"، لا بـ "أولًا نظفنا الملف"', 'با «مزه‌کردن بیشتر می‌فروشد» شروع کن، نه با «اول فایل را تمیز کردیم»')],
          [W('Give numbers something to compare with', 'أعطِ الأرقام شيئًا تُقارن به', 'به عددها چیزی برای مقایسه بده'), W('"64.9 vs 55.4 jars, about 17% more", not just "64.9 jars"', '"64.9 مقابل 55.4 برطمانًا، أكثر بنحو 17%"، لا "64.9 برطمانًا" فقط', '«۶۴٫۹ در برابر ۵۵٫۴ شیشه، حدود ۱۷٪ بیشتر»، نه فقط «۶۴٫۹ شیشه»')],
          [W('Use plain words, not jargon', 'استخدم كلمات بسيطة، لا مصطلحات', 'واژهٔ ساده به کار ببر، نه اصطلاح'), W('"Luck alone would do this about 1 time in 100", not "p = 0.010"', '"الحظ وحده يفعل هذا نحو مرة من كل 100"، لا "p = 0.010"', '«شانس تنها حدود ۱ بار در ۱۰۰ این کار را می‌کند»، نه «p = ۰٫۰۱۰»')],
          [W('Keep extra slides for questions', 'احتفظ بشرائح إضافية للأسئلة', 'اسلایدهای اضافه برای پرسش‌ها نگه دار'), W('An appendix slide with the regression and the test', 'شريحة ملحقة فيها الانحدار والاختبار', 'یک اسلاید پیوست با رگرسیون و آزمون')],
        ],
      },
      html(
        '<p><strong>An AI helper.</strong> Give it your real numbers and ask for a short, answer-first summary:</p>',
        '<p><strong>مساعد ذكاء اصطناعي.</strong> أعطه أرقامك الحقيقية واطلب ملخصًا قصيرًا يبدأ بالإجابة:</p>',
        '<p><strong>یک کمک‌کار هوش مصنوعی.</strong> عددهای واقعی‌ات را به آن بده و یک خلاصهٔ کوتاه بخواه که با جواب شروع شود:</p>',
      ),
      code(`Here are my results (do not add any numbers I have not given you):
- 20 Saturdays at one market, April-August 2024; tasting on every other Saturday
- Tasting Saturdays: 64.9 jars on average; other Saturdays: 55.4 (p = 0.010)
Write a 3-sentence summary for the stand owner, answer first, in plain words.
Say how big the difference is, do not say "proves", and add one sentence on the limits.`),
      box(
        'keypoint',
        W('Check before you use it', 'افحص قبل أن تستخدمه', 'پیش از استفاده بررسی کن'),
        '<p>Compare every number in the draft with your own file. If it says "proves", "25%" or "all markets", fix it: those are not in your data.</p>',
        '<p>قارن كل رقم في المسودة بملفك. وإن قالت "يثبت" أو "25%" أو "كل الأسواق" فصحّحها: هذه ليست في بياناتك.</p>',
        '<p>هر عدد پیش‌نویس را با فایل خودت مقایسه کن. اگر گفت «ثابت می‌کند»، «۲۵٪» یا «همهٔ بازارها»، درستش کن: این‌ها در دادهٔ تو نیستند.</p>',
      ),
    ],
  },
  // ---------- 12. Worked example ----------
  {
    id: 'worked-example',
    navLabel: W('Worked example: one-page report', 'مثال محلول: تقرير من صفحة', 'مثال حل‌شده: گزارش یک‌صفحه‌ای'),
    sectionLabel: W('Section 12', 'القسم ١٢', 'بخش ۱۲'),
    timeEst: W('6 min', '٦ دقائق', '۶ دقیقه'),
    headingHtml: t(
      '<h2>Worked example: the jam stand\'s one-page report</h2><p class="standfirst">The whole jam story on one page, then the same story as five slides. Your project can follow this shape.</p>',
      '<h2>مثال محلول: تقرير كشك المربى من صفحة واحدة</h2><p class="standfirst">قصة المربى كلها في صفحة واحدة، ثم القصة نفسها في خمس شرائح. يمكن لمشروعك أن يتبع هذا الشكل.</p>',
      '<h2>مثال حل‌شده: گزارش یک‌صفحه‌ای غرفهٔ مربا</h2><p class="standfirst">کل داستان مربا در یک صفحه، بعد همان داستان در پنج اسلاید. پروژه‌ات می‌تواند همین شکل را دنبال کند.</p>',
    ),
    blocks: [
      box(
        'example',
        W('Report: should the tasting table stay?', 'التقرير: هل تبقى طاولة التذوق؟', 'گزارش: آیا میز مزه‌کردن بماند؟'),
        '<p><strong>Summary.</strong> Keep the tasting table every Saturday: tasting Saturdays sold about <strong>9.5 more jars</strong> (64.9 vs 55.4).</p><p><strong>Findings.</strong> (1) More jars, and luck alone would do this only about 1 time in 100. (2) More visitors became buyers (30.8% vs 27.1%). (3) Even on Saturdays with the same number of visitors, tasting adds about 6 jars.</p><p><strong>Limits.</strong> One market, 20 summer Saturdays; the average could be off by about 2 jars.</p><p><strong>Next step.</strong> From September, alternate again for 10 Saturdays to check it works in autumn too.</p>',
        '<p><strong>الملخص.</strong> أبقوا طاولة التذوق كل سبت: باعت أيام التذوق نحو <strong>9.5 برطمانات أكثر</strong> (64.9 مقابل 55.4).</p><p><strong>النتائج.</strong> (1) برطمانات أكثر، ولا يفعل الحظ وحده ذلك إلا نحو مرة من كل 100. (2) صار زوار أكثر مشترين (30.8% مقابل 27.1%). (3) حتى في أيام سبت بعدد الزوار نفسه، يضيف التذوق نحو 6 برطمانات.</p><p><strong>الحدود.</strong> سوق واحد، 20 سبتًا صيفيًا؛ قد يبتعد المتوسط بنحو برطمانين.</p><p><strong>الخطوة التالية.</strong> من سبتمبر، بدّلوا مجددًا لعشرة أيام سبت للتحقق من أنه ينجح في الخريف أيضًا.</p>',
        '<p><strong>خلاصه.</strong> میز مزه‌کردن را هر شنبه نگه دارید: شنبه‌های مزه‌کردن حدود <strong>۹٫۵ شیشه بیشتر</strong> فروختند (۶۴٫۹ در برابر ۵۵٫۴).</p><p><strong>یافته‌ها.</strong> (۱) شیشهٔ بیشتر، و شانس تنها فقط حدود ۱ بار در ۱۰۰ چنین کاری می‌کند. (۲) بازدیدکنندهٔ بیشتری خریدار شد (۳۰٫۸٪ در برابر ۲۷٫۱٪). (۳) حتی در شنبه‌هایی با تعداد بازدیدکنندهٔ یکسان، مزه‌کردن حدود ۶ شیشه اضافه می‌کند.</p><p><strong>محدودیت‌ها.</strong> یک بازار، ۲۰ شنبهٔ تابستانی؛ میانگین ممکن است حدود ۲ شیشه خطا داشته باشد.</p><p><strong>گام بعدی.</strong> از سپتامبر، دوباره ۱۰ شنبه یکی‌درمیان کنید تا ببینید در پاییز هم جواب می‌دهد.</p>',
      ),
      {
        type: 'table',
        headers: [W('Slide', 'الشريحة', 'اسلاید'), W('Title (the takeaway)', 'العنوان (الخلاصة)', 'عنوان (نتیجه)')],
        rows: [
          [W('1', '1', '۱'), W('A tasting table sells about 10 more jars a Saturday', 'طاولة التذوق تبيع نحو 10 برطمانات أكثر كل سبت', 'میز مزه‌کردن هر شنبه حدود ۱۰ شیشه بیشتر می‌فروشد')],
          [W('2', '2', '۲'), W('We compared 10 tasting and 10 normal Saturdays', 'قارنّا 10 أيام سبت بالتذوق و10 عادية', '۱۰ شنبهٔ مزه‌کردن و ۱۰ شنبهٔ عادی را مقایسه کردیم')],
          [W('3', '3', '۳'), W('Tasting Saturdays sell about 9.5 more jars (the bar chart from zero)', 'أيام السبت بالتذوق تبيع نحو 9.5 برطمانات أكثر (مخطط الأعمدة من الصفر)', 'شنبه‌های مزه‌کردن حدود ۹٫۵ شیشه بیشتر می‌فروشند (نمودار میله‌ای از صفر)')],
          [W('4', '4', '۴'), W('The gap is very unlikely to be luck', 'الفرق بعيد جدًا عن أن يكون حظًا', 'این فاصله به احتمال بسیار زیاد شانس نیست')],
          [W('5', '5', '۵'), W('Keep tasting, and check again in autumn', 'استمروا في التذوق، وتحققوا مجددًا في الخريف', 'مزه‌کردن را ادامه دهید و در پاییز دوباره بررسی کنید')],
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
    timeEst: W('3 min', '٣ دقائق', '۳ دقیقه'),
    headingHtml: t(
      '<h2>Common mistakes</h2><p class="standfirst">Four easy ways to spoil a good analysis, and the fix for each.</p>',
      '<h2>أخطاء شائعة</h2><p class="standfirst">أربع طرق سهلة لإفساد تحليل جيد، والإصلاح لكل منها.</p>',
      '<h2>اشتباه‌های رایج</h2><p class="standfirst">چهار راه آسان برای خراب کردن یک تحلیل خوب، و راه‌حل هر کدام.</p>',
    ),
    blocks: [
      {
        type: 'table',
        headers: [W('Mistake', 'الخطأ', 'اشتباه'), W('Fix', 'الإصلاح', 'راه‌حل')],
        rows: [
          [W('The answer is hidden on page 5', 'الإجابة مخبأة في الصفحة 5', 'جواب در صفحهٔ ۵ پنهان است'), W('Put it in the first sentence', 'ضعها في الجملة الأولى', 'آن را در جملهٔ اول بگذار')],
          [W('A chart title like "Jars by tasting"', 'عنوان مخطط مثل "البرطمانات حسب التذوق"', 'عنوان نموداری مثل «شیشه‌ها بر اساس مزه‌کردن»'), W('Write the takeaway: "Tasting Saturdays sell about 9.5 more jars"', 'اكتب الخلاصة: "أيام السبت بالتذوق تبيع نحو 9.5 برطمانات أكثر"', 'نتیجه را بنویس: «شنبه‌های مزه‌کردن حدود ۹٫۵ شیشه بیشتر می‌فروشند»')],
          [W('A bar axis that starts at 50', 'محور أعمدة يبدأ من 50', 'محور میله‌ای که از ۵۰ شروع می‌شود'), W('Start bars at zero', 'ابدأ الأعمدة من الصفر', 'میله‌ها را از صفر شروع کن')],
          [W('Saying "proves" and hiding the limits', 'قول "يثبت" وإخفاء الحدود', 'گفتن «ثابت می‌کند» و پنهان کردن محدودیت‌ها'), W('Say "enough evidence that…", plus who, when and "give or take"', 'قل "أدلة كافية على أن…"، مع من ومتى و"بزيادة أو نقصان"', 'بگو «شواهد کافی هست که…»، به‌همراه چه کسی، کی و «کم یا زیاد»')],
        ],
      },
      recap(
        W('Answer first, a takeaway title, bars from zero.', 'الإجابة أولًا، وعنوان بالخلاصة، وأعمدة من الصفر.', 'اول جواب، عنوانی با نتیجه، میله‌ها از صفر.'),
        W('Say the limits honestly.', 'قل الحدود بصدق.', 'محدودیت‌ها را صادقانه بگو.'),
      ),
      exercise('w08-q014'),
    ],
  },
]
