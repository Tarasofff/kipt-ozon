import { Link, useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '@/shared/constants/routes';
import LanguageSwitcher from '@/features/i18n/LanguageSwitcher';
import { useTypedDispatch, useTypedSelector } from '@/app/store/hooks';
import { clearAuthData } from '@/utils/localStorageUtils';
import { logout } from '@/features/auth/model/authSlice';

export default function Header() {
  const token = useTypedSelector((state) => state.auth.token);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    clearAuthData();
    navigate(APP_ROUTES.login);
  };

  return (
    <header className="w-full h-16 fixed top-0 left-0 z-30 bg-gray-700 shadow-inner">
      <div className="flex items-center justify-between h-full px-8">
        <div className="text-2xl font-extrabold text-white tracking-wide">OZON</div>
        {/* TODO */}
        {/* <LanguageSwitcher /> */}

        <nav className="flex items-center space-x-6">
          <Link to={APP_ROUTES.patients} className="relative text-white font-medium px-3 py-2 group">
            Пациенты
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
          </Link>

          {/* <Link to={APP_ROUTES.sessions} className="relative text-white font-medium px-3 py-2 group">
            Сесии
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
          </Link> */}

          <Link to={APP_ROUTES.main} className="relative text-white font-medium px-3 py-2 group">
            Главная
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
          </Link>

          {!token && (
            <>
              <Link
                to={APP_ROUTES.login}
                className="px-5 py-2 bg-yellow-400 text-gray-900 rounded-full font-semibold shadow-md hover:bg-yellow-500 hover:shadow-lg transition transform hover:-translate-y-0.5"
              >
                Вход
              </Link>

              <Link
                to={APP_ROUTES.registration}
                className="px-5 py-2 bg-yellow-400 text-gray-900 rounded-full font-semibold shadow-md hover:bg-yellow-500 hover:shadow-lg transition transform hover:-translate-y-0.5"
              >
                Регистрация
              </Link>
            </>
          )}

          {!!token && (
            <>
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-yellow-400 text-gray-900 rounded-full font-semibold shadow-md hover:bg-yellow-500 hover:shadow-lg transition transform hover:-translate-y-0.5"
              >
                Выход
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
