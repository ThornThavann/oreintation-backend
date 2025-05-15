import pool from "../config/db"; 

export const insertSurvey = async (client: unknown) => {
  const result = await pool.query(
    "INSERT INTO public.survey(create_at) VALUES (CURRENT_TIMESTAMP) RETURNING id"
  );
  return result.rows[0].id;
};

// Update this to accept camelCase instead of snake_case
export const insertStudent = async (
  student: { full_name: string; gender_id: number; school_id: number; grade: number },
  surveyId: number,
  client: any
) => {
  console.log("Received student input:", student);

  // Use the correct field names based on your incoming object
  const result = await pool.query(
    `INSERT INTO public.student (
      full_name, gender_id, school_id, grade, create_at, survey_id
    ) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, $5)
    RETURNING id`,
    [
      student.full_name,     // Full name
      student.gender_id,     // Gender ID (correct field name)
      student.school_id,     // School ID (correct field name)
      student.grade,         // Grade
      surveyId,              // Survey ID
    ]
  );

  // Log the data to verify everything is inserted correctly
  console.log("Full Name:", student.full_name);
  console.log("Gender ID:", student.gender_id);  // Correct field
  console.log("School ID:", student.school_id);  // Correct field
  console.log("Grade:", student.grade);

  // Return the ID of the newly inserted student
  return result.rows[0].id;
};







export const insertSurveyQuestions = async (
  surveyId: number,
  questions: any[],
  studentId: number,
  client: unknown
) => {
  for (const question of questions) {
    const skillResult = await pool.query(
      "SELECT skill_id FROM public.question WHERE id = $1",
      [question.question_id]
    );

    const skill_id = skillResult.rows[0]?.skill_id;
    await pool.query(
      "INSERT INTO public.survey_question(survey_id, question_id, rating, skill_id, student_id) VALUES ($1, $2, $3, $4, $5)",
      [surveyId, question.question_id, question.rating, skill_id, studentId]
      
    );
    console.log("Full Name:", question.surveyId);
    console.log("Gender ID:", question.question_id);  // Correct field
    console.log("School ID:", question.rating);  // Correct field
    console.log("Grade:", question.skill_id);
    console.log("Grade:", question.studentId);

  
  }
};
