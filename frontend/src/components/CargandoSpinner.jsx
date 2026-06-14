import React from 'react';

// Spinner de carga animado con TailwindCSS
export const CargandoSpinner = () => {
  const claseContenedor = 'flex flex-col justify-center items-center py-16 space-y-4';
  const claseSpinner = 'animate-spin rounded-full h-14 w-14 border-4 border-gray-200 border-t-red-500';
  const claseTexto = 'text-gray-500 font-medium text-sm animate-pulse';

  return (
    <div className={claseContenedor}>
      <div className={claseSpinner}></div>
      <span className={claseTexto}>Cargando Pokémon...</span>
    </div>
  );
};

export default CargandoSpinner;
