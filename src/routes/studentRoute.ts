import { Router } from 'express';
import { getMostPopularSkillByYear, getSchool, getStudentsByYear } from '../controllers/studentController';

const router = Router();

router.get('/school-count', getSchool);
router.get('/year-count', getStudentsByYear);
router.get('/skill/most-popular-by-year', getMostPopularSkillByYear);

export default router;
