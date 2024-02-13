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
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { MdAddPhotoAlternate } from "react-icons/md";
import { toast } from "sonner";

const SettingsModal = () => {
  const { isOpen, type, data, onClose, onOpen } = useOverlayStore();
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

  const [selectedImage, setSelectedImage] = useState<File>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);

    // Check if selectedImage is defined before appending it to FormData
    if (selectedImage) {
      formData.append("file", selectedImage);
    }

    axios
      .post("/api/upload?type=settings", formData)
      .then(() => {
        router.refresh();
        toast.success("Profile updated successfully!");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Something went wrong!");
      })
      .finally(() => {
        onClose();
        setIsLoading(false);
      });
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
              <input
                type="file"
                accept="image/*"
                id="imageInput"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <Image
                width="100"
                height="100"
                className="rounded-full"
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : currentUser?.image || "/user.png"
                }
                alt="Avatar"
              />
              <label htmlFor="imageInput" className="cursor-pointer">
                <Button
                  disabled={isLoading}
                  type="button"
                  variant={"outline"}
                  onClick={() => document.getElementById("imageInput")?.click()}
                >
                  Change
                  <MdAddPhotoAlternate className="h-4 w-4 ml-2" />
                </Button>
              </label>
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
              <Button isLoading={isLoading} type="submit">
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
