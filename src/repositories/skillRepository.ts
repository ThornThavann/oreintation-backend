// src/repositories/skillRepository.ts
import db from '../config/db';
import { Skill, SkillWithoutId } from '../interface/skillsInterface';

export class SkillRepository {
    skills: any;
  // Fetch all skills
  async findAll(): Promise<Skill[]> {
    const result = await db.query('SELECT * FROM skills');
    return result.rows;
  }

  // Fetch skill by ID
  async findById(id: number): Promise<Skill | null> {
    const result = await db.query('SELECT * FROM skills WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  // Create a new skill
  async create(skillData: SkillWithoutId): Promise<Skill> {
    const result = await db.query(
      'INSERT INTO skills (skill_name) VALUES ($1) RETURNING *',
      [skillData.skill_name]
    );
    return result.rows[0];
  }

  // Update skill by ID
  async update(id: number, skillData: SkillWithoutId): Promise<Skill | null> {
    const result = await db.query(
      'UPDATE skills SET skill_name = $1 WHERE id = $2 RETURNING *',
      [skillData.skill_name, id]
    );
    return result.rows[0] || null;
  }
  // Delete skill by ID
  async delete(id: number): Promise<boolean> {
    const result = await db.query('DELETE FROM skills WHERE id = $1 RETURNING *', [id]);
    return result.rows.length > 0; // If rows are returned, deletion was successful
  }
  
}
