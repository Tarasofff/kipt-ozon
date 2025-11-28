import { FC, ReactNode } from 'react';
import { BiXCircle } from 'react-icons/bi';

interface ErrorMessageProps {
  message?: string | ReactNode;
  className?: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message = 'Unexpected error', className = '' }) => {
  return (
    <div className={`flex items-center justify-center min-h-screen ${className}`}>
      <div className="bg-red-100 border border-red-400 text-red-700 rounded-xl shadow-lg px-6 py-4 flex items-center gap-3 text-2xl font-bold animate-fadeIn">
        <BiXCircle className="text-4xl" />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;
