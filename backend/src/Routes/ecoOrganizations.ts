import { Router }   from "express";
import { PrismaClient } from "../../database/generated/prisma";
import { authMiddleware } from "../middleware/middleware";


const prisma = new PrismaClient()
const routes = Router()

routes.get("/", async (req, res) => {
    try {
        const organizations = await prisma.organizations.findMany({
            include: {
                _count: { select: {
                    Followers: true
                }
            }
        }
        })
        res.json(organizations)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch organizations" });
    }
})

routes.post('/register', authMiddleware, async (req:any,res:any) => {
    const { name, latitude, longitude, description, Address } = req.body
    const userId = req.userId

    if(!name || !latitude || !longitude ) {
        return res.status(400).json({massage: "Something missing"})
    }

    const organizations = await prisma.organizations.create({
        data: {
            name,
            description,
            latitude,
            longitude,
            Address,
            submittedBy: userId
        }
    })
    res.status(201).json({organizations})
})

routes.get('/verified', async (req, res ) => {
    const orgs = await prisma.organizations.findMany({
        where: { verified: true }
    })
    res.json({ orgs })
})

routes.get('/unverified', authMiddleware, async (req, res) => {

    const orgs = await prisma.organizations.findMany({
        where: { verified: false }
    })
    res.json({ orgs })
})

routes.post('/verify/:id', authMiddleware, async (req, res) => {
    const orgId = parseInt(req.params.id);

    try {
        await prisma.organizations.update({
            where: { id: orgId },
            data: { verified: true },
        });

        res.json({ message: 'Organization verified' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to verify org' });
    }
});

routes.post('/:orgId', authMiddleware, async (req:any, res: any) => {
    const { orgId } = req.params
    const userId = req.userId
    
    const follow = await prisma.followOrg.create({
        data: {
            userId,
            orgId
        }
    })
    res.json({follow})
})

routes.delete('/:orgId', authMiddleware, async (req: any, res: any) => {
    const { orgId } = req.params
    const userId = req.userId

    const follow = await prisma.followOrg.delete({
        where: {
            userId_orgId: {
                userId,orgId
            }
        }
    })
    res.json({ follow })
})




export default routes