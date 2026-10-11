import type { Block } from '../../types'
import { L, feedbackTask, projectNotice } from './shared'

// Week 4 homework is step 1 of the pair final project (roadmap on the Final Project page): pick a case,
// define the project, and profile the dataset. Example answers treat the lesson's jam stand as if it were a
// project, so they show the format without doing any case study for the students.
export const week04Homework: Block = {
  type: 'homework',
  notice: projectNotice,
  objectives: [
    L('Formed a pair and chosen one case study from the Final Project page', 'كوّنت فريقًا من شخصين واخترت دراسة حالة واحدة من صفحة المشروع النهائي', 'یک گروه دونفره ساخته‌ای و یک مطالعهٔ موردی از صفحهٔ پروژهٔ نهایی انتخاب کرده‌ای'),
    L('Written your project title, goals and expected outcomes (project parts 1 and 2)', 'كتبت عنوان مشروعك وأهدافه ونتائجه المتوقعة (الجزءان 1 و2 من المشروع)', 'عنوان، هدف‌ها و نتایج مورد انتظار پروژه‌ات را نوشته‌ای (بخش‌های ۱ و ۲ پروژه)'),
    L('Profiled your dataset and planned how you will clean it in Week 5', 'فحصت مجموعة بياناتك وخطّطت لكيفية تنظيفها في الأسبوع 5', 'مجموعه‌داده‌ات را پروفایل کرده‌ای و برای پاک‌سازی‌اش در هفتهٔ ۵ برنامه ریخته‌ای'),
  ],
  scenario: L(
    'The example answers treat the jam stand from this week\'s lesson as if it were a project. Your answers are about your pair\'s case study and its dataset.',
    'تتعامل أمثلة الإجابات مع كشك المربى من درس هذا الأسبوع كأنه مشروع. إجاباتكما تخص دراسة الحالة التي اخترتماها ومجموعة بياناتها.',
    'نمونه‌پاسخ‌ها با غرفهٔ مربای درس این هفته طوری رفتار می‌کنند که انگار یک پروژه است. پاسخ‌های شما دربارهٔ مطالعهٔ موردی گروهتان و مجموعه‌داده‌اش است.',
  ),
  tasks: [
    {
      title: L('Start your project: case, title, goals', 'ابدأ مشروعك: الحالة والعنوان والأهداف', 'پروژه‌ات را شروع کن: مورد، عنوان، هدف‌ها'),
      prompt: L(
        '<p>With your partner, pick one case study from the <a href="/week/final-project">Final Project page</a> and tell your mentor which one. Then write, in your project document: a specific <strong>title</strong>, 2–3 <strong>goals</strong> starting with "To…", 3–4 measurable <strong>expected outcomes</strong>, and a short <strong>dataset</strong> note (source link, file name, number of rows, the 4–6 columns that matter most).</p>',
        '<p>مع شريكك، اختر دراسة حالة واحدة من <a href="/week/final-project">صفحة المشروع النهائي</a> وأخبر مرشدك بها. ثم اكتبا في مستند المشروع: <strong>عنوانًا</strong> محددًا، و2–3 <strong>أهداف</strong> تبدأ بـ"أن…"، و3–4 <strong>نتائج متوقعة</strong> قابلة للقياس، وملاحظة قصيرة عن <strong>البيانات</strong> (رابط المصدر، اسم الملف، عدد الصفوف، أهم 4–6 أعمدة).</p>',
        '<p>با هم‌گروهی‌ات یک مطالعهٔ موردی از <a href="/week/final-project">صفحهٔ پروژهٔ نهایی</a> انتخاب کن و به منتورت بگو کدام است. سپس در سند پروژه بنویسید: یک <strong>عنوان</strong> مشخص، ۲ تا ۳ <strong>هدف</strong> که با «اینکه…» شروع می‌شوند، ۳ تا ۴ <strong>نتیجهٔ مورد انتظار</strong> قابل اندازه‌گیری، و یک یادداشت کوتاه دربارهٔ <strong>داده</strong> (پیوند منبع، نام فایل، تعداد سطرها، ۴ تا ۶ ستون مهم‌تر).</p>',
      ),
      analogy: L(
        '<p>A title and goals are a film\'s title and trailer: before anyone watches two hours, they know what the story is about and what they will get out of it. "Sales Analysis" is a film called "Movie".</p>',
        '<p>العنوان والأهداف هما عنوان الفيلم وإعلانه: قبل أن يشاهد أحد ساعتين، يعرف عمّ تدور القصة وماذا سيكسب منها. "تحليل المبيعات" فيلم اسمه "فيلم".</p>',
        '<p>عنوان و هدف‌ها مثل عنوان و تیزر یک فیلم‌اند: پیش از اینکه کسی دو ساعت تماشا کند، می‌داند داستان دربارهٔ چیست و چه چیزی از آن می‌گیرد. «تحلیل فروش» یعنی فیلمی به اسم «فیلم».</p>',
      ),
      include: [
        L('Case study id and both partners\' names', 'رقم دراسة الحالة واسما الشريكين', 'شمارهٔ مطالعهٔ موردی و نام هر دو نفر'),
        L('A specific title that names the business and the question', 'عنوان محدد يذكر النشاط التجاري والسؤال', 'عنوانی مشخص که کسب‌وکار و سؤال را نام ببرد'),
        L('2–3 goals ("To…") and 3–4 expected outcomes you could check at the end', '2–3 أهداف ("أن…") و3–4 نتائج متوقعة يمكن التحقق منها في النهاية', '۲ تا ۳ هدف («اینکه…») و ۳ تا ۴ نتیجهٔ مورد انتظار که در پایان قابل بررسی باشند'),
        L('Dataset: source link, file, rows, key columns', 'البيانات: رابط المصدر، الملف، الصفوف، الأعمدة الأساسية', 'داده: پیوند منبع، فایل، سطرها، ستون‌های کلیدی'),
      ],
      example: [
        {
          type: 'html',
          html: L(
            '<p><strong>Title:</strong> Which jam flavors should a weekend market stand stock each month?</p><p><strong>Goals:</strong></p><ul><li>To find which flavors bring in the most revenue and profit.</li><li>To understand how demand for each flavor changes through the year.</li><li>To give the owner a monthly stocking plan.</li></ul><p><strong>Expected outcomes:</strong></p><ul><li>A ranked list of flavors by profit and by margin.</li><li>A line chart of monthly units per flavor with the peak month of each.</li><li>A regression of units sold against month or temperature, if the data allows.</li><li>A one-page stocking recommendation for next season.</li></ul><p><strong>Dataset:</strong> the stand\'s till export <code>jam_sales_raw</code> (15 rows; flavor, market_date, units_sold), the supplier price sheet (4 rows) and the 2024 monthly log (12 rows × 3 flavors).</p>',
            '<p><strong>العنوان:</strong> أي نكهات المربى يجب أن يخزّنها كشك سوق نهاية الأسبوع كل شهر؟</p><p><strong>الأهداف:</strong></p><ul><li>أن نعرف أي النكهات تحقق أعلى إيراد وربح.</li><li>أن نفهم كيف يتغير الطلب على كل نكهة خلال السنة.</li><li>أن نعطي المالك خطة تخزين شهرية.</li></ul><p><strong>النتائج المتوقعة:</strong></p><ul><li>قائمة مرتبة للنكهات حسب الربح والهامش.</li><li>رسم خطي للوحدات الشهرية لكل نكهة مع شهر الذروة لكل منها.</li><li>انحدار للوحدات المباعة مقابل الشهر أو الحرارة، إن سمحت البيانات.</li><li>توصية تخزين من صفحة واحدة للموسم القادم.</li></ul><p><strong>البيانات:</strong> تصدير جهاز الدفع <code>jam_sales_raw</code> ‏(15 صفًا؛ flavor وmarket_date وunits_sold)، وورقة أسعار المورّد (4 صفوف)، والسجل الشهري لعام 2024 (12 صفًا × 3 نكهات).</p>',
            '<p><strong>عنوان:</strong> یک غرفهٔ بازار آخر هفته هر ماه کدام طعم‌های مربا را باید انبار کند؟</p><p><strong>هدف‌ها:</strong></p><ul><li>اینکه بفهمیم کدام طعم‌ها بیشترین درآمد و سود را دارند.</li><li>اینکه بفهمیم تقاضای هر طعم در طول سال چگونه تغییر می‌کند.</li><li>اینکه به مالک یک برنامهٔ انبار ماهانه بدهیم.</li></ul><p><strong>نتایج مورد انتظار:</strong></p><ul><li>فهرست رتبه‌بندی‌شدهٔ طعم‌ها بر اساس سود و حاشیه.</li><li>نمودار خطی واحدهای ماهانهٔ هر طعم با ماه اوج هر کدام.</li><li>رگرسیون واحدهای فروخته‌شده در برابر ماه یا دما، اگر داده اجازه دهد.</li><li>یک توصیهٔ یک‌صفحه‌ای انبار برای فصل بعد.</li></ul><p><strong>داده:</strong> خروجی صندوق <code>jam_sales_raw</code> (۱۵ سطر؛ flavor، market_date، units_sold)، برگهٔ قیمت تأمین‌کننده (۴ سطر) و لاگ ماهانهٔ ۲۰۲۴ (۱۲ سطر × ۳ طعم).</p>',
          ),
        },
      ],
    },
    {
      title: L('Profile your dataset and plan the cleaning', 'افحص بياناتك وخطّط للتنظيف', 'داده‌ات را پروفایل کن و برای پاک‌سازی برنامه بریز'),
      prompt: L(
        '<p>Open your dataset in Excel, Python (pandas) or Power BI and profile it the way this week\'s Section 3 does: number of rows and columns, blanks per column, distinct values of 2 category columns, and min / max / mean of 2 numeric columns. List every problem you find, then write a <strong>cleaning plan</strong>: what you will fix in Week 5, how, and why. Don\'t clean anything yet.</p>',
        '<p>افتح بياناتك في Excel أو Python ‏(pandas) أو Power BI وافحصها كما يفعل القسم 3 من هذا الأسبوع: عدد الصفوف والأعمدة، والفراغات في كل عمود، والقيم المميزة لعمودين فئويين، والحد الأدنى والأقصى والمتوسط لعمودين رقميين. اسرد كل مشكلة تجدها، ثم اكتب <strong>خطة تنظيف</strong>: ما الذي ستصلحه في الأسبوع 5، وكيف، ولماذا. لا تنظّف شيئًا بعد.</p>',
        '<p>داده‌ات را در Excel، Python ‏(pandas) یا Power BI باز کن و همان‌طور که بخش ۳ این هفته انجام می‌دهد پروفایلش کن: تعداد سطرها و ستون‌ها، خانه‌های خالی هر ستون، مقدارهای یکتای ۲ ستون دسته‌ای و کمینه / بیشینه / میانگین ۲ ستون عددی. هر مشکلی پیدا کردی فهرست کن، سپس یک <strong>برنامهٔ پاک‌سازی</strong> بنویس: در هفتهٔ ۵ چه چیزی را، چگونه و چرا درست می‌کنی. هنوز چیزی را تمیز نکن.</p>',
      ),
      analogy: L(
        '<p>It is the check-up before the operation: the doctor measures, writes down the symptoms and plans the treatment, but nobody picks up a scalpel today. Week 5 is the operation.</p>',
        '<p>إنه الفحص قبل العملية: يقيس الطبيب ويدوّن الأعراض ويخطط للعلاج، لكن لا أحد يمسك المشرط اليوم. الأسبوع 5 هو العملية.</p>',
        '<p>معاینهٔ پیش از عمل است: پزشک اندازه می‌گیرد، علائم را می‌نویسد و درمان را برنامه‌ریزی می‌کند، اما امروز کسی چاقوی جراحی برنمی‌دارد. هفتهٔ ۵ همان عمل است.</p>',
      ),
      include: [
        L('A profile table with the numbers above', 'جدول فحص بالأرقام المذكورة أعلاه', 'یک جدول پروفایل با عددهای بالا'),
        L('A problem table: column (and rows), what is wrong, kind (incomplete, noisy, inconsistent, disguised missing)', 'جدول مشكلات: العمود (والصفوف)، الخطأ، النوع (ناقصة، مشوّشة، غير متسقة، مفقودة متنكّرة)', 'جدول مشکلات: ستون (و سطرها)، ایراد، نوع (ناقص، نویزی، ناسازگار، گمشدهٔ پنهان)'),
        L('A cleaning plan: one line per problem with the fix and the reason', 'خطة تنظيف: سطر لكل مشكلة مع الإصلاح والسبب', 'برنامهٔ پاک‌سازی: یک خط برای هر مشکل با راه اصلاح و دلیل'),
      ],
      example: [
        {
          type: 'table',
          headers: [L('Profile', 'الفحص', 'پروفایل'), L('Jam stand May export', 'تصدير مايو لكشك المربى', 'خروجی مه غرفهٔ مربا')],
          rows: [
            [L('Rows × columns', 'الصفوف × الأعمدة', 'سطر × ستون'), L('15 × 4', '15 × 4', '۱۵ × ۴')],
            [L('Blanks', 'الفراغات', 'خانه‌های خالی'), L('units_sold: 1; other columns: 0', 'units_sold: ‏1؛ الأعمدة الأخرى: 0', 'units_sold: ۱؛ ستون‌های دیگر: ۰')],
            [L('Distinct flavor values', 'القيم المميزة للنكهة', 'مقدارهای یکتای flavor'), L('6 (for 4 real flavors)', '6 (لأربع نكهات حقيقية)', '۶ (برای ۴ طعم واقعی)')],
            [L('units_sold min / max / mean', 'units_sold الأدنى / الأقصى / المتوسط', 'units_sold کمینه / بیشینه / میانگین'), L('-12 / 180 / 26.43', '-12 / 180 / 26.43', '‎-12 / ۱۸۰ / ۲۶٫۴۳')],
          ],
        },
        {
          type: 'table',
          headers: [L('Problem', 'المشكلة', 'مشکل'), L('Kind', 'النوع', 'نوع'), L('Plan for Week 5', 'الخطة للأسبوع 5', 'برنامه برای هفتهٔ ۵')],
          rows: [
            [L('flavor: "blueberry", "Strawberry " (rows 2, 4)', 'flavor: ‏"blueberry" و"Strawberry " (الصفان 2 و4)', 'flavor: ‏"blueberry"، "Strawberry " (سطرهای ۲ و ۴)'), L('Inconsistent', 'غير متسقة', 'ناسازگار'), L('TRIM + PROPER on a copy, so 4 flavors remain', 'TRIM + PROPER على نسخة، لتبقى 4 نكهات', 'TRIM + PROPER روی یک کپی تا ۴ طعم بماند')],
            [L('units_sold blank (row 5)', 'units_sold فارغ (الصف 5)', 'units_sold خالی (سطر ۵)'), L('Incomplete', 'ناقصة', 'ناقص'), L('Ask the owner for the paper log value; don\'t use 0', 'اطلب قيمة السجل الورقي من المالك؛ لا تستخدم 0', 'مقدار دفتر کاغذی را از مالک بپرس؛ از ۰ استفاده نکن')],
            [L('units_sold -12 and 180 (rows 9, 7)', 'units_sold قيمتا ‎-12 و180 (الصفان 9 و7)', 'units_sold مقدارهای ‎-12 و ۱۸۰ (سطرهای ۹ و ۷)'), L('Noisy', 'مشوّشة', 'نویزی'), L('Fix the sign; check 180 with the owner before changing', 'أصلح الإشارة؛ وتحقق من 180 مع المالك قبل التغيير', 'علامت را درست کن؛ ۱۸۰ را پیش از تغییر با مالک چک کن')],
            [L('Row 15: 0 jars on 2024-01-01', 'الصف 15: ‏0 برطمانات في 2024-01-01', 'سطر ۱۵: ۰ شیشه در 2024-01-01'), L('Disguised missing', 'مفقودة متنكّرة', 'گمشدهٔ پنهان'), L('Delete: it is the till\'s test row', 'احذفه: إنه صف اختبار الجهاز', 'حذف: سطر آزمایشی صندوق است')],
          ],
        },
      ],
    },
  ],
  feedback: feedbackTask,
}
