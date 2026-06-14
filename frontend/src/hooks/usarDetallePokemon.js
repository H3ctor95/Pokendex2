import { useState, useEffect } from 'react';
import { obtenerDetallePokemon } from '../services/pokemonServicio.js';

// Hook personalizado para obtener y manejar los detalles de un Pokémon específico
export const usarDetallePokemon = (id) => {
  const [data, establecerData] = useState(null);
  const [cargando, establecerCargando] = useState(false);
  const [error, establecerError] = useState(null);

  useEffect(() => {
    if (!id) {
      establecerData(null);
      return;
    }

    let active = true;
    establecerCargando(true);
    establecerError(null);

    obtenerDetallePokemon(id)
      .then((pokemonData) => {
        if (active) {
          establecerData(pokemonData);
          establecerCargando(false);
        }
      })
      .catch((err) => {
        if (active) {
          establecerError(err.message || 'Error al cargar los detalles del Pokémon');
          establecerCargando(false);
        }
      });

    return () => {
      active = false;
    };
  }, [id]);

  return { data, cargando, error };
};

export default usarDetallePokemon;
