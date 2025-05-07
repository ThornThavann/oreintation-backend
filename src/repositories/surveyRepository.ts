import db from '../config/db';
import { Survey } from '../interface/surveyInterface';

export const insertStudent = async (
    full_name: string,
    gender_id: number,
    school_id: number,
    age: number
  ) => {
    const result = await db.query(
      `INSERT INTO student (full_name, gender_id, school_id, age)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [full_name, gender_id, school_id, age]
    );
    return result.rows[0].id;
  };
  
  export const insertSurvey = async (
    student_id: number
  ) => {
    const result = await db.query(
      `INSERT INTO surveys (student_id, created_at)
       VALUES ($1, NOW())
       RETURNING id`,
      [student_id]
    );
    return result.rows[0].id;
  };
  
  export const insertSurveyQuestion = async (
    survey_id: number,
    question_id: number,
    rating: number
  ) => {
    await db.query(
      `INSERT INTO survey_questions (survey_id, question_id, rating)
       VALUES ($1, $2, $3)`,
      [survey_id, question_id, rating]
    );
  };
  

export const getAllSurveys = async () => {
    try {
        const result = await db.query(`
            SELECT 
              s.id AS survey_id,
           
              s.created_at, 
              stu.id AS student_id, 
              stu.full_name, 
              stu.age, 
              stu.gender_id, 
              g.gender_name, 
              sch.id AS school_id, 
              sch.name AS school_name, 
              q.id AS question_id, 
              q.text AS question, 
              sq.rating AS question_rating, 
              sk.id AS skill_id, 
              sk.skill_name AS skill
            FROM surveys s
            JOIN student stu ON stu.id = s.student_id
            JOIN school sch ON stu.school_id = sch.id
            LEFT JOIN gender g ON stu.gender_id = g.id
            JOIN survey_questions sq ON sq.survey_id = s.id
            JOIN question q ON q.id = sq.question_id
            JOIN skills sk ON q.skill_id = sk.id
            ORDER BY s.id DESC
          `);
          
  
      // If no surveys are found
      if (result.rows.length === 0) {
        throw new Error('No surveys found');
      }
  
      // Map the result to the desired structure
      const surveys = result.rows.map(surveyData => ({
        survey: {
          id: surveyData.survey_id,
          rating: surveyData.question_rating,  // Mapping question's rating
          created_at: surveyData.created_at,
          student: {
            id: surveyData.student_id,
            full_name: surveyData.full_name,
            age: surveyData.age,
            gender_name: surveyData.gender_name,  // gender_name from gender table
            school: {
              id: surveyData.school_id,
              name: surveyData.school_name
            }
          },
          question: {
            id: surveyData.question_id,
            question: surveyData.question,
            rating: surveyData.question_rating,  // Added rating to question
            skill: {
              id: surveyData.skill_id,
              name: surveyData.skill
            }
          }
        }
      }));
  
      return surveys;
  
    } catch (error) {
      console.error('Error fetching surveys:', error);
      throw new Error('Failed to fetch surveys');
    }
};




