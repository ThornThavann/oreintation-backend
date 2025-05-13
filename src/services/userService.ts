import * as UserRepository from '../repositories/userRepository';
import { User } from '../interface/usersInterface';
import pool from '../config/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const getUsers = async (): Promise<User[]> => {
  return await UserRepository.getAllUsers();
};

export const getUser = async (id: number): Promise<User | null> => {
  return await UserRepository.getUserById(id);
};

// export const create = async (name: string, email: string, password: string): Promise<User> => {
//   return await UserRepository.createUser(name, email, password);
// };

export const remove = async (id: number): Promise<boolean> => {
  return await UserRepository.deleteUserById(id);
};

export const create = async (name: string, email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );
  
    const user: User = result.rows[0];
  
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );
  
    return { user, token };
  };
  