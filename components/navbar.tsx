"use client";

import React from "react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <div className="z-50 bg-[#0E0E0E] static top-0 w-full p-6">
      <div className=" max-w-screen-2xl mx-auto flex items-center">
        <p className="text-white font-bold text-base md:text-2xl w-full">
          my story
        </p>
        <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
          <Button className="text-white" variant={"ghost"} size={"sm"}></Button>
        </div>
      </div>
    </div>
  );
}
