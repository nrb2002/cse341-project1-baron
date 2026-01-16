require("dotenv").config();
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

async function test() {
  try {
    await client.connect();
    console.log("Connected to Atlas");
    await client.close();
  } catch (err) {
    console.error("❌ Connection failed:", err);
  }
}

test();
