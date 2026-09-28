import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { WeekPage } from '../features/weeks/WeekPage'
import { HomePage } from '../features/home/HomePage'
import { LoginPage } from '../features/auth/LoginPage'
import { SettingsPage } from '../features/auth/SettingsPage'
import { RequireAuth } from '../features/auth/RequireAuth'
import { RequireAdmin } from '../features/auth/RequireAdmin'
import { SubmissionsPage } from '../features/submissions/SubmissionsPage'
import { AdminSubmissionsPage } from '../features/submissions/AdminSubmissionsPage'

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <AppShell />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'login', element: <LoginPage /> },
        { path: 'week/:id', element: <WeekPage /> },
        {
          path: 'settings',
          element: (
            <RequireAuth>
              <SettingsPage />
            </RequireAuth>
          ),
        },
        {
          path: 'submissions',
          element: (
            <RequireAuth>
              <SubmissionsPage />
            </RequireAuth>
          ),
        },
        {
          path: 'admin/submissions',
          element: (
            <RequireAdmin>
              <AdminSubmissionsPage />
            </RequireAdmin>
          ),
        },
        { path: 'dashboard', element: <h1>Dashboard</h1> },
      ],
    },
  ],
  // Matches vite.config.ts's `base`: '/' in dev, '/BA2/' when built for GitHub Pages.
  { basename: import.meta.env.BASE_URL },
)
