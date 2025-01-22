import { Link, Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import NavigationTabs from "../components/NavigationTabs";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/DevTreeaPI";


export default function AppLayout() {
  // react query tanstack libreria para obtener datos del servidor
  // npm i @tanstack/react-query
  // npm i @tanstack/react-query-devtools

  // ventajas optimiza datos cachea consultas sincroniza
  // se utiliza sobre fech o axios
  // terminos
  // Query: Se utilizan para obtener datos en un servidor o una api (GET)
  // useQuery para obtener datos
  // Mutation se utilizan para crear actualizar eliminad datos en el servidor CREATE UPDATE DELETE
  // POST PUT DELETE useMutation

  const {data, isLoading, error, isError} = useQuery({
    queryFn: getUser,
    queryKey: ['user'],
    retry: 1, // cuantas veces se tiene que realizar el reintento de consulta por defecto son 3
    refetchOnWindowFocus: false // que no haga un re consulta cuando se salga de la pagina y se vuelva a ingresar
  })

  console.log(data)
  console.log(isLoading)
  console.log(isError)
  console.log(error)

  return (
    <>
      <header className="bg-slate-800 py-5">
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
          <div className="w-full p-5 lg:p-0 md:w-1/3">
            <img src="/logo.svg" className="w-full block" />
          </div>
          <div className="md:w-1/3 md:flex md:justify-end">
            <button
              className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
              onClick={() => {}}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>
      <div className="bg-gray-100  min-h-screen py-10">
        <main className="mx-auto max-w-5xl p-10 md:p-0">
          <NavigationTabs />
          <div className="flex justify-end">
            <Link
              className="font-bold text-right text-slate-800 text-2xl"
              to={""}
              target="_blank"
              rel="noreferrer noopener"
            >
              Visitar Mi Perfil
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-10 mt-10">
            <div className="flex-1 ">
              <Outlet />
            </div>
            <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6"></div>
          </div>
        </main>
      </div>
      <Toaster position="top-right" />
    </>
  );
}
