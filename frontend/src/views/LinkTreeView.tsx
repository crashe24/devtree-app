import { useState } from "react";
import { social } from "../data/social";
import { DevTreeInput } from "../components/DevTreeInput";
import { DevTreeLinkSocial } from "../types";
import { isValidUrl } from "../util/utils";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../api/DevTreeaPI";

export default function LinkTreeView() {
  const [devtreelinks, setDevtreelinks] = useState(social);

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
  const handleUrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uptdatedLink = devtreelinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link
    );
    setDevtreelinks(uptdatedLink);
  };

  const handleEnableLink = (name: DevTreeLinkSocial["name"]) => {
    console.log("name", name);
    const updateEnableLink = devtreelinks.map((link) => {
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
    setDevtreelinks(updateEnableLink);
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
        <button className=" bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold">
          Guardar cambios
        </button>
      </div>
    </>
  );
}
