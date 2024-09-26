import mongoose from "mongoose";
// Connect to MongoDB
const connectToMongoDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGO_URI);
    if (connection) {
      console.log("Connected to MongoDB to ", connection.host);
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
export default connectToMongoDB;
