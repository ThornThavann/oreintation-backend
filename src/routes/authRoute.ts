/// src/routes/authRoutes.ts
import { Router } from 'express';
import * as authController from '../controllers/authController';

const router = Router();

// Route protected by verifyAdmin middleware
router.post('/register', authController.register);

// Route for login, not protected by verifyAdmin
router.post('/login', authController.login);

export default router;
