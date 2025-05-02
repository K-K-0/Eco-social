import { Router }   from "express";
import { PrismaClient } from "../../database/generated/prisma";


const prisma = new PrismaClient()
const routes = Router()

routes.get("/", async (req, res) => {
    try {
        const organizations = await prisma.organizations.findMany()
        res.json(organizations)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch organizations" });
    }
})

routes.post('/register', async (req:any,res: any) => {
    const { name, latitude, longitude, description } = req.body

    if(!name || !latitude || !longitude ) {
        return res.status(400).json({massage: "Something missing"})
    }

    const organizations = await prisma.organizations.create({
        data: {
            name,
            description,
            latitude,
            longitude
        }
    })
    res.status(201).json({organizations})
})

export default routes