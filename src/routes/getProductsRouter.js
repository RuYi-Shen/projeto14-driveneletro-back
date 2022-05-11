import { Router } from "express";

import { getProducts } from "../controllers/getProductsController.js";
import { validateToken } from "../middlewares/tokenMiddleware.js";

const getProductsRouter = Router();

getProductsRouter.use(validateToken);

getProductsRouter.get("/products", getProducts);

export default getProductsRouter;