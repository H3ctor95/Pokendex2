import React from 'react';
import InsigniasTipo from './InsigniasTipo.jsx';
import BarraStat from './BarraStat.jsx';
import { IMAGEN_FALLBACK } from '../constants/configuracion.js';
import { capitalizarTexto } from '../utils/formateador.js';

// Componente modal para ver el detalle de un Pokémon seleccionado
export const DetallePokemon = ({ pokemon, alCerrar, enEquipo, alAgregarEquipo }) => {
  if (!pokemon) return null;

  const spriteUrl = pokemon.sprites?.default || pokemon.sprites?.fallback || IMAGEN_FALLBACK;
  
  // Conversión de decímetros a metros y hectogramos a kilogramos
  const alturaMetros = (pokemon.height || 0) / 10;
  const pesoKilogramos = (pokemon.weight || 0) / 10;

  // Variables de clases CSS en español y camelCase
  const claseOverlay = 'fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto animate-fade-in';
  const claseContenedor = 'bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl max-h-[90vh] overflow-y-auto';
  const claseBotonCerrar = 'absolute top-4 right-4 text-gray-400 hover:text-gray-650 transition-colors p-1 rounded-full hover:bg-gray-150';
  const claseContenedorImagen = 'w-36 h-36 flex items-center justify-center bg-gray-50 rounded-full mx-auto mb-4 p-2 border border-gray-100';
  const claseImagen = 'w-32 h-32 object-contain';
  const claseId = 'text-center text-xs font-mono font-bold text-gray-450 tracking-wider';
  const claseNombre = 'text-center text-2xl font-bold text-gray-800 capitalize mb-3';
  const claseContenedorInsignias = 'flex justify-center mb-6';
  const claseContenedorDatosFisicos = 'grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl mb-6 text-center';
  const claseEtiquetaDatos = 'text-xs text-gray-400 font-semibold uppercase tracking-wider mb-0.5';
  const claseValorDatos = 'text-sm font-bold text-gray-700';
  const claseSeccionTitulo = 'text-xs font-bold text-gray-400 uppercase tracking-wider mb-2';
  const claseContenedorHabilidades = 'flex flex-wrap gap-1.5 mb-6';
  const claseHabilidadBadge = 'bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-md font-medium border border-gray-200 capitalize';
  const claseBotonAgregar = 'w-full bg-red-500 hover:bg-red-600 text-white text-sm font-bold py-2.5 px-4 rounded-xl transition-colors shadow-sm';
  const claseBotonQuitar = 'w-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm font-bold py-2.5 px-4 rounded-xl transition-colors border border-gray-200 shadow-sm';

  return (
    <div className={claseOverlay} onClick={alCerrar}>
      {/* Detiene la propagación del click para evitar cerrar al interactuar con el modal */}
      <div className={claseContenedor} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={claseBotonCerrar}
          onClick={alCerrar}
          aria-label="Cerrar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className={claseContenedorImagen}>
          <img
            className={claseImagen}
            src={spriteUrl}
            alt={pokemon.name}
            onError={(e) => { e.target.src = IMAGEN_FALLBACK; }}
          />
        </div>

        <div className={claseId}>#{String(pokemon.id).padStart(3, '0')}</div>
        <h2 className={claseNombre}>{capitalizarTexto(pokemon.name)}</h2>

        <div className={claseContenedorInsignias}>
          <InsigniasTipo tipos={pokemon.types} />
        </div>

        {/* Datos físicos de altura y peso */}
        <div className={claseContenedorDatosFisicos}>
          <div>
            <div className={claseEtiquetaDatos}>Altura</div>
            <div className={claseValorDatos}>{alturaMetros} m</div>
          </div>
          <div>
            <div className={claseEtiquetaDatos}>Peso</div>
            <div className={claseValorDatos}>{pesoKilogramos} kg</div>
          </div>
        </div>

        {/* Habilidades */}
        <div>
          <h4 className={claseSeccionTitulo}>Habilidades</h4>
          <div className={claseContenedorHabilidades}>
            {(pokemon.abilities || []).map((habilidad) => (
              <span key={habilidad} className={claseHabilidadBadge}>
                {habilidad.replace('-', ' ')}
              </span>
            ))}
          </div>
        </div>

        {/* Estadísticas de combate */}
        <div className="mb-2">
          <h4 className={claseSeccionTitulo}>Estadísticas base</h4>
          <BarraStat nombre="hp" valor={pokemon.stats?.hp} />
          <BarraStat nombre="attack" valor={pokemon.stats?.attack} />
          <BarraStat nombre="defense" valor={pokemon.stats?.defense} />
          <BarraStat nombre="specialAttack" valor={pokemon.stats?.specialAttack} />
          <BarraStat nombre="specialDefense" valor={pokemon.stats?.specialDefense} />
          <BarraStat nombre="speed" valor={pokemon.stats?.speed} />
        </div>

        {/* Botón de control del Team Builder */}
        <button
          type="button"
          className={enEquipo ? claseBotonQuitar : claseBotonAgregar}
          onClick={() => alAgregarEquipo(pokemon)}
        >
          {enEquipo ? 'Quitar del Equipo' : 'Agregar al Equipo'}
        </button>
      </div>
    </div>
  );
};

export default DetallePokemon;
