import React from 'react';
import PanelEquipo from './PanelEquipo.jsx';

// Componente contenedor para el constructor de equipos
export const ConstructorEquipo = ({ equipo = [], alQuitarDelEquipo }) => {
  const claseContenedor = 'w-full';

  return (
    <div className={claseContenedor}>
      <PanelEquipo equipo={equipo} alQuitarDelEquipo={alQuitarDelEquipo} />
    </div>
  );
};

export default ConstructorEquipo;
