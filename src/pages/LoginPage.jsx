import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useSnackbar } from '../context/SnackbarContext.jsx';
import { messages } from '../config/defaultMessages';

// Definicion para la pagina de login.
export const LoginPage = () => {
  // Estados para almacenar el email, la contrasena y el estado de carga del formulario.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Extraccion de funciones y estado del contexto de autenticacion.
  const { login, isAuthenticated } = useAuth();
  // Extraccion de la funcion para mostrar notificaciones.
  const { show } = useSnackbar();
  
  // Hooks de React Router para la navegacion y para obtener la ubicacion actual.
  const navigate = useNavigate();
  const location = useLocation();
  // Determinamos a donde redirigir al usuario despues de un login exitoso.
  const from = location.state?.from?.pathname || '/profile';

  // Efecto que se ejecuta si el estado de autenticacion cambia.
  useEffect(() => {
    // Si el usuario ya esta autenticado, lo redirigimos a la pagina de origen o a su perfil.
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Funcion para manejar el envio del formulario de login.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario.
    setLoading(true); // Activamos el estado de carga.
    try {
      // Intentamos iniciar sesion con las credenciales proporcionadas.
      await login(email, password);
    } catch (err) {
      // Si falla, mostramos una notificacion de error.
      show(err.message || messages.auth_loginError.defaultMessage, 'error');
    } finally {
      // Desactivamos el estado de carga al finalizar, sin importar el resultado.
      setLoading(false);
    }
  };

  // Renderizado del componente.
  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">{messages.auth_loginTitle.defaultMessage}</h2>
        
        {/* Formulario de inicio de sesion que llama a handleSubmit al enviarse. */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">{messages.auth_emailLabel.defaultMessage}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder={messages.auth_emailLabel.defaultMessage}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">{messages.auth_passwordLabel.defaultMessage}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder={messages.auth_passwordLabel.defaultMessage}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* Boton de envio, se deshabilita y cambia de texto durante la carga. */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3E2E2E] text-white py-2 rounded-md hover:bg-[#2a1f1f] disabled:bg-gray-400 transition-colors"
          >
            {loading ? messages.auth_loginButtonLoading.defaultMessage : messages.auth_loginTitle.defaultMessage}
          </button>
        </form>
        {/* Enlace para redirigir a los usuarios a la pagina de registro. */}
        <p className="text-center mt-4 text-sm text-gray-600">
          {messages.auth_noAccountPrompt.defaultMessage}{' '}
          <Link to="/register" className="font-medium text-[#3E2E2E] hover:underline">
            {messages.auth_registerLink.defaultMessage}
          </Link>
        </p>
      </div>
    </div>
  );
};