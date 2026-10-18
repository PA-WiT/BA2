// Authored for the React app. The static site (../../../../course) has no Week 5 page, question bank or i18n
// strings, and the Week 5 deck was not available, so nothing here is a mechanical migration. The outline comes
// from what Week 4 ("Before Week 5") and the Final Project page already promise: Excel import with the right
// delimiters and formats, validation rules, outliers and duplicates, fuzzy matching and lookups across tables,
// and a homework that cleans the pair's own dataset while keeping the raw file and a change log.
// Departures from a deck-style week, on purpose:
//  - One running example, the jam stand's first wholesale order export (public/data/jam-wholesale-raw.csv, 26
//    rows, `;`-separated, decimal commas, day-first dates, UTF-8 accents) plus a customer list. It plants every
//    problem the week teaches, and cleans to 23 rows. Every number quoted below was computed from those files.
//  - Excel is the main tool. Python (pandas) and Power Query sit beside it in tabs, as in Weeks 3-4; Python cells
//    are in week05Code.ts and public/notebooks/week-05-data-cleaning.ipynb (regenerate it if they change).
//  - Fuzzy-match scores quoted for Python are difflib's; Power Query scores differ, so the text teaches the review
//    habit, not a magic threshold. Power Query (M) snippets were not run (no Excel here): see week05Code.ts.
// ar/fa are draft translations awaiting native review, like the earlier weeks. Code and formulas stay English.
import type { Block, Question, Week } from '../types'
import { week05Homework } from './homework/week-05'
import { m, py, xl } from './week05Code'

const notebookUrl =
  'https://colab.research.google.com/github/PA-WiT/BA2/blob/main/public/notebooks/week-05-data-cleaning.ipynb'

const t = (en: string, ar: string, fa: string) => ({ en, ar, fa })
const q = t

const questions: Question[] = [
  {
    id: 'w05-q001',
    weekId: 'week-05',
    topic: 'welcome',
    answer: 1,
    prompt: q(
      'You double-click jam-wholesale-raw.csv and every row lands in column A, with semicolons between the values. What is the real problem?',
      'تنقر مرتين على jam-wholesale-raw.csv فتقع كل الصفوف في العمود A وبين القيم فواصل منقوطة. ما المشكلة الحقيقية؟',
      'روی jam-wholesale-raw.csv دوبار کلیک می‌کنی و همهٔ سطرها در ستون A می‌نشینند و میان مقدارها نقطه‌ویرگول است. مشکل واقعی چیست؟',
    ),
    options: [
      q('The file is corrupted, so ask the till for a new export', 'الملف تالف، لذا اطلب تصديرًا جديدًا من جهاز الدفع', 'فایل خراب است، پس از صندوق یک خروجی جدید بخواه'),
      q(
        'Excel guessed the delimiter from your computer\'s settings and guessed wrong; import the file and choose Semicolon',
        'خمّن Excel الفاصل من إعدادات حاسوبك وأخطأ؛ استورد الملف واختر Semicolon',
        'Excel جداکننده را از تنظیمات رایانه‌ات حدس زده و اشتباه حدس زده؛ فایل را وارد کن و Semicolon را انتخاب کن',
      ),
      q('Column A is too narrow; widen it and the values will separate', 'العمود A ضيق جدًا؛ وسّعه وستنفصل القيم', 'ستون A خیلی باریک است؛ پهنش کن تا مقدارها جدا شوند'),
    ],
  },
  {
    id: 'w05-q002',
    weekId: 'week-05',
    topic: 'workflow',
    answer: 1,
    prompt: q(
      'Why does the cleaning workflow keep a raw sheet that nobody edits?',
      'لماذا يحتفظ سير عمل التنظيف بورقة خام لا يعدّلها أحد؟',
      'چرا روال پاک‌سازی یک برگهٔ خام نگه می‌دارد که کسی ویرایشش نمی‌کند؟',
    ),
    options: [
      q('So Excel calculates the helper columns faster', 'ليحسب Excel الأعمدة المساعدة بسرعة أكبر', 'تا Excel ستون‌های کمکی را سریع‌تر حساب کند'),
      q(
        'So every change can be checked against the original, and redone if it was wrong',
        'ليمكن التحقق من كل تغيير مقابل الأصل، وإعادته إن كان خاطئًا',
        'تا هر تغییر با اصل سنجیده شود و اگر اشتباه بود دوباره انجام شود',
      ),
      q('Because validation rules only work on a second sheet', 'لأن قواعد التحقق لا تعمل إلا على ورقة ثانية', 'چون قاعده‌های اعتبارسنجی فقط روی برگهٔ دوم کار می‌کنند'),
    ],
  },
  {
    id: 'w05-q003',
    weekId: 'week-05',
    topic: 'importing',
    answer: 1,
    prompt: q(
      'Postcode 02134 shows as 2134 after you double-click the file. What is the best fix?',
      'يظهر الرمز البريدي 02134 كـ 2134 بعد النقر المزدوج على الملف. ما أفضل حل؟',
      'کد پستی 02134 پس از دوبار کلیک روی فایل به شکل 2134 دیده می‌شود. بهترین راه اصلاح چیست؟',
    ),
    options: [
      q('Type the missing zeros back by hand in every affected cell', 'اكتب الأصفار الناقصة يدويًا في كل خلية متأثرة', 'صفرهای گم‌شده را دستی در هر خانهٔ آسیب‌دیده دوباره بنویس'),
      q(
        'Import the file again and set the postcode column to Text before loading',
        'استورد الملف مجددًا واضبط عمود الرمز البريدي على Text قبل التحميل',
        'فایل را دوباره وارد کن و پیش از بارگذاری نوع ستون کد پستی را روی Text بگذار',
      ),
      q('Format the column as Number with 0 decimals', 'نسّق العمود كـ Number بلا كسور عشرية', 'ستون را با قالب Number و بدون رقم اعشار قالب‌بندی کن'),
    ],
  },
  {
    id: 'w05-q004',
    weekId: 'week-05',
    topic: 'importing',
    answer: 2,
    prompt: q(
      'After importing, "Café Rosé" reads "CafÃ© RosÃ©". Which setting was wrong?',
      'بعد الاستيراد يظهر "Café Rosé" على شكل "CafÃ© RosÃ©". أي إعداد كان خاطئًا؟',
      'پس از وارد کردن، «Café Rosé» به شکل «CafÃ© RosÃ©» دیده می‌شود. کدام تنظیم اشتباه بود؟',
    ),
    options: [
      q('Delimiter', 'Delimiter (الفاصل)', 'Delimiter (جداکننده)'),
      q('Data Type Detection', 'Data Type Detection (اكتشاف أنواع البيانات)', 'Data Type Detection (تشخیص نوع داده)'),
      q(
        'File Origin: it should be 65001: Unicode (UTF-8)',
        'File Origin: يجب أن يكون 65001: Unicode (UTF-8)',
        'File Origin: باید 65001: Unicode (UTF-8) باشد',
      ),
    ],
  },
  {
    id: 'w05-q005',
    weekId: 'week-05',
    topic: 'text-cleaning',
    answer: 0,
    prompt: q(
      'Order 1016\'s customer looks like "Farm Shop Direct" and =LEN(B2)-LEN(TRIM(B2)) returns 0, yet VLOOKUP finds no match. What is most likely hiding in the text?',
      'يبدو عميل الطلب 1016 كـ "Farm Shop Direct" والمعادلة =LEN(B2)-LEN(TRIM(B2)) تعطي 0، ومع ذلك لا يجد VLOOKUP تطابقًا. ما الأرجح أنه مختبئ في النص؟',
      'مشتری سفارش ۱۰۱۶ مثل «Farm Shop Direct» دیده می‌شود و =LEN(B2)-LEN(TRIM(B2)) برابر ۰ است، با این حال VLOOKUP تطابقی پیدا نمی‌کند. بیشتر احتمال دارد چه چیزی در متن پنهان باشد؟',
    ),
    options: [
      q(
        'A non-breaking space (code 160), which TRIM does not remove',
        'مسافة غير قابلة للكسر (الرمز 160) لا يزيلها TRIM',
        'یک فاصلهٔ ناشکن (کد ۱۶۰) که TRIM آن را حذف نمی‌کند',
      ),
      q('A capital letter, because VLOOKUP is case-sensitive', 'حرف كبير، لأن VLOOKUP حساس لحالة الأحرف', 'یک حرف بزرگ، چون VLOOKUP به بزرگی و کوچکی حروف حساس است'),
      q('A formula error in the customer list', 'خطأ في معادلة في قائمة العملاء', 'یک خطای فرمول در فهرست مشتری‌ها'),
    ],
  },
  {
    id: 'w05-q006',
    weekId: 'week-05',
    topic: 'numbers-dates',
    answer: 2,
    prompt: q(
      'What does =NUMBERVALUE("5.00", ",", ".") return? (The decimal separator is the comma, the group separator is the dot.)',
      'ماذا تُرجع =NUMBERVALUE("5.00", ",", ".")؟ (الفاصل العشري هو الفاصلة، وفاصل المجموعات هو النقطة.)',
      '=NUMBERVALUE("5.00", ",", ".") چه برمی‌گرداند؟ (جداکنندهٔ اعشار ویرگول و جداکنندهٔ هزارگان نقطه است.)',
    ),
    options: [
      q('5', '5', '۵'),
      q('#VALUE!', '#VALUE!', '#VALUE!'),
      q('500, because the dot is read as a thousands separator', '500، لأن النقطة تُقرأ كفاصل للآلاف', '۵۰۰، چون نقطه به‌عنوان جداکنندهٔ هزارگان خوانده می‌شود'),
    ],
  },
  {
    id: 'w05-q007',
    weekId: 'week-05',
    topic: 'numbers-dates',
    answer: 0,
    prompt: q(
      'A computer with US regional settings converts the text 03/06/2024 (written day/month/year) using DATEVALUE. Which date does it get?',
      'حاسوب بإعدادات إقليمية أمريكية يحوّل النص 03/06/2024 (المكتوب يوم/شهر/سنة) باستخدام DATEVALUE. أي تاريخ يحصل عليه؟',
      'رایانه‌ای با تنظیمات منطقه‌ای آمریکا متن 03/06/2024 (نوشته‌شده به‌صورت روز/ماه/سال) را با DATEVALUE تبدیل می‌کند. چه تاریخی به دست می‌آورد؟',
    ),
    options: [
      q('6 March 2024', '6 مارس 2024', '۶ مارس ۲۰۲۴'),
      q('3 June 2024', '3 يونيو 2024', '۳ ژوئن ۲۰۲۴'),
      q('An error, because it is not a date', 'خطأ، لأنه ليس تاريخًا', 'خطا، چون تاریخ نیست'),
    ],
  },
  {
    id: 'w05-q008',
    weekId: 'week-05',
    topic: 'validation',
    answer: 1,
    prompt: q(
      'Which statement about Data Validation is true?',
      'أي عبارة عن Data Validation صحيحة؟',
      'کدام جمله دربارهٔ Data Validation درست است؟',
    ),
    options: [
      q('It repairs invalid values that are already in the sheet', 'يصلح القيم غير الصالحة الموجودة أصلًا في الورقة', 'مقدارهای نامعتبری را که از قبل در برگه هستند اصلاح می‌کند'),
      q(
        'Circle Invalid Data can mark values already in the sheet, but it changes nothing, and pasted values can skip the rules',
        'يمكن لـ Circle Invalid Data تعليم القيم الموجودة في الورقة، لكنه لا يغيّر شيئًا، ويمكن للقيم الملصوقة أن تتجاوز القواعد',
        'Circle Invalid Data می‌تواند مقدارهای موجود در برگه را علامت بزند اما چیزی را تغییر نمی‌دهد، و مقدارهای چسبانده‌شده می‌توانند از قاعده‌ها رد شوند',
      ),
      q('It blocks every wrong value, including ones pasted from another file', 'يمنع كل قيمة خاطئة، بما فيها الملصوقة من ملف آخر', 'هر مقدار اشتباهی را مسدود می‌کند، حتی مقدارهای چسبانده‌شده از فایل دیگر'),
    ],
  },
  {
    id: 'w05-q009',
    weekId: 'week-05',
    topic: 'duplicates',
    answer: 2,
    prompt: q(
      'Remove Duplicates on the raw sheet removes 1 row, yet 2 orders were entered twice. Why did it miss one?',
      'تزيل Remove Duplicates صفًا واحدًا من الورقة الخام، مع أن طلبين أُدخلا مرتين. لماذا فاتها أحدهما؟',
      'Remove Duplicates روی برگهٔ خام ۱ سطر را حذف می‌کند، در حالی که ۲ سفارش دوبار وارد شده‌اند. چرا یکی را از دست داد؟',
    ),
    options: [
      q('It only ever removes one row per run', 'لا تزيل إلا صفًا واحدًا في كل تشغيل', 'در هر اجرا فقط یک سطر را حذف می‌کند'),
      q('It compares only the first column', 'تقارن العمود الأول فقط', 'فقط ستون اول را مقایسه می‌کند'),
      q(
        'The copy of order 1007 has a trailing space in the customer name, so the text is not identical until TRIM has cleaned it',
        'نسخة الطلب 1007 فيها مسافة زائدة في اسم العميل، فلا يتطابق النص حتى يُنظَّف بـ TRIM',
        'نسخهٔ سفارش ۱۰۰۷ در نام مشتری یک فاصلهٔ اضافه دارد، پس متن تا وقتی TRIM تمیزش نکند یکسان نیست',
      ),
    ],
  },
  {
    id: 'w05-q010',
    weekId: 'week-05',
    topic: 'outliers',
    answer: 1,
    prompt: q(
      'The upper fence for jars is 96 and order 1018 has 360. What do you do first?',
      'الحد الأعلى للبرطمانات هو 96 والطلب 1018 فيه 360. ماذا تفعل أولًا؟',
      'حد بالای شیشه‌ها ۹۶ است و سفارش ۱۰۱۸ مقدار ۳۶۰ دارد. اول چه می‌کنی؟',
    ),
    options: [
      q('Delete the row: outliers are errors', 'احذف الصف: القيم المتطرفة أخطاء', 'سطر را حذف کن: داده‌های پرت خطا هستند'),
      q(
        'Check the source (the invoice or the owner): 360 may be a typo for 36 or a real big order',
        'تحقق من المصدر (الفاتورة أو المالك): قد تكون 360 خطأً مطبعيًا عن 36 أو طلبًا كبيرًا حقيقيًا',
        'منبع را بررسی کن (فاکتور یا صاحب غرفه): ۳۶۰ ممکن است غلط تایپی ۳۶ باشد یا یک سفارش بزرگ واقعی',
      ),
      q('Replace it with the mean, 62.09', 'استبدلها بالمتوسط 62.09', 'آن را با میانگین، ۶۲٫۰۹، جایگزین کن'),
    ],
  },
  {
    id: 'w05-q011',
    weekId: 'week-05',
    topic: 'lookups',
    answer: 0,
    prompt: q(
      'VLOOKUP(..., FALSE) returns #N/A for 4 of the 23 clean orders. What is the right reaction?',
      'يُرجع VLOOKUP(..., FALSE) القيمة #N/A لأربعة من 23 طلبًا نظيفًا. ما رد الفعل الصحيح؟',
      'VLOOKUP(..., FALSE) برای ۴ سفارش از ۲۳ سفارش تمیز #N/A برمی‌گرداند. واکنش درست چیست؟',
    ),
    options: [
      q(
        'Find why those customer names differ from the list, fix or map them, and look up again',
        'اعرف لماذا تختلف أسماء هؤلاء العملاء عن القائمة، وأصلحها أو اربطها، ثم ابحث مجددًا',
        'بفهم چرا نام این مشتری‌ها با فهرست فرق دارد، اصلاح یا نگاشتشان کن و دوباره جست‌وجو کن',
      ),
      q('Wrap the formula in IFERROR(..., "") so the sheet looks clean', 'غلّف المعادلة بـ IFERROR(..., "") ليبدو الجدول نظيفًا', 'فرمول را در IFERROR(..., "") بپیچ تا برگه تمیز به نظر برسد'),
      q('Drop FALSE so VLOOKUP uses an approximate match and finds something', 'احذف FALSE ليستخدم VLOOKUP مطابقة تقريبية ويجد شيئًا', 'FALSE را بردار تا VLOOKUP از تطابق تقریبی استفاده کند و چیزی پیدا کند'),
    ],
  },
  {
    id: 'w05-q012',
    weekId: 'week-05',
    topic: 'fuzzy-matching',
    answer: 2,
    prompt: q(
      'A fuzzy match proposes "Greengrocer Ltd." → "Green Grocer Ltd" (0.94) and also "Greenfield Grocer Ltd" (0.81). What do you do?',
      'يقترح التطابق التقريبي "Greengrocer Ltd." ← "Green Grocer Ltd" (0.94) وأيضًا "Greenfield Grocer Ltd" (0.81). ماذا تفعل؟',
      'تطابق فازی «Greengrocer Ltd.» ← «Green Grocer Ltd» (۰٫۹۴) و همچنین «Greenfield Grocer Ltd» (۰٫۸۱) را پیشنهاد می‌دهد. چه می‌کنی؟',
    ),
    options: [
      q('Accept both, since both are above 0.8', 'اقبل الاثنين، فكلاهما فوق 0.8', 'هر دو را بپذیر، چون هر دو بالای ۰٫۸ هستند'),
      q('Lower the threshold to 0.6 so nothing is missed', 'اخفض العتبة إلى 0.6 حتى لا يفوتك شيء', 'آستانه را به ۰٫۶ کاهش بده تا چیزی از دست نرود'),
      q(
        'Accept the closest, check it by eye, and save the approved pair in a mapping table',
        'اقبل الأقرب، وراجعه بعينك، واحفظ الزوج المعتمد في جدول ربط',
        'نزدیک‌ترین را بپذیر، با چشم بررسی کن و جفت تأییدشده را در یک جدول نگاشت نگه دار',
      ),
    ],
  },
  {
    id: 'w05-q013',
    weekId: 'week-05',
    topic: 'tools-and-ai',
    answer: 0,
    prompt: q(
      'An AI assistant says "Done: 24 clean rows", but your cleaned table has 23. What is the first step?',
      'يقول مساعد ذكاء اصطناعي "تم: 24 صفًا نظيفًا"، لكن جدولك النظيف فيه 23. ما الخطوة الأولى؟',
      'یک دستیار هوش مصنوعی می‌گوید «تمام شد: ۲۴ سطر تمیز»، اما جدول تمیز تو ۲۳ سطر دارد. گام اول چیست؟',
    ),
    options: [
      q(
        'Find the row it treated differently, using your change log, before using its result',
        'اعرف الصف الذي عامله بشكل مختلف باستخدام سجل التغييرات، قبل استخدام نتيجته',
        'پیش از استفاده از نتیجه، با کمک گزارش تغییرات بفهم کدام سطر را متفاوت رفتار کرده',
      ),
      q('Trust it: the AI saw something you missed', 'ثق به: رأى الذكاء الاصطناعي شيئًا فاتك', 'به آن اعتماد کن: هوش مصنوعی چیزی دیده که تو ندیدی'),
      q('Ask it again until it says 23', 'اسأله مجددًا حتى يقول 23', 'دوباره بپرس تا بگوید ۲۳'),
    ],
  },
]

/** The same step in three tools; every variant renders stacked (see the migrate-week-content skill). */
const toolTabs = (excel: Block[], python: Block[], powerQuery: Block[]): Block => ({
  type: 'tabs',
  tabs: [
    { label: t('Excel', 'Excel', 'Excel'), blocks: excel },
    { label: t('Python (Colab)', 'Python ‏(Colab)', 'Python ‏(Colab)'), blocks: python },
    { label: t('Power Query', 'Power Query', 'Power Query'), blocks: powerQuery },
  ],
})

const code = (c: string): Block => ({ type: 'code', code: c })
const html = (en: string, ar: string, fa: string): Block => ({ type: 'html', html: t(en, ar, fa) })

// The first lines of the export, exactly as the till writes them.
const rawHead = `order_id;customer;order_date;flavor;jars;unit_price;postcode
1001;Green Grocer Ltd;03/06/2024;Strawberry;60;5,00;02134
1002;Cafe Rose;03/06/2024;Blueberry;36;6,00;10115
1003;Harbour Market;04/06/2024;Peach;48;4,00;20457
1004;Farm Shop Direct;05/06/2024;strawberry;72;5,00;02138
1005; Sunny Deli ;05/06/2024;Lemon;24;4,50;10117`

type Sections = Week['sections']

// ---------- Sections 1-3: why, workflow, importing ----------
const intro: Sections = [
  {
    id: 'welcome',
    navLabel: t('Welcome', 'ترحيب', 'خوش‌آمدید'),
    sectionLabel: t('Section 01', 'القسم ٠١', 'بخش ۰۱'),
    timeEst: t('6 min', '٦ دقائق', '۶ دقیقه'),
    headingHtml: t(
      '<h2>Welcome: a file that opens is not a file that loaded</h2><p class="standfirst">The jam stand now sells wholesale to shops, and the till exports every order as a CSV file. Double-click it and Excel opens it without a single error message, with every row crammed into column A. Week 4 taught you what to look for. This week you clean it in Excel, step by step.</p>',
      '<h2>ترحيب: الملف الذي يُفتح ليس ملفًا تم تحميله</h2><p class="standfirst">يبيع كشك المربى الآن بالجملة للمتاجر، ويصدّر جهاز الدفع كل طلب في ملف CSV. انقر عليه مرتين فيفتحه Excel دون أي رسالة خطأ، وكل الصفوف مكدّسة في العمود A. علّمك الأسبوع 4 ما تبحث عنه. هذا الأسبوع تنظّفه في Excel خطوة بخطوة.</p>',
      '<h2>خوش‌آمدید: فایلی که باز می‌شود، فایلی نیست که درست بارگذاری شده باشد</h2><p class="standfirst">غرفهٔ مربا حالا به فروشگاه‌ها عمده‌فروشی می‌کند و صندوق هر سفارش را در یک فایل CSV خروجی می‌گیرد. دوبار روی آن کلیک کن: Excel بدون هیچ پیام خطایی بازش می‌کند و همهٔ سطرها در ستون A فشرده شده‌اند. هفتهٔ ۴ یاد داد دنبال چه بگردی. این هفته آن را در Excel گام‌به‌گام تمیز می‌کنی.</p>',
    ),
    blocks: [
      {
        type: 'objectives',
        label: t("By the end, you'll be able to", 'بنهاية هذا القسم ستكون قادرًا على', 'در پایان این بخش می‌توانی'),
        items: [
          t('Import a CSV with the right delimiter, encoding and column types', 'استيراد ملف CSV بالفاصل والترميز وأنواع الأعمدة الصحيحة', 'یک فایل CSV را با جداکننده، کدگذاری و نوع ستون‌های درست وارد کنی'),
          t('Clean text, numbers and dates that Excel reads as the wrong thing', 'تنظيف النصوص والأرقام والتواريخ التي يقرؤها Excel خطأً', 'متن، عدد و تاریخی را که Excel اشتباه می‌خواند تمیز کنی'),
          t('Write validation rules and circle the values that break them', 'كتابة قواعد تحقق وتطويق القيم التي تخالفها', 'قاعده‌های اعتبارسنجی بنویسی و مقدارهای متخلف را دور بزنی'),
          t('Find duplicates and outliers, and decide what to do about each', 'إيجاد التكرارات والقيم المتطرفة وتقرير ما يُفعل مع كل منها', 'تکرارها و داده‌های پرت را پیدا کنی و درباره‌ٔ هر کدام تصمیم بگیری'),
          t('Match records across two tables, exactly and with fuzzy matching', 'مطابقة السجلات بين جدولين، بدقة وبالمطابقة التقريبية', 'رکوردهای دو جدول را هم دقیق و هم با تطابق فازی به هم وصل کنی'),
          t('Keep the raw file and a change log, so every fix can be checked', 'الاحتفاظ بالملف الخام وسجل التغييرات ليمكن التحقق من كل إصلاح', 'فایل خام و گزارش تغییرات را نگه داری تا هر اصلاح قابل بررسی باشد'),
        ],
      },
      html(
        `<p>Two small files carry this whole week. Download both and follow along in your own Excel: <a href="/data/jam-wholesale-raw.csv" download>jam-wholesale-raw.csv</a> (the 26-row order export) and <a href="/data/jam-customers.csv" download>jam-customers.csv</a> (the 7 customers and their regions). This is how the till wrote the first lines. Notice the semicolons, the decimal commas, and the day-first dates.</p>`,
        `<p>ملفان صغيران يحملان هذا الأسبوع كله. نزّلهما وتابع في Excel الخاص بك: <a href="/data/jam-wholesale-raw.csv" download>jam-wholesale-raw.csv</a> (تصدير الطلبات من 26 صفًا) و<a href="/data/jam-customers.csv" download>jam-customers.csv</a> (العملاء السبعة ومناطقهم). هكذا كتب جهاز الدفع الأسطر الأولى. لاحظ الفواصل المنقوطة والفواصل العشرية والتواريخ التي يسبق فيها اليوم الشهر.</p>`,
        `<p>دو فایل کوچک کل این هفته را پیش می‌برند. هر دو را دانلود کن و در Excel خودت دنبال کن: <a href="/data/jam-wholesale-raw.csv" download>jam-wholesale-raw.csv</a> (خروجی ۲۶ سطری سفارش‌ها) و <a href="/data/jam-customers.csv" download>jam-customers.csv</a> (۷ مشتری و منطقه‌شان). صندوق خط‌های اول را این‌طور نوشته است. به نقطه‌ویرگول‌ها، ویرگول اعشاری و تاریخ‌هایی که روز را اول می‌نویسند دقت کن.</p>`,
      ),
      code(rawHead),
      {
        type: 'box',
        variant: 'keypoint',
        label: t('Bridge from Week 4', 'جسر من الأسبوع 4', 'پل از هفتهٔ ۴'),
        html: t(
          '<p>Week 4 gave you the questions: profile the data, list what is wrong, plan the fixes. Your Week 4 cleaning plan is this week\'s checklist, and this week\'s skill is carrying it out in Excel without damaging a real sale on the way.</p>',
          '<p>أعطاك الأسبوع 4 الأسئلة: افحص البيانات، واسرد ما فيها من خلل، وخطّط للإصلاحات. خطة التنظيف من الأسبوع 4 هي قائمة التحقق لهذا الأسبوع، ومهارة هذا الأسبوع هي تنفيذها في Excel دون إفساد أي عملية بيع حقيقية.</p>',
          '<p>هفتهٔ ۴ سؤال‌ها را به تو داد: داده را پروفایل کن، مشکل‌ها را فهرست کن، اصلاح‌ها را برنامه‌ریزی کن. برنامهٔ پاک‌سازی هفتهٔ ۴ فهرست کنترل این هفته است و مهارت این هفته اجرای آن در Excel است، بدون اینکه در راه به یک فروش واقعی آسیب بزنی.</p>',
        ),
      },
      { type: 'exercise', questionId: 'w05-q001' },
    ],
  },
  {
    id: 'workflow',
    navLabel: t('The workflow', 'سير العمل', 'روال کار'),
    sectionLabel: t('Section 02', 'القسم ٠٢', 'بخش ۰۲'),
    timeEst: t('7 min', '٧ دقائق', '۷ دقیقه'),
    headingHtml: t(
      '<h2>The workflow: never edit the only copy</h2><p class="standfirst">A cleaning job in Excel is six steps in a fixed order, done on a copy, with a log. The order matters: each step makes the next one possible, and a step done too early can hide the problem the next step needs to see.</p>',
      '<h2>سير العمل: لا تعدّل النسخة الوحيدة</h2><p class="standfirst">مهمة التنظيف في Excel ست خطوات بترتيب ثابت، تُنفَّذ على نسخة ومعها سجل. الترتيب مهم: كل خطوة تجعل التالية ممكنة، وخطوة تُنفَّذ مبكرًا قد تخفي المشكلة التي تحتاج الخطوة التالية إلى رؤيتها.</p>',
      '<h2>روال کار: هرگز تنها نسخه را ویرایش نکن</h2><p class="standfirst">یک کار پاک‌سازی در Excel شش گام با ترتیب ثابت است که روی یک کپی و همراه با یک گزارش انجام می‌شود. ترتیب مهم است: هر گام گام بعدی را ممکن می‌کند و گامی که زودتر از موعد انجام شود می‌تواند مشکلی را که گام بعد باید ببیند پنهان کند.</p>',
    ),
    blocks: [
      {
        type: 'diagram',
        fig: t('Figure 1', 'الشكل 1', 'شکل ۱'),
        title: t('The six cleaning steps, from the raw sheet to the clean sheet and its log', 'خطوات التنظيف الست، من الورقة الخام إلى الورقة النظيفة وسجلها', 'شش گام پاک‌سازی، از برگهٔ خام تا برگهٔ تمیز و گزارشش'),
        src: '/figures/week-05/diagram-01.svg',
        alt: 'Six boxes in a snake: raw sheet, import, text and types, validate, copies and outliers, match. An arrow leads to the result: a clean sheet of 23 rows with a change log.',
        caption: t(
          'The raw sheet is read-only from step 1. Everything after it happens on a working copy, and every change is written to the log with its reason.',
          'الورقة الخام للقراءة فقط منذ الخطوة 1. كل ما بعدها يحدث على نسخة عمل، ويُكتب كل تغيير في السجل مع سببه.',
          'برگهٔ خام از گام ۱ فقط‌خواندنی است. هر چه بعد از آن می‌آید روی یک کپی کاری انجام می‌شود و هر تغییر با دلیلش در گزارش نوشته می‌شود.',
        ),
      },
      html(
        '<h3>Four sheets, one rule each</h3><p>Keep the work in one workbook with these sheets. The change log is not paperwork: it is how you (and your mentor) check a fix later, and how you rerun the cleaning if the till sends a corrected file.</p>',
        '<h3>أربع أوراق، لكل منها قاعدة واحدة</h3><p>احتفظ بالعمل في مصنف واحد بهذه الأوراق. سجل التغييرات ليس أعمالًا ورقية: بل هو الطريقة التي تتحقق بها أنت (ويتحقق بها مرشدك) من إصلاح لاحقًا، والطريقة التي تعيد بها التنظيف إذا أرسل الجهاز ملفًا مصحَّحًا.</p>',
        '<h3>چهار برگه، هر کدام با یک قاعده</h3><p>کار را در یک فایل Excel با این برگه‌ها نگه دار. گزارش تغییرات کاغذبازی نیست: راهی است که خودت (و منتورت) بعداً یک اصلاح را بسنجی و اگر صندوق فایل اصلاح‌شده فرستاد، پاک‌سازی را دوباره اجرا کنی.</p>',
      ),
      {
        type: 'table',
        headers: [t('Sheet', 'الورقة', 'برگه'), t('What lives there', 'ما يوجد فيها', 'چه چیزی در آن است'), t('The rule', 'القاعدة', 'قاعده')],
        rows: [
          [t('<code>raw</code>', '<code>raw</code>', '<code>raw</code>'), t('The import, exactly as exported', 'ما تم استيراده كما صُدِّر تمامًا', 'خروجی وارد‌شده، دقیقاً همان‌طور که صادر شده'), t('Never edited, never sorted', 'لا يُعدَّل ولا يُرتَّب أبدًا', 'هرگز ویرایش یا مرتب نمی‌شود')],
          [t('<code>work</code>', '<code>work</code>', '<code>work</code>'), t('A copy of <code>raw</code> plus helper columns', 'نسخة من <code>raw</code> مع أعمدة مساعدة', 'کپی <code>raw</code> به‌همراه ستون‌های کمکی'), t('Fix here, one helper column per fix', 'أصلح هنا، عمودًا مساعدًا لكل إصلاح', 'اینجا اصلاح کن، برای هر اصلاح یک ستون کمکی')],
          [t('<code>Customers</code>', '<code>Customers</code>', '<code>Customers</code>'), t('The customer list used for lookups', 'قائمة العملاء المستخدمة في البحث', 'فهرست مشتری‌ها برای جست‌وجو'), t('Clean it too: both sides of a lookup', 'نظّفها أيضًا: طرفا البحث معًا', 'آن را هم تمیز کن: هر دو طرف جست‌وجو')],
          [t('<code>log</code>', '<code>log</code>', '<code>log</code>'), t('order_id, column, from, to, reason, who confirmed', 'order_id والعمود ومن وإلى والسبب ومن أكّد', 'order_id، ستون، از، به، دلیل، تأییدکننده'), t('One line per change, written as you go', 'سطر لكل تغيير، يُكتب أثناء العمل', 'برای هر تغییر یک خط، همان لحظه نوشته می‌شود')],
        ],
      },
      html(
        '<p>The formulas in this lesson all refer to one layout, so you can copy them. On <code>raw</code> and <code>work</code>, columns A to G hold the export, and the helper columns follow:</p>',
        '<p>كل المعادلات في هذا الدرس تشير إلى تخطيط واحد، فيمكنك نسخها. في <code>raw</code> و<code>work</code> تحمل الأعمدة من A إلى G التصدير، وتتبعها الأعمدة المساعدة:</p>',
        '<p>همهٔ فرمول‌های این درس به یک چیدمان اشاره می‌کنند تا بتوانی کپی‌شان کنی. در <code>raw</code> و <code>work</code> ستون‌های A تا G خروجی هستند و ستون‌های کمکی بعد از آن‌ها می‌آیند:</p>',
      ),
      code(`A order_id   B customer   C order_date   D flavor   E jars   F unit_price   G postcode
H customer_clean   I flavor_clean   J date   K price   L copy_no   M region   N customer_final   O region_final`),
      {
        type: 'box',
        variant: 'analogy',
        label: t('Analogy', 'تشبيه', 'تشبیه'),
        html: t(
          '<p>It is a lab notebook. A chemist never pours the original sample into the experiment: they take a portion, write down every step, and keep the rest. If the result looks wrong, anyone can go back to the sample and the notes and see why.</p>',
          '<p>إنه دفتر مختبر. لا يصبّ الكيميائي العيّنة الأصلية في التجربة: يأخذ جزءًا منها، ويدوّن كل خطوة، ويحتفظ بالباقي. وإن بدت النتيجة خاطئة، يستطيع أي شخص أن يعود إلى العيّنة والملاحظات ويرى السبب.</p>',
          '<p>مثل دفتر آزمایشگاه است. شیمی‌دان هرگز نمونهٔ اصلی را در آزمایش نمی‌ریزد: بخشی از آن را برمی‌دارد، هر گام را می‌نویسد و بقیه را نگه می‌دارد. اگر نتیجه غلط به نظر برسد، هر کسی می‌تواند به نمونه و یادداشت‌ها برگردد و دلیلش را ببیند.</p>',
        ),
      },
      { type: 'exercise', questionId: 'w05-q002' },
    ],
  },
  {
    id: 'importing',
    navLabel: t('Importing', 'الاستيراد', 'وارد کردن داده'),
    sectionLabel: t('Section 03', 'القسم ٠٣', 'بخش ۰۳'),
    timeEst: t('10 min', '١٠ دقائق', '۱۰ دقیقه'),
    headingHtml: t(
      '<h2>Importing: tell Excel how the file is built</h2><p class="standfirst">Double-clicking a CSV makes Excel guess the delimiter, the encoding, the number format and the date order. The guesses come from your computer\'s regional settings, not from the file. Importing lets you say it out loud instead.</p>',
      '<h2>الاستيراد: أخبر Excel كيف بُني الملف</h2><p class="standfirst">النقر المزدوج على ملف CSV يجعل Excel يخمّن الفاصل والترميز وتنسيق الأرقام وترتيب التاريخ. وتأتي التخمينات من الإعدادات الإقليمية لحاسوبك، لا من الملف. أما الاستيراد فيتيح لك أن تقولها صراحة.</p>',
      '<h2>وارد کردن: به Excel بگو فایل چطور ساخته شده</h2><p class="standfirst">دوبار کلیک روی یک CSV باعث می‌شود Excel جداکننده، کدگذاری، قالب عدد و ترتیب تاریخ را حدس بزند. این حدس‌ها از تنظیمات منطقه‌ای رایانهٔ تو می‌آیند، نه از فایل. وارد کردن به تو اجازه می‌دهد همه را صریح بگویی.</p>',
    ),
    blocks: [
      {
        type: 'table',
        headers: [t('Setting', 'الإعداد', 'تنظیم'), t('What goes wrong with this file', 'ما الذي يفسد مع هذا الملف', 'با این فایل چه چیزی خراب می‌شود'), t('What to choose', 'ما تختاره', 'چه چیزی انتخاب کنی')],
        rows: [
          [t('Delimiter', 'الفاصل', 'جداکننده'), t('All 7 fields land in column A', 'تقع الحقول السبعة كلها في العمود A', 'هر ۷ فیلد در ستون A می‌نشینند'), t('Semicolon', 'Semicolon', 'Semicolon')],
          [t('File Origin (encoding)', 'أصل الملف (الترميز)', 'File Origin (کدگذاری)'), t('<code>CafÃ© RosÃ©</code> instead of <code>Café Rosé</code>', '<code>CafÃ© RosÃ©</code> بدل <code>Café Rosé</code>', '<code>CafÃ© RosÃ©</code> به‌جای <code>Café Rosé</code>'), t('65001: Unicode (UTF-8)', '65001: Unicode (UTF-8)', '65001: Unicode (UTF-8)')],
          [t('Column type', 'نوع العمود', 'نوع ستون'), t('Postcode <code>02134</code> becomes the number <code>2134</code>: the zero is gone for good', 'يصبح الرمز البريدي <code>02134</code> الرقم <code>2134</code>: يضيع الصفر نهائيًا', 'کد پستی <code>02134</code> به عدد <code>2134</code> تبدیل می‌شود: صفر برای همیشه از دست رفته'), t('Text, set before loading', 'Text، يُضبط قبل التحميل', 'Text، پیش از بارگذاری تنظیم شود')],
          [t('Locale (decimal mark, date order)', 'اللغة والمنطقة (علامة الكسر، ترتيب التاريخ)', 'Locale (علامت اعشار، ترتیب تاریخ)'), t('<code>5,00</code> and <code>03/06/2024</code> are read by your computer\'s rules', 'يُقرأ <code>5,00</code> و<code>03/06/2024</code> بقواعد حاسوبك', '<code>5,00</code> و <code>03/06/2024</code> با قاعده‌های رایانهٔ تو خوانده می‌شوند'), t('Convert on purpose (Section 5)', 'حوّل عن قصد (القسم 5)', 'عمداً تبدیل کن (بخش ۵)')],
        ],
      },
      toolTabs(
        [
          html(
            '<ol><li><strong>Data ▸ Get Data ▸ From File ▸ From Text/CSV</strong> (or the <em>From Text/CSV</em> button), and pick the file.</li><li>In the preview, set <strong>File Origin</strong> to <em>65001: Unicode (UTF-8)</em>, <strong>Delimiter</strong> to <em>Semicolon</em> and <strong>Data Type Detection</strong> to <em>Do not detect data types</em>. The preview now shows 7 columns and the accents are right.</li><li>Click <strong>Transform Data</strong>. In the Power Query window, set <code>order_id</code> and <code>jars</code> to <em>Whole Number</em> and <code>postcode</code> to <em>Text</em>. Leave <code>order_date</code> and <code>unit_price</code> as text: Section 5 converts them on purpose, because one price is written with a dot.</li><li><strong>Close &amp; Load</strong>, and rename the sheet <code>raw</code>. From now on it is read-only.</li></ol><p>If the data is already open in column A, <strong>Data ▸ Text to Columns ▸ Delimited ▸ Semicolon</strong> splits it, but it cannot repair the encoding or a lost zero. Importing is the safer habit.</p>',
            '<ol><li><strong>Data ▸ Get Data ▸ From File ▸ From Text/CSV</strong> (أو زر <em>From Text/CSV</em>)، واختر الملف.</li><li>في المعاينة اضبط <strong>File Origin</strong> على <em>65001: Unicode (UTF-8)</em> و<strong>Delimiter</strong> على <em>Semicolon</em> و<strong>Data Type Detection</strong> على <em>Do not detect data types</em>. تعرض المعاينة الآن 7 أعمدة والحروف المشكّلة سليمة.</li><li>انقر <strong>Transform Data</strong>. في نافذة Power Query اضبط <code>order_id</code> و<code>jars</code> على <em>Whole Number</em> و<code>postcode</code> على <em>Text</em>. اترك <code>order_date</code> و<code>unit_price</code> نصًّا: يحوّلهما القسم 5 عن قصد، لأن أحد الأسعار مكتوب بنقطة.</li><li><strong>Close &amp; Load</strong>، وسمِّ الورقة <code>raw</code>. من الآن هي للقراءة فقط.</li></ol><p>إن كانت البيانات مفتوحة أصلًا في العمود A فإن <strong>Data ▸ Text to Columns ▸ Delimited ▸ Semicolon</strong> يقسّمها، لكنه لا يصلح الترميز ولا صفرًا ضاع. الاستيراد عادة أكثر أمانًا.</p>',
            '<ol><li><strong>Data ▸ Get Data ▸ From File ▸ From Text/CSV</strong> (یا دکمهٔ <em>From Text/CSV</em>) را بزن و فایل را انتخاب کن.</li><li>در پیش‌نمایش <strong>File Origin</strong> را روی <em>65001: Unicode (UTF-8)</em>، <strong>Delimiter</strong> را روی <em>Semicolon</em> و <strong>Data Type Detection</strong> را روی <em>Do not detect data types</em> بگذار. حالا پیش‌نمایش ۷ ستون نشان می‌دهد و حرف‌های دارای اعراب درست‌اند.</li><li>روی <strong>Transform Data</strong> کلیک کن. در پنجرهٔ Power Query نوع <code>order_id</code> و <code>jars</code> را <em>Whole Number</em> و <code>postcode</code> را <em>Text</em> بگذار. <code>order_date</code> و <code>unit_price</code> را متن بگذار: بخش ۵ عمداً تبدیلشان می‌کند، چون یکی از قیمت‌ها با نقطه نوشته شده.</li><li><strong>Close &amp; Load</strong> را بزن و برگه را <code>raw</code> نام بگذار. از این پس فقط‌خواندنی است.</li></ol><p>اگر داده از قبل در ستون A باز شده، <strong>Data ▸ Text to Columns ▸ Delimited ▸ Semicolon</strong> آن را جدا می‌کند، اما نه کدگذاری را درست می‌کند و نه صفر گم‌شده را برمی‌گرداند. وارد کردن عادت امن‌تری است.</p>',
          ),
        ],
        [code(py.load), code(py.importMistakes)],
        [
          code(m.load),
          html(
            '<p>This is what the dialog writes for you: open it with <strong>Home ▸ Advanced Editor</strong>. Encoding 65001 is UTF-8. The date is read with an explicit <code>dd/MM/yyyy</code> format and the price has its dot swapped for a comma first, so the result does not depend on your computer\'s settings. (This code is reference: it was written without Excel and not run here.)</p>',
            '<p>هذا ما تكتبه لك النافذة: افتحه بـ <strong>Home ▸ Advanced Editor</strong>. الترميز 65001 هو UTF-8. يُقرأ التاريخ بصيغة <code>dd/MM/yyyy</code> صريحة، ويُستبدل بنقطة السعر فاصلة أولًا، فلا تعتمد النتيجة على إعدادات حاسوبك. (هذا الكود مرجع: كُتب دون Excel ولم يُشغَّل هنا.)</p>',
            '<p>این همان چیزی است که پنجره برایت می‌نویسد: با <strong>Home ▸ Advanced Editor</strong> بازش کن. کدگذاری 65001 یعنی UTF-8. تاریخ با قالب صریح <code>dd/MM/yyyy</code> خوانده می‌شود و نقطهٔ قیمت اول به ویرگول تبدیل می‌شود، پس نتیجه به تنظیمات رایانهٔ تو بستگی ندارد. (این کد مرجع است: بدون Excel نوشته شده و اینجا اجرا نشده.)</p>',
          ),
        ],
      ),
      {
        type: 'box',
        variant: 'mistake',
        label: t('A zero that vanished is gone', 'الصفر الذي اختفى ضاع', 'صفری که ناپدید شد برای همیشه رفته'),
        html: t(
          '<p>Once <code>02134</code> is stored as the number 2134, Excel cannot know it ever had a zero. Formatting the cell as "00000" only paints zeros on top, and the next copy-paste loses them again. Set the column to <em>Text</em> before the data is loaded.</p>',
          '<p>بمجرد تخزين <code>02134</code> كالرقم 2134 لا يستطيع Excel أن يعرف أنه كان فيه صفر. تنسيق الخلية بـ "00000" يرسم أصفارًا فوقه فقط، وسيضيع النسخ واللصق التالي الأصفار مجددًا. اضبط العمود على <em>Text</em> قبل تحميل البيانات.</p>',
          '<p>وقتی <code>02134</code> به‌صورت عدد ۲۱۳۴ ذخیره شد، Excel نمی‌تواند بداند که زمانی صفر داشته است. قالب‌دادن خانه با «00000» فقط روی آن صفر نقاشی می‌کند و کپی‌ـ‌پیست بعدی دوباره آن‌ها را از دست می‌دهد. نوع ستون را پیش از بارگذاری داده روی <em>Text</em> بگذار.</p>',
        ),
      },
      { type: 'exercise', questionId: 'w05-q003' },
      { type: 'exercise', questionId: 'w05-q004' },
    ],
  },
]

// ---------- Sections 4-6: text, numbers and dates, validation ----------
const typing: Sections = [
  {
    id: 'text-cleaning',
    navLabel: t('Cleaning text', 'تنظيف النص', 'پاک‌سازی متن'),
    sectionLabel: t('Section 04', 'القسم ٠٤', 'بخش ۰۴'),
    timeEst: t('8 min', '٨ دقائق', '۸ دقیقه'),
    headingHtml: t(
      '<h2>Text: the problems you cannot see</h2><p class="standfirst">The 26 raw rows hold 16 different customer strings for 7 real customers (and a test row). Cleaning the spaces alone removes 3 of them. You cannot see most of these, but a lookup, a pivot table and Remove Duplicates all can.</p>',
      '<h2>النص: المشكلات التي لا تراها</h2><p class="standfirst">تحمل الصفوف الخام الـ26 ما مجموعه 16 نصًّا مختلفًا لاسم العميل لسبعة عملاء حقيقيين (بالإضافة إلى صف اختبار). تنظيف المسافات وحده يزيل 3 منها. لا تستطيع رؤية معظمها، لكن البحث والجدول المحوري وRemove Duplicates تراها كلها.</p>',
      '<h2>متن: مشکل‌هایی که نمی‌بینی</h2><p class="standfirst">۲۶ سطر خام ۱۶ رشتهٔ مختلف برای نام مشتری دارند که به ۷ مشتری واقعی (و یک سطر آزمایشی) برمی‌گردد. فقط تمیز کردن فاصله‌ها ۳ تای آن‌ها را حذف می‌کند. بیشترشان را نمی‌بینی، اما جست‌وجو، جدول محوری و Remove Duplicates همه را می‌بینند.</p>',
    ),
    blocks: [
      {
        type: 'table',
        headers: [t('Tool', 'الأداة', 'ابزار'), t('What it does', 'ما تفعله', 'چه می‌کند'), t('What it misses or risks', 'ما تفوّته أو تخاطر به', 'چه چیزی را از دست می‌دهد یا چه خطری دارد')],
        rows: [
          [t('<code>TRIM</code>', '<code>TRIM</code>', '<code>TRIM</code>'), t('Removes leading, trailing and repeated spaces', 'يزيل المسافات البادئة واللاحقة والمكررة', 'فاصله‌های ابتدا، انتها و تکراری را حذف می‌کند'), t('Not the non-breaking space (code 160) or line breaks', 'لا يزيل المسافة غير القابلة للكسر (الرمز 160) ولا فواصل الأسطر', 'فاصلهٔ ناشکن (کد ۱۶۰) و شکست خط را حذف نمی‌کند')],
          [t('<code>CLEAN</code>', '<code>CLEAN</code>', '<code>CLEAN</code>'), t('Removes non-printing characters such as line breaks and tabs', 'يزيل المحارف غير المطبوعة مثل فواصل الأسطر والجداول', 'نویسه‌های غیرچاپی مثل شکست خط و تب را حذف می‌کند'), t('Still not the non-breaking space', 'ولا يزيل المسافة غير القابلة للكسر أيضًا', 'باز هم فاصلهٔ ناشکن را حذف نمی‌کند')],
          [t('<code>SUBSTITUTE(x, UNICHAR(160), " ")</code>', '<code>SUBSTITUTE(x, UNICHAR(160), " ")</code>', '<code>SUBSTITUTE(x, UNICHAR(160), " ")</code>'), t('Swaps the non-breaking space that web pages and PDFs paste in for a normal one', 'يستبدل المسافة غير القابلة للكسر التي تلصقها صفحات الويب وملفات PDF بمسافة عادية', 'فاصلهٔ ناشکنی را که صفحه‌های وب و PDF می‌چسبانند با فاصلهٔ عادی عوض می‌کند'), t('Older tutorials use <code>CHAR(160)</code>, which depends on the computer', 'تستخدم الدروس الأقدم <code>CHAR(160)</code> وهو يعتمد على الحاسوب', 'آموزش‌های قدیمی‌تر از <code>CHAR(160)</code> استفاده می‌کنند که به رایانه بستگی دارد')],
          [t('<code>PROPER</code>', '<code>PROPER</code>', '<code>PROPER</code>'), t('Capitalizes each word: "strawberry" becomes "Strawberry"', 'يكتب كل كلمة بحرف كبير: "strawberry" تصبح "Strawberry"', 'هر واژه را با حرف بزرگ می‌نویسد: «strawberry» می‌شود «Strawberry»'), t('Can damage names such as "McDonald\'s"; use it on categories, not on names', 'قد يفسد أسماء مثل "McDonald\'s"؛ استخدمه للفئات لا للأسماء', 'می‌تواند نام‌هایی مثل «McDonald\'s» را خراب کند؛ برای دسته‌ها به کار ببر، نه نام‌ها')],
          [t('Flash Fill (Ctrl+E)', 'Flash Fill ‏(Ctrl+E)', 'Flash Fill ‏(Ctrl+E)'), t('Learns a pattern from one or two typed examples', 'يتعلم نمطًا من مثال أو اثنين تكتبهما', 'الگو را از یک یا دو نمونهٔ تایپ‌شده یاد می‌گیرد'), t('Guesses; check rows it has not seen. It is not a formula, so it does not update', 'يخمّن؛ تحقق من الصفوف التي لم يرها. وليس معادلة فلا يتحدّث', 'حدس می‌زند؛ سطرهایی را که ندیده بررسی کن. فرمول نیست، پس به‌روز نمی‌شود')],
        ],
      },
      toolTabs(
        [
          code(xl.textHelpers),
          html(
            '<p>Write the formula in a helper column on <code>work</code>, fill it down, check it, and only then paste the values over (<strong>Paste Special ▸ Values</strong>). The text after → is a note, not part of the formula. If your Excel uses a semicolon as the list separator, type <code>;</code> where the formulas show <code>,</code>.</p>',
            '<p>اكتب المعادلة في عمود مساعد على <code>work</code>، واسحبها لأسفل، وتحقق منها، ثم الصق القيم فوقها (<strong>Paste Special ▸ Values</strong>). النص بعد → ملاحظة وليس جزءًا من المعادلة. إن كان Excel لديك يستخدم الفاصلة المنقوطة فاصلًا للقوائم فاكتب <code>;</code> حيث تعرض المعادلات <code>,</code>.</p>',
            '<p>فرمول را در یک ستون کمکی روی <code>work</code> بنویس، پایین بکش، بررسی کن و بعد مقدارها را رویش بچسبان (<strong>Paste Special ▸ Values</strong>). متن بعد از → یادداشت است، نه بخشی از فرمول. اگر Excel تو نقطه‌ویرگول را جداکنندهٔ فهرست دارد، هر جا فرمول <code>,</code> دارد <code>;</code> بنویس.</p>',
          ),
        ],
        [code(py.text)],
        [
          html(
            '<p>Select the column, then <strong>Transform ▸ Format ▸ Trim</strong>, <strong>Clean</strong> and <strong>Capitalize Each Word</strong>. For the non-breaking space use <strong>Transform ▸ Replace Values</strong> (paste the odd space into the first box), or a custom step with <code>Character.FromNumber(160)</code>, as in the worked example in Section 12.</p>',
            '<p>حدّد العمود ثم <strong>Transform ▸ Format ▸ Trim</strong> و<strong>Clean</strong> و<strong>Capitalize Each Word</strong>. وللمسافة غير القابلة للكسر استخدم <strong>Transform ▸ Replace Values</strong> (الصق المسافة الغريبة في المربع الأول)، أو خطوة مخصصة بـ <code>Character.FromNumber(160)</code> كما في المثال التطبيقي في القسم 12.</p>',
            '<p>ستون را انتخاب کن، بعد <strong>Transform ▸ Format ▸ Trim</strong>، <strong>Clean</strong> و <strong>Capitalize Each Word</strong>. برای فاصلهٔ ناشکن از <strong>Transform ▸ Replace Values</strong> استفاده کن (فاصلهٔ عجیب را در کادر اول بچسبان) یا یک گام سفارشی با <code>Character.FromNumber(160)</code>، مثل مثال حل‌شده در بخش ۱۲.</p>',
          ),
        ],
      ),
      {
        type: 'box',
        variant: 'mistake',
        label: t('TRIM ran, and the lookup still fails', 'شُغِّل TRIM والبحث ما زال يفشل', 'TRIM اجرا شد و جست‌وجو هنوز شکست می‌خورد'),
        html: t(
          '<p>Order 1016\'s customer is "Farm Shop Direct" with a non-breaking space between "Farm" and "Shop". <code>LEN(B2)-LEN(TRIM(B2))</code> says 0 extra spaces, and a lookup against the customer list finds nothing. <code>UNICODE(MID(B2,5,1))</code> returns <strong>160</strong>, and that is the clue. When a text looks right but does not match, test its characters.</p>',
          '<p>عميل الطلب 1016 هو "Farm Shop Direct" بمسافة غير قابلة للكسر بين "Farm" و"Shop". تقول <code>LEN(B2)-LEN(TRIM(B2))</code> إنه لا توجد مسافات زائدة، ولا يجد البحث في قائمة العملاء شيئًا. تُرجع <code>UNICODE(MID(B2,5,1))</code> القيمة <strong>160</strong>، وهذه هي القرينة. حين يبدو النص سليمًا ولا يتطابق، اختبر محارفه.</p>',
          '<p>مشتری سفارش ۱۰۱۶ «Farm Shop Direct» است با یک فاصلهٔ ناشکن میان «Farm» و «Shop». <code>LEN(B2)-LEN(TRIM(B2))</code> می‌گوید ۰ فاصلهٔ اضافه هست و جست‌وجو در فهرست مشتری‌ها چیزی پیدا نمی‌کند. <code>UNICODE(MID(B2,5,1))</code> عدد <strong>۱۶۰</strong> را برمی‌گرداند و همین سرنخ است. وقتی متنی درست به نظر می‌رسد اما تطابق نمی‌دهد، نویسه‌هایش را آزمایش کن.</p>',
        ),
      },
      { type: 'exercise', questionId: 'w05-q005' },
    ],
  },
  {
    id: 'numbers-dates',
    navLabel: t('Numbers and dates', 'الأرقام والتواريخ', 'عدد و تاریخ'),
    sectionLabel: t('Section 05', 'القسم ٠٥', 'بخش ۰۵'),
    timeEst: t('9 min', '٩ دقائق', '۹ دقیقه'),
    headingHtml: t(
      '<h2>Numbers and dates: when 5,00 is only text</h2><p class="standfirst">A cell that looks like a number or a date may be text. A text "5,00" cannot be added, and a date typed day-first can be silently read month-first. Test with <code>ISNUMBER</code>, and convert with a formula that does not depend on your computer\'s settings.</p>',
      '<h2>الأرقام والتواريخ: حين يكون 5,00 نصًّا فقط</h2><p class="standfirst">قد تكون الخلية التي تبدو رقمًا أو تاريخًا نصًّا. لا يمكن جمع النص "5,00"، وقد يُقرأ تاريخ مكتوب بترتيب اليوم أولًا على أنه الشهر أولًا بصمت. اختبر بـ <code>ISNUMBER</code>، وحوّل بمعادلة لا تعتمد على إعدادات حاسوبك.</p>',
      '<h2>عدد و تاریخ: وقتی ۵٫۰۰ فقط متن است</h2><p class="standfirst">خانه‌ای که شبیه عدد یا تاریخ است ممکن است متن باشد. متن «5,00» را نمی‌شود جمع زد و تاریخی که با روز اول نوشته شده می‌تواند بی‌صدا ماه‌اول خوانده شود. با <code>ISNUMBER</code> آزمایش کن و با فرمولی تبدیل کن که به تنظیمات رایانه‌ات بستگی ندارد.</p>',
    ),
    blocks: [
      html(
        '<h3>Numbers</h3><p>Text numbers sit on the left of the cell, or show a small green triangle, but <code>ISNUMBER</code> is the test you can trust. <code>NUMBERVALUE(text, decimal_separator, group_separator)</code> converts text with the separators you name. In this export every price has a decimal comma (<code>5,00</code>) except one: order 1011 is written <code>5.00</code>.</p>',
        '<h3>الأرقام</h3><p>تقع الأرقام النصية على يسار الخلية أو تُظهر مثلثًا أخضر صغيرًا، لكن <code>ISNUMBER</code> هو الاختبار الذي يمكنك الوثوق به. تحوّل <code>NUMBERVALUE(text, decimal_separator, group_separator)</code> النص بالفواصل التي تحددها. في هذا التصدير لكل سعر فاصلة عشرية (<code>5,00</code>) إلا واحدًا: الطلب 1011 مكتوب <code>5.00</code>.</p>',
        '<h3>عددها</h3><p>عددهای متنی سمت چپ خانه می‌نشینند یا یک مثلث سبز کوچک نشان می‌دهند، اما <code>ISNUMBER</code> آزمونی است که می‌توانی به آن اعتماد کنی. <code>NUMBERVALUE(text, decimal_separator, group_separator)</code> متن را با جداکننده‌هایی که تو نام می‌بری تبدیل می‌کند. در این خروجی هر قیمت ویرگول اعشاری دارد (<code>5,00</code>) به‌جز یکی: سفارش ۱۰۱۱ به شکل <code>5.00</code> نوشته شده.</p>',
      ),
      {
        type: 'box',
        variant: 'mistake',
        label: t('A lone dot becomes 500', 'نقطة وحيدة تصبح 500', 'یک نقطهٔ تنها ۵۰۰ می‌شود'),
        html: t(
          '<p><code>=NUMBERVALUE("5.00", ",", ".")</code> returns <strong>500</strong>, not 5: with the dot named as the group (thousands) separator, "5.00" reads as "500". Excel shows no error, and the price rule in Section 6 (3 to 8) is what would catch it. Fix it first by swapping the dot for a comma with <code>SUBSTITUTE</code>, as in the formula below.</p>',
          '<p>تُرجع <code>=NUMBERVALUE("5.00", ",", ".")</code> القيمة <strong>500</strong> لا 5: فمع تسمية النقطة فاصلًا للمجموعات (الآلاف) يُقرأ "5.00" على أنه "500". لا يعرض Excel خطأً، وقاعدة السعر في القسم 6 (من 3 إلى 8) هي ما كان سيلتقطه. أصلحه أولًا باستبدال النقطة بفاصلة بـ <code>SUBSTITUTE</code> كما في المعادلة أدناه.</p>',
          '<p><code>=NUMBERVALUE("5.00", ",", ".")</code> عدد <strong>۵۰۰</strong> را برمی‌گرداند، نه ۵: وقتی نقطه جداکنندهٔ گروه (هزارگان) نام‌گذاری شده، «5.00» مثل «500» خوانده می‌شود. Excel خطایی نشان نمی‌دهد و قاعدهٔ قیمت در بخش ۶ (از ۳ تا ۸) چیزی است که آن را می‌گیرد. اول با <code>SUBSTITUTE</code> نقطه را به ویرگول تبدیل کن، مثل فرمول زیر.</p>',
        ),
      },
      html(
        '<h3>Dates</h3><p>In this file <code>03/06/2024</code> means <strong>3 June</strong>. On a computer set to US regional settings, <code>DATEVALUE("03/06/2024")</code> returns <strong>6 March</strong>. Of the 26 rows, 12 have a day of 12 or less (the dangerous ones: they convert, wrongly, with no error) and 14 have a day above 12 (they stay text, which at least looks wrong). The safe conversion cuts the text apart yourself with <code>DATE(RIGHT, MID, LEFT)</code>.</p>',
        '<h3>التواريخ</h3><p>في هذا الملف يعني <code>03/06/2024</code> <strong>3 يونيو</strong>. على حاسوب بإعدادات إقليمية أمريكية تُرجع <code>DATEVALUE("03/06/2024")</code> القيمة <strong>6 مارس</strong>. من الصفوف الـ26، في 12 منها يكون اليوم 12 أو أقل (الأخطر: تُحوَّل خطأً بلا أي خطأ ظاهر) وفي 14 يكون اليوم أكبر من 12 (تبقى نصًّا، وهذا على الأقل يبدو خاطئًا). التحويل الآمن يقطع النص بنفسك بـ <code>DATE(RIGHT, MID, LEFT)</code>.</p>',
        '<h3>تاریخ</h3><p>در این فایل <code>03/06/2024</code> یعنی <strong>۳ ژوئن</strong>. روی رایانه‌ای با تنظیمات منطقه‌ای آمریکا، <code>DATEVALUE("03/06/2024")</code> عدد <strong>۶ مارس</strong> را برمی‌گرداند. از ۲۶ سطر، ۱۲ تا روز ۱۲ یا کمتر دارند (خطرناک‌ترها: بدون هیچ خطایی اشتباه تبدیل می‌شوند) و ۱۴ تا روز بالای ۱۲ دارند (متن می‌مانند که دست‌کم غلط به نظر می‌رسد). تبدیل امن این است که خودت متن را با <code>DATE(RIGHT, MID, LEFT)</code> تکه‌تکه کنی.</p>',
      ),
      {
        type: 'table',
        headers: [t('Text in the file', 'النص في الملف', 'متن در فایل'), t('DATEVALUE on a US-settings computer', 'DATEVALUE على حاسوب بإعدادات أمريكية', 'DATEVALUE روی رایانهٔ با تنظیمات آمریکا'), t('DATE(RIGHT, MID, LEFT)', 'DATE(RIGHT, MID, LEFT)', 'DATE(RIGHT, MID, LEFT)')],
        rows: [
          [t('<code>03/06/2024</code>', '<code>03/06/2024</code>', '<code>03/06/2024</code>'), t('6 March 2024 (wrong, no error)', '6 مارس 2024 (خطأ دون تنبيه)', '۶ مارس ۲۰۲۴ (غلط، بدون خطا)'), t('3 June 2024', '3 يونيو 2024', '۳ ژوئن ۲۰۲۴')],
          [t('<code>21/06/2024</code>', '<code>21/06/2024</code>', '<code>21/06/2024</code>'), t('#VALUE! (there is no month 21)', '#VALUE! (لا يوجد شهر 21)', '#VALUE! (ماه ۲۱ وجود ندارد)'), t('21 June 2024', '21 يونيو 2024', '۲۱ ژوئن ۲۰۲۴')],
        ],
      },
      toolTabs(
        [
          code(xl.numbers),
          html(
            '<p>Changing a cell\'s <em>format</em> to Number or Date does not convert text: the value stays text. Convert with a formula (or re-import with <em>Using Locale</em>), check with <code>ISNUMBER</code>, then paste the values.</p>',
            '<p>تغيير <em>تنسيق</em> الخلية إلى Number أو Date لا يحوّل النص: تبقى القيمة نصًّا. حوّل بمعادلة (أو أعد الاستيراد بـ <em>Using Locale</em>)، وتحقق بـ <code>ISNUMBER</code>، ثم الصق القيم.</p>',
            '<p>عوض کردن <em>قالب</em> یک خانه به Number یا Date متن را تبدیل نمی‌کند: مقدار همچنان متن است. با یک فرمول تبدیل کن (یا با <em>Using Locale</em> دوباره وارد کن)، با <code>ISNUMBER</code> بررسی کن و بعد مقدارها را بچسبان.</p>',
          ),
        ],
        [code(py.types)],
        [
          html(
            '<p>Right-click the column header ▸ <strong>Change Type ▸ Using Locale…</strong> and pick the type and the locale the file was written in (for these dates, <em>Date</em> and <em>English (United Kingdom)</em>). The import code in Section 3 does the same with an explicit <code>dd/MM/yyyy</code> format.</p>',
            '<p>انقر بزر الماوس الأيمن على رأس العمود ▸ <strong>Change Type ▸ Using Locale…</strong> واختر النوع واللغة التي كُتب بها الملف (لهذه التواريخ: <em>Date</em> و<em>English (United Kingdom)</em>). يفعل كود الاستيراد في القسم 3 الشيء نفسه بصيغة <code>dd/MM/yyyy</code> صريحة.</p>',
            '<p>روی سرستون راست‌کلیک کن ▸ <strong>Change Type ▸ Using Locale…</strong> و نوع و منطقه‌ای را که فایل با آن نوشته شده انتخاب کن (برای این تاریخ‌ها: <em>Date</em> و <em>English (United Kingdom)</em>). کد وارد کردن در بخش ۳ همین کار را با قالب صریح <code>dd/MM/yyyy</code> می‌کند.</p>',
          ),
        ],
      ),
      { type: 'exercise', questionId: 'w05-q006' },
      { type: 'exercise', questionId: 'w05-q007' },
    ],
  },
  {
    id: 'validation',
    navLabel: t('Validation rules', 'قواعد التحقق', 'قاعده‌های اعتبارسنجی'),
    sectionLabel: t('Section 06', 'القسم ٠٦', 'بخش ۰۶'),
    timeEst: t('9 min', '٩ دقائق', '۹ دقیقه'),
    headingHtml: t(
      '<h2>Validation rules: say what "valid" means, then let Excel check</h2><p class="standfirst">A validation rule is a sentence about one column that every row must obey. Write the rules first, then ask Excel to circle the rows that break them. Rules find the impossible; they cannot find the merely unusual.</p>',
      '<h2>قواعد التحقق: قل ما معنى "صالح"، ثم دع Excel يتحقق</h2><p class="standfirst">قاعدة التحقق جملة عن عمود واحد يجب أن يلتزم بها كل صف. اكتب القواعد أولًا ثم اطلب من Excel تطويق الصفوف التي تخالفها. تجد القواعد المستحيل، ولا تجد غير المعتاد فقط.</p>',
      '<h2>قاعده‌های اعتبارسنجی: بگو «معتبر» یعنی چه، بعد بگذار Excel بررسی کند</h2><p class="standfirst">قاعدهٔ اعتبارسنجی جمله‌ای دربارهٔ یک ستون است که هر سطر باید از آن پیروی کند. اول قاعده‌ها را بنویس، بعد از Excel بخواه سطرهایی را که آن‌ها را نقض می‌کنند دور بزند. قاعده‌ها ناممکن را پیدا می‌کنند؛ نمی‌توانند صرفاً غیرمعمول را پیدا کنند.</p>',
    ),
    blocks: [
      {
        type: 'table',
        headers: [t('Column', 'العمود', 'ستون'), t('Rule', 'القاعدة', 'قاعده'), t('Rows that break it', 'الصفوف المخالفة', 'سطرهای متخلف')],
        rows: [
          [t('<code>jars</code>', '<code>jars</code>', '<code>jars</code>'), t('Whole number from 1 to 500', 'عدد صحيح من 1 إلى 500', 'عدد صحیح از ۱ تا ۵۰۰'), t('1014 (−24), 1024 (0)', '1014 (‎−24)، 1024 (0)', '۱۰۱۴ (‎−۲۴)، ۱۰۲۴ (۰)')],
          [t('<code>unit_price</code>', '<code>unit_price</code>', '<code>unit_price</code>'), t('Decimal from 3 to 8', 'عدد عشري من 3 إلى 8', 'اعشاری از ۳ تا ۸'), t('none, once the dot price is converted', 'لا شيء، بعد تحويل السعر ذي النقطة', 'هیچ، پس از تبدیل قیمت دارای نقطه')],
          [t('<code>order_date</code>', '<code>order_date</code>', '<code>order_date</code>'), t('Between 1 June and 30 June 2024', 'بين 1 و30 يونيو 2024', 'میان ۱ تا ۳۰ ژوئن ۲۰۲۴'), t('1017 (21/06/2025)', '1017 (21/06/2025)', '۱۰۱۷ (21/06/2025)')],
          [t('<code>flavor</code>', '<code>flavor</code>', '<code>flavor</code>'), t('One of the 4 flavors on the price list', 'واحدة من النكهات الأربع في قائمة الأسعار', 'یکی از ۴ طعم فهرست قیمت'), t('1020 ("Peech")', '1020 ("Peech")', '۱۰۲۰ («Peech»)')],
          [t('<code>postcode</code>', '<code>postcode</code>', '<code>postcode</code>'), t('Text of exactly 5 characters', 'نص من 5 محارف بالضبط', 'متنی دقیقاً ۵ نویسه‌ای'), t('none, because it was imported as Text', 'لا شيء، لأنه استُورد كـ Text', 'هیچ، چون به‌صورت Text وارد شد')],
        ],
      },
      toolTabs(
        [
          html(
            '<p>Select the column (for example E), then <strong>Data ▸ Data Validation</strong>. On <em>Settings</em> choose the type and limits, on <em>Error Alert</em> write the message a person typing will see. Then <strong>Data ▸ Data Validation ▸ Circle Invalid Data</strong> draws a red circle around every value already in the sheet that breaks a rule. Rules for this export:</p>',
            '<p>حدّد العمود (مثلًا E) ثم <strong>Data ▸ Data Validation</strong>. في <em>Settings</em> اختر النوع والحدود، وفي <em>Error Alert</em> اكتب الرسالة التي سيراها من يكتب. ثم يرسم <strong>Data ▸ Data Validation ▸ Circle Invalid Data</strong> دائرة حمراء حول كل قيمة موجودة في الورقة تخالف قاعدة. قواعد هذا التصدير:</p>',
            '<p>ستون را انتخاب کن (مثلاً E) و بعد <strong>Data ▸ Data Validation</strong>. در <em>Settings</em> نوع و حدها را بگذار و در <em>Error Alert</em> پیامی را بنویس که فرد تایپ‌کننده می‌بیند. سپس <strong>Data ▸ Data Validation ▸ Circle Invalid Data</strong> دور هر مقدار موجود در برگه که قاعده‌ای را نقض کند یک دایرهٔ قرمز می‌کشد. قاعده‌های این خروجی:</p>',
          ),
          code(xl.validation),
        ],
        [code(py.validate), code(py.fix)],
        [
          html(
            '<p>Power Query has no validation dialog. Add a <strong>Conditional Column</strong> that flags rows breaking a rule, then filter on the flag (or use <em>Keep Rows ▸ Keep Errors</em> after a type change) to see exactly which rows fail.</p>',
            '<p>لا توجد في Power Query نافذة تحقق. أضف <strong>Conditional Column</strong> تعلّم الصفوف المخالفة لقاعدة، ثم صفِّ بحسب العلامة (أو استخدم <em>Keep Rows ▸ Keep Errors</em> بعد تغيير النوع) لترى بالضبط أي الصفوف تفشل.</p>',
            '<p>Power Query پنجرهٔ اعتبارسنجی ندارد. یک <strong>Conditional Column</strong> اضافه کن که سطرهای نقض‌کنندهٔ قاعده را علامت بزند، بعد روی علامت فیلتر کن (یا بعد از تغییر نوع از <em>Keep Rows ▸ Keep Errors</em> استفاده کن) تا ببینی دقیقاً کدام سطرها رد می‌شوند.</p>',
          ),
        ],
      ),
      {
        type: 'box',
        variant: 'keypoint',
        label: t('What validation does and does not do', 'ما تفعله قواعد التحقق وما لا تفعله', 'اعتبارسنجی چه می‌کند و چه نمی‌کند'),
        html: t(
          '<p>Validation guards what people <em>type</em>. It does not fix values already there (Circle Invalid Data only marks them), and a pasted value can skip it. It also passes anything inside the limits: order 1018 has 360 jars, which is legal under "1 to 500" and still almost certainly a typo. That needs Section 8.</p>',
          '<p>يحرس التحقق ما <em>يكتبه</em> الناس. لا يصلح القيم الموجودة أصلًا (يكتفي Circle Invalid Data بتعليمها)، ويمكن لقيمة ملصوقة أن تتجاوزه. كما يمرّر كل ما يقع داخل الحدود: في الطلب 1018 يوجد 360 برطمانًا، وهو مسموح بحسب "من 1 إلى 500" ومع ذلك هو في الأغلب خطأ مطبعي. وهذا يحتاج إلى القسم 8.</p>',
          '<p>اعتبارسنجی از چیزی که آدم‌ها <em>تایپ می‌کنند</em> محافظت می‌کند. مقدارهایی را که از قبل هستند اصلاح نمی‌کند (Circle Invalid Data فقط علامتشان می‌زند) و یک مقدار چسبانده‌شده می‌تواند از آن رد شود. هر چه داخل حدها باشد را هم می‌پذیرد: سفارش ۱۰۱۸ مقدار ۳۶۰ شیشه دارد که طبق «۱ تا ۵۰۰» مجاز است و باز هم تقریباً حتماً غلط تایپی است. این به بخش ۸ نیاز دارد.</p>',
        ),
      },
      { type: 'exercise', questionId: 'w05-q008' },
    ],
  },
]

// ---------- Sections 7-10: duplicates, outliers, lookups, fuzzy matching ----------
const checks: Sections = [
  {
    id: 'duplicates',
    navLabel: t('Duplicates', 'التكرارات', 'تکرارها'),
    sectionLabel: t('Section 07', 'القسم ٠٧', 'بخش ۰۷'),
    timeEst: t('8 min', '٨ دقائق', '۸ دقیقه'),
    headingHtml: t(
      '<h2>Duplicates: find them, compare them, then remove</h2><p class="standfirst">Two rows can be the same order typed twice. Remove Duplicates deletes without asking, so look first, and clean the text first, or it will miss the copies that differ by a space.</p>',
      '<h2>التكرارات: اعثر عليها، وقارنها، ثم احذفها</h2><p class="standfirst">قد يكون صفّان الطلب نفسه مكتوبًا مرتين. تحذف Remove Duplicates دون أن تسأل، فانظر أولًا، ونظّف النص أولًا وإلا فاتتها النسخ التي تختلف بمسافة.</p>',
      '<h2>تکرارها: پیدایشان کن، مقایسه کن، بعد حذف کن</h2><p class="standfirst">دو سطر ممکن است یک سفارش باشند که دوبار تایپ شده. Remove Duplicates بدون پرسیدن حذف می‌کند، پس اول نگاه کن و اول متن را تمیز کن، وگرنه کپی‌هایی را که با یک فاصله فرق دارند از دست می‌دهد.</p>',
    ),
    blocks: [
      {
        type: 'diagram',
        fig: t('Figure 2', 'الشكل 2', 'شکل ۲'),
        title: t('Why Remove Duplicates found 1 copy on the raw sheet when there are 2', 'لماذا وجدت Remove Duplicates نسخة واحدة على الورقة الخام مع أن هناك نسختين', 'چرا Remove Duplicates روی برگهٔ خام ۱ کپی پیدا کرد، در حالی که ۲ تا هست'),
        src: '/figures/week-05/diagram-02.svg',
        alt: 'Two pairs of rows. Order 1011 appears twice with identical text, so it is found. Order 1007 appears twice but one copy has a trailing space after the customer name, so it is not identical. After TRIM both copies are found.',
        caption: t(
          'The "␣" marks the invisible trailing space. Remove Duplicates ignores capitals but not spaces, so the text must be cleaned before it can see the second pair.',
          'تشير "␣" إلى المسافة اللاحقة غير المرئية. تتجاهل Remove Duplicates حالة الأحرف لكنها لا تتجاهل المسافات، فيجب تنظيف النص قبل أن ترى الزوج الثاني.',
          'علامت «␣» فاصلهٔ پایانی نامرئی را نشان می‌دهد. Remove Duplicates بزرگی و کوچکی حروف را نادیده می‌گیرد اما فاصله را نه، پس متن باید تمیز شود تا جفت دوم را ببیند.',
        ),
      },
      html(
        '<h3>Three kinds of "duplicate"</h3><ul><li><strong>Exact copy:</strong> every column identical (order 1011). Safe to delete one.</li><li><strong>Near copy:</strong> identical once spaces or capitals are cleaned (order 1007, with a trailing space). Clean first, then delete one.</li><li><strong>Same key, different details:</strong> two rows with the same <code>order_id</code> but a different jar count. That is a conflict, not a copy: ask which is right before deleting anything.</li></ul><p>Decide what "the same order" means before you press the button. Here it is the <code>order_id</code>. On the raw sheet, Remove Duplicates over all columns removes <strong>1</strong> row. After the text is cleaned it finds <strong>2</strong> (orders 1007 and 1011), and the sheet drops from 26 rows to 23 once the test row is gone too.</p>',
        '<h3>ثلاثة أنواع من "التكرار"</h3><ul><li><strong>نسخة مطابقة:</strong> كل الأعمدة متطابقة (الطلب 1011). يمكن حذف نسخة بأمان.</li><li><strong>نسخة شبه مطابقة:</strong> تتطابق بعد تنظيف المسافات أو حالة الأحرف (الطلب 1007 بمسافة لاحقة). نظّف أولًا ثم احذف نسخة.</li><li><strong>المفتاح نفسه بتفاصيل مختلفة:</strong> صفّان لهما <code>order_id</code> نفسه لكن بعدد برطمانات مختلف. هذا تعارض لا نسخة: اسأل أيهما الصحيح قبل حذف أي شيء.</li></ul><p>قرّر ما معنى "الطلب نفسه" قبل أن تضغط الزر. هنا هو <code>order_id</code>. على الورقة الخام تزيل Remove Duplicates على كل الأعمدة <strong>1</strong> صف. وبعد تنظيف النص تجد <strong>2</strong> (الطلبان 1007 و1011)، وتنخفض الورقة من 26 صفًا إلى 23 بعد زوال صف الاختبار أيضًا.</p>',
        '<h3>سه نوع «تکرار»</h3><ul><li><strong>کپی دقیق:</strong> همهٔ ستون‌ها یکسان (سفارش ۱۰۱۱). حذف یکی امن است.</li><li><strong>کپی تقریبی:</strong> بعد از تمیز کردن فاصله یا حروف یکسان می‌شود (سفارش ۱۰۰۷ با فاصلهٔ پایانی). اول تمیز کن، بعد یکی را حذف کن.</li><li><strong>کلید یکسان، جزئیات متفاوت:</strong> دو سطر با <code>order_id</code> یکسان اما تعداد شیشهٔ متفاوت. این تعارض است، نه کپی: پیش از حذف هر چیزی بپرس کدام درست است.</li></ul><p>پیش از زدن دکمه تصمیم بگیر «همان سفارش» یعنی چه. اینجا یعنی <code>order_id</code>. روی برگهٔ خام، Remove Duplicates روی همهٔ ستون‌ها <strong>۱</strong> سطر را حذف می‌کند. بعد از تمیز شدن متن <strong>۲</strong> تا پیدا می‌کند (سفارش‌های ۱۰۰۷ و ۱۰۱۱) و وقتی سطر آزمایشی هم برود، برگه از ۲۶ سطر به ۲۳ سطر می‌رسد.</p>',
      ),
      toolTabs(
        [
          html(
            '<p>To <em>see</em> them first: <strong>Home ▸ Conditional Formatting ▸ Highlight Cells Rules ▸ Duplicate Values</strong>, or flag the second occurrence with a running <code>COUNTIFS</code> (it counts 2 for the copy). To remove: <strong>Data ▸ Remove Duplicates</strong>, tick only the columns that define "the same" (here <code>order_id</code>), and read the message: it tells you how many rows it removed.</p>',
            '<p>لكي <em>ترى</em> التكرارات أولًا: <strong>Home ▸ Conditional Formatting ▸ Highlight Cells Rules ▸ Duplicate Values</strong>، أو علّم الظهور الثاني بـ <code>COUNTIFS</code> تراكمي (يعدّ 2 للنسخة). وللحذف: <strong>Data ▸ Remove Duplicates</strong>، وحدّد فقط الأعمدة التي تعرّف "المماثل" (هنا <code>order_id</code>)، واقرأ الرسالة: تخبرك بعدد الصفوف المحذوفة.</p>',
            '<p>برای اینکه اول <em>ببینی</em>: <strong>Home ▸ Conditional Formatting ▸ Highlight Cells Rules ▸ Duplicate Values</strong>، یا دومین ظهور را با یک <code>COUNTIFS</code> تجمعی علامت بزن (برای کپی ۲ می‌شمارد). برای حذف: <strong>Data ▸ Remove Duplicates</strong>، فقط ستون‌هایی را که «یکسان» را تعریف می‌کنند تیک بزن (اینجا <code>order_id</code>) و پیام را بخوان: می‌گوید چند سطر حذف شد.</p>',
          ),
          code(xl.duplicates),
        ],
        [code(py.duplicates)],
        [
          html(
            '<p><strong>Home ▸ Remove Rows ▸ Remove Duplicates</strong> works on the columns you selected, so select <code>order_id</code> first. The cleaning code in Section 12 uses <code>Table.Distinct(table, {"order_id"})</code> after the text is cleaned.</p>',
            '<p>يعمل <strong>Home ▸ Remove Rows ▸ Remove Duplicates</strong> على الأعمدة التي حددتها، فحدّد <code>order_id</code> أولًا. يستخدم كود التنظيف في القسم 12 الدالة <code>Table.Distinct(table, {"order_id"})</code> بعد تنظيف النص.</p>',
            '<p><strong>Home ▸ Remove Rows ▸ Remove Duplicates</strong> روی ستون‌هایی که انتخاب کرده‌ای کار می‌کند، پس اول <code>order_id</code> را انتخاب کن. کد پاک‌سازی بخش ۱۲ بعد از تمیز شدن متن از <code>Table.Distinct(table, {"order_id"})</code> استفاده می‌کند.</p>',
          ),
        ],
      ),
      { type: 'exercise', questionId: 'w05-q009' },
    ],
  },
  {
    id: 'outliers',
    navLabel: t('Outliers', 'القيم المتطرفة', 'داده‌های پرت'),
    sectionLabel: t('Section 08', 'القسم ٠٨', 'بخش ۰۸'),
    timeEst: t('9 min', '٩ دقائق', '۹ دقیقه'),
    headingHtml: t(
      '<h2>Outliers: unusual is not the same as wrong</h2><p class="standfirst">One order says 360 jars. Every other order is between 24 and 84. That is either a typo or the biggest sale of the month, and a formula can only tell you it is unusual. You find out which by asking the source.</p>',
      '<h2>القيم المتطرفة: غير المعتاد ليس هو الخاطئ</h2><p class="standfirst">يقول طلب واحد 360 برطمانًا. وكل طلب آخر بين 24 و84. إما أنه خطأ مطبعي أو أكبر صفقة في الشهر، ولا تستطيع المعادلة سوى إخبارك بأنه غير معتاد. تعرف أيهما بسؤال المصدر.</p>',
      '<h2>داده‌های پرت: غیرمعمول یعنی غلط نیست</h2><p class="standfirst">یک سفارش ۳۶۰ شیشه می‌گوید. هر سفارش دیگر بین ۲۴ و ۸۴ است. یا غلط تایپی است یا بزرگ‌ترین فروش ماه، و یک فرمول فقط می‌تواند بگوید غیرمعمول است. اینکه کدام است را با پرسیدن از منبع می‌فهمی.</p>',
    ),
    blocks: [
      html(
        '<h3>Two checks that need no statistics software</h3><p><strong>The IQR fences.</strong> Q1 and Q3 are the 25th and 75th percentiles (<code>QUARTILE.INC</code>), and IQR = Q3 − Q1. A value is flagged when it is below Q1 − 1.5 × IQR or above Q3 + 1.5 × IQR. Here Q1 = 36, Q3 = 60, IQR = 24, so the fences are 0 and 96. Only order 1018 (360) is outside; the largest ordinary order is 84.</p><p><strong>The z-score.</strong> It counts how many standard deviations a value sits from the mean: <code>STANDARDIZE</code>. Order 1018 scores 4.44, and the next highest is 0.33. The catch is that the outlier itself drags the mean up to 62.09 (the median stays at 48) and the standard deviation to 67.17. Without it they are 48.00 and 17.35. The quartiles are 36 and 60 with or without it, which is why the IQR fences are the steadier first check.</p>',
        '<h3>فحصان لا يحتاجان إلى برنامج إحصاء</h3><p><strong>حدود IQR.</strong> الربيعان Q1 وQ3 هما المئين 25 و75 (<code>QUARTILE.INC</code>)، وIQR = Q3 − Q1. تُعلَّم القيمة إذا كانت أقل من Q1 − 1.5 × IQR أو أكبر من Q3 + 1.5 × IQR. هنا Q1 = 36 وQ3 = 60 وIQR = 24، فالحدّان هما 0 و96. الطلب 1018 (360) وحده خارجها؛ وأكبر طلب عادي هو 84.</p><p><strong>الدرجة المعيارية z.</strong> تعدّ كم انحرافًا معياريًا تبعد القيمة عن المتوسط: <code>STANDARDIZE</code>. يحصل الطلب 1018 على 4.44، ويأتي بعده 0.33. المشكلة أن القيمة المتطرفة نفسها ترفع المتوسط إلى 62.09 (ويبقى الوسيط 48) والانحراف المعياري إلى 67.17. وبدونها يكونان 48.00 و17.35. أما الربيعان فهما 36 و60 بوجودها وبدونها، ولهذا فحدود IQR هي الفحص الأول الأكثر ثباتًا.</p>',
        '<h3>دو بررسی که نرم‌افزار آماری نمی‌خواهند</h3><p><strong>حدهای IQR.</strong> Q1 و Q3 صدک‌های ۲۵ و ۷۵ هستند (<code>QUARTILE.INC</code>) و IQR = Q3 − Q1. مقداری علامت می‌خورد که زیر Q1 − 1.5 × IQR یا بالای Q3 + 1.5 × IQR باشد. اینجا Q1 = ۳۶، Q3 = ۶۰، IQR = ۲۴، پس حدها ۰ و ۹۶ هستند. فقط سفارش ۱۰۱۸ (۳۶۰) بیرون است؛ بزرگ‌ترین سفارش عادی ۸۴ است.</p><p><strong>امتیاز z.</strong> می‌شمارد یک مقدار چند انحراف معیار از میانگین فاصله دارد: <code>STANDARDIZE</code>. سفارش ۱۰۱۸ امتیاز ۴٫۴۴ می‌گیرد و بعدی ۰٫۳۳ است. مشکل اینجاست که خود داده پرت میانگین را به ۶۲٫۰۹ (میانه ۴۸ می‌ماند) و انحراف معیار را به ۶۷٫۱۷ می‌کشد. بدون آن ۴۸٫۰۰ و ۱۷٫۳۵ هستند. چارک‌ها با آن و بدون آن ۳۶ و ۶۰ هستند و برای همین حدهای IQR بررسی اول پایدارتری‌اند.</p>',
      ),
      toolTabs(
        [
          code(xl.outliers),
          html(
            '<p>To see the flagged rows on the sheet: select the column, <strong>Home ▸ Conditional Formatting ▸ New Rule ▸ Use a formula</strong> and enter <code>=$E2&gt;$Q$5</code> (above the upper fence). Sorting the column largest-first also puts a 360 on top at once.</p>',
            '<p>لرؤية الصفوف المعلَّمة على الورقة: حدّد العمود، <strong>Home ▸ Conditional Formatting ▸ New Rule ▸ Use a formula</strong> وأدخل <code>=$E2&gt;$Q$5</code> (أكبر من الحد الأعلى). كما يضع ترتيب العمود من الأكبر 360 في الأعلى فورًا.</p>',
            '<p>برای دیدن سطرهای علامت‌خورده روی برگه: ستون را انتخاب کن، <strong>Home ▸ Conditional Formatting ▸ New Rule ▸ Use a formula</strong> و <code>=$E2&gt;$Q$5</code> را وارد کن (بالاتر از حد بالا). مرتب کردن ستون از بزرگ به کوچک هم بلافاصله ۳۶۰ را بالا می‌آورد.</p>',
          ),
        ],
        [code(py.outliers)],
        [
          html(
            '<p>Power Query is not the tool for this check: sort the column descending (<strong>Sort Descending</strong>) or add a <strong>Conditional Column</strong> such as <code>if [jars] &gt; 96 then "check" else ""</code>, using the fence you calculated in Excel or Python.</p>',
            '<p>ليس Power Query أداة هذا الفحص: رتّب العمود تنازليًا (<strong>Sort Descending</strong>) أو أضف <strong>Conditional Column</strong> مثل <code>if [jars] &gt; 96 then "check" else ""</code> مستخدمًا الحد الذي حسبته في Excel أو Python.</p>',
            '<p>Power Query ابزار این بررسی نیست: ستون را نزولی مرتب کن (<strong>Sort Descending</strong>) یا یک <strong>Conditional Column</strong> مثل <code>if [jars] &gt; 96 then "check" else ""</code> اضافه کن و از حدی که در Excel یا Python حساب کرده‌ای استفاده کن.</p>',
          ),
        ],
      ),
      {
        type: 'box',
        variant: 'keypoint',
        label: t('Three questions before you touch an outlier', 'ثلاثة أسئلة قبل أن تلمس قيمة متطرفة', 'سه سؤال پیش از دست زدن به یک داده پرت'),
        html: t(
          '<p><strong>1. Is it possible?</strong> (Does it break a rule?) <strong>2. What does the source say?</strong> (The invoice, the owner.) <strong>3. Is the cause clear?</strong> If yes, fix it and log it; if not, keep it and flag it. Never delete a value just because a formula flagged it. Here the owner checked the invoice: order 1018 was 36 jars, typed with an extra zero.</p>',
          '<p><strong>1. هل هي ممكنة؟</strong> (هل تخالف قاعدة؟) <strong>2. ماذا يقول المصدر؟</strong> (الفاتورة، المالك.) <strong>3. هل السبب واضح؟</strong> إن نعم فأصلحها وسجّلها؛ وإلا فأبقها وعلّمها. لا تحذف قيمة لمجرد أن معادلة علّمتها. هنا راجع المالك الفاتورة: كان الطلب 1018 يضم 36 برطمانًا، كُتب بصفر زائد.</p>',
          '<p><strong>۱. ممکن است؟</strong> (قاعده‌ای را نقض می‌کند؟) <strong>۲. منبع چه می‌گوید؟</strong> (فاکتور، صاحب غرفه.) <strong>۳. علت روشن است؟</strong> اگر بله، اصلاح و ثبتش کن؛ اگر نه، نگهش دار و علامتش بزن. هرگز فقط چون یک فرمول علامت زده مقداری را حذف نکن. اینجا صاحب غرفه فاکتور را دید: سفارش ۱۰۱۸ مقدار ۳۶ شیشه بوده که با یک صفر اضافه تایپ شده.</p>',
        ),
      },
      { type: 'exercise', questionId: 'w05-q010' },
    ],
  },
  {
    id: 'lookups',
    navLabel: t('Lookups', 'البحث', 'جست‌وجو'),
    sectionLabel: t('Section 09', 'القسم ٠٩', 'بخش ۰۹'),
    timeEst: t('9 min', '٩ دقائق', '۹ دقیقه'),
    headingHtml: t(
      '<h2>Lookups: bring in the data that lives in another table</h2><p class="standfirst">Each order needs its customer\'s region, and the region is on the customer list, so you look it up. A lookup is exact: it works only when both sides are cleaned the same way, which is why this comes after the cleaning.</p>',
      '<h2>البحث: أحضر البيانات الموجودة في جدول آخر</h2><p class="standfirst">يحتاج كل طلب إلى منطقة عميله، والمنطقة في قائمة العملاء، فتبحث عنها. البحث دقيق: يعمل فقط حين يُنظَّف الطرفان بالطريقة نفسها، ولهذا يأتي بعد التنظيف.</p>',
      '<h2>جست‌وجو: داده‌ای را که در جدول دیگر است بیاور</h2><p class="standfirst">هر سفارش به منطقهٔ مشتری‌اش نیاز دارد و منطقه در فهرست مشتری‌هاست، پس آن را جست‌وجو می‌کنی. جست‌وجو دقیق است: فقط وقتی کار می‌کند که هر دو طرف یک‌جور تمیز شده باشند، و برای همین بعد از پاک‌سازی می‌آید.</p>',
    ),
    blocks: [
      {
        type: 'table',
        headers: [t('Function', 'الدالة', 'تابع'), t('Use it when', 'استخدمها حين', 'وقتی به کار ببر که'), t('Watch out for', 'انتبه إلى', 'مراقب این باش')],
        rows: [
          [t('<code>XLOOKUP</code>', '<code>XLOOKUP</code>', '<code>XLOOKUP</code>'), t('You have Excel 365 or 2021: exact match by default, and it takes a "not found" text', 'لديك Excel 365 أو 2021: مطابقة دقيقة افتراضيًا، وتقبل نصًّا لحالة "غير موجود"', 'Excel 365 یا ۲۰۲۱ داری: به‌طور پیش‌فرض تطابق دقیق و یک متن «پیدا نشد» می‌گیرد'), t('Not in older Excel versions', 'غير موجودة في إصدارات Excel الأقدم', 'در نسخه‌های قدیمی‌تر Excel نیست')],
          [t('<code>VLOOKUP(…, FALSE)</code>', '<code>VLOOKUP(…, FALSE)</code>', '<code>VLOOKUP(…, FALSE)</code>'), t('Any version; the key must be the first column of the table', 'أي إصدار؛ ويجب أن يكون المفتاح في أول عمود من الجدول', 'هر نسخه؛ کلید باید ستون اول جدول باشد'), t('Leave out <code>FALSE</code> (or write <code>TRUE</code>) and it matches approximately on sorted data: a wrong answer that looks right', 'إن حذفت <code>FALSE</code> (أو كتبت <code>TRUE</code>) فهي تطابق تقريبيًا على بيانات مرتبة: إجابة خاطئة تبدو صحيحة', 'اگر <code>FALSE</code> را نگذاری (یا <code>TRUE</code> بنویسی) روی داده مرتب تطابق تقریبی می‌کند: جواب غلطی که درست به نظر می‌رسد')],
          [t('<code>INDEX</code> + <code>MATCH(…, 0)</code>', '<code>INDEX</code> + <code>MATCH(…, 0)</code>', '<code>INDEX</code> + <code>MATCH(…, 0)</code>'), t('The return column is to the left of the key', 'عمود الإرجاع على يسار المفتاح', 'ستون بازگشتی سمت چپ کلید است'), t('The <code>0</code> means exact; forget it and you get an approximate match', 'الصفر يعني مطابقة دقيقة؛ وإن نسيته حصلت على مطابقة تقريبية', 'صفر یعنی دقیق؛ اگر فراموشش کنی تطابق تقریبی می‌گیری')],
        ],
      },
      html(
        '<p>All three ignore capitals ("the pantry" finds "The Pantry"), but not spaces, punctuation or accents. Run on the 23 clean orders, the lookup finds a region for <strong>19</strong> and returns <code>#N/A</code> (or "NOT FOUND") for <strong>4</strong>: "Cafe Rose", "Greengrocer Ltd.", "Harbor Market" and "Green Grocers Limited" (orders 1002, 1013, 1015 and 1019). Those 4 orders are 240 jars and 1,284.00 of revenue: <strong>23%</strong> of the 5,520.00 total.</p>',
        '<p>تتجاهل الثلاث كلها حالة الأحرف ("the pantry" تجد "The Pantry")، لكنها لا تتجاهل المسافات ولا علامات الترقيم ولا التشكيل. عند تشغيلها على الطلبات النظيفة الـ23 تجد منطقة لـ <strong>19</strong> وتُرجع <code>#N/A</code> (أو "NOT FOUND") لـ <strong>4</strong>: "Cafe Rose" و"Greengrocer Ltd." و"Harbor Market" و"Green Grocers Limited" (الطلبات 1002 و1013 و1015 و1019). هذه الطلبات الأربعة 240 برطمانًا و1,284.00 من الإيراد: <strong>23%</strong> من الإجمالي 5,520.00.</p>',
        '<p>هر سه بزرگی و کوچکی حروف را نادیده می‌گیرند («the pantry» «The Pantry» را پیدا می‌کند) اما فاصله، علائم نگارشی و اعراب را نه. روی ۲۳ سفارش تمیز، جست‌وجو برای <strong>۱۹</strong> سفارش منطقه پیدا می‌کند و برای <strong>۴</strong> سفارش <code>#N/A</code> (یا «NOT FOUND») برمی‌گرداند: «Cafe Rose»، «Greengrocer Ltd.»، «Harbor Market» و «Green Grocers Limited» (سفارش‌های ۱۰۰۲، ۱۰۱۳، ۱۰۱۵ و ۱۰۱۹). این ۴ سفارش ۲۴۰ شیشه و ۱٬۲۸۴٫۰۰ درآمد هستند: <strong>۲۳٪</strong> از جمع ۵٬۵۲۰٫۰۰.</p>',
      ),
      toolTabs(
        [code(xl.lookups)],
        [code(py.lookups)],
        [
          html(
            '<p><strong>Home ▸ Merge Queries</strong>: pick the two tables and the matching columns, and choose the <em>join kind</em>. <strong>Left Outer</strong> keeps all 23 orders and shows null for the 4 that did not match. <strong>Inner</strong> keeps only the 19 that matched and drops the other 4 without a word. Prefer Left Outer, then count the nulls.</p>',
            '<p><strong>Home ▸ Merge Queries</strong>: اختر الجدولين والعمودين المتطابقين، واختر <em>نوع الربط</em>. يُبقي <strong>Left Outer</strong> الطلبات الـ23 كلها ويُظهر null للأربعة التي لم تتطابق. أما <strong>Inner</strong> فيُبقي الـ19 المتطابقة فقط ويُسقط الأربعة الأخرى بلا كلمة. فضّل Left Outer ثم عُدّ قيم null.</p>',
            '<p><strong>Home ▸ Merge Queries</strong>: دو جدول و ستون‌های متناظر را انتخاب کن و <em>نوع join</em> را برگزین. <strong>Left Outer</strong> هر ۲۳ سفارش را نگه می‌دارد و برای ۴ سفارش بی‌تطابق null نشان می‌دهد. <strong>Inner</strong> فقط ۱۹ سفارش تطبیق‌یافته را نگه می‌دارد و ۴ تای دیگر را بی‌صدا دور می‌اندازد. Left Outer را ترجیح بده و بعد null‌ها را بشمار.</p>',
          ),
        ],
      ),
      {
        type: 'box',
        variant: 'mistake',
        label: t('#N/A is a message, not a nuisance', '#N/A رسالة وليست إزعاجًا', '#N/A یک پیام است، نه مزاحم'),
        html: t(
          '<p><code>=IFERROR(XLOOKUP(…), "")</code> makes the 4 errors vanish, and 23% of the revenue goes missing from every region total with no sign that anything is wrong. Leave the <code>#N/A</code> visible until the cause is fixed, and make "NOT FOUND" the fourth argument of <code>XLOOKUP</code> so it stays easy to count.</p>',
          '<p>تجعل <code>=IFERROR(XLOOKUP(…), "")</code> الأخطاء الأربعة تختفي، فيغيب 23% من الإيراد عن كل إجمالي منطقة دون أي إشارة إلى وجود خلل. أبقِ <code>#N/A</code> ظاهرًا حتى يُصلَح السبب، واجعل "NOT FOUND" الوسيط الرابع لـ <code>XLOOKUP</code> ليبقى عدّها سهلًا.</p>',
          '<p><code>=IFERROR(XLOOKUP(…), "")</code> ۴ خطا را ناپدید می‌کند و ۲۳٪ درآمد از جمع هر منطقه کم می‌شود بدون هیچ نشانه‌ای که چیزی اشتباه است. تا وقتی علت درست نشده <code>#N/A</code> را قابل‌دیدن بگذار و «NOT FOUND» را آرگومان چهارم <code>XLOOKUP</code> قرار بده تا شمردنش آسان بماند.</p>',
        ),
      },
      { type: 'exercise', questionId: 'w05-q011' },
    ],
  },
  {
    id: 'fuzzy-matching',
    navLabel: t('Fuzzy matching', 'المطابقة التقريبية', 'تطابق فازی'),
    sectionLabel: t('Section 10', 'القسم ١٠', 'بخش ۱۰'),
    timeEst: t('9 min', '٩ دقائق', '۹ دقیقه'),
    headingHtml: t(
      '<h2>Fuzzy matching: when the keys almost agree</h2><p class="standfirst">"Harbor Market" and "Harbour Market" are one shop to you and two different keys to a lookup. Fuzzy matching scores how alike two texts are and proposes the closest one. It proposes: you decide.</p>',
      '<h2>المطابقة التقريبية: حين تكاد المفاتيح تتفق</h2><p class="standfirst">"Harbor Market" و"Harbour Market" متجر واحد في نظرك ومفتاحان مختلفان في نظر البحث. تقيّم المطابقة التقريبية مدى تشابه نصين وتقترح الأقرب. هي تقترح، وأنت تقرر.</p>',
      '<h2>تطابق فازی: وقتی کلیدها تقریباً یکی‌اند</h2><p class="standfirst">«Harbor Market» و «Harbour Market» برای تو یک مغازه‌اند و برای جست‌وجو دو کلید متفاوت. تطابق فازی شباهت دو متن را نمره می‌دهد و نزدیک‌ترین را پیشنهاد می‌کند. او پیشنهاد می‌دهد: تو تصمیم می‌گیری.</p>',
    ),
    blocks: [
      html(
        '<p>The four orders the exact lookup missed, scored against the customer list with Python\'s <code>difflib</code> (a 0 to 1 similarity; 1 means identical):</p>',
        '<p>الطلبات الأربعة التي فاتها البحث الدقيق، مقيَّمة مقابل قائمة العملاء بـ <code>difflib</code> في Python (تشابه من 0 إلى 1؛ و1 يعني متطابقًا):</p>',
        '<p>چهار سفارشی که جست‌وجوی دقیق از دست داد، با <code>difflib</code> در Python در برابر فهرست مشتری‌ها نمره‌گذاری شده‌اند (شباهت از ۰ تا ۱؛ ۱ یعنی یکسان):</p>',
      ),
      {
        type: 'table',
        headers: [t('As typed', 'كما كُتب', 'همان‌طور که نوشته شده'), t('Closest customer', 'أقرب عميل', 'نزدیک‌ترین مشتری'), t('Score', 'الدرجة', 'نمره'), t('Runner-up', 'الثاني', 'دوم'), t('Verdict', 'الحكم', 'نتیجه')],
        rows: [
          [t('Cafe Rose', 'Cafe Rose', 'Cafe Rose'), t('Café Rosé', 'Café Rosé', 'Café Rosé'), t('0.78', '0.78', '۰٫۷۸'), t('none above 0.6', 'لا شيء فوق 0.6', 'هیچ‌کدام بالای ۰٫۶'), t('Missed at 0.8, found at 0.7: accent only', 'فاتت عند 0.8 وتُوجد عند 0.7: الفرق في التشكيل فقط', 'در ۰٫۸ از دست می‌رود، در ۰٫۷ پیدا می‌شود: فقط اعراب فرق دارد')],
          [t('Greengrocer Ltd.', 'Greengrocer Ltd.', 'Greengrocer Ltd.'), t('Green Grocer Ltd', 'Green Grocer Ltd', 'Green Grocer Ltd'), t('0.94', '0.94', '۰٫۹۴'), t('Greenfield Grocer Ltd (0.81)', 'Greenfield Grocer Ltd ‏(0.81)', 'Greenfield Grocer Ltd ‏(۰٫۸۱)'), t('Accept the closest; the runner-up is a different customer', 'اقبل الأقرب؛ والثاني عميل مختلف', 'نزدیک‌ترین را بپذیر؛ دومی مشتری دیگری است')],
          [t('Harbor Market', 'Harbor Market', 'Harbor Market'), t('Harbour Market', 'Harbour Market', 'Harbour Market'), t('0.96', '0.96', '۰٫۹۶'), t('none above 0.6', 'لا شيء فوق 0.6', 'هیچ‌کدام بالای ۰٫۶'), t('Accept: spelling variant', 'اقبل: اختلاف إملائي', 'بپذیر: تفاوت املایی')],
          [t('Green Grocers Limited', 'Green Grocers Limited', 'Green Grocers Limited'), t('Green Grocer Ltd', 'Green Grocer Ltd', 'Green Grocer Ltd'), t('0.86', '0.86', '۰٫۸۶'), t('Greenfield Grocer Ltd (0.76)', 'Greenfield Grocer Ltd ‏(0.76)', 'Greenfield Grocer Ltd ‏(۰٫۷۶)'), t('Accept after review: "Limited" and "Ltd" mean the same', 'اقبل بعد المراجعة: "Limited" و"Ltd" بمعنى واحد', 'پس از بررسی بپذیر: «Limited» و «Ltd» یک معنا دارند')],
        ],
      },
      {
        type: 'box',
        variant: 'mistake',
        label: t('The danger is a confident wrong answer', 'الخطر هو إجابة خاطئة واثقة', 'خطر یک پاسخ غلطِ مطمئن است'),
        html: t(
          '<p>"Greenfield Grocer Ltd" is a real, different customer (order 1023), yet it scores 0.86 against "Green Grocer Ltd". If it were not on the customer list, a loose fuzzy merge would file its orders under Green Grocer Ltd without a word. That is why you merge exact first, fuzzy only the leftovers, and read every proposed pair.</p>',
          '<p>"Greenfield Grocer Ltd" عميل حقيقي ومختلف (الطلب 1023)، ومع ذلك يحصل على 0.86 مقابل "Green Grocer Ltd". لو لم يكن في قائمة العملاء لسجّلت مطابقة تقريبية متساهلة طلباته تحت Green Grocer Ltd دون كلمة. ولهذا تدمج بالمطابقة الدقيقة أولًا، وبالتقريبية المتبقي فقط، وتقرأ كل زوج مقترح.</p>',
          '<p>«Greenfield Grocer Ltd» مشتری واقعی و متفاوتی است (سفارش ۱۰۲۳) و با این حال در برابر «Green Grocer Ltd» نمرهٔ ۰٫۸۶ می‌گیرد. اگر در فهرست مشتری‌ها نبود، یک ادغام فازی سهل‌گیر سفارش‌هایش را بی‌صدا زیر Green Grocer Ltd ثبت می‌کرد. برای همین اول دقیق ادغام می‌کنی، فقط باقی‌مانده را فازی می‌کنی و هر جفت پیشنهادی را می‌خوانی.</p>',
        ),
      },
      toolTabs(
        [
          html(
            '<p>Excel has no fuzzy function. Use Power Query (the next tab), or Microsoft\'s <em>Fuzzy Lookup</em> add-in (Windows only). Either way, finish with a small <code>Mapping</code> sheet: one column "as typed", one "approved", filled with the pairs you accepted. Then an exact lookup against the mapping fixes the names, and the mapping is your log of the decision:</p>',
            '<p>لا توجد في Excel دالة مطابقة تقريبية. استخدم Power Query (التبويب التالي) أو الإضافة <em>Fuzzy Lookup</em> من Microsoft (ويندوز فقط). وفي الحالتين أنهِ بورقة <code>Mapping</code> صغيرة: عمود "كما كُتب" وعمود "المعتمد"، تملؤهما بالأزواج التي قبلتها. ثم يصلح بحث دقيق مقابل الجدول الأسماء، ويكون جدول الربط سجل قرارك:</p>',
            '<p>Excel تابع فازی ندارد. از Power Query (زبانهٔ بعدی) یا افزونهٔ <em>Fuzzy Lookup</em> مایکروسافت (فقط ویندوز) استفاده کن. در هر حال با یک برگهٔ کوچک <code>Mapping</code> تمام کن: یک ستون «همان‌طور که نوشته شده» و یک ستون «تأییدشده» که با جفت‌های پذیرفته‌شده پر می‌شود. بعد یک جست‌وجوی دقیق در برابر نگاشت نام‌ها را درست می‌کند و نگاشت گزارش تصمیم توست:</p>',
          ),
          code(xl.mapping),
        ],
        [code(py.fuzzy), code(py.approve)],
        [
          html(
            '<p><strong>Home ▸ Merge Queries</strong>, choose both tables and columns, tick <strong>Use fuzzy matching to perform the merge</strong>, and open <em>Fuzzy matching options</em>: <em>Similarity threshold</em> (0 to 1, default 0.8), <em>Ignore case</em>, <em>Maximum number of matches</em> and a <em>Transformation table</em> where you can teach it that "Limited" means "Ltd". Power Query scores texts by its own method, so its numbers will not match the Python scores above. The habit transfers, not the number: read every pair.</p>',
            '<p><strong>Home ▸ Merge Queries</strong>، اختر الجدولين والعمودين، وفعّل <strong>Use fuzzy matching to perform the merge</strong>، وافتح <em>Fuzzy matching options</em>: <em>Similarity threshold</em> (من 0 إلى 1، الافتراضي 0.8) و<em>Ignore case</em> و<em>Maximum number of matches</em> و<em>Transformation table</em> حيث تعلّمه أن "Limited" تعني "Ltd". يقيّم Power Query النصوص بطريقته، فلن تطابق أرقامه درجات Python أعلاه. العادة هي التي تنتقل لا الرقم: اقرأ كل زوج.</p>',
            '<p><strong>Home ▸ Merge Queries</strong>، هر دو جدول و ستون را انتخاب کن، <strong>Use fuzzy matching to perform the merge</strong> را تیک بزن و <em>Fuzzy matching options</em> را باز کن: <em>Similarity threshold</em> (از ۰ تا ۱، پیش‌فرض ۰٫۸)، <em>Ignore case</em>، <em>Maximum number of matches</em> و یک <em>Transformation table</em> که می‌توانی در آن یاد بدهی «Limited» یعنی «Ltd». Power Query متن‌ها را با روش خودش نمره می‌دهد، پس عددهایش با نمره‌های Python بالا یکی نیست. عادت منتقل می‌شود، نه عدد: هر جفت را بخوان.</p>',
          ),
          code(m.fuzzy),
        ],
      ),
      {
        type: 'box',
        variant: 'keypoint',
        label: t('A safe order of work', 'ترتيب عمل آمن', 'ترتیب کار امن'),
        html: t(
          '<p><strong>1.</strong> Clean both sides. <strong>2.</strong> Exact lookup. <strong>3.</strong> Fuzzy-match only what is left. <strong>4.</strong> Read each proposed pair and keep the ones you accept in a mapping table. <strong>5.</strong> Look up again: no <code>#N/A</code> left, and the mapping is the log entry. With the mapping applied, all 23 orders find a region.</p>',
          '<p><strong>1.</strong> نظّف الطرفين. <strong>2.</strong> بحث دقيق. <strong>3.</strong> طابق تقريبيًا ما تبقى فقط. <strong>4.</strong> اقرأ كل زوج مقترح واحتفظ بما تقبله في جدول ربط. <strong>5.</strong> ابحث مجددًا: لا يبقى <code>#N/A</code>، ويكون جدول الربط مدخل السجل. وبعد تطبيق الربط تجد الطلبات الـ23 كلها منطقتها.</p>',
          '<p><strong>۱.</strong> هر دو طرف را تمیز کن. <strong>۲.</strong> جست‌وجوی دقیق. <strong>۳.</strong> فقط باقی‌مانده را فازی تطبیق بده. <strong>۴.</strong> هر جفت پیشنهادی را بخوان و آنچه می‌پذیری در یک جدول نگاشت نگه دار. <strong>۵.</strong> دوباره جست‌وجو کن: <code>#N/A</code> نمی‌ماند و نگاشت همان ثبت گزارش است. با اعمال نگاشت، هر ۲۳ سفارش منطقهٔ خود را پیدا می‌کنند.</p>',
        ),
      },
      { type: 'exercise', questionId: 'w05-q012' },
    ],
  },
]

// ---------- Sections 11-15: AI co-pilot, worked example, mistakes, homework, what is next ----------
const closing: Sections = [
  {
    id: 'tools-and-ai',
    navLabel: t('AI co-pilot', 'مساعد الذكاء الاصطناعي', 'همیار هوش مصنوعی'),
    sectionLabel: t('Section 11', 'القسم ١١', 'بخش ۱۱'),
    timeEst: t('6 min', '٦ دقائق', '۶ دقیقه'),
    headingHtml: t(
      '<h2>The AI co-pilot: ask for a plan and the formulas, then check two numbers</h2><p class="standfirst">An AI assistant is good at the awkward formula (<code>UNICHAR(160)</code>!) and at suggesting Power Query steps. It does not know your file, and it will say "done" about a table it never checked.</p>',
      '<h2>مساعد الذكاء الاصطناعي: اطلب خطة والمعادلات، ثم تحقق من رقمين</h2><p class="standfirst">يجيد مساعد الذكاء الاصطناعي المعادلة المعقدة (<code>UNICHAR(160)</code>!) واقتراح خطوات Power Query. لكنه لا يعرف ملفك، وسيقول "تم" عن جدول لم يفحصه.</p>',
      '<h2>همیار هوش مصنوعی: برنامه و فرمول‌ها را بخواه، بعد دو عدد را بررسی کن</h2><p class="standfirst">یک دستیار هوش مصنوعی در نوشتن فرمول پیچیده (<code>UNICHAR(160)</code>!) و پیشنهاد گام‌های Power Query خوب است. فایل تو را نمی‌شناسد و دربارهٔ جدولی که هرگز بررسی نکرده می‌گوید «تمام شد».</p>',
    ),
    blocks: [
      {
        type: 'tabs',
        tabs: [
          {
            label: t('Weak prompt', 'طلب ضعيف', 'درخواست ضعیف'),
            blocks: [
              html(
                '<p>"Clean this data." A typical answer trims the names, deletes the TEST row, removes the one exact duplicate, and reports "Done: 24 clean rows". Three things went wrong without a single error: the copy of order 1007 (trailing space) is still there, the 12 dates with a day of 12 or less were read month-first, and the price written with a dot became 500. The totals are wrong and nothing says so.</p>',
                '<p>"نظّف هذه البيانات." الإجابة النموذجية تقصّ الأسماء، وتحذف صف TEST، وتزيل النسخة المطابقة الوحيدة، وتبلّغ "تم: 24 صفًا نظيفًا". ساءت ثلاثة أشياء دون خطأ واحد: ما زالت نسخة الطلب 1007 (بمسافة لاحقة) موجودة، وقُرئت التواريخ الـ12 التي يومها 12 أو أقل بالشهر أولًا، وصار السعر المكتوب بنقطة 500. الإجماليات خاطئة ولا شيء يقول ذلك.</p>',
                '<p>«این داده را تمیز کن.» یک پاسخ معمولی نام‌ها را مرتب می‌کند، سطر TEST را حذف می‌کند، تنها کپی دقیق را برمی‌دارد و گزارش می‌دهد «تمام شد: ۲۴ سطر تمیز». سه چیز بدون یک خطا خراب شد: کپی سفارش ۱۰۰۷ (با فاصلهٔ پایانی) هنوز هست، ۱۲ تاریخی که روزشان ۱۲ یا کمتر است ماه‌اول خوانده شدند و قیمتی که با نقطه نوشته شده بود ۵۰۰ شد. جمع‌ها غلط‌اند و هیچ‌چیز نمی‌گوید.</p>',
              ),
            ],
          },
          {
            label: t('Strong prompt', 'طلب قوي', 'درخواست قوی'),
            blocks: [
              code(`I have a 26-row wholesale order export (CSV, pasted below) and a customer list (also pasted).
Columns: order_id; customer; order_date (text, DD/MM/YYYY); flavor; jars;
unit_price (text, decimal comma, one row uses a dot); postcode (keep as text).
Do NOT change or delete anything yet. First:
1. List every row that breaks a rule: jars not a whole number 1-500, unit_price outside 3-8,
   order_date outside June 2024, flavor not Strawberry/Blueberry/Peach/Lemon.
2. List text problems: extra or non-breaking spaces, capitals, and customer names
   that do not match the customer list.
3. Flag outliers in jars with the IQR rule and tell me the fences.
4. Give me Excel formulas (not pasted values) for the helper columns, plus a change log.
Read dates day-first. Expected after cleaning: 23 rows, 1,104 jars.
If you get a different number, explain which row differs and why.`),
            ],
          },
        ],
      },
      {
        type: 'box',
        variant: 'keypoint',
        label: t('Key point', 'نقطة أساسية', 'نکتهٔ کلیدی'),
        html: t(
          '<p>Ask the AI to <em>list, propose and write formulas</em>, not to clean. Then check yourself: the row count (23), the total jars (1,104), and three dates by hand (order 1001 must be 3 June). If any of them is off, find the row the AI treated differently from your change log before you use its result.</p>',
          '<p>اطلب من الذكاء الاصطناعي أن <em>يسرد ويقترح ويكتب المعادلات</em>، لا أن ينظّف. ثم تحقّق بنفسك: عدد الصفوف (23)، وإجمالي البرطمانات (1,104)، وثلاثة تواريخ يدويًا (يجب أن يكون الطلب 1001 في 3 يونيو). إن اختلف أحدها فاعثر على الصف الذي عامله الذكاء الاصطناعي بشكل مختلف عن سجل تغييراتك قبل أن تستخدم نتيجته.</p>',
          '<p>از هوش مصنوعی بخواه <em>فهرست کند، پیشنهاد دهد و فرمول بنویسد</em>، نه اینکه تمیز کند. بعد خودت بررسی کن: تعداد سطرها (۲۳)، جمع شیشه‌ها (۱٬۱۰۴) و سه تاریخ را دستی (سفارش ۱۰۰۱ باید ۳ ژوئن باشد). اگر هر کدام نخواند، پیش از استفاده از نتیجه با کمک گزارش تغییراتت سطری را که هوش مصنوعی متفاوت رفتار کرده پیدا کن.</p>',
        ),
      },
      { type: 'exercise', questionId: 'w05-q013' },
    ],
  },
  {
    id: 'worked-example',
    navLabel: t('Worked example', 'مثال تطبيقي', 'مثال حل‌شده'),
    sectionLabel: t('Section 12', 'القسم ١٢', 'بخش ۱۲'),
    timeEst: t('10 min', '١٠ دقائق', '۱۰ دقیقه'),
    headingHtml: t(
      '<h2>Worked example: from 26 messy rows to 23 clean orders</h2><p class="standfirst">The whole cleaning run on the wholesale export, in the order of this week\'s sections, with the change log you would keep. Every row id below is an order in the file you downloaded.</p>',
      '<h2>مثال تطبيقي: من 26 صفًا فوضويًا إلى 23 طلبًا نظيفًا</h2><p class="standfirst">عملية التنظيف كاملة على تصدير الجملة، بترتيب أقسام هذا الأسبوع، مع سجل التغييرات الذي ستحتفظ به. كل رقم صف أدناه هو طلب في الملف الذي نزّلته.</p>',
      '<h2>مثال حل‌شده: از ۲۶ سطر نامرتب تا ۲۳ سفارش تمیز</h2><p class="standfirst">کل اجرای پاک‌سازی روی خروجی عمده‌فروشی، به ترتیب بخش‌های این هفته و با گزارش تغییراتی که باید نگه داری. هر شناسهٔ سطر زیر یک سفارش در فایلی است که دانلود کردی.</p>',
    ),
    blocks: [
      toolTabs(
        [
          html(
            '<ol><li><strong>Import</strong> with Semicolon and UTF-8; <code>postcode</code> as Text. Name the sheet <code>raw</code>. Copy it to <code>work</code>.</li><li><strong>Text:</strong> <code>H2 =TRIM(CLEAN(SUBSTITUTE(B2, UNICHAR(160), " ")))</code>, <code>I2 =PROPER(TRIM(D2))</code>.</li><li><strong>Types:</strong> <code>J2</code> with <code>DATE(RIGHT, MID, LEFT)</code>, <code>K2</code> with <code>NUMBERVALUE(SUBSTITUTE(…))</code>; check both with <code>ISNUMBER</code>.</li><li><strong>Validation:</strong> add the rules, <em>Circle Invalid Data</em>, fix orders 1014, 1017 and 1020, delete the test row 1024.</li><li><strong>Duplicates:</strong> <code>L2 =COUNTIFS($A$2:A2, A2)</code>; delete rows where it is 2 (the copies of 1007 and 1011).</li><li><strong>Outliers:</strong> fences 0 and 96 flag order 1018; the owner confirms 36.</li><li><strong>Match:</strong> <code>XLOOKUP</code> finds 19 of 23; the <code>Mapping</code> sheet fixes the other 4; look up again.</li><li><strong>Paste values</strong> of the finished columns into a new <code>clean</code> sheet, and write each change in <code>log</code>.</li></ol>',
            '<ol><li><strong>استورد</strong> بـ Semicolon وUTF-8؛ و<code>postcode</code> كـ Text. سمِّ الورقة <code>raw</code>. انسخها إلى <code>work</code>.</li><li><strong>النص:</strong> <code>H2 =TRIM(CLEAN(SUBSTITUTE(B2, UNICHAR(160), " ")))</code> و<code>I2 =PROPER(TRIM(D2))</code>.</li><li><strong>الأنواع:</strong> <code>J2</code> بـ <code>DATE(RIGHT, MID, LEFT)</code> و<code>K2</code> بـ <code>NUMBERVALUE(SUBSTITUTE(…))</code>؛ وتحقق من كليهما بـ <code>ISNUMBER</code>.</li><li><strong>التحقق:</strong> أضف القواعد، و<em>Circle Invalid Data</em>، وأصلح الطلبات 1014 و1017 و1020، واحذف صف الاختبار 1024.</li><li><strong>التكرارات:</strong> <code>L2 =COUNTIFS($A$2:A2, A2)</code>؛ واحذف الصفوف التي قيمتها 2 (نسختا 1007 و1011).</li><li><strong>القيم المتطرفة:</strong> يعلّم الحدان 0 و96 الطلب 1018؛ ويؤكد المالك 36.</li><li><strong>المطابقة:</strong> يجد <code>XLOOKUP</code> 19 من 23؛ وتصلح ورقة <code>Mapping</code> الأربعة الباقية؛ ثم ابحث مجددًا.</li><li><strong>الصق قيم</strong> الأعمدة المنتهية في ورقة <code>clean</code> جديدة، واكتب كل تغيير في <code>log</code>.</li></ol>',
            '<ol><li><strong>وارد کن</strong> با Semicolon و UTF-8؛ <code>postcode</code> را Text بگذار. برگه را <code>raw</code> نام بگذار و به <code>work</code> کپی کن.</li><li><strong>متن:</strong> <code>H2 =TRIM(CLEAN(SUBSTITUTE(B2, UNICHAR(160), " ")))</code> و <code>I2 =PROPER(TRIM(D2))</code>.</li><li><strong>نوع‌ها:</strong> <code>J2</code> با <code>DATE(RIGHT, MID, LEFT)</code>، <code>K2</code> با <code>NUMBERVALUE(SUBSTITUTE(…))</code>؛ هر دو را با <code>ISNUMBER</code> بررسی کن.</li><li><strong>اعتبارسنجی:</strong> قاعده‌ها را اضافه کن، <em>Circle Invalid Data</em> را بزن، سفارش‌های ۱۰۱۴، ۱۰۱۷ و ۱۰۲۰ را اصلاح کن و سطر آزمایشی ۱۰۲۴ را حذف کن.</li><li><strong>تکرارها:</strong> <code>L2 =COUNTIFS($A$2:A2, A2)</code>؛ سطرهایی را که ۲ است حذف کن (کپی‌های ۱۰۰۷ و ۱۰۱۱).</li><li><strong>داده‌های پرت:</strong> حدهای ۰ و ۹۶ سفارش ۱۰۱۸ را علامت می‌زنند؛ صاحب غرفه ۳۶ را تأیید می‌کند.</li><li><strong>تطبیق:</strong> <code>XLOOKUP</code> ۱۹ تا از ۲۳ را پیدا می‌کند؛ برگهٔ <code>Mapping</code> ۴ تای دیگر را درست می‌کند؛ دوباره جست‌وجو کن.</li><li><strong>مقدارهای</strong> ستون‌های تمام‌شده را در یک برگهٔ <code>clean</code> جدید بچسبان و هر تغییر را در <code>log</code> بنویس.</li></ol>',
          ),
        ],
        [
          html(
            `<p>The cells of this week, in order, are also a notebook: <a href="${notebookUrl}" target="_blank" rel="noopener">open it in Colab</a>, then <em>Runtime ▸ Run all</em>. The last cell (below) approves the fuzzy matches and ends with the numbers to check.</p>`,
            `<p>خلايا هذا الأسبوع بالترتيب متاحة أيضًا كدفتر: <a href="${notebookUrl}" target="_blank" rel="noopener">افتحه في Colab</a> ثم <em>Runtime ▸ Run all</em>. الخلية الأخيرة (أدناه) تعتمد المطابقات التقريبية وتنتهي بالأرقام التي تتحقق منها.</p>`,
            `<p>سلول‌های این هفته به ترتیب یک دفترچه هم هستند: <a href="${notebookUrl}" target="_blank" rel="noopener">در Colab بازش کن</a> و بعد <em>Runtime ▸ Run all</em>. آخرین سلول (زیر) تطابق‌های فازی را تأیید می‌کند و به عددهایی که باید بررسی کنی می‌رسد.</p>`,
          ),
          code(py.approve),
        ],
        [
          code(m.clean),
          code(m.fuzzy),
          html(
            '<p>With the import code from Section 3 this is the whole query. The same run shows up under <em>Applied steps</em> on the right of the Power Query window, one line per step, which is itself a change log.</p>',
            '<p>مع كود الاستيراد من القسم 3 يكتمل الاستعلام. وتظهر العملية نفسها تحت <em>Applied steps</em> على يمين نافذة Power Query، سطرًا لكل خطوة، وهذا بحد ذاته سجل تغييرات.</p>',
            '<p>با کد وارد کردن بخش ۳، این کل کوئری است. همین اجرا زیر <em>Applied steps</em> در سمت راست پنجرهٔ Power Query هم دیده می‌شود، یک خط برای هر گام، و این خودش یک گزارش تغییرات است.</p>',
          ),
        ],
      ),
      {
        type: 'table',
        headers: [t('Change', 'التغيير', 'تغییر'), t('Rows', 'الصفوف', 'سطرها'), t('From → to', 'من ← إلى', 'از ← به'), t('Why', 'لماذا', 'چرا')],
        rows: [
          [t('Import correctly', 'استيراد صحيح', 'وارد کردن درست'), t('all', 'الكل', 'همه'), t('1 column → 7; postcode stays 02134', 'عمود واحد ← 7؛ ويبقى الرمز 02134', '۱ ستون ← ۷؛ کد پستی ۰۲۱۳۴ می‌ماند'), t('Delimiter, UTF-8, Text', 'الفاصل وUTF-8 وText', 'جداکننده، UTF-8، Text')],
          [t('Clean spaces', 'تنظيف المسافات', 'تمیز کردن فاصله‌ها'), t('1005, 1007 copy, 1016', '1005 ونسخة 1007 و1016', '۱۰۰۵، کپی ۱۰۰۷، ۱۰۱۶'), t('" Sunny Deli ", "Green Grocer Ltd ", non-breaking space → clean names', '" Sunny Deli " و"Green Grocer Ltd " ومسافة غير قابلة للكسر ← أسماء نظيفة', '«" Sunny Deli "»، «"Green Grocer Ltd "»، فاصلهٔ ناشکن ← نام‌های تمیز'), t('Spaces break matching (consistency)', 'تكسر المسافات المطابقة (اتساق)', 'فاصله‌ها تطابق را می‌شکنند (سازگاری)')],
          [t('Standardize flavor', 'توحيد النكهة', 'یکسان‌سازی طعم'), t('1004, 1009', '1004 و1009', '۱۰۰۴، ۱۰۰۹'), t('strawberry, "Blueberry " → Strawberry, Blueberry', 'strawberry و"Blueberry " ← Strawberry وBlueberry', 'strawberry، «"Blueberry "» ← Strawberry، Blueberry'), t('Capitals and a trailing space (consistency)', 'حالة الأحرف ومسافة لاحقة (اتساق)', 'حروف و فاصلهٔ پایانی (سازگاری)')],
          [t('Convert dates and prices', 'تحويل التواريخ والأسعار', 'تبدیل تاریخ و قیمت'), t('all; price of 1011', 'الكل؛ وسعر 1011', 'همه؛ قیمت ۱۰۱۱'), t('text → real dates (day first) and numbers; "5.00" → 5', 'نص ← تواريخ حقيقية (اليوم أولًا) وأرقام؛ و"5.00" ← 5', 'متن ← تاریخ و عدد واقعی (روز اول)؛ «5.00» ← ۵'), t('Text cannot be summed; dot would read as 500', 'لا يمكن جمع النص؛ والنقطة تُقرأ 500', 'متن جمع‌پذیر نیست؛ نقطه ۵۰۰ خوانده می‌شود')],
          [t('Fix misspelling', 'إصلاح خطأ إملائي', 'اصلاح غلط املایی'), t('1020', '1020', '۱۰۲۰'), t('Peech → Peach', 'Peech ← Peach', 'Peech ← Peach'), t('Failed the flavor list rule (validity)', 'فشل في قاعدة قائمة النكهات (صلاحية)', 'قاعدهٔ فهرست طعم را رد کرد (اعتبار)')],
          [t('Fix sign', 'إصلاح الإشارة', 'اصلاح علامت'), t('1014', '1014', '۱۰۱۴'), t('-24 → 24', '‎-24 ← 24', '‎-۲۴ ← ۲۴'), t('Failed 1-500; sign error confirmed by the owner (validity)', 'فشل في 1-500؛ خطأ إشارة أكّده المالك (صلاحية)', 'قاعدهٔ ۱ تا ۵۰۰ را رد کرد؛ خطای علامت، تأییدشده توسط صاحب غرفه (اعتبار)')],
          [t('Fix year', 'إصلاح السنة', 'اصلاح سال'), t('1017', '1017', '۱۰۱۷'), t('21/06/2025 → 21/06/2024', '21/06/2025 ← 21/06/2024', '21/06/2025 ← 21/06/2024'), t('Outside June 2024 (validity)', 'خارج يونيو 2024 (صلاحية)', 'خارج از ژوئن ۲۰۲۴ (اعتبار)')],
          [t('Remove test row', 'حذف صف الاختبار', 'حذف سطر آزمایشی'), t('1024', '1024', '۱۰۲۴'), t('deleted', 'حُذف', 'حذف شد'), t('Customer TEST, 0 jars: a till set-up row', 'العميل TEST و0 برطمان: صف إعداد للجهاز', 'مشتری TEST، ۰ شیشه: سطر راه‌اندازی صندوق')],
          [t('Remove duplicates', 'إزالة التكرارات', 'حذف تکرارها'), t('1007 copy, 1011 copy', 'نسخة 1007 ونسخة 1011', 'کپی ۱۰۰۷، کپی ۱۰۱۱'), t('deleted', 'حُذفتا', 'حذف شدند'), t('Same order_id, identical once cleaned (uniqueness)', 'order_id نفسه ومتطابقان بعد التنظيف (تفرّد)', 'order_id یکسان و پس از تمیزکاری یکسان (یکتایی)')],
          [t('Fix outlier', 'إصلاح قيمة متطرفة', 'اصلاح داده پرت'), t('1018', '1018', '۱۰۱۸'), t('360 → 36', '360 ← 36', '۳۶۰ ← ۳۶'), t('Above the 96 fence; invoice shows an extra zero', 'فوق حد 96؛ تُظهر الفاتورة صفرًا زائدًا', 'بالاتر از حد ۹۶؛ فاکتور یک صفر اضافه نشان می‌دهد')],
          [t('Match customers', 'مطابقة العملاء', 'تطبیق مشتری‌ها'), t('1002, 1013, 1015, 1019', '1002 و1013 و1015 و1019', '۱۰۰۲، ۱۰۱۳، ۱۰۱۵، ۱۰۱۹'), t('Cafe Rose → Café Rosé; Greengrocer Ltd. and Green Grocers Limited → Green Grocer Ltd; Harbor Market → Harbour Market', 'Cafe Rose ← Café Rosé؛ وGreengrocer Ltd. وGreen Grocers Limited ← Green Grocer Ltd؛ وHarbor Market ← Harbour Market', 'Cafe Rose ← Café Rosé؛ Greengrocer Ltd. و Green Grocers Limited ← Green Grocer Ltd؛ Harbor Market ← Harbour Market'), t('Fuzzy matches, each read and approved', 'مطابقات تقريبية قُرئت واعتُمدت كلٌّ منها', 'تطابق‌های فازی، هر کدام خوانده و تأیید شد')],
        ],
      },
      html(
        '<p><strong>Control step:</strong> check the clean sheet the way Week 4 profiled the raw one: 23 rows, no <code>#N/A</code>, 7 customers, 4 flavors, jars from 24 to 84, 1,104 jars and 5,520.00 revenue (jars × price). Every region is complete: Central 1,728.00 (8 orders), Coast 1,698.00 (7), North 2,094.00 (8). The raw export, summed as it came, said 1,488 jars and 7,428.00: about <strong>35% too much revenue</strong>, from copies, a test row and two typos, with no error message anywhere.</p>',
        '<p><strong>خطوة التحكم:</strong> افحص الورقة النظيفة كما فحص الأسبوع 4 الورقة الخام: 23 صفًا، بلا <code>#N/A</code>، و7 عملاء، و4 نكهات، وبرطمانات من 24 إلى 84، و1,104 برطمانات وإيراد 5,520.00 (البرطمانات × السعر). كل منطقة مكتملة: Central ‏1,728.00 (8 طلبات) وCoast ‏1,698.00 (7) وNorth ‏2,094.00 (8). أما التصدير الخام مجموعًا كما جاء فقال 1,488 برطمانًا و7,428.00: أي نحو <strong>35% زيادة في الإيراد</strong>، من نسخ وصف اختبار وخطأين مطبعيين، دون رسالة خطأ واحدة.</p>',
        '<p><strong>گام کنترل:</strong> برگهٔ تمیز را همان‌طور بررسی کن که هفتهٔ ۴ برگهٔ خام را پروفایل کرد: ۲۳ سطر، بدون <code>#N/A</code>، ۷ مشتری، ۴ طعم، شیشه‌ها از ۲۴ تا ۸۴، ۱٬۱۰۴ شیشه و ۵٬۵۲۰٫۰۰ درآمد (شیشه × قیمت). هر منطقه کامل است: Central ‏۱٬۷۲۸٫۰۰ (۸ سفارش)، Coast ‏۱٬۶۹۸٫۰۰ (۷)، North ‏۲٬۰۹۴٫۰۰ (۸). خروجی خام، همان‌طور که بود جمع زده شود، ۱٬۴۸۸ شیشه و ۷٬۴۲۸٫۰۰ می‌گفت: حدود <strong>۳۵٪ درآمد بیشتر از واقع</strong>، از کپی‌ها، یک سطر آزمایشی و دو غلط تایپی، بدون هیچ پیام خطایی.</p>',
      ),
    ],
  },
  {
    id: 'common-mistakes',
    navLabel: t('Common mistakes', 'أخطاء شائعة', 'اشتباهات رایج'),
    sectionLabel: t('Section 13', 'القسم ١٣', 'بخش ۱۳'),
    headingHtml: t(
      '<h2>Common mistakes</h2><p class="standfirst">Every one of these gives a clean-looking sheet with wrong numbers in it, and most give no error message.</p>',
      '<h2>أخطاء شائعة</h2><p class="standfirst">كل واحد من هذه الأخطاء ينتج ورقة تبدو نظيفة وفيها أرقام خاطئة، ومعظمها لا يعطي رسالة خطأ.</p>',
      '<h2>اشتباهات رایج</h2><p class="standfirst">هر کدام از این‌ها برگه‌ای تمیزنما با عددهای غلط می‌دهد و بیشترشان هیچ پیام خطایی نمی‌دهند.</p>',
    ),
    blocks: [
      {
        type: 'table',
        headers: [t('Mistake', 'الخطأ', 'اشتباه'), t('What goes wrong', 'ما الذي يفسد', 'چه چیزی خراب می‌شود'), t('Instead', 'بدلًا من ذلك', 'به‌جایش')],
        rows: [
          [t('Opening the CSV by double-click', 'فتح CSV بالنقر المزدوج', 'باز کردن CSV با دوبار کلیک'), t('Excel guesses: one column, 2134, "CafÃ©", swapped dates', 'يخمّن Excel: عمود واحد و2134 و"CafÃ©" وتواريخ مقلوبة', 'Excel حدس می‌زند: یک ستون، ۲۱۳۴، «CafÃ©»، تاریخ‌های جابه‌جا'), t('Import with Data ▸ From Text/CSV and set each option', 'استورد بـ Data ▸ From Text/CSV واضبط كل خيار', 'با Data ▸ From Text/CSV وارد کن و هر گزینه را تنظیم کن')],
          [t('Editing the raw sheet', 'تعديل الورقة الخام', 'ویرایش برگهٔ خام'), t('No way to check or undo a fix', 'لا سبيل للتحقق من إصلاح أو التراجع عنه', 'راهی برای بررسی یا برگرداندن یک اصلاح نیست'), t('Work on a copy and log every change', 'اعمل على نسخة وسجّل كل تغيير', 'روی کپی کار کن و هر تغییر را ثبت کن')],
          [t('Trusting TRIM to remove every space', 'الوثوق بأن TRIM يزيل كل مسافة', 'اعتماد به اینکه TRIM هر فاصله‌ای را حذف می‌کند'), t('Non-breaking spaces stay and lookups fail', 'تبقى المسافات غير القابلة للكسر وتفشل البحوث', 'فاصله‌های ناشکن می‌مانند و جست‌وجوها شکست می‌خورند'), t('Check with <code>UNICODE</code>; swap code 160 with <code>SUBSTITUTE</code>', 'افحص بـ <code>UNICODE</code>؛ واستبدل الرمز 160 بـ <code>SUBSTITUTE</code>', 'با <code>UNICODE</code> بررسی کن؛ کد ۱۶۰ را با <code>SUBSTITUTE</code> عوض کن')],
          [t('Converting "5.00" with a decimal-comma rule', 'تحويل "5.00" بقاعدة الفاصلة العشرية', 'تبدیل «5.00» با قاعدهٔ ویرگول اعشاری'), t('The dot is read as thousands: 500', 'تُقرأ النقطة كآلاف: 500', 'نقطه به‌صورت هزارگان خوانده می‌شود: ۵۰۰'), t('Normalize the separator first, then add a range rule', 'وحّد الفاصل أولًا ثم أضف قاعدة مدى', 'ابتدا جداکننده را یکسان کن، بعد قاعدهٔ بازه اضافه کن')],
          [t('Trusting auto-converted dates', 'الوثوق بالتواريخ المحوَّلة تلقائيًا', 'اعتماد به تاریخ‌های تبدیل‌شدهٔ خودکار'), t('Days up to 12 are silently read month-first', 'تُقرأ الأيام حتى 12 بالشهر أولًا بصمت', 'روزهای تا ۱۲ بی‌صدا ماه‌اول خوانده می‌شوند'), t('<code>DATE(RIGHT, MID, LEFT)</code> or <em>Using Locale</em>', '<code>DATE(RIGHT, MID, LEFT)</code> أو <em>Using Locale</em>', '<code>DATE(RIGHT, MID, LEFT)</code> یا <em>Using Locale</em>')],
          [t('Removing duplicates before cleaning text', 'إزالة التكرارات قبل تنظيف النص', 'حذف تکرارها پیش از تمیز کردن متن'), t('Near copies survive (1007)', 'تبقى النسخ شبه المطابقة (1007)', 'کپی‌های تقریبی می‌مانند (۱۰۰۷)'), t('Clean the text, then remove duplicates by the key', 'نظّف النص ثم أزل التكرارات بحسب المفتاح', 'متن را تمیز کن، بعد با کلید تکرارها را حذف کن')],
          [t('Deleting every outlier', 'حذف كل قيمة متطرفة', 'حذف هر داده پرت'), t('A real big sale disappears', 'تختفي صفقة كبيرة حقيقية', 'یک فروش بزرگ واقعی ناپدید می‌شود'), t('Ask the source, then fix or flag', 'اسأل المصدر ثم أصلح أو علّم', 'از منبع بپرس، بعد اصلاح کن یا علامت بزن')],
          [t('Hiding lookup errors with IFERROR', 'إخفاء أخطاء البحث بـ IFERROR', 'پنهان کردن خطاهای جست‌وجو با IFERROR'), t('23% of the revenue vanishes quietly', 'يختفي 23% من الإيراد بهدوء', '۲۳٪ درآمد بی‌صدا ناپدید می‌شود'), t('Let <code>#N/A</code> show, fix the keys', 'اترك <code>#N/A</code> ظاهرًا وأصلح المفاتيح', '<code>#N/A</code> را ببین، کلیدها را درست کن')],
          [t('Approximate lookups (<code>TRUE</code>, or no <code>FALSE</code>)', 'بحث تقريبي (<code>TRUE</code> أو بلا <code>FALSE</code>)', 'جست‌وجوی تقریبی (<code>TRUE</code> یا بدون <code>FALSE</code>)'), t('A wrong value that looks right', 'قيمة خاطئة تبدو صحيحة', 'مقداری غلط که درست به نظر می‌رسد'), t('<code>FALSE</code>, <code>0</code>, or <code>XLOOKUP</code>', '<code>FALSE</code> أو <code>0</code> أو <code>XLOOKUP</code>', '<code>FALSE</code>، <code>0</code> یا <code>XLOOKUP</code>')],
          [t('Accepting every fuzzy match above the threshold', 'قبول كل مطابقة تقريبية فوق العتبة', 'پذیرفتن هر تطابق فازی بالای آستانه'), t('Greenfield Grocer filed under Green Grocer', 'يُسجَّل Greenfield Grocer تحت Green Grocer', 'Greenfield Grocer زیر Green Grocer ثبت می‌شود'), t('Read each pair; keep a mapping table', 'اقرأ كل زوج؛ واحتفظ بجدول ربط', 'هر جفت را بخوان؛ جدول نگاشت نگه دار')],
        ],
      },
    ],
  },
  {
    id: 'homework',
    navLabel: t('Homework', 'الواجب', 'تکلیف'),
    sectionLabel: t('Section 14', 'القسم ١٤', 'بخش ۱۴'),
    headingHtml: t(
      '<h2>Homework: step 2 of your final project</h2><p class="standfirst">Last week you profiled your dataset and planned the cleaning. This week you carry the plan out in Excel, keep the raw file untouched, and write the change log that becomes the "Data cleaning" part of your README.</p>',
      '<h2>الواجب: الخطوة 2 من مشروعك النهائي</h2><p class="standfirst">الأسبوع الماضي فحصتما بياناتكما وخطّطتما للتنظيف. هذا الأسبوع تنفّذان الخطة في Excel، وتُبقيان الملف الخام دون مساس، وتكتبان سجل التغييرات الذي يصير جزء "Data cleaning" في README.</p>',
      '<h2>تکلیف: گام ۲ پروژهٔ نهایی تو</h2><p class="standfirst">هفتهٔ پیش مجموعه‌داده‌ات را پروفایل کردی و برای پاک‌سازی برنامه ریختی. این هفته برنامه را در Excel اجرا می‌کنی، فایل خام را دست‌نخورده نگه می‌داری و گزارش تغییراتی می‌نویسی که بخش «Data cleaning» در README تو می‌شود.</p>',
    ),
    blocks: [week05Homework],
  },
  {
    id: 'before-week-6',
    navLabel: t('Before Week 6', 'قبل الأسبوع 6', 'پیش از هفته ۶'),
    sectionLabel: t('Section 15', 'القسم ١٥', 'بخش ۱۵'),
    headingHtml: t(
      '<h2>Before Week 6</h2><p>You can now take a messy file to a clean table, with every change written down. Week 6 starts modelling what you cleaned: linear regression, which fits a line through two numeric columns and lets you read the slope and R². The line is only as honest as the two columns behind it, which is why the cleaning came first. Bring your clean data and your change log.</p>',
      '<h2>قبل الأسبوع 6</h2><p>أصبح بإمكانك الآن أن تنقل ملفًا فوضويًا إلى جدول نظيف مع تدوين كل تغيير. يبدأ الأسبوع 6 نمذجة ما نظّفته: الانحدار الخطي، الذي يلائم خطًا عبر عمودين رقميين ويتيح لك قراءة الميل وR². الخط لا يكون أصدق من العمودين وراءه، ولهذا جاء التنظيف أولًا. أحضر بياناتك النظيفة وسجل تغييراتك.</p>',
      '<h2>پیش از هفته ۶</h2><p>حالا می‌توانی یک فایل نامرتب را به جدول تمیز برسانی، در حالی که هر تغییر نوشته شده است. هفتهٔ ۶ مدل‌سازی چیزی را که تمیز کرده‌ای شروع می‌کند: رگرسیون خطی که یک خط از میان دو ستون عددی می‌گذراند و می‌گذارد شیب و R² را بخوانی. خط فقط به اندازهٔ دو ستونی که پشت آن است درست‌گوست و برای همین پاک‌سازی اول آمد. دادهٔ تمیز و گزارش تغییراتت را بیاور.</p>',
    ),
    blocks: [],
  },
]

export const weekFive: Week = {
  id: 'week-05',
  originalPdf: '/originals/week-05.pdf',
  order: 5,
  cover: {
    kicker: t('Business Analytics 2 · Week 5', 'تحليلات الأعمال 2 · الأسبوع 5', 'تحلیل کسب‌وکار ۲ · هفته ۵'),
    titleHtml: t(
      '<h1>Data Preparation in Excel:<em>Import, Validate, Clean and Match</em></h1><p class="lede">Last week you learned what to look for in messy data. This week you fix it with your hands: import a file the right way, find the text, numbers and dates Excel misreads, set validation rules, catch duplicates and outliers, and match two tables whose names almost agree, keeping the raw file and a change log all the way.</p>',
      '<h1>تحضير البيانات في Excel:<em>الاستيراد والتحقق والتنظيف والمطابقة</em></h1><p class="lede">تعلّمت الأسبوع الماضي ما تبحث عنه في البيانات الفوضوية. هذا الأسبوع تصلحها بيديك: استيراد ملف بالطريقة الصحيحة، وإيجاد النصوص والأرقام والتواريخ التي يسيء Excel قراءتها، ووضع قواعد التحقق، واصطياد التكرارات والقيم المتطرفة، ومطابقة جدولين تكاد أسماؤهما تتفق، مع الاحتفاظ بالملف الخام وسجل التغييرات طوال الطريق.</p>',
      '<h1>آماده‌سازی داده در Excel:<em>وارد کردن، اعتبارسنجی، پاک‌سازی و تطبیق</em></h1><p class="lede">هفتهٔ پیش یاد گرفتی در دادهٔ نامرتب دنبال چه بگردی. این هفته با دست خودت درستش می‌کنی: فایل را درست وارد می‌کنی، متن، عدد و تاریخی را که Excel اشتباه می‌خواند پیدا می‌کنی، قاعده‌های اعتبارسنجی می‌گذاری، تکرارها و داده‌های پرت را می‌گیری و دو جدولی را که نام‌هایشان تقریباً یکی است به هم وصل می‌کنی، و در تمام راه فایل خام و گزارش تغییرات را نگه می‌داری.</p>',
    ),
    timeEstimate: t(
      '≈ 100 min · reading + Excel, Python and Power Query practice',
      '≈ ١٠٠ دقيقة · قراءة وتدريب Excel وPython وPower Query',
      '≈ ۱۰۰ دقیقه · مطالعه و تمرین Excel، Python و Power Query',
    ),
  },
  questions,
  sections: [...intro, ...typing, ...checks, ...closing],
}
