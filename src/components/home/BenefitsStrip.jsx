import React from 'react';
import { Icon } from '../../icons';

// Franja de beneficios que se muestra en la pagina de inicio.

const items = [
  { icon: 'truck', title: 'Envio gratis', desc: 'En pedidos seleccionados' },
  { icon: 'user', title: 'Soporte 24/7', desc: 'Te ayudamos cuando quieras' },
  { icon: 'shield', title: 'Pago seguro', desc: 'Proteccion y confianza' },
];

export const BenefitsStrip = () => {
  return (
    <section id="benefits" className="container mx-auto px-4 grid md:grid-cols-3 gap-4">
      {items.map((it) => (
        <div key={it.title} className="bg-white rounded-xl shadow-card p-5 flex items-start gap-4 hover:shadow-xl transition">
          <div className="shrink-0 rounded-lg bg-espresso/10 text-espresso p-3">
            <Icon name={it.icon} className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold">{it.title}</h3>
            <p className="text-sm text-gray-500">{it.desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
};