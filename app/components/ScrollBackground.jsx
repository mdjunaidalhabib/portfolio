"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useDarkMode } from "../context/DarkModeProvider";
export default function ScrollBackground({ children }) {
  const { scrollYProgress } = useScroll();
  const { isDarkMode } = useDarkMode();

  const backgroundColor = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const lightBgColor = useTransform(
    backgroundColor,
    [0, 0.33, 0.66, 1],
    [
      "linear-gradient(to right, #ff6a00, #ee0979)",
      "linear-gradient(to right, #ff4e50, #f9d423)",
      "linear-gradient(to right, #43cea2, #185a9d)",
      "linear-gradient(to right, #000428, #004e92)",
    ]
  );

  return (
    <div className="relative min-h-screen flex flex-col transition-all duration-1000">
      <motion.div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: "linear-gradient(to right, #030712, #030712)",
          opacity: isDarkMode ? 1 : 0,
        }}
      />

      <motion.div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          background: lightBgColor,
          opacity: isDarkMode ? 0 : 1,
        }}
      />

      <div
        className="relative z-10 text-center"
        style={{ color: isDarkMode ? "white" : "black" }}
      >
        {children}
      </div>
    </div>
  );
}
