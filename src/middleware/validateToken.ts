import {Request, Response, NextFunction} from "express"
import jwt, {JwtPayload} from "jsonwebtoken"

interface CustomRequest extends Request {
  user?: JwtPayload;
}

function authenticateUser(req: CustomRequest, res: Response, next: NextFunction) {
  // Check token
  const token: string | undefined = req.header('authorization')?.split(" ")[1]
  if (!token) {
    res.status(401).json({ message: "Access denied, missing token" }); 
    return; 
  }
  try {
    const verified: JwtPayload = jwt.verify(token, process.env.SECRET as string) as JwtPayload
    req.user = verified
    next()
  } catch (error: any) {
    res.status(400).json({message: "Access denied, missing token"})
  }
}

function authenticateAdmin(req: CustomRequest, res: Response, next: NextFunction) {
  authenticateUser(req, res, () => {
    if (!req.user ||!req.user.isAdmin) {
      res.status(403).json({ message: "Access denied." });
      return; 
    }
    next(); 
  })
}

export { CustomRequest, authenticateUser, authenticateAdmin }; 