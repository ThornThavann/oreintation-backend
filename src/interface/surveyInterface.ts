export interface Survey {
  skill_id: any;
  grand: any;
  student: {
    full_name: string;
  };
  age: number;
  gender_id: number;
  school_id: number;
  questions: {
    question_id: number;
    rating: number;
  }[];
}
