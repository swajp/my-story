"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { connect } from "http2";
import React from "react";
import { toast } from "sonner";

export default function PostForm() {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const create = useMutation(api.stories.create);
  const onCreate = () => {
    const promise = create({ title, content });
    toast.promise(promise, {
      loading: "Příběh se zveřejňuje...",
      success: "Příběh byl zveřejněn!",
      error: "Příběh se nepodařilo zveřejnit.",
    });
    promise.then(() => {
      setTitle("");
      setContent("");
    });
  };
  return (
    <div className=" max-w-4xl mx-auto p-8 bg-[#1b1b1b] rounded-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onCreate();
        }}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl text-white font-bold">Název příbehu</h1>
          <input
            className="p-3 rounded-xl bg-[#2b2b2b] text-white font-medium"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            value={title}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl text-white font-bold">Obsah příběhu</h1>
          <textarea
            className="p-3 whitespace-pre-line rounded-xl bg-[#2b2b2b] text-white font-medium h-64"
            onChange={(e) => {
              setContent(e.target.value);
            }}
            value={content}
          />
        </div>
        <Button className="bg-[#2b2b2b]" type="submit">
          Zveřejnit
        </Button>
      </form>
    </div>
  );
}
