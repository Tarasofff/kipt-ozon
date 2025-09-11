import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypedDispatch, useTypedSelector } from '@/app/store/hooks';
import { loginRequest } from '@/features/auth/model/authSlice';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useTypedSelector((state) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginRequest({ phone, password }));
  };

  useEffect(() => {
    if (token) {
      navigate('/patients'); // редирект после логина
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+380 (___) ___-__-__"
              className="w-full px-4 py-2 border rounded bg-black/30 text-white"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
