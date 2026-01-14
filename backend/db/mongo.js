const { MongoClient } = require("mongodb");


const uri = process.env.MONGO_URI; //MongoDB Atlas connection string saved .env file

const dbName = process.env.DB_NAME; //MongoDB Atlas db name saved in .env file

const client = new MongoClient(uri);

let collection;

async function connectDB() {
  await client.connect();
  const db = client.db(dbName);
  collection = db.collection("contacts"); //Collection from MongoDB in Atlas
  console.log("Connected to MongoDB Atlas");
}

function getCollection() {
  return collection;
}

module.exports = {
  connectDB,
  getCollection
};
