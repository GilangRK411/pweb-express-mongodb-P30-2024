import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const secretKey = process.env.JWT_SECRET || 'your-default-secret';

export const authenticateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const authHeader = req.headers['authorization'];
    

    if (!authHeader) {
        res.status(401).json({ message: 'Access denied. No token provided.' });
        return;
    }
    const token = authHeader.split(' ')[1];
    
    if (!token) {
        res.status(401).json({ message: 'Access denied. No token provided.' });
        return;
    }

    try {
        const decoded = jwt.verify(token, secretKey) as { userId: string };

        const user = await mongoose.connection.db.collection('users').findOne({ _id: new mongoose.Types.ObjectId(decoded.userId) });

        if (!user) {
            res.status(403).json({ message: 'Invalid token: user not found.' });
            return;
        }

        next();
    } catch (err) {
        console.error("Token verification failed:", err);
        res.status(403).json({ message: 'Invalid or expired token.' });
    }
};
