"use client";

import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Heading() {
  const { isAuthenticated, isLoading } = useConvexAuth();

  return (
    <div className="max-w-7xl space-y-4">
      <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white">
        Připoj se do naši komunity a začni sdílet své příběhy s ostatními lidmi.
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-base text-muted-foreground">
        Ať už začínáš s psaním nebo jsi zkušený autor, tohle je místo pro tebe.
        Pokud máš rád jen čtení, a zaujme tě nějaký příběh, můžeš ho ocenit
        <motion.button
          whileTap={{ scale: 2.1, rotate: 20, backgroundColor: "#FF69B4" }}
          whileHover={{ scale: 0.9, backgroundColor: "#FF69B4" }}
          className="ml-2 p-3 rounded-lg bg-[#1b1b1b] text-sm transition-all duration-200 ease-in-out"
        >
          ❤️
        </motion.button>
      </h3>
      <div className="flex gap-x-4 items-center justify-center pt-4">
        <Button asChild className="px-8 py-6 text-base">
          <Link href="/stories">Začít číst</Link>
        </Button>
        {isLoading && <Spinner size={"lg"} />}
        {!isLoading && !isAuthenticated && (
          <Button
            className="px-8 py-6 text-base hover:bg-white/90 bg-white text-black"
            asChild
          >
            <SignInButton mode="modal">
              <div role="button">
                Začít psát <ArrowRight color="black" className="h-4 w-4 ml-2" />
              </div>
            </SignInButton>
          </Button>
        )}
        {!isLoading && isAuthenticated && (
          <Button
            className="px-8 py-6 text-base hover:bg-white/90 bg-white text-black"
            asChild
          >
            <Link href="/create-story">
              Začít psát <ArrowRight color="black" className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
