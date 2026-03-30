"use client";

import React from "react";
import { Search, UtensilsCrossed, Coffee, Clock, Info } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { cn } from "@/utils/cn";
import { MenuCategory } from "@/types";
import Link from "next/link";
import { motion } from "framer-motion";

import { useMenuState, useMenuHandlers } from "@/hooks/useMenuContext";
import { ThemeToggle } from "../ui/ThemeToggle";
import { VersionSwitcher } from "../ui/VersionSwitcher";

export const MenuHeader: React.FC = () => {
  const { activeCategory, searchQuery } = useMenuState();
  const { setCategory, setSearchQuery } = useMenuHandlers();
  return (
    <header className="px-8 py-6 space-y-6 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 uppercase">
            The Bistro Menu
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
            Select items to build your order.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 text-xs font-black bg-zinc-100 dark:bg-zinc-800 px-4 py-2 rounded-2xl shadow-inner uppercase tracking-widest text-zinc-900 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-700 h-9">
            <Clock size={14} className="text-emerald-500" strokeWidth={3} />
            <span>Prep: 15-20m</span>
          </div>
          
          <VersionSwitcher />

          <Link href="/why">
             <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-[10px] font-black px-4 h-9 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 border border-zinc-200 dark:border-zinc-700 uppercase tracking-widest transition-all shadow-sm cursor-pointer"
             >
                <Info size={12} strokeWidth={3} />
                <span className="hidden sm:inline">Learn Why</span>
             </motion.div>
          </Link>

          <ThemeToggle />
        </div>
      </div>

      <div className="flex items-end gap-4 h-12">
        <div className="flex-1">
          <Input
            placeholder="Search flavors..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-zinc-100/50 dark:bg-zinc-800/50 border-none shadow-sm pt-0"
          />
        </div>

        <div className="flex h-full p-1 bg-zinc-200/50 dark:bg-zinc-800 rounded-2xl font-medium shadow-inner">
          <button
            onClick={() => setCategory(MenuCategory.FOOD)}
            className={cn(
              "flex items-center gap-2 px-6 h-full rounded-xl text-xs font-black transition-all duration-300 uppercase tracking-widest",
              activeCategory === MenuCategory.FOOD
                ? "bg-white dark:bg-zinc-700 shadow-xl text-zinc-900 dark:text-zinc-50 scale-[1.02]"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300",
            )}
          >
            <UtensilsCrossed size={14} strokeWidth={3} />
            Dishes
          </button>
          <button
            onClick={() => setCategory(MenuCategory.DRINK)}
            className={cn(
              "flex items-center gap-2 px-6 h-full rounded-xl text-xs font-black transition-all duration-300 uppercase tracking-widest",
              activeCategory === MenuCategory.DRINK
                ? "bg-white dark:bg-zinc-700 shadow-xl text-zinc-900 dark:text-zinc-50 scale-[1.02]"
                : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300",
            )}
          >
            <Coffee size={14} strokeWidth={3} />
            Drinks
          </button>
        </div>
      </div>
    </header>
  );
};
