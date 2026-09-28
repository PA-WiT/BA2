import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../features/theme/useTheme'
import { useAuth } from '../features/auth/AuthProvider'
import styles from './TopBar.module.css'

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'AR' },
  { code: 'fa', label: 'FA' },
] as const

export function TopBar() {
  const { t, i18n } = useTranslation()
  const { theme, toggle } = useTheme()
  const { user, profile } = useAuth()

  return (
    <div className={styles.langbar}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          className={i18n.language === l.code ? styles.active : undefined}
          onClick={() => i18n.changeLanguage(l.code)}
        >
          {l.label}
        </button>
      ))}
      <button
        type="button"
        className={styles.themeToggle}
        onClick={toggle}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {theme === 'dark' ? '☀️' : '🌙'}
      </button>
      {user && (
        <Link to="/submissions" className={styles.accountPill}>
          {t('mySubmissions')}
        </Link>
      )}
      {profile?.role === 'admin' && (
        <Link to="/admin/submissions" className={styles.accountPill}>
          {t('admin')}
        </Link>
      )}
      <Link to={user ? '/settings' : '/login'} className={styles.accountPill}>
        {user ? user.email : t('login')}
      </Link>
    </div>
  )
}
