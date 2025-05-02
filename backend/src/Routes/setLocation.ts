import { Router } from "express"
import { PrismaClient } from "../../database/generated/prisma"
import { authMiddleware } from "../middleware/middleware"

const prisma = new PrismaClient()
const router = Router()

router.post('/location', authMiddleware, async (req: any,res: any) => {
    const userId = req.userId
    const {lat, lng} = req.body


    if (typeof lat !== "number" || typeof lng !== "number") {
        return res.status(400).json({ error: "Invalid coordinates" });
    }

    try {
        await prisma.user.update({
            where: {id: userId},
            data: { lat, lng}
        })
        res.json({success: true})
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }

})

export default router