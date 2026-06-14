import React from 'react';

// Componente de entrada para buscar Pokémon por nombre o ID
export const BarraBusqueda = ({ valor, alCambiar }) => {
  const claseContenedor = 'relative w-full max-w-md';
  const claseInput = 'w-full pl-10 pr-4 py-2 bg-white border border-gray-350 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm text-gray-800 placeholder-gray-400';
  const claseIcono = 'absolute left-3 top-2.5 h-4 w-4 text-gray-400';

  return (
    <div className={claseContenedor}>
      <svg
        className={claseIcono}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        className={claseInput}
        placeholder="Buscar Pokémon por nombre o número..."
        value={valor}
        onChange={alCambiar}
      />
    </div>
  );
};

export default BarraBusqueda;
