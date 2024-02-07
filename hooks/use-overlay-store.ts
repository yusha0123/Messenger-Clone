import { User } from "@prisma/client";
import { create } from "zustand";

export type overlayType = "settingsModal" | "createGroupModal" | "imageModal";

interface overlayStore {
  type: overlayType | null;
  isOpen: boolean;
  data: User | User[] | string | null;
  onOpen: (type: overlayType, data?: User | User[] | string | null) => void;
  onClose: () => void;
}

const useOverlayStore = create<overlayStore>((set) => ({
  type: null,
  isOpen: false,
  data: null,
  onOpen: (type, data) => {
    set({ isOpen: true, type, data: data });
  },
  onClose: () => set({ type: null, isOpen: false, data: null }),
}));

export default useOverlayStore;
