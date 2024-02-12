"use client";

import UserBox from "@/app/(site)/users/components/user-box";
import Avatar from "@/components/ui/avatar";
import AvatarGroup from "@/components/ui/avatar-group";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import useActiveList from "@/hooks/use-active-list";
import useOtherUser from "@/hooks/use-other-user";
import useOverlayStore from "@/hooks/use-overlay-store";
import { Conversation, User } from "@prisma/client";
import { format } from "date-fns";
import { useMemo } from "react";
import { FaTrash } from "react-icons/fa";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  data: Conversation & { users: User[] };
};

const ProfileDrawer = ({ isOpen, onClose, data }: Props) => {
  const otherUser = useOtherUser(data);
  const { onOpen } = useOverlayStore();
  const { members } = useActiveList();
  const isActive = members.indexOf(otherUser?.email!) !== -1;

  const joinedDate = useMemo(() => {
    return format(new Date(otherUser.createdAt), "PP");
  }, [otherUser.createdAt]);

  const title = useMemo(() => {
    return data.name || otherUser.name;
  }, [data.name, otherUser.name]);

  const statusText = useMemo(() => {
    if (data.isGroup) {
      return `${data.users.length} members`;
    }

    return isActive ? "Active Now" : "Offline";
  }, [data, isActive]);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <div className="mt-6">
          <div className="flex flex-col items-center">
            <div className="mb-2">
              {data.isGroup ? (
                <AvatarGroup users={data.users} />
              ) : (
                <Avatar user={otherUser} />
              )}
            </div>
            <div>{title}</div>
            <div className="text-sm text-gray-500">{statusText}</div>
            <div className="my-8">
              <Button
                variant={"destructive"}
                onClick={() => onOpen("confirmModal")}
              >
                Delete <FaTrash className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
          <div className="w-full pb-5 pt-5 sm:px-0 sm:pt-0">
            <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
              {data.isGroup && (
                <div>
                  <dt className="text-sm font-medium text-gray-500 text-center">
                    {data?.users?.length} Members
                  </dt>
                  <div className="py-2 overflow-y-auto">
                    {data.users.map((user) => (
                      <UserBox data={user} key={user.id} />
                    ))}
                  </div>
                </div>
              )}
              {!data.isGroup && (
                <div>
                  <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                    Email
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                    {otherUser.email}
                  </dd>
                </div>
              )}
              {!data.isGroup && (
                <>
                  <hr />
                  <div>
                    <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                      Joined
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                      <time dateTime={joinedDate}>{joinedDate}</time>
                    </dd>
                  </div>
                </>
              )}
            </dl>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProfileDrawer;
