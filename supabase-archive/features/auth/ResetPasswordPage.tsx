import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from './AuthProvider'
import { ChangePasswordForm } from './ChangePasswordForm'
import styles from './auth.module.css'

/** Landing page for the emailed recovery link. Supabase signs the user in with a short-lived
 *  recovery session from the link, so "has a session" is how we know the link was valid. */
export function ResetPasswordPage() {
  const { t } = useTranslation()
  const { user, loading } = useAuth()
  const [done, setDone] = useState(false)

  if (loading) return <p>{t('loading')}</p>

  return (
    <div>
      <h1>{t('resetPassword')}</h1>
      {done ? (
        <>
          <p>{t('passwordUpdated')}</p>
          <Link to="/">{t('home')}</Link>
        </>
      ) : user ? (
        <ChangePasswordForm onSuccess={() => setDone(true)} />
      ) : (
        <>
          <p className={styles.error}>{t('linkExpired')}</p>
          <Link to="/login">{t('backToLogin')}</Link>
        </>
      )}
    </div>
  )
}
