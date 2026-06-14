import { Router } from 'express';
import { listarPokemon, obtenerDetallePokemon, listarTipos } from '../controllers/pokemonControlador.js';
import cacheMiddleware from '../middlewares/cache.js';

const router = Router();

// Ruta para obtener la lista de pokemons con cache
router.get('/pokemon', cacheMiddleware, listarPokemon);

// Ruta para obtener el detalle de un pokemon con cache
router.get('/pokemon/:id', cacheMiddleware, obtenerDetallePokemon);

// Ruta para obtener todos los tipos de pokemon con cache
router.get('/tipos', cacheMiddleware, listarTipos);

export default router;
