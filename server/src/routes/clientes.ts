import { Router } from 'express';
import { deleteCliente, getClientes, getMetodosDePago, getSexos, postCliente, putCliente } from '../controllers/clientes';


const router = Router();

router.get('/sexo', getSexos);
router.get('/metodos', getMetodosDePago)

router.get('/', getClientes);

router.delete('/:id', deleteCliente);

router.post('/', postCliente);

router.put('/:id', putCliente);


export default router;