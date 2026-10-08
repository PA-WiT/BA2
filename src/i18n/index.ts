import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      appName: 'Course content',
      homeIntro: 'Pick a week below to start reading. Everything is open, and your quiz answers are saved in this browser.',
      dashboard: 'Dashboard',
      courseContents: 'Course contents',
      backToHub: 'Back to hub',
      soon: 'Soon',
      home: 'Home',
      week: 'Week',
      homework: 'Homework',
      previous: 'Previous',
      next: 'Next',
      loading: 'Loading…',
      weekNotFound: "This week hasn't been migrated yet.",
      notFoundTitle: 'Page not found',
      notFoundBody: "This page doesn't exist or has moved. Pick a week below or go back to the start.",
      backToHome: 'Back to home',
      viewOriginalPdf: 'View original PDF',
      saveAsPdf: 'Save as PDF',
      question: 'Question {{n}}',
      yourAnswerShouldInclude: 'Your answer should include',
      exampleAnswer: 'Example answer (on a smaller slice of the data)',
      thinkOfItLike: 'Think of it like…',
      homeworkObjectives: "By the end of this homework you'll have…",
      feedbackNotGraded: 'Feedback (not graded)',
      beforeYouStart: 'Before you start',
    },
  },
  ar: {
    translation: {
      appName: 'محتوى المقرر',
      homeIntro: 'اختر أسبوعًا أدناه لتبدأ القراءة. كل المحتوى متاح، وتُحفظ إجاباتك في الاختبارات في هذا المتصفح.',
      dashboard: 'لوحة التحكم',
      courseContents: 'محتوى المقرر',
      backToHub: 'العودة إلى المقرر',
      soon: 'قريبًا',
      home: 'الرئيسية',
      week: 'الأسبوع',
      homework: 'الواجب',
      previous: 'السابق',
      next: 'التالي',
      loading: 'جارٍ التحميل…',
      weekNotFound: 'لم يتم نقل هذا الأسبوع بعد.',
      notFoundTitle: 'الصفحة غير موجودة',
      notFoundBody: 'هذه الصفحة غير موجودة أو نُقلت. اختر أسبوعًا أدناه أو عُد إلى البداية.',
      backToHome: 'العودة إلى الرئيسية',
      viewOriginalPdf: 'عرض ملف PDF الأصلي',
      saveAsPdf: 'حفظ كملف PDF',
      question: 'السؤال {{n}}',
      yourAnswerShouldInclude: 'يجب أن تتضمن إجابتك',
      exampleAnswer: 'مثال على إجابة (على جزء أصغر من البيانات)',
      thinkOfItLike: 'فكّر فيها كأنها…',
      homeworkObjectives: 'بنهاية هذا الواجب ستكون قد…',
      feedbackNotGraded: 'رأيك (بلا درجة)',
      beforeYouStart: 'قبل أن تبدأ',
    },
  },
  fa: {
    translation: {
      appName: 'محتوای درس',
      homeIntro: 'یک هفته را از فهرست زیر انتخاب کن و خواندن را شروع کن. همهٔ محتوا باز است و پاسخ‌هایت به تمرین‌ها در همین مرورگر ذخیره می‌شود.',
      dashboard: 'داشبورد',
      courseContents: 'محتوای دوره',
      backToHub: 'بازگشت به دوره',
      soon: 'به‌زودی',
      home: 'خانه',
      week: 'هفته',
      homework: 'تکلیف',
      previous: 'قبلی',
      next: 'بعدی',
      loading: 'در حال بارگذاری…',
      weekNotFound: 'این هفته هنوز منتقل نشده است.',
      notFoundTitle: 'صفحه پیدا نشد',
      notFoundBody: 'این صفحه وجود ندارد یا جابه‌جا شده است. یک هفته را از فهرست زیر انتخاب کن یا به صفحهٔ اول برگرد.',
      backToHome: 'بازگشت به خانه',
      viewOriginalPdf: 'مشاهده PDF اصلی',
      saveAsPdf: 'ذخیره به‌صورت PDF',
      question: 'سؤال {{n}}',
      yourAnswerShouldInclude: 'پاسخت باید شامل این‌ها باشد',
      exampleAnswer: 'نمونهٔ پاسخ (روی بخش کوچک‌تری از داده)',
      thinkOfItLike: 'مثل این است که…',
      homeworkObjectives: 'در پایان این تکلیف…',
      feedbackNotGraded: 'نظر تو (بدون نمره)',
      beforeYouStart: 'پیش از شروع',
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('lang') ?? 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

const RTL_LANGS = ['ar', 'fa']

const applyDir = (lng: string) => {
  document.documentElement.lang = lng
  document.documentElement.dir = RTL_LANGS.includes(lng) ? 'rtl' : 'ltr'
  localStorage.setItem('lang', lng)
}
applyDir(i18n.language)
i18n.on('languageChanged', applyDir)

export default i18n
