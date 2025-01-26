// npm i -D tailwindcss postcss autoprefixer
// npx tailwindcss init -p
// react router dom npm i react-router-dom

// se habiliata react-query en toda la aplicacion de forma global

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import Router from "./router.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Router />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>
);
