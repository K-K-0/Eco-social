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
router.post('/location', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { lat, lng } = req.body;
    if (typeof lat !== "number" || typeof lng !== "number") {
        return res.status(400).json({ error: "Invalid coordinates" });
    }
    try {
        yield prisma.user.update({
            where: { id: userId },
            data: { lat, lng }
        });
        res.json({ success: true });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
}));
exports.default = router;
