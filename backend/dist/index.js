"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../database/generated/prisma");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./Routes/authRoutes"));
const postRoutes_1 = __importDefault(require("./Routes/postRoutes"));
const profileRoutes_1 = __importDefault(require("./Routes/profileRoutes"));
const followRoutes_1 = __importDefault(require("./Routes/followRoutes"));
const feedRoute_1 = __importDefault(require("./Routes/feedRoute"));
const countRoutes_1 = __importDefault(require("./Routes/countRoutes"));
const ecoOrganizations_1 = __importDefault(require("./Routes/ecoOrganizations"));
const setLocation_1 = __importDefault(require("./Routes/setLocation"));
const tree_1 = __importDefault(require("./Routes/tree"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new prisma_1.PrismaClient();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ['https://eco-social.vercel.app',
        'https://eco-social-git-main-k-k-0s-projects.vercel.app',
        'https://eco-social-79gfu7mzs-k-k-0s-projects.vercel.app',
        'http://localhost:5173'],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use('/api/auth', authRoutes_1.default);
app.use('/api/posts', postRoutes_1.default);
app.use('/api', tree_1.default);
app.use(profileRoutes_1.default);
app.use(followRoutes_1.default);
app.use(feedRoute_1.default);
app.use(countRoutes_1.default);
app.use("/api/eco-orgs", ecoOrganizations_1.default);
app.use(setLocation_1.default);
app.listen(8080, '0.0.0.0', () => {
    console.log('server on running 8080');
});
