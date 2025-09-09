import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error("DB Connection Failed:", error.message);
  }
};

export default connectDB;
