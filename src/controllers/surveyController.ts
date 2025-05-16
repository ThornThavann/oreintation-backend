import { Request, Response } from 'express';
import surveyService from '../services/surveyService';

export const createSurvey = async (req: Request, res: Response) => {
  try {
    const { student, questions } = req.body;
    const result = await surveyService.createSurvey({ student, questions });

    res.status(201).json({ message: 'Survey created successfully', data: result });
  } catch (error) {
    console.error('Error creating survey:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getStudentSkillRatingSummary = async (req: Request, res: Response) => {
  try {
    const studentId = Number(req.params.studentId);
    if (isNaN(studentId)) {
      return res.status(400).json({ message: 'Invalid student ID' });
    }

    const summary = await surveyService.getStudentSkillRatingSummary(studentId);
   return  res.status(200).json({ message: 'Skill rating summary fetched successfully', data: summary   });
  } catch (error) {
    console.error('Error fetching skill rating summary:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};