import React from 'react';
import { messages } from '../../config/defaultMessages';

export const Footer = () => (
  <footer className="bg-gray-800 text-white mt-12">
    <div className="container mx-auto px-6 py-4 text-center">
      <p>{messages.footer_copyright.defaultMessage.replace('{year}', new Date().getFullYear())}</p>
    </div>
  </footer>
);
