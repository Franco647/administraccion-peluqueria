import express, { Application, Request, Response } from 'express';

import routesCliente from '../routes/clientes'
import routesClienteHistorial from '../routes/cliente-historial';
import routesUsuario from '../routes/usuario'

import './associations';
import db from '../db/connection'
import cors from 'cors';


class Server {

    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001'; // Local 3001, Render usa el PORT que asigna
        this.midlewares();
        this.routes();
    }
    
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicación corriendo en el puerto ${this.port}`)
        })
    }


    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg: 'Mensaje de exito'
            })
        });

        this.app.use('/api/clientes', routesCliente);
        this.app.use('/api/clientes-historial', routesClienteHistorial);
        this.app.use('/api/usuario', routesUsuario);
    }

    midlewares() {
        // parseamos el body
        this.app.use(express.json())

        // Cors
        this.app.use(cors());
    }

    private async dbConnect() {
            console.log('🔌 Iniciando conexión a la base de datos...');
        try {
            await db.authenticate();
            console.log('✅ Base de datos conectada correctamente');
        } catch (error) {
            console.error('❌ Error al conectarse a la base de datos:', error);
            throw error;
        }
    }

    public async start() {
        await this.dbConnect();
        this.listen();
    }

}

export default Server;