import { Request, Response } from 'express';
import * as UserService from '../services/userService';
import { registerService } from '../services/authService';

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserService.getUsers();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const user = await UserService.getUser(id);
  if (user) res.json(user);
  else res.status(404).json({ message: 'User not found' });
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const deleted = await UserService.remove(id);
  if (deleted) res.json({ message: 'User deleted' });
  else res.status(404).json({ message: 'User not found' });
};
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const { user, token } = await UserService.create(name, email, password);
    res.status(201).json({ message: 'Registration successful', user, token });
  } catch (err) {
    res.status(500).json({ message: 'User have already' });
  }
};

