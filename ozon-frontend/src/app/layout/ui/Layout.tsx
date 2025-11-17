import { Outlet } from 'react-router-dom';
import Header from '@/app/layout/ui/Header';
import Footer from '@/app/layout/ui/Footer';
import '../style/layout.css';

export default function Layout() {
  return (
    //TODO styles
    <div className="layout min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
