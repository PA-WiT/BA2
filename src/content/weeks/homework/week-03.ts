import type { Block } from '../../types'
import { L, feedbackTask } from './shared'

// Example answers use a bike-rental shop (made-up numbers) instead of the jam stand, and describe the
// expected charts in words, since a screenshot example would be a chart of a different dataset anyway.
export const week03Homework: Block = {
  type: 'homework',
  scenario: L(
    'The example answers below are for a different business: a bike-rental shop with a monthly log of rentals for three bike types (City, Mountain, E-bike). Yearly totals: City 2,400, Mountain 1,500, E-bike 1,100 (5,000 rentals). The numbers are invented. Copy the format and depth, not the content; your charts use the jam stand\'s monthly log, and you paste real screenshots.',
    'أمثلة الإجابات أدناه لنشاط تجاري مختلف: محل لتأجير الدراجات لديه سجل شهري للتأجير لثلاثة أنواع دراجات (City وMountain وE-bike). الإجماليات السنوية: City ‏2,400 وMountain ‏1,500 وE-bike ‏1,100 (5,000 عملية تأجير). الأرقام مُختلَقة. انسخ الشكل والعمق لا المحتوى؛ رسومك تستخدم السجل الشهري لكشك المربى، وتلصق لقطات شاشة حقيقية.',
    'نمونه‌پاسخ‌های زیر برای یک کسب‌وکار دیگر است: یک مغازهٔ اجارهٔ دوچرخه با لاگ ماهانهٔ اجاره برای سه نوع دوچرخه (City، Mountain، E-bike). مجموع سالانه: City ۲٬۴۰۰، Mountain ۱٬۵۰۰، E-bike ۱٬۱۰۰ (۵٬۰۰۰ اجاره). اعداد ساختگی‌اند. قالب و عمق را الگو بگیر، نه محتوا را؛ نمودارهای تو از لاگ ماهانهٔ غرفهٔ مربا ساخته می‌شوند و تصویر واقعی صفحه را می‌چسبانی.',
  ),
  tasks: [
    {
      title: L('The question', 'السؤال', 'سؤال'),
      prompt: L(
        "<p>In 2–3 sentences, state the one decision the owner has to make and which of the five chart questions it comes down to.</p>",
        '<p>في 2–3 جمل، اذكر القرار الوحيد الذي على صاحب الكشك اتخاذه وأي من أسئلة الرسم الخمسة يرجع إليه.</p>',
        '<p>در ۲ تا ۳ جمله، تصمیم یگانه‌ای را که صاحب غرفه باید بگیرد و اینکه به کدام یک از پنج سؤال نموداری برمی‌گردد بنویس.</p>',
      ),
      include: [
        L('The decision, in one sentence', 'القرار في جملة واحدة', 'تصمیم، در یک جمله'),
        L('Which chart question(s) it maps to (comparison, trend, share…)', 'أي سؤال (أسئلة) رسم يقابله (مقارنة، اتجاه، حصة…)', 'به کدام سؤال(های) نموداری مربوط است (مقایسه، روند، سهم…)'),
      ],
      example: [
        {
          type: 'html',
          html: L(
            '<p>The owner must decide which bike type to buy 10 more of before summer. That comes down to a trend question (which type is growing?) and a comparison question (which type is rented most today?).</p>',
            '<p>على المالك أن يقرر أي نوع دراجات يشتري منه 10 إضافية قبل الصيف. يرجع ذلك إلى سؤال اتجاه (أي نوع ينمو؟) وسؤال مقارنة (أي نوع يُؤجَّر أكثر اليوم؟).</p>',
            '<p>مالک باید تصمیم بگیرد پیش از تابستان از کدام نوع دوچرخه ۱۰ عدد بیشتر بخرد. این به یک سؤال روند (کدام نوع در حال رشد است؟) و یک سؤال مقایسه (امروز کدام نوع بیشتر اجاره می‌شود؟) برمی‌گردد.</p>',
          ),
        },
      ],
    },
    {
      title: L('A trend chart', 'رسم للاتجاه', 'نمودار روند'),
      prompt: L(
        '<p>Build a line chart of monthly units by flavor in Excel and paste a screenshot.</p>',
        '<p>أنشئ في Excel رسمًا خطيًا للوحدات الشهرية لكل نكهة والصق لقطة شاشة.</p>',
        '<p>در Excel یک نمودار خطی از واحدهای ماهانه برای هر طعم بساز و تصویر صفحه را بچسبان.</p>',
      ),
      include: [
        L('A takeaway title (what the reader should notice), not just "Units by month"', 'عنوان يحمل الخلاصة (ما يجب أن يلاحظه القارئ)، لا مجرد "الوحدات حسب الشهر"', 'یک عنوان نتیجه‌محور (آنچه خواننده باید ببیند)، نه فقط «واحدها بر حسب ماه»'),
        L('Axis titles and a legend at the top', 'عناوين المحاور ومفتاح في الأعلى', 'عنوان محورها و راهنما در بالا'),
        L('A one-line caption under the screenshot', 'تعليق من سطر واحد تحت لقطة الشاشة', 'یک توضیح یک‌خطی زیر تصویر'),
      ],
      example: [
        {
          type: 'html',
          html: L(
            '<ul><li><strong>Title:</strong> "E-bike rentals quadrupled from January to August"</li><li><strong>Axes:</strong> x = Month (Jan–Dec), y = Rentals per month, starting at 0</li><li><strong>Legend:</strong> top, one line per bike type</li><li><strong>Caption:</strong> "City is still the busiest every month, but E-bike rose from 40 to 160 rentals while Mountain stayed flat."</li></ul>',
            '<ul><li><strong>العنوان:</strong> "تأجير E-bike تضاعف أربع مرات من يناير إلى أغسطس"</li><li><strong>المحاور:</strong> س = الشهر (يناير–ديسمبر)، ص = عدد التأجير في الشهر، يبدأ من 0</li><li><strong>المفتاح:</strong> في الأعلى، خط لكل نوع دراجة</li><li><strong>التعليق:</strong> "لا يزال City الأكثر تأجيرًا كل شهر، لكن E-bike ارتفع من 40 إلى 160 عملية بينما بقي Mountain ثابتًا."</li></ul>',
            '<ul><li><strong>عنوان:</strong> «اجارهٔ E-bike از ژانویه تا اوت چهار برابر شد»</li><li><strong>محورها:</strong> x = ماه (ژانویه تا دسامبر)، y = تعداد اجاره در ماه، از ۰ شروع می‌شود</li><li><strong>راهنما:</strong> بالا، یک خط برای هر نوع دوچرخه</li><li><strong>توضیح:</strong> «City هنوز هر ماه پرکارترین است، اما E-bike از ۴۰ به ۱۶۰ اجاره رسید در حالی که Mountain ثابت ماند.»</li></ul>',
          ),
        },
      ],
    },
    {
      title: L('A comparison or share chart', 'رسم للمقارنة أو الحصة', 'نمودار مقایسه یا سهم'),
      prompt: L(
        '<p>Build a sorted bar chart (or a pie with percentages) of yearly totals per flavor, and say why you picked bar or pie.</p>',
        '<p>أنشئ رسم أعمدة مرتّبًا (أو دائريًا بنسب مئوية) للإجماليات السنوية لكل نكهة، وقل لماذا اخترت الأعمدة أو الدائري.</p>',
        '<p>یک نمودار میله‌ای مرتب‌شده (یا دایره‌ای با درصدها) از مجموع سالانهٔ هر طعم بساز و بگو چرا میله‌ای یا دایره‌ای را انتخاب کردی.</p>',
      ),
      include: [
        L('Screenshot with a takeaway title and value labels', 'لقطة شاشة بعنوان الخلاصة وتسميات القيم', 'تصویر با عنوان نتیجه‌محور و برچسب مقدارها'),
        L('One or two sentences on why bar or pie', 'جملة أو جملتان عن سبب اختيار الأعمدة أو الدائري', 'یک یا دو جمله دربارهٔ چرایی میله‌ای یا دایره‌ای'),
      ],
      example: [
        {
          type: 'html',
          html: L(
            '<p><strong>Chart:</strong> horizontal bars sorted largest first, titled "City bikes make up almost half of all rentals", labelled 2,400 (48%), 1,500 (30%), 1,100 (22%).</p><p><strong>Why bar:</strong> there are only three parts of one whole, so a pie would also work, but bars make the ranking obvious at a glance and leave room for the exact numbers.</p>',
            '<p><strong>الرسم:</strong> أعمدة أفقية مرتّبة من الأكبر، بعنوان "دراجات City تشكّل نحو نصف كل عمليات التأجير"، مع التسميات 2,400 (48%) و1,500 (30%) و1,100 (22%).</p><p><strong>لماذا الأعمدة:</strong> هناك ثلاثة أجزاء فقط من كلٍّ واحد، فالدائري يصلح أيضًا، لكن الأعمدة تجعل الترتيب واضحًا من النظرة الأولى وتترك مكانًا للأرقام الدقيقة.</p>',
            '<p><strong>نمودار:</strong> میله‌های افقی مرتب از بزرگ به کوچک، با عنوان «دوچرخه‌های City تقریباً نیمی از همهٔ اجاره‌ها هستند»، با برچسب‌های ۲٬۴۰۰ (۴۸٪)، ۱٬۵۰۰ (۳۰٪) و ۱٬۱۰۰ (۲۲٪).</p><p><strong>چرا میله‌ای:</strong> فقط سه بخش از یک کل داریم، پس دایره‌ای هم کار می‌کند، اما میله‌ها رتبه‌بندی را در یک نگاه روشن می‌کنند و جا برای اعداد دقیق می‌گذارند.</p>',
          ),
        },
      ],
    },
    {
      title: L('A deliberately bad chart, and its fix', 'رسم سيئ عن عمد، وتصحيحه', 'یک نمودار عمداً بد و اصلاحش'),
      prompt: L(
        '<p>Make a truncated-axis or 3-D version of one of your charts, screenshot it, then rebuild it honestly. Name the trick and what it exaggerates.</p>',
        '<p>أنشئ نسخة بمحور مقطوع أو ثلاثية الأبعاد من أحد رسومك، والتقط لها صورة، ثم أعد بناءها بأمانة. سمِّ الحيلة وما الذي تبالغ فيه.</p>',
        '<p>یک نسخه با محور بریده یا سه‌بعدی از یکی از نمودارهایت بساز، از آن تصویر بگیر، سپس آن را صادقانه دوباره بساز. ترفند و آنچه بزرگ‌نمایی می‌کند را نام ببر.</p>',
      ),
      include: [
        L('Two screenshots: the misleading one and the honest one', 'لقطتا شاشة: المضلِّلة والأمينة', 'دو تصویر: گمراه‌کننده و صادقانه'),
        L('The name of the trick', 'اسم الحيلة', 'نام ترفند'),
        L('How big the difference looks vs. how big it really is', 'كم يبدو الفرق كبيرًا مقابل حجمه الحقيقي', 'تفاوت چقدر بزرگ به نظر می‌رسد در برابر اندازهٔ واقعی‌اش'),
      ],
      example: [
        {
          type: 'html',
          html: L(
            '<p><strong>Trick:</strong> truncated axis. With the y-axis starting at 1,000 instead of 0, the City bar is 1,400 units tall and the E-bike bar only 100, so City looks 14 times bigger.</p><p><strong>Fix:</strong> start the axis at 0. Now the bars show the real ratio: 2,400 vs. 1,100, so City is about 2.2 times E-bike, not 14.</p>',
            '<p><strong>الحيلة:</strong> محور مقطوع. عندما يبدأ المحور الرأسي من 1,000 بدلًا من 0، يصبح ارتفاع عمود City ‏1,400 وعمود E-bike ‏100 فقط، فيبدو City أكبر بـ 14 مرة.</p><p><strong>التصحيح:</strong> ابدأ المحور من 0. الآن تُظهر الأعمدة النسبة الحقيقية: 2,400 مقابل 1,100، أي أن City نحو 2.2 ضعف E-bike، لا 14.</p>',
            '<p><strong>ترفند:</strong> محور بریده. وقتی محور عمودی به‌جای ۰ از ۱٬۰۰۰ شروع شود، ارتفاع میلهٔ City ‏۱٬۴۰۰ و میلهٔ E-bike فقط ۱۰۰ می‌شود، پس City ۱۴ برابر بزرگ‌تر به نظر می‌رسد.</p><p><strong>اصلاح:</strong> محور را از ۰ شروع کن. حالا میله‌ها نسبت واقعی را نشان می‌دهند: ۲٬۴۰۰ در برابر ۱٬۱۰۰، یعنی City حدود ۲٫۲ برابر E-bike است، نه ۱۴.</p>',
          ),
        },
      ],
    },
    {
      title: L('A second tool', 'أداة ثانية', 'ابزار دوم'),
      prompt: L(
        '<p>Rebuild one of your three charts in Python (Colab) or Power BI and add a screenshot.</p>',
        '<p>أعد بناء أحد رسومك الثلاثة في Python (Colab) أو Power BI وأضف لقطة شاشة.</p>',
        '<p>یکی از سه نمودارت را در Python (Colab) یا Power BI دوباره بساز و تصویرش را اضافه کن.</p>',
      ),
      include: [
        L('The screenshot', 'لقطة الشاشة', 'تصویر صفحه'),
        L('One thing that was easier and one that was harder than in Excel', 'شيء واحد كان أسهل وآخر كان أصعب مما في Excel', 'یک چیز آسان‌تر و یک چیز سخت‌تر از Excel'),
      ],
      example: [
        {
          type: 'html',
          html: L(
            '<p>I rebuilt the trend chart in Python with pandas and matplotlib. <strong>Easier:</strong> once the code worked, adding a fourth bike type was one line, and re-running it updated the chart. <strong>Harder:</strong> moving the legend to the top and formatting the axis took several tries that would have been two clicks in Excel.</p>',
            '<p>أعدت بناء رسم الاتجاه في Python باستخدام pandas وmatplotlib. <strong>أسهل:</strong> بعد أن عمل الكود، كانت إضافة نوع دراجة رابع سطرًا واحدًا، وإعادة التشغيل تحدّث الرسم. <strong>أصعب:</strong> نقل المفتاح إلى الأعلى وتنسيق المحور احتاجا محاولات عدة كانت ستكون نقرتين في Excel.</p>',
            '<p>نمودار روند را در Python با pandas و matplotlib دوباره ساختم. <strong>آسان‌تر:</strong> وقتی کد کار کرد، اضافه کردن نوع چهارم دوچرخه یک خط بود و اجرای دوباره نمودار را به‌روز می‌کرد. <strong>سخت‌تر:</strong> بردن راهنما به بالا و قالب‌بندی محور چند بار تلاش لازم داشت که در Excel دو کلیک بود.</p>',
          ),
        },
      ],
    },
    {
      title: L('Working with AI', 'العمل مع الذكاء الاصطناعي', 'کار با هوش مصنوعی'),
      prompt: L(
        "<p>Ask an AI assistant to recommend a chart for one of the owner's questions. Paste your prompt and its answer, and say what you checked or changed.</p>",
        '<p>اطلب من مساعد ذكاء اصطناعي أن يقترح رسمًا لأحد أسئلة صاحب الكشك. الصق طلبك وإجابته، وقل ما الذي تحققت منه أو غيّرته.</p>',
        '<p>از یک دستیار هوش مصنوعی بخواه برای یکی از سؤال‌های صاحب غرفه نموداری پیشنهاد دهد. درخواستت و پاسخش را بچسبان و بگو چه چیزی را بررسی یا تغییر دادی.</p>',
      ),
      include: [
        L('Your exact prompt', 'طلبك كما كتبته بالضبط', 'درخواست دقیق تو'),
        L("The AI's answer (short)", 'إجابة الذكاء الاصطناعي (مختصرة)', 'پاسخ هوش مصنوعی (کوتاه)'),
        L('What you checked or changed, and why', 'ما الذي تحققت منه أو غيّرته، ولماذا', 'چه چیزی را بررسی یا تغییر دادی و چرا'),
      ],
      example: [
        {
          type: 'html',
          html: L(
            '<p><strong>Prompt:</strong> "I have monthly rentals for City, Mountain and E-bike for one year. The owner wants to see which type is growing. Which Excel chart should I use, and how should I label it?"</p><p><strong>AI answer:</strong> a clustered column chart with one column per type per month.</p><p><strong>What I changed:</strong> 36 columns are hard to read as a trend, so I used a line chart instead, as Section 2 recommends for "how does it change over time?". I also checked the AI\'s claim that E-bike "doubled" against the data: it actually quadrupled (40 to 160).</p>',
            '<p><strong>الطلب:</strong> "لدي عدد التأجير الشهري لـ City وMountain وE-bike لمدة سنة. يريد المالك أن يرى أي نوع ينمو. أي رسم في Excel أستخدم، وكيف أُعنونه؟"</p><p><strong>إجابة الذكاء الاصطناعي:</strong> رسم أعمدة مجمّعة بعمود لكل نوع في كل شهر.</p><p><strong>ما الذي غيّرته:</strong> 36 عمودًا يصعب قراءتها كاتجاه، فاستخدمت رسمًا خطيًا بدلًا منها، كما يوصي القسم 2 لسؤال "كيف يتغير مع الزمن؟". وتحققت أيضًا من قول الذكاء الاصطناعي إن E-bike "تضاعف" مقارنة بالبيانات: في الحقيقة تضاعف أربع مرات (من 40 إلى 160).</p>',
            '<p><strong>درخواست:</strong> «اجارهٔ ماهانهٔ City، Mountain و E-bike را برای یک سال دارم. مالک می‌خواهد ببیند کدام نوع در حال رشد است. از کدام نمودار Excel استفاده کنم و چطور برچسبش بزنم؟»</p><p><strong>پاسخ هوش مصنوعی:</strong> یک نمودار ستونی خوشه‌ای با یک ستون برای هر نوع در هر ماه.</p><p><strong>چه چیزی را تغییر دادم:</strong> خواندن ۳۶ ستون به‌عنوان روند سخت است، پس به‌جایش نمودار خطی گذاشتم، همان‌طور که بخش ۲ برای «در طول زمان چگونه تغییر می‌کند؟» پیشنهاد می‌کند. همچنین ادعای هوش مصنوعی که E-bike «دو برابر» شده را با داده‌ها چک کردم: در واقع چهار برابر شده است (۴۰ به ۱۶۰).</p>',
          ),
        },
      ],
    },
    {
      title: L('The recommendation', 'التوصية', 'توصیه'),
      prompt: L(
        '<p>In 3–4 sentences, tell the owner what to do next month, pointing at the numbers on your charts.</p>',
        '<p>في 3–4 جمل، أخبر صاحب الكشك بما يفعله الشهر القادم، مشيرًا إلى الأرقام في رسومك.</p>',
        '<p>در ۳ تا ۴ جمله به صاحب غرفه بگو ماه آینده چه کند و به اعداد روی نمودارهایت اشاره کن.</p>',
      ),
      include: [
        L('A clear action in the first sentence', 'إجراء واضح في الجملة الأولى', 'یک اقدام روشن در جملهٔ اول'),
        L('At least one number from each chart you refer to', 'رقم واحد على الأقل من كل رسم تشير إليه', 'دست‌کم یک عدد از هر نموداری که به آن اشاره می‌کنی'),
      ],
      example: [
        {
          type: 'html',
          html: L(
            '<p>Buy the 10 new bikes as E-bikes. City is still the biggest type (48% of rentals), but its line is flat, while E-bike rentals rose from 40 to 160 a month between January and August. If that trend continues, E-bikes will run out first in summer. Check again in September before buying more City bikes.</p>',
            '<p>اشترِ الدراجات العشر الجديدة من نوع E-bike. لا يزال City النوع الأكبر (48% من التأجير)، لكن خطه ثابت، بينما ارتفع تأجير E-bike من 40 إلى 160 في الشهر بين يناير وأغسطس. إذا استمر هذا الاتجاه، فستنفد E-bike أولًا في الصيف. راجع الأرقام مجددًا في سبتمبر قبل شراء مزيد من دراجات City.</p>',
            '<p>۱۰ دوچرخهٔ جدید را از نوع E-bike بخر. City هنوز بزرگ‌ترین نوع است (۴۸٪ اجاره‌ها)، اما خطش صاف است، در حالی که اجارهٔ E-bike بین ژانویه و اوت از ۴۰ به ۱۶۰ در ماه رسید. اگر این روند ادامه یابد، E-bike در تابستان زودتر از همه تمام می‌شود. پیش از خرید دوچرخهٔ City بیشتر، در سپتامبر دوباره بررسی کن.</p>',
          ),
        },
      ],
    },
    feedbackTask,
  ],
}
