import { PrismaClient } from "../database/generated/prisma";
import express from 'express'
import cors from 'cors'
import { authMiddleware } from "./middleware/middleware";
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import authRoutes from './Routes/authRoutes'
import postRoutes from './Routes/postRoutes'
import profileRoutes from './Routes/profileRoutes'
import followRoutes from './Routes/followRoutes'
import feedRoutes from './Routes/feedRoute'
import countRoutes from './Routes/countRoutes'
import ecoOrganizations from './Routes/ecoOrganizations'
import setLocation from './Routes/setLocation'

dotenv.config()

const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/posts',postRoutes)
app.use(profileRoutes)
app.use(followRoutes)
app.use(feedRoutes)
app.use(countRoutes)
app.use("/api/eco-orgs", ecoOrganizations)
app.use(setLocation)


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server on running ${PORT}`);
})

