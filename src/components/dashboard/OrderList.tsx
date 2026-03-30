"use client";

import React from "react";
import { AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { CartItem } from "./CartItem";
import { useOrderState, useOrderHandlers } from "@/hooks/useOrderContext";

export const OrderList: React.FC = () => {
  const { cart } = useOrderState();
  const { addToCart, removeFromCart } = useOrderHandlers();

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
      <AnimatePresence mode="popLayout" initial={false}>
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-zinc-300 dark:text-zinc-600 space-y-4">
            <div className="h-20 w-20 rounded-full border-4 border-dotted border-current flex items-center justify-center opacity-20">
              <ShoppingBag size={32} />
            </div>
            <p className="text-xs font-black uppercase tracking-widest opacity-40">
              Your tray is empty
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                {...item}
                onAdd={() => addToCart(item)}
                onRemove={() => removeFromCart(item.id)}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
