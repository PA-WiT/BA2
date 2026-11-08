// Code shown in Week 7 (src/content/weeks/week-07.ts). Kept free of imports so Node can load it to generate
// public/notebooks/week-07-hypothesis-testing.ipynb (regenerate that file if the Python cells change).
// Verified: every Python cell was run end to end (scipy, statsmodels) on public/data/jam-tasting.csv, and the Excel
// formulas were recalculated in LibreOffice.

export const dataBase = 'https://raw.githubusercontent.com/PA-WiT/BA2/main/public/data/'

export const py = {
  taster: `from math import comb

# The jam taster got 9 of 10 right. If they were only guessing (H0), each guess is a 50/50 chance.
# How often would pure guessing get 9 or 10 right?
p = sum(comb(10, k) for k in (9, 10)) / 2**10
print(round(p, 4))   # 0.0107: about 1 time in 100`,
  jarsZ: `import math
import pandas as pd
from scipy.stats import norm

BASE = "${dataBase}"   # or upload the CSV and use its file name
sat = pd.read_csv(BASE + "jam-tasting.csv")
x_bar = sat["jars"].mean()               # our 20 Saturdays: 60.15 jars on average

# H0: still 56 jars a Saturday (or fewer)   Ha: more than 56 (right-tailed). sigma = 10 jars, from the old records.
z = (x_bar - 56) / (10 / math.sqrt(20))
p = 1 - norm.cdf(z)
print(round(x_bar, 2), round(z, 2), round(p, 3))   # 60.15 1.86 0.032`,
  yourTurn: `# Buyers used to spend 12 euros on average (sigma = 4). After the new recipe, 64 buyers spent 13.20 on average.
# H0: mean <= 12   Ha: mean > 12   (right-tailed), alpha = 0.05
z_critical = norm.ppf(0.95)              # the 5% line
z = (13.20 - 12) / (4 / math.sqrt(64))
p = 1 - norm.cdf(z)
print(round(z_critical, 3), round(z, 2), round(p, 4))   # 1.645 2.4 0.0082`,
  jam: `# Supplier: 340 g per jar, sigma = 6 g. We weighed 36 jars: average 338 g.
# H0: mean >= 340   Ha: mean < 340   (left-tailed)
z = (338 - 340) / (6 / math.sqrt(36))
p = norm.cdf(z)                          # left tail
print(z, round(p, 4))                    # -2.0 0.0228 -> below 0.05, reject H0`,
  twoMeans: `import pandas as pd
from scipy import stats

BASE = "${dataBase}"   # or upload the CSV and use its file name
df = pd.read_csv(BASE + "jam-tasting.csv")
yes = df.loc[df["tasting"] == "yes", "jars"]
no = df.loc[df["tasting"] == "no", "jars"]
print(yes.mean(), no.mean())             # 64.9 55.4

# Ha: tasting days sell MORE, so the test is right-tailed (alternative="greater")
t, p = stats.ttest_ind(yes, no, equal_var=False, alternative="greater")   # Welch's t-test: compares two averages
print(round(t, 2), round(p, 4))          # 2.55 0.0103`,
  twoRates: `from statsmodels.stats.proportion import proportions_ztest

g = df.groupby("tasting")[["buyers", "visitors"]].sum()
print((g["buyers"] / g["visitors"]).round(3))       # no 0.271, yes 0.308

z, p = proportions_ztest(g.loc[["yes", "no"], "buyers"], g.loc[["yes", "no"], "visitors"], alternative="larger")
print(round(z, 2), round(p, 4))          # 2.21 0.0134  (right-tailed: tasting converts MORE visitors)`,
}

/** Cells of public/notebooks/week-07-hypothesis-testing.ipynb, in run order. */
export const week07PythonCells = [py.taster, py.jarsZ, py.yourTurn, py.jam, py.twoMeans, py.twoRates]

// Excel formulas. The text after → is a note, not part of the formula. Where your Excel's list separator is a
// semicolon, type ; instead of ,
export const xl = {
  jarsZ: `Put these in empty cells next to the data (column E holds jars, rows 2–21):
H1: =AVERAGE(E2:E21)                  → 60.15 (x̄: our average jars a Saturday)
H2: =(H1 - 56) / (10 / SQRT(20))      → 1.86  (z: how many "wobbles" above 56)
H3: =1 - NORM.S.DIST(H2, TRUE)        → 0.032 (p-value, right-tailed: the area to the RIGHT of z)
H4: =NORM.S.INV(0.95)                 → 1.645 (the 5% line, called z-critical)`,
  yourTurn: `=NORM.S.INV(0.95)                   → 1.645  (the 5% line: z-critical, right-tailed, alpha = 0.05)
=(13.20 - 12) / (4 / SQRT(64))      → 2.4    (z)
=1 - NORM.S.DIST(2.4, TRUE)         → 0.0082 (p-value)`,
  jam: `B1: 340        → the claim (mean in grams)
B2: 6          → sigma
B3: 36         → jars weighed
B4: 338        → their average
B5: =(B4 - B1) / (B2 / SQRT(B3))      → z = -2
B6: =NORM.S.DIST(B5, TRUE)            → p = 0.0228 (left-tailed)`,
  twoMeans: `Sort the data by "tasting" first (Data ▸ Sort), so the "no" Saturdays are rows 2–11 and the "yes" ones rows 12–21.
=AVERAGE(E12:E21)                     → 64.9 jars with tasting
=AVERAGE(E2:E11)                      → 55.4 jars without
=T.TEST(E12:E21, E2:E11, 1, 3)        → 0.0103  (1 = one tail, because Ha says "more"; 3 = groups may have different spreads)
                                         (use 2 instead of 1 for a two-tailed question: "different")`,
  twoRates: `H2: =SUMIF(B2:B21, "yes", D2:D21) / SUMIF(B2:B21, "yes", C2:C21)    → 0.308 (buy rate with tasting)
H3: =SUMIF(B2:B21, "no", D2:D21) / SUMIF(B2:B21, "no", C2:C21)      → 0.271 (without)
H4: =SUM(D2:D21) / SUM(C2:C21)                                       → 0.290 (both together)
H5: =(H2 - H3) / SQRT(H4 * (1 - H4) * (1 / SUMIF(B2:B21, "yes", C2:C21) + 1 / SUMIF(B2:B21, "no", C2:C21)))   → z = 2.21
H6: =1 - NORM.S.DIST(H5, TRUE)                                       → p = 0.0134 (right-tailed: Ha says "more")
    =2 * (1 - NORM.S.DIST(ABS(H5), TRUE))                            → p = 0.027  (two-tailed, if Ha says "different")`,
}
