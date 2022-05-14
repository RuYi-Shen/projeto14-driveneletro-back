import sgMail from "@sendgrid/mail";

import db from "../db.js";

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export async function checkOut(req, res) {
  const { date, boughtProducts } = req.body;
  const { _id, name, email } = res.locals.user;
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
    await db.collection("shoppingCarts").updateOne({ userId }, { $set: { shoppingCart: [] } });

    const msg = {
      to: email,
      from: "masih.saldanha@gmail.com",
      subject: `Driven Eletro - Compra concluída!`,
      text: `Você gastou no total R$ ${totalPaid.toFixed(2).replace(".", ",")}.`,
      html: `<h1>Você gastou no total <strong>R$ ${totalPaid.toFixed(2).replace(".", ",")}</strong> nos seguintes produtos: </h1>
      ${boughtProducts.map(p => {
        return `<h2>- ${p.quantity} unidades de ${p.product} no valor de R$ ${p.value.toFixed(2).replace(".", ",")} totalizando R$ ${(p.value * p.quantity).toFixed(2).replace(".", ",")}.</h2>`
      })}`
    };

    await sgMail.send(msg)

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
