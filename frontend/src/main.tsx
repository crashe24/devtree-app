// npm i -D tailwindcss postcss autoprefixer
// npx tailwindcss init -p
// react router dom npm i react-router-dom


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
