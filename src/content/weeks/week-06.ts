// Authored for the React app from ../../../../course/ba-source-materials/ba2-week-06.md (the
// "Week 6: Linear Regression" deck). The static site has no week-06 page, question bank or i18n strings.
// Departures from the deck, on purpose:
//  - The deck's Direct Marketing sheet and diamond assignment only exist as links and screenshots, so the
//    running example is the jam stand again: Week 3's 2024 monthly log plus the month's average temperature
//    and its real number of market Saturdays. The deck's own results are quoted in Sections 5 and 7.
//  - Every number here was computed by least squares before writing (simple: jars = -6.57 + 4.09 × temp,
//    R² 0.950; with market_days, adjusted R² falls to 0.939). The figures are drawn from those numbers.
//  - Hypothesis tests come in Week 7, so p-values are read only as "below 0.05 or not" here.
// Revised to use the original deck's figures (public/figures/week-06/deck-NN-*.png, cropped from the PDF), its
// Direct Marketing and diamond examples, and plain-words explanations, analogies and recaps; those extra blocks and
// the deck mistakes corrected on purpose are documented in week06Extra.ts.
// Python snippets live in `py` and are exported to public/notebooks/week-06-linear-regression.ipynb
// (regenerate it if they change). ar/fa are draft translations awaiting native review. Code stays English.
import type { Block, Question, Week } from '../types'
import { L } from './homework/shared'
import { week06Homework } from './homework/week-06'
import * as extra from './week06Extra'

const t = L
const notebookUrl =
  'https://colab.research.google.com/github/PA-WiT/BA2/blob/main/public/notebooks/week-06-linear-regression.ipynb'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const temp = [4, 6, 10, 14, 18, 23, 27, 26, 21, 15, 9, 5]
const marketDays = [4, 4, 5, 4, 4, 5, 4, 5, 4, 4, 5, 4]
const jars = [16, 19, 27, 42, 66, 92, 108, 108, 74, 44, 25, 28]
const predicted = [9.8, 18.0, 34.3, 50.7, 67.0, 87.5, 103.8, 99.7, 79.3, 54.8, 30.2, 13.9]
const residual = [6.2, 1.0, -7.3, -8.7, -1.0, 4.5, 4.2, 8.3, -5.3, -10.8, -5.2, 14.1]

const cell = (v: string | number) => ({ en: String(v) })
const fmt = (v: number) => (v > 0 ? `+${v.toFixed(1)}` : v.toFixed(1))

const py = {
  setup: `import pandas as pd
import matplotlib.pyplot as plt
import statsmodels.formula.api as smf

df = pd.DataFrame({
    "month":       [${months.map((m) => `"${m}"`).join(', ')}],
    "avg_temp_c":  [${temp.join(', ')}],
    "market_days": [${marketDays.join(', ')}],
    "jars":        [${jars.join(', ')}],
})
df`,
  simple: `m1 = smf.ols("jars ~ avg_temp_c", data=df).fit()
print(m1.summary())            # the same table Excel's Regression tool prints
print(m1.params.round(2))      # Intercept -6.57, avg_temp_c 4.09
print(round(m1.rsquared, 3))   # 0.95`,
  plot: `ax = df.plot.scatter(x="avg_temp_c", y="jars", color="#0E6F7E", figsize=(6, 4))
line = df.sort_values("avg_temp_c")
ax.plot(line["avg_temp_c"], m1.predict(line), color="#A8322A")
ax.set_xlabel("Average temperature (°C)")
ax.set_ylabel("Jars sold per month")
plt.show()`,
  predict: `print(m1.predict(pd.DataFrame({"avg_temp_c": [20]})).round(1))   # 75.2 jars at 20 °C`,
  residuals: `df["predicted"] = m1.fittedvalues.round(1)
df["residual"] = m1.resid.round(1)            # actual - predicted
ax = df.plot.scatter(x="avg_temp_c", y="residual", color="#0E6F7E", figsize=(6, 3))
ax.axhline(0, color="#8A93A0")
plt.show()
df[["month", "jars", "predicted", "residual"]]`,
  multiple: `m2 = smf.ols("jars ~ avg_temp_c + market_days", data=df).fit()
print(m2.params.round(2))                        # avg_temp_c 4.09, market_days 0.09
print(round(m1.rsquared_adj, 3), round(m2.rsquared_adj, 3))   # 0.945 -> 0.939: market_days doesn't help
print(m2.pvalues.round(3))                       # market_days p = 0.987`,
}

const excel = {
  toolpak: t(
    '<ol><li>Put the data in <code>A1:D13</code>: Month, avg_temp_c, market_days, jars (headers in row 1).</li><li>Turn on the add-in once: <em>File → Options → Add-ins → Manage: Excel Add-ins → Go</em>, tick <strong>Analysis ToolPak</strong>. (Mac: <em>Tools → Excel Add-ins</em>.)</li><li><em>Data → Data Analysis → Regression → OK</em>.</li><li><strong>Input Y Range:</strong> <code>D1:D13</code> (jars). <strong>Input X Range:</strong> <code>B1:B13</code> (avg_temp_c). Tick <strong>Labels</strong> because row 1 holds headers.</li><li>Choose an <strong>Output Range</strong> (e.g. <code>F1</code>) or a new worksheet, tick <strong>Residuals</strong>, <strong>Residual Plots</strong> and <strong>Line Fit Plots</strong>, then OK.</li></ol><p><strong>Quick formulas</strong> give the same numbers without the dialog: <code>=SLOPE(D2:D13,B2:B13)</code> → 4.09, <code>=INTERCEPT(D2:D13,B2:B13)</code> → -6.57, <code>=RSQ(D2:D13,B2:B13)</code> → 0.95, <code>=FORECAST.LINEAR(20,D2:D13,B2:B13)</code> → 75.2. On a scatter chart, <em>Chart Elements → Trendline → More options → Display equation and R-squared</em> draws the line.</p>',
    '<ol><li>ضع البيانات في <code>A1:D13</code>: ‏Month وavg_temp_c وmarket_days وjars (العناوين في الصف 1).</li><li>فعّل الإضافة مرة واحدة: <em>File → Options → Add-ins → Manage: Excel Add-ins → Go</em>، وحدّد <strong>Analysis ToolPak</strong>. (Mac: <em>Tools → Excel Add-ins</em>.)</li><li><em>Data → Data Analysis → Regression → OK</em>.</li><li><strong>Input Y Range:</strong> ‏<code>D1:D13</code> ‏(jars). <strong>Input X Range:</strong> ‏<code>B1:B13</code> ‏(avg_temp_c). حدّد <strong>Labels</strong> لأن الصف 1 فيه العناوين.</li><li>اختر <strong>Output Range</strong> (مثل <code>F1</code>) أو ورقة جديدة، وحدّد <strong>Residuals</strong> و<strong>Residual Plots</strong> و<strong>Line Fit Plots</strong>، ثم OK.</li></ol><p><strong>صيغ سريعة</strong> تعطي الأرقام نفسها دون النافذة: <code>=SLOPE(D2:D13,B2:B13)</code> ← 4.09، و<code>=INTERCEPT(D2:D13,B2:B13)</code> ← ‎-6.57، و<code>=RSQ(D2:D13,B2:B13)</code> ← 0.95، و<code>=FORECAST.LINEAR(20,D2:D13,B2:B13)</code> ← 75.2. وعلى مخطط انتشار، يرسم <em>Chart Elements → Trendline → More options → Display equation and R-squared</em> الخط.</p>',
    '<ol><li>داده را در <code>A1:D13</code> بگذار: Month، avg_temp_c، market_days، jars (سرستون‌ها در سطر ۱).</li><li>یک بار افزونه را روشن کن: <em>File → Options → Add-ins → Manage: Excel Add-ins → Go</em> و <strong>Analysis ToolPak</strong> را تیک بزن. (Mac: <em>Tools → Excel Add-ins</em>.)</li><li><em>Data → Data Analysis → Regression → OK</em>.</li><li><strong>Input Y Range:</strong> ‏<code>D1:D13</code> ‏(jars). <strong>Input X Range:</strong> ‏<code>B1:B13</code> ‏(avg_temp_c). چون سطر ۱ سرستون دارد <strong>Labels</strong> را تیک بزن.</li><li>یک <strong>Output Range</strong> (مثلاً <code>F1</code>) یا برگهٔ جدید انتخاب کن، <strong>Residuals</strong>، <strong>Residual Plots</strong> و <strong>Line Fit Plots</strong> را تیک بزن و OK.</li></ol><p><strong>فرمول‌های سریع</strong> همین عددها را بدون پنجره می‌دهند: <code>=SLOPE(D2:D13,B2:B13)</code> ← ۴٫۰۹، <code>=INTERCEPT(D2:D13,B2:B13)</code> ← ‎-6.57، <code>=RSQ(D2:D13,B2:B13)</code> ← ۰٫۹۵، <code>=FORECAST.LINEAR(20,D2:D13,B2:B13)</code> ← ۷۵٫۲. روی نمودار پراکندگی، <em>Chart Elements → Trendline → More options → Display equation and R-squared</em> خط را می‌کشد.</p>',
  ),
  multiple: t(
    '<p>Same dialog, wider X range: <strong>Input X Range</strong> <code>B1:C13</code> (avg_temp_c and market_days). Excel needs the X columns next to each other; move columns if they aren\'t.</p>',
    '<p>النافذة نفسها مع مدى X أوسع: <strong>Input X Range</strong> ‏<code>B1:C13</code> ‏(avg_temp_c وmarket_days). يحتاج Excel أن تكون أعمدة X متجاورة؛ انقل الأعمدة إن لم تكن كذلك.</p>',
    '<p>همان پنجره با بازهٔ X پهن‌تر: <strong>Input X Range</strong> ‏<code>B1:C13</code> ‏(avg_temp_c و market_days). Excel لازم دارد ستون‌های X کنار هم باشند؛ اگر نیستند جابه‌جایشان کن.</p>',
  ),
}

const powerBi = {
  simple: t(
    '<ol><li>Load the table, add a <strong>Scatter chart</strong>: X axis avg_temp_c, Y axis jars, Values / Details month.</li><li>In the <em>Analytics</em> pane (magnifying glass), turn on <strong>Trend line</strong>: it draws the least-squares line, but doesn\'t print the equation.</li><li>For the numbers, <em>Modeling → New table</em>: <code>Temp Regression = LINEST(Monthly[jars], Monthly[avg_temp_c])</code>. The table\'s columns include <code>Slope1</code> (4.09), <code>Intercept</code> (-6.57) and <code>CoefficientOfDetermination</code> (0.95).</li></ol>',
    '<ol><li>حمّل الجدول وأضف <strong>Scatter chart</strong>: المحور X ‏avg_temp_c، والمحور Y ‏jars، وValues / Details ‏month.</li><li>في جزء <em>Analytics</em> (العدسة)، فعّل <strong>Trend line</strong>: يرسم خط المربعات الصغرى، لكنه لا يطبع المعادلة.</li><li>للأرقام، <em>Modeling → New table</em>: ‏<code>Temp Regression = LINEST(Monthly[jars], Monthly[avg_temp_c])</code>. تتضمن أعمدة الجدول <code>Slope1</code> ‏(4.09) و<code>Intercept</code> ‏(‎-6.57) و<code>CoefficientOfDetermination</code> ‏(0.95).</li></ol>',
    '<ol><li>جدول را بارگذاری کن و یک <strong>Scatter chart</strong> اضافه کن: محور X ‏avg_temp_c، محور Y ‏jars، Values / Details ‏month.</li><li>در پنل <em>Analytics</em> (ذره‌بین)، <strong>Trend line</strong> را روشن کن: خط کمترین مربعات را می‌کشد، اما معادله را نمی‌نویسد.</li><li>برای عددها، <em>Modeling → New table</em>: ‏<code>Temp Regression = LINEST(Monthly[jars], Monthly[avg_temp_c])</code>. ستون‌های جدول شامل <code>Slope1</code> ‏(۴٫۰۹)، <code>Intercept</code> ‏(‎-6.57) و <code>CoefficientOfDetermination</code> ‏(۰٫۹۵) است.</li></ol>',
  ),
  multiple: t(
    '<p><code>Two Factor Regression = LINEST(Monthly[jars], Monthly[avg_temp_c], Monthly[market_days])</code> adds <code>Slope2</code> for market_days. LINEST doesn\'t return adjusted R² or p-values; use Excel or Python when you need them.</p>',
    '<p>يضيف <code>Two Factor Regression = LINEST(Monthly[jars], Monthly[avg_temp_c], Monthly[market_days])</code> العمود <code>Slope2</code> لـ market_days. لا يُرجع LINEST قيمة R² المعدّل ولا قيم p؛ استخدم Excel أو Python حين تحتاجها.</p>',
    '<p><code>Two Factor Regression = LINEST(Monthly[jars], Monthly[avg_temp_c], Monthly[market_days])</code> ستون <code>Slope2</code> را برای market_days اضافه می‌کند. LINEST نه R² تعدیل‌شده می‌دهد نه مقدار p؛ وقتی لازمشان داری از Excel یا Python استفاده کن.</p>',
  ),
}

const tools = (ex: Block[], pyCode: string[], pbi: Block[]): Block => ({
  type: 'tabs',
  tabs: [
    { label: t('Excel', 'Excel', 'Excel'), blocks: ex },
    { label: t('Python (Colab)', 'Python ‏(Colab)', 'Python ‏(Colab)'), blocks: pyCode.map((code) => ({ type: 'code', code })) },
    { label: t('Power BI', 'Power BI', 'Power BI'), blocks: pbi },
  ],
})

const questions: Question[] = [
  {
    id: 'w06-q001',
    weekId: 'week-06',
    topic: 'supervised-learning',
    answer: 1,
    prompt: t(
      'A bank wants to predict whether a transaction is fraudulent (yes or no) from past labelled transactions. Which kind of problem is this?',
      'يريد بنك التنبؤ بما إذا كانت معاملة احتيالية (نعم أو لا) من معاملات سابقة موسومة. ما نوع هذه المشكلة؟',
      'یک بانک می‌خواهد از روی تراکنش‌های برچسب‌خوردهٔ قبلی پیش‌بینی کند که یک تراکنش تقلبی است یا نه (بله یا نه). این چه نوع مسئله‌ای است؟',
    ),
    options: [
      t('Unsupervised learning', 'تعلّم غير موجّه', 'یادگیری بدون نظارت'),
      t('Supervised classification', 'تصنيف موجّه', 'دسته‌بندی با نظارت'),
      t('Supervised regression', 'انحدار موجّه', 'رگرسیون با نظارت'),
    ],
  },
  {
    id: 'w06-q002',
    weekId: 'week-06',
    topic: 'supervised-learning',
    answer: 0,
    prompt: t(
      'Which question needs regression rather than classification?',
      'أي سؤال يحتاج إلى انحدار لا إلى تصنيف؟',
      'کدام سؤال به رگرسیون نیاز دارد، نه دسته‌بندی؟',
    ),
    options: [
      t('How many jars will the stand sell next month?', 'كم برطمانًا سيبيع الكشك الشهر القادم؟', 'غرفه ماه بعد چند شیشه می‌فروشد؟'),
      t('Will this customer come back: yes or no?', 'هل سيعود هذا العميل: نعم أم لا؟', 'این مشتری برمی‌گردد: بله یا نه؟'),
      t('Is this email spam?', 'هل هذه الرسالة غير مرغوب فيها؟', 'این ایمیل هرزنامه است؟'),
    ],
  },
  {
    id: 'w06-q003',
    weekId: 'week-06',
    topic: 'simple-regression',
    answer: 2,
    prompt: t(
      'In jars = -6.57 + 4.09 × avg_temp_c, what does 4.09 mean?',
      'في jars = -6.57 + 4.09 × avg_temp_c، ماذا تعني 4.09؟',
      'در jars = -6.57 + 4.09 × avg_temp_c، عدد ۴٫۰۹ یعنی چه؟',
    ),
    options: [
      t('The stand sells 4.09 jars on an average day', 'يبيع الكشك 4.09 برطمانات في يوم متوسط', 'غرفه در یک روز معمولی ۴٫۰۹ شیشه می‌فروشد'),
      t('Temperature explains 4.09% of sales', 'تفسّر الحرارة 4.09% من المبيعات', 'دما ۴٫۰۹٪ فروش را توضیح می‌دهد'),
      t('Each extra degree goes with about 4 more jars a month', 'كل درجة إضافية يقابلها نحو 4 برطمانات أكثر في الشهر', 'هر درجهٔ اضافه با حدود ۴ شیشهٔ بیشتر در ماه همراه است'),
    ],
  },
  {
    id: 'w06-q004',
    weekId: 'week-06',
    topic: 'reading-output',
    answer: 0,
    prompt: t(
      'R Square is 0.95. Which sentence is correct?',
      'قيمة R Square هي 0.95. أي جملة صحيحة؟',
      'R Square برابر ۰٫۹۵ است. کدام جمله درست است؟',
    ),
    options: [
      t('Temperature explains about 95% of the month-to-month variation in jars sold', 'تفسّر الحرارة نحو 95% من التغير الشهري في البرطمانات المباعة', 'دما حدود ۹۵٪ از تغییرات ماه‌به‌ماه شیشه‌های فروخته‌شده را توضیح می‌دهد'),
      t('95% of the predictions are exactly right', '95% من التنبؤات صحيحة تمامًا', '۹۵٪ پیش‌بینی‌ها دقیقاً درست‌اند'),
      t('Warm weather causes 95% of sales', 'يسبّب الطقس الدافئ 95% من المبيعات', 'هوای گرم ۹۵٪ فروش را ایجاد می‌کند'),
    ],
  },
  {
    id: 'w06-q005',
    weekId: 'week-06',
    topic: 'reading-output',
    answer: 1,
    prompt: t(
      'The intercept is -6.57 jars at 0 °C. What should you say about it?',
      'المقطع ‎-6.57 برطمانًا عند 0 °م. ماذا تقول عنه؟',
      'عرض از مبدأ ‎-6.57 شیشه در ۰ درجه است. دربارهٔ آن چه باید گفت؟',
    ),
    options: [
      t('The stand loses 6.57 jars in freezing months', 'يخسر الكشك 6.57 برطمانات في الأشهر المتجمدة', 'غرفه در ماه‌های یخ‌بندان ۶٫۵۷ شیشه از دست می‌دهد'),
      t('It only positions the line; no month was near 0 °C, so it has no real meaning', 'إنه يحدد موضع الخط فقط؛ لم يقترب أي شهر من 0 °م، فلا معنى حقيقيًا له', 'فقط جای خط را مشخص می‌کند؛ هیچ ماهی نزدیک ۰ درجه نبود، پس معنای واقعی ندارد'),
      t('The model is wrong and must be rerun', 'النموذج خاطئ ويجب إعادة تشغيله', 'مدل غلط است و باید دوباره اجرا شود'),
    ],
  },
  {
    id: 'w06-q006',
    weekId: 'week-06',
    topic: 'assumptions',
    answer: 2,
    prompt: t(
      'On a residual plot, the dots fan out: small errors for cold months, much bigger ones for hot months. Which assumption is in trouble?',
      'على مخطط البواقي تتسع النقاط: أخطاء صغيرة للأشهر الباردة وأكبر بكثير للحارة. أي افتراض في خطر؟',
      'روی نمودار باقی‌مانده، نقطه‌ها بادبزنی باز می‌شوند: خطای کوچک در ماه‌های سرد و خیلی بزرگ‌تر در ماه‌های گرم. کدام فرض در خطر است؟',
    ),
    options: [
      t('Independence of observations', 'استقلال المشاهدات', 'استقلال مشاهده‌ها'),
      t('Linearity', 'الخطية', 'خطی بودن'),
      t('Equal variance (homoscedasticity)', 'تساوي التباين (التجانس)', 'برابری واریانس (هم‌واریانسی)'),
    ],
  },
  {
    id: 'w06-q007',
    weekId: 'week-06',
    topic: 'multiple-regression',
    answer: 1,
    prompt: t(
      'Adding market_days leaves R Square at 0.950, but adjusted R Square falls from 0.945 to 0.939. What does that tell you?',
      'إضافة market_days تبقي R Square عند 0.950، لكن R Square المعدّل ينخفض من 0.945 إلى 0.939. ماذا يخبرك ذلك؟',
      'افزودن market_days مقدار R Square را روی ۰٫۹۵۰ نگه می‌دارد، اما R Square تعدیل‌شده از ۰٫۹۴۵ به ۰٫۹۳۹ می‌رسد. این چه می‌گوید؟',
    ),
    options: [
      t('The two-variable model is better because it has more variables', 'النموذج ذو المتغيرين أفضل لأن فيه متغيرات أكثر', 'مدل دومتغیره بهتر است چون متغیر بیشتری دارد'),
      t('market_days adds nothing once temperature is known; keep the simple model', 'لا يضيف market_days شيئًا بعد معرفة الحرارة؛ احتفظ بالنموذج البسيط', 'وقتی دما معلوم است market_days چیزی اضافه نمی‌کند؛ مدل ساده را نگه دار'),
      t('Temperature is no longer significant', 'لم تعد الحرارة دالّة', 'دما دیگر معنادار نیست'),
    ],
  },
  {
    id: 'w06-q008',
    weekId: 'week-06',
    topic: 'multiple-regression',
    answer: 0,
    prompt: t(
      'In the deck\'s direct-marketing model, Children has a coefficient of -198.69. How do you read it?',
      'في نموذج التسويق المباشر في العرض، معامل Children هو ‎-198.69. كيف تقرأه؟',
      'در مدل بازاریابی مستقیم اسلایدها، ضریب Children برابر ‎-198.69 است. چطور می‌خوانی‌اش؟',
    ),
    options: [
      t('With salary and catalogs held fixed, each extra child goes with $198.69 less spending', 'مع تثبيت الراتب والكتالوجات، يقابل كل طفل إضافي إنفاقًا أقل بـ 198.69 دولارًا', 'با ثابت ماندن حقوق و کاتالوگ‌ها، هر بچهٔ اضافه با ۱۹۸٫۶۹ دلار خرج کمتر همراه است'),
      t('Customers with children spend $198.69 in total', 'العملاء الذين لديهم أطفال ينفقون 198.69 دولارًا إجمالًا', 'مشتریان بچه‌دار در مجموع ۱۹۸٫۶۹ دلار خرج می‌کنند'),
      t('Having children causes customers to stop buying', 'إنجاب الأطفال يجعل العملاء يتوقفون عن الشراء', 'بچه‌دار شدن باعث می‌شود مشتریان خرید را متوقف کنند'),
    ],
  },
  {
    id: 'w06-q009',
    weekId: 'week-06',
    topic: 'cautions',
    answer: 2,
    prompt: t(
      'The data covers 4 °C to 27 °C. The model says a 40 °C month would sell about 157 jars. Should the owner order for that?',
      'تغطي البيانات من 4 °م إلى 27 °م. يقول النموذج إن شهرًا بحرارة 40 °م سيبيع نحو 157 برطمانًا. هل يطلب المالك على هذا الأساس؟',
      'داده از ۴ تا ۲۷ درجه را پوشش می‌دهد. مدل می‌گوید ماهی با ۴۰ درجه حدود ۱۵۷ شیشه می‌فروشد. مالک بر این اساس سفارش بدهد؟',
    ),
    options: [
      t('Yes: R² is 0.95, so the prediction is reliable', 'نعم: R² ‏0.95، فالتنبؤ موثوق', 'بله: R² برابر ۰٫۹۵ است، پس پیش‌بینی قابل اعتماد است'),
      t('Yes, and add 10% to be safe', 'نعم، وأضف 10% احتياطًا', 'بله، و ۱۰٪ هم برای اطمینان اضافه کن'),
      t('No: 40 °C is outside the data, so the line may not hold there', 'لا: 40 °م خارج نطاق البيانات، فقد لا ينطبق الخط هناك', 'نه: ۴۰ درجه بیرون از داده است، پس ممکن است خط آنجا صدق نکند'),
    ],
  },
  {
    id: 'w06-q010',
    weekId: 'week-06',
    topic: 'ai-corner',
    answer: 1,
    prompt: t(
      'An AI assistant says "Temperature causes jam sales: R² = 0.95 proves it." What is wrong with the claim?',
      'يقول مساعد ذكاء اصطناعي: "الحرارة تسبّب مبيعات المربى: R² = 0.95 يثبت ذلك." ما الخطأ في هذا الادعاء؟',
      'یک دستیار هوش مصنوعی می‌گوید «دما باعث فروش مربا می‌شود: R² = 0.95 این را ثابت می‌کند.» ایراد این ادعا چیست؟',
    ),
    options: [
      t('Nothing: a high R² proves causation', 'لا شيء: R² المرتفع يثبت السببية', 'هیچ: R² بالا علیت را ثابت می‌کند'),
      t('Regression shows the two move together, not why; summer also brings tourists and fruit season', 'الانحدار يُظهر أن المتغيرين يتحركان معًا، لا السبب؛ فالصيف يجلب السياح وموسم الفاكهة أيضًا', 'رگرسیون نشان می‌دهد این دو با هم حرکت می‌کنند، نه چرا؛ تابستان گردشگر و فصل میوه هم می‌آورد'),
      t('R² should be above 0.99 to prove causation', 'يجب أن يكون R² فوق 0.99 لإثبات السببية', 'R² باید بالای ۰٫۹۹ باشد تا علیت ثابت شود'),
    ],
  },
]

export const weekSix: Week = {
  id: 'week-06',
  originalPdf: '/originals/week-06.pdf',
  order: 6,
  cover: {
    kicker: t('Business Analytics 2 · Week 6', 'تحليلات الأعمال 2 · الأسبوع 6', 'تحلیل کسب‌وکار ۲ · هفته ۶'),
    titleHtml: t(
      '<h1>Linear Regression:<em>Drawing the Line Between Cause and Effect, Carefully</em></h1><p class="lede">So far you have described what happened. Regression lets you say how much one thing moves when another changes, and turn that into a prediction: "a 20 °C month should sell about 75 jars". This week you fit, read and check a regression in Excel, Python and Power BI.</p>',
      '<h1>الانحدار الخطي:<em>رسم الخط بين السبب والنتيجة، بحذر</em></h1><p class="lede">حتى الآن وصفت ما حدث. يتيح لك الانحدار أن تقول بكم يتحرك شيء حين يتغير آخر، وأن تحوّل ذلك إلى تنبؤ: "شهر بحرارة 20 °م يجب أن يبيع نحو 75 برطمانًا". هذا الأسبوع تطبّق انحدارًا وتقرؤه وتتحقق منه في Excel وPython وPower BI.</p>',
      '<h1>رگرسیون خطی:<em>کشیدن خط میان علت و معلول، با احتیاط</em></h1><p class="lede">تا اینجا آنچه را اتفاق افتاده توصیف کردی. رگرسیون به تو اجازه می‌دهد بگویی وقتی چیزی تغییر می‌کند چیز دیگر چقدر جابه‌جا می‌شود و آن را به پیش‌بینی تبدیل کنی: «ماهی با ۲۰ درجه باید حدود ۷۵ شیشه بفروشد». این هفته یک رگرسیون را در Excel، Python و Power BI برازش می‌کنی، می‌خوانی و بررسی می‌کنی.</p>',
    ),
    timeEstimate: t(
      '≈ 120 min · reading + Excel, Python and Power BI practice',
      '≈ ١٢٠ دقيقة · قراءة وتدريب Excel وPython وPower BI',
      '≈ ۱۲۰ دقیقه · مطالعه و تمرین Excel، Python و Power BI',
    ),
  },
  questions: [...questions, ...extra.extraQuestions],
  sections: [
    {
      id: 'welcome',
      navLabel: t('Welcome', 'ترحيب', 'خوش‌آمدید'),
      sectionLabel: t('Section 01', 'القسم ٠١', 'بخش ۰۱'),
      timeEst: t('5 min', '٥ دقائق', '۵ دقیقه'),
      headingHtml: t(
        '<h2>Welcome: from "what happened" to "what if"</h2><p class="standfirst">Week 3\'s line chart showed jam sales peaking in summer. The owner now asks a sharper question: if next month averages 20 °C, how many jars should I make? A chart can\'t answer that. A regression can.</p>',
        '<h2>ترحيب: من "ماذا حدث" إلى "ماذا لو"</h2><p class="standfirst">أظهر الرسم الخطي في الأسبوع 3 أن مبيعات المربى تبلغ ذروتها صيفًا. يسأل المالك الآن سؤالًا أدق: إن كان متوسط الشهر القادم 20 °م، كم برطمانًا أصنع؟ الرسم لا يجيب عن ذلك. الانحدار يجيب.</p>',
        '<h2>خوش‌آمدید: از «چه شد» تا «اگر… چه»</h2><p class="standfirst">نمودار خطی هفتهٔ ۳ نشان داد فروش مربا در تابستان به اوج می‌رسد. حالا مالک سؤال دقیق‌تری دارد: اگر میانگین ماه بعد ۲۰ درجه باشد، چند شیشه درست کنم؟ نمودار به این پاسخ نمی‌دهد. رگرسیون می‌دهد.</p>',
      ),
      blocks: [
        {
          type: 'objectives',
          label: t("By the end, you'll be able to", 'بنهاية هذا القسم ستكون قادرًا على', 'در پایان این بخش می‌توانی'),
          items: [
            t('Tell supervised from unsupervised learning, and regression from classification', 'التمييز بين التعلّم الموجّه وغير الموجّه، وبين الانحدار والتصنيف', 'یادگیری با نظارت را از بدون نظارت، و رگرسیون را از دسته‌بندی تشخیص بدهی'),
            t('Fit a simple linear regression in Excel, Python and Power BI', 'تطبيق انحدار خطي بسيط في Excel وPython وPower BI', 'یک رگرسیون خطی ساده را در Excel، Python و Power BI برازش کنی'),
            t('Read R², the slope, the intercept and a prediction in plain business words', 'قراءة R² والميل والمقطع والتنبؤ بكلمات عمل بسيطة', 'R²، شیب، عرض از مبدأ و یک پیش‌بینی را با زبان سادهٔ کسب‌وکار بخوانی'),
            t('Check the four assumptions with a residual plot', 'التحقق من الافتراضات الأربعة بمخطط البواقي', 'چهار فرض را با نمودار باقی‌مانده بررسی کنی'),
            t('Add variables in a multiple regression and judge them with adjusted R²', 'إضافة متغيرات في انحدار متعدد والحكم عليها بـ R² المعدّل', 'در رگرسیون چندگانه متغیر اضافه کنی و با R² تعدیل‌شده دربارهٔ آن‌ها قضاوت کنی'),
          ],
        },
        ...extra.welcomeIntro,
        {
          type: 'html',
          html: t(
            '<p>This week\'s data is Week 3\'s 2024 monthly log of total jars, with two new columns from the stand\'s notebook: the month\'s <strong>average temperature</strong> and its number of <strong>market days</strong> (Saturdays). In Excel it sits in <code>A1:D13</code>.</p>',
            '<p>بيانات هذا الأسبوع هي السجل الشهري لعام 2024 من الأسبوع 3 لإجمالي البرطمانات، مع عمودين جديدين من دفتر الكشك: <strong>متوسط حرارة</strong> الشهر وعدد <strong>أيام السوق</strong> فيه (أيام السبت). في Excel تقع في <code>A1:D13</code>.</p>',
            '<p>دادهٔ این هفته لاگ ماهانهٔ ۲۰۲۴ هفتهٔ ۳ از کل شیشه‌هاست، با دو ستون تازه از دفترچهٔ غرفه: <strong>میانگین دمای</strong> ماه و تعداد <strong>روزهای بازار</strong> آن (شنبه‌ها). در Excel در <code>A1:D13</code> قرار دارد.</p>',
          ),
        },
        {
          type: 'table',
          headers: [t('Month (A)', 'الشهر (A)', 'ماه (A)'), t('avg_temp_c (B)', 'avg_temp_c ‏(B)', 'avg_temp_c ‏(B)'), t('market_days (C)', 'market_days ‏(C)', 'market_days ‏(C)'), t('jars (D)', 'jars ‏(D)', 'jars ‏(D)')],
          rows: months.map((m, i) => [cell(m), cell(temp[i]), cell(marketDays[i]), cell(jars[i])]),
        },
        ...extra.welcomeCheat,
        { type: 'exercise', questionId: 'w06-q001' },
      ],
    },
    {
      id: 'supervised-learning',
      navLabel: t('Supervised learning', 'التعلّم الموجّه', 'یادگیری با نظارت'),
      sectionLabel: t('Section 02', 'القسم ٠٢', 'بخش ۰۲'),
      timeEst: t('6 min', '٦ دقائق', '۶ دقیقه'),
      headingHtml: t(
        '<h2>Supervised and unsupervised learning: does the data come with answers?</h2><p class="standfirst">Regression belongs to a family of methods that learn from examples. Knowing the family tells you when regression is the right tool.</p>',
        '<h2>التعلّم الموجّه وغير الموجّه: هل تأتي البيانات مع إجابات؟</h2><p class="standfirst">ينتمي الانحدار إلى عائلة طرق تتعلم من الأمثلة. معرفة العائلة تخبرك متى يكون الانحدار هو الأداة المناسبة.</p>',
        '<h2>یادگیری با نظارت و بدون نظارت: آیا داده با جواب می‌آید؟</h2><p class="standfirst">رگرسیون به خانواده‌ای از روش‌ها تعلق دارد که از مثال‌ها یاد می‌گیرند. شناختن این خانواده می‌گوید کی رگرسیون ابزار درست است.</p>',
      ),
      blocks: [
        ...extra.supervisedStart,
        {
          type: 'table',
          headers: [t('', '', ''), t('Supervised', 'موجّه', 'با نظارت'), t('Unsupervised', 'غير موجّه', 'بدون نظارت')],
          rows: [
            [t('<strong>Data</strong>', '<strong>البيانات</strong>', '<strong>داده</strong>'), t('Labelled: every row has the answer (jars sold, fraud yes/no)', 'موسومة: لكل صف إجابته (البرطمانات المباعة، احتيال نعم/لا)', 'برچسب‌دار: هر سطر جوابش را دارد (شیشه‌های فروخته‌شده، تقلب بله/نه)'), t('Unlabelled: only inputs, no answer column', 'غير موسومة: مدخلات فقط بلا عمود إجابة', 'بدون برچسب: فقط ورودی‌ها، بدون ستون جواب')],
            [t('<strong>Goal</strong>', '<strong>الهدف</strong>', '<strong>هدف</strong>'), t('Learn to predict the answer for new rows, reducing the error step by step', 'تعلّم التنبؤ بالإجابة لصفوف جديدة مع تقليل الخطأ تدريجيًا', 'یاد گرفتن پیش‌بینی جواب برای سطرهای تازه، با کم کردن قدم‌به‌قدم خطا'), t('Find structure on its own: groups, patterns, odd ones out', 'إيجاد البنية وحدها: مجموعات وأنماط وقيم شاذة', 'خودش ساختار پیدا کند: گروه‌ها، الگوها، تک‌افتاده‌ها')],
            [t('<strong>Example</strong>', '<strong>مثال</strong>', '<strong>مثال</strong>'), t('Predict next month\'s jars from temperature', 'التنبؤ ببرطمانات الشهر القادم من الحرارة', 'پیش‌بینی شیشه‌های ماه بعد از روی دما'), t('Group customers by buying habits without telling the algorithm the groups', 'تجميع العملاء حسب عادات الشراء دون إخبار الخوارزمية بالمجموعات', 'گروه‌بندی مشتریان بر اساس عادت خرید بدون گفتن گروه‌ها به الگوریتم')],
          ],
        },
        {
          type: 'html',
          html: t(
            '<h3>Two kinds of supervised learning</h3><ul><li><strong>Regression</strong>: the answer (Y, the dependent variable) is a <em>number</em>: home prices, product demand, jars sold.</li><li><strong>Classification</strong>: the answer is a <em>category</em>: fraudulent or not, benign or malignant, spam or not.</li></ul><p>The deck adds a shift in how this is done: traditional statistics started from a small, clean dataset prepared by domain experts; today analysts often start from a large dataset with many columns and limited domain knowledge, which is why Weeks 4–5 (preparing data) come before this week.</p>',
            '<h3>نوعان من التعلّم الموجّه</h3><ul><li><strong>الانحدار</strong>: الإجابة (Y، المتغير التابع) <em>رقم</em>: أسعار المنازل، الطلب على المنتج، البرطمانات المباعة.</li><li><strong>التصنيف</strong>: الإجابة <em>فئة</em>: احتيالي أم لا، حميد أم خبيث، غير مرغوب فيه أم لا.</li></ul><p>يضيف العرض تحولًا في طريقة العمل: بدأ الإحصاء التقليدي من مجموعة بيانات صغيرة ونظيفة أعدّها خبراء المجال؛ واليوم يبدأ المحللون غالبًا من مجموعة بيانات كبيرة بأعمدة كثيرة ومعرفة محدودة بالمجال، ولهذا يأتي الأسبوعان 4–5 (تحضير البيانات) قبل هذا الأسبوع.</p>',
            '<h3>دو نوع یادگیری با نظارت</h3><ul><li><strong>رگرسیون</strong>: جواب (Y، متغیر وابسته) یک <em>عدد</em> است: قیمت خانه، تقاضای محصول، شیشه‌های فروخته‌شده.</li><li><strong>دسته‌بندی</strong>: جواب یک <em>دسته</em> است: تقلبی یا نه، خوش‌خیم یا بدخیم، هرزنامه یا نه.</li></ul><p>اسلایدها یک تغییر در شیوهٔ کار را هم اضافه می‌کنند: آمار سنتی از یک مجموعه‌دادهٔ کوچک و تمیز که کارشناسان حوزه آماده کرده بودند شروع می‌کرد؛ امروز تحلیل‌گرها اغلب از یک مجموعه‌دادهٔ بزرگ با ستون‌های زیاد و دانش حوزهٔ محدود شروع می‌کنند، و به همین دلیل هفته‌های ۴ و ۵ (آماده‌سازی داده) پیش از این هفته می‌آیند.</p>',
          ),
        },
        ...extra.supervisedEnd,
        { type: 'exercise', questionId: 'w06-q002' },
      ],
    },
    {
      id: 'simple-regression',
      navLabel: t('Simple linear regression', 'الانحدار الخطي البسيط', 'رگرسیون خطی ساده'),
      sectionLabel: t('Section 03', 'القسم ٠٣', 'بخش ۰۳'),
      timeEst: t('8 min', '٨ دقائق', '۸ دقیقه'),
      headingHtml: t(
        '<h2>Simple linear regression: the straight line that fits best</h2><p class="standfirst">Simple linear regression estimates the relationship between two numeric variables: how strong it is, and what Y should be at a given X.</p>',
        '<h2>الانحدار الخطي البسيط: الخط المستقيم الأنسب</h2><p class="standfirst">يقدّر الانحدار الخطي البسيط العلاقة بين متغيرين رقميين: مدى قوتها، وما يجب أن تكون عليه Y عند قيمة معيّنة لـ X.</p>',
        '<h2>رگرسیون خطی ساده: خط راستی که بهترین برازش را دارد</h2><p class="standfirst">رگرسیون خطی ساده رابطهٔ میان دو متغیر عددی را برآورد می‌کند: چقدر قوی است و Y در یک X مشخص چقدر باید باشد.</p>',
      ),
      blocks: [
        ...extra.simpleIntro,
        { type: 'formula', eq: 'y = β₀ + β₁x + ε', note: t('the regression equation', 'معادلة الانحدار', 'معادلهٔ رگرسیون') },
        {
          type: 'html',
          html: t(
            '<p>Regression finds the β₀ and β₁ that make the total error as small as possible. Precisely, it minimizes the sum of the <em>squared</em> vertical distances from each point to the line, which is why it is called <strong>least squares</strong>.</p>',
            '<p>يجد الانحدار قيمتي β₀ وβ₁ اللتين تجعلان الخطأ الكلي أصغر ما يمكن. بدقة، يقلّل مجموع <em>مربعات</em> المسافات الرأسية من كل نقطة إلى الخط، ولهذا يسمى <strong>المربعات الصغرى</strong>.</p>',
            '<p>رگرسیون β₀ و β₁ را طوری پیدا می‌کند که خطای کل تا حد ممکن کوچک شود. دقیق‌تر، مجموع <em>مربع</em> فاصله‌های عمودی هر نقطه تا خط را کمینه می‌کند و به همین دلیل به آن <strong>کمترین مربعات</strong> می‌گویند.</p>',
          ),
        },
        ...extra.simpleFormula,
        {
          type: 'diagram',
          fig: t('Figure 5', 'الشكل 5', 'شکل ۵'),
          title: t('Jars sold per month against average temperature, 2024', 'البرطمانات المباعة شهريًا مقابل متوسط الحرارة، 2024', 'شیشه‌های فروخته‌شدهٔ ماهانه در برابر میانگین دما، ۲۰۲۴'),
          src: '/figures/week-06/diagram-01.svg',
          alt: 'Scatter plot of the 12 months: jars rise steadily with temperature, from 16 jars at 4 °C to 108 jars at 26–27 °C, with the fitted line jars = -6.57 + 4.09 × temp',
          caption: t(
            'The 12 points lie close to a straight line, so a linear model is a reasonable first try. December (5 °C, 28 jars) sits well above the line: holiday gift jars, perhaps.',
            'تقع النقاط الاثنتا عشرة قرب خط مستقيم، فالنموذج الخطي محاولة أولى معقولة. ويقع ديسمبر (5 °م، 28 برطمانًا) أعلى الخط بوضوح: ربما برطمانات هدايا العطلة.',
            '۱۲ نقطه نزدیک یک خط راست‌اند، پس مدل خطی تلاش اول معقولی است. دسامبر (۵ درجه، ۲۸ شیشه) آشکارا بالای خط است: شاید شیشه‌های هدیهٔ تعطیلات.',
          ),
        },
        {
          type: 'box',
          variant: 'analogy',
          label: t('Analogy', 'تشبيه', 'تشبیه'),
          html: t(
            '<p>Imagine stretching a straight stick across the dots and attaching each dot to it with a rubber band. The bands pull hardest on the dots furthest away, so the stick settles where the total pull is smallest. That resting place is the least-squares line.</p>',
            '<p>تخيّل أنك تمدّ عصا مستقيمة فوق النقاط وتربط كل نقطة بها بشريط مطاطي. تشدّ الأشرطة أقوى ما تكون على النقاط الأبعد، فتستقر العصا حيث يكون مجموع الشد أصغر. ذلك الموضع هو خط المربعات الصغرى.</p>',
            '<p>تصور کن یک چوب راست را روی نقطه‌ها می‌گذاری و هر نقطه را با یک کش به آن وصل می‌کنی. کش‌ها نقطه‌های دورتر را محکم‌تر می‌کشند، پس چوب جایی آرام می‌گیرد که کشش کل کمترین باشد. همان جا خط کمترین مربعات است.</p>',
          ),
        },
        ...extra.simpleEnd,
        { type: 'exercise', questionId: 'w06-q003' },
      ],
    },
    {
      id: 'follow-along',
      navLabel: t('Follow-along: fit it', 'خطوة بخطوة: طبّقه', 'گام‌به‌گام: برازشش کن'),
      sectionLabel: t('Section 04', 'القسم ٠٤', 'بخش ۰۴'),
      timeEst: t('12 min', '١٢ دقيقة', '۱۲ دقیقه'),
      headingHtml: t(
        '<h2>Follow-along: fit the regression yourself</h2><p class="standfirst">Run the same regression in each tool. Excel\'s Data Analysis ToolPak is the deck\'s method; Python and Power BI give the same line.</p>',
        '<h2>خطوة بخطوة: طبّق الانحدار بنفسك</h2><p class="standfirst">شغّل الانحدار نفسه في كل أداة. حزمة Data Analysis في Excel هي طريقة العرض؛ وPython وPower BI يعطيان الخط نفسه.</p>',
        '<h2>گام‌به‌گام: رگرسیون را خودت برازش کن</h2><p class="standfirst">همین رگرسیون را در هر ابزار اجرا کن. Data Analysis ToolPak در Excel روش اسلایدهاست؛ Python و Power BI همان خط را می‌دهند.</p>',
      ),
      blocks: [
        ...extra.followStart,
        tools([{ type: 'html', html: excel.toolpak }], [py.setup, py.simple, py.plot], [{ type: 'html', html: powerBi.simple }]),
        ...extra.followEnd,
        {
          type: 'html',
          html: t(
            `<p><strong>Prefer a ready-made file?</strong> All of this week's Python is also a notebook: <a href="${notebookUrl}" target="_blank" rel="noopener">open it in Colab</a>, then <em>Runtime → Run all</em>.</p>`,
            `<p><strong>تفضّل ملفًا جاهزًا؟</strong> كل كود Python لهذا الأسبوع متاح أيضًا كدفتر: <a href="${notebookUrl}" target="_blank" rel="noopener">افتحه في Colab</a>، ثم <em>Runtime → Run all</em>.</p>`,
            `<p><strong>فایل آماده می‌خواهی؟</strong> همهٔ کد Python این هفته به‌صورت یک دفترچه هم هست: <a href="${notebookUrl}" target="_blank" rel="noopener">آن را در Colab باز کن</a>، سپس <em>Runtime → Run all</em>.</p>`,
          ),
        },
      ],
    },
    {
      id: 'reading-output',
      navLabel: t('Reading the output', 'قراءة المخرجات', 'خواندن خروجی'),
      sectionLabel: t('Section 05', 'القسم ٠٥', 'بخش ۰۵'),
      timeEst: t('10 min', '١٠ دقائق', '۱۰ دقیقه'),
      headingHtml: t(
        '<h2>Reading the output: what does the model tell us?</h2><p class="standfirst">Excel prints three tables. You need four numbers from them: R Square, the intercept, the slope, and whether the slope is significant.</p>',
        '<h2>قراءة المخرجات: ماذا يخبرنا النموذج؟</h2><p class="standfirst">يطبع Excel ثلاثة جداول. تحتاج منها أربعة أرقام: R Square، والمقطع، والميل، وهل الميل دالّ.</p>',
        '<h2>خواندن خروجی: مدل به ما چه می‌گوید؟</h2><p class="standfirst">Excel سه جدول چاپ می‌کند. از آن‌ها چهار عدد لازم داری: R Square، عرض از مبدأ، شیب و اینکه شیب معنادار است یا نه.</p>',
      ),
      blocks: [
        ...extra.readingStart,
        {
          type: 'table',
          headers: [t('Regression statistics', 'إحصاءات الانحدار', 'آمار رگرسیون'), t('Value', 'القيمة', 'مقدار'), t('Plain words', 'بكلمات بسيطة', 'به زبان ساده')],
          rows: [
            [t('Multiple R', 'Multiple R', 'Multiple R'), t('0.975', '0.975', '0.975'), t('The correlation r between temperature and jars', 'معامل الارتباط r بين الحرارة والبرطمانات', 'همبستگی r میان دما و شیشه‌ها')],
            [t('R Square', 'R Square', 'R Square'), t('0.950', '0.950', '0.950'), t('Temperature explains about 95% of the variation in monthly jars', 'تفسّر الحرارة نحو 95% من تغير البرطمانات الشهري', 'دما حدود ۹۵٪ از تغییرات شیشه‌های ماهانه را توضیح می‌دهد')],
            [t('Adjusted R Square', 'Adjusted R Square', 'Adjusted R Square'), t('0.945', '0.945', '0.945'), t('R² with a penalty for each extra X (Section 7)', 'R² مع عقوبة لكل X إضافي (القسم 7)', 'R² با جریمه برای هر X اضافه (بخش ۷)')],
            [t('Standard Error', 'Standard Error', 'Standard Error'), t('8.04', '8.04', '8.04'), t('A typical prediction is off by about 8 jars', 'يخطئ التنبؤ النموذجي بنحو 8 برطمانات', 'یک پیش‌بینی معمولی حدود ۸ شیشه خطا دارد')],
            [t('Observations', 'Observations', 'Observations'), t('12', '12', '12'), t('One row per month', 'صف لكل شهر', 'یک سطر برای هر ماه')],
          ],
        },
        {
          type: 'table',
          headers: [t('', '', ''), t('Coefficients', 'Coefficients', 'Coefficients'), t('Standard Error', 'Standard Error', 'Standard Error'), t('t Stat', 't Stat', 't Stat'), t('P-value', 'P-value', 'P-value')],
          rows: [
            [t('Intercept', 'Intercept', 'Intercept'), t('-6.57', '-6.57', '-6.57'), t('4.97', '4.97', '4.97'), t('-1.32', '-1.32', '-1.32'), t('0.216', '0.216', '0.216')],
            [t('avg_temp_c', 'avg_temp_c', 'avg_temp_c'), t('4.09', '4.09', '4.09'), t('0.30', '0.30', '0.30'), t('13.81', '13.81', '13.81'), t('0.00000008', '0.00000008', '0.00000008')],
          ],
        },
        {
          type: 'html',
          html: t(
            '<p>Written out: <strong>jars = −6.57 + 4.09 × avg_temp_c + ε</strong>.</p><ul><li><strong>R Square (0.95):</strong> about 95% of the variability in jars sold can be explained by temperature.</li><li><strong>Slope (4.09):</strong> if the average temperature of a month is one degree higher, the stand is predicted to sell about 4 more jars.</li><li><strong>Intercept (−6.57):</strong> the predicted jars at 0 °C. No month was near 0 °C and jars can\'t be negative, so it only positions the line.</li><li><strong>Significant?</strong> The slope\'s t Stat is 13.81 and its P-value is far below 0.05, so the link is very unlikely to be chance. (Week 7 explains p-values properly; for now, "below 0.05" means "trust the slope".)</li><li><strong>Prediction:</strong> at 20 °C, −6.57 + 4.09 × 20 ≈ <strong>75 jars</strong>, give or take about 8.</li></ul>',
            '<p>مكتوبة: <strong>jars = −6.57 + 4.09 × avg_temp_c + ε</strong>.</p><ul><li><strong>R Square ‏(0.95):</strong> يمكن تفسير نحو 95% من تغير البرطمانات المباعة بالحرارة.</li><li><strong>الميل (4.09):</strong> إن كان متوسط حرارة الشهر أعلى بدرجة واحدة، يُتوقع أن يبيع الكشك نحو 4 برطمانات أكثر.</li><li><strong>المقطع (‎−6.57):</strong> البرطمانات المتوقعة عند 0 °م. لم يقترب أي شهر من 0 °م، ولا يمكن أن تكون البرطمانات سالبة، فهو يحدد موضع الخط فقط.</li><li><strong>دالّ؟</strong> قيمة t Stat للميل 13.81 وقيمة P-value أقل بكثير من 0.05، فمن المستبعد جدًا أن تكون العلاقة صدفة. (يشرح الأسبوع 7 قيم p جيدًا؛ والآن "أقل من 0.05" تعني "ثق بالميل".)</li><li><strong>التنبؤ:</strong> عند 20 °م، ‎−6.57 + 4.09 × 20 ≈ <strong>75 برطمانًا</strong>، بزيادة أو نقصان نحو 8.</li></ul>',
            '<p>به‌صورت نوشته: <strong>jars = −6.57 + 4.09 × avg_temp_c + ε</strong>.</p><ul><li><strong>R Square ‏(۰٫۹۵):</strong> حدود ۹۵٪ از تغییرپذیری شیشه‌های فروخته‌شده را می‌شود با دما توضیح داد.</li><li><strong>شیب (۴٫۰۹):</strong> اگر میانگین دمای یک ماه یک درجه بالاتر باشد، پیش‌بینی می‌شود غرفه حدود ۴ شیشه بیشتر بفروشد.</li><li><strong>عرض از مبدأ (‎−6.57):</strong> شیشه‌های پیش‌بینی‌شده در ۰ درجه. هیچ ماهی نزدیک ۰ درجه نبود و شیشه منفی نمی‌شود، پس فقط جای خط را مشخص می‌کند.</li><li><strong>معنادار؟</strong> t Stat شیب ۱۳٫۸۱ و P-value آن خیلی کمتر از ۰٫۰۵ است، پس بسیار بعید است این رابطه تصادفی باشد. (هفتهٔ ۷ مقدار p را درست توضیح می‌دهد؛ فعلاً «کمتر از ۰٫۰۵» یعنی «به شیب اعتماد کن».)</li><li><strong>پیش‌بینی:</strong> در ۲۰ درجه، ‎−6.57 + 4.09 × 20 ≈ <strong>۷۵ شیشه</strong>، با حدود ۸ شیشه بالا یا پایین.</li></ul>',
          ),
        },
        tools([{ type: 'html', html: t('<p><code>=FORECAST.LINEAR(20, D2:D13, B2:B13)</code> → 75.2</p>', '<p><code>=FORECAST.LINEAR(20, D2:D13, B2:B13)</code> ← 75.2</p>', '<p><code>=FORECAST.LINEAR(20, D2:D13, B2:B13)</code> ← ۷۵٫۲</p>') }], [py.predict], [{ type: 'html', html: t('<p>A measure: <code>Predicted 20C = -6.57 + 4.09 * 20</code>, or read <code>Slope1</code> and <code>Intercept</code> from the LINEST table.</p>', '<p>مقياس: <code>Predicted 20C = -6.57 + 4.09 * 20</code>، أو اقرأ <code>Slope1</code> و<code>Intercept</code> من جدول LINEST.</p>', '<p>یک معیار: <code>Predicted 20C = -6.57 + 4.09 * 20</code>، یا <code>Slope1</code> و <code>Intercept</code> را از جدول LINEST بخوان.</p>') }]),
        ...extra.readingEnd,
        { type: 'exercise', questionId: 'w06-q004' },
        { type: 'exercise', questionId: 'w06-q005' },
      ],
    },
    {
      id: 'assumptions',
      navLabel: t('Assumptions and residuals', 'الافتراضات والبواقي', 'فرض‌ها و باقی‌مانده‌ها'),
      sectionLabel: t('Section 06', 'القسم ٠٦', 'بخش ۰۶'),
      timeEst: t('9 min', '٩ دقائق', '۹ دقیقه'),
      headingHtml: t(
        '<h2>Assumptions: when can you trust the line?</h2><p class="standfirst">Linear regression is a parametric method: its numbers are only trustworthy if the data behaves in certain ways. The residuals, actual minus predicted, are how you check.</p>',
        '<h2>الافتراضات: متى يمكنك الوثوق بالخط؟</h2><p class="standfirst">الانحدار الخطي طريقة معلمية: أرقامه موثوقة فقط إن تصرفت البيانات بطرق معيّنة. والبواقي، أي الفعلي ناقص المتنبأ به، هي وسيلة التحقق.</p>',
        '<h2>فرض‌ها: کی می‌شود به خط اعتماد کرد؟</h2><p class="standfirst">رگرسیون خطی یک روش پارامتری است: عددهایش فقط وقتی قابل اعتمادند که داده به شکل‌های مشخصی رفتار کند. باقی‌مانده‌ها، یعنی واقعی منهای پیش‌بینی‌شده، راه بررسی‌اند.</p>',
      ),
      blocks: [
        ...extra.assumptionsStart,
        {
          type: 'table',
          headers: [t('Assumption', 'الافتراض', 'فرض'), t('Meaning', 'المعنى', 'معنا'), t('How to check', 'كيف تتحقق', 'چطور بررسی کنی'), t('Jam stand', 'كشك المربى', 'غرفهٔ مربا')],
          rows: [
            [t('<strong>Linearity</strong>', '<strong>الخطية</strong>', '<strong>خطی بودن</strong>'), t('The best-fit line is straight, not a curve', 'خط الملاءمة الأفضل مستقيم لا منحنٍ', 'خط بهترین برازش راست است، نه منحنی'), t('Scatter plot; residuals show no curve', 'مخطط الانتشار؛ والبواقي بلا انحناء', 'نمودار پراکندگی؛ باقی‌مانده‌ها منحنی نشان نمی‌دهند'), t('Mostly yes; a slight U-shape hints demand speeds up in summer', 'غالبًا نعم؛ شكل U خفيف يلمّح إلى تسارع الطلب صيفًا', 'بیشتر بله؛ یک U ملایم نشان می‌دهد تقاضا در تابستان شتاب می‌گیرد')],
            [t('<strong>Equal variance</strong> (homoscedasticity)', '<strong>تساوي التباين</strong> (التجانس)', '<strong>برابری واریانس</strong> (هم‌واریانسی)'), t('Errors are about the same size across all x', 'الأخطاء بحجم متقارب عبر كل قيم x', 'خطاها در همهٔ xها تقریباً هم‌اندازه‌اند'), t('Residual plot: no fan or funnel', 'مخطط البواقي: بلا شكل مروحة أو قمع', 'نمودار باقی‌مانده: بدون شکل بادبزن یا قیف'), t('Yes: residuals stay between about −11 and +14 at every temperature', 'نعم: تبقى البواقي بين نحو ‎−11 و+14 عند كل حرارة', 'بله: باقی‌مانده‌ها در هر دما بین حدود ‎−11 و +۱۴ می‌مانند')],
            [t('<strong>Independence</strong>', '<strong>الاستقلال</strong>', '<strong>استقلال</strong>'), t('Rows were collected properly and don\'t influence each other', 'جُمعت الصفوف بطريقة سليمة ولا يؤثر بعضها في بعض', 'سطرها درست جمع شده‌اند و بر هم اثر نمی‌گذارند'), t('Think about how the data was collected', 'فكّر في كيفية جمع البيانات', 'به نحوهٔ جمع‌آوری داده فکر کن'), t('Plausible: each month is a separate set of market days', 'معقول: كل شهر مجموعة منفصلة من أيام السوق', 'منطقی: هر ماه مجموعهٔ جدایی از روزهای بازار است')],
            [t('<strong>Normality</strong>', '<strong>الطبيعية</strong>', '<strong>نرمال بودن</strong>'), t('The errors follow a normal (bell) distribution', 'تتبع الأخطاء توزيعًا طبيعيًا (جرسيًا)', 'خطاها از توزیع نرمال (زنگوله‌ای) پیروی می‌کنند'), t('Histogram of residuals (needs more than 12 rows to judge well)', 'مدرج تكراري للبواقي (يحتاج أكثر من 12 صفًا للحكم جيدًا)', 'هیستوگرام باقی‌مانده‌ها (برای قضاوت خوب بیش از ۱۲ سطر لازم است)'), t('No clear problem; too few months to be sure', 'لا مشكلة واضحة؛ والأشهر أقل من أن نتأكد', 'مشکل آشکاری نیست؛ ماه‌ها برای اطمینان کم‌اند')],
          ],
        },
        {
          type: 'diagram',
          fig: t('Figure 14', 'الشكل 14', 'شکل ۱۴'),
          title: t('Residual plot: actual minus predicted jars, by temperature', 'مخطط البواقي: البرطمانات الفعلية ناقص المتنبأ بها، حسب الحرارة', 'نمودار باقی‌مانده: شیشه‌های واقعی منهای پیش‌بینی‌شده، بر حسب دما'),
          src: '/figures/week-06/diagram-02.svg',
          alt: 'Residuals for the 12 months scattered between about -11 and +14 around a zero line, with no fan shape; December at +14.1 and October at -10.8 are the largest',
          caption: t(
            'Good news first: the dots sit on both sides of zero and don\'t fan out. The largest misses are December (+14.1, more than the weather predicts) and October (−10.8, less): worth asking the owner why.',
            'الخبر الجيد أولًا: تقع النقاط على جانبي الصفر ولا تتسع كالمروحة. وأكبر الأخطاء ديسمبر (+14.1، أكثر مما يتنبأ به الطقس) وأكتوبر (‎−10.8، أقل): يستحق أن نسأل المالك عن السبب.',
            'اول خبر خوب: نقطه‌ها دو طرف صفرند و بادبزنی باز نمی‌شوند. بزرگ‌ترین خطاها دسامبر (+۱۴٫۱، بیشتر از آنچه هوا پیش‌بینی می‌کند) و اکتبر (‎−10.8، کمتر) است: ارزش دارد علتش را از مالک بپرسی.',
          ),
        },
        {
          type: 'table',
          headers: [t('Month', 'الشهر', 'ماه'), t('Actual', 'الفعلي', 'واقعی'), t('Predicted', 'المتنبأ به', 'پیش‌بینی‌شده'), t('Residual', 'الباقي', 'باقی‌مانده')],
          rows: months.map((m, i) => [cell(m), cell(jars[i]), cell(predicted[i].toFixed(1)), cell(fmt(residual[i]))]),
        },
        tools(
          [{ type: 'html', html: t('<p>Tick <strong>Residuals</strong> and <strong>Residual Plots</strong> in the Regression dialog: Excel adds a Predicted / Residuals table and a residual chart for each X.</p>', '<p>حدّد <strong>Residuals</strong> و<strong>Residual Plots</strong> في نافذة Regression: يضيف Excel جدول Predicted / Residuals ومخطط بواقٍ لكل X.</p>', '<p>در پنجرهٔ Regression گزینه‌های <strong>Residuals</strong> و <strong>Residual Plots</strong> را تیک بزن: Excel یک جدول Predicted / Residuals و یک نمودار باقی‌مانده برای هر X اضافه می‌کند.</p>') }],
          [py.residuals],
          [{ type: 'html', html: t('<p>Add a calculated column <code>Residual = Monthly[jars] - (-6.57 + 4.09 * Monthly[avg_temp_c])</code> and plot it against avg_temp_c in a scatter chart with a constant line at 0 (Analytics pane).</p>', '<p>أضف عمودًا محسوبًا <code>Residual = Monthly[jars] - (-6.57 + 4.09 * Monthly[avg_temp_c])</code> وارسمه مقابل avg_temp_c في مخطط انتشار مع خط ثابت عند 0 (جزء Analytics).</p>', '<p>یک ستون محاسباتی <code>Residual = Monthly[jars] - (-6.57 + 4.09 * Monthly[avg_temp_c])</code> اضافه کن و آن را در برابر avg_temp_c در یک نمودار پراکندگی با خط ثابت روی ۰ (پنل Analytics) رسم کن.</p>') }],
        ),
        ...extra.assumptionsEnd,
        { type: 'exercise', questionId: 'w06-q006' },
      ],
    },
    {
      id: 'multiple-regression',
      navLabel: t('Multiple regression', 'الانحدار المتعدد', 'رگرسیون چندگانه'),
      sectionLabel: t('Section 07', 'القسم ٠٧', 'بخش ۰۷'),
      timeEst: t('10 min', '١٠ دقائق', '۱۰ دقیقه'),
      headingHtml: t(
        '<h2>Multiple linear regression: more than one X</h2><p class="standfirst">Multiple regression estimates how one dependent variable relates to two or more independent variables at once, each one "controlling for" the others.</p>',
        '<h2>الانحدار الخطي المتعدد: أكثر من X واحد</h2><p class="standfirst">يقدّر الانحدار المتعدد علاقة متغير تابع واحد بمتغيرين مستقلين أو أكثر في الوقت نفسه، كل منها "مع التحكم" في الآخرين.</p>',
        '<h2>رگرسیون خطی چندگانه: بیش از یک X</h2><p class="standfirst">رگرسیون چندگانه رابطهٔ یک متغیر وابسته را با دو یا چند متغیر مستقل هم‌زمان برآورد می‌کند و هر کدام «با کنترل» بقیه است.</p>',
      ),
      blocks: [
        ...extra.multipleStart,
        { type: 'formula', eq: 'y = β₀ + β₁x₁ + β₂x₂ + … + βₙxₙ + ε', note: t('one coefficient per X', 'معامل لكل X', 'یک ضریب برای هر X') },
        {
          type: 'html',
          html: t(
            '<p>Each βᵢ is the change in y for one more unit of xᵢ <em>with every other X held fixed</em>. The owner wonders whether 5-Saturday months sell more, so we add market_days:</p>',
            '<p>كل βᵢ هو التغير في y لوحدة إضافية من xᵢ <em>مع تثبيت كل متغيرات X الأخرى</em>. يتساءل المالك هل تبيع الأشهر ذات أيام السبت الخمسة أكثر، فنضيف market_days:</p>',
            '<p>هر βᵢ تغییر y به ازای یک واحد بیشتر xᵢ است <em>در حالی که همهٔ Xهای دیگر ثابت‌اند</em>. مالک کنجکاو است که آیا ماه‌های ۵ شنبه‌ای بیشتر می‌فروشند، پس market_days را اضافه می‌کنیم:</p>',
          ),
        },
        {
          type: 'table',
          headers: [t('', '', ''), t('Temperature only', 'الحرارة فقط', 'فقط دما'), t('Temperature + market_days', 'الحرارة + market_days', 'دما + market_days')],
          rows: [
            [t('avg_temp_c coefficient (p)', 'معامل avg_temp_c ‏(p)', 'ضریب avg_temp_c ‏(p)'), t('4.09 (< 0.001)', '4.09 ‏(< 0.001)', '۴٫۰۹ (< ۰٫۰۰۱)'), t('4.09 (< 0.001)', '4.09 ‏(< 0.001)', '۴٫۰۹ (< ۰٫۰۰۱)')],
            [t('market_days coefficient (p)', 'معامل market_days ‏(p)', 'ضریب market_days ‏(p)'), t('–', '–', '–'), t('0.09 (0.987)', '0.09 ‏(0.987)', '۰٫۰۹ (۰٫۹۸۷)')],
            [t('R Square', 'R Square', 'R Square'), t('0.950', '0.950', '0.950'), t('0.950', '0.950', '0.950')],
            [t('Adjusted R Square', 'Adjusted R Square', 'Adjusted R Square'), t('0.945', '0.945', '0.945'), t('0.939', '0.939', '0.939')],
          ],
        },
        {
          type: 'html',
          html: t(
            '<ul><li>Controlling for temperature, an extra market day goes with only 0.09 more jars, and its p-value of 0.987 says that is indistinguishable from zero.</li><li>R Square never goes down when you add an X, even a useless one. <strong>Adjusted R Square</strong> subtracts a penalty for every extra X, so it falls here: the simpler model is better.</li></ul>',
            '<ul><li>مع التحكم في الحرارة، يقابل يوم السوق الإضافي 0.09 برطمان فقط، وتقول قيمة p البالغة 0.987 إن ذلك لا يختلف عن الصفر.</li><li>لا ينخفض R Square أبدًا حين تضيف X، حتى لو كان عديم الفائدة. ويطرح <strong>R Square المعدّل</strong> عقوبة لكل X إضافي، فينخفض هنا: النموذج الأبسط أفضل.</li></ul>',
            '<ul><li>با کنترل دما، یک روز بازار اضافه فقط با ۰٫۰۹ شیشهٔ بیشتر همراه است و مقدار p برابر ۰٫۹۸۷ می‌گوید این از صفر قابل تشخیص نیست.</li><li>R Square با افزودن یک X هرگز پایین نمی‌آید، حتی اگر بی‌فایده باشد. <strong>R Square تعدیل‌شده</strong> برای هر X اضافه جریمه کم می‌کند، پس اینجا پایین می‌آید: مدل ساده‌تر بهتر است.</li></ul>',
          ),
        },
        tools([{ type: 'html', html: excel.multiple }], [py.multiple], [{ type: 'html', html: powerBi.multiple }]),
        ...extra.multipleDeck,
        { type: 'exercise', questionId: 'w06-q007' },
        { type: 'exercise', questionId: 'w06-q008' },
      ],
    },
    extra.practiceDiamonds,
    {
      id: 'cautions',
      navLabel: t('Three cautions', 'ثلاثة تحذيرات', 'سه هشدار'),
      sectionLabel: t('Section 09', 'القسم ٠٩', 'بخش ۰۹'),
      timeEst: t('5 min', '٥ دقائق', '۵ دقیقه'),
      headingHtml: t(
        '<h2>Three cautions before you hand a regression to a manager</h2><p class="standfirst">A regression with R² = 0.95 looks like certainty. These are the three ways it most often misleads.</p>',
        '<h2>ثلاثة تحذيرات قبل أن تسلّم انحدارًا لمدير</h2><p class="standfirst">يبدو انحدار بـ R² = 0.95 كأنه يقين. هذه أكثر ثلاث طرق يضلّل بها.</p>',
        '<h2>سه هشدار پیش از اینکه رگرسیونی را به مدیری بدهی</h2><p class="standfirst">رگرسیونی با R² = 0.95 شبیه قطعیت به نظر می‌رسد. این سه راه رایج‌ترین گمراه‌کنندگی آن است.</p>',
      ),
      blocks: [
        ...extra.cautionsStart,
        {
          type: 'html',
          html: t(
            '<ol><li><strong>Correlation is not causation.</strong> The model shows that jars and temperature move together, not that warmth makes people buy jam. Summer also brings tourists, longer market hours and fresh fruit. A business decision based on "heat causes sales" might be right, but the regression alone doesn\'t prove it.</li><li><strong>Don\'t extrapolate.</strong> The data runs from 4 °C to 27 °C. At 40 °C the line says about 157 jars, but a heatwave might empty the market instead. Predict only inside the range you observed.</li><li><strong>The intercept is often meaningless.</strong> −6.57 jars at 0 °C isn\'t a fact about the stand; it is where the line crosses an axis nobody visited.</li></ol>',
            '<ol><li><strong>الارتباط ليس سببية.</strong> يُظهر النموذج أن البرطمانات والحرارة تتحركان معًا، لا أن الدفء يجعل الناس يشترون المربى. فالصيف يجلب أيضًا السياح وساعات سوق أطول وفاكهة طازجة. قد يكون قرار عمل مبني على "الحرارة تسبّب المبيعات" صحيحًا، لكن الانحدار وحده لا يثبته.</li><li><strong>لا تستقرئ خارج البيانات.</strong> تمتد البيانات من 4 °م إلى 27 °م. عند 40 °م يقول الخط نحو 157 برطمانًا، لكن موجة حر قد تُفرغ السوق بدلًا من ذلك. تنبأ فقط داخل المدى الذي رصدته.</li><li><strong>المقطع بلا معنى غالبًا.</strong> ‎−6.57 برطمانًا عند 0 °م ليست حقيقة عن الكشك؛ إنها حيث يقطع الخط محورًا لم يزره أحد.</li></ol>',
            '<ol><li><strong>همبستگی علیت نیست.</strong> مدل نشان می‌دهد شیشه‌ها و دما با هم حرکت می‌کنند، نه اینکه گرما مردم را به خرید مربا وامی‌دارد. تابستان گردشگر، ساعت‌های طولانی‌تر بازار و میوهٔ تازه هم می‌آورد. تصمیمی کسب‌وکاری بر پایهٔ «گرما باعث فروش است» شاید درست باشد، اما رگرسیون به‌تنهایی ثابتش نمی‌کند.</li><li><strong>برون‌یابی نکن.</strong> داده از ۴ تا ۲۷ درجه است. در ۴۰ درجه خط حدود ۱۵۷ شیشه می‌گوید، اما شاید موج گرما بازار را خالی کند. فقط درون بازه‌ای که دیده‌ای پیش‌بینی کن.</li><li><strong>عرض از مبدأ اغلب بی‌معناست.</strong> ‎−6.57 شیشه در ۰ درجه واقعیتی دربارهٔ غرفه نیست؛ جایی است که خط محوری را قطع می‌کند که هیچ‌کس به آن نرسیده.</li></ol>',
          ),
        },
        ...extra.cautionsEnd,
        { type: 'exercise', questionId: 'w06-q009' },
      ],
    },
    {
      id: 'ai-corner',
      navLabel: t('AI co-pilot corner', 'ركن مساعد الذكاء الاصطناعي', 'گوشهٔ همیار هوش مصنوعی'),
      sectionLabel: t('Section 10', 'القسم ١٠', 'بخش ۱۰'),
      timeEst: t('5 min', '٥ دقائق', '۵ دقیقه'),
      headingHtml: t(
        '<h2>AI co-pilot corner: let it run the numbers, you check the story</h2><p class="standfirst">AI assistants fit regressions instantly. They are much less careful about what the numbers mean.</p>',
        '<h2>ركن مساعد الذكاء الاصطناعي: دعه يحسب، وتحقق أنت من القصة</h2><p class="standfirst">تطبّق مساعدات الذكاء الاصطناعي الانحدار فورًا. لكنها أقل حرصًا بكثير على معنى الأرقام.</p>',
        '<h2>گوشهٔ همیار هوش مصنوعی: بگذار عددها را حساب کند، داستان را تو بررسی کن</h2><p class="standfirst">دستیارهای هوش مصنوعی رگرسیون را فوراً برازش می‌کنند. اما دربارهٔ معنای عددها خیلی کم‌دقت‌ترند.</p>',
      ),
      blocks: [
        {
          type: 'tabs',
          tabs: [
            {
              label: t('Weak prompt', 'طلب ضعيف', 'درخواست ضعیف'),
              blocks: [{ type: 'html', html: t('<p>"Run a regression on this data and tell me what drives sales." The assistant picks its own columns, reports R² = 0.95, and concludes "temperature causes 95% of sales; at 40 °C expect 157 jars".</p>', '<p>"شغّل انحدارًا على هذه البيانات وأخبرني ما الذي يحرّك المبيعات." يختار المساعد أعمدته بنفسه، ويبلغ عن R² = 0.95، ويستنتج "الحرارة تسبّب 95% من المبيعات؛ وعند 40 °م توقّع 157 برطمانًا".</p>', '<p>«روی این داده رگرسیون بگیر و بگو چه چیزی فروش را جلو می‌برد.» دستیار ستون‌ها را خودش انتخاب می‌کند، R² = 0.95 گزارش می‌دهد و نتیجه می‌گیرد «دما باعث ۹۵٪ فروش است؛ در ۴۰ درجه ۱۵۷ شیشه انتظار داشته باش».</p>') }],
            },
            {
              label: t('Strong prompt', 'طلب قوي', 'درخواست قوی'),
              blocks: [
                {
                  type: 'code',
                  code: `Here are 12 months of jam stand data (pasted below): avg_temp_c, market_days, jars.
1. Fit jars ~ avg_temp_c. Report the equation, R², adjusted R², and the slope's p-value.
2. Fit jars ~ avg_temp_c + market_days and say whether adjusted R² improves.
3. List the residuals and say whether any assumption looks violated.
4. Explain the slope in one plain sentence for a shop owner.
Do not claim causation, and do not predict outside 4–27 °C.`,
                },
              ],
            },
          ],
        },
        {
          type: 'box',
          variant: 'keypoint',
          label: t('Key point', 'نقطة أساسية', 'نکتهٔ کلیدی'),
          html: t(
            '<p>Check the AI\'s numbers against one formula you run yourself (<code>=SLOPE</code> and <code>=RSQ</code> take seconds), then rewrite its conclusions: "goes with", not "causes"; inside the data range, not beyond it.</p>',
            '<p>طابق أرقام الذكاء الاصطناعي مع صيغة واحدة تشغّلها بنفسك (<code>=SLOPE</code> و<code>=RSQ</code> تأخذان ثوانيَ)، ثم أعد كتابة استنتاجاته: "يقابله" لا "يسبّب"؛ داخل مدى البيانات لا خارجه.</p>',
            '<p>عددهای هوش مصنوعی را با یک فرمول که خودت اجرا می‌کنی مقایسه کن (<code>=SLOPE</code> و <code>=RSQ</code> چند ثانیه طول می‌کشند)، سپس نتیجه‌گیری‌هایش را بازنویسی کن: «همراه است با»، نه «باعث می‌شود»؛ درون بازهٔ داده، نه بیرون آن.</p>',
          ),
        },
        ...extra.aiRecap,
        { type: 'exercise', questionId: 'w06-q010' },
      ],
    },
    {
      id: 'worked-example',
      navLabel: t('Worked example', 'مثال تطبيقي', 'مثال حل‌شده'),
      sectionLabel: t('Section 11', 'القسم ١١', 'بخش ۱۱'),
      timeEst: t('5 min', '٥ دقائق', '۵ دقیقه'),
      headingHtml: t(
        '<h2>Worked example: the note to the stand owner</h2><p class="standfirst">Everything above, condensed into what the owner actually needs to read.</p>',
        '<h2>مثال تطبيقي: الملاحظة إلى صاحب الكشك</h2><p class="standfirst">كل ما سبق، مختصرًا فيما يحتاج المالك قراءته فعلًا.</p>',
        '<h2>مثال حل‌شده: یادداشت برای صاحب غرفه</h2><p class="standfirst">همهٔ مطالب بالا، فشرده در چیزی که مالک واقعاً باید بخواند.</p>',
      ),
      blocks: [
        {
          type: 'box',
          variant: 'example',
          label: t('Note to the owner', 'ملاحظة إلى المالك', 'یادداشت برای مالک'),
          html: t(
            '<p><strong>Plan production from the temperature forecast.</strong> Across 2024, each extra degree of average monthly temperature went with about 4 more jars sold, and temperature explained 95% of the month-to-month change. For a month forecast at 20 °C, plan about 75 jars (expect to be within about 8 either way). Whether a month has 4 or 5 market Saturdays made no measurable difference. Two months beat or missed the forecast by more than 10 jars: December sold 14 more (holiday gifts?) and October 11 fewer. Plan a little extra stock in December, and don\'t use this rule for heatwaves above 27 °C, which the data never covered.</p>',
            '<p><strong>خطّط للإنتاج من توقعات الحرارة.</strong> خلال 2024، كانت كل درجة إضافية من متوسط الحرارة الشهرية يقابلها نحو 4 برطمانات مباعة أكثر، وفسّرت الحرارة 95% من التغير الشهري. لشهر متوقع حرارته 20 °م، خطّط لنحو 75 برطمانًا (متوقع ضمن نحو 8 زيادة أو نقصانًا). لم يُحدث كون الشهر فيه 4 أو 5 أيام سبت فرقًا يُقاس. شهران تجاوزا التوقع أو قصّرا عنه بأكثر من 10 برطمانات: باع ديسمبر 14 أكثر (هدايا العطلة؟) وأكتوبر 11 أقل. خطّط لمخزون إضافي قليل في ديسمبر، ولا تستخدم هذه القاعدة لموجات الحر فوق 27 °م، التي لم تغطّها البيانات أبدًا.</p>',
            '<p><strong>تولید را بر اساس پیش‌بینی دما برنامه‌ریزی کن.</strong> در طول ۲۰۲۴، هر درجهٔ اضافهٔ میانگین دمای ماهانه با حدود ۴ شیشهٔ بیشتر همراه بود و دما ۹۵٪ تغییرات ماه‌به‌ماه را توضیح داد. برای ماهی با پیش‌بینی ۲۰ درجه، حدود ۷۵ شیشه برنامه بریز (انتظار داشته باش حدود ۸ شیشه بالا یا پایین باشد). اینکه ماه ۴ یا ۵ شنبهٔ بازار داشته باشد تفاوت قابل اندازه‌گیری‌ای نداشت. دو ماه بیش از ۱۰ شیشه از پیش‌بینی جلو یا عقب بودند: دسامبر ۱۴ شیشه بیشتر (هدیهٔ تعطیلات؟) و اکتبر ۱۱ شیشه کمتر فروخت. برای دسامبر کمی موجودی اضافه بگذار و این قاعده را برای موج‌های گرمای بالای ۲۷ درجه، که داده هرگز پوشش نداده، به کار نبر.</p>',
          ),
        },
        ...extra.workedRecap,
      ],
    },
    {
      id: 'common-mistakes',
      navLabel: t('Common mistakes', 'أخطاء شائعة', 'اشتباهات رایج'),
      sectionLabel: t('Section 12', 'القسم ١٢', 'بخش ۱۲'),
      headingHtml: t(
        '<h2>Common mistakes</h2><p class="standfirst">Each one produces a regression that runs without errors and still misleads.</p>',
        '<h2>أخطاء شائعة</h2><p class="standfirst">كل واحد منها ينتج انحدارًا يعمل دون أخطاء ومع ذلك يضلّل.</p>',
        '<h2>اشتباهات رایج</h2><p class="standfirst">هر کدام رگرسیونی می‌سازد که بی‌خطا اجرا می‌شود و باز هم گمراه می‌کند.</p>',
      ),
      blocks: [
        {
          type: 'table',
          headers: [t('Mistake', 'الخطأ', 'اشتباه'), t('What goes wrong', 'ما الذي يفسد', 'چه چیزی خراب می‌شود'), t('Instead', 'بدلًا من ذلك', 'به‌جایش')],
          rows: [
            [t('Swapping X and Y in the dialog', 'تبديل X وY في النافذة', 'جابه‌جا کردن X و Y در پنجره'), t('You predict temperature from jars, a different (and silly) model', 'تتنبأ بالحرارة من البرطمانات، وهو نموذج مختلف (وسخيف)', 'دما را از شیشه‌ها پیش‌بینی می‌کنی؛ مدلی دیگر (و بی‌معنی)'), t('Y = what you want to predict; X = what you know first', 'Y = ما تريد التنبؤ به؛ وX = ما تعرفه أولًا', 'Y = آنچه می‌خواهی پیش‌بینی کنی؛ X = آنچه اول می‌دانی')],
            [t('Running it on uncleaned data', 'تشغيله على بيانات غير منظّفة', 'اجرا روی دادهٔ تمیزنشده'), t('One typo like Week 4\'s 180 jars drags the whole line', 'خطأ كتابة واحد مثل الـ180 برطمانًا في الأسبوع 4 يسحب الخط كله', 'یک خطای تایپی مثل ۱۸۰ شیشهٔ هفتهٔ ۴ کل خط را می‌کشد'), t('Clean first (Weeks 4–5), then regress', 'نظّف أولًا (الأسبوعان 4–5)، ثم طبّق الانحدار', 'اول تمیز کن (هفته‌های ۴ و ۵)، بعد رگرسیون')],
            [t('Forgetting Labels when ranges include headers', 'نسيان Labels حين يتضمن المدى العناوين', 'فراموش کردن Labels وقتی بازه سرستون دارد'), t('Excel errors out, or reads the header as data', 'يُظهر Excel خطأ، أو يقرأ العنوان كبيانات', 'Excel خطا می‌دهد یا سرستون را داده می‌خواند'), t('Tick Labels, or start the ranges at row 2', 'حدّد Labels، أو ابدأ المدى من الصف 2', 'Labels را تیک بزن یا بازه‌ها را از سطر ۲ شروع کن')],
            [t('Judging a model by R² alone', 'الحكم على نموذج بـ R² وحده', 'قضاوت دربارهٔ مدل فقط با R²'), t('A high R² can hide a curve, a fan or one extreme point', 'R² مرتفع قد يخفي انحناءً أو شكل مروحة أو نقطة متطرفة واحدة', 'R² بالا می‌تواند یک منحنی، بادبزن یا یک نقطهٔ افراطی را پنهان کند'), t('Always look at the scatter and residual plots', 'انظر دائمًا إلى مخططي الانتشار والبواقي', 'همیشه به نمودارهای پراکندگی و باقی‌مانده نگاه کن')],
            [t('Adding every column to raise R²', 'إضافة كل عمود لرفع R²', 'افزودن همهٔ ستون‌ها برای بالا بردن R²'), t('R² rises even for useless X; the model gets harder to explain', 'يرتفع R² حتى لـ X عديم الفائدة؛ ويصبح النموذج أصعب شرحًا', 'R² حتی برای X بی‌فایده بالا می‌رود؛ توضیح مدل سخت‌تر می‌شود'), t('Compare adjusted R² and keep only X that make business sense', 'قارن R² المعدّل وأبقِ فقط على X ذات المعنى في العمل', 'R² تعدیل‌شده را مقایسه کن و فقط Xهایی را نگه دار که از نظر کسب‌وکار معنا دارند')],
            [t('Saying "causes"', 'قول "يسبّب"', 'گفتن «باعث می‌شود»'), t('Regression shows association; other factors may be at work', 'الانحدار يُظهر الارتباط؛ وقد تعمل عوامل أخرى', 'رگرسیون همراهی را نشان می‌دهد؛ عوامل دیگری ممکن است در کار باشند'), t('Say "goes with" or "is associated with"', 'قل "يقابله" أو "يرتبط بـ"', 'بگو «همراه است با» یا «مرتبط است با»')],
          ],
        },
      ],
    },
    {
      id: 'homework',
      navLabel: t('Homework', 'الواجب', 'تکلیف'),
      sectionLabel: t('Section 13', 'القسم ١٣', 'بخش ۱۳'),
      headingHtml: t(
        '<h2>Homework: step 3 of your final project, the regression</h2><p class="standfirst">Apply this week to your pair\'s case study: fit the regression on your card, read it, check it, and write the README paragraphs. Two questions, each with an analogy, a checklist and an example answer worked on the jam stand\'s January–June data; a short feedback question comes last.</p>',
        '<h2>الواجب: الخطوة 3 من مشروعك النهائي، الانحدار</h2><p class="standfirst">طبّقا هذا الأسبوع على دراسة حالتكما: طبّقا الانحدار المذكور في بطاقتكما، واقرآه، وتحققا منه، واكتبا فقرات README. سؤالان، لكل منهما تشبيه وقائمة تحقق ومثال على إجابة محسوب على بيانات كشك المربى من يناير إلى يونيو؛ وفي النهاية سؤال قصير عن رأيك.</p>',
        '<h2>تکلیف: گام ۳ پروژهٔ نهایی، رگرسیون</h2><p class="standfirst">این هفته را روی مطالعهٔ موردی گروهتان پیاده کنید: رگرسیون کارتتان را برازش کنید، بخوانید، بررسی کنید و پاراگراف‌های README را بنویسید. دو سؤال، هر کدام با یک تشبیه، یک فهرست بررسی و یک نمونه‌پاسخ روی دادهٔ ژانویه تا ژوئن غرفهٔ مربا؛ در پایان یک سؤال کوتاه دربارهٔ نظر تو.</p>',
      ),
      blocks: [week06Homework],
    },
    {
      id: 'before-week-7',
      navLabel: t('Before Week 7', 'قبل الأسبوع 7', 'پیش از هفته ۷'),
      sectionLabel: t('Section 14', 'القسم ١٤', 'بخش ۱۴'),
      headingHtml: t(
        '<h2>Before Week 7</h2><p>You read p-values this week as "below 0.05 or not". Week 7 explains what they actually measure: hypothesis testing, null and alternative hypotheses, and how to decide whether a difference in your data is real or just chance. Your pair will run the test on your case card.</p>',
        '<h2>قبل الأسبوع 7</h2><p>قرأت قيم p هذا الأسبوع على أنها "أقل من 0.05 أم لا". يشرح الأسبوع 7 ما تقيسه فعلًا: اختبار الفرضيات، والفرضيتين الصفرية والبديلة، وكيف تقرر هل الفرق في بياناتك حقيقي أم مجرد صدفة. وسيشغّل فريقكما الاختبار المذكور في بطاقة حالتكما.</p>',
        '<h2>پیش از هفته ۷</h2><p>این هفته مقدار p را فقط «کمتر از ۰٫۰۵ یا نه» خواندی. هفتهٔ ۷ توضیح می‌دهد واقعاً چه چیزی را اندازه می‌گیرد: آزمون فرض، فرض صفر و فرض مقابل، و اینکه چطور تصمیم بگیری تفاوتی در داده‌ات واقعی است یا فقط تصادف. گروه شما آزمون کارت موردتان را اجرا خواهد کرد.</p>',
      ),
      blocks: [],
    },
  ],
}

/** Exported for the notebook generator (public/notebooks/week-06-linear-regression.ipynb). */
export const week06PythonCells = [py.setup, py.simple, py.plot, py.predict, py.residuals, py.multiple]
