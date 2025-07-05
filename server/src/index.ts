import Server from "./models/server";
import dotenv from 'dotenv'

// configuramos las variables de ambiente
dotenv.config();

const server = new Server();

try {
  server.listen();
  console.log('Servidor arrancado correctamente');
} catch (err) {
  console.error('Error arrancando el servidor:', err);
}