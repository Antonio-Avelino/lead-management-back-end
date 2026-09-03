import mongoose from "mongoose";

export async function connectToDatabase(): Promise<void> {
  const uri = process.env.MONGO_URI ?? "mongodb://localhost:27017/lead-management";
  await mongoose.connect(uri);
  console.log("MongoDB connected");
}
