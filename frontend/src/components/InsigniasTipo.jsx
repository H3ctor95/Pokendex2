import React from 'react';
import { COLORES_TIPO } from '../constants/configuracion.js';
import { capitalizarTexto } from '../utils/formateador.js';

// Componente para renderizar insignias (badges) correspondientes a cada tipo de Pokémon
export const InsigniasTipo = ({ tipos = [] }) => {
  const claseContenedor = 'flex flex-wrap gap-2';

  return (
    <div className={claseContenedor}>
      {tipos.map((tipo) => {
        const claseBadge = `px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wider ${
          COLORES_TIPO[tipo] || 'bg-gray-400 text-white'
        }`;
        return (
          <span key={tipo} className={claseBadge}>
            {capitalizarTexto(tipo)}
          </span>
        );
      })}
    </div>
  );
};

export default InsigniasTipo;
