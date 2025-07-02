import { NextFunction, Request, RequestHandler, Response } from 'express';

import Cliente from '../models/cliente';
import ClienteHistorial from '../models/cliente-historial';
import MetodoPago from '../models/metodos-pago';


export const getClienteHistorial = async (req: Request, res: Response) => {

    const { id } = req.params;
    
    try {  
        const cliente = await Cliente.findByPk(id, {
            include: [{
                model: ClienteHistorial,
                as: 'historial',
                include: [{
                    model: MetodoPago,
                    as: 'metodoPago'
                }]
            }]
        })
        if (cliente) {
            res.json({
                status: 'ok',
                msg: 'Get cliente exitoso',
                body: cliente
            })
        } else {
            res.status(404).json({
                status: 'error',
                msg: `No existe un cliente con el id ${id}`
            })
        }
    } catch (error) {
        console.error('ERROR al obtener cliente:', error);
        res.status(500).json({
            status: 'error',
            msg: `Ocurrió un error al obtener el cliente ${error}`
        });
    }
}


export const deleteClienteHistorial = async (req: Request, res: Response): Promise<void> => {

    try {
        const { id } = req.params;

        const cliente = await ClienteHistorial.findByPk(id);

        if (!cliente) {
            res.status(404).json({
                status: 'error',
                msg: `No existe un cliente con el id ${id}`,
            });
            return;
        }

        await cliente.destroy();

        res.json({
            status: 'ok',
            msg: 'El trabajo fue eliminado',
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            msg: `Ocurrió un error al eliminar el cliente: ${error}`,
        });
    }
}


export const postClienteHistorial = async (req: Request, res: Response): Promise<void> => {

    const { id } = req.params;
    const { name, description, price, date, metodo_pago } = req.body;

    const metodoMap: Record<number, string> = {
        1: 'Credito',
        2: 'Debito',
        3: 'Efectivo',
        4: 'Transferencia'
    };

    try {
        const metodoTexto = metodoMap[metodo_pago];

        if (!metodoTexto) {
            res.status(400).json({
                status: 'error'
            });
        }

        const cliente = await Cliente.findByPk(id);

        if (!cliente) {
            res.status(404).json({
                msg: `No se encontró un cliente con el ID ${id}`,
            });
        }
        
        const historial = await ClienteHistorial.create({
            cliente_id: id,
            name,
            description,
            price,
            date,
            metodo_pago: metodoTexto,
            metodo_pago_id: metodo_pago
        });

        res.json({
            status: 'ok',
            msg: 'Historial agregado con éxito',
            historial,
        });

    } catch (error) {
        res.status(500).json({
            status: 'error',
            msg: `Ocurrió un error al agregar el historial: ${error}`,
        });
    }
};


export const putClienteHistorial = async (req: Request, res: Response) => {

    const { body } = req;
    const { id } = req.params;
    
    const metodoMap: Record<number, string> = {
        1: 'Credito',
        2: 'Debito',
        3: 'Efectivo',
        4: 'Transferencia'
    };

    if (body.metodo_pago && metodoMap[body.metodo_pago]) {
        body.metodo_pago = metodoMap[body.metodo_pago];
        body.metodo_pago_id = parseInt(Object.keys(metodoMap).find(key => metodoMap[parseInt(key)] === body.metodo_pago) || "0");
    }

    try {        

        const cliente = await ClienteHistorial.findByPk(id)

        if (cliente) {
            await cliente.update(body);
            res.json({
                status: 'ok',
                msg: `El cliente ${id} fue editado correctamente`
            })
        } else {
            res.status(404).json({
                status: 'ok',
                msg: `No existe un cliente con el id ${id}`
            })
        }
    } catch (error) {
        res.json({
            status: 'error',
            msg: `Ocurrio un error` 
        })
    }
}