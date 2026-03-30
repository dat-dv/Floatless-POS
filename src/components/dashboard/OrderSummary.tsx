"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useOrderState, useOrderHandlers } from "@/hooks/useOrderContext";
import { OrderConfirmModal } from "./OrderConfirmModal";
import { InputNumber } from "@/components/ui/InputNumber";
import { useDebugTools } from "@/hooks/useDebugTools";

export const OrderSummary: React.FC = () => {
  const { cart, serviceFee } = useOrderState();
  const { setServiceFee } = useOrderHandlers();
  const { injectMassiveItems, inject03Error, clearAll } = useDebugTools();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isOrderAllowed = cart.length > 0;

  return (
    <>
      <div className="p-8 bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800 space-y-6">
        {/* Engineering Bug Tools - STAYING OUTSIDE AS REQUESTED */}
        <div className="px-1 space-y-4">
          <InputNumber
            label="Fee"
            value={serviceFee}
            onChange={setServiceFee}
            align="right"
          />

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={inject03Error}
              className="h-9 px-2 py-1 rounded-xl bg-amber-500 text-white text-[9px] font-black uppercase tracking-[0.1em] hover:bg-amber-600 active:scale-95 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center border border-amber-400/30"
            >
              0.1+0.2 Bug
            </button>
            <button
              onClick={injectMassiveItems}
              className="h-9 px-2 py-1 rounded-xl bg-rose-500 text-white text-[9px] font-black uppercase tracking-[0.1em] hover:bg-rose-600 active:scale-95 transition-all shadow-lg shadow-rose-500/20 flex items-center justify-center border border-rose-400/30"
            >
              Massive Bug
            </button>
          </div>

          <button
            onClick={clearAll}
            className="w-full text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-rose-500 transition-colors py-1"
          >
            [ Reset All Data ]
          </button>
        </div>

        {/* Action Button */}
        <motion.button
          disabled={!isOrderAllowed}
          whileHover={isOrderAllowed ? { scale: 1.02, y: -1 } : {}}
          whileTap={isOrderAllowed ? { scale: 0.98 } : {}}
          onClick={() => setIsModalOpen(true)}
          className="w-full h-14 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 rounded-2xl font-black uppercase text-[11px] tracking-[0.15em] shadow-xl hover:shadow-zinc-500/10 dark:hover:shadow-white/5 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-20 disabled:grayscale disabled:cursor-not-allowed group"
        >
          <span>Review & Checkout ({cart.length})</span>
          <ChevronRight
            size={14}
            className="group-hover:translate-x-0.5 transition-transform"
            strokeWidth={3}
          />
        </motion.button>
      </div>

      <OrderConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
