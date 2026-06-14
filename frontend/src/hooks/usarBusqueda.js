import { useState } from 'react';

// Hook personalizado para manejar el estado controlado del input de búsqueda
export const usarBusqueda = () => {
  const [valor, establecerValor] = useState('');

  // Manejador del cambio de texto en el input
  const alCambiar = (e) => {
    establecerValor(e.target.value || '');
  };

  // Restablece el valor de búsqueda
  const limpiarBusqueda = () => {
    establecerValor('');
  };

  return {
    valor,
    alCambiar,
    limpiarBusqueda
  };
};

export default usarBusqueda;
