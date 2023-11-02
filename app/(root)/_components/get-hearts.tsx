"use client";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";

export default function GetHearts() {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    if (isCounting) {
      const animation = animate(count, 3578, {
        duration: 1.2,
      });

      return animation.stop;
    }
  }, [isCounting]);

  const handleStartCounting = () => {
    setIsCounting(true);
  };

  return (
    <div className="flex flex-col items-center gap-14 my-24">
      <h1 className="text-4xl sm:text-2xl md:text-6xl font-bold text-white">
        Naber na své popularitě!
      </h1>
      <motion.div
        onClick={handleStartCounting}
        initial={{ opacity: 0, rotate: 0, scale: 0.9 }}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1, rotate: 3 }}
        whileInView={{ scale: 1.1, rotate: 2, opacity: 1 }}
        className=" cursor-pointer transition-all duration-300 ease-in-out"
      >
        <div className="w-60 md:w-96 p-8 md:p-12 bg-[#1b1b1b] rounded-lg flex items-center justify-center gap-4 text-4xl sm:text-2xl md:text-6xl">
          <p>❤️</p>
          <div className="flex bg-clip-text text-transparent bg-gradient-to-r from-red-400 via-red-500 to-red-600">
            <motion.div className=" font-bold">{rounded}</motion.div>
            <span className="">+</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
