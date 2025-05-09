
import { Router } from 'express';
import * as studentController from '../controllers/studentController'; 

const router = Router();

router.get('/:id', studentController.getschool);          

export default router;