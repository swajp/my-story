"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Image from "next/image";
import React from "react";

export default function UserCard() {
  const { user } = useUser();
  const userPosts = useQuery(api.stories.getUserPostsAndLikes, {
    userId: user?.id || "",
  });

  return (
    <div className="p-10 bg-[#1b1b1b] rounded-2xl flex flex-col items-center gap-4">
      <Image
        className="rounded-full"
        src={user?.imageUrl!}
        width={72}
        height={72}
        alt="User image"
      />
      <div>
        <h1 className="text-white font-bold text-3xl">{user?.fullName}</h1>
      </div>
      <div className="flex gap-2 pt-2 w-full">
        <div className="p-4 bg-[#0E0E0E] rounded-lg w-full">
          <p className="text-white text-base font-medium">Srdce</p>
          <p className="text-white text-2xl font-bold">
            {userPosts?.reduce((acc, post) => acc + post.likes, 0)}
          </p>
        </div>
        <div className="p-4 bg-[#0E0E0E] rounded-lg w-full">
          <p className="text-white text-base font-medium">Příspěvků</p>
          <p className="text-white text-2xl font-bold">{userPosts?.length}</p>
        </div>
      </div>
      <div role="button" className="pt-2 w-full">
        <div className="p-3 bg-white rounded-lg w-full">
          <p className="text-black text-base font-medium">Upravit profil</p>
        </div>
      </div>
      {userPosts?.map((post) => (
        <div>
          <p>{post.title}</p>
        </div>
      ))}
    </div>
  );
}
