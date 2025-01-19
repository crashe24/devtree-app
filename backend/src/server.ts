// 2 es el server.ts
// base de datos moongose
// npm i mongoose
// npm i dotenv
// npm i cors
// npm i -D @types/cors

import express  from 'express';
import 'dotenv/config';
import router from './router';
import { connectDB } from './config/db';
import { corsConfig } from './config/cors';
import cors from 'cors'
// conectar a la base de datos
connectDB()


// servidor
const server = express()
// cors
server.use(cors(corsConfig))
// permite o habilita leer datos de formularion
server.use(express.json())
// rutas
server.use('/api',router)

export default server;