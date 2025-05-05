// import { Request, Response } from 'express';
// import { Skill } from '../interface/skillsInterface';
// import pool from '../config/db';
// export const create = async (req: Request, res: Response) => {
//     const { skill_name} = req.body;
  
//     try {
 
//       const result = await pool.query(
//         'INSERT INTO users (skill_name) VALUES ($1) RETURNING *',
//         [ skill_name]
//       );
//       const user: Skill = result.rows[0];
  
//       res.status(201).json({ message: 'Registration successful', user });
//     } catch (err) {
//       res.status(500).json({ message: 'User already have' });
//     }
//   };