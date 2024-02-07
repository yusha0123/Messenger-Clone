"use client";

import { useEffect, useState } from "react";
import ProfileDrawer from "./profile-drawer";
import SettingsModal from "./settings-modal";
import CreateGroupModal from "./create-group-modal";

const OverlayProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SettingsModal />
      <CreateGroupModal />
    </>
  );
};

export default OverlayProvider;
