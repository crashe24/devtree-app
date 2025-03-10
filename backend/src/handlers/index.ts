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
import { handleInputErrors } from '../midleware/validation';
 

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
    
    res.status(201).send(token);
}

// el jsonwebtoken se debe enviar en los headers en el bearer
export const getUser = async(req: Request, res: Response) => {
     res.send(req.user) 
}

export const updateProfile = async(req:Request, res:Response) => {
    try {
        const { description, links } = req.body
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
        req.user.links = links
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
          
            await cloudinary.uploader.upload(files.file[0].filepath,{public_id:`imagen_${uuid()}`},
                async function( err, result) {
                    if (err) {
                        const error = new Error('Hubo un error al subir la imagen')
                        res.status(500).json({error: error.message})
                        return 
                    }
                    if (result) {
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

 export const getYUserByHandle = async( req:Request, res: Response) => {
    try {
        const handle = req.params['handle']
        const user = await User.findOne({handle}).select('-_id -password -email -__v ')
        if (!user){
            const error = new Error('Usuario no encontrado!!!')
            res.status(404).json({error: error.message})
            return
        }
        res.json(user)

    } catch (error) {
        const errorRef = new  Error('Hubo un error handle'.concat(error))
        res.status(500).json({error: errorRef.message})
    }
 }
 export const searchByHandle = async( req:Request, res: Response) => {
    try {
        const handle = req.body.handle
        const userExist = await User.findOne({handle})
        if (userExist) {
            const error = new Error(`${handle} ya registrado!!!`)
            res.status(409).json({error: error.message})
            return
        }
        res.send(`${handle} esta disponible!!!`)

    } catch (error) {
        const errorRef = new  Error('Hubo un error handle'.concat(error))
        res.status(500).json({error: errorRef.message})
    }
 }

