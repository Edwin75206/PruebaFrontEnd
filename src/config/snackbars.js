// src/config/snackbars.js
// Catálogo centralizado de Snackbars (texto + variante)
// Puedes agregar más entradas siguiendo el mismo patrón.

export const snackbars = {
  // Carrito / Productos
  snackbar_productAdded: {
    id: 'snackbar.product.added',
    defaultMessage: '¡Producto añadido al carrito!',
    type: 'success', // success | error | info
  },
  snackbar_productRemoved: {
    id: 'snackbar.product.removed',
    defaultMessage: 'Producto eliminado del carrito.',
    type: 'info',
  },

  // Auth
  snackbar_loginSuccess: {
    id: 'snackbar.login.success',
    defaultMessage: '¡Bienvenido!',
    type: 'success',
  },
  snackbar_loginError: {
    id: 'snackbar.login.error',
    defaultMessage: 'Error al iniciar sesión. Verifica tus credenciales.',
    type: 'error',
  },
  snackbar_registerSuccess: {
    id: 'snackbar.register.success',
    defaultMessage: '¡Registro exitoso! Ahora puedes iniciar sesión.',
    type: 'success',
  },

  // Genéricos
  snackbar_actionError: {
    id: 'snackbar.action.error',
    defaultMessage: 'Ocurrió un error. Inténtalo de nuevo.',
    type: 'error',
  },
};
