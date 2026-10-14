import type { Block } from '../../types'
import { L, feedbackTask, projectNotice } from './shared'

// Week 5 homework is step 2 of the pair final project (roadmap on the Final Project page): carry out the Week 4
// cleaning plan in Excel, keep the raw file, and write the change log that becomes the README's "Data cleaning"
// part. Example answers use two customers from the lesson's wholesale export (4 orders each, numbers computed
// from public/data/jam-wholesale-raw.csv): Farm Shop Direct for import and cleaning, Café Rosé for validation
// and matching. They show the format without doing any case study for the students.
export const week05Homework: Block = {
  type: 'homework',
  notice: projectNotice,
  objectives: [
    L(
      'Imported your dataset with the right delimiter, encoding and column types, and kept the raw file untouched',
      'استوردت مجموعة بياناتك بالفاصل والترميز وأنواع الأعمدة الصحيحة، وأبقيت الملف الخام دون مساس',
      'مجموعه‌داده‌ات را با جداکننده، کدگذاری و نوع ستون‌های درست وارد کرده‌ای و فایل خام را دست‌نخورده نگه داشته‌ای',
    ),
    L(
      'Cleaned it by your Week 4 plan, on a copy, with a change log',
      'نظّفتها وفق خطتك من الأسبوع 4، على نسخة، مع سجل تغييرات',
      'آن را طبق برنامهٔ هفتهٔ ۴، روی یک کپی و با گزارش تغییرات تمیز کرده‌ای',
    ),
    L(
      'Applied validation rules and decided, with a reason, what to do about each outlier and duplicate',
      'طبّقت قواعد تحقق وقرّرت، مع السبب، ما يُفعل مع كل قيمة متطرفة وكل تكرار',
      'قاعده‌های اعتبارسنجی گذاشته‌ای و دربارهٔ هر داده پرت و هر تکرار با ذکر دلیل تصمیم گرفته‌ای',
    ),
    L(
      'Matched a second table if your case has one, and written the README "Data cleaning" part',
      'طابقت جدولًا ثانيًا إن كانت حالتك تحتوي واحدًا، وكتبت جزء "Data cleaning" في README',
      'اگر مورد تو جدول دومی دارد آن را تطبیق داده‌ای و بخش «Data cleaning» در README را نوشته‌ای',
    ),
  ],
  scenario: L(
    'The example answers use two customers from this week\'s wholesale export: Farm Shop Direct (orders 1004, 1010, 1016, 1022) for the import and cleaning tasks, and Café Rosé (orders 1002, 1008, 1014, 1020) for validation and matching. Your answers are about your pair\'s own case-study dataset.',
    'تستخدم أمثلة الإجابات عميلين من تصدير الجملة لهذا الأسبوع: Farm Shop Direct (الطلبات 1004 و1010 و1016 و1022) لمهمتي الاستيراد والتنظيف، وCafé Rosé (الطلبات 1002 و1008 و1014 و1020) للتحقق والمطابقة. إجاباتكما تخص مجموعة بيانات دراسة الحالة التي اخترتماها.',
    'نمونه‌پاسخ‌ها از دو مشتری خروجی عمده‌فروشی این هفته استفاده می‌کنند: Farm Shop Direct (سفارش‌های ۱۰۰۴، ۱۰۱۰، ۱۰۱۶، ۱۰۲۲) برای کارهای وارد کردن و پاک‌سازی، و Café Rosé (سفارش‌های ۱۰۰۲، ۱۰۰۸، ۱۰۱۴، ۱۰۲۰) برای اعتبارسنجی و تطبیق. پاسخ‌های شما دربارهٔ مجموعه‌دادهٔ مطالعهٔ موردی خود گروهتان است.',
  ),
  tasks: [
    {
      title: L('Import it the right way and keep the raw file', 'استورد بياناتك بالطريقة الصحيحة واحتفظ بالملف الخام', 'درست وارد کن و فایل خام را نگه دار'),
      prompt: L(
        '<p>Open your dataset the way Section 3 shows (<strong>Data ▸ From Text/CSV</strong> for a CSV): choose the delimiter, the file origin and the type of every column, and load it onto a sheet called <code>raw</code>. Keep an untouched copy of the original file in your <code>data/</code> folder as <code>raw_…</code> and never edit it. Then write down your import choices.</p>',
        '<p>افتح مجموعة بياناتك كما يعرض القسم 3 (<strong>Data ▸ From Text/CSV</strong> لملف CSV): اختر الفاصل وأصل الملف ونوع كل عمود، وحمّلها في ورقة اسمها <code>raw</code>. احتفظ بنسخة غير معدّلة من الملف الأصلي في مجلد <code>data/</code> باسم <code>raw_…</code> ولا تعدّلها أبدًا. ثم دوّن خياراتك في الاستيراد.</p>',
        '<p>مجموعه‌داده‌ات را همان‌طور که بخش ۳ نشان می‌دهد باز کن (برای CSV <strong>Data ▸ From Text/CSV</strong>): جداکننده، File Origin و نوع هر ستون را انتخاب کن و آن را در برگه‌ای به نام <code>raw</code> بارگذاری کن. یک کپی دست‌نخوردهٔ فایل اصلی را در پوشهٔ <code>data/</code> با نام <code>raw_…</code> نگه دار و هرگز ویرایشش نکن. بعد انتخاب‌های وارد کردنت را بنویس.</p>',
      ),
      analogy: L(
        '<p>It is photographing the scene before anyone touches anything. The photo is the raw sheet, and everything that happens afterwards is compared with it.</p>',
        '<p>إنه تصوير المكان قبل أن يلمس أحد أي شيء. الصورة هي الورقة الخام، وكل ما يحدث بعدها يُقارَن بها.</p>',
        '<p>مثل عکس گرفتن از صحنه است پیش از اینکه کسی به چیزی دست بزند. عکس همان برگهٔ خام است و هر چه بعد می‌آید با آن سنجیده می‌شود.</p>',
      ),
      include: [
        L('File name, delimiter, file origin (encoding) and the column types you chose', 'اسم الملف والفاصل وأصل الملف (الترميز) وأنواع الأعمدة التي اخترتها', 'نام فایل، جداکننده، File Origin (کدگذاری) و نوع ستون‌هایی که انتخاب کردی'),
        L('Row and column counts after import (they should match your Week 4 profile)', 'عدد الصفوف والأعمدة بعد الاستيراد (يجب أن يطابق فحصك في الأسبوع 4)', 'تعداد سطرها و ستون‌ها پس از وارد کردن (باید با پروفایل هفتهٔ ۴ بخواند)'),
        L('One column where a wrong guess would have changed the data (zeros, accents, dates, decimals), and what you did about it', 'عمود واحد كان التخمين الخاطئ سيغيّر فيه البيانات (أصفار، تشكيل، تواريخ، كسور) وماذا فعلت حياله', 'یک ستون که حدس غلط داده‌اش را عوض می‌کرد (صفر، اعراب، تاریخ، اعشار) و کاری که برایش کردی'),
      ],
      example: [
        {
          type: 'table',
          headers: [L('Choice', 'الاختيار', 'انتخاب'), L('Setting', 'الإعداد', 'تنظیم')],
          rows: [
            [L('File', 'الملف', 'فایل'), L('<code>jam-wholesale-raw.csv</code>, Farm Shop Direct rows only (4 of the 26)', '<code>jam-wholesale-raw.csv</code>، صفوف Farm Shop Direct فقط (4 من 26)', '<code>jam-wholesale-raw.csv</code>، فقط سطرهای Farm Shop Direct (۴ از ۲۶)')],
            [L('Delimiter, file origin', 'الفاصل وأصل الملف', 'جداکننده، File Origin'), L('Semicolon; 65001: Unicode (UTF-8)', 'Semicolon؛ ‏65001: Unicode (UTF-8)', 'Semicolon؛ ‏65001: Unicode (UTF-8)')],
            [L('Column types', 'أنواع الأعمدة', 'نوع ستون‌ها'), L('<code>order_id</code>, <code>jars</code>: Whole Number; <code>postcode</code>: Text; <code>order_date</code>, <code>unit_price</code>: Text (converted in the next task)', '<code>order_id</code> و<code>jars</code>: ‏Whole Number؛ و<code>postcode</code>: ‏Text؛ و<code>order_date</code> و<code>unit_price</code>: ‏Text (تُحوَّل في المهمة التالية)', '<code>order_id</code> و <code>jars</code>: ‏Whole Number؛ <code>postcode</code>: ‏Text؛ <code>order_date</code> و <code>unit_price</code>: ‏Text (در کار بعد تبدیل می‌شوند)')],
            [L('Check', 'التحقق', 'بررسی'), L('4 rows × 7 columns, as profiled; postcode shows <code>02138</code>', '4 صفوف × 7 أعمدة كما في الفحص؛ ويظهر الرمز البريدي <code>02138</code>', '۴ سطر × ۷ ستون، همان‌طور که پروفایل شده بود؛ کد پستی <code>02138</code> دیده می‌شود')],
          ],
        },
        {
          type: 'html',
          html: L(
            '<p><strong>Where a guess would have hurt:</strong> a double-click would have shown the postcode as 2138, and read the dates 05/06 and 12/06 as 6 May and 6 December. Both look fine and are wrong.</p>',
            '<p><strong>أين كان التخمين سيؤذي:</strong> كان النقر المزدوج سيعرض الرمز البريدي 2138، ويقرأ التاريخين 05/06 و12/06 على أنهما 6 مايو و6 ديسمبر. كلاهما يبدو سليمًا وهو خاطئ.</p>',
            '<p><strong>جایی که حدس آسیب می‌زد:</strong> دوبار کلیک کد پستی را ۲۱۳۸ نشان می‌داد و تاریخ‌های 05/06 و 12/06 را ۶ مه و ۶ دسامبر می‌خواند. هر دو درست به نظر می‌رسند و غلط‌اند.</p>',
          ),
        },
      ],
    },
    {
      title: L('Clean it by your plan, with a change log', 'نظّفها وفق خطتك مع سجل تغييرات', 'طبق برنامه تمیز کن، با گزارش تغییرات'),
      prompt: L(
        '<p>Follow the cleaning plan you wrote in Week 4. On a copy of the raw sheet (<code>work</code>), fix the text, numbers and dates, one helper column per fix, and check each with <code>ISNUMBER</code> or <code>LEN</code>. Write every change in a <code>log</code> sheet: which rows, what was wrong, from → to, and why. If you are not sure a value is wrong, do not change it: write "needs checking" and ask.</p>',
        '<p>اتبع خطة التنظيف التي كتبتها في الأسبوع 4. على نسخة من الورقة الخام (<code>work</code>) أصلح النصوص والأرقام والتواريخ، بعمود مساعد لكل إصلاح، وتحقق من كل منها بـ <code>ISNUMBER</code> أو <code>LEN</code>. اكتب كل تغيير في ورقة <code>log</code>: أي الصفوف، وما الخطأ، ومن ← إلى، ولماذا. وإن لم تكن متأكدًا من أن قيمة خاطئة فلا تغيّرها: اكتب "needs checking" واسأل.</p>',
        '<p>برنامهٔ پاک‌سازی هفتهٔ ۴ را دنبال کن. روی یک کپی از برگهٔ خام (<code>work</code>) متن، عدد و تاریخ را اصلاح کن، برای هر اصلاح یک ستون کمکی، و هر کدام را با <code>ISNUMBER</code> یا <code>LEN</code> بررسی کن. هر تغییر را در برگهٔ <code>log</code> بنویس: کدام سطرها، چه چیزی غلط بود، از ← به، و چرا. اگر مطمئن نیستی مقداری غلط است، عوضش نکن: «needs checking» بنویس و بپرس.</p>',
      ),
      analogy: L(
        '<p>It is an editor\'s marked-up proof. The author can see every change and say no to any one of them. A clean page with no marks asks to be trusted; a marked proof lets you check.</p>',
        '<p>إنه مسودة المحرر المشطوبة والمعلَّمة. يرى المؤلف كل تغيير ويستطيع أن يرفض أيًّا منها. الصفحة النظيفة بلا علامات تطلب الثقة؛ أما المسودة المعلَّمة فتتيح لك التحقق.</p>',
        '<p>مثل غلط‌گیری ویراستار است. نویسنده هر تغییر را می‌بیند و می‌تواند هر کدام را رد کند. صفحهٔ تمیز بدون نشانه اعتماد می‌خواهد؛ غلط‌گیری علامت‌خورده بررسی را ممکن می‌کند.</p>',
      ),
      include: [
        L('The change log: rows, problem, from → to, reason, and who confirmed it if it was not obvious', 'سجل التغييرات: الصفوف والمشكلة ومن ← إلى والسبب ومن أكّد إن لم يكن واضحًا', 'گزارش تغییرات: سطرها، مشکل، از ← به، دلیل و تأییدکننده اگر بدیهی نبود'),
        L('The helper formulas you used (copy two of them)', 'المعادلات المساعدة التي استخدمتها (انسخ اثنتين منها)', 'فرمول‌های کمکی که به کار بردی (دو تا از آن‌ها را کپی کن)'),
        L('Rows before and after, and one check number that proves nothing real was lost (a total, a count)', 'عدد الصفوف قبل وبعد، ورقم تحقق واحد يثبت أنه لم يضِع شيء حقيقي (إجمالي أو عدد)', 'تعداد سطرها قبل و بعد، و یک عدد کنترل که ثابت کند چیز واقعی از دست نرفته (یک جمع یا یک شمارش)'),
      ],
      example: [
        {
          type: 'table',
          headers: [L('Rows', 'الصفوف', 'سطرها'), L('Problem', 'المشكلة', 'مشکل'), L('From → to', 'من ← إلى', 'از ← به'), L('Why', 'لماذا', 'چرا')],
          rows: [
            [L('1004', '1004', '۱۰۰۴'), L('Flavor in lower case', 'نكهة بحروف صغيرة', 'طعم با حروف کوچک'), L('strawberry → Strawberry', 'strawberry ← Strawberry', 'strawberry ← Strawberry'), L('Capitals break grouping (consistency)', 'تكسر حالة الأحرف التجميع (اتساق)', 'حروف گروه‌بندی را می‌شکنند (سازگاری)')],
            [L('1016', '1016', '۱۰۱۶'), L('Non-breaking space in the customer name', 'مسافة غير قابلة للكسر في اسم العميل', 'فاصلهٔ ناشکن در نام مشتری'), L('Farm␣Shop Direct → Farm Shop Direct', 'Farm␣Shop Direct ← Farm Shop Direct', 'Farm␣Shop Direct ← Farm Shop Direct'), L('TRIM does not remove code 160; it blocks the lookup', 'لا يزيل TRIM الرمز 160؛ وهو يمنع البحث', 'TRIM کد ۱۶۰ را حذف نمی‌کند؛ جست‌وجو را مسدود می‌کند')],
            [L('all 4', 'الأربعة كلها', 'هر ۴'), L('Dates and prices stored as text', 'تواريخ وأسعار مخزنة كنص', 'تاریخ و قیمت به‌صورت متن'), L('05/06/2024 → 5 June 2024; 5,00 → 5', '05/06/2024 ← 5 يونيو 2024؛ و5,00 ← 5', '05/06/2024 ← ۵ ژوئن ۲۰۲۴؛ ۵٫۰۰ ← ۵'), L('Day first, with <code>DATE(RIGHT, MID, LEFT)</code>', 'اليوم أولًا، بـ <code>DATE(RIGHT, MID, LEFT)</code>', 'روز اول، با <code>DATE(RIGHT, MID, LEFT)</code>')],
          ],
        },
        {
          type: 'html',
          html: L(
            '<p><strong>Check:</strong> 4 rows before, 4 rows after. Total jars 204 and revenue 1,002.00 (jars × price), the same as these four orders in the lesson\'s clean table. Nothing deleted, nothing marked "needs checking".</p>',
            '<p><strong>التحقق:</strong> 4 صفوف قبل و4 بعد. إجمالي البرطمانات 204 والإيراد 1,002.00 (البرطمانات × السعر)، وهو نفسه لهذه الطلبات الأربعة في الجدول النظيف بالدرس. لم يُحذف شيء ولم يُعلَّم شيء بـ "needs checking".</p>',
            '<p><strong>کنترل:</strong> ۴ سطر قبل، ۴ سطر بعد. جمع شیشه‌ها ۲۰۴ و درآمد ۱٬۰۰۲٫۰۰ (شیشه × قیمت)، همان‌طور که این چهار سفارش در جدول تمیز درس هستند. چیزی حذف نشد و چیزی «needs checking» نخورد.</p>',
          ),
        },
      ],
    },
    {
      title: L('Add validation rules, then decide on outliers and duplicates', 'أضف قواعد تحقق، ثم قرّر بشأن القيم المتطرفة والتكرارات', 'قاعده‌های اعتبارسنجی بگذار، بعد درباره داده‌های پرت و تکرارها تصمیم بگیر'),
      prompt: L(
        '<p>Write 3 to 5 validation rules for your dataset (a type, a range, a list or a length) and apply them with <strong>Data Validation</strong> and <strong>Circle Invalid Data</strong>. Then check for <strong>duplicates</strong> (what makes two rows "the same" in your data?) and <strong>outliers</strong> (IQR fences on one numeric column). For every finding write what you decided and why: fix, flag or delete. An outlier is never deleted just for being unusual.</p>',
        '<p>اكتب 3 إلى 5 قواعد تحقق لمجموعة بياناتك (نوع أو مدى أو قائمة أو طول) وطبّقها بـ <strong>Data Validation</strong> و<strong>Circle Invalid Data</strong>. ثم افحص <strong>التكرارات</strong> (ما الذي يجعل صفين "متماثلين" في بياناتك؟) و<strong>القيم المتطرفة</strong> (حدود IQR على عمود رقمي واحد). لكل ما تجده اكتب ما قررته ولماذا: إصلاح أو تعليم أو حذف. لا تُحذف قيمة متطرفة لمجرد أنها غير معتادة.</p>',
        '<p>۳ تا ۵ قاعدهٔ اعتبارسنجی برای مجموعه‌داده‌ات بنویس (نوع، بازه، فهرست یا طول) و با <strong>Data Validation</strong> و <strong>Circle Invalid Data</strong> اعمالشان کن. بعد <strong>تکرارها</strong> را بررسی کن (چه چیزی دو سطر را در داده‌ات «یکسان» می‌کند؟) و <strong>داده‌های پرت</strong> را (حدهای IQR روی یک ستون عددی). برای هر یافته بنویس چه تصمیمی گرفتی و چرا: اصلاح، علامت‌گذاری یا حذف. یک داده پرت هرگز فقط به‌خاطر غیرمعمول بودن حذف نمی‌شود.</p>',
      ),
      analogy: L(
        '<p>It is the security check at an airport: the rules are the scanner, and you are the person beside it who decides what happens to each beep. A beep is not a verdict.</p>',
        '<p>إنه التفتيش الأمني في المطار: القواعد هي الماسح، وأنت الشخص بجانبه الذي يقرر ما يحدث عند كل صفير. الصفير ليس حكمًا.</p>',
        '<p>مثل بازرسی امنیتی فرودگاه است: قاعده‌ها دستگاه اسکن‌اند و تو آدمی کنار آن هستی که تصمیم می‌گیرد با هر بوق چه شود. بوق حکم نیست.</p>',
      ),
      include: [
        L('A rules table: column, rule, and the rows that broke it', 'جدول قواعد: العمود والقاعدة والصفوف التي خالفتها', 'جدول قاعده‌ها: ستون، قاعده و سطرهایی که نقضش کردند'),
        L('Duplicates: the key you used, how many you found, how many you removed', 'التكرارات: المفتاح الذي استخدمته وكم وجدت وكم أزلت', 'تکرارها: کلیدی که به کار بردی، چند تا پیدا کردی و چند تا حذف کردی'),
        L('Outliers: Q1, Q3, the two fences and the rows outside them', 'القيم المتطرفة: Q1 وQ3 والحدّان والصفوف خارجهما', 'داده‌های پرت: Q1، Q3، دو حد و سطرهای بیرون از آن‌ها'),
        L('One decision per finding, with the reason', 'قرار واحد لكل اكتشاف، مع السبب', 'یک تصمیم برای هر یافته، همراه با دلیل'),
      ],
      example: [
        {
          type: 'table',
          headers: [L('Rule', 'القاعدة', 'قاعده'), L('Rows that broke it', 'الصفوف المخالفة', 'سطرهای متخلف'), L('Decision', 'القرار', 'تصمیم')],
          rows: [
            [L('<code>jars</code>: whole number 1–500', '<code>jars</code>: عدد صحيح 1–500', '<code>jars</code>: عدد صحیح ۱ تا ۵۰۰'), L('1014 (−24)', '1014 (‎−24)', '۱۰۱۴ (‎−۲۴)'), L('Fix to 24: sign error, confirmed by the owner', 'أصلح إلى 24: خطأ إشارة أكّده المالك', 'اصلاح به ۲۴: خطای علامت، تأییدشده توسط صاحب غرفه')],
            [L('<code>flavor</code>: one of the 4 on the price list', '<code>flavor</code>: واحدة من الأربع في قائمة الأسعار', '<code>flavor</code>: یکی از ۴ طعم فهرست قیمت'), L('1020 ("Peech")', '1020 ("Peech")', '۱۰۲۰ («Peech»)'), L('Fix to Peach: a misspelling, the price list has no Peech', 'أصلح إلى Peach: خطأ إملائي، وقائمة الأسعار لا تحوي Peech', 'اصلاح به Peach: غلط املایی، فهرست قیمت Peech ندارد')],
            [L('<code>order_date</code>: June 2024', '<code>order_date</code>: يونيو 2024', '<code>order_date</code>: ژوئن ۲۰۲۴'), L('none', 'لا شيء', 'هیچ'), L('Nothing to decide', 'لا شيء لتقرره', 'چیزی برای تصمیم نیست')],
          ],
        },
        {
          type: 'html',
          html: L(
            '<p><strong>Duplicates:</strong> the key is <code>order_id</code>; a running <code>COUNTIFS</code> never passes 1, so none found and none removed. <strong>Outliers:</strong> after the fixes the jars are 24, 36, 48 and 60. Q1 = 33 and Q3 = 51, so the fences are 6 and 78 and no row is outside. With only 4 rows an IQR check says little: in the lesson\'s 23 rows it is what found the 360.</p>',
            '<p><strong>التكرارات:</strong> المفتاح هو <code>order_id</code>؛ و<code>COUNTIFS</code> التراكمي لا يتجاوز 1 أبدًا، فلا شيء وُجد ولا شيء أُزيل. <strong>القيم المتطرفة:</strong> بعد الإصلاحات تكون البرطمانات 24 و36 و48 و60. Q1 = 33 وQ3 = 51، فالحدّان 6 و78 ولا صف خارجهما. مع 4 صفوف فقط يقول فحص IQR القليل: في صفوف الدرس الـ23 هو الذي وجد الـ360.</p>',
            '<p><strong>تکرارها:</strong> کلید <code>order_id</code> است؛ <code>COUNTIFS</code> تجمعی هرگز از ۱ نمی‌گذرد، پس چیزی پیدا و حذف نشد. <strong>داده‌های پرت:</strong> پس از اصلاح‌ها شیشه‌ها ۲۴، ۳۶، ۴۸ و ۶۰ هستند. Q1 = ۳۳ و Q3 = ۵۱، پس حدها ۶ و ۷۸ هستند و هیچ سطری بیرون نیست. با فقط ۴ سطر، بررسی IQR چیز کمی می‌گوید: در ۲۳ سطر درس همان بود که ۳۶۰ را پیدا کرد.</p>',
          ),
        },
      ],
    },
    {
      title: L('Match your tables and write the README part', 'طابق جداولك واكتب جزء README', 'جدول‌هایت را تطبیق بده و بخش README را بنویس'),
      prompt: L(
        '<p>If your case has a second table (prices, categories, regions…), bring its columns in with an exact lookup and list every key that fails. Fix them by cleaning, or with a mapping table whose pairs you have read yourself. If your case has one table only, say so and show one lookup of your own against a small list you build (for example category → group). Then write the <strong>Data cleaning</strong> part of your README and put the raw and clean files in <code>data/</code>.</p>',
        '<p>إن كانت حالتك تحتوي جدولًا ثانيًا (أسعار أو فئات أو مناطق…) فأحضر أعمدته ببحث دقيق واسرد كل مفتاح يفشل. أصلحها بالتنظيف أو بجدول ربط قرأت أزواجه بنفسك. وإن كانت حالتك جدولًا واحدًا فقل ذلك وأرِ بحثًا واحدًا من عندك مقابل قائمة صغيرة تبنيها (مثلًا الفئة ← المجموعة). ثم اكتب جزء <strong>Data cleaning</strong> في README وضع الملفين الخام والنظيف في <code>data/</code>.</p>',
        '<p>اگر مورد تو جدول دومی دارد (قیمت، دسته، منطقه…)، ستون‌هایش را با جست‌وجوی دقیق بیاور و هر کلیدی را که شکست می‌خورد فهرست کن. با تمیزکاری یا با یک جدول نگاشت که جفت‌هایش را خودت خوانده‌ای درستشان کن. اگر موردت فقط یک جدول دارد، همین را بگو و یک جست‌وجوی خودت را در برابر فهرست کوچکی که می‌سازی نشان بده (مثلاً دسته ← گروه). بعد بخش <strong>Data cleaning</strong> README را بنویس و فایل‌های خام و تمیز را در <code>data/</code> بگذار.</p>',
      ),
      analogy: L(
        '<p>The README part is the cover note of a lab notebook: someone who has never seen your file should be able to repeat your cleaning from it and get the same table.</p>',
        '<p>جزء README هو المذكرة المرفقة بدفتر المختبر: يجب أن يستطيع من لم ير ملفك قط أن يكرر تنظيفك منها ويحصل على الجدول نفسه.</p>',
        '<p>بخش README یادداشت روی جلد دفتر آزمایشگاه است: کسی که هرگز فایل تو را ندیده باید بتواند با آن پاک‌سازی تو را تکرار کند و همان جدول را بگیرد.</p>',
      ),
      include: [
        L('The lookup formula, and how many keys failed before and after', 'معادلة البحث، وكم مفتاحًا فشل قبل وبعد', 'فرمول جست‌وجو و اینکه چند کلید قبل و بعد شکست خوردند'),
        L('For each fixed key: the pair, how you matched it, and that you read it', 'لكل مفتاح مُصلَح: الزوج وكيف طابقته وأنك قرأته', 'برای هر کلید اصلاح‌شده: جفت، روش تطبیق و اینکه خواندی‌اش'),
        L('The README paragraph: what was wrong, what you changed, rows before and after, what you left alone and why', 'فقرة README: ما كان خاطئًا وما غيّرته وعدد الصفوف قبل وبعد وما تركته ولماذا', 'پاراگراف README: چه چیزی غلط بود، چه چیزی را عوض کردی، سطرها قبل و بعد، و آنچه دست نزدی و چرا'),
        L('The files in <code>data/</code>: the raw file and the clean one', 'الملفات في <code>data/</code>: الخام والنظيف', 'فایل‌ها در <code>data/</code>: فایل خام و تمیز'),
      ],
      example: [
        {
          type: 'html',
          html: L(
            '<p><strong>Lookup:</strong> <code>XLOOKUP</code> of the 4 Café Rosé orders against the customer list: 3 found, order 1002 returns NOT FOUND (its name is "Cafe Rose", without accents). <strong>Match:</strong> the closest name is "Café Rosé" with a score of 0.78: below a 0.8 threshold, so it would have been missed, but I read the pair, the only difference is the accents, and I approved it in the <code>Mapping</code> sheet (Cafe Rose → Café Rosé). After the mapping, 0 keys fail.</p>',
            '<p><strong>البحث:</strong> <code>XLOOKUP</code> لطلبات Café Rosé الأربعة مقابل قائمة العملاء: وُجد 3، والطلب 1002 يُرجع NOT FOUND (اسمه "Cafe Rose" بلا تشكيل). <strong>المطابقة:</strong> أقرب اسم هو "Café Rosé" بدرجة 0.78: أقل من عتبة 0.8 فكانت ستفوت، لكنني قرأت الزوج، والفرق الوحيد هو التشكيل، واعتمدته في ورقة <code>Mapping</code> (Cafe Rose ← Café Rosé). بعد الربط لا يفشل أي مفتاح.</p>',
            '<p><strong>جست‌وجو:</strong> <code>XLOOKUP</code> برای ۴ سفارش Café Rosé در برابر فهرست مشتری‌ها: ۳ تا پیدا شد، سفارش ۱۰۰۲ مقدار NOT FOUND برمی‌گرداند (نامش «Cafe Rose» است، بدون اعراب). <strong>تطبیق:</strong> نزدیک‌ترین نام «Café Rosé» با نمرهٔ ۰٫۷۸ است: زیر آستانهٔ ۰٫۸ و از دست می‌رفت، اما جفت را خواندم، تنها فرق اعراب است و در برگهٔ <code>Mapping</code> تأییدش کردم (Cafe Rose ← Café Rosé). پس از نگاشت هیچ کلیدی شکست نمی‌خورد.</p>',
          ),
        },
        {
          type: 'code',
          code: `## Data cleaning

The raw export (kept unchanged as data/raw_orders.csv) was imported with a semicolon delimiter and UTF-8,
with postcode as text. On a copy I removed extra spaces, standardized flavor names, and converted dates (day
first) and prices to real values. Validation rules caught 2 values, both fixed with the owner's confirmation:
order 1014 (jars -24 -> 24, sign error) and order 1020 (flavor "Peech" -> "Peach"). One customer spelling
("Cafe Rose") was matched to "Café Rosé" through a mapping table after I read the pair. 4 rows in, 4 rows
out: 168 jars and 804.00 revenue after the fixes. Nothing was deleted. The full change log is in data/clean_orders.xlsx, sheet "log".`,
        },
      ],
    },
  ],
  feedback: feedbackTask,
}
