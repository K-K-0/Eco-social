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
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../../database/generated/prisma");
const middleware_1 = require("../middleware/middleware");
const router = express_1.default.Router();
const prisma = new prisma_1.PrismaClient();
router.post('/plant', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { latitude, longitude, description, ImageUrl } = req.body;
    const userId = req.userId;
    try {
        const newTree = yield prisma.tree.create({
            data: {
                userId,
                latitude,
                longitude,
                description,
                ImageUrl
            }
        });
        res.json(newTree);
    }
    catch (error) {
        res.status(500).json({ error: 'Error while planting Tree' });
        console.error(error);
    }
}));
router.get('/', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trees = yield prisma.tree.findMany({
            include: {
                user: {
                    select: { id: true }
                }
            }
        });
        res.json(trees);
    }
    catch (error) {
        res.status(500).json({ error: 'error while fetching Trees' });
        console.error(error);
    }
}));
exports.default = router;
