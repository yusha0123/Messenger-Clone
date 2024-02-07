"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Select from "@/components/ui/select";
import useOverlayStore from "@/hooks/use-overlay-store";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateGroupModal = () => {
  const { isOpen, type, data, onClose } = useOverlayStore();
  const isModalOpen = isOpen && type === "createGroupModal";
  const users = data as User[];

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, watch } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        ...data,
        isGroup: true,
      })
      .then(() => {
        router.refresh();
        toast.success("Group created successfully!");
        onClose();
      })
      .catch(() => {
        toast.error("Something went wrong!");
      })
      .finally(() => setIsLoading(false));
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center">Create Group Chat</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col space-y-6 mt-3"
        >
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input disabled={isLoading} {...register("name")} required />
          </div>
          <Select
            disabled={isLoading}
            label="Members"
            options={users?.map((user) => ({
              value: user.id,
              label: user.name,
            }))}
            onChange={(value) =>
              setValue("members", value, {
                shouldValidate: true,
              })
            }
            value={members}
          />
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              isLoading={isLoading}
              variant={"secondary"}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={isLoading}>
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupModal;
