"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  rightIcon?: LucideIcon;
  floatingLabel?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      error,
      icon: Icon,
      rightIcon: RightIcon,
      floatingLabel = true,
      onFocus,
      onBlur,
      id,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);
    const generatedId = React.useId();
    const inputId = id || generatedId;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      onBlur?.(e);
    };

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
      setHasValue(!!(e.target as HTMLInputElement).value);
    };

    const isFloating = floatingLabel && (isFocused || hasValue || props.value);

    return (
      <div className="group relative w-full flex flex-col gap-1.5 pt-4">
        <div className="relative flex items-center">
          {Icon && (
            <div className="absolute left-3.5 text-zinc-400 transition-colors duration-200 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-50">
              <Icon size={18} strokeWidth={2} />
            </div>
          )}

          <input
            id={inputId}
            type={type}
            className={cn(
              "peer w-full h-12 bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-md rounded-xl border border-zinc-200 dark:border-zinc-800",
              "px-4 py-2 text-base font-medium transition-all duration-300",
              "placeholder:text-transparent focus:placeholder:text-zinc-400",
              "focus:outline-none focus:ring-2 focus:ring-zinc-900/10 dark:focus:ring-zinc-100/10 focus:border-zinc-900 dark:focus:border-zinc-100",
              "disabled:cursor-not-allowed disabled:opacity-50",
              Icon && "pl-11",
              RightIcon && "pr-11",
              error &&
                "border-red-500 focus:ring-red-500/10 focus:border-red-500 dark:border-red-500/50",
              className,
            )}
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onInput={handleInput}
            {...props}
          />

          {RightIcon && (
            <div className="absolute right-3.5 text-zinc-400 transition-colors duration-200 group-focus-within:text-zinc-900 dark:group-focus-within:text-zinc-50">
              <RightIcon size={18} strokeWidth={2} />
            </div>
          )}

          {label && (
            <motion.label
              htmlFor={inputId}
              initial={false}
              animate={{
                y: isFloating ? -28 : 0,
                x: isFloating ? -4 : Icon ? 28 : 2,
                scale: isFloating ? 0.85 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
              className={cn(
                "absolute left-2 pointer-events-none text-zinc-500 transition-colors duration-200",
                isFocused && "text-zinc-900 dark:text-zinc-50 font-medium",
              )}
            >
              {label}
            </motion.label>
          )}

          {/* Animated focus underline/border highlight */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 dark:bg-zinc-50 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: isFocused ? 0.3 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ height: 0, opacity: 0, y: -5 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -5 }}
              className="text-sm font-medium text-red-500 px-1"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
