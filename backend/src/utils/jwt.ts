import jwt, {JwtPayload} from "jsonwebtoken"

export const generateJWT = (payload: JwtPayload) => {
    console.log('payload', payload)
    const token = jwt.sign(payload,process.env.JWT_SECRET, {
        expiresIn:'60d'
    })
    return token
}