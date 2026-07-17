"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Hide the preloader after 4 seconds
    const timer = setTimeout(() => {
      setShow(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black overflow-hidden"
        >
          {/* Aesthetic Background - BMW Drift GIF */}
          <motion.div
            initial={{ scale: 1.2, filter: "blur(10px)" }}
            animate={{ scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full opacity-60"
          >
            {/* Using a high-quality tenor gif for the BMW drift */}
            <Image
              src="https://media.tenor.com/FwIeF3p9b-wAAAAd/bmw-m4.gif"
              alt="BMW Drift"
              fill
              className="object-cover grayscale brightness-75 mix-blend-screen"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          {/* Glitch / Aesthetic Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center justify-center text-center"
          >
            <motion.h1
              initial={{ letterSpacing: "10px", opacity: 0 }}
              animate={{ letterSpacing: "2px", opacity: 1 }}
              transition={{ delay: 1.5, duration: 1.5, ease: "circOut" }}
              className="text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-widest text-white mix-blend-difference"
            >
              Welcome to
              <br />
              <span className="text-primary mt-2 block bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
                PC Verse
              </span>
            </motion.h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "200px" }}
              transition={{ delay: 2.5, duration: 1, ease: "easeInOut" }}
              className="h-[2px] bg-white mt-8 opacity-50"
            />
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 0.5 }}
              className="text-xs tracking-[0.5em] uppercase text-white/50 mt-4"
            >
              Initializing Core Systems
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
