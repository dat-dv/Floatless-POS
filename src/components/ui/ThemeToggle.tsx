"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme, useThemeHandler } from "@/hooks/useThemeContext";

export const ThemeToggle: React.FC = () => {
  const { theme } = useTheme();
  const { toggleTheme } = useThemeHandler();

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm transition-colors overflow-hidden"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: 15, rotate: 45, opacity: 0 }}
          animate={{ y: 0, rotate: 0, opacity: 1 }}
          exit={{ y: -15, rotate: -45, opacity: 0 }}
          transition={{ duration: 0.2, ease: "backOut" }}
        >
          {theme === "light" ? (
            <Sun size={20} strokeWidth={2.5} />
          ) : (
            <Moon size={20} strokeWidth={2.5} />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};
