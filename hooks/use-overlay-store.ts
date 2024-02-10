import { User } from "@prisma/client";
import { create } from "zustand";

export type overlayType = "settingsModal" | "createGroupModal" | "confirmModal";

interface overlayStore {
  type: overlayType | null;
  isOpen: boolean;
  data: User | User[] | null;
  onOpen: (type: overlayType, data?: User | User[] | null) => void;
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
