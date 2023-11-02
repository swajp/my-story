import Image from "next/image";
import React from "react";

export default function CoverImage() {
  return (
    <div className="flex flex-col items-center justify-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[400px] h-[400px] sm:w-[350px] sm:h-[350px] md:h-[500px] md:w-[500px]">
          <Image
            src="/podcast-listening.svg"
            fill
            alt="Documents"
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
