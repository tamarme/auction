import jwt from 'jsonwebtoken';
import User from '../modules/user/user.interface';
import Token from './interfaces/token.interface';

export const createToken = (user: User) => {
  return jwt.sign(
    { id: user.id },
    String(process.env.JWT_SECRET) as jwt.Secret,
    {
      expiresIn: '1d',
    }
  );
};

export const verifyToken = async (
  token: string
): Promise<jwt.VerifyErrors | Token> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      String(process.env.JWT_SECRET) as jwt.Secret,
      (err, payload) => {
        if (err) reject(err);
        resolve(payload as Token);
      }
    );
  });
};
