import { useTypedSelector } from '@/app/store/hooks';
import { APP_ROUTES } from '@/shared/constants/routes';
import { t } from '@lingui/core/macro';
import { Link } from 'react-router-dom';

const Main = () => {
  const token = useTypedSelector((state) => state.auth.token);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col justify-center items-center text-center px-6 overflow-hidden">
      <h1 className="text-8xl md:text-9xl font-extrabold text-gray-900 mb-6 leading-tight">Ozon</h1>
      <p className="text-3xl md:text-4xl text-gray-700 max-w-4xl mb-10">
        {t`Красивый и минималистичный инструмент для работы с пациентами`}
      </p>

      <div className="absolute top-20 left-20 w-40 h-40 bg-blue-200/30 rounded-full rotate-12 animate-pulse"></div>
      <div className="absolute bottom-20 right-24 w-48 h-48 bg-pink-200/30 rounded-full -rotate-6 animate-pulse"></div>

      {!token && (
        <>
          <div className="flex space-x-4">
            <Link
              to={APP_ROUTES.login}
              className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-full font-semibold shadow-md hover:bg-yellow-500 hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              Вход
            </Link>

            <Link
              to={APP_ROUTES.registration}
              className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-full font-semibold shadow-md hover:bg-yellow-500 hover:shadow-lg transition transform hover:-translate-y-0.5"
            >
              Регистрация
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Main;
