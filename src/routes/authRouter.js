import { Router } from 'express';

import { signUp, signIn, signOut } from '../controllers/authController.js';
import { validateSignUp, verifyUser, validateSignIn, validateUser } from '../middlewares/authMiddleware.js';
import { validateToken } from '../middlewares/tokenMiddleware.js';

const authRouter = Router();

authRouter.post("/signup", validateSignUp, verifyUser, signUp);
authRouter.post("/signin", validateSignIn, validateUser, signIn);
authRouter.delete("/signout", validateToken, signOut);

export default authRouter;