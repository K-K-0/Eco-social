import { Router } from "express"
import { PrismaClient } from "../../database/generated/prisma"
import { authMiddleware } from "../middleware/middleware"
import { upload } from "../middleware/upload"
import cloudinary from "../utils/cloudinary"

const routes = Router()
const prisma = new PrismaClient()


const streamUpload = (buffer: Buffer): Promise<any> => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                resource_type: 'auto',
                folder: 'eco_posts'
            },
            (error, result) => {
                if (error) return reject(error)
                resolve(result)
            }
        )
        stream.end(buffer);
    });
};

routes.post('/create', authMiddleware, upload.single("media"), async (req:any, res:any) => {
    
    try {
        const file = req.file
        const { content, title } = req.body
        const userId = req.userId

        console.log("userId", userId)

        if(!file?.buffer || !content || !title) {
            return res.status(400).json({massage: "All field are required"})
        }

        const uploadResult = await streamUpload(file.buffer)
           
        const post = await prisma.post.create({
            data: {
                title,
                content,
                mediaUrl: uploadResult.secure_url,
                mediaType: uploadResult.resource_type,
                userId: userId
            }
        })
        res.status(201).json({ post })

    } catch (error) {
        res.status(500).json({ massage: "server error" })
        console.error(error)
    }
})



export default routes
