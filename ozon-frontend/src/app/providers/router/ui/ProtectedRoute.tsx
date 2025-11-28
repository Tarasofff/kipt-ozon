import { Navigate, Outlet, useLoaderData } from 'react-router-dom';

interface ProtectedRouteLoaderData {
  isAuth: boolean;
  redirectPath: string;
}

export const ProtectedRoute = () => {
  const { isAuth, redirectPath }: ProtectedRouteLoaderData = useLoaderData();

  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
