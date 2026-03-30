"use client";

import React, { useMemo, useState } from "react";
import { ICartItem, MenuItem } from "@/types";
import {
  OrderHandlerContext,
  OrderStateContext,
  OrderState,
} from "./OrderSharedContext";

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<ICartItem[]>([]);
  const [serviceFee, setServiceFee] = useState<number>(0);

  const subtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const tax = subtotal * 0.1;
  const total = subtotal + tax + serviceFee;

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
    () => ({ cart, subtotal, tax, serviceFee, total, mode: "buggy" }),
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
