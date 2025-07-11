"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ error: 'unauthorized' });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, 'All');
        console.log('Decoded token:', decoded);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        console.error('JWT error:', error);
        res.status(401).json({ error: 'invalid token' });
        return;
    }
};
exports.authMiddleware = authMiddleware;
