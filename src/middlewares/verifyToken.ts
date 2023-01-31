import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import Role from '../models/Role';

export interface IPayload {
  _id: string;
  iat: number;
}

export const TokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('token');
    if (!token) return res.status(401).json('Access Denied');
    const payload = jwt.verify(
      token,
      process.env['TOKEN_SECRET'] || ''
    ) as IPayload;
    req.userId = payload._id;
    next();
  } catch (e) {
    res.status(400).send('Invalid Token');
  }
};

export const isManager = async (  req: Request,
  res: Response,
  next: NextFunction) => {
  const user = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: user!.roles } });
  for (let index = 0; index < roles.length; index++) {
    if (roles[index].name === 'Manager') {
      next();
      return;
    }
  }
  return res.status(403).json({ message: 'Require Manager Role' })

}

// export const isCustomer = async (req, res, next) => {
//   const user = await User.findById(req.userId);
//   const roles = await Role.find({ _id: { $in: user.roles } });
//   for (let index = 0; index < roles.length; index++) {
//     if (roles[index].name === 'Client') {
//       next();
//       return;
//     }
//   }
//   return res.status(403).json({ message: 'Require Client Role' })
// }

