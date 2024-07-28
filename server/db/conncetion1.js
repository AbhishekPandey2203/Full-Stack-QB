import mongoose from "mongoose";

const connectWithMongoose = async () => {
  //using mongodbconnect
  const MONGO_URL = process.env.MONGO_URL;
  // console.log(MONGO_URL);
  try {
    const connectionInsatnce = await mongoose.connect(MONGO_URL);
    console.log("Connection succesfull+", connectionInsatnce.connection.host);
  } catch (error) {
    console.log(error);
  }
};

export { connectWithMongoose };
