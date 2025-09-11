import { FaGlobeAmericas, FaGlobeEurope } from 'react-icons/fa';
import { SupportedLocale } from '@/app/i18n/constants';
import { setUserLocale } from '@/app/i18n/store';
import { useTypedDispatch, useTypedSelector } from '@/app/store';

const LANGUAGES: { code: SupportedLocale; label: string; icon: React.ReactNode }[] = [
  { code: 'en-US', label: 'EN', icon: <FaGlobeAmericas /> },
  { code: 'ru', label: 'RU', icon: <FaGlobeEurope /> },
];

export default function LanguageSwitcher() {
  const dispatch = useTypedDispatch();
  const currentLang = useTypedSelector((state) => state.i18n.userLocale);

  const handleChange = (lang: SupportedLocale) => {
    if (lang !== currentLang) {
      document.documentElement.setAttribute('lang', lang);
      dispatch(setUserLocale(lang));
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleChange(lang.code)}
          className={`flex items-center px-4 py-2 rounded-full font-semibold transition text-sm ${
            currentLang === lang.code ? 'bg-yellow-400 text-gray-900' : 'bg-gray-700 text-white hover:bg-gray-600'
          }`}
        >
          <span className="mr-2 text-lg">{lang.icon}</span>
          {lang.label}
        </button>
      ))}
    </div>
  );
}
