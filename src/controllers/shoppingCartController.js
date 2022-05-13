import db from "./../db.js";

export async function getShoppingCart(req, res) {
    const { userShoppingCart } = res.locals
    try {
        res.send(userShoppingCart.shoppingCart);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

// AQUI DEVE VIR O postShoppingCart
export async function postShoppingCart(req, res) {
    const { session } = res.locals;
    try {
        await db.collection("shoppingCarts").updateOne({ userId: session.userId },
            { $set: { shoppingCart: req.body } });
        res.status(201).send("Shopping Cart updated!");
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}