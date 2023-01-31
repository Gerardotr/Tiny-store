import { ROLES } from '../models/Role';
import { Request, Response, NextFunction } from 'express';
export const checkRolesExisted = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.roles) {
    for (let index = 0; index < req.body.roles.length; index++) {
      console.log(req.body.roles[index]);
      if (!ROLES.includes(req.body.roles[index])) {
        return res
          .status(400)
          .json({ message: `Role ${req.body.roles[index]} does not exist` });
      }
    }
  }
  next();
};
