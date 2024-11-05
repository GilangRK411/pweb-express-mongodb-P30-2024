import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = '@#I)_!#)_#!#!#L:MlmolnopJO!@P:"<:2p1i3012i-034i1!!!#DD';

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string }; // Adjust this according to the structure of your token
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  // Extract the token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1];
  
  // If no token is found, respond with a 401 Unauthorized status
  if (!token) {
    return res.status(401).json({ message: 'Authorization token is required.' });
  }

  // Verify the token using the secret key
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    // If token is invalid, respond with a 403 Forbidden status
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }

    // Store the decoded user information in the request object for later use
    req.user = { userId: (decoded as jwt.JwtPayload).userId }; // Cast decoded to JwtPayload to access userId
    next(); // Proceed to the next middleware or route handler
  });
};
