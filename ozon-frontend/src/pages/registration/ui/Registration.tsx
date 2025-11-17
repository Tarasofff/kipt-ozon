import { CreateUserPayload } from '@/entities/user/model/type/userRole';
import { handlePhoneInput, handleTextInput } from '@/shared/lib/input/inputUtils';
import { useState } from 'react';

export default function Registration() {
  const [form, setForm] = useState<CreateUserPayload>({
    first_name: '',
    middle_name: '',
    last_name: '',
    phone: '',
    date_of_birth: '',
    email: '',
    password: '',
    confirm_password: '',
    role_id: null,
    specialization_id: null,
  });

  const confirmPassword = (pass: string, confirmPass: string) => pass === confirmPass;
  const isPasswordMatch = confirmPassword(form.password, form.confirm_password);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800 bg-opacity-0">
      <div className="bg-black/40 text-white rounded-2xl shadow-lg p-10 w-full max-w-md backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white text-center mb-6">Регистрация</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Имя */}
          <div>
            <label className="block text-gray-200 mb-1">Имя</label>
            <input
              minLength={2}
              maxLength={32}
              type="text"
              title="Допустимы только буквы"
              required
              value={form.first_name}
              onChange={(e) => setForm({ ...form, first_name: e.target.value })}
              onBeforeInput={handleTextInput}
              className="w-full px-4 py-2 border border-gray-500 rounded-lg bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
          </div>

          {/* Фамилия */}
          <div>
            <label className="block text-gray-200 mb-1">Фамилия</label>
            <input
              minLength={2}
              maxLength={32}
              type="text"
              title="Допустимы только буквы"
              required
              value={form.middle_name}
              onChange={(e) => setForm({ ...form, middle_name: e.target.value })}
              onBeforeInput={handleTextInput}
              className="w-full px-4 py-2 border border-gray-500 rounded-lg bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
          </div>

          {/* Отчество */}
          <div>
            <label className="block text-gray-200 mb-1">Отчество</label>
            <input
              minLength={2}
              maxLength={32}
              type="text"
              title="Допустимы только буквы"
              required
              value={form.last_name}
              onChange={(e) => setForm({ ...form, last_name: e.target.value })}
              onBeforeInput={handleTextInput}
              className="w-full px-4 py-2 border border-gray-500 rounded-lg bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-200 mb-1">Email</label>
            <input
              minLength={4}
              maxLength={32}
              type="email"
              title="Допустима только электронная почта"
              placeholder="Email@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-500 rounded-lg bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
          </div>

          {/* Телефон */}
          <div>
            <label className="block text-gray-200 mb-1">Номер телефона</label>
            <input
              type="tel"
              minLength={8}
              maxLength={14}
              title="Допустимы только цифры и знак +"
              required
              value={form.phone}
              onBeforeInput={handlePhoneInput}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="+380 (___) ___-__-__"
              className="w-full px-4 py-2 border border-gray-500 rounded-lg bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
          </div>

          {/* Пароль */}
          <div>
            <label className="block text-gray-200 mb-1">Пароль</label>
            <input
              type="password"
              minLength={8}
              maxLength={32}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-500 rounded-lg bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              required
            />
          </div>

          {/* Подтверждение пароля */}
          <div>
            <label className="block text-gray-200 mb-1">Подтверждение пароля</label>
            <input
              type="password"
              minLength={8}
              maxLength={32}
              value={form.confirm_password}
              onChange={(e) => setForm({ ...form, confirm_password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-500 rounded-lg bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={!isPasswordMatch || !form.password}
            className="w-full py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-yellow-500 hover:shadow-lg transition transform hover:-translate-y-0.5"
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
}
