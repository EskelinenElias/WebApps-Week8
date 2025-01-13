import mongoose from "mongoose";

async function connectToDB(address: string) {
  try {
    const connection = await mongoose.connect(address);
    return;
  } catch (error) {
    console.error(error)
    throw new Error(`Failed to connect to database at ${address}`); 
  }
};

export default connectToDB;
