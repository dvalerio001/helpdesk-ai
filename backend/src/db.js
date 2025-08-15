import mongoose from "mongoose";

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/helpdesk_ai";

async function connectDB() {
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
  console.log("MongoDB connected");
}

export default connectDB;