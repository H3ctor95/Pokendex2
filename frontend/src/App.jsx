import React, { useState, useEffect } from 'react';
import { usarEquipo } from './hooks/usarEquipo.js';
import { usarBusqueda } from './hooks/usarBusqueda.js';
import { usarListaPokemon } from './hooks/usarListaPokemon.js';
import PaginaInicio from './pages/PaginaInicio.jsx';
import DetallePokemon from './components/DetallePokemon.jsx';
import ConstructorEquipo from './components/ConstructorEquipo.jsx';
import CargandoSpinner from './components/CargandoSpinner.jsx';
import MensajeError from './components/MensajeError.jsx';

// Componente principal de la aplicación Pokédex
export const App = () => {
  // Estados globales requeridos
  const [paginaActual, establecerPaginaActual] = useState(1);
  const [limite, establecerLimite] = useState(30);
  const [tipoBuscado, establecerTipoBuscado] = useState('');
  const [textoBusqueda, establecerTextoBusqueda] = useState('');
  const [pokemonSeleccionado, establecerPokemonSeleccionado] = useState(null);

  // Hook de búsqueda controlado
  const { valor: textoBusquedaInput, alCambiar: alCambiarBusqueda } = usarBusqueda();

  // Hook del Team Builder
  const { equipo, agregarAlEquipo, quitarDelEquipo, equipoTienePokemon } = usarEquipo();

  // Debounce para la búsqueda (evita llamadas excesivas a la API mientras se escribe)
  useEffect(() => {
    const timer = setTimeout(() => {
      establecerTextoBusqueda(textoBusquedaInput);
    }, 400);
    return () => clearTimeout(timer);
  }, [textoBusquedaInput]);

  // Restablecer la página a 1 si cambian los filtros
  useEffect(() => {
    establecerPaginaActual(1);
  }, [tipoBuscado, textoBusqueda, limite]);

  // Hook de carga de la lista de Pokémon
  const { data, cargando, error } = usarListaPokemon({
    pagina: paginaActual,
    limite,
    tipoBuscado,
    textoBusqueda
  });

  const totalPaginas = Math.ceil((data?.count || 0) / limite);

  // Manejador para agregar o quitar pokemons del equipo
  const alAgregarEquipo = (pokemon) => {
    if (equipoTienePokemon(pokemon.id)) {
      quitarDelEquipo(pokemon.id);
    } else {
      agregarAlEquipo(pokemon);
    }
  };

  // Detección de entorno pywebview
  const esDesktop = typeof window !== 'undefined' && typeof window.pywebview !== 'undefined';

  const alMinimizarVentana = () => {
    if (window.pywebview?.api?.minimizar_ventana) {
      window.pywebview.api.minimizar_ventana();
    }
  };

  const alMaximizarVentana = () => {
    if (window.pywebview?.api?.maximizar_ventana) {
      window.pywebview.api.maximizar_ventana();
    }
  };

  const alCerrarVentana = () => {
    if (window.pywebview?.api?.cerrar_ventana) {
      window.pywebview.api.cerrar_ventana();
    }
  };

  // Variables de clases CSS en español y camelCase
  const claseContenedorApp = 'min-h-screen bg-gray-100 flex flex-col font-sans';
  const claseBarraTitulo = 'bg-gray-800 text-white h-10 px-4 flex items-center justify-between select-none fixed top-0 left-0 right-0 z-55';
  const claseBarraTituloTexto = 'text-xs font-bold tracking-wider uppercase';
  const claseContenedorBotonesBarra = 'flex items-center space-x-2';
  const claseBotonMin = 'w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 focus:outline-none transition-colors';
  const claseBotonMax = 'w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 focus:outline-none transition-colors';
  const claseBotonCerrar = 'w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 focus:outline-none transition-colors';
  
  const claseContenidoPrincipal = 'flex-1 max-w-6xl w-full mx-auto px-4 pb-32';
  const claseTituloSeo = 'text-3xl sm:text-4xl font-extrabold text-gray-800 text-center mb-1 mt-6';
  const claseSubtituloSeo = 'text-xs sm:text-sm text-gray-500 text-center mb-8 font-medium';
  const claseContenedorFooter = 'fixed bottom-0 left-0 right-0 z-40 bg-white shadow-2xl border-t border-gray-200';

  return (
    <div className={claseContenedorApp}>
      {/* Barra de título personalizada para entorno pywebview (desktop) */}
      {esDesktop && (
        /* Excepción justificada: -webkit-app-region es una propiedad de CSS no estándar utilizada en aplicaciones desktop híbridas para definir regiones de arrastre de ventana. */
        <div
          className={claseBarraTitulo}
          style={{ WebkitAppRegion: 'drag', WebkitUserSelect: 'none' }}
        >
          <span className={claseBarraTituloTexto}>Pokédex Desktop</span>
          <div className={claseContenedorBotonesBarra}>
            {/* Excepción justificada: -webkit-app-region: no-drag se requiere para permitir clics en botones ubicados en una zona de arrastre. */}
            <button
              type="button"
              className={claseBotonMin}
              style={{ WebkitAppRegion: 'no-drag' }}
              onClick={alMinimizarVentana}
              title="Minimizar"
            />
            <button
              type="button"
              className={claseBotonMax}
              style={{ WebkitAppRegion: 'no-drag' }}
              onClick={alMaximizarVentana}
              title="Maximizar"
            />
            <button
              type="button"
              className={claseBotonCerrar}
              style={{ WebkitAppRegion: 'no-drag' }}
              onClick={alCerrarVentana}
              title="Cerrar"
            />
          </div>
        </div>
      )}

      {/* Espaciador cuando corre en desktop debido a la barra superior fija */}
      <main className={`${claseContenidoPrincipal} ${esDesktop ? 'pt-14' : 'pt-6'}`}>
        <h1 className={claseTituloSeo}>Pokédex Oficial</h1>
        <p className={claseSubtituloSeo}>Consulta detalles de tus Pokémon favoritos y crea tu equipo soñado.</p>

        {error ? (
          <MensajeError mensaje={error} />
        ) : (
          <>
            {cargando && data.results.length === 0 ? (
              <CargandoSpinner />
            ) : (
              <PaginaInicio
                valorBusqueda={textoBusquedaInput}
                alCambiarBusqueda={alCambiarBusqueda}
                tipoSeleccionado={tipoBuscado}
                alCambiarTipo={establecerTipoBuscado}
                limite={limite}
                alCambiarLimite={establecerLimite}
                pokemons={data?.results || []}
                alHacerClicPokemon={establecerPokemonSeleccionado}
                equipoTienePokemon={equipoTienePokemon}
                alAgregarEquipo={alAgregarEquipo}
                paginaActual={paginaActual}
                totalPaginas={totalPaginas}
                alCambiarPagina={establecerPaginaActual}
              />
            )}
            {/* Mostrar cargando discreto al paginar si ya hay datos en pantalla */}
            {cargando && data.results.length > 0 && (
              <div className="text-center py-2 text-xs text-gray-400 font-medium animate-pulse">
                Actualizando resultados...
              </div>
            )}
          </>
        )}
      </main>

      {/* Detalle del Pokémon seleccionado como modal overlay */}
      {pokemonSeleccionado && (
        <DetallePokemon
          pokemon={pokemonSeleccionado}
          alCerrar={() => establecerPokemonSeleccionado(null)}
          enEquipo={equipoTienePokemon(pokemonSeleccionado.id)}
          alAgregarEquipo={alAgregarEquipo}
        />
      )}

      {/* Panel de Equipo persistente al pie de la pantalla */}
      <footer className={claseContenedorFooter}>
        <ConstructorEquipo equipo={equipo} alQuitarDelEquipo={quitarDelEquipo} />
      </footer>
    </div>
  );
};

export default App;
