"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import useOverlayStore from "@/hooks/use-overlay-store";
import { User } from "@prisma/client";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { MdAddPhotoAlternate } from "react-icons/md";
import { toast } from "sonner";

const SettingsModal = () => {
  const { isOpen, type, data, onClose } = useOverlayStore();
  const isModalOpen = isOpen && type === "settingsModal";
  const currentUser = data as User;

  const { register, handleSubmit, setValue, watch } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result.info.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/settings", data)
      .then(() => {
        onClose();
        router.refresh();
        toast.success("Profile updated successfully!");
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => setIsLoading(false));
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Edit profile</DialogTitle>
          <DialogDescription className="text-center">
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-5 items-center">
            <div className="flex flex-col items-center gap-3">
              <Image
                width="100"
                height="100"
                className="rounded-full"
                src={image || currentUser?.image || "/user.png"}
                alt="Avatar"
              />
              <CldUploadButton
                options={{ maxFiles: 1 }}
                onUpload={handleUpload}
                uploadPreset={"oirnl8qs"}
              >
                <Button disabled={isLoading} type="button" variant={"outline"}>
                  Change
                  <MdAddPhotoAlternate className="h-4 w-4 ml-2" />
                </Button>
              </CldUploadButton>
            </div>
            <Input
              disabled={isLoading}
              placeholder="Name"
              required
              {...register("name", {
                required: true,
              })}
              defaultValue={currentUser?.name || ""}
            />
            <div className="w-full flex justify-end gap-4">
              <Button
                disabled={isLoading}
                type="button"
                variant={"secondary"}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button disabled={isLoading} type="submit">
                Save
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
