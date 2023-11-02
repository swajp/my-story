import React from "react";
import Heading from "./_components/heading";
import CoverImage from "./_components/cover-image";
import GetHearts from "./_components/get-hearts";
import UseAI from "./_components/use-ai";
import StartWriting from "./_components/start-writing";

export default function Home() {
  return (
    <div className="min-h-full bg-[#0E0E0E] flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center flex-1 px-6">
        <Heading />
        <CoverImage />
        <GetHearts />
        <UseAI />
        <StartWriting />
      </div>
    </div>
  );
}
