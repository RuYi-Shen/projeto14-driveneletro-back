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