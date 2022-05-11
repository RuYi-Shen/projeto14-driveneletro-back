import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let db = null;
const mongoClient = new MongoClient(process.env.MONGO_URI);
try {
    await mongoClient.connect();
    db = mongoClient.db(process.env.DATABASE);
    console.log("Connected to the DataBase!");
} catch (error) {
    console.log("Couldn't connect to the DataBase!", error);
}

export default db;