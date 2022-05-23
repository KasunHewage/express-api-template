import mongoose from "mongoose";

const initMongoConnection = async () => {
  try {
    const dbURL: any = process.env.DATABASE;
    await mongoose.connect(dbURL);
    console.log("Database connected!");
  } catch (error) {
    console.error("Initialize mongo error!", error);
    process.exit(0);
  }
};

export default initMongoConnection;
