import type {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

// user no esta en el request de express por lo que 
// se tiene que declarar globalmente
declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}


export const authenticate = async(req: Request, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization
     if(!bearer) {
         const error = new Error('No autorizado')
         res.status(401).json({error: error.message})
         return
     }
     console.log('entro')
     const [, token] = bearer.split(' ')
     if(!token) {
        const error = new Error('No autorizado')
        res.status(401).json({error: error.message})
        return
    }
    // verificar eltoken 
    try {
        const result = jwt.verify(token, process.env.JWT_SECRET)
        if (typeof result ==='object' && result.id){
            //console.log('result.id', result.id)
            //const user = await User.findById(result.id).select('name handle email')
            const user = await User.findById(result.id).select('-password')
            //console.log('user', user)
            if (!user) {
                const error = new Error('Usuario no existe')
                res.status(404).json({error: error.message})
            }
            //res.status(200).json({message: user})
            req.user = user 
            next()
            
        }
    } catch (error) {
        console.log('error', error)
        res.status(500).json({error: 'token no valido'})
        return
    }
     
}
