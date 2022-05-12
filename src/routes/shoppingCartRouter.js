import { Router } from "express";
import { getShoppingCart } from "./../controllers/shoppingCartController.js";
import { validateToken } from "./../middlewares/tokenMiddleware.js";

const shoppingCartRouter = Router();

shoppingCartRouter.use(validateToken);

shoppingCartRouter.get("/shoppingcart", getShoppingCart);

// shoppingCartRouter.post("/shoppingcart", );

export default shoppingCartRouter;