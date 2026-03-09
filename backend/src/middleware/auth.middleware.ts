import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../types/express";

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized"});

        }

        const decode = jwt.verify(token, process.env.JWT_SECRET as string);

        req.user = decode as any;

        next();

    }  catch (error) {
        res.status(401).json({ message: "Invalid token"});
    }
};