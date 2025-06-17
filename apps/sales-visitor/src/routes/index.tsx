import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import LogVisitedPage from '../pages/log-visited';
import VisitorReportPage from '../pages/visitor-report';
import { LoginPage } from '../pages/login';
import type { FutureConfig } from 'react-router-dom';

const routes: RouteObject[] = [
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/log-visited', element: <LogVisitedPage /> },
  { path: '/visitor-report', element: <VisitorReportPage /> },
  { path: '*', element: <Navigate to="/login" replace /> },
];

export const router = createBrowserRouter(routes, {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  } as Partial<FutureConfig>,
});
