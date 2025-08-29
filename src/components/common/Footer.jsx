import React from 'react';
import { messages } from '../../config/defaultMessages';

export const Footer = () => (
  <footer className="bg-coal text-cream mt-12">
    <div className="container mx-auto px-6 py-6 text-center">
      <p className="opacity-80">
        {messages.footer_copyright
          .defaultMessage.replace('{year}', new Date().getFullYear())}
      </p>
    </div>
  </footer>
);
