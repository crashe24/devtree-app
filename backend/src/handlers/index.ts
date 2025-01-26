// hashear el password
// npm i bcryptjs
// handle unico npm i slug
//npm i --save-dev @types/slug
// validacion
// npm i express-validator
// json web token jwt npm i jsonwebtoken
// npm i --save-dev @types/jsonwebtoken"
// formidable npm i formidable // npm i cloudinary
// npm i --save-dev @types/formidable
import type { Request, Response } from "express";
import User from "../models/User";
import { hashPassword, comparePassword } from "../utils/auth";
import slug from 'slug';
import formidable, {} from 'formidable'
//import { validationResult } from "express-validator";

import { generateJWT } from "../utils/jwt";
import cloudinary from '../config/cloudinary';
import { v4 as uuid} from 'uuid'
 

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
     console.log('desde get use', req.user)
     res.send(req.user) 
}

export const updateProfile = async(req:Request, res:Response) => {
    try {
        const { description } = req.body
        const handle = slug(req.body.handle, '')
        const handleExist  = await User.findOne({handle})
        if (handleExist && handleExist.email !== req.user.email){
           const error = new Error('handle ya registrado!!!')
           res.status(409).json({error: error.message})
           return
        }
        // actualizar el usuaior 
        req.user.description = description
        req.user.handle = handle
        await  req.user.save()

        res.send('Usuario actualzado correctamente')
    } catch (e) {
        const error = new Error('Hubo un error : '.concat(e) )
        res.status(500).json({error: error.message})
        return 
    }
}
// unique uid npm i uuid
export const uploadImage = (req:Request, res:Response) => {
    const form = formidable({ multiples: false})
    try {
        form.parse(req,async (err, fields, files)=>{
            console.log('llego', files.file[0].filepath)

            await cloudinary.uploader.upload(files.file[0].filepath,{public_id:`imagen_${uuid()}`},
                async function( err, result) {
                    if (err) {
                        const error = new Error('Hubo un error al subir la imagen')
                        res.status(500).json({error: error.message})
                        return 
                    }
                    if (result) {
                        console.log('result.', result.secure_url)
                        req.user.image = result.secure_url
                        await req.user.save()
                        res.json({image: result.secure_url})
                        return 
                    }
                }
            )
        })
      // res.send('cargar imagen') 
    } catch (e) {
        const error = new Error('Hubo un error : '.concat(e) )
        res.status(500).json({error: error.message})
        return 
    }
}