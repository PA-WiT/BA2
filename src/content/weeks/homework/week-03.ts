import type { Block } from '../../types'
import { L, deadlineNotice, feedbackTask } from './shared'

// Example answers are worked on a slice of the 2024 monthly log (Peach only, or July only); students chart
// the full sheet. Numbers come from `units` in ../week-03.ts (Peach peaks at 44 in Aug; July 40/38/30).
export const week03Homework: Block = {
  type: 'homework',
  notice: deadlineNotice,
  objectives: [
    L(
      'Picked a chart by starting from the owner\'s question, not from the chart menu',
      'اخترت الرسم انطلاقًا من سؤال صاحب الكشك، لا من قائمة الرسوم',
      'نمودار را با شروع از سؤال صاحب غرفه انتخاب کرده‌ای، نه از منوی نمودارها',
    ),
    L(
      'Built a trend chart and a comparison chart in Excel with takeaway titles, axis titles and legends',
      'أنشأت في Excel رسمًا للاتجاه ورسمًا للمقارنة بعناوين تحمل الخلاصة وعناوين للمحاور ومفاتيح',
      'در Excel یک نمودار روند و یک نمودار مقایسه با عنوان نتیجه‌محور، عنوان محورها و راهنما ساخته‌ای',
    ),
    L(
      'Spotted and fixed a misleading chart',
      'اكتشفت رسمًا مضلِّلًا وصحّحته',
      'یک نمودار گمراه‌کننده را تشخیص داده و اصلاح کرده‌ای',
    ),
    L(
      'Rebuilt a chart in Python or Power BI and turned your charts into a recommendation',
      'أعدت بناء رسم في Python أو Power BI وحوّلت رسومك إلى توصية',
      'یک نمودار را در Python یا Power BI دوباره ساخته‌ای و نمودارهایت را به یک توصیه تبدیل کرده‌ای',
    ),
  ],
  scenario: L(
    'The example answers use a smaller slice of the same 2024 jam stand log: Peach only, or July only. Your charts use the full sheet (all three flavors, all twelve months), and you paste real screenshots.',
    'أمثلة الإجابات تستخدم جزءًا أصغر من سجل كشك المربى نفسه لعام 2024: الخوخ فقط، أو شهر يوليو فقط. رسومك تستخدم الورقة كاملة (النكهات الثلاث والأشهر الاثني عشر)، وتلصق لقطات شاشة حقيقية.',
    'نمونه‌پاسخ‌ها از بخش کوچک‌تری از همان لاگ غرفهٔ مربا در ۲۰۲۴ استفاده می‌کنند: فقط هلو یا فقط ژوئیه. نمودارهای تو از کل برگه (هر سه طعم، هر دوازده ماه) ساخته می‌شوند و تصویر واقعی صفحه را می‌چسبانی.',
  ),
  tasks: [
    {
      title: L('A trend chart', 'رسم للاتجاه', 'نمودار روند'),
      prompt: L(
        '<p>The owner asks: <em>when in the year does each flavor sell best?</em> Build a line chart of monthly units for all three flavors in Excel and paste a screenshot with a one-line caption.</p>',
        '<p>يسأل صاحب الكشك: <em>متى في السنة تبيع كل نكهة أفضل؟</em> أنشئ في Excel رسمًا خطيًا للوحدات الشهرية للنكهات الثلاث والصق لقطة شاشة مع تعليق من سطر واحد.</p>',
        '<p>صاحب غرفه می‌پرسد: <em>هر طعم در چه زمانی از سال بهتر فروش می‌رود؟</em> در Excel یک نمودار خطی از واحدهای ماهانه برای هر سه طعم بساز و تصویرش را با یک توضیح یک‌خطی بچسبان.</p>',
      ),
      analogy: L(
        '<p>A line chart is like the pencil marks on a kitchen doorframe where parents record a child\'s height each year: you don\'t care about any single mark, you care about <em>the direction</em> and <em>when the growth spurt happened</em>.</p>',
        '<p>الرسم الخطي يشبه علامات القلم على إطار باب المطبخ حيث يسجّل الأهل طول طفلهم كل عام: لا تهمك علامة بعينها، بل يهمك <em>الاتجاه</em> و<em>متى حدثت قفزة النمو</em>.</p>',
        '<p>نمودار خطی مثل خط‌های مدادی روی چارچوب در آشپزخانه است که والدین هر سال قد بچه را علامت می‌زنند: هیچ علامت تکی برایت مهم نیست، <em>جهت</em> و <em>زمان جهش رشد</em> مهم است.</p>',
      ),
      include: [
        L('A takeaway title (what the reader should notice), not just "Units by month"', 'عنوان يحمل الخلاصة (ما يجب أن يلاحظه القارئ)، لا مجرد "الوحدات حسب الشهر"', 'یک عنوان نتیجه‌محور (آنچه خواننده باید ببیند)، نه فقط «واحدها بر حسب ماه»'),
        L('Axis titles, an axis that starts at 0, and a legend at the top', 'عناوين المحاور، ومحور يبدأ من 0، ومفتاح في الأعلى', 'عنوان محورها، محوری که از ۰ شروع شود و راهنما در بالا'),
        L('A one-line caption under the screenshot', 'تعليق من سطر واحد تحت لقطة الشاشة', 'یک توضیح یک‌خطی زیر تصویر'),
      ],
      example: [
        {
          type: 'html',
          html: L(
            '<p><em>(Peach only)</em></p><ul><li><strong>Title:</strong> "Peach sales are a late-summer spike: 44 jars in August, 6 in December"</li><li><strong>Axes:</strong> x = Month (Jan–Dec), y = Jars sold, starting at 0</li><li><strong>Legend:</strong> top (with one flavor it could be dropped; with three it is needed)</li><li><strong>Caption:</strong> "Peach sells 10 jars a month or fewer until May, climbs from 16 in June to a peak of 44 in August, then falls back to 6 by December."</li></ul>',
            '<p><em>(الخوخ فقط)</em></p><ul><li><strong>العنوان:</strong> "مبيعات الخوخ ذروة في أواخر الصيف: 44 برطمانًا في أغسطس و6 في ديسمبر"</li><li><strong>المحاور:</strong> س = الشهر (يناير–ديسمبر)، ص = البرطمانات المباعة، يبدأ من 0</li><li><strong>المفتاح:</strong> في الأعلى (مع نكهة واحدة يمكن حذفه؛ مع ثلاث نكهات يلزم)</li><li><strong>التعليق:</strong> "يبيع الخوخ 10 برطمانات شهريًا أو أقل حتى مايو، ثم يرتفع من 16 في يونيو إلى ذروة 44 في أغسطس، ثم يعود إلى 6 بحلول ديسمبر."</li></ul>',
            '<p><em>(فقط هلو)</em></p><ul><li><strong>عنوان:</strong> «فروش هلو یک جهش اواخر تابستان است: ۴۴ شیشه در اوت، ۶ در دسامبر»</li><li><strong>محورها:</strong> x = ماه (ژانویه تا دسامبر)، y = شیشه‌های فروخته‌شده، از ۰</li><li><strong>راهنما:</strong> بالا (با یک طعم می‌شود حذفش کرد؛ با سه طعم لازم است)</li><li><strong>توضیح:</strong> «هلو تا مه ۱۰ شیشه در ماه یا کمتر می‌فروشد، از ۱۶ در ژوئن تا اوج ۴۴ در اوت بالا می‌رود و تا دسامبر به ۶ برمی‌گردد.»</li></ul>',
          ),
        },
      ],
    },
    {
      title: L('A comparison chart, honest and dishonest', 'رسم للمقارنة، أمين وغير أمين', 'نمودار مقایسه، صادق و ناصادق'),
      prompt: L(
        '<p>Build a sorted bar chart of the <strong>yearly</strong> total per flavor. Then make a misleading copy with the y-axis starting well above 0, and put the two side by side. Say how many times bigger the top flavor <em>looks</em> in the misleading one versus how much bigger it really is.</p>',
        '<p>أنشئ رسم أعمدة مرتّبًا للإجمالي <strong>السنوي</strong> لكل نكهة. ثم أنشئ نسخة مضلِّلة يبدأ فيها المحور الرأسي أعلى بكثير من 0، وضع الاثنين جنبًا إلى جنب. قل كم مرة <em>تبدو</em> النكهة الأولى أكبر في النسخة المضلِّلة مقارنة بحجمها الحقيقي.</p>',
        '<p>یک نمودار میله‌ای مرتب از مجموع <strong>سالانهٔ</strong> هر طعم بساز. سپس یک نسخهٔ گمراه‌کننده بساز که محور عمودی‌اش خیلی بالاتر از ۰ شروع شود و این دو را کنار هم بگذار. بگو طعم برتر در نسخهٔ گمراه‌کننده چند برابر بزرگ‌تر <em>به نظر می‌رسد</em> و در واقع چقدر بزرگ‌تر است.</p>',
      ),
      analogy: L(
        '<p>A truncated axis is like a photo taken from a low angle: it makes someone look much taller than they are. Starting the axis at 0 is standing at eye level.</p>',
        '<p>المحور المقطوع يشبه صورة ملتقطة من زاوية منخفضة: تجعل الشخص يبدو أطول بكثير مما هو عليه. بدء المحور من 0 هو الوقوف على مستوى العين.</p>',
        '<p>محور بریده مثل عکسی است که از زاویهٔ پایین گرفته شده: آدم را خیلی بلندتر از آنچه هست نشان می‌دهد. شروع محور از ۰ یعنی ایستادن هم‌سطح چشم.</p>',
      ),
      include: [
        L('Two screenshots: honest (axis at 0) and misleading (axis cut)', 'لقطتا شاشة: أمينة (المحور من 0) ومضلِّلة (المحور مقطوع)', 'دو تصویر: صادق (محور از ۰) و گمراه‌کننده (محور بریده)'),
        L('The real ratio and the ratio the misleading chart suggests', 'النسبة الحقيقية والنسبة التي يوحي بها الرسم المضلِّل', 'نسبت واقعی و نسبتی که نمودار گمراه‌کننده القا می‌کند'),
      ],
      example: [
        {
          type: 'table',
          headers: [L('July only', 'يوليو فقط', 'فقط ژوئیه'), L('Strawberry', 'الفراولة', 'توت‌فرنگی'), L('Blueberry', 'التوت الأزرق', 'بلوبری'), L('Peach', 'الخوخ', 'هلو')],
          rows: [[L('Jars sold', 'البرطمانات المباعة', 'شیشه‌های فروخته‌شده'), L('40', '40', '40'), L('38', '38', '38'), L('30', '30', '30')]],
        },
        {
          type: 'html',
          html: L(
            '<p><strong>Misleading:</strong> with the y-axis starting at 28, the Strawberry bar is 12 units tall and the Peach bar only 2, so Strawberry <em>looks</em> 6 times bigger.</p><p><strong>Honest:</strong> with the axis at 0, the bars are 40 vs. 30: Strawberry sold about 1.3 times as much as Peach in July, a modest lead, not a landslide.</p>',
            '<p><strong>المضلِّل:</strong> عندما يبدأ المحور الرأسي من 28، يصبح ارتفاع عمود الفراولة 12 وحدة وعمود الخوخ 2 فقط، فـ<em>تبدو</em> الفراولة أكبر بست مرات.</p><p><strong>الأمين:</strong> عندما يبدأ المحور من 0، تصبح الأعمدة 40 مقابل 30: باعت الفراولة نحو 1.3 ضعف الخوخ في يوليو، تقدّم متواضع لا اكتساح.</p>',
            '<p><strong>گمراه‌کننده:</strong> وقتی محور عمودی از ۲۸ شروع شود، ارتفاع میلهٔ توت‌فرنگی ۱۲ واحد و میلهٔ هلو فقط ۲ است، پس توت‌فرنگی ۶ برابر بزرگ‌تر <em>به نظر می‌رسد</em>.</p><p><strong>صادق:</strong> با محور از ۰، میله‌ها ۴۰ در برابر ۳۰ هستند: توت‌فرنگی در ژوئیه حدود ۱٫۳ برابر هلو فروخت، برتری‌ای متوسط، نه پیروزی قاطع.</p>',
          ),
        },
      ],
    },
    {
      title: L('A second tool, and checking the AI', 'أداة ثانية، والتحقق من الذكاء الاصطناعي', 'ابزار دوم و بررسی هوش مصنوعی'),
      prompt: L(
        '<p>Rebuild your trend chart in Python (Colab) or Power BI and add a screenshot. Then ask an AI assistant which chart it would use for the owner\'s question, and say whether you agree and what you checked.</p>',
        '<p>أعد بناء رسم الاتجاه في Python (Colab) أو Power BI وأضف لقطة شاشة. ثم اسأل مساعد ذكاء اصطناعي عن الرسم الذي سيستخدمه لسؤال صاحب الكشك، وقل هل توافقه وما الذي تحققت منه.</p>',
        '<p>نمودار روندت را در Python (Colab) یا Power BI دوباره بساز و تصویرش را اضافه کن. سپس از یک دستیار هوش مصنوعی بپرس برای سؤال صاحب غرفه از کدام نمودار استفاده می‌کند و بگو موافقی یا نه و چه چیزی را بررسی کردی.</p>',
      ),
      analogy: L(
        '<p>It\'s the same recipe cooked in a different kitchen: the dish (your chart) should taste the same, but some steps are faster in one kitchen and slower in the other. Notice which.</p>',
        '<p>إنها الوصفة نفسها مطبوخة في مطبخ مختلف: يجب أن يكون للطبق (رسمك) الطعم نفسه، لكن بعض الخطوات أسرع في مطبخ وأبطأ في آخر. لاحظ أيها.</p>',
        '<p>همان دستور پخت است در آشپزخانه‌ای دیگر: غذا (نمودارت) باید همان مزه را بدهد، اما بعضی مراحل در یک آشپزخانه سریع‌تر و در دیگری کندترند. ببین کدام‌ها.</p>',
      ),
      include: [
        L('The screenshot from Python or Power BI', 'لقطة الشاشة من Python أو Power BI', 'تصویر از Python یا Power BI'),
        L('One thing that was easier and one that was harder than in Excel', 'شيء واحد كان أسهل وآخر كان أصعب مما في Excel', 'یک چیز آسان‌تر و یک چیز سخت‌تر از Excel'),
        L('Your prompt, the AI\'s suggestion, and what you checked or changed', 'طلبك، واقتراح الذكاء الاصطناعي، وما تحققت منه أو غيّرته', 'درخواستت، پیشنهاد هوش مصنوعی و آنچه بررسی یا تغییر دادی'),
      ],
      example: [
        {
          type: 'code',
          code: `# Peach only; your version plots all three flavors (y=flavors)
ax = df.plot.line(x="Month", y="Peach", marker="o", color="#A8322A", figsize=(9, 4))
ax.set_title("Peach sales are a late-summer spike: 44 jars in August, 6 in December")
ax.set_xlabel("Month")
ax.set_ylabel("Jars sold")
ax.set_ylim(0, 50)
plt.show()`,
        },
        {
          type: 'html',
          html: L(
            '<p><strong>Easier in Python:</strong> once the cell worked, changing the title or the flavor was one edit and a re-run. <strong>Harder:</strong> I had to look up <code>set_ylim</code> to force the axis to start at 0, which Excel did by default.</p><p><strong>AI check:</strong> I asked "Which chart shows when Peach sells best during the year?" It suggested a pie chart of months. I disagreed: months are not parts of one whole and 12 slices are unreadable, so I kept the line chart, as Section 2 recommends for "how does it change over time?".</p>',
            '<p><strong>أسهل في Python:</strong> بعد أن عملت الخلية، صار تغيير العنوان أو النكهة تعديلًا واحدًا وإعادة تشغيل. <strong>أصعب:</strong> اضطررت للبحث عن <code>set_ylim</code> لأجعل المحور يبدأ من 0، وهو ما فعله Excel تلقائيًا.</p><p><strong>التحقق من الذكاء الاصطناعي:</strong> سألت "أي رسم يوضح متى يبيع الخوخ أفضل خلال السنة؟" فاقترح رسمًا دائريًا للأشهر. لم أوافق: الأشهر ليست أجزاء من كلٍّ واحد و12 شريحة لا تُقرأ، فأبقيت الرسم الخطي، كما يوصي القسم 2 لسؤال "كيف يتغير مع الزمن؟".</p>',
            '<p><strong>آسان‌تر در Python:</strong> وقتی سلول کار کرد، تغییر عنوان یا طعم یک ویرایش و یک اجرای دوباره بود. <strong>سخت‌تر:</strong> باید <code>set_ylim</code> را جست‌وجو می‌کردم تا محور از ۰ شروع شود، کاری که Excel خودش انجام می‌داد.</p><p><strong>بررسی هوش مصنوعی:</strong> پرسیدم «کدام نمودار نشان می‌دهد هلو در چه زمانی از سال بهتر فروش می‌رود؟» نمودار دایره‌ای ماه‌ها را پیشنهاد داد. موافق نبودم: ماه‌ها بخش‌های یک کل نیستند و ۱۲ قطعه خوانا نیست، پس نمودار خطی را نگه داشتم، همان‌طور که بخش ۲ برای «در طول زمان چگونه تغییر می‌کند؟» پیشنهاد می‌کند.</p>',
          ),
        },
      ],
    },
    {
      title: L('The recommendation', 'التوصية', 'توصیه'),
      prompt: L(
        '<p>In 3–4 sentences, tell the owner how to plan stock for next year, pointing at the numbers on your charts.</p>',
        '<p>في 3–4 جمل، أخبر صاحب الكشك كيف يخطط للمخزون للعام القادم، مشيرًا إلى الأرقام في رسومك.</p>',
        '<p>در ۳ تا ۴ جمله به صاحب غرفه بگو برای سال آینده موجودی را چگونه برنامه‌ریزی کند و به اعداد روی نمودارهایت اشاره کن.</p>',
      ),
      analogy: L(
        '<p>Write it like a weather forecast for the stand: what is coming, when, and what to bring. "Expect a Strawberry peak in June; stock up in May" is useful; "sales vary by month" is not.</p>',
        '<p>اكتبها كنشرة جوية للكشك: ما القادم، ومتى، وماذا تُحضر. "توقّع ذروة الفراولة في يونيو؛ خزّن في مايو" مفيدة؛ أما "تختلف المبيعات حسب الشهر" فلا.</p>',
        '<p>آن را مثل پیش‌بینی هوا برای غرفه بنویس: چه چیزی در راه است، کِی، و چه باید آماده کرد. «اوج توت‌فرنگی را در ژوئن انتظار داشته باش؛ در مه انبار کن» مفید است؛ «فروش بر حسب ماه فرق می‌کند» مفید نیست.</p>',
      ),
      include: [
        L('A clear action in the first sentence', 'إجراء واضح في الجملة الأولى', 'یک اقدام روشن در جملهٔ اول'),
        L('At least one number from each chart you refer to', 'رقم واحد على الأقل من كل رسم تشير إليه', 'دست‌کم یک عدد از هر نموداری که به آن اشاره می‌کنی'),
      ],
      example: [
        {
          type: 'html',
          html: L(
            '<p><em>(The example answers a smaller question: when should the stand stock extra Peach?)</em> Order extra Peach in June. Peach sells 10 jars a month or fewer until May, then jumps to 30 in July and 44 in August before dropping back to 18 in October. Stocking for about 45 jars in August, and only around 10 a month in winter, avoids both empty shelves at the peak and leftover jars in December.</p>',
            '<p><em>(يجيب المثال عن سؤال أصغر: متى يجب أن يخزّن الكشك كمية إضافية من الخوخ؟)</em> اطلب كمية إضافية من الخوخ في يونيو. يبيع الخوخ 10 برطمانات شهريًا أو أقل حتى مايو، ثم يقفز إلى 30 في يوليو و44 في أغسطس قبل أن يعود إلى 18 في أكتوبر. التخزين لنحو 45 برطمانًا في أغسطس، ونحو 10 فقط شهريًا في الشتاء، يمنع الرفوف الفارغة في الذروة والبرطمانات المتبقية في ديسمبر.</p>',
            '<p><em>(این نمونه به یک سؤال کوچک‌تر پاسخ می‌دهد: غرفه کِی باید هلوی اضافه انبار کند؟)</em> هلوی اضافه را در ژوئن سفارش بده. هلو تا مه ۱۰ شیشه در ماه یا کمتر می‌فروشد، سپس در ژوئیه به ۳۰ و در اوت به ۴۴ می‌رسد و در اکتبر به ۱۸ برمی‌گردد. انبار کردن حدود ۴۵ شیشه برای اوت و فقط حدود ۱۰ شیشه در ماه در زمستان، هم از قفسهٔ خالی در اوج جلوگیری می‌کند و هم از شیشه‌های باقی‌مانده در دسامبر.</p>',
          ),
        },
      ],
    },
  ],
  feedback: feedbackTask,
}
