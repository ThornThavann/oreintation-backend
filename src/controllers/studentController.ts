import { Request, Response } from 'express';
import { StudentService } from '../services/studentService';

// Get total student counts by school
export const getSchool = async (_req: Request, res: Response) => {
  try {
    const counts = await StudentService.countAllBySchool();
    res.json(counts);
  } catch (error) {
    console.error('Error fetching school count:', error);
    res.status(500).json({ message: 'Failed to get student counts', error });
  }
};

// Get total student counts by year
export const getStudentsByYear = async (_req: Request, res: Response) => {
  try {
    const result = await StudentService.countStudentsByYear();
    res.status(200).json({
      message: 'Students counted by year successfully',
      data: result
    });
  } catch (error) {
    console.error('Error fetching students by year:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const getMostPopularSkillByYear = async (_req: Request, res: Response) => {
  try {
    const result = await StudentService.countMostPopularSkillByYear();
    res.status(200).json({
      message: "Most popular skill by year fetched successfully",
      data: result
    });
  } catch (error) {
    console.error("Error fetching most popular skill by year:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};