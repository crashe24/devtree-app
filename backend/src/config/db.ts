// configuracion de la base de datos
import mongoose from 'mongoose';
import colors from 'colors';

export const connectDB = async () => {
    try {
        
        const {connection} = await mongoose.connect(process.env.MONGO_URI)
        const url = `${connection.host}:${connection.port}`
        console.log(colors.blue.bold('DB is connected mongodb'), url);
    }
    catch (error) {
        console.log(colors.bgRed.magenta('error'), error);
        process.exit(1) // detener la app
    }
}