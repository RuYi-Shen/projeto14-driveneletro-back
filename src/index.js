import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from './routes/authRouter.js';
import getProductsRouter from "./routes/getProductsRouter.js";
import shoppingCartRouter from "./routes/shoppingCartRouter.js";
import checkOutRouter from "./routes/checkOutRouter.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(json());

app.use(authRouter);

app.use(getProductsRouter);

app.use(shoppingCartRouter);

app.use(checkOutRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
})