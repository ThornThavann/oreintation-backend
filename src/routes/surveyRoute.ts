import express from 'express';
import * as surveyController from "../controllers/surveyController"
import { getStudentSkillRatingSummary } from '../controllers/surveyController';
import { authenticateToken } from '../Middleware/authMiddleware';
const router = express.Router();

// Helper to wrap async route handlers
const asyncHandler = (fn: any) => (req: any, res: any, next: any) =>
  Promise.resolve(fn(req, res, next)).catch(next);

router.post('/surveys',authenticateToken, asyncHandler(surveyController.createSurvey));
router.get('/students/:studentId/skill-rating-summary',authenticateToken, asyncHandler(surveyController.getStudentSkillRatingSummary));

export default router;