
import surveyService from '../services/surveyService';
import { Request, Response } from 'express';

class SurveyController {
  async createSurvey(req: Request, res: Response) {

    try {
      const { student, questions } = req.body;
      const result = await surveyService(student, questions);

      res.status(201).json({ message: 'Survey created successfully', data: result });
    } catch (error) {
      console.error('Error creating survey:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export default new SurveyController(); 