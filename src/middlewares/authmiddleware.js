import db from "../db.js";
import bcrypt from "bcrypt";

import { signUpSchema } from "../schemas/authschema.js";

export async function validateSignUp(req, res, next) {
  const user = req.body;
  try {
    await signUpSchema.validateAsync(user, { abortEarly: false });
    next();
  } catch (error) {
    console.log(error);
    res.status(400).send(error.details.map((e) => e.message));
  }
}


export async function verifyUser(req, res, next) {
  const user = req.body;
  try {
    const userFromDb = await db
      .collection("users")
      .findOne({ email: user.email });
    if (userFromDb) {
      return res.status(409).send("User already exists");
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}
