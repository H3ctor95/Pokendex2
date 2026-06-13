import axios from 'axios';

const baseUrl = process.env.POKEAPI_BASE_URL || 'https://pokeapi.co/api/v2';

// Llama a /pokemon?limit=&offset= para obtener el listado de pokemons
export const obtenerLista = async (limit = 30, offset = 0) => {
  const url = `${baseUrl}/pokemon`;
  const response = await axios.get(url, {
    params: { limit, offset }
  });
  return response.data;
};

// Llama a /pokemon/:id para obtener los detalles de un pokemon por ID o nombre
export const obtenerDetalle = async (id) => {
  const url = `${baseUrl}/pokemon/${id}`;
  const response = await axios.get(url);
  return response.data;
};

// Llama a /type para obtener el listado de todos los tipos de pokemon
export const obtenerTipos = async () => {
  const url = `${baseUrl}/type`;
  const response = await axios.get(url);
  return response.data;
};

// Llama a /type/:tipo para obtener los pokemons de un tipo específico
export const obtenerPokemonPorTipo = async (tipo) => {
  const url = `${baseUrl}/type/${tipo}`;
  const response = await axios.get(url);
  return response.data;
};

