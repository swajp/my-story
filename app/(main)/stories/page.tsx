"use client";

import { api } from "@/convex/_generated/api";
import { clerkClient } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { HeartIcon } from "lucide-react";
import React from "react";

export default function StoriesPage() {
  const stories = useQuery(api.stories.stories);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col gap-4 max-w-xl mx-auto">
        {stories &&
          stories.map((story) => (
            <div key={story.title} className="p-6 bg-[#1b1b1b] rounded-xl">
              <h2 className="text-white font-semibold text-3xl">
                {story.title}
              </h2>
              <p className="text-white font-medium text-lg">{story.content}</p>
              <div
                role="button"
                className="bg-neutral-900 w-fit rounded-lg p-3 select-none flex gap-x-2 items-center"
              >
                <HeartIcon className="w-6 h-6 text-red-500" />
                <span className="text-white font-medium text-lg">
                  {story.likes}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
