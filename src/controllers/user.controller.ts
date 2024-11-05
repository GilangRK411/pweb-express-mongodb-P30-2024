// src/controllers/user.controller.ts
import { Request, Response, RequestHandler } from 'express';
import User from '../model/user.model';

// Helper function to send error response
const sendErrorResponse = (res: Response, statusCode: number, message: string): void => {
    res.status(statusCode).json({ status: "error", message });
};

export const register: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { username, password, email }: { username: string; password: string; email?: string } = req.body;

    try {
        if (!username || !password) {
            sendErrorResponse(res, 400, 'Username and password are required');
            return;
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            sendErrorResponse(res, 409, 'User already exists');
            return;
        }

        const user = new User({ username, email });
        user.password = await user.hashPassword(password);
        await user.save();

        res.status(201).json({
            status: "success",
            message: "User registered successfully",
            data: {
                id: user._id,
                username: user.username
            }
        });
    } catch (error) {
        console.error("Registration error:", error);
        sendErrorResponse(res, 500, 'Failed to register user due to server error');
    }
};

export const login: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { username, password }: { username: string; password: string } = req.body;

    try {
        if (!username || !password) {
            sendErrorResponse(res, 400, 'Username and password are required');
            return;
        }

        const user = await User.findOne({ username });
        if (!user) {
            sendErrorResponse(res, 404, 'User not found');
            return;
        }

        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) {
            sendErrorResponse(res, 401, 'Incorrect password');
            return;
        }

        // Send success response without token
        res.status(200).json({
            status: "success",
            message: "Login successful",
            data: {
                id: user._id,
                username: user.username
            }
        });
    } catch (error) {
        console.error("Login error:", error);
        sendErrorResponse(res, 500, 'Failed to login due to server error');
    }
};
