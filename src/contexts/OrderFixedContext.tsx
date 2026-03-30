"use client";

import React, { useMemo, useState } from "react";
import { ICartItem, MenuItem } from "@/types";
import { OrderHandlerContext, OrderStateContext, OrderState } from "./OrderSharedContext";

/**
 * BIG DECIMAL SCALING ENGINE (BEYOND THE JS PRECISION LIMIT)
 */
const PRECISION_FACTOR = BigInt(1_000_000); // 6 decimal places

const toFixedNum = (val: number) => BigInt(Math.round(val * Number(PRECISION_FACTOR)));
const fromFixedNum = (val: bigint) => Number(val) / Number(PRECISION_FACTOR);

export function OrderFixedProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ICartItem[]>([]);
  const [serviceFee, setServiceFee] = useState<number>(0);

  // FIXED LOGIC
  const { subtotal, tax, total } = useMemo(() => {
    const subtotalBig = cart.reduce((acc, item) => {
      return acc + toFixedNum(item.price) * BigInt(item.quantity);
    }, BigInt(0));

    const taxBig = (subtotalBig * BigInt(10)) / BigInt(100); // 10% VAT
    const feeBig = toFixedNum(serviceFee);
    const totalBig = subtotalBig + taxBig + feeBig;

    return {
      subtotal: fromFixedNum(subtotalBig),
      tax: fromFixedNum(taxBig),
      total: fromFixedNum(totalBig),
    };
  }, [cart, serviceFee]);

  const handlers = useMemo(
    () => ({
      addToCart: (item: MenuItem, quantity?: number) => {
        setCart((prev) => {
          const existing = prev.find((i) => i.id === item.id);
          if (existing) {
            return prev.map((i) =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + (quantity || 1) }
                : i,
            );
          }
          return [...prev, { ...item, quantity: quantity || 1 }];
        });
      },
      removeFromCart: (id: string) => {
        setCart((prev) =>
          prev
            .map((i) =>
              i.id === id ? { ...i, quantity: Math.max(0, i.quantity - 1) } : i,
            )
            .filter((i) => i.quantity > 0),
        );
      },
      clearCart: () => {
        setCart([]);
        setServiceFee(0);
      },
      setServiceFee: (amount: number) => setServiceFee(amount),
      updateQuantity: (id: string, quantity: number) => {
        setCart((prev) =>
          prev.map((i) => (i.id === id ? { ...i, quantity } : i)),
        );
      },
    }),
    [],
  );

  const state: OrderState = useMemo(
    () => ({ cart, subtotal, tax, serviceFee, total, mode: "fixed" }),
    [cart, subtotal, tax, serviceFee, total],
  );

  return (
    <OrderHandlerContext.Provider value={handlers}>
      <OrderStateContext.Provider value={state}>
        {children}
      </OrderStateContext.Provider>
    </OrderHandlerContext.Provider>
  );
}
