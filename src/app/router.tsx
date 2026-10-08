import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '../components/AppShell'
import { HomePage } from '../features/home/HomePage'

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
          path: 'week/:id',
          lazy: async () => {
            const { WeekPage } = await import('../features/weeks/WeekPage')
            return { element: <WeekPage /> }
          },
        },
        { path: 'dashboard', element: <h1>Dashboard</h1> },
      ],
    },
  ],
  // Matches vite.config.ts's `base`: '/' in dev, '/BA2/' when built for GitHub Pages.
  { basename: import.meta.env.BASE_URL },
)
