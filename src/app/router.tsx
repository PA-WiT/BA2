import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { HomePage } from '../features/home/HomePage'
import { RequireAuth } from '../features/auth/RequireAuth'
import { RequireAdmin } from '../features/auth/RequireAdmin'

// Everything except the shell and home page is code-split: each route's chunk loads on first visit.
export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppShell />,
      hydrateFallbackElement: <p>…</p>,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: 'login',
          lazy: async () => {
            const { LoginPage } = await import('../features/auth/LoginPage')
            return { element: <LoginPage /> }
          },
        },
        {
          path: 'reset-password',
          lazy: async () => {
            const { ResetPasswordPage } = await import('../features/auth/ResetPasswordPage')
            return { element: <ResetPasswordPage /> }
          },
        },
        {
          path: 'week/:id',
          lazy: async () => {
            const { WeekPage } = await import('../features/weeks/WeekPage')
            return { element: <WeekPage /> }
          },
        },
        {
          path: 'settings',
          lazy: async () => {
            const { SettingsPage } = await import('../features/auth/SettingsPage')
            return {
              element: (
                <RequireAuth>
                  <SettingsPage />
                </RequireAuth>
              ),
            }
          },
        },
        {
          path: 'submissions',
          lazy: async () => {
            const { SubmissionsPage } = await import('../features/submissions/SubmissionsPage')
            return {
              element: (
                <RequireAuth>
                  <SubmissionsPage />
                </RequireAuth>
              ),
            }
          },
        },
        {
          path: 'admin/submissions',
          lazy: async () => {
            const { AdminSubmissionsPage } = await import('../features/submissions/AdminSubmissionsPage')
            return {
              element: (
                <RequireAdmin>
                  <AdminSubmissionsPage />
                </RequireAdmin>
              ),
            }
          },
        },
        { path: 'dashboard', element: <h1>Dashboard</h1> },
      ],
    },
  ],
  // Matches vite.config.ts's `base`: '/' in dev, '/BA2/' when built for GitHub Pages.
  { basename: import.meta.env.BASE_URL },
)
