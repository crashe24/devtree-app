# Proyecto DevTree

Este es un proyecto básico de un servidor Express.

## Requisitos

- Node.js
- npm

## Instalación

1. Inicializa el proyecto:

   ```bash
   npm init
   ```

2. Instala las dependencias:

   ```bash
   npm install express
   ```

3. (Opcional) Instala nodemon para desarrollo:
   ```bash
   npm install --save-dev nodemon
   ```

## Uso

Para iniciar el servidor, ejecuta:

```bash
node index.js
```

Para iniciar el servidor en modo desarrollo con nodemon, ejecuta:

```bash
npx nodemon index.js
```

## Notas

- Para matar el puerto 4000, usa:

  ```bash
  npm kill-port 4000
  ```

- El servidor estará disponible en `http://localhost:4000`.

## Descripción del Proyecto

Este proyecto crea un servidor básico utilizando Express. El servidor responde con "Hola mundo" cuando se accede a la ruta raíz (`/`). El servidor se ejecuta en el puerto 4000.

### Archivos Principales

- `index.js`: Archivo principal que configura y ejecuta el servidor Express.

### librerias utillizadas para backend

### Para trabakar con modulos \*/

--package.json
--type: module

```bash
 npm i -D typescript ts-node
```

--crear el archivo tsconfig.json
--cambiar la extension a .ts
--quitar el type module

### correr la aplicacion

```bash
 npm run dev
 npm i express
 npm i --save-dev @types/express
```

## Compilar codigo de ts a js

```bash
 tsc en el package.json

```

## Para manejar colores en la terminal

--1 es el index.ts

```bash
npm i colors
```

### base de datos moongose

--mongodb base de datos
--mongoose orm
--dotenv libreria para manejar los archivos de variables
--cors libreria para el manejo de la seguridad de cors

```bash
 npm i mongoose
 npm i dotenv
 npm i cors
 npm i -D @types/cors
```

### libreria para encriptar

```bash
npm i --save-dev @types/bcryptjs
```

## dependencias para imagenes

### Sitio para subir imagenes cloudinary

```bash
npm i cloudinary
```

--hashear el password

```bash
 npm i bcryptjs
```

-- Libreria para generar un slug o handle unico

```bash
 npm i slug
 npm i --save-dev @types/slug
```

-- Libreria para validar errores

```bash
 npm i express-validator
```

-- Libreria para generar el jwt

```bash
 npm i jsonwebtoken
 npm i --save-dev @types/jsonwebtoken"
```

## Libreria para que express pueda subir imagenes formidable

```bash
npm i cloudinary
npm i formidable
npm i --save-dev @types/formidable
```

-- cloud_name: process.env.CLOUDINARY_NAME,
-- api_key: process.env.CLOUDINARY_KEY,
-- api_secret: process.env.CLOUDINARY_SECRET, // Click 'View API Keys' above to copy your API secret
