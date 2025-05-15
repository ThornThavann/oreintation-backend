import express from 'express';
import * as surveyController from "../controllers/surveyController"
import { getStudentSkillRatingSummary } from '../controllers/surveyController';

const router = express.Router();

// Helper to wrap async route handlers
const asyncHandler = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post('/surveys', asyncHandler(surveyController.createSurvey));
router.get('/students/:studentId/skill-rating-summary', asyncHandler(surveyController.getStudentSkillRatingSummary));

export default router;