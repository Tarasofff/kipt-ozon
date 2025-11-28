import { store } from '@/app/store';
import { APP_ROUTES } from '@/shared/routes/appRoutes';

export const authLoader = () => {
  const { user } = store.getState();

  return {
    isAuth: !!user.token,
    redirectPath: APP_ROUTES.main,
  };
};
