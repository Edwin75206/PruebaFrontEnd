import React from 'react';
import { useAuth } from '../../context/AuthContext'; 
import { Icon } from '../../icons/index'; 
import { useModal } from '../../context/ModalContext'; 
import { EditProfileForm } from './EditProfileForm'; 
import { messages } from '../../config/defaultMessages'; 

// Componente para la barra lateral del perfil de usuario.
// Muestra la informacion del usuario y permite editar el perfil y cerrar sesion.
export default function UserCard({ user }) {
  // Consumimos contextos para la logica de autenticacion y modales.
  const { logout, updateUser } = useAuth();
  const { showModal, hideModal } = useModal(); 
  
  // Fallbacks para datos del usuario para evitar errores si 'user' es null.
  const name = user?.name || '—';
  const email = user?.email || '—';
  const avatar = user?.avatar || 'https://picsum.photos/200/200?blur=1';

  // Abre un modal de confirmacion para cerrar sesion.
  const handleLogout = () => {
    showModal({
      title: messages.userCard_logoutConfirmTitle.defaultMessage,
      children: <p>{messages.userCard_logoutConfirmMessage.defaultMessage}</p>,
      footer: (
        <>
          <button onClick={hideModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
            {messages.userCard_logoutConfirmNo.defaultMessage}
          </button>
          <button onClick={() => { logout(); hideModal(); }} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
            {messages.userCard_logoutConfirmYes.defaultMessage}
          </button>
        </>
      ),
    });
  };

  // Abre el modal con el formulario para editar el perfil.
  const handleOpenEditModal = () => {
    showModal({
      title: messages.userCard_editProfileTitle.defaultMessage,
      children: (
        <EditProfileForm
          user={user}
          onSuccess={(updatedUserData) => {
            updateUser(updatedUserData); // Actualiza el estado global del usuario.
            hideModal(); // Cierra el modal al tener exito.
          }}
        />
      ),
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-card p-6 flex flex-col text-center">
      <div className="flex flex-col items-center">
        
        {/* Contenedor relativo para posicionar el boton de edicion sobre la imagen. */}
        <div className="relative w-24 h-24 mb-4">
          <img
            src={avatar}
            alt={name}
            className="w-full h-full rounded-full border-2 border-gray-200"
            loading="lazy"
          />
          <button 
            onClick={handleOpenEditModal}
            className="absolute -bottom-1 -right-1 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition"
            aria-label={messages.userCard_editProfileAriaLabel.defaultMessage}
          >
            <Icon name="user" className="h-4 w-4 text-gray-600" />
          </button>
        </div>

        <h2 className="text-xl font-bold text-ink">{name}</h2>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
      
      {/* Este div vacio con 'flex-grow' empuja el boton de logout hacia abajo. */}
      <div className="flex-grow" />

      <button
        onClick={handleLogout}
        className="mt-6 w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 font-semibold py-2 px-4 rounded-lg hover:bg-red-100 transition-colors"
      >
        <Icon name="logout" className="h-4 w-4" />
        {messages.userCard_logoutConfirmTitle.defaultMessage}
      </button>
    </div>
  );
}