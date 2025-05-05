import { Request, Response } from 'express';
import { SkillService } from '../services/skillService';
import { SkillRepository } from '../repositories/skillRepository';

const skillRepository = new SkillRepository();
const skillService = new SkillService(skillRepository);

// Create a skill
export const create = async (req: Request, res: Response): Promise<void> => {
  const { skill_name }: { skill_name: string } = req.body;

  try {
    const newSkill = await skillService.createSkill({ skill_name });
    res.status(201).json({
      message: "Skill created",
      skill: newSkill
    });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Update a skill
export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedSkill = await skillService.updateSkill(Number(req.params.id), {
      skill_name: req.body.skill_name
    });

    if (!updatedSkill) {
      res.status(404).json({ message: 'Skill not found' });
      return;
    }

    res.status(200).json({
      message: 'Skill updated',
      skill: updatedSkill
    });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

// Get all skills
export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const skills = await skillService.getAllSkills();
    res.status(200).json({
      message: 'Skills retrieved',
      skills: skills
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// Get skill by ID
export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const skill = await skillService.getSkillById(id);

    if (!skill) {
      res.status(404).json({ message: 'Skill not found' });
      return;
    }

    res.status(200).json({
      message: 'Skill retrieved',
      skill: skill
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
  
};
export const remove = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await skillService.deleteSkill(id);
  
      if (!deleted) {
        res.status(404).json({ message: 'Skill not found' });
        return;
      }
  
      res.status(200).json({
        message: 'Skill deleted successfully',
      });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  };
