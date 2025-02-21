import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api/DevTreeaPI";
import DevTree from "../components/DevTree";

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

  const { data, isLoading, isError } = useQuery({
    queryFn: getUser,
    queryKey: ["user"],
    retry: 2, // cuantas veces se tiene que realizar el reintento de consulta por defecto son 3
    refetchOnWindowFocus: false, // que no haga un re consulta cuando se salga de la pagina y se vuelva a ingresar
  });

  if (isLoading) return "cargando";
  if (isError) {
    return <Navigate to={"/auth/login"} />;
  }

  if (data)
    return (
      <>
        <DevTree data={data} />
      </>
    );
}
