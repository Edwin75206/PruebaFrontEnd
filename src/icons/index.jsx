import React from 'react';
import {
  ShoppingCart,
  Search,
  LogIn,
  LogOut,
  User,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Filter,
  Loader2,
  Check,
  Info,
  Truck,
  ShieldCheck,
  RotateCcw, // undo
} from 'lucide-react';

const registry = {
  // básicos
  cart: ShoppingCart,
  search: Search,
  login: LogIn,
  logout: LogOut,
  user: User,
  delete: Trash2,
  left: ChevronLeft,
  right: ChevronRight,
  filter: Filter,
  spinner: Loader2,

  // extra
  check: Check,        // success
  info: Info,          // info
  truck: Truck,        // envío
  shield: ShieldCheck, // pago seguro
  undo: RotateCcw,     // deshacer
};

export const Icon = ({ name, className = '', ...props }) => {
  const Cmp = registry[name] || registry.search;
  return <Cmp className={className} {...props} />;
};
