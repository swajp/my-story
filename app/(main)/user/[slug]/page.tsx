"use client";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React from "react";

import Image from "next/image";
import Spinner from "@/components/spinner";

export default function UserPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const user = useQuery(api.stories.getUserPostsAndLikes, {
    userId: slug || "",
  });

  if (!user) {
    return (
      <div className="flex items-center justify-center content-center">
        <Spinner size={"lg"} />
      </div>
    );
  }

  if (!user[0]) {
    return (
      <div className="flex items-center justify-center content-center">
        <div className="text-white font-medium text-2xl">
          Tento uživatel neexistuje.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#0E0E0E] flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center flex-1 px-6">
        <div className="p-10 bg-[#1b1b1b] rounded-2xl flex flex-col items-center gap-4">
          <Image
            className="rounded-full"
            src={user?.[0].image || "/images/placeholder.png"}
            width={72}
            height={72}
            alt="User image"
          />
          <div>
            <h1 className="text-white font-bold text-3xl">{user?.[0]?.name}</h1>
          </div>
          <div className="flex gap-2 pt-2 w-full min-w-[250px]">
            <div className="p-4 bg-[#0E0E0E] rounded-lg w-full">
              <p className="text-white text-base font-medium">Srdce</p>
              <p className="text-white text-2xl font-bold">
                {user?.reduce((acc, post) => acc + post.likes, 0)}
              </p>
            </div>
            <div className="p-4 bg-[#0E0E0E] rounded-lg w-full">
              <p className="text-white text-base font-medium">Příspěvků</p>
              <p className="text-white text-2xl font-bold">{user?.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
