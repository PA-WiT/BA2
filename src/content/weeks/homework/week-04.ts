import type { Block } from '../../types'
import { L, driveNotice, feedbackTask } from './shared'

// The task is a fresh June export (18 raw rows -> 17 clean, 385 jars) so the lesson's worked May example
// can't be copied. Example answers use the lesson's May export, Peach rows only (ids 3, 6, 9, 12, 15).

export const juneRawSql = `CREATE TABLE jam_sales_june_raw (
  id          INT PRIMARY KEY,
  flavor      TEXT,
  market_date TEXT,
  units_sold  INT
);

INSERT INTO jam_sales_june_raw (id, flavor, market_date, units_sold) VALUES
(1,  'Strawberry', '2024-06-01', 30),
(2,  'Blueberry',  '2024-06-01', 18),
(3,  'peach',      '2024-06-01', 12),
(4,  'Strawberry', '2024-06-08', NULL),
(5,  ' Blueberry', '2024-06-08', 20),
(6,  'Peach',      '2024-06-08', 14),
(7,  'Strawberry', '2024-06-15', 400),
(8,  'Blueberry',  '2024-06-15', 22),
(9,  'Peach',      '15/06/2024', 16),
(10, 'Strawberry', '2024-06-22', 38),
(11, 'Blueberry',  '2024-06-22', 21),
(12, 'Blueberry',  '2024-06-22', 21),
(13, 'Peach',      '2024-06-22', -14),
(14, 'Lemon',      '2024-06-22', 11),
(15, 'Strawberry', '2024-06-29', 44),
(16, 'Blueberry',  '2024-06-29', 25),
(17, 'Peach',      '2024-06-29', 18),
(18, 'LEMON',      '2024-06-29', 12);`

export const week04Homework: Block = {
  type: 'homework',
  notice: driveNotice,
  objectives: [
    L('Profiled a raw export and listed every problem with its row id', 'فحصت تصديرًا خامًا وسردت كل مشكلة مع رقم صفها', 'یک خروجی خام را پروفایل کرده‌ای و هر مشکل را با شمارهٔ سطرش فهرست کرده‌ای'),
    L('Cleaned a copy of the data with a change log, without losing a real sale', 'نظّفت نسخة من البيانات مع سجل تغييرات، دون فقدان عملية بيع حقيقية', 'یک کپی از داده را با گزارش تغییرات تمیز کرده‌ای، بدون از دست دادن یک فروش واقعی'),
    L('Integrated a second source whose names and units disagree', 'دمجت مصدرًا ثانيًا تختلف أسماؤه ووحداته', 'یک منبع دوم را که نام‌ها و واحدهایش ناهمخوان‌اند یکپارچه کرده‌ای'),
    L('Transformed the clean data with labels, a hierarchy and normalization', 'حوّلت البيانات النظيفة بتسميات وتسلسل وتطبيع', 'دادهٔ تمیز را با برچسب، سلسله‌مراتب و نرمال‌سازی تبدیل کرده‌ای'),
  ],
  scenario: L(
    'The example answers use the lesson\'s May export, Peach rows only (ids 3, 6, 9, 12 and 15). Your answers use the whole June export above, so your numbers will be different.',
    'أمثلة الإجابات تستخدم تصدير مايو من الدرس، صفوف الخوخ فقط (3 و6 و9 و12 و15). إجاباتك تستخدم تصدير يونيو كاملًا أعلاه، لذا ستختلف أرقامك.',
    'نمونه‌پاسخ‌ها از خروجی مهِ درس، فقط سطرهای هلو (۳، ۶، ۹، ۱۲ و ۱۵) استفاده می‌کنند. پاسخ‌های تو از کل خروجی ژوئن بالا استفاده می‌کنند، پس اعدادت متفاوت خواهند بود.',
  ),
  tasks: [
    {
      title: L('Profile the June export', 'افحص تصدير يونيو', 'خروجی ژوئن را پروفایل کن'),
      prompt: L(
        '<p>Run profiling queries (SQL or pandas) on <code>jam_sales_june_raw</code>: total rows, rows with units, distinct flavor spellings, min and max units, total units. Then list every problem you find, with its row id and its kind (incomplete, noisy, inconsistent, disguised missing).</p>',
        '<p>شغّل استعلامات الفحص (SQL أو pandas) على <code>jam_sales_june_raw</code>: إجمالي الصفوف، والصفوف التي فيها وحدات، وتهجئات النكهة المميزة، والحد الأدنى والأقصى للوحدات، وإجمالي الوحدات. ثم اسرد كل مشكلة تجدها مع رقم صفها ونوعها (ناقصة، مشوّشة، غير متسقة، مفقودة متنكّرة).</p>',
        '<p>کوئری‌های پروفایل (SQL یا pandas) را روی <code>jam_sales_june_raw</code> اجرا کن: کل سطرها، سطرهای دارای واحد، املاهای یکتای طعم، کمینه و بیشینهٔ واحدها، مجموع واحدها. سپس هر مشکلی پیدا کردی را با شمارهٔ سطر و نوعش (ناقص، نویزی، ناسازگار، گمشدهٔ پنهان) فهرست کن.</p>',
      ),
      analogy: L(
        '<p>It is a doctor\'s check-up: take the measurements and write down the symptoms first. You are not allowed to prescribe yet.</p>',
        '<p>إنه كشف طبي: خذ القياسات ودوّن الأعراض أولًا. لا يُسمح لك بوصف العلاج بعد.</p>',
        '<p>مثل معاینهٔ پزشک است: اول اندازه‌ها را بگیر و علائم را بنویس. هنوز اجازهٔ نسخه نوشتن نداری.</p>',
      ),
      include: [
        L('Your profiling query and its results', 'استعلام الفحص ونتائجه', 'کوئری پروفایل و نتایجش'),
        L('A table of problems: row id, column, what is wrong, kind', 'جدول بالمشكلات: رقم الصف، العمود، الخطأ، النوع', 'جدولی از مشکلات: شمارهٔ سطر، ستون، ایراد، نوع'),
      ],
      example: [
        {
          type: 'code',
          code: `SELECT COUNT(*) AS total_rows, COUNT(units_sold) AS rows_with_units,
       MIN(units_sold) AS min_units, MAX(units_sold) AS max_units, SUM(units_sold) AS total_units
FROM jam_sales_raw
WHERE INITCAP(TRIM(flavor)) = 'Peach';   -- your version: the whole June table
-- total_rows 5 | rows_with_units 5 | min_units -12 | max_units 10 | total_units 16`,
        },
        {
          type: 'table',
          headers: [L('Row', 'الصف', 'سطر'), L('Column', 'العمود', 'ستون'), L('Problem', 'المشكلة', 'مشکل'), L('Kind', 'النوع', 'نوع')],
          rows: [
            [L('3', '3', '۳'), L('market_date', 'market_date', 'market_date'), L('04/05/2024 is not YYYY-MM-DD', '04/05/2024 ليست بصيغة YYYY-MM-DD', '04/05/2024 به شکل YYYY-MM-DD نیست'), L('Inconsistent', 'غير متسقة', 'ناسازگار')],
            [L('9', '9', '۹'), L('units_sold', 'units_sold', 'units_sold'), L('-12 jars is impossible', '‎-12 برطمانًا مستحيل', '‎-12 شیشه ناممکن است'), L('Noisy (invalid)', 'مشوّشة (غير صالحة)', 'نویزی (نامعتبر)')],
            [L('15', '15', '۱۵'), L('whole row', 'الصف كله', 'کل سطر'), L('0 jars on 2024-01-01, the till test', '0 برطمانات في 2024-01-01، اختبار الجهاز', '۰ شیشه در 2024-01-01، آزمایش صندوق'), L('Disguised missing', 'مفقودة متنكّرة', 'گمشدهٔ پنهان')],
          ],
        },
      ],
    },
    {
      title: L('Clean it, with a change log', 'نظّفه، مع سجل تغييرات', 'تمیزش کن، با گزارش تغییرات'),
      prompt: L(
        '<p>Copy the table, fix every problem from Question 1 on the copy, and write a change log. Use the paper log and the owner\'s confirmation given above for the two values you can\'t work out yourself. Report COUNT and SUM of units before and after.</p>',
        '<p>انسخ الجدول، وأصلح كل مشكلة من السؤال 1 على النسخة، واكتب سجل تغييرات. استخدم السجل الورقي وتأكيد المالك الواردين أعلاه للقيمتين اللتين لا تستطيع استنتاجهما بنفسك. أبلغ عن COUNT وSUM للوحدات قبل التنظيف وبعده.</p>',
        '<p>جدول را کپی کن، هر مشکل سؤال ۱ را روی کپی درست کن و گزارش تغییرات بنویس. برای دو مقداری که خودت نمی‌توانی بفهمی، از دفتر کاغذی و تأیید مالک که بالا آمده استفاده کن. COUNT و SUM واحدها را پیش و پس از پاک‌سازی گزارش کن.</p>',
      ),
      analogy: L(
        '<p>Think of a mechanic\'s job card: every repair is written down with the part, the old value and the reason, so the owner can check the bill line by line.</p>',
        '<p>فكّر في بطاقة عمل الميكانيكي: يُدوَّن كل إصلاح مع القطعة والقيمة القديمة والسبب، ليتحقق المالك من الفاتورة سطرًا سطرًا.</p>',
        '<p>کارت کار مکانیک را تصور کن: هر تعمیر با قطعه، مقدار قبلی و دلیل نوشته می‌شود تا مالک بتواند صورت‌حساب را خط‌به‌خط چک کند.</p>',
      ),
      include: [
        L('Your cleaning script (SQL, pandas or Power Query steps), working on a copy', 'سكربت التنظيف (SQL أو pandas أو خطوات Power Query)، يعمل على نسخة', 'اسکریپت پاک‌سازی (SQL، pandas یا گام‌های Power Query)، روی یک کپی'),
        L('A change log table: row, from → to, why', 'جدول سجل التغييرات: الصف، من ← إلى، لماذا', 'جدول گزارش تغییرات: سطر، از ← به، چرا'),
        L('COUNT and SUM before and after, and one sentence on why they changed', 'COUNT وSUM قبل وبعد، وجملة عن سبب تغيّرهما', 'COUNT و SUM پیش و پس، و یک جمله دربارهٔ اینکه چرا تغییر کردند'),
      ],
      example: [
        {
          type: 'code',
          code: `CREATE TABLE peach_clean AS
SELECT * FROM jam_sales_raw WHERE INITCAP(TRIM(flavor)) = 'Peach';

UPDATE peach_clean SET market_date = '2024-05-04' WHERE id = 3;  -- day-first date
UPDATE peach_clean SET units_sold = 12 WHERE id = 9;             -- sign error
DELETE FROM peach_clean WHERE id = 15;                            -- till test row

SELECT COUNT(*), SUM(units_sold) FROM peach_clean;   -- before: 5 | 16   after: 4 | 40`,
        },
        {
          type: 'html',
          html: L(
            '<p>Peach went from 5 rows and 16 jars to 4 rows and 40 jars: the -12 was pulling the total down by 24 jars, and the test row added a fake fifth market day. 40 matches Week 2\'s Peach total, so no real sale was lost.</p>',
            '<p>انتقل الخوخ من 5 صفوف و16 برطمانًا إلى 4 صفوف و40 برطمانًا: كانت قيمة ‎-12 تخفض الإجمالي بمقدار 24 برطمانًا، وأضاف صف الاختبار يوم سوق خامسًا مزيفًا. يطابق 40 إجمالي الخوخ في الأسبوع 2، فلم تُفقد أي عملية بيع حقيقية.</p>',
            '<p>هلو از ۵ سطر و ۱۶ شیشه به ۴ سطر و ۴۰ شیشه رسید: ‎-12 مجموع را ۲۴ شیشه پایین می‌کشید و سطر آزمایشی یک روز بازار پنجم جعلی اضافه می‌کرد. ۴۰ با مجموع هلو در هفتهٔ ۲ می‌خواند، پس هیچ فروش واقعی‌ای از دست نرفت.</p>',
          ),
        },
      ],
    },
    {
      title: L('Add the supplier\'s prices', 'أضف أسعار المورّد', 'قیمت‌های تأمین‌کننده را اضافه کن'),
      prompt: L(
        '<p>Join your clean June table to <code>supplier_prices</code> (Section 8) on a cleaned key, convert cents to dollars, and compute units and revenue per flavor. Show that the join kept every clean row.</p>',
        '<p>اربط جدول يونيو النظيف بـ <code>supplier_prices</code> (القسم 8) على مفتاح منظّف، وحوّل السنتات إلى دولارات، واحسب الوحدات والإيراد لكل نكهة. أثبت أن الربط أبقى كل صف نظيف.</p>',
        '<p>جدول تمیز ژوئن را روی یک کلید تمیز به <code>supplier_prices</code> (بخش ۸) join کن، سنت را به دلار تبدیل کن و واحدها و درآمد هر طعم را حساب کن. نشان بده join همهٔ سطرهای تمیز را نگه داشته است.</p>',
      ),
      analogy: L(
        '<p>Two class registers spell the same student differently and grade out of different totals. Agree who is who and put the grades on one scale before you rank anyone.</p>',
        '<p>قائمتا صفّين تكتبان اسم الطالب نفسه بطريقتين وتعطيان الدرجات من مجموعين مختلفين. اتفق على من هو من وضع الدرجات على مقياس واحد قبل ترتيب أحد.</p>',
        '<p>دو دفتر کلاس نام یک شاگرد را متفاوت می‌نویسند و نمره را از سقف‌های مختلف می‌دهند. پیش از رتبه‌بندی هر کسی، توافق کن چه کسی کیست و نمره‌ها را روی یک مقیاس ببر.</p>',
      ),
      include: [
        L('Your join query, with the key cleaned on both sides', 'استعلام الربط، مع تنظيف المفتاح في الجانبين', 'کوئری join، با کلید تمیزشده در هر دو طرف'),
        L('Units, price and revenue per flavor', 'الوحدات والسعر والإيراد لكل نكهة', 'واحدها، قیمت و درآمد هر طعم'),
        L('Row count after the join, and how many prices are NULL', 'عدد الصفوف بعد الربط، وكم سعرًا قيمته NULL', 'تعداد سطرها پس از join و اینکه چند قیمت NULL است'),
      ],
      example: [
        {
          type: 'code',
          code: `SELECT s.flavor, SUM(s.units_sold) AS units, sp.price_cents / 100.0 AS price,
       ROUND(SUM(s.units_sold) * sp.price_cents / 100.0, 2) AS revenue
FROM jam_sales_clean s
LEFT JOIN supplier_prices sp
  ON UPPER(REPLACE(s.flavor, ' ', '')) = UPPER(REPLACE(sp.flavour_name, ' ', ''))
WHERE s.flavor IN ('Peach', 'Lemon')   -- your version: every flavor, June table
GROUP BY s.flavor, sp.price_cents;
-- Peach 40 | 4.00 | 160.00
-- Lemon  9 | 4.50 |  40.50`,
        },
        {
          type: 'html',
          html: L(
            '<p>Both flavors found a price, so no NULLs: the LEFT JOIN kept all 5 Peach and Lemon rows. Lemon\'s $40.50 is new information; before the supplier sheet, Lemon could not be priced at all.</p>',
            '<p>وجدت النكهتان سعرًا، فلا قيم NULL: أبقى LEFT JOIN صفوف الخوخ والليمون الخمسة كلها. إيراد Lemon ‏(40.50 دولارًا) معلومة جديدة؛ قبل ورقة المورّد لم يكن ممكنًا تسعير Lemon أصلًا.</p>',
            '<p>هر دو طعم قیمت پیدا کردند، پس هیچ NULL نیست: LEFT JOIN هر ۵ سطر هلو و لیمو را نگه داشت. ۴۰٫۵۰ دلار Lemon اطلاعات تازه است؛ پیش از برگهٔ تأمین‌کننده اصلاً نمی‌شد برای Lemon قیمت گذاشت.</p>',
          ),
        },
      ],
    },
    {
      title: L('Reshape it for the owner', 'أعد تشكيله للمالك', 'برای مالک تغییر شکلش بده'),
      prompt: L(
        '<p>Label every clean June row as slow (under 12 jars), normal (12–24) or busy (25+), roll the units up by fruit family (berry, stone fruit, citrus), and min-max normalize the family totals. In two sentences, tell the owner what the labels and the families show.</p>',
        '<p>صنّف كل صف نظيف في يونيو إلى بطيء (أقل من 12 برطمانًا) أو عادي (12–24) أو مزدحم (25 فأكثر)، واجمع الوحدات لأعلى حسب عائلة الفاكهة (توتيات، ذات نواة، حمضيات)، وطبّع إجماليات العائلات بطريقة min-max. في جملتين، أخبر المالك بما تُظهره التسميات والعائلات.</p>',
        '<p>هر سطر تمیز ژوئن را کند (کمتر از ۱۲ شیشه)، عادی (۱۲ تا ۲۴) یا شلوغ (۲۵ به بالا) برچسب بزن، واحدها را بر اساس خانوادهٔ میوه (توت‌ها، هسته‌دارها، مرکبات) roll up کن و مجموع خانواده‌ها را با min-max نرمال کن. در دو جمله به مالک بگو برچسب‌ها و خانواده‌ها چه نشان می‌دهند.</p>',
      ),
      analogy: L(
        '<p>Like a map with zoom levels: single market days are the street view, fruit families are the city view. Normalizing puts the cities on one 0-to-1 ruler so they can be compared at a glance.</p>',
        '<p>كخريطة بمستويات تكبير: أيام السوق المفردة هي منظر الشارع، وعائلات الفاكهة هي منظر المدينة. يضع التطبيع المدن على مسطرة واحدة من 0 إلى 1 لتُقارن بنظرة.</p>',
        '<p>مثل نقشه‌ای با سطح‌های بزرگ‌نمایی: تک‌روزهای بازار نمای خیابان‌اند و خانواده‌های میوه نمای شهر. نرمال‌سازی شهرها را روی یک خط‌کش ۰ تا ۱ می‌گذارد تا در یک نگاه مقایسه شوند.</p>',
      ),
      include: [
        L('The count of slow, normal and busy rows', 'عدد الصفوف البطيئة والعادية والمزدحمة', 'تعداد سطرهای کند، عادی و شلوغ'),
        L('Units per fruit family and their min-max values', 'الوحدات لكل عائلة فاكهة وقيم min-max لها', 'واحدهای هر خانوادهٔ میوه و مقدارهای min-max آن‌ها'),
        L('Two sentences for the owner', 'جملتان للمالك', 'دو جمله برای مالک'),
      ],
      example: [
        {
          type: 'table',
          headers: [L('May (lesson data)', 'مايو (بيانات الدرس)', 'مه (دادهٔ درس)'), L('Result', 'النتيجة', 'نتیجه')],
          rows: [
            [L('Peach rows labelled', 'تسميات صفوف الخوخ', 'برچسب سطرهای هلو'), L('10 slow, 8 slow, 12 normal, 10 slow: 3 slow, 1 normal', '10 بطيء، 8 بطيء، 12 عادي، 10 بطيء: 3 بطيئة و1 عادي', '۱۰ کند، ۸ کند، ۱۲ عادی، ۱۰ کند: ۳ کند، ۱ عادی')],
            [L('Units by family', 'الوحدات حسب العائلة', 'واحدها بر حسب خانواده'), L('berry 160, stone fruit 40, citrus 9', 'توتيات 160، ذات نواة 40، حمضيات 9', 'توت‌ها ۱۶۰، هسته‌دارها ۴۰، مرکبات ۹')],
            [L('Min-max of family totals', 'min-max لإجماليات العائلات', 'min-max مجموع خانواده‌ها'), L('berry 1.00, stone fruit 0.21, citrus 0.00', 'توتيات 1.00، ذات نواة 0.21، حمضيات 0.00', 'توت‌ها ۱٫۰۰، هسته‌دارها ۰٫۲۱، مرکبات ۰٫۰۰')],
          ],
        },
        {
          type: 'html',
          html: L(
            '<p>Peach had mostly slow days in May, so one person can run the Peach table. Berries carry the stand (1.00 on the family scale), while Peach sits about a fifth of the way up and Lemon is still too new to compare.</p>',
            '<p>كانت أيام الخوخ في مايو بطيئة غالبًا، فيكفي شخص واحد لطاولة الخوخ. التوتيات تحمل الكشك (1.00 على مقياس العائلات)، بينما يقع الخوخ عند نحو خُمس المسافة، والليمون ما زال جديدًا جدًا للمقارنة.</p>',
            '<p>هلو در مه بیشتر روزهای کند داشت، پس یک نفر می‌تواند میز هلو را بچرخاند. توت‌ها بار غرفه را می‌کشند (۱٫۰۰ روی مقیاس خانواده)، هلو حدود یک‌پنجم مسیر بالا است و لیمو هنوز برای مقایسه خیلی تازه است.</p>',
          ),
        },
      ],
    },
  ],
  feedback: feedbackTask,
}
