// Sections 7-8 of Week 8 (week-08.ts places them), rewritten simpler and on the jam stand only. The deck's spam
// filter was replaced by a made-up "sniff test for mould" on 100 jars (labelled as made up on the page), so the
// confusion matrix ties back to Section 6's mould check. Specificity and the deck's formula slide were dropped.
// SE, SD and R² come from public/data/jam-tasting.csv (pandas); Excel formulas recalculated in LibreOffice.
// ar/fa are draft translations awaiting native review. Code and formulas stay English.
import type { Block, Localized, Question, Week } from '../types'
import { py, xl } from './week08Code'

const t = (en: string, ar: string, fa: string): Localized => ({ en, ar, fa })
const W = t
const faDigits = (n: number) => String(n).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[Number(d)])
const html = (en: string, ar: string, fa: string): Block => ({ type: 'html', html: t(en, ar, fa) })
const code = (c: string): Block => ({ type: 'code', code: c })
const box = (variant: 'analogy' | 'mistake' | 'keypoint' | 'example', label: Localized, en: string, ar: string, fa: string): Block => ({
  type: 'box',
  variant,
  label,
  html: t(en, ar, fa),
})
const analogy = (en: string, ar: string, fa: string): Block => box('analogy', t('Analogy', 'تشبيه', 'تشبیه'), en, ar, fa)
const figure = (n: number, title: Localized, src: string, alt: string, caption: Localized): Block => ({
  type: 'diagram',
  fig: t(`Figure ${n}`, `الشكل ${n}`, `شکل ${faDigits(n)}`),
  title,
  src,
  alt,
  caption,
})
const recap = (...items: Localized[]): Block => ({ type: 'takeaways', label: t('In one minute', 'في دقيقة واحدة', 'در یک دقیقه'), items })
const exercise = (id: string): Block => ({ type: 'exercise', questionId: id })
const tools = (excel: Block[], python: Block[]): Block => ({
  type: 'tabs',
  tabs: [
    { label: t('Excel', 'Excel', 'Excel'), blocks: excel },
    { label: t('Python (Colab)', 'Python ‏(Colab)', 'Python ‏(Colab)'), blocks: python },
  ],
})
const plainWords = t('Words in this section, in plain language', 'كلمات هذا القسم بلغة بسيطة', 'واژه‌های این بخش، به زبان ساده')

export const questions: Question[] = [
  {
    id: 'w08-q008',
    weekId: 'week-08',
    topic: 'measuring-error',
    answer: 1,
    prompt: t(
      'Our average is 60.15 jars, with a standard error of about 2 jars. What does the "about 2" mean?',
      'متوسطنا 60.15 برطمانًا، بخطأ معياري نحو برطمانين. ماذا يعني "نحو برطمانين"؟',
      'میانگین ما ۶۰٫۱۵ شیشه است، با خطای معیار حدود ۲ شیشه. «حدود ۲» یعنی چه؟',
    ),
    options: [
      t('Every Saturday sells exactly 2 jars more or less', 'كل سبت يبيع برطمانين أكثر أو أقل بالضبط', 'هر شنبه دقیقاً ۲ شیشه کمتر یا بیشتر می‌فروشد'),
      t('Our average could be about 2 jars away from the true average', 'قد يبتعد متوسطنا نحو برطمانين عن المتوسط الحقيقي', 'میانگین ما ممکن است حدود ۲ شیشه با میانگین واقعی فاصله داشته باشد'),
      t('2 jars were broken', 'انكسر برطمانان', '۲ شیشه شکست'),
    ],
  },
  {
    id: 'w08-q015',
    weekId: 'week-08',
    topic: 'measuring-error',
    answer: 1,
    prompt: t(
      'The sniff test caught 8 of the 10 mouldy jars. What share of the mouldy jars did it catch?',
      'التقط اختبار الشم 8 من البرطمانات العشرة المتعفّنة. ما نسبة البرطمانات المتعفّنة التي التقطها؟',
      'آزمون بو کردن ۸ تا از ۱۰ شیشهٔ کپک‌زده را گرفت. چه سهمی از شیشه‌های کپک‌زده را گرفت؟',
    ),
    options: [
      t('8%', '8%', '۸٪'),
      t('80%: 8 out of 10', '80%: 8 من 10', '۸۰٪: ۸ از ۱۰'),
      t('92%', '92%', '۹۲٪'),
    ],
  },
  {
    id: 'w08-q016',
    weekId: 'week-08',
    topic: 'measuring-error',
    answer: 0,
    prompt: t(
      'The sniff test is right on 92 of 100 jars, but 2 mouldy jars were sold. Is "92% right" enough to trust it?',
      'اختبار الشم صحيح في 92 من 100 برطمان، لكن بيع برطمانان متعفّنان. هل "صحيح بنسبة 92%" يكفي للثقة به؟',
      'آزمون بو کردن دربارهٔ ۹۲ شیشه از ۱۰۰ درست است، اما ۲ شیشهٔ کپک‌زده فروخته شد. آیا «۹۲٪ درست» برای اعتماد کافی است؟',
    ),
    options: [
      t('No: also check how many mouldy jars it catches, because missing one is the worse mistake', 'لا: تحقق أيضًا كم برطمانًا متعفّنًا يلتقط، لأن فوات واحد هو الخطأ الأسوأ', 'نه: بررسی کن چند شیشهٔ کپک‌زده را می‌گیرد، چون جا انداختن یکی اشتباه بدتر است'),
      t('Yes: 92% is a high score', 'نعم: 92% نتيجة عالية', 'بله: ۹۲٪ نمرهٔ بالایی است'),
      t('Yes, if we sniff each jar twice', 'نعم، إذا شممنا كل برطمان مرتين', 'بله، اگر هر شیشه را دو بار بو کنیم'),
    ],
  },
  {
    id: 'w08-q010',
    weekId: 'week-08',
    topic: 'using-errors',
    answer: 1,
    prompt: t(
      'Only regular customers filled in the stand\'s survey. How do you fix that?',
      'ملأ استبيان الكشك الزبائن الدائمون فقط. كيف تصلح ذلك؟',
      'فقط مشتری‌های همیشگی نظرسنجی غرفه را پر کردند. چطور درستش می‌کنی؟',
    ),
    options: [
      t('Get more answers from the same regulars', 'احصل على إجابات أكثر من الزبائن الدائمين أنفسهم', 'از همان مشتری‌های همیشگی جواب بیشتری بگیر'),
      t('Also ask the people you missed, like passers-by', 'اسأل أيضًا من فاتك، مثل المارّة', 'از کسانی که جا ماندند، مثل رهگذرها، هم بپرس'),
      t('Round the answers', 'قرّب الإجابات', 'جواب‌ها را گرد کن'),
    ],
  },
]

export const sections: Week['sections'] = [
  // ---------- 7. How sure are you? ----------
  {
    id: 'measuring-error',
    navLabel: W('How sure are you?', 'كم أنت متأكد؟', 'چقدر مطمئنی؟'),
    sectionLabel: W('Section 07', 'القسم ٠٧', 'بخش ۰۷'),
    timeEst: W('12 min', '١٢ دقيقة', '۱۲ دقیقه'),
    headingHtml: t(
      '<h2>How sure are you? Three simple ways to put a number on error</h2><p class="standfirst">"There may be errors" is vague. A number is better. Here are three, one for each kind of result: an average, a regression, and a yes/no check.</p>',
      '<h2>كم أنت متأكد؟ ثلاث طرق بسيطة لوضع رقم على الخطأ</h2><p class="standfirst">"قد توجد أخطاء" عبارة غامضة. الرقم أفضل. إليك ثلاثة، واحد لكل نوع من النتائج: متوسط، وانحدار، وفحص نعم/لا.</p>',
      '<h2>چقدر مطمئنی؟ سه راه ساده برای عدد گذاشتن روی خطا</h2><p class="standfirst">«ممکن است خطا باشد» مبهم است. عدد بهتر است. این سه تا، یکی برای هر نوع نتیجه: یک میانگین، یک رگرسیون و یک بررسی بله/نه.</p>',
    ),
    blocks: [
      html('<h3>1. An average: how much could it be off?</h3>', '<h3>1. المتوسط: كم قد يبتعد؟</h3>', '<h3>۱. میانگین: چقدر ممکن است خطا داشته باشد؟</h3>'),
      box(
        'keypoint',
        plainWords,
        '<ul><li><strong>Standard deviation (SD):</strong> how different one Saturday is from another. Jam stand: <strong>9.46 jars</strong>.</li><li><strong>Standard error (SE):</strong> how much our <em>average</em> could be off. SE = SD ÷ √(number of Saturdays) = 9.46 ÷ √20 = <strong>2.12 jars</strong>.</li></ul><p>So: "we sell about <strong>60 jars a Saturday, give or take 2</strong>." More Saturdays → a smaller SE.</p>',
        '<ul><li><strong>الانحراف المعياري (SD):</strong> كم يختلف سبت عن آخر. كشك المربى: <strong>9.46 برطمان</strong>.</li><li><strong>الخطأ المعياري (SE):</strong> كم قد يبتعد <em>متوسطنا</em>. SE = SD ÷ √(عدد أيام السبت) = 9.46 ÷ √20 = <strong>2.12 برطمان</strong>.</li></ul><p>إذن: "نبيع نحو <strong>60 برطمانًا كل سبت، بزيادة أو نقصان 2</strong>." أيام سبت أكثر ← SE أصغر.</p>',
        '<ul><li><strong>انحراف معیار (SD):</strong> اینکه یک شنبه چقدر با شنبهٔ دیگر فرق دارد. غرفهٔ مربا: <strong>۹٫۴۶ شیشه</strong>.</li><li><strong>خطای معیار (SE):</strong> اینکه <em>میانگین</em> ما چقدر ممکن است خطا داشته باشد. SE = SD ÷ √(تعداد شنبه‌ها) = 9.46 ÷ √20 = <strong>۲٫۱۲ شیشه</strong>.</li></ul><p>پس: «هر شنبه حدود <strong>۶۰ شیشه می‌فروشیم، دو تا کم یا زیاد</strong>.» شنبهٔ بیشتر ← SE کوچک‌تر.</p>',
      ),
      analogy(
        '<p>Throw darts. Single darts land all over the board (that is the SD). But if you throw 20 darts and mark their <em>average</em> spot, and do that again and again, the average spots land close together (that is the SE). One Saturday jumps around; the average of 20 Saturdays hardly moves.</p>',
        '<p>ارمِ السهام. السهام المفردة تقع في كل مكان على اللوحة (هذا هو SD). لكن إن رميت 20 سهمًا وعلّمت موضع <em>متوسطها</em>، وكررت ذلك مرارًا، تقع مواضع المتوسطات قريبة بعضها من بعض (هذا هو SE). السبت الواحد يقفز؛ ومتوسط 20 سبتًا بالكاد يتحرك.</p>',
        '<p>دارت پرتاب کن. تک‌دارت‌ها همه‌جای صفحه می‌افتند (این SD است). اما اگر ۲۰ دارت بیندازی و جای <em>میانگینشان</em> را علامت بزنی و این کار را بارها تکرار کنی، جای میانگین‌ها نزدیک هم می‌افتد (این SE است). یک شنبه بالا و پایین می‌پرد؛ میانگین ۲۰ شنبه به‌زحمت تکان می‌خورد.</p>',
      ),
      figure(
        4,
        W('Spread of single values vs spread of averages', 'تشتت القيم المفردة مقابل تشتت المتوسطات', 'پراکندگی مقدارهای تکی در برابر پراکندگی میانگین‌ها'),
        '/figures/week-08/deck-04-sd-vs-se.jpg',
        'Slide from the original lesson. Left: one wide bell curve, the standard deviation, the spread of single values. Right: several narrow curves for different sample averages, the standard error, sigma over root n, with the Excel formula STDEV(A1:A10)/SQRT(COUNT(A1:A10)).',
        W(
          'From the original lesson. Left: single values spread widely (SD). Right: averages spread much less (SE). You do not need the formulas; Excel does them below.',
          'من الدرس الأصلي. يسارًا: القيم المفردة متشتتة كثيرًا (SD). يمينًا: المتوسطات أقل تشتتًا بكثير (SE). لا تحتاج المعادلات؛ يحسبها Excel أدناه.',
          'از درس اصلی. چپ: مقدارهای تکی خیلی پخش‌اند (SD). راست: میانگین‌ها خیلی کمتر پخش‌اند (SE). فرمول‌ها را لازم نداری؛ Excel پایین حسابشان می‌کند.',
        ),
      ),
      tools([code(xl.sdSe)], [code(py.sdSe)]),
      html(
        '<h3>2. A regression: how much does it explain?</h3><p><strong>R²</strong> is the share of the ups and downs the model explains (Week 6). Visitors alone: <strong>60%</strong>. Visitors and tasting together: <strong>71%</strong>. The other 29% is weather, luck and things not in the file.</p><h3>3. A yes/no check: the confusion matrix</h3><p>A made-up example. The owner tries a quick <strong>sniff test for mould</strong> on 100 jars, then has them all checked properly. Four things can happen, so we count them in a 2 × 2 table.</p>',
        '<h3>2. الانحدار: كم يفسّر؟</h3><p><strong>R²</strong> هو نسبة الصعود والهبوط التي يفسّرها النموذج (الأسبوع 6). الزوار وحدهم: <strong>60%</strong>. الزوار والتذوق معًا: <strong>71%</strong>. الـ 29% الأخرى هي الطقس والحظ وأشياء ليست في الملف.</p><h3>3. فحص نعم/لا: مصفوفة الالتباس</h3><p>مثال مختلَق. يجرب المالك <strong>اختبار شم سريعًا للعفن</strong> على 100 برطمان، ثم يفحصها كلها فحصًا دقيقًا. قد يحدث أربعة أشياء، فنعدّها في جدول 2 × 2.</p>',
        '<h3>۲. رگرسیون: چقدر توضیح می‌دهد؟</h3><p><strong>R²</strong> سهم بالا و پایین‌هایی است که مدل توضیح می‌دهد (هفتهٔ ۶). فقط بازدیدکننده: <strong>۶۰٪</strong>. بازدیدکننده و مزه‌کردن با هم: <strong>۷۱٪</strong>. ۲۹٪ دیگر هوا، شانس و چیزهایی است که در فایل نیست.</p><h3>۳. بررسی بله/نه: ماتریس درهم‌ریختگی</h3><p>یک مثال ساختگی. صاحب غرفه یک <strong>آزمون سریع بو کردن برای کپک</strong> را روی ۱۰۰ شیشه امتحان می‌کند و بعد همه را دقیق بررسی می‌کند. چهار حالت ممکن است، پس آن‌ها را در یک جدول ۲ × ۲ می‌شماریم.</p>',
      ),
      figure(
        5,
        W('The sniff test in a 2 × 2 table', 'اختبار الشم في جدول 2 × 2', 'آزمون بو کردن در یک جدول ۲ × ۲'),
        '/figures/week-08/diagram-01-confusion.svg',
        'A made-up sniff test for mould on 100 jam jars. Of the 10 really mouldy jars, 8 were caught and 2 missed. Of the 90 fine jars, 6 were false alarms and 84 passed. Right overall 92 percent; mouldy jars caught 80 percent; jars called mouldy that really were 57 percent.',
        W(
          'Green = right, red = a mistake. The 2 missed jars are the dangerous mistake from Section 6.',
          'الأخضر = صحيح، والأحمر = خطأ. البرطمانان الفائتان هما الخطأ الخطير من القسم 6.',
          'سبز = درست، قرمز = اشتباه. ۲ شیشهٔ جاافتاده همان اشتباه خطرناک بخش ۶ است.',
        ),
      ),
      box(
        'keypoint',
        plainWords,
        '<ul><li><strong>Accuracy</strong> = right overall = (8 + 84) ÷ 100 = <strong>92%</strong>.</li><li><strong>Recall</strong> = of the mouldy jars, how many it caught = 8 ÷ 10 = <strong>80%</strong>.</li><li><strong>Precision</strong> = when it says "mouldy", how often it is right = 8 ÷ 14 = <strong>57%</strong>.</li></ul><p><strong>The trap:</strong> 92% sounds great, yet 2 mouldy jars reached customers. When most jars are fine, even "always say fine" would score 90%. So look at the number that matches the worse mistake: here, <strong>recall</strong>.</p>',
        '<ul><li><strong>الدقة الكلية (Accuracy)</strong> = الصحيح إجمالًا = (8 + 84) ÷ 100 = <strong>92%</strong>.</li><li><strong>الاستدعاء (Recall)</strong> = من البرطمانات المتعفّنة، كم التقط = 8 ÷ 10 = <strong>80%</strong>.</li><li><strong>الدقة (Precision)</strong> = حين يقول "متعفّن"، كم مرة يصيب = 8 ÷ 14 = <strong>57%</strong>.</li></ul><p><strong>الفخ:</strong> 92% تبدو رائعة، ومع ذلك وصل برطمانان متعفّنان إلى الزبائن. حين تكون معظم البرطمانات سليمة، حتى "قل سليم دائمًا" ستحصل على 90%. لذا انظر إلى الرقم الذي يطابق الخطأ الأسوأ: هنا <strong>الاستدعاء</strong>.</p>',
        '<ul><li><strong>صحت کلی (Accuracy)</strong> = درست در کل = (8 + 84) ÷ 100 = <strong>۹۲٪</strong>.</li><li><strong>بازیابی (Recall)</strong> = از شیشه‌های کپک‌زده، چند تا را گرفت = 8 ÷ 10 = <strong>۸۰٪</strong>.</li><li><strong>دقت (Precision)</strong> = وقتی می‌گوید «کپک‌زده»، چند بار درست می‌گوید = 8 ÷ 14 = <strong>۵۷٪</strong>.</li></ul><p><strong>تله:</strong> ۹۲٪ عالی به نظر می‌رسد، اما ۲ شیشهٔ کپک‌زده به دست مشتری رسید. وقتی بیشتر شیشه‌ها سالم‌اند، حتی «همیشه بگو سالم» هم ۹۰٪ می‌گیرد. پس عددی را ببین که با اشتباه بدتر جور است: اینجا <strong>بازیابی</strong>.</p>',
      ),
      tools([code(xl.confusion)], [code(py.confusion)]),
      recap(
        W('Average: "60 jars, give or take 2" (the standard error).', 'المتوسط: "60 برطمانًا، بزيادة أو نقصان 2" (الخطأ المعياري).', 'میانگین: «۶۰ شیشه، دو تا کم یا زیاد» (خطای معیار).'),
        W('Regression: R² = how much it explains (71%).', 'الانحدار: R² = كم يفسّر (71%).', 'رگرسیون: R² = چقدر توضیح می‌دهد (۷۱٪).'),
        W('Yes/no check: do not stop at accuracy; ask how many of the bad ones it caught.', 'فحص نعم/لا: لا تتوقف عند الدقة الكلية؛ اسأل كم التقط من السيئ.', 'بررسی بله/نه: به صحت کلی بسنده نکن؛ بپرس چند تا از بدها را گرفت.'),
      ),
      exercise('w08-q008'),
      exercise('w08-q015'),
      exercise('w08-q016'),
    ],
  },
  // ---------- 8. What to do with errors ----------
  {
    id: 'using-errors',
    navLabel: W('What to do with errors', 'ماذا نفعل بالأخطاء', 'با خطاها چه کنیم'),
    sectionLabel: W('Section 08', 'القسم ٠٨', 'بخش ۰۸'),
    timeEst: W('5 min', '٥ دقائق', '۵ دقیقه'),
    headingHtml: t(
      '<h2>What to do with errors: say them, then shrink them</h2><p class="standfirst">Errors are not something to hide. Say who your result is for and how sure you are, then make the next round better.</p>',
      '<h2>ماذا نفعل بالأخطاء: قلها، ثم قلّلها</h2><p class="standfirst">الأخطاء ليست شيئًا نخفيه. قل لمن نتيجتك وكم أنت متأكد، ثم اجعل الجولة التالية أفضل.</p>',
      '<h2>با خطاها چه کنیم: بگو، بعد کمشان کن</h2><p class="standfirst">خطا چیزی نیست که پنهانش کنیم. بگو نتیجه‌ات برای چه کسی است و چقدر مطمئنی، بعد دور بعد را بهتر کن.</p>',
    ),
    blocks: [
      analogy(
        '<p>A weather forecast says "70% chance of rain in Amsterdam tomorrow". It says <strong>where and when</strong>, and <strong>how sure</strong>. Nobody calls that a failure; they take an umbrella. Your result should be just as honest.</p>',
        '<p>تقول نشرة الطقس "احتمال المطر غدًا في أمستردام 70%". إنها تقول <strong>أين ومتى</strong>، و<strong>كم هي متأكدة</strong>. لا أحد يعدّ ذلك فشلًا؛ بل يأخذون مظلة. ويجب أن تكون نتيجتك بالصدق نفسه.</p>',
        '<p>پیش‌بینی هوا می‌گوید «فردا در آمستردام ۷۰٪ احتمال باران». می‌گوید <strong>کجا و کی</strong>، و <strong>چقدر مطمئن</strong>. کسی این را شکست نمی‌داند؛ چتر برمی‌دارند. نتیجهٔ تو هم باید همین‌قدر صادق باشد.</p>',
      ),
      {
        type: 'table',
        headers: [W('Step', 'الخطوة', 'گام'), W('Jam stand', 'كشك المربى', 'غرفهٔ مربا')],
        rows: [
          [W('<strong>Say the scope</strong>: who, where, when', '<strong>قل النطاق</strong>: من، أين، متى', '<strong>دامنه را بگو</strong>: چه کسی، کجا، کی'), W('One market, 20 summer Saturdays in 2024', 'سوق واحد، 20 سبتًا صيفيًا في 2024', 'یک بازار، ۲۰ شنبهٔ تابستانی در ۲۰۲۴')],
          [W('<strong>Random error?</strong> Get more data', '<strong>خطأ عشوائي؟</strong> اجمع بيانات أكثر', '<strong>خطای تصادفی؟</strong> دادهٔ بیشتر جمع کن'), W('Keep counting into the autumn: more Saturdays, a smaller "give or take"', 'استمر في العدّ حتى الخريف: أيام سبت أكثر، و"زيادة أو نقصان" أصغر', 'تا پاییز شمردن را ادامه بده: شنبهٔ بیشتر، «کم یا زیاد» کوچک‌تر')],
          [W('<strong>Bias?</strong> Get better data', '<strong>تحيز؟</strong> اجمع بيانات أفضل', '<strong>سوگیری؟</strong> دادهٔ بهتر جمع کن'), W('Ask passers-by too, not only buyers; try a second market', 'اسأل المارّة أيضًا، لا المشترين فقط؛ وجرّب سوقًا ثانيًا', 'از رهگذرها هم بپرس، نه فقط خریداران؛ یک بازار دوم را امتحان کن')],
        ],
      },
      box(
        'example',
        W('A "limits" paragraph for the jam stand', 'فقرة "حدود" لكشك المربى', 'یک بند «محدودیت‌ها» برای غرفهٔ مربا'),
        '<p><em>"These results come from 20 summer Saturdays at one market. Our average of about 60 jars could be off by about 2. Visitors were counted by hand, so some may be missing. We do not know yet if tasting works in winter; we will keep checking until December."</em></p>',
        '<p><em>"تأتي هذه النتائج من 20 سبتًا صيفيًا في سوق واحد. قد يبتعد متوسطنا البالغ نحو 60 برطمانًا بنحو 2. عُدّ الزوار يدويًا، فقد يكون بعضهم مفقودًا. لا نعرف بعد إن كان التذوق ينجح في الشتاء؛ وسنستمر في التحقق حتى ديسمبر."</em></p>',
        '<p><em>«این نتایج از ۲۰ شنبهٔ تابستانی در یک بازار است. میانگین حدود ۶۰ شیشهٔ ما ممکن است حدود ۲ تا خطا داشته باشد. بازدیدکننده‌ها با دست شمرده شدند، پس شاید بعضی جا مانده باشند. هنوز نمی‌دانیم مزه‌کردن در زمستان جواب می‌دهد یا نه؛ تا دسامبر بررسی را ادامه می‌دهیم.»</em></p>',
      ),
      recap(
        W('Say who and when, and how sure (with a number).', 'قل من ومتى، وكم أنت متأكد (برقم).', 'بگو چه کسی و کی، و چقدر مطمئنی (با یک عدد).'),
        W('More data shrinks random error; better data shrinks bias.', 'البيانات الأكثر تقلّص الخطأ العشوائي؛ والأفضل تقلّص التحيز.', 'دادهٔ بیشتر خطای تصادفی را کم می‌کند؛ دادهٔ بهتر سوگیری را.'),
      ),
      exercise('w08-q010'),
    ],
  },
]
