import React from 'react';
import { OPCIONES_TAMANO_PAGINA } from '../constants/configuracion.js';

// Componente para seleccionar la cantidad de pokemons a mostrar por página
export const SelectorTamanioPagina = ({ valorActual, alCambiar }) => {
  const claseContenedor = 'flex items-center space-x-2';
  const claseEtiqueta = 'text-xs sm:text-sm text-gray-500 font-medium';
  const claseSelect = 'bg-white border border-gray-300 text-gray-700 text-xs sm:text-sm rounded-lg focus:ring-red-500 focus:border-red-500 p-2 cursor-pointer outline-none';

  return (
    <div className={claseContenedor}>
      <label className={claseEtiqueta} htmlFor="selector-limite">
        Mostrar:
      </label>
      <select
        id="selector-limite"
        className={claseSelect}
        value={valorActual}
        onChange={(e) => alCambiar(Number(e.target.value))}
      >
        {OPCIONES_TAMANO_PAGINA.map((opcion) => (
          <option key={opcion} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectorTamanioPagina;
