import * as repository from '../repositories/surveyRepository';
import { Survey } from '../interface/surveyInterface';

export const createSurvey = async (body: Survey) => {
  try {
    // Insert the student and get the student_id
    const student_id = await repository.insertStudent(
      body.student.full_name,
      body.gender_id,
      body.school_id,
      body.age
    );

    // Insert the survey with student_id and get the survey_id
    const survey_id = await repository.insertSurvey(student_id);

    // Insert each survey question and link to the survey
    for (const question of body.questions) {
      await repository.insertSurveyQuestion(survey_id, question.question_id, question.rating);
    }

    // Get the student details (optional - to include in the response)
    const studentDetails = {
      full_name: body.student.full_name,
      age: body.age,
      gender_id: body.gender_id,
      school_id: body.school_id,
      grand: body.grand, // Assuming this value exists in the body
      questions: body.questions,
    };

    // Return the response in the desired format
    return {
      message: 'Survey created',
      survey: {
        id: survey_id,
        student: studentDetails,  // Include the student data in the response
      },
    };
  } catch (error) {
    console.error('Error creating survey:', error);
    throw new Error('Failed to create survey');
  }
};

export const getSurveys = async () => {
  return await repository.getAllSurveys();
};

