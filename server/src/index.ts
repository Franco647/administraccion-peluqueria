import Server from "./models/server";
import dotenv from 'dotenv'

// configuramos las variables de ambiente
dotenv.config();

const server = new Server();

server.start().catch(err => {
  console.error('❌ Falló el inicio del servidor:', err);
});