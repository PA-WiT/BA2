import i18n from './index'

// Persian content writes numbers in Persian digits (هفته ۲); Arabic and English content use Latin digits.
const locale = () => (i18n.language === 'fa' ? 'fa' : 'en')

export const formatNumber = (n: number) => new Intl.NumberFormat(locale()).format(n)

/** 0–100 → "40%" / "۴۰٪" */
export const formatPercent = (percent: number) =>
  new Intl.NumberFormat(locale(), { style: 'percent' }).format(percent / 100)
