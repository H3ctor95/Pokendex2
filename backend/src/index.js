// Punto de entrada del servidor
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pokemonRutas from './routes/pokemonRutas.js';
import manejadorErrores from './middlewares/manejadorErrores.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api', pokemonRutas);
app.use(manejadorErrores);

app.listen(PORT, () => {
  // TODO: quitar
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
