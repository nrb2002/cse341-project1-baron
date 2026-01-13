const { MongoClient } = require("mongodb");

//MongoDB Atlas connection string
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

let collection;

async function connectDB() {
  await client.connect();
  const db = client.db("professionalDB");
  collection = db.collection("professional");
  console.log("Connected to MongoDB Atlas");
}

function getCollection() {
  return collection;
}

module.exports = {
  connectDB,
  getCollection
};
