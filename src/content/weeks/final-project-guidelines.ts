// The Women in Tech program's official "Final Project Guidelines" (5 pages, by the WIT Program Manager), saved as
// public/originals/final-project-guidelines.pdf. This page renders the guidelines as written: same headings, same
// order, same wording (only two typos fixed: "Competitve" and "better then"), with nothing added apart from a link
// to download the PDF. ar/fa are straight translations of the same text, awaiting native review. File-name formats,
// examples and the URL stay as in the PDF.
import type { Block, Localized, Week } from '../types'

const t = (en: string, ar: string, fa: string): Localized => ({ en, ar, fa })
const W = t
const html = (en: string, ar: string, fa: string): Block => ({ type: 'html', html: t(en, ar, fa) })
const pdf = '/originals/final-project-guidelines.pdf'
const url = 'https://www.paper-airplanes.org/student-projects'
const link = `<a href="${url}" target="_blank" rel="noopener">${url}</a>`

export const finalProjectGuidelines: Week = {
  id: 'final-project-guidelines',
  originalPdf: pdf,
  order: 100,
  cover: {
    kicker: t('Business Analytics 2 · Final Project', 'تحليلات الأعمال 2 · المشروع النهائي', 'تحلیل کسب‌وکار ۲ · پروژهٔ نهایی'),
    titleHtml: t(
      '<h1>Women in Tech Program:<em>Final Project Guidelines</em></h1>',
      '<h1>برنامج Women in Tech:<em>إرشادات المشروع النهائي</em></h1>',
      '<h1>برنامهٔ Women in Tech:<em>راهنمای پروژهٔ نهایی</em></h1>',
    ),
    timeEstimate: t('≈ 10 min to read', '≈ ١٠ دقائق للقراءة', '≈ ۱۰ دقیقه خواندن'),
  },
  questions: [],
  sections: [
    // ---------- Introduction ----------
    {
      id: 'introduction',
      navLabel: W('Introduction', 'مقدمة', 'مقدمه'),
      sectionLabel: W('Section 01', 'القسم ٠١', 'بخش ۰۱'),
      headingHtml: t('<h2>Introduction</h2>', '<h2>مقدمة</h2>', '<h2>مقدمه</h2>'),
      blocks: [
        html(
          `<p><a href="${pdf}" download><strong>Download the guidelines (PDF)</strong></a></p><p>This document serves as a comprehensive guide for preparing your final project in the Women in Tech program. A well-structured final project demonstrates your technical skills, problem-solving abilities, and creativity. These guidelines will help you develop a professional and impressive project that showcases your growth throughout the program.</p>`,
          `<p><a href="${pdf}" download><strong>نزّل الإرشادات (PDF)</strong></a></p><p>هذه الوثيقة دليل شامل لإعداد مشروعك النهائي في برنامج Women in Tech. المشروع النهائي جيد البنية يُظهر مهاراتك التقنية وقدرتك على حل المشكلات وإبداعك. ستساعدك هذه الإرشادات على تطوير مشروع احترافي ومثير للإعجاب يُبرز تطورك طوال البرنامج.</p>`,
          `<p><a href="${pdf}" download><strong>راهنما را دانلود کن (PDF)</strong></a></p><p>این سند راهنمایی جامع برای آماده کردن پروژهٔ نهایی‌ات در برنامهٔ Women in Tech است. یک پروژهٔ نهایی خوش‌ساختار مهارت‌های فنی، توانایی حل مسئله و خلاقیت تو را نشان می‌دهد. این راهنما کمکت می‌کند پروژه‌ای حرفه‌ای و چشمگیر بسازی که رشد تو را در طول برنامه نشان دهد.</p>`,
        ),
      ],
    },
    // ---------- Previous Projects Reference ----------
    {
      id: 'previous-projects',
      navLabel: W('Previous Projects Reference', 'مرجع المشاريع السابقة', 'مرجع پروژه‌های قبلی'),
      sectionLabel: W('Section 02', 'القسم ٠٢', 'بخش ۰۲'),
      headingHtml: t('<h2>Previous Projects Reference</h2>', '<h2>مرجع المشاريع السابقة</h2>', '<h2>مرجع پروژه‌های قبلی</h2>'),
      blocks: [
        html(
          `<p>For inspiration and understanding of the expected standard, please review past projects created by previous participants at: ${link}</p>`,
          `<p>للإلهام ولفهم المستوى المتوقع، يرجى مراجعة المشاريع السابقة التي أنشأها المشاركون السابقون على: ${link}</p>`,
          `<p>برای الهام گرفتن و فهمیدن سطح مورد انتظار، لطفاً پروژه‌های قبلی شرکت‌کنندگان پیشین را اینجا ببین: ${link}</p>`,
        ),
      ],
    },
    // ---------- Project Requirements ----------
    {
      id: 'requirements',
      navLabel: W('Project Requirements', 'متطلبات المشروع', 'الزامات پروژه'),
      sectionLabel: W('Section 03', 'القسم ٠٣', 'بخش ۰۳'),
      headingHtml: t('<h2>Project Requirements</h2>', '<h2>متطلبات المشروع</h2>', '<h2>الزامات پروژه</h2>'),
      blocks: [
        html(
          '<h3>1. Project Proposal</h3><ul><li>Submit a detailed project description (80-100 words)</li><li>Clearly define the problem your project addresses</li><li>Identify your target audience</li><li>Explain what technologies you plan to use</li></ul>',
          '<h3>1. مقترح المشروع</h3><ul><li>قدّم وصفًا مفصلًا للمشروع (80-100 كلمة)</li><li>حدّد بوضوح المشكلة التي يعالجها مشروعك</li><li>حدّد جمهورك المستهدف</li><li>اشرح التقنيات التي تخطط لاستخدامها</li></ul>',
          '<h3>۱. پیشنهاد پروژه</h3><ul><li>یک توضیح مفصل از پروژه تحویل بده (۸۰ تا ۱۰۰ واژه)</li><li>مسئله‌ای را که پروژه‌ات به آن می‌پردازد روشن تعریف کن</li><li>مخاطب هدفت را مشخص کن</li><li>توضیح بده از چه فناوری‌هایی می‌خواهی استفاده کنی</li></ul>',
        ),
        html(
          '<h3>2. Documentation</h3><ul><li>Create a README file with:<ul><li>Project title and description</li><li>Installation instructions</li><li>Usage instructions</li><li>Technologies used</li><li>Project structure</li><li>Future improvements</li></ul></li></ul><p><strong><u>Note:</u></strong> Creating a README file is recommended for students at the advanced level but remains optional, not obligatory, while students at the basic level may also create one under the guidance of their mentors if they choose to do so.</p>',
          '<h3>2. التوثيق</h3><ul><li>أنشئ ملف README يتضمن:<ul><li>عنوان المشروع ووصفه</li><li>تعليمات التثبيت</li><li>تعليمات الاستخدام</li><li>التقنيات المستخدمة</li><li>هيكل المشروع</li><li>التحسينات المستقبلية</li></ul></li></ul><p><strong><u>ملاحظة:</u></strong> يُوصى بإنشاء ملف README لطلاب المستوى المتقدم لكنه يبقى اختياريًا وليس إلزاميًا، بينما يمكن لطلاب المستوى الأساسي أيضًا إنشاء واحد بتوجيه من مرشديهم إن اختاروا ذلك.</p>',
          '<h3>۲. مستندسازی</h3><ul><li>یک فایل README بساز که شامل این‌ها باشد:<ul><li>عنوان و توضیح پروژه</li><li>دستور نصب</li><li>دستور استفاده</li><li>فناوری‌های به‌کاررفته</li><li>ساختار پروژه</li><li>بهبودهای آینده</li></ul></li></ul><p><strong><u>توجه:</u></strong> ساختن فایل README برای دانشجویان سطح پیشرفته توصیه می‌شود اما اختیاری است و اجباری نیست، و دانشجویان سطح پایه هم اگر بخواهند می‌توانند زیر نظر منتورشان یکی بسازند.</p>',
        ),
        html(
          '<h3>3. Presentation Requirements</h3><ul><li>Create a professional PowerPoint presentation with the following slides:<ul><li><strong>Slide 1-2</strong>: Cover slide(s) including:<ul><li>Project logo (if applicable)</li><li>Project title</li><li>Your full name</li><li>Tutor\'s name</li><li>Mentor\'s name</li><li>"Women in Tech Program" name and logo (Paper Airplanes)</li></ul></li><li><strong>Slide 3</strong>: Project objectives and goals</li><li><strong>Slide 4</strong>: Problem statement and proposed solution with target audience</li><li>Slide 5: Competitive Advantage (how are they better than their competitors)</li><li><strong>Slide 6-7</strong>: Methodology and technologies used</li><li><strong>Slide 8-10</strong>: Key features and functionalities (with screenshots)</li><li><strong>Slide 11</strong>: Challenges faced and how you overcame them</li><li><strong>Slide 12</strong>: Added value and innovation aspects</li><li><strong>Slide 13</strong>: Live demonstration plan</li><li><strong>Slide 14</strong>: Future enhancements</li><li><strong>Slide 15</strong>: Conclusion and acknowledgments</li><li><strong>Last Slide</strong>: References - Include all sources, libraries, and external resources used</li></ul></li></ul>',
          '<h3>3. متطلبات العرض</h3><ul><li>أنشئ عرض PowerPoint احترافيًا بالشرائح التالية:<ul><li><strong>الشريحة 1-2</strong>: شريحة (شرائح) الغلاف وتتضمن:<ul><li>شعار المشروع (إن وُجد)</li><li>عنوان المشروع</li><li>اسمك الكامل</li><li>اسم المدرّس</li><li>اسم المرشد</li><li>اسم "Women in Tech Program" وشعاره (Paper Airplanes)</li></ul></li><li><strong>الشريحة 3</strong>: أهداف المشروع وغاياته</li><li><strong>الشريحة 4</strong>: بيان المشكلة والحل المقترح مع الجمهور المستهدف</li><li>الشريحة 5: الميزة التنافسية (كيف يتفوقون على منافسيهم)</li><li><strong>الشريحة 6-7</strong>: المنهجية والتقنيات المستخدمة</li><li><strong>الشريحة 8-10</strong>: الميزات والوظائف الأساسية (مع لقطات شاشة)</li><li><strong>الشريحة 11</strong>: التحديات التي واجهتها وكيف تغلبت عليها</li><li><strong>الشريحة 12</strong>: القيمة المضافة وجوانب الابتكار</li><li><strong>الشريحة 13</strong>: خطة العرض الحي</li><li><strong>الشريحة 14</strong>: التحسينات المستقبلية</li><li><strong>الشريحة 15</strong>: الخاتمة والشكر</li><li><strong>الشريحة الأخيرة</strong>: المراجع - أدرج كل المصادر والمكتبات والموارد الخارجية المستخدمة</li></ul></li></ul>',
          '<h3>۳. الزامات ارائه</h3><ul><li>یک ارائهٔ حرفه‌ای PowerPoint با این اسلایدها بساز:<ul><li><strong>اسلاید ۱-۲</strong>: اسلاید(های) جلد شامل:<ul><li>لوگوی پروژه (در صورت وجود)</li><li>عنوان پروژه</li><li>نام کامل تو</li><li>نام مدرس</li><li>نام منتور</li><li>نام و لوگوی «Women in Tech Program» ‏(Paper Airplanes)</li></ul></li><li><strong>اسلاید ۳</strong>: هدف‌ها و مقصودهای پروژه</li><li><strong>اسلاید ۴</strong>: بیان مسئله و راه‌حل پیشنهادی همراه با مخاطب هدف</li><li>اسلاید ۵: مزیت رقابتی (چطور از رقبایشان بهترند)</li><li><strong>اسلاید ۶-۷</strong>: روش‌شناسی و فناوری‌های به‌کاررفته</li><li><strong>اسلاید ۸-۱۰</strong>: ویژگی‌ها و کارکردهای کلیدی (با تصویر صفحه)</li><li><strong>اسلاید ۱۱</strong>: چالش‌هایی که با آن‌ها روبه‌رو شدی و چطور از پسشان برآمدی</li><li><strong>اسلاید ۱۲</strong>: ارزش افزوده و جنبه‌های نوآوری</li><li><strong>اسلاید ۱۳</strong>: برنامهٔ نمایش زنده</li><li><strong>اسلاید ۱۴</strong>: بهبودهای آینده</li><li><strong>اسلاید ۱۵</strong>: نتیجه‌گیری و قدردانی</li><li><strong>اسلاید آخر</strong>: منابع - همهٔ منبع‌ها، کتابخانه‌ها و منابع بیرونی استفاده‌شده را بیاور</li></ul></li></ul>',
        ),
        html(
          '<h3>4. Technical Requirements</h3><ul><li>Implement at least 3 core features that demonstrate your technical proficiency</li><li>Ensure responsive design (mobile-friendly)</li><li>Clean Architecture</li><li>Implement appropriate error handling</li><li>Deploy your project (if applicable)</li><li>You may use additional libraries or resources not covered in the course as long as they are relevant to your project</li></ul>',
          '<h3>4. المتطلبات التقنية</h3><ul><li>نفّذ 3 ميزات أساسية على الأقل تُظهر كفاءتك التقنية</li><li>تأكد من التصميم المتجاوب (المناسب للهاتف المحمول)</li><li>بنية نظيفة</li><li>نفّذ معالجة مناسبة للأخطاء</li><li>انشر مشروعك (إن أمكن)</li><li>يمكنك استخدام مكتبات أو موارد إضافية لم يغطها المقرر ما دامت ذات صلة بمشروعك</li></ul>',
          '<h3>۴. الزامات فنی</h3><ul><li>دست‌کم ۳ ویژگی اصلی پیاده کن که مهارت فنی‌ات را نشان دهد</li><li>طراحی واکنش‌گرا (مناسب موبایل) را تضمین کن</li><li>معماری تمیز</li><li>مدیریت مناسب خطا را پیاده کن</li><li>پروژه‌ات را منتشر کن (در صورت امکان)</li><li>می‌توانی از کتابخانه‌ها یا منابع اضافه‌ای که در درس نبودند استفاده کنی، به شرطی که به پروژه‌ات مرتبط باشند</li></ul>',
        ),
      ],
    },
    // ---------- Project Timeline ----------
    {
      id: 'timeline',
      navLabel: W('Project Timeline', 'الجدول الزمني للمشروع', 'زمان‌بندی پروژه'),
      sectionLabel: W('Section 04', 'القسم ٠٤', 'بخش ۰۴'),
      headingHtml: t('<h2>Project Timeline</h2>', '<h2>الجدول الزمني للمشروع</h2>', '<h2>زمان‌بندی پروژه</h2>'),
      blocks: [
        html(
          '<ul><li>Final submission: Deadline is the end of Week 12 of the semester</li><li>Demo Day: Week 13 of the semester</li></ul>',
          '<ul><li>التسليم النهائي: الموعد النهائي هو نهاية الأسبوع 12 من الفصل الدراسي</li><li>يوم العرض (Demo Day): الأسبوع 13 من الفصل الدراسي</li></ul>',
          '<ul><li>تحویل نهایی: مهلت پایان هفتهٔ ۱۲ ترم است</li><li>روز نمایش (Demo Day): هفتهٔ ۱۳ ترم</li></ul>',
        ),
      ],
    },
    // ---------- Evaluation Criteria ----------
    {
      id: 'evaluation',
      navLabel: W('Evaluation Criteria', 'معايير التقييم', 'معیارهای ارزیابی'),
      sectionLabel: W('Section 05', 'القسم ٠٥', 'بخش ۰۵'),
      headingHtml: t('<h2>Evaluation Criteria</h2>', '<h2>معايير التقييم</h2>', '<h2>معیارهای ارزیابی</h2>'),
      blocks: [
        html(
          '<p>Your project will be evaluated based on:</p><ol><li><strong>Technical Implementation (40%)</strong><ul><li>Code quality and organization</li><li>Appropriate use of technologies</li><li>Functionality and feature completeness</li><li>Performance and optimization</li></ul></li><li><strong>Design and User Experience (20%)</strong><ul><li>Interface design</li><li>User flow and navigation</li><li>Responsiveness and accessibility</li></ul></li><li><strong>Presentation and Documentation (40%)</strong><ul><li>Quality of presentation</li><li>Clarity of explanation</li><li>Completeness of documentation</li></ul></li></ol>',
          '<p>سيُقيَّم مشروعك على أساس:</p><ol><li><strong>التنفيذ التقني (40%)</strong><ul><li>جودة الكود وتنظيمه</li><li>الاستخدام المناسب للتقنيات</li><li>الوظائف واكتمال الميزات</li><li>الأداء والتحسين</li></ul></li><li><strong>التصميم وتجربة المستخدم (20%)</strong><ul><li>تصميم الواجهة</li><li>تدفق المستخدم والتنقل</li><li>التجاوب وإمكانية الوصول</li></ul></li><li><strong>العرض والتوثيق (40%)</strong><ul><li>جودة العرض</li><li>وضوح الشرح</li><li>اكتمال التوثيق</li></ul></li></ol>',
          '<p>پروژه‌ات بر این اساس ارزیابی می‌شود:</p><ol><li><strong>اجرای فنی (۴۰٪)</strong><ul><li>کیفیت و نظم کد</li><li>استفادهٔ مناسب از فناوری‌ها</li><li>کارکرد و کامل بودن ویژگی‌ها</li><li>کارایی و بهینه‌سازی</li></ul></li><li><strong>طراحی و تجربهٔ کاربر (۲۰٪)</strong><ul><li>طراحی رابط</li><li>جریان کاربر و پیمایش</li><li>واکنش‌گرایی و دسترس‌پذیری</li></ul></li><li><strong>ارائه و مستندسازی (۴۰٪)</strong><ul><li>کیفیت ارائه</li><li>روشنی توضیح</li><li>کامل بودن مستندات</li></ul></li></ol>',
        ),
      ],
    },
    // ---------- Submission Process ----------
    {
      id: 'submission',
      navLabel: W('Submission Process', 'عملية التسليم', 'فرایند تحویل'),
      sectionLabel: W('Section 06', 'القسم ٠٦', 'بخش ۰۶'),
      headingHtml: t('<h2>Submission Process</h2>', '<h2>عملية التسليم</h2>', '<h2>فرایند تحویل</h2>'),
      blocks: [
        html(
          '<ol><li>Submit your presentation file</li><li>Include your project description document</li><li>Record a video presentation of your project:<ul><li>To record your screen, you can use a browser extension like Awesome Screen Recorder or, if you don\'t prefer third-party applications, for Windows 10/11 users, you can use the built-in screen recorder accessible by pressing WIN + G.</li><li>Record both your screen showing the project and yourself presenting</li><li>Ensure your voice is clearly audible as you explain your project</li><li>Demonstrate the key functionalities of your project</li><li>Video length requirements:<ul><li>Individual projects: 3-5 minutes</li><li>Group projects: Maximum 7 minutes</li></ul></li><li><strong>Important</strong>: Your video must receive final approval from your mentor before submission</li></ul></li><li>Upload all your materials to the shared Google Drive folder that the facilitator will provide. You will have edit permissions to this folder.</li></ol>',
          '<ol><li>سلّم ملف العرض</li><li>أرفق وثيقة وصف المشروع</li><li>سجّل فيديو تعرض فيه مشروعك:<ul><li>لتسجيل شاشتك، يمكنك استخدام إضافة متصفح مثل Awesome Screen Recorder، أو إن كنت لا تفضّل تطبيقات الطرف الثالث، يمكن لمستخدمي Windows 10/11 استخدام مسجّل الشاشة المدمج بالضغط على WIN + G.</li><li>سجّل شاشتك وهي تعرض المشروع ونفسك وأنت تقدّم</li><li>تأكد أن صوتك مسموع بوضوح وأنت تشرح مشروعك</li><li>استعرض الوظائف الأساسية لمشروعك</li><li>متطلبات مدة الفيديو:<ul><li>المشاريع الفردية: 3-5 دقائق</li><li>المشاريع الجماعية: 7 دقائق كحد أقصى</li></ul></li><li><strong>مهم</strong>: يجب أن يحصل الفيديو على الموافقة النهائية من مرشدك قبل التسليم</li></ul></li><li>ارفع كل موادك إلى مجلد Google Drive المشترك الذي سيوفره الميسّر. ستكون لديك صلاحيات التعديل على هذا المجلد.</li></ol>',
          '<ol><li>فایل ارائه‌ات را تحویل بده</li><li>سند توضیح پروژه‌ات را ضمیمه کن</li><li>یک ویدیوی ارائه از پروژه‌ات ضبط کن:<ul><li>برای ضبط صفحه می‌توانی از یک افزونهٔ مرورگر مثل Awesome Screen Recorder استفاده کنی، یا اگر برنامه‌های شخص ثالث را ترجیح نمی‌دهی، کاربران Windows 10/11 می‌توانند از ضبط‌کنندهٔ داخلی صفحه با فشردن WIN + G استفاده کنند.</li><li>هم صفحه‌ات را که پروژه را نشان می‌دهد ضبط کن و هم خودت را در حال ارائه</li><li>مطمئن شو صدایت هنگام توضیح پروژه به‌روشنی شنیده می‌شود</li><li>کارکردهای کلیدی پروژه‌ات را نمایش بده</li><li>الزامات مدت ویدیو:<ul><li>پروژه‌های فردی: ۳ تا ۵ دقیقه</li><li>پروژه‌های گروهی: حداکثر ۷ دقیقه</li></ul></li><li><strong>مهم</strong>: ویدیوی تو پیش از تحویل باید تأیید نهایی منتورت را بگیرد</li></ul></li><li>همهٔ مطالبت را در پوشهٔ مشترک Google Drive که تسهیلگر فراهم می‌کند بارگذاری کن. روی این پوشه اجازهٔ ویرایش داری.</li></ol>',
        ),
      ],
    },
    // ---------- Individual vs. Group Projects ----------
    {
      id: 'individual-vs-group',
      navLabel: W('Individual vs. Group Projects', 'المشاريع الفردية مقابل الجماعية', 'پروژه‌های فردی در برابر گروهی'),
      sectionLabel: W('Section 07', 'القسم ٠٧', 'بخش ۰۷'),
      headingHtml: t('<h2>Individual vs. Group Projects</h2>', '<h2>المشاريع الفردية مقابل الجماعية</h2>', '<h2>پروژه‌های فردی در برابر گروهی</h2>'),
      blocks: [
        html(
          '<p>Whether you\'ll complete the final project individually or as part of a group depends on your specific course. Please consult with your mentor and tutor to determine the appropriate approach for your track. Some courses may allow students to work in groups on a single project, while others may require individual projects.</p>',
          '<p>إنجاز المشروع النهائي بشكل فردي أو ضمن مجموعة يعتمد على مقررك تحديدًا. يرجى استشارة مرشدك ومدرّسك لتحديد النهج المناسب لمسارك. قد تسمح بعض المقررات للطلاب بالعمل في مجموعات على مشروع واحد، بينما قد تتطلب مقررات أخرى مشاريع فردية.</p>',
          '<p>اینکه پروژهٔ نهایی را فردی انجام دهی یا در یک گروه، به درس خاص تو بستگی دارد. لطفاً با منتور و مدرست مشورت کن تا روش مناسب مسیرت را مشخص کنید. بعضی درس‌ها ممکن است اجازه دهند دانشجویان گروهی روی یک پروژه کار کنند و بعضی دیگر ممکن است پروژهٔ فردی بخواهند.</p>',
        ),
      ],
    },
    // ---------- Certificate Requirement ----------
    {
      id: 'certificate',
      navLabel: W('Certificate Requirement', 'شرط الشهادة', 'شرط گواهی‌نامه'),
      sectionLabel: W('Section 08', 'القسم ٠٨', 'بخش ۰۸'),
      headingHtml: t('<h2>Certificate Requirement</h2>', '<h2>شرط الشهادة</h2>', '<h2>شرط گواهی‌نامه</h2>'),
      blocks: [
        html(
          '<p>Please note that completing and submitting your final project is a mandatory requirement for receiving your certificate from the Women in Tech program. Students who do not complete their final projects will not be eligible to receive certificates.</p>',
          '<p>يرجى ملاحظة أن إكمال مشروعك النهائي وتسليمه شرط إلزامي للحصول على شهادتك من برنامج Women in Tech. ولن يكون الطلاب الذين لا يُكملون مشاريعهم النهائية مؤهلين للحصول على الشهادات.</p>',
          '<p>لطفاً توجه کن که کامل کردن و تحویل پروژهٔ نهایی شرطی الزامی برای گرفتن گواهی‌نامه از برنامهٔ Women in Tech است. دانشجویانی که پروژهٔ نهایی‌شان را کامل نکنند واجد شرایط دریافت گواهی‌نامه نخواهند بود.</p>',
        ),
      ],
    },
    // ---------- FAQ ----------
    {
      id: 'faq',
      navLabel: W('FAQ', 'الأسئلة الشائعة', 'پرسش‌های رایج'),
      sectionLabel: W('Section 09', 'القسم ٠٩', 'بخش ۰۹'),
      headingHtml: t('<h2>FAQ</h2>', '<h2>الأسئلة الشائعة</h2>', '<h2>پرسش‌های رایج</h2>'),
      blocks: [
        html(
          '<ul><li>Q: Can I work in a team?<ul><li>A: This depends on your specific course. Consult with your mentor and tutor for guidance.</li></ul></li><li>Q: Can I use additional libraries not covered in the course?<ul><li>A: Yes, you may use additional libraries as long as they are relevant to your project and goals.</li></ul></li><li>Q: What if I encounter technical difficulties during development?<ul><li>A: Ask your mentor</li></ul></li><li>Q: How long should my video presentation be?<ul><li>A: Individual projects should be 3-5 minutes. Group projects may be up to 7 minutes maximum.</li></ul></li><li>Q: What happens if I miss the submission deadline?<ul><li>A: Missing the deadline may affect your eligibility to receive a certificate. If you anticipate any issues meeting the deadline, contact your mentor immediately.</li></ul></li><li>Q: Can I use AI to write the code for my assignments?<ul><li>A: No. You are a student now, not in a production environment. It is better to submit your own code (even if it\'s imperfect) than to submit AI-generated code. AI-generated code and documentation are absolutely rejected. Use AI wisely to guide you, not to write for you.</li></ul></li><li>Q: How should I name the folders and files for my course submissions?<ul><li>A: When naming your folders and files for submission, please follow these conventions:<p>For Video Submissions:</p><p>Format: <code>video-F26-(course name)-(student name)</code></p><p>Example: <code>video-F26-Python 2-Salwa Mohamad</code></p><p>For PowerPoint Presentations:</p><p>Format: <code>ppt-F26-(course name)-(student name)</code></p><p>Example: <code>ppt-F26-Web Development 1-Lara Khoury</code></p><p>Please make sure to follow this naming convention exactly, as it helps us organize and track all submissions efficiently.</p></li></ul></li></ul>',
          '<ul><li>س: هل يمكنني العمل ضمن فريق؟<ul><li>ج: يعتمد ذلك على مقررك تحديدًا. استشر مرشدك ومدرّسك للتوجيه.</li></ul></li><li>س: هل يمكنني استخدام مكتبات إضافية لم يغطها المقرر؟<ul><li>ج: نعم، يمكنك استخدام مكتبات إضافية ما دامت ذات صلة بمشروعك وأهدافك.</li></ul></li><li>س: ماذا لو واجهت صعوبات تقنية أثناء التطوير؟<ul><li>ج: اسأل مرشدك</li></ul></li><li>س: كم يجب أن تكون مدة فيديو العرض؟<ul><li>ج: المشاريع الفردية 3-5 دقائق. والمشاريع الجماعية حتى 7 دقائق كحد أقصى.</li></ul></li><li>س: ماذا يحدث إن فاتني موعد التسليم؟<ul><li>ج: قد يؤثر تفويت الموعد النهائي في أهليتك للحصول على الشهادة. وإن توقعت أي مشكلة في الالتزام بالموعد، فتواصل مع مرشدك فورًا.</li></ul></li><li>س: هل يمكنني استخدام الذكاء الاصطناعي لكتابة الكود لواجباتي؟<ul><li>ج: لا. أنت طالب الآن، ولست في بيئة إنتاج. من الأفضل أن تسلّم كودك أنت (حتى لو كان غير مثالي) على أن تسلّم كودًا مولّدًا بالذكاء الاصطناعي. الكود والتوثيق المولّدان بالذكاء الاصطناعي مرفوضان تمامًا. استخدم الذكاء الاصطناعي بحكمة ليرشدك، لا ليكتب عنك.</li></ul></li><li>س: كيف يجب أن أسمّي المجلدات والملفات لتسليمات المقرر؟<ul><li>ج: عند تسمية مجلداتك وملفاتك للتسليم، يرجى اتباع هذه الاصطلاحات:<p>لتسليمات الفيديو:</p><p>الصيغة: <code>video-F26-(course name)-(student name)</code></p><p>مثال: <code>video-F26-Python 2-Salwa Mohamad</code></p><p>لعروض PowerPoint:</p><p>الصيغة: <code>ppt-F26-(course name)-(student name)</code></p><p>مثال: <code>ppt-F26-Web Development 1-Lara Khoury</code></p><p>يرجى التأكد من اتباع اصطلاح التسمية هذا بدقة، لأنه يساعدنا على تنظيم كل التسليمات وتتبعها بكفاءة.</p></li></ul></li></ul>',
          '<ul><li>س: می‌توانم گروهی کار کنم؟<ul><li>ج: به درس خاص تو بستگی دارد. برای راهنمایی با منتور و مدرست مشورت کن.</li></ul></li><li>س: می‌توانم از کتابخانه‌های اضافه‌ای که در درس نبودند استفاده کنم؟<ul><li>ج: بله، می‌توانی از کتابخانه‌های اضافه استفاده کنی، به شرطی که به پروژه و هدف‌هایت مرتبط باشند.</li></ul></li><li>س: اگر هنگام توسعه با مشکل فنی روبه‌رو شوم چه؟<ul><li>ج: از منتورت بپرس</li></ul></li><li>س: ویدیوی ارائه‌ام چقدر باید باشد؟<ul><li>ج: پروژه‌های فردی باید ۳ تا ۵ دقیقه باشند. پروژه‌های گروهی می‌توانند حداکثر تا ۷ دقیقه باشند.</li></ul></li><li>س: اگر مهلت تحویل را از دست بدهم چه می‌شود؟<ul><li>ج: از دست دادن مهلت ممکن است بر واجد شرایط بودنت برای گرفتن گواهی‌نامه اثر بگذارد. اگر پیش‌بینی می‌کنی در رسیدن به مهلت مشکلی داشته باشی، فوراً با منتورت تماس بگیر.</li></ul></li><li>س: می‌توانم از هوش مصنوعی برای نوشتن کد تکلیف‌هایم استفاده کنم؟<ul><li>ج: نه. تو الان دانشجویی، نه در محیط تولید. بهتر است کد خودت را (حتی اگر بی‌نقص نباشد) تحویل دهی تا کدی که هوش مصنوعی تولید کرده. کد و مستنداتی که هوش مصنوعی تولید کرده مطلقاً رد می‌شوند. از هوش مصنوعی هوشمندانه برای راهنمایی استفاده کن، نه برای اینکه به‌جای تو بنویسد.</li></ul></li><li>س: پوشه‌ها و فایل‌های تحویل درس را چطور نام‌گذاری کنم؟<ul><li>ج: هنگام نام‌گذاری پوشه‌ها و فایل‌های تحویل، لطفاً این قراردادها را رعایت کن:<p>برای تحویل ویدیو:</p><p>قالب: <code>video-F26-(course name)-(student name)</code></p><p>مثال: <code>video-F26-Python 2-Salwa Mohamad</code></p><p>برای ارائه‌های PowerPoint:</p><p>قالب: <code>ppt-F26-(course name)-(student name)</code></p><p>مثال: <code>ppt-F26-Web Development 1-Lara Khoury</code></p><p>لطفاً مطمئن شو این قرارداد نام‌گذاری را دقیقاً رعایت می‌کنی، چون به ما کمک می‌کند همهٔ تحویل‌ها را به‌خوبی سازمان‌دهی و پیگیری کنیم.</p></li></ul></li></ul>',
        ),
      ],
    },
    // ---------- Closing ----------
    {
      id: 'closing',
      navLabel: W('Good luck!', 'بالتوفيق!', 'موفق باشی!'),
      sectionLabel: W('Section 10', 'القسم ١٠', 'بخش ۱۰'),
      headingHtml: t(
        '<p>We are excited to see your creativity and technical skills in action! Remember that this final project is an opportunity to showcase everything you\'ve learned throughout the program and to create something meaningful that you can add to your portfolio.</p>',
        '<p>نحن متحمسون لرؤية إبداعك ومهاراتك التقنية في العمل! تذكّر أن هذا المشروع النهائي فرصة لعرض كل ما تعلمته طوال البرنامج ولصنع شيء ذي معنى يمكنك إضافته إلى ملف أعمالك.</p>',
        '<p>مشتاقیم خلاقیت و مهارت‌های فنی‌ات را در عمل ببینیم! یادت باشد این پروژهٔ نهایی فرصتی است برای نشان دادن همهٔ آنچه در طول برنامه یاد گرفته‌ای و ساختن چیزی معنادار که بتوانی به نمونه‌کارهایت اضافه کنی.</p>',
      ),
      blocks: [
        html(
          '<p>Good luck!</p><p>Sara Hawchar<br/>WIT Program Manager</p>',
          '<p>بالتوفيق!</p><p>Sara Hawchar<br/>مديرة برنامج WIT</p>',
          '<p>موفق باشی!</p><p>Sara Hawchar<br/>مدیر برنامهٔ WIT</p>',
        ),
      ],
    },
  ],
}
