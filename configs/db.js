import mongoose from "mongoose";
export default async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) return;
    await mongoose.connect(process.env.MONGO_URL);
    console.log("___connect to db successfully___");
  } catch (err) {
    console.log("connection faild:", err); // Log the actual error
  }
}
