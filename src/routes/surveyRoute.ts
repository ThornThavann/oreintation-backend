import express from 'express';
import * as surveyController from '../controllers/surveyController';

const router = express.Router();

router.post('/survey', surveyController.createSurvey);
router.get('/survey', surveyController.getSurveys);

export default router;
