import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useModal } from '../context/ModalContext.jsx';
import { useSnackbar } from '../context/SnackbarContext.jsx';
import { messages } from '../config/defaultMessages';
import { Icon } from '../icons/index.jsx';
import { useOrders } from '../context/OrderContext.jsx'; 

// Definicion para la pagina del carrito de compras.
export const CartPage = () => {
  // Hook para la navegacion programatica.
  const navigate = useNavigate();
  // Extraccion de estado y funciones del contexto del carrito.
  const { cartItems, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
  // Extraccion de funciones del contexto del modal.
  const { showModal, hideModal } = useModal();
  // Extraccion de la funcion para mostrar notificaciones.
  const { show } = useSnackbar();
  // Extraccion de la funcion para agregar una nueva orden.
  const { addOrder } = useOrders();
  // Calculo del total basado en el subtotal.
  const total = subtotal;

  // Funcion para manejar el exito del pago, muestra un modal de confirmacion.
  const handlePaymentSuccess = () => {
    showModal({
      title: messages.checkout_successTitle.defaultMessage,
      children: <p>{messages.checkout_successMessage.defaultMessage}</p>,
      footer: (
        <button 
          onClick={() => {
            // Cierra el modal y redirige al inicio al hacer clic.
            hideModal();
            navigate('/');
          }} 
          className="px-4 py-2 bg-[#3E2E2E] text-white rounded-lg hover:bg-[#2a1f1f]"
        >
          {messages.general_button_accept.defaultMessage}
        </button>
      ),
    });
  };

  // Funcion para simular el proceso de pago.
  const simulatePayment = () => {
    hideModal(); // Cierra el modal de confirmacion.
    show(messages.checkout_processingSnackbar.defaultMessage, 'info'); // Muestra una notificacion de procesamiento.
    
    // Simula una demora de red de 2 segundos.
    setTimeout(() => {
      addOrder(cartItems, total); // Agrega la orden al historial.
      clearCart(); // Vacia el carrito.
      handlePaymentSuccess(); // Muestra el modal de exito.
    }, 2000);
  };

  // Funcion para iniciar el proceso de checkout.
  const handleCheckout = () => {
    // Si el carrito esta vacio, no hace nada.
    if (cartItems.length === 0) return;

    // Muestra un modal para confirmar la compra.
    showModal({
      title: messages.checkout_confirmTitle.defaultMessage,
      children: <p>{messages.checkout_confirmMessage.defaultMessage}</p>,
      footer: (
        <>
          {/* Boton para cancelar y cerrar el modal. */}
          <button onClick={hideModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300">
            {messages.general_button_cancel.defaultMessage}
          </button>
          {/* Boton para confirmar y simular el pago. */}
          <button onClick={simulatePayment} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
            {messages.checkout_confirmButton.defaultMessage}
          </button>
        </>
      ),
    });
  };

  // Renderizado condicional: si el carrito esta vacio, muestra un mensaje.
  if (cartItems.length === 0) {
    return (
      <div className="text-center p-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">{messages.cart_title.defaultMessage}</h1>
        <p className="text-gray-600">{messages.cart_empty.defaultMessage}</p>
      </div>
    );
  }

  // Renderizado principal del componente si hay items en el carrito.
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{messages.cart_title.defaultMessage}</h1>
      <div className="divide-y divide-gray-200">
        {/* Mapea los items del carrito para mostrarlos en la lista. */}
        {cartItems.map(item => (
          <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between py-8 gap-6">
            <div className="flex items-center space-x-8">
              <img src={item.images?.[0]} alt={item.title} className="w-32 h-32 object-cover rounded-lg" />
              <div>
                <h3 className="font-bold text-xl text-gray-800">{item.title}</h3>
                <p className="text-md text-gray-500 mt-1">${Number(item.price).toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              {/* Input para actualizar la cantidad de un item. */}
              <input type="number" min="1" value={item.quantity} onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)} className="w-20 p-2 border border-gray-300 rounded-md text-center text-lg"/>
              {/* Muestra el subtotal por item. */}
              <p className="font-semibold w-32 text-right text-xl">${(item.price * item.quantity).toFixed(2)}</p>
              {/* Boton para eliminar un item del carrito. */}
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 p-2">
                <Icon name="delete" className="h-6 w-6" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Seccion del resumen del carrito. */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <div className="flex justify-end items-center text-3xl font-bold">
          <span className="text-gray-800">{messages.cart_total.defaultMessage}</span>
          {/* Muestra el total de la compra. */}
          <span className="text-[#3E2E2E] ml-4">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-end mt-6">
          {/* Boton para proceder al pago. */}
          <button 
            onClick={handleCheckout}
            className="bg-[#3E2E2E] text-white py-3 px-10 rounded-lg hover:bg-[#2a1f1f] transition-colors text-lg font-semibold"
          >
            {messages.cart_checkout.defaultMessage}
          </button>
        </div>
      </div>
    </div>
  );
};