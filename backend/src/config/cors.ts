import {CorsOptions } from 'cors'

export const corsConfig: CorsOptions = {
    origin: function(origin, callback) {
        // vector de argumentos para permitir ejecutar desde un cliente de postman 
        const whitelist = []
        // dominios permitidos 
        whitelist.push(process.env.FRONTEND_URL)
        if (process.argv[2] === '--api') {
            whitelist.push(undefined)
        }
        if (whitelist.includes(origin)) {
        //if(origin === process.env.FRONTEND_URL) {
            //console.log('permitir conexion')
            callback(null, true)

        } else {
            ///console.log('denegar la conexion')
            callback(new Error('Error de cors'))
        }
    }
}

