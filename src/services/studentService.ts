import { StudentRepository } from '../repositories/studentRepository'; // Adjust the path
import { SkillMostPopular, StudentsByYear } from '../interface/studentInterface'; // Adjust the path

export const StudentService = {
  countAllBySchool: async () => {
    return StudentRepository.countAllBySchool();
  },

  countStudentsByYear: async (): Promise<StudentsByYear[]> => {
    return StudentRepository.countStudentsByYear();
  },


  countMostPopularSkillByYear: async (): Promise<SkillMostPopular[]> => {
    return StudentRepository.countMostPopularSkillByYear();
  }
  
};
