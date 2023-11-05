"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useConvexAuth } from "convex/react";
import Spinner from "./spinner";

export default function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="z-50 bg-[#0E0E0E] static top-0 w-full p-6">
      <div className=" max-w-screen-2xl mx-auto flex items-center">
        <p className="text-white font-bold text-base md:text-2xl w-full">
          <Link href="/">my story</Link>
        </p>
        <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
          <Link href="/stories">
            <Button>
              <p className=" font-bold">Příběhy</p>
            </Button>
          </Link>
          {isLoading && <Spinner size={"lg"} />}

          {!isLoading && !isAuthenticated && (
            <SignInButton mode="modal">
              <Button className="text-white" variant={"ghost"} size={"sm"}>
                <p className=" font-bold">Přihlásit se</p>
              </Button>
            </SignInButton>
          )}
          {!isLoading && isAuthenticated && (
            <>
              <Link href="/dashboard">
                <Button className="text-black" variant={"outline"}>
                  <p className=" font-bold">Můj účet</p>
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
