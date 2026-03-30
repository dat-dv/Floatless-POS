"use client";

import { createContext } from "react";
import { ICartItem, MenuItem } from "@/types";

export type CalculationMode = "buggy" | "fixed";

export interface OrderHandlers {
  addToCart: (item: MenuItem, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  setServiceFee: (amount: number) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

export interface OrderState {
  cart: ICartItem[];
  subtotal: number;
  tax: number;
  serviceFee: number;
  total: number;
  mode: CalculationMode;
}

export const OrderHandlerContext = createContext<OrderHandlers | undefined>(undefined);
export const OrderStateContext = createContext<OrderState | undefined>(undefined);
