import React, { useState } from 'react';
import { apiService } from '../../services/apiService';
import { useSnackbar } from '../../context/SnackbarContext';
import { messages } from '../../config/defaultMessages';

// Formulario para la edicion de datos del perfil de usuario.
// Se renderiza dentro de un modal.
export const EditProfileForm = ({ user, onSuccess }) => {
  // Estado local para manejar los campos del formulario.
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
  });
  const [loading, setLoading] = useState(false);
  const { show } = useSnackbar();

  // Actualiza el estado del formulario cuando el usuario escribe.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Maneja el envio del formulario.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Creamos un 'payload' solo con los campos que la API permite actualizar.
    const payload = {
      name: formData.name,
    };

    try {
      const updatedUser = await apiService.put(`/users/${user.id}`, payload);
      show(messages.editProfile_success.defaultMessage, 'info');
      // Llama a la funcion 'onSuccess' del padre para notificar el exito y cerrar el modal.
      onSuccess(updatedUser);
    } catch (error) {
      console.error("Detalles del error de la API:", error);
      show(messages.editProfile_error.defaultMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          {messages.auth_nameLabel.defaultMessage}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3E2E2E] focus:ring-[#3E2E2E]"
          required
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {messages.auth_emailLabel.defaultMessage}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3E2E2E] focus:ring-[#3E2E2E]"
          required
        />
      </div>
      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-[#3E2E2E] text-white rounded-lg hover:bg-[#2a1f1f] disabled:bg-gray-400 transition-colors"
        >
          {loading ? messages.editProfile_savingButton.defaultMessage : messages.editProfile_savingButton.defaultMessage}
        </button>
      </div>
    </form>
  );
};