"use client";

import React from "react";
import Link from "next/link";
import { useOrderState } from "@/hooks/useOrderContext";
import { AlertCircle, CheckCircle2, ArrowRightLeft } from "lucide-react";
import { motion } from "framer-motion";

export const VersionSwitcher: React.FC = () => {
  const { mode } = useOrderState();
  const isBuggy = mode === "buggy";

  return (
    <Link href={isBuggy ? "/fixed" : "/"} prefetch={false}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2 text-[10px] font-black px-4 h-9 rounded-2xl shadow-sm border uppercase tracking-widest transition-all cursor-pointer ${
          isBuggy
            ? "bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 shadow-rose-500/5"
            : "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 shadow-emerald-500/5"
        }`}
      >
        {isBuggy ? (
          <AlertCircle size={12} strokeWidth={3} />
        ) : (
          <CheckCircle2 size={12} strokeWidth={3} />
        )}
        <span className="hidden sm:inline">
          Engine: {isBuggy ? "Buggy" : "Fixed"}
        </span>
        <ArrowRightLeft className="opacity-40" size={10} strokeWidth={3} />
      </motion.div>
    </Link>
  );
};
