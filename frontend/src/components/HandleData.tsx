import { SocialNetworkType, UserHandle } from "../types";

interface HandleDataProps {
  data: UserHandle;
}
export default function HandleData({ data }: HandleDataProps) {
  const links: SocialNetworkType[] = JSON.parse(data.links).filter(
    (link: SocialNetworkType) => link.enabled
  );

  return (
    <div className=" space-y-6 text-white">
      <p className=" text-5xl text-center font-black">{data.handle}</p>
      {data.image && (
        <img
          src={data.image}
          alt={data.handle}
          className="w-40 h-40 mx-auto "
        />
      )}
      <p className=" text-lg text-center font-bold">{data.description}</p>
      <div className=" mt-20 flex flex-col gap-6">
        {links.length ? (
          links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noreferrer noopener"
              className=" bg-white px-5 py-2 flex text-lg font-bold gap-5 rounded-lg items-center"
            >
              <img
                src={`/social/icon_${link.name.toLowerCase()}.svg`}
                alt="imagen de red social"
                className=" w-12"
              />
              <p className=" text-black capitalize font-black text-lg">
                Visita mi: {link.name}
              </p>
            </a>
          ))
        ) : (
          <p>No hay enlaces</p>
        )}
      </div>
    </div>
  );
}
