import { Router } from 'express';
import * as UserController from '../controllers/usersController';
import { authenticateToken } from '../Middleware/authMiddleware'; // Import the authentication middleware
const router = Router();

router.get('/',authenticateToken ,UserController.getAllUsers);
router.get('/:id',authenticateToken, UserController.getUserById);
router.post('/',authenticateToken, UserController.createUser);
router.delete('/:id',authenticateToken, UserController.deleteUser);

export default router;
