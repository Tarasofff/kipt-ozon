export default function Footer() {
  return (
    <footer className="w-full h-20 bg-gray-700 shadow-inner">
      <div className="max-w-7xl mx-auto h-full px-8 flex items-center justify-between">
        {/* Логотип */}
        <div className="text-lg font-bold text-white">OZON</div>

        {/* Навигация */}
        <nav className="flex items-center space-x-6">
          <a href="#about" className="text-gray-300 hover:text-yellow-400 transition">
            О нас
          </a>
          <a href="#contacts" className="text-gray-300 hover:text-yellow-400 transition">
            Контакты
          </a>
          <a href="#policy" className="text-gray-300 hover:text-yellow-400 transition">
            Политика
          </a>
        </nav>

        {/* Копирайт */}
        <div className="text-sm text-gray-400">© {new Date().getFullYear()} OZON. Все права защищены.</div>
      </div>
    </footer>
  );
}
