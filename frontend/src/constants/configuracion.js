// Opciones de paginación disponibles
export const OPCIONES_TAMANO_PAGINA = [10, 30, 50];

// URL base del backend (dinámica según el entorno)
export const API_BASE_URL = (
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:')
)
  ? 'http://localhost:3001/api'
  : (import.meta.env.VITE_API_BASE_URL || '/api');


// Imagen fallback si falla el sprite
export const IMAGEN_FALLBACK = 'https://via.placeholder.com/96x96?text=?';

// Colores de tipos para las insignias usando clases de TailwindCSS
export const COLORES_TIPO = {
  normal: 'bg-gray-400 text-white',
  fire: 'bg-orange-400 text-white',
  water: 'bg-blue-400 text-white',
  grass: 'bg-green-400 text-white',
  electric: 'bg-yellow-400 text-black',
  ice: 'bg-cyan-300 text-black',
  fighting: 'bg-red-500 text-white',
  poison: 'bg-purple-400 text-white',
  ground: 'bg-amber-600 text-white',
  flying: 'bg-indigo-300 text-black',
  psychic: 'bg-pink-400 text-white',
  bug: 'bg-lime-500 text-white',
  rock: 'bg-yellow-600 text-white',
  ghost: 'bg-violet-600 text-white',
  dragon: 'bg-indigo-600 text-white',
  steel: 'bg-slate-400 text-white',
  fairy: 'bg-pink-300 text-black',
  dark: 'bg-neutral-700 text-white',
  shadow: 'bg-gray-800 text-white',
  unknown: 'bg-gray-500 text-white'
};
