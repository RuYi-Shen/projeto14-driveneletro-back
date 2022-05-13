import db from "../db.js";

import { productSchema } from "../schemas/productSchema.js";

export async function validateProducts(req, res, next) {
  const { boughtProducts } = req.body;

  try {
    const products = await db.collection("products").find({}).toArray();
    const productsList = products.map((product) => product._id);
    
    boughtProducts.forEach((product) => {
        productSchema.validate(product);

        if (!productsList.includes(product.productId)) {
            throw new Error(`Product ${product.product} not found.`);
        }
    });

    next();
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
        res.status(400).send(error.details.map((e) => e.message));
    } else {
        res.status(500).send(error.message);
    }
  }
}
