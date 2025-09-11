# Starlight Chest

**Starlight Chest** es una aplicación web de ecommerce moderna, responsiva y funcional, desarrollada como solución a la prueba técnica para la posición de **Becario Frontend**.  
La aplicación consume la **Platzi Fake Store API** para simular una experiencia de compra completa, desde la navegación de productos hasta la autenticación y un flujo de pago simulado.

🔗 **Ver la demo en vivo:** [https://starlightchest.netlify.app](https://starlightchest.netlify.app)

---

## Stack Tecnológico

La aplicación está construida con un stack moderno de JavaScript, priorizando la reutilización de componentes y un manejo de estado centralizado:

- **Framework Principal:** React.js  
- **Entorno de Desarrollo:** Vite  
- **Enrutamiento:** React Router DOM para una navegación fluida  
- **Componentes de UI:** Material-UI (para Header, menús, modales) + Tailwind CSS (estilos rápidos y responsivos)  
- **Iconografía:** Lucide React (gestionada en un componente `<Icon />` centralizado)  
- **Backend:** Platzi Fake Store API (REST)  
- **Despliegue:** Netlify  

---

## Instalación y Puesta en Marcha Local

1. Clona el repositorio:  
   ```bash
   git clone https://github.com/Edwin75206/PruebaFrontEnd.git
   ```

2. Navega a la carpeta del proyecto:  
   ```bash
   cd PruebaFrontEnd
   ```

3. Instala las dependencias:  
   ```bash
   npm install
   ```

4. Inicia el servidor de desarrollo:  
   ```bash
   npm run dev
   ```

 La aplicación estará disponible en [http://localhost:5173](http://localhost:5173).

---

##  Funcionalidades

### Funcionalidades Requeridas

1. **Navegación y Visualización de Productos**  
   - Explora productos en la página principal  
   - Vista de detalle `/product/:id` con consumo dinámico de API  
   - <img width="1512" height="982" alt="Captura de pantalla 2025-09-08 a la(s) 6 25 37 p m" src="https://github.com/user-attachments/assets/b3e5f140-33ad-4076-a400-909dc4bf7447" />


2. **Filtrado y Ordenamiento en Tiempo Real**  
   - Página `/category/:id` con filtros por nombre, rango de precio y ordenamiento  
   - Optimización con `useMemo`  
   - <img width="1512" height="982" alt="Captura de pantalla 2025-09-09 a la(s) 12 35 19 p m" src="https://github.com/user-attachments/assets/a1f88daf-cc6b-4a91-91fe-9869e07a7f62" />


3. **Gestión Avanzada del Carrito de Compras**  
   - Carrito global con `CartContext`  
   - Persistencia en `localStorage`  
   -  <img width="1512" height="982" alt="Captura de pantalla 2025-09-09 a la(s) 12 35 56 p m" src="https://github.com/user-attachments/assets/67d64e5f-a11c-4d0f-80ae-c9eaa869ee3b" />


4. **Sistema de Autenticación Robusto**  
   - Registro/Login con JWT  
   - `AuthContext` maneja estado y rutas protegidas  
   - Registro
     <img width="1512" height="982" alt="Captura de pantalla 2025-09-11 a la(s) 5 24 07 p m" src="https://github.com/user-attachments/assets/aefc8207-209b-450c-a524-950ea039e9a0" />
   - Login
     <img width="1512" height="982" alt="Captura de pantalla 2025-09-11 a la(s) 5 24 27 p m" src="https://github.com/user-attachments/assets/e1736e2e-b8e0-4d15-b3bb-bf7193cf3f98" />



---

### 🔹 Funcionalidades Adicionales (Valor Agregado)

5. **Sistema de Favoritos con Persistencia y "Deshacer"**  
   - `FavoritesContext` con persistencia en `localStorage`  
   - Notificación Snackbar con acción "Deshacer"  
   - <img width="1512" height="982" alt="Captura de pantalla 2025-09-09 a la(s) 5 42 55 p m" src="https://github.com/user-attachments/assets/fb303a25-9630-4f92-beda-8c96d6c82735" />


6. **Perfil de Usuario Multifuncional**  
   - Vista unificada con datos de `AuthContext`, `FavoritesContext`, `OrderContext`  
   - Edición de perfil con actualización en tiempo real  
   - <img width="1512" height="982" alt="Captura de pantalla 2025-09-09 a la(s) 5 42 55 p m" src="https://github.com/user-attachments/assets/fb303a25-9630-4f92-beda-8c96d6c82735" />


7. **Historial de Pedidos Simulado**  
   - `OrderContext` simula pedidos guardados en `localStorage`  
   - Se muestran en el perfil del usuario  
   - <img width="1512" height="982" alt="Captura de pantalla 2025-09-09 a la(s) 5 42 55 p m" src="https://github.com/user-attachments/assets/fb303a25-9630-4f92-beda-8c96d6c82735" />

---

## Arquitectura del Proyecto

La aplicación está organizada de manera modular y escalable:

- **`src/components`** → Componentes visuales reutilizables (ProductCard, Button, Modal, etc.)  
- **`src/pages`** → Vistas principales de la app (cada ruta)  
- **`src/context`** → Manejo global de estado con Context API (`AuthContext`, `CartContext`, `FavoritesContext`, etc.)  
  - Cada contexto expone su propio **hook** (ej: `useAuth`, `useCart`)  
- **`src/services`** → Lógica de comunicación con la API (`apiService.js`)  
- **`src/config`** → Configuración centralizada (ej: `defaultMessages.js`)  

Este enfoque asegura una aplicación **fácil de entender, depurar y escalar**.

---

## 🧑🏻‍💻 Autor

Este proyecto fue diseñado y desarrollado por:

**Edwin Donovan**  
🔗 GitHub: [@Edwin75206](https://github.com/Edwin75206)
