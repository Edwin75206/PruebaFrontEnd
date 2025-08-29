import React from 'react';
import { Icon } from '../../icons';

const items = [
  { icon: 'truck', title: 'Envío gratis', desc: 'En pedidos seleccionados' },
  { icon: 'user', title: 'Soporte 24/7', desc: 'Te ayudamos cuando quieras' },
  { icon: 'shield', title: 'Pago seguro', desc: 'Protección y confianza' },
];

export const BenefitsStrip = () => {
  return (
    <section id="benefits" className="grid md:grid-cols-3 gap-4">
      {items.map((it) => (
        <div key={it.title} className="bg-white rounded-xl shadow-card p-5 flex items-start gap-3 hover:shadow-xl transition">
          <div className="shrink-0 rounded-lg bg-espresso/10 text-espresso p-3">
            {/* fallback con iconos existentes; añade los que falten en tu registro */}
            <Icon name="user" className="h-5 w-5" />
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
