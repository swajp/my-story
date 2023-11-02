"use client";
import { motion } from "framer-motion";

export default function UseAI() {
  return (
    <div className="mt-12 mb-24 flex flex-col items-center gap-14 max-w-4xl">
      <h1 className="text-4xl sm:text-2xl md:text-6xl font-bold text-white">
        Sdilej i příběhy generované umělou inteligencí!
      </h1>
      <motion.div
        initial={{ opacity: 0, rotate: 0, scale: 0.9 }}
        whileHover={{ scale: 1.1, rotate: 3 }}
        whileInView={{ scale: 1.1, rotate: 2, opacity: 1 }}
        className="  transition-all duration-300 ease-in-out"
      >
        <div className="w-60 md:w-96 p-8 md:p-12 bg-[#1b1b1b] rounded-lg flex items-center justify-center gap-4 text-4xl sm:text-2xl md:text-6xl">
          <p>🤖</p>
          <div className="flex">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-green-500 to-green-600 font-bold">
              #ai
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
