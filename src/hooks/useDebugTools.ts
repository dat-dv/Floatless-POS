"use client";

import { useOrderHandlers, useOrderState } from "./useOrderContext";
import { useMenuState } from "./useMenuContext";

export function useDebugTools() {
  const { addToCart, setServiceFee, clearCart } = useOrderHandlers();
  const { serviceFee, mode } = useOrderState();
  const menu = useMenuState();

  const isFixed = mode === "fixed";

  const injectMassiveItems = () => {
    // Stage preparation
    clearCart();
    // Take the third available item for massive load demo (usually a drink/surcharge feel)
    const targetItem = menu.menuItems[2];
    if (!targetItem) return;

    // Inject massive items
    addToCart(targetItem, Number.MAX_SAFE_INTEGER);

    // Inject a tiny fee that will be "lost" or rounded wrongly due to huge scale
    setServiceFee(5);
    // Call out the bug directly to the user
    setTimeout(() => {
      window.alert(
        isFixed
          ? "✅ SUCCESS: Big Numbers Handled! Your multi-quadrillion order and the $5.00 addon are now calculated perfectly without losing a single cent."
          : "⚠️ Warning: Massive Scale Reached! Your bill is now over 9 Quadrillion. Added $5 addon, but did it change anything? Math is now officially broken. Check the RAW payload for proof!",
      );
    }, 100);
  };

  const inject03Error = () => {
    // Stage preparation
    clearCart();

    // Select first and second items ($0.1 and $0.2)
    const item1 = menu.menuItems[0];
    const item2 = menu.menuItems[1];

    if (item1) addToCart(item1);
    if (item2) addToCart(item2);

    // Call out the bug directly to the user
    setTimeout(() => {
      window.alert(
        isFixed
          ? "✅ PRECISION FIXED: Notice how 0.1 + 0.2 is now EXACTLY 0.3 thanks to our BigInt Scaling engine. No floating point ghosts here!"
          : "⚠️ Warning: Success! Check the Subtotal, VAT, and Total now. The 0.1 + 0.2 error has propagated and ruined all your math!",
      );
    }, 100);
  };

  const injectPrecisionBug = () => {
    setServiceFee(serviceFee + 0.1);
  };

  const injectMaxSafeBug = () => {
    setServiceFee(serviceFee + 9007199254740991);
  };

  return {
    injectMassiveItems,
    inject03Error,
    injectPrecisionBug,
    injectMaxSafeBug,
    resetDebug: () => setServiceFee(0),
    clearAll: clearCart,
  };
}
