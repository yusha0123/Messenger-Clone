"use client";

import { createPortal } from "react-dom";
import { ClipLoader } from "react-spinners";

const LoadingModal = () => {
  return createPortal(
    <div className="inset-0 fixed bg-gray-100 bg-opacity-50 transition-opacity flex items-center justify-center z-50">
      <ClipLoader size={40} color="#0284c7" />
    </div>,
    document.body
  );
};

export default LoadingModal;
