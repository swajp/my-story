import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full bg-[#0E0E0E]">
      <main className="pt-32">{children}</main>
    </div>
  );
}
