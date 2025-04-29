import { Router } from "express"
import { PrismaClient } from "../../database/generated/prisma"
import { authMiddleware } from "../middleware/middleware"

const routes = Router()
const prisma = new PrismaClient()

routes.post('/create', authMiddleware, async (req:any, res:any) => {
    const { title, content } = req.body
    const userId = req.userId

    try {
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                userId
            }
        })

        res.status(201).json({ massage: 'Post created' })
    } catch (error) {
        res.status(500).json({ error: 'error while creating post' })
        console.log(error)
    }
})

routes.get('/', authMiddleware, async (req, res) => {
    const post = await prisma.post.findMany()

    res.json(post)
})

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
