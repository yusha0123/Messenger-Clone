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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useConversation from "@/hooks/use-conversation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FiAlertTriangle } from "react-icons/fi";
import { toast } from "sonner";

interface Props {
  children: React.ReactNode;
}

const ConfirmModal = ({ children }: Props) => {
  const router = useRouter();
  const { conversationId } = useConversation();

  const handleConfirm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const promise = axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        router.push("/conversations");
        router.refresh();
      })
      .catch((error) => {
        throw error;
      });

    toast.promise(promise, {
      loading: "Deleting conversation...",
      success: "Conversation deleted!",
      error: "Failed to delete conversation.",
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
          e.stopPropagation()
        }
        asChild
      >
        {children}
      </AlertDialogTrigger>
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
          <AlertDialogCancel
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              e.stopPropagation()
            }
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmModal;
