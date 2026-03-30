import { useContext } from "react";
import { OrderHandlerContext, OrderStateContext } from "../contexts/OrderSharedContext";

export function useOrderHandlers() {
  const context = useContext(OrderHandlerContext);
  if (!context)
    throw new Error("useOrderHandlers must be used within an OrderProvider");
  return context;
}

export function useOrderState() {
  const context = useContext(OrderStateContext);
  if (!context)
    throw new Error("useOrderState must be used within an OrderProvider");
  return context;
}
