import React from 'react';
import BarraBusqueda from '../components/BarraBusqueda.jsx';
import FiltroPorTipo from '../components/FiltroPorTipo.jsx';
import SelectorTamanioPagina from '../components/SelectorTamanioPagina.jsx';
import CuadriculaPokemon from '../components/CuadriculaPokemon.jsx';
import ControlPaginacion from '../components/ControlPaginacion.jsx';

// Componente para la página de inicio que agrupa los controles del listado y la cuadrícula
export const PaginaInicio = ({
  valorBusqueda,
  alCambiarBusqueda,
  tipoSeleccionado,
  alCambiarTipo,
  limite,
  alCambiarLimite,
  pokemons = [],
  alHacerClicPokemon,
  equipoTienePokemon,
  alAgregarEquipo,
  paginaActual,
  totalPaginas,
  alCambiarPagina
}) => {
  // Clases CSS obligatorias en español y camelCase
  const claseSeccionControles = 'flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl shadow-sm mb-6';
  const claseGrupoControles = 'flex flex-wrap gap-4 items-center justify-end w-full md:w-auto';

  return (
    <div>
      <div className={claseSeccionControles}>
        <BarraBusqueda valor={valorBusqueda} alCambiar={alCambiarBusqueda} />
        <div className={claseGrupoControles}>
          <FiltroPorTipo tipoSeleccionado={tipoSeleccionado} alCambiar={alCambiarTipo} />
          <SelectorTamanioPagina valorActual={limite} alCambiar={alCambiarLimite} />
        </div>
      </div>

      <CuadriculaPokemon
        pokemons={pokemons}
        alHacerClic={alHacerClicPokemon}
        equipoTienePokemon={equipoTienePokemon}
        alAgregarEquipo={alAgregarEquipo}
      />

      <ControlPaginacion
        paginaActual={paginaActual}
        totalPaginas={totalPaginas}
        alCambiarPagina={alCambiarPagina}
      />
    </div>
  );
};

export default PaginaInicio;
