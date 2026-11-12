import type { Block } from '../../types'
import { L, feedbackTask, projectNotice } from './shared'

// Week 8 homework = final project steps 8-10 merged into one week (roadmap on the Final Project page): join the
// pieces into one storyline, check the errors and limits, then write the executive summary and a slide outline.
// Example answers use the jam stand (public/data/jam-tasting.csv, numbers computed with pandas/scipy), so they show
// the format without doing any case study for the students.
export const week08Homework: Block = {
  type: 'homework',
  notice: projectNotice,
  objectives: [
    L(
      'Joined your Weeks 4–7 work into one storyline, from the question to the result',
      'جمعت عملك في الأسابيع 4–7 في قصة واحدة، من السؤال إلى النتيجة',
      'کار هفته‌های ۴ تا ۷ را در یک داستان کنار هم گذاشته‌ای، از پرسش تا نتیجه',
    ),
    L(
      'Written the limits of your analysis: possible bias, how sure you are (with a number) and which mistake is worse',
      'كتبت حدود تحليلك: التحيز المحتمل، وكم أنت متأكد (برقم)، وأي خطأ أسوأ',
      'محدودیت‌های تحلیلت را نوشته‌ای: سوگیری احتمالی، میزان اطمینان (با یک عدد) و اینکه کدام اشتباه بدتر است',
    ),
    L(
      'Written an answer-first executive summary and a 5–7 slide outline with takeaway titles',
      'كتبت ملخصًا تنفيذيًا يبدأ بالإجابة ومخططًا من 5–7 شرائح بعناوين تقول الخلاصة',
      'یک خلاصهٔ مدیریتی که با جواب شروع می‌شود و طرح ۵ تا ۷ اسلاید با عنوان‌های نتیجه‌دار نوشته‌ای',
    ),
  ],
  scenario: L(
    'The example answers use the jam stand\'s 20 Saturdays from this week\'s page. Your answers use your pair\'s case study, your cleaned file, your regression (Week 6) and your test (Week 7).',
    'تستخدم أمثلة الإجابات أيام السبت العشرين لكشك المربى من صفحة هذا الأسبوع. وإجاباتكما تستخدم دراسة حالتكما، وملفكما النظيف، وانحداركما (الأسبوع 6)، واختباركما (الأسبوع 7).',
    'نمونه‌پاسخ‌ها از ۲۰ شنبهٔ غرفهٔ مربا در صفحهٔ این هفته استفاده می‌کنند. پاسخ‌های شما از مطالعهٔ موردی گروهتان، فایل تمیزتان، رگرسیونتان (هفتهٔ ۶) و آزمونتان (هفتهٔ ۷) استفاده می‌کنند.',
  ),
  tasks: [
    {
      title: L('Write your storyline', 'اكتب قصتك', 'داستانت را بنویس'),
      prompt: L(
        '<p>In five short lines, one per step, tell your project\'s story: the question, the data (and how you cleaned it), the chart that shows the main pattern, what the regression says, and what the test says. Use your real numbers. Add it to your README\'s <em>Analysis</em> section.</p>',
        '<p>في خمسة أسطر قصيرة، سطر لكل خطوة، احكِ قصة مشروعك: السؤال، والبيانات (وكيف نظفتها)، والمخطط الذي يُظهر النمط الرئيسي، وما يقوله الانحدار، وما يقوله الاختبار. استخدم أرقامك الحقيقية. أضفها إلى قسم <em>Analysis</em> في README.</p>',
        '<p>در پنج خط کوتاه، یک خط برای هر گام، داستان پروژه‌ات را بگو: پرسش، داده (و اینکه چطور تمیزش کردی)، نموداری که الگوی اصلی را نشان می‌دهد، آنچه رگرسیون می‌گوید و آنچه آزمون می‌گوید. از عددهای واقعی‌ات استفاده کن. آن را به بخش <em>Analysis</em> در README اضافه کن.</p>',
      ),
      analogy: L(
        '<p>It is the trailer for a film: in one minute you know the problem, the main characters and how it turns out, without seeing every scene.</p>',
        '<p>إنه الإعلان التشويقي لفيلم: في دقيقة واحدة تعرف المشكلة والشخصيات الرئيسية وكيف تنتهي القصة، دون أن ترى كل مشهد.</p>',
        '<p>مثل تیزر یک فیلم است: در یک دقیقه مسئله، شخصیت‌های اصلی و پایان ماجرا را می‌فهمی، بی‌آنکه همهٔ صحنه‌ها را ببینی.</p>',
      ),
      include: [
        L('The question, in one sentence', 'السؤال في جملة واحدة', 'پرسش، در یک جمله'),
        L('The data: source, rows, and the main cleaning steps', 'البيانات: المصدر والصفوف وأهم خطوات التنظيف', 'داده: منبع، تعداد سطر و گام‌های اصلی پاک‌سازی'),
        L('One chart with a takeaway title, from zero if it is a bar chart', 'مخطط واحد بعنوان يقول الخلاصة، من الصفر إن كان مخطط أعمدة', 'یک نمودار با عنوان نتیجه‌دار، از صفر اگر میله‌ای است'),
        L('The regression (slope and R²) and the test (p-value) in plain words', 'الانحدار (الميل وR²) والاختبار (قيمة p) بكلمات بسيطة', 'رگرسیون (شیب و R²) و آزمون (مقدار p) به زبان ساده'),
      ],
      example: [
        {
          type: 'table',
          headers: [L('Step', 'الخطوة', 'گام'), L('Jam stand', 'كشك المربى', 'غرفهٔ مربا')],
          rows: [
            [L('Question', 'السؤال', 'پرسش'), L('Is the free tasting table worth it?', 'هل تستحق طاولة التذوق المجانية العناء؟', 'آیا میز مزه‌کردن رایگان ارزشش را دارد؟')],
            [L('Data', 'البيانات', 'داده'), L('20 Saturdays, April–August 2024; tasting on every other Saturday; spellings and blanks fixed', '20 سبتًا، أبريل–أغسطس 2024؛ التذوق كل سبتين؛ وتصحيح الإملاء والفراغات', '۲۰ شنبه، آوریل تا اوت ۲۰۲۴؛ مزه‌کردن یک شنبه در میان؛ املا و خانه‌های خالی درست شد')],
            [L('Chart', 'المخطط', 'نمودار'), L('"Tasting Saturdays sell about 9.5 more jars": two bars from zero, 64.9 vs 55.4', '"أيام السبت بالتذوق تبيع نحو 9.5 برطمانات أكثر": عمودان من الصفر، 64.9 مقابل 55.4', '«شنبه‌های مزه‌کردن حدود ۹٫۵ شیشه بیشتر می‌فروشند»: دو میله از صفر، ۶۴٫۹ در برابر ۵۵٫۴')],
            [L('Regression', 'الانحدار', 'رگرسیون'), L('With the same number of visitors, tasting adds about 6 jars; the model explains 71% of the ups and downs', 'بعدد الزوار نفسه، يضيف التذوق نحو 6 برطمانات؛ ويفسّر النموذج 71% من الصعود والهبوط', 'با تعداد بازدیدکنندهٔ یکسان، مزه‌کردن حدود ۶ شیشه اضافه می‌کند؛ مدل ۷۱٪ بالا و پایین‌ها را توضیح می‌دهد')],
            [L('Test', 'الاختبار', 'آزمون'), L('Luck alone would give a gap this big about 1 time in 100 (p = 0.010)', 'لا يعطي الحظ وحده فرقًا بهذا الحجم إلا نحو مرة من كل 100 (p = 0.010)', 'شانس تنها حدود ۱ بار در ۱۰۰ چنین فاصله‌ای می‌دهد (p = ۰٫۰۱۰)')],
          ],
        },
      ],
    },
    {
      title: L('Check the errors and write the limits', 'افحص الأخطاء واكتب الحدود', 'خطاها را بررسی کن و محدودیت‌ها را بنویس'),
      prompt: L(
        '<p>Go through Sections 4–8 for your own project. Write a short <em>Limits</em> paragraph for your README: the scope (who, where, when), one possible bias, one number for how sure you are (a standard error, R², p-value, or precision and recall), and which mistake would be worse for your case and why.</p>',
        '<p>راجع الأقسام 4–8 لمشروعك. اكتب فقرة <em>Limits</em> قصيرة لملف README: النطاق (من، أين، متى)، وتحيزًا محتملًا واحدًا، ورقمًا واحدًا لدرجة اليقين (خطأ معياري، أو R²، أو قيمة p، أو الدقة والاستدعاء)، وأي خطأ سيكون أسوأ لحالتك ولماذا.</p>',
        '<p>بخش‌های ۴ تا ۸ را برای پروژهٔ خودت مرور کن. یک بند کوتاه <em>Limits</em> برای README بنویس: دامنه (چه کسی، کجا، کی)، یک سوگیری احتمالی، یک عدد برای میزان اطمینان (خطای معیار، R²، مقدار p، یا دقت و بازیابی)، و اینکه کدام اشتباه برای مورد تو بدتر است و چرا.</p>',
      ),
      analogy: L(
        '<p>It is the small print on a medicine box: who it is for, how well it works, and when not to use it. Without it, even a good medicine can do harm.</p>',
        '<p>إنها النشرة المرفقة بعلبة الدواء: لمن هو، وما مدى فعاليته، ومتى لا تستخدمه. ومن دونها قد يضر حتى الدواء الجيد.</p>',
        '<p>مثل بروشور داخل جعبهٔ دارو است: برای چه کسی است، چقدر اثر دارد و کی نباید مصرفش کرد. بدون آن، حتی داروی خوب هم ممکن است آسیب بزند.</p>',
      ),
      include: [
        L('Scope: which people, places and dates the data covers', 'النطاق: أي ناس وأماكن وتواريخ تغطيها البيانات', 'دامنه: داده کدام آدم‌ها، جاها و تاریخ‌ها را پوشش می‌دهد'),
        L('One possible bias, and how you could reduce it', 'تحيز محتمل واحد، وكيف يمكنك تقليله', 'یک سوگیری احتمالی، و اینکه چطور می‌توانی کمش کنی'),
        L('One number for how sure you are, explained in plain words', 'رقم واحد لدرجة اليقين، مشروحًا بكلمات بسيطة', 'یک عدد برای میزان اطمینان، به زبان ساده'),
        L('Which mistake is worse for your case (false positive or false negative), and why', 'أي خطأ أسوأ لحالتك (إيجابي كاذب أم سلبي كاذب)، ولماذا', 'کدام اشتباه برای مورد تو بدتر است (مثبت کاذب یا منفی کاذب) و چرا'),
      ],
      example: [
        {
          type: 'code',
          code: `### Limits
Scope: one market, 20 summer Saturdays (April-August 2024).
Possible bias: visitors were counted by hand, so busy Saturdays may be under-counted.
How sure: the average of 60.15 jars could be about 2 jars off (standard error 2.12);
the model explains 71% of the ups and downs (R-squared 0.71).
Worse mistake: a false negative (dropping tasting when it really works) loses about
9.5 jars every Saturday; a false positive only costs the jam we give away.`,
        },
      ],
    },
    {
      title: L('Executive summary and slide outline', 'الملخص التنفيذي ومخطط الشرائح', 'خلاصهٔ مدیریتی و طرح اسلایدها'),
      prompt: L(
        '<p>Write a 3–4 sentence executive summary, answer first, for your README\'s <em>Recommendations</em> section. Then plan 5–7 slides for your final presentation: one line per slide with its takeaway title and what goes on it. Keep one appendix slide for questions.</p>',
        '<p>اكتب ملخصًا تنفيذيًا من 3–4 جمل، يبدأ بالإجابة، لقسم <em>Recommendations</em> في README. ثم خطّط لـ 5–7 شرائح لعرضك النهائي: سطر لكل شريحة بعنوانها الذي يقول الخلاصة وما يوضع عليها. واحتفظ بشريحة ملحقة للأسئلة.</p>',
        '<p>یک خلاصهٔ مدیریتی ۳ تا ۴ جمله‌ای، با جواب در اول، برای بخش <em>Recommendations</em> در README بنویس. بعد ۵ تا ۷ اسلاید برای ارائهٔ نهایی‌ات طراحی کن: برای هر اسلاید یک خط با عنوان نتیجه‌دار و آنچه رویش می‌آید. یک اسلاید پیوست برای پرسش‌ها نگه دار.</p>',
      ),
      analogy: L(
        '<p>It is an elevator pitch: if the owner only rides one floor with you, they should still leave knowing what to do.</p>',
        '<p>إنه عرض المصعد: لو ركب المالك معك طابقًا واحدًا فقط، يجب أن يخرج وهو يعرف ماذا يفعل.</p>',
        '<p>مثل معرفی در آسانسور است: اگر صاحب‌کار فقط یک طبقه با تو هم‌سفر باشد، باز هم باید بداند چه کند.</p>',
      ),
      include: [
        L('The recommendation in the first sentence', 'التوصية في الجملة الأولى', 'توصیه در جملهٔ اول'),
        L('The size of the effect and how sure you are, in plain words', 'حجم الأثر ودرجة اليقين بكلمات بسيطة', 'اندازهٔ اثر و میزان اطمینان، به زبان ساده'),
        L('One limit and one next step', 'حدّ واحد وخطوة تالية واحدة', 'یک محدودیت و یک گام بعدی'),
        L('5–7 slide titles that are takeaways, not topics', 'عناوين 5–7 شرائح تقول الخلاصة، لا الموضوع', 'عنوان ۵ تا ۷ اسلاید که نتیجه‌اند، نه موضوع'),
      ],
      example: [
        {
          type: 'code',
          code: `### Recommendations
Put the tasting table out every Saturday. Tasting Saturdays sold about 9.5 more jars
(64.9 vs 55.4), and luck alone would give a gap this big only about 1 time in 100.
This comes from one market in summer, so we will alternate again for 10 Saturdays
from September to check it also works in autumn.

Slides: 1 A tasting table sells about 10 more jars a Saturday | 2 We compared 10 tasting
and 10 normal Saturdays | 3 Tasting Saturdays sell about 9.5 more jars (chart) |
4 The gap is very unlikely to be luck | 5 Keep tasting, and check again in autumn |
Appendix: regression table and test output`,
        },
      ],
    },
  ],
  feedback: feedbackTask,
}
