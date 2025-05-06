// src/controllers/questionController.ts
import { Request, Response } from 'express';
import { QuestionService } from '../services/questionService';
import { QuestionRepository } from '../repositories/questionRepository';

const questionRepository = new QuestionRepository();
const questionService = new QuestionService(questionRepository);

// Create a question
export const create = async (req: Request, res: Response): Promise<void> => {
  const { skill_id, question }: {  skill_id: number, question:string } = req.body;

  try {
    const newQuestion = await questionService.createQuestion({ skill_id, question });
    res.status(201).json({
      message: 'Question created',
      skill_id: skill_id,
     question: newQuestion,
      
    });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Update a question
export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedQuestion = await questionService.updateQuestion(Number(req.params.id), {

     skill_id: req.body.skill_id,
      question: req.body.question,
    });

    if (!updatedQuestion) {
      res.status(404).json({ message: 'Question not found' });
      return;
    }

    res.status(200).json({
      message: 'Question updated',
      question: updatedQuestion,
    });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Get all questions
export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const questions = await questionService.getAllQuestions();
    res.status(200).json({
      message: 'Questions retrieved',
      questions: questions,
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Get question by ID
export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const question = await questionService.getQuestionById(id);

    if (!question) {
      res.status(404).json({ message: 'Question not found' });
      return;
    }

    res.status(200).json({
      message: 'Question retrieved',
      question: question,
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Remove question
export const remove = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await questionService.deleteQuestion(id);

    if (!deleted) {
      res.status(404).json({ message: 'Question not found' });
      return;
    }

    res.status(200).json({
      message: 'Question deleted successfully',
      
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
