"use client";

import { Button } from "@/components/ui/button";
import useConversation from "@/hooks/use-conversation";
import useOverlayStore from "@/hooks/use-overlay-store";
import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPaperAirplane } from "react-icons/hi";
import { HiPhoto } from "react-icons/hi2";

const Form = () => {
  const { conversationId } = useConversation();
  const { onOpen } = useOverlayStore();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    reset();
    axios.post("/api/messages", {
      ...data,
      conversationId,
    });
  };

  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <HiPhoto
        size={30}
        className="text-sky-500 cursor-pointer"
        onClick={() => onOpen("uploadModal")}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <div className="relative w-full">
          <input
            type={"text"}
            autoComplete="off"
            {...register("message", { required: true })}
            placeholder="Write a message"
            className="text-black font-light py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none"
          />
        </div>
        <Button type="submit" size={"icon"}>
          <HiPaperAirplane size={18} className="text-white rotate-90" />
        </Button>
      </form>
    </div>
  );
};

export default Form;
