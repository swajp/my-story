"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function StartWriting() {
  return (
    <div className="mt-12 mb-24 flex flex-col items-center gap-14 max-w-4xl">
      <h1 className="text-4xl sm:text-2xl md:text-6xl font-bold text-white">
        Stačí se zaregistrovat a můžeš začít psát!
      </h1>
      <Link href="#">
        <motion.div
          initial={{ opacity: 0, rotate: 0, scale: 0.9 }}
          whileHover={{ scale: 1.1, rotate: 3 }}
          whileInView={{ scale: 1.1, rotate: 2, opacity: 1 }}
          className="  transition-all duration-300 ease-in-out cursor-pointer"
        >
          <div className="w-60 md:w-96 p-8 md:p-12 bg-[#1b1b1b] rounded-lg flex items-center justify-center gap-4 text-4xl sm:text-2xl md:text-6xl">
            <p>✍️</p>
            <div className="flex">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 font-bold">
                letsgo!
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  );
}
