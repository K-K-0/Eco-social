import { Router } from "express"
import { PrismaClient } from "../../database/generated/prisma"


const routes = Router()
const prisma = new PrismaClient()


routes.get('/', async (req, res) => {
    const post = await prisma.post.findMany({
        include: {
            user: { select: { username: true, avatarUrl: true }},
            like: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    res.json(post)
})

export default routes