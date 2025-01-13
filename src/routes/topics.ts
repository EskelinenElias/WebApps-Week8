import { Router, Request, Response, NextFunction} from "express";
import bcrypt from 'bcryptjs';
import { User, IUser } from "../models/User";
import jwt from "jsonwebtoken";
import { validateReqistration, validateLogin, handleValidationErrors } from "../validators/inputValidation";
import { CustomRequest, authenticateUser, authenticateAdmin } from "../middleware/validateToken";
import { Topic, ITopic } from "../models/Topic";
import mongoose from "mongoose";

const router = Router();

// GET route to fetch all topics
router.get("/topics", async (req: Request, res: Response) => {
  try {
    // Fetch topics from the database
    const topics = await User.findOne({}, { password: 0 }); 
    res.status(200).json({ topics: topics }); 
    return; 
  } catch (error) {
    console.error(`Error fetching topics: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
    return; 
  }
}); 

// POST route to add new topic
router.post("/topic", 
  // Authentication as user
  authenticateUser, 
  // Function to add new topic
  async (req: CustomRequest, res: Response) => {
    // Parse request
    if (!req.user) {
      res.status(400).json({ message: "Access denied: missing token" }); 
      return; 
    }
    const { title, content } = req.body; 
    const username = req.user.username; 
    try {
      // Create a new topic
      const newTopic = await Topic.create({ title, content, username });
      res.status(200).json(newTopic);
    } catch(error) {
      // Error occurred
      console.error(error);
      res.status(500).json({ message: "Internal server error." });
    }
  }
); 

// DELETE route to delete a topic as an admin
router.delete("/topic/:id",
  // Authenticate as admin
  authenticateAdmin,
  // Function to delete a topic as an admin
  async (req: CustomRequest, res: Response) => {
    // Parse request
    const { id } = req.params;
    try {
      // Find topic by id and delete it
      const topic = await Topic.findByIdAndDelete(id); 
      if (!topic) {
        // Topic not found
        res.status(404).json({ message: "Topic not found." });
        return; 
      }
      // Topic deleted
      res.status(200).json({ message: "Topic deleted successfully." });
    } catch(error) {
      // Error occurred
      console.error(error); 
      res.status(500).json({ message: "Internal server error." });
    }
  }
); 

export default router; 

// eof