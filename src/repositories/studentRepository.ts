import pool from '../config/db'; // Adjust the import based on your project structure
import { SkillMostPopular, StudentsByYear } from '../interface/studentInterface'; // Make sure this path is correct

export const StudentRepository = {
  countAllBySchool: async (): Promise<{ school_id: number; student_count: number }[]> => {
    const query = `
      SELECT school_id, COUNT(*) AS student_count
      FROM student
      GROUP BY school_id
    `;

    try {
      const result = await pool.query(query);
      return result.rows.map((row: { school_id: string; student_count: string }) => ({
        school_id: parseInt(row.school_id, 10),
        student_count: parseInt(row.student_count, 10),
      }));
    } catch (error) {
      console.error('Error counting students by school:', error);
      throw error;
    }
  },

  countStudentsByYear: async (): Promise<StudentsByYear[]> => {
    try {
      const result = await pool.query(`
        SELECT 
          EXTRACT(YEAR FROM created_at) AS year,
          COUNT(*) AS total_students
        FROM student
        GROUP BY year
        ORDER BY year;
      `);
      return result.rows;
    } catch (error) {
      console.error('Error counting students by year:', error);
      throw error;
    }
  },

  
  async countMostPopularSkillByYear(): Promise<SkillMostPopular[]> {
    const query = `
     SELECT
  year,
  skills,
  student_count
FROM (
  SELECT
    EXTRACT(YEAR FROM s.created_at) AS year,
    sk.name AS skill,
    COUNT(DISTINCT sq.student_id) AS student_count,
    RANK() OVER (PARTITION BY EXTRACT(YEAR FROM s.created_at)
                 ORDER BY COUNT(DISTINCT sq.student_id) DESC) AS rank
  FROM survey_question sq
  JOIN student s ON sq.student_id = s.id
  JOIN skill sk ON sq.skill_id = sk.id
  GROUP BY year, sk.name
) ranked_skills
WHERE rank = 1
ORDER BY year;

    `;

    const result = await pool.query(query);
    return result.rows;
  }
  
}
