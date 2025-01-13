import connectToDB from "./config/db";
import app from "./app";
import dotenv from "dotenv"; 

// Configure environment
dotenv.config(); 

// Configure server settings
const host: string = "127.0.0.1";
const port: number = 3000;

// Configure database settings
const dbAddress = "mongodb://127.0.0.1:27017/testdb";

// Connect to database
connectToDB(dbAddress).then(() => {
  console.log(`Connected to database at ${dbAddress}`); 
  
  // Start the server
  app.listen(port, () => {
    console.log(`Server running at http://${host}:${port}/`);
  });
}).catch((error) => {
  console.error(error);
}); 

// eof










