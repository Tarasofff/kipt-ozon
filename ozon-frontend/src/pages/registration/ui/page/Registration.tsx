import { useState } from 'react';

export default function Registration() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      firstName,
      lastName,
      middleName,
      email,
      phone,
      password,
    });
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
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Ваше имя"
              className="w-full px-4 py-2 border border-gray-500 rounded-lg bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              required
            />
          </div>

          {/* Фамилия */}
          <div>
            <label className="block text-gray-200 mb-1">Фамилия</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Ваша фамилия"
              className="w-full px-4 py-2 border border-gray-500 rounded-lg bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              required
            />
          </div>

          {/* Отчество */}
          <div>
            <label className="block text-gray-200 mb-1">Отчество</label>
            <input
              type="text"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              placeholder="Ваше отчество"
              className="w-full px-4 py-2 border border-gray-500 rounded-lg bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-200 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@mail.com"
              className="w-full px-4 py-2 border border-gray-500 rounded-lg bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              required
            />
          </div>

          {/* Телефон */}
          <div>
            <label className="block text-gray-200 mb-1">Номер телефона</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+380 (___) ___-__-__"
              className="w-full px-4 py-2 border border-gray-500 rounded-lg bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              required
            />
          </div>

          {/* Пароль */}
          <div>
            <label className="block text-gray-200 mb-1">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              className="w-full px-4 py-2 border border-gray-500 rounded-lg bg-black/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-yellow-500 hover:shadow-lg transition transform hover:-translate-y-0.5"
          >
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
}
