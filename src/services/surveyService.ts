

import pool from '../config/db'; 
import * as surveyRepository from '../repositories/surveyRepository';
const createSurvey = async (
  student: { full_name: string; gender_id: number; school_id: number; grade: number },
  questions: any[]
) => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Insert the survey and get the surveyId
    const surveyId = await surveyRepository.insertSurvey(client);
    
    // Insert the student and get the studentId
    const studentId = await surveyRepository.insertStudent(student, surveyId, client);

    // Insert the questions associated with the survey
    await surveyRepository.insertSurveyQuestions(surveyId, questions, studentId, client);

    await client.query('COMMIT');

    return { surveyId, studentId };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};


export default createSurvey;
