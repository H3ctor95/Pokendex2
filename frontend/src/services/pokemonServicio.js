import { API_BASE_URL } from '../constants/configuracion.js';

// Obtiene la lista paginada de pokemons, con filtro por tipo opcional y soporte para AbortController
export const obtenerListaPokemon = async (limit, offset, tipo, signal) => {
  let url = `${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`;
  if (tipo) {
    url += `&type=${tipo}`;
  }
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error('Error al obtener la lista de Pokémon');
  }
  return await response.json();
};

// Obtiene el detalle de un pokemon por su ID o nombre
export const obtenerDetallePokemon = async (id) => {
  const url = `${API_BASE_URL}/pokemon/${id}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error al obtener el detalle del Pokémon');
  }
  return await response.json();
};

// Obtiene todos los tipos de pokemon disponibles en el backend
export const obtenerTipos = async () => {
  const url = `${API_BASE_URL}/tipos`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Error al obtener los tipos de Pokémon');
  }
  return await response.json();
};
