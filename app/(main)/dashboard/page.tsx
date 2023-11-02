import React from "react";
import UserCard from "./_components/user-card";

export default function DashboardPage() {
  return (
    <div className="min-h-full bg-[#0E0E0E] flex flex-col">
      <div className="flex flex-col items-center justify-center md:justify-start text-center flex-1 px-6">
        <UserCard />
      </div>
    </div>
  );
}
