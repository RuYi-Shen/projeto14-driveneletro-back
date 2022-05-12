import db from "../db.js";

export async function checkOut(req, res) {
  const { date, boughtProducts } = req.body;
  const { _id, name } = res.locals.user;
  const userId = _id;

  let totalPaid = 0.0;
  boughtProducts.forEach((product) => {
    totalPaid += parseFloat(product.value) * parseFloat(product.quantity);
  });

  try {
    await db.collection("sales").insertOne({
        userId,
        name,
        date,
        totalPaid,
        boughtProducts
    });
    await db.collection("shoppingCarts").updateOne({ userId }, { $set: { boughtProducts: [] } });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
