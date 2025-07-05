"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../../database/generated/prisma");
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jwt_1 = require("../utils/jwt");
const middleware_1 = require("../middleware/middleware");
const router = (0, express_1.Router)();
const prisma = new prisma_1.PrismaClient();
dotenv_1.default.config();
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, password } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        const newUser = yield prisma.user.create({
            data: { email, username, password: hashedPassword }
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "error while creating Userrr" });
    }
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield prisma.user.findUnique({
        where: { email },
    });
    if (!user)
        return res.status(404).json({ error: "user not found" });
    const validPassword = yield bcrypt_1.default.compare(password, user.password);
    if (!validPassword)
        return res.status(401).json({ error: "invalid password" });
    const token = (0, jwt_1.signToken)({ userId: user.id });
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/"
    });
    res.status(200).json({ massage: 'Login Successfully' });
}));
router.get('/me', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            where: { id: req.userId },
            select: { id: true, email: true }
        });
        if (!user)
            return res.status(404).json({ massage: "user not found" });
        res.json({ user });
    }
    catch (error) {
        res.status(500).json({ massage: 'server error' });
    }
}));
router.post('/logout', middleware_1.authMiddleware, (req, res) => {
    console.log(req.cookies);
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'lax',
    });
    res.json({ massage: "logged out successfully" });
});
exports.default = router;
