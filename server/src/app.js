import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { register } from './http/controllers/register.js';
import { errorHandler } from './http/middlewares/error-handler.js';
import { listGames } from './http/controllers/list-games.js';
import { edit } from './http/controllers/edit.js';
import { deleteGame } from './http/controllers/delete.js';

export const app = express();
app.use(express.json());
app.use(cors());

app.post('/register', register);
app.get('/list_games', listGames);
app.patch('/edit/:id', edit);
app.delete('/delete/:id', deleteGame);

app.use(errorHandler);
