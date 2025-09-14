import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Main from '@/pages/main/ui/page/Main';
import { APP_ROUTES } from '@/shared/constants/routes';
import { ErrorBoundary } from '@/widgets/error-boundary';
import Layout from '@/widgets/layout/ui/Layout';
import Login from '@/pages/login';
import Registration from '@/pages/registration';
import Patients from '@/pages/patients';
import { ProtectedRoute } from '@/providers/router/ui/ProtectedRoute';
import PageLoader from '@/widgets/page-loader/ui/PageLoader';
import { useTypedSelector } from '@/app/store/hooks';

const App = () => {
  const token = useTypedSelector((state) => state.auth.token);

  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <Layout>
          <Routes>
            <Route path={APP_ROUTES.main} element={<Main />} />
            <Route path={APP_ROUTES.login} element={<Login />} />
            <Route path={APP_ROUTES.registration} element={<Registration />} />
            <Route element={<ProtectedRoute isAuth={!!token} redirectPath={APP_ROUTES.main} />}>
              <Route path={APP_ROUTES.patients} element={<Patients />} />
            </Route>
          </Routes>
        </Layout>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
