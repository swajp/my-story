import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "./ui/button";
import { DollarSign } from "lucide-react";
import Link from "next/link";

export default function Support() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link target="_blank" href={"https://www.buymeacoffee.com/drie"}>
            <div role="button" className="bg-[#1b1b1b] p-3 rounded-lg">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Podpořte tento projekt!</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
