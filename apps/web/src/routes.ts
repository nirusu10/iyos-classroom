import { createBrowserRouter, type RouteObject } from 'react-router'
import Root from './layouts/Root'
import Home from './pages/Home'
import Materials from './pages/Materials'
import BookingPage from './pages/BookingPage'

const routes: RouteObject[] = [
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: 'materials', Component: Materials },
      { path: 'booking', Component: BookingPage },
    ],
  },
]

const router = createBrowserRouter(routes)

export default router
