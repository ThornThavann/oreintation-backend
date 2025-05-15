import { Request, Response } from 'express';
import { registerService, loginService } from '../services/authService';

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const { user, token } = await registerService(name, email, password);
    res.status(201).json({ message: 'Registration successful', user, token });
  } catch (err) {
    res.status(500).json({ error: 'user already have' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await loginService(email, password);
    res.status(200).json({ message: 'Login successful', user, token });
  } catch (err) {
    res.status(401).json({ error: (err as Error).message });
  }
};
