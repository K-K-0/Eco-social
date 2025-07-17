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
const routes = (0, express_1.Router)();
routes.get("/", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const userId = req.userId
    try {
        const organizations = yield prisma.organizations.findMany({
            include: {
                Followers: {
                    select: {
                        id: true
                    }
                }
            }
        });
        res.json(organizations);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch organizations" });
    }
}));
routes.post('/register', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, latitude, longitude, description, Address } = req.body;
    const userId = req.userId;
    if (!name || !latitude || !longitude) {
        return res.status(400).json({ massage: "Something missing" });
    }
    const organizations = yield prisma.organizations.create({
        data: {
            name,
            description,
            latitude,
            longitude,
            Address,
            submittedBy: userId
        }
    });
    res.status(201).json({ organizations });
}));
routes.get('/verified', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orgs = yield prisma.organizations.findMany({
        where: { verified: true }
    });
    res.json({ orgs });
}));
routes.get('/unverified', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orgs = yield prisma.organizations.findMany({
        where: { verified: false }
    });
    res.json({ orgs });
}));
routes.post('/verify/:id', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orgId = parseInt(req.params.id);
    try {
        yield prisma.organizations.update({
            where: { id: orgId },
            data: { verified: true },
        });
        res.json({ message: 'Organization verified' });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to verify org' });
    }
}));
routes.post('orgs/:id', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("RAW params:", req.params);
    console.log("req.params.id:", req.params.id);
    console.log("req.query:", req.query);
    const orgId = parseInt(req.params.id);
    const userId = req.userId;
    console.log(userId);
    console.log(req.params);
    if (isNaN(orgId)) {
        return res.status(400).json({ error: "Invalid organization ID" });
    }
    const follow = yield prisma.followOrg.create({
        data: {
            user: { connect: { id: userId } },
            Organizations: { connect: { id: orgId } }
        }
    });
    res.json({ follow });
}));
routes.delete('org/:id', middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orgId = parseInt(req.params.id);
    const userId = req.userId;
    const unfollow = yield prisma.followOrg.delete({
        where: {
            userId_orgId: {
                userId, orgId
            }
        }
    });
    res.json({ unfollow });
}));
exports.default = routes;
