import Header from '@/widgets/header/ui/Header';
import '../style/layout.css';
import { ReactNode } from 'react';
import Footer from '@/widgets/footer/ui/Footer';
import LanguageSwitcher from '@/features/i18n/LanguageSwitcher';

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
