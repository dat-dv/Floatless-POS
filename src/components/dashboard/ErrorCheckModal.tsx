"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShieldAlert, ShieldCheck, Code, Zap } from "lucide-react";

interface ErrorData {
  items: number;
  actual_js_number: string;
  mathematical_ideal_string: string;
  lost_precision_raw: string;
}

interface ErrorCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ErrorData | null;
}

export const ErrorCheckModal: React.FC<ErrorCheckModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  if (!data) return null;

  const hasError = data.lost_precision_raw !== "0";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[11000] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-white/40 dark:bg-zinc-950/60 backdrop-blur-2xl"
          />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 40 }}
            className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-[3rem] shadow-[-20px_-20px_60px_rgba(255,255,255,0.8),20px_20px_60px_rgba(0,0,0,0.1)] dark:shadow-none overflow-hidden border border-white dark:border-zinc-800"
          >
            {/* Header */}
            <div
              className={`p-8 flex items-center justify-between border-b ${
                hasError
                  ? "bg-rose-500/5 border-rose-500/10"
                  : "bg-emerald-500/5 border-emerald-500/10"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`h-12 w-12 rounded-2xl flex items-center justify-center ${
                    hasError
                      ? "bg-rose-500 text-white"
                      : "bg-emerald-500 text-white"
                  }`}
                >
                  {hasError ? (
                    <ShieldAlert size={24} />
                  ) : (
                    <ShieldCheck size={24} />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase tracking-tighter">
                    {hasError ? "Precision Corrupted" : "Integrity Validated"}
                  </h3>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                    Arithmetic vs Binary Floating Point
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="h-10 w-10 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all border border-zinc-100 dark:border-zinc-700 shadow-sm"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-8">
              {/* Main Comparison */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    Native JS (Number)
                  </span>
                  <div className="text-2xl font-black text-rose-500 tracking-tighter break-all">
                    ${data.actual_js_number}
                  </div>
                  <p className="text-[9px] font-medium text-zinc-500 leading-relaxed uppercase opacity-60">
                    IEEE 754 precision loss detected in mantissa.
                  </p>
                </div>

                <div className="space-y-2 p-6 rounded-3xl bg-emerald-500/5 dark:bg-emerald-500/5 border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                    Mathematical Ideal
                  </span>
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 tracking-tighter break-all">
                    ${data.mathematical_ideal_string}
                  </div>
                  <p className="text-[9px] font-medium text-emerald-600/60 leading-relaxed uppercase opacity-60">
                    Deterministic BigInt Calculation (No Rounding).
                  </p>
                </div>
              </div>

              {/* Error Breakdown */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 px-1">
                  <Zap
                    size={14}
                    className={hasError ? "text-rose-500" : "text-emerald-500"}
                  />
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    Error Metrics
                  </h4>
                </div>

                <div className="bg-zinc-900 rounded-[2rem] p-6 text-zinc-400 font-mono text-xs overflow-hidden relative">
                  <div className="flex justify-between items-center py-2 border-b border-zinc-800">
                    <span>Lost Precision (Raw Scaled):</span>
                    <span
                      className={
                        hasError
                          ? "text-rose-400 font-black"
                          : "text-emerald-400"
                      }
                    >
                      {data.lost_precision_raw} units
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Status:</span>
                    <span
                      className={
                        hasError
                          ? "text-rose-400 font-black"
                          : "text-emerald-400"
                      }
                    >
                      {hasError ? "FAIL" : "PASS"}
                    </span>
                  </div>
                  <Code
                    size={40}
                    className="absolute -bottom-4 -right-4 opacity-5 rotate-12"
                  />
                </div>
              </div>

              {/* Education Note */}
              <p className="text-center text-[10px] font-bold text-zinc-400 uppercase tracking-tighter max-w-sm mx-auto leading-relaxed">
                {hasError
                  ? "NOTICE: This discrepancy creates massive financial risks if used in production POS systems without BigInt or Decimal protection."
                  : "All arithmetic operations have been verified for integrity against common floating-point error patterns."}
              </p>
            </div>

            <div className="p-8 bg-zinc-50 dark:bg-zinc-950/50 border-t border-zinc-100 dark:border-zinc-800">
              <button
                onClick={onClose}
                className="w-full h-14 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-3xl font-black uppercase text-xs tracking-widest shadow-xl"
              >
                Keep Reviewing Order
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
