import mongoose from "mongoose";
import dns from "dns";

// Use public DNS for Atlas SRV lookups (local 127.0.0.1 resolver is unreliable)
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI, {
      // Connection pool tuning for high-traffic workloads.
      maxPoolSize: Number(process.env.MONGO_MAX_POOL || 50),
      minPoolSize: Number(process.env.MONGO_MIN_POOL || 5),
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log("✅ Connected to MongoDB");
    return connectionInstance;
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export { connectDB };
