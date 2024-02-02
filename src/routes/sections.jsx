import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import { WebMethods } from 'src/config/Method';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UniversityPage = lazy(() => import('src/pages/university'));
export const StudentPage = lazy(() => import('src/pages/student'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {

  // useEffect(()=>{
  //   const token = localStorage.getItem('token');
  //   console.log(token)
  // },[])

  // const isAuthenticated = WebMethods.GetLocalStorage('token');
  const isAuthenticated = WebMethods.GetSessionStorage('token');

  const routes = useRoutes([
    {
      path:"/",
      element: isAuthenticated ? (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ) : (
        <Navigate to="/login" replace />
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'university', element: <UniversityPage /> },
        { path: 'student', element: <StudentPage /> },
      ],
    },
    {
      path: 'login',
      element: !isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
