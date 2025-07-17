import  Express  from "express";
import { PrismaClient } from "../../database/generated/prisma";
import { authMiddleware } from "../middleware/middleware";


const router = Express.Router()
const prisma = new PrismaClient()

router.post('/plant', authMiddleware, async (req:any, res) => {
    const { latitude, longitude, description, ImageUrl } = req.body
    const userId = req.userId

    try {
        const newTree = await prisma.tree.create({
            data: {
                userId,
                latitude,
                longitude,
                description,
                ImageUrl
            }
        })
        res.json(newTree)
    } catch (error) {
        res.status(500).json({error: 'Error while planting Tree'})
        console.error(error)
    }
})


router.get('/', authMiddleware, async (req,res) => {
    try {
        const trees = await prisma.tree.findMany({
            include:{
                user: {
                    select: {id: true}
                }
            }
        })
        res.json(trees)
    } catch (error) {
        res.status(500).json({ error: 'error while fetching Trees'})
        console.error(error)
    }
})


export default router