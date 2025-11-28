import { RouterProvider } from 'react-router-dom';
import { createAppRouter } from './providers/router/config/routerConfig';
import { ErrorBoundary } from '@/app/providers/error-boundary';
import PageLoader from '@/shared/ui/page-loader/PageLoader';
import { Suspense, useMemo } from 'react';
import '@/shared/api/interceptors';
import { useInitializeAppData } from './store/hooks';

const App = () => {
  useInitializeAppData();

  const router = useMemo(() => createAppRouter(), []);

  return (
    <ErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
