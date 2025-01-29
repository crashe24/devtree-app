import { useState } from "react";
import { social } from "../data/social";
import { DevTreeInput } from "../components/DevTreeInput";
import { DevTreeLinkSocial } from "../types";
import { isValidUrl } from "../util/utils";
import { toast } from "sonner";

export default function LinkTreeView() {
  const [devtreelinks, setDevtreelinks] = useState(social);

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
          return;
        }
      } else {
        return link;
      }
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
      </div>
    </>
  );
}
