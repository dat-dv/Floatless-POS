"use client";

import React from "react";
import { ShoppingBag } from "lucide-react";

export const OrderHeader: React.FC = () => {
  return (
    <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/10 dark:bg-zinc-900/10">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 rounded-2xl shadow-xl rotate-[-4deg]">
          <ShoppingBag size={20} strokeWidth={3} />
        </div>
        <div>
          <h2 className="text-lg font-black text-zinc-900 dark:text-zinc-50 tracking-tighter uppercase leading-none">
            Your Order
          </h2>
          <p className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.2em] opacity-50 mt-1">
            Review your selected dishes
          </p>
        </div>
      </div>
    </div>
  );
};
