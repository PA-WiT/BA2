import { useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { updatePassword } from '../../lib/auth'
import styles from './auth.module.css'

/** New password + confirmation. Used by Settings and by the password-reset page. */
export function ChangePasswordForm({ onSuccess }: { onSuccess?: () => void }) {
  const { t } = useTranslation()
  const [newPassword, setNewPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (newPassword !== confirm) {
      setStatus(t('passwordsDontMatch'))
      return
    }
    const { error } = await updatePassword(newPassword)
    setStatus(error ? error.message : 'ok')
    if (!error) {
      setNewPassword('')
      setConfirm('')
      onSuccess?.()
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        {t('newPassword')}
        <input
          type="password"
          required
          minLength={6}
          autoComplete="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </label>
      <label>
        {t('confirmPassword')}
        <input
          type="password"
          required
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </label>
      {status && status !== 'ok' && <p className={styles.error}>{status}</p>}
      <button type="submit" className={styles.submit}>
        {t('save')}
      </button>
    </form>
  )
}
