import { Router } from 'express';
import { signUp, signIn } from '../controllers/authController.js';

import { validateSignUp, verifyUser, validateSignIn, validateUser } from '../middlewares/authMiddleware.js';

const authRouter = Router();

authRouter.post("/signup", validateSignUp, verifyUser, signUp);
authRouter.post("/signin", validateSignIn, validateUser, signIn);

export default authRouter;