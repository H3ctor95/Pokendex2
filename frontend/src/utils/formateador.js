// Capitaliza la primera letra de un texto
export const capitalizarTexto = (texto) => {
  if (!texto) return '';
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
};
