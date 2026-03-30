import React, { useMemo } from "react";
import { ICartItem } from "@/types";
import { formatCurrency } from "@/utils/format";

interface ReceiptTemplateProps {
  cart: ICartItem[];
  subtotal: number;
  tax: number;
  serviceFee: number;
  total: number;
  ref?: React.Ref<HTMLDivElement>;
}

const ReceiptTemplate: React.FC<ReceiptTemplateProps> = ({
  cart,
  subtotal,
  tax,
  serviceFee,
  total,
  ref,
}) => {
  const timestamp = useMemo(() => {
    const now = new Date();
    return now.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      hour12: false,
    });
  }, []);

  const orderId = useMemo(() => {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, "0");
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const yy = String(now.getFullYear()).slice(-2);
    const hh = String(now.getHours()).padStart(2, "0");
    return `${yy}${mm}${dd}${hh}`;
  }, []);

  return (
    <div
      ref={ref}
      className="p-8 w-[80mm] mx-auto bg-white text-black font-mono text-[11px] leading-relaxed"
      style={{ color: "black", backgroundColor: "white" }}
    >
      <div className="receipt-content-body">
        {/* Branding */}
        <div className="text-center space-y-1 mb-6">
          <h1 className="text-lg font-black tracking-tighter uppercase">
            THE BISTRO
          </h1>
          <p className="text-[9px] uppercase tracking-widest opacity-80">
            Premium Dining Experience
          </p>
          <div className="border-t border-dashed border-black mt-4 pt-2 flex justify-between uppercase">
            <span>Order ID: #{orderId}</span>
          </div>
          <div className="text-[8px] opacity-70 uppercase">
            Issued: {timestamp}
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between border-b border-dotted border-black pb-1 mb-2 font-bold uppercase">
            <span>Item</span>
            <span>Price</span>
          </div>

          {cart.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-start gap-2 border-b border-dotted border-black/10 pb-2"
            >
              <div className="flex-1 min-w-0">
                <div className="uppercase font-bold truncate">{item.name}</div>
                <div className="text-[9px] opacity-70 italic">
                  x{item.quantity} @ {formatCurrency(item.price)}
                </div>
              </div>
              <div className="font-bold break-all text-right max-w-[120px]">
                {formatCurrency(item.price * item.quantity)}
              </div>
            </div>
          ))}
        </div>

        {/* Financial Breakdown */}
        <div className="border-t border-dashed border-black pt-4 space-y-2">
          <div className="flex flex-col items-end uppercase">
            <div className="flex justify-between w-full">
              <span>Subtotal</span>
              <span className="font-bold break-all text-right ml-4">
                {formatCurrency(subtotal)}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end uppercase text-[9px] opacity-70">
            <div className="flex justify-between w-full">
              <span>VAT (10%)</span>
              <span className="font-bold break-all text-right ml-4">
                {formatCurrency(tax)}
              </span>
            </div>
          </div>
          {serviceFee > 0 && (
            <div className="flex flex-col items-end uppercase text-[9px] opacity-70">
              <div className="flex justify-between w-full">
                <span>Surcharge</span>
                <span className="font-bold break-all text-right ml-4">
                  {formatCurrency(serviceFee)}
                </span>
              </div>
            </div>
          )}
          <div className="flex flex-col items-end font-black text-sm uppercase pt-2 border-t border-black mt-2">
            <div className="flex justify-between w-full items-start">
              <span>Total</span>
              <span className="break-all text-right ml-4 text-base">
                {formatCurrency(total)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Receipt Branding */}
        <div className="mt-8 text-center space-y-2 border-t border-dashed border-black pt-6">
          <div className="flex justify-center">
            <svg width="122" height="50" viewBox="0 0 122 50">
              {/* quiet zone left */}
              <rect x="0" y="0" width="10" height="50" fill="white" />

              {/* barcode bars */}
              <rect x="10" y="0" width="2" height="50" fill="black" />
              <rect x="14" y="0" width="1" height="50" fill="black" />
              <rect x="17" y="0" width="3" height="50" fill="black" />
              <rect x="22" y="0" width="1" height="50" fill="black" />
              <rect x="25" y="0" width="2" height="50" fill="black" />
              <rect x="29" y="0" width="4" height="50" fill="black" />
              <rect x="35" y="0" width="1" height="50" fill="black" />
              <rect x="38" y="0" width="3" height="50" fill="black" />
              <rect x="43" y="0" width="2" height="50" fill="black" />
              <rect x="47" y="0" width="1" height="50" fill="black" />
              <rect x="50" y="0" width="4" height="50" fill="black" />
              <rect x="56" y="0" width="2" height="50" fill="black" />
              <rect x="60" y="0" width="3" height="50" fill="black" />
              <rect x="65" y="0" width="1" height="50" fill="black" />
              <rect x="68" y="0" width="2" height="50" fill="black" />
              <rect x="72" y="0" width="4" height="50" fill="black" />
              <rect x="78" y="0" width="1" height="50" fill="black" />
              <rect x="81" y="0" width="3" height="50" fill="black" />
              <rect x="86" y="0" width="2" height="50" fill="black" />
              <rect x="90" y="0" width="1" height="50" fill="black" />
              <rect x="93" y="0" width="4" height="50" fill="black" />
              <rect x="99" y="0" width="2" height="50" fill="black" />
              <rect x="103" y="0" width="3" height="50" fill="black" />
              <rect x="108" y="0" width="1" height="50" fill="black" />

              {/* quiet zone right */}
              <rect x="112" y="0" width="10" height="50" fill="white" />
            </svg>
          </div>

          <p className="pt-3 text-[9px] uppercase tracking-widest leading-normal">
            Thank you for dining with us!
            <br />
            Please visit again soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export { ReceiptTemplate };
export default ReceiptTemplate;
