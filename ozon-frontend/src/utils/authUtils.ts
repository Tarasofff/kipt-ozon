import { AppDispatch } from '@/app/store';
import { logout as logoutAction } from '@/features/auth/model/authSlice';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '@/shared/constants/routes';

export const logout = (dispatch: AppDispatch, navigate: ReturnType<typeof useNavigate>) => {
  dispatch(logoutAction());

  localStorage.removeItem('token');
  localStorage.removeItem('token_type');
  localStorage.removeItem('user');

  navigate(APP_ROUTES.login);
};
