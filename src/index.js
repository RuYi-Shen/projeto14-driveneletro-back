import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from './routes/authRouter.js';
import getProductsRouter from "./routes/getProductsRouter.js";
import shoppingCartRouter from "./routes/shoppingCartRouter.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(json());

app.use(authRouter);

app.use(getProductsRouter);

app.use(shoppingCartRouter);

// ABAIXO TESTE E ROTA USADA PARA PREENCHER db.products

// app.post("/products", async (req, res) => {
//   console.log("tá pegando");
//   try {
//     console.log(req.body)
//     await db.collection("products").insertOne(req.body);
//     // await db.collection("products").deleteOne({product: req.body.product});
    
//     res.sendStatus(200);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// })

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
})