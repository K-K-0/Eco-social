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
        res.status(401).json({ error: "unauthorized" });
        return;
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token, "All");
        console.log("Decoded token:", decode);
        // @ts-ignore
        req.userId = decode.userId;
        next();
    }
    catch (error) {
        res.status(401).json({ error: "invalid token" });
    }
};
exports.authMiddleware = authMiddleware;
