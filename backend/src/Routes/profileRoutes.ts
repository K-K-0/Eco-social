
import { Router } from "express";
import { PrismaClient } from "../../database/generated/prisma";
import { authMiddleware } from "../middleware/middleware";

const router = Router()
const prisma = new PrismaClient()

router.get('/profile/:userId', authMiddleware, async (req:any, res: any) => {
    const userId = parseInt(req.params.userId)

    try {
        const user = await prisma.user.findUnique({
            where: {id: userId},
            include: {
                posts: true,
                followers: true,
                following: true
            }
        })

        if(!user) {
            return res.status(404).json({massage: "User not found"})
        }

        res.json({
            id: user.id,
            username: user.username,
            email: user.email,
            postsCount: user.posts.length,
            followersCount: user.followers.length,
            followingCount: user.following.length,
            posts: user.posts
        })
    } catch (error) {
        console.error("Profile fetch error:", error)
        res.status(500).json({ error: "Failed to fetch profile" })
    }
})

export default router