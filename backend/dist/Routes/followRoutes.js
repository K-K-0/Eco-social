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
const prisma = new prisma_1.PrismaClient();
const router = (0, express_1.Router)();
router.post('/follow/:userId', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUserId = req.body.userId;
    const targetUserId = parseInt(req.params.userId);
    if (currentUserId === targetUserId) {
        return res.status(400).json({ error: "You can't follow yourself" });
    }
    try {
        yield prisma.follow.create({
            data: {
                followerId: currentUserId,
                followingId: targetUserId
            }
        });
        return res.status(200).json({ message: "Followed successfully" });
    }
    catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ error: "Already following this user" });
        }
    }
    res.status(500).json({ error: "something went wrong" });
}));
router.delete('/unfollow/:userId', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUserId = req.body.userId;
    const targetUserId = parseInt(req.params.userId);
    try {
        yield prisma.follow.delete({
            where: {
                followerId_followingId: {
                    followerId: currentUserId,
                    followingId: targetUserId
                }
            }
        });
        return res.status(200).json({ massage: 'Unfollowed successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
}));
exports.default = router;
