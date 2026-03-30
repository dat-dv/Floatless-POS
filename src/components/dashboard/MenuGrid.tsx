"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuCard } from "./MenuCard";
import { useMenuState } from "@/hooks/useMenuContext";
import { useOrderHandlers } from "@/hooks/useOrderContext";

export const MenuGrid: React.FC = () => {
  const { filteredItems, isLoading } = useMenuState();
  const { addToCart } = useOrderHandlers();

  return (
    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative font-sans">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-950/50 backdrop-blur-sm z-20"
          >
            <div className="flex flex-col items-center gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Loader2 size={40} className="text-zinc-400" />
              </motion.div>
              <span className="text-zinc-500 font-bold tracking-widest uppercase text-[10px]">
                Syncing Flavors...
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <MenuCard
                  key={item.id}
                  {...item}
                  priority={index < 8}
                  onAdd={() => addToCart(item)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
