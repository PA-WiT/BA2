import type { Block } from '../../types'
import { L, feedbackTask, projectNotice } from './shared'

// Week 6 homework = final project step "fit one regression from your case and interpret it" (roadmap on the
// Final Project page). Examples use the lesson's monthly log for January–June only (6 rows), so they show the
// format without repeating the lesson's full-year model or touching any case study.
export const week06Homework: Block = {
  type: 'homework',
  notice: projectNotice,
  objectives: [
    L('Fitted a simple linear regression on your case study\'s data and written its equation', 'طبّقت انحدارًا خطيًا بسيطًا على بيانات دراسة حالتك وكتبت معادلته', 'یک رگرسیون خطی ساده روی دادهٔ مطالعهٔ موردی‌ات برازش کرده‌ای و معادله‌اش را نوشته‌ای'),
    L('Explained R², the slope and the intercept in plain business words', 'شرحت R² والميل والمقطع بكلمات عمل بسيطة', 'R²، شیب و عرض از مبدأ را با زبان سادهٔ کسب‌وکار توضیح داده‌ای'),
    L('Checked the assumptions with a residual plot and tested whether one more variable helps', 'تحققت من الافتراضات بمخطط البواقي واختبرت إن كان متغير إضافي يساعد', 'فرض‌ها را با نمودار باقی‌مانده بررسی کرده‌ای و آزموده‌ای که آیا یک متغیر دیگر کمک می‌کند'),
    L('Written the Analysis and Key findings paragraphs for your README', 'كتبت فقرتي Analysis وKey findings في ملف README', 'پاراگراف‌های Analysis و Key findings را برای README نوشته‌ای'),
  ],
  scenario: L(
    'The example answers use the lesson\'s monthly log for January to June only (6 months). Your answers use your pair\'s case study and the regression idea on its card (or a better one you can justify).',
    'أمثلة الإجابات تستخدم السجل الشهري من الدرس من يناير إلى يونيو فقط (6 أشهر). إجاباتكما تستخدم دراسة حالتكما وفكرة الانحدار في بطاقتها (أو فكرة أفضل يمكنكما تبريرها).',
    'نمونه‌پاسخ‌ها فقط از لاگ ماهانهٔ درس از ژانویه تا ژوئن (۶ ماه) استفاده می‌کنند. پاسخ‌های شما از مطالعهٔ موردی گروهتان و ایدهٔ رگرسیون روی کارتش (یا ایدهٔ بهتری که بتوانید توجیهش کنید) استفاده می‌کنند.',
  ),
  tasks: [
    {
      title: L('Fit your regression and read it', 'طبّق انحدارك واقرأه', 'رگرسیونت را برازش کن و بخوانش'),
      prompt: L(
        '<p>Using your <strong>clean</strong> dataset, run a simple linear regression with the Y and X from your case card (Excel Data Analysis → Regression, or Python / Power BI). Write the equation, then explain R², the slope and the intercept in one sentence each, make one prediction, and say whether the slope is significant (|t| above about 2, p below 0.05).</p>',
        '<p>باستخدام بياناتكما <strong>النظيفة</strong>، شغّلا انحدارًا خطيًا بسيطًا بالمتغيرين Y وX من بطاقة حالتكما (Excel ‏Data Analysis → Regression، أو Python / Power BI). اكتبا المعادلة، ثم اشرحا R² والميل والمقطع بجملة لكل منها، وقدّما تنبؤًا واحدًا، وقولا هل الميل دالّ إحصائيًا (|t| أكبر من 2 تقريبًا، وp أقل من 0.05).</p>',
        '<p>با دادهٔ <strong>تمیز</strong> خودتان یک رگرسیون خطی ساده با Y و X کارت موردتان اجرا کنید (Excel ‏Data Analysis → Regression، یا Python / Power BI). معادله را بنویسید، سپس R²، شیب و عرض از مبدأ را هر کدام در یک جمله توضیح دهید، یک پیش‌بینی انجام دهید و بگویید شیب معنادار است یا نه (|t| بیشتر از حدود ۲، p کمتر از ۰٫۰۵).</p>',
      ),
      analogy: L(
        '<p>The regression line is a <em>recipe</em>: start with the intercept, add the slope once for every unit of X. R² is how often the recipe gets the dish right; a 0.95 recipe is reliable, a 0.30 recipe is a rough guess.</p>',
        '<p>خط الانحدار <em>وصفة</em>: ابدأ بالمقطع، وأضف الميل مرة عن كل وحدة من X. وR² هو عدد المرات التي تنجح فيها الوصفة؛ وصفة 0.95 موثوقة، ووصفة 0.30 تخمين تقريبي.</p>',
        '<p>خط رگرسیون یک <em>دستور پخت</em> است: با عرض از مبدأ شروع کن و به ازای هر واحد X یک بار شیب را اضافه کن. R² یعنی این دستور چند بار غذا را درست درمی‌آورد؛ دستور ۰٫۹۵ قابل اعتماد است و دستور ۰٫۳۰ یک حدس تقریبی.</p>',
      ),
      include: [
        L('The Excel (or Python / Power BI) output, with Y and X named', 'مخرجات Excel ‏(أو Python / Power BI) مع تسمية Y وX', 'خروجی Excel (یا Python / Power BI) با نام Y و X'),
        L('The equation with your column names and units', 'المعادلة بأسماء أعمدتكما ووحداتها', 'معادله با نام ستون‌ها و واحدهایتان'),
        L('One sentence each for R², slope and intercept (say if the intercept is meaningless)', 'جملة لكل من R² والميل والمقطع (اذكرا إن كان المقطع بلا معنى)', 'برای R²، شیب و عرض از مبدأ هر کدام یک جمله (اگر عرض از مبدأ بی‌معناست بگویید)'),
        L('One prediction inside the range of your data, and whether the slope is significant', 'تنبؤ واحد ضمن مدى بياناتكما، وهل الميل دالّ', 'یک پیش‌بینی در محدودهٔ داده‌تان و اینکه شیب معنادار است یا نه'),
      ],
      example: [
        {
          type: 'table',
          headers: [L('January–June', 'يناير–يونيو', 'ژانویه تا ژوئن'), L('Coefficient', 'المعامل', 'ضریب'), L('Standard error', 'الخطأ المعياري', 'خطای معیار'), L('t Stat', 't Stat', 't Stat')],
          rows: [
            [L('Intercept', 'Intercept', 'Intercept'), L('-6.86', '-6.86', '-6.86'), L('5.93', '5.93', '5.93'), L('-1.16', '-1.16', '-1.16')],
            [L('avg_temp_c', 'avg_temp_c', 'avg_temp_c'), L('4.04', '4.04', '4.04'), L('0.42', '0.42', '0.42'), L('9.65', '9.65', '9.65')],
            [L('R Square', 'R Square', 'R Square'), L('0.959', '0.959', '0.959'), L('', '', ''), L('', '', '')],
          ],
        },
        {
          type: 'html',
          html: L(
            '<p><strong>Equation:</strong> jars = −6.86 + 4.04 × avg_temp_c.</p><ul><li><strong>R²:</strong> temperature explains about 96% of the month-to-month variation in jars sold from January to June.</li><li><strong>Slope:</strong> each extra degree of average temperature goes with about 4 more jars a month.</li><li><strong>Intercept:</strong> −6.86 jars at 0 °C is not meaningful (no month was that cold, and jars can\'t be negative); it only positions the line.</li><li><strong>Prediction:</strong> a 16 °C month → −6.86 + 4.04 × 16 ≈ 58 jars.</li><li><strong>Significant?</strong> Yes: t = 9.65 is far above 2 (Excel\'s p-value is well below 0.05).</li></ul>',
            '<p><strong>المعادلة:</strong> jars = −6.86 + 4.04 × avg_temp_c.</p><ul><li><strong>R²:</strong> تفسّر الحرارة نحو 96% من التغير الشهري في البرطمانات المباعة من يناير إلى يونيو.</li><li><strong>الميل:</strong> كل درجة إضافية من متوسط الحرارة يقابلها نحو 4 برطمانات أكثر في الشهر.</li><li><strong>المقطع:</strong> ‏−6.86 برطمانًا عند 0 °م ليس له معنى (لم يكن أي شهر بهذا البرد، ولا يمكن أن تكون البرطمانات سالبة)؛ إنه يحدد موضع الخط فقط.</li><li><strong>التنبؤ:</strong> شهر بحرارة 16 °م ← ‎−6.86 + 4.04 × 16 ≈ 58 برطمانًا.</li><li><strong>دالّ؟</strong> نعم: t = 9.65 أعلى بكثير من 2 (وقيمة p في Excel أقل بكثير من 0.05).</li></ul>',
            '<p><strong>معادله:</strong> jars = −6.86 + 4.04 × avg_temp_c.</p><ul><li><strong>R²:</strong> دما حدود ۹۶٪ از تغییرات ماه‌به‌ماه شیشه‌های فروخته‌شده را از ژانویه تا ژوئن توضیح می‌دهد.</li><li><strong>شیب:</strong> هر درجهٔ اضافهٔ میانگین دما با حدود ۴ شیشهٔ بیشتر در ماه همراه است.</li><li><strong>عرض از مبدأ:</strong> ‏−۶٫۸۶ شیشه در ۰ درجه معنا ندارد (هیچ ماهی این‌قدر سرد نبوده و شیشه منفی نمی‌شود)؛ فقط جای خط را مشخص می‌کند.</li><li><strong>پیش‌بینی:</strong> ماهی با ۱۶ درجه ← ‎−6.86 + 4.04 × 16 ≈ ۵۸ شیشه.</li><li><strong>معنادار؟</strong> بله: t = ۹٫۶۵ خیلی بیشتر از ۲ است (مقدار p در Excel خیلی کمتر از ۰٫۰۵ است).</li></ul>',
          ),
        },
      ],
    },
    {
      title: L('Check it, extend it, write it up', 'تحقق منه، ووسّعه، واكتبه', 'بررسی‌اش کن، گسترشش بده، بنویسش'),
      prompt: L(
        '<p>Make a residual plot (Excel\'s Regression dialog: tick <em>Residual Plots</em>) and say whether the four assumptions look reasonable. Then add one more X that makes business sense and compare <strong>adjusted</strong> R² with the simple model. Finish with the two README paragraphs: <em>Analysis</em> (what you ran) and <em>Key findings</em> (what it means for the business).</p>',
        '<p>أنشئا مخطط البواقي (في نافذة Regression في Excel: فعّلا <em>Residual Plots</em>) وقولا هل تبدو الافتراضات الأربعة معقولة. ثم أضيفا متغير X آخر له معنى في العمل وقارنا R² <strong>المعدّل</strong> بالنموذج البسيط. واختما بفقرتي README: ‏<em>Analysis</em> (ما الذي شغّلتماه) و<em>Key findings</em> (ما معناه للعمل).</p>',
        '<p>یک نمودار باقی‌مانده بسازید (در پنجرهٔ Regression در Excel گزینهٔ <em>Residual Plots</em> را بزنید) و بگویید چهار فرض منطقی به نظر می‌رسند یا نه. سپس یک X دیگر که از نظر کسب‌وکار معنا دارد اضافه کنید و R² <strong>تعدیل‌شده</strong> را با مدل ساده مقایسه کنید. در پایان دو پاراگراف README را بنویسید: <em>Analysis</em> (چه اجرا کردید) و <em>Key findings</em> (برای کسب‌وکار چه معنایی دارد).</p>',
      ),
      analogy: L(
        '<p>Residuals are the recipe\'s mistakes, one per dish. If the mistakes are small and random, the recipe is sound. If they grow, or curve in a pattern, the recipe is missing an ingredient. Adding an ingredient (a second X) only helps if the dish actually gets better; adjusted R² is the taster who refuses to be impressed by extra ingredients that change nothing.</p>',
        '<p>البواقي هي أخطاء الوصفة، خطأ لكل طبق. إن كانت الأخطاء صغيرة وعشوائية فالوصفة سليمة. وإن كبرت أو انحنت بنمط معيّن فالوصفة ينقصها مكوّن. وإضافة مكوّن (متغير X ثانٍ) لا تفيد إلا إذا تحسّن الطبق فعلًا؛ وR² المعدّل هو المتذوّق الذي لا تبهره مكوّنات إضافية لا تغيّر شيئًا.</p>',
        '<p>باقی‌مانده‌ها اشتباه‌های دستور پخت‌اند، یکی برای هر غذا. اگر اشتباه‌ها کوچک و تصادفی‌اند، دستور سالم است. اگر بزرگ می‌شوند یا با یک الگو خم می‌شوند، دستور یک ماده کم دارد. اضافه کردن یک ماده (X دوم) فقط وقتی کمک می‌کند که غذا واقعاً بهتر شود؛ R² تعدیل‌شده چشنده‌ای است که مواد اضافه‌ای که هیچ چیز را عوض نمی‌کنند تحت تأثیرش قرار نمی‌دهند.</p>',
      ),
      include: [
        L('The residual plot and one sentence per assumption', 'مخطط البواقي وجملة لكل افتراض', 'نمودار باقی‌مانده و یک جمله برای هر فرض'),
        L('The second X, why it makes sense, and adjusted R² before and after', 'متغير X الثاني، ولماذا له معنى، وR² المعدّل قبل وبعد', 'X دوم، چرا معنا دارد و R² تعدیل‌شده قبل و بعد'),
        L('Two README paragraphs: Analysis and Key findings', 'فقرتان لملف README: ‏Analysis وKey findings', 'دو پاراگراف README: ‏Analysis و Key findings'),
      ],
      example: [
        {
          type: 'html',
          html: L(
            '<p><strong>Residuals (Jan–Jun):</strong> +6.7, +1.6, −6.6, −7.7, +0.1, +5.9. They are small next to sales of 16–92 jars and their spread doesn\'t grow with temperature, so equal variance looks fine. But they go up, down, then up again: a gentle U-shape, which hints that demand speeds up as summer arrives and a straight line slightly under-predicts both ends. Six months are too few to be sure about normality; independence is plausible because each month is a separate set of market days.</p><p><strong>Second X:</strong> market_days (4 or 5 Saturdays in the month). Adjusted R² <em>falls</em> from 0.949 to 0.932, and its t is only −0.08: once temperature is in the model, an extra Saturday tells us nothing new. Keep the simple model.</p><p><strong>Analysis (README):</strong> We ran a simple linear regression of monthly jars sold on average monthly temperature (Excel Data Analysis ToolPak, 6 months), checked residuals, and tested adding market days.</p><p><strong>Key findings (README):</strong> Warmer months sell more jam: about 4 extra jars per degree, and temperature explains 96% of the variation from January to June. The number of market Saturdays adds nothing once temperature is known, so stock planning should follow the weather forecast, not the calendar.</p>',
            '<p><strong>البواقي (يناير–يونيو):</strong> ‏+6.7، ‏+1.6، ‏−6.6، ‏−7.7، ‏+0.1، ‏+5.9. إنها صغيرة مقارنة بمبيعات من 16 إلى 92 برطمانًا، ولا يتسع انتشارها مع الحرارة، فتساوي التباين يبدو سليمًا. لكنها ترتفع ثم تنخفض ثم ترتفع: شكل U خفيف، يلمّح إلى أن الطلب يتسارع مع قدوم الصيف وأن الخط المستقيم يقلّل التنبؤ قليلًا عند الطرفين. ستة أشهر قليلة للتأكد من الطبيعية؛ والاستقلال معقول لأن كل شهر مجموعة منفصلة من أيام السوق.</p><p><strong>المتغير الثاني:</strong> market_days ‏(4 أو 5 أيام سبت في الشهر). ينخفض R² المعدّل من 0.949 إلى 0.932، وقيمة t له ‎−0.08 فقط: بعد وجود الحرارة في النموذج، لا يخبرنا يوم سبت إضافي بشيء جديد. نحتفظ بالنموذج البسيط.</p><p><strong>Analysis ‏(README):</strong> شغّلنا انحدارًا خطيًا بسيطًا للبرطمانات المباعة شهريًا على متوسط الحرارة الشهرية (Excel Data Analysis ToolPak، ‏6 أشهر)، وتحققنا من البواقي، واختبرنا إضافة أيام السوق.</p><p><strong>Key findings ‏(README):</strong> الأشهر الأدفأ تبيع مربى أكثر: نحو 4 برطمانات إضافية لكل درجة، وتفسّر الحرارة 96% من التغير من يناير إلى يونيو. عدد أيام السبت لا يضيف شيئًا بعد معرفة الحرارة، لذا يجب أن يتبع التخطيط للمخزون توقعات الطقس لا التقويم.</p>',
            '<p><strong>باقی‌مانده‌ها (ژانویه تا ژوئن):</strong> ‏+۶٫۷، ‏+۱٫۶، ‏−۶٫۶، ‏−۷٫۷، ‏+۰٫۱، ‏+۵٫۹. در کنار فروش ۱۶ تا ۹۲ شیشه کوچک‌اند و پراکندگی‌شان با دما بزرگ نمی‌شود، پس برابری واریانس درست به نظر می‌رسد. اما بالا، پایین و دوباره بالا می‌روند: یک U ملایم، که نشان می‌دهد تقاضا با رسیدن تابستان شتاب می‌گیرد و خط راست در دو سر کمی کمتر پیش‌بینی می‌کند. شش ماه برای اطمینان از نرمال بودن کم است؛ استقلال منطقی است چون هر ماه مجموعهٔ جدایی از روزهای بازار است.</p><p><strong>X دوم:</strong> market_days (۴ یا ۵ شنبه در ماه). R² تعدیل‌شده از ۰٫۹۴۹ به ۰٫۹۳۲ <em>کاهش</em> می‌یابد و t آن فقط ‎−0.08 است: وقتی دما در مدل هست، یک شنبهٔ اضافه چیز تازه‌ای نمی‌گوید. مدل ساده را نگه می‌داریم.</p><p><strong>Analysis ‏(README):</strong> یک رگرسیون خطی ساده از شیشه‌های فروخته‌شدهٔ ماهانه روی میانگین دمای ماهانه اجرا کردیم (Excel Data Analysis ToolPak، ۶ ماه)، باقی‌مانده‌ها را بررسی کردیم و افزودن روزهای بازار را آزمودیم.</p><p><strong>Key findings ‏(README):</strong> ماه‌های گرم‌تر مربای بیشتری می‌فروشند: حدود ۴ شیشهٔ اضافه به ازای هر درجه، و دما ۹۶٪ تغییرات ژانویه تا ژوئن را توضیح می‌دهد. تعداد شنبه‌های بازار پس از دانستن دما چیزی اضافه نمی‌کند، پس برنامه‌ریزی موجودی باید از پیش‌بینی هوا پیروی کند، نه تقویم.</p>',
          ),
        },
      ],
    },
  ],
  feedback: feedbackTask,
}
