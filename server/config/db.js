import mongoose from "mongoose";

export const connectDB = async () => {
  
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    // console.log(connectionInstance.connection.host);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  }
};
