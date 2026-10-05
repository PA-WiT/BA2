import type { Block } from '../../types'
import { L, feedbackTask } from './shared'

// Example answers use a different business (a café chain's coupon sales, made-up numbers) so they show
// the expected format and depth without giving away the clearance_sales answers.
export const week01Homework: Block = {
  type: 'homework',
  scenario: L(
    'The example answers below are for a different business: a café chain with a coupon_sales(branch, coupon_pct, revenue) table of 30 sales across three branches. The numbers are invented. Copy the format and depth, not the content; your answers use clearance_sales.',
    'أمثلة الإجابات أدناه لنشاط تجاري مختلف: سلسلة مقاهٍ لديها جدول coupon_sales(branch, coupon_pct, revenue) يضم 30 عملية بيع في ثلاثة فروع. الأرقام مُختلَقة. انسخ الشكل والعمق لا المحتوى؛ إجاباتك تستخدم clearance_sales.',
    'نمونه‌پاسخ‌های زیر برای یک کسب‌وکار دیگر است: یک زنجیرهٔ کافه با جدول coupon_sales(branch, coupon_pct, revenue) شامل ۳۰ فروش در سه شعبه. اعداد ساختگی‌اند. قالب و عمق را الگو بگیر، نه محتوا را؛ پاسخ‌های تو از clearance_sales استفاده می‌کنند.',
  ),
  tasks: [
    {
      title: L('Set the scene', 'مهّد للموقف', 'صحنه را بچین'),
      prompt: L(
        '<p>In 2–3 sentences, describe the dataset and the question the regional director wants answered.</p>',
        '<p>في 2–3 جمل، صِف البيانات والسؤال الذي يريد المدير الإقليمي إجابته.</p>',
        '<p>در ۲ تا ۳ جمله، داده‌ها و سؤالی را که مدیر منطقه می‌خواهد پاسخش را بداند توضیح بده.</p>',
      ),
      include: [
        L('What one row represents and how many rows there are', 'ماذا يمثّل الصف الواحد وكم عدد الصفوف', 'هر سطر نمایانگر چیست و چند سطر داریم'),
        L('The business decision behind the question', 'القرار التجاري وراء السؤال', 'تصمیم کسب‌وکاری پشت سؤال'),
      ],
      example: [
        {
          type: 'html',
          html: L(
            '<p>The café chain recorded 30 coupon sales across three branches (Downtown, Harbor, Campus); each row is one sale with the branch, the coupon discount and the revenue. The operations manager wants to know whether Downtown\'s 20% coupons earn more per sale than the other branches, and whether that is consistent enough to copy everywhere.</p>',
            '<p>سجّلت سلسلة المقاهي 30 عملية بيع بقسائم في ثلاثة فروع (Downtown وHarbor وCampus)؛ كل صف عملية بيع واحدة مع الفرع ونسبة خصم القسيمة والإيراد. يريد مدير العمليات أن يعرف هل تحقق قسائم Downtown بنسبة 20% إيرادًا أعلى لكل عملية بيع من الفروع الأخرى، وهل هذا ثابت بما يكفي لتعميمه.</p>',
            '<p>زنجیرهٔ کافه ۳۰ فروش با کوپن را در سه شعبه (Downtown، Harbor، Campus) ثبت کرده است؛ هر سطر یک فروش با شعبه، درصد تخفیف کوپن و درآمد است. مدیر عملیات می‌خواهد بداند آیا کوپن‌های ۲۰٪ شعبهٔ Downtown درآمد بیشتری به‌ازای هر فروش نسبت به شعبه‌های دیگر می‌آورند و آیا این آن‌قدر پایدار است که در همه‌جا تکرار شود.</p>',
          ),
        },
      ],
    },
    {
      title: L('Why SQL, not Excel', 'لماذا SQL وليس Excel', 'چرا SQL و نه Excel'),
      prompt: L(
        '<p>Explain in 2–3 sentences why this analysis belongs in SQL rather than in a spreadsheet.</p>',
        '<p>اشرح في 2–3 جمل لماذا يناسب هذا التحليلُ SQL أكثر من جدول بيانات.</p>',
        '<p>در ۲ تا ۳ جمله توضیح بده چرا این تحلیل جایش در SQL است و نه در صفحه‌گسترده.</p>',
      ),
      include: [
        L('At least one concrete reason (size, repeatability, shared source of truth…)', 'سبب واحد ملموس على الأقل (الحجم، التكرار، مصدر واحد مشترك للبيانات…)', 'دست‌کم یک دلیل مشخص (حجم، تکرارپذیری، منبع مشترک داده…)'),
      ],
      example: [
        {
          type: 'html',
          html: L(
            '<p>The real coupon log has over 200,000 rows and lives in the chain\'s database, so exporting it to Excel every week would be slow and quickly out of date. A saved SQL query runs on the live data, gives everyone the same numbers, and can be re-run next month in seconds.</p>',
            '<p>سجل القسائم الحقيقي يضم أكثر من 200,000 صف ويُحفظ في قاعدة بيانات السلسلة، لذا فإن تصديره إلى Excel كل أسبوع بطيء ويصبح قديمًا بسرعة. استعلام SQL محفوظ يعمل على البيانات الحية، ويعطي الجميع الأرقام نفسها، ويمكن إعادة تشغيله الشهر القادم في ثوانٍ.</p>',
            '<p>لاگ واقعی کوپن‌ها بیش از ۲۰۰٬۰۰۰ سطر دارد و در پایگاه دادهٔ زنجیره است، پس خروجی گرفتن هفتگی به Excel کند است و زود کهنه می‌شود. یک کوئری SQL ذخیره‌شده روی دادهٔ زنده اجرا می‌شود، به همه همان اعداد را می‌دهد و ماه بعد در چند ثانیه دوباره اجرا می‌شود.</p>',
          ),
        },
      ],
    },
    {
      title: L('The center and the spread', 'المركز والتشتت', 'مرکز و پراکندگی'),
      prompt: L(
        '<p>Report AVG, COUNT and SUM of revenue, then the standard deviation, and explain in plain words what the standard deviation tells the director.</p>',
        '<p>اذكر AVG وCOUNT وSUM للإيراد، ثم الانحراف المعياري، واشرح بكلمات بسيطة ما الذي يخبر به الانحرافُ المعياري المدير.</p>',
        '<p>AVG، COUNT و SUM درآمد و سپس انحراف معیار را گزارش کن و با زبان ساده بگو انحراف معیار چه چیزی به مدیر می‌گوید.</p>',
      ),
      include: [
        L('The four numbers, rounded to 2 decimals', 'الأرقام الأربعة مقرّبة إلى منزلتين عشريتين', 'چهار عدد، گرد شده تا ۲ رقم اعشار'),
        L('Which standard deviation you used (STDDEV_SAMP or STDDEV_POP) and why', 'أي انحراف معياري استخدمت (STDDEV_SAMP أو STDDEV_POP) ولماذا', 'از کدام انحراف معیار استفاده کردی (STDDEV_SAMP یا STDDEV_POP) و چرا'),
        L('One sentence interpreting the spread', 'جملة واحدة تفسّر التشتت', 'یک جمله در تفسیر پراکندگی'),
      ],
      example: [
        {
          type: 'table',
          headers: [L('COUNT', 'COUNT', 'COUNT'), L('SUM', 'SUM', 'SUM'), L('AVG', 'AVG', 'AVG'), L('STDDEV_SAMP', 'STDDEV_SAMP', 'STDDEV_SAMP')],
          rows: [[L('30', '30', '30'), L('1275.00', '1275.00', '1275.00'), L('42.50', '42.50', '42.50'), L('11.80', '11.80', '11.80')]],
        },
        {
          type: 'html',
          html: L(
            '<p>An average coupon sale brings in $42.50. I used STDDEV_SAMP because these 30 rows are a sample of all coupon sales. A standard deviation of $11.80 means a typical sale lands roughly $12 above or below the average, so most sales fall between about $31 and $54.</p>',
            '<p>متوسط عملية البيع بالقسيمة 42.50 دولارًا. استخدمت STDDEV_SAMP لأن هذه الصفوف الثلاثين عيّنة من كل مبيعات القسائم. انحراف معياري قدره 11.80 دولارًا يعني أن عملية البيع النموذجية تبتعد نحو 12 دولارًا فوق المتوسط أو تحته، فتقع معظم المبيعات بين نحو 31 و54 دولارًا.</p>',
            '<p>میانگین یک فروش با کوپن ۴۲٫۵۰ دلار است. از STDDEV_SAMP استفاده کردم چون این ۳۰ سطر نمونه‌ای از همهٔ فروش‌های کوپنی است. انحراف معیار ۱۱٫۸۰ دلار یعنی یک فروش معمولی حدود ۱۲ دلار بالاتر یا پایین‌تر از میانگین است، پس بیشتر فروش‌ها بین حدود ۳۱ تا ۵۴ دلارند.</p>',
          ),
        },
      ],
    },
    {
      title: L('The shape of the data', 'شكل البيانات', 'شکل داده'),
      prompt: L(
        '<p>Group revenue into buckets and count the sales in each, then report the median and say what it adds compared with the average.</p>',
        '<p>قسّم الإيراد إلى فئات وعُدّ المبيعات في كل فئة، ثم اذكر الوسيط وقل ما الذي يضيفه مقارنة بالمتوسط.</p>',
        '<p>درآمد را در بازه‌ها گروه‌بندی کن و فروش هر بازه را بشمار، سپس میانه را گزارش کن و بگو در مقایسه با میانگین چه چیزی اضافه می‌کند.</p>',
      ),
      include: [
        L('The bucket counts (a small table is fine)', 'أعداد الفئات (يكفي جدول صغير)', 'شمارش بازه‌ها (یک جدول کوچک کافی است)'),
        L('The median and one sentence comparing it with the average', 'الوسيط وجملة تقارنه بالمتوسط', 'میانه و یک جمله در مقایسه با میانگین'),
      ],
      example: [
        {
          type: 'table',
          headers: [L('revenue_bucket', 'revenue_bucket', 'revenue_bucket'), L('num_sales', 'num_sales', 'num_sales')],
          rows: [
            [L('0-29', '0-29', '0-29'), L('4', '4', '4')],
            [L('30-44', '30-44', '30-44'), L('15', '15', '15')],
            [L('45-59', '45-59', '45-59'), L('8', '8', '8')],
            [L('60+', '60+', '60+'), L('3', '3', '3')],
          ],
        },
        {
          type: 'html',
          html: L(
            '<p>Half of all sales sit in the $30–44 bucket. The median is $41.00, a little below the $42.50 average: three large orders above $60 pull the average up, so the median is the better picture of a "normal" sale.</p>',
            '<p>نصف المبيعات تقع في فئة 30–44 دولارًا. الوسيط 41.00 دولارًا، أقل قليلًا من المتوسط 42.50: ثلاث طلبات كبيرة فوق 60 دولارًا ترفع المتوسط، لذا فالوسيط صورة أفضل لعملية البيع "العادية".</p>',
            '<p>نیمی از فروش‌ها در بازهٔ ۳۰ تا ۴۴ دلار هستند. میانه ۴۱٫۰۰ دلار است، کمی کمتر از میانگین ۴۲٫۵۰: سه سفارش بزرگ بالای ۶۰ دلار میانگین را بالا می‌کشند، پس میانه تصویر بهتری از یک فروش «معمولی» است.</p>',
          ),
        },
      ],
    },
    {
      title: L('Comparing regions', 'مقارنة المناطق', 'مقایسهٔ مناطق'),
      prompt: L(
        '<p>Which region has the highest average revenue per sale, and which is the most volatile? Paste the SQL query you ran and its result.</p>',
        '<p>أي منطقة لديها أعلى متوسط إيراد لكل عملية بيع، وأيها الأكثر تقلبًا؟ الصق استعلام SQL الذي شغّلته ونتيجته.</p>',
        '<p>کدام منطقه بالاترین میانگین درآمد به‌ازای هر فروش را دارد و کدام پرنوسان‌ترین است؟ کوئری SQL که اجرا کردی و نتیجه‌اش را بچسبان.</p>',
      ),
      include: [
        L('Your full query (GROUP BY region)', 'استعلامك كاملًا (GROUP BY region)', 'کوئری کامل تو (GROUP BY region)'),
        L('The result table', 'جدول النتيجة', 'جدول نتیجه'),
        L('One sentence naming the highest-average and the most volatile region', 'جملة تسمّي المنطقة الأعلى متوسطًا والأكثر تقلبًا', 'یک جمله که منطقهٔ با بالاترین میانگین و پرنوسان‌ترین را نام ببرد'),
      ],
      example: [
        {
          type: 'code',
          code: `SELECT
  branch,
  COUNT(*)                       AS num_sales,
  ROUND(AVG(revenue), 2)         AS avg_revenue,
  ROUND(STDDEV_SAMP(revenue), 2) AS stddev_revenue,
  PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY revenue)
                                 AS median_revenue
FROM coupon_sales
GROUP BY branch
ORDER BY avg_revenue DESC;`,
        },
        {
          type: 'table',
          headers: [
            L('branch', 'branch', 'branch'),
            L('num_sales', 'num_sales', 'num_sales'),
            L('avg_revenue', 'avg_revenue', 'avg_revenue'),
            L('stddev_revenue', 'stddev_revenue', 'stddev_revenue'),
            L('median_revenue', 'median_revenue', 'median_revenue'),
          ],
          rows: [
            [L('Downtown', 'Downtown', 'Downtown'), L('12', '12', '12'), L('48.20', '48.20', '48.20'), L('14.10', '14.10', '14.10'), L('46.00', '46.00', '46.00')],
            [L('Harbor', 'Harbor', 'Harbor'), L('10', '10', '10'), L('39.58', '39.58', '39.58'), L('6.30', '6.30', '6.30'), L('39.00', '39.00', '39.00')],
            [L('Campus', 'Campus', 'Campus'), L('8', '8', '8'), L('37.60', '37.60', '37.60'), L('9.20', '9.20', '9.20'), L('36.50', '36.50', '36.50')],
          ],
        },
        {
          type: 'html',
          html: L(
            '<p>Downtown has the highest average ($48.20) but also the largest spread ($14.10), so it is both the best and the least predictable branch. Harbor is the steadiest ($6.30).</p>',
            '<p>لدى Downtown أعلى متوسط (48.20 دولارًا) لكن أيضًا أكبر تشتت (14.10 دولارًا)، فهو أفضل فرع وأقلها قابلية للتنبؤ في الوقت نفسه. Harbor هو الأكثر ثباتًا (6.30 دولارًا).</p>',
            '<p>Downtown بالاترین میانگین (۴۸٫۲۰ دلار) و در عین حال بیشترین پراکندگی (۱۴٫۱۰ دلار) را دارد، پس هم بهترین و هم کم‌پیش‌بینی‌ترین شعبه است. Harbor باثبات‌ترین است (۶٫۳۰ دلار).</p>',
          ),
        },
      ],
    },
    {
      title: L('Working with AI', 'العمل مع الذكاء الاصطناعي', 'کار با هوش مصنوعی'),
      prompt: L(
        '<p>Describe one moment where you would need to explain, check or stand behind a SQL query an AI wrote for you.</p>',
        '<p>صِف لحظة واحدة ستحتاج فيها إلى شرح استعلام SQL كتبه لك الذكاء الاصطناعي أو التحقق منه أو تحمّل مسؤوليته.</p>',
        '<p>یک لحظه را توصیف کن که باید یک کوئری SQL نوشته‌شده توسط هوش مصنوعی را توضیح دهی، بررسی کنی یا پایش بایستی.</p>',
      ),
      include: [
        L('The situation', 'الموقف', 'موقعیت'),
        L('What exactly you would check, and how', 'ما الذي ستتحقق منه بالضبط، وكيف', 'دقیقاً چه چیزی را بررسی می‌کنی و چگونه'),
      ],
      example: [
        {
          type: 'html',
          html: L(
            '<p>The AI\'s query used STDDEV_POP. Before showing the manager, I would have to say why I switched it to STDDEV_SAMP (our rows are a sample), and I would check its COUNT against a plain <code>SELECT COUNT(*)</code> to make sure no branch was filtered out.</p>',
            '<p>استخدم استعلامُ الذكاء الاصطناعي STDDEV_POP. قبل عرضه على المدير، عليّ أن أوضح لماذا غيّرته إلى STDDEV_SAMP (صفوفنا عيّنة)، وسأقارن COUNT فيه باستعلام بسيط <code>SELECT COUNT(*)</code> للتأكد من عدم استبعاد أي فرع.</p>',
            '<p>کوئری هوش مصنوعی از STDDEV_POP استفاده کرده بود. پیش از نشان دادن به مدیر باید بگویم چرا آن را به STDDEV_SAMP تغییر دادم (سطرهای ما نمونه‌اند) و COUNT آن را با یک <code>SELECT COUNT(*)</code> ساده مقایسه می‌کنم تا مطمئن شوم هیچ شعبه‌ای حذف نشده است.</p>',
          ),
        },
      ],
    },
    {
      title: L('The decision', 'القرار', 'تصمیم'),
      prompt: L(
        '<p>Should the chain roll out the best-performing region\'s discount strategy everywhere next season? Answer yes, no or "not yet" and justify it with your numbers.</p>',
        '<p>هل يجب على السلسلة تعميم استراتيجية الخصم للمنطقة الأفضل أداءً في كل مكان الموسم القادم؟ أجب بنعم أو لا أو "ليس بعد" وبرّر إجابتك بأرقامك.</p>',
        '<p>آیا زنجیره باید فصل بعد استراتیژی تخفیف بهترین منطقه را همه‌جا اجرا کند؟ با بله، نه یا «هنوز نه» پاسخ بده و با اعدادت توجیهش کن.</p>',
      ),
      include: [
        L('A clear recommendation in the first sentence', 'توصية واضحة في الجملة الأولى', 'یک توصیهٔ روشن در جملهٔ اول'),
        L('At least two numbers from your results', 'رقمان على الأقل من نتائجك', 'دست‌کم دو عدد از نتایجت'),
        L('One risk or next step', 'خطر واحد أو خطوة تالية', 'یک ریسک یا گام بعدی'),
      ],
      example: [
        {
          type: 'html',
          html: L(
            '<p>Not yet. Downtown\'s 20% coupons earn $48.20 per sale against $39.58 at Harbor, but Downtown\'s spread ($14.10) is more than twice Harbor\'s, and it is based on only 12 sales. I recommend testing 20% coupons at Harbor for one month and comparing again before rolling them out to every branch.</p>',
            '<p>ليس بعد. تحقق قسائم Downtown بنسبة 20% إيرادًا قدره 48.20 دولارًا لكل عملية بيع مقابل 39.58 في Harbor، لكن تشتت Downtown (14.10 دولارًا) أكبر من ضعف تشتت Harbor، ويستند إلى 12 عملية بيع فقط. أوصي بتجربة قسائم 20% في Harbor لمدة شهر والمقارنة مجددًا قبل تعميمها على كل الفروع.</p>',
            '<p>هنوز نه. کوپن‌های ۲۰٪ Downtown به‌ازای هر فروش ۴۸٫۲۰ دلار درآمد دارند در برابر ۳۹٫۵۸ دلار در Harbor، اما پراکندگی Downtown (۱۴٫۱۰ دلار) بیش از دو برابر Harbor است و فقط بر ۱۲ فروش تکیه دارد. پیشنهاد می‌کنم کوپن ۲۰٪ یک ماه در Harbor آزمایش شود و پیش از اجرا در همهٔ شعبه‌ها دوباره مقایسه کنیم.</p>',
          ),
        },
      ],
    },
    feedbackTask,
  ],
}
