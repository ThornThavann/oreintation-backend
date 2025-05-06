import db from '../config/db';
import { Question, QuestionWithoutId } from '../interface/questionInterface';

export class QuestionRepository {


  // Fetch all question
  async findAll(): Promise<Question[]> {
    const result = await db.query('SELECT * FROM question');
    return result.rows;
  }

  // Fetch question by ID
  async findById(id: number): Promise<Question | null> {
    const result = await db.query('SELECT * FROM question WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  // Create a new question
  async create(questionData: QuestionWithoutId): Promise<Question> {
    const result = await db.query(
      'INSERT INTO question ( skill_id, question) VALUES ($1, $2) RETURNING *',
      [ questionData.skill_id, questionData.question]
    );
    return result.rows[0];
  }

  // Update question by ID
  async update(id: number, questionData: QuestionWithoutId): Promise<Question | null> {
    const result = await db.query(
      'UPDATE question SET  skill_id = $1,  question =$2  WHERE id = $3 RETURNING *',
      [ questionData.skill_id, questionData.question , id]
    );
    return result.rows[0] || null;
  }

  // Delete question by ID
  async delete(id: number): Promise<boolean> {
    const result = await db.query('DELETE FROM question WHERE id = $1 RETURNING *', [id]);
    return result.rows.length > 0; 
  }
}
