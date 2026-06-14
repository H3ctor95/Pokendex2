import React from 'react';
import TarjetaPokemon from './TarjetaPokemon.jsx';

// Componente para renderizar la cuadrícula (grid) de Pokémon
export const CuadriculaPokemon = ({ pokemons = [], alHacerClic, equipoTienePokemon, alAgregarEquipo }) => {
  // Variables de clases CSS en español y camelCase
  const claseCuadricula = 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-1';
  const claseSinResultados = 'text-center py-16 text-gray-500 font-medium text-sm flex flex-col items-center space-y-2';
  const claseIconoSinResultados = 'w-12 h-12 text-gray-300';

  if (pokemons.length === 0) {
    return (
      <div className={claseSinResultados}>
        <svg className={claseIconoSinResultados} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>No se encontraron Pokémon con los criterios de búsqueda.</span>
      </div>
    );
  }

  return (
    <div className={claseCuadricula}>
      {pokemons.map((pokemon) => (
        <TarjetaPokemon
          key={pokemon.id}
          pokemon={pokemon}
          alHacerClic={alHacerClic}
          enEquipo={equipoTienePokemon(pokemon.id)}
          alAgregarEquipo={alAgregarEquipo}
        />
      ))}
    </div>
  );
};

export default CuadriculaPokemon;
