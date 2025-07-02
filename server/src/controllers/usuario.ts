// controllers/auth.ts
import { NextFunction, Request, Response } from 'express';
import Usuario from '../models/usuario';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY || 'Thobokholt123'; // ⚠️ Mejor usar dotenv

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      res.status(404).json({ msg: 'Usuario no encontrado' });
      return;
    }

    const validPassword = bcrypt.compareSync(password, usuario.getDataValue('password'));

    if (!validPassword) {
      res.status(400).json({ msg: 'Contraseña incorrecta' });
      return;
    }

    const token = jwt.sign({ id: usuario.getDataValue('id') }, SECRET_KEY, {
      expiresIn: '2h',
    });

    res.json({
      status: 'ok',
      msg: 'Login exitoso',
      token,
    });
  } catch (err) {
    res.status(500).json({ msg: 'Error en el login', error: err });
  }
};

export const logout = async (_req: Request, res: Response) => {
  // JWT es stateless, así que el logout lo maneja el cliente borrando el token
    res.json({ 
        status: 'ok',
        msg: 'Logout exitoso' 
    });
};
