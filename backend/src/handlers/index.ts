// hashear el password
// npm i bcryptjs
// handle unico npm i slug
//npm i --save-dev @types/slug
// validacion
// npm i express-validator
// json web token jwt npm i jsonwebtoken
// npm i --save-dev @types/jsonwebtoken"

import type { Request, Response } from "express";
import User from "../models/User";
import { hashPassword, comparePassword } from "../utils/auth";
import slug from 'slug';
//import { validationResult } from "express-validator";
import jwt from 'jsonwebtoken'
import { generateJWT } from "../utils/jwt";

export const createAccount = async (req: Request , res: Response) => {

    // let errors = validationResult(req)
    // if(!errors.isEmpty()){
    //     res.status(400).json({errors: errors.array()})
    //     return 
    // }   

    //res.send('procesado');
     const {email, password} = req.body;
     
     const userExists = await User.findOne({email});
     if(userExists){
         const error= new Error('El email ya se encuentra registrado!!!');
         res.status(409).json({error: error.message})
         return 
     }

     const handle = slug(req.body.handle, '');
     const handleExist  = await User.findOne({handle})
     if (handleExist){
        const error = new Error('handle ya registrado!!!')
        res.status(409).json({error: error.message})
        return
     }

     const user = new User(req.body);
     user.password = await hashPassword(password)
     user.handle = handle

     console.log('slug(handle)', slug(handle))
     await user.save();
     res.status(201).send('Registro creado correctamente!!!');
}

export const login = async (req: Request, res: Response) => {

    // let errors = validationResult(req)
    // if(!errors.isEmpty()){
    //     res.status(400).json({errors: errors.array()})
    //     return 
    // }   
    // ver si existe el usuario 
    const {email, password} = req.body
    const userExists = await User.findOne({email})
    if (!userExists){
        const error = new Error('El usuario no registrado!!!')
        res.status(404).json({error: error.message})
        return
    }
    // comparar los password
    const match = await comparePassword(password, userExists.password)
    if (!match){
        const error = new Error('El password no coincide!!!')
        res.status(401).json({error: error.message})
        return
    }
    const token = generateJWT({id: userExists.id})
    //console.log('token', token)
    
    res.status(201).send(token);
}

// el jsonwebtoken se debe enviar en los headers en el bearer
export const getUser = async(req: Request, res: Response) => {
    const bearer = req.headers.authorization
    //console.log('bearer', bearer)
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
            console.log('result.id', result.id)
            //const user = await User.findById(result.id).select('name handle email')
            const user = await User.findById(result.id).select('-password')
            console.log('user', user)
            if (!user) {
                const error = new Error('Usuario no existe')
                res.status(404).json({error: error.message})
            }
            res.status(200).json({message: user})
            return 
        }
    } catch (error) {
        console.log('error', error)
        res.status(500).json({error: 'token no valido'})
        return 
    }
     //console.log(token)
     
}