import Header from '@/widgets/header/ui/Header';
import '../style/layout.css';
import { ReactNode } from 'react';
import Footer from '@/widgets/footer/ui/Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
