// src/routes/skillsRoutes.ts
import { Router } from 'express';
import * as skillsController from '../controllers/skillsController';
import { authenticateToken } from '../Middleware/authMiddleware';  // Token authentication middleware

const router = Router();

// Define routes for skills
router.get('/all',authenticateToken, skillsController.getAll);               // Get all skills
router.get('/:id', authenticateToken, skillsController.getById);          // Get skill by ID
router.post('/new', authenticateToken, skillsController.create);   // Create a new skill
router.put('/:id', authenticateToken, skillsController.update); // Update skill by ID
router.delete('/:id', authenticateToken, skillsController.remove);

export default router;
