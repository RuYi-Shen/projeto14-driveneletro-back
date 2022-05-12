import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../db.js";

export async function signUp(req, res) {
  const user = req.body;

  try {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    delete user.passwordConfirmation;
    await db.collection("users").insertOne(user);
    let userFromDb = await db.collection("users").findOne({ email: user.email });
    let userId = userFromDb._id;
    await db.collection("shoppingCarts").insertOne({ userId, shoppingCart: [] });

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function signIn(req, res) {
  const { name, _id } = res.locals.user;

  try {
    const token = uuid();
    await db.collection("sessions").insertOne({
      token,
      userId: _id,
    });
    res.json({ token, name });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}



