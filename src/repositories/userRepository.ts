import pool from '../config/db';
import { User } from '../interface/usersInterface';

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0] || null;
};

export const createUser = async (name: string, email: string, hashedPassword: string): Promise<User> => {
  const result = await pool.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
    [name, email, hashedPassword]
  );
  return result.rows[0];
};

export const getAllUsers = async (): Promise<User[]> => {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
};

export const getUserById = async (id: number): Promise<User | null> => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const deleteUserById = async (id: number): Promise<boolean> => {
  const result = await pool.query('DELETE FROM users WHERE id = $1', [id]);
  return result.rowCount !== null && result.rowCount > 0;
};
