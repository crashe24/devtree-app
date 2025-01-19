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
