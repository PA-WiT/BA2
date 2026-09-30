// Authored for the React app from ../../../../course/ba-source-materials/ba2-week-03.md (the
// "Week 3: Visualizing Data in Excel" deck). The static site has no week-03 page, question bank or
// i18n strings, so nothing here is a mechanical migration.
// Departures from the deck, on purpose:
//  - The running scenario is Week 2's jam stand (a 12-month units-sold log) instead of the deck's
//    "Electronic Store Sales 2024" sheet, whose values only exist as images in the PDF.
//  - The deck says to choose "Histogram" for a scatter plot; a histogram is a different chart, so this
//    week teaches Insert > Scatter (X, Y) on two columns (B1:C13), not A1:C13.
//  - The deck's waterfall used an all-positive Total column; here it uses month-over-month change so
//    increases and decreases both show up.
//  - Added chart-selection and misleading-chart sections, which Week 2's closing section promises.
//  - Week 0 says Python and Power BI arrive from week 3, so every chart section has Excel | Python
//    (Colab) | Power BI tabs. The Python snippets live in `py` below and are also exported to
//    public/notebooks/week-03-visualizing-data.ipynb (regenerate that file if they change).
// ar/fa are draft translations awaiting native review, like the earlier weeks. Code stays English.
import type { Question, Week } from '../types'

const months = [
  { en: 'Jan', ar: 'يناير', fa: 'ژانویه' },
  { en: 'Feb', ar: 'فبراير', fa: 'فوریه' },
  { en: 'Mar', ar: 'مارس', fa: 'مارس' },
  { en: 'Apr', ar: 'أبريل', fa: 'آوریل' },
  { en: 'May', ar: 'مايو', fa: 'مه' },
  { en: 'Jun', ar: 'يونيو', fa: 'ژوئن' },
  { en: 'Jul', ar: 'يوليو', fa: 'ژوئیه' },
  { en: 'Aug', ar: 'أغسطس', fa: 'اوت' },
  { en: 'Sep', ar: 'سبتمبر', fa: 'سپتامبر' },
  { en: 'Oct', ar: 'أكتوبر', fa: 'اکتبر' },
  { en: 'Nov', ar: 'نوفمبر', fa: 'نوامبر' },
  { en: 'Dec', ar: 'ديسمبر', fa: 'دسامبر' },
]

// Units sold per month in 2024: Strawberry, Blueberry, Peach.
const units: [number, number, number][] = [
  [8, 5, 3],
  [10, 6, 3],
  [14, 9, 4],
  [22, 14, 6],
  [34, 22, 10],
  [46, 30, 16],
  [40, 38, 30],
  [28, 36, 44],
  [18, 24, 32],
  [12, 14, 18],
  [9, 8, 8],
  [12, 10, 6],
]

const column = (i: number) => units.map((row) => row[i]).join(', ')
const monthList = months.map((m) => `"${m.en}"`).join(', ')

// Python (Colab) snippets. `py.setup` must run first; every other cell reuses `df`, `flavors`, `colors`.
const py = {
  setup: `import pandas as pd
import matplotlib.pyplot as plt

df = pd.DataFrame({
    "Month": [${monthList}],
    "Strawberry": [${column(0)}],
    "Blueberry":  [${column(1)}],
    "Peach":      [${column(2)}],
})
flavors = ["Strawberry", "Blueberry", "Peach"]
colors = ["#0E6F7E", "#D9A441", "#A8322A"]   # one color per flavor

df["Total"] = df[flavors].sum(axis=1)
# Change vs. the previous month; January has no previous month, so it stays as the starting level
df["Change"] = df["Total"].diff().fillna(df["Total"])
df`,
  bar: `# Clustered columns: flavors side by side within each month
ax = df.plot.bar(x="Month", y=flavors, color=colors, figsize=(9, 4))
ax.set_ylabel("Units sold")
plt.show()`,
  barVariants: `# Stacked columns, and horizontal bars (categories on the y-axis)
df.plot.bar(x="Month", y=flavors, stacked=True, color=colors, figsize=(9, 4))
df.plot.barh(x="Month", y=flavors, color=colors, figsize=(6, 6))
plt.show()`,
  line: `ax = df.plot.line(x="Month", y=flavors, marker="o", color=colors, figsize=(9, 4))
ax.set_ylabel("Units sold")
plt.show()`,
  pie: `totals = df[flavors].sum()   # Strawberry 253, Blueberry 216, Peach 180
ax = totals.plot.pie(autopct="%1.0f%%", colors=colors, ylabel="", figsize=(4, 4))
plt.show()`,
  scatter: `ax = df.plot.scatter(x="Strawberry", y="Blueberry", color="#0E6F7E", figsize=(5, 4))
plt.show()
print("Correlation:", round(df["Strawberry"].corr(df["Blueberry"]), 2))   # about 0.85`,
  waterfall: `# matplotlib has no waterfall chart: draw floating bars that start at the previous month's total
prev_total = df["Total"].shift(1).fillna(0)
bar_colors = ["#55606E" if i == 0 else ("#0E6F7E" if c >= 0 else "#A8322A")
              for i, c in enumerate(df["Change"])]
fig, ax = plt.subplots(figsize=(9, 4))
ax.bar(df["Month"], df["Change"], bottom=prev_total, color=bar_colors)
ax.set_ylabel("Change in total units")
plt.show()`,
  elements: `ax = df.plot.line(x="Month", y=flavors, marker="o", color=colors, figsize=(9, 4))
ax.set_title("Peach overtakes Strawberry in August: plan stock for late summer")
ax.set_xlabel("Month")
ax.set_ylabel("Units sold")
ax.legend(loc="upper left", ncol=3, frameon=False)
ax.grid(axis="y", alpha=0.3)
plt.show()`,
  labels: `# Data labels on a bar chart, and a single accent color
ax = df.plot.bar(x="Month", y="Peach", color="#A8322A", legend=False, figsize=(9, 4))
ax.bar_label(ax.containers[0])
ax.set_ylabel("Peach units sold")
plt.show()`,
  honest: `totals = df[flavors].sum()
fig, (honest, misleading) = plt.subplots(1, 2, figsize=(9, 3.5))

totals.plot.bar(ax=honest, color="#0E6F7E", title="Honest: axis starts at 0")
honest.set_ylim(0, 260)

totals.plot.bar(ax=misleading, color="#A8322A", title="Misleading: axis starts at 150")
misleading.set_ylim(150, 260)

plt.tight_layout()
plt.show()`,
}

// Power BI (DAX) snippets for the same data.
const dax = {
  table: `Jam Sales =
DATATABLE (
    "MonthNo", INTEGER,
    "Month", STRING,
    "Strawberry", INTEGER,
    "Blueberry", INTEGER,
    "Peach", INTEGER,
    {
${units.map((r, i) => `        { ${i + 1}, "${months[i].en}", ${r.join(', ')} }`).join(',\n')}
    }
)`,
  total: `Total = 'Jam Sales'[Strawberry] + 'Jam Sales'[Blueberry] + 'Jam Sales'[Peach]`,
  change: `Change =
'Jam Sales'[Total]
    - LOOKUPVALUE ( 'Jam Sales'[Total], 'Jam Sales'[MonthNo], 'Jam Sales'[MonthNo] - 1 )`,
  flavorTotals: `Flavor Totals =
UNION (
    ROW ( "Flavor", "Strawberry", "Units", SUM ( 'Jam Sales'[Strawberry] ) ),
    ROW ( "Flavor", "Blueberry", "Units", SUM ( 'Jam Sales'[Blueberry] ) ),
    ROW ( "Flavor", "Peach", "Units", SUM ( 'Jam Sales'[Peach] ) )
)`,
}

const sales2024Rows = [
  ...units.map(([s, b, p], i) => [months[i], { en: String(s) }, { en: String(b) }, { en: String(p) }, { en: String(s + b + p) }]),
  [
    { en: '<strong>Total</strong>', ar: '<strong>الإجمالي</strong>', fa: '<strong>مجموع</strong>' },
    { en: '<strong>253</strong>' },
    { en: '<strong>216</strong>' },
    { en: '<strong>180</strong>' },
    { en: '<strong>649</strong>' },
  ],
]

const questions: Question[] = [
  {
    id: 'w03-q001',
    weekId: 'week-03',
    topic: 'welcome',
    answer: 1,
    prompt: {
      en: 'The stand owner wants to know when in the year each flavor sells best. What should you decide before you open the Insert tab?',
      ar: 'يريد صاحب الكشك معرفة متى في السنة تبيع كل نكهة أفضل. ماذا يجب أن تقرر قبل فتح تبويب Insert؟',
      fa: 'صاحب غرفه می‌خواهد بداند هر طعم در چه زمانی از سال بهتر فروش می‌رود. پیش از باز کردن تب Insert باید چه چیزی را مشخص کنی؟',
    },
    options: [
      { en: 'Which color palette looks best', ar: 'أي لوحة ألوان تبدو الأفضل', fa: 'کدام پالت رنگی بهتر به نظر می‌رسد' },
      { en: 'What question the chart has to answer', ar: 'ما السؤال الذي يجب أن يجيب عنه الرسم', fa: 'نمودار باید به چه سؤالی پاسخ دهد' },
      { en: 'Whether to use a 3-D style', ar: 'هل نستخدم نمطًا ثلاثي الأبعاد', fa: 'آیا از سبک سه‌بعدی استفاده کنیم' },
    ],
  },
  {
    id: 'w03-q002',
    weekId: 'week-03',
    topic: 'choosing-a-chart',
    answer: 0,
    prompt: {
      en: 'You want to show how the stand\'s total units sold changed month by month during 2024. Which chart fits best?',
      ar: 'تريد عرض كيف تغيّر إجمالي الوحدات المباعة شهرًا بعد شهر خلال 2024. أي رسم يناسب أكثر؟',
      fa: 'می‌خواهی نشان بدهی کل واحدهای فروخته‌شدهٔ غرفه در طول ۲۰۲۴ ماه‌به‌ماه چگونه تغییر کرده است. کدام نمودار بهتر است؟',
    },
    options: [
      { en: 'A line chart with months on the x-axis', ar: 'رسم خطي والأشهر على المحور السيني', fa: 'نمودار خطی با ماه‌ها روی محور افقی' },
      { en: 'A pie chart with one slice per month', ar: 'رسم دائري بشريحة لكل شهر', fa: 'نمودار دایره‌ای با یک قطعه برای هر ماه' },
      { en: 'A scatter plot of Strawberry against Peach', ar: 'مخطط انتشار للفراولة مقابل الخوخ', fa: 'نمودار پراکندگی توت‌فرنگی در برابر هلو' },
    ],
  },
  {
    id: 'w03-q003',
    weekId: 'week-03',
    topic: 'bar-and-column',
    answer: 2,
    prompt: {
      en: 'Which statement about clustered and stacked column charts is true?',
      ar: 'أي عبارة عن الأعمدة العنقودية والمكدّسة صحيحة؟',
      fa: 'کدام گزاره دربارهٔ ستون‌های خوشه‌ای و انباشته درست است؟',
    },
    options: [
      {
        en: 'Stacked columns make it easiest to compare the middle flavor across months',
        ar: 'الأعمدة المكدّسة تجعل مقارنة النكهة الوسطى عبر الأشهر أسهل ما يكون',
        fa: 'ستون‌های انباشته مقایسهٔ طعم میانی را در طول ماه‌ها آسان‌ترین می‌کنند',
      },
      {
        en: '100% stacked columns show each month\'s total units',
        ar: 'الأعمدة المكدّسة 100% تُظهر إجمالي وحدات كل شهر',
        fa: 'ستون‌های انباشتهٔ ۱۰۰٪ مجموع واحدهای هر ماه را نشان می‌دهند',
      },
      {
        en: 'Clustered columns compare flavors side by side within a month; stacked columns show the month\'s total and its parts',
        ar: 'الأعمدة العنقودية تقارن النكهات جنبًا إلى جنب داخل الشهر؛ والمكدّسة تُظهر إجمالي الشهر وأجزاءه',
        fa: 'ستون‌های خوشه‌ای طعم‌ها را کنار هم در یک ماه مقایسه می‌کنند؛ ستون‌های انباشته مجموع ماه و اجزایش را نشان می‌دهند',
      },
    ],
  },
  {
    id: 'w03-q004',
    weekId: 'week-03',
    topic: 'line-charts',
    answer: 1,
    prompt: {
      en: 'Which of these is the WRONG fit for a line chart?',
      ar: 'أي من هذه هو الاختيار الخاطئ للرسم الخطي؟',
      fa: 'کدام یک از این‌ها انتخاب نادرست برای نمودار خطی است؟',
    },
    options: [
      { en: 'Units sold in each of the 12 months', ar: 'الوحدات المباعة في كل شهر من الأشهر الـ12', fa: 'واحدهای فروخته‌شده در هر یک از ۱۲ ماه' },
      {
        en: 'Total units for Strawberry, Blueberry and Peach, joined by a line',
        ar: 'إجمالي وحدات الفراولة والتوت الأزرق والخوخ، موصولة بخط',
        fa: 'مجموع واحدهای توت‌فرنگی، بلوبری و هلو که با یک خط به هم وصل شده‌اند',
      },
      { en: 'Daily temperature over one week', ar: 'درجة الحرارة اليومية على مدى أسبوع', fa: 'دمای روزانه در طول یک هفته' },
    ],
  },
  {
    id: 'w03-q005',
    weekId: 'week-03',
    topic: 'pie-charts',
    answer: 0,
    prompt: {
      en: 'Which is the best use of a pie chart for this stand?',
      ar: 'ما أفضل استخدام للرسم الدائري لهذا الكشك؟',
      fa: 'بهترین کاربرد نمودار دایره‌ای برای این غرفه کدام است؟',
    },
    options: [
      {
        en: 'Each flavor\'s share of the 2024 total (three slices that add up to the whole)',
        ar: 'حصة كل نكهة من إجمالي 2024 (ثلاث شرائح مجموعها الكل)',
        fa: 'سهم هر طعم از مجموع ۲۰۲۴ (سه قطعه که مجموعشان کل را می‌سازد)',
      },
      { en: 'Units sold in each of the 12 months', ar: 'الوحدات المباعة في كل شهر من الأشهر الـ12', fa: 'واحدهای فروخته‌شده در هر یک از ۱۲ ماه' },
      { en: 'Strawberry against Blueberry, month by month', ar: 'الفراولة مقابل التوت الأزرق، شهرًا بشهر', fa: 'توت‌فرنگی در برابر بلوبری، ماه‌به‌ماه' },
    ],
  },
  {
    id: 'w03-q006',
    weekId: 'week-03',
    topic: 'scatter-plots',
    answer: 2,
    prompt: {
      en: 'In a scatter plot of monthly Strawberry vs. Blueberry units, the points rise together (correlation about 0.85). What can you conclude?',
      ar: 'في مخطط انتشار لوحدات الفراولة مقابل التوت الأزرق شهريًا، ترتفع النقاط معًا (الارتباط نحو 0.85). ماذا يمكنك أن تستنتج؟',
      fa: 'در نمودار پراکندگی واحدهای ماهانهٔ توت‌فرنگی در برابر بلوبری، نقطه‌ها با هم بالا می‌روند (همبستگی حدود ۰٫۸۵). چه نتیجه‌ای می‌توانی بگیری؟',
    },
    options: [
      {
        en: 'Selling more Strawberry causes more Blueberry sales',
        ar: 'بيع المزيد من الفراولة يسبب مبيعات أكثر من التوت الأزرق',
        fa: 'فروش بیشتر توت‌فرنگی باعث فروش بیشتر بلوبری می‌شود',
      },
      {
        en: 'Every Blueberry customer also buys Strawberry',
        ar: 'كل زبون توت أزرق يشتري الفراولة أيضًا',
        fa: 'هر مشتری بلوبری توت‌فرنگی هم می‌خرد',
      },
      {
        en: 'The two move together, probably because both follow the season, but the chart alone does not show cause',
        ar: 'يتحركان معًا، على الأرجح لأن كليهما يتبع الموسم، لكن الرسم وحده لا يُثبت السبب',
        fa: 'این دو با هم حرکت می‌کنند، احتمالاً چون هر دو از فصل پیروی می‌کنند، اما نمودار به‌تنهایی علت را نشان نمی‌دهد',
      },
    ],
  },
  {
    id: 'w03-q007',
    weekId: 'week-03',
    topic: 'waterfall-charts',
    answer: 1,
    prompt: {
      en: 'In a waterfall of the month-over-month change in total units, the September bar is −34. What does that mean?',
      ar: 'في مخطط شلال للتغيّر الشهري في إجمالي الوحدات، عمود سبتمبر يساوي −34. ماذا يعني ذلك؟',
      fa: 'در نمودار آبشاری تغییر ماه‌به‌ماه مجموع واحدها، میلهٔ سپتامبر ‎−۳۴ است. این یعنی چه؟',
    },
    options: [
      { en: 'September sold 34 units in total', ar: 'باع سبتمبر 34 وحدة إجمالًا', fa: 'سپتامبر در مجموع ۳۴ واحد فروخته است' },
      { en: 'Sales fell by 34 units compared with August', ar: 'انخفضت المبيعات بمقدار 34 وحدة مقارنة بأغسطس', fa: 'فروش نسبت به اوت ۳۴ واحد کاهش یافته است' },
      { en: '34 jars were left unsold in September', ar: 'بقيت 34 برطمانًا غير مباعة في سبتمبر', fa: '۳۴ شیشه در سپتامبر فروخته نشده باقی ماند' },
    ],
  },
  {
    id: 'w03-q008',
    weekId: 'week-03',
    topic: 'chart-elements',
    answer: 0,
    prompt: {
      en: 'Which chart title is best for the stand owner?',
      ar: 'أي عنوان للرسم هو الأفضل لصاحب الكشك؟',
      fa: 'کدام عنوان نمودار برای صاحب غرفه بهتر است؟',
    },
    options: [
      {
        en: 'Peach overtakes Strawberry in August: plan stock for late summer',
        ar: 'الخوخ يتفوق على الفراولة في أغسطس: خطّط للمخزون في أواخر الصيف',
        fa: 'هلو در اوت از توت‌فرنگی پیشی می‌گیرد: برای اواخر تابستان موجودی برنامه‌ریزی کن',
      },
      { en: 'Chart 1', ar: 'الرسم 1', fa: 'نمودار ۱' },
      {
        en: 'Units Sold by Month by Flavor 2024 Data',
        ar: 'الوحدات المباعة حسب الشهر حسب النكهة بيانات 2024',
        fa: 'واحدهای فروخته‌شده بر حسب ماه بر حسب طعم داده‌های ۲۰۲۴',
      },
    ],
  },
  {
    id: 'w03-q009',
    weekId: 'week-03',
    topic: 'honest-charts',
    answer: 2,
    prompt: {
      en: 'A bar chart of yearly units (Strawberry 253, Peach 180) has a y-axis that starts at 150, so Strawberry\'s bar looks over three times taller. What went wrong?',
      ar: 'رسم أعمدة للوحدات السنوية (الفراولة 253، الخوخ 180) يبدأ محوره الصادي عند 150، فيبدو عمود الفراولة أطول بأكثر من ثلاثة أضعاف. ما الخطأ؟',
      fa: 'نمودار میله‌ای واحدهای سالانه (توت‌فرنگی ۲۵۳، هلو ۱۸۰) محور عمودی‌ای دارد که از ۱۵۰ شروع می‌شود، پس میلهٔ توت‌فرنگی بیش از سه برابر بلندتر به‌نظر می‌رسد. چه چیزی اشتباه است؟',
    },
    options: [
      { en: 'Nothing: bars should always zoom in on the difference', ar: 'لا شيء: يجب أن تقرّب الأعمدة الفرق دائمًا', fa: 'هیچ‌چیز: میله‌ها همیشه باید روی تفاوت زوم کنند' },
      { en: 'The bars should have been 3-D', ar: 'كان يجب أن تكون الأعمدة ثلاثية الأبعاد', fa: 'میله‌ها باید سه‌بعدی می‌بودند' },
      {
        en: 'The truncated axis exaggerates the gap; bar length must start at zero',
        ar: 'المحور المقتطع يضخّم الفجوة؛ يجب أن يبدأ طول العمود من الصفر',
        fa: 'محور بریده‌شده فاصله را اغراق می‌کند؛ طول میله باید از صفر شروع شود',
      },
    ],
  },
  {
    id: 'w03-q010',
    weekId: 'week-03',
    topic: 'ai-corner',
    answer: 1,
    prompt: {
      en: 'An AI assistant returns a 3-D pie chart with 12 slices, one per month. What should you do?',
      ar: 'يُعيد مساعد ذكاء اصطناعي رسمًا دائريًا ثلاثي الأبعاد بـ12 شريحة، شريحة لكل شهر. ماذا تفعل؟',
      fa: 'یک دستیار هوش مصنوعی نمودار دایره‌ای سه‌بعدی با ۱۲ قطعه، یکی برای هر ماه، برمی‌گرداند. چه می‌کنی؟',
    },
    options: [
      { en: 'Use it: the AI knows which chart is best', ar: 'استخدمه: الذكاء الاصطناعي يعرف أي رسم أفضل', fa: 'از آن استفاده می‌کنم: هوش مصنوعی می‌داند کدام نمودار بهتر است' },
      {
        en: 'Check it against the question: twelve time periods call for a line or column chart, not a pie',
        ar: 'تحقق منه مقابل السؤال: اثنا عشر فترة زمنية تستدعي رسمًا خطيًا أو أعمدة، لا دائريًا',
        fa: 'آن را با سؤال بسنجم: دوازده دورهٔ زمانی نمودار خطی یا ستونی می‌خواهد، نه دایره‌ای',
      },
      { en: 'Add more colors so the slices are easier to tell apart', ar: 'أضف ألوانًا أكثر ليسهل التمييز بين الشرائح', fa: 'رنگ‌های بیشتری اضافه کنم تا قطعه‌ها بهتر تشخیص داده شوند' },
    ],
  },
  {
    id: 'w03-q011',
    weekId: 'week-03',
    topic: 'worked-example',
    answer: 0,
    prompt: {
      en: 'The owner asks: "What share of our 2024 volume is each flavor, and how did each flavor move through the year?" Which pair of charts answers both?',
      ar: 'يسأل صاحب الكشك: "ما حصة كل نكهة من حجم 2024، وكيف تحركت كل نكهة على مدار السنة؟" أي زوج من الرسوم يجيب عن الاثنين؟',
      fa: 'صاحب غرفه می‌پرسد: «سهم هر طعم از حجم ۲۰۲۴ چقدر است و هر طعم در طول سال چگونه حرکت کرده؟» کدام جفت نمودار به هر دو پاسخ می‌دهد؟',
    },
    options: [
      {
        en: 'A pie (or bar) of yearly totals, plus a line chart with one line per flavor',
        ar: 'رسم دائري (أو أعمدة) للإجماليات السنوية، مع رسم خطي بخط لكل نكهة',
        fa: 'یک نمودار دایره‌ای (یا میله‌ای) از مجموع‌های سالانه، به‌علاوهٔ نمودار خطی با یک خط برای هر طعم',
      },
      { en: 'A waterfall plus a scatter plot', ar: 'مخطط شلال مع مخطط انتشار', fa: 'یک نمودار آبشاری به‌علاوهٔ نمودار پراکندگی' },
      { en: 'A single 3-D column chart', ar: 'رسم أعمدة ثلاثي الأبعاد واحد', fa: 'یک نمودار ستونی سه‌بعدی' },
    ],
  },
  {
    id: 'w03-q012',
    weekId: 'week-03',
    topic: 'line-charts',
    answer: 1,
    prompt: {
      en: 'In Power BI, a line chart of the text field Month lists the months as Apr, Aug, Dec, Feb… Why, and what fixes it?',
      ar: 'في Power BI يعرض الرسم الخطي للحقل النصي Month الأشهر هكذا: Apr وAug وDec وFeb… لماذا، وما الحل؟',
      fa: 'در Power BI نمودار خطیِ فیلد متنی Month ماه‌ها را به‌صورت Apr، Aug، Dec، Feb… فهرست می‌کند. چرا، و چه چیزی آن را درست می‌کند؟',
    },
    options: [
      {
        en: 'Power BI cannot chart months; you must retype them as dates',
        ar: 'لا يستطيع Power BI رسم الأشهر؛ يجب إعادة كتابتها كتواريخ',
        fa: 'Power BI نمی‌تواند ماه‌ها را رسم کند؛ باید آن‌ها را به‌صورت تاریخ دوباره تایپ کنی',
      },
      {
        en: 'Text sorts alphabetically; use Column tools › Sort by column with the MonthNo column',
        ar: 'النص يُرتَّب أبجديًا؛ استخدم Column tools › Sort by column مع عمود MonthNo',
        fa: 'متن به ترتیب الفبا مرتب می‌شود؛ از Column tools › Sort by column با ستون MonthNo استفاده کن',
      },
      {
        en: 'The table was typed in the wrong order; delete and re-enter it',
        ar: 'كُتب الجدول بترتيب خاطئ؛ احذفه وأعد إدخاله',
        fa: 'جدول با ترتیب اشتباه تایپ شده؛ آن را پاک کن و دوباره وارد کن',
      },
    ],
  },
  {
    id: 'w03-q013',
    weekId: 'week-03',
    topic: 'pie-charts',
    answer: 0,
    prompt: {
      en: 'A Power BI pie chart is built from a category field (Legend) and a value field. Your flavors sit in three separate columns. What is the standard fix?',
      ar: 'يُبنى الرسم الدائري في Power BI من حقل فئة (Legend) وحقل قيمة. نكهاتك في ثلاثة أعمدة منفصلة. ما الحل المعتاد؟',
      fa: 'نمودار دایره‌ای در Power BI از یک فیلد دسته (Legend) و یک فیلد مقدار ساخته می‌شود. طعم‌های تو در سه ستون جدا هستند. راه‌حل استاندارد چیست؟',
    },
    options: [
      {
        en: 'Reshape to one row per flavor (Flavor, Units) and use Flavor as Legend, Units as Values',
        ar: 'أعد تشكيل البيانات بصف لكل نكهة (Flavor وUnits) واستخدم Flavor كـ Legend وUnits كـ Values',
        fa: 'داده را به یک ردیف برای هر طعم (Flavor، Units) تغییر شکل بده و Flavor را Legend و Units را Values بگذار',
      },
      { en: 'Build three separate pie charts', ar: 'ابنِ ثلاثة رسوم دائرية منفصلة', fa: 'سه نمودار دایره‌ای جدا بساز' },
      { en: 'Rename the columns Slice 1, Slice 2, Slice 3', ar: 'أعد تسمية الأعمدة Slice 1 وSlice 2 وSlice 3', fa: 'ستون‌ها را Slice 1، Slice 2، Slice 3 نام‌گذاری کن' },
    ],
  },
  {
    id: 'w03-q014',
    weekId: 'week-03',
    topic: 'scatter-plots',
    answer: 2,
    prompt: {
      en: 'In Power BI you put Strawberry on X and Blueberry on Y, but see only a single dot. What is missing?',
      ar: 'في Power BI وضعت الفراولة على X والتوت الأزرق على Y، لكنك ترى نقطة واحدة فقط. ما الناقص؟',
      fa: 'در Power BI توت‌فرنگی را روی X و بلوبری را روی Y گذاشتی، اما فقط یک نقطه می‌بینی. چه چیزی کم است؟',
    },
    options: [
      { en: 'A trend line', ar: 'خط اتجاه', fa: 'یک خط روند' },
      { en: 'A dark theme', ar: 'سمة داكنة', fa: 'یک تم تیره' },
      {
        en: 'A field in Values, such as Month, so each month becomes its own dot',
        ar: 'حقل في Values، مثل Month، ليصبح كل شهر نقطة مستقلة',
        fa: 'یک فیلد در Values، مثل Month، تا هر ماه نقطهٔ جداگانه‌ای شود',
      },
    ],
  },
  {
    id: 'w03-q015',
    weekId: 'week-03',
    topic: 'waterfall-charts',
    answer: 1,
    prompt: {
      en: 'In the Python waterfall, what does bottom=prev_total do?',
      ar: 'في مخطط الشلال بـ Python، ماذا يفعل bottom=prev_total؟',
      fa: 'در نمودار آبشاری پایتون، bottom=prev_total چه می‌کند؟',
    },
    options: [
      { en: 'Colors the negative bars red', ar: 'يلوّن الأعمدة السالبة بالأحمر', fa: 'میله‌های منفی را قرمز می‌کند' },
      {
        en: 'Starts each bar at the previous month\'s total, so bars float instead of standing on zero',
        ar: 'يبدأ كل عمود من إجمالي الشهر السابق، فتطفو الأعمدة بدل الوقوف على الصفر',
        fa: 'هر میله را از مجموع ماه قبل شروع می‌کند، پس میله‌ها به‌جای ایستادن روی صفر شناور می‌شوند',
      },
      { en: 'Sorts the months alphabetically', ar: 'يرتّب الأشهر أبجديًا', fa: 'ماه‌ها را به ترتیب الفبا مرتب می‌کند' },
    ],
  },
]

export const weekThree: Week = {
  id: 'week-03',
  order: 3,
  cover: {
    kicker: { en: 'Business Analytics 2 · Week 3', ar: 'تحليلات الأعمال 2 · الأسبوع 3', fa: 'تحلیل کسب‌وکار ۲ · هفته ۳' },
    titleHtml: {
      en: '<h1>Visualizing Data:<em>From Numbers to a Picture That Tells the Truth</em></h1><p class="lede">Last week you learned to compute the right numbers. This week you learn to show them to someone who doesn\'t want to read a table: pick the chart that answers the question, build it in Excel, polish it, and spot the moment a chart quietly misleads.</p>',
      ar: '<h1>تصوير البيانات:<em>من الأرقام إلى صورة تقول الحقيقة</em></h1><p class="lede">تعلّمت الأسبوع الماضي حساب الأرقام الصحيحة. هذا الأسبوع تتعلم عرضها لمن لا يريد قراءة جدول: اختيار الرسم الذي يجيب عن السؤال، وبناؤه في Excel، وتحسينه، وملاحظة اللحظة التي يضلّل فيها الرسم بصمت.</p>',
      fa: '<h1>مصورسازی داده‌ها:<em>از عدد تا تصویری که حقیقت را می‌گوید</em></h1><p class="lede">هفتهٔ گذشته یاد گرفتی اعداد درست را محاسبه کنی. این هفته یاد می‌گیری آن‌ها را به کسی نشان بدهی که نمی‌خواهد جدول بخواند: نموداری را انتخاب کنی که به سؤال پاسخ می‌دهد، آن را در Excel بسازی، صیقل بدهی و لحظه‌ای را که نمودار بی‌سروصدا گمراه می‌کند تشخیص بدهی.</p>',
    },
    timeEstimate: {
      en: '≈ 110 min · reading + Excel, Python and Power BI practice',
      ar: '≈ ١١٠ دقائق · قراءة وتدريب Excel وPython وPower BI',
      fa: '≈ ۱۱۰ دقیقه · مطالعه و تمرین Excel، Python و Power BI',
    },
  },
  questions,
  sections: [
    {
      id: 'welcome',
      navLabel: { en: 'Welcome', ar: 'ترحيب', fa: 'خوش‌آمدید' },
      sectionLabel: { en: 'Section 01', ar: 'القسم ٠١', fa: 'بخش ۰۱' },
      timeEst: { en: '6 min', ar: '٦ دقائق', fa: '۶ دقیقه' },
      headingHtml: {
        en: '<h2>Welcome: a table is not an answer</h2><p class="standfirst">Week 2 ended with correct numbers in a result grid. The stand owner still can\'t see when demand peaks, which flavor is growing, or why sales collapsed in autumn. A chart is how you hand over the answer, not just the data.</p>',
        ar: '<h2>ترحيب: الجدول ليس إجابة</h2><p class="standfirst">انتهى الأسبوع 2 بأرقام صحيحة في شبكة نتائج. لا يزال صاحب الكشك لا يرى متى يبلغ الطلب ذروته، ولا أي نكهة تنمو، ولا لماذا انهارت المبيعات في الخريف. الرسم هو طريقتك لتسليم الإجابة، لا البيانات وحدها.</p>',
        fa: '<h2>خوش‌آمدید: جدول پاسخ نیست</h2><p class="standfirst">هفتهٔ ۲ با اعداد درست در یک شبکهٔ نتایج تمام شد. صاحب غرفه هنوز نمی‌بیند تقاضا کِی به اوج می‌رسد، کدام طعم رشد می‌کند و چرا فروش در پاییز فروریخت. نمودار راهی است که پاسخ را تحویل می‌دهی، نه فقط داده را.</p>',
      },
      blocks: [
        {
          type: 'objectives',
          label: { en: "By the end, you'll be able to", ar: 'بنهاية هذا القسم ستكون قادرًا على', fa: 'در پایان این بخش می‌توانی' },
          items: [
            {
              en: 'Pick a chart type by starting from the question: comparison, trend, share of a whole, relationship, or contribution',
              ar: 'اختيار نوع الرسم بالبدء من السؤال: مقارنة، اتجاه، حصة من كل، علاقة، أو مساهمة',
              fa: 'نوع نمودار را با شروع از سؤال انتخاب کنی: مقایسه، روند، سهم از کل، رابطه یا سهم مشارکت',
            },
            {
              en: 'Build bar, column, line, pie, scatter and waterfall charts in Excel',
              ar: 'بناء رسوم الأعمدة والخطوط والدائرية والانتشار والشلال في Excel',
              fa: 'نمودارهای میله‌ای، ستونی، خطی، دایره‌ای، پراکندگی و آبشاری را در Excel بسازی',
            },
            {
              en: 'Format a chart so it reads at a glance: title, legend, data labels, gridlines, axes, colors',
              ar: 'تنسيق الرسم ليُقرأ بنظرة واحدة: العنوان والمفتاح وتسميات البيانات وخطوط الشبكة والمحاور والألوان',
              fa: 'نمودار را طوری قالب‌بندی کنی که در یک نگاه خوانده شود: عنوان، راهنما، برچسب داده، خطوط شبکه، محورها، رنگ‌ها',
            },
            {
              en: 'Recognize misleading charts (truncated axes, 3-D, dual axes, overloaded pies) and fix them',
              ar: 'ملاحظة الرسوم المضلِّلة (المحاور المقتطعة، ثلاثي الأبعاد، المحاور المزدوجة، الدوائر المزدحمة) وإصلاحها',
              fa: 'نمودارهای گمراه‌کننده (محور بریده، سه‌بعدی، محور دوگانه، دایره‌های شلوغ) را تشخیص بدهی و اصلاح کنی',
            },
            {
              en: 'Recreate the same charts in Python (Google Colab) and in Power BI, and know when to reach for each tool',
              ar: 'إعادة بناء الرسوم نفسها في Python (Google Colab) وفي Power BI، ومعرفة متى تلجأ إلى كل أداة',
              fa: 'همان نمودارها را در Python (Google Colab) و در Power BI دوباره بسازی و بدانی کِی سراغ هر ابزار بروی',
            },
          ],
        },
        {
          type: 'html',
          html: {
            en: '<p>Same jam stand, new question. The owner kept a monthly log for 2024: how many jars of each flavor sold. In Excel it sits in <code>A1:E14</code>: months in column A, the three flavors in <code>B</code> to <code>D</code>, a monthly total in <code>E</code>, and a yearly total in row 14. Every chart this week is built from this one sheet, so read it once now.</p>',
            ar: '<p>نفس كشك المربى، سؤال جديد. احتفظ صاحب الكشك بسجل شهري لعام 2024: كم برطمانًا بيع من كل نكهة. في Excel يقع في <code>A1:E14</code>: الأشهر في العمود A، والنكهات الثلاث في <code>B</code> إلى <code>D</code>، والإجمالي الشهري في <code>E</code>، والإجمالي السنوي في الصف 14. كل رسم هذا الأسبوع يُبنى من هذه الورقة الواحدة.</p>',
            fa: '<p>همان غرفهٔ مربا، سؤالی تازه. صاحب غرفه برای ۲۰۲۴ یک گزارش ماهانه نگه داشته: از هر طعم چند شیشه فروخته شده. در Excel در <code>A1:E14</code> قرار دارد: ماه‌ها در ستون A، سه طعم در <code>B</code> تا <code>D</code>، مجموع ماهانه در <code>E</code> و مجموع سالانه در ردیف ۱۴. هر نمودار این هفته از همین یک صفحه ساخته می‌شود.</p>',
          },
        },
        {
          type: 'table',
          headers: [
            { en: 'Month (A)', ar: 'الشهر (A)', fa: 'ماه (A)' },
            { en: 'Strawberry (B)', ar: 'الفراولة (B)', fa: 'توت‌فرنگی (B)' },
            { en: 'Blueberry (C)', ar: 'التوت الأزرق (C)', fa: 'بلوبری (C)' },
            { en: 'Peach (D)', ar: 'الخوخ (D)', fa: 'هلو (D)' },
            { en: 'Total (E)', ar: 'الإجمالي (E)', fa: 'مجموع (E)' },
          ],
          rows: sales2024Rows,
        },
        {
          type: 'box',
          variant: 'keypoint',
          label: { en: 'Bridge from Week 2', ar: 'جسر من الأسبوع 2', fa: 'پل از هفتهٔ ۲' },
          html: {
            en: '<p>Column <code>E</code> and row 14 are exactly what <code>SUM</code> and <code>GROUP BY</code> gave you: one number per month, one per flavor. Charting is the step after aggregation. Get the numbers right first, then choose how to draw them.</p>',
            ar: '<p>العمود <code>E</code> والصف 14 هما بالضبط ما أعطتك إياه <code>SUM</code> و<code>GROUP BY</code>: رقم لكل شهر ورقم لكل نكهة. الرسم هو الخطوة التي تلي التجميع. اضبط الأرقام أولًا، ثم اختر كيف ترسمها.</p>',
            fa: '<p>ستون <code>E</code> و ردیف ۱۴ دقیقاً همان چیزی هستند که <code>SUM</code> و <code>GROUP BY</code> به تو دادند: یک عدد برای هر ماه، یکی برای هر طعم. رسم نمودار گام پس از تجمیع است. اول اعداد را درست کن، بعد انتخاب کن چگونه کشیده شوند.</p>',
          },
        },
        { type: 'exercise', questionId: 'w03-q001' },
      ],
    },
    {
      id: 'choosing-a-chart',
      navLabel: { en: 'Choosing a chart', ar: 'اختيار الرسم', fa: 'انتخاب نمودار' },
      sectionLabel: { en: 'Section 02', ar: 'القسم ٠٢', fa: 'بخش ۰۲' },
      timeEst: { en: '7 min', ar: '٧ دقائق', fa: '۷ دقیقه' },
      headingHtml: {
        en: '<h2>Choosing a chart: start from the question, not the button</h2><p class="standfirst">Excel offers dozens of chart types, and most of them can draw any table. The skill is not making a chart; it is picking the one whose shape matches the question being asked.</p>',
        ar: '<h2>اختيار الرسم: ابدأ من السؤال لا من الزر</h2><p class="standfirst">يقدّم Excel عشرات أنواع الرسوم، ومعظمها يستطيع رسم أي جدول. المهارة ليست في صنع رسم، بل في اختيار الرسم الذي يطابق شكله السؤال المطروح.</p>',
        fa: '<h2>انتخاب نمودار: از سؤال شروع کن، نه از دکمه</h2><p class="standfirst">Excel ده‌ها نوع نمودار دارد و بیشتر آن‌ها می‌توانند هر جدولی را بکشند. مهارت ساختن نمودار نیست؛ انتخاب نموداری است که شکلش با سؤالِ پرسیده‌شده جور باشد.</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: '<p>Almost every business chart answers one of five questions. Name the question first, and the chart type is usually decided for you.</p>',
            ar: '<p>تقريبًا كل رسم في الأعمال يجيب عن واحد من خمسة أسئلة. سمِّ السؤال أولًا، وغالبًا يتحدد نوع الرسم من تلقاء نفسه.</p>',
            fa: '<p>تقریباً هر نمودار کسب‌وکاری به یکی از پنج سؤال پاسخ می‌دهد. اول سؤال را نام ببر؛ معمولاً نوع نمودار خودش مشخص می‌شود.</p>',
          },
        },
        {
          type: 'table',
          headers: [
            { en: 'The question', ar: 'السؤال', fa: 'سؤال' },
            { en: 'Chart', ar: 'الرسم', fa: 'نمودار' },
            { en: 'Jam-stand example', ar: 'مثال كشك المربى', fa: 'مثال غرفهٔ مربا' },
          ],
          rows: [
            [
              { en: '<strong>Comparison:</strong> which is bigger?', ar: '<strong>مقارنة:</strong> أيهما أكبر؟', fa: '<strong>مقایسه:</strong> کدام بزرگ‌تر است؟' },
              { en: 'Bar or column', ar: 'أعمدة أفقية أو رأسية', fa: 'میله‌ای یا ستونی' },
              { en: 'Total units per flavor in 2024', ar: 'إجمالي الوحدات لكل نكهة في 2024', fa: 'مجموع واحدها برای هر طعم در ۲۰۲۴' },
            ],
            [
              { en: '<strong>Trend:</strong> how does it change over time?', ar: '<strong>اتجاه:</strong> كيف يتغير مع الزمن؟', fa: '<strong>روند:</strong> در طول زمان چگونه تغییر می‌کند؟' },
              { en: 'Line', ar: 'خطي', fa: 'خطی' },
              { en: 'Units per month, one line per flavor', ar: 'الوحدات شهريًا، خط لكل نكهة', fa: 'واحدها در هر ماه، یک خط برای هر طعم' },
            ],
            [
              { en: '<strong>Share:</strong> what part of the whole?', ar: '<strong>حصة:</strong> أي جزء من الكل؟', fa: '<strong>سهم:</strong> چه بخشی از کل؟' },
              { en: 'Pie (few slices) or stacked bar', ar: 'دائري (شرائح قليلة) أو أعمدة مكدّسة', fa: 'دایره‌ای (قطعهٔ کم) یا میلهٔ انباشته' },
              { en: 'Each flavor\'s share of yearly units', ar: 'حصة كل نكهة من وحدات السنة', fa: 'سهم هر طعم از واحدهای سال' },
            ],
            [
              { en: '<strong>Relationship:</strong> do two things move together?', ar: '<strong>علاقة:</strong> هل يتحرك شيئان معًا؟', fa: '<strong>رابطه:</strong> آیا دو چیز با هم حرکت می‌کنند؟' },
              { en: 'Scatter', ar: 'انتشار', fa: 'پراکندگی' },
              { en: 'Strawberry vs. Blueberry units by month', ar: 'وحدات الفراولة مقابل التوت الأزرق شهريًا', fa: 'واحدهای توت‌فرنگی در برابر بلوبری در هر ماه' },
            ],
            [
              { en: '<strong>Contribution:</strong> what pushed the total up or down?', ar: '<strong>مساهمة:</strong> ما الذي رفع الإجمالي أو خفضه؟', fa: '<strong>مشارکت:</strong> چه چیزی مجموع را بالا یا پایین برد؟' },
              { en: 'Waterfall', ar: 'شلال', fa: 'آبشاری' },
              { en: 'Month-over-month change in total units', ar: 'التغيّر الشهري في إجمالي الوحدات', fa: 'تغییر ماه‌به‌ماه مجموع واحدها' },
            ],
          ],
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 1', ar: 'الرسم ١', fa: 'نمودار ۱' },
          title: { en: 'Which chart answers which question', ar: 'أي رسم يجيب عن أي سؤال', fa: 'کدام نمودار به کدام سؤال پاسخ می‌دهد' },
          src: '/figures/week-03/diagram-01.svg',
          alt: 'Five questions (compare, change over time, share of whole, move together, up or down) each pointing at bar/column, line, pie, scatter and waterfall',
          caption: {
            en: 'Read left to right: name the question first, then the chart follows.',
            ar: 'اقرأ من اليسار إلى اليمين: سمِّ السؤال أولًا، ثم يتبعه الرسم.',
            fa: 'از چپ به راست بخوان: اول سؤال را نام ببر، بعد نمودار می‌آید.',
          },
        },
        {
          type: 'box',
          variant: 'analogy',
          label: { en: 'Think of it like tools', ar: 'فكّر فيه كالأدوات', fa: 'مثل ابزارها فکر کن' },
          html: {
            en: '<p>A screwdriver and a hammer can both, technically, drive a nail. But you pick the one built for the job. Chart types are the same: a pie <em>can</em> show twelve months, and it will be hard to read for the same reason a screwdriver is hard to swing.</p>',
            ar: '<p>يستطيع المفك والمطرقة، تقنيًا، دقّ مسمار. لكنك تختار ما صُنع للمهمة. أنواع الرسوم كذلك: الدائري <em>يستطيع</em> عرض اثني عشر شهرًا، وسيكون صعب القراءة لنفس السبب الذي يجعل المفك صعب التأرجح.</p>',
            fa: '<p>پیچ‌گوشتی و چکش هر دو، از نظر فنی، می‌توانند میخ بکوبند. اما همان را برمی‌داری که برای کار ساخته شده. انواع نمودار هم همین‌طورند: دایره‌ای <em>می‌تواند</em> دوازده ماه را نشان بدهد و به همان دلیل که پیچ‌گوشتی برای تاب‌دادن سخت است، خواندنش سخت می‌شود.</p>',
          },
        },
        { type: 'exercise', questionId: 'w03-q002' },
      ],
    },
    {
      id: 'tool-setup',
      navLabel: { en: 'Set up your tools', ar: 'جهّز أدواتك', fa: 'ابزارهایت را آماده کن' },
      sectionLabel: { en: 'Section 03', ar: 'القسم ٠٣', fa: 'بخش ۰۳' },
      timeEst: { en: '10 min', ar: '١٠ دقائق', fa: '۱۰ دقیقه' },
      headingHtml: {
        en: '<h2>Set up your tools: one skill, three ways to draw</h2><p class="standfirst">Week 0 said Python and Power BI arrive from this week. From here on, every chart section has three tabs: Excel, Python (Colab) and Power BI. Set the two new tools up once, here, with the same jam-stand data.</p>',
        ar: '<h2>جهّز أدواتك: مهارة واحدة، ثلاث طرق للرسم</h2><p class="standfirst">قال الأسبوع 0 إن Python وPower BI يبدآن من هذا الأسبوع. من هنا فصاعدًا لكل قسم رسم ثلاثة تبويبات: Excel وPython (Colab) وPower BI. جهّز الأداتين الجديدتين مرة واحدة هنا بنفس بيانات كشك المربى.</p>',
        fa: '<h2>ابزارهایت را آماده کن: یک مهارت، سه راه برای کشیدن</h2><p class="standfirst">هفتهٔ ۰ گفت Python و Power BI از این هفته می‌آیند. از اینجا به بعد هر بخش نمودار سه تب دارد: Excel، Python (Colab) و Power BI. دو ابزار جدید را یک بار، همین‌جا، با همان داده‌های غرفهٔ مربا آماده کن.</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: '<p>You do not need all three to pass. Excel stays the baseline, and as Week 0 said, neither Python nor Power BI is mandatory. But try each at least once: they teach the same skill from different sides, and each shines in a different job.</p>',
            ar: '<p>لست بحاجة إلى الثلاثة جميعًا. يبقى Excel الأساس، وكما قال الأسبوع 0 لا Python ولا Power BI إلزامي. لكن جرّب كلًّا منهما مرة واحدة على الأقل: يعلّمان المهارة نفسها من جهات مختلفة، ويتألق كل منهما في عمل مختلف.</p>',
            fa: '<p>برای قبول شدن به هر سه نیاز نداری. Excel مبنا می‌ماند و همان‌طور که هفتهٔ ۰ گفت، نه Python و نه Power BI اجباری نیست. اما هر کدام را دست‌کم یک بار امتحان کن: مهارت یکسان را از زوایای متفاوت یاد می‌دهند و هر کدام در کاری متفاوت می‌درخشد.</p>',
          },
        },
        {
          type: 'table',
          headers: [
            { en: 'Tool', ar: 'الأداة', fa: 'ابزار' },
            { en: 'Best for', ar: 'الأفضل لـ', fa: 'مناسب برای' },
            { en: 'Where it runs', ar: 'أين تعمل', fa: 'کجا اجرا می‌شود' },
            { en: 'Access', ar: 'الوصول', fa: 'دسترسی' },
          ],
          rows: [
            [
              { en: '<strong>Excel</strong>', ar: '<strong>Excel</strong>', fa: '<strong>Excel</strong>' },
              { en: 'Quick charts inside a spreadsheet you already have', ar: 'رسوم سريعة داخل جدول بيانات لديك أصلًا', fa: 'نمودارهای سریع داخل صفحه‌گسترده‌ای که از قبل داری' },
              { en: 'Desktop app or browser', ar: 'تطبيق سطح المكتب أو المتصفح', fa: 'برنامهٔ دسکتاپ یا مرورگر' },
              { en: 'Microsoft 365, as in earlier weeks', ar: 'Microsoft 365 كما في الأسابيع السابقة', fa: 'Microsoft 365، مثل هفته‌های قبل' },
            ],
            [
              { en: '<strong>Python (Colab)</strong>', ar: '<strong>Python (Colab)</strong>', fa: '<strong>Python (Colab)</strong>' },
              { en: 'Repeatable, scripted charts; large or messy data', ar: 'رسوم مبرمجة قابلة للتكرار؛ بيانات كبيرة أو فوضوية', fa: 'نمودارهای اسکریپتی و تکرارپذیر؛ داده‌های بزرگ یا به‌هم‌ریخته' },
              { en: 'In your browser, nothing to install', ar: 'في متصفحك، دون تثبيت', fa: 'در مرورگرت، بدون نصب' },
              { en: 'Free with a Google account', ar: 'مجاني بحساب Google', fa: 'رایگان با حساب Google' },
            ],
            [
              { en: '<strong>Power BI</strong>', ar: '<strong>Power BI</strong>', fa: '<strong>Power BI</strong>' },
              { en: 'Interactive dashboards other people can click through', ar: 'لوحات بيانات تفاعلية يتصفحها الآخرون', fa: 'داشبوردهای تعاملی که دیگران می‌توانند در آن‌ها بگردند' },
              { en: 'Power BI Desktop (Windows app) or the Power BI service in a browser', ar: 'Power BI Desktop (تطبيق ويندوز) أو خدمة Power BI في المتصفح', fa: 'Power BI Desktop (برنامهٔ ویندوز) یا سرویس Power BI در مرورگر' },
              { en: 'Desktop is a free download; the service needs a work or school account', ar: 'Desktop تنزيل مجاني؛ الخدمة تتطلب حساب عمل أو مدرسة', fa: 'Desktop دانلود رایگان است؛ سرویس به حساب کاری یا مدرسه نیاز دارد' },
            ],
          ],
        },
        {
          type: 'tabs',
          tabs: [
            {
              label: { en: 'Excel', ar: 'Excel', fa: 'Excel' },
              blocks: [
                {
                  type: 'html',
                  html: {
                    en: '<p>Nothing new to set up. Use the sheet from Section 1 (<code>A1:E14</code>).</p>',
                    ar: '<p>لا شيء جديد لتجهيزه. استخدم الورقة من القسم 1 (<code>A1:E14</code>).</p>',
                    fa: '<p>چیز تازه‌ای برای آماده‌سازی نیست. از صفحهٔ بخش ۱ (<code>A1:E14</code>) استفاده کن.</p>',
                  },
                },
              ],
            },
            {
              label: { en: 'Python (Colab)', ar: 'Python (Colab)', fa: 'Python (Colab)' },
              blocks: [
                {
                  type: 'html',
                  html: {
                    en: '<ol><li>Open <a href="https://colab.new" target="_blank" rel="noopener">colab.new</a> and sign in with a Google account. It creates a blank notebook.</li><li>Paste the setup code below into the first cell and run it with <kbd>Shift</kbd>+<kbd>Enter</kbd>. A table of the 12 months appears.</li><li>Every Python snippet in the next sections goes into its own new cell. They all reuse <code>df</code>, <code>flavors</code> and <code>colors</code>, so run this setup cell first (and again if you restart the notebook).</li></ol><p>Colab already includes <code>pandas</code> and <code>matplotlib</code>, so there is nothing to install.</p>',
                    ar: '<ol><li>افتح <a href="https://colab.new" target="_blank" rel="noopener">colab.new</a> وسجّل الدخول بحساب Google. سيُنشئ دفترًا فارغًا.</li><li>الصق كود التجهيز أدناه في الخلية الأولى وشغّله بـ <kbd>Shift</kbd>+<kbd>Enter</kbd>. يظهر جدول الأشهر الـ12.</li><li>كل مقطع Python في الأقسام التالية يوضع في خلية جديدة خاصة به. جميعها تعيد استخدام <code>df</code> و<code>flavors</code> و<code>colors</code>، فشغّل خلية التجهيز هذه أولًا (ومجددًا إن أعدت تشغيل الدفتر).</li></ol><p>يتضمن Colab بالفعل <code>pandas</code> و<code>matplotlib</code>، فلا شيء لتثبيته.</p>',
                    fa: '<ol><li><a href="https://colab.new" target="_blank" rel="noopener">colab.new</a> را باز کن و با حساب Google وارد شو. یک دفترچهٔ خالی می‌سازد.</li><li>کد آماده‌سازی زیر را در سلول اول بچسبان و با <kbd>Shift</kbd>+<kbd>Enter</kbd> اجرا کن. جدول ۱۲ ماه ظاهر می‌شود.</li><li>هر قطعه کد Python در بخش‌های بعد در یک سلول جدید جدا قرار می‌گیرد. همه از <code>df</code>، <code>flavors</code> و <code>colors</code> دوباره استفاده می‌کنند، پس اول این سلول آماده‌سازی را اجرا کن (و اگر دفترچه را ری‌استارت کردی دوباره).</li></ol><p>Colab از قبل <code>pandas</code> و <code>matplotlib</code> را دارد، پس چیزی برای نصب نیست.</p>',
                  },
                },
                { type: 'code', code: py.setup },
              ],
            },
            {
              label: { en: 'Power BI', ar: 'Power BI', fa: 'Power BI' },
              blocks: [
                {
                  type: 'html',
                  html: {
                    en: '<p>Open <strong>Power BI Desktop</strong> (a Windows app) and start a blank report. On a Mac, use the Power BI service in a browser instead, which needs a work or school account (a personal Gmail or Outlook address will not work).</p><p><strong>1. Create the data table.</strong> Go to <strong>Modeling › New table</strong>, paste the expression, and press <kbd>Enter</kbd>. It is self-contained, so there is no file to import.</p>',
                    ar: '<p>افتح <strong>Power BI Desktop</strong> (تطبيق ويندوز) وابدأ تقريرًا فارغًا. على ماك استخدم خدمة Power BI في المتصفح بدلًا من ذلك، وهي تتطلب حساب عمل أو مدرسة (عنوان Gmail أو Outlook الشخصي لن يعمل).</p><p><strong>1. أنشئ جدول البيانات.</strong> اذهب إلى <strong>Modeling › New table</strong> والصق التعبير واضغط <kbd>Enter</kbd>. إنه مكتفٍ بذاته، فلا ملف لاستيراده.</p>',
                    fa: '<p><strong>Power BI Desktop</strong> (برنامهٔ ویندوز) را باز کن و یک گزارش خالی شروع کن. روی مک به‌جای آن از سرویس Power BI در مرورگر استفاده کن که به حساب کاری یا مدرسه نیاز دارد (آدرس شخصی Gmail یا Outlook کار نمی‌کند).</p><p><strong>۱. جدول داده را بساز.</strong> به <strong>Modeling › New table</strong> برو، عبارت را بچسبان و <kbd>Enter</kbd> بزن. مستقل است، پس فایلی برای وارد کردن نیست.</p>',
                  },
                },
                { type: 'code', code: dax.table },
                {
                  type: 'html',
                  html: {
                    en: '<p><strong>2. Add two calculated columns.</strong> With the <code>Jam Sales</code> table selected, use <strong>Modeling › New column</strong> for each. <code>Change</code> is this month\'s total minus last month\'s; January has no previous month, so it simply stays at its own total, the starting level.</p>',
                    ar: '<p><strong>2. أضف عمودين محسوبين.</strong> مع تحديد جدول <code>Jam Sales</code> استخدم <strong>Modeling › New column</strong> لكل منهما. <code>Change</code> هو إجمالي هذا الشهر ناقص الشهر السابق؛ ولأن يناير بلا شهر سابق يبقى عند إجماليه، أي مستوى البداية.</p>',
                    fa: '<p><strong>۲. دو ستون محاسبه‌ای اضافه کن.</strong> با انتخاب جدول <code>Jam Sales</code> برای هر کدام از <strong>Modeling › New column</strong> استفاده کن. <code>Change</code> مجموع این ماه منهای ماه قبل است؛ چون ژانویه ماه قبلی ندارد، روی مجموع خودش می‌ماند، یعنی سطح شروع.</p>',
                  },
                },
                { type: 'code', code: dax.total },
                { type: 'code', code: dax.change },
                {
                  type: 'html',
                  html: {
                    en: '<p><strong>3. Fix the month order.</strong> In the <strong>Data</strong> pane select the <code>Month</code> column, open <strong>Column tools › Sort by column</strong> and choose <code>MonthNo</code>. Without this, Power BI sorts the month names alphabetically.</p><p><strong>4. Create the pie-chart table.</strong> A pie needs one row per flavor, so add one more table with <strong>Modeling › New table</strong>:</p>',
                    ar: '<p><strong>3. أصلح ترتيب الأشهر.</strong> في جزء <strong>Data</strong> حدّد العمود <code>Month</code> وافتح <strong>Column tools › Sort by column</strong> واختر <code>MonthNo</code>. من دون ذلك يرتّب Power BI أسماء الأشهر أبجديًا.</p><p><strong>4. أنشئ جدول الرسم الدائري.</strong> يحتاج الدائري إلى صف لكل نكهة، فأضف جدولًا آخر بـ <strong>Modeling › New table</strong>:</p>',
                    fa: '<p><strong>۳. ترتیب ماه‌ها را درست کن.</strong> در پنل <strong>Data</strong> ستون <code>Month</code> را انتخاب کن، <strong>Column tools › Sort by column</strong> را باز کن و <code>MonthNo</code> را انتخاب کن. بدون این کار Power BI نام ماه‌ها را به ترتیب الفبا مرتب می‌کند.</p><p><strong>۴. جدول نمودار دایره‌ای را بساز.</strong> نمودار دایره‌ای یک ردیف برای هر طعم می‌خواهد، پس با <strong>Modeling › New table</strong> یک جدول دیگر اضافه کن:</p>',
                  },
                },
                { type: 'code', code: dax.flavorTotals },
              ],
            },
          ],
        },
        {
          type: 'html',
          html: {
            en: '<p><strong>Prefer a ready-made file?</strong> The whole Python path is also a notebook: <a href="https://colab.research.google.com/github/PA-WiT/BA2/blob/main/public/notebooks/week-03-visualizing-data.ipynb" target="_blank" rel="noopener">open it in Colab</a>, or <a href="/notebooks/week-03-visualizing-data.ipynb" download>download the .ipynb</a> and load it with <strong>File › Upload notebook</strong> in Colab.</p>',
            ar: '<p><strong>تفضّل ملفًا جاهزًا؟</strong> مسار Python كله متاح أيضًا كدفتر: <a href="https://colab.research.google.com/github/PA-WiT/BA2/blob/main/public/notebooks/week-03-visualizing-data.ipynb" target="_blank" rel="noopener">افتحه في Colab</a>، أو <a href="/notebooks/week-03-visualizing-data.ipynb" download>نزّل ملف .ipynb</a> وحمّله بـ <strong>File › Upload notebook</strong> في Colab.</p>',
            fa: '<p><strong>فایل آماده می‌خواهی؟</strong> کل مسیر Python به‌صورت یک دفترچه هم هست: <a href="https://colab.research.google.com/github/PA-WiT/BA2/blob/main/public/notebooks/week-03-visualizing-data.ipynb" target="_blank" rel="noopener">آن را در Colab باز کن</a>، یا <a href="/notebooks/week-03-visualizing-data.ipynb" download>فایل .ipynb را دانلود کن</a> و در Colab با <strong>File › Upload notebook</strong> بارگذاری کن.</p>',
          },
        },
      ],
    },
    {
      id: 'bar-and-column',
      navLabel: { en: 'Bar and column charts', ar: 'الأعمدة الأفقية والرأسية', fa: 'نمودار میله‌ای و ستونی' },
      sectionLabel: { en: 'Section 04', ar: 'القسم ٠٤', fa: 'بخش ۰۴' },
      timeEst: { en: '6 min', ar: '٦ دقائق', fa: '۶ دقیقه' },
      headingHtml: {
        en: '<h2>Bar and column charts: the workhorse</h2><p class="standfirst">Bar charts are among the easiest charts to read. Put a category on one axis and a value on the other, and the eye compares lengths instantly.</p>',
        ar: '<h2>الأعمدة الأفقية والرأسية: حصان العمل</h2><p class="standfirst">من أسهل الرسوم قراءة. ضع فئة على محور وقيمة على الآخر، فتقارن العين الأطوال فورًا.</p>',
        fa: '<h2>نمودار میله‌ای و ستونی: اسب کار</h2><p class="standfirst">نمودار میله‌ای از ساده‌ترین نمودارها برای خواندن است. یک دسته را روی یک محور و یک مقدار را روی محور دیگر بگذار؛ چشم فوراً طول‌ها را مقایسه می‌کند.</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: '<p>A <strong>bar chart</strong> puts the categories on the vertical (y) axis and the values on the horizontal (x) axis. A <strong>column chart</strong> is the same idea turned upright: categories on x, values on y. Use bars when category names are long; use columns when the categories have a natural left-to-right order like months.</p>',
            ar: '<p><strong>الرسم بالأعمدة الأفقية</strong> يضع الفئات على المحور الرأسي (y) والقيم على المحور الأفقي (x). أما <strong>الرسم بالأعمدة الرأسية</strong> فهو الفكرة نفسها منتصبة: الفئات على x والقيم على y. استخدم الأفقية حين تكون أسماء الفئات طويلة، والرأسية حين يكون للفئات ترتيب طبيعي من اليسار إلى اليمين كالأشهر.</p>',
            fa: '<p><strong>نمودار میله‌ای</strong> دسته‌ها را روی محور عمودی (y) و مقادیر را روی محور افقی (x) می‌گذارد. <strong>نمودار ستونی</strong> همان ایده به‌صورت ایستاده است: دسته‌ها روی x و مقادیر روی y. وقتی نام دسته‌ها بلند است از میله‌ای و وقتی دسته‌ها ترتیب طبیعی چپ‌به‌راست دارند، مثل ماه‌ها، از ستونی استفاده کن.</p>',
          },
        },
        {
          type: 'tabs',
          tabs: [
            {
              label: { en: 'Excel', ar: 'Excel', fa: 'Excel' },
              blocks: [
                {
                  type: 'html',
                  html: {
                    en: '<p><strong>To build a clustered bar chart:</strong></p><ol><li>Select the range <code>A1:D13</code> (months and the three flavors, without the total column).</li><li>Open the <strong>Insert</strong> tab.</li><li>Click the column/bar dropdown and, under <strong>2-D Bar</strong>, choose <strong>Clustered Bar</strong>.</li></ol><p><strong>For a column chart</strong>, do the same but choose <strong>Clustered Column</strong> under <strong>2-D Column</strong>. You now see units sold per flavor for every month.</p>',
                    ar: '<p><strong>لبناء رسم أعمدة أفقية عنقودي:</strong></p><ol><li>حدّد النطاق <code>A1:D13</code> (الأشهر والنكهات الثلاث دون عمود الإجمالي).</li><li>افتح تبويب <strong>Insert</strong>.</li><li>انقر القائمة المنسدلة للأعمدة، واختر تحت <strong>2-D Bar</strong> الخيار <strong>Clustered Bar</strong>.</li></ol><p><strong>للأعمدة الرأسية</strong> افعل الشيء نفسه لكن اختر <strong>Clustered Column</strong> تحت <strong>2-D Column</strong>.</p>',
                    fa: '<p><strong>برای ساخت نمودار میله‌ای خوشه‌ای:</strong></p><ol><li>محدودهٔ <code>A1:D13</code> را انتخاب کن (ماه‌ها و سه طعم، بدون ستون مجموع).</li><li>تب <strong>Insert</strong> را باز کن.</li><li>روی فهرست کشویی ستون/میله کلیک کن و زیر <strong>2-D Bar</strong> گزینهٔ <strong>Clustered Bar</strong> را انتخاب کن.</li></ol><p><strong>برای نمودار ستونی</strong> همین کار را بکن اما زیر <strong>2-D Column</strong> گزینهٔ <strong>Clustered Column</strong> را انتخاب کن.</p>',
                  },
                },
              ],
            },
            {
              label: { en: 'Python (Colab)', ar: 'Python (Colab)', fa: 'Python (Colab)' },
              blocks: [
                {
                  type: 'html',
                  html: {
                    en: 'In a Colab cell (after the setup from Section 3), <code>df.plot.bar</code> draws clustered columns: <code>x</code> is the category axis and <code>y</code> is the list of value columns. Add <code>stacked=True</code> for stacked columns, or use <code>df.plot.barh</code> for horizontal bars.',
                    ar: 'في خلية Colab (بعد التجهيز من القسم 3) يرسم <code>df.plot.bar</code> أعمدة عنقودية: <code>x</code> محور الفئات و<code>y</code> قائمة أعمدة القيم. أضف <code>stacked=True</code> للأعمدة المكدّسة، أو استخدم <code>df.plot.barh</code> للأعمدة الأفقية.',
                    fa: 'در یک سلول Colab (پس از آماده‌سازی بخش ۳)، <code>df.plot.bar</code> ستون‌های خوشه‌ای می‌کشد: <code>x</code> محور دسته‌ها و <code>y</code> فهرست ستون‌های مقدار است. برای ستون‌های انباشته <code>stacked=True</code> اضافه کن، یا برای میله‌های افقی از <code>df.plot.barh</code> استفاده کن.',
                  },
                },
                { type: 'code', code: py.bar },
                { type: 'code', code: py.barVariants },
              ],
            },
            {
              label: { en: 'Power BI', ar: 'Power BI', fa: 'Power BI' },
              blocks: [
                {
                  type: 'html',
                  html: {
                    en: '<ol><li>On the report canvas, click the <strong>Clustered column chart</strong> icon in the <strong>Visualizations</strong> pane (or <strong>Clustered bar chart</strong> for horizontal bars).</li><li>From the <strong>Data</strong> pane, drag <code>Month</code> to <strong>X-axis</strong> and <code>Strawberry</code>, <code>Blueberry</code> and <code>Peach</code> to <strong>Y-axis</strong>. Power BI sums each column for you.</li><li>To change the layout, switch the same visual to <strong>Stacked column chart</strong> or <strong>100% stacked column chart</strong>.</li></ol>',
                    ar: '<ol><li>على لوحة التقرير انقر أيقونة <strong>Clustered column chart</strong> في جزء <strong>Visualizations</strong> (أو <strong>Clustered bar chart</strong> للأعمدة الأفقية).</li><li>من جزء <strong>Data</strong> اسحب <code>Month</code> إلى <strong>X-axis</strong> و<code>Strawberry</code> و<code>Blueberry</code> و<code>Peach</code> إلى <strong>Y-axis</strong>. يجمع Power BI كل عمود لك.</li><li>لتغيير التخطيط بدّل الرسم نفسه إلى <strong>Stacked column chart</strong> أو <strong>100% stacked column chart</strong>.</li></ol>',
                    fa: '<ol><li>روی بوم گزارش روی آیکن <strong>Clustered column chart</strong> در پنل <strong>Visualizations</strong> کلیک کن (یا <strong>Clustered bar chart</strong> برای میله‌های افقی).</li><li>از پنل <strong>Data</strong>، <code>Month</code> را به <strong>X-axis</strong> و <code>Strawberry</code>، <code>Blueberry</code> و <code>Peach</code> را به <strong>Y-axis</strong> بکش. Power BI هر ستون را برایت جمع می‌زند.</li><li>برای تغییر چیدمان، همان نمودار را به <strong>Stacked column chart</strong> یا <strong>100% stacked column chart</strong> تغییر بده.</li></ol>',
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'html',
          html: {
            en: '<p>Excel also offers <strong>2-D vs. 3-D</strong> versions and three layouts of the same data. The layout changes which comparison is easy:</p>',
            ar: '<p>يقدّم Excel أيضًا نسخًا <strong>ثنائية وثلاثية الأبعاد</strong> وثلاثة تخطيطات للبيانات نفسها. التخطيط يغيّر أي مقارنة تكون سهلة:</p>',
            fa: '<p>Excel نسخه‌های <strong>دوبعدی و سه‌بعدی</strong> و سه چیدمان برای همان داده هم دارد. چیدمان تعیین می‌کند کدام مقایسه آسان باشد:</p>',
          },
        },
        {
          type: 'table',
          headers: [
            { en: 'Layout', ar: 'التخطيط', fa: 'چیدمان' },
            { en: 'Best for', ar: 'الأفضل لـ', fa: 'مناسب برای' },
            { en: 'Watch out', ar: 'انتبه', fa: 'مراقب باش' },
          ],
          rows: [
            [
              { en: '<strong>Clustered</strong>', ar: '<strong>عنقودي</strong>', fa: '<strong>خوشه‌ای</strong>' },
              { en: 'Comparing flavors side by side within each month', ar: 'مقارنة النكهات جنبًا إلى جنب داخل كل شهر', fa: 'مقایسهٔ طعم‌ها کنار هم در هر ماه' },
              { en: 'Gets crowded with many categories', ar: 'يزدحم مع فئات كثيرة', fa: 'با دسته‌های زیاد شلوغ می‌شود' },
            ],
            [
              { en: '<strong>Stacked</strong>', ar: '<strong>مكدّس</strong>', fa: '<strong>انباشته</strong>' },
              { en: 'A month\'s total and how it splits', ar: 'إجمالي الشهر وكيف ينقسم', fa: 'مجموع ماه و چگونگی تقسیم آن' },
              { en: 'Only the bottom segment is easy to compare across months', ar: 'الجزء السفلي فقط يسهل مقارنته عبر الأشهر', fa: 'فقط بخش پایینی در طول ماه‌ها به‌آسانی قابل مقایسه است' },
            ],
            [
              { en: '<strong>100% stacked</strong>', ar: '<strong>مكدّس 100%</strong>', fa: '<strong>انباشتهٔ ۱۰۰٪</strong>' },
              { en: 'How each flavor\'s share changes month to month', ar: 'كيف تتغير حصة كل نكهة من شهر لآخر', fa: 'تغییر سهم هر طعم از ماهی به ماه دیگر' },
              { en: 'Hides the totals: every column is the same height', ar: 'يخفي الإجماليات: كل الأعمدة بنفس الارتفاع', fa: 'مجموع‌ها را پنهان می‌کند: همهٔ ستون‌ها هم‌قد هستند' },
            ],
          ],
        },
        {
          type: 'box',
          variant: 'mistake',
          label: { en: 'Common mistake', ar: 'خطأ شائع', fa: 'اشتباه رایج' },
          html: {
            en: '<p>Choosing a <strong>3-D</strong> column chart because it looks impressive. The depth makes the front and back bars impossible to compare fairly. Stay with 2-D. Also, for a plain comparison of categories, <strong>sort the bars</strong> from longest to shortest; months are the exception, keep them in calendar order.</p>',
            ar: '<p>اختيار رسم أعمدة <strong>ثلاثي الأبعاد</strong> لأنه يبدو مبهرًا. العمق يجعل مقارنة الأعمدة الأمامية والخلفية بإنصاف مستحيلة. التزم بالثنائي الأبعاد. وللمقارنة البسيطة بين الفئات، <strong>رتّب الأعمدة</strong> من الأطول إلى الأقصر؛ والأشهر استثناء، أبقها بترتيب التقويم.</p>',
            fa: '<p>انتخاب نمودار ستونی <strong>سه‌بعدی</strong> چون چشمگیر به‌نظر می‌رسد. عمق باعث می‌شود مقایسهٔ منصفانهٔ ستون‌های جلو و عقب ناممکن شود. به دوبعدی وفادار بمان. همچنین برای مقایسهٔ ساده بین دسته‌ها، <strong>میله‌ها را مرتب کن</strong> از بلندترین به کوتاه‌ترین؛ ماه‌ها استثنا هستند، آن‌ها را به ترتیب تقویم نگه دار.</p>',
          },
        },
        { type: 'exercise', questionId: 'w03-q003' },
      ],
    },
    {
      id: 'line-charts',
      navLabel: { en: 'Line charts', ar: 'الرسوم الخطية', fa: 'نمودار خطی' },
      sectionLabel: { en: 'Section 05', ar: 'القسم ٠٥', fa: 'بخش ۰۵' },
      timeEst: { en: '5 min', ar: '٥ دقائق', fa: '۵ دقیقه' },
      headingHtml: {
        en: '<h2>Line charts: how things change over time</h2><p class="standfirst">A line chart is the most natural way to show a number moving through time. The line itself says "these points are connected, in order."</p>',
        ar: '<h2>الرسوم الخطية: كيف تتغير الأشياء مع الزمن</h2><p class="standfirst">الرسم الخطي هو أطبع طريقة لعرض رقم يتحرك عبر الزمن. الخط نفسه يقول: "هذه النقاط متصلة، بالترتيب."</p>',
        fa: '<h2>نمودار خطی: تغییر چیزها در طول زمان</h2><p class="standfirst">نمودار خطی طبیعی‌ترین راه برای نشان دادن حرکت یک عدد در زمان است. خودِ خط می‌گوید: «این نقطه‌ها به ترتیب به هم وصل‌اند.»</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: '<p>Line charts are the best way to capture how a numeric variable changes over time, which makes trends easy to spot.</p>',
            ar: '<p>الرسوم الخطية هي أفضل طريقة لالتقاط كيف يتغير متغير رقمي مع الزمن، ما يجعل الاتجاهات سهلة الاكتشاف.</p>',
            fa: '<p>نمودار خطی بهترین راه برای نشان دادن تغییر یک متغیر عددی در طول زمان است و تشخیص روندها را آسان می‌کند.</p>',
          },
        },
        {
          type: 'tabs',
          tabs: [
            {
              label: { en: 'Excel', ar: 'Excel', fa: 'Excel' },
              blocks: [
                {
                  type: 'html',
                  html: {
                    en: '<p><strong>To build a line chart:</strong></p><ol><li>Select <code>A1:D13</code>.</li><li>Open the <strong>Insert</strong> tab.</li><li>Click the line-chart dropdown and, under <strong>2-D Line</strong>, choose <strong>Line with Markers</strong>.</li></ol>',
                    ar: '<p><strong>لبناء رسم خطي:</strong></p><ol><li>حدّد <code>A1:D13</code>.</li><li>افتح تبويب <strong>Insert</strong>.</li><li>انقر القائمة المنسدلة للرسم الخطي واختر تحت <strong>2-D Line</strong> الخيار <strong>Line with Markers</strong>.</li></ol>',
                    fa: '<p><strong>برای ساخت نمودار خطی:</strong></p><ol><li><code>A1:D13</code> را انتخاب کن.</li><li>تب <strong>Insert</strong> را باز کن.</li><li>روی فهرست کشویی نمودار خطی کلیک کن و زیر <strong>2-D Line</strong> گزینهٔ <strong>Line with Markers</strong> را انتخاب کن.</li></ol>',
                  },
                },
              ],
            },
            {
              label: { en: 'Python (Colab)', ar: 'Python (Colab)', fa: 'Python (Colab)' },
              blocks: [
                {
                  type: 'html',
                  html: {
                    en: '<code>df.plot.line</code> takes the same <code>x</code> and <code>y</code>. <code>marker="o"</code> adds the dots, like Excel\'s "Line with Markers".',
                    ar: 'يأخذ <code>df.plot.line</code> نفس <code>x</code> و<code>y</code>. يضيف <code>marker="o"</code> النقاط، مثل "Line with Markers" في Excel.',
                    fa: '<code>df.plot.line</code> همان <code>x</code> و <code>y</code> را می‌گیرد. <code>marker="o"</code> نقطه‌ها را اضافه می‌کند، مثل «Line with Markers» در Excel.',
                  },
                },
                { type: 'code', code: py.line },
              ],
            },
            {
              label: { en: 'Power BI', ar: 'Power BI', fa: 'Power BI' },
              blocks: [
                {
                  type: 'html',
                  html: {
                    en: '<ol><li>Click the <strong>Line chart</strong> icon in the <strong>Visualizations</strong> pane.</li><li>Drag <code>Month</code> to <strong>X-axis</strong> and the three flavors to <strong>Y-axis</strong>.</li></ol><p><strong>Watch the month order.</strong> If the months read Apr, Aug, Dec, Feb…, the <strong>Sort by column</strong> step from Section 3 was skipped: text sorts alphabetically.</p>',
                    ar: '<ol><li>انقر أيقونة <strong>Line chart</strong> في جزء <strong>Visualizations</strong>.</li><li>اسحب <code>Month</code> إلى <strong>X-axis</strong> والنكهات الثلاث إلى <strong>Y-axis</strong>.</li></ol><p><strong>انتبه لترتيب الأشهر.</strong> إن ظهرت الأشهر هكذا Apr وAug وDec وFeb… فقد فاتتك خطوة <strong>Sort by column</strong> من القسم 3: النص يُرتَّب أبجديًا.</p>',
                    fa: '<ol><li>روی آیکن <strong>Line chart</strong> در پنل <strong>Visualizations</strong> کلیک کن.</li><li><code>Month</code> را به <strong>X-axis</strong> و سه طعم را به <strong>Y-axis</strong> بکش.</li></ol><p><strong>مراقب ترتیب ماه‌ها باش.</strong> اگر ماه‌ها Apr، Aug، Dec، Feb… خوانده می‌شوند، مرحلهٔ <strong>Sort by column</strong> بخش ۳ جا افتاده: متن به ترتیب الفبا مرتب می‌شود.</p>',
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'html',
          html: {
            en: '<p>You now see units sold per month, one line per flavor, so each flavor\'s performance over time is easy to compare. Read it: Strawberry peaks in June, Blueberry in July, and Peach not until August. That staggered pattern is invisible in the table and obvious in the chart.</p>',
            ar: '<p>ترى الآن الوحدات المباعة شهريًا، بخط لكل نكهة. اقرأه: تبلغ الفراولة ذروتها في يونيو، والتوت الأزرق في يوليو، والخوخ في أغسطس. هذا النمط المتدرّج غير مرئي في الجدول وواضح في الرسم.</p>',
            fa: '<p>حالا واحدهای فروخته‌شده در هر ماه را می‌بینی، با یک خط برای هر طعم. بخوانش: توت‌فرنگی در ژوئن، بلوبری در ژوئیه و هلو تا اوت به اوج نمی‌رسد. این الگوی پلکانی در جدول نامرئی است و در نمودار آشکار.</p>',
          },
        },
        {
          type: 'box',
          variant: 'mistake',
          label: { en: 'Common mistake', ar: 'خطأ شائع', fa: 'اشتباه رایج' },
          html: {
            en: '<p>Joining points that have no order. A line between Strawberry, Blueberry and Peach suggests they sit on a scale and that "between Blueberry and Peach" means something. It doesn\'t; use bars for categories. And keep it to about four lines: past that, the chart turns into spaghetti.</p>',
            ar: '<p>وصل نقاط لا ترتيب لها. خط بين الفراولة والتوت الأزرق والخوخ يوحي بأنها على مقياس وبأن "بين التوت الأزرق والخوخ" له معنى. ليس كذلك؛ استخدم الأعمدة للفئات. وأبقِه في حدود أربعة خطوط: بعدها يتحول الرسم إلى معكرونة متشابكة.</p>',
            fa: '<p>وصل کردن نقطه‌هایی که ترتیب ندارند. خطی بین توت‌فرنگی، بلوبری و هلو وانمود می‌کند که روی یک مقیاس قرار دارند و «بین بلوبری و هلو» معنایی دارد. ندارد؛ برای دسته‌ها از میله استفاده کن. و تعداد خط‌ها را حدود چهار نگه دار: بیشتر از آن نمودار به کلاف سردرگم تبدیل می‌شود.</p>',
          },
        },
        { type: 'exercise', questionId: 'w03-q004' },
        { type: 'exercise', questionId: 'w03-q012' },
      ],
    },
    {
      id: 'pie-charts',
      navLabel: { en: 'Pie charts', ar: 'الرسوم الدائرية', fa: 'نمودار دایره‌ای' },
      sectionLabel: { en: 'Section 06', ar: 'القسم ٠٦', fa: 'بخش ۰۶' },
      timeEst: { en: '5 min', ar: '٥ دقائق', fa: '۵ دقیقه' },
      headingHtml: {
        en: '<h2>Pie charts: parts of a whole, used sparingly</h2><p class="standfirst">A pie is the picture of a fraction. It works when there are few parts and the parts really do add up to one whole.</p>',
        ar: '<h2>الرسوم الدائرية: أجزاء من كل، باعتدال</h2><p class="standfirst">الدائري صورة الكسر. يصلح حين تكون الأجزاء قليلة وتجمع فعلًا كلًّا واحدًا.</p>',
        fa: '<h2>نمودار دایره‌ای: اجزای یک کل، با احتیاط</h2><p class="standfirst">دایره‌ای تصویر یک کسر است. وقتی کار می‌کند که اجزا کم باشند و واقعاً یک کل را بسازند.</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: '<p>Here we compare each flavor\'s total sales for the year: 253 Strawberry, 216 Blueberry, 180 Peach, 649 in all.</p>',
            ar: '<p>هنا نقارن إجمالي مبيعات كل نكهة للسنة: 253 فراولة و216 توت أزرق و180 خوخ، 649 إجمالًا.</p>',
            fa: '<p>اینجا مجموع فروش سالانهٔ هر طعم را مقایسه می‌کنیم: ۲۵۳ توت‌فرنگی، ۲۱۶ بلوبری، ۱۸۰ هلو، در مجموع ۶۴۹.</p>',
          },
        },
        {
          type: 'tabs',
          tabs: [
            {
              label: { en: 'Excel', ar: 'Excel', fa: 'Excel' },
              blocks: [
                {
                  type: 'html',
                  html: {
                    en: '<p><strong>To build a pie chart:</strong></p><ol><li>Select the flavor names <code>B1:D1</code>.</li><li>Hold <kbd>Ctrl</kbd> (Windows) or <kbd>Command</kbd> (Mac) and also select the yearly totals <code>B14:D14</code>.</li><li>Open the <strong>Insert</strong> tab, click the pie dropdown and, under <strong>2-D Pie</strong>, choose <strong>Pie</strong>.</li></ol>',
                    ar: '<p><strong>لبناء رسم دائري:</strong></p><ol><li>حدّد أسماء النكهات <code>B1:D1</code>.</li><li>اضغط <kbd>Ctrl</kbd> (ويندوز) أو <kbd>Command</kbd> (ماك) وحدّد أيضًا الإجماليات السنوية <code>B14:D14</code>.</li><li>افتح تبويب <strong>Insert</strong> وانقر القائمة المنسدلة للدائري واختر تحت <strong>2-D Pie</strong> الخيار <strong>Pie</strong>.</li></ol>',
                    fa: '<p><strong>برای ساخت نمودار دایره‌ای:</strong></p><ol><li>نام طعم‌ها <code>B1:D1</code> را انتخاب کن.</li><li><kbd>Ctrl</kbd> (ویندوز) یا <kbd>Command</kbd> (مک) را نگه دار و مجموع‌های سالانه <code>B14:D14</code> را هم انتخاب کن.</li><li>تب <strong>Insert</strong> را باز کن، روی فهرست کشویی دایره‌ای کلیک کن و زیر <strong>2-D Pie</strong> گزینهٔ <strong>Pie</strong> را انتخاب کن.</li></ol>',
                  },
                },
              ],
            },
            {
              label: { en: 'Python (Colab)', ar: 'Python (Colab)', fa: 'Python (Colab)' },
              blocks: [
                {
                  type: 'html',
                  html: {
                    en: 'A pie needs one number per slice, so first add up each flavor with <code>df[flavors].sum()</code>. <code>autopct</code> prints each slice as a percentage.',
                    ar: 'يحتاج الدائري إلى رقم لكل شريحة، فاجمع أولًا كل نكهة بـ <code>df[flavors].sum()</code>. يطبع <code>autopct</code> كل شريحة كنسبة مئوية.',
                    fa: 'نمودار دایره‌ای برای هر قطعه یک عدد می‌خواهد، پس اول هر طعم را با <code>df[flavors].sum()</code> جمع بزن. <code>autopct</code> هر قطعه را به‌صورت درصد چاپ می‌کند.',
                  },
                },
                { type: 'code', code: py.pie },
              ],
            },
            {
              label: { en: 'Power BI', ar: 'Power BI', fa: 'Power BI' },
              blocks: [
                {
                  type: 'html',
                  html: {
                    en: '<ol><li>Click the <strong>Pie chart</strong> icon in the <strong>Visualizations</strong> pane.</li><li>Use the <code>Flavor Totals</code> table from Section 3: drag <code>Flavor</code> to <strong>Legend</strong> and <code>Units</code> to <strong>Values</strong>.</li><li>In <strong>Format your visual</strong>, turn on <strong>Detail labels</strong> and show the percentage of the total.</li></ol><p>A pie takes one category field and one value field. That is why the three flavor columns were reshaped into one row per flavor.</p>',
                    ar: '<ol><li>انقر أيقونة <strong>Pie chart</strong> في جزء <strong>Visualizations</strong>.</li><li>استخدم جدول <code>Flavor Totals</code> من القسم 3: اسحب <code>Flavor</code> إلى <strong>Legend</strong> و<code>Units</code> إلى <strong>Values</strong>.</li><li>في <strong>Format your visual</strong> فعّل <strong>Detail labels</strong> واعرض النسبة من الإجمالي.</li></ol><p>يأخذ الدائري حقل فئة واحدًا وحقل قيمة واحدًا. لذلك أُعيد تشكيل أعمدة النكهات الثلاثة في صف لكل نكهة.</p>',
                    fa: '<ol><li>روی آیکن <strong>Pie chart</strong> در پنل <strong>Visualizations</strong> کلیک کن.</li><li>از جدول <code>Flavor Totals</code> بخش ۳ استفاده کن: <code>Flavor</code> را به <strong>Legend</strong> و <code>Units</code> را به <strong>Values</strong> بکش.</li><li>در <strong>Format your visual</strong>، <strong>Detail labels</strong> را روشن کن و درصد از کل را نشان بده.</li></ol><p>نمودار دایره‌ای یک فیلد دسته و یک فیلد مقدار می‌گیرد. برای همین سه ستون طعم به یک ردیف برای هر طعم تغییر شکل یافتند.</p>',
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'html',
          html: {
            en: '<p>The slices come out at roughly <strong>39%</strong>, <strong>33%</strong> and <strong>28%</strong>.</p>',
            ar: '<p>تخرج الشرائح بنحو <strong>39%</strong> و<strong>33%</strong> و<strong>28%</strong>.</p>',
            fa: '<p>قطعه‌ها تقریباً <strong>۳۹٪</strong>، <strong>۳۳٪</strong> و <strong>۲۸٪</strong> درمی‌آیند.</p>',
          },
        },
        {
          type: 'box',
          variant: 'keypoint',
          label: { en: 'When a pie is fine, and when to swap it', ar: 'متى يصلح الدائري ومتى تستبدله', fa: 'کِی دایره‌ای خوب است و کِی باید عوضش کرد' },
          html: {
            en: '<ul><li><strong>Fine:</strong> up to about five parts, they sum to 100%, and you label each slice with its percentage.</li><li><strong>Swap for a bar:</strong> the reader needs to compare slices that are close in size. 39%, 33% and 28% are hard to rank by angle; as bars they are obvious.</li><li><strong>Never:</strong> time periods (months) or values that are not parts of one whole.</li></ul>',
            ar: '<ul><li><strong>مقبول:</strong> حتى نحو خمسة أجزاء، مجموعها 100%، وتسمّي كل شريحة بنسبتها.</li><li><strong>استبدله بأعمدة:</strong> حين يحتاج القارئ إلى مقارنة شرائح متقاربة الحجم. 39% و33% و28% يصعب ترتيبها بالزاوية؛ أما كأعمدة فواضحة.</li><li><strong>أبدًا:</strong> للفترات الزمنية (الأشهر) أو قيم ليست أجزاء من كل واحد.</li></ul>',
            fa: '<ul><li><strong>خوب:</strong> تا حدود پنج جزء، مجموعشان ۱۰۰٪ باشد و هر قطعه را با درصدش برچسب بزنی.</li><li><strong>با میله عوض کن:</strong> وقتی خواننده باید قطعه‌های هم‌اندازه را مقایسه کند. رتبه‌بندی ۳۹٪، ۳۳٪ و ۲۸٪ با زاویه سخت است؛ به‌صورت میله آشکار است.</li><li><strong>هرگز:</strong> برای دوره‌های زمانی (ماه‌ها) یا مقادیری که اجزای یک کل نیستند.</li></ul>',
          },
        },
        { type: 'exercise', questionId: 'w03-q005' },
        { type: 'exercise', questionId: 'w03-q013' },
      ],
    },
    {
      id: 'scatter-plots',
      navLabel: { en: 'Scatter plots', ar: 'مخططات الانتشار', fa: 'نمودار پراکندگی' },
      sectionLabel: { en: 'Section 07', ar: 'القسم ٠٧', fa: 'بخش ۰۷' },
      timeEst: { en: '6 min', ar: '٦ دقائق', fa: '۶ دقیقه' },
      headingHtml: {
        en: '<h2>Scatter plots: do two things move together?</h2><p class="standfirst">A scatter plot has no time axis and no categories: one number on x, another on y, one dot per row. It exists to show relationships.</p>',
        ar: '<h2>مخططات الانتشار: هل يتحرك شيئان معًا؟</h2><p class="standfirst">لا محور زمن في مخطط الانتشار ولا فئات: رقم على x وآخر على y، ونقطة لكل صف. وُجد لإظهار العلاقات.</p>',
        fa: '<h2>نمودار پراکندگی: آیا دو چیز با هم حرکت می‌کنند؟</h2><p class="standfirst">نمودار پراکندگی نه محور زمان دارد نه دسته: یک عدد روی x، عددی دیگر روی y و یک نقطه برای هر ردیف. برای نشان دادن رابطه‌ها وجود دارد.</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: '<p>Scatter plots quickly surface potential correlations. Here we compare Strawberry and Blueberry units, one dot per month.</p>',
            ar: '<p>تكشف مخططات الانتشار الارتباطات المحتملة بسرعة. هنا نقارن وحدات الفراولة والتوت الأزرق، بنقطة لكل شهر.</p>',
            fa: '<p>نمودار پراکندگی همبستگی‌های احتمالی را سریع آشکار می‌کند. اینجا واحدهای توت‌فرنگی و بلوبری را مقایسه می‌کنیم، با یک نقطه برای هر ماه.</p>',
          },
        },
        {
          type: 'tabs',
          tabs: [
            {
              label: { en: 'Excel', ar: 'Excel', fa: 'Excel' },
              blocks: [
                {
                  type: 'html',
                  html: {
                    en: '<p><strong>To build a scatter plot:</strong></p><ol><li>Select <code>B1:C13</code>: the two columns you want to relate. Excel puts the first column on x and the second on y.</li><li>Open the <strong>Insert</strong> tab.</li><li>Click the scatter dropdown and choose <strong>Scatter</strong> (the plain markers version).</li></ol>',
                    ar: '<p><strong>لبناء مخطط انتشار:</strong></p><ol><li>حدّد <code>B1:C13</code>: العمودين اللذين تريد ربطهما. يضع Excel العمود الأول على x والثاني على y.</li><li>افتح تبويب <strong>Insert</strong>.</li><li>انقر القائمة المنسدلة للانتشار واختر <strong>Scatter</strong> (نسخة العلامات فقط).</li></ol>',
                    fa: '<p><strong>برای ساخت نمودار پراکندگی:</strong></p><ol><li><code>B1:C13</code> را انتخاب کن: دو ستونی که می‌خواهی به هم ربط بدهی. Excel ستون اول را روی x و دوم را روی y می‌گذارد.</li><li>تب <strong>Insert</strong> را باز کن.</li><li>روی فهرست کشویی پراکندگی کلیک کن و <strong>Scatter</strong> (نسخهٔ فقط نشانگر) را انتخاب کن.</li></ol>',
                  },
                },
              ],
            },
            {
              label: { en: 'Python (Colab)', ar: 'Python (Colab)', fa: 'Python (Colab)' },
              blocks: [
                {
                  type: 'html',
                  html: {
                    en: '<code>df.plot.scatter</code> takes the two columns to relate. <code>Series.corr()</code> gives the correlation coefficient, the same number as Excel\'s <code>CORREL</code>.',
                    ar: 'يأخذ <code>df.plot.scatter</code> العمودين المراد ربطهما. يعطي <code>Series.corr()</code> معامل الارتباط، وهو الرقم نفسه في <code>CORREL</code> بـ Excel.',
                    fa: '<code>df.plot.scatter</code> دو ستونی را که باید به هم ربط بدهی می‌گیرد. <code>Series.corr()</code> ضریب همبستگی را می‌دهد، همان عدد <code>CORREL</code> در Excel.',
                  },
                },
                { type: 'code', code: py.scatter },
              ],
            },
            {
              label: { en: 'Power BI', ar: 'Power BI', fa: 'Power BI' },
              blocks: [
                {
                  type: 'html',
                  html: {
                    en: '<ol><li>Click the <strong>Scatter chart</strong> icon in the <strong>Visualizations</strong> pane.</li><li>Drag <code>Strawberry</code> to <strong>X-axis</strong> and <code>Blueberry</code> to <strong>Y-axis</strong>.</li><li>Drag <code>Month</code> to <strong>Values</strong>. Without a field there, Power BI adds all the months together and draws a single dot.</li><li>Optional: in the <strong>Analytics</strong> pane, add a <strong>Trend line</strong>.</li></ol>',
                    ar: '<ol><li>انقر أيقونة <strong>Scatter chart</strong> في جزء <strong>Visualizations</strong>.</li><li>اسحب <code>Strawberry</code> إلى <strong>X-axis</strong> و<code>Blueberry</code> إلى <strong>Y-axis</strong>.</li><li>اسحب <code>Month</code> إلى <strong>Values</strong>. من دون حقل هناك يجمع Power BI كل الأشهر معًا ويرسم نقطة واحدة.</li><li>اختياري: في جزء <strong>Analytics</strong> أضف <strong>Trend line</strong>.</li></ol>',
                    fa: '<ol><li>روی آیکن <strong>Scatter chart</strong> در پنل <strong>Visualizations</strong> کلیک کن.</li><li><code>Strawberry</code> را به <strong>X-axis</strong> و <code>Blueberry</code> را به <strong>Y-axis</strong> بکش.</li><li><code>Month</code> را به <strong>Values</strong> بکش. بدون فیلدی آنجا، Power BI همهٔ ماه‌ها را با هم جمع می‌کند و فقط یک نقطه می‌کشد.</li><li>اختیاری: در پنل <strong>Analytics</strong> یک <strong>Trend line</strong> اضافه کن.</li></ol>',
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'html',
          html: {
            en: '<p>The dots climb from lower left to upper right: months that are strong for Strawberry are strong for Blueberry too. <code>=CORREL(B2:B13, C2:C13)</code> confirms it at about 0.85.</p>',
            ar: '<p>تصعد النقاط من أسفل اليسار إلى أعلى اليمين: الأشهر القوية للفراولة قوية للتوت الأزرق أيضًا. <code>=CORREL(B2:B13, C2:C13)</code> يؤكد ذلك عند نحو 0.85.</p>',
            fa: '<p>نقطه‌ها از پایین چپ به بالا راست بالا می‌روند: ماه‌های قوی برای توت‌فرنگی برای بلوبری هم قوی‌اند. <code>=CORREL(B2:B13, C2:C13)</code> آن را حدود ۰٫۸۵ تأیید می‌کند.</p>',
          },
        },
        {
          type: 'box',
          variant: 'mistake',
          label: { en: 'Two traps', ar: 'فخّان', fa: 'دو تله' },
          html: {
            en: '<p><strong>1. Correlation is not cause.</strong> Strawberry and Blueberry rise together because both are summer fruits, not because one drives the other. Peach, which ripens later, correlates far less with Strawberry (about 0.46). A scatter plot shows that two things move together; it never says why.</p><p><strong>2. A histogram is a different chart.</strong> Some course notes tell you to pick "Histogram" on the way to a scatter plot; a histogram shows how one column is distributed and would ignore the relationship you want. Choose <strong>Scatter</strong>.</p>',
            ar: '<p><strong>1. الارتباط ليس سببًا.</strong> ترتفع الفراولة والتوت الأزرق معًا لأن كليهما فاكهة صيف، لا لأن أحدهما يقود الآخر. الخوخ، الذي ينضج لاحقًا، يرتبط بالفراولة أقل بكثير (نحو 0.46). يُظهر مخطط الانتشار أن شيئين يتحركان معًا؛ ولا يقول أبدًا لماذا.</p><p><strong>2. المدرّج التكراري رسم مختلف.</strong> تطلب بعض ملاحظات المقررات اختيار "Histogram" في طريقك إلى مخطط الانتشار؛ لكنه يُظهر توزيع عمود واحد وسيتجاهل العلاقة التي تريدها. اختر <strong>Scatter</strong>.</p>',
            fa: '<p><strong>۱. همبستگی علت نیست.</strong> توت‌فرنگی و بلوبری با هم بالا می‌روند چون هر دو میوهٔ تابستانی‌اند، نه چون یکی دیگری را می‌راند. هلو که دیرتر می‌رسد همبستگی بسیار کمتری با توت‌فرنگی دارد (حدود ۰٫۴۶). نمودار پراکندگی نشان می‌دهد دو چیز با هم حرکت می‌کنند؛ هرگز نمی‌گوید چرا.</p><p><strong>۲. هیستوگرام نمودار دیگری است.</strong> برخی جزوه‌ها می‌گویند در مسیر رسیدن به نمودار پراکندگی «Histogram» را انتخاب کن؛ هیستوگرام توزیع یک ستون را نشان می‌دهد و رابطهٔ مورد نظرت را نادیده می‌گیرد. <strong>Scatter</strong> را انتخاب کن.</p>',
          },
        },
        { type: 'exercise', questionId: 'w03-q006' },
        { type: 'exercise', questionId: 'w03-q014' },
      ],
    },
    {
      id: 'waterfall-charts',
      navLabel: { en: 'Waterfall charts', ar: 'مخططات الشلال', fa: 'نمودار آبشاری' },
      sectionLabel: { en: 'Section 08', ar: 'القسم ٠٨', fa: 'بخش ۰۸' },
      timeEst: { en: '6 min', ar: '٦ دقائق', fa: '۶ دقیقه' },
      headingHtml: {
        en: '<h2>Waterfall charts: what pushed the total up or down?</h2><p class="standfirst">A waterfall shows how a starting value becomes an ending value through a series of increases and decreases. It is the chart for "why did it change?"</p>',
        ar: '<h2>مخططات الشلال: ما الذي رفع الإجمالي أو خفضه؟</h2><p class="standfirst">يُظهر الشلال كيف تتحول قيمة البداية إلى قيمة النهاية عبر سلسلة من الزيادات والنقصانات. هو رسم "لماذا تغيّر؟"</p>',
        fa: '<h2>نمودار آبشاری: چه چیزی مجموع را بالا یا پایین برد؟</h2><p class="standfirst">نمودار آبشاری نشان می‌دهد یک مقدار شروع چگونه با یک سری افزایش و کاهش به مقدار پایانی می‌رسد. نمودارِ «چرا تغییر کرد؟» است.</p>',
      },
      blocks: [
        {
          type: 'html',
          html: {
            en: '<p>Waterfall charts illustrate how positive and negative values contribute to a total, and they are excellent for changes over time and for budget-versus-actual comparisons. To see both directions, first add a change column in <code>F</code>:</p>',
            ar: '<p>توضّح مخططات الشلال كيف تساهم القيم الموجبة والسالبة في إجمالي، وهي ممتازة للتغيرات عبر الزمن ولمقارنات الميزانية مقابل الفعلي. لرؤية الاتجاهين، أضف أولًا عمود تغيّر في <code>F</code>:</p>',
            fa: '<p>نمودار آبشاری نشان می‌دهد مقادیر مثبت و منفی چگونه در یک مجموع سهم دارند و برای تغییرات در زمان و مقایسهٔ بودجه با واقعی عالی است. برای دیدن هر دو جهت، اول یک ستون تغییر در <code>F</code> اضافه کن:</p>',
          },
        },
        {
          type: 'tabs',
          tabs: [
            {
              label: { en: 'Excel', ar: 'Excel', fa: 'Excel' },
              blocks: [
                {
                  type: 'code',
                  code: `F1:  Change vs previous month
F2:  =E2          -- January is the starting level
F3:  =E3-E2       -- copy down to F13`,
                },
                {
                  type: 'html',
                  html: {
                    en: '<p><strong>To build the waterfall:</strong></p><ol><li>Select the months <code>A1:A13</code>, hold <kbd>Ctrl</kbd> (Windows) or <kbd>Command</kbd> (Mac) and also select <code>F1:F13</code>.</li><li>Open the <strong>Insert</strong> tab, click the waterfall dropdown and choose <strong>Waterfall</strong>.</li><li>Right-click the January bar and choose <strong>Set as Total</strong>, so it is drawn from zero as the starting level.</li></ol>',
                    ar: '<p><strong>لبناء الشلال:</strong></p><ol><li>حدّد الأشهر <code>A1:A13</code>، واضغط <kbd>Ctrl</kbd> (ويندوز) أو <kbd>Command</kbd> (ماك) وحدّد أيضًا <code>F1:F13</code>.</li><li>افتح تبويب <strong>Insert</strong>، وانقر القائمة المنسدلة للشلال واختر <strong>Waterfall</strong>.</li><li>انقر بزر الفأرة الأيمن على عمود يناير واختر <strong>Set as Total</strong> ليُرسم من الصفر كمستوى بداية.</li></ol>',
                    fa: '<p><strong>برای ساخت نمودار آبشاری:</strong></p><ol><li>ماه‌ها <code>A1:A13</code> را انتخاب کن، <kbd>Ctrl</kbd> (ویندوز) یا <kbd>Command</kbd> (مک) را نگه دار و <code>F1:F13</code> را هم انتخاب کن.</li><li>تب <strong>Insert</strong> را باز کن، روی فهرست کشویی آبشاری کلیک کن و <strong>Waterfall</strong> را انتخاب کن.</li><li>روی میلهٔ ژانویه راست‌کلیک کن و <strong>Set as Total</strong> را انتخاب کن تا از صفر به‌عنوان سطح شروع کشیده شود.</li></ol>',
                  },
                },
              ],
            },
            {
              label: { en: 'Python (Colab)', ar: 'Python (Colab)', fa: 'Python (Colab)' },
              blocks: [
                {
                  type: 'html',
                  html: {
                    en: 'matplotlib has no ready-made waterfall, so you draw one: a bar per month whose height is the <em>change</em> and whose start (<code>bottom</code>) is the total of the previous month. The <code>Change</code> column from the setup cell is the same one Excel needed.',
                    ar: 'ليس في matplotlib مخطط شلال جاهز، فترسمه بنفسك: عمود لكل شهر ارتفاعه هو <em>التغيّر</em> وبدايته (<code>bottom</code>) هي إجمالي الشهر السابق. عمود <code>Change</code> من خلية التجهيز هو نفسه الذي احتاجه Excel.',
                    fa: 'matplotlib نمودار آبشاری آماده ندارد، پس خودت یکی می‌کشی: یک میله برای هر ماه که ارتفاعش <em>تغییر</em> و شروعش (<code>bottom</code>) مجموع ماه قبل است. ستون <code>Change</code> در سلول آماده‌سازی همان چیزی است که Excel هم لازم داشت.',
                  },
                },
                { type: 'code', code: py.waterfall },
              ],
            },
            {
              label: { en: 'Power BI', ar: 'Power BI', fa: 'Power BI' },
              blocks: [
                {
                  type: 'html',
                  html: {
                    en: '<ol><li>Click the <strong>Waterfall chart</strong> icon in the <strong>Visualizations</strong> pane.</li><li>Drag <code>Month</code> to <strong>Category</strong> and <code>Change</code> to <strong>Y-axis</strong>.</li></ol><p>Power BI colors the increases and decreases for you and ends with a total bar. The optional <strong>Breakdown</strong> well splits each bar by another field.</p>',
                    ar: '<ol><li>انقر أيقونة <strong>Waterfall chart</strong> في جزء <strong>Visualizations</strong>.</li><li>اسحب <code>Month</code> إلى <strong>Category</strong> و<code>Change</code> إلى <strong>Y-axis</strong>.</li></ol><p>يلوّن Power BI الزيادات والنقصانات لك وينتهي بعمود إجمالي. يقسّم حقل <strong>Breakdown</strong> الاختياري كل عمود بحقل آخر.</p>',
                    fa: '<ol><li>روی آیکن <strong>Waterfall chart</strong> در پنل <strong>Visualizations</strong> کلیک کن.</li><li><code>Month</code> را به <strong>Category</strong> و <code>Change</code> را به <strong>Y-axis</strong> بکش.</li></ol><p>Power BI افزایش‌ها و کاهش‌ها را برایت رنگ می‌کند و با یک میلهٔ مجموع تمام می‌شود. بخش اختیاری <strong>Breakdown</strong> هر میله را با فیلدی دیگر تقسیم می‌کند.</p>',
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 3', ar: 'الرسم ٣', fa: 'نمودار ۳' },
          title: {
            en: 'Month-over-month change in total units, 2024',
            ar: 'التغيّر الشهري في إجمالي الوحدات، 2024',
            fa: 'تغییر ماه‌به‌ماه مجموع واحدها، ۲۰۲۴',
          },
          src: '/figures/week-03/diagram-03.svg',
          alt: 'Waterfall from 16 units in January rising to 108 by July, flat in August, falling by 34, 30 and 19 in September to November, ending at 28 in December',
          caption: {
            en: 'Teal bars push the total up until July; red bars pull it down from September. The three red bars add up to −83 units.',
            ar: 'الأعمدة الفيروزية ترفع الإجمالي حتى يوليو؛ والحمراء تخفضه من سبتمبر. الأعمدة الحمراء الثلاثة مجموعها −83 وحدة.',
            fa: 'میله‌های فیروزه‌ای تا ژوئیه مجموع را بالا می‌برند؛ میله‌های قرمز از سپتامبر آن را پایین می‌آورند. سه میلهٔ قرمز روی هم ‎−۸۳ واحد می‌شوند.',
          },
        },
        {
          type: 'box',
          variant: 'keypoint',
          label: { en: 'Where you will use it again', ar: 'أين ستستخدمه مرة أخرى', fa: 'کجا دوباره از آن استفاده می‌کنی' },
          html: {
            en: '<p>Any "bridge" question: revenue minus costs to profit, last year\'s total to this year\'s, budget to actual. A total column that is all positive (as in a plain monthly sales table) makes a dull waterfall; a change column is what makes it useful.</p>',
            ar: '<p>أي سؤال "جسر": الإيراد ناقص التكاليف إلى الربح، من إجمالي العام الماضي إلى هذا العام، من الميزانية إلى الفعلي. عمود إجمالي كله موجب (كما في جدول مبيعات شهري بسيط) يعطي شلالًا مملًّا؛ عمود التغيّر هو ما يجعله مفيدًا.</p>',
            fa: '<p>هر سؤال «پل»: درآمد منهای هزینه‌ها تا سود، مجموع سال گذشته تا امسال، بودجه تا واقعی. ستون مجموعی که همه‌اش مثبت باشد (مثل یک جدول ساده فروش ماهانه) نمودار آبشاری کسل‌کننده‌ای می‌سازد؛ ستون تغییر است که آن را مفید می‌کند.</p>',
          },
        },
        { type: 'exercise', questionId: 'w03-q007' },
        { type: 'exercise', questionId: 'w03-q015' },
      ],
    },
    {
      id: 'chart-elements',
      navLabel: { en: 'Chart elements and style', ar: 'عناصر الرسم وأسلوبه', fa: 'عناصر و سبک نمودار' },
      sectionLabel: { en: 'Section 09', ar: 'القسم ٠٩', fa: 'بخش ۰۹' },
      timeEst: { en: '7 min', ar: '٧ دقائق', fa: '۷ دقیقه' },
      headingHtml: {
        en: '<h2>Chart elements and style: make it readable at a glance</h2><p class="standfirst">Excel\'s first draft of a chart is rarely the one you should send. A few deliberate edits turn it from a picture into a message.</p>',
        ar: '<h2>عناصر الرسم وأسلوبه: اجعله مقروءًا بنظرة</h2><p class="standfirst">مسودة Excel الأولى للرسم نادرًا ما تكون التي يجب إرسالها. بضع تعديلات مقصودة تحوّله من صورة إلى رسالة.</p>',
        fa: '<h2>عناصر و سبک نمودار: در یک نگاه خوانا کن</h2><p class="standfirst">پیش‌نویس اول Excel از یک نمودار به‌ندرت همانی است که باید بفرستی. چند ویرایش آگاهانه آن را از یک تصویر به یک پیام تبدیل می‌کند.</p>',
      },
      blocks: [
        {
          type: 'tabs',
          tabs: [
            {
              label: { en: 'Excel', ar: 'Excel', fa: 'Excel' },
              blocks: [
                {
                  type: 'html',
                  html: {
                    en: '<p>First build the clustered column chart from Section 4. Then click the chart to select it, open the <strong>Chart Design</strong> tab and use <strong>Add Chart Element</strong> to reach everything below.</p>',
                    ar: '<p>ابنِ أولًا رسم الأعمدة العنقودي من القسم 4. ثم انقر الرسم لتحديده، وافتح تبويب <strong>Chart Design</strong> واستخدم <strong>Add Chart Element</strong> للوصول إلى كل ما يلي.</p>',
                    fa: '<p>اول نمودار ستونی خوشه‌ای بخش ۴ را بساز. سپس روی نمودار کلیک کن تا انتخاب شود، تب <strong>Chart Design</strong> را باز کن و از <strong>Add Chart Element</strong> برای دسترسی به همهٔ موارد زیر استفاده کن.</p>',
                  },
                },
                {
                  type: 'table',
                  headers: [
                    { en: 'Element', ar: 'العنصر', fa: 'عنصر' },
                    { en: 'How', ar: 'الطريقة', fa: 'روش' },
                    { en: 'Tip', ar: 'نصيحة', fa: 'نکته' },
                  ],
                  rows: [
                    [
                      { en: '<strong>Chart title</strong>', ar: '<strong>عنوان الرسم</strong>', fa: '<strong>عنوان نمودار</strong>' },
                      { en: 'Add Chart Element › Chart Title (Above Chart, Centered Overlay); click it and type; right-click › Delete to remove', ar: 'Add Chart Element › Chart Title (Above Chart أو Centered Overlay)؛ انقر واكتب؛ بزر الفأرة الأيمن › Delete للإزالة', fa: 'Add Chart Element › Chart Title (Above Chart یا Centered Overlay)؛ کلیک کن و تایپ کن؛ راست‌کلیک › Delete برای حذف' },
                      { en: 'State the takeaway, not the topic', ar: 'اذكر الخلاصة لا الموضوع', fa: 'نتیجه را بگو، نه موضوع را' },
                    ],
                    [
                      { en: '<strong>Legend</strong>', ar: '<strong>مفتاح الرسم</strong>', fa: '<strong>راهنما</strong>' },
                      { en: 'Add Chart Element › Legend (Top, Right…) or None', ar: 'Add Chart Element › Legend (Top أو Right…) أو None', fa: 'Add Chart Element › Legend (Top، Right…) یا None' },
                      { en: 'Top or right; drop it if there is one series', ar: 'أعلى أو يمين؛ احذفه إن كانت هناك سلسلة واحدة', fa: 'بالا یا راست؛ اگر فقط یک سری است حذفش کن' },
                    ],
                    [
                      { en: '<strong>Data labels</strong>', ar: '<strong>تسميات البيانات</strong>', fa: '<strong>برچسب داده</strong>' },
                      { en: 'Add Chart Element › Data Labels (Center, Above…); right-click one label › Delete to remove a category\'s labels', ar: 'Add Chart Element › Data Labels (Center أو Above…)؛ بزر الفأرة الأيمن على تسمية › Delete لإزالة تسميات فئة', fa: 'Add Chart Element › Data Labels (Center، Above…)؛ راست‌کلیک روی یک برچسب › Delete برای حذف برچسب‌های یک دسته' },
                      { en: 'Label only what the reader must see; then remove the gridlines', ar: 'سمِّ فقط ما يجب أن يراه القارئ؛ ثم أزل خطوط الشبكة', fa: 'فقط چیزی را برچسب بزن که خواننده باید ببیند؛ بعد خطوط شبکه را بردار' },
                    ],
                    [
                      { en: '<strong>Gridlines and axes</strong>', ar: '<strong>خطوط الشبكة والمحاور</strong>', fa: '<strong>خطوط شبکه و محورها</strong>' },
                      { en: 'Add Chart Element › Gridlines / Axes; untick an axis to hide it', ar: 'Add Chart Element › Gridlines / Axes؛ ألغِ تحديد محور لإخفائه', fa: 'Add Chart Element › Gridlines / Axes؛ تیک یک محور را بردار تا پنهان شود' },
                      { en: 'Light gray, few of them', ar: 'رمادي فاتح، وعدد قليل', fa: 'خاکستری روشن و کم' },
                    ],
                  ],
                },
                {
                  type: 'html',
                  html: {
                    en: '<p><strong>Style and color.</strong> In <strong>Chart Design</strong>, the <strong>Chart Styles</strong> group has ready-made looks and <strong>Change Colors</strong> has palettes. A small change goes a long way: one style plus a single-hue (monochromatic) palette instantly looks intentional. <strong>Everything else</strong> (series colors, plot and chart backgrounds, gridline weight) lives behind a right-click on the element › <strong>Format [element]</strong>.</p>',
                    ar: '<p><strong>الأسلوب واللون.</strong> في <strong>Chart Design</strong> تضم مجموعة <strong>Chart Styles</strong> أنماطًا جاهزة، ويضم <strong>Change Colors</strong> لوحات ألوان. تغيير صغير يفيد كثيرًا: نمط واحد مع لوحة أحادية اللون يبدو مقصودًا فورًا. <strong>كل ما عدا ذلك</strong> (ألوان السلاسل وخلفيات المخطط ومنطقة الرسم وسماكة خطوط الشبكة) خلف نقرة يمنى على العنصر › <strong>Format [element]</strong>.</p>',
                    fa: '<p><strong>سبک و رنگ.</strong> در <strong>Chart Design</strong> گروه <strong>Chart Styles</strong> ظاهرهای آماده و <strong>Change Colors</strong> پالت‌های رنگی دارد. تغییر کوچک اثر بزرگ دارد: یک سبک به‌علاوهٔ پالت تک‌رنگ فوراً عمدی به‌نظر می‌رسد. <strong>هر چیز دیگر</strong> (رنگ سری‌ها، پس‌زمینهٔ نمودار و ناحیهٔ رسم، ضخامت خطوط شبکه) پشت راست‌کلیک روی عنصر › <strong>Format [element]</strong> است.</p>',
                  },
                },
              ],
            },
            {
              label: { en: 'Python (Colab)', ar: 'Python (Colab)', fa: 'Python (Colab)' },
              blocks: [
                {
                  type: 'html',
                  html: {
                    en: 'Every chart element is a method on the <code>ax</code> object that <code>plot</code> returns: a title, axis titles, a legend, and light gridlines. Write the title as the takeaway, just as in Excel.',
                    ar: 'كل عنصر في الرسم هو دالة على الكائن <code>ax</code> الذي تعيده <code>plot</code>: عنوان، وعناوين المحاور، ومفتاح، وخطوط شبكة خفيفة. اكتب العنوان كخلاصة، تمامًا كما في Excel.',
                    fa: 'هر عنصر نمودار یک متد روی شیء <code>ax</code> است که <code>plot</code> برمی‌گرداند: عنوان، عنوان محورها، راهنما و خطوط شبکهٔ کم‌رنگ. عنوان را مثل Excel به‌صورت نتیجه بنویس.',
                  },
                },
                { type: 'code', code: py.elements },
                {
                  type: 'html',
                  html: {
                    en: 'For data labels use <code>ax.bar_label</code>, and pass one accent color instead of the default rainbow:',
                    ar: 'لتسميات البيانات استخدم <code>ax.bar_label</code>، ومرّر لونًا مميزًا واحدًا بدل ألوان قوس قزح الافتراضية:',
                    fa: 'برای برچسب داده از <code>ax.bar_label</code> استفاده کن و به‌جای رنگین‌کمان پیش‌فرض یک رنگ برجسته بده:',
                  },
                },
                { type: 'code', code: py.labels },
              ],
            },
            {
              label: { en: 'Power BI', ar: 'Power BI', fa: 'Power BI' },
              blocks: [
                {
                  type: 'html',
                  html: {
                    en: '<p>Select the visual, then open <strong>Format your visual</strong> (the paint-roller icon) in the <strong>Visualizations</strong> pane.</p><ul><li><strong>Title:</strong> <strong>General › Title</strong>. Type the takeaway.</li><li><strong>Legend:</strong> switch <strong>Legend</strong> on or off and pick its position.</li><li><strong>Data labels:</strong> switch <strong>Data labels</strong> on.</li><li><strong>Gridlines and axes:</strong> under <strong>X-axis</strong> or <strong>Y-axis</strong>, toggle <strong>Values</strong>, <strong>Title</strong> and <strong>Gridlines</strong>.</li><li><strong>Colors:</strong> set each series under <strong>Visual › Columns › Colors</strong>, or restyle everything at once with <strong>View › Themes</strong>.</li></ul>',
                    ar: '<p>حدّد الرسم ثم افتح <strong>Format your visual</strong> (أيقونة الفرشاة) في جزء <strong>Visualizations</strong>.</p><ul><li><strong>العنوان:</strong> <strong>General › Title</strong>. اكتب الخلاصة.</li><li><strong>المفتاح:</strong> فعّل <strong>Legend</strong> أو عطّله واختر موضعه.</li><li><strong>تسميات البيانات:</strong> فعّل <strong>Data labels</strong>.</li><li><strong>خطوط الشبكة والمحاور:</strong> تحت <strong>X-axis</strong> أو <strong>Y-axis</strong> بدّل <strong>Values</strong> و<strong>Title</strong> و<strong>Gridlines</strong>.</li><li><strong>الألوان:</strong> اضبط كل سلسلة تحت <strong>Visual › Columns › Colors</strong>، أو أعد تنسيق كل شيء دفعة واحدة بـ <strong>View › Themes</strong>.</li></ul>',
                    fa: '<p>نمودار را انتخاب کن، سپس <strong>Format your visual</strong> (آیکن غلتک رنگ) را در پنل <strong>Visualizations</strong> باز کن.</p><ul><li><strong>عنوان:</strong> <strong>General › Title</strong>. نتیجه را بنویس.</li><li><strong>راهنما:</strong> <strong>Legend</strong> را روشن یا خاموش کن و جایش را انتخاب کن.</li><li><strong>برچسب داده:</strong> <strong>Data labels</strong> را روشن کن.</li><li><strong>خطوط شبکه و محورها:</strong> زیر <strong>X-axis</strong> یا <strong>Y-axis</strong>، <strong>Values</strong>، <strong>Title</strong> و <strong>Gridlines</strong> را تغییر بده.</li><li><strong>رنگ‌ها:</strong> هر سری را زیر <strong>Visual › Columns › Colors</strong> تنظیم کن، یا همه‌چیز را یک‌جا با <strong>View › Themes</strong> بازطراحی کن.</li></ul>',
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 4', ar: 'الرسم ٤', fa: 'نمودار ۴' },
          title: { en: 'Anatomy of a chart', ar: 'تشريح الرسم', fa: 'کالبدشکافی یک نمودار' },
          src: '/figures/week-03/diagram-04.svg',
          alt: 'A column chart for July to September with callouts for the title, legend, data labels, gridlines, axis titles and axes',
          caption: {
            en: 'The six parts you can add, remove or restyle. The title here states the finding.',
            ar: 'الأجزاء الستة التي يمكنك إضافتها أو إزالتها أو إعادة تنسيقها. العنوان هنا يذكر النتيجة.',
            fa: 'شش بخشی که می‌توانی اضافه، حذف یا بازطراحی کنی. عنوان اینجا یافته را می‌گوید.',
          },
        },
        {
          type: 'box',
          variant: 'example',
          label: { en: 'Same chart, better title', ar: 'الرسم نفسه، عنوان أفضل', fa: 'همان نمودار، عنوان بهتر' },
          html: {
            en: '<p>Topic title: "Units sold, 2024". Takeaway title: "Peach overtakes Strawberry in August: plan stock for late summer". The second one tells the owner what to do before they have read a single bar.</p>',
            ar: '<p>عنوان موضوعي: "الوحدات المباعة، 2024". عنوان خلاصة: "الخوخ يتفوق على الفراولة في أغسطس: خطّط للمخزون في أواخر الصيف". الثاني يخبر صاحب الكشك ماذا يفعل قبل أن يقرأ عمودًا واحدًا.</p>',
            fa: '<p>عنوان موضوعی: «واحدهای فروخته‌شده، ۲۰۲۴». عنوان نتیجه‌محور: «هلو در اوت از توت‌فرنگی پیشی می‌گیرد: برای اواخر تابستان موجودی برنامه‌ریزی کن». دومی پیش از آنکه صاحب غرفه حتی یک میله را بخواند به او می‌گوید چه کند.</p>',
          },
        },
        { type: 'exercise', questionId: 'w03-q008' },
      ],
    },
    {
      id: 'honest-charts',
      navLabel: { en: 'Axes and honest charts', ar: 'المحاور والرسوم الأمينة', fa: 'محورها و نمودار صادق' },
      sectionLabel: { en: 'Section 10', ar: 'القسم ١٠', fa: 'بخش ۱۰' },
      timeEst: { en: '8 min', ar: '٨ دقائق', fa: '۸ دقیقه' },
      headingHtml: {
        en: '<h2>Axes and honest charts: when a chart quietly misleads</h2><p class="standfirst">Every chart makes choices, and some choices change the message without changing a single number. The axis is where most of the damage happens.</p>',
        ar: '<h2>المحاور والرسوم الأمينة: حين يضلّل الرسم بصمت</h2><p class="standfirst">كل رسم يتخذ خيارات، وبعضها يغيّر الرسالة دون تغيير رقم واحد. والمحور هو موضع معظم الضرر.</p>',
        fa: '<h2>محورها و نمودار صادق: وقتی نمودار بی‌سروصدا گمراه می‌کند</h2><p class="standfirst">هر نمودار انتخاب‌هایی می‌کند و بعضی انتخاب‌ها پیام را بدون تغییر حتی یک عدد عوض می‌کنند. محور جایی است که بیشتر آسیب رخ می‌دهد.</p>',
      },
      blocks: [
        {
          type: 'tabs',
          tabs: [
            {
              label: { en: 'Excel', ar: 'Excel', fa: 'Excel' },
              blocks: [
                {
                  type: 'html',
                  html: {
                    en: '<p><strong>Format the axes first.</strong> Add axis titles through <strong>Chart Design › Add Chart Element › Axis Titles</strong>: "Month" on x and "Units sold" on y. To change the scale, right-click an axis › <strong>Format Axis</strong> and set the minimum, maximum, major/minor units or number format. Under <strong>Add Chart Element › Axes</strong> you can also hide an axis entirely. Those same controls are how a chart gets distorted, so use them deliberately.</p>',
                    ar: '<p><strong>نسّق المحاور أولًا.</strong> أضف عناوين المحاور عبر <strong>Chart Design › Add Chart Element › Axis Titles</strong>: "الشهر" على x و"الوحدات المباعة" على y. لتغيير المقياس، انقر بزر الفأرة الأيمن على محور › <strong>Format Axis</strong> واضبط الحد الأدنى والأقصى والوحدات الرئيسية/الثانوية أو تنسيق الأرقام. وتحت <strong>Add Chart Element › Axes</strong> يمكنك أيضًا إخفاء محور كليًا. هذه الأدوات نفسها هي ما يشوّه الرسم، فاستخدمها عن قصد.</p>',
                    fa: '<p><strong>اول محورها را قالب‌بندی کن.</strong> عنوان محورها را از <strong>Chart Design › Add Chart Element › Axis Titles</strong> اضافه کن: «ماه» روی x و «واحدهای فروخته‌شده» روی y. برای تغییر مقیاس، روی یک محور راست‌کلیک کن › <strong>Format Axis</strong> و کمینه، بیشینه، واحدهای اصلی/فرعی یا قالب عدد را تنظیم کن. زیر <strong>Add Chart Element › Axes</strong> می‌توانی یک محور را کاملاً پنهان هم کنی. همین کنترل‌ها راه تحریف نمودار هم هستند، پس آگاهانه از آن‌ها استفاده کن.</p>',
                  },
                },
              ],
            },
            {
              label: { en: 'Python (Colab)', ar: 'Python (Colab)', fa: 'Python (Colab)' },
              blocks: [
                {
                  type: 'html',
                  html: {
                    en: 'In matplotlib you set where an axis starts yourself, with <code>set_ylim</code>. Bars should start at 0; the right-hand chart below shows what happens when they do not. Add axis titles with <code>set_xlabel</code> and <code>set_ylabel</code>.',
                    ar: 'في matplotlib تحدد بنفسك أين يبدأ المحور باستخدام <code>set_ylim</code>. يجب أن تبدأ الأعمدة من 0؛ ويُظهر الرسم الأيمن أدناه ما يحدث حين لا تبدأ منه. أضف عناوين المحاور بـ <code>set_xlabel</code> و<code>set_ylabel</code>.',
                    fa: 'در matplotlib خودت با <code>set_ylim</code> تعیین می‌کنی محور از کجا شروع شود. میله‌ها باید از ۰ شروع شوند؛ نمودار سمت راست پایین نشان می‌دهد وقتی نشوند چه می‌شود. عنوان محورها را با <code>set_xlabel</code> و <code>set_ylabel</code> اضافه کن.',
                  },
                },
                { type: 'code', code: py.honest },
              ],
            },
            {
              label: { en: 'Power BI', ar: 'Power BI', fa: 'Power BI' },
              blocks: [
                {
                  type: 'html',
                  html: {
                    en: '<ol><li>Select the visual and open <strong>Format your visual › Y-axis</strong>.</li><li>Expand <strong>Range</strong> and set <strong>Minimum</strong> to <code>0</code> (and a <strong>Maximum</strong> if you want one).</li><li>Switch <strong>Title</strong> on to add an axis title.</li></ol><p><strong>Check the minimum every time.</strong> Power BI picks a range automatically, and on some charts it does not start at zero.</p>',
                    ar: '<ol><li>حدّد الرسم وافتح <strong>Format your visual › Y-axis</strong>.</li><li>وسّع <strong>Range</strong> واضبط <strong>Minimum</strong> على <code>0</code> (و<strong>Maximum</strong> إن أردت).</li><li>فعّل <strong>Title</strong> لإضافة عنوان للمحور.</li></ol><p><strong>راجع الحد الأدنى في كل مرة.</strong> يختار Power BI نطاقًا تلقائيًا، وفي بعض الرسوم لا يبدأ من الصفر.</p>',
                    fa: '<ol><li>نمودار را انتخاب کن و <strong>Format your visual › Y-axis</strong> را باز کن.</li><li><strong>Range</strong> را باز کن و <strong>Minimum</strong> را روی <code>0</code> بگذار (و اگر خواستی <strong>Maximum</strong>).</li><li>برای افزودن عنوان محور <strong>Title</strong> را روشن کن.</li></ol><p><strong>هر بار کمینه را بررسی کن.</strong> Power BI خودکار یک بازه انتخاب می‌کند و در بعضی نمودارها از صفر شروع نمی‌شود.</p>',
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'diagram',
          fig: { en: 'Diagram 2', ar: 'الرسم ٢', fa: 'نمودار ۲' },
          title: { en: 'Same data, two axes', ar: 'البيانات نفسها، محوران', fa: 'همان داده، دو محور' },
          src: '/figures/week-03/diagram-02.svg',
          alt: 'Two bar charts of Strawberry 253, Blueberry 216 and Peach 180: one with an axis from 0 where bars look similar, one with an axis from 150 where Strawberry looks over three times taller than Peach',
          caption: {
            en: 'Both charts use identical numbers. Only the axis start changed, and the story went from "similar" to "Strawberry dominates".',
            ar: 'الرسمان يستخدمان أرقامًا متطابقة. تغيّرت بداية المحور فقط، فانتقلت القصة من "متشابهة" إلى "الفراولة تهيمن".',
            fa: 'هر دو نمودار اعداد یکسان دارند. فقط شروع محور عوض شد و داستان از «مشابه» به «توت‌فرنگی غالب است» رفت.',
          },
        },
        {
          type: 'table',
          headers: [
            { en: 'Trick', ar: 'الحيلة', fa: 'ترفند' },
            { en: 'What it does', ar: 'ماذا تفعل', fa: 'چه می‌کند' },
            { en: 'Honest version', ar: 'النسخة الأمينة', fa: 'نسخهٔ صادق' },
          ],
          rows: [
            [
              { en: '<strong>Truncated axis</strong>', ar: '<strong>محور مقتطع</strong>', fa: '<strong>محور بریده</strong>' },
              { en: 'Bar lengths no longer match values, so small gaps look huge', ar: 'أطوال الأعمدة لا تطابق القيم، فتبدو الفجوات الصغيرة ضخمة', fa: 'طول میله‌ها با مقدارها نمی‌خواند، پس فاصله‌های کوچک بزرگ به‌نظر می‌رسند' },
              { en: 'Start bar charts at 0. A line chart may zoom, but say so on the axis', ar: 'ابدأ رسوم الأعمدة من 0. يجوز للخطي التقريب، لكن اذكر ذلك على المحور', fa: 'نمودار میله‌ای را از ۰ شروع کن. نمودار خطی می‌تواند زوم کند، اما روی محور بگو' },
            ],
            [
              { en: '<strong>3-D effects</strong>', ar: '<strong>تأثيرات ثلاثية الأبعاد</strong>', fa: '<strong>جلوه‌های سه‌بعدی</strong>' },
              { en: 'Perspective makes front items look bigger than back items', ar: 'المنظور يجعل العناصر الأمامية تبدو أكبر من الخلفية', fa: 'پرسپکتیو باعث می‌شود اقلام جلو بزرگ‌تر از اقلام عقب به‌نظر برسند' },
              { en: 'Use flat 2-D charts', ar: 'استخدم رسومًا مسطحة ثنائية الأبعاد', fa: 'از نمودار تخت دوبعدی استفاده کن' },
            ],
            [
              { en: '<strong>Dual axes</strong>', ar: '<strong>محوران مزدوجان</strong>', fa: '<strong>محور دوگانه</strong>' },
              { en: 'Two scales on one chart let you make any two lines appear to move together', ar: 'مقياسان في رسم واحد يتيحان جعل أي خطين يبدوان متحركين معًا', fa: 'دو مقیاس در یک نمودار اجازه می‌دهد هر دو خط را هم‌حرکت نشان بدهی' },
              { en: 'Two separate charts, or index both series to 100', ar: 'رسمان منفصلان، أو اجعل السلسلتين مؤشّرتين إلى 100', fa: 'دو نمودار جدا، یا هر دو سری را به ۱۰۰ نمایه کن' },
            ],
            [
              { en: '<strong>Overloaded pie</strong>', ar: '<strong>دائري مزدحم</strong>', fa: '<strong>دایره‌ای شلوغ</strong>' },
              { en: 'Too many slices, or slices that are not parts of one whole', ar: 'شرائح كثيرة جدًا، أو شرائح ليست أجزاء من كل واحد', fa: 'قطعه‌های بیش از حد، یا قطعه‌هایی که اجزای یک کل نیستند' },
              { en: 'A sorted bar chart', ar: 'رسم أعمدة مرتّب', fa: 'یک نمودار میله‌ای مرتب' },
            ],
            [
              { en: '<strong>Cherry-picked range</strong>', ar: '<strong>نطاق منتقى</strong>', fa: '<strong>بازهٔ دست‌چین</strong>' },
              { en: 'Showing only the months that support your story (Jan to Jul hides the autumn drop)', ar: 'عرض الأشهر التي تدعم قصتك فقط (يناير إلى يوليو يخفي هبوط الخريف)', fa: 'نشان دادن فقط ماه‌هایی که از داستانت پشتیبانی می‌کنند (ژانویه تا ژوئیه افت پاییز را پنهان می‌کند)' },
              { en: 'Show the full period, or state the range in the title', ar: 'اعرض الفترة كاملة، أو اذكر النطاق في العنوان', fa: 'کل دوره را نشان بده، یا بازه را در عنوان بنویس' },
            ],
          ],
        },
        {
          type: 'box',
          variant: 'keypoint',
          label: { en: 'Rule of thumb', ar: 'قاعدة عامة', fa: 'قاعدهٔ سرانگشتی' },
          html: {
            en: '<p>Before sending any chart, ask: <strong>if the numbers were hidden, would the picture still tell the same story as the table?</strong> If a slightly different axis, range or chart type changes the message, you have to be able to defend the one you chose.</p>',
            ar: '<p>قبل إرسال أي رسم اسأل: <strong>لو أُخفيت الأرقام، هل تحكي الصورة القصة نفسها التي يحكيها الجدول؟</strong> إن كان محور أو نطاق أو نوع رسم مختلف قليلًا يغيّر الرسالة، فعليك أن تكون قادرًا على الدفاع عن اختيارك.</p>',
            fa: '<p>پیش از فرستادن هر نمودار بپرس: <strong>اگر اعداد پنهان بودند، آیا تصویر همان داستانی را می‌گفت که جدول می‌گوید؟</strong> اگر محور، بازه یا نوع نمودارِ کمی متفاوت پیام را عوض می‌کند، باید بتوانی از انتخابت دفاع کنی.</p>',
          },
        },
        { type: 'exercise', questionId: 'w03-q009' },
      ],
    },
    {
      id: 'ai-corner',
      navLabel: { en: 'AI co-pilot corner', ar: 'ركن مساعد الذكاء الاصطناعي', fa: 'گوشه همیار هوش مصنوعی' },
      sectionLabel: { en: 'Section 11 — AI layer', ar: 'القسم ١١ — طبقة الذكاء الاصطناعي', fa: 'بخش ۱۱ — لایه هوش مصنوعی' },
      timeEst: { en: '6 min', ar: '٦ دقائق', fa: '۶ دقیقه' },
      headingHtml: {
        en: '<h2>AI co-pilot corner: a chart that looks polished can still be wrong</h2><p class="standfirst">Ask an AI for "a chart" and you get something tidy and confident. It does not know who will read it or what decision hangs on it. That part is still your job.</p>',
        ar: '<h2>ركن مساعد الذكاء الاصطناعي: رسم يبدو أنيقًا قد يظل خاطئًا</h2><p class="standfirst">اطلب من ذكاء اصطناعي "رسمًا" فتحصل على شيء مرتب وواثق. هو لا يعرف من سيقرأه ولا أي قرار يتوقف عليه. هذا الجزء ما زال عملك.</p>',
        fa: '<h2>گوشه همیار هوش مصنوعی: نموداری که صیقلی به‌نظر می‌رسد هنوز می‌تواند غلط باشد</h2><p class="standfirst">از یک هوش مصنوعی «یک نمودار» بخواه؛ چیزی مرتب و مطمئن می‌گیری. نمی‌داند چه کسی آن را می‌خواند یا چه تصمیمی به آن بند است. آن بخش هنوز کار توست.</p>',
      },
      blocks: [
        {
          type: 'tabs',
          tabs: [
            {
              label: { en: 'Weak prompt', ar: 'طلب ضعيف', fa: 'درخواست ضعیف' },
              blocks: [
                {
                  type: 'html',
                  html: {
                    en: '<p><strong>Prompt:</strong> "Make a chart of this jam sales data."</p><p>Typical result: a 3-D clustered column chart with 36 bars, a rainbow palette, no title, and a y-axis that starts at 5. It looks finished. It answers no question, and the owner still has to hunt for the pattern.</p>',
                    ar: '<p><strong>الطلب:</strong> "اصنع رسمًا لبيانات مبيعات المربى هذه."</p><p>النتيجة المعتادة: رسم أعمدة عنقودي ثلاثي الأبعاد بـ36 عمودًا، ولوحة ألوان قوس قزح، بلا عنوان، ومحور y يبدأ عند 5. يبدو منتهيًا. لا يجيب عن سؤال، وما زال على صاحب الكشك أن يبحث عن النمط.</p>',
                    fa: '<p><strong>درخواست:</strong> «یک نمودار از این داده‌های فروش مربا بساز.»</p><p>نتیجهٔ معمول: نمودار ستونی خوشه‌ای سه‌بعدی با ۳۶ ستون، پالت رنگین‌کمانی، بدون عنوان و محور y که از ۵ شروع می‌شود. تمام‌شده به‌نظر می‌رسد. به هیچ سؤالی پاسخ نمی‌دهد و صاحب غرفه هنوز باید دنبال الگو بگردد.</p>',
                  },
                },
              ],
            },
            {
              label: { en: 'Strong prompt', ar: 'طلب قوي', fa: 'درخواست قوی' },
              blocks: [
                {
                  type: 'html',
                  html: {
                    en: '<p><strong>Prompt:</strong> "The stand owner wants to know when each flavor peaks so they can plan stock. My data is in Excel: months in A2:A13, monthly units for Strawberry, Blueberry and Peach in B to D. Recommend ONE chart type and give the Excel steps. Constraints: 2-D, one distinct color per flavor, a title that states the finding, an axis starting at 0. Tell me why you chose it and what I should double-check."</p><p>Now the AI has a question, an audience and rules to follow, and you have something to verify: is a line chart with three lines the right pick for "when do things peak"? (It is.)</p>',
                    ar: '<p><strong>الطلب:</strong> "يريد صاحب الكشك معرفة متى تبلغ كل نكهة ذروتها ليخطط المخزون. بياناتي في Excel: الأشهر في A2:A13، والوحدات الشهرية للفراولة والتوت الأزرق والخوخ في B إلى D. اقترح نوع رسم واحدًا وأعطني خطوات Excel. القيود: ثنائي الأبعاد، لون مميز لكل نكهة، عنوان يذكر النتيجة، محور يبدأ من 0. أخبرني لماذا اخترته وما الذي يجب أن أراجعه."</p><p>الآن لدى الذكاء الاصطناعي سؤال وجمهور وقواعد، ولديك ما تتحقق منه: هل الرسم الخطي بثلاثة خطوط هو الاختيار الصحيح لـ"متى تبلغ الأشياء ذروتها"؟ (نعم.)</p>',
                    fa: '<p><strong>درخواست:</strong> «صاحب غرفه می‌خواهد بداند هر طعم کِی به اوج می‌رسد تا موجودی را برنامه‌ریزی کند. داده‌هایم در Excel است: ماه‌ها در A2:A13 و واحدهای ماهانهٔ توت‌فرنگی، بلوبری و هلو در B تا D. فقط یک نوع نمودار پیشنهاد بده و مراحل Excel را بگو. محدودیت‌ها: دوبعدی، یک رنگ متمایز برای هر طعم، عنوانی که یافته را بگوید، محوری که از ۰ شروع شود. بگو چرا آن را انتخاب کردی و چه چیزی را باید دوباره بررسی کنم.»</p><p>حالا هوش مصنوعی یک سؤال، یک مخاطب و قاعده‌هایی برای پیروی دارد و تو چیزی برای تأیید داری: آیا نمودار خطی با سه خط انتخاب درست برای «کِی چیزها به اوج می‌رسند» است؟ (بله.)</p>',
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'box',
          variant: 'mistake',
          label: { en: 'Common mistake', ar: 'خطأ شائع', fa: 'اشتباه رایج' },
          html: {
            en: '<p>Accepting a chart because it looks professional. <strong>Verify it</strong> against Section 2\'s question table (is this chart type right for the question?) and Section 10\'s list (axis, 3-D, range) before it reaches anyone else.</p>',
            ar: '<p>قبول رسم لأنه يبدو احترافيًا. <strong>تحقق منه</strong> مقابل جدول أسئلة القسم 2 (هل نوع الرسم مناسب للسؤال؟) وقائمة القسم 10 (المحور، ثلاثي الأبعاد، النطاق) قبل أن يصل إلى أي شخص آخر.</p>',
            fa: '<p>پذیرفتن نمودار چون حرفه‌ای به‌نظر می‌رسد. پیش از آنکه به دست کسی برسد، <strong>آن را تأیید کن</strong> با جدول سؤال‌های بخش ۲ (آیا نوع نمودار برای سؤال درست است؟) و فهرست بخش ۱۰ (محور، سه‌بعدی، بازه).</p>',
          },
        },
        { type: 'exercise', questionId: 'w03-q010' },
      ],
    },
    {
      id: 'worked-example',
      navLabel: { en: 'Worked example', ar: 'مثال تطبيقي', fa: 'مثال حل‌شده' },
      sectionLabel: { en: 'Section 12', ar: 'القسم ١٢', fa: 'بخش ۱۲' },
      timeEst: { en: '7 min', ar: '٧ دقائق', fa: '۷ دقیقه' },
      headingHtml: {
        en: '<h2>Worked example: four questions from the stand owner</h2><p class="standfirst">Section 1 started with one sheet and no picture. Here is the full set of charts the owner actually needs, each chosen by its question.</p>',
        ar: '<h2>مثال تطبيقي: أربعة أسئلة من صاحب الكشك</h2><p class="standfirst">بدأ القسم 1 بورقة واحدة وبلا صورة. إليك المجموعة الكاملة من الرسوم التي يحتاجها صاحب الكشك فعلًا، كل منها مختار بحسب سؤاله.</p>',
        fa: '<h2>مثال حل‌شده: چهار سؤال از صاحب غرفه</h2><p class="standfirst">بخش ۱ با یک صفحه و بدون تصویر شروع شد. این مجموعهٔ کامل نمودارهایی است که صاحب غرفه واقعاً لازم دارد، هر کدام با سؤالش انتخاب شده.</p>',
      },
      blocks: [
        {
          type: 'table',
          headers: [
            { en: 'Owner\'s question', ar: 'سؤال صاحب الكشك', fa: 'سؤال صاحب غرفه' },
            { en: 'Chart', ar: 'الرسم', fa: 'نمودار' },
            { en: 'What it shows', ar: 'ماذا يُظهر', fa: 'چه چیزی نشان می‌دهد' },
          ],
          rows: [
            [
              { en: 'How much of 2024 was each flavor?', ar: 'كم شكّلت كل نكهة من 2024؟', fa: 'هر طعم چقدر از ۲۰۲۴ بود؟' },
              { en: '<strong>Pie</strong> (or sorted bar)', ar: '<strong>دائري</strong> (أو أعمدة مرتبة)', fa: '<strong>دایره‌ای</strong> (یا میلهٔ مرتب)' },
              { en: 'Strawberry 39%, Blueberry 33%, Peach 28%: no flavor dominates', ar: 'الفراولة 39%، التوت الأزرق 33%، الخوخ 28%: لا نكهة مهيمنة', fa: 'توت‌فرنگی ۳۹٪، بلوبری ۳۳٪، هلو ۲۸٪: هیچ طعمی غالب نیست' },
            ],
            [
              { en: 'When does each flavor peak?', ar: 'متى تبلغ كل نكهة ذروتها؟', fa: 'هر طعم کِی به اوج می‌رسد؟' },
              { en: '<strong>Line</strong>, one line per flavor', ar: '<strong>خطي</strong>، خط لكل نكهة', fa: '<strong>خطی</strong>، یک خط برای هر طعم' },
              { en: 'Strawberry in June, Blueberry in July, Peach in August', ar: 'الفراولة في يونيو، التوت الأزرق في يوليو، الخوخ في أغسطس', fa: 'توت‌فرنگی در ژوئن، بلوبری در ژوئیه، هلو در اوت' },
            ],
            [
              { en: 'Do Strawberry and Blueberry sell in the same months?', ar: 'هل تُباع الفراولة والتوت الأزرق في الأشهر نفسها؟', fa: 'آیا توت‌فرنگی و بلوبری در ماه‌های یکسان فروش می‌روند؟' },
              { en: '<strong>Scatter</strong>', ar: '<strong>انتشار</strong>', fa: '<strong>پراکندگی</strong>' },
              { en: 'Yes, correlation about 0.85, with the season as the likely common driver', ar: 'نعم، ارتباط نحو 0.85، والموسم هو المحرّك المشترك المرجّح', fa: 'بله، همبستگی حدود ۰٫۸۵، با فصل به‌عنوان محرک مشترک محتمل' },
            ],
            [
              { en: 'Why did sales fall after August?', ar: 'لماذا انخفضت المبيعات بعد أغسطس؟', fa: 'چرا فروش بعد از اوت افت کرد؟' },
              { en: '<strong>Waterfall</strong> of monthly change', ar: '<strong>شلال</strong> للتغيّر الشهري', fa: '<strong>آبشاری</strong> تغییر ماهانه' },
              { en: 'Sep −34, Oct −30, Nov −19: 108 units in August became 25 in November', ar: 'سبتمبر −34، أكتوبر −30، نوفمبر −19: 108 وحدة في أغسطس أصبحت 25 في نوفمبر', fa: 'سپتامبر ‎−۳۴، اکتبر ‎−۳۰، نوامبر ‎−۱۹: ۱۰۸ واحد در اوت در نوامبر به ۲۵ رسید' },
            ],
          ],
        },
        {
          type: 'box',
          variant: 'keypoint',
          label: { en: 'The recommendation', ar: 'التوصية', fa: 'توصیه' },
          html: {
            en: '<p>Lead with the line chart: its title says "Peach overtakes Strawberry in August: plan stock for late summer". Support it with the pie for the big picture and the waterfall for the autumn drop, and keep the scatter in the appendix, since it explains a pattern rather than driving a decision. Four questions, four different charts, and every axis starts at zero.</p>',
            ar: '<p>ابدأ بالرسم الخطي: عنوانه "الخوخ يتفوق على الفراولة في أغسطس: خطّط للمخزون في أواخر الصيف". ادعمه بالدائري للصورة الكبيرة وبالشلال لهبوط الخريف، وأبقِ الانتشار في الملحق لأنه يفسّر نمطًا ولا يقود قرارًا. أربعة أسئلة، أربعة رسوم مختلفة، وكل محور يبدأ من الصفر.</p>',
            fa: '<p>با نمودار خطی شروع کن: عنوانش می‌گوید «هلو در اوت از توت‌فرنگی پیشی می‌گیرد: برای اواخر تابستان موجودی برنامه‌ریزی کن». آن را با دایره‌ای برای تصویر کلی و آبشاری برای افت پاییز پشتیبانی کن و پراکندگی را در پیوست نگه دار، چون الگویی را توضیح می‌دهد و تصمیمی را پیش نمی‌برد. چهار سؤال، چهار نمودار متفاوت و هر محور از صفر شروع می‌شود.</p>',
          },
        },
        { type: 'exercise', questionId: 'w03-q011' },
      ],
    },
    {
      id: 'common-mistakes',
      navLabel: { en: 'Common mistakes', ar: 'أخطاء شائعة', fa: 'اشتباهات رایج' },
      sectionLabel: { en: 'Section 13', ar: 'القسم ١٣', fa: 'بخش ۱۳' },
      headingHtml: {
        en: '<h2>Common mistakes, gathered in one place</h2><p class="standfirst">Everything this page warned about, as a single reference.</p>',
        ar: '<h2>الأخطاء الشائعة، مجمّعة في مكان واحد</h2><p class="standfirst">كل ما حذّرت منه هذه الصفحة، كمرجع واحد.</p>',
        fa: '<h2>اشتباهات رایج، در یک‌جا گردآوری شده</h2><p class="standfirst">هر چیزی که این صفحه دربارهٔ آن هشدار داد.</p>',
      },
      blocks: [
        {
          type: 'table',
          headers: [
            { en: 'Mistake', ar: 'الخطأ', fa: 'اشتباه' },
            { en: 'Why it misleads', ar: 'لماذا يضلّل', fa: 'چرا گمراه می‌کند' },
            { en: 'Fix', ar: 'الحل', fa: 'راه‌حل' },
          ],
          rows: [
            [
              { en: '<strong>Picking the chart before the question</strong>', ar: '<strong>اختيار الرسم قبل السؤال</strong>', fa: '<strong>انتخاب نمودار پیش از سؤال</strong>' },
              { en: 'The shape of the chart does not match what the reader needs to compare', ar: 'شكل الرسم لا يطابق ما يحتاج القارئ إلى مقارنته', fa: 'شکل نمودار با چیزی که خواننده باید مقایسه کند نمی‌خواند' },
              { en: 'Name the question (compare, trend, share, relationship, contribution) first', ar: 'سمِّ السؤال أولًا (مقارنة، اتجاه، حصة، علاقة، مساهمة)', fa: 'اول سؤال را نام ببر (مقایسه، روند، سهم، رابطه، مشارکت)' },
            ],
            [
              { en: '<strong>Truncated bar axis</strong>', ar: '<strong>محور أعمدة مقتطع</strong>', fa: '<strong>محور میله‌ای بریده</strong>' },
              { en: 'Bar length stops matching the value; small gaps look huge', ar: 'لا يعود طول العمود يطابق القيمة؛ تبدو الفجوات الصغيرة ضخمة', fa: 'طول میله دیگر با مقدار نمی‌خواند؛ فاصله‌های کوچک بزرگ دیده می‌شوند' },
              { en: 'Start at 0', ar: 'ابدأ من 0', fa: 'از ۰ شروع کن' },
            ],
            [
              { en: '<strong>3-D charts</strong>', ar: '<strong>رسوم ثلاثية الأبعاد</strong>', fa: '<strong>نمودارهای سه‌بعدی</strong>' },
              { en: 'Perspective distorts the sizes being compared', ar: 'المنظور يشوّه الأحجام المقارَنة', fa: 'پرسپکتیو اندازه‌های مورد مقایسه را تحریف می‌کند' },
              { en: 'Stay 2-D', ar: 'ابقَ ثنائي الأبعاد', fa: 'دوبعدی بمان' },
            ],
            [
              { en: '<strong>Pie with many slices or for time</strong>', ar: '<strong>دائري بشرائح كثيرة أو للزمن</strong>', fa: '<strong>دایره‌ای با قطعهٔ زیاد یا برای زمان</strong>' },
              { en: 'Angles are hard to compare and time is not a whole', ar: 'الزوايا صعبة المقارنة والزمن ليس كلًّا', fa: 'زاویه‌ها سخت مقایسه می‌شوند و زمان یک کل نیست' },
              { en: 'Sorted bar or line chart', ar: 'أعمدة مرتبة أو رسم خطي', fa: 'میلهٔ مرتب یا نمودار خطی' },
            ],
            [
              { en: '<strong>Line through unordered categories</strong>', ar: '<strong>خط عبر فئات بلا ترتيب</strong>', fa: '<strong>خط از میان دسته‌های بی‌ترتیب</strong>' },
              { en: 'Implies a scale or trend that does not exist', ar: 'يوحي بمقياس أو اتجاه غير موجود', fa: 'مقیاس یا روندی را القا می‌کند که وجود ندارد' },
              { en: 'Use bars for categories', ar: 'استخدم الأعمدة للفئات', fa: 'برای دسته‌ها از میله استفاده کن' },
            ],
            [
              { en: '<strong>Reading cause into a scatter plot</strong>', ar: '<strong>قراءة سبب في مخطط انتشار</strong>', fa: '<strong>خواندن علت از نمودار پراکندگی</strong>' },
              { en: 'Two things can rise together because a third thing (the season) drives both', ar: 'قد يرتفع شيئان معًا لأن شيئًا ثالثًا (الموسم) يقودهما', fa: 'دو چیز می‌توانند با هم بالا بروند چون چیز سومی (فصل) هر دو را می‌راند' },
              { en: 'Say "moves with", not "causes", until you have tested the cause', ar: 'قل "يتحرك مع" لا "يسبب" حتى تختبر السبب', fa: 'تا وقتی علت را آزمون نکرده‌ای بگو «همراه با حرکت می‌کند»، نه «باعث می‌شود»' },
            ],
            [
              { en: '<strong>Topic title, no takeaway</strong>', ar: '<strong>عنوان موضوعي بلا خلاصة</strong>', fa: '<strong>عنوان موضوعی، بدون نتیجه</strong>' },
              { en: 'The reader has to find the finding themselves', ar: 'على القارئ أن يجد النتيجة بنفسه', fa: 'خواننده باید خودش یافته را پیدا کند' },
              { en: 'Write the finding as the title', ar: 'اكتب النتيجة عنوانًا', fa: 'یافته را به‌عنوان عنوان بنویس' },
            ],
            [
              { en: '<strong>Power BI: months in alphabetical order</strong>', ar: '<strong>Power BI: الأشهر بترتيب أبجدي</strong>', fa: '<strong>Power BI: ماه‌ها به ترتیب الفبا</strong>' },
              { en: 'A text field sorts A to Z, so April comes before January', ar: 'الحقل النصي يُرتَّب من A إلى Z، فيأتي April قبل January', fa: 'فیلد متنی از A تا Z مرتب می‌شود، پس April پیش از January می‌آید' },
              { en: 'Column tools › Sort by column, using a MonthNo column', ar: 'Column tools › Sort by column باستخدام عمود MonthNo', fa: 'Column tools › Sort by column با ستون MonthNo' },
            ],
            [
              { en: '<strong>Power BI: a scatter with one dot, a pie from the wrong data shape</strong>', ar: '<strong>Power BI: انتشار بنقطة واحدة، ودائري من شكل بيانات خاطئ</strong>', fa: '<strong>Power BI: پراکندگی با یک نقطه، نمودار دایره‌ای از شکل نادرست داده</strong>' },
              { en: 'A scatter with no Values field adds every month into one dot; a pie is built from one category field plus one value, so three separate columns need reshaping first', ar: 'الانتشار بلا حقل Values يجمع كل الأشهر في نقطة واحدة؛ والدائري يحتاج حقل فئة واحدًا لا ثلاثة أعمدة', fa: 'پراکندگی بدون فیلد Values همهٔ ماه‌ها را در یک نقطه جمع می‌کند؛ نمودار دایره‌ای یک فیلد دسته می‌خواهد، نه سه ستون' },
              { en: 'Put Month in Values; reshape flavors to one row each (Flavor, Units)', ar: 'ضع Month في Values؛ أعد تشكيل النكهات بصف لكل نكهة (Flavor وUnits)', fa: 'Month را در Values بگذار؛ طعم‌ها را به یک ردیف برای هر کدام (Flavor، Units) تغییر شکل بده' },
            ],
            [
              { en: '<strong>Python: a chart with no labels or a stray axis range</strong>', ar: '<strong>Python: رسم بلا عناوين أو بنطاق محور شارد</strong>', fa: '<strong>Python: نمودار بدون برچسب یا با بازهٔ محور نامناسب</strong>' },
              { en: 'The default chart has no title and a range chosen for you, and a truncated bar axis is one <code>set_ylim</code> away', ar: 'الرسم الافتراضي بلا عنوان ونطاق يُختار عنك، ومحور الأعمدة المقتطع على بُعد <code>set_ylim</code> واحدة', fa: 'نمودار پیش‌فرض عنوان ندارد و بازه‌ای برایت انتخاب می‌شود، و محور بریدهٔ میله‌ای فقط یک <code>set_ylim</code> فاصله دارد' },
              { en: 'Always set a title, axis labels and <code>set_ylim(0, …)</code> on bar charts', ar: 'اضبط دائمًا العنوان وتسميات المحاور و<code>set_ylim(0, …)</code> في رسوم الأعمدة', fa: 'همیشه عنوان، برچسب محورها و <code>set_ylim(0, …)</code> را در نمودارهای میله‌ای تنظیم کن' },
            ],
            [
              { en: '<strong>Trusting an AI-made chart as-is</strong>', ar: '<strong>الثقة برسم صنعه ذكاء اصطناعي كما هو</strong>', fa: '<strong>اعتماد بر نمودار ساختهٔ هوش مصنوعی همان‌طور که هست</strong>' },
              { en: 'Polished does not mean right for the question', ar: 'الأنيق لا يعني الصحيح للسؤال', fa: 'صیقلی بودن به معنای درست بودن برای سؤال نیست' },
              { en: 'Check chart type, axis and range against this page', ar: 'راجع نوع الرسم والمحور والنطاق مقابل هذه الصفحة', fa: 'نوع نمودار، محور و بازه را با این صفحه بسنج' },
            ],
          ],
        },
      ],
    },
    {
      id: 'homework',
      navLabel: { en: 'Homework', ar: 'الواجب', fa: 'تکلیف' },
      sectionLabel: { en: 'Section 14', ar: 'القسم ١٤', fa: 'بخش ۱۴' },
      headingHtml: {
        en: '<h2>Homework: a one-page chart brief for the stand owner</h2><p class="standfirst">You have the monthly log from Section 1. Build three charts in Excel, rebuild one of them in Python or Power BI, and write a short brief around them in your own words. Answer the parts in order.</p>',
        ar: '<h2>الواجب: موجز رسوم من صفحة واحدة لصاحب الكشك</h2><p class="standfirst">لديك السجل الشهري من القسم 1. ابنِ ثلاثة رسوم في Excel، وأعد بناء أحدها في Python أو Power BI، واكتب موجزًا قصيرًا حولها بكلماتك. أجب عن الأجزاء بالترتيب.</p>',
        fa: '<h2>تکلیف: یک گزارش نموداری یک‌صفحه‌ای برای صاحب غرفه</h2><p class="standfirst">گزارش ماهانهٔ بخش ۱ را داری. سه نمودار در Excel بساز، یکی از آن‌ها را در Python یا Power BI دوباره بساز و با کلمات خودت یک گزارش کوتاه دورشان بنویس. بخش‌ها را به ترتیب پاسخ بده.</p>',
      },
      blocks: [
        {
          type: 'box',
          variant: 'keypoint',
          label: {
            en: 'Build your brief, part by part, in order',
            ar: 'ابنِ موجزك، جزءًا تلو الآخر، بالترتيب',
            fa: 'گزارشت را بخش‌به‌بخش، به ترتیب بساز',
          },
          html: {
            en: '<ol><li><strong>The question</strong> — In 2–3 sentences, state the one decision the owner has to make and which of the five chart questions it comes down to.</li><li><strong>A trend chart</strong> — Build a line chart of monthly units by flavor. Give it a takeaway title, axis titles, and a legend at the top. Paste a screenshot.</li><li><strong>A comparison or share chart</strong> — Build a sorted bar chart (or a pie with percentages) of yearly totals per flavor. Say why you picked bar or pie.</li><li><strong>A deliberately bad chart, and its fix</strong> — Make a truncated-axis or 3-D version of one chart, screenshot it, then rebuild it honestly. Name the trick and what it exaggerates.</li><li><strong>A second tool</strong> — Rebuild one of your three charts in Python (Colab) or Power BI. Add a screenshot, and note one thing that was easier and one that was harder than in Excel.</li><li><strong>Working with AI</strong> — Ask an AI assistant to recommend a chart for one of the owner\'s questions. Paste your prompt and what it returned, and say what you checked or changed.</li><li><strong>The recommendation</strong> — In 3–4 sentences, tell the owner what to do next month, pointing at the numbers on your charts.</li></ol>',
            ar: '<ol><li><strong>السؤال</strong> — في 2–3 جمل، اذكر القرار الوحيد الذي على صاحب الكشك اتخاذه وأي من أسئلة الرسم الخمسة يرجع إليه.</li><li><strong>رسم اتجاه</strong> — ابنِ رسمًا خطيًا للوحدات الشهرية حسب النكهة. أعطه عنوان خلاصة وعناوين محاور ومفتاحًا في الأعلى. الصق لقطة شاشة.</li><li><strong>رسم مقارنة أو حصة</strong> — ابنِ رسم أعمدة مرتبًا (أو دائريًا بالنسب) للإجماليات السنوية لكل نكهة. اذكر لماذا اخترت الأعمدة أو الدائري.</li><li><strong>رسم سيئ عمدًا، وإصلاحه</strong> — اصنع نسخة بمحور مقتطع أو ثلاثية الأبعاد من أحد الرسوم، والتقط لها شاشة، ثم أعد بناءه بأمانة. سمِّ الحيلة وما تضخّمه.</li><li><strong>أداة ثانية</strong> — أعد بناء أحد رسومك الثلاثة في Python (Colab) أو Power BI. أضف لقطة شاشة، واذكر شيئًا كان أسهل وآخر كان أصعب مما في Excel.</li><li><strong>العمل مع الذكاء الاصطناعي</strong> — اطلب من مساعد ذكاء اصطناعي أن يوصي برسم لأحد أسئلة صاحب الكشك. الصق طلبك وما أعاده، واذكر ما تحققت منه أو غيّرته.</li><li><strong>التوصية</strong> — في 3–4 جمل، أخبر صاحب الكشك ماذا يفعل الشهر القادم، مشيرًا إلى الأرقام في رسومك.</li></ol>',
            fa: '<ol><li><strong>سؤال</strong> — در ۲–۳ جمله، تصمیم یگانه‌ای را که صاحب غرفه باید بگیرد و اینکه به کدام یک از پنج سؤال نموداری برمی‌گردد بنویس.</li><li><strong>نمودار روند</strong> — نمودار خطی واحدهای ماهانه بر حسب طعم بساز. عنوان نتیجه‌محور، عنوان محورها و راهنما در بالا بده. تصویر صفحه را بگذار.</li><li><strong>نمودار مقایسه یا سهم</strong> — نمودار میله‌ای مرتب (یا دایره‌ای با درصد) از مجموع سالانهٔ هر طعم بساز. بگو چرا میله یا دایره‌ای را انتخاب کردی.</li><li><strong>یک نمودار عمداً بد، و اصلاحش</strong> — نسخهٔ محور بریده یا سه‌بعدی یکی از نمودارها را بساز، تصویرش را بگیر، بعد صادقانه دوباره بساز. ترفند را نام ببر و بگو چه چیزی را اغراق می‌کند.</li><li><strong>ابزار دوم</strong> — یکی از سه نمودارت را در Python (Colab) یا Power BI دوباره بساز. تصویر صفحه اضافه کن و بگو چه چیزی آسان‌تر و چه چیزی سخت‌تر از Excel بود.</li><li><strong>کار با هوش مصنوعی</strong> — از یک دستیار هوش مصنوعی بخواه برای یکی از سؤال‌های صاحب غرفه نمودار پیشنهاد کند. درخواستت و پاسخش را بگذار و بگو چه چیزی را بررسی یا تغییر دادی.</li><li><strong>توصیه</strong> — در ۳–۴ جمله به صاحب غرفه بگو ماه بعد چه کند، با اشاره به اعداد روی نمودارهایت.</li></ol>',
          },
        },
        {
          type: 'html',
          html: {
            en: '<h3>Practice and further reading</h3><ul><li><a href="https://www.wiseowl.co.uk/excel/exercises/standard/charts/" target="_blank" rel="noopener">Wise Owl: three Excel chart exercises</a> (pie, line and column)</li><li><a href="https://support.microsoft.com/en-us/office/create-a-chart-from-start-to-finish-0baf399e-dd61-4e18-8a73-b3fd5d5680c2" target="_blank" rel="noopener">Microsoft Support: Create a chart from start to finish</a></li><li><a href="https://www.datacamp.com/courses/data-visualization-in-excel" target="_blank" rel="noopener">DataCamp: Data Visualization in Excel</a>, including its "Misleading news?" exercise on spotting distorted charts</li><li><a href="https://www.storytellingwithdata.com/chart-guide" target="_blank" rel="noopener">Storytelling with Data: guide to charts and graphs</a></li><li>Python: <a href="https://pandas.pydata.org/docs/user_guide/visualization.html" target="_blank" rel="noopener">pandas chart visualization guide</a>, <a href="https://matplotlib.org/stable/users/explain/quick_start.html" target="_blank" rel="noopener">matplotlib quick start</a> and <a href="https://colab.research.google.com/notebooks/basic_features_overview.ipynb" target="_blank" rel="noopener">an overview of Google Colab</a></li><li>Power BI: <a href="https://learn.microsoft.com/en-us/power-bi/fundamentals/desktop-getting-started" target="_blank" rel="noopener">Get started with Power BI Desktop</a>, <a href="https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-waterfall-charts" target="_blank" rel="noopener">waterfall charts</a> and <a href="https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-customize-x-axis-and-y-axis" target="_blank" rel="noopener">customizing axes</a> (Microsoft Learn)</li></ul>',
            ar: '<h3>تدرّب واقرأ المزيد</h3><ul><li><a href="https://www.wiseowl.co.uk/excel/exercises/standard/charts/" target="_blank" rel="noopener">Wise Owl: ثلاثة تمارين رسوم في Excel</a> (دائري وخطي وأعمدة)</li><li><a href="https://support.microsoft.com/en-us/office/create-a-chart-from-start-to-finish-0baf399e-dd61-4e18-8a73-b3fd5d5680c2" target="_blank" rel="noopener">دعم Microsoft: إنشاء رسم من البداية إلى النهاية</a></li><li><a href="https://www.datacamp.com/courses/data-visualization-in-excel" target="_blank" rel="noopener">DataCamp: Data Visualization in Excel</a>، ومنها تمرين "Misleading news?" عن اكتشاف الرسوم المشوَّهة</li><li><a href="https://www.storytellingwithdata.com/chart-guide" target="_blank" rel="noopener">Storytelling with Data: دليل الرسوم البيانية</a></li><li>Python: <a href="https://pandas.pydata.org/docs/user_guide/visualization.html" target="_blank" rel="noopener">دليل الرسوم في pandas</a> و<a href="https://matplotlib.org/stable/users/explain/quick_start.html" target="_blank" rel="noopener">البدء السريع مع matplotlib</a> و<a href="https://colab.research.google.com/notebooks/basic_features_overview.ipynb" target="_blank" rel="noopener">نظرة عامة على Google Colab</a></li><li>Power BI: <a href="https://learn.microsoft.com/en-us/power-bi/fundamentals/desktop-getting-started" target="_blank" rel="noopener">البدء مع Power BI Desktop</a> و<a href="https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-waterfall-charts" target="_blank" rel="noopener">مخططات الشلال</a> و<a href="https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-customize-x-axis-and-y-axis" target="_blank" rel="noopener">تخصيص المحاور</a> (Microsoft Learn)</li></ul>',
            fa: '<h3>تمرین و مطالعهٔ بیشتر</h3><ul><li><a href="https://www.wiseowl.co.uk/excel/exercises/standard/charts/" target="_blank" rel="noopener">Wise Owl: سه تمرین نمودار در Excel</a> (دایره‌ای، خطی و ستونی)</li><li><a href="https://support.microsoft.com/en-us/office/create-a-chart-from-start-to-finish-0baf399e-dd61-4e18-8a73-b3fd5d5680c2" target="_blank" rel="noopener">پشتیبانی Microsoft: ساخت نمودار از ابتدا تا انتها</a></li><li><a href="https://www.datacamp.com/courses/data-visualization-in-excel" target="_blank" rel="noopener">DataCamp: Data Visualization in Excel</a>، از جمله تمرین «Misleading news?» دربارهٔ تشخیص نمودارهای تحریف‌شده</li><li><a href="https://www.storytellingwithdata.com/chart-guide" target="_blank" rel="noopener">Storytelling with Data: راهنمای نمودارها</a></li><li>Python: <a href="https://pandas.pydata.org/docs/user_guide/visualization.html" target="_blank" rel="noopener">راهنمای نمودار در pandas</a>، <a href="https://matplotlib.org/stable/users/explain/quick_start.html" target="_blank" rel="noopener">شروع سریع matplotlib</a> و <a href="https://colab.research.google.com/notebooks/basic_features_overview.ipynb" target="_blank" rel="noopener">مروری بر Google Colab</a></li><li>Power BI: <a href="https://learn.microsoft.com/en-us/power-bi/fundamentals/desktop-getting-started" target="_blank" rel="noopener">شروع کار با Power BI Desktop</a>، <a href="https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-waterfall-charts" target="_blank" rel="noopener">نمودارهای آبشاری</a> و <a href="https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualization-customize-x-axis-and-y-axis" target="_blank" rel="noopener">سفارشی‌سازی محورها</a> (Microsoft Learn)</li></ul>',
          },
        },
      ],
    },
    {
      id: 'before-week-4',
      navLabel: { en: 'Before Week 4', ar: 'قبل الأسبوع 4', fa: 'پیش از هفته ۴' },
      sectionLabel: { en: 'Section 15', ar: 'القسم ١٥', fa: 'بخش ۱۵' },
      headingHtml: {
        en: '<h2>Before Week 4</h2><p>You can now choose, build and defend a chart. Every chart this week started from a clean sheet, which real data rarely is. Week 4 turns to Data Preparation: understanding, cleaning and transforming messy data so the numbers behind your charts can be trusted in the first place.</p>',
        ar: '<h2>قبل الأسبوع 4</h2><p>أصبحت قادرًا على اختيار رسم وبنائه والدفاع عنه. بدأ كل رسم هذا الأسبوع من ورقة نظيفة، وهو ما ندر في البيانات الحقيقية. ينتقل الأسبوع 4 إلى إعداد البيانات: فهم البيانات الفوضوية وتنظيفها وتحويلها ليمكن الوثوق بالأرقام خلف رسومك أصلًا.</p>',
        fa: '<h2>پیش از هفته ۴</h2><p>حالا می‌توانی نموداری را انتخاب کنی، بسازی و از آن دفاع کنی. هر نمودار این هفته از یک صفحهٔ تمیز شروع شد، که داده‌های واقعی به‌ندرت چنین‌اند. هفتهٔ ۴ به آماده‌سازی داده می‌پردازد: فهمیدن، پاک‌سازی و تبدیل داده‌های به‌هم‌ریخته تا اعداد پشت نمودارهایت از ابتدا قابل اعتماد باشند.</p>',
      },
      blocks: [],
    },
  ],
}
