"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { useOrderState, useOrderHandlers } from "@/hooks/useOrderContext";
import { formatCurrency } from "@/utils/format";
import { ReceiptTemplate } from "./ReceiptTemplate";
import { InputNumber } from "@/components/ui/InputNumber";
import { useDebugTools } from "@/hooks/useDebugTools";
import { ErrorCheckModal } from "./ErrorCheckModal";

interface OrderConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ErrorData {
  items: number;
  actual_js_number: string;
  mathematical_ideal_string: string;
  lost_precision_raw: string;
}

export const OrderConfirmModal: React.FC<OrderConfirmModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { cart, subtotal, tax, serviceFee, total } = useOrderState();
  const { clearCart, setServiceFee } = useOrderHandlers();
  const { clearAll } = useDebugTools();

  const [isErrorModalOpen, setIsErrorModalOpen] = React.useState(false);
  const [errorData, setErrorData] = React.useState<ErrorData | null>(null);

  const handleConfirm = () => {
    window.print();
    clearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/40 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] border border-zinc-100 dark:border-zinc-800"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-10 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm p-2 rounded-full"
            >
              <X size={24} />
            </button>

            <div className="space-y-8 overflow-y-auto p-6 md:p-8 pt-12 md:pt-14 w-full">
              <div className="text-center space-y-2">
                <div className="h-16 w-16 bg-emerald-100 dark:bg-emerald-500/20 rounded-3xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto mb-6">
                  <CheckCircle2 size={32} />
                </div>
                <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter uppercase">
                  Verify Order
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
                  Review the arithmetic for numeric bug demonstration.
                </p>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-950/50 rounded-[2.5rem] p-8 space-y-4 border border-zinc-100 dark:border-zinc-800">
                {/* 1. Subtotal (Items) */}
                <div className="flex justify-between items-baseline text-xs font-bold uppercase tracking-widest text-zinc-500">
                  <span>Subtotal</span>
                  <span className="text-zinc-900 dark:text-zinc-50 font-black break-all ml-4">
                    {formatCurrency(subtotal)}
                  </span>
                </div>

                {/* 2. VAT (10%) */}
                <div className="flex justify-between items-baseline text-xs font-bold uppercase tracking-widest text-zinc-500">
                  <span>VAT (10%)</span>
                  <span className="text-zinc-900 dark:text-zinc-50 font-black break-all ml-4">
                    {formatCurrency(tax)}
                  </span>
                </div>

                {/* 3. Total (Incl. VAT) - Intermediate Sum */}
                <div className="flex justify-between items-baseline text-[10px] font-black uppercase tracking-widest text-zinc-400 py-2 mt-2 border-t border-zinc-100 dark:border-zinc-800/50 italic bg-zinc-100/30 dark:bg-zinc-800/10 px-2 rounded-lg">
                  <span>Total (Incl. VAT)</span>
                  <span className="break-all ml-4 tracking-tighter">
                    {formatCurrency(subtotal + tax)}
                  </span>
                </div>

                {/* Fee Input - Disabled in Modal */}
                <div className="py-2">
                  <InputNumber
                    label="Fee"
                    value={serviceFee}
                    onChange={setServiceFee}
                    align="right"
                    disabled
                  />
                </div>

                {/* 4. Grand Total - THE FINAL BUGGY RESULT */}
                <div className="pt-4 border-t border-dotted border-zinc-300 dark:border-zinc-700 flex flex-col items-end gap-1">
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                    Grand Total
                  </span>
                  <span className="text-4xl font-black text-zinc-900 dark:text-zinc-50 tracking-tighter leading-none break-all text-right w-full">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              {/* Action Buttons Section */}
              <div className="flex flex-col gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const toBig = (v: number) =>
                      BigInt(Math.round(v * 1_000_000));
                    const formatBig = (b: bigint) => {
                      const s = b.toString().padStart(7, "0");
                      return s.slice(0, -6) + "." + s.slice(-6);
                    };

                    const subtotalBig = cart.reduce(
                      (acc, item) =>
                        acc + toBig(item.price) * BigInt(item.quantity),
                      BigInt(0),
                    );
                    const taxBig = (subtotalBig * BigInt(10)) / BigInt(100);
                    const totalBig = subtotalBig + taxBig + toBig(serviceFee);

                    const actualTotalBig = toBig(total);
                    const diffBig = actualTotalBig - totalBig;

                    const payload = {
                      items: cart.length,
                      actual_js_number: total.toString(),
                      mathematical_ideal_string: formatBig(totalBig),
                      lost_precision_raw: diffBig.toString(),
                    };

                    setErrorData(payload);
                    setIsErrorModalOpen(true);
                  }}
                  className="w-full h-14 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 rounded-2xl font-black uppercase text-xs tracking-[0.1em] transition-all hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 shadow-sm"
                >
                  Check Error
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleConfirm}
                  className="w-full h-16 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-950 rounded-[2rem] font-black uppercase text-sm tracking-[0.2em] shadow-2xl transition-all duration-300"
                >
                  Confirm & Print Receipt
                </motion.button>

                <button
                  onClick={clearAll}
                  className="w-full text-[9px] font-black uppercase tracking-widest text-rose-400 hover:text-rose-600 transition-colors pt-1"
                >
                  [ Clear All Data ]
                </button>
              </div>
            </div>

            <ErrorCheckModal
              isOpen={isErrorModalOpen}
              onClose={() => setIsErrorModalOpen(false)}
              data={errorData}
            />

            {/* PRINT TEMPLATE */}
            <div className="hidden print:block">
              <ReceiptTemplate
                cart={cart}
                subtotal={subtotal}
                tax={tax}
                serviceFee={serviceFee}
                total={total}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
