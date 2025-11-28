import { APP_ROUTES } from '@/shared/routes/appRoutes';
import { Link, useNavigate } from 'react-router-dom';
import { useTypedSelector, useTypedDispatch } from '@/app/store';
import { logout } from '@/entities/user/model/slice/userSlice';
import { clearPatients } from '@/entities/patient/models/slice/patientsSlice';

export default function Navbar() {
  const token = useTypedSelector((state) => state.user.token);
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearPatients());
    navigate(APP_ROUTES.login);
  };

  return (
    <div>
      <nav className="flex items-center space-x-6">
        <Link to={APP_ROUTES.patients} className="relative text-white font-medium px-3 py-2 group">
          Пациенты
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
        </Link>

        {/* <Link to={APP_ROUTES.diagnoses} className="relative text-white font-medium px-3 py-2 group">
          Диагнозы
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
        </Link> */}

        <Link to={APP_ROUTES.main} className="relative text-white font-medium px-3 py-2 group">
          Главная
          <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full"></span>
        </Link>

        {token ? (
          <button
            onClick={handleLogout}
            className="px-5 py-2 bg-yellow-400 text-gray-900 rounded-full font-semibold shadow-md hover:bg-yellow-500 hover:shadow-lg transition transform hover:-translate-y-0.5"
          >
            Выход
          </button>
        ) : (
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
      </nav>
    </div>
  );
}
