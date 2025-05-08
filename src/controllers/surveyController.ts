import { Request, Response } from 'express';
import * as surveyService from '../services/surveyService';
import { fetchSurveyStats } from "../services/surveyService";

export const createSurvey = async (req: Request, res: Response) => {
  try {
    const survey = await surveyService.createSurvey(req.body);
    res.status(201).json(survey);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create survey' });
  }
};

export const getSurveys = async (_req: Request, res: Response) => {
  try {
    const surveys = await surveyService.getSurveys();
    res.status(200).json(surveys);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch surveys' });
  }
};
export function createSurveyController(arg0: string, createSurveyController: any) {
    throw new Error('Function not implemented.');
}



export const getSurveyStats = async (req: Request, res: Response) => {
  try {
    const data = await fetchSurveyStats();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getSurveyStats:", error); // Add this
    res.status(500).json({ message: "Error fetching survey stats" });
  }
};

