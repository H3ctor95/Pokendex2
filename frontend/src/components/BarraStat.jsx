import React from 'react';
import { capitalizarTexto } from '../utils/formateador.js';

// Componente de barra visual de progreso para cada stat
export const BarraStat = ({ nombre, valor, maximo = 255 }) => {
  const porcentaje = Math.min((valor / maximo) * 100, 100);

  // Mapear nombres de estadísticas a términos legibles en español
  const nombresTraducidos = {
    hp: 'HP',
    attack: 'Ataque',
    defense: 'Defensa',
    specialAttack: 'Ataque Sp.',
    specialDefense: 'Defensa Sp.',
    speed: 'Velocidad'
  };

  const nombreTraducido = nombresTraducidos[nombre] || capitalizarTexto(nombre);

  // Definición de variables de clase de CSS utilizando la convención obligatoria
  const claseFila = 'flex items-center text-xs sm:text-sm my-2';
  const claseNombre = 'w-24 text-gray-600 font-medium capitalize';
  const claseValor = 'w-10 text-right font-bold text-gray-800 pr-2';
  const claseBarraContenedor = 'flex-1 bg-gray-200 h-3 rounded-full overflow-hidden';
  const claseBarraProgreso = 'bg-red-500 h-full rounded-full transition-all duration-500 ease-out';

  return (
    <div className={claseFila}>
      <span className={claseNombre}>{nombreTraducido}</span>
      <span className={claseValor}>{valor}</span>
      <div className={claseBarraContenedor}>
        {/* Excepción justificada: el ancho de la barra es completamente dinámico según el valor del stat, no predefinible mediante clases estáticas de Tailwind */}
        <div
          className={claseBarraProgreso}
          style={{ width: `${porcentaje}%` }}
        ></div>
      </div>
    </div>
  );
};

export default BarraStat;
