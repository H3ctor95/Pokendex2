import { obtenerLista, obtenerDetalle, obtenerTipos, obtenerPokemonPorTipo } from '../services/pokemonServicio.js';
import { normalizarPokemon, normalizarLista } from '../utils/normalizador.js';

// Controlador para listar pokemons con paginación y filtro opcional por tipo
export const listarPokemon = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 30;
    const offset = parseInt(req.query.offset, 10) || 0;
    const { type } = req.query;

    if (type) {
      const data = await obtenerPokemonPorTipo(type);
      const pokemons = (data.pokemon || []).map((p) => p.pokemon);
      const count = pokemons.length;
      const sliced = pokemons.slice(offset, offset + limit);
      const normalized = normalizarLista({ count, results: sliced });
      return res.json(normalized);
    } else {
      const data = await obtenerLista(limit, offset);
      const normalized = normalizarLista(data);
      return res.json(normalized);
    }
  } catch (error) {
    next(error);
  }
};

// Controlador para obtener el detalle de un pokemon por su ID o nombre
export const obtenerDetallePokemon = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await obtenerDetalle(id);
    const normalized = normalizarPokemon(data);
    return res.json(normalized);
  } catch (error) {
    next(error);
  }
};

// Controlador para listar los tipos disponibles de pokemon
export const listarTipos = async (req, res, next) => {
  try {
    const data = await obtenerTipos();
    const tipos = (data.results || []).map((r) => r.name);
    return res.json(tipos);
  } catch (error) {
    next(error);
  }
};

