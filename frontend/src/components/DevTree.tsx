/**
 * `DevTree` es un componente funcional de React que renderiza la página de perfil de un usuario.
 * Muestra el handle del usuario, la imagen de perfil, la descripción y una lista de enlaces de redes sociales habilitados.
 * También incluye pestañas de navegación y un enlace para visitar el perfil del usuario.
 *
 * @component
 * @param {DevTreeProps} props - Las props del componente.
 * @param {UserType} props.data - Los datos del usuario a mostrar.
 *
 * @returns {JSX.Element} El componente renderizado.
 *
 * @example
 * const userData = {
 *   handle: "user123",
 *   image: "path/to/image.jpg",
 *   description: "Esta es una descripción del usuario",
 *   links: JSON.stringify([{ url: "https://example.com", enabled: true }])
 * };
 *
 * <DevTree data={userData} />
 */
import { Link, Outlet } from "react-router-dom";
import NavigationTabs from "./NavigationTabs";
import { Toaster } from "sonner";
import { SocialNetworkType, UserType } from "../types";
import { useState, useEffect } from "react";
import DevTreeLink from "./DevTreeLink";

type DevTreeProps = {
  data: UserType;
};
export default function DevTree({ data }: DevTreeProps) {
  const [enableLinks, setEnabledLinks] = useState<SocialNetworkType[]>(
    JSON.parse(data.links).filter((link: SocialNetworkType) => link.enabled)
  );

  useEffect(() => {
    setEnabledLinks(
      JSON.parse(data.links).filter((link: SocialNetworkType) => link.enabled)
    );
  }, [data]);

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
              Visitar Mi Perfil /{data.handle}
            </Link>
          </div>

          <div className="flex flex-col md:flex-row gap-10 mt-10">
            <div className="flex-1 ">
              <Outlet />
            </div>
            <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
              <p className=" text-4xl text-white text-center">{data.handle}</p>
              {data.image && (
                <img
                  src={data.image}
                  alt="Imagen del perfil "
                  className=" mx-auto min-w-[250px]"
                />
              )}
              <p className=" text-center text-lg font-black text-white">
                {data.description}
              </p>
              <div className=" text- flex flex-col mt-20 gap-5">
                {enableLinks.map((linkItem) => (
                  <DevTreeLink key={linkItem.url} data={linkItem} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <Toaster position="top-right" />
    </>
  );
}
