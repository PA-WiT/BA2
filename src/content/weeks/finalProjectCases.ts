import type { Block, Localized } from '../types'
import { L } from './homework/shared'

// Final project case studies. Every dataset link was checked on 2026-10-11. Each case supports the whole
// roadmap: cleaning (Weeks 4–5), a linear regression (Week 6) and a hypothesis test (Week 7).
export interface CaseStudy {
  id: string
  name: Localized
  question: Localized
  dataset: { label: string; url: string; size: Localized }
  regression: Localized
  test: Localized
  watchOut: Localized
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'C1',
    name: L('Telecom customer churn', 'تسرّب عملاء الاتصالات', 'ریزش مشتریان مخابرات'),
    question: L('Which customers are about to leave, and why?', 'أي العملاء على وشك المغادرة، ولماذا؟', 'کدام مشتریان در آستانهٔ رفتن‌اند و چرا؟'),
    dataset: { label: 'Telco Customer Churn (Kaggle)', url: 'https://www.kaggle.com/datasets/blastchar/telco-customer-churn', size: L('7,043 customers', '7,043 عميلًا', '۷٬۰۴۳ مشتری') },
    regression: L('TotalCharges vs. tenure', 'TotalCharges مقابل tenure', 'TotalCharges در برابر tenure'),
    test: L('Is churn higher on month-to-month contracts than on two-year contracts?', 'هل التسرّب أعلى في العقود الشهرية منه في عقود السنتين؟', 'آیا ریزش در قراردادهای ماه‌به‌ماه بیشتر از قراردادهای دوساله است؟'),
    watchOut: L('TotalCharges is stored as text and is blank for brand-new customers.', 'العمود TotalCharges مخزّن كنص، وفارغ للعملاء الجدد تمامًا.', 'TotalCharges به‌صورت متن ذخیره شده و برای مشتریان کاملاً تازه خالی است.'),
  },
  {
    id: 'C2',
    name: L('Superstore profitability', 'ربحية متجر كبير', 'سودآوری یک فروشگاه بزرگ'),
    question: L('Which discounts, regions and categories lose money?', 'أي الخصومات والمناطق والفئات تخسر المال؟', 'کدام تخفیف‌ها، مناطق و دسته‌ها ضرر می‌دهند؟'),
    dataset: { label: 'Superstore Dataset (Kaggle)', url: 'https://www.kaggle.com/datasets/vivek468/superstore-dataset-final', size: L('≈ 10,000 order lines', '≈ 10,000 سطر طلب', '≈ ۱۰٬۰۰۰ ردیف سفارش') },
    regression: L('Profit vs. Discount', 'Profit مقابل Discount', 'Profit در برابر Discount'),
    test: L('Does average profit per order differ between two regions (e.g. West and Central)?', 'هل يختلف متوسط الربح لكل طلب بين منطقتين (مثل West وCentral)؟', 'آیا میانگین سود هر سفارش بین دو منطقه (مثلاً West و Central) فرق دارد؟'),
    watchOut: L('Negative profit is real (a loss), not an error; check date formats.', 'الربح السالب حقيقي (خسارة) وليس خطأ؛ تحقق من صيغ التاريخ.', 'سود منفی واقعی است (زیان)، نه خطا؛ قالب تاریخ‌ها را بررسی کن.'),
  },
  {
    id: 'C3',
    name: L('Marketing campaign customers', 'عملاء الحملات التسويقية', 'مشتریان کمپین بازاریابی'),
    question: L('Who are the best customers, and who responds to campaigns?', 'من هم أفضل العملاء، ومن يستجيب للحملات؟', 'بهترین مشتریان چه کسانی‌اند و چه کسانی به کمپین‌ها پاسخ می‌دهند؟'),
    dataset: { label: 'Customer Personality Analysis (Kaggle)', url: 'https://www.kaggle.com/datasets/imakash3011/customer-personality-analysis', size: L('2,240 customers', '2,240 عميلًا', '۲٬۲۴۰ مشتری') },
    regression: L('Total spending vs. Income (build total spending from the Mnt… columns)', 'إجمالي الإنفاق مقابل Income (ابنِ إجمالي الإنفاق من أعمدة Mnt…)', 'کل هزینه در برابر Income (کل هزینه را از ستون‌های Mnt… بساز)'),
    test: L('Do customers who accepted the last campaign spend more than those who did not?', 'هل ينفق العملاء الذين قبلوا الحملة الأخيرة أكثر ممن لم يقبلوها؟', 'آیا مشتریانی که آخرین کمپین را پذیرفتند بیشتر از بقیه خرج می‌کنند؟'),
    watchOut: L('Tab-separated file; check Income for blanks and Year_Birth for impossible years.', 'ملف مفصول بعلامات Tab؛ تحقق من الفراغات في Income ومن السنوات المستحيلة في Year_Birth.', 'فایل با Tab جدا شده؛ خانه‌های خالی Income و سال‌های ناممکن Year_Birth را بررسی کن.'),
  },
  {
    id: 'C4',
    name: L('Employee attrition (HR)', 'تسرّب الموظفين (الموارد البشرية)', 'ترک کار کارکنان (منابع انسانی)'),
    question: L('Why do employees leave the company?', 'لماذا يترك الموظفون الشركة؟', 'چرا کارکنان شرکت را ترک می‌کنند؟'),
    dataset: { label: 'IBM HR Analytics Employee Attrition (Kaggle)', url: 'https://www.kaggle.com/datasets/pavansubhasht/ibm-hr-analytics-attrition-dataset', size: L('1,470 employees (fictional)', '1,470 موظفًا (بيانات خيالية)', '۱٬۴۷۰ کارمند (ساختگی)') },
    regression: L('MonthlyIncome vs. TotalWorkingYears', 'MonthlyIncome مقابل TotalWorkingYears', 'MonthlyIncome در برابر TotalWorkingYears'),
    test: L('Is attrition higher among employees who work overtime?', 'هل التسرّب أعلى بين الموظفين الذين يعملون ساعات إضافية؟', 'آیا ترک کار در میان کارکنانی که اضافه‌کاری دارند بیشتر است؟'),
    watchOut: L('Satisfaction and education are coded 1–5 and need labels; some columns have the same value in every row.', 'الرضا والتعليم مرمّزان من 1 إلى 5 ويحتاجان إلى تسميات؛ وبعض الأعمدة لها القيمة نفسها في كل الصفوف.', 'رضایت و تحصیلات با کد ۱ تا ۵ آمده‌اند و برچسب لازم دارند؛ بعضی ستون‌ها در همهٔ سطرها یک مقدار دارند.'),
  },
  {
    id: 'C5',
    name: L('Medical insurance costs', 'تكاليف التأمين الطبي', 'هزینه‌های بیمهٔ درمانی'),
    question: L('What drives a customer\'s insurance charges?', 'ما الذي يحدد رسوم التأمين للعميل؟', 'چه چیزی هزینهٔ بیمهٔ یک مشتری را تعیین می‌کند؟'),
    dataset: { label: 'Medical Cost Personal Datasets (Kaggle)', url: 'https://www.kaggle.com/datasets/mirichoi0218/insurance', size: L('1,338 people', '1,338 شخصًا', '۱٬۳۳۸ نفر') },
    regression: L('charges vs. age (and bmi)', 'charges مقابل age (وbmi)', 'charges در برابر age (و bmi)'),
    test: L('Do smokers pay higher charges than non-smokers?', 'هل يدفع المدخنون رسومًا أعلى من غير المدخنين؟', 'آیا افراد سیگاری بیشتر از غیرسیگاری‌ها می‌پردازند؟'),
    watchOut: L('Small and fairly clean: check for duplicate rows, and note that a few very large charges skew the average.', 'صغير ونظيف نسبيًا: تحقق من الصفوف المكررة، ولاحظ أن بضع رسوم كبيرة جدًا تحرف المتوسط.', 'کوچک و نسبتاً تمیز: سطرهای تکراری را بررسی کن و توجه کن چند هزینهٔ خیلی بزرگ میانگین را کج می‌کنند.'),
  },
  {
    id: 'C6',
    name: L('Hotel bookings and cancellations', 'حجوزات الفنادق والإلغاءات', 'رزرو هتل و لغوها'),
    question: L('Why are bookings cancelled, and when do rooms cost the most?', 'لماذا تُلغى الحجوزات، ومتى تكون الغرف أغلى؟', 'چرا رزروها لغو می‌شوند و اتاق‌ها کی گران‌ترند؟'),
    dataset: { label: 'Hotel booking demand (Kaggle)', url: 'https://www.kaggle.com/datasets/jessemostipak/hotel-booking-demand', size: L('≈ 119,000 bookings, two hotels', '≈ 119,000 حجز، فندقان', '≈ ۱۱۹٬۰۰۰ رزرو، دو هتل') },
    regression: L('Average daily rate (adr) vs. lead_time', 'متوسط السعر اليومي (adr) مقابل lead_time', 'نرخ روزانهٔ میانگین (adr) در برابر lead_time'),
    test: L('Is the cancellation rate higher at the City Hotel than at the Resort Hotel?', 'هل معدل الإلغاء أعلى في City Hotel منه في Resort Hotel؟', 'آیا نرخ لغو در City Hotel بیشتر از Resort Hotel است؟'),
    watchOut: L('"NULL" written as text, missing values in children, bookings with zero guests, extreme adr values; large file.', '"NULL" مكتوبة كنص، وقيم مفقودة في children، وحجوزات بلا ضيوف، وقيم adr متطرفة؛ ملف كبير.', '«NULL» به‌صورت متن، مقدارهای گمشده در children، رزروهای بدون مهمان، مقدارهای افراطی adr؛ فایل بزرگ.'),
  },
  {
    id: 'C7',
    name: L('Bank telemarketing', 'التسويق الهاتفي المصرفي', 'بازاریابی تلفنی بانک'),
    question: L('Which clients say yes to a term deposit?', 'أي العملاء يوافقون على وديعة لأجل؟', 'کدام مشتریان به سپردهٔ مدت‌دار جواب مثبت می‌دهند؟'),
    dataset: { label: 'Bank Marketing (UCI), file bank.csv', url: 'https://archive.ics.uci.edu/dataset/222/bank+marketing', size: L('4,521 clients in bank.csv (45,211 in bank-full.csv)', '4,521 عميلًا في bank.csv ‏(45,211 في bank-full.csv)', '۴٬۵۲۱ مشتری در bank.csv (۴۵٬۲۱۱ در bank-full.csv)') },
    regression: L('balance vs. age', 'balance مقابل age', 'balance در برابر age'),
    test: L('Do clients who said yes in an earlier campaign subscribe more often?', 'هل يشترك العملاء الذين وافقوا في حملة سابقة أكثر من غيرهم؟', 'آیا مشتریانی که در کمپین قبلی بله گفتند بیشتر مشترک می‌شوند؟'),
    watchOut: L('Semicolon-separated; "unknown" is used as a value (disguised missing).', 'مفصول بفواصل منقوطة؛ وتُستخدم "unknown" كقيمة (مفقود متنكّر).', 'با نقطه‌ویرگول جدا شده؛ «unknown» به‌عنوان مقدار آمده (گمشدهٔ پنهان).'),
  },
  {
    id: 'C8',
    name: L('Online retail customers', 'عملاء التجزئة الإلكترونية', 'مشتریان خرده‌فروشی آنلاین'),
    question: L('Who are the most valuable customers?', 'من هم العملاء الأعلى قيمة؟', 'باارزش‌ترین مشتریان چه کسانی‌اند؟'),
    dataset: { label: 'Online Retail (UCI)', url: 'https://archive.ics.uci.edu/dataset/352/online+retail', size: L('≈ 540,000 transaction lines, 2010–2011', '≈ 540,000 سطر معاملات، 2010–2011', '≈ ۵۴۰٬۰۰۰ ردیف تراکنش، ۲۰۱۰ تا ۲۰۱۱') },
    regression: L('Revenue per customer vs. number of orders', 'الإيراد لكل عميل مقابل عدد الطلبات', 'درآمد هر مشتری در برابر تعداد سفارش‌ها'),
    test: L('Is the average order value different for UK and non-UK customers?', 'هل يختلف متوسط قيمة الطلب بين عملاء المملكة المتحدة وغيرهم؟', 'آیا میانگین ارزش سفارش برای مشتریان بریتانیا و غیربریتانیا متفاوت است؟'),
    watchOut: L('Invoices starting with C are cancellations (negative quantities); check for rows without CustomerID; filter to a few months for Excel.', 'الفواتير التي تبدأ بالحرف C إلغاءات (كميات سالبة)؛ تحقق من الصفوف بلا CustomerID؛ صفِّ بضعة أشهر للعمل في Excel.', 'فاکتورهایی که با C شروع می‌شوند لغوشده‌اند (مقدار منفی)؛ سطرهای بدون CustomerID را بررسی کن؛ برای Excel چند ماه را فیلتر کن.'),
  },
]

const link = (c: CaseStudy) => `<a href="${c.dataset.url}" target="_blank" rel="noopener">${c.dataset.label}</a>`

const labels = {
  dataset: L('Dataset', 'البيانات', 'داده'),
  regression: L('Regression idea (Week 6)', 'فكرة الانحدار (الأسبوع 6)', 'ایدهٔ رگرسیون (هفتهٔ ۶)'),
  test: L('Hypothesis test idea (Week 7)', 'فكرة اختبار الفرضية (الأسبوع 7)', 'ایدهٔ آزمون فرض (هفتهٔ ۷)'),
  watchOut: L('Watch out for (Weeks 4–5)', 'انتبه إلى (الأسبوعان 4–5)', 'مراقب باش (هفته‌های ۴ و ۵)'),
}
type Lang = 'en' | 'ar' | 'fa'
const caseHtml = (c: CaseStudy, l: Lang) =>
  `<p><strong>${c.question[l]}</strong></p><ul>` +
  `<li><strong>${labels.dataset[l]}:</strong> ${link(c)} · ${c.dataset.size[l]}</li>` +
  `<li><strong>${labels.regression[l]}:</strong> ${c.regression[l]}</li>` +
  `<li><strong>${labels.test[l]}:</strong> ${c.test[l]}</li>` +
  `<li><strong>${labels.watchOut[l]}:</strong> ${c.watchOut[l]}</li></ul>`

/** One card per case study (a table with six columns is unreadable on a phone). */
export const caseBlocks: Block[] = caseStudies.map((c) => ({
  type: 'box',
  variant: 'example',
  label: L(`${c.id} · ${c.name.en}`, `${c.id} · ${c.name.ar}`, `${c.id} · ${c.name.fa}`),
  html: L(caseHtml(c, 'en'), caseHtml(c, 'ar'), caseHtml(c, 'fa')),
}))
