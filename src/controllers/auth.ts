import { Request, Response } from 'express';

import User, { IUser } from '../models/User';
import Role from '../models/Role';
import { signupValidation, signinValidation } from '../libs/joi';
import jwt from 'jsonwebtoken';
import {
  sendEmailChangePasswordConfirmation,
  sendEmailResetPassword
} from '../helpers/sendgrid';

export const signup = async (req: Request, res: Response) => {
  // Validation
  const { error } = signupValidation(req.body);
  if (error) return res.status(500).json(error.message);

  // Email Validation
  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists) return res.status(500).json('Email already exists');

  // Saving a new User
  try {
    const newUser: IUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      status: req.body.status,
      phone_number: req.body.phone_number,
      roles: req.body.roles
    });

    if (req.body.roles) {
      const foundRole = await Role.find({ name: { $in: req.body.roles } });
      newUser.roles = foundRole.map((role) => role._id.toString());
    } else {
      const role = await Role.findOne({ name: 'Client' });
      newUser.roles = [role!._id.toString()];
    }
    newUser.password = await newUser.encrypPassword(newUser.password);
    const savedUser = await newUser.save();

    const token: string = jwt.sign(
      { _id: savedUser._id },
      process.env['TOKEN_SECRET'] || '',
      {
        expiresIn: 60 * 60 * 24
      }
    );
    res.header('auth-token', token).json(savedUser);
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
};

export const signin = async (req: Request, res: Response) => {
  const { error } = signinValidation(req.body);
  if (error) return res.status(400).json(error.message);
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json('Email or Password is wrong');
  const correctPassword = await user.validatePassword(req.body.password);
  if (!correctPassword) return res.status(400).json('Invalid Password');

  // Create a Token
  const token: string = jwt.sign(
    { _id: user._id },
    process.env['TOKEN_SECRET'] || ''
  );
  res.header('auth-token', token).json(token);
};

export const profile = async (req: Request, res: Response) => {
  const user = await User.findById(req.userId, { password: 0 });
  if (!user) {
    return res.status(404).json('No User found');
  }
  res.json(user);
};

export const sendPasswordEmail = async (req: Request, res: Response) => {
  const { email } = req.query;

  User.findOne({ email })
    .then(async (userDB) => {
      if (userDB == null) {
        return res.status(400).json({
          ok: false,
          message: 'There is no user with that email.'
        });
      }

      const token: string = jwt.sign(
        { _id: userDB._id },
        process.env['TOKEN_SECRET'] || ''
      );

      await sendEmailResetPassword({ email, token });

      res.json({ ok: true, token });
    })
    .catch(() => {
      res.status(400).json({
        ok: false,
        message: 'something was wrong.'
      });
    });
};

export const updatePasswordUser = async (req: Request, res: Response) => {
  const userExists = await User.findOne({ _id: req.userId });
  if (!userExists) return res.status(500).json('User no found.');

  userExists.password = await userExists.encrypPassword(req.body.password);
  await userExists.save();
  await sendEmailChangePasswordConfirmation(userExists.email);
  res.json({ ok: true, message: 'Password updated' });
};
