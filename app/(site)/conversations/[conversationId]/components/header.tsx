"use client";

import ProfileDrawer from "@/components/overlays/profile-drawer";
import Avatar from "@/components/ui/avatar";
import AvatarGroup from "@/components/ui/avatar-group";
import { Button } from "@/components/ui/button";
import useActiveList from "@/hooks/use-active-list";
import useOtherUser from "@/hooks/use-other-user";
import { Conversation, User } from "@prisma/client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";

type Props = {
  conversation: Conversation & {
    users: User[];
  };
};

const Header = ({ conversation }: Props) => {
  const otherUser = useOtherUser(conversation);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    }

    return isActive ? "Active Now" : "Offline";
  }, [conversation, isActive]);

  return (
    <>
      <ProfileDrawer
        data={conversation}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <div className="bg-white w-full flex  border-b sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="lg:hidden block  text-sky-500  hover:text-sky-600  transition cursor-pointer"
          >
            <HiChevronLeft size={32} />
          </Link>
          {conversation.isGroup ? (
            <AvatarGroup users={conversation.users} />
          ) : (
            <Avatar user={otherUser} />
          )}
          <div className="flex flex-col">
            <div>{conversation.name || otherUser.name}</div>
            <div className="text-sm font-light text-neutral-500">
              {statusText}
            </div>
          </div>
        </div>
        <Button variant={"ghost"} onClick={() => setDrawerOpen(true)}>
          <HiEllipsisHorizontal className="text-sky-500 h-6 w-6" />
        </Button>
      </div>
    </>
  );
};

export default Header;
