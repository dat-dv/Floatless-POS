"use client";

import React from "react";
import { cn } from "@/utils/cn";

interface PrintContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PrintContainer: React.FC<PrintContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("hidden print:block", className)}>
      <div className="receipt-content">{children}</div>
    </div>
  );
};
