import { useState, useEffect } from 'react';

// Hook personalizado para administrar el equipo de Pokémon (máximo 6, persistencia en localStorage)
export const usarEquipo = () => {
  const [equipo, establecerEquipo] = useState([]);

  // Cargar el equipo guardado en localStorage al montar el componente
  useEffect(() => {
    const storedTeam = localStorage.getItem('equipoPokemon');
    if (storedTeam) {
      try {
        const teamData = JSON.parse(storedTeam);
        establecerEquipo(Array.isArray(teamData) ? teamData : []);
      } catch (error) {
        establecerEquipo([]);
      }
    }
  }, []);

  // Agrega un pokemon al equipo si no se excede el límite y no está duplicado
  const agregarAlEquipo = (pokemon) => {
    if (equipo.length >= 6) {
      return false;
    }
    if (equipo.some((p) => p.id === pokemon.id)) {
      return false;
    }
    const updatedTeam = [...equipo, pokemon];
    establecerEquipo(updatedTeam);
    localStorage.setItem('equipoPokemon', JSON.stringify(updatedTeam));
    return true;
  };

  // Quita un pokemon del equipo por su ID
  const quitarDelEquipo = (id) => {
    const updatedTeam = equipo.filter((p) => p.id !== id);
    establecerEquipo(updatedTeam);
    localStorage.setItem('equipoPokemon', JSON.stringify(updatedTeam));
  };

  // Verifica si un pokemon ya se encuentra en el equipo
  const equipoTienePokemon = (id) => {
    return equipo.some((p) => p.id === id);
  };

  return {
    equipo,
    agregarAlEquipo,
    quitarDelEquipo,
    equipoTienePokemon
  };
};
export default usarEquipo;
