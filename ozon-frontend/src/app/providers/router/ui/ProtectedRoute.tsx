import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  isAuth: boolean;
  redirectPath?: string;
}

export const ProtectedRoute = ({ isAuth, redirectPath = '/' }: ProtectedRouteProps) => {
  if (!isAuth) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
