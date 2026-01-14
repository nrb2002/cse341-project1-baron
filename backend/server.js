require("dotenv").config();
const express = require("express");
const cors = require("cors");

const router = require("./routes");

const { connectDB } = require("./db/mongo");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors()); //controls origin access
app.use(express.json());

connectDB().then(() => {
  console.log("MongoDB connected, starting server...");

  app.use('/', router); //Get default route

  app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
  });
}).catch(err => {
  console.error("Failed to connect to MongoDB:", err);
});
