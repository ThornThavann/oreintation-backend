export interface Skill {
    id: number;
    skill_name: string;
   
  }
export type SkillWithoutId = Omit<Skill, 'id'>;

export interface SkillRepository {
  findAll(): Promise<Skill[]>;
  findById(id: string): Promise<Skill | null>;
  create(skill_name: SkillWithoutId): Promise<Skill>;
  update(id: number, skillData: SkillWithoutId): Promise<Skill | null>;
  delete(id: number): Promise<boolean>; // Added delete method
}

export interface SkillService {
  getAllEvents(): Promise<Skill[]>;
  getSkillById(id: string): Promise<Skill>;
  createSkill(skill_name: SkillWithoutId): Promise<{ skill_name: Skill }>;
  deleteSkill(id: number): Promise<boolean>; // Added delete method
}

  