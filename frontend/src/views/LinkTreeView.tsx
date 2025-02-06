/**
 * El componente LinkTreeView es responsable de renderizar y gestionar el estado de los enlaces sociales del perfil de un usuario.
 * Permite a los usuarios actualizar URLs y habilitar/deshabilitar enlaces, y guarda estos cambios en el servidor.
 *
 * @componente
 * @returns {JSX.Element} El componente renderizado.
 *
 * @function
 * @name LinkTreeView
 *
 * @descripcion
 * - Inicializa el estado con los enlaces sociales.
 * - Obtiene datos del usuario desde el cliente de consultas.
 * - Actualiza el estado con datos específicos del usuario al montar el componente.
 * - Maneja los cambios de URL y actualiza el estado y el cliente de consultas.
 * - Maneja la habilitación/deshabilitación de enlaces y valida URLs antes de actualizar el estado y el cliente de consultas.
 * - Proporciona un botón para guardar cambios mediante la mutación de los datos del perfil del usuario.
 *
 * @ejemplo
 * <LinkTreeView />
 *
 * @function
 * @name handleUrChange
 * @descripcion Maneja el evento de cambio para los campos de entrada de URL, actualiza el estado y el cliente de consultas con la nueva URL.
 * @param {React.ChangeEvent<HTMLInputElement>} e - El evento de cambio del campo de entrada de URL.
 *
 * @function
 * @name handleEnableLink
 * @descripcion Alterna el estado habilitado de un enlace si la URL es válida, actualiza el estado y el cliente de consultas.
 * @param {DevTreeLinkSocial["name"]} name - El nombre del enlace a habilitar/deshabilitar.
 */
import { useEffect, useState } from "react";
import { social } from "../data/social";
import { DevTreeInput } from "../components/DevTreeInput";
import { DevTreeLinkSocial, UserType } from "../types";
import { isValidUrl } from "../util/utils";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/DevTreeaPI";

export default function LinkTreeView() {
  const [devtreelinks, setDevtreelinks] = useState(social);

  const queryClient = useQueryClient();

  const userGlobal: UserType = queryClient.getQueryData(["user"])!;
  // mutacion para los enlaces
  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Actualizado correctamente");
    },
  });

  useEffect(() => {
    const updateData: DevTreeLinkSocial[] = devtreelinks.map((link) => {
      const userLinks = JSON.parse(userGlobal.links);
      const userLink = userLinks.find(
        (item: DevTreeLinkSocial) => item.name === link.name
      );
      if (userLink) {
        return { ...link, enabled: userLink.enabled, url: userLink.url };
      }
      return link;
    });
    setDevtreelinks(updateData);
  }, []);

  const handleUrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uptdatedLink = devtreelinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link
    );
    setDevtreelinks(uptdatedLink);
    queryClient.setQueryData(["user"], (prevData: UserType) => {
      return {
        ...prevData,
        links: JSON.stringify(uptdatedLink),
      };
    });
  };

  const handleEnableLink = (name: DevTreeLinkSocial["name"]) => {
    const updateEnableLinks = devtreelinks.map((link) => {
      if (link.name === name) {
        if (isValidUrl(link.url)) {
          return { ...link, enabled: !link.enabled };
        } else {
          toast.error("URL no valida");
          return link;
        }
      }
      return link;
    });
    setDevtreelinks(updateEnableLinks);
    queryClient.setQueryData(["user"], (prevData: UserType) => {
      return {
        ...prevData,
        links: JSON.stringify(updateEnableLinks),
      };
    });
  };
  return (
    <>
      <div className=" space-y-5">
        {devtreelinks.map((item) => (
          <DevTreeInput
            key={item.name}
            item={item}
            handleUrlChange={handleUrChange}
            handleEnableLink={handleEnableLink}
          />
        ))}
        <button
          className=" bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold"
          onClick={() => mutate(userGlobal)}
        >
          Guardar cambios
        </button>
      </div>
    </>
  );
}
