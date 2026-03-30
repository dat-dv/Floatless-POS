"use client";

import React from "react";
import { useOrderState } from "@/hooks/useOrderContext";
import { PrintContainer } from "@/components/ui/PrintContainer";
import ReceiptTemplate from "./ReceiptTemplate";

export const ReceiptWrapper: React.FC = () => {
  const { cart, subtotal, tax, serviceFee, total } = useOrderState();

  return (
    <PrintContainer>
      <ReceiptTemplate
        cart={cart}
        subtotal={subtotal}
        tax={tax}
        serviceFee={serviceFee}
        total={total}
      />
    </PrintContainer>
  );
};
