"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useConversation from "@/hooks/use-conversation";
import useOverlayStore from "@/hooks/use-overlay-store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { toast } from "sonner";
import { Button } from "../ui/button";

const ConfirmModal = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { conversationId } = useConversation();
  const { isOpen, type, onClose } = useOverlayStore();
  const isModalOpen = isOpen && type === "confirmModal";

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/conversations/${conversationId}`);
      router.push("/conversations");
      router.refresh();
      onClose();
    } catch (error) {
      toast.error("Failed to delete conversation.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={isModalOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 my-2 mx-auto">
            <FiAlertTriangle
              className="h-6 w-6 text-red-600"
              aria-hidden="true"
            />
            Delete conversation
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-gray-500">
            Are you sure you want to delete this conversation? This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            onClick={handleConfirm}
            isLoading={isLoading}
            variant={"destructive"}
          >
            Confirm
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmModal;
