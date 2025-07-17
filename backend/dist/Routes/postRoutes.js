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
const express_1 = require("express");
const prisma_1 = require("../../database/generated/prisma");
const middleware_1 = require("../middleware/middleware");
const upload_1 = require("../middleware/upload");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const routes = (0, express_1.Router)();
const prisma = new prisma_1.PrismaClient();
const streamUpload = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.default.uploader.upload_stream({
            resource_type: 'auto',
            folder: 'eco_posts'
        }, (error, result) => {
            if (error)
                return reject(error);
            resolve(result);
        });
        stream.end(buffer);
    });
};
routes.post('/create', middleware_1.authMiddleware, upload_1.upload.single("media"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        const { content, title } = req.body;
        const userId = req.userId;
        console.log("userId", userId);
        if (!(file === null || file === void 0 ? void 0 : file.buffer) || !content || !title) {
            return res.status(400).json({ massage: "All field are required" });
        }
        const uploadResult = yield streamUpload(file.buffer);
        const post = yield prisma.post.create({
            data: {
                title,
                content,
                mediaUrl: uploadResult.secure_url,
                mediaType: uploadResult.resource_type,
                userId: userId
            }
        });
        res.status(201).json({ post });
    }
    catch (error) {
        res.status(500).json({ massage: "server error" });
        console.error(error);
    }
}));
routes.post('/:postId/like', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = parseInt(req.params.postId);
    const userId = req.userId;
    try {
        const exist = yield prisma.like.findUnique({
            where: {
                userId_postId: { userId, postId }
            }
        });
        if (exist) {
            yield prisma.like.delete({ where: { id: exist.id } });
            return res.json({ message: "unlike" });
        }
        else {
            yield prisma.like.create({
                data: { postId, userId }
            });
        }
        const likeCount = yield prisma.like.count({
            where: { postId: Number(postId) }
        });
        return res.status(200).json({ message: exist ? 'Unliked' : 'Liked', likeCount });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}));
routes.post('/:postId/like', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    try {
        const updatedPost = yield prisma.post.update({
            where: { id: postId },
            data: {
                likes: { increment: 1 }
            }
        });
        return res.status(200).json({ message: 'Post liked', post: updatedPost });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}));
routes.post('/:postId/comment', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, postId } = req.body;
    if (!content)
        return res.status(400).json({ error: "comment is empty" });
    try {
        const comment = yield prisma.comment.create({
            data: {
                content,
                userId: req.userId,
                postId
            },
            include: {
                user: {
                    select: {
                        username: true,
                        avatarUrl: true
                    }
                }
            }
        });
        res.status(201).json({ message: "comment created", comment });
    }
    catch (error) {
        console.log(error);
    }
}));
routes.get('/:postId/comment', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = parseInt(req.params.postId);
    try {
        const comment = yield prisma.comment.findMany({
            where: { postId },
            include: {
                user: {
                    select: {
                        username: true,
                        avatarUrl: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        res.json({ comment });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "failed to fetch comments" });
    }
}));
exports.default = routes;
