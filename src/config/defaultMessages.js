export const messages = {
  /* --- Mensajes Generales y Globales --- */
  general_appName: {
    id: "app.name",
    defaultMessage: "Starlight Chest",
    description: "El nombre de la aplicación.",
  },
  general_goBack: {
    id: "general.button.goBack",
    defaultMessage: "Volver",
    description: "Texto del botón para ir a la página anterior.",
  },
  general_button_cancel: {
    id: "general.button.cancel",
    defaultMessage: "Cancelar",
    description: "Texto genérico para un botón de cancelar.",
  },
  general_button_accept: {
    id: "general.button.accept",
    defaultMessage: "Aceptar",
    description: "Texto genérico para un botón de aceptar.",
  },

  /* --- Mensajes de Feedback (Retroalimentación) --- */
  feedback_noProductsFound: {
    id: "feedback.noProductsFound",
    defaultMessage: "No se encontraron productos con los filtros aplicados.",
    description:
      "Mensaje genérico cuando una búsqueda o filtro no devuelve resultados.",
  },

  /* --- Footer --- */
  footer_copyright: {
    id: "footer.copyright",
    defaultMessage: "© {year} Starlight Chest.",
    description: "Texto de copyright en el pie de página.",
  },/* --- Footer --- */
  footer_tagline: {
    id: "footer.tagline",
    defaultMessage: "La moda que define tu estilo.",
  },
  footer_help_title: {
    id: "footer.help.title",
    defaultMessage: "Ayuda",
  },
  footer_help_items: {
    id: "footer.help.items",
    defaultMessage: "Contactenos, Preguntas Frecuentes, Cuidado del Producto, Tiendas",
  },
  footer_services_title: {
    id: "footer.services.title",
    defaultMessage: "Servicios",
  },
  footer_services_items: {
    id: "footer.services.items",
    defaultMessage: "Reparaciones, Personalizacion, El Arte de Regalar, Descargue nuestras aplicaciones",
  },
  footer_about_title: {
    id: "footer.about.title",
    defaultMessage: "Acerca de Nosotros",
  },
  footer_about_items: {
    id: "footer.about.items",
    defaultMessage: "Desfiles de moda, Arte y Cultura, Nuestra Casa, Sustentabilidad, Noticias recientes, Trabaje con nosotros",
  },
  footer_country: {
    id: "footer.country",
    defaultMessage: "🇲🇽 Mexico",
  },

  /* --- Header (Cabecera) --- */
  header_greeting: {
    id: "header.greeting",
    defaultMessage: "Hola",
  },
  header_logout: {
    id: "header.button.logout",
    defaultMessage: "Salir",
  },
  header_login: {
    id: "header.button.login",
    defaultMessage: "Login",
  },
  header_register: {
    id: "header.button.register",
    defaultMessage: "Registro",
  },
  header_menuLabel: {
    id: "header.aria.menu",
    defaultMessage: "Menú",
  },
  header_cartLabel: {
    id: "header.aria.cart",
    defaultMessage: "Carrito",
  },
  header_profile: {
    id: "header.menu.profile",
    defaultMessage: "Perfil",
  },
  header_brandHome: {
    id: "header.brand.home",
    defaultMessage: "Ir al inicio",
  },
  carousel_exploreProducts: {
    id: "carousel.empty.title",
    defaultMessage: "Explora productos",
  },
  carousel_noFeaturedProducts: {
    id: "carousel.empty.message",
    defaultMessage: "No hay productos destacados disponibles por ahora.",
  },
  carousel_prevLabel: {
    id: "carousel.aria.prev",
    defaultMessage: "Anterior",
  },
  carousel_nextLabel: {
    id: "carousel.aria.next",
    defaultMessage: "Siguiente",
  },
  carousel_goToSlide: {
    id: "carousel.aria.goToSlide",
    defaultMessage: "Ir al slide {slideNumber}",
  },
  carousel_featuredBadge: {
    id: "carousel.default.badge",
    defaultMessage: "Destacado",
    description: "Badge por defecto para un producto en el carrusel.",
  },
  carousel_weeklySelection: {
    id: "carousel.text.weeklySelection",
    defaultMessage: "Descubre nuestra selección destacada de la semana.",
    description: "Texto descriptivo en el carrusel.",
  },
  category_searchLabel: {
    id: "category.filters.searchLabel",
    defaultMessage: "Buscar por nombre",
  },
  category_searchPlaceholder: {
    id: "category.filters.searchPlaceholder",
    defaultMessage: "Ej: Red Hoodie...",
  },
  carousel_shopNow: {
    id: "carousel.button.shopNow",
    defaultMessage: "Comprar ahora",
    description: "Texto del botón de acción principal en el carrusel.",
  },
  carousel_viewProduct: {
    id: "carousel.button.viewProduct",
    defaultMessage: "Ver producto",
    description: "Texto del botón de acción secundario en el carrusel.",
  },
  notifications_productRemoved: {
    id: "notification.info.productRemoved",
    defaultMessage: "Producto eliminado del carrito.",
    description: "Notificación al eliminar un producto del carrito.",
  },
  favorites_added: {
    id: "notification.success.favoritesAdded",
    defaultMessage: "¡Añadido a tus favoritos!",
    description: "Notificación de éxito al añadir un producto a favoritos.",
  },
  favorites_removed: {
    id: "notification.info.favoritesRemoved",
    defaultMessage: "Eliminado de tus favoritos.",
    description: "Notificación al eliminar un producto de favoritos.",
  },
  /* --- Home Page (Página de Inicio) --- */
  home_featuredProductsTitle: {
    id: "home.section.featuredProducts",
    defaultMessage: "Productos Destacados",
  },
  home_errorLoadingProducts: {
    id: "home.feedback.errorLoadingProducts",
    defaultMessage:
      "No se pudieron cargar los productos. Inténtalo de nuevo más tarde.",
  },
  home_heroSectionTitle: {
    id: "home.hero.title",
    defaultMessage: "Starlight Chest",
  },
  userCard_editProfileAriaLabel: {
    id: "userCard.aria.edit",
    defaultMessage: "Editar perfil",
    description: "Aria-label para el botón de editar perfil en la UserCard.",
  },

  /* --- Product Card (Tarjeta de Producto) --- */
  productCard_viewMore: {
    id: "productCard.button.viewMore",
    defaultMessage: "Ver más",
  },
  productCard_imageUnavailable: {
    id: "productCard.altText.imageUnavailable",
    defaultMessage: "Imagen no disponible",
  },

  /* --- Product Detail Page (Página de Detalle de Producto) --- */
  productDetail_categoryLabel: {
    id: "productDetail.label.category",
    defaultMessage: "Categoría:",
  },
  productDetail_quantityLabel: {
    id: "productDetail.label.quantity",
    defaultMessage: "Cantidad:",
  },
  productDetail_addToCart: {
    id: "productDetail.button.addToCart",
    defaultMessage: "Agregar al carrito",
  },
  productDetail_errorLoadingProduct: {
    id: "productDetail.feedback.errorLoadingProduct",
    defaultMessage: "No se pudo cargar el producto.",
  },
  productDetail_toggleFavorite: {
    id: "productDetail.aria.toggleFavorite",
    defaultMessage: "Añadir o quitar de favoritos",
  },

  /* --- Cart Page (Página del Carrito) --- */
  cart_title: {
    id: "cart.title",
    defaultMessage: "Carrito de Compras",
  },
  cart_empty: {
    id: "cart.feedback.empty",
    defaultMessage: "Tu carrito está vacío.",
  },
  cart_total: {
    id: "cart.label.total",
    defaultMessage: "Total:",
  },
  cart_checkout: {
    id: "cart.button.checkout",
    defaultMessage: "Proceder al Pago",
  },

  /* --- Authentication (Login / Registro) --- */
  auth_loginTitle: {
    id: "login.title",
    defaultMessage: "Iniciar Sesión",
  },
  auth_registerTitle: {
    id: "register.title",
    defaultMessage: "Crear Cuenta",
  },
  auth_emailLabel: {
    id: "auth.label.email",
    defaultMessage: "Email",
  },
  auth_passwordLabel: {
    id: "auth.label.password",
    defaultMessage: "Contraseña",
  },
  auth_nameLabel: {
    id: "auth.label.name",
    defaultMessage: "Nombre",
  },
  auth_loginButtonLoading: {
    id: "login.button.loading",
    defaultMessage: "Iniciando...",
  },
  auth_registerButtonLoading: {
    id: "register.button.loading",
    defaultMessage: "Creando...",
  },
  auth_noAccountPrompt: {
    id: "login.prompt.noAccount",
    defaultMessage: "¿No tienes cuenta?",
  },
  auth_alreadyAccountPrompt: {
    id: "register.prompt.alreadyAccount",
    defaultMessage: "¿Ya tienes cuenta?",
  },
  auth_registerLink: {
    id: "login.link.register",
    defaultMessage: "Regístrate",
  },
  auth_loginLink: {
    id: "register.link.login",
    defaultMessage: "Inicia sesión",
  },
  auth_passwordMinLengthError: {
    id: "register.feedback.passwordMinLengthError",
    defaultMessage: "La contraseña debe tener al menos 4 caracteres.",
  },
  auth_loginError: {
    id: "login.feedback.error",
    defaultMessage: "Error al iniciar sesión. Verifica tus credenciales.",
  },
  auth_registerError: {
    id: "register.feedback.error",
    defaultMessage: "Error en el registro. Inténtalo de nuevo.",
  },
  auth_registerSuccess: {
    id: "register.feedback.success",
    defaultMessage: "¡Registro exitoso! Ahora puedes iniciar sesión.",
  },

  /* --- Notifications & Snackbar --- */
  snackbar_productAdded: {
    id: "snackbar.product.added",
    defaultMessage: "Producto añadido",
  },

  /* --- Profile & Favorites (Perfil y Favoritos) --- */
  profile_favoritesTitle: {
    id: "profile.favorites.title",
    defaultMessage: "Favoritos",
  },
  profile_noFavorites: {
    id: "profile.feedback.noFavorites",
    defaultMessage: "Aún no has guardado favoritos.",
  },
  profile_ordersTitle: {
    id: "profile.orders.title",
    defaultMessage: "Historial de Pedidos",
  },
  profile_noOrders: {
    id: "profile.orders.empty",
    defaultMessage: "Aún no tienes pedidos.",
  },
  profile_orderDate: {
    id: "profile.orders.dateLabel",
    defaultMessage: "Pedido del",
  },

  /* --- Category Page & Filters (Página de Categoría y Filtros) --- */
  category_priceRangeLabel: {
    id: "category.filters.priceRangeLabel",
    defaultMessage: "Rango de Precio",
  },
  category_sortByLabel: {
    id: "category.filters.sortByLabel",
    defaultMessage: "Ordenar por",
  },
  category_sortRelevance: {
    id: "category.filters.sortRelevance",
    defaultMessage: "Relevancia",
  },
  category_sortPriceAsc: {
    id: "category.filters.sortPriceAsc",
    defaultMessage: "Precio: Menor a Mayor",
  },
  category_sortPriceDesc: {
    id: "category.filters.sortPriceDesc",
    defaultMessage: "Precio: Mayor a Menor",
  },
  category_invalid: {
    id: "category.feedback.invalid",
    defaultMessage: "Selecciona una categoría válida.",
  },

  /* --- Checkout Flow (Flujo de Pago) --- */
  checkout_confirmTitle: {
    id: "checkout.modal.confirmTitle",
    defaultMessage: "Confirmar Compra",
  },
  checkout_confirmMessage: {
    id: "checkout.modal.confirmMessage",
    defaultMessage:
      "Estás a punto de confirmar tu pedido. ¿Deseas proceder al pago?",
  },
  checkout_confirmButton: {
    id: "checkout.button.confirm",
    defaultMessage: "Sí, Pagar",
  },
  checkout_processingSnackbar: {
    id: "checkout.snackbar.processing",
    defaultMessage: "Procesando pago...",
  },
  checkout_successTitle: {
    id: "checkout.modal.successTitle",
    defaultMessage: "¡Pedido Realizado!",
  },
  checkout_successMessage: {
    id: "checkout.modal.successMessage",
    defaultMessage:
      "Tu pedido ha sido procesado con éxito. ¡Gracias por tu compra!",
  },

  /* --- User Card & Modals (Tarjeta de Usuario y Modales) --- */
  userCard_logoutConfirmTitle: {
    id: "userCard.modal.logout.title",
    defaultMessage: "Cerrar Sesión",
  },
  userCard_logoutConfirmMessage: {
    id: "userCard.modal.logout.message",
    defaultMessage: "¿Estás seguro de que quieres salir de tu cuenta?",
  },
  userCard_logoutConfirmNo: {
    id: "userCard.modal.logout.no",
    defaultMessage: "No",
  },
  userCard_logoutConfirmYes: {
    id: "userCard.modal.logout.yes",
    defaultMessage: "Sí, Salir",
  },
  userCard_editProfileTitle: {
    id: "userCard.modal.edit.title",
    defaultMessage: "Editar Perfil",
  },
  editProfile_saveButton: {
    id: "editProfile.form.saveButton",
    defaultMessage: "Guardar Cambios",
  },
  editProfile_savingButton: {
    id: "editProfile.form.savingButton",
    defaultMessage: "Guardando...",
  },
  editProfile_success: {
    id: "editProfile.snackbar.success",
    defaultMessage: "¡Usuario editado con éxito!",
  },
  editProfile_error: {
    id: "editProfile.snackbar.error",
    defaultMessage: "Error al actualizar el perfil.",
  },

  /* --- Hero Component --- */
  hero_defaultTitle: {
    id: "hero.default.title",
    defaultMessage: "Producto destacado",
    description: "Título por defecto para un producto en el componente Hero.",
  },
  hero_defaultBadge: {
    id: "hero.default.badge",
    defaultMessage: "Nueva temporada",
    description: "Badge por defecto para un producto en el Hero.",
  },
  hero_description: {
    id: "hero.description",
    defaultMessage:
      "Explora productos con estilo premium, envio rapido y soporte 24/7.",
    description: "Texto descriptivo general en el componente Hero.",
  },
  hero_shopNowButton: {
    id: "hero.button.shopNow",
    defaultMessage: "Comprar ahora",
    description: "Texto del botón de acción principal en el Hero.",
  },
  hero_viewProductButton: {
    id: "hero.button.viewProduct",
    defaultMessage: "Ver producto",
    description: "Texto del botón de acción secundario en el Hero.",
  },
  hero_discountBadge: {
    id: "hero.badge.discount",
    defaultMessage: "-30% en seleccion",
    description: "Texto para la etiqueta de descuento en el Hero.",
  },
};
