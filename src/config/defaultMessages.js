export const messages = {
  // General / App-wide
  general_appName: {
    id: 'app.name',
    defaultMessage: 'PlatziStore',
    description: 'El nombre de la aplicación, se muestra en la cabecera.',
  },
  general_goBack: {
    id: 'general.button.goBack',
    defaultMessage: 'Volver',
    description: 'Texto del botón para navegar a la página anterior.',
  },
  footer_copyright: {
    id: 'footer.copyright',
    defaultMessage: '© {year} PlatziStore. Creado para la Prueba Técnica.',
    description: 'Texto de copyright.',
  },

  // Header
  header_greeting: { id: 'header.greeting', defaultMessage: 'Hola', description: 'Saludo.' },
  header_logout: { id: 'header.button.logout', defaultMessage: 'Salir', description: 'Botón salir.' },
  header_login: { id: 'header.button.login', defaultMessage: 'Login', description: 'Botón login.' },
  header_register: { id: 'header.button.register', defaultMessage: 'Registro', description: 'Botón registro.' },

  // Home Page & Filters
  home_filtersTitle: { id: 'home.filters.title', defaultMessage: 'Filtros', description: 'Título filtros.' },
  home_searchPlaceholder: { id: 'home.filters.searchPlaceholder', defaultMessage: 'Buscar por nombre...', description: 'Placeholder búsqueda.' },
  home_allCategories: { id: 'home.filters.allCategories', defaultMessage: 'Todas las categorías', description: 'Opción por defecto.' },
  home_priceMin: { id: 'home.filters.priceMin', defaultMessage: 'Min', description: 'Precio mínimo.' },
  home_priceMax: { id: 'home.filters.priceMax', defaultMessage: 'Max', description: 'Precio máximo.' },
  home_noProductsFound: { id: 'home.feedback.noProductsFound', defaultMessage: 'No se encontraron productos con los filtros aplicados.', description: 'Sin resultados.' },
  home_errorLoadingProducts: { id: 'home.feedback.errorLoadingProducts', defaultMessage: 'No se pudieron cargar los productos. Inténtalo de nuevo más tarde.', description: 'Error productos.' },

  // Product Card
  productCard_viewMore: { id: 'productCard.button.viewMore', defaultMessage: 'Ver más', description: 'Botón ver más.' },
  productCard_imageUnavailable: { id: 'productCard.altText.imageUnavailable', defaultMessage: 'Imagen no disponible', description: 'Alt de imagen faltante.' },

  // Product Detail Page
  productDetail_categoryLabel: { id: 'productDetail.label.category', defaultMessage: 'Categoría:', description: 'Etiqueta categoría.' },
  productDetail_quantityLabel: { id: 'productDetail.label.quantity', defaultMessage: 'Cantidad:', description: 'Etiqueta cantidad.' },
  productDetail_addToCart: { id: 'productDetail.button.addToCart', defaultMessage: 'Agregar al carrito', description: 'Botón agregar.' },
  productDetail_errorLoadingProduct: { id: 'productDetail.feedback.errorLoadingProduct', defaultMessage: 'No se pudo cargar el producto.', description: 'Error producto.' },

  // Cart Page
  cart_title: { id: 'cart.title', defaultMessage: 'Carrito de Compras', description: 'Título carrito.' },
  cart_empty: { id: 'cart.feedback.empty', defaultMessage: 'Tu carrito está vacío.', description: 'Carrito vacío.' },
  cart_subtotal: { id: 'cart.label.subtotal', defaultMessage: 'Subtotal:', description: 'Etiqueta subtotal.' },
  cart_total: { id: 'cart.label.total', defaultMessage: 'Total:', description: 'Etiqueta total.' },
  cart_checkout: { id: 'cart.button.checkout', defaultMessage: 'Proceder al Pago', description: 'Botón pagar.' },

  // Authentication
  auth_loginTitle: { id: 'login.title', defaultMessage: 'Iniciar Sesión', description: 'Título login.' },
  auth_registerTitle: { id: 'register.title', defaultMessage: 'Crear Cuenta', description: 'Título registro.' },
  auth_emailLabel: { id: 'auth.label.email', defaultMessage: 'Email', description: 'Etiqueta email.' },
  auth_passwordLabel: { id: 'auth.label.password', defaultMessage: 'Contraseña', description: 'Etiqueta contraseña.' },
  auth_nameLabel: { id: 'auth.label.name', defaultMessage: 'Nombre', description: 'Etiqueta nombre.' },
  auth_loginButton: { id: 'login.button.submit', defaultMessage: 'Iniciar Sesión', description: 'Enviar login.' },
  auth_loginButtonLoading: { id: 'login.button.loading', defaultMessage: 'Iniciando...', description: 'Cargando login.' },
  auth_registerButton: { id: 'register.button.submit', defaultMessage: 'Crear Cuenta', description: 'Enviar registro.' },
  auth_registerButtonLoading: { id: 'register.button.loading', defaultMessage: 'Creando...', description: 'Cargando registro.' },
  auth_noAccountPrompt: { id: 'login.prompt.noAccount', defaultMessage: '¿No tienes cuenta?', description: 'Texto a registro.' },
  auth_alreadyAccountPrompt: { id: 'register.prompt.alreadyAccount', defaultMessage: '¿Ya tienes cuenta?', description: 'Texto a login.' },
  auth_registerLink: { id: 'login.link.register', defaultMessage: 'Regístrate', description: 'Link registro.' },
  auth_loginLink: { id: 'register.link.login', defaultMessage: 'Inicia sesión', description: 'Link login.' },
  auth_passwordMinLengthError: { id: 'register.feedback.passwordMinLengthError', defaultMessage: 'La contraseña debe tener al menos 4 caracteres.', description: 'Validación password.' },
  auth_loginError: { id: 'login.feedback.error', defaultMessage: 'Error al iniciar sesión. Verifica tus credenciales.', description: 'Error login.' },
  auth_registerError: { id: 'register.feedback.error', defaultMessage: 'Error en el registro. Inténtalo de nuevo.', description: 'Error registro.' },
  auth_registerSuccess: { id: 'register.feedback.success', defaultMessage: '¡Registro exitoso! Ahora puedes iniciar sesión.', description: 'Éxito registro.' },

  // Notifications
  notifications_addedToCart: { id: 'notification.success.addedToCart', defaultMessage: '¡Producto añadido al carrito!', description: 'Notificación añadir.' },
};
