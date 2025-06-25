import { register, verifyEmail, login, logout } from '../controllers/user.controllers.js';
import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middlewares.js';

const router = Router();

router.route('/register').post(register)
router.route('/verify-email').get(verifyEmail)
router.route('/login').post(login)

// Secured Route
router.route('/logout').post(verifyJWT, logout)

const userRouter = router;

export default userRouter;