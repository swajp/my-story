"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { HeartIcon, Trash, TrashIcon } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import Spinner from "../../../../components/spinner";
import { SignInButton, useUser } from "@clerk/nextjs";

export default function Stories() {
  const { isAuthenticated } = useConvexAuth();
  const { user } = useUser();
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

  const deleteStory = useMutation(api.stories.deleteStory);
  const onDelete = (storyId: Id<"stories">) => {
    const promise = deleteStory({ id: storyId });

    toast.promise(promise, {
      loading: "Mažu příběh...",
      success: "Hotovo!",
      error: "Chyba při mazání příběhu!",
    });
  };

  if (!stories) {
    return (
      <div className="flex items-center justify-center content-center">
        <Spinner size={"lg"} />
      </div>
    );
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
              <Link href={`/story/${story._id}`}>
                <h2 className="text-white font-semibold text-xl md:text-3xl">
                  {story.title}
                </h2>
              </Link>
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  {story.userId === user?.id && (
                    <div
                      role="button"
                      className="bg-neutral-900 w-fit rounded-lg p-3 select-none flex gap-x-2 items-center "
                      onClick={() => {
                        onDelete(story._id);
                      }}
                    >
                      <TrashIcon className="w-6 h-6 text-gray-500" />
                    </div>
                  )}
                  <div
                    role="button"
                    onClick={() => {
                      onLike(story._id, story.userId);
                    }}
                    className="bg-neutral-900 w-fit rounded-lg p-3 select-none flex gap-x-2 items-center "
                  >
                    <HeartIcon
                      className={`w-6 h-6 ${
                        story.likedBy.includes(user?.id || "")
                          ? "text-red-500 fill-red-500"
                          : "text-gray-500"
                      }`}
                    />
                    <span className="text-white font-medium text-lg">
                      {story.likes}
                    </span>
                  </div>
                </div>
              ) : (
                <SignInButton mode="modal">
                  <div
                    role="button"
                    className="bg-neutral-900 w-fit rounded-lg p-3 select-none flex gap-x-2 items-center absolute top-6 right-6"
                  >
                    <HeartIcon className="w-6 h-6 text-red-500" />
                    <span className="text-white font-medium text-lg">
                      {story.likes}
                    </span>
                  </div>
                </SignInButton>
              )}
            </div>
            {story.content.split("\n").map((line, index) => (
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
                src={story.image}
                alt="Profile picture"
              />
              <Link href={`/user/${story.userId}`}>
                <p className="font-semibold text-white">{story.name}</p>
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
}
