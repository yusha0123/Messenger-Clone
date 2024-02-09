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
        <div className="relative h-80 w-80 mx-auto">
          <Image src={imageUrl} alt="image" fill className="object-cover" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
