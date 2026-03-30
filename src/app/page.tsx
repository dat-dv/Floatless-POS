import { Metadata } from "next";
import { DashboardView } from "../components/dashboard/DashboardView";
import { MenuProvider } from "../contexts/MenuContext";
import { OrderProvider } from "../contexts/OrderContext";
import { ReceiptWrapper } from "../components/dashboard/ReceiptWrapper";

export const metadata: Metadata = {
  title: "The Bistro | Menu (Buggy)",
  description: "Official ordering menu for The Bistro (Native JS Numbers)",
};

export default function DashboardPage() {
  return (
    <MenuProvider>
      <OrderProvider>
        <DashboardView />
        <ReceiptWrapper />
      </OrderProvider>
    </MenuProvider>
  );
}
