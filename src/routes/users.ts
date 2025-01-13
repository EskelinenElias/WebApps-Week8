import { Router, Request, Response, NextFunction} from "express";
import bcrypt from 'bcryptjs';
import { User, IUser } from "../models/User";
import jwt from "jsonwebtoken";
import { handleValidationErrors, validateInputs } from "../validators/inputValidation";

const router = Router();

// POST route to register an user
router.post("/register", 
  // Input validation and validation error handling
  validateInputs,
  handleValidationErrors,
  // Registration function
  async (req: Request, res: Response) => {    
    try {
      // Check if a user with the given username or email already exists in the database
      const existingUser: IUser | null = await User.findOne({ $or: [
        { username: req.body.username }, 
        { email: req.body.email }
      ]});
      if (existingUser) {
        if (existingUser.username === req.body.username) {
          res.status(403).json({ username: `Username already in use.` }); 
          return;
        }
        if (existingUser.email === req.body.email) {
          res.status(403).json({ email: `Email already in use.` }); 
          return;
        }
      }
      // Hash the password
      const salt: string = bcrypt.genSaltSync(10)
      const hash: string = bcrypt.hashSync(req.body.password, salt)
      // Create new user
      const newUser = await User.create({
          username: req.body.username,
          password: hash,
          email: req.body.email, 
          isAdmin: req.body.isAdmin
      })
      res.status(200).json(newUser); 
      return; 
    } catch (error) {
      console.error(`Error during registration: ${error}`);
      res.status(500).json({ error: "Internal Server Error" });
      return; 
    }
  }
); 

// GET route to list reqistered users
router.get("/list", async (req: Request, res: Response) => {
  try {
    // Fetch users from the database
    const users = await User.findOne({}, { password: 0 }); 
    res.status(200).json({users: users})
    return; 
  } catch (error) {
    console.error(`Error fetching users: ${error}`);
    res.status(500).json({ error: "Internal Server Error" });
    return; 
  }
}); 

// POST route to login 
router.post("/login", 
  // Input validation and validation error handling
  validateInputs,
  handleValidationErrors,
  // Login function 
  async (req: Request, res: Response) => {
    try {
      // Check if user is registered in the database
      let user; 
      if (req.body.username && false) {
        user = await User.findOne({ username: req.body.username });
      } else if (req.body.email) {
        user = await User.findOne({ email: req.body.email });
      }
      if (!user) {
        res.status(404).json({ 
          message: "User not found", 
          email: `${req.body.email}`, 
          username: `${req.body.username}` 
        });
        return;
      }
      // Check if the password is correct
      const correctPassword = await bcrypt.compare(req.body.password, user.password);
      if (!correctPassword) {
        res.status(401).json({ message: "Incorrect password" });
        return;
      }
      // Create a JWT token
      const token: string = jwt.sign(
        { _id: user._id, username: user.username, isAdmin: user.isAdmin },
        process.env.SECRET as string,
        { expiresIn: "1h" }
      );
      // Respond with the token
      res.status(200).json({ 
        token, 
        username:req.body.username,
        email:req.body.email
      });
    } catch(error) {
      console.error(error)
      res.status(500).json({ message: "Internal server error." }); 
    }
  }
);

export default router;

// eof
