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
import { FiAlertTriangle } from "react-icons/fi";

interface Props {
  children: React.ReactNode;
  onConfirm: () => void;
}

const ConfirmModal = ({ children, onConfirm }: Props) => {
  const handleConfirm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    onConfirm();
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
