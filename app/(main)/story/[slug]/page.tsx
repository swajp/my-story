"use client";
import { api } from "@/convex/_generated/api";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import React from "react";

import Image from "next/image";
import { HeartIcon } from "lucide-react";
import { SignInButton, useUser } from "@clerk/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import Link from "next/link";
import Spinner from "@/components/spinner";

export default function UserPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const { isAuthenticated } = useConvexAuth();
  const { user } = useUser();

  const story = useQuery(api.stories.story, {
    id: slug,
  });

  const like = useMutation(api.stories.giveLike);
  const onLike = (storyId: Id<"stories">, userId: string) => {
    const promise = like({ id: storyId, userId: userId });

    toast.promise(promise, {
      loading: "Přidávám like...",
      success: "Hotovo!",
      error: "Chyba při přidávání like!",
    });
  };

  if (!story) {
    return (
      <div className="flex items-center justify-center content-center">
        <Spinner size={"lg"} />
      </div>
    );
  }

  if (!story[0]) {
    return (
      <div className="flex items-center justify-center content-center">
        <div className="text-white font-medium text-2xl">
          Tento příběh neexistuje.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col gap-4 max-w-xl mx-auto">
        <div className="relative p-6 bg-[#1b1b1b] rounded-xl">
          <div className="flex justify-between items-center pb-2">
            <h2 className="text-white font-semibold text-xl md:text-3xl">
              {story[0].title}
            </h2>
            {isAuthenticated ? (
              <div
                role="button"
                onClick={() => {
                  onLike(story[0]._id, story[0].userId);
                }}
                className="bg-neutral-900 w-fit rounded-lg p-3 select-none flex gap-x-2 items-center "
              >
                <HeartIcon
                  className={`w-6 h-6 ${
                    story[0].likedBy.includes(user?.id || "")
                      ? "text-red-500 fill-red-500"
                      : "text-gray-500"
                  }`}
                />
                <span className="text-white font-medium text-lg">
                  {story[0].likes}
                </span>
              </div>
            ) : (
              <SignInButton mode="modal">
                <div
                  role="button"
                  className="bg-neutral-900 w-fit rounded-lg p-3 select-none flex gap-x-2 items-center absolute top-6 right-6"
                >
                  <HeartIcon className="w-6 h-6 text-red-500" />
                  <span className="text-white font-medium text-lg">
                    {story[0].likes}
                  </span>
                </div>
              </SignInButton>
            )}
          </div>
          {story[0].content.split("\n").map((line, index) => (
            <p
              className="text-white font-medium text-base md:text-lg"
              key={index}
            >
              {line}
            </p>
          ))}

          <div className="flex gap-2 items-center pt-4">
            <Image
              width={32}
              className="rounded-full w-fit h-fit"
              height={32}
              src={story[0].image}
              alt="Profile picture"
            />
            <Link href={`/user/${story[0].userId}`}>
              <p className="font-semibold text-white">{story[0].name}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
