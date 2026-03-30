"use client";

import { useContext } from "react";
import { MenuHandlerContext, MenuStateContext } from "@/contexts/MenuContext";

export function useMenuHandlers() {
  const context = useContext(MenuHandlerContext);
  if (!context)
    throw new Error("useMenuHandlers must be used within a MenuProvider");
  return context;
}

export function useMenuState() {
  const context = useContext(MenuStateContext);
  if (!context)
    throw new Error("useMenuState must be used within a MenuProvider");
  return context;
}
