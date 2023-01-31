import jwt from 'jsonwebtoken';
import User from '../models/Role';
import { Request, Response, NextFunction } from 'express';
export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: any = req.headers['x-access-token'];
    if (!token) {
      return res
        .status(400)
        .json({ reLogin: true, message: 'No Token provider' });
    }
    const decoded: any = jwt.verify(token, process.env['TOKEN_SECRET']!);
    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });
    if (!user) {
      return res.status(400).json({ reLogin: true, message: 'No user found' });
    }
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      console.log('entro');
      return res.status(401).json({
        ok: false,
        message: 'Token expirado'
      });
    }
    return res.status(400).json({
      ok: false,
      reLogin: true,
      message: 'Token invalido'
    });
  }
};

export const validarJwtToRefresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: any = req.headers['x-access-token'];
  if (token) {
    try {
      const user: any = jwt.verify(token, process.env['TOKEN_SECRET']!, {
        ignoreExpiration: true
      });
      req.userId = user.id;
      next();
    } catch (err) {
      return res.status(400).json({
        ok: false,
        reLogin: true,
        message: 'Token invalido'
      });
    }
  } else {
    return res.status(400).json({
      ok: false,
      reLogin: true,
      message: 'Token invalido'
    });
  }
};

