import { Request, Response } from 'express';
import Cliente from '../models/cliente';


import Sexo from '../models/sexo';
import MetodoPago from '../models/metodos-pago';



export const getSexos = async (req: Request, res: Response) => {
    try {
        const sexos = await Sexo.findAll();
        res.json({ status: 'ok', sexos });
    } catch (error) {
        res.status(500).json({ status: 'error', msg: 'Error al obtener sexos' });
    }
};

export const getMetodosDePago = async (req: Request, res: Response) => {
    try {
        const metodos = await MetodoPago.findAll();
        res.json({ status: 'ok', metodos });
    } catch (error) {
        res.status(500).json({ status: 'error', msg: 'Error al obtener métodos de pago' });
    }
};





export const getClientes = async (req: Request, res: Response) => {

    const listCliente = await Cliente.findAll()
    try {
        res.json({
            status: 'ok',
            msg: 'get de clientes',
            body: listCliente
        })
    } catch (error) {
        res.json({
            status: `error`,
            msg: `Ocurrió un error al cargar los clientes ${error}`
        })
    }
}

export const deleteCliente = async (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params;

    try {
        const cliente = await Cliente.findByPk(id);

        if (!cliente) {
            return res.status(404).json({
                status: 'error',
                msg: `No existe un cliente con el id ${id}`,
            });
        }

        await cliente.destroy();

        return res.json({
            status: 'ok',
            msg: 'El cliente y su historial fueron eliminados',
        });
    } catch (error) {
        console.error(error);
        return  res.status(500).json({
            status: 'error',
            msg: `Ocurrió un error al eliminar el cliente: ${error}`,
        });
    }
};

export const postCliente = async (req: Request, res: Response) => {

    const { body } = req;
    
    const sexoMap: Record<number, string> = {
        1: 'Masculino',
        2: 'Femenino',
        3: 'No definido'
    };

    try {
        const sexoTexto = sexoMap[body.sexo];

        if (!sexoTexto) {
            return res.status(400).json({
                status: 'error',
                msg: 'El valor de sexo debe ser 1 (masculino), 2 (femenino) o 3 (no definido)'
            });
        }

        const cliente = await Cliente.create({
            ...body,
            sexo: sexoTexto
        });

        res.json({
            status: 'ok',
            msg: 'El cliente fue agregado con éxito',
            body: cliente
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            msg: `Ocurrió un error: ${error}`
        })
    }
}

export const putCliente = async (req: Request, res: Response) => {

    const { body } = req;
    const { id } = req.params;
    
    try {        
        const cliente = await Cliente.findByPk(id)
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
        console.log(error);
        res.json({
            status: 'error',
            msg: `Ocurrio un error` 
        })
    }
}