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
