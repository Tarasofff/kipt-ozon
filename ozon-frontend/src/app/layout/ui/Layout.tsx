import { Outlet } from 'react-router-dom';
import Header from '@/app/layout/ui/Header';

export default function Layout() {
  return (
    <div className="layout min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}
