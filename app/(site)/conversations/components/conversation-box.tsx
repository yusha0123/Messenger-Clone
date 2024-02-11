"use client";

import Avatar from "@/components/ui/avatar";
import AvatarGroup from "@/components/ui/avatar-group";
import useOtherUser from "@/hooks/use-other-user";
import { cn } from "@/lib/utils";
import { FullConversationType } from "@/types";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

type Props = {
  data: FullConversationType;
  selected?: boolean;
};

const ConversationBox = ({ data, selected }: Props) => {
  const otherUser = useOtherUser(data);
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];

    return messages[messages.length - 1];
  }, [data.messages]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Sent an image";
    }

    if (lastMessage?.body) {
      return lastMessage?.body;
    }

    return "Started a conversation";
  }, [lastMessage]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "w-full relative flex items-center space-x-3 p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer",
        selected ? "bg-neutral-100" : "bg-white"
      )}
    >
      {data.isGroup ? (
        <AvatarGroup users={data.users} />
      ) : (
        <Avatar user={otherUser} />
      )}
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-gray-900">
              {data.name || otherUser.name}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-xs text-gray-400 font-light">
                {format(new Date(lastMessage.createdAt), "p")}
              </p>
            )}
          </div>
          <p className="truncate text-sm text-gray-500">{lastMessageText}</p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox;
