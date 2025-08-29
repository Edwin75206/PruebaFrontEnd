import React from 'react';
import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';

export const Layout = ({ children, navigate }) => (
  <div className="flex flex-col min-h-screen bg-gray-50">
    <Header navigate={navigate} />
    <main className="flex-grow container mx-auto px-6 py-8">{children}</main>
    <Footer />
  </div>
);
