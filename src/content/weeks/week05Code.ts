// Code shown in Week 5 (src/content/weeks/week-05.ts). Kept free of imports so Node can load it to
// generate public/notebooks/week-05-data-cleaning.ipynb (regenerate that file if the Python cells change).
//
// Verified: every Python cell was run end to end on public/data/*.csv (pandas), and the Excel formulas were
// recalculated in LibreOffice on a sample of the rows. The Power Query (M) snippets are reference code for the
// dialogs described in the text: they were not run, because this was authored without Excel.

export const dataBase = 'https://raw.githubusercontent.com/PA-WiT/BA2/main/public/data/'

export const py = {
  load: `import pandas as pd

BASE = "${dataBase}"   # or upload the two CSVs and use their file names

# sep=";" (not a comma), UTF-8, and everything read as text on purpose: we convert each column deliberately.
raw = pd.read_csv(BASE + "jam-wholesale-raw.csv", sep=";", encoding="utf-8", dtype=str, keep_default_na=False)
customers = pd.read_csv(BASE + "jam-customers.csv", sep=";", dtype=str)
print(raw.shape)   # (26, 7)
raw.head()`,
  importMistakes: `# Three ways the same file goes wrong (do not copy these):
pd.read_csv(path)                                  # no sep: ONE column called 'order_id;customer;order_date;...'
pd.read_csv(path, sep=";", encoding="latin-1")     # accents break: 'CafÃ© RosÃ©'
pd.read_csv(path, sep=";")                         # postcode 02134 becomes the number 2134`,
  text: `df = raw.copy()                                    # never edit the raw frame
for col in ["customer", "flavor"]:
    # split() with no argument also treats the non-breaking space as a space, then join puts single spaces back
    df[col] = df[col].str.split().str.join(" ")
df["flavor"] = df["flavor"].str.title()            # 'strawberry' -> 'Strawberry'
df["customer"].nunique(), df["flavor"].nunique()   # 13 customer spellings (7 real customers), 5 flavor spellings (4 real)`,
  types: `df["order_id"] = df["order_id"].astype(int)
df["order_date"] = pd.to_datetime(df["order_date"], format="%d/%m/%Y")        # day first, said out loud
df["unit_price"] = df["unit_price"].str.replace(",", ".", regex=False).astype(float)   # '5,00' and '5.00' both -> 5.0
df["jars"] = df["jars"].astype(int)`,
  validate: `rules = {
    "jars not a whole number 1-500": ~df["jars"].between(1, 500),
    "price outside 3-8":             ~df["unit_price"].between(3, 8),
    "date outside June 2024":        ~df["order_date"].between("2024-06-01", "2024-06-30"),
    "flavor not in the list":        ~df["flavor"].isin(["Strawberry", "Blueberry", "Peach", "Lemon"]),
}
for name, failed in rules.items():
    print(name, df.loc[failed, "order_id"].tolist())
# jars [1014, 1024] | price [] | date [1017] | flavor [1020]`,
  fix: `df = df[df["customer"] != "TEST"]                                           # 1024: a till set-up row
df.loc[df["order_id"] == 1014, "jars"] = 24                                  # sign error, confirmed by the owner
df.loc[df["order_id"] == 1017, "order_date"] = pd.Timestamp("2024-06-21")    # typed 2025
df.loc[df["order_id"] == 1020, "flavor"] = "Peach"                           # 'Peech'`,
  duplicates: `print(raw.duplicated().sum())          # 1: on the RAW text only the exact copy (1011) matches
print(df.duplicated().sum())           # 2: after cleaning, the copy of 1007 matches too
print(df[df.duplicated(subset="order_id", keep=False)][["order_id", "customer", "jars"]])
df = df.drop_duplicates(subset="order_id", keep="first")   # same order_id and identical rows: true copies
len(df)                                # 23`,
  outliers: `q1, q3 = df["jars"].quantile([0.25, 0.75])      # same as QUARTILE.INC in Excel
iqr = q3 - q1
low, high = q1 - 1.5 * iqr, q3 + 1.5 * iqr
print(q1, q3, low, high)                         # 36.0 60.0 0.0 96.0
print(df[(df["jars"] < low) | (df["jars"] > high)][["order_id", "customer", "jars"]])   # 1018: 360 jars

z = (df["jars"] - df["jars"].mean()) / df["jars"].std()   # .std() is the sample standard deviation, like STDEV.S
print(z.round(2).max())                          # 4.44

df.loc[df["order_id"] == 1018, "jars"] = 36      # only after the owner confirmed the extra zero`,
  lookups: `df["key"] = df["customer"].str.lower()                 # lookups ignore case, so compare lower case
customers["key"] = customers["customer_name"].str.lower()

joined = df.merge(customers[["key", "customer_name", "region"]], on="key", how="left")
print(joined["region"].isna().sum())                  # 4 orders found no customer
print(joined.loc[joined["region"].isna(), ["order_id", "customer"]])
print(len(df.merge(customers, on="key", how="inner")))   # 19: an inner join drops those 4 silently`,
  fuzzy: `import difflib

canon = {n.lower(): n for n in customers["customer_name"]}
unmatched = joined.loc[joined["region"].isna(), "customer"].unique()
for name in unmatched:
    close = difflib.get_close_matches(name.lower(), list(canon), n=2, cutoff=0.6)
    print(name, "->", [(canon[c], round(difflib.SequenceMatcher(None, name.lower(), c).ratio(), 2)) for c in close])
# Cafe Rose             -> [('Café Rosé', 0.78)]
# Greengrocer Ltd.      -> [('Green Grocer Ltd', 0.94), ('Greenfield Grocer Ltd', 0.81)]
# Harbor Market         -> [('Harbour Market', 0.96)]
# Green Grocers Limited -> [('Green Grocer Ltd', 0.86), ('Greenfield Grocer Ltd', 0.76)]`,
  approve: `# After reading the scores, approve the mapping by hand and keep it as the log of this step
approved = {
    "Cafe Rose": "Café Rosé",
    "Greengrocer Ltd.": "Green Grocer Ltd",
    "Harbor Market": "Harbour Market",
    "Green Grocers Limited": "Green Grocer Ltd",
}
df["customer"] = df["customer"].map(lambda s: approved.get(s, canon.get(s.lower(), s)))

final = df.merge(customers[["customer_name", "region"]], left_on="customer", right_on="customer_name",
                 how="left", validate="m:1")          # m:1 fails loudly if the customer list has duplicates
final["revenue"] = final["jars"] * final["unit_price"]
print(len(final), final["jars"].sum(), final["revenue"].sum())   # 23 1104 5520.0
final.groupby("region")["revenue"].sum()                          # Central 1728, Coast 1698, North 2094`,
}

/** Cells of public/notebooks/week-05-data-cleaning.ipynb, in run order. */
export const week05PythonCells = [
  py.load,
  py.text,
  py.types,
  py.validate,
  py.fix,
  py.duplicates,
  py.outliers,
  py.lookups,
  py.fuzzy,
  py.approve,
]

// Excel formulas, for the layout in Section 2: raw sheet columns A order_id, B customer, C order_date, D flavor,
// E jars, F unit_price, G postcode; helper columns H onwards on the working sheet (H customer_clean, I flavor_clean,
// J date, K price, L copy_no, M region, N customer_final, O region_final; statistics in Q2:Q6 and R, S). Written with commas; where
// your Excel's list separator is a semicolon, type ; instead. The text after → is a note, not part of the formula.
export const xl = {
  textHelpers: `H2: =TRIM(CLEAN(SUBSTITUTE(B2, UNICHAR(160), " ")))   → customer without extra, control or non-breaking spaces
I2: =PROPER(TRIM(D2))                                       → flavor: "strawberry " becomes "Strawberry"
=LEN(B2) - LEN(TRIM(B2))                                    → how many extra spaces TRIM would remove (0 = none)
=UNICODE(MID(B2, 5, 1))                                     → 160 means a non-breaking space is hiding in the text`,
  numbers: `K2: =NUMBERVALUE(SUBSTITUTE(F2, ".", ","), ",", ".")        → "5,00" and "5.00" both become 5
J2: =DATE(RIGHT(C2, 4), MID(C2, 4, 2), LEFT(C2, 2))          → "03/06/2024" becomes 3 June 2024 on any computer
=ISNUMBER(J2)                                                → TRUE only for a real date or number
=NUMBERVALUE(F2, ",", ".")                                   → on "5.00" this returns 500, not 5 (see the box)`,
  validation: `E  jars          Whole number   between 1 and 500
F  unit_price    Decimal        between 3 and 8
C  order_date    Date           between 01/06/2024 and 30/06/2024
D  flavor        List           Strawberry,Blueberry,Peach,Lemon
G  postcode      Custom         =LEN(G2)=5`,
  duplicates: `L2: =COUNTIFS($A$2:A2, A2)                                  → running count of this order_id: 1 = first time, 2 = a copy
=COUNTIFS($H$2:H2, H2, $J$2:J2, J2, $I$2:I2, I2, $E$2:E2, E2)  → the same idea on several columns at once`,
  outliers: `Q2: =QUARTILE.INC($E$2:$E$24, 1)                            → Q1 = 36
Q3: =QUARTILE.INC($E$2:$E$24, 3)                            → Q3 = 60
Q4: =Q3 - Q2                                                → IQR = 24
Q5: =Q3 + 1.5 * Q4                                          → upper fence = 96
Q6: =Q2 - 1.5 * Q4                                          → lower fence = 0
R2: =OR(E2 < $Q$6, E2 > $Q$5)                               → TRUE flags the row (only order 1018)
S2: =STANDARDIZE(E2, AVERAGE($E$2:$E$24), STDEV.S($E$2:$E$24))  → z-score; order 1018 gives 4.44`,
  lookups: `M2: =XLOOKUP(H2, Customers!$B$2:$B$8, Customers!$C$2:$C$8, "NOT FOUND")   → Excel 365 / 2021
=VLOOKUP(H2, Customers!$B$2:$C$8, 2, FALSE)                                    → FALSE = exact match
=INDEX(Customers!$C$2:$C$8, MATCH(H2, Customers!$B$2:$B$8, 0))                 → 0 = exact match`,
  mapping: `N2: =XLOOKUP(H2, Mapping!$A$2:$A$5, Mapping!$B$2:$B$5, H2)                   → approved name, or the name as it is
O2: =XLOOKUP(N2, Customers!$B$2:$B$8, Customers!$C$2:$C$8, "NOT FOUND")       → look up again: no more NOT FOUND`,
}

// Power Query (M): reference code for what the dialogs write. Open it with Home > Advanced Editor.
export const m = {
  load: `let
    Source   = Csv.Document(File.Contents("C:\\data\\jam-wholesale-raw.csv"),
                 [Delimiter = ";", Encoding = 65001, QuoteStyle = QuoteStyle.Csv]),
    Promoted = Table.PromoteHeaders(Source, [PromoteAllScalars = true]),
    Typed    = Table.TransformColumns(Promoted, {
                 {"order_id",   each Number.FromText(_), Int64.Type},
                 {"order_date", each Date.FromText(_, [Format = "dd/MM/yyyy"]), type date},
                 {"jars",       each Number.FromText(_), Int64.Type},
                 {"unit_price", each Number.FromText(Text.Replace(_, ".", ","), "de-DE"), type number},
                 {"postcode",   each _, type text}})
in
    Typed`,
  clean: `let
    Cleaned = Table.TransformColumns(Typed, {
                {"customer", each Text.Trim(Text.Clean(Text.Replace(_, Character.FromNumber(160), " "))), type text},
                {"flavor",   each Text.Proper(Text.Trim(_)), type text}}),
    NoTest  = Table.SelectRows(Cleaned, each [customer] <> "TEST"),
    Unique  = Table.Distinct(NoTest, {"order_id"})
in
    Unique`,
  fuzzy: `let
    Customers = Table.PromoteHeaders(Csv.Document(File.Contents("C:\\data\\jam-customers.csv"),
                  [Delimiter = ";", Encoding = 65001]), [PromoteAllScalars = true]),
    Merged    = Table.FuzzyNestedJoin(Unique, {"customer"}, Customers, {"customer_name"}, "match",
                  JoinKind.LeftOuter, [IgnoreCase = true, Threshold = 0.8]),
    Expanded  = Table.ExpandTableColumn(Merged, "match", {"customer_name", "region"})
in
    Expanded`,
}
