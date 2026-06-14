import { useState, useEffect } from 'react';
import { obtenerListaPokemon, obtenerDetallePokemon } from '../services/pokemonServicio.js';

// Hook personalizado para manejar el listado de Pokémon paginado, filtrado por tipo o con búsqueda activa
export const usarListaPokemon = ({ pagina, limite, tipoBuscado, textoBusqueda }) => {
  const [data, establecerData] = useState({ count: 0, results: [] });
  const [cargando, establecerCargando] = useState(false);
  const [error, establecerError] = useState(null);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    const cargarDatos = async () => {
      establecerCargando(true);
      establecerError(null);

      try {
        if (textoBusqueda && textoBusqueda.trim() !== '') {
          // Modo Búsqueda: Obtener detalle del Pokémon buscado por nombre o ID directamente
          try {
            const query = textoBusqueda.trim().toLowerCase();
            const pokemonData = await obtenerDetallePokemon(query);
            if (active) {
              establecerData({
                count: 1,
                results: [pokemonData]
              });
              establecerCargando(false);
            }
          } catch (err) {
            // Si no se encuentra, devolvemos lista vacía sin romper el flujo
            if (active) {
              establecerData({ count: 0, results: [] });
              establecerCargando(false);
            }
          }
        } else {
          // Modo Normal / Filtro: Obtener lista paginada y luego sus detalles
          const offset = (pagina - 1) * limite;
          const listResponse = await obtenerListaPokemon(limite, offset, tipoBuscado, controller.signal);

          if (!active) return;

          // Cargar los detalles de cada Pokémon de la página en paralelo
          const detailPromises = (listResponse.results || []).map((p) =>
            obtenerDetallePokemon(p.id)
          );
          const detailedResults = await Promise.all(detailPromises);

          if (active) {
            establecerData({
              count: listResponse.count || 0,
              results: detailedResults
            });
            establecerCargando(false);
          }
        }
      } catch (err) {
        if (err.name === 'AbortError') {
          return;
        }
        if (active) {
          establecerError(err.message || 'Error al cargar los Pokémon');
          establecerCargando(false);
        }
      }
    };

    cargarDatos();

    return () => {
      active = false;
      controller.abort();
    };
  }, [pagina, limite, tipoBuscado, textoBusqueda]);

  return { data, cargando, error };
};

export default usarListaPokemon;
