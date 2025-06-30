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
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnect();
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

    async dbConnect() {

        try {
            await db.authenticate();
        } catch (error) {
            console.log(error)
            console.log('Error a conectarse a la base de datos')
        }

    }


}

export default Server;