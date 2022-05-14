import { Router } from 'express';

import { validateProducts } from '../middlewares/checkOutMiddleware.js';
import { validateToken } from "../middlewares/tokenMiddleware.js";
import { checkOut } from "../controllers/checkOutController.js";

const checkOutRouter = Router();

checkOutRouter.post("/sale", validateToken, validateProducts, checkOut);

export default checkOutRouter;