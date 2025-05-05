// src/services/skillService.ts
import { SkillRepository } from '../repositories/skillRepository';
import { Skill, SkillWithoutId } from '../interface/skillsInterface';

export class SkillService {
  repository: any;
  constructor(private skillRepository: SkillRepository) {}

  // Get all skills
  async getAllSkills(): Promise<Skill[]> {
    return this.skillRepository.findAll();
  }

  // Get skill by ID
  async getSkillById(id: number): Promise<Skill | null> {
    return this.skillRepository.findById(id);
  }

  // Create new skill
  async createSkill(skillData: SkillWithoutId): Promise<Skill> {
    return this.skillRepository.create(skillData);
  }

  // Update skill
  async updateSkill(id: number, skillData: SkillWithoutId): Promise<Skill | null> {
    return this.skillRepository.update(id, skillData);
  }
  async deleteSkill(id: number): Promise<boolean> {
    return this.skillRepository.delete(id);
  }
}
