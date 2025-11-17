import { RouterProvider } from 'react-router-dom';

import { useTypedSelector } from '@/app/store/hooks';
import { createAppRouter } from './providers/router/config/routerConfig';
import { ErrorBoundary } from '@/widgets/error-boundary';
import PageLoader from '@/widgets/page-loader/ui/PageLoader';
import { Suspense } from 'react';

const App = () => {
  const token = useTypedSelector((state) => state.user.token);
  const router = createAppRouter(!!token);

  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
