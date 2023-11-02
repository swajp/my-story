"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { user } = useUser();
  return (
    <div className="z-50 bg-[#0E0E0E] static top-0 w-full p-6">
      <div className=" max-w-screen-2xl mx-auto flex items-center">
        <p className="text-white font-bold text-base md:text-2xl w-full">
          my story
        </p>
        <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
          {user ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton mode="modal">
              <Button className="text-white" variant={"ghost"} size={"sm"}>
                Přilásit se
              </Button>
            </SignInButton>
          )}
        </div>
      </div>
    </div>
  );
}
