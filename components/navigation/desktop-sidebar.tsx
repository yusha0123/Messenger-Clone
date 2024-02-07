"use client";

import useRoutes from "@/hooks/use-routes";
import { User } from "@prisma/client";
import DesktopItem from "./desktop-item";
import Avatar from "@/components/ui/avatar";
import SettingsModal from "../overlays/settings-modal";
import useOverlayStore from "@/hooks/use-overlay-store";

interface DesktopSidebarProps {
  currentUser: User;
}

const DesktopSidebar = ({ currentUser }: DesktopSidebarProps) => {
  const routes = useRoutes();
  const { onOpen } = useOverlayStore();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r lg:pb-4 lg:flex lg:flex-col justify-between">
      <nav className="mt-4 flex flex-col justify-between">
        <ul role="list" className="flex flex-col items-center space-y-1">
          {routes.map((item) => (
            <DesktopItem
              key={item.label}
              href={item.href}
              label={item.label}
              icon={item.icon}
              active={item.active}
              onClick={item.onClick}
            />
          ))}
        </ul>
      </nav>
      <nav className="mt-4 flex flex-col justify-between items-center">
        <div
          className="cursor-pointer hover:opacity-75 transition"
          onClick={() => onOpen("settingsModal", currentUser)}
        >
          <Avatar user={currentUser} />
        </div>
      </nav>
    </div>
  );
};

export default DesktopSidebar;
