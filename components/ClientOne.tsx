"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { HeartIcon } from "lucide-react";
import React, { useEffect, useTransition } from "react";
import { clerkClient } from "@clerk/nextjs";
import { toast } from "sonner";

export const ClientOne = () => {
  const stories = useQuery(api.stories.stories);
  const like = useMutation(api.stories.giveLike);
  const onLike = (storyId: Id<"stories">, userId: string) => {
    const promise = like({ id: storyId, userId: userId });

    toast.promise(promise, {
      loading: "Přidávám like...",
      success: "Story bylo označeno jako oblíbené!",
      error: "Chyba při přidávání like!",
    });
  };

  if (!stories) {
    return <>No story.</>;
  }

  return (
    <>
      {stories.map((story) => {
        return (
          <div
            key={story.title}
            className="relative p-6 bg-[#1b1b1b] rounded-xl"
          >
            <h2 className="text-white font-semibold text-3xl">{story.title}</h2>
            <p className="text-white font-medium text-lg">{story.content}</p>
            <div
              role="button"
              onClick={() => {
                onLike(story._id, story.userId);
              }}
              className="bg-neutral-900 w-fit rounded-lg p-3 select-none flex gap-x-2 items-center absolute top-6 right-6"
            >
              <HeartIcon className="w-6 h-6 text-red-500" />
              <span className="text-white font-medium text-lg">
                {story.likes}
              </span>
            </div>
            <p>{story.name}</p>
          </div>
        );
      })}
    </>
  );
};

export default ClientOne;
