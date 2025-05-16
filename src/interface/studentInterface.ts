export interface Student {
    id: number;
    full_name: string;
    gender_id: number;
    school_id: number;
    grade: number;
    created_at: string;
  }
  
  export type StudentWithoutId = Omit<Student, 'id' | 'created_at'>;
  
  export interface StudentsByYear {
    year: number;
    total_students: number;
  }
  export interface SkillMostPopular {
    year: string;     // or number, but string is fine for JSON
    skill: string;
    student_count: number;
  }
  
  export interface StudentRepository {
    countAllBySchool(): Promise<{ school_id: number; student_count: number }[]>;  
    countStudentsByYear(): Promise<StudentsByYear[]>;
    countSkillsByYear(): Promise<SkillMostPopular[]>;

  }
  
  export interface StudentService {
    countAllBySchool(): Promise<{ school_id: number; student_count: number }[]>;  
    countStudentsByYear(): Promise<StudentsByYear[]>;
    countSkillsByYear(): Promise<SkillMostPopular[]>;

  }
  