import "./services/config/envConfig.js";

import { connectDB } from "./services/config/db.js";
import "./services/config/redis.js"; // establishes the Redis connection
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((error) => {
    console.log("Database connection failed:", error);
  });
