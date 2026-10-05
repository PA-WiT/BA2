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
