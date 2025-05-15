import pool from '../config/db';
import {
  Survey,
  Student,
  StudentWithoutId,
  QuestionResponse,
  SkillRatingSummary,
} from '../interface/surveyInterface';
import { SurveyRepository } from '../interface/surveyInterface';

const surveyRepository: SurveyRepository = {
  async findAll(): Promise<Survey[]> {
    const result = await pool.query('SELECT * FROM public.survey');
    return result.rows;
  },

  async findById(id: number): Promise<Survey | null> {
    const result = await pool.query('SELECT * FROM public.survey WHERE id = $1', [id]);
    return result.rows[0] || null;
  },

  async create(): Promise<Survey> {
    const result = await pool.query(
      'INSERT INTO public.survey (create_at) VALUES (CURRENT_TIMESTAMP) RETURNING *'
    );
    return result.rows[0];
  },

  async update(id: number, data: Partial<Survey>): Promise<Survey | null> {
    const result = await pool.query(
      'UPDATE public.survey SET create_at = $1 WHERE id = $2 RETURNING *',
      [data.created_at, id]
    );
    return result.rows[0] || null;
  },

  async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM public.survey WHERE id = $1', [id]);
    return result.rowCount !== null && result.rowCount > 0;
  },

  async insertStudent(student, surveyId): Promise<Student> {
    const result = await pool.query(
      `INSERT INTO public.student (
        full_name, gender_id, school_id, grade, create_at, survey_id
      ) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, $5)
      RETURNING *`,
      [student.full_name, student.gender_id, student.school_id, student.grade, surveyId]
    );
    return result.rows[0];
  },

  async insertSurveyQuestions(surveyId, questions, studentId): Promise<void> {
    for (const question of questions) {
      const skillResult = await pool.query(
        'SELECT skill_id FROM public.question WHERE id = $1',
        [question.question_id]
      );
      const skill_id = skillResult.rows[0]?.skill_id;

      await pool.query(
        'INSERT INTO public.survey_question (survey_id, question_id, rating, skill_id, student_id) VALUES ($1, $2, $3, $4, $5)',
        [surveyId, question.question_id, question.rating, skill_id, studentId]
      );
    }
  },
  getStudentSkillRatings: function (studentId: number): Promise<SkillRatingSummary[]> {
    throw new Error('Function not implemented.');
  }
};

export const getStudentSkillRatings = async (studentId: number) => {
  const result = await pool.query(
    `
    SELECT 
      s.full_name AS student_name,
      sk.skill_name,
      SUM(sq.rating) AS total_rating
    FROM 
      survey_question sq
    JOIN 
      student s ON sq.student_id = s.id
    JOIN 
      question q ON sq.question_id = q.id
    JOIN 
      skill sk ON q.skill_id = sk.id
    WHERE 
      s.id = $1
    GROUP BY 
      s.full_name, sk.skill_name
    ORDER BY 
      total_rating DESC
    `,
    [studentId]
  );

  return result.rows;
};


export default surveyRepository;
