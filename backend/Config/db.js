import mongoose from "mongoose";

async function connectDB() {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log(con.connection.host);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
}

export default connectDB;
