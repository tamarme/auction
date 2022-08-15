import { Request, Response, NextFunction } from 'express';
import HttpException from '../exceptions/http.exception'; 

function errorMiddleware(
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = error.status || 500;
  const message = error.message || 'something went wrong';
  res.status(status).send({
    status,
    message,
  });
}

export default errorMiddleware;
