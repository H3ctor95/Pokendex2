const cacheMap = new Map();
const TTL_MS = 5 * 60 * 1000;

// Verifica si la clave existe en cache y no ha expirado
export const verificarCache = (clave) => {
  const item = cacheMap.get(clave);
  if (!item) return null;

  const esExpirado = Date.now() - item.timestamp > TTL_MS;
  if (esExpirado) {
    cacheMap.delete(clave);
    return null;
  }
  return item.dato;
};

// Guarda un dato en el cache con la marca de tiempo actual
export const guardarCache = (clave, dato) => {
  cacheMap.set(clave, {
    dato,
    timestamp: Date.now()
  });
};

// Middleware para interceptar peticiones GET y cachearlas
const cacheMiddleware = (req, res, next) => {
  if (req.method !== 'GET') {
    return next();
  }

  const clave = req.originalUrl || req.url;
  const datoCacheado = verificarCache(clave);

  if (datoCacheado) {
    return res.json(datoCacheado);
  }

  // Intercepta la llamada a json para cachear el resultado antes de enviarlo
  const jsonOriginal = res.json;
  res.json = function (dato) {
    if (res.statusCode === 200 && (!dato || !dato.error)) {
      guardarCache(clave, dato);
    }
    return jsonOriginal.call(this, dato);
  };

  next();
};

export default cacheMiddleware;
