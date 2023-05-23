import Footer from '@/components/Footer';
import Header from '@/components/Header';
import React from 'react';

function MainAppLAyout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

export default MainAppLAyout;
