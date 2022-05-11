import db from "./../db.js";

export async function getProducts(req, res) {
    try {
        const productsList = await db.collection("products").find().toArray();
        res.send(productsList);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}