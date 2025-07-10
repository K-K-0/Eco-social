import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Augmenting Request type to include `userId`
declare global {
    namespace Express {
        interface Request {
            userId?: number;
        }
    }
}

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({ error: 'unauthorized' });
        return;
    }

    try {
        const decoded = jwt.verify(token, 'All') as { userId: number };
        console.log('Decoded token:', decoded);
        req.userId = decoded.userId
        next();
    } catch (error) {
        console.error('JWT error:', error);
        res.status(401).json({ error: 'invalid token' });
        return
    }
};
