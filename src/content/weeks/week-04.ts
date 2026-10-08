// Authored for the React app from ../../../../course/ba-source-materials/ba2-week-04.md (the
// "Week 4: Data Preparation and Understanding, Data Cleaning, Transforming" deck). The static site has no
// week-04 page, question bank or i18n strings, so nothing here is a mechanical migration.
// Departures from the deck, on purpose:
//  - The deck is all definitions with no dataset. Every idea here is shown on one running example: a messy
//    export of Week 2's jam_sales (`jam_sales_raw`, 15 rows) that cleans back to Week 2's exact 13 rows and
//    209 jars, so students see where the "clean" tables of Weeks 2–3 come from.
//  - Week 5's deck is step-by-step Excel cleaning, so this week stays at the concept level and shows each
//    step briefly in SQL (profiling), Python (pandas) and Power BI (Power Query), not Excel.
//  - The deck's "Data reduction" step and its decision-tree / chi-square discretization methods are named
//    only; they need modelling ideas from later weeks.
// Python snippets live in `py` below and are also exported to public/notebooks/week-04-data-preparation.ipynb
// (regenerate that file if they change). ar/fa are draft translations awaiting native review, like the earlier
// weeks. Code stays English.
import type { Question, Week } from '../types'
import { week04Homework, juneRawSql } from './homework/week-04'

const notebookUrl =
  'https://colab.research.google.com/github/PA-WiT/BA2/blob/main/public/notebooks/week-04-data-preparation.ipynb'

// The running example. Each planted problem is fixed in the worked example (Section 12).
const sql = {
  raw: `CREATE TABLE jam_sales_raw (
  id          INT PRIMARY KEY,
  flavor      TEXT,
  market_date TEXT,   -- text on purpose: the till exported mixed date formats
  units_sold  INT     -- can be NULL
);

INSERT INTO jam_sales_raw (id, flavor, market_date, units_sold) VALUES
(1,  'Strawberry',  '2024-05-04', 22),
(2,  'blueberry',   '2024-05-04', 15),
(3,  'Peach',       '04/05/2024', 10),
(4,  'Strawberry ', '2024-05-11', 25),
(5,  'Blueberry',   '2024-05-11', NULL),
(6,  'Peach',       '2024-05-11', 8),
(7,  'Strawberry',  '2024-05-18', 180),
(8,  'Blueberry',   '2024-05-18', 17),
(9,  'Peach',       '2024-05-18', -12),
(10, 'Strawberry',  '2024-05-25', 35),
(11, 'Blueberry',   '2024-05-25', 16),
(12, 'Peach',       '2024-05-25', 10),
(13, 'Lemon',       '2024-05-25', 9),
(14, 'Strawberry',  '2024-05-25', 35),
(15, 'Peach',       '2024-01-01', 0);`,
  profile: `SELECT
  COUNT(*)               AS total_rows,
  COUNT(units_sold)      AS rows_with_units,   -- COUNT(column) skips NULLs
  COUNT(DISTINCT flavor) AS distinct_flavors,
  MIN(units_sold)        AS min_units,
  MAX(units_sold)        AS max_units,
  SUM(units_sold)        AS total_units
FROM jam_sales_raw;

-- total_rows 15 | rows_with_units 14 | distinct_flavors 6
-- min_units -12 | max_units 180     | total_units 370`,
  byFlavor: `SELECT '[' || flavor || ']' AS flavor_as_stored, COUNT(*) AS rows
FROM jam_sales_raw
GROUP BY flavor
ORDER BY flavor_as_stored;
-- the brackets make hidden spaces visible: [Strawberry ] is not [Strawberry]`,
  suspicious: `-- Rows that break a rule: missing or negative units, or a date not in YYYY-MM-DD form
SELECT *
FROM jam_sales_raw
WHERE units_sold IS NULL
   OR units_sold < 0
   OR market_date !~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$';

-- Exact duplicates once spacing and case are ignored
SELECT INITCAP(TRIM(flavor)) AS flavor, market_date, units_sold, COUNT(*) AS copies
FROM jam_sales_raw
GROUP BY INITCAP(TRIM(flavor)), market_date, units_sold
HAVING COUNT(*) > 1;
-- Strawberry | 2024-05-25 | 35 | 2`,
  missing: `-- Three ways to fill the blank Blueberry row (id 5). Only one is right here.
SELECT AVG(units_sold) FROM jam_sales_raw WHERE units_sold > 0;                 -- overall mean: about 32, dragged up by the 180 typo
SELECT AVG(units_sold) FROM jam_sales_raw WHERE INITCAP(TRIM(flavor)) = 'Blueberry'
                                           AND units_sold IS NOT NULL;           -- class mean: 16
-- The stand's paper log says 12, so fill it from the source:
UPDATE jam_sales_clean SET units_sold = 12 WHERE id = 5;`,
  clean: `-- Never edit the raw export: clean a copy, so every fix can be checked and undone
CREATE TABLE jam_sales_clean AS SELECT * FROM jam_sales_raw;

UPDATE jam_sales_clean SET flavor = INITCAP(TRIM(flavor));          -- 'blueberry', 'Strawberry ' -> 'Blueberry', 'Strawberry'
UPDATE jam_sales_clean SET market_date = '2024-05-04' WHERE id = 3;  -- day-first date; 4 May was a market Saturday
UPDATE jam_sales_clean SET units_sold = 12 WHERE id = 5;            -- blank: filled from the paper log
UPDATE jam_sales_clean SET units_sold = 18 WHERE id = 7;            -- 180 was a typo, confirmed by the owner
UPDATE jam_sales_clean SET units_sold = 12 WHERE id = 9;            -- -12: sign error
DELETE FROM jam_sales_clean WHERE id IN (14, 15);                    -- 14 duplicates 10; 15 is the till's test row

ALTER TABLE jam_sales_clean ALTER COLUMN market_date TYPE DATE USING market_date::date;

SELECT COUNT(*) AS rows, SUM(units_sold) AS jars FROM jam_sales_clean;
-- rows 13 | jars 209   (exactly Week 2's jam_sales)`,
  integrate: `CREATE TABLE supplier_prices (flavour_name TEXT, price_cents INT);
INSERT INTO supplier_prices VALUES
('STRAWBERRY', 500), ('Blue berry', 600), ('Peach', 400), ('Lemon', 450);

-- Match on a cleaned key (no spaces, upper case) and convert cents to dollars
SELECT
  s.flavor,
  SUM(s.units_sold)                                AS units,
  sp.price_cents / 100.0                           AS price,
  ROUND(SUM(s.units_sold) * sp.price_cents / 100.0, 2) AS revenue
FROM jam_sales_clean s
LEFT JOIN supplier_prices sp
  ON UPPER(REPLACE(s.flavor, ' ', '')) = UPPER(REPLACE(sp.flavour_name, ' ', ''))
GROUP BY s.flavor, sp.price_cents
ORDER BY revenue DESC;
-- Strawberry 100 | 5.00 | 500.00
-- Blueberry   60 | 6.00 | 360.00
-- Peach       40 | 4.00 | 160.00
-- Lemon        9 | 4.50 |  40.50   (Lemon finally has a price)`,
  normalize: `WITH monthly(month_no, total) AS (
  VALUES (1, 16), (2, 19), (3, 27), (4, 42), (5, 66), (6, 92),
         (7, 108), (8, 108), (9, 74), (10, 44), (11, 25), (12, 28)
)
SELECT
  month_no,
  total,
  ROUND((total - MIN(total) OVER ())::numeric
        / (MAX(total) OVER () - MIN(total) OVER ()), 2)          AS min_max,
  ROUND((total - AVG(total) OVER ()) / STDDEV_SAMP(total) OVER (), 2) AS z_score
FROM monthly
ORDER BY month_no;
-- Jan 16 -> 0.00, -1.11 | Jun 92 -> 0.83, 1.10 | Jul 108 -> 1.00, 1.57`,
  discretize: `SELECT
  CASE
    WHEN units_sold < 12 THEN 'slow'
    WHEN units_sold < 25 THEN 'normal'
    ELSE 'busy'
  END AS day_type,
  COUNT(*) AS rows
FROM jam_sales_clean
GROUP BY day_type;
-- slow 4 | normal 7 | busy 2`,
}

const py = {
  setup: `import pandas as pd

df = pd.DataFrame({
    "id":          range(1, 16),
    "flavor":      ["Strawberry", "blueberry", "Peach", "Strawberry ", "Blueberry", "Peach",
                    "Strawberry", "Blueberry", "Peach", "Strawberry", "Blueberry", "Peach",
                    "Lemon", "Strawberry", "Peach"],
    "market_date": ["2024-05-04", "2024-05-04", "04/05/2024", "2024-05-11", "2024-05-11", "2024-05-11",
                    "2024-05-18", "2024-05-18", "2024-05-18", "2024-05-25", "2024-05-25", "2024-05-25",
                    "2024-05-25", "2024-05-25", "2024-01-01"],
    "units_sold":  [22, 15, 10, 25, None, 8, 180, 17, -12, 35, 16, 10, 9, 35, 0],
})
df`,
  profile: `df.info()                          # units_sold: 14 non-null out of 15
print(df.isna().sum())             # one missing units_sold
print(df["flavor"].value_counts()) # 6 spellings for 4 flavors
print(df["units_sold"].describe()) # min -12, max 180: both suspicious`,
  suspicious: `bad_units = df[df["units_sold"].isna() | (df["units_sold"] < 0)]
bad_dates = df[~df["market_date"].str.match(r"^\\d{4}-\\d{2}-\\d{2}$")]
key = df["flavor"].str.strip().str.title()
dupes = df[df.assign(flavor=key).duplicated(subset=["flavor", "market_date", "units_sold"], keep=False)]
bad_units, bad_dates, dupes`,
  clean: `clean = df.copy()                                   # never edit the raw data
clean["flavor"] = clean["flavor"].str.strip().str.title()
clean.loc[clean["id"] == 3, "market_date"] = "2024-05-04"
clean.loc[clean["id"] == 5, "units_sold"] = 12        # from the paper log
clean.loc[clean["id"] == 7, "units_sold"] = 18        # typo, confirmed by the owner
clean.loc[clean["id"] == 9, "units_sold"] = 12        # sign error
clean = clean[~clean["id"].isin([14, 15])]            # duplicate; till test row
clean["market_date"] = pd.to_datetime(clean["market_date"])
clean["units_sold"] = clean["units_sold"].astype(int)
print(len(clean), clean["units_sold"].sum())          # 13 209`,
  integrate: `prices = pd.DataFrame({
    "flavour_name": ["STRAWBERRY", "Blue berry", "Peach", "Lemon"],
    "price_cents":  [500, 600, 400, 450],
})
prices["key"] = prices["flavour_name"].str.replace(" ", "").str.upper()
clean["key"] = clean["flavor"].str.replace(" ", "").str.upper()

merged = clean.merge(prices[["key", "price_cents"]], on="key", how="left")
merged["price"] = merged["price_cents"] / 100          # cents -> dollars
merged["revenue"] = merged["units_sold"] * merged["price"]
merged.groupby("flavor")[["units_sold", "revenue"]].sum()`,
  normalize: `monthly = pd.DataFrame({
    "month": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    "total": [16, 19, 27, 42, 66, 92, 108, 108, 74, 44, 25, 28],
})
t = monthly["total"]
monthly["min_max"] = ((t - t.min()) / (t.max() - t.min())).round(2)
monthly["z_score"] = ((t - t.mean()) / t.std()).round(2)   # .std() is the sample standard deviation
monthly["decimal"] = t / 1000                                # largest value 108 has 3 digits
monthly`,
  discretize: `clean["day_type"] = pd.cut(clean["units_sold"], bins=[0, 11, 24, float("inf")],
                           labels=["slow", "normal", "busy"])
print(clean["day_type"].value_counts())   # normal 7, slow 4, busy 2

family = {"Strawberry": "berry", "Blueberry": "berry", "Peach": "stone fruit", "Lemon": "citrus"}
clean["family"] = clean["flavor"].map(family)
clean.groupby("family")["units_sold"].sum()   # berry 160, stone fruit 40, citrus 9`,
}

const q = (en: string, ar: string, fa: string) => ({ en, ar, fa })

const questions: Question[] = [
  {
    id: 'w04-q001',
    weekId: 'week-04',
    topic: 'welcome',
    answer: 1,
    prompt: q(
      "The raw export adds up to 370 jars for May, but Week 2's table said 209. What should you do first?",
      'مجموع التصدير الخام 370 برطمانًا لشهر مايو، لكن جدول الأسبوع 2 قال 209. ماذا تفعل أولًا؟',
      'جمع خروجی خام برای ماه مه ۳۷۰ شیشه است، اما جدول هفتهٔ ۲ گفته بود ۲۰۹. اول چه کار می‌کنی؟',
    ),
    options: [
      q('Report 370, since it is the newer number', 'أبلغ عن 370 لأنه الرقم الأحدث', '۳۷۰ را گزارش بده، چون عدد جدیدتر است'),
      q('Profile the export to find out where the difference comes from', 'افحص التصدير لتعرف من أين يأتي الفرق', 'خروجی را پروفایل کن تا بفهمی تفاوت از کجا می‌آید'),
      q('Report the average of the two numbers', 'أبلغ عن متوسط الرقمين', 'میانگین دو عدد را گزارش بده'),
    ],
  },
  {
    id: 'w04-q002',
    weekId: 'week-04',
    topic: 'why-prepare',
    answer: 0,
    prompt: q(
      'Why fix data errors before the analysis rather than after?',
      'لماذا نصلح أخطاء البيانات قبل التحليل لا بعده؟',
      'چرا خطاهای داده را پیش از تحلیل درست می‌کنیم و نه بعد از آن؟',
    ),
    options: [
      q("Once data has left its source, errors are harder to trace and every chart built on it is already wrong", 'بعد أن تغادر البيانات مصدرها يصبح تتبّع الأخطاء أصعب، ويكون كل رسم بُني عليها خاطئًا بالفعل', 'وقتی داده از منبعش جدا شد، ردیابی خطاها سخت‌تر است و هر نموداری که روی آن ساخته شده از قبل غلط است'),
      q('Analysis tools fix most errors automatically anyway', 'أدوات التحليل تصلح معظم الأخطاء تلقائيًا على أي حال', 'ابزارهای تحلیل به‌هرحال بیشتر خطاها را خودکار درست می‌کنند'),
      q('Charts look better when the data is messy', 'تبدو الرسوم أجمل عندما تكون البيانات فوضوية', 'نمودارها وقتی داده نامرتب است زیباترند'),
    ],
  },
  {
    id: 'w04-q003',
    weekId: 'week-04',
    topic: 'profiling',
    answer: 0,
    prompt: q(
      'COUNT(*) returns 15 but COUNT(units_sold) returns 14. What does that tell you?',
      'يُرجع COUNT(*) القيمة 15 لكن COUNT(units_sold) يُرجع 14. ماذا يخبرك ذلك؟',
      'COUNT(*) عدد ۱۵ و COUNT(units_sold) عدد ۱۴ را برمی‌گرداند. این به تو چه می‌گوید؟',
    ),
    options: [
      q('One row has no value (NULL) in units_sold', 'صف واحد لا قيمة له (NULL) في units_sold', 'یک سطر در units_sold مقدار ندارد (NULL)'),
      q('One row is a duplicate', 'صف واحد مكرر', 'یک سطر تکراری است'),
      q('One row has a negative value', 'صف واحد قيمته سالبة', 'یک سطر مقدار منفی دارد'),
    ],
  },
  {
    id: 'w04-q004',
    weekId: 'week-04',
    topic: 'profiling',
    answer: 2,
    prompt: q(
      'GROUP BY flavor returns 6 groups for a stand that sells 4 flavors. What is the most likely cause?',
      'يُرجع GROUP BY flavor ست مجموعات لكشك يبيع 4 نكهات. ما السبب الأرجح؟',
      'GROUP BY flavor برای غرفه‌ای که ۴ طعم می‌فروشد ۶ گروه برمی‌گرداند. محتمل‌ترین علت چیست؟',
    ),
    options: [
      q('The stand added two new flavors', 'أضاف الكشك نكهتين جديدتين', 'غرفه دو طعم جدید اضافه کرده است'),
      q('GROUP BY counts NULLs as extra groups', 'يعدّ GROUP BY القيم NULL مجموعات إضافية', 'GROUP BY مقدارهای NULL را گروه اضافه حساب می‌کند'),
      q('The same flavor is stored with different spelling, case or spaces', 'النكهة نفسها مخزّنة بتهجئة أو حالة أحرف أو مسافات مختلفة', 'یک طعم با املا، حروف بزرگ و کوچک یا فاصله‌های متفاوت ذخیره شده است'),
    ],
  },
  {
    id: 'w04-q005',
    weekId: 'week-04',
    topic: 'dirty-data',
    answer: 0,
    prompt: q(
      'Row 15 says 0 Peach jars on 1 January 2024, the day the till was installed. What kind of problem is it?',
      'يقول الصف 15 إن برطمانات الخوخ 0 في 1 يناير 2024، يوم تركيب جهاز الدفع. ما نوع المشكلة؟',
      'سطر ۱۵ می‌گوید در ۱ ژانویهٔ ۲۰۲۴، روز نصب صندوق، ۰ شیشه هلو فروخته شده. این چه نوع مشکلی است؟',
    ),
    options: [
      q('Disguised missing data: a placeholder that looks like a real value', 'بيانات مفقودة متنكّرة: قيمة مؤقتة تبدو كقيمة حقيقية', 'دادهٔ گمشدهٔ پنهان: یک مقدار جایگزین که شبیه مقدار واقعی است'),
      q('An outlier', 'قيمة متطرفة', 'دادهٔ پرت'),
      q('A schema integration problem', 'مشكلة دمج مخطط', 'مشکل یکپارچه‌سازی طرح‌واره'),
    ],
  },
  {
    id: 'w04-q006',
    weekId: 'week-04',
    topic: 'cleaning-process',
    answer: 1,
    prompt: q(
      'Why clean a copy of the export and keep a change log, instead of editing the raw file directly?',
      'لماذا ننظّف نسخة من التصدير ونحتفظ بسجل تغييرات، بدلًا من تعديل الملف الخام مباشرة؟',
      'چرا یک کپی از خروجی را پاک‌سازی می‌کنیم و گزارش تغییرات نگه می‌داریم، به‌جای ویرایش مستقیم فایل خام؟',
    ),
    options: [
      q('It makes the queries run faster', 'لأنه يجعل الاستعلامات أسرع', 'چون کوئری‌ها سریع‌تر اجرا می‌شوند'),
      q('So anyone can check every fix and undo one if it turns out wrong', 'حتى يستطيع أي شخص التحقق من كل إصلاح والتراجع عنه إن تبيّن أنه خاطئ', 'تا هر کسی بتواند هر اصلاح را بررسی کند و اگر غلط بود برگرداند'),
      q('Because raw files cannot be edited', 'لأن الملفات الخام لا يمكن تعديلها', 'چون فایل‌های خام قابل ویرایش نیستند'),
    ],
  },
  {
    id: 'w04-q007',
    weekId: 'week-04',
    topic: 'missing-data',
    answer: 2,
    prompt: q(
      "Blueberry's 11 May units are blank. Other Blueberry days average 16, and the stand's paper log says 12. What is the best fix?",
      'وحدات Blueberry في 11 مايو فارغة. متوسط أيام Blueberry الأخرى 16، وسجل الكشك الورقي يقول 12. ما أفضل إصلاح؟',
      'واحدهای Blueberry در ۱۱ مه خالی است. میانگین روزهای دیگر Blueberry ۱۶ است و دفتر کاغذی غرفه می‌گوید ۱۲. بهترین اصلاح چیست؟',
    ),
    options: [
      q('Fill in 16, the Blueberry average', 'املأها بـ 16، متوسط Blueberry', '۱۶، میانگین Blueberry، را بگذار'),
      q('Delete the row', 'احذف الصف', 'سطر را حذف کن'),
      q('Fill in 12 from the paper log, and note it in the change log', 'املأها بـ 12 من السجل الورقي، واذكر ذلك في سجل التغييرات', '۱۲ را از دفتر کاغذی بگذار و در گزارش تغییرات بنویس'),
    ],
  },
  {
    id: 'w04-q008',
    weekId: 'week-04',
    topic: 'noisy-data',
    answer: 1,
    prompt: q(
      'Strawberry shows 180 jars on 18 May; every other Strawberry day is between 22 and 35. What should you do?',
      'تُظهر Strawberry ‏180 برطمانًا في 18 مايو؛ وكل أيام Strawberry الأخرى بين 22 و35. ماذا تفعل؟',
      'Strawberry در ۱۸ مه ۱۸۰ شیشه نشان می‌دهد؛ همهٔ روزهای دیگر Strawberry بین ۲۲ و ۳۵ است. چه کار باید بکنی؟',
    ),
    options: [
      q('Delete it: outliers are always errors', 'احذفها: القيم المتطرفة أخطاء دائمًا', 'حذفش کن: داده‌های پرت همیشه خطا هستند'),
      q('Check it with the owner or the receipts before changing it', 'تحقق منها مع المالك أو الإيصالات قبل تغييرها', 'پیش از تغییر، آن را با مالک یا رسیدها بررسی کن'),
      q('Keep it: the till is always right', 'أبقها: جهاز الدفع دائمًا محق', 'نگهش دار: صندوق همیشه درست می‌گوید'),
    ],
  },
  {
    id: 'w04-q009',
    weekId: 'week-04',
    topic: 'integration',
    answer: 0,
    prompt: q(
      "The supplier's sheet lists 'Blue berry' at 600 (cents); your table has 'Blueberry' in dollars. Which two integration problems are these?",
      "تذكر ورقة المورّد 'Blue berry' بسعر 600 (سنت)؛ وجدولك فيه 'Blueberry' بالدولار. ما مشكلتا الدمج هاتان؟",
      "برگهٔ تأمین‌کننده 'Blue berry' را با قیمت ۶۰۰ (سنت) آورده؛ جدول تو 'Blueberry' را به دلار دارد. این دو کدام مشکل یکپارچه‌سازی‌اند؟",
    ),
    options: [
      q('Entity identification and a value conflict (different units)', 'تحديد الكيان وتعارض القيم (وحدات مختلفة)', 'شناسایی موجودیت و تعارض مقدار (واحدهای متفاوت)'),
      q('A missing value and a duplicate', 'قيمة مفقودة وتكرار', 'یک مقدار گمشده و یک تکرار'),
      q('An outlier and noise', 'قيمة متطرفة وضوضاء', 'دادهٔ پرت و نویز'),
    ],
  },
  {
    id: 'w04-q010',
    weekId: 'week-04',
    topic: 'transformation',
    answer: 2,
    prompt: q(
      'Monthly totals run from 16 (January) to 108 (July). After min-max normalization, what is July?',
      'تتراوح الإجماليات الشهرية من 16 (يناير) إلى 108 (يوليو). بعد تطبيع min-max، ما قيمة يوليو؟',
      'مجموع‌های ماهانه از ۱۶ (ژانویه) تا ۱۰۸ (ژوئیه) است. پس از نرمال‌سازی min-max، مقدار ژوئیه چند است؟',
    ),
    options: [q('108', '108', '108'), q('0.5', '0.5', '0.5'), q('1', '1', '1')],
  },
  {
    id: 'w04-q011',
    weekId: 'week-04',
    topic: 'discretization',
    answer: 1,
    prompt: q(
      'Replacing each day\'s units_sold with the label slow, normal or busy is an example of…',
      'استبدال units_sold لكل يوم بالتسمية بطيء أو عادي أو مزدحم مثال على…',
      'جایگزین کردن units_sold هر روز با برچسب کند، عادی یا شلوغ نمونه‌ای از… است',
    ),
    options: [
      q('Normalization', 'التطبيع', 'نرمال‌سازی'),
      q('Discretization', 'التقطيع (التحويل إلى فئات)', 'گسسته‌سازی'),
      q('Integration', 'الدمج', 'یکپارچه‌سازی'),
    ],
  },
  {
    id: 'w04-q012',
    weekId: 'week-04',
    topic: 'tools-and-ai',
    answer: 0,
    prompt: q(
      'An AI assistant cleans the export and replies "Done: 12 clean rows". You expected 13. What do you do?',
      'ينظّف مساعد ذكاء اصطناعي التصدير ويرد "تم: 12 صفًا نظيفًا". كنت تتوقع 13. ماذا تفعل؟',
      'یک دستیار هوش مصنوعی خروجی را پاک‌سازی می‌کند و جواب می‌دهد «تمام شد: ۱۲ سطر تمیز». تو انتظار ۱۳ را داشتی. چه می‌کنی؟',
    ),
    options: [
      q('Find which row it dropped and why, before using its result', 'اعرف أي صف حذفه ولماذا، قبل استخدام نتيجته', 'پیش از استفاده از نتیجه، بفهم کدام سطر را حذف کرده و چرا'),
      q('Trust it: the AI saw something you missed', 'ثق به: رأى الذكاء الاصطناعي شيئًا فاتك', 'به آن اعتماد کن: هوش مصنوعی چیزی دیده که تو ندیدی'),
      q('Ask it again until it says 13', 'اسأله مجددًا حتى يقول 13', 'دوباره بپرس تا بگوید ۱۳'),
    ],
  },
]

const t = (en: string, ar: string, fa: string) => ({ en, ar, fa })

const toolTabs = (sqlCode: string[], pyCode: string[], pbi: { en: string; ar: string; fa: string }) => ({
  type: 'tabs' as const,
  tabs: [
    { label: t('SQL (PostgreSQL)', 'SQL ‏(PostgreSQL)', 'SQL ‏(PostgreSQL)'), blocks: sqlCode.map((code) => ({ type: 'code' as const, code })) },
    { label: t('Python (Colab)', 'Python ‏(Colab)', 'Python ‏(Colab)'), blocks: pyCode.map((code) => ({ type: 'code' as const, code })) },
    { label: t('Power BI (Power Query)', 'Power BI ‏(Power Query)', 'Power BI ‏(Power Query)'), blocks: [{ type: 'html' as const, html: pbi }] },
  ],
})

const rawRows = [
  ['1', 'Strawberry', '2024-05-04', '22', ''],
  ['2', 'blueberry', '2024-05-04', '15', 'case'],
  ['3', 'Peach', '04/05/2024', '10', 'date format'],
  ['4', '"Strawberry "', '2024-05-11', '25', 'trailing space'],
  ['5', 'Blueberry', '2024-05-11', 'NULL', 'missing'],
  ['6', 'Peach', '2024-05-11', '8', ''],
  ['7', 'Strawberry', '2024-05-18', '180', 'outlier'],
  ['8', 'Blueberry', '2024-05-18', '17', ''],
  ['9', 'Peach', '2024-05-18', '-12', 'invalid'],
  ['10', 'Strawberry', '2024-05-25', '35', ''],
  ['11', 'Blueberry', '2024-05-25', '16', ''],
  ['12', 'Peach', '2024-05-25', '10', ''],
  ['13', 'Lemon', '2024-05-25', '9', 'no price'],
  ['14', 'Strawberry', '2024-05-25', '35', 'duplicate of 10'],
  ['15', 'Peach', '2024-01-01', '0', 'test row'],
]
const problemLabel: Record<string, { en: string; ar: string; fa: string }> = {
  '': t('', '', ''),
  case: t('lower case', 'حروف صغيرة', 'حروف کوچک'),
  'date format': t('date format', 'صيغة التاريخ', 'قالب تاریخ'),
  'trailing space': t('trailing space', 'مسافة زائدة', 'فاصلهٔ اضافه'),
  missing: t('missing', 'مفقود', 'گمشده'),
  outlier: t('outlier?', 'قيمة متطرفة؟', 'دادهٔ پرت؟'),
  invalid: t('negative', 'سالب', 'منفی'),
  'no price': t('no price yet', 'بلا سعر بعد', 'هنوز بدون قیمت'),
  'duplicate of 10': t('duplicate of 10', 'تكرار للصف 10', 'تکرار سطر ۱۰'),
  'test row': t('till test row', 'صف اختبار الجهاز', 'سطر آزمایشی صندوق'),
}
const rawTableRows = rawRows.map(([id, flavor, date, units, problem]) => [
  { en: id },
  { en: `<code>${flavor}</code>` },
  { en: `<code>${date}</code>` },
  { en: units },
  problemLabel[problem],
])

export const weekFour: Week = {
  id: 'week-04',
  originalPdf: '/originals/week-04.pdf',
  order: 4,
  cover: {
    kicker: t('Business Analytics 2 · Week 4', 'تحليلات الأعمال 2 · الأسبوع 4', 'تحلیل کسب‌وکار ۲ · هفته ۴'),
    titleHtml: t(
      '<h1>Data Preparation:<em>Understanding, Cleaning and Transforming Data</em></h1><p class="lede">Every clean table you used in Weeks 1–3 started life as a messy export. This week you learn to profile data, find what is wrong with it, fix it without losing anything, combine it with other sources, and reshape it so the analysis on top of it can be trusted.</p>',
      '<h1>تحضير البيانات:<em>فهم البيانات وتنظيفها وتحويلها</em></h1><p class="lede">كل جدول نظيف استخدمته في الأسابيع 1–3 بدأ حياته كتصدير فوضوي. هذا الأسبوع تتعلّم فحص البيانات، واكتشاف ما فيها من أخطاء، وإصلاحها دون فقدان شيء، ودمجها مع مصادر أخرى، وإعادة تشكيلها حتى يمكن الوثوق بالتحليل المبني عليها.</p>',
      '<h1>آماده‌سازی داده:<em>شناخت، پاک‌سازی و تبدیل داده</em></h1><p class="lede">هر جدول تمیزی که در هفته‌های ۱ تا ۳ استفاده کردی، زندگی‌اش را به‌صورت یک خروجی نامرتب شروع کرده است. این هفته یاد می‌گیری داده را پروفایل کنی، ایرادهایش را پیدا کنی، بدون از دست دادن چیزی درستش کنی، با منابع دیگر ترکیبش کنی و شکلش را طوری تغییر دهی که بتوان به تحلیلِ روی آن اعتماد کرد.</p>',
    ),
    timeEstimate: t(
      '≈ 90 min · reading + SQL, Python and Power BI practice',
      '≈ ٩٠ دقيقة · قراءة وتدريب SQL وPython وPower BI',
      '≈ ۹۰ دقیقه · مطالعه و تمرین SQL، Python و Power BI',
    ),
  },
  questions,
  sections: [
    {
      id: 'welcome',
      navLabel: t('Welcome', 'ترحيب', 'خوش‌آمدید'),
      sectionLabel: t('Section 01', 'القسم ٠١', 'بخش ۰۱'),
      timeEst: t('6 min', '٦ دقائق', '۶ دقیقه'),
      headingHtml: t(
        '<h2>Welcome: a table that looks fine is not a clean table</h2><p class="standfirst">The jam stand\'s new till exports every sale. Add up May and you get 370 jars. Week 2\'s hand-checked table said 209. Both came from the same market days. This week is about finding out which number to trust, and why.</p>',
        '<h2>ترحيب: الجدول الذي يبدو سليمًا ليس جدولًا نظيفًا</h2><p class="standfirst">يصدّر جهاز الدفع الجديد في كشك المربى كل عملية بيع. اجمع شهر مايو تحصل على 370 برطمانًا. جدول الأسبوع 2 المراجَع يدويًا قال 209. كلاهما من أيام السوق نفسها. هذا الأسبوع يدور حول معرفة أي رقم نثق به، ولماذا.</p>',
        '<h2>خوش‌آمدید: جدولی که درست به نظر می‌رسد جدول تمیزی نیست</h2><p class="standfirst">صندوق جدید غرفهٔ مربا هر فروش را خروجی می‌گیرد. ماه مه را جمع بزن، ۳۷۰ شیشه می‌شود. جدول هفتهٔ ۲ که دستی بررسی شده بود ۲۰۹ می‌گفت. هر دو از همان روزهای بازار آمده‌اند. این هفته دربارهٔ این است که بفهمیم به کدام عدد اعتماد کنیم و چرا.</p>',
      ),
      blocks: [
        {
          type: 'objectives',
          label: t("By the end, you'll be able to", 'بنهاية هذا القسم ستكون قادرًا على', 'در پایان این بخش می‌توانی'),
          items: [
            t('Explain what data preparation is and why it comes before any analysis', 'شرح ما هو تحضير البيانات ولماذا يأتي قبل أي تحليل', 'توضیح دهی آماده‌سازی داده چیست و چرا پیش از هر تحلیلی می‌آید'),
            t('Profile a table: count rows, blanks, distinct values and ranges to judge its quality', 'فحص جدول: عدّ الصفوف والفراغات والقيم المميزة والمدى للحكم على جودته', 'یک جدول را پروفایل کنی: شمارش سطرها، خانه‌های خالی، مقدارهای یکتا و بازه‌ها برای قضاوت دربارهٔ کیفیتش'),
            t('Recognize incomplete, noisy, inconsistent and disguised-missing data, and fix each safely', 'التعرّف على البيانات الناقصة والمشوّشة وغير المتسقة والمفقودة المتنكّرة، وإصلاح كل منها بأمان', 'دادهٔ ناقص، نویزی، ناسازگار و گمشدهٔ پنهان را بشناسی و هر کدام را با خیال راحت درست کنی'),
            t('Combine data from two sources whose names and units disagree', 'دمج بيانات من مصدرين تختلف أسماؤهما ووحداتهما', 'داده‌های دو منبع را که نام‌ها و واحدهایشان با هم نمی‌خواند ترکیب کنی'),
            t('Transform data with new columns, normalization, discretization and concept hierarchies', 'تحويل البيانات بأعمدة جديدة وتطبيع وتقطيع وتسلسلات مفاهيمية', 'داده را با ستون‌های جدید، نرمال‌سازی، گسسته‌سازی و سلسله‌مراتب مفهومی تبدیل کنی'),
          ],
        },
        {
          type: 'html',
          html: t(
            '<p>Here is the raw May export, exactly as the till produced it. The last column is not in the export: it is what you will have found by the end of Section 4. Every section this week uses this one table, and the worked example in Section 12 cleans it back to Week 2\'s 13 rows and 209 jars.</p>',
            '<p>هذا هو تصدير مايو الخام كما أخرجه جهاز الدفع تمامًا. العمود الأخير ليس في التصدير: إنه ما ستكون قد اكتشفته بنهاية القسم 4. كل أقسام هذا الأسبوع تستخدم هذا الجدول وحده، ويعيده المثال التطبيقي في القسم 12 إلى صفوف الأسبوع 2 الثلاثة عشر و209 برطمانات.</p>',
            '<p>این خروجی خام ماه مه است، دقیقاً همان‌طور که صندوق تولیدش کرده. ستون آخر در خروجی نیست: چیزی است که تا پایان بخش ۴ پیدا خواهی کرد. همهٔ بخش‌های این هفته از همین یک جدول استفاده می‌کنند و مثال حل‌شده در بخش ۱۲ آن را به ۱۳ سطر و ۲۰۹ شیشهٔ هفتهٔ ۲ برمی‌گرداند.</p>',
          ),
        },
        {
          type: 'table',
          headers: [t('id', 'id', 'id'), t('flavor', 'flavor', 'flavor'), t('market_date', 'market_date', 'market_date'), t('units_sold', 'units_sold', 'units_sold'), t('Problem (found later)', 'المشكلة (تُكتشف لاحقًا)', 'مشکل (بعداً پیدا می‌شود)')],
          rows: rawTableRows,
        },
        { type: 'code', code: sql.raw },
        {
          type: 'box',
          variant: 'keypoint',
          label: t('Bridge from Weeks 2–3', 'جسر من الأسبوعين 2–3', 'پل از هفته‌های ۲ و ۳'),
          html: t(
            '<p>Weeks 2 and 3 handed you clean tables and asked the right questions of them. Real data never arrives clean. If the 180-jar typo had stayed in, every average, chart and recommendation you built would have been wrong without any error message.</p>',
            '<p>قدّم لك الأسبوعان 2 و3 جداول نظيفة وطرحا عليها الأسئلة الصحيحة. البيانات الحقيقية لا تصل نظيفة أبدًا. لو بقي خطأ الـ180 برطمانًا، لكان كل متوسط ورسم وتوصية بنيتها خاطئًا دون أي رسالة خطأ.</p>',
            '<p>هفته‌های ۲ و ۳ جدول‌های تمیز به تو دادند و سؤال‌های درست را از آن‌ها پرسیدند. دادهٔ واقعی هیچ‌وقت تمیز نمی‌رسد. اگر خطای تایپی ۱۸۰ شیشه می‌ماند، هر میانگین، نمودار و توصیه‌ای که می‌ساختی بدون هیچ پیام خطایی غلط می‌شد.</p>',
          ),
        },
        { type: 'exercise', questionId: 'w04-q001' },
      ],
    },
    {
      id: 'why-prepare',
      navLabel: t('Why prepare data', 'لماذا نحضّر البيانات', 'چرا داده را آماده می‌کنیم'),
      sectionLabel: t('Section 02', 'القسم ٠٢', 'بخش ۰۲'),
      timeEst: t('6 min', '٦ دقائق', '۶ دقیقه'),
      headingHtml: t(
        '<h2>Why prepare data: good analysis needs good ingredients</h2><p class="standfirst">Data preparation is cleaning and transforming raw data before you analyze it: correcting errors, reformatting, and combining datasets so they are fit for reports, charts and models.</p>',
        '<h2>لماذا نحضّر البيانات: التحليل الجيد يحتاج مكوّنات جيدة</h2><p class="standfirst">تحضير البيانات هو تنظيف البيانات الخام وتحويلها قبل تحليلها: تصحيح الأخطاء، وإعادة التنسيق، ودمج مجموعات البيانات لتصبح صالحة للتقارير والرسوم والنماذج.</p>',
        '<h2>چرا داده را آماده می‌کنیم: تحلیل خوب مواد اولیهٔ خوب می‌خواهد</h2><p class="standfirst">آماده‌سازی داده یعنی پاک‌سازی و تبدیل دادهٔ خام پیش از تحلیل: اصلاح خطاها، تغییر قالب و ترکیب مجموعه‌داده‌ها تا برای گزارش، نمودار و مدل مناسب شوند.</p>',
      ),
      blocks: [
        {
          type: 'box',
          variant: 'analogy',
          label: t('Analogy', 'تشبيه', 'تشبیه'),
          html: t(
            '<p>Chefs call it <em>mise en place</em>: wash, peel and measure everything before the stove is on. Nobody notices it in the finished dish, but skip it and you find the rotten tomato halfway through cooking. Data preparation is the analyst\'s mise en place.</p>',
            '<p>يسمّيها الطهاة <em>mise en place</em>: اغسل وقشّر وقِس كل شيء قبل إشعال الموقد. لا يلاحظها أحد في الطبق النهائي، لكن إن تخطّيتها ستكتشف الطماطم الفاسدة في منتصف الطبخ. تحضير البيانات هو الـ mise en place الخاص بالمحلّل.</p>',
            '<p>آشپزها به آن <em>mise en place</em> می‌گویند: پیش از روشن کردن اجاق همه چیز را بشوی، پوست بکن و پیمانه کن. کسی آن را در غذای نهایی نمی‌بیند، اما اگر جا بیندازی‌اش، وسط پخت به گوجهٔ خراب می‌رسی. آماده‌سازی داده همان mise en place تحلیل‌گر است.</p>',
          ),
        },
        {
          type: 'html',
          html: t(
            '<h3>Three benefits</h3><ul><li><strong>Fix errors early.</strong> Mistakes are easiest to understand while you are still close to the source. Once the export has fed three charts and a report, finding the 180 typo means redoing all of them.</li><li><strong>Produce high-quality data.</strong> Cleaning and reformatting means every number in the analysis is one you can defend.</li><li><strong>Make better decisions, faster.</strong> Trusted data can be analyzed quickly, so decisions are both quicker and better.</li></ul><h3>The six steps</h3><p>The deck lists six steps. You will rarely do them strictly in this order (cleaning often sends you back to profiling), but each answers a different question:</p>',
            '<h3>ثلاث فوائد</h3><ul><li><strong>إصلاح الأخطاء مبكرًا.</strong> أسهل وقت لفهم الأخطاء هو حين تكون قريبًا من المصدر. بعد أن يغذّي التصدير ثلاثة رسوم وتقريرًا، يعني اكتشاف خطأ الـ180 إعادة كل ذلك.</li><li><strong>إنتاج بيانات عالية الجودة.</strong> التنظيف وإعادة التنسيق يعنيان أن كل رقم في التحليل رقم تستطيع الدفاع عنه.</li><li><strong>قرارات أفضل وأسرع.</strong> البيانات الموثوقة تُحلَّل بسرعة، فتكون القرارات أسرع وأفضل.</li></ul><h3>الخطوات الست</h3><p>يذكر العرض ست خطوات. نادرًا ما تنفّذها بهذا الترتيب حرفيًا (فالتنظيف يعيدك غالبًا إلى الفحص)، لكن كل خطوة تجيب عن سؤال مختلف:</p>',
            '<h3>سه فایده</h3><ul><li><strong>اصلاح زودهنگام خطاها.</strong> خطاها وقتی هنوز به منبع نزدیکی راحت‌تر فهمیده می‌شوند. وقتی خروجی به سه نمودار و یک گزارش راه یافت، پیدا کردن خطای ۱۸۰ یعنی دوباره‌کاری همهٔ آن‌ها.</li><li><strong>تولید دادهٔ باکیفیت.</strong> پاک‌سازی و تغییر قالب یعنی هر عددی در تحلیل عددی است که می‌توانی از آن دفاع کنی.</li><li><strong>تصمیم‌های بهتر و سریع‌تر.</strong> دادهٔ قابل‌اعتماد سریع تحلیل می‌شود، پس تصمیم‌ها هم سریع‌تر و هم بهترند.</li></ul><h3>شش گام</h3><p>اسلایدها شش گام را فهرست می‌کنند. به‌ندرت دقیقاً به همین ترتیب انجامشان می‌دهی (پاک‌سازی اغلب تو را به پروفایل‌سازی برمی‌گرداند)، اما هر کدام به سؤال متفاوتی پاسخ می‌دهد:</p>',
          ),
        },
        {
          type: 'diagram',
          fig: t('Figure 1', 'الشكل 1', 'شکل ۱'),
          title: t('The six data preparation steps, each with its jam stand question', 'خطوات تحضير البيانات الست، لكل منها سؤالها في كشك المربى', 'شش گام آماده‌سازی داده، هر کدام با سؤالش در غرفهٔ مربا'),
          src: '/figures/week-04/diagram-01.svg',
          alt: 'Six numbered boxes: profiling, discretization, cleaning, integration, transformation and reduction, each with the question it answers for the jam stand export',
          caption: t(
            'Profiling and cleaning are where most of this week goes. Reduction (keeping only the rows and columns you need) is named here and returns with modelling later in the course.',
            'يذهب معظم هذا الأسبوع إلى الفحص والتنظيف. أما التقليص (الإبقاء على الصفوف والأعمدة التي تحتاجها فقط) فيُذكر هنا ويعود مع النمذجة لاحقًا في المقرر.',
            'بیشتر این هفته صرف پروفایل‌سازی و پاک‌سازی می‌شود. کاهش (نگه داشتن فقط سطرها و ستون‌های لازم) اینجا نام برده می‌شود و بعداً همراه مدل‌سازی در دوره برمی‌گردد.',
          ),
        },
        { type: 'exercise', questionId: 'w04-q002' },
      ],
    },
    {
      id: 'profiling',
      navLabel: t('Data profiling', 'فحص البيانات', 'پروفایل‌سازی داده'),
      sectionLabel: t('Section 03', 'القسم ٠٣', 'بخش ۰۳'),
      timeEst: t('10 min', '١٠ دقائق', '۱۰ دقیقه'),
      headingHtml: t(
        '<h2>Data profiling: a check-up before the treatment</h2><p class="standfirst">Profiling means auditing the data you have: how many rows, how many blanks, how many distinct values, what ranges. You are not fixing anything yet; you are finding out how healthy the data is.</p>',
        '<h2>فحص البيانات: كشف طبي قبل العلاج</h2><p class="standfirst">الفحص يعني تدقيق البيانات التي لديك: كم صفًا، وكم فراغًا، وكم قيمة مميزة، وما المدى. لا تصلح شيئًا بعد؛ بل تعرف مدى سلامة البيانات.</p>',
        '<h2>پروفایل‌سازی داده: معاینه پیش از درمان</h2><p class="standfirst">پروفایل‌سازی یعنی ممیزی داده‌ای که داری: چند سطر، چند خانهٔ خالی، چند مقدار یکتا، چه بازه‌هایی. هنوز چیزی را درست نمی‌کنی؛ داری می‌فهمی داده چقدر سالم است.</p>',
      ),
      blocks: [
        {
          type: 'html',
          html: t(
            '<h3>What "quality" means</h3><p>The deck measures data quality with two big ideas, <strong>accuracy</strong> and <strong>uniqueness</strong>. Accuracy breaks down into:</p><ul><li><strong>Integrity</strong>: the data represents every real sale and only real sales. It needs <em>completeness</em> (no missing values or missing rows) and <em>validity</em> (no rule is broken: units can\'t be negative, dates must be real dates).</li><li><strong>Consistency</strong>: the same thing is written the same way everywhere (Blueberry, not sometimes blueberry), and sources don\'t contradict each other.</li><li><strong>Density</strong>: how much of what should be filled in actually is.</li></ul><p><strong>Uniqueness</strong> means each real sale appears once. One caution from the deck: <em>you don\'t know what you don\'t know</em>. A sale that was never recorded leaves no trace in the table, so completeness can only be checked against another source, like the paper log.</p>',
            '<h3>ماذا تعني "الجودة"</h3><p>يقيس العرض جودة البيانات بفكرتين كبيرتين: <strong>الدقة</strong> و<strong>التفرّد</strong>. وتنقسم الدقة إلى:</p><ul><li><strong>السلامة</strong>: تمثّل البيانات كل عملية بيع حقيقية ولا شيء غيرها. وتحتاج إلى <em>الاكتمال</em> (لا قيم مفقودة ولا صفوف مفقودة) و<em>الصلاحية</em> (لا قاعدة مكسورة: لا يمكن أن تكون الوحدات سالبة، ويجب أن تكون التواريخ حقيقية).</li><li><strong>الاتساق</strong>: يُكتب الشيء نفسه بالطريقة نفسها في كل مكان (Blueberry، لا blueberry أحيانًا)، ولا تتناقض المصادر.</li><li><strong>الكثافة</strong>: كم مما يجب ملؤه مملوء فعلًا.</li></ul><p><strong>التفرّد</strong> يعني أن كل عملية بيع حقيقية تظهر مرة واحدة. وتحذير من العرض: <em>أنت لا تعرف ما لا تعرفه</em>. عملية البيع التي لم تُسجَّل أصلًا لا تترك أثرًا في الجدول، لذا لا يمكن التحقق من الاكتمال إلا بمصدر آخر، كالسجل الورقي.</p>',
            '<h3>«کیفیت» یعنی چه</h3><p>اسلایدها کیفیت داده را با دو ایدهٔ بزرگ می‌سنجند: <strong>دقت</strong> و <strong>یکتایی</strong>. دقت به این‌ها تقسیم می‌شود:</p><ul><li><strong>یکپارچگی</strong>: داده هر فروش واقعی و فقط فروش‌های واقعی را نشان می‌دهد. به <em>کامل بودن</em> (بدون مقدار یا سطر گمشده) و <em>اعتبار</em> (هیچ قاعده‌ای شکسته نشده: واحدها منفی نیستند، تاریخ‌ها تاریخ واقعی‌اند) نیاز دارد.</li><li><strong>سازگاری</strong>: یک چیز همه‌جا یک‌جور نوشته شده (Blueberry، نه گاهی blueberry) و منابع با هم تناقض ندارند.</li><li><strong>چگالی</strong>: چه مقدار از آنچه باید پر شود واقعاً پر شده است.</li></ul><p><strong>یکتایی</strong> یعنی هر فروش واقعی یک بار آمده باشد. یک هشدار از اسلایدها: <em>نمی‌دانی چه چیزی را نمی‌دانی</em>. فروشی که هرگز ثبت نشده در جدول ردی نمی‌گذارد، پس کامل بودن را فقط با یک منبع دیگر، مثل دفتر کاغذی، می‌شود سنجید.</p>',
          ),
        },
        {
          type: 'box',
          variant: 'analogy',
          label: t('Analogy', 'تشبيه', 'تشبیه'),
          html: t(
            '<p>A doctor takes your temperature, pulse and blood pressure before prescribing anything. COUNT, COUNT(column), COUNT(DISTINCT) and MIN/MAX are the data\'s temperature and pulse: quick, cheap, and they tell you where to look.</p>',
            '<p>يقيس الطبيب حرارتك ونبضك وضغطك قبل أن يصف أي شيء. COUNT وCOUNT(column) وCOUNT(DISTINCT) وMIN/MAX هي حرارة البيانات ونبضها: سريعة ورخيصة وتخبرك أين تنظر.</p>',
            '<p>پزشک پیش از نوشتن هر نسخه‌ای دما، نبض و فشار خونت را می‌گیرد. COUNT، COUNT(column)، COUNT(DISTINCT) و MIN/MAX دما و نبض داده‌اند: سریع، ارزان، و می‌گویند کجا را نگاه کنی.</p>',
          ),
        },
        toolTabs(
          [sql.profile, sql.byFlavor],
          [py.setup, py.profile],
          t(
            '<ol><li><em>Home → Get data</em>, load the export, then <em>Transform data</em> to open Power Query.</li><li>On the <em>View</em> tab, tick <strong>Column quality</strong>, <strong>Column distribution</strong> and <strong>Column profile</strong>.</li><li>Column quality shows units_sold as <em>Valid</em>, <em>Error</em> and <em>Empty</em> percentages (one empty). Column distribution shows 6 distinct flavor values. Column profile shows min -12 and max 180.</li><li>By default the profile looks at the first 1,000 rows only; click the status bar and choose <em>Column profiling based on entire data set</em> for big files.</li></ol>',
            '<ol><li><em>Home → Get data</em>، حمّل التصدير، ثم <em>Transform data</em> لفتح Power Query.</li><li>في تبويب <em>View</em>، فعّل <strong>Column quality</strong> و<strong>Column distribution</strong> و<strong>Column profile</strong>.</li><li>يعرض Column quality عمود units_sold بنسب <em>Valid</em> و<em>Error</em> و<em>Empty</em> (خانة فارغة واحدة). ويعرض Column distribution ست قيم مميزة للنكهة. ويعرض Column profile الحد الأدنى -12 والأقصى 180.</li><li>افتراضيًا ينظر الفحص إلى أول 1,000 صف فقط؛ انقر شريط الحالة واختر <em>Column profiling based on entire data set</em> للملفات الكبيرة.</li></ol>',
            '<ol><li><em>Home → Get data</em>، خروجی را بارگذاری کن، سپس <em>Transform data</em> را بزن تا Power Query باز شود.</li><li>در تب <em>View</em>، گزینه‌های <strong>Column quality</strong>، <strong>Column distribution</strong> و <strong>Column profile</strong> را فعال کن.</li><li>Column quality ستون units_sold را با درصدهای <em>Valid</em>، <em>Error</em> و <em>Empty</em> نشان می‌دهد (یک خانهٔ خالی). Column distribution شش مقدار یکتا برای flavor نشان می‌دهد. Column profile کمینه ‎-12 و بیشینه ۱۸۰ را نشان می‌دهد.</li><li>به‌طور پیش‌فرض پروفایل فقط ۱٬۰۰۰ سطر اول را می‌بیند؛ برای فایل‌های بزرگ روی نوار وضعیت کلیک کن و <em>Column profiling based on entire data set</em> را انتخاب کن.</li></ol>',
          ),
        ),
        {
          type: 'html',
          html: t(
            `<p><strong>Prefer a ready-made file?</strong> All of this week's Python is also a notebook: <a href="${notebookUrl}" target="_blank" rel="noopener">open it in Colab</a>, then <em>Runtime → Run all</em>.</p>`,
            `<p><strong>تفضّل ملفًا جاهزًا؟</strong> كل كود Python لهذا الأسبوع متاح أيضًا كدفتر: <a href="${notebookUrl}" target="_blank" rel="noopener">افتحه في Colab</a>، ثم <em>Runtime → Run all</em>.</p>`,
            `<p><strong>فایل آماده می‌خواهی؟</strong> همهٔ کد Python این هفته به‌صورت یک دفترچه هم هست: <a href="${notebookUrl}" target="_blank" rel="noopener">آن را در Colab باز کن</a>، سپس <em>Runtime → Run all</em>.</p>`,
          ),
        },
        {
          type: 'table',
          headers: [t('Profile result', 'نتيجة الفحص', 'نتیجهٔ پروفایل'), t('Value', 'القيمة', 'مقدار'), t('What it hints at', 'إلامَ تشير', 'به چه اشاره دارد')],
          rows: [
            [t('total_rows', 'total_rows', 'total_rows'), t('15', '15', '15'), t('Two more rows than Week 2\'s 13', 'صفان أكثر من صفوف الأسبوع 2 الثلاثة عشر', 'دو سطر بیشتر از ۱۳ سطر هفتهٔ ۲')],
            [t('rows_with_units', 'rows_with_units', 'rows_with_units'), t('14', '14', '14'), t('One blank: completeness', 'خانة فارغة: الاكتمال', 'یک خانهٔ خالی: کامل بودن')],
            [t('distinct_flavors', 'distinct_flavors', 'distinct_flavors'), t('6', '6', '6'), t('4 real flavors spelled 6 ways: consistency', '4 نكهات حقيقية بست تهجئات: الاتساق', '۴ طعم واقعی با ۶ املا: سازگاری')],
            [t('min_units / max_units', 'min_units / max_units', 'min_units / max_units'), t('-12 / 180', '-12 / 180', '-12 / 180'), t('A negative and an extreme value: validity', 'قيمة سالبة وقيمة متطرفة: الصلاحية', 'یک مقدار منفی و یک مقدار افراطی: اعتبار')],
            [t('total_units', 'total_units', 'total_units'), t('370', '370', '370'), t('Far above 209: something is inflating it', 'أعلى بكثير من 209: شيء ما يضخّمه', 'خیلی بیشتر از ۲۰۹: چیزی آن را باد کرده')],
          ],
        },
        {
          type: 'box',
          variant: 'keypoint',
          label: t('Key point', 'نقطة أساسية', 'نکتهٔ کلیدی'),
          html: t(
            '<p>Profiling never changes the data. Five quick numbers turned "370 jars, looks fine" into a list of four things to investigate, before a single chart was drawn.</p>',
            '<p>الفحص لا يغيّر البيانات أبدًا. خمسة أرقام سريعة حوّلت "370 برطمانًا، يبدو سليمًا" إلى قائمة من أربعة أمور يجب التحقيق فيها، قبل رسم أي رسم.</p>',
            '<p>پروفایل‌سازی هیچ‌وقت داده را تغییر نمی‌دهد. پنج عدد سریع «۳۷۰ شیشه، به نظر درست است» را پیش از کشیدن حتی یک نمودار به فهرستی از چهار چیز برای بررسی تبدیل کرد.</p>',
          ),
        },
        { type: 'exercise', questionId: 'w04-q003' },
        { type: 'exercise', questionId: 'w04-q004' },
      ],
    },
    {
      id: 'dirty-data',
      navLabel: t('Dirty data', 'البيانات المتّسخة', 'دادهٔ کثیف'),
      sectionLabel: t('Section 04', 'القسم ٠٤', 'بخش ۰۴'),
      timeEst: t('7 min', '٧ دقائق', '۷ دقیقه'),
      headingHtml: t(
        '<h2>Dirty data: four ways data goes wrong</h2><p class="standfirst">Real-world data is dirty: faulty equipment, typing mistakes, transmission errors and system changes all leave marks. The deck sorts them into four kinds, and the raw export has every one.</p>',
        '<h2>البيانات المتّسخة: أربع طرق تفسد بها البيانات</h2><p class="standfirst">بيانات العالم الحقيقي متّسخة: الأجهزة المعطلة وأخطاء الكتابة وأخطاء النقل وتغييرات الأنظمة كلها تترك آثارًا. يصنّفها العرض إلى أربعة أنواع، وفي التصدير الخام كل واحد منها.</p>',
        '<h2>دادهٔ کثیف: چهار راه خراب شدن داده</h2><p class="standfirst">دادهٔ دنیای واقعی کثیف است: تجهیزات خراب، اشتباه تایپی، خطای انتقال و تغییر سیستم‌ها همه رد می‌گذارند. اسلایدها آن‌ها را چهار دسته می‌کنند و خروجی خام از هر کدام یکی دارد.</p>',
      ),
      blocks: [
        {
          type: 'table',
          headers: [t('Kind', 'النوع', 'نوع'), t('What it means', 'معناه', 'یعنی چه'), t('In the raw export', 'في التصدير الخام', 'در خروجی خام')],
          rows: [
            [t('<strong>Incomplete</strong>', '<strong>ناقصة</strong>', '<strong>ناقص</strong>'), t('Values or whole rows missing', 'قيم أو صفوف كاملة مفقودة', 'مقدارها یا سطرهای کامل گمشده'), t('id 5: units_sold is NULL; Lemon has no price anywhere', 'الصف 5: units_sold قيمته NULL؛ وLemon بلا سعر في أي مكان', 'سطر ۵: units_sold برابر NULL است؛ Lemon هیچ‌جا قیمت ندارد')],
            [t('<strong>Noisy</strong>', '<strong>مشوّشة</strong>', '<strong>نویزی</strong>'), t('Errors or outliers in a measured value', 'أخطاء أو قيم متطرفة في قيمة مقيسة', 'خطا یا دادهٔ پرت در یک مقدار اندازه‌گیری‌شده'), t('id 9: -12 jars (impossible); id 7: 180 jars (suspicious)', 'الصف 9: ‎-12 برطمانًا (مستحيل)؛ الصف 7: 180 برطمانًا (مريب)', 'سطر ۹: ‎-12 شیشه (ناممکن)؛ سطر ۷: ۱۸۰ شیشه (مشکوک)')],
            [t('<strong>Inconsistent</strong>', '<strong>غير متسقة</strong>', '<strong>ناسازگار</strong>'), t('Same thing written differently, or rows contradicting each other', 'الشيء نفسه مكتوب بطرق مختلفة، أو صفوف تتناقض', 'یک چیز به شکل‌های مختلف نوشته شده یا سطرها با هم تناقض دارند'), t('ids 2 and 4: blueberry, "Strawberry "; id 3: 04/05/2024; id 14 duplicates id 10', 'الصفان 2 و4: ‏blueberry و"Strawberry "؛ الصف 3: 04/05/2024؛ الصف 14 يكرّر الصف 10', 'سطرهای ۲ و ۴: blueberry و "Strawberry "؛ سطر ۳: 04/05/2024؛ سطر ۱۴ تکرار سطر ۱۰ است')],
            [t('<strong>Disguised missing</strong>', '<strong>مفقودة متنكّرة</strong>', '<strong>گمشدهٔ پنهان</strong>'), t('A placeholder that looks like a real value (everyone born on 1 January)', 'قيمة مؤقتة تبدو حقيقية (الجميع مولود في 1 يناير)', 'یک مقدار جایگزین که واقعی به نظر می‌رسد (همه متولد ۱ ژانویه)'), t('id 15: 0 Peach on 2024-01-01, the till\'s set-up test', 'الصف 15: ‏0 خوخ في 2024-01-01، اختبار تركيب الجهاز', 'سطر ۱۵: ۰ هلو در 2024-01-01، آزمایش راه‌اندازی صندوق')],
          ],
        },
        {
          type: 'html',
          html: t(
            '<h3>Three families of anomalies</h3><p>The deck also groups problems by <em>where</em> they hurt:</p><ul><li><strong>Syntactic</strong>: the format is wrong (spelling, case, spaces, a date written the wrong way). Fixable by rules.</li><li><strong>Semantic</strong>: the values are well-formed but wrong or redundant (duplicates, a negative quantity, a contradiction). Needs judgement.</li><li><strong>Coverage</strong>: something is missing (a blank value, a missing row, Lemon\'s price). Needs another source.</li></ul><p>Before you fix anything, run the rule checks below: they turn "something is off" into a list of row ids.</p>',
            '<h3>ثلاث عائلات من الشذوذ</h3><p>يجمع العرض المشكلات أيضًا حسب <em>المكان</em> الذي تؤذي فيه:</p><ul><li><strong>تركيبية</strong>: الصيغة خاطئة (تهجئة، حالة أحرف، مسافات، تاريخ مكتوب بطريقة خاطئة). تُصلح بالقواعد.</li><li><strong>دلالية</strong>: القيم سليمة الشكل لكنها خاطئة أو زائدة (تكرار، كمية سالبة، تناقض). تحتاج إلى حكم.</li><li><strong>تغطية</strong>: شيء ما مفقود (قيمة فارغة، صف مفقود، سعر Lemon). يحتاج إلى مصدر آخر.</li></ul><p>قبل أن تصلح أي شيء، شغّل فحوص القواعد أدناه: فهي تحوّل "هناك خطب ما" إلى قائمة بأرقام الصفوف.</p>',
            '<h3>سه خانوادهٔ ناهنجاری</h3><p>اسلایدها مشکلات را بر اساس <em>جایی</em> که آسیب می‌زنند هم دسته‌بندی می‌کنند:</p><ul><li><strong>نحوی</strong>: قالب غلط است (املا، حروف بزرگ و کوچک، فاصله، تاریخی که اشتباه نوشته شده). با قاعده درست می‌شود.</li><li><strong>معنایی</strong>: مقدارها خوش‌فرم‌اند اما غلط یا زائدند (تکرار، مقدار منفی، تناقض). قضاوت لازم دارد.</li><li><strong>پوششی</strong>: چیزی کم است (یک مقدار خالی، یک سطر گمشده، قیمت Lemon). منبع دیگری لازم دارد.</li></ul><p>پیش از اصلاح هر چیزی، بررسی‌های قاعده‌ای زیر را اجرا کن: «یک جای کار می‌لنگد» را به فهرستی از شمارهٔ سطرها تبدیل می‌کنند.</p>',
          ),
        },
        toolTabs(
          [sql.suspicious],
          [py.suspicious],
          t(
            '<ul><li><strong>Blanks and negatives:</strong> click the filter arrow on units_sold: <em>Remove empty</em> shows how many are blank; <em>Number filters → Less than 0</em> isolates the -12.</li><li><strong>Bad dates:</strong> change market_date to type <em>Date</em>; rows that can\'t convert show as <em>Error</em> in Column quality.</li><li><strong>Duplicates:</strong> select flavor, market_date and units_sold, then <em>Home → Keep rows → Keep duplicates</em> to see them (don\'t remove them yet).</li></ul>',
            '<ul><li><strong>الفراغات والقيم السالبة:</strong> انقر سهم التصفية في units_sold: يُظهر <em>Remove empty</em> عدد الفارغ؛ و<em>Number filters → Less than 0</em> يعزل القيمة -12.</li><li><strong>التواريخ الخاطئة:</strong> غيّر نوع market_date إلى <em>Date</em>؛ الصفوف التي لا تتحوّل تظهر كـ <em>Error</em> في Column quality.</li><li><strong>التكرارات:</strong> حدّد flavor وmarket_date وunits_sold، ثم <em>Home → Keep rows → Keep duplicates</em> لرؤيتها (لا تحذفها بعد).</li></ul>',
            '<ul><li><strong>خانه‌های خالی و منفی‌ها:</strong> روی پیکان فیلتر units_sold کلیک کن: <em>Remove empty</em> نشان می‌دهد چند خانه خالی است؛ <em>Number filters → Less than 0</em> عدد ‎-12 را جدا می‌کند.</li><li><strong>تاریخ‌های بد:</strong> نوع market_date را به <em>Date</em> تغییر بده؛ سطرهایی که تبدیل نمی‌شوند در Column quality به‌صورت <em>Error</em> دیده می‌شوند.</li><li><strong>تکرارها:</strong> flavor، market_date و units_sold را انتخاب کن، سپس <em>Home → Keep rows → Keep duplicates</em> را بزن تا ببینی‌شان (هنوز حذفشان نکن).</li></ul>',
          ),
        ),
        { type: 'exercise', questionId: 'w04-q005' },
      ],
    },
    {
      id: 'cleaning-process',
      navLabel: t('The cleaning process', 'عملية التنظيف', 'فرایند پاک‌سازی'),
      sectionLabel: t('Section 05', 'القسم ٠٥', 'بخش ۰۵'),
      timeEst: t('5 min', '٥ دقائق', '۵ دقیقه'),
      headingHtml: t(
        '<h2>The cleaning process: audit, plan, fix, check</h2><p class="standfirst">Data cleaning is detecting and correcting (or removing) corrupt or inaccurate records. It is also called cleansing, scrubbing or reconciliation. Done well, it follows four stages.</p>',
        '<h2>عملية التنظيف: تدقيق، تخطيط، إصلاح، تحقق</h2><p class="standfirst">تنظيف البيانات هو اكتشاف السجلات التالفة أو غير الدقيقة وتصحيحها (أو حذفها). ويسمّى أيضًا التطهير أو التنقية أو المطابقة. وحين يُنجز جيدًا، يمرّ بأربع مراحل.</p>',
        '<h2>فرایند پاک‌سازی: ممیزی، برنامه، اصلاح، کنترل</h2><p class="standfirst">پاک‌سازی داده یعنی پیدا کردن و اصلاح (یا حذف) رکوردهای خراب یا نادرست. به آن تمیزکاری، پالایش یا تطبیق هم می‌گویند. وقتی درست انجام شود، چهار مرحله دارد.</p>',
      ),
      blocks: [
        {
          type: 'html',
          html: t(
            '<ol><li><strong>Data auditing.</strong> Run profiling and rule checks (Sections 3–4) and write down every problem with its row id.</li><li><strong>Workflow specification.</strong> For each problem, decide the cause and the fix <em>before</em> touching the data: "id 7: probably an extra zero; ask the owner".</li><li><strong>Workflow execution.</strong> Apply the fixes to a <em>copy</em> of the data, ideally as a script or a list of Power Query steps you can re-run.</li><li><strong>Post-processing and control.</strong> Re-profile the result. Do the totals make sense? Did any fix create a new problem? Handle the exceptions by hand.</li></ol><p>Throughout, keep a <strong>change log</strong>: what changed, in which row, from what to what, and why. It is what lets someone else trust your clean table.</p>',
            '<ol><li><strong>تدقيق البيانات.</strong> شغّل الفحص وفحوص القواعد (القسمان 3–4) ودوّن كل مشكلة مع رقم صفها.</li><li><strong>تحديد سير العمل.</strong> لكل مشكلة، حدّد السبب والإصلاح <em>قبل</em> لمس البيانات: "الصف 7: على الأرجح صفر زائد؛ اسأل المالك".</li><li><strong>تنفيذ سير العمل.</strong> طبّق الإصلاحات على <em>نسخة</em> من البيانات، ويُفضّل كسكربت أو قائمة خطوات Power Query يمكنك إعادة تشغيلها.</li><li><strong>المعالجة اللاحقة والتحكم.</strong> أعد فحص النتيجة. هل للإجماليات معنى؟ هل خلق أي إصلاح مشكلة جديدة؟ عالج الاستثناءات يدويًا.</li></ol><p>طوال الوقت، احتفظ بـ<strong>سجل تغييرات</strong>: ما الذي تغيّر، وفي أي صف، ومن ماذا إلى ماذا، ولماذا. هو ما يجعل الآخرين يثقون بجدولك النظيف.</p>',
            '<ol><li><strong>ممیزی داده.</strong> پروفایل‌سازی و بررسی‌های قاعده‌ای (بخش‌های ۳ و ۴) را اجرا کن و هر مشکل را با شمارهٔ سطرش بنویس.</li><li><strong>تعیین روند کار.</strong> برای هر مشکل، علت و راه اصلاح را <em>پیش</em> از دست زدن به داده مشخص کن: «سطر ۷: احتمالاً یک صفر اضافه؛ از مالک بپرس».</li><li><strong>اجرای روند کار.</strong> اصلاح‌ها را روی <em>کپی</em> داده اعمال کن، ترجیحاً به‌صورت اسکریپت یا فهرستی از گام‌های Power Query که بتوانی دوباره اجرا کنی.</li><li><strong>پس‌پردازش و کنترل.</strong> نتیجه را دوباره پروفایل کن. آیا مجموع‌ها منطقی‌اند؟ آیا اصلاحی مشکل جدیدی ساخته؟ استثناها را دستی رسیدگی کن.</li></ol><p>در تمام مسیر یک <strong>گزارش تغییرات</strong> نگه دار: چه چیزی، در کدام سطر، از چه به چه و چرا تغییر کرد. همین است که باعث می‌شود دیگران به جدول تمیزت اعتماد کنند.</p>',
          ),
        },
        {
          type: 'box',
          variant: 'analogy',
          label: t('Analogy', 'تشبيه', 'تشبیه'),
          html: t(
            '<p>It is the same as a mechanic\'s job card: inspect the car, write down what is wrong, fix it, test-drive it. A mechanic who fixes things without writing them down can\'t explain the bill.</p>',
            '<p>إنه مثل بطاقة عمل الميكانيكي: افحص السيارة، ودوّن العطل، وأصلحه، ثم جرّب القيادة. الميكانيكي الذي يصلح دون أن يدوّن لا يستطيع شرح الفاتورة.</p>',
            '<p>درست مثل کارت کار مکانیک است: ماشین را بازرسی کن، ایراد را بنویس، تعمیرش کن، تست‌رانندگی کن. مکانیکی که بدون یادداشت تعمیر می‌کند نمی‌تواند صورت‌حساب را توضیح دهد.</p>',
          ),
        },
        { type: 'exercise', questionId: 'w04-q006' },
      ],
    },
    {
      id: 'missing-data',
      navLabel: t('Missing data', 'البيانات المفقودة', 'دادهٔ گمشده'),
      sectionLabel: t('Section 06', 'القسم ٠٦', 'بخش ۰۶'),
      timeEst: t('7 min', '٧ دقائق', '۷ دقیقه'),
      headingHtml: t(
        '<h2>Missing data: fill it from the source if you can</h2><p class="standfirst">Values go missing because equipment fails, someone skips a field, a value is deleted for contradicting another, or nobody thought it mattered at the time. The deck lists six ways to handle a blank; the right one depends on why it is blank.</p>',
        '<h2>البيانات المفقودة: املأها من المصدر إن استطعت</h2><p class="standfirst">تُفقد القيم لأن جهازًا تعطّل، أو تخطّى أحدهم حقلًا، أو حُذفت قيمة لتناقضها مع أخرى، أو لم يظن أحد أنها مهمة حينها. يذكر العرض ست طرق للتعامل مع الفراغ؛ والطريقة الصحيحة تعتمد على سبب الفراغ.</p>',
        '<h2>دادهٔ گمشده: اگر می‌توانی از منبع پرش کن</h2><p class="standfirst">مقدارها گم می‌شوند چون دستگاهی خراب شده، کسی یک فیلد را جا انداخته، مقداری به خاطر تناقض با دیگری حذف شده یا آن موقع کسی فکر نمی‌کرده مهم است. اسلایدها شش راه برای برخورد با خانهٔ خالی می‌گویند؛ راه درست به علت خالی بودن بستگی دارد.</p>',
      ),
      blocks: [
        {
          type: 'table',
          headers: [t('Method', 'الطريقة', 'روش'), t('For id 5 (Blueberry, 11 May)', 'للصف 5 ‏(Blueberry، ‏11 مايو)', 'برای سطر ۵ (Blueberry، ۱۱ مه)'), t('When it is reasonable', 'متى تكون معقولة', 'کی منطقی است')],
          rows: [
            [t('Ignore (drop) the row', 'تجاهل (احذف) الصف', 'نادیده گرفتن (حذف) سطر'), t('Blueberry loses a whole market day', 'يخسر Blueberry يوم سوق كاملًا', 'Blueberry یک روز بازار کامل را از دست می‌دهد'), t('Very few blanks, and you are counting rows, not totals', 'فراغات قليلة جدًا، وأنت تعدّ الصفوف لا الإجماليات', 'خانه‌های خالی خیلی کم و تو سطرها را می‌شماری نه مجموع‌ها را')],
            [t('Fill in manually from the source', 'املأ يدويًا من المصدر', 'پر کردن دستی از منبع'), t('<strong>12</strong>, from the paper log', '<strong>12</strong>، من السجل الورقي', '<strong>۱۲</strong>، از دفتر کاغذی'), t('A trustworthy source exists and there are few blanks: <strong>best here</strong>', 'يوجد مصدر موثوق والفراغات قليلة: <strong>الأفضل هنا</strong>', 'منبع قابل‌اعتماد هست و خانه‌های خالی کم‌اند: <strong>بهترین گزینه اینجا</strong>')],
            [t('A global constant ("unknown")', 'ثابت عام ("unknown")', 'یک ثابت سراسری («unknown»)'), t('Not possible: units must be a number', 'غير ممكن: يجب أن تكون الوحدات رقمًا', 'ممکن نیست: واحدها باید عدد باشند'), t('Text columns, where "unknown" is honest', 'أعمدة نصية، حيث "unknown" صادقة', 'ستون‌های متنی، جایی که «unknown» صادقانه است')],
            [t('The overall mean', 'المتوسط العام', 'میانگین کل'), t('About 32, inflated by the 180 typo', 'نحو 32، يضخّمه خطأ الـ180', 'حدود ۳۲، که خطای ۱۸۰ آن را باد کرده'), t('Only after outliers are fixed, and all rows are alike', 'بعد إصلاح القيم المتطرفة فقط، وعندما تتشابه كل الصفوف', 'فقط پس از اصلاح داده‌های پرت و وقتی همهٔ سطرها شبیه هم‌اند')],
            [t('The mean of the same class', 'متوسط الفئة نفسها', 'میانگین همان دسته'), t('16, the Blueberry average', '16، متوسط Blueberry', '۱۶، میانگین Blueberry'), t('No source to check, and the groups differ: "smarter" than the overall mean', 'لا مصدر للتحقق، والمجموعات مختلفة: "أذكى" من المتوسط العام', 'منبعی برای بررسی نیست و گروه‌ها با هم فرق دارند: «هوشمندتر» از میانگین کل')],
            [t('The most probable value (a model)', 'القيمة الأرجح (نموذج)', 'محتمل‌ترین مقدار (یک مدل)'), t('Overkill for one blank', 'مبالغة لفراغ واحد', 'برای یک خانهٔ خالی زیادی است'), t('Many blanks and good predictors; comes later in the course', 'فراغات كثيرة ومتنبّئات جيدة؛ يأتي لاحقًا في المقرر', 'خانه‌های خالی زیاد و پیش‌بین‌های خوب؛ بعداً در دوره می‌آید')],
          ],
        },
        toolTabs(
          [sql.missing],
          [
            `# Class mean per flavor (16 for Blueberry), shown for comparison only
clean_key = df["flavor"].str.strip().str.title()
print(df.groupby(clean_key)["units_sold"].mean())

# The real fix comes from the paper log:
fixed = df.copy()
fixed.loc[fixed["id"] == 5, "units_sold"] = 12`,
          ],
          t(
            '<ul><li>Right-click the units_sold header → <em>Replace values</em> only replaces text or numbers, not blanks in one specific row, so for a single known value use <em>Add column → Conditional column</em>: if id equals 5 then 12, else units_sold.</li><li>To fill many blanks with a group mean, use <em>Home → Group by</em> flavor (average), merge it back, then the conditional column.</li><li>Every action lands in <em>Applied steps</em>: that list is your change log.</li></ul>',
            '<ul><li>انقر بزر الفأرة الأيمن على عنوان units_sold → ‏<em>Replace values</em> يستبدل النصوص والأرقام فقط، لا الفراغ في صف محدد، لذا لقيمة واحدة معروفة استخدم <em>Add column → Conditional column</em>: إذا كان id يساوي 5 فالقيمة 12، وإلا units_sold.</li><li>لملء فراغات كثيرة بمتوسط المجموعة، استخدم <em>Home → Group by</em> حسب flavor (المتوسط)، وادمجه، ثم العمود الشرطي.</li><li>كل إجراء يظهر في <em>Applied steps</em>: هذه القائمة هي سجل تغييراتك.</li></ul>',
            '<ul><li>کلیک راست روی سرستون units_sold → ‏<em>Replace values</em> فقط متن یا عدد را جایگزین می‌کند، نه خانهٔ خالی در یک سطر خاص؛ پس برای یک مقدار مشخص از <em>Add column → Conditional column</em> استفاده کن: اگر id برابر ۵ بود ۱۲، وگرنه units_sold.</li><li>برای پر کردن خانه‌های خالی زیاد با میانگین گروه، از <em>Home → Group by</em> روی flavor (میانگین) استفاده کن، ادغامش کن و بعد ستون شرطی را بساز.</li><li>هر کاری در <em>Applied steps</em> ثبت می‌شود: همین فهرست گزارش تغییرات توست.</li></ul>',
          ),
        ),
        {
          type: 'box',
          variant: 'mistake',
          label: t('Common mistake', 'خطأ شائع', 'اشتباه رایج'),
          html: t(
            '<p>Filling blanks with 0. Zero is a real number: it says "we sold nothing", which is a different claim from "we don\'t know". COALESCE(units_sold, 0) would quietly cut Blueberry\'s May total by 12 jars.</p>',
            '<p>ملء الفراغات بالصفر. الصفر رقم حقيقي: يقول "لم نبع شيئًا"، وهذا ادعاء مختلف عن "لا نعرف". سيقلّل COALESCE(units_sold, 0) إجمالي Blueberry في مايو بصمت بمقدار 12 برطمانًا.</p>',
            '<p>پر کردن خانه‌های خالی با صفر. صفر یک عدد واقعی است: می‌گوید «هیچ نفروختیم»، که ادعایی متفاوت از «نمی‌دانیم» است. COALESCE(units_sold, 0) بی‌صدا مجموع مه Blueberry را ۱۲ شیشه کم می‌کند.</p>',
          ),
        },
        { type: 'exercise', questionId: 'w04-q007' },
      ],
    },
    {
      id: 'noisy-data',
      navLabel: t('Noise, outliers, duplicates', 'الضوضاء والقيم المتطرفة والتكرار', 'نویز، داده‌های پرت، تکرار'),
      sectionLabel: t('Section 07', 'القسم ٠٧', 'بخش ۰۷'),
      timeEst: t('9 min', '٩ دقائق', '۹ دقیقه'),
      headingHtml: t(
        '<h2>Noise, outliers and duplicates: suspicious is not the same as wrong</h2><p class="standfirst">Noise is random error in a measured value: a faulty sensor, a typing slip, a naming mix-up. Some noise is obviously impossible (-12 jars); some is only unusual (180 jars). The first you can fix by rule; the second needs a human to check.</p>',
        '<h2>الضوضاء والقيم المتطرفة والتكرار: المريب ليس بالضرورة خاطئًا</h2><p class="standfirst">الضوضاء خطأ عشوائي في قيمة مقيسة: مستشعر معطّل، زلّة كتابة، خلط في التسمية. بعض الضوضاء مستحيل بوضوح (‎-12 برطمانًا)؛ وبعضها غير معتاد فقط (180 برطمانًا). الأول تصلحه بقاعدة؛ والثاني يحتاج إنسانًا للتحقق.</p>',
        '<h2>نویز، دادهٔ پرت و تکرار: مشکوک با غلط یکی نیست</h2><p class="standfirst">نویز خطای تصادفی در یک مقدار اندازه‌گیری‌شده است: یک حسگر خراب، یک لغزش تایپی، یک قاطی شدن نام‌ها. بعضی نویزها آشکارا ناممکن‌اند (‎-12 شیشه)؛ بعضی فقط غیرعادی‌اند (۱۸۰ شیشه). اولی را با قاعده درست می‌کنی؛ دومی را باید یک انسان بررسی کند.</p>',
      ),
      blocks: [
        {
          type: 'html',
          html: t(
            '<ul><li><strong>Invalid values</strong> break a rule (units can\'t be negative). id 9\'s -12 is almost certainly a sign slip: fix it to 12 and log it.</li><li><strong>Outliers</strong> are far from the rest. id 7\'s 180 is ten times a normal Strawberry day, which smells like an extra zero, but a big catering order is possible. Ask the owner or check the receipts; here the owner confirms 18.</li><li><strong>Duplicates</strong> are the same event recorded twice. id 14 matches id 10 exactly, and the till log shows one sale exported twice: delete id 14, keep id 10.</li><li><strong>Naming noise</strong> (blueberry, "Strawberry ") is fixed by trimming spaces and standardizing case.</li></ul>',
            '<ul><li><strong>القيم غير الصالحة</strong> تكسر قاعدة (لا يمكن أن تكون الوحدات سالبة). قيمة الصف 9 ‏(‎-12) زلّة إشارة على الأرجح: صحّحها إلى 12 وسجّل ذلك.</li><li><strong>القيم المتطرفة</strong> بعيدة عن البقية. قيمة الصف 7 ‏(180) عشرة أضعاف يوم Strawberry العادي، ما يوحي بصفر زائد، لكن طلبية كبيرة ممكنة. اسأل المالك أو راجع الإيصالات؛ وهنا يؤكد المالك أنها 18.</li><li><strong>التكرارات</strong> هي الحدث نفسه مسجّلًا مرتين. الصف 14 يطابق الصف 10 تمامًا، وسجل الجهاز يُظهر عملية بيع واحدة صُدّرت مرتين: احذف الصف 14 وأبقِ الصف 10.</li><li><strong>ضوضاء التسمية</strong> ‏(blueberry، و"Strawberry ") تُصلح بحذف المسافات وتوحيد حالة الأحرف.</li></ul>',
            '<ul><li><strong>مقدارهای نامعتبر</strong> یک قاعده را می‌شکنند (واحدها نمی‌توانند منفی باشند). ‎-12 در سطر ۹ تقریباً قطعاً یک لغزش علامت است: آن را ۱۲ کن و ثبتش کن.</li><li><strong>داده‌های پرت</strong> از بقیه دورند. ۱۸۰ در سطر ۷ ده برابر یک روز عادی Strawberry است که بوی یک صفر اضافه می‌دهد، اما یک سفارش بزرگ پذیرایی هم ممکن است. از مالک بپرس یا رسیدها را چک کن؛ اینجا مالک ۱۸ را تأیید می‌کند.</li><li><strong>تکرارها</strong> یک رویداد هستند که دو بار ثبت شده‌اند. سطر ۱۴ دقیقاً با سطر ۱۰ یکی است و لاگ صندوق نشان می‌دهد یک فروش دو بار خروجی گرفته شده: سطر ۱۴ را حذف کن و سطر ۱۰ را نگه دار.</li><li><strong>نویز نام‌گذاری</strong> (blueberry و "Strawberry ") با حذف فاصله‌ها و یکسان‌سازی حروف بزرگ و کوچک درست می‌شود.</li></ul>',
          ),
        },
        {
          type: 'html',
          html: t(
            '<h3>Smoothing by binning</h3><p>When noise is small and everywhere, rather than in one bad row, the deck suggests <strong>binning</strong>: sort the values, split them into bins of equal size, and replace each value by its bin\'s mean (or median, or nearest boundary). The 12 priced, cleaned rows sorted are 8, 10, 10, 12 | 12, 15, 16, 17 | 18, 22, 25, 35. Smoothing by bin means turns them into 10, 10, 10, 10 | 15, 15, 15, 15 | 25, 25, 25, 25. You lose detail but keep the shape, which helps when you only care about "low, middle, high". Regression (fitting a line) and clustering (grouping similar values, then spotting the loners) are the deck\'s other smoothing methods; both return later in the course.</p>',
            '<h3>التنعيم بالتجميع في فئات</h3><p>حين تكون الضوضاء صغيرة ومنتشرة في كل مكان، لا في صف سيئ واحد، يقترح العرض <strong>التجميع في فئات</strong>: رتّب القيم، وقسّمها إلى فئات متساوية الحجم، واستبدل كل قيمة بمتوسط فئتها (أو وسيطها، أو أقرب حد). الصفوف المسعّرة النظيفة الاثنا عشر مرتّبة هي 8، 10، 10، 12 | 12، 15، 16، 17 | 18، 22، 25، 35. التنعيم بمتوسطات الفئات يحوّلها إلى 10، 10، 10، 10 | 15، 15، 15، 15 | 25، 25، 25، 25. تخسر التفاصيل لكنك تحتفظ بالشكل، وهذا مفيد حين يهمك "منخفض، متوسط، مرتفع" فقط. الانحدار (ملاءمة خط) والتجميع العنقودي (تجميع القيم المتشابهة ثم رصد الشاذة) هما طريقتا التنعيم الأخريان في العرض؛ وكلاهما يعود لاحقًا في المقرر.</p>',
            '<h3>هموارسازی با دسته‌بندی</h3><p>وقتی نویز کوچک و همه‌جایی است، نه در یک سطر بد، اسلایدها <strong>دسته‌بندی</strong> را پیشنهاد می‌کنند: مقدارها را مرتب کن، به دسته‌های هم‌اندازه تقسیم کن و هر مقدار را با میانگین دسته‌اش (یا میانه یا نزدیک‌ترین مرز) جایگزین کن. ۱۲ سطر قیمت‌دار و تمیز به ترتیب: ۸، ۱۰، ۱۰، ۱۲ | ۱۲، ۱۵، ۱۶، ۱۷ | ۱۸، ۲۲، ۲۵، ۳۵. هموارسازی با میانگین دسته‌ها آن‌ها را به ۱۰، ۱۰، ۱۰، ۱۰ | ۱۵، ۱۵، ۱۵، ۱۵ | ۲۵، ۲۵، ۲۵، ۲۵ تبدیل می‌کند. جزئیات از دست می‌رود اما شکل می‌ماند، که وقتی فقط «کم، متوسط، زیاد» برایت مهم است کمک می‌کند. رگرسیون (برازش یک خط) و خوشه‌بندی (گروه‌بندی مقدارهای مشابه و دیدن تک‌افتاده‌ها) روش‌های دیگر هموارسازی در اسلایدها هستند؛ هر دو بعداً در دوره برمی‌گردند.</p>',
          ),
        },
        toolTabs(
          [
            `-- Standardize names, fix the invalid value, remove the duplicate (on the copy)
UPDATE jam_sales_clean SET flavor = INITCAP(TRIM(flavor));
UPDATE jam_sales_clean SET units_sold = ABS(units_sold) WHERE units_sold < 0;   -- -12 -> 12
UPDATE jam_sales_clean SET units_sold = 18 WHERE id = 7;                        -- confirmed with the owner
DELETE FROM jam_sales_clean WHERE id = 14;                                      -- same sale as id 10`,
          ],
          [
            `fixed["flavor"] = fixed["flavor"].str.strip().str.title()
fixed.loc[fixed["units_sold"] < 0, "units_sold"] = fixed["units_sold"].abs()   # -12 -> 12
fixed.loc[fixed["id"] == 7, "units_sold"] = 18                                 # confirmed with the owner
fixed = fixed.drop_duplicates(subset=["flavor", "market_date", "units_sold"])  # drops id 14, keeps id 10`,
          ],
          t(
            '<ul><li>Select flavor → <em>Transform → Format → Trim</em>, then <em>Format → Capitalize each word</em>.</li><li>units_sold → <em>Transform → Number column → Scientific → Absolute value</em> fixes the sign. For id 7, use a conditional column (if id = 7 then 18).</li><li>Select flavor, market_date and units_sold → <em>Home → Remove rows → Remove duplicates</em>.</li></ul>',
            '<ul><li>حدّد flavor ← <em>Transform → Format → Trim</em>، ثم <em>Format → Capitalize each word</em>.</li><li>units_sold ← <em>Transform → Number column → Scientific → Absolute value</em> يصلح الإشارة. وللصف 7 استخدم عمودًا شرطيًا (إذا كان id = 7 فالقيمة 18).</li><li>حدّد flavor وmarket_date وunits_sold ← <em>Home → Remove rows → Remove duplicates</em>.</li></ul>',
            '<ul><li>flavor را انتخاب کن ← <em>Transform → Format → Trim</em>، سپس <em>Format → Capitalize each word</em>.</li><li>units_sold ← <em>Transform → Number column → Scientific → Absolute value</em> علامت را درست می‌کند. برای سطر ۷ از ستون شرطی استفاده کن (اگر id = 7 آنگاه ۱۸).</li><li>flavor، market_date و units_sold را انتخاب کن ← <em>Home → Remove rows → Remove duplicates</em>.</li></ul>',
          ),
        ),
        {
          type: 'box',
          variant: 'keypoint',
          label: t('Key point', 'نقطة أساسية', 'نکتهٔ کلیدی'),
          html: t(
            '<p>Rules fix the impossible; people check the unusual. Deleting every outlier automatically is how real big days, like a festival weekend, disappear from the data.</p>',
            '<p>القواعد تصلح المستحيل؛ والبشر يتحققون من غير المعتاد. الحذف التلقائي لكل قيمة متطرفة هو كيف تختفي الأيام الكبيرة الحقيقية، كعطلة مهرجان، من البيانات.</p>',
            '<p>قاعده‌ها ناممکن را درست می‌کنند؛ آدم‌ها غیرعادی را بررسی می‌کنند. حذف خودکار همهٔ داده‌های پرت همان راهی است که روزهای بزرگ واقعی، مثل آخر هفتهٔ یک جشنواره، از داده ناپدید می‌شوند.</p>',
          ),
        },
        { type: 'exercise', questionId: 'w04-q008' },
      ],
    },
    {
      id: 'integration',
      navLabel: t('Data integration', 'دمج البيانات', 'یکپارچه‌سازی داده'),
      sectionLabel: t('Section 08', 'القسم ٠٨', 'بخش ۰۸'),
      timeEst: t('8 min', '٨ دقائق', '۸ دقیقه'),
      headingHtml: t(
        '<h2>Data integration: one picture from several sources</h2><p class="standfirst">Integration combines data from different sources into one coherent table, and enrichment adds information you didn\'t have. The stand\'s supplier sends a price sheet, and it finally gives Lemon a price, but nothing about it matches your table out of the box.</p>',
        '<h2>دمج البيانات: صورة واحدة من مصادر عدة</h2><p class="standfirst">يجمع الدمج بيانات من مصادر مختلفة في جدول واحد متماسك، ويضيف الإثراء معلومات لم تكن لديك. يرسل مورّد الكشك ورقة أسعار تعطي Lemon سعرًا أخيرًا، لكن لا شيء فيها يطابق جدولك مباشرة.</p>',
        '<h2>یکپارچه‌سازی داده: یک تصویر از چند منبع</h2><p class="standfirst">یکپارچه‌سازی داده‌های منابع مختلف را در یک جدول منسجم ترکیب می‌کند و غنی‌سازی اطلاعاتی را اضافه می‌کند که نداشتی. تأمین‌کنندهٔ غرفه یک برگهٔ قیمت می‌فرستد که بالاخره به Lemon قیمت می‌دهد، اما هیچ چیزش از اول با جدول تو جور نیست.</p>',
      ),
      blocks: [
        {
          type: 'table',
          headers: [t('Problem (deck name)', 'المشكلة (الاسم في العرض)', 'مشکل (نام در اسلایدها)'), t('In the supplier sheet', 'في ورقة المورّد', 'در برگهٔ تأمین‌کننده'), t('Fix', 'الإصلاح', 'اصلاح')],
          rows: [
            [t('Schema integration', 'دمج المخطط', 'یکپارچه‌سازی طرح‌واره'), t('Column is <code>flavour_name</code>, yours is <code>flavor</code>', 'العمود <code>flavour_name</code>، وعمودك <code>flavor</code>', 'ستون <code>flavour_name</code> است و مال تو <code>flavor</code>'), t('Map the columns explicitly in the join', 'اربط الأعمدة صراحة في الربط', 'ستون‌ها را صریحاً در join به هم وصل کن')],
            [t('Entity identification', 'تحديد الكيان', 'شناسایی موجودیت'), t('<code>STRAWBERRY</code>, <code>Blue berry</code>', '<code>STRAWBERRY</code> و<code>Blue berry</code>', '<code>STRAWBERRY</code>، <code>Blue berry</code>'), t('Join on a cleaned key: no spaces, upper case', 'اربط على مفتاح منظّف: بلا مسافات وبأحرف كبيرة', 'روی یک کلید تمیز join کن: بدون فاصله، حروف بزرگ')],
            [t('Value conflict', 'تعارض القيم', 'تعارض مقدار'), t('Prices in cents (500), yours in dollars (5.00)', 'الأسعار بالسنت (500)، وأسعارك بالدولار (5.00)', 'قیمت‌ها به سنت (۵۰۰)، مال تو به دلار (۵٫۰۰)'), t('Convert: <code>price_cents / 100.0</code>', 'حوّل: <code>price_cents / 100.0</code>', 'تبدیل کن: <code>price_cents / 100.0</code>')],
            [t('Enrichment', 'الإثراء', 'غنی‌سازی'), t('Lemon at 450 cents', 'Lemon بسعر 450 سنتًا', 'Lemon با ۴۵۰ سنت'), t('Lemon gets a selling price ($4.50); its cost is still unknown', 'يحصل Lemon على سعر بيع (4.50 دولار)؛ وتكلفته ما زالت مجهولة', 'Lemon قیمت فروش می‌گیرد (۴٫۵۰ دلار)؛ هزینه‌اش هنوز معلوم نیست')],
          ],
        },
        {
          type: 'box',
          variant: 'analogy',
          label: t('Analogy', 'تشبيه', 'تشبیه'),
          html: t(
            '<p>Two teachers merge their class lists. One writes "Mohammed A.", the other "M. Ahmad", and one gives grades out of 20, the other out of 100. Before you can rank the students you have to agree who is who (entity identification) and put the grades on one scale (value conflicts). The deck\'s example is the same: Bill Clinton and William Clinton are one person.</p>',
            '<p>يدمج معلّمان قائمتي صفّيهما. أحدهما يكتب "Mohammed A." والآخر "M. Ahmad"، وأحدهما يعطي الدرجات من 20 والآخر من 100. قبل ترتيب الطلاب يجب الاتفاق على من هو من (تحديد الكيان) ووضع الدرجات على مقياس واحد (تعارض القيم). ومثال العرض هو نفسه: Bill Clinton وWilliam Clinton شخص واحد.</p>',
            '<p>دو معلم فهرست کلاس‌هایشان را ادغام می‌کنند. یکی می‌نویسد «Mohammed A.» و دیگری «M. Ahmad»، و یکی نمره را از ۲۰ می‌دهد و دیگری از ۱۰۰. پیش از رتبه‌بندی شاگردان باید توافق کنی چه کسی کیست (شناسایی موجودیت) و نمره‌ها را روی یک مقیاس ببری (تعارض مقدار). مثال اسلایدها هم همین است: Bill Clinton و William Clinton یک نفرند.</p>',
          ),
        },
        toolTabs(
          [sql.integrate],
          [py.integrate],
          t(
            '<ol><li>Load the supplier sheet as a second query. In it, select flavour_name → <em>Transform → Replace values</em> (" " with nothing), then <em>Format → UPPERCASE</em>. Do the same to a copy of flavor in your sales query, so both keys look alike.</li><li><em>Home → Merge queries</em>, pick the two key columns, join kind <strong>Left outer</strong> (keep every sale). Power Query shows how many rows matched: it should be all 13.</li><li>Expand price_cents, then <em>Add column → Custom column</em> <code>[price_cents] / 100</code>.</li><li>Merge also has <em>Use fuzzy matching</em> for near-miss names; it is handy, but check every match it makes.</li></ol>',
            '<ol><li>حمّل ورقة المورّد كاستعلام ثانٍ. فيه، حدّد flavour_name ← <em>Transform → Replace values</em> (" " بلا شيء)، ثم <em>Format → UPPERCASE</em>. افعل الشيء نفسه لنسخة من flavor في استعلام المبيعات، ليتشابه المفتاحان.</li><li><em>Home → Merge queries</em>، اختر عمودي المفتاح، ونوع الربط <strong>Left outer</strong> (أبقِ كل عملية بيع). يُظهر Power Query عدد الصفوف المتطابقة: يجب أن تكون 13 كلها.</li><li>وسّع price_cents، ثم <em>Add column → Custom column</em> ‏<code>[price_cents] / 100</code>.</li><li>في Merge أيضًا <em>Use fuzzy matching</em> للأسماء المتقاربة؛ وهو مفيد، لكن تحقق من كل تطابق يصنعه.</li></ol>',
            '<ol><li>برگهٔ تأمین‌کننده را به‌عنوان کوئری دوم بارگذاری کن. در آن flavour_name را انتخاب کن ← <em>Transform → Replace values</em> (" " با هیچ)، سپس <em>Format → UPPERCASE</em>. همین کار را روی یک کپی از flavor در کوئری فروش هم بکن تا دو کلید شبیه هم شوند.</li><li><em>Home → Merge queries</em>، دو ستون کلید را انتخاب کن، نوع join را <strong>Left outer</strong> بگذار (همهٔ فروش‌ها بمانند). Power Query نشان می‌دهد چند سطر جفت شدند: باید هر ۱۳ سطر باشد.</li><li>price_cents را باز کن، سپس <em>Add column → Custom column</em> با <code>[price_cents] / 100</code>.</li><li>Merge گزینهٔ <em>Use fuzzy matching</em> هم برای نام‌های تقریباً یکسان دارد؛ مفید است، اما هر جفتی که می‌سازد را بررسی کن.</li></ol>',
          ),
        ),
        {
          type: 'box',
          variant: 'keypoint',
          label: t('Key point', 'نقطة أساسية', 'نکتهٔ کلیدی'),
          html: t(
            '<p>After any join, count the rows. A LEFT JOIN that still has 13 rows and no NULL prices means every sale found its price. If you used Week 2\'s INNER JOIN on raw names instead, Blueberry would vanish without a warning.</p>',
            '<p>بعد أي ربط، عُدّ الصفوف. ربط LEFT JOIN ما زال فيه 13 صفًا ولا أسعار NULL يعني أن كل عملية بيع وجدت سعرها. ولو استخدمت INNER JOIN من الأسبوع 2 على الأسماء الخام، لاختفى Blueberry دون تحذير.</p>',
            '<p>بعد از هر join سطرها را بشمار. یک LEFT JOIN که هنوز ۱۳ سطر و هیچ قیمت NULL ندارد یعنی هر فروش قیمتش را پیدا کرده. اگر به‌جایش INNER JOIN هفتهٔ ۲ را روی نام‌های خام می‌زدی، Blueberry بی‌هشدار ناپدید می‌شد.</p>',
          ),
        },
        { type: 'exercise', questionId: 'w04-q009' },
      ],
    },
    {
      id: 'transformation',
      navLabel: t('Data transformation', 'تحويل البيانات', 'تبدیل داده'),
      sectionLabel: t('Section 09', 'القسم ٠٩', 'بخش ۰۹'),
      timeEst: t('9 min', '٩ دقائق', '۹ دقیقه'),
      headingHtml: t(
        '<h2>Data transformation: reshape values so they answer the question</h2><p class="standfirst">A transformation maps every value of a column to a new value: a new unit, a new scale, a new column built from others. You transform to make data comparable, easier to chart, or fit for a method that expects a certain shape.</p>',
        '<h2>تحويل البيانات: أعد تشكيل القيم لتجيب عن السؤال</h2><p class="standfirst">يحوّل التحويل كل قيمة في عمود إلى قيمة جديدة: وحدة جديدة، أو مقياس جديد، أو عمود جديد مبني من غيره. تحوّل البيانات لتصبح قابلة للمقارنة، أو أسهل في الرسم، أو مناسبة لطريقة تتوقع شكلًا معيّنًا.</p>',
        '<h2>تبدیل داده: مقدارها را تغییر شکل بده تا به سؤال پاسخ دهند</h2><p class="standfirst">تبدیل هر مقدار یک ستون را به مقدار جدیدی نگاشت می‌کند: واحد جدید، مقیاس جدید، ستونی جدید که از ستون‌های دیگر ساخته شده. تبدیل می‌کنی تا داده قابل مقایسه شود، رسمش آسان‌تر شود یا برای روشی که شکل خاصی می‌خواهد مناسب شود.</p>',
      ),
      blocks: [
        {
          type: 'html',
          html: t(
            '<ul><li><strong>Smoothing</strong>: remove noise (Section 7\'s binning).</li><li><strong>Attribute (feature) construction</strong>: a new column from existing ones, like <code>revenue = units_sold × price</code>. After integration, May revenue is Strawberry $500.00, Blueberry $360.00, Peach $160.00 and Lemon $40.50: $1,060.50 in total.</li><li><strong>Aggregation</strong>: summarize rows into totals, like Week 3\'s monthly log.</li><li><strong>Normalization</strong>: rescale values to a common range so different-sized things can be compared.</li><li><strong>Discretization</strong>: turn numbers into labelled intervals (Section 10).</li></ul><h3>Three ways to normalize</h3><p>Take Week 3\'s 2024 monthly totals, which run from 16 jars (January) to 108 (July and August), mean 54.08, sample standard deviation 34.35.</p>',
            '<ul><li><strong>التنعيم</strong>: إزالة الضوضاء (التجميع في فئات في القسم 7).</li><li><strong>بناء السمات</strong>: عمود جديد من أعمدة موجودة، مثل <code>revenue = units_sold × price</code>. بعد الدمج، إيراد مايو: Strawberry ‏500.00 دولار، وBlueberry ‏360.00، وPeach ‏160.00، وLemon ‏40.50: ‏1,060.50 دولارًا إجمالًا.</li><li><strong>التجميع</strong>: تلخيص الصفوف في إجماليات، كالسجل الشهري في الأسبوع 3.</li><li><strong>التطبيع</strong>: إعادة قياس القيم إلى مدى مشترك لمقارنة أشياء مختلفة الحجم.</li><li><strong>التقطيع</strong>: تحويل الأرقام إلى فترات مسمّاة (القسم 10).</li></ul><h3>ثلاث طرق للتطبيع</h3><p>خذ الإجماليات الشهرية لعام 2024 من الأسبوع 3، وهي من 16 برطمانًا (يناير) إلى 108 (يوليو وأغسطس)، بمتوسط 54.08 وانحراف معياري للعيّنة 34.35.</p>',
            '<ul><li><strong>هموارسازی</strong>: حذف نویز (دسته‌بندی بخش ۷).</li><li><strong>ساخت ویژگی</strong>: ستونی جدید از ستون‌های موجود، مثل <code>revenue = units_sold × price</code>. پس از یکپارچه‌سازی، درآمد مه: Strawberry ‏۵۰۰٫۰۰ دلار، Blueberry ‏۳۶۰٫۰۰، Peach ‏۱۶۰٫۰۰ و Lemon ‏۴۰٫۵۰: در مجموع ۱٬۰۶۰٫۵۰ دلار.</li><li><strong>تجمیع</strong>: خلاصه کردن سطرها در مجموع‌ها، مثل لاگ ماهانهٔ هفتهٔ ۳.</li><li><strong>نرمال‌سازی</strong>: تغییر مقیاس مقدارها به یک بازهٔ مشترک تا چیزهایی با اندازه‌های مختلف مقایسه‌پذیر شوند.</li><li><strong>گسسته‌سازی</strong>: تبدیل عددها به بازه‌های برچسب‌دار (بخش ۱۰).</li></ul><h3>سه راه نرمال‌سازی</h3><p>مجموع‌های ماهانهٔ ۲۰۲۴ از هفتهٔ ۳ را در نظر بگیر که از ۱۶ شیشه (ژانویه) تا ۱۰۸ (ژوئیه و اوت) می‌روند، با میانگین ۵۴٫۰۸ و انحراف معیار نمونهٔ ۳۴٫۳۵.</p>',
          ),
        },
        {
          type: 'table',
          headers: [t('Month', 'الشهر', 'ماه'), t('Total', 'الإجمالي', 'مجموع'), t('Min-max (0 to 1)', 'Min-max ‏(0 إلى 1)', 'Min-max ‏(۰ تا ۱)'), t('Z-score', 'Z-score', 'Z-score'), t('Decimal scaling (÷ 1,000)', 'التحجيم العشري (÷ 1,000)', 'مقیاس اعشاری (÷ ۱٬۰۰۰)')],
          rows: [
            [t('Jan', 'يناير', 'ژانویه'), t('16', '16', '16'), t('0.00', '0.00', '0.00'), t('-1.11', '-1.11', '-1.11'), t('0.016', '0.016', '0.016')],
            [t('Apr', 'أبريل', 'آوریل'), t('42', '42', '42'), t('0.28', '0.28', '0.28'), t('-0.35', '-0.35', '-0.35'), t('0.042', '0.042', '0.042')],
            [t('Jun', 'يونيو', 'ژوئن'), t('92', '92', '92'), t('0.83', '0.83', '0.83'), t('1.10', '1.10', '1.10'), t('0.092', '0.092', '0.092')],
            [t('Jul', 'يوليو', 'ژوئیه'), t('108', '108', '108'), t('1.00', '1.00', '1.00'), t('1.57', '1.57', '1.57'), t('0.108', '0.108', '0.108')],
            [t('Dec', 'ديسمبر', 'دسامبر'), t('28', '28', '28'), t('0.13', '0.13', '0.13'), t('-0.76', '-0.76', '-0.76'), t('0.028', '0.028', '0.028')],
          ],
        },
        {
          type: 'html',
          html: t(
            '<ul><li><strong>Min-max</strong>: (value − min) ÷ (max − min). The smallest becomes 0, the largest 1. June\'s 0.83 means "83% of the way from the quietest month to the busiest".</li><li><strong>Z-score</strong>: (value − mean) ÷ standard deviation. 0 is an average month; June\'s 1.10 is about one standard deviation above average. Useful for spotting unusual values and comparing columns with different units.</li><li><strong>Decimal scaling</strong>: divide by a power of 10 so every value falls below 1. The largest total, 108, has three digits, so divide by 1,000.</li></ul>',
            '<ul><li><strong>Min-max</strong>: ‏(القيمة − الحد الأدنى) ÷ (الحد الأقصى − الحد الأدنى). الأصغر يصبح 0، والأكبر 1. قيمة يونيو 0.83 تعني "83% من الطريق بين أهدأ شهر وأكثرها ازدحامًا".</li><li><strong>Z-score</strong>: ‏(القيمة − المتوسط) ÷ الانحراف المعياري. الصفر شهر متوسط؛ وقيمة يونيو 1.10 تعني نحو انحراف معياري واحد فوق المتوسط. مفيد لرصد القيم غير المعتادة ومقارنة أعمدة بوحدات مختلفة.</li><li><strong>التحجيم العشري</strong>: اقسم على قوة للعدد 10 لتصبح كل قيمة أقل من 1. أكبر إجمالي، 108، من ثلاثة أرقام، فاقسم على 1,000.</li></ul>',
            '<ul><li><strong>Min-max</strong>: ‏(مقدار − کمینه) ÷ (بیشینه − کمینه). کوچک‌ترین ۰ و بزرگ‌ترین ۱ می‌شود. ۰٫۸۳ ژوئن یعنی «۸۳٪ مسیر از آرام‌ترین ماه تا شلوغ‌ترین».</li><li><strong>Z-score</strong>: ‏(مقدار − میانگین) ÷ انحراف معیار. ۰ یعنی یک ماه متوسط؛ ۱٫۱۰ ژوئن حدود یک انحراف معیار بالاتر از میانگین است. برای دیدن مقدارهای غیرعادی و مقایسهٔ ستون‌هایی با واحدهای مختلف مفید است.</li><li><strong>مقیاس اعشاری</strong>: بر توانی از ۱۰ تقسیم کن تا هر مقدار زیر ۱ شود. بزرگ‌ترین مجموع، ۱۰۸، سه رقم دارد، پس بر ۱٬۰۰۰ تقسیم کن.</li></ul>',
          ),
        },
        toolTabs(
          [sql.normalize],
          [py.normalize],
          t(
            '<ol><li>In Power Query, <em>Add column → Custom column</em> with <code>[units_sold] * [price]</code> builds revenue (feature construction).</li><li>For min-max, first <em>Transform → Statistics → Minimum</em> and <em>Maximum</em> on a duplicate of the query to get 16 and 108, then a custom column <code>([total] - 16) / (108 - 16)</code>.</li><li>In the report view, a DAX measure keeps it live as the data changes: <code>Z = DIVIDE(SUM(Monthly[total]) - CALCULATE(AVERAGE(Monthly[total]), ALL(Monthly)), CALCULATE(STDEV.S(Monthly[total]), ALL(Monthly)))</code> evaluated per month (<code>ALL</code> makes the mean and spread cover every month, not just the current one).</li></ol>',
            '<ol><li>في Power Query، يبني <em>Add column → Custom column</em> بالصيغة <code>[units_sold] * [price]</code> عمود الإيراد (بناء السمات).</li><li>لـ min-max، طبّق أولًا <em>Transform → Statistics → Minimum</em> و<em>Maximum</em> على نسخة من الاستعلام للحصول على 16 و108، ثم عمودًا مخصصًا <code>([total] - 16) / (108 - 16)</code>.</li><li>في عرض التقرير، يبقي مقياس DAX القيمة حيّة مع تغيّر البيانات: <code>Z = DIVIDE(SUM(Monthly[total]) - CALCULATE(AVERAGE(Monthly[total]), ALL(Monthly)), CALCULATE(STDEV.S(Monthly[total]), ALL(Monthly)))</code> محسوبًا لكل شهر (تجعل <code>ALL</code> المتوسط والتشتت يشملان كل الأشهر لا الشهر الحالي فقط).</li></ol>',
            '<ol><li>در Power Query، <em>Add column → Custom column</em> با <code>[units_sold] * [price]</code> ستون درآمد را می‌سازد (ساخت ویژگی).</li><li>برای min-max، اول <em>Transform → Statistics → Minimum</em> و <em>Maximum</em> را روی یک کپی از کوئری بزن تا ۱۶ و ۱۰۸ را بگیری، سپس ستون سفارشی <code>([total] - 16) / (108 - 16)</code>.</li><li>در نمای گزارش، یک معیار DAX آن را با تغییر داده زنده نگه می‌دارد: <code>Z = DIVIDE(SUM(Monthly[total]) - CALCULATE(AVERAGE(Monthly[total]), ALL(Monthly)), CALCULATE(STDEV.S(Monthly[total]), ALL(Monthly)))</code> که برای هر ماه حساب می‌شود (<code>ALL</code> باعث می‌شود میانگین و پراکندگی همهٔ ماه‌ها را بپوشانند، نه فقط ماه جاری).</li></ol>',
          ),
        ),
        {
          type: 'box',
          variant: 'mistake',
          label: t('Common mistake', 'خطأ شائع', 'اشتباه رایج'),
          html: t(
            '<p>Normalizing before fixing outliers. With the 180 typo still in the raw data, min-max would squash every real day into the bottom fifth of the range, and the "busiest day" would be a mistake.</p>',
            '<p>التطبيع قبل إصلاح القيم المتطرفة. مع بقاء خطأ الـ180 في البيانات الخام، سيضغط min-max كل يوم حقيقي في الخُمس الأدنى من المدى، ويكون "اليوم الأكثر ازدحامًا" خطأً.</p>',
            '<p>نرمال‌سازی پیش از اصلاح داده‌های پرت. با ماندن خطای ۱۸۰ در دادهٔ خام، min-max همهٔ روزهای واقعی را در یک‌پنجم پایین بازه فشرده می‌کند و «شلوغ‌ترین روز» یک اشتباه خواهد بود.</p>',
          ),
        },
        { type: 'exercise', questionId: 'w04-q010' },
      ],
    },
    {
      id: 'discretization',
      navLabel: t('Discretization and hierarchies', 'التقطيع والتسلسلات', 'گسسته‌سازی و سلسله‌مراتب'),
      sectionLabel: t('Section 10', 'القسم ١٠', 'بخش ۱۰'),
      timeEst: t('7 min', '٧ دقائق', '۷ دقیقه'),
      headingHtml: t(
        '<h2>Discretization and concept hierarchies: from numbers to useful labels</h2><p class="standfirst">Discretization divides a continuous range into intervals and replaces each value by its interval\'s label. A concept hierarchy goes further and arranges labels in levels, so you can zoom out (roll up) or in (drill down).</p>',
        '<h2>التقطيع والتسلسلات المفاهيمية: من الأرقام إلى تسميات مفيدة</h2><p class="standfirst">يقسّم التقطيع مدى متصلًا إلى فترات ويستبدل كل قيمة بتسمية فترتها. ويذهب التسلسل المفاهيمي أبعد فيرتّب التسميات في مستويات، لتتمكن من التصغير (التجميع لأعلى) أو التكبير (التعمق).</p>',
        '<h2>گسسته‌سازی و سلسله‌مراتب مفهومی: از عدد تا برچسب مفید</h2><p class="standfirst">گسسته‌سازی یک بازهٔ پیوسته را به فاصله‌هایی تقسیم می‌کند و هر مقدار را با برچسب فاصله‌اش جایگزین می‌کند. سلسله‌مراتب مفهومی جلوتر می‌رود و برچسب‌ها را در سطح‌هایی می‌چیند تا بتوانی دور شوی (roll up) یا نزدیک شوی (drill down).</p>',
      ),
      blocks: [
        {
          type: 'html',
          html: t(
            '<h3>Three types of attributes</h3><ul><li><strong>Nominal</strong>: categories with no order (flavor).</li><li><strong>Ordinal</strong>: categories with an order (slow &lt; normal &lt; busy; or academic ranks).</li><li><strong>Numeric</strong>: real numbers (units_sold).</li></ul><p>Discretization turns numeric into ordinal. With slow = under 12 jars, normal = 12 to 24, busy = 25 or more, May\'s 13 clean rows become 4 slow, 7 normal and 2 busy. That is easier to plan staff around than 13 different numbers, and it is the same bucket idea Week 1 used for revenue.</p><p>The deck\'s methods: <strong>binning</strong> and <strong>histogram analysis</strong> (split the range top-down, no labels needed), <strong>clustering</strong>, and two that need an outcome to aim at, <strong>decision trees</strong> and <strong>correlation (χ²) analysis</strong>, which come later in the course.</p>',
            '<h3>ثلاثة أنواع من السمات</h3><ul><li><strong>اسمية</strong>: فئات بلا ترتيب (flavor).</li><li><strong>ترتيبية</strong>: فئات لها ترتيب (بطيء &lt; عادي &lt; مزدحم؛ أو الرتب الأكاديمية).</li><li><strong>رقمية</strong>: أعداد حقيقية (units_sold).</li></ul><p>يحوّل التقطيع الرقمي إلى ترتيبي. إذا كان البطيء أقل من 12 برطمانًا، والعادي من 12 إلى 24، والمزدحم 25 فأكثر، تصبح صفوف مايو النظيفة الثلاثة عشر 4 بطيئة و7 عادية و2 مزدحمة. التخطيط للعاملين حول ذلك أسهل من 13 رقمًا مختلفًا، وهي فكرة الفئات نفسها التي استخدمها الأسبوع 1 للإيراد.</p><p>طرق العرض: <strong>التجميع في فئات</strong> و<strong>تحليل المدرج التكراري</strong> (تقسيم المدى من الأعلى للأسفل دون حاجة لتسميات)، و<strong>التجميع العنقودي</strong>، وطريقتان تحتاجان نتيجة يُستهدف التنبؤ بها، <strong>أشجار القرار</strong> و<strong>تحليل الارتباط (χ²)</strong>، وهما تأتيان لاحقًا في المقرر.</p>',
            '<h3>سه نوع ویژگی</h3><ul><li><strong>اسمی</strong>: دسته‌های بدون ترتیب (flavor).</li><li><strong>ترتیبی</strong>: دسته‌های دارای ترتیب (کند &lt; عادی &lt; شلوغ؛ یا رتبه‌های دانشگاهی).</li><li><strong>عددی</strong>: عددهای حقیقی (units_sold).</li></ul><p>گسسته‌سازی عددی را به ترتیبی تبدیل می‌کند. با کند = کمتر از ۱۲ شیشه، عادی = ۱۲ تا ۲۴، شلوغ = ۲۵ یا بیشتر، ۱۳ سطر تمیز مه به ۴ کند، ۷ عادی و ۲ شلوغ تبدیل می‌شوند. برنامه‌ریزی نیروی کار بر این اساس آسان‌تر از ۱۳ عدد مختلف است و همان ایدهٔ بازه‌ای است که هفتهٔ ۱ برای درآمد استفاده کرد.</p><p>روش‌های اسلایدها: <strong>دسته‌بندی</strong> و <strong>تحلیل هیستوگرام</strong> (تقسیم بازه از بالا به پایین، بدون نیاز به برچسب)، <strong>خوشه‌بندی</strong>، و دو روش که به یک خروجی هدف نیاز دارند، <strong>درخت تصمیم</strong> و <strong>تحلیل همبستگی (χ²)</strong>، که بعداً در دوره می‌آیند.</p>',
          ),
        },
        {
          type: 'diagram',
          fig: t('Figure 2', 'الشكل 2', 'شکل ۲'),
          title: t('Two concept hierarchies for the jam stand', 'تسلسلان مفاهيميان لكشك المربى', 'دو سلسله‌مراتب مفهومی برای غرفهٔ مربا'),
          src: '/figures/week-04/diagram-02.svg',
          alt: 'Two hierarchies. Time: day rolls up to week, month and season. Product: flavor rolls up to fruit family (berry, stone fruit, citrus). Arrows show roll up and drill down.',
          caption: t(
            'Rolling up May by fruit family gives berry 160 jars (Strawberry 100 + Blueberry 60), stone fruit 40 (Peach) and citrus 9 (Lemon). Drilling down from "spring" gets you back to single market days.',
            'التجميع لأعلى لشهر مايو حسب عائلة الفاكهة يعطي التوتيات 160 برطمانًا (Strawberry ‏100 + Blueberry ‏60)، وذات النواة 40 ‏(Peach)، والحمضيات 9 ‏(Lemon). والتعمّق من "الربيع" يعيدك إلى أيام السوق المفردة.',
            'roll up کردن مه بر اساس خانوادهٔ میوه می‌دهد: توت‌ها ۱۶۰ شیشه (Strawberry ‏۱۰۰ + Blueberry ‏۶۰)، هسته‌دارها ۴۰ (Peach) و مرکبات ۹ (Lemon). drill down از «بهار» تو را به تک‌روزهای بازار برمی‌گرداند.',
          ),
        },
        {
          type: 'html',
          html: t(
            '<p>Hierarchies can be defined by people who know the business ("street &lt; city &lt; state &lt; country"), by grouping values explicitly ({Strawberry, Blueberry} &lt; berry), or generated automatically: an attribute with fewer distinct values usually sits higher (4 seasons, 12 months, 52 weeks, 365 days).</p>',
            '<p>يمكن أن يعرّف التسلسلاتِ أشخاصٌ يعرفون العمل ("الشارع &lt; المدينة &lt; الولاية &lt; البلد")، أو بتجميع القيم صراحة ({Strawberry، Blueberry} &lt; التوتيات)، أو تُولَّد تلقائيًا: السمة ذات القيم المميزة الأقل تقع عادة في مستوى أعلى (4 فصول، 12 شهرًا، 52 أسبوعًا، 365 يومًا).</p>',
            '<p>سلسله‌مراتب را می‌توانند کسانی که کسب‌وکار را می‌شناسند تعریف کنند («خیابان &lt; شهر &lt; استان &lt; کشور»)، یا با گروه‌بندی صریح مقدارها ({Strawberry، Blueberry} &lt; توت‌ها)، یا خودکار ساخته شوند: ویژگی‌ای که مقدارهای یکتای کمتری دارد معمولاً بالاتر می‌نشیند (۴ فصل، ۱۲ ماه، ۵۲ هفته، ۳۶۵ روز).</p>',
          ),
        },
        toolTabs(
          [sql.discretize],
          [py.discretize],
          t(
            '<ul><li><em>Add column → Conditional column</em>: if units_sold &lt; 12 then "slow", else if &lt; 25 then "normal", else "busy".</li><li>For the hierarchy, add a family column the same way (or merge a small Flavor → Family table), then in the report drag Family above Flavor in a visual\'s axis: the drill-down arrows appear automatically.</li><li>Power BI builds a date hierarchy (Year, Quarter, Month, Day) for every date column on its own.</li></ul>',
            '<ul><li><em>Add column → Conditional column</em>: إذا كان units_sold &lt; 12 فالقيمة "slow"، وإلا إذا كان &lt; 25 فالقيمة "normal"، وإلا "busy".</li><li>للتسلسل، أضف عمود العائلة بالطريقة نفسها (أو ادمج جدولًا صغيرًا Flavor → Family)، ثم في التقرير اسحب Family فوق Flavor في محور الرسم: تظهر أسهم التعمق تلقائيًا.</li><li>ينشئ Power BI تسلسلًا للتاريخ (Year، Quarter، Month، Day) لكل عمود تاريخ تلقائيًا.</li></ul>',
            '<ul><li><em>Add column → Conditional column</em>: اگر units_sold &lt; 12 آنگاه "slow"، وگرنه اگر &lt; 25 آنگاه "normal"، وگرنه "busy".</li><li>برای سلسله‌مراتب، ستون خانواده را به همین روش اضافه کن (یا یک جدول کوچک Flavor → Family را ادغام کن)، سپس در گزارش Family را بالای Flavor در محور نمودار بکش: پیکان‌های drill down خودکار ظاهر می‌شوند.</li><li>Power BI برای هر ستون تاریخ خودش یک سلسله‌مراتب تاریخ (Year، Quarter، Month، Day) می‌سازد.</li></ul>',
          ),
        ),
        { type: 'exercise', questionId: 'w04-q011' },
      ],
    },
    {
      id: 'tools-and-ai',
      navLabel: t('Tools and AI co-pilot', 'الأدوات ومساعد الذكاء الاصطناعي', 'ابزارها و همیار هوش مصنوعی'),
      sectionLabel: t('Section 11', 'القسم ١١', 'بخش ۱۱'),
      timeEst: t('6 min', '٦ دقائق', '۶ دقیقه'),
      headingHtml: t(
        '<h2>Tools and the AI co-pilot: fast helpers, but you sign the result</h2><p class="standfirst">The deck names three data preparation tools. An AI assistant is a fourth, and the quickest of all, as long as you check what it did.</p>',
        '<h2>الأدوات ومساعد الذكاء الاصطناعي: مساعدون سريعون، لكنك من يوقّع على النتيجة</h2><p class="standfirst">يذكر العرض ثلاث أدوات لتحضير البيانات. ومساعد الذكاء الاصطناعي أداة رابعة، والأسرع على الإطلاق، بشرط أن تتحقق مما فعله.</p>',
        '<h2>ابزارها و همیار هوش مصنوعی: کمک‌کارهای سریع، اما امضای نتیجه با توست</h2><p class="standfirst">اسلایدها سه ابزار آماده‌سازی داده را نام می‌برند. دستیار هوش مصنوعی ابزار چهارم و سریع‌ترین همه است، به شرطی که کارش را بررسی کنی.</p>',
      ),
      blocks: [
        {
          type: 'table',
          headers: [t('Tool', 'الأداة', 'ابزار'), t('Strength', 'نقطة القوة', 'نقطهٔ قوت'), t('In this course', 'في هذا المقرر', 'در این دوره')],
          rows: [
            [t('Microsoft Power BI', 'Microsoft Power BI', 'Microsoft Power BI'), t('Handles large data, Power Query for repeatable cleaning, fits the Microsoft suite', 'يتعامل مع بيانات كبيرة، وPower Query لتنظيف قابل للتكرار، ويتكامل مع حزمة Microsoft', 'دادهٔ بزرگ را مدیریت می‌کند، Power Query برای پاک‌سازی تکرارپذیر، با مجموعهٔ Microsoft جور است'), t('Used from Week 3', 'مستخدم منذ الأسبوع 3', 'از هفتهٔ ۳ استفاده می‌شود')],
            [t('Tableau', 'Tableau', 'Tableau'), t('Visual, friendly for less technical users, good at spotting KPI trends', 'مرئي وسهل لغير التقنيين، وجيد في رصد اتجاهات مؤشرات الأداء', 'بصری، مناسب کاربران کم‌تر فنی، در دیدن روند شاخص‌های کلیدی خوب است'), t('Not used; skills transfer', 'غير مستخدم؛ لكن المهارات تنتقل', 'استفاده نمی‌شود؛ مهارت‌ها منتقل می‌شوند')],
            [t('SAP Data Intelligence', 'SAP Data Intelligence', 'SAP Data Intelligence'), t('Enterprise-scale pipelines, customizable to an organization\'s KPIs', 'خطوط بيانات على مستوى المؤسسات، قابلة للتخصيص لمؤشرات المؤسسة', 'خط لوله‌های در مقیاس سازمانی، قابل تنظیم برای شاخص‌های سازمان'), t('Not used; you may meet it at large companies', 'غير مستخدم؛ قد تصادفه في الشركات الكبيرة', 'استفاده نمی‌شود؛ شاید در شرکت‌های بزرگ ببینی‌اش')],
          ],
        },
        {
          type: 'tabs',
          tabs: [
            {
              label: t('Weak prompt', 'طلب ضعيف', 'درخواست ضعیف'),
              blocks: [
                {
                  type: 'html',
                  html: t(
                    '<p>"Clean this data." The assistant trims names, deletes the NULL row, deletes the negative row, keeps the 180, removes the duplicate, and reports "Done: 12 clean rows". Three of those choices were wrong, and nothing in the reply says so.</p>',
                    '<p>"نظّف هذه البيانات." يحذف المساعد المسافات من الأسماء، ويحذف صف NULL، ويحذف الصف السالب، ويبقي الـ180، ويزيل التكرار، ويبلغ "تم: 12 صفًا نظيفًا". ثلاثة من هذه الخيارات خاطئة، ولا شيء في الرد يقول ذلك.</p>',
                    '<p>«این داده را تمیز کن.» دستیار نام‌ها را مرتب می‌کند، سطر NULL را حذف می‌کند، سطر منفی را حذف می‌کند، ۱۸۰ را نگه می‌دارد، تکرار را برمی‌دارد و گزارش می‌دهد «تمام شد: ۱۲ سطر تمیز». سه تا از این انتخاب‌ها غلط بودند و هیچ چیزی در پاسخ این را نمی‌گوید.</p>',
                  ),
                },
              ],
            },
            {
              label: t('Strong prompt', 'طلب قوي', 'درخواست قوی'),
              blocks: [
                {
                  type: 'code',
                  code: `I have a 15-row jam stand sales export (pasted below).
Do NOT delete or change anything yet. First:
1. List every row that breaks a rule (NULL or negative units, dates not YYYY-MM-DD,
   flavor names that differ only by case or spaces, exact duplicates, outliers).
2. For each, propose a fix and say whether it needs a human to confirm.
3. Give me the SQL to apply the fixes to a COPY of the table, as a change log.
Expected after cleaning: 13 rows. If you get a different number, explain why.`,
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
            '<p>Ask the AI to <em>list and propose</em>, not to clean. Then check two numbers yourself: the row count (13) and the total (209). If either is off, find out which row the AI treated differently from you.</p>',
            '<p>اطلب من الذكاء الاصطناعي أن <em>يسرد ويقترح</em>، لا أن ينظّف. ثم تحقّق بنفسك من رقمين: عدد الصفوف (13) والإجمالي (209). إن اختلف أحدهما، اعرف أي صف عامله الذكاء الاصطناعي بشكل مختلف عنك.</p>',
            '<p>از هوش مصنوعی بخواه <em>فهرست کند و پیشنهاد دهد</em>، نه اینکه تمیز کند. بعد دو عدد را خودت بررسی کن: تعداد سطرها (۱۳) و مجموع (۲۰۹). اگر یکی‌شان فرق داشت، بفهم هوش مصنوعی با کدام سطر متفاوت از تو رفتار کرده است.</p>',
          ),
        },
        { type: 'exercise', questionId: 'w04-q012' },
      ],
    },
    {
      id: 'worked-example',
      navLabel: t('Worked example', 'مثال تطبيقي', 'مثال حل‌شده'),
      sectionLabel: t('Section 12', 'القسم ١٢', 'بخش ۱۲'),
      timeEst: t('8 min', '٨ دقائق', '۸ دقیقه'),
      headingHtml: t(
        '<h2>Worked example: from 15 messy rows to Week 2\'s table</h2><p class="standfirst">Here is the whole cleaning run on the raw May export, as one script on a copy of the data, with the change log you would hand to the owner.</p>',
        '<h2>مثال تطبيقي: من 15 صفًا فوضويًا إلى جدول الأسبوع 2</h2><p class="standfirst">إليك عملية التنظيف كاملة على تصدير مايو الخام، كسكربت واحد على نسخة من البيانات، مع سجل التغييرات الذي ستسلّمه للمالك.</p>',
        '<h2>مثال حل‌شده: از ۱۵ سطر نامرتب تا جدول هفتهٔ ۲</h2><p class="standfirst">این کل اجرای پاک‌سازی روی خروجی خام مه است، به‌صورت یک اسکریپت روی کپی داده، همراه با گزارش تغییراتی که به مالک می‌دهی.</p>',
      ),
      blocks: [
        toolTabs(
          [sql.clean],
          [py.clean],
          t(
            '<p>In Power Query, the same run is the list under <em>Applied steps</em>: Trimmed text, Capitalized each word, Replaced value (id 3 date), three conditional columns for ids 5, 7 and 9, Removed duplicates, Filtered rows (id ≠ 15), Changed type (market_date to Date). Refresh the source next month and every step runs again.</p>',
            '<p>في Power Query، العملية نفسها هي القائمة تحت <em>Applied steps</em>: Trimmed text، وCapitalized each word، وReplaced value (تاريخ الصف 3)، وثلاثة أعمدة شرطية للصفوف 5 و7 و9، وRemoved duplicates، وFiltered rows ‏(id ≠ 15)، وChanged type (market_date إلى Date). حدّث المصدر الشهر القادم فتعمل كل خطوة مجددًا.</p>',
            '<p>در Power Query، همین اجرا فهرست زیر <em>Applied steps</em> است: Trimmed text، Capitalized each word، Replaced value (تاریخ سطر ۳)، سه ستون شرطی برای سطرهای ۵، ۷ و ۹، Removed duplicates، Filtered rows ‏(id ≠ 15)، Changed type (market_date به Date). ماه بعد منبع را تازه کن تا همهٔ گام‌ها دوباره اجرا شوند.</p>',
          ),
        ),
        {
          type: 'table',
          headers: [t('Change', 'التغيير', 'تغییر'), t('Rows', 'الصفوف', 'سطرها'), t('From → to', 'من ← إلى', 'از ← به'), t('Why', 'لماذا', 'چرا')],
          rows: [
            [t('Standardize names', 'توحيد الأسماء', 'یکسان‌سازی نام‌ها'), t('2, 4', '2، 4', '۲، ۴'), t('blueberry, "Strawberry " → Blueberry, Strawberry', 'blueberry، "Strawberry " ← Blueberry، Strawberry', 'blueberry، "Strawberry " ← Blueberry، Strawberry'), t('Consistency (syntactic)', 'الاتساق (تركيبي)', 'سازگاری (نحوی)')],
            [t('Fix date format', 'إصلاح صيغة التاريخ', 'اصلاح قالب تاریخ'), t('3', '3', '۳'), t('04/05/2024 → 2024-05-04', '04/05/2024 ← 2024-05-04', '04/05/2024 ← 2024-05-04'), t('Day-first export; 4 May 2024 was a market Saturday, 5 April a Friday', 'تصدير يبدأ باليوم؛ 4 مايو 2024 كان سبت سوق، و5 أبريل يوم جمعة', 'خروجی روز-اول؛ ۴ مه ۲۰۲۴ شنبهٔ بازار بود و ۵ آوریل جمعه')],
            [t('Fill missing', 'ملء المفقود', 'پر کردن گمشده'), t('5', '5', '۵'), t('NULL → 12', 'NULL ← 12', 'NULL ← ۱۲'), t('Paper log (completeness)', 'السجل الورقي (الاكتمال)', 'دفتر کاغذی (کامل بودن)')],
            [t('Fix outlier', 'إصلاح القيمة المتطرفة', 'اصلاح دادهٔ پرت'), t('7', '7', '۷'), t('180 → 18', '180 ← 18', '۱۸۰ ← ۱۸'), t('Extra zero, confirmed by the owner', 'صفر زائد، أكّده المالك', 'صفر اضافه، تأییدشده توسط مالک')],
            [t('Fix invalid value', 'إصلاح قيمة غير صالحة', 'اصلاح مقدار نامعتبر'), t('9', '9', '۹'), t('-12 → 12', '-12 ← 12', '‎-12 ← ۱۲'), t('Sign error (validity)', 'خطأ في الإشارة (الصلاحية)', 'خطای علامت (اعتبار)')],
            [t('Remove duplicate', 'إزالة التكرار', 'حذف تکرار'), t('14', '14', '۱۴'), t('deleted', 'حُذف', 'حذف شد'), t('Same sale as row 10 (uniqueness)', 'عملية البيع نفسها في الصف 10 (التفرّد)', 'همان فروش سطر ۱۰ (یکتایی)')],
            [t('Remove test row', 'إزالة صف الاختبار', 'حذف سطر آزمایشی'), t('15', '15', '۱۵'), t('deleted', 'حُذف', 'حذف شد'), t('Disguised missing: till set-up test', 'مفقود متنكّر: اختبار تركيب الجهاز', 'گمشدهٔ پنهان: آزمایش راه‌اندازی صندوق')],
          ],
        },
        {
          type: 'html',
          html: t(
            '<p><strong>Control step:</strong> re-profile the copy. 13 rows, no NULLs, 4 distinct flavors, units from 8 to 35, 209 jars. That is Week 2\'s <code>jam_sales</code> exactly, which is how you know the cleaning neither lost a real sale nor kept a fake one. The raw total of 370 was inflated by the typo (+162), the duplicate (+35) and, in the other direction, by the sign error (-24 versus the true value) and the blank (-12).</p>',
            '<p><strong>خطوة التحكم:</strong> أعد فحص النسخة. 13 صفًا، بلا NULL، و4 نكهات مميزة، ووحدات من 8 إلى 35، و209 برطمانات. هذا هو <code>jam_sales</code> في الأسبوع 2 تمامًا، وبه تعرف أن التنظيف لم يفقد عملية بيع حقيقية ولم يُبقِ واحدة مزيفة. الإجمالي الخام 370 تضخّم بخطأ الكتابة (+162) والتكرار (+35)، وفي الاتجاه الآخر بخطأ الإشارة (‎-24 مقارنة بالقيمة الحقيقية) والفراغ (‎-12).</p>',
            '<p><strong>گام کنترل:</strong> کپی را دوباره پروفایل کن. ۱۳ سطر، بدون NULL، ۴ طعم یکتا، واحدها از ۸ تا ۳۵، ۲۰۹ شیشه. این دقیقاً <code>jam_sales</code> هفتهٔ ۲ است و از همین می‌فهمی پاک‌سازی نه فروش واقعی‌ای را گم کرده و نه فروش جعلی‌ای را نگه داشته. مجموع خام ۳۷۰ با خطای تایپی (+۱۶۲) و تکرار (+۳۵) باد کرده بود و در جهت مخالف با خطای علامت (‎-24 نسبت به مقدار واقعی) و خانهٔ خالی (‎-12).</p>',
          ),
        },
      ],
    },
    {
      id: 'common-mistakes',
      navLabel: t('Common mistakes', 'أخطاء شائعة', 'اشتباهات رایج'),
      sectionLabel: t('Section 13', 'القسم ١٣', 'بخش ۱۳'),
      headingHtml: t(
        '<h2>Common mistakes</h2><p class="standfirst">Every one of these produces a clean-looking table with wrong numbers in it.</p>',
        '<h2>أخطاء شائعة</h2><p class="standfirst">كل واحد من هذه الأخطاء ينتج جدولًا يبدو نظيفًا وفيه أرقام خاطئة.</p>',
        '<h2>اشتباهات رایج</h2><p class="standfirst">هر کدام از این‌ها جدولی تمیزنما با عددهای غلط تولید می‌کند.</p>',
      ),
      blocks: [
        {
          type: 'table',
          headers: [t('Mistake', 'الخطأ', 'اشتباه'), t('What goes wrong', 'ما الذي يفسد', 'چه چیزی خراب می‌شود'), t('Instead', 'بدلًا من ذلك', 'به‌جایش')],
          rows: [
            [t('Editing the raw export', 'تعديل التصدير الخام', 'ویرایش خروجی خام'), t('No way to check or undo a fix', 'لا سبيل للتحقق من إصلاح أو التراجع عنه', 'راهی برای بررسی یا برگرداندن اصلاح نیست'), t('Clean a copy; keep a change log', 'نظّف نسخة؛ واحتفظ بسجل تغييرات', 'یک کپی را تمیز کن؛ گزارش تغییرات نگه دار')],
            [t('Deleting every problem row', 'حذف كل صف فيه مشكلة', 'حذف هر سطر مشکل‌دار'), t('Real sales disappear (rows 5 and 9 were real)', 'تختفي مبيعات حقيقية (الصفان 5 و9 كانا حقيقيين)', 'فروش‌های واقعی ناپدید می‌شوند (سطرهای ۵ و ۹ واقعی بودند)'), t('Correct where you can; delete only fakes and duplicates', 'صحّح حيث تستطيع؛ واحذف المزيف والمكرر فقط', 'هر جا می‌توانی اصلاح کن؛ فقط جعلی‌ها و تکرارها را حذف کن')],
            [t('Filling blanks with 0 or the overall mean', 'ملء الفراغات بالصفر أو المتوسط العام', 'پر کردن خانه‌های خالی با ۰ یا میانگین کل'), t('0 claims "sold nothing"; the overall mean mixes flavors and outliers', 'الصفر يدّعي "لم نبع شيئًا"؛ والمتوسط العام يخلط النكهات والقيم المتطرفة', '۰ ادعا می‌کند «هیچ نفروختیم»؛ میانگین کل طعم‌ها و داده‌های پرت را قاطی می‌کند'), t('Use the source, or at least the class mean', 'استخدم المصدر، أو على الأقل متوسط الفئة', 'از منبع استفاده کن یا دست‌کم میانگین دسته')],
            [t('Cleaning only one side of a join key', 'تنظيف جانب واحد فقط من مفتاح الربط', 'تمیز کردن فقط یک طرف کلید join'), t('Rows silently fail to match', 'تفشل الصفوف في التطابق بصمت', 'سطرها بی‌صدا جفت نمی‌شوند'), t('Apply the same TRIM/UPPER to both keys; count rows after', 'طبّق TRIM/UPPER نفسها على المفتاحين؛ وعُدّ الصفوف بعدها', 'همان TRIM/UPPER را روی هر دو کلید بزن؛ بعد سطرها را بشمار')],
            [t('Normalizing before fixing outliers', 'التطبيع قبل إصلاح القيم المتطرفة', 'نرمال‌سازی پیش از اصلاح داده‌های پرت'), t('One typo squashes every real value toward 0', 'خطأ واحد يضغط كل قيمة حقيقية نحو الصفر', 'یک خطای تایپی همهٔ مقدارهای واقعی را به سمت ۰ فشرده می‌کند'), t('Clean first, transform second', 'نظّف أولًا، ثم حوّل', 'اول تمیز کن، بعد تبدیل کن')],
            [t('Trusting "done" from a tool or AI', 'الوثوق بـ"تم" من أداة أو ذكاء اصطناعي', 'اعتماد به «تمام شد» یک ابزار یا هوش مصنوعی'), t('Rows dropped or "fixed" without your knowledge', 'صفوف حُذفت أو "صُحّحت" دون علمك', 'سطرهایی بدون اطلاع تو حذف یا «اصلاح» شده‌اند'), t('Check row count and total against what you expect', 'تحقق من عدد الصفوف والإجمالي مقابل ما تتوقعه', 'تعداد سطرها و مجموع را با انتظارت مقایسه کن')],
          ],
        },
      ],
    },
    {
      id: 'homework',
      navLabel: t('Homework', 'الواجب', 'تکلیف'),
      sectionLabel: t('Section 14', 'القسم ١٤', 'بخش ۱۴'),
      headingHtml: t(
        '<h2>Homework: clean the June export</h2><p class="standfirst">The till has exported June, and it has its own problems. Profile it, clean it with a change log, add the supplier\'s prices, and reshape it for the owner. Each question comes with an analogy, a checklist and an example answer worked on the lesson\'s May data; redo the work on June. A short feedback question comes last.</p>',
        '<h2>الواجب: نظّف تصدير يونيو</h2><p class="standfirst">صدّر جهاز الدفع شهر يونيو، وفيه مشكلاته الخاصة. افحصه، ونظّفه مع سجل تغييرات، وأضف أسعار المورّد، وأعد تشكيله للمالك. يأتي كل سؤال مع تشبيه وقائمة تحقق ومثال على إجابة محسوب على بيانات مايو في الدرس؛ أعد العمل على يونيو. وفي النهاية سؤال قصير عن رأيك.</p>',
        '<h2>تکلیف: خروجی ژوئن را تمیز کن</h2><p class="standfirst">صندوق ژوئن را خروجی گرفته و مشکل‌های خودش را دارد. پروفایلش کن، با گزارش تغییرات تمیزش کن، قیمت‌های تأمین‌کننده را اضافه کن و برای مالک تغییر شکلش بده. هر سؤال یک تشبیه، یک فهرست بررسی و یک نمونه‌پاسخ دارد که روی دادهٔ مهِ درس حل شده؛ کار را روی ژوئن انجام بده. در پایان یک سؤال کوتاه دربارهٔ نظر تو هست.</p>',
      ),
      blocks: [
        {
          type: 'html',
          html: t(
            '<p>Load the June export below (it uses the same <code>supplier_prices</code> table as Section 8). The stand\'s paper log says Strawberry sold <strong>30</strong> jars on 8 June, and the owner confirms the Strawberry figure for 15 June should be <strong>40</strong>.</p>',
            '<p>حمّل تصدير يونيو أدناه (يستخدم جدول <code>supplier_prices</code> نفسه من القسم 8). يقول سجل الكشك الورقي إن Strawberry باعت <strong>30</strong> برطمانًا في 8 يونيو، ويؤكّد المالك أن رقم Strawberry في 15 يونيو يجب أن يكون <strong>40</strong>.</p>',
            '<p>خروجی ژوئن زیر را بارگذاری کن (از همان جدول <code>supplier_prices</code> بخش ۸ استفاده می‌کند). دفتر کاغذی غرفه می‌گوید Strawberry در ۸ ژوئن <strong>۳۰</strong> شیشه فروخته و مالک تأیید می‌کند عدد Strawberry در ۱۵ ژوئن باید <strong>۴۰</strong> باشد.</p>',
          ),
        },
        { type: 'code', code: juneRawSql },
        week04Homework,
      ],
    },
    {
      id: 'before-week-5',
      navLabel: t('Before Week 5', 'قبل الأسبوع 5', 'پیش از هفته ۵'),
      sectionLabel: t('Section 15', 'القسم ١٥', 'بخش ۱۵'),
      headingHtml: t(
        '<h2>Before Week 5</h2><p>You can now tell clean data from data that only looks clean, and you know the questions to ask before fixing anything. Week 5 puts it into practice in Excel, step by step: importing with the right delimiters and formats, validation rules, finding outliers and duplicates, fuzzy matching and lookups across tables.</p>',
        '<h2>قبل الأسبوع 5</h2><p>أصبحت الآن تميّز البيانات النظيفة من البيانات التي تبدو نظيفة فقط، وتعرف الأسئلة التي تطرحها قبل إصلاح أي شيء. يطبّق الأسبوع 5 ذلك في Excel خطوة بخطوة: الاستيراد بالفواصل والصيغ الصحيحة، وقواعد التحقق، وإيجاد القيم المتطرفة والتكرارات، والمطابقة التقريبية والبحث بين الجداول.</p>',
        '<h2>پیش از هفته ۵</h2><p>حالا دادهٔ تمیز را از داده‌ای که فقط تمیز به نظر می‌رسد تشخیص می‌دهی و می‌دانی پیش از اصلاح هر چیزی چه سؤال‌هایی بپرسی. هفتهٔ ۵ این را گام‌به‌گام در Excel تمرین می‌کند: وارد کردن داده با جداکننده‌ها و قالب‌های درست، قاعده‌های اعتبارسنجی، پیدا کردن داده‌های پرت و تکرارها، تطبیق تقریبی و جست‌وجو میان جدول‌ها.</p>',
      ),
      blocks: [],
    },
  ],
}

/** Exported for the notebook generator (public/notebooks/week-04-data-preparation.ipynb). */
export const week04PythonCells = [py.setup, py.profile, py.suspicious, py.clean, py.integrate, py.normalize, py.discretize]
