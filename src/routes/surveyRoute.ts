import express from 'express';
import surveyController from '../controllers/surveyController';

const router = express.Router();

// POST route should call the createSurvey method of the controller
router.post('/create', surveyController.createSurvey);

export default router;
