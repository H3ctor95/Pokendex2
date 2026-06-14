import React from 'react';
import InsigniasTipo from './InsigniasTipo.jsx';
import { IMAGEN_FALLBACK } from '../constants/configuracion.js';
import { capitalizarTexto } from '../utils/formateador.js';

// Componente de tarjeta para representar a cada Pokémon en el listado
export const TarjetaPokemon = ({ pokemon, alHacerClic, enEquipo, alAgregarEquipo }) => {
  const spriteUrl = pokemon.sprites?.default || pokemon.sprites?.fallback || IMAGEN_FALLBACK;

  const manejarErrorImagen = (e) => {
    e.target.src = IMAGEN_FALLBACK;
  };

  const manejarClickBoton = (e) => {
    e.stopPropagation();
    alAgregarEquipo(pokemon);
  };

  // Variables de clases CSS obligatorias en español y camelCase
  const claseTarjeta = 'bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow cursor-pointer border border-gray-150 flex flex-col items-center text-center';
  const claseContenedorImagen = 'w-24 h-24 flex items-center justify-center bg-gray-50 rounded-full mb-3';
  const claseImagen = 'w-20 h-20 object-contain';
  const claseId = 'text-xs text-gray-400 font-mono font-medium mb-0.5';
  const claseNombre = 'text-base font-bold text-gray-800 mb-2';
  const claseBotonAgregar = 'mt-4 w-full bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors';
  const claseBotonQuitar = 'mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-bold py-2 px-3 rounded-lg transition-colors border border-gray-200';

  return (
    <div className={claseTarjeta} onClick={() => alHacerClic(pokemon)}>
      <div className={claseContenedorImagen}>
        <img
          className={claseImagen}
          src={spriteUrl}
          alt={pokemon.name}
          onError={manejarErrorImagen}
        />
      </div>
      <span className={claseId}>#{String(pokemon.id).padStart(3, '0')}</span>
      <h3 className={claseNombre}>{capitalizarTexto(pokemon.name)}</h3>
      <InsigniasTipo tipos={pokemon.types} />
      
      <button
        type="button"
        className={enEquipo ? claseBotonQuitar : claseBotonAgregar}
        onClick={manejarClickBoton}
      >
        {enEquipo ? 'Quitar del Equipo' : 'Agregar al Equipo'}
      </button>
    </div>
  );
};

export default TarjetaPokemon;
