// Survey Model & Related Types

export interface Survey {
  id: number;
  created_at: string;
}

export type SurveyWithoutId = Omit<Survey, 'id' | 'created_at'>;

export interface Student {
  id?: number;
  full_name: string;
  gender_id: number;
  school_id: number;
  grade: number;
  survey_id?: number;
  created_at?: string;
}

export type StudentWithoutId = Omit<Student, 'id' | 'created_at'>;

export interface QuestionResponse {
  question_id: number;
  rating: number;
  skill_id?: number;
}

export interface CreateSurveyInput {
  student: StudentWithoutId;
  questions: QuestionResponse[];
}

export interface SkillRatingSummary {
  skill_name: string;
  total_rating: number;
}

// Repository Interface

export interface SurveyRepository {
  findAll(): Promise<Survey[]>;
  findById(id: number): Promise<Survey | null>;
  create(): Promise<Survey>;
  update(id: number, data: Partial<Survey>): Promise<Survey | null>;
  delete(id: number): Promise<boolean>;

  insertStudent(student: StudentWithoutId, surveyId: number): Promise<Student>;
  insertSurveyQuestions(
    surveyId: number,
    questions: QuestionResponse[],
    studentId: number
  ): Promise<void>;

  // New method for skill rating summary per student
  getStudentSkillRatings(studentId: number): Promise<SkillRatingSummary[]>;
  getStudentSkills(studentId: number): Promise<SkillRatingSummary[]>;
}

// Service Interface

export interface SurveyService {
  getAllSurveys(): Promise<Survey[]>;
  getSurveyById(id: number): Promise<Survey>;
  createSurvey(input: CreateSurveyInput): Promise<{ surveyId: number; studentId: number }>;
  updateSurvey(id: number, data: Partial<Survey>): Promise<Survey | null>;
  deleteSurvey(id: number): Promise<boolean>;

  // New method for service layer
  getStudentSkillRatingSummary(studentId: number): Promise<SkillRatingSummary[]>;
  getStudentSkill(studentId: number): Promise<SkillRatingSummary[]>;

}
