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
  RotateCcw,
  Heart,
  X,
  Menu,
  Twitter,
  Youtube,
  Instagram,
  Linkedin,
} from 'lucide-react';

// Este es un 'registro' o mapa de nombres a componentes de iconos.
// Permite llamar a los iconos por un nombre simple en lugar de su nombre de componente.
const registry = {
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
  heart: Heart,
  check: Check,
  info: Info,
  truck: Truck,
  shield: ShieldCheck,
  undo: RotateCcw,
  close: X,
  menu: Menu,
  x: Twitter,
  youtube: Youtube,
  instagram: Instagram,
  linkedin: Linkedin,
};

// Componente centralizado para renderizar todos los iconos de la aplicacion.
// Asegura consistencia y facilita el cambio de librerias de iconos en el futuro.
export const Icon = ({ name, className = '', ...props }) => {
  // Busca el componente de icono en el registro usando el 'name' proporcionado.
  // Si no lo encuentra, usa el icono de 'search' como fallback para evitar errores.
  const Cmp = registry[name] || registry.search;
  return <Cmp className={className} {...props} />;
};