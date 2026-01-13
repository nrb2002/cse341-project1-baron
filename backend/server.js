require("dotenv").config();
const express = require("express");
const cors = require("cors");
const professionalRoutes = require("./routes/professionalRoutes");
const { connectDB } = require("./db/mongo");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

connectDB().then(() => {
  console.log("MongoDB connected, starting server...");
  app.use("/", professionalRoutes);

  app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
  });
}).catch(err => {
  console.error("❌ Failed to connect to MongoDB:", err);
});
