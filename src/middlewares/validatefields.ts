import    {validationResult}  from 'express-validator' ;
import { Request, Response, NextFunction } from 'express';
export const validateFields = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({
      ok: false,
      message: 'Some fields are required',
      errors: errores.mapped()
    });
  }

  next();
};
