import type { Block } from '../../types'
import { L, feedbackTask } from './shared'

// Example answers use a bookshop (book_sales + books, made-up numbers) instead of the jam stand.
export const week02Homework: Block = {
  type: 'homework',
  scenario: L(
    "The example answers below are for a different business: a bookshop with a books(title, price, cost) table and a book_sales(id, title, sale_date, copies) table of 10 sales. One title, Atlas, has sales but no row in books yet. The numbers are invented. Copy the format and depth, not the content; your answers use jam_sales and jam_products.",
    'أمثلة الإجابات أدناه لنشاط تجاري مختلف: مكتبة لديها جدول books(title, price, cost) وجدول book_sales(id, title, sale_date, copies) يضم 10 عمليات بيع. أحد العناوين، Atlas، له مبيعات لكن لا صف له في books بعد. الأرقام مُختلَقة. انسخ الشكل والعمق لا المحتوى؛ إجاباتك تستخدم jam_sales وjam_products.',
    'نمونه‌پاسخ‌های زیر برای یک کسب‌وکار دیگر است: یک کتاب‌فروشی با جدول books(title, price, cost) و جدول book_sales(id, title, sale_date, copies) شامل ۱۰ فروش. یکی از عنوان‌ها، Atlas، فروش دارد اما هنوز در books سطری ندارد. اعداد ساختگی‌اند. قالب و عمق را الگو بگیر، نه محتوا را؛ پاسخ‌های تو از jam_sales و jam_products استفاده می‌کنند.',
  ),
  tasks: [
    {
      title: L('Set the scene', 'مهّد للموقف', 'صحنه را بچین'),
      prompt: L(
        '<p>In 2–3 sentences, describe the two tables and the question the stand owner wants answered.</p>',
        '<p>في 2–3 جمل، صِف الجدولين والسؤال الذي يريد صاحب الكشك إجابته.</p>',
        '<p>در ۲ تا ۳ جمله، دو جدول و سؤالی را که صاحب غرفه می‌خواهد پاسخش را بداند توضیح بده.</p>',
      ),
      include: [
        L('What each table holds and how they connect', 'ما الذي يحويه كل جدول وكيف يرتبطان', 'هر جدول چه چیزی دارد و چگونه به هم وصل می‌شوند'),
        L('The decision behind the question', 'القرار وراء السؤال', 'تصمیم پشت سؤال'),
      ],
      example: [
        {
          type: 'html',
          html: L(
            '<p>books lists each title once with its price and cost; book_sales records every sale with the title and the number of copies, and the two connect on title. The owner wants to know which title earns the most profit, to decide which books to reorder before the holidays.</p>',
            '<p>يضم books كل عنوان مرة واحدة مع سعره وتكلفته؛ ويسجّل book_sales كل عملية بيع مع العنوان وعدد النسخ، ويرتبط الجدولان عبر title. يريد المالك معرفة العنوان الذي يحقق أكبر ربح، ليقرر أي الكتب يعيد طلبها قبل العطلات.</p>',
            '<p>books هر عنوان را یک بار با قیمت و هزینه‌اش فهرست می‌کند؛ book_sales هر فروش را با عنوان و تعداد نسخه ثبت می‌کند و این دو از طریق title به هم وصل‌اند. مالک می‌خواهد بداند کدام عنوان بیشترین سود را دارد تا بداند پیش از تعطیلات کدام کتاب‌ها را دوباره سفارش دهد.</p>',
          ),
        },
      ],
    },
    {
      title: L('Why two tables, not one', 'لماذا جدولان وليس جدولًا واحدًا', 'چرا دو جدول و نه یکی'),
      prompt: L(
        '<p>Explain why price and cost live in jam_products instead of being copied into every row of jam_sales.</p>',
        '<p>اشرح لماذا يوجد السعر والتكلفة في jam_products بدلًا من نسخهما في كل صف من jam_sales.</p>',
        '<p>توضیح بده چرا قیمت و هزینه در jam_products نگه داشته می‌شوند و نه اینکه در هر سطر jam_sales کپی شوند.</p>',
      ),
      include: [
        L('What goes wrong when the same value is copied into many rows', 'ما الخطأ الذي يحدث عند نسخ القيمة نفسها في صفوف كثيرة', 'وقتی یک مقدار در سطرهای زیادی کپی شود چه مشکلی پیش می‌آید'),
      ],
      example: [
        {
          type: 'html',
          html: L(
            "<p>If Dune's price were copied into every sale, a price change would have to be edited in dozens of rows, and missing one would make two rows disagree. Keeping it once in books means one edit updates every report.</p>",
            '<p>لو نُسخ سعر Dune في كل عملية بيع، لوجب تعديل أي تغيير في السعر في عشرات الصفوف، ونسيان صف واحد يجعل صفين يتعارضان. حفظه مرة واحدة في books يعني أن تعديلًا واحدًا يحدّث كل التقارير.</p>',
            '<p>اگر قیمت Dune در هر فروش کپی می‌شد، هر تغییر قیمت باید در ده‌ها سطر ویرایش می‌شد و جا انداختن یکی باعث می‌شد دو سطر با هم ناهمخوان شوند. نگه داشتن آن فقط یک بار در books یعنی یک ویرایش همهٔ گزارش‌ها را به‌روز می‌کند.</p>',
          ),
        },
      ],
    },
    {
      title: L('INNER JOIN vs. LEFT JOIN', 'INNER JOIN مقابل LEFT JOIN', 'INNER JOIN در برابر LEFT JOIN'),
      prompt: L(
        '<p>Run both joins yourself. Compare the row counts, explain what happens to the Lemon row, and say when INNER JOIN would actually be the right choice.</p>',
        '<p>شغّل الربطين بنفسك. قارن عدد الصفوف، واشرح ما يحدث لصف Lemon، وقل متى يكون INNER JOIN هو الاختيار الصحيح فعلًا.</p>',
        '<p>هر دو join را خودت اجرا کن. تعداد سطرها را مقایسه کن، توضیح بده چه بر سر سطر Lemon می‌آید و بگو چه زمانی INNER JOIN واقعاً انتخاب درست است.</p>',
      ),
      include: [
        L('Both queries', 'الاستعلامان كلاهما', 'هر دو کوئری'),
        L('The two row counts', 'عددا الصفوف', 'دو تعداد سطر'),
        L('What happens to the unmatched row, and when INNER JOIN is right', 'ما يحدث للصف غير المطابق، ومتى يكون INNER JOIN صحيحًا', 'چه بر سر سطر بی‌جفت می‌آید و چه زمانی INNER JOIN درست است'),
      ],
      example: [
        {
          type: 'code',
          code: `-- INNER JOIN: only sales whose title exists in books
SELECT s.title, s.copies, b.price
FROM book_sales s
INNER JOIN books b ON s.title = b.title;   -- 9 rows

-- LEFT JOIN: every sale, with NULLs where books has no match
SELECT s.title, s.copies, b.price
FROM book_sales s
LEFT JOIN books b ON s.title = b.title;    -- 10 rows`,
        },
        {
          type: 'table',
          headers: [L('title', 'title', 'title'), L('copies', 'copies', 'copies'), L('price', 'price', 'price')],
          rows: [[L('Atlas', 'Atlas', 'Atlas'), L('2', '2', '2'), L('NULL', 'NULL', 'NULL')]],
        },
        {
          type: 'html',
          html: L(
            '<p>The LEFT JOIN returns 10 rows and the INNER JOIN 9: the Atlas sale (above) has no match in books, so INNER JOIN silently drops it. INNER JOIN is the right choice when you only want rows you can fully price, for example a profit report, as long as you say the Atlas sale was left out.</p>',
            '<p>يُرجع LEFT JOIN عشرة صفوف وINNER JOIN تسعة: عملية بيع Atlas (أعلاه) لا تطابق لها في books، فيحذفها INNER JOIN بصمت. يكون INNER JOIN الاختيار الصحيح عندما تريد فقط الصفوف التي يمكنك تسعيرها بالكامل، كتقرير الربح مثلًا، شرط أن تذكر أن بيع Atlas استُبعد.</p>',
            '<p>LEFT JOIN ده سطر و INNER JOIN نه سطر برمی‌گرداند: فروش Atlas (بالا) در books جفتی ندارد، پس INNER JOIN بی‌صدا حذفش می‌کند. INNER JOIN وقتی درست است که فقط سطرهایی را بخواهی که بتوانی کامل قیمت‌گذاری کنی، مثلاً یک گزارش سود، به شرطی که بگویی فروش Atlas کنار گذاشته شد.</p>',
          ),
        },
      ],
    },
    {
      title: L('The metrics', 'المقاييس', 'شاخص‌ها'),
      prompt: L(
        '<p>Paste your Section 8 query and its result. Which flavor earns the most total profit, and which has the best margin?</p>',
        '<p>الصق استعلامك من القسم 8 ونتيجته. أي نكهة تحقق أكبر ربح إجمالي، وأيها لديها أفضل هامش؟</p>',
        '<p>کوئری بخش ۸ و نتیجه‌اش را بچسبان. کدام طعم بیشترین سود کل را دارد و کدام بهترین حاشیهٔ سود را؟</p>',
      ),
      include: [
        L('Your query and the result table', 'استعلامك وجدول النتيجة', 'کوئری تو و جدول نتیجه'),
        L('The top flavor by profit and the top flavor by margin (they can differ)', 'النكهة الأولى حسب الربح والأولى حسب الهامش (قد تختلفان)', 'طعم برتر از نظر سود و طعم برتر از نظر حاشیه (ممکن است متفاوت باشند)'),
      ],
      example: [
        {
          type: 'code',
          code: `SELECT
  b.title,
  SUM(s.copies)                      AS copies,
  SUM(s.copies * b.price)            AS revenue,
  SUM(s.copies * (b.price - b.cost)) AS profit,
  ROUND(100.0 * SUM(s.copies * (b.price - b.cost))
              / SUM(s.copies * b.price), 1) AS margin_pct
FROM book_sales s
INNER JOIN books b ON s.title = b.title
GROUP BY b.title
ORDER BY profit DESC;`,
        },
        {
          type: 'table',
          headers: [
            L('title', 'title', 'title'),
            L('copies', 'copies', 'copies'),
            L('revenue', 'revenue', 'revenue'),
            L('profit', 'profit', 'profit'),
            L('margin_pct', 'margin_pct', 'margin_pct'),
          ],
          rows: [
            [L('Dune', 'Dune', 'Dune'), L('20', '20', '20'), L('240', '240', '240'), L('100', '100', '100'), L('41.7', '41.7', '41.7')],
            [L('Emma', 'Emma', 'Emma'), L('15', '15', '15'), L('150', '150', '150'), L('90', '90', '90'), L('60.0', '60.0', '60.0')],
            [L('Ulysses', 'Ulysses', 'Ulysses'), L('8', '8', '8'), L('120', '120', '120'), L('32', '32', '32'), L('26.7', '26.7', '26.7')],
          ],
        },
        {
          type: 'html',
          html: L(
            '<p>Dune earns the most profit ($100) because it sells the most copies, but Emma has the best margin (60%): each Emma sale keeps more of its price.</p>',
            '<p>يحقق Dune أكبر ربح (100 دولار) لأنه يبيع أكبر عدد من النسخ، لكن لدى Emma أفضل هامش (60%): كل بيع لـ Emma يحتفظ بجزء أكبر من سعره.</p>',
            '<p>Dune بیشترین سود (۱۰۰ دلار) را دارد چون بیشترین نسخه را می‌فروشد، اما Emma بهترین حاشیه را دارد (۶۰٪): هر فروش Emma سهم بیشتری از قیمتش را نگه می‌دارد.</p>',
          ),
        },
      ],
    },
    {
      title: L('Working with AI', 'العمل مع الذكاء الاصطناعي', 'کار با هوش مصنوعی'),
      prompt: L(
        '<p>Describe one moment where you would need to explain, check or stand behind a JOIN an AI assistant wrote for you.</p>',
        '<p>صِف لحظة واحدة ستحتاج فيها إلى شرح JOIN كتبه لك مساعد ذكاء اصطناعي أو التحقق منه أو تحمّل مسؤوليته.</p>',
        '<p>یک لحظه را توصیف کن که باید یک JOIN نوشته‌شده توسط دستیار هوش مصنوعی را توضیح دهی، بررسی کنی یا پایش بایستی.</p>',
      ),
      include: [
        L('The situation', 'الموقف', 'موقعیت'),
        L('What you would check, and how', 'ما الذي ستتحقق منه، وكيف', 'چه چیزی را بررسی می‌کنی و چگونه'),
      ],
      example: [
        {
          type: 'html',
          html: L(
            '<p>The AI wrote an INNER JOIN for the "total copies sold" report. I would compare its total with <code>SELECT SUM(copies) FROM book_sales</code>: the difference (2 copies) is the Atlas sale it dropped, so for that report I would switch to a LEFT JOIN.</p>',
            '<p>كتب الذكاء الاصطناعي INNER JOIN لتقرير "إجمالي النسخ المباعة". سأقارن إجماليه بـ <code>SELECT SUM(copies) FROM book_sales</code>: الفرق (نسختان) هو بيع Atlas الذي حذفه، لذا سأستخدم LEFT JOIN لهذا التقرير.</p>',
            '<p>هوش مصنوعی برای گزارش «کل نسخه‌های فروخته‌شده» یک INNER JOIN نوشت. مجموع آن را با <code>SELECT SUM(copies) FROM book_sales</code> مقایسه می‌کنم: اختلاف (۲ نسخه) همان فروش Atlas است که حذف شده، پس برای این گزارش به LEFT JOIN تغییرش می‌دهم.</p>',
          ),
        },
      ],
    },
    {
      title: L('The decision', 'القرار', 'تصمیم'),
      prompt: L(
        '<p>What should the stand do next month? Give one clear recommendation and justify it with your numbers.</p>',
        '<p>ماذا يجب أن يفعل الكشك الشهر القادم؟ قدّم توصية واضحة واحدة وبرّرها بأرقامك.</p>',
        '<p>غرفه ماه آینده چه کاری باید بکند؟ یک توصیهٔ روشن بده و با اعدادت توجیهش کن.</p>',
      ),
      include: [
        L('A clear recommendation in the first sentence', 'توصية واضحة في الجملة الأولى', 'یک توصیهٔ روشن در جملهٔ اول'),
        L('At least two numbers from your results', 'رقمان على الأقل من نتائجك', 'دست‌کم دو عدد از نتایجت'),
      ],
      example: [
        {
          type: 'html',
          html: L(
            "<p>Reorder Dune first and give Emma the front table. Dune brings the most profit ($100 from 20 copies), while Emma keeps 60% of every sale, so selling a few more Emma copies is the cheapest way to raise profit. Before ordering Atlas, add it to books so its sales stop disappearing from the profit report.</p>",
            '<p>أعد طلب Dune أولًا وضع Emma على الطاولة الأمامية. يحقق Dune أكبر ربح (100 دولار من 20 نسخة)، بينما يحتفظ Emma بـ 60% من كل بيع، لذا فبيع نسخ إضافية من Emma أرخص طريقة لزيادة الربح. قبل طلب Atlas، أضفه إلى books حتى لا تختفي مبيعاته من تقرير الربح.</p>',
            '<p>اول Dune را دوباره سفارش بده و Emma را روی میز جلویی بگذار. Dune بیشترین سود را دارد (۱۰۰ دلار از ۲۰ نسخه)، در حالی که Emma ۶۰٪ هر فروش را نگه می‌دارد، پس فروش چند نسخهٔ بیشتر از Emma ارزان‌ترین راه افزایش سود است. پیش از سفارش Atlas، آن را به books اضافه کن تا فروشش از گزارش سود ناپدید نشود.</p>',
          ),
        },
      ],
    },
    feedbackTask,
  ],
}
