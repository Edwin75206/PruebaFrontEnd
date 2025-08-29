import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout = ({ children, navigate, onSearch }) => (
  <div className="flex flex-col min-h-screen bg-cream text-ink">
    <Header navigate={navigate} onSearch={onSearch} />
    <main className="flex-grow container mx-auto px-6 py-8">
      {children}
    </main>
    <Footer />
  </div>
);
