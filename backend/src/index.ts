import { PrismaClient } from "../database/generated/prisma";
import express from 'express'
import cors from 'cors'
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
import  Tree  from './Routes/tree'

dotenv.config()

const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors({
    origin: ['https://eco-social.vercel.app',
        'https://eco-social-git-main-k-k-0s-projects.vercel.app',
        'https://eco-social-79gfu7mzs-k-k-0s-projects.vercel.app',
        'http://localhost:5173'],
    credentials: true,
}))
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/posts',postRoutes)
app.use('/api',Tree)
app.use(profileRoutes)
app.use(followRoutes)
app.use(feedRoutes)
app.use(countRoutes)
app.use("/api/eco-orgs", ecoOrganizations)
app.use(setLocation)




app.listen(8080, '0.0.0.0', () => {
    console.log('server on running 8080');
});
  
  

