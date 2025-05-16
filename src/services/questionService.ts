// src/services/questionService.ts
import { QuestionRepository } from '../repositories/questionRepository';
import { IQuestionService, Question, QuestionWithoutId } from '../interface/questionInterface';

export class QuestionService implements IQuestionService {
  questionRepo: any;
  constructor(private questionRepository: QuestionRepository) {}

  // Get all questions
  async getAllQuestions(): Promise<Question[]> {
    return this.questionRepository.findAll();
  }

  // Get question by ID
  async getQuestionById(id: number) {
    return await this.questionRepository.findById(id);
  }


  // Create a new question
  async createQuestion(questionData: QuestionWithoutId): Promise<Question> {
    return this.questionRepository.create(questionData);
  }

  // Update question
  async updateQuestion(id: number, questionData: QuestionWithoutId): Promise<Question | null> {
    return this.questionRepository.update(id, questionData);
  }

  // Delete question
  async deleteQuestion(id: number): Promise<boolean> {
    return this.questionRepository.delete(id);
  }
}
