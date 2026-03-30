"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

export function ThemeTransition({ length = 4 }: { length?: number }) {
  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed inset-0 z-[10000] flex flex-col items-center justify-center backdrop-blur-xl",
          "bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
        )}
      >
        {/* Sync Flavor: Pulsing Rectangles */}
        <div className="flex items-center gap-1.5 h-8">
          {Array.from({ length }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ height: 8, opacity: 0.3 }}
              animate={{
                height: [8, 20, 8],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
              className="w-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600"
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 dark:text-zinc-400 font-sans"
        >
          <span className="block dark:hidden">Switching to Light...</span>
          <span className="hidden dark:block">Switching to Darkness...</span>
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
}
