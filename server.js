const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// Root info endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Product API is running",
    endpoints: [
      "POST   /api/products",
      "GET    /api/products?page=1&limit=10",
      "GET    /api/products/:id",
      "PUT    /api/products/:id",
      "DELETE /api/products/:id",
    ],
  });
});

app.use("/api/products", require("./routes/productRoutes"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Atlas Connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));