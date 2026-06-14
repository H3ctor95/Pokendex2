import React from 'react';

// Componente para mostrar mensajes de error simples
export const MensajeError = ({ mensaje }) => {
  const claseContenedor = 'bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center justify-center my-4';
  const claseIcono = 'h-5 w-5 mr-2 flex-shrink-0';
  const claseTexto = 'text-sm font-medium';

  return (
    <div className={claseContenedor} role="alert">
      <svg
        className={claseIcono}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      <span className={claseTexto}>{mensaje}</span>
    </div>
  );
};

export default MensajeError;
