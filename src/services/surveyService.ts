import { SurveyService } from '../interface/surveyInterface';
import { CreateSurveyInput, Survey } from '../interface/surveyInterface';
import surveyRepository from '../repositories/surveyRepository';

const surveyService: SurveyService = {
  async getAllSurveys(): Promise<Survey[]> {
    return await surveyRepository.findAll();
  },

  async getSurveyById(id: number): Promise<Survey> {
    const survey = await surveyRepository.findById(id);
    if (!survey) throw new Error('Survey not found');
    return survey;
  },

  async createSurvey(input: CreateSurveyInput): Promise<{ surveyId: number; studentId: number }> {
    const survey = await surveyRepository.create();
    const student = await surveyRepository.insertStudent(input.student, survey.id);
    await surveyRepository.insertSurveyQuestions(survey.id, input.questions, student.id!);
    return { surveyId: survey.id, studentId: student.id! };
  },

  async updateSurvey(id: number, data: Partial<Survey>): Promise<Survey | null> {
    return await surveyRepository.update(id, data);
  },

  async deleteSurvey(id: number): Promise<boolean> {
    return await surveyRepository.delete(id);
  },

  // Just add this method as a normal method of the object
  async getStudentSkillRatingSummary(studentId: number) {
    return await surveyRepository.getStudentSkillRatings(studentId);
  }
};

export default surveyService;
