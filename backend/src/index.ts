import { PrismaClient } from "../database/generated/prisma";
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import authRoutes from './Routes/authRoutes'
import postRoutes from './Routes/postRoutes'

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
app.use('/api/posts', postRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`server on running ${PORT}`);
})

