import Logo from '@/shared/ui/logo/Logo';
import { Navbar } from '@/widgets/navbar';

export default function Header() {
  return (
    <header className="w-full h-16 fixed top-0 left-0 z-30 bg-gray-700 shadow-inner">
      <div className="flex items-center justify-between h-full px-8">
        <Logo />
        <Navbar />
      </div>
    </header>
  );
}
