// Code shown in Week 8 (src/content/weeks/week-08.ts). Kept free of imports so Node can load it to generate
// public/notebooks/week-08-errors-and-reporting.ipynb (regenerate that file if the Python cells change).
// Verified: every Python cell was run end to end on public/data/jam-tasting.csv, and the Excel formulas were
// recalculated in LibreOffice.

export const dataBase = 'https://raw.githubusercontent.com/PA-WiT/BA2/main/public/data/'

export const py = {
  describe: `import pandas as pd

BASE = "${dataBase}"   # or upload the CSV and use its file name
sat = pd.read_csv(BASE + "jam-tasting.csv")
jars = sat["jars"]

print(jars.mean(), jars.median())                 # 60.15 59.0
print(jars.mode().tolist())                        # [58, 59]: two values tie, each appears 3 times
print(jars.min(), jars.max(), jars.max() - jars.min())   # 44 80 36 (the range)
print(jars.quantile([0.25, 0.5, 0.75]).tolist())   # [57.25, 59.0, 64.5] (the quartiles)

# Frequency: how many Saturdays fall in each band of 10 jars
bands = pd.cut(jars, bins=[40, 50, 60, 70, 80, 90], right=False)
print(bands.value_counts().sort_index())           # 40s: 3, 50s: 8, 60s: 6, 70s: 2, 80s: 1`,
  sdSe: `import math

sd = jars.std()                      # spread of single Saturdays (sample standard deviation)
se = sd / math.sqrt(len(jars))       # how much the AVERAGE of 20 Saturdays would wobble
print(round(sd, 2), round(se, 2))    # 9.46 2.12`,
  confusion: `# The lesson's spam filter, tested on 100 emails
tp, fn, fp, tn = 45, 20, 5, 30

accuracy = (tp + tn) / (tp + tn + fp + fn)
precision = tp / (tp + fp)           # when it says "spam", how often is it right?
recall = tp / (tp + fn)              # of all the spam, how much did it catch? (sensitivity)
specificity = tn / (tn + fp)         # of all the good mail, how much did it let through?
print(round(accuracy, 2), round(precision, 2), round(recall, 2), round(specificity, 2))   # 0.75 0.9 0.69 0.86`,
  chart: `import matplotlib.pyplot as plt

avg = sat.groupby("tasting")["jars"].mean()          # no 55.4, yes 64.9
fig, ax = plt.subplots(figsize=(5, 3.5))
ax.bar(["No tasting", "Tasting"], [avg["no"], avg["yes"]], color=["#9AA5B1", "#C0602B"])
ax.set_ylim(0, 75)                                   # bars start at zero
for x, v in enumerate([avg["no"], avg["yes"]]):
    ax.text(x, v + 1.5, f"{v:.1f}", ha="center")     # label the bars instead of adding gridlines
ax.set_title("Tasting Saturdays sell about 9.5 more jars", loc="left")   # the title says the takeaway
ax.set_ylabel("Average jars per Saturday")
ax.spines[["top", "right"]].set_visible(False)       # remove ink that carries no data
plt.tight_layout()
plt.show()`,
}

/** Cells of public/notebooks/week-08-errors-and-reporting.ipynb, in run order. */
export const week08PythonCells = [py.describe, py.sdSe, py.confusion, py.chart]

// Excel formulas. The text after → is a note, not part of the formula. Where your Excel's list separator is a
// semicolon, type ; instead of ,
export const xl = {
  describe: `Column E of jam-tasting.csv holds jars (rows 2–21).
=AVERAGE(E2:E21)                          → 60.15  (mean)
=MEDIAN(E2:E21)                           → 59     (median: the middle Saturday)
=MODE.MULT(E2:E21)                        → 58 and 59 (two modes; it spills into two cells)
=MAX(E2:E21) - MIN(E2:E21)                → 36     (range: 80 - 44)
=QUARTILE.INC(E2:E21, 1)                  → 57.25  (first quartile: a quarter of Saturdays sold less)
=QUARTILE.INC(E2:E21, 3)                  → 64.5   (third quartile)
=COUNTIFS(E2:E21, ">=50", E2:E21, "<60")  → 8      (frequency: Saturdays with 50–59 jars)`,
  sdSe: `=STDEV.S(E2:E21)                          → 9.46  (standard deviation: spread of single Saturdays)
=STDEV.S(E2:E21) / SQRT(COUNT(E2:E21))    → 2.12  (standard error: wobble of the average)`,
  confusion: `B2: 45   C2: 20      → really spam:  caught (TP), missed (FN)
B3: 5    C3: 30      → really good:  false alarm (FP), let through (TN)
=(B2 + C3) / SUM(B2:C3)                   → 0.75  (accuracy)
=B2 / (B2 + B3)                           → 0.90  (precision)
=B2 / (B2 + C2)                           → 0.69  (recall, or sensitivity)
=C3 / (C3 + B3)                           → 0.86  (specificity)`,
}
