import React from 'react';
import { usarDetallePokemon } from '../hooks/usarDetallePokemon.js';
import DetallePokemon from '../components/DetallePokemon.jsx';
import CargandoSpinner from '../components/CargandoSpinner.jsx';
import MensajeError from '../components/MensajeError.jsx';

// Componente para la página de detalle individual, útil para estructurar la visualización por ID
export const PaginaDetalle = ({ id, alCerrar, enEquipo, alAgregarEquipo }) => {
  const { data: pokemon, cargando, error } = usarDetallePokemon(id);

  if (cargando) {
    return <CargandoSpinner />;
  }

  if (error) {
    return <MensajeError mensaje={error} />;
  }

  if (!pokemon) {
    return null;
  }

  return (
    <DetallePokemon
      pokemon={pokemon}
      alCerrar={alCerrar}
      enEquipo={enEquipo}
      alAgregarEquipo={alAgregarEquipo}
    />
  );
};

export default PaginaDetalle;
