require("./config/envConfig.js");

const { connectDB } = require("./config/db.js");
const { app } = require("./app.js");

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.log("Database connection failed:", error);
  });