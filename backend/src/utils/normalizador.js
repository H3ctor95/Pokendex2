// Utilidad para extraer el ID de un pokemon desde su URL de PokeAPI
const extraerIdDeUrl = (url) => {
    if (!url) return null;
    const partes = url.split('/').filter(Boolean);
    return parseInt(partes[partes.length - 1], 10);
  };
  
  // Normaliza los datos de un pokemon individual para enviar solo lo necesario al frontend
  export const normalizarPokemon = (data) => {
    if (!data) return null;
  
    const types = (data.types || []).map((t) => t.type.name);
  
    // Extraer las estadísticas base
    const hp = (data.stats || []).find((s) => s.stat.name === 'hp')?.base_stat || 0;
    const attack = (data.stats || []).find((s) => s.stat.name === 'attack')?.base_stat || 0;
    const defense = (data.stats || []).find((s) => s.stat.name === 'defense')?.base_stat || 0;
    const specialAttack = (data.stats || []).find((s) => s.stat.name === 'special-attack')?.base_stat || 0;
    const specialDefense = (data.stats || []).find((s) => s.stat.name === 'special-defense')?.base_stat || 0;
    const speed = (data.stats || []).find((s) => s.stat.name === 'speed')?.base_stat || 0;
  
    const sprites = {
      default: data.sprites?.front_default || '',
      fallback: data.sprites?.other?.['official-artwork']?.front_default || data.sprites?.front_default || ''
    };
  
    const abilities = (data.abilities || []).map((a) => a.ability.name);
  
    return {
      id: data.id,
      name: data.name,
      types,
      sprites,
      stats: { hp, attack, defense, specialAttack, specialDefense, speed },
      height: data.height,
      weight: data.weight,
      abilities
    };
  };
  
  // Normaliza el listado de pokemons para simplificar la respuesta
  export const normalizarLista = (data) => {
    if (!data) return { count: 0, results: [] };
  
    const results = (data.results || []).map((item) => ({
      id: extraerIdDeUrl(item.url),
      name: item.name
    }));
  
    return {
      count: data.count || 0,
      results
    };
  };
  