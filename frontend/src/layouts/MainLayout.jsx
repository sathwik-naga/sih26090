import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-stone-900 selection:bg-[#C85A32] selection:text-white">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;
