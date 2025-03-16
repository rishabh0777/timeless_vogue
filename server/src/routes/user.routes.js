import { register, verifyEmail, login, logout } from '../controllers/user.controllers.js';
import { Router } from 'express';

const router = Router();

router.route('/register').post(register)
router.route('/verify-email').get(verifyEmail)
router.route('/login').post(login)
router.route('/logout').post(logout)

const userRouter = router;

export default userRouter;