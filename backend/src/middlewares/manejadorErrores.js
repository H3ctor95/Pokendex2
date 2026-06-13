// Middleware de manejo de errores global
const manejadorErrores = (err, req, res, next) => {
    const mensajeError = err.message || 'Error interno del servidor';
    
    // TODO: quitar
    // console.error(err);
  
    res.status(404).json({
      error: true,
      mensaje: mensajeError,
      status: 404
    });
  };
  
  export default manejadorErrores;
  