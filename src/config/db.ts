import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (process.env.NODE_ENV === "test") {
      return;
    }

    const db = await mongoose.connect(process.env.MONGO_URI ?? "");
    console.log(`MongoDB Connected: ${db.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
