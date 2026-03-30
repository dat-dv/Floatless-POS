import { Metadata } from "next";
import { DashboardView } from "../../components/dashboard/DashboardView";
import { MenuProvider } from "../../contexts/MenuContext";
import { OrderFixedProvider } from "../../contexts/OrderFixedContext";
import { ReceiptWrapper } from "../../components/dashboard/ReceiptWrapper";

export const metadata: Metadata = {
  title: "The Bistro | Fixed Price",
  description: "Fixed arithmetic precision using BigInt approach (Fixed)",
};

export default function FixedDashboardPage() {
  return (
    <MenuProvider>
      <OrderFixedProvider>
        <DashboardView />
        <ReceiptWrapper />
      </OrderFixedProvider>
    </MenuProvider>
  );
}
