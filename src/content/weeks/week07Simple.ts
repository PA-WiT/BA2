// Sections 5-7 of Week 7 (week-07.ts places them), rewritten simpler and on the jam stand only: the jam taster
// (p-value), "56 jars a Saturday" on the real CSV (z-test) and the new recipe's spending (your turn). Each one has a
// plain-language box for the symbols (H₀, Hₐ, p, α, μ, x̄, σ, n, z, z-critical). Every number was computed by script
// (scipy) and the Excel formulas were recalculated in LibreOffice.
// ar/fa are draft translations awaiting native review, like the rest of the week. Code and formulas stay English.
import type { Block, Localized, Question, Week } from '../types'
import { py, xl } from './week07Code'

const t = (en: string, ar: string, fa: string): Localized => ({ en, ar, fa })
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
const fromDeck = (en: string, ar: string, fa: string) => t(`From the original lesson. ${en}`, `من الدرس الأصلي. ${ar}`, `از درس اصلی. ${fa}`)
const tools = (excel: Block[], python: Block[]): Block => ({
  type: 'tabs',
  tabs: [
    { label: t('Excel', 'Excel', 'Excel'), blocks: excel },
    { label: t('Python (Colab)', 'Python ‏(Colab)', 'Python ‏(Colab)'), blocks: python },
  ],
})
const plainWords = t('Words in this section, in plain language', 'كلمات هذا القسم بلغة بسيطة', 'واژه‌های این بخش، به زبان ساده')

export const sections: Week['sections'] = [
  {
    id: 'p-value',
    navLabel: t('The p-value', 'قيمة p', 'مقدار p'),
    sectionLabel: t('Section 05', 'القسم ٠٥', 'بخش ۰۵'),
    timeEst: t('8 min', '٨ دقائق', '۸ دقیقه'),
    headingHtml: t(
      '<h2>The p-value: could plain luck do this?</h2><p class="standfirst">Before you trust a result, ask one question: could plain luck give a result like this? The p-value answers with one number. A small p means luck alone would rarely do it.</p>',
      '<h2>قيمة p: هل يمكن للحظ وحده أن يفعل هذا؟</h2><p class="standfirst">قبل أن تثق بنتيجة اسأل سؤالًا واحدًا: هل يمكن للحظ وحده أن يعطي نتيجة كهذه؟ تجيب قيمة p برقم واحد. وp الصغيرة تعني أن الحظ وحده نادرًا ما يفعل ذلك.</p>',
      '<h2>مقدار p: آیا شانس تنها می‌تواند این کار را بکند؟</h2><p class="standfirst">پیش از اینکه به نتیجه‌ای اعتماد کنی یک سؤال بپرس: آیا شانس تنها می‌تواند چنین نتیجه‌ای بدهد؟ مقدار p با یک عدد جواب می‌دهد. p کوچک یعنی شانس تنها به‌ندرت چنین کاری می‌کند.</p>',
    ),
    blocks: [
      analogy(
        '<p><strong>The jam taster.</strong> A friend at the stand says: "I can taste which jam is homemade and which is from the shop." You cover their eyes and give them 10 pairs. Someone who is only guessing gets about 5 right. Your friend gets <strong>9 right</strong>. Could a guesser do that? Yes, but rarely: about <strong>1 time in 100</strong>. That "1 in 100" is the p-value.</p>',
        '<p><strong>متذوّق المربى.</strong> يقول صديق عند الكشك: "أستطيع أن أعرف بالتذوق أي مربى منزلي وأيها من المتجر." تغطي عينيه وتعطيه 10 أزواج. من يخمّن فقط يصيب نحو 5. صديقك يصيب <strong>9</strong>. هل يستطيع مخمّن فعل ذلك؟ نعم، لكن نادرًا: نحو <strong>مرة واحدة من كل 100</strong>. هذه "المرة من 100" هي قيمة p.</p>',
        '<p><strong>مزه‌شناس مربا.</strong> دوستی کنار غرفه می‌گوید: «با چشیدن می‌فهمم کدام مربا خانگی است و کدام از مغازه.» چشم‌هایش را می‌بندی و ۱۰ جفت به او می‌دهی. کسی که فقط حدس می‌زند حدود ۵ تا را درست می‌گوید. دوستت <strong>۹ تا</strong> را درست می‌گوید. آیا کسی که حدس می‌زند می‌تواند این کار را بکند؟ بله، اما به‌ندرت: حدود <strong>۱ بار در ۱۰۰</strong>. همین «۱ در ۱۰۰» مقدار p است.</p>',
      ),
      box(
        'keypoint',
        plainWords,
        '<ul><li><strong>H₀ ("H-zero", the null hypothesis):</strong> the boring story, "nothing special is going on". For the taster: <em>"they are only guessing"</em>. We believe it until the data says otherwise, like "innocent until proven guilty".</li><li><strong>Hₐ ("H-a", the alternative):</strong> the story you suspect: <em>"they really can taste the difference"</em>.</li><li><strong>p-value (p):</strong> if H₀ were true, how often would luck alone give a result like ours, or an even stronger one? p = 0.01 means 1 time in 100.</li><li><strong>α ("alpha"):</strong> the line you draw <em>before</em> you look, usually 0.05 (1 time in 20). Rarer than that, and we stop blaming luck.</li><li><strong>Reject H₀:</strong> p is below α, so we drop the boring story.</li><li><strong>Fail to reject H₀:</strong> p is not below α, so there is not enough evidence. This does not prove H₀: "not guilty" is not the same as "innocent".</li></ul>',
        '<ul><li><strong>H₀ ("إتش صفر"، الفرضية الصفرية):</strong> القصة المملة: "لا شيء مميز يحدث". للمتذوّق: <em>"إنه يخمّن فقط"</em>. نصدّقها حتى تقول البيانات غير ذلك، مثل "بريء حتى تثبت إدانته".</li><li><strong>Hₐ ("إتش إيه"، البديلة):</strong> القصة التي تشك فيها: <em>"إنه يميّز الفرق فعلًا"</em>.</li><li><strong>قيمة p:</strong> لو كانت H₀ صحيحة، كم مرة يعطي الحظ وحده نتيجة مثل نتيجتنا أو أقوى؟ p = 0.01 تعني مرة واحدة من كل 100.</li><li><strong>α ("ألفا"):</strong> الخط الذي ترسمه <em>قبل</em> أن تنظر، عادةً 0.05 (مرة من كل 20). وإذا كانت النتيجة أندر من ذلك نتوقف عن لوم الحظ.</li><li><strong>رفض H₀:</strong> p أقل من α، فنترك القصة المملة.</li><li><strong>عدم رفض H₀:</strong> p ليست أقل من α، فلا توجد أدلة كافية. وهذا لا يثبت H₀: "غير مذنب" ليست مثل "بريء".</li></ul>',
        '<ul><li><strong>H₀ («اچ صفر»، فرض صفر):</strong> داستان بی‌هیجان: «هیچ اتفاق خاصی نمی‌افتد». برای مزه‌شناس: <em>«فقط حدس می‌زند»</em>. آن را باور داریم تا داده خلافش را بگوید، مثل «بی‌گناه تا وقتی گناهش ثابت شود».</li><li><strong>Hₐ («اچ اِی»، فرض مقابل):</strong> داستانی که به آن گمان داری: <em>«واقعاً تفاوت را می‌چشد»</em>.</li><li><strong>مقدار p:</strong> اگر H₀ درست بود، شانس تنها چند وقت یک بار نتیجه‌ای مثل نتیجهٔ ما یا قوی‌تر می‌داد؟ p = ۰٫۰۱ یعنی ۱ بار در ۱۰۰.</li><li><strong>α («آلفا»):</strong> خطی که <em>پیش</em> از نگاه کردن می‌کشی، معمولاً ۰٫۰۵ (۱ بار در ۲۰). نادرتر از آن باشد، دیگر شانس را مقصر نمی‌دانیم.</li><li><strong>رد H₀:</strong> p کمتر از α است، پس داستان بی‌هیجان را کنار می‌گذاریم.</li><li><strong>رد نکردن H₀:</strong> p کمتر از α نیست، پس شواهد کافی نیست. این H₀ را ثابت نمی‌کند: «مجرم نیست» با «بی‌گناه است» یکی نیست.</li></ul>',
      ),
      box(
        'example',
        t('The jam taster in numbers', 'متذوّق المربى بالأرقام', 'مزه‌شناس مربا با عدد'),
        '<p><strong>H₀:</strong> only guessing. <strong>Hₐ:</strong> can really taste it. <strong>α = 0.05.</strong></p><p>A guesser gets 9 or 10 right out of 10 in only 11 of the 1,024 possible ways: <strong>p = 0.0107</strong>, about 1 time in 100. That is below 0.05, so we <strong>reject H₀</strong>: your friend is probably not just guessing.</p><p>Now say they got <strong>6 right</strong>. A guesser gets 6 or more right <strong>p = 0.377</strong> of the time, more than 1 time in 3. That is ordinary luck, so we <strong>fail to reject H₀</strong>: no proof of a special talent.</p>',
        '<p><strong>H₀:</strong> يخمّن فقط. <strong>Hₐ:</strong> يميّز الطعم فعلًا. <strong>α = 0.05.</strong></p><p>يصيب المخمّن 9 أو 10 من 10 في 11 طريقة فقط من 1,024 طريقة ممكنة: <strong>p = 0.0107</strong>، أي نحو مرة من كل 100. هذا أقل من 0.05، فـ <strong>نرفض H₀</strong>: صديقك على الأرجح لا يخمّن فقط.</p><p>لنفترض الآن أنه أصاب <strong>6</strong>. يصيب المخمّن 6 أو أكثر في <strong>p = 0.377</strong> من المرات، أي أكثر من مرة من كل 3. هذا حظ عادي، فـ <strong>لا نرفض H₀</strong>: لا دليل على موهبة خاصة.</p>',
        '<p><strong>H₀:</strong> فقط حدس می‌زند. <strong>Hₐ:</strong> واقعاً مزه را تشخیص می‌دهد. <strong>α = ۰٫۰۵.</strong></p><p>کسی که حدس می‌زند فقط در ۱۱ حالت از ۱٬۰۲۴ حالت ممکن ۹ یا ۱۰ تا از ۱۰ را درست می‌گوید: <strong>p = ۰٫۰۱۰۷</strong>، حدود ۱ بار در ۱۰۰. این کمتر از ۰٫۰۵ است، پس <strong>H₀ را رد می‌کنیم</strong>: دوستت احتمالاً فقط حدس نمی‌زند.</p><p>حالا فرض کن <strong>۶ تا</strong> را درست گفته بود. کسی که حدس می‌زند در <strong>p = ۰٫۳۷۷</strong> مواقع ۶ تا یا بیشتر را درست می‌گوید، بیش از ۱ بار در ۳. این شانس معمولی است، پس <strong>H₀ رد نمی‌شود</strong>: دلیلی بر استعداد خاص نیست.</p>',
      ),
      tools(
        [
          code(`=1 - BINOM.DIST(8, 10, 0.5, TRUE)    → 0.0107  (9 or more right out of 10, by pure guessing)
=1 - BINOM.DIST(5, 10, 0.5, TRUE)    → 0.377   (6 or more right: happens all the time)`),
        ],
        [code(py.taster)],
      ),
      {
        type: 'table',
        headers: [t('p-value', 'قيمة p', 'مقدار p'), t('How often luck alone does it', 'كم مرة يفعلها الحظ وحده', 'شانس تنها چند وقت یک بار این کار را می‌کند'), t('How surprised to be', 'كم نتفاجأ', 'چقدر غافلگیر شویم')],
        rows: [
          [t('0.50', '0.50', '۰٫۵۰'), t('1 time in 2', 'مرة من كل 2', '۱ بار در ۲'), t('Not at all: it happens all the time', 'إطلاقًا: يحدث دائمًا', 'اصلاً: همیشه پیش می‌آید')],
          [t('0.20', '0.20', '۰٫۲۰'), t('1 time in 5', 'مرة من كل 5', '۱ بار در ۵'), t('Not really: still ordinary luck', 'ليس حقًا: ما زال حظًا عاديًا', 'نه چندان: هنوز شانس معمولی است')],
          [t('<strong>0.05</strong>', '<strong>0.05</strong>', '<strong>۰٫۰۵</strong>'), t('1 time in 20', 'مرة من كل 20', '۱ بار در ۲۰'), t('<strong>The usual line (α)</strong>', '<strong>الخط المعتاد (α)</strong>', '<strong>خط معمول (α)</strong>')],
          [t('0.01', '0.01', '۰٫۰۱'), t('1 time in 100', 'مرة من كل 100', '۱ بار در ۱۰۰'), t('Quite surprised: probably not luck', 'متفاجئ جدًا: على الأرجح ليس حظًا', 'خیلی غافلگیر: احتمالاً شانس نیست')],
          [t('0.001', '0.001', '۰٫۰۰۱'), t('1 time in 1,000', 'مرة من كل 1,000', '۱ بار در ۱٬۰۰۰'), t('Very surprised', 'متفاجئ جدًا جدًا', 'بسیار غافلگیر')],
        ],
      },
      box(
        'keypoint',
        t('The rule', 'القاعدة', 'قاعده'),
        '<p><strong>p below α → reject H₀</strong>: too rare to be just luck.<br/><strong>p not below α → fail to reject H₀</strong>: it could easily be luck.</p><p>Two things p does <em>not</em> tell you: it is not the chance that H₀ is true, and it does not say how <em>big</em> the effect is. "Rare" is not the same as "big".</p>',
        '<p><strong>p أقل من α ← ارفض H₀</strong>: أندر من أن يكون مجرد حظ.<br/><strong>p ليست أقل من α ← لا ترفض H₀</strong>: قد يكون حظًا بسهولة.</p><p>شيئان <em>لا</em> تخبرك بهما p: ليست احتمال أن تكون H₀ صحيحة، ولا تقول كم هو <em>كبير</em> الأثر. "نادر" ليست مثل "كبير".</p>',
        '<p><strong>p کمتر از α ← H₀ را رد کن</strong>: نادرتر از آن است که فقط شانس باشد.<br/><strong>p کمتر از α نیست ← H₀ رد نمی‌شود</strong>: به‌راحتی ممکن است شانس باشد.</p><p>دو چیزی که p به تو <em>نمی‌گوید</em>: احتمال درستی H₀ نیست، و نمی‌گوید اثر چقدر <em>بزرگ</em> است. «نادر» با «بزرگ» یکی نیست.</p>',
      ),
      recap(
        t('p-value = how often luck alone would give a result like yours.', 'قيمة p = كم مرة يعطي الحظ وحده نتيجة مثل نتيجتك.', 'مقدار p = اینکه شانس تنها چند وقت یک بار نتیجه‌ای مثل نتیجهٔ تو می‌دهد.'),
        t('p below α (0.05): reject H₀. Otherwise: not enough evidence.', 'p أقل من α ‏(0.05): ارفض H₀. وإلا: لا أدلة كافية.', 'p کمتر از α ‏(۰٫۰۵): H₀ را رد کن. وگرنه: شواهد کافی نیست.'),
        t('Small p says "rare", not "big" or "important".', 'p الصغيرة تقول "نادر"، لا "كبير" أو "مهم".', 'p کوچک می‌گوید «نادر»، نه «بزرگ» یا «مهم».'),
      ),
      exercise('w07-q007'),
      exercise('w07-q013'),
    ],
  },
  {
    id: 'z-test',
    navLabel: t('The z-test', 'اختبار z', 'آزمون z'),
    sectionLabel: t('Section 06', 'القسم ٠٦', 'بخش ۰۶'),
    timeEst: t('10 min', '١٠ دقائق', '۱۰ دقیقه'),
    headingHtml: t(
      '<h2>The z-test: is our average really above the claim?</h2><p class="standfirst">To get a p-value for an average, we first need one number for "how far off are we?". That number is z: how far our average is from the claim, counted in normal wobbles.</p>',
      '<h2>اختبار z: هل متوسطنا أعلى من الادعاء فعلًا؟</h2><p class="standfirst">لنحصل على قيمة p لمتوسط، نحتاج أولًا رقمًا واحدًا يقول "كم نبتعد؟". هذا الرقم هو z: بُعد متوسطنا عن الادعاء، محسوبًا بعدد التذبذبات العادية.</p>',
      '<h2>آزمون z: آیا میانگین ما واقعاً بالای ادعاست؟</h2><p class="standfirst">برای گرفتن مقدار p برای یک میانگین، اول یک عدد لازم داریم که بگوید «چقدر دوریم؟». آن عدد z است: اینکه میانگین ما چقدر از ادعا دور است، با شمارش نوسان‌های معمولی.</p>',
    ),
    blocks: [
      html(
        '<p><strong>The story:</strong> the previous owner sold the stand saying, "It sells <strong>56 jars a Saturday</strong>." Their records show that one Saturday usually differs from another by about <strong>10 jars</strong>. Our 20 Saturdays in <a href="/data/jam-tasting.csv" download>jam-tasting.csv</a> averaged <strong>60.15 jars</strong>. Do we really sell more now, or is 60.15 just a lucky run?</p>',
        '<p><strong>القصة:</strong> باع المالك السابق الكشك قائلًا: "يبيع <strong>56 برطمانًا كل سبت</strong>." وتُظهر سجلاته أن السبت يختلف عادةً عن غيره بنحو <strong>10 برطمانات</strong>. متوسط أيام السبت العشرين لدينا في <a href="/data/jam-tasting.csv" download>jam-tasting.csv</a> هو <strong>60.15 برطمانًا</strong>. هل نبيع أكثر الآن فعلًا، أم أن 60.15 مجرد سلسلة محظوظة؟</p>',
        '<p><strong>داستان:</strong> صاحب قبلی غرفه را فروخت و گفت: «هر شنبه <strong>۵۶ شیشه</strong> می‌فروشد.» دفترهایش نشان می‌دهد هر شنبه معمولاً حدود <strong>۱۰ شیشه</strong> با شنبهٔ دیگر فرق دارد. میانگین ۲۰ شنبهٔ ما در <a href="/data/jam-tasting.csv" download>jam-tasting.csv</a> برابر <strong>۶۰٫۱۵ شیشه</strong> است. آیا الان واقعاً بیشتر می‌فروشیم، یا ۶۰٫۱۵ فقط یک دورهٔ خوش‌شانس است؟</p>',
      ),
      box(
        'keypoint',
        plainWords,
        '<ul><li><strong>μ ("mu"):</strong> the claimed average: <strong>56</strong> jars.</li><li><strong>x̄ ("x-bar"):</strong> our own average: <strong>60.15</strong> jars.</li><li><strong>σ ("sigma"):</strong> how much one Saturday usually varies: <strong>10</strong> jars.</li><li><strong>n:</strong> how many we measured: <strong>20</strong> Saturdays.</li><li><strong>σ / √n:</strong> how much an <em>average</em> of 20 Saturdays usually wobbles: 10 / √20 = <strong>2.24</strong> jars. It is smaller than 10 because good and bad Saturdays cancel out in an average.</li><li><strong>z:</strong> how many wobbles our average is away from the claim: (x̄ − μ) / (σ / √n).</li><li><strong>z-critical:</strong> the 5% line on the z scale. For a "more than" question it is <strong>1.645</strong>.</li></ul>',
        '<ul><li><strong>μ ("ميو"):</strong> المتوسط المُدّعى: <strong>56</strong> برطمانًا.</li><li><strong>x̄ ("إكس بار"):</strong> متوسطنا نحن: <strong>60.15</strong> برطمانًا.</li><li><strong>σ ("سيغما"):</strong> كم يتغيّر السبت الواحد عادةً: <strong>10</strong> برطمانات.</li><li><strong>n:</strong> كم قسنا: <strong>20</strong> سبتًا.</li><li><strong>σ / √n:</strong> كم يتذبذب <em>متوسط</em> 20 سبتًا عادةً: 10 / √20 = <strong>2.24</strong> برطمان. وهو أصغر من 10 لأن أيام السبت الجيدة والسيئة يلغي بعضها بعضًا في المتوسط.</li><li><strong>z:</strong> كم تذبذبًا يبتعد متوسطنا عن الادعاء: (x̄ − μ) / (σ / √n).</li><li><strong>z الحرجة:</strong> خط الـ 5% على مقياس z. ولسؤال "أكثر من" تساوي <strong>1.645</strong>.</li></ul>',
        '<ul><li><strong>μ («میو»):</strong> میانگین ادعاشده: <strong>۵۶</strong> شیشه.</li><li><strong>x̄ («ایکس بار»):</strong> میانگین خود ما: <strong>۶۰٫۱۵</strong> شیشه.</li><li><strong>σ («سیگما»):</strong> اینکه یک شنبه معمولاً چقدر تغییر می‌کند: <strong>۱۰</strong> شیشه.</li><li><strong>n:</strong> چند تا اندازه گرفتیم: <strong>۲۰</strong> شنبه.</li><li><strong>σ / √n:</strong> اینکه <em>میانگین</em> ۲۰ شنبه معمولاً چقدر نوسان دارد: 10 / √20 = <strong>۲٫۲۴</strong> شیشه. از ۱۰ کوچک‌تر است چون شنبه‌های خوب و بد در میانگین همدیگر را خنثی می‌کنند.</li><li><strong>z:</strong> اینکه میانگین ما چند نوسان از ادعا دور است: (x̄ − μ) / (σ / √n).</li><li><strong>z بحرانی:</strong> خط ۵٪ روی مقیاس z. برای پرسش «بیشتر از» برابر <strong>۱٫۶۴۵</strong> است.</li></ul>',
      ),
      figure(
        5,
        t('The z-test formula', 'معادلة اختبار z', 'فرمول آزمون z'),
        '/figures/week-07/deck-04-z-formula.jpg',
        'Graphic from the original lesson: Z Test equals x-bar minus mu, divided by sigma over the square root of n, with a calculator icon and a small rising bar chart.',
        fromDeck(
          'Top: x̄ − μ, how far our average is from the claim (60.15 − 56 = 4.15 jars). Bottom: σ / √n, the normal wobble of an average (2.24 jars).',
          'في الأعلى: x̄ − μ، أي بُعد متوسطنا عن الادعاء (60.15 − 56 = 4.15 برطمان). وفي الأسفل: σ / √n، أي التذبذب العادي للمتوسط (2.24 برطمان).',
          'بالا: x̄ − μ، اینکه میانگین ما چقدر از ادعا دور است (60.15 − 56 = ۴٫۱۵ شیشه). پایین: σ / √n، نوسان معمولی میانگین (۲٫۲۴ شیشه).',
        ),
      ),
      analogy(
        '<p>You are calling a friend across the busy market. What matters is how loud you shout <em>compared with</em> the noise around you. z is that ratio: the gap we found (the shout) divided by the normal wobble (the market noise). Measuring more Saturdays is like a quieter market: the same gap becomes easier to hear.</p>',
        '<p>تنادي صديقًا عبر السوق المزدحم. المهم هو ارتفاع صوتك <em>مقارنةً</em> بالضجيج حولك. وz هي هذه النسبة: الفرق الذي وجدناه (الصوت) مقسومًا على التذبذب العادي (ضجيج السوق). وقياس أيام سبت أكثر مثل سوق أهدأ: يصبح الفرق نفسه أسهل سماعًا.</p>',
        '<p>در بازار شلوغ دوستت را صدا می‌زنی. مهم این است که بلندی صدایت <em>در مقایسه با</em> سروصدای اطراف چقدر است. z همین نسبت است: فاصله‌ای که پیدا کردیم (فریاد) تقسیم بر نوسان معمولی (سروصدای بازار). اندازه گرفتن شنبه‌های بیشتر مثل بازاری ساکت‌تر است: همان فاصله راحت‌تر شنیده می‌شود.</p>',
      ),
      box(
        'example',
        t('Step by step: 56 jars a Saturday?', 'خطوة بخطوة: 56 برطمانًا كل سبت؟', 'گام‌به‌گام: ۵۶ شیشه در هر شنبه؟'),
        '<ol><li><strong>Two stories:</strong> H₀: we still sell 56 jars or fewer (μ ≤ 56). Hₐ: we sell more (μ &gt; 56). "More" means right-tailed.</li><li><strong>The line:</strong> α = 0.05, chosen before looking.</li><li><strong>The wobble:</strong> 10 / √20 = 2.24 jars.</li><li><strong>z:</strong> (60.15 − 56) / 2.24 = 4.15 / 2.24 = <strong>1.86</strong>. Our average is almost 2 wobbles above the claim.</li><li><strong>p-value:</strong> the area to the right of 1.86 is <strong>0.032</strong>: luck alone would give this about 3 times in 100.</li><li><strong>Decide:</strong> 0.032 is below 0.05 (and 1.86 is past the 1.645 line), so <strong>reject H₀</strong>.</li></ol><p><strong>In one sentence:</strong> we sell more than the old 56 jars a Saturday; a gap this big would come from luck only about 3 times in 100.</p>',
        '<ol><li><strong>القصتان:</strong> H₀: ما زلنا نبيع 56 برطمانًا أو أقل (μ ≤ 56). Hₐ: نبيع أكثر (μ &gt; 56). "أكثر" تعني ذيلًا أيمن.</li><li><strong>الخط:</strong> α = 0.05، اخترناه قبل النظر.</li><li><strong>التذبذب:</strong> 10 / √20 = 2.24 برطمان.</li><li><strong>z:</strong> (60.15 − 56) / 2.24 = 4.15 / 2.24 = <strong>1.86</strong>. متوسطنا أعلى من الادعاء بنحو تذبذبين.</li><li><strong>قيمة p:</strong> المساحة يمين 1.86 هي <strong>0.032</strong>: يعطي الحظ وحده هذا نحو 3 مرات من كل 100.</li><li><strong>القرار:</strong> 0.032 أقل من 0.05 (و1.86 تتجاوز خط 1.645)، فـ <strong>نرفض H₀</strong>.</li></ol><p><strong>في جملة واحدة:</strong> نبيع أكثر من الـ 56 برطمانًا القديمة كل سبت؛ وفرق بهذا الحجم لا يأتي من الحظ إلا نحو 3 مرات من كل 100.</p>',
        '<ol><li><strong>دو داستان:</strong> H₀: هنوز ۵۶ شیشه یا کمتر می‌فروشیم (μ ≤ 56). Hₐ: بیشتر می‌فروشیم (μ &gt; 56). «بیشتر» یعنی دنبالهٔ راست.</li><li><strong>خط:</strong> α = ۰٫۰۵، پیش از نگاه کردن انتخاب شده.</li><li><strong>نوسان:</strong> 10 / √20 = ۲٫۲۴ شیشه.</li><li><strong>z:</strong> (60.15 − 56) / 2.24 = 4.15 / 2.24 = <strong>۱٫۸۶</strong>. میانگین ما تقریباً ۲ نوسان بالای ادعاست.</li><li><strong>مقدار p:</strong> مساحت سمت راست ۱٫۸۶ برابر <strong>۰٫۰۳۲</strong> است: شانس تنها حدود ۳ بار در ۱۰۰ این را می‌دهد.</li><li><strong>تصمیم:</strong> ۰٫۰۳۲ کمتر از ۰٫۰۵ است (و ۱٫۸۶ از خط ۱٫۶۴۵ گذشته)، پس <strong>H₀ را رد می‌کنیم</strong>.</li></ol><p><strong>در یک جمله:</strong> هر شنبه بیشتر از همان ۵۶ شیشهٔ قدیمی می‌فروشیم؛ فاصله‌ای به این بزرگی فقط حدود ۳ بار در ۱۰۰ از شانس می‌آید.</p>',
      ),
      figure(
        6,
        t('Our Saturdays are past the 5% line', 'أيام السبت لدينا تتجاوز خط الـ 5%', 'شنبه‌های ما از خط ۵٪ گذشته‌اند'),
        '/figures/week-07/diagram-03.svg',
        'A bell curve of the Saturday averages we would expect if the stand still sold 56 jars a Saturday. A dashed red line at z = 1.645 marks the 5 percent line. Our result, z = 1.86, is past it, and the small orange tail beyond it is the p-value, 0.03.',
        t(
          'The curve shows what luck alone would give if nothing had changed (H₀). The orange tail beyond our z = 1.86 is the p-value, 0.032. It lies past the dashed 5% line, so we reject H₀.',
          'يُظهر المنحنى ما يعطيه الحظ وحده لو لم يتغيّر شيء (H₀). والذيل البرتقالي بعد z = 1.86 هو قيمة p، أي 0.032. وهو يقع بعد خط الـ 5% المتقطع، فنرفض H₀.',
          'منحنی نشان می‌دهد شانس تنها، اگر هیچ چیز عوض نشده بود (H₀)، چه می‌داد. دنبالهٔ نارنجی پس از z = ۱٫۸۶ مقدار p است، ۰٫۰۳۲. این دنباله آن‌سوی خط‌چین ۵٪ است، پس H₀ را رد می‌کنیم.',
        ),
      ),
      tools(
        [
          code(xl.jarsZ),
          html(
            '<p><code>NORM.S.DIST(z, TRUE)</code> gives the area to the <em>left</em> of z, so 1 minus it is the area to the right: the p-value for a "more than" question. <code>NORM.S.INV(0.95)</code> gives the 5% line. Excel replaces the paper z table.</p>',
            '<p>تعطي <code>NORM.S.DIST(z, TRUE)</code> المساحة <em>يسار</em> z، فيكون 1 ناقصها هو المساحة يمينها: قيمة p لسؤال "أكثر من". وتعطي <code>NORM.S.INV(0.95)</code> خط الـ 5%. ويحل Excel محل جدول z الورقي.</p>',
            '<p><code>NORM.S.DIST(z, TRUE)</code> مساحت سمت <em>چپ</em> z را می‌دهد، پس ۱ منهای آن مساحت سمت راست است: مقدار p برای پرسش «بیشتر از». <code>NORM.S.INV(0.95)</code> خط ۵٪ را می‌دهد. Excel جای جدول کاغذی z را می‌گیرد.</p>',
          ),
        ],
        [code(py.jarsZ)],
      ),
      box(
        'keypoint',
        t('When can you use the z-test?', 'متى تستخدم اختبار z؟', 'کی می‌توانی از آزمون z استفاده کنی؟'),
        '<ul><li>You compare <strong>one</strong> average with a claimed number (here: 56 jars).</li><li>You already know the usual spread σ (here: 10 jars, from the old records).</li><li>You have about 30 or more values, or the values are roughly bell-shaped. We have only 20 Saturdays, so we rely on Saturday sales being roughly bell-shaped, with no wild outliers.</li></ul>',
        '<ul><li>تقارن متوسطًا <strong>واحدًا</strong> برقم مُدّعى (هنا: 56 برطمانًا).</li><li>تعرف مسبقًا التشتت المعتاد σ (هنا: 10 برطمانات من السجلات القديمة).</li><li>لديك نحو 30 قيمة أو أكثر، أو القيم تقريبًا على شكل جرس. لدينا 20 سبتًا فقط، فنعتمد على أن مبيعات السبت تقريبًا على شكل جرس، بلا قيم شاذة كبيرة.</li></ul>',
        '<ul><li><strong>یک</strong> میانگین را با یک عدد ادعاشده مقایسه می‌کنی (اینجا: ۵۶ شیشه).</li><li>پراکندگی معمول σ را از قبل می‌دانی (اینجا: ۱۰ شیشه، از دفترهای قدیمی).</li><li>حدود ۳۰ مقدار یا بیشتر داری، یا مقدارها تقریباً زنگوله‌ای‌اند. ما فقط ۲۰ شنبه داریم، پس به این تکیه می‌کنیم که فروش شنبه‌ها تقریباً زنگوله‌ای است و دادهٔ پرت بزرگی ندارد.</li></ul>',
      ),
      recap(
        t('z = (our average − the claim) / the normal wobble.', 'z = (متوسطنا − الادعاء) / التذبذب العادي.', 'z = (میانگین ما − ادعا) / نوسان معمولی.'),
        t('The wobble of an average, σ / √n, shrinks as you measure more.', 'تذبذب المتوسط، σ / √n، يصغر كلما قست أكثر.', 'نوسان میانگین، σ / √n، با اندازه گرفتن بیشتر کوچک‌تر می‌شود.'),
        t('Past the 1.645 line (p below 0.05): reject H₀.', 'بعد خط 1.645 ‏(p أقل من 0.05): ارفض H₀.', 'آن‌سوی خط ۱٫۶۴۵ ‏(p کمتر از ۰٫۰۵): H₀ را رد کن.'),
      ),
      exercise('w07-q009'),
      exercise('w07-q014'),
    ],
  },
  {
    id: 'your-turn',
    navLabel: t('Your turn', 'دورك', 'نوبت تو'),
    sectionLabel: t('Section 07', 'القسم ٠٧', 'بخش ۰۷'),
    timeEst: t('10 min', '١٠ دقائق', '۱۰ دقیقه'),
    headingHtml: t(
      '<h2>Your turn: did the new recipe make buyers spend more?</h2><p class="standfirst">Same steps, new question. Try it on paper first, then compare with the answer below.</p>',
      '<h2>دورك: هل جعلت الوصفة الجديدة المشترين ينفقون أكثر؟</h2><p class="standfirst">الخطوات نفسها، وسؤال جديد. جرّبه على الورق أولًا، ثم قارن بالإجابة أدناه.</p>',
      '<h2>نوبت تو: آیا دستور پخت تازه باعث شد خریداران بیشتر خرج کنند؟</h2><p class="standfirst">همان گام‌ها، پرسشی تازه. اول روی کاغذ امتحان کن، بعد با جواب پایین مقایسه کن.</p>',
    ),
    blocks: [
      html(
        '<p><strong>The problem:</strong> before the new strawberry recipe, a buyer spent <strong>€12</strong> on average, and one receipt usually differed from another by about <strong>€4</strong> (σ). After the new recipe, the owner checks <strong>64 receipts</strong>: they average <strong>€13.20</strong>. With α = 0.05, is there enough evidence that buyers now spend <em>more</em>?</p>',
        '<p><strong>المسألة:</strong> قبل وصفة الفراولة الجديدة كان المشتري ينفق <strong>12 يورو</strong> في المتوسط، وكانت الفاتورة تختلف عادةً عن غيرها بنحو <strong>4 يورو</strong> (σ). بعد الوصفة الجديدة يراجع المالك <strong>64 فاتورة</strong>: متوسطها <strong>13.20 يورو</strong>. مع α = 0.05، هل توجد أدلة كافية على أن المشترين ينفقون الآن <em>أكثر</em>؟</p>',
        '<p><strong>مسئله:</strong> پیش از دستور پخت تازهٔ مربای توت‌فرنگی، هر خریدار به‌طور میانگین <strong>۱۲ یورو</strong> خرج می‌کرد و هر رسید معمولاً حدود <strong>۴ یورو</strong> (σ) با رسید دیگر فرق داشت. پس از دستور تازه، صاحب غرفه <strong>۶۴ رسید</strong> را بررسی می‌کند: میانگینشان <strong>۱۳٫۲۰ یورو</strong> است. با α = ۰٫۰۵، آیا شواهد کافی هست که خریداران حالا <em>بیشتر</em> خرج می‌کنند؟</p>',
      ),
      analogy(
        '<p>A kitchen scale always jiggles a little. If the needle moves by a few grams, that is just the jiggle. If it moves far past the jiggle, something really was added. z tells you how far past the jiggle you are, and 1.645 is the point where we say "that is more than jiggle".</p>',
        '<p>ميزان المطبخ يهتز قليلًا دائمًا. إذا تحرك المؤشر بضعة غرامات فهذا مجرد اهتزاز. وإذا تحرك بعيدًا بعد الاهتزاز فقد أُضيف شيء فعلًا. تخبرك z كم تجاوزت الاهتزاز، و1.645 هي النقطة التي نقول عندها "هذا أكثر من اهتزاز".</p>',
        '<p>ترازوی آشپزخانه همیشه کمی می‌لرزد. اگر عقربه چند گرم جابه‌جا شود، فقط همان لرزش است. اگر خیلی بیشتر از لرزش جابه‌جا شود، واقعاً چیزی اضافه شده. z می‌گوید چقدر از لرزش گذشته‌ای، و ۱٫۶۴۵ نقطه‌ای است که می‌گوییم «این بیشتر از لرزش است».</p>',
      ),
      html(
        '<p><strong>Your steps:</strong> 1. write H₀ and Hₐ; 2. find the wobble σ / √n; 3. find z; 4. compare z with 1.645 (or p with 0.05); 5. write one plain sentence. Try it before you open the answer.</p>',
        '<p><strong>خطواتك:</strong> 1. اكتب H₀ وHₐ؛ 2. جد التذبذب σ / √n؛ 3. جد z؛ 4. قارن z بـ 1.645 (أو p بـ 0.05)؛ 5. اكتب جملة بسيطة واحدة. جرّب قبل أن تنظر إلى الإجابة.</p>',
        '<p><strong>گام‌های تو:</strong> ۱. H₀ و Hₐ را بنویس؛ ۲. نوسان σ / √n را پیدا کن؛ ۳. z را پیدا کن؛ ۴. z را با ۱٫۶۴۵ مقایسه کن (یا p را با ۰٫۰۵)؛ ۵. یک جملهٔ ساده بنویس. پیش از دیدن جواب امتحان کن.</p>',
      ),
      box(
        'example',
        t('The answer', 'الإجابة', 'جواب'),
        '<ol><li><strong>Two stories:</strong> H₀: μ ≤ €12 (the recipe changed nothing). Hₐ: μ &gt; €12 (buyers spend more). "More" means right-tailed.</li><li><strong>The wobble:</strong> 4 / √64 = 4 / 8 = <strong>€0.50</strong>.</li><li><strong>z:</strong> (13.20 − 12) / 0.50 = 1.20 / 0.50 = <strong>2.4</strong>.</li><li><strong>Decide:</strong> 2.4 is past the 1.645 line, so <strong>reject H₀</strong>. The p-value agrees: <strong>p = 0.0082</strong>, below 0.05.</li></ol><p><strong>In one sentence:</strong> buyers spend more since the new recipe, about €1.20 more each; luck alone would give a jump this big less than 1 time in 100.</p>',
        '<ol><li><strong>القصتان:</strong> H₀: μ ≤ 12 يورو (لم تغيّر الوصفة شيئًا). Hₐ: μ &gt; 12 يورو (ينفق المشترون أكثر). "أكثر" تعني ذيلًا أيمن.</li><li><strong>التذبذب:</strong> 4 / √64 = 4 / 8 = <strong>0.50 يورو</strong>.</li><li><strong>z:</strong> (13.20 − 12) / 0.50 = 1.20 / 0.50 = <strong>2.4</strong>.</li><li><strong>القرار:</strong> 2.4 تتجاوز خط 1.645، فـ <strong>نرفض H₀</strong>. وقيمة p توافق: <strong>p = 0.0082</strong>، أقل من 0.05.</li></ol><p><strong>في جملة واحدة:</strong> ينفق المشترون أكثر منذ الوصفة الجديدة، نحو 1.20 يورو أكثر لكل منهم؛ ولا يعطي الحظ وحده قفزة بهذا الحجم إلا أقل من مرة من كل 100.</p>',
        '<ol><li><strong>دو داستان:</strong> H₀: μ ≤ ۱۲ یورو (دستور تازه چیزی را عوض نکرد). Hₐ: μ &gt; ۱۲ یورو (خریداران بیشتر خرج می‌کنند). «بیشتر» یعنی دنبالهٔ راست.</li><li><strong>نوسان:</strong> 4 / √64 = 4 / 8 = <strong>۰٫۵۰ یورو</strong>.</li><li><strong>z:</strong> (13.20 − 12) / 0.50 = 1.20 / 0.50 = <strong>۲٫۴</strong>.</li><li><strong>تصمیم:</strong> ۲٫۴ از خط ۱٫۶۴۵ گذشته، پس <strong>H₀ را رد می‌کنیم</strong>. مقدار p هم موافق است: <strong>p = ۰٫۰۰۸۲</strong>، کمتر از ۰٫۰۵.</li></ol><p><strong>در یک جمله:</strong> از زمان دستور پخت تازه خریداران بیشتر خرج می‌کنند، هر نفر حدود ۱٫۲۰ یورو بیشتر؛ شانس تنها کمتر از ۱ بار در ۱۰۰ چنین جهشی می‌دهد.</p>',
      ),
      figure(
        7,
        t('Where the 1.645 line comes from', 'من أين يأتي خط 1.645', 'خط ۱٫۶۴۵ از کجا می‌آید'),
        '/figures/week-07/deck-05-ztable-1645.jpg',
        'The z table from the original lesson with row 1.6 and column 0.04 outlined in red, meeting at 0.9495, next to 0.9505 in the 0.05 column.',
        fromDeck(
          'The 5% line leaves 95% of the curve on its left. In the z table, 0.95 sits between 0.9495 (z = 1.64) and 0.9505 (z = 1.65), so the line is halfway: 1.645. In Excel: =NORM.S.INV(0.95).',
          'يترك خط الـ 5% نسبة 95% من المنحنى على يساره. في جدول z تقع 0.95 بين 0.9495 (z = 1.64) و0.9505 (z = 1.65)، فيكون الخط في المنتصف: 1.645. وفي Excel: ‏=NORM.S.INV(0.95).',
          'خط ۵٪ ۹۵٪ منحنی را سمت چپش می‌گذارد. در جدول z، ۰٫۹۵ بین ۰٫۹۴۹۵ (z = ۱٫۶۴) و ۰٫۹۵۰۵ (z = ۱٫۶۵) است، پس خط وسط است: ۱٫۶۴۵. در Excel: ‏=NORM.S.INV(0.95).',
        ),
      ),
      tools([code(xl.yourTurn)], [code(py.yourTurn)]),
      box(
        'keypoint',
        t('Two ways to decide, one answer', 'طريقتان للقرار وإجابة واحدة', 'دو راه تصمیم، یک جواب'),
        '<p>Compare <strong>z with the line</strong> (2.4 is past 1.645), or compare <strong>p with α</strong> (0.0082 is below 0.05). Both always give the same answer, so use whichever is easier.</p>',
        '<p>قارن <strong>z بالخط</strong> (2.4 تتجاوز 1.645)، أو قارن <strong>p بـ α</strong> (0.0082 أقل من 0.05). الطريقتان تعطيان دائمًا الإجابة نفسها، فاستخدم الأسهل.</p>',
        '<p><strong>z را با خط</strong> مقایسه کن (۲٫۴ از ۱٫۶۴۵ گذشته)، یا <strong>p را با α</strong> (۰٫۰۰۸۲ کمتر از ۰٫۰۵ است). هر دو همیشه یک جواب می‌دهند، پس هر کدام ساده‌تر است را به کار ببر.</p>',
      ),
      recap(
        t('Five steps: two stories, wobble, z, decide, one sentence.', 'خمس خطوات: قصتان، التذبذب، z، القرار، جملة واحدة.', 'پنج گام: دو داستان، نوسان، z، تصمیم، یک جمله.'),
        t('Say the size too: "about €1.20 more each".', 'قل الحجم أيضًا: "نحو 1.20 يورو أكثر لكل منهم".', 'اندازه را هم بگو: «هر نفر حدود ۱٫۲۰ یورو بیشتر».'),
      ),
      exercise('w07-q015'),
    ],
  },
]

export const questions: Question[] = [
  {
    id: 'w07-q013',
    weekId: 'week-07',
    topic: 'p-value',
    answer: 1,
    prompt: t(
      'The jam taster gets 9 of 10 right, and p = 0.01. What does that mean in plain words?',
      'يصيب متذوّق المربى 9 من 10، وp = 0.01. ماذا يعني ذلك بكلمات بسيطة؟',
      'مزه‌شناس مربا ۹ تا از ۱۰ را درست می‌گوید و p = ۰٫۰۱. این به زبان ساده یعنی چه؟',
    ),
    options: [
      t('There is a 1% chance that the taster is good', 'هناك فرصة 1% أن يكون المتذوّق جيدًا', '۱٪ احتمال دارد مزه‌شناس خوب باشد'),
      t('If they were only guessing, 9 or more right would happen only about 1 time in 100', 'لو كان يخمّن فقط، لحدثت 9 إصابات أو أكثر نحو مرة واحدة من كل 100 فقط', 'اگر فقط حدس می‌زد، ۹ جواب درست یا بیشتر فقط حدود ۱ بار در ۱۰۰ پیش می‌آمد'),
      t('They get 1% of the answers wrong', 'يخطئ في 1% من الإجابات', '۱٪ جواب‌ها را اشتباه می‌گوید'),
    ],
  },
  {
    id: 'w07-q014',
    weekId: 'week-07',
    topic: 'z-test',
    answer: 0,
    prompt: t(
      'In "the stand sells 56 jars a Saturday", which symbol is the 56?',
      'في "يبيع الكشك 56 برطمانًا كل سبت"، أي رمز هو الـ 56؟',
      'در «غرفه هر شنبه ۵۶ شیشه می‌فروشد»، ۵۶ کدام نماد است؟',
    ),
    options: [
      t('μ ("mu"): the claimed average', 'μ ("ميو"): المتوسط المُدّعى', 'μ («میو»): میانگین ادعاشده'),
      t('x̄ ("x-bar"): our own average', 'x̄ ("إكس بار"): متوسطنا نحن', 'x̄ («ایکس بار»): میانگین خود ما'),
      t('σ ("sigma"): how much one Saturday usually varies', 'σ ("سيغما"): كم يتغيّر السبت الواحد عادةً', 'σ («سیگما»): اینکه یک شنبه معمولاً چقدر تغییر می‌کند'),
    ],
  },
  {
    id: 'w07-q015',
    weekId: 'week-07',
    topic: 'your-turn',
    answer: 1,
    prompt: t(
      'In the new-recipe exercise, z = 2.4 and the 5% line (z-critical) is 1.645. What do you decide?',
      'في تمرين الوصفة الجديدة، z = 2.4 وخط الـ 5% ‏(z الحرجة) هو 1.645. ماذا تقرر؟',
      'در تمرین دستور پخت تازه، z = ۲٫۴ و خط ۵٪ (z بحرانی) ۱٫۶۴۵ است. چه تصمیمی می‌گیری؟',
    ),
    options: [
      t('Fail to reject H₀: 2.4 is just luck', 'لا نرفض H₀: 2.4 مجرد حظ', 'H₀ رد نمی‌شود: ۲٫۴ فقط شانس است'),
      t('Reject H₀: 2.4 is past the line, so buyers really spend more', 'نرفض H₀: 2.4 تتجاوز الخط، فالمشترون ينفقون أكثر فعلًا', 'H₀ را رد می‌کنیم: ۲٫۴ از خط گذشته، پس خریداران واقعاً بیشتر خرج می‌کنند'),
      t('Move the line until the answer looks better', 'حرّك الخط حتى تبدو الإجابة أفضل', 'خط را جابه‌جا کن تا جواب بهتر به نظر برسد'),
    ],
  },
  {
    id: 'w07-q016',
    weekId: 'week-07',
    topic: 'two-groups',
    answer: 1,
    prompt: t(
      'The owner asks: "On tasting days, does a bigger share of visitors buy something?" Each visitor either bought or did not. Which test fits?',
      'يسأل المالك: "في أيام التذوق، هل تشتري نسبة أكبر من الزوار شيئًا؟" كل زائر إما اشترى أو لم يشترِ. أي اختبار يناسب؟',
      'صاحب غرفه می‌پرسد: «در روزهای مزه‌کردن، آیا سهم بیشتری از بازدیدکنندگان چیزی می‌خرند؟» هر بازدیدکننده یا خریده یا نخریده. کدام آزمون مناسب است؟',
    ),
    options: [
      t('Two averages (T.TEST)', 'متوسطان (T.TEST)', 'دو میانگین (T.TEST)'),
      t('Two rates: bought or not is a yes/no, so we compare two percentages', 'معدّلان: اشترى أم لا هو نعم/لا، فنقارن نسبتين مئويتين', 'دو نرخ: خرید یا نخرید بله/نه است، پس دو درصد را مقایسه می‌کنیم'),
      t('The one-sample z-test against 56 jars', 'اختبار z لعيّنة واحدة مقابل 56 برطمانًا', 'آزمون z تک‌نمونه‌ای در برابر ۵۶ شیشه'),
    ],
  },
]
