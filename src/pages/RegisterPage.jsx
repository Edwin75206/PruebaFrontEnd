import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { messages } from '../config/defaultMessages';
import { useSnackbar } from '../context/SnackbarContext.jsx';

// Definicion para la pagina de registro de nuevos usuarios.
export const RegisterPage = () => {
  // Hooks para la navegacion y para acceder a los contextos.
  const navigate = useNavigate();
  const { register } = useAuth();
  const { show } = useSnackbar();

  // Estados para los campos del formulario y el estado de carga.
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Funcion para manejar el envio del formulario de registro.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenimos el comportamiento por defecto.
    
    // Validacion basica para la longitud de la contrasena.
    if (password.length < 4) {
      show(messages.auth_passwordMinLengthError.defaultMessage, 'error');
      return;
    }
    
    setLoading(true); // Activamos el estado de carga.
    try {
      // Llamamos a la funcion de registro del contexto de autenticacion.
      await register(name, email, password);
      show(messages.auth_registerSuccess.defaultMessage, 'success');
      // Despues de un registro exitoso, redirigimos al login tras una breve pausa.
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      // Si ocurre un error, mostramos una notificacion.
      show(err.message || messages.auth_registerError.defaultMessage, 'error');
    } finally {
      // Desactivamos el estado de carga al finalizar.
      setLoading(false);
    }
  };

  // Renderizado del componente.
  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">{messages.auth_registerTitle.defaultMessage}</h2>
        
        {/* Formulario de registro que llama a handleSubmit al enviarse. */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">{messages.auth_nameLabel.defaultMessage}</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder={messages.auth_nameLabel.defaultMessage}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
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
          {/* Boton de envio que se deshabilita durante la carga. */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#3E2E2E] text-white py-2 rounded-md hover:bg-[#2a1f1f] disabled:bg-gray-400 transition-colors"
          >
            {loading ? messages.auth_registerButtonLoading.defaultMessage : messages.auth_registerTitle.defaultMessage}
          </button>
        </form>
        {/* Enlace para los usuarios que ya tienen una cuenta. */}
        <p className="text-center mt-4 text-sm text-gray-600">
          {messages.auth_alreadyAccountPrompt.defaultMessage}{' '}
          <Link to="/login" className="font-medium text-[#3E2E2E] hover:underline">
            {messages.auth_loginLink.defaultMessage}
          </Link>
        </p>
      </div>
    </div>
  );
};