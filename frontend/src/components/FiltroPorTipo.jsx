import React, { useState, useEffect } from 'react';
import { obtenerTipos } from '../services/pokemonServicio.js';
import { capitalizarTexto } from '../utils/formateador.js';

// Componente para filtrar pokemons por su tipo
export const FiltroPorTipo = ({ tipoSeleccionado, alCambiar }) => {
  // Variable de datos en inglés según convenciones
  const [types, establecerTypes] = useState([]);

  useEffect(() => {
    let active = true;
    obtenerTipos()
      .then((typesList) => {
        if (active) {
          establecerTypes(typesList || []);
        }
      })
      .catch((error) => {
        // TODO: quitar
        // console.error('Error al obtener tipos:', error);
      });

    return () => {
      active = false;
    };
  }, []);

  // Variables de clases CSS obligatorias en español y camelCase
  const claseContenedor = 'flex items-center space-x-2';
  const claseEtiqueta = 'text-xs sm:text-sm text-gray-500 font-medium';
  const claseSelect = 'bg-white border border-gray-300 text-gray-700 text-xs sm:text-sm rounded-lg focus:ring-red-500 focus:border-red-500 p-2 cursor-pointer outline-none';

  return (
    <div className={claseContenedor}>
      <label className={claseEtiqueta} htmlFor="filtro-tipo">
        Tipo:
      </label>
      <select
        id="filtro-tipo"
        className={claseSelect}
        value={tipoSeleccionado}
        onChange={(e) => alCambiar(e.target.value)}
      >
        <option value="">Todos</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {capitalizarTexto(type)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FiltroPorTipo;
