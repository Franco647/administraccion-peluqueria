import { Router } from 'express';
import { deleteClienteHistorial, getClienteHistorial, postClienteHistorial, putClienteHistorial } from '../controllers/clientes_historial';

const router = Router();


router.get('/:id', getClienteHistorial);

router.delete('/:id/historial', deleteClienteHistorial);

router.post('/:id/historial', postClienteHistorial);

router.put('/:id/historial', putClienteHistorial);


export default router;