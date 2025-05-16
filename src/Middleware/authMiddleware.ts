import { Request, Response, NextFunction } from 'express'; // ✅ You need this
import jwt from 'jsonwebtoken';
import { UserRole } from '../utils/enum';

//  Set up extended Request type
export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: UserRole;
    [key: string]: any;
  };
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Access denied. No token provided.' });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET as string;
    const decoded = jwt.verify(token, secret) as AuthRequest['user']; // ✅ Type it correctly
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
};
