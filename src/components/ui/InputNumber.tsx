"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

export interface InputNumberProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  error?: string;
  placeholder?: string;
  className?: string;
  id?: string;
  align?: "left" | "center" | "right";
  disabled?: boolean;
}

export const InputNumber: React.FC<InputNumberProps> = ({
  value,
  onChange,
  label,
  error,
  placeholder = "0.00",
  className,
  id,
  align = "left",
  disabled = false,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const [displayValue, setDisplayValue] = React.useState(
    value === 0 ? "" : value.toString(),
  );
  const [prevValue, setPrevValue] = React.useState(value);
  const generatedId = React.useId();
  const inputId = id || generatedId;

  React.useEffect(() => {
    if (value !== prevValue) {
      setPrevValue(value);
      if (!isFocused) {
        setDisplayValue(value === 0 ? "" : value.toString());
      }
    }
  }, [value, prevValue, isFocused]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const val = e.target.value;

    if (val === "" || /^[0-9]*\.?[0-9]*$/.test(val)) {
      setDisplayValue(val);
      const parsed = parseFloat(val);
      onChange(isNaN(parsed) ? 0 : parsed);
    }
  };

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            "text-[10px] font-bold uppercase tracking-wider text-zinc-500 transition-colors",
            isFocused && "text-zinc-900 dark:text-zinc-50",
          )}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          type="text"
          inputMode="decimal"
          value={displayValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "w-full h-11 px-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl transition-all",
            "focus:outline-none focus:ring-2 focus:ring-zinc-900/5 dark:focus:ring-zinc-100/5 focus:border-zinc-900 dark:focus:border-zinc-100",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            align === "right" && "text-right",
            align === "center" && "text-center",
            error && "border-red-500",
          )}
        />
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="text-[10px] font-bold text-red-500 px-1 uppercase tracking-wider overflow-hidden"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};
