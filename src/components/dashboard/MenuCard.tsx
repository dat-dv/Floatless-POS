"use client";

import React from "react";
import { motion } from "framer-motion";
import { Plus, TrendingUp } from "lucide-react";
import { MenuItem } from "@/types";
import Image from "next/image";
import { formatCurrency } from "@/utils/format";

interface MenuCardProps extends MenuItem {
  onAdd: () => void;
  priority?: boolean;
}

export const MenuCard: React.FC<MenuCardProps> = ({
  name,
  price,
  image,
  description,
  calories,
  popular,
  onAdd,
  priority = false, // Mặc định không ưu tiên để được Lazy Load
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative flex flex-col bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-xl"
    >
      <div className="relative h-56 w-full overflow-hidden isolate">
        <Image
          src={image}
          alt={name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />

        {/* Simple static overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {popular && (
          <div className="absolute top-5 right-5 z-10">
            <div className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 text-zinc-900 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl">
              <TrendingUp size={12} strokeWidth={3} />
              Chef&apos;s Pick
            </div>
          </div>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onAdd();
          }}
          className="absolute bottom-5 right-5 z-10 h-14 w-14 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 rounded-2xl flex items-center justify-center shadow-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <Plus size={24} strokeWidth={3} />
        </button>
      </div>

      <div className="p-8 space-y-4">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <h3 className="text-lg font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
              {name}
            </h3>
            {calories && (
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest opacity-60">
                {calories} kcal • Natural Ingredients
              </p>
            )}
          </div>
          <span className="text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter">
            {formatCurrency(price)}
          </span>
        </div>

        <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-medium line-clamp-2">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
