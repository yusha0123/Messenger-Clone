"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

type Props = {
  children: React.ReactNode;
  imageUrl: string;
};

const ImageModal = ({ children, imageUrl }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <div className="relative h-80 w-80 mx-auto flex items-center">
          <Image
            src={imageUrl}
            alt="image"
            width={320}
            height={320}
            className="rounded-md"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
