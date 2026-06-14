import React from 'react';

// Componente para la paginación con botones de Anterior/Siguiente e indicador de páginas
export const ControlPaginacion = ({ paginaActual, totalPaginas, alCambiarPagina }) => {
  const esPrimero = paginaActual === 1;
  const esUltimo = paginaActual === totalPaginas || totalPaginas === 0;

  // Variables de clases CSS obligatorias en español y camelCase
  const claseContenedor = 'flex items-center justify-center space-x-4 py-6';
  const claseTexto = 'text-xs sm:text-sm text-gray-600 font-medium';
  const claseBotonHabilitado = 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-bold py-2 px-4 rounded-lg shadow-sm transition-colors text-xs sm:text-sm';
  const claseBotonDeshabilitado = 'bg-gray-100 text-gray-400 border border-gray-200 font-bold py-2 px-4 rounded-lg cursor-not-allowed text-xs sm:text-sm';

  return (
    <div className={claseContenedor}>
      <button
        type="button"
        className={esPrimero ? claseBotonDeshabilitado : claseBotonHabilitado}
        disabled={esPrimero}
        onClick={() => alCambiarPagina(paginaActual - 1)}
      >
        Anterior
      </button>

      <span className={claseTexto}>
        Página {totalPaginas === 0 ? 0 : paginaActual} de {totalPaginas}
      </span>

      <button
        type="button"
        className={esUltimo ? claseBotonDeshabilitado : claseBotonHabilitado}
        disabled={esUltimo}
        onClick={() => alCambiarPagina(paginaActual + 1)}
      >
        Siguiente
      </button>
    </div>
  );
};

export default ControlPaginacion;
