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

app.use(cors({
    origin: ['eco-social.vercel.app',
        'eco-social-k-k-0s-projects.vercel.app',
        'eco-social-git-main-k-k-0s-projects.vercel.app',
        'eco-social-jz0u6qw4k-k-k-0s-projects.vercel.app'
        
        ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use(cookieParser())
app.use(express.json())


app.use('/api/auth', authRoutes)
app.use('/api/posts',postRoutes)
app.use('/api',Tree)
app.use(profileRoutes)
app.use(followRoutes)
app.use(feedRoutes)
app.use(countRoutes)
app.use("/api/eco-orgs", ecoOrganizations)
app.use(setLocation)


const PORT = Number(process.env.PORT) || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});

console.log("🔍 Railway PORT:", process.env.PORT);


