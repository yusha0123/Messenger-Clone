"use client";

import { useEffect, useState } from "react";
import ConfirmModal from "./confirm-modal";
import CreateGroupModal from "./create-group-modal";
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
      <CreateGroupModal />
      <ConfirmModal />
    </>
  );
};

export default OverlayProvider;
