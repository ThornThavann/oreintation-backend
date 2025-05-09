import pool from '../config/db'; // Adjust the import based on your project structure


export const StudentRepository = {
  countAllBySchool: async (): Promise<{ school_id: number; student_count: number }[]> => {
    const query = `
      SELECT school_id, COUNT(*) AS student_count
      FROM student
      GROUP BY school_id
    `;

    try {
      const result = await pool.query(query);
      return result.rows.map((row: { school_id: string; student_count: string; }) => ({
        school_id: parseInt(row.school_id, 10),
        student_count: parseInt(row.student_count, 10),
      }));
    } catch (error) {
      console.error('Error counting students by school:', error);
      throw error;
    }
  },
};
