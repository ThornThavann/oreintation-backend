// export interface Survey {
//   skill_id: any;
//   grade:any;
//   student: {
//     full_name: string;
//   };
//   gender_id: number;
//   school_id: number;
//   questions: {
//     question_id: number;
//     rating: number;
//   }[];
// }
export interface Survey {
  full_name: string;
  school_id: number;
  gender_id: number;
  grade: number;
  questions: {
    question_id: number;
    skill_id: number;
    rating: number;
  }[];
}
