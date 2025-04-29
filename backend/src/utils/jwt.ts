import jwt from 'jsonwebtoken'

export const signToken = (payload: object) => {
    const secret = "All"
    if (!secret) throw new Error("JWT_SECRET is not defined")

    return jwt.sign(payload, secret, {
        expiresIn: "7d",
    })
}