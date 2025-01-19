/** Con modulos */
// package.json 
// type: module
//  npm i -D typescript ts-node 
// crear el archivo tsconfig.json
// cambiar la extension a .ts
// quitar el type module
// npm run dev
// npm i express
// npm i --save-dev @types/express
/** Compilar codigo de ts a js */
// tsc en el package.json
// 1 es el index.ts
// npm i colors
import colors from 'colors';
import server from "./server";


// para el hosting process.env.PORT
const port = process.env.PORT || 4000
server.listen(port, () => {    
    console.log(colors.magenta.italic('servidor en el puerto'), port );
})
