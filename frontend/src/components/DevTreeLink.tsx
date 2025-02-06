import { SocialNetworkType } from "../types";

type DevTreeLinkProps = {
  data: SocialNetworkType;
};

export default function DevTreeLink({ data }: DevTreeLinkProps) {
  return (
    <li className=" bg-white px-5 py-2 flex items-center gap-5 rounded-lg">
      <div
        className=" w-12 h-12 bg-cover"
        style={{
          backgroundImage: `url('/social/icon_${data.name}.svg')`,
        }}
      ></div>
      <p className=" capitalize">
        Visita mi <span className=" font-bold">{data.name}</span>
      </p>
    </li>
  );
}
