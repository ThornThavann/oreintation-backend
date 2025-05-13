
import { StudentRepository } from '../repositories/studentRepository';

export const StudentService = {
  countAllBySchool: async () => {
    return StudentRepository.countAllBySchool();
  },
};
