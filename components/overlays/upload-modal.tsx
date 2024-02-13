"use client";

import { ImageDropzone } from "@/components/image-dropzone";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import useConversation from "@/hooks/use-conversation";
import useOverlayStore from "@/hooks/use-overlay-store";
import axios from "axios";
import { memo, useCallback, useState } from "react";
import { toast } from "sonner";

const UploadModal = () => {
  const { isOpen, type, onClose } = useOverlayStore();
  const isModalOpen = isOpen && type === "uploadModal";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File>();
  const { conversationId } = useConversation();

  const handleClose = useCallback(() => {
    setFile(undefined);
    setIsSubmitting(false);
    onClose();
  }, []);

  const handleChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(
          `/api/upload?type=message&conversationId=${conversationId}`,
          formData
        );
        console.log(response);
      } catch (error) {
        toast.error("Failed to upload image!");
      } finally {
        handleClose();
      }
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Upload Image</h2>
        </DialogHeader>
        <ImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={handleChange}
        />
      </DialogContent>
    </Dialog>
  );
};

export default memo(UploadModal);
