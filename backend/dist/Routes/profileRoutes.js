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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = require("../../database/generated/prisma");
const middleware_1 = require("../middleware/middleware");
const router = (0, express_1.Router)();
const prisma = new prisma_1.PrismaClient();
router.get('/:userId', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId);
    try {
        const user = yield prisma.user.findUnique({
            where: { id: userId },
            include: {
                posts: true,
                userFollowers: true,
                userFollowing: true
            }
        });
        if (!user) {
            return res.status(404).json({ massage: "User not found" });
        }
        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            postsCount: user.posts.length,
            followersCount: user.userFollowers.length,
            followingCount: user.userFollowing.length,
            posts: user.posts
        });
    }
    catch (error) {
        console.error("Profile fetch error:", error);
        res.status(500).json({ error: "Failed to fetch profile" });
    }
}));
router.get('/api/me', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findUnique({
            where: { id: req.userId },
            select: {
                id: true,
                username: true,
                email: true,
                bio: true,
                avatarUrl: true,
                createdAt: true,
            },
        });
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        res.json({ user });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}));
router.put('/update', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, bio, avatarUrl, lat, lng } = req.body;
    const update = yield prisma.user.update({
        where: { id: req.userId },
        data: { username, bio, avatarUrl, lat, lng }
    });
}));
exports.default = router;
