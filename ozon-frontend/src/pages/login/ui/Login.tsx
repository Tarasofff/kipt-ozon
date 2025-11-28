import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from '@/app/store/hooks';
import { loginRequest } from '@/entities/user/model/slice/userSlice';
import { APP_ROUTES } from '@/shared/routes/appRoutes';
import { LoginPayload } from '@/entities/user/model/type/authType';

export default function Login() {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState<LoginPayload>({
    phone: '',
    password: '',
  });

  const { loading, error, token, user } = useTypedSelector((state) => state.user);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginRequest(form));
  };

  useEffect(() => {
    if (token && user) {
      navigate(APP_ROUTES.patients);
    }
  }, [token, navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800 bg-opacity-0">
      <div className="bg-black/40 text-white rounded-2xl shadow-lg p-10 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Вход в аккаунт</h1>

        {error && <div className="mb-3 text-red-400">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Номер телефона</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+380 (___) ___-__-__"
              className="w-full px-4 py-2 border rounded bg-black/30 text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Пароль</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Введите пароль"
              className="w-full px-4 py-2 border rounded bg-black/30 text-white"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-yellow-500"
          >
            {loading ? 'Входим...' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
}
