import type { HomeworkTask, Localized } from '../../types'

export const L = (en: string, ar: string, fa: string): Localized => ({ en, ar, fa })

/** Last question of every homework: the student's opinion on the week's sessions (no example answer). */
export const feedbackTask: HomeworkTask = {
  title: L('Your feedback on this week', 'رأيك في هذا الأسبوع', 'نظر تو دربارهٔ این هفته'),
  prompt: L(
    "<p>In your opinion, how could this week's sessions be improved? Be honest and specific; this question isn't graded on what you say.</p>",
    '<p>برأيك، كيف يمكن تحسين جلسات هذا الأسبوع؟ كن صريحًا ومحددًا؛ لا يُقيَّم هذا السؤال بناءً على مضمون رأيك.</p>',
    '<p>به نظر تو، جلسه‌های این هفته چطور می‌توانند بهتر شوند؟ صادق و دقیق باش؛ این سؤال بر اساس محتوای نظرت نمره‌دهی نمی‌شود.</p>',
  ),
  include: [
    L('One thing that helped you learn', 'شيء واحد ساعدك على التعلّم', 'یک چیز که به یادگیری‌ات کمک کرد'),
    L('One thing that was unclear, too fast or too slow', 'شيء واحد كان غير واضح أو سريعًا جدًا أو بطيئًا جدًا', 'یک چیز که مبهم، خیلی سریع یا خیلی کند بود'),
    L('One concrete suggestion for next time', 'اقتراح ملموس واحد للمرة القادمة', 'یک پیشنهاد مشخص برای دفعهٔ بعد'),
  ],
}

const drive = L(
  "<p><strong>How to hand in:</strong> create <strong>one Google Drive folder</strong> for all your BA2 homework (for example <em>BA2 Homework, Your Name</em>), put each week's answers in it (a document with your text, queries and screenshots), and <strong>share the folder with your mentor</strong>: in Drive, click <em>Share</em>, add your mentor's email, and give them Viewer or Commenter access.</p>",
  '<p><strong>طريقة التسليم:</strong> أنشئ <strong>مجلدًا واحدًا في Google Drive</strong> لكل واجبات BA2 (مثلًا <em>BA2 Homework، اسمك</em>)، وضع فيه إجابات كل أسبوع (مستند يضم نصك واستعلاماتك ولقطات الشاشة)، ثم <strong>شارك المجلد مع مرشدك</strong>: في Drive انقر <em>Share</em>، وأضف البريد الإلكتروني لمرشدك، وامنحه صلاحية Viewer أو Commenter.</p>',
  '<p><strong>نحوهٔ تحویل:</strong> <strong>یک پوشه در Google Drive</strong> برای همهٔ تکلیف‌های BA2 بساز (مثلاً <em>BA2 Homework، نام تو</em>)، پاسخ هر هفته را در آن بگذار (یک سند شامل متن، کوئری‌ها و تصویرهای صفحه) و <strong>پوشه را با منتورت به اشتراک بگذار</strong>: در Drive روی <em>Share</em> کلیک کن، ایمیل منتورت را اضافه کن و دسترسی Viewer یا Commenter بده.</p>',
)

/** Hand-in instructions only (no deadline announced for this week). */
export const driveNotice = drive

/** Weeks 2 and 3: deadline + hand-in instructions. */
export const deadlineNotice = L(
  '<p><strong>Deadline: Sunday 11 October 2026.</strong> This applies to the Week 2 and Week 3 homework.</p>' + drive.en,
  '<p><strong>الموعد النهائي: الأحد 11 أكتوبر 2026.</strong> ينطبق ذلك على واجبي الأسبوع 2 والأسبوع 3.</p>' + drive.ar,
  '<p><strong>مهلت: یکشنبه ۱۱ اکتبر ۲۰۲۶.</strong> این مهلت برای تکلیف‌های هفتهٔ ۲ و هفتهٔ ۳ است.</p>' + drive.fa,
)

/** From Week 4 on, homework is a step of the pair final project (see src/content/weeks/final-project.ts). */
export const projectNotice = L(
  '<p><strong>From this week, your homework builds your final project.</strong> Work with your partner on one case study from the <a href="/week/final-project">Final Project page</a>; each homework from now on adds one part, so by Week 10 most of the project is already done.</p><p><strong>How to hand in:</strong> one partner creates a Google Drive folder named <em>BA2 Final Project – [case] – [your two names]</em>, shares it with the other partner (Editor) and with your mentor (Viewer or Commenter), and keeps one project document in it. Add each week\'s answers to that document under the week\'s heading.</p>',
  '<p><strong>بدءًا من هذا الأسبوع، يبني واجبك مشروعك النهائي.</strong> اعمل مع شريكك على دراسة حالة واحدة من <a href="/week/final-project">صفحة المشروع النهائي</a>؛ كل واجب من الآن يضيف جزءًا، فبحلول الأسبوع 10 يكون معظم المشروع منجزًا.</p><p><strong>طريقة التسليم:</strong> ينشئ أحد الشريكين مجلدًا في Google Drive باسم <em>BA2 Final Project – [الحالة] – [اسماكما]</em>، ويشاركه مع الشريك الآخر (Editor) ومع مرشدكما (Viewer أو Commenter)، ويحتفظ فيه بمستند واحد للمشروع. أضيفا إجابات كل أسبوع إلى ذلك المستند تحت عنوان الأسبوع.</p>',
  '<p><strong>از این هفته، تکلیف تو پروژهٔ نهایی‌ات را می‌سازد.</strong> با هم‌گروهی‌ات روی یک مطالعهٔ موردی از <a href="/week/final-project">صفحهٔ پروژهٔ نهایی</a> کار کن؛ هر تکلیف از این به بعد یک بخش اضافه می‌کند، پس تا هفتهٔ ۱۰ بیشتر پروژه انجام شده است.</p><p><strong>نحوهٔ تحویل:</strong> یکی از دو نفر یک پوشهٔ Google Drive با نام <em>BA2 Final Project – [مورد] – [نام شما دو نفر]</em> می‌سازد، آن را با هم‌گروهی (Editor) و منتورتان (Viewer یا Commenter) به اشتراک می‌گذارد و یک سند پروژه در آن نگه می‌دارد. پاسخ‌های هر هفته را زیر عنوان همان هفته به آن سند اضافه کنید.</p>',
)
