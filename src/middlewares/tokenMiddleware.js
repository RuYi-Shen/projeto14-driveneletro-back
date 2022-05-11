import db from "./../db.js";

export async function validateToken(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();
    if (!token) return res.status(404).send("Token not found!");
    try {
        const session = await db.collection("sessions").findOne({ token });
        if (!session) return res.status(404).send("Session not found!");

        const user = await db.collection("users").findOne({ _id: session.userId });
        if (!user) return res.status(404).send("User not found!");

        const userShoppingCart = await db.collection("shoppingCarts").findOne({ userId: session.userId });
        if (!userShoppingCart) return res.status(404).send("User Shopping Cart not found!");

        res.locals.session = session;
        res.locals.user = user;
        res.locals.userShoppingCart = userShoppingCart;

        next();
    } catch (error) {
        console.log("Error on Token validation.", error);
        res.status(500).send("Error on Token validation.");
    }
}