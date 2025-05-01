import { Router } from "express"
import { PrismaClient } from "../../database/generated/prisma"
import { authMiddleware } from "../middleware/middleware"

const routes = Router()
const prisma = new PrismaClient()


routes.get('/stats', authMiddleware, async (req: any, res: any) => {
    const userId = req.userId

    try {
        const followerCount = await prisma.user.count({
            where: {
                following: {
                    some: {
                        id: userId
                    }
                }
            }
        })

        const followingCount = await prisma.user.count({
            where: {
                followers: {
                    some: {
                        id: userId
                    }
                }
            }
        })

        const postCount = await prisma.post.count({
            where: {
                userId
            }
        })

        res.json({followerCount, followingCount, postCount})

    } catch (error) {
        res.status(500).json({error: "Failed to fetch user stats"})
    }
})

export default routes
