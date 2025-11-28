import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/app/layout/ui/Layout';
import { APP_ROUTES } from '@/shared/routes/appRoutes';
import { ProtectedRoute } from '../ui/ProtectedRoute';
import Main from '@/pages/main';
import Login from '@/pages/login';
import Registration from '@/pages/registration';
import Patients from '@/pages/patients';
import Diagnoses from '@/pages/diagnoses';
import { authLoader } from '../loaders/authLoader';

export const createAppRouter = () =>
  createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: APP_ROUTES.main, element: <Main /> },
        { path: APP_ROUTES.login, element: <Login /> },
        { path: APP_ROUTES.registration, element: <Registration /> },
        {
          element: <ProtectedRoute />,
          loader: authLoader,
          children: [
            { path: APP_ROUTES.patients, element: <Patients /> },
            { path: APP_ROUTES.diagnoses, element: <Diagnoses /> },
          ],
        },
      ],
    },
  ]);
