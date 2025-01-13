import express, { Express, Request, Response } from "express";
import path from "path";
import morgan from "morgan";
import router from "./routes";

// Initialize app
const app: Express = express();

// Add middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(morgan("dev"));

// Add routing
app.use("/", router);

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));

export default app;

// eof








