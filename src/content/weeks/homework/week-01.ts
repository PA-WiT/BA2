import type { Block } from '../../types'
import { L, driveNotice, feedbackTask } from './shared'

// Example answers are worked on the North region only (7 of the 28 clearance_sales rows); students do the
// same analysis on the full table and all four regions. Numbers match the week's own worked examples.
export const week01Homework: Block = {
  type: 'homework',
  notice: driveNotice,
  objectives: [
    L(
      'Summarized a whole table with AVG, COUNT, SUM and the standard deviation, and explained what each number means',
      'لخّصت جدولًا كاملًا باستخدام AVG وCOUNT وSUM والانحراف المعياري، وشرحت معنى كل رقم',
      'یک جدول کامل را با AVG، COUNT، SUM و انحراف معیار خلاصه کرده‌ای و معنای هر عدد را توضیح داده‌ای',
    ),
    L(
      'Described the shape of the data with buckets and the median',
      'وصفت شكل البيانات بالفئات والوسيط',
      'شکل داده را با بازه‌ها و میانه توصیف کرده‌ای',
    ),
    L(
      'Compared regions with GROUP BY and checked an AI-written query',
      'قارنت بين المناطق باستخدام GROUP BY وتحققت من استعلام كتبه الذكاء الاصطناعي',
      'مناطق را با GROUP BY مقایسه کرده‌ای و یک کوئری نوشته‌شده توسط هوش مصنوعی را بررسی کرده‌ای',
    ),
    L(
      'Turned the numbers into a clear recommendation for the regional director',
      'حوّلت الأرقام إلى توصية واضحة للمدير الإقليمي',
      'اعداد را به یک توصیهٔ روشن برای مدیر منطقه تبدیل کرده‌ای',
    ),
  ],
  scenario: L(
    'The example answers use only the North region (7 rows). Your answers use the whole clearance_sales table (28 rows, all four regions), so your numbers will be different.',
    'أمثلة الإجابات تستخدم منطقة North فقط (7 صفوف). إجاباتك تستخدم جدول clearance_sales كاملًا (28 صفًا، المناطق الأربع كلها)، لذا ستختلف أرقامك.',
    'نمونه‌پاسخ‌ها فقط از منطقهٔ North (۷ سطر) استفاده می‌کنند. پاسخ‌های تو از کل جدول clearance_sales (۲۸ سطر، هر چهار منطقه) استفاده می‌کنند، پس اعدادت متفاوت خواهند بود.',
  ),
  tasks: [
    {
      title: L('The center and the spread', 'المركز والتشتت', 'مرکز و پراکندگی'),
      prompt: L(
        '<p>For the whole table, find the COUNT, SUM and AVG of revenue and its standard deviation (STDDEV_SAMP). Then explain in one or two sentences what the standard deviation tells the director.</p>',
        '<p>للجدول كله، احسب COUNT وSUM وAVG للإيراد وانحرافه المعياري (STDDEV_SAMP). ثم اشرح في جملة أو جملتين ما الذي يخبر به الانحرافُ المعياري المدير.</p>',
        '<p>برای کل جدول، COUNT، SUM و AVG درآمد و انحراف معیار آن (STDDEV_SAMP) را پیدا کن. سپس در یک یا دو جمله توضیح بده انحراف معیار چه چیزی به مدیر می‌گوید.</p>',
      ),
      analogy: L(
        '<p>The average is a <em>typical day</em> on your commute; the standard deviation is <em>how bumpy the road is</em>. Two roads can take 30 minutes on average, but on the bumpy one you never know whether today will take 15 minutes or 45.</p>',
        '<p>المتوسط هو <em>يوم عادي</em> في طريقك إلى العمل؛ والانحراف المعياري هو <em>مدى وعورة الطريق</em>. قد يستغرق طريقان 30 دقيقة في المتوسط، لكن في الطريق الوعر لا تعرف أبدًا هل سيستغرق اليوم 15 دقيقة أم 45.</p>',
        '<p>میانگین یک <em>روز معمولی</em> در مسیر رفت‌وآمد توست؛ انحراف معیار <em>میزان ناهمواری جاده</em> است. دو جاده ممکن است به‌طور میانگین ۳۰ دقیقه طول بکشند، اما در جادهٔ ناهموار هیچ‌وقت نمی‌دانی امروز ۱۵ دقیقه طول می‌کشد یا ۴۵.</p>',
      ),
      include: [
        L('Your query and the four numbers, rounded to 2 decimals', 'استعلامك والأرقام الأربعة مقرّبة إلى منزلتين عشريتين', 'کوئری تو و چهار عدد، گرد شده تا ۲ رقم اعشار'),
        L('Why STDDEV_SAMP and not STDDEV_POP', 'لماذا STDDEV_SAMP وليس STDDEV_POP', 'چرا STDDEV_SAMP و نه STDDEV_POP'),
        L('One plain-language sentence about the spread', 'جملة بلغة بسيطة عن التشتت', 'یک جمله به زبان ساده دربارهٔ پراکندگی'),
      ],
      example: [
        {
          type: 'code',
          code: `SELECT
  COUNT(*)                       AS num_sales,
  SUM(revenue)                   AS total_revenue,
  ROUND(AVG(revenue), 2)         AS avg_revenue,
  ROUND(STDDEV_SAMP(revenue), 2) AS stddev_revenue
FROM clearance_sales
WHERE region = 'North';   -- your version: no WHERE, the whole table`,
        },
        {
          type: 'table',
          headers: [L('num_sales', 'num_sales', 'num_sales'), L('total_revenue', 'total_revenue', 'total_revenue'), L('avg_revenue', 'avg_revenue', 'avg_revenue'), L('stddev_revenue', 'stddev_revenue', 'stddev_revenue')],
          rows: [[L('7', '7', '7'), L('21916.00', '21916.00', '21916.00'), L('3130.86', '3130.86', '3130.86'), L('1136.18', '1136.18', '1136.18')]],
        },
        {
          type: 'html',
          html: L(
            '<p>A typical North clearance sale brings in about $3,131. I used STDDEV_SAMP because these rows are a sample of the store\'s sales history, not every sale ever. A spread of about $1,136 is large next to the average: one North sale can easily bring in $2,000 and the next $4,200, so the average alone hides a lot.</p>',
            '<p>تحقق عملية التصفية النموذجية في North نحو 3,131 دولارًا. استخدمت STDDEV_SAMP لأن هذه الصفوف عيّنة من تاريخ مبيعات المتجر، لا كل المبيعات. تشتت قدره نحو 1,136 دولارًا كبير مقارنة بالمتوسط: قد تحقق عملية بيع في North ‏2,000 دولار والتالية 4,200، فالمتوسط وحده يخفي الكثير.</p>',
            '<p>یک فروش حراجی معمولی در North حدود ۳٬۱۳۱ دلار درآمد دارد. از STDDEV_SAMP استفاده کردم چون این سطرها نمونه‌ای از تاریخچهٔ فروش فروشگاه‌اند، نه همهٔ فروش‌ها. پراکندگی حدود ۱٬۱۳۶ دلار در کنار میانگین بزرگ است: یک فروش در North ممکن است ۲٬۰۰۰ دلار و بعدی ۴٬۲۰۰ دلار باشد، پس میانگین به‌تنهایی چیزهای زیادی را پنهان می‌کند.</p>',
          ),
        },
      ],
    },
    {
      title: L('The shape of the data', 'شكل البيانات', 'شکل داده'),
      prompt: L(
        '<p>For the whole table, count how many sales fall in each revenue bucket (0–999, 1000–1999, …) and find the median revenue. Say what the median adds that the average doesn\'t.</p>',
        '<p>للجدول كله، عُدّ عمليات البيع في كل فئة إيراد (0–999، 1000–1999، …) واحسب وسيط الإيراد. قل ما الذي يضيفه الوسيط ولا يقدّمه المتوسط.</p>',
        '<p>برای کل جدول بشمار چند فروش در هر بازهٔ درآمد (۰–۹۹۹، ۱۰۰۰–۱۹۹۹، …) قرار می‌گیرد و میانهٔ درآمد را پیدا کن. بگو میانه چه چیزی اضافه می‌کند که میانگین نمی‌دهد.</p>',
      ),
      analogy: L(
        '<p>Line everyone up by height: the <em>median</em> is the person standing exactly in the middle. If a basketball player joins the line, the average height jumps, but the middle person barely changes.</p>',
        '<p>رتّب الجميع في صف حسب الطول: <em>الوسيط</em> هو الشخص الواقف في المنتصف تمامًا. إذا انضم لاعب كرة سلة إلى الصف، يقفز متوسط الطول، لكن الشخص في المنتصف بالكاد يتغير.</p>',
        '<p>همه را به ترتیب قد در یک صف بچین: <em>میانه</em> کسی است که دقیقاً وسط ایستاده. اگر یک بسکتبالیست به صف اضافه شود، میانگین قد بالا می‌پرد، اما فرد وسط تقریباً تغییری نمی‌کند.</p>',
      ),
      include: [
        L('A table of bucket counts', 'جدول بأعداد الفئات', 'جدول شمارش بازه‌ها'),
        L('The median, and one sentence comparing it with the average', 'الوسيط، وجملة تقارنه بالمتوسط', 'میانه و یک جمله در مقایسه با میانگین'),
      ],
      example: [
        {
          type: 'table',
          headers: [L('revenue_bucket (North)', 'revenue_bucket (North)', 'revenue_bucket (North)'), L('num_sales', 'num_sales', 'num_sales')],
          rows: [
            [L('1000-1999', '1000-1999', '1000-1999'), L('1', '1', '1')],
            [L('2000-2999', '2000-2999', '2000-2999'), L('2', '2', '2')],
            [L('3000-3999', '3000-3999', '3000-3999'), L('2', '2', '2')],
            [L('4000-4999', '4000-4999', '4000-4999'), L('2', '2', '2')],
          ],
        },
        {
          type: 'html',
          html: L(
            '<p>North\'s sales are spread fairly evenly from $1,000 to $5,000, with no single dominant bucket. Its median is $3,360, a bit above the $3,130.86 average: one weak sale ($1,200 at a 40% discount) pulls the average down, so the median better describes a normal North sale.</p>',
            '<p>مبيعات North موزعة بالتساوي تقريبًا بين 1,000 و5,000 دولار، دون فئة مهيمنة. وسيطها 3,360 دولارًا، أعلى قليلًا من المتوسط 3,130.86: عملية بيع ضعيفة واحدة (1,200 دولار بخصم 40%) تسحب المتوسط إلى الأسفل، لذا يصف الوسيطُ عملية البيع العادية في North بشكل أفضل.</p>',
            '<p>فروش‌های North تقریباً یکنواخت بین ۱٬۰۰۰ تا ۵٬۰۰۰ دلار پخش شده‌اند و هیچ بازه‌ای غالب نیست. میانهٔ آن ۳٬۳۶۰ دلار است، کمی بالاتر از میانگین ۳٬۱۳۰٫۸۶: یک فروش ضعیف (۱٬۲۰۰ دلار با تخفیف ۴۰٪) میانگین را پایین می‌کشد، پس میانه فروش معمولی North را بهتر توصیف می‌کند.</p>',
          ),
        },
      ],
    },
    {
      title: L('Compare the regions, and check the AI', 'قارن المناطق، وتحقق من الذكاء الاصطناعي', 'مناطق را مقایسه کن و هوش مصنوعی را بررسی کن'),
      prompt: L(
        '<p>Run one GROUP BY query that gives each region\'s number of sales, average revenue, standard deviation and median. Name the region with the highest average and the most volatile one. Then ask an AI assistant to write the same query and say what you checked before trusting it.</p>',
        '<p>شغّل استعلام GROUP BY واحدًا يعطي لكل منطقة عدد المبيعات ومتوسط الإيراد والانحراف المعياري والوسيط. سمِّ المنطقة صاحبة أعلى متوسط والأكثر تقلبًا. ثم اطلب من مساعد ذكاء اصطناعي كتابة الاستعلام نفسه، وقل ما الذي تحققت منه قبل أن تثق به.</p>',
        '<p>یک کوئری GROUP BY اجرا کن که برای هر منطقه تعداد فروش، میانگین درآمد، انحراف معیار و میانه را بدهد. منطقهٔ با بالاترین میانگین و پرنوسان‌ترین را نام ببر. سپس از یک دستیار هوش مصنوعی بخواه همان کوئری را بنویسد و بگو پیش از اعتماد به آن چه چیزی را بررسی کردی.</p>',
      ),
      analogy: L(
        '<p>Comparing regions is like comparing school classes: you look at each class\'s <em>average grade</em>, but also at <em>how spread out</em> the grades are. A class with an 80 average where everyone scored 78–82 is very different from one where half scored 100 and half 60.</p>',
        '<p>مقارنة المناطق تشبه مقارنة الفصول الدراسية: تنظر إلى <em>متوسط درجات</em> كل فصل، وأيضًا إلى <em>مدى تفاوت</em> الدرجات. فصل متوسطه 80 وكل طلابه بين 78 و82 يختلف كثيرًا عن فصل نصفه حصل على 100 ونصفه على 60.</p>',
        '<p>مقایسهٔ مناطق مثل مقایسهٔ کلاس‌های مدرسه است: به <em>میانگین نمرهٔ</em> هر کلاس نگاه می‌کنی، اما به <em>میزان پراکندگی</em> نمره‌ها هم. کلاسی با میانگین ۸۰ که همه بین ۷۸ تا ۸۲ گرفته‌اند با کلاسی که نیمی ۱۰۰ و نیمی ۶۰ گرفته‌اند بسیار فرق دارد.</p>',
      ),
      include: [
        L('Your query and the result table for all four regions', 'استعلامك وجدول النتيجة للمناطق الأربع', 'کوئری تو و جدول نتیجه برای هر چهار منطقه'),
        L('The highest-average region and the most volatile region', 'المنطقة الأعلى متوسطًا والأكثر تقلبًا', 'منطقهٔ با بالاترین میانگین و پرنوسان‌ترین منطقه'),
        L('One thing you checked in the AI\'s query, and how', 'شيء واحد تحققت منه في استعلام الذكاء الاصطناعي، وكيف', 'یک چیز که در کوئری هوش مصنوعی بررسی کردی و چگونه'),
      ],
      example: [
        {
          type: 'code',
          code: `SELECT
  region,
  COUNT(*)                       AS num_sales,
  ROUND(AVG(revenue), 2)         AS avg_revenue,
  ROUND(STDDEV_SAMP(revenue), 2) AS stddev_revenue,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY revenue)
                                 AS median_revenue
FROM clearance_sales
WHERE region IN ('North', 'South')   -- your version: no WHERE, all regions
GROUP BY region
ORDER BY avg_revenue DESC;`,
        },
        {
          type: 'table',
          headers: [L('region', 'region', 'region'), L('num_sales', 'num_sales', 'num_sales'), L('avg_revenue', 'avg_revenue', 'avg_revenue'), L('stddev_revenue', 'stddev_revenue', 'stddev_revenue'), L('median_revenue', 'median_revenue', 'median_revenue')],
          rows: [
            [L('North', 'North', 'North'), L('7', '7', '7'), L('3130.86', '3130.86', '3130.86'), L('1136.18', '1136.18', '1136.18'), L('3360', '3360', '3360')],
            [L('South', 'South', 'South'), L('7', '7', '7'), L('2497.14', '2497.14', '2497.14'), L('923.22', '923.22', '923.22'), L('2800', '2800', '2800')],
          ],
        },
        {
          type: 'html',
          html: L(
            '<p>Between these two, North has the higher average ($3,130.86) and is also more volatile ($1,136.18 vs. $923.22). <strong>AI check:</strong> the assistant\'s version used STDDEV_POP, which divides by n instead of n−1 and makes the spread look smaller. I switched it to STDDEV_SAMP and compared its num_sales with a plain <code>SELECT COUNT(*)</code> to make sure no rows were filtered out.</p>',
            '<p>بين هاتين المنطقتين، لدى North المتوسط الأعلى (3,130.86 دولارًا) وهي أيضًا الأكثر تقلبًا (1,136.18 مقابل 923.22). <strong>التحقق من الذكاء الاصطناعي:</strong> استخدمت نسخة المساعد STDDEV_POP التي تقسم على n بدلًا من n−1 فتجعل التشتت يبدو أصغر. غيّرتها إلى STDDEV_SAMP وقارنت num_sales فيها باستعلام بسيط <code>SELECT COUNT(*)</code> للتأكد من عدم استبعاد أي صفوف.</p>',
            '<p>بین این دو، North میانگین بالاتری دارد (۳٬۱۳۰٫۸۶ دلار) و پرنوسان‌تر هم هست (۱٬۱۳۶٫۱۸ در برابر ۹۲۳٫۲۲). <strong>بررسی هوش مصنوعی:</strong> نسخهٔ دستیار از STDDEV_POP استفاده کرده بود که به‌جای n−1 بر n تقسیم می‌کند و پراکندگی را کوچک‌تر نشان می‌دهد. آن را به STDDEV_SAMP تغییر دادم و num_sales آن را با یک <code>SELECT COUNT(*)</code> ساده مقایسه کردم تا مطمئن شوم هیچ سطری حذف نشده است.</p>',
          ),
        },
      ],
    },
    {
      title: L('The decision', 'القرار', 'تصمیم'),
      prompt: L(
        '<p>Should the chain roll out the best-performing region\'s discount strategy everywhere next season? Answer yes, no or "not yet" in the first sentence, then justify it with at least two numbers from your results and one next step.</p>',
        '<p>هل يجب أن تعمّم السلسلة استراتيجية الخصم للمنطقة الأفضل أداءً في كل مكان الموسم القادم؟ أجب بنعم أو لا أو "ليس بعد" في الجملة الأولى، ثم برّر إجابتك برقمين على الأقل من نتائجك وخطوة تالية واحدة.</p>',
        '<p>آیا زنجیره باید فصل بعد استراتژی تخفیف بهترین منطقه را همه‌جا اجرا کند؟ در جملهٔ اول با بله، نه یا «هنوز نه» پاسخ بده، سپس با دست‌کم دو عدد از نتایجت و یک گام بعدی توجیهش کن.</p>',
      ),
      analogy: L(
        '<p>Write it like a doctor\'s note: the <em>diagnosis</em> first (your answer), then the <em>evidence</em> (the numbers), then the <em>prescription</em> (what to do next).</p>',
        '<p>اكتبها كوصفة طبيب: <em>التشخيص</em> أولًا (إجابتك)، ثم <em>الأدلة</em> (الأرقام)، ثم <em>العلاج</em> (ما يجب فعله بعد ذلك).</p>',
        '<p>آن را مثل یادداشت پزشک بنویس: اول <em>تشخیص</em> (پاسخ تو)، بعد <em>شواهد</em> (اعداد)، و بعد <em>نسخه</em> (کار بعدی).</p>',
      ),
      include: [
        L('A clear answer in the first sentence', 'إجابة واضحة في الجملة الأولى', 'یک پاسخ روشن در جملهٔ اول'),
        L('At least two numbers from your results', 'رقمان على الأقل من نتائجك', 'دست‌کم دو عدد از نتایجت'),
        L('One risk or next step', 'خطر واحد أو خطوة تالية', 'یک ریسک یا گام بعدی'),
      ],
      example: [
        {
          type: 'html',
          html: L(
            '<p><em>(The example answers a smaller question: which discount should the North region use?)</em> North should settle on 20%. That level brought in the most revenue ($4,352), while deeper discounts earned less and less: at 40% revenue fell to $1,200. Because each discount level appears only once in North, I would test 20% for one more season before calling it final.</p>',
            '<p><em>(يجيب المثال عن سؤال أصغر: أي خصم يجب أن تعتمده منطقة North؟)</em> يجب أن تعتمد North خصم 20%. هذا المستوى حقق أعلى إيراد (4,352 دولارًا)، بينما انخفض إيراد الخصومات الأعمق بسرعة: عند 40% انخفض الإيراد إلى 1,200 دولار. ولأن كل مستوى خصم يظهر مرة واحدة فقط في North، سأجرب 20% موسمًا آخر قبل اعتماده نهائيًا.</p>',
            '<p><em>(این نمونه به یک سؤال کوچک‌تر پاسخ می‌دهد: منطقهٔ North از چه تخفیفی استفاده کند؟)</em> North باید روی ۲۰٪ بماند. این سطح بیشترین درآمد را آورد (۴٬۳۵۲ دلار)، در حالی که درآمد تخفیف‌های عمیق‌تر به‌سرعت افت کرد: در ۴۰٪ درآمد به ۱٬۲۰۰ دلار رسید. چون هر سطح تخفیف در North فقط یک بار آمده، پیش از نهایی کردن، ۲۰٪ را یک فصل دیگر آزمایش می‌کنم.</p>',
          ),
        },
      ],
    },
  ],
  feedback: feedbackTask,
}
