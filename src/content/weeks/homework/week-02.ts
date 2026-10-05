import type { Block } from '../../types'
import { L, deadlineNotice, feedbackTask } from './shared'

// Example answers are worked on a slice of the jam stand data (one market day, or Peach only); students do
// the full tables. Numbers match the week's own results (Peach profit $120, 13 sale rows, Lemon unpriced).
export const week02Homework: Block = {
  type: 'homework',
  notice: deadlineNotice,
  objectives: [
    L(
      'Explained why the stand keeps prices in jam_products instead of copying them into every sale',
      'شرحت لماذا يحتفظ الكشك بالأسعار في jam_products بدلًا من نسخها في كل عملية بيع',
      'توضیح داده‌ای چرا غرفه قیمت‌ها را در jam_products نگه می‌دارد و آن‌ها را در هر فروش کپی نمی‌کند',
    ),
    L(
      'Used INNER JOIN and LEFT JOIN and explained what each keeps and drops',
      'استخدمت INNER JOIN وLEFT JOIN وشرحت ما يحتفظ به كل منهما وما يحذفه',
      'از INNER JOIN و LEFT JOIN استفاده کرده‌ای و توضیح داده‌ای هر کدام چه چیزی را نگه می‌دارد و چه چیزی را حذف می‌کند',
    ),
    L(
      'Calculated revenue, profit and margin per flavor in SQL',
      'حسبت الإيراد والربح والهامش لكل نكهة باستخدام SQL',
      'درآمد، سود و حاشیهٔ سود هر طعم را با SQL محاسبه کرده‌ای',
    ),
    L(
      'Checked an AI-written query and turned the numbers into a recommendation for the stand owner',
      'تحققت من استعلام كتبه الذكاء الاصطناعي وحوّلت الأرقام إلى توصية لصاحب الكشك',
      'یک کوئری نوشته‌شده توسط هوش مصنوعی را بررسی کرده‌ای و اعداد را به توصیه‌ای برای صاحب غرفه تبدیل کرده‌ای',
    ),
  ],
  scenario: L(
    'The example answers use a smaller slice of the same jam stand data: one market day (25 May) or Peach only. Your answers use the full jam_sales and jam_products tables, so your numbers will be different.',
    'أمثلة الإجابات تستخدم جزءًا أصغر من بيانات كشك المربى نفسها: يوم سوق واحد (25 مايو) أو نكهة الخوخ فقط. إجاباتك تستخدم جدولي jam_sales وjam_products كاملين، لذا ستختلف أرقامك.',
    'نمونه‌پاسخ‌ها از بخش کوچک‌تری از همان داده‌های غرفهٔ مربا استفاده می‌کنند: یک روز بازار (۲۵ مه) یا فقط هلو. پاسخ‌های تو از کل جدول‌های jam_sales و jam_products استفاده می‌کنند، پس اعدادت متفاوت خواهند بود.',
  ),
  tasks: [
    {
      title: L('Two tables and two joins', 'جدولان وربطان', 'دو جدول و دو join'),
      prompt: L(
        '<p>In two sentences, explain why prices live in jam_products and not in every row of jam_sales. Then run an INNER JOIN and a LEFT JOIN on the full tables, compare the row counts, and say what happens to the Lemon sale.</p>',
        '<p>في جملتين، اشرح لماذا توجد الأسعار في jam_products وليس في كل صف من jam_sales. ثم شغّل INNER JOIN وLEFT JOIN على الجدولين كاملين، وقارن عدد الصفوف، وقل ما الذي يحدث لعملية بيع Lemon.</p>',
        '<p>در دو جمله توضیح بده چرا قیمت‌ها در jam_products هستند و نه در هر سطر jam_sales. سپس یک INNER JOIN و یک LEFT JOIN روی جدول‌های کامل اجرا کن، تعداد سطرها را مقایسه کن و بگو چه بر سر فروش Lemon می‌آید.</p>',
      ),
      analogy: L(
        '<p>jam_sales is the <em>guest list</em> and jam_products is the <em>seating chart</em>. An INNER JOIN only lists guests who have a seat; a LEFT JOIN lists every guest and leaves the seat blank for anyone who wasn\'t given one. Lemon is the guest who came but has no seat yet.</p>',
        '<p>jam_sales هو <em>قائمة الضيوف</em> وjam_products هو <em>مخطط الجلوس</em>. يعرض INNER JOIN الضيوف الذين لهم مقعد فقط؛ ويعرض LEFT JOIN كل الضيوف ويترك المقعد فارغًا لمن لم يُخصَّص له مقعد. Lemon هو الضيف الذي حضر لكن لا مقعد له بعد.</p>',
        '<p>jam_sales <em>فهرست مهمان‌ها</em> است و jam_products <em>نقشهٔ صندلی‌ها</em>. INNER JOIN فقط مهمان‌هایی را نشان می‌دهد که صندلی دارند؛ LEFT JOIN همهٔ مهمان‌ها را نشان می‌دهد و جای صندلی کسی را که صندلی نگرفته خالی می‌گذارد. Lemon مهمانی است که آمده اما هنوز صندلی ندارد.</p>',
      ),
      include: [
        L('Two sentences on why there are two tables', 'جملتان عن سبب وجود جدولين', 'دو جمله دربارهٔ اینکه چرا دو جدول داریم'),
        L('Both queries and their row counts', 'الاستعلامان وعدد صفوف كل منهما', 'هر دو کوئری و تعداد سطرهایشان'),
        L('What happens to Lemon, and when INNER JOIN is still the right choice', 'ما يحدث لـ Lemon، ومتى يظل INNER JOIN هو الاختيار الصحيح', 'چه بر سر Lemon می‌آید و چه زمانی INNER JOIN هنوز انتخاب درست است'),
      ],
      example: [
        {
          type: 'html',
          html: L(
            '<p><strong>Why two tables:</strong> if Strawberry\'s price changed, a copied price would have to be fixed in every Strawberry row, and missing one would make two rows disagree. Keeping it once in jam_products means one edit fixes every report.</p><p><strong>Joins, on 25 May only:</strong></p>',
            '<p><strong>لماذا جدولان:</strong> لو تغيّر سعر Strawberry، لوجب تصحيح السعر المنسوخ في كل صف Strawberry، ونسيان صف واحد يجعل صفين يتعارضان. حفظه مرة واحدة في jam_products يعني أن تعديلًا واحدًا يصحح كل التقارير.</p><p><strong>الربط، في 25 مايو فقط:</strong></p>',
            '<p><strong>چرا دو جدول:</strong> اگر قیمت Strawberry تغییر کند، قیمت کپی‌شده باید در همهٔ سطرهای Strawberry اصلاح شود و جا انداختن یکی باعث می‌شود دو سطر ناهمخوان شوند. نگه داشتن آن فقط یک بار در jam_products یعنی یک ویرایش همهٔ گزارش‌ها را درست می‌کند.</p><p><strong>joinها، فقط برای ۲۵ مه:</strong></p>',
          ),
        },
        {
          type: 'code',
          code: `SELECT s.flavor, s.units_sold, p.selling_price
FROM jam_sales s
INNER JOIN jam_products p ON s.flavor = p.flavor
WHERE s.market_date = '2024-05-25';   -- 3 rows

SELECT s.flavor, s.units_sold, p.selling_price
FROM jam_sales s
LEFT JOIN jam_products p ON s.flavor = p.flavor
WHERE s.market_date = '2024-05-25';   -- 4 rows
-- your version: no WHERE, the full table`,
        },
        {
          type: 'table',
          headers: [L('flavor', 'flavor', 'flavor'), L('units_sold', 'units_sold', 'units_sold'), L('selling_price', 'selling_price', 'selling_price')],
          rows: [[L('Lemon', 'Lemon', 'Lemon'), L('9', '9', '9'), L('NULL', 'NULL', 'NULL')]],
        },
        {
          type: 'html',
          html: L(
            '<p>On 25 May the LEFT JOIN returns 4 rows and the INNER JOIN 3: the Lemon sale (above) has no price yet, so INNER JOIN drops it without warning. INNER JOIN is still right for a profit report, where you can only use priced rows, as long as you say Lemon was left out.</p>',
            '<p>في 25 مايو يُرجع LEFT JOIN أربعة صفوف وINNER JOIN ثلاثة: عملية بيع Lemon (أعلاه) لا سعر لها بعد، فيحذفها INNER JOIN دون تحذير. يظل INNER JOIN صحيحًا لتقرير الربح، حيث لا يمكنك استخدام إلا الصفوف المسعّرة، شرط أن تذكر أن Lemon استُبعد.</p>',
            '<p>در ۲۵ مه، LEFT JOIN چهار سطر و INNER JOIN سه سطر برمی‌گرداند: فروش Lemon (بالا) هنوز قیمت ندارد، پس INNER JOIN بدون هشدار حذفش می‌کند. INNER JOIN برای گزارش سود همچنان درست است، چون فقط از سطرهای قیمت‌دار می‌توان استفاده کرد، به شرطی که بگویی Lemon کنار گذاشته شد.</p>',
          ),
        },
      ],
    },
    {
      title: L('Revenue, profit and margin', 'الإيراد والربح والهامش', 'درآمد، سود و حاشیهٔ سود'),
      prompt: L(
        '<p>Write one query that gives, for every flavor, the units sold, revenue, profit and margin %. Name the flavor with the most total profit and the one with the best margin.</p>',
        '<p>اكتب استعلامًا واحدًا يعطي لكل نكهة الوحدات المباعة والإيراد والربح ونسبة الهامش. سمِّ النكهة صاحبة أكبر ربح إجمالي وتلك صاحبة أفضل هامش.</p>',
        '<p>یک کوئری بنویس که برای هر طعم واحدهای فروخته‌شده، درآمد، سود و درصد حاشیه را بدهد. طعم با بیشترین سود کل و طعم با بهترین حاشیه را نام ببر.</p>',
      ),
      analogy: L(
        '<p><em>Revenue</em> is everything that went into the till; <em>profit</em> is what\'s left after you pay for the jars and fruit; <em>margin</em> is how many cents of every dollar you keep. A flavor can fill the till and still keep fewer cents per dollar.</p>',
        '<p><em>الإيراد</em> هو كل ما دخل الصندوق؛ و<em>الربح</em> هو ما يتبقى بعد دفع ثمن البرطمانات والفاكهة؛ و<em>الهامش</em> هو عدد السنتات التي تحتفظ بها من كل دولار. قد تملأ نكهة الصندوق وتحتفظ مع ذلك بسنتات أقل من كل دولار.</p>',
        '<p><em>درآمد</em> هر چیزی است که وارد صندوق شده؛ <em>سود</em> چیزی است که پس از پرداخت هزینهٔ شیشه و میوه باقی می‌ماند؛ <em>حاشیه</em> یعنی از هر دلار چند سنت برایت می‌ماند. یک طعم می‌تواند صندوق را پر کند و باز هم از هر دلار سنت کمتری برایت بگذارد.</p>',
      ),
      include: [
        L('Your query and the result table for all priced flavors', 'استعلامك وجدول النتيجة لكل النكهات المسعّرة', 'کوئری تو و جدول نتیجه برای همهٔ طعم‌های قیمت‌دار'),
        L('The top flavor by profit and the top flavor by margin (they can differ)', 'النكهة الأولى حسب الربح والأولى حسب الهامش (قد تختلفان)', 'طعم برتر از نظر سود و طعم برتر از نظر حاشیه (ممکن است متفاوت باشند)'),
      ],
      example: [
        {
          type: 'code',
          code: `SELECT
  p.flavor,
  SUM(s.units_sold)                                    AS units,
  SUM(s.units_sold * p.selling_price)                  AS revenue,
  SUM(s.units_sold * (p.selling_price - p.cost_price)) AS profit,
  ROUND(100.0 * SUM(s.units_sold * (p.selling_price - p.cost_price))
              / SUM(s.units_sold * p.selling_price), 1) AS margin_pct
FROM jam_sales s
INNER JOIN jam_products p ON s.flavor = p.flavor
WHERE p.flavor = 'Peach'   -- your version: no WHERE, every flavor
GROUP BY p.flavor;`,
        },
        {
          type: 'table',
          headers: [L('flavor', 'flavor', 'flavor'), L('units', 'units', 'units'), L('revenue', 'revenue', 'revenue'), L('profit', 'profit', 'profit'), L('margin_pct', 'margin_pct', 'margin_pct')],
          rows: [[L('Peach', 'Peach', 'Peach'), L('40', '40', '40'), L('160.00', '160.00', '160.00'), L('120.00', '120.00', '120.00'), L('75.0', '75.0', '75.0')]],
        },
        {
          type: 'html',
          html: L(
            '<p>Peach sold 40 jars for $160 and kept $120 of it as profit, a 75% margin: of every dollar a Peach customer pays, the stand keeps 75 cents. In your answer, compare all the flavors to find the top one on each measure.</p>',
            '<p>باع الخوخ 40 برطمانًا بـ 160 دولارًا واحتفظ بـ 120 دولارًا منها ربحًا، أي هامش 75%: من كل دولار يدفعه زبون الخوخ يحتفظ الكشك بـ 75 سنتًا. في إجابتك، قارن كل النكهات لتجد النكهة الأولى في كل مقياس.</p>',
            '<p>هلو ۴۰ شیشه به ۱۶۰ دلار فروخت و ۱۲۰ دلار آن سود ماند، یعنی حاشیهٔ ۷۵٪: از هر دلاری که مشتری هلو می‌پردازد، ۷۵ سنت برای غرفه می‌ماند. در پاسخت همهٔ طعم‌ها را مقایسه کن تا طعم برتر در هر معیار را پیدا کنی.</p>',
          ),
        },
      ],
    },
    {
      title: L('Check the AI, then decide', 'تحقق من الذكاء الاصطناعي، ثم قرّر', 'هوش مصنوعی را بررسی کن، سپس تصمیم بگیر'),
      prompt: L(
        '<p>Ask an AI assistant for a query that gives the stand\'s total jars sold, check its answer against the raw table, and fix it if needed. Then, in 3–4 sentences, tell the owner what to do next month, using your profit and margin numbers.</p>',
        '<p>اطلب من مساعد ذكاء اصطناعي استعلامًا يعطي إجمالي البرطمانات المباعة في الكشك، وتحقق من إجابته مقارنة بالجدول الخام، وصحّحها إذا لزم. ثم، في 3–4 جمل، أخبر صاحب الكشك بما يفعله الشهر القادم مستخدمًا أرقام الربح والهامش لديك.</p>',
        '<p>از یک دستیار هوش مصنوعی کوئری‌ای بخواه که کل شیشه‌های فروخته‌شدهٔ غرفه را بدهد، پاسخش را با جدول خام مقایسه کن و در صورت نیاز اصلاحش کن. سپس در ۳ تا ۴ جمله به صاحب غرفه بگو ماه آینده چه کند و از اعداد سود و حاشیه‌ات استفاده کن.</p>',
      ),
      analogy: L(
        '<p>Treat the AI like a classmate\'s homework you\'re about to sign your name on: you don\'t redo all of it, but you check the one number that would embarrass you if it were wrong. Then write the recommendation like a short note you\'d pin on the stand: what to do, and the two numbers that prove it.</p>',
        '<p>تعامل مع الذكاء الاصطناعي كواجب زميل ستوقّع عليه باسمك: لا تعيده كله، لكنك تتحقق من الرقم الوحيد الذي سيحرجك إن كان خاطئًا. ثم اكتب التوصية كملاحظة قصيرة تعلّقها على الكشك: ماذا تفعل، والرقمان اللذان يثبتان ذلك.</p>',
        '<p>با هوش مصنوعی مثل تکلیف هم‌کلاسی‌ای رفتار کن که می‌خواهی پایش امضا بزنی: همه‌اش را دوباره انجام نمی‌دهی، اما آن یک عددی را چک می‌کنی که اگر غلط باشد آبرویت را می‌برد. بعد توصیه را مثل یادداشت کوتاهی بنویس که روی غرفه می‌چسبانی: چه کاری بکن و دو عددی که ثابتش می‌کنند.</p>',
      ),
      include: [
        L('Your prompt, the AI\'s query and what you checked', 'طلبك، واستعلام الذكاء الاصطناعي، وما تحققت منه', 'درخواستت، کوئری هوش مصنوعی و آنچه بررسی کردی'),
        L('A clear recommendation in the first sentence', 'توصية واضحة في الجملة الأولى', 'یک توصیهٔ روشن در جملهٔ اول'),
        L('At least two numbers from Question 2', 'رقمان على الأقل من السؤال 2', 'دست‌کم دو عدد از سؤال ۲'),
      ],
      example: [
        {
          type: 'html',
          html: L(
            '<p><strong>AI check:</strong> the assistant\'s query joined jam_sales to jam_products with an INNER JOIN and returned 200 jars. A plain <code>SELECT SUM(units_sold) FROM jam_sales</code> gives 209: the 9 Lemon jars were silently dropped, so I switched to a LEFT JOIN (or no join at all, since counting jars doesn\'t need prices).</p><p><em>(The recommendation example answers a smaller question: should Peach stay on the table?)</em> Keep Peach. It sold only 40 jars, but it keeps 75 cents of every dollar, so each extra Peach jar is cheap profit. Try placing it next to the best-selling flavor for a month and compare.</p>',
            '<p><strong>التحقق من الذكاء الاصطناعي:</strong> ربط استعلام المساعد jam_sales بـ jam_products باستخدام INNER JOIN وأرجع 200 برطمان. استعلام بسيط <code>SELECT SUM(units_sold) FROM jam_sales</code> يعطي 209: حُذفت برطمانات Lemon التسعة بصمت، فاستخدمت LEFT JOIN (أو بلا ربط أصلًا، لأن عدّ البرطمانات لا يحتاج أسعارًا).</p><p><em>(يجيب مثال التوصية عن سؤال أصغر: هل يبقى الخوخ على الطاولة؟)</em> أبقِ على الخوخ. باع 40 برطمانًا فقط، لكنه يحتفظ بـ 75 سنتًا من كل دولار، فكل برطمان خوخ إضافي ربح رخيص. جرّب وضعه بجانب النكهة الأكثر مبيعًا لمدة شهر وقارن.</p>',
            '<p><strong>بررسی هوش مصنوعی:</strong> کوئری دستیار jam_sales را با INNER JOIN به jam_products وصل کرد و ۲۰۰ شیشه برگرداند. یک <code>SELECT SUM(units_sold) FROM jam_sales</code> ساده ۲۰۹ می‌دهد: ۹ شیشهٔ Lemon بی‌صدا حذف شده بودند، پس به LEFT JOIN تغییرش دادم (یا اصلاً بدون join، چون شمردن شیشه‌ها به قیمت نیاز ندارد).</p><p><em>(نمونهٔ توصیه به یک سؤال کوچک‌تر پاسخ می‌دهد: آیا هلو روی میز بماند؟)</em> هلو را نگه دار. فقط ۴۰ شیشه فروخت، اما از هر دلار ۷۵ سنت نگه می‌دارد، پس هر شیشهٔ اضافهٔ هلو سودی ارزان است. یک ماه آن را کنار پرفروش‌ترین طعم بگذار و مقایسه کن.</p>',
          ),
        },
      ],
    },
  ],
  feedback: feedbackTask,
}
