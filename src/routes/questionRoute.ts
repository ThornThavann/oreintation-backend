import { Router } from 'express';
import * as questionController from '../controllers/questionController'; 
import { authenticateToken } from '../Middleware/authMiddleware';  
const router = Router();


router.post('/',authenticateToken, questionController.create);
router.get('/getall',authenticateToken, questionController.getAll);
router.get('/:id',authenticateToken, questionController.getById);
router.patch('/update/:id',authenticateToken, questionController.update);
router.delete('/delete/:id', authenticateToken, questionController.remove); 


export default router;
