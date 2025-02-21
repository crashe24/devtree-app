# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

### Librerias utilizadas en el frontend

--Tailwindcss libreria para el disenio y la presentacion de las interfaces

```bash
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

-- Libreria para el ruteo de las paginas
--react router dom npm i react-router-dom
--se habiliata react-query en toda la aplicacion de forma global
-- dndkit npm i @dnd-kit/core @dnd-kit/modifiers @dnd-kit/sortable @dnd-kit/utilities

```bash
npm i @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

-- Libreria para el manejo de formularios react-hook-form

```bash
npm i react-hook-form
```

-- Libreria para la interaccion con el backend manejo de los fetch de datos axios o fetch api

```bash
npm i axios
```

-- Libreira para el manejo de los toast y el componente de Toaster Mensajes de exito o fracaso al momento de realizar uan accion toast libreria sonner

```bash
npm i sonner
```

-- Libreria react query tanstack libreria para obtener datos del servidor
-- ventajas optimiza datos cachea consultas sincroniza
-- se utiliza sobre fech o axios
-- terminos
-- Query: Se utilizan para obtener datos en un servidor o una api (GET)
-- useQuery para obtener datos
-- Mutation se utilizan para crear actualizar eliminad datos en el servidor CREATE UPDATE DELETE
-- POST PUT DELETE useMutation

```bash
 npm i @tanstack/react-query
 npm i @tanstack/react-query-devtools
```

-- Libreria para generar un slug unico desde el frontend

```bash
npm i react-slugify
```

--Libreria para el manejo de iconos

```bash
 npm i @heroicons/react
 npm i -D @tailwindcss/forms
```

-- Libreria para el manejo de componentes con tailwindcss
-- headless ui componentes dinamicos de tailwindcss https://headlessui.com/

```bash
npm install @headlessui/react
```

```libreria para el  drag and drop

```
