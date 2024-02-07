"use client";

import { useEffect, useState } from "react";
import ProfileDrawer from "./profile-drawer";
import SettingsModal from "./settings-modal";

const OverlayProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <SettingsModal />
    </>
  );
};

export default OverlayProvider;
