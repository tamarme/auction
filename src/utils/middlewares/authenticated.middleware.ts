import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../token';
import UserModel from '../../modules/user/user.model';
import HttpException from '../exceptions/http.exception';
import jwt from 'jsonwebtoken';

export async function authenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith('Bearer ')) {
    return next(new HttpException(401, 'Unauthorized'));
  }

  const accessToken = bearer.split('Bearer ')[1].trim();
  try {
    const payload = await verifyToken(accessToken);
    if (payload instanceof jwt.JsonWebTokenError) {
      return next(new HttpException(401, 'Unauthorized'));
    }
    const user = await UserModel.findById(payload.id)
      .select('-password')
      .exec();

    if (!user) {
      return next(new HttpException(401, 'Unauthorized'));
    }

    req.user = user;
    return next();
  } catch (error: any) {
    return next(new HttpException(401, error.message));
  }
}
