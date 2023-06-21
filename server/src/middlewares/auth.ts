import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from './../models/user';
import crypto from 'crypto';

const SECRET_KEY: string = process.env.SECRET_KEY || crypto.randomBytes(64).toString('hex');

interface AuthRequest extends Request {
  user?: IUser;
}

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const authHeaders = req.headers['authorization'];
  if (!authHeaders) {
    res.sendStatus(403);
    return;
  }

  const token = authHeaders.split(' ')[1];

  try {
    const { _id } = jwt.verify(token, SECRET_KEY) as { _id: string };
    const user: IUser | null = await User.findOne({ _id });
    if (!user) {
      res.sendStatus(401);
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
};

export default authMiddleware;
