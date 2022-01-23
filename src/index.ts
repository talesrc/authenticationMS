import express, { Request, Response, NextFunction } from 'express';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';
import db from './db';
import errorHandler from './middlewares/error-handler.middleware';

const app = express();

const host = 'http://localhost';
const port = 3000;

//Configurações do servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

//Configurações de rota
app.use(usersRoute);
app.use(statusRoute);

//Configuração dos tratamentos de erro
app.use(errorHandler);

//Inicialização do servidor
app.listen(3000, () => console.log(`Server running at ${host}:${port}`));