import { Request,Response,NextFunction } from 'express'
import jwt from 'jsonwebtoken'

export const authMiddleware = (req:Request, res:Response, next: NextFunction): void => {
    const token = req.cookies.token
    if(!token) { 
        res.status(401).json({error: "unauthorized"})
        return
    }

    try {
        const decode =  jwt.verify(token,"All") as {id: number}
        console.log("Decoded token:", decode)
        // @ts-ignore
        req.userId = decode.userId
        next()
    } catch (error) {
        res.status(401).json({error: "invalid token"})
    }
}