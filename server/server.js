const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
  console.error("❌ MongoDB Connection Error");
  console.error("Name:", err.name);
  console.error("Message:", err.message);
  console.error("Code:", err.code);
  console.error("Full Error:", err);
});