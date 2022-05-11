import { Router } from 'express';
import { signUp } from '../controllers/authcontroller.js';

import { validateSignUp, verifyUser } from '../middlewares/authmiddleware.js';

const authRouter = Router();

authRouter.post("/signup", validateSignUp, verifyUser, signUp);

export default authRouter;