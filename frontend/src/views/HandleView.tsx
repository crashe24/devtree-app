import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { getUserByHandle } from "../api/DevTreeaPI";
import HandleData from "../components/HandleData";

export default function HandleView() {
  const { handle } = useParams();
  const { data, error, isLoading } = useQuery({
    queryFn: () => getUserByHandle(handle!),
    queryKey: ["handle", handle],
    retry: 1,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full text-white font-bold text-4xl">
        Cargando...
      </div>
    );
  if (error) return <Navigate to={"/404"} />;

  if (data) return <HandleData data={data} />;
  // console.log("params", handle);
  //return <div>{handle}</div>;
}
