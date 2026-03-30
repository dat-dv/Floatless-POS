import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, Trash2 } from "lucide-react";
import { MenuItem } from "@/types";
import Image from "next/image";
import { formatCurrency } from "@/utils/format";
import { useOrderHandlers } from "@/hooks/useOrderContext";

interface CartItemProps extends MenuItem {
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  price,
  image,
  quantity,
  onAdd,
  onRemove,
}) => {
  const { updateQuantity } = useOrderHandlers();
  const [localQuantity, setLocalQuantity] = useState(quantity.toString());

  // Sync state with props (e.g., when adding from menu or debug tools)
  useEffect(() => {
    setLocalQuantity(quantity.toString());
  }, [quantity]);

  // Debounced update to the store
  useEffect(() => {
    const handler = setTimeout(() => {
      const parsedNum = Number(localQuantity);
      if (!isNaN(parsedNum) && parsedNum >= 0 && parsedNum !== quantity) {
        updateQuantity(id, parsedNum);
      }
    }, 400);

    return () => clearTimeout(handler);
  }, [localQuantity, id, updateQuantity, quantity]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20, scale: 0.9 }}
      className="group relative flex items-center gap-3 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-100 dark:border-zinc-700/30 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-300 shadow-sm"
    >
      {/* Mini Image Wrap */}
      <div className="relative h-12 w-12 rounded-xl overflow-hidden shadow-md flex-shrink-0 border border-white dark:border-zinc-700">
        <Image
          src={image}
          alt={name}
          loading="eager"
          fill
          className="object-cover"
        />
      </div>

      {/* Item Details (Compact) */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-black text-zinc-900 dark:text-zinc-50 truncate tracking-tight uppercase">
          {name}
        </h4>
        <p className="text-zinc-500 text-[10px] font-black tracking-wider opacity-80 break-all pr-2">
          {formatCurrency(price * quantity)}
        </p>
      </div>

      {/* Mini Quantity Controls */}
      <div className="flex items-center bg-white dark:bg-zinc-950 rounded-lg p-0.5 shadow-sm border border-zinc-200 dark:border-zinc-800">
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => onRemove()}
          className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors text-zinc-900 dark:text-zinc-50 flex-shrink-0"
        >
          {quantity <= 1 ? (
            <Trash2 size={12} className="text-red-500" />
          ) : (
            <Minus size={12} />
          )}
        </motion.button>
        
        <input
          type="text"
          value={localQuantity}
          onChange={(e) => setLocalQuantity(e.target.value)}
          className="min-w-[1.25rem] w-8 flex-1 px-1 text-center text-[10px] font-black text-zinc-900 dark:text-zinc-50 bg-transparent border-none outline-none break-all"
        />

        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={() => onAdd()}
          className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors text-zinc-900 dark:text-zinc-50 flex-shrink-0"
        >
          <Plus size={12} />
        </motion.button>
      </div>
    </motion.div>
  );
};
