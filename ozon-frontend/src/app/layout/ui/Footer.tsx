export default function Footer() {
  return (
    <footer className="w-full h-20 bg-gray-700 shadow-inner">
      <div className="max-w-7xl mx-auto h-full px-8 flex items-center justify-between">
        {/* Логотип */}
        <div className="text-lg font-bold text-white">OZON</div>
        {/* Копирайт */}
        <div className="text-sm text-gray-400">© {new Date().getFullYear()} OZON. Все права защищены.</div>
      </div>
    </footer>
  );
}
