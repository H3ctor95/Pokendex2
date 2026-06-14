import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pokemonRutas from './routes/pokemonRutas.js';
import manejadorErrores from './middlewares/manejadorErrores.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', pokemonRutas);
app.use(manejadorErrores);

export default app;
