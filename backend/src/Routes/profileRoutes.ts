
import { Router } from "express";
import { PrismaClient } from "../../database/generated/prisma";
import { authMiddleware } from "../middleware/middleware";

const router = Router()
const prisma = new PrismaClient()

router.get('/:userId', authMiddleware,  async (req:any, res: any) => {
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


router.get('/api/me', authMiddleware, async (req: any, res: any) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: {
                id: true,
                username: true,
                email: true,
                bio: true,
                avatarUrl: true,
                createdAt: true,
            },
        });

        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/update', authMiddleware, async (req: any, res: any) => {
    const { username, bio, avatarUrl, lat, lng } = req.body
    const update = await prisma.user.update({
        where: {id: req.userId},
        data: { username, bio, avatarUrl, lat, lng}
    })
})

export default router