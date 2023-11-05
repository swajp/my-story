"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { csCZ } from "@clerk/localizations";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import React from "react";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={csCZ}>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
