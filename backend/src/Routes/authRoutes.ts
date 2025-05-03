import { PrismaClient } from "../../database/generated/prisma";
import { Router } from 'express'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { signToken } from '../utils/jwt'
import { authMiddleware } from "../middleware/middleware";


const router = Router()
const prisma = new PrismaClient()

dotenv.config()

router.post('/register', async (req, res) => {
    const { email, username, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
        const newUser = await prisma.user.create({
            data: { email, username, password: hashedPassword }
        })
        res.status(201).json(newUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "error while creating User" })
    }

})

router.post('/login', async (req: any, res: any) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: { email },
    })

    if (!user) return res.status(404).json({ error: "user not found" })

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(401).json({ error: "invalid password" })

    const token = signToken({ userId: user.id })

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: "/"
    })

    res.status(200).json({ massage: 'Login Successfully' })
})

router.get('/me', authMiddleware, async (req:any, res:any) => {
    try {
        const user = await prisma.user.findUnique({
            where: {id: req.userId},
            select: {id: true, email: true}
        })

        if(!user) return res.status(404).json({massage: "user not found"})
        
        res.json({user})
    } catch (error) {
        res.status(500).json({massage: 'server error'})
    }
})

router.post('/logout', authMiddleware, (req, res) => {
    console.log(req.cookies)
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
        sameSite:'lax',
    })
    res.json({ massage: "logged out successfully" })    
})


export default router