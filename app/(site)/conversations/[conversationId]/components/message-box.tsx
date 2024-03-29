import Avatar from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { FullMessageType } from "@/types";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import Image from "next/image";
import ImageModal from "@/components/overlays/image-modal";

type Props = {
  data: FullMessageType;
};

const MessageBox = ({ data }: Props) => {
  const session = useSession();

  const isOwn = session?.data?.user?.email === data?.sender?.email;

  const container = cn("flex gap-3 p-4", isOwn && "justify-end");
  const avatar = cn(isOwn && "order-2");
  const body = cn("flex flex-col gap-2", isOwn && "items-end");
  const message = cn(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

  return (
    <div className={container}>
      <div className={avatar}>
        <Avatar user={data.sender} />
      </div>
      <div className={body}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{data.sender.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>
        <div className={message}>
          {data.image ? (
            <ImageModal imageUrl={data.image}>
              <Image
                alt="Image"
                height="250"
                width="250"
                src={data.image}
                className="
                object-cover 
                cursor-pointer 
                hover:scale-110 
                transition 
                translate
              "
              />
            </ImageModal>
          ) : (
            <div>{data.body}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
