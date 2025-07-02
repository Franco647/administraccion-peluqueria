// middlewares/validar-jwt.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'Thobokholt123';

export const validarJWT = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ msg: 'Token no proporcionado' });
    return; // importante para evitar seguir ejecutando
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    (req as any).usuario = decoded;
    next(); // pasa al siguiente middleware
  } catch (err) {
    res.status(401).json({ msg: 'Token inválido' });
  }
};
