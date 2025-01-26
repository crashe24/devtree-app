import mongoose, { Document } from "mongoose";


export interface IUser extends Document{
    handle: string;
    name: string;
    email: string;
    password: string;
    description: string;
    image: string;
}
// esquema
const userSchema = new mongoose.Schema({
    handle: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    }
})

// modelo
const User = mongoose.model<IUser>('User', userSchema) // nombre de la coleccion
export default User;