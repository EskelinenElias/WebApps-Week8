import { Router } from "express";
import usersRouter from './users';
import topicsRouter from './topics'; 

// Create router
const router = Router();

// Add routes
router.use("/api/user", usersRouter);
router.use("/api", topicsRouter); 

export default router;

// eof









