// Authored for the React app from ../../../../course/ba-source-materials/ba2-final-project.md (the
// "Business Analytics-2 Final Project Breakdown" by Ameer Halawani). Departures from the deck, on purpose:
//  - Students work in pairs on one of eight case studies (finalProjectCases.ts) instead of each finding a
//    dataset, so every dataset is known to support cleaning, a regression and a hypothesis test.
//  - The project is built week by week: from Week 4, each homework produces one part (roadmap below), so the
//    final hand-in is mostly assembly. The deck's five parts and README template are kept as written.
//  - The tools comparison adds Excel and Python, which this course actually uses, to the deck's Tableau,
//    Power BI and R.
// ar/fa are draft translations awaiting native review, like the weeks. Code stays English.
import type { Week } from '../types'
import { L } from './homework/shared'
import { caseBlocks } from './finalProjectCases'

const readmeTemplate = `# [Your Project Title]

## Project Overview
**Brief description:** 1–2 sentences: the goal and what you analyzed.
**Goals & outcomes:** the goals and expected outcomes from part 2.
**Team:** [partner 1], [partner 2] · Case study [C1–C8]

## Data
* **Source:** [link to the dataset]
* **Description:** [rows] rows, [columns] columns. Key columns: \`...\`, \`...\`

## Tools and Methods
**Software and libraries:** e.g. Excel, Python (pandas, matplotlib), Power BI
**Analysis approach:** cleaning, charts, linear regression, hypothesis test

## Project Structure
├── data/
│   ├── raw_[dataset].csv
│   └── clean_[dataset].xlsx
├── visualizations/
│   └── [chart_1].png
├── code/
│   └── [notebook].ipynb        (if you used Python)
└── README.md

## How to Understand / Reproduce the Analysis
1. **Data loading:** how the file was loaded into your tool
2. **Data cleaning:** your change log (Weeks 4–5)
3. **Analysis:** regression (Week 6), hypothesis test (Week 7)
4. **Visualizations:** each chart and what it shows

## Key Findings and Insights
* ...

## Recommendations
* ...

## Further Work
* ...`

export const finalProject: Week = {
  id: 'final-project',
  originalPdf: '/originals/final-project.pdf',
  order: 99,
  cover: {
    kicker: L('Business Analytics 2 · Final Project', 'تحليلات الأعمال 2 · المشروع النهائي', 'تحلیل کسب‌وکار ۲ · پروژهٔ نهایی'),
    titleHtml: L(
      '<h1>Final Project:<em>One Case Study, Built Week by Week</em></h1><p class="lede">With a partner, you take one real business dataset from a question to a recommendation: clean it, chart it, model it, test it and explain it. From Week 4, every homework is one step of this project, so by the time you reach the final hand-in, about 80% of it is already done.</p>',
      '<h1>المشروع النهائي:<em>دراسة حالة واحدة تُبنى أسبوعًا بعد أسبوع</em></h1><p class="lede">مع شريك، تأخذ مجموعة بيانات أعمال حقيقية واحدة من السؤال إلى التوصية: تنظّفها وترسمها وتنمذجها وتختبرها وتشرحها. بدءًا من الأسبوع 4، كل واجب خطوة من هذا المشروع، فحين تصل إلى التسليم النهائي يكون نحو 80% منه منجزًا.</p>',
      '<h1>پروژهٔ نهایی:<em>یک مطالعهٔ موردی، ساخته‌شده هفته‌به‌هفته</em></h1><p class="lede">با یک هم‌گروهی، یک مجموعه‌دادهٔ واقعی کسب‌وکار را از سؤال تا توصیه می‌بری: تمیزش می‌کنی، نمودارش را می‌کشی، مدلش می‌کنی، آزمونش می‌کنی و توضیحش می‌دهی. از هفتهٔ ۴، هر تکلیف یک گام این پروژه است، پس وقتی به تحویل نهایی می‌رسی حدود ۸۰٪ آن انجام شده است.</p>',
    ),
    timeEstimate: L(
      '≈ 25 min to read · the project runs from Week 4 to Week 10',
      '≈ ٢٥ دقيقة للقراءة · يمتد المشروع من الأسبوع 4 إلى الأسبوع 10',
      '≈ ۲۵ دقیقه خواندن · پروژه از هفتهٔ ۴ تا هفتهٔ ۱۰ ادامه دارد',
    ),
  },
  questions: [],
  sections: [
    {
      id: 'overview',
      navLabel: L('Overview', 'نظرة عامة', 'مرور کلی'),
      sectionLabel: L('Section 01', 'القسم ٠١', 'بخش ۰۱'),
      timeEst: L('3 min', '٣ دقائق', '۳ دقیقه'),
      headingHtml: L(
        '<h2>Overview: what you will hand in, and how you get there</h2><p class="standfirst">The final project is your chance to apply everything in the course to one real-world scenario: identify a business question, analyze the data behind it, and communicate an insight someone could act on.</p>',
        '<h2>نظرة عامة: ما الذي ستسلّمه، وكيف تصل إليه</h2><p class="standfirst">المشروع النهائي فرصتك لتطبيق كل ما في المقرر على سيناريو واقعي واحد: تحديد سؤال عمل، وتحليل البيانات وراءه، وإيصال فكرة يمكن لأحد أن يتصرف بناءً عليها.</p>',
        '<h2>مرور کلی: چه چیزی تحویل می‌دهی و چطور به آن می‌رسی</h2><p class="standfirst">پروژهٔ نهایی فرصت توست تا همهٔ مطالب دوره را روی یک سناریوی واقعی پیاده کنی: یک سؤال کسب‌وکار را مشخص کنی، داده‌های پشت آن را تحلیل کنی و بینشی را منتقل کنی که کسی بتواند بر اساسش عمل کند.</p>',
      ),
      blocks: [
        {
          type: 'objectives',
          label: L('By the end, your pair will have', 'بنهاية المشروع سيكون لدى فريقكما', 'در پایان، گروه شما خواهد داشت'),
          items: [
            L('A clear title, goals and expected outcomes for one business question', 'عنوانًا وأهدافًا ونتائج متوقعة واضحة لسؤال عمل واحد', 'عنوان، هدف‌ها و نتایج مورد انتظار روشن برای یک سؤال کسب‌وکار'),
            L('A profiled and cleaned dataset with a change log', 'مجموعة بيانات مفحوصة ومنظّفة مع سجل تغييرات', 'یک مجموعه‌دادهٔ پروفایل‌شده و تمیز با گزارش تغییرات'),
            L('Charts, a linear regression and a hypothesis test that answer the question', 'رسومًا وانحدارًا خطيًا واختبار فرضية تجيب عن السؤال', 'نمودارها، یک رگرسیون خطی و یک آزمون فرض که به سؤال پاسخ می‌دهند'),
            L('A SWOT analysis, a tools section and a README that someone else can follow', 'تحليل SWOT وقسمًا عن الأدوات وملف README يمكن لغيركما اتباعه', 'یک تحلیل SWOT، بخشی دربارهٔ ابزارها و یک README که دیگران بتوانند دنبالش کنند'),
            L('A short presentation of your findings and recommendations', 'عرضًا قصيرًا لنتائجكما وتوصياتكما', 'یک ارائهٔ کوتاه از یافته‌ها و توصیه‌هایتان'),
          ],
        },
        {
          type: 'box',
          variant: 'keypoint',
          label: L('How it works', 'كيف يعمل', 'چطور کار می‌کند'),
          html: L(
            '<ul><li><strong>Pairs:</strong> two students, one case study, one shared Drive folder (shared with your mentor). Both partners should be able to explain every part.</li><li><strong>Week by week:</strong> from Week 4, each homework is one step (Section 2). Do them on your case, and the final hand-in is mostly putting the pieces together.</li><li><strong>What\'s left at the end:</strong> the SWOT analysis, the tools section, the finished README and the presentation, about 20% of the work.</li></ul>',
            '<ul><li><strong>الأزواج:</strong> طالبان، ودراسة حالة واحدة، ومجلد Drive مشترك واحد (مشارك مع مرشدكما). يجب أن يستطيع كل شريك شرح كل جزء.</li><li><strong>أسبوعًا بعد أسبوع:</strong> من الأسبوع 4، كل واجب خطوة واحدة (القسم 2). أنجزاها على حالتكما، فيكون التسليم النهائي في معظمه جمعًا للقطع.</li><li><strong>ما يتبقى في النهاية:</strong> تحليل SWOT، وقسم الأدوات، وإكمال README، والعرض، أي نحو 20% من العمل.</li></ul>',
            '<ul><li><strong>گروه‌های دونفره:</strong> دو دانشجو، یک مطالعهٔ موردی، یک پوشهٔ مشترک Drive (به اشتراک گذاشته‌شده با منتور). هر دو نفر باید بتوانند هر بخش را توضیح دهند.</li><li><strong>هفته‌به‌هفته:</strong> از هفتهٔ ۴، هر تکلیف یک گام است (بخش ۲). آن‌ها را روی مورد خودتان انجام دهید تا تحویل نهایی بیشتر کنار هم گذاشتن قطعه‌ها باشد.</li><li><strong>آنچه در پایان می‌ماند:</strong> تحلیل SWOT، بخش ابزارها، تکمیل README و ارائه؛ حدود ۲۰٪ کار.</li></ul>',
          ),
        },
      ],
    },
    {
      id: 'roadmap',
      navLabel: L('Week-by-week roadmap', 'خارطة الطريق الأسبوعية', 'نقشهٔ راه هفته‌به‌هفته'),
      sectionLabel: L('Section 02', 'القسم ٠٢', 'بخش ۰۲'),
      timeEst: L('3 min', '٣ دقائق', '۳ دقیقه'),
      headingHtml: L(
        '<h2>The roadmap: one homework, one piece of the project</h2><p class="standfirst">Each week\'s homework applies that week\'s topic to your case study and produces one part of the final hand-in. The right-hand column says where it ends up.</p>',
        '<h2>خارطة الطريق: واجب واحد، قطعة واحدة من المشروع</h2><p class="standfirst">يطبّق واجب كل أسبوع موضوع ذلك الأسبوع على دراسة حالتكما وينتج جزءًا واحدًا من التسليم النهائي. يوضح العمود الأخير أين ينتهي.</p>',
        '<h2>نقشهٔ راه: یک تکلیف، یک قطعه از پروژه</h2><p class="standfirst">تکلیف هر هفته موضوع همان هفته را روی مطالعهٔ موردی شما پیاده می‌کند و یک بخش از تحویل نهایی را می‌سازد. ستون آخر می‌گوید کجا می‌نشیند.</p>',
      ),
      blocks: [
        {
          type: 'table',
          headers: [L('Week', 'الأسبوع', 'هفته'), L('Homework step', 'خطوة الواجب', 'گام تکلیف'), L('Ends up in', 'ينتهي في', 'جایش در')],
          rows: [
            [L('4 · Data preparation', '4 · تحضير البيانات', '۴ · آماده‌سازی داده'), L('Pick a partner and a case; write title, goals and expected outcomes; profile the dataset and plan the cleaning', 'اختر شريكًا وحالة؛ اكتب العنوان والأهداف والنتائج المتوقعة؛ افحص البيانات وخطّط للتنظيف', 'هم‌گروهی و مورد را انتخاب کن؛ عنوان، هدف‌ها و نتایج مورد انتظار را بنویس؛ داده را پروفایل کن و برای پاک‌سازی برنامه بریز'), L('Parts 1–2; README: Overview, Data', 'الجزءان 1–2؛ README: ‏Overview وData', 'بخش‌های ۱ و ۲؛ README: ‏Overview و Data')],
            [L('5 · Data preparation in Excel', '5 · تحضير البيانات في Excel', '۵ · آماده‌سازی داده در Excel'), L('Clean the dataset following your plan; keep the raw file and a change log', 'نظّف البيانات وفق خطتك؛ واحتفظ بالملف الخام وسجل التغييرات', 'داده را طبق برنامه‌ات تمیز کن؛ فایل خام و گزارش تغییرات را نگه دار'), L('README: Data cleaning; data/ folder', 'README: ‏Data cleaning؛ مجلد data/', 'README: ‏Data cleaning؛ پوشهٔ data/')],
            [L('6 · Linear regression', '6 · الانحدار الخطي', '۶ · رگرسیون خطی'), L('Fit one regression from your case (Section 3) and interpret the slope and R²', 'طبّق انحدارًا واحدًا من حالتك (القسم 3) وفسّر الميل وR²', 'یک رگرسیون از مورد خودت (بخش ۳) برازش کن و شیب و R² را تفسیر کن'), L('README: Analysis, Key findings', 'README: ‏Analysis وKey findings', 'README: ‏Analysis و Key findings')],
            [L('7 · Hypothesis testing', '7 · اختبار الفرضيات', '۷ · آزمون فرض'), L('State and run your case\'s hypothesis test; report the p-value in plain words', 'صُغ اختبار الفرضية لحالتك ونفّذه؛ وعبّر عن قيمة p بكلمات بسيطة', 'آزمون فرض مورد خودت را بنویس و اجرا کن؛ مقدار p را با زبان ساده گزارش کن'), L('README: Analysis, Key findings', 'README: ‏Analysis وKey findings', 'README: ‏Analysis و Key findings')],
            [L('8 · Application', '8 · التطبيق', '۸ · کاربرد'), L('Join the pieces into one storyline: question → clean data → charts → regression → test', 'اجمع القطع في قصة واحدة: السؤال ← بيانات نظيفة ← رسوم ← انحدار ← اختبار', 'قطعه‌ها را در یک داستان کنار هم بگذار: سؤال ← دادهٔ تمیز ← نمودار ← رگرسیون ← آزمون'), L('Draft of the whole README', 'مسودة README كاملة', 'پیش‌نویس کل README')],
            [L('9 · Error analysis', '9 · تحليل الأخطاء', '۹ · تحلیل خطا'), L('Check how wrong your regression can be and what that means for the decision', 'تحقق من مدى خطأ انحدارك وما يعنيه ذلك للقرار', 'بررسی کن رگرسیونت چقدر می‌تواند خطا کند و این برای تصمیم چه معنایی دارد'), L('README: Analysis (limits), Further work', 'README: ‏Analysis (الحدود) وFurther work', 'README: ‏Analysis (محدودیت‌ها) و Further work')],
            [L('10 · Communicating findings', '10 · إيصال النتائج', '۱۰ · انتقال یافته‌ها'), L('Turn the findings into recommendations and a short slide deck', 'حوّل النتائج إلى توصيات ومجموعة شرائح قصيرة', 'یافته‌ها را به توصیه‌ها و چند اسلاید کوتاه تبدیل کن'), L('README: Recommendations; presentation', 'README: ‏Recommendations؛ العرض', 'README: ‏Recommendations؛ ارائه')],
            [L('<strong>Final step</strong>', '<strong>الخطوة الأخيرة</strong>', '<strong>گام نهایی</strong>'), L('Add the SWOT and tools sections, finish the README, check the folder, present', 'أضف قسمي SWOT والأدوات، وأكمل README، وتحقق من المجلد، واعرض', 'بخش‌های SWOT و ابزارها را اضافه کن، README را کامل کن، پوشه را بررسی کن، ارائه بده'), L('Parts 3–5; the hand-in', 'الأجزاء 3–5؛ التسليم', 'بخش‌های ۳ تا ۵؛ تحویل')],
          ],
        },
        {
          type: 'box',
          variant: 'analogy',
          label: L('Analogy', 'تشبيه', 'تشبیه'),
          html: L(
            '<p>It is like building a house room by room instead of all at once in the last week: each homework is a room that passes inspection (your mentor\'s feedback) before the next one starts. Moving-in day is just furniture.</p>',
            '<p>الأمر يشبه بناء بيت غرفة بعد غرفة بدلًا من بنائه كله في الأسبوع الأخير: كل واجب غرفة تجتاز الفحص (ملاحظات مرشدك) قبل أن تبدأ التالية. ويوم الانتقال مجرد أثاث.</p>',
            '<p>مثل ساختن یک خانه اتاق‌به‌اتاق است، نه همه‌اش در هفتهٔ آخر: هر تکلیف اتاقی است که پیش از شروع بعدی از بازرسی (بازخورد منتورت) رد می‌شود. روز اسباب‌کشی فقط چیدن اثاث است.</p>',
          ),
        },
      ],
    },
    {
      id: 'case-studies',
      navLabel: L('Case studies', 'دراسات الحالة', 'مطالعه‌های موردی'),
      sectionLabel: L('Section 03', 'القسم ٠٣', 'بخش ۰۳'),
      timeEst: L('6 min', '٦ دقائق', '۶ دقیقه'),
      headingHtml: L(
        '<h2>Case studies: pick one per pair</h2><p class="standfirst">Each case is a business question with a free public dataset that is big enough to be interesting, messy enough to need cleaning, and rich enough for a regression and a hypothesis test.</p>',
        '<h2>دراسات الحالة: اختارا واحدة لكل فريق</h2><p class="standfirst">كل حالة سؤال عمل مع مجموعة بيانات عامة مجانية كبيرة بما يكفي لتكون مثيرة، وفوضوية بما يكفي لتحتاج إلى تنظيف، وغنية بما يكفي لانحدار واختبار فرضية.</p>',
        '<h2>مطالعه‌های موردی: هر گروه یکی را انتخاب کند</h2><p class="standfirst">هر مورد یک سؤال کسب‌وکار با یک مجموعه‌دادهٔ عمومی رایگان است که آن‌قدر بزرگ است که جالب باشد، آن‌قدر نامرتب که پاک‌سازی لازم داشته باشد و آن‌قدر غنی که برای رگرسیون و آزمون فرض کافی باشد.</p>',
      ),
      blocks: [
        {
          type: 'html',
          html: L(
            '<ul><li>Each pair takes <strong>one</strong> case and tells the mentor in the Week 4 homework. If several pairs want the same case, the mentor decides, first come, first served.</li><li>Kaggle downloads need a free account; UCI files download directly.</li><li>The regression and test ideas are starting points: you may pick other columns if they answer your question better, as long as you explain why.</li></ul>',
            '<ul><li>يأخذ كل فريق حالة <strong>واحدة</strong> ويخبر المرشد بها في واجب الأسبوع 4. إذا أراد أكثر من فريق الحالة نفسها، يقرر المرشد، والأولوية للأسبق.</li><li>تحتاج تنزيلات Kaggle إلى حساب مجاني؛ وتُنزَّل ملفات UCI مباشرة.</li><li>أفكار الانحدار والاختبار نقاط انطلاق: يمكنكما اختيار أعمدة أخرى إن كانت تجيب عن سؤالكما بشكل أفضل، بشرط أن تشرحا السبب.</li></ul>',
            '<ul><li>هر گروه <strong>یک</strong> مورد برمی‌دارد و در تکلیف هفتهٔ ۴ به منتور اعلام می‌کند. اگر چند گروه یک مورد را بخواهند، منتور تصمیم می‌گیرد؛ هر که زودتر، اولویت با او.</li><li>دانلود از Kaggle حساب رایگان می‌خواهد؛ فایل‌های UCI مستقیم دانلود می‌شوند.</li><li>ایده‌های رگرسیون و آزمون نقطهٔ شروع‌اند: اگر ستون‌های دیگری بهتر به سؤالتان پاسخ می‌دهند، می‌توانید آن‌ها را انتخاب کنید، به شرطی که دلیلش را توضیح دهید.</li></ul>',
          ),
        },
        ...caseBlocks,
        {
          type: 'box',
          variant: 'keypoint',
          label: L('Before you commit to a case', 'قبل أن تلتزما بحالة', 'پیش از قطعی کردن یک مورد'),
          html: L(
            '<p>The deck\'s checklist still applies: open the file first. Is it a size your tool can handle? Does it contain the columns your question needs? How messy is it? Is there documentation explaining each column? Ten minutes of looking now saves a week of switching later.</p>',
            '<p>ما زالت قائمة التحقق في العرض سارية: افتحا الملف أولًا. هل حجمه مناسب لأداتكما؟ هل يحتوي الأعمدة التي يحتاجها سؤالكما؟ ما مدى فوضويته؟ هل يوجد توثيق يشرح كل عمود؟ عشر دقائق من النظر الآن توفّر أسبوعًا من التبديل لاحقًا.</p>',
            '<p>فهرست بررسی اسلایدها هنوز معتبر است: اول فایل را باز کنید. آیا اندازه‌اش برای ابزارتان مناسب است؟ ستون‌هایی که سؤالتان لازم دارد را دارد؟ چقدر نامرتب است؟ مستنداتی هست که هر ستون را توضیح دهد؟ ده دقیقه نگاه کردن الان یک هفته عوض کردن مورد را در آینده صرفه‌جویی می‌کند.</p>',
          ),
        },
      ],
    },
    {
      id: 'part-1-title',
      navLabel: L('Part 1: Title', 'الجزء 1: العنوان', 'بخش ۱: عنوان'),
      sectionLabel: L('Section 04', 'القسم ٠٤', 'بخش ۰۴'),
      timeEst: L('2 min', '٢ دقيقتان', '۲ دقیقه'),
      headingHtml: L(
        '<h2>Part 1: give your analysis a name</h2><p class="standfirst">The title is the headline of your data story. It tells you, your partner and your reader what the project is about before they read a word of it.</p>',
        '<h2>الجزء 1: أعطِ تحليلك اسمًا</h2><p class="standfirst">العنوان هو عنوان قصة بياناتك الرئيسي. يخبرك أنت وشريكك وقارئك بموضوع المشروع قبل قراءة أي كلمة منه.</p>',
        '<h2>بخش ۱: به تحلیلت یک نام بده</h2><p class="standfirst">عنوان تیتر داستان دادهٔ توست. پیش از خواندن حتی یک کلمه، به تو، هم‌گروهی‌ات و خواننده می‌گوید پروژه دربارهٔ چیست.</p>',
      ),
      blocks: [
        {
          type: 'html',
          html: L(
            '<ul><li><strong>Be specific.</strong> Not "Sales Analysis" but "Analyzing Factors Influencing Online Sales Growth in Q3 2025".</li><li><strong>Reflect the core question.</strong> "Can Social Media Engagement Predict Website Conversions?"</li><li><strong>Keep it concise.</strong> Informative, not a paragraph.</li><li><strong>Name the business context.</strong> The industry or company type belongs in the title.</li></ul><p>Examples from the deck: <em>Analyzing Customer Churn in the Telecommunications Industry</em>; <em>The Impact of Marketing Campaigns on Product Sales</em>; <em>Optimizing Inventory Management for a Retail Business</em>.</p>',
            '<ul><li><strong>كن محددًا.</strong> لا "تحليل المبيعات" بل "تحليل العوامل المؤثرة في نمو المبيعات الإلكترونية في الربع الثالث 2025".</li><li><strong>اعكس السؤال الأساسي.</strong> "هل يمكن لتفاعل وسائل التواصل التنبؤ بتحويلات الموقع؟"</li><li><strong>اجعله موجزًا.</strong> مفيدًا لا فقرة كاملة.</li><li><strong>اذكر سياق العمل.</strong> القطاع أو نوع الشركة مكانه العنوان.</li></ul><p>أمثلة من العرض: <em>تحليل تسرّب العملاء في قطاع الاتصالات</em>؛ <em>أثر الحملات التسويقية في مبيعات المنتجات</em>؛ <em>تحسين إدارة المخزون لنشاط تجزئة</em>.</p>',
            '<ul><li><strong>مشخص باش.</strong> نه «تحلیل فروش»، بلکه «تحلیل عوامل مؤثر بر رشد فروش آنلاین در فصل سوم ۲۰۲۵».</li><li><strong>سؤال اصلی را نشان بده.</strong> «آیا تعامل در شبکه‌های اجتماعی می‌تواند تبدیل در وب‌سایت را پیش‌بینی کند؟»</li><li><strong>کوتاه نگهش دار.</strong> آموزنده، نه یک پاراگراف.</li><li><strong>زمینهٔ کسب‌وکار را بیاور.</strong> صنعت یا نوع شرکت جایش در عنوان است.</li></ul><p>مثال‌های اسلایدها: <em>تحلیل ریزش مشتری در صنعت مخابرات</em>؛ <em>اثر کمپین‌های بازاریابی بر فروش محصول</em>؛ <em>بهینه‌سازی مدیریت موجودی برای یک کسب‌وکار خرده‌فروشی</em>.</p>',
          ),
        },
      ],
    },
    {
      id: 'part-2-goals',
      navLabel: L('Part 2: Goals and outcomes', 'الجزء 2: الأهداف والنتائج', 'بخش ۲: هدف‌ها و نتایج'),
      sectionLabel: L('Section 05', 'القسم ٠٥', 'بخش ۰۵'),
      timeEst: L('3 min', '٣ دقائق', '۳ دقیقه'),
      headingHtml: L(
        '<h2>Part 2: goals and expected outcomes</h2><p class="standfirst">Goals are what you want to accomplish; expected outcomes are the specific, checkable things you will produce. Together they answer "so what?": why the analysis matters to the business.</p>',
        '<h2>الجزء 2: الأهداف والنتائج المتوقعة</h2><p class="standfirst">الأهداف هي ما تريد تحقيقه؛ والنتائج المتوقعة هي الأشياء المحددة القابلة للتحقق التي ستنتجها. معًا تجيبان عن سؤال "وماذا بعد؟": لماذا يهم التحليل العمل.</p>',
        '<h2>بخش ۲: هدف‌ها و نتایج مورد انتظار</h2><p class="standfirst">هدف‌ها چیزی‌اند که می‌خواهی به آن برسی؛ نتایج مورد انتظار چیزهای مشخص و قابل بررسی‌ای‌اند که تولید می‌کنی. با هم به «که چه؟» پاسخ می‌دهند: چرا این تحلیل برای کسب‌وکار مهم است.</p>',
      ),
      blocks: [
        {
          type: 'html',
          html: L(
            '<ul><li><strong>Start goals with "To…":</strong> to understand, to identify, to predict, to evaluate.</li><li><strong>Make outcomes measurable</strong> as far as you can at this stage: "the top 3–5 factors", "a chart comparing…", "a profile of the at-risk segment".</li><li><strong>Mix outcome types:</strong> trends or patterns, a model, an evaluation of a strategy, recommendations, visualizations.</li></ul>',
            '<ul><li><strong>ابدأ الأهداف بـ"أن…":</strong> أن نفهم، أن نحدد، أن نتنبأ، أن نقيّم.</li><li><strong>اجعل النتائج قابلة للقياس</strong> قدر الإمكان في هذه المرحلة: "أهم 3–5 عوامل"، "رسم يقارن…"، "ملف شريحة العملاء المعرّضين للخطر".</li><li><strong>نوّع أنواع النتائج:</strong> اتجاهات أو أنماط، نموذج، تقييم استراتيجية، توصيات، رسوم.</li></ul>',
            '<ul><li><strong>هدف‌ها را با «اینکه…» شروع کن:</strong> اینکه بفهمیم، شناسایی کنیم، پیش‌بینی کنیم، ارزیابی کنیم.</li><li><strong>نتایج را تا جایی که در این مرحله می‌شود قابل اندازه‌گیری کن:</strong> «۳ تا ۵ عامل اصلی»، «نموداری که مقایسه می‌کند…»، «نیم‌رخ گروه پرخطر».</li><li><strong>نوع نتایج را متنوع کن:</strong> روندها یا الگوها، یک مدل، ارزیابی یک راهبرد، توصیه‌ها، نمودارها.</li></ul>',
          ),
        },
        {
          type: 'box',
          variant: 'example',
          label: L('Example from the deck', 'مثال من العرض', 'مثال از اسلایدها'),
          html: L(
            '<p><strong>Analyzing Customer Churn in the Telecommunications Industry</strong></p><p><em>Goals:</em> to identify the key factors behind churn; to understand the characteristics of customers likely to churn; to inform retention strategies.</p><p><em>Expected outcomes:</em> a list of the top 3–5 churn factors; charts comparing churning and staying customers; a profile of the at-risk segment; recommendations for targeted retention.</p>',
            '<p><strong>تحليل تسرّب العملاء في قطاع الاتصالات</strong></p><p><em>الأهداف:</em> أن نحدد العوامل الأساسية وراء التسرّب؛ أن نفهم خصائص العملاء المرجّح تسرّبهم؛ أن ندعم استراتيجيات الاحتفاظ.</p><p><em>النتائج المتوقعة:</em> قائمة بأهم 3–5 عوامل للتسرّب؛ رسوم تقارن العملاء المغادرين بالباقين؛ ملف شريحة المعرّضين للخطر؛ توصيات لاحتفاظ موجّه.</p>',
            '<p><strong>تحلیل ریزش مشتری در صنعت مخابرات</strong></p><p><em>هدف‌ها:</em> اینکه عوامل اصلی ریزش را شناسایی کنیم؛ ویژگی‌های مشتریانی را که احتمالاً می‌روند بفهمیم؛ به راهبردهای حفظ مشتری کمک کنیم.</p><p><em>نتایج مورد انتظار:</em> فهرست ۳ تا ۵ عامل اصلی ریزش؛ نمودارهایی که مشتریان رفته و مانده را مقایسه می‌کنند؛ نیم‌رخ گروه پرخطر؛ توصیه‌هایی برای حفظ هدفمند.</p>',
          ),
        },
      ],
    },
    {
      id: 'part-3-swot',
      navLabel: L('Part 3: SWOT', 'الجزء 3: SWOT', 'بخش ۳: SWOT'),
      sectionLabel: L('Section 06', 'القسم ٠٦', 'بخش ۰۶'),
      timeEst: L('4 min', '٤ دقائق', '۴ دقیقه'),
      headingHtml: L(
        '<h2>Part 3: a SWOT analysis of your project</h2><p class="standfirst">SWOT looks at the project itself: what your pair can do well and where you will struggle (internal), and what outside factors can help or hurt (external). Write it near the end, when you know the data and your own skills.</p>',
        '<h2>الجزء 3: تحليل SWOT لمشروعك</h2><p class="standfirst">ينظر SWOT إلى المشروع نفسه: ما يستطيع فريقك إتقانه وأين ستواجهون صعوبة (داخلي)، وما العوامل الخارجية التي قد تساعد أو تضر (خارجي). اكتبه قرب النهاية، حين تعرفون البيانات ومهاراتكم.</p>',
        '<h2>بخش ۳: تحلیل SWOT پروژه‌ات</h2><p class="standfirst">SWOT به خود پروژه نگاه می‌کند: گروه شما در چه چیزی خوب است و کجا مشکل خواهد داشت (درونی)، و چه عوامل بیرونی‌ای می‌توانند کمک کنند یا آسیب بزنند (بیرونی). آن را نزدیک پایان بنویسید، وقتی داده و مهارت‌های خودتان را می‌شناسید.</p>',
      ),
      blocks: [
        {
          type: 'table',
          headers: [L('', '', ''), L('Questions to ask', 'أسئلة تطرحها', 'سؤال‌هایی که بپرسی'), L('Deck example (customer satisfaction, local e-commerce)', 'مثال العرض (رضا العملاء، متجر إلكتروني محلي)', 'مثال اسلایدها (رضایت مشتری، فروشگاه آنلاین محلی)')],
          rows: [
            [L('<strong>Strengths</strong> (internal, +)', '<strong>نقاط القوة</strong> (داخلي، +)', '<strong>نقاط قوت</strong> (درونی، +)'), L('Which skills and tools are you good at? What data access do you have? What motivates you?', 'ما المهارات والأدوات التي تتقنها؟ ما الذي يمكنك الوصول إليه من بيانات؟ ما الذي يحفّزك؟', 'در چه مهارت‌ها و ابزارهایی خوبی؟ به چه داده‌هایی دسترسی داری؟ چه چیزی انگیزه‌ات می‌دهد؟'), L('Strong at visualization; understands segmentation; motivated', 'متمكّن من التصوير؛ يفهم التقسيم؛ متحمّس', 'در مصورسازی قوی؛ تقسیم‌بندی را می‌فهمد؛ باانگیزه')],
            [L('<strong>Weaknesses</strong> (internal, −)', '<strong>نقاط الضعف</strong> (داخلي، −)', '<strong>نقاط ضعف</strong> (درونی، −)'), L('Which skills are you still building? Which tools are new? Will cleaning be hard? How is your time management?', 'ما المهارات التي ما زلت تبنيها؟ ما الأدوات الجديدة؟ هل سيكون التنظيف صعبًا؟ كيف إدارتك للوقت؟', 'چه مهارت‌هایی هنوز در حال ساخت‌اند؟ کدام ابزارها تازه‌اند؟ پاک‌سازی سخت خواهد بود؟ مدیریت زمانت چطور است؟'), L('Little Python cleaning experience; basic statistics; other coursework', 'خبرة قليلة في التنظيف بـ Python؛ إحصاء أساسي؛ مقررات أخرى', 'تجربهٔ کم در پاک‌سازی با Python؛ آمار پایه؛ درس‌های دیگر')],
            [L('<strong>Opportunities</strong> (external, +)', '<strong>الفرص</strong> (خارجي، +)', '<strong>فرصت‌ها</strong> (بیرونی، +)'), L('Is there public data, a new tool to learn, a real business to show it to, classmates to learn from?', 'هل توجد بيانات عامة، أو أداة جديدة للتعلّم، أو نشاط حقيقي لعرضها عليه، أو زملاء للتعلّم منهم؟', 'دادهٔ عمومی، ابزار تازه برای یادگیری، کسب‌وکار واقعی برای نشان دادن یا هم‌کلاسی برای یادگیری هست؟'), L('Access to real review data; a chance to learn Python; could present to the business', 'وصول إلى بيانات مراجعات حقيقية؛ فرصة لتعلّم Python؛ إمكانية العرض على النشاط', 'دسترسی به دادهٔ واقعی نظرها؛ فرصت یادگیری Python؛ امکان ارائه به کسب‌وکار')],
            [L('<strong>Threats</strong> (external, −)', '<strong>التهديدات</strong> (خارجي، −)', '<strong>تهدیدها</strong> (بیرونی، −)'), L('Could the data be incomplete or biased? Deadlines? Software problems? Other commitments?', 'هل قد تكون البيانات ناقصة أو منحازة؟ مواعيد نهائية؟ مشكلات برمجيات؟ التزامات أخرى؟', 'آیا داده ممکن است ناقص یا سوگیرانه باشد؟ ضرب‌الاجل؟ مشکل نرم‌افزار؟ تعهدات دیگر؟'), L('Incomplete or biased reviews; tight deadline; technical issues', 'مراجعات ناقصة أو منحازة؛ موعد ضيق؛ مشكلات تقنية', 'نظرهای ناقص یا سوگیرانه؛ ضرب‌الاجل فشرده؛ مشکلات فنی')],
          ],
        },
        {
          type: 'box',
          variant: 'keypoint',
          label: L('Key point', 'نقطة أساسية', 'نکتهٔ کلیدی'),
          html: L(
            '<p>Present it as four bulleted lists, and be concrete: "our dataset has 11 blank TotalCharges values" is a weakness you can plan around; "data may be bad" is not. Your Week 4 profile is a ready-made source of weaknesses and threats.</p>',
            '<p>اعرضه كأربع قوائم نقطية، وكن محددًا: "في بياناتنا 11 قيمة فارغة في TotalCharges" نقطة ضعف يمكنك التخطيط حولها؛ أما "قد تكون البيانات سيئة" فليست كذلك. فحص الأسبوع 4 مصدر جاهز لنقاط الضعف والتهديدات.</p>',
            '<p>آن را به‌صورت چهار فهرست نقطه‌ای بنویس و مشخص باش: «دادهٔ ما ۱۱ مقدار خالی در TotalCharges دارد» ضعفی است که می‌شود برایش برنامه ریخت؛ «داده ممکن است بد باشد» نیست. پروفایل هفتهٔ ۴ منبع آماده‌ای برای ضعف‌ها و تهدیدهاست.</p>',
          ),
        },
      ],
    },
    {
      id: 'part-4-tools',
      navLabel: L('Part 4: Tools', 'الجزء 4: الأدوات', 'بخش ۴: ابزارها'),
      sectionLabel: L('Section 07', 'القسم ٠٧', 'بخش ۰۷'),
      timeEst: L('4 min', '٤ دقائق', '۴ دقیقه'),
      headingHtml: L(
        '<h2>Part 4: your tools and their competitive advantages</h2><p class="standfirst">State which tool(s) you used for cleaning, charts and analysis, and why. Then briefly compare the main analytics tools, to show you know the wider landscape even where you didn\'t use them.</p>',
        '<h2>الجزء 4: أدواتك ومزاياها التنافسية</h2><p class="standfirst">اذكر الأداة أو الأدوات التي استخدمتها للتنظيف والرسوم والتحليل، ولماذا. ثم قارن باختصار بين أدوات التحليل الرئيسية، لتُظهر معرفتك بالمشهد الأوسع حتى حيث لم تستخدمها.</p>',
        '<h2>بخش ۴: ابزارهایت و مزیت‌های رقابتی‌شان</h2><p class="standfirst">بگو برای پاک‌سازی، نمودار و تحلیل از کدام ابزار(ها) استفاده کردی و چرا. سپس ابزارهای اصلی تحلیل را کوتاه مقایسه کن تا نشان دهی چشم‌انداز وسیع‌تر را می‌شناسی، حتی جایی که از آن‌ها استفاده نکردی.</p>',
      ),
      blocks: [
        {
          type: 'table',
          headers: [L('Tool', 'الأداة', 'ابزار'), L('Strengths', 'نقاط القوة', 'نقاط قوت'), L('Limits', 'الحدود', 'محدودیت‌ها'), L('Cost / learning curve', 'التكلفة / منحنى التعلّم', 'هزینه / منحنی یادگیری')],
          rows: [
            [L('Excel', 'Excel', 'Excel'), L('Everyone has it; fast for cleaning, pivot tables, charts and the Data Analysis ToolPak (regression, tests)', 'متاح للجميع؛ سريع للتنظيف والجداول المحورية والرسوم وحزمة Data Analysis ‏(الانحدار والاختبارات)', 'همه دارند؛ برای پاک‌سازی، جدول محوری، نمودار و Data Analysis ToolPak (رگرسیون، آزمون) سریع است'), L('Slows down on very large files; manual steps are hard to repeat', 'يبطؤ مع الملفات الكبيرة جدًا؛ والخطوات اليدوية صعبة التكرار', 'با فایل‌های خیلی بزرگ کند می‌شود؛ تکرار گام‌های دستی سخت است'), L('Usually already licensed; easiest to start', 'مرخّص غالبًا؛ الأسهل للبدء', 'معمولاً از قبل مجوز دارد؛ آسان‌ترین برای شروع')],
            [L('Power BI', 'Power BI', 'Power BI'), L('Repeatable cleaning in Power Query, data modelling with DAX, interactive dashboards, fits the Microsoft ecosystem', 'تنظيف قابل للتكرار في Power Query، ونمذجة بيانات بـ DAX، ولوحات تفاعلية، ويتكامل مع منظومة Microsoft', 'پاک‌سازی تکرارپذیر در Power Query، مدل‌سازی داده با DAX، داشبورد تعاملی، هماهنگ با اکوسیستم Microsoft'), L('Desktop app is Windows-only; advanced statistics are limited', 'تطبيق سطح المكتب لنظام Windows فقط؛ والإحصاء المتقدم محدود', 'نسخهٔ دسکتاپ فقط برای Windows است؛ آمار پیشرفته محدود است'), L('Free desktop version; easy for Excel users', 'نسخة سطح مكتب مجانية؛ سهل لمستخدمي Excel', 'نسخهٔ دسکتاپ رایگان؛ برای کاربران Excel آسان')],
            [L('Tableau', 'Tableau', 'Tableau'), L('Intuitive drag-and-drop, attractive interactive visualizations, strong in-memory performance and sharing', 'سحب وإفلات سهل، ورسوم تفاعلية جذابة، وأداء قوي في الذاكرة ومشاركة', 'کشیدن و رها کردن ساده، مصورسازی تعاملی جذاب، عملکرد قوی در حافظه و اشتراک‌گذاری'), L('Basic data preparation; fewer statistics', 'تحضير بيانات أساسي؛ وإحصاء أقل', 'آماده‌سازی دادهٔ پایه؛ آمار کمتر'), L('Higher licence cost; quick to learn for charts', 'تكلفة ترخيص أعلى؛ سريع التعلّم للرسوم', 'هزینهٔ مجوز بالاتر؛ برای نمودار سریع یاد گرفته می‌شود')],
            [L('Python (pandas)', 'Python ‏(pandas)', 'Python ‏(pandas)'), L('Handles large data, every step is code you can re-run, huge library of analysis and charting packages', 'يتعامل مع بيانات كبيرة، وكل خطوة كود يمكن إعادة تشغيله، ومكتبة ضخمة من حزم التحليل والرسم', 'دادهٔ بزرگ را مدیریت می‌کند، هر گام کدی است که دوباره اجرا می‌شود، کتابخانهٔ عظیمی از بسته‌های تحلیل و نمودار'), L('Requires coding', 'يتطلب البرمجة', 'برنامه‌نویسی لازم دارد'), L('Free (Colab in the browser); steeper start', 'مجاني (Colab في المتصفح)؛ بداية أصعب', 'رایگان (Colab در مرورگر)؛ شروع سخت‌تر')],
            [L('R', 'R', 'R'), L('Built for statistics and graphics (ggplot2); vast range of statistical packages; widely used in research', 'مصمم للإحصاء والرسوم (ggplot2)؛ مجموعة واسعة من الحزم الإحصائية؛ مستخدم بكثرة في البحث', 'برای آمار و گرافیک ساخته شده (ggplot2)؛ بسته‌های آماری بسیار؛ در پژوهش پرکاربرد'), L('Requires coding; less common in business dashboards', 'يتطلب البرمجة؛ أقل شيوعًا في لوحات الأعمال', 'برنامه‌نویسی لازم دارد؛ در داشبوردهای کسب‌وکار کمتر رایج است'), L('Free and open source; steepest learning curve', 'مجاني ومفتوح المصدر؛ أصعب منحنى تعلّم', 'رایگان و متن‌باز؛ سخت‌ترین منحنی یادگیری')],
          ],
        },
        {
          type: 'html',
          html: L(
            '<p>In your document, write 2–3 sentences on the tool(s) you chose for each stage (for example "Excel for cleaning, Power BI for charts, Python for the regression") and why they fit your case, then summarize the table in your own words.</p>',
            '<p>في مستندك، اكتب 2–3 جمل عن الأداة أو الأدوات التي اخترتها لكل مرحلة (مثل "Excel للتنظيف، وPower BI للرسوم، وPython للانحدار") ولماذا تناسب حالتك، ثم لخّص الجدول بكلماتك.</p>',
            '<p>در سندت ۲ تا ۳ جمله دربارهٔ ابزار(هایی) که برای هر مرحله انتخاب کردی بنویس (مثلاً «Excel برای پاک‌سازی، Power BI برای نمودار، Python برای رگرسیون») و اینکه چرا با مورد شما جور است، سپس جدول را با کلمات خودت خلاصه کن.</p>',
          ),
        },
      ],
    },
    {
      id: 'part-5-readme',
      navLabel: L('Part 5: README', 'الجزء 5: README', 'بخش ۵: README'),
      sectionLabel: L('Section 08', 'القسم ٠٨', 'بخش ۰۸'),
      timeEst: L('4 min', '٤ دقائق', '۴ دقیقه'),
      headingHtml: L(
        '<h2>Part 5: the README, your project\'s user manual</h2><p class="standfirst">A README explains what the project is, how the files are organized, and how someone else (or you in six months) can understand or reproduce the analysis. Write it in Markdown (.md).</p>',
        '<h2>الجزء 5: ملف README، دليل استخدام مشروعك</h2><p class="standfirst">يشرح README ما هو المشروع، وكيف نُظّمت الملفات، وكيف يستطيع شخص آخر (أو أنت بعد ستة أشهر) فهم التحليل أو إعادة إنتاجه. اكتبه بصيغة Markdown ‏(.md).</p>',
        '<h2>بخش ۵: README، دفترچهٔ راهنمای پروژه‌ات</h2><p class="standfirst">README توضیح می‌دهد پروژه چیست، فایل‌ها چگونه سازمان یافته‌اند و کس دیگری (یا خودت شش ماه بعد) چطور می‌تواند تحلیل را بفهمد یا بازتولید کند. آن را با Markdown ‏(.md) بنویس.</p>',
      ),
      blocks: [
        { type: 'code', code: readmeTemplate },
        {
          type: 'box',
          variant: 'keypoint',
          label: L('You already wrote most of it', 'لقد كتبت معظمه بالفعل', 'بیشترش را از قبل نوشته‌ای'),
          html: L(
            '<p>Each README heading is filled by a homework (Section 2): Overview and Data from Week 4, Data cleaning from Week 5, Analysis and Key findings from Weeks 6–9, Recommendations from Week 10. At the end you copy them in, add the project structure, and make sure every chart and file the README mentions is actually in the folder.</p>',
            '<p>يملأ واجبٌ كلَّ عنوان في README ‏(القسم 2): Overview وData من الأسبوع 4، وData cleaning من الأسبوع 5، وAnalysis وKey findings من الأسابيع 6–9، وRecommendations من الأسبوع 10. في النهاية تنسخها، وتضيف هيكل المشروع، وتتأكد أن كل رسم وملف يذكره README موجود فعلًا في المجلد.</p>',
            '<p>هر عنوان README را یک تکلیف پر می‌کند (بخش ۲): Overview و Data از هفتهٔ ۴، Data cleaning از هفتهٔ ۵، Analysis و Key findings از هفته‌های ۶ تا ۹، Recommendations از هفتهٔ ۱۰. در پایان آن‌ها را کپی می‌کنی، ساختار پروژه را اضافه می‌کنی و مطمئن می‌شوی هر نمودار و فایلی که README نام می‌برد واقعاً در پوشه هست.</p>',
          ),
        },
      ],
    },
    {
      id: 'hand-in',
      navLabel: L('Hand-in checklist', 'قائمة التسليم', 'فهرست تحویل'),
      sectionLabel: L('Section 09', 'القسم ٠٩', 'بخش ۰۹'),
      timeEst: L('2 min', '٢ دقيقتان', '۲ دقیقه'),
      headingHtml: L(
        '<h2>Hand-in checklist</h2><p class="standfirst">Everything lives in your pair\'s shared Drive folder. Before the deadline, check it against this list.</p>',
        '<h2>قائمة التسليم</h2><p class="standfirst">كل شيء في مجلد Drive المشترك لفريقكما. قبل الموعد النهائي، طابقه مع هذه القائمة.</p>',
        '<h2>فهرست تحویل</h2><p class="standfirst">همه چیز در پوشهٔ مشترک Drive گروه شماست. پیش از ضرب‌الاجل، آن را با این فهرست مقایسه کنید.</p>',
      ),
      blocks: [
        {
          type: 'takeaways',
          label: L('Your folder contains', 'يحتوي مجلدكما على', 'پوشهٔ شما شامل این‌هاست'),
          items: [
            L('The project document with parts 1–4: title, goals and outcomes, SWOT, tools', 'مستند المشروع بالأجزاء 1–4: العنوان، والأهداف والنتائج، وSWOT، والأدوات', 'سند پروژه با بخش‌های ۱ تا ۴: عنوان، هدف‌ها و نتایج، SWOT، ابزارها'),
            L('README.md (part 5), complete and matching the files', 'ملف README.md ‏(الجزء 5)، مكتمل ومطابق للملفات', 'README.md (بخش ۵)، کامل و هماهنگ با فایل‌ها'),
            L('data/: the raw file and the clean file', 'data/: الملف الخام والملف النظيف', 'data/: فایل خام و فایل تمیز'),
            L('visualizations/: every chart the README mentions', 'visualizations/: كل رسم يذكره README', 'visualizations/: همهٔ نمودارهایی که README نام می‌برد'),
            L('code/ (if you used Python or another language)', 'code/ (إن استخدمتما Python أو لغة أخرى)', 'code/ (اگر از Python یا زبان دیگری استفاده کردید)'),
            L('The presentation slides (Week 10)', 'شرائح العرض (الأسبوع 10)', 'اسلایدهای ارائه (هفتهٔ ۱۰)'),
            L('Both partners\' names on the document, the README and the slides', 'اسما الشريكين على المستند وREADME والشرائح', 'نام هر دو نفر روی سند، README و اسلایدها'),
          ],
        },
        {
          type: 'html',
          html: L(
            '<p>The deadline will be announced by your mentor. Best of luck: believe in yourselves, you\'ve got this.</p>',
            '<p>سيُعلن مرشدكما الموعد النهائي. بالتوفيق: آمنا بنفسيكما، أنتما قادران على ذلك.</p>',
            '<p>ضرب‌الاجل را منتورتان اعلام می‌کند. موفق باشید: به خودتان باور داشته باشید، از پسش برمی‌آیید.</p>',
          ),
        },
      ],
    },
  ],
}
