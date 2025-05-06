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



routes.post('/:postId/like', authMiddleware, async (req:any, res:any) => {
    const  postId  = parseInt(req.params.postId)
    const userId = req.userId

    try {
        const exist = await prisma.like.findUnique({
            where: {
                userId_postId: {userId, postId}
            }
        })

        if(exist) {
            await prisma.like.delete({where: {id: exist.id}})
            return res.json({message: "unlike"})
        } else {
            await prisma.like.create({
                data: { postId, userId }
            })
        }

        const likeCount = await prisma.like.count({
            where: { postId: Number(postId) }
        });

        return res.status(200).json({ message: exist ? 'Unliked' : 'Liked', likeCount });

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Something went wrong' });
    }
})

routes.post('/:id/like', async (req:any, res:any) => {
    const postId = req.params.id;

    try {
        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: {
                likes: { increment: 1 }
            }
        });

        return res.status(200).json({ message: 'Post liked', post: updatedPost });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Something went wrong' });
    }
});



routes.post('/:postId/comment', authMiddleware, async (req:any, res:any) => {
    const { content, postId } = req.body

    if(!content) return res.status(400).json({error: "comment is empty"})

    try {
        const comment = await prisma.comment.create({
            data: {
                content,
                userId: req.userId,
                postId
            },
            include: {
                user: {
                    select: {
                        username: true,
                        avatarUrl: true
                    }
                }
            }
        })

        res.status(201).json({message: "comment created", comment})
    } catch (error) {
        console.log(error)
    }
})

routes.get('/:postId/comment', authMiddleware, async (req: any, res: any) => {
    const postId  = parseInt(req.params.postId)
    try {
        const comment = await prisma.comment.findMany({
            where: { postId },
            include: {
                user: {
                    select: {
                        username: true,
                        avatarUrl: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        res.json({ comment })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "failed to fetch comments" })
    }
})


export default routes
