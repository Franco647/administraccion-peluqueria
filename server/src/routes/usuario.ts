import { Router } from 'express';
import { login, logout } from '../controllers/usuario';
import { validarJWT } from '../middlewares/validar-jwt';

const router = Router();

// login
router.post('/login', login);
router.post('/logout', logout);

router.get('/protected', validarJWT, (req, res) => {
  res.json({ msg: 'Ruta protegida accedida con éxito' });
});

export default router;