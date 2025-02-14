import { useSortable } from "@dnd-kit/sortable";
import { SocialNetworkType } from "../types";
import { CSS } from "@dnd-kit/utilities";

type DevTreeLinkProps = {
  data: SocialNetworkType;
};

export default function DevTreeLink({ data }: DevTreeLinkProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: data.id,
    });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    // drag and drop
    <li
      ref={setNodeRef}
      style={style}
      className=" bg-white px-5 py-2 flex items-center gap-5 rounded-lg"
      {...attributes}
      {...listeners}
    >
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
