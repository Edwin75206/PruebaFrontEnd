export const snackbars = {
  // Carrito / Productos
  snackbar_productAdded: {
    id: 'snackbar.product.added',
    defaultMessage: '¡Producto añadido al carrito!',
    type: 'success', 
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

  // Errores
  snackbar_actionError: {
    id: 'snackbar.action.error',
    defaultMessage: 'Ocurrió un error. Inténtalo de nuevo.',
    type: 'error',
  },
};
