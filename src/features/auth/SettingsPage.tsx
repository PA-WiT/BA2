import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { signOut, updateEmail } from '../../lib/auth'
import { useAuth } from './AuthProvider'
import { ChangePasswordForm } from './ChangePasswordForm'
import styles from './auth.module.css'

export function SettingsPage() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [newEmail, setNewEmail] = useState('')
  const [emailStatus, setEmailStatus] = useState<string | null>(null)

  async function handleEmailSubmit(e: FormEvent) {
    e.preventDefault()
    const { error } = await updateEmail(newEmail)
    setEmailStatus(error ? error.message : 'ok')
  }

  return (
    <div>
      <h1>{t('settings')}</h1>

      <div className={styles.section}>
        <h2>{t('changeEmail')}</h2>
        <p>
          {t('currentEmail')}: <strong>{user?.email}</strong>
        </p>
        <form className={styles.form} onSubmit={handleEmailSubmit}>
          <label>
            {t('newEmail')}
            <input
              type="email"
              required
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </label>
          {emailStatus && emailStatus !== 'ok' && <p className={styles.error}>{emailStatus}</p>}
          <button type="submit" className={styles.submit}>
            {t('save')}
          </button>
        </form>
      </div>

      <div className={styles.section}>
        <h2>{t('changePassword')}</h2>
        <ChangePasswordForm />
      </div>

      <button
        type="button"
        className={styles.submit}
        onClick={async () => {
          await signOut()
          navigate('/')
        }}
      >
        {t('signOut')}
      </button>
    </div>
  )
}
