import type { Block } from '../../types'
import { L, feedbackTask, projectNotice } from './shared'

// Week 7 homework = final project step "state and run your case's hypothesis test; report the p-value in plain
// words" (roadmap on the Final Project page). Example answers use the jam stand's April–May Saturdays only (8 of the
// 20 in public/data/jam-tasting.csv; numbers computed with scipy), so they show the format and, on purpose, a
// "not enough evidence" result, without doing any case study for the students.
export const week07Homework: Block = {
  type: 'homework',
  notice: projectNotice,
  objectives: [
    L(
      'Written H₀ and Hₐ for your case card\'s test, with the tail and α chosen in advance',
      'كتبت H₀ وHₐ لاختبار بطاقة حالتك، مع اختيار الذيل وα مسبقًا',
      'برای آزمون کارت مورد خودت H₀ و Hₐ را نوشته‌ای و دنباله و α را از قبل انتخاب کرده‌ای',
    ),
    L(
      'Run the right test for two groups (two averages or two rates) and reported the p-value',
      'أجريت الاختبار المناسب لمجموعتين (متوسطان أو معدّلان) وذكرت قيمة p',
      'آزمون درست برای دو گروه (دو میانگین یا دو نرخ) را اجرا کرده‌ای و مقدار p را گزارش داده‌ای',
    ),
    L(
      'Written the result in plain words, with the size of the effect, for the README',
      'كتبت النتيجة بكلمات بسيطة، مع حجم الأثر، لملف README',
      'نتیجه را به زبان ساده و همراه با اندازهٔ اثر برای README نوشته‌ای',
    ),
  ],
  scenario: L(
    'The example answers use the jam stand\'s April and May Saturdays only (8 Saturdays, 4 with tasting), from this week\'s practice file. Your answers use your pair\'s case study and the test question on its card.',
    'تستخدم أمثلة الإجابات أيام السبت في أبريل ومايو فقط من كشك المربى (8 أيام سبت، 4 منها بالتذوق)، من ملف التدريب لهذا الأسبوع. إجاباتكما تستخدم دراسة حالتكما وسؤال الاختبار في بطاقتها.',
    'نمونه‌پاسخ‌ها فقط از شنبه‌های آوریل و مه غرفهٔ مربا (۸ شنبه، ۴ تا با مزه‌کردن) در فایل تمرین این هفته استفاده می‌کنند. پاسخ‌های شما از مطالعهٔ مورد گروهتان و پرسش آزمون روی کارتش استفاده می‌کنند.',
  ),
  tasks: [
    {
      title: L('Write your hypotheses', 'اكتب فرضيتيك', 'فرض‌هایت را بنویس'),
      prompt: L(
        '<p>Take the test question from your case card on the <a href="/week/final-project">Final Project page</a>. Write H₀ and Hₐ in words and in symbols, pick the tail from the words of the question, choose α, and name the test: <strong>two averages</strong> (a number per row, <code>T.TEST</code>) or <strong>two rates</strong> (a yes/no per row).</p>',
        '<p>خذ سؤال الاختبار من بطاقة حالتك في <a href="/week/final-project">صفحة المشروع النهائي</a>. اكتب H₀ وHₐ بالكلمات وبالرموز، واختر الذيل من كلمات السؤال، واختر α، وسمِّ الاختبار: <strong>متوسطان</strong> (رقم لكل صف، <code>T.TEST</code>) أو <strong>معدّلان</strong> (نعم/لا لكل صف).</p>',
        '<p>پرسش آزمون را از کارت مورد خودت در <a href="/week/final-project">صفحهٔ پروژهٔ نهایی</a> بردار. H₀ و Hₐ را با واژه و با نماد بنویس، دنباله را از واژه‌های پرسش انتخاب کن، α را انتخاب کن و آزمون را نام ببر: <strong>دو میانگین</strong> (یک عدد در هر سطر، <code>T.TEST</code>) یا <strong>دو نرخ</strong> (یک بله/نه در هر سطر).</p>',
      ),
      analogy: L(
        '<p>It is agreeing the rules of a bet before the match: which result wins, and how sure you need to be. Changing the rules after the final whistle is not fair, and it is not a test either.</p>',
        '<p>إنه الاتفاق على قواعد الرهان قبل المباراة: أي نتيجة تفوز، وكم يجب أن تكون متأكدًا. تغيير القواعد بعد صافرة النهاية ليس عادلًا، وليس اختبارًا أيضًا.</p>',
        '<p>مثل توافق بر قانون‌های یک شرط پیش از بازی است: کدام نتیجه برنده است و چقدر باید مطمئن باشی. عوض کردن قانون‌ها بعد از سوت پایان منصفانه نیست و آزمون هم نیست.</p>',
      ),
      include: [
        L('The question, copied from your case card', 'السؤال منسوخًا من بطاقة حالتك', 'پرسش، کپی‌شده از کارت مورد'),
        L('H₀ and Hₐ, in words and in symbols', 'H₀ وHₐ بالكلمات وبالرموز', 'H₀ و Hₐ، با واژه و نماد'),
        L('The tail, and the word in the question that decided it', 'الذيل، والكلمة في السؤال التي حددته', 'دنباله و واژه‌ای در پرسش که آن را تعیین کرد'),
        L('α, and the test you will use (two averages or two rates), with one reason each', 'α، والاختبار الذي ستستخدمه (متوسطان أو معدّلان)، مع سبب لكل منهما', 'α و آزمونی که به کار می‌بری (دو میانگین یا دو نرخ)، هر کدام با یک دلیل'),
      ],
      example: [
        {
          type: 'table',
          headers: [L('Part', 'الجزء', 'بخش'), L('Jam stand', 'كشك المربى', 'غرفهٔ مربا')],
          rows: [
            [L('Question', 'السؤال', 'پرسش'), L('Do tasting Saturdays sell more jars than normal Saturdays?', 'هل تبيع أيام السبت بالتذوق برطمانات أكثر من الأيام العادية؟', 'آیا شنبه‌های مزه‌کردن بیشتر از شنبه‌های عادی شیشه می‌فروشند؟')],
            [L('H₀', 'H₀', 'H₀'), L('Tasting Saturdays sell no more jars on average: μ<sub>tasting</sub> ≤ μ<sub>normal</sub>', 'أيام التذوق لا تبيع أكثر في المتوسط: μ<sub>tasting</sub> ≤ μ<sub>normal</sub>', 'شنبه‌های مزه‌کردن به‌طور میانگین بیشتر نمی‌فروشند: μ<sub>tasting</sub> ≤ μ<sub>normal</sub>')],
            [L('Hₐ', 'Hₐ', 'Hₐ'), L('Tasting Saturdays sell more: μ<sub>tasting</sub> &gt; μ<sub>normal</sub>', 'أيام التذوق تبيع أكثر: μ<sub>tasting</sub> &gt; μ<sub>normal</sub>', 'شنبه‌های مزه‌کردن بیشتر می‌فروشند: μ<sub>tasting</sub> &gt; μ<sub>normal</sub>')],
            [L('Tail', 'الذيل', 'دنباله'), L('Right-tailed: the question says "more"', 'بذيل أيمن: يقول السؤال "أكثر"', 'دنبالهٔ راست: پرسش می‌گوید «بیشتر»')],
            [L('α and test', 'α والاختبار', 'α و آزمون'), L('α = 0.05, chosen before looking. Two averages (jars is a number per Saturday): T.TEST, one tail', 'α = 0.05، اختيرت قبل النظر. متوسطان (البرطمانات رقم لكل سبت): T.TEST بذيل واحد', 'α = ۰٫۰۵، پیش از نگاه انتخاب شده. دو میانگین (شیشه برای هر شنبه یک عدد است): T.TEST، یک دنباله')],
          ],
        },
      ],
    },
    {
      title: L('Run the test', 'أجرِ الاختبار', 'آزمون را اجرا کن'),
      prompt: L(
        '<p>On your <strong>clean</strong> data, compute the two group averages (or rates) and the p-value: <code>T.TEST</code> for two averages, the formula block from Section 8 for two rates, or the Python cells. Then compare p with α and write the decision.</p>',
        '<p>على بياناتك <strong>النظيفة</strong>، احسب متوسطي المجموعتين (أو معدّليهما) وقيمة p: ‏<code>T.TEST</code> للمتوسطين، أو كتلة المعادلات في القسم 8 للمعدّلين، أو خلايا Python. ثم قارن p بـ α واكتب القرار.</p>',
        '<p>روی دادهٔ <strong>تمیز</strong> خودت میانگین (یا نرخ) دو گروه و مقدار p را حساب کن: <code>T.TEST</code> برای دو میانگین، بلوک فرمول بخش ۸ برای دو نرخ، یا سلول‌های Python. بعد p را با α مقایسه کن و تصمیم را بنویس.</p>',
      ),
      analogy: L(
        '<p>It is the referee checking the goal-line camera. The rule was agreed before the match; now you just look at the evidence and apply it, whichever way it goes.</p>',
        '<p>إنه الحكم يراجع كاميرا خط المرمى. القاعدة متفق عليها قبل المباراة؛ والآن تنظر إلى الدليل وتطبّقها فقط، أيًّا كانت النتيجة.</p>',
        '<p>مثل داوری است که دوربین خط دروازه را نگاه می‌کند. قانون پیش از بازی توافق شده؛ حالا فقط به شواهد نگاه می‌کنی و قانون را اجرا می‌کنی، نتیجه هر طرف که باشد.</p>',
      ),
      include: [
        L('The two averages or rates, with how many rows are in each group', 'المتوسطان أو المعدّلان، مع عدد الصفوف في كل مجموعة', 'دو میانگین یا دو نرخ، با تعداد سطرهای هر گروه'),
        L('The formula or code you ran', 'المعادلة أو الكود الذي شغّلته', 'فرمول یا کدی که اجرا کردی'),
        L('The p-value and the decision: reject H₀ or fail to reject', 'قيمة p والقرار: رفض H₀ أو عدم رفضها', 'مقدار p و تصمیم: رد H₀ یا رد نکردن'),
      ],
      example: [
        {
          type: 'html',
          html: L(
            '<p>April and May: tasting Saturdays averaged <strong>59.5</strong> jars (4 Saturdays), normal Saturdays <strong>54.5</strong> (4 Saturdays). <code>=T.TEST(tasting, normal, 1, 3)</code> → <strong>p = 0.23</strong>. 0.23 &gt; 0.05, so <strong>fail to reject H₀</strong>: not enough evidence that tasting sells more. With all 20 Saturdays the same test gives p = 0.0103 (Section 8): the difference was there, but 8 Saturdays were too few to tell it from luck.</p>',
            '<p>أبريل ومايو: بلغ متوسط أيام التذوق <strong>59.5</strong> برطمانًا (4 أيام سبت)، والأيام العادية <strong>54.5</strong> (4 أيام سبت). ‏<code>=T.TEST(tasting, normal, 1, 3)</code> ← <strong>p = 0.23</strong>. ‏0.23 &gt; 0.05، إذن <strong>لا نرفض H₀</strong>: لا أدلة كافية على أن التذوق يبيع أكثر. ومع أيام السبت العشرين كلها يعطي الاختبار نفسه p = 0.0103 (القسم 8): كان الفرق موجودًا، لكن 8 أيام سبت كانت أقل من أن تميّزه عن الحظ.</p>',
            '<p>آوریل و مه: شنبه‌های مزه‌کردن به‌طور میانگین <strong>۵۹٫۵</strong> شیشه (۴ شنبه) و شنبه‌های عادی <strong>۵۴٫۵</strong> (۴ شنبه). <code>=T.TEST(tasting, normal, 1, 3)</code> ← <strong>p = ۰٫۲۳</strong>. ۰٫۲۳ &gt; ۰٫۰۵، پس <strong>H₀ رد نمی‌شود</strong>: شواهد کافی نیست که مزه‌کردن بیشتر می‌فروشد. با هر ۲۰ شنبه همین آزمون p = ۰٫۰۱۰۳ می‌دهد (بخش ۸): تفاوت وجود داشت، اما ۸ شنبه برای جدا کردنش از شانس خیلی کم بود.</p>',
          ),
        },
      ],
    },
    {
      title: L('Say it in plain words for your README', 'قلها بكلمات بسيطة لملف README', 'آن را به زبان ساده برای README بگو'),
      prompt: L(
        '<p>Write 3 or 4 sentences for your README\'s <em>Analysis</em> and <em>Key findings</em>: what you tested, the result with its size and p-value, what it means for the business, and one limitation.</p>',
        '<p>اكتب 3 أو 4 جمل لقسمي <em>Analysis</em> و<em>Key findings</em> في README: ما الذي اختبرته، والنتيجة مع حجمها وقيمة p، وما تعنيه للعمل، وقيدًا واحدًا.</p>',
        '<p>۳ یا ۴ جمله برای بخش‌های <em>Analysis</em> و <em>Key findings</em> در README بنویس: چه چیزی را آزمودی، نتیجه با اندازه و مقدار p، معنایش برای کسب‌وکار و یک محدودیت.</p>',
      ),
      analogy: L(
        '<p>It is a weather forecast: "70% chance of rain, take an umbrella". A number, what it means and what to do, without the meteorologist\'s equations.</p>',
        '<p>إنها نشرة الطقس: "احتمال مطر 70%، خذ مظلة". رقم، وما يعنيه، وما يجب فعله، دون معادلات خبير الأرصاد.</p>',
        '<p>مثل پیش‌بینی هواست: «۷۰٪ احتمال باران، چتر بردار». یک عدد، معنایش و کاری که باید کرد، بدون معادله‌های هواشناس.</p>',
      ),
      include: [
        L('What you tested, and with which test', 'ما الذي اختبرته، وبأي اختبار', 'چه چیزی را و با کدام آزمون آزمودی'),
        L('The result: both averages or rates, the size of the gap and the p-value', 'النتيجة: المتوسطان أو المعدّلان، وحجم الفجوة، وقيمة p', 'نتیجه: هر دو میانگین یا نرخ، اندازهٔ فاصله و مقدار p'),
        L('What it means for the business, and one limitation', 'ما تعنيه للعمل، وقيد واحد', 'معنایش برای کسب‌وکار و یک محدودیت'),
      ],
      example: [
        {
          type: 'code',
          code: `### Hypothesis test
We tested whether Saturdays with a free tasting table sell more jars than normal Saturdays
(Welch's t-test, one-tailed, alpha = 0.05). Using April and May only (4 Saturdays each), tasting days
averaged 59.5 jars against 54.5, a gap of 5 jars, but p = 0.23, so there is not yet enough evidence
that tasting sells more.
Key finding: the difference points the right way, but 8 Saturdays are too few to tell it from luck.
We recommend keeping the every-other-Saturday schedule for the rest of the season and testing again.
Limitation: a test says whether a difference is likely to be real, not what causes it.`,
        },
      ],
    },
  ],
  feedback: feedbackTask,
}
