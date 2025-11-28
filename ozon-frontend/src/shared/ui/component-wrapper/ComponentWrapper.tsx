import { FC, ReactNode } from 'react';
import ErrorMessage from '../error/ErrorMessage';
import Loader from '../loader/Loader';

interface ComponentWrapperProps {
  loading?: boolean;
  error?: string | null;
  children: ReactNode;
}

const ComponentWrapper: FC<ComponentWrapperProps> = ({ loading, error, children }) => {
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  return <>{children}</>;
};

export default ComponentWrapper;
