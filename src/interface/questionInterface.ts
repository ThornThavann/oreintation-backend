export interface Question {
  id: number;
  skill_id: number;
  question: string;
}

export type QuestionWithoutId = Omit<Question, 'id'>;

export interface IQuestionRepository{
  findAll(): Promise<Question[]>;
  findById(id: number): Promise<Question | null>;
  create(questionData: QuestionWithoutId): Promise<Question>;
  update(id: number, questionData: QuestionWithoutId): Promise<Question | null>;
  delete(id: number): Promise<boolean>;
}

export interface IQuestionService {
  getAllQuestions(): Promise<Question[]>;
  getQuestionById(id: number): Promise<Question | null>;
  createQuestion(questionData: QuestionWithoutId): Promise<Question>;
  updateQuestion(id: number, questionData: QuestionWithoutId): Promise<Question | null>;
  deleteQuestion(id: number): Promise<boolean>;
}