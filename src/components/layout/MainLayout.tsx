import { ReactNode } from 'react';
import Header from './Header';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-6 md:py-8">
        {children}
      </main>
    </div>
  );
}
