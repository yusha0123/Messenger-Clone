"use client";

import { useEffect, useState } from "react";
import ProfileDrawer from "./profile-drawer";

const OverlayProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <></>;
};

export default OverlayProvider;
