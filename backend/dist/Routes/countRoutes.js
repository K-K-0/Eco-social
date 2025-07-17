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
const routes = (0, express_1.Router)();
const prisma = new prisma_1.PrismaClient();
routes.get('/stats', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const followerCount = yield prisma.user.count({
            where: {
                userFollowing: {
                    some: {
                        id: userId
                    }
                }
            }
        });
        const followingCount = yield prisma.user.count({
            where: {
                userFollowers: {
                    some: {
                        id: userId
                    }
                }
            }
        });
        const postCount = yield prisma.post.count({
            where: {
                userId
            }
        });
        res.json({ followerCount, followingCount, postCount });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch user stats" });
    }
}));
exports.default = routes;
