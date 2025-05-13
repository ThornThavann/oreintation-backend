

import { Request, Response } from 'express';
import { StudentService } from '../services/studentService';

export const getschool = async (_req: Request, res: Response) => {
  try {
    const counts = await StudentService.countAllBySchool();
    res.json(counts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get student counts', error });
  }
};
