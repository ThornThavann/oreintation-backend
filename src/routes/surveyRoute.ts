import express from 'express';
import * as surveyController from '../controllers/surveyController';
import { authenticateToken } from '../Middleware/authMiddleware'; 

const router = express.Router();

router.post('/survey', authenticateToken,surveyController.createSurvey);
router.get('/survey',authenticateToken, surveyController.getSurveys);
export default router;
