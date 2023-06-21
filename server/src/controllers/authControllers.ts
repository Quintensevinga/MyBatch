import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUser } from './../models/user';
import crypto from 'crypto';
import mongoose from 'mongoose';

const SECRET_KEY: string = process.env.SECRET_KEY || crypto.randomBytes(64).toString('hex');

const registerHandler = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user: IUser | null = await User.findOne({ email });

    if (user) {
      res.status(409).json({ error: '409', message: 'User already exists' });
      return;
    }

    if (password === '') {
      throw new Error();
    }

    const hash: string = await bcrypt.hash(password, 10);

    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      email,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });

    console.log('New user before saving:', newUser);

    const savedUser: IUser = await newUser.save();

    console.log('User saved:', savedUser);
    
    const accessToken: string = jwt.sign({ _id: savedUser._id }, SECRET_KEY);

    res.status(201).json({ accessToken });
  } catch (error) {
    console.error('Error in registerHandler:', error);
    console.error((error as any).stack);
    res.status(400).json({ error, message: 'Could not create user' });
  }
};

const loginHandler = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ error: '401', message: 'Username or password is incorrect' });
      return;
    }

    const validatedPass: boolean = await bcrypt.compare(password, user.password);

    if (!validatedPass) {
      throw new Error();
    }

    const accessToken: string = jwt.sign({ _id: user._id }, SECRET_KEY);
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(401).json({ error: '401', message: 'Username or password is incorrect' });
  }
};

export { registerHandler, loginHandler };
