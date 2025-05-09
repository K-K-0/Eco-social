import { Router }   from "express";
import { PrismaClient } from "../../database/generated/prisma";
import { authMiddleware } from "../middleware/middleware";


const prisma = new PrismaClient()
const routes = Router()

routes.get("/", authMiddleware, async (req: any, res) => {
    // const userId = req.userId
    try {
        const organizations = await prisma.organizations.findMany({
            include: { 
                Followers: {
                    select: {
                        id: true
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

routes.post('/:id', authMiddleware, async (req:any, res: any) => {
    console.log("RAW params:", req.params);
    console.log("req.params.id:", req.params.id);
    console.log("req.query:", req.query);

    const  orgId  = parseInt(req.params.id)
    const userId = req.userId

    console.log(userId)
    console.log(req.params)

    if (isNaN(orgId)) {
        return res.status(400).json({ error: "Invalid organization ID" });
    }
    
    const follow = await prisma.followOrg.create({
        data: {
            user: {connect: {id: userId}},
            Organizations: {connect: {id: orgId}}
        }
    })
    res.json({follow})
})

routes.delete('/:id', authMiddleware, async (req: any, res: any) => {
    const orgId  = parseInt(req.params.id)
    const userId = req.userId

    const unfollow = await prisma.followOrg.delete({
        where: {
            userId_orgId: {
                userId,orgId
            }
        }
    })
    res.json({ unfollow })
})




export default routes