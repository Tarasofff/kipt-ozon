import { FC, ReactNode } from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

interface LoaderProps {
  message?: string | ReactNode;
  className?: string;
}

const Loader: FC<LoaderProps> = ({ message = 'Загрузка...', className }) => {
  return (
    <div className={`flex items-center justify-center min-h-screen ${className || ''}`}>
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-xl shadow-lg px-6 py-4 flex items-center gap-3 text-2xl font-bold animate-fadeIn">
        <BiLoaderAlt className="text-4xl animate-spin" />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Loader;
