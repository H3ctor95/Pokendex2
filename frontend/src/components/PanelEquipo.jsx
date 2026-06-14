import React from 'react';
import { IMAGEN_FALLBACK } from '../constants/configuracion.js';
import { capitalizarTexto } from '../utils/formateador.js';

// Componente del panel inferior para mostrar los 6 integrantes del equipo
export const PanelEquipo = ({ equipo = [], alQuitarDelEquipo }) => {
  const slots = Array.from({ length: 6 });

  // Variables de clases CSS obligatorias en español y camelCase
  const clasePanel = 'bg-white border-t border-gray-200 p-4 shadow-xl';
  const claseTitulo = 'text-xs sm:text-sm font-bold text-gray-700 text-center mb-2.5 uppercase tracking-wider';
  const claseContenedorSlots = 'flex justify-center gap-2 sm:gap-4 overflow-x-auto pb-1';
  const claseSlotLleno = 'relative w-16 h-16 sm:w-20 sm:h-20 bg-gray-50 rounded-xl border border-gray-200 flex flex-col items-center justify-center group p-1 flex-shrink-0';
  const claseSlotVacio = 'w-16 h-16 sm:w-20 sm:h-20 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-300 text-[10px] sm:text-xs font-semibold flex-shrink-0';
  const claseBotonEliminar = 'absolute -top-1.5 -right-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5 sm:p-1 shadow transition-colors z-10';
  const claseImagen = 'w-10 h-10 sm:w-12 sm:h-12 object-contain';
  const claseNombre = 'text-[9px] sm:text-[10px] font-bold text-gray-600 truncate w-full text-center px-1 capitalize mt-0.5';

  return (
    <div className={clasePanel}>
      <h3 className={claseTitulo}>Mi Equipo Pokémon ({equipo.length}/6)</h3>
      <div className={claseContenedorSlots}>
        {slots.map((_, indice) => {
          const pokemon = equipo[indice];
          if (pokemon) {
            const spriteUrl = pokemon.sprites?.default || pokemon.sprites?.fallback || IMAGEN_FALLBACK;
            return (
              <div key={pokemon.id} className={claseSlotLleno}>
                <button
                  type="button"
                  className={claseBotonEliminar}
                  onClick={() => alQuitarDelEquipo(pokemon.id)}
                  title={`Quitar a ${pokemon.name}`}
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <img
                  className={claseImagen}
                  src={spriteUrl}
                  alt={pokemon.name}
                  onError={(e) => { e.target.src = IMAGEN_FALLBACK; }}
                />
                <span className={claseNombre}>{capitalizarTexto(pokemon.name)}</span>
              </div>
            );
          }

          return (
            <div key={indice} className={claseSlotVacio}>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              <span>Vacío</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PanelEquipo;
