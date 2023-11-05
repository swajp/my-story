"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { HeartIcon } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";

export const ClientOne = () => {
  const { isAuthenticated } = useConvexAuth();
  const stories = useQuery(api.stories.stories);
  const like = useMutation(api.stories.giveLike);
  const onLike = (storyId: Id<"stories">, userId: string) => {
    const promise = like({ id: storyId, userId: userId });

    toast.promise(promise, {
      loading: "Přidávám like...",
      success: "Hotovo!",
      error: "Chyba při přidávání like!",
    });
  };

  if (!stories) {
    return <>No story.</>;
  }

  return (
    <>
      {isAuthenticated && (
        <div className="flex justify-end">
          <Link href="/create-story">
            <div role="button" className="p-2 px-3 bg-white w-fit rounded-lg">
              <p className=" font-medium ">Napsat příběh</p>
            </div>
          </Link>
        </div>
      )}
      {stories.map((story) => {
        return (
          <div
            key={story.title}
            className="relative p-6 bg-[#1b1b1b] rounded-xl"
          >
            <div className="flex justify-between items-center pb-2">
              <h2 className="text-white font-semibold text-3xl">
                {story.title}
              </h2>
              {isAuthenticated ? (
                <div
                  role="button"
                  onClick={() => {
                    onLike(story._id, story.userId);
                  }}
                  className="bg-neutral-900 w-fit rounded-lg p-3 select-none flex gap-x-2 items-center "
                >
                  <HeartIcon className="w-6 h-6 text-red-500" />
                  <span className="text-white font-medium text-lg">
                    {story.likes}
                  </span>
                </div>
              ) : (
                <div className="bg-neutral-900 w-fit rounded-lg p-3 select-none flex gap-x-2 items-center absolute top-6 right-6">
                  <HeartIcon className="w-6 h-6 text-red-500" />
                  <span className="text-white font-medium text-lg">
                    {story.likes}
                  </span>
                </div>
              )}
            </div>
            {story.content.split("\n").map((line, index) => (
              <p className="text-white font-medium text-lg" key={index}>
                {line}
              </p>
            ))}

            <div className="flex gap-2 items-center pt-4">
              <Image
                width={32}
                className="rounded-full w-fit h-fit"
                height={32}
                src={story.image}
                alt="Profile picture"
              />
              <p className="font-semibold text-white">{story.name}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ClientOne;
