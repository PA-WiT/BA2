// The Women in Tech program's official "Final Project Guidelines" (5 pages, by the WIT Program Manager), saved as
// public/originals/final-project-guidelines.pdf and linked for download. This page explains them in plain words for a
// BA2 (business analytics) project: the guidelines are written for every course in the program, so the "for your BA2
// project" column and the technical-requirements reading are our interpretation, labelled as such on the page.
// Everything else (word counts, slide list, timeline, weights, video lengths, naming formats, FAQ answers) is copied
// from the PDF. The proposal example's length (92 words) was counted by script.
// ar/fa are draft translations awaiting native review. File-name formats stay English.
import type { Block, Localized, Question, Week } from '../types'

const t = (en: string, ar: string, fa: string): Localized => ({ en, ar, fa })
const W = t
const html = (en: string, ar: string, fa: string): Block => ({ type: 'html', html: t(en, ar, fa) })
const code = (c: string): Block => ({ type: 'code', code: c })
const box = (variant: 'analogy' | 'mistake' | 'keypoint' | 'example', label: Localized, en: string, ar: string, fa: string): Block => ({
  type: 'box',
  variant,
  label,
  html: t(en, ar, fa),
})
const analogy = (en: string, ar: string, fa: string): Block => box('analogy', t('Analogy', 'تشبيه', 'تشبیه'), en, ar, fa)
const recap = (...items: Localized[]): Block => ({ type: 'takeaways', label: t('In one minute', 'في دقيقة واحدة', 'در یک دقیقه'), items })
const exercise = (id: string): Block => ({ type: 'exercise', questionId: id })
const pdf = '/originals/final-project-guidelines.pdf'
const pastProjects = 'https://www.paper-airplanes.org/student-projects'

const questions: Question[] = [
  {
    id: 'fpg-q001',
    weekId: 'final-project-guidelines',
    topic: 'grading',
    answer: 1,
    prompt: t(
      'How much of the grade is presentation and documentation?',
      'كم من الدرجة للعرض والتوثيق؟',
      'چه بخشی از نمره برای ارائه و مستندسازی است؟',
    ),
    options: [
      t('20%', '20%', '۲۰٪'),
      t('40%, as much as the technical work', '40%، بقدر العمل التقني', '۴۰٪، به اندازهٔ کار فنی'),
      t('Nothing: only the analysis counts', 'لا شيء: التحليل وحده يُحتسب', 'هیچ: فقط تحلیل حساب می‌شود'),
    ],
  },
  {
    id: 'fpg-q002',
    weekId: 'final-project-guidelines',
    topic: 'submitting',
    answer: 0,
    prompt: t(
      'You work in a pair. How long can your video be?',
      'تعمل ضمن فريق من شخصين. كم يمكن أن يكون طول الفيديو؟',
      'در یک گروه دونفره کار می‌کنی. ویدیوی شما حداکثر چقدر می‌تواند باشد؟',
    ),
    options: [
      t('Up to 7 minutes (a solo project: 3–5 minutes)', 'حتى 7 دقائق (المشروع الفردي: 3–5 دقائق)', 'تا ۷ دقیقه (پروژهٔ فردی: ۳ تا ۵ دقیقه)'),
      t('Exactly 1 minute', 'دقيقة واحدة بالضبط', 'دقیقاً ۱ دقیقه'),
      t('As long as you like', 'بالطول الذي تريده', 'هر قدر که بخواهی'),
    ],
  },
  {
    id: 'fpg-q003',
    weekId: 'final-project-guidelines',
    topic: 'naming',
    answer: 2,
    prompt: t(
      'Which file name follows the rules for your slides?',
      'أي اسم ملف يتبع القواعد لشرائحك؟',
      'کدام نام فایل برای اسلایدهایت طبق قاعده است؟',
    ),
    options: [
      t('my final slides v3.pptx', 'my final slides v3.pptx', 'my final slides v3.pptx'),
      t('Business Analytics 2-Lara Khoury-ppt', 'Business Analytics 2-Lara Khoury-ppt', 'Business Analytics 2-Lara Khoury-ppt'),
      t('ppt-F26-Business Analytics 2-Lara Khoury', 'ppt-F26-Business Analytics 2-Lara Khoury', 'ppt-F26-Business Analytics 2-Lara Khoury'),
    ],
  },
  {
    id: 'fpg-q004',
    weekId: 'final-project-guidelines',
    topic: 'rules',
    answer: 1,
    prompt: t(
      'What do the guidelines say about AI?',
      'ماذا تقول الإرشادات عن الذكاء الاصطناعي؟',
      'راهنما دربارهٔ هوش مصنوعی چه می‌گوید؟',
    ),
    options: [
      t('Let AI write the code and the README to save time', 'دع الذكاء الاصطناعي يكتب الكود وملف README لتوفير الوقت', 'بگذار هوش مصنوعی کد و README را بنویسد تا وقت صرفه‌جویی شود'),
      t('Use it to understand and to get unstuck; AI-written code or documents are rejected', 'استخدمه للفهم وللخروج من التعثر؛ يُرفض الكود أو الوثائق المكتوبة بالذكاء الاصطناعي', 'از آن برای فهمیدن و گیر نکردن استفاده کن؛ کد یا سندی که هوش مصنوعی نوشته رد می‌شود'),
      t('AI is fine as long as the result looks professional', 'الذكاء الاصطناعي مقبول ما دامت النتيجة تبدو احترافية', 'هوش مصنوعی اشکالی ندارد، به شرطی که نتیجه حرفه‌ای به نظر برسد'),
    ],
  },
]

export const finalProjectGuidelines: Week = {
  id: 'final-project-guidelines',
  originalPdf: pdf,
  order: 100,
  cover: {
    kicker: t('Business Analytics 2 · Final Project', 'تحليلات الأعمال 2 · المشروع النهائي', 'تحلیل کسب‌وکار ۲ · پروژهٔ نهایی'),
    titleHtml: t(
      '<h1>Project Guidelines:<em>What to Hand In, and How It Is Graded</em></h1><p class="lede">The Women in Tech program\'s official rules for every final project, explained in plain words for your business analytics project: the proposal, the README, the slides, the video, the deadline, the grading and the file names.</p>',
      '<h1>إرشادات المشروع:<em>ماذا تسلّم، وكيف يُقيَّم</em></h1><p class="lede">القواعد الرسمية لبرنامج Women in Tech لكل مشروع نهائي، مشروحة بكلمات بسيطة لمشروع تحليلات الأعمال: المقترح، وملف README، والشرائح، والفيديو، والموعد النهائي، والتقييم، وأسماء الملفات.</p>',
      '<h1>راهنمای پروژه:<em>چه تحویل بدهی و چطور نمره می‌گیرد</em></h1><p class="lede">قانون‌های رسمی برنامهٔ Women in Tech برای هر پروژهٔ نهایی، به زبان ساده برای پروژهٔ تحلیل کسب‌وکار تو: پیشنهاد، README، اسلایدها، ویدیو، مهلت، نمره‌دهی و نام فایل‌ها.</p>',
    ),
    timeEstimate: t('≈ 15 min to read', '≈ ١٥ دقيقة للقراءة', '≈ ۱۵ دقیقه خواندن'),
  },
  questions,
  sections: [
    // ---------- 1. Overview ----------
    {
      id: 'overview',
      navLabel: W('Overview', 'نظرة عامة', 'مرور کلی'),
      sectionLabel: W('Section 01', 'القسم ٠١', 'بخش ۰۱'),
      timeEst: W('2 min', '٢ دقيقتان', '۲ دقیقه'),
      headingHtml: t(
        '<h2>Overview: four things to hand in</h2><p class="standfirst">These are the program\'s rules for every final project, in every course. This page explains what they mean for your BA2 project.</p>',
        '<h2>نظرة عامة: أربعة أشياء تسلّمها</h2><p class="standfirst">هذه قواعد البرنامج لكل مشروع نهائي في كل مقرر. وتشرح هذه الصفحة ما تعنيه لمشروعك في BA2.</p>',
        '<h2>مرور کلی: چهار چیز برای تحویل</h2><p class="standfirst">این‌ها قانون‌های برنامه برای هر پروژهٔ نهایی در هر درس‌اند. این صفحه توضیح می‌دهد برای پروژهٔ BA2 تو چه معنایی دارند.</p>',
      ),
      blocks: [
        html(
          `<p><a href="${pdf}" download><strong>Download the official guidelines (PDF)</strong></a>. If anything on this page and the PDF ever disagree, the PDF wins.</p><ol><li><strong>A project proposal</strong>: 80–100 words.</li><li><strong>A README</strong>: the project's user manual.</li><li><strong>A slide presentation</strong>: about 15 slides.</li><li><strong>A video</strong> of you presenting: 3–5 minutes.</li></ol><p>Want to see the level that is expected? Look at <a href="${pastProjects}" target="_blank" rel="noopener">past students' projects</a>.</p>`,
          `<p><a href="${pdf}" download><strong>نزّل الإرشادات الرسمية (PDF)</strong></a>. وإن اختلفت هذه الصفحة عن ملف PDF يومًا، فالحكم لملف PDF.</p><ol><li><strong>مقترح المشروع</strong>: 80–100 كلمة.</li><li><strong>ملف README</strong>: دليل استخدام المشروع.</li><li><strong>عرض شرائح</strong>: نحو 15 شريحة.</li><li><strong>فيديو</strong> تعرض فيه مشروعك: 3–5 دقائق.</li></ol><p>تريد أن ترى المستوى المتوقع؟ انظر إلى <a href="${pastProjects}" target="_blank" rel="noopener">مشاريع الطلاب السابقين</a>.</p>`,
          `<p><a href="${pdf}" download><strong>راهنمای رسمی را دانلود کن (PDF)</strong></a>. اگر روزی این صفحه با PDF فرق داشت، PDF ملاک است.</p><ol><li><strong>پیشنهاد پروژه</strong>: ۸۰ تا ۱۰۰ واژه.</li><li><strong>یک README</strong>: دفترچهٔ راهنمای پروژه.</li><li><strong>یک ارائهٔ اسلایدی</strong>: حدود ۱۵ اسلاید.</li><li><strong>یک ویدیو</strong> از ارائهٔ خودت: ۳ تا ۵ دقیقه.</li></ol><p>می‌خواهی سطح مورد انتظار را ببینی؟ به <a href="${pastProjects}" target="_blank" rel="noopener">پروژه‌های دانشجویان قبلی</a> نگاه کن.</p>`,
        ),
        analogy(
          '<p>It is like opening a restaurant for one night: you write the <strong>menu</strong> (the proposal), keep the <strong>recipe book</strong> (the README), <strong>serve the meal</strong> to guests (the slides) and <strong>film it</strong> for people who could not come (the video).</p>',
          '<p>الأمر مثل افتتاح مطعم لليلة واحدة: تكتب <strong>قائمة الطعام</strong> (المقترح)، وتحتفظ <strong>بكتاب الوصفات</strong> (README)، و<strong>تقدّم الوجبة</strong> للضيوف (الشرائح)، و<strong>تصوّرها</strong> لمن لم يستطع الحضور (الفيديو).</p>',
          '<p>مثل باز کردن یک رستوران برای یک شب است: <strong>منو</strong> را می‌نویسی (پیشنهاد)، <strong>دفتر دستور پخت</strong> را نگه می‌داری (README)، <strong>غذا را سرو می‌کنی</strong> (اسلایدها) و برای کسانی که نیامدند <strong>فیلمش را می‌گیری</strong> (ویدیو).</p>',
        ),
        box(
          'keypoint',
          W('Needed for your certificate', 'شرط للحصول على شهادتك', 'لازم برای گواهی‌نامه‌ات'),
          '<p>Finishing and submitting the final project is <strong>required</strong> to receive your Women in Tech certificate. Students who do not complete it cannot get the certificate.</p>',
          '<p>إنهاء المشروع النهائي وتسليمه <strong>إلزامي</strong> للحصول على شهادة Women in Tech. ومن لا يُكمله لا يحصل على الشهادة.</p>',
          '<p>تمام کردن و تحویل پروژهٔ نهایی برای گرفتن گواهی‌نامهٔ Women in Tech <strong>الزامی</strong> است. کسی که آن را کامل نکند گواهی‌نامه نمی‌گیرد.</p>',
        ),
      ],
    },
    // ---------- 2. Proposal ----------
    {
      id: 'proposal',
      navLabel: W('The proposal', 'المقترح', 'پیشنهاد'),
      sectionLabel: W('Section 02', 'القسم ٠٢', 'بخش ۰۲'),
      timeEst: W('2 min', '٢ دقيقتان', '۲ دقیقه'),
      headingHtml: t(
        '<h2>The proposal: your project in 80–100 words</h2><p class="standfirst">A short description that answers four questions: what problem, for whom, how, and with which tools.</p>',
        '<h2>المقترح: مشروعك في 80–100 كلمة</h2><p class="standfirst">وصف قصير يجيب عن أربعة أسئلة: أي مشكلة، ولمن، وكيف، وبأي أدوات.</p>',
        '<h2>پیشنهاد: پروژه‌ات در ۸۰ تا ۱۰۰ واژه</h2><p class="standfirst">یک توضیح کوتاه که به چهار سؤال جواب می‌دهد: چه مسئله‌ای، برای چه کسی، چطور، و با چه ابزاری.</p>',
      ),
      blocks: [
        html(
          '<ul><li><strong>The problem</strong> your project addresses</li><li><strong>The target audience</strong>: who will use the result</li><li><strong>What you will do</strong>, in one or two sentences</li><li><strong>The technologies</strong> you plan to use</li></ul>',
          '<ul><li><strong>المشكلة</strong> التي يعالجها مشروعك</li><li><strong>الجمهور المستهدف</strong>: من سيستخدم النتيجة</li><li><strong>ما ستفعله</strong>، في جملة أو جملتين</li><li><strong>التقنيات</strong> التي تخطط لاستخدامها</li></ul>',
          '<ul><li><strong>مسئله‌ای</strong> که پروژه‌ات حل می‌کند</li><li><strong>مخاطب هدف</strong>: چه کسی از نتیجه استفاده می‌کند</li><li><strong>کاری که می‌کنی</strong>، در یک یا دو جمله</li><li><strong>فناوری‌هایی</strong> که می‌خواهی به کار ببری</li></ul>',
        ),
        box(
          'example',
          W('A jam stand proposal (92 words)', 'مقترح كشك المربى (92 كلمة)', 'پیشنهاد غرفهٔ مربا (۹۲ واژه)'),
          '<p><em>Every Saturday a small jam stand at a city market has to decide whether to put out a free tasting table, which costs jam and the owner\'s time. This project asks one question: does tasting really sell more jars? The target audience is the stand owner and other small market sellers. Using 20 Saturdays of sales records, I clean the data in Excel, chart sales with and without tasting, fit a regression of jars on visitors and tasting, and test the difference with a t-test. Technologies: Excel, Python (pandas, statsmodels) and PowerPoint.</em></p>',
          '<p><em>كل سبت، على كشك مربى صغير في سوق المدينة أن يقرر هل يضع طاولة تذوق مجانية تكلّف مربى ووقت المالك. يطرح هذا المشروع سؤالًا واحدًا: هل يبيع التذوق برطمانات أكثر فعلًا؟ الجمهور المستهدف هو مالك الكشك وباعة الأسواق الصغار الآخرون. باستخدام سجلات مبيعات 20 سبتًا، أنظّف البيانات في Excel، وأرسم المبيعات مع التذوق ودونه، وأطبّق انحدارًا للبرطمانات على الزوار والتذوق، وأختبر الفرق باختبار t. التقنيات: Excel وPython ‏(pandas وstatsmodels) وPowerPoint.</em></p><p>(النص الإنجليزي 92 كلمة؛ اكتب مقترحك باللغة التي يطلبها مرشدك.)</p>',
          '<p><em>هر شنبه یک غرفهٔ کوچک مربا در بازار شهر باید تصمیم بگیرد که میز مزه‌کردن رایگان بگذارد یا نه؛ میزی که مربا و وقت صاحب غرفه را می‌گیرد. این پروژه یک سؤال می‌پرسد: آیا مزه‌کردن واقعاً شیشهٔ بیشتری می‌فروشد؟ مخاطب هدف صاحب غرفه و دیگر فروشنده‌های کوچک بازار است. با سوابق فروش ۲۰ شنبه، داده را در Excel تمیز می‌کنم، فروش با و بدون مزه‌کردن را نمودار می‌کنم، رگرسیون شیشه بر بازدیدکننده و مزه‌کردن را برازش می‌کنم و تفاوت را با آزمون t می‌سنجم. فناوری‌ها: Excel، Python ‏(pandas، statsmodels) و PowerPoint.</em></p><p>(متن انگلیسی ۹۲ واژه است؛ پیشنهادت را به زبانی بنویس که منتورت می‌خواهد.)</p>',
        ),
        recap(
          W('80–100 words: problem, audience, what you will do, tools.', '80–100 كلمة: المشكلة، الجمهور، ما ستفعله، الأدوات.', '۸۰ تا ۱۰۰ واژه: مسئله، مخاطب، کاری که می‌کنی، ابزارها.'),
        ),
      ],
    },
    // ---------- 3. README ----------
    {
      id: 'readme',
      navLabel: W('The README', 'ملف README', 'README'),
      sectionLabel: W('Section 03', 'القسم ٠٣', 'بخش ۰۳'),
      timeEst: W('2 min', '٢ دقيقتان', '۲ دقیقه'),
      headingHtml: t(
        '<h2>The README: your project\'s user manual</h2><p class="standfirst">A short document that tells a stranger what the project is and how to use it.</p>',
        '<h2>ملف README: دليل استخدام مشروعك</h2><p class="standfirst">وثيقة قصيرة تخبر شخصًا غريبًا ما هو المشروع وكيف يستخدمه.</p>',
        '<h2>README: دفترچهٔ راهنمای پروژه‌ات</h2><p class="standfirst">یک سند کوتاه که به یک غریبه می‌گوید پروژه چیست و چطور از آن استفاده کند.</p>',
      ),
      blocks: [
        {
          type: 'table',
          headers: [W('The guidelines ask for', 'تطلب الإرشادات', 'راهنما می‌خواهد'), W('In a BA2 project', 'في مشروع BA2', 'در یک پروژهٔ BA2')],
          rows: [
            [W('Project title and description', 'عنوان المشروع ووصفه', 'عنوان و توضیح پروژه'), W('Your title and the proposal', 'عنوانك والمقترح', 'عنوانت و پیشنهاد')],
            [W('Installation instructions', 'تعليمات التثبيت', 'دستور نصب'), W('Which files to open, and which tools are needed (Excel, or Python and its packages)', 'أي الملفات تُفتح، وما الأدوات اللازمة (Excel، أو Python وحزمه)', 'کدام فایل‌ها را باز کنند و چه ابزاری لازم است (Excel، یا Python و بسته‌هایش)')],
            [W('Usage instructions', 'تعليمات الاستخدام', 'دستور استفاده'), W('In which order to open or run them to repeat your analysis', 'بأي ترتيب تُفتح أو تُشغّل لتكرار تحليلك', 'به چه ترتیبی باز یا اجرایشان کنند تا تحلیلت تکرار شود')],
            [W('Technologies used', 'التقنيات المستخدمة', 'فناوری‌های به‌کاررفته'), W('Excel, Python, Power BI…', 'Excel وPython وPower BI…', 'Excel، Python، Power BI…')],
            [W('Project structure', 'هيكل المشروع', 'ساختار پروژه'), W('The folders: data, visualizations, code, slides', 'المجلدات: البيانات، والرسوم، والكود، والشرائح', 'پوشه‌ها: داده، نمودارها، کد، اسلایدها')],
            [W('Future improvements', 'تحسينات مستقبلية', 'بهبودهای آینده'), W('What you would add with more time or data (your "limits" from Week 8)', 'ما ستضيفه بوقت أو بيانات أكثر ("الحدود" من الأسبوع 8)', 'آنچه با وقت یا دادهٔ بیشتر اضافه می‌کردی («محدودیت‌ها» از هفتهٔ ۸)')],
          ],
        },
        box(
          'keypoint',
          W('Is it required?', 'هل هو إلزامي؟', 'الزامی است؟'),
          '<p>The guidelines <em>recommend</em> a README at the advanced level and make it optional at the basic level. In this course your README is part of the project you have built since Week 4 (see the <a href="/week/final-project">Final Project page</a>), so you already have most of it.</p>',
          '<p>توصي الإرشادات <em>بملف README</em> في المستوى المتقدم وتجعله اختياريًا في المستوى الأساسي. وفي هذا المقرر يُعد ملف README جزءًا من المشروع الذي تبنيه منذ الأسبوع 4 (انظر <a href="/week/final-project">صفحة المشروع النهائي</a>)، فلديك معظمه بالفعل.</p>',
          '<p>راهنما README را در سطح پیشرفته <em>توصیه</em> می‌کند و در سطح پایه اختیاری می‌داند. در این درس README بخشی از پروژه‌ای است که از هفتهٔ ۴ ساخته‌ای (<a href="/week/final-project">صفحهٔ پروژهٔ نهایی</a> را ببین)، پس بیشترش را از قبل داری.</p>',
        ),
      ],
    },
    // ---------- 4. Presentation ----------
    {
      id: 'presentation',
      navLabel: W('The slides', 'الشرائح', 'اسلایدها'),
      sectionLabel: W('Section 04', 'القسم ٠٤', 'بخش ۰۴'),
      timeEst: W('3 min', '٣ دقائق', '۳ دقیقه'),
      headingHtml: t(
        '<h2>The slides: the official order, slide by slide</h2><p class="standfirst">The guidelines list the slides for a professional PowerPoint deck. The right-hand column is our suggestion for what goes on each slide in a business analytics project.</p>',
        '<h2>الشرائح: الترتيب الرسمي، شريحة بشريحة</h2><p class="standfirst">تذكر الإرشادات الشرائح المطلوبة لعرض PowerPoint احترافي. والعمود الأيمن اقتراحنا لما يوضع في كل شريحة في مشروع تحليلات الأعمال.</p>',
        '<h2>اسلایدها: ترتیب رسمی، اسلاید به اسلاید</h2><p class="standfirst">راهنما اسلایدهای یک ارائهٔ حرفه‌ای PowerPoint را فهرست می‌کند. ستون سمت راست پیشنهاد ماست برای اینکه در یک پروژهٔ تحلیل کسب‌وکار روی هر اسلاید چه بیاید.</p>',
      ),
      blocks: [
        {
          type: 'table',
          headers: [W('Slide', 'الشريحة', 'اسلاید'), W('The guidelines ask for', 'تطلب الإرشادات', 'راهنما می‌خواهد'), W('In a BA2 project (our suggestion)', 'في مشروع BA2 (اقتراحنا)', 'در یک پروژهٔ BA2 (پیشنهاد ما)')],
          rows: [
            [W('1–2', '1–2', '۱–۲'), W('Cover: project logo (if any), title, your full name, tutor\'s name, mentor\'s name, "Women in Tech Program" name and logo (Paper Airplanes)', 'الغلاف: شعار المشروع (إن وُجد)، والعنوان، واسمك الكامل، واسم المدرّس، واسم المرشد، واسم "Women in Tech Program" وشعاره (Paper Airplanes)', 'جلد: لوگوی پروژه (اگر هست)، عنوان، نام کاملت، نام مدرس، نام منتور، نام و لوگوی «Women in Tech Program» (Paper Airplanes)'), W('Both partners\' names if you work in a pair', 'اسما الشريكين إن كنتما فريقًا', 'نام هر دو نفر اگر دونفره کار می‌کنید')],
            [W('3', '3', '۳'), W('Objectives and goals', 'الأهداف والغايات', 'هدف‌ها'), W('Your goals and expected outcomes (Week 4)', 'أهدافك والنتائج المتوقعة (الأسبوع 4)', 'هدف‌ها و نتایج مورد انتظارت (هفتهٔ ۴)')],
            [W('4', '4', '۴'), W('Problem, proposed solution, target audience', 'المشكلة، والحل المقترح، والجمهور المستهدف', 'مسئله، راه‌حل پیشنهادی، مخاطب هدف'), W('Your business question and who will use the answer', 'سؤال العمل لديك ومن سيستخدم الإجابة', 'پرسش کسب‌وکارت و کسی که از جواب استفاده می‌کند')],
            [W('5', '5', '۵'), W('Competitive advantage: how it is better than the alternatives', 'الميزة التنافسية: كيف يتفوق على البدائل', 'مزیت رقابتی: چرا از جایگزین‌ها بهتر است'), W('Why your analysis beats guessing, and your tools section', 'لماذا يتفوق تحليلك على التخمين، وقسم الأدوات', 'چرا تحلیلت از حدس زدن بهتر است، و بخش ابزارها')],
            [W('6–7', '6–7', '۶–۷'), W('Methodology and technologies', 'المنهجية والتقنيات', 'روش‌شناسی و فناوری‌ها'), W('Data source, cleaning steps, regression and test', 'مصدر البيانات، وخطوات التنظيف، والانحدار، والاختبار', 'منبع داده، گام‌های پاک‌سازی، رگرسیون و آزمون')],
            [W('8–10', '8–10', '۸–۱۰'), W('Key features, with screenshots', 'الميزات الأساسية، مع لقطات شاشة', 'ویژگی‌های کلیدی، با تصویر صفحه'), W('Your best charts and findings, each with a takeaway title', 'أفضل رسومك ونتائجك، لكل منها عنوان يقول الخلاصة', 'بهترین نمودارها و یافته‌هایت، هر کدام با عنوانی که نتیجه را می‌گوید')],
            [W('11', '11', '۱۱'), W('Challenges and how you overcame them', 'التحديات وكيف تغلبت عليها', 'چالش‌ها و اینکه چطور از پسشان برآمدی'), W('Messy data, a result that was not significant…', 'بيانات فوضوية، نتيجة غير دالة…', 'دادهٔ شلوغ، نتیجه‌ای که معنادار نبود…')],
            [W('12', '12', '۱۲'), W('Added value and innovation', 'القيمة المضافة والابتكار', 'ارزش افزوده و نوآوری'), W('What the business can now decide that it could not before', 'ما يستطيع العمل أن يقرره الآن ولم يستطع قبل', 'آنچه کسب‌وکار حالا می‌تواند تصمیم بگیرد و قبلاً نمی‌توانست')],
            [W('13', '13', '۱۳'), W('Live demonstration plan', 'خطة العرض الحي', 'برنامهٔ نمایش زنده'), W('A short walk through your Excel file or notebook', 'جولة قصيرة في ملف Excel أو الدفتر', 'گشتی کوتاه در فایل Excel یا نوت‌بوکت')],
            [W('14', '14', '۱۴'), W('Future enhancements', 'تحسينات مستقبلية', 'بهبودهای آینده'), W('Limits and next steps (Week 8)', 'الحدود والخطوات التالية (الأسبوع 8)', 'محدودیت‌ها و گام‌های بعدی (هفتهٔ ۸)')],
            [W('15', '15', '۱۵'), W('Conclusion and acknowledgments', 'الخاتمة والشكر', 'نتیجه‌گیری و قدردانی'), W('Your recommendation in one sentence; thank your mentor and tutor', 'توصيتك في جملة واحدة؛ واشكر مرشدك ومدرّسك', 'توصیه‌ات در یک جمله؛ از منتور و مدرست تشکر کن')],
            [W('Last', 'الأخيرة', 'آخر'), W('References: all sources, libraries and external resources used', 'المراجع: كل المصادر والمكتبات والموارد الخارجية المستخدمة', 'منابع: همهٔ منبع‌ها، کتابخانه‌ها و منابع بیرونی استفاده‌شده'), W('The dataset\'s link, plus Excel, pandas, statsmodels…', 'رابط مجموعة البيانات، وExcel وpandas وstatsmodels…', 'پیوند مجموعه‌داده، و Excel، pandas، statsmodels…')],
          ],
        },
        analogy(
          '<p>The slide list is like a recipe card with fixed headings: ingredients, steps, serving. The <em>dish</em> is yours, but the jury knows where to look for each part.</p>',
          '<p>قائمة الشرائح مثل بطاقة وصفة بعناوين ثابتة: المكونات، والخطوات، والتقديم. <em>الطبق</em> طبقك، لكن لجنة التحكيم تعرف أين تبحث عن كل جزء.</p>',
          '<p>فهرست اسلایدها مثل کارت دستور پختی با عنوان‌های ثابت است: مواد، مراحل، سرو. <em>غذا</em> مال توست، اما داورها می‌دانند هر بخش را کجا پیدا کنند.</p>',
        ),
      ],
    },
    // ---------- 5. Technical requirements ----------
    {
      id: 'technical',
      navLabel: W('Technical requirements', 'المتطلبات التقنية', 'الزامات فنی'),
      sectionLabel: W('Section 05', 'القسم ٠٥', 'بخش ۰۵'),
      timeEst: W('2 min', '٢ دقيقتان', '۲ دقیقه'),
      headingHtml: t(
        '<h2>Technical requirements, read for an analytics project</h2><p class="standfirst">The same list applies to every course, including web and app projects, so some lines fit an analysis less directly. The right-hand column is our reading; if you are unsure, ask your mentor.</p>',
        '<h2>المتطلبات التقنية، مقروءة لمشروع تحليلات</h2><p class="standfirst">القائمة نفسها تنطبق على كل المقررات، ومنها مشاريع الويب والتطبيقات، لذا بعض البنود أقل انطباقًا على التحليل. والعمود الأيمن قراءتنا؛ وإن لم تكن متأكدًا فاسأل مرشدك.</p>',
        '<h2>الزامات فنی، از نگاه یک پروژهٔ تحلیلی</h2><p class="standfirst">همین فهرست برای همهٔ درس‌ها، از جمله پروژه‌های وب و اپلیکیشن، است، پس بعضی بندها کمتر مستقیم به تحلیل می‌خورند. ستون سمت راست برداشت ماست؛ اگر مطمئن نیستی از منتورت بپرس.</p>',
      ),
      blocks: [
        {
          type: 'table',
          headers: [W('The guidelines say', 'تقول الإرشادات', 'راهنما می‌گوید'), W('For a BA2 project (our reading)', 'لمشروع BA2 (قراءتنا)', 'برای پروژهٔ BA2 (برداشت ما)')],
          rows: [
            [W('At least 3 core features that show your skills', '3 ميزات أساسية على الأقل تُظهر مهاراتك', 'دست‌کم ۳ ویژگی اصلی که مهارتت را نشان دهد'), W('Clean data, clear charts, and a regression or test, each explained', 'بيانات نظيفة، ورسوم واضحة، وانحدار أو اختبار، كل منها مشروح', 'دادهٔ تمیز، نمودارهای روشن، و یک رگرسیون یا آزمون، هر کدام با توضیح')],
            [W('Responsive design (mobile-friendly)', 'تصميم متجاوب (مناسب للجوال)', 'طراحی واکنش‌گرا (مناسب موبایل)'), W('If you build a dashboard, check it on a phone; otherwise, readable charts and slides', 'إن بنيت لوحة معلومات فافحصها على الهاتف؛ وإلا فرسوم وشرائح مقروءة', 'اگر داشبورد می‌سازی، روی گوشی امتحانش کن؛ وگرنه نمودار و اسلاید خوانا')],
            [W('Clean architecture', 'بنية نظيفة', 'معماری تمیز'), W('Tidy folders, clear file names, one tab or notebook per step', 'مجلدات مرتبة، وأسماء ملفات واضحة، وورقة أو دفتر لكل خطوة', 'پوشه‌های مرتب، نام فایل روشن، یک برگه یا نوت‌بوک برای هر گام')],
            [W('Appropriate error handling', 'معالجة مناسبة للأخطاء', 'مدیریت مناسب خطا'), W('Handle blanks and odd values, keep a change log, and state your limits', 'عالج الفراغات والقيم الغريبة، واحتفظ بسجل تغييرات، واذكر حدودك', 'خانه‌های خالی و مقدارهای عجیب را درست کن، گزارش تغییرات نگه دار و محدودیت‌هایت را بگو')],
            [W('Deploy your project (if applicable)', 'انشر مشروعك (إن أمكن)', 'پروژه‌ات را منتشر کن (اگر ممکن است)'), W('Optional: a shared link to your dashboard or notebook', 'اختياري: رابط مشترك للوحة المعلومات أو الدفتر', 'اختیاری: پیوند اشتراکی به داشبورد یا نوت‌بوک')],
            [W('Extra libraries or resources are allowed if relevant', 'يُسمح بمكتبات أو موارد إضافية إن كانت ذات صلة', 'کتابخانه یا منبع اضافه، اگر مرتبط باشد، مجاز است'), W('For example seaborn for charts, or Power BI; list them in your references', 'مثلًا seaborn للرسوم، أو Power BI؛ واذكرها في المراجع', 'مثلاً seaborn برای نمودار یا Power BI؛ در منابع نامشان را بیاور')],
          ],
        },
      ],
    },
    // ---------- 6. Timeline and grading ----------
    {
      id: 'grading',
      navLabel: W('Deadline and grading', 'الموعد والتقييم', 'مهلت و نمره‌دهی'),
      sectionLabel: W('Section 06', 'القسم ٠٦', 'بخش ۰۶'),
      timeEst: W('2 min', '٢ دقيقتان', '۲ دقیقه'),
      headingHtml: t(
        '<h2>Deadline and grading</h2><p class="standfirst">When it is due, and how the 100 points are shared out.</p>',
        '<h2>الموعد النهائي والتقييم</h2><p class="standfirst">متى يُسلَّم، وكيف تتوزع النقاط المئة.</p>',
        '<h2>مهلت و نمره‌دهی</h2><p class="standfirst">کی باید تحویل شود، و ۱۰۰ نمره چطور تقسیم می‌شود.</p>',
      ),
      blocks: [
        box(
          'keypoint',
          W('Two dates', 'تاريخان', 'دو تاریخ'),
          '<ul><li><strong>Final submission:</strong> end of <strong>Week 12 of the semester</strong>.</li><li><strong>Demo Day:</strong> <strong>Week 13 of the semester</strong>.</li></ul><p>These are weeks of the program\'s semester, not the week numbers of this course\'s pages. Your mentor will confirm the exact dates.</p>',
          '<ul><li><strong>التسليم النهائي:</strong> نهاية <strong>الأسبوع 12 من الفصل</strong>.</li><li><strong>يوم العرض (Demo Day):</strong> <strong>الأسبوع 13 من الفصل</strong>.</li></ul><p>هذه أسابيع الفصل الدراسي للبرنامج، لا أرقام أسابيع صفحات هذا المقرر. وسيؤكد مرشدك التواريخ بالضبط.</p>',
          '<ul><li><strong>تحویل نهایی:</strong> پایان <strong>هفتهٔ ۱۲ ترم</strong>.</li><li><strong>روز نمایش (Demo Day):</strong> <strong>هفتهٔ ۱۳ ترم</strong>.</li></ul><p>این‌ها هفته‌های ترم برنامه‌اند، نه شمارهٔ هفته‌های صفحه‌های این درس. منتورت تاریخ دقیق را تأیید می‌کند.</p>',
        ),
        {
          type: 'table',
          headers: [W('Part', 'الجزء', 'بخش'), W('Weight', 'الوزن', 'وزن'), W('What it covers', 'ماذا يشمل', 'شامل چه چیزی است')],
          rows: [
            [W('Technical implementation', 'التنفيذ التقني', 'اجرای فنی'), W('<strong>40%</strong>', '<strong>40%</strong>', '<strong>۴۰٪</strong>'), W('Quality and organisation of your work, the right tools, complete features, performance', 'جودة عملك وتنظيمه، والأدوات المناسبة، واكتمال الميزات، والأداء', 'کیفیت و نظم کارت، ابزار مناسب، کامل بودن ویژگی‌ها، کارایی')],
            [W('Design and user experience', 'التصميم وتجربة المستخدم', 'طراحی و تجربهٔ کاربر'), W('<strong>20%</strong>', '<strong>20%</strong>', '<strong>۲۰٪</strong>'), W('How it looks, how easy it is to follow, accessibility', 'كيف يبدو، وسهولة متابعته، وإمكانية الوصول', 'ظاهرش، راحتی دنبال کردنش، دسترس‌پذیری')],
            [W('Presentation and documentation', 'العرض والتوثيق', 'ارائه و مستندسازی'), W('<strong>40%</strong>', '<strong>40%</strong>', '<strong>۴۰٪</strong>'), W('Quality of the presentation, clarity of explanation, complete documentation', 'جودة العرض، ووضوح الشرح، واكتمال التوثيق', 'کیفیت ارائه، روشنی توضیح، کامل بودن مستندات')],
          ],
        },
        analogy(
          '<p>Think of a jam contest. The judges taste the jam (technical, 40%), look at the jar and label (design, 20%), and listen to how you explain your recipe (presentation and documentation, 40%). A great jam explained badly loses almost half its points.</p>',
          '<p>تخيّل مسابقة مربى. يتذوق الحكّام المربى (التقني، 40%)، وينظرون إلى البرطمان والملصق (التصميم، 20%)، ويستمعون إلى شرحك لوصفتك (العرض والتوثيق، 40%). مربى رائع مشروح بشكل سيئ يخسر نحو نصف نقاطه.</p>',
          '<p>یک مسابقهٔ مربا را تصور کن. داورها مربا را می‌چشند (فنی، ۴۰٪)، به شیشه و برچسب نگاه می‌کنند (طراحی، ۲۰٪) و به توضیحت دربارهٔ دستور پخت گوش می‌دهند (ارائه و مستندسازی، ۴۰٪). مربای عالی که بد توضیح داده شود تقریباً نصف نمره‌اش را از دست می‌دهد.</p>',
        ),
        exercise('fpg-q001'),
      ],
    },
    // ---------- 7. Submitting ----------
    {
      id: 'submitting',
      navLabel: W('Submitting and the video', 'التسليم والفيديو', 'تحویل و ویدیو'),
      sectionLabel: W('Section 07', 'القسم ٠٧', 'بخش ۰۷'),
      timeEst: W('2 min', '٢ دقيقتان', '۲ دقیقه'),
      headingHtml: t(
        '<h2>Submitting, and recording your video</h2><p class="standfirst">Four steps, and the video has its own rules.</p>',
        '<h2>التسليم، وتسجيل الفيديو</h2><p class="standfirst">أربع خطوات، وللفيديو قواعده الخاصة.</p>',
        '<h2>تحویل، و ضبط ویدیو</h2><p class="standfirst">چهار گام، و ویدیو قانون‌های خودش را دارد.</p>',
      ),
      blocks: [
        html(
          '<ol><li>Submit your <strong>presentation file</strong>.</li><li>Include your <strong>project description</strong> (the proposal).</li><li>Record a <strong>video presentation</strong> (below).</li><li>Upload everything to the <strong>shared Google Drive folder</strong> the facilitator gives you (you will have edit permission).</li></ol>',
          '<ol><li>سلّم <strong>ملف العرض</strong>.</li><li>أرفق <strong>وصف المشروع</strong> (المقترح).</li><li>سجّل <strong>فيديو للعرض</strong> (أدناه).</li><li>ارفع كل شيء إلى <strong>مجلد Google Drive المشترك</strong> الذي يعطيك إياه الميسّر (ستكون لديك صلاحية التعديل).</li></ol>',
          '<ol><li><strong>فایل ارائه</strong> را تحویل بده.</li><li><strong>توضیح پروژه</strong> (پیشنهاد) را ضمیمه کن.</li><li>یک <strong>ویدیوی ارائه</strong> ضبط کن (پایین).</li><li>همه را در <strong>پوشهٔ مشترک Google Drive</strong> که تسهیلگر می‌دهد بارگذاری کن (اجازهٔ ویرایش داری).</li></ol>',
        ),
        box(
          'keypoint',
          W('The video', 'الفيديو', 'ویدیو'),
          '<ul><li><strong>Length:</strong> 3–5 minutes for an individual project; at most 7 minutes for a group.</li><li><strong>Show</strong> your screen with the project <em>and</em> yourself presenting; make sure your voice is clear.</li><li><strong>Demonstrate</strong> the key parts: for BA2, your clean data, main chart, regression and test.</li><li><strong>Tools:</strong> a browser extension such as Awesome Screen Recorder, or on Windows 10/11 the built-in recorder (press <strong>Win + G</strong>).</li><li><strong>Important:</strong> your mentor must approve the video <em>before</em> you submit it.</li></ul>',
          '<ul><li><strong>المدة:</strong> 3–5 دقائق للمشروع الفردي؛ و7 دقائق كحد أقصى للمجموعة.</li><li><strong>اعرض</strong> شاشتك مع المشروع <em>ونفسك</em> وأنت تقدّم؛ وتأكد أن صوتك واضح.</li><li><strong>استعرض</strong> الأجزاء الرئيسية: في BA2، بياناتك النظيفة، والرسم الرئيسي، والانحدار، والاختبار.</li><li><strong>الأدوات:</strong> إضافة متصفح مثل Awesome Screen Recorder، أو في Windows 10/11 المسجّل المدمج (اضغط <strong>Win + G</strong>).</li><li><strong>مهم:</strong> يجب أن يوافق مرشدك على الفيديو <em>قبل</em> أن تسلّمه.</li></ul>',
          '<ul><li><strong>مدت:</strong> ۳ تا ۵ دقیقه برای پروژهٔ فردی؛ حداکثر ۷ دقیقه برای گروه.</li><li>صفحهٔ نمایش با پروژه <em>و</em> خودت را در حال ارائه <strong>نشان بده</strong>؛ مطمئن شو صدایت واضح است.</li><li>بخش‌های کلیدی را <strong>نمایش بده</strong>: در BA2، دادهٔ تمیز، نمودار اصلی، رگرسیون و آزمون.</li><li><strong>ابزار:</strong> یک افزونهٔ مرورگر مثل Awesome Screen Recorder، یا در Windows 10/11 ضبط‌کنندهٔ داخلی (کلید <strong>Win + G</strong>).</li><li><strong>مهم:</strong> منتورت باید ویدیو را <em>پیش از</em> تحویل تأیید کند.</li></ul>',
        ),
        analogy(
          '<p>The video is a short cooking show: the camera shows the pan (your screen) and the cook (you), and you talk the viewer through each step without rushing.</p>',
          '<p>الفيديو برنامج طبخ قصير: تُظهر الكاميرا المقلاة (شاشتك) والطاهي (أنت)، وتشرح للمشاهد كل خطوة دون عجلة.</p>',
          '<p>ویدیو یک برنامهٔ آشپزی کوتاه است: دوربین تابه (صفحه‌ات) و آشپز (تو) را نشان می‌دهد و تو بی‌عجله هر گام را برای بیننده توضیح می‌دهی.</p>',
        ),
        exercise('fpg-q002'),
      ],
    },
    // ---------- 8. Naming ----------
    {
      id: 'naming',
      navLabel: W('Naming your files', 'تسمية ملفاتك', 'نام‌گذاری فایل‌ها'),
      sectionLabel: W('Section 08', 'القسم ٠٨', 'بخش ۰۸'),
      timeEst: W('1 min', '١ دقيقة', '۱ دقیقه'),
      headingHtml: t(
        '<h2>Naming your files: copy the format exactly</h2><p class="standfirst">The team tracks every submission by its name, so use these formats letter for letter.</p>',
        '<h2>تسمية ملفاتك: انسخ الصيغة بالضبط</h2><p class="standfirst">يتتبع الفريق كل تسليم باسمه، لذا استخدم هذه الصيغ حرفًا بحرف.</p>',
        '<h2>نام‌گذاری فایل‌ها: قالب را دقیقاً کپی کن</h2><p class="standfirst">تیم هر تحویل را با نامش پیگیری می‌کند، پس این قالب‌ها را حرف به حرف به کار ببر.</p>',
      ),
      blocks: [
        code(`Video:   video-F26-(course name)-(student name)
         video-F26-Business Analytics 2-Your Name

Slides:  ppt-F26-(course name)-(student name)
         ppt-F26-Business Analytics 2-Your Name

(The guidelines' own examples: video-F26-Python 2-Salwa Mohamad,
 ppt-F26-Web Development 1-Lara Khoury)`),
        box(
          'mistake',
          W('Easy to get wrong', 'سهل أن تخطئ فيه', 'آسان است اشتباه شود'),
          '<p>"final.pptx", "slides v3" or the parts in a different order all break the system. Check the hyphens, the F26 and the full course name before you upload.</p>',
          '<p>"final.pptx" أو "slides v3" أو الأجزاء بترتيب مختلف كلها تُفسد النظام. افحص الشرطات وF26 والاسم الكامل للمقرر قبل الرفع.</p>',
          '<p>«final.pptx»، «slides v3» یا جابه‌جا نوشتن بخش‌ها همه سیستم را به هم می‌ریزد. پیش از بارگذاری خط‌تیره‌ها، F26 و نام کامل درس را بررسی کن.</p>',
        ),
        exercise('fpg-q003'),
      ],
    },
    // ---------- 9. Rules and FAQ ----------
    {
      id: 'faq',
      navLabel: W('Rules and FAQ', 'القواعد والأسئلة الشائعة', 'قانون‌ها و پرسش‌های رایج'),
      sectionLabel: W('Section 09', 'القسم ٠٩', 'بخش ۰۹'),
      timeEst: W('2 min', '٢ دقيقتان', '۲ دقیقه'),
      headingHtml: t(
        '<h2>Rules and frequent questions</h2><p class="standfirst">The answers from the guidelines, in short.</p>',
        '<h2>القواعد والأسئلة الشائعة</h2><p class="standfirst">إجابات الإرشادات باختصار.</p>',
        '<h2>قانون‌ها و پرسش‌های رایج</h2><p class="standfirst">جواب‌های راهنما، به‌طور خلاصه.</p>',
      ),
      blocks: [
        {
          type: 'table',
          headers: [W('Question', 'السؤال', 'پرسش'), W('Answer', 'الإجابة', 'جواب')],
          rows: [
            [W('Can I work in a team?', 'هل أستطيع العمل ضمن فريق؟', 'می‌توانم گروهی کار کنم؟'), W('It depends on the course; ask your mentor and tutor. (In BA2 the project is planned for pairs.)', 'يعتمد على المقرر؛ اسأل مرشدك ومدرّسك. (في BA2 المشروع مخطط له لفرق من شخصين.)', 'به درس بستگی دارد؛ از منتور و مدرست بپرس. (در BA2 پروژه برای گروه‌های دونفره طراحی شده.)')],
            [W('Can I use libraries not covered in the course?', 'هل أستطيع استخدام مكتبات لم يغطها المقرر؟', 'می‌توانم از کتابخانه‌هایی که در درس نبود استفاده کنم؟'), W('Yes, if they are relevant to your project and goals.', 'نعم، إن كانت ذات صلة بمشروعك وأهدافك.', 'بله، اگر به پروژه و هدف‌هایت مرتبط باشند.')],
            [W('What if I get stuck technically?', 'ماذا لو تعثرت تقنيًا؟', 'اگر از نظر فنی گیر کردم چه؟'), W('Ask your mentor.', 'اسأل مرشدك.', 'از منتورت بپرس.')],
            [W('What if I miss the deadline?', 'ماذا لو فاتني الموعد النهائي؟', 'اگر مهلت را از دست بدهم چه؟'), W('It may cost you the certificate. If you see a problem coming, tell your mentor straight away.', 'قد يكلّفك الشهادة. وإن توقعت مشكلة فأخبر مرشدك فورًا.', 'ممکن است گواهی‌نامه‌ات را از دست بدهی. اگر مشکلی در راه می‌بینی، فوراً به منتورت بگو.')],
          ],
        },
        box(
          'mistake',
          W('AI: to guide you, not to write for you', 'الذكاء الاصطناعي: ليرشدك لا ليكتب عنك', 'هوش مصنوعی: برای راهنمایی، نه برای نوشتن به‌جای تو'),
          '<p>The guidelines are clear: <strong>AI-generated code and documentation are rejected.</strong> It is better to submit your own work, even imperfect, than AI-written work. Use AI to understand an idea, find an error or check your thinking. This rule applies to your final project even where an earlier page shows an "AI corner" tip.</p>',
          '<p>الإرشادات واضحة: <strong>يُرفض الكود والتوثيق المكتوبان بالذكاء الاصطناعي.</strong> تسليم عملك أنت، ولو غير كامل، أفضل من عمل كتبه الذكاء الاصطناعي. استخدمه لفهم فكرة، أو إيجاد خطأ، أو مراجعة تفكيرك. وتنطبق هذه القاعدة على مشروعك النهائي حتى حيث تُظهر صفحة سابقة نصيحة "ركن الذكاء الاصطناعي".</p>',
          '<p>راهنما روشن است: <strong>کد و مستنداتی که هوش مصنوعی تولید کرده رد می‌شود.</strong> تحویل کار خودت، حتی ناقص، بهتر از کاری است که هوش مصنوعی نوشته. از آن برای فهمیدن یک ایده، پیدا کردن یک خطا یا بررسی فکرت استفاده کن. این قانون برای پروژهٔ نهایی‌ات صدق می‌کند، حتی جایی که صفحه‌ای قبلی نکته‌ای در «گوشهٔ هوش مصنوعی» نشان می‌دهد.</p>',
        ),
        exercise('fpg-q004'),
      ],
    },
    // ---------- 10. Checklist ----------
    {
      id: 'checklist',
      navLabel: W('Before you submit', 'قبل أن تسلّم', 'پیش از تحویل'),
      sectionLabel: W('Section 10', 'القسم ١٠', 'بخش ۱۰'),
      timeEst: W('1 min', '١ دقيقة', '۱ دقیقه'),
      headingHtml: t(
        '<h2>Before you submit: a quick checklist</h2>',
        '<h2>قبل أن تسلّم: قائمة تحقق سريعة</h2>',
        '<h2>پیش از تحویل: یک فهرست سریع</h2>',
      ),
      blocks: [
        {
          type: 'takeaways',
          label: W('In your Drive folder', 'في مجلد Drive', 'در پوشهٔ Drive تو'),
          items: [
            W('The proposal: 80–100 words (problem, audience, plan, tools)', 'المقترح: 80–100 كلمة (المشكلة، الجمهور، الخطة، الأدوات)', 'پیشنهاد: ۸۰ تا ۱۰۰ واژه (مسئله، مخاطب، برنامه، ابزار)'),
            W('The README, with all six headings', 'ملف README بعناوينه الستة', 'README با هر شش عنوان'),
            W('The slides in the official order, named ppt-F26-…', 'الشرائح بالترتيب الرسمي، باسم ppt-F26-…', 'اسلایدها با ترتیب رسمی، با نام ppt-F26-…'),
            W('The video: 3–5 min (group ≤ 7), approved by your mentor, named video-F26-…', 'الفيديو: 3–5 دقائق (المجموعة ≤ 7)، بموافقة مرشدك، باسم video-F26-…', 'ویدیو: ۳ تا ۵ دقیقه (گروه ≤ ۷)، تأییدشده توسط منتور، با نام video-F26-…'),
            W('Your own work: AI only to guide you', 'عملك أنت: الذكاء الاصطناعي للإرشاد فقط', 'کار خودت: هوش مصنوعی فقط برای راهنمایی'),
            W('Uploaded before the end of semester Week 12', 'مرفوع قبل نهاية الأسبوع 12 من الفصل', 'بارگذاری‌شده پیش از پایان هفتهٔ ۱۲ ترم'),
          ],
        },
        recap(
          W('Four deliverables, one Drive folder, exact file names.', 'أربعة مخرجات، ومجلد Drive واحد، وأسماء ملفات دقيقة.', 'چهار خروجی، یک پوشهٔ Drive، نام فایل دقیق.'),
          W('Grading: 40% technical, 20% design, 40% presentation and documentation.', 'التقييم: 40% تقني، 20% تصميم، 40% عرض وتوثيق.', 'نمره‌دهی: ۴۰٪ فنی، ۲۰٪ طراحی، ۴۰٪ ارائه و مستندسازی.'),
          W('The project is required for your certificate.', 'المشروع شرط للحصول على شهادتك.', 'پروژه برای گواهی‌نامه‌ات الزامی است.'),
        ),
        html(
          `<p>Good luck! <a href="${pdf}" download>Download the guidelines (PDF)</a> · <a href="/week/final-project">Back to the Final Project page</a></p>`,
          `<p>بالتوفيق! <a href="${pdf}" download>نزّل الإرشادات (PDF)</a> · <a href="/week/final-project">العودة إلى صفحة المشروع النهائي</a></p>`,
          `<p>موفق باشی! <a href="${pdf}" download>راهنما را دانلود کن (PDF)</a> · <a href="/week/final-project">بازگشت به صفحهٔ پروژهٔ نهایی</a></p>`,
        ),
      ],
    },
  ],
}
