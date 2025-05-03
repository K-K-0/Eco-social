import { Router } from "express";
import { PrismaClient } from "../../database/generated/prisma";
import { authMiddleware } from "../middleware/middleware";

const prisma = new PrismaClient()
const router = Router()

router.post('/follow/:userId', authMiddleware, async (req:any, res:any) => {
    const currentUserId = req.body.userId
    const targetUserId = parseInt(req.params.userId)

    if(currentUserId === targetUserId) {
        return res.status(400).json({error: "You can't follow yourself"})
    }

    try {
        await prisma.follow.create({
            data: {
                followerId: currentUserId,
                followingId: targetUserId
            }
        })

        return res.status(200).json({message: "Followed successfully"})
    } catch (error: any) {
        if (error.code === 'P2002') {
            return res.status(400).json({ error: "Already following this user" })
        }
    }

    res.status(500).json({error: "something went wrong"})
})

router.delete('/unfollow/:userId', authMiddleware, async (req:any, res:any) => {
    const currentUserId = req.body.userId
    const targetUserId = parseInt(req.params.userId)

    try {
        await prisma.follow.delete({
            where: {
                followerId_followingId: {
                    followerId: currentUserId,
                    followingId: targetUserId
                }
            }
        })

        return res.status(200).json({massage: 'Unfollowed successfully'})
    } catch (error) {
        res.status(500).json({error: 'Something went wrong'})
    }
})

export default router
